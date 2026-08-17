require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const NodeCache = require('node-cache');
const crypto = require('crypto');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const { ipKeyGenerator } = require('express-rate-limit');

// ==========================================
// [1] DB 연결 및 스키마 정의
// ==========================================
mongoose.set('bufferCommands', false);

// 연결이 끊기거나 복구될 때 로그를 남김
mongoose.connection.on('disconnected', () => console.error("[System] MongoDB 연결 끊김"));
mongoose.connection.on('reconnected', () => console.log("[System] MongoDB 재연결 완료"));

const matchCacheSchema = new mongoose.Schema({
    matchId: { type: String, required: true, unique: true },
    detail: { type: Object, required: true },
    timeline: { type: Object },
    // ★ 7일이다 (2026-08-15에 14일에서 줄였다). 검색 트래픽이 거의 없어서 원본을
    //   2주씩 들고 있을 이유가 적고, 통계 슬림(matchstats)에 자리를 내주기 위해서다.
    //   ※ expires 를 고쳐도 **이미 만들어진 TTL 인덱스는 안 바뀐다** — ensureStatIndexes() 참고
    createdAt: { type: Date, expires: '7d', default: Date.now }
});

// ★ 폴백 조회용 인덱스 (puuid로 매치를 찾고 최신순 정렬)
matchCacheSchema.index({ 'detail.metadata.participants': 1, 'detail.info.gameEndTimestamp': -1 });

const MatchCache = mongoose.model('MatchCache', matchCacheSchema);

// ==========================================
// 통계 수집용 스키마 (2026-08-15 신설)
//   ★ 원본(detail)을 저장하지 않는다. 받는 즉시 쓸 값만 뽑아 배열로 눕히고 버린다.
//     한 판 82KB -> 0.76KB (108배). 원본 용량의 대부분은 값이 아니라 키 이름이다 —
//     "totalDamageDealtToChampions"(28자)를 참가자 10명 x 경기마다 반복 저장한다.
//     배열로 바꾸면 키가 통째로 사라진다.
// ==========================================

// matchlist 에서 본 경기. "명단 유저 몇 명에게서 보였나"를 센다.
//   ★★ 이 횟수가 곧 마스터+ 인원(k)의 하한이다. 한 판에 명단 유저가 k명 있으면
//     그 매치 ID 가 k명의 matchlist 에 중복으로 나타나기 때문이다.
//     그래서 detail 을 받기 **전에** 거를 수 있다 — 이게 호출 예산의 핵심이다.
//     (승격 직후라 명단에 아직 없는 사람은 안 세지므로 항상 하한이다. 넘치는 쪽으로만
//      보수적이라 통계가 오염되지 않는다.)
const matchSeenSchema = new mongoose.Schema({
    matchId: { type: String, required: true, unique: true },
    day: { type: String },                      // 이 경기가 속한 날짜 (KST "2026-08-14")
    cnt: { type: Number, default: 1 },          // 명단 유저 몇 명에게서 보였나
    done: { type: Boolean, default: false },    // detail 처리를 끝냈나
    createdAt: { type: Date, expires: '3d', default: Date.now }
});
matchSeenSchema.index({ done: 1, cnt: -1 });
const MatchSeen = mongoose.model('MatchSeen', matchSeenSchema);

// ==========================================
// 날짜별 명단 스냅샷 (2026-08-17 신설)
//   ★★ "지금 명단" 으로 **어제 경기**를 다루면 두 군데서 샌다:
//     ① 순회 — 어제 마스터로 게임을 했는데 오늘 아침 명단에서 빠진 사람에게는
//        "어제 뭐 했어?" 를 **아예 안 물어본다.** 그 사람 몫의 등장 횟수가 통째로 빠지고,
//        경계에 걸린 판(5명)은 4로 내려가 **detail 을 안 받아 통계에서 사라진다.**
//        실측(2026-08-17): 8/15 명단에 있다가 8/16 에 빠진 사람이 **437명(3.8%)**.
//        5명 중 최소 한 명이 빠질 확률이 약 18% 라 경계 판이 그만큼 샜다.
//     ② k 계산 — 아침에 5명이던 판이 저녁에 4명으로 세어졌다. 실측 140건(전체 3.5%)이고
//        전부 `cnt` 가 5~7 인 경계 판이었다 (cnt>=8 은 0건).
//   → 그래서 **그날 명단을 사진 찍어 두고, 어제 경기는 어제 명단으로 처리한다.**
//   ★ 하루 한 문서에 puuid 를 통째로 담는다 (1.1만 x 78B ≒ 0.9MB/일, TTL 5일 = 4.5MB).
//     16MB 문서 한도의 6%라 여유가 크다.
// ==========================================
const rankSnapshotSchema = new mongoose.Schema({
    day: { type: String, required: true, unique: true },   // KST "2026-08-17"
    n: { type: Number, default: 0 },
    puuids: { type: [String], default: [] },
    createdAt: { type: Date, expires: '5d', default: Date.now }
});
const RankSnapshot = mongoose.model('RankSnapshot', rankSnapshotSchema);

// ==========================================
// 상위 티어 어긋남 눈금 (2026-08-17 신설)
//   ★★ **라이엇이 티어를 언제 다시 계산하는지 알아내려고 둔 것이다.**
//     라이엇은 챌린저/그마 소속을 연속으로 갱신하지 않고 하루 한 번쯤 몰아서 처리한다.
//     그래서 갱신 직후에는 LP 순위와 소속이 정확히 맞고(1~300등이 전부 챌린저),
//     시간이 갈수록 아래 티어가 LP 로 치고 올라와 어긋난다.
//   → `c300`(1~300등 안의 챌린저 수)과 `g1000`(1~1000등 안의 그마 수)이
//     **300 / 700 으로 되돌아가는 순간이 곧 갱신 시각**이다.
//   ★ 라이엇 호출이 0 이다 — 이미 10분(밤에는 5분)마다 받는 명단을 세기만 한다.
// ==========================================
const apexDriftSchema = new mongoose.Schema({
    t: { type: Date, required: true },
    c300: { type: Number },      // 1~300등 안의 챌린저 수 (300 이면 안 어긋남)
    g1000: { type: Number },     // 1~1000등 안의 그마 수 (700 이면 안 어긋남)
    cMin: { type: Number },      // 챌린저 최저 LP
    gMax: { type: Number },      // 그마 최고 LP  — cMin 보다 높으면 그만큼 흐른 것이다
    gMin: { type: Number },      // 그마 최저 LP
    mMax: { type: Number },      // 마스터 최고 LP
    createdAt: { type: Date, expires: '7d', default: Date.now }
});
apexDriftSchema.index({ t: -1 });
const ApexDrift = mongoose.model('ApexDrift', apexDriftSchema);

// 통계용 슬림 경기. 원본 대신 이것만 남는다.
const matchStatSchema = new mongoose.Schema({
    matchId: { type: String, required: true, unique: true },
    k: { type: Number, required: true },   // 마스터+ 인원 (detail 로 센 정확한 값)
    v: { type: String },                   // 패치 "16.16"
    t: { type: Number },                   // 경기 시작 (초)
    d: { type: Number },                   // 경기 길이 (초)
    // 참가자 10명 x 28칸. 자리 뜻은 toSlimMatch() 주석 참고 (자리가 곧 의미다)
    p: { type: [[Number]], required: true },
    b: { type: [Number] },                 // 밴 (-1 = 밴 안 함은 제외하고 담는다)
    // ★ 30일이다 (2026-08-15에 룬·주문을 넣으면서 45 → 30). 한 건이 2.4KB 라
    //   하루 3,000판이면 7MB/일 → 정착점 213MB. 45일로 두면 320MB 가 되어
    //   matchcaches 와 합쳐 512MB 의 85%를 먹는다.
    createdAt: { type: Date, expires: '30d', default: Date.now }
});
// 집계는 "패치 + k" 로 훑는다. 원본은 재집계 대비용이라 90일이면 충분하다.
matchStatSchema.index({ v: 1, k: 1 });
matchStatSchema.index({ t: 1 });
const MatchStat = mongoose.model('MatchStat', matchStatSchema);

// 집계 결과. 화면이 읽는 건 이 두 컬렉션뿐이고 MatchStat 은 재집계용 원본이다.
//   scope = "p:16.16"(패치) 또는 "d:2026-08-15"(일자, 한국시간 기준)
//   kb    = k 밴드. "5-7" / "8-10" 으로 **나눠서** 담는다 —
//           마스터 하위권이 실제로 얼마나 들어오는지 보고 나중에 기준을 고르려면
//           합치는 건 되지만 나누는 건 소급이 안 되기 때문이다.
//   pos   = 0~4 라인별, -1 = 라인 무관 합계
const champStatSchema = new mongoose.Schema({
    scope: { type: String, required: true },
    kb: { type: String, required: true },
    champ: { type: Number, required: true },
    pos: { type: Number, required: true },
    games: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    // 밴은 라인 개념이 없어서 pos: -1 줄에만 담긴다. 두 가지를 다 센다 —
    //   bans     = 밴 슬롯을 몇 개 먹었나 (양 팀이 같은 챔피언을 밴하면 2)
    //   banGames = 몇 판에서 밴됐나       (양 팀이 밴해도 1)
    bans: { type: Number, default: 0 },
    banGames: { type: Number, default: 0 },
    kills: { type: Number, default: 0 },
    deaths: { type: Number, default: 0 },
    assists: { type: Number, default: 0 }
});
champStatSchema.index({ scope: 1, kb: 1, pos: 1 });
const ChampStat = mongoose.model('ChampStat', champStatSchema);

// scope 별 총 경기 수. 픽률·밴률의 **분모**라 따로 둔다.
const statScopeSchema = new mongoose.Schema({
    scope: { type: String, required: true },
    kb: { type: String, required: true },
    games: { type: Number, default: 0 },
    updatedAt: { type: Date, default: Date.now }
});
statScopeSchema.index({ scope: 1, kb: 1 }, { unique: true });
const StatScope = mongoose.model('StatScope', statScopeSchema);

// 챔피언별 룬·소환사 주문 빌드 (2026-08-16 신설)
//   ★★ 이걸 만든 진짜 이유는 화면이 아니라 **원본 삭제 준비**다. 룬·주문은
//     MatchStat.p 의 15~27번 칸에만 있어서, 지난 패치 원본을 지우면 그 패치의 룬 통계는
//     영영 복구가 안 된다. 승률·픽률·밴률은 이미 champstats 에 집계돼 있어서 안전한데
//     룬만 집계가 없었다. **원본을 지우기 전에 반드시 이 집계가 먼저 있어야 한다.**
//
//   ★ champstats 와 다른 점 세 가지 (일부러 다르게 했다):
//     ① **kb 밴드로 안 쪼갠다.** 룬 선택이 마스터+ 인원 수에 따라 달라질 이유가 없고,
//        표본이 지금도 얇아서 반으로 가르면 top 조합이 한두 판짜리가 된다
//     ② **일별 scope 를 안 만든다.** 하루치 룬 조합은 거의 전부 1판짜리라 뜻이 없고,
//        집계 비용만 두 배가 된다. 패치 scope 만 만든다
//     ③ **라인별로 안 쪼갠다.** 럼블처럼 탑/미드를 오가는 챔피언은 룬이 갈리지만,
//        지금 표본으로 라인까지 나누면 남는 게 없다. 표본이 쌓이면 그때 pos 를 더한다
//
//   key 의 자리 뜻은 type 마다 다르다 (참가자 배열 칸 번호는 toSlimMatch() 주석 참고):
//     rune     [주계열, 키스톤, 주룬1, 주룬2, 주룬3, 보조계열, 보조룬1, 보조룬2]  (17~24번 칸)
//     keystone [주계열, 키스톤]                                                  (17~18번 칸)
//     spell    [주문A, 주문B]  — **작은 id 가 앞이다.** 안 그러면 점멸/점화와
//                                점화/점멸이 다른 조합으로 갈려 표본이 반으로 쪼개진다
//     shard    [공격 파편, 유연 파편, 방어 파편]                                 (25~27번 칸)
//     all      []  — 이 챔피언의 총 판수. **픽률의 분모라 따로 담는다** (아래 참고)
const champBuildSchema = new mongoose.Schema({
    scope: { type: String, required: true },
    champ: { type: Number, required: true },
    type: { type: String, required: true },
    key: { type: [Number], default: [] },
    games: { type: Number, default: 0 },
    wins: { type: Number, default: 0 }
});
champBuildSchema.index({ scope: 1, champ: 1 });
const ChampBuild = mongoose.model('ChampBuild', champBuildSchema);

const summonerCacheSchema = new mongoose.Schema({
    puuid: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },   // 화면 표시용 원본 ("Faker#KR1")
    updatedAt: { type: Number, required: true },

    // ★ 검색 전용 소문자 사본 (인덱스를 타기 위함)
    nameLower: { type: String },      // "faker#kr1"
    namePartLower: { type: String },  // "faker"  (태그 제외)

    // ★ 자동완성 표시/정렬용
    tier: { type: String },
    rank: { type: String },
    lp: { type: Number },
    tierScore: { type: Number },      // 티어 정렬용 점수
    iconId: { type: Number },
    level: { type: Number },

    // ★ 숙련도 상위 5개 championId (랭킹 표의 "숙련도 TOP5" 칸).
    //   전 큐 통합 누적값이라 "솔랭 모스트" 가 아니다 — 라이엇이 그것만 준다.
    //   fillMasteryInBackground 가 분당 10명씩 채운다.
    mastery: { type: [Number] },
    masteryAt: { type: Number },

    // ★ 통계 수집 잡이 이 사람에게서 **어느 날짜의 경기를** 훑었는지 (KST "2026-08-14").
    //   시각이 아니라 날짜인 이유는 아래 scanMatchlists 주석 참고 —
    //   모두가 같은 날짜 창을 봐야 매치 등장 횟수(k 하한)가 정확해진다.
    //   DB 에 남겨야 재시작해도 순회 위치가 유지된다.
    matchScanDay: { type: String }
});

summonerCacheSchema.index({ displayName: 1 });
summonerCacheSchema.index({ namePartLower: 1, tierScore: -1 });

const SummonerCache = mongoose.model('SummonerCache', summonerCacheSchema);

// ==========================================
// 신화급 상점 일일 상품 (2026-08-16 신설)
//   윈도우 로컬 수집기(별도 프로젝트)가 롤 클라 화면을 읽어 POST /api/mythic-shop 로 보낸다.
//   명세는 mythic-collector/SERVER_SPEC.md 다.
//
//   ★ 정적 파일이 아니라 DB 인 이유: Railway 파일시스템이 배포마다 날아가서 서버가
//     파일을 못 만든다. 정적 파일로 가면 수집할 때마다 사람이 git push 를 해야 한다.
//   ★ TTL 이 없다 — **영구 기록이다.** 하루 4건 x 200B 면 1년에 300KB 라 지울 이유가 없다.
//   ★ `date` 는 **UTC 기준 날짜**다. 로테이션이 00:00 UTC(한국 09:00) 갱신이라
//     그 날짜가 곧 로테이션 ID 다. 한국 날짜와 다를 수 있으니 화면에서 조심할 것.
// ==========================================
const mythicShopSchema = new mongoose.Schema({
    date: { type: String, required: true },                 // "2026-08-16" (UTC)
    // ★★ 구획 (2026-08-17 추가). 인게임 상점 탭 그대로 — featured/biweekly/weekly/daily.
    //   **없으면 'daily' 다** — 구획이 생기기 전 수집기가 보내던 것이 전부 일일이었고,
    //   그 수집기를 안 고쳐도 계속 동작해야 하기 때문이다 (기존 문서도 시작할 때 메워 둔다).
    section: { type: String, required: true, default: 'daily' },
    collectedAt: { type: Date, required: true },            // 수집 시각 (표시용)
    items: [{
        _id: false,
        name: { type: String, required: true },    // 정식 명칭 (수집기가 CD 로 대조해 보낸다)
        // 'icon' | 'emote' | 'skin' | 'chroma' | 'ward' | 'border' | 'bundle' | 'other'
        //   ★ 일일 구획은 예전처럼 icon/emote 만 받는다 (아래 validateMythicBody)
        type: { type: String, required: true },
        price: { type: Number, required: true },   // 신화 정수. 일일은 5|25 고정
        catalogId: { type: String },               // CommunityDragon id
        // ★ 이미지 URL 은 **수집기가 만들어 보낸다. 서버·프론트가 만들지 말 것.**
        //   아이콘은 id 로 경로를 만들 수 있지만 감정표현은 경로가 제각각이라 유추가 안 된다.
        image: { type: String },
        score: { type: Number }                    // 이름 대조 점수 0~1 (감사용, 화면엔 안 쓴다)
    }],
    collectorVersion: { type: String },
    createdAt: { type: Date, default: Date.now }
});
// ★★ unique 가 `date` 단독이 아니라 `date + section` 이다 (2026-08-17).
//   같은 날짜에 일일과 주간이 따로 들어와야 하는데, 단독 unique 로 두면 **두 번째가
//   11000 으로 막힌다.** 옛 `date_1` 인덱스는 ensureStatIndexes 가 지운다.
mythicShopSchema.index({ date: 1, section: 1 }, { unique: true });
mythicShopSchema.index({ 'items.catalogId': 1, date: -1 });   // "마지막 등장일" 조회용
mythicShopSchema.index({ section: 1, date: -1 });             // 구획별 최신 조회용
const MythicShop = mongoose.model('MythicShop', mythicShopSchema);

// ==========================================
// [2] 전역 변수 및 서버(Express) 세팅
// ==========================================
const app = express();
app.set('trust proxy', 1);
const myCache = new NodeCache({ stdTTL: 300 });
const API_KEY = process.env.API_KEY;

// 라이엇 API 전용 호출기 (키를 헤더에 담아 전송)
const riotApi = axios.create({
    headers: { 'X-Riot-Token': API_KEY },
    timeout: 10000
});

let currentVersion = "16.1.1";
let challengerList = [];
let rankUpdatedAt = 0;        // 랭킹 명단을 마지막으로 받아온 시각 (화면에 "N분 전 갱신")
let resolvedNames = {};
let failedPuuids = {};        // ★ 추가: 조회 실패한 puuid와 실패 시각
let isFetchingNames = false;
let resolvedMastery = {};     // puuid -> { top: [championId x5], updatedAt }
let failedMasteryPuuids = {};
let isFetchingMastery = false;
let resolvedCountIn10Mins = 0;
let arenaAugments = {};

// ★ 통계 수집 (2026-08-15)
let rankPuuidSet = new Set();   // 명단 puuid 집합. k 를 셀 때 쓴다 (updateChallengerList 가 갱신)
let matchScanDay = {};          // puuid -> 마지막으로 훑은 경기 날짜 (KST "2026-08-14")
let isScanningMatches = false;
let isFetchingStats = false;
let isBuildingStats = false;
let statCounters = { scan: 0, seen: 0, fetch: 0, save: 0, skip: 0 };

app.use(cors());

// ==========================================
// index.html 자산 버전 자동 주입
//   브라우저가 예전 app.js / style.css를 붙들고 있으면
//   새 index.html이 내려가도 기능이 옛날 그대로 동작한다.
//   그래서 파일 수정 시각(mtime)을 쿼리스트링으로 붙여
//   내용이 바뀔 때만 브라우저가 새 파일로 인식하게 한다.
//
//     <script src="/app.js">  ->  <script src="/app.js?v=1754382910123">
//
//   index.html은 손댈 필요 없다. 여기서 응답할 때 자동으로 붙는다.
//   배포할 때 버전을 손으로 올리는 걸 깜빡할 일도 없다.
// ==========================================
const PUBLIC_DIR = path.join(__dirname, 'public');
let indexHtmlCache = null;

function renderIndexHtml() {
    if (indexHtmlCache) return indexHtmlCache;

    let html = fs.readFileSync(path.join(PUBLIC_DIR, 'index.html'), 'utf8');

    // 같은 서버에서 주는 .js / .css 참조에만 버전을 붙인다 (CDN 주소는 그대로)
    //
    // ★ data-src 도 같이 잡는다 (2026-08-11). 챔피언 페이지 전용 데이터 3종은
    //   index.html 에서 바로 안 받고 app.js 가 챔피언 탭에 들어갈 때 붙인다.
    //   그때 src 로 두면 브라우저가 미리 받아버리므로 data-src 로 재워 두는데,
    //   여기서 버전을 안 붙이면 custom_values.js 를 고쳐도 옛 수치가 그대로 나온다.
    html = html.replace(/(src|href|data-src)="\/([A-Za-z0-9_\-.]+\.(?:js|css))"/g, (match, attr, file) => {
        try {
            const v = Math.floor(fs.statSync(path.join(PUBLIC_DIR, file)).mtimeMs);
            return `${attr}="/${file}?v=${v}"`;
        } catch (e) {
            return match;   // 파일이 없으면 원본 그대로
        }
    });

    // 운영 환경에서만 캐싱. 로컬은 매번 다시 읽어야 파일을 고치는 즉시 반영된다.
    if (process.env.NODE_ENV === 'production') indexHtmlCache = html;
    return html;
}

function sendIndexHtml(req, res) {
    // index.html 자체는 절대 캐시하면 안 된다.
    // 이 파일이 캐시되면 위에서 붙인 새 버전 번호가 전달되지 않는다.
    res.set('Cache-Control', 'no-cache');
    res.type('html').send(renderIndexHtml());
}

// express.static보다 먼저 잡아야 한다. 뒤에 두면 static이 원본을 그냥 내보낸다.
app.get('/', sendIndexHtml);
app.get('/index.html', sendIndexHtml);

app.use(express.static(PUBLIC_DIR, { index: false }));

// API 속도 제한 (Rate Limiting) - 1분에 30번
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 30,
    keyGenerator: (req) => ipKeyGenerator(req.headers['cf-connecting-ip'] || req.ip),
    message: { error: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요." }
});
app.use('/api/', apiLimiter);

// 자동완성 전용 제한 (라이엇 API를 쓰지 않으므로 넉넉하게)
const suggestLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 120,
    keyGenerator: (req) => ipKeyGenerator(req.headers['cf-connecting-ip'] || req.ip),
    message: { error: "요청이 너무 많습니다." }
});
app.use('/api/suggest', suggestLimiter);

// ==========================================
// [3] 백그라운드 스케줄러 (데이터 갱신)
// ==========================================
async function loadResolvedNames() {
    try {
        const summoners = await SummonerCache.find({});
        summoners.forEach(s => {
            resolvedNames[s.puuid] = { displayName: s.displayName, updatedAt: s.updatedAt };
            // ★ 숙련도도 같이 메모리에 올려야 랭킹 응답에서 쓸 수 있다.
            //   DB 에만 있고 여기서 안 올리면 재시작할 때마다 전부 다시 받게 된다 (18시간짜리다).
            if (s.mastery && s.mastery.length) {
                resolvedMastery[s.puuid] = { top: s.mastery, updatedAt: s.masteryAt || 0 };
            }
            // ★ 통계 수집 순회 위치도 같이 올린다. 안 올리면 재시작마다 명단 전체를
            //   처음부터 다시 훑어 반나절치 호출을 통째로 날린다.
            if (s.matchScanDay) matchScanDay[s.puuid] = s.matchScanDay;
        });
        console.log(`[System] DB 로드: 닉네임 ${summoners.length}명, 숙련도 ${Object.keys(resolvedMastery).length}명, 전적 ${await MatchCache.countDocuments()}게임`);
    } catch (err) {
        console.error("[System] DB 로드 실패:", err.message);
    }
}

async function updateVersion() {
    try {
        const res = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json');
        currentVersion = res.data[0];
        console.log(`[Task] Data Dragon 최신 버전 갱신: ${currentVersion}`);
    } catch (e) {
        console.error("[Task] 버전 갱신 실패. 기본값을 사용합니다.");
    }
}

async function updateArenaAugments() {
    try {
        const res = await axios.get('https://raw.communitydragon.org/latest/cdragon/arena/ko_kr.json');
        const raw = res.data?.augments;
        const list = Array.isArray(raw) ? raw : Object.values(raw || {});

        const map = {};
        for (const a of list) {
            if (a?.id == null) continue;
            const path = String(a.iconLarge || a.iconSmall || '').toLowerCase();
            map[a.id] = {
                name: a.name || '',
                desc: (a.desc || '').replace(/<[^>]+>/g, ''),
                icon: path ? `https://raw.communitydragon.org/latest/game/${path}` : null
            };
        }
        if (Object.keys(map).length > 0) {
            arenaAugments = map;
            console.log(`[Task] 아레나 증강체 데이터 갱신 완료 (${Object.keys(map).length}종)`);
        }
    } catch (err) {
        console.error("[Task] 아레나 증강체 갱신 실패:", err.message);
    }
}

// 티어별로 마지막에 성공한 명단을 따로 들고 있는다.
//   한 티어가 실패했다고 그 구간을 통째로 비우면 랭킹 페이지가 중간에서 끊긴다.
//   (마스터는 1만 명이라 응답이 커서 504 게이트웨이 타임아웃이 유독 자주 났다)
const RANK_TIERS = ['challengerleagues', 'grandmasterleagues', 'masterleagues'];
const rankListByTier = { challengerleagues: [], grandmasterleagues: [], masterleagues: [] };

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// 504 같은 일시적 오류는 잠시 뒤 다시 하면 대개 성공한다.
async function fetchRankTier(tier, tries = 3) {
    for (let attempt = 1; attempt <= tries; attempt++) {
        try {
            const res = await riotApi.get(`https://kr.api.riotgames.com/lol/league/v4/${tier}/by-queue/RANKED_SOLO_5x5`);
            const entries = res.data?.entries || [];
            if (entries.length > 0) return entries;
            console.warn(`[Task] ${tier} 빈 응답 (${attempt}/${tries})`);
        } catch (e) {
            console.warn(`[Task] ${tier} 조회 실패 ${e.response?.status || e.message} (${attempt}/${tries})`);
        }
        if (attempt < tries) await sleep(3000 * attempt);
    }
    return null;   // 세 번 다 실패
}

async function updateChallengerList() {
    try {
        const results = await Promise.all(RANK_TIERS.map(tier => fetchRankTier(tier)));

        results.forEach((entries, i) => {
            const tier = RANK_TIERS[i];
            if (entries) {
                // ★ 어느 티어에서 왔는지를 항목에 찍어 둔다 (2026-08-13).
                //   합치고 나면 LP 로만 정렬해서 소속을 알 길이 없어진다. 화면이 순위 번호로
                //   (300위 이하 = 챌린저 식으로) 짐작하고 있었는데 그게 틀린다 —
                //   라이엇이 승격을 주기적으로만 처리해서 **마스터가 그마보다 LP 가 높은 일**이
                //   실제로 생긴다. 여기서 실명을 붙여 두면 추측할 일이 없다.
                entries.forEach(e => { e.tier = tier; });
                rankListByTier[tier] = entries;
                console.log(`[Task] ${tier}: ${entries.length}명`);
            } else {
                // 실패한 티어는 이전 명단을 그대로 쓴다
                console.error(`[Task Error] ${tier} 갱신 실패 — 기존 ${rankListByTier[tier].length}명 유지`);
            }
        });

        const combinedEntries = RANK_TIERS.flatMap(tier => rankListByTier[tier]);

        if (combinedEntries.length > 0) {
            challengerList = combinedEntries.sort((a, b) => b.leaguePoints - a.leaguePoints);
            // ★ k 판정용 집합을 같이 갱신한다. 명단이 10분마다 바뀌므로 여기서만 만든다.
            rankPuuidSet = new Set(challengerList.map(p => p.puuid));
            rankUpdatedAt = Date.now();
            myCache.del('challenger_ranking_data');   // 새 명단이 왔으면 옛 응답을 버린다
            console.log(`[Task] 랭킹 명단 갱신 완료 (총 ${challengerList.length}명)`);
            // 오늘 명단을 사진 찍어 둔다 (내일 이 날짜 경기를 다룰 때 쓴다)
            saveRankSnapshot().catch(e => console.error('[Snapshot] 저장 실패:', e.message));
            saveApexDrift().catch(e => console.error('[Apex] 기록 실패:', e.message));
        } else {
            console.error("[Task Error] 랭킹 명단이 비어 있어 갱신하지 않음");
        }
    } catch (err) {
        console.error("[Task Error] 랭킹 명단 갱신 실패:", err.message);
    }
}

async function resolveNamesInBackground() {
    if (challengerList.length === 0 || isFetchingNames) return;
    isFetchingNames = true;

    const now = Date.now();
    const FOURTEEN_DAYS = 14 * 24 * 60 * 60 * 1000;
    const TOP_PRIORITY = 1000;   // 상위 1000명은 항상 먼저 처리

    // 아직 모르거나, 14일이 지나 갱신이 필요한 사람만 추림
    const ONE_DAY = 24 * 60 * 60 * 1000;

    const pending = challengerList
        .map((p, rank) => ({ ...p, rank }))
        .filter(p => {
            // 최근 24시간 내 조회 실패한 계정은 건너뜀
            if (failedPuuids[p.puuid] && now - failedPuuids[p.puuid] < ONE_DAY) return false;
            return !resolvedNames[p.puuid] || (now - resolvedNames[p.puuid].updatedAt > FOURTEEN_DAYS);
        });

    // 상위권을 앞으로 끌어올림
    const topPending = pending.filter(p => p.rank < TOP_PRIORITY);
    const restPending = pending.filter(p => p.rank >= TOP_PRIORITY);

    const targets = [...topPending, ...restPending].slice(0, 20);

    const skipped = Object.keys(failedPuuids).length;
    if (pending.length > 0) {
        console.log(`[Task] 닉네임 변환: 대기 ${pending.length}명 (상위권 ${topPending.length}명 / 조회불가 ${skipped}명 제외)`);
    }

    if (targets.length > 0) {
        for (const p of targets) {
            try {
                const accRes = await riotApi.get(`https://asia.api.riotgames.com/riot/account/v1/accounts/by-puuid/${p.puuid}`);
                if (accRes.data.gameName) {
                    const dName = `${accRes.data.gameName}#${accRes.data.tagLine}`;
                    resolvedNames[p.puuid] = { displayName: dName, updatedAt: now };
                    delete failedPuuids[p.puuid];
                    await SummonerCache.findOneAndUpdate(
                        { puuid: p.puuid },
                        { displayName: dName, updatedAt: now, ...toSearchFields(dName) },
                        { upsert: true }
                    );
                    myCache.del('challenger_ranking_data');
                }
            } catch (err) {
                const status = err.response?.status;
                if (status === 404) {
                    // 존재하지 않는 계정 → 24시간 동안 재시도 안 함
                    failedPuuids[p.puuid] = now;
                } else {
                    // 429, 500 등 일시적 오류는 다음 사이클에 재시도
                    console.error(`[Name] 오류 ${p.puuid.substring(0, 8)}: ${status || err.message}`);
                }
            }

            resolvedCountIn10Mins++; // 처리할 때마다 카운트 1씩 증가 (로그는 안 띄움)
            await new Promise(resolve => setTimeout(resolve, 1200));
        }
    }
    isFetchingNames = false;
}

// ==========================================
// 숙련도 TOP5 채우기 (랭킹 표의 마지막 칸)
//   ★ 이 값은 champion-mastery v4 의 "전 큐 통합 누적 숙련도" 다.
//     솔랭 모스트가 아니다 — 큐별 모스트는 라이엇이 안 주고, 직접 세려면
//     1인당 경기 상세를 수십 번 받아야 해서 1.1만 명한테는 불가능하다.
//   ★ 닉네임 잡과 같은 구조인데 속도는 절반(분당 10명)이다. 두 잡이 동시에 몰리지 않도록
//     startJobs 에서 30초 어긋나게 띄운다.
//   ★ 한 바퀴에 약 18시간이 걸린다 (11,000명 / 분당 10명). 그래서 DB 에 저장하고
//     loadResolvedNames 가 다시 메모리에 올린다 — 재시작마다 처음부터면 영영 못 채운다.
// ==========================================
// 4주마다 갱신. 누적 숙련도는 랭크 모스트와 달리 순위가 잘 안 바뀌는 값이라
// 자주 받을 이유가 없다 (닉네임 14일보다도 길게 잡았다).
const MASTERY_TTL = 28 * 24 * 60 * 60 * 1000;

async function fillMasteryInBackground() {
    if (challengerList.length === 0 || isFetchingMastery) return;
    isFetchingMastery = true;

    const now = Date.now();
    const ONE_DAY = 24 * 60 * 60 * 1000;
    const TOP_PRIORITY = 1000;

    const pending = challengerList
        .map((p, rank) => ({ ...p, rank }))
        .filter(p => {
            if (failedMasteryPuuids[p.puuid] && now - failedMasteryPuuids[p.puuid] < ONE_DAY) return false;
            // ★ 닉네임이 아직 없는 사람은 건너뛴다. 두 가지 이유가 있다 —
            //   ① SummonerCache 에 줄이 없어서 저장할 곳이 없다(스키마상 displayName 이 필수라
            //      upsert 도 못 한다). 메모리에만 남으면 재시작 때 날아가 호출이 헛돈다
            //   ② 닉네임도 못 받은 줄은 화면에서 클릭도 안 되는 자리다. 숙련도가 더 급할 리 없다
            if (!resolvedNames[p.puuid]) return false;
            return !resolvedMastery[p.puuid] || (now - resolvedMastery[p.puuid].updatedAt > MASTERY_TTL);
        });

    const topPending = pending.filter(p => p.rank < TOP_PRIORITY);
    const restPending = pending.filter(p => p.rank >= TOP_PRIORITY);
    const targets = [...topPending, ...restPending].slice(0, 10);

    if (pending.length > 0) {
        console.log(`[Task] 숙련도: 대기 ${pending.length}명 (상위권 ${topPending.length}명 / 채움 ${Object.keys(resolvedMastery).length}명)`);
    }

    for (const p of targets) {
        try {
            const res = await riotApi.get(
                `https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${p.puuid}/top?count=5`
            );
            const top = (res.data || []).map(m => m.championId).filter(Boolean);
            resolvedMastery[p.puuid] = { top, updatedAt: now };
            delete failedMasteryPuuids[p.puuid];
            await SummonerCache.findOneAndUpdate(
                { puuid: p.puuid },
                { mastery: top, masteryAt: now },
                { upsert: false }   // 닉네임도 없는 사람에게 숙련도만 있는 줄을 만들지 않는다
            );
            myCache.del('challenger_ranking_data');
        } catch (err) {
            const status = err.response?.status;
            if (status === 404) {
                failedMasteryPuuids[p.puuid] = now;
            } else {
                console.error(`[Mastery] 오류 ${p.puuid.substring(0, 8)}: ${status || err.message}`);
            }
        }
        await new Promise(resolve => setTimeout(resolve, 1200));
    }

    isFetchingMastery = false;
}

// ==========================================
// 통계 수집 (2026-08-15 신설)
//
//   흐름:  명단 11,000명 matchlist  ->  매치 ID 등장 횟수 = k 하한
//            -> k >= 5 인 것만 detail  ->  슬림 문서로 저장하고 원본은 버린다
//
//   ★ matchlist 로 먼저 거르는 게 핵심이다. detail 을 받고 나서 걸러도 통계는 같지만
//     호출은 이미 나간 뒤라 한 푼도 아껴지지 않는다.
//   ★ 하루 1바퀴로 충분하다. 순회를 더 자주 돌아도 마스터+ 가 하루에 하는 판은 정해져
//     있어서 **수집되는 판 수가 안 늘고** 집계 지연만 줄어든다.
// ==========================================
const POS_CODE = { TOP: 0, JUNGLE: 1, MIDDLE: 2, BOTTOM: 3, UTILITY: 4 };
const STAT_QUEUE = 420;                      // 솔로랭크만 (라인 개념이 있고 표본이 가장 크다)
const STAT_MIN_K = 5;                        // 이 인원 이상일 때만 detail 을 받는다

// ★★ 하루를 반으로 나눠 역할을 분리한다 (2026-08-15).
//     00~12시  명단 순회      분당 16명 x 720분 = 11,520명  (명단 11,000명)
//     12~24시  detail 수집    분당 10건 x 720분 =  7,200건  (필요량 약 3,400건)
//   이렇게 하면 **정오에 순회가 완전히 끝나서 등장 횟수(k 하한)가 확정된 뒤에**
//   detail 을 받는다. 순회 도중에 받으면 아직 덜 세어진 판을 놓칠 수 있다.
//   덤으로 두 잡의 호출이 시간대로 갈려서 순간 호출량도 낮아진다.
const SCAN_PER_CYCLE = 16;                   // 분당 matchlist 호출 (순회 단계)
const FETCH_PER_CYCLE = 10;                  // 분당 detail 호출 (수집 단계)

// 한국시간 날짜
const kstDay = (ms) => new Date(ms + 9 * 3600000).toISOString().slice(0, 10);

// ★ 단계는 **시각이 아니라 진행 상태**로 가른다.
//   분당 16명이면 11,000명에 11.5시간이라 자정에 시작해 정오쯤 끝나고, 결과적으로
//   "오전 순회 / 오후 수집" 이 된다. 그런데 시각으로 하드코딩하면 재시작하거나
//   429 로 밀렸을 때 **그날 순회를 통째로 건너뛴다.** 남은 인원으로 판단하면
//   늦게 시작해도 알아서 따라잡는다.
// 상위 티어가 LP 순위와 얼마나 어긋났나를 한 줄 남긴다.
//   ★ 명단이 덜 찼으면 세지 않는다 — 마스터 조회만 실패해도 1~1000등이 통째로 달라져
//     "갑자기 어긋남이 사라진 것" 처럼 보인다. 그게 바로 우리가 찾는 신호라 더 위험하다.
async function saveApexDrift() {
    if (challengerList.length < RANK_SET_MIN) return;

    const lp = (t) => {
        const v = challengerList.filter(p => p.tier === t).map(p => p.leaguePoints);
        return v.length ? { max: Math.max(...v), min: Math.min(...v) } : null;
    };
    const c = lp('challengerleagues'), g = lp('grandmasterleagues'), m = lp('masterleagues');
    if (!c || !g || !m) return;

    // challengerList 는 이미 LP 내림차순이라 앞에서 잘라 세면 그게 등수다
    const c300 = challengerList.slice(0, 300).filter(p => p.tier === 'challengerleagues').length;
    const g1000 = challengerList.slice(0, 1000).filter(p => p.tier === 'grandmasterleagues').length;

    await ApexDrift.create({
        t: new Date(), c300, g1000,
        cMin: c.min, gMax: g.max, gMin: g.min, mMax: m.max
    });

    // 0 으로 떨어지는 순간이 곧 티어 재계산 시각이다
    console.log(`[Apex] 어긋남 챌린저 ${300 - c300}명 · 그마 ${700 - g1000}명` +
        ` (챌 최저 ${c.min} / 그마 최고 ${g.max} / 마스터 최고 ${m.max})`);
}

// ★★ 스냅샷을 **합집합으로** 쌓는다 — "그날 명단에 한 번이라도 있던 사람" 이 맞다.
//   명단은 10분마다 갈리므로 어느 한 순간을 찍으면 그날 낮에 강등된 사람이 빠진다.
//   첫 저장만 1.1만 건이고 그 뒤로는 **새로 들어온 사람만** 더한다 (하루 400명 남짓).
let rankSnapshotDay = null;
let rankSnapshotSet = new Set();

async function saveRankSnapshot() {
    if (rankPuuidSet.size === 0) return;
    const day = kstDay(Date.now());

    // 날짜가 넘어갔거나 방금 재시작했으면 그날 문서를 먼저 읽어 온다.
    // ★ 안 읽으면 재시작할 때마다 1.1만 건을 통째로 다시 밀어 넣는다 ($addToSet 이라
    //   결과는 같지만 쓸데없이 큰 쓰기가 배포마다 한 번씩 생긴다).
    if (rankSnapshotDay !== day) {
        const doc = await RankSnapshot.findOne({ day }).select('puuids').lean().catch(() => null);
        rankSnapshotSet = new Set(doc?.puuids || []);
        rankSnapshotDay = day;
    }

    const fresh = [...rankPuuidSet].filter(id => !rankSnapshotSet.has(id));
    if (fresh.length === 0) return;

    const size = rankSnapshotSet.size + fresh.length;
    await RankSnapshot.updateOne(
        { day },
        { $addToSet: { puuids: { $each: fresh } }, $set: { n: size }, $setOnInsert: { createdAt: new Date() } },
        { upsert: true }
    );
    fresh.forEach(id => rankSnapshotSet.add(id));
    console.log(`[Snapshot] ${day} 명단 ${size}명 (새로 ${fresh.length}명)`);
}

// ★★ 순회 대상 = **오늘 명단 ∪ 대상일(어제) 명단** (2026-08-17).
//   어제 마스터였다가 오늘 빠진 사람에게도 물어봐야 그 사람 몫의 등장 횟수가 안 샌다.
//   ★ 대상일 스냅샷이 없으면(도입 첫날·재시작 직후) 지금 명단만 쓴다 — 예전과 같은 동작이라
//     안전한 쪽으로 물러나는 것이다. 없다고 순회를 멈추면 그날이 통째로 빈다.
let scanExtraDay = null;
let scanExtraSet = new Set();

async function loadScanExtra() {
    const day = scanTargetDay();
    if (scanExtraDay === day) return;
    const doc = await RankSnapshot.findOne({ day }).select('puuids').lean().catch(() => null);
    scanExtraSet = new Set(doc?.puuids || []);
    scanExtraDay = day;
    console.log(`[Snapshot] 순회 대상일 ${day} 명단 ${scanExtraSet.size}명을 물려받았다`);
}

// ★ scanPending 과 scanMatchlists 가 **같은 목록**을 봐야 한다.
//   여기가 어긋나면 순회가 영원히 안 끝나 수집 단계로 못 넘어간다 (단계 전환 조건이 이 값이다).
const scanTargets = (day) => {
    const all = new Set(rankPuuidSet);
    scanExtraSet.forEach(id => all.add(id));
    return [...all].filter(puuid => matchScanDay[puuid] !== day);
};

const scanPending = () => scanTargets(scanTargetDay()).length;

// ★★ 수집 대상은 **어제 하루 전체**다 ("최근 24시간" 이 아니다).
//   예전엔 각자 "훑는 시점 기준 24시간" 을 봤는데, 순회가 반나절에 걸쳐 있어서
//   **사람마다 보는 창이 어긋났다.** A 를 0시에 훑으면 전날 0~24시를, B 를 11시에
//   훑으면 전날 11시~당일 11시를 보게 되어, 같은 판을 했어도 한쪽만 세는 일이 생긴다.
//   실측에서 `cnt < 실제 k` 가 52건 중 50건이었던 게 이것이다.
//   날짜로 못 박으면 전원이 같은 창을 보므로 등장 횟수가 정확해지고,
//   **일별 통계도 그 날짜가 통째로 채워진다** (지금은 부분만 채워진다).
const scanTargetDay = () => kstDay(Date.now() - 86400000);

// 룬 11칸을 뽑는다. 실측 1,000명 전원이 "주 계열 + 룬 4개 / 보조 계열 + 룬 2개 /
// 스탯 파편 3개" 로 형태가 같아서 길이를 못 박아도 안전하다.
function perkValues(p) {
    const styles = p.perks?.styles || [];
    const primary = styles.find(s => s.description === 'primaryStyle') || styles[0] || {};
    const sub = styles.find(s => s.description === 'subStyle') || styles[1] || {};
    const ps = (primary.selections || []).map(s => s.perk);
    const ss = (sub.selections || []).map(s => s.perk);
    const sp = p.perks?.statPerks || {};
    return [
        primary.style ?? 0, ps[0] ?? 0, ps[1] ?? 0, ps[2] ?? 0, ps[3] ?? 0,
        sub.style ?? 0, ss[0] ?? 0, ss[1] ?? 0,
        sp.offense ?? 0, sp.flex ?? 0, sp.defense ?? 0
    ];
}

// detail -> 슬림 문서. 통계에 쓸 값만 배열로 눕힌다.
//
// ★★ 참가자 1명 = 28칸이고 **자리가 곧 의미다.** 집계가 $arrayElemAt 으로 자리를
//   찍어 읽으므로, 순서를 바꾸거나 중간에 끼워 넣으면 **이미 저장된 문서가 통째로
//   어긋난다.** 새 값은 반드시 **뒤에** 붙일 것.
//
//    0 챔피언   1 라인(0탑~4서폿, -1 판정실패)   2 승패   3 팀(100/200)
//    4 킬   5 데스   6 어시   7 챔피언 딜량   8 골드
//    9~14 최종 아이템 6칸
//   15 소환사 주문1   16 소환사 주문2
//   17 주 룬계열   18~21 주 룬 4개
//   22 보조 룬계열   23~24 보조 룬 2개
//   25 공격 파편   26 유연 파편   27 방어 파편
//   ★ rankSet 은 **그 경기 날짜의 명단**이다 (2026-08-17). 예전엔 전역 rankPuuidSet
//     ("지금 명단")을 직접 봤는데, 수집이 경기 다음 날 저녁이라 그 사이 강등된 사람이
//     안 세어져 5명짜리가 4명으로 찍혔다. 부르는 쪽에서 날짜에 맞는 집합을 넘긴다.
function toSlimMatch(detail, rankSet) {
    const info = detail?.info;
    const meta = detail?.metadata;
    if (!info || !meta || info.queueId !== STAT_QUEUE) return null;
    if (!Array.isArray(info.participants) || info.participants.length !== 10) return null;

    // ★ 리메이크(다시하기)는 뺀다. 실제 경기가 아닌데 win 이 5:5 로 찍혀서
    //   안 빼면 승률에 그대로 노이즈가 섞인다. 솔랭 기준 0.7% 정도 나온다.
    //   gameDuration 으로 자르면 안 된다 — 리메이크는 65~90초인데 5분 근처엔
    //   정상 경기(326초 GameComplete)도 있다. 전용 필드가 정확하다.
    if (info.participants.some(p => p.gameEndedInEarlySurrender)) return null;

    // ★ 정확한 k 는 여기서 나온다. matchlist 등장 횟수는 하한일 뿐이다.
    const k = (meta.participants || []).filter(id => rankSet.has(id)).length;

    return {
        matchId: meta.matchId,
        k,
        v: (info.gameVersion || '').split('.').slice(0, 2).join('.'),
        t: Math.floor((info.gameCreation || 0) / 1000),
        d: info.gameDuration || 0,
        p: info.participants.map(p => [
            p.championId ?? 0,
            POS_CODE[p.teamPosition] ?? -1,
            p.win ? 1 : 0,
            p.teamId ?? 0,
            p.kills ?? 0, p.deaths ?? 0, p.assists ?? 0,
            p.totalDamageDealtToChampions ?? 0, p.goldEarned ?? 0,
            p.item0 ?? 0, p.item1 ?? 0, p.item2 ?? 0, p.item3 ?? 0, p.item4 ?? 0, p.item5 ?? 0,
            p.summoner1Id ?? 0, p.summoner2Id ?? 0,
            ...perkValues(p)
        ]),
        // ★ -1 은 "밴을 안 했다" 는 뜻이라 뺀다. 솔랭 판의 66%에 하나 이상 들어 있어서
        //   그대로 담으면 밴률 분자가 엉킨다.
        b: (info.teams || []).flatMap(t => (t.bans || []).map(x => x.championId)).filter(id => id > 0)
    };
}

// ① 명단을 훑으며 매치 ID 등장 횟수를 센다 (오전에만 돈다)
async function scanMatchlists() {
    if (challengerList.length === 0 || isScanningMatches) return;
    isScanningMatches = true;

    try {
        const day = scanTargetDay();
        const from = Math.floor(Date.parse(`${day}T00:00:00+09:00`) / 1000);
        const to = from + 86400;

        // ★ 대상일 명단을 물려받는다 (하루 한 번만 읽는다)
        await loadScanExtra();

        // 이 날짜를 아직 안 훑은 사람만. 다 훑었으면 쉰다 (그때부터 수집 단계다).
        //   ★ 오늘 명단 + 대상일 명단이다. 오늘 빠진 사람도 어제 게임은 했다.
        const targets = scanTargets(day).slice(0, SCAN_PER_CYCLE).map(puuid => ({ puuid }));
        if (targets.length === 0) { isScanningMatches = false; return; }

        for (const p of targets) {
            try {
                // ★ endTime 까지 준다. 하루가 통째로 닫힌 구간이라 전원이 같은 창을 본다.
                //   count 는 100(최대)로 둔다 — 하루 100판을 넘기는 사람은 없고,
                //   모자라면 그 사람 판이 통째로 누락되므로 넉넉한 쪽이 안전하다.
                const res = await riotApi.get(
                    `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${p.puuid}/ids` +
                    `?queue=${STAT_QUEUE}&startTime=${from}&endTime=${to}&start=0&count=100`
                );
                const ids = res.data || [];

                if (ids.length > 0) {
                    // 한 번에 밀어 넣는다. 낱개로 보내면 DB 왕복만 그만큼이다.
                    await MatchSeen.bulkWrite(ids.map(id => ({
                        updateOne: {
                            filter: { matchId: id },
                            update: { $inc: { cnt: 1 }, $setOnInsert: { day, createdAt: new Date() } },
                            upsert: true
                        }
                    })), { ordered: false });
                    statCounters.seen += ids.length;
                }

                matchScanDay[p.puuid] = day;
                statCounters.scan++;
                // 닉네임이 없는 사람은 SummonerCache 에 줄이 없다(displayName 이 필수라
                // upsert 도 못 한다). 그런 사람은 메모리에만 두고 넘어간다.
                SummonerCache.updateOne({ puuid: p.puuid }, { matchScanDay: day }).catch(() => { });

            } catch (err) {
                const status = err.response?.status;
                if (status === 429) {
                    // 한도에 닿았으면 이번 사이클은 접는다. 다음 분에 다시 온다.
                    console.warn('[Stat] 429 — 이번 사이클 중단');
                    break;
                }
                // 그 외 오류는 다음 사이클에 자연히 재시도된다 (matchScanDay 를 안 찍는다)
                console.error(`[Stat] matchlist 실패 ${p.puuid.substring(0, 8)}: ${status || err.message}`);
            }
            await sleep(1200);
        }
    } finally {
        isScanningMatches = false;
    }
}

// ② 기준을 넘긴 매치만 detail 을 받아 슬림으로 저장한다 (오후에만 돈다)
//   ★ 순회가 끝난 뒤에 도는 게 핵심이다. 순회 도중이면 등장 횟수가 아직 덜 세어져서
//     기준(5)을 못 넘긴 판을 그냥 지나칠 수 있다.
// ★★ 명단이 이만큼은 차 있어야 k 를 센다 (2026-08-16 사고로 추가).
//   정상값은 11,000명(챌 300 + 그마 700 + 마스터 1만)이라 5,000이면 넉넉한 하한이다.
const RANK_SET_MIN = 5000;

// k 를 셀 때 쓸 집합. **대상일 스냅샷이 있으면 그것**, 없으면 지금 명단이다.
//   하루에 한 번만 읽는다 (분마다 0.9MB 를 읽을 이유가 없다).
let statRankDay = null;
let statRankCache = null;
let statRankWarnedDay = null;

async function statRankSet() {
    const day = scanTargetDay();
    if (statRankDay === day && statRankCache) return statRankCache;

    const doc = await RankSnapshot.findOne({ day }).select('puuids').lean().catch(() => null);
    const snap = new Set(doc?.puuids || []);

    if (snap.size >= RANK_SET_MIN) {
        console.log(`[Stat] k 판정에 ${day} 명단 ${snap.size}명을 쓴다`);
        statRankCache = snap;
        statRankDay = day;
        return statRankCache;
    }

    // ── 도입 첫날이거나 스냅샷이 덜 찬 경우. 예전 동작(지금 명단)으로 물러난다.
    //   ★★ 이 경로는 **캐시하지 않는다.** 두 가지 이유가 다 중요하다:
    //     ① `rankPuuidSet` 은 10분마다 **새 Set 으로 갈아 끼워진다.** 참조를 캐시해 두면
    //        그 시점 명단에 하루 종일 묶여 옛 명단으로 k 를 세게 된다.
    //     ② 스냅샷이 조금 뒤에 채워질 수도 있다. 캐시를 안 하면 다음 사이클에 알아서 갈아탄다.
    if (statRankWarnedDay !== day) {
        console.warn(`[Stat] ${day} 스냅샷이 ${snap.size}명뿐이라 지금 명단(${rankPuuidSet.size}명)으로 k 를 센다`);
        statRankWarnedDay = day;   // 분마다 찍히면 로그가 묻힌다
    }
    return rankPuuidSet;
}

async function fetchMatchStats() {
    // ★★ `size === 0` 만 보면 안 된다 — **명단이 "일부만" 찬 창이 실제로 있었다.**
    //   2026-08-16 14시대에 저장된 586건 중 98건(16.7%)이 `cnt=9 인데 k=0` 으로 들어갔다.
    //   재시작 직후 updateChallengerList 에서 일부 티어만 성공하면 rankListByTier 의
    //   나머지가 빈 배열이라(첫 기동이라 물려받을 이전 명단도 없다) rankPuuidSet 이
    //   수백 명짜리가 된다. size 는 0이 아니니 이 가드를 통과하고, 그 상태로 수집하면
    //   **마스터 9명이 낀 판이 k=0 으로 기록된다.**
    //   ★ k 는 원본을 안 남겨서 나중에 다시 셀 수 없다 (슬림 문서에 puuid 가 없다).
    //     그래서 "틀리게 저장하느니 안 하는" 쪽이 맞다 — 잠깐 쉬면 다음 분에 다시 온다.
    if (isFetchingStats || rankPuuidSet.size < RANK_SET_MIN) {
        if (!isFetchingStats && rankPuuidSet.size > 0) {
            console.warn(`[Stat] 명단이 ${rankPuuidSet.size}명뿐이라 수집을 건너뛴다 (최소 ${RANK_SET_MIN})`);
        }
        return;
    }
    // ★ 순회가 남아 있으면 손대지 않는다. 등장 횟수가 아직 덜 세어져서
    //   기준(5)을 못 넘긴 판을 그냥 지나치게 된다.
    //   ★ 대상일 명단을 여기서도 먼저 물려받는다 — 안 그러면 재시작 직후 첫 1분에
    //     **대상일 명단 몫(437명)을 뺀 채로** pending 을 세어 0 으로 보고 수집을 시작한다.
    await loadScanExtra();
    if (scanPending() > 0) return;
    isFetchingStats = true;

    try {
        // ★★ k 는 **그 경기 날짜의 명단**으로 센다 (2026-08-17). 수집이 경기 다음 날
        //   저녁이라 "지금 명단" 으로 세면 그 사이 강등된 사람이 빠져 5명짜리가 4명이 된다.
        //   ★ 스냅샷이 없거나 너무 작으면 지금 명단으로 물러난다 — 예전과 같은 동작이다.
        //     여기서 멈추면 그날 수집이 통째로 날아가므로, 조금 틀리더라도 도는 편이 낫다.
        const rankSet = await statRankSet();
        // ★ 지금 순회를 마친 날짜만 처리한다. 이전 날짜가 섞이면 안 되는데,
        //   서버를 늦은 시각에 처음 띄우면 그날은 순회를 다 못 채우고 자정에 대상이
        //   넘어간다. 그 **부분만 모인 날짜**를 그대로 집계하면 일별 통계가 왜곡된다.
        //   남겨 둬도 matchseens TTL(3일)이 알아서 치운다.
        // 사람이 많이 낀 판부터 처리한다. 명단 커버리지가 높은 판이 통계 가치도 높다.
        const targets = await MatchSeen
            .find({ done: { $ne: true }, cnt: { $gte: STAT_MIN_K }, day: scanTargetDay() })
            .sort({ cnt: -1 })
            .limit(FETCH_PER_CYCLE)
            .lean();

        for (const t of targets) {
            try {
                const { data } = await riotApi.get(
                    `https://asia.api.riotgames.com/lol/match/v5/matches/${t.matchId}`
                );
                const slim = toSlimMatch(data, rankSet);

                if (slim) {
                    await MatchStat.updateOne({ matchId: slim.matchId }, { $set: slim }, { upsert: true });
                    statCounters.save++;
                } else {
                    statCounters.skip++;   // 리메이크 / 다른 큐 / 형태가 이상한 판
                }
                statCounters.fetch++;
                await MatchSeen.updateOne({ _id: t._id }, { $set: { done: true } });

            } catch (err) {
                const status = err.response?.status;
                if (status === 429) {
                    console.warn('[Stat] 429 — detail 이번 사이클 중단');
                    break;
                }
                if (status === 404) {
                    // 없는 경기는 다시 시도해도 소용없다
                    await MatchSeen.updateOne({ _id: t._id }, { $set: { done: true } });
                } else {
                    console.error(`[Stat] detail 실패 ${t.matchId}: ${status || err.message}`);
                }
            }
            await sleep(1200);
        }
    } catch (e) {
        console.error('[Stat] 수집 오류:', e.message);
    } finally {
        isFetchingStats = false;
    }
}

// ==========================================
// ③ 집계 — 슬림 경기를 챔피언별 통계로 (라이엇 호출 0회, DB 안에서만 돈다)
//
//   ★ 증분이 아니라 scope 단위 **전체 재계산**이다. 증분은 중복 반영·누락 버그가
//     나기 쉬운데, 일별은 하루치(3~4천 건)라 가볍고 패치별도 2주치뿐이다.
// ==========================================
const K_BAND_CUT = 8;              // 이 값 이상이면 "8-10", 미만이면 "5-7"
const DAILY_SCOPE_DAYS = 7;        // 최근 며칠치 일별 집계를 유지할지

// 한국시간 기준 날짜 문자열. 경기 시각(t)이 UTC epoch 라 그냥 자르면 하루가 밀린다.
// (한국시간 날짜 헬퍼는 위 수집 절의 kstDay 를 그대로 쓴다)

async function buildOneScope(scopeKey, matchCond) {
    const rows = await MatchStat.aggregate([
        { $match: matchCond },
        { $addFields: { kb: { $cond: [{ $gte: ['$k', K_BAND_CUT] }, '8-10', '5-7'] } } },
        {
            $facet: {
                // 참가자를 펼쳐 챔피언 x 라인으로 센다
                picks: [
                    { $unwind: '$p' },
                    {
                        $group: {
                            _id: { kb: '$kb', c: { $arrayElemAt: ['$p', 0] }, pos: { $arrayElemAt: ['$p', 1] } },
                            games: { $sum: 1 },
                            wins: { $sum: { $arrayElemAt: ['$p', 2] } },
                            kills: { $sum: { $arrayElemAt: ['$p', 4] } },
                            deaths: { $sum: { $arrayElemAt: ['$p', 5] } },
                            assists: { $sum: { $arrayElemAt: ['$p', 6] } }
                        }
                    }
                ],
                // ★★ 롤 솔랭은 **양 팀이 같은 챔피언을 밴할 수 있다** — 실측 685판 중
                //   59.3% 에서 실제로 일어난다. 그래서 세는 방법이 두 가지고 뜻이 다르다:
                //     bans     = 밴 슬롯을 몇 개 먹었나 (양 팀이 밴하면 2)  ← 지금 화면 기본값
                //     banGames = 몇 판에서 밴됐나       (양 팀이 밴해도 1)  ← 흔히 말하는 "밴률"
                //   카밀 실측이 612회(89.3%) vs 480판(70.1%) 로 19%p 차이가 난다.
                //   ★ bans 를 쓰면 **픽률 + 밴률이 100%를 넘을 수 있다**. 버그가 아니라
                //     정의상 그렇다 (밴 슬롯은 판당 10개라 합계가 1000%까지 가능하다).
                //     둘 다 담아 두는 건 나중에 화면에서 고르기 위해서다.
                bans: [
                    { $unwind: '$b' },
                    { $group: { _id: { kb: '$kb', c: '$b' }, bans: { $sum: 1 } } }
                ],
                banGames: [
                    { $addFields: { b: { $setUnion: ['$b', []] } } },
                    { $unwind: '$b' },
                    { $group: { _id: { kb: '$kb', c: '$b' }, n: { $sum: 1 } } }
                ],
                totals: [{ $group: { _id: '$kb', games: { $sum: 1 } } }]
            }
        }
    ]).allowDiskUse(true);

    const f = rows[0] || { picks: [], bans: [], banGames: [], totals: [] };
    if (!f.totals.length) return 0;

    const agg = new Map();
    const put = (kb, c, pos, add) => {
        const key = `${kb}|${c}|${pos}`;
        let cur = agg.get(key);
        if (!cur) agg.set(key, cur = {
            scope: scopeKey, kb, champ: c, pos,
            games: 0, wins: 0, bans: 0, banGames: 0, kills: 0, deaths: 0, assists: 0
        });
        for (const k in add) cur[k] += add[k];
    };

    f.picks.forEach(r => {
        const { kb, c } = r._id;
        if (c == null) return;
        const pos = r._id.pos ?? -1;
        const add = { games: r.games, wins: r.wins, kills: r.kills, deaths: r.deaths, assists: r.assists };
        // ★ pos 가 -1(라인 판정 실패)이면 합계에만 넣는다. 둘 다 넣으면 이중 계산이다.
        if (pos >= 0) put(kb, c, pos, add);
        put(kb, c, -1, add);
    });
    // ★ 밴은 라인 개념이 없으므로 pos: -1 줄에만 얹는다.
    f.bans.forEach(r => { if (r._id.c != null) put(r._id.kb, r._id.c, -1, { bans: r.bans }); });
    f.banGames.forEach(r => { if (r._id.c != null) put(r._id.kb, r._id.c, -1, { banGames: r.n }); });

    // 재계산이라 통째로 갈아 끼운다. $set 으로 덮으면 이번에 안 나온 챔피언 줄이
    // 옛 숫자를 그대로 들고 남는다.
    const docs = [...agg.values()];
    await ChampStat.deleteMany({ scope: scopeKey });
    if (docs.length) await ChampStat.insertMany(docs, { ordered: false });

    await StatScope.bulkWrite(f.totals.map(t => ({
        updateOne: {
            filter: { scope: scopeKey, kb: t._id },
            update: { $set: { games: t.games, updatedAt: new Date() } },
            upsert: true
        }
    })));

    return f.totals.reduce((a, t) => a + t.games, 0);
}

// ★ 조합별로 top 몇 개까지 남길지. 룬 페이지는 조합 가짓수가 커서(주 4 x 3 x 3 x 3 x
//   보조 계열 4 x 조합) 판당 새 조합이 나오다시피 한다 — 자르지 않으면 1판짜리 줄이
//   컬렉션을 뒤덮는다. 화면은 어차피 top 3 만 쓰므로 12면 넉넉하다.
const BUILD_TOP_N = 12;

// 챔피언별 룬·주문 빌드 집계. **패치 scope 에만 부른다** (champBuildSchema 주석 참고)
async function buildOneBuildScope(scopeKey, matchCond) {
    const P = i => ({ $arrayElemAt: ['$p', i] });

    // ★ $unwind 를 한 번만 하고 $facet 으로 네 갈래를 낸다. 갈래마다 따로 aggregate 를
    //   돌리면 110만 행짜리 unwind 를 다섯 번 반복하게 된다 (M0 무료 티어라 뼈아프다).
    const rows = await MatchStat.aggregate([
        { $match: matchCond },
        { $project: { p: 1 } },
        { $unwind: '$p' },
        {
            $project: {
                c: P(0), w: P(2),
                // ★★ 보조 룬 2개(23·24번 칸)는 **반드시 정렬해야 한다** (2026-08-16).
                //   라이엇이 주는 순서가 일정하지 않아서 **같은 룬 페이지가 두 조합으로
                //   갈렸다** — 리 신의 "영감 · 우주적 통찰력 · 마법의 신발" 81판과
                //   "영감 · 마법의 신발 · 우주적 통찰력" 62판이 실제로는 143판 한 조합이다.
                //   전수로 재니 조합 가짓수가 3021 → 2559 로 **15% 가 중복**이었다.
                //   ★ 주 룬 3개(19~21)는 정렬하면 안 되는 게 아니라 **할 필요가 없다** —
                //     라이엇이 이미 슬롯 순서로 준다 (정렬 전후 가짓수가 3021 로 같았다).
                //     그대로 두면 화면에서 인게임과 같은 순서로 그려진다.
                //   ★ 정렬한 보조 2개는 **id 순서라 슬롯 순서와 다르다** (어긋나는 쌍 139개).
                //     화면이 perk_data.js 의 slots 로 되돌려 그린다.
                rune: {
                    $concatArrays: [
                        [P(17), P(18), P(19), P(20), P(21), P(22)],
                        { $sortArray: { input: [P(23), P(24)], sortBy: 1 } }
                    ]
                },
                keystone: [P(17), P(18)],
                shard: [P(25), P(26), P(27)],
                // 같은 이유로 주문도 작은 id 를 앞으로. 점멸/점화와 점화/점멸이 갈리면
                // 표본이 반이 된다.
                spell: { $cond: [{ $lt: [P(15), P(16)] }, [P(15), P(16)], [P(16), P(15)]] }
            }
        },
        {
            $facet: {
                rune: [{ $group: { _id: { c: '$c', k: '$rune' }, games: { $sum: 1 }, wins: { $sum: '$w' } } }],
                keystone: [{ $group: { _id: { c: '$c', k: '$keystone' }, games: { $sum: 1 }, wins: { $sum: '$w' } } }],
                spell: [{ $group: { _id: { c: '$c', k: '$spell' }, games: { $sum: 1 }, wins: { $sum: '$w' } } }],
                shard: [{ $group: { _id: { c: '$c', k: '$shard' }, games: { $sum: 1 }, wins: { $sum: '$w' } } }],
                // ★ 챔피언 총 판수. top N 으로 자르고 나면 줄을 더해도 총합이 안 나오므로
                //   분모를 따로 담아야 한다. champstats 에서 가져오면 될 것 같지만
                //   거기는 kb 로 쪼개져 있고 화면의 밴드 필터에 따라 값이 달라진다.
                all: [{ $group: { _id: { c: '$c', k: [] }, games: { $sum: 1 }, wins: { $sum: '$w' } } }]
            }
        }
    ]).allowDiskUse(true);

    const f = rows[0];
    if (!f) return 0;

    const docs = [];
    for (const type of ['rune', 'keystone', 'spell', 'shard', 'all']) {
        // 챔피언별로 모아서 많이 쓴 순으로 자른다
        const byChamp = new Map();
        (f[type] || []).forEach(r => {
            const c = r._id.c;
            if (c == null) return;
            if (!byChamp.has(c)) byChamp.set(c, []);
            byChamp.get(c).push({ scope: scopeKey, champ: c, type, key: r._id.k || [], games: r.games, wins: r.wins });
        });
        byChamp.forEach(list => {
            list.sort((a, b) => b.games - a.games);
            docs.push(...(type === 'all' ? list : list.slice(0, BUILD_TOP_N)));
        });
    }

    // champstats 와 같은 이유로 통째로 갈아 끼운다 — $set 으로 덮으면 이번에 안 나온
    // 조합이 옛 숫자를 들고 남는다.
    await ChampBuild.deleteMany({ scope: scopeKey });
    if (docs.length) await ChampBuild.insertMany(docs, { ordered: false });
    return docs.length;
}

async function buildChampStats() {
    if (isBuildingStats) return;
    isBuildingStats = true;
    const started = Date.now();

    try {
        const scopes = [];

        // 패치별 — MatchStat 에 실제로 들어 있는 패치만
        (await MatchStat.distinct('v')).filter(Boolean)
            .forEach(v => scopes.push({ key: `p:${v}`, cond: { v } }));

        // 일별 — 최근 7일 (한국시간 기준)
        const now = Date.now();
        for (let i = 0; i < DAILY_SCOPE_DAYS; i++) {
            const day = kstDay(now - i * 86400000);
            const from = Math.floor(Date.parse(`${day}T00:00:00+09:00`) / 1000);
            scopes.push({ key: `d:${day}`, cond: { t: { $gte: from, $lt: from + 86400 } } });
        }

        let total = 0;
        let builds = 0;
        for (const s of scopes) {
            total += await buildOneScope(s.key, s.cond);
            // ★ 룬 빌드는 패치 scope 에만 만든다. 하루치 룬 조합은 거의 전부 1판짜리다.
            if (s.key.startsWith('p:')) builds += await buildOneBuildScope(s.key, s.cond);
        }

        // 원본이 사라진 패치의 빌드 집계는 그대로 얼려 둔다 (champstats 와 같은 규칙).
        // 여기서 지우는 건 일별 scope 뿐인데, 빌드는 애초에 일별을 안 만드니 할 일이 없다.

        // 기간이 지난 일별 집계는 지운다 (패치별은 남긴다).
        // ★ 한 객체에 같은 키를 두 번 쓰면 뒤엣것만 남으므로 연산자를 합쳐서 쓴다.
        const keep = scopes.map(s => s.key);
        await ChampStat.deleteMany({ scope: { $regex: '^d:', $nin: keep } });
        await StatScope.deleteMany({ scope: { $regex: '^d:', $nin: keep } });

        if (total > 0) {
            console.log(`[Stat] 집계 완료: scope ${scopes.length}개 / 연인원 ${total}판 / 빌드 ${builds}행 / ${((Date.now() - started) / 1000).toFixed(1)}초`);
        }
    } catch (e) {
        console.error('[Stat] 집계 실패:', e.message);
    } finally {
        isBuildingStats = false;
    }
}

// ==========================================
// 인덱스 보정 (2026-08-15 신설)
//
//   ★★ mongoose 가 스키마에 적은 인덱스를 실제로 만들어 주지 않고 있었다.
//     `.index()` 로 선언한 3개(429 폴백 조회용·자동완성용)가 DB 에 통째로 없었고,
//     새로 만든 TTL 두 개도 안 생겼다. **`unique: true` 로 붙은 것만 살아 있었다.**
//   ★★ 그리고 **이미 있는 TTL 은 `expires` 를 고쳐도 안 바뀐다.** 인덱스는 한번 만들어지면
//     정의가 고정되므로 `collMod` 로 값을 갈아야 한다. 스키마만 고치고 끝내면
//     "코드에는 7일이라고 적혀 있는데 실제로는 14일" 인 상태가 조용히 유지된다.
// ==========================================
async function ensureStatIndexes() {
    const want = [
        // TTL — 값이 다르면 collMod 로 갈아 끼운다
        { col: 'matchcaches', key: { createdAt: 1 }, ttl: 7 * 86400 },
        { col: 'matchstats', key: { createdAt: 1 }, ttl: 30 * 86400 },
        { col: 'matchseens', key: { createdAt: 1 }, ttl: 3 * 86400 },
        // 조회용 — 선언만 돼 있고 실제로 없던 것들
        { col: 'matchcaches', key: { 'detail.metadata.participants': 1, 'detail.info.gameEndTimestamp': -1 } },
        { col: 'summonercaches', key: { displayName: 1 } },
        { col: 'summonercaches', key: { namePartLower: 1, tierScore: -1 } },
        // 통계 수집·집계용
        { col: 'matchseens', key: { done: 1, cnt: -1 } },
        { col: 'champbuilds', key: { scope: 1, champ: 1 } },
        // 신화상점.
        //   ★★ `date` 의 unique 도 여기 적어야 한다. 스키마에 `unique: true` 를 써 놨지만
        //     **실제로 안 만들어졌다** (2026-08-16 실측: `_id_` 와 아래 복합 인덱스뿐이었다).
        //     이게 없으면 같은 날짜가 동시에 두 번 들어올 때 문서가 둘 생기고
        //     POST 의 11000 처리도 영영 안 탄다 — 하루 한 번짜리라 드물지만 막을 수 있는 건 막는다.
        //     ★ 2026-08-17에 `date` 단독에서 `date + section` 으로 바뀌었다 — 같은 날짜에
        //       일일과 주간이 따로 들어와야 하기 때문이다. 옛 인덱스는 아래 legacy 가 지운다.
        { col: 'mythicshops', key: { date: 1, section: 1 }, unique: true },
        { col: 'mythicshops', key: { 'items.catalogId': 1, date: -1 } },   // "마지막 등장일" 조회용
        { col: 'mythicshops', key: { section: 1, date: -1 } },             // 구획별 최신 조회용
        // 날짜별 명단 스냅샷 (2026-08-17). TTL 5일 — 필요한 건 어제 것뿐이고 넉넉히 남긴다.
        { col: 'ranksnapshots', key: { day: 1 }, unique: true },
        { col: 'ranksnapshots', key: { createdAt: 1 }, ttl: 5 * 86400 },
        // 상위 티어 어긋남 눈금 (2026-08-17). 한 줄 60B 라 7일이면 100KB 도 안 된다
        { col: 'apexdrifts', key: { t: -1 } },
        { col: 'apexdrifts', key: { createdAt: 1 }, ttl: 7 * 86400 },
        { col: 'matchstats', key: { v: 1, k: 1 } },
        { col: 'matchstats', key: { t: 1 } },
        { col: 'champstats', key: { scope: 1, kb: 1, pos: 1 } },
        { col: 'statscopes', key: { scope: 1, kb: 1 }, unique: true }
    ];

    // ★★ 못 쓰게 된 옛 인덱스. **지우기 전에 새 걸 만들면 안 된다** — `date` 단독 unique 가
    //   살아 있는 동안은 같은 날짜의 두 번째 구획이 11000 으로 막힌다.
    const legacy = [
        { col: 'mythicshops', name: 'date_1' }   // 2026-08-17: date + section 으로 대체
    ];

    const db = mongoose.connection.db;
    let made = 0, changed = 0, dropped = 0;

    // ★ 새 인덱스보다 먼저 돈다. 순서가 뒤바뀌면 위 이유로 막힌다.
    for (const l of legacy) {
        try {
            const existing = await db.collection(l.col).indexes().catch(() => []);
            if (existing.some(i => i.name === l.name)) {
                await db.collection(l.col).dropIndex(l.name);
                console.log(`[Index] 옛 인덱스 삭제 ${l.col} ${l.name}`);
                dropped++;
            }
        } catch (e) {
            console.error(`[Index] ${l.col} ${l.name} 삭제 실패: ${e.message}`);
        }
    }

    // ★★ `section` 이 없는 옛 신화상점 문서를 메운다. **복합 unique 를 만들기 전에** 해야 한다 —
    //   빠진 필드는 인덱스에서 null 로 잡혀서, 같은 날짜에 section:'daily' 문서가 새로 들어오면
    //   막히지 않고 **문서가 둘 생긴다.** 구획이 생기기 전 것은 전부 일일이었다.
    try {
        const r = await MythicShop.updateMany({ section: { $exists: false } }, { $set: { section: 'daily' } });
        if (r.modifiedCount) console.log(`[Index] 신화상점 section 메움: ${r.modifiedCount}건 → daily`);
    } catch (e) {
        console.error(`[Index] 신화상점 section 메우기 실패: ${e.message}`);
    }

    for (const w of want) {
        try {
            const existing = await db.collection(w.col).indexes().catch(() => []);
            const hit = existing.find(i => JSON.stringify(i.key) === JSON.stringify(w.key));

            if (!hit) {
                const opts = {};
                if (w.ttl) opts.expireAfterSeconds = w.ttl;
                if (w.unique) opts.unique = true;
                await db.collection(w.col).createIndex(w.key, opts);
                console.log(`[Index] 생성 ${w.col} ${JSON.stringify(w.key)}${w.ttl ? ` (TTL ${w.ttl / 86400}일)` : ''}`);
                made++;
            } else if (w.ttl && hit.expireAfterSeconds !== w.ttl) {
                const from = (hit.expireAfterSeconds / 86400).toFixed(0);
                try {
                    // collMod 가 되면 이게 낫다 — 인덱스가 잠시도 사라지지 않는다.
                    await db.command({ collMod: w.col, index: { name: hit.name, expireAfterSeconds: w.ttl } });
                } catch (e) {
                    // ★ Atlas 무료 티어(M0)는 collMod 권한이 없다
                    //   ("user is not allowed to do action [collMod]").
                    //   그럴 땐 지우고 다시 만든다. TTL 청소는 60초 주기라 그 틈에 새는 건 없다.
                    await db.collection(w.col).dropIndex(hit.name);
                    await db.collection(w.col).createIndex(w.key, { expireAfterSeconds: w.ttl });
                }
                console.log(`[Index] TTL 변경 ${w.col} ${from}일 → ${w.ttl / 86400}일`);
                changed++;
            }
        } catch (e) {
            console.error(`[Index] ${w.col} ${JSON.stringify(w.key)} 실패: ${e.message}`);
        }
    }
    if (made || changed || dropped) console.log(`[Index] 보정 완료 (생성 ${made} / TTL 변경 ${changed} / 삭제 ${dropped})`);
}

// ★★ 명단 갱신 주기를 시간대로 나눈다 (2026-08-17).
//   **밤 22시~새벽 02시(KST)는 5분, 나머지는 10분.** 티어 재계산이 그 근처로 짐작돼서
//   그 창만 촘촘히 본다 (`ApexDrift` 가 0 으로 떨어지는 순간을 놓치지 않으려고).
//   ★ 호출은 거의 안 는다 — 한 번에 3회(챌/그마/마스터)이고 하루 24회가 더해질 뿐이다
//     (144 → 168회/일). 개발 키 한도가 분당 50회라 순간 최대도 3/5분 = 0.6회/분이다.
//   ★ setInterval 이 아니라 **끝난 뒤 다시 예약**한다 — 조회가 느릴 때 겹쳐 도는 걸 막고,
//     시간대가 바뀌면 다음 예약부터 새 주기가 자연히 적용된다.
const RANK_REFRESH_NIGHT = 5 * 60 * 1000;
const RANK_REFRESH_DAY = 10 * 60 * 1000;

function rankRefreshMs() {
    const h = new Date(Date.now() + 9 * 3600000).getUTCHours();   // 한국시간 시(時)
    return (h >= 22 || h < 2) ? RANK_REFRESH_NIGHT : RANK_REFRESH_DAY;
}

function scheduleRankUpdate() {
    setTimeout(async () => {
        try { await updateChallengerList(); } catch (e) { console.error('[Task] 명단 갱신 실패:', e.message); }
        scheduleRankUpdate();
    }, rankRefreshMs());
}

async function startJobs() {
    await ensureStatIndexes();
    await loadResolvedNames();
    await backfillSearchFields();
    await updateVersion();
    await updateArenaAugments();
    await updateChallengerList();

    // ★★ 로컬에서 화면만 확인할 때는 `READONLY_JOBS=1 node server.js` 로 띄운다.
    //   로컬 서버가 **프로덕션과 같은 DB · 같은 API 키**를 쓰기 때문이다. 그냥 띄우면
    //   순회·수집 잡이 Railway 쪽과 **같은 매치를 두 번 처리**하고 라이엇 호출도
    //   두 배가 되어 429 를 부른다 (2026-08-15에 matchseens 가 실제로 섞였다).
    //   여기서 멈추므로 조회 API 와 화면은 그대로 살아 있다.
    if (process.env.READONLY_JOBS === '1') {
        console.log('[System] READONLY_JOBS=1 — 백그라운드 잡을 띄우지 않는다 (조회만 가능)');
        return;
    }

    // 닉네임 변환은 오래 걸리므로 기다리지 않고 백그라운드로 던짐
    resolveNamesInBackground();

    scheduleRankUpdate();
    setInterval(resolveNamesInBackground, 60 * 1000);

    // ★ 숙련도 잡은 30초 어긋나게 띄운다. 닉네임 20회(24초) + 숙련도 10회(12초)를
    //   같이 출발시키면 순간 호출량이 겹쳐 개발 키 한도(2분 100회)에 훨씬 빨리 닿는다.
    setTimeout(() => {
        fillMasteryInBackground();
        setInterval(fillMasteryInBackground, 60 * 1000);
    }, 30 * 1000);
    setInterval(updateArenaAugments, 24 * 60 * 60 * 1000);

    // ★ 통계 수집 두 잡도 기존 잡들과 15초씩 어긋나게 띄운다.
    //   0초 닉네임 / 15초 matchlist / 30초 숙련도 / 45초 detail 순서다.
    //   ★ 둘은 시간대가 갈려서 절대 같이 안 돈다 (오전 순회 16 / 오후 수집 10).
    //     그래서 순간 최대가 17회/분이고 한도(50회/분)의 3분의 1이다.
    setTimeout(() => {
        scanMatchlists();
        setInterval(scanMatchlists, 60 * 1000);
    }, 15 * 1000);

    setTimeout(() => {
        fetchMatchStats();
        setInterval(fetchMatchStats, 60 * 1000);
    }, 45 * 1000);

    // 집계는 DB 안에서만 도니까 호출 예산과 무관하다. 1시간마다 다시 계산한다.
    setTimeout(() => {
        buildChampStats();
        setInterval(buildChampStats, 60 * 60 * 1000);
    }, 90 * 1000);

    setInterval(() => {
        if (resolvedCountIn10Mins > 0) {
            console.log(`[Task] 백그라운드 닉네임 변환 진행 (최근 10분간 ${resolvedCountIn10Mins}건 갱신 완료)`);
            resolvedCountIn10Mins = 0;
        }
        const c = statCounters;
        if (c.scan || c.fetch) {
            const left = scanPending();
            const phase = left > 0 ? `순회 ${left}명 남음` : '수집';
            console.log(`[Stat] 최근 10분(${phase}): 명단 ${c.scan}명 훑음 / 매치 ${c.seen}건 관측 / detail ${c.fetch}건 (저장 ${c.save} · 제외 ${c.skip})`);
            statCounters = { scan: 0, seen: 0, fetch: 0, save: 0, skip: 0 };
        }
    }, 600 * 1000);
}

// ==========================================
// [4] 공통 헬퍼
// ==========================================
const ARENA_QUEUES = new Set([1700, 1710, 1750]);

// 칼바람: 라인/포지션 개념이 없어서 요약 통계를 협곡과 같은 통에 넣으면 안 된다.
const ARAM_QUEUES = new Set([450, 720]);   // 450 칼바람, 720 칼바람 클래시

// 화면에 찍는 라벨 (세분화). 여기 없는 큐는 "기타"로 떨어진다.
const QUEUE_MAP = {
    420: "솔로랭크",
    440: "자유랭크",

    400: "일반(교차)",     // 교차 선택 = 드래프트 픽
    480: "일반(신속)",     // 신속대전 = 스위프트플레이
    430: "일반",          // 대전 선택 — 현재 클라에서 사라진 큐
    490: "빠른대전",      // 퀵플레이 — 현재 클라에서 사라진 큐

    450: "칼바람",
    720: "칼바람",        // 칼바람 클래시
    2400: "아수라장",     // 무작위 총력전: 아수라장 (실측 확인)
    2450: "아수라장(클래식)",  // 아수라장 클래식 스타일 — 관전 API 실측 (mapId 12)

    830: "봇전(입문)", 840: "봇전(초보)", 850: "봇전(중급)",   // 구버전 봇전
    870: "봇전(입문)", 880: "봇전(초보)", 890: "봇전(중급)",   // 현재 봇전

    700: "클래시",
    4310: "클래식",       // LoL 클래식 — 관전 API에서 실측 (mapId 453)
    900: "우르프",
    1020: "단일 챔피언",
    1300: "돌격! 넥서스",
    1400: "궁극기 주문서",
    1900: "우르프",

    1700: "아레나",       // 구버전
    1710: "아레나",       // 구버전
    1750: "아레나"        // 현재 (3인 6팀)
};

// 필터 버튼용 그룹. 라벨과 분리한 이유:
//   프론트 필터가 라벨 부분일치로 동작하면 "빠른대전"이 "일반" 버튼에 안 잡히고,
//   나중에 라벨을 늘릴 때 서로 부분문자열이 되어 잡아먹는 사고가 난다.
//   표시용 라벨과 분류용 그룹을 따로 두고, 필터는 그룹 완전일치로 판정한다.
const QUEUE_GROUP = {
    420: "솔로랭크",
    440: "자유랭크",

    400: "일반", 430: "일반", 480: "일반", 490: "일반",

    450: "칼바람", 720: "칼바람",
    2400: "아수라장",
    2450: "아수라장",
    4310: "클래식",

    830: "봇", 840: "봇", 850: "봇",
    870: "봇", 880: "봇", 890: "봇",

    1700: "아레나", 1710: "아레나", 1750: "아레나"
};

// 티어 정렬용 점수 계산
const TIER_BASE = {
    IRON: 1, BRONZE: 2, SILVER: 3, GOLD: 4, PLATINUM: 5,
    EMERALD: 6, DIAMOND: 7, MASTER: 8, GRANDMASTER: 9, CHALLENGER: 10
};
const DIV_BASE = { IV: 1, III: 2, II: 3, I: 4 };

function calcTierScore(tier, rank, lp) {
    const base = TIER_BASE[String(tier || '').toUpperCase()] || 0;
    if (base === 0) return 0;
    const div = DIV_BASE[String(rank || '').toUpperCase()] || 1;
    return base * 100000 + div * 10000 + Math.min(Number(lp) || 0, 9999);
}

// 입력 가중치 (한글 2점, 그 외 1점)
function inputWeight(str) {
    let w = 0;
    for (const ch of String(str)) w += /[가-힣ㄱ-ㅎㅏ-ㅣ]/.test(ch) ? 2 : 1;
    return w;
}

// 닉네임을 검색용 소문자 필드로 분해
function toSearchFields(displayName) {
    const lower = String(displayName).toLowerCase();
    return { nameLower: lower, namePartLower: lower.split('#')[0] };
}

// 정규식 특수문자 이스케이프
function escapeRegex(str) {
    return String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// 매치 상세(detail) 하나를 화면용 데이터로 변환
// 미등록 큐 발견 로그
//   로테이션 이벤트 모드는 큐ID가 수시로 생기고 바뀌어서 미리 다 넣어둘 수 없다.
//   누가 그 모드를 검색하면 콘솔에 한 번 찍히고, 그걸 보고 QUEUE_MAP에 추가하면 된다.
//   같은 큐가 반복해서 찍히지 않도록 프로세스당 한 번만 기록한다.
const seenUnknownQueues = new Set();

function logUnknownQueue(detail) {
    const qid = detail.info.queueId;
    if (QUEUE_MAP[qid] || seenUnknownQueues.has(qid)) return;
    seenUnknownQueues.add(qid);
    console.log(
        `[미등록 큐] queueId=${qid} gameMode=${detail.info.gameMode} ` +
        `mapId=${detail.info.mapId} matchId=${detail.metadata.matchId}`
    );
}

function buildHistoryEntry(detail, targetPuuid, isPast = false) {
    logUnknownQueue(detail);

    const p = detail.info.participants.find(part => part.puuid === targetPuuid);
    if (!p) return null;

    const isArena = ARENA_QUEUES.has(detail.info.queueId);
    const isAram = ARAM_QUEUES.has(detail.info.queueId);
    const augmentsOf = (x) => [x.playerAugment1, x.playerAugment2, x.playerAugment3, x.playerAugment4, x.playerAugment5, x.playerAugment6].filter(Boolean);

    // ============================================================
    // 아레나 팀 해석
    //   playerSubteamId   = 몇 번 조냐 (1~6, 경기 내내 고정)
    //   subteamPlacement  = 몇 등으로 끝났냐 (1~6)
    //   둘 다 1~6짜리 숫자라 눈으로는 구분이 안 되지만 의미가 다르다. 섞으면 안 됨.
    //
    //   - 팀을 묶는 기준  : 조 번호
    //   - 화면에 찍는 값  : 등수
    //   도중 이탈 등으로 subteamPlacement가 0인 참가자가 섞여도 팀이 쪼개지지 않도록,
    //   조원 중 유효한 등수 하나를 그 조 전체의 등수로 사용한다.
    // ============================================================
    const hasSubteamId = isArena && detail.info.participants.some(x => x.playerSubteamId);
    const subteamIdOf = (x) => hasSubteamId
        ? (Number(x.playerSubteamId) || 0)
        : (Number(x.subteamPlacement) || 0);   // playerSubteamId가 없던 구버전 매치 폴백

    const placementByTeam = {};
    if (isArena) {
        for (const part of detail.info.participants) {
            const tid = subteamIdOf(part);
            const pl = Number(part.subteamPlacement) || 0;
            if (tid && pl && !placementByTeam[tid]) placementByTeam[tid] = pl;
        }
    }

    // 장로용 처치 수. challenges는 팀 전체 값을 참가자마다 실어주므로 한 명만 보면 된다.
    const elderKillsOf = (teamId) => {
        const p = detail.info.participants.find(x => x.teamId === teamId && x.challenges);
        return p?.challenges?.teamElderDragonKills || 0;
    };

    const placementOf = (x) => {
        const tid = subteamIdOf(x);
        return placementByTeam[tid] || Number(x.subteamPlacement) || 0;
    };

    const durationMin = Math.floor(detail.info.gameDuration / 60);
    const durationSec = detail.info.gameDuration % 60;
    const daysAgo = Math.floor((Date.now() - detail.info.gameEndTimestamp) / 86400000);

    // 30일이 넘으면 6개월 전이든 2년 전이든 전부 "1개월 전"으로 찍히던 것을 단계화
    const relativeDay = (d) => {
        if (d === 0) return "오늘";
        if (d < 30) return `${d}일 전`;
        if (d < 365) return `${Math.max(1, Math.round(d / 30.44))}개월 전`;
        return `${Math.floor(d / 365)}년 전`;
    };
    // 킬관여 분모: 일반 게임은 같은 teamId(5명), 아레나는 같은 조(3명).
    //   아레나의 teamId는 100/200 두 개뿐이라 그대로 쓰면 9명 킬 총합으로 나눠버린다.
    const alliesOf = (x) => isArena
        ? detail.info.participants.filter(y => subteamIdOf(y) === subteamIdOf(x))
        : detail.info.participants.filter(y => y.teamId === x.teamId);

    const kpOf = (x) => {
        const tk = alliesOf(x).reduce((sum, y) => sum + y.kills, 0);
        return tk === 0 ? 0 : Math.round(((x.kills + x.assists) / tk) * 100);
    };

    const teamKills = alliesOf(p).reduce((sum, x) => sum + x.kills, 0);

    return {
        matchId: detail.metadata.matchId,
        queueType: QUEUE_MAP[detail.info.queueId] || "기타",
        queueGroup: QUEUE_GROUP[detail.info.queueId] || "기타",
        win: p.win,
        championName: p.championName === "FiddleSticks" ? "Fiddlesticks" : p.championName,
        champLevel: p.champLevel,
        kills: p.kills, deaths: p.deaths, assists: p.assists,
        kda: p.deaths === 0 ? "Perfect" : ((p.kills + p.assists) / p.deaths).toFixed(2),
        kp: teamKills === 0 ? 0 : Math.round(((p.kills + p.assists) / teamKills) * 100),
        spell1: p.summoner1Id, spell2: p.summoner2Id,
        mainRune: p.perks?.styles?.[0]?.style || null, subRune: p.perks?.styles?.[1]?.style || null,
        item0: p.item0, item1: p.item1, item2: p.item2, item3: p.item3, item4: p.item4, item5: p.item5, item6: p.item6,
        item7: (p.roleBoundItem || p.item7 || 0),
        isArena,
        isAram,
        teamPosition: p.teamPosition || '',
        // 다시하기: 라이엇이 조기 항복 플래그를 주고, 없으면 4분 미만으로 판정.
        // 실제로 플레이한 게임이 아니라 승률·포지션·챔피언 통계에서 전부 제외한다.
        isRemake: !isArena && (p.gameEndedInEarlySurrender === true || durationMin < 4),
        // (헬퍼는 아래 elderKillsOf 참고)
        // 팀 단위 정보 (밴 / 오브젝트). 칼바람은 밴이 없어 빈 배열로 온다.
        //   ★ 아레나는 밴이 있다. 참가자 1명당 1개(18인 = 18개)가 전부 teams[0] 한 곳에 몰려 오고
        //     teams[1]은 teamId 0 에 빈 배열이다. 어느 조가 밴했는지는 라이엇이 안 알려준다.
        //   objectives.dragon.kills는 장로까지 합산된 값이라 그것만으론 구분이 안 된다.
        //   challenges.teamElderDragonKills(팀 전체 값이 참가자마다 실려 온다)를 빼서 나눈다.
        teamStats: (detail.info.teams || []).map(t => ({
            teamId: t.teamId,
            win: t.win === true,
            // championId -1 은 "시간 초과로 밴 못 함". 자리를 유지해야 빈 밴 표시가 되므로 그대로 보낸다.
            // ★ pickTurn 순서를 못 박아 보낸다. 아레나에서 이 순서가 조 순서일 가능성이 크다(조당 3개씩).
            bans: [...(t.bans || [])].sort((a, b) => a.pickTurn - b.pickTurn).map(b => b.championId),
            objectives: {
                baron: t.objectives?.baron?.kills || 0,
                elderDragon: elderKillsOf(t.teamId),
                dragon: Math.max(0, (t.objectives?.dragon?.kills || 0) - elderKillsOf(t.teamId)),
                riftHerald: t.objectives?.riftHerald?.kills || 0,
                horde: t.objectives?.horde?.kills || 0,
                atakhan: t.objectives?.atakhan?.kills || 0,
                tower: t.objectives?.tower?.kills || 0,
                inhibitor: t.objectives?.inhibitor?.kills || 0
            }
        })),

        subteam: isArena ? subteamIdOf(p) : null,
        placement: isArena ? (placementOf(p) || null) : null,
        augments: isArena ? augmentsOf(p) : [],
        totalCs: p.totalMinionsKilled + p.neutralMinionsKilled,
        csPerMin: durationMin > 0 ? ((p.totalMinionsKilled + p.neutralMinionsKilled) / durationMin).toFixed(1) : "0.0",
        goldEarned: p.goldEarned, visionScore: p.visionScore, controlWards: p.visionWardsBoughtInGame,
        multiKill: p.pentaKills ? "펜타킬" : (p.quadraKills ? "쿼드라킬" : (p.tripleKills ? "트리플킬" : (p.doubleKills ? "더블킬" : ""))),
        firstBlood: p.firstBloodKill, durationMin, durationSec,
        dateStr: isPast ? "과거 전적" : relativeDay(daysAgo),
        timestamp: detail.info.gameEndTimestamp,
        participants: detail.info.participants.map(part => ({
            puuid: part.puuid, isSearchedUser: part.puuid === targetPuuid, teamId: part.teamId, win: part.win, champLevel: part.champLevel,
            championName: part.championName === "FiddleSticks" ? "Fiddlesticks" : part.championName, visionScore: part.visionScore,
            summonerName: part.riotIdGameName ? `${part.riotIdGameName}#${part.riotIdTagline}` : (part.summonerName || "알 수 없음"),
            kills: part.kills, deaths: part.deaths, assists: part.assists, damage: part.totalDamageDealtToChampions, damageTaken: part.totalDamageTaken,
            kp: kpOf(part),

            // 라이엇이 판정한 라인. TOP / JUNGLE / MIDDLE / BOTTOM / UTILITY.
            // 칼바람·아레나는 빈 문자열로 온다.
            teamPosition: part.teamPosition || '',

            // --- 뱃지용 (challenges는 옛 매치나 일부 모드에 없을 수 있어 ?. 로 접근) ---
            multiKill: part.pentaKills ? "펜타킬" : (part.quadraKills ? "쿼드라킬" : (part.tripleKills ? "트리플킬" : (part.doubleKills ? "더블킬" : ""))),
            firstBlood: part.firstBloodKill === true,
            firstBloodAssist: part.firstBloodAssist === true,
            soloKills: part.challenges?.soloKills || 0,
            steals: part.challenges?.epicMonsterSteals || 0,
            // 처형·포탑·몬스터 사망을 뺀, 적 챔피언에게 죽은 횟수
            champDeaths: part.challenges?.deathsByEnemyChamps ?? part.deaths,
            gold: part.goldEarned, cs: part.totalMinionsKilled + part.neutralMinionsKilled,
            wardsPlaced: part.wardsPlaced || 0, wardsKilled: part.wardsKilled || 0, visionWards: part.visionWardsBoughtInGame || 0,
            item0: part.item0, item1: part.item1, item2: part.item2, item3: part.item3, item4: part.item4, item5: part.item5, item6: part.item6, item7: (part.roleBoundItem || part.item7 || 0),
            subteam: isArena ? subteamIdOf(part) : 0,
            placement: isArena ? placementOf(part) : 0,
            augments: isArena ? augmentsOf(part) : [],
            spell1: part.summoner1Id, spell2: part.summoner2Id, mainRune: part.perks?.styles?.[0]?.style || null, subRune: part.perks?.styles?.[1]?.style || null
        })),
        myRunes: p.perks?.styles ? { primaryStyle: p.perks.styles[0].style, primarySelections: p.perks.styles[0].selections.map(s => s.perk), subStyle: p.perks.styles[1].style, subSelections: p.perks.styles[1].selections.map(s => s.perk), statPerks: p.perks.statPerks ? [p.perks.statPerks.offense, p.perks.statPerks.flex, p.perks.statPerks.defense] : [] } : null
    };
}

// 매치 참가자들의 닉네임을 캐시에 축적 (티어 정보는 건드리지 않음)
function saveParticipantNames(matchDetails, excludePuuid) {
    const seen = new Map();

    for (const { detail } of matchDetails) {
        for (const part of detail?.info?.participants || []) {
            if (!part.puuid || part.puuid === excludePuuid) continue;
            if (!part.riotIdGameName || !part.riotIdTagline) continue;
            if (/\sbot$/i.test(part.riotIdGameName)) continue;   // 봇 제외
            seen.set(part.puuid, `${part.riotIdGameName}#${part.riotIdTagline}`);
        }
    }
    if (seen.size === 0) return;

    const now = Date.now();
    const ops = [...seen].map(([puuid, name]) => ({
        updateOne: {
            filter: { puuid },
            update: { $set: { displayName: name, updatedAt: now, ...toSearchFields(name) } },
            upsert: true
        }
    }));

    SummonerCache.bulkWrite(ops, { ordered: false }).catch(() => { });
}

// 기존 데이터에 검색용 소문자 필드를 채워 넣음 (서버 시작 시 1회)
async function backfillSearchFields() {
    try {
        const targets = await SummonerCache.find({ namePartLower: { $exists: false } })
            .select('puuid displayName')
            .limit(50000);
        if (targets.length === 0) return;

        const ops = targets.map(d => ({
            updateOne: {
                filter: { _id: d._id },
                update: { $set: toSearchFields(d.displayName) }
            }
        }));

        for (let i = 0; i < ops.length; i += 1000) {
            await SummonerCache.bulkWrite(ops.slice(i, i + 1000), { ordered: false });
        }
        console.log(`[System] 검색 색인 보강 완료: ${targets.length}건`);
    } catch (err) {
        console.error("[System] 검색 색인 보강 실패:", err.message);
    }
}

// 닉네임으로 puuid 찾기 (SummonerCache 우선)
async function findPuuidByName(fullName) {
    // 1순위: 정확히 일치 (인덱스 사용)
    let hit = await SummonerCache.findOne({ displayName: fullName });
    if (hit) return hit.puuid;

    // 2순위: 대소문자 무시 (SummonerCache는 문서가 작아 스캔해도 부담 적음)
    hit = await SummonerCache.findOne({
        displayName: new RegExp(`^${escapeRegex(fullName)}$`, 'i')
    });
    return hit ? hit.puuid : null;
}

// 429 발생 시 DB에 쌓인 과거 전적으로 응답 구성
async function buildFallbackResponse(fullName) {
    const targetPuuid = await findPuuidByName(fullName);
    if (!targetPuuid) return null;

    const fallbackMatches = await MatchCache
        .find({ 'detail.metadata.participants': targetPuuid })
        .select('-timeline')
        .sort({ 'detail.info.gameEndTimestamp': -1 })
        .limit(20)
        .maxTimeMS(3000);

    if (!fallbackMatches?.length) return null;

    const history = fallbackMatches
        .map(m => buildHistoryEntry(m.detail, targetPuuid, true))
        .filter(Boolean);

    if (history.length === 0) return null;

    return {
        puuid: targetPuuid,
        version: currentVersion,
        profile: {
            name: fullName,
            level: "정보없음",
            icon: `https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/profileicon/1.png`,
            tier: "서버 지연", rank: "", leaguePoints: 0, wins: 0, losses: 0
        },
        history,
        isCachedFallback: true
    };
}

// ==========================================
// [5] API 라우터
// ==========================================

// 소환사 전적 검색 (폴백 로직 포함)
app.get('/api/summoner/:name', async (req, res) => {
    const summonerName = req.params.name;
    const cachedData = myCache.get(summonerName);

    if (cachedData) {
        console.log(`[API] 전적 검색 캐시 적중: ${summonerName}`);
        cachedData.expireAt = myCache.getTtl(summonerName);
        return res.json(cachedData);
    }

    try {
        const [gameName, tagLine] = summonerName.split('#');
        if (!gameName || !tagLine) return res.status(400).json({ error: "닉네임#태그 형식으로 입력해주세요." });

        const { data: accountData } = await riotApi.get(`https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`);
        const targetPuuid = accountData.puuid;

        const [summonerRes, leagueRes, matchIdsRes] = await Promise.all([
            riotApi.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${targetPuuid}`),
            riotApi.get(`https://kr.api.riotgames.com/lol/league/v4/entries/by-puuid/${targetPuuid}`),
            riotApi.get(`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${targetPuuid}/ids?start=0&count=20`)
        ]);

        const rankData = leagueRes.data.find(entry => entry.queueType === 'RANKED_SOLO_5x5') || null;
        const rankIndex = challengerList.findIndex(p => p.puuid === targetPuuid);
        const serverRank = rankIndex !== -1 ? rankIndex + 1 : null;

        const matchIds = matchIdsRes.data;

        // DB 캐시 확인 및 매치 상세 조회
        const cachedMatches = await MatchCache.find({ matchId: { $in: matchIds } });
        const cachedMatchIds = cachedMatches.map(m => m.matchId);
        const matchesToFetch = matchIds.filter(id => !cachedMatchIds.includes(id));

        console.log(`[DB Cache] ${summonerName}: DB ${cachedMatchIds.length}개 / 신규 ${matchesToFetch.length}개 로드`);

        const newMatchesData = await Promise.all(matchesToFetch.map(async (matchId, index) => {
            try {
                await new Promise(r => setTimeout(r, index * 150));
                const detailRes = await riotApi.get(`https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}`);
                MatchCache.create({ matchId, detail: detailRes.data }).catch(() => { });
                return { detail: detailRes.data, timeline: null };
            } catch (err) { return null; }
        }));

        let allMatchDetails = [...cachedMatches.map(m => ({ detail: m.detail, timeline: m.timeline })), ...newMatchesData].filter(m => m?.detail);
        allMatchDetails.sort((a, b) => b.detail.info.gameEndTimestamp - a.detail.info.gameEndTimestamp);

        const history = allMatchDetails
            .map(({ detail }) => buildHistoryEntry(detail, targetPuuid))
            .filter(Boolean);

        const finalData = {
            puuid: targetPuuid,
            version: currentVersion,
            profile: {
                name: `${gameName}#${tagLine}`, level: summonerRes.data.summonerLevel, icon: `https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/profileicon/${summonerRes.data.profileIconId}.png`,
                tier: rankData?.tier || 'UNRANKED', rank: rankData?.rank || '', leaguePoints: rankData?.leaguePoints || 0,
                wins: rankData?.wins || 0, losses: rankData?.losses || 0,
                serverRank: serverRank
            },
            history
        };

        // ★ 검색된 소환사를 캐시에 저장 (자동완성 / 429 폴백 / 랭킹 닉네임에 재사용)
        const canonicalName = `${accountData.gameName}#${accountData.tagLine}`;
        const now = Date.now();
        SummonerCache.findOneAndUpdate(
            { puuid: targetPuuid },
            {
                displayName: canonicalName,
                updatedAt: now,
                ...toSearchFields(canonicalName),
                tier: rankData?.tier || 'UNRANKED',
                rank: rankData?.rank || '',
                lp: rankData?.leaguePoints || 0,
                tierScore: calcTierScore(rankData?.tier, rankData?.rank, rankData?.leaguePoints),
                iconId: summonerRes.data.profileIconId,
                level: summonerRes.data.summonerLevel
            },
            { upsert: true }
        ).catch(() => { });
        resolvedNames[targetPuuid] = { displayName: canonicalName, updatedAt: now };

        // ★ 같은 게임에 있던 참가자들도 닉네임만 저장 (자동완성 후보 축적)
        saveParticipantNames(allMatchDetails, targetPuuid);

        myCache.set(summonerName, finalData);
        finalData.expireAt = myCache.getTtl(summonerName);
        console.log(`[API] 전적 데이터 처리 완료: ${summonerName}`);
        res.json(finalData);

    } catch (error) {
        if (error.response?.status === 429) {
            console.log(`[API] 429 한도 초과. ${req.params.name} DB 폴백 시도...`);
            try {
                const fallback = await buildFallbackResponse(req.params.name);
                if (fallback) {
                    console.log(`[API] 429 폴백 성공. DB에서 ${fallback.history.length}게임 반환`);
                    return res.json(fallback);
                }
                console.log(`[API] 429 폴백 실패. 저장된 전적 없음`);
            } catch (err) { console.error("[Fallback Error]", err.message); }
            return res.status(429).json({ error: "조회 한도를 초과했습니다. 잠시 후 다시 시도해주세요." });
        }

        console.error(`[Error] API 통신 오류: ${error.message}`);
        if (error.response?.status === 404) return res.status(404).json({ error: "소환사를 찾을 수 없습니다. 닉네임을 다시 확인해주세요." });
        res.status(500).json({ error: "데이터 처리 중 문제가 발생했습니다." });
    }
});

// 마스터리 조회
app.get('/api/mastery/:puuid', async (req, res) => {
    try {
        const response = await riotApi.get(`https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${req.params.puuid}/top?count=7`);
        res.json(response.data);
    } catch (error) { res.status(500).json({ error: '마스터리 데이터를 불러오지 못했습니다.' }); }
});

// 타임라인 원본에서 화면에 필요한 것만 추출
function extractTimeline(timeline, detail, targetPuuid = null) {
    if (!timeline?.info?.frames) return { goldFrames: null, myTimeline: null };

    // players: 챔피언별 골드 그래프용. participantId(1~10) 순서 그대로.
    const goldFrames = { labels: [], blue: [], red: [], players: [] };
    let myTimeline = { skills: [], items: [] };

    // 골드 격차 그래프에 표시할 오브젝트 처치 기록
    const objectiveEvents = [];

    if (detail?.info?.participants) {
        detail.info.participants.forEach(p => {
            goldFrames.players.push({
                id: p.participantId,
                champ: p.championName,
                name: p.riotIdGameName || p.summonerName || '',
                teamId: p.teamId,
                gold: [],
                xp: []
            });
        });
    }

    // 대상 플레이어의 participantId 찾기
    let myParticipantId = null;
    if (targetPuuid && detail?.info?.participants) {
        const me = detail.info.participants.find(p => p.puuid === targetPuuid);
        if (me) myParticipantId = me.participantId;
    }

    timeline.info.frames.forEach((frame, idx) => {
        goldFrames.labels.push(`${idx}분`);
        let blueGold = 0, redGold = 0;
        if (frame.participantFrames) {
            for (let i = 1; i <= 10; i++) {
                const g = frame.participantFrames[i]?.totalGold || 0;
                if (i <= 5) blueGold += g; else redGold += g;

                const slot = goldFrames.players.find(pl => pl.id === i);
                if (slot) {
                    slot.gold.push(g);
                    slot.xp.push(frame.participantFrames[i]?.xp || 0);
                }
            }
        }
        goldFrames.blue.push(blueGold);
        goldFrames.red.push(redGold);

        // 오브젝트 처치 (프레임 안의 events 전체를 훑는다)
        frame.events?.forEach(event => {
            if (event.type !== 'ELITE_MONSTER_KILL') return;

            // killerTeamId가 없는 옛 타임라인은 killerId(1~5 블루, 6~10 레드)로 판정
            let teamId = event.killerTeamId || 0;
            if (!teamId && event.killerId) teamId = event.killerId <= 5 ? 100 : 200;
            if (!teamId) return;   // 몬스터끼리 죽인 경우 등

            objectiveEvents.push({
                t: event.timestamp,                       // ms
                teamId,
                type: event.monsterType || '',            // BARON_NASHOR / DRAGON / RIFTHERALD / HORDE
                subType: event.monsterSubType || ''       // ELDER_DRAGON, FIRE_DRAGON ...
            });
        });

        if (myParticipantId) {
            frame.events?.forEach(event => {
                if (event.participantId === myParticipantId) {
                    if (event.type === 'SKILL_LEVEL_UP') myTimeline.skills.push(event.skillSlot);
                    else if (event.type === 'ITEM_PURCHASED') myTimeline.items.push({ id: event.itemId, ts: event.timestamp });
                    else if (event.type === 'ITEM_UNDO') {
                        const undoIdx = myTimeline.items.map(i => i.id).lastIndexOf(event.beforeId);
                        if (undoIdx > -1) myTimeline.items.splice(undoIdx, 1);
                    }
                }
            });
        }
    });

    goldFrames.objectives = objectiveEvents;
    return { goldFrames, myTimeline: myParticipantId ? myTimeline : null };
}

// ==========================================
// 챔피언별 라인 분포
//   관전 API는 포지션을 주지 않는다. 게임이 막 시작돼서 라이엇도 아직 판정 전이다.
//   그래서 우리 DB에 쌓인 전적의 teamPosition으로 "이 챔피언은 주로 어느 라인"을 계산해
//   인게임 화면의 라인을 추정한다. 표본이 늘수록 저절로 정확해지고 메타 변화도 따라간다.
// ==========================================
const LANES = ['TOP', 'JUNGLE', 'MIDDLE', 'BOTTOM', 'UTILITY'];
const LANE_STAT_QUEUES = [420, 440, 400, 430, 480, 490];   // 라인 개념이 있는 큐만

let champLaneStats = {};        // { championId: { TOP: 0.9, JUNGLE: 0.02, ... } }
let champLaneSampleSize = 0;

async function refreshChampLaneStats() {
    try {
        const rows = await MatchCache.aggregate([
            { $match: { 'detail.info.queueId': { $in: LANE_STAT_QUEUES } } },
            { $unwind: '$detail.info.participants' },
            { $match: { 'detail.info.participants.teamPosition': { $in: LANES } } },
            {
                $group: {
                    _id: {
                        c: '$detail.info.participants.championId',
                        p: '$detail.info.participants.teamPosition'
                    },
                    n: { $sum: 1 }
                }
            }
        ]);

        const counts = {};
        let total = 0;
        rows.forEach(r => {
            const c = r._id.c;
            counts[c] = counts[c] || { TOP: 0, JUNGLE: 0, MIDDLE: 0, BOTTOM: 0, UTILITY: 0, _sum: 0 };
            counts[c][r._id.p] += r.n;
            counts[c]._sum += r.n;
            total += r.n;
        });

        const next = {};
        for (const c in counts) {
            const row = counts[c];
            next[c] = {};
            // 표본이 적을 때 한 판짜리 챔피언이 100%가 되는 걸 막으려고 라플라스 보정을 넣는다
            LANES.forEach(l => { next[c][l] = (row[l] + 0.5) / (row._sum + 2.5); });
        }

        champLaneStats = next;
        champLaneSampleSize = total;
        console.log(`[Task] 챔피언 라인 분포 갱신 완료 (${Object.keys(next).length}종 / 표본 ${total})`);
    } catch (e) {
        console.error('[Task] 챔피언 라인 분포 갱신 실패:', e.message);
    }
}

// 모르는 챔피언은 균등 분포로 둔다 (사실상 순서가 무작위가 됨)
const laneProb = (championId, lane) => champLaneStats[championId]?.[lane] ?? 0.2;

function permutations(arr) {
    if (arr.length <= 1) return [arr];
    const out = [];
    arr.forEach((v, i) => {
        const rest = arr.slice(0, i).concat(arr.slice(i + 1));
        permutations(rest).forEach(p => out.push([v, ...p]));
    });
    return out;
}

// 5명에게 라인을 하나씩 배정한다.
//   강타(11)를 든 사람은 정글로 확정하고, 남은 4명만 24가지 조합을 따져 확률 합이 가장 큰 배치를 고른다.
function assignLanes(players) {
    if (players.length !== 5) return players.map(() => '');

    const smiteIdx = players.findIndex(p => p.spell1 === 11 || p.spell2 === 11);
    const result = new Array(5).fill('');

    let targets = players.map((_, i) => i);
    let lanes = LANES.slice();

    if (smiteIdx > -1) {
        result[smiteIdx] = 'JUNGLE';
        targets = targets.filter(i => i !== smiteIdx);
        lanes = lanes.filter(l => l !== 'JUNGLE');
    }

    let best = null, bestScore = -1;
    permutations(lanes).forEach(perm => {
        let score = 0;
        perm.forEach((lane, k) => { score += laneProb(players[targets[k]].championId, lane); });
        if (score > bestScore) { bestScore = score; best = perm; }
    });

    if (best) best.forEach((lane, k) => { result[targets[k]] = lane; });
    return result;
}

// ==========================================
// 진행 중인 게임 (Spectator v5)
//   match-v5와 달리 플랫폼 라우팅(kr)을 쓴다. asia로 부르면 404가 뜬다.
//   게임 중이 아니면 라이엇이 404를 주는데, 이건 에러가 아니라 정상 응답이다.
// ==========================================
const liveGameCache = new Map();       // puuid -> { at, payload }
const LIVE_CACHE_MS = 30 * 1000;       // 실시간성이 중요해서 짧게만 캐싱

function extractLiveGame(raw) {
    // 미등록 큐 발견 로그 (인게임판).
    //   buildHistoryEntry의 로그는 전적 목록을 만들 때만 돈다. 그래서 클래식·아수라장처럼
    //   match-v5로 전적이 안 내려오는 모드는 영영 발견되지 않는다.
    //   관전 정보는 내려오므로 여기서 잡으면 그 모드들의 큐ID도 알 수 있다.
    const qid = raw.gameQueueConfigId;
    if (!QUEUE_MAP[qid] && !seenUnknownQueues.has(`live-${qid}`)) {
        seenUnknownQueues.add(`live-${qid}`);
        console.log(`[미등록 큐/인게임] queueId=${qid} mapId=${raw.mapId} gameId=${raw.gameId}`);
    }

    // championId -1(시간 초과로 밴 못 함)도 자리를 유지해야 인게임처럼 빈 초상화가 뜬다.
    // 밴이 아예 없는 모드(칼바람 등)는 배열이 비어 있고, 프론트에서 그 줄을 통째로 생략한다.
    const bans = { blue: [], red: [] };
    (raw.bannedChampions || []).forEach(b => {
        (b.teamId === 100 ? bans.blue : bans.red).push(b.championId);
    });

    const toPlayer = (p) => {
        const perkIds = p.perks?.perkIds || [];
        return {
            puuid: p.puuid,
            championId: p.championId,
            riotId: p.riotId || '',
            spell1: p.spell1Id,
            spell2: p.spell2Id,
            mainRune: perkIds[0] || null,
            subStyle: p.perks?.perkSubStyle || null
        };
    };

    const participants = raw.participants || [];

    // 아레나는 teamId가 100/200뿐이라 그대로 나누면 9명씩 두 덩어리가 된다.
    // 3인 6팀으로 다시 묶는다. playerSubteamId가 오면 그걸 쓰고,
    // 없으면 참가자 배열이 팀 순서대로 온다는 점을 이용해 3명씩 끊는다.
    const isArenaLive = ARENA_QUEUES.has(raw.gameQueueConfigId);
    let subteams = null;

    if (isArenaLive && participants.length > 0) {
        const hasSubId = participants.some(p => p.playerSubteamId);
        const groups = {};
        participants.forEach((p, i) => {
            const key = hasSubId ? (p.playerSubteamId || 0) : Math.floor(i / 3) + 1;
            (groups[key] = groups[key] || []).push(toPlayer(p));
        });
        subteams = Object.keys(groups)
            .sort((a, b) => a - b)
            .map(k => ({ id: Number(k), players: groups[k] }));
    }

    // 아레나·칼바람은 라인 개념이 없어 배정하지 않는다
    const blue = participants.filter(p => p.teamId === 100).map(toPlayer);
    const red = participants.filter(p => p.teamId === 200).map(toPlayer);
    const laneMode = !isArenaLive && raw.mapId === 11;

    if (laneMode) {
        [blue, red].forEach(team => {
            const lanes = assignLanes(team);
            team.forEach((p, i) => { p.position = lanes[i] || ''; });
        });
    }

    return {
        gameId: raw.gameId,
        isArena: isArenaLive,
        subteams,
        queueId: raw.gameQueueConfigId,
        queueName: QUEUE_MAP[raw.gameQueueConfigId] || '기타',
        mapId: raw.mapId,
        // gameLength는 로딩 화면 시간을 빼고 세기 때문에 음수로 시작할 수 있다
        gameLength: Math.max(0, raw.gameLength || 0),
        gameStartTime: raw.gameStartTime || 0,
        bans,
        teams: { blue, red }
    };
}

app.get('/api/live/:puuid', async (req, res) => {
    const puuid = req.params.puuid;
    if (!/^[\w-]{40,120}$/.test(puuid)) {
        return res.status(400).json({ error: "잘못된 요청입니다." });
    }

    const cached = liveGameCache.get(puuid);
    if (cached && Date.now() - cached.at < LIVE_CACHE_MS) {
        return res.json(cached.payload);
    }

    try {
        const { data } = await riotApi.get(
            `https://kr.api.riotgames.com/lol/spectator/v5/active-games/by-summoner/${puuid}`
        );
        const payload = { inGame: true, game: extractLiveGame(data) };
        liveGameCache.set(puuid, { at: Date.now(), payload });
        res.json(payload);

    } catch (error) {
        const status = error.response?.status;

        // 404 = 게임 중이 아님. 정상 상황이므로 캐싱해서 반복 호출을 줄인다.
        if (status === 404) {
            const payload = { inGame: false };
            liveGameCache.set(puuid, { at: Date.now(), payload });
            return res.json(payload);
        }
        if (status === 429) return res.status(429).json({ error: "조회 한도를 초과했습니다." });

        console.error(`[Live] 조회 실패 ${puuid}: ${error.message}`);
        res.status(500).json({ error: "진행 중인 게임을 불러오지 못했습니다." });
    }
});

// 캐시가 무한히 커지지 않게 주기적으로 정리
setInterval(() => {
    const now = Date.now();
    for (const [k, v] of liveGameCache) {
        if (now - v.at > LIVE_CACHE_MS) liveGameCache.delete(k);
    }
}, 60 * 1000);

// 매치 타임라인 조회 (상세 탭 클릭 시 호출)
app.get('/api/timeline/:matchId', async (req, res) => {
    const { matchId } = req.params;
    const puuid = req.query.puuid || null;    // ★ 추가

    if (!/^[A-Z0-9]+_\d+$/i.test(matchId)) {
        return res.status(400).json({ error: "잘못된 매치 ID입니다." });
    }

    try {
        // 1. DB에 이미 있으면 그대로 반환
        const cached = await MatchCache.findOne({ matchId });
        if (cached?.timeline) {
            return res.json(extractTimeline(cached.timeline, cached.detail, puuid));
        }

        // 2. 없으면 라이엇에서 받아옴
        const { data: timeline } = await riotApi.get(
            `https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}/timeline`
        );

        // 3. DB에 저장 (매치가 이미 있으면 timeline만 채움)
        MatchCache.updateOne({ matchId }, { $set: { timeline } }).catch(() => { });

        const detail = cached?.detail || null;
        res.json(extractTimeline(timeline, detail, puuid));

    } catch (error) {
        const status = error.response?.status;
        if (status === 429) return res.status(429).json({ error: "조회 한도를 초과했습니다." });
        if (status === 404) return res.status(404).json({ error: "타임라인 데이터가 없습니다." });
        console.error(`[Timeline] 조회 실패 ${matchId}: ${error.message}`);
        res.status(500).json({ error: "타임라인을 불러오지 못했습니다." });
    }
});

// 전적 더 보기 (start부터 count개 추가 조회)
app.get('/api/matches/:puuid', async (req, res) => {
    const targetPuuid = req.params.puuid;
    const start = Math.max(0, parseInt(req.query.start) || 0);
    const count = Math.min(Math.max(1, parseInt(req.query.count) || 10), 10);

    if (!/^[\w-]{40,120}$/.test(targetPuuid)) {
        return res.status(400).json({ error: "잘못된 요청입니다." });
    }

    try {
        const { data: matchIds } = await riotApi.get(
            `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${targetPuuid}/ids?start=${start}&count=${count}`
        );

        if (!matchIds || matchIds.length === 0) {
            return res.json({ history: [], hasMore: false });
        }

        const cachedMatches = await MatchCache.find({ matchId: { $in: matchIds } });
        const cachedMatchIds = cachedMatches.map(m => m.matchId);
        const matchesToFetch = matchIds.filter(id => !cachedMatchIds.includes(id));

        console.log(`[More] ${start}~${start + count}: DB ${cachedMatchIds.length}개 / 신규 ${matchesToFetch.length}개`);

        const newMatchesData = await Promise.all(matchesToFetch.map(async (matchId, index) => {
            try {
                await new Promise(r => setTimeout(r, index * 150));
                const detailRes = await riotApi.get(`https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}`);
                MatchCache.create({ matchId, detail: detailRes.data }).catch(() => { });
                return { detail: detailRes.data };
            } catch (err) { return null; }
        }));

        const allDetails = [...cachedMatches.map(m => ({ detail: m.detail })), ...newMatchesData]
            .filter(m => m?.detail);
        allDetails.sort((a, b) => b.detail.info.gameEndTimestamp - a.detail.info.gameEndTimestamp);

        const history = allDetails
            .map(({ detail }) => buildHistoryEntry(detail, targetPuuid))
            .filter(Boolean);

        saveParticipantNames(allDetails, targetPuuid);

        res.json({ history, hasMore: matchIds.length === count });

    } catch (error) {
        const status = error.response?.status;
        if (status === 429) return res.status(429).json({ error: "조회 한도를 초과했습니다. 잠시 후 다시 시도해주세요." });
        console.error(`[More] 조회 실패: ${error.message}`);
        res.status(500).json({ error: "전적을 더 불러오지 못했습니다." });
    }
});

// 닉네임 자동완성 / 태그 후보 목록 (전부 자체 DB 조회 — 라이엇 API 미사용)
app.get('/api/suggest', async (req, res) => {
    const raw = String(req.query.q || '').trim();
    const exact = req.query.exact === '1';

    if (!raw) return res.json([]);

    const namePart = raw.split('#')[0].trim();
    const lower = namePart.toLowerCase();

    // 접두사 검색은 최소 4포인트(한글 2점 / 그 외 1점)부터
    if (!exact && inputWeight(namePart) < 4) return res.json([]);
    if (exact && namePart.length === 0) return res.json([]);

    try {
        const filter = exact
            ? { namePartLower: lower }
            : { namePartLower: new RegExp('^' + escapeRegex(lower)) };

        const limit = exact ? 100 : 30;

        const rows = await SummonerCache
            .find(filter)
            .sort({ tierScore: -1 })
            .limit(limit)
            .select('displayName tier rank lp iconId level -_id')
            .maxTimeMS(2000);

        let list = rows.map(r => ({
            displayName: r.displayName,
            tier: r.tier || null,
            rank: r.rank || '',
            lp: r.lp ?? null,
            iconId: r.iconId ?? null,
            level: r.level ?? null
        }));

        if (exact) {
            // 티어 높은 순 > 태그 가나다순
            list.sort((a, b) => {
                const aScore = calcTierScore(a.tier, a.rank, a.lp);
                const bScore = calcTierScore(b.tier, b.rank, b.lp);
                if (aScore !== bScore) return bScore - aScore;

                const aTag = a.displayName.split('#')[1] || '';
                const bTag = b.displayName.split('#')[1] || '';
                return aTag.localeCompare(bTag, 'ko', { sensitivity: 'base' });
            });
        } else {
            // 완전 일치 > 닉네임 짧은 순 > 가나다순
            list.sort((a, b) => {
                const aName = a.displayName.split('#')[0];
                const bName = b.displayName.split('#')[0];

                const aExact = aName.toLowerCase() === lower ? 0 : 1;
                const bExact = bName.toLowerCase() === lower ? 0 : 1;
                if (aExact !== bExact) return aExact - bExact;

                if (aName.length !== bName.length) return aName.length - bName.length;

                return a.displayName.localeCompare(b.displayName, 'ko', { sensitivity: 'base' });
            });
            list = list.slice(0, 6);
        }

        res.json(list);
    } catch (err) {
        console.error("[Suggest] 조회 실패:", err.message);
        res.json([]);
    }
});

// 랭킹
// ==========================================
// 챔피언 통계 (티어리스트)
//   집계는 buildChampStats() 가 1시간마다 미리 해 두므로 여기서는 읽기만 한다.
//   ★ 라인별까지 통째로 내려보낸다 (최대 1,000행쯤). 라인 필터를 누를 때마다
//     다시 부르면 느리고, 어차피 한 번에 받아도 100KB 안쪽이다.
// ==========================================
app.get('/api/champion-stats', async (req, res) => {
    try {
        const scopes = await StatScope.find({}).lean();
        if (!scopes.length) {
            return res.json({ ready: false, scopes: [], rows: [], totals: {} });
        }

        // ★ 패치는 **숫자로** 정렬해야 한다. 문자열로 하면 "16.9" > "16.16" 이 된다.
        const patchKeys = [...new Set(scopes.filter(s => s.scope.startsWith('p:')).map(s => s.scope))]
            .sort((a, b) => {
                const pa = a.slice(2).split('.').map(Number), pb = b.slice(2).split('.').map(Number);
                return (pb[0] - pa[0]) || (pb[1] - pa[1]);
            });
        const dayKeys = [...new Set(scopes.filter(s => s.scope.startsWith('d:')).map(s => s.scope))]
            .sort().reverse();
        const scopeKeys = [...patchKeys, ...dayKeys];

        // scope 별 총 경기 수 (밴드 합산)
        const gamesOf = {};
        scopes.forEach(s => { gamesOf[s.scope] = (gamesOf[s.scope] || 0) + s.games; });

        // ★ 기본값은 "표본이 어느 정도 쌓인 가장 최신 패치" 다.
        //   그냥 최신 패치를 쓰면 **패치 당일마다 화면이 텅 빈다** — 수요일에 패치가 나오면
        //   그 패치 표본이 몇 판뿐이라 전 챔피언이 표본 미달(회색)로 나온다.
        //   그것도 없으면(수집 초기) **표본이 가장 많은 패치**로 물러난다.
        const MIN_SCOPE_GAMES = 300;
        const requested = req.query.scope;
        const scope = scopeKeys.includes(requested)
            ? requested
            : (patchKeys.find(k => gamesOf[k] >= MIN_SCOPE_GAMES)
                || [...patchKeys].sort((a, b) => gamesOf[b] - gamesOf[a])[0]
                || scopeKeys[0]);

        const [rows, totalRows] = await Promise.all([
            ChampStat.find({ scope }).select('-_id -__v').lean(),
            StatScope.find({ scope }).lean()
        ]);

        // kb 별 총 경기 수. 화면에서 5-7 과 8-10 을 합쳐 볼 수 있게 둘 다 준다.
        const totals = {};
        totalRows.forEach(t => { totals[t.kb] = t.games; });
        const updatedAt = Math.max(...totalRows.map(t => +t.updatedAt || 0));

        // ★★ 박제된 패치 판별 — "scope 목록에는 있는데 집계 행이 없다" 가 그 표식이다.
        //   은퇴한 패치의 집계는 `public/stats_archive/<scope>.js` 로 옮기고 DB 행을
        //   지우는데, `statscopes` 행만은 남긴다(패치당 1~2행). 그래서 드롭다운과
        //   픽률·밴률 분모는 여기서 그대로 나오고, 행만 화면이 파일에서 가져간다.
        //   ★ 파일 크기가 DB 의 10분의 1이라(3.32MB -> 345KB, brotli 25KB)
        //     1년 26패치면 Atlas 84MB 를 통째로 아낀다. 자세한 건 CLAUDE.md 참고.
        if (!rows.length && totalRows.length) {
            return res.json({ ready: true, archived: true, scope, scopes: scopeKeys, totals, rows: [], updatedAt });
        }

        res.json({
            ready: true,
            scope,
            scopes: scopeKeys,
            totals,
            rows,
            updatedAt
        });
    } catch (e) {
        console.error('[API] 챔피언 통계 실패:', e.message);
        res.status(500).json({ error: '통계를 불러오지 못했습니다.' });
    }
});

// ==========================================
// 챔피언 룬·소환사 주문 빌드
//   통계 탭에서 챔피언 줄을 펼칠 때 그 챔피언 것만 부른다.
//   ★ 통계 응답에 미리 실어 보내지 않는 이유: 164챔피언 x 조합 40여 개면 응답이
//     통째로 몇 배가 되는데, 실제로 펼쳐 보는 건 한두 챔피언이다.
//   집계는 1시간마다 갱신되므로 캐시를 넉넉히 잡아도 안전하다.
// ==========================================
app.get('/api/champion-builds', async (req, res) => {
    try {
        const champ = Number(req.query.champ);
        const scope = String(req.query.scope || '');
        if (!Number.isFinite(champ) || !scope) {
            return res.status(400).json({ error: '잘못된 요청입니다.' });
        }

        const cacheKey = `builds_${scope}_${champ}`;
        const hit = myCache.get(cacheKey);
        if (hit) return res.json(hit);

        const rows = await ChampBuild.find({ scope, champ }).select('-_id -__v -scope -champ').lean();

        // ★ 박제된 패치면 행이 파일에 있다. 화면은 표를 그릴 때 이미 그 파일을 받아 뒀으므로
        //   원래 여기까지 오지도 않는데, 옛 화면이 부를 수 있으니 표식을 돌려준다.
        if (!rows.length && !(await ChampBuild.exists({ scope })) && await StatScope.exists({ scope })) {
            return res.json({ archived: true, scope, champ, total: 0, wins: 0, rows: [] });
        }

        // "all" 줄이 픽률의 분모다. 없으면 아직 집계 전이다.
        const totalRow = rows.find(r => r.type === 'all');
        const payload = {
            scope,
            champ,
            total: totalRow ? totalRow.games : 0,
            wins: totalRow ? totalRow.wins : 0,
            rows: rows.filter(r => r.type !== 'all')
        };
        myCache.set(cacheKey, payload, 600);
        res.json(payload);
    } catch (e) {
        console.error('[API] 룬 빌드 실패:', e.message);
        res.status(500).json({ error: '룬 통계를 불러오지 못했습니다.' });
    }
});

// ==========================================
// 신화급 상점 (2026-08-16 신설)
//   POST 는 로컬 수집기가 보내는 곳이고, GET 셋은 화면이 읽는 곳이다.
//   명세: mythic-collector/SERVER_SPEC.md
// ==========================================

// UTC 기준 날짜. 로테이션이 00:00 UTC 갱신이라 이게 곧 로테이션 ID 다.
//   ★ 한국시간 날짜(kstDay)와 헷갈리지 말 것 — 오전 9시 전에는 하루 차이가 난다.
const utcDay = (ms = Date.now()) => new Date(ms).toISOString().slice(0, 10);

// ★ 토큰 비교는 길이가 새지 않게 한다. 양쪽을 sha256 으로 눌러 길이를 맞춘 뒤
//   timingSafeEqual 을 쓴다 (길이가 다르면 그 함수가 예외를 던진다).
//   ★★ 실패 이유를 셋으로 갈라서 돌려준다 (2026-08-16). 전부 401 로 뭉뚱그렸더니
//     프로덕션에서 401 이 났을 때 **"서버에 토큰이 없다 / 헤더가 안 왔다 / 값이 다르다"**
//     를 구분할 수가 없었다. 셋 다 원인도 고칠 곳도 다르다.
//     값 자체는 안 흘린다 — 맞았는지 여부는 어차피 201/401 로 이미 드러난다.
function checkCollectorToken(req) {
    const expected = process.env.COLLECTOR_TOKEN || '';
    const got = req.get('X-Collector-Token') || '';

    if (!expected) return 'server_token_missing';   // 서버(Railway) 환경변수가 비었다
    if (!got) return 'header_missing';              // 헤더가 안 왔다 (프록시가 지웠을 수도)

    const a = crypto.createHash('sha256').update(expected).digest();
    const b = crypto.createHash('sha256').update(got).digest();
    return crypto.timingSafeEqual(a, b) ? null : 'token_mismatch';
}

// ★★ 수집기를 믿지 않는다. 화면을 잘못 읽을 수도 있고 토큰이 새면 아무나 보낼 수 있다.
//   틀린 값이 조용히 들어가는 게 이 기능에서 가장 나쁜 결과라 서버에서 다시 본다.
const MYTHIC_PRICE = { icon: 5, emote: 25 };
const MYTHIC_IMAGE_PREFIX = 'https://raw.communitydragon.org/';

// ★★ 구획 4개 (2026-08-17). 인게임 상점 탭 그대로다.
//   `daily` 만 규칙이 다르다 — 아래 검증과 SECTION_PERIOD 참고.
const MYTHIC_SECTIONS = ['featured', 'biweekly', 'weekly', 'daily'];

// 그 구획이 몇 일마다 갈리나. **"마지막 수집이 오래됐다" 를 판정하는 데만 쓴다** —
//   일일은 오늘 것이 아니면 곧바로 낡은 것이고, 주간은 7일까지는 그대로다.
const MYTHIC_SECTION_PERIOD = { featured: 14, biweekly: 14, weekly: 7, daily: 0 };

// 일일 밖에서 파는 것들. **일일 구획에는 여전히 icon/emote 만 받는다** —
//   그 규칙이 지금까지 오독을 잡아 왔고, 일일에 스킨이 뜨는 일은 없다.
const MYTHIC_TYPES = ['icon', 'emote', 'skin', 'chroma', 'ward', 'border', 'bundle', 'other'];

// 신화 정수 가격 상한. 프레스티지 125 · 신화 스킨 150 · 크로마 40 근처라 넉넉하다.
//   ★ 이 상한은 **RP 가격을 잘못 읽어 오는 것**을 잡으려고 둔 것이다 (1350 같은 값).
//     정상인데 막히는 게 나오면 여기부터 올릴 것.
const MYTHIC_PRICE_MAX = 1000;

function validateMythicBody(body) {
    if (!body || typeof body !== 'object') return '본문이 없습니다.';

    const date = body.date;
    if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return 'date 는 YYYY-MM-DD 여야 합니다.';
    }
    // 미래 날짜 금지. 수집기 시계가 틀어졌거나 장난이다.
    if (date > utcDay()) return `date 가 미래입니다 (오늘 UTC ${utcDay()}).`;

    // ★ 안 보내면 daily 다. 구획이 생기기 전 수집기가 그대로 동작해야 한다.
    const section = body.section == null || body.section === '' ? 'daily' : body.section;
    if (!MYTHIC_SECTIONS.includes(section)) {
        return `section 은 ${MYTHIC_SECTIONS.join(' / ')} 중 하나여야 합니다 (받은 값: ${String(section).slice(0, 40)}).`;
    }
    const isDaily = section === 'daily';

    // 일일은 예전대로 12개까지. 나머지 구획은 스킨·크로마가 섞여 더 길 수 있다.
    const maxItems = isDaily ? 12 : 30;
    const items = body.items;
    if (!Array.isArray(items) || items.length < 1 || items.length > maxItems) {
        return `items 는 1개 이상 ${maxItems}개 이하의 배열이어야 합니다 (${section}).`;
    }

    for (let i = 0; i < items.length; i++) {
        const it = items[i];
        const at = `items[${i}]`;
        if (!it || typeof it !== 'object') return `${at} 가 객체가 아닙니다.`;

        if (typeof it.name !== 'string' || !it.name.trim() || it.name.length > 200) {
            return `${at}.name 은 1~200자 문자열이어야 합니다.`;
        }

        if (isDaily) {
            // ── 일일: 예전 규칙 그대로. 타입 2종 + 가격 고정 + 둘의 짝까지 본다.
            if (it.type !== 'icon' && it.type !== 'emote') {
                return `${at}.type 은 icon 또는 emote 여야 합니다 (일일 구획).`;
            }
            if (it.price !== 5 && it.price !== 25) {
                return `${at}.price 는 5 또는 25 여야 합니다 (일일 구획).`;
            }
            // 타입과 가격이 어긋나면 화면을 잘못 읽은 것이다 (아이콘 5 / 감정표현 25 고정)
            if (MYTHIC_PRICE[it.type] !== it.price) {
                return `${at} 는 ${it.type} 인데 가격이 ${it.price} 입니다 (${MYTHIC_PRICE[it.type]} 이어야 함).`;
            }
        } else {
            // ── 나머지 구획: 값이 제각각이라 짝은 못 본다. 대신 범위와 정수 여부를 본다.
            //   ★ 타입을 모르겠으면 'other' 로 보내면 통과한다. **막아서 그날 데이터를
            //     통째로 잃는 것보다 받아 두고 나중에 고치는 게 낫다** — 수집이 반자동이라
            //     한 번 거절당하면 사람이 다시 상점을 열어야 한다. 서버가 경고를 찍는다.
            if (typeof it.type !== 'string' || !MYTHIC_TYPES.includes(it.type)) {
                return `${at}.type 은 ${MYTHIC_TYPES.join(' / ')} 중 하나여야 합니다 (받은 값: ${String(it.type).slice(0, 40)}).`;
            }
            if (!Number.isInteger(it.price) || it.price < 1 || it.price > MYTHIC_PRICE_MAX) {
                return `${at}.price 는 1~${MYTHIC_PRICE_MAX} 사이 정수여야 합니다 (신화 정수 가격, 받은 값: ${it.price}).`;
            }
        }
        // ★ 이미지 출처를 고정한다. 토큰이 샜을 때 임의의 URL 을 프론트에 심는 걸 막는다 —
        //   이 값은 그대로 <img src> 로 들어간다.
        if (it.image != null && it.image !== '') {
            if (typeof it.image !== 'string' || !it.image.startsWith(MYTHIC_IMAGE_PREFIX)) {
                return `${at}.image 는 ${MYTHIC_IMAGE_PREFIX} 로 시작해야 합니다.`;
            }
        }
        if (it.catalog_id != null && typeof it.catalog_id !== 'string' && typeof it.catalog_id !== 'number') {
            return `${at}.catalog_id 가 문자열이 아닙니다.`;
        }
    }
    return null;
}

// 수집기 본문(snake_case) → 저장 형태(camelCase)
const toMythicItems = (items) => items.map(it => ({
    name: it.name.trim(),
    type: it.type,
    price: it.price,
    catalogId: it.catalog_id != null ? String(it.catalog_id) : undefined,
    image: it.image || undefined,
    score: typeof it.score === 'number' ? it.score : undefined
}));

// ★ 같은 날짜인지 비교할 때는 name/type/price 만 본다.
//   score 와 collected_at 은 같은 화면을 두 번 읽어도 달라질 수 있어서 뺀다.
const mythicFingerprint = (items) =>
    JSON.stringify(items.map(i => [i.name, i.type, i.price]));

// 화면이 읽는 캐시를 지운다. 갱신 직후에 옛 값이 남으면 안 된다.
const clearMythicCache = (date) => {
    myCache.del('mythic_today');
    myCache.del(`mythic_day_${date}`);
    myCache.keys().filter(k => k.startsWith('mythic_')).forEach(k => myCache.del(k));
};

// 수집기 전용 제한. 하루 몇 번이면 충분하다 (/api/ 의 30회/분보다 좁게).
//   ★ 로컬에서 검증 규칙을 한 줄씩 눌러 보려면 30번 넘게 쏴야 해서 막힌다.
//     `COLLECTOR_RATE_MAX=1000` 으로 띄우면 풀린다. **프로덕션에는 넣지 말 것.**
const collectorLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: Number(process.env.COLLECTOR_RATE_MAX) || 10,
    keyGenerator: (req) => ipKeyGenerator(req.headers['cf-connecting-ip'] || req.ip),
    message: { ok: false, reason: 'rate_limited' }
});

// ── 수집기가 보내는 곳
//   ★ express.json 을 전역이 아니라 이 경로에만 건다. 서버에 쓰기 엔드포인트가 여기
//     하나뿐이라 다른 경로에서 본문을 파싱할 이유가 없다.
app.post('/api/mythic-shop', collectorLimiter, express.json({ limit: '64kb' }), async (req, res) => {
    const authFail = checkCollectorToken(req);
    if (authFail) {
        console.warn(`[Mythic] 인증 실패: ${authFail}`);
        return res.status(401).json({ ok: false, reason: 'unauthorized', detail: authFail });
    }

    const bad = validateMythicBody(req.body);
    if (bad) {
        console.warn('[Mythic] 검증 실패:', bad);
        return res.status(400).json({ ok: false, reason: 'invalid', message: bad });
    }

    const date = req.body.date;
    // ★ 안 보내면 daily 다 (구획이 생기기 전 수집기와 그대로 호환된다)
    const section = req.body.section == null || req.body.section === '' ? 'daily' : req.body.section;
    const items = toMythicItems(req.body.items);
    const collectedAt = req.body.collected_at ? new Date(req.body.collected_at) : new Date();
    const force = req.query.force === '1';

    // 'other' 로 온 건 통과시키되 흔적을 남긴다. 쌓이면 MYTHIC_TYPES 에 진짜 이름을 더한다.
    const unknown = items.filter(i => i.type === 'other');
    if (unknown.length) {
        console.warn(`[Mythic] ${date}/${section} type=other ${unknown.length}건: ${unknown.map(i => i.name).join(', ')}`);
    }

    try {
        const existing = await MythicShop.findOne({ date, section }).lean();

        if (!existing) {
            await MythicShop.create({
                date, section, collectedAt: isNaN(+collectedAt) ? new Date() : collectedAt,
                items, collectorVersion: req.body.collector_version
            });
            clearMythicCache(date);
            console.log(`[Mythic] ${date}/${section} 저장 (${items.length}개)`);
            return res.status(201).json({ ok: true, created: true, date, section, count: items.length });
        }

        // ★★ 조용히 덮어쓰지 않는다. 같은 날짜·같은 구획에 다른 내용이 온다는 건 둘 중 하나가
        //   틀렸다는 뜻이라 사람이 봐야 한다. 수집기는 409 를 받으면 재시도하지 않는다.
        //   ★ 주간·격주는 며칠 동안 내용이 같으므로 **날짜가 다르면 충돌이 아니다** —
        //     같은 내용이 날짜별로 하나씩 쌓인다 (한 건 200B 라 그대로 둔다).
        if (mythicFingerprint(existing.items) === mythicFingerprint(items)) {
            return res.json({ ok: true, created: false, date, section, count: items.length });
        }

        if (!force) {
            console.warn(`[Mythic] ${date}/${section} 충돌 — 기존 ${existing.items.length}개 vs 새 ${items.length}개`);
            return res.status(409).json({
                ok: false, reason: 'conflict', date, section,
                existing: existing.items, incoming: items
            });
        }

        await MythicShop.updateOne({ date, section }, {
            $set: {
                collectedAt: isNaN(+collectedAt) ? new Date() : collectedAt,
                items, collectorVersion: req.body.collector_version
            }
        });
        clearMythicCache(date);
        console.log(`[Mythic] ${date}/${section} 강제 덮어쓰기 (${items.length}개)`);
        return res.json({ ok: true, created: false, overwritten: true, date, section, count: items.length });

    } catch (e) {
        // unique 인덱스 충돌 — 같은 순간에 두 번 들어온 경우다
        if (e.code === 11000) {
            return res.status(409).json({ ok: false, reason: 'conflict', date, section });
        }
        console.error('[Mythic] 저장 실패:', e.message);
        return res.status(500).json({ ok: false, reason: 'server_error' });
    }
});

// ── 오늘(UTC) 로테이션
//   ★ 없을 때 404 가 아니라 200 + items: null 로 준다. 404 로 주면 화면에서
//     "아직 수집 전" 과 "서버 오류" 를 구분할 수 없다.
app.get('/api/mythic-shop/today', async (req, res) => {
    try {
        const hit = myCache.get('mythic_today');
        if (hit) return res.json(hit);

        const date = utcDay();
        // ★ 일일 구획만 본다. 2026-08-17에 구획이 넷으로 늘어서, 안 걸면 같은 날짜의
        //   주간 문서가 걸려 **첫 화면 위젯에 스킨이 뜬다.**
        const doc = await MythicShop.findOne({ date, section: 'daily' }).select('-_id -__v -createdAt').lean();
        const payload = doc
            ? { ok: true, date, section: 'daily', collectedAt: doc.collectedAt, items: doc.items }
            : { ok: true, date, section: 'daily', collectedAt: null, items: null };

        // 하루 한 번 바뀌는 데이터지만 갱신 직후 옛 값이 남으면 안 되니 짧게 둔다.
        // (POST 가 성공하면 clearMythicCache 가 어차피 지운다)
        myCache.set('mythic_today', payload, 60);
        res.json(payload);
    } catch (e) {
        console.error('[Mythic] today 실패:', e.message);
        res.status(500).json({ ok: false, reason: 'server_error' });
    }
});

// ── 구획 하나의 **가장 최근** 로테이션 (2026-08-17 신설)
//   ★★ "오늘 것" 이 아니라 "마지막으로 수집한 것" 이다. 주간·격주·추천은 며칠씩 그대로라
//     오늘 날짜로 찾으면 수집한 날이 아닌 이상 늘 빈손이 된다.
//   ★ 대신 **얼마나 묵었는지(ageDays)와 낡았는지(stale)를 같이 준다.** 화면이 "어제 것을
//     오늘 것처럼" 보여주지 않으려면 이 값이 있어야 한다 — 일일은 오늘이 아니면 곧바로
//     stale 이고, 주간은 7일, 격주·추천은 14일이 지나면 stale 이다.
//   ★ /api/mythic-shop 보다 **먼저** 선언해야 한다 (아래 history 와 같은 이유).
app.get('/api/mythic-shop/section/:section', async (req, res) => {
    try {
        const section = String(req.params.section || '');
        if (!MYTHIC_SECTIONS.includes(section)) {
            return res.status(400).json({ ok: false, reason: 'invalid_section' });
        }

        const key = `mythic_sec_${section}`;
        const hit = myCache.get(key);
        if (hit) return res.json(hit);

        const today = utcDay();
        // 미래 날짜는 검증에서 막히지만, 혹시 들어와도 오늘 것으로 보이지 않게 잘라 둔다.
        const doc = await MythicShop.findOne({ section, date: { $lte: today } })
            .select('-_id -__v -createdAt').sort({ date: -1 }).lean();

        let payload;
        if (!doc) {
            payload = { ok: true, section, date: null, collectedAt: null, ageDays: null, stale: false, items: null };
        } else {
            const ageDays = Math.round((Date.parse(today) - Date.parse(doc.date)) / 86400000);
            payload = {
                ok: true, section, date: doc.date, collectedAt: doc.collectedAt,
                ageDays, stale: ageDays > MYTHIC_SECTION_PERIOD[section], items: doc.items
            };
        }

        myCache.set(key, payload, 60);
        res.json(payload);
    } catch (e) {
        console.error('[Mythic] section 실패:', e.message);
        res.status(500).json({ ok: false, reason: 'server_error' });
    }
});

// ── 그 아이템이 나온 날짜들 (최신순). "마지막 등장일" 용
//   ★ /api/mythic-shop 보다 **먼저** 선언해야 한다. 뒤에 두면 그쪽이 먼저 잡는다.
app.get('/api/mythic-shop/history/:catalogId', async (req, res) => {
    try {
        const catalogId = String(req.params.catalogId || '').slice(0, 40);
        if (!catalogId) return res.status(400).json({ ok: false, reason: 'invalid' });

        const key = `mythic_hist_${catalogId}`;
        const hit = myCache.get(key);
        if (hit) return res.json(hit);

        const docs = await MythicShop.find({ 'items.catalogId': catalogId })
            .select('date section items').sort({ date: -1 }).limit(400).lean();

        const dates = docs.map(d => d.date);
        // ★ 어느 구획에서 나왔는지도 같이 준다 (2026-08-17). 같은 아이템이 일일에도
        //   주간에도 나올 수 있어서, 날짜만으로는 "어디서 봤나" 를 못 밝힌다.
        //   `dates` 는 그대로 둔다 — 이미 쓰는 쪽이 있으면 깨지면 안 된다.
        const entries = docs.map(d => ({ date: d.date, section: d.section || 'daily' }));
        // 이름은 가장 최근 것으로 (이름이 바뀌었어도 최신 표기를 보여 준다)
        const name = docs.length
            ? (docs[0].items.find(i => i.catalogId === catalogId)?.name || null)
            : null;

        const payload = { ok: true, catalogId, name, dates, entries };
        myCache.set(key, payload, 300);
        res.json(payload);
    } catch (e) {
        console.error('[Mythic] history 실패:', e.message);
        res.status(500).json({ ok: false, reason: 'server_error' });
    }
});

// ── 기간 조회. 기본 최근 30일
app.get('/api/mythic-shop', async (req, res) => {
    try {
        const isDate = (s) => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s);
        const limit = Math.min(Math.max(parseInt(req.query.limit) || 30, 1), 400);
        const q = {};
        if (isDate(req.query.from) || isDate(req.query.to)) {
            q.date = {};
            if (isDate(req.query.from)) q.date.$gte = req.query.from;
            if (isDate(req.query.to)) q.date.$lte = req.query.to;
        }
        // ★ 구획 필터 (2026-08-17). 안 주면 전 구획이 섞여 나온다 —
        //   일일만 보려던 화면이 주간 문서를 같이 받으면 날짜가 겹쳐 보인다.
        if (req.query.section) {
            if (!MYTHIC_SECTIONS.includes(req.query.section)) {
                return res.status(400).json({ ok: false, reason: 'invalid_section' });
            }
            q.section = req.query.section;
        }

        const key = `mythic_range_${req.query.from || ''}_${req.query.to || ''}_${req.query.section || ''}_${limit}`;
        const hit = myCache.get(key);
        if (hit) return res.json(hit);

        const docs = await MythicShop.find(q)
            .select('-_id -__v -createdAt').sort({ date: -1 }).limit(limit).lean();

        const payload = { ok: true, count: docs.length, days: docs };
        myCache.set(key, payload, 60);
        res.json(payload);
    } catch (e) {
        console.error('[Mythic] 기간 조회 실패:', e.message);
        res.status(500).json({ ok: false, reason: 'server_error' });
    }
});

app.get('/api/ranking', async (req, res) => {
    const cachedRanking = myCache.get('challenger_ranking_data');
    if (cachedRanking) return res.json(cachedRanking);
    if (challengerList.length === 0) return res.status(503).json({ error: "랭킹 데이터를 수집 중입니다. 잠시 후 다시 시도해주세요." });

    // 티어는 한 글자로 줄여 보낸다. 1만 명 x 매 항목이라 글자 수가 곧 응답 크기다.
    const TIER_CODE = { challengerleagues: 'C', grandmasterleagues: 'G', masterleagues: 'M' };

    const processedPlayers = challengerList.map(p => ({
        displayName: resolvedNames[p.puuid]?.displayName || `User-${String(p.puuid).substring(0, 8)}`,
        leaguePoints: p.leaguePoints || 0,
        wins: p.wins || 0,
        losses: p.losses || 0,
        tier: TIER_CODE[p.tier] || 'M',
        // 숙련도 상위 5개 championId. 아직 못 받은 사람은 빈 배열이라 글자를 거의 안 먹는다
        mastery: resolvedMastery[p.puuid]?.top || []
    }));

    const finalRankingData = { tier: "CHALLENGER", updatedAt: rankUpdatedAt, players: processedPlayers };
    myCache.set('challenger_ranking_data', finalRankingData, 600);
    res.json(finalRankingData);
});

// 아레나 증강체 데이터
app.get('/api/arena/augments', (req, res) => {
    res.json(arenaAugments);
});

// ==========================================
// [6] 프론트엔드 라우팅 및 서버 구동
// ==========================================
app.get(/.*/, sendIndexHtml);

const PORT = process.env.PORT || 3000;

async function bootstrap() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 15000
        });
        console.log("[System] MongoDB 연결 성공");
    } catch (err) {
        console.error("[System] MongoDB 연결 실패. 서버를 종료합니다.");
        console.error(`  → ${err.message}`);
        process.exit(1);
    }

    await startJobs();
    refreshChampLaneStats();
    setInterval(refreshChampLaneStats, 60 * 60 * 1000);   // 1시간마다 갱신

    app.listen(PORT, () => console.log(`[System] 서버 실행 중: 포트 ${PORT}`));
}

bootstrap();