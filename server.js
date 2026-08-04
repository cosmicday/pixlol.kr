require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
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
    displayName: { type: String, required: true },
    updatedAt: { type: Number, required: true }
});

// ★ 닉네임 → puuid 역방향 조회용 인덱스
summonerCacheSchema.index({ displayName: 1 });

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

// ★ 중복 선언되어 있던 정적 파일 제공 설정을 하나로 통합
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// API 속도 제한 (Rate Limiting) - 1분에 30번
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 30,
    keyGenerator: (req) => ipKeyGenerator(req.headers['cf-connecting-ip'] || req.ip),
    message: { error: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요." }
});
app.use('/api/', apiLimiter);

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
                    await SummonerCache.findOneAndUpdate({ puuid: p.puuid }, { displayName: dName, updatedAt: now }, { upsert: true });
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
    await updateVersion();
    await updateMerakiData();
    await updateChallengerList();

    // 닉네임 변환은 오래 걸리므로 기다리지 않고 백그라운드로 던짐
    resolveNamesInBackground();

    setInterval(updateChallengerList, 600 * 1000);
    setInterval(resolveNamesInBackground, 60 * 1000);
    setInterval(updateMerakiData, 24 * 60 * 60 * 1000);

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
const QUEUE_MAP = { 420: "솔로랭크", 440: "자유랭크", 450: "칼바람", 1700: "아레나" };

// 정규식 특수문자 이스케이프
function escapeRegex(str) {
    return String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// 매치 상세(detail) 하나를 화면용 데이터로 변환
function buildHistoryEntry(detail, targetPuuid, isPast = false) {
    const p = detail.info.participants.find(part => part.puuid === targetPuuid);
    if (!p) return null;

    const durationMin = Math.floor(detail.info.gameDuration / 60);
    const durationSec = detail.info.gameDuration % 60;
    const daysAgo = Math.floor((Date.now() - detail.info.gameEndTimestamp) / 86400000);
    const teamKills = detail.info.participants.filter(x => x.teamId === p.teamId).reduce((sum, x) => sum + x.kills, 0);

    return {
        matchId: detail.metadata.matchId,
        queueType: QUEUE_MAP[detail.info.queueId] || "일반",
        win: p.win,
        championName: p.championName === "FiddleSticks" ? "Fiddlesticks" : p.championName,
        champLevel: p.champLevel,
        kills: p.kills, deaths: p.deaths, assists: p.assists,
        kda: p.deaths === 0 ? "Perfect" : ((p.kills + p.assists) / p.deaths).toFixed(2),
        kp: teamKills === 0 ? 0 : Math.round(((p.kills + p.assists) / teamKills) * 100),
        spell1: p.summoner1Id, spell2: p.summoner2Id,
        mainRune: p.perks?.styles?.[0]?.style || null, subRune: p.perks?.styles?.[1]?.style || null,
        item0: p.item0, item1: p.item1, item2: p.item2, item3: p.item3, item4: p.item4, item5: p.item5, item6: p.item6,
        item7: (p.roleBoundItem || p.item7 || p.playerAugment1 || 0),
        totalCs: p.totalMinionsKilled + p.neutralMinionsKilled,
        csPerMin: durationMin > 0 ? ((p.totalMinionsKilled + p.neutralMinionsKilled) / durationMin).toFixed(1) : "0.0",
        goldEarned: p.goldEarned, visionScore: p.visionScore, controlWards: p.visionWardsBoughtInGame,
        multiKill: p.pentaKills ? "펜타킬" : (p.quadraKills ? "쿼드라킬" : (p.tripleKills ? "트리플킬" : (p.doubleKills ? "더블킬" : ""))),
        firstBlood: p.firstBloodKill, durationMin, durationSec,
        dateStr: isPast ? "과거 전적" : (daysAgo === 0 ? "오늘" : (daysAgo > 30 ? "1개월 전" : `${daysAgo}일 전`)),
        timestamp: detail.info.gameEndTimestamp,
        participants: detail.info.participants.map(part => ({
            puuid: part.puuid, isSearchedUser: part.puuid === targetPuuid, teamId: part.teamId, win: part.win, champLevel: part.champLevel,
            championName: part.championName === "FiddleSticks" ? "Fiddlesticks" : part.championName, visionScore: part.visionScore,
            summonerName: part.riotIdGameName ? `${part.riotIdGameName}#${part.riotIdTagline}` : (part.summonerName || "알 수 없음"),
            kills: part.kills, deaths: part.deaths, assists: part.assists, damage: part.totalDamageDealtToChampions, damageTaken: part.totalDamageTaken,
            kp: Math.round(((part.kills + part.assists) / (part.teamId === 100 ? detail.info.participants.filter(x => x.teamId === 100).reduce((sum, x) => sum + x.kills, 0) : detail.info.participants.filter(x => x.teamId === 200).reduce((sum, x) => sum + x.kills, 0))) * 100) || 0,
            gold: part.goldEarned, cs: part.totalMinionsKilled + part.neutralMinionsKilled,
            wardsPlaced: part.wardsPlaced || 0, wardsKilled: part.wardsKilled || 0, visionWards: part.visionWardsBoughtInGame || 0,
            item0: part.item0, item1: part.item1, item2: part.item2, item3: part.item3, item4: part.item4, item5: part.item5, item6: part.item6, item7: (part.roleBoundItem || part.item7 || part.playerAugment1 || 0),
            spell1: part.summoner1Id, spell2: part.summoner2Id, mainRune: part.perks?.styles?.[0]?.style || null, subRune: part.perks?.styles?.[1]?.style || null
        })),
        myRunes: p.perks?.styles ? { primaryStyle: p.perks.styles[0].style, primarySelections: p.perks.styles[0].selections.map(s => s.perk), subStyle: p.perks.styles[1].style, subSelections: p.perks.styles[1].selections.map(s => s.perk), statPerks: p.perks.statPerks ? [p.perks.statPerks.offense, p.perks.statPerks.flex, p.perks.statPerks.defense] : [] } : null
    };
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

        // ★ 검색된 소환사를 캐시에 저장 (429 폴백 및 랭킹 닉네임에 재사용)
        const canonicalName = `${accountData.gameName}#${accountData.tagLine}`;
        SummonerCache.findOneAndUpdate(
            { puuid: targetPuuid },
            { displayName: canonicalName, updatedAt: Date.now() },
            { upsert: true }
        ).catch(() => { });
        resolvedNames[targetPuuid] = { displayName: canonicalName, updatedAt: Date.now() };

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

    const goldFrames = { labels: [], blue: [], red: [] };
    let myTimeline = { skills: [], items: [] };

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
            for (let i = 1; i <= 5; i++) blueGold += frame.participantFrames[i]?.totalGold || 0;
            for (let i = 6; i <= 10; i++) redGold += frame.participantFrames[i]?.totalGold || 0;
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
app.get(/.*/, (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

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