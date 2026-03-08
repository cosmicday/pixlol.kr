require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const NodeCache = require('node-cache');

const mongoose = require('mongoose');

// MongoDB 연결
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ MongoDB 연결 성공!'))
.catch((err) => console.error('❌ MongoDB 연결 실패:', err));

// ==========================================
// ★ MongoDB 스키마(데이터 구조) 정의 ★
// ==========================================

// 1. 매치 캐싱용 (전적 20게임 상세 정보)
const matchSchema = new mongoose.Schema({
    matchId: { type: String, required: true, unique: true }, 
    detail: { type: Object, required: true } 
});
const MatchCache = mongoose.model('MatchCache', matchSchema);

// 2. 소환사 닉네임 캐싱용 (챌린저 랭킹 속도 향상)
const summonerSchema = new mongoose.Schema({
    puuid: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    updatedAt: { type: Number, required: true }
});
const SummonerCache = mongoose.model('SummonerCache', summonerSchema);


// ==========================================
// [0] 초기 설정 및 전역 변수
// ==========================================
const myCache = new NodeCache({ stdTTL: 300 }); 
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const API_KEY = process.env.API_KEY;
let currentVersion = "14.4.1"; 

// ==========================================
// [1] 백그라운드 스케줄러 및 DB 로직 (랭킹용)
// ==========================================
let challengerList = []; 
let resolvedNames = {};  
let isFetchingNames = false; 

// 1-1. 서버 켜질 때 MongoDB에서 닉네임 데이터 한 번에 싹 불러오기
async function loadResolvedNames() {
    try {
        const summoners = await SummonerCache.find({});
        summoners.forEach(s => {
            resolvedNames[s.puuid] = {
                displayName: s.displayName,
                updatedAt: s.updatedAt
            };
        });
        console.log(`[System] MongoDB 닉네임 연동 완료: 기존 저장된 유저 ${summoners.length}명 로드`);
        const matchCount = await MatchCache.countDocuments();
        console.log(`[System] MongoDB 전적 연동 완료: 기존 저장된 전적 ${matchCount}게임 로드`);

    } catch (err) {
        console.error("[System] MongoDB 닉네임 로드 실패:", err.message);
    }
}

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

// 1-3. 상위 1500명 명단 조회 (챌린저, 그랜드마스터, 마스터 통합)
async function updateChallengerList() {
    try {
        const [challengerRes, gmRes, masterRes] = await Promise.all([
            axios.get(`https://kr.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=${API_KEY}`),
            axios.get(`https://kr.api.riotgames.com/lol/league/v4/grandmasterleagues/by-queue/RANKED_SOLO_5x5?api_key=${API_KEY}`),
            axios.get(`https://kr.api.riotgames.com/lol/league/v4/masterleagues/by-queue/RANKED_SOLO_5x5?api_key=${API_KEY}`)
        ]).catch(e => {
            console.error("[Task Error] 일부 랭킹 API 호출 실패:", e.message);
            return [null, null, null];
        });

        let combinedEntries = [];
        
        if (challengerRes && challengerRes.data && challengerRes.data.entries) {
            combinedEntries = combinedEntries.concat(challengerRes.data.entries);
        }
        if (gmRes && gmRes.data && gmRes.data.entries) {
            combinedEntries = combinedEntries.concat(gmRes.data.entries);
        }
        if (masterRes && masterRes.data && masterRes.data.entries) {
            combinedEntries = combinedEntries.concat(masterRes.data.entries);
        }

        if (combinedEntries.length > 0) {
            // LP 기준 내림차순 정렬 후 최상위 1500명만 추출
            challengerList = combinedEntries.sort((a, b) => b.leaguePoints - a.leaguePoints).slice(0, 1500);
            console.log(`[Task] 랭킹 명단 갱신 완료 (총 ${challengerList.length}명)`);
        }
    } catch (err) {
        console.error("[Task Error] 랭킹 명단 로드 실패:", err.message);
    }
}
// 1-4. 닉네임 변환 (Rate Limit 방어 적용, MongoDB 저장)
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
    }).slice(0, 10);

    if (targets.length > 0) {
        console.log(`[Task] 백그라운드 닉네임 변환 시작 (${targets.length}건 진행)`);
        for (const p of targets) {
            try {
                const accRes = await axios.get(`https://asia.api.riotgames.com/riot/account/v1/accounts/by-puuid/${p.puuid}?api_key=${API_KEY}`);
                if (accRes.data.gameName) {
                    const dName = `${accRes.data.gameName}#${accRes.data.tagLine}`;
                    const updateTime = Date.now();
                    
                    // 1. 메모리에 즉시 반영
                    resolvedNames[p.puuid] = { displayName: dName, updatedAt: updateTime };
                    
                    // 2. MongoDB 클라우드에 평생 저장 (있으면 덮어쓰기, 없으면 새로 생성)
                    await SummonerCache.findOneAndUpdate(
                        { puuid: p.puuid },
                        { displayName: dName, updatedAt: updateTime },
                        { upsert: true }
                    );

                    myCache.del('challenger_ranking_data');
                }
            } catch (err) {
                // Rate Limit 무시
            }
            await new Promise(resolve => setTimeout(resolve, 1200));
        }
        console.log("[Task] 백그라운드 닉네임 변환 완료");
    }
    isFetchingNames = false;
}

// 1-5. 스케줄러 시작
async function startJobs() {
    await loadResolvedNames(); // 추가됨: 서버 켜지면 몽고DB에서 이름부터 쫙 가져옴
    await updateVersion();
    await updateChallengerList(); 
    await resolveNamesInBackground(); 
    
    setInterval(updateChallengerList, 600 * 1000); 
    setInterval(resolveNamesInBackground, 60 * 1000);
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
        console.log(`[API] 전적 검색 메모리 캐시 적중: ${summonerName}`);
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

        // ★ 매치 20게임 불러오기 (캐싱 적용 유지)
        const matchUrl = `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${targetPuuid}/ids?start=0&count=20&api_key=${API_KEY}`;
        const { data: matchIds } = await axios.get(matchUrl);

        const cachedMatches = await MatchCache.find({ matchId: { $in: matchIds } });
        const cachedMatchIds = cachedMatches.map(m => m.matchId);
        
        const matchesToFetch = matchIds.filter(id => !cachedMatchIds.includes(id));
        console.log(`[DB Cache] ${summonerName}: 20게임 중 DB에서 ${cachedMatchIds.length}게임 로드, 신규 ${matchesToFetch.length}게임 요청`);

        const newMatchesData = await Promise.all(matchesToFetch.map(async (matchId) => {
            try {
                const detailUrl = `https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`;
                const { data: detail } = await axios.get(detailUrl);
                
                MatchCache.create({ matchId, detail }).catch(e => console.error("DB 저장 에러:", e.message));
                
                return detail;
            } catch (err) {
                return null;
            }
        }));

        const dbMatchesData = cachedMatches.map(m => m.detail);
        let allMatchDetails = [...dbMatchesData, ...newMatchesData].filter(Boolean);
        allMatchDetails.sort((a, b) => b.info.gameEndTimestamp - a.info.gameEndTimestamp);

        const history = allMatchDetails.map((detail) => {
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

            const team100Kills = detail.info.participants.filter(x => x.teamId === 100).reduce((sum, x) => sum + x.kills, 0);
            const team200Kills = detail.info.participants.filter(x => x.teamId === 200).reduce((sum, x) => sum + x.kills, 0);

            const detailedParticipants = detail.info.participants.map(part => {
                let pChampName = part.championName;
                if (pChampName === "FiddleSticks") pChampName = "Fiddlesticks"; 

                const hiddenItem = part.roleBoundItem || part.item7 || part.playerAugment1 || 0;
                
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
                    damageTaken: part.totalDamageTaken, 
                    kp: pKp, 
                    gold: part.goldEarned,
                    cs: part.totalMinionsKilled + part.neutralMinionsKilled,
                    wardsPlaced: part.wardsPlaced || 0,
                    wardsKilled: part.wardsKilled || 0,
                    visionWards: part.visionWardsBoughtInGame || 0,
                    item0: part.item0, item1: part.item1, item2: part.item2, item3: part.item3, item4: part.item4, item5: part.item5, item6: part.item6, item7: hiddenItem,
                    spell1: part.summoner1Id, spell2: part.summoner2Id,
                    mainRune: part.perks?.styles[0]?.style, subRune: part.perks?.styles[1]?.style,
                    champLevel: part.champLevel
                };
            });

            const myHiddenItem = p.roleBoundItem || p.item7 || p.playerAugment1 || 0;

            return {
                queueType, win: p.win, 
                championName: p.championName, champLevel: p.champLevel,
                kills: p.kills, deaths: p.deaths, assists: p.assists, kda: kdaCalc, kp,
                spell1: p.summoner1Id, spell2: p.summoner2Id,
                mainRune: p.perks?.styles[0]?.style, subRune: p.perks?.styles[1]?.style,
                item0: p.item0, item1: p.item1, item2: p.item2, item3: p.item3, item4: p.item4, item5: p.item5, item6: p.item6, 
                item7: myHiddenItem,
                totalCs, csPerMin, goldEarned: p.goldEarned, visionScore: p.visionScore, controlWards: p.visionWardsBoughtInGame,
                multiKill, firstBlood: p.firstBloodKill,
                durationMin, durationSec, dateStr,
                timestamp: detail.info.gameEndTimestamp, 
                blueTeam, redTeam,
                participants: detailedParticipants
            };
        }).filter(Boolean);

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
            history: history
        };

        myCache.set(summonerName, finalData);
        finalData.expireAt = myCache.getTtl(summonerName);
        console.log(`[API] 전적 데이터 처리 완료: ${summonerName}`);
        res.json(finalData);

    } catch (error) {
        if (error.response) {
            // ★ 429 에러 발생 시 DB 폴백(Fallback) 처리 시작
            if (error.response.status === 429) {
                console.log(`[API] 429 한도 초과. ${summonerName} DB에서 과거 전적 폴백 시도...`);
                try {
                    const [gameName, tagLine] = summonerName.split('#');
                    
                    // ★ 수정1: 띄어쓰기나 대소문자를 무시하고 DB에서 검색할 수 있도록 정규식 강화
                    const safeName = gameName.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&').replace(/\s+/g, '');
                    const flexibleRegex = new RegExp("^" + safeName.split('').join('\\s*') + "$", "i");
                    
                    const fallbackMatches = await MatchCache.find({
                        "detail.info.participants": {
                            $elemMatch: {
                                $or: [
                                    { riotIdGameName: { $regex: flexibleRegex } },
                                    { summonerName: { $regex: flexibleRegex } }
                                ]
                            }
                        }
                    }).sort({ "detail.info.gameEndTimestamp": -1 }).limit(20);

                    if (fallbackMatches && fallbackMatches.length > 0) {
                        const dbMatchesData = fallbackMatches.map(m => m.detail);
                        let targetPuuid = "";
                        let profileIconId = 1;

                        const history = dbMatchesData.map((detail) => {
                            // participants 중 해당 유저 찾기 (띄어쓰기 제거 후 비교)
                            const p = detail.info.participants.find(part => {
                                const pRiot = (part.riotIdGameName || "").replace(/\s+/g, '').toLowerCase();
                                const pSumm = (part.summonerName || "").replace(/\s+/g, '').toLowerCase();
                                const sName = safeName.toLowerCase();
                                return pRiot === sName || pSumm === sName;
                            });
                            
                            if (!p) return null;

                            targetPuuid = p.puuid;
                            if (p.profileIcon) profileIconId = p.profileIcon;

                            let queueType = "일반";
                            if (detail.info.queueId === 420) queueType = "솔로랭크";
                            else if (detail.info.queueId === 440) queueType = "자유랭크";
                            else if (detail.info.queueId === 450) queueType = "칼바람";
                            else if (detail.info.queueId === 1700) queueType = "아레나";

                            const kdaCalc = p.deaths === 0 ? "Perfect" : ((p.kills + p.assists) / p.deaths).toFixed(2);
                            const teamKills = detail.info.participants.filter(x => x.teamId === p.teamId).reduce((sum, x) => sum + x.kills, 0);
                            const kp = teamKills === 0 ? 0 : Math.round(((p.kills + p.assists) / teamKills) * 100);
                            const durationMin = Math.floor(detail.info.gameDuration / 60);
                            const durationSec = detail.info.gameDuration % 60;
                            const timeDiff = Date.now() - detail.info.gameEndTimestamp;
                            const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                            let dateStr = daysAgo === 0 ? "오늘" : (daysAgo > 30 ? "1개월 전" : `${daysAgo}일 전`);
                            const totalCs = p.totalMinionsKilled + p.neutralMinionsKilled;
                            const csPerMin = (totalCs / (detail.info.gameDuration / 60)).toFixed(1);
                            
                            let multiKill = "";
                            if (p.pentaKills > 0) multiKill = "펜타킬"; else if (p.quadraKills > 0) multiKill = "쿼드라킬"; else if (p.tripleKills > 0) multiKill = "트리플킬"; else if (p.doubleKills > 0) multiKill = "더블킬";

                            const team100Kills = detail.info.participants.filter(x => x.teamId === 100).reduce((sum, x) => sum + x.kills, 0);
                            const team200Kills = detail.info.participants.filter(x => x.teamId === 200).reduce((sum, x) => sum + x.kills, 0);

                            const detailedParticipants = detail.info.participants.map(part => {
                                let pChampName = part.championName;
                                if (pChampName === "FiddleSticks") pChampName = "Fiddlesticks"; 
                                const pTeamKills = part.teamId === 100 ? team100Kills : team200Kills;
                                const pKp = pTeamKills === 0 ? 0 : Math.round(((part.kills + part.assists) / pTeamKills) * 100);
                                
                                // ★ 수정2: 룬(perks) 데이터가 없는 아레나 모드 등에서 서버가 터지지 않도록 안전장치 추가
                                const pMainRune = (part.perks && part.perks.styles && part.perks.styles[0]) ? part.perks.styles[0].style : null;
                                const pSubRune = (part.perks && part.perks.styles && part.perks.styles[1]) ? part.perks.styles[1].style : null;

                                return {
                                    puuid: part.puuid, isSearchedUser: part.puuid === targetPuuid, teamId: part.teamId, win: part.win, champLevel: part.champLevel, championName: pChampName, visionScore: part.visionScore,
                                    summonerName: part.riotIdGameName ? `${part.riotIdGameName}#${part.riotIdTagLine}` : (part.summonerName || "알 수 없음"),
                                    kills: part.kills, deaths: part.deaths, assists: part.assists, damage: part.totalDamageDealtToChampions, damageTaken: part.totalDamageTaken, kp: pKp, gold: part.goldEarned,
                                    cs: part.totalMinionsKilled + part.neutralMinionsKilled, wardsPlaced: part.wardsPlaced || 0, wardsKilled: part.wardsKilled || 0, visionWards: part.visionWardsBoughtInGame || 0,
                                    item0: part.item0, item1: part.item1, item2: part.item2, item3: part.item3, item4: part.item4, item5: part.item5, item6: part.item6, item7: (part.roleBoundItem || part.item7 || part.playerAugment1 || 0), spell1: part.summoner1Id, spell2: part.summoner2Id,
                                    mainRune: pMainRune, subRune: pSubRune
                                };
                            });
                            
                            const myMainRune = (p.perks && p.perks.styles && p.perks.styles[0]) ? p.perks.styles[0].style : null;
                            const mySubRune = (p.perks && p.perks.styles && p.perks.styles[1]) ? p.perks.styles[1].style : null;

                            return {
                                queueType, win: p.win, championName: p.championName, champLevel: p.champLevel, kills: p.kills, deaths: p.deaths, assists: p.assists, kda: kdaCalc, kp, spell1: p.summoner1Id, spell2: p.summoner2Id,
                                mainRune: myMainRune, subRune: mySubRune, item0: p.item0, item1: p.item1, item2: p.item2, item3: p.item3, item4: p.item4, item5: p.item5, item6: p.item6, item7: (p.roleBoundItem || p.item7 || p.playerAugment1 || 0),
                                totalCs, csPerMin, goldEarned: p.goldEarned, visionScore: p.visionScore, controlWards: p.visionWardsBoughtInGame, multiKill, firstBlood: p.firstBloodKill, durationMin, durationSec, dateStr, timestamp: detail.info.gameEndTimestamp, 
                                blueTeam: detail.info.participants.filter(x => x.teamId === 100).map(x => x.championName), 
                                redTeam: detail.info.participants.filter(x => x.teamId === 200).map(x => x.championName), 
                                participants: detailedParticipants
                            };
                        }).filter(Boolean);

                        if (history.length > 0) {
                            const finalData = {
                                puuid: targetPuuid,
                                version: typeof currentVersion !== 'undefined' ? currentVersion : "14.4.1",
                                profile: {
                                    name: `${gameName}#${tagLine}`,
                                    level: "정보없음", // API 장애 시 현재 정보는 파악 불가
                                    icon: `https://ddragon.leagueoflegends.com/cdn/${typeof currentVersion !== 'undefined' ? currentVersion : "14.4.1"}/img/profileicon/${profileIconId}.png`,
                                    tier: "서버 지연",
                                    rank: "",
                                    leaguePoints: 0
                                },
                                history: history,
                                isCachedFallback: true // ★ 프론트엔드 알림 띄우기용 꼬리표
                            };
                            console.log(`[API] 429 폴백 성공. DB에서 ${history.length}게임 반환`);
                            return res.json(finalData); // 에러 대신 정상 통신(200)으로 데이터 전송
                        }
                    }
                } catch (fallbackErr) {
                    console.error("[Fallback Error] 폴백 처리 중 오류:", fallbackErr);
                }
                
                // DB에도 데이터가 아예 없거나 폴백이 실패하면 최종적으로 429 에러 전송
                return res.status(429).json({ error: "조회 한도를 초과했습니다. 잠시 후 다시 시도해주세요." });
            }

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
        console.error('[Error] 로컬 통계 데이터 파일 읽기 실패:', error.message);
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