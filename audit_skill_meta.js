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
const WIKI_STATS = (() => { try { return JSON.parse(fs.readFileSync(path.join(ROOT, 'wiki_stats.json'), 'utf8')); } catch { return {}; } })();
const dd = loadDD();
if (!dd) { console.error('DD championFull 캐시가 없다. build_level_curves.js 를 한 번 돌릴 것.'); process.exit(1); }

const SLOTS = ['P', 'Q', 'W', 'E', 'R'];

// ★★ **확인이 끝난 자리** (2026-08-14). 걸리는 게 정상이라 합계에서 빼고 따로 보여준다.
//
//   ★ 검사를 **건너뛰지 않는다.** 걸린 사실은 그대로 잡되 "확인 끝난 자리" 칸으로 옮기고
//     **현재 값을 같이 찍는다.** 그래야 나중에 라이엇이 값을 바꿨을 때 눈에 띈다 —
//     예외로 빼 버리면 그 자리가 진짜 문제가 돼도 영영 안 보인다.
//   ★ 여기 없는 게 하나라도 걸리면 **그건 새 문제다.** 합계가 0 이 아니면 곧 신호다.
// ★ 2026-08-23: 값이 wiki_stats.json 과 같은 자리는 출처 검사를 건너뛰므로(fromWiki) 여기 있던 18줄을 지웠다.
//   (유미 Q·자야 Q·오른 E 등 — 위키 값을 그대로 쓰는 자리. fill_values.js 의 STAT_MANUAL 주석에 근거가 있다)
const KNOWN_OK = new Map([
    ['람머스 R', '사거리 롤위키 800 (bin castRange 25000 더미)'],
    // --- 우리가 일부러 DD 와 다르게 넣은 값 (fill_values.js 의 STAT_MANUAL) ---
    //   전부 DD·bin 이 쓸모없는 값(사거리 25000 / 투사체 속도가 기본 공격 속도)을 주는 자리다
    ['세라핀 R', '나무위키 1200 = bin RRange'],
    ['미스 포츈 R', '사거리 나무위키 1400 · 투사체 롤위키 SPEED 2000'],
    ['아트록스 E', '롤위키 75-300 = bin EMaxRange'],
    // 2026-08-23 롤위키 전수 대조에서 잡은 자리
    ['하이머딩거 W', '투사체 나무위키 1200 (계열 750 은 다른 값)'],
    ['헤카림 R', '사거리: 롤위키 300-1000 = bin MaxDashRange · 폭 480: 롤위키 `80 기수 하나 | 480 전체` 의 전체 폭 손표 (wiki_stats 는 첫 숫자 80)'],
    ['세트 W', '롤위키 Range -25 - 720'],
    // 자헨 Q 항목은 지웠다 (2026-08-24) — 기본 공격 강화 스킬이라 사거리 칸 자체를 뺐다 (8/24 "사거리 칸 제거 46자리" 부류)
    // 진 R 항목도 지웠다 (2026-08-24) — 투사체를 5000(bin JhinRShotMis spec = 롤위키)으로 정정하니 계열 일치로 더 안 걸린다

    // --- 라이엇 데이터가 원래 그런 자리 ---
    ['암베사 P', '패시브에 쿨타임이 **없는** 스킬이다 (롤위키·나무위키 둘 다 명시). bin 에 keyCooldown 키만 남아 있고 문장은 빈 문자열'],
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

// 확인이 끝난 자리는 합계에서 빼고 여기 모은다 (위 KNOWN_OK 주석 참고).
//   ★ 현재 값을 같이 담는다 — 라이엇이 값을 바꾸면 이 줄이 달라져서 눈에 띈다.
const knownOk = [];
const pushHit = (bucket, tag, line) => {
    if (KNOWN_OK.has(tag)) knownOk.push(`${line}\n      -> ${KNOWN_OK.get(tag)}`);
    else bucket.push(line);
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
    // 본체 이름을 포함하는 계열 객체들의 mMissileSpec 속도 집합 (fill_values.js 의 계열 보정과 같은 규칙)
    const familySpeeds = (slot) => {
        const out = new Set();
        const p = paths[slot];
        if (!bin || !p) return out;
        const bodyName = p.split('/').pop().toLowerCase();
        for (const [k, v] of Object.entries(bin)) {
            if (k === p || !v || !v.mSpell) continue;
            if (!k.split('/').pop().toLowerCase().includes(bodyName)) continue;
            const mc = v.mSpell.mMissileSpec && v.mSpell.mMissileSpec.movementComponent;
            if (!mc) continue;
            const sp = (typeof mc.mSpeed === 'number' && mc.mSpeed) || (typeof mc.mInitialSpeed === 'number' && mc.mInitialSpeed) || 0;
            if (sp >= 300 && sp < 20000) out.add(Math.round(sp * 100) / 100);
        }
        return out;
    };

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
                pushHit(R.passiveCdMissing, tag, `${tag}  (bin: ${lk.keyCooldown})`);
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
            // ★ bin 에 keyCooldown 문장이 있는 액티브 스킬은 클라가 그 문장을 쓴다 (2026-08-23).
            //   라칸 E·렝가 Q/W/E·칼리스타 E·카서스 Q 가 그래서 DD cooldownBurn(0 / 0.25)과 다르다.
            //   fill_values.js 가 문장을 풀어 넣으므로 여기서는 DD 대조를 건너뛴다.
            const lk = bin && paths[slot] && bin[paths[slot]].mSpell.mClientData
                && bin[paths[slot]].mSpell.mClientData.mTooltipData
                && bin[paths[slot]].mSpell.mClientData.mTooltipData.mLocKeys;
            const hasCdKey = !!(lk && lk.keyCooldown);
            if (isNumList(cd) && ddN.length && !hasCdKey) {
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
        // ★ wiki_stats.json 에서 온 값은 bin 에 없는 게 당연하다 — 출처 검사를 건너뛴다 (2026-08-23)
        const wk = ((WIKI_STATS[ddId] || {})[slot]) || {};
        const fromWiki = (name) => st[name] != null && wk[name] !== undefined && String(wk[name]) === String(st[name]);
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
                ) {
                if (!fromWiki('사거리')) pushHit(R.rangeMismatch, tag, `${tag}  우리 ${rng}  /  DD ${d.rangeBurn}`);
            }
        }

        // 투사체 속도 — 본체에 있는 값인지 확인한다
        const ms = st['투사체 속도'];
        if (ms != null && ms !== '' && !fromWiki('투사체 속도')) {
            const our = Number(toNums(ms)[0]);
            const bodySpeed = (bin && paths[slot] && bin[paths[slot]].mSpell.missileSpeed) || 0;
            // ★ 본체 자신의 mMissileSpec 속도도 정당한 출처다 (2026-08-24, fill_values 의 spec 우선 규칙).
            //   legacy(missileSpeed)와 spec 이 갈리는 본체 20자리 전부에서 롤위키가 spec 과 일치했다.
            const bodySpecSpeed = (() => {
                try {
                    const mc = bin && paths[slot] && bin[paths[slot]].mSpell.mMissileSpec
                        && bin[paths[slot]].mSpell.mMissileSpec.movementComponent;
                    return mc ? ((typeof mc.mSpeed === 'number' && mc.mSpeed) || (typeof mc.mInitialSpeed === 'number' && mc.mInitialSpeed) || 0) : 0;
                } catch (e) { return 0; }
            })();
            if (our <= 20) {
                R.missileDummy.push(`${tag} = ${ms}`);
            } else if (Math.abs(our - 347.8) < 0.05 || our >= 100000) {
                // 347.8 = 라이엇 엔진의 기본 공격 기본값 / 10억 = "즉시 도달".
                //   둘 다 "값을 안 정했다" 는 뜻이라 투사체가 없는 스킬이다.
                R.missileEngine.push(`${tag} = ${ms}`);
            } else if (Math.abs(bodySpeed - our) > 0.05 && Math.abs(bodySpecSpeed - our) > 0.05 && !familySpeeds(slot).has(our)) {
                // ★ 본체가 틀값(1200·902·828.5·779.9·8700)이면 fill_values.js 가 계열 미사일 객체의
                //   mMissileSpec.movementComponent.mSpeed 를 쓴다 (2026-08-23). 그 값이면 정상이다.
                const fromBA = baSpeeds.has(Math.round(our * 10) / 10);
                pushHit(R.missileDirty, tag,
                    `${tag} = ${ms}   (본체 ${bodySpeed || 0}${fromBA ? ' · 기본공격 속도와 일치' : ''})`);
            }
        }

        // 스킬 폭
        const w = st['스킬 폭'];
        if (w != null && w !== '' && !fromWiki('스킬 폭')) {
            const our = Number(toNums(w)[0]);
            // ★ mLineWidth 는 반지름이라 화면에는 2배(전체 폭)로 나간다 (2026-08-23, fill_values.js 참고)
            const bodyW = ((bin && paths[slot] && bin[paths[slot]].mSpell.mLineWidth) || 0) * 2;
            // ★ 롤위키 WIDTH 가 mLineWidth 와 같으면 fill_values 가 2배를 안 한다 (2026-08-24, 요네 R 인게임 확인) — 그 값도 정당하다
            const halfOk = bodyW && Math.abs(bodyW / 2 - our) < 0.05 && wk['스킬 폭'] !== undefined && Math.abs(parseFloat(wk['스킬 폭']) - our) < 0.5;
            if (Math.abs(bodyW - our) > 0.05 && !halfOk) pushHit(R.widthDirty, tag, `${tag} = ${w}  (본체x2 ${bodyW || '없음'})`);
        }

        // 시전시간
        const ct = st['시전시간'];
        if (ct != null && ct !== '') {
            const our = Number(toNums(ct)[0]);
            // 공격 속도 비례 범위("0.35 ~ 0.175 …")는 STAT_MANUAL 이다 (야스오 Q·요네 Q/W, 2026-08-23)
            if ((!(our > 0) || our > 10) && isNumList(ct)) R.castTimeOdd.push(`${tag} = ${ct}`);   // 손표 문장("0.25 (재사용)")은 건너뛴다
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
console.log(`합계 ${total}자리   ${total === 0 ? '— 새로 확인할 것 없음' : '★ 확인 필요'}`);
console.log('='.repeat(70));

// ★ 확인이 끝난 자리. 걸리는 게 정상이라 합계에서 뺐지만 **현재 값을 같이 찍어**
//   라이엇이 값을 바꿨을 때 눈에 띄게 한다 (위 KNOWN_OK 주석 참고).
console.log(`\n[확인 끝난 자리] ${knownOk.length}개 — 걸리는 게 정상이다. 값이 달라졌으면 다시 볼 것`);
if (!knownOk.length) console.log('  (없음)');
else knownOk.forEach(x => console.log('  ' + x));
const unusedOk = [...KNOWN_OK.keys()].filter(k => !knownOk.some(x => x.startsWith(k + ' ')));
if (unusedOk.length) {
    console.log(`\n  ※ KNOWN_OK 에 적혔는데 이번엔 안 걸린 자리 ${unusedOk.length}개:`);
    console.log('    ' + unusedOk.join(', '));
    console.log('    (라이엇이 데이터를 고쳐 정상이 됐거나, 우리가 값을 바꿨거나, 오타다)');
}
