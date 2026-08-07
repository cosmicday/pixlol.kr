// ============================================================
//  probe_spell_fields.js  — 확인만. 아무것도 안 만든다.
//
//  bin.json 의 스펠 객체에 어떤 필드가 있는지, 투사체 정보는 어디 붙는지 본다.
//  사용법: node probe_spell_fields.js
// ============================================================

const CD = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/ko_kr/v1';
const BIN = 'https://raw.communitydragon.org/latest/game/data/characters';

// 성격이 다른 챔피언들: 스킬샷 / 근접 / 논타겟 / 채널링
const SAMPLES = ['Ezreal', 'Garen', 'Lux', 'Katarina'];

const get = async (u) => { const r = await fetch(u); if (!r.ok) throw new Error(r.status); return r.json(); };
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// 값 미리보기 (배열이면 앞 4개만)
function peek(v) {
    if (v === null || v === undefined) return String(v);
    if (Array.isArray(v)) return `[${v.slice(0, 4).map(x => typeof x === 'object' ? '{…}' : x).join(', ')}${v.length > 4 ? ', …' : ''}]`;
    if (typeof v === 'object') return `{${Object.keys(v).slice(0, 5).join(', ')}${Object.keys(v).length > 5 ? ', …' : ''}}`;
    return String(v);
}

// 숫자/숫자배열만 뽑아 보여준다 (시전시간·속도 같은 건 대부분 여기 있다)
function numericFields(obj) {
    const out = [];
    for (const k in obj) {
        const v = obj[k];
        if (typeof v === 'number') out.push([k, String(v)]);
        else if (Array.isArray(v) && v.length && v.every(x => typeof x === 'number')) out.push([k, peek(v)]);
    }
    return out;
}

(async () => {
    const summary = await get(`${CD}/champion-summary.json`);

    for (const alias of SAMPLES) {
        const c = summary.find(x => x.alias === alias);
        if (!c) continue;

        const low = alias.toLowerCase();
        let bin;
        try { bin = await get(`${BIN}/${low}/${low}.bin.json`); }
        catch (e) { console.log(`${alias}: bin 실패 ${e.message}`); continue; }

        const rec = bin[`Characters/${alias}/CharacterRecords/Root`];
        if (!rec) { console.log(`${alias}: CharacterRecord 없음`); continue; }

        const qPath = (rec.spells || [])[0];
        const spellObj = bin[qPath];
        const spell = spellObj && spellObj.mSpell;
        if (!spell) { console.log(`${alias}: Q 스펠 없음`); continue; }

        console.log('='.repeat(60));
        console.log(`${c.name} (${alias}) — Q: ${qPath}`);
        console.log('='.repeat(60));

        console.log('\n[숫자 필드]');
        numericFields(spell).forEach(([k, v]) => console.log(`  ${k} = ${v}`));

        console.log('\n[그 외 필드 이름만]');
        const rest = Object.keys(spell).filter(k => {
            const v = spell[k];
            return !(typeof v === 'number' || (Array.isArray(v) && v.every(x => typeof x === 'number')));
        });
        console.log('  ' + rest.join(', '));

        // 투사체(미사일) 객체 찾기
        console.log('\n[투사체로 보이는 객체]');
        const missiles = Object.keys(bin).filter(k =>
            k.startsWith(`Characters/${alias}/Spells/`) &&
            /missile|mis\b/i.test(k) &&
            bin[k] && (bin[k].mSpell || bin[k].__type === 'SpellObject'));
        if (!missiles.length) console.log('  (없음)');
        missiles.slice(0, 3).forEach(k => {
            console.log(`  ${k}`);
            const ms = bin[k].mSpell || {};
            const spec = ms.missileSpec || ms.mMissileSpec || {};
            const nf = numericFields(spec);
            if (nf.length) nf.forEach(([kk, vv]) => console.log(`      missileSpec.${kk} = ${vv}`));
            else console.log(`      missileSpec 키: ${Object.keys(spec).join(', ') || '(없음)'}`);
        });

        console.log('');
        await sleep(200);
    }

    console.log('끝. 출력 전체를 붙여넣어 주세요.');
})().catch(e => { console.error('실패:', e); process.exit(1); });
