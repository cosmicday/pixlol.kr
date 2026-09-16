# e스포츠 탭 — 대회 일정 · 순위표 (2026-09-16 신설)

`/esports` · `/esports/<리그 slug>`. 그전까지 `showComingPage()` 로 「준비 중」이던 자리를 채웠다.
**사용자 결정 셋**: ① 소스는 lolesports + 위키 폴백 ② 주요 리그 11개 ③ 일정 + 순위표.

## 어디를 고쳤나

| 파일 | 무엇 |
|---|---|
| `server.js` | `esportsCacheSchema`(창고) · `ESPORTS_LEAGUES` 표 · `/api/esports/schedule` · `/api/esports/standings` · `want` 에 인덱스 한 줄 |
| `public/app.js` | `showEsports(league)` · `renderEsports` · `esportsMatchHtml` · `loadEsportsStandings` · 칩 위임 리스너 · **라우터 두 곳** |
| `public/style.css` | `.es-*` 한 벌 + `#esports-container` (769px 이상 본문 폭 목록에도 추가) |
| `public/index.html` | `#esports-container` 에서 `dogu-doc` 제거 (준비 중 문서 상자의 패딩이었다) |

## ★★★ 소스 — lolesports 가 자기 프론트에서 쓰는 API

```
https://esports-api.lolesports.com/persisted/gw/...
헤더 x-api-key: 0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z   ← 웹에 박혀 있는 공개 고정값
```

- **라이엇 개발자 키와 무관하다** — 프로덕션 키 심사·우리 호출 예산과 아무 상관이 없다
- `hl=ko-KR` 로 주면 **리그명·지역·차수(`플레이오프`·`결승`·`7주 차`)가 전부 한국어로 온다**
- 쓰는 엔드포인트 넷: `getLeagues`(리그 48개) · `getSchedule` · `getTournamentsForLeague` · `getStandings`
- **팀 로고가 `http://static.lolesports.com/...` 로 온다** — 그대로 걸면 mixed content 로 막힌다.
  `esportsImg()` 가 https 로 바꾼다 (https 로도 200 인 걸 실측)
- **공식 문서가 있는 API 가 아니다.** 언제든 모양이 바뀌거나 막힐 수 있어서 **성공한 응답을 DB 에 박아 둔다** (아래 창고)

### ★★ 안 되는 길 — Leaguepedia(Fandom). 다시 시도하지 말 것

사용자가 「lolesports + 위키 폴백」을 골라서 먼저 재 봤는데 **익명으로는 못 쓴다** (2026-09-16 실측):

| 길 | 결과 |
|---|---|
| `lol.fandom.com/api.php?action=cargoquery` | **무조건 `ratelimited`** — 12초·30초 간격으로 다시 걸어도 같다 |
| `index.php?title=Special:CargoExport` | **Cloudflare 403** (「Just a moment…」 챌린지) |
| 브라우저 UA 로 위 둘 | 똑같다 |
| `action=query&meta=siteinfo` | **200** — 기본 MediaWiki API 는 살아 있고 **Cargo 만** 막혀 있다 |

뚫으려면 계정 + `Special:BotPasswords` 가 필요하다. **그래서 폴백을 「성공한 응답 박제」로 잡았다** —
PBE 노트 창고(`pbenotes`)와 같은 문법이다.

## 창고 폴백 (`esportscaches`)

- 문서 열쇠는 `schedule` 과 `standings_<슬러그>`. **메모리(`lastGoodEsports`)가 먼저이고, 비었으면(배포 직후) DB 가 받는다**
- 소스가 막히면 창고 값을 `stale: true` 로 주고, 화면이 **「9월 16일 11:39에 받아 둔 내용입니다」** 줄을 띄운다
- **빈 순위표는 창고에 안 덮어쓴다** (`if (groups.length)`) — 대회가 바뀌는 순간 쓸 만한 옛 값을 잃지 않게
- 실측 크기: `schedule` **34.4KB** · `standings_*` 각 **1.6KB** → 리그 11개를 다 받아도 **57KB**. 용량 손잡이에 안 걸린다
- **실측 검증 (주소를 `.invalid` 로 깨서)**: 일정 `stale: true` + 80경기 그대로 · 순위표 `stale: true` + 2그룹 ·
  창고에 없는 리그는 **503**

## 리그 11개 (`ESPORTS_LEAGUES`)

`worlds · msi · first_stand · lck · lck_challengers_league · kespa_cup · lpl · lec · lcs · lcp · ewc_lol`

- **주소·칩의 열쇠는 `slug`** 다 (`/esports/lck`). `id` 는 lolesports 내부 번호, `short` 만 우리가 칩 폭에 맞춰 줄인 것
- **콤마로 한 번에 묻는다** (`leagueId=a,b,c`) — 한 페이지 **80경기**에 앞뒤 3주가 다 들어온다.
  `pages.newer` 가 null 이면 그게 등록된 마지막 경기다 (실측 2026-09-16 에 10/4 까지)
- 전체 48개 중 고른 것이다. 늘리려면 이 표에 줄만 더하면 된다 — 화면은 서버가 준 `leagues` 로 칩을 그리므로 **프론트 수정 0**

## ★★★ `ordinal` 을 순위로 믿으면 안 된다 (제일 중요한 함정)

`getStandings` 의 `rankings[].ordinal` 은 **리그마다 뜻이 다르다.**

| 리그 | ordinal 순서 | 승패와 |
|---|---|---|
| LEC 정규 리그 | 1.KC(9-0) 2.VIT(7-2) 3.G2(6-3) … | **맞는다** |
| LCS · LPL | 같은 꼴 | **맞는다** |
| **LCK 그룹** | 1.GEN(5-3) 2.HLE(4-4) 3.T1(3-5) **4.DK(6-2)** 5.KT(2-6) | **어긋난다** |
| **LCK CL 그룹** | 1.T1A(5-3) **2.DK(6-2)** … / 라이즈: **4.KRX(2-6) 5.DNS(5-3)** | **어긋난다** |

레전드/라이즈 그룹의 ordinal 은 **순위가 아니라 그룹 배정 시드**다. 그대로 그리면
「1위 5승 3패 · 4위 6승 2패」 같은 줄이 나온다 (실제로 첫 판에 그렇게 나왔고 사용자에게 보이기 전에 잡았다).
`getStandingsV3` 도 **같은 값**을 준다 — 다른 엔드포인트로 피할 수 없다.

**고친 방식**: 승률이 내림차순인지 보고 **어긋날 때만** 승-패로 다시 매긴다.
- 이미 맞는 리그는 **손대지 않는다** — 원본이 세트 득실 같은 타이브레이크까지 반영한 값이라 우리 정렬이 오히려 나쁘다
  (LEC 의 `4.GX(5-4) 5.NAVI(5-4)` 가 그 예 — 우리가 매기면 공동 4위가 돼 정보가 준다)
- 다시 매긴 경우 동률은 **공동 순위**이고 `resorted: true` 가 붙는다 → 화면이 각주를 띄운다
- 실측: LCK 레전드 `1.DK(6-2) 2.GEN(5-3) 3.HLE 4.T1 5.KT` · 라이즈 `1.NS 1.DNS 3.BRO 3.BFX 5.KRX` · LEC `resorted false`

**★ 교훈 (다른 바깥 API 에도 해당)**: 남이 준 「순위」 필드는 **같은 응답 안의 다른 필드(승패)와 일관되는지 대조하고 쓴다.**
표본 하나(LCK)만 보고 「API 가 틀렸다」고 단정하지도 말 것 — 네 리그를 재 보니 **절반은 맞았다.**

## 화면

```
[제목 e스포츠            일정 제공 · lolesports]
[칩 12개: 전체 · 월즈 · MSI · 퍼스트 스탠드 · LCK · LCK CL · 케스파컵 · LPL · LEC · LCS · LCP · EWC]
(소스가 막혔으면 여기에 「…에 받아 둔 내용입니다」 한 줄)
[예정된 경기]  날짜 머리글 + 경기 카드   ← 오름차순, 오늘/내일/어제는 글자로
[지난 경기]    날짜 머리글 + 경기 카드   ← 내림차순, 20개씩 「더 보기」
[순위표]       리그를 고른 경우만. 그룹마다 표 하나
```

- **경기 카드 = `[시간] [왼팀] [스코어/VS] [오른팀] [리그·차수·BO]`**.
  양쪽을 `1fr` 로 둬야 가운데 축이 카드 정중앙에 선다 — flex 로 두면 이름 길이 때문에 줄마다 축이 흔들린다
- **팀 이름을 두 벌 넣고 CSS 가 고른다** (`.es-name-full` / `.es-name-code`) — 폰에서 "Hanwha Life Esports" 는 칸을 뚫는다
- 카드를 누르면 **그 리그 lolesports 페이지**로, 진행 중이면 **라이브**로 나간다
  (`/ko-KR/leagues/<slug>` · `/ko-KR/live/<slug>` — 둘 다 200 실측. `/schedule?leagues=` 는 308 로 leagues 로 넘어간다)
- **★ 칩에 `white-space: nowrap`** — 안 막으면 폰에서 `퍼스트 스탠드`·`케스파컵` 이 칩 **안에서** 세로로 쪼개진다
- **★ `.stats-table` 을 재사용하면 nth-child 폭(7칸 기준)이 딸려온다** — 4칸짜리는 `.stats-table.es-table` 로
  **한 단 올려** 덮는다 (같은 특이성이면 순서 싸움이 된다). 조합 표에서 이미 걸린 함정과 같은 자리
- **★ 아직 대진이 안 나온 대회는 화면이 통째로 빈다** — 월즈 2026 이 그렇다(10/20~11/20).
  순위표 자리에 **「다음 대회 · 2026년 10월 20일 ~ 11월 20일 예정」**을 대신 그린다
- 캐시: 일정 **5분**(진행 중 경기가 있으면 **1분** — 세트 스코어가 경기 중에 올라간다) · 순위표 **30분**

## 주소 규칙 (실측 확인)

메뉴 진입만 `pushState`, 리그 칩은 `replaceState` — 사이트 규칙 그대로다.

| 걸음 | 주소 | 이력 |
|---|---|---|
| 홈 | `/` | 2 |
| 헤더 e스포츠 | `/esports` | **3** |
| LCK 칩 | `/esports/lck` | 3 (그대로) |
| 월즈 칩 | `/esports/worlds` | 3 (그대로) |
| 뒤로 1번 | **`/`** | — |
| 주소로 직접 `/esports/lck` | LCK 활성 · 13경기 | — |
| 랭킹 갔다 뒤로 | **`/esports/lck` + LCK 활성** | — |

- 없는 slug 로 들어오면 전체로 되돌리고 주소도 `/esports` 로 고친다
- **라우터는 진입부 `pathParts` 와 `popstate` 두 곳을 같이 고쳤다** (반복 함정 1번)

## 실측 (2026-09-16)

- 데스크톱 1400 · 폰 390 에서 **넘침 0 · 콘솔 오류 0** (`/esports` · `/esports/lck` · `/esports/worlds`)
- 회귀 확인: 홈·랭킹·통계·패치노트·도감·신화상점·챔피언·조합·방송 **10개 주소 × 2폭 = 넘침 0**
- 응답 35KB(일정) — 압축되면 훨씬 작다
- 이벤트는 전부 `type: 'match'` 였지만 **방송 쇼(`type: 'show'`)가 섞일 수 있어** 서버가 거른다

## 남은 것 · 안 넣은 것

- **결과 가리기(스포일러) 토글은 안 넣었다** — 요청 밖이다. 데이터에는 `flags: ['isSpoiler']` 가 온다
- **팀 로스터 → `/summoner` 링크**(기능 감사 F8 최소판)는 그대로 미정. 이 페이지가 생겼으니 재고할 수 있다
- **TBD 경기가 꽤 보인다** (LPL 대표 선발전·LCS 플레이오프) — 원본이 그렇다. 우리가 할 수 있는 게 없다
- 방송(`/broadcast`)은 **그대로 준비 중**이다
