require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const NodeCache = require('node-cache');
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
    createdAt: { type: Date, expires: '14d', default: Date.now }
});

// ★ 폴백 조회용 인덱스 (puuid로 매치를 찾고 최신순 정렬)
matchCacheSchema.index({ 'detail.metadata.participants': 1, 'detail.info.gameEndTimestamp': -1 });

const MatchCache = mongoose.model('MatchCache', matchCacheSchema);

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
    level: { type: Number }
});

summonerCacheSchema.index({ displayName: 1 });
summonerCacheSchema.index({ namePartLower: 1, tierScore: -1 });

const SummonerCache = mongoose.model('SummonerCache', summonerCacheSchema);

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
let resolvedNames = {};
let failedPuuids = {};        // ★ 추가: 조회 실패한 puuid와 실패 시각
let isFetchingNames = false;
let resolvedCountIn10Mins = 0;
let merakiChampionData = {};
let arenaAugments = {};

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
    html = html.replace(/(src|href)="\/([A-Za-z0-9_\-.]+\.(?:js|css))"/g, (match, attr, file) => {
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
        summoners.forEach(s => resolvedNames[s.puuid] = { displayName: s.displayName, updatedAt: s.updatedAt });
        console.log(`[System] DB 로드: 닉네임 ${summoners.length}명, 전적 ${await MatchCache.countDocuments()}게임`);
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

async function updateMerakiData() {
    try {
        const res = await axios.get('http://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions.json');
        merakiChampionData = res.data;
        console.log(`[Task] Meraki 챔피언 세부 스킬 데이터 갱신 완료`);
    } catch (err) {
        console.error("[Task] Meraki 데이터 갱신 실패:", err.message);
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

async function updateChallengerList() {
    try {
        const tiers = ['challengerleagues', 'grandmasterleagues', 'masterleagues'];

        const results = await Promise.all(
            tiers.map(tier =>
                riotApi.get(`https://kr.api.riotgames.com/lol/league/v4/${tier}/by-queue/RANKED_SOLO_5x5`)
                    .catch(e => {
                        console.error(`[Task Error] ${tier} 조회 실패:`, e.response?.status || e.message);
                        return { data: null };
                    })
            )
        );

        results.forEach((res, i) => {
            console.log(`[Task] ${tiers[i]}: ${res.data?.entries?.length || 0}명`);
        });

        const combinedEntries = results.flatMap(res => res.data?.entries || []);

        if (combinedEntries.length > 0) {
            challengerList = combinedEntries.sort((a, b) => b.leaguePoints - a.leaguePoints);
            console.log(`[Task] 랭킹 명단 갱신 완료 (총 ${challengerList.length}명)`);
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

async function startJobs() {
    await loadResolvedNames();
    await backfillSearchFields();
    await updateVersion();
    await updateMerakiData();
    await updateArenaAugments();
    await updateChallengerList();

    // 닉네임 변환은 오래 걸리므로 기다리지 않고 백그라운드로 던짐
    resolveNamesInBackground();

    setInterval(updateChallengerList, 600 * 1000);
    setInterval(resolveNamesInBackground, 60 * 1000);
    setInterval(updateMerakiData, 24 * 60 * 60 * 1000);
    setInterval(updateArenaAugments, 24 * 60 * 60 * 1000);

    setInterval(() => {
        if (resolvedCountIn10Mins > 0) {
            console.log(`[Task] 백그라운드 닉네임 변환 진행 (최근 10분간 ${resolvedCountIn10Mins}건 갱신 완료)`);
            resolvedCountIn10Mins = 0;
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

    400: "일반",          // 드래프트 픽
    430: "일반",          // 대전 선택
    480: "빠른대전",      // 스위프트플레이
    490: "빠른대전",      // 퀵플레이 (구버전)

    450: "칼바람",
    720: "칼바람",        // 칼바람 클래시
    2400: "아수라장",     // 무작위 총력전: 아수라장 (실측 확인)

    830: "봇전(입문)", 840: "봇전(초보)", 850: "봇전(중급)",   // 구버전 봇전
    870: "봇전(입문)", 880: "봇전(초보)", 890: "봇전(중급)",   // 현재 봇전

    700: "클래시",
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
        // 다시하기: 라이엇이 조기 항복 플래그를 주고, 없으면 4분 미만으로 판정.
        // 실제로 플레이한 게임이 아니라 승률·포지션·챔피언 통계에서 전부 제외한다.
        isRemake: !isArena && (p.gameEndedInEarlySurrender === true || durationMin < 4),
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

    return { goldFrames, myTimeline: myParticipantId ? myTimeline : null };
}

// ==========================================
// 진행 중인 게임 (Spectator v5)
//   match-v5와 달리 플랫폼 라우팅(kr)을 쓴다. asia로 부르면 404가 뜬다.
//   게임 중이 아니면 라이엇이 404를 주는데, 이건 에러가 아니라 정상 응답이다.
// ==========================================
const liveGameCache = new Map();       // puuid -> { at, payload }
const LIVE_CACHE_MS = 30 * 1000;       // 실시간성이 중요해서 짧게만 캐싱

function extractLiveGame(raw) {
    const bans = { blue: [], red: [] };
    (raw.bannedChampions || []).forEach(b => {
        if (b.championId > 0) (b.teamId === 100 ? bans.blue : bans.red).push(b.championId);
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
    return {
        gameId: raw.gameId,
        queueId: raw.gameQueueConfigId,
        queueName: QUEUE_MAP[raw.gameQueueConfigId] || '기타',
        mapId: raw.mapId,
        // gameLength는 로딩 화면 시간을 빼고 세기 때문에 음수로 시작할 수 있다
        gameLength: Math.max(0, raw.gameLength || 0),
        gameStartTime: raw.gameStartTime || 0,
        bans,
        teams: {
            blue: participants.filter(p => p.teamId === 100).map(toPlayer),
            red: participants.filter(p => p.teamId === 200).map(toPlayer)
        }
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
app.get('/api/ranking', async (req, res) => {
    const cachedRanking = myCache.get('challenger_ranking_data');
    if (cachedRanking) return res.json(cachedRanking);
    if (challengerList.length === 0) return res.status(503).json({ error: "랭킹 데이터를 수집 중입니다. 잠시 후 다시 시도해주세요." });

    const processedPlayers = challengerList.map(p => ({
        displayName: resolvedNames[p.puuid]?.displayName || `User-${String(p.puuid).substring(0, 8)}`,
        leaguePoints: p.leaguePoints || 0,
        wins: p.wins || 0,
        losses: p.losses || 0
    }));

    const finalRankingData = { tier: "CHALLENGER", players: processedPlayers };
    myCache.set('challenger_ranking_data', finalRankingData, 600);
    res.json(finalRankingData);
});

// 아레나 증강체 데이터
app.get('/api/arena/augments', (req, res) => {
    res.json(arenaAugments);
});

// 메라키 챔피언 세부 데이터
app.get('/api/champions/meraki', (req, res) => {
    if (Object.keys(merakiChampionData).length > 0) {
        res.json(merakiChampionData);
    } else {
        res.status(503).json({ error: "데이터를 준비 중입니다." });
    }
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
    app.listen(PORT, () => console.log(`[System] 서버 실행 중: 포트 ${PORT}`));
}

bootstrap();