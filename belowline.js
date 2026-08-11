// ============================================================
//  belowline.js
//
//  인게임 툴팁에서 **구분선 아래에 작게 깔리는 회색 글씨**를 가져온다.
//  ("이 스킬은 피해를 입힐 때 효과가 발동합니다." 같은 부연 설명)
//
//  ★ 이건 CommunityDragon 의 dynamicDescription 에 **아예 안 들어 있다.**
//    라이엇이 본문과 따로 관리하는 별도 stringtable 키다. 그래서 우리 사이트에
//    가렌 Q 의 "강화된 기본 공격은 3.5초 후 끝납니다." 가 통째로 빠져 있었다.
//
//  찾아가는 길 (패시브 툴팁과 같은 방식이다 — stringtable.js 주석 참고):
//     bin  Characters/<Alias>/CharacterRecords/Root
//            .mCharacterPassiveSpell → 패시브 스펠 객체
//            .spells[0..3]           → Q W E R (이 순서가 곧 슬롯이다)
//     스펠 객체의
//            mSpell.mClientData.mTooltipData.mLocKeys.keyTooltipExtendedBelowLine
//     를 **소문자로** stringtable 에서 조회.
//
//  ★ 키 이름으로 추측하지 말 것. stringtable 에는 구버전·클래식(jade_)용이 섞여 있고
//    `spell_hweiqe_tooltipextendedbelowline` 처럼 "unused, please delete" 인 것도 있다.
//    bin 이 가리키는 키만 진짜다. (CLAUDE.md "stringtable 을 직접 뒤지지 말 것" 항목)
//
//  ★ build_champion_data.js 와 fill_values.js 가 **이 모듈 하나**를 같이 쓴다.
//    표를 양쪽에 복사하면 반드시 어긋난다 (MAX_RANK·DD_ID 가 그래서 늘 문제였다).
//    문장의 {pN} 개수와 값의 pN 개수가 안 맞으면 스킬이 통째로 DD 폴백된다.
// ============================================================

// build_champion_data.js 가 본문과 회색 글씨를 한 번에 변환한 뒤 다시 가르는 표식.
//   @ 나 < 가 들어가면 convertDescription 이 건드리므로 제어문자를 쓴다.
const BELOW_SEP = '';

// {{ Key }} 참조를 stringtable 값으로 바꾼다.
//   ★ 여기서 미리 풀어 두는 이유: build 쪽은 convertDescription 이 풀어 주지만
//     fill_values 쪽은 안 푼다. 풀린 문장에 @Placeholder@ 가 들어 있으면 양쪽이
//     세는 자리 수가 달라진다. 그래서 **모듈에서 풀어서 같은 글자를 내보낸다.**
//   키 안에 또 placeholder 가 든 중첩형({{키_@i@}})은 일부러 안 건드린다 — 조사해 보니
//   회색 글씨 353자리에는 한 건도 없다.
function resolveRefs(text, strings) {
    if (!text) return text;
    return String(text).replace(/\{\{\s*([A-Za-z0-9_]+)\s*\}\}/g, (m, key) => {
        const hit = strings[key.toLowerCase()];
        return (typeof hit === 'string' && hit.trim()) ? hit : m;
    });
}

function textOfSpellObj(obj, strings) {
    const lk = obj && obj.mSpell && obj.mSpell.mClientData
        && obj.mSpell.mClientData.mTooltipData
        && obj.mSpell.mClientData.mTooltipData.mLocKeys;
    const key = lk && lk.keyTooltipExtendedBelowLine;
    if (!key) return null;
    const raw = strings[String(key).toLowerCase()];
    if (!raw || !String(raw).trim()) return null;
    // 라이엇이 지워야 할 자리라고 적어 둔 것 (흐웨이 QE 등). 화면에 나가면 안 된다.
    if (/^unused/i.test(String(raw).trim())) return null;
    return resolveRefs(String(raw), strings);
}

// bin 안에서 스펠 객체 경로를 해석한다.
//   spells 는 전체 경로("Characters/Garen/Spells/GarenQAbility/GarenQ"),
//   spellNames 는 상대 경로("GarenQAbility/GarenQ") 라 둘 다 받는다.
function resolveSpellObj(bin, alias, ref) {
    if (!ref) return null;
    for (const c of [ref, `Characters/${alias}/Spells/${ref}`]) {
        if (bin[c] && bin[c].mSpell) return bin[c];
    }
    const tail = '/' + String(ref).split('/').pop();
    for (const k of Object.keys(bin)) {
        if (k.endsWith(tail) && bin[k] && bin[k].mSpell) return bin[k];
    }
    return null;
}

// { P, Q, W, E, R } — 없는 슬롯은 키가 아예 안 생긴다.
function belowLineMap(bin, alias, strings) {
    const out = {};
    if (!bin) return out;
    const rec = bin[`Characters/${alias}/CharacterRecords/Root`]
        || bin[Object.keys(bin).find(k => /\/CharacterRecords\/Root$/.test(k)) || ''];
    if (!rec) return out;

    const put = (slot, ref) => {
        const obj = resolveSpellObj(bin, alias, ref);
        const t = obj ? textOfSpellObj(obj, strings) : null;
        if (t) out[slot] = t;
    };

    put('P', rec.mCharacterPassiveSpell);
    const list = (rec.spells && rec.spells.length ? rec.spells : rec.spellNames) || [];
    list.slice(0, 4).forEach((ref, i) => put(['Q', 'W', 'E', 'R'][i], ref));
    return out;
}

module.exports = { BELOW_SEP, belowLineMap, textOfSpellObj, resolveSpellObj, resolveRefs };
