// 방송 탭 — 손 명단 (2026-09-17)
//
// ① include / exclude — 유튜브 채널 (2026-09-17 낮)
//   유튜브는 「지금 롤 방송 중인 채널」을 API 로 거를 수 없어서 InnerTube 로 후보를 모으고 공식 API 로 확인한다 (docs/방송.md).
//   include — 자동으로 안 잡혀도 **항상** 확인할 채널 · exclude — 자동으로 잡혀도 **절대** 안 보여 줄 채널
//   ★ 값은 채널 ID(`UC` 로 시작하는 24자)다. 채널 주소가 `/@이름` 꼴이면 그 페이지 소스에서 `"channelId":"UC…"` 를 찾으면 된다.
//
// ② streamers — 방송인 ↔ 라이엇 계정 (2026-09-17 밤) · ③ pros — 프로게이머 (같은 날 밤, 아래)
//   플랫폼 어디에도 「이 방송인 = 이 라이엇 계정」 칸이 없어서(SOOP·치지직·유튜브 실측) 손으로 잇는다.
//   그 방송인이 켜졌을 때 여기 적힌 계정들의 솔로 랭크를 받아 **제일 높은 계정** 하나를 카드에 붙인다.
//   - p  : 'soop' | 'chzzk' | 'youtube'
//   - ch : 채널 키 — SOOP 은 user_id(방송 주소 `play.sooplive.co.kr/<user_id>/…`), 치지직은 channelId(`chzzk.naver.com/live/<channelId>`),
//          유튜브는 채널 ID(UC…). `/api/broadcast` 응답의 `ch` 칸에 그대로 찍힌다
//   - riot : 라이엇 ID(`이름#태그`) 목록. 계정이 여럿이면 다 적는다 — 서버가 제일 높은 쪽을 고른다
//   - name : 알아보기 위한 메모일 뿐 코드가 안 쓴다
//   ★ 아래 첫 명단은 deeplol 의 스트리머 등록 페이지(방송인이 직접 등록한 계정)를 참고해 **라이엇 API 로 하나씩 검증**한 것이다 (2026-09-17).
//     존재하지 않거나 언랭인 계정은 넣지 않았다. 새로 넣을 땐 `node -e` 로 account-v1 한 번 쳐서 태그까지 맞는지 보고 넣을 것.
//   ★ 고치고 push 하면 다음 배포부터 반영된다. 이름과 태그는 라이엇이 돌려주는 대소문자 그대로 적는다 (조회는 대소문자를 안 가린다)
module.exports = {
    include: [
        // { id: 'UCxxxxxxxxxxxxxxxxxxxxxx', name: '방송인 이름' },
    ],
    exclude: [
        // { id: 'UCxxxxxxxxxxxxxxxxxxxxxx', name: '롤이 아닌 채널' },
    ],
    streamers: [
        // 유튜브
        { p: 'youtube', ch: 'UCi-0jmyw3x6efk090BAVfxA', name: '이렐킹 IRELKING', riot: ['Aileri#KR1', 'IRELKlNG#KR1'] },
        { p: 'youtube', ch: 'UC6NXJtCn3p-actkvBUlHwDA', name: 'Destiny (데스티니)', riot: ['Destiny#KR1'] },
        { p: 'youtube', ch: 'UCtw0ps1uVzu2ofniZ7hOCxA', name: '큰코3', riot: ['멋있는닉네임#KK3'] },
        // 치지직
        { p: 'chzzk', ch: '993db7ed89d68093a278b094812490f5', name: '이렐킹123', riot: ['Aileri#KR1', 'IRELKlNG#KR1'] },
        { p: 'chzzk', ch: 'ee13045c9ed607c994ee338d6f8cffb4', name: '데스티니 Destiny', riot: ['Destiny#KR1'] },
        { p: 'chzzk', ch: '4de764d9dad3b25602284be6db3ac647', name: '아리사', riot: ['대전오면죽인다#042'] },
        { p: 'chzzk', ch: '42597020c1a79fb151bd9b9beaa9779b', name: '파카', riot: ['Akaps#KR1'] },
        { p: 'chzzk', ch: '57c917f1bc650791d8ca3fec1ebcca18', name: '유봄냥', riot: ['매혹절정유봄냥#0506'] },
        { p: 'chzzk', ch: '06b9893c6d74cea0c031b0270600f365', name: '돌 카사', riot: ['살퀸레#KR1', '레고팜#KR1'] },
        { p: 'chzzk', ch: '68daca14bebc804d56b3dc601c8e7aff', name: '리 이', riot: ['리 이#2320'] },
        // SOOP
        { p: 'soop', ch: 'tjfxkd7698', name: '데스티니:D', riot: ['Destiny#KR1'] },
        { p: 'soop', ch: 'ehdrb866', name: 'BJ훈수킹', riot: ['달라지는 수킹이#초심은유지'] },
        { p: 'soop', ch: '1004suna', name: '임아니', riot: ['임부선#튼실하네'] },
        { p: 'soop', ch: 'gjstn7637', name: '아뚱.', riot: ['뚱딴지구독점yo#DDG', 'TES Wegovi#GAM'] },
        { p: 'soop', ch: 'gksdidqksxn', name: '준밧드', riot: ['바뜨엥용#kr11', 'BBAADD#KR1'] },
        { p: 'soop', ch: 'dntnals1224', name: '짐승녀', riot: ['짐승녀#KR1', '수미니#7879'] },
        { p: 'soop', ch: 'loraangel', name: '뀨삐', riot: ['뀨 삐#1999'] },
        { p: 'soop', ch: 'arthur1220', name: 'BJ금똥왁왁', riot: ['레넥톤 장인#KR1', '금똥왁왁#부캐입니당'] },
        { p: 'soop', ch: 'kissting', name: '함성', riot: ['함 성#Yun', '함 성#HSTV'] },
        { p: 'soop', ch: 'baebbbbb', name: '꽃뇽', riot: ['꽃뇽님#KR1'] },
        { p: 'soop', ch: 'wlgh357', name: '꾸링♥', riot: ['꾸 링#1027'] },
        { p: 'soop', ch: 'sirazz', name: '유시라', riot: ['유시라#쿨 쿨'] },
        { p: 'soop', ch: 'kmj05317', name: '우리밍_', riot: ['우리밍#ming'] },
        { p: 'soop', ch: 'jhw215', name: '헤니♥', riot: ['벨루가#215'] },
        { p: 'soop', ch: 'nanaming4', name: '마우낭', riot: ['마우낭#KR1'] },
        { p: 'soop', ch: 'ntkdrhwlsdnr', name: 'BJ원형', riot: ['SOOPBJ원형#KR2', 'SG워너비 김용준#KR1', '트젠원형#167'] },
        { p: 'soop', ch: 'baekjidesu', name: '백지라구', riot: ['냐로롱#S2S2'] },
        { p: 'soop', ch: 'gydnjs5742', name: '전뚜기', riot: ['전효원#KR1', 'FA DDUGI#전뚜기', 'Soop전뚜기#성장중'] },
        { p: 'soop', ch: 'hyan9707', name: '김혀니', riot: ['기며니#KR2', '잼처럼 발라드림#KR1'] },
        // ★ 못 찾은 사람 (deeplol 미등록 · 위키에 태그 없음): 노페 · 김군 · 앰비션 · 도파 · 크캣 · 디나이05 · 챌린저카인 · 미키 · 스피릿 · 태평창 · 스오 · 희태시기(유튜브 채널 ID 미확인, 계정은 희태시기#КR1 — 태그의 К 가 키릴 문자다)
        // ★ 前 프로인 방송인은 여기(방송인)에 두고 `ex: 'T1'` 처럼 옛 소속을 적는다 → 「前 T1」 배지. 테디는 2026 BRO 주전이라 아래 pros 에 있다
        // ★ 닉네임을 바꿔도 따라간다 — 서버가 처음 찾은 puuid 를 DB 에 두고 그걸로 조회한다. 여기 적힌 ID 가 처음부터 404 일 때만 고치면 된다
    ],
    // ③ 프로게이머 — 2026 LCK 정규 로스터 10팀 50명 (2026-09-17 밤). 방송인 티어 페이지의 「프로게이머」 탭
    //   - 로스터: lolesports livestats 로 뽑은 최근 경기 주전 (docs/방송.md 그 절)
    //   - riot : deeplol `/pro/<이름>` 등록 계정을 라이엇 API 로 검증한 것 (랭크 있는 계정만). 서버가 제일 높은 계정을 고른다
    //   - 「계정 미확인」 11명은 riot 이 비어 있어 표에 티어 「-」 로 나온다. 알게 되면 채울 것
    //   - teamImg 는 lolesports getTeams 의 image (http 는 서버가 https 로 바꾼다)
    pros: [
        // DK — Dplus KIA
        { name: 'Siwoo', team: 'DK', role: 'top', teamImg: 'http://static.lolesports.com/teams/1673260049703_DPlusKIALOGO11.png', riot: ['TOPKING#asd', '아무것도 몰라요#12345'] },
        { name: 'Lucid', team: 'DK', role: 'jungle', teamImg: 'http://static.lolesports.com/teams/1673260049703_DPlusKIALOGO11.png', riot: [] },   // 계정 미확인
        { name: 'ShowMaker', team: 'DK', role: 'mid', teamImg: 'http://static.lolesports.com/teams/1673260049703_DPlusKIALOGO11.png', riot: ['DK ShowMaker#KR1', 'MIDKING#asd', 'DWG KIA#KR1'] },
        { name: 'Smash', team: 'DK', role: 'bottom', teamImg: 'http://static.lolesports.com/teams/1673260049703_DPlusKIALOGO11.png', riot: [] },   // 계정 미확인
        { name: 'Career', team: 'DK', role: 'support', teamImg: 'http://static.lolesports.com/teams/1673260049703_DPlusKIALOGO11.png', riot: ['인간 병기#0829', '팽도리#1015'] },
        // T1 — T1
        { name: 'Doran', team: 'T1', role: 'top', teamImg: 'http://static.lolesports.com/teams/1726801573959_539px-T1_2019_full_allmode.png', riot: [] },   // 계정 미확인
        { name: 'Oner', team: 'T1', role: 'jungle', teamImg: 'http://static.lolesports.com/teams/1726801573959_539px-T1_2019_full_allmode.png', riot: ['오 너#111'] },
        { name: 'Faker', team: 'T1', role: 'mid', teamImg: 'http://static.lolesports.com/teams/1726801573959_539px-T1_2019_full_allmode.png', riot: ['Hide on bush#KR1'] },
        { name: 'Peyz', team: 'T1', role: 'bottom', teamImg: 'http://static.lolesports.com/teams/1726801573959_539px-T1_2019_full_allmode.png', riot: ['Peyz#KR11'] },
        { name: 'Keria', team: 'T1', role: 'support', teamImg: 'http://static.lolesports.com/teams/1726801573959_539px-T1_2019_full_allmode.png', riot: ['Ciro#KR10'] },
        // HLE — HLE
        { name: 'Zeus', team: 'HLE', role: 'top', teamImg: 'http://static.lolesports.com/teams/1631819564399_hle-2021-worlds.png', riot: ['Athene#lll', '배달음식추천부탁#KR1'] },
        { name: 'Kanavi', team: 'HLE', role: 'jungle', teamImg: 'http://static.lolesports.com/teams/1631819564399_hle-2021-worlds.png', riot: ['vinaka#KR1'] },
        { name: 'Zeka', team: 'HLE', role: 'mid', teamImg: 'http://static.lolesports.com/teams/1631819564399_hle-2021-worlds.png', riot: [] },   // 계정 미확인
        { name: 'Gumayusi', team: 'HLE', role: 'bottom', teamImg: 'http://static.lolesports.com/teams/1631819564399_hle-2021-worlds.png', riot: ['HLE Gumayusi#0298', 'thsorre#2830'] },
        { name: 'Delight', team: 'HLE', role: 'support', teamImg: 'http://static.lolesports.com/teams/1631819564399_hle-2021-worlds.png', riot: ['플레이리스트겨울#KR1'] },
        // GEN — Gen.G
        { name: 'Kiin', team: 'GEN', role: 'top', teamImg: 'http://static.lolesports.com/teams/1773829250929_GENGLOGO_GOLD.png', riot: ['kiin#KR1'] },
        { name: 'Canyon', team: 'GEN', role: 'jungle', teamImg: 'http://static.lolesports.com/teams/1773829250929_GENGLOGO_GOLD.png', riot: ['JUGKlNG#kr'] },
        { name: 'Chovy', team: 'GEN', role: 'mid', teamImg: 'http://static.lolesports.com/teams/1773829250929_GENGLOGO_GOLD.png', riot: ['허거덩#0303'] },
        { name: 'Ruler', team: 'GEN', role: 'bottom', teamImg: 'http://static.lolesports.com/teams/1773829250929_GENGLOGO_GOLD.png', riot: ['강 철#샤 넬'] },
        { name: 'Duro', team: 'GEN', role: 'support', teamImg: 'http://static.lolesports.com/teams/1773829250929_GENGLOGO_GOLD.png', riot: ['Duro#Gen'] },
        // KT — kt Rolster
        { name: 'PerfecT', team: 'KT', role: 'top', teamImg: 'http://static.lolesports.com/teams/kt_darkbackground.png', riot: [] },   // 계정 미확인
        { name: 'Cuzz', team: 'KT', role: 'jungle', teamImg: 'http://static.lolesports.com/teams/kt_darkbackground.png', riot: ['Cuzz#KR1', '독침붕#딱충이'] },
        { name: 'Bdd', team: 'KT', role: 'mid', teamImg: 'http://static.lolesports.com/teams/kt_darkbackground.png', riot: ['메탈가루몬#0509'] },
        { name: 'Jiwoo', team: 'KT', role: 'bottom', teamImg: 'http://static.lolesports.com/teams/kt_darkbackground.png', riot: ['중승민#중센조', 'DRX Jiwoo#123'] },
        { name: 'Effort', team: 'KT', role: 'support', teamImg: 'http://static.lolesports.com/teams/kt_darkbackground.png', riot: ['Effort#4444'] },
        // BFX — BNK FEARX
        { name: 'Clear', team: 'BFX', role: 'top', teamImg: 'http://static.lolesports.com/teams/1734691810721_BFXfullcolorfordarkbg.png', riot: [] },   // 계정 미확인
        { name: 'Raptor', team: 'BFX', role: 'jungle', teamImg: 'http://static.lolesports.com/teams/1734691810721_BFXfullcolorfordarkbg.png', riot: [] },   // 계정 미확인
        { name: 'VicLa', team: 'BFX', role: 'mid', teamImg: 'http://static.lolesports.com/teams/1734691810721_BFXfullcolorfordarkbg.png', riot: ['대광 #God'] },
        { name: 'Taeyoon', team: 'BFX', role: 'bottom', teamImg: 'http://static.lolesports.com/teams/1734691810721_BFXfullcolorfordarkbg.png', riot: [] },   // 계정 미확인
        { name: 'Kellin', team: 'BFX', role: 'support', teamImg: 'http://static.lolesports.com/teams/1734691810721_BFXfullcolorfordarkbg.png', riot: ['댕청잇#KR123', '참새크면비둘기#KR1'] },
        // BRO — BRION
        { name: 'Casting', team: 'BRO', role: 'top', teamImg: 'http://static.lolesports.com/teams/1716454325887_Nowyprojekt.png', riot: ['Mela#KR11', 'Casting#KR11'] },
        { name: 'GIDEON', team: 'BRO', role: 'jungle', teamImg: 'http://static.lolesports.com/teams/1716454325887_Nowyprojekt.png', riot: ['GIDEON#KR2', '초록이필요해#KR3'] },
        { name: 'Roamer', team: 'BRO', role: 'mid', teamImg: 'http://static.lolesports.com/teams/1716454325887_Nowyprojekt.png', riot: ['우 맨#who', '택배기사#한 진'] },
        { name: 'Teddy', team: 'BRO', role: 'bottom', teamImg: 'http://static.lolesports.com/teams/1716454325887_Nowyprojekt.png', riot: ['Teddy#sss'] },
        { name: 'Namgung', team: 'BRO', role: 'support', teamImg: 'http://static.lolesports.com/teams/1716454325887_Nowyprojekt.png', riot: ['shkz#kr33'] },
        // NS — 농심
        { name: 'Kingen', team: 'NS', role: 'top', teamImg: 'http://static.lolesports.com/teams/NSFullonDark.png', riot: ['Kingen#KR1'] },
        { name: 'Sponge', team: 'NS', role: 'jungle', teamImg: 'http://static.lolesports.com/teams/NSFullonDark.png', riot: ['Not Bad#KR2'] },
        { name: 'Scout', team: 'NS', role: 'mid', teamImg: 'http://static.lolesports.com/teams/NSFullonDark.png', riot: ['미북이#KR1'] },
        { name: 'Diable', team: 'NS', role: 'bottom', teamImg: 'http://static.lolesports.com/teams/NSFullonDark.png', riot: ['적수가없는사람#KR1', '딜잘넣는원딜임#KR1', 'LSB Diable#KR1'] },
        { name: 'Lehends', team: 'NS', role: 'support', teamImg: 'http://static.lolesports.com/teams/NSFullonDark.png', riot: ['Lehends#KR1', '따따불#코드네임'] },
        // KRX — KIWOOM DRX
        { name: 'Frog', team: 'KRX', role: 'top', teamImg: 'http://static.lolesports.com/teams/1774247803537_horizontal_EN_Wh.png', riot: [] },   // 계정 미확인
        { name: 'Willer', team: 'KRX', role: 'jungle', teamImg: 'http://static.lolesports.com/teams/1774247803537_horizontal_EN_Wh.png', riot: ['KRX Willer#KRX', '무관빈#48KG', '김정현#Kjh1'] },
        { name: 'Ucal', team: 'KRX', role: 'mid', teamImg: 'http://static.lolesports.com/teams/1774247803537_horizontal_EN_Wh.png', riot: ['KRX Ucal#0130', '미드가우갈#가내현', '무자식#내 현'] },
        { name: 'Aiming', team: 'KRX', role: 'bottom', teamImg: 'http://static.lolesports.com/teams/1774247803537_horizontal_EN_Wh.png', riot: ['아카루이#xxxx', '아이린#KR1'] },
        { name: 'Andil', team: 'KRX', role: 'support', teamImg: 'http://static.lolesports.com/teams/1774247803537_horizontal_EN_Wh.png', riot: ['상승민#빈약조', '안녕하시렵니까#신 사'] },
        // DNS — DN SOOPers
        { name: 'DuDu', team: 'DNS', role: 'top', teamImg: 'http://static.lolesports.com/teams/1767340467921_DN_SOOPerslogo_profile.webp', riot: [] },   // 계정 미확인
        { name: 'Sharvel', team: 'DNS', role: 'jungle', teamImg: 'http://static.lolesports.com/teams/1767340467921_DN_SOOPerslogo_profile.webp', riot: ['Sharvel#1102'] },
        { name: 'Clozer', team: 'DNS', role: 'mid', teamImg: 'http://static.lolesports.com/teams/1767340467921_DN_SOOPerslogo_profile.webp', riot: ['Clozer#0727'] },
        { name: 'deokdam', team: 'DNS', role: 'bottom', teamImg: 'http://static.lolesports.com/teams/1767340467921_DN_SOOPerslogo_profile.webp', riot: ['New York#dream', 'Snow Country#0405'] },
        { name: 'Peter', team: 'DNS', role: 'support', teamImg: 'http://static.lolesports.com/teams/1767340467921_DN_SOOPerslogo_profile.webp', riot: [] },   // 계정 미확인
    ]
};
