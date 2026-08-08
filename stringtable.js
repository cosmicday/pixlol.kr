// ============================================================
//  stringtable.js
//
//  인게임 진짜 툴팁 문장을 가져온다.
//
//  ★ 왜 필요한가
//    CD v1 의 champions/{id}.json 은 패시브에 dynamicDescription 이 없다.
//    passive.description 은 "몇 초 동안 공격받지 않으면" 같은 요약문이라
//    @Placeholder@ 자리가 아예 없어서 수치를 채울 방법이 없었다.
//
//    인게임에서 실제로 뜨는 툴팁은 게임 클라이언트의 stringtable 에 있고,
//    거기엔 @PassiveCooldown@ 같은 빈칸이 그대로 살아 있다.
//
//  ★ 찾아가는 길 (2단계)
//    1. bin 의 mSpell.mClientData.mTooltipData.mLocKeys.keyTooltip 에 키가 있다
//         예: "game_character_passiveTooltip_Malphite"
//    2. stringtable 의 entries 에서 그 키를 소문자로 조회한다
//         -> "말파이트가 @PassiveCooldown@초 동안 피해를 입지 않으면 ..."
//
//    키 짓는 규칙이 챔피언마다 제각각이라(game_character_passiveTooltip_X,
//    Spell_XPassive_Tooltip, Spell_XP_Tooltip 3종 확인) 이름으로 추측하지 말고
//    반드시 bin 에서 읽을 것.
//
//  ★ 파일이 35MB 라서 로컬에 캐시한다. .cache/ 는 gitignore 대상.
//     패치 후 갱신하려면 --refresh 를 붙이거나 .cache 를 지우면 된다.
// ============================================================

const fs = require('fs');
const path = require('path');

const URL = 'https://raw.communitydragon.org/latest/game/ko_kr/data/menu/en_us/lol.stringtable.json';
const CACHE_DIR = path.join(__dirname, '.cache');
const CACHE_FILE = path.join(CACHE_DIR, 'lol.stringtable.json');

// 캐시를 며칠까지 믿을 것인가. 롤 패치 주기를 생각하면 이 정도면 충분하다.
const MAX_AGE_DAYS = 7;

let cached = null;

async function loadStringTable({ refresh = false, quiet = false } = {}) {
    if (cached) return cached;

    let raw = null;

    if (!refresh && fs.existsSync(CACHE_FILE)) {
        const ageMs = Date.now() - fs.statSync(CACHE_FILE).mtimeMs;
        const ageDays = ageMs / 86400000;
        if (ageDays <= MAX_AGE_DAYS) {
            if (!quiet) console.log(`  stringtable 캐시 사용 (${ageDays.toFixed(1)}일 전)`);
            raw = fs.readFileSync(CACHE_FILE, 'utf8');
        } else if (!quiet) {
            console.log(`  stringtable 캐시가 ${ageDays.toFixed(0)}일 지났음 — 다시 받는다`);
        }
    }

    if (raw === null) {
        if (!quiet) console.log('  stringtable 내려받는 중 (35MB, 조금 걸린다)...');
        const res = await fetch(URL);
        if (!res.ok) throw new Error(`stringtable ${res.status}`);
        raw = await res.text();
        fs.mkdirSync(CACHE_DIR, { recursive: true });
        fs.writeFileSync(CACHE_FILE, raw, 'utf8');
        if (!quiet) console.log(`  캐시 저장: ${CACHE_FILE}`);
    }

    const parsed = JSON.parse(raw);
    const entries = parsed.entries || parsed;
    // 파일의 키는 이미 전부 소문자다. 그래도 방어적으로 한 번 더 낮춘다.
    cached = {};
    for (const k in entries) cached[k.toLowerCase()] = entries[k];
    if (!quiet) console.log(`  엔트리 ${Object.keys(cached).length.toLocaleString()}개`);
    return cached;
}

// bin 에서 패시브 스펠 객체를 찾는다. fill_values.js 의 getSpellsFromBin 과 같은 경로.
function findPassiveSpell(bin, alias) {
    const rec = bin[`Characters/${alias}/CharacterRecords/Root`];
    if (!rec) return null;
    const obj = bin[rec.mCharacterPassiveSpell];
    return (obj && obj.mSpell) ? obj.mSpell : null;
}

// 패시브 툴팁 원문을 돌려준다. 못 찾으면 null.
//   keyTooltip 이 없거나 stringtable 에 그 키가 없는 경우가 있으므로
//   호출한 쪽에서 반드시 null 을 처리할 것.
function getPassiveTooltip(bin, alias, strings) {
    const spell = findPassiveSpell(bin, alias);
    if (!spell) return null;
    const keys = spell.mClientData
        && spell.mClientData.mTooltipData
        && spell.mClientData.mTooltipData.mLocKeys;
    if (!keys || !keys.keyTooltip) return null;
    const txt = strings[String(keys.keyTooltip).toLowerCase()];
    return (typeof txt === 'string' && txt.trim()) ? txt : null;
}

module.exports = { loadStringTable, findPassiveSpell, getPassiveTooltip };
