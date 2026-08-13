// ==========================================
// [0] 전역 변수 및 챔피언, 툴팁 정보 캐싱
// ==========================================
// ★ 이 기본값은 **동기화가 실패했을 때만** 쓰이지만, 그때 챔피언 목록이 이 버전으로 만들어진다.
//   그래서 "신규 챔피언이 다 들어 있는 버전" 이어야 한다.
//   16.5.1 은 챔피언이 172명뿐이라 로크가 없었다 (16.15.1 은 233명). 2026-08-10 올림.
//   새 챔피언이 목록에서 안 보이면 제일 먼저 이 값을 의심할 것.
let ddragonVersion = "16.16.1";
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
// ★ 버전 동기화가 **끝날 때까지 기다릴 수 있게** 약속을 들고 있는다 (2026-08-10).
//   챔피언 탭은 `ddragonVersion` 으로 champion.json 을 받는데, 동기화가 끝나기 전에
//   탭을 열면 기본값으로 받아 버린다. **기본값 16.5.1 에는 챔피언이 172명뿐이라
//   로크 같은 신규 챔피언이 목록에서 통째로 사라진다** (최신 16.15.1 은 233명).
//   CLAUDE.md 의 "구버전 champion.json 을 읽으면 신규 챔피언이 사라진다" 와 같은 사고인데,
//   그때는 서버 응답이 덮어쓰는 경로였고 이번엔 **경주(race)** 가 원인이다.
let ddragonReady = null;

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
    ddragonReady = initDdragonVersion();
    ddragonReady.then(() => {
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

            renderRankingHeader();
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

// ★ 영문 자판을 두벌식 한글 자모로 (2026-08-13).
//   한영 전환 없이 챔피언을 찾으려는 것이다 — "d" -> "ㅇ", "rkfps" -> "가렌".
//   ★★ **소문자로 바꾸기 전에** 이 함수를 태워야 한다. Shift 조합(ㅃㅉㄸㄲㅆ)이
//     대문자로 들어오기 때문이다. 순서를 바꾸면 **쓰레쉬(Tmfptn)와 뽀삐(QhQl)를
//     영영 못 찾는다** — 소문자화하면 "스레쉬", "보비" 가 되어 버린다.
const QWERTY_KO_SHIFT = { Q: 'ㅃ', W: 'ㅉ', E: 'ㄸ', R: 'ㄲ', T: 'ㅆ', O: 'ㅒ', P: 'ㅖ' };
const QWERTY_KO = {
    q: 'ㅂ', w: 'ㅈ', e: 'ㄷ', r: 'ㄱ', t: 'ㅅ', y: 'ㅛ', u: 'ㅕ', i: 'ㅑ', o: 'ㅐ', p: 'ㅔ',
    a: 'ㅁ', s: 'ㄴ', d: 'ㅇ', f: 'ㄹ', g: 'ㅎ', h: 'ㅗ', j: 'ㅓ', k: 'ㅏ', l: 'ㅣ',
    z: 'ㅋ', x: 'ㅌ', c: 'ㅊ', v: 'ㅍ', b: 'ㅠ', n: 'ㅜ', m: 'ㅡ',
};

// 자모 -> 음절 조합에 쓰는 표. 초성은 위 HANGUL_CHO 를 그대로 쓴다.
const HANGUL_JUNG = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ',
    'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
const HANGUL_JONG = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ',
    'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
// 두 번 눌러 만드는 겹모음·겹받침
const JUNG_COMBO = { 'ㅗㅏ': 'ㅘ', 'ㅗㅐ': 'ㅙ', 'ㅗㅣ': 'ㅚ', 'ㅜㅓ': 'ㅝ', 'ㅜㅔ': 'ㅞ', 'ㅜㅣ': 'ㅟ', 'ㅡㅣ': 'ㅢ' };
const JONG_COMBO = {
    'ㄱㅅ': 'ㄳ', 'ㄴㅈ': 'ㄵ', 'ㄴㅎ': 'ㄶ', 'ㄹㄱ': 'ㄺ', 'ㄹㅁ': 'ㄻ', 'ㄹㅂ': 'ㄼ',
    'ㄹㅅ': 'ㄽ', 'ㄹㅌ': 'ㄾ', 'ㄹㅍ': 'ㄿ', 'ㄹㅎ': 'ㅀ', 'ㅂㅅ': 'ㅄ',
};

// ★ 영문 자판을 한글로 바꾼다 — **조합까지 한다** (2026-08-13).
//   "rkfps" -> "가렌", "rf" -> "ㄱㄹ", "d" -> "ㅇ".
//   자음만 이어지면 음절이 안 되므로 자모가 그대로 남는데, 그게 곧 초성 검색이다.
//   즉 초성 검색과 풀타이핑이 **같은 함수 하나로** 처리된다.
//   ★ 한글을 직접 친 경우("가렌", "ㄱㄹ")는 QWERTY_KO 에 없으니 그대로 통과한다.
function qwertyToKo(s) {
    // Shift 조합(대문자)을 먼저 본다. 나머지 대문자는 소문자와 같은 자리다.
    const jamo = [...s].map(ch => QWERTY_KO_SHIFT[ch] || QWERTY_KO[ch.toLowerCase()] || ch);
    let out = '';
    let cho = -1, jung = -1, jong = 0;   // 조립 중인 음절

    const flush = () => {
        if (cho >= 0 && jung >= 0) out += String.fromCharCode(0xAC00 + (cho * 21 + jung) * 28 + jong);
        else if (cho >= 0) out += HANGUL_CHO[cho];
        else if (jung >= 0) out += HANGUL_JUNG[jung];
        cho = -1; jung = -1; jong = 0;
    };

    for (const ch of jamo) {
        const ci = HANGUL_CHO.indexOf(ch);
        const vi = HANGUL_JUNG.indexOf(ch);

        if (vi >= 0) {
            // 모음: 받침이 있었다면 그 받침을 떼어 다음 글자의 초성으로 넘긴다 ("각"+ㅏ -> "가가")
            if (cho >= 0 && jung >= 0 && jong > 0) {
                const last = HANGUL_JONG[jong];
                const split = Object.entries(JONG_COMBO).find(([, v]) => v === last);
                const moved = split ? split[0][1] : last;
                jong = split ? HANGUL_JONG.indexOf(split[0][0]) : 0;
                flush();
                cho = HANGUL_CHO.indexOf(moved); jung = vi;
            } else if (jung >= 0 && JUNG_COMBO[HANGUL_JUNG[jung] + ch]) {
                jung = HANGUL_JUNG.indexOf(JUNG_COMBO[HANGUL_JUNG[jung] + ch]);
            } else if (jung >= 0) {
                flush(); jung = vi;
            } else {
                jung = vi;
            }
        } else if (ci >= 0) {
            // 자음: 중성이 있으면 받침으로, 없으면 새 음절의 초성으로
            if (cho >= 0 && jung >= 0) {
                const ji = HANGUL_JONG.indexOf(ch);
                if (jong === 0 && ji > 0) jong = ji;
                else if (jong > 0 && JONG_COMBO[HANGUL_JONG[jong] + ch]) jong = HANGUL_JONG.indexOf(JONG_COMBO[HANGUL_JONG[jong] + ch]);
                else { flush(); cho = ci; }
            } else if (cho >= 0) {
                flush(); cho = ci;          // 자음만 이어짐 -> 초성 검색용으로 자모가 남는다
            } else {
                cho = ci;
            }
        } else {
            flush(); out += ch;              // 완성형 한글·숫자·기호는 그대로
        }
    }
    flush();
    return out;
}

// ★ 대소문자는 판단하지 않고 **가능한 해석을 전부 후보로 둔다** (2026-08-13).
//   대문자 하나하나가 "Shift(된소리)" 인지 "caps 로 친 소문자" 인지 알 방법이 없다.
//   "TMFPTNL"(쓰레쉬)이 그 예다 — 첫 T 는 ㅆ 이고 뒤의 T 는 ㅅ 이라 규칙으로 못 가른다.
//   그래서 **된소리가 될 수 있는 자리(QWERTOP)만 켜고 끄는 조합**을 전부 만든다.
//   그 자리가 4개를 넘으면 조합이 과해지므로 양 끝(전부 Shift / 전부 소문자)만 본다.
//   덕분에 대소문자를 아예 신경 안 써도 되고, 된소리가 필요한 챔피언
//   (쓰레쉬·뽀삐)만 자연히 Shift 해석 쪽으로 걸린다.
function koCandidates(raw) {
    const spots = [...raw].map((c, i) => (QWERTY_KO_SHIFT[c] ? i : -1)).filter(i => i >= 0);
    const out = new Set();
    if (spots.length && spots.length <= 4) {
        for (let mask = 0; mask < (1 << spots.length); mask++) {
            const arr = [...raw];
            spots.forEach((pos, bit) => { if (!(mask & (1 << bit))) arr[pos] = arr[pos].toLowerCase(); });
            out.add(qwertyToKo(arr.join('')).toLowerCase());
        }
    } else {
        out.add(qwertyToKo(raw).toLowerCase());
        out.add(qwertyToKo(raw.toLowerCase()).toLowerCase());
    }
    return [...out];
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
    const cands = koCandidates((document.getElementById('cf-search').value || '').trim());

    document.querySelectorAll('#cf-list .cf-item').forEach(row => {
        const name = (row.dataset.name || '').toLowerCase();
        const cho = getChosung(row.dataset.name || '').toLowerCase();
        const hit = cands.some(c => name.includes(c) || cho.includes(c));
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
// 각주 상자 위치잡기
// ------------------------------------------
//   ★ 각주 상자(.custom-footnote-content)는 position: fixed 다.
//     스킬 본문(.champ-skill-body)이 overflow-y: auto 라 **가로도 같이 잘려서**
//     (한 축이 visible 이 아니면 다른 축도 auto 로 계산된다)
//     화면 좌우 끝의 각주가 잘려 보였다. fixed 는 어떤 조상도 자르지 못한다.
//
//   대신 fixed 는 CSS 로 "부모 기준 가운데" 를 못 잡으므로 여기서 좌표를 찍어 준다.
//   각주 표시([1]) 의 가로 중심에 상자 중심을 맞춘다 — 기존 위치 그대로다.
//   (CSS 의 transform: translate(-50%, ...) 가 가운데 정렬과 아래 간격을 맡는다)
//
//   화면 밖으로 나가도 밀어 넣지 않는다. "영역을 침범해서라도 그대로 보여준다" 가 목적이다.
// ==========================================
function positionFootnote(fn) {
    const box = fn.querySelector('.custom-footnote-content');
    if (!box) return;
    const r = fn.getBoundingClientRect();
    box.style.left = (r.left + r.width / 2) + 'px';
    box.style.top = r.bottom + 'px';
}

//   mouseover 는 자식에서도 올라오므로 closest 로 각주를 찾는다.
//   :hover 로 보이기 **전에** 좌표가 찍히도록 mouseover 를 쓴다 (mouseenter 는 위임이 안 된다).
document.addEventListener('mouseover', (e) => {
    const fn = e.target instanceof Element ? e.target.closest('.custom-footnote') : null;
    if (fn) positionFootnote(fn);
}, true);

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
let rankingQuery = '';        // 닉네임 필터 (원문 그대로 들고 있다가 화면에 되돌려 준다)
let rankingUpdatedAt = 0;     // 서버가 명단을 받아온 시각
const RANKING_ITEMS_PER_PAGE = 50;

// ★ 티어는 서버가 한 글자로 보내 준다 (server.js 의 TIER_CODE).
//   순위 번호로 짐작하던 걸 대체한 것이다 — 마스터가 그마보다 LP 가 높은 일이 실제로 있다.
const RANK_TIER_INFO = {
    C: { name: '챌린저', short: '챌', color: '#ca8a04', icon: 'challenger' },
    G: { name: '그랜드마스터', short: '그마', color: '#d33148', icon: 'grandmaster' },
    M: { name: '마스터', short: '마', color: '#8b5cf6', icon: 'master' }
};

function rankTierInfo(code) {
    return RANK_TIER_INFO[code] || RANK_TIER_INFO.M;
}

// "3분 전 갱신". 서버가 0 을 주면(아직 한 번도 안 받았으면) 예전 문구로 물러난다.
function rankUpdatedText() {
    if (!rankingUpdatedAt) return '약 10분마다 갱신됩니다.';
    const mins = Math.floor((Date.now() - rankingUpdatedAt) / 60000);
    if (mins < 1) return '방금 갱신됨 · 약 10분마다 갱신';
    if (mins < 60) return `${mins}분 전 갱신 · 약 10분마다 갱신`;
    return `${Math.floor(mins / 60)}시간 전 갱신 · 약 10분마다 갱신`;
}

// ★ 헤더는 showRanking 과 popstate 두 곳에서 그린다. 예전엔 같은 HTML 이 양쪽에
//   복붙돼 있어서 한쪽만 고치면 뒤로가기로 들어왔을 때 다르게 보였다.
function renderRankingHeader() {
    const profileDiv = document.getElementById('user-profile');
    profileDiv.innerHTML = `
        <div class="stats-header">
            <h1 class="ranking-title">
                <img src="https://opgg-static.akamaized.net/images/medals_new/challenger.png" style="position: absolute; right: 100%; margin-right: 12px; top: 50%; transform: translateY(-50%); width: 60px; height: 60px;">
                한국서버 솔로랭크 랭킹
            </h1>
            <p class="rank-updated" id="rank-updated">${rankUpdatedText()}</p>
            <div class="rank-search-box">
                <input type="text" id="rank-search" class="rank-search" autocomplete="off"
                       placeholder="닉네임 검색 (초성 · 영문 자판 그대로)"
                       oninput="onRankingSearch(this.value)">
                <button type="button" class="rank-search-clear" id="rank-search-clear"
                        onclick="onRankingSearch('')" title="검색어 지우기">&times;</button>
            </div>
        </div>
    `;

    // 뒤로가기로 다시 들어오는 경우가 있어 입력칸 값을 상태에서 되돌린다
    const input = document.getElementById('rank-search');
    if (input) input.value = rankingQuery;
    const clear = document.getElementById('rank-search-clear');
    if (clear) clear.style.visibility = rankingQuery ? 'visible' : 'hidden';
}

// ★ 검색어 해석은 **한 번만** 한다. 1.1만 명을 훑으므로 행마다 자판 변환을 돌리면
//   타이핑이 눈에 띄게 밀린다. 후보 문자열을 미리 만들어 두고 비교만 시킨다.
function buildRankQuery(raw) {
    const q = String(raw || '').trim();
    if (!q) return null;

    const terms = new Set([q.toLowerCase()]);
    // 영문만 친 경우엔 한글 자판 해석도 후보에 넣는다 ("rkfps" -> "가렌", "rf" -> "ㄱㄹ").
    // 영문 닉네임도 많으므로 원문 후보는 위에서 이미 넣어 뒀다 — 둘 중 하나만 맞으면 된다.
    if (/^[A-Za-z]+$/.test(q)) koCandidates(q).forEach(k => { if (k) terms.add(k); });

    return [...terms];
}

function onRankingSearch(value) {
    rankingQuery = value;
    const input = document.getElementById('rank-search');
    if (input && input.value !== value) input.value = value;
    const clear = document.getElementById('rank-search-clear');
    if (clear) clear.style.visibility = value ? 'visible' : 'hidden';
    renderRankingPage(1, { keepScroll: true });
}

// 검색어가 없으면 원본 배열을 그대로 돌려준다 (1.1만 개를 복사할 이유가 없다)
function filteredRankingData() {
    const terms = buildRankQuery(rankingQuery);
    if (!terms) return fullRankingData;
    return fullRankingData.filter(p => terms.some(t => p._lc.includes(t) || p._cho.includes(t)));
}

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

    // 랭킹 탭에 새로 들어온 것이므로 지난번 검색어는 푼다.
    // (안 풀면 메뉴로 다시 들어왔을 때 걸러진 목록이 그대로 나와 고장처럼 보인다)
    rankingQuery = '';

    hideAllContainers();
    document.getElementById('result-container').style.display = "block";
    const listDiv = document.getElementById('game-list');

    const filterArea = document.getElementById('filter-area');
    const sidebarArea = document.getElementById('sidebar-area');
    const summaryArea = document.getElementById('summary-stats-area');
    if (sidebarArea) sidebarArea.style.display = "none";
    if (filterArea) filterArea.style.display = "none";
    if (summaryArea) summaryArea.style.display = "none";

    renderRankingHeader();
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

        // ★ 원래 순위(rank)를 여기서 못 박는다. 검색으로 걸러내면 배열 위치가 달라져서
        //   화면에서 세면 "1위" 부터 다시 시작해 버린다.
        //   검색용 소문자·초성도 같이 만들어 둔다 — 타이핑할 때마다 1.1만 번 만들 이유가 없다.
        rankingUpdatedAt = data.updatedAt || 0;
        fullRankingData = data.players.map((p, i) => {
            const lc = String(p.displayName || '').toLowerCase();
            return { ...p, rank: i + 1, _lc: lc, _cho: getChosung(lc) };
        });
        renderRankingHeader();     // 갱신 시각을 받은 뒤 다시 그린다
        renderRankingPage(targetPage);

    } catch (e) {
        showErrorToast("데이터 로드 실패");
        listDiv.innerHTML = `<div style='text-align:center; padding:50px; color:#f87171;'>데이터 로드 실패: ${e.message}</div>`;
    }
}

// ★ 페이지 버튼 (2026-08-13). 예전엔 5개 묶음 단위로만 움직여서 220페이지 짜리
//   목록에서 뒤로 가려면 '>' 를 수십 번 눌러야 했다. 지금은 현재 페이지를 가운데 둔
//   5칸 + 처음/끝 + 직접 입력이다. 인라인 style 은 전부 style.css 16번 절로 갔다.
function rankPagerHtml(page, totalPages) {
    if (totalPages <= 1) return '';

    // ★ 양 끝 버튼은 못 눌러도 **자리를 지킨다**. 없앴다 만들었다 하면 가운데 정렬이라
    //   페이지를 넘길 때마다 번호들이 좌우로 튄다
    const btn = (p, label, title, on) =>
        `<button type="button" class="rank-pg"${on ? ` onclick="renderRankingPage(${p})"` : ' disabled'} title="${title}">${label}</button>`;

    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    startPage = Math.max(1, endPage - 4);   // 끝쪽에서도 5칸을 유지한다

    let html = `<div class="rank-pager">`;

    html += btn(1, '&laquo;', '처음', page > 1) + btn(page - 1, '&lsaquo;', '이전', page > 1);

    for (let p = startPage; p <= endPage; p++) {
        html += `<button type="button" class="rank-pg${p === page ? ' active' : ''}" onclick="renderRankingPage(${p})">${p}</button>`;
    }

    html += btn(page + 1, '&rsaquo;', '다음', page < totalPages) + btn(totalPages, '&raquo;', '끝', page < totalPages);

    html += `
        <span class="rank-pg-jump">
            <input type="number" min="1" max="${totalPages}" value="${page}" aria-label="페이지 번호"
                   onkeydown="if (event.key === 'Enter') renderRankingPage(this.value)">
            <span class="rank-pg-total">/ ${totalPages}</span>
        </span>`;

    return html + `</div>`;
}

function renderRankingPage(page, opts = {}) {
    const listDiv = document.getElementById('game-list');
    const data = filteredRankingData();
    const totalPages = Math.max(1, Math.ceil(data.length / RANKING_ITEMS_PER_PAGE));

    // 페이지 직접 입력과 검색을 같이 받으므로 여기서 한 번 가둔다
    page = Math.min(Math.max(1, parseInt(page, 10) || 1), totalPages);
    currentRankingPage = page;

    // ★ 검색 중에는 주소를 안 건드린다. 걸러낸 목록의 3페이지는 /ranking?page=3 이 아니라서,
    //   그 주소를 새로고침하면 엉뚱한 자리가 나온다
    if (!rankingQuery) {
        const newUrl = `/ranking?page=${page}`;
        if (window.location.pathname + window.location.search !== newUrl) {
            window.history.pushState({ page: 'ranking', rankingPage: page }, '', newUrl);
        }
    }

    const startIndex = (page - 1) * RANKING_ITEMS_PER_PAGE;
    const pageData = data.slice(startIndex, startIndex + RANKING_ITEMS_PER_PAGE);

    let rowsHtml = '';

    if (pageData.length === 0) {
        rowsHtml = `<tr><td colspan="5" class="rank-empty">'${escapeHtml(rankingQuery.trim())}' 와(과) 맞는 닉네임이 없습니다.</td></tr>`;
    }

    pageData.forEach(player => {
        const total = player.wins + player.losses;
        const winRate = total > 0 ? ((player.wins / total) * 100).toFixed(1) : '0.0';
        const t = rankTierInfo(player.tier);
        const safeName = escapeHtml(player.displayName);

        // ★ 닉네임을 아직 못 받아온 사람은 서버가 "User-a1b2c3d4" 로 채워 보낸다.
        //   라이엇 ID 에는 항상 #태그가 붙으므로 # 이 없으면 미해결이다.
        //   눌러도 검색이 헛돌기만 하니 링크로 안 만든다
        const resolved = player.displayName.includes('#');

        // ★ 닉네임을 onclick 문자열 안에 박지 않는다 (2026-08-13).
        //   아포스트로피가 든 닉네임이면 리터럴이 그 자리에서 닫혀 JS 가 깨졌고,
        //   그 사람만 클릭이 통째로 안 먹었다. data- 속성 + 이벤트 위임이면 안 생기는 문제다
        const nameCell = resolved
            ? `<span class="summoner-link" data-name="${safeName}" title="${safeName} 검색">${safeName}</span>`
            : `<span class="rank-unresolved" title="닉네임을 아직 불러오지 못했습니다">${safeName}</span>`;

        rowsHtml += `
            <tr>
                <td class="rank-num">${player.rank}</td>
                <td class="rank-tier">
                    <img class="rank-tier-medal" src="https://opgg-static.akamaized.net/images/medals_new/${t.icon}.png" alt="" loading="lazy">
                    <span class="rank-tier-name" style="color: ${t.color};">${t.name}</span>
                    <span class="rank-tier-short" style="color: ${t.color};">${t.short}</span>
                </td>
                <td class="rank-name">${nameCell}</td>
                <td class="rank-lp" style="color: ${t.color};">${player.leaguePoints}</td>
                <td class="rank-wr">
                    <span class="rank-wr-num" style="color: ${winRate >= 55 ? '#f87171' : '#60a5fa'}">${winRate}%</span>
                    <span class="rank-wl">(${player.wins}W ${player.losses}L)</span>
                </td>
            </tr>`;
    });

    const countHtml = rankingQuery.trim()
        ? `<div class="rank-count">검색 결과 <b>${data.length.toLocaleString()}</b>명 · 전체 ${fullRankingData.length.toLocaleString()}명</div>`
        : `<div class="rank-count">전체 <b>${fullRankingData.length.toLocaleString()}</b>명</div>`;

    const tableHtml = `
        <!-- ★ 인라인 style 을 클래스로 뺐다 (2026-08-11). min-width:600px 이 인라인이라
             @media 로 못 풀었고, 폰에서 LP·승률 칸이 화면 밖으로 밀려 옆으로 스크롤해야
             보였다. 값은 그대로고 색만 계산값이라 인라인에 남는다. style.css 16번 절 참고. -->
        <div class="rank-table-wrap">
            <table class="rank-table">
                <thead>
                    <tr>
                        <th class="rank-num">순위</th>
                        <th class="rank-tier">티어</th>
                        <th class="rank-name">닉네임</th>
                        <th class="rank-lp">LP</th>
                        <th class="rank-wr">승률</th>
                    </tr>
                </thead>
                <tbody class="ranking-body">${rowsHtml}</tbody>
            </table>
        </div>`;

    listDiv.innerHTML = countHtml + tableHtml + rankPagerHtml(page, totalPages);

    // 표를 매번 새로 그리므로 위임 리스너도 매번 붙인다 (tbody 하나에만 붙는다)
    const body = listDiv.querySelector('.ranking-body');
    if (body) {
        body.addEventListener('click', (e) => {
            const link = e.target.closest('.summoner-link');
            if (!link) return;
            document.getElementById('summoner-input').value = link.dataset.name;
            document.getElementById('search-btn').click();
        });
    }

    // 검색어를 칠 때마다 맨 위로 튀면 입력칸이 시야에서 사라진다
    if (!opts.keepScroll) window.scrollTo({ top: 0, behavior: 'smooth' });
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

// ★ 챔피언 페이지 전용 데이터 지연 로드 (2026-08-11).
//   custom_templates.js + custom_values.js + custom_lore.js 가 gzip 142KB 인데
//   전부 selectChampion() 안에서만 쓰인다. index.html 에서 바로 받으면
//   전적검색만 하러 온 사람도 그만큼 기다리게 되므로 챔피언 탭에서 처음 받는다.
//
//   index.html 이 <script class="lazy-champ-data" data-src="..."> 로 재워 두고
//   (src 로 두면 브라우저가 즉시 받아버린다) 여기서 진짜 script 로 바꿔 붙인다.
//   data-src 값에는 server.js 가 ?v=mtime 을 이미 붙여 놨다 — 그대로 써야
//   custom_values.js 를 고쳤을 때 브라우저가 새로 받는다.
let champDataPromise = null;
function loadChampionData() {
    if (champDataPromise) return champDataPromise;

    const tags = Array.from(document.querySelectorAll('script.lazy-champ-data[data-src]'));
    champDataPromise = Promise.all(tags.map(tag => new Promise((resolve, reject) => {
        const s = document.createElement('script');
        // ★ async = false 를 꼭 줘야 한다. 동적으로 만든 script 는 기본이 async 라
        //   받아지는 대로 실행돼서 순서가 안 정해진다. false 면 셋을 병렬로 받되
        //   문서에 넣은 순서대로 실행한다 (지금은 서로 참조가 없지만 순서는 지켜 둔다).
        s.async = false;
        s.src = tag.dataset.src;
        s.onload = resolve;
        s.onerror = () => reject(new Error('챔피언 데이터를 받지 못했습니다: ' + tag.dataset.src));
        document.head.appendChild(s);
    })));

    // 실패했으면 캐시를 비워서 다음에 탭을 다시 눌렀을 때 재시도되게 한다.
    champDataPromise.catch(() => { champDataPromise = null; });
    return champDataPromise;
}

// ============================================================
//  챔피언 목록 필터 — 검색(초성 지원) + 역할군 (2026-08-12)
// ============================================================

// 역할군은 Data Dragon 의 champion.json `tags` 다. 이미 받는 파일이라 추가 요청이 없다.
//   173명 전부 1~2개를 가진다 (0개도 3개도 없음).
const ROLE_ORDER = ['fighter', 'assassin', 'mage', 'marksman', 'tank', 'support'];
const ROLE_KO = {
    fighter: '전사', assassin: '암살자', mage: '마법사',
    marksman: '원거리 딜러', tank: '탱커', support: '서포터',
};
// 라이엇 공식 역할군 아이콘 (인게임 챔피언 정보창에 쓰는 그 금색 문양).
const ROLE_ICON = 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-champion-details/global/default/role-icon-';

// 챔피언 id → 역할군 배열(소문자). showChampions() 가 champion.json 을 받을 때 채운다.
//   스탯 탭의 "역할군 평균" 이 이 표로 모집단을 고른다. 추가 요청은 없다.
const champRoleMap = {};

// 검색 대상 문자열. "한글이름|초성|영문id" 를 공백 없이 이어 붙여 한 번에 비교한다.
//   초성 변환은 위쪽 "챔피언 필터 패널" 의 getChosung() 을 그대로 쓴다 — 표를 두 벌 두면 어긋난다.
//   영문 id 도 넣는 이유: "garen" 처럼 영타로 치는 사람이 있어서다.
function champSearchKey(champ) {
    const name = champ.name.replace(/\s+/g, '');
    return `${name}|${getChosung(name)}|${champ.id.toLowerCase()}`;
}

// 지금 켜져 있는 역할군. 여러 개 켜면 **전부 해당해야 통과**(AND)다.
//   ★ 챔피언은 역할을 최대 2개까지만 가진다. 그래서 3개 이상 켜면 결과는 항상 0명이다.
//     이건 버그가 아니라 데이터가 그런 것이다 (2026-08-12 확인).
const activeChampRoles = new Set();

window.toggleChampRole = function (btn) {
    const r = btn.dataset.role;
    if (activeChampRoles.has(r)) { activeChampRoles.delete(r); btn.classList.remove('on'); }
    else { activeChampRoles.add(r); btn.classList.add('on'); }
    filterChampList();
};

// 검색 상자 안 X 버튼 (2026-08-12).
//   ★ 어떤 필터 함수를 부를지 여기서 알 필요가 없다. 값을 지운 뒤 input 이벤트를
//     다시 쏘면 각 상자가 자기 oninput(filterChampList / filterVsList /
//     filterChampFilterList)을 알아서 돌린다. 상자가 늘어도 이 함수는 그대로다.
//   보임/숨김은 CSS 의 :placeholder-shown 이 처리한다 (style.css 참고).
window.clearSearchBox = function (btn) {
    const input = btn.parentNode.querySelector('input');
    if (!input || input.disabled) return;
    input.value = '';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.focus();
};

window.filterChampList = function () {
    const input = document.getElementById('champ-search-input');
    // ★ 영문은 **무조건** 한글 자판으로 읽는다 (폴백 없음). "rkfps" -> "가렌", "d" -> "ㅇ"
    const cands = koCandidates((input ? input.value : '').replace(/\s+/g, ''));
    let shown = 0;

    document.querySelectorAll('.champ-sidebar-item').forEach(el => {
        const key = (el.dataset.search || '').toLowerCase();
        const roles = (el.dataset.roles || '').split(' ');
        const okText = cands.some(c => key.includes(c));
        // AND — 켠 역할군을 **전부** 가진 챔피언만 남는다
        const okRole = [...activeChampRoles].every(r => roles.includes(r));
        const ok = okText && okRole;
        // ★ style.display 를 건드리면 안 된다 (2026-08-12).
        //   항목은 인라인 style 에 `display: flex` 를 갖고 있어서, 되돌리려고 '' 를 넣으면
        //   그 flex 까지 같이 지워진다 → 아이콘과 이름이 세로로 쌓여 상자가 깨진다.
        //   클래스로 끄고 CSS 에서 !important 로 인라인을 이긴다.
        el.classList.toggle('filtered-out', !ok);
        if (ok) shown++;
    });

    const empty = document.getElementById('champ-list-empty');
    if (empty) empty.style.display = shown ? 'none' : 'block';
};

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
        // ★ 버전 동기화를 반드시 기다린다. 안 기다리면 기본값(구버전)으로 받아서
        //   신규 챔피언이 목록에서 사라진다 — 로크가 이 경우였다 (2026-08-10).
        if (ddragonReady) await ddragonReady;

        // ★ 문장·수치·스토리를 여기서 처음 받는다. selectChampion() 이 바로 아래에서
        //   불리므로 반드시 목록 그리기 전에 끝나 있어야 한다.
        //   두 fetch 가 서로 안 기다리게 챔피언 목록과 같이 출발시킨다.
        const champDataLoaded = loadChampionData();

        const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/ko_KR/champion.json`);
        const data = await res.json();

        let champList = [];
        for (let key in data.data) {
            const c = data.data[key];
            // ★ 역할군 표를 여기서 같이 채운다. 스탯 탭의 "역할군 평균" 이 이걸 본다.
            //   목록 필터와 달리 **정규 챔피언만** 담는다 — 어느 탭으로 들어왔든 평균의
            //   모집단이 같아야 값이 안 흔들린다 (클래식은 championStats 에도 없다).
            if (!isClassicChamp(c.id)) champRoleMap[c.id] = (c.tags || []).map(t => t.toLowerCase());
            // 클래식 탭이면 Jade_ 계열만, 정규 탭이면 그 외만
            if (isClassicChamp(c.id) !== classicMode) continue;
            // tags = 역할군 (Fighter / Mage / Assassin / Marksman / Tank / Support).
            //   173명 전부 1~2개다 — 0개도 3개도 없다 (2026-08-12 확인).
            champList.push({ id: c.id, name: c.name, tags: c.tags || [] });
        }

        // 예전에는 Data Dragon 이 신규 챔피언을 늦게 올려서 목록에 손으로 넣어 뒀다.
        // 지금은 champion.json 이 전부 포함하고 있어 그대로 쓴다.
        // 새 챔피언이 안 보이면 Data Dragon 반영을 기다리면 된다.

        champList.sort((a, b) => a.name.localeCompare(b.name, 'ko-KR'));

        // 목록을 다시 그리면 버튼도 새로 만들어진다. 켜져 있던 역할군 표시를 같이 비워야
        // "버튼은 꺼져 보이는데 목록은 걸러져 있는" 상태가 안 생긴다.
        activeChampRoles.clear();

        if (champList.length === 0) {
            champsContainer.innerHTML = `<div style='text-align:center; padding:100px 0; min-height:60vh; color:#9aa4af;'>표시할 챔피언이 없습니다.</div>`;
            return;
        }

        let html = `
            <div class="stats-header" id="champ-page-header" style="margin-bottom: 20px; display: flex; align-items: center; justify-content: center; gap: 15px; height: 80px;">
                <h1 class="ranking-title">${classicMode ? '챔피언 정보 (클래식)' : '챔피언 정보'}</h1>
            </div>
            
            <!-- ★ 여기 세 덩이는 인라인 style 이었는데 클래스로 뺐다 (2026-08-11).
                 인라인은 스타일시트를 이겨서 @media 로 못 덮는다 — 폰에서 280px 목록이
                 그대로 버텨 상세 영역에 60px 밖에 안 남았다. style.css 15번 절 참고. -->
            <div class="champ-page-wrap">
                <div class="champ-list-col">
                    <div class="champ-filter">
                        <span class="search-wrap">
                            <input id="champ-search-input" class="champ-search" type="text" autocomplete="off"
                                   placeholder="챔피언 검색 (초성 가능)" oninput="filterChampList()">
                            <button type="button" class="search-clear" onclick="clearSearchBox(this)" aria-label="검색어 지우기">&times;</button>
                        </span>
                        <div class="role-btns">
                            ${ROLE_ORDER.map(r => `
                            <button class="role-btn" data-role="${r}" data-label="${ROLE_KO[r]}"
                                    onclick="toggleChampRole(this)" aria-label="${ROLE_KO[r]}">
                                <img src="${ROLE_ICON}${r}.png" alt="${ROLE_KO[r]}">
                            </button>`).join('')}
                        </div>
                    </div>
                <div class="champ-list-pane">
        `;

        html += champList.map(champ => `
            <div onclick="selectChampion('${champ.id}', '${champ.name}')" id="champ-item-${champ.id}" class="champ-sidebar-item"
                 data-search="${champSearchKey(champ)}" data-roles="${champ.tags.map(t => t.toLowerCase()).join(' ')}"
                 style="display: flex; align-items: center; gap: 12px; padding: 8px 12px; background: rgba(255,255,255,0.02); border: 1px solid transparent; border-radius: 8px; cursor: pointer; transition: all 0.2s;"
                 onmouseover="if(!this.classList.contains('active')) this.style.background='rgba(255,255,255,0.08)'"
                 onmouseout="if(!this.classList.contains('active')) this.style.background='rgba(255,255,255,0.02)'">
                <img src="https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${champ.id}.png" onerror="this.src='https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/profileicon/0.png'" style="width: 40px; height: 40px; border-radius: 6px; object-fit: cover;">
                <div style="font-size: 14px; font-weight: bold; color: #fff;">${champ.name}</div>
            </div>
        `).join('');

        html += `
                    <div id="champ-list-empty" class="champ-list-empty" style="display:none;">조건에 맞는 챔피언이 없습니다.</div>
                </div></div>
                <div id="champ-detail-area" class="champ-detail-pane">
                    <img src="https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/profileicon/0.png" style="width: 80px; opacity: 0.3; margin-bottom: 20px;">
                    <div style="color: #9aa4af; font-size: 18px;">👈 왼쪽에서 챔피언을 선택해주세요.</div>
                </div>
            </div>
        `;
        champsContainer.innerHTML = html;

        // 목록을 먼저 그려 두고 여기서 기다린다. 아래 selectChampion() 이
        // customTemplates / customValues / customLore 를 바로 읽기 때문이다.
        // 못 받았으면 아래 catch 가 잡는다 — 조용히 DD 툴팁으로 흘려보내면
        // `[스탯 비례]` 같은 미해결 토큰이 그대로 찍히므로 차라리 실패를 알린다.
        // (loadChampionData 가 실패 시 캐시를 비우므로 탭을 다시 누르면 재시도된다)
        await champDataLoaded;

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
            //
            // ★ 문장에 실제로 등장하는 {pN} 만 검사한다.
            //   가드의 목적은 "화면에 물음표가 찍히는 걸 막는 것" 이라
            //   문장이 안 쓰는 자리는 볼 이유가 없다.
            //   "현재 내 챔피언의 상태" 처럼 고정값이 없어서 문장에서 뺀 자리는
            //   custom_values.js 에 ? 로 남아 있는데(fill_values.js 가 CD 원본 desc 의
            //   @Name@ 을 훑어 만들기 때문에 손으로 지워도 재실행하면 되살아난다),
            //   예전 가드는 그것까지 세어서 멀쩡한 문장을 통째로 버렸다.
            // ★ 템플릿이 배열이면 "하위 스킬을 파트로 쪼갠 것" 이다. 가드는 합쳐서 검사한다.
            const tplFlat = Array.isArray(tpl) ? tpl.join(' ') : tpl;
            const unfilled = Object.keys(values).some(
                k => /^p[0-9]+$/.test(k)
                  && tplFlat && tplFlat.includes(`{${k}}`)
                  && (values[k] === '' || String(values[k]).includes('?'))
            );

            // ★ 챔피언 레벨에 따라 변하는 수치의 각주(그래프 / 계단 목록).
            //   custom_graphs.js 에 따로 있다 — 값(custom_values.js)도 문장(custom_templates.js)도
            //   스크립트가 매번 새로 찍기 때문에 거기 써 넣으면 재생성 때 날아간다.
            //   값 **바로 뒤**에 이어 붙여서 색칠된 수치의 마지막 글자에 각주가 달리게 한다.
            const graphs = (typeof customGraphs !== 'undefined' && customGraphs[champ.id]
                && customGraphs[champ.id][spellKey]) || {};

            if (tpl && !unfilled) {
                const fill = (t) => {
                    let x = t;
                    for (let key in values) {
                        x = x.split(`{${key}}`).join(values[key] + (graphs[key] || ''));
                    }
                    return x;
                };
                const bodyStyle = 'color: #ddd; line-height: 1.6; font-size: 14px;';

                // ★ 구분선 아래 작은 회색 글씨 (2026-08-12).
                //   인게임 툴팁에서 본문 아래에 한 칸 띄고 깔리는 부연 설명이다
                //   ("이 스킬은 피해를 입힐 때 효과가 발동합니다." 등).
                //   CD 의 dynamicDescription 에는 아예 없고, 라이엇이 따로 관리하는
                //   stringtable 키(keyTooltipExtendedBelowLine)에서 온다.
                //   build_champion_data.js 가 "<슬롯>_rules" 로 찍어 둔다 — belowline.js 참고.
                //
                //   ★ 가드는 **회색 글씨만** 버린다. 본문 가드처럼 통째로 폴백시키면
                //     부연 설명 하나 때문에 멀쩡한 스킬 문장이 DD 툴팁으로 떨어진다.
                //     값을 못 구한 자리가 9군데 있다 (드레이븐 R·파이크 R 등 f 계열).
                const rulesTpl = (typeof customTemplates !== 'undefined' && customTemplates[champ.id])
                    ? customTemplates[champ.id][spellKey + '_rules'] : null;
                const rulesBad = rulesTpl && Object.keys(values).some(
                    k => /^p[0-9]+$/.test(k)
                        && rulesTpl.includes(`{${k}}`)
                        && (values[k] === '' || String(values[k]).includes('?'))
                );
                //   글자 크기는 본문 14px 보다 한 단계 작게 (인게임도 작다).
                //   색은 <rules> 태그가 낸다 — app.js <style> 의 #5a5955, 인게임 실측값이다.
                const rulesHtml = (rulesTpl && !rulesBad)
                    ? `<div style="border-top: 1px solid rgba(255,255,255,0.12); margin: 14px 0;"></div>`
                    + `<div class="skill-rules" style="line-height: 1.55; font-size: 13px;">${fill(rulesTpl)}</div>`
                    : '';

                // ★ 배열 템플릿 = 하위 스킬(재시전·2타·3타·진화)을 아이콘과 함께 구분선으로 나눈다.
                //   0번은 스킬 본체라 기본 아이콘, 1번부터는 values.icons[i-1] 을 쓴다.
                //   (icons 는 findExtraIcons 가 bin 에서 뽑아 둔 추가 아이콘 배열이다)
                if (Array.isArray(tpl)) {
                    const extra = Array.isArray(values.icons) ? values.icons : [];
                    const slotIdx = ['Q', 'W', 'E', 'R'].indexOf(spellKey);
                    let baseImg = null;
                    if (spellKey === 'P' && champ.passive && champ.passive.image) {
                        baseImg = `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/passive/${champ.passive.image.full}`;
                    } else if (slotIdx >= 0 && champ.spells[slotIdx]) {
                        // 위 img 와 같은 이유로 values.img 가 있으면 그걸 우선한다 (벨베스 Q)
                        baseImg = values.img
                            || `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/spell/${champ.spells[slotIdx].image.full}`;
                    }
                    return tpl.map((part, i) => {
                        // ★ values.imgBody 는 **0번 파트 전용** 아이콘이다 (2026-08-12).
                        //   스킬 칸(버튼·이름)은 values.img 를 쓰는데, 그 둘을 다르게 하고 싶을 때만 쓴다.
                        //   유나라 Q 가 유일한 사례 — 버튼은 컬러(활성), "기본 지속 효과" 옆은 흑백(비활성).
                        const icon = i === 0 ? (values.imgBody || baseImg) : extra[i - 1];
                        // ★ 아이콘을 **첫 글줄 한가운데**에 맞춘다 (2026-08-10).
                        //   컨테이너가 align-items:flex-start 라 아이콘 위와 텍스트 블록 위가
                        //   맞춰지는데, 실제 화면에서는 **아이콘이 글자보다 위로 떠 보인다.**
                        //   글줄 상자(14px x 1.6 = 22.4px) 안에서 글자가 가운데에 놓이느라
                        //   위쪽에 여백이 생기기 때문이다. 그만큼 아이콘을 **내려야** 맞는다.
                        //   ★ 처음엔 부호를 반대로 잡아 아이콘을 올렸더니 격차가 더 벌어졌다.
                        //     방향이 헷갈리면 화면을 보고 판단할 것 — 부호만 바꾸면 된다.
                        //   글자 크기를 바꾸면 이 값도 같이 바뀌므로 calc 로 적어 둔다.
                        const iconPull = 'margin-top: calc((34px - 1.6 * 14px) / 2);';
                        const imgTag = icon
                            ? `<img src="${icon}" style="width: 34px; height: 34px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.12); flex-shrink: 0; ${iconPull}" onerror="this.style.visibility='hidden'">`
                            : `<div style="width: 34px; flex-shrink: 0;"></div>`;
                        return `<div style="display: flex; gap: 12px; align-items: flex-start;">${imgTag}<div style="flex: 1; ${bodyStyle}">${fill(part)}</div></div>`;
                    }).join('<div style="border-top: 1px solid rgba(255,255,255,0.12); margin: 14px 0;"></div>')
                        + rulesHtml;
                }

                return `<div style="margin-bottom: 10px; ${bodyStyle}">${fill(tpl)}</div>` + rulesHtml;
            }

            return `<div style="margin-bottom: 10px; color: #ddd; line-height: 1.6; font-size: 14px;">${riotDesc}</div>`;
        };

        // ★ 패시브 스킬 세팅
        const passive = {
            id: 'P1', keyChar: '패시브', name: champ.passive.name,
            desc: renderScalingTable('P', cleanTooltipText(champ.passive.description)),
            // ★ 문장을 파트로 쪼갠 스킬(배열 템플릿)은 구분선 아래에 아이콘이 붙는다.
            //   아직 안 쪼갠 스킬만 이름 옆에 아이콘을 보여 준다 — 안 그러면 화면에서 아예 사라진다.
            partTpl: Array.isArray((typeof customTemplates !== 'undefined' && customTemplates[champ.id]) ? customTemplates[champ.id]['P'] : null),
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
                // ★ 문장을 파트로 쪼갠 스킬(배열 템플릿)은 구분선 아래에 아이콘이 붙는다.
                //   아직 안 쪼갠 스킬만 이름 옆에 아이콘을 보여 준다 — 안 그러면 화면에서 아예 사라진다.
                partTpl: Array.isArray((typeof customTemplates !== 'undefined' && customTemplates[champ.id]) ? customTemplates[champ.id][spellSlotsKey[i]] : null),
                cooldown: customCd,
                cost: customCost,
                // ★ customValues 에 img 가 있으면 DD 기본 아이콘 대신 그걸 쓴다.
                //   DD 아이콘이 인게임과 다른 경우가 있다 — 벨베스 Q 가 유일한 사례로,
                //   DD 것은 사분면이 한 칸만 켜진 그림이고 인게임은 꽉 찬 그림이다.
                img: (customVals && customVals.img)
                    || `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/spell/${s.image.full}`,
                img2: customImg2,
                stats: customStats, // ★ 데이터에 스탯 저장
                values: customVals, // ★ 피해량/계수 (v1, v2)
                isPassive: false
            };
        }).filter(sp => {
            // ★ 템플릿이 null 이면 "이 챔피언에겐 이 키가 아예 없다" 는 뜻이라
            //   스킬 목록에서 통째로 뺀다. (아펠리오스 E — 무기 교체가 탄약 소진으로
            //   자동 진행돼서 E 키를 안 쓴다. Data Dragon 에는 더미가 들어 있다)
            //   "" 는 "아직 문장을 안 썼다"(= DD 폴백) 라서 뜻이 다르다. 여기서 걸러지면 안 된다.
            const t = (typeof customTemplates !== 'undefined' && customTemplates[champ.id])
                ? customTemplates[champ.id][sp.keyChar] : undefined;
            return t !== null;
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

        // ★ 스탯 탭 (2026-08-12). 내용은 renderChampStats 가 채운다.
        window.currentChampStatsId = champ.id;
        const statsHtml = `<div class="champ-stats-wrap"><div id="champ-stats-body"></div></div>`;

        // ★ HTML 틀 구성 (보조 아이콘 컨테이너 추가, 소모값 색상 #ddd 통일, 하단 커스텀 영역 확보)
        const skillsHtml = `
        <style>
            mainText { display: block; font-size: 14px; line-height: 1.6; color: #ddd; } stats { display: block; color: #a78bfa; font-size: 13px; margin-bottom: 12px; font-weight: bold; background: rgba(167, 139, 250, 0.05); padding: 10px; border-radius: 8px; border: 1px solid rgba(167, 139, 250, 0.1); }
            /* ★ 아래 색은 인게임 툴팁 스크린샷에서 픽셀을 직접 뽑은 값이다 (2026-08-09).
                 렐 W / 쉬바나 Q / 바드 P / 우디르 Q / 로크 W 를 썼고,
                 색이 나타나는 좌표가 해당 단어 위치와 맞는지 역으로 검증했다.
                 겹치는 태그는 서로 다른 스크린샷에서 같은 값이 나와 교차 확인됐다
                 (magicdamage 는 렐·쉬바나·바드 3장에서 동일).
                 ※ "구분이 잘 되게" 가 아니라 "인게임과 같게" 가 기준이다. 색끼리 비슷해도 그대로 둔다. */
            magicdamage { color: #0acbe6; font-weight: bold; } physicaldamage { color: #f26522; font-weight: bold; } truedamage { color: #cdfafa; font-weight: bold; }
            /* health 는 유미 P 처럼 <healing><health>…</health></healing> 로 중첩돼 있어
               같은 색을 쓴다. heal 도 같은 의미라 함께 묶었다 (실측한 건 healing 뿐). */
            healing, heal, health { color: #60e08f; font-weight: bold; } shield { color: #4dd0eb; font-weight: bold; }
            scalearmor { color: #f0ba57; } scalemr { color: #4fdfff; } scalemana { color: #189ce7; }
            keywordmajor { color: #dddd77; font-weight: bold; }
            speed { color: #fffdc9; font-weight: bold; } status { color: #ad76c4; font-weight: bold; }
            attackspeed { color: #ffe384; font-weight: bold; }
            spellname, onhit, scalelevel, attention, unique { color: #f0e6d2; font-weight: bold; }
            recast { color: #d67351; font-weight: bold; }
            scalead { color: #eb8d34; } scaleap { color: #786cff; }
            keywordstealth { color: #d182be; font-weight: bold; }
            evolve { color: #bc3598; font-weight: bold; }
            danger { color: #ff0000; font-weight: bold; }
            /* ★ 인게임 실측값은 #5a5955 인데 우리 배경이 인게임 툴팁보다 어두워서
                 거의 안 읽혔다. 밝기만 올린 값이다 (색상·채도는 그대로). 2026-08-12 */
            rules { color: #918f86; }
            /* 라벨류는 전부 "기본 지속 효과:" 색으로 통일한다.
               인게임은 스킬마다 미묘하게 다르지만(니코 W 는 사용 시만 연노랑,
               갈리오 W 는 충전 시작 시가 또 다름) 통일하는 쪽이 읽기 낫다는 판단. */
            active, passive, charge, release, toggle, tap, hold { display: block; margin-top: 8px; color: #f0e6d2; font-weight: bold; }
            /* ★ 이 태그들이 **파트 맨 앞**에 올 때는 위 여백을 없앤다 (2026-08-10).
               하위 스킬 파트는 각자 자기 <div> 에 들어가므로 첫 태그의 margin-top 8px 이
               텍스트만 아래로 밀어 **옆 아이콘과 수평이 어긋난다.**
               모데카이저 W(<active> 로 시작)와 르블랑 R(<spellname> 로 시작)이
               서로 다르게 보이던 원인이 이거였다. 구분선이 이미 간격을 주므로 여백은 불필요. */
            active:first-child, passive:first-child, charge:first-child,
            release:first-child, toggle:first-child, tap:first-child, hold:first-child { margin-top: 0; }
            /* 강인함(slow)은 인게임에서 색이 안 들어간다. 본문색을 그대로 따라간다. */
            slow { color: inherit; font-weight: normal; }
            /* scalehealth 와 lifesteal 은 실제로 같은 초록이다 (블라디미르 P / 아트록스 E).
               keyword 와 keywordstealth 도 같은 분홍보라다 (블라디미르 W / 니코 W).
               "구분이 안 된다" 가 아니라 라이엇이 원래 같은 색을 쓴다. */
            scalehealth, lifesteal { color: #1f995c; font-weight: bold; }
            keyword { color: #d182be; font-weight: bold; }
            armorpen { color: #f95f55; font-weight: bold; }
            omnivamp { color: #cb0c2d; font-weight: bold; }
            specialrules { color: #f0e6d2; font-weight: bold; }
            /* 아래는 인게임에서 색이 안 들어가는 자리다. 본문색을 그대로 따라간다. 전부 실측 확인:
               keywordname 탐 켄치 R "고정"·"심연 잠수", slow 가렌 W "60%의 강인함",
               level 애니비아 P, stattracking 드레이븐 P (뒤 둘은 스샷에 강조색 자체가 없었다). */
            keywordname, stattracking, level { color: inherit; }
            /* ★ <li> 에 CSS 가 없어서 브라우저 기본 불릿(동그라미)이 찍히고 있었다 (2026-08-12).
                 <ul> 없이 <li> 만 쓰는 문장이라 마커가 글 밖으로 삐져나오기도 했다.
                 인게임 툴팁은 동그라미가 아니라 짧은 줄표를 쓴다. DD 폴백 경로도
                 cleanTooltipText 가 <li> 를 "- " 로 바꾸고 있어서 이제 양쪽이 같아졌다. */
            li { display: block; margin: 2px 0; }
            li::before { content: '- '; color: #9aa4af; }
            /* activerank 는 구분선 아래 회색 글씨에서만 나온다 (볼리베어 E 한 자리).
               인게임 색을 실측한 적이 없으므로 색을 지어내지 않고 본문색을 따라간다. */
            activerank { color: inherit; }
            /* ★ 구분선 아래 회색 글씨(.skill-rules) 안에서는 라벨류를 인라인으로 되돌린다.
                 위 규칙이 display:block 이라 문장 한가운데서 줄이 끊긴다 —
                 이렐리아 W 의 "<charge>충전</charge>이 끝나면" 이 세 줄로 갈라졌다.
                 여기서는 라벨이 아니라 그냥 단어로 쓰인다. */
            .skill-rules active, .skill-rules passive, .skill-rules charge,
            .skill-rules release, .skill-rules toggle, .skill-rules tap, .skill-rules hold
                { display: inline; margin-top: 0; }
            /* --- 문장에 안 쓰이는 태그. 확인 대상이 아니다 --- */
            gold { color: #ffd700; font-weight: bold; }
            b { font-weight: bold; }
            i { font-style: italic; }
            /* ★ <font color=...> 는 라이엇이 원문에 색을 직접 박아 둔 것이고,
                 그 값이 인게임 색과 정확히 일치한다 (바드 P 의 "고대의 종" #cccc00,
                 "정령" #ff9900 을 스크린샷에서 뽑아 확인). 그러니 color 는 건드리지 않는다.
                 예전엔 여기서 color 를 !important 로 덮어써서 44곳의 라이엇 지정색이
                 전부 죽어 있었다 (아펠리오스 무기색·바드 종·아우렐리온 솔 별가루 등).
                 font-size 는 원문에 <font size='18'> 같은 게 있어 글자가 튀므로 계속 막는다. */
            font { display: inline; font-size: inherit !important; font-weight: bold; }
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
        <div class="champ-skill-layout">
            <div class="champ-skill-btns">
                ${window.currentChampSkills.map((skill, idx) => `
                    <!-- ★ 인라인 style 을 클래스로 뺐다 (2026-08-11). 폰에서 버튼 하나가
                         96px 라 5개면 512px 였고, 스킬 칸이 300px 대라 두 줄로 접혔다.
                         인라인이라 @media 로 줄일 수가 없었다. 값은 그대로고
                         모바일 규칙만 style.css 15번 절 @media 에 있다.
                         background·borderColor 는 playSkill 이 인라인으로 덮어쓴다. -->
                    <div onclick="playSkill(${idx})" id="skill-btn-${idx}" class="skill-btn">
                        <img src="${skill.img}" class="skill-btn-img" id="skill-img-${idx}">
                        <!-- ★ 라벨은 배열 인덱스가 아니라 skill.keyChar 로 붙인다.
                             인덱스로 매기면 슬롯이 하나라도 빠졌을 때 뒤가 통째로 밀린다
                             (아펠리오스는 E 가 없어서 R 버튼에 E 가 찍혔었다).
                             패시브만 keyChar 가 '패시브' 라 예외로 P 를 쓴다. -->
                        <div class="skill-btn-key">${skill.isPassive ? 'P' : skill.keyChar}</div>
                    </div>
                `).join('')}
            </div>
            <div class="champ-skill-body">
                <div class="champ-skill-box">
                    <div class="champ-skill-head">
                        
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <div style="display: flex; gap: 5px;">
                                <img id="champ-skill-icon-header" src="" style="width: 48px; height: 48px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">
                                <img id="champ-skill-icon-header-2" src="" style="width: 48px; height: 48px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); display: none;">
                                <!-- 재시전·취소·진화·1·2·3타 등 같은 스킬의 추가 아이콘. 개수가 가변이라 비워 둔다. -->
                                <span id="champ-skill-icon-extra" style="display: flex; gap: 5px;"></span>
                            </div>
                            <!-- ★ 라벨과 이름은 세로로 쌓아야 한다. 바깥은 flex 행이라
                                 감싸지 않으면 라벨이 이름 **옆**에 붙는다. -->
                            <div>
                                <!-- ★ 폼이 두 개인 챔피언의 **첫 번째 폼** 이름 (미니 나르·인간 형태…).
                                     아래 두 번째 폼 박스엔 원래부터 있던 라벨인데 본체 쪽엔 없어서
                                     어느 폼 설명인지 알 수 없었다. 같은 모양으로 맞춘다 (2026-08-10). -->
                                <div id="champ-skill-form" style="color: #a78bfa; font-size: 12px; font-weight: bold; margin-bottom: 2px; display: none;"></div>
                                <h3 id="champ-skill-name-header" style="color: #fff; font-size: 18px; font-weight: bold; margin: 0;"></h3>
                            </div>
                        </div>
                        <div class="champ-skill-meta">
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
                <div id="champ-skill2-box" class="champ-skill-box" style="display: none;">
                    <div class="champ-skill-head">
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <img id="champ-skill2-icon" src="" style="width: 48px; height: 48px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">
                            <div>
                                <div id="champ-skill2-form" style="color: #a78bfa; font-size: 12px; font-weight: bold; margin-bottom: 2px;"></div>
                                <h3 id="champ-skill2-name" style="color: #fff; font-size: 18px; font-weight: bold; margin: 0;"></h3>
                            </div>
                        </div>
                        <div class="champ-skill-meta">
                            <div id="champ-skill2-cooldown" style="color:#ddd;"></div>
                            <div id="champ-skill2-cost" style="color:#ddd;"></div>
                        </div>
                    </div>
                    <hr style="border:0; border-top: 1px solid #554433; margin: 20px 0;">
                    <div id="champ-skill2-desc" style="word-break: keep-all;"></div>
                </div>

                <!-- ★ 순서: [첫 폼 설명] [두 번째 폼 설명] [첫 폼 영상] [두 번째 폼 영상].
                     설명 둘을 먼저 붙이고 영상 둘을 그 아래에 **같은 순서로** 쌓는다
                     (미니 나르 - 메가 나르 - 미니 영상 - 메가 영상).
                     예전엔 두 번째 폼 영상이 설명 박스 **안에** 있어서 한 덩어리로 보였고,
                     첫 폼 영상은 맨 아래라 영상 순서가 거꾸로였다.
                     ★ 영상이 없는 스킬이 있다 (이즈리얼 패시브 등 — 라이엇이 안 만들었다).
                     기본을 display:none 으로 두고 **불러오기에 성공했을 때만** 보여 준다.
                     안 그러면 검은 화면만 덩그러니 남는다. -->
                <video id="champ-skill-video" autoplay loop muted playsinline style="width: 100%; aspect-ratio: 16/9; background: #000; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); object-fit: cover; flex-shrink: 0; display: none;"></video>
                <video id="champ-skill2-video" autoplay loop muted playsinline style="width: 100%; aspect-ratio: 16/9; background: #000; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); object-fit: cover; flex-shrink: 0; display: none;"></video>
            </div>
        </div>
        `;

        // ★ 스킨 목록은 CD 를 먼저 본다. 실패하면 DD 스플래시 한 장으로 물러나는데,
        //   레이아웃은 같은 걸 쓴다 (썸네일과 큰 그림이 같은 파일이 될 뿐이다)
        const cdSkins = await fetchCdSkins(champ.key);
        const skinList = cdSkins || champ.skins.map(s => {
            const url = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champId}_${s.num}.jpg`;
            return { name: s.name === 'default' ? '기본 스킨' : s.name, thumb: url, full: url, desc: '' };
        });
        window.currentSkinList = skinList;

        const skinsHtml = `
            <div class="skin-layout">
                <div class="skin-list">
                    ${skinList.map((skin, index) => `
                        <div class="skin-item${index === 0 ? ' active' : ''}" data-i="${index}" onclick="selectSkin(${index})">
                            <img class="skin-item-img" src="${skin.thumb}" alt="" loading="lazy">
                            <div class="skin-item-name">${skin.gem ? `<img class="skin-gem" src="${skin.gem}" alt="">` : ''}${escapeHtml(skin.name)}</div>
                        </div>
                    `).join('')}
                </div>
                <div class="skin-view">
                    <div class="skin-view-frame">
                        <img id="skin-view-img" class="skin-view-img" src="" alt="">
                    </div>
                    <div id="skin-view-name" class="skin-view-name"></div>
                    <div id="skin-view-desc" class="skin-view-desc"></div>
                </div>
            </div>
        `;

        detailArea.innerHTML = `
            <div class="champ-detail-inner">
                <div class="champ-tab-bar">
                    <button class="champ-tab-btn active" onclick="switchChampTab(event, 'skills')" style="padding: 15px 20px; background: transparent; border: none; color: #fff; font-weight: bold; font-size: 16px; cursor: pointer; border-bottom: 3px solid #a78bfa;">스킬</button>
                    <button class="champ-tab-btn" onclick="switchChampTab(event, 'stats')" style="padding: 15px 20px; background: transparent; border: none; color: #9aa4af; font-size: 16px; cursor: pointer; border-bottom: 3px solid transparent;">스탯</button>
                    <button class="champ-tab-btn" onclick="switchChampTab(event, 'skins')" style="padding: 15px 20px; background: transparent; border: none; color: #9aa4af; font-size: 16px; cursor: pointer; border-bottom: 3px solid transparent;">스킨</button>
                    <!-- ▼▼ 비공개 처리 (배경 탭) ▼▼
                         되살릴 때: 이 주석 한 줄만 풀면 된다. 탭 내용(loreHtml)과
                         switchChampTab 은 그대로라 바로 살아난다.
                    <button class="champ-tab-btn" onclick="switchChampTab(event, 'lore')" style="padding: 15px 20px; background: transparent; border: none; color: #9aa4af; font-size: 16px; cursor: pointer; border-bottom: 3px solid transparent;">배경</button>
                         ▲▲ 비공개 처리 끝 ▲▲ -->
                </div>
                <div class="champ-tab-scroll">
                    <div id="champ-tab-skills" class="champ-tab-content" style="display: block; height: 100%;">${skillsHtml}</div>
                    <div id="champ-tab-stats" class="champ-tab-content" style="display: none;">${statsHtml}</div>
                    <div id="champ-tab-skins" class="champ-tab-content" style="display: none; height: 100%;">${skinsHtml}</div>
                    <div id="champ-tab-lore" class="champ-tab-content" style="display: none;">${loreHtml}</div>
                </div>
            </div>
        `;

        playSkill(0);
        selectSkin(0);
        renderChampStats(champ.id);
    } catch (error) { detailArea.innerHTML = `<div style="color:#f87171;">데이터를 불러오지 못했습니다.</div>`; }
};

// ============================================================
//  스탯 탭 (2026-08-12)
//
//  데이터는 `public/champion_stats.js` (build_stats_page.js 생성).
//  [기본값, 레벨당증가, 방식] 만 들어 있고 레벨별 값은 여기서 계산한다.
//    '+' 덧셈형: base + per x g(N)
//    'x' 곱셈형: base x (1 + per x g(N))   ← 공격 속도만
//  g(N) 은 라이엇 성장 곡선이라 **직선이 아니다** (레벨곡선_정리.md 참고).
//
//  화면은 표가 본체다 (스탯 / 1레벨 / 18레벨). 스탯 이름을 누르면 그 줄 아래로
//  1~18레벨 꺾은선이 펼쳐진다 — 중간 레벨 값은 그래프에 커서를 올리면 나온다.
// ============================================================

// 스탯별 색. 스킬 설명 팔레트(app.js <style>)와 같은 값을 써서 사이트 안에서 일관되게 보이게 한다.
//   ★ 그래프는 스탯 하나당 선 하나(단일 시리즈)라 색이 "구분" 이 아니라 "이름표" 역할이다.
//     그래서 여러 색을 나란히 놓을 때 필요한 색맹 대비 검증 대상이 아니다.
const STAT_COLOR = {
    '체력': '#60e08f', '체력 재생(초당)': '#1f995c',
    '공격력': '#f26522', '공격 속도': '#ffe384',
    '방어력': '#f0ba57', '마법 저항력': '#4fdfff',
    '이동 속도': '#fffdc9', '사거리': '#cdfafa',
};
// 자원은 챔피언마다 이름이 다르다. 색은 인게임 자원바 느낌으로 묶는다.
const RESOURCE_COLOR = [
    [/마나|기류/, '#189ce7'],
    [/기력/, '#f1c40f'],
    [/분노|피의 샘|핏빛 격노/, '#e74c3c'],
    [/열기/, '#e67e22'],
    [/흉포|용기|투지|보호막/, '#a78bfa'],
];
const statColorOf = (name) => {
    if (STAT_COLOR[name]) return STAT_COLOR[name];
    const base = name.replace(/ 재생\(초당\)$/, '');
    for (const [re, c] of RESOURCE_COLOR) if (re.test(base)) return c;
    return '#9aa4af';
};

const fmtStat = (v) => {
    const n = Math.round(v * 100) / 100;
    return Number.isInteger(n) ? String(n) : String(n);
};
// 화면에 쓰는 이름. "(초당)" 은 좁아서 "/초" 로 줄인다.
const statLabel = (k) => k.replace('(초당)', '/초');

// ------------------------------------------------------------
//  1~18레벨 꺾은선
//
//  ★ SVG 는 **선만** 그리고 점·라벨·눈금은 HTML 로 얹는다 (2026-08-12).
//    처음엔 전부 SVG 로 그리고 `preserveAspectRatio="none"` 으로 폭을 늘렸는데,
//    **글자와 점이 가로로 3배 늘어나 찌그러졌다** (viewBox 320 → 실제 1100px).
//    선은 늘어나도 되지만 글자·원은 안 된다. 그래서 좌표만 % 로 잡고
//    나머지는 HTML 절대배치로 뺐다 — 폰이든 데스크톱이든 글자 크기가 그대로다.
//
//  · y 축은 0 부터 그린다. 밑을 자르면 조금 크는 값도 급상승처럼 보인다
//    (마법 저항력 32 -> 58 은 실제로 완만하다).
//  · 값 라벨은 **양 끝만** 찍는다. 18개 전부 찍으면 읽을 수 없다.
//    중간 값은 커서를 올리면 나온다.
//  · 점은 작아서 정확히 못 맞춘다 → 각 점이 담당하는 x 구간을 덮는 투명 칸을
//    **점 바로 앞**에 깔고 CSS 인접 선택자로 켠다.
//  · 숫자·라벨은 본문색을 쓴다. 색은 선과 점이 갖는다.
// ------------------------------------------------------------
function statGraphHtml(vals, color, extras = [], axis = null) {
    const n = vals.length;
    // ★ 축은 **밖에서 정해 받는다** (전 챔피언 범위, statGlobalRange).
    //   여기서 챔피언·평균선을 보고 잡으면 역할군 버튼을 켤 때마다 다시 스케일되어
    //   **챔피언 곡선의 개형이 바뀐다** — 같은 챔피언인데 선이 납작해졌다 살아난다.
    //   범위 밖으로 나가는 선은 clip 으로 자르고 범례에 "그래프 밖" 이라고 적는다.
    let top = (axis && axis.top) || Math.max(...vals) * 1.1 || 1;
    let bottom = (axis && axis.bottom) || 0;
    if (!(top > bottom)) { bottom = 0; top = top || 1; }
    const px = (i) => (i / (n - 1)) * 100;                    // x: 0~100%
    const py = (v) => ((v - bottom) / (top - bottom)) * 100;  // y: 바닥에서 0~100%
    const poly = (arr) => arr.map((v, i) => `${px(i)},${100 - py(v)}`).join(' ');

    // 선은 viewBox 를 늘려 그린다. 굵기는 non-scaling-stroke 로 2px 을 지킨다.
    //   평균선은 **먼저** 그려서 챔피언 선 아래에 깔린다 (겹치면 본인 값이 보여야 한다).
    //   clip 은 **평균선에만** 건다 — SVG 통째로 overflow:hidden 을 주면 양 끝
    //   x=0 / x=100 에서 챔피언 선의 굵기가 절반 잘려 끝이 얇아 보인다.
    const avgLines = !extras.length ? '' : `
                <defs><clipPath id="statClipY"><rect x="-20" y="0" width="140" height="100"/></clipPath></defs>
                <g clip-path="url(#statClipY)">` + extras.map(e => `
                    <polyline points="${poly(e.vals)}" fill="none" stroke="${e.color}"
                              stroke-width="${e.solid ? 2 : 1.5}"${e.solid ? '' : ' stroke-dasharray="5 4"'}
                              stroke-linejoin="round" stroke-linecap="round"
                              vector-effect="non-scaling-stroke" opacity="0.9"/>`).join('') + `
                </g>`;

    const grid = [6, 11, 16].map(lv => `
        <i class="g-grid" style="left:${px(lv - 1)}%"></i>
        <span class="g-ax" style="left:${px(lv - 1)}%">${lv}</span>`).join('');

    const marks = vals.map((v, i) => {
        const left = i === 0 ? 0 : (px(i - 1) + px(i)) / 2;
        const right = i === n - 1 ? 100 : (px(i) + px(i + 1)) / 2;
        // 양 끝에서는 말풍선이 잘리지 않게 정렬을 바꾼다
        const align = i <= 1 ? 'start' : (i >= n - 2 ? 'end' : 'mid');
        // 평균선을 켜 뒀으면 같은 말풍선에 그 레벨의 평균도 같이 적는다.
        // 선만 보고 눈대중하는 것보다 이쪽이 비교가 된다.
        const cmp = extras.map(e =>
            `<i class="g-cmp" style="color:${e.color}">${e.label} ${fmtStat(e.vals[i])}</i>`).join('');
        return `<i class="g-hit" style="left:${left}%; width:${right - left}%"></i>` +
            `<span class="g-pt g-a-${align}" style="left:${px(i)}%; bottom:${py(v)}%">` +
            `<i class="g-dot" style="background:${color}"></i>` +
            `<b class="g-val">Lv.${i + 1} · ${fmtStat(v)}${cmp}</b></span>`;
    }).join('');

    return `
    <div class="stat-graph-inner">
        <div class="g-plot">
            <svg class="g-line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${avgLines}
                <polyline points="${poly(vals)}" fill="none" stroke="${color}" stroke-width="2"
                          stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
            </svg>
            ${grid}
            <span class="g-end g-start" style="bottom:${py(vals[0])}%">${fmtStat(vals[0])}</span>
            <span class="g-end g-last" style="bottom:${py(vals[n - 1])}%">${fmtStat(vals[n - 1])}</span>
            ${marks}
            <span class="g-ax g-ax-first" style="left:0%">1</span>
            <span class="g-ax g-ax-last" style="left:100%">18</span>
        </div>
    </div>`;
}

// ------------------------------------------------------------
//  역할군 평균 비교 (2026-08-12)
//
//  그래프 위에 역할군 버튼 6개를 두고, 켜면 그 역할군 챔피언들의 **레벨별 평균**을
//  점선으로 겹쳐 그린다. 챔피언 본인 선은 굵은 실선이라 항상 위에 온다.
//  모집단은 champRoleMap (Data Dragon tags) ∩ championStats 다.
// ------------------------------------------------------------

// 평균선 색. 6개를 나란히 놓으므로 여기는 **색이 구분 역할**이라 색맹 대비가 필요하다.
//   Okabe-Ito 팔레트에서 골랐다 (스탯 색 팔레트와는 다른 목적이다).
const ROLE_LINE = {
    fighter: '#e69f00', assassin: '#d55e00', mage: '#56b4e9',
    marksman: '#009e73', tank: '#0072b2', support: '#cc79a7',
};
// 범례에서만 쓰는 짧은 이름. "원거리 딜러 평균 …" 은 줄이 길어서 역할군 버튼 오른쪽과
// 맞물린다. 버튼 말풍선에는 정식 이름이 그대로 나온다.
const ROLE_SHORT = { marksman: '원딜' };

// 지금 켜 둔 비교용 역할군. 스탯을 바꿔도 유지된다 (챔피언 목록 필터와는 별개다).
const avgRoles = new Set();

// (역할군, 스탯) → 1~18레벨 평균. 값은 안 변하므로 한 번 구하면 캐시한다.
const roleAvgCache = {};
function roleAvgVals(role, statKey) {
    const ck = role + '|' + statKey;
    if (ck in roleAvgCache) return roleAvgCache[ck];
    const acc = new Array(18).fill(0);
    let cnt = 0;
    for (const id in championStats) {
        const roles = champRoleMap[id];
        if (!roles || !roles.includes(role)) continue;
        // ★ 자원은 챔피언마다 키 이름이 다르다(마나·기력·분노…). **같은 키를 가진 챔피언만**
        //   센다 — 마나 평균에 기력을 섞으면 뜻이 없고, 자원 없는 챔피언을 0으로 넣으면
        //   평균이 통째로 내려앉는다.
        const v = championStats[id].s[statKey];
        if (!v) continue;
        for (let i = 0; i < 18; i++) acc[i] += statAtLevel(v, i + 1);
        cnt++;
    }
    return (roleAvgCache[ck] = cnt ? { vals: acc.map(x => x / cnt), count: cnt } : null);
}

// ★ y 축 = **전 챔피언이 갖는 값의 범위** (2026-08-12).
//   천장 = 18레벨 기준 1위 챔피언 / 바닥 = 1레벨 기준 꼴찌 챔피언.
//   내 챔피언 값으로 축을 잡으면 어느 챔피언을 봐도 선이 화면을 꽉 채워서
//   "이게 높은 건지 낮은 건지" 가 안 보인다. 전체 범위를 축으로 두면 선의 높이가
//   곧 순위 감각이 된다.
//   바닥이 0 이던 걸 "1레벨 최솟값" 으로 내린 이유: 어느 챔피언도 그 아래로는 안 가서
//   0~최솟값 구간이 항상 비어 있었다. 잘라내면 같은 세로 길이에서 차이가 더 보인다.
//   **역할군 평균·vs 챔피언도 이 범위를 못 벗어난다** (평균은 최소~최대 사이) —
//   축이 누구를 켜든 안 흔들리는 이유다.
const statRangeCache = {};
function statGlobalRange(statKey) {
    if (statKey in statRangeCache) return statRangeCache[statKey];
    let hi = null, lo = null;
    for (const id in championStats) {
        const v = championStats[id].s[statKey];
        if (!v) continue;
        const name = championStats[id].n;
        const a = statAtLevel(v, 1), b = statAtLevel(v, 18);
        // 성장은 단조증가라 18레벨이 최대·1레벨이 최소다. 그래도 양 끝을 다 본다.
        const m = Math.max(a, b), n = Math.min(a, b);
        if (!hi || m > hi.val) hi = { val: m, name };
        if (!lo || n < lo.val) lo = { val: n, name };
    }
    return (statRangeCache[statKey] = (hi && lo) ? { hi, lo } : null);
}

window.toggleStatAvgRole = function (btn) {
    const r = btn.dataset.role;
    if (avgRoles.has(r)) avgRoles.delete(r); else avgRoles.add(r);
    drawStatPanel();
};

// ------------------------------------------------------------
//  vs 챔피언 — 오른쪽 검색 상자에서 고른 챔피언을 그래프에 겹친다 (2026-08-12)
//
//  목록은 championStats 만 있으면 만들어진다 (키가 곧 DD id 라 아이콘 주소가 나온다).
//  왼쪽 목록과 달리 **역할군 아이콘 줄은 안 넣었다** — 바로 위 "역할군 평균과 비교"
//  아이콘과 생김새가 같아서 뜻이 갈리지 않는다.
// ------------------------------------------------------------

// 평균선(Okabe-Ito)과 안 겹치고 스탯 색과도 안 겹치는 색으로 사이트 강조색을 쓴다.
const VS_LINE = '#a78bfa';
let vsChampId = null;

// vs 상자는 **그래프가 떠 있을 때만** 쓸 수 있다. 겹칠 그래프가 없으면 눌러도
// 아무 일이 안 일어나서, 꺼진 걸 눈에 보이게 해 두는 편이 낫다.
function syncVsBox() {
    const col = document.querySelector('.stat-vs-col');
    if (!col) return;
    const off = !openStatKey;
    col.classList.toggle('off', off);
    const input = col.querySelector('#vs-search-input');
    if (input) {
        input.disabled = off;
        input.placeholder = off ? '스탯을 먼저 고르세요' : 'vs 챔피언 검색 (초성 가능)';
        if (off) { input.value = ''; filterVsList(); }
    }
}

window.pickVsChamp = function (id) {
    if (!openStatKey) return;                       // 상자가 꺼져 있을 때의 안전장치
    vsChampId = (vsChampId === id) ? null : id;
    document.querySelectorAll('.vs-item').forEach(el => el.classList.toggle('on', el.dataset.id === vsChampId));
    drawStatPanel();
};

window.filterVsList = function () {
    const q = (document.getElementById('vs-search-input') || {}).value || '';
    const cands = koCandidates(q.replace(/\s+/g, ''));
    let shown = 0;
    document.querySelectorAll('.vs-item').forEach(el => {
        const ok = cands.some(c => (el.dataset.search || '').includes(c));
        el.classList.toggle('filtered-out', !ok);
        if (ok) shown++;
    });
    const empty = document.getElementById('vs-list-empty');
    if (empty) empty.style.display = shown ? 'none' : 'block';
};

function vsBoxHtml(selfId) {
    const ids = Object.keys(championStats)
        .filter(id => id !== selfId)                 // 자기 자신과 비교할 이유는 없다
        .sort((a, b) => championStats[a].n.localeCompare(championStats[b].n, 'ko-KR'));
    const items = ids.map(id => {
        const name = championStats[id].n;
        // 초성 헬퍼는 챔피언 필터 절의 getChosung() 을 그대로 쓴다. 표를 두 벌 두면 어긋난다.
        const key = `${name.replace(/\s+/g, '')}|${getChosung(name.replace(/\s+/g, ''))}|${id}`.toLowerCase();
        return `<div class="vs-item${vsChampId === id ? ' on' : ''}" data-id="${id}" data-search="${key}"
                     onclick="pickVsChamp('${id}')" title="${name}">
                    <img src="https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${id}.png" alt="">
                    <span>${name}</span>
                </div>`;
    }).join('');
    // 처음 그릴 때는 아직 스탯을 안 골랐으니 꺼진 채로 나간다 (syncVsBox 가 켜 준다).
    return `
        <div class="stat-vs-col off">
            <span class="search-wrap">
                <input id="vs-search-input" class="champ-search vs-search" type="text" autocomplete="off"
                       placeholder="스탯을 먼저 고르세요" oninput="filterVsList()" disabled>
                <button type="button" class="search-clear" onclick="clearSearchBox(this)" aria-label="검색어 지우기">&times;</button>
            </span>
            <div class="vs-list-wrap">
                <div class="vs-list">${items}<div id="vs-list-empty" class="champ-list-empty" style="display:none">없음</div></div>
            </div>
        </div>`;
}

// 지금 그래프를 띄워 둔 스탯. 표를 다시 그려도 유지된다.
let openStatKey = null;

function drawStatPanel() {
    const panel = document.getElementById('stat-graph-panel');
    if (!panel) return;
    const rec = championStats[window.currentChampStatsId];
    const v = openStatKey && rec && rec.s[openStatKey];
    if (!v) {
        panel.classList.remove('open'); panel.innerHTML = '';
        // 그래프를 닫으면 겹칠 대상도 없다. vs 상자를 끄고 고른 챔피언도 푼다.
        vsChampId = null;
        document.querySelectorAll('.vs-item').forEach(el => el.classList.remove('on'));
        syncVsBox();
        return;
    }

    const vals = Array.from({ length: 18 }, (_, i) => statAtLevel(v, i + 1));
    // y 축은 **전 챔피언 범위**(18레벨 최대 ~ 1레벨 최소)다.
    // 챔피언·역할군·vs 어느 쪽으로도 안 흔들린다.
    const gr = statGlobalRange(openStatKey);
    const axis = gr ? { top: gr.hi.val, bottom: gr.lo.val } : null;
    const top = gr ? gr.hi.val : (Math.max(...vals) * 1.1 || 1);

    // 겹쳐 그릴 선들. 범례는 column-reverse 라 **DOM 앞이 아래**다 —
    // 비교 챔피언을 맨 앞에 두면 범례 맨 아래 칸에 온다.
    const extras = [];

    // vs 챔피언 (오른쪽 검색 상자에서 고른 챔피언). 평균이 아니라 실제 값이라 실선이다.
    const vsRec = vsChampId && championStats[vsChampId];
    const vsV = vsRec && vsRec.s[openStatKey];
    if (vsV) {
        extras.push({
            label: vsRec.n, color: VS_LINE, solid: true,
            vals: Array.from({ length: 18 }, (_, i) => statAtLevel(vsV, i + 1)),
        });
    }

    // 켠 역할군 중 이 스탯의 표본이 있는 것만 선으로 만든다.
    ROLE_ORDER.filter(r => avgRoles.has(r)).forEach(r => {
        const a = roleAvgVals(r, openStatKey);
        if (a) extras.push({
            role: r, label: (ROLE_SHORT[r] || ROLE_KO[r]) + ' 평균',
            color: ROLE_LINE[r], vals: a.vals, count: a.count,
            off: a.vals.some(x => x > top),   // 천장 밖 → 선이 잘린다. 범례에 적어 준다
        });
    });

    const btns = ROLE_ORDER.map(r => {
        const a = roleAvgVals(r, openStatKey);
        const on = avgRoles.has(r) && a;
        // 표본 수(N명)는 범례가 아니라 여기 말풍선에 적는다. 범례 줄이 길어지면
        // 역할군 버튼 오른쪽과 맞물린다.
        return `<button class="role-btn${on ? ' on' : ''}" data-role="${r}" data-label="${ROLE_KO[r]} 평균${a ? ` (${a.count}명)` : ' (없음)'}"
                        style="--rc:${ROLE_LINE[r]}" onclick="toggleStatAvgRole(this)"
                        aria-label="${ROLE_KO[r]} 평균"${a ? '' : ' disabled'}>
                    <img src="${ROLE_ICON}${r}.png" alt="${ROLE_KO[r]}">
                </button>`;
    }).join('');

    // 비교 챔피언이 이 스탯을 아예 안 가진 경우(가렌의 마나 등). 목록에는 켜져 있는데
    // 선이 없으면 고장 난 것처럼 보이므로 이유를 적어 준다.
    const vsNote = (vsRec && !vsV)
        ? `<span class="savg-item"><em>${vsRec.n} — 이 스탯 없음</em></span>` : '';

    const legend = vsNote + extras.map(e => `
        <span class="savg-item">
            <i class="savg-swatch${e.solid ? ' solid' : ''}" style="border-top-color:${e.color}"></i>${e.label}
            <b>${fmtStat(e.vals[0])} → ${fmtStat(e.vals[17])}</b>
            ${e.off ? '<em>그래프 밖</em>' : ''}
        </span>`).join('');

    // ★ 범례는 제목 줄 오른쪽 끝에 **아래에서 위로** 쌓인다 (2026-08-12).
    //   position:absolute + column-reverse 라 몇 줄이 되든 그래프가 안 밀린다.
    //   (폰에서는 옆에 놓을 자리가 없어 제목 아래 보통 흐름으로 떨어진다 — style.css 참고)
    panel.classList.add('open');
    panel.innerHTML = `
        <div class="stat-graph-head">
            <div class="sgh-row">
                <i class="stat-dot" style="background:${statColorOf(openStatKey)}"></i>
                <b>${statLabel(openStatKey)}</b>
                <span>레벨 1 → 18${gr ? ` · 세로축 ${fmtStat(gr.lo.val)}(${gr.lo.name}) ~ ${fmtStat(gr.hi.val)}(${gr.hi.name})` : ''}</span>
            </div>
            <div class="sgh-row">
                <span class="savg-title">역할군 평균</span>
                <span class="savg-btns">${btns}</span>
            </div>
        </div>
        ${statGraphHtml(vals, statColorOf(openStatKey), extras, axis)}
        <div class="savg-legend">${legend}</div>`;

    // ★ 범례는 DOM 상 그래프 **뒤**에 두고, 데스크톱에서만 제목 줄 자리로 끌어올린다.
    //   - 폰(정적 배치)에서는 그대로 그래프 아래에 남아 그래프가 안 밀린다.
    //   - 데스크톱에서는 bottom 을 제목 줄 끝에 맞춰야 하는데 제목 줄 높이가 글자
    //     줄바꿈에 따라 달라질 수 있어서 CSS 상수 대신 여기서 재서 넣는다.
    //     (translateY(-100%) 로 위로 자라므로 top 만 정해 주면 된다)
    //   ★ 바닥은 제목 블록 끝이다. 제목 블록 아래쪽에 여백(padding-bottom)을 잡아 두고
    //     거기서부터 위로 쌓는다 — 6역할군 + vs = 7줄이 다 들어가야 하는데,
    //     조상 `.champ-tab-scroll` 이 overflow:auto 라 **패널 위쪽으로 넘어가면 잘린다.**
    const head = panel.querySelector('.stat-graph-head');
    const lg = panel.querySelector('.savg-legend');
    if (head && lg) lg.style.top = head.offsetHeight + 'px';

    syncVsBox();
}

window.toggleStatGraph = function (key) {
    openStatKey = (openStatKey === key) ? null : key;
    document.querySelectorAll('.stat-tname').forEach(b => b.classList.toggle('on', b.dataset.key === openStatKey));
    drawStatPanel();
};

window.renderChampStats = function (champId) {
    const host = document.getElementById('champ-stats-body');
    if (!host) return;
    const rec = (typeof championStats !== 'undefined') ? championStats[champId] : null;
    if (!rec) { host.innerHTML = `<div class="stat-foot">이 챔피언의 스탯 데이터가 없습니다.</div>`; return; }

    const s = rec.s;
    openStatKey = null;
    // 챔피언을 바꾸면 비교 대상도 푼다. 안 그러면 "가렌 vs 가렌" 이 생긴다.
    vsChampId = null;

    // 줄 순서: 체력 / 체력 재생 / 자원 / 자원 재생 / 공격력 / 공격 속도 / 방어력 / 마법 저항력 /
    //          이동 속도 / 사거리.
    //   자원은 챔피언마다 이름이 달라서(마나·기력·분노·투지…) 남는 키를 자동으로 끼워 넣는다.
    const resKeys = Object.keys(s).filter(k => !STAT_COLOR[k]);
    const order = ['체력', '체력 재생(초당)',
        ...resKeys.filter(k => !/재생/.test(k)), ...resKeys.filter(k => /재생/.test(k)),
        '공격력', '공격 속도', '방어력', '마법 저항력', '이동 속도', '사거리'].filter(k => s[k]);

    const row = (k, color, v1, v18, clickable) => `
        <tr class="stat-trow">
            <th scope="row">
                <button class="stat-tname${clickable ? '' : ' flat'}" data-key="${k}"
                        ${clickable ? `onclick="toggleStatGraph('${k}')"` : 'disabled'}>
                    <i class="stat-dot" style="background:${color}"></i>${statLabel(k)}
                </button>
            </th>
            <td>${v1}</td>
            <td class="stat-t18">${v18}</td>
        </tr>`;

    // ★ 안 크는 스탯(대부분의 이동 속도·사거리)도 누를 수 있다. 수평선이어도 그게 정보고,
    //   역할군 평균과 겹쳐 보면 "안 크는데 남들보다 높다/낮다" 가 바로 보인다.
    //   못 누르는 건 아래 자원 없는 챔피언의 "-" 줄뿐이다.
    let rows = order.map(k => {
        const vals = Array.from({ length: 18 }, (_, i) => statAtLevel(s[k], i + 1));
        return row(k, statColorOf(k), fmtStat(vals[0]), fmtStat(vals[17]), true);
    }).join('');

    // ★ 자원을 안 쓰는 챔피언(가렌·리븐·카타리나 등)에도 마나 칸을 만든다.
    //   값은 "-" 다. 챔피언마다 표의 줄 수가 달라지면 옆에 붙는 그래프 칸 높이도 같이 흔들린다.
    if (!resKeys.length) {
        const dash = ['마나', '마나 재생(초당)']
            .map(k => row(k, '#3a4048', '-', '-', false)).join('');
        // 체력 재생 바로 뒤에 끼워 넣는다 (자원이 있는 챔피언과 같은 자리)
        const at = rows.indexOf('</tr>', rows.indexOf('체력 재생')) + 5;
        rows = rows.slice(0, at) + dash + rows.slice(at);
    }

    host.innerHTML = `
        <div class="stat-layout">
            <table class="stat-table">
                <thead><tr><th>스탯</th><th>1레벨</th><th>18레벨</th></tr></thead>
                <tbody>${rows}</tbody>
            </table>
            <div id="stat-graph-panel" class="stat-graph-panel"></div>
            ${vsBoxHtml(champId)}
        </div>
        <div class="stat-foot" id="stat-foot">스탯 이름을 누르면 오른쪽에 1~18레벨 성장 곡선이 나옵니다. 레벨 성장은 직선이 아니라 중간이 완만합니다.<br>그래프 위 역할군 아이콘을 누르면 그 역할군 챔피언들의 레벨별 평균이 점선으로, 오른쪽에서 고른 챔피언은 실선으로 겹쳐집니다.</div>`;
    syncVsBox();
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

    // ★ 스킬 이름 옆에는 **기본 아이콘 하나만** 둔다 (2026-08-10 변경).
    //   예전엔 하위 아이콘(재시전·진화·2타…)을 여기에 전부 늘어놨는데,
    //   그러면 "이게 뭘 가리키는 아이콘인지" 를 알 수 없다.
    //   지금은 배열 템플릿이 **구분선 아래 각 파트 옆에** 짝지어 그린다
    //   (가렌 E 의 "재사용 시" 옆처럼). 그래야 아이콘과 설명이 붙어서 뜻이 통한다.
    //   ★ 배열 템플릿이 아직 없는 스킬은 아이콘이 화면에 안 나온다.
    //     문장을 파트로 쪼개면 그때 나온다 — `남은작업.md` 1순위 참고.
    //   ★ 단, **아직 문장을 안 쪼갠 스킬**은 여기 말고는 아이콘을 보여 줄 자리가 없다.
    //     그런 스킬까지 비우면 아이콘이 화면에서 통째로 사라진다. 그래서 배열 템플릿이
    //     없는 스킬만 예전처럼 이름 옆에 붙인다 (문장을 쪼개면 자동으로 여기서 빠진다).
    const iconExtraEl = document.getElementById('champ-skill-icon-extra');
    if (iconExtraEl) {
        const list = (!skill.partTpl && skill.values && Array.isArray(skill.values.icons))
            ? skill.values.icons : [];
        iconExtraEl.innerHTML = list.map(u =>
            `<img src="${u}" style="width: 48px; height: 48px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);" onerror="this.style.display='none'">`
        ).join('');
    }

    // ★ 첫 번째 폼 라벨 (미니 나르·인간 형태…). 폼이 두 개인 챔피언에만 뜬다.
    //   두 번째 폼 박스의 라벨과 짝이다 — 한쪽만 있으면 어느 폼 설명인지 알 수 없다.
    const formEl = document.getElementById('champ-skill-form');
    if (formEl) {
        const f1 = (skill.values && skill.values.form1) || '';
        formEl.textContent = f1;
        formEl.style.display = f1 ? 'block' : 'none';
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

    // ★ 예시 영상. **없는 스킬이 있다** — 라이엇이 안 만든 자리다 (이즈리얼 패시브가 그렇다).
    //   예전엔 그냥 src 를 꽂아서 실패하면 **검은 네모만 남았다.**
    //   지금은 숨겨 두고 성공했을 때만 보여 준다.
    const VIDEO_BASE = 'https://d28xe8vt774jo5.cloudfront.net/champion-abilities';
    const setVideo = (el, id) => {
        if (!el) return;
        const url = `${VIDEO_BASE}/${window.currentChampPaddedKey}/ability_${window.currentChampPaddedKey}_${id}.webm`;
        if (el.dataset.want === url) return;      // 같은 영상이면 다시 안 건드린다
        el.dataset.want = url;
        el.style.display = 'none';
        el.onloadeddata = () => { if (el.dataset.want === url) el.style.display = 'block'; };
        el.onerror = () => { el.style.display = 'none'; };
        el.src = url;
        el.play().catch(() => { });
    };

    // ★ 라이엇이 파일 번호를 어긋나게 올린 자리 (2026-08-12 전수 조사).
    //   173챔피언 x P/Q/W/E/R x 1~5 를 전부 두드려 본 결과, 슬롯당 영상은 하나뿐이고
    //   두 번째 영상(Q2·W2·E2·R2)은 폼이 둘인 5명(나르·엘리스·제이스·니달리·렉사이)에만 있다.
    //   자헨만 Q 영상이 `Q1` 이 아니라 `Q2` 로 올라가 있어서 우리 화면에서 통째로 안 나왔다.
    //   (로크·신 짜오는 아예 영상이 없다. 우리 코드는 실패하면 조용히 숨기니 그대로 두면 된다)
    const VIDEO_ID_FIX = { '0904': { Q1: 'Q2' } };   // 4자리 키 -> { 원래id: 실제id }
    const fixId = (id) => (VIDEO_ID_FIX[window.currentChampPaddedKey] || {})[id] || id;

    setVideo(document.getElementById('champ-skill-video'), fixId(skill.id));

    // 두 번째 폼도 자기 영상이 따로 있다 (나르 메가 Q2·W2·E2 등)
    const v2El = document.getElementById('champ-skill2-video');
    if (v2El) {
        if (skill.form2) setVideo(v2El, fixId(skill.keyChar + '2'));
        else { v2El.style.display = 'none'; v2El.removeAttribute('src'); delete v2El.dataset.want; }
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

// ============================================================
//  스킨 탭 (2026-08-13)
//
//  왼쪽에 얼굴 중심 썸네일을 세로로 쌓고, 누르면 오른쪽에 원본 일러스트가 뜬다.
//  골격은 스킬 탭(.champ-skill-layout)과 같다.
//
//  ★ 데이터는 CommunityDragon 이다. Data Dragon 은 스플래시 한 장뿐이라
//    "얼굴 중심" 판본도, 한국어 스킨 설명도 없다.
//    CD `ko_kr/v1/champions/<숫자키>.json` 이 스킨마다 경로 4종을 직접 알려준다:
//      splashPath(1280x720 얼굴 중심) / uncenteredSplashPath(1215x717 원본)
//      tilePath(380 정사각) / loadScreenPath(308x560 세로)
//  ★ 스킨 번호는 연속이 아니다 — 가렌은 86011 다음이 86013 이다(86012 는 없다).
//    그래서 번호를 세서 만들지 말고 CD 가 준 목록을 그대로 쓴다
// ============================================================

const CD_ASSET_BASE = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/';

// ★ 등급 보석 아이콘. 라이엇이 이름으로 올려 둔 6종이 전부다 (2026-08-13 디렉터리 확인).
//   `kRare`(19개)·`kNoRarity`(832개)는 파일이 아예 없다 — 인게임에서도 보석이 없는 등급이라
//   빈칸으로 두는 게 맞다. `rare.png` 는 404 다.
const SKIN_GEM = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/rarity-gem-icons/';
const SKIN_RARITY_GEM = {
    kEpic: 'epic', kLegendary: 'legendary', kMythic: 'mythic',
    kUltimate: 'ultimate', kExalted: 'exalted', kTranscendent: 'transcendent'
};

function skinGemUrl(rarity) {
    const g = SKIN_RARITY_GEM[rarity];
    return g ? SKIN_GEM + g + '.png' : null;
}

// 신화 정수 아이콘. 경로는 CD 의 `v1/lolcurrency.json` 이 알려준다
//   (`lol_mythic_essence` → mythic-essence-icon.svg). 15x18 짜리 svg 고 그라데이션이
//   파일 안에 들어 있어서 어두운 배경에서도 그대로 보인다.
const ME_ICON = CD_ASSET_BASE + 'assets/currencies/images/mythic-essence-icon.svg';

// ★ 가격은 `public/skin_prices.js`(build_skin_prices.js 생성)에서 온다.
//   숫자 = RP, "m150" = 150 신화 정수, 키 없음 = 판매 대상이 아님(배틀패스·랭크 보상 등).
//   ★ 등급으로 가격을 추측하면 안 된다 — 전설 123개 중 2개가 975 고,
//     궁극 7개 중 하나가 2775 다. 반드시 이 표를 볼 것
//   ★ HTML 을 돌려준다. 값이 우리가 만든 표의 **숫자**라 이스케이프할 게 없고,
//     신화 정수는 글자 대신 아이콘으로 나가야 해서 태그가 필요하다
function skinPriceHtml(champKey, skinNum) {
    const v = (typeof skinPrices !== 'undefined' && skinPrices[champKey] || {})[skinNum];
    if (v === undefined) return '';
    if (typeof v === 'number') return v + 'RP';
    return Number(String(v).slice(1)) + ` <img class="me-icon" src="${ME_ICON}" alt="신화 정수" title="신화 정수">`;
}

// ★ CD 가 주는 경로는 `/lol-game-data/assets/ASSETS/Characters/...` 꼴인데
//   실제 파일은 **전부 소문자**다. 대문자를 그대로 붙이면 404 가 난다
function cdAssetUrl(p) {
    return p ? CD_ASSET_BASE + String(p).replace('/lol-game-data/assets/', '').toLowerCase() : null;
}

// 실패하면 null 을 돌려준다 — 부르는 쪽이 DD 스플래시로 물러난다.
// (클래식(Jade_) 챔피언은 CD 에 그 숫자키가 없을 수 있다)
async function fetchCdSkins(champKey) {
    try {
        const res = await fetch(`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/ko_kr/v1/champions/${champKey}.json`);
        if (!res.ok) return null;
        const data = await res.json();
        if (!Array.isArray(data.skins) || data.skins.length === 0) return null;

        return data.skins.map(s => ({
            name: s.isBase ? '기본 스킨' : s.name,
            thumb: cdAssetUrl(s.splashPath),
            // 원본이 없는 스킨이 있을 수 있으니 얼굴 중심 판본으로 물러난다
            full: cdAssetUrl(s.uncenteredSplashPath) || cdAssetUrl(s.splashPath),
            desc: s.description || '',
            gem: skinGemUrl(s.rarity),
            // ★ 기본 스킨엔 가격을 안 붙인다 (2026-08-13). 위키의 `cost` 가 기본 스킨 자리에선
            //   **스킨값이 아니라 챔피언 가격**이다 (이렐리아·트런들 등 880 짜리가 그 예다).
            //   "기본 스킨 - 880RP" 로 내보내면 없는 상품을 파는 말이 된다.
            //   스킨 id = 챔피언숫자키 x 1000 + 스킨번호. 가격표가 그 두 값으로 짜여 있다
            price: s.isBase ? '' : skinPriceHtml(Math.floor(s.id / 1000), s.id % 1000)
        }));
    } catch (e) {
        return null;
    }
}

window.selectSkin = function (index) {
    const list = window.currentSkinList;
    if (!list || !list[index]) return;

    window.currentSkinIndex = index;
    document.querySelectorAll('.skin-item').forEach(el => {
        el.classList.toggle('active', Number(el.dataset.i) === index);
    });

    const skin = list[index];
    const img = document.getElementById('skin-view-img');
    if (img) img.src = skin.full;

    // (등급 아이콘) 이름 - 가격.  가격을 모르는 스킨은 " - " 까지 통째로 뺀다
    const nameEl = document.getElementById('skin-view-name');
    if (nameEl) {
        nameEl.innerHTML =
            (skin.gem ? `<img class="skin-gem skin-gem-lg" src="${skin.gem}" alt="">` : '')
            + escapeHtml(skin.name)
            // price 는 skinPriceHtml 이 만든 HTML 이라 이스케이프하면 안 된다 (아이콘 태그가 들어 있다)
            + (skin.price ? ` <span class="skin-view-price">- ${skin.price}</span>` : '');
    }

    // 설명이 없는 스킨이 많다(2146개 중 315개가 빈칸). 없으면 줄을 통째로 접는다
    const descEl = document.getElementById('skin-view-desc');
    if (descEl) {
        descEl.textContent = skin.desc;
        descEl.style.display = skin.desc ? 'block' : 'none';
    }
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