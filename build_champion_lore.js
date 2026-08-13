#!/usr/bin/env node
/**
 * build_champion_lore.js — 챔피언 배경 이야기와 대표 대사를 받는다 → public/champion_lore.json
 *
 * ★ 출처는 라이엇 Universe 다:
 *     https://universe-meeps.leagueoflegends.com/v1/ko_kr/champions/<슬러그>/index.json
 *   `Access-Control-Allow-Origin: *` 이라 브라우저가 직접 받을 수도 있지만, **한 챔피언에
 *   332KB 인데 우리가 쓰는 건 2KB 뿐**이라 빌드 때 뽑아 둔다. 런타임 의존도 없앤다.
 *
 * ★ Data Dragon 의 `lore` 는 배경 이야기가 아니라 **짧은 소개**다 (`blurb` 와 같은 글, 212자).
 *   전문은 Universe 의 `biography.full` 에만 있다 (중앙값 2200자).
 *
 * ★ 슬러그는 DD id 소문자인데 **레나타 글라스크만 예외**(`renata` 가 아니라 `renataglasc`).
 *   173명 중 그 하나뿐인 걸 전수로 확인했다.
 *
 * 실행: node build_champion_lore.js --write
 */

const fs = require('fs');
const path = require('path');

const DD_VER = '16.16.1';
const UNIVERSE = 'https://universe-meeps.leagueoflegends.com/v1/ko_kr/champions/';
// ★ 배경은 **챔피언별 파일**로 쪼갠다 (2026-08-13).
//   통짜 하나(gzip 335KB)로 뒀더니 배경 탭을 처음 열 때 그걸 다 받아야 했다.
//   챔피언당 gzip 2.4KB 라 실제로 보는 서너 명만 받으면 된다 —
//   **통짜가 이득이 되려면 한 사람이 140명을 열어봐야 한다.**
//   대사는 18KB 뿐이라 통짜로 두고 챔피언 데이터와 같이 받는다.
const OUT_LORE_DIR = path.join(__dirname, 'public', 'lore');
const OUT_QUOTE = path.join(__dirname, 'public', 'champion_quotes.js');
const WRITE = process.argv.includes('--write');

// DD id 소문자로 안 되는 자리만 적는다
const SLUG_FIX = { Renata: 'renataglasc' };

// <p>…</p> 를 문단으로 살리고 나머지 태그는 벗긴다.
//   HTML 을 그대로 들고 있다가 innerHTML 로 꽂으면 남의 마크업을 그대로 믿는 셈이라
//   순수 텍스트 + 빈 줄로 바꿔 둔다 (화면 쪽은 pre-wrap 이라 그대로 문단이 된다).
function toPlain(html) {
    return String(html || '')
        .replace(/<\/p\s*>/gi, '\n\n')
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

// 대사는 앞뒤 장식이 제각각이다 — “ ” 로 감싼 것도 있고 위키식 '' 로 감싼 것도 있다
function cleanQuote(s) {
    return toPlain(s).replace(/^['"“”‘’]+|['"“”‘’]+$/g, '').trim();
}

async function main() {
    const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${DD_VER}/data/ko_KR/champion.json`);
    const champs = Object.values((await res.json()).data);
    console.log(`[1/2] 챔피언 ${champs.length}명 — Universe 에서 배경을 받는 중...`);

    const out = {};
    const fail = [];
    let done = 0;

    for (let i = 0; i < champs.length; i += 8) {
        await Promise.all(champs.slice(i, i + 8).map(async (c) => {
            const slug = SLUG_FIX[c.id] || c.id.toLowerCase();
            try {
                const r = await fetch(UNIVERSE + slug + '/index.json');
                if (!r.ok) { fail.push(`${c.name}(${slug}) HTTP ${r.status}`); return; }
                const bio = (await r.json()).champion?.biography;
                if (!bio) { fail.push(`${c.name}(${slug}) biography 없음`); return; }

                const full = toPlain(bio.full);
                if (!full) { fail.push(`${c.name}(${slug}) 본문 비어 있음`); return; }

                out[c.id] = {
                    lore: full,
                    quote: cleanQuote(bio.quote),
                    author: toPlain(bio['quote-author'])
                };
                done++;
            } catch (e) {
                fail.push(`${c.name} ${e.message}`);
            }
        }));
        process.stdout.write(`\r      ${done}/${champs.length}`);
    }
    console.log();

    const lens = Object.values(out).map(v => v.lore.length).sort((a, b) => a - b);

    const quotes = {};
    for (const [id, v] of Object.entries(out)) {
        if (v.quote) quotes[id] = v.author ? { q: v.quote, a: v.author } : { q: v.quote };
    }

    // 파일 하나에 그 챔피언의 배경 글 하나. 통짜 JSON 객체가 아니라 **문자열 하나**라
    // 화면 쪽에서 `await res.json()` 이 곧 본문이 된다.
    const files = Object.entries(out).map(([id, v]) => ({ id, body: JSON.stringify(v.lore) }));

    const quoteBody = '// 자동 생성 — build_champion_lore.js. 직접 고치지 말 것.\n'
        + '// 출처: 라이엇 Universe (biography.quote). q = 대사, a = 말한 사람.\n'
        + 'const championQuotes = ' + JSON.stringify(quotes) + ';\n';

    const kb = n => (n / 1024).toFixed(1) + 'KB';
    const sizes = files.map(f => Buffer.byteLength(f.body, 'utf8')).sort((a, b) => a - b);

    console.log('[2/2] 결과');
    console.log(`      받은 챔피언  ${done}명 / 실패 ${fail.length}`);
    if (fail.length) console.log('      실패: ' + fail.join(', '));
    console.log(`      배경 길이   중앙값 ${lens[Math.floor(lens.length / 2)]}자 / 최소 ${lens[0]} / 최대 ${lens[lens.length - 1]}`);
    console.log(`      대사 있는 챔피언 ${Object.keys(quotes).length}명`);
    console.log(`      lore/*.json  ${files.length}개 — 중앙값 ${kb(sizes[Math.floor(sizes.length / 2)])} / 최대 ${kb(sizes[sizes.length - 1])} / 합계 ${kb(sizes.reduce((a, b) => a + b, 0))}`);
    console.log(`      champion_quotes.js  ${kb(Buffer.byteLength(quoteBody, 'utf8'))}  (챔피언 데이터와 같이 받는다)`);

    if (WRITE) {
        fs.mkdirSync(OUT_LORE_DIR, { recursive: true });

        // 챔피언이 사라지는 일은 없지만, 옛 파일이 남아 헷갈리지 않게 폴더를 비우고 다시 쓴다
        for (const f of fs.readdirSync(OUT_LORE_DIR)) {
            if (f.endsWith('.json')) fs.unlinkSync(path.join(OUT_LORE_DIR, f));
        }
        for (const f of files) fs.writeFileSync(path.join(OUT_LORE_DIR, f.id + '.json'), f.body);
        fs.writeFileSync(OUT_QUOTE, quoteBody);

        // 통짜로 만들던 시절 파일이 남아 있으면 지운다
        const old = path.join(__dirname, 'public', 'champion_lore.json');
        if (fs.existsSync(old)) { fs.unlinkSync(old); console.log('      (옛 champion_lore.json 삭제)'); }

        console.log('      → ' + OUT_LORE_DIR + '\\<챔피언>.json');
        console.log('      → ' + OUT_QUOTE);
    } else {
        console.log('      (미리보기 — 저장하려면 --write)');
    }
}

main().catch(e => { console.error('실패:', e.message); process.exit(1); });
