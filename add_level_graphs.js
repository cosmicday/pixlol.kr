// ============================================================
// 챔피언 레벨에 따라 변하는 스킬 값에 그래프 각주를 달아 준다.
// ------------------------------------------------------------
//  결과물: public/custom_graphs.js
//     customGraphs[챔피언][스킬][pN] = 각주 HTML
//
//  ★ 왜 별도 파일인가
//     각주는 **문장 안 그 수치 바로 뒤**(색칠된 부분 끝)에 붙어야 한다.
//     그런데 값(custom_values.js 의 pN)도 문장(custom_templates.js)도 둘 다
//     스크립트가 매번 새로 찍는다. 거기에 써 넣으면 재생성 때 날아간다.
//     그래서 손 안 대는 별도 파일로 빼고, app.js 가 {pN} 을 채울 때 뒤에 이어 붙인다.
//     (예전엔 v1/v2 에 넣었는데 그건 구분선 아래 별도 줄이라 수치가 두 번 보였다)
//
//  ★ 두 종류로 갈린다
//     - 매 레벨 크는 값        -> drawGraph  꺾은선 그래프
//     - 특정 레벨에서만 바뀌는 값 -> drawSteps  "1 / 7 / 13레벨" 목록
//       (나서스 P 생명력 흡수 12/18/24 처럼 계단인데 꺾은선으로 그리면 오해를 준다)
//     가르는 기준은 18레벨 중 값이 바뀌는 횟수 5 이하.
//     bin 전수로 보면 17회(매 레벨)가 177자리로 몰려 있고 계단식은 2~5회라 사이가 비어 있다.
//
//  대상 고르는 규칙
//    1) 값에 "(레벨에 따라)" 가 있고
//    2) 그 pN 이 **문장에 실제로 등장**하고 (안 보이는 값에 각주를 달 이유가 없다)
//    3) level_curves.json 에 곡선이 있는 자리
//
//  사용:  node add_level_graphs.js [--write]
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const WRITE = process.argv.includes('--write');
const VALUES = path.join(__dirname, 'public', 'custom_values.js');
const TEMPLATES = path.join(__dirname, 'public', 'custom_templates.js');
const OUT = path.join(__dirname, 'public', 'custom_graphs.js');
const CURVES = path.join(__dirname, 'level_curves.json');

const STEP_MAX_CHANGES = 5;

// 문장에서 {pN} 을 감싼 태그 -> 선 색. (custom_values.js 위쪽 컬러 코드표와 같은 값)
const TAG_COLOR = {
    magicdamage: '#55bced', physicaldamage: '#ff9900', truedamage: '#f3f3f3',
    healing: '#2ecc71', shield: '#2ecc71', scalehealth: '#2ecc71',
    scalearmor: '#f1c40f', scalemr: '#e844cc',
    scalemana: '#3498db', speed: '#f39c12', attackspeed: '#f39c12',
    scaleap: '#55bced', scalead: '#ff9900',
};
const DEFAULT_COLOR = '#2ecc71';

const load = (file, name) => {
    const s = {};
    vm.createContext(s);
    vm.runInContext(fs.readFileSync(file, 'utf8') + `; this.X=${name};`, s);
    return s.X;
};

const templates = load(TEMPLATES, 'customTemplates');
const curves = JSON.parse(fs.readFileSync(CURVES, 'utf8'));

// ------------------------------------------------------------
// ★ "스탯의 A ~ B%" 자리는 곡선에 그 스탯을 곱해야 진짜 값이 된다 (2026-08-12).
//   아이번 P 가 유일한 사례다. 값은 `기본 최대 체력의 15 ~ 0.006%` 인데,
//   퍼센트만 보면 "레벨 오를수록 싸진다" 로 읽힌다. **실제로는 그렇지 않다** —
//   퍼센트는 줄지만 최대 체력이 늘어서 실제 소모량은 **6레벨에 정점(108)을 찍고**
//   그 뒤로 떨어진다 (94.5 -> 108 -> 0.1). 나무위키도 `98 ~ 110 ~ 0` 이라고 적는다.
//   그래서 각주만큼은 실제 소모량 곡선을 보여주고 제목도 따로 단다.
//   ★ 파이프라인 순서상 안전하다 — champion_stats_by_level.json 은
//     build_level_curves.js 가 이 스크립트보다 **먼저** 만든다.
const STATS_BY_LEVEL = path.join(__dirname, 'champion_stats_by_level.json');
const champStats = (() => {
    try { return JSON.parse(fs.readFileSync(STATS_BY_LEVEL, 'utf8')); }
    catch (e) { return {}; }
})();

// 값 문장의 스탯 이름 -> champion_stats_by_level.json 의 스탯 키
const STAT_CURVE_KEY = {
    '기본 최대 체력': '체력', '최대 체력': '체력',
    '기본 마나': '마나', '최대 마나': '마나',
};

function scaleByStat(champ, valueText, curve) {
    const m = valueText.match(/^([가-힣][가-힣 ]*?)의\s+[\d.]+\s*~\s*[\d.]+%/);
    if (!m) return null;
    const key = STAT_CURVE_KEY[m[1].trim()];
    if (!key) return null;
    const st = champStats[champ] && champStats[champ].스탯 && champStats[champ].스탯[key];
    if (!Array.isArray(st) || st.length < 18) return null;
    return {
        ...curve,
        values: curve.values.map((v, i) => Math.round(v * st[i] / 100 * 10) / 10),
        title: `레벨별 실제 소모량`
    };
}

const norm = (x) => String(x).toLowerCase().replace(/^spell\.[^:]*:/, '');

// ★★ 한 계산식이 곡선을 **여러 개** 낼 수 있다 (2026-08-14).
//   `level_curves.json` 이 `TotalDamage#0` · `TotalDamage#1` 처럼 `#번호` 로 구분해 둔다.
//   카타리나 P 가 그 예다 — `#0` 은 기본 피해량(매 레벨), `#1` 은 **주문력 계수**
//   (1/6/11/16레벨에 70/80/90/100%). 값 문자열에 `(레벨에 따라)` 가 두 번 나오는데
//   예전엔 첫 번째 곡선만 찾아서 **주문력 계수 쪽엔 각주가 없었다.**
//   `#번호` 순서가 값 문자열의 `(레벨에 따라)` 순서와 같으므로 그대로 짝지으면 된다.
function findCurves(alias, slot, calc) {
    const ch = curves[alias] || {};
    for (const sl of [slot, ...Object.keys(ch).filter(x => x !== slot)]) {
        const hit = Object.keys(ch[sl] || {})
            .filter(n => norm(n.split('#')[0]) === norm(calc))
            .sort((a, b) => {                       // `#0` `#1` 순서를 지킨다
                const na = Number((a.split('#')[1] ?? '0'));
                const nb = Number((b.split('#')[1] ?? '0'));
                return na - nb;
            });
        if (hit.length) return hit.map(n => ch[sl][n]);
    }
    return [];
}
const findCurve = (alias, slot, calc) => findCurves(alias, slot, calc)[0] || null;

// {pN} 을 감싸고 있는 가장 안쪽 태그를 찾는다
function colorFor(tpl, p) {
    const re = /<([a-z]+)>((?:(?!<\/?[a-z]+>)[\s\S])*?)<\/\1>/g;
    let m, best = null;
    while ((m = re.exec(tpl)) !== null) {
        if (m[2].indexOf('{' + p + '}') !== -1) best = m[1];
    }
    return TAG_COLOR[best] || DEFAULT_COLOR;
}

// 곡선 -> 각주 표현식 (여러 줄 문자열)
function exprFor(id, curve, color) {
    const v = curve.values;
    let changes = 0;
    for (let i = 1; i < 18; i++) if (v[i] !== v[i - 1]) changes++;

    if (changes <= STEP_MAX_CHANGES) {
        const pairs = [[1, v[0]]];
        for (let i = 1; i < 18; i++) if (v[i] !== v[i - 1]) pairs.push([i + 1, v[i]]);
        return {
            isStep: true,
            text: `drawSteps("${id}", "${color}", [${pairs.map(([l, x]) => `[${l}, ${x}]`).join(', ')}])`
        };
    }
    const seg = (a, b) => v.slice(a - 1, b).join(', ');
    // 제목은 값과 각주의 단위가 다를 때만 붙는다 (scaleByStat 가 달아 준다).
    //   ★ custom_values.js 는 값이 큰따옴표 문자열이라 각주 HTML 에 " 를 쓰면 안 되는데,
    //     여기는 값이 아니라 custom_graphs.js 에 나가는 코드라 큰따옴표가 안전하다.
    const tail = curve.title ? `, "${curve.title}"` : '';
    return {
        isStep: false,
        text: [
            `drawGraph("${id}", "${color}", [`,
            `                    ${seg(1, 6)}, // 1~6렙`,
            `                    ${seg(7, 13)}, // 7~13렙`,
            `                    ${seg(14, 18)} // 14~18렙`,
            `                ]${tail})`
        ].join('\n')
    };
}

// ------------------------------------------------------------
// 대상 모으기 — custom_values.js 의 주석에 계산식 이름이 들어 있다 (// RegenCalc)
// ★ 파일이 CRLF 일 수 있다. JS 정규식의 `.` 은 '\r' 을 안 먹으므로 미리 떼어낸다.
const src = fs.readFileSync(VALUES, 'utf8').split(/\r?\n/);

// ★ 값 안에 이미 각주가 들어 있는 자리가 있다 (fill_values.js 가 다는 "무한의 대검" 각주).
//   번호가 겹치면 한 스킬에 [1] 이 두 개 생기므로, 있는 만큼 뒤에서 시작한다. 2026-08-12
const preNotes = {};   // champ -> slot -> 이미 달린 각주 수
{
    let c = '', s = '';
    for (const l of src) {
        const mc = l.match(/^ {4}"([A-Za-z0-9'. ]+)": \{/); if (mc) { c = mc[1]; continue; }
        const ms = l.match(/^ {8}"([PQWER]2?)": \{/); if (ms) { s = ms[1]; continue; }
        const n = (l.match(/custom-footnote'>\[/g) || []).length;
        if (n) (preNotes[c] = preNotes[c] || {})[s] = (preNotes[c]?.[s] || 0) + n;
    }
}

let champ = '', slot = '';
const found = {};      // champ -> slot -> [{p, expr}]
let nGraph = 0, nStep = 0, nSkill = 0;

for (const l of src) {
    const mc = l.match(/^ {4}"([A-Za-z0-9'. ]+)": \{/); if (mc) { champ = mc[1]; continue; }
    const ms = l.match(/^ {8}"([PQWER]2?)": \{/); if (ms) { slot = ms[1]; continue; }
    // ★ `cooldown` 도 대상이다 (2026-08-14). 패시브 쿨타임이 레벨에 따라 **계단식**으로
    //   줄어드는 자리가 있는데(그라가스 1/6/11/16레벨 -> 12/10/8/6),
    //   값은 `12 ~ 6 (레벨에 따라)` 한 줄이라 **매 레벨 줄어드는 것처럼 읽힌다.**
    //   `fill_values.js` 가 줄 뒤에 계산식 이름을 주석으로 남겨 둔다.
    const m = l.match(/"(p\d+|cooldown)":\s*"(.*?)",\s*\/\/\s*(.+?)\s*$/);
    if (!m || m[2].indexOf('(레벨에 따라)') === -1) continue;

    // ★ 구분선 아래 회색 글씨("<슬롯>_rules") 도 화면에 나가는 문장이라 같이 본다 (2026-08-12).
    //   여기에도 레벨에 따라 크는 값이 들어 있다 (가렌 Q 의 강화 공격 지속시간 등).
    const t = templates[champ] || {};
    const tpl = String(t[slot] || '') + String(t[slot + '_rules'] || '');
    // 쿨타임은 문장이 아니라 **스킬 칸 우상단**에 늘 찍히므로 이 검사를 건너뛴다.
    if (m[1] !== 'cooldown' && tpl.indexOf('{' + m[1] + '}') === -1) continue;
    // ★ 값 안의 `(레벨에 따라)` 개수만큼 곡선을 짝지어 각주를 **여러 개** 단다.
    //   카타리나 P 는 `68 ~ 240 (레벨에 따라) (+ … 주문력의 70 ~ 100 (레벨에 따라)%)` 라
    //   기본 피해량과 주문력 계수 둘 다 레벨에 따라 변한다.
    const slots = (m[2].match(/\(레벨에 따라\)/g) || []).length;
    const all = findCurves(champ.toLowerCase(), slot, m[3]);
    if (!all.length) continue;
    // 곡선이 자리보다 적으면 있는 만큼만 (대부분 1:1 이다)
    const use = all.slice(0, slots);

    // ★ 곡선 단위가 화면 값과 다를 수 있다 (2026-08-14).
    //   카타리나 P 의 주문력 계수는 곡선이 `0.7 ~ 1` 인데 화면엔 `70 ~ 100%` 로 나간다.
    //   각주에 `Lv.1 0.7` 이라고 찍히면 **본문 수치와 단위가 어긋나 헷갈린다.**
    //   화면 값에서 그 자리의 `A ~ B` 를 뽑아 곡선 양 끝과 비교해 배율을 정한다.
    const scaleFor = (val, idx, curve) => {
        const before = String(val).split('(레벨에 따라)')[idx] || '';
        const mm = before.match(/([\d.]+)\s*~\s*([\d.]+)\s*$/);
        if (!mm) return 1;
        const shown = Math.abs(parseFloat(mm[2]));
        const cv = Math.abs(curve.values[curve.values.length - 1]);
        if (!shown || !cv) return 1;
        const ratio = shown / cv;
        // 100배(분수 -> 퍼센트)일 때만 손댄다. 그 외는 건드리지 않는다
        return (ratio > 50 && ratio < 200) ? 100 : 1;
    };

    found[champ] = found[champ] || {};
    const list = (found[champ][slot] = found[champ][slot] || []);
    const base = (preNotes[champ] && preNotes[champ][slot]) || 0;
    const texts = [];
    use.forEach((cv, i) => {
        // "스탯의 A ~ B%" 자리는 곡선에 스탯을 곱해 실제 값으로 바꾼다 (위 주석 참고)
        //   ★ 첫 번째 자리에만 적용한다 — 뒤쪽은 계수라 스탯을 곱할 대상이 아니다
        let curve = i === 0 ? (scaleByStat(champ, m[2], cv) || cv) : cv;
        const k = scaleFor(m[2], i, curve);
        if (k !== 1) curve = { ...curve, values: curve.values.map(x => Math.round(x * k * 1000) / 1000) };
        const e = exprFor(String(base + list.length + texts.length + 1), curve, colorFor(tpl, m[1]));
        if (e.isStep) nStep++; else nGraph++;
        texts.push(e.text);
    });
    if (!texts.length) continue;
    // 자리가 하나면 예전처럼 문자열, 여럿이면 배열로 내보낸다 (app.js 가 순서대로 끼워 넣는다)
    list.push({ p: m[1], text: texts.length === 1 ? texts[0] : texts, multi: texts.length > 1 });
}
for (const c in found) nSkill += Object.keys(found[c]).length;

console.log(`대상 ${Object.keys(found).length}챔피언 / ${nSkill}스킬 — 그래프 ${nGraph}자리 / 계단식 ${nStep}자리`);

if (!WRITE) { console.log('\n미리보기였습니다. --write 를 붙이면 public/custom_graphs.js 를 만듭니다.'); process.exit(0); }

// ------------------------------------------------------------
const out = [
    '// 이 파일은 add_level_graphs.js 가 생성했습니다. 직접 고치지 마세요.',
    '//   생성 시각: ' + new Date().toISOString(),
    '//',
    '// 챔피언 레벨에 따라 변하는 수치의 각주(그래프 / 계단 목록)다.',
    '// app.js 가 문장의 {pN} 을 채울 때 값 **바로 뒤에** 이어 붙인다.',
    '//   -> 색칠된 수치의 마지막 글자에 각주가 달린다.',
    '//',
    '// drawGraph / drawSteps 헬퍼는 custom_values.js 맨 위에 있다.',
    '// index.html 에서 custom_values.js 다음에 로드되어야 한다 (async=false 라 순서 보장).',
    '',
    'const customGraphs = {',
];
for (const c of Object.keys(found)) {
    out.push(`    "${c}": {`);
    for (const sl of Object.keys(found[c])) {
        out.push(`        "${sl}": {`);
        for (const it of found[c][sl]) {
            out.push(`            "${it.p}":`);
            if (it.multi) {
                // 값 안의 `(레벨에 따라)` 자리마다 하나씩. app.js 가 순서대로 끼워 넣는다.
                out.push(`                [`);
                it.text.forEach(t => out.push(`                ${t},`));
                out.push(`                ],`);
            } else {
                out.push(`                ${it.text},`);
            }
        }
        out.push('        },');
    }
    out.push('    },');
}
out.push('};', '');
fs.writeFileSync(OUT, out.join('\n'), 'utf8');
console.log('\npublic/custom_graphs.js 생성 완료');
