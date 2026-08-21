// ==========================================
// 룬 레벨 스케일 각주 생성  →  public/rune_graphs.js
//   도감 룬 탭에서 "레벨에 따라 40~160" 같은 수치 뒤에 붙는 각주(꺾은선 그래프) 데이터다.
//   화면은 app.js 의 drawGraph() 가 그린다 — 챔피언 스킬 각주와 **같은 함수**다.
//
// ★★ 값의 출처는 롤위키다. 게임 데이터(perks.cdtb.bin.json)에는 **최소·최대 두 숫자밖에
//   없어서** 그 사이를 어떻게 오르는지는 알 수 없다. 대부분은 1~18레벨 직선인데
//   **`생명 흡수`(9101) 하나가 비선형이다**:
//       1 · 1.25 · 1.5 · 1.75 · 2 · 3 · 4 · 5 · 6 · 7 · 9 · 11 · 13 · 15 · 17 · 19 · 21 · 23
//   직선으로 그렸으면 6레벨이 3이 아니라 4.2 로 틀리게 나온다. 위키를 쓰는 이유가 이것이다.
//
// ★★ 위키는 지금 **20레벨**로 렌더한다 (`{{pp}}` 툴팁의 data-bot-values 가 20칸).
//   우리 사이트는 스탯 탭·스킬 각주가 전부 1~18이라 **앞 18칸만** 쓴다.
//   18번째 값이 한국어 문장의 최대치와 같은지 반드시 검산한다 — 안 맞으면 그 자리를 버린다.
//
// ★ 위키 페이지에서 **첫 <h2> 앞(소개·인포박스)** 만 본다. 뒤쪽은 Patch History 와
//   아레나 증강체라 **옛 수치가 잔뜩 섞여 있다** (집중 공격 페이지에만 옛 툴팁이 8개다).
//
// 패치가 오면 다시 돌린다. 런타임 의존은 없다.
//   node build_rune_graphs.js            # 검산만
//   node build_rune_graphs.js --write    # public/rune_graphs.js 생성
// ==========================================
const fs = require('fs');
const path = require('path');

const CD = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global';
const PERK_BIN = 'https://raw.communitydragon.org/latest/game/perks.cdtb.bin.json';
const WIKI = 'https://wiki.leagueoflegends.com/en-us/api.php';
const WRITE = process.argv.includes('--write');
const LEVELS = 18;

// ── 각주를 달 자리.
//   anchor : 한국어 설명에 **그대로 들어 있는 문자열**. 이 문자열 바로 뒤에 각주가 붙는다.
//   expect : [1레벨, 18레벨] 값. 안 적으면 anchor 에서 숫자 둘을 뽑아 쓴다.
//   scale  : 위키 값 x scale = 우리 문장의 값 (죽음불꽃 손길은 위키가 **틱당**, 문장은 **초당**이라 2배)
//   page   : 위키 문서 이름. 안 적으면 CD 의 영문 룬 이름을 쓴다.
//   whole  : 문서 전체를 훑는다. 룬 총정리 문서처럼 표가 <h2> **아래**에 있는 경우만.
//            (룬 개별 문서에 쓰면 Patch History 의 옛 수치를 집어올 수 있으니 쓰지 말 것)
//   bin    : 게임 데이터 검산에 쓸 두 숫자. 문장 값과 게임 데이터 값이 다른 자리에만 적는다.
const TARGETS = [
    { perk: 8005, anchor: '40~160', title: '레벨별 추가 피해', color: '#48C4B7' },
    { perk: 8126, anchor: '10 ~ 45', title: '레벨별 추가 고정 피해', color: '#cdfafa' },
    { perk: 8139, anchor: '16 ~ 40', title: '레벨별 회복량', color: '#60e08f' },
    { perk: 8141, anchor: '[30 - 45]초', title: '평균 챔피언 레벨별 지속시간 증가', color: '#dddd77' },
    { perk: 8141, anchor: '[45 - 150]초', title: '평균 챔피언 레벨별 지속시간 증가 (투명 와드)', color: '#dddd77' },
    { perk: 8143, anchor: '20~80', title: '레벨별 추가 고정 피해', color: '#cdfafa' },
    { perk: 8214, anchor: '10~50', title: '레벨별 피해량', color: '#48C4B7' },
    { perk: 8214, anchor: '20~100', title: '레벨별 보호막', color: '#4dd0eb' },
    { perk: 8229, anchor: '15~100', title: '레벨별 적응형 피해', color: '#48C4B7' },
    { perk: 8229, anchor: '20~8초', title: '레벨별 재사용 대기시간', color: '#f0e6d2' },
    { perk: 8232, anchor: '13~30', title: '레벨별 적응형 능력치', color: '#48C4B7' },
    // ★ 게임 데이터(MinAdaptive 3 / MaxAdaptive 30)는 **주문력 기준**이다.
    //   공격력은 그 60% 라 1.8~18 인데 그 숫자는 데이터에 없다 — 검산은 주문력 값으로 한다.
    { perk: 8233, anchor: '최대 18', expect: [1.8, 18], bin: [3, 30], title: '레벨별 추가 공격력', color: '#eb8d34' },
    { perk: 8233, anchor: '최대 30', expect: [3, 30], title: '레벨별 추가 주문력', color: '#786cff' },
    { perk: 8237, anchor: '20~40', title: '레벨별 추가 마법 피해', color: '#0acbe6' },
    { perk: 8439, anchor: '25~120', title: '레벨별 피해량', color: '#0acbe6' },
    { perk: 8439, anchor: '80~150', title: '레벨별 추가 저항력', color: '#f0ba57' },
    { perk: 8473, anchor: '30~60', title: '레벨별 피해 감소량', color: '#f0ba57' },
    { perk: 8992, anchor: '3~12', scale: 2, title: '레벨별 초당 피해량', color: '#0acbe6' },
    { perk: 9101, anchor: '1~23', title: '레벨별 회복량', color: '#60e08f' },
    // 스탯 파편은 자기 문서가 없다. 룬 총정리 문서(Rune)에 표로 들어 있다.
    { perk: 5001, anchor: '10~180', page: 'Rune', whole: true, title: '레벨별 체력', color: '#60e08f' }
];

const getJson = async url => {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`${r.status} ${url}`);
    return r.json();
};
const sleep = ms => new Promise(r => setTimeout(r, ms));
const round2 = n => Math.round(n * 100) / 100;

// 위키 문서 하나에서 본문(첫 <h2> 앞)의 pp 툴팁을 전부 뽑는다
async function wikiTips(page, whole) {
    const j = await getJson(`${WIKI}?action=parse&page=${encodeURIComponent(page)}&prop=text&format=json&disablelimitreport=1`);
    if (j.error) return null;
    const html = j.parse.text['*'];
    const h2 = html.search(/<h2[ >]/);
    const body = (whole || h2 < 0) ? html : html.slice(0, h2);
    return [...body.matchAll(/<span class="pp-tooltip"[^>]*data-bot-values="([^"]*)"[^>]*>([\s\S]*?)<\/span>/g)]
        .map(m => ({
            label: m[2].replace(/<[^>]+>/g, '').trim(),
            values: m[1].split(';').filter(Boolean).map(Number)
        }))
        .filter(t => t.values.length >= LEVELS);
}

(async () => {
    const [enPerks, koPerks, bin, codexSrc] = await Promise.all([
        getJson(`${CD}/default/v1/perks.json`),
        getJson(`${CD}/ko_kr/v1/perks.json`),
        getJson(PERK_BIN),
        Promise.resolve(fs.readFileSync(path.join(__dirname, 'public', 'codex_data.js'), 'utf8'))
    ]);
    const enName = {}, koName = {};
    enPerks.forEach(p => enName[p.id] = p.name);
    koPerks.forEach(p => koName[p.id] = p.name);

    // 게임 데이터의 수치 뭉치 (검산용). 룬마다 필드 이름이 제각각이라 "값이 들어 있나" 만 본다.
    const binNums = {};
    Object.values(bin).forEach(v => {
        if (!v || typeof v !== 'object' || !v.mPerkId) return;
        const ea = v.mScript && v.mScript.mSpellScriptData && v.mScript.mSpellScriptData.mEffectAmount;
        binNums[v.mPerkId] = ea ? Object.values(ea).filter(x => typeof x === 'number').map(round2) : [];
    });

    // 도감 데이터를 그대로 읽어서 앵커가 실제로 있는지 확인한다
    const codex = (() => {
        const sandbox = {};
        const body = codexSrc.split('\n').filter(l => !l.startsWith('//')).join('\n')
            .replace(/^const codexData =/m, 'sandbox.data =');
        new Function('sandbox', body)(sandbox);
        return sandbox.data;
    })();

    const out = {};
    let ok = 0, skipped = 0;
    const pageCache = {};

    for (const t of TARGETS) {
        const id = String(t.perk);
        const ko = koName[t.perk] || id;
        const entry = codex.runes[id] || codex.shards[id];
        const label = `${id} ${ko} "${t.anchor}"`;

        if (!entry) { console.log(`  [건너뜀] ${label} — 도감에 없는 룬`); skipped++; continue; }
        if (!entry.d.includes(t.anchor)) {
            console.log(`  [건너뜀] ${label} — 설명에 그 문자열이 없다 (패치로 문장이 바뀌었나?)`);
            skipped++; continue;
        }

        const expect = t.expect || (t.anchor.match(/-?\d+(?:\.\d+)?/g) || []).slice(0, 2).map(Number);
        if (expect.length !== 2) { console.log(`  [건너뜀] ${label} — 기대값을 못 정했다`); skipped++; continue; }

        const page = t.page || enName[t.perk];
        if (!pageCache[page]) { pageCache[page] = await wikiTips(page, t.whole); await sleep(300); }
        const tips = pageCache[page];
        if (!tips) { console.log(`  [건너뜀] ${label} — 위키 문서 없음 (${page})`); skipped++; continue; }

        const scale = t.scale || 1;
        // ★ 고르는 규칙: 앞 18칸으로 자른 (1레벨, 18레벨)이 기대값과 같은 툴팁.
        //   자리를 손으로 세지 않으므로 위키가 문단을 옮겨도 안 깨진다.
        const hit = tips.find(x => {
            const v = x.values.slice(0, LEVELS).map(n => round2(n * scale));
            return Math.abs(v[0] - expect[0]) < 0.01 && Math.abs(v[LEVELS - 1] - expect[1]) < 0.01;
        });
        if (!hit) {
            console.log(`  [건너뜀] ${label} — 위키에서 ${expect[0]}~${expect[1]} 짜리를 못 찾았다`
                + ` (본문 툴팁: ${tips.map(x => x.values[0] + '~' + round2(x.values.slice(0, LEVELS).pop())).join(' / ') || '없음'})`);
            skipped++; continue;
        }

        const values = hit.values.slice(0, LEVELS).map(n => round2(n * scale));
        // 게임 데이터에도 그 두 숫자가 있는지 (없으면 경고만 — 필드가 툴팁 전용인 룬이 있다)
        const nums = binNums[t.perk] || [];
        const want = t.bin || expect;
        const inBin = nums.includes(round2(want[0])) && nums.includes(round2(want[1]));
        const linear = values.every((x, i) => Math.abs(x - (values[0] + (values[17] - values[0]) * i / 17)) < 0.02);

        (out[id] = out[id] || []).push({ a: t.anchor, t: t.title, c: t.color, v: values });
        ok++;
        console.log(`  ${linear ? '  ' : '★ '}${label} → ${values[0]} ~ ${values[17]}`
            + `${linear ? '' : ' (비선형)'}${inBin ? '' : '   [주의] 게임 데이터에서 같은 숫자를 못 찾았다'}`);
    }

    const body = JSON.stringify(out);
    const src = `// 자동 생성 — build_rune_graphs.js (${new Date().toISOString().slice(0, 10)})
// 도감 룬 탭의 레벨 스케일 각주. 값의 출처는 롤위키다 (게임 데이터엔 최소·최대뿐).
// 손으로 고치지 말 것 — 패치 때 다시 생성된다.
//   a = 한국어 설명에서 각주를 붙일 문자열 · t = 각주 제목 · c = 선 색 · v = 1~18레벨 값
const runeGraphs = ${body};
`;
    console.log(`\n각주 ${ok}자리 / 건너뜀 ${skipped}자리 / 룬 ${Object.keys(out).length}개`);
    console.log(`크기 ${(Buffer.byteLength(src) / 1024).toFixed(1)}KB`);

    if (WRITE) {
        const dest = path.join(__dirname, 'public', 'rune_graphs.js');
        fs.writeFileSync(dest, src);
        console.log(`→ ${dest}`);
    } else {
        console.log('(--write 를 붙여야 파일을 만든다)');
    }
})().catch(e => { console.error(e); process.exit(1); });
