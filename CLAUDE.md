# pixlol.kr

롤 전적검색 사이트. 한국어로 대화해줘. 평서형 "~다" 말투 말고 "~야/~어" 쪽으로.

## 스택 / 배포

- Node/Express + MongoDB Atlas(무료 512MB) + Railway + Cloudflare
- 프론트는 바닐라 JS. `public/` 안에 `app.js` / `index.html` / `style.css`
- `server.js`는 `public/` 밖, 프로젝트 루트에 있음
- GitHub `cosmicday/pixlol.kr` — push하면 Railway가 자동배포
- 로컬은 `node server.js` → localhost:3000

## 절대 건드리지 말 것

- **`riot.txt`** — 라이엇 도메인 소유 확인 파일. 프로덕션 키 심사 중이라 없으면 문제가 생김
- **`.env`** — API 키. git에 올라가면 안 됨
- 라이엇 프로덕션 키가 Pending Review 상태(2026-03-10 신청). 앱을 크게 수정하면 심사 대기열 뒤로 밀림

## 작업 규칙

- **파일을 고치기 전에 먼저 읽고 설명해줘.** 내가 납득한 뒤에 수정하는 순서로.
- 문제를 알려줄 때는 "문제되는 코드 → 왜 문제인지 → 해결법" 순서로. 코드부터 던지지 말고.
- `git add -A`는 쓰지 마. 루트에 백업 파일이랑 실험용 스크립트가 있어서 딸려감. 경로를 지정해서 add할 것.
- `fill_values.js --write` 돌리기 전에 `public/custom_values.js`를 백업해줘.
- **인게임 툴팁 확인은 내가 해.** 수치가 맞는지 추측하지 말고, 확인이 필요하면 나한테 물어봐.

## CD 스킬 데이터 작업 (현재 주 작업)

### 구조

- `public/custom_templates.js` = 문장, `public/custom_values.js` = 수치. `index.html`이 직접 로드
- 문장 안 빈칸은 `{p1}` `{p2}` 형식
- `v1`·`v2`는 구분선 아래 피해량 줄 (p랑 역할이 다름). 지금 전부 비어 있고 직접 작성 대상
- `stats`는 객체 형식 `{ "사거리": "300" }`

### 스크립트 (전부 프로젝트 루트)

| 파일 | 역할 |
|---|---|
| `build_champion_data.js` | 문장·쿨타임·소모값·사거리 생성 |
| `fill_values.js` | 수치 채움. `--write` 붙일 때만 파일 생성 |
| `check_data_sources.js` | 확인 전용 |
| `probe_spell_fields.js` | 확인 전용 |

`fill_values.js` 안의 표 두 개가 중요해:

- **`MANUAL`** — `"미스 포츈 W / LoveTapRefund"` 형식 키. 손으로 확인한 값을 적으면 자동 추출보다 우선하고 재실행해도 안 날아감. 영문 alias도 허용. 안 쓰인 키는 오타 경고로 잡힘. 현재 5건
- **`PRESERVE`** — `['Garen','Galio']`. 여기 있는 챔피언은 재실행 때 값이 안 날아감

`--write`는 `public/custom_values.new.js`를 만들어. 확인한 뒤에 `custom_values.js`로 이름을 바꿔야 반영돼.

### 폴백 동작

`app.js`의 `renderScalingTable`에 ? 가드가 있어. p 값이 하나라도 `""`나 `"?"`면 **문장을 통째로 버리고** Data Dragon 툴팁으로 폴백해.

문제는 DD 툴팁도 깨져 있는 경우가 있다는 거야. 말파이트 W가 그 예로, DD 한국어 툴팁에 `[스탯 비례]`랑 `%i:OnHit%` 같은 미해결 토큰이 그대로 들어 있어서 폴백해도 흉하게 나와. 그래서 **폴백에 기대지 말고 MANUAL로 채우는 게 근본 해결**이야.

### 알아낸 규칙 (다시 알아내지 말 것)

- `mStat` 필드 생략 = 주문력 (오공 E로 검증)
- `mStat` 값: 2 = 공격력, 4 = 공격 속도, 18 = 생명력 흡수, 29 = 물리 관통력
- `mStatFormula`가 총/기본/추가를 가름: 없음·0 = 총, 1 = 기본, 2 = 추가
- `DataValues` 배열은 0번이 쓰레기라 **1번부터** 읽어야 함
- `castRange`·`mana` 등 최상위 필드는 **0번부터**가 맞음
- `AmmoRechargeTime` 계열도 0번이 "스킬 안 찍은 상태"라 1번부터 (티모 R 35/30/25, 케이틀린 W 26/22/18/14/10로 검증)
- bin의 `cooldownTime`은 한 칸 밀린 듯해서 CD v1의 `cooldownCoefficients`를 씀
- 사거리는 내부값(럭스 Q가 10000으로 나옴) 대신 `castRangeDisplayOverride`를 씀
- **라이엇이 툴팁 철자랑 bin 철자를 따로 관리해서 대소문자가 자주 어긋남.** 22종 발견 (`HoTDuration`→`HotDuration`, `EnergyRefund`→`energyrefund` 등). 계산식 안쪽 참조에서도 같은 일이 생기고, 조각 하나가 null이면 계산식 전체가 죽음
- **"스킬 쿨타임으로 추론" 휴리스틱은 신뢰도가 낮음.** 4건 중 2건이 오답이었어. 필드 이름이 쿨타임 자체가 아니라 환급·감소·제한 시간을 뜻하면 틀려. 이 목록은 매번 전수 검수할 것

### 현재 상태

- 2474/2487 (99%) 채워짐
- 못 채운 12개는 전부 `f1`/`f2` 계열. 범용 이름을 본체로만 한정한 대가라 의도된 동작이고 MANUAL 대상
- 계수 미해결 1개: 진 E (`AmmoRechargeRateTooltip` — 툴팁에 `mStat 10` 항이 안 나와서 역산 불가)
- **DD 폴백 중인 스킬 11개**: 말파이트 W, 바드 W, 벨베스 Q·E, 세트 W, 신 짜오 E, 신드라 W, 아펠리오스 R, 진 E, 카이사 Q·E

### 남은 일

1. DD 폴백 11개 스킬의 `f1`/`f2`를 MANUAL로 채우기 (제일 우선)
2. 패시브 173개 — CD에 `dynamicDescription`이 없어서 요약문만 들어감. `{p}` 자리가 아예 없어 자동화 경로가 없음. 직접 작성 대상
3. `v1`·`v2` 직접 작성
4. 스킬 설명 색 일괄 적용. 기준은 "피해 종류" (물리 주황 / 마법 하늘 / 회복 초록)
5. `STAT_NAMES` 표가 대부분 추정값이라 이미 들어간 스탯 이름도 틀렸을 수 있음
6. 파일 정리 — `public/custom_templates.bak.js`, `public/custom_values.bak.js`(둘 다 배포되면 웹에서 받아짐), `fill_values.old.js`, `custom_values.js.bak-0808`, `로고였던것.png`, 루트 `lulubackground.webp`. `database.sqlite`는 `server.js`가 참조하는지 확인하고 판단
