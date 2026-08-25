// ============================================================
//  check_flat_stats.js  —  "값이 통째로 평평해진 스탯" 검산
//
//  사용법:
//      node check_flat_stats.js                 <- git HEAD 판과 비교
//      node check_flat_stats.js --base <파일>    <- 특정 파일과 비교
//      node check_flat_stats.js --save <파일>    <- 지금 판의 요약을 파일로 (기준선 만들기)
//
//  ★★ 왜 필요한가 — **패치 파이프라인에서 제일 안 보이는 사고를 잡는 유일한 방법이다.**
//
//    2026-08-12 에 16.16 을 받고 나서 **173명 전원의 마법 저항력 성장이 0** 이 됐다.
//    화면에는 수평선으로 조용히 나가서 눈으로는 안 걸렸고, 압축본(`champion_stats.js`)은
//    4줄만 바뀌어서 **diff 로도 안 보였다.** 스크립트는 멀쩡히 돌았고 로그도 깨끗했다.
//
//    원인은 패치가 아니라 우리 코드였다 — CD 가 그 패치부터 `mrPerLevel` 을 해시가 아니라
//    **실명으로 풀어 주기 시작했는데** 우리는 해시 키만 보고 있었다. 값을 못 읽으면
//    **조용히 0 이 되는** 구조라 "기본값만 있고 성장은 0" 인 상태가 됐다.
//    같은 날 나온 세 건이 전부 이 모양이었다 (체력 재생 8명 · 카이사 E 충전시간).
//
//  ★ 그래서 세는 것은 "18칸이 전부 같은 값인 챔피언 수" 다. 성장이 죽으면 그 값이
//    갑자기 173(전원)으로 뛴다. **원래 평평한 스탯도 있으므로**(공격 사거리·기본 공격 속도 등)
//    절대값이 아니라 **이전 판과의 차이**를 본다.
//
//  ★ 0 칸·null·NaN 도 같이 센다 — 위 사고의 다른 얼굴이다.
// ============================================================
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const FILE = 'champion_stats_by_level.json';
const argv = process.argv.slice(2);
const argOf = (name) => { const i = argv.indexOf(name); return i >= 0 ? argv[i + 1] : null; };
const BASE_FILE = argOf('--base');
const SAVE_TO = argOf('--save');

// ── 한 판을 요약한다: 스탯별 { 평평, 0포함, 이상값 }
function summarize(data) {
    const out = {};
    const champs = Object.keys(data);
    champs.forEach(id => {
        const stats = data[id]?.스탯 || {};
        Object.entries(stats).forEach(([name, arr]) => {
            if (!Array.isArray(arr) || !arr.length) return;
            const s = out[name] || (out[name] = { 평평: 0, 영: 0, 이상: 0, 전체: 0, 평평목록: [], 영목록: [] });
            s.전체++;
            const bad = arr.some(v => v === null || v === undefined || Number.isNaN(Number(v)));
            if (bad) { s.이상++; return; }
            if (arr.every(v => v === arr[0])) { s.평평++; if (s.평평목록.length < 4) s.평평목록.push(data[id].이름); }
            if (arr.some(v => Number(v) === 0)) { s.영++; if (s.영목록.length < 4) s.영목록.push(data[id].이름); }
        });
    });
    return out;
}

// ── 비교 대상(이전 판) 가져오기
function loadBase() {
    if (BASE_FILE) {
        console.log(`[기준] 파일 ${BASE_FILE}`);
        return JSON.parse(fs.readFileSync(BASE_FILE, 'utf8'));
    }
    try {
        // ★ git 이 기준선이다 — 패치 빌드는 작업 트리를 바꾸고 HEAD 는 직전 판이라 딱 맞는다.
        const buf = execSync(`git show HEAD:${FILE}`, { cwd: __dirname, maxBuffer: 64 * 1024 * 1024 });
        console.log('[기준] git HEAD 판');
        return JSON.parse(buf.toString('utf8'));
    } catch (e) {
        console.log('[기준] ★ 이전 판을 못 찾았다 (git HEAD 에 없거나 git 이 아니다) — 지금 판만 보여준다');
        return null;
    }
}

const cur = JSON.parse(fs.readFileSync(path.join(__dirname, FILE), 'utf8'));
const curSum = summarize(cur);
const champCount = Object.keys(cur).length;

if (SAVE_TO) {
    fs.writeFileSync(SAVE_TO, JSON.stringify(curSum, null, 1));
    console.log(`→ ${SAVE_TO} (기준선 저장)`);
}

const base = loadBase();
const baseSum = base ? summarize(base) : null;

console.log(`\n검사 대상: ${FILE} — 챔피언 ${champCount}명 / 스탯 ${Object.keys(curSum).length}종\n`);

const names = [...new Set([...Object.keys(curSum), ...Object.keys(baseSum || {})])].sort();
const rows = [];
let warn = 0;

names.forEach(name => {
    const c = curSum[name];
    const b = baseSum ? baseSum[name] : null;

    // 스탯이 통째로 사라졌다
    if (!c) { rows.push({ name, msg: `★★ 스탯이 통째로 사라졌다 (이전 ${b.전체}명)`, bad: true }); warn++; return; }
    // 새로 생긴 스탯
    if (baseSum && !b) { rows.push({ name, msg: `새 스탯 (평평 ${c.평평}/${c.전체})`, bad: false }); return; }

    const d = b ? c.평평 - b.평평 : 0;
    const dz = b ? c.영 - b.영 : 0;
    let msg = `평평 ${c.평평}/${c.전체}`;
    if (b) msg += `  (이전 ${b.평평}, ${d >= 0 ? '+' : ''}${d})`;
    if (c.영) msg += `  0포함 ${c.영}`;
    if (c.이상) msg += `  ★이상값 ${c.이상}`;

    // ★ 판정: 평평이 늘었거나 · 0 이 늘었거나 · 이상값이 있으면 사람이 봐야 한다
    const bad = c.이상 > 0 || d > 0 || dz > 0;
    if (bad) {
        warn++;
        if (d > 0) msg += `   ← 평평해진 챔피언이 ${d}명 늘었다 (${c.평평목록.join(', ')}…)`;
        if (dz > 0) msg += `   ← 0 이 든 챔피언이 ${dz}명 늘었다 (${c.영목록.join(', ')}…)`;
    }
    rows.push({ name, msg, bad });
});

rows.forEach(r => console.log(`  ${r.bad ? '★' : ' '} ${r.name.padEnd(18)} ${r.msg}`));

console.log('');
if (!baseSum) {
    console.log('※ 비교 대상이 없어 판정하지 않았다. 지금 판을 기준선으로 쓰려면 --save 를 붙일 것');
    process.exit(0);
}
if (warn) {
    console.log(`★★ 확인 필요 ${warn}자리 — 위 ★ 줄을 볼 것.`);
    console.log('   "평평해진 챔피언이 늘었다" 는 그 스탯의 레벨 성장이 죽었다는 뜻이다.');
    console.log('   173명 전원이 되면 필드를 통째로 못 읽고 있는 것이다 (2026-08-12 마법 저항력 사고).');
    process.exit(1);
}
console.log('✔ 평평해진 스탯 없음 · 0 이 늘어난 스탯 없음 · 이상값 없음');
