// ============================================================
// 챔피언 bin(.bin.json) 로컬 캐시
// ------------------------------------------------------------
//  ★ 왜 필요한가
//     `fill_values.js` 와 `build_champion_data.js` 는 챔피언 173명의 bin 을
//     **매번 새로 받아온다.** 한 번 도는 데 1~2분이 걸려서, 표를 한 줄 고치고
//     결과를 확인하는 짧은 반복이 통째로 느려진다 (2026-08-10에 10번 넘게 돌렸다).
//     bin 은 패치 때나 바뀌므로 캐시해도 안전하다.
//
//  ★ 규칙은 `stringtable.js` 와 똑같이 맞춘다
//     - `.cache/` 아래에 저장 (gitignore 대상)
//     - 7일 지나면 자동으로 다시 받는다
//     - `--refresh` 를 붙이면 무조건 새로 받는다
//     - 받기에 실패했는데 오래된 캐시가 있으면 **그거라도 쓴다**
//       (라이엇/CD 가 잠깐 죽어도 작업이 멈추지 않게)
// ============================================================

const fs = require('fs');
const path = require('path');

const CACHE_DIR = path.join(__dirname, '.cache', 'bin');
const TTL_MS = 7 * 24 * 60 * 60 * 1000;   // 7일
const REFRESH = process.argv.includes('--refresh');

let hit = 0, miss = 0, stale = 0;

const fileOf = (alias) => path.join(CACHE_DIR, `${String(alias).toLowerCase()}.json`);

// url 에서 받아오되 캐시를 먼저 본다. 반환값은 **파싱된 객체**다.
async function getBin(url, alias) {
    const f = fileOf(alias);

    if (!REFRESH && fs.existsSync(f)) {
        const ageMs = Date.now() - fs.statSync(f).mtimeMs;
        if (ageMs < TTL_MS) {
            try { const o = JSON.parse(fs.readFileSync(f, 'utf8')); hit++; return o; }
            catch { /* 깨진 캐시는 무시하고 다시 받는다 */ }
        }
    }

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(String(res.status));
        const raw = await res.text();
        const o = JSON.parse(raw);            // 파싱까지 되는 것만 캐시에 넣는다
        fs.mkdirSync(CACHE_DIR, { recursive: true });
        fs.writeFileSync(f, raw, 'utf8');
        miss++;
        return o;
    } catch (e) {
        // 받기 실패 — 오래됐어도 캐시가 있으면 그걸 쓴다
        if (fs.existsSync(f)) {
            try { const o = JSON.parse(fs.readFileSync(f, 'utf8')); stale++; return o; } catch { }
        }
        throw e;
    }
}

// 이번 실행에서 캐시를 얼마나 썼는지. 스크립트 끝에서 한 줄 찍는 용도.
const cacheStats = () => ({ hit, miss, stale, fromCache: hit + stale });

// 캐시에서 나왔는지(= 네트워크를 안 탔는지). 챔피언 사이 대기시간을 건너뛸 때 쓴다.
const lastWasCached = () => cacheStats().fromCache > 0;

module.exports = { getBin, cacheStats, CACHE_DIR };
