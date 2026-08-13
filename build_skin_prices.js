#!/usr/bin/env node
/**
 * build_skin_prices.js — 스킨 가격표를 만든다 → public/skin_prices.js
 *
 * ★ 왜 위키인가: 스킨 가격은 CommunityDragon 에 **없다.**
 *   `rcp-be-lol-game-data` 의 스킨 객체(23개 필드)에 가격 비슷한 게 하나도 없고,
 *   `v1/` 아래 60여 개 json 중 store/catalog 파일도 없다. `rcp-fe-lol-store` 는
 *   UI 에셋(css·png)뿐이다. 가격은 로그인이 필요한 스토어 API 에만 있다.
 *   그래서 롤위키의 `Module:SkinData/data` (Lua 표) 를 쓴다 — 스킨 전체가 한 파일이고
 *   챔피언 숫자키와 스킨 번호가 그대로 들어 있어 CD 와 **정확히 조인된다.**
 *
 * ★ 등급으로 가격을 추측하면 안 된다 (2026-08-13 전수 확인):
 *     kLegendary  1820×123 그런데 **975 가 2개**
 *     kEpic       1350×976 그런데 **975 가 2개**
 *     kUltimate   3250×6   그런데 **2775 가 1개**
 *     kNoRarity   975/520/750/880/790/585/260/390/460/5000/150000 … 제각각
 *   등급→가격 표를 만들면 이 자리들이 전부 틀린다.
 *
 * ★ 신화 정수는 `cost` 가 아니라 `distribution` 에 있다.
 *   프레스티지 스킨은 `cost="Special"` 이고 `distribution="150 Mythic Essence"` 다.
 *
 * 실행: node build_skin_prices.js --write
 */

const fs = require('fs');
const path = require('path');

const WIKI_API = 'https://wiki.leagueoflegends.com/en-us/api.php'
    + '?action=parse&page=Module:SkinData/data&prop=wikitext&format=json';
const CD_SKINS = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/ko_kr/v1/skins.json';

const OUT = path.join(__dirname, 'public', 'skin_prices.js');
const WRITE = process.argv.includes('--write');

// ---------------------------------------------------------------------------
// 위키 Lua 표 파싱
//   들여쓰기가 완전히 일정하다 — 챔피언 2칸 / 챔피언필드 4칸 / 스킨 6칸 / 스킨필드 8칸.
//   그 층수만 보면 되므로 Lua 를 온전히 해석할 필요가 없다.
// ---------------------------------------------------------------------------
function parseSkinData(luaText) {
    const lines = luaText.split(/\r?\n/);
    const byKey = {};
    let champ = null, champKey = null, inSkins = false, skin = null;

    for (const line of lines) {
        let m;

        if ((m = line.match(/^ {2}\["(.+?)"\] = \{$/))) {
            champ = m[1]; champKey = null; inSkins = false; skin = null;
            continue;
        }
        if (!champ) continue;

        if (!inSkins && (m = line.match(/^ {4}\["id"\] = (\d+)/))) {
            champKey = Number(m[1]);
            byKey[champKey] = byKey[champKey] || {};
            continue;
        }
        if (/^ {4}\["skins"\] = \{$/.test(line)) { inSkins = true; continue; }
        if (/^ {4}\}/.test(line)) { inSkins = false; continue; }
        if (!inSkins) continue;

        if ((m = line.match(/^ {6}\["(.+?)"\] = \{$/))) { skin = { wikiName: m[1] }; continue; }
        if (!skin) continue;

        if ((m = line.match(/^ {8}\["id"\] = (\d+)/))) { skin.num = Number(m[1]); continue; }
        if ((m = line.match(/^ {8}\["cost"\] = (.+?),?$/))) {
            const raw = m[1].trim().replace(/,$/, '');
            skin.cost = /^-?\d+$/.test(raw) ? Number(raw) : raw.replace(/^"|"$/g, '');
            continue;
        }
        if ((m = line.match(/^ {8}\["distribution"\] = "(.*?)"/))) { skin.distribution = m[1]; continue; }

        if (/^ {6}\}/.test(line)) {
            if (champKey != null && skin.num != null) byKey[champKey][skin.num] = skin;
            skin = null;
        }
    }
    return byKey;
}

// 값 하나를 화면 문자열로. 숫자면 RP, "N Mythic Essence" 면 신화 정수, 아니면 null.
//   null 은 "파는 물건이 아니다" 라는 뜻이다 (배틀패스·랭크 보상·코드 등).
function priceOf(w) {
    if (!w) return null;
    if (typeof w.cost === 'number') return w.cost;                 // 숫자 = RP
    const me = String(w.distribution || '').match(/^(\d+) Mythic Essence$/);
    if (me) return 'm' + me[1];                                    // "m150" = 150 신화 정수
    return null;
}

async function main() {
    console.log('[1/3] 롤위키 Module:SkinData/data 받는 중...');
    const wikiRes = await fetch(WIKI_API);
    if (!wikiRes.ok) throw new Error('위키 응답 ' + wikiRes.status);
    const lua = (await wikiRes.json()).parse.wikitext['*'];
    console.log('      ' + (lua.length / 1024 / 1024).toFixed(2) + 'MB');

    const wiki = parseSkinData(lua);
    console.log('      챔피언 ' + Object.keys(wiki).length + '명 / 스킨 '
        + Object.values(wiki).reduce((a, o) => a + Object.keys(o).length, 0) + '개');

    console.log('[2/3] CommunityDragon 스킨 목록 받는 중...');
    const cdRes = await fetch(CD_SKINS);
    if (!cdRes.ok) throw new Error('CD 응답 ' + cdRes.status);
    const cd = Object.values(await cdRes.json());

    // CD 스킨 id = 챔피언숫자키 * 1000 + 스킨번호
    const table = {};
    const stat = { rp: 0, me: 0, none: 0 };
    const missing = [];

    for (const s of cd) {
        const key = Math.floor(s.id / 1000), num = s.id % 1000;
        const w = (wiki[key] || {})[num];
        const p = priceOf(w);

        if (p === null) {
            stat.none++;
            if (!w) missing.push(s.name + ' (' + s.id + ')');
            continue;                                   // 값이 없으면 아예 안 싣는다
        }
        (table[key] = table[key] || {})[num] = p;
        if (typeof p === 'number') stat.rp++; else stat.me++;
    }

    console.log('[3/3] 결과');
    console.log('      RP 가격      ' + stat.rp);
    console.log('      신화 정수    ' + stat.me);
    console.log('      가격 없음    ' + stat.none + ' (배틀패스·랭크 보상 등 판매 대상이 아닌 것들)');
    if (missing.length) {
        console.log('      ★ 위키에 항목 자체가 없는 스킨 ' + missing.length + '개: ' + missing.join(', '));
    }

    const body = '// 자동 생성 — build_skin_prices.js. 직접 고치지 말 것.\n'
        + '// 출처: 롤위키 Module:SkinData/data (cost) + CommunityDragon (스킨 id).\n'
        + '// 숫자 = RP, "m150" = 150 신화 정수. 없는 키 = 판매 대상이 아님.\n'
        + 'const skinPrices = ' + JSON.stringify(table) + ';\n';

    if (WRITE) {
        fs.writeFileSync(OUT, body);
        console.log('      → ' + OUT + ' (' + (body.length / 1024).toFixed(1) + 'KB)');
    } else {
        console.log('      (미리보기 — 저장하려면 --write)  크기 ' + (body.length / 1024).toFixed(1) + 'KB');
    }
}

main().catch(e => { console.error('실패:', e.message); process.exit(1); });
