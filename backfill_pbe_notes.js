// ==========================================
// PBE 패치 미리보기 글 백필  →  MongoDB `pbenotes`
//
//   ★★ 왜 필요한가 — 우리가 읽는 RSS(nitter·xcancel)는 **최근 20글**만 준다.
//     그중 `Patch NN.NN … Preview` 는 8건뿐이라 화면이 두 달치밖에 못 보여줬다.
//     서버는 2026-08-27 부터 본 글을 `pbenotes` 에 적어 두지만, **과거는 그렇게 안 채워진다.**
//     이 스크립트가 그 과거분을 한 번에 넣는다.
//
//   ★★ 어떻게 되는가 (2026-08-27 조사 결과 — 막힌 길은 아래 "안 되는 것" 참고):
//     ① 웨이백 머신 CDX 로 이 계정의 **아카이브된 트윗 주소**를 모은다 (실측 783개, 2017~2026)
//     ② `cdn.syndication.twimg.com/tweet-result?id=…` 가 **인증 없이 본문을 준다** (774/783 성공)
//     ③ 첫 줄이 `Patch NN.NN … Preview` 인 글만 골라 upsert
//     실측 결과: **Preview 59건 · 패치 37종 · 2024-10-01(14.20) ~ 2026-08-19(26.17)**
//     (못 찾은 패치: 25.1 · 25.2 · 25.3 · 25.15 · 25.20 · 26.1 — 아무도 그 트윗을 아카이브 안 했다)
//
//   ★ 안 되는 것 (다시 시도하지 말 것):
//     · 니터·xcancel **프로필 HTML / 검색** — 빈 페이지·403. poast·privacydev 는 도메인이 없어졌다
//     · `syndication.twitter.com/srv/timeline-profile` — **2025-11-17 에 얼어붙었다** (100글, Preview 14건)
//     · 웨이백에 저장된 **트윗 페이지 자체** — "JavaScript is not available" 벽이라 본문이 없다
//     · 레딧 검색 API — 인증 없이는 결과가 0이다
//
//   ★ 한 번만 돌리는 작업이다. 783번 요청에 2분쯤 걸리므로 서버가 상시로 할 일이 아니다.
//     평소에는 서버가 30분마다 읽는 RSS 로 새 글만 쌓는다 (추가 부하 0).
//   ★ `tweet-result` 는 문서에 없는 뒷문이라 언제 막혀도 이상하지 않다. 백필 한 번에만 쓰므로
//     막히면 이 스크립트만 못 돌 뿐 화면·서버는 그대로다.
//
// 쓰는 법:
//   node backfill_pbe_notes.js            # 훑어서 몇 건인지만 본다 (DB 안 건드림)
//   node backfill_pbe_notes.js --write    # `pbenotes` 에 upsert
//   node backfill_pbe_notes.js --write --from cache.json   # 이미 훑어 둔 결과 파일로
// ==========================================
require('dotenv').config();
const fs = require('fs');
const axios = require('axios');
const mongoose = require('mongoose');

const has = (n) => process.argv.includes(n);
const arg = (n) => { const i = process.argv.indexOf(n); return i >= 0 ? process.argv[i + 1] : null; };
const WRITE = has('--write');
const FROM = arg('--from');

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const get = (url, timeout = 20000) =>
    axios.get(url, { timeout, maxRedirects: 5, validateStatus: () => true, headers: { 'User-Agent': UA, 'Accept-Language': 'en' } });
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// 서버와 **같은 규칙**으로 고른다 (server.js 의 parsePbeRss). 한쪽만 고치면 목록이 어긋난다
const PREVIEW_RE = /^Patch\s+(\d+\.\d+)\b(.{0,30}?)Preview/i;

async function collectIds() {
    const ids = new Set();
    for (const dom of ['twitter.com', 'x.com']) {
        for (let t = 0; t < 3; t++) {
            try {
                const url = `http://web.archive.org/cdx/search/cdx?url=${dom}/RiotPhroxzon/status/*` +
                    '&output=json&fl=original&collapse=urlkey&limit=5000';
                const r = await get(url, 90000);
                const rows = Array.isArray(r.data) ? r.data.slice(1) : [];
                rows.forEach(x => {
                    const id = (String(x[0]).match(/status\/(\d+)/) || [])[1];
                    if (id) ids.add(id);
                });
                console.log(`  웨이백 ${dom}: ${rows.length}줄`);
                break;
            } catch (e) {
                console.log(`  웨이백 ${dom} 재시도 ${t + 1}: ${e.message}`);
                await sleep(4000);
            }
        }
    }
    return [...ids].sort();
}

// 트윗 본문 한 건. 실패하면 null (아카이브에만 있고 지금은 지워진 글이 있다)
async function tweetText(id) {
    try {
        const r = await get(`https://cdn.syndication.twimg.com/tweet-result?id=${id}&lang=en&token=a`, 12000);
        if (r.status === 200 && r.data && r.data.text) return r.data;
    } catch (e) { /* 무시 */ }
    return null;
}

(async () => {
    let found;

    if (FROM) {
        found = JSON.parse(fs.readFileSync(FROM, 'utf8'));
        console.log(`${FROM} 에서 ${found.length}건을 읽었다`);
    } else {
        console.log('웨이백에서 트윗 주소를 모으는 중...');
        const ids = await collectIds();
        console.log(`트윗 ${ids.length}개 — 본문을 확인한다 (2분쯤)`);

        found = [];
        let ok = 0, miss = 0, i = 0;
        const worker = async () => {
            while (i < ids.length) {
                const id = ids[i++];
                const t = await tweetText(id);
                if (t) {
                    ok++;
                    const text = String(t.text).replace(/\s+/g, ' ');
                    const m = text.match(PREVIEW_RE);
                    if (m) found.push({
                        tid: id,
                        patch: m[1],
                        detail: /full/i.test(m[2]),
                        url: `https://x.com/RiotPhroxzon/status/${id}`,
                        date: new Date(t.created_at).toISOString()
                    });
                } else miss++;
                await sleep(80);
            }
        };
        await Promise.all(Array.from({ length: 4 }, worker));
        console.log(`본문 받은 것 ${ok} · 못 받은 것 ${miss}`);
    }

    found.sort((a, b) => new Date(b.date) - new Date(a.date));
    const patches = [...new Set(found.map(x => x.patch))];
    console.log(`Preview ${found.length}건 · 패치 ${patches.length}종 · ` +
        `${found[found.length - 1]?.date.slice(0, 10)} ~ ${found[0]?.date.slice(0, 10)}`);

    if (!WRITE) {
        console.log('\n--write 를 주면 pbenotes 에 넣는다. 지금은 안 넣었다.');
        found.slice(0, 5).forEach(x => console.log(`  · ${x.date.slice(0, 10)} 패치 ${x.patch} ${x.detail ? '[상세]' : '[간단]'}`));
        return;
    }

    await mongoose.connect(process.env.MONGO_URI);
    const col = mongoose.connection.db.collection('pbenotes');
    const before = await col.countDocuments();
    const ops = found.map(n => ({
        updateOne: {
            filter: { tid: n.tid },
            update: { $set: { tid: n.tid, patch: n.patch, detail: n.detail, url: n.url, date: new Date(n.date) } },
            upsert: true
        }
    }));
    const r = await col.bulkWrite(ops, { ordered: false });
    const after = await col.countDocuments();
    console.log(`pbenotes: ${before} → ${after}행 (새로 ${r.upsertedCount} · 갱신 ${r.modifiedCount})`);
    await mongoose.disconnect();
})().catch(e => { console.error('실패:', e.message); process.exit(1); });
