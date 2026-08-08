// ============================================================
//  fill_values.js
//
//  CommunityDragon 의 bin.json 에서 실제 수치를 읽어
//  custom_values.js 의 "?" 자리를 채운다.
//
//  사용법:
//      node fill_values.js            <- 미리보기. 파일을 만들지도 고치지도 않는다.
//      node fill_values.js --write    <- public/custom_values.new.js 생성
//
//  PRESERVE 에 적힌 챔피언은 기존 내용을 그대로 둔다.
// ============================================================

const fs = require('fs');
const path = require('path');
const { loadStringTable, getPassiveTooltip } = require('./stringtable');

const WRITE = process.argv.includes('--write');

// 챔피언 블록을 통째로 안 건드릴 목록.
//   ★ 2026-08-08 비웠다. 가렌·갈리오는 {pN} 체계가 생기기 전 손으로 쓴 옛 형식이라
//     다른 챔피언과 구조가 달랐다 (pN 이 아예 없음). 이제 CD 에서 똑같이 받아온다.
//     손으로 쓴 v1/v2 는 extractVV() 가 원문 그대로 물려주므로 여기 안 적어도 안 날아간다.
const PRESERVE = [];

// @ShieldDuration.1@ / @f2.0@ 처럼 이름 끝에 붙는 ".숫자" 를 어떻게 볼 것인가.
//   true  = 소수점 자릿수로 본다 (1.53 -> ".1" 이면 1.5)
//   false = 그냥 떼어내고 무시한다 (원래 값 그대로)
//   ★ 배열 인덱스로 보는 해석도 있는데, 그러면 ".0" 이
//     "DataValues 0번은 쓰레기" 규칙과 정면으로 부딪힌다. 그래서 자릿수로 본다.
//     결과는 마지막에 목록으로 찍히니 인게임 툴팁과 대조할 것.
const DOT_AS_PRECISION = true;

const CD = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/ko_kr/v1';
const BIN = 'https://raw.communitydragon.org/latest/game/data/characters';

const PUBLIC_DIR = path.join(__dirname, 'public');
const SRC_VALUES = path.join(PUBLIC_DIR, 'custom_values.js');
const OUT_VALUES = path.join(PUBLIC_DIR, 'custom_values.new.js');

const DELAY = 150;

// 미리보기에서 스킬 값을 한 줄씩 다 찍어 볼 챔피언.
//   눈으로 검산할 때만 쓴다. 평소엔 비워 두면 요약만 나온다.
//   예:  const PREVIEW = ['Aatrox', 'Ahri', 'MonkeyKing', 'Locke'];
const PREVIEW = [];

// ------------------------------------------------------------
// 손으로 확인한 값. 자동 추출보다 우선한다.
//
//   키는 미리보기에 찍히는 "챔피언 스킬 / 이름" 을 그대로 복사해 쓰면 된다.
//   영문 alias 로 써도 된다:  "MissFortune W / LoveTapRefund"
//
//   ★ 이 표에 적어 두면 재실행해도 안 날아간다.
//     자동 추출이 틀리거나 못 찾은 값을 확인할 때마다 여기에 쌓을 것.
//     (챔피언 통째로 지키려면 위의 PRESERVE 를 쓴다)
//
//   표에 있는데 한 번도 안 쓰인 키는 마지막에 경고로 알려준다. 오타 잡기용.
// ------------------------------------------------------------
const MANUAL = {
  '미스 포츈 W / LoveTapRefund': '...',
  '올라프 Q / TooltipCDRefund': '2.5',
  '사일러스 R / PerTargetCooldown': '200',
  '카타리나 E / DaggerCooldownReduction': '12 / 11 / 10 / 9 / 8',
  '애쉬 E / ChargeCooldown': '5',

  // 2026-08-08 인게임 확인분.
  //   벨베스 E / 세트 W / 신 짜오 E / 진 E 는 숫자만으로 안 끝난다.
  //   (공속 비례분·투지 계수 등이 문장 쪽에 같이 들어가야 함) — 확인결과.md 2번 참고
  '말파이트 W / f1': '10 / 15 / 20 / 25 / 30',
  '말파이트 W / f2': '30 / 45 / 60 / 75 / 90',
  '벨베스 Q / f1': '16 / 15 / 14 / 13 / 12',
  '신드라 W / f2': '1.5',
};

const manualUsed = new Set();

// ------------------------------------------------------------
// mStat 번호 -> 한글 스탯 이름
//   ★ 인게임 툴팁으로 실제 확인한 것: mStat 2 = 공격력(아트록스 Q),
//     mStat 4 = 공격 속도(카타리나 R — 툴팁 "+0.5 추가 공격 속도" 와
//     0.16 x 3.125 = 0.5 가 일치), mStat 18 = 생명력 흡수(암베사 R "+0.5 생명력 흡수"),
//     mStat 29 = 물리 관통력(파이크 R "+1.5 물리 관통력"). 나머지는 아직 추정이다.
//     모르는 번호가 나오면 "?" 로 두고 마지막에 목록으로 알려준다.
//     ★ 3 은 원래 '공격 속도'로 적혀 있었으나 4가 공격 속도로 확정되어 뺐다.
//       추측으로 채우면 "?" 보다 나쁘다 — 쓰이는 자리가 있으면 목록에 뜰 것이다.
// ------------------------------------------------------------
const STAT_NAMES = {
    0: '주문력',
    1: '방어력',
    2: '총 공격력',
    4: '공격 속도',
    5: '스킬 가속',
    18: '생명력 흡수',
    29: '물리 관통력',
    // ★ 6 과 8 은 원래 서로 반대로 적혀 있었다. 2026-08-08 인게임 확인으로 교환:
    //   닐라 R 이 "치명타 확률의 10%"(사이트는 마법 저항력이라고 했음),
    //   뽀삐 W 가 "마법 저항력의 12%"(사이트는 치명타 확률이라고 했음).
    //   정확히 맞교환이라 우연이 아니다. 21자리가 틀린 이름으로 나가고 있었다.
    6: '마법 저항력',
    8: '치명타 확률',
    // ★ 9 는 원래 '이동 속도'로 적혀 있었으나 2026-08-08에 '치명타 피해량'으로 정정.
    //   야스오 패시브 CurrentCritDamage 가 위키 기준 180%(치명타 피해량)인데
    //   "이동 속도의 100%"로 찍히고 있었다. 탈론 Q 인게임 설명("근접 공격 피해량은
    //   치명타 피해량 증가에 영향을 받습니다")도 같은 결론.
    //   케이틀린 P·루시안 R·미스 포츈 Q·샤코 Q 의 "치명타 확률 x (X - 1)" 형태도
    //   X 가 치명타 피해량일 때만 성립한다.
    9: '치명타 피해량',
    // ★ 7 = 이동 속도. 2026-08-08 추가. 표에 없어서 잔나 P·헤카림 P 가 통째로 죽고 있었다.
    //   헤카림 P BonusAD 가 결정적: mStat 7 / mStatFormula 2(추가) 에
    //   레벨 3·6·9·12·15·18 마다 +0.02 씩 붙는 0.12 -> 0.24 계수다.
    //   헤카림 패시브(전쟁의 길)가 정의상 "추가 이동 속도의 12~24% 만큼 추가 공격력"이라
    //   숫자까지 그대로 맞는다. 잔나 P(순풍)도 추가 이동 속도 비례로 같은 모양.
    7: '이동 속도',
    11: '추가 공격력',
    12: '최대 체력',
    13: '추가 체력',
};

const unknownStats = new Map();   // 번호 -> { count, where[] }
const unknownParts = new Map();   // 계산식 조각 종류 -> { count, keys, where[], solved }
const guessedList = [];           // 필드 모양으로 추측해서 푼 값 (눈으로 검산할 것)
const viaField = [];              // 최상위 / mAmmo 필드에서 건진 값 (새 경로라 검산 대상)
const dotList = [];               // ".숫자" 꼬리를 처리한 값 (해석이 확정 아님, 검산 대상)
const caseList = [];              // 대소문자를 무시하고 찾아낸 이름 (툴팁 철자 != bin 철자)
const caseSeen = new Set();
const zeroDrop = [];              // 참조 대상이 bin 에 없어 0으로 본 항 (조회 버그와 구분하려고 남긴다)
const hashHits = new Set();       // CD 가 이름을 못 푼 {해시} 자리를 해시로 찾아낸 곳
const crossHits = new Set();      // @spell.X:Y@ 교차 참조를 풀어낸 곳
const crossMiss = [];             // 교차 참조인데 못 푼 곳
let spellIndex = {};              // 지금 처리 중인 챔피언의 스펠 객체 색인 (buildSpellIndex)

// 툴팁 철자와 bin 철자가 어긋난 자리를 기록한다.
function noteCase(asked, actual) {
    const k = `${asked}|${actual}`;
    if (caseSeen.has(k)) return;
    caseSeen.add(k);
    if (caseList.length < 60) caseList.push(`${asked}  ->  ${actual}   (${ctx})`);
}

// DataValue 를 이름으로 찾는다. 정확히 일치가 우선, 없으면 대소문자를 무시한다.
//   ★ 계산식 안에서 다른 DataValue 를 참조할 때도 철자가 어긋난다.
//     AoeDamagePercent -> AoEDamagePercent, BonusLifesteal -> BonusLifeSteal 같은 식.
//     조각 하나가 null 이 되면 계산식이 통째로 죽으므로 여기가 제일 아프다.
// 랭크 수가 표준(일반 5 / 궁 3)에서 벗어나는 챔피언.
//   ★ 자동 판별할 근거가 없다. bin 의 mSpell 엔 최대 레벨 필드가 없고,
//     CD v1 의 cooldownCoefficients / costCoefficients 는 챔피언과 무관하게
//     전부 길이 6 으로 패딩돼 있어서 랭크 수를 알려주지 않는다. 그래서 표로 박는다.
//   규칙: 1레벨에 스킬을 공짜로 주는 챔피언은 남는 포인트만큼 다른 스킬이 더 올라간다.
const MAX_RANK = {
    Udyr:    { Q: 6, W: 6, E: 6, R: 6 },   // 궁이 따로 없어 4개 전부 6랭크 (그래서 마스터 불가)
    Jayce:   { Q: 6, W: 6, E: 6, R: 1 },   // 1레벨에 R(변신) 공짜
    Nidalee: { Q: 5, W: 5, E: 5, R: 4 },   // 1레벨에 R 공짜
    Karma:   { Q: 5, W: 5, E: 5, R: 4 },   // 〃
    Elise:   { Q: 5, W: 5, E: 5, R: 4 },   // 〃
    Yuumi:   { Q: 6, W: 5, E: 5, R: 3 },   // 1레벨에 W 공짜라 Q 만 6랭크
};
const rankOf = (alias, key) =>
    (MAX_RANK[alias] && MAX_RANK[alias][key]) || (key === 'R' ? 3 : 5);

// 라이엇 bin 프로퍼티 해시 (FNV-1a 32bit, 소문자 기준).
//   ★ CD 가 이름을 못 푼 자리는 {8자리16진수} 로 남는다. 툴팁이 부르는 이름을
//     이 해시로 바꾸면 그 자리를 찾아갈 수 있다.
//     검증: fnv1a('firsttierrangeincreasett') = d34fc902 이고
//     킨드레드 패시브의 계산식 키가 정확히 {d34fc902} 다.
const fnv1a = (s) => {
    let h = 0x811c9dc5;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
    return (h >>> 0).toString(16).padStart(8, '0');
};
const hashKey = (name) => `{${fnv1a(String(name).toLowerCase())}}`;

// 조각 안 필드 이름을 해시로만 남긴 자리가 있다. 위 FNV 로 전부 되찾았다:
//   {91d404a5} Level1DataValue                     {bbd778a2} InitialBonusPerLevelDataValue
//   {9823b29a} DataValueBreakpoints                {ae9b464d} AdditionalBonusAtThisLevelDataValue
//   {b0d8b2ac} BonusPerLevelAtAndAfterDataValue    {b2cd0eb0} BonusPerLevelDataValue
// 전부 ByCharLevelBreakpoints 의 "값 대신 DataValue 이름을 적는" 변종이다.
// 해시로도 원래 이름으로도 찾을 수 있게 해 둔다 (CD 가 나중에 풀어줄 수 있으므로).
const fld = (obj, name) => {
    if (!obj || typeof obj !== 'object') return undefined;
    const h = obj[hashKey(name)];
    return h !== undefined ? h : obj[name];
};

function findDataValue(spell, name) {
    if (name === undefined || name === null) return undefined;
    const list = spell.DataValues || [];
    const exact = list.find(d => d.name === name);
    if (exact) return exact;
    const hashed = list.find(d => d.name === hashKey(name));
    if (hashed) { hashHits.add(`${ctx}   (${name} -> ${hashKey(name)})`); return hashed; }
    const want = String(name).toLowerCase();
    const loose = list.find(d => String(d.name).toLowerCase() === want);
    if (loose) noteCase(name, loose.name);
    return loose;
}

// mSpellCalculations 항목을 이름으로 찾는다. 같은 이유로 대소문자 폴백을 둔다.
function findCalc(spell, name) {
    if (name === undefined || name === null) return undefined;
    const calcs = spell.mSpellCalculations || {};
    if (calcs[name] !== undefined) return calcs[name];
    if (calcs[hashKey(name)] !== undefined) {
        hashHits.add(`${ctx}   (${name} -> ${hashKey(name)})`);
        return calcs[hashKey(name)];
    }
    const want = String(name).toLowerCase();
    const key = Object.keys(calcs).find(k => k.toLowerCase() === want);
    if (key) { noteCase(name, key); return calcs[key]; }
    return undefined;
}

// 지금 어느 챔피언 어느 스킬 어느 자리를 처리 중인지. 미해결 원인 추적용.
let ctx = '';

// 지금 스킬의 쿨타임 (CD v1 기준 문자열, 예: "18 / 16 / 14 / 12 / 10").
// CooldownMultiplierCalculationPart 가 이 값을 쓴다.
// bin 의 cooldownTime 대신 v1 값을 쓰는 이유는 아래 case 주석 참고.
let currentCooldown = null;

// ------------------------------------------------------------

const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const get = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(String(res.status));
    return res.json();
};

// 소수점 지저분한 것 정리 (0.30000000000000004 -> 0.3)
const tidy = (n) => {
    const r = Math.round(n * 1000) / 1000;
    return Number.isInteger(r) ? String(r) : String(r);
};

// 레벨별 값 배열 -> 표시 문자열.
//   bin 의 values 는 7칸이고 0번은 쓰레기다. 실제 랭크는 1번부터.
const levelsToText = (values, maxRank, mult) => {
    if (!Array.isArray(values)) return null;
    const picked = values.slice(1, 1 + maxRank).map(v => tidy(v * mult));
    if (!picked.length) return null;
    return picked.every(v => v === picked[0]) ? picked[0] : picked.join(' / ');
};

// 최상위 / mAmmo 필드용 배열 -> 표시 문자열.
//   ★ DataValues 와 달리 이쪽은 0번이 실제 1랭크다 (castRange, mana 와 같은 규칙).
const topLevelToText = (values, maxRank, mult) => {
    if (!Array.isArray(values) || !values.length) return null;
    if (typeof values[0] !== 'number') return null;
    const picked = values.slice(0, maxRank).map(v => tidy(v * mult));
    if (!picked.length) return null;
    return picked.every(v => v === picked[0]) ? picked[0] : picked.join(' / ');
};

// bin 의 필드 이름은 툴팁에 적힌 이름과 정확히 같지 않을 수 있다.
//   AmmoRechargeTime -> mAmmoRechargeTime 처럼 m 접두사가 붙거나 대소문자가 다르다.
//   그래서 (그대로 / m 붙여서 / 대소문자 무시) 순서로 찾는다.
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

// 필드에서 읽은 raw 값 -> 표시 문자열. 숫자도 배열도 아니면 실패로 본다.
//   rank1 = 0번이 "스킬 안 찍은 상태"라서 1번부터 읽어야 하는 필드인지.
const fieldToText = (raw, maxRank, mult, rank1) => {
    // ★ 최상위 필드가 배열이 아니라 { values: [...] } 로 한 겹 싸여 있는 경우가 있다.
    //   직스 P 가 부르는 Cooldown 이 이 모양이라 객체인 채로 그냥 실패하고 있었다.
    if (raw && typeof raw === 'object' && !Array.isArray(raw) && Array.isArray(raw.values)) raw = raw.values;
    if (typeof raw === 'number') return tidy(raw * mult);
    if (!Array.isArray(raw)) return null;
    // ★ 버릴 앞칸이 실제로 있을 때만 민다. 길이가 랭크 수와 같으면
    //   앞을 버리는 순간 마지막 랭크가 잘리므로 그냥 0번부터 읽는다.
    if (rank1 && raw.length > maxRank) return levelsToText(raw, maxRank, mult);
    return topLevelToText(raw, maxRank, mult);
};

// 위치는 스펠 최상위여도 인덱스 규칙은 DataValues 쪽(0번은 쓰레기)을 따르는 필드.
//   ★ 티모 R AmmoRechargeTime 이 "0 / 35 / 30" 으로 나온 게 증거다.
//     바이·자이라도 첫 값이 겹쳤다. 인게임에서 한 칸 민 쪽이 맞다고 확인함.
//     castRange, mana 는 0번부터가 맞으므로 여기 넣지 말 것.
const RANK1_FIELDS = /ammo/i;

// 툴팁이 부르는 이름 != bin 필드 이름인 자리. 소문자 키로 적는다.
//   Cost 는 스펠 안에 값이 없고 "이 스킬의 마나 소모값"을 가리키는 별명이다.
//   (카시오페아 Q: 처치하면 Q 코스트만큼 마나를 돌려받는다)
const FIELD_ALIAS = { cost: 'mana' };

// ".숫자" 꼬리를 소수점 자릿수로 적용한다.
const applyPrecision = (text, p) => {
    if (text === null || p === null) return text;
    if (!DOT_AS_PRECISION) return text;
    const out = String(text).replace(/-?\d+(?:\.\d+)?/g, (n) => {
        const f = parseFloat(n);
        return Number.isFinite(f) ? String(Number(f.toFixed(p))) : n;
    });
    if (dotList.length < 40) dotList.push(`${ctx} = ${out}   [.${p} -> 소수점 ${p}자리로 처리]`);
    return out;
};

// mStatFormula: 없음/0 = 총, 1 = 기본, 2 = 추가.
//   ★ 아트록스 Q(필드 없음)가 "총 공격력", 카타리나 R(2)이 "추가 공격력"·
//     "추가 공격 속도"인 것으로 확인했다. 지금까지 이 필드를 안 봐서
//     추가 계수를 총 계수로 잘못 적고 있었다.
const applyStatFormula = (name, formula) => {
    if (name === null) return null;
    if (formula === 1) return name.startsWith('기본 ') ? name : `기본 ${name.replace(/^(총|추가) /, '')}`;
    if (formula === 2) return name.startsWith('추가 ') ? name : `추가 ${name.replace(/^(총|기본) /, '')}`;
    return name;
};

const statName = (id, hint, formula) => {
    // mStat 이 0(주문력)이면 JSON 에서 필드가 통째로 빠진다. undefined 는 0 으로 본다.
    if (id === undefined || id === null) id = 0;
    if (STAT_NAMES[id] !== undefined) return applyStatFormula(STAT_NAMES[id], formula);
    // 번호만으로는 무슨 스탯인지 알 수 없다. 어디서 나왔는지 같이 남겨서
    // 인게임 툴팁과 대조할 수 있게 한다. (추측으로 표를 채우면 "?" 보다 나쁘다)
    if (!unknownStats.has(id)) unknownStats.set(id, { count: 0, where: [] });
    const e = unknownStats.get(id);
    e.count++;
    // 계수 값을 같이 남긴다. 인게임 툴팁의 "OO의 80%" 와 숫자를 맞춰 보면
    // 이 번호가 무슨 스탯인지 바로 알 수 있다.
    const line = ctx + (hint ? `   (계수 ${hint})` : '');
    if (e.where.length < 6 && !e.where.includes(line)) e.where.push(line);
    return null;
};

// ------------------------------------------------------------
// 계산식 조각 하나를 문자열로
// ------------------------------------------------------------
function partToText(part, spell, maxRank, mult, depth = 0) {
    // ★ 깊이 8. 카타리나 R 이 6겹이라 4로는 안쪽 조각이 통째로 잘렸다.
    //   StatBySubPart > Sum > Product > Sum > Number 까지 내려간다.
    if (!part || depth > 8) return null;
    const type = part.__type || '';

    const dv = (name) => findDataValue(spell, name);

    switch (type) {
        case 'NamedDataValueCalculationPart': {
            const d = dv(part.mDataValue);
            if (d) {
                const t = levelsToText(d.values, maxRank, mult);
                if (t !== null) return t;
            }
            // ★ 여기까지 왔으면 그 항은 0이다. 두 경우가 있는데 결과는 같다.
            //     이름이 아예 없음        — 모드 전용 보너스 등
            //     이름은 있는데 값이 비었음 — 니달리 W 의 ModesBonusMaxTraps
            //   (?) 로 남기면 멀쩡한 값이 통째로 폴백돼 버리므로 0으로 보고 버린다.
            //   다만 조용히 버리면 조회 버그와 구분이 안 되니 목록에 남긴다.
            if (zeroDrop.length < 40) {
                zeroDrop.push(`${ctx}   (${part.mDataValue} — ${d ? '값이 비어 있음' : '이름이 없음'})`);
            }
            return '0';
        }

        case 'NumberCalculationPart':
            return tidy((part.mNumber || 0) * mult);

        case 'StatByNamedDataValueCalculationPart': {
            const d = dv(part.mDataValue);
            const ratio = d ? levelsToText(d.values, maxRank, 100) : null;
            const s = statName(part.mStat, ratio === null ? null : ratio + '%', part.mStatFormula);
            if (!d || s === null) return null;
            return `${s}의 ${ratio}%`;
        }

        case 'StatByCoefficientCalculationPart': {
            const s = statName(part.mStat, tidy((part.mCoefficient || 0) * 100) + '%', part.mStatFormula);
            if (s === null) return null;
            return `${s}의 ${tidy((part.mCoefficient || 0) * 100)}%`;
        }

        case 'ByCharLevelInterpolationCalculationPart': {
            const a = tidy((part.mStartValue || 0) * mult);
            const b = tidy((part.mEndValue || 0) * mult);
            return `${a} ~ ${b} (레벨에 따라)`;
        }

        case 'ByCharLevelBreakpointsCalculationPart': {
            // ★ 이 조각은 세 가지 필드를 섞어 쓴다. 하나라도 빼먹으면 최댓값이 틀린다.
            //     mInitialBonusPerLevel      = 레벨당 증가분 (첫 구간)
            //     mBonusPerLevelAtAndAfter   = 이 레벨부터 레벨당 증가분이 바뀜
            //     mAdditionalBonusAtThisLevel= 이 레벨에서 한 번 뛰는 양
            //   예전엔 세 번째만 더해서 니달리 W(4~10)는 맞았지만
            //   레벨당 증가가 있는 스킬은 시작값 그대로 나왔다.
            const base = part.mLevel1Value || 0;
            const bps = [...(part.mBreakpoints || [])].sort((x, y) => (x.mLevel || 0) - (y.mLevel || 0));
            let v = base;
            let per = part.mInitialBonusPerLevel || 0;
            for (let lv = 2; lv <= 18; lv++) {
                const bp = bps.find(x => x.mLevel === lv);
                if (bp) {
                    // ★ 생략 = 0. bin 은 기본값인 필드를 통째로 빼고 적는다 (mStat 생략 = 주문력과 같은 규칙).
                    //   그래서 필드가 하나도 없는 Breakpoint 는 "이 레벨부터 성장 정지"라는 뜻이다.
                    //   생략을 "이전 값 유지"로 읽던 시절엔 멈춰야 할 레벨 뒤로도 계속 더해서
                    //   유미 R 이 1.3~1.9(실제 1.3~1.6), 아이번 HarvestDuration 이 -5초로 나왔다.
                    per = bp.mBonusPerLevelAtAndAfter !== undefined ? bp.mBonusPerLevelAtAndAfter : 0;
                    v += bp.mAdditionalBonusAtThisLevel || 0;
                }
                v += per;
            }
            return `${tidy(base * mult)} ~ ${tidy(v * mult)} (레벨에 따라)`;
        }

        case 'BuffCounterByNamedDataValueCalculationPart': {
            const d = dv(part.mDataValue);
            return d ? `${levelsToText(d.values, maxRank, mult)} (중첩당)` : null;
        }

        case 'SumOfSubPartsCalculationPart': {
            const raw = (part.mSubparts || [])
                .map(p => partToText(p, spell, maxRank, mult, depth + 1));
            if (!raw.length || raw.every(p => p === null)) return null;
            // ★ 못 푼 조각을 조용히 버리면 "계수 빠진 반쪽 값"이 완성품처럼 보인다.
            //   calcToText 와 같은 규칙으로 (?) 를 남겨 눈에 띄게 한다.
            const parts = raw.map(p => p === null ? '(?)' : p);
            // 전부 단일 숫자면 그냥 더한다 (1 + 0.75 -> 1.75)
            if (parts.every(p => /^-?[\d.]+$/.test(p))) {
                return tidy(parts.reduce((a, b) => a + parseFloat(b), 0));
            }
            return joinTerms(parts);
        }

        case 'ClampSubPartsCalculationPart': {
            // clamp(하위 조각들의 합, mFloor, mCeiling).
            //   ★ 합계 안에 스탯 비례가 들어 있으면 실제 값이 게임 중에 변하므로
            //     고정 숫자로 쓸 수 없다. 그래서 가질 수 있는 범위(바닥~천장)를 보여준다.
            //   예전엔 이 타입을 몰라서 합계만 적었고, 그 결과 카이사 E 가
            //   "추가 공격 속도의 100% + 100%" 로 나왔다. 없는 상수를 더한 것처럼 보인다.
            if (part.mFloor === undefined || part.mCeiling === undefined) return null;
            return `${tidy(part.mFloor * mult)} ~ ${tidy(part.mCeiling * mult)}`;
        }

        case 'ProductOfSubPartsCalculationPart': {
            // ★ 배율(mult)을 여기서 어느 쪽에 실을지가 미해결이다. 양쪽 다 1 로 버리면
            //   percent 배율(x100)이 사라져 우디르 Q 가 "0.015 ~ 0.03" 으로 나온다(실제 1.5~3%).
            //   그렇다고 mPart1 에 그냥 실으면 이미 자기 % 를 붙이는 조각에 100 이 또 곱해져
            //   다리우스 Q 가 "총 공격력의 10000" 이 된다. 22자리가 한꺼번에 흔들리는 자리라
            //   인게임 대조 없이 바꾸면 안 된다. 지금은 안전한 쪽(안 싣기)을 유지한다.
            const a = partToText(part.mPart1, spell, maxRank, 1, depth + 1);
            const b = partToText(part.mPart2, spell, maxRank, 1, depth + 1);
            if (!a || !b) return null;
            // ★ 덧셈이 든 조각은 괄호로 묶어야 한다.
            //   안 묶으면 "0.16 x 1 + 공격 속도의 312.5%" 가 되어
            //   0.16 x (1 + ...) 라는 원래 뜻과 달라진다.
            //   ★ 뺄셈도 같이 봐야 한다. joinTerms 가 음수 항을 " - " 로 적기 때문에
            //     ' + ' 만 보면 괄호를 놓쳐서 뜻이 달라진다.
            const wrap = (x) => / [+-] /.test(x) ? `(${x})` : x;
            return `${wrap(a)} x ${wrap(b)}`;
        }

        case 'EffectValueCalculationPart': {
            const idx = (part.mEffectIndex || 1) - 1;
            const ea = (spell.mEffectAmount || [])[idx];
            return (ea && ea.value) ? levelsToText(ea.value, maxRank, mult) : null;
        }

        case 'StatBySubPartCalculationPart': {
            const s2 = statName(part.mStat, null, part.mStatFormula);
            const sub = partToText(part.mSubpart, spell, maxRank, 100, depth + 1);
            return (s2 !== null && sub !== null) ? `${s2}의 ${sub}%` : null;
        }

        case 'AbilityResourceByCoefficientCalculationPart':
            return `최대 마나의 ${tidy((part.mCoefficient || 0) * 100)}%`;

        case 'BuffCounterByCoefficientCalculationPart':
            return `${tidy((part.mCoefficient || 0) * mult)} (중첩당)`;

        case 'ByCharLevelFormulaCalculationPart': {
            // ★ 두 군데가 틀려서 이 분기는 지금까지 한 번도 값을 못 읽고 "0 ~ 0"만 냈다.
            //   1) 필드 이름이 mValues 가 아니라 values 다. 전수 조사 15자리 전부 values.
            //   2) 배열이 31칸(레벨 1~31)이라 마지막 칸은 31레벨 값이다.
            //      우리는 18레벨 기준이므로 인덱스 17에서 잘라야 한다.
            //      (노틸러스 P: 마지막 칸 188, 18레벨은 110)
            const vals = findField(part, 'values');
            if (!Array.isArray(vals) || !vals.length) return null;
            const a = tidy(vals[0] * mult);
            const b = tidy(vals[Math.min(17, vals.length - 1)] * mult);
            return `${a} ~ ${b} (레벨에 따라)`;
        }

        case 'CooldownMultiplierCalculationPart': {
            // 필드가 __type 하나뿐이다. 용례가 전부 쿨타임 환급/충전 관련이라
            // (미스 포츈 W 사랑의 도장 환급, 애쉬 E 충전, 올라프 Q 환급, 사일러스 R 대상별 쿨타임)
            // 이 스킬의 쿨타임을 가리키는 것으로 본다.
            //   ★ 추론이다. guessedList 에 남기니 인게임 툴팁과 대조할 것.
            //   ★ bin 의 cooldownTime 을 쓰면 값이 한 칸씩 밀린 듯한 결과가 나왔다.
            //     (사일러스 R = 80/80/55, 카타리나 E = 12/12/11/10/9 처럼 첫 값이 겹침)
            //     그래서 화면에 실제로 찍는 값과 같은 CD v1 쿨타임을 쓴다.
            if (!currentCooldown || currentCooldown === '-') return null;
            const picked = currentCooldown.split('/').map(x => tidy(parseFloat(x.trim()) * mult));
            if (picked.some(x => !isFinite(parseFloat(x)))) return null;
            const out = picked.every(x => x === picked[0]) ? picked[0] : picked.join(' / ');
            if (guessedList.length < 40) guessedList.push(`${ctx} = ${out}   [스킬 쿨타임으로 추론]`);
            return out;
        }

        default: {
            // 타입 이름을 모르는 조각. ({ee18a47b} 처럼 CD 가 이름을 못 푼 것들)
            // 이름 대신 "어떤 필드를 갖고 있나"로 정체를 추측한다.
            const guessed = guessPart(part, spell, maxRank, mult, depth);

            if (!unknownParts.has(type)) {
                // 필드 이름이 해시라 뜻을 모를 때는 안에 든 실제 값을 봐야 한다.
                // 첫 등장 한 건의 내용을 통째로 남긴다.
                let sample;
                try {
                    sample = JSON.stringify(part, (k, v) =>
                        (Array.isArray(v) && v.length > 8) ? v.slice(0, 8).concat('...') : v);
                    if (sample.length > 600) sample = sample.slice(0, 600) + ' ...(잘림)';
                } catch (_) { sample = '(출력 실패)'; }
                unknownParts.set(type, {
                    count: 0, keys: Object.keys(part).join(', ') || '(필드 없음)',
                    where: [], solved: 0, sample
                });
            }
            const e = unknownParts.get(type);
            e.count++;
            if (e.where.length < 4 && !e.where.includes(ctx)) e.where.push(ctx);
            if (guessed !== null) {
                e.solved++;
                if (guessedList.length < 40) guessedList.push(`${ctx} = ${guessed}   [${type}]`);
            }
            return guessed;
        }
    }
}

// ------------------------------------------------------------
// 모르는 종류의 조각을 필드 모양으로 추측한다.
//   ★ 추측이므로 결과를 무조건 믿으면 안 된다.
//     푼 값은 guessedList 에 모아서 마지막에 전부 출력한다. 눈으로 검산할 것.
// ------------------------------------------------------------
// "OO의 80%" 를 만든다.
//   ★ 값 쪽이 이미 % 로 끝나면 붙이지 않는다. 계수 자리에 단일 숫자가 아니라
//     계산식 조각이 통째로 들어오는 경우가 있어서(애쉬 P) 그때 "100%%" 가 됐다.
const statRatio = (name, value) =>
    value === null ? null : `${name}의 ${value}${/%$/.test(String(value)) ? '' : '%'}`;

// 항을 이어붙인다. 음수 항이 "+ -1" 로 나오면 흉해서 "- 1" 로 바꾼다.
//   (루시안 R, 미스 포츈 Q·R, 제리 W, 샤코 Q 가 여기 걸렸다. 계산은 맞고 표시만 문제였다)
const joinTerms = (arr) =>
    arr.reduce((acc, t) => /^-/.test(t) ? `${acc} - ${t.slice(1)}` : `${acc} + ${t}`);

// 위와 같지만 맨 앞 항에도 부호를 붙인다. " (+ 주문력의 80%)" 처럼 쓰는 자리용.
const signedTerms = (arr) =>
    arr.map(t => /^-/.test(t) ? `- ${t.slice(1)}` : `+ ${t}`).join(' ');

function guessPart(part, spell, maxRank, mult, depth) {
    if (!part || typeof part !== 'object') return null;

    // ── ByCharLevelBreakpoints 의 "값 대신 DataValue 이름" 변종 ──
    //   ★ 반드시 아래 "두 개짜리" 분기보다 먼저 봐야 한다. 이 모양도 문자열 두 개일 수 있는데
    //     두 번째가 레벨18 값이 아니라 "레벨당 증가분"이라 그대로 읽으면 거꾸로 나온다.
    //     (이렐리아 P 가 10 ~ 3 으로 나오고 있었다. 실제는 10 + 3x17 = 61)
    {
        const l1 = fld(part, 'Level1DataValue');
        if (typeof l1 === 'string') {
            // DataValue 이름 -> 숫자. DataValues 는 0번이 쓰레기라 1번을 쓴다.
            const nv = (name) => {
                if (typeof name !== 'string') return null;
                const d = findDataValue(spell, name);
                if (!d || !Array.isArray(d.values) || !d.values.length) return null;
                return d.values.length > 1 ? d.values[1] : d.values[0];
            };
            const base = nv(l1);
            if (base === null) return null;

            const perName = fld(part, 'BonusPerLevelDataValue');
            const initName = fld(part, 'InitialBonusPerLevelDataValue');
            let per = nv(perName !== undefined ? perName : initName) || 0;

            const raw = fld(part, 'DataValueBreakpoints');
            const bps = Array.isArray(raw)
                ? [...raw].sort((a, b) => ((a.level || a.mLevel || 0) - (b.level || b.mLevel || 0)))
                : [];

            let v = base;
            for (let lv = 2; lv <= 18; lv++) {
                const bp = bps.find(x => (x.level !== undefined ? x.level : x.mLevel) === lv);
                if (bp) {
                    // ★ 생략 = 0(성장 정지). 값 버전과 같은 규칙이다.
                    const after = fld(bp, 'BonusPerLevelAtAndAfterDataValue');
                    per = after !== undefined ? (nv(after) || 0) : 0;
                    const add = fld(bp, 'AdditionalBonusAtThisLevelDataValue');
                    if (add !== undefined) v += (nv(add) || 0);
                }
                v += per;
            }
            return `${tidy(base * mult)} ~ ${tidy(v * mult)} (레벨에 따라)`;
        }
    }

    // 필드 두 개가 각각 "레벨1 값" / "레벨18 값" DataValue 의 이름인 모양.
    //   ({ee18a47b} 가 이 형태. 예: HealCapLevel1Value / HealCapLevel18Value)
    //   챔피언 레벨에 따라 두 값 사이를 보간하는 조각이다.
    //   JSON 키 순서가 곧 파일 순서라 앞이 레벨1, 뒤가 레벨18이다.
    {
        const fk = Object.keys(part).filter(k => k !== '__type');
        if (fk.length === 2 && fk.every(k => typeof part[k] === 'string')) {
            const a = (spell.DataValues || []).find(x => x.name === part[fk[0]]);
            const b = (spell.DataValues || []).find(x => x.name === part[fk[1]]);
            if (a && b) {
                const lo = levelsToText(a.values, 1, mult);
                const hi = levelsToText(b.values, 1, mult);
                if (lo !== null && hi !== null) return `${lo} ~ ${hi} (레벨에 따라)`;
            }
            return null;
        }
    }

    // 다른 계산식을 이름으로 가리키는 모양. ({f3cbe7b2} 가 이 형태다)
    //   필드가 mSpellCalculationKey 하나뿐이라 정체가 뚜렷하다.
    if (part.mSpellCalculationKey !== undefined) {
        const ref = findCalc(spell, part.mSpellCalculationKey);
        return ref ? calcToText(ref, spell, maxRank, mult, depth + 1) : null;
    }

    // 이름 붙은 DataValue 를 가리키는 모양
    if (part.mDataValue !== undefined) {
        const d = findDataValue(spell, part.mDataValue);
        if (d) {
            if (part.mStat !== undefined) {
                const s = statName(part.mStat, null, part.mStatFormula);
                if (s !== null) return statRatio(s, levelsToText(d.values, maxRank, 100));
                return null;
            }
            return levelsToText(d.values, maxRank, mult);
        }
        return null;
    }

    // 스탯 * 계수 모양
    if (part.mCoefficient !== undefined && part.mStat !== undefined) {
        const s = statName(part.mStat, null, part.mStatFormula);
        return s === null ? null : statRatio(s, tidy(part.mCoefficient * 100));
    }

    // 상수
    if (part.mNumber !== undefined) return tidy(part.mNumber * mult);

    // 하위 조각을 품은 모양
    if (Array.isArray(part.mSubparts)) {
        const ps = part.mSubparts.map(p => partToText(p, spell, maxRank, mult, depth + 1)).filter(Boolean);
        if (!ps.length) return null;
        if (ps.every(p => /^-?[\d.]+$/.test(p))) return tidy(ps.reduce((a, b) => a + parseFloat(b), 0));
        return joinTerms(ps);
    }
    if (part.mPart1 && part.mPart2) {
        // 위 ProductOfSubParts 와 같은 이유로 배율을 안 싣는다.
        const a = partToText(part.mPart1, spell, maxRank, 1, depth + 1);
        const b = partToText(part.mPart2, spell, maxRank, 1, depth + 1);
        return (a && b) ? `${a} x ${b}` : null;
    }
    if (part.mSubpart) return partToText(part.mSubpart, spell, maxRank, mult, depth + 1);

    return null;
}

// mSpellCalculations 항목 하나 -> 문자열
function calcToText(calc, spell, maxRank, mult, depth = 0) {
    // 계산식이 다른 계산식을 참조하는 사슬. 위 partToText 상향과 짝을 맞춘다.
    if (!calc || depth > 6) return null;

    // 다른 계산식을 배율만 바꿔 재사용하는 형태
    if (calc.mModifiedGameCalculation) {
        const base = findCalc(spell, calc.mModifiedGameCalculation);
        const inner = calcToText(base, spell, maxRank, mult, depth + 1);
        if (!inner) return null;
        const m = calc.mMultiplier ? partToText(calc.mMultiplier, spell, maxRank, 1, depth + 1) : null;
        return m ? `${inner} x ${m}` : inner;
    }

    // 버프 유무로 계산식이 갈리는 형태 (카이사 Q MaxDamageDisplay).
    //   ★ 조건부 쪽은 이름이 {b2bd0d2f} 처럼 난독화돼 있어 못 쓴다.
    //     버프가 없는 기본 상태를 쓴다 — 툴팁 기본 표기와 같은 쪽이다.
    if (calc.mDefaultGameCalculation) {
        return calcToText(findCalc(spell, calc.mDefaultGameCalculation), spell, maxRank, mult, depth + 1);
    }

    const percent = calc.mDisplayAsPercent ? 100 : 1;

    // 계산식 전체에 곱해지는 배율 (예: 0.01)
    let selfMult = 1;
    let rawMult = null;
    if (calc.mMultiplier) {
        const mTxt = partToText(calc.mMultiplier, spell, maxRank, 1, depth + 1);
        if (mTxt !== null && /^-?[\d.]+$/.test(mTxt)) selfMult = parseFloat(mTxt);
        else if (mTxt !== null) rawMult = mTxt;   // 숫자 하나로 접을 수 없는 배율
    }

    const bodyOf = (m) => (calc.mFormulaParts || [])
        .map(p => partToText(p, spell, maxRank, m, depth + 1));
    let parts = bodyOf(mult * percent * selfMult);

    // ★ 숫자 하나로 못 접는 배율(랭크별 배열 등)을 어떻게 할 것인가.
    //   원래는 통째로 버렸다. 대부분은 그게 맞다 — 본체에 이미 피해량이 다 들어 있고
    //   배율은 "치명타 확률에 따라 증폭" 같은 별도 설명이라, 앞에 붙이면 문장만 길어진다.
    //   ★ 단 하나 예외: 본체가 순수 배율(예: clamp 의 "1 ~ 2")뿐이면 기본값이 통째로
    //     사라진다. 카이사 E 가 그랬다 — "100 ~ 200%" 로 나왔는데 실제는
    //     "기본 이동 속도 55~75% x (1 + 추가 공속, 최대 2배)" 다.
    //   그래서 "본체가 맨 숫자/범위 하나뿐일 때만" 배율을 곱셈 항으로 세운다.
    const isBareRange = (t) =>
        typeof t === 'string' && /^-?[\d.]+(\s*[~/]\s*-?[\d.]+)*$/.test(t.trim());
    let multText = null;
    if (rawMult !== null && parts.length === 1 && isBareRange(parts[0])) {
        multText = partToText(calc.mMultiplier, spell, maxRank, percent, depth + 1);
        parts = bodyOf(mult * selfMult);   // percent 는 multText 가 먹었다
    }

    if (!parts.length || parts.every(p => p === null)) return null;

    const base = parts[0];
    // ★ 기본값을 못 찾으면 실패로 본다.
    //   예전에는 "? (+ 주문력의 80%)" 같은 반쪽짜리를 돌려줬는데,
    //   그러면 성공으로 취급돼서 다음 후보 객체를 못 뒤졌다.
    if (base === null) return null;

    // 해석 못 한 계수 조각을 조용히 버리면 "계수 없는 반쪽 값"이 된다.
    // (?) 로 남겨서 미리보기에서 눈에 띄게 한다.
    const rest = parts.slice(1)
        .filter(p => p !== '0')          // 0인 항은 적어봐야 의미가 없다
        .map(p => p === null ? '(?)' : p);
    let out = base;
    // ★ 이미 % 로 끝나면 붙이지 않는다. 스탯 비례 조각은 guessPart 에서
    //   자기가 % 를 달고 나오기 때문에 여기서 또 붙이면 "30%%" 가 된다 (닐라 Q).
    if (calc.mDisplayAsPercent && !multText && !/%$/.test(out)) {
        // "(레벨에 따라)" 같은 꼬리표가 있으면 그 앞에 % 를 넣는다.
        //   ★ 아무 괄호나 잡으면 안 된다. 계산 항이 괄호로 끝나는 경우
        //     곱셈 한가운데에 % 가 끼어든다 ("0.6 x% (이동 속도의 100%)" — 샤코 Q).
        //     그래서 "~에 따라" 로 끝나는 진짜 꼬리표만 잡는다.
        const tail = out.match(/\s*\([^()]*에 따라\)$/);
        out = tail ? out.slice(0, tail.index) + '%' + tail[0] : out + '%';
    }
    // ★ 계수 항에도 % 를 붙여야 한다. 예전엔 기본값에만 붙여서
    //   우디르 Q 가 "20 / ... / 80% (+ 20 ~ 70 (레벨에 따라))" 로 나왔다.
    //   인게임은 뒤쪽도 "20% ~ 70%" 라 퍼센트다.
    //   ★ 숫자로만 된 항에만 붙인다. "주문력의 80%" 같은 스탯 비례 항은
    //     이미 자기 % 를 달고 나오므로 건드리면 "80%%" 가 된다.
    const asPercent = (t) => {
        if (!calc.mDisplayAsPercent || multText || /%/.test(t)) return t;
        const tail = t.match(/\s*\([^()]*에 따라\)$/);
        const head = tail ? t.slice(0, tail.index) : t;
        if (!/^-?[\d.]+(\s*[~/]\s*-?[\d.]+)*$/.test(head.trim())) return t;
        return tail ? head + '%' + tail[0] : head + '%';
    };
    if (rest.length) out += ` (${signedTerms(rest.map(asPercent))})`;
    if (multText) {
        const mt = (calc.mDisplayAsPercent && !/%$/.test(multText)) ? multText + '%' : multText;
        out = `${mt} x ${out}`;
    }
    return out;
}

// 플레이스홀더 이름 하나를 해결
function resolve(name, spell, maxRank, depth = 0) {
    // ★ @spell.<스펠이름>:<이름>@ — 다른 스펠의 값을 부르는 교차 참조.
    //   대소문자가 섞여 있다(@spell.GnarQ:...@ / @Spell.SonaQ:...@).
    //   자기 자신을 부르기도 한다(소나 P 의 @Spell.SonaPassive:...@).
    //   ★ 배율(*100)·자릿수(.1) 접미사는 안쪽 이름 끝에 붙어 있으므로
    //     떼지 말고 통째로 넘겨서 재귀 호출이 알아서 처리하게 둔다.
    const xm = String(name).trim().match(/^spell\.([A-Za-z0-9_]+)\s*:\s*(.+)$/i);
    if (xm) {
        if (depth > 3) return null;                       // 서로 부르는 경우 대비
        const t = spellIndex[xm[1].toLowerCase()];
        if (!t) {
            if (crossMiss.length < 40) crossMiss.push(`${ctx}   (스펠 객체 ${xm[1]} 없음)`);
            return null;
        }
        const v = resolve(xm[2].trim(), t.spell, t.maxRank, depth + 1);
        if (v === null && crossMiss.length < 40) crossMiss.push(`${ctx}   (${xm[1]} 안에서 ${xm[2]} 못 찾음)`);
        if (v !== null) crossHits.add(`${ctx} = ${v}`);
        return v;
    }

    // @Name*100@ / @Name*-100@ 형태에서 배율을 떼어낸다
    let mult = 1;
    let clean = String(name).trim();
    const m = clean.match(/^(.+?)\s*\*\s*(-?[\d.]+)$/);
    if (m) { clean = m[1].trim(); mult = parseFloat(m[2]); }

    // @ShieldDuration.1@ / @f2.0@ 처럼 이름 끝에 붙는 점+숫자를 떼어낸다.
    //   ★ 이걸 안 떼면 이름을 통째로 찾으려 해서 무조건 실패한다.
    //     f2.0 은 GENERIC_NAME 검사에도 안 걸려서 범용 이름 보호막까지 풀렸다.
    let precision = null;
    const dm = clean.match(/^(.+?)\.(\d+)$/);
    if (dm) { clean = dm[1].trim(); precision = parseInt(dm[2], 10); }

    const done = (v) => (v === null ? null : applyPrecision(v, precision));

    // 1) DataValues 에 직접 있나
    //    ★ 정확히 일치를 먼저 보고, 없으면 대소문자를 무시하고 한 번 더 본다.
    //      라이엇이 툴팁 철자와 bin 철자를 따로 관리해서 자주 어긋난다.
    //      HoTDuration -> HotDuration, Stunduration -> StunDuration,
    //      LifeStealPercent -> LifestealPercent 같은 식이다.
    const d = findDataValue(spell, clean);
    if (d) {
        // 문장에 이미 % 가 붙어 있으므로 값에는 붙이지 않는다 (50%% 방지)
        return done(levelsToText(d.values, maxRank, mult));
    }

    // 2) mSpellCalculations 에 있나 (여기도 같은 이유로 대소문자 폴백)
    const calc = findCalc(spell, clean);
    if (calc !== undefined) return done(calcToText(calc, spell, maxRank, mult));

    // 3) Effect2Amount 처럼 mEffectAmount 를 이름으로 부르는 경우
    const em = clean.match(/^Effect(\d+)Amount$/i);
    if (em && Array.isArray(spell.mEffectAmount)) {
        const ea = spell.mEffectAmount[parseInt(em[1]) - 1];
        if (ea && ea.value) {
            const t = levelsToText(ea.value, maxRank, mult);
            // 문장에 이미 % 가 붙어 있으므로 값에는 붙이지 않는다
            if (t !== null) return done(t);
        }
    }

    // 4) f1, f2 ... 도 같은 배열을 가리킨다
    const fm = clean.match(/^f(\d+)$/i);
    if (fm && Array.isArray(spell.mEffectAmount)) {
        const ea = spell.mEffectAmount[parseInt(fm[1]) - 1];
        if (ea && ea.value) {
            const t = levelsToText(ea.value, maxRank, mult);
            if (t !== null) return done(t);
        }
    }

    // 5) 탄약 값은 mSpell 바로 밑이 아니라 mAmmo 하위 블록에 따로 들어 있다.
    //    (AmmoRechargeTime, MaxAmmo ... — 바이 E, 벨코즈 W, 진 E 가 여기 걸렸다)
    const rank1 = RANK1_FIELDS.test(clean);
    const ammoTxt = fieldToText(findField(spell.mAmmo, clean), maxRank, mult, rank1);
    if (ammoTxt !== null) {
        if (viaField.length < 40) viaField.push(`${ctx} = ${ammoTxt}   [mAmmo 필드${rank1 ? ', 1번부터' : ''}]`);
        return done(ammoTxt);
    }

    // 6) 스펠 최상위 필드 (PerTargetCooldown, EnergyRefund ...)
    //    DataValues 도 계산식도 아니고 스펠 객체에 그냥 붙어 있는 값들이다.
    const aliased = FIELD_ALIAS[clean.toLowerCase()];
    const topRaw = findField(spell, clean) !== undefined
        ? findField(spell, clean)
        : (aliased ? findField(spell, aliased) : undefined);
    const topTxt = fieldToText(topRaw, maxRank, mult, rank1);
    if (topTxt !== null) {
        if (viaField.length < 40) viaField.push(`${ctx} = ${topTxt}   [최상위 필드${rank1 ? ', 1번부터' : ''}]`);
        return done(topTxt);
    }

    return null;
}

// ------------------------------------------------------------
// bin 에서 Q/W/E/R 스펠 객체를 찾는다.
//
//   ★ 예전에는 스킬 하나당 객체 하나만 봤다. 그런데 투사체·소환물·진화판의
//     수치는 본체가 아니라 딸린 객체에 들어 있어서 못 찾는 값이 많았다.
//     (카이사 진화, 크산테 변형, 자이라 씨앗, 하이머딩거 포탑 등)
//
//   그래서 키마다 "후보 목록"을 만든다. 앞에 있는 것부터 뒤진다:
//     1등급 본체  — CharacterRecord 의 spells 앞 4개 (Q,W,E,R 순서 보증)
//     2등급 계열  — 이름에 {alias}{key} 가 들어간 객체 (KaisaQMissile 등)
//     3등급 기타  — 같은 챔피언의 나머지 스펠 객체 전부 (최후의 수단)
//
//   본체를 항상 먼저 보므로 진화판 수치가 기본 수치 자리에 끼어들지 않는다.
// ------------------------------------------------------------
function getSpellsFromBin(bin, alias) {
    const keys = ['Q', 'W', 'E', 'R'];
    const out = { Q: [], W: [], E: [], R: [], P: [] };

    const rec = bin[`Characters/${alias}/CharacterRecords/Root`];
    if (!rec) return out;

    const used = new Set();

    // --- 1등급: 본체 ---
    (rec.spells || []).forEach((p, i) => {
        if (i >= 4) return;
        const obj = bin[p];
        if (obj && obj.mSpell) {
            out[keys[i]].push({ spell: obj.mSpell, tier: '본체', path: p });
            used.add(p);
        }
    });

    const passPath = rec.mCharacterPassiveSpell;
    const pass = bin[passPath];
    if (pass && pass.mSpell) {
        out.P.push({ spell: pass.mSpell, tier: '본체', path: passPath });
        used.add(passPath);
    }

    // --- 2등급 / 3등급 ---
    const prefix = `Characters/${alias}/Spells/`;
    const low = alias.toLowerCase();
    const leftovers = [];

    for (const p in bin) {
        if (!p.startsWith(prefix) || used.has(p)) continue;
        const obj = bin[p];
        if (!obj || !obj.mSpell) continue;

        const nameLow = String(obj.ObjectName || p).toLowerCase();
        let matched = false;
        for (const key of keys) {
            if (nameLow.includes(low + key.toLowerCase())) {
                out[key].push({ spell: obj.mSpell, tier: '계열', path: p });
                matched = true;
            }
        }
        if (!matched) leftovers.push({ spell: obj.mSpell, tier: '기타', path: p });
    }

    for (const key of keys) out[key].push(...leftovers);
    out.P.push(...leftovers);

    return out;
}

// @spell.<스펠이름>:<이름>@ 교차 참조를 풀기 위한 색인.
//   스펠 객체 이름(소문자) -> { spell, maxRank }
//   ★ maxRank 를 같이 들고 다녀야 한다. 패시브 문장이 Q 값을 부르는 경우가 있는데
//     P 의 maxRank(1)로 읽으면 1랭크 값만 나오고, 반대로 R 값을 5랭크로 읽으면
//     없는 4·5랭크가 지어내진다.
//   ★ 모를 때 기본값은 1 이다. levelsToText 는 값이 전부 같으면 하나로 줄이므로
//     랭크가 없는 값은 1 로 읽어도 맞고, 5 로 두면 없는 랭크가 부풀려진다.
function buildSpellIndex(bin, alias) {
    const idx = {};
    const putName = (nm, spell, maxRank) => {
        const k = String(nm || '').toLowerCase();
        if (!k || !spell || idx[k]) return;     // 먼저 등록된 쪽(더 확실한 쪽)을 지킨다
        idx[k] = { spell, maxRank };
    };
    const put = (path, spell, maxRank) =>
        putName(String(path || '').split('/').pop(), spell, maxRank);

    const rec = bin[`Characters/${alias}/CharacterRecords/Root`];
    if (!rec) return idx;

    // CharacterRecord 가 제일 확실하다. 옛날 이름(PowerBall=람머스 Q,
    // GlacialStorm=애니비아 R 등)도 여기서 제 랭크를 얻는다.
    //   ★ CD 가 경로 이름을 못 풀어 {해시}로 남기는 경우가 있다.
    //     스몰더 패시브가 `{c72a53d8}` 이라 SmolderP 라는 키가 아예 없었다.
    //     툴팁은 관례 이름으로 부르므로 그쪽으로도 같이 등록한다.
    //   ★ 랭크 수는 반드시 rankOf 로 얻어야 한다. 여기에 [5,5,5,3] 을 박아 두면
    //     교차 참조로 들어온 값만 표준 랭크로 잘린다. 제이스 Q 가 그랬다 —
    //     쿨타임은 6칸인데 피해량은 5칸이라 한 스킬 안에서 칸 수가 어긋났다.
    const keys = ['Q', 'W', 'E', 'R'];
    (rec.spells || []).forEach((p, i) => {
        if (i >= 4 || !bin[p] || !bin[p].mSpell) return;
        const r = rankOf(alias, keys[i]);
        put(p, bin[p].mSpell, r);
        putName(alias + keys[i], bin[p].mSpell, r);
    });
    const pp = rec.mCharacterPassiveSpell;
    if (bin[pp] && bin[pp].mSpell) {
        put(pp, bin[pp].mSpell, 1);
        putName(alias + 'P', bin[pp].mSpell, 1);
        putName(alias + 'Passive', bin[pp].mSpell, 1);
    }

    // 나머지 스펠 객체(미사일·소환물·변신판 등)는 이름으로만 추론한다.
    const prefix = `Characters/${alias}/Spells/`;
    const low = alias.toLowerCase();
    for (const p in bin) {
        if (!p.startsWith(prefix)) continue;
        const o = bin[p];
        if (!o || !o.mSpell) continue;
        const nameLow = String(o.ObjectName || p).toLowerCase();
        let r = 1;
        if (nameLow.includes(low + 'r')) r = rankOf(alias, 'R');
        else {
            const k = ['q', 'w', 'e'].find(x => nameLow.includes(low + x));
            if (k) r = rankOf(alias, k.toUpperCase());
        }
        put(p, o.mSpell, r);
    }
    return idx;
}

// f1, f2, Effect3Amount 처럼 스킬 고유 이름이 아니라
// 거의 모든 스펠 객체에 들어 있는 범용 슬롯 이름.
//   ★ 이런 이름으로 pool 을 뒤지면 엉뚱한 객체에서 아무 값이나 물어온다.
//     (바드 W f1 = 19/0/0/0/0 같은 쓰레기가 이렇게 생겼다)
//     그래서 범용 이름은 본체에서만 찾는다.
const GENERIC_NAME = /^(f\d+|Effect\d+Amount)$/i;

// 최상위 / mAmmo 필드 중에도 거의 모든 스펠 객체에 들어 있는 이름이 있다.
//   위와 같은 이유로 이것들도 본체에서만 찾는다.
//   (안 그러면 미사일 객체의 cooldownTime 같은 게 딸려 들어온다)
const GENERIC_FIELDS = new Set([
    'cooldowntime', 'mana', 'castrange', 'castrangedisplayoverride',
    'missilespeed', 'castradius', 'castconeangle', 'castconedistance',
    'casttime', 'linewidth', 'ammorechargetime', 'maxammo', 'ammousedpercast', 'cost',
]);

const isGenericName = (clean) =>
    GENERIC_NAME.test(clean) || GENERIC_FIELDS.has(clean.toLowerCase());

// 후보 목록을 순서대로 뒤져서 처음 성공하는 값을 쓴다.
function resolveFromPool(name, pool, maxRank) {
    // ★ 배율(*100)뿐 아니라 ".숫자" 꼬리도 여기서 같이 떼야 한다.
    //   안 그러면 f2.0 이 범용 이름으로 안 잡혀서 pool 전체를 뒤진다.
    const clean = String(name).trim()
        .replace(/\s*\*\s*-?[\d.]+$/, '')
        .replace(/\.\d+$/, '')
        .trim();
    const generic = isGenericName(clean);

    for (const cand of pool) {
        // pool 은 본체가 항상 맨 앞이다. 범용 이름이면 거기서 끊는다.
        if (generic && cand.tier !== '본체') break;
        const v = resolve(name, cand.spell, maxRank);
        if (v !== null) return { val: v, tier: cand.tier };
    }
    return { val: null, tier: null };
}

// ------------------------------------------------------------
// 기존 파일에서 블록 잘라내기 (build_champion_data.js 와 같은 방식)
// ------------------------------------------------------------
function extractBlock(source, alias) {
    const m = new RegExp(`"${alias}"\\s*:\\s*\\{`).exec(source);
    if (!m) return null;
    let i = m.index + m[0].length - 1, depth = 0, inStr = null, esc = false;
    for (; i < source.length; i++) {
        const ch = source[i];
        if (inStr) {
            if (esc) { esc = false; continue; }
            if (ch === '\\') { esc = true; continue; }
            if (ch === inStr) inStr = null;
            continue;
        }
        if (ch === '"' || ch === "'" || ch === '`') { inStr = ch; continue; }
        if (ch === '{') depth++;
        else if (ch === '}') { depth--; if (!depth) return source.slice(m.index, i + 1); }
    }
    return null;
}

// 손으로 쓴 v1 / v2 를 기존 파일에서 원문 그대로 떠 온다.
//   ★ 재생성은 값을 전부 새로 찍으므로, 이게 없으면 손으로 만든 피해량 줄이 매번 날아간다.
//     (지금은 가렌·갈리오 6자리뿐이지만 v1·v2 작성은 앞으로 할 일이라 미리 막아 둔다)
//   ★ 값이 한 줄이 아닐 수 있다. 가렌 P 의 v1 은 drawGraph 호출이 6줄이다.
//     그래서 문자열로 파싱하지 않고 "그 속성이 차지하는 줄들"을 통째로 옮긴다.
function extractVV(source, alias) {
    const block = extractBlock(source, alias);
    if (!block) return {};
    const out = {};
    const lines = block.split('\n');
    let key = null;
    for (let i = 0; i < lines.length; i++) {
        const mk = lines[i].match(/^\s{8}"([PQWER])":\s*\{/);
        if (mk) { key = mk[1]; continue; }
        const mv = lines[i].match(/^\s{12}"(v1|v2)":/);
        if (!mv || !key) continue;
        const buf = [lines[i]];
        let j = i + 1;
        // 같은 들여쓰기의 다음 속성이나 스킬 블록 끝을 만나면 멈춘다.
        for (; j < lines.length; j++) {
            if (/^\s{12}"/.test(lines[j]) || /^\s{8}\}/.test(lines[j])) break;
            buf.push(lines[j]);
        }
        let text = buf.join('\n').replace(/\s+$/, '');
        if (!text.endsWith(',')) text += ',';   // 뒤에 항상 cooldown 이 오므로 쉼표가 필요하다
        (out[key] = out[key] || {})[mv[1]] = text;
        i = j - 1;
    }
    return out;
}

const q = (s) => '"' + String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\r?\n/g, '\\n') + '"';

// ------------------------------------------------------------

async function main() {
    console.log(WRITE ? '[모드] 파일 생성' : '[모드] 미리보기 — 아무 파일도 건드리지 않습니다\n');

    const oldValues = fs.existsSync(SRC_VALUES) ? fs.readFileSync(SRC_VALUES, 'utf8') : '';
    const prelude = oldValues.indexOf('const customValues');
    const valuesPrelude = prelude === -1 ? '' : oldValues.slice(0, prelude);

    // 패시브 문장은 CD v1 에 없어서 stringtable 에서 가져온다 (stringtable.js 주석 참고)
    const strings = await loadStringTable({ refresh: process.argv.includes('--refresh') });

    const summary = await get(`${CD}/champion-summary.json`);
    const seen = new Set();
    const champions = summary
        .filter(c => c.id > 0)
        .sort((a, b) => a.id - b.id)
        .filter(c => { if (seen.has(c.name)) return false; seen.add(c.name); return true; })
        .sort((a, b) => a.name.localeCompare(b.name, 'ko'));

    console.log(`챔피언 ${champions.length}명\n`);

    const entries = [];
    let total = 0, filled = 0;
    const binFails = [];
    const stillUnknown = [];
    const partial = [];
    const rescued = [];   // 본체가 아닌 딸린 객체에서 건져낸 값

    for (let n = 0; n < champions.length; n++) {
        const c = champions[n];
        const alias = c.alias;

        if (PRESERVE.includes(alias)) {
            const b = extractBlock(oldValues, alias);
            if (b) entries.push(`    ${b}, // ${c.name} (직접 작성)`);
            continue;
        }

        // 손으로 쓴 피해량 줄은 재생성해도 살린다.
        const carried = extractVV(oldValues, alias);

        let v1, bin;
        try { v1 = await get(`${CD}/champions/${c.id}.json`); }
        catch (e) { binFails.push(`${c.name} v1(${e.message})`); await sleep(DELAY); continue; }

        try {
            const low = alias.toLowerCase();
            bin = await get(`${BIN}/${low}/${low}.bin.json`);
        } catch (e) {
            binFails.push(`${c.name} bin(${e.message})`);
            await sleep(DELAY);
            continue;
        }

        const binSpells = getSpellsFromBin(bin, alias);
        spellIndex = buildSpellIndex(bin, alias);   // @spell.X:Y@ 교차 참조용
        // 이제 키는 항상 있고 값이 배열이다. 전부 비어 있으면 CharacterRecord 를 못 읽은 것.
        if (!Object.values(binSpells).some(arr => arr.length)) binFails.push(`${c.name} CharacterRecord 없음`);

        // ---- 패시브 ----
        // 문장은 stringtable 에서 온다. build_champion_data.js 와 같은 경로를 써야
        // 템플릿의 {pN} 번호와 여기서 매기는 pN 이 어긋나지 않는다.
        const passiveRaw = getPassiveTooltip(bin, alias, strings);
        const passiveNames = passiveRaw
            ? [...new Set([...String(passiveRaw)
                .replace(/@SpellModifierDescriptionAppend@/gi, '')
                .matchAll(/@([A-Za-z0-9_.*+\-/():]+?)@/g)].map(x => x[1].trim()))]
            : [];

        const previewLines = [];
        const lines = [];
        if (!passiveNames.length) {
            // 빈칸이 없어도 손으로 쓴 피해량 줄이 있으면 한 줄짜리로 못 줄인다.
            if (carried.P && (carried.P.v1 !== undefined || carried.P.v2 !== undefined)) {
                lines.push(`        "P": {`);
                if (carried.P.v1 !== undefined) lines.push(carried.P.v1);
                if (carried.P.v2 !== undefined) lines.push(carried.P.v2);
                lines.push(`            "cooldown": "-",`);
                lines.push(`            "cost": "-"`);
                lines.push(`        },`);
            } else {
                lines.push(`        "P": { "cooldown": "-", "cost": "-" },`);
            }
        } else {
            lines.push(`        "P": {`);
            passiveNames.forEach((name, i) => {
                total++;
                ctx = `${c.name} P / ${name}`;
                const mKeyKo = `${c.name} P / ${name}`;
                const mKeyEn = `${alias} P / ${name}`;
                const manual = MANUAL[mKeyKo] !== undefined ? MANUAL[mKeyKo] : MANUAL[mKeyEn];

                let val, tier;
                if (manual !== undefined) {
                    val = manual;
                    tier = '수동';
                    manualUsed.add(MANUAL[mKeyKo] !== undefined ? mKeyKo : mKeyEn);
                } else {
                    // ★ 패시브는 스킬 랭크가 없다. 레벨별 배열이 아니라 한 값이라 maxRank = 1.
                    //   챔피언 레벨에 따라 변하는 값은 보간 조각(guessPart)이 따로 처리한다.
                    ({ val, tier } = resolveFromPool(name, binSpells.P || [], 1));
                }

                if (val === null) stillUnknown.push(`${c.name} P / ${name}`);
                else if (String(val).includes('(?)')) partial.push(`${c.name} P / ${name} = ${val}`);
                else {
                    filled++;
                    if (tier !== '본체' && tier !== '수동') rescued.push(`${c.name} P / ${name} = ${val}  [${tier}]`);
                }
                previewLines.push(`      P p${i + 1} (${name}) = ${val === null ? '?' : val}`);
                lines.push(`            "p${i + 1}": ${q(val === null ? '?' : val)}, // ${name}`);
            });
            // 패시브는 원래 v1/v2 를 안 찍는다. 손으로 쓴 게 있을 때만 살려서 넣는다.
            if (carried.P && carried.P.v1 !== undefined) lines.push(carried.P.v1);
            if (carried.P && carried.P.v2 !== undefined) lines.push(carried.P.v2);
            lines.push(`            "cooldown": "-",`);
            lines.push(`            "cost": "-"`);
            lines.push(`        },`);
        }
        const seenKey = new Set();

        for (const s of (v1.spells || [])) {
            const key = String(s.spellKey || '').toUpperCase();
            if (!['Q', 'W', 'E', 'R'].includes(key) || seenKey.has(key)) continue;
            seenKey.add(key);

            const desc = (s.dynamicDescription || '').replace(/@SpellModifierDescriptionAppend@/gi, '');
            // ★ ':' 포함. build_champion_data.js 의 convertDescription 과 반드시 같아야 한다.
            //   여기가 어긋나면 문장의 {pN} 개수와 값의 pN 개수가 안 맞는다.
            const names = [...new Set([...desc.matchAll(/@([A-Za-z0-9_.*+\-/():]+?)@/g)].map(x => x[1].trim()))];

            const maxRank = rankOf(alias, key);
            const pool = binSpells[key] || [];
            const spell = pool.length ? pool[0].spell : null;   // 본체 (최상위 필드용)

            // 쿨타임을 먼저 구해 둔다. CooldownMultiplierCalculationPart 가 참조한다.
            const lvTop = (arr, r) => {
                if (!Array.isArray(arr)) return null;
                const p = arr.slice(0, r).map(tidy);
                return p.every(x => x === p[0]) ? p[0] : p.join(' / ');
            };
            currentCooldown = lvTop(s.cooldownCoefficients, maxRank) || '-';

            const pLines = names.map((name, i) => {
                total++;
                ctx = `${c.name} ${key} / ${name}`;

                // 손으로 확인한 값이 있으면 그걸 쓴다 (한글 이름 / 영문 alias 둘 다 허용)
                const mKeyKo = `${c.name} ${key} / ${name}`;
                const mKeyEn = `${alias} ${key} / ${name}`;
                const manual = MANUAL[mKeyKo] !== undefined ? MANUAL[mKeyKo] : MANUAL[mKeyEn];

                let val, tier;
                if (manual !== undefined) {
                    val = manual;
                    tier = '수동';
                    manualUsed.add(MANUAL[mKeyKo] !== undefined ? mKeyKo : mKeyEn);
                } else {
                    ({ val, tier } = resolveFromPool(name, pool, maxRank));
                }

                if (val === null) stillUnknown.push(`${c.name} ${key} / ${name}`);
                else if (String(val).includes('(?)')) partial.push(`${c.name} ${key} / ${name} = ${val}`);
                else {
                    filled++;
                    if (tier !== '본체' && tier !== '수동') rescued.push(`${c.name} ${key} / ${name} = ${val}  [${tier}]`);
                }
                previewLines.push(`      ${key} p${i + 1} (${name}) = ${val === null ? '?' : val}` +
                    (tier === '수동' ? '   <- 수동 확인값'
                        : (tier && tier !== '본체' ? `   <- ${tier} 객체` : '')));
                return `            "p${i + 1}": ${q(val === null ? '?' : val)}, // ${name}`;
            });

            // bin 의 최상위 필드 (castRange, mana, cooldownTime ...)
            // 이쪽은 DataValues 와 달리 0번부터 실제 1랭크다.
            const lv0 = (arr, r) => {
                if (!Array.isArray(arr) || !arr.length) return null;
                const p = arr.slice(0, r).map(tidy);
                return p.every(x => x === p[0]) ? p[0] : p.join(' / ');
            };
            const binRange = spell
                ? (lv0(spell.castRangeDisplayOverride, maxRank) || lv0(spell.castRange, maxRank))
                : null;
            const binMana = spell ? lv0(spell.mana, maxRank) : null;
            const castTime = (spell && typeof spell.mCastTime === 'number' && spell.mCastTime > 0)
                ? tidy(spell.mCastTime) : null;
            // 투사체 속도는 본체가 아니라 미사일 객체에 붙는다. 후보 전체에서 찾는다.
            let missileSpeed = null;
            for (const cand of pool) {
                const ms = cand.spell.missileSpeed;
                if (typeof ms === 'number' && ms > 0) { missileSpeed = tidy(ms); break; }
            }
            const lineWidth = (spell && typeof spell.mLineWidth === 'number' && spell.mLineWidth > 0)
                ? tidy(spell.mLineWidth) : null;

            const lv = lvTop;
            const cd = currentCooldown;
            const costJ = lv(s.costCoefficients, maxRank);
            let cost = (costJ && !/^0( \/ 0)*$/.test(costJ)) ? costJ : '';
            if (!cost) {
                if (binMana && !/^0( \/ 0)*$/.test(binMana)) cost = binMana;
                else if (/없음/.test(s.cost || '')) cost = '-';
            }
            // 사거리는 클라이언트 표시값(castRangeDisplayOverride)을 우선한다
            const v1Range = lv(s.range, maxRank);
            const rng = (binRange && !/^0( \/ 0)*$/.test(binRange)) ? binRange : v1Range;
            const hasRange = rng && !/^0( \/ 0)*$/.test(rng);

            lines.push(`        "${key}": {`);
            if (pLines.length) lines.push(pLines.join('\n'));
            // 손으로 쓴 게 있으면 원문 그대로, 없으면 빈칸.
            const vv = carried[key] || {};
            lines.push(vv.v1 !== undefined ? vv.v1 : `            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)`);
            lines.push(vv.v2 !== undefined ? vv.v2 : `            "v2": "",`);
            lines.push(`            "cooldown": ${q(cd)},`);
            lines.push(`            "cost": ${q(cost)},`);
            const statRows = [];
            if (hasRange) statRows.push(`                "사거리": ${q(rng)}`);
            if (castTime) statRows.push(`                "시전시간": ${q(castTime)}`);
            if (missileSpeed) statRows.push(`                "투사체 속도": ${q(missileSpeed)}`);
            if (lineWidth) statRows.push(`                "스킬 폭": ${q(lineWidth)}`);
            if (statRows.length) lines.push(`            "stats": {\n${statRows.join(',\n')}\n            }`);
            // 마지막 항목 뒤 쉼표 제거
            const last = lines[lines.length - 1];
            if (last.endsWith(',') && !last.endsWith('},')) lines[lines.length - 1] = last.slice(0, -1);
            lines.push(`        },`);
        }

        entries.push(`    "${alias}": { // ${c.name}\n${lines.join('\n')}\n    },`);

        if (PREVIEW.includes(alias)) {
            console.log(`--- ${c.name} (${alias}) ---`);
            previewLines.forEach(l => console.log(l));
            console.log('');
        } else if (n % 20 === 0) {
            console.log(`  (${n + 1}/${champions.length})`);
        }

        await sleep(DELAY);
    }

    console.log('\n' + '='.repeat(60));
    console.log(`완전히 채워짐: ${filled}/${total} (${total ? Math.round(filled / total * 100) : 0}%)`);
    console.log(`  그중 딸린 객체에서 건진 것: ${rescued.length}개`);
    console.log(`계수 일부 미해결: ${partial.length}개`);
    console.log(`아예 못 채움: ${stillUnknown.length}개`);

    if (rescued.length) {
        console.log(`\n[딸린 객체에서 건진 값] ${rescued.length}개 (앞 25개) — 수치가 맞는지 눈으로 확인할 것:`);
        rescued.slice(0, 25).forEach(x => console.log(`  ${x}`));
    }

    console.log(`손으로 확인한 값 적용: ${manualUsed.size}/${Object.keys(MANUAL).length}개`);
    const manualUnused = Object.keys(MANUAL).filter(k => !manualUsed.has(k));
    if (manualUnused.length) {
        console.log(`\n[안 쓰인 수동 확인값] 키 오타일 수 있습니다:`);
        manualUnused.forEach(k => console.log(`  ${k}`));
    }

    if (guessedList.length) {
        console.log(`\n[모양으로 추측해서 푼 값] ${guessedList.length}개 — 인게임 툴팁과 대조할 것:`);
        guessedList.forEach(x => console.log(`  ${x}`));
    }

    // ? 가드에 걸려 Data Dragon 툴팁으로 폴백될 스킬 목록.
    //   못 채운 값이든 (?) 가 남은 값이든, 그 문장은 통째로 버려진다.
    const fallback = new Map();
    const noteFallback = (line) => {
        const skill = String(line).split(' / ')[0];
        fallback.set(skill, (fallback.get(skill) || 0) + 1);
    };
    stillUnknown.forEach(noteFallback);
    partial.forEach(noteFallback);
    if (fallback.size) {
        console.log(`\n[DD 폴백 예정 스킬] ${fallback.size}개 — 이 스킬들은 문장이 통째로 버려지고 Data Dragon 툴팁이 뜬다:`);
        [...fallback.entries()].sort().forEach(([k, n]) => console.log(`  ${k}   (빈칸 ${n}개)`));
    }

    if (zeroDrop.length) {
        console.log(`\n[0으로 보고 버린 항] ${zeroDrop.length}개 — 참조 대상이 bin 에 없는 자리:`);
        zeroDrop.forEach(x => console.log(`  ${x}`));
    }

    if (caseList.length) {
        console.log(`\n[대소문자가 어긋나서 찾아낸 이름] ${caseList.length}종 — 툴팁 철자와 bin 철자가 다른 자리:`);
        caseList.forEach(x => console.log(`  ${x}`));
    }

    if (crossHits.size || crossMiss.length) {
        console.log(`\n[@spell.X:Y@ 교차 참조] 풀어냄 ${crossHits.size}자리 / 실패 ${crossMiss.length}자리`);
        crossMiss.forEach(x => console.log(`  실패: ${x}`));
    }

    if (hashHits.size) {
        console.log(`\n[FNV 해시로 찾아낸 이름] ${hashHits.size}자리 — CD 가 이름을 못 푼 {해시} 자리다:`);
        [...hashHits].forEach(x => console.log(`  ${x}`));
    }

    if (viaField.length) {
        console.log(`\n[최상위 / mAmmo 필드에서 건진 값] ${viaField.length}개 — 새 경로다. 인게임 툴팁과 대조할 것:`);
        viaField.forEach(x => console.log(`  ${x}`));
    }

    if (dotList.length) {
        console.log(`\n[".숫자" 꼬리를 처리한 값] ${dotList.length}개 — 자릿수 해석이 확정이 아니다. 대조할 것:`);
        console.log(`  (틀렸으면 파일 위쪽 DOT_AS_PRECISION 을 false 로)`);
        dotList.forEach(x => console.log(`  ${x}`));
    }

    if (unknownStats.size) {
        console.log('\n[모르는 스탯 번호] 아래 스킬을 인게임에서 열어 보고 STAT_NAMES 에 추가:');
        [...unknownStats.entries()].sort((a, b) => b[1].count - a[1].count)
            .forEach(([id, e]) => {
                console.log(`  mStat ${id}  (${e.count}회)`);
                e.where.forEach(w => console.log(`      ${w}`));
            });
    }
    if (unknownParts.size) {
        console.log('\n[모르는 계산식 종류] 필드 이름을 보고 정체를 판단할 것:');
        [...unknownParts.entries()].sort((a, b) => b[1].count - a[1].count)
            .forEach(([t, e]) => {
                console.log(`  ${t}  (${e.count}회, 그중 추측 성공 ${e.solved}회)`);
                console.log(`      필드: ${e.keys}`);
                console.log(`      내용: ${e.sample}`);
                e.where.forEach(w => console.log(`      ${w}`));
            });
    }
    if (binFails.length) {
        console.log(`\n[bin 로드 실패] ${binFails.length}건: ${binFails.slice(0, 15).join(', ')}`);
    }
    if (partial.length) {
        console.log(`\n[계수가 일부 빠진 값] ${partial.length}개 (앞 15개):`);
        partial.slice(0, 15).forEach(x => console.log(`  ${x}`));
    }
    if (stillUnknown.length) {
        console.log(`\n[못 채운 값] ${stillUnknown.length}개 (앞 20개):`);
        stillUnknown.slice(0, 20).forEach(x => console.log(`  ${x}`));
    }

    if (WRITE) {
        fs.writeFileSync(OUT_VALUES,
            valuesPrelude + `const customValues = {\n${entries.join('\n')}\n};\n`, 'utf8');
        console.log(`\n생성됨: ${OUT_VALUES}`);
        console.log('확인한 뒤 custom_values.js 로 이름을 바꾸세요.');
    } else {
        console.log('\n미리보기였습니다. 결과가 괜찮으면 --write 를 붙여 다시 실행하세요.');
    }
}

main().catch(e => { console.error('실패:', e); process.exit(1); });