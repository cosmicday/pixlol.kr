// ==========================================
// [0] 전역 변수 및 챔피언, 툴팁 정보 캐싱
// ==========================================
let ddragonVersion = "16.5.1"; // 2026 시즌 최신 핫픽스 방어용 기본값
let allMatches = [];
let activeFilters = [];
let championIdMap = {};

let rateLimitUnlockTime = 0;
let toastTimer = null;

let fullRuneData = {};
let runePathMap = {};

// ★ 툴팁 데이터를 담을 전역 저장소
let globalItemMap = {};
let globalSpellMap = {};
let runeDataMap = {};

let arenaAugmentMap = {};

async function fetchArenaAugments() {
    try {
        const res = await fetch('/api/arena/augments');
        if (res.ok) arenaAugmentMap = await res.json();
    } catch (e) {
        console.error("아레나 증강체 데이터 로드 실패", e);
    }
}

// 증강체 아이콘 4~6개를 렌더링
function renderAugments(augments, size = 22) {
    if (!augments || augments.length === 0) return '';
    return augments.map(id => {
        const a = arenaAugmentMap[id];
        if (!a || !a.icon) {
            return `<div class="aug-icon empty" style="width:${size}px;height:${size}px;"></div>`;
        }
        return `<img src="${a.icon}" class="aug-icon" style="width:${size}px;height:${size}px;" data-tt-type="augment" data-tt-id="${id}">`;
    }).join('');
}

// 아레나: 참가자 18명을 "조 번호" 기준으로 6팀으로 묶고 등수 순으로 정렬
//   - 묶는 키는 subteam(조 번호). placement로 묶으면 등수가 0인 참가자가
//     자기 팀에서 떨어져 나가 그룹이 7개가 되거나 남의 팀에 끼어든다.
//   - 조의 등수는 조원 중 유효한 값 하나를 쓴다.
function groupArenaTeams(participantsArray) {
    const groups = {};
    (participantsArray || []).forEach(p => {
        const tid = Number(p.subteam) || 0;
        if (!groups[tid]) groups[tid] = { subteam: tid, placement: 0, members: [] };
        const pl = Number(p.placement) || 0;
        if (pl && !groups[tid].placement) groups[tid].placement = pl;
        groups[tid].members.push(p);
    });
    return Object.values(groups).sort((a, b) => (a.placement || 99) - (b.placement || 99));
}

// 아레나 등수 표기
function placementText(n) {
    if (!n) return '-';
    return n === 1 ? '우승' : `${n}위`;
}

function placementClass(n) {
    if (n === 1) return 'place-1';
    if (n === 2) return 'place-2';
    if (n === 3) return 'place-3';
    return 'place-low';
}

// ============================================================
// 스펠 아이콘
//   하드코딩 spellMap에 없는 ID(아레나 전용 스펠 등)를 만나면 예전에는
//   || "SummonerFlash" / || "SummonerDot" 으로 폴백해서 엉뚱한 아이콘을 그렸다.
//   ddragon summoner.json이 id -> 이미지이름을 이미 갖고 있으므로 그걸 먼저 쓰고,
//   그래도 모르는 ID면 거짓말 대신 빈 칸을 그린다.
// ============================================================
function spellIconUrl(id) {
    const name = (globalSpellMap[id] && globalSpellMap[id].img) || spellMap[id];
    if (!name) return null;
    return `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/spell/${name}.png`;
}

function spellImg(id) {
    const url = spellIconUrl(id);
    if (!url) return `<span class="spell-unknown" title="알 수 없는 스펠"></span>`;
    return `<img src="${url}" data-tt-type="spell" data-tt-id="${id}">`;
}
window.matchTimelineCache = {};   // ★ 추가
window.currentPuuid = null;       // ★ 추가

const statRuneMap = {
    5001: "perk-images/StatMods/StatModsHealthScalingIcon.png", 5002: "perk-images/StatMods/StatModsArmorIcon.png", 5003: "perk-images/StatMods/StatModsMagicResIcon.png",
    5005: "perk-images/StatMods/StatModsAttackSpeedIcon.png", 5007: "perk-images/StatMods/StatModsCDRScalingIcon.png", 5008: "perk-images/StatMods/StatModsAdaptiveForceIcon.png",
    5011: "perk-images/StatMods/StatModsHealthPlusIcon.png", 5013: "perk-images/StatMods/StatModsTenacityIcon.png", 5010: "perk-images/StatMods/StatModsMovementSpeedIcon.png"
};

const statRuneDataMap = {
    5001: { name: "체력", desc: "레벨에 비례해 체력이 증가합니다." },
    5002: { name: "방어력", desc: "방어력이 6 증가합니다." },
    5003: { name: "마법 저항력", desc: "마법 저항력이 8 증가합니다." },
    5005: { name: "공격 속도", desc: "공격 속도가 10% 증가합니다." },
    5007: { name: "스킬 가속", desc: "레벨에 비례해 스킬 가속이 증가합니다." },
    5008: { name: "적응형 능력치", desc: "적응형 능력치가 9 증가합니다." },
    5010: { name: "이동 속도", desc: "이동 속도가 2% 증가합니다." },
    5011: { name: "체력", desc: "체력이 65 증가합니다." },
    5013: { name: "강인함", desc: "강인함 및 둔화 저항이 10% 증가합니다." }
};

// ★ 라이엇 공식 텍스트 정규식 클리너
function cleanTooltipText(text) {
    if (!text) return "";
    let cleaned = text.replace(/<br\s*\/?>/gi, '\n');
    cleaned = cleaned.replace(/<li[^>]*>/gi, '\n- ');
    cleaned = cleaned.replace(/<[^>]+>/g, '');
    return cleaned.trim();
}

// ==========================================
// ★ 최신 데이터 드래곤 로드 로직
// ==========================================
async function initDdragonVersion() {
    try {
        const res = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
        const versions = await res.json();
        ddragonVersion = versions[0]; // 접속하자마자 무조건 제일 최신 패치 버전으로 동기화!
        console.log("최신 데이터 드래곤 적용 완료:", ddragonVersion);
    } catch (e) {
        console.warn('데이터 드래곤 버전 로드 실패, 기본값 사용');
    }
}

// 패치 버전 비교. a 가 더 새것이면 양수.
function compareDdragonVersion(a, b) {
    const pa = String(a).split('.').map(Number);
    const pb = String(b).split('.').map(Number);
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
        const x = pa[i] || 0, y = pb[i] || 0;
        if (x !== y) return x - y;
    }
    return 0;
}

async function fetchRuneMap() {
    if (Object.keys(fullRuneData).length > 0) return;
    try {
        const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/ko_KR/runesReforged.json`);
        const data = await res.json();
        data.forEach(tree => {
            fullRuneData[tree.id] = tree;
            runePathMap[tree.id] = tree.icon;
            tree.slots.forEach(slot => {
                slot.runes.forEach(rune => {
                    runePathMap[rune.id] = rune.icon;
                    runeDataMap[rune.id] = { name: rune.name, desc: cleanTooltipText(rune.longDesc || rune.shortDesc) };
                });
            });
        });
    } catch (e) { }
}

async function fetchItemData() {
    if (Object.keys(globalItemMap).length > 0) return;
    try {
        const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/ko_KR/item.json`);
        const data = await res.json();
        for (const key in data.data) {
            globalItemMap[key] = {
                name: data.data[key].name,
                desc: cleanTooltipText(data.data[key].description)
            };
        }
    } catch (e) { }
}

async function fetchSpellData() {
    if (Object.keys(globalSpellMap).length > 0) return;
    try {
        const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/ko_KR/summoner.json`);
        const data = await res.json();
        for (const key in data.data) {
            globalSpellMap[data.data[key].key] = { name: data.data[key].name, desc: cleanTooltipText(data.data[key].description), img: data.data[key].id };
        }
    } catch (e) { }
}

window.korChampMap = {};
async function fetchChampionMap() {
    if (Object.keys(championIdMap).length > 0) return;
    try {
        const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/ko_KR/champion.json`);
        const data = await res.json();
        for (let champName in data.data) {
            const champInfo = data.data[champName];
            championIdMap[champInfo.key] = champInfo.id;
            window.korChampMap[champInfo.id] = champInfo.name;
        }
    } catch (e) { }
}

const spellMap = { 1: "SummonerBoost", 3: "SummonerExhaust", 4: "SummonerFlash", 6: "SummonerHaste", 7: "SummonerHeal", 11: "SummonerSmite", 12: "SummonerTeleport", 13: "SummonerMana", 14: "SummonerDot", 21: "SummonerBarrier", 32: "SummonerSnowball" };

// ==========================================
// [1] 초기화 및 공통 유틸리티
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // 페이지 접속 시 가장 먼저 버전 업데이트 및 툴팁 정보 백그라운드 다운로드
    initDdragonVersion().then(() => {
        fetchChampionMap();
        fetchRuneMap();
        fetchItemData();
        fetchSpellData();
        fetchArenaAugments();
    });

    loadMythicShop();
    updateShopTimer();
    setInterval(updateShopTimer, 1000);

    // ★ 인게임 툴팁 UI 생성 및 이벤트 설정
    const customTooltip = document.createElement('div');
    customTooltip.id = 'info-tooltip';
    customTooltip.style.cssText = `
        position: absolute; background-color: rgba(0, 0, 0, 0.85); color: #ffffff;
        padding: 10px 14px; border-radius: 6px; font-size: 12px; line-height: 1.6;
        pointer-events: none; z-index: 10000; display: none; max-width: 260px;
        white-space: pre-wrap; box-shadow: 0 4px 10px rgba(0,0,0,0.5); text-align: left;
        border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(4px);
    `;
    document.body.appendChild(customTooltip);

    document.addEventListener('mouseover', (e) => {
        const target = e.target.closest('[data-tt-type]');
        if (!target) return;

        const type = target.getAttribute('data-tt-type');
        const id = target.getAttribute('data-tt-id');
        let data = null;

        // 커스텀 조건문 싹 빼고 100% 라이엇 API 원본 데이터만 매칭합니다!
        if (type === 'item' && globalItemMap[id]) data = globalItemMap[id];
        else if (type === 'spell' && globalSpellMap[id]) data = globalSpellMap[id];
        else if (type === 'rune') data = runeDataMap[id] || statRuneDataMap[id];
        else if (type === 'augment' && arenaAugmentMap[id]) data = arenaAugmentMap[id];

        if (data) {
            customTooltip.innerHTML = `<span style="color:#facc15; font-weight:bold; display:block; margin-bottom:4px; font-size:13px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 4px;">${data.name}</span>${data.desc}`;
            customTooltip.style.display = 'block';
            moveTooltip(e);
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (customTooltip.style.display === 'block') moveTooltip(e);
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('[data-tt-type]')) customTooltip.style.display = 'none';
    });

    function moveTooltip(e) {
        let x = e.pageX + 15;
        let y = e.pageY + 15;
        const rect = customTooltip.getBoundingClientRect();
        if (x + rect.width > window.innerWidth + window.scrollX) x = e.pageX - rect.width - 15;
        if (y + rect.height > window.innerHeight + window.scrollY) y = e.pageY - rect.height - 15;
        customTooltip.style.left = x + 'px';
        customTooltip.style.top = y + 'px';
    }

    const pathParts = window.location.pathname.split('/');
    const getQueryPage = () => {
        const params = new URLSearchParams(window.location.search);
        const pageParam = params.get('page');
        return pageParam ? parseInt(pageParam) : 1;
    };

    if (pathParts[1] && pathParts[1] !== '') {
        document.getElementById('search-section').style.display = "none";
    }

    if (pathParts[1] === 'summoner' && pathParts[2]) {
        document.getElementById('result-container').style.display = "block";
        document.getElementById('game-list').innerHTML = "<div style='text-align:center; padding:100px 0; min-height:100vh; color:#9aa4af;'>전적 데이터를 불러오는 중입니다...</div>";
        document.getElementById('summoner-input').value = decodeURIComponent(pathParts[2]);
        executeSearch();
    } else if (pathParts[1] === 'ranking') {
        document.getElementById('result-container').style.display = "block";
        document.getElementById('game-list').innerHTML = "<div style='text-align:center; padding:100px 0; min-height:100vh; color:#9aa4af;'>랭킹 데이터를 불러오는 중입니다...</div>";
        showRanking(getQueryPage());
    } else if (pathParts[1] === 'masters') {
        document.getElementById('masters-container').style.display = "block";
        document.getElementById('masters-container').innerHTML = "<div style='text-align:center; padding:100px 0; min-height:100vh; color:#9aa4af;'>장인 데이터를 불러오는 중입니다...</div>";
        const requestedChamp = pathParts[2] ? decodeURIComponent(pathParts[2]) : null;
        showMasters(requestedChamp);
        setActiveNav('nav-masters');
    } else if (pathParts[1] === 'stats') {
        document.getElementById('stats-container').style.display = "block";
        document.getElementById('stats-container').innerHTML = "<div style='text-align:center; padding:100px 0; min-height:100vh; color:#9aa4af;'>통계 데이터를 불러오는 중입니다...</div>";
        showStats();
        setActiveNav('nav-stats');
    } else if (pathParts[1] === 'privacy') {
        showPrivacyPolicy();
    } else if (pathParts[1] === 'terms') {
        showTerms();
    } else if (pathParts[1] === 'champions-classic') {
        const requestedChamp = pathParts[2] ? decodeURIComponent(pathParts[2]) : null;
        showChampions(requestedChamp, true);
        setActiveNav('nav-champions-classic');
    } else if (pathParts[1] === 'champions') {
        const requestedChamp = pathParts[2] ? decodeURIComponent(pathParts[2]) : null;
        showChampions(requestedChamp);
        setActiveNav('nav-champions');
    } else {
        document.getElementById('search-section').style.display = "flex";
    }
});

window.addEventListener('popstate', (event) => {
    const currentPath = window.location.pathname;

    if (currentPath.startsWith('/summoner/')) {
        document.getElementById('summoner-input').value = decodeURIComponent(currentPath.split('/')[2]);
        executeSearch();
        setActiveNav('nav-search');
    } else if (currentPath === '/ranking') {
        const params = new URLSearchParams(window.location.search);
        const targetPage = params.get('page') ? parseInt(params.get('page')) : 1;

        if (fullRankingData.length > 0) {
            hideAllContainers();
            document.getElementById('result-container').style.display = "block";

            const sidebarArea = document.getElementById('sidebar-area');
            const filterArea = document.getElementById('filter-area');
            const summaryArea = document.getElementById('summary-stats-area');
            if (sidebarArea) sidebarArea.style.display = "none";
            if (filterArea) filterArea.style.display = "none";
            if (summaryArea) summaryArea.style.display = "none";

            document.getElementById('user-profile').innerHTML = `
                <div class="stats-header">
                    <h1 class="ranking-title">
                        <img src="https://opgg-static.akamaized.net/images/medals_new/challenger.png" style="position: absolute; right: 100%; margin-right: 12px; top: 50%; transform: translateY(-50%); width: 60px; height: 60px;">
                        한국서버 솔로랭크 랭킹
                    </h1>
                    <p style="color: #9aa4af; margin-top: 10px; font-size: 14px;">약 10분마다 갱신됩니다.</p>
                </div>
            `;
            renderRankingPage(targetPage);
        } else {
            showRanking(targetPage);
        }
        setActiveNav('nav-ranking');
    } else if (currentPath === '/privacy') {
        showPrivacyPolicy();
    } else if (currentPath === '/terms') {
        showTerms();
    } else if (currentPath === '/stats') {
        showStats();
        setActiveNav('nav-stats');
    } else if (currentPath.startsWith('/champions-classic')) {
        // '/champions'보다 먼저 검사해야 한다. startsWith라 순서가 뒤바뀌면 이쪽으로 안 온다.
        const pathParts = currentPath.split('/');
        const champId = pathParts[2] ? decodeURIComponent(pathParts[2]) : null;
        showChampions(champId, true);
        setActiveNav('nav-champions-classic');
    } else if (currentPath.startsWith('/champions')) {
        const pathParts = currentPath.split('/');
        const champId = pathParts[2] ? decodeURIComponent(pathParts[2]) : null;
        showChampions(champId);
        setActiveNav('nav-champions');
    } else if (currentPath.startsWith('/masters')) {
        const pathParts = currentPath.split('/');
        const champId = pathParts[2] ? decodeURIComponent(pathParts[2]) : null;
        const existingGrid = document.getElementById('masters-champ-grid');

        if (existingGrid && existingGrid.innerHTML.trim() !== '') {
            const items = existingGrid.querySelectorAll('.champ-grid-item');
            let targetItem = Array.from(items).find(i => i.dataset.id.toLowerCase() === (champId ? champId.toLowerCase() : items[0].dataset.id.toLowerCase()));

            if (targetItem) {
                hideAllContainers();
                document.getElementById('masters-container').style.display = "block";
                items.forEach(i => i.classList.remove('active'));
                targetItem.classList.add('active');
                renderMasterRanking(targetItem.dataset.name, targetItem.dataset.id);
            } else {
                showMasters(champId);
            }
        } else {
            showMasters(champId);
        }
        setActiveNav('nav-masters');
    } else {
        goLobby();
    }
});

function showErrorToast(message) {
    const toast = document.getElementById('error-toast');
    if (message) toast.innerText = message;
    toast.classList.add('toast-show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('toast-show'), 3000);
}

function triggerShake() {
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        searchBox.classList.remove('error-shake');
        void searchBox.offsetWidth;
        searchBox.classList.add('error-shake');
    }
}

function clearSearchError() {
    const errorMsg = document.getElementById('search-error-msg');
    if (errorMsg) errorMsg.style.display = 'none';
    const searchBox = document.querySelector('.search-box');
    if (searchBox) searchBox.classList.remove('error-shake');
}

// ============================================================
// 미완성 페이지 비공개 처리
//   통계 / 장인랭킹은 statsData.js · mastersData.js의 하드코딩 데이터를 쓴다.
//   실제 집계가 아니라서 프로덕션 키 심사 동안 노출하지 않는다.
//
//   되살릴 때:
//     1) 아래 값을 false로
//     2) index.html의 nav 주석(통계 · 장인랭킹) 해제
//   페이지 코드와 데이터 파일은 그대로 두었으므로 두 군데만 고치면 복구된다.
// ============================================================
const HIDE_UNFINISHED_PAGES = true;

// ============================================================
// LoL 클래식 챔피언
//   클래식 모드가 생기면서 Data Dragon이 챔피언을 두 벌로 준다.
//     정규 : Garen      (key 86)
//     클래식: Jade_Garen (key 60086)
//   정규 챔피언 ID에는 언더스코어가 없으므로(MonkeyKing, DrMundo, TahmKench)
//   '_' 포함 여부로 가른다. 라이엇이 다른 접두사를 붙여도 자동으로 걸러진다.
// ============================================================
function isClassicChamp(id) {
    return typeof id === 'string' && id.includes('_');
}

// 챔피언 페이지가 정규/클래식 중 어느 모드로 열려 있는지
// (selectChampion이 주소를 만들 때 필요)
let currentChampMode = 'normal';

function setActiveNav(navId) {
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    const activeItem = document.getElementById(navId);
    if (activeItem) activeItem.classList.add('active');
}

function hideAllContainers() {
    document.querySelectorAll('.page-container').forEach(container => {
        container.style.display = "none";
    });

    clearSearchError();
    if (window.refreshTimerInterval) clearInterval(window.refreshTimerInterval);
}

function goLobby() {
    if (window.location.pathname !== '/') window.history.pushState(null, '', '/');
    hideAllContainers();
    document.getElementById('search-section').style.display = "flex";
    document.getElementById('summoner-input').value = "";
    hideAutocomplete();
    setActiveNav('nav-search');
}

// ==========================================
// [2] 전적 검색 및 모스트 챔피언
// ==========================================
document.getElementById('search-btn').addEventListener('click', executeSearch);
document.getElementById('summoner-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') executeSearch();
});
document.getElementById('summoner-input').addEventListener('input', clearSearchError);

async function executeSearch() {
    const inputName = document.getElementById('summoner-input').value.trim();
    const errorMsgDiv = document.getElementById('search-error-msg');

    clearSearchError();

    hideAutocomplete();

    if (!inputName) {
        if (errorMsgDiv) {
            errorMsgDiv.innerHTML = "소환사명을 입력해 주세요.";
            errorMsgDiv.style.display = 'block';
        }
        triggerShake();
        return;
    }

    // 태그 없이 닉네임만 입력한 경우 → 같은 닉네임의 태그 후보 목록 표시
    if (!inputName.includes('#')) {
        await showCandidates(inputName);
        return;
    }

    hideAllContainers();
    document.getElementById('result-container').style.display = "block";
    document.getElementById('user-profile').innerHTML = "";
    const sidebarArea = document.getElementById('sidebar-area');
    if (sidebarArea) sidebarArea.style.display = "none";
    const filterArea = document.getElementById('filter-area');
    if (filterArea) filterArea.style.display = "none";
    const summaryArea = document.getElementById('summary-stats-area');
    if (summaryArea) summaryArea.style.display = "none";
    document.getElementById('game-list').innerHTML = "<div style='text-align:center; padding:100px 0; min-height:100vh; color:#9aa4af;'>전적 데이터를 불러오는 중입니다...</div>";

    try {
        const response = await fetch(`/api/summoner/${encodeURIComponent(inputName)}`);

        if (response.status === 429) {
            showErrorToast("서버 요청이 많아 지연되고 있습니다.\n잠시 후 다시 시도해주세요.");
            return;
        }

        if (response.status === 404) {
            showErrorToast("해당 유저를 찾을 수 없습니다.\n정확한 닉네임과 태그로 검색해 주세요.");
            return;
        }

        if (!response.ok) throw new Error("서버 통신 중 오류가 발생했습니다.");

        const data = await response.json();

        if (data.error) throw new Error(data.error);

        if (data.isCachedFallback) {
            showErrorToast("서버 지연으로 최근 저장된 과거 데이터를 표시합니다.\n잠시 후 다시 갱신해주세요.");
        }

        addRecentSearch(data.profile.name);

        // ★ 서버가 주는 version 은 서버가 부팅할 때 받아 둔 값이라 클라이언트가 이미
        //   맞춰 둔 최신보다 오래된 경우가 있다 (갱신 실패 시 server.js 기본값 16.1.1).
        //   그대로 덮어쓰면 챔피언 탭이 구버전 champion.json 을 읽어서
        //   신규 챔피언이 목록에서 통째로 사라진다. 로크가 정확히 이 경우였다.
        //   (16.1.1 / 16.5.1 = 172명, 로크 없음 / 16.15.1 = 로크 있음)
        //   그래서 "더 새 것일 때만" 받아들인다.
        if (data.version && compareDdragonVersion(data.version, ddragonVersion) > 0) {
            ddragonVersion = data.version;
        }
        window.currentPuuid = data.puuid || null;    // ★ 추가
        allMatches = data.history || [];
        // 새 소환사를 검색하면 챔피언 필터는 초기화 (큐 필터는 유지)
        activeChampFilter = null;
        updateChampFilterBtn();

        window.champDetailCache = window.champDetailCache || {};
        const uniqueChamps = [...new Set(allMatches.map(m => m.championName))];
        await Promise.all(uniqueChamps.map(async champName => {
            if (!window.champDetailCache[champName]) {
                try {
                    const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/ko_KR/champion/${champName}.json`);
                    const detailData = await res.json();
                    window.champDetailCache[champName] = detailData.data[champName].spells.map(s => ({ img: s.image.full, max: s.maxrank }));
                } catch (e) { }
            }
        }));

        await fetchChampionMap();
        await fetchRuneMap();
        await fetchItemData();
        await fetchSpellData();

        activeFilters = [];

        hideAllContainers();
        document.getElementById('result-container').style.display = "block";
        const sidebar = document.getElementById('sidebar-area');
        if (sidebar) sidebar.style.display = "flex";

        window.scrollTo(0, 0);

        document.getElementById('user-profile').innerHTML = `
            <div class="profile-header">
                <img src="${data.profile.icon}" class="profile-icon">
                <div class="profile-info">
                    <div class="profile-level">레벨 ${data.profile.level}</div>
                    <h2 class="profile-name">${data.profile.name}</h2>
                    <div id="profile-fav-wrap"></div>
                </div>
                <div class="profile-actions">
                    <button id="refresh-btn" class="search-btn profile-action-btn">전적 갱신</button>
                    <button id="live-btn" class="profile-action-btn live-btn" onclick="toggleLiveGamePanel()" disabled>인게임 정보</button>
                </div>
            </div>
            <div id="live-game-area"></div>
        `;

        const rawTier = data.profile.tier || "Unranked";
        const rawRank = data.profile.rank || "";
        const safeTier = rawTier.split(' ')[0].toLowerCase();

        // ★ 점수와 승패 데이터 변수 할당
        const lp = data.profile.leaguePoints || 0;
        const wins = data.profile.wins || 0;
        const losses = data.profile.losses || 0;
        const totalGames = wins + losses;

        let displayRank = rawRank;
        if (["MASTER", "GRANDMASTER", "CHALLENGER"].includes(rawTier.toUpperCase())) displayRank = "";

        // ★ 1. 티어 텍스트 옆에 LP 합치기 (Unranked가 아닐 때만)
        let finalTierText = `${rawTier} ${displayRank}`.trim();
        if (safeTier !== 'unranked') {
            finalTierText += ` <span style="font-size: 14px; font-weight: normal; color: #ffffff;">${lp} LP</span>`;
        }

        // ★ 2. 승패 및 승률 계산 (소수점 2자리 고정)
        let winRateHtml = '';
        if (totalGames > 0) {
            const winRate = ((wins / totalGames) * 100).toFixed(2);
            const wrColor = winRate >= 50.00 ? '#5383e8' : '#e84057';
            winRateHtml = `<div style="font-size: 12px; color: #ffffff; margin-top: 4px;">
                ${wins}W ${losses}L <span style="color: ${wrColor}; margin-left: 5px;">${winRate}%</span>
            </div>`;
        }

        let sidebarHtml = `
            <div class="pix-box pix-tier-box">
                <div class="pix-tier-icon">
                    <img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-${safeTier}.png" 
                         class="${safeTier === 'unranked' ? 'unranked-icon' : ''}" 
                         onerror="this.src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/images/unranked.png'; this.className='unranked-icon'; this.onerror=null;">
                </div>
                <div class="pix-tier-info">
                    <h3>솔로랭크</h3>
                    <div class="tier-rank">${finalTierText}</div>
                    ${winRateHtml}
                </div>
            </div>
        `;

        const userPuuid = data.puuid || (data.profile && data.profile.puuid);
        if (userPuuid) {
            try {
                const masteryRes = await fetch(`/api/mastery/${userPuuid}`);
                if (masteryRes.ok) {
                    const masteryData = await masteryRes.json();
                    sidebarHtml += `
                        <div class="pix-box" style="padding: 20px;">
                            <h3 style="color: #fff; font-size: 14px; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.05);">숙련도 TOP 7</h3>
                            <div style="display: flex; flex-direction: column; gap: 12px;">`;

                    masteryData.forEach((mastery, index) => {
                        const champEngName = championIdMap[mastery.championId] || '0';
                        sidebarHtml += `
                            <div style="display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.02); padding: 8px 12px; border-radius: 8px; transition: background 0.2s;">
                                <div style="font-size: 12px; color: #777; width: 12px; text-align: center; font-weight: bold;">${index + 1}</div>
                                <img src="https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${champEngName}.png" 
                                     style="width: 36px; height: 36px; border-radius: 4px; object-fit: cover; border: 2px solid #8b5cf6;" 
                                     onerror="this.src='https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/profileicon/0.png'">
                                <div style="flex: 1;">
                                        <div style="color: #ddd; font-weight: bold; font-size: 13px;">Lv. ${mastery.championLevel}</div>
                                        <div style="color: #9aa4af; font-size: 11px;">${mastery.championPoints.toLocaleString()} pts</div>
                                    </div>
                                </div>
                            `;
                    });
                    sidebarHtml += `</div></div>`;
                }
            } catch (e) { }
        }

        sidebar.innerHTML = sidebarHtml;
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));

        renderMatches(allMatches);
        window.matchOffset = allMatches.length;
        renderLoadMore(allMatches.length >= 20);

        const allBtn = document.querySelector('.filter-btn');
        if (allBtn) toggleFilter(allBtn, '전체');

        const refreshBtn = document.getElementById('refresh-btn');
        let expireAt = data.expireAt;
        if (data.isCachedFallback) expireAt = Date.now() + 120 * 1000;

        refreshBtn.addEventListener('click', executeSearch);

        function updateRefreshTimer() {
            if (!expireAt) return;
            const diff = expireAt - Date.now();
            if (diff <= 0) {
                refreshBtn.disabled = false;
                refreshBtn.style.background = "#6b3f8e";
                refreshBtn.style.cursor = "pointer";
                refreshBtn.innerText = "전적 갱신";
                if (window.refreshTimerInterval) clearInterval(window.refreshTimerInterval);
            } else {
                refreshBtn.disabled = true;
                refreshBtn.style.background = "#444";
                refreshBtn.style.cursor = "not-allowed";
                const mins = Math.floor(diff / 1000 / 60);
                const secs = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
                refreshBtn.innerText = `갱신: ${mins}분 ${secs}초`;
            }
        }
        updateRefreshTimer();
        if (window.refreshTimerInterval) clearInterval(window.refreshTimerInterval);
        window.refreshTimerInterval = setInterval(updateRefreshTimer, 1000);

        currentProfileName = data.profile.name;
        renderProfileFavBtn();

        checkLiveGame(data.puuid || (data.profile && data.profile.puuid));

        const newUrl = `/summoner/${encodeURIComponent(inputName)}`;
        if (window.location.pathname !== newUrl) {
            window.history.pushState({ summoner: inputName }, '', newUrl);
        }

    } catch (e) {
        console.error("전적 화면 렌더링 에러:", e);
        showErrorToast("서버 요청이 많아 지연되고 있습니다.\n잠시 후 다시 시도해주세요.");
    }
}

// 스킬 빌드 표 생성
function buildSkillTableHtml(game, myTimeline) {
    if (!myTimeline?.skills?.length) return '';

    const maxLevel = Math.max(15, myTimeline.skills.length);
    const spellInfos = window.champDetailCache?.[game.championName] || [];
    let counts = { 1: 0, 2: 0, 3: 0, 4: 0 };

    let html = `<div class="skill-table-wrapper"><table class="skill-table"><thead><tr><th class="skill-icon-cell"></th>`;
    for (let i = 1; i <= maxLevel; i++) html += `<th>${i}</th>`;
    html += `</tr></thead><tbody>`;

    [1, 2, 3, 4].forEach(slot => {
        counts[slot] = 0;
        const spell = spellInfos[slot - 1];
        const sImg = spell ? (typeof spell === 'string' ? spell : spell.img) : null;
        const sMax = spell && spell.max ? spell.max : (slot === 4 ? 3 : 5);
        const letter = ['Q', 'W', 'E', 'R'][slot - 1];

        let rowHtml = `<tr><td class="skill-icon-cell">${sImg ? `<img src="https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/spell/${sImg}" title="${letter}">` : `<b style="color:#fff;">${letter}</b>`}</td>`;

        for (let i = 0; i < maxLevel; i++) {
            if (myTimeline.skills[i] === slot) {
                counts[slot]++;
                const isMastered = counts[slot] === sMax;
                const tdStyle = isMastered ? ` style="box-shadow: inset 0 0 0 2px currentColor;"` : ``;
                rowHtml += `<td class="skill-active-${slot}"${tdStyle}>${counts[slot]}</td>`;
            } else {
                rowHtml += `<td></td>`;
            }
        }
        html += rowHtml + `</tr>`;
    });
    return html + `</tbody></table></div>`;
}

// 아이템 빌드 순서 생성
function buildItemOrderHtml(myTimeline) {
    if (!myTimeline?.items?.length) return '';

    let groupedItems = [];
    let currentGroup = [];

    myTimeline.items.forEach((item) => {
        if (currentGroup.length === 0) currentGroup.push(item);
        else {
            const lastItem = currentGroup[currentGroup.length - 1];
            if (item.ts - lastItem.ts <= 20000) currentGroup.push(item);
            else { groupedItems.push(currentGroup); currentGroup = [item]; }
        }
    });
    if (currentGroup.length > 0) groupedItems.push(currentGroup);

    let html = `<div class="build-items">`;
    html += groupedItems.map((grp) => {
        const firstTs = grp[0].ts;
        const mins = String(Math.floor(firstTs / 60000)).padStart(2, '0');
        const secs = String(Math.floor((firstTs % 60000) / 1000)).padStart(2, '0');
        let grpHtml = `<div class="item-group-col"><div class="item-row">`;
        grp.forEach(item => {
            grpHtml += `<img src="https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/item/${item.id}.png" data-tt-type="item" data-tt-id="${item.id}">`;
        });
        return grpHtml + `</div><div class="build-item-time">${mins}:${secs}</div></div>`;
    }).join('<div class="build-item-arrow">▶</div>');
    return html + `</div>`;
}

// 타임라인 확보 (캐시 우선, 없으면 서버 요청)
async function ensureTimeline(matchId) {
    const cached = window.matchTimelineCache[matchId];
    if (cached?.loaded) return cached;

    try {
        const puuidParam = window.currentPuuid ? `?puuid=${window.currentPuuid}` : '';
        const res = await fetch(`/api/timeline/${matchId}${puuidParam}`);
        if (!res.ok) throw new Error('timeline fetch failed');
        const data = await res.json();
        window.matchTimelineCache[matchId] = { ...data, loaded: true };
        return window.matchTimelineCache[matchId];
    } catch (e) {
        window.matchTimelineCache[matchId] = { goldFrames: null, myTimeline: null, loaded: true };
        return window.matchTimelineCache[matchId];
    }
}

function renderMatches(matches, append = false) {
    const listDiv = document.getElementById('game-list');
    const filterArea = document.getElementById('filter-area');
    if (filterArea) filterArea.style.display = "flex";
    if (!append) listDiv.innerHTML = "";

    if (!append && (!matches || matches.length === 0)) {
        listDiv.innerHTML = `<div style="text-align: center; padding: 60px 0; color: #9aa4af; line-height: 1.6;">전적 데이터가 없습니다.<br><span style="font-size: 12px; color: #777;">(최근 20게임 기준)</span></div>`;
        return;
    }

    const champNameExceptions = { "FiddleSticks": "Fiddlesticks" };

    matches.forEach(game => {
        if (!game.participants || game.participants.length === 0) return;
        if (champNameExceptions[game.championName]) game.championName = champNameExceptions[game.championName];

        const isArena = !!game.isArena;
        const isAram = !!game.isAram;
        const isRemake = !isArena && (game.isRemake === true || game.durationMin < 4);

        // 아레나는 승/패가 아니라 등수로 색을 정한다 (1위 금색 / 2~3위 상위권 / 4~6위 하위권)
        const myPlacement = isArena ? (Number(game.placement) || 0) : 0;
        let resultClass, winText, queueColor;

        if (isArena) {
            if (myPlacement === 1) { resultClass = 'win arena-first'; queueColor = '#facc15'; }
            else if (myPlacement >= 2 && myPlacement <= 3) { resultClass = 'win'; queueColor = '#5383e8'; }
            else { resultClass = 'lose'; queueColor = '#e84057'; }
            winText = placementText(myPlacement);
        } else if (isRemake) {
            resultClass = 'remake'; winText = '다시하기'; queueColor = '#7b7a8e';
        } else {
            resultClass = game.win ? 'win' : 'lose';
            winText = game.win ? '승리' : '패배';
            queueColor = game.win ? '#5383e8' : '#e84057';
        }

        let exactDateText = '상세 시간 정보 없음';
        let displayDate = game.dateStr;

        if (game.timestamp) {
            const now = Date.now();
            const timeDiff = now - game.timestamp;
            const diffMinutes = Math.floor(timeDiff / (1000 * 60));
            const diffHours = Math.floor(timeDiff / (1000 * 60 * 60));
            const diffDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

            // 화면을 그리는 시점(Date.now())이 기준. 30일이 넘으면 전부 "1개월 전"으로
            // 뭉개지던 것을 개월/년까지 단계화했다.
            if (diffHours < 1) displayDate = diffMinutes <= 0 ? "방금 전" : `${diffMinutes}분 전`;
            else if (diffHours < 24) displayDate = `${diffHours}시간 전`;
            else if (diffDays < 30) displayDate = `${diffDays}일 전`;
            else if (diffDays < 365) displayDate = `${Math.max(1, Math.round(diffDays / 30.44))}개월 전`;
            else displayDate = `${Math.floor(diffDays / 365)}년 전`;

            const durationMs = (game.durationMin * 60 + game.durationSec) * 1000;
            const startTime = new Date(game.timestamp - durationMs);
            const endTime = new Date(game.timestamp);

            const formatCustomDate = (date) => {
                const y = date.getFullYear(), m = String(date.getMonth() + 1).padStart(2, '0'), d = String(date.getDate()).padStart(2, '0');
                let h = date.getHours(); const ampm = h >= 12 ? '오후' : '오전'; h = h % 12 || 12;
                const hh = String(h).padStart(2, '0'), mm = String(date.getMinutes()).padStart(2, '0'), ss = String(date.getSeconds()).padStart(2, '0');
                return `${y}.${m}.${d} ${ampm} ${hh}:${mm}:${ss}`;
            };
            exactDateText = `${formatCustomDate(startTime)}\n~ ${formatCustomDate(endTime)}`;
        }

        const runeMap = { 8000: '7201_Precision', 8100: '7200_Domination', 8200: '7202_Sorcery', 8300: '7203_Whimsy', 8400: '7204_Resolve' };
        const mainRuneImg = `https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/${runeMap[game.mainRune] || '7200_Domination'}.png`;
        const subRuneImg = `https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/${runeMap[game.subRune] || '7204_Resolve'}.png`;

        let itemsHtml = `<div class="pix-items">`;

        [0, 1, 2, 6].forEach(i => {
            const id = game[`item${i}`];
            const tClass = (i === 6) ? " trinket" : "";
            itemsHtml += id ? `<img src="https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/item/${id}.png" class="${tClass.trim()}" data-tt-type="item" data-tt-id="${id}">` : `<div class="empty${tClass}"></div>`;
        });

        [3, 4, 5].forEach(i => {
            const id = game[`item${i}`];
            itemsHtml += id ? `<img src="https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/item/${id}.png" data-tt-type="item" data-tt-id="${id}">` : `<div class="empty"></div>`;
        });

        const item7 = game[`item7`];
        if (item7) {
            itemsHtml += `<img src="https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/item/${item7}.png" style="width: 22px; height: 22px; border-radius: 3px;" data-tt-type="item" data-tt-id="${item7}">`;
        } else {
            itemsHtml += `<div class="empty"></div>`;
        }

        itemsHtml += `</div>`;

        const badgeHtml = buildBadges(game, isArena, isAram);

        const renderTeamList = (participantsArray, targetTeamId) => {
            return participantsArray.filter(p => p.teamId === targetTeamId).map(p => {
                const shortName = p.summonerName.split('#')[0];
                const isMeStyle = p.isSearchedUser ? "font-weight: bold; color: #fff;" : "";
                return `
                    <div class="pix-player" onclick="document.getElementById('summoner-input').value='${p.summonerName}'; document.getElementById('search-btn').click();" style="cursor:pointer;" title="${p.summonerName} 검색">
                        <img src="https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${p.championName}.png" alt="${p.championName}">
                        <span style="${isMeStyle}">${shortName}</span>
                    </div>
                `;
            }).join('');
        };

        // 아레나 미리보기: 1~3위는 왼쪽 열, 4~6위는 오른쪽 열 (일반 게임의 블루/레드팀과 같은 폭)
        const renderArenaTeams = (participantsArray) => {
            const teams = groupArenaTeams(participantsArray);

            const renderCol = (list) => `
                <div class="arena-col">
                    ${list.map(t => {
                        const mine = t.members.some(m => m.isSearchedUser);
                        return `
                        <div class="arena-team ${mine ? 'mine' : ''}" title="${t.placement ? placementText(t.placement) : '등수 없음'}">
                            <span class="arena-team-rank ${placementClass(t.placement)}">${t.placement || '-'}</span>
                            ${t.members.map(p => `
                                <img src="https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${p.championName}.png"
                                     class="${p.isSearchedUser ? 'me' : ''}"
                                     title="${p.summonerName}"
                                     onclick="document.getElementById('summoner-input').value='${p.summonerName}'; document.getElementById('search-btn').click();">
                            `).join('')}
                        </div>`;
                    }).join('')}
                </div>`;

            return renderCol(teams.slice(0, 3)) + renderCol(teams.slice(3, 6));
        };

        const me = game.participants.find(p => p.isSearchedUser);
        if (!me) return;
        const supportItems = [3869, 3870, 3871, 3873, 3874, 3875, 3876, 3877];
        const isSupport = [me.item0, me.item1, me.item2, me.item3, me.item4, me.item5, me.item6].some(id => supportItems.includes(id));

        let statsHtml = '';
        if (isArena) {
            const totalMins = game.durationMin + (game.durationSec / 60);
            const dpm = totalMins > 0 ? Math.round(me.damage / totalMins) : 0;
            statsHtml = `
                <div class="kp">골드 ${me.gold.toLocaleString()}</div>
                <div>DPM ${dpm.toLocaleString()}</div>
            `;
        } else if (isSupport) {
            statsHtml = `
                <div class="kp">킬관여 ${game.kp}%</div>
                <div style="display: flex; align-items: center; justify-content: flex-start; gap: 3px;">
                    <img src="https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/item/2055.png" style="width: 12px; height: 12px; border-radius: 50%; transform: translateY(1.5px);">
                    <span style="color: #fff; font-weight: bold;">${me.visionWards}</span>
                    <span style="font-size: 11px; margin-left: 2px; cursor: help;" data-tooltip="와드 설치 / 와드 파괴">(+${me.wardsPlaced}/-${me.wardsKilled})</span>
                </div>
                <div>시야점수 ${me.visionScore}</div>
            `;
        } else {
            const totalMins = game.durationMin + (game.durationSec / 60);
            const dpm = totalMins > 0 ? Math.round(me.damage / totalMins) : 0;
            statsHtml = `
                <div class="kp">킬관여 ${game.kp}%</div>
                <div>CS ${me.cs} <span style="font-size:11px;">(${game.csPerMin})</span></div>
                <div>DPM ${dpm.toLocaleString()}</div>
            `;
        }

        const wrapper = document.createElement('div');
        wrapper.className = 'match-wrapper';
        wrapper.dataset.queue = game.queueType;                    // 표시용 라벨
        wrapper.dataset.group = game.queueGroup || '기타';          // 필터용 그룹
        wrapper.dataset.champ = game.championName || '';            // 챔피언 필터용

        const summary = document.createElement('div');
        summary.className = `pix-game ${resultClass}`;

        summary.innerHTML = `
            <div class="pix-info">
                <div class="queue" style="color: ${queueColor};">${game.queueType}</div>
                <div data-tooltip="${exactDateText}" style="cursor: help; width: fit-content;">${displayDate}</div>
                <div class="bar"></div>
                <div class="win-text">${winText}</div>
                <div>${game.durationMin}분 ${game.durationSec}초</div>
            </div>
            <div class="pix-champ ${isArena ? 'arena' : ''}">
                <div class="pix-champ-icon">
                    <img src="https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${game.championName}.png">
                    <div class="pix-level">${game.champLevel}</div>
                    ${badgeHtml} 
                </div>
                ${isArena
                ? `<div class="pix-augments">${renderAugments(game.augments, 22)}</div>`
                : `<div class="pix-spells">
                    ${spellImg(game.spell1)}
                    ${spellImg(game.spell2)}
                </div>
                <div class="pix-spells">
                    <img src="${mainRuneImg}" onerror="this.src='https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7200_Domination.png'" data-tt-type="rune" data-tt-id="${game.mainRune}">
                    <img src="${subRuneImg}" style="width:22px; height:22px; border-radius:50%; background:#202d37; padding:2px;" data-tt-type="rune" data-tt-id="${game.subRune}">
                </div>`}
            </div>
            <div class="pix-kda">
                <div class="pix-kda-score">${game.kills} / <span class="d">${game.deaths}</span> / ${game.assists}</div>
                <div class="pix-kda-ratio">평점 ${game.kda}</div>
            </div>
            <div class="pix-stats">
                ${statsHtml}
            </div>
            <div class="pix-items-box">
                ${itemsHtml} 
            </div>
            ${isArena
                ? `<div class="pix-players arena-players">${renderArenaTeams(game.participants)}</div>`
                : `<div class="pix-players">
                <div class="pix-team">${renderTeamList(game.participants, 100)}</div>
                <div class="pix-team">${renderTeamList(game.participants, 200)}</div>
            </div>`}
            <button class="toggle-btn" onclick="
                const wrapper = this.closest('.match-wrapper');
                if (!wrapper.classList.contains('open')) {
                    const firstTab = wrapper.querySelector('.detail-tab-btn');
                    if (firstTab) firstTab.click();
                }
                wrapper.classList.toggle('open');
            ">
                <svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
            </button>
        `;

        const maxDamage = Math.max(...game.participants.map(p => p.damage));
        const maxDamageTaken = Math.max(...game.participants.map(p => p.damageTaken));

        const blueWon = game.participants.find(p => p.teamId === 100)?.win;
        const redWon = game.participants.find(p => p.teamId === 200)?.win;
        const blueHeaderClass = blueWon ? 'team-blue-header' : 'team-red-header';
        const blueBodyClass = blueWon ? 'team-blue' : 'team-red';
        const redHeaderClass = redWon ? 'team-blue-header' : 'team-red-header';
        const redBodyClass = redWon ? 'team-blue' : 'team-red';

        const renderDetailRow = (p) => {
            const pMainRune = `https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/${runeMap[p.mainRune] || '7200_Domination'}.png`;
            const pSubRune = `https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/${runeMap[p.subRune] || '7204_Resolve'}.png`;

            let pItems = `<div class="detail-items" style="display:flex; flex-direction:column; gap:1px; align-items:center;">
                            <div style="display:flex; gap:1px;">`;
            [0, 1, 2, 6].forEach(i => {
                const id = p[`item${i}`];
                const tClass = (i === 6) ? " trinket" : "";
                pItems += id ? `<img src="https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/item/${id}.png" class="${tClass.trim()}" style="width:20px; height:20px; border-radius:3px;" data-tt-type="item" data-tt-id="${id}">` : `<div class="empty${tClass}" style="width:20px; height:20px; background:rgba(0,0,0,0.3); border-radius:3px;"></div>`;
            });
            pItems += `</div><div style="display:flex; gap:1px;">`;
            [3, 4, 5].forEach(i => {
                const id = p[`item${i}`];
                pItems += id ? `<img src="https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/item/${id}.png" style="width:20px; height:20px; border-radius:3px;" data-tt-type="item" data-tt-id="${id}">` : `<div class="empty" style="width:20px; height:20px; background:rgba(0,0,0,0.3); border-radius:3px;"></div>`;
            });

            const pItem7 = p.item7;
            if (pItem7) {
                pItems += `<img src="https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/item/${pItem7}.png" style="width: 20px; height: 20px; border-radius: 3px;" data-tt-type="item" data-tt-id="${pItem7}">`;
            } else {
                pItems += `<div class="empty" style="width:20px; height:20px; background:rgba(0,0,0,0.3); border-radius:3px;"></div>`;
            }

            pItems += `</div></div>`;

            const dmgPercent = maxDamage > 0 ? (p.damage / maxDamage) * 100 : 0;
            const dmgTakenPercent = maxDamageTaken > 0 ? (p.damageTaken / maxDamageTaken) * 100 : 0;
            const kdaRatio = p.deaths === 0 ? "Perfect" : ((p.kills + p.assists) / p.deaths).toFixed(2);
            const isMeStyle = p.isSearchedUser ? 'background: rgba(255,255,255,0.08); font-weight: bold;' : '';
            const kpColor = '#9aa4af';

            const totalMins = game.durationMin + (game.durationSec / 60);
            const pCsPerMin = totalMins > 0 ? (p.cs / totalMins).toFixed(1) : "0.0";

            return `
                <tr style="${isMeStyle}">
                    <td class="detail-champ-col">
                        <div class="champ-name-wrapper">
                            <img src="https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${p.championName}.png">
                            <div class="detail-summoner" onclick="document.getElementById('summoner-input').value='${p.summonerName}'; document.getElementById('search-btn').click();" title="${p.summonerName}">${p.summonerName}</div>
                        </div>
                    </td>
                    <td class="detail-spell-rune-col">
                        <div class="spell-rune-wrapper">
                            <div class="detail-spells">
                                ${spellImg(p.spell1)}
                                ${spellImg(p.spell2)}
                            </div>
                            <div class="detail-runes">
                                <img src="${pMainRune}" onerror="this.src='https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7200_Domination.png'">
                                <img src="${pSubRune}" class="sub">
                            </div>
                        </div>
                    </td>
                    <td style="color: #fff; font-size: 11px; font-weight: bold;">${p.champLevel || '-'}</td>
                    <td>
                        <div class="detail-kda">${p.kills} / <span class="d">${p.deaths}</span> / ${p.assists}</div>
                        <div style="color: #9aa4af; font-size: 11px;">(${kdaRatio})</div>
                    </td>
                    <td style="color: ${kpColor}; font-weight: bold; font-size: 11px;">${p.kp}%</td>
                    <td>${pItems}</td>
                    <td style="color: #9aa4af;">
                        <div style="color: #ddd;">${p.cs} <span style="font-size: 11px; color: #9aa4af;">(${pCsPerMin})</span></div>
                        <div style="font-size: 11px; margin-top: 2px;">${p.gold.toLocaleString()} G</div>
                    </td>
                    <td>
                        <div style="color: #fff;">${p.damage.toLocaleString()}</div>
                        <div class="damage-bar-container"><div class="damage-bar" style="width: ${dmgPercent}%;"></div></div>
                    </td>
                    <td>
                        <div style="color: #fff;">${p.damageTaken.toLocaleString()}</div>
                        <div class="damage-bar-container"><div class="damage-bar taken" style="width: ${dmgTakenPercent}%;"></div></div>
                    </td>
                    <td style="color: #9aa4af; cursor: help;" data-tooltip="시야 점수: ${p.visionScore || 0}">
                        <div style="display: flex; align-items: center; justify-content: center; gap: 3px;">
                            <img src="https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/item/2055.png" style="width: 12px; height: 12px; border-radius: 50%; transform: translateY(1.5px);">
                            <span style="color: #fff;">${p.visionWards}</span>
                        </div>
                        <div style="font-size: 11px; margin-top: 2px;">+${p.wardsPlaced} / -${p.wardsKilled}</div>
                    </td>
                </tr>
            `;
        };

        // 아레나 상세: 등수별로 묶은 표
        const renderArenaDetail = () => {
            const teams = groupArenaTeams(game.participants);

            const rows = teams.map(t => {
                const members = t.members;
                const header = `
                    <thead>
                        <tr class="arena-group-header">
                            <th colspan="10" style="text-align:left; padding-left:15px;">
                                <span class="arena-rank-badge ${placementClass(t.placement)}">${t.placement ? placementText(t.placement) : '순위 미상'}</span>
                            </th>
                        </tr>
                    </thead>`;

                const body = members.map(p => {
                    const kdaRatio = p.deaths === 0 ? "Perfect" : ((p.kills + p.assists) / p.deaths).toFixed(2);
                    const isMeStyle = p.isSearchedUser ? 'background: rgba(255,255,255,0.08); font-weight: bold;' : '';
                    const dmgPercent = maxDamage > 0 ? (p.damage / maxDamage) * 100 : 0;
                    const dmgTakenPercent = maxDamageTaken > 0 ? (p.damageTaken / maxDamageTaken) * 100 : 0;

                    // 일반 상세 표와 동일한 4 + 4 배치
                    //   윗줄: item0, item1, item2, 장신구(item6)
                    //   아랫줄: item3, item4, item5, item7
                    let pItems = `<div class="detail-items" style="display:flex; flex-direction:column; gap:1px; align-items:center;">
                                    <div style="display:flex; gap:1px;">`;
                    [0, 1, 2, 6].forEach(i => {
                        const id = p[`item${i}`];
                        const tClass = (i === 6) ? " trinket" : "";
                        pItems += id
                            ? `<img src="https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/item/${id}.png" class="${tClass.trim()}" style="width:20px; height:20px; border-radius:3px;" data-tt-type="item" data-tt-id="${id}">`
                            : `<div class="empty${tClass}" style="width:20px; height:20px; background:rgba(0,0,0,0.3); border-radius:3px;"></div>`;
                    });
                    pItems += `</div><div style="display:flex; gap:1px;">`;
                    [3, 4, 5].forEach(i => {
                        const id = p[`item${i}`];
                        pItems += id
                            ? `<img src="https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/item/${id}.png" style="width:20px; height:20px; border-radius:3px;" data-tt-type="item" data-tt-id="${id}">`
                            : `<div class="empty" style="width:20px; height:20px; background:rgba(0,0,0,0.3); border-radius:3px;"></div>`;
                    });
                    pItems += p.item7
                        ? `<img src="https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/item/${p.item7}.png" style="width:20px; height:20px; border-radius:3px;" data-tt-type="item" data-tt-id="${p.item7}">`
                        : `<div class="empty" style="width:20px; height:20px; background:rgba(0,0,0,0.3); border-radius:3px;"></div>`;
                    pItems += `</div></div>`;

                    return `
                        <tr style="${isMeStyle}">
                            <td class="detail-champ-col">
                                <div class="champ-name-wrapper">
                                    <img src="https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${p.championName}.png">
                                    <div class="detail-summoner" onclick="document.getElementById('summoner-input').value='${p.summonerName}'; document.getElementById('search-btn').click();" title="${p.summonerName}">${p.summonerName}</div>
                                </div>
                            </td>
                            <td class="detail-spell-rune-col">
                                <div class="detail-augments">${renderAugments(p.augments, 16) || '<span style="color:#555;">-</span>'}</div>
                            </td>
                            <td style="color: #fff; font-size: 11px; font-weight: bold;">${p.champLevel || '-'}</td>
                            <td>
                                <div class="detail-kda">${p.kills} / <span class="d">${p.deaths}</span> / ${p.assists}</div>
                                <div style="color: #9aa4af; font-size: 11px;">(${kdaRatio})</div>
                            </td>
                            <td style="color: #9aa4af; font-weight: bold; font-size: 11px;">${p.kp}%</td>
                            <td>${pItems}</td>
                            <td style="color: #ddd; font-size: 11px;">${(p.gold || 0).toLocaleString()} G</td>
                            <td>
                                <div style="color: #fff;">${p.damage.toLocaleString()}</div>
                                <div class="damage-bar-container"><div class="damage-bar" style="width: ${dmgPercent}%;"></div></div>
                            </td>
                            <td>
                                <div style="color: #fff;">${p.damageTaken.toLocaleString()}</div>
                                <div class="damage-bar-container"><div class="damage-bar taken" style="width: ${dmgTakenPercent}%;"></div></div>
                            </td>
                            <td class="detail-spell-rune-col">
                                <div class="spell-rune-wrapper">
                                    <div class="detail-spells">
                                        ${spellImg(p.spell1)}
                                        ${spellImg(p.spell2)}
                                    </div>
                                </div>
                            </td>
                        </tr>`;
                }).join('');

                return header + `<tbody>${body}</tbody>`;
            }).join('');

            return `
                <table class="detail-table arena-detail-table">
                    <colgroup>
                        <col style="width: 150px;"> <col style="width: 55px;"> <col style="width: 30px;"> <col style="width: 90px;"> <col style="width: 45px;"> <col style="width: 105px;"> <col style="width: 65px;"> <col style="width: 70px;"> <col style="width: 70px;"> <col style="width: 55px;"> </colgroup>
                    <thead>
                        <tr class="arena-col-header">
                            <th style="text-align:left; padding-left:15px;">소환사</th>
                            <th>증강체</th><th>레벨</th><th>KDA</th><th>킬관여</th><th>아이템</th><th>골드</th><th>피해량</th><th>받은피해량</th><th>스펠</th>
                        </tr>
                    </thead>
                    ${rows}
                </table>`;
        };

        const detailHtml = document.createElement('div');
        detailHtml.className = 'match-detail';

        // 서버가 이미 타임라인을 보내줬으면 캐시에 넣어둠
        if (game.goldFrames || game.myTimeline) {
            window.matchTimelineCache[game.matchId] = {
                goldFrames: game.goldFrames || null,
                myTimeline: game.myTimeline || null,
                loaded: true
            };
        }

        let runesHtml = '';

        if (game.myRunes) {

            let primaryTree = fullRuneData[game.myRunes.primaryStyle];
            let subTree = fullRuneData[game.myRunes.subStyle];
            runesHtml = `<div class="rune-trees-wrap">`;

            if (primaryTree) {
                runesHtml += `
                    <div class="rune-tree" style="justify-content: flex-start;">
                        <div style="display:flex; align-items:center; gap:6px; color:#fff; font-weight:bold; margin-bottom:2px; height: 24px;">
                            <img src="https://ddragon.leagueoflegends.com/cdn/img/${primaryTree.icon}" style="width:24px;"> ${primaryTree.name}
                        </div>`;
                primaryTree.slots.forEach((slot, index) => {
                    const isKeystone = index === 0;
                    runesHtml += `<div class="rune-row" ${isKeystone ? 'style="min-height: 68px;"' : ''}>`;
                    slot.runes.forEach(rune => {
                        const isActive = game.myRunes.primarySelections.includes(rune.id);
                        const iconClass = isKeystone ? 'rune-icon keystone' : 'rune-icon';
                        runesHtml += `
                            <div class="rune-item-wrap">
                                <img src="https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}" class="${iconClass} ${isActive ? '' : 'inactive'}" style="${isActive ? 'border-color:#a78bfa; background:rgba(0,0,0,0.5);' : ''}" data-tt-type="rune" data-tt-id="${rune.id}">
                                <div class="rune-name ${isActive ? 'active' : ''}">${rune.name}</div>
                            </div>`;
                    });
                    runesHtml += `</div>`;
                });
                runesHtml += `</div>`;
            }

            if (subTree) {
                runesHtml += `
                    <div class="rune-tree" style="justify-content: flex-start;">
                        <div style="display:flex; align-items:center; gap:6px; color:#fff; font-weight:bold; margin-bottom:2px; height: 24px;">
                            <img src="https://ddragon.leagueoflegends.com/cdn/img/${subTree.icon}" style="width:24px;"> ${subTree.name}
                        </div>`;
                subTree.slots.forEach((slot, index) => {
                    if (index === 0) {
                        runesHtml += `<div class="rune-row" style="min-height: 68px; width: 100%;"></div>`;
                        return;
                    }

                    runesHtml += `<div class="rune-row">`;
                    slot.runes.forEach(rune => {
                        const isActive = game.myRunes.subSelections.includes(rune.id);
                        runesHtml += `
                            <div class="rune-item-wrap">
                                <img src="https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}" class="rune-icon ${isActive ? '' : 'inactive'}" style="${isActive ? 'border-color:#9aa4af; background:rgba(0,0,0,0.5);' : ''}" data-tt-type="rune" data-tt-id="${rune.id}">
                                <div class="rune-name ${isActive ? 'active' : ''}">${rune.name}</div>
                            </div>`;
                    });
                    runesHtml += `</div>`;
                });
                runesHtml += `</div>`;
            }

            const statGrid = [[5008, 5005, 5007], [5008, 5010, 5001], [5011, 5013, 5001]];
            runesHtml += `<div class="rune-tree" style="border-left: 1px solid rgba(255,255,255,0.1); padding-left: 30px; justify-content: flex-start;">`;

            runesHtml += `<div style="height: 26px; width: 100%;"></div>`;
            runesHtml += `<div class="rune-row" style="min-height: 68px; width: 100%;"></div>`;

            statGrid.forEach((row, rIdx) => {
                runesHtml += `<div class="rune-row" style="gap: 10px;">`;
                row.forEach(id => {
                    const isActive = game.myRunes.statPerks[rIdx] === id;
                    runesHtml += `
                        <div class="rune-item-wrap" style="width: auto; min-width: auto; gap: 4px;">
                            <img src="https://ddragon.leagueoflegends.com/cdn/img/${statRuneMap[id] || statRuneMap[5008]}" class="rune-icon stat ${isActive ? '' : 'inactive'}" style="${isActive ? 'border-color:#ccc; background:#000;' : 'filter: grayscale(1) invert(0.8) opacity(0.2);'}" data-tt-type="rune" data-tt-id="${id}">
                        </div>`;
                });
                runesHtml += `</div>`;
            });
            runesHtml += `</div>`;
            runesHtml += `</div>`;
        }

        detailHtml.innerHTML = `
            <div class="detail-tabs-header">
                <button class="detail-tab-btn active" onclick="switchDetailTab(event, '${game.matchId}', 'summary')">종합</button>
                ${isArena ? '' : `<button class="detail-tab-btn" onclick="switchDetailTab(event, '${game.matchId}', 'analysis')">타임라인</button>`}
                <button class="detail-tab-btn" onclick="switchDetailTab(event, '${game.matchId}', 'build')">빌드</button>
            </div>
            
            <div id="tab-summary-${game.matchId}" class="detail-tab-content active" style="padding: 0;">
                ${isArena ? renderArenaDetail() : `
                <table class="detail-table">
                    <colgroup>
                        <col style="width: 150px;"> <col style="width: 55px;"> <col style="width: 30px;"> <col style="width: 90px;"> <col style="width: 45px;"> <col style="width: 90px;"> <col style="width: 65px;"> <col style="width: 70px;"> <col style="width: 70px;"> <col style="width: 70px;"> </colgroup>
                    <thead>
                        <tr class="${blueHeaderClass}">
                            <th style="text-align:left; padding-left:15px;">${blueWon ? '승리' : '패배'} (블루팀)</th>
                            <th>스펠/룬</th><th>레벨</th><th>KDA</th><th>킬관여</th><th>아이템</th><th>CS/골드</th><th>피해량</th><th>받은피해량</th><th>와드</th>
                        </tr>
                    </thead>
                    <tbody class="${blueBodyClass}">${sortByLane(game.participants.filter(p => p.teamId === 100)).map(p => renderDetailRow(p)).join('')}</tbody>
                    ${renderTeamSummaryRow(game)}
                    <thead>
                        <tr class="${redHeaderClass}">
                            <th style="text-align:left; padding-left:15px;">${redWon ? '승리' : '패배'} (레드팀)</th>
                            <th>스펠/룬</th><th>레벨</th><th>KDA</th><th>킬관여</th><th>아이템</th><th>CS/골드</th><th>피해량</th><th>받은피해량</th><th>와드</th>
                        </tr>
                    </thead>
                    <tbody class="${redBodyClass}">${sortByLane(game.participants.filter(p => p.teamId === 200)).map(p => renderDetailRow(p)).join('')}</tbody>
                </table>`}
            </div>

            ${isArena ? '' : `
            <div id="tab-analysis-${game.matchId}" class="detail-tab-content" style="padding: 20px;">
                <div id="analysis-body-${game.matchId}">
                    <div style="text-align:center; color:#9aa4af; padding:40px;">불러오는 중...</div>
                </div>
            </div>`}

            <div id="tab-build-${game.matchId}" class="detail-tab-content">
                ${runesHtml === ''
                ? `<div style="text-align:center; padding:50px; color:#9aa4af;">룬 데이터가 없습니다.</div>`
                : `
                <div class="build-container">
                    <div class="build-box">
                        <div class="build-title">룬 세팅</div>
                        ${runesHtml}
                    </div>
                    <div class="build-box">
                        <div class="build-title">스킬 빌드</div>
                        <div id="skill-body-${game.matchId}">
                            <div style="text-align:center; color:#9aa4af; padding:30px;">불러오는 중...</div>
                        </div>
                    </div>
                    <div class="build-box">
                        <div class="build-title">아이템 빌드</div>
                        <div id="item-body-${game.matchId}">
                            <div style="text-align:center; color:#9aa4af; padding:30px;">불러오는 중...</div>
                        </div>
                    </div>
                </div>
                `}
            </div>
        `;

        wrapper.appendChild(summary);
        wrapper.appendChild(detailHtml);
        listDiv.appendChild(wrapper);
    });
}

// ============================================================
// 칼바람 전용 요약 패널
//   승률·챔피언·KDA는 협곡과 같은 방식이 통하지만, 라인이 없어서
//   포지션 그래프 자리에는 칼바람에서 의미 있는 지표를 대신 넣는다.
// ============================================================
function renderAramSummaryHtml(matches) {
    const total = matches.length;

    let wins = 0, losses = 0;
    let totalKills = 0, totalDeaths = 0, totalAssists = 0, totalKp = 0;
    let totalDmg = 0, totalTaken = 0, totalGold = 0, totalMins = 0, multiKills = 0;
    const champData = {};

    matches.forEach(game => {
        if (game.win) wins++; else losses++;
        totalKills += game.kills; totalDeaths += game.deaths; totalAssists += game.assists;
        totalKp += game.kp || 0;
        totalGold += game.goldEarned || 0;
        if (game.multiKill) multiKills++;

        const mins = game.durationMin + (game.durationSec / 60);
        totalMins += mins;
        const me = (game.participants || []).find(x => x.isSearchedUser);
        if (me) { totalDmg += me.damage || 0; totalTaken += me.damageTaken || 0; }

        const cName = game.championName;
        if (!champData[cName]) champData[cName] = { games: 0, wins: 0, kills: 0, deaths: 0, assists: 0 };
        champData[cName].games++;
        if (game.win) champData[cName].wins++;
        champData[cName].kills += game.kills;
        champData[cName].deaths += game.deaths;
        champData[cName].assists += game.assists;
    });

    const winRate = Math.round((wins / total) * 100);
    const winDeg = Math.round((wins / total) * 360);
    const wrColor = winRate >= 50 ? '#5383e8' : '#e84057';
    const avgK = (totalKills / total).toFixed(1);
    const avgD = (totalDeaths / total).toFixed(1);
    const avgA = (totalAssists / total).toFixed(1);
    const kdaRatio = totalDeaths === 0 ? 'Perfect' : ((totalKills + totalAssists) / totalDeaths).toFixed(2);
    const avgKp = Math.round(totalKp / total);

    const avgDpm = totalMins > 0 ? Math.round(totalDmg / totalMins) : 0;
    const avgTpm = totalMins > 0 ? Math.round(totalTaken / totalMins) : 0;
    const avgGpm = totalMins > 0 ? Math.round(totalGold / totalMins) : 0;
    const avgLenMin = Math.floor(totalMins / total);
    const avgLenSec = Math.round(((totalMins / total) - avgLenMin) * 60);

    const sortedChamps = Object.entries(champData)
        .sort((a, b) => b[1].games - a[1].games || b[1].wins - a[1].wins).slice(0, 3);

    let champsHtml = sortedChamps.map(([cName, d]) => {
        const cWinRate = Math.round((d.wins / d.games) * 100);
        const cKda = d.deaths === 0 ? 'Perfect' : ((d.kills + d.assists) / d.deaths).toFixed(2);
        let kdaColor = "#ffffff";
        if (cKda >= 5 || cKda === 'Perfect') kdaColor = "#e84057";
        else if (cKda >= 4) kdaColor = "#5383e8";
        else if (cKda >= 3) kdaColor = "#10b981";
        return `
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                <img src="https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${cName}.png" style="width: 28px; height: 28px; border-radius: 50%;" onerror="this.src='https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/profileicon/0.png'">
                <div style="flex: 1; display: flex; align-items: center; gap: 6px; font-size: 12px;">
                    <span style="color: ${cWinRate >= 50 ? '#e84057' : '#ffffff'}; font-weight: bold; width: 34px;">${cWinRate}%</span>
                    <span style="color: #ffffff; width: 62px;">(${d.wins}승 / ${d.games - d.wins}패)</span>
                    <span style="color: ${kdaColor}; font-weight: bold;">${cKda}:1 평점</span>
                </div>
            </div>`;
    }).join('');

    if (sortedChamps.length < 3) {
        for (let i = 0; i < 3 - sortedChamps.length; i++) {
            champsHtml += `<div style="height: 28px; margin-bottom: 6px;"></div>`;
        }
    }

    const metric = (label, value) => `
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px; padding:3px 0;">
            <span style="color:#9aa4af;">${label}</span>
            <span style="color:#ffffff; font-weight:bold;">${value}</span>
        </div>`;

    return `
        <div style="background: linear-gradient(135deg, #2b1a52, #161625); border-radius: 8px; padding: 25px 30px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px; border: 1px solid rgba(107, 70, 193, 0.4);">

            <div style="display: flex; align-items: center; gap: 22px; width: 195px;">
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <div style="color: #ffffff; font-size: 11px;">${total}전 ${wins}승 ${losses}패</div>
                    <div style="width: 88px; height: 88px; border-radius: 50%; background: conic-gradient(#5383e8 ${winDeg}deg, #e84057 0); display: flex; align-items: center; justify-content: center;">
                        <div style="width: 64px; height: 64px; background: #201435; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: bold; color: ${wrColor};">
                            ${winRate}%
                        </div>
                    </div>
                </div>

                <div style="display: flex; flex-direction: column; justify-content: center; gap: 6px; text-align: left;">
                    <div style="font-size: 11px; color: #ffffff; font-weight: bold;">
                        ${avgK} / <span style="color: #e84057;">${avgD}</span> / ${avgA}
                    </div>
                    <div style="font-size: 20px; font-weight: bold; color: #ffffff; letter-spacing: 0.5px;">
                        ${kdaRatio} <span style="font-size: 14px; font-weight: normal; color: #ffffff;">: 1</span>
                    </div>
                    <div style="font-size: 11px; color: #e84057; font-weight: bold;">
                        킬관여 ${avgKp}%
                    </div>
                </div>
            </div>

            <div style="width: 1px; height: 90px; background: rgba(107, 70, 193, 0.4); margin: 0 10px;"></div>

            <div style="width: 244px; padding-left: 9px; display: flex; flex-direction: column; justify-content: center;">
                <div style="color: #ffffff; font-size: 11px; margin-bottom: 12px;">플레이한 챔피언 (최근 ${total}게임)</div>
                ${champsHtml}
            </div>

            <div style="width: 1px; height: 90px; background: rgba(107, 70, 193, 0.4); margin: 0 10px;"></div>

            <div style="display: flex; flex-direction: column; justify-content: center; width: 181px;">
                <div style="color: #ffffff; font-size: 11px; margin-bottom: 8px; text-align: center;">칼바람 지표 (평균)</div>
                ${metric('분당 피해량', avgDpm.toLocaleString())}
                ${metric('분당 받은 피해', avgTpm.toLocaleString())}
                ${metric('분당 골드', avgGpm.toLocaleString())}
                ${metric('게임 시간', `${avgLenMin}분 ${avgLenSec}초`)}
                ${metric('멀티킬 기록', `${multiKills}게임`)}
            </div>

        </div>`;
}

// ============================================================
// 아레나 전용 요약 패널
//   아레나엔 승패도 포지션도 없다. 등수로 이야기해야 맞다.
// ============================================================
function renderArenaSummaryHtml(matches) {
    const total = matches.length;

    let firsts = 0, top3 = 0, placeSum = 0, placeCount = 0;
    let totalKills = 0, totalDeaths = 0, totalAssists = 0, totalKp = 0;
    const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    const champData = {};

    matches.forEach(game => {
        const pl = Number(game.placement) || 0;
        if (pl) {
            placeSum += pl; placeCount++;
            if (dist[pl] !== undefined) dist[pl]++;
            if (pl === 1) firsts++;
            if (pl <= 3) top3++;
        }

        totalKills += game.kills; totalDeaths += game.deaths; totalAssists += game.assists;
        totalKp += game.kp || 0;

        const cName = game.championName;
        if (!champData[cName]) champData[cName] = { games: 0, firsts: 0, placeSum: 0, placeCount: 0 };
        champData[cName].games++;
        if (pl === 1) champData[cName].firsts++;
        if (pl) { champData[cName].placeSum += pl; champData[cName].placeCount++; }
    });

    const avgPlace = placeCount ? (placeSum / placeCount).toFixed(2) : '-';
    const top3Rate = placeCount ? Math.round((top3 / placeCount) * 100) : 0;
    const avgK = (totalKills / total).toFixed(1);
    const avgD = (totalDeaths / total).toFixed(1);
    const avgA = (totalAssists / total).toFixed(1);
    const kdaRatio = totalDeaths === 0 ? 'Perfect' : ((totalKills + totalAssists) / totalDeaths).toFixed(2);
    const avgKp = Math.round(totalKp / total);

    const placeColor = (n) => n === 1 ? '#facc15' : (n <= 3 ? '#5383e8' : '#e84057');
    const top3Deg = Math.round((top3Rate / 100) * 360);
    const avgColor = placeColor(Math.round(Number(avgPlace)) || 6);

    const sortedChamps = Object.entries(champData)
        .sort((a, b) => b[1].games - a[1].games || a[1].placeSum / (a[1].placeCount || 1) - b[1].placeSum / (b[1].placeCount || 1))
        .slice(0, 3);

    let champsHtml = sortedChamps.map(([cName, d]) => {
        const cAvg = d.placeCount ? (d.placeSum / d.placeCount).toFixed(1) : '-';
        const c = placeColor(Math.round(Number(cAvg)) || 6);
        return `
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                <img src="https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${cName}.png" style="width: 28px; height: 28px; border-radius: 50%;" onerror="this.src='https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/profileicon/0.png'">
                <div style="flex: 1; display: flex; align-items: center; gap: 6px; font-size: 12px;">
                    <span style="color: #ffffff; width: 62px;">${d.games}게임</span>
                    <span style="color: #facc15; font-weight: bold;">우승 ${d.firsts}회</span>
                </div>
            </div>`;
    }).join('');

    if (sortedChamps.length < 3) {
        for (let i = 0; i < 3 - sortedChamps.length; i++) {
            champsHtml += `<div style="height: 28px; margin-bottom: 6px;"></div>`;
        }
    }

    const maxDist = Math.max(...Object.values(dist)) || 1;
    const bars = [1, 2, 3, 4, 5, 6].map(n => {
        const val = dist[n];
        const h = val === 0 ? 0 : Math.max(2, (val / maxDist) * 60);
        const isTop = val === maxDist && val > 0;
        return `
            <div data-tooltip="${n}위: ${val}게임" style="display:flex; flex-direction:column; align-items:center; justify-content:flex-end; gap:6px; height: 90px; width: 22px;">
                <div style="width: 12px; background: ${isTop ? placeColor(n) : '#31313c'}; height: ${h}px; border-radius: 2px;"></div>
                <div style="font-size: 10px; color: ${isTop ? placeColor(n) : '#777'}; font-weight: bold;">${n}</div>
            </div>`;
    }).join('');

    return `
        <div style="background: linear-gradient(135deg, #2b1a52, #161625); border-radius: 8px; padding: 25px 30px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px; border: 1px solid rgba(107, 70, 193, 0.4);">

            <div style="display: flex; align-items: center; gap: 22px; width: 195px;">
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <div style="color: #ffffff; font-size: 11px;">${total}전 · ${firsts}회 우승</div>
                    <div style="width: 88px; height: 88px; border-radius: 50%; background: conic-gradient(#5383e8 ${top3Deg}deg, #e84057 0); display: flex; align-items: center; justify-content: center;" data-tooltip="3위 안에 든 비율 ${top3Rate}%">
                        <div style="width: 64px; height: 64px; background: #201435; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: ${avgColor};">
                            <div style="font-size: 15px; font-weight: bold;">${avgPlace}위</div>
                            <div style="font-size: 9px; color: #9aa4af;">평균 등수</div>
                        </div>
                    </div>
                </div>

                <div style="display: flex; flex-direction: column; justify-content: center; gap: 6px; text-align: left;">
                    <div style="font-size: 11px; color: #ffffff; font-weight: bold;">
                        ${avgK} / <span style="color: #e84057;">${avgD}</span> / ${avgA}
                    </div>
                    <div style="font-size: 20px; font-weight: bold; color: #ffffff; letter-spacing: 0.5px;">
                        ${kdaRatio} <span style="font-size: 14px; font-weight: normal; color: #ffffff;">: 1</span>
                    </div>
                    <div style="font-size: 11px; color: #e84057; font-weight: bold;">
                        킬관여 ${avgKp}%
                    </div>
                </div>
            </div>

            <div style="width: 1px; height: 90px; background: rgba(107, 70, 193, 0.4); margin: 0 10px;"></div>

            <div style="width: 244px; padding-left: 9px; display: flex; flex-direction: column; justify-content: center;">
                <div style="color: #ffffff; font-size: 11px; margin-bottom: 12px;">플레이한 챔피언 (최근 ${total}게임)</div>
                ${champsHtml}
            </div>

            <div style="width: 1px; height: 90px; background: rgba(107, 70, 193, 0.4); margin: 0 10px;"></div>

            <div style="display: flex; flex-direction: column; justify-content: center; width: 176px;">
                <div style="color: #ffffff; font-size: 11px; margin-bottom: 8px; text-align: center;">등수 분포</div>
                <div style="display: flex; justify-content: center; gap: 8px; align-items: flex-end;">
                    ${bars}
                </div>
            </div>

        </div>`;
}

function renderSummaryStats(matchesToCalc) {
    const statsArea = document.getElementById('summary-stats-area');
    if (!statsArea) return;

    if (!matchesToCalc || matchesToCalc.length === 0) {
        statsArea.innerHTML = '';
        statsArea.style.display = 'none';
        return;
    }

    // ============================================================
    // 모드별로 통계의 의미가 달라서 한 통에 넣으면 안 된다.
    //   협곡  : 승률 / 챔피언 / 포지션 / 킬관여 전부 유효
    //   칼바람: 라인이 없음 -> 포지션 그래프가 무의미 (전부 미드로 집계됨)
    //   아레나: 승패도 라인도 없음 -> 등수로 봐야 함
    //
    // '전체'에서는 협곡 판만 집계하고, 칼바람과 아레나는 각자 버튼을
    // 눌렀을 때만 전용 패널로 보여준다.
    // ============================================================
    // 다시하기는 실제로 플레이한 게임이 아니다. 승/패로도, 포지션으로도 세면 안 된다.
    //   (스펠은 챔피언 선택에서 이미 정해지므로 3분짜리 다시하기도 포지션에 집계됐었다)
    const played = matchesToCalc.filter(g => !(g.isRemake || (!g.isArena && g.durationMin < 4)));

    if (played.length === 0) {
        statsArea.innerHTML = '';
        statsArea.style.display = 'none';
        return;
    }

    const RIFT_GROUPS = new Set(['솔로랭크', '자유랭크', '일반']);

    const arenaMatches = played.filter(g => g.isArena);
    const aramMatches = played.filter(g => g.isAram);
    const others = played.filter(g => !g.isArena && !g.isAram);
    // 협곡 랭크·일반만 '전체' 종합 통계에 들어간다.
    // 봇전(승률 대부분 100%)과 이벤트 모드는 섞이면 승률이 통째로 왜곡된다.
    const riftMatches = others.filter(g => RIFT_GROUPS.has(g.queueGroup));
    const offRiftMatches = others.filter(g => !RIFT_GROUPS.has(g.queueGroup));

    if (riftMatches.length > 0) {
        matchesToCalc = riftMatches;
    } else if (aramMatches.length > 0 && arenaMatches.length === 0 && offRiftMatches.length === 0) {
        // 칼바람 필터
        statsArea.innerHTML = renderAramSummaryHtml(aramMatches);
        statsArea.style.display = 'block';
        return;
    } else if (arenaMatches.length > 0 && aramMatches.length === 0 && offRiftMatches.length === 0) {
        // 아레나 필터
        statsArea.innerHTML = renderArenaSummaryHtml(arenaMatches);
        statsArea.style.display = 'block';
        return;
    } else if (offRiftMatches.length > 0 && aramMatches.length === 0 && arenaMatches.length === 0) {
        // 봇 필터 등 — 승패·라인 개념이 살아있으므로 기본 패널을 그대로 쓴다
        matchesToCalc = offRiftMatches;
    } else {
        // '전체'인데 협곡 판이 하나도 없는 경우 — 섞어서 평균 내지 않고 안내만
        statsArea.innerHTML = `
            <div style="background: linear-gradient(135deg, #2b1a52, #161625); border-radius: 8px; padding: 22px 30px; margin-bottom: 15px; border: 1px solid rgba(107, 70, 193, 0.4); text-align: center; color: #9aa4af; font-size: 13px; line-height: 1.7;">
                협곡 전적이 없어 종합 통계를 낼 수 없습니다.<br>
                <span style="font-size: 12px; color: #777;">칼바람 · 아레나 · 봇은 각각의 필터 버튼에서 확인할 수 있습니다.</span>
            </div>`;
        statsArea.style.display = 'block';
        return;
    }

    let wins = 0, losses = 0, totalKills = 0, totalDeaths = 0, totalAssists = 0, totalKp = 0;
    let champData = {};
    let posCounts = { top: 0, jungle: 0, mid: 0, adc: 0, support: 0 };

    const supportItems = [3869, 3870, 3871, 3873, 3874, 3875, 3876, 3877, 4003, 4004];
    const adcList = ["Ashe", "Caitlyn", "Draven", "Ezreal", "Jhin", "Jinx", "Kaisa", "Kalista", "KogMaw", "Lucian", "MissFortune", "Nilah", "Samira", "Sivir", "Smolder", "Tristana", "Twitch", "Varus", "Vayne", "Xayah", "Zeri", "Yunara"];
    const topList = ["Aatrox", "Camille", "ChoGath", "Darius", "DrMundo", "Fiora", "Garen", "Gnar", "Gragas", "Gwen", "Illaoi", "Irelia", "Jax", "Jayce", "KSante", "Kayle", "Kennen", "Kled", "Malphite", "Mordekaiser", "Nasus", "Olaf", "Ornn", "Pantheon", "Poppy", "Quinn", "Renekton", "Riven", "Rumble", "Sett", "Shen", "Singed", "Sion", "TahmKench", "Teemo", "Trundle", "Tryndamere", "Urgot", "Volibear", "Wukong", "Yorick", "Ambessa", "Mel", "Zaahen"];

    matchesToCalc.forEach(game => {
        if (game.win) wins++; else losses++;
        totalKills += game.kills; totalDeaths += game.deaths; totalAssists += game.assists;
        totalKp += game.kp || 0;

        const cName = game.championName;
        if (!champData[cName]) champData[cName] = { games: 0, wins: 0, kills: 0, deaths: 0, assists: 0 };
        champData[cName].games++;
        if (game.win) champData[cName].wins++;
        champData[cName].kills += game.kills;
        champData[cName].deaths += game.deaths;
        champData[cName].assists += game.assists;

        // 라이엇이 판정한 라인이 있으면 그걸 쓴다.
        // 예전 방식(스마이트·서폿템·챔피언 이름 목록)은 신챔이나 유연한 픽에서 자주 틀렸다.
        const riotPos = POS_KEY[game.teamPosition];
        if (riotPos) {
            posCounts[riotPos]++;
        } else {
            const hasSmite = (game.spell1 === 11 || game.spell2 === 11);
            const hasSuppItem = [game.item0, game.item1, game.item2, game.item3, game.item4, game.item5, game.item6].some(id => supportItems.includes(id));

            if (hasSmite) posCounts.jungle++;
            else if (hasSuppItem) posCounts.support++;
            else if (adcList.includes(cName)) posCounts.adc++;
            else if (topList.includes(cName)) posCounts.top++;
            else posCounts.mid++;
        }
    });

    const totalGames = matchesToCalc.length;
    const winRate = Math.round((wins / totalGames) * 100);
    const avgK = (totalKills / totalGames).toFixed(1), avgD = (totalDeaths / totalGames).toFixed(1), avgA = (totalAssists / totalGames).toFixed(1);
    const kdaRatio = totalDeaths === 0 ? 'Perfect' : ((totalKills + totalAssists) / totalDeaths).toFixed(2);
    const avgKp = Math.round(totalKp / totalGames);

    const sortedChamps = Object.entries(champData).sort((a, b) => b[1].games - a[1].games || b[1].wins - a[1].wins).slice(0, 3);

    let champsHtml = sortedChamps.map(([cName, data]) => {
        const cWinRate = Math.round((data.wins / data.games) * 100);
        const cKda = data.deaths === 0 ? 'Perfect' : ((data.kills + data.assists) / data.deaths).toFixed(2);
        let kdaColor = "#ffffff";
        if (cKda >= 5 || cKda === 'Perfect') kdaColor = "#e84057"; else if (cKda >= 4) kdaColor = "#5383e8"; else if (cKda >= 3) kdaColor = "#10b981";
        const wrColor = cWinRate >= 60 ? "#e84057" : (cWinRate >= 50 ? "#e84057" : "#ffffff");

        return `
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                <img src="https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${cName}.png" style="width: 28px; height: 28px; border-radius: 50%;" onerror="this.src='https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/profileicon/0.png'">
                <div style="flex: 1; display: flex; align-items: center; gap: 6px; font-size: 12px;">
                    <span style="color: ${wrColor}; font-weight: bold; width: 34px;">${cWinRate}%</span>
                    <span style="color: #ffffff; width: 62px;">(${data.wins}승 / ${data.games - data.wins}패)</span>
                    <span style="color: ${kdaColor}; font-weight: bold;">${cKda}:1 평점</span>
                </div>
            </div>
        `;
    }).join('');

    if (sortedChamps.length < 3) {
        for (let i = 0; i < 3 - sortedChamps.length; i++) {
            champsHtml += `<div style="height: 28px; margin-bottom: 6px;"></div>`;
        }
    }

    const winDeg = Math.round((wins / totalGames) * 360);
    const maxPos = Math.max(posCounts.top, posCounts.jungle, posCounts.mid, posCounts.adc, posCounts.support) || 1;

    const iconTop = `<img src="https://s-lol-web.op.gg/images/icon/icon-position-top.svg" style="width:16px;">`;
    const iconJungle = `<img src="https://s-lol-web.op.gg/images/icon/icon-position-jungle.svg" style="width:16px;">`;
    const iconMid = `<img src="https://s-lol-web.op.gg/images/icon/icon-position-mid.svg" style="width:16px;">`;
    const iconAdc = `<img src="https://s-lol-web.op.gg/images/icon/icon-position-adc.svg" style="width:16px;">`;
    const iconSup = `<img src="https://s-lol-web.op.gg/images/icon/icon-position-support.svg" style="width:16px;">`;

    const posOrder = [
        { id: 'top', name: '탑', icon: iconTop, val: posCounts.top },
        { id: 'jungle', name: '정글', icon: iconJungle, val: posCounts.jungle },
        { id: 'mid', name: '미드', icon: iconMid, val: posCounts.mid },
        { id: 'adc', name: '원딜', icon: iconAdc, val: posCounts.adc },
        { id: 'support', name: '서포터', icon: iconSup, val: posCounts.support }
    ];

    const renderBar = (p) => {
        const isActive = p.val === Math.max(posCounts.top, posCounts.jungle, posCounts.mid, posCounts.adc, posCounts.support) && p.val > 0;
        const h = p.val === 0 ? 0 : Math.max(2, (p.val / maxPos) * 60);
        const barColor = isActive ? '#a78bfa' : '#31313c';
        const filterStyle = isActive ? 'filter: invert(65%) sepia(54%) saturate(3015%) hue-rotate(218deg) brightness(101%) contrast(97%);' : 'filter: invert(30%);';

        return `
            <div data-tooltip="${p.name} 플레이 횟수: ${p.val}게임" style="display:flex; flex-direction:column; align-items:center; justify-content:flex-end; gap:8px; height: 90px; width: 24px;">
                <div style="width: 12px; background: ${barColor}; height: ${h}px; border-radius: 2px;"></div>
                <div style="display:flex; ${filterStyle}">${p.icon}</div>
            </div>
        `;
    };

    const wrColor = winRate >= 50 ? '#5383e8' : '#e84057';

    statsArea.innerHTML = `
        <div style="background: linear-gradient(135deg, #2b1a52, #161625); border-radius: 8px; padding: 25px 30px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px; border: 1px solid rgba(107, 70, 193, 0.4);">
            
            <div style="display: flex; align-items: center; gap: 22px; width: 195px;">
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <div style="color: #ffffff; font-size: 11px;">${totalGames}전 ${wins}승 ${losses}패</div>
                    <div style="width: 88px; height: 88px; border-radius: 50%; background: conic-gradient(#5383e8 ${winDeg}deg, #e84057 0); display: flex; align-items: center; justify-content: center;">
                        <div style="width: 64px; height: 64px; background: #201435; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: bold; color: ${wrColor};">
                            ${winRate}%
                        </div>
                    </div>
                </div>
                
                <div style="display: flex; flex-direction: column; justify-content: center; gap: 6px; text-align: left;">
                    <div style="font-size: 11px; color: #ffffff; font-weight: bold;">
                        ${avgK} / <span style="color: #e84057;">${avgD}</span> / ${avgA}
                    </div>
                    <div style="font-size: 20px; font-weight: bold; color: #ffffff; letter-spacing: 0.5px;">
                        ${kdaRatio} <span style="font-size: 14px; font-weight: normal; color: #ffffff;">: 1</span>
                    </div>
                    <div style="font-size: 11px; color: #e84057; font-weight: bold;">
                        킬관여 ${avgKp}%
                    </div>
                </div>
            </div>

            <div style="width: 1px; height: 90px; background: rgba(107, 70, 193, 0.4); margin: 0 10px;"></div>

            <div style="width: 244px; padding-left: 9px; display: flex; flex-direction: column; justify-content: center;">
                <div style="color: #ffffff; font-size: 11px; margin-bottom: 12px;">플레이한 챔피언 (최근 ${totalGames}게임)</div>
                ${champsHtml}
            </div>

            <div style="width: 1px; height: 90px; background: rgba(107, 70, 193, 0.4); margin: 0 10px;"></div>

            <div style="display: flex; flex-direction: column; justify-content: center; width: 176px;">
                <div style="color: #ffffff; font-size: 11px; margin-bottom: 8px; text-align: center;">선호 포지션 (랭크)</div>
                <div style="display: flex; justify-content: center; gap: 10px; align-items: flex-end;">
                    ${posOrder.map(renderBar).join('')}
                </div>
            </div>

        </div>
    `;
    statsArea.style.display = 'block';
}

// 필터는 두 축이다. 큐(전체/솔랭/칼바람/...)와 챔피언.
// 서로 독립이라 상태를 따로 두고 적용은 한 군데서 한다.
let activeQueueFilter = '전체';
let activeChampFilter = null;   // 챔피언 영문 ID. null이면 전체

function toggleFilter(btn, type) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeQueueFilter = type;
    applyMatchFilters();
}

function applyMatchFilters() {
    const games = document.querySelectorAll('.match-wrapper');

    // 전적이 아예 없으면 renderMatches가 이미 안내를 그려놨다.
    // 여기서 또 만들면 같은 문구가 두 번 뜬다.
    if (games.length === 0) {
        renderSummaryStats([]);
        return;
    }

    let visibleCount = 0; let filteredMatches = [];

    games.forEach((gameDiv, index) => {
        // 라벨 부분일치(includes)는 라벨을 늘릴 때 서로 잡아먹는다. 그룹 완전일치로 판정.
        const group = gameDiv.dataset.group || '기타';
        const champ = gameDiv.dataset.champ || '';

        const queueOk = activeQueueFilter === '전체' || group === activeQueueFilter;
        const champOk = !activeChampFilter || champ === activeChampFilter;

        if (queueOk && champOk) {
            gameDiv.style.display = 'block'; visibleCount++;
            if (allMatches[index]) filteredMatches.push(allMatches[index]);
        } else { gameDiv.style.display = 'none'; }
    });

    renderSummaryStats(filteredMatches);
    const listDiv = document.getElementById('game-list');
    let emptyMsg = document.getElementById('empty-filter-msg');

    if (visibleCount === 0) {
        if (!emptyMsg) {
            emptyMsg = document.createElement('div');
            emptyMsg.id = 'empty-filter-msg';
            emptyMsg.style.cssText = "text-align: center; padding: 60px 0; color: #9aa4af; line-height: 1.6;";
            listDiv.appendChild(emptyMsg);
        }
        emptyMsg.innerHTML = activeChampFilter
            ? "선택한 챔피언의 전적이 없습니다.<br><span style='font-size: 12px; color: #777;'>(최근 20게임 기준)</span>"
            : "전적 데이터가 없습니다.<br><span style='font-size: 12px; color: #777;'>(최근 20게임 기준)</span>";
        emptyMsg.style.display = 'block';
    } else if (emptyMsg) emptyMsg.style.display = 'none';
}

// ============================================================
// 챔피언 필터 패널
// ============================================================

// 한글 초성 검색 ("ㄱㄹ" -> 가렌)
const HANGUL_CHO = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

function getChosung(str) {
    return [...str].map(ch => {
        const code = ch.charCodeAt(0) - 0xAC00;
        return (code >= 0 && code <= 11171) ? HANGUL_CHO[Math.floor(code / 588)] : ch;
    }).join('');
}

let champFilterCache = null;

async function loadChampFilterList() {
    if (champFilterCache) return champFilterCache;
    const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/ko_KR/champion.json`);
    const data = await res.json();

    let list = [];
    for (let key in data.data) {
        const c = data.data[key];
        if (isClassicChamp(c.id)) continue;   // 클래식(Jade_) 제외
        list.push({ id: c.id, name: c.name });
    }

    list.sort((a, b) => a.name.localeCompare(b.name, 'ko-KR'));
    champFilterCache = list;
    return list;
}

function champIconUrl(id) {
    return `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${id}.png`;
}

function champKorName(id) {
    const found = champFilterCache && champFilterCache.find(c => c.id === id);
    return found ? found.name : id;
}

// 현재 불러온 전적에서 많이 한 챔피언 상위 5개
function getRecentTopChamps() {
    const counts = {};
    (allMatches || []).forEach(g => {
        if (!g.championName) return;
        counts[g.championName] = (counts[g.championName] || 0) + 1;
    });
    return Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([id, n]) => ({ id, count: n }));
}

async function toggleChampFilterPanel(e) {
    if (e) e.stopPropagation();
    const panel = document.getElementById('champ-filter-panel');
    if (!panel) return;

    if (panel.classList.contains('open')) { closeChampFilterPanel(); return; }

    await loadChampFilterList();
    renderChampFilterPanel();
    panel.classList.add('open');

    const search = document.getElementById('cf-search');
    if (search) { search.value = ''; search.focus(); }
}

function closeChampFilterPanel() {
    const panel = document.getElementById('champ-filter-panel');
    if (panel) panel.classList.remove('open');
}

function renderChampFilterPanel() {
    const recent = getRecentTopChamps();
    const recentBox = document.getElementById('cf-recent');
    const listBox = document.getElementById('cf-list');
    if (!recentBox || !listBox) return;

    recentBox.innerHTML = recent.length
        ? recent.map(c => champFilterRow(c.id, `${c.count}게임`)).join('')
        : `<div class="cf-empty">기록 없음</div>`;

    listBox.innerHTML = champFilterCache.map(c => champFilterRow(c.id)).join('');
}

function champFilterRow(id, sub = '') {
    const active = activeChampFilter === id ? ' active' : '';
    return `
        <div class="cf-item${active}" data-id="${id}" data-name="${champKorName(id)}"
             onclick="selectChampFilter('${id}')">
            <img src="${champIconUrl(id)}" onerror="this.style.visibility='hidden'">
            <span class="cf-name">${champKorName(id)}</span>
            ${sub ? `<span class="cf-sub">${sub}</span>` : ''}
        </div>`;
}

function filterChampFilterList() {
    const q = (document.getElementById('cf-search').value || '').trim().toLowerCase();
    const rows = document.querySelectorAll('#cf-list .cf-item');

    rows.forEach(row => {
        const name = (row.dataset.name || '').toLowerCase();
        const id = (row.dataset.id || '').toLowerCase();
        const cho = getChosung(row.dataset.name || '').toLowerCase();
        const hit = !q || name.includes(q) || id.includes(q) || cho.includes(q);
        row.style.display = hit ? 'flex' : 'none';
    });
}

function selectChampFilter(id) {
    // 이미 선택된 챔피언을 다시 누르면 해제
    activeChampFilter = (activeChampFilter === id) ? null : id;
    updateChampFilterBtn();
    closeChampFilterPanel();
    applyMatchFilters();
}

function clearChampFilter(e) {
    // stopPropagation 때문에 바깥 클릭 감지가 안 걸린다. 여기서 직접 닫아준다.
    if (e) e.stopPropagation();
    activeChampFilter = null;
    updateChampFilterBtn();
    closeChampFilterPanel();
    applyMatchFilters();
}

function updateChampFilterBtn() {
    const btn = document.getElementById('champ-filter-btn');
    if (!btn) return;

    if (activeChampFilter) {
        btn.classList.add('selected');
        btn.innerHTML = `
            <img src="${champIconUrl(activeChampFilter)}" class="cf-btn-icon">
            <span>${champKorName(activeChampFilter)}</span>
            <span class="cf-clear" onclick="clearChampFilter(event)">×</span>`;
    } else {
        btn.classList.remove('selected');
        btn.innerHTML = `<span>챔피언 필터</span>`;
    }
}

// 패널 바깥을 누르면 닫기
document.addEventListener('click', (e) => {
    const wrap = document.getElementById('champ-filter-wrap');
    if (wrap && !wrap.contains(e.target)) closeChampFilterPanel();
});

// ==========================================
// [6] 즐겨찾기 및 최근기록 로직
// ==========================================
let currentDropdownTab = 'favorites';

function getFavorites() { return JSON.parse(localStorage.getItem('pix_favorites') || '[]'); }
function saveFavorites(favs) { localStorage.setItem('pix_favorites', JSON.stringify(favs)); }

function getRecents() { return JSON.parse(localStorage.getItem('pix_recent') || '[]'); }
function saveRecents(recents) { localStorage.setItem('pix_recent', JSON.stringify(recents)); }

// 현재 보고 있는 소환사. 즐겨찾기 버튼 상태를 갱신할 때 쓴다.
let currentProfileName = null;

// 프로필의 즐겨찾기 버튼을 다시 그린다.
// 이미 등록된 소환사면 버튼 자체를 없앤다. (해제는 검색창 드롭다운의 ×로)
function renderProfileFavBtn() {
    const wrap = document.getElementById('profile-fav-wrap');
    if (!wrap) return;

    if (!currentProfileName || getFavorites().includes(currentProfileName)) {
        wrap.innerHTML = '';
        return;
    }

    wrap.innerHTML = `
        <button class="profile-fav-btn" onclick="addFavorite(currentProfileName)">즐겨찾기</button>`;
}

function addFavorite(name) {
    if (!name) return;
    let favs = getFavorites();
    if (favs.includes(name)) return;

    favs.push(name);
    if (favs.length > 10) favs.shift();
    saveFavorites(favs);

    renderDropdownList();
    renderProfileFavBtn();
}

function toggleFavorite(name) {
    let favs = getFavorites();
    const index = favs.indexOf(name);
    if (index > -1) favs.splice(index, 1);
    else { favs.push(name); if (favs.length > 10) favs.shift(); }
    saveFavorites(favs);

    renderDropdownList();
    renderProfileFavBtn();
}

function removeFavorite(name) {
    let favs = getFavorites();
    favs = favs.filter(f => f !== name);
    saveFavorites(favs);

    renderDropdownList();
    renderProfileFavBtn();   // 지운 소환사를 보고 있으면 버튼이 다시 나타난다
}

function addRecentSearch(name) {
    let recents = getRecents();
    recents = recents.filter(r => r !== name);
    recents.unshift(name);
    if (recents.length > 10) recents.pop();
    saveRecents(recents);
    if (currentDropdownTab === 'recent') renderDropdownList();
}

function removeRecentSearch(name) {
    let recents = getRecents();
    recents = recents.filter(r => r !== name);
    saveRecents(recents); renderDropdownList();
}

// 드롭다운을 열 때 어느 탭을 먼저 보여줄지 정한다.
//   즐겨찾기가 있으면 즐겨찾기, 없으면 최근기록.
function pickDefaultDropdownTab() {
    const tab = getFavorites().length > 0 ? 'favorites' : 'recent';
    currentDropdownTab = tab;

    const favTab = document.getElementById('tab-favorites');
    const recTab = document.getElementById('tab-recent');
    if (favTab) favTab.classList.toggle('active', tab === 'favorites');
    if (recTab) recTab.classList.toggle('active', tab === 'recent');

    renderDropdownList();
}

function switchTab(tabName) {
    currentDropdownTab = tabName;
    document.getElementById('tab-favorites').classList.toggle('active', tabName === 'favorites');
    document.getElementById('tab-recent').classList.toggle('active', tabName === 'recent');
    renderDropdownList();
    document.getElementById('summoner-input').focus();
}

function renderDropdownList() {
    const listDiv = document.getElementById('dropdown-list');

    if (currentDropdownTab === 'favorites') {
        const favs = getFavorites();
        if (favs.length === 0) {
            listDiv.innerHTML = '<div class="empty-favorite">즐겨찾기에 등록된 유저가 존재하지 않습니다.</div>';
            return;
        }
        listDiv.innerHTML = favs.map(f => `
            <div class="favorite-item" onclick="document.getElementById('summoner-input').value='${f}'; document.getElementById('search-btn').click();">
                <span class="favorite-name">${f}</span>
                <button class="favorite-del-btn" onclick="event.stopPropagation(); removeFavorite('${f}');" title="삭제">×</button>
            </div>
        `).join('');
    } else {
        const recents = getRecents();
        if (recents.length === 0) {
            listDiv.innerHTML = '<div class="empty-favorite">최근 검색한 소환사가 없습니다.</div>';
            return;
        }
        listDiv.innerHTML = recents.map(r => `
            <div class="favorite-item" onclick="document.getElementById('summoner-input').value='${r}'; document.getElementById('search-btn').click();">
                <span class="favorite-name">${r}</span>
                <button class="favorite-del-btn" onclick="event.stopPropagation(); removeRecentSearch('${r}');" title="삭제">×</button>
            </div>
        `).join('');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('summoner-input');
    const dropdown = document.getElementById('search-dropdown');

    searchInput.addEventListener('focus', () => {
        // 입력값이 있으면 자동완성이 우선이므로 즐겨찾기는 띄우지 않음
        if (searchInput.value.trim()) return;

        // 이미 열려 있으면 탭을 건드리지 않는다.
        // switchTab이 끝에서 input.focus()를 호출하기 때문에, 여기서 무조건
        // 기본 탭으로 되돌리면 사용자가 누른 탭이 즉시 취소된다.
        if (dropdown.style.display !== 'block') {
            pickDefaultDropdownTab();   // 즐겨찾기가 있으면 즐겨찾기부터, 없으면 최근기록부터
        }
        dropdown.style.display = 'block';
    });
    document.addEventListener('click', (e) => {
        const wrapper = document.querySelector('.search-box-wrapper');
        if (wrapper && !wrapper.contains(e.target)) dropdown.style.display = 'none';
    });
});

// ==========================================
// [7] 통계 및 랭킹 페이지 로직
// ==========================================
async function showStats() {
    // 메뉴를 가려도 /stats 주소를 직접 치면 들어올 수 있어서 여기서도 막는다
    if (HIDE_UNFINISHED_PAGES) { goLobby(); return; }

    if (window.location.pathname !== '/stats') window.history.pushState({ page: 'stats' }, '', '/stats');
    hideAllContainers();
    const statsContainer = document.getElementById('stats-container');
    statsContainer.style.display = "block";
    statsContainer.innerHTML = "<div style='text-align:center; padding:50px; color:#9aa4af;'>데이터를 불러오는 중입니다...</div>";

    let apiStats = [];

    try {
        let korToEngMap = {};
        try {
            const ddragonRes = await fetch(`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/ko_KR/champion.json`);
            const ddragonData = await ddragonRes.json();
            // 클래식 챔피언은 한글 이름이 정규와 같아서, 걸러내지 않으면
            // korToEngMap["가렌"]이 Jade_Garen으로 덮어써진다.
            for (let key in ddragonData.data) {
                const c = ddragonData.data[key];
                if (isClassicChamp(c.id)) continue;
                korToEngMap[c.name] = c.id;
            }
        } catch (e) {
            console.warn("챔피언 이름 변환 데이터 로드 실패", e);
        }

        const defaultLaneMap = { "가렌": "top", "갈리오": "mid", "갱플랭크": "top", "그라가스": "top", "그레이브즈": "jungle", "그웬": "top", "나르": "top", "나미": "support", "나서스": "top", "나피리": "jungle", "노틸러스": "support", "녹턴": "jungle", "누누와 윌럼프": "jungle", "니달리": "jungle", "니코": "mid", "닐라": "adc", "다리우스": "top", "다이애나": "jungle", "드레이븐": "adc", "라이즈": "mid", "라칸": "support", "람머스": "jungle", "럭스": "support", "럼블": "top", "레나타 글라스크": "support", "레넥톤": "top", "레오나": "support", "렉사이": "jungle", "렐": "support", "렝가": "jungle", "루시안": "adc", "룰루": "support", "르블랑": "mid", "리 신": "jungle", "리븐": "top", "리산드라": "mid", "릴리아": "jungle", "마스터 이": "jungle", "마오카이": "jungle", "말자하": "mid", "말파이트": "top", "멜": "mid", "모데카이저": "top", "모르가나": "support", "문도 박사": "top", "미스 포츈": "adc", "밀리오": "support", "바드": "support", "바루스": "adc", "바이": "jungle", "베이가": "mid", "베인": "adc", "벡스": "mid", "벨베스": "jungle", "벨코즈": "support", "볼리베어": "top", "브라움": "support", "브라이어": "jungle", "브랜드": "jungle", "블라디미르": "mid", "블리츠크랭크": "support", "비에고": "jungle", "빅토르": "mid", "뽀삐": "support", "사미라": "adc", "사이온": "top", "사일러스": "mid", "샤코": "jungle", "세나": "support", "세라핀": "support", "세주아니": "jungle", "세트": "top", "소나": "support", "소라카": "support", "쉔": "top", "쉬바나": "jungle", "스몰더": "adc", "스웨인": "support", "스카너": "jungle", "시비르": "adc", "신 짜오": "jungle", "신드라": "mid", "신지드": "top", "쓰레쉬": "support", "아리": "mid", "아무무": "jungle", "아우렐리온 솔": "mid", "아이번": "jungle", "아지르": "mid", "아칼리": "mid", "아크샨": "mid", "아트록스": "top", "아펠리오스": "adc", "알리스타": "support", "암베사": "top", "애니": "mid", "애니비아": "mid", "애쉬": "adc", "야스오": "mid", "에코": "jungle", "엘리스": "jungle", "오공": "jungle", "오로라": "mid", "오른": "top", "오리아나": "mid", "올라프": "top", "요네": "mid", "요릭": "top", "우디르": "jungle", "우르곳": "top", "워윅": "jungle", "유나라": "adc", "유미": "support", "이렐리아": "top", "이블린": "jungle", "이즈리얼": "adc", "일라오이": "top", "자르반 4세": "jungle", "자야": "adc", "자이라": "support", "자크": "jungle", "자헨": "top", "잔나": "support", "잭스": "top", "제드": "mid", "제라스": "support", "제리": "adc", "제이스": "top", "조이": "mid", "직스": "adc", "진": "adc", "질리언": "support", "징크스": "adc", "초가스": "top", "카르마": "support", "카밀": "top", "카사딘": "mid", "카서스": "jungle", "카시오페아": "mid", "카이사": "adc", "카직스": "jungle", "카타리나": "mid", "칼리스타": "adc", "케넨": "top", "케이틀린": "adc", "케인": "jungle", "케일": "top", "코그모": "adc", "코르키": "adc", "퀸": "top", "크산테": "top", "클레드": "top", "키아나": "mid", "킨드레드": "jungle", "타릭": "support", "탈론": "mid", "탈리야": "jungle", "탐 켄치": "support", "트런들": "top", "트리스타나": "adc", "트린다미어": "top", "트위스티드 페이트": "mid", "트위치": "adc", "티모": "top", "파이크": "support", "판테온": "top", "피들스틱": "jungle", "피오라": "top", "피즈": "mid", "하이머딩거": "top", "헤카림": "jungle", "흐웨이": "mid" };

        apiStats = statsData.map(champ => {
            let calcTierClass = "tier-d";
            if (champ.tier) {
                if (champ.tier.includes('S')) calcTierClass = "tier-s"; else if (champ.tier.includes('A')) calcTierClass = "tier-a";
                else if (champ.tier.includes('B')) calcTierClass = "tier-b"; else if (champ.tier.includes('C')) calcTierClass = "tier-c";
                else if (champ.tier.includes('D')) calcTierClass = "tier-d"; else if (champ.tier.includes('E')) calcTierClass = "tier-e";
            }
            return {
                id: korToEngMap[champ.name] || "0", name: champ.name || "알수없음", tier: champ.tier || "A", tierClass: calcTierClass,
                lane: defaultLaneMap[champ.name] || "top", laneRate: champ.laneRate || 0, win: champ.win || 0, pick: champ.pick || 0, ban: champ.ban || 0
            };
        });
    } catch (error) {
        statsContainer.innerHTML = `<div style='text-align:center; padding:50px; color:#f87171;'>데이터 로드 실패: ${error.message}</div>`;
        return;
    }

    const laneIconMap = {
        "top": "https://s-lol-web.op.gg/images/icon/icon-position-top.svg", "jungle": "https://s-lol-web.op.gg/images/icon/icon-position-jungle.svg",
        "mid": "https://s-lol-web.op.gg/images/icon/icon-position-mid.svg", "adc": "https://s-lol-web.op.gg/images/icon/icon-position-adc.svg",
        "support": "https://s-lol-web.op.gg/images/icon/icon-position-support.svg"
    };

    const tierWeights = { "S+": 19, "S": 18, "S-": 17, "A+": 16, "A": 15, "A-": 14, "B+": 13, "B": 12, "B-": 11, "C+": 10, "C": 9, "C-": 8, "D+": 7, "D": 6, "D-": 5, "E+": 4, "E": 3, "E-": 2, "F": 1 };

    let currentLane = 'all'; let currentSortCol = 'tier'; let currentSortDir = 'desc';

    statsContainer.innerHTML = `
        <div class="stats-header">
            <h1 class="ranking-title">한국서버 에메랄드+ 챔피언 통계 (버전: 16.4)</h1>
            <p style="color: #9aa4af; margin-top: 10px; font-size: 14px;">API 키 이슈로 이전 버전 통계가 제공됩니다.</p>
        </div>
        <div class="stats-filter-container">
            <button class="stats-filter-btn all-btn active" data-lane="all">ALL</button>
            <button class="stats-filter-btn" data-lane="top" title="탑"><img src="${laneIconMap['top']}"></button>
            <button class="stats-filter-btn" data-lane="jungle" title="정글"><img src="${laneIconMap['jungle']}"></button>
            <button class="stats-filter-btn" data-lane="mid" title="미드"><img src="${laneIconMap['mid']}"></button>
            <button class="stats-filter-btn" data-lane="adc" title="바텀"><img src="${laneIconMap['adc']}"></button>
            <button class="stats-filter-btn" data-lane="support" title="서포터"><img src="${laneIconMap['support']}"></button>
        </div>
        <div class="stats-table-wrapper">
            <table class="stats-table">
                <thead>
                    <tr>
                        <th class="sortable-th" data-sort="name" style="text-align: left; padding-left: 20px;">Name <span class="sort-icon">▲</span></th>
                        <th class="sortable-th active" data-sort="tier">Tier <span class="sort-icon">▼</span></th>
                        <th>Lane</th>
                        <th class="sortable-th" data-sort="win">Win <span class="sort-icon">▼</span></th>
                        <th class="sortable-th" data-sort="pick">Pick <span class="sort-icon">▼</span></th>
                        <th class="sortable-th" data-sort="ban">Ban <span class="sort-icon">▼</span></th>
                    </tr>
                </thead>
                <tbody id="stats-tbody"></tbody>
            </table>
        </div>
    `;

    function renderStatsTable() {
        const tbody = document.getElementById('stats-tbody');
        let processedStats = currentLane === 'all' ? [...apiStats] : apiStats.filter(c => c.lane === currentLane);

        if (currentSortCol) {
            processedStats.sort((a, b) => {
                let valA = a[currentSortCol], valB = b[currentSortCol];
                if (currentSortCol === 'tier') { valA = tierWeights[valA] || -10; valB = tierWeights[valB] || -10; }
                if (valA < valB) return currentSortDir === 'desc' ? 1 : -1;
                if (valA > valB) return currentSortDir === 'desc' ? -1 : 1;
                return 0;
            });
        }

        if (processedStats.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="padding: 40px; color: #9aa4af;">데이터가 없습니다.</td></tr>`;
            return;
        }

        tbody.innerHTML = processedStats.map(champ => `
            <tr>
                <td class="stats-champ-info">
                    <img src="https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${champ.id}.png" onerror="this.src='https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/profileicon/0.png'">
                    <span class="stats-champ-name">${champ.name}</span>
                </td>
                <td><span class="stats-tier ${champ.tierClass}">${champ.tier}</span></td>
                <td class="stats-lane">
                    <img src="${laneIconMap[champ.lane]}">
                    <div class="stats-lane-rate">${Number(champ.laneRate).toFixed(2)}%</div>
                </td>
                <td><div style="color: #10b981; font-weight: bold;">${Number(champ.win).toFixed(2)}%</div></td>
                <td style="color: #e2e8f0;">${Number(champ.pick).toFixed(2)}%</td>
                <td style="color: #e2e8f0;">${Number(champ.ban).toFixed(2)}%</td>
            </tr>
        `).join('');
    }

    renderStatsTable();

    const filterBtns = document.querySelectorAll('.stats-filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            currentLane = e.currentTarget.dataset.lane;
            renderStatsTable();
        });
    });

    const sortableThs = document.querySelectorAll('.sortable-th');
    sortableThs.forEach(th => {
        th.addEventListener('click', (e) => {
            const col = e.currentTarget.dataset.sort;
            if (currentSortCol === col) currentSortDir = currentSortDir === 'desc' ? 'asc' : 'desc';
            else { currentSortCol = col; currentSortDir = col === 'name' ? 'asc' : 'desc'; }

            sortableThs.forEach(h => {
                h.classList.remove('active', 'asc');
                h.querySelector('.sort-icon').textContent = h.dataset.sort === 'name' ? '▲' : '▼';
            });

            const activeTh = e.currentTarget;
            activeTh.classList.add('active');
            if (currentSortDir === 'asc') { activeTh.classList.add('asc'); activeTh.querySelector('.sort-icon').textContent = '▲'; }
            else { activeTh.querySelector('.sort-icon').textContent = '▼'; }

            renderStatsTable();
        });
    });
}

let fullRankingData = [];
let currentRankingPage = 1;
const RANKING_ITEMS_PER_PAGE = 50;

async function showRanking(targetPage = 1) {
    const targetUrl = `/ranking?page=${targetPage}`;
    if (window.location.pathname + window.location.search !== targetUrl) {
        if (window.location.pathname === '/ranking' && !window.location.search) {
            window.history.replaceState({ page: 'ranking', rankingPage: targetPage }, '', targetUrl);
        } else {
            window.history.pushState({ page: 'ranking', rankingPage: targetPage }, '', targetUrl);
        }
    }

    if (Date.now() < rateLimitUnlockTime) {
        showErrorToast("현재 접속자가 많아 검색이 지연되고 있습니다. 잠시 후 다시 시도해주세요.");
        return;
    }

    hideAllContainers();
    document.getElementById('result-container').style.display = "block";
    const profileDiv = document.getElementById('user-profile');
    const listDiv = document.getElementById('game-list');

    const filterArea = document.getElementById('filter-area');
    const sidebarArea = document.getElementById('sidebar-area');
    const summaryArea = document.getElementById('summary-stats-area');
    if (sidebarArea) sidebarArea.style.display = "none";
    if (filterArea) filterArea.style.display = "none";
    if (summaryArea) summaryArea.style.display = "none";

    profileDiv.innerHTML = `
        <div class="stats-header">
            <h1 class="ranking-title">
                <img src="https://opgg-static.akamaized.net/images/medals_new/challenger.png" style="position: absolute; right: 100%; margin-right: 12px; top: 50%; transform: translateY(-50%); width: 60px; height: 60px;">
                한국서버 솔로랭크 랭킹
            </h1>
            <p style="color: #9aa4af; margin-top: 10px; font-size: 14px;">약 10분마다 갱신됩니다.</p>
        </div>
    `;
    listDiv.innerHTML = "<div style='text-align:center; padding:100px 0; min-height:100vh; color:#9aa4af;'>데이터를 불러오는 중입니다...</div>";
    const moreArea = document.getElementById('load-more-area');
    if (moreArea) moreArea.innerHTML = "";

    try {
        const res = await fetch('/api/ranking');

        if (res.status === 429) {
            const retryAfter = res.headers.get('Retry-After');
            rateLimitUnlockTime = Date.now() + (retryAfter ? parseInt(retryAfter) * 1000 : 5000);
            showErrorToast("조회 한도를 초과했습니다. 잠시 후 다시 시도해주세요.");
            listDiv.innerHTML = "<div style='text-align:center; padding:50px; color:#f87171;'>조회 한도를 초과했습니다. 잠시 후 다시 시도해주세요.</div>";
            return;
        }

        const data = await res.json();

        if (data.error) throw new Error(data.error);
        if (!data.players) throw new Error("서버가 랭킹 데이터를 준비 중입니다. 잠시 후 새로고침 해주세요.");

        fullRankingData = data.players;
        renderRankingPage(targetPage);

    } catch (e) {
        showErrorToast("데이터 로드 실패");
        listDiv.innerHTML = `<div style='text-align:center; padding:50px; color:#f87171;'>데이터 로드 실패: ${e.message}</div>`;
    }
}

function renderRankingPage(page) {
    currentRankingPage = page;
    const listDiv = document.getElementById('game-list');

    const newUrl = `/ranking?page=${page}`;
    if (window.location.pathname + window.location.search !== newUrl) {
        window.history.pushState({ page: 'ranking', rankingPage: page }, '', newUrl);
    }

    const startIndex = (page - 1) * RANKING_ITEMS_PER_PAGE;
    const endIndex = startIndex + RANKING_ITEMS_PER_PAGE;
    const pageData = fullRankingData.slice(startIndex, endIndex);
    const totalPages = Math.ceil(fullRankingData.length / RANKING_ITEMS_PER_PAGE);

    let tableHtml = `
        <div style="border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; background: #1a1a2e; overflow-x: auto;">
            <table style="width:100%; min-width:600px; border-collapse: collapse; font-size: 14px;">
                <thead style="background: #2b1a52; color: #a78bfa;">
                    <tr>
                        <th style="width: 60px; padding: 15px; text-align: center;">순위</th>
                        <th style="padding: 15px; text-align: left; padding-left: 30px;">닉네임</th>
                        <th style="padding: 15px; text-align: center;">LP</th>
                        <th style="padding: 15px; text-align: center;">승률</th>
                    </tr>
                </thead>
                <tbody class="ranking-body">
    `;

    pageData.forEach((player, index) => {
        const actualIndex = startIndex + index + 1;
        const total = player.wins + player.losses;
        const winRate = total > 0 ? ((player.wins / total) * 100).toFixed(1) : 0;

        let lpColor = "#8b5cf6";
        if (actualIndex <= 300) lpColor = "#ca8a04";
        else if (actualIndex <= 1000) lpColor = "#d33148";

        tableHtml += `
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="width: 60px; padding: 12px; color: #777; text-align: center;">${actualIndex}</td>
                <td style="padding: 12px; text-align: left; font-weight: bold; color: #ddd; padding-left: 30px;">
                    <span class="summoner-link" onclick="document.getElementById('summoner-input').value='${player.displayName}'; document.getElementById('search-btn').click();" title="${player.displayName} 검색">${player.displayName}</span>
                </td>
                <td style="padding: 12px; color: ${lpColor}; font-weight: bold; text-align: center;">${player.leaguePoints}</td>
                <td style="padding: 12px; text-align: left; padding-left: 20px;">
                    <span style="display: inline-block; width: 45px; text-align: right; color: ${winRate >= 55 ? '#f87171' : '#60a5fa'}">${winRate}%</span>
                    <span style="font-size: 11px; color: #555; margin-left: 8px;">(${player.wins}W ${player.losses}L)</span>
                </td>
            </tr>
        `;
    });

    tableHtml += `</tbody></table></div>`;

    let paginationHtml = `<div style="display: flex; justify-content: center; align-items: center; gap: 8px; margin-top: 20px; padding-bottom: 20px; flex-wrap: wrap;">`;
    const groupSize = 5;
    const currentGroup = Math.ceil(page / groupSize);
    const startPageOfGroup = (currentGroup - 1) * groupSize + 1;
    let endPageOfGroup = startPageOfGroup + groupSize - 1;
    if (endPageOfGroup > totalPages) endPageOfGroup = totalPages;

    if (currentGroup > 1) {
        const prevGroupLastPage = startPageOfGroup - 1;
        paginationHtml += `<button onclick="renderRankingPage(${prevGroupLastPage})" style="padding: 8px 14px; background: #1a1a2e; color: #fff; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; cursor: pointer; font-weight: bold;">&lt;</button>`;
    }

    for (let p = startPageOfGroup; p <= endPageOfGroup; p++) {
        const activeStyle = p === page
            ? "background: #6b46c1; color: white; border-color: #a78bfa;"
            : "background: #1a1a2e; color: #9aa4af; border-color: rgba(255,255,255,0.2);";
        paginationHtml += `<button onclick="renderRankingPage(${p})" style="padding: 8px 14px; border: 1px solid; border-radius: 4px; cursor: pointer; ${activeStyle}">${p}</button>`;
    }

    if (endPageOfGroup < totalPages) {
        const nextGroupFirstPage = endPageOfGroup + 1;
        paginationHtml += `<button onclick="renderRankingPage(${nextGroupFirstPage})" style="padding: 8px 14px; background: #1a1a2e; color: #fff; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; cursor: pointer; font-weight: bold;">&gt;</button>`;
    }

    paginationHtml += `</div>`;

    listDiv.innerHTML = tableHtml + paginationHtml;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

let currentMasterData = [];
let currentMasterSortCol = 'games';
let currentMasterSortAsc = false;
let currentChampId = '';
let currentChampName = '';

async function showMasters(requestedChampId = null) {
    // 메뉴를 가려도 /masters 주소를 직접 치면 들어올 수 있어서 여기서도 막는다
    if (HIDE_UNFINISHED_PAGES) { goLobby(); return; }

    if (!window.location.pathname.startsWith('/masters')) {
        window.history.pushState({ page: 'masters' }, '', requestedChampId ? `/masters/${requestedChampId}` : '/masters');
    }

    hideAllContainers();
    const mastersContainer = document.getElementById('masters-container');
    mastersContainer.style.display = "block";
    mastersContainer.innerHTML = "<div style='text-align:center; padding:100px 0; min-height:100vh; color:#9aa4af;'>데이터를 준비 중입니다...</div>";

    try {
        const ddragonRes = await fetch(`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/ko_KR/champion.json`);
        const ddragonData = await ddragonRes.json();

        let champList = [];
        for (let key in ddragonData.data) {
            const c = ddragonData.data[key];
            if (isClassicChamp(c.id)) continue;
            champList.push({ id: c.id, name: c.name });
        }
        champList.sort((a, b) => a.name.localeCompare(b.name, 'ko'));

        mastersContainer.innerHTML = `
            <div class="stats-header">
                <h1 class="ranking-title">한국서버 장인 랭킹</h1>
                <p style="color: #9aa4af; margin-top: 10px; font-size: 14px;">데이터베이스 이슈로 시즌15 마감기준 데이터가 제공됩니다.</p>
            </div>
            <div class="masters-wrap">
                <div class="masters-left"><div class="champ-grid" id="masters-champ-grid"></div></div>
                <div class="masters-right" id="masters-ranking-area"></div>
            </div>
        `;

        const grid = document.getElementById('masters-champ-grid');
        grid.innerHTML = champList.map(champ => `
            <div class="champ-grid-item" data-id="${champ.id}" data-name="${champ.name}" title="${champ.name}">
                <img src="https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${champ.id}.png" onerror="this.src='https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/profileicon/0.png'">
            </div>
        `).join('');

        const gridItems = document.querySelectorAll('.champ-grid-item');

        gridItems.forEach(item => {
            item.addEventListener('click', (e) => {
                gridItems.forEach(i => i.classList.remove('active'));
                const target = e.currentTarget;
                target.classList.add('active');

                const cid = target.dataset.id;
                const cname = target.dataset.name;

                const newUrl = `/masters/${cid}`;
                if (window.location.pathname !== newUrl) {
                    window.history.pushState({ page: 'masters', champ: cid }, '', newUrl);
                }

                renderMasterRanking(cname, cid);
            });
        });

        if (gridItems.length > 0) {
            let targetItem = null;
            if (requestedChampId) {
                targetItem = Array.from(gridItems).find(i => i.dataset.id.toLowerCase() === requestedChampId.toLowerCase());
            }

            if (!targetItem) {
                targetItem = Array.from(gridItems).find(i => i.dataset.id === 'Lulu');
                if (!targetItem) targetItem = gridItems[0];
            }

            targetItem.classList.add('active');

            const cid = targetItem.dataset.id;
            const newUrl = `/masters/${cid}`;
            if (window.location.pathname !== newUrl) {
                window.history.replaceState({ page: 'masters', champ: cid }, '', newUrl);
            }

            renderMasterRanking(targetItem.dataset.name, cid);
        }

    } catch (e) {
        mastersContainer.innerHTML = `<div style='text-align:center; padding:50px; color:#f87171;'>오류가 발생했습니다: ${e.message}</div>`;
    }
}

function renderMasterRanking(champName, champId) {
    currentChampId = champId;
    currentChampName = champName;
    currentMasterData = mastersData[champId] || [];
    currentMasterSortCol = 'games';
    currentMasterSortAsc = false;
    renderMasterTable();
}

window.sortMasterData = function (col) {
    if (currentMasterSortCol === col) currentMasterSortAsc = !currentMasterSortAsc;
    else { currentMasterSortCol = col; currentMasterSortAsc = false; }
    renderMasterTable();
};

function renderMasterTable() {
    const rankingArea = document.getElementById('masters-ranking-area');
    if (!currentMasterData || currentMasterData.length === 0) {
        rankingArea.innerHTML = `<div style="text-align:center; padding: 100px 0; color: #9aa4af;"><h2 style="color: #fff; margin-bottom: 10px;">데이터 준비 중</h2><p>아직 <b>${currentChampName}</b>의 장인 데이터가 수집되지 않았습니다.</p></div>`;
        return;
    }

    const getTierWeight = (tierStr) => {
        if (!tierStr) return 0;
        let t = tierStr.toUpperCase().trim();
        if (t === 'C' || t.includes('CHALLENGER')) return 100;
        if (t === 'GM' || t.includes('GRANDMASTER')) return 90;
        if (t === 'M' || t.includes('MASTER')) return 80;

        let baseScore = 0;
        if (t.startsWith('D')) baseScore = 70; else if (t.startsWith('E')) baseScore = 60; else if (t.startsWith('P')) baseScore = 50; else if (t.startsWith('G')) baseScore = 40; else if (t.startsWith('S')) baseScore = 30; else if (t.startsWith('B')) baseScore = 20; else if (t.startsWith('I')) baseScore = 10;

        let div = 0;
        if (t.includes('4') || t.endsWith('IV')) div = 1; else if (t.includes('3') || t.endsWith('III')) div = 2; else if (t.includes('2') || t.endsWith('II')) div = 3; else if (t.includes('1') || t.endsWith('I')) div = 4;
        return baseScore + div;
    };

    currentMasterData.sort((a, b) => {
        let valA = a[currentMasterSortCol], valB = b[currentMasterSortCol];
        if (currentMasterSortCol === 'tier') {
            valA = getTierWeight(valA); valB = getTierWeight(valB);
            if (valA === valB) return currentMasterSortAsc ? a.games - b.games : b.games - a.games;
        }
        if (valA < valB) return currentMasterSortAsc ? -1 : 1;
        if (valA > valB) return currentMasterSortAsc ? 1 : -1;
        return 0;
    });

    const getSortIcon = (col) => currentMasterSortCol !== col ? "<span style='color:#6b7280; font-size:11px; margin-left:4px;'>↕</span>" : (currentMasterSortAsc ? "<span style='color:#10b981; font-size:11px; margin-left:4px;'>▲</span>" : "<span style='color:#10b981; font-size:11px; margin-left:4px;'>▼</span>");
    const getFullTierName = (tierStr) => {
        if (!tierStr) return "";
        let t = tierStr.toUpperCase().trim();
        if (t === 'C' || t.includes('CHALLENGER')) return "Challenger"; if (t === 'GM' || t.includes('GRANDMASTER')) return "Grandmaster"; if (t === 'M' || t.includes('MASTER')) return "Master";
        let rank = "";
        if (t.startsWith('D')) rank = "Diamond"; else if (t.startsWith('E')) rank = "Emerald"; else if (t.startsWith('P')) rank = "Platinum"; else if (t.startsWith('G')) rank = "Gold"; else if (t.startsWith('S')) rank = "Silver"; else if (t.startsWith('B')) rank = "Bronze"; else if (t.startsWith('I')) rank = "Iron";
        if (!rank) return tierStr;
        let div = "";
        if (t.includes('4') || t.endsWith('IV')) div = "IV"; else if (t.includes('3') || t.endsWith('III')) div = "III"; else if (t.includes('2') || t.endsWith('II')) div = "II"; else if (t.includes('1') || t.endsWith('I')) div = "I";
        return div ? `${rank} ${div}` : rank;
    };

    let tableHtml = `
        <div style="overflow-x: auto;">
            <table class="master-table" style="min-width: 500px;">
                <thead>
                    <tr>
                        <th style="width: 8%; text-align: center;">#</th>
                        <th style="width: 40%;">소환사명</th>
                        <th style="width: 16%; cursor: pointer;" onclick="sortMasterData('tier')">티어 ${getSortIcon('tier')}</th>
                        <th style="width: 12%; text-align: center; cursor: pointer;" onclick="sortMasterData('games')">판수 ${getSortIcon('games')}</th>
                        <th style="width: 12%; text-align: center; cursor: pointer;" onclick="sortMasterData('winRate')">승률 ${getSortIcon('winRate')}</th>
                        <th style="width: 12%; text-align: center; cursor: pointer;" onclick="sortMasterData('kda')">평점 ${getSortIcon('kda')}</th>
                    </tr>
                </thead>
                <tbody>
    `;

    currentMasterData.forEach((player, index) => {
        let tierBadgeClass = "m";
        let tUpper = player.tier.toUpperCase();
        if (tUpper === "C" || tUpper.includes("CHALLENGER")) tierBadgeClass = "c"; else if (tUpper === "GM" || tUpper.includes("GRANDMASTER")) tierBadgeClass = "gm"; else if (tUpper.includes("D")) tierBadgeClass = "d"; else if (tUpper.includes("E")) tierBadgeClass = "e";

        const fullTierName = getFullTierName(player.tier);
        const lpDisplay = player.lp > 0 ? `<span style="font-weight: bold; color: #fff; font-size: 16px;">${player.lp} <span style="font-weight: normal; color: #9aa4af; font-size: 12px;">LP</span></span>` : '';

        tableHtml += `
            <tr>
                <td style="text-align: center; color: #fff; font-weight: bold;">${index + 1}</td>
                <td>
                    <div class="master-summoner">
                        <img src="https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${currentChampId}.png" onerror="this.src='https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/profileicon/0.png'">
                        <div><div class="summoner-link" onclick="document.getElementById('summoner-input').value='${player.name}'; document.getElementById('search-btn').click();" title="${player.name} 검색">${player.name}</div></div>
                    </div>
                </td>
                <td><div class="master-tier"><span class="tier-badge ${tierBadgeClass}" style="white-space: nowrap;">${fullTierName}</span> ${lpDisplay}</div></td>
                <td style="text-align: center; color: #e2e8f0;">${player.games}</td>
                <td style="text-align: center; color: #10b981; font-weight: bold;">${Number(player.winRate).toFixed(2)}%</td>
                <td style="text-align: center; color: #e2e8f0; font-weight: bold;">${Number(player.kda).toFixed(2)}</td>
            </tr>
        `;
    });

    tableHtml += `</tbody></table></div>`;
    rankingArea.innerHTML = tableHtml;
}

// ==========================================
// [8] 부가기능 (개인정보, 약관, 이메일복사 등)
// ==========================================
window.showPrivacyPolicy = function () {
    if (window.location.pathname !== '/privacy') window.history.pushState({ page: 'privacy' }, '', '/privacy');
    hideAllContainers();
    document.getElementById('privacy-container').style.display = "block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.showTerms = function () {
    if (window.location.pathname !== '/terms') window.history.pushState({ page: 'terms' }, '', '/terms');
    hideAllContainers();
    document.getElementById('terms-container').style.display = "block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.loadMythicShop = function () {
    const mythicItems = [
        { name: "와락!", price: 25, imgUrl: "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/loadouts/summoneremotes/events/spacegroove/spacegroove_blitzcrank_emote_inventory.png" },
        { name: "공격 준비 완료", price: 25, imgUrl: "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/loadouts/summoneremotes/tft/grindrewards/4488_ready_to_strike_inventory.png" },
        { name: "강타 준비됐어?", price: 25, imgUrl: "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/loadouts/summoneremotes/rewards/watchrewards/em_esports_graves_inventory.png" },
        { name: "천상비늘 잔나 크로마 아이콘", price: 5, imgUrl: "https://ddragon.leagueoflegends.com/cdn/14.4.1/img/profileicon/6512.png" }
    ];
    const meIcon = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/rarity-gem-icons/mythic.png";
    document.getElementById('mythic-items').innerHTML = mythicItems.map(item => `
        <div class="mythic-item-card">
            <div class="mythic-item-img-box"><img src="${item.imgUrl}" onerror="this.src='https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/hextech-images/chest.png'"></div>
            <div class="mythic-item-info">
                <span class="mythic-item-name" title="${item.name}">${item.name}</span>
                <div class="mythic-item-price"><img src="${meIcon}" style="width: 13px; height: 13px;"><span style="color: #facc15; font-size: 14px; font-weight: 700;">${item.price}</span></div>
            </div>
        </div>
    `).join('');
};

window.updateShopTimer = function () {
    const now = new Date();
    const nextReset = new Date();
    nextReset.setHours(9, 0, 0, 0);
    if (now > nextReset) nextReset.setDate(nextReset.getDate() + 1);

    const diff = nextReset - now;
    const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
    const minutes = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

    document.getElementById('shop-timer').innerText = `${hours}:${minutes}:${seconds} 뒤 초기화`;
};

window.copyEmail = function () {
    navigator.clipboard.writeText("00.y4no@gmail.com").then(() => {
        showErrorToast("이메일 주소(00.y4no@gmail.com)가 클립보드에 복사되었습니다.");
    }).catch(err => {
        showErrorToast("이메일 복사에 실패했습니다. 직접 복사해주세요: 00.y4no@gmail.com");
    });
};

window.switchDetailTab = async function (event, matchId, tabName) {
    const wrapper = event.target.closest('.match-detail');

    wrapper.querySelectorAll('.detail-tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    wrapper.querySelectorAll('.detail-tab-content').forEach(c => c.classList.remove('active'));
    wrapper.querySelector(`#tab-${tabName}-${matchId}`).classList.add('active');

    if (tabName !== 'analysis' && tabName !== 'build') return;

    const tl = await ensureTimeline(matchId);

    if (tabName === 'analysis') {
        const body = wrapper.querySelector(`#analysis-body-${matchId}`);
        if (!body || body.dataset.drawn) return;
        body.dataset.drawn = '1';

        if (!tl.goldFrames) {
            body.innerHTML = `<div style="text-align:center; color:#9aa4af; padding:40px;">그래프 데이터가 없습니다.</div>`;
            return;
        }

        renderTimelineTab(body, matchId, tl.goldFrames);
    }

    if (tabName === 'build') {
        const skillBody = wrapper.querySelector(`#skill-body-${matchId}`);
        const itemBody = wrapper.querySelector(`#item-body-${matchId}`);
        if (!skillBody || skillBody.dataset.drawn) return;
        skillBody.dataset.drawn = '1';

        const game = allMatches.find(m => m.matchId === matchId);
        const skillHtml = game ? buildSkillTableHtml(game, tl.myTimeline) : '';
        const itemHtml = buildItemOrderHtml(tl.myTimeline);

        skillBody.innerHTML = skillHtml || `<div style="text-align:center; color:#9aa4af; padding:30px;">데이터가 없습니다.</div>`;
        itemBody.innerHTML = itemHtml || `<div style="text-align:center; color:#9aa4af; padding:30px;">데이터가 없습니다.</div>`;
    }
};

// ==========================================
// 상세 표 가운데 팀 요약 (밴 / 오브젝트)
// ==========================================
// 밴을 안 한 자리에 쓰는 빈 초상화 (인게임 밴 슬롯과 같은 이미지)
const EMPTY_CHAMP_ICON = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/-1.png';

// 아이콘은 미니맵 실루엣이라 원본 색이 흰색이다.
// CSS mask로 팀 색을 입히므로 여기서는 파일 이름만 갖는다.
// 나중에 public/ 로 옮기려면 이 상수만 '/objectives/' 로 바꾸면 된다.
const OBJECTIVE_ICON_BASE = '/objectives/';

const OBJECTIVE_LABELS = [
    ['baron', '내셔 남작', 'baron'],
    ['elderDragon', '장로 드래곤', 'dragon_elder'],
    ['riftHerald', '협곡의 전령', 'riftherald'],
    ['horde', '공허 유충', 'grub'],
    ['dragon', '드래곤', 'dragon'],
    ['tower', '포탑', 'tower'],
    ['inhibitor', '억제기', 'inhibitor']
];

function renderTeamSummaryRow(game) {
    const stats = game.teamStats || [];
    if (stats.length === 0) return '';

    const blue = stats.find(t => t.teamId === 100);
    const red = stats.find(t => t.teamId === 200);
    if (!blue || !red) return '';

    // 밴도 오브젝트도 전부 0이면(칼바람 등) 줄 자체를 만들지 않는다
    const totalBans = blue.bans.length + red.bans.length;
    const totalObj = [blue, red].reduce((sum, t) =>
        sum + Object.values(t.objectives || {}).reduce((a, b) => a + b, 0), 0);
    if (totalBans === 0 && totalObj === 0) return '';

    // 밴이 아예 없는 모드(칼바람·신속대전 등)는 자리만 비운다. 안내 문구도 넣지 않는다.
    const banHtml = (ids) => ids.length === 0
        ? ''
        : ids.map(id => {
            // championId가 -1이면 시간 초과로 밴을 못 한 것. 인게임처럼 빈 초상화를 띄운다.
            if (!id || id <= 0) {
                return `<img class="ts-ban ts-ban-empty" src="${EMPTY_CHAMP_ICON}">`;
            }
            const eng = championIdMap[id];
            return `<img class="ts-ban" src="https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${eng}.png"
                         title="${(eng && window.korChampMap[eng]) || ''}" onerror="this.src='${EMPTY_CHAMP_ICON}'">`;
        }).join('');

    const objHtml = (t) => OBJECTIVE_LABELS.map(([key, label, icon]) => {
        const n = t.objectives[key] || 0;
        return `
            <span class="ts-obj ${n === 0 ? 'zero' : ''}" data-tooltip="${label}">
                <span class="ts-obj-icon" style="--obj-icon:url('${OBJECTIVE_ICON_BASE}${icon}.png');"></span>
                <span class="ts-obj-val">${n}</span>
            </span>`;
    }).join('');

    const side = (t, name, cls) => `
        <div class="ts-row ${cls}">
            <span class="ts-side">${name}</span>
            <div class="ts-bans">${banHtml(t.bans)}</div>
            <div class="ts-objs">${objHtml(t)}</div>
        </div>`;

    return `
        <tbody class="team-summary">
            <tr>
                <td colspan="10">
                    <div class="ts-box">
                        ${side(blue, '블루팀', 'blue')}
                        ${side(red, '레드팀', 'red')}
                    </div>
                </td>
            </tr>
        </tbody>`;
}

// ==========================================
// 라인 정렬 / 포지션 판정
// ==========================================
const LANE_ORDER = { TOP: 0, JUNGLE: 1, MIDDLE: 2, BOTTOM: 3, UTILITY: 4 };

// teamPosition이 없는 모드(칼바람·아레나)나 판정 실패 시에는 원래 순서를 유지한다.
function sortByLane(list) {
    if (!list.every(p => p.teamPosition && LANE_ORDER[p.teamPosition] !== undefined)) return list;
    return list.slice().sort((a, b) => LANE_ORDER[a.teamPosition] - LANE_ORDER[b.teamPosition]);
}

// 선호 포지션 집계용. 라이엇 판정을 우선 쓰고, 없을 때만 예전 추측 방식으로 넘어간다.
const POS_KEY = { TOP: 'top', JUNGLE: 'jungle', MIDDLE: 'mid', BOTTOM: 'adc', UTILITY: 'support' };

// ==========================================
// 전적 박스 뱃지
//   1위 판정은 모두 "그 경기 전체 플레이어" 기준이다. (같은 팀이 아니라)
//   동점이면 여럿에게 붙는다.
// ==========================================
function buildBadges(game, isArena, isAram) {
    const all = game.participants || [];
    const me = all.find(p => p.isSearchedUser);
    if (!me) return `<div class="pix-badges"></div>`;

    // 전체 최댓값. 값이 0뿐인 경기에는 뱃지를 주지 않는다.
    const topOf = (key) => {
        const max = Math.max(...all.map(p => Number(p[key]) || 0));
        return max > 0 && (Number(me[key]) || 0) === max;
    };

    const badges = [];
    const add = (cls, text) => badges.push(`<div class="pix-badge ${cls}">${text}</div>`);

    if (isArena || isAram) {
        // 아레나·칼바람: 라인·시야·오브젝트 개념이 없어서 전투 지표만 쓴다
        if (topOf('damage')) add('dmg-top', '딜량 1위');
        if (topOf('damageTaken')) add('tank-top', '탱킹 1위');
        if (topOf('kills')) add('kill-top', '킬 1위');
        if (topOf('assists')) add('assist-top', '도움 1위');
        // 처형·포탑 사망은 빼고 적 챔피언에게 죽은 적이 없을 때
        if ((me.champDeaths ?? me.deaths) === 0) add('no-death', '노데스');
        if (me.kp === 100) add('domination', '장악');

    } else {
        if (me.firstBlood) add('first-blood', '선취점');
        if (me.firstBloodAssist) add('first-blood-assist', '선취점 도움');
        if (me.multiKill) add('multi-kill', me.multiKill);
        if (topOf('damage')) add('dmg-top', '딜량 1위');
        if (me.soloKills > 0) add('solo-kill', `솔로킬 ${me.soloKills}`);
        if (me.steals > 0) add('steal', `스틸 ${me.steals}`);
        if (topOf('visionScore')) add('vision-top', '시야 1위');
        if (me.kp === 100) add('domination', '장악');
    }

    return `<div class="pix-badges">${badges.join('')}</div>`;
}

// ==========================================
// 진행 중인 게임 (Spectator)
// ==========================================
let liveGameData = null;
let liveGameOpen = false;

async function checkLiveGame(puuid) {
    const btn = document.getElementById('live-btn');
    const area = document.getElementById('live-game-area');
    if (!btn || !puuid) return;

    liveGameData = null;
    liveGameOpen = false;
    if (area) area.innerHTML = '';
    if (window.liveTimerInterval) clearInterval(window.liveTimerInterval);

    btn.disabled = true;
    btn.classList.remove('in-game');
    btn.title = '확인 중...';

    try {
        const res = await fetch(`/api/live/${puuid}`);
        const json = await res.json();

        if (json.inGame && json.game) {
            liveGameData = json.game;
            btn.disabled = false;
            btn.classList.add('in-game');
            btn.title = '진행 중인 게임 보기';
        } else {
            // 게임 중이 아닌 것과 조회 실패는 화면상 똑같이 회색이라, 이유를 툴팁으로 구분한다
            btn.title = '현재 게임 중이 아닙니다';
        }
    } catch (e) {
        btn.title = '인게임 정보를 불러올 수 없습니다';
    }
}

window.toggleLiveGamePanel = function () {
    const area = document.getElementById('live-game-area');
    if (!area || !liveGameData) return;

    liveGameOpen = !liveGameOpen;

    if (!liveGameOpen) {
        area.innerHTML = '';
        if (window.liveTimerInterval) clearInterval(window.liveTimerInterval);
        return;
    }

    area.innerHTML = renderLiveGameHtml(liveGameData);

    // 경과 시간을 1초마다 갱신
    const startedAt = Date.now() - liveGameData.gameLength * 1000;
    const tick = () => {
        const el = document.getElementById('live-timer');
        if (!el) { clearInterval(window.liveTimerInterval); return; }
        const sec = Math.floor((Date.now() - startedAt) / 1000);
        el.innerText = `${Math.floor(sec / 60)}분 ${String(sec % 60).padStart(2, '0')}초`;
    };
    tick();
    if (window.liveTimerInterval) clearInterval(window.liveTimerInterval);
    window.liveTimerInterval = setInterval(tick, 1000);
};

function liveChampIcon(championId) {
    const engName = championIdMap[championId];
    return engName
        ? `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${engName}.png`
        : `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/profileicon/0.png`;
}

function liveRuneIcon(id) {
    return runePathMap[id]
        ? `https://ddragon.leagueoflegends.com/cdn/img/${runePathMap[id]}`
        : '';
}

function liveChampKorName(championId) {
    const engName = championIdMap[championId];
    return (engName && window.korChampMap[engName]) || engName || '알 수 없음';
}

// 룬이 없는 모드. 관전 API가 기본값을 채워 보내서 그냥 두면 엉뚱한 룬이 뜬다.
const LIVE_NO_RUNE_QUEUES = new Set([
    4310,   // 클래식 5대5
    2400,   // 무작위 총력전: 아수라장
    2450    // 아수라장 클래식 스타일
]);   // 일반 칼바람(450/720)은 룬이 있으므로 제외

function renderLivePlayer(p, side, showRunes = true) {
    // 스트리머 모드(Riot ID 익명화)를 켠 사람은 riotId가 비어서 온다.
    // 이름 자리를 챔피언 이름으로 채운다. (포우·op.gg도 같은 방식)
    const anon = !p.riotId || !p.riotId.trim();
    const name = anon ? liveChampKorName(p.championId) : (p.riotId.split('#')[0] || '알 수 없음');
    const tag = anon ? '' : (p.riotId.split('#')[1] || '');

    const champ = `<img class="live-champ" src="${liveChampIcon(p.championId)}" onerror="this.style.visibility='hidden'">`;
    const spells = `
        <div class="live-spells">
            ${spellImg(p.spell1)}
            ${spellImg(p.spell2)}
        </div>`;
    const runes = !showRunes ? '' : `
        <div class="live-runes">
            ${p.mainRune ? `<img src="${liveRuneIcon(p.mainRune)}" onerror="this.style.visibility='hidden'">` : '<span></span>'}
            ${p.subStyle ? `<img src="${liveRuneIcon(p.subStyle)}" onerror="this.style.visibility='hidden'">` : '<span></span>'}
        </div>`;
    const nameHtml = `
        <div class="live-name" title="${anon ? '비공개' : p.riotId}">
            <span class="live-name-main${anon ? ' anon' : ''}">${name}</span>${tag ? `<span class="live-name-tag">#${tag}</span>` : ''}
        </div>`;

    // 익명 사용자는 검색할 대상이 없으므로 클릭을 막는다
    const clickAttr = anon
        ? 'class="live-player %SIDE% anon" title="Riot ID를 비공개한 사용자입니다"'
        : `class="live-player %SIDE%" onclick="searchSummonerFromLive('${(p.riotId || '').replace(/'/g, "\\'")}')"`;

    // 블루팀은 오른쪽 정렬, 레드팀은 왼쪽 정렬로 가운데를 향하게 배치
    return side === 'blue'
        ? `<div ${clickAttr.replace('%SIDE%', 'blue')}>
               ${runes}${spells}${nameHtml}${champ}
           </div>`
        : `<div ${clickAttr.replace('%SIDE%', 'red')}>
               ${champ}${nameHtml}${spells}${runes}
           </div>`;
}

window.searchSummonerFromLive = function (riotId) {
    if (!riotId) return;
    document.getElementById('summoner-input').value = riotId;
    document.getElementById('search-btn').click();
};

// 인게임 패널은 공간이 넉넉해서 전적 목록보다 정식 명칭을 쓴다.
const LIVE_QUEUE_NAMES = {
    '솔로랭크': '개인/2인 랭크 게임',
    '자유랭크': '자유 랭크 게임',
    '칼바람': '무작위 총력전',
    '아수라장': '무작위 총력전: 아수라장',
    '아수라장(클래식)': '무작위 총력전: 아수라장 클래식 스타일',
    '아레나': '아레나 3x6',
    '일반(교차)': '일반 (교차 선택)',
    '일반(신속)': '일반 (신속 대전)',
    '봇전(입문)': '봇전 (입문)',
    '봇전(초보)': '봇전 (초보)',
    '봇전(중급)': '봇전 (중급)'
};

const LIVE_MAP_NAMES = {
    11: '소환사의 협곡',
    12: '무작위 맵',
    30: '아레나',
    453: '소환사의 협곡 (클래식)'
};

// 같은 mapId라도 모드에 따라 부르는 이름이 다른 경우
const LIVE_MAP_BY_QUEUE = {
    4310: '소환사의 협곡 (클래식)'
};

// 아레나는 3인 6팀이라 좌우 세 팀씩 나눠 놓는다.
function renderLiveArenaSide(teams) {
    return `
        <div class="live-arena-side">
            ${teams.map(t => `
                <div class="live-arena-team">
                    <span class="live-arena-no ${placementClass(t.id)}">${t.id}</span>
                    <div class="live-arena-players">
                        ${t.players.map(p => {
                            const anon = !p.riotId || !p.riotId.trim();
                            const name = anon ? liveChampKorName(p.championId) : p.riotId.split('#')[0];
                            const tag = anon ? '' : (p.riotId.split('#')[1] || '');
                            const click = anon ? '' : `onclick="searchSummonerFromLive('${(p.riotId || '').replace(/'/g, "\\'")}')"`;
                            return `
                                <div class="live-arena-player ${anon ? 'anon' : ''}" ${click} title="${anon ? '비공개' : p.riotId}">
                                    <img src="${liveChampIcon(p.championId)}" onerror="this.style.visibility='hidden'">
                                    <span class="live-arena-name">${name}</span>${tag ? `<span class="live-arena-tag">#${tag}</span>` : ''}
                                </div>`;
                        }).join('')}
                    </div>
                </div>`).join('')}
        </div>`;
}

function renderLiveGameHtml(g) {
    // 밴이 없는 모드는 줄 자체를 만들지 않는다.
    // 밴 슬롯은 있는데 시간 초과로 못 한 자리(-1)는 빈 초상화로 채운다.
    const banHtml = (ids) => ids.length === 0
        ? ''
        : ids.map(id => (!id || id <= 0)
            ? `<img class="live-ban live-ban-empty" src="${EMPTY_CHAMP_ICON}">`
            : `<img class="live-ban" src="${liveChampIcon(id)}" onerror="this.src='${EMPTY_CHAMP_ICON}'">`).join('');

    const hasBans = g.bans.blue.length > 0 || g.bans.red.length > 0;
    const showRunes = !LIVE_NO_RUNE_QUEUES.has(g.queueId);

    // 서버가 추정한 라인 순으로 세운다. 추정이 안 된 모드는 원래 순서를 유지한다.
    const byLane = (arr) => arr.every(p => p.position && LANE_ORDER[p.position] !== undefined)
        ? arr.slice().sort((a, b) => LANE_ORDER[a.position] - LANE_ORDER[b.position])
        : arr;

    const blueTeam = byLane(g.teams.blue);
    const redTeam = byLane(g.teams.red);

    return `
        <div class="live-game-box">
            ${g.isArena && g.subteams
            ? renderLiveArenaSide(g.subteams.slice(0, 3))
            : `<div class="live-team blue">
                ${blueTeam.map(p => renderLivePlayer(p, 'blue', showRunes)).join('')}
            </div>`}

            <div class="live-center">
                <div class="live-queue">${LIVE_QUEUE_NAMES[g.queueName] || g.queueName}</div>
                <div class="live-map">&lt; ${LIVE_MAP_BY_QUEUE[g.queueId] || LIVE_MAP_NAMES[g.mapId] || '소환사의 협곡'} &gt;</div>
                ${!hasBans ? '' : (g.isArena
                    // 아레나는 18명이라 한 줄로 늘어놓으면 너무 길다. 3개씩 끊는다.
                    ? `<div class="live-bans arena">${banHtml(g.bans.blue.concat(g.bans.red))}</div>`
                    : `<div class="live-bans">
                    <div class="live-ban-row">${banHtml(g.bans.blue)}</div>
                    <div class="live-ban-row">${banHtml(g.bans.red)}</div>
                </div>`)}
                <div class="live-timer" id="live-timer">-</div>
            </div>

            ${g.isArena && g.subteams
            ? renderLiveArenaSide(g.subteams.slice(3, 6))
            : `<div class="live-team red">
                ${redTeam.map(p => renderLivePlayer(p, 'red', showRunes)).join('')}
            </div>`}
        </div>`;
}

// ==========================================
// 타임라인 탭 (팀 골드 / 골드 격차 / 챔피언별 골드)
// ==========================================

// 챔피언별 골드 선 색. 앞 5개가 블루팀, 뒤 5개가 레드팀.
const CHAMP_LINE_COLORS = [
    '#5383e8', '#38bdf8', '#2dd4bf', '#4ade80', '#a3e635',
    '#e84057', '#fb7185', '#f97316', '#facc15', '#c084fc'
];

// 세 그래프가 공유하는 축·툴팁 설정
function timelineChartScales() {
    return {
        x: { ticks: { color: '#9aa4af', maxTicksLimit: 12 }, grid: { color: 'rgba(255,255,255,0.05)' } },
        y: { ticks: { color: '#9aa4af', callback: (v) => (v / 1000).toFixed(0) + 'k' }, grid: { color: 'rgba(255,255,255,0.05)' } }
    };
}

window.champGoldCharts = window.champGoldCharts || {};

function renderTimelineTab(body, matchId, gf) {
    const players = gf.players || [];

    // 챔피언 토글 버튼 (블루 5 / 레드 5). 골드용과 경험치용을 따로 만든다.
    const toggleRow = (kind) => `
        <div class="tl-toggle-row" data-kind="${kind}">
            ${players.map((p, i) => `
                <button class="tl-champ-toggle" data-pid="${p.id}" data-kind="${kind}"
                        style="--line-color:${CHAMP_LINE_COLORS[i] || '#888'}"
                        onclick="toggleChampLine('${matchId}', ${p.id}, '${kind}')"
                        title="${p.name || p.champ}">
                    <img src="https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${p.champ}.png"
                         onerror="this.style.visibility='hidden'">
                </button>`).join('')}
        </div>`;

    body.innerHTML = `
        <h4 class="tl-chart-title">시간대별 팀 골드</h4>
        <div class="tl-chart"><canvas id="gold-chart-${matchId}"></canvas></div>

        <h4 class="tl-chart-title">골드 격차</h4>
        <div class="tl-chart">
            <canvas id="golddiff-chart-${matchId}"></canvas>
            <div class="tl-obj-layer" id="golddiff-objs-${matchId}"></div>
        </div>

        ${players.length === 0 ? '' : `
        <h4 class="tl-chart-title">챔피언별 골드</h4>
        ${toggleRow('gold')}
        <div class="tl-chart"><canvas id="champgold-chart-${matchId}"></canvas></div>

        <h4 class="tl-chart-title">챔피언별 경험치</h4>
        ${toggleRow('xp')}
        <div class="tl-chart"><canvas id="champxp-chart-${matchId}"></canvas></div>`}
    `;

    // ---- 1. 팀 골드 ----
    new Chart(body.querySelector(`#gold-chart-${matchId}`), {
        type: 'line',
        data: {
            labels: gf.labels,
            datasets: [
                { label: '블루팀', data: gf.blue, borderColor: '#5383e8', backgroundColor: 'rgba(83, 131, 232, 0.1)', fill: true, tension: 0.3, pointRadius: 1 },
                { label: '레드팀', data: gf.red, borderColor: '#e84057', backgroundColor: 'rgba(232, 64, 87, 0.1)', fill: true, tension: 0.3, pointRadius: 1 }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: { labels: { color: '#9aa4af' } },
                tooltip: { callbacks: { label: (ctx) => ctx.dataset.label + ': ' + ctx.raw.toLocaleString() + ' G' } }
            },
            scales: timelineChartScales()
        }
    });

    // ---- 2. 골드 격차 (블루 - 레드) ----
    const diff = gf.blue.map((v, i) => v - (gf.red[i] || 0));
    const diffChart = new Chart(body.querySelector(`#golddiff-chart-${matchId}`), {
        type: 'line',
        data: {
            labels: gf.labels,
            datasets: [{
                label: '골드 격차',
                data: diff,
                borderColor: '#5383e8',
                borderWidth: 2,
                tension: 0.3,
                pointRadius: 1,
                // 점은 segment 설정을 안 따르고 borderColor를 쓴다. 따로 지정해야 한다.
                pointBackgroundColor: (ctx) => (diff[ctx.dataIndex] ?? 0) >= 0 ? '#5383e8' : '#e84057',
                pointBorderColor: (ctx) => (diff[ctx.dataIndex] ?? 0) >= 0 ? '#5383e8' : '#e84057',
                // 구간별로 0 위/아래를 판정해 선 색을 바꾼다
                segment: {
                    borderColor: (ctx) => {
                        const mid = (ctx.p0.parsed.y + ctx.p1.parsed.y) / 2;
                        return mid >= 0 ? '#5383e8' : '#e84057';
                    }
                },
                // 0선을 기준으로 위는 파랑, 아래는 빨강으로 채운다
                fill: {
                    value: 0,
                    above: 'rgba(83, 131, 232, 0.25)',
                    below: 'rgba(232, 64, 87, 0.25)'
                }
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (ctx) => {
                            const v = ctx.raw;
                            if (v === 0) return '격차 없음';
                            const team = v > 0 ? '블루팀' : '레드팀';
                            return `${team} +${Math.abs(v).toLocaleString()} G`;
                        }
                    }
                }
            },
            scales: {
                x: { ticks: { color: '#9aa4af', maxTicksLimit: 12 }, grid: { color: 'rgba(255,255,255,0.05)' } },
                y: {
                    ticks: { color: '#9aa4af', callback: (v) => (v / 1000).toFixed(1) + 'k' },
                    grid: { color: (ctx) => ctx.tick.value === 0 ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.05)' }
                }
            }
        }
    });

    // 골드 격차 그래프 위에 오브젝트 처치 표시.
    // 축이 확정된 뒤여야 좌표가 맞아서, 애니메이션 완료 시점과 리사이즈 때 다시 배치한다.
    const drawObjMarkers = placeObjectiveMarkers(matchId, diffChart, gf);
    if (drawObjMarkers) {
        if (diffChart.options.animation) diffChart.options.animation.onComplete = drawObjMarkers;
        diffChart.options.onResize = () => requestAnimationFrame(drawObjMarkers);
        diffChart.update('none');   // 애니메이션 없이 즉시 렌더 -> 축 좌표가 바로 확정된다
        requestAnimationFrame(drawObjMarkers);
        setTimeout(drawObjMarkers, 1100);   // 애니메이션이 끝난 뒤 한 번 더 보정
    }

    // ---- 3. 챔피언별 골드 ----
    if (players.length > 0) {
        const makeChart = (canvasId, unit) => new Chart(body.querySelector(canvasId), {
            type: 'line',
            data: { labels: gf.labels, datasets: [] },
            options: {
                responsive: true, maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                plugins: {
                    legend: { labels: { color: '#9aa4af', boxWidth: 12 } },
                    tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.raw.toLocaleString()} ${unit}` } }
                },
                scales: timelineChartScales()
            }
        });

        window.champGoldCharts[matchId] = {
            charts: {
                gold: makeChart(`#champgold-chart-${matchId}`, 'G'),
                xp: makeChart(`#champxp-chart-${matchId}`, 'XP')
            },
            players,
            root: body
        };

        // 검색한 소환사가 있으면 두 그래프 모두 기본으로 켜둔다
        const game = allMatches.find(m => m.matchId === matchId);
        const meIdx = game ? game.participants.findIndex(p => p.isSearchedUser) : -1;
        if (meIdx > -1 && players[meIdx]) {
            toggleChampLine(matchId, players[meIdx].id, 'gold');
            toggleChampLine(matchId, players[meIdx].id, 'xp');
        }
    }
}

// kind('gold' | 'xp')별로 독립 동작한다. 두 그래프는 서로 영향을 주지 않는다.
// 골드 격차 그래프의 0선 위에 오브젝트 처치 아이콘을 얹는다.
//   캔버스에 직접 그리지 않고 HTML을 겹치는 이유:
//   팀 색 마스크와 data-tooltip을 그대로 재사용할 수 있고, 클릭·호버 판정이 공짜다.
const OBJ_MARKER_MAP = {
    BARON_NASHOR: ['내셔 남작', 'baron'],
    RIFTHERALD: ['협곡의 전령', 'riftherald'],
    HORDE: ['공허 유충', 'grub'],
    DRAGON: ['드래곤', 'dragon'],
    ELDER_DRAGON: ['장로 드래곤', 'dragon_elder']
};

function placeObjectiveMarkers(matchId, chart, gf) {
    const layer = document.getElementById(`golddiff-objs-${matchId}`);
    if (!layer) return;

    const events = (gf.objectives || []).slice().sort((a, b) => a.t - b.t);
    if (events.length === 0) return;

    let lastKey = '';

    const draw = () => {
        const xs = chart.scales.x, ys = chart.scales.y;
        if (!xs || !ys || !chart.chartArea) return;

        const lastIdx = gf.labels.length - 1;
        const zeroY = ys.getPixelForValue(0);

        // 축이 그대로면 다시 그리지 않는다.
        // 매 프레임 새로 만들면 마우스를 올린 요소가 사라져 툴팁이 깜빡인다.
        const key = `${Math.round(zeroY)}|${Math.round(chart.chartArea.left)}|${Math.round(chart.chartArea.right)}`;
        if (key === lastKey) return;
        lastKey = key;

        layer.innerHTML = '';

        // 분 단위 소수 위치를 픽셀로. 라벨이 1분 간격이라 두 눈금 사이를 비례 배분한다.
        const xPixel = (minute) => {
            const i = Math.min(Math.floor(minute), lastIdx);
            const a = xs.getPixelForValue(i);
            const b = xs.getPixelForValue(Math.min(i + 1, lastIdx));
            return a + (b - a) * (minute - i);
        };

        // 높이는 딱 두 가지다. 블루는 0선 살짝 위, 레드는 살짝 아래.
        // 그래프의 "위=블루 / 아래=레드" 의미와도 맞고, 같은 시각에 양 팀이 먹어도 겹치지 않는다.
        const OFFSET = 9;

        events.forEach(ev => {
            const info = OBJ_MARKER_MAP[ev.subType === 'ELDER_DRAGON' ? 'ELDER_DRAGON' : ev.type];
            if (!info) return;   // 포탑·억제기 등은 표시하지 않음

            const [label, icon] = info;
            const isBlue = ev.teamId === 100;
            const x = xPixel(ev.t / 60000);
            const y = isBlue ? zeroY - OFFSET : zeroY + OFFSET;

            const sec = Math.floor(ev.t / 1000);
            const timeText = `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;

            // 바깥은 툴팁 담당, 안쪽은 아이콘 담당.
            // mask는 자식과 ::after까지 잘라내므로, 툴팁을 가진 요소에 mask를 걸면 안 된다.
            layer.insertAdjacentHTML('beforeend', `
                <span class="tl-obj-marker ${isBlue ? 'blue' : 'red'}"
                      style="left:${x}px; top:${y}px;"
                      data-tooltip="${isBlue ? '블루팀' : '레드팀'} ${label} 처치 (${timeText})">
                    <span class="tl-obj-marker-icon" style="--obj-icon:url('${OBJECTIVE_ICON_BASE}${icon}.png');"></span>
                </span>`);
        });
    };

    // 차트가 그려진 뒤의 좌표라야 정확하다.
    // chart.draw를 덮어쓰면 Chart.js 내부 동작이 깨지므로 건드리지 않는다.
    return draw;
}

window.toggleChampLine = function (matchId, pid, kind) {
    const ctx = window.champGoldCharts[matchId];
    if (!ctx) return;

    const { charts, players, root } = ctx;
    const chart = charts[kind];
    if (!chart) return;

    const idx = players.findIndex(p => p.id === pid);
    if (idx === -1) return;

    const p = players[idx];
    const existing = chart.data.datasets.findIndex(d => d._pid === pid);

    if (existing > -1) {
        chart.data.datasets.splice(existing, 1);
    } else {
        chart.data.datasets.push({
            _pid: pid,
            label: p.name || p.champ,
            data: (kind === 'xp' ? p.xp : p.gold) || [],
            borderColor: CHAMP_LINE_COLORS[idx] || '#888',
            backgroundColor: 'transparent',
            borderWidth: 2, tension: 0.3, pointRadius: 0
        });
    }
    chart.update();

    // 해당 종류의 버튼만 상태를 바꾼다
    const btn = root.querySelector(`.tl-champ-toggle[data-pid="${pid}"][data-kind="${kind}"]`);
    if (btn) btn.classList.toggle('active', existing === -1);
};

// ==========================================
// ★ 챔피언 목록 및 상세 페이지 로직
// ==========================================
async function showChampions(requestedChampId = null, classicMode = false) {
    currentChampMode = classicMode ? 'classic' : 'normal';
    if (!window.location.pathname.startsWith('/champions')) {
        window.history.pushState({ page: 'champions' }, '', requestedChampId ? `/champions/${requestedChampId}` : '/champions');
    }

    hideAllContainers();
    const champsContainer = document.getElementById('champions-container');
    champsContainer.style.display = "block";
    champsContainer.innerHTML = "<div style='text-align:center; padding:100px 0; color:#9aa4af;'>챔피언 데이터를 불러오는 중입니다...</div>";

    try {
        const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/ko_KR/champion.json`);
        const data = await res.json();

        let champList = [];
        for (let key in data.data) {
            const c = data.data[key];
            // 클래식 탭이면 Jade_ 계열만, 정규 탭이면 그 외만
            if (isClassicChamp(c.id) !== classicMode) continue;
            champList.push({ id: c.id, name: c.name });
        }

        // 예전에는 Data Dragon 이 신규 챔피언을 늦게 올려서 목록에 손으로 넣어 뒀다.
        // 지금은 champion.json 이 전부 포함하고 있어 그대로 쓴다.
        // 새 챔피언이 안 보이면 Data Dragon 반영을 기다리면 된다.

        champList.sort((a, b) => a.name.localeCompare(b.name, 'ko-KR'));

        if (champList.length === 0) {
            champsContainer.innerHTML = `<div style='text-align:center; padding:100px 0; min-height:60vh; color:#9aa4af;'>표시할 챔피언이 없습니다.</div>`;
            return;
        }

        let html = `
            <div class="stats-header" id="champ-page-header" style="margin-bottom: 20px; display: flex; align-items: center; justify-content: center; gap: 15px; height: 80px;">
                <h1 class="ranking-title">${classicMode ? '챔피언 정보 (클래식)' : '챔피언 정보'}</h1>
            </div>
            
            <div style="display: flex; gap: 20px; align-items: flex-start; width: 100%;">
                <div style="width: 280px; flex-shrink: 0; background: #1a1a2e; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; height: 75vh; overflow-y: auto; padding: 15px; display: flex; flex-direction: column; gap: 6px;">
        `;

        html += champList.map(champ => `
            <div onclick="selectChampion('${champ.id}', '${champ.name}')" id="champ-item-${champ.id}" class="champ-sidebar-item" 
                 style="display: flex; align-items: center; gap: 12px; padding: 8px 12px; background: rgba(255,255,255,0.02); border: 1px solid transparent; border-radius: 8px; cursor: pointer; transition: all 0.2s;"
                 onmouseover="if(!this.classList.contains('active')) this.style.background='rgba(255,255,255,0.08)'" 
                 onmouseout="if(!this.classList.contains('active')) this.style.background='rgba(255,255,255,0.02)'">
                <img src="https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${champ.id}.png" onerror="this.src='https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/profileicon/0.png'" style="width: 40px; height: 40px; border-radius: 6px; object-fit: cover;">
                <div style="font-size: 14px; font-weight: bold; color: #fff;">${champ.name}</div>
            </div>
        `).join('');

        html += `
                </div>
                <div id="champ-detail-area" style="flex: 1; background: #1a1a2e; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; height: 75vh; display: flex; align-items: center; justify-content: center; flex-direction: column;">
                    <img src="https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/profileicon/0.png" style="width: 80px; opacity: 0.3; margin-bottom: 20px;">
                    <div style="color: #9aa4af; font-size: 18px;">👈 왼쪽에서 챔피언을 선택해주세요.</div>
                </div>
            </div>
        `;
        champsContainer.innerHTML = html;

        if (requestedChampId) {
            const target = champList.find(c => c.id.toLowerCase() === requestedChampId.toLowerCase());
            if (target) selectChampion(target.id, target.name, true);
            else selectChampion(champList[0].id, champList[0].name, true);
        } else {
            selectChampion(champList[0].id, champList[0].name, true);
        }

    } catch (e) { champsContainer.innerHTML = `<div style='text-align:center; padding:50px; color:#f87171;'>데이터를 불러오지 못했습니다.</div>`; }
}

window.selectChampion = async function (champId, champName, isReplace = false) {
    const basePath = currentChampMode === 'classic' ? '/champions-classic' : '/champions';
    const newUrl = `${basePath}/${champId}`;
    if (window.location.pathname !== newUrl) {
        if (isReplace) {
            window.history.replaceState({ page: 'champions', champ: champId }, '', newUrl);
        } else {
            window.history.pushState({ page: 'champions', champ: champId }, '', newUrl);
        }
    }

    document.querySelectorAll('.champ-sidebar-item').forEach(el => {
        el.classList.remove('active');
        el.style.borderColor = 'transparent'; el.style.background = 'rgba(255,255,255,0.02)';
    });
    const targetEl = document.getElementById(`champ-item-${champId}`);
    if (targetEl) {
        targetEl.classList.add('active');
        targetEl.style.borderColor = '#a78bfa'; targetEl.style.background = 'rgba(167, 139, 250, 0.1)';
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    const detailArea = document.getElementById('champ-detail-area');
    detailArea.innerHTML = `<div style="color:#9aa4af; font-size:18px;">${champName} 상세 정보를 불러오는 중...</div>`;

    try {
        const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/ko_KR/champion/${champId}.json`);
        const data = await res.json();
        const champ = data.data[champId];

        const header = document.getElementById('champ-page-header');
        if (header) {
            header.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; gap: 15px;">
                    <img src="https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${champId}.png" style="width: 56px; height: 56px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">
                    <div style="text-align: left; display: flex; align-items: center; gap: 15px;">
                        <div>
                            <div style="color: #a78bfa; font-weight: bold; font-size: 13px; margin-bottom: 2px;">${champ.title}</div>
                            <h2 style="color: #fff; font-size: 26px; margin: 0; line-height: 1;">${champ.name}</h2>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 4px; margin-top: 2px;">
                            <button onclick="playChampVoice('${champ.key}', 'pick')" style="background: #2b1a52; border: 1px solid #6b46c1; color: #fff; border-radius: 4px; padding: 2px 10px; font-size: 10px; font-weight: bold; cursor: pointer; transition: 0.2s; outline: none;" onmouseover="this.style.background='#6b46c1'" onmouseout="this.style.background='#2b1a52'">PICK</button>
                            <button onclick="playChampVoice('${champ.key}', 'ban')" style="background: #2b1a52; border: 1px solid #6b46c1; color: #fff; border-radius: 4px; padding: 2px 10px; font-size: 10px; font-weight: bold; cursor: pointer; transition: 0.2s; outline: none;" onmouseover="this.style.background='#6b46c1'" onmouseout="this.style.background='#2b1a52'">BAN</button>
                        </div>
                    </div>
                </div>
            `;
        }

        const parseRiotTooltip = (spell) => {
            if (!spell.tooltip) return spell.description;
            let text = spell.tooltip;
            text = text.replace(/{{\s*spellmodifierdescriptionappend\s*}}/gi, '');
            text = text.replace(/{{\s*e([0-9]+)\s*}}/gi, (match, p1) => {
                const idx = parseInt(p1);
                return spell.effectBurn[idx] ? `[ ${spell.effectBurn[idx]} ]` : match;
            });
            if (spell.vars && spell.vars.length > 0) {
                text = text.replace(/{{\s*([a-z0-9]+)\s*}}/gi, (match, p1) => {
                    const varData = spell.vars.find(v => v.key === p1.toLowerCase());
                    if (varData) {
                        const coeff = Array.isArray(varData.coeff) ? varData.coeff.join('/') : varData.coeff;
                        let statName = varData.link === 'spelldamage' ? '주문력' :
                            varData.link === 'attackdamage' ? '공격력' :
                                varData.link === 'bonusattackdamage' ? '추가 공격력' :
                                    varData.link === 'bonushealth' ? '추가 체력' :
                                        varData.link === 'armor' ? '방어력' : varData.link;
                        return `(+ ${coeff} ${statName})`;
                    }
                    return match;
                });
            }
            text = text.replace(/{{\s*[^}]+\s*}}/g, '<span style="color:#a78bfa; font-weight:bold;">[스탯 비례]</span>');
            text = text.replace(/@[^@]+@/g, '<span style="color:#a78bfa; font-weight:bold;">[스탯 비례]</span>');
            return cleanTooltipText(text);
        };

        window.currentChampPaddedKey = String(champ.key).padStart(4, '0');


        const renderScalingTable = (spellKey, riotDesc) => {
            const tpl = (typeof customTemplates !== 'undefined' && customTemplates[champ.id])
                ? customTemplates[champ.id][spellKey] : null;
            const values = (typeof customValues !== 'undefined' && customValues[champ.id] && customValues[champ.id][spellKey])
                ? customValues[champ.id][spellKey] : {};

            // 아직 수치를 안 채웠거나 일부만 해석된 스킬은 문장에 물음표가 찍힌다.
            // 값에 ? 가 섞여 있으면 (예: "50 / 75 (+ (?))") 템플릿을 쓰지 않는다.
            // 템플릿을 쓰지 않고 라이엇 기본 설명으로 넘긴다
            const unfilled = Object.keys(values).some(
                k => /^p[0-9]+$/.test(k) && (values[k] === '' || String(values[k]).includes('?'))
            );

            if (tpl && !unfilled) {
                let text = tpl;
                for (let key in values) {
                    text = text.split(`{${key}}`).join(values[key]);
                }
                return `<div style="margin-bottom: 10px; color: #ddd; line-height: 1.6; font-size: 14px;">${text}</div>`;
            }

            return `<div style="margin-bottom: 10px; color: #ddd; line-height: 1.6; font-size: 14px;">${riotDesc}</div>`;
        };

        // ★ 패시브 스킬 세팅
        const passive = {
            id: 'P1', keyChar: '패시브', name: champ.passive.name,
            desc: renderScalingTable('P', cleanTooltipText(champ.passive.description)),
            cooldown: (typeof customValues !== 'undefined' && customValues[champ.id] && customValues[champ.id]['P'] && customValues[champ.id]['P'].cooldown) || '-',
            cost: (typeof customValues !== 'undefined' && customValues[champ.id] && customValues[champ.id]['P'] && customValues[champ.id]['P'].cost) || '-',
            img: `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/passive/${champ.passive.image.full}`,
            img2: (typeof customValues !== 'undefined' && customValues[champ.id] && customValues[champ.id]['P'] && customValues[champ.id]['P'].img2) || null,
            stats: (typeof customValues !== 'undefined' && customValues[champ.id] && customValues[champ.id]['P'] && customValues[champ.id]['P'].stats) || null, // ★ 스탯 추가
            values: (typeof customValues !== 'undefined' && customValues[champ.id] && customValues[champ.id]['P']) || null, // ★ 피해량/계수 (v1, v2)
            isPassive: true
        };

        const spellSlotsId = ['Q1', 'W1', 'E1', 'R1'];
        const spellSlotsKey = ['Q', 'W', 'E', 'R'];

        // ★ 일반 스킬 세팅
        const spells = champ.spells.map((s, i) => {
            let customCd = s.cooldownBurn;
            let customCost = s.costBurn;
            let customImg2 = null;
            let customStats = null; // ★ 스탯 변수 추가

            let customVals = null;
            if (typeof customValues !== 'undefined' && customValues[champ.id] && customValues[champ.id][spellSlotsKey[i]]) {
                if (customValues[champ.id][spellSlotsKey[i]].cooldown) customCd = customValues[champ.id][spellSlotsKey[i]].cooldown;
                if (customValues[champ.id][spellSlotsKey[i]].cost) customCost = customValues[champ.id][spellSlotsKey[i]].cost;
                if (customValues[champ.id][spellSlotsKey[i]].img2) customImg2 = customValues[champ.id][spellSlotsKey[i]].img2;
                if (customValues[champ.id][spellSlotsKey[i]].stats) customStats = customValues[champ.id][spellSlotsKey[i]].stats; // ★ 스탯 가져오기
                customVals = customValues[champ.id][spellSlotsKey[i]];
            }
            return {
                id: spellSlotsId[i],
                keyChar: spellSlotsKey[i],
                name: s.name,
                desc: renderScalingTable(spellSlotsKey[i], parseRiotTooltip(s)),
                cooldown: customCd,
                cost: customCost,
                img: `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/spell/${s.image.full}`,
                img2: customImg2,
                stats: customStats, // ★ 데이터에 스탯 저장
                values: customVals, // ★ 피해량/계수 (v1, v2)
                isPassive: false
            };
        });
        // ★ 두 번째 폼(니달리 쿠거, 엘리스 거미, 제이스 대포, 나르 메가)은
        //   별도 스킬 칸으로 만들지 않고 같은 칸에 합친다.
        //   Data Dragon 의 스킬 이름이 이미 두 폼을 같이 적어 두기 때문이다 —
        //   제이스 Q 이름이 "하늘로! / 전격 폭발" 인데 앞이 해머폼, 뒤가 캐논폼이다.
        //   따로 칸을 만들면 같은 이름이 두 번 나와서 어느 쪽이 어느 폼인지 알 수 없다.
        //   보조 아이콘(img2)은 원래 있던 장치를 그대로 쓴다.
        const cv2 = (typeof customValues !== 'undefined' && customValues[champ.id]) || null;
        if (cv2) {
            spells.forEach((sp) => {
                const v = cv2[sp.keyChar + '2'];
                const tpl2 = (typeof customTemplates !== 'undefined' && customTemplates[champ.id])
                    ? customTemplates[champ.id][sp.keyChar + '2'] : null;
                if (!v || !tpl2) return;

                // ★ Data Dragon 은 두 폼 이름을 "폼1 / 폼2" 로 합쳐서 준다
                //   (제이스 Q "하늘로! / 전격 폭발", 니달리 Q "창 투척 / 숨통 끊기").
                //   박스를 나눴으니 각 박스엔 자기 이름만 보여준다.
                //   ★ 폼2 이름이 어느 쪽 조각인지 소스마다 다를 수 있어서
                //     "폼2 이름이 아닌 쪽"을 폼1로 잡는다.
                //     렉사이 굴 파기 스킬처럼 폼2 이름이 비어 있으면 뒷조각을 쓴다.
                const parts = String(sp.name).split('/').map(x => x.trim()).filter(Boolean);
                let name2 = v.name || '';
                if (parts.length === 2) {
                    if (!name2) name2 = parts[1];
                    sp.name = (parts[0] === name2) ? parts[1] : parts[0];
                }

                // 두 번째 폼은 아래에 박스를 따로 쌓는다. 한 박스에 이어 붙이면
                // 쿨타임·소모값이 폼마다 달라서 헤더가 지저분해진다.
                sp.form2 = {
                    label: v.form || '두 번째 형태',
                    name: name2,
                    icon: v.icon || '',
                    cooldown: v.cooldown || '-',
                    cost: v.cost || '-',
                    desc: renderScalingTable(sp.keyChar + '2', ''),
                    values: v
                };
            });
        }
        window.currentChampSkills = [passive, ...spells];

        let displayLore = champ.lore.replace(/\r\n|\n/g, '<br><br>');

        if (typeof customLore !== 'undefined' && customLore[champId]) {
            displayLore = customLore[champId];
        }

        const loreHtml = `<style>.champ-lore-text p { margin-bottom: 18px; color: #ddd; }</style><div class="champ-lore-text" style="font-size: 15px; line-height: 1.8; word-break: keep-all; padding: 10px; white-space: pre-wrap;">${displayLore}</div>`;

        // ★ HTML 틀 구성 (보조 아이콘 컨테이너 추가, 소모값 색상 #ddd 통일, 하단 커스텀 영역 확보)
        const skillsHtml = `
        <style>
            mainText { display: block; font-size: 14px; line-height: 1.6; color: #ddd; } stats { display: block; color: #a78bfa; font-size: 13px; margin-bottom: 12px; font-weight: bold; background: rgba(167, 139, 250, 0.05); padding: 10px; border-radius: 8px; border: 1px solid rgba(167, 139, 250, 0.1); }
            magicdamage { color: #55bced; font-weight: bold; } physicaldamage { color: #ea824d; font-weight: bold; } truedamage { color: #ffffff; font-weight: bold; text-shadow: 0 0 4px rgba(255,255,255,0.4); }
            healing, heal { color: #00ff00; font-weight: bold; } shield { color: #00bfff; font-weight: bold; } scaleap { color: #55bced; } scalead { color: #ea824d; } scalehealth { color: #00ff00; }
            scalearmor, scalemr, scalemana { color: #a78bfa; } keywordmajor, keywordstealth { color: #a78bfa; font-weight: bold; text-decoration: underline; } attention, rules { color: #ff3333; font-weight: bold; } speed { color: #ffff00; font-weight: bold; } status { color: #ffffff; font-weight: bold; text-decoration: underline; } active, passive { display: block; margin-top: 8px; }
            /* CommunityDragon 툴팁 태그 */
            spellname, keyword, keywordname, recast, toggle, onhit,
            tap, hold, charge, release, evolve, scalelevel { color: #a78bfa; font-weight: bold; }
            gold { color: #ffd700; font-weight: bold; }
            armorpen { color: #f1c40f; font-weight: bold; }
            attackspeed { color: #f39c12; font-weight: bold; }
            lifesteal, omnivamp { color: #2ecc71; font-weight: bold; }
            danger, specialrules { color: #ff3333; font-weight: bold; }
            b { font-weight: bold; }
            i { font-style: italic; }
            /* <font> 는 실제 HTML 태그라 size/color 속성이 그대로 먹는다. 무력화한다. */
            font { display: inline; font-size: inherit !important; color: #a78bfa !important; font-weight: bold; }
            slow { color: #ffffff; font-weight: bold; }
            .custom-footnote { position: relative; display: inline-block; cursor: pointer; color: #a78bfa; margin-left: 2px; }
            .custom-footnote .footnote-text {
                visibility: hidden; width: max-content; max-width: 250px; background-color: #111; color: #fff;
                text-align: left; border-radius: 6px; padding: 6px 10px; position: absolute; z-index: 99;
                bottom: 150%; left: 50%; transform: translateX(-50%); border: 1px solid rgba(255,255,255,0.2);
                font-size: 12px; font-weight: normal; line-height: 1.5; opacity: 0; transition: opacity 0.2s; box-shadow: 0 4px 10px rgba(0,0,0,0.8);
            }
            .custom-footnote:hover .footnote-text { visibility: visible; opacity: 1; }
            .skill-damage-line { color: #ddd; font-size: 14px; line-height: 1.7; }
            .skill-damage-line + .skill-damage-line { margin-top: 6px; }
        </style>
        <div style="display: flex; gap: 30px; height: 100%;">
            <div style="display: flex; flex-direction: column; gap: 12px; flex-shrink: 0;">
                ${window.currentChampSkills.map((skill, idx) => `
                    <div onclick="playSkill(${idx})" id="skill-btn-${idx}" class="skill-btn" style="display: flex; align-items: center; gap: 12px; cursor: pointer; padding: 6px; border-radius: 8px; transition: 0.2s; background: rgba(255,255,255,0.02);">
                        <img src="${skill.img}" style="width: 48px; height: 48px; border-radius: 8px; border: 2px solid transparent;" id="skill-img-${idx}">
                        <div style="color: #9aa4af; font-weight: bold; width: 24px; font-size: 16px;">${['P', 'Q', 'W', 'E', 'R'][idx]}</div>
                    </div>
                `).join('')}
            </div>
            <div style="flex: 1; display: flex; flex-direction: column; gap: 24px; overflow-y: auto; padding-right: 5px;">
                <div style="background: rgba(0,0,0,0.3); border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); padding: 25px; flex-shrink: 0;">
                    <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 15px;">
                        
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <div style="display: flex; gap: 5px;">
                                <img id="champ-skill-icon-header" src="" style="width: 48px; height: 48px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">
                                <img id="champ-skill-icon-header-2" src="" style="width: 48px; height: 48px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); display: none;">
                            </div>
                            <h3 id="champ-skill-name-header" style="color: #fff; font-size: 18px; font-weight: bold; margin: 0;"></h3>
                        </div>
                        <div style="text-align: right; color: #aaa; font-size: 13px; font-weight: bold; line-height: 1.7;">
                            <div id="champ-skill-cooldown-header" style="color:#ddd;"></div>
                            <div id="champ-skill-cost-header" style="color: #ddd;"></div>
                            <div id="champ-skill-stats-header" style="color: #9aa4af; font-weight: normal; font-size: 12px; margin-top: 4px;"></div>
                        </div>
                        
                    </div>
                    <hr style="border:0; border-top: 1px solid #554433; margin: 20px 0;">
                    <div id="champ-skill-desc-text-body" style="word-break: keep-all; margin-bottom: 25px;"></div>
                    
                    <hr id="champ-skill-bottom-hr" style="border:0; border-top: 1px solid #554433; margin: 20px 0; display: none;">
                    <div id="champ-skill-custom-bottom"></div>

                </div>

                <!-- ★ 두 번째 폼 박스 (니달리 쿠거·엘리스 거미·제이스 대포·나르 메가).
                     첫 박스와 같은 모양으로 바로 아래에 쌓인다. 해당 없으면 통째로 숨긴다. -->
                <div id="champ-skill2-box" style="background: rgba(0,0,0,0.3); border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); padding: 25px; flex-shrink: 0; display: none;">
                    <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 15px;">
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <img id="champ-skill2-icon" src="" style="width: 48px; height: 48px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">
                            <div>
                                <div id="champ-skill2-form" style="color: #a78bfa; font-size: 12px; font-weight: bold; margin-bottom: 2px;"></div>
                                <h3 id="champ-skill2-name" style="color: #fff; font-size: 18px; font-weight: bold; margin: 0;"></h3>
                            </div>
                        </div>
                        <div style="text-align: right; color: #aaa; font-size: 13px; font-weight: bold; line-height: 1.7;">
                            <div id="champ-skill2-cooldown" style="color:#ddd;"></div>
                            <div id="champ-skill2-cost" style="color:#ddd;"></div>
                        </div>
                    </div>
                    <hr style="border:0; border-top: 1px solid #554433; margin: 20px 0;">
                    <div id="champ-skill2-desc" style="word-break: keep-all;"></div>
                </div>

                <video id="champ-skill-video" autoplay loop muted playsinline style="width: 100%; aspect-ratio: 16/9; background: #000; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); object-fit: cover; flex-shrink: 0;"></video>
            </div>
        </div>
        `;

        window.currentChampSkins = champ.skins;
        window.currentChampIdForSkins = champId;

        const skinsHtml = `
            <div id="skin-grid-view" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; padding: 10px;">
                ${champ.skins.map((skin, index) => `
                    <div style="text-align: center;" onclick="openSkinDetail(${index})">
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champId}_${skin.num}.jpg" style="width: 100%; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); cursor: pointer; transition: 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                        <div style="margin-top: 8px; font-size: 13px; color: #fff; font-weight: bold;">${skin.name === 'default' ? '기본 스킨' : skin.name}</div>
                    </div>
                `).join('')}
            </div>
            <div id="skin-detail-view" style="display: none; position: relative; width: 100%; height: 100%; flex-direction: column; align-items: center; justify-content: center; padding: 20px;">
                <button onclick="closeSkinDetail()" style="position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.5); border: 1px solid rgba(167, 139, 250, 0.4); color: #fff; padding: 8px 16px; border-radius: 8px; cursor: pointer; z-index: 10; transition: 0.2s;" onmouseover="this.style.background='rgba(167, 139, 250, 0.3)'" onmouseout="this.style.background='rgba(0,0,0,0.5)'">← 목록으로</button>
                <button onclick="prevSkin()" style="position: absolute; top: 50%; left: 10px; transform: translateY(-50%); background: rgba(0,0,0,0.5); border: 1px solid rgba(167, 139, 250, 0.4); color: #fff; padding: 15px 20px; border-radius: 8px; cursor: pointer; z-index: 10; font-size: 20px; transition: 0.2s;" onmouseover="this.style.background='rgba(167, 139, 250, 0.3)'" onmouseout="this.style.background='rgba(0,0,0,0.5)'">◀</button>
                <button onclick="nextSkin()" style="position: absolute; top: 50%; right: 10px; transform: translateY(-50%); background: rgba(0,0,0,0.5); border: 1px solid rgba(167, 139, 250, 0.4); color: #fff; padding: 15px 20px; border-radius: 8px; cursor: pointer; z-index: 10; font-size: 20px; transition: 0.2s;" onmouseover="this.style.background='rgba(167, 139, 250, 0.3)'" onmouseout="this.style.background='rgba(0,0,0,0.5)'">▶</button>
                <img id="skin-detail-img" src="" style="max-width: 100%; max-height: 60vh; object-fit: contain; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.5);">
                <div id="skin-detail-name" style="margin-top: 15px; font-size: 20px; color: #fff; font-weight: bold;"></div>
            </div>
        `;

        detailArea.innerHTML = `
            <div style="width: 100%; height: 100%; display: flex; flex-direction: column;">
                <div style="display: flex; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 0 20px; flex-shrink: 0; background: rgba(0,0,0,0.2); border-top-left-radius: 12px; border-top-right-radius: 12px;">
                    <button class="champ-tab-btn active" onclick="switchChampTab(event, 'skills')" style="padding: 15px 20px; background: transparent; border: none; color: #fff; font-weight: bold; font-size: 16px; cursor: pointer; border-bottom: 3px solid #a78bfa;">스킬</button>
                    <button class="champ-tab-btn" onclick="switchChampTab(event, 'skins')" style="padding: 15px 20px; background: transparent; border: none; color: #9aa4af; font-size: 16px; cursor: pointer; border-bottom: 3px solid transparent;">스킨</button>
                    <button class="champ-tab-btn" onclick="switchChampTab(event, 'lore')" style="padding: 15px 20px; background: transparent; border: none; color: #9aa4af; font-size: 16px; cursor: pointer; border-bottom: 3px solid transparent;">배경</button>
                </div>
                <div style="flex: 1; overflow-y: auto; padding: 30px;">
                    <div id="champ-tab-skills" class="champ-tab-content" style="display: block; height: 100%;">${skillsHtml}</div>
                    <div id="champ-tab-skins" class="champ-tab-content" style="display: none; height: 100%;">${skinsHtml}</div>
                    <div id="champ-tab-lore" class="champ-tab-content" style="display: none;">${loreHtml}</div>
                </div>
            </div>
        `;

        playSkill(0);
    } catch (error) { detailArea.innerHTML = `<div style="color:#f87171;">데이터를 불러오지 못했습니다.</div>`; }
};

window.switchChampTab = function (event, tabName) {
    document.querySelectorAll('.champ-tab-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.style.color = '#9aa4af'; btn.style.fontWeight = 'normal'; btn.style.borderBottomColor = 'transparent';
    });
    event.currentTarget.classList.add('active');
    event.currentTarget.style.color = '#fff';
    event.currentTarget.style.fontWeight = 'bold';
    event.currentTarget.style.borderBottomColor = '#a78bfa';

    document.querySelectorAll('.champ-tab-content').forEach(content => content.style.display = 'none');
    const targetTab = document.getElementById(`champ-tab-${tabName}`);
    if (targetTab) targetTab.style.display = 'block';
};

window.playSkill = function (index) {
    const skill = window.currentChampSkills[index];
    if (!skill) return;

    document.querySelectorAll('.skill-btn').forEach(btn => btn.style.background = 'rgba(255,255,255,0.02)');
    document.querySelectorAll('[id^="skill-img-"]').forEach(img => img.style.borderColor = 'transparent');
    const activeBtn = document.getElementById(`skill-btn-${index}`);
    const activeImg = document.getElementById(`skill-img-${index}`);
    if (activeBtn) activeBtn.style.background = 'rgba(167, 139, 250, 0.1)';
    if (activeImg) activeImg.style.borderColor = '#a78bfa';

    const iconHeaderEl = document.getElementById('champ-skill-icon-header');
    const iconHeader2El = document.getElementById('champ-skill-icon-header-2');

    if (iconHeaderEl) iconHeaderEl.src = skill.img;

    // ★ 보조 아이콘 표시/숨김 로직
    if (iconHeader2El) {
        if (skill.img2) {
            iconHeader2El.src = skill.img2;
            iconHeader2El.style.display = 'block';
        } else {
            iconHeader2El.style.display = 'none';
            iconHeader2El.src = '';
        }
    }

    const nameEl = document.getElementById('champ-skill-name-header');
    if (nameEl) nameEl.innerHTML = `<span style="color:#ddd; font-weight: normal; font-size: 16px;">[${skill.keyChar}]</span> ${skill.name}`;

    const cooldownEl = document.getElementById('champ-skill-cooldown-header');
    const costEl = document.getElementById('champ-skill-cost-header');
    if (cooldownEl) cooldownEl.innerHTML = `쿨타임 ${skill.cooldown}`;
    if (costEl) costEl.innerHTML = `소모값 ${skill.cost}`;

    const descTextEl = document.getElementById('champ-skill-desc-text-body');
    if (descTextEl) descTextEl.innerHTML = skill.desc;

    // ★ 두 번째 폼 박스 채우기 / 숨기기
    const box2El = document.getElementById('champ-skill2-box');
    if (box2El) {
        const f2 = skill.form2;
        if (f2) {
            const put = (id, html) => {
                const el = document.getElementById(id);
                if (el) el.innerHTML = html;
            };
            const icon2 = document.getElementById('champ-skill2-icon');
            if (icon2) icon2.src = f2.icon;
            put('champ-skill2-form', f2.label);
            put('champ-skill2-name',
                `<span style="color:#ddd; font-weight: normal; font-size: 16px;">[${skill.keyChar}]</span> ${f2.name}`);
            put('champ-skill2-cooldown', `쿨타임 ${f2.cooldown}`);
            put('champ-skill2-cost', `소모값 ${f2.cost}`);
            put('champ-skill2-desc', f2.desc);
            box2El.style.display = 'block';
        } else {
            box2El.style.display = 'none';
        }
    }

    // ★ 우상단: 사거리·시전시간 등 판정 수치
    //   키를 직접 정해서 넣으므로 순서대로 그대로 뿌린다. 빈 키나 빈 값은 건너뛴다.
    const statsHeaderEl = document.getElementById('champ-skill-stats-header');
    if (statsHeaderEl) {
        let lines = '';
        for (let key in (skill.stats || {})) {
            const v = skill.stats[key];
            if (!key.trim() || v === null || v === undefined || v === '') continue;
            lines += `<div>${key} <span style="color:#ddd; font-weight:bold;">${v}</span></div>`;
        }
        statsHeaderEl.innerHTML = lines;
    }

    // ★ 하단: 피해량과 계수 (구분선 아래)
    const bottomHrEl = document.getElementById('champ-skill-bottom-hr');
    const customBottomEl = document.getElementById('champ-skill-custom-bottom');

    const vals = skill.values || {};
    const damageLines = ['v1', 'v2']
        .map(k => vals[k])
        .filter(v => v !== null && v !== undefined && String(v).trim() !== '');

    if (damageLines.length > 0) {
        if (customBottomEl) {
            customBottomEl.innerHTML = damageLines
                .map(v => `<div class="skill-damage-line">${v}</div>`)
                .join('');
        }
        if (bottomHrEl) bottomHrEl.style.display = 'block';
    } else {
        if (customBottomEl) customBottomEl.innerHTML = '';
        if (bottomHrEl) bottomHrEl.style.display = 'none';
    }

    const videoEl = document.getElementById('champ-skill-video');
    const videoUrl = `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${window.currentChampPaddedKey}/ability_${window.currentChampPaddedKey}_${skill.id}.webm`;
    if (videoEl && videoEl.src !== videoUrl) {
        videoEl.src = videoUrl;
        videoEl.play().catch(e => console.log("Video play prevented"));
    }
};

window.playChampVoice = function (champKey, type) {
    let audioPlayer = document.getElementById('champ-voice-player');
    if (!audioPlayer) {
        audioPlayer = document.createElement('audio');
        audioPlayer.id = 'champ-voice-player';
        document.body.appendChild(audioPlayer);
    }

    const baseUrl = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/ko_kr/v1/';
    audioPlayer.src = type === 'pick' ? `${baseUrl}champion-choose-vo/${champKey}.ogg` : `${baseUrl}champion-ban-vo/${champKey}.ogg`;
    audioPlayer.volume = 0.5;

    audioPlayer.play().catch(err => {
        showErrorToast("해당 챔피언의 음성 파일을 불러올 수 없습니다.");
    });
};

window.openSkinDetail = function (index) {
    window.currentSkinIndex = index;
    document.getElementById('skin-grid-view').style.display = 'none';
    document.getElementById('skin-detail-view').style.display = 'flex';
    updateSkinDetail();
};

window.closeSkinDetail = function () {
    document.getElementById('skin-detail-view').style.display = 'none';
    document.getElementById('skin-grid-view').style.display = 'grid';
};

window.prevSkin = function () {
    window.currentSkinIndex = (window.currentSkinIndex > 0) ? window.currentSkinIndex - 1 : window.currentChampSkins.length - 1;
    updateSkinDetail();
};

window.nextSkin = function () {
    window.currentSkinIndex = (window.currentSkinIndex < window.currentChampSkins.length - 1) ? window.currentSkinIndex + 1 : 0;
    updateSkinDetail();
};

window.updateSkinDetail = function () {
    const skin = window.currentChampSkins[window.currentSkinIndex];
    document.getElementById('skin-detail-img').src = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${window.currentChampIdForSkins}_${skin.num}.jpg`;
    document.getElementById('skin-detail-name').innerText = skin.name === 'default' ? '기본 스킨' : skin.name;
};

// ==========================================
// [9] 닉네임 자동완성 & 태그 후보 목록
// ==========================================
let acTimer = null;
let acItems = [];
let acIndex = -1;
let acSeq = 0;

// 입력 가중치 (한글 2점, 그 외 1점) — 서버 규칙과 동일
function inputWeight(str) {
    let w = 0;
    for (const ch of String(str)) w += /[가-힣ㄱ-ㅎㅏ-ㅣ]/.test(ch) ? 2 : 1;
    return w;
}

function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, c => (
        { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));
}

const TIER_SHORT = {
    IRON: 'I', BRONZE: 'B', SILVER: 'S', GOLD: 'G', PLATINUM: 'P',
    EMERALD: 'E', DIAMOND: 'D', MASTER: 'M', GRANDMASTER: 'GM', CHALLENGER: 'C'
};
const DIV_NUM = { I: '1', II: '2', III: '3', IV: '4' };

function shortTier(tier, rank) {
    const t = String(tier || '').toUpperCase();
    if (!TIER_SHORT[t]) return '–';
    if (['MASTER', 'GRANDMASTER', 'CHALLENGER'].includes(t)) return TIER_SHORT[t];
    return TIER_SHORT[t] + (DIV_NUM[String(rank || '').toUpperCase()] || '');
}

function fullTierText(tier, rank, lp) {
    const t = String(tier || '').toUpperCase();
    if (!t || t === 'UNRANKED') return null;
    const div = ['MASTER', 'GRANDMASTER', 'CHALLENGER'].includes(t) ? '' : ` ${rank || ''}`;
    const name = t.charAt(0) + t.slice(1).toLowerCase();
    return `${name}${div} - ${lp ?? 0}LP`;
}

function hideAutocomplete() {
    const box = document.getElementById('autocomplete-dropdown');
    if (box) box.style.display = 'none';
    acItems = [];
    acIndex = -1;
}

function renderAutocomplete(list, typed) {
    const box = document.getElementById('autocomplete-dropdown');
    if (!box) return;

    if (!list || list.length === 0) { hideAutocomplete(); return; }

    // 즐겨찾기 드롭다운과 동시에 뜨지 않도록
    const fav = document.getElementById('search-dropdown');
    if (fav) fav.style.display = 'none';

    acItems = list;
    acIndex = -1;

    const typedLen = typed.split('#')[0].length;

    box.innerHTML = list.map((it, i) => {
        const [namePart, tag] = it.displayName.split('#');
        const head = escapeHtml(namePart.slice(0, typedLen));
        const rest = escapeHtml(namePart.slice(typedLen));
        const sub = fullTierText(it.tier, it.rank, it.lp)
            || (it.level ? `Level ${it.level}` : '전적 정보 없음');
        const icon = it.iconId != null
            ? `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/profileicon/${it.iconId}.png`
            : `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/profileicon/29.png`;

        return `
            <div class="ac-item" data-index="${i}" onclick="pickAutocomplete(${i})">
                <img class="ac-icon" src="${icon}" onerror="this.style.visibility='hidden'">
                <div class="ac-body">
                    <div class="ac-name"><span class="ac-hl">${head}</span>${rest}<span class="ac-tag">#${escapeHtml(tag || '')}</span></div>
                    <div class="ac-sub">${escapeHtml(sub)}</div>
                </div>
            </div>`;
    }).join('');

    box.style.display = 'block';
}

function highlightAcItem() {
    document.querySelectorAll('#autocomplete-dropdown .ac-item').forEach((el, i) => {
        el.classList.toggle('active', i === acIndex);
    });
}

window.pickAutocomplete = function (i) {
    const item = acItems[i];
    if (!item) return;
    document.getElementById('summoner-input').value = item.displayName;
    hideAutocomplete();
    executeSearch();
};

async function fetchAutocomplete(value) {
    const namePart = value.split('#')[0].trim();
    if (inputWeight(namePart) < 4) { hideAutocomplete(); return; }

    const seq = ++acSeq;
    try {
        const res = await fetch(`/api/suggest?q=${encodeURIComponent(namePart)}`);
        if (!res.ok) { hideAutocomplete(); return; }
        const list = await res.json();

        if (seq !== acSeq) return;                       // 늦게 도착한 응답 무시
        const now = document.getElementById('summoner-input').value.trim();
        if (now.split('#')[0].trim() !== namePart) return;

        renderAutocomplete(list, namePart);
    } catch (e) {
        hideAutocomplete();
    }
}

// 태그 후보 목록 페이지
async function showCandidates(name) {
    hideAllContainers();
    const box = document.getElementById('candidates-container');
    box.style.display = 'block';
    box.innerHTML = `<div class="cand-wrap"><div style="text-align:center; padding:80px 0; color:#9aa4af;">검색 중입니다...</div></div>`;
    window.scrollTo(0, 0);

    let list = [];
    try {
        const res = await fetch(`/api/suggest?q=${encodeURIComponent(name)}&exact=1`);
        if (res.ok) list = await res.json();
    } catch (e) { }

    if (!list || list.length === 0) {
        box.innerHTML = `
            <div class="cand-wrap">
                <div style="text-align:center; padding:70px 20px; color:#9aa4af; line-height:1.9;">
                    <div style="font-size:18px; color:#fff; margin-bottom:12px;">'${escapeHtml(name)}' 님을 찾지 못했습니다.</div>
                    태그까지 함께 입력하면 정확하게 찾을 수 있습니다.<br>
                    <span style="font-size:13px; color:#777;">예) ${escapeHtml(name)}#KR1</span>
                </div>
            </div>`;
        return;
    }

    const rows = list.map(it => {
        const [namePart, tag] = it.displayName.split('#');
        const t = String(it.tier || '').toUpperCase();
        const cls = TIER_SHORT[t] ? `t-${t.toLowerCase()}` : '';
        const lpText = fullTierText(it.tier, it.rank, it.lp) || (it.level ? `Level ${it.level}` : '');
        const safe = it.displayName.replace(/'/g, "\\'");

        return `
            <div class="cand-item" onclick="document.getElementById('summoner-input').value='${escapeHtml(safe)}'; executeSearch();">
                <span class="cand-badge ${cls}">${shortTier(it.tier, it.rank)}</span>
                <span class="cand-name">${escapeHtml(namePart)}<span class="ac-tag">#${escapeHtml(tag || '')}</span></span>
                <span class="cand-lp">${escapeHtml(lpText)}</span>
            </div>`;
    }).join('');

    box.innerHTML = `
        <div class="cand-wrap">
            <div class="cand-count"><b>${list.length}</b>개의 결과가 있습니다.</div>
            <div class="cand-list">${rows}</div>
        </div>`;
}

// 입력 이벤트 연결 (디바운스 0.2초)
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('summoner-input');
    if (!input) return;

    input.addEventListener('input', () => {
        const value = input.value.trim();
        if (acTimer) clearTimeout(acTimer);

        if (!value) { hideAutocomplete(); return; }
        acTimer = setTimeout(() => fetchAutocomplete(value), 200);
    });

    input.addEventListener('keydown', (e) => {
        const box = document.getElementById('autocomplete-dropdown');
        const open = box && box.style.display === 'block' && acItems.length > 0;

        if (e.key === 'Escape') { hideAutocomplete(); return; }
        if (!open) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            acIndex = (acIndex + 1) % acItems.length;
            highlightAcItem();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            acIndex = acIndex <= 0 ? acItems.length - 1 : acIndex - 1;
            highlightAcItem();
        } else if (e.key === 'Enter' && acIndex >= 0) {
            e.preventDefault();
            pickAutocomplete(acIndex);
        }
    });

    document.addEventListener('click', (e) => {
        const wrapper = document.querySelector('.search-box-wrapper');
        if (wrapper && !wrapper.contains(e.target)) hideAutocomplete();
    });
});

// ==========================================
// [10] 전적 더 보기
// ==========================================
window.matchOffset = 0;
let isLoadingMore = false;

function renderLoadMore(hasMore) {
    const area = document.getElementById('load-more-area');
    if (!area) return;

    if (!hasMore) {
        // 애초에 전적이 0개면 위쪽에 "전적 데이터가 없습니다"가 이미 떠 있다.
        // "더 이상"은 뭔가 불러온 뒤에나 맞는 말이라 이때는 아무것도 그리지 않는다.
        const hasAnyMatch = document.querySelector('.match-wrapper');
        area.innerHTML = hasAnyMatch
            ? `<div class="load-more-end">더 이상 불러올 전적이 없습니다.</div>`
            : '';
        return;
    }
    area.innerHTML = `<button class="load-more-btn" id="load-more-btn" onclick="loadMoreMatches()">+ 10게임 더 보기</button>`;
}

window.loadMoreMatches = async function () {
    if (isLoadingMore) return;

    const puuid = window.currentPuuid;
    if (!puuid) return;

    const btn = document.getElementById('load-more-btn');
    isLoadingMore = true;
    if (btn) { btn.disabled = true; btn.textContent = "불러오는 중..."; }

    try {
        const res = await fetch(`/api/matches/${puuid}?start=${window.matchOffset}&count=10`);

        if (res.status === 429) {
            showErrorToast("서버 요청이 많아 지연되고 있습니다.\n잠시 후 다시 시도해주세요.");
            if (btn) { btn.disabled = false; btn.textContent = "+ 10게임 더 보기"; }
            return;
        }
        if (!res.ok) throw new Error("불러오기 실패");

        const data = await res.json();
        const newMatches = data.history || [];

        if (newMatches.length === 0) {
            renderLoadMore(false);
            return;
        }

        // 챔피언 스킬 정보 미리 확보 (스킬 빌드 표에 필요)
        window.champDetailCache = window.champDetailCache || {};
        const uniqueChamps = [...new Set(newMatches.map(m => m.championName))];
        await Promise.all(uniqueChamps.map(async champName => {
            if (window.champDetailCache[champName]) return;
            try {
                const r = await fetch(`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/ko_KR/champion/${champName}.json`);
                const d = await r.json();
                window.champDetailCache[champName] = d.data[champName].spells.map(sp => ({ img: sp.image.full, max: sp.maxrank }));
            } catch (e) { }
        }));

        allMatches = allMatches.concat(newMatches);
        window.matchOffset += newMatches.length;

        renderMatches(newMatches, true);
        renderLoadMore(data.hasMore !== false);

        // 새로 추가된 항목에도 현재 필터(큐 + 챔피언)를 그대로 적용
        applyMatchFilters();

    } catch (e) {
        console.error("더 보기 실패:", e);
        showErrorToast("전적을 더 불러오지 못했습니다.\n잠시 후 다시 시도해주세요.");
        if (btn) { btn.disabled = false; btn.textContent = "+ 10게임 더 보기"; }
    } finally {
        isLoadingMore = false;
    }
};