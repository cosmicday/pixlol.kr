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
// ★ 둘로 나눈다. 배경 전문은 980KB 라 **배경 탭을 열 때만** 받고,
//   대사는 20KB 밖에 안 되니 챔피언 데이터와 같이 미리 받아 즉시 뜨게 한다.
const OUT_LORE = path.join(__dirname, 'public', 'champion_lore.json');
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

    const lore = {};
    const quotes = {};
    for (const [id, v] of Object.entries(out)) {
        lore[id] = v.lore;
        if (v.quote) quotes[id] = v.author ? { q: v.quote, a: v.author } : { q: v.quote };
    }

    const loreBody = JSON.stringify(lore);
    const quoteBody = '// 자동 생성 — build_champion_lore.js. 직접 고치지 말 것.\n'
        + '// 출처: 라이엇 Universe (biography.quote). q = 대사, a = 말한 사람.\n'
        + 'const championQuotes = ' + JSON.stringify(quotes) + ';\n';

    const kb = s => (Buffer.byteLength(s, 'utf8') / 1024).toFixed(0) + 'KB';

    console.log('[2/2] 결과');
    console.log(`      받은 챔피언  ${done}명 / 실패 ${fail.length}`);
    if (fail.length) console.log('      실패: ' + fail.join(', '));
    console.log(`      배경 길이   중앙값 ${lens[Math.floor(lens.length / 2)]}자 / 최소 ${lens[0]} / 최대 ${lens[lens.length - 1]}`);
    console.log(`      대사 있는 챔피언 ${Object.keys(quotes).length}명`);
    console.log(`      champion_lore.json   ${kb(loreBody)}  (배경 탭 열 때만 받는다)`);
    console.log(`      champion_quotes.js   ${kb(quoteBody)}  (챔피언 데이터와 같이 받는다)`);

    if (WRITE) {
        fs.writeFileSync(OUT_LORE, loreBody);
        fs.writeFileSync(OUT_QUOTE, quoteBody);
        console.log('      → ' + OUT_LORE);
        console.log('      → ' + OUT_QUOTE);
    } else {
        console.log('      (미리보기 — 저장하려면 --write)');
    }
}

main().catch(e => { console.error('실패:', e.message); process.exit(1); });
