require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const NodeCache = require('node-cache');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

// ==========================================
// [0] 초기 설정 및 전역 변수
// ==========================================
const myCache = new NodeCache({ stdTTL: 300 }); 
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const API_KEY = process.env.API_KEY;
let currentVersion = "14.4.1"; // Data Dragon API 통신 실패 시 사용할 기본 버전

// ==========================================
// [1] 백그라운드 스케줄러 및 DB 로직 (랭킹용)
// ==========================================
let db;
let challengerList = []; 
let resolvedNames = {};  
let isFetchingNames = false; 

// 1-1. SQLite DB 초기화
async function initDB() {
    db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });
    
    await db.exec(`
        CREATE TABLE IF NOT EXISTS summoners (
            puuid TEXT PRIMARY KEY,
            displayName TEXT,
            updatedAt INTEGER
        )
    `);

    // 날짜별 LP 기록용 테이블
    await db.exec(`
        CREATE TABLE IF NOT EXISTS lp_history (
            puuid TEXT,
            date TEXT,
            tier TEXT,
            rank TEXT,
            lp INTEGER,
            PRIMARY KEY (puuid, date)
        )
    `);
    
    const rows = await db.all('SELECT * FROM summoners');
    rows.forEach(row => {
        resolvedNames[row.puuid] = {
            displayName: row.displayName,
            updatedAt: row.updatedAt
        };
    });
    console.log(`[System] DB 연동 완료: 기존 저장된 유저 데이터 ${rows.length}건 로드`);
}
initDB();

// 1-2. Data Dragon 버전 갱신
async function updateVersion() {
    try {
        const res = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json');
        currentVersion = res.data[0];
        console.log(`[System] Data Dragon 최신 버전 로드 완료: ${currentVersion}`);
    } catch (e) {
        console.error("[System] 버전 정보 갱신 실패. 기본 버전을 사용합니다.");
    }
}

// 1-3. 챌린저 티어 명단 조회
async function updateChallengerList() {
    try {
        const url = `https://kr.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=${API_KEY}`;
        const res = await axios.get(url);
        if (res.data && res.data.entries) {
            challengerList = res.data.entries.sort((a, b) => b.leaguePoints - a.leaguePoints);
            console.log("[Task] 챌린저 명단 갱신 완료");
        }
    } catch (err) {
        console.error("[Task Error] 챌린저 명단 로드 실패:", err.message);
    }
}

// 1-4. 닉네임 변환 (Rate Limit 방어 적용)
async function resolveNamesInBackground() {
    if (challengerList.length === 0 || isFetchingNames) return;
    isFetchingNames = true;

    const now = Date.now();
    const THREE_DAYS = 3 * 24 * 60 * 60 * 1000;

    const targets = challengerList.filter(p => {
        const saved = resolvedNames[p.puuid];
        if (!saved) return true; 
        if (now - saved.updatedAt > THREE_DAYS) return true; 
        return false;
    }).slice(0, 30);

    if (targets.length > 0) {
        console.log(`[Task] 백그라운드 닉네임 변환 작업 시작 (${targets.length}건 진행)`);
        for (const p of targets) {
            try {
                const accRes = await axios.get(`https://asia.api.riotgames.com/riot/account/v1/accounts/by-puuid/${p.puuid}?api_key=${API_KEY}`);
                if (accRes.data.gameName) {
                    const dName = `${accRes.data.gameName}#${accRes.data.tagLine}`;
                    const updateTime = Date.now();
                    
                    resolvedNames[p.puuid] = { displayName: dName, updatedAt: updateTime };
                    await db.run(
                        `INSERT INTO summoners (puuid, displayName, updatedAt) VALUES (?, ?, ?)
                         ON CONFLICT(puuid) DO UPDATE SET displayName=excluded.displayName, updatedAt=excluded.updatedAt`,
                        [p.puuid, dName, updateTime]
                    );
                }
            } catch (err) {
                // Rate Limit 무시
            }
            await new Promise(resolve => setTimeout(resolve, 1200));
        }
        console.log("[Task] 백그라운드 닉네임 변환 작업 완료");
    }
    isFetchingNames = false;
}

// 1-5. 스케줄러 시작
async function startJobs() {
    await updateVersion();
    await updateChallengerList(); 
    await resolveNamesInBackground(); 
    
    setInterval(updateChallengerList, 600 * 1000); 
    setInterval(resolveNamesInBackground, 120 * 1000);
}
startJobs();

// ==========================================
// [2] API 라우터 (전적, 모스트, 통계, 랭킹)
// ==========================================

// 2-1. 전적 검색 API
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
        if (!gameName || !tagLine) {
            return res.status(400).json({ error: "닉네임#태그 형식으로 입력해주세요." });
        }

        const accountUrl = `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}?api_key=${API_KEY}`;
        const { data: accountData } = await axios.get(accountUrl);
        const targetPuuid = accountData.puuid;

        const summonerUrl = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${targetPuuid}?api_key=${API_KEY}`;
        const leagueUrl = `https://kr.api.riotgames.com/lol/league/v4/entries/by-puuid/${targetPuuid}?api_key=${API_KEY}`;
        
        const [summonerRes, leagueRes] = await Promise.all([
            axios.get(summonerUrl),
            axios.get(leagueUrl)
        ]);
        
        const realLevel = summonerRes.data.summonerLevel;
        const realIconId = summonerRes.data.profileIconId;
        const rankData = leagueRes.data.find(entry => entry.queueType === 'RANKED_SOLO_5x5') || null;

        let historyRecords = [];
        if (db) {
            const today = new Date().toISOString().split('T')[0];
            if (rankData) {
                await db.run(
                    `INSERT INTO lp_history (puuid, date, tier, rank, lp) VALUES (?, ?, ?, ?, ?)
                     ON CONFLICT(puuid, date) DO UPDATE SET tier=excluded.tier, rank=excluded.rank, lp=excluded.lp`,
                    [targetPuuid, today, rankData.tier, rankData.rank, rankData.leaguePoints]
                );
            }
            historyRecords = await db.all(`SELECT date, tier, rank, lp FROM lp_history WHERE puuid = ? ORDER BY date ASC`, [targetPuuid]);
        }

        const matchUrl = `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${targetPuuid}/ids?start=0&count=10&api_key=${API_KEY}`;
        const { data: matchIds } = await axios.get(matchUrl);

        const history = await Promise.all(matchIds.map(async (matchId) => {
            try {
                const detailUrl = `https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`;
                const { data: detail } = await axios.get(detailUrl);
                const p = detail.info.participants.find(participant => participant.puuid === targetPuuid);

                if (!p) return null;

                let queueType = "일반";
                if (detail.info.queueId === 420) queueType = "솔로랭크";
                else if (detail.info.queueId === 440) queueType = "자유랭크";
                else if (detail.info.queueId === 450) queueType = "칼바람";
                else if (detail.info.queueId === 1700) queueType = "아레나";

                const kdaCalc = p.deaths === 0 ? "Perfect" : ((p.kills + p.assists) / p.deaths).toFixed(2);
                const teamKills = detail.info.participants.filter(x => x.teamId === p.teamId).reduce((sum, x) => sum + x.kills, 0);
                const kp = teamKills === 0 ? 0 : Math.round(((p.kills + p.assists) / teamKills) * 100);

                const blueTeam = detail.info.participants.filter(x => x.teamId === 100).map(x => x.championName);
                const redTeam = detail.info.participants.filter(x => x.teamId === 200).map(x => x.championName);

                const durationMin = Math.floor(detail.info.gameDuration / 60);
                const durationSec = detail.info.gameDuration % 60;
                const timeDiff = Date.now() - detail.info.gameEndTimestamp;
                const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                let dateStr = daysAgo === 0 ? "오늘" : (daysAgo > 30 ? "1개월 전" : `${daysAgo}일 전`);

                const totalCs = p.totalMinionsKilled + p.neutralMinionsKilled;
                const csPerMin = (totalCs / (detail.info.gameDuration / 60)).toFixed(1);

                let multiKill = "";
                if (p.pentaKills > 0) multiKill = "펜타킬";
                else if (p.quadraKills > 0) multiKill = "쿼드라킬";
                else if (p.tripleKills > 0) multiKill = "트리플킬";
                else if (p.doubleKills > 0) multiKill = "더블킬";

                // ★ 각 팀별 전체 킬 수 계산 (상세 10인 킬관여율을 위해) ★
                const team100Kills = detail.info.participants.filter(x => x.teamId === 100).reduce((sum, x) => sum + x.kills, 0);
                const team200Kills = detail.info.participants.filter(x => x.teamId === 200).reduce((sum, x) => sum + x.kills, 0);

                const detailedParticipants = detail.info.participants.map(part => {
                    let pChampName = part.championName;
                    if (pChampName === "FiddleSticks") pChampName = "Fiddlesticks"; 

                    // ★ 라이엇이 숨겨둔 역할군 보상 아이템(신발 등)을 찾아냅니다 ★
                    const hiddenItem = part.roleBoundItem || part.item7 || part.playerAugment1 || 0;
                    
                    // ★ 10인 개별 킬관여율 계산 ★
                    const pTeamKills = part.teamId === 100 ? team100Kills : team200Kills;
                    const pKp = pTeamKills === 0 ? 0 : Math.round(((part.kills + part.assists) / pTeamKills) * 100);

                    return {
                        puuid: part.puuid,
                        isSearchedUser: part.puuid === targetPuuid,
                        teamId: part.teamId,
                        win: part.win,
                        champLevel: part.champLevel,
                        championName: pChampName,
                        visionScore: part.visionScore,
                        summonerName: part.riotIdGameName ? `${part.riotIdGameName}#${part.riotIdTagLine}` : (part.summonerName || "알 수 없음"),
                        kills: part.kills, deaths: part.deaths, assists: part.assists,
                        damage: part.totalDamageDealtToChampions,
                        damageTaken: part.totalDamageTaken, // 추가: 받은 피해량
                        kp: pKp, // 추가: 개별 킬관여율
                        gold: part.goldEarned,
                        cs: part.totalMinionsKilled + part.neutralMinionsKilled,
                        wardsPlaced: part.wardsPlaced || 0,
                        wardsKilled: part.wardsKilled || 0,
                        visionWards: part.visionWardsBoughtInGame || 0,
                        item0: part.item0, item1: part.item1, item2: part.item2, item3: part.item3, item4: part.item4, item5: part.item5, item6: part.item6, item7: hiddenItem, // 찾아낸 신발을 item7 자리에 꽂아줌
                        spell1: part.summoner1Id, spell2: part.summoner2Id,
                        mainRune: part.perks.styles[0]?.style, subRune: part.perks.styles[1]?.style,
                        champLevel: part.champLevel
                    };
                });

                // ★ [핵심 2] 검색한 메인 유저의 신발 데이터도 동일하게 강제 탐색 ★
                const myHiddenItem = p.roleBoundItem || p.item7 || p.playerAugment1 || 0;

                return {
                    queueType, win: p.win, 
                    championName: p.championName, champLevel: p.champLevel,
                    kills: p.kills, deaths: p.deaths, assists: p.assists, kda: kdaCalc, kp,
                    spell1: p.summoner1Id, spell2: p.summoner2Id,
                    mainRune: p.perks.styles[0]?.style, subRune: p.perks.styles[1]?.style,
                    item0: p.item0, item1: p.item1, item2: p.item2, item3: p.item3, item4: p.item4, item5: p.item5, item6: p.item6, 
                    item7: myHiddenItem, // 찾아낸 신발을 item7 자리에 꽂아줌
                    totalCs, csPerMin, goldEarned: p.goldEarned, visionScore: p.visionScore, controlWards: p.visionWardsBoughtInGame,
                    multiKill, firstBlood: p.firstBloodKill,
                    durationMin, durationSec, dateStr,
                    timestamp: detail.info.gameEndTimestamp, 
                    blueTeam, redTeam,
                    participants: detailedParticipants
                };
            } catch (err) {
                return null;
            }
        }));

        const cleanHistory = history.filter(Boolean);

        const finalData = {
            puuid: targetPuuid,
            version: currentVersion,
            profile: {
                name: `${gameName}#${tagLine}`,
                level: realLevel,
                icon: `https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/profileicon/${realIconId}.png`,
                tier: rankData ? rankData.tier : 'UNRANKED',
                rank: rankData ? rankData.rank : '',
                leaguePoints: rankData ? rankData.leaguePoints : 0
            },
            history: cleanHistory,
            lpHistory: historyRecords 
        };

        myCache.set(summonerName, finalData);
        finalData.expireAt = myCache.getTtl(summonerName);
        console.log(`[API] 전적 데이터 로드 완료: ${summonerName}`);
        res.json(finalData);

    } catch (error) {
        if (error.response) {
            console.error(`[Error] API 통신 오류: ${error.config.url} (Status: ${error.response.status})`);
            if (error.response.status === 404) {
                return res.status(404).json({ error: "소환사를 찾을 수 없습니다. 닉네임을 다시 확인해주세요." });
            }
        } else {
            console.error("[Error] 서버 내부 오류:", error.message);
        }
        res.status(500).json({ error: "데이터 처리 중 문제가 발생했습니다." });
    }
});

// 2-2. 유저 모스트 챔피언(숙련도 Top 7) API
app.get('/api/mastery/:puuid', async (req, res) => {
    try {
        const puuid = req.params.puuid;
        
        const response = await axios.get(`https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?count=7`, {
            headers: { 'X-Riot-Token': API_KEY } 
        });
        
        res.json(response.data);
    } catch (error) {
        console.error("마스터리 조회 에러:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: '마스터리 데이터를 불러오지 못했습니다.' });
    }
});

// 2-3. 통계 데이터 (로컬 JSON) API
app.get('/api/champion-stats', (req, res) => {
    try {
        const statsData = require('./stats_data.json');
        res.json(statsData);
    } catch (error) {
        console.error('[Error] 로컬 통계 데이터 파일을 찾을 수 없거나 읽기 실패:', error.message);
        res.status(500).json({ error: "통계 데이터를 불러오지 못했습니다." });
    }
});

// 2-4. 챌린저 랭킹 API
app.get('/api/ranking', async (req, res) => {
    const RANK_CACHE_KEY = 'challenger_ranking_data';

    const cachedRanking = myCache.get(RANK_CACHE_KEY);
    if (cachedRanking) return res.json(cachedRanking);

    if (challengerList.length === 0) {
        return res.status(503).json({ error: "랭킹 데이터를 수집 중입니다. 잠시 후 다시 시도해주세요." });
    }

    const processedPlayers = challengerList.map(p => {
        const saved = resolvedNames[p.puuid];
        const dName = saved ? saved.displayName : `User-${String(p.puuid).substring(0, 8)}`;
        
        return {
            displayName: dName,
            leaguePoints: p.leaguePoints || 0,
            wins: p.wins || 0,
            losses: p.losses || 0
        };
    });

    const finalRankingData = {
        tier: "CHALLENGER",
        players: processedPlayers
    };

    myCache.set(RANK_CACHE_KEY, finalRankingData, 600);
    res.json(finalRankingData);
});

// ==========================================
// [3] 프론트엔드 라우팅 및 서버 구동
// ==========================================
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => console.log('[System] 서버 실행 중: http://localhost:3000'));