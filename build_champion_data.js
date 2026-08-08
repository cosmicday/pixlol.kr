// ============================================================
//  build_champion_data.js
//
//  CommunityDragon 에서 챔피언 스킬 데이터를 받아
//  custom_templates.js / custom_values.js 를 새로 만든다.
//
//  사용법 (프로젝트 루트에서):
//      node build_champion_data.js
//
//  - Node 18 이상 필요 (fetch 내장)
//  - 기존 public/custom_templates.js, public/custom_values.js 를 읽어서
//    PRESERVE 목록에 있는 챔피언은 원문 그대로 옮겨 적는다.
//  - 결과는 public/custom_templates.new.js, public/custom_values.new.js 로 나온다.
//    확인한 뒤 직접 덮어쓸 것. (원본을 바로 건드리지 않는다)
// ============================================================

const fs = require('fs');
const path = require('path');
const { loadStringTable, getPassiveTooltip } = require('./stringtable');

// ------------------------------------------------------------
// 설정
// ------------------------------------------------------------

// 랭크 수가 표준(일반 5 / 궁 3)에서 벗어나는 챔피언.
//   ★ fill_values.js 의 MAX_RANK 와 반드시 같아야 한다.
//     어긋나면 쿨타임·소모값 칸 수와 수치 칸 수가 서로 안 맞는다.
//   자동 판별할 근거가 없어서 표로 박는다 (bin 에 최대 레벨 필드가 없고
//   CD 의 계수 배열은 전부 길이 6 으로 패딩돼 있다).
const MAX_RANK = {
    Udyr:    { Q: 6, W: 6, E: 6, R: 6 },   // 궁이 따로 없어 4개 전부 6랭크
    Jayce:   { Q: 6, W: 6, E: 6, R: 1 },   // 1레벨에 R(변신) 공짜
    Nidalee: { Q: 5, W: 5, E: 5, R: 4 },   // 1레벨에 R 공짜
    Karma:   { Q: 5, W: 5, E: 5, R: 4 },   // 〃
    Elise:   { Q: 5, W: 5, E: 5, R: 4 },   // 〃
    Yuumi:   { Q: 6, W: 5, E: 5, R: 3 },   // 1레벨에 W 공짜라 Q 만 6랭크
};
const rankOf = (alias, key) =>
    (MAX_RANK[alias] && MAX_RANK[alias][key]) || (key === 'R' ? 3 : 5);

// 폼이 두 개인 챔피언의 "두 번째 폼" 스킬. bin 의 스펠 객체 이름으로 적는다.
//   ★ 자동 판별이 안 된다. 아이콘 파일명 규칙이 챔피언마다 제각각이다:
//     니달리 Nidalee_Q2 / 엘리스 EliseHumanQ·EliseSpiderQ /
//     제이스 JayceQ_Melee·JayceQ_Ranged / 나르 Gnar_Q·GnarBig_Q
//   `_Q2` 로 훑어봤더니 재시전·핸들러·래퍼까지 34명이 걸려서 쓸 수 없었다.
//   쉬바나는 용 폼이 별도 스펠 객체가 아니라 기존 스킬이 강화되는 구조라 여기 없다.
const FORM2 = {
    Nidalee: { label: '쿠거 형태',   Q: 'Takedown',         W: 'Pounce',           E: 'Swipe' },
    Elise:   { label: '거미 형태',   Q: 'EliseSpiderQCast', W: 'EliseSpiderW',     E: 'EliseSpiderE' },
    Jayce:   { label: '대포 형태', Q: 'JayceShockBlast',  W: 'JayceHyperCharge', E: 'JayceAccelerationGate', R: 'JayceStanceGtH' },
    Gnar:    { label: '메가 나르',   Q: 'GnarBigQ',         W: 'GnarBigW',         E: 'GnarBigE' },
    // 렉사이는 굴 파기 상태에서 Q/W/E 가 통째로 바뀐다.
    //   ★ 이쪽 스펠 객체는 stringtable 이름이 빈 문자열이다. 이름은 app.js 에서
    //     Data Dragon 의 합친 이름("여왕의 진노 / 먹잇감 추적") 뒷조각으로 채운다.
    RekSai:  { label: '굴 파기',     Q: 'RekSaiQBurrowed',  W: 'RekSaiWBurrowed',  E: 'RekSaiEBurrowed' },
    // 클레드는 스카를에서 내리면 Q 가 "빵야!" 로 바뀐다. (W·E·R 은 그대로)
    Kled:    { label: '스카를 하차', Q: 'KledRiderQ' },
};

// bin 에서 스펠 객체를 이름으로 찾는다. 경로가 표준형이 아닐 수 있어 뒤에서도 훑는다.
function findSpellObj(bin, alias, objName) {
    const direct = bin[`Characters/${alias}/Spells/${objName}`];
    if (direct && direct.mSpell) return direct;
    for (const k of Object.keys(bin)) {
        if (k.endsWith('/' + objName) && bin[k] && bin[k].mSpell) return bin[k];
    }
    return null;
}

// 스펠 객체 안에 박혀 있는 아이콘 경로(ASSETS/....dds)를 CD 의 png URL 로 바꾼다.
const iconUrlOf = (obj) => {
    const m = JSON.stringify(obj).match(/"(ASSETS\/[^"]*Icons2D\/[^"]+\.dds)"/i);
    return m
        ? 'https://raw.communitydragon.org/latest/game/' + m[1].toLowerCase().replace(/\.dds$/, '.png')
        : null;
};

// 손으로 이미 작성한 챔피언. 여기 적힌 이름은 기존 파일 내용을 그대로 유지한다.
//
//  ★ 2026-08-08 비웠다. 가렌·갈리오가 유일한 항목이었는데 {pN} 체계 이전의
//     옛 형식이라 다른 챔피언과 구조가 달랐다. 이제 전부 CD 에서 받아온다.
//     수치 쪽 손작업(v1/v2)은 fill_values.js 의 extractVV() 가 따로 물려준다.
const PRESERVE = [];

const PUBLIC_DIR = path.join(__dirname, 'public');
const SRC_TEMPLATES = path.join(PUBLIC_DIR, 'custom_templates.js');
const SRC_VALUES = path.join(PUBLIC_DIR, 'custom_values.js');
const OUT_TEMPLATES = path.join(PUBLIC_DIR, 'custom_templates.new.js');
const OUT_VALUES = path.join(PUBLIC_DIR, 'custom_values.new.js');

const CD_BASE = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/ko_kr/v1';

// 패시브 툴팁 키를 읽으려면 bin 이 필요하다. (stringtable.js 주석 참고)
const BIN = 'https://raw.communitydragon.org/latest/game/data/characters';

// 요청 간격(ms). 너무 빠르면 CD가 막을 수 있다.
const DELAY = 120;

// app.js 의 <style> 블록에 이미 정의된 태그들.
// 여기 없는 태그가 나오면 마지막에 경고로 알려준다.
const KNOWN_TAGS = new Set([
    'maintext', 'stats',
    'magicdamage', 'physicaldamage', 'truedamage',
    'healing', 'heal', 'shield',
    'scaleap', 'scalead', 'scalehealth', 'scalearmor', 'scalemr', 'scalemana',
    'keywordmajor', 'keywordstealth',
    'attention', 'rules', 'speed', 'status',
    'active', 'passive',
    'br', 'li', 'ul', 'span', 'sup',
    // 아래는 CD 툴팁에서 나와 app.js <style> 에 추가한 태그들
    'spellname', 'keyword', 'keywordname', 'recast', 'toggle', 'onhit',
    'tap', 'hold', 'charge', 'release', 'evolve', 'scalelevel',
    'gold', 'armorpen', 'attackspeed', 'lifesteal', 'omnivamp',
    'danger', 'specialrules', 'slow', 'b', 'i', 'font'
]);

// CD 태그 -> app.js 가 아는 태그로 바꿔치기
const TAG_RENAME = {
    'spellpassive': 'passive',
    'spellactive': 'active'
};

// ------------------------------------------------------------
// 유틸
// ------------------------------------------------------------

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function getJson(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    return res.json();
}

// 숫자 배열을 "22 / 19.5 / 17" 형태로. 전부 같으면 하나만.
function joinLevels(arr, maxRank) {
    if (!Array.isArray(arr) || arr.length === 0) return null;
    const vals = arr.slice(0, maxRank).map(v => {
        const n = Number(v);
        return Number.isInteger(n) ? String(n) : String(parseFloat(n.toFixed(3)));
    });
    if (vals.length === 0) return null;
    const allSame = vals.every(v => v === vals[0]);
    return allSame ? vals[0] : vals.join(' / ');
}

// 자바스크립트 문자열 리터럴로 안전하게 감싸기 (큰따옴표 기준)
function q(str) {
    return '"' + String(str)
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\r/g, '')
        .replace(/\n/g, '\\n') + '"';
}

// ------------------------------------------------------------
// 핵심: dynamicDescription -> 템플릿 문장 + 플레이스홀더 목록
// ------------------------------------------------------------

const unknownTags = new Map(); // 태그명 -> 처음 발견한 챔피언

// 문장 안에서 다른 스킬 이름을 부르는 {{Spell_XXX_Name}} 참조를 풀기 위해 필요하다.
//   loadStringTable() 결과를 main 에서 넣어 준다. 비어 있으면 참조는 그대로 남는다.
let stringTable = {};
const unresolvedRefs = new Map(); // {{키}} -> 처음 발견한 챔피언

function convertDescription(raw, championAlias) {
    if (!raw) return { text: '', names: [] };

    let text = String(raw);

    // 1) 항상 비어있는 접미사 제거
    text = text.replace(/@SpellModifierDescriptionAppend@/gi, '');

    // 2) 아이콘 토큰(%i:cooldown% 등) 제거
    text = text.replace(/%i:[a-zA-Z0-9_]+%/g, '');

    // 2.5) {{Spell_XXX_Name}} — 다른 스킬 이름을 부르는 참조.
    //   패시브 툴팁을 stringtable 에서 가져오면서 딸려 들어온 문법이다.
    //   @Placeholder@ 와 달리 {p} 자리가 아니라서 못 풀어도 폴백이 안 걸리고
    //   화면에 "{{Spell_DariusR_Name}}" 이 그대로 찍힌다. 반드시 여기서 풀어야 한다.
    //   키는 소문자로 조회한다 (패시브 툴팁 조회와 같은 규칙).
    //   ★ 키 안에 {p1} 같은 게 또 들어간 중첩형(갱플랭크 Q)은 일부러 안 건드린다.
    text = text.replace(/\{\{\s*([A-Za-z0-9_]+)\s*\}\}/g, (match, key) => {
        const hit = stringTable[key.toLowerCase()];
        if (typeof hit === 'string' && hit.trim()) return hit;
        if (!unresolvedRefs.has(key)) unresolvedRefs.set(key, championAlias);
        return match;
    });

    // 3) 태그 이름 정리 + 미지의 태그 수집
    text = text.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>/g, (match, tag, rest) => {
        const lower = tag.toLowerCase();
        const renamed = TAG_RENAME[lower] || lower;
        if (!KNOWN_TAGS.has(renamed) && !unknownTags.has(renamed)) {
            unknownTags.set(renamed, championAlias);
        }
        const closing = match.startsWith('</') ? '/' : '';
        return `<${closing}${renamed}${closing ? '' : rest}>`;
    });

    // 4) @Placeholder@ -> {v1} {v2} ...
    //    같은 이름이 여러 번 나오면 같은 번호를 쓴다.
    const names = [];
    // ★ 문자 집합에 ':' 가 들어 있다. @spell.GnarQ:MiniTotalDamage@ 같은 교차 참조를
    //   놓치면 {pN} 으로 안 바뀌고, {p} 자리가 아니라서 폴백도 안 걸려
    //   화면에 "@spell.GnarQ:...@" 가 그대로 찍힌다. 37챔피언이 이 상태였다.
    text = text.replace(/@([A-Za-z0-9_.*+\-/():]+?)@/g, (match, name) => {
        const key = name.trim();
        let idx = names.indexOf(key);
        if (idx === -1) {
            names.push(key);
            idx = names.length - 1;
        }
        return `{p${idx + 1}}`;
    });

    // 5) 공백 정리
    text = text.replace(/[ \t]{2,}/g, ' ').trim();

    return { text, names };
}

// ------------------------------------------------------------
// 기존 파일에서 특정 챔피언 블록을 통째로 잘라내기
//   "Garen": { ... }  <- 중괄호 짝을 세어서 정확히 자른다
// ------------------------------------------------------------

function extractBlock(source, alias) {
    const needle = new RegExp(`"${alias}"\\s*:\\s*\\{`);
    const m = needle.exec(source);
    if (!m) return null;

    const start = m.index;
    let i = m.index + m[0].length - 1; // '{' 위치
    let depth = 0;
    let inStr = null;
    let escaped = false;

    for (; i < source.length; i++) {
        const ch = source[i];

        if (inStr) {
            if (escaped) { escaped = false; continue; }
            if (ch === '\\') { escaped = true; continue; }
            if (ch === inStr) inStr = null;
            continue;
        }

        if (ch === '"' || ch === "'" || ch === '`') { inStr = ch; continue; }
        if (ch === '{') depth++;
        else if (ch === '}') {
            depth--;
            if (depth === 0) {
                return source.slice(start, i + 1);
            }
        }
    }
    return null;
}

// custom_values.js 앞부분(drawGraph 함수 + 색상표 주석)을 그대로 가져온다
function extractPrelude(source, constName) {
    const idx = source.indexOf(`const ${constName}`);
    return idx === -1 ? '' : source.slice(0, idx);
}

// ------------------------------------------------------------
// 메인
// ------------------------------------------------------------

async function main() {
    console.log('[1/4] 기존 파일 읽는 중...');
    const oldTemplates = fs.existsSync(SRC_TEMPLATES) ? fs.readFileSync(SRC_TEMPLATES, 'utf8') : '';
    const oldValues = fs.existsSync(SRC_VALUES) ? fs.readFileSync(SRC_VALUES, 'utf8') : '';

    const preservedTemplates = {};
    const preservedValues = {};
    for (const alias of PRESERVE) {
        preservedTemplates[alias] = extractBlock(oldTemplates, alias);
        preservedValues[alias] = extractBlock(oldValues, alias);
        if (!preservedTemplates[alias]) console.warn(`  ! ${alias} 를 custom_templates.js 에서 못 찾음`);
        if (!preservedValues[alias]) console.warn(`  ! ${alias} 를 custom_values.js 에서 못 찾음`);
    }

    const valuesPrelude = extractPrelude(oldValues, 'customValues');

    console.log('[2/4] 챔피언 목록 받는 중...');
    const summary = await getJson(`${CD_BASE}/champion-summary.json`);
    // 같은 한글 이름이 두 번 나오는 경우가 있다 (클래식 모드용 Jade_ 사본 등).
    // 키가 겹치진 않지만 읽히지 않는 데이터라 파일만 커지므로 걸러낸다.
    // id 가 낮은 쪽이 원본이다.
    const seenName = new Set();
    const champions = summary
        .filter(c => c.id > 0)
        .sort((a, b) => a.id - b.id)
        .filter(c => {
            if (seenName.has(c.name)) {
                console.log(`  (중복 제외) ${c.name} / alias=${c.alias} / id=${c.id}`);
                return false;
            }
            seenName.add(c.name);
            return true;
        })
        .sort((a, b) => a.name.localeCompare(b.name, 'ko'));

    console.log(`  ${champions.length}명 확인`);

    console.log('[3/4] 패시브 툴팁 문장 준비 중...');
    const strings = await loadStringTable({ refresh: process.argv.includes('--refresh') });
    stringTable = strings;   // convertDescription 의 {{...}} 해석이 이걸 본다

    console.log('[4/4] 스킬 데이터 받는 중...');
    const templateEntries = [];
    const valueEntries = [];
    const needsManualCost = [];
    const form2Made = [];        // 두 번째 폼으로 만들어 넣은 스킬
    const form2Fails = [];       // FORM2 에 적혀 있는데 툴팁을 못 찾은 것
    const binFails = [];         // bin 을 못 받은 챔피언
    const passiveFallback = [];  // 패시브 툴팁을 못 찾아 CD 요약문으로 떨어진 챔피언

    for (let n = 0; n < champions.length; n++) {
        const c = champions[n];
        const alias = c.alias;

        if (PRESERVE.includes(alias)) {
            if (preservedTemplates[alias]) templateEntries.push(`    ${preservedTemplates[alias]}, // ${c.name} (직접 작성)`);
            if (preservedValues[alias]) valueEntries.push(`    ${preservedValues[alias]}, // ${c.name} (직접 작성)`);
            console.log(`  (${n + 1}/${champions.length}) ${c.name} — 기존 내용 유지`);
            continue;
        }

        let data;
        try {
            data = await getJson(`${CD_BASE}/champions/${c.id}.json`);
        } catch (e) {
            console.warn(`  ! ${c.name} (${c.id}) 실패: ${e.message}`);
            await sleep(DELAY);
            continue;
        }

        // ---- 패시브 ----
        // CD v1 의 passive.description 은 "몇 초 동안" 같은 요약문이라 빈칸이 없다.
        // 인게임 진짜 툴팁은 stringtable 에 있고 @Placeholder@ 가 살아 있다.
        let bin = null;
        try {
            const low = alias.toLowerCase();
            bin = await getJson(`${BIN}/${low}/${low}.bin.json`);
        } catch (e) {
            binFails.push(`${c.name} (${e.message})`);
        }

        const passiveRaw = bin ? getPassiveTooltip(bin, alias, strings) : null;
        if (!passiveRaw) passiveFallback.push(c.name);

        // 툴팁을 못 찾으면 예전처럼 CD 요약문으로 떨어진다.
        const passiveSrc = passiveRaw || (data.passive && data.passive.description) || '';
        const passive = convertDescription(passiveSrc, alias);

        const tplLines = [];
        const valLines = [];

        const passiveNote = passiveRaw ? 'stringtable' : 'CD 요약본 — 빈칸 없음, 직접 다듬을 것';
        tplLines.push(`        "P": ${q(passive.text)}, // ${(data.passive && data.passive.name) || ''} — ${passiveNote}`);

        valLines.push(`        "P": {`);
        passive.names.forEach((name, i) => {
            valLines.push(`            "p${i + 1}": "?", // ${name}`);
        });
        valLines.push(`            "cooldown": "-",`);
        valLines.push(`            "cost": "-"`);
        valLines.push(`        },`);

        // ---- Q W E R ----
        const seen = new Set();
        for (const spell of (data.spells || [])) {
            const key = String(spell.spellKey || '').toUpperCase();
            if (!['Q', 'W', 'E', 'R'].includes(key)) continue;
            if (seen.has(key)) continue; // 변신 챔피언의 두 번째 세트는 건너뜀
            seen.add(key);

            const { text, names } = convertDescription(spell.dynamicDescription || spell.description, alias);
            tplLines.push(`        "${key}": ${q(text)}, // ${spell.name}`);

            const maxRank = rankOf(alias, key);

            // 플레이스홀더 자리 (직접 채워야 함)
            const vLines = names.map((name, i) => `            "p${i + 1}": "?", // ${name}`);

            // 쿨타임
            const cd = joinLevels(spell.cooldownCoefficients, maxRank) || '-';

            // 소모값
            let cost = '-';
            const costJoined = joinLevels(spell.costCoefficients, maxRank);
            const costAllZero = !costJoined || /^0(\s*\/\s*0)*$/.test(costJoined);
            if (!costAllZero) {
                cost = costJoined;
            } else if (spell.cost && !/없음/.test(spell.cost)) {
                cost = '';
                needsManualCost.push(`${c.name} ${key}`);
            }

            // 사거리
            const rangeJoined = joinLevels(spell.range, maxRank);
            const hasRange = rangeJoined && !/^0(\s*\/\s*0)*$/.test(rangeJoined);

            valLines.push(`        "${key}": {`);
            if (vLines.length) valLines.push(vLines.join('\n'));
            // v1 / v2 는 구분선 아래에 뜨는 피해량 줄이다. 직접 작성하는 칸이라 비워 둔다.
            valLines.push(`            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)`);
            valLines.push(`            "v2": "",`);
            valLines.push(`            "cooldown": ${q(cd)},`);
            valLines.push(`            "cost": ${q(cost)}${hasRange ? ',' : ''}`);
            if (hasRange) {
                valLines.push(`            "stats": {`);
                valLines.push(`                "사거리": ${q(rangeJoined)}`);
                valLines.push(`            }`);
            }
            valLines.push(`        },`);
        }

        // ---- 두 번째 폼 (니달리 쿠거, 엘리스 거미, 제이스 대포, 나르 메가) ----
        //   CD v1 의 spells 에는 4개뿐이라 여기 없다. bin + stringtable 에서 직접 가져온다.
        const f2 = FORM2[alias];
        if (f2 && bin) {
            for (const slot of ['Q', 'W', 'E', 'R']) {
                const objName = f2[slot];
                if (!objName) continue;
                const obj = findSpellObj(bin, alias, objName);
                const lk = obj && obj.mSpell.mClientData && obj.mSpell.mClientData.mTooltipData
                    && obj.mSpell.mClientData.mTooltipData.mLocKeys;
                const raw = lk && lk.keyTooltip ? strings[String(lk.keyTooltip).toLowerCase()] : null;
                if (!raw) { form2Fails.push(`${c.name} ${slot}2 (${objName})`); continue; }

                // 이름이 "두번째폼 / 첫번째폼" 형태로 들어 있는 경우가 있다 (니달리·엘리스·나르).
                const nameRaw = lk.keyName ? strings[String(lk.keyName).toLowerCase()] : '';
                // ★ 못 찾으면 객체 이름을 넣지 말고 비워 둔다. app.js 가 Data Dragon 의
                //   합친 이름 뒷조각으로 채운다 (렉사이 굴 파기 스킬이 이 경우).
                const nm = String(nameRaw || '').split('/')[0].trim();

                const { text, names } = convertDescription(raw, alias);
                tplLines.push(`        "${slot}2": ${q(text)}, // ${nm} — ${f2.label}`);

                valLines.push(`        "${slot}2": {`);
                names.forEach((name, i) => valLines.push(`            "p${i + 1}": "?", // ${name}`));
                valLines.push(`            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)`);
                valLines.push(`            "v2": "",`);
                valLines.push(`            "cooldown": "-",`);
                valLines.push(`            "cost": "-",`);
                valLines.push(`            "name": ${q(nm)},`);
                valLines.push(`            "form": ${q(f2.label)},`);
                valLines.push(`            "icon": ${q(iconUrlOf(obj) || '')}`);
                valLines.push(`        },`);
                form2Made.push(`${c.name} ${slot}2 = ${nm}`);
            }
        }

        templateEntries.push(`    "${alias}": { // ${c.name}\n${tplLines.join('\n')}\n    },`);
        valueEntries.push(`    "${alias}": { // ${c.name}\n${valLines.join('\n')}\n    },`);

        console.log(`  (${n + 1}/${champions.length}) ${c.name}`);
        await sleep(DELAY);
    }

    console.log('[5/5] 파일 쓰는 중...');

    const header = `// 이 파일은 build_champion_data.js 가 생성했습니다.\n` +
        `// 생성 시각: ${new Date().toISOString()}\n` +
        `// 문장은 CommunityDragon 에서 가져왔고, {p1} {p2} 자리는 직접 채워야 합니다.\n` +
        (PRESERVE.length ? `// ${PRESERVE.join(', ')} 는 기존 내용을 그대로 유지했습니다.\n` : '') + `\n`;

    fs.writeFileSync(
        OUT_TEMPLATES,
        header + `const customTemplates = {\n${templateEntries.join('\n')}\n};\n`,
        'utf8'
    );

    fs.writeFileSync(
        OUT_VALUES,
        (valuesPrelude || header) + `const customValues = {\n${valueEntries.join('\n')}\n};\n`,
        'utf8'
    );

    console.log(`\n완료:`);
    console.log(`  ${OUT_TEMPLATES}`);
    console.log(`  ${OUT_VALUES}`);

    if (unknownTags.size) {
        console.log(`\n[주의] app.js <style> 에 없는 태그가 나왔습니다. CSS를 추가하세요:`);
        for (const [tag, champ] of unknownTags) {
            console.log(`  <${tag}>   (예: ${champ})`);
        }
    }

    if (form2Made.length || form2Fails.length) {
        console.log(`\n[두 번째 폼 스킬] ${form2Made.length}개 생성`);
        form2Made.forEach(x => console.log(`  ${x}`));
        if (form2Fails.length) {
            console.log(`  -- 툴팁을 못 찾은 것 ${form2Fails.length}개 (FORM2 의 객체 이름 확인):`);
            form2Fails.forEach(x => console.log(`     ${x}`));
        }
    }

    if (unresolvedRefs.size) {
        console.log(`\n[주의] 못 푼 {{...}} 참조 ${unresolvedRefs.size}종 — 문장에 그대로 찍힙니다:`);
        for (const [key, champ] of unresolvedRefs) {
            console.log(`  {{${key}}}   (예: ${champ})`);
        }
    }

    if (passiveFallback.length) {
        console.log(`\n[주의] 패시브 툴팁을 못 찾아 CD 요약문으로 떨어진 챔피언 ${passiveFallback.length}명:`);
        console.log('  ' + passiveFallback.join(', '));
        console.log('  (이쪽은 빈칸이 없으니 직접 써야 합니다)');
    }

    if (binFails.length) {
        console.log(`\n[주의] bin 을 못 받은 챔피언 ${binFails.length}명:`);
        console.log('  ' + binFails.join(', '));
    }

    if (needsManualCost.length) {
        console.log(`\n[주의] 소모값을 직접 채워야 하는 스킬 ${needsManualCost.length}개:`);
        console.log('  ' + needsManualCost.slice(0, 20).join(', ') + (needsManualCost.length > 20 ? ' ...' : ''));
    }
}

main().catch(err => {
    console.error('실패:', err);
    process.exit(1);
});