// ============================================================
//  probe_missing.js  — 확인만. 아무것도 안 만든다.
//
//  fill_values.js 가 못 채운 이름 하나가 bin 어디에 있는지 찾는다.
//  probe_spell_fields.js 는 "이 스펠에 무슨 필드가 있나"를 나열하는 도구고,
//  이건 반대로 "이 이름이 어디 있나"를 역추적하는 도구다.
//
//  사용법:
//      node probe_missing.js                    <- 아래 TARGETS 전부
//      node probe_missing.js Soraka             <- TARGETS 중 소라카만
//      node probe_missing.js Shen EnergyRefund E  <- 이름 하나 직접 지정
//
//  ★ "아무 데도 없음" 도 답이다.
//    그러면 그 값은 이 챔피언 bin 밖(공용 스펠, 버프 객체, CD 쪽 계산)에
//    있다는 뜻이라 더 뒤지지 말고 MANUAL 로 넘기면 된다.
// ============================================================

const CD = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/ko_kr/v1';
const BIN = 'https://raw.communitydragon.org/latest/game/data/characters';

// 못 채운 16개 중 진짜로 남은 4개.
//   나머지 12개는 f1 / f2 계열이라 뺐다 — 본체 한정 규칙 때문에 못 채우는 거고
//   위치를 찾아도 쓸 수가 없다. (MANUAL 대상)
const TARGETS = [
    { alias: 'Katarina',   key: 'R', names: ['ADDamageCalc', 'TotalADDamageCalc'] },
    { alias: 'Kaisa',      key: 'Q', names: ['MaxDamageDisplay'] },
    { alias: 'Cassiopeia', key: 'E', names: ['Cost'] },
];

const DELAY = 200;

// --dump 를 붙이면 계산식 객체의 속을 통째로 찍는다.
//   이름은 맞는데 값이 안 나오는 경우(계산식 해석 실패)를 볼 때 쓴다.
const DUMP = process.argv.includes('--dump');

const get = async (u) => { const r = await fetch(u); if (!r.ok) throw new Error(r.status); return r.json(); };
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// 배율(*100)과 점 꼬리(.0)를 떼어낸다. fill_values.js 와 같은 규칙.
const cleanName = (n) => String(n).trim()
    .replace(/\s*\*\s*-?[\d.]+$/, '')
    .replace(/\.\d+$/, '')
    .trim();

function peek(v) {
    if (v === null || v === undefined) return String(v);
    if (Array.isArray(v)) {
        const head = v.slice(0, 8).map(x => (x && typeof x === 'object') ? '{…}' : x);
        return `[${head.join(', ')}${v.length > 8 ? `, … (총 ${v.length}칸)` : ''}]`;
    }
    if (typeof v === 'object') {
        const k = Object.keys(v);
        return `{${k.slice(0, 6).join(', ')}${k.length > 6 ? ', …' : ''}}`;
    }
    return String(v);
}

// 그대로 / m 접두사 / 대소문자 무시. fill_values.js 와 같은 규칙.
function findField(obj, name) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return undefined;
    if (obj[name] !== undefined) return obj[name];
    if (obj['m' + name] !== undefined) return obj['m' + name];
    const want = name.toLowerCase();
    for (const k in obj) {
        const kl = k.toLowerCase();
        if (kl === want || kl === 'm' + want) return obj[k];
    }
    return undefined;
}

// 스펠 객체 하나 안에서 이름이 어디 있는지
function inspectSpell(spell, name) {
    const hits = [];
    const want = name.toLowerCase();

    const dv = (spell.DataValues || []).find(d => d.name === name);
    if (dv) hits.push({ where: 'DataValues', val: peek(dv.values) });

    const calcs = spell.mSpellCalculations || {};
    if (calcs[name] !== undefined) hits.push({ where: 'mSpellCalculations', val: peek(calcs[name]), raw: calcs[name] });

    const f = findField(spell, name);
    if (f !== undefined) hits.push({ where: '스펠 필드', val: peek(f) });

    const a = findField(spell.mAmmo, name);
    if (a !== undefined) hits.push({ where: 'mAmmo 필드', val: peek(a) });

    // 대소문자만 다른 경우 (Stunduration vs StunDuration). 이게 원인인 경우가 있다.
    const dvL = (spell.DataValues || []).find(d => String(d.name).toLowerCase() === want && d.name !== name);
    if (dvL) hits.push({ where: `DataValues — 실제 이름은 "${dvL.name}"`, val: peek(dvL.values) });
    const cL = Object.keys(calcs).find(k => k.toLowerCase() === want && k !== name);
    if (cL) hits.push({ where: `mSpellCalculations — 실제 이름은 "${cL}"`, val: peek(calcs[cL]), raw: calcs[cL] });

    return hits;
}

// 스펠 밖까지 훑는다. 위 세 경로에서 안 잡혔을 때 최후 수단.
function deepFind(node, want, path = '', out = [], depth = 0) {
    if (!node || typeof node !== 'object' || depth > 8 || out.length >= 10) return out;
    if (Array.isArray(node)) {
        for (let i = 0; i < node.length && out.length < 10; i++) {
            deepFind(node[i], want, `${path}[${i}]`, out, depth + 1);
        }
        return out;
    }
    for (const k in node) {
        if (out.length >= 10) break;
        const v = node[k];
        if (k.toLowerCase() === want) out.push({ kind: '키', at: `${path}.${k}`, val: peek(v) });
        else if (typeof v === 'string' && v.toLowerCase() === want) out.push({ kind: '문자열 값', at: `${path}.${k}`, val: v });
        deepFind(v, want, `${path}.${k}`, out, depth + 1);
    }
    return out;
}

async function probe(alias, key, names) {
    const low = alias.toLowerCase();
    let bin;
    try { bin = await get(`${BIN}/${low}/${low}.bin.json`); }
    catch (e) { console.log(`${alias}: bin 실패 (${e.message})\n`); return; }

    const rec = bin[`Characters/${alias}/CharacterRecords/Root`];
    if (!rec) { console.log(`${alias}: CharacterRecord 없음\n`); return; }

    // 본체 경로 4개를 표시해 둔다
    const mainPaths = new Map();
    (rec.spells || []).slice(0, 4).forEach((p, i) => mainPaths.set(p, ['Q', 'W', 'E', 'R'][i]));

    const spellPaths = Object.keys(bin).filter(p =>
        bin[p] && bin[p].mSpell && (p.startsWith(`Characters/${alias}/`) || mainPaths.has(p)));

    console.log('='.repeat(64));
    console.log(`${alias} ${key} — 스펠 객체 ${spellPaths.length}개`);
    console.log('='.repeat(64));

    for (const raw of names) {
        const name = cleanName(raw);
        console.log(`\n■ ${raw}${name !== raw ? `   (찾는 이름: ${name})` : ''}`);

        let found = 0;
        for (const p of spellPaths) {
            const hits = inspectSpell(bin[p].mSpell, name);
            if (!hits.length) continue;
            found += hits.length;
            const tag = mainPaths.has(p) ? `본체 ${mainPaths.get(p)}` : '딸린 객체';
            console.log(`   [${tag}] ${p}`);
            hits.forEach(h => {
                console.log(`       ${h.where} = ${h.val}`);
                if (DUMP && h.raw !== undefined) {
                    const j = JSON.stringify(h.raw, null, 2);
                    console.log(j.split('\n').map(l => '         ' + l).join('\n').slice(0, 4000));
                }
            });
        }

        if (!found) {
            const deep = deepFind(bin, name.toLowerCase());
            if (deep.length) {
                console.log('   스펠 객체엔 없음. bin 다른 곳에서 발견:');
                deep.forEach(d => console.log(`       ${d.kind} @ ${d.at} = ${d.val}`));
            } else {
                console.log('   ★ 이 챔피언 bin 어디에도 없음 — MANUAL 대상');
            }
        }
    }

    // v1 문장. MANUAL 값을 적을 때 무슨 자리인지 보려고 같이 찍는다.
    try {
        const summary = await get(`${CD}/champion-summary.json`);
        const c = summary.find(x => x.alias === alias);
        if (c) {
            const v1 = await get(`${CD}/champions/${c.id}.json`);
            const s = (v1.spells || []).find(x => String(x.spellKey || '').toUpperCase() === key);
            if (s && s.dynamicDescription) {
                const txt = s.dynamicDescription.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
                console.log(`\n   [v1 문장] ${txt.slice(0, 400)}${txt.length > 400 ? ' …' : ''}`);
            }
        }
    } catch (_) { /* 문장은 없어도 그만 */ }

    console.log('');
}

(async () => {
    const argv = process.argv.slice(2).filter(a => !a.startsWith('--'));
    let list = TARGETS;

    if (argv.length >= 2) {
        list = [{ alias: argv[0], key: (argv[2] || 'Q').toUpperCase(), names: [argv[1]] }];
    } else if (argv.length === 1) {
        list = TARGETS.filter(t => t.alias.toLowerCase() === argv[0].toLowerCase());
        if (!list.length) { console.log(`TARGETS 에 ${argv[0]} 없음`); return; }
    }

    for (const t of list) {
        await probe(t.alias, t.key, t.names);
        await sleep(DELAY);
    }

    console.log('끝. 출력 전체를 붙여넣어 주세요.');
})().catch(e => { console.error('실패:', e); process.exit(1); });