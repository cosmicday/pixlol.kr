// ============================================================
//  build_wiki_stats.js  —  롤위키 스킬 상자의 우상단 값 → wiki_stats.json  (2026-08-23 신설)
//
//  bin 에서 **못 얻는** 우상단 값을 롤위키(wiki.leagueoflegends.com) 에서 받아 둔다.
//    · 사거리(`target range`/`range`, Global 은 "전역") · 효과 범위(`effect radius`)
//    · 시전시간(`cast time`) · 투사체/돌진 속도(`speed`) · 스킬 폭(`width`)
//  fill_values.js 가 **bin 값이 없는 자리에만** 이 파일을 깔아 준다 (STAT_MANUAL > bin > 여기).
//
//  사용법:  node build_wiki_stats.js [--refresh]
//    --refresh 를 붙이면 .cache/lolwiki/ 를 무시하고 다시 받는다 (패치 때).
//
//  ★ 위키는 "끝에서 끝" 사거리(castRange + 폭/2)·20레벨 기준값 같은 관례가 있다.
//    그래서 bin 값이 있는 자리는 절대 덮지 않는다 — 빈칸만 채운다.
//  ★ 숫자 하나로 떨어지는 값만 쓴다. `500 + 100% movement speed` · `Distance/0.1 s` ·
//    `[750 to 1750 for 5]` 같은 식은 버린다 (화면에 식을 못 싣는다).
// ============================================================

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const CACHE = path.join(ROOT, '.cache', 'lolwiki');
const OUT = path.join(ROOT, 'wiki_stats.json');
const WIKI = 'https://wiki.leagueoflegends.com/en-us/api.php';
const REFRESH = process.argv.includes('--refresh');
const sleep = ms => new Promise(r => setTimeout(r, ms));

// ---------- 위키 받기 ----------
async function wikitext(page) {
    const u = `${WIKI}?action=parse&page=${encodeURIComponent(page)}&prop=wikitext&format=json&redirects=1`;
    for (let i = 0; i < 3; i++) {
        try {
            const r = await fetch(u);
            const j = await r.json();
            if (j.error) return { error: j.error.code };
            return { text: j.parse.wikitext['*'], title: j.parse.title };
        } catch (e) { await sleep(1000); }
    }
    return { error: 'net' };
}

// ---------- wikitext 템플릿 풀기 ----------
function expand(s) {
    let prev;
    do {
        prev = s;
        s = s.replace(/\{\{([^{}]*)\}\}/g, (m, inner) => {
            const parts = inner.split('|');
            const name = parts[0].trim().toLowerCase();
            const named = {}, pos = [];
            for (const p of parts.slice(1)) {
                const i = p.indexOf('=');
                if (i > 0 && /^[a-z ]+$/i.test(p.slice(0, i).trim())) named[p.slice(0, i).trim().toLowerCase()] = p.slice(i + 1).trim();
                else pos.push(p);
            }
            switch (name) {
                case 'ap': case 'pp': case 'pplevel': case 'apl':
                    return '[' + (pos.length > 1 && !/ to /.test(pos[0]) ? pos.join(' / ') : pos[0]) + ']';
                case 'fd': case 'tt': case 'ft': return pos[0] || '';
                case 'as': case 'sti': case 'sbc': return (pos.length > 1 && /[\d\[]/.test(pos[0])) ? pos[0] : (pos[pos.length - 1] || '');
                case 'tip': return named.icononly ? '' : (pos[1] || pos[0] || '');
                case 'dv': return pos.join(' | ');
                case 'ai': case 'ci': case 'cis': case 'csl': return pos[0] || '';
                case 'degree': return '°';
                default: return pos.length ? pos.join(' ') : '';
            }
        });
    } while (s !== prev);
    return s.replace(/'''|''/g, '').replace(/<br\s*\/?>/g, ' ').replace(/\[\[([^\]|]*\|)?([^\]]*)\]\]/g, '$2').replace(/[ \t]+/g, ' ').trim();
}

// `|key = value` 최상위 필드만 (중괄호 깊이 0)
function parseFields(text) {
    text = text.replace(/<!--[\s\S]*?-->/g, '');
    let hs = text.indexOf('{{{{{1');
    if (hs > 0) text = text.slice(hs);
    text = text.replace(/\{\{#var:[^}]*\}\}/g, '');
    const body = text.slice(text.indexOf('\n') + 1);
    const f = {};
    let depth = 0, cur = null, buf = '';
    for (let i = 0; i < body.length; i++) {
        if (body.startsWith('{{', i)) { depth++; buf += '{{'; i++; continue; }
        if (body.startsWith('}}', i)) { depth--; buf += '}}'; i++; continue; }
        if (body[i] === '\n' && depth <= 0 && body[i + 1] === '|') {
            if (cur) f[cur] = buf.trim();
            const m = body.slice(i + 2).match(/^([^=\n]+?)\s*=/);
            if (m) { cur = m[1].trim().toLowerCase(); buf = ''; i += 2 + m[0].length - 1; continue; }
        }
        buf += body[i];
    }
    if (cur) f[cur] = buf.trim().replace(/\}\}\s*$/, '');
    for (const k of Object.keys(f)) f[k] = expand(f[k]);
    return f;
}

// ---------- 값 고르기 ----------
// 숫자 하나로 떨어지는 첫 항목만. `a | b` 는 첫 항목. 식·범위·텍스트는 버린다.
const firstNum = (s) => {
    if (!s) return null;
    const first = String(s).split('|')[0].trim();
    if (/movement speed|attack|distance|varied|see notes|[a-z]{4,}/i.test(first)) return null;
    const m = first.match(/^(\d+(?:\.\d+)?)\s*$/);
    return m ? m[1] : null;
};

(async () => {
    const en = await (await fetch('https://ddragon.leagueoflegends.com/api/versions.json')).json();
    const ver = en[0];
    const champs = (await (await fetch(`https://ddragon.leagueoflegends.com/cdn/${ver}/data/en_US/champion.json`)).json()).data;
    fs.mkdirSync(CACHE, { recursive: true });

    const out = {};
    let n = 0;
    for (const c of Object.values(champs)) {
        const cacheFile = path.join(CACHE, c.id + '.json');
        let raw;
        if (!REFRESH && fs.existsSync(cacheFile)) raw = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
        else {
            const pg = await wikitext(c.name);
            if (pg.error) { console.log('  ★ 페이지 실패', c.id, c.name, pg.error); continue; }
            const refs = [...pg.text.matchAll(/\{\{Data ([^}|]+?)\|Ability\}\}/g)].map(m => m[1].trim());
            raw = [];
            for (const ref of refs) {
                const t = await wikitext('Template:Data ' + ref);
                if (t.text) raw.push({ ref, text: t.text });
                await sleep(120);
            }
            fs.writeFileSync(cacheFile, JSON.stringify(raw));
            await sleep(150);
        }
        out[c.id] = {};
        for (const a of raw) {
            const f = parseFields(a.text);
            let slot = (a.ref.split('/')[1] || '').trim();
            if (!/^(I|Q|W|E|R)$/.test(slot) && f.skill && /^(I|Q|W|E|R)$/i.test(f.skill.trim())) slot = f.skill.trim().toUpperCase();
            if (!/^(I|Q|W|E|R)$/.test(slot)) continue;           // 2차 폼·이름 슬롯은 건너뛴다
            const key = slot === 'I' ? 'P' : slot;
            if (out[c.id][key]) continue;                           // 같은 슬롯 둘이면 첫 것
            const st = {};
            const rng = f['target range'] || f.range;
            if (rng && /^\s*global\s*$/i.test(rng.split('|')[0])) st['사거리'] = '전역';
            else if (firstNum(rng)) st['사거리'] = firstNum(rng);
            if (firstNum(f['effect radius'])) st['효과 범위'] = firstNum(f['effect radius']);
            if (firstNum(f['cast time'])) st['시전시간'] = firstNum(f['cast time']);
            if (firstNum(f.speed)) {
                // 돌진 스킬이면 돌진 속도. 위키는 둘을 `speed` 한 칸에 적는다
                const dash = !/true/i.test(f.projectile || '') && /dash/i.test((f.description || '') + (f.targeting || ''));
                st[dash ? '돌진 속도' : '투사체 속도'] = firstNum(f.speed);
            }
            if (firstNum(f.width)) st['스킬 폭'] = firstNum(f.width);
            if (Object.keys(st).length) { out[c.id][key] = st; n++; }
        }
        if (REFRESH) console.log(`  ${c.id} (${Object.keys(out).length}/${Object.keys(champs).length})`);
    }
    fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
    const cnt = {};
    for (const c of Object.values(out)) for (const s of Object.values(c)) for (const k of Object.keys(s)) cnt[k] = (cnt[k] || 0) + 1;
    console.log(`\n생성됨: ${OUT}  (슬롯 ${n})`, cnt);
})();
