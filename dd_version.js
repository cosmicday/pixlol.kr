// ==========================================
// Data Dragon 최신 버전을 한 곳에서 정한다 — build_*.js 넷이 같이 쓴다
//   (build_level_curves / build_codex_data / build_perk_data / build_champion_lore)
//
//   ★★ 왜 하드코딩을 걷어냈나 (2026-08-24): **옛 버전 주소가 안 죽는다.**
//     `.../cdn/16.16.1/data/ko_KR/item.json` 은 패치가 지나도 404 가 아니라
//     **지난 패치 데이터를 정상 응답으로 준다.** 그래서 버전을 안 올리면 스크립트가
//     아무 불평 없이 돌고 로그도 깨끗하고 결과 파일도 멀쩡히 만들어진다 —
//     **내용만 지난 패치인 채로.** 도감·룬은 패치마다 몇 줄만 바뀌어서
//     diff 로도 안 드러난다. 패치 때 손으로 네 곳을 고치던 것이 이 함수 하나가 됐다.
//
//   ★ `DD_VER` 환경변수가 있으면 그게 이긴다 — 일부러 옛 버전으로 빌드할 때.
//       DD_VER=16.16.1 node build_codex_data.js --write
//
//   ★ 어느 버전으로 받았는지 반드시 로그에 남긴다. 자동이 되는 순간
//     "무슨 버전으로 빌드했는지 안 보이는 것" 이 새 위험이 되기 때문이다.
//
//   ★ 한 프로세스 안에서는 한 번만 받는다(cached). 여러 곳에서 불러도
//     **같은 버전이 보장돼야** 한 빌드 안에서 파일끼리 어긋나지 않는다.
//
// ------------------------------------------------------------
//   ★★★ DD·CD 짝짝이 가드 — `ddVersion({ withCD: true })`
//
//     **자동화가 오히려 위험해지는 창이 하루 12시간 있다.** 라이엇은
//     Data Dragon 을 **수요일 04시 KST** 에 올리고 CommunityDragon 은 그로부터
//     **12시간쯤 뒤(수 16시 KST)** 에 따라온다. 손으로 버전을 올리던 시절에는
//     "아직 안 올렸다" 가 그 창을 자연히 막아 주고 있었는데, 자동으로 최신을
//     따라가면 **그 창에 돌렸을 때 DD 만 새 패치, CD 는 옛 패치**가 된다.
//     도감이라면 아이템 이름·가격·조합식(DD)만 새 패치고 등급·룬(CD)은
//     옛 패치인 짝짝이가 나가고, **화면이 안 깨져서 눈으로는 안 걸린다.**
//
//     ★ CD 는 자기 패치를 직접 알려준다 (2026-08-24 확인):
//         https://raw.communitydragon.org/latest/content-metadata.json
//         → {"version": "16.16.8049184+branch.releases-16-16.content.release"}
//       앞 두 자리를 DD 최신의 앞 두 자리와 맞춰 보면 그 창을 정확히 잡는다.
//       (스킬데이터.md 25번이 제안한 `Last-Modified` 대조보다 이쪽이 정확하다)
//
//     ★ DD 와 CD 를 **둘 다 쓰는 스크립트만** 이 가드를 켠다 —
//       codex(DD 아이템 + CD 등급·룬) · perk(DD 주문 + CD 룬) ·
//       level_curves(DD 스탯 + .cache/bin). `build_champion_lore` 는 상대가
//       Universe 라 CD 와 무관해서 안 켠다.
//
//     ★ `DD_VER` 을 직접 준 경우엔 대조를 건너뛴다 — 사람이 일부러 정한 것이라
//       거기까지 막으면 탈출구가 없어진다. 대신 건너뛴 사실을 로그에 남긴다.
// ==========================================
const VERSIONS_URL = 'https://ddragon.leagueoflegends.com/api/versions.json';
const CD_META_URL = 'https://raw.communitydragon.org/latest/content-metadata.json';

let cached = null;
let cdChecked = false;

// "16.16.1" → "16.16" / "16.16.8049184+branch..." → "16.16"
const patchOf = (v) => String(v).split('.').slice(0, 2).join('.');

async function fetchDD() {
    if (process.env.DD_VER) {
        console.log(`[DD] 버전 ${process.env.DD_VER} (환경변수 DD_VER)`);
        return process.env.DD_VER;
    }
    const res = await fetch(VERSIONS_URL);
    if (!res.ok) {
        throw new Error(`versions.json 응답 ${res.status} — DD_VER 환경변수로 직접 지정할 수 있다`);
    }
    const list = await res.json();
    if (!Array.isArray(list) || !list[0]) {
        throw new Error('versions.json 이 비었거나 배열이 아니다 — DD_VER 환경변수로 직접 지정할 수 있다');
    }
    console.log(`[DD] 버전 ${list[0]} (최신)`);
    return list[0];
}

async function checkCD(ddVer) {
    const res = await fetch(CD_META_URL);
    if (!res.ok) {
        // CD 가 잠깐 안 될 수도 있다. 대조를 못 했다는 사실만 남기고 통과시킨다 —
        // 여기서 멈추면 CD 장애 때 빌드가 통째로 막힌다.
        console.log(`[CD] ★ 버전 대조 실패 (content-metadata.json 응답 ${res.status}) — 대조 없이 진행한다`);
        return;
    }
    const cdVer = (await res.json()).version;
    const dd = patchOf(ddVer);
    const cd = patchOf(cdVer);

    if (dd === cd) {
        console.log(`[CD] 패치 ${cd} — DD 와 일치`);
        return;
    }

    throw new Error(
        `★★ DD 와 CD 의 패치가 어긋난다 — DD ${dd} / CD ${cd}\n` +
        `   라이엇이 Data Dragon 을 먼저(수 04시 KST) 올리고 CommunityDragon 은\n` +
        `   그로부터 12시간쯤 뒤(수 16시 KST)에 따라온다. 지금 빌드하면 DD 에서\n` +
        `   오는 것만 새 패치고 CD 에서 오는 것은 옛 패치인 짝짝이가 되는데,\n` +
        `   화면이 안 깨져서 눈으로는 안 걸린다.\n` +
        `   → CD 가 따라올 때까지 기다렸다가 다시 돌릴 것 (한국시간 오후 4시 이후)\n` +
        `   → 일부러 그렇게 빌드하려면 DD_VER=${ddVer} 처럼 직접 지정하면 대조를 건너뛴다`
    );
}

async function ddVersion(opts = {}) {
    if (!cached) cached = await fetchDD();

    if (opts.withCD && !cdChecked) {
        cdChecked = true;
        if (process.env.DD_VER) {
            console.log('[CD] 버전 대조 건너뜀 (DD_VER 을 직접 줬다)');
        } else {
            await checkCD(cached);
        }
    }
    return cached;
}

module.exports = { ddVersion };
