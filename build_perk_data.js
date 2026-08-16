// ==========================================
// 룬·소환사 주문 이름/아이콘 표 생성  →  public/perk_data.js
//
//   통계 탭에서 챔피언 줄을 펼쳤을 때 나오는 룬 빌드 화면이 쓴다.
//   집계(champbuilds)는 **숫자 id 만** 저장하므로 이름과 그림은 여기서 온다.
//
//   ★ 출처가 둘이다. 한쪽만으로는 안 된다:
//     - 룬 93개 + 스탯 파편 10개 → CommunityDragon `ko_kr/v1/perks.json`
//       ★ Data Dragon 의 runesReforged.json 에는 **파편이 아예 없다.** 그래서 CD 다
//     - 룬 계열 5개                → CommunityDragon `ko_kr/v1/perkstyles.json`
//     - 소환사 주문 9개            → Data Dragon `summoner.json`
//       (CD 에도 있지만 아이콘 주소가 DD 쪽이 이미 쓰고 있는 형식이라 그대로 쓴다)
//
//   ★ 아이콘 경로는 CD 원문 그대로 담는다. 소문자 변환은 화면의 cdAssetUrl() 이 한다 —
//     표를 두 벌 두면 어긋나기 때문이다 (스킨 탭에서 쓰던 그 함수다).
//
//   한 번 받으면 되고 런타임 의존이 없다. 패치가 오면 다시 돌린다.
//   결과물이 8KB 라 통계 탭에서 처음 줄을 펼칠 때만 지연 로드한다.
// ==========================================
const fs = require('fs');
const path = require('path');

const CD = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/ko_kr/v1';
const DD_VER = process.env.DD_VER || '16.16.1';
const DD = `https://ddragon.leagueoflegends.com/cdn/${DD_VER}/data/ko_KR`;

const WRITE = process.argv.includes('--write');

async function getJson(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    return res.json();
}

(async () => {
    const [perks, styles, summoner] = await Promise.all([
        getJson(`${CD}/perks.json`),
        getJson(`${CD}/perkstyles.json`),
        getJson(`${DD}/summoner.json`)
    ]);

    // ── 룬 + 스탯 파편. id → [이름, CD 아이콘 경로]
    const perkMap = {};
    perks.forEach(p => { perkMap[p.id] = [p.name, p.iconPath]; });

    // ── 계열 5개. 아이콘이 룬과 다른 폴더에 있다.
    const styleMap = {};
    styles.styles.forEach(s => { styleMap[s.id] = [s.name, s.iconPath]; });

    // ── 계열별 슬롯 구성. 파편 슬롯(kStatMod)은 빼고 룬 슬롯 4개만 담는다.
    //    [0] 이 키스톤 슬롯이다.
    //
    //    ★★ 화면이 **보조 룬 2개를 슬롯 순서로 되돌릴 때** 이걸 쓴다.
    //      집계 키는 라이엇이 주는 순서가 들쭉날쭉해서(같은 룬 페이지가 두 조합으로
    //      갈렸다) id 순으로 정렬해 못 박는데, **id 순서와 슬롯 순서는 다르다**
    //      (전수로 확인: 어긋나는 쌍이 139개). 그대로 그리면 영감 룬이
    //      "환급 → 삼중 물약" 처럼 인게임과 거꾸로 나온다.
    //    주 룬 3개는 라이엇이 이미 슬롯 순서로 주므로(실측: 정렬해도 가짓수가 안 변한다)
    //    정렬하지 않고 받은 순서를 그대로 쓴다.
    const slots = {};
    styles.styles.forEach(s => {
        slots[s.id] = (s.slots || []).filter(sl => sl.type !== 'kStatMod').map(sl => sl.perks);
    });

    // ── 소환사 주문. 협곡에 나오는 것만 (모드 전용 주문까지 담을 이유가 없다)
    const spellMap = {};
    Object.values(summoner.data)
        .filter(s => s.modes.includes('CLASSIC'))
        .forEach(s => { spellMap[s.key] = [s.name, s.image.full]; });

    const out = `// 자동 생성 — build_perk_data.js (${new Date().toISOString().slice(0, 10)})
// 룬·계열·스탯 파편·소환사 주문의 한국어 이름과 아이콘 경로.
// 통계 탭 룬 빌드 화면이 쓴다. 손으로 고치지 말 것 — 패치 때 다시 생성된다.
//
// 값은 [이름, 아이콘경로] 다.
//   perks / styles 의 경로는 CommunityDragon 원문이라 cdAssetUrl() 로 감싸야 한다.
//   spells 의 경로는 파일 이름뿐이라 Data Dragon 주소를 앞에 붙여 쓴다.
//   slots 는 계열 id → 룬 슬롯 4개(파편 제외). [0] 이 키스톤이고,
//   보조 룬 2개를 인게임과 같은 순서로 되돌릴 때 쓴다.
const perkData = {
    perks: ${JSON.stringify(perkMap, null, 0)},
    styles: ${JSON.stringify(styleMap, null, 0)},
    slots: ${JSON.stringify(slots, null, 0)},
    spells: ${JSON.stringify(spellMap, null, 0)}
};
`;

    console.log(`룬 ${Object.keys(perkMap).length}개 (파편 ${perks.filter(p => p.id >= 5000 && p.id < 6000).length}개 포함)`);
    console.log(`계열 ${Object.keys(styleMap).length}개 / 소환사 주문 ${Object.keys(spellMap).length}개`);
    console.log(`크기 ${(Buffer.byteLength(out) / 1024).toFixed(1)}KB`);

    if (WRITE) {
        const dest = path.join(__dirname, 'public', 'perk_data.js');
        fs.writeFileSync(dest, out);
        console.log(`→ ${dest}`);
    } else {
        console.log('(--write 를 붙여야 파일을 만든다)');
    }
})().catch(e => { console.error(e); process.exit(1); });
