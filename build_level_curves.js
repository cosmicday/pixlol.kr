// ============================================================
// 레벨 1~18 곡선 뽑기
// ------------------------------------------------------------
//  두 가지를 만든다.
//   1) 스킬의 "챔피언 레벨에 따라 변하는 값" 곡선  -> level_curves.json
//      (사이트에 "A ~ B (레벨에 따라)" 로 나가는 자리들의 중간값 전부)
//   2) 챔피언 기본 스탯 곡선                      -> champion_stats_by_level.json
//
//  ★ 성장 공식
//     라이엇은 레벨 성장을 선형이 아니라 아래 곡선으로 준다.
//        g(N) = (N-1) x (0.7025 + 0.0175 x (N-1))
//     g(1)=0, g(18)=17 이라 **양 끝은 선형과 같고 중간만 다르다.**
//     그래서 지금까지 양 끝만 찍던 사이트에서는 티가 안 났다.
//     그래프를 그리면 중간이 달라지므로 여기서는 반드시 적용한다.
//
//  ★ 스킬 쪽 조각 종류 (bin 전수 조사 결과 3종 + 해시 변종)
//     - ByCharLevelInterpolation : mStartValue ~ mEndValue
//         mScaleByStatProgressionMultiplier 가 true 면 g(N) 곡선, 아니면 직선
//     - ByCharLevelBreakpoints   : 레벨1 값 + 레벨당 증가분, 중간에 증가분이 바뀜 (구간 선형)
//     - ByCharLevelFormula       : 31칸 배열, **인덱스 = 레벨** (2026-08-11 정정분)
//     - {4ce08984}/{b22609db}    : Breakpoints 의 "값 대신 DataValue 이름" 변종
//     - {ee18a47b}               : 레벨1/레벨18 DataValue 이름 두 개짜리 변종
//
//  사용:  node build_level_curves.js [--write]
//         --write 없으면 요약만 찍고 파일은 안 만든다.
// ============================================================

const fs = require('fs');
const path = require('path');

const WRITE = process.argv.includes('--write');
const CACHE_BIN = path.join(__dirname, '.cache', 'bin');
const CACHE_DIR = path.join(__dirname, '.cache');
const DD_VER = process.env.DD_VER || '16.16.1';

// ------------------------------------------------------------
// 성장 곡선
// ------------------------------------------------------------
const growth = (n) => (n - 1) * (0.7025 + 0.0175 * (n - 1));   // g(1)=0, g(18)=17
const LEVELS = Array.from({ length: 18 }, (_, i) => i + 1);
const round = (x) => Math.round(x * 1000) / 1000;

// ------------------------------------------------------------
// 해시 필드 이름 (CLAUDE.md 에 정리된 것 그대로)
// ------------------------------------------------------------
const fnv1a = (s) => {
    let h = 0x811c9dc5;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
    return (h >>> 0).toString(16).padStart(8, '0');
};
const hk = (name) => `{${fnv1a(String(name).toLowerCase())}}`;
const fld = (o, name) => {
    if (!o || typeof o !== 'object') return undefined;
    const h = o[hk(name)];
    return h !== undefined ? h : o[name];
};

// ------------------------------------------------------------
// 스펠에서 DataValue 를 이름으로 찾는다. 배열 0번은 쓰레기라 1번부터.
// ------------------------------------------------------------
const dvNumber = (spell, name) => {
    if (typeof name !== 'string') return null;
    const list = spell.DataValues || spell.mDataValues || [];
    const d = list.find(x => String(x.name || x.mName || '').toLowerCase() === name.toLowerCase());
    if (!d) return null;
    const v = d.values || d.mValues || [];
    if (!v.length) return null;
    return v.length > 1 ? v[1] : v[0];
};

// ------------------------------------------------------------
// 조각 하나 -> 레벨 1..18 배열. 레벨 스케일링이 아니면 null.
// ------------------------------------------------------------
function curveOf(part, spell) {
    if (!part || typeof part !== 'object') return null;
    const t = String(part.__type || '');

    // 1) 보간: 시작값 ~ 끝값
    if (t.indexOf('ByCharLevelInterpolation') !== -1) {
        const a = part.mStartValue || 0, b = part.mEndValue || 0;
        const curved = part.mScaleByStatProgressionMultiplier === true;
        return {
            kind: curved ? 'interpolation(성장곡선)' : 'interpolation(직선)',
            values: LEVELS.map(n => round(a + (b - a) * (curved ? growth(n) / 17 : (n - 1) / 17)))
        };
    }

    // 1-b) 보간의 "값 대신 DataValue 이름" 변종 ({ee18a47b})
    //      필드는 StartDataValue / EndDataValue 다 (FNV 로 역추적).
    {
        const sName = fld(part, 'StartDataValue'), eName = fld(part, 'EndDataValue');
        if (typeof sName === 'string' && typeof eName === 'string') {
            const a = dvNumber(spell, sName), b = dvNumber(spell, eName);
            if (a !== null && b !== null) {
                return {
                    kind: 'interpolation(DataValue)',
                    values: LEVELS.map(n => round(a + (b - a) * (n - 1) / 17))
                };
            }
        }
    }

    // 2) 31칸 배열: 인덱스 = 레벨
    if (t.indexOf('ByCharLevelFormula') !== -1) {
        const vals = part.values || part.mValues;
        if (!Array.isArray(vals) || vals.length < 19) return null;
        return { kind: 'formula(배열)', values: LEVELS.map(n => round(vals[n])) };
    }

    // 3) 구간 선형 (숫자판 / DataValue 이름판 둘 다)
    const l1Name = fld(part, 'Level1DataValue');
    const isNamed = typeof l1Name === 'string';
    const hasNumeric = t.indexOf('ByCharLevelBreakpoints') !== -1;
    if (!isNamed && !hasNumeric) return null;

    let base, per, bps;
    if (isNamed) {
        base = dvNumber(spell, l1Name);
        if (base === null) return null;
        const perName = fld(part, 'BonusPerLevelDataValue');
        const initName = fld(part, 'InitialBonusPerLevelDataValue');
        per = dvNumber(spell, perName !== undefined ? perName : initName) || 0;
        const raw = fld(part, 'DataValueBreakpoints');
        bps = Array.isArray(raw) ? raw : [];
    } else {
        base = part.mLevel1Value || 0;
        per = part.mInitialBonusPerLevel || 0;
        bps = Array.isArray(part.mBreakpoints) ? part.mBreakpoints : [];
    }
    bps = [...bps].sort((a, b) => ((a.level !== undefined ? a.level : a.mLevel) || 0)
        - ((b.level !== undefined ? b.level : b.mLevel) || 0));

    const out = [round(base)];
    let v = base;
    for (let n = 2; n <= 18; n++) {
        const bp = bps.find(x => ((x.level !== undefined ? x.level : x.mLevel) || 0) === n);
        if (bp) {
            // ★ 생략 = 0. 필드가 없는 Breakpoint 는 "이 레벨부터 성장 정지" 라는 뜻이다.
            const pv = isNamed ? fld(bp, 'BonusPerLevelAtAndAfterDataValue') : bp.mBonusPerLevelAtAndAfter;
            const av = isNamed ? fld(bp, 'AdditionalBonusAtThisLevelDataValue') : bp.mAdditionalBonusAtThisLevel;
            per = isNamed ? (dvNumber(spell, pv) || 0) : (pv !== undefined ? pv : 0);
            v += isNamed ? (dvNumber(spell, av) || 0) : (av || 0);
        }
        v += per;
        out.push(round(v));
    }
    return { kind: isNamed ? 'breakpoints(DataValue)' : 'breakpoints', values: out };
}

// ------------------------------------------------------------
// 1) 스킬 곡선 모으기
// ------------------------------------------------------------
function collectSkillCurves() {
    const result = {};
    let nParts = 0, nSpells = 0;

    for (const file of fs.readdirSync(CACHE_BIN)) {
        if (!file.endsWith('.json')) continue;
        const alias = file.replace('.json', '');
        let bin;
        try { bin = JSON.parse(fs.readFileSync(path.join(CACHE_BIN, file), 'utf8')); }
        catch (e) { continue; }

        // 스킬 슬롯 순서: mAbilities = [Q, W, E, R, Passive...]
        const rootKey = Object.keys(bin).find(k => /CharacterRecords\/Root$/i.test(k));
        const root = rootKey ? bin[rootKey] : null;
        const slotOf = {};
        if (root) {
            const ab = Array.isArray(root.mAbilities) ? root.mAbilities : [];
            ['Q', 'W', 'E', 'R'].forEach((s, i) => { if (ab[i]) slotOf[ab[i]] = s; });
            if (root.mCharacterPassiveSpell) slotOf[String(root.mCharacterPassiveSpell).replace(/\/[^/]+$/, '')] = 'P';
        }
        // ★ 한 어빌리티 밑에 스펠 객체가 여럿이다.
        //   아칼리 P 는 AkaliP(35~182, 사이트·위키 값) 말고도 AkaliPWeapon / AkaliPZoneGround(39~180)가 있어서
        //   나중 것이 덮어쓰면 값이 통째로 달라진다. 어빌리티의 mRootSpell 을 정본으로 본다.
        const rootSpellOf = {};
        for (const k of Object.keys(bin)) {
            const rs = bin[k] && bin[k].mRootSpell;
            if (typeof rs === 'string') rootSpellOf[k] = rs;
        }

        for (const key of Object.keys(bin)) {
            const obj = bin[key];
            const spell = obj && obj.mSpell;
            if (!spell || !spell.mSpellCalculations) continue;
            nSpells++;
            const abilityPath = key.replace(/\/[^/]+$/, '');
            const slot = slotOf[abilityPath] || '?';
            const spellName = key.split('/').pop();

            for (const calcName of Object.keys(spell.mSpellCalculations)) {
                // ★ 레벨 조각이 mFormulaParts 바로 밑에만 있는 게 아니다.
                //   그레이브즈 P 는 mFormulaParts[0].mSubpart 안에 들어 있었다.
                //   계산식 통째로 재귀해서 찾아야 한다.
                const found = [];
                (function dig(node, path) {
                    if (!node || typeof node !== 'object') return;
                    if (Array.isArray(node)) { node.forEach((v, i) => dig(v, `${path}[${i}]`)); return; }
                    const c = curveOf(node, spell);
                    if (c && !c.values.every(v => v === c.values[0])) { found.push({ c, path }); return; }
                    for (const k of Object.keys(node)) dig(node[k], path ? `${path}.${k}` : k);
                })(spell.mSpellCalculations[calcName], '');

                const isRoot = rootSpellOf[abilityPath] === key;
                found.forEach((f, i) => {
                    result[alias] = result[alias] || {};
                    result[alias][slot] = result[alias][slot] || {};
                    const label = found.length > 1 ? `${calcName}#${i}` : calcName;
                    const prev = result[alias][slot][label];
                    // 정본(mRootSpell)이 이미 들어와 있으면 곁가지 스펠이 덮어쓰지 못하게 한다
                    if (prev && prev._root && !isRoot) return;
                    if (!prev) nParts++;
                    result[alias][slot][label] = {
                        spell: spellName, kind: f.c.kind, 위치: f.path, _root: isRoot,
                        min: f.c.values[0], max: f.c.values[17], values: f.c.values
                    };
                });
            }

            // ★ 다른 계산식을 참조만 하는 파생 계산식(mModifiedGameCalculation / mSpellCalculationKey).
            //   그레이브즈 P MultiBulletDamage 처럼 "본체 x 0.333" 인 것들이라
            //   본체 곡선에 배율만 실으면 된다. 배율을 숫자로 못 읽으면 배율 없이 곡선만 남긴다.
            const mine = (result[alias] || {})[slot] || {};
            for (const calcName of Object.keys(spell.mSpellCalculations)) {
                if (mine[calcName]) continue;
                const calc = spell.mSpellCalculations[calcName];
                const refName = calc.mModifiedGameCalculation || calc.mSpellCalculationKey;
                if (typeof refName !== 'string') continue;
                const base = mine[refName] || Object.keys(mine).map(k => mine[k])
                    .find(v => v && v._calc === refName);
                if (!base) continue;
                let k = 1;
                const mm = calc.mMultiplier;
                if (mm && typeof mm === 'object') {
                    if (typeof mm.mNumber === 'number') k = mm.mNumber;
                    else if (typeof mm.mDataValue === 'string') {
                        const v = dvNumber(spell, mm.mDataValue);
                        if (v !== null) k = v;
                    }
                }
                nParts++;
                result[alias][slot][calcName] = {
                    spell: spellName, kind: base.kind + `(참조 ${refName}${k !== 1 ? ' x' + k : ''})`,
                    위치: 'ref:' + refName,
                    min: round(base.min * k), max: round(base.max * k),
                    values: base.values.map(v => round(v * k))
                };
            }
        }
    }
    return { result, nParts, nSpells };
}

// ------------------------------------------------------------
// 2) 챔피언 스탯 곡선
// ------------------------------------------------------------
async function fetchDD() {
    const cacheFile = path.join(CACHE_DIR, `dd_championFull_${DD_VER}.json`);
    if (fs.existsSync(cacheFile)) return JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
    const url = `https://ddragon.leagueoflegends.com/cdn/${DD_VER}/data/ko_KR/championFull.json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Data Dragon 응답 ' + res.status + ' — DD_VER 확인 필요');
    const json = await res.json();
    fs.mkdirSync(CACHE_DIR, { recursive: true });
    fs.writeFileSync(cacheFile, JSON.stringify(json));
    return json;
}

// ★ 스탯은 bin 을 정본으로 쓴다.
//   Data Dragon 의 `attackdamageperlevel` 이 **233명 전부 0** 으로 깨져 있다 (16.15.1 확인).
//   가렌은 실제로 4.5 다. DD 만 믿으면 공격력 곡선이 통째로 평평해진다.
//   나머지 필드는 DD 와 bin 이 일치하므로 아래에서 교차검증만 한다.
//   (DD 의 재생 수치는 5초당, bin 은 초당이다. 여기서는 bin 기준 = 초당.)
// 자원 이름은 Data Dragon 의 partype 를 쓴다.
//   bin 의 arType 은 숫자라 뜻을 추측하게 되는데, DD 는 "마나/기력/분노/투지/기류..." 처럼
//   현지화된 이름을 그대로 준다. 추측으로 표를 만들면 안 된다 (CLAUDE.md 규칙).
let PARTYPE = {};   // DD id -> 자원 이름
let DD_STATS = {};  // DD id -> stats (bin 에 필드가 아예 없을 때의 폴백)

// ★ bin 의 "필드 없음" 은 0 이 아니라 **라이엇 기본값** 이다 (2026-08-12).
//   `baseStaticHPRegenModifiable` 이 없는 8명(케일·마오카이·밀리오·모데카이저·
//   누누·라칸·유미·자크)에게 DD 는 전부 `hpregen 5`(= 초당 1.0)를 준다.
//   0 으로 읽으면 **그 8명의 체력 재생이 통째로 죽고**, 스탯 탭 y 축 바닥까지
//   0 으로 끌려 내려가 다른 챔피언 곡선도 같이 납작해진다.
//   ★ **진짜 0 인 챔피언은 bin 에 `0` 이라고 명시돼 있다** (브라이어 — 체력 재생이
//     없는 게 스킬 설명에도 적힌 챔피언이다). 생략과 명시는 이렇게 구분된다.
//   DD 의 재생 수치는 5초당이고 우리는 초당이라 5로 나눈다.
const pick = (a, b) => (a !== undefined ? a : b);
const ddStat = (ddId, key, div) => {
    const s = DD_STATS[ddId];
    if (!s || s[key] === undefined || s[key] === null) return undefined;
    return div ? s[key] / div : s[key];
};
// ★ fld 를 거쳐 해시 키와 실명을 **둘 다** 본다 (2026-08-12).
//   예전엔 키 하나만 봐서 호출부가 hk('mrPerLevel') 로 해시를 직접 만들어 넘겼는데,
//   16.16 패치부터 CD 가 이 이름을 실명으로 풀어 주면서 해시 키가 사라졌다.
//   그 결과 **173명 전원의 마법 저항력 성장이 0 이 됐다** (기본값만 남아 수평선).
//   자원(arBase/arPerLevel 등) 4자리도 같은 구조라 언제든 같은 사고가 난다.
const mf = (o, k) => {
    const v = fld(o, k);
    if (v === undefined || v === null) return undefined;
    return (typeof v === 'object') ? v.baseValue : v;
};

function statCurvesFromBin(root, ddId) {
    const par = root.primaryAbilityResource || {};
    const grow = (base, per) => (base === undefined && per === undefined) ? undefined
        : LEVELS.map(n => round((base || 0) + (per || 0) * growth(n)));

    const out = {};
    out['체력'] = grow(mf(root, 'baseHPModifiable'), mf(root, 'hpPerLevelModifiable'));
    // ★ 이 줄만 DD 폴백이 걸려 있다. bin 에 필드가 없는 8명 때문이다 (위 ddStat 주석 참고)
    out['체력 재생(초당)'] = grow(
        pick(mf(root, 'baseStaticHPRegenModifiable'), ddStat(ddId, 'hpregen', 5)),
        pick(mf(root, 'hpRegenPerLevelModifiable'), ddStat(ddId, 'hpregenperlevel', 5)));
    out['공격력'] = grow(mf(root, 'baseDamageModifiable'), mf(root, 'damagePerLevelModifiable'));
    out['방어력'] = grow(mf(root, 'baseArmorModifiable'), mf(root, 'armorPerLevelModifiable'));
    out['마법 저항력'] = grow(mf(root, 'baseMR'), mf(root, 'mrPerLevel'));

    const arBase = mf(par, 'arBaseModifiable'), arPer = mf(par, 'arPerLevelModifiable');
    const arReg = mf(par, 'arBaseStaticRegenModifiable'), arRegPer = mf(par, 'arRegenPerLevelModifiable');
    // 자원 이름은 DD partype. 없으면 arType 숫자를 그대로 남겨 추측하지 않는다.
    const resName = PARTYPE[ddId] || (par.arType === undefined ? '없음' : ('자원' + par.arType));
    if (arBase !== undefined) out[resName] = grow(arBase, arPer);
    if (arReg !== undefined) out[resName + ' 재생(초당)'] = grow(arReg, arRegPer);

    // 공격 속도만 식이 다르다: 기본값 x (1 + 레벨당% x g(N))
    const as = mf(root, 'attackSpeedModifiable'), asP = mf(root, 'attackSpeedPerLevelModifiable');
    if (as !== undefined) out['공격 속도'] = LEVELS.map(n => round(as * (1 + ((asP || 0) / 100) * growth(n))));

    // 레벨과 무관 (그래프 대상 아님)
    out['_고정'] = {
        '이동 속도': mf(root, 'baseMoveSpeedModifiable'),
        '사거리': mf(root, 'attackRangeModifiable'),
        '공격 속도 비율': mf(root, 'attackSpeedRatioModifiable'),
        '치명타 피해 배수': root.critDamageMultiplier,
        '자원 종류': resName,
    };
    for (const k of Object.keys(out)) if (out[k] === undefined) delete out[k];
    return out;
}

// ------------------------------------------------------------
(async function main() {
    console.log('== 1) 스킬 레벨 곡선 ==');
    const { result: skills, nParts, nSpells } = collectSkillCurves();
    const champWith = Object.keys(skills).length;
    console.log(`  스펠 ${nSpells}개를 훑어 레벨 스케일링 ${nParts}자리 / 챔피언 ${champWith}명`);
    const byKind = {};
    for (const c in skills) for (const s in skills[c]) for (const n in skills[c][s]) {
        const k = skills[c][s][n].kind; byKind[k] = (byKind[k] || 0) + 1;
    }
    console.log('  종류별:', byKind);

    console.log('== 2) 챔피언 스탯 곡선 (bin 기준) ==');
    const dd = await fetchDD();
    for (const id of Object.keys(dd.data)) PARTYPE[id] = dd.data[id].partype;
    for (const id of Object.keys(dd.data)) DD_STATS[id] = dd.data[id].stats;
    const ddIdOf = {};
    for (const id of Object.keys(dd.data)) ddIdOf[id.toLowerCase()] = id;

    const stats = {};
    for (const file of fs.readdirSync(CACHE_BIN)) {
        if (!file.endsWith('.json')) continue;
        const alias = file.replace('.json', '');
        let bin; try { bin = JSON.parse(fs.readFileSync(path.join(CACHE_BIN, file), 'utf8')); } catch (e) { continue; }
        const rk = Object.keys(bin).find(k => /CharacterRecords\/Root$/i.test(k));
        if (!rk) continue;
        // ★ 출력 키는 반드시 DD 철자여야 한다 (app.js 가 champ.id 로 찾는다).
        const id = ddIdOf[alias] || alias;
        stats[id] = { 이름: (dd.data[id] || {}).name || id, 스탯: statCurvesFromBin(bin[rk], id) };
    }
    console.log(`  챔피언 ${Object.keys(stats).length}명 x 18레벨`);

    // bin 과 교차검증 (겹치는 스탯만)
    const CHECK = [['hp', 'baseHPModifiable'], ['hpperlevel', 'hpPerLevelModifiable'],
    ['armor', 'baseArmorModifiable'], ['armorperlevel', 'armorPerLevelModifiable'],
    ['attackdamage', 'baseDamageModifiable'], ['attackdamageperlevel', 'damagePerLevelModifiable'],
    ['spellblock', 'baseMR'], ['spellblockperlevel', 'mrPerLevel'],
    ['movespeed', 'baseMoveSpeedModifiable'], ['attackrange', 'attackRangeModifiable']];
    let checked = 0, diff = [];
    for (const file of fs.readdirSync(CACHE_BIN)) {
        if (!file.endsWith('.json')) continue;
        let bin; try { bin = JSON.parse(fs.readFileSync(path.join(CACHE_BIN, file), 'utf8')); } catch (e) { continue; }
        const rk = Object.keys(bin).find(k => /CharacterRecords\/Root$/i.test(k));
        if (!rk) continue;
        const root = bin[rk];
        const ddId = Object.keys(dd.data).find(x => x.toLowerCase() === file.replace('.json', ''));
        if (!ddId) continue;
        const st = dd.data[ddId].stats;
        for (const [ddF, binF] of CHECK) {
            const raw = root[binF];
            const bv = (raw && typeof raw === 'object') ? raw.baseValue : raw;
            if (bv === undefined) continue;
            checked++;
            if (Math.abs(bv - (st[ddF] || 0)) > 0.02) diff.push(`${ddId}.${ddF}: DD ${st[ddF]} vs bin ${round(bv)}`);
        }
    }
    console.log(`  bin 교차검증 ${checked}자리 중 불일치 ${diff.length}건`);
    diff.slice(0, 10).forEach(d => console.log('    ' + d));

    if (!WRITE) { console.log('\n미리보기였습니다. --write 를 붙이면 파일을 만듭니다.'); return; }
    fs.writeFileSync('level_curves.json', JSON.stringify(skills, null, 1));
    fs.writeFileSync('champion_stats_by_level.json', JSON.stringify(stats, null, 1));
    console.log('\n생성: level_curves.json, champion_stats_by_level.json');
})();
