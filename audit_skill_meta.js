// ============================================================
//  audit_skill_meta.js  —  확인 전용
//
//  스킬 칸 **우상단에 나가는 값**을 전 챔피언 전 슬롯 전수조사한다.
//    · 쿨타임      (app.js `쿨타임 ${skill.cooldown}`)
//    · 소모값      (app.js `소모값 ${skill.cost}`)
//    · stats 전체  (사거리 / 시전시간 / 투사체 속도 / 스킬 폭)
//
//  대조 상대가 셋이다:
//    ① public/custom_values.js  — 지금 화면에 나가는 값
//    ② Data Dragon championFull — 독립 출처. cooldownBurn·costBurn·rangeBurn·maxrank
//    ③ CD bin (.cache/bin)      — 원본. 값이 **어느 스펠 객체에서 왔는지**까지 본다
//
//  사용법:  node audit_skill_meta.js  [--full]
//    --full 을 붙이면 예시를 안 자르고 전부 찍는다.
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = __dirname;
const BIN_DIR = path.join(ROOT, '.cache', 'bin');
const FULL = process.argv.includes('--full');

// ------------------------------------------------------------
// 입력 읽기
// ------------------------------------------------------------

function loadCustomValues() {
    // 기본은 지금 화면에 나가는 파일. `--new` 를 붙이면 fill_values.js 가 갓 만든 것을 본다.
    const file = process.argv.includes('--new') ? 'custom_values.new.js' : 'custom_values.js';
    console.log(`검사 파일: public/${file}`);
    const src = fs.readFileSync(path.join(ROOT, 'public', file), 'utf8');
    const ctx = { document: { createElement: () => ({ style: {} }) } };
    vm.createContext(ctx);
    vm.runInContext(src + '\n;__out = customValues;', ctx);
    return ctx.__out;
}

function loadDD() {
    const files = fs.readdirSync(path.join(ROOT, '.cache'))
        .filter(f => /^dd_championFull_/.test(f))
        .sort();
    if (!files.length) return null;
    const pick = files[files.length - 1];
    const j = JSON.parse(fs.readFileSync(path.join(ROOT, '.cache', pick), 'utf8'));
    return { version: pick, data: j.data };
}

const binCache = {};
function loadBin(ddId) {
    // 파일명은 CD alias 소문자다. 피들스틱만 DD 철자와 다르다.
    const alias = ddId === 'Fiddlesticks' ? 'fiddlesticks' : ddId.toLowerCase();
    if (binCache[alias] !== undefined) return binCache[alias];
    const p = path.join(BIN_DIR, alias + '.json');
    if (!fs.existsSync(p)) return (binCache[alias] = null);
    try { return (binCache[alias] = JSON.parse(fs.readFileSync(p, 'utf8'))); }
    catch { return (binCache[alias] = null); }
}

// ------------------------------------------------------------
// bin 헬퍼
// ------------------------------------------------------------

// CharacterRecord 로 QWER 본체 + 패시브 경로를 얻는다.
function binSpellPaths(bin, ddId) {
    const out = { Q: null, W: null, E: null, R: null, P: null };
    if (!bin) return out;
    const rec = Object.values(bin).find(v => v && v.mCharacterPassiveSpell && Array.isArray(v.spells))
        || Object.values(bin).find(v => v && v.mCharacterPassiveSpell);
    if (!rec) return out;
    ['Q', 'W', 'E', 'R'].forEach((k, i) => {
        const p = (rec.spells || [])[i];
        if (p && bin[p] && bin[p].mSpell) out[k] = p;
    });
    const pp = rec.mCharacterPassiveSpell;
    if (pp && bin[pp] && bin[pp].mSpell) out.P = pp;
    return out;
}

const locKeys = (spellObj) => {
    const cd = spellObj && spellObj.mSpell && spellObj.mSpell.mClientData;
    return (cd && cd.mTooltipData && cd.mTooltipData.mLocKeys) || {};
};

// 그 챔피언의 **기본 공격** 계열 missileSpeed 모음. 오염 판별용.
function basicAttackSpeeds(bin) {
    const set = new Set();
    if (!bin) return set;
    for (const [k, v] of Object.entries(bin)) {
        if (!v || !v.mSpell) continue;
        if (!/BasicAttack|CritAttack/i.test(k)) continue;
        const ms = v.mSpell.missileSpeed;
        if (typeof ms === 'number' && ms > 0) set.add(Math.round(ms * 10) / 10);
    }
    return set;
}

// ------------------------------------------------------------
// 값 정규화 (우리 표기 <-> DD 표기)
// ------------------------------------------------------------

const nums = (s) => String(s == null ? '' : s)
    .replace(/<[^>]*>/g, '')
    .split(/[/]/).map(x => x.trim()).filter(x => x !== '');

const isNumList = (s) => nums(s).length > 0 && nums(s).every(x => /^-?\d+(\.\d+)?$/.test(x));

// "22 / 19.5 / 17" -> [22,19.5,17].  전부 같으면 1칸으로 접힌 것도 그대로 둔다.
const toNums = (s) => nums(s).map(Number);

const sameNumList = (a, b) => {
    const A = toNums(a), B = toNums(b);
    if (!A.length || !B.length) return false;
    // 한쪽이 접혀 있으면(전부 같은 값) 펴서 비교한다
    const expand = (X, n) => X.length === 1 ? Array(n).fill(X[0]) : X;
    const n = Math.max(A.length, B.length);
    const AA = expand(A, n), BB = expand(B, n);
    if (AA.length !== BB.length) return false;
    return AA.every((x, i) => Math.abs(x - BB[i]) < 0.011);
};

// ------------------------------------------------------------
// 본체
// ------------------------------------------------------------

const cv = loadCustomValues();
const dd = loadDD();
if (!dd) { console.error('DD championFull 캐시가 없다. build_level_curves.js 를 한 번 돌릴 것.'); process.exit(1); }

const SLOTS = ['P', 'Q', 'W', 'E', 'R'];

// ★ `fill_values.js` 의 STAT_MANUAL 로 **일부러** 넣은 자리 (2026-08-14).
//   전부 DD·bin 이 쓸모없는 값(25000 / 기본 공격 속도)을 주는 자리라 위키에서 가져왔다.
//   여기 적어 두지 않으면 "DD 와 다르다" 로 계속 걸려서 진짜 문제가 묻힌다.
const WIKI_SOURCED = new Set([
    '유미 Q', '유미 W', '요네 E', '세라핀 R', '미스 포츈 R', '아트록스 E', '오른 W', '바드 Q', '헤카림 R',  // 사거리
    '진 R', '코르키 R', '카직스 W',                             // 투사체 속도
]);

// 결과 버킷
const R = {
    passiveCdMissing: [],   // 패시브에 쿨타임이 있는데 "-" 로 나감
    cdMismatch: [],         // 쿨타임이 DD 와 다름
    cdRankCount: [],        // 쿨타임 칸 수가 DD maxrank 와 다름
    cdEmpty: [],            // 쿨타임이 빈칸/물음표
    costMismatch: [],       // 소모값이 DD 와 다름
    costEmpty: [],          // 소모값이 빈칸/물음표
    costDashButDD: [],      // 우리는 "-" 인데 DD 는 소모가 있음
    rangeMismatch: [],      // 사거리가 DD 와 다름
    rangeHuge: [],          // 사거리가 내부값으로 보임 (>= 3000)
    missileDirty: [],       // 투사체 속도가 본체가 아닌 데서 왔음
    missileDummy: [],       // 투사체 속도가 근접 판정 더미(20 이하)
    missileEngine: [],      // 투사체 속도가 엔진 기본값(347.8)이거나 "즉시 도달"(>=100000)
    widthDirty: [],         // 스킬 폭이 본체에 없음
    castTimeOdd: [],        // 시전시간 이상치
    statEmpty: [],          // stats 값이 빈칸
};

let slotCount = 0, champCount = 0;

for (const [ddId, champ] of Object.entries(cv)) {
    const ddc = dd.data[ddId];
    if (!ddc) { continue; }
    champCount++;
    const bin = loadBin(ddId);
    const paths = binSpellPaths(bin, ddId);
    const baSpeeds = basicAttackSpeeds(bin);
    const koName = ddc.name;

    // DD 스킬을 슬롯 문자로 색인
    const ddSpell = {};
    ['Q', 'W', 'E', 'R'].forEach((k, i) => { ddSpell[k] = (ddc.spells || [])[i] || null; });

    for (const slot of SLOTS) {
        const v = champ[slot];
        if (!v || typeof v !== 'object') continue;
        slotCount++;

        const tag = `${koName} ${slot}`;

        // ---------- 패시브 ----------
        if (slot === 'P') {
            const lk = paths.P && bin ? locKeys(bin[paths.P]) : {};
            if (lk.keyCooldown && String(v.cooldown) === '-') {
                R.passiveCdMissing.push(`${tag}  (bin: ${lk.keyCooldown})`);
            }
            continue;   // 패시브는 DD 대조 대상이 없다
        }

        const d = ddSpell[slot];

        // ---------- 쿨타임 ----------
        const cd = v.cooldown;
        if (cd === '' || cd == null || /\?/.test(String(cd))) {
            R.cdEmpty.push(`${tag} = ${JSON.stringify(cd)}`);
        } else if (d && String(cd) !== '-') {
            const ourN = toNums(cd), ddN = toNums(d.cooldownBurn);
            if (isNumList(cd) && ddN.length) {
                if (!sameNumList(cd, d.cooldownBurn))
                    R.cdMismatch.push(`${tag}  우리 ${cd}  /  DD ${d.cooldownBurn}`);
                // 칸 수 (접힌 경우는 제외)
                if (ourN.length > 1 && d.maxrank && ourN.length !== d.maxrank)
                    R.cdRankCount.push(`${tag}  우리 ${ourN.length}칸  /  DD maxrank ${d.maxrank}`);
            }
        }

        // ---------- 소모값 ----------
        const cost = v.cost;
        if (cost === '' || cost == null || /\?/.test(String(cost))) {
            R.costEmpty.push(`${tag} = ${JSON.stringify(cost)}`);
        } else if (d) {
            const ddCostN = toNums(d.costBurn);
            const ddHasCost = ddCostN.length && ddCostN.some(x => x > 0);
            if (String(cost) === '-' && ddHasCost) {
                R.costDashButDD.push(`${tag}  DD ${d.costBurn} (${d.costType || d.resource || ''})`);
            } else if (isNumList(cost) && ddHasCost && !sameNumList(cost, d.costBurn)) {
                R.costMismatch.push(`${tag}  우리 ${cost}  /  DD ${d.costBurn}`);
            }
        }

        // ---------- stats ----------
        const st = v.stats || {};
        for (const [k, val] of Object.entries(st)) {
            if (val === '' || val == null) R.statEmpty.push(`${tag} / ${k}`);
        }

        // 사거리
        //   ★ 20000 이 경계다 — 소환사의 협곡이 약 15000 유닛이라 그보다 크면 맵 전체다.
        //     `fill_values.js` 의 RANGE_GLOBAL 과 같은 값이어야 한다.
        //     3000~12000 은 진짜 값이 대부분이라(갈리오 R·스웨인 W·케이틀린 R) 세지 않는다.
        const rng = st['사거리'];
        if (rng != null && rng !== '') {
            const rN = toNums(rng);
            if (rN.length && rN.every(x => x >= 20000)) R.rangeHuge.push(`${tag} = ${rng}`);
            if (d && isNumList(rng) && toNums(d.rangeBurn).length && !sameNumList(rng, d.rangeBurn)
                && !WIKI_SOURCED.has(tag)) {
                R.rangeMismatch.push(`${tag}  우리 ${rng}  /  DD ${d.rangeBurn}`);
            }
        }

        // 투사체 속도 — 본체에 있는 값인지 확인한다
        const ms = st['투사체 속도'];
        if (ms != null && ms !== '') {
            const our = Number(toNums(ms)[0]);
            const bodySpeed = (bin && paths[slot] && bin[paths[slot]].mSpell.missileSpeed) || 0;
            if (our <= 20) {
                R.missileDummy.push(`${tag} = ${ms}`);
            } else if (Math.abs(our - 347.8) < 0.05 || our >= 100000) {
                // 347.8 = 라이엇 엔진의 기본 공격 기본값 / 10억 = "즉시 도달".
                //   둘 다 "값을 안 정했다" 는 뜻이라 투사체가 없는 스킬이다.
                R.missileEngine.push(`${tag} = ${ms}`);
            } else if (Math.abs(bodySpeed - our) > 0.05 && !WIKI_SOURCED.has(tag)) {
                const fromBA = baSpeeds.has(Math.round(our * 10) / 10);
                R.missileDirty.push(
                    `${tag} = ${ms}   (본체 ${bodySpeed || 0}${fromBA ? ' · 기본공격 속도와 일치' : ''})`);
            }
        }

        // 스킬 폭
        const w = st['스킬 폭'];
        if (w != null && w !== '') {
            const our = Number(toNums(w)[0]);
            const bodyW = (bin && paths[slot] && bin[paths[slot]].mSpell.mLineWidth) || 0;
            if (Math.abs(bodyW - our) > 0.05) R.widthDirty.push(`${tag} = ${w}  (본체 ${bodyW || '없음'})`);
        }

        // 시전시간
        const ct = st['시전시간'];
        if (ct != null && ct !== '') {
            const our = Number(toNums(ct)[0]);
            if (!(our > 0) || our > 10) R.castTimeOdd.push(`${tag} = ${ct}`);
        }
    }
}

// ------------------------------------------------------------
// 보고서
// ------------------------------------------------------------

const show = (title, arr, note) => {
    console.log(`\n${'='.repeat(70)}`);
    console.log(`${title}  —  ${arr.length}자리`);
    if (note) console.log(`  ${note}`);
    console.log('='.repeat(70));
    if (!arr.length) { console.log('  (없음)'); return; }
    const lim = FULL ? arr.length : 25;
    arr.slice(0, lim).forEach(x => console.log('  ' + x));
    if (arr.length > lim) console.log(`  ... 외 ${arr.length - lim}자리 (--full 로 전부 보기)`);
};

console.log(`\nDD 기준: ${dd.version}`);
console.log(`검사 대상: 챔피언 ${champCount}명 / 슬롯 ${slotCount}개`);

show('① 패시브 쿨타임이 화면에 안 나간다', R.passiveCdMissing,
    'bin 에 keyCooldown 이 있는데 코드가 "-" 로 하드코딩한다');
show('② 쿨타임이 DD 와 다르다', R.cdMismatch);
show('③ 쿨타임 칸 수가 DD maxrank 와 다르다', R.cdRankCount,
    'MAX_RANK 표가 맞는지 확인하는 자리다');
show('④ 쿨타임이 빈칸/물음표', R.cdEmpty, '화면에 "쿨타임 " 만 나간다');
show('⑤ 소모값이 "-" 인데 DD 에는 있다', R.costDashButDD);
show('⑥ 소모값이 DD 와 다르다', R.costMismatch);
show('⑦ 소모값이 빈칸/물음표', R.costEmpty, '화면에 "소모값 " 만 나간다');
show('⑧ 사거리가 DD 와 다르다', R.rangeMismatch,
    'castRangeDisplayOverride 를 우선하므로 다를 수 있다. 큰 차이만 볼 것');
show('⑨ 사거리가 "표시할 값 없음" 더미다 (>=20000)', R.rangeHuge,
    '맵이 약 15000 유닛이라 그보다 크면 사거리로서 뜻이 없다. fill_values.js 가 걸러낸다');
show('⑩ 투사체 속도가 근접 판정 더미다 (<=20)', R.missileDummy,
    '투사체가 없는 스킬이다. 화면에서 빼야 한다');
show('⑪ 투사체 속도가 본체에 없는 값이다', R.missileDirty,
    'pool 폴백이 옆 스펠 객체(기본 공격 등)에서 집어온 값이다');
show('⑮ 투사체 속도가 엔진 기본값이다 (347.8 또는 >=100000)', R.missileEngine,
    '347.8 = 라이엇 기본 공격 기본값 / 10억 = "즉시 도달". 값을 안 정한 스킬이다');
show('⑫ 스킬 폭이 본체에 없는 값이다', R.widthDirty);
show('⑬ 시전시간 이상치', R.castTimeOdd);
show('⑭ stats 값이 빈칸', R.statEmpty);

const total = Object.values(R).reduce((a, b) => a + b.length, 0);
console.log(`\n${'='.repeat(70)}`);
console.log(`합계 ${total}자리`);
console.log('='.repeat(70));
