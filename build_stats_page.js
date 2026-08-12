// ============================================================
//  build_stats_page.js
//
//  `champion_stats_by_level.json`(173명 x 18레벨, 347KB) 를
//  사이트가 쓸 **압축본** `public/champion_stats.js` 로 줄인다.
//
//      node build_stats_page.js --write
//
//  ★ 왜 18칸을 그대로 안 내려주나
//    347KB 를 브라우저가 매번 받는다. 그런데 모든 스탯이
//        v(N) = base + perLevel x g(N),   g(N) = (N-1)(0.7025 + 0.0175(N-1))
//    한 식으로 정확히 복원된다 (공격 속도만 곱셈형).
//    173명 x 8스탯 = **1376자리 전부 오차 0.0015 미만**인 걸 확인하고 줄였다.
//    그래서 base + perLevel 두 숫자만 내려주고 g(N) 은 화면에서 계산한다.
//
//  ★ 파이프라인 순서: `build_level_curves.js --write` 다음에 돌린다 (그게 입력을 만든다).
// ============================================================

const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'champion_stats_by_level.json');
const OUT = path.join(__dirname, 'public', 'champion_stats.js');
const WRITE = process.argv.includes('--write');

// 라이엇 레벨 성장 곡선. g(1) = 0, g(18) = 17.
const g = (N) => (N - 1) * (0.7025 + 0.0175 * (N - 1));
const r = (x, n = 4) => {
    const p = Math.pow(10, n);
    return Math.round(x * p) / p;
};

const src = JSON.parse(fs.readFileSync(SRC, 'utf8'));
const out = {};
let stats = 0, warn = [];

const KNOWN = new Set(['체력', '체력 재생(초당)', '공격력', '공격 속도', '방어력', '마법 저항력']);

// ★ 레벨에 따라 **기본 공격 사거리**가 늘어나는 챔피언. 18레벨까지의 증가폭이다.
//   기본 스탯이 아니라 **패시브**에서 오는 값이라 bin 의 attackRange 에는 안 들어 있다.
//   근거: level_curves.json 의 `tristana.P.BonusPassiveRange` = 0 -> 150 (성장하는 화력).
//   ★ 나르도 `gnar.P.TotalAttackRange` = 0 -> 100 이 있지만 **넣으면 안 된다.**
//     나르의 기본 사거리 175 는 **메가 나르(근접)** 값이라 여기에 100 을 더해도
//     미니 나르 사거리가 안 나온다. 폼이 둘인 챔피언은 스탯 한 줄로 표현할 수 없다.
//   ★ 이 성장은 g(N) 곡선이 아니라 **레벨당 일정**하다 (level_curves 가 "직선" 으로 분류).
//     그래서 아래에서 방식 'l'(linear) 로 내보낸다.
const RANGE_GROWTH = { Tristana: 150 };

for (const id of Object.keys(src).sort()) {
    const S = src[id]['스탯'];
    const rec = { n: src[id]['이름'], s: {}, f: S['_고정'] || {} };
    // ★ 자원을 안 쓰는 챔피언(DD partype = "없음")은 자원 칸을 통째로 뺀다.
    //   대부분 0 이지만 **비에고는 bin 에 10000 이 박혀 있다** — 내부값이라 화면에 나가면 안 되고,
    //   막대 길이를 "전체 자원 최댓값 대비" 로 재는 화면에서는 다른 챔피언 마나 막대까지
    //   전부 뭉개 버린다 (라이즈 마나 1490 이 13% 로 보였다). 2026-08-12
    const noResource = (S['_고정'] || {})['자원 종류'] === '없음';

    for (const k of Object.keys(S)) {
        if (k === '_고정') continue;
        const v = S[k];
        if (!Array.isArray(v) || v.length !== 18) { warn.push(`${id} ${k}`); continue; }

        if (noResource && !KNOWN.has(k)) continue;
        // 전부 0 인 자리도 뺀다
        if (v.every(x => x === 0)) continue;

        let base, per, kind;
        if (k === '공격 속도') {
            // 공격 속도만 곱셈형: base x (1 + pct x g(N))
            base = v[0];
            per = base ? (v[17] / base - 1) / 17 : 0;
            kind = 'x';
        } else {
            base = v[0];
            per = (v[17] - v[0]) / 17;
            kind = '+';
        }

        // 복원 검산 — 하나라도 어긋나면 압축하면 안 된다
        let worst = 0;
        for (let N = 1; N <= 18; N++) {
            const got = kind === 'x' ? base * (1 + per * g(N)) : base + per * g(N);
            worst = Math.max(worst, Math.abs(got - v[N - 1]));
        }
        if (worst > 0.0015) { warn.push(`${id} ${k} 복원 오차 ${worst.toFixed(4)}`); continue; }

        rec.s[k] = [r(base), r(per, 6), kind];
        stats++;
    }

    // 이동 속도·사거리도 다른 스탯과 같은 줄로 내보낸다 (예전엔 표 밖에 따로 적었다).
    //   거의 모든 챔피언이 레벨과 무관해서 1레벨 = 18레벨 이지만,
    //   트리스타나처럼 사거리가 크는 챔피언이 있어서 줄로 두는 편이 맞다.
    const f = rec.f;
    if (f['이동 속도'] != null) { rec.s['이동 속도'] = [r(f['이동 속도']), 0, '+']; stats++; }
    if (f['사거리'] != null) {
        const grow = RANGE_GROWTH[id] || 0;
        rec.s['사거리'] = [r(f['사거리']), r(grow / 17, 6), 'l'];
        stats++;
    }
    out[id] = rec;
}

const body =
    `// 이 파일은 build_stats_page.js 가 생성했습니다. 직접 고치지 마세요.\n` +
    `//   생성 시각: ${new Date().toISOString()}\n` +
    `//   원본: champion_stats_by_level.json (build_level_curves.js 가 만든다)\n` +
    `//\n` +
    `// 값은 [기본값, 레벨당증가, 방식] 이다.\n` +
    `//   '+' 덧셈형   : base + per x g(N)         (대부분)\n` +
    `//   'x' 곱셈형   : base x (1 + per x g(N))   (공격 속도)\n` +
    `//   'l' 직선형   : base + per x (N-1)        (사거리 — 패시브 성장이라 곡선이 아니다)\n` +
    `//   g(N) = (N-1) x (0.7025 + 0.0175 x (N-1)),  g(1)=0, g(18)=17\n` +
    `// 챔피언 키는 **Data Dragon 철자**다 (app.js 가 champ.id 로 찾는다).\n\n` +
    `const championStats = ${JSON.stringify(out)};\n` +
    `const statGrowth = (N) => (N - 1) * (0.7025 + 0.0175 * (N - 1));\n` +
    `const statAtLevel = (v, N) =>\n` +
    `    v[2] === 'x' ? v[0] * (1 + v[1] * statGrowth(N)) :\n` +
    `    v[2] === 'l' ? v[0] + v[1] * (N - 1) :\n` +
    `                   v[0] + v[1] * statGrowth(N);\n`;

console.log(`챔피언 ${Object.keys(out).length}명 / 스탯 ${stats}자리`);
console.log(`원본 ${(fs.statSync(SRC).size / 1024).toFixed(0)}KB -> 압축 ${(Buffer.byteLength(body) / 1024).toFixed(0)}KB`);
if (warn.length) { console.log(`[주의] 압축에서 제외한 자리 ${warn.length}개:`); warn.forEach(x => console.log(`  ${x}`)); }

if (!WRITE) { console.log('\n미리보기였습니다. --write 를 붙이면 public/champion_stats.js 를 만듭니다.'); process.exit(0); }
fs.writeFileSync(OUT, body, 'utf8');
console.log(`\n${OUT} 생성 완료`);
