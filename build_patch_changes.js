// ============================================================
//  build_patch_changes.js — 패치에서 "실제로 바뀐 챔피언" 목록을 뽑아 둔다
//
//  사용법 (run_patch.js 12번 단계가 부른다):
//      node build_patch_changes.js --old pipeline.bak-20260826 --write
//  소급 생성 (git 에서 꺼낸 두 시점을 비교할 때):
//      node build_patch_changes.js --old <옛폴더> --new <새폴더> --ver 16.17 --date 2026-08-26 --write
//
//  ★ 왜 세 파일을 다 보나 — 한 파일만 보면 챔피언을 빠뜨린다:
//      custom_values.js               스킬 수치      (v)
//      custom_templates.js            스킬 문장      (t)
//      champion_stats_by_level.json   기본 스탯 곡선  (s)  ← 녹턴 방어력 38→36 같은 변경은 여기에만 나온다
//    스킬 수치 diff 가 icons(아이콘 경로) 뿐이면 (i) 로 따로 표시한다 —
//    16.17 의 "5명은 아이콘 에셋만" 이 그 부류다.
//
//  결과: public/patch_changes.js — 화면(패치 영향 페이지)이 지연 로드한다.
//    { "16.17": { date: "2026-08-26", champs: { "Nocturne": "s", "Xayah": "v", ... } } }
//    date 는 패치 반영일(KST) — 패치 영향 그래프가 패치 경계선을 이 날짜로 긋는다.
//
//  ★ 같은 버전 항목이 이미 있으면 **합친다** (플래그 union). 리허설(같은 패치로 재실행)이
//    변경 0 으로 돌아도 기존 항목이 지워지지 않는다.
// ============================================================
const fs = require('fs');
const path = require('path');

const argv = process.argv.slice(2);
const argOf = (n) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : null; };
const WRITE = argv.includes('--write');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'public', 'patch_changes.js');

const OLD_DIR = argOf('--old');
const NEW_DIR = argOf('--new');       // 없으면 현재 파일 (public/ + 루트 json)
if (!OLD_DIR) { console.error('★ --old <폴더> 가 필요하다 (pipeline.bak-* 또는 git 에서 꺼낸 폴더)'); process.exit(1); }

// ── 파일 위치. 백업 폴더는 basename 만 평평하게 담는다 (run_patch.js 의 targets 참고)
function fileIn(dir, base) {
    if (!dir) {   // 현재 파일
        return base.endsWith('.json') ? path.join(ROOT, base) : path.join(ROOT, 'public', base);
    }
    return path.join(path.isAbsolute(dir) ? dir : path.join(ROOT, dir), base);
}

// ── const customValues = {...} 꼴의 브라우저 파일을 평가해서 객체로 받는다
function evalDataFile(file, varName) {
    const code = fs.readFileSync(file, 'utf8');
    const obj = new Function(`${code}\n;return typeof ${varName} !== 'undefined' ? ${varName} : null;`)();
    if (!obj) throw new Error(`${path.basename(file)} 에서 ${varName} 를 못 읽었다`);
    return obj;
}

// ── 키 순서에 흔들리지 않는 직렬화 (손표 편집으로 키 순서만 달라진 것을 변경으로 오인하지 않게)
function stable(o) {
    if (Array.isArray(o)) return '[' + o.map(stable).join(',') + ']';
    if (o && typeof o === 'object') {
        return '{' + Object.keys(o).sort().map(k => JSON.stringify(k) + ':' + stable(o[k])).join(',') + '}';
    }
    return JSON.stringify(o);
}

// ── 바뀐 잎(leaf) 경로 수집 — icons 만 바뀐 챔피언을 가르는 데 쓴다
function changedPaths(a, b, prefix, out) {
    if (stable(a) === stable(b)) return;
    const isObjA = a && typeof a === 'object' && !Array.isArray(a);
    const isObjB = b && typeof b === 'object' && !Array.isArray(b);
    if (isObjA && isObjB) {
        const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
        keys.forEach(k => changedPaths(a[k], b[k], prefix + '.' + k, out));
    } else {
        out.push(prefix);
    }
}

function loadThree(dir) {
    return {
        values: evalDataFile(fileIn(dir, 'custom_values.js'), 'customValues'),
        templates: evalDataFile(fileIn(dir, 'custom_templates.js'), 'customTemplates'),
        byLevel: JSON.parse(fs.readFileSync(fileIn(dir, 'champion_stats_by_level.json'), 'utf8'))
    };
}

(async () => {
    // 패치 버전 — 소급이면 --ver, 아니면 dd_version 이 최신을 준다 (앞 두 자리만)
    let ver = argOf('--ver');
    if (!ver) {
        const { ddVersion } = require('./dd_version');
        ver = (await ddVersion()).split('.').slice(0, 2).join('.');
    }
    const date = argOf('--date') || new Date(Date.now() + 9 * 3600000).toISOString().slice(0, 10);

    const oldD = loadThree(OLD_DIR);
    const newD = loadThree(NEW_DIR);

    // ── 챔피언 단위 비교. 플래그: v 스킬 수치 · t 스킬 문장 · s 기본 스탯 · i 아이콘만 · n 신규
    const champs = {};   // 영문 키 → 플래그 문자열
    const mark = (key, flag) => {
        if (!champs[key]) champs[key] = '';
        if (!champs[key].includes(flag)) champs[key] += flag;
    };

    const allKeys = new Set([
        ...Object.keys(newD.values), ...Object.keys(newD.templates), ...Object.keys(newD.byLevel)
    ]);
    allKeys.forEach(key => {
        const isNew = !oldD.values[key] && !oldD.byLevel[key];
        if (isNew) { mark(key, 'n'); return; }

        if (stable(oldD.values[key]) !== stable(newD.values[key])) {
            const paths = [];
            changedPaths(oldD.values[key], newD.values[key], '', paths);
            // icons(스킬 아이콘 경로) 만 바뀌었으면 수치 변경이 아니다
            const onlyIcons = paths.length > 0 && paths.every(p => p.includes('.icons'));
            mark(key, onlyIcons ? 'i' : 'v');
        }
        if (stable(oldD.templates[key]) !== stable(newD.templates[key])) mark(key, 't');
        if (stable(oldD.byLevel[key]) !== stable(newD.byLevel[key])) mark(key, 's');
    });

    // ── 기존 파일과 합치기 (리허설·재실행이 기존 항목을 지우지 않게)
    let all = {};
    if (fs.existsSync(OUT)) {
        try { all = evalDataFile(OUT, 'patchChanges') || {}; } catch (e) { all = {}; }
    }
    const prev = all[ver];
    if (prev) {
        Object.entries(prev.champs || {}).forEach(([k, flags]) => {
            flags.split('').forEach(f => mark(k, f));
        });
    }
    all[ver] = { date: (prev && prev.date) || date, champs };

    // ── 요약
    const count = (f) => Object.values(champs).filter(s => s.includes(f)).length;
    console.log(`패치 ${ver} (${all[ver].date}) — 바뀐 챔피언 ${Object.keys(champs).length}명`);
    console.log(`  스킬 수치 ${count('v')} · 문장 ${count('t')} · 기본 스탯 ${count('s')} · 아이콘만 ${count('i')} · 신규 ${count('n')}`);
    const names = Object.keys(champs).sort();
    if (names.length) console.log('  ' + names.map(k => `${k}(${champs[k]})`).join(' '));

    if (!WRITE) { console.log('\n--write 가 없어 파일은 안 건드렸다.'); return; }

    // 버전 내림차순으로 적는다 (화면 드롭다운이 그대로 쓴다)
    const versions = Object.keys(all).sort((a, b) => {
        const pa = a.split('.').map(Number), pb = b.split('.').map(Number);
        return (pb[0] - pa[0]) || (pb[1] - pa[1]);
    });
    const body = versions.map(v => {
        const e = all[v];
        const rows = Object.keys(e.champs).sort().map(k => `        ${JSON.stringify(k)}: ${JSON.stringify(e.champs[k])}`).join(',\n');
        return `    ${JSON.stringify(v)}: { date: ${JSON.stringify(e.date)}, champs: {\n${rows}\n    } }`;
    }).join(',\n');

    fs.writeFileSync(OUT,
        `// 자동 생성: build_patch_changes.js — 패치마다 "실제로 바뀐 챔피언" 목록 (패치 영향 페이지가 쓴다)\n` +
        `// 플래그: v 스킬 수치 · t 스킬 문장 · s 기본 스탯 · i 아이콘만 · n 신규 챔피언\n` +
        `// date 는 패치 반영일(KST) — 그래프의 패치 경계선이 이 날짜다\n` +
        `const patchChanges = {\n${body}\n};\n`);
    console.log(`\n→ public/patch_changes.js (패치 ${versions.length}개)`);
})().catch(e => { console.error('★ ' + e.message); process.exit(1); });
