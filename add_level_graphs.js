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

const norm = (x) => String(x).toLowerCase().replace(/^spell\.[^:]*:/, '');
function findCurve(alias, slot, calc) {
    const ch = curves[alias] || {};
    for (const sl of [slot, ...Object.keys(ch).filter(x => x !== slot)]) {
        for (const n of Object.keys(ch[sl] || {})) {
            if (norm(n.split('#')[0]) === norm(calc)) return ch[sl][n];
        }
    }
    return null;
}

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
    return {
        isStep: false,
        text: [
            `drawGraph("${id}", "${color}", [`,
            `                    ${seg(1, 6)}, // 1~6렙`,
            `                    ${seg(7, 13)}, // 7~13렙`,
            `                    ${seg(14, 18)} // 14~18렙`,
            `                ])`
        ].join('\n')
    };
}

// ------------------------------------------------------------
// 대상 모으기 — custom_values.js 의 주석에 계산식 이름이 들어 있다 (// RegenCalc)
// ★ 파일이 CRLF 일 수 있다. JS 정규식의 `.` 은 '\r' 을 안 먹으므로 미리 떼어낸다.
const src = fs.readFileSync(VALUES, 'utf8').split(/\r?\n/);

let champ = '', slot = '';
const found = {};      // champ -> slot -> [{p, expr}]
let nGraph = 0, nStep = 0, nSkill = 0;

for (const l of src) {
    const mc = l.match(/^ {4}"([A-Za-z0-9'. ]+)": \{/); if (mc) { champ = mc[1]; continue; }
    const ms = l.match(/^ {8}"([PQWER]2?)": \{/); if (ms) { slot = ms[1]; continue; }
    const m = l.match(/"(p\d+)":\s*"(.*?)",\s*\/\/\s*(.+?)\s*$/);
    if (!m || m[2].indexOf('(레벨에 따라)') === -1) continue;

    // ★ 구분선 아래 회색 글씨("<슬롯>_rules") 도 화면에 나가는 문장이라 같이 본다 (2026-08-12).
    //   여기에도 레벨에 따라 크는 값이 들어 있다 (가렌 Q 의 강화 공격 지속시간 등).
    const t = templates[champ] || {};
    const tpl = String(t[slot] || '') + String(t[slot + '_rules'] || '');
    if (tpl.indexOf('{' + m[1] + '}') === -1) continue;      // 문장에 안 쓰이는 자리는 건너뛴다
    const curve = findCurve(champ.toLowerCase(), slot, m[3]);
    if (!curve) continue;

    found[champ] = found[champ] || {};
    const list = (found[champ][slot] = found[champ][slot] || []);
    const e = exprFor(String(list.length + 1), curve, colorFor(tpl, m[1]));
    if (e.isStep) nStep++; else nGraph++;
    list.push({ p: m[1], text: e.text });
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
            out.push(`                ${it.text},`);
        }
        out.push('        },');
    }
    out.push('    },');
}
out.push('};', '');
fs.writeFileSync(OUT, out.join('\n'), 'utf8');
console.log('\npublic/custom_graphs.js 생성 완료');
