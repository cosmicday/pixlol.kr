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
        // ---- 2026-09-17 밤 2차 — 그 시각 켜져 있던 방송인 297명을 deeplol 스트리머 페이지로 훑어 86명이 나왔고, 라이엇 API 로 검증해 랭크 계정이 있는 76명 ----
        { p: 'soop', ch: 'joey1114', name: '저라뎃', riot: ['JustLikeThatKR#KR1'] },
        { p: 'soop', ch: 'rhakdncjs90', name: '으냉이', riot: ['무신은#안울어'] },
        { p: 'soop', ch: 'dudadi770', name: '듀단.', riot: ['듀부선#튼실하네', '신길동개구리#kr2'] },
        { p: 'soop', ch: 'gks2wl', name: '앵지', riot: ['짱 지#kr0'] },
        { p: 'soop', ch: 'qkektmddus23', name: '김레미_', riot: ['김레미#김레미'] },
        { p: 'soop', ch: 'mingee1030', name: '야옹민지', riot: ['멍멍민지#KR2', '애들아내가못해서미안해#kr2'] },
        { p: 'soop', ch: 'hjy5977', name: '매운탕', riot: ['땅울림#운탕이', 'AFTV BJ매운탕#KR1', '운 탕#KR1'] },
        { p: 'chzzk', ch: '6b54bf10f2430f449c49ee92d7795ec8', name: '곰팡호', riot: ['S낭만검객S#KR1', 'MiloBramble#KR1', '곰팡호#Chzzk'] },
        { p: 'soop', ch: 'dbstn3434', name: '박권혁', riot: ['그레이브즈하지마#235'] },
        { p: 'soop', ch: 'ongssim2', name: '강먐미', riot: ['강먐미#입니다'] },
        { p: 'soop', ch: 'rkdms754', name: '가니꾸', riot: ['타 곤 산#모른다고'] },
        { p: 'soop', ch: 'tpdms12', name: '세으나', riot: ['모두모여라#0000'] },
        { p: 'soop', ch: 'hun82825', name: '기깔.', riot: ['뉴 욕 컷#KR1', '기 깔#기 깔', '비원딜유저#No AD', '윤1아#KR1'] },
        { p: 'soop', ch: 'jm5910', name: '우즈마키윤호', riot: ['윤 호#vv101'] },
        { p: 'soop', ch: 'lovesy9173', name: '문또농', riot: ['알 또 농 칩#KR1', '아 잭스 하고싶다#오빠랑'] },
        { p: 'soop', ch: 'wjdgns5781', name: '공진혁', riot: ['공진혁#KR3', '공진혁#KR2'] },
        { p: 'chzzk', ch: '2b0d198a876924c25512ca2ed1332159', name: '미어킴', riot: ['supRekkles#KR96'] },
        { p: 'soop', ch: 'tmdrudwkdwkd', name: '릉빵이', riot: ['yonejoa#0306', 'yonejoa#KR1'] },
        { p: 'soop', ch: 'tjd3811', name: '심펑슨', riot: ['Rank#심펑슨', '랭 끄#KR1', '지눙시#군 인', 'Clawsome#KR1'] },
        { p: 'soop', ch: 'namyouhyuk', name: '자르반킹', riot: ['JARVANK1NG#KR1', 'Ashe Queen#1014'] },
        { p: 'chzzk', ch: '7737f0c9379712044e430998d3a7b98f', name: '만만수o', riot: ['만만수#318', '치지직 만만수#미드1', '만만수#원딜318'] },
        { p: 'soop', ch: 'k1baaa', name: '채니☆', riot: ['말하는감자#1031'] },
        { p: 'chzzk', ch: 'b989851b025dbd1a8dce1a31880f301a', name: '미숙이', riot: ['유리멘탈미숙#1122'] },
        { p: 'chzzk', ch: 'bf28c2348f70eca80a882a2d9a72ca7d', name: '서깨비', riot: ['나는이런거그냥들어가버려#박치기공룡'] },
        { p: 'chzzk', ch: '0f708226b5444fbbed6ff002cd27bc72', name: '디블로', riot: ['치지직디블로#KR2', 'Soop 디블로#KR2'] },
        { p: 'soop', ch: 'key3050', name: '미넝', riot: ['엄 벌#111'] },
        { p: 'youtube', ch: 'UC4c3hJYsvwuEZClbATsh6GA', name: '빵준93', riot: ['남탓하면 뺘마리#KR0'] },
        { p: 'soop', ch: 'raxxit', name: '김채유', riot: ['몽글몽글토끼#KR1'] },
        { p: 'soop', ch: 'sangmin03200', name: '프민.', riot: ['프 민#PZZ'] },
        { p: 'soop', ch: 'inyoung1209', name: '백인영', riot: ['백인영#KR1'] },
        { p: 'chzzk', ch: 'b41c6b5f726837936545c48c93a9743a', name: 'ZephyrusK', riot: ['ZPSK#ZPK', 'Fade to Black#ZPK', 'Thnks Fr Th Mmrs#ZPK', '쥐들의 신 찍신#ZPK'] },
        { p: 'chzzk', ch: 'fe2d48bd5b07570f2a6599da7a0ff941', name: '최링', riot: ['최 링#치지직'] },
        { p: 'chzzk', ch: '8f10a36cb78c3accc3f70c20dcbf289e', name: '꿀잼사과잼', riot: ['Reve Bonheur Toi#happy', '꿀잼사과잼#KR1'] },
        { p: 'soop', ch: 'qpqp7080', name: '하트랑', riot: ['한번튀긴어피치#응모태모태'] },
        { p: 'soop', ch: 'themove773', name: '서포터라콩', riot: ['개쩌는서포터#KR1', '명품도구#PRO', '라 콩#라 콩', '두바이쫀득라콩#오픈런'] },
        { p: 'soop', ch: 'ktss990531', name: '쥐쥐.', riot: ['Ml3KlNG#KR1', 'SOOP 쥐쥐#1645', 'GG YA#9905'] },
        { p: 'soop', ch: 'gpdnjsdld', name: '혜원[♥]', riot: ['하트쏜#soop', '쏜로몬#soop'] },
        { p: 'soop', ch: 'dkdld700', name: '2서연', riot: ['이득봉#바보아니다'] },
        { p: 'chzzk', ch: '605a709309e4a586d9fc165c9b7be0e9', name: '귀욤가은', riot: ['서폿만하고싶어용#KR1'] },
        { p: 'soop', ch: 'j1ma1232', name: '김지마', riot: ['우주최강절대Zi존김지마#0111'] },
        { p: 'soop', ch: 'xorghks5194', name: '태칸v', riot: ['태칸v#SOOP', '태칸v#치지직', '태칸v#방송인'] },
        { p: 'chzzk', ch: '11f6450cda76b96152ef79a0e09705cb', name: '영배씨', riot: ['잔혹한 무력의 왕#노자비'] },
        { p: 'soop', ch: 'churube', name: '전하늘.', riot: ['전하늘#1997', '92세전순덕의마지막강타싸움#지옥참강타'] },
        { p: 'soop', ch: 'jinhi1004', name: '브희♡', riot: ['전 설#2024', '왕자님#이에요', 'Queen#여 왕'] },
        { p: 'soop', ch: 'ksk0821', name: '찐쭈광', riot: ['찐 쭈 광#soop'] },
        { p: 'soop', ch: '1675rt', name: '도꼬미', riot: ['JSM맘마조#응 애', 'RB발받침대#333', '이새끼봐봐하는게말이안된다니까#15gg', '막나가다수틀리면의자던지는훈이#엉덩이'] },
        { p: 'soop', ch: 'shj06170', name: '얌쭈', riot: ['떡볶이 살인마#KR1', '동동이내새꾸#KR1'] },
        { p: 'soop', ch: 'hanol6732', name: '김우쨔', riot: ['취미는 사랑#KISS', '갓종윤의롤똥개#멍 멍', '우 쨔#팀운고트', '누나가털보랬지#밀어줘'] },
        { p: 'chzzk', ch: 'd97c67412bc6cf08fa73ac63ea573b76', name: '서은율', riot: ['서은율#chzzk'] },
        { p: 'youtube', ch: 'UCxamwSCOnFGsQaiBvZIGlbg', name: '제영우', riot: ['제영우#Zoebf', '제영우#KR3'] },
        { p: 'soop', ch: 'apeony', name: '목단화', riot: ['목단화#peony', 'Mok blanc#peony', 'Atomic#peony', 'NoReturn#peony', 'Unknown#peony'] },
        { p: 'soop', ch: 'king0326', name: '키네몬_', riot: ['SOOP 키네몬#추천과즐찾', 'エゴイスト#No 1'] },
        { p: 'soop', ch: 'chlwjddms77', name: '벚꽃으니♥', riot: ['카카오어피치#벚꽃으니'] },
        { p: 'soop', ch: 'thswlstjr666', name: '손진석.', riot: ['유명해진석#곧 임', '진라면#석나간맛', '화 풀어#내가미안해'] },
        { p: 'chzzk', ch: 'b4175cf529f87a19af0531f5a403b681', name: '레서판다는귀여워', riot: ['레서판다는귀여워#너구리', '정말 깔끔한 사람#KR1'] },
        { p: 'chzzk', ch: '3a16b60f4e3043a9b71bc04a31c3b3b2', name: '하제희', riot: ['하제희#HJH'] },
        { p: 'chzzk', ch: '7c8f5658c410f56d10c68410f87a76f7', name: '이주윤', riot: ['바텀론은틀렸다#0607'] },
        { p: 'soop', ch: 'hask12', name: '김건형.', riot: ['leaper#0823', '늙기싫다#2007', '부캐임#어쩌라고', '의 문#장 인'] },
        { p: 'soop', ch: 'kimihy2017', name: '꼬북꼬', riot: ['꼬북꼬#soop'] },
        { p: 'soop', ch: 'okmn63', name: '우성초이', riot: ['Samsara#윤 회'] },
        { p: 'soop', ch: 'qkswjdals123', name: '반정민', riot: ['나 연#KR7'] },
        { p: 'soop', ch: 'dltjdwo125', name: '키재루', riot: ['키재루#acl', 'kizeru one#zeru1', '키재루#유튜브', 'NS 태윤#BFX'] },
        { p: 'chzzk', ch: 'f0c52b9d999718e2438efc2c9759e371', name: '씨뇽수', riot: ['IISYS#KR1'] },
        { p: 'soop', ch: 'brian421', name: '빈그레_', riot: ['머리가 텅 빈그레#5OOP'] },
        { p: 'soop', ch: 'tjd10477', name: '빈쫑', riot: ['이세계아이돌fan#KR 1', 'Astra Top#KR1'] },
        { p: 'soop', ch: 'h3315978', name: '김크눈', riot: ['김크눈#유튜브'] },
        { p: 'soop', ch: 'iuius', name: '포핸드', riot: ['가 츤#포핸드', '댕 강#포핸드'] },
        { p: 'soop', ch: 'jehi99', name: '로로냥', riot: ['노는게젤쥬앙#KR1', '알빠노#찌질아'] },
        { p: 'soop', ch: 'shark4450', name: '뱃뉴BDNS', riot: ['비 뱃#BDNS', '뱃 뉴#KR1'] },
        { p: 'chzzk', ch: '4534927356ea49b387676d40ffff7071', name: '보랭2', riot: ['찹츄찹찹츄#KR10'] },
        { p: 'chzzk', ch: '9ff854284c395b399b80c2d0874e0371', name: 'Only 1Top', riot: ['세체탑이될사나이#KR1'] },
        { p: 'soop', ch: 'hck1129', name: '힐링동키', riot: ['우치하안다다씨#KR1', '저맨밑동키#KR1'] },
        { p: 'chzzk', ch: 'c67fd2277d813be68d5d01321c0512ef', name: '빈쥰', riot: ['빈스고이#been', 'Cardinal#been'] },
        { p: 'soop', ch: 'bronzeyi', name: '브마장', riot: ['브마장#KR1'] },
        { p: 'chzzk', ch: '64ae7501776d6706ef8cdac3fa0c0a2b', name: 'Gray99', riot: ['근거리탑#신병자'] },
        { p: 'youtube', ch: 'UCGTAGj2xLbxvCqincsbqEog', name: '찐튜브', riot: ['불의군대#KR1'] },
        // ★ 못 찾은 사람 (deeplol 미등록 · 위키에 태그 없음): 노페 · 김군 · 앰비션 · 도파 · 크캣 · 디나이05 · 챌린저카인 · 미키 · 스피릿 · 태평창 · 스오 · 희태시기(유튜브 채널 ID 미확인, 계정은 희태시기#КR1 — 태그의 К 가 키릴 문자다)
        // ★ 前 프로인 방송인은 여기(방송인)에 두고 `ex: 'T1'` 처럼 옛 소속을 적는다 → 「前 T1」 배지. 테디는 2026 BRO 주전이라 아래 pros 에 있다
        // ★ 닉네임을 바꿔도 따라간다 — 서버가 처음 찾은 puuid 를 DB 에 두고 그걸로 조회한다. 여기 적힌 ID 가 처음부터 404 일 때만 고치면 된다
    ],
    // ③ 프로게이머 — 2026 LCK 정규 로스터 10팀 50명 (2026-09-17 밤). 방송인 티어 페이지의 「프로게이머」 탭
    //   - 로스터: lolesports livestats 로 뽑은 최근 경기 주전 (docs/방송.md 그 절)
    //   - riot : deeplol `/pro/<이름>` 등록 계정을 라이엇 API 로 검증한 것 (랭크 있는 계정만). 서버가 제일 높은 계정을 고른다
    //   - 「계정 미확인」 11명은 riot 이 비어 있어 표에 티어 「-」 로 나온다. 알게 되면 채울 것
    //   - teamImg 는 lolesports getTeams 의 image (http 는 서버가 https 로 바꾼다)
    //   - squad : 1 = LCK 주전(생략 가능) · 2 = LCK CL 주전(livestats 최근 경기) · 3 = 3군·후보(getTeams 등록 명단에서 1·2군을 뺀 나머지) — 2026-09-17 밤 추가.
    //     ★ 3군은 lolesports 에 경기 데이터가 없어 「등록만 된 사람」을 그렇게 부른 것이다 — 진짜 3군인지 1군 후보인지는 못 가른다 (Pyosik 처럼)
    pros: [
        // ---- 1군 · LCK 주전 ----
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
        // ---- 2군 · LCK CL 주전 (livestats 최근 경기) ----
        { name: 'Haetae', team: 'T1', squad: 2, role: 'top', teamImg: 'http://static.lolesports.com/teams/1726801573959_539px-T1_2019_full_allmode.png', riot: ['해 태#T 1'] },
        { name: 'Painter', team: 'T1', squad: 2, role: 'jungle', teamImg: 'http://static.lolesports.com/teams/1726801573959_539px-T1_2019_full_allmode.png', riot: ['T1 Painter#KR3', 'asdasd1#KR33'] },
        { name: 'Guti', team: 'T1', squad: 2, role: 'mid', teamImg: 'http://static.lolesports.com/teams/1726801573959_539px-T1_2019_full_allmode.png', riot: [] },   // 계정 미확인
        { name: 'Eclipse', team: 'T1', squad: 2, role: 'bottom', teamImg: 'http://static.lolesports.com/teams/1726801573959_539px-T1_2019_full_allmode.png', riot: [] },   // 계정 미확인
        { name: 'Cloud', team: 'T1', squad: 2, role: 'support', teamImg: 'http://static.lolesports.com/teams/1726801573959_539px-T1_2019_full_allmode.png', riot: [] },   // 계정 미확인
        { name: 'Sero', team: 'KT', squad: 2, role: 'top', teamImg: 'http://static.lolesports.com/teams/kt_darkbackground.png', riot: ['자신감을잃지말자#KR1'] },
        { name: 'Sylvie', team: 'KT', squad: 2, role: 'jungle', teamImg: 'http://static.lolesports.com/teams/kt_darkbackground.png', riot: ['Sylvie#77777'] },
        { name: 'Hwichan', team: 'KT', squad: 2, role: 'mid', teamImg: 'http://static.lolesports.com/teams/kt_darkbackground.png', riot: ['Wonderwall#mid'] },
        { name: 'FenRir', team: 'KT', squad: 2, role: 'bottom', teamImg: 'http://static.lolesports.com/teams/kt_darkbackground.png', riot: [] },   // 계정 미확인
        { name: 'Pollu', team: 'KT', squad: 2, role: 'support', teamImg: 'http://static.lolesports.com/teams/kt_darkbackground.png', riot: ['YdBB#0107', 'Suiheisen#0107'] },
        { name: 'Jaehyuk', team: 'DK', squad: 2, role: 'top', teamImg: 'http://static.lolesports.com/teams/1673260049703_DPlusKIALOGO11.png', riot: ['차가운코끼리#KR0'] },
        { name: 'Solid', team: 'DK', squad: 2, role: 'jungle', teamImg: 'http://static.lolesports.com/teams/1673260049703_DPlusKIALOGO11.png', riot: [] },   // 계정 미확인
        { name: 'Garden', team: 'DK', squad: 2, role: 'mid', teamImg: 'http://static.lolesports.com/teams/1673260049703_DPlusKIALOGO11.png', riot: ['정 뭉#정 뭉'] },
        { name: 'Wayne', team: 'DK', squad: 2, role: 'bottom', teamImg: 'http://static.lolesports.com/teams/1673260049703_DPlusKIALOGO11.png', riot: [] },   // 계정 미확인
        { name: 'Loopy', team: 'DK', squad: 2, role: 'support', teamImg: 'http://static.lolesports.com/teams/1673260049703_DPlusKIALOGO11.png', riot: ['이나경#아 로', 'Loopy#1813'] },
        { name: 'Lancer', team: 'DNS', squad: 2, role: 'top', teamImg: 'http://static.lolesports.com/teams/1767340467921_DN_SOOPerslogo_profile.webp', riot: ['치기리 효마#4 4'] },
        { name: 'DDoiV', team: 'DNS', squad: 2, role: 'jungle', teamImg: 'http://static.lolesports.com/teams/1767340467921_DN_SOOPerslogo_profile.webp', riot: ['2027년의남자이찬혁#이희민', 'DNS 또이브#KR13'] },
        { name: 'Flip', team: 'DNS', squad: 2, role: 'mid', teamImg: 'http://static.lolesports.com/teams/1767340467921_DN_SOOPerslogo_profile.webp', riot: [] },   // 계정 미확인
        { name: 'Enosh', team: 'DNS', squad: 2, role: 'bottom', teamImg: 'http://static.lolesports.com/teams/1767340467921_DN_SOOPerslogo_profile.webp', riot: ['Enosh#144', 'qweasdweasdqw#kx1'] },
        { name: 'Quantum', team: 'DNS', squad: 2, role: 'support', teamImg: 'http://static.lolesports.com/teams/1767340467921_DN_SOOPerslogo_profile.webp', riot: [] },   // 계정 미확인
        { name: 'Janus', team: 'NS', squad: 2, role: 'top', teamImg: 'http://static.lolesports.com/teams/NSFullonDark.png', riot: [] },   // 계정 미확인
        { name: 'MihawK', team: 'NS', squad: 2, role: 'jungle', teamImg: 'http://static.lolesports.com/teams/NSFullonDark.png', riot: ['MihawK#1115'] },
        { name: 'SeTab', team: 'NS', squad: 2, role: 'mid', teamImg: 'http://static.lolesports.com/teams/NSFullonDark.png', riot: ['SeTab#123'] },
        { name: 'Lucy', team: 'NS', squad: 2, role: 'bottom', teamImg: 'http://static.lolesports.com/teams/NSFullonDark.png', riot: [] },   // 계정 미확인
        { name: 'Pleata', team: 'NS', squad: 2, role: 'support', teamImg: 'http://static.lolesports.com/teams/NSFullonDark.png', riot: ['pleata#KR22'] },
        { name: 'Winner', team: 'KRX', squad: 2, role: 'jungle', teamImg: 'http://static.lolesports.com/teams/1774247803537_horizontal_EN_Wh.png', riot: [] },   // 계정 미확인
        { name: 'AKaJe', team: 'KRX', squad: 2, role: 'mid', teamImg: 'http://static.lolesports.com/teams/1774247803537_horizontal_EN_Wh.png', riot: ['쩐 바오민#똥필근', '오케이션#강민오우'] },
        { name: 'Vincenzo', team: 'KRX', squad: 2, role: 'bottom', teamImg: 'http://static.lolesports.com/teams/1774247803537_horizontal_EN_Wh.png', riot: [] },   // 계정 미확인
        { name: 'Minous', team: 'KRX', squad: 2, role: 'support', teamImg: 'http://static.lolesports.com/teams/1774247803537_horizontal_EN_Wh.png', riot: ['빠빠라기#KR3', '버블뮤#SAR'] },
        { name: 'Kangin', team: 'BFX', squad: 2, role: 'top', teamImg: 'http://static.lolesports.com/teams/1734691810721_BFXfullcolorfordarkbg.png', riot: ['김봉규#BK1', '슛돌이#KR12'] },
        { name: 'Grizzly', team: 'BFX', squad: 2, role: 'jungle', teamImg: 'http://static.lolesports.com/teams/1734691810721_BFXfullcolorfordarkbg.png', riot: ['Grizzly#KR3'] },
        { name: 'MG', team: 'BFX', squad: 2, role: 'mid', teamImg: 'http://static.lolesports.com/teams/1734691810721_BFXfullcolorfordarkbg.png', riot: [] },   // 계정 미확인
        { name: 'Slayer', team: 'BFX', squad: 2, role: 'bottom', teamImg: 'http://static.lolesports.com/teams/1734691810721_BFXfullcolorfordarkbg.png', riot: [] },   // 계정 미확인
        { name: 'Luon', team: 'BFX', squad: 2, role: 'support', teamImg: 'http://static.lolesports.com/teams/1734691810721_BFXfullcolorfordarkbg.png', riot: ['Luon#11111'] },
        { name: 'Ripple', team: 'GEN', squad: 2, role: 'top', teamImg: 'http://static.lolesports.com/teams/1773829250929_GENGLOGO_GOLD.png', riot: ['REDRED#한 모금'] },
        { name: 'Courage', team: 'GEN', squad: 2, role: 'jungle', teamImg: 'http://static.lolesports.com/teams/1773829250929_GENGLOGO_GOLD.png', riot: [] },   // 계정 미확인
        { name: 'Kemish', team: 'GEN', squad: 2, role: 'mid', teamImg: 'http://static.lolesports.com/teams/1773829250929_GENGLOGO_GOLD.png', riot: ['얼러리뚱땅#KR33'] },
        { name: 'MUDAI', team: 'GEN', squad: 2, role: 'bottom', teamImg: 'http://static.lolesports.com/teams/1773829250929_GENGLOGO_GOLD.png', riot: ['MUDAI#KR2'] },
        { name: 'Lumos', team: 'GEN', squad: 2, role: 'support', teamImg: 'http://static.lolesports.com/teams/1773829250929_GENGLOGO_GOLD.png', riot: ['용맹의 방패#KR0'] },
        { name: 'DDahyuk', team: 'BRO', squad: 2, role: 'top', teamImg: 'http://static.lolesports.com/teams/1716454325887_Nowyprojekt.png', riot: ['너덜너덜#NDND', '이직로그#0904', '하와와#0904'] },
        { name: 'Dinai', team: 'BRO', squad: 2, role: 'jungle', teamImg: 'http://static.lolesports.com/teams/1716454325887_Nowyprojekt.png', riot: ['치무식#목을뽑다', '경상도 왕#1111'] },
        { name: 'Tempester', team: 'BRO', squad: 2, role: 'mid', teamImg: 'http://static.lolesports.com/teams/1716454325887_Nowyprojekt.png', riot: ['몬난이#1452', 'Tempester#KR3', '2군 9등딱 미드#LCKCL'] },
        { name: 'OddEye', team: 'BRO', squad: 2, role: 'bottom', teamImg: 'http://static.lolesports.com/teams/1716454325887_Nowyprojekt.png', riot: ['WE GO#이나경'] },
        { name: 'PlanB', team: 'BRO', squad: 2, role: 'support', teamImg: 'http://static.lolesports.com/teams/1716454325887_Nowyprojekt.png', riot: ['CRJ200#봄바디어', '멍 복#77777'] },
        { name: 'Panther', team: 'HLE', squad: 2, role: 'top', teamImg: 'http://static.lolesports.com/teams/1631819564399_hle-2021-worlds.png', riot: [] },   // 계정 미확인
        { name: 'Jackal', team: 'HLE', squad: 2, role: 'jungle', teamImg: 'http://static.lolesports.com/teams/1631819564399_hle-2021-worlds.png', riot: [] },   // 계정 미확인
        { name: 'Cracker', team: 'HLE', squad: 2, role: 'mid', teamImg: 'http://static.lolesports.com/teams/1631819564399_hle-2021-worlds.png', riot: [] },   // 계정 미확인
        { name: 'Pyeonsik', team: 'HLE', squad: 2, role: 'bottom', teamImg: 'http://static.lolesports.com/teams/1631819564399_hle-2021-worlds.png', riot: ['편민기#편민기'] },
        { name: 'Valiant', team: 'HLE', squad: 2, role: 'support', teamImg: 'http://static.lolesports.com/teams/1631819564399_hle-2021-worlds.png', riot: [] },   // 계정 미확인
        // ---- 3군 · 후보 (등록 명단에서 1·2군을 뺀 나머지) ----
        { name: 'SIRIUSS', team: 'GEN', squad: 3, role: 'support', teamImg: 'http://static.lolesports.com/teams/1773829250929_GENGLOGO_GOLD.png', riot: ['SIRIUSS#KR 1'] },
        { name: 'Bluffing', team: 'HLE', squad: 3, role: 'support', teamImg: 'http://static.lolesports.com/teams/1631819564399_hle-2021-worlds.png', riot: ['Bluffing#1207'] },
        { name: 'Guardian', team: 'T1', squad: 3, role: 'top', teamImg: 'http://static.lolesports.com/teams/1726801573959_539px-T1_2019_full_allmode.png', riot: [] },   // 계정 미확인
        { name: 'Carim', team: 'T1', squad: 3, role: 'jungle', teamImg: 'http://static.lolesports.com/teams/1726801573959_539px-T1_2019_full_allmode.png', riot: ['T1 Carim#0409', 'Carim#0409'] },
        { name: 'Cypher', team: 'T1', squad: 3, role: 'bottom', teamImg: 'http://static.lolesports.com/teams/1726801573959_539px-T1_2019_full_allmode.png', riot: ['ozzs#ozzs'] },
        { name: 'Jinbeom', team: 'T1', squad: 3, role: 'bottom', teamImg: 'http://static.lolesports.com/teams/1726801573959_539px-T1_2019_full_allmode.png', riot: ['T1 Jinbeom#KR3', 'Emotionless#KR07'] },
        { name: 'Nevid', team: 'DK', squad: 3, role: 'top', teamImg: 'http://static.lolesports.com/teams/1673260049703_DPlusKIALOGO11.png', riot: ['DK Nevid#동두천왕'] },
        { name: 'Ghost', team: 'KT', squad: 3, role: 'support', teamImg: 'http://static.lolesports.com/teams/kt_darkbackground.png', riot: [] },   // 계정 미확인
        { name: 'Pungyeon', team: 'BRO', squad: 3, role: 'mid', teamImg: 'http://static.lolesports.com/teams/1716454325887_Nowyprojekt.png', riot: ['Pungyeon#0116'] },
        { name: 'Calix', team: 'NS', squad: 3, role: 'mid', teamImg: 'http://static.lolesports.com/teams/NSFullonDark.png', riot: [] },   // 계정 미확인
        { name: 'Daystar', team: 'BFX', squad: 3, role: 'mid', teamImg: 'http://static.lolesports.com/teams/1734691810721_BFXfullcolorfordarkbg.png', riot: ['songman#누가진짤까', 'Daystar#0923'] },
        { name: 'Zephyr', team: 'BFX', squad: 3, role: 'jungle', teamImg: 'http://static.lolesports.com/teams/1734691810721_BFXfullcolorfordarkbg.png', riot: [] },   // 계정 미확인
        { name: 'Rich', team: 'KRX', squad: 3, role: 'top', teamImg: 'http://static.lolesports.com/teams/1774247803537_horizontal_EN_Wh.png', riot: [] },   // 계정 미확인
        { name: 'LazyFeel', team: 'KRX', squad: 3, role: 'bottom', teamImg: 'http://static.lolesports.com/teams/1774247803537_horizontal_EN_Wh.png', riot: ['LazyFeel#KR7', '삘삘이#피루07'] },
        { name: 'Life', team: 'DNS', squad: 3, role: 'support', teamImg: 'http://static.lolesports.com/teams/1767340467921_DN_SOOPerslogo_profile.webp', riot: ['홍부장#표지섭'] },
        { name: 'Pyosik', team: 'DNS', squad: 3, role: 'jungle', teamImg: 'http://static.lolesports.com/teams/1767340467921_DN_SOOPerslogo_profile.webp', riot: ['DNS Pyosik#KR2'] },
    ]
};
