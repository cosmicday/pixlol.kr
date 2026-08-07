// ============================================================
//  fill_values.js
//
//  CommunityDragon 의 bin.json 에서 실제 수치를 읽어
//  custom_values.js 의 "?" 자리를 채운다.
//
//  사용법:
//      node fill_values.js            <- 미리보기. 파일을 만들지도 고치지도 않는다.
//      node fill_values.js --write    <- public/custom_values.new.js 생성
//
//  PRESERVE 에 적힌 챔피언은 기존 내용을 그대로 둔다.
// ============================================================

const fs = require('fs');
const path = require('path');

const WRITE = process.argv.includes('--write');

const PRESERVE = ['Garen', 'Galio'];

const CD = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/ko_kr/v1';
const BIN = 'https://raw.communitydragon.org/latest/game/data/characters';

const PUBLIC_DIR = path.join(__dirname, 'public');
const SRC_VALUES = path.join(PUBLIC_DIR, 'custom_values.js');
const OUT_VALUES = path.join(PUBLIC_DIR, 'custom_values.new.js');

const DELAY = 150;

// 미리보기에서 자세히 보여줄 챔피언 (이미 아는 챔피언이라 눈으로 검산 가능)
const PREVIEW = ['Aatrox', 'Ahri', 'MonkeyKing', 'Locke'];

// ------------------------------------------------------------
// mStat 번호 -> 한글 스탯 이름
//   ★ 이 표는 아트록스 Q(mStat 2 = 총 공격력)만 실제로 확인했고
//     나머지는 추정이다. 미리보기에서 이상한 게 보이면 여기를 고칠 것.
//     모르는 번호가 나오면 "?" 로 두고 마지막에 목록으로 알려준다.
// ------------------------------------------------------------
const STAT_NAMES = {
    0: '주문력',
    1: '방어력',
    2: '총 공격력',
    3: '공격 속도',
    5: '스킬 가속',
    6: '치명타 확률',
    8: '마법 저항력',
    9: '이동 속도',
    11: '추가 공격력',
    12: '최대 체력',
    13: '추가 체력',
};

const unknownStats = new Map();   // 번호 -> 몇 번 나왔나
const unknownParts = new Map();   // 계산식 조각 종류 -> 몇 번 나왔나

// ------------------------------------------------------------

const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const get = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(String(res.status));
    return res.json();
};

// 소수점 지저분한 것 정리 (0.30000000000000004 -> 0.3)
const tidy = (n) => {
    const r = Math.round(n * 1000) / 1000;
    return Number.isInteger(r) ? String(r) : String(r);
};

// 레벨별 값 배열 -> 표시 문자열.
//   bin 의 values 는 7칸이고 0번은 쓰레기다. 실제 랭크는 1번부터.
const levelsToText = (values, maxRank, mult) => {
    if (!Array.isArray(values)) return null;
    const picked = values.slice(1, 1 + maxRank).map(v => tidy(v * mult));
    if (!picked.length) return null;
    return picked.every(v => v === picked[0]) ? picked[0] : picked.join(' / ');
};

const statName = (id) => {
    // mStat 이 0(주문력)이면 JSON 에서 필드가 통째로 빠진다. undefined 는 0 으로 본다.
    if (id === undefined || id === null) id = 0;
    if (STAT_NAMES[id] !== undefined) return STAT_NAMES[id];
    unknownStats.set(id, (unknownStats.get(id) || 0) + 1);
    return null;
};

// ------------------------------------------------------------
// 계산식 조각 하나를 문자열로
// ------------------------------------------------------------
function partToText(part, spell, maxRank, mult, depth = 0) {
    if (!part || depth > 4) return null;
    const type = part.__type || '';

    const dv = (name) => (spell.DataValues || []).find(d => d.name === name);

    switch (type) {
        case 'NamedDataValueCalculationPart': {
            const d = dv(part.mDataValue);
            return d ? levelsToText(d.values, maxRank, mult) : null;
        }

        case 'NumberCalculationPart':
            return tidy((part.mNumber || 0) * mult);

        case 'StatByNamedDataValueCalculationPart': {
            const d = dv(part.mDataValue);
            const s = statName(part.mStat);
            if (!d || s === null) return null;
            const ratio = levelsToText(d.values, maxRank, 100);
            return `${s}의 ${ratio}%`;
        }

        case 'StatByCoefficientCalculationPart': {
            const s = statName(part.mStat);
            if (s === null) return null;
            return `${s}의 ${tidy((part.mCoefficient || 0) * 100)}%`;
        }

        case 'ByCharLevelInterpolationCalculationPart': {
            const a = tidy((part.mStartValue || 0) * mult);
            const b = tidy((part.mEndValue || 0) * mult);
            return `${a} ~ ${b} (레벨에 따라)`;
        }

        case 'ByCharLevelBreakpointsCalculationPart': {
            let v = part.mLevel1Value || 0;
            (part.mBreakpoints || []).forEach(bp => { v += bp.mAdditionalBonusAtThisLevel || 0; });
            return `${tidy((part.mLevel1Value || 0) * mult)} ~ ${tidy(v * mult)} (레벨에 따라)`;
        }

        case 'BuffCounterByNamedDataValueCalculationPart': {
            const d = dv(part.mDataValue);
            return d ? `${levelsToText(d.values, maxRank, mult)} (중첩당)` : null;
        }

        case 'SumOfSubPartsCalculationPart': {
            const parts = (part.mSubparts || [])
                .map(p => partToText(p, spell, maxRank, mult, depth + 1))
                .filter(Boolean);
            if (!parts.length) return null;
            // 전부 단일 숫자면 그냥 더한다 (1 + 0.75 -> 1.75)
            if (parts.every(p => /^-?[\d.]+$/.test(p))) {
                return tidy(parts.reduce((a, b) => a + parseFloat(b), 0));
            }
            return parts.join(' + ');
        }

        case 'ProductOfSubPartsCalculationPart': {
            const a = partToText(part.mPart1, spell, maxRank, 1, depth + 1);
            const b = partToText(part.mPart2, spell, maxRank, 1, depth + 1);
            return (a && b) ? `${a} x ${b}` : null;
        }

        case 'EffectValueCalculationPart': {
            const idx = (part.mEffectIndex || 1) - 1;
            const ea = (spell.mEffectAmount || [])[idx];
            return (ea && ea.value) ? levelsToText(ea.value, maxRank, mult) : null;
        }

        case 'StatBySubPartCalculationPart': {
            const s2 = statName(part.mStat);
            const sub = partToText(part.mSubpart, spell, maxRank, 100, depth + 1);
            return (s2 !== null && sub !== null) ? `${s2}의 ${sub}%` : null;
        }

        case 'AbilityResourceByCoefficientCalculationPart':
            return `최대 마나의 ${tidy((part.mCoefficient || 0) * 100)}%`;

        case 'BuffCounterByCoefficientCalculationPart':
            return `${tidy((part.mCoefficient || 0) * mult)} (중첩당)`;

        case 'ByCharLevelFormulaCalculationPart': {
            const a = tidy((part.mValues && part.mValues[0] || 0) * mult);
            const b = tidy((part.mValues && part.mValues[part.mValues.length - 1] || 0) * mult);
            return `${a} ~ ${b} (레벨에 따라)`;
        }

        default:
            unknownParts.set(type, (unknownParts.get(type) || 0) + 1);
            return null;
    }
}

// mSpellCalculations 항목 하나 -> 문자열
function calcToText(calc, spell, maxRank, mult, depth = 0) {
    if (!calc || depth > 3) return null;

    // 다른 계산식을 배율만 바꿔 재사용하는 형태
    if (calc.mModifiedGameCalculation) {
        const base = (spell.mSpellCalculations || {})[calc.mModifiedGameCalculation];
        const inner = calcToText(base, spell, maxRank, mult, depth + 1);
        if (!inner) return null;
        const m = calc.mMultiplier ? partToText(calc.mMultiplier, spell, maxRank, 1, depth + 1) : null;
        return m ? `${inner} x ${m}` : inner;
    }

    const percent = calc.mDisplayAsPercent ? 100 : 1;

    // 계산식 전체에 곱해지는 배율 (예: 0.01)
    let selfMult = 1;
    if (calc.mMultiplier) {
        const mTxt = partToText(calc.mMultiplier, spell, maxRank, 1, depth + 1);
        if (mTxt !== null && /^-?[\d.]+$/.test(mTxt)) selfMult = parseFloat(mTxt);
    }

    const parts = (calc.mFormulaParts || [])
        .map(p => partToText(p, spell, maxRank, mult * percent * selfMult, depth + 1));

    if (!parts.length || parts.every(p => p === null)) return null;

    const base = parts[0];
    // 해석 못 한 계수 조각을 조용히 버리면 "계수 없는 반쪽 값"이 된다.
    // (?) 로 남겨서 미리보기에서 눈에 띄게 한다.
    const rest = parts.slice(1).map(p => p === null ? '(?)' : p);
    let out = base === null ? '?' : base;
    if (calc.mDisplayAsPercent) {
        // "(레벨에 따라)" 같은 꼬리표가 있으면 그 앞에 % 를 넣는다
        const tail = out.match(/\s*\(.*\)$/);
        out = tail ? out.slice(0, tail.index) + '%' + tail[0] : out + '%';
    }
    if (rest.length) out += ` (+ ${rest.join(' + ')})`;
    return out;
}

// 플레이스홀더 이름 하나를 해결
function resolve(name, spell, maxRank) {
    // @Name*100@ / @Name*-100@ 형태에서 배율을 떼어낸다
    let mult = 1;
    let clean = name.trim();
    const m = clean.match(/^(.+?)\s*\*\s*(-?[\d.]+)$/);
    if (m) { clean = m[1].trim(); mult = parseFloat(m[2]); }

    // 1) DataValues 에 직접 있나
    const d = (spell.DataValues || []).find(x => x.name === clean);
    if (d) {
        // 문장에 이미 % 가 붙어 있으므로 값에는 붙이지 않는다 (50%% 방지)
        return levelsToText(d.values, maxRank, mult);
    }

    // 2) mSpellCalculations 에 있나
    const calc = (spell.mSpellCalculations || {})[clean];
    if (calc) return calcToText(calc, spell, maxRank, mult);

    // 3) Effect2Amount 처럼 mEffectAmount 를 이름으로 부르는 경우
    const em = clean.match(/^Effect(\d+)Amount$/i);
    if (em && Array.isArray(spell.mEffectAmount)) {
        const ea = spell.mEffectAmount[parseInt(em[1]) - 1];
        if (ea && ea.value) {
            const t = levelsToText(ea.value, maxRank, mult);
            // 문장에 이미 % 가 붙어 있으므로 값에는 붙이지 않는다
            if (t !== null) return t;
        }
    }

    // 4) f1, f2 ... 도 같은 배열을 가리킨다
    const fm = clean.match(/^f(\d+)$/i);
    if (fm && Array.isArray(spell.mEffectAmount)) {
        const ea = spell.mEffectAmount[parseInt(fm[1]) - 1];
        if (ea && ea.value) return levelsToText(ea.value, maxRank, mult);
    }

    return null;
}

// ------------------------------------------------------------
// bin 에서 Q/W/E/R 스펠 객체를 정확히 찾는다.
//   CharacterRecord 의 spells 배열이 Q,W,E,R 순서를 보증한다.
// ------------------------------------------------------------
function getSpellsFromBin(bin, alias) {
    const rec = bin[`Characters/${alias}/CharacterRecords/Root`];
    const out = {};
    if (!rec) return out;

    const keys = ['Q', 'W', 'E', 'R'];
    (rec.spells || []).forEach((p, i) => {
        if (i >= 4) return;
        const obj = bin[p];
        if (obj && obj.mSpell) out[keys[i]] = obj.mSpell;
    });

    const pass = bin[rec.mCharacterPassiveSpell];
    if (pass && pass.mSpell) out.P = pass.mSpell;

    return out;
}

// ------------------------------------------------------------
// 기존 파일에서 블록 잘라내기 (build_champion_data.js 와 같은 방식)
// ------------------------------------------------------------
function extractBlock(source, alias) {
    const m = new RegExp(`"${alias}"\\s*:\\s*\\{`).exec(source);
    if (!m) return null;
    let i = m.index + m[0].length - 1, depth = 0, inStr = null, esc = false;
    for (; i < source.length; i++) {
        const ch = source[i];
        if (inStr) {
            if (esc) { esc = false; continue; }
            if (ch === '\\') { esc = true; continue; }
            if (ch === inStr) inStr = null;
            continue;
        }
        if (ch === '"' || ch === "'" || ch === '`') { inStr = ch; continue; }
        if (ch === '{') depth++;
        else if (ch === '}') { depth--; if (!depth) return source.slice(m.index, i + 1); }
    }
    return null;
}

const q = (s) => '"' + String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\r?\n/g, '\\n') + '"';

// ------------------------------------------------------------

async function main() {
    console.log(WRITE ? '[모드] 파일 생성' : '[모드] 미리보기 — 아무 파일도 건드리지 않습니다\n');

    const oldValues = fs.existsSync(SRC_VALUES) ? fs.readFileSync(SRC_VALUES, 'utf8') : '';
    const prelude = oldValues.indexOf('const customValues');
    const valuesPrelude = prelude === -1 ? '' : oldValues.slice(0, prelude);

    const summary = await get(`${CD}/champion-summary.json`);
    const seen = new Set();
    const champions = summary
        .filter(c => c.id > 0)
        .sort((a, b) => a.id - b.id)
        .filter(c => { if (seen.has(c.name)) return false; seen.add(c.name); return true; })
        .sort((a, b) => a.name.localeCompare(b.name, 'ko'));

    console.log(`챔피언 ${champions.length}명\n`);

    const entries = [];
    let total = 0, filled = 0;
    const binFails = [];
    const stillUnknown = [];
    const partial = [];

    for (let n = 0; n < champions.length; n++) {
        const c = champions[n];
        const alias = c.alias;

        if (PRESERVE.includes(alias)) {
            const b = extractBlock(oldValues, alias);
            if (b) entries.push(`    ${b}, // ${c.name} (직접 작성)`);
            continue;
        }

        let v1, bin;
        try { v1 = await get(`${CD}/champions/${c.id}.json`); }
        catch (e) { binFails.push(`${c.name} v1(${e.message})`); await sleep(DELAY); continue; }

        try {
            const low = alias.toLowerCase();
            bin = await get(`${BIN}/${low}/${low}.bin.json`);
        } catch (e) {
            binFails.push(`${c.name} bin(${e.message})`);
            await sleep(DELAY);
            continue;
        }

        const binSpells = getSpellsFromBin(bin, alias);
        if (!Object.keys(binSpells).length) binFails.push(`${c.name} CharacterRecord 없음`);

        const lines = [`        "P": { "cooldown": "-", "cost": "-" },`];
        const previewLines = [];
        const seenKey = new Set();

        for (const s of (v1.spells || [])) {
            const key = String(s.spellKey || '').toUpperCase();
            if (!['Q', 'W', 'E', 'R'].includes(key) || seenKey.has(key)) continue;
            seenKey.add(key);

            const desc = (s.dynamicDescription || '').replace(/@SpellModifierDescriptionAppend@/gi, '');
            const names = [...new Set([...desc.matchAll(/@([A-Za-z0-9_.*+\-/() ]+?)@/g)].map(x => x[1].trim()))];

            const maxRank = key === 'R' ? 3 : 5;
            const spell = binSpells[key];

            const pLines = names.map((name, i) => {
                total++;
                const val = spell ? resolve(name, spell, maxRank) : null;
                if (val === null) stillUnknown.push(`${c.name} ${key} / ${name}`);
                else if (String(val).includes('(?)')) partial.push(`${c.name} ${key} / ${name} = ${val}`);
                else filled++;
                previewLines.push(`      ${key} p${i + 1} (${name}) = ${val === null ? '?' : val}`);
                return `            "p${i + 1}": ${q(val === null ? '?' : val)}, // ${name}`;
            });

            // bin 의 최상위 필드 (castRange, mana, cooldownTime ...)
            // 이쪽은 DataValues 와 달리 0번부터 실제 1랭크다.
            const lv0 = (arr, r) => {
                if (!Array.isArray(arr) || !arr.length) return null;
                const p = arr.slice(0, r).map(tidy);
                return p.every(x => x === p[0]) ? p[0] : p.join(' / ');
            };
            const binRange = spell
                ? (lv0(spell.castRangeDisplayOverride, maxRank) || lv0(spell.castRange, maxRank))
                : null;
            const binMana = spell ? lv0(spell.mana, maxRank) : null;
            const castTime = (spell && typeof spell.mCastTime === 'number' && spell.mCastTime > 0)
                ? tidy(spell.mCastTime) : null;
            const missileSpeed = (spell && typeof spell.missileSpeed === 'number' && spell.missileSpeed > 0)
                ? tidy(spell.missileSpeed) : null;
            const lineWidth = (spell && typeof spell.mLineWidth === 'number' && spell.mLineWidth > 0)
                ? tidy(spell.mLineWidth) : null;

            const lv = (arr, r) => {
                if (!Array.isArray(arr)) return null;
                const p = arr.slice(0, r).map(tidy);
                return p.every(x => x === p[0]) ? p[0] : p.join(' / ');
            };
            const cd = lv(s.cooldownCoefficients, maxRank) || '-';
            const costJ = lv(s.costCoefficients, maxRank);
            let cost = (costJ && !/^0( \/ 0)*$/.test(costJ)) ? costJ : '';
            if (!cost) {
                if (binMana && !/^0( \/ 0)*$/.test(binMana)) cost = binMana;
                else if (/없음/.test(s.cost || '')) cost = '-';
            }
            // 사거리는 클라이언트 표시값(castRangeDisplayOverride)을 우선한다
            const v1Range = lv(s.range, maxRank);
            const rng = (binRange && !/^0( \/ 0)*$/.test(binRange)) ? binRange : v1Range;
            const hasRange = rng && !/^0( \/ 0)*$/.test(rng);

            lines.push(`        "${key}": {`);
            if (pLines.length) lines.push(pLines.join('\n'));
            lines.push(`            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)`);
            lines.push(`            "v2": "",`);
            lines.push(`            "cooldown": ${q(cd)},`);
            lines.push(`            "cost": ${q(cost)},`);
            const statRows = [];
            if (hasRange) statRows.push(`                "사거리": ${q(rng)}`);
            if (castTime) statRows.push(`                "시전시간": ${q(castTime)}`);
            if (missileSpeed) statRows.push(`                "투사체 속도": ${q(missileSpeed)}`);
            if (lineWidth) statRows.push(`                "스킬 폭": ${q(lineWidth)}`);
            if (statRows.length) lines.push(`            "stats": {\n${statRows.join(',\n')}\n            }`);
            // 마지막 항목 뒤 쉼표 제거
            const last = lines[lines.length - 1];
            if (last.endsWith(',') && !last.endsWith('},')) lines[lines.length - 1] = last.slice(0, -1);
            lines.push(`        },`);
        }

        entries.push(`    "${alias}": { // ${c.name}\n${lines.join('\n')}\n    },`);

        if (PREVIEW.includes(alias)) {
            console.log(`--- ${c.name} (${alias}) ---`);
            previewLines.forEach(l => console.log(l));
            console.log('');
        } else if (n % 20 === 0) {
            console.log(`  (${n + 1}/${champions.length}) ${c.name}`);
        }

        await sleep(DELAY);
    }

    console.log('\n' + '='.repeat(60));
    console.log(`완전히 채워짐: ${filled}/${total} (${total ? Math.round(filled / total * 100) : 0}%)`);
    console.log(`계수 일부 미해결: ${partial.length}개`);
    console.log(`아예 못 채움: ${stillUnknown.length}개`);

    if (unknownStats.size) {
        console.log('\n[모르는 스탯 번호] STAT_NAMES 에 추가 필요:');
        [...unknownStats.entries()].sort((a, b) => b[1] - a[1])
            .forEach(([id, n]) => console.log(`  mStat ${id}  (${n}회)`));
    }
    if (unknownParts.size) {
        console.log('\n[처리 못 한 계산식 종류]:');
        [...unknownParts.entries()].sort((a, b) => b[1] - a[1])
            .forEach(([t, n]) => console.log(`  ${t}  (${n}회)`));
    }
    if (binFails.length) {
        console.log(`\n[bin 로드 실패] ${binFails.length}건: ${binFails.slice(0, 15).join(', ')}`);
    }
    if (partial.length) {
        console.log(`\n[계수가 일부 빠진 값] ${partial.length}개 (앞 15개):`);
        partial.slice(0, 15).forEach(x => console.log(`  ${x}`));
    }
    if (stillUnknown.length) {
        console.log(`\n[못 채운 값] ${stillUnknown.length}개 (앞 20개):`);
        stillUnknown.slice(0, 20).forEach(x => console.log(`  ${x}`));
    }

    if (WRITE) {
        fs.writeFileSync(OUT_VALUES,
            valuesPrelude + `const customValues = {\n${entries.join('\n')}\n};\n`, 'utf8');
        console.log(`\n생성됨: ${OUT_VALUES}`);
        console.log('확인한 뒤 custom_values.js 로 이름을 바꾸세요.');
    } else {
        console.log('\n미리보기였습니다. 결과가 괜찮으면 --write 를 붙여 다시 실행하세요.');
    }
}

main().catch(e => { console.error('실패:', e); process.exit(1); });