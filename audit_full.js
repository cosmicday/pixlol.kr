// ============================================================
//  audit_full.js  —  확인 전용. 전 챔피언 전 스킬 최종 점검
//
//  `audit_skill_meta.js` 가 **우상단 값**(쿨타임·소모값·stats)을 DD 와 대조한다면,
//  이쪽은 **화면 전체**를 본다. 위키 조회 없이 bin·DD·우리 파일만으로 판별 가능한
//  "이상 신호" 를 모아 준다. 여기 걸린 자리만 위키로 확인하면 된다.
//
//  ① 설명 — 문장이 비었거나 DD 폴백이거나 미해결 토큰이 남은 자리
//  ② 회색 글씨 — bin 에 있는데 화면에 안 나가는 자리
//  ③ 각주 — 레벨에 따라 변하는데 각주가 없는 자리
//  ④ stats — 스킬 성격과 안 맞는 값 (자기 대상인데 투사체 속도가 있다 등)
//
//  사용법:  node audit_full.js [--full]
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = __dirname;
const BIN_DIR = path.join(ROOT, '.cache', 'bin');
const FULL = process.argv.includes('--full');

// ------------------------------------------------------------
function loadJs(file, varName) {
    const ctx = { document: { createElement: () => ({ style: {} }) } };
    vm.createContext(ctx);
    for (const f of [].concat(file)) vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx);
    vm.runInContext(`__out = ${varName};`, ctx);
    return ctx.__out;
}

const values = loadJs('public/custom_values.js', 'customValues');
const templates = loadJs('public/custom_templates.js', 'customTemplates');
// custom_graphs.js 는 custom_values.js 의 헬퍼가 먼저 있어야 평가된다 (브라우저와 같은 순서)
const graphs = loadJs(['public/custom_values.js', 'public/custom_graphs.js'], 'customGraphs');

const ddFile = fs.readdirSync(path.join(ROOT, '.cache')).filter(f => /^dd_championFull_/.test(f)).sort().pop();
const dd = JSON.parse(fs.readFileSync(path.join(ROOT, '.cache', ddFile), 'utf8')).data;

// stringtable — 회색 글씨 키가 **빈 문자열인지** 보려면 필요하다 (아래 ② 참고)
let strings = {};
try {
    const st = JSON.parse(fs.readFileSync(path.join(ROOT, '.cache', 'lol.stringtable.json'), 'utf8'));
    strings = st.entries || st;
} catch { console.warn('  (stringtable 캐시가 없어 ② 검사가 느슨해진다)'); }

const binOf = (ddId) => {
    const alias = ddId === 'Fiddlesticks' ? 'fiddlesticks' : ddId.toLowerCase();
    const p = path.join(BIN_DIR, alias + '.json');
    if (!fs.existsSync(p)) return null;
    try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return null; }
};

// ------------------------------------------------------------
const R = {
    tplEmpty: [],        // ① 문장이 비었다 (DD 툴팁으로 폴백된다)
    tplToken: [],        // ① 미해결 토큰이 문장에 남았다
    tplQuestion: [],     // ① 값이 ?/빈칸이라 문장이 통째로 폴백된다
    rulesMissing: [],    // ② bin 에 회색 글씨가 있는데 화면에 없다
    noteMissing: [],     // ③ (레벨에 따라) 인데 각주가 없다
    noteCount: [],       // ③ (레벨에 따라) 수와 각주 수가 안 맞는다
    missileOnSelf: [],   // ④ 자기 대상/자기 주변인데 투사체 속도가 있다
    widthOnSelf: [],     // ④ 자기 대상인데 스킬 폭이 있다
    dashNoDash: [],      // ④ 돌진 속도가 있는데 이름에 dash 가 없는 스펠
};

// 자기 자신에게만 작용하는 타겟팅 타입 — 투사체가 있을 수 없다
const SELF_TYPES = new Set(['Self', 'SelfAoe']);

// ★★ **확인이 끝난 자리** — 걸리는 게 정상이라 합계에서 빼고 따로 보여준다 (2026-08-14).
//   `audit_skill_meta.js` 의 KNOWN_OK 와 같은 방식이다.
//   ★ 검사를 건너뛰지 않고 "확인 끝난 자리" 칸으로 옮기기만 한다 —
//     예외로 빼 버리면 그 자리가 나중에 진짜 문제가 돼도 영영 안 보인다.
const KNOWN_OK = new Map([
    ['파이크 R', '회색 글씨 두 줄이 다 **인게임에서 실시간으로 세는 누적 골드**라 고정값이 없다. KEEP_TEXT 로 일부러 비웠다 (드레이븐 P·초가스 R 과 같은 처리)'],
]);
const knownOk = [];
const pushHit = (bucket, tag, line) => {
    if (KNOWN_OK.has(tag)) knownOk.push(`${line}\n      -> ${KNOWN_OK.get(tag)}`);
    else bucket.push(line);
};

let champN = 0, slotN = 0;

for (const [ddId, champ] of Object.entries(values)) {
    const ddc = dd[ddId];
    if (!ddc) continue;
    champN++;
    const ko = ddc.name;
    const bin = binOf(ddId);
    const rec = bin && (Object.values(bin).find(v => v && v.mCharacterPassiveSpell && Array.isArray(v.spells)) || null);
    const tpl = templates[ddId] || {};
    const gr = graphs[ddId] || {};

    const paths = { P: rec && rec.mCharacterPassiveSpell };
    ['Q', 'W', 'E', 'R'].forEach((k, i) => { paths[k] = rec && (rec.spells || [])[i]; });

    for (const slot of ['P', 'Q', 'W', 'E', 'R']) {
        const v = champ[slot];
        if (!v || typeof v !== 'object') continue;
        slotN++;
        const tag = `${ko} ${slot}`;
        const t = tpl[slot];
        const spellObj = paths[slot] && bin && bin[paths[slot]];
        const spell = spellObj && spellObj.mSpell;

        // ---------- ① 문장 ----------
        if (t === null) { /* "이 챔피언에겐 이 키가 없다" — 정상 */ }
        else if (t === undefined || (typeof t === 'string' && !t.trim())) {
            R.tplEmpty.push(tag);
        } else {
            const flat = Array.isArray(t) ? t.join(' ') : String(t);
            if (/\{\{|@[A-Za-z]/.test(flat)) R.tplToken.push(`${tag}  ${flat.match(/\{\{[^}]*\}\}|@[A-Za-z0-9_.:]+@/)[0]}`);
            // 문장이 쓰는 {pN} 중 값이 ?/빈 것 -> app.js 가 문장을 통째로 버린다
            const bad = [...flat.matchAll(/\{(p\d+)\}/g)].map(m => m[1])
                .filter(k => v[k] === undefined || v[k] === '' || String(v[k]).includes('?'));
            if (bad.length) R.tplQuestion.push(`${tag}  ${bad.join(', ')}`);
        }

        // ---------- ② 회색 글씨 ----------
        const lk = spell && spell.mClientData && spell.mClientData.mTooltipData
            && spell.mClientData.mTooltipData.mLocKeys;
        // ★ bin 이 키를 가리켜도 **stringtable 값이 빈 문자열이면 라이엇도 표시하지 않는다.**
        //   9자리가 그랬다 (그웬 W·E, 노틸러스 W, 멜 Q, 시비르 R, 암베사 W·E, 유나라 R).
        //   진짜 누락과 구분해야 목록이 의미를 갖는다.
        if (lk && lk.keyTooltipExtendedBelowLine && !tpl[slot + '_rules']) {
            const s = strings[String(lk.keyTooltipExtendedBelowLine).toLowerCase()];
            if (typeof s === 'string' && s.trim()) {
                pushHit(R.rulesMissing, tag, `${tag}  (bin: ${lk.keyTooltipExtendedBelowLine})`);
            }
        }

        // ---------- ③ 각주 ----------
        const tplFlat = String(Array.isArray(t) ? t.join(' ') : (t || '')) + String(tpl[slot + '_rules'] || '');
        for (const [k, val] of Object.entries(v)) {
            if (!/^p\d+$/.test(k)) continue;
            const n = (String(val).match(/\(레벨에 따라\)/g) || []).length;
            if (!n) continue;
            if (!tplFlat.includes('{' + k + '}')) continue;      // 문장에 안 쓰이면 화면에 없다
            const g = (gr[slot] || {})[k];
            const have = g === undefined ? 0 : (Array.isArray(g) ? g.length : 1);
            if (have === 0) R.noteMissing.push(`${tag} ${k}  = ${String(val).replace(/<[^>]*>/g, '').slice(0, 60)}`);
            else if (have < n) R.noteCount.push(`${tag} ${k}  (레벨에 따라) ${n}개인데 각주 ${have}개`);
        }
        // 쿨타임도 같은 검사 (패시브 쿨이 레벨 비례인 자리)
        if (/\(레벨에 따라\)/.test(String(v.cooldown || '')) && !((gr[slot] || {}).cooldown)) {
            R.noteMissing.push(`${tag} cooldown  = ${v.cooldown}`);
        }

        // ---------- ④ stats 가 스킬 성격과 맞나 ----------
        const st = v.stats || {};
        const ttype = spell && spell.mTargetingTypeData && spell.mTargetingTypeData.__type;
        // ★★ "진짜 미사일이 있는가" 는 두 신호로 가른다 (2026-08-14):
        //     · `mMissileEffectName` 이 스펠 객체에 있다
        //     · 계열에 이름이 `...Missile...` 인 스펠 객체가 있다
        //   카이사 Q 는 `KaisaQLeftMissile1~6` 이 있고, 가렌 E·이블린 R 은 둘 다 없다.
        //   **타겟팅 타입만으로는 못 가른다** — 카이사 Q 도 `Self` 다 (자기 중심 발사).
        let hasMissileObj = false;
        if (spell && bin) {
            if (spell.mMissileEffectName) hasMissileObj = true;
            else {
                const needle = (ddId + slot).toLowerCase();
                hasMissileObj = Object.keys(bin).some(k => {
                    const low = k.toLowerCase();
                    return low.includes(needle) && /missile/.test(low.split('/').pop());
                });
            }
        }
        if (st['투사체 속도'] && SELF_TYPES.has(ttype) && !hasMissileObj) {
            R.missileOnSelf.push(`${tag} = ${st['투사체 속도']}   (타겟팅: ${ttype})`);
        }
        // 스킬 폭은 투사체만큼 명확하지 않다 — 자기 주변 광역에도 폭이 있을 수 있다.
        //   미사일이 진짜 있는 자리(카이사 Q 등)만 빼고 나머지를 후보로 남긴다.
        if (st['스킬 폭'] && SELF_TYPES.has(ttype) && !hasMissileObj) {
            R.widthOnSelf.push(`${tag} = ${st['스킬 폭']}   (타겟팅: ${ttype})`);
        }
        if (st['돌진 속도'] && spell) {
            const names = (spell.DataValues || []).map(d => String(d.name || ''));
            if (!names.some(n => /dash|leap/i.test(n))) R.dashNoDash.push(`${tag} = ${st['돌진 속도']}`);
        }
    }
}

// ------------------------------------------------------------
const show = (title, arr, note) => {
    console.log(`\n${'='.repeat(72)}`);
    console.log(`${title}  —  ${arr.length}자리`);
    if (note) console.log(`  ${note}`);
    console.log('='.repeat(72));
    if (!arr.length) return console.log('  (없음)');
    const lim = FULL ? arr.length : 30;
    arr.slice(0, lim).forEach(x => console.log('  ' + x));
    if (arr.length > lim) console.log(`  ... 외 ${arr.length - lim}자리 (--full)`);
};

console.log(`검사: 챔피언 ${champN}명 / 슬롯 ${slotN}개   (DD ${ddFile})`);

show('① 문장이 비어 DD 툴팁으로 폴백된다', R.tplEmpty);
show('① 미해결 토큰이 문장에 그대로 남았다', R.tplToken, '화면에 {{...}} 나 @이름@ 이 찍힌다');
show('① 값이 ?/빈칸이라 문장이 통째로 폴백된다', R.tplQuestion);
show('② bin 에 회색 글씨가 있는데 화면에 없다', R.rulesMissing, 'keyTooltipExtendedBelowLine');
show('③ 레벨에 따라 변하는데 각주가 없다', R.noteMissing);
show('③ (레벨에 따라) 수와 각주 수가 안 맞는다', R.noteCount);
show('④ 자기 대상 스킬인데 투사체 속도가 있다', R.missileOnSelf,
    '이블린 R 같은 자리다. 타겟팅 타입이 Self / SelfAoe 면 투사체가 있을 수 없다');
show('④ 자기 대상 스킬인데 스킬 폭이 있다', R.widthOnSelf);
show('④ 돌진 속도가 있는데 bin 에 dash 이름이 없다', R.dashNoDash, '손 표로 넣은 자리라면 정상');

const total = Object.values(R).reduce((a, b) => a + b.length, 0);
console.log(`\n${'='.repeat(72)}`);
console.log(`합계 ${total}자리   ${total === 0 ? '— 새로 확인할 것 없음' : '★ 확인 필요'}`);
console.log('='.repeat(72));

console.log(`\n[확인 끝난 자리] ${knownOk.length}개 — 걸리는 게 정상이다. 값이 달라졌으면 다시 볼 것`);
if (!knownOk.length) console.log('  (없음)');
else knownOk.forEach(x => console.log('  ' + x));
const unusedOk = [...KNOWN_OK.keys()].filter(k => !knownOk.some(x => x.startsWith(k + ' ')));
if (unusedOk.length) {
    console.log(`\n  ※ KNOWN_OK 에 적혔는데 이번엔 안 걸린 자리: ${unusedOk.join(', ')}`);
    console.log('    (라이엇이 데이터를 고쳤거나, 우리가 값을 바꿨거나, 오타다)');
}
