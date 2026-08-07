// ============================================================
//  check_data_sources.js  — 확인만 하는 스크립트. 파일을 만들지 않는다.
//
//  사용법: node check_data_sources.js
//
//  [검사 1] Data Dragon 에 로크가 있는지
//  [검사 2] bin.json 에서 {p1} 자리 이름을 실제로 찾을 수 있는지
// ============================================================

const CD = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/ko_kr/v1';
const BIN = 'https://raw.communitydragon.org/latest/game/data/characters';
const DD = 'https://ddragon.leagueoflegends.com';

// 검사 2에서 표본으로 볼 챔피언들. 구조가 제각각인 애들을 일부러 섞었다.
const SAMPLES = ['Garen', 'Aatrox', 'Ahri', 'Lux', 'MonkeyKing', 'Nunu', 'Locke'];

const get = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status}`);
    return res.json();
};
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// ------------------------------------------------------------

async function checkLocke() {
    console.log('='.repeat(60));
    console.log('[검사 1] 로크가 어디에 있고 어디에 없는지');
    console.log('='.repeat(60));

    // CommunityDragon 쪽
    let cdLocke = null;
    try {
        const summary = await get(`${CD}/champion-summary.json`);
        cdLocke = summary.find(c => c.name === '로크' || c.alias === 'Locke');
        console.log(`CommunityDragon : ${summary.filter(c => c.id > 0).length}명`);
        console.log(`  로크 -> ${cdLocke ? `있음 (id=${cdLocke.id}, alias=${cdLocke.alias})` : '없음'}`);
    } catch (e) {
        console.log(`CommunityDragon : 실패 (${e.message})`);
    }

    // Data Dragon 쪽
    try {
        const versions = await get(`${DD}/api/versions.json`);
        const v = versions[0];
        console.log(`\nData Dragon 최신 버전: ${v}`);

        const champs = await get(`${DD}/cdn/${v}/data/ko_KR/champion.json`);
        const names = Object.keys(champs.data);
        console.log(`Data Dragon : ${names.length}명`);

        const ddLocke = cdLocke ? names.includes(cdLocke.alias) : names.includes('Locke');
        console.log(`  로크 -> ${ddLocke ? '있음' : '없음  <-- 이것 때문에 사이트에 안 뜬다'}`);

        if (!ddLocke && cdLocke) {
            // CD 에는 있는데 DD 에는 없는 챔피언이 로크 말고 또 있는지
            const summary = await get(`${CD}/champion-summary.json`);
            const missing = summary
                .filter(c => c.id > 0 && !c.alias.startsWith('Jade_') && !names.includes(c.alias))
                .map(c => `${c.name}(${c.alias})`);
            console.log(`\nData Dragon 에 빠진 챔피언 ${missing.length}명: ${missing.join(', ')}`);
        }
    } catch (e) {
        console.log(`Data Dragon : 실패 (${e.message})`);
    }
}

// ------------------------------------------------------------

// bin.json 안에서 이 스킬에 해당하는 SpellObject 를 찾는다.
function findSpellObjects(bin, alias) {
    const out = {};
    const prefix = `Characters/${alias}/Spells/`;
    for (const key in bin) {
        if (!key.startsWith(prefix)) continue;
        const obj = bin[key];
        if (!obj || obj.__type !== 'SpellObject' || !obj.mSpell) continue;
        out[obj.ObjectName || key] = obj.mSpell;
    }
    return out;
}

// 이름 하나가 이 스펠 안에서 해결되는지
function resolveName(spell, name) {
    const clean = name.replace(/\*\s*100$/, '').trim();

    if (Array.isArray(spell.DataValues)) {
        const dv = spell.DataValues.find(d => d.name === clean);
        if (dv) return { how: 'DataValues', values: dv.values };
    }
    if (spell.mSpellCalculations && spell.mSpellCalculations[clean]) {
        const parts = spell.mSpellCalculations[clean].mFormulaParts || [];
        return { how: 'mSpellCalculations', types: parts.map(p => p.__type || '(수정된계산)') };
    }
    return null;
}

async function checkBin() {
    console.log('\n' + '='.repeat(60));
    console.log('[검사 2] {p1} 자리 이름을 bin.json 에서 찾을 수 있나');
    console.log('='.repeat(60));

    const summary = await get(`${CD}/champion-summary.json`);
    const partTypes = {};   // 계산식 조각 종류별 등장 횟수
    let total = 0, hit = 0;
    const misses = [];

    for (const alias of SAMPLES) {
        const c = summary.find(x => x.alias === alias);
        if (!c) { console.log(`\n--- ${alias}: 목록에 없음 ---`); continue; }

        let v1, bin;
        try {
            v1 = await get(`${CD}/champions/${c.id}.json`);
        } catch (e) {
            console.log(`\n--- ${c.name}: v1 실패 (${e.message}) ---`);
            continue;
        }
        try {
            const low = alias.toLowerCase();
            bin = await get(`${BIN}/${low}/${low}.bin.json`);
        } catch (e) {
            console.log(`\n--- ${c.name}: bin.json 실패 (${e.message}) — 경로 규칙이 다를 수 있음 ---`);
            continue;
        }

        const spells = findSpellObjects(bin, alias);
        console.log(`\n--- ${c.name} (${alias}) — bin 안 스펠 ${Object.keys(spells).length}개 ---`);

        for (const s of (v1.spells || [])) {
            const key = String(s.spellKey || '').toUpperCase();
            if (!['Q', 'W', 'E', 'R'].includes(key)) continue;

            const desc = (s.dynamicDescription || '').replace(/@SpellModifierDescriptionAppend@/gi, '');
            const names = [...new Set([...desc.matchAll(/@([A-Za-z0-9_.*+\-/() ]+?)@/g)].map(m => m[1].trim()))];
            if (!names.length) continue;

            // 이 스킬의 스펠 객체 후보 (이름에 Q/W/E/R 이 들어간 것 우선)
            const candidates = Object.entries(spells)
                .filter(([n]) => n.toLowerCase().includes(alias.toLowerCase() + key.toLowerCase()))
                .map(([, sp]) => sp);
            const pool = candidates.length ? candidates : Object.values(spells);

            const found = [], notFound = [];
            for (const n of names) {
                total++;
                let r = null;
                for (const sp of pool) { r = resolveName(sp, n); if (r) break; }
                if (r) {
                    hit++;
                    found.push(n);
                    if (r.types) r.types.forEach(t => partTypes[t] = (partTypes[t] || 0) + 1);
                } else {
                    notFound.push(n);
                    misses.push(`${c.name} ${key} / ${n}`);
                }
            }
            console.log(`  [${key}] ${found.length}/${names.length} 찾음` +
                (notFound.length ? `   못 찾음: ${notFound.join(', ')}` : ''));
        }
        await sleep(150);
    }

    console.log('\n' + '-'.repeat(60));
    console.log(`전체: ${hit}/${total} 해결 (${total ? Math.round(hit / total * 100) : 0}%)`);

    console.log('\n계산식 조각 종류별 등장 횟수 (많은 순):');
    Object.entries(partTypes).sort((a, b) => b[1] - a[1])
        .forEach(([t, n]) => console.log(`  ${n.toString().padStart(3)}  ${t}`));

    if (misses.length) {
        console.log(`\n못 찾은 것 ${misses.length}개 (앞 25개):`);
        misses.slice(0, 25).forEach(m => console.log(`  ${m}`));
    }
}

// ------------------------------------------------------------

(async () => {
    await checkLocke();
    await checkBin();
    console.log('\n끝. 위 출력 전체를 붙여넣어 주면 됩니다.');
})().catch(e => { console.error('실패:', e); process.exit(1); });
