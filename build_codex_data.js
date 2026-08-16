// ==========================================
// 도감 데이터 생성  →  public/codex_data.js
//   아이템 · 룬 · 소환사 주문의 한국어 이름/설명/수치/조합식을 한 파일로 묶는다.
//
// ★★ 세 소스 모두 "지금 협곡에 없는 것" 이 잔뜩 섞여 있다. 거르는 규칙이 각각 다르다:
//
//   아이템  DD item.json 868개 → **maps['11'] && gold.purchasable !== false** → 254개
//     ★ CD items.json 의 `inStore` 를 쓰면 안 된다. 696개가 나오는데 흑요석 검(아레나)·
//       수호자의 부적(칼바람)·"퀘스트: 상단" 같은 **다른 모드 아이템이 442개** 섞인다.
//       DD 필터 결과가 CD inStore 의 정확한 부분집합인 것까지 확인했다 (DD 만 있는 것 0개).
//
//   룬      CD perks.json 103개 → **perkstyles.json 슬롯에 등장하는 것만** → 69개
//     ★ 나머지 34개는 삭제된 옛 룬이다. perks.json 은 그것들을 그대로 들고 있다.
//
//   주문    DD summoner.json 34개 → **modes 에 CLASSIC** → 9개
//     ★ 나머지는 칼바람 표식·아레나·우르프용이다.
//
//   (stringtable 에 구버전이 섞여 있던 것과 같은 종류의 함정이다 — CLAUDE.md 참고)
//
// ★ 설명 안의 <passive>·<magicDamage> 같은 태그는 **챔피언 스킬 툴팁과 같은 계열**이라
//   app.js 의 TOOLTIP_STYLE_CSS 를 그대로 쓴다. 36종 중 31종이 이미 실측 색을 갖고 있었다.
//
// 패치가 오면 다시 돌린다. 런타임 의존은 없다.
// ==========================================
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const DD_VER = process.env.DD_VER || '16.16.1';
const DD = `https://ddragon.leagueoflegends.com/cdn/${DD_VER}/data/ko_KR`;
const CD = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/ko_kr/v1';
const WRITE = process.argv.includes('--write');

async function getJson(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    return res.json();
}

(async () => {
    const [ddItem, ddSumm, perks, perkStyles] = await Promise.all([
        getJson(`${DD}/item.json`),
        getJson(`${DD}/summoner.json`),
        getJson(`${CD}/perks.json`),
        getJson(`${CD}/perkstyles.json`)
    ]);

    // ── 아이템
    const all = ddItem.data;

    // ★★ maps['11'] 만으로는 부족하다 — **다른 모드용 사본이 39개 딸려온다** (2026-08-16).
    //   `322065 슈렐리아의 군가`(2600G)처럼 **협곡 원본(2065, 2200G)과 이름이 같은 6자리 id** 가
    //   섞여서 도감에 같은 아이템이 두 번 나왔다. 이름이 겹치는 게 27종이었다.
    //
    //   ★ 가르는 규칙: **사본은 `maps` 에서 11만 true 이고 나머지가 전부 false 다.**
    //     진짜 협곡 아이템은 12·21·35·453 도 함께 true 다. 39개가 정확히 걸리고
    //     정상 아이템은 하나도 안 걸린다 (대표 20종 전수 확인).
    //
    //   ★ "CD 아이콘 파일명 앞 숫자가 자기 id 와 다르면 사본" 이라는 규칙도 써 봤는데
    //     **정상 아이템 7개를 같이 잡아서 버렸다** (폭풍갈퀴 3097 · 수호자의 망치 3184 ·
    //     추적자의 팔목 보호대 2420 · 지배자의 피갑옷 2501 등은 아이콘을 남의 번호로 쓴다).
    //
    //   ★ 짝이 없는 13개(아트마의 심판·가고일 돌갑옷·도박꾼의 칼날 등)도 지우는 게 맞다.
    //     원본 id 를 찾아보면 `3193 가고일 돌갑옷` 은 `maps11=false, purchasable=false` 고
    //     `7101 도박꾼의 칼날` 은 DD 에 아예 없다 — **협곡에서 빠졌고 아레나에만 있는 것들**이다.
    const isOtherModeClone = (i) => {
        const m = all[i].maps || {};
        return m['11'] && !Object.entries(m).some(([k, v]) => k !== '11' && v);
    };

    const liveIds = Object.keys(all).filter(i =>
        all[i].maps?.['11'] && all[i].gold?.purchasable !== false && !isOtherModeClone(i));

    const items = {};
    liveIds.forEach(i => {
        const x = all[i];
        items[i] = {
            n: x.name,
            d: x.description || '',
            p: x.plaintext || '',
            g: x.gold.total,
            s: x.gold.sell,
            // 조합 재료 / 이 아이템이 들어가는 상위 아이템. 화면이 목록 안에서만 걸으므로
            // **표에 없는 id 는 버린다** (다른 모드 전용 상위 아이템이 딸려올 수 있다).
            f: (x.from || []).map(Number).filter(id => liveIds.includes(String(id))),
            t: (x.into || []).map(Number).filter(id => liveIds.includes(String(id))),
            g2: x.tags || [],
            dp: x.depth || 1,
            // 검색 별칭. 라이엇이 넣어 둔 것이라 "인피"·"똥신" 같은 별명이 그대로 있다
            c: (x.colloq || '').split(';').filter(Boolean).join(' '),
            // ★ 챔피언 전용 아이템(오른 등)만 채운다. 칼리스타의 칠흑의 창은
            //   칼리스타용(3599)과 실라스용(3600)이 **이름이 같아서** 이게 없으면 구분이 안 된다.
            rc: x.requiredChampion || ''
        };
    });

    // 조합 재료가 표 안에 다 있는지 (트리를 그릴 수 있는가)
    let brokenFrom = 0;
    Object.values(items).forEach(it => it.f.forEach(f => { if (!items[f]) brokenFrom++; }));

    // ── 룬. perkstyles 슬롯이 "지금 쓰이는 목록" 이다
    const runes = {};
    const styles = {};
    perkStyles.styles.forEach(st => {
        styles[st.id] = { n: st.name, i: st.iconPath };
        st.slots.filter(sl => sl.type !== 'kStatMod').forEach((sl, slotIdx) => {
            sl.perks.forEach(pid => {
                const p = perks.find(x => x.id === pid);
                if (!p) return;
                runes[pid] = {
                    n: p.name,
                    s: p.shortDesc || '',
                    d: p.longDesc || '',
                    i: p.iconPath,
                    st: st.id,
                    sl: slotIdx           // 0 = 키스톤
                };
            });
        });
    });
    // 스탯 파편도 도감에 넣는다 (룬 페이지의 일부다)
    const shards = {};
    perkStyles.styles[0].slots.filter(sl => sl.type === 'kStatMod').forEach((sl, i) => {
        sl.perks.forEach(pid => {
            const p = perks.find(x => x.id === pid);
            if (p && !shards[pid]) shards[pid] = { n: p.name, s: p.shortDesc || '', d: p.longDesc || '', i: p.iconPath, row: i };
        });
    });

    // ── 소환사 주문
    const spells = {};
    Object.values(ddSumm.data)
        .filter(s => s.modes.includes('CLASSIC'))
        .sort((a, b) => Number(a.key) - Number(b.key))
        .forEach(s => {
            spells[s.key] = {
                n: s.name,
                d: s.description,
                cd: s.cooldownBurn,
                r: s.rangeBurn,
                lv: s.summonerLevel,
                i: s.image.full
            };
        });

    const data = { v: DD_VER, items, runes, styles, shards, spells };
    const body = JSON.stringify(data);
    const out = `// 자동 생성 — build_codex_data.js (${new Date().toISOString().slice(0, 10)}, DD ${DD_VER})
// 도감 탭 데이터. 아이템·룬·소환사 주문의 한국어 이름/설명/수치/조합식.
// 손으로 고치지 말 것 — 패치 때 다시 생성된다. 거르는 규칙은 build_codex_data.js 주석 참고.
const codexData = ${body};
`;

    console.log(`아이템 ${Object.keys(items).length}개 (전체 ${Object.keys(all).length}개 중)`);
    const byDepth = {};
    Object.values(items).forEach(x => byDepth[x.dp] = (byDepth[x.dp] || 0) + 1);
    console.log(`  등급별: ${Object.entries(byDepth).map(([k, v]) => `depth${k} ${v}개`).join(' / ')}`);
    console.log(`  조합 재료 누락: ${brokenFrom}건`);
    const tagCount = {};
    Object.values(items).forEach(x => x.g2.forEach(t => tagCount[t] = (tagCount[t] || 0) + 1));
    console.log(`  태그: ${Object.entries(tagCount).sort((a, b) => b[1] - a[1]).map(([k, v]) => k + ':' + v).join(' ')}`);
    console.log(`룬 ${Object.keys(runes).length}개 (perks.json ${perks.length}개 중) / 계열 ${Object.keys(styles).length} / 파편 ${Object.keys(shards).length}`);
    console.log(`소환사 주문 ${Object.keys(spells).length}개 (전체 ${Object.keys(ddSumm.data).length}개 중)`);
    console.log(`\n크기 ${(Buffer.byteLength(out) / 1024).toFixed(0)}KB  gzip ${(zlib.gzipSync(Buffer.from(out), { level: 9 }).length / 1024).toFixed(0)}KB  brotli ${(zlib.brotliCompressSync(Buffer.from(out)).length / 1024).toFixed(0)}KB`);

    if (WRITE) {
        const dest = path.join(__dirname, 'public', 'codex_data.js');
        fs.writeFileSync(dest, out);
        console.log(`→ ${dest}`);
    } else {
        console.log('(--write 를 붙여야 파일을 만든다)');
    }
})().catch(e => { console.error(e); process.exit(1); });
