// 이 파일은 build_champion_data.js 가 생성했습니다.
// 생성 시각: 2026-08-12T23:31:56.952Z
// 문장은 CommunityDragon 에서 가져왔고, {p1} {p2} 자리는 직접 채워야 합니다.

const customTemplates = {
    "Garen": { // 가렌
        "P": "가렌이 {p1}초 동안 피해를 입지 않거나 적의 스킬에 맞지 않으면 5초마다 <healing>최대 체력의 {p2}</healing>만큼 회복합니다.", // 인내심 — stringtable
        "Q": "가렌에게 적용된 모든 <status>둔화</status> 효과가 제거되고 {p1}초 동안 <speed>이동 속도가 {p2}%</speed> 상승합니다.<br><br>다음 기본 공격은 {p3}초 동안 <status>침묵</status>시키고 <physicaldamage>{p4}의 물리 피해</physicaldamage>를 입힙니다.", // 결정타
        "Q_rules": "<rules>강화된 기본 공격은 {p5}초 후 끝납니다.<br>이 스킬은 피해를 입힐 때 효과가 발동합니다.</rules>", // 구분선 아래 회색 글씨
        "W": "<passive>기본 지속 효과:</passive> 가렌이 <scalearmor>{p1}의 추가 방어력</scalearmor>과 <scalemr>{p1}의 추가 마법 저항력</scalemr>을 얻습니다. 유닛을 처치하면 영구적으로 <attention>{p2}의 방어력 및 마법 저항력</attention>이 부여되어 최대 <attention>{p3}</attention>까지 증가합니다.<br><br><active>사용 시:</active> 가렌이 {p4}초 동안 용기백배하여 받는 피해가 {p5}% 감소합니다. 또한 {p6}초 동안 <shield>{p7}의 피해를 흡수하는 보호막</shield>과 <slow>{p8}%의 강인함</slow>을 얻습니다.", // 용기
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "E": [
            "가렌이 {p1}초 동안 검을 들고 빠르게 회전하여 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 {p3}회 입힙니다. <attackspeed>추가 공격 속도</attackspeed> 25%당 공격 횟수가 1회 증가합니다. 가장 가까운 적을 대상으로는 <physicaldamage>피해량이 {p4}% 증가</physicaldamage>합니다. 공격에 {p5}번 맞은 챔피언은 {p6}초 동안 <scalearmor>방어력이 {p7}%</scalearmor> 감소합니다.",
            "<recast>재사용 시</recast>: 이 스킬을 일찍 종료합니다."
        ], // 심판
        "E_rules": "<rules>아이템 및 레벨로 얻은 <attackspeed>공격 속도 {p8}%</attackspeed>당 공격 횟수가 1회 증가합니다.<br>치명타가 적용될 수 있고 치명타 적용 시 <physicaldamage>{p9}의 물리 피해</physicaldamage>를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "R": "가렌이 적을 처단할 데마시아의 힘을 소환하여 <truedamage>{p1}+잃은 체력의 {p2}%에 해당하는 고정 피해</truedamage>를 입힙니다.", // 데마시아의 정의
    },
    "Galio": { // 갈리오
        "P": "갈리오가 기본 공격 시 공격 속도가 증가하고 주변 적들에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. <br><br>갈리오의 스킬이 적 챔피언 또는 에픽 몬스터에게 적중하면 이 효과의 재사용 대기시간이 {p2}초 감소합니다. 재사용 대기시간은 스킬 사용 한 번당 한 번만 감소합니다.", // 석상의 강타 — stringtable
        "Q": "갈리오가 두 개의 돌풍을 발사해 각각 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. 두 돌풍이 합쳐지면 소용돌이가 일어나 {p2}초 동안 <magicdamage>최대 체력의 {p3}%에 해당하는 마법 피해</magicdamage>를 입힙니다.", // 전장의 돌풍
        "Q_rules": "<rules>정글 몬스터가 대상일 때 최대 <magicdamage>{p4}의 피해</magicdamage>를 체력 비례 피해로 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "W": "<passive>기본 지속 효과:</passive> 갈리오가 {p1}초 동안 피해를 입지 않으면 <shield>{p2}의 마법 피해를 흡수하는 보호막</shield>을 얻습니다.<br><br><charge>충전 시작 시:</charge> 갈리오가 받는 마법 피해가 {p3}, 받는 물리 피해가 {p4} 감소하며 {p5}% <status>둔화</status>됩니다.<br><br><release>발사 시:</release> {p6}~{p7}초 동안 적 챔피언들을 <status>도발</status>하고 <magicdamage>{p8}</magicdamage>~<magicdamage>{p9}의 마법 피해</magicdamage>를 입히며, 피해량 감소 효과가 {p10}초 추가됩니다. 도발 사거리 및 지속시간과 피해량은 충전 시간에 비례합니다.", // 듀란드의 방패
        "E": "갈리오가 전방으로 돌진해 처음 적중한 적 챔피언을 {p1}초 동안 <status>공중으로 띄워 올리고</status> <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다. 돌진 경로에 있는 다른 적은 모두 <magicdamage>{p3}의 마법 피해</magicdamage>를 입습니다.<br><br>갈리오의 돌진은 지형에 부딪히면 멈춥니다.", // 정의의 주먹
        "R": "갈리오가 아군 챔피언의 위치를 착지 지점으로 정해, 해당 지점 주변의 모든 아군 챔피언에게 {p1}초 동안 <spellname>듀란드의 방패</spellname> 기본 지속 효과 <shield>보호막</shield>을 씌웁니다. 이후 착지 지점으로 날아갑니다.<br><br>착지 시 {p2}초 동안 <status>공중으로 띄워 올리고</status> <magicdamage>{p3}의 마법 피해</magicdamage>를 입힙니다.", // 영웅출현
    },
    "Gangplank": { // 갱플랭크
        "P": "갱플랭크의 근접 공격이 대상을 불태워 {p1}초간 <truedamage>{p2}의 고정 피해</truedamage>를 추가로 입히고 {p3}초간 갱플랭크의 <speed>이동 속도가 {p4}</speed> 상승합니다.<br><br><keywordmajor>화약통</keywordmajor>을 파괴하면 이 스킬의 재사용 대기시간이 초기화되며 갱플랭크의 <speed>이동 속도</speed>가 동일하게 상승합니다.", // 불의 심판 — stringtable
        "Q": "갱플랭크가 총알을 발사해 <physicaldamage>10 / 40 / 70 / 100 / 130 (+ 총 공격력의 100%)의 물리 피해</physicaldamage>를 입힙니다. 이 공격으로 대상을 처치할 경우 <gold>3 / 4 / 5 / 6 / 7골드</gold>와 바다뱀 은화 <b>4 / 5 / 6 / 7 / 8</b>개를 추가로 얻습니다.<br><br>상점에서 바다뱀 은화를 써서 <spellname>포탄 세례</spellname> 스킬을 업그레이드할 수 있습니다.", // 혀어어어업상 — 2026-08-09 직접 작성. 원래 "{{Spell_GangplankQWrapper_Tooltip_{p1}}}" 가 화면에 그대로 찍히고 있었다. ★ 수치 하드코딩(bin 실측: SpellDamage 1번부터 10/40/70/100/130, ADRatio 1.0, GoldProc, SSProc). 패치되면 손으로 갱신할 것
        "Q_rules": "<rules>이 공격은 적중 시 효과(<spellname>불의 심판</spellname> 제외)가 적용되며 치명타가 적용될 수 있고 치명타 적용 시 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "W": "갱플랭크가 귤을 많이 먹어서 모든 <status>방해</status> 효과를 제거하고 체력을 <healing>{p1}+잃은 체력의 {p2}%</healing>만큼 회복합니다.", // 괴혈병 치료
        "E": "{p1}초 동안 갱플랭크와 적 챔피언이 공격할 수 있는 화약통을 설치합니다. 적이 파괴하는 통은 사라집니다. 갱플랭크가 파괴하는 통은 폭발하여 {p2}초 동안 적을 {p3}% <status>둔화</status>시키고 방어력의 {p4}%를 무시하며 <physicaldamage>기본 공격의 피해량</physicaldamage>만큼 피해를 입힙니다. 챔피언은 <physicaldamage>{p5}의 물리 피해</physicaldamage>를 추가로 입습니다.<br><br>통의 체력은 {p6}초마다 줄어듭니다. 통이 폭발하면 폭발 지대에 겹쳐 있는 통들이 연쇄 폭발하지만 같은 대상이 여러 번 피해를 입지는 않습니다. <spellname>혀어어어업상</spellname> 스킬로 통을 터뜨리면 대상 처치 시 추가 골드를 얻습니다.", // 화약통
        "E_rules": "<rules>7레벨, 13레벨에는 통이 저절로 사라지는 속도가 빨라집니다.</rules>", // 구분선 아래 회색 글씨
        "R": "갱플랭크가 배에 신호를 보내 맵 어느 위치로든 {p1}초 동안 {p2}차례 포탄을 발사하도록 합니다. 대포 세례마다 {p3}초 동안 {p4}%의 <status>둔화</status>를 적용하며 <magicdamage>{p5}의 마법 피해</magicdamage>를 입힙니다. 최대 피해량: {p6}<br><br>이 스킬은 <spellname>혀어어어업상</spellname> 스킬을 통해 상점에서 업그레이드할 수 있습니다.<br><br><spellname>가차없는 포격</spellname>: 6차례 추가로 포탄을 발사합니다.<br><spellname>죽음의 여신</spellname>: 대형 포탄을 발사해 <truedamage>{p7}의 고정 피해</truedamage>를 입히고 {p8}초 동안 {p9}% <status>둔화</status>를 적용합니다.<br><spellname>사기진작</spellname>: 포탄 세례 범위 안에 있는 아군의 이동 속도가 {p10}초 동안 <speed>{p11}%</speed> 증가합니다.", // 포탄 세례
    },
    "Gragas": { // 그라가스
        "P": "그라가스가 스킬을 사용하면 술을 마셔 <healing>{p1}의 체력을</healing> 회복합니다.", // 서비스 시간 — stringtable
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "Q": [
            "그라가스가 술통을 굴립니다. 술통은 {p1}초 후 폭발해 <magicdamage>{p2}</magicdamage>~<magicdamage>{p3}의 마법 피해</magicdamage>를 입히고 {p4}초 동안 {p5}~{p6}% <status>둔화</status>시킵니다. 피해량과 <status>둔화</status> 효과는 폭발 전 술통이 유지됐던 시간에 비례해 증가합니다.",
            "<recast>재사용</recast>하여 술통을 더 빨리 폭발시킬 수 있습니다."
        ], // 술통 굴리기
        "Q_rules": "<rules>미니언에게는 {p7}%의 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "W": "그라가스가 술을 맛보고 {p1}초 동안 받는 피해량이 {p2} 감소합니다. 또한 다음 기본 공격이 강화되어 대상과 주변 적에게 <magicdamage>{p3}</magicdamage>+<magicdamage>최대 체력의 {p4}%에 해당하는 마법 피해</magicdamage>를 추가로 입힙니다.", // 취중 분노
        "W_rules": "<rules>정글 몬스터가 대상일 때 최대 체력 비례 피해는 최대 {p5}입니다.</rules><br><rules>구조물에 {p6}%의 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "E": "그라가스가 앞으로 돌진하여 첫 번째 적에게 부딪히면 {p1}초 동안 주변 적을 <status>공중으로 띄워 올리고</status> <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다.<br><br>그라가스가 적과 충돌하면 이 스킬의 재사용 대기시간이 {p3}% 단축됩니다.", // 몸통 박치기
        "R": "그라가스가 술통을 던져 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 적들을 폭발 지점으로부터 <status>밀어</status>냅니다.", // 술통 폭발
        "R_rules": "<rules>이 스킬로는 적을 벽 너머로 <status>밀어</status>낼 수 없습니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Graves": { // 그레이브즈
        "P": "그레이브즈의 기본 공격에는 몇 가지 특징이 있습니다.<br><li><keywordmajor>탄환</keywordmajor> 두 발을 발사하면 재장전해야 합니다. <attackspeed>공격 속도</attackspeed>가 재장전 시간은 약간 줄이지만, 공격 후 다음 공격까지 걸리는 시간은 대폭 감소시킵니다.<li>공격 시 4개의 탄환을 발사합니다. 대상에 적중한 첫 번째 탄환은 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 이후의 탄환은 각각 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입힙니다. 치명타 공격 시 일반 치명타 효과 대신 6발의 탄환을 발사하고 {p3}의 추가 피해를 입힙니다. 구조물의 경우 피해량이 {p4}% 감소합니다.<li>탄환은 적중한 첫 번째 유닛을 관통할 수 없습니다. 챔피언이 아닌 유닛이 탄환을 여러 개 맞으면 <status>뒤로 밀려납니다</status>.", // 새로운 운명 — stringtable
        "Q": "그레이브즈가 화약을 흩뿌리는 탄환을 발사하여 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다. 탄환은 1초 뒤 또는 지형에 충돌 시 폭발하여 탄환의 경로나 근처에 있는 적들에게 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입힙니다.", // 화약 역류
        "W": "그레이브즈가 4초간 지속되는 검은 연막을 만들어냅니다. 연막 안에 있는 적은 {p1}% <status>둔화</status>되며 시야가 차단됩니다. 연막탄은 처음 적중 시 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다.", // 연막탄
        "E": "그레이브즈가 돌진하여 산탄총에 <keywordmajor>탄환</keywordmajor> 하나를 장전합니다. 또한 {p1}초 동안 중첩을 1 획득합니다. (최대 {p2}중첩) 적 챔피언을 향해 돌진하면 중첩을 2 획득합니다. 1중첩당 <scalearmor>방어력이 {p3}</scalearmor>, <scalemr>마법 저항력이 {p4}</scalemr> 증가합니다. 미니언이 아닌 대상을 공격하면 중첩이 초기화됩니다.<br><br>그레이브즈의 기본 공격으로 적중한 탄환 하나당 이 스킬의 재사용 대기시간이 {p5}초 감소합니다.", // 빨리 뽑기
        "R": "그레이브즈가 폭발성 탄환을 발사하여 뒤로 밀려납니다. 탄환은 첫 번째로 맞은 적에게 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다. 탄환은 적 챔피언을 맞히거나 사거리 끝까지 날아간 다음 폭발하여 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입힙니다.", // 무고한 희생자
    },
    "Gwen": { // 그웬
        "P": "그웬의 기본 공격이 적중 시 <magicdamage>최대 체력의 {p1}에 해당하는 마법 피해</magicdamage>를 추가로 입힙니다. 그웬은 이 스킬로 챔피언에게 입힌 <healing>피해량의 {p2}</healing>만큼 체력을 회복합니다. (최대 <healing>{p3}</healing>)<br>", // 가위 난도질 — stringtable
        "Q": "<passive>기본 지속 효과</passive>: 그웬이 적에게 기본 공격을 적중시키면 가위질이 1회 중첩됩니다. (최대 4회, {p1}초 동안 지속)<br><br><active>사용 시</active>: 중첩된 가위질 횟수를 소모합니다. 그웬이 한 번 가위질하여 <magicdamage>{p2}의 마법 피해</magicdamage>를 입히고, 중첩된 가위질 횟수만큼 다시 가위질한 후 마지막 가위질로 <magicdamage>{p3}의 마법 피해</magicdamage>를 입힙니다. <br><br>가위질할 때마다 중앙에 있는 적에게는 입히는 피해의 {p4}%를 <truedamage>고정 피해</truedamage>로 전환하고 적중 시 <spellname>가위 난도질</spellname>을 적용합니다.<br><rules><br>미니언에게는 {p5}%의 피해를 입힙니다.<br>체력이 {p6}% 미만인 미니언은 감소한 피해 대신 {p7}%의 추가 피해를 입습니다.</rules>", // 싹둑싹둑!
        "Q_rules": "<rules>최대 피해량: {p8}+<spellname>가위 난도질</spellname>로 체력의 {p9}에 해당하는 피해량</rules>.", // 구분선 아래 회색 글씨
        "W": "그웬이 신성한 안개를 소환하여 안개 밖에 있는 모든 적(포탑 제외)으로부터 대상으로 지정될 수 없는 상태가 됩니다. 이 효과는 {p1}초 동안 또는 그웬이 안개를 떠날 때까지 지속됩니다. 안개 속에서는 그웬의 <scalearmor>방어력</scalearmor>과 <scalemr>마법 저항력</scalemr>이 {p2} 증가합니다.<br><br>이 스킬을 한 번 <recast>재사용</recast>하면 안개를 불러올 수 있습니다. 그웬이 처음으로 안개를 떠나려고 하면 스킬이 자동으로 <recast>재사용</recast>됩니다.", // 신성한 안개
        "E": "그웬이 돌진하며 {p1}초 동안 기본 공격을 강화합니다.<br><br>강화된 기본 공격은 <attackspeed>공격 속도가 {p2}</attackspeed>, <onhit>적중 시</onhit> <magicdamage>마법 피해가 {p3}</magicdamage>, 사거리가 {p4} 증가합니다. 적에게 처음 적중 시 이 스킬의 재사용 대기시간을 {p5}%만큼 돌려받습니다.", // 돌격가위
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "R": [
            "<active>첫 번째 사용:</active> 바늘을 던져 적중한 모든 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고, {p2}초 동안 {p3}% <status>둔화</status>시키며, <spellname>가위 난도질</spellname>을 적용합니다. 이 스킬은 6초 안에 최대 2회까지 추가로 <recast>재사용</recast>할 수 있습니다. (추가 재사용 대기시간 {p4}초)",
            "<recast>두 번째 사용:</recast> 바늘을 세 개 발사하여 <magicdamage>{p5}의 마법 피해</magicdamage>를 입힙니다.",
            "<recast>세 번째 사용:</recast> 바늘을 다섯 개 발사하여 <magicdamage>{p6}의 마법 피해</magicdamage>를 입힙니다."
        ], // 바느질
        "R_rules": "<rules>같은 유닛에게 바늘이 연달아 적중하면 {p7}% <status>둔화</status>시킵니다.<br>최대 피해량: {p8}+<spellname>가위 난도질</spellname>로 최대 체력의 {p9}에 해당하는 피해량</rules>", // 구분선 아래 회색 글씨
    },
    "Gnar": { // 나르
        "P": "나르가 피해를 입거나 입힐 때 <keywordmajor>분노</keywordmajor>를 생성합니다. <keywordmajor>분노</keywordmajor>가 최고치에 도달하면 다음번 스킬을 사용할 때 15초 동안 <keywordmajor>메가 나르</keywordmajor>로 변신합니다.<br><br><keywordmajor>미니 나르:</keywordmajor> <speed>이동 속도가 {p1}</speed>, <attackspeed>공격 속도가 {p2}</attackspeed>, 사거리가 {p3} 증가합니다.<br><br><keywordmajor>메가 나르:</keywordmajor> <healing>최대 체력이 {p4}</healing>, <scalearmor>방어력이 {p5}</scalearmor>, <scalemr>마법 저항력이 {p6}</scalemr>, <physicaldamage>공격력이 {p7}</physicaldamage> 증가합니다.", // 분노 유전자 — stringtable
        "Q": "<keywordmajor>미니 나르:</keywordmajor> 나르가 부메랑을 던져 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 {p2}초 동안 {p3}% <status>둔화</status>시킵니다. 부메랑은 적 하나를 맞힌 다음 돌아오며, 이후 맞히는 적들은 받는 피해량이 감소합니다. 적 하나당 부메랑에 한 번만 맞습니다. 부메랑을 받으면 재사용 대기시간이 {p4}% 감소합니다.", // 부메랑 던지기 / 돌덩이 던지기
        "Q_rules": "<rules>첫 번째 적에게 적중한 후에 적중당한 적은 {p5}%의 피해를 입습니다.</rules>", // 구분선 아래 회색 글씨
        "W": "<keywordmajor>미니 나르 기본 지속 효과:</keywordmajor> 같은 적에게 세 번째 기본 공격이나 스킬을 가할 때마다 <magicdamage>{p1}+최대 체력의 {p2}%에 해당하는 마법 피해</magicdamage>를 추가로 입히며 <speed>이동 속도가 {p3}%</speed> 증가한 뒤 {p4}초에 걸쳐 원래대로 돌아옵니다.", // 슝슝 / 쿵쾅
        "W_rules": "<rules>나르가 <keywordmajor>메가 나르</keywordmajor> 형태에서 돌아올 때는 <speed>이동 속도</speed> 역시 증가합니다.<br>정글 몬스터를 상대로는 최대 <magicdamage>{p5}의 마법 피해</magicdamage>를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "E": "<keywordmajor>미니 나르:</keywordmajor> 나르가 폴짝 뛰어 {p1}초 동안 <attackspeed>공격 속도가 {p2}%</attackspeed> 상승합니다. 유닛 위에 착지하면 튕겨서 더 멀리 날아갑니다. 적에게 착지하여 튕기면 <physicaldamage>{p3}의 물리 피해</physicaldamage>를 입히며 잠시 {p4}% <status>둔화</status>시킵니다.", // 폴짝 / 우지끈
        "R": "<keywordmajor>미니 나르 기본 지속 효과:</keywordmajor> <spellname>슝슝</spellname>의 <speed>이동 속도</speed>가 증가합니다.<br><br><keywordmajor>메가 나르:</keywordmajor> 근처 적을 던져 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 <status>뒤로 밀어내며</status> {p2}초 동안 {p3}% <status>둔화</status>시킵니다. 벽에 부딪히는 적은 <physicaldamage>{p4}의 물리 피해</physicaldamage>를 입고 <status>기절</status>합니다.", // 나르!
        "R_rules": "<rules><keywordmajor>미니 나르</keywordmajor>로 변신한 후에는 15초 동안 <keywordmajor>분노</keywordmajor>가 쌓이지 않습니다.</rules>", // 구분선 아래 회색 글씨
        "Q2": "<keywordmajor>메가 나르:</keywordmajor> 나르가 돌덩이를 던져 처음 적중한 적과 주변 적에게 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 {p2}초 동안 {p3}% <status>둔화</status>시킵니다. 돌덩이를 집어 들면 이 스킬의 재사용 대기시간이 {p4}% 감소합니다.", // 돌덩이 던지기 — 메가 나르
        "W2": "<keywordmajor>메가 나르:</keywordmajor> 나르가 일정 범위를 내리치며 해당 범위 내 유닛에게 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 {p2}초 동안 <status>기절</status>시킵니다.", // 쿵쾅 — 메가 나르
        "E2": "<keywordmajor>메가 나르:</keywordmajor> 나르가 폴짝 뛰어 착지하며 근처 적에게 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다. 착지 지점 바로 밑에 있는 적은 추가로 잠시 {p2}% <status>둔화</status>됩니다.", // 우지끈 — 메가 나르
    },
    "Nami": { // 나미
        "P": "나미의 스킬에 맞은 아군 챔피언은 <speed>이동 속도가 {p1}</speed> 상승했다 {p2}초에 걸쳐 원래대로 돌아옵니다.", // 밀려오는 파도 — stringtable
        "Q": "나미가 물방울을 던져 {p1}초 동안 <status>기절</status>시키고 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다.", // 물의 감옥
        "W": "나미가 밀려드는 파도를 보내 아군 및 적 챔피언을 번갈아 맞힙니다. 파도는 각 챔피언을 한 번만 맞힐 수 있으며 최대 {p1}명의 대상에게 튕깁니다.<li>아군의 <healing>체력을 {p2}</healing>만큼 회복시키고 근처 적 챔피언에게 튕깁니다. <li>적에게 <magicdamage>{p3}의 마법 피해</magicdamage>를 입히고 근처 아군 챔피언에게 튕깁니다.<br>피해량과 회복량은 한 번 튕길 때마다 {p4}씩 조정됩니다.", // 밀물 썰물
        "W_rules": "<rules>보이는 적에게만 튕길 수 있습니다.</rules>", // 구분선 아래 회색 글씨
        "E": "나미가 {p1}초 동안 아군 챔피언의 다음 기본 공격과 스킬 {p2}회를 강화합니다. 강화된 기본 공격과 스킬은 대상을 {p3}초 동안 {p4}만큼 <status>둔화</status>시키고 <magicdamage>{p5}의 마법 피해</magicdamage>를 추가로 입힙니다.", // 파도 소환사의 축복
        "E_rules": "<rules>광역 스킬 강화 시 챔피언이 아닌 유닛에게는 {p6}의 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "R": "나미가 해일을 소환하여 0.5초 동안 <status>공중으로 띄워 올리고</status> {p1}% <status>둔화</status>시키며 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다. <status>둔화</status> 지속시간은 해일이 이동한 거리에 비례하며 최대 {p3}초입니다.<br><br>파도에 맞은 아군은 <spellname>밀려오는 파도</spellname>의 효과를 두 배로 받습니다.", // 해일
        "R_rules": "<rules><status>둔화</status>의 최소 지속시간은 {p4}초입니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Nasus": { // 나서스
        "P": "나서스가 {p1}%의 추가 생명력 흡수 효과를 얻습니다.", // 영혼의 포식자 — stringtable
        "Q": "나서스의 다음 기본 공격이 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다. 이 스킬로 적을 처치하면 영구적으로 피해량이 {p2}만큼 증가하고 챔피언, 대형 미니언, 대형 정글 몬스터를 대상으로는 {p3}만큼 증가합니다.", // 흡수의 일격
        "Q_rules": "<rules>이 스킬은 피해를 입힐 때 효과가 발동합니다.<br>이 스킬에는 치명타가 적용될 수 있으며, 이 경우 <physicaldamage>{p4}의 물리 피해</physicaldamage>를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "W": "나서스가 챔피언의 노화를 촉진시켜 {p1}% <status>둔화</status>시킵니다. 둔화 효과는 {p2}초 동안 최대 {p3}%까지 증가합니다. 대상의 공격 속도는 <status>둔화</status> 효과의 {p4}%만큼 감소합니다.", // 쇠약
        "E": "나서스가 영혼의 불길로 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. 해당 지역 내 적은 <scalearmor>방어력이 {p2}%</scalearmor>만큼 감소하고 {p3}초 동안 <magicdamage>{p4}의 마법 피해</magicdamage>를 입습니다.", // 영혼의 불길
        "R": "나서스가 15초 동안 모래 폭풍 속에서 힘을 얻어 <healing>최대 체력이 {p1}</healing> 증가하고 <scalearmor>방어력</scalearmor>과 <scalemr>마법 저항력</scalemr>이 {p2} 상승합니다.<br><br>폭풍이 부는 동안 나서스는 매초 <magicdamage>주변 적이 보유한 최대 체력의 {p3}에 해당하는 마법 피해</magicdamage>를 입히며 <spellname>흡수의 일격</spellname> 재사용 대기시간이 {p4}% 감소합니다.", // 사막의 분노
        "R_rules": "<rules>모래 폭풍은 초당 최대 {p5}의 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Naafiri": { // 나피리
        "P": "나피리가 자신이 지정한 적을 공격해 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히는 <keywordmajor>무리</keywordmajor>를 {p2}초마다 한 마리씩 생성합니다. 나피리가 스킬을 사용한 후에는 피해량이 <physicaldamage>{p3}</physicaldamage>까지 증가합니다. <br><br>챔피언과 대형 몬스터에게 스킬이 적중하면 이 스킬의 재사용 대기시간이 {p4}초 감소합니다. 적을 처치하면 {p5}초 감소합니다.<br><br>최대 <keywordmajor>무리</keywordmajor> 수: {p6}", // 늘어나는 무리 — stringtable
        "Q": "나피리가 다르킨의 저주를 받은 칼날을 던져 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 출혈을 일으켜 {p2}초에 걸쳐 <physicaldamage>{p3}의 물리 피해</physicaldamage>를 입힙니다.<br><br>나피리는 이 스킬을 <recast>재사용</recast>할 수 있습니다. 적중한 적이 이미 이 스킬로 인한 출혈 상태라면 남은 출혈 피해+잃은 체력에 비례한 <physicaldamage>{p4}</physicaldamage>~<physicaldamage>{p5}의 물리 피해</physicaldamage>를 입힙니다. 해당 대상이 챔피언 또는 대형 몬스터면 나피리가 <healing>{p6}의 체력</healing>을 회복합니다.<br><br><keywordmajor>무리</keywordmajor>가 처음 적중한 챔피언 또는 몬스터에게 도약해 {p7}초 동안 공격합니다. <br><br>", // 다르킨 단검
        "Q_rules": "<rules>체력이 {p8} 미만인 에픽 몬스터를 제외한 몬스터 및 공격로 미니언을 처형합니다.</rules>", // 구분선 아래 회색 글씨
        "W": "나피리가 {p1}초 동안 대상으로 지정할 수 없는 상태가 되고 사냥을 준비하며 <keywordmajor>추가 무리를 {p2}마리</keywordmajor> 소환하고 {p3}초 동안 <physicaldamage>공격력이 {p4}</physicaldamage>, <speed>이동 속도가 {p5}%</speed> 증가합니다.<br><br><keywordmajor>무리</keywordmajor>가 대상으로 지정할 수 없는 상태가 되며 나피리에게 돌아갑니다.<br><br>", // 무리의 부름
        "E": "나피리가 전방으로 돌진해 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힌 후 칼날 폭발을 일으켜 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입힙니다.<br><br><keywordmajor>무리</keywordmajor>가 대상으로 지정할 수 없는 상태가 되며 나피리에게 돌아가 <healing>100%의 체력을 회복</healing>합니다.<br>", // 적출
        "R": "나피리가 적 챔피언에게 돌진해 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 잠시 <status>둔화</status>시킵니다. <keywordmajor>무리</keywordmajor>가 대상으로 지정할 수 없는 상태가 되어 나피리와 함께 돌진하며 <keywordmajor>한 마리</keywordmajor>당 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입힙니다.<br><br>나피리가 {p3}초 안에 처치 관여를 달성하면 주위 적들을 드러내고 이 스킬을 한 번 재사용할 수 있습니다. 두 번째 사용 시 {p4}초 동안 <shield>{p5}의 피해를 흡수하는 보호막</shield>을 얻습니다.<br><br><br>", // 사냥개의 추적
        "R_rules": "<rules><keywordmajor>무리의 부름</keywordmajor>이 짧은 시간 연장됩니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Nautilus": { // 노틸러스
        "P": "노틸러스의 첫 공격이 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 주며 {p2}초 동안 대상을 <status>속박</status>합니다.", // 강력한 일격 — stringtable
        "Q": "노틸러스가 전방으로 닻을 던집니다. 닻이 적을 맞히면 노틸러스와 대상이 가까이 당겨지며 대상에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 잠시 <status>기절</status>시킵니다. 닻이 지형을 맞히면 노틸러스가 지형 쪽으로 끌려갑니다.", // 닻줄 견인
        "Q_rules": "<rules>닻이 지형을 맞히면 이 스킬의 재사용 대기시간이 {p2}% 감소하고, 소모한 마나의 {p3}%가 회복됩니다.</rules>", // 구분선 아래 회색 글씨
        "W": "노틸러스가 {p1}초 동안 <shield>{p2}의 피해를 흡수하는 보호막</shield>을 얻습니다. <shield>보호막</shield>이 지속되는 동안 노틸러스의 기본 공격은 2초에 걸쳐 대상과 대상 주위의 모든 적에게 <magicdamage>{p3}의 마법 피해</magicdamage>를 추가로 입힙니다.", // 타이탄의 분노
        "E": "노틸러스가 주위에 세 번의 폭발을 일으킵니다. 폭발할 때마다 범위 내의 모든 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초 동안 {p3}% <status>둔화</status>시킵니다. 둔화 효과는 시간이 지나면 사라집니다.", // 역조
        "E_rules": "<rules>두 번째 폭발부터 피해량이 {p4}% 감소합니다.</rules><br><rules>이 스킬이 정글 몬스터에게 처음 적중할 때 {p5}의 추가 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "R": "노틸러스가 적 챔피언을 추격하는 충격파를 발사해 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히며, {p2}초 동안 <status>공중으로</status> <status>띄워 올리고</status> <status>기절</status>시킵니다. 충격파에 맞은 다른 적 또한 <status>공중에 뜨고</status> <status>기절</status>하며 <magicdamage>{p3}의 마법 피해</magicdamage>를 입습니다.", // 폭뢰
    },
    "Nocturne": { // 녹턴
        "P": "{p1}초마다 녹턴이 다음 기본 공격 시 주변 모든 적을 공격해 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입히고 적중한 대상 하나당 <healing>체력을 {p3}</healing> 회복합니다.<br><br>녹턴이 기본 공격 시 이 스킬의 재사용 대기시간이 {p4}초 감소합니다. (적 챔피언이나 정글 몬스터 공격 시 {p5}초 감소)", // 그림자 칼날 — stringtable
        "Q": "녹턴이 그림자 칼날을 던져 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 {p2}초 동안 황혼의 궤적을 남깁니다. 공격당한 적 챔피언 역시 황혼의 궤적을 남깁니다. <br><br>녹턴은 궤적 위로 이동 시 유체화 상태가 되고 <speed>이동 속도가 {p3}%</speed> 상승하며 <physicaldamage>공격력이 {p4}</physicaldamage> 증가합니다.", // 황혼의 인도자
        "Q_rules": "<rules>유체화 상태인 유닛은 다른 유닛을 통과할 수 있습니다.</rules>", // 구분선 아래 회색 글씨
        "W": "<passive>기본 지속 효과:</passive> 녹턴의 <attackspeed>공격 속도가 {p1}%</attackspeed> 상승합니다.<br><br><active>사용 시:</active> 녹턴이 1.5초 동안 그림자 장벽을 생성해 적의 다음 스킬을 방어합니다. 스킬을 막아내면 {p2}초 동안 이 스킬의 기본 지속 효과가 강화되어 <attackspeed>공격 속도가 {p3}%</attackspeed>까지 상승합니다.", // 어둠의 장막
        "W_rules": "<rules><spellname>피해망상</spellname>으로 날아가는 중에도 이 스킬은 유지됩니다.</rules>", // 구분선 아래 회색 글씨
        "E": "<passive>기본 지속 효과:</passive> 녹턴이 <status>공포</status>에 빠진 적에게 접근할 때 <speed>이동 속도가 {p1}%</speed> 증가합니다.<br><br><active>사용 시:</active> 녹턴이 대상과 연결되어 악몽을 꾸게 하고 {p2}초 동안 <magicdamage>{p3}의 마법 피해</magicdamage>를 입힙니다. 연결이 끊어지지 않으면 대상이 {p4}초 동안 <status>공포</status>에 빠집니다.", // 말할 수 없는 공포
        "R": "녹턴이 전장을 어둠으로 뒤덮어 {p1}초 동안 모든 적 챔피언의 시야 반경을 줄이고 시야 공유를 차단합니다. 지속시간 중에 스킬을 <recast>재사용</recast>하면 적 챔피언에게 돌격해 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입힙니다.", // 피해망상
    },
    "Nunu": { // 누누와 윌럼프
        "P": "챔피언, 대형 정글 몬스터, 또는 구조물에 피해를 입히면 4초 동안 누누와 윌럼프, 주변 아군의 공격 속도가 <attackspeed>{p1}%</attackspeed> 증가하고 이동 속도가 <speed>{p2}%</speed> 증가합니다.<br><br>강화 효과가 지속되는 동안 기본 공격 시 주변 적들에게 최대 <physicaldamage>{p3}의 추가 물리 피해</physicaldamage>를 입힙니다.", // 프렐요드의 부름 — stringtable
        "Q": "윌럼프가 적을 물어뜯습니다. 미니언이나 정글 몬스터에게 사용 시 <truedamage>{p1}의 고정 피해</truedamage>를 입히고 <healing>{p2}의 체력</healing>을 회복합니다. 챔피언에게 사용 시 <magicdamage>{p3}의 마법 피해</magicdamage>를 입히고 <healing>{p4}의 체력</healing>을 회복합니다.<br><br>누누와 윌럼프의 체력이 {p5}% 미만일 경우 <healing>회복량</healing>이 {p6}% 증가합니다.", // 잡아먹기
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "W": [
            "누누와 윌럼프가 굴릴수록 크기와 속도가 증가하는 눈덩이를 생성합니다. 눈덩이는 적에게 피해를 입히고 공중으로 띄워 올립니다. 눈덩이를 굴리는 동안 회전 속도가 느려지지만 계속 회전하면 회전 속도가 점점 증가합니다.<br>눈덩이가 챔피언이나 대형 몬스터, 벽에 충돌하면 <magicdamage>{p1}</magicdamage>~<magicdamage>{p2}의 마법 피해</magicdamage>를 입히고 {p3}~{p4}초 동안 대상을 <status>공중으로 띄워 올립니다</status>. 피해량은 눈덩이를 굴린 거리에 비례합니다.",
            "<recast>재사용</recast>하여 눈덩이를 일찍 굴려 보낼 수 있습니다."
        ], // 데굴데굴 눈덩이!
        "E": "누누가 눈덩이 3개를 던져 눈덩이 하나당 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. 눈덩이 3개를 모두 맞은 적은 {p2}초 동안 {p3}% <status>둔화</status>됩니다. 이 스킬은 최대 2회까지 <recast>재사용</recast>할 수 있습니다.<br><br>{p4}초 후 누누가 눈덩이에 맞아 <status>둔화</status>된 주변 적을 모두 {p5}초 동안 <status>속박</status>하고 <magicdamage>{p6}의 추가 마법 피해</magicdamage>를 입힙니다.", // 눈덩이 팡팡팡
        "E_rules": "<rules>누누는 이 스킬로 각 적을 한 번씩만 <status>둔화</status>시킬 수 있습니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "R": [
            "누누와 윌럼프가 최대 {p1}초 동안 강력한 눈보라를 생성합니다. 눈보라 안에 있는 적은 {p2}% <status>둔화</status>되며 지속시간 동안 둔화 정도는 최대 {p3}%까지 증가합니다. 누누와 윌럼프는 <shield>{p4}의 보호막</shield>을 얻으며, 이 보호막은 이후 {p5}초에 걸쳐 서서히 사라집니다.<br><br>눈보라가 끝나면 폭발하여 범위 내에 있는 적에게 정신 집중 시간에 비례해 최대 <magicdamage>{p6}의 마법 피해</magicdamage>를 입힙니다.",
            "<recast>재사용</recast>하여 눈보라를 일찍 끝낼 수 있습니다."
        ], // 절대 영도
    },
    "Nidalee": { // 니달리
        "P": "니달리는 <spellname>쿠거의 상</spellname> 스킬 레벨을 하나 보유한 상태로 시작합니다. <br><br>수풀에 들어가면 2초 동안 니달리의 <speed>이동 속도가 {p1}%</speed> 증가합니다. 적 챔피언 쪽으로 이동할 때는 <speed>이동 속도가 {p2}%</speed>까지 증가합니다.<br><br>챔피언이나 정글 몬스터가 <spellname>창 투척</spellname>이나 <spellname>매복 덫</spellname>에 적중하면 4초 동안 <keywordmajor>사냥</keywordmajor> 대상이 됩니다. <keywordmajor>사냥</keywordmajor>당하는 적이 있으면 <keywordstealth>절대 시야</keywordstealth>로 해당 적의 모습이 드러나며 니달리의 <speed>이동 속도가 {p1}%</speed> 증가합니다. <keywordmajor>사냥</keywordmajor>당하는 적 쪽으로 이동할 때는 <speed>이동 속도가 {p2}%</speed>까지 증가합니다.", // 수풀 배회 — stringtable
        "Q": "<keywordmajor>인간 형태:</keywordmajor> 니달리가 창을 던져 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. 피해량은 창이 날아간 거리에 비례해 <magicdamage>{p2}의 마법 피해</magicdamage>까지 증가합니다.", // 창 투척 / 숨통 끊기
        "W": "<keywordmajor>인간 형태:</keywordmajor> 니달리가 2분 동안 유지되는 투명한 덫을 설치합니다. 적이 덫을 밟으면 {p1}초 동안 초당 <magicdamage>{p2}의 마법 피해</magicdamage>를 입습니다.<br><br>한 번에 {p3}개의 덫만 설치할 수 있습니다.", // 매복 덫 / 급습
        "E": "<keywordmajor>인간 형태:</keywordmajor> 니달리가 <healing>체력을 {p1}</healing> 회복합니다. 회복량은 잃은 체력에 비례해 <healing>{p2}</healing>까지 증가합니다. 또한 {p3}초 동안 <attackspeed>공격 속도를 {p4}%</attackspeed> 증가시킵니다.", // 태고의 생명력 / 할퀴기
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "R": [
            "<passive>기본 지속 효과:</passive> <keywordmajor>인간 형태</keywordmajor>일 때 <keywordmajor>사냥</keywordmajor>을 적용하면 이 스킬의 재사용 대기시간이 초기화됩니다.<br><keywordmajor>인간 형태:</keywordmajor> 니달리가 <keywordmajor>쿠거 형태</keywordmajor>로 변하며 기본 공격이 근접으로 바뀌고 사용 스킬이 변경됩니다.",
            "<keywordmajor>쿠거 형태:</keywordmajor> 니달리가 <keywordmajor>인간 형태</keywordmajor>로 변하며 기본 공격이 원거리로 바뀌고 사용 스킬이 변경됩니다."
        ], // 쿠거의 상
        "Q2": "<keywordmajor>쿠거 형태:</keywordmajor> 니달리의 다음 기본 공격이 <magicdamage>{p1}+잃은 체력의 1%당 {p2}%에 해당하는 마법 피해</magicdamage>를 입힙니다.<br><br><keywordmajor>사냥</keywordmajor>당하는 적이 입는 피해는 30% 증가합니다.", // 숨통 끊기 — 쿠거 형태
        "W2": "<keywordmajor>쿠거 형태:</keywordmajor> 니달리가 도약하고 착지하여 주변 적들에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. <keywordmajor>쿠거 형태</keywordmajor>로 유닛 처치 시 이 스킬의 재사용 대기시간이 {p2}초 감소합니다.<br><br>더욱 먼 거리에서 <keywordmajor>사냥</keywordmajor> 대상에게 도약할 수 있으며 이 스킬의 재사용 대기시간이 {p2}초 감소합니다.", // 급습 — 쿠거 형태
        "E2": "<keywordmajor>쿠거 형태:</keywordmajor> 니달리가 전방의 적들을 발톱으로 공격하여 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다.", // 할퀴기 — 쿠거 형태
    },
    "Neeko": { // 니코
        "P": "니코가 맵에 있는 다른 유닛으로 변신합니다. 니코는 언제든 아군 챔피언 중 한 명으로 변신하거나 아군 또는 중립 유닛 근처에서 유닛의 쇼마를 저장해 해당 유닛으로 변신할 수 있습니다. <status>이동 불가 군중 제어기</status>에 당하거나 피해를 입히는 스킬을 사용하거나 챔피언이 아닌 상태에서 적 포탑에 피해를 입히거나 변장한 유닛이 해당 유닛의 체력만큼 피해를 입으면 변신이 풀립니다. <br><br><rules>니코가 변신하는 유닛의 긍정적 특징과 부정적 특징을 다수 획득합니다.</rules>", // 태고의 마력 — stringtable
        "Q": "니코가 폭발하는 씨앗을 던져 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. 씨앗이 폭발하여 유닛을 처치하거나 챔피언 또는 대형 몬스터에게 피해를 입히면 다시 폭발하여 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다. 최대 두 번까지 추가로 폭발합니다.", // 꽃망울 폭발
        "Q_rules": "<rules>각 폭발은 몬스터에게 추가로 <magicdamage>{p3}의 마법 피해</magicdamage>를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "W": [
            "<passive>기본 지속 효과:</passive> 세 번째 기본 공격마다 <magicdamage>{p1}의 추가 마법 피해</magicdamage>를 입히고 {p2}초 동안 <speed>이동 속도가 {p3}%</speed> 증가합니다.",
            "<active>사용 시:</active> 니코가 {p4}초 동안 <keywordstealth>투명</keywordstealth> 상태가 되며 {p5}초 동안 유지되는 복제 형상을 만들어 지정한 방향으로 보냅니다. 니코와 복제 형상은 {p6}초 동안 <speed>{p7}%의 추가 이동 속도</speed>를 얻습니다.<br><rules>클릭하여 소환수 이동 단축키를 사용하거나 이 스킬을 <recast>재사용</recast>해 분신을 조종할 수 있습니다.<br>분신은 니코의 스킬, 감정표현, 귀환을 따라 합니다.</rules>"
        ], // 형상 분리
        "W_rules": "<rules>분신은 은신 상태에서 대상으로 지정될 수 없습니다.<br>강화된 기본 공격은 몬스터에게 <magicdamage>{p8}의 추가 마법 피해</magicdamage>를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "E": "니코가 올가미를 던져 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초 동안 <status>속박</status>합니다.<br><br>올가미는 적을 맞히면 강화되어 크기가 커지고 더 빠르게 날아가며, {p3}초 동안 <status>속박</status>합니다.", // 칭칭올가미
        "R": "잠시 후 니코가 공중으로 도약해 {p1}초 동안 주변의 모든 적을 <status>공중으로 띄워 올립니다</status>. 이후 떨어지며 주변의 모든 적에게 <magicdamage>{p2}의 마법 피해</magicdamage>를 입히고 {p3}초 동안 <status>기절시킵니다</status>.<br><br><rules>니코가 변신 상태인 경우 이 스킬의 준비 동작이 적에게 보이지 않습니다. 이 스킬을 사용하면 {p4}초 후 변신이 해제됩니다.</rules>", // 만개
    },
    "Nilah": { // 닐라
        "P": "미니언에게 최후의 일격을 가하면 가장 가까운 아군과 닐라가 경험치 분배로 잃은 경험치의 {p1}%를 획득합니다.<br><br>아군 챔피언의 스킬로 받은 <healing>체력 회복 효과가 {p2}%만큼</healing>, <shield>보호막 효과가 {p3}%만큼</shield> 증가합니다. 닐라의 체력을 회복시키거나 보호막을 부여한 아군의 체력 회복 및 보호막 효과 역시 증가합니다. 아군이 자신에게 보호막이나 체력 회복 효과를 부여해도 닐라가 추가 효과를 얻습니다.", // 영원한 기쁨 — stringtable
        "Q": "<passive>기본 지속 효과:</passive> 방어구 관통력이 {p1} 증가하고, 챔피언에게 기본 공격 시 <healing>입힌 피해의 {p2}만큼 체력</healing>을 회복합니다. 최대 체력을 초과한 회복량은 {p3}초 동안 유지되는 <shield>보호막</shield>으로 전환됩니다.<br><br><active>사용 시:</active> 칼날 채찍을 휘둘러 <physicaldamage>{p4}의 물리 피해</physicaldamage>를 입힙니다. 적 유닛이나 구조물에 공격이 적중하면 125의 공격 사거리와 <attackspeed>{p5}%의 공격 속도</attackspeed>를 얻으며, {p6}초 동안 원뿔 범위를 공격합니다.<br>", // 무형의 검
        "Q_rules": "<rules>피해량은 치명타 확률 및 치명타 피해량에 따라 {p7}%만큼 증가합니다.<br><spellname>급류</spellname> 사용 중에 사용하면 파도를 일으켜 경로상의 모든 적을 공격합니다. </rules><br><rules>광역 공격 시 미니언에게는 {p8}%의 피해를 입히고 몬스터에게는 {p9}%의 피해를 입힙니다.</rules><br><rules>체력이 낮은 미니언을 즉시 처치합니다.</rules>", // 구분선 아래 회색 글씨
        "W": "{p1}초 동안 자신을 안개로 감싸 유체화 상태가 되어 <speed>이동 속도가 {p2}%</speed> 증가하고 기본 공격을 회피하며, 입는 <magicdamage>마법 피해</magicdamage>를 {p3}% 감소시킵니다.<br><br>스킬이 활성화된 동안 닐라와 닿은 아군 챔피언도 안개에 휩싸여 {p4}초 동안 같은 효과를 얻습니다.<br>", // 승리의 장막
        "W_rules": "<rules>유체화 상태인 유닛은 다른 유닛을 통과할 수 있습니다.</rules>", // 구분선 아래 회색 글씨
        "E": "대상 유닛을 뚫고 돌진해 경로상의 모든 적에게 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다.", // 급류
        "R": "칼날 채찍을 휘둘러 1초 동안 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힌 다음 마지막 일격으로 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입히고 적을 자신 쪽으로 <status>끌어당깁니다</status>.<br><br>적 챔피언에게 <healing>입힌 피해의 {p3}(+{p4} 무형의 검)</healing>만큼 자신과 주변 아군을 회복시키며, 최대 체력을 초과한 회복량은 {p5}초 동안 지속되는 <shield>보호막</shield>으로 전환됩니다.", // 환희
        "R_rules": "<rules>챔피언이 아닌 적을 상대로는 회복되는 체력이 {p6}%까지 감소합니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Darius": { // 다리우스
        "P": "다리우스의 기본 공격과 공격 스킬이 대상에게 <keywordmajor>과다출혈</keywordmajor>을 일으켜 {p1}초에 걸쳐 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입힙니다. 이 효과는 최대 {p3}번 중첩됩니다.<br><br>적이 최대로 중첩되거나 <spellname>녹서스의 단두대</spellname> 스킬로 처치되면 {p1}초 동안 다리우스의 <scalead>공격력이 {p4}</scalead> 증가하고 모든 기본 공격과 스킬 공격 사용 시 <keywordmajor>과다출혈</keywordmajor> 중첩이 {p3}번 적용됩니다.", // 과다출혈 — stringtable
        "Q": "다리우스가 도끼를 들어 올린 후 주위로 휘둘러 도끼날로는 <physicaldamage>{p1}의 물리 피해</physicaldamage>, 도끼 자루로는 <physicaldamage>{p2}의 피해</physicaldamage>를 입힙니다. 도끼 자루에 맞은 적은 <keywordmajor>과다출혈</keywordmajor>이 중첩되지 않습니다.<br><br>다리우스는 도끼날로 맞힌 적 챔피언과 대형 정글 몬스터 하나당 <healing>잃은 체력의 {p3}%</healing>를 회복합니다. 최대 <healing>{p4}%</healing>까지 회복됩니다.", // 학살
        "W": "다리우스의 다음 기본 공격은 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고, {p2}초 동안 {p3}% <status>둔화</status>시킵니다.<br><br>이 스킬로 대상을 처치하면 소모한 마나를 되돌려받고, 재사용 대기시간이 {p4}% 감소합니다.<br><br><rules>이 스킬은 피해를 입힐 때 효과가 발동합니다.</rules>", // 마비의 일격
        "E": "<passive>기본 지속 효과:</passive> 다리우스의 방어구 관통력이 {p1}% 상승합니다.<br><br><active>사용 시:</active> 다리우스가 도끼를 걸어 <status>끌어당기고</status> <status>공중으로 띄워 올린</status> 후 {p2}초 동안 {p3}% <status>둔화</status>시킵니다.", // 포획
        "R": "다리우스가 적에게 뛰어올라 치명적 타격을 가하여 <truedamage>{p1}의 고정 피해</truedamage>를 입힙니다. 대상의 <keywordmajor>과다출혈</keywordmajor> 중첩 하나당 {p2}%의 피해를 추가로 입힙니다. 최대 <truedamage>{p3}의 피해</truedamage>가 적용됩니다.<br><br>이 스킬로 대상을 처치할 경우, 다리우스가 {p4}초 안에 이 스킬을 <recast>재사용</recast>할 수 있습니다. 스킬 레벨이 3이 되면 이 스킬을 사용할 때 마나가 소모되지 않으며 챔피언을 처치하면 재사용 대기시간이 완전히 초기화됩니다.", // 녹서스의 단두대
    },
    "Diana": { // 다이애나
        "P": "다이애나의 <attackspeed>공격 속도가 {p1}</attackspeed> 증가합니다. 스킬을 사용한 후에는 {p2}초 동안 추가 공격 속도가 <attackspeed>{p3}</attackspeed>까지 증가합니다.<br><br>3번째 기본 공격마다 주위 적들을 베어 <magicdamage>{p4}의 추가 마법 피해</magicdamage>를 입힙니다.", // 서늘한 달빛 검 — stringtable
        "Q": "다이애나가 달 에너지를 휘어지게 발사하여 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초 동안 <keywordmajor>달빛</keywordmajor>으로 표식을 남깁니다. <br><br><keywordmajor>달빛</keywordmajor>은 <keywordstealth>은신</keywordstealth> 상태가 아닌 적을 드러냅니다.", // 초승달 검기
        "W": "다이애나가 {p1}초 동안 주위를 돌면서 닿으면 폭발하여 각각 <magicdamage>{p2}의 마법 피해</magicdamage>를 입히는 구체를 세 개 생성합니다. 최대 <magicdamage>{p3}의 피해</magicdamage>를 입힙니다.<br><br>같은 시간 동안 다이애나가 <shield>{p4}의 피해를 흡수하는 보호막</shield>도 얻습니다. 마지막 구체가 폭발하면 <shield>{p4}의 피해를 흡수하는 보호막</shield>을 추가로 얻고 지속시간이 초기화됩니다.", // 은빛 가호
        "E": "다이애나가 복수심에 불타는 달이 되어 적에게 돌진하고 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. 대상이 <keywordmajor>달빛</keywordmajor> 효과를 받고 있으면 이 스킬의 재사용 대기시간이 초기화됩니다.", // 월광 쇄도
        "R": "다이애나가 주위 적들을 드러내 <status>끌어당긴</status> 다음 {p1}초 동안 {p2}% <status>둔화</status>시킵니다.<br><br>최소 한 명의 적 챔피언에게 적중하면 다이애나가 달을 불러내어 <magicdamage>{p3}의 마법 피해</magicdamage>+추가로 끌어당기는 챔피언 하나당 <magicdamage>{p4}</magicdamage>에 해당하는 피해를 입힙니다. 최대 <magicdamage>{p5}의 피해</magicdamage>를 추가로 입힙니다.", // 달빛 낙하
    },
    "Draven": { // 드레이븐
        "P": "드레이븐이 챔피언이 아닌 유닛을 처치하거나, 포탑을 파괴하거나, <keywordmajor>회전 도끼</keywordmajor>를 잡을 때마다 중첩을 {p1} 획득합니다.<br><br>드레이븐이 챔피언을 처치할 때마다 {p2}+중첩당 {p3}골드를 추가로 획득합니다. 드레이븐이 사망하면 중첩 중 {p4}%가 사라집니다.", // 드레이븐의 리그 — stringtable
        "Q": "드레이븐이 <keywordmajor>회전 도끼</keywordmajor>를 준비해 다음 기본 공격이 추가로 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 도끼가 공중으로 튕깁니다. 드레이븐이 회전 도끼를 잡으면 다시 <keywordmajor>회전 도끼</keywordmajor>를 준비합니다.<br><br>드레이븐은 한 번에 2개의 <keywordmajor>회전 도끼</keywordmajor>를 들 수 있습니다.", // 회전 도끼
        "Q_rules": "<rules>{p2}초 동안 기본 공격하지 않으면 <keywordmajor>회전 도끼</keywordmajor>를 모두 떨어트립니다. 포탑이나 구조물은 기본 공격해도 <keywordmajor>회전 도끼</keywordmajor>가 튕겨 나오지 않습니다.</rules>", // 구분선 아래 회색 글씨
        "W": "드레이븐이 유체화 상태가 되며 <speed>이동 속도가 {p1}%</speed> 증가했다가 {p2}초에 걸쳐 원래대로 돌아옵니다. {p3}초 동안 <attackspeed>공격 속도가 {p4}%</attackspeed> 증가합니다.<br><br>드레이븐이 <keywordmajor>회전 도끼</keywordmajor>를 잡으면 이 스킬의 재사용 대기시간이 초기화됩니다.", // 광기의 피
        "W_rules": "<rules>유체화 상태인 유닛은 다른 유닛을 통과할 수 있습니다.</rules>", // 구분선 아래 회색 글씨
        "E": "드레이븐이 수평으로 도끼를 던져 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 <status>뒤로 밀어내며</status> {p2}초 동안 {p3}% <status>둔화</status>시킵니다.", // 비켜서라
        "R": "드레이븐이 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히는 대형 도끼 2개를 투척합니다. 챔피언에게 적중하거나 <recast>재사용</recast>하면 도끼가 드레이븐에게 돌아옵니다. 적에게 명중할 때마다 피해량이 {p2}% (최소: {p3}%) 감소합니다.<br><br>적 챔피언이 <keywordmajor>죽음의 소용돌이</keywordmajor>에 피해를 입어 체력이 드레이븐의 현재 <keywordmajor>드레이븐의 리그</keywordmajor> 중첩({p4})의 {p5}% 이하가 되면 드레이븐이 해당 챔피언을 처치합니다.", // 죽음의 소용돌이
        "R_rules": "<rules>도끼가 돌아올 때 피해량 감소가 초기화됩니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Ryze": { // 라이즈
        "P": "라이즈의 최대 마나량이 <scalemana>{p1}%</scalemana> 증가합니다. 스킬 사용 시 <scalemana>추가 마나</scalemana>에 비례하여 추가 피해를 입힙니다.", // 비전 연마 — stringtable
        "Q": "<passive>기본 지속 효과:</passive> <spellname>룬 감옥</spellname>과 <spellname>주문 전이</spellname> 사용 시 이 스킬의 재사용 대기시간이 초기화되고 {p1}초 동안 룬이 충전됩니다. 룬은 최대 {p2}개까지 충전됩니다.<br><br><active>사용 시:</active> 돌풍을 발사하여 처음으로 맞힌 적에게 <magicdamage>{p3}의 마법 피해</magicdamage>를 입힙니다. 대상에게 <keywordmajor>전이</keywordmajor> 표식이 있으면 과부하가 표식을 소모하여 {p4}% 증가한 피해를 입히고 <keywordmajor>전이</keywordmajor> 표식이 있는 주변 적에게 튕깁니다.<br><br>라이즈가 룬을 전부 방출합니다. 룬이 {p2}개 충전되면 {p5}초 동안 이동 속도가 <speed>{p6}%</speed>상승합니다.<br>", // 과부하
        "W": "<magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초 동안 {p3}% <status>둔화</status>시킵니다. <keywordmajor>전이</keywordmajor> 표식이 있는 대상에게는 표식을 소모하여 <status>둔화</status>시키는 대신 <status>속박</status>시킵니다.", // 룬 감옥
        "E": "라이즈가 구체를 던져 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 대상과 주변 적에게 {p2}초 동안 <keywordmajor>전이</keywordmajor>를 적용합니다. <keywordmajor>전이</keywordmajor> 표식이 남아 있는 적들은 주변에 <keywordmajor>전이</keywordmajor> 표식을 퍼뜨립니다.", // 주문 전이
        "R": "<passive>기본 지속 효과:</passive> <spellname>과부하</spellname> 사용 시 <keywordmajor>전이</keywordmajor> 표식이 있는 적에게 {p1}%의 추가 피해를 입힙니다.<br><br><active>사용 시:</active> 다른 위치로 이동하는 차원문을 엽니다. {p2}초 후, 차원문 근처의 모든 아군이 해당 위치로 순간이동합니다.", // 공간 왜곡
        "R_rules": "<rules><status>이동 불가</status> 상태나 스킬 <status>사용 불가</status> 상태가 되면 차원문이 취소됩니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Rakan": { // 라칸
        "P": "{p1}초마다 라칸에게 <shield>{p2}의 피해를 흡수하는 보호막</shield>이 생깁니다. 적 챔피언에게 기본 공격 또는 스킬 적중 시 재사용 대기시간이 {p3}초 감소합니다.<br><br><keywordmajor>연인의 귀환</keywordmajor> - 자야와 라칸은 동시에 귀환할 수 있습니다.", // 요술 망토 — stringtable
        "Q": "마법이 깃든 깃털을 던져 처음 적중한 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다.<br><br>챔피언 또는 에픽 정글 몬스터를 맞힐 경우 {p2}초 뒤 라칸과 주변 아군이 <healing>{p3}만큼 체력을 회복</healing>합니다. 라칸이 아군에게 닿으면 회복 효과가 즉시 발동됩니다.", // 빛나는 깃털
        "W": "라칸이 돌진했다가 공중으로 날아 오르며 적들을 {p1}초 동안 <status>공중으로 띄워 올리고</status> <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다.", // 화려한 등장
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "E": [
            "라칸이 아군 챔피언에게 도약해 {p1}초 동안 <shield>{p2}의 피해를 흡수하는 보호막</shield>을 씌웁니다.",
            "라칸은 {p3}초 안에 이 스킬을 <recast>재사용</recast>할 수 있습니다."
        ], // 전쟁무도
        "E_rules": "<rules>자야에게 사용할 경우 스킬의 사거리가 늘어납니다.</rules>", // 구분선 아래 회색 글씨
        "R": "라칸이 {p1}초 동안 <speed>{p2}%의 이동 속도</speed>를 얻습니다. 처음 라칸과 닿는 적은 <magicdamage>{p3}의 마법 피해</magicdamage>를 입고 {p4}초 동안 <status>매혹</status>됩니다. 처음 챔피언에게 닿으면 <speed>이동 속도가 {p5}% 빨라졌다가 점차 감소</speed>합니다.", // 매혹의 질주
    },
    "Rammus": { // 람머스
        "P": "람머스의 <scalead>공격력이 {p1}</scalead> 증가합니다.", // 가시박힌 껍질 — stringtable
        "Q": "람머스가 공 모양으로 몸을 말아 <speed>이동 속도가 {p1}</speed> 증가하고, {p2}초 동안 <speed>이동 속도가 {p3}</speed>까지 증가합니다. 람머스가 적과 충돌하면 멈추며, <magicdamage>{p4}의 마법 피해</magicdamage>를 입히고, <status>뒤로 밀어내며</status>, {p5}초 동안 주변 적들을 {p6}% <status>둔화</status>시킵니다.<br><br><recast>재사용 시</recast>: 이 스킬을 일찍 종료합니다.", // 대회전
        "W": "람머스가 {p1}초 동안 방어 태세에 들어가 <scalearmor>방어력을 {p2}</scalearmor>, <scalemr>마법 저항력을 {p3}</scalemr> 얻고 람머스를 공격하는 적에게 <magicdamage>{p4}의 마법 피해</magicdamage>를 입힙니다.<br><br><recast>재사용 시</recast>: 이 스킬을 일찍 종료합니다.", // 몸 말아 웅크리기
        "E": "람머스가 적 챔피언이나 몬스터를 {p1}초 동안 <status>도발</status>합니다. 몬스터는 <magicdamage>{p2}의 마법 피해</magicdamage>를 입습니다.", // 광란의 도발
        "R": "람머스가 공중으로 뛰어오른 후 지점에 착지하여 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초 동안 {p3}% <status>둔화</status>시킵니다. <spellname>대회전</spellname> 중에 사용했다면 중앙에 있는 적들은 추가로 <magicdamage>{p4}의 마법 피해</magicdamage>를 입고 {p5}초 동안 <status>공중에 뜹니다</status>.<br><br>이후 {p6}초 동안 해당 지점에 여진이 {p7}회 발생하며 <status>둔화</status> 효과를 중첩합니다.<br><br>이 스킬의 범위는 람머스의 <speed>이동 속도</speed>에 따라 증가합니다.", // 지진 폭격
        "R_rules": "<rules>이 스킬은 포탑에 {p8}%의 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Lux": { // 럭스
        "P": "럭스의 피해를 주는 스킬이 적에게 {p1}초 동안 표식을 남깁니다. 럭스의 기본 공격은 이 표식을 소모해 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다.<br><br><spellname>최후의 섬광</spellname>은 적중 시 표식을 소모한 후 재적용합니다.", // 광채 — stringtable
        "Q": "럭스가 빛의 구체를 발사하여 처음 적중한 적 둘을 {p1}초 동안 <status>속박</status>하고 각각 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다.", // 빛의 속박
        "W": "럭스가 마법봉을 던져 봉에 닿은 모든 아군에게 {p1}초 동안 <shield>{p2}의 피해를 흡수하는 보호막</shield>을 씌웁니다. 마법봉은 돌아올 때도 똑같이 <shield>보호막</shield>을 부여합니다.", // 프리즘 보호막
        "W_rules": "<rules>두 번의 보호막은 중첩될 수 있습니다.</rules>", // 구분선 아래 회색 글씨
        "E": "럭스가 빛의 영역을 생성해 적들을 {p1}% <status>둔화</status>시키고 해당 지역을 드러냅니다. {p2}초가 지나거나 스킬을 <recast>재사용</recast>하면 폭발하며 <magicdamage>{p3}의 마법 피해</magicdamage>를 입히고 추가로 {p4}초 동안 <status>둔화</status>시킵니다.", // 광휘의 특이점
        "R": "럭스가 눈부신 광선을 발사하여 일직선상에 있는 모든 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다.", // 최후의 섬광
    },
    "Rumble": { // 럼블
        "P": "럼블은 스킬을 사용할 때마다 <keywordmajor>열기</keywordmajor>를 얻습니다. <keywordmajor>열기가 {p1}</keywordmajor>에 도달하면 럼블이 <keywordmajor>위험 상태</keywordmajor>가 되어 모든 기본 스킬이 추가 효과를 얻습니다. <keywordmajor>열기가 {p2}</keywordmajor>에 도달하면 {p3}초 동안 과열 상태가 됩니다. <br><br>과열되면 <status>침묵</status> 상태가 되지만 <attackspeed>공격 속도가 {p4}</attackspeed> 증가하며 기본 공격 시 <magicdamage>{p5}+최대 체력의 {p6}%에 해당하는 마법 피해</magicdamage>를 추가로 입힙니다.<br><br><rules>체력 비례 피해량은 몬스터에게 최대 {p7}의 피해를 입힙니다. </rules>", // 고철장 거인 — stringtable
        "Q": "럼블이 화염방사기를 사용해 {p1}초 동안 <magicdamage>{p2} +최대 체력의 {p3}%에 해당하는 마법 피해</magicdamage>를 입힙니다. 미니언 공격 시 피해량이 <attention>{p4}%</attention>로 감소합니다.<br><br><keywordmajor>위험 상태:</keywordmajor> 마법 피해량이 <magicdamage>{p5} +최대 체력의 {p6}</magicdamage>만큼 증가합니다.<br><br><rules>체력 비례 피해량은 몬스터에게 최대 {p7}의 피해를 입힙니다. </rules>", // 화염방사기
        "W": "럼블이 방어막을 전개하여 {p1}초 동안 <shield>{p2}의 피해를 흡수하는 보호막</shield>을 얻고 {p3}초 동안 이동 속도가 <speed>{p4}%</speed> 증가합니다.<br><br><keywordmajor>위험 상태:</keywordmajor> <shield>{p5}의 피해를 흡수하는 보호막</shield>을 얻고 <speed>이동 속도가 {p6}</speed> 증가합니다.", // 고철 방패
        "E": "럼블이 전기 작살을 발사하여 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초 동안 {p3}% <status>둔화</status>시키며 {p4}초 동안 <scalemr>마법 저항력</scalemr>을 {p5}% 감소시킵니다.<br><br>이미 <status>둔화</status> 상태인 적을 이 스킬로 공격하면 <status>둔화</status> 효과가 {p6}%로 증가하며 적의 <scalemr>마법 저항력</scalemr>이 {p7}% 감소합니다.<br><br><keywordmajor>위험 상태:</keywordmajor> <magicdamage>{p8}의 마법 피해</magicdamage>를 입히고 <status>둔화</status> 효과와 <scalemr>마법 저항력</scalemr> 감소 효과가 50% 증가합니다.", // 전기 작살
        "R": "럼블이 일직선으로 로켓을 발사하여 {p1}초 동안 지속되는 불타는 궤적을 만듭니다. 궤적은 적을 {p2}% <status>둔화</status>시키고 초당 <magicdamage>{p3}의 마법 피해</magicdamage>를 입힙니다.<br><br>이 스킬을 사용하는 동안 클릭하고 드래그하여 궤적의 방향을 지정할 수 있습니다.", // 이퀄라이저 미사일
    },
    "Renata": { // 레나타 글라스크
        "P": "레나타의 기본 공격이 적에게 {p1}초 동안 표식을 남깁니다. 대상에게 표식이 없다면 <magicdamage>최대 체력의 {p2}에 해당하는 마법 피해</magicdamage>를 추가로 입힙니다.<br><br>아군 챔피언이 기본 공격 또는 스킬로 대상을 공격하면 표식을 소모해 <magicdamage>최대 체력의 {p3}에 해당하는 마법 피해</magicdamage>를 입힙니다.<br><br><rules>레나타는 한 대상에게만 표식을 남길 수 있습니다.</rules>", // 영향력 — stringtable
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "Q": [
            "레나타 글라스크가 의수에서 미사일을 발사해 처음 적중하는 적을 {p1}초간 <status>속박</status>하고 <magicdamage>{p2}</magicdamage>의 <magicdamage>마법 피해</magicdamage>를 입힙니다.",
            "<recast>재사용 시:</recast> 레나타가 대상을 지정한 방향으로 <status>던져</status> 적중하는 적에게 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다. 챔피언을 던진 경우 적중하는 적을 {p3}초간 <status>기절</status>시킵니다."
        ], // 악수
        "W": "레나타가 아군 챔피언을 강화합니다. 강화된 대상은 <attackspeed>{p1}의 공격 속도</attackspeed>를 얻고 적을 향해 이동할 때 <speed>{p2}의 이동 속도</speed>를 얻습니다. 이 효과는 {p3}초에 걸쳐 <attackspeed>공격 속도는 {p4}</attackspeed>, <speed>이동 속도는 {p5}</speed>까지 증가합니다. 처치 관여 시 효과 지속시간이 초기화됩니다.<br><br>대상이 죽으면 체력을 완전히 회복한 후 3초에 걸쳐 부식됩니다.<br><br>부식 중에 처치에 관여하면 체력이 <healing>최대 체력의 {p6}%</healing>가 되고 부식이 중단됩니다.<br><br><rules>부식 중인 챔피언의 죽음은 체력 회복 등의 효과로 늦출 수 있지만, 해당 챔피언이 처치에 관여하지 않는 한 죽음을 막을 수 없습니다. 챔피언의 죽음은 한 번만 늦출 수 있습니다.</rules>", // 긴급 구제
        "E": "레나타가 화학공학 미사일 두 발을 발사해 적중하는 적과 주변 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초간 30% <status>둔화</status>시킵니다. 적중하는 아군에게는 {p3}초간 <shield>{p4}의 피해를 흡수하는 보호막</shield>을 씌웁니다.", // 충성 고객 우대
        "R": "레나타가 화학 물질의 파도를 방출합니다. 적중당한 적은 {p1}초간 <status>광란</status> 상태에 빠져 근처 유닛을 기본 공격합니다. (자신의 아군 우선)<br><br><status>광란</status> 상태에 빠진 적은 <attackspeed>공격 속도가 {p2}%</attackspeed> 증가합니다.", // 적대적 인수
    },
    "Renekton": { // 레넥톤
        "P": "레넥톤이 기본 공격을 가할 때마다 <keywordmajor>{p1}의 분노</keywordmajor>를 얻습니다. <keywordmajor>분노가 {p2}</keywordmajor> 이상 쌓이면 다음 스킬 사용 시 소모되어 스킬이 강화됩니다. 전투에서 벗어나면 <keywordmajor>분노</keywordmajor>가 서서히 감소합니다.<br><br>체력이 {p3}% 미만일 경우 <keywordmajor>분노</keywordmajor>가 {p4}% 증가합니다.", // 분노의 지배 — stringtable
        "Q": "레넥톤이 검을 휘둘러 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다. 챔피언이 아닌 대상을 맞히면 <healing>{p2}의 체력</healing>을, 챔피언을 맞힐 때는<healing>{p3}</healing>의 체력을 회복합니다. 챔피언이 아닌 대상을 맞힐 때는 <keywordmajor>분노 {p4}</keywordmajor>, 챔피언을 맞힐 때는 <keywordmajor>분노 {p5}</keywordmajor>이 생성됩니다.<br><br><keywordmajor>분노 추가 효과</keywordmajor>: 물리 피해로 입히는 피해량이 <physicaldamage>{p6}</physicaldamage>만큼 상승합니다. 챔피언이 아닌 대상에게서 <healing>{p7}의 체력</healing>을, 챔피언에게서 <healing>{p8}의 체력</healing>을 회복합니다. 더 이상 <keywordmajor>분노</keywordmajor>가 생성되지 않습니다.", // 양떼 도륙
        "Q_rules": "<rules>스킬 사용 1회당 최대 <keywordmajor>{p9}의 분노</keywordmajor><br>기본 스킬 사용 시 최대 <healing>{p10}의 체력</healing>을 회복합니다.<br>강화 스킬 사용 시 최대 <healing>{p11}의 체력</healing>을 회복합니다.</rules>", // 구분선 아래 회색 글씨
        "W": "레넥톤의 다음 기본 공격은 두 번 베어 {p1}초 동안 적을 <status>기절</status>시키고 총 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입힙니다. 레넥톤이 챔피언을 맞히면 추가로 <keywordmajor>{p3}의 분노</keywordmajor>를 얻습니다.<br><br><keywordmajor>분노 추가 효과</keywordmajor>: 레넥톤이 세 번 공격하여 대상의 <shield>보호막</shield>을 파괴한 후 <physicaldamage>{p4}의 물리 피해</physicaldamage>를 입히고 {p5}초 동안 적을 <status>기절</status>시킵니다. <keywordmajor>분노</keywordmajor>가 생성되지 않습니다.", // 무자비한 포식자
        "W_rules": "<rules>모든 기본 공격에 적중 시 효과가 적용됩니다.</rules><br><rules>몬스터를 상대로는 보호막을 파괴하지 않습니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "E": [
            "레넥톤이 돌격하며 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다. 챔피언이 아닌 대상을 맞힐 때는 <keywordmajor>{p2}의 분노</keywordmajor>가, 챔피언을 맞힐 때는 <keywordmajor>{p3}의 분노</keywordmajor>가 생성됩니다.",
            "한 명 이상의 적에게 피해를 입힐 경우 {p4}초 내에 이 스킬을 한 번 <recast>재사용</recast>할 수 있습니다.<br><br><keywordmajor>분노 추가 효과</keywordmajor>: <recast>재사용</recast> 시 레넥톤이 돌격하며 <physicaldamage>{p5}의 물리 피해</physicaldamage>를 입히고 {p6}초 동안 방어력을 <scalearmor>{p7}%</scalearmor> 감소시킵니다. 더 이상 <keywordmajor>분노</keywordmajor>가 생성되지 않습니다."
        ], // 자르고 토막내기
        "E_rules": "<rules>스킬 사용 1회당 최대 <keywordmajor>{p8}의 분노</keywordmajor></rules>", // 구분선 아래 회색 글씨
        "R": "레넥톤이 {p1}초 동안 어둠의 기운으로 자신을 감싸며 <healing>{p2}의 최대 체력</healing>과 <keywordmajor>{p3}의 분노</keywordmajor>를 얻습니다. 스킬이 활성화되어 있는 동안 레넥톤은 <magicdamage>{p4}의 마법 피해</magicdamage>를 입히고 초당 <keywordmajor>{p5}의 분노</keywordmajor>를 얻습니다.", // 강신
    },
    "Leona": { // 레오나
        "P": "레오나의 스킬은 적에게 {p1}초 동안 표식을 남깁니다. 아군 챔피언이 공격할 경우 표식을 터트리면서 적에게 <magicdamage>{p2}의 마법 피해</magicdamage>를 추가로 입힙니다.", // 햇빛 — stringtable
        "Q": "레오나가 다음 기본 공격 시 {p1}초 동안 적을 <status>기절</status>시키고 <magicdamage>{p2}</magicdamage>의 마법 피해를 추가로 입힙니다.", // 여명의 방패
        "Q_rules": "<rules>6초 안에 공격하지 않으면 스킬 효과가 사라집니다.</rules>", // 구분선 아래 회색 글씨
        "W": "레오나가 방패를 들어 받는 피해량을 {p1} 감소시키고, {p2}초 동안 <scalearmor>{p3}의 방어력</scalearmor>과 <scalemr>{p4}의 마법 저항력</scalemr>을 얻습니다. 잠시 후, 방패가 폭발하며 주변 적들에게 <magicdamage>{p5}의 마법 피해</magicdamage>를 입힙니다. 적이 한 명이라도 공격에 적중당한 경우, <scalearmor>방어력</scalearmor>과 <scalemr>마법 저항력</scalemr>의 증가 효과가 {p2}초 더 유지됩니다.<br>", // 일식
        "W_rules": "<rules>{p6}% 아래의 공격에는 피해량 감소 효과가 적용되지 않습니다.</rules>", // 구분선 아래 회색 글씨
        "E": "레오나가 빛의 검을 날려 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. 마지막으로 맞은 챔피언은 {p2}초 동안 <status>속박</status>되며 레오나가 그쪽으로 돌격합니다.", // 천공의 검
        "R": "태양 에너지를 소환하여 눈부신 광선으로 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초 동안 {p3}%만큼 <status>둔화</status>시킵니다. 폭발의 중앙에 있는 적들은 <status>둔화</status>되지 않고 <status>기절</status>합니다.", // 흑점 폭발
    },
    "RekSai": { // 렉사이
        "P": "렉사이는 기본 공격 시 <keywordmajor>{p1}의 분노</keywordmajor>를, 기본 스킬 사용 시 <keywordmajor>{p2}의 분노</keywordmajor>를 생성합니다.<br><br><keywordmajor>매복 상태</keywordmajor>에서 렉사이가 <keywordmajor>분노</keywordmajor>를 소모해 {p3}초 동안 최대 <healing>{p4}의 체력</healing>을 회복합니다. 체력 회복량은 레벨에 따라 증가합니다.", // 제르사이의 분노 — stringtable
        "Q": "<keywordmajor>돌출 상태:</keywordmajor> 렉사이가 {p1}초 안에 가하는 3회의 기본 공격이 <attackspeed>{p2}%의 공격 속도</attackspeed>를 얻고 주변 적들에게 <physicaldamage>{p3}의 물리 피해</physicaldamage>를 추가로 입힙니다. 기본 공격이 이 스킬의 지속시간을 초기화합니다.", // 여왕의 진노 / 먹잇감 추적
        "Q_rules": "<rules>기본 공격 대상에게는 추가 피해량에 치명타가 적용될 수 있습니다.</rules>", // 구분선 아래 회색 글씨
        "W": "<keywordmajor>돌출 상태:</keywordmajor> 렉사이가 땅속으로 매복해 새로운 스킬을 사용할 수 있게 되지만, 기본 공격은 할 수 없는 상태가 됩니다. 이 상태에서 렉사이는 <speed>{p1}의 이동 속도</speed>를 얻고 시야 범위가 {p2}% 축소됩니다. 그러나 보이지 않지만 이동하고 있는 근처 적들의 위치를 파악해 자신 및 아군에게 표시합니다.", // 매복 / 돌출
        "E": "<keywordmajor>돌출 상태:</keywordmajor> 렉사이가 대상을 물어뜯어 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다. <keywordmajor>분노</keywordmajor>가 최대치일 경우 대신 <truedamage>{p2}의 고정 피해</truedamage>를 입힙니다.", // 성난 이빨 / 땅굴 파기
        "R": "렉사이가 {p1}초 내에 피해를 입힌 적을 표적으로 삼은 후, 땅속으로 들어가 대상으로 지정할 수 없는 상태가 됩니다. 잠시 후, 대상에게 도약해 <physicaldamage>{p2}+최대 체력의 {p3}%에 해당하는 물리 피해</physicaldamage>를 입히고 <keywordmajor>매복 / 돌출</keywordmajor>의 재사용 대기시간이 초기화됩니다. 도약 중인 렉사이는 멈출 수 없습니다.", // 공허의 돌진
        "Q2": "<keywordmajor>매복 상태:</keywordmajor> 렉사이가 공허 에너지가 주입된 흙을 발사합니다. 흙은 처음 맞는 적 위에서 폭발하며 작은 영역에 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고, {p2}초 동안 비 은신 상태인 적의 위치를 드러냅니다. 챔피언에게 적중할 경우 <keywordmajor>{p3}의 분노</keywordmajor>가 생성됩니다.", //  — 매복 상태
        "W2": "<keywordmajor>매복 상태:</keywordmajor> 렉사이가 매복을 풀고 나와 주변 모든 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 첫 번째 대상과 주변 챔피언, 주변 대형 몬스터를 {p2}초 동안 <status>공중으로 띄워 올립니다</status>. 이 스킬은 {p3}초에 한 번씩만 적을 <status>공중으로 띄워 올릴 수 있습니다</status>.", //  — 매복 상태
        "E2": "<keywordmajor>매복 상태:</keywordmajor> 렉사이가 땅굴을 파고 전진하여 {p1}분 동안 연결된 두 개의 땅굴 입구를 남깁니다. 땅굴 입구 중 하나를 클릭하면 렉사이가 다른 쪽 입구로 뛰어듭니다. 땅굴은 이용하고 나면 {p2}초의 재사용 대기시간이 적용되며, 렉사이는 최대 {p3}개의 땅굴을 유지할 수 있습니다.", //  — 매복 상태
        "E2_rules": "<rules>땅굴은 적이 밟아서 파괴할 수 있습니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Rell": { // 렐
        "P": "렐의 기본 공격과 스킬이 {p1}초 동안 <scalearmor>{p2}%의 방어력</scalearmor>과 <scalemr>{p2}%의 마법 저항력</scalemr>을 훔칩니다(최대 {p3}%). 기본 공격 적중 시 <magicdamage>{p4}의 마법 피해</magicdamage>를 입힙니다.", // 갑옷 파쇄 — stringtable
        "Q": "렐이 전방으로 창을 찔러 대상을 {p1}초 동안 <status>기절</status>시키고 모든 <shield>보호막</shield>을 파괴하며 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다.", // 파열의 일격
        "Q_rules": "<rules>몬스터를 상대로는 보호막을 파괴하지 않습니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   ★ '철마술: 탑승' 블록은 Data Dragon 원문에 **아예 없다.**
        //     인게임 툴팁(례 W1/W2.PNG)을 보고 손으로 썼다 (2026-08-10).
        //     수치도 툴팁에서 그대로 가져왔다 — 10/25/40/55/70 (+ 주문력 40%), 이속 30%
        "W": [
            "<passive>기본 지속 효과 - 탑승 민첩성:</passive> 렐이 탑승 상태에서 <speed>이동 속도가 {p1}</speed> 증가합니다.<br><br><active>사용 시 - 철마술: 붕괴:</active> 렐이 탈것에서 뛰어내리며 적들을 <status>공중으로 띄워 올리고</status> <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다. 렐이 <shield>{p3}의 피해를 흡수하는 보호막</shield>을 얻습니다. 보호막은 다시 탑승할 때까지 지속됩니다.<br>그런 다음 중갑 상태로 변하며 <scalearmor>{p4}% 증가한 방어력</scalearmor>과 <scalemr>마법 저항력</scalemr>, <attackspeed>{p5}%의 공격 속도</attackspeed>, {p6}의 공격 사거리를 얻습니다. 중갑 상태에서는 <spellname>철마술: 탑승</spellname> 스킬을 사용할 수 있습니다.",
            "<active>사용 시 - 철마술: 탑승:</active> 렐이 탈것에 오르며 잠시 <speed>이동 속도가 30%</speed> 증가했다가 점차 감소합니다. 3.5초 안에 다음 공격 시 적을 <status>공중으로 띄워 올리고</status> 뒤로 던지며 <magicdamage>10 / 25 / 40 / 55 / 70 (+ 주문력의 40%)의 마법 피해</magicdamage>를 추가로 입힙니다."
        ], // 철마술: 붕괴
        "E": "렐과 아군 하나가 돌진하며 {p1}초 동안 <speed>이동 속도가 {p2}%</speed> 증가합니다. 적 챔피언이나 서로를 향해 마주하고 있으면 <speed>{p3}%</speed>까지 증가합니다. 렐의 다음 공격 또는 <spellname>파열의 일격</spellname> 스킬이 일정 지역에서 폭발해 <magicdamage>최대 체력의 {p4}에 해당하는 마법 피해</magicdamage>를 입힙니다.", // 전속력
        "E_rules": "<rules>정글 몬스터와 구조물을 상대로는 최대 {p5}의 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "R": "렐이 자기 폭발을 일으켜 근처 적들을 렐 쪽으로 <status>끌어당깁니다</status>. 그런 다음 {p1}초 동안 근처 적들을 계속 <status>잡아당기며</status> <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다.", // 자기 폭풍
    },
    "Rengar": { // 렝가
        "P": "수풀에서 기본 공격을 사용하면 대상에게 도약합니다.<br><br>궁극기 이외의 스킬을 사용하면 <keywordmajor>1회의 야성</keywordmajor> 중첩을 얻습니다. 도약 시작 시 현재 도약으로 얻은 야성이 없을 경우 보이지 않는 포식자가 <keywordmajor>1회의 야성</keywordmajor> 중첩을 생성합니다.<br> <br><keywordmajor>야성 {p1}회 중첩</keywordmajor> 시 다음에 사용하는 궁극기 이외의 스킬이 강화되고, 강화된 스킬 사용 시 {p2}초 동안 <speed>이동 속도가 {p3}</speed> 증가합니다.<br><br><keywordmajor>뼈이빨 목걸이</keywordmajor>의 고유 처치로 <physicaldamage>추가 공격력의 1 ~ 36%</physicaldamage>만큼 <physicaldamage>추가 공격력</physicaldamage>을 얻습니다. (전리품 수에 따라)", // 보이지 않는 포식자 — stringtable
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "Q": [
            "다음 2회 기본 공격 시 렝가의 <attackspeed>공격 속도가 {p1}%</attackspeed> 증가합니다. 첫 번째 공격은 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입힙니다.",
            "<keywordmajor>최대 야성:</keywordmajor> 첫 번째 공격이 <physicaldamage>{p3}의 물리 피해</physicaldamage>를 입히고 {p4}초 동안 렝가의 <attackspeed>공격 속도가 {p5}</attackspeed> 증가합니다."
        ], // 포악함
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "W": [
            "렝가가 포효하여 근처 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 지난 {p2}초 동안 입은 피해의 <healing>{p3}%</healing>를 회복합니다.",
            "<keywordmajor>최대 야성:</keywordmajor> <magicdamage>{p4}의 마법 피해</magicdamage>를 입히고 추가로 군중 제어 효과를 해제합니다."
        ], // 전투의 포효
        "W_rules": "<rules>정글 몬스터에게는 <magicdamage>{p5}의 마법 피해</magicdamage>를 추가로 입힙니다. 정글 몬스터에게 받은 피해량의 <healing>{p6}%</healing>에 해당하는 체력을 회복합니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "E": [
            "렝가가 올가미를 던져 처음으로 맞힌 적의 위치를 드러낸 다음 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 {p2}초 동안 {p3}% <status>둔화</status>시킵니다.",
            "<keywordmajor>최대 야성:</keywordmajor> <physicaldamage>{p4}의 물리 피해</physicaldamage>를 입히고 {p2}초 동안 <status>속박</status>합니다."
        ], // 올가미 투척
        "E_rules": "<rules>{p5}초간 적의 위치를 드러냅니다.</rules><br><rules><spellname>올가미 투척</spellname>은 도약 중 시전 시간이 없습니다.</rules>", // 구분선 아래 회색 글씨
        "R": "<passive>기본 지속 효과:</passive> 렝가가 <keywordstealth>위장</keywordstealth> 상태일 때 도약 공격을 합니다.<br><br><active>사용 시:</active> {p1}초 동안 렝가의 <speed>이동 속도가 {p2}%</speed> 증가하며 가장 가까운 적 챔피언 주변에 <keywordstealth>절대 시야</keywordstealth>를 얻습니다.<br><br>{p3}초가 지나면 렝가는 <keywordstealth>위장</keywordstealth> 상태가 되어 수풀에 있지 않아도 도약할 수 있습니다. 가장 가까이 있는 적에게 도약 시 <physicaldamage>{p4}의 물리 피해</physicaldamage>를 추가로 입히며 {p5}초 동안 대상의 <scalearmor>방어력을 {p6}</scalearmor>만큼 감소시키고 이 스킬을 종료합니다.", // 사냥의 전율
        "R_rules": "<rules><keywordstealth>위장</keywordstealth> 상태일 때는 적 챔피언의 감지 범위 안에 들어가지 않는 한 시야에 보이지 않습니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Locke": { // 로크
        "P": "기본 공격 적중 시 추가로 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. 피해량은 대상이 잃은 체력에 비례해 <magicdamage>{p2}의 마법 피해</magicdamage>까지 증가합니다.", // 은빛 말뚝 — stringtable
        "P_rules": "<rules>이 효과는 체력이 30%일 때 최대가 됩니다.</rules>", // 구분선 아래 회색 글씨
        "Q": "로크가 <keywordmajor>영혼의 대못</keywordmajor>을 여러 개 준비하고 던져 적중한 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 표식을 남깁니다. 대못에 맞은 적은 {p2}/{p3}/{p4}초 동안 {p5}/{p6}/{p7}% <status>둔화</status>됩니다. 이 효과는 적중한 대못 수에 따라 중첩됩니다.<br><br>해당 적을 기본 공격하면 <keywordmajor>영혼의 대못</keywordmajor>을 소모해 중첩당 <magicdamage>{p8}의 마법 피해</magicdamage>를 입힙니다. 피해량은 대못 2개일 때 {p9}%, 3개일 때 {p10}% 증가합니다.", // 의식용 대못
        "Q_rules": "<rules>이 효과가 끝나면 남은 대못 하나당 스킬의 재사용 대기시간 및 마나 소모량이 {p11} 반환됩니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "W": [
            "로크가 자신의 영혼을 불태워 <attackspeed>공격 속도가 {p1}</attackspeed>, <speed>이동 속도가 {p2}</speed> 증가했다가 {p3}초에 걸쳐 원래대로 돌아옵니다.<br>{p4}초 동안 매초 <truedamage>현재 체력의 {p5}%에 해당하는 고정 피해</truedamage>를 입지만, 마지막으로 입은 피해량 <healing>{p6}</healing>만큼 <healing>체력을 회복</healing>하고, 잃은 체력 및 경과 시간에 비례해 <healing>{p7}의 체력</healing>을 추가로 회복합니다. 최대 <healing>남은 체력의 {p8}만큼 회복</healing>합니다.",
            "<recast>재사용</recast>하여 더 빨리 종료할 수 있습니다."
        ], // 영혼 점화
        "W_rules": "<rules><status>방해</status>를 받는 동안에도 이 스킬을 사용할 수 있습니다.</rules><br><rules>지속시간 동안 로크는 <keyword>유체화</keyword> 상태가 됩니다. 유체화 상태인 유닛은 다른 유닛을 통과할 수 있습니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "E": [
            "로크가 지정한 위치로 순간이동하며 주변 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. ",
            "다음 기본 공격 시 대상에게 돌진하며 경로에 있는 모든 적에게 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다. 적중할 때마다 <keywordmajor>영혼의 대못</keywordmajor>을 소모합니다.<br><br>로크가 처치에 관여하면, 이 스킬의 재사용 대기시간이 초기화됩니다."
        ], // 잿빛 추격
        "R": "로크가 적을 구속하는 유물을 지정한 위치로 던져 범위 내 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}% <status>둔화</status>시킵니다. 둔화 효과는 {p3}초에 걸쳐 사라집니다. 유물에 적중한 적에게 {p4}초 동안 표식이 남습니다. 표식이 남은 적 챔피언의 체력이 <spellname>{p5}</spellname> 아래로 떨어지면 봉인되고 영향을 받은 다른 챔피언에게 남은 표식의 지속시간이 초기화됩니다.<br><br>지속시간이 끝난 후 챔피언이 1명 이상 봉인되었다면 유물이 땅에 떨어집니다. 로크가 유물을 획득하면 봉인된 챔피언 수에 비례해 처형 체력 기준치가 영구적으로 {p6}% 증가하고 전체 재사용 대기시간의 {p7}%를 돌려받습니다.<br>", // 연옥
        "R_rules": "<rules>유물은 봉인 시점의 현재 스킬 재사용 대기시간만큼 지면에 남아 있습니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Lucian": { // 루시안
        "P": "루시안은 스킬을 사용한 후 {p1}초 이내에 기본 공격을 하면 총을 두 번 연속 발사합니다. 두 번째 공격은 대상에 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입히며, 미니언을 상대로는 피해가 <physicaldamage>{p3}</physicaldamage>까지 증가합니다.<br><br><attention>경계: </attention>아군이 루시안에게 직접 회복 또는 보호막 효과를 부여하거나, 근처 적 챔피언이 <status>이동 불가</status> 상태가 되면 루시안의 권총이 <keywordmajor>과충전</keywordmajor> 상태가 되어 다음 {p4}회의 기본 공격 시 <magicdamage>{p5}의 마법 피해</magicdamage>를 추가로 입힙니다.", // 빛의 사수 — stringtable
        "Q": "루시안이 대상을 관통하는 빛 줄기를 발사해 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다.<br>", // 꿰뚫는 빛
        "Q_rules": "<rules>챔피언 레벨이 올라갈수록 더 빠르게 발사합니다.</rules>", // 구분선 아래 회색 글씨
        "W": "루시안이 사거리 끝에 도달하거나 적을 맞히면 폭발하는 탄환을 발사합니다. 폭발에 맞은 적은 <magicdamage>{p1}의 마법 피해</magicdamage>를 입고 잠시 위치가 드러나며, 6초 동안 표식이 남습니다.<br><br>루시안이나 아군이 표식이 남은 적을 공격하면 1초 동안 루시안의 <speed>이동 속도가 {p2}</speed> 상승합니다. 아군이 이 효과를 발동시키면 루시안이 <attention>경계</attention> 효과도 얻습니다.", // 타는 불길
        "E": "루시안이 돌진합니다.<br><br><spellname>빛의 사수</spellname>로 적을 맞힐 때마다 재사용 대기시간이 {p1}초씩 감소합니다. (챔피언인 경우 {p2}초 감소)", // 끈질긴 추격
        "E_rules": "<rules>루시안은 돌진 중에도 다른 스킬을 사용할 수 있습니다.</rules>", // 구분선 아래 회색 글씨
        "R": "루시안이 {p1}초 동안 한 방향으로 총을 <keywordmajor>{p2}</keywordmajor>회 난사해 처음 적중한 적에게 각각 <physicaldamage>{p3}의 물리 피해</physicaldamage>를 입힙니다. 스킬을 <recast>재사용</recast>하면 난사를 중단합니다.<br><br>총을 난사하는 도중에 <spellname>끈질긴 추격</spellname>을 사용할 수 있습니다.<br><br>총 피해량: <physicaldamage>{p4}의 물리 피해</physicaldamage><br>", // 빛의 심판
        "R_rules": "<rules>탄환 수는 루시안의 치명타 확률 및 치명타 피해량에 비례해 {p5}%만큼 증가합니다.<br>미니언에게는 {p6}%의 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Lulu": { // 룰루
        "P": "요정 픽스가 룰루를 돕습니다. 룰루가 기본 공격 시 픽스도 같은 대상에게 광선을 3번 발사해 처음 적중한 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다.", // 요정 친구 픽스 — stringtable
        "Q": "룰루와 픽스가 각자 예리한 마법 화살을 발사하여 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. 적중당한 적은 {p2}% <status>둔화</status>되었다가 {p3}초에 걸쳐 원래대로 돌아옵니다.<br><br>적이 추가 마법 화살로 <magicdamage>{p4}의 마법 피해</magicdamage>를 입습니다.", // 반짝반짝 창
        "Q_rules": "<rules>미니언에게는 <magicdamage>{p5}%의 피해</magicdamage>를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "W": "아군에게 사용하면 {p1}초 동안 <speed>이동 속도가 {p2}</speed>, <attackspeed>공격 속도가 {p3}%</attackspeed> 증가합니다.<br><br>적에게 사용하면 룰루가 {p4}초 동안 적을 <status>변이</status>시킵니다.", // 변덕쟁이
        "W_rules": "<rules><status>변이</status>된 대상은 <status>침묵</status> 및 <status>공격 불가</status> 상태가 되며 {p5} <status>둔화</status>됩니다.</rules>", // 구분선 아래 회색 글씨
        "E": "아군에게 사용 시 픽스가 아군에게 날아가 {p1}초 동안 <spellname>요정 친구 픽스</spellname> 스킬을 부여합니다. 해당 아군이 챔피언이면 {p2}초 동안 <shield>{p3}의 피해를 흡수하는 보호막</shield>을 추가로 부여합니다.<br><br>적 챔피언에게 사용 시 픽스가 적을 방해하여 <magicdamage>{p4}의 마법 피해</magicdamage>를 입히며 {p5}초 동안 해당 적에 대한 <keywordstealth>절대 시야</keywordstealth>가 생깁니다.", // 도와줘, 픽스!
        "R": "룰루가 아군의 몸집을 키우며 주변 적을 {p1}초 동안 <status>공중으로 띄워 올립니다</status>. 몸집이 커진 아군은 {p2}초 동안 <healing>최대 체력이 {p3}</healing> 증가하며 주변 적을 {p4}% <status>둔화</status>시킵니다.", // 급성장
    },
    "Leblanc": { // 르블랑
        "P": "르블랑의 체력이 40% 아래로 내려가면 1초 동안 <keywordstealth>투명</keywordstealth> 상태가 되며 8초 동안 무해한 분신을 생성합니다. 르블랑은 'Alt' 키로 분신을 움직일 수 있습니다.", // 거울 환영 — stringtable
        "Q": "르블랑이 적에게 인장을 날려 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초 동안 표식을 남깁니다.<br><br>표식이 남은 적을 스킬로 공격하면 인장이 폭발하며 <magicdamage>{p3}의 마법 피해</magicdamage>를 입힙니다.<br><br>인장이 명중하거나 폭발해 대상을 처치하면 소모한 마나의 {p4}%를 돌려받고 이 스킬의 남은 재사용 대기시간이 {p5}% 감소합니다.<br><br><rules>인장은 미니언에게 명중 시 {p6}의 추가 피해를 입힙니다. </rules>", // 악의의 인장
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "W": [
            "르블랑이 돌진한 후 주변 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. 돌진 후 {p2}초 동안 <recast>재사용</recast>할 수 있습니다.",
            "<recast>재사용 시:</recast> 르블랑이 처음 위치로 돌아갑니다."
        ], // 왜곡
        "E": "르블랑이 처음 적중한 적을 옭아매는 사슬을 던져 <magicdamage>{p1}의 마법 피해</magicdamage>를 주고 <keywordstealth>절대 시야</keywordstealth>를 얻습니다.<br><br>대상이 {p2}초간 사슬에 묶여 있으면 대상을 {p3}초 동안 <status>속박</status>하고 추가로 <magicdamage>{p4}의 마법 피해</magicdamage>를 줍니다.", // 환영 사슬
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "R": [
            "르블랑이 가장 최근에 사용한 스킬을 모방하여 다시 사용합니다. 모방한 스킬의 피해량이 증가합니다.",
            "<spellname>모방한 악의의 인장</spellname>을 남기면 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고, 발동하면 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다.",
            "<spellname>모방한 왜곡</spellname>은 <magicdamage>{p3}의 마법 피해</magicdamage>를 입힙니다.",
            "<spellname>모방한 환영 사슬</spellname>은 옭아맬 때 <magicdamage>{p4}의 마법 피해</magicdamage>를 입히고, <status>속박</status>할 때 <magicdamage>{p5}의 마법 피해</magicdamage>를 입힙니다."
        ], // 모방
    },
    "LeeSin": { // 리 신
        "P": "리 신이 스킬을 사용하면 다음 두 번의 <attackspeed>기본 공격 속도가 {p1}%</attackspeed> 증가합니다. 첫 번째 기본 공격 시 <keywordmajor>{p2}의 기력</keywordmajor>을, 두 번째 기본 공격 시 <keywordmajor>{p3}의 기력</keywordmajor>을 회복합니다.", // 질풍격 — stringtable
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "Q": [
            "리 신이 불협화음으로 된 음파를 발사하여 처음 적중한 적에게 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 해당 적에 대한 <keywordstealth>절대 시야</keywordstealth>를 얻습니다. 다음 {p2}초 안에 스킬을 <recast>재사용</recast>할 수 있습니다.",
            "<recast>재사용 시:</recast> 리 신이 음파에 맞은 적에게 돌진하여 대상이 잃은 체력에 비례해 <physicaldamage>{p3}~{p4}의 물리 피해</physicaldamage>를 입힙니다."
        ], // 음파 / 공명의 일격
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "W": [
            "리 신이 아군이나 와드를 향해 돌진합니다. 대상이 챔피언일 경우 해당 아군과 자신에게 {p1}초 동안 <shield>{p2}의 피해를 흡수하는 보호막</shield>을 씌웁니다. {p3}초 안에 <recast>재사용</recast>할 수 있습니다.",
            "<recast>재사용 시:</recast> {p4}초 동안 모든 피해 흡혈이 {p5}% 증가합니다."
        ], // 방호 / 강철의 의지
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "E": [
            "리 신이 바닥을 내리쳐 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초 동안 은신한 적을 드러내는 충격파를 발생시킵니다. 스킬이 적에게 명중하면 다음 {p3}초 안에 스킬을 <recast>재사용</recast>할 수 있습니다.",
            "<recast>재사용 시:</recast> 충격파에 적중한 주변 적을 {p4}% <status>둔화</status>시킵니다. 둔화 효과는 {p2}초에 걸쳐 사라집니다."
        ], // 폭풍/무력화
        "R": "리 신이 강력한 돌려차기로 적 챔피언을 <status>뒤로 날려버리고</status>, <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다.<br><br>날아간 대상과 부딪힌 적은 잠시 <status>공중에 떠오르고</status> <physicaldamage>{p1}+날아간 대상 추가 체력의 {p2}%에 해당하는 물리 피해</physicaldamage>를 입습니다.", // 용의 분노
        "R_rules": "<rules>날아간 대상은 시전 시간 동안 <status>속박</status>됩니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Riven": { // 리븐
        "P": "리븐이 스킬을 사용할 때마다 6초 동안 1번 충전되고 최대 {p1}번까지 충전됩니다. 기본 공격 시 충전을 소모하여 <physicaldamage>{p2}의 추가 물리 피해</physicaldamage>를 입힙니다.", // 룬 검 — stringtable
        "Q": "리븐이 전방으로 짧게 돌진하여 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다. 이 스킬은 2회 <recast>재사용</recast>할 수 있습니다. 최초 <recast>재사용</recast> 시 기존과 똑같은 효과가 적용되지만, 두 번째에는 다른 효과가 적용됩니다.<br><br><recast>재사용 시</recast>: 리븐이 공중으로 뛰어 오른 후 땅을 내려찍으며 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 주고 주위 적들을 0.75초 동안 <status>공중으로 띄워 올립니다</status>.", // 부러진 날개
        "Q_rules": "<rules>이 스킬은 마지막 사용 시에만 지형을 가로지를 수 있습니다.<br>마우스 커서가 올라가 있는 유닛을 대상으로 삼습니다. 대상이 없으면 리븐이 앞을 향해 돌진합니다.</rules>", // 구분선 아래 회색 글씨
        "W": "리븐의 검에서 룬 에너지가 방출되어 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 {p2}초간 적을 <status>기절</status>시킵니다.", // 기 폭발
        "E": "리븐이 재빨리 돌진한 후 1.5초 동안 지속되는 <shield>{p1}의 보호막</shield>을 얻습니다.", // 용맹
        "E_rules": "<rules>돌격으로 지형을 통과할 수 없습니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "R": [
            "리븐의 검이 정신력으로 충만하여 {p1}초 동안 <physicaldamage>공격력이 {p2}</physicaldamage> 상승하고 공격 스킬과 기본 공격의 사거리가 증가합니다. 활성화된 동안 <recast>재사용</recast>할 수 있습니다.",
            "<recast>재사용 시:</recast> 바람 가르기를 사용해 대상이 잃은 체력에 비례하여 <physicaldamage>{p3}</physicaldamage>~<physicaldamage>{p4}의 물리 피해</physicaldamage>를 입힙니다."
        ], // 추방자의 검
        "R_rules": "<rules>공격 사거리 {p5} 증가</rules>", // 구분선 아래 회색 글씨
    },
    "Lissandra": { // 리산드라
        "P": "리산드라 주변의 적 챔피언은 사망 시 살아있는 적을 쫓는 얼음 노예가 됩니다. 얼음 노예는 근처 적들을 {p1}% <status>둔화</status>시키고, {p2}초 후 폭발하며 <magicdamage>{p3}의 마법 피해</magicdamage>를 입힙니다.", // 냉기의 지배 — stringtable
        "Q": "리산드라가 처음으로 적에게 적중하면 부서지는 얼음창을 던져 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초 동안 {p3}% <status>둔화</status>시킵니다. 대상 뒤의 적들에게도 피해를 입히고 둔화시킵니다.", // 얼음 파편
        "W": "리산드라가 얼음 지대를 생성해 {p1}초 동안 근처 적들을 <status>속박</status>하고 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다.", // 서릿발
        "E": "리산드라가 전방으로 얼음갈퀴를 던져 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. <recast>재사용</recast>하면 얼음갈퀴의 현재 위치로 순간이동합니다.", // 얼음갈퀴 길
        "R": "리산드라가 자신 또는 적 챔피언을 얼음으로 감쌉니다. 적에게 사용하면 {p1}초 동안 <status>기절</status>시키고, 자신에게 사용하면 {p2}초 동안 경직되며 <healing>체력을 {p3}</healing> 회복합니다. 회복량은 잃은 체력 {p4}%당 {p5}%씩 증가합니다.<br><br>그 다음 검은 얼음이 대상에게서 번져나가 <magicdamage>{p6}의 마법 피해</magicdamage>를 입힙니다. 얼음은 {p7}초 동안 유지되며 적들을 {p8}% <status>둔화</status>시킵니다.", // 얼음 무덤
        "R_rules": "<rules>경직 상태에 빠진 유닛은 움직이거나 행동할 수 없으며 대상으로 지정할 수 없는 무적 상태가 됩니다.<br>적을 <status>쓰러뜨리는</status> 스킬입니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Lillia": { // 릴리아
        "P": "릴리아의 스킬이 적에게 <keywordmajor>꿈가루</keywordmajor>를 묻혀 {p1}초 동안 <magicdamage>최대 체력의 {p2}에 해당하는 마법 피해</magicdamage>를 입힙니다. 대상이 대형 정글 몬스터인 경우 릴리아가 지속시간 동안 <healing>{p3}의 체력</healing>을 회복하며, 대상이 챔피언인 경우 <healing>{p4}의 체력</healing>을 회복합니다.", // 꿈나무 지팡이 — stringtable
        "Q": "<passive>기본 지속 효과:</passive> 릴리아의 스킬이 적중하면 {p1}초 동안 <speed>이동 속도가 {p2}</speed> 증가합니다. 이 효과는 최대 {p3}회 중첩됩니다.<br><br><active>사용 시:</active> 릴리아가 지팡이를 휘둘러 <magicdamage>{p4}의 마법 피해</magicdamage>를 입힙니다. 가장자리에 있는 적에게 <truedamage>{p5}의 고정 피해</truedamage>를 추가로 입힙니다.", // 뾰로롱 강타
        "W": "릴리아가 힘을 모은 후 강력한 일격을 가해 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. 중심에 있는 적은 <magicdamage>{p2}의 피해</magicdamage>를 입습니다.", // 이익! 쿵!
        "W_rules": "<rules>릴리아는 이 스킬로 지형을 통과할 수 없습니다.</rules><br><rules>미니언에게는 50%의 피해만 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "E": "릴리아가 데굴데굴 씨앗을 날려 적중한 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 적의 모습을 드러내며 {p2}초 동안 {p3}% <status>둔화</status>시킵니다. 씨앗은 적 또는 지형에 부딪힐 때까지 굴러갑니다.", // 데굴데굴 씨앗
        "R": "릴리아가 <keywordmajor>꿈가루</keywordmajor>가 묻은 적 챔피언을 {p1}초 동안 전부 <status>졸음</status> 상태에 빠뜨립니다. 이후 해당 적은 {p2}초 동안 <status>수면</status> 상태에 빠집니다.<br><br>피해를 입어 깨어나면 <magicdamage>{p3}의 마법 피해</magicdamage>를 추가로 입습니다.", // 감미로운 자장가
        "R_rules": "<rules>졸음 상태에 빠진 유닛은 지속시간에 걸쳐 둔화되며 이후 수면 상태에 빠집니다.<br>수면 상태에 빠진 유닛은 적에게서 단발성 피해를 입을 때까지 움직이거나 행동할 수 없습니다.</rules>", // 구분선 아래 회색 글씨
    },
    "MasterYi": { // 마스터 이
        "P": "매 {p1}번째 기본 공격마다 마스터 이가 2번 연속 공격합니다. 연속 공격의 두 번째 공격은 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입힙니다.", // 2연속 공격 — stringtable
        "Q": "마스터 이가 대상으로 지정할 수 없는 상태가 되어 순간이동한 후 대상 주변 적들을 순식간에 공격합니다. 공격이 {p1}회 적중한 후 적중하는 모든 공격은 적에게 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입힙니다. <br><br>이 스킬은 다른 대상이 없으면 같은 적을 연속으로 공격하며 추가 타격으로 {p3}%(<physicaldamage>{p4}</physicaldamage>)의 피해를 입힙니다. 단일 대상은 최대 <physicaldamage>{p5}의 물리 피해</physicaldamage>를 입습니다.", // 일격 필살
        "Q_rules": "<rules>피해량 {p6}%의 <onhit>적중 시</onhit> 효과를 적용합니다. 추가 타격은 이 수치의 {p3}%만큼 적중 시 효과를 적용합니다.<br>치명타가 적용될 수 있으며 이 경우에는 <physicaldamage>{p7}의 물리 피해</physicaldamage>를 추가로 입힙니다. 추가 타격은 이 수치의 {p3}%에 해당하는 피해를 입힙니다. (단일 대상 최대 피해량 <physicaldamage>{p8}</physicaldamage>)<br>정글 몬스터에게는 타격당 {p9}의 추가 피해를 입힙니다.<br>기본 공격 시 스킬의 재사용 대기시간이 {p10}초 감소합니다.<br><spellname>일격 필살</spellname>을 통한 타격으로는 이 스킬의 재사용 대기시간이 줄어들거나 <spellname>2연속 공격의 </spellname> <onhit>적중 시</onhit> 효과가 중첩되지 않습니다.<br>공격이 끝나면 처음 지정한 대상 주변에 다시 나타납니다.</rules><br>", // 구분선 아래 회색 글씨
        "W": "마스터 이가 정신을 집중해 {p1}초 동안 <healing>{p2}의 체력</healing>을 회복합니다. 회복량은 마스터 이가 잃은 체력에 비례해 최대 {p3}%까지 증가합니다.<br><br>정신을 집중하고 이후 {p4}초까지 마스터 이가 입는 피해량이 {p5} 감소합니다. {p6}초가 지나면 {p7}%까지 감소합니다.", // 명상
        "W_rules": "<rules><spellname>2연속 공격</spellname> 중첩을 얻습니다.<br>피해량 감소 효과가 포탑 상대로는 절반으로 감소합니다.</rules>", // 구분선 아래 회색 글씨
        "E": "마스터 이의 기본 공격이 {p1}초 동안 <truedamage>{p2}의 고정 피해</truedamage>를 추가로 입힙니다.", // 우주류 검술
        "E_rules": "<rules><spellname>일격 필살</spellname>과 <spellname>명상</spellname> 사용 중에는 <spellname>우주류 검술</spellname>의 지속시간이 줄어들지 않습니다.</rules>", // 구분선 아래 회색 글씨
        "R": "<passive>기본 지속 효과:</passive> 챔피언 처치 관여 시 기본 스킬의 남은 재사용 대기시간이 {p1}% 감소합니다.<br><br><active>사용 시:</active> 마스터 이가 무아지경에 빠져 {p2}초 동안 <speed>이동 속도 {p3}%</speed>, <attackspeed>공격 속도 {p4}%</attackspeed>를 얻고 <status>둔화</status> 효과에 면역됩니다. 챔피언 처치 관여 시 스킬 지속시간이 {p5}초 늘어납니다.", // 최후의 전사
        "R_rules": "<rules><spellname>일격 필살</spellname>과 <spellname>명상</spellname> 사용 중에는 <spellname>최후의 전사</spellname>의 지속시간이 줄어들지 않습니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Maokai": { // 마오카이
        "P": "마오카이가 다음 기본 공격으로 <healing>체력을 {p1}</healing> 회복합니다.<br><br>스킬을 사용하거나 적 챔피언의 스킬에 맞으면 재사용 대기시간이 {p2}초 감소합니다. 대형 몬스터나 에픽 몬스터의 공격이나 스킬을 맞으면 재사용 대기시간이 {p3}초 감소합니다.", // 마법 흡수 — stringtable
        "Q": "마오카이가 지면을 주먹으로 내리쳐 <magicdamage>{p1}+최대 체력의 {p2}%에 해당하는 마법 피해</magicdamage>를 입히고 적들을 잠시 <status>둔화</status>시킵니다. 주변 적들은 <status>뒤로 밀려납니다</status>.", // 덤불 주먹
        "Q_rules": "<rules>정글 몬스터에게 추가로 <magicdamage>{p3}의 마법 피해</magicdamage>를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "W": "마오카이가 움직이는 뿌리 덩어리로 변신해 대상에게 돌진합니다. 이때 마오카이는 대상으로 지정할 수 없습니다. 적에게 부딪히면 {p1}초간 대상을 <status>속박</status>하고 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다.", // 뒤틀린 전진
        "E": "마오카이가 {p1}초 동안 주변을 감시하는 묘목을 던집니다. 묘목은 근처 적을 추격해 접근 시 폭발하며 <magicdamage>{p2}의 마법 피해</magicdamage>를 입히고 주변 적들을 {p3}초간 {p4}% <status>둔화</status>시킵니다. 묘목이 적 챔피언이나 에픽 몬스터를 맞히면 <keywordmajor>마법 흡수</keywordmajor>의 재사용 대기시간이 추가로 4초 감소합니다.<br><br>수풀에 설치된 묘목은 {p5}초간 유지되며 더 큰 폭발을 일으켜 <magicdamage>{p6}의 마법 피해</magicdamage>를 {p7}초에 걸쳐 입히고 적들을 {p8} <status>둔화</status>시킵니다.", // 묘목 던지기
        "E_rules": "<rules>묘목이 {p9}의 이동 속도로 달립니다. 수풀에 설치된 묘목도 미니언에게는 보통 묘목과 같은 양의 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "R": "마오카이가 나뭇가지와 가시로 된 거대한 벽을 소환합니다. 벽은 이동한 거리에 비례해 {p1}~{p2}초간 적들을 <status>속박</status>하고 <magicdamage>{p3}의 마법 피해</magicdamage>를 입힙니다. 벽이 적 챔피언에게 부딪히면 마오카이의 <speed>이동 속도가 {p4}%</speed> 증가했다 {p5}초에 걸쳐 원래대로 돌아옵니다.", // 대자연의 마수
    },
    "Malzahar": { // 말자하
        "P": "피해를 입거나 군중 제어기에 적중당하면 {p1}초 동안 받는 피해량이 {p2}% 감소하고, <status>방해</status> 및 <status>이동 불가</status>에 면역됩니다. 이 효과는 {p3}초 후 다시 활성화됩니다.", // 공허 태세 — stringtable
        "Q": "말자하가 공허로 이어지는 두 개의 문을 엽니다. 두 개의 문 사이로 공허의 파동이 발사되어 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초 동안 <status>침묵</status>시킵니다.", // 공허의 부름
        "W": "<passive>기본 지속 효과:</passive> 말자하가 다른 스킬을 사용하면 중첩을 1회 얻습니다. (최대 {p1})<br><br><active>사용 시:</active> 말자하가 공허충을 한 마리 소환하며, 중첩당 소환되는 공허충의 수가 늘어납니다. 공허충은 {p2}초 동안 유지되며 공격할 때마다 <magicdamage>{p3}의 마법 피해</magicdamage>를 추가로 입힙니다.", // 공허의 무리
        "W_rules": "<rules>공허충은 <spellname>재앙의 환상</spellname> 효과가 적용된 공격로 미니언에게 {p4}%의 피해를 입힙니다.<br>공허충은 에픽 몬스터에게 {p5}%의 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "E": "말자하가 끔찍한 환각을 통해 {p1}초 동안 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다. 이 동안 대상에게 <spellname>공허의 부름</spellname>이나 <spellname>황천의 손아귀</spellname>를 사용하면 환상의 지속시간이 초기화됩니다.<br><br>대상이 죽으면 말자하는 <scalemana>{p3}의 마나</scalemana>를 얻고 환상은 가장 가까이 있는 적에게 옮겨갑니다.<br><br><rules>재앙의 환상은 체력이 {p4} 밑으로 떨어진 미니언을 처형합니다.</rules>", // 재앙의 환상
        "R": "말자하가 적 챔피언을 <status>제압</status>해 {p1}초 동안 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다. 대상 주변에는 {p3}초 동안 유지되며 <magicdamage>최대 체력의 {p4}에 해당하는 마법 피해</magicdamage>를 입히는 황천의 지대가 생성됩니다.", // 황천의 손아귀
        "R_rules": "<rules>적을 <status>쓰러뜨리는</status> 스킬입니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Malphite": { // 말파이트
        "P": "말파이트가 {p1}초 동안 피해를 입지 않으면 <shield>{p2}의 피해를 흡수하는 보호막</shield>을 얻습니다.", // 화강암 방패 — stringtable
        "Q": "말파이트가 대지의 조각을 날려 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히며 {p2}초 동안 {p3}% <status>둔화</status>시킵니다. 말파이트는 {p2}초 동안 대상의 <speed>이동 속도</speed>도 <status>둔화</status>된 만큼 훔칩니다.", // 지진의 파편
        "W": "<passive>기본 지속 효과: </passive>말파이트가 <scalearmor>{p1}%의 방어력({p2})</scalearmor>을 얻습니다. 이 효과는 <spellname>화강암 방패</spellname>가 활성화된 동안 <scalearmor>{p3}%({p4})</scalearmor>까지 증가합니다.<br><br><passive>사용 시: </passive>말파이트의 다음 기본 공격 <onhit>적중 시</onhit> 추가로 <physicaldamage>{p5}의 물리 피해</physicaldamage>를 입히고 여진을 생성해 해당 방향에 <physicaldamage>{p6}의 물리 피해</physicaldamage>를 입힙니다. 다음 {p7}초 동안 기본 공격 <onhit>적중 시</onhit> 여진이 생성됩니다.", // 천둥소리
        "W_rules": "<rules>정글 몬스터에게는 {p8}%의 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "E": "말파이트가 바닥을 내려쳐 주변 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초 동안 적들의 <attackspeed>공격 속도를 {p3}%</attackspeed> 감소시킵니다.", // 지면 강타
        "R": "말파이트가 산사태와 같은 힘으로 돌진하며 저지 불가 상태가 됩니다. 돌진이 끝나면 말파이트가 {p1}초 동안 대상을 <status>공중으로 띄워 올리고</status> <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다.", // 멈출 수 없는 힘
    },
    "Mel": { // 멜
        "P": "멜이 기본 공격과 스킬로 피해를 입힐 때마다 {p1}초 동안 <keywordmajor>압도</keywordmajor> 중첩을 적용하고 초기화하여 <magicdamage>{p2}+중첩당 {p3}의 마법 피해</magicdamage>를 비축합니다. 적용 시, 비축한 피해량이 적의 보호막과 체력을 합친 것보다 크면 적이 처형됩니다.<br><br>스킬을 사용하면 멜이 다음 기본 공격 시 {p4}개의 추가 투사체를 발사하며 개당 <magicdamage>{p5}의 마법 피해</magicdamage>를 입힙니다. 이 효과로 추가할 수 있는 투사체는 최대 {p6}개입니다.", // 이글거리는 광휘 — stringtable
        "Q": "멜이 대상 지점 주위에 폭발하는 투사체 {p1}개를 퍼붓습니다.<br><br>첫 번째 폭발은 <magicdamage>{p2}의 마법 피해</magicdamage>를, 이후 각 폭발은 <magicdamage>{p3}의 마법 피해</magicdamage>를 입히며, 모두 합쳐 최대 <magicdamage>{p4}의 마법 피해</magicdamage>를 입힙니다.", // 빛의 세례
        "W": "멜이 자신을 방어막으로 감싸 적 챔피언이 날리는 투사체를 반사하고 {p1}초 동안 <shield>{p2}의 보호막</shield>을 얻으며 {p3}초 동안 <speed>이동 속도가 {p4}% 증가했다가 점차 감소</speed>합니다.<br><br>반사된 투사체는 <magicdamage>최초 피해량의 {p5}에 해당하는 마법 피해</magicdamage>를 입힙니다.", // 반박
        "W_rules": "<rules>반사된 투사체의 피해량은 피해량 조정과 마법 관통력이 적용되기 전 원래 사용자의 능력치를 기준으로 계산됩니다.<br><physicaldamage>물리 피해</physicaldamage>는 마법 피해로 전환될 때 피해량이 {p6}% 감소합니다.<br>원래 사용자의 아이템 효과는 적용되지 않습니다.<br>범위 내 각 적을 대상으로 하는 투사체는 반사되지 않고 파괴됩니다.</rules>", // 구분선 아래 회색 글씨
        "E": "멜이 찬란한 구체를 발사하여 중심에 있는 적을 {p1}초 동안 <status>속박</status>하고 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다.<br><br>구체는 그 주변에 적대적 영역을 형성하여 적을 {p3}% <status>둔화</status>시키고 <magicdamage>초당 {p4}의 마법 피해</magicdamage>를 입힙니다.", // 태양 올가미
        "E_rules": "<rules>둔화와 지속 피해 효과는 적이 구체가 생성한 영역을 떠난 후에도 짧은 시간 동안 남습니다.<br>미니언에게 사용하면 피해가 {p5} 감소합니다.</rules>", // 구분선 아래 회색 글씨
        "R": "<passive>기본 지속 효과</passive>: <keywordmajor>압도</keywordmajor> 피해가 <magicdamage>{p1}의 마법 피해+중첩당 {p2}의 마법 피해</magicdamage>까지 증가합니다.<br><br><active>사용 시</active>: 멜이 <keywordmajor>압도</keywordmajor>의 영향을 받는 모든 적에게 힘을 방출하여 <magicdamage>{p3}의 마법 피해+<keywordmajor>압도</keywordmajor> 중첩당 {p4}의 마법 피해</magicdamage>를 입힙니다.<br><br><rules>적 챔피언이 <keywordmajor>압도</keywordmajor>의 영향을 받고 있을 때만 사용할 수 있습니다.</rules>", // 황금 일식
    },
    "Mordekaiser": { // 모데카이저
        "P": "모데카이저의 기본 공격이 <magicdamage>{p1}의 마법 피해</magicdamage>를 추가로 입힙니다.<br><br>모데카이저가 적 챔피언이나 정글 몬스터에게 기본 스킬 또는 기본 공격을 3회 가하면 사악한 에너지로 자신을 감쌉니다. 이 에너지는 주변에 초당 <magicdamage>{p2}+최대 체력의 {p3}%에 해당하는 마법 피해</magicdamage>를 입히고 모데카이저의 <speed>이동 속도를 {p4}</speed> 증가시킵니다.", // 암흑 탄생 — stringtable
        "Q": "모데카이저가 몰락의 밤으로 땅을 내리쳐 해당 지역에 있는 모든 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히며, 단일 대상 적중 시 피해량이 <magicdamage>{p2}</magicdamage>까지 증가합니다.", // 말살
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "W": [
            "<passive>기본 지속 효과:</passive> 모데카이저가 입히는 피해의 {p1}%, 받는 피해의 {p2}%를 축적합니다.",
            "<active>사용 시:</active> 모데카이저가 축적한 피해를 <shield>보호막</shield>으로 전환합니다. 스킬을 <recast>재사용</recast>하면 <healing>남은 보호막의 {p3}%만큼 체력을 회복</healing>합니다.<br><br>최소 보호막 흡수량: <shield>{p4}</shield><br>최대 보호막 흡수량: <shield>{p5}</shield>"
        ], // 불멸
        "W_rules": "<rules>보호막 흡수량은 시간이 지남에 따라 감소합니다.<br>챔피언이 아닌 유닛으로부터 받는 피해는 75% 감소된 양만 흡수합니다.</rules>", // 구분선 아래 회색 글씨
        "E": "<passive>기본 지속 효과:</passive> 모데카이저가 <magicpen>{p1}%의 마법 관통력</magicpen>을 얻습니다.<br><br><active>사용 시:</active> 적들을 자신 쪽으로 끌어당겨 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다.", // 죽음의 손아귀
        "R": "모데카이저가 챔피언 하나를 {p1}초 동안 죽음의 세계로 추방해 지속시간 동안 대상이 지닌 주요 능력치들의 {p2}%를 훔칩니다.<br><br>모데카이저가 죽음의 세계에서 적을 처치하면 영혼을 흡수하여 대상이 부활할 때까지 훔친 능력치를 유지합니다.", // 죽음의 세계
        "R_rules": "<rules>훔칠 수 있는 주요 능력치: <scaleap>주문력</scaleap>, <scalead>공격력</scalead>, <attackspeed>공격 속도</attackspeed>, <scalearmor>방어력</scalearmor>, <scalemr>마법 저항력</scalemr>, <scalehealth>최대 체력</scalehealth></rules>", // 구분선 아래 회색 글씨
    },
    "Morgana": { // 모르가나
        "P": "모르가나가 스킬로 챔피언, 대형 미니언, 중형 및 대형 정글 몬스터에게 피해를 입히면 피해량의 <healing>{p1}%만큼 체력을 회복</healing>합니다.", // 영혼 흡수 — stringtable
        "Q": "모르가나가 별의 화염이 깃든 에너지를 발사하여 첫 번째로 명중한 대상을 {p1}초 동안 <status>속박</status>하고 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다.", // 어둠의 속박
        "W": "모르가나가 {p1}초 동안 대상 지역을 불태워 매초 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다. 피해는 대상이 잃은 체력에 비례해 최대 <magicdamage>{p3}</magicdamage>까지 증가합니다.<br><br>이 스킬의 재사용 대기시간은 모르가나가 <spellname>영혼 흡수</spellname>로 체력을 회복할 때마다 {p4}%씩 감소합니다.", // 고통의 그림자
        "W_rules": "<rules>이 스킬은 정글 몬스터에게 {p5}%의 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "E": "모르가나가 아군 챔피언에게 {p1}초 동안 <shield>{p2}의 마법 피해를 흡수하는 보호막</shield>을 씌웁니다. 보호막이 유지되는 동안 <status>방해</status> 및 <status>이동 불가</status> 효과에 면역됩니다.", // 칠흑의 방패
        "R": "모르가나가 자신과 주변 적 챔피언을 사슬로 묶어 대상에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}% <status>둔화</status>시킵니다. {p3}초가 지난 후 사슬을 벗어나지 못한 적은 추가로 <magicdamage>{p1}의 마법 피해</magicdamage>를 입고 {p4}초 동안 <status>기절</status>합니다.<br><br>이 스킬을 사용하는 동안 모르가나의 이동 속도가 <speed>{p5}%</speed> 증가합니다.", // 영혼의 족쇄
        "R_rules": "<rules>모르가나는 이 스킬에 걸린 모든 적에 대해 <keywordstealth>절대 시야</keywordstealth>를 얻습니다.</rules>", // 구분선 아래 회색 글씨
    },
    "DrMundo": { // 문도 박사
        "P": "문도 박사가 처음 적중하는 <status>이동 불가</status> 효과에 저항하며, <healing>현재 체력의 {p1}%</healing>를 잃고 {p2}초 동안 근처에 화학 물질이 든 통을 떨어뜨립니다. 그 위로 이동하면 이 스킬의 재사용 대기시간이 {p3}초 감소하고 <healing>최대 체력의 {p4}%</healing>만큼 체력을 회복합니다. 적 챔피언이 통 위로 이동하면 통이 파괴됩니다.<br><br>문도 박사가 5초마다 <healing>최대 체력의 {p5}</healing>만큼 체력을 회복합니다.", // 가고 싶은 데로 간다 — stringtable
        "Q": "문도 박사가 뼈톱을 던져 처음 맞는 적에게 <magicdamage>적 현재 체력의 {p1}%에 해당하는 마법 피해</magicdamage>를 입히고 {p2}초 동안 {p3}% <status>둔화</status>시킵니다.<br><br>뼈톱이 챔피언이나 몬스터에게 적중하면 문도 박사가 <healing>{p4}의 체력</healing>을 회복합니다. 챔피언 또는 몬스터가 아닌 대상에게 적중하면 <healing>{p5}의 체력</healing>을 회복합니다.", // 오염된 뼈톱
        "Q_rules": "<rules>최소 <magicdamage>{p6}의 마법 피해</magicdamage>를 입히고, 정글 몬스터에게는 최대 <magicdamage>{p7}의 마법 피해</magicdamage>를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "W": [
            "문도 박사가 제세동기를 충전하여 주변 적에게 최대 {p1}초까지 초당 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다. 추가로 첫 {p3}초 동안에는 입는 피해의 {p4}를, 남은 지속시간에는 입는 피해의 {p5}%를 회색 체력으로 저장하고 <recast>재사용</recast>할 수 있습니다.",
            "<recast>재사용 시:</recast> 제세동기가 폭발하여 주변 적에게 <magicdamage>{p6}의 마법 피해</magicdamage>를 입힙니다. 챔피언에게 적중하면 문도 박사가 <healing>회색 체력의 {p7}%</healing>를 회복하며 그렇지 않으면 <healing>회색 체력의 {p8}%</healing>를 회복합니다."
        ], // 심장 전기 충격
        "E": "<passive>기본 지속 효과:</passive> 문도 박사가 <physicaldamage>{p1}의 공격력</physicaldamage>을 얻습니다.<br><br><active>사용 시:</active> 문도 박사가 왕진 가방을 맹렬하게 휘둘러 다음 공격 시 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 추가로 입힙니다. 이 수치는 문도 박사가 잃은 체력에 비례하여 최대 {p3}까지 증가합니다. 이때 처치된 적은 밀려나며 지나치는 적에게 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입힙니다.", // 둔기에 의한 외상
        "E_rules": "<rules>기본 지속 효과 보너스는 잃은 체력의 {p4}%에서 최대치에 도달합니다.<br>미니언에게는 {p5}%의 피해를 입힙니다. 정글 몬스터에게는 {p6}%의 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "R": "문도 박사가 화학 물질을 투여하여 <healing>잃은 체력의 {p1}%를 최대 체력</healing>으로, <speed>{p2}%의 이동 속도</speed>를 얻고 {p3}초에 걸쳐 <healing>최대 체력의 {p4}%</healing>만큼 체력을 회복합니다.<br><br>스킬 레벨이 3이 되면 근처에 있는 적 챔피언 하나당 두 회복 효과 모두 {p5}%씩 추가로 증가합니다.", // 최대 투여량
    },
    "MissFortune": { // 미스 포츈
        "P": "미스 포츈이 새로운 대상에게 기본 공격을 가하면 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 추가로 입힙니다. <br><br><spellname>사랑의 한 방</spellname> 효과 발동 시 <spellname>활보</spellname> 스킬의 재사용 대기시간이 {p2}초 감소합니다.", // 사랑의 한 방 — stringtable
        "Q": "미스 포츈이 튕기는 총알을 발사하여 적 하나와 그 뒤에 있는 다른 적에게 각각 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다. <br><br>두 번째 대상에게는 치명타를 입힐 수 있으며, 치명타 적용 시 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입힙니다. 첫 번째 대상을 처치했을 경우 두 번째 대상에게는 항상 치명타가 적용됩니다.", // 한 발에 두 놈
        "Q_rules": "<rules>두 번 모두 적중 시 효과가 적용됩니다.</rules>", // 구분선 아래 회색 글씨
        "W": "<passive>기본 지속 효과:</passive> {p1}초간 피해를 받지 않으면 미스 포츈의 <speed>이동 속도가 {p2}</speed> 증가합니다. 다음 {p3}초간 피해를 입지 않으면 <speed>이동 속도가 {p4}</speed>까지 증가합니다.<br><br><active>사용 시:</active> <speed>이동 속도</speed> 증가 효과를 최대로 얻고 {p5}초 동안 <attackspeed>공격 속도가 {p6}%</attackspeed> 상승합니다.<br><br><spellname>사랑의 한 방</spellname> 발동 시 이 스킬의 재사용 대기시간이 {p7}초 줄어듭니다.", // 활보
        "E": "미스 포츈이 지정 지역에 총알을 퍼부어 {p1}초간 시야를 밝히고 적을 {p2}만큼 <status>둔화</status>시키며 매초 <magicdamage>{p3}의 마법 피해</magicdamage>를 입힙니다. (총 <magicdamage>{p4}의 마법 피해</magicdamage>)", // 총알은 비를 타고
        "R": "미스 포츈이 {p1}초 동안 정신 집중 상태로 총을 {p2}회 난사해 공격 한 차례에 <physicaldamage>{p3}의 물리 피해</physicaldamage>를 입힙니다. (총 <physicaldamage>{p4}의 물리 피해</physicaldamage>)<br><br>매회 발사 시 치명타가 적용될 수 있으며 치명타 적용 시 각각 <physicaldamage>{p5}의 물리 피해</physicaldamage>를 입힙니다.", // 쌍권총 난사
    },
    "Milio": { // 밀리오
        "P": "밀리오의 스킬에 닿은 아군 챔피언의 다음 기본 공격 또는 스킬이 <physicaldamage>아군 공격력의 {p1}</physicaldamage>에 해당하는 추가 <magicdamage>마법 피해</magicdamage>를 입히며, {p2}초 동안 <magicdamage>{p3}의 마법 피해</magicdamage>를 입힙니다.", // 타오르는 힘 — stringtable
        "Q": "밀리오가 불꽃 공을 걷어차 처음으로 맞힌 적을 <status>밀어냅니다</status>. 적중한 공은 적들 사이를 튕기며 폭발해 주변 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초 동안 {p3} <status>둔화</status>시킵니다.<br><br><spellname>초특급 불꽃 킥</spellname> 스킬을 한 명 이상의 적 챔피언에게 적중시키면 소모한 마나의 {p4}%를 돌려받습니다.", // 초특급 불꽃 킥
        "Q_rules": "<rules>미니언과 몬스터가 더 멀리 밀려나고 더 큰 폭발을 일으킵니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "W": [
            "밀리오가 {p1}초 동안 아군 챔피언을 따라가는 온기를 생성합니다. 지속시간 동안 근처 아군 챔피언의 공격 사거리가 {p2} 증가하고 <healing>{p3}의 체력</healing>을 회복합니다. 또한, 온기는 {p4}초마다 <spellname>타오르는 힘</spellname> 효과를 적용합니다.",
            "<recast>재사용 시:</recast> 온기가 따라가는 아군을 변경합니다."
        ], // 아늑한 모닥불
        "E": "밀리오가 아군 챔피언을 보호의 불길로 감싸 <shield>{p1}의 피해를 흡수하는 보호막</shield>을 부여하고 {p2}초 동안 <speed>이동 속도를 {p3}%</speed> 증가시킵니다.<br><br>이 스킬은 2회까지 충전되고 동일 대상에게 효과가 중첩됩니다.", // 따스한 포옹
        "R": "밀리오가 근처 아군 챔피언에게 치유의 불꽃을 보내 <status>방해</status> 및 <status>이동 불가</status> 효과를 정화하고 <healing>{p1}의 체력</healing>을 회복시키며 {p2}초 동안 {p3}% 강인함을 부여합니다.", // 생명의 온기
        "R_rules": "<rules><status>공중에 뜸</status> 상태는 정화할 수 없습니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Bard": { // 바드
        "P": "바드가 맵에서 무작위로 <font color='#cccc00'>고대의 종</font>을 끌어모읍니다. 바드가 <font color='#cccc00'>고대의 종</font> 근처로 이동하면 종을 모으며 경험치가 {p1} 증가하고 <scalemana>최대 마나의 {p2}%</scalemana>를 회복합니다. {p3}초 동안 전투에서 벗어나 있으면 <speed>이동 속도가 {p4}%</speed> 증가합니다. (최대 {p5}회 중첩)<br><br><font color='#FF9900'>정령</font>은 {p6}초마다 생성되며 최대 {p7}마리까지 생성됩니다. 바드의 기본 공격은 <font color='#FF9900'>정령</font>을 소모해 <magicdamage>{p8}+<font color='#cccc00'>고대의 종</font> {p9}개당 {p10}에 해당하는 마법 피해</magicdamage>를 추가로 입히며 수집한 <font color='#cccc00'>고대의 종</font>에 비례해 추가 효과를 적용합니다.", // 방랑자의 부름 — stringtable
        "Q": "바드가 에너지 광선을 직선으로 발사해 처음 적중하는 적 둘에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. 처음 적중한 대상은 {p2}초간 {p3}% <status>둔화</status>됩니다.<br><br>광선이 두 번째 대상이나 벽을 맞히면 적중당한 모든 적이 {p4}초간 <status>기절</status>합니다.<br>", // 우주의 결속
        "W": "바드가 체력 회복 성소를 생성해, 처음 들어온 아군에게 {p1}초에 걸쳐 사라지는 <speed>{p2}의 이동 속도</speed>를 부여하고 최소 <healing>{p3}의 체력</healing>을 회복시킵니다. 성소의 체력 회복 효과는 점차 증가해, {p4}초 이후에는 최대 <healing>{p5}의 체력</healing>을 회복시킬 수 있습니다.<br><br>바드는 한 번에 최대 {p6}개의 성소를 세울 수 있습니다. 성소는 적 챔피언이 들어오면 파괴됩니다.<br><br>이 스킬은 {p7}회까지 충전됩니다.", // 수호자의 성소 — 끝의 "현재 활성화된 성소: {p8}/{p9}" 제거 (현재 상태값)
        "E": "바드가 지형을 통과하는 일방통행 차원문을 {p1}초 동안 엽니다. 모든 챔피언은 입구 근처에서 차원문으로 이동하여 들어갈 수 있습니다.", // 신비한 차원문
        "E_rules": "<rules>아군이 적보다 {p2}% 빠르게 이동합니다.</rules>", // 구분선 아래 회색 글씨
        "R": "바드가 지정한 지역에 마법의 보호 에너지를 던집니다. 적중한 모든 유닛과 구조물은 {p1}초 동안 경직 상태가 됩니다.", // 운명의 소용돌이
        "R_rules": "<rules>경직 상태에 빠진 유닛은 움직이거나 행동할 수 없으며 대상으로 지정할 수 없는 무적 상태가 됩니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Varus": { // 바루스
        "P": "바루스가 적을 처치하면 {p1}초간 <attackspeed>공격 속도가 {p2}</attackspeed>, <scalead>공격력이 {p3}</scalead>, <scaleap>주문력이 {p4}</scaleap> 상승합니다.<br><br>챔피언 처치 관여 시 <attackspeed>공격 속도가 {p5}</attackspeed> (최고 공격 속도 제한을 초과할 수 있음), <scalead>공격력이 {p6}</scalead>, <scaleap>주문력이 {p7}</scaleap> 상승합니다.", // 죽지 않는 복수심 — stringtable
        "Q": "<attention>충전 시작 시:</attention> 바루스가 다음 화살을 조준하며 {p1}% <status>둔화</status>됩니다. {p2}초가 경과한 후 쏘지 않으면 바루스가 스킬을 취소하고 소모한 마나의 {p3}%를 돌려받습니다.<br><br><attention>발사 시:</attention> 바루스가 화살을 발사하여 <physicaldamage>{p4}의 물리 피해</physicaldamage>를 입힙니다. 관통당한 적 하나당 {p5}%씩 피해량이 감소합니다. (최소 {p6}%) 피해량과 <keywordmajor>역병</keywordmajor> 폭발 효과는 충전 시간에 비례해 최대 {p7}%까지 증가합니다. (최대 <physicaldamage>{p8}</physicaldamage>)", // 꿰뚫는 화살
        "W": "<passive>기본 지속 효과: </passive>바루스의 기본 공격이 <magicdamage>{p1}의 마법 피해</magicdamage>를 추가로 입히고 {p2}초 동안 <keywordmajor>역병</keywordmajor> 중첩을 적용합니다. (최대 {p3}회 중첩)<br><br>바루스가 다른 스킬을 사용해 <keywordmajor>역병</keywordmajor> 중첩을 폭발시키면 중첩 횟수당 <magicdamage>최대 체력의 {p4}에 해당하는 마법 피해</magicdamage>를 입힙니다. (최대 피해량: <magicdamage>최대 체력의 {p5}</magicdamage>) 챔피언과 에픽 몬스터를 대상으로 <keywordmajor>역병</keywordmajor>을 폭발시키면 기본 스킬의 재사용 대기시간이 중첩 횟수당 최대 재사용 대기시간의 {p6}%만큼 감소합니다.<br><br><active>사용 시:</active> 다음 <spellname>꿰뚫는 화살</spellname> 스킬이 <magicdamage>잃은 체력의 {p7}에 해당하는 마법 피해</magicdamage>를 추가로 입힙니다. 피해량은 충전 시간에 비례하여 <magicdamage>잃은 체력의 {p8}</magicdamage>까지 증가합니다.", // 역병 화살
        "W_rules": "<rules><keywordmajor>역병</keywordmajor> 폭발로 인한 기본 지속 효과 피해량은 정글 몬스터에게 중첩당 최대 {p9}의 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "E": "바루스가 화살을 비처럼 쏟아부어 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 {p2}초 동안 지면을 오염시켜 적을 {p3}% <status>둔화</status>시키며 {p4}%의 고통스러운 상처를 남깁니다.", // 퍼붓는 화살
        "E_rules": "<rules>고통스러운 상처는 치유 및 회복 효과를 감소시킵니다.</rules>", // 구분선 아래 회색 글씨
        "R": "바루스가 부패의 촉수를 발사해 처음 맞은 챔피언을 {p1}초 동안 <status>속박</status>하고 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다. <status>속박</status>된 적은 지속시간에 걸쳐 <keywordmajor>역병</keywordmajor> 중첩이 {p3}회 쌓입니다.<br><br>촉수는 대상으로부터 감염되지 않은 적 챔피언에게 뻗어 나가, 닿은 적에게 동일한 양의 피해를 입히고 <status>속박</status>합니다.", // 부패의 사슬
    },
    "Vi": { // 바이
        "P": "바이가 스킬을 적이나 구조물에 맞히면 {p1}초 동안 <shield>{p2}의 피해를 흡수하는 보호막</shield>을 얻습니다.", // 폭발 보호막 — stringtable
        "Q": "<charge>충전 시작:</charge> 바이가 강력한 한 방을 충전하며 {p1}% <status>둔화</status>됩니다.<br><br><release>돌진:</release> 바이가 전방으로 돌진하며 부딪친 모든 적에게 충전 시간에 비례해 <physicaldamage>{p2}~{p3}의 물리 피해</physicaldamage>를 입히고 <spellname>찌그러뜨리기</spellname> 효과를 적용합니다. 적 챔피언과 충돌하면 멈추면서 적을 <status>뒤로</status> <status>밀어냅니다</status>.", // 금고 부수기
        "Q_rules": "<rules>챔피언이 아닌 적은 적중 시 바이 쪽으로 끌어당겨집니다.<br>충전 중에 방해를 받으면 3초의 재사용 대기시간이 적용됩니다.</rules>", // 구분선 아래 회색 글씨
        "W": "<passive>기본 지속 효과:</passive> 같은 대상에게 기본 공격을 3번 가할 때마다 대상 <physicaldamage>최대 체력의 {p1}에 해당하는 물리 피해</physicaldamage>를 추가로 입히고 {p2}초간 대상의 <scalearmor>방어력을 {p3}%</scalearmor> 낮추며 바이의 <attackspeed>공격 속도가 {p4}%</attackspeed> 상승합니다. 또한 <spellname>폭발 보호막</spellname>의 재사용 대기시간이 {p5}초 감소합니다.", // 찌그러뜨리기
        "W_rules": "<rules>정글 몬스터를 대상으로는 최대 <physicaldamage>{p6}의 피해</physicaldamage>를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "E": "바이의 다음 기본 공격이 대상과 그 뒤의 적들에게 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다.<br><br>이 스킬은 2회까지 충전됩니다. ({p2}초마다 충전)", // 끈질긴 힘
        "R": "바이가 적 챔피언 한 명을 추격하면서 위치를 드러냅니다. 추격 중인 바이는 멈출 수 없으며, 닿는 순간 {p1}초 동안 <status>공중으로</status> <status>띄워 올리고</status> <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입힙니다.<br><br>중간에 바이와 부딪히는 적들은 옆으로 밀려나며 피해를 입고, {p3}초 동안 <status>기절</status>합니다.", // 정지 명령
    },
    "Veigar": { // 베이가
        "P": "베이가는 적 챔피언에게 스킬을 적중시킬 때마다 <keywordmajor>극악</keywordmajor> {p1}중첩을 얻습니다. 챔피언 처치 관여 시 극악 중첩이 {p2} 쌓입니다.<br><br><keywordmajor>극악</keywordmajor> 1중첩당 베이가의 <scaleap>주문력이 {p3}</scaleap> 증가합니다.", // 극악무도 — stringtable
        "Q": "베이가가 암흑의 에너지 줄기를 쏟아내어 처음 맞는 두 명의 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다.<br><br>베이가가 이 스킬로 적을 하나 처치할 때마다 <keywordmajor>극악</keywordmajor> 중첩이 {p2} 쌓입니다. 대형 미니언, 대형 몬스터의 경우 중첩이 {p3}만큼 추가로 쌓입니다.", // 사악한 일격
        "W": "베이가가 하늘에서 암흑 물질을 소환해 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다.<br><br><keywordmajor>극악</keywordmajor>이 {p2}번 중첩될 때마다 이 스킬의 재사용 대기시간이 {p3}%씩 감소합니다.", // 암흑 물질
        "E": "베이가가 공간의 가장자리를 왜곡해 지나가는 적을 {p1}초 동안 <status>기절</status>시키는 감옥을 생성합니다. 감옥은 3초 동안 유지됩니다.", // 사건의 지평선
        "E_rules": "<rules>적을 <status>쓰러뜨리는</status> 스킬입니다.</rules>", // 구분선 아래 회색 글씨
        "R": "베이가가 적 챔피언에게 태초의 마법을 날려 <magicdamage>{p1}~{p2}의 마법 피해</magicdamage>를 입힙니다. 피해량은 대상이 잃은 체력에 비례합니다. 체력이 33% 밑으로 떨어진 적에게 피해가 극대화됩니다.", // 태초의 폭발
    },
    "Vayne": { // 베인
        "P": "베인이 악당을 무자비하게 사냥합니다. 근처 적 챔피언에게 접근할 때 이동 속도가 {p1}만큼 증가합니다.", // 어둠 사냥꾼 — stringtable
        "Q": "베인이 짧은 구르기를 합니다. 이후 기본 공격을 하면 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 추가로 입힙니다.<br><br><rules>이 스킬은 피해를 입힐 때 효과가 발동합니다.</rules>", // 구르기
        "W": "<passive>기본 지속 효과</passive>: 적에게 세 번 기본 공격 또는 스킬이 적중할 때마다 <truedamage>대상 최대 체력의 {p1}에 해당하는 고정 피해</truedamage>를 추가로 입힙니다.", // 은화살
        "W_rules": "<rules>최소 {p2}의 피해를 입힙니다.<br>정글 몬스터 상대로는 {p3}의 피해를 입힙니다. </rules>", // 구분선 아래 회색 글씨
        "E": "베인이 볼트를 발사하여 대상을 <status>뒤로 날려보내고</status> <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다. 지형에 부딪힌 대상은 <physicaldamage>{p2}의 추가 물리 피해</physicaldamage>를 입고 {p3}초 동안 <status>기절</status>합니다.", // 선고
        "R": "베인이 {p1}초 동안 <physicaldamage>{p2}의 공격력</physicaldamage>을 얻습니다. 적 챔피언이 베인에게 피해를 입고 {p3}초 안에 죽으면 지속시간이 {p4}초 늘어납니다. 또한 스킬이 지속되는 동안 <li><spellname>어둠 사냥꾼</spellname> 효과가 강화되어 <speed>이동 속도가 {p5}</speed> 증가합니다.<li><spellname>구르기</spellname>의 재사용 대기시간이 {p6}% 감소하며, 구르기를 사용하면 {p7}초 동안 <keywordstealth>투명</keywordstealth> 상태가 됩니다.", // 결전의 시간
        "R_rules": "<rules><keywordstealth>투명</keywordstealth> 상태의 유닛은 포탑이나 <font color='#ee91d7'>절대 시야</font>로만 모습이 드러납니다.<br>이 스킬의 지속시간은 기존 최대 지속시간을 초과해 늘어날 수 없습니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Vex": { // 벡스
        "P": "벡스가 {p1}초마다 파멸의 영향을 받아 다음 기본 스킬로 적을 <status>쓰러뜨리고</status> {p2}초 동안 <status>공포</status>에 빠뜨립니다.<br><br>주변 적이 돌진하거나 순간적으로 이동할 때마다 벡스가 적에게 {p3}초 동안 <keywordmajor>우울</keywordmajor> 표식을 남깁니다. 벡스의 다음 기본 공격은 <keywordmajor>우울 상태</keywordmajor>의 적에게 <magicdamage>{p4}의 마법 피해</magicdamage>를 추가로 입히며, 이 스킬의 재사용 대기시간이 {p5}% 감소됩니다.", // 파멸과 우울 — stringtable
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "Q": [
            "벡스가 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히는 안개 파동을 발사합니다. 잠시 후 파동의 크기가 작아지고 속도는 빨라집니다.",
            "적에게 적중하면 <keywordmajor>우울</keywordmajor>을 소모합니다."
        ], // 안개 화살
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "W": [
            "벡스가 {p1}초 동안 <shield>{p2}의 피해를 흡수하는 보호막</shield>을 얻고 <magicdamage>{p3}의 마법 피해</magicdamage>를 입히는 충격파를 방출합니다.",
            "적에게 적중하면 <keywordmajor>우울</keywordmajor>을 소모합니다."
        ], // 거리 두기
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "E": [
            "벡스가 지정한 위치로 그림자가 날아가도록 명령합니다. 그림자는 날아가는 동안 크기가 커집니다. 도착 시 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초 동안 {p3}% <status>둔화</status>시킵니다.<br><br>이 스킬로 적을 처치하면 <keywordmajor>파멸과 우울</keywordmajor>의 재사용 대기시간이 {p4}% 감소합니다.",
            "적중한 적에게 <keywordmajor>우울</keywordmajor>을 적용합니다."
        ], // 커지는 어둠
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "R": [
            "그림자가 격렬하게 전방으로 돌진합니다. 그림자는 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 첫 번째로 적중한 적 챔피언에게 4초 동안 표식을 남깁니다.",
            "<recast>재사용 시</recast>: 표식이 남은 챔피언에게 돌진하여 도착 시 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다.<br>표식이 남은 챔피언이 이 스킬로 피해를 입은 뒤 {p3}초 이내에 사망할 경우, 이 스킬의 재사용 대기시간이 일시적으로 초기화됩니다."
        ], // 그림자 파동
    },
    "Belveth": { // 벨베스
        "P": "스킬 사용 후 벨베스가 유체화 상태가 되며 {p1}초 동안 <attackspeed>공격 속도가 {p2}</attackspeed> 증가합니다.<br><br>벨베스가 대형 미니언과 몬스터 처치에 관여하면 <keywordmajor>{p3}개의 연보라</keywordmajor> 중첩이, 챔피언 및 에픽 몬스터 처치에 관여하면 <keywordmajor>{p4}개의 연보라</keywordmajor> 중첩이 쌓입니다. 각 중첩당 <attackspeed>공격 속도가 {p5}%</attackspeed>씩 영구히 증가합니다.<br><br>추가 <attackspeed>공격 속도</attackspeed>: 총 <attackspeed>{p6}%</attackspeed>", // 연보랏빛 죽음  — stringtable
        "Q": "벨베스가 돌진하여 경로상에 있는 적들에게 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다.<br><br>재사용 대기시간은 방향마다 {p2}초씩 따로 적용되며 <attackspeed>공격 속도</attackspeed>에 비례해 감소합니다.<br>", // 공허 쇄도
        "Q_rules": "<rules>처음 적중한 대상에게 적중 시 효과가 적용됩니다.<br><attackspeed>공격 속도 1%</attackspeed>는 이 스킬의 방향당 재사용 대기시간에서 스킬 가속 {p3}에 해당합니다.<br>벨베스가 몬스터에게 <physicaldamage>{p4}의 물리 피해</physicaldamage>를 추가로 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "W": "벨베스가 꼬리를 내리쳐 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 적을 {p2}초 동안 <status>공중으로 띄워 올리며</status> {p3}초 동안 {p4}% <status>둔화</status>시킵니다. 챔피언을 맞히면 해당 방향의 <spellname>공허 쇄도</spellname> 재사용 대기시간이 초기화됩니다.", // 위와 아래
        "E": "벨베스가 정신을 집중해 주변에 칼바람을 일으켜 {p1}초 동안 받는 피해량 감소 {p2}%, 생명력 흡수 효과를 {p3}만큼 얻으며 {p4}회 공격합니다. <attackspeed>추가 공격 속도</attackspeed> 40%당 공격 횟수가 1회 증가합니다. 각 공격은 체력이 가장 낮은 적에게 대상이 잃은 체력에 비례해 <physicaldamage>{p5}</physicaldamage>~<physicaldamage>{p6}의 물리 피해</physicaldamage>를 입힙니다.<br><br>다른 스킬을 사용하거나 <recast>재사용</recast>하면 이 스킬을 일찍 종료합니다.<br>", // 여제의 소용돌이
        "E_rules": "<rules>이 스킬로 가하는 공격은 몬스터에게 {p7}%의 피해를 입히며 대상이 잃은 체력에 비례해 {p8}%~{p9}%의 적중 시 효과를 적용합니다.</rules><br>", // 구분선 아래 회색 글씨
        "R": "<passive>기본 지속 효과:</passive> 기본 공격 시 무한히 중첩되는 <truedamage>{p1}의 고정 피해</truedamage>를 추가로 입힙니다. 챔피언과 에픽 몬스터 처치에 관여하면 공허 산호 조각이 떨어집니다.<br><br><active>사용 시:</active> 벨베스가 공허 산호를 소모하여 <keywordmajor>{p2}개의 연보라</keywordmajor> 중첩을 얻고 본모습을 드러냅니다. 공허 에픽 몬스터가 남긴 공허 산호는 근처에서 죽는 미니언을 공허 빨판상어로 만듭니다. 이 스킬을 사용하는 동안 주변 적을 <status>둔화</status>시킨 후 폭발을 일으켜 <truedamage>{p3}+잃은 체력의 {p4}%에 해당하는 고정 피해</truedamage>를 입힙니다.<br><br>본모습으로 변신한 벨베스는 <healing>최대 체력이 {p5}</healing>, 공격 사거리가 {p6}, <attackspeed>총공격 속도가 {p7}%</attackspeed> 증가하며 <spellname>공허 쇄도</spellname>로 벽을 통과할 수 있습니다.<br><br><rules>본모습은 {p8}초 동안 유지되며 <keywordmajor>연보라 {p9}</keywordmajor>중첩 시 {p10}초로 증가합니다. <keywordmajor>연보라 {p11}</keywordmajor>중첩 시 본모습이 죽을 때까지 유지됩니다.</rules><br><br><br>", // 끝없는 연회
        "R_rules": "<rules>공허 빨판 상어는 <healing>{p12}%의 체력</healing>과 <physicaldamage>{p13}%의 공격력</physicaldamage>을 가진 공격로 미니언으로 취급됩니다.<br>벨베스가 공허 산호를 소모하는 동안 적용된 <status>둔화</status>는 최대 99%까지 증가합니다. <br>기본 지속 효과는 에픽 몬스터에게 최대 <truedamage>{p14}의 고정 피해</truedamage>를 입힙니다.<br>본모습 상태에서 공허 산호를 소모하면 본모습의 지속시간이 연장되고 <healing>{p15} 체력</healing>을 회복합니다.</rules><br>", // 구분선 아래 회색 글씨
    },
    "Velkoz": { // 벨코즈
        "P": "벨코즈가 스킬을 적중시키면 {p1}초 동안 <keywordmajor>분해</keywordmajor> 중첩이 쌓입니다. 중첩이 3회 쌓인 적은 중첩이 모두 소모되어 <truedamage>{p2}의 고정 피해</truedamage>를 입습니다.<br><br>기본 공격 시 <keywordmajor>분해</keywordmajor> 지속시간이 초기화되지만 새 중첩은 쌓이지 않습니다.", // 유기물 분해 — stringtable
        "Q": "벨코즈가 플라즈마 광선을 발사해 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}% <status>둔화</status>시킵니다. 둔화 효과는 {p3}초에 걸쳐 사라집니다. 사거리 끝에 도달하거나, 대상을 맞히거나, 광선을 <recast>재사용</recast>하면 새로운 두 개의 광선이 90도 각도로 갈라져 발사됩니다.<br><br>플라즈마 분열로 유닛 처치 시 <scalemana>마나를 {p4}</scalemana> 회복합니다.", // 플라즈마 분열
        "W": "벨코즈가 공허로 통하는 균열을 열어 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. 이후 균열이 폭발하며 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다.<br><br>이 스킬은 2회까지 충전됩니다. ({p3}초마다 충전)", // 공허 균열
        "E": "벨코즈가 가까운 지면을 붕괴시켜 폭발을 일으키며 {p1}초 동안 <status>공중으로 띄워 올리고</status> <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다. 벨코즈와 가까이 있는 적은 <status>공중으로 떠오르는</status> 대신 <status>뒤로 밀려납니다</status>.", // 지각 붕괴
        "R": "벨코즈가 정신을 집중하여 마우스 커서를 따라가는 에너지 광선을 발사합니다. 이때 2.5초에 걸쳐 총 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}% <status>둔화</status>시킵니다. 최근 <spellname>유기물 분해</spellname> 스킬로 피해를 입은 적에게는 <truedamage>고정 피해</truedamage>를 입힙니다.<br><br>광선에 맞은 적에게는 주기적으로 <keywordmajor>분해</keywordmajor> 중첩이 쌓입니다.", // 생물 분해 광선
    },
    "Volibear": { // 볼리베어
        "P": "볼리베어가 스킬이나 기본 공격으로 피해를 입힐 때마다 {p1}초 동안 <attackspeed>공격 속도가 {p2}</attackspeed> 증가합니다. 최대 5회까지 중첩됩니다.<br><br>5회 중첩 시 볼리베어의 발톱에 번개가 감돌며 이때 기본 공격 시 대상 및 가장 가까운 적 넷에게 <magicdamage>{p3}의 마법 피해</magicdamage>를 추가로 입힙니다.", // 무자비한 폭풍 — stringtable
        "Q": "{p1}초 동안 볼리베어의 <speed>이동 속도가 {p2}</speed> 증가합니다. 적 챔피언을 향해 이동 시에는 이동 속도 증가량이 두 배로 늘어 <speed>{p3}</speed>까지 증가합니다. 스킬이 활성화된 동안 다음 기본 공격 시 <physicaldamage>{p4}의 물리 피해</physicaldamage>를 입히고 {p5}초 동안 <status>기절</status>시킵니다.<br><br>볼리베어가 대상을 <status>기절</status>시키기 전에 <status>이동 불가</status> 효과를 받으면 스킬이 끝나지만, 볼리베어가 분노하여 재사용 대기시간이 초기화됩니다.", // 번개 강타
        "Q_rules": "<rules>볼리베어의 이번 공격 사거리가 {p6} 증가합니다.</rules>", // 구분선 아래 회색 글씨
        "W": "볼리베어가 적을 공격하여 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 {p2}초 동안 표식을 남깁니다.<br><br>표식이 남은 대상에게 이 스킬을 사용하면 피해가 <physicaldamage>{p3}</physicaldamage>까지 증가하며 볼리베어가 <healing>{p4}+잃은 체력의 {p5}만큼 체력</healing>을 회복합니다.", // 광란의 상처
        "W_rules": "<rules>강화된 피해량은 에 비례합니다. (피해량 증가율: {p6}%+{p7}%)<br>이 스킬은 적중 시 효과가 적용됩니다.<br>미니언을 대상으로는 체력 회복 효과가 {p8}%로 감소합니다.</rules><br>", // 구분선 아래 회색 글씨
        "E": "볼리베어가 뇌운을 소환해 번개를 내리쳐 <magicdamage>{p1}+대상 최대 체력의 {p2}%에 해당하는 마법 피해</magicdamage>를 입히고 {p3}초 동안 {p4}% <status>둔화</status>시킵니다.<br><br>볼리베어가 폭발 지역 안에 있으면 {p5}초 동안 <shield>{p6}+최대 체력의 {p7}%에 해당하는 보호막</shield>을 얻습니다.", // 천공 분열
        "E_rules": "<rules>챔피언이 아닌 대상에게는 최대 <activerank>{p8}</activerank>의 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "R": "볼리베어가 변신 후 지정한 위치로 도약합니다. {p1}초 동안 <healing>체력이 {p2}</healing>, 공격 사거리가 {p3} 증가합니다.<br><br>볼리베어가 착지 시 땅에 균열이 생겨 근처 적 포탑이 {p4}초 동안 <status>비활성화</status>되며 <physicaldamage>{p5}의 물리 피해</physicaldamage>를 입습니다. 근처 적들은 {p6}% <status>둔화</status>했다가 1초에 걸쳐 원래대로 돌아옵니다. 볼리베어 바로 아래에 있는 적들은 <physicaldamage>{p7}의 물리 피해</physicaldamage>를 입습니다.", // 폭풍을 부르는 자
    },
    "Braum": { // 브라움
        "P": "브라움의 기본 공격은 {p1}초 동안 <keywordmajor>뇌진탕 펀치</keywordmajor>를 적용시킵니다. 아군이 <keywordmajor>뇌진탕 펀치</keywordmajor>가 적용된 적을 기본 공격 시 추가 중첩이 쌓입니다.<br><br>{p2}회 중첩되면 대상은 {p3}초 동안 <status>기절</status>하며 <magicdamage>{p4}의 마법 피해</magicdamage>를 입습니다. 다음 {p5}초 동안은 중첩이 새로 쌓이지 않는 대신 브라움의 기본 공격으로부터 <magicdamage>{p6}의 마법 피해</magicdamage>를 추가로 입습니다.", // 뇌진탕 펀치 — stringtable
        "Q": "브라움이 방패에서 빙결을 뿜어내어 <magicdamage>{p1}의 마법 피해</magicdamage>를 처음 맞는 적에게 입히고, 대상 적에게 {p2}%의 <status>둔화</status>를 겁니다. 둔화 효과는 {p3}초간 점차 감소합니다.<br><br>이 스킬로 <keywordmajor>뇌진탕 펀치</keywordmajor> 중첩이 1회 쌓입니다.", // 동상
        "W": "브라움이 아군 챔피언이나 미니언에게 도약합니다. 대상에게 다다르면 대상은 {p1}초 동안 <scalearmor>방어력이 {p2}</scalearmor>, <scalemr>마법 저항력이 {p3}</scalemr> 증가합니다. 브라움 역시 같은 시간 동안 <scalearmor>방어력이 {p4}</scalearmor>, <scalemr>마법 저항력이 {p5}</scalemr> 증가합니다.", // 내가 지킨다
        "E": "브라움이 {p1}초 동안 방패를 들어 올려 선택한 방향에서 날아오는 적의 투사체를 가로막아 자신이 대신 맞고서 소멸시킵니다. 브라움이 막는 첫 번째 투사체는 피해를 입히지 않으며 이후 막는 투사체는 피해량이 {p2}% 감소합니다.<br><br>방패를 들어 올리는 동안 브라움의 <speed>이동 속도가 {p3}%</speed> 증가합니다.", // 불굴
        "R": "브라움이 지면을 내리쳐 전방에 균열을 내며 균열에 있는 적과 브라움 근처에 있는 적을 <status>공중으로 띄워 올리고</status> <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. 첫 번째로 맞은 대상은 브라움과의 거리에 비례하여 {p2}~{p3}초 동안 <status>공중으로 띄워 올리고</status> 다른 적들은 {p2}초 동안 <status>공중으로 띄워 올립니다</status>.<br><br>균열은 {p4}초 동안 {p5}%만큼 <status>둔화</status>시키는 구역을 생성합니다.<br>", // 빙하 균열
    },
    "Briar": { // 브라이어
        "P": "브라이어의 기본 공격과 스킬은 {p1}초간 출혈 효과를 최대 {p2}회 적용합니다. 대상은 출혈 중첩 수에 따라 <physicaldamage>{p3}~{p4}의 물리 피해</physicaldamage>를 입으며, 브라이어는 <healing>감소 전 출혈 피해의 {p5}%만큼 체력을 회복</healing>합니다.<br><br>브라이어는 잃은 체력에 비례해 <healing>체력 회복량</healing>이 최대 <health>{p6}%</health> 증가합니다. 브라이어는 기본 체력 재생이 없으며 스킬 사용 시 <font color='#CC3300'>현재 체력의 {p7}%</font>를 소모합니다.<br>", // 진홍빛 저주 — stringtable
        "Q": "브라이어가 대상에게 도약해 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 {p2}초간 <status>기절</status>시키며 {p3}초간 <scalearmor>방어력</scalearmor> 및 <scalemr>마법 저항력</scalemr>을 {p4}% 감소시킵니다.<br><br><rules><keywordmajor>핏빛 광분</keywordmajor> 상태에서 이 스킬을 미니언이나 몬스터에게 사용하면 더 이상 챔피언을 우선적으로 공격하지 않습니다.</rules>", // 짜릿한 돌격
        "Q_rules": "<rules>이 스킬은 <onhit>적중 시</onhit> 효과가 적용됩니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "W": [
            "브라이어가 도약해 <keywordmajor>핏빛 광분</keywordmajor> 상태에 들어가고 {p1}초간 가장 가까운 적에게 도발됩니다. (챔피언 우선) <keywordmajor>핏빛 광분</keywordmajor> 상태에서 <attackspeed>공격 속도가 {p2}%</attackspeed>, <speed>이동 속도가 {p3}%</speed> 상승하며 기본 공격으로 대상 주변 적에게 <physicaldamage>{p4}의 물리 피해</physicaldamage>를 입힙니다.",
            "이 스킬을 <recast>재사용</recast>해 다음 기본 공격을 강화할 수 있습니다. 강화된 기본 공격으로 <physicaldamage>{p5}+잃은 체력의 {p6}%에 해당하는 물리 피해</physicaldamage>를 입히며, <healing>피해량의 {p7}+{p8}%만큼 체력을 회복</healing>합니다."
        ], // 핏빛 광분 / 식욕 폭발
        "W_rules": "<rules>베어 먹기 공격은 미니언과 몬스터 상대로 피해량이 {p9}% 증가합니다. (잃은 체력 비례 피해 최대 {p10})<br>이 스킬을 사용해도 <spellname>불가항력적 죽음</spellname>의 강화된 <keywordmajor>핏빛 광분</keywordmajor> 효과는 없어지지 않습니다.</rules>", // 구분선 아래 회색 글씨
        "E": "<charge>충전 시작:</charge> 브라이어가 <keywordmajor>핏빛 광분</keywordmajor> 상태에서 벗어나 힘을 모읍니다. 1초 동안 <healing>체력을 {p1}</healing> 회복하고, 입는 피해가 {p2}% 감소합니다.<br><br><release>발사:</release> 브라이어가 비명을 내질러 충전 시간에 따라 최대 <magicdamage>{p3}의 마법 피해</magicdamage>를 입히고, {p4}초 동안 {p5}% <status>둔화</status>시킵니다. 완전히 충전된 비명은 적을 <status>뒤로 밀치며</status>, 벽에 부딪히는 적에게 <magicdamage>{p6}의 마법 피해</magicdamage>를 입히고 {p7}초 동안 <status>기절</status>시킵니다.", // 오싹한 비명
        "R": "브라이어가 족쇄의 혈석을 발로 찬 다음, 혈석이 첫 번째로 적중한 챔피언을 먹잇감으로 지정하고 대상을 향해 날아갑니다. 착지 시 모든 주변 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 먹잇감을 제외한 적을 {p2}초간 <status>공포</status>에 빠트립니다. 이후 강화된 <keywordmajor>핏빛 광분</keywordmajor> 상태에 들어가 죽을 때까지 먹잇감을 쫓습니다. 지속시간 동안 <scalearmor>방어력</scalearmor> 및 <scalemr>마법 저항력</scalemr> {p3}, 생명력 흡수 {p4}%, <speed>이동 속도 {p5}%</speed>를 얻습니다.", // 불가항력적 죽음
        "R_rules": "<rules>혈석은 적중 시 대상의 정신 집중을 방해합니다. 브라이어는 먹잇감에 대한 <font color='#ee91d7'>절대 시야</font>를 얻습니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Brand": { // 브랜드
        "P": "브랜드의 스킬이 적을 <keywordmajor>불태워</keywordmajor> 4초 동안 <magicdamage>최대 체력의 {p1}%에 해당하는 마법 피해</magicdamage>를 입힙니다. 브랜드가 <keywordmajor>불타는</keywordmajor> 유닛을 처치하면 <scalemana>마나를 {p2}</scalemana>만큼 회복합니다. <keywordmajor>불길</keywordmajor>은 3회까지 중첩됩니다.<br><br>챔피언이나 대형 정글 몬스터에게 3회 중첩되면 <keywordmajor>불길</keywordmajor>이 2초 후 폭발하여 주변 적에게 <magicdamage>최대 체력에 비례해 {p3}의 마법 피해</magicdamage>를 입힙니다.", // 불길 — stringtable
        "Q": "브랜드가 불덩이를 발사하여 처음 적중한 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다.<br><br>대상이 <keywordmajor>불타는</keywordmajor> 상태라면 {p2}초 동안 <status>기절</status>합니다.", // 불태우기
        "W": "브랜드가 순수한 화염 기둥을 생성하여 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다.<br><br>대상이 <keywordmajor>불타는</keywordmajor> 상태라면 <magicdamage>{p2}의 피해</magicdamage>를 입습니다.", // 화염 기둥
        "E": "브랜드가 목표에 강력한 폭발을 일으켜 주변 유닛에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다.<br><br>대상이 <keywordmajor>불타는</keywordmajor> 상태라면 전파 범위는 두 배가 됩니다.", // 발화
        "R": "브랜드가 파괴적인 화염을 발사합니다. 화염은 브랜드나 다른 적에게 최대 5번 튕기며, 튕길 때마다 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. 화염은 <keywordmajor>불길</keywordmajor> 중첩이 적은 챔피언에게 우선적으로 튕깁니다.<br><br>대상이 <keywordmajor>불타는</keywordmajor> 상태라면 잠시 {p2}% <status>둔화</status>됩니다.", // 파멸의 불덩이
    },
    "Vladimir": { // 블라디미르
        "P": "<scalehealth>추가 체력 {p1}당</scalehealth> 블라디미르의 <scaleap>주문력이 1</scaleap> 증가합니다. 또한 <scaleap>주문력 1</scaleap>당 <scalehealth>최대 체력이 {p2}</scalehealth>만큼 증가합니다.", // 핏빛 계약 — stringtable. "추가 주문력/추가 체력" 두 줄({p3}·{p4}) 제거 — 현재값이라 고정값이 없다
        "Q": "블라디미르가 대상의 체력을 흡수하며 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 <healing>{p2}의 체력</healing>을 회복합니다. 스킬을 두 번 사용한 뒤에는 0.5초 동안 <speed>이동 속도가 {p3}%</speed> 증가하며 {p4}초 안에 이 스킬을 다시 사용하면 스킬이 강화됩니다.<br><br>강화된 스킬을 사용하면 <magicdamage>{p5}의 마법 피해</magicdamage>를 입히며 <healing>{p6}+잃은 체력의 {p7}</healing>만큼 추가로 회복합니다.", // 수혈
        "Q_rules": "<rules>미니언을 상대로는 강화된 체력 회복 효과가 30%로 감소합니다.</rules>", // 구분선 아래 회색 글씨
        "W": "블라디미르가 2초 동안 피의 웅덩이로 변하며 <keyword>대상으로 지정할 수 없는</keyword> <keyword>유체화</keyword> 상태가 되고 <speed>이동 속도가 {p1}%</speed> 증가했다가 {p2}초에 걸쳐 원래대로 돌아옵니다. 웅덩이에 있는 적은 {p3}% <status>둔화</status>됩니다.<br><br>웅덩이 위에 있는 적에게 지속시간 동안 <magicdamage>{p4}의 마법 피해</magicdamage>를 입히고 <healing>피해량의 {p5}만큼 체력</healing>을 회복합니다.", // 피의 웅덩이
        "W_rules": "<rules><spellname>선혈의 파도</spellname>를 충전하는 동안에도 이 스킬을 사용할 수 있습니다.<br>블라디미르가 웅덩이 안에 있을 때는 기본 공격이나 다른 스킬을 사용할 수 없습니다.<br>미니언과 정글 몬스터를 대상으로는 <healing>회복 효과</healing>가 {p6}%만 적용됩니다.<br>대상으로 지정할 수 없는 유닛은 이미 적중당한 상태가 아닌 한 적의 기본 공격이나 스킬에 영향을 받지 않습니다.<br>유체화 상태인 유닛은 다른 유닛을 통과할 수 있습니다.</rules>", // 구분선 아래 회색 글씨
        "E": "<charge>충전 시작: </charge>블라디미르가 <font color='#CC3300'>체력을 {p1}</font>까지 희생해 피의 웅덩이를 채웁니다. 웅덩이가 가득 차면 블라디미르의 이동 속도가 20% <status>둔화</status>됩니다.<br><br><release>발사: </release>주변의 적에게 투사체를 급류처럼 방출해 충전 시간에 비례하여 <magicdamage>{p2}</magicdamage>~<magicdamage>{p3}의 마법 피해</magicdamage>를 입힙니다. 스킬을 1초 이상 충전했을 경우 대상을 0.5초 동안 {p4}% <status>둔화</status>시킵니다.", // 선혈의 파도
        "E_rules": "<rules>이 스킬은 {p5}초가 지나면 자동으로 방출됩니다.<br>적은 여러 투사체에 맞아도 첫 번째 투사체로부터만 피해를 입습니다.<br></rules>", // 구분선 아래 회색 글씨
        "R": "블라디미르가 혈사병을 일으켜 {p1}초 동안 감염된 적이 받는 모든 피해를 {p2}% 증가시킵니다. 감염된 적은 이 효과가 끝나면 <magicdamage>{p3}의 마법 피해</magicdamage>를 입습니다. 블라디미르는 적 챔피언을 맞히면 <healing>{p3}의 체력</healing>을 회복하고, 이후 추가로 적 챔피언을 맞힐 때마다 <healing>{p4}의 체력</healing>을 더 회복합니다.", // 혈사병
    },
    "Blitzcrank": { // 블리츠크랭크
        "P": "블리츠크랭크의 체력이 {p1}% 미만이 되면 {p2}초 동안 <shield>{p3}의 피해를 흡수하는 보호막</shield>을 얻습니다.", // 마나 보호막 — stringtable
        "Q": "블리츠크랭크가 오른손을 발사하여 적중당한 적을 <status>끌어당기고</status> <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다.", // 로켓 손
        "W": "블리츠크랭크가 힘을 충전하여 {p1}초 동안 <speed>이동 속도가 {p2}% 증가했다가 점차 원래대로 돌아오고</speed>, <attackspeed>공격 속도가 {p3}%</attackspeed> 증가합니다.<br><br>폭주 효과가 끝나면 블리츠크랭크가 {p4}초 동안 {p5}% <status>둔화</status>됩니다.", // 폭주
        "W_rules": "<rules>이동 속도는 {p6}초 동안 {p7}%까지 느려집니다.</rules>", // 구분선 아래 회색 글씨
        "E": "블리츠크랭크가 주먹에 힘을 모아 다음 공격 시 적을 {p1}초 동안 <status>공중으로 띄워 올리고</status> <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입힙니다.", // 강철 주먹
        "R": "<passive>기본 지속 효과: </passive>스킬이 재사용 대기 상태가 아닐 때 블리츠크랭크의 주먹에 번개가 충전되어 공격 대상에게 표식을 남깁니다. 1초가 지나면 해당 적이 감전되어 <magicdamage>{p1}의 마법 피해</magicdamage>를 입습니다.<br><br><active>사용 시: </active>블리츠크랭크가 과충전해 주변 적에게 <magicdamage>{p2}의 마법 피해</magicdamage>를 입히고 {p3}초 동안 <status>침묵</status>시킵니다. 또한 적의 보호막도 파괴합니다.", // 정전기장
        "R_rules": "<rules>몬스터를 상대로는 보호막을 파괴하지 않습니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Viego": { // 비에고
        "P": "비에고가 처치한 적 챔피언의 영혼을 {p1}초 안에 공격하면 망령이 됩니다. 비에고가 망령을 공격해 <keywordmajor>지배</keywordmajor>하여 <healing>적 최대 체력의 {p2}%</healing>만큼 체력을 회복하고 {p3}초 동안 대상의 궁극기 이외의 스킬, 공격, 아이템을 사용할 수 있습니다. 비에고는 지배 중에 대상의 궁극기를 대체해 자신의 궁극기를 소모값 없이 시전하며 적 챔피언에게 접근할 때 <speed>이동 속도가 {p4}%</speed> 증가합니다.", // 군주의 지배 — stringtable
        "Q": "<passive>기본 지속 효과:</passive> 비에고의 기본 공격이 추가로 <physicaldamage>대상 현재 체력의 {p1}에 해당하는 물리 피해</physicaldamage>를 입힙니다. 최근 비에고의 스킬에 피해를 입은 적들을 처음 공격하면 추가 공격을 가하여 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입히고 <healing>입힌 피해량의 {p3}%</healing>만큼 회복합니다. 추가 효과는 <keywordmajor>지배</keywordmajor> 중에도 유지됩니다.<br><br><active>사용 시: </active>비에고가 전방을 찔러 <physicaldamage>{p4}의 물리 피해</physicaldamage>를 입힙니다.", // 몰락한 왕의 검
        "Q_rules": "<rules>적을 <keywordmajor>지배</keywordmajor> 중이 아니라면 두 번째 공격에는 치명타와 <onhit>적중 시</onhit> 발동 효과가 적용될 수 있습니다. 체력 회복량이 정글 몬스터 상대로는 {p5}%, 미니언 상대로는 {p6}%까지 감소합니다. <br> <onhit>적중 시</onhit> 추가 피해에는 치명타가 적용될 수 있으며 치명타 적용 시 <physicaldamage>현재 체력의 {p7}</physicaldamage>만큼 피해를 입힙니다. 최소 <physicaldamage>{p8}의 피해</physicaldamage>를 입힙니다. 정글 몬스터를 상대로 최대 <physicaldamage>{p9}의 피해</physicaldamage>를 입힙니다.<br>스킬의 시전 시간은 공격 속도에 따라 감소합니다. 피해량은 치명타 확률과 치명타 피해량에 따라 {p10}%만큼 증가합니다.</rules>", // 구분선 아래 회색 글씨
        "W": "<charge>충전 시작:</charge> 비에고가 안개를 불러모으며 {p1}% <status>둔화</status>됩니다.<br><br><release>안개 구체 발사 시:</release> 비에고가 전방으로 돌진하며 응축된 안개를 발사합니다. <magicdamage>{p2}의 마법 피해</magicdamage>를 입히고 처음으로 적중한 적을 충전 시간에 비례하여 {p3}~{p4}초 동안 <status>기절</status>시킵니다.<br>", // 망령의 나락
        "W_rules": "<rules>충전 중에 방해를 받으면 {p5}초의 재사용 대기시간이 적용됩니다.</rules>", // 구분선 아래 회색 글씨
        "E": "비에고가 전방으로 망령을 보내 처음으로 적중한 지형을 {p1}초 동안 안개로 둘러쌉니다. 비에고가 안개 속에서 <keywordstealth>위장</keywordstealth> 효과를 얻고 <speed>이동 속도가 {p2}</speed>, <attackspeed>공격 속도가 {p3}%</attackspeed> 증가합니다.", // 안개의 길
        "E_rules": "<rules><keywordstealth>위장</keywordstealth> 상태일 때는 적 챔피언의 감지 범위 안에 들어가지 않는 한 시야에 보이지 않습니다.<br>비에고가 공격하거나 스킬을 사용할 때 {p4}초 동안 모습을 드러냅니다.</rules>", // 구분선 아래 회색 글씨
        "R": "비에고가 현재 <keywordmajor>지배</keywordmajor> 중인 영혼을 버리고 순간이동합니다. 대상에 다다르면 남은 체력 비율이 가장 낮은 챔피언을 공격해 잠시 동안 {p1}% <status>둔화</status>시키고 <physicaldamage>{p2}+잃은 체력의 {p3}%에 해당하는 물리 피해</physicaldamage>를 입힙니다. 주변의 다른 적들은 <status>밀려나며</status> <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입습니다.", // 심장 파괴자
        "R_rules": "<rules>첫 번째 대상에게 적중 시 발동 효과가 적용되고 다른 대상에겐 마법 아이템 효과가 적용됩니다.<br>피해량은 치명타 확률과 치명타 피해량에 따라 {p4}%만큼 증가합니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Viktor": { // 빅토르
        "P": "빅토르가 적을 처치할 때마다 <keywordmajor>마공학 파편</keywordmajor>을 얻습니다. <keywordmajor>마공학 파편을 {p1}개</keywordmajor> 획득할 때마다 빅토르의 사용 스킬이 영구적으로 업그레이드됩니다. 기본 스킬을 모두 업그레이드한 후에는 궁극기를 업그레이드할 수 있습니다.<br><br>미니언 처치 시 <keywordmajor>마공학 파편</keywordmajor>을 {p2}개 얻습니다.<br>공성 미니언 처치 시 <keywordmajor>마공학 파편</keywordmajor>을 {p3}개 얻습니다.<br>챔피언 처치 관여 시 <keywordmajor>마공학 파편</keywordmajor>을 {p4}개 얻습니다.", // 영광스러운 진화 — stringtable
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "Q": [
            "빅토르가 적에게 폭발을 일으켜 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히며 {p2}초 동안 <shield>{p3}의 피해를 흡수하는 보호막</shield>을 얻습니다.<br>4초 안에 기본 공격 시 <magicdamage>{p4}의 마법 피해</magicdamage>를 입힙니다.",
            "<keywordmajor>업그레이드 시:</keywordmajor> {p2}초 동안 <shield>{p5}의 피해를 흡수하는 보호막</shield>을 얻고 <speed>이동 속도가 {p6}%</speed> 증가합니다."
        ], // 힘의 흡수
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "W": [
            "빅토르가 중력장 감옥 장치를 배치해 {p1}초 동안 장치 내부의 적을 {p2}% <status>둔화</status>시킵니다. 범위 안에 1.25초 동안 있는 적은 {p3}초 동안 <status>기절</status>합니다.",
            "<keywordmajor>업그레이드한 기본 지속 효과:</keywordmajor> 빅토르의 스킬이 1초 동안 {p4}% <status>둔화</status>시킵니다."
        ], // 중력장
        "W_rules": "<rules>이 스킬로 <status>기절</status>한 적들은 <status>뒤로 밀려납니다</status>.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "E": [
            "빅토르가 선택한 방향으로 마법공학 광선을 발사하여 적중한 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다.",
            "<keywordmajor>업그레이드 시:</keywordmajor> 마법공학 광선을 따라 여진이 일어나며 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다."
        ], // 마법공학 광선
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "R": [
            "빅토르가 일정 지역에 {p1}초 동안 아케인 폭풍을 일으켜 즉시 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힌 후 주변 적에게 초당 <magicdamage>{p3}의 마법 피해</magicdamage>를 입힙니다. 폭풍은 최근 피해를 입힌 챔피언을 자동으로 따라갑니다.<br><recast>재사용 시:</recast> 빅토르가 직접 폭풍을 움직일 수 있습니다.",
            "<keywordmajor>업그레이드:</keywordmajor> 폭풍이 {p4}% 빠르게 이동합니다. 폭풍이 피해를 입힌 챔피언이 죽으면 폭풍의 크기가 커지고 지속시간이 {p5}초 증가합니다. (최대 {p6}회)"
        ], // 아케인 폭풍
        "R_rules": "<rules>폭풍이 나타나면 정신 집중을 방해합니다.<br>폭풍은 빅토르에게서 멀어질수록 속도가 느려집니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Poppy": { // 뽀삐
        "P": "{p1}초마다 뽀삐가 다음 기본 공격 시 방패를 던집니다. 이때 사거리가 {p2} 증가하고 <magicdamage>{p3}의 추가 마법 피해</magicdamage>를 입힙니다. 방패는 대상을 맞힌 후 근처 바닥에 떨어집니다. 떨어진 방패를 주우면 <shield>{p4}의 피해를 흡수하는 보호막</shield>을 얻습니다. 방패는 적이 밟으면 파괴됩니다.<br><br>대상을 처치할 경우 방패가 바로 뽀삐에게 되돌아옵니다.", // 강철의 외교관 — stringtable
        "Q": "뽀삐가 땅을 힘껏 내려쳐 <physicaldamage>{p1}</physicaldamage>+<physicaldamage>최대 체력의 {p2}%에 해당하는 물리 피해</physicaldamage>를 입히고 지대를 불안정하게 만듭니다. <br><br>불안정한 지대는 적을 {p3} <status>둔화</status>시키고 {p4}초 뒤 폭발하여 <physicaldamage>{p1}</physicaldamage>+<physicaldamage>최대 체력의 {p2}%에 해당하는 물리 피해</physicaldamage>를 입힙니다.", // 망치 강타
        "Q_rules": "<rules>미니언 및 정글 몬스터가 대상일 때 공격당 최대 {p5}의 피해를 체력 비례 피해로 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "W": "<passive>기본 지속 효과:</passive> 뽀삐가 <scalearmor>{p1}의 방어력</scalearmor>과 <scalemr>{p2}의 마법 저항력</scalemr>을 추가로 얻습니다. 뽀삐의 체력이 {p3}% 미만일 때는 효과가 두 배로 늘어납니다.<br><br><active>사용 시:</active> 뽀삐의 <speed>이동 속도가 {p4}%</speed> 증가하고 역장을 둘러 {p5}초 동안 주변에서 돌진하는 적을 막습니다. 가로막힌 적은 {p6}초 동안 <status>이동 스킬을 사용할 수 없고</status> {p7}% <status>둔화</status>되며 <magicdamage>{p8}의 마법 피해</magicdamage>를 입습니다.", // 굳건한 태세
        "E": "뽀삐가 하나의 적에게 돌진해 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 앞으로 밀어냅니다. 적이 지형에 부딪히면 적이 {p2}초 동안 <status>기절</status>하고 <physicaldamage>{p1}의 추가 물리 피해</physicaldamage>를 입습니다.", // 용감한 돌진
        "R": "<charge>충전 시작 시:</charge> 뽀삐가 최대 {p1}초 동안 망치를 충전하고 {p2}% <status>둔화</status>됩니다.<br><br><release>사용 시:</release> 뽀삐가 지면에 강력한 일격을 날려 균열을 일으킵니다. 처음 적중한 적 챔피언과 주변 적은 <physicaldamage>{p3}의 물리 피해</physicaldamage>를 입고 모두 <status>넥서스 쪽으로</status> <status>밀려나고</status> 공중에 떠오른 적은 대상으로 지정할 수 없게 됩니다. 균열의 길이와 적을 <status>밀어내는</status> 거리는 정신을 충전 시간에 비례합니다.<br><br>충전하지 않고 바로 사용할 경우 <physicaldamage>{p4}의 물리 피해</physicaldamage>를 입히고 적을 {p5}초 동안 <status>공중으로 띄워 올립니다</status>.", // 수호자의 심판
        "R_rules": "<rules>대상으로 지정할 수 없는 유닛은 이미 적중당한 상태가 아닌 한 적의 기본 공격이나 스킬에 영향을 받지 않습니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Samira": { // 사미라
        "P": "사미라가 마지막으로 맞힌 공격과 다른 기본 공격 또는 스킬로 적 챔피언에게 피해를 입히면 콤보를 1회 쌓습니다. 각 콤보마다 \"E\"부터 \"S\"까지 총 6단계의 <keywordmajor>스타일</keywordmajor> 등급이 올라갑니다. 등급마다 <speed>이동 속도가 {p1}</speed> 증가합니다.<br><br>사미라가 근접 공격 사거리 내에 있는 적에게 스킬을 사용하거나 기본 공격을 가하면 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다. 피해량은 대상이 잃은 체력에 비례하여 <magicdamage>{p3}</magicdamage>까지 증가합니다.<br><br>사미라가 <status>이동 불가</status> 효과에 영향을 받은 적에게 기본 공격을 가하면 최대 사거리까지 돌진합니다. 해당 적이 <status>공중으로 띄워진</status> 상태라면 사미라도 최소 0.5초간 대상을 <status>공중으로 띄워 올립니다</status>.", // 무모한 충동 — stringtable
        "Q": "사미라가 총을 쏴 처음 맞은 적에게 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다.<br><br>근접 공격 사거리 내에 있는 적에게 이 스킬을 사용하면, 사미라가 검으로 베어 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다.", // 천부적 재능
        "Q_rules": "<rules>두 공격 모두 치명타가 적용되어 <physicaldamage>{p2}</physicaldamage>의 피해를 입힐 수 있으며 {p3}%의 생명력 흡수 효과가 적용됩니다. </rules><br><rules><spellname>거침없는 질주</spellname> 도중 사용하면 돌진이 끝난 후 경로 내에 있는 모든 적을 공격합니다. </rules>", // 구분선 아래 회색 글씨
        "W": "사미라가 {p1}초 동안 주변에 검을 휘두르며 적들을 두 번 공격해 각각 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입히고 범위 안으로 들어오는 적의 투사체를 모두 파괴합니다.<br><br>", // 원형 검무
        "E": "사미라가 적(구조물 포함)을 통과해 돌진합니다. 돌진 도중 통과하는 모든 적을 베어 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초 동안 <attackspeed>{p3}%의 공격 속도</attackspeed>를 얻습니다. <br><br>사미라가 피해를 입힌 적 챔피언이 3초 안에 처치되면 이 스킬의 재사용 대기시간이 초기화됩니다.", // 거침없는 질주
        "R": "사미라의 <keywordmajor>스타일</keywordmajor> 등급이 S등급일 때만 이 스킬을 사용할 수 있습니다. 이 스킬을 사용하면 <keywordmajor>스타일</keywordmajor> 등급이 초기화됩니다.<br><br>사미라가 무기를 난사해 2초 동안 10회에 걸쳐 주변의 모든 적에게 공격을 퍼붓습니다. 각 사격은 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히며 {p2}%의 생명력 흡수가 적용됩니다. 또한 치명타가 적용될 수 있습니다.", // 지옥불 난사
        "R_rules": "<rules>미니언에게는 {p3}%의 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Sion": { // 사이온
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "P": [
            "사이온은 처치된 다음 되살아나 이동하고 공격할 수 있지만, 부활한 동안에는 체력이 급속히 떨어집니다. 생명력 흡수 효과가 {p1}% 증가하고 매우 빠르게 공격하며 적중 시 <physicaldamage>대상 최대 체력의 {p2}%에 해당하는 물리 피해</physicaldamage>를 추가로 입힙니다.",
            "모든 스킬이 <spellname>죽음의 물결</spellname>로 대체되어 이동 속도가 대폭 상승합니다."
        ], // 영광스러운 죽음 — stringtable
        "Q": "<charge>충전 시작 시</charge>: 사이온이 최대 2초간 강력한 일격을 충전합니다.<br><br><release>발사 시</release>: 사이온이 도끼를 내리쳐 적들을 잠시 <status>둔화</status>시키고 충전 시간에 비례해 <physicaldamage>{p1}~{p2}의 물리 피해</physicaldamage>를 입힙니다. 최소 1초 이상 충전했다면 적들을 <status>공중으로 띄워 올리고</status> {p3}~2.25초 충전했다면 <status>기절</status>시킵니다.", // 대량 학살 강타
        "Q_rules": "<rules>정글 몬스터에게는 {p4}%의 피해, 미니언에게는 {p5}%의 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "W": [
            "<passive>기본 지속 효과</passive>: 사이온은 유닛을 하나 처치할 때마다 <scalehealth>최대 체력이 {p1}</scalehealth> 증가합니다. 챔피언 처치 관여, 대형 미니언 또는 대형 몬스터 처치 시 최대 체력이 <scalehealth>{p2}</scalehealth> 증가합니다.",
            "<active>사용 시</active>: 사이온이 6초간 <shield>{p3}의 피해를 흡수하는 보호막</shield>을 얻습니다. {p4}초 후에 보호막이 지속 중이라면 스킬을 <recast>재사용</recast>하여 보호막을 폭발시키고 <magicdamage>{p5}+대상 최대 체력의 {p6}%에 해당하는 마법 피해</magicdamage>를 입힙니다."
        ], // 영혼의 용광로
        "W_rules": "<rules>미니언과 몬스터에게 최대 400의 추가 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "E": "사이온이 충격파를 발사해 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초간 적들을 {p3}% <status>둔화</status>시키며, {p4}초간 <scalearmor>방어력을 {p5}%</scalearmor> 감소시킵니다. 챔피언이 아닌 대상이 공격에 적중당하면 <status>뒤로 밀려납니다</status>. <status>뒤로 밀려난</status> 유닛에게 부딪힌 적들에게는 동일한 피해와 효과가 적용됩니다.", // 학살자의 포효
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "R": [
            "사이온이 8초 동안 저지 불가 상태가 되어 마우스 커서 방향으로 돌진합니다. 사이온이 적 챔피언이나 벽과 충돌하거나 스킬을 <recast>재사용</recast>하면 멈춥니다.",
            "돌진이 끝나면 이동 거리에 비례해 <physicaldamage>{p1}~{p2}의 물리 피해</physicaldamage>를 입힙니다. 사이온 주변에 있는 적들은 이동 거리에 비례해 {p3}~{p4}초간 <status>기절</status>합니다. 더 넓은 범위에 있는 적들은 3초간 {p5}% <status>둔화</status>됩니다."
        ], // 멈출 수 없는 맹공
    },
    "Sylas": { // 사일러스
        "P": "스킬 사용 후 사일러스가 1회 충전합니다. (최대 충전량 {p1}회) 다음 기본 공격 시 충전량을 하나 소모하여 사슬을 휘두르며 적중당한 대상에게 <magicdamage>{p2}의 마법 피해</magicdamage>를 입히고 대상 주변의 모든 적에게 <magicdamage>{p3}의 마법 피해</magicdamage>를 입힙니다.<br><br>충전이 하나라도 되어 있으면 사일러스의 <attackspeed>공격 속도가 {p4}%</attackspeed> 증가합니다.", // 페트리사이트 폭발 — stringtable
        "Q": "사일러스가 사슬을 후려쳐 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초 동안 {p3} <status>둔화</status>시킵니다. 사슬이 교차하는 지점은 폭발해 <magicdamage>{p4}의 마법 피해</magicdamage>를 추가로 입힙니다.", // 사슬 후려치기
        "Q_rules": "<rules>폭발 범위 안에 있는 미니언은 {p5}%의 피해를 입습니다.</rules>", // 구분선 아래 회색 글씨
        "W": "사일러스가 마법의 힘으로 적에게 돌진해 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. 챔피언에게 사용하면 사일러스가 잃은 체력에 비례해 <healing>{p2}</healing>~<healing>{p3}의 체력</healing>을 회복합니다. (체력이 {p4}% 이하일 때 최대 회복량 적용)", // 국왕시해자
        "E": [
            "사일러스가 재빨리 돌진한 후 3.5초 동안 <recast>재사용</recast>을 준비합니다.<br><rules>돌진 거리 400</rules>",
            "<recast>재사용 시:</recast> 사일러스가 사슬을 던져 적에게 적중하면 사슬을 끌어당겨 적 방향으로 이동하며 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초 동안 <status>공중으로 띄워 올립니다</status>.<br><rules>사거리 950 (가장자리 790)</rules>"
        ], // 도주 / 억압
        "R": "사일러스가 적 챔피언의 궁극기를 강탈해 적과 똑같이 사용합니다. 효과는 사일러스의 궁극기 레벨과 능력치에 비례합니다.<br><br>적의 궁극기를 강탈하면 해당 궁극기 재사용 대기시간의 {p1}%(사일러스의 스킬 가속 적용)만큼 재사용 대기시간이 적용되어 사일러스가 그동안 해당 적의 궁극기를 다시 강탈할 수 없습니다. (최소 {p2}초)", // 강탈
        "R_rules": "<rules>사일러스가 순수한 공격력 계수를 주문력 계수로 전환해 추가 공격력 1당 주문력 0.4, 총 공격력당 주문력 0.6씩을 얻습니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Shaco": { // 샤코
        "P": "샤코가 대상의 뒤에서 공격 시:<li>기본 공격 시 <physicaldamage>{p1}의 추가 물리 피해</physicaldamage>를 입히며 치명타가 적용될 수 있습니다.<li><spellname>양날 독</spellname> 사용 시 <magicdamage>{p2}의 추가 마법 피해</magicdamage>를 입힙니다. 대상의 체력이 30%보다 낮은 경우 <magicdamage>{p3}의 추가 마법 피해</magicdamage>까지 증가합니다.", // 암습 — stringtable
        "Q": "샤코가 근처로 순간이동해 {p1}초 동안 <keywordstealth>투명</keywordstealth> 상태가 됩니다. <spellname>깜짝 상자</spellname>나 <spellname>환각</spellname> 스킬을 사용해도 <keywordstealth>투명</keywordstealth> 상태는 유지됩니다.<br><br><keywordstealth>투명</keywordstealth> 상태에서 다음 기본 공격 시 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 추가로 입힙니다. 뒤에서 기본 공격 시 치명타가 적용되어 {p3}의 피해를 입힙니다.", // 속임수
        "Q_rules": "<rules>기본 공격 시 추가 피해량에 치명타가 적용될 수 있습니다.<br><keywordstealth>투명</keywordstealth> 상태의 유닛은 포탑이나 <font color='#ee91d7'>절대 시야</font>로만 모습이 드러납니다.</rules>", // 구분선 아래 회색 글씨
        "W": "샤코가 {p1}초 뒤 시야에서 사라지는 상자를 남깁니다. 상자는 {p2}초 동안 보이지 않습니다. 적이 가까이 다가오거나 발각되면 발동해 주변 적 챔피언을 {p3}초 동안, 미니언과 정글 몬스터를 {p4}초 동안 <status>공포</status>에 빠뜨립니다.<br><br>상자가 발동되면 주변 모든 적을 5초 동안 공격해 <magicdamage>{p5}의 마법 피해</magicdamage>를 입히거나 단일 대상 공격 시 <magicdamage>{p6}의 피해</magicdamage>를 입힙니다.<br><br>깜짝 상자는 몬스터에게 <magicdamage>{p7}</magicdamage>의 추가 피해를 입힙니다.", // 깜짝 상자
        "E": "<passive>기본 지속 효과:</passive> 이 스킬이 재사용 대기 상태가 아닐 때 샤코가 기본 공격 시 {p1}초 동안 대상을 {p2}% <status>둔화</status>시킵니다.<br><br><active>사용 시:</active> 샤코가 단검을 던져 <magicdamage>{p3}의 마법 피해</magicdamage>를 입히고 대상을{p4}초 동안 {p2}% <status>둔화</status>시킵니다. 대상의 체력이 {p5}% 미만이면 <magicdamage>{p6}의 피해</magicdamage>를 입힙니다.", // 양날 독
        "R": "샤코가 잠시 사라졌다가 {p1}초 동안 유지되는 분신과 함께 다시 나타납니다. 분신은 처치되면 폭발하여 <magicdamage>{p2}의 마법 피해</magicdamage>를 입히고 즉시 발동하는 작은 <spellname>깜짝 상자</spellname> 세 개를 남깁니다. 분신은 샤코의 {p3}%에 해당하는 피해를 입히지만, 받는 피해량이 {p4}% 증가합니다.<br><br>작은 <spellname>깜짝 상자</spellname>는 <magicdamage>{p5}의 마법 피해</magicdamage>를 입히거나 단일 적 공격 시 <magicdamage>{p6}의 마법 피해</magicdamage>를 입히고 {p7}초 동안 적을 <status>공포</status>에 빠뜨립니다.<br>", // 환각
        "R_rules": "<rules>Alt 키를 누른 채로 마우스 오른쪽 버튼을 누르거나 이 스킬을 <recast>재사용</recast>하면 분신을 조종할 수 있습니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Senna": { // 세나
        "P": "세나가 죽은 적으로부터 생성되는 영혼을 공격하여 <keywordmajor>안개</keywordmajor>를 흡수할 수 있습니다. 또한 적 챔피언에게 기본 공격이나 스킬을 두 번 사용하여 <keywordmajor>안개</keywordmajor>를 흡수할 수 있으며, <physicaldamage>대상 현재 체력의 {p1}%에 해당하는 물리 피해</physicaldamage>를 추가로 입힙니다.<br><br>흡수된 <keywordmajor>안개</keywordmajor> 하나당 <physicaldamage>{p2}의 공격력</physicaldamage>을 얻습니다. {p3}개 흡수할 때마다 공격 사거리가 {p4}, 치명타 확률이 {p5}% 증가하지만, 치명타 피해량이 {p6}의 피해로 조정됩니다. 치명타 확률이 최대치를 초과하는 경우 {p7}%만큼 생명력 흡수율로 변환됩니다.<br><br>세나의 공격 속도가 느려지고 <physicaldamage>{p8}의 물리 피해</physicaldamage>를 추가로 입히며, 잠시 <speed>공격 대상의 이동 속도를 {p9}만큼</speed> 흡수합니다.", // 면죄 — stringtable
        "Q": "세나가 아군 또는 적을 관통하는 그림자를 발사하여 적에게 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 {p2}초간 {p3}만큼 <status>둔화</status>시킵니다. 아군 챔피언에게는 <healing>{p4}의 체력</healing>을 회복시킵니다. <br><br>기본 공격 시 스킬의 재사용 대기시간이 {p5}초 감소합니다.", // 꿰뚫는 어둠
        "Q_rules": "<rules>이 스킬의 시전 사거리는 세나의 공격 사거리에 비례하며 시전 시간은 공격 속도에 비례하여 변화합니다. 아무나 시전 대상이 될 수 있으며 적군 챔피언에게는 적중 시 효과가 적용됩니다.</rules>", // 구분선 아래 회색 글씨
        "W": "세나가 검은 안개를 방출하여 첫 번째로 적중한 적에게 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다. 또한 {p2}초 후 해당 적과 주변의 모든 적들은 {p3}초 동안 <status>속박</status>됩니다.", // 마지막 포옹
        "E": "세나가 {p1}초 동안 검은 안개에 흡수되어 망령이 됩니다. 안개에 들어간 아군 챔피언들은 <keywordstealth>위장</keywordstealth> 상태가 되며 바깥으로 나오면 망령이 됩니다. 망령 상태에서는 <speed>{p2}의 이동 속도</speed>를 얻습니다. 또한 대상으로 지정할 수 없는 상태가 되며 적 챔피언이 가까이에 없는 한 정체를 숨길 수 있습니다.", // 검은 안개의 저주
        "E_rules": "<rules>적들은 망령을 볼 수 있지만 정체는 알 수 없습니다. 그 외에는 <keywordstealth>위장</keywordstealth> 상태인 것으로 간주됩니다.<br><keywordstealth>위장</keywordstealth> 상태일 때는 적 챔피언의 감지 범위 안에 들어가지 않는 한 시야에 보이지 않습니다.<br>지정할 수 없는 상태에서는 대상이 필요한 스킬이나 기본 공격의 대상이 될 수 없습니다.</rules>", // 구분선 아래 회색 글씨
        "R": "세나가 빛줄기를 발사합니다. 빛줄기에 맞은 적 챔피언은 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입습니다. 더 넓은 범위에 맞은 아군 챔피언은 {p2}초 동안 <shield>{p3}의 피해를 흡수하는 보호막</shield>을 얻습니다.", // 여명의 그림자
        "R_rules": "<rules>보호막 흡수량은 세나가 흡수한 <keywordmajor>안개</keywordmajor> 수에 비례합니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Seraphine": { // 세라핀
        "P": "세 번째 기본 스킬을 사용할 때마다 해당 스킬이 메아리쳐 자동으로 두 번 사용됩니다.<br><br>추가로 세라핀이 주변 아군에게서 음악적 영감을 끌어내어 스킬을 사용할 때마다 주변의 아군 하나당 <keywordmajor>음표</keywordmajor> 하나를 생성합니다. 각 <keywordmajor>음표</keywordmajor>마다 세라핀의 사거리가 {p1} 증가하고 추가로 <magicdamage>{p2}의 마법 피해</magicdamage>를 입히며 <keywordmajor>음표</keywordmajor>가 소모됩니다.", // 무대 장악 — stringtable
        "Q": "세라핀이 맑은 음을 노래해 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. 챔피언과 몬스터의 경우 대상 잃은 체력에 비례해 피해량이 증가하며, 대상의 체력이 {p2}% 이하일 때까지 최대 <magicdamage>{p3}의 피해</magicdamage>를 입힙니다.", // 고음
        "W": "세라핀이 노래로 주변 아군을 감싸 {p1}초 동안 아군의 <speed>이동 속도가 {p2}</speed> 상승하고, 자신의 <speed>이동 속도가 {p3}</speed> 상승하며 <shield>{p4}의 피해를 흡수하는 보호막</shield>을 얻습니다. 이동 속도는 점차 원래대로 돌아옵니다.<br><br>세라핀에게 이미 <shield>보호막</shield>이 있으면 아군을 불러 모아 {p5}초 후 <healing>잃은 체력의 {p6}%</healing>만큼 체력을 회복시킵니다.", // 소리 장막
        "W_rules": "<rules>이 스킬은 두 번 사용해도 한 번만 체력을 회복시킵니다.</rules>", // 구분선 아래 회색 글씨
        "E": "세라핀이 묵직한 음파를 발사하여 일직선상에 있는 적들에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초 동안 {p3}% <status>둔화</status>시킵니다.<br><br>이미 <status>둔화</status>된 적들은 <status>속박</status>되며, <status>이동 불가</status> 상태인 적들은 <status>기절</status>합니다.", // 비트 발사
        "E_rules": "<rules>미니언에게는 {p4}%의 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "R": "무대를 장악한 세라핀이 사로잡는 힘을 날려 {p1}초 동안 적을 <status>매혹</status>하고 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다.<br><br>챔피언(아군, 적 무관)에게 적중 시 이 스킬의 사거리가 늘어나고 아군 챔피언은 <keywordmajor>음표</keywordmajor> 중첩을 최대로 얻습니다.", // 앙코르
    },
    "Sejuani": { // 세주아니
        "P": "{p1}초 동안 챔피언 또는 대형 정글 몬스터로부터 피해를 입지 않으면 <status>둔화</status>에 면역되고 <scalearmor>{p2}의 방어력</scalearmor>과 <scalemr>{p3}의 마법 저항력</scalemr>을 얻습니다.<br><br>세주아니에게 <status>기절</status>당한 적을 처음으로 기본 공격하면 <magicdamage>최대 체력의 {p4}에 해당하는 마법 피해</magicdamage>를 입힙니다.", // 혹한의 분노 — stringtable
        "Q": "세주아니가 돌진하며 적들에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초 동안 <status>공중으로</status> <status>띄워 올립니다</status>. 적 챔피언에게 충돌하면 돌진을 멈춥니다.", // 혹한의 맹습
        "W": "세주아니가 철퇴를 휘둘러 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 미니언과 정글 몬스터를 <status>뒤로 밀어냅니다</status>. 곧이어 한 번 더 철퇴를 휘둘러 <physicaldamage>{p2}의 물리 피해를 입히고</physicaldamage> 잠깐 <status>둔화</status>시킵니다.<br><br>두 번 모두 <spellname>만년 서리</spellname>의 중첩이 쌓입니다.", // 혹한의 서릿발
        "E": "<passive>기본 지속 효과:</passive> 근처 아군 근접 챔피언이 적 챔피언 또는 정글 몬스터를 기본 공격하면 중첩이 쌓입니다.<br><br><passive>사용 시:</passive> 세주아니가 중첩이 4회 쌓인 대상에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초 동안 <status>기절</status>시킵니다.", // 만년 서리
        "E_rules": "<rules>세주아니가 <status>기절</status>시킨 챔피언은 {p3}초 동안 중첩이 쌓이지 않습니다.<br>이 스킬로 <status>기절</status>당한 적들은 약간 <status>뒤로 밀려납니다</status>.<br>만년 서리는 마우스 커서에서 가장 가까운 유효한 적을 대상으로 합니다. (챔피언 우선)<br>적을 <status>쓰러뜨리는</status> 스킬입니다.</rules>", // 구분선 아래 회색 글씨
        "R": "세주아니가 얼음 정수 올가미를 던져 {p1}초 동안 처음 맞힌 챔피언의 모습을 드러내고 <status>기절</status>시키며, <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다.<br><br>올가미가 사거리의 25% 이상 날아가 적중할 경우 {p3}초 동안 모습을 드러내고 <status>기절</status>시킵니다. 또한 {p4}초 동안 주변 적들을 {p5}% <status>둔화</status>시키는 얼음 폭풍을 일으킵니다. 스킬에 영향을 받은 모든 적은 <magicdamage>{p6}의 마법 피해</magicdamage>를 입습니다.", // 빙하 감옥
        "R_rules": "<rules><status>기절</status>당한 적은 즉시 피해를 입지만, 얼음 폭풍 안의 적들은 폭풍이 끝날 때 피해를 입고 추가로 1초 동안 <status>둔화</status>됩니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Sett": { // 세트
        "P": "세트는 기본 공격 시 양 주먹을 번갈아 사용합니다. 왼쪽 주먹을 날린 후 곧바로 오른쪽 주먹을 날리며 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 추가로 입힙니다.<br><br>세트가 잃은 체력의 {p2}%당 <healing>{p3}의 체력 재생</healing> 효과를 얻습니다.", // 투기장의 투지 — stringtable
        "Q": "세트가 싸움을 찾아 적 챔피언을 향해 이동할 때 {p1}초 동안 <speed>이동 속도가 {p2}%</speed> 증가합니다.<br><br>또한 세트의 다음 두 번의 기본 공격은 <physicaldamage>{p3}+최대 체력의 {p4}에 해당하는 물리 피해</physicaldamage>를 추가로 입힙니다.", // 주먹다짐
        "Q_rules": "<rules>기본 공격 시 언제나 왼쪽 주먹과 오른쪽 주먹을 날립니다. 몬스터에게는 주먹을 날릴 때마다 최대 <physicaldamage>{p5}의 피해</physicaldamage>를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "W": "<passive>기본 지속 효과:</passive> 세트가 받은 피해량의 {p1}%를 <keywordmajor>{p2}</keywordmajor>까지 <keywordmajor>투지</keywordmajor>로 저장합니다. <keywordmajor>투지</keywordmajor>는 피해를 입고 {p3}초 후에 빠르게 감소합니다.<br><br><active>사용 시:</active> 세트가 모든 <keywordmajor>투지</keywordmajor>를 소모해 <shield>소모한 투지의 {p4}%에 해당하는 보호막</shield>을 얻습니다. 보호막은 {p5}초에 걸쳐 사라집니다. 이후 세트가 강력한 펀치를 날려 중심에 있는 적에게 <truedamage>{p6}+소모한 투지의 {p7}에 해당하는 고정 피해</truedamage>를 입힙니다. (최대 <truedamage>{p8}의 피해</truedamage>) 중심에 있지 않은 적은 <physicaldamage>물리 피해</physicaldamage>를 입습니다.", // 강펀치
        "E": "세트가 양옆에 있는 적들을 서로 부딪치게 하여 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 {p2}초 동안 {p3}% <status>둔화</status>시킵니다. 양옆에 최소 한 명씩의 적을 붙잡았다면 부딪힌 모든 적들이 {p4}초 동안 <status>기절</status>합니다.", // 안면 강타
        "E_rules": "<rules>몬스터에게 {p5}의 추가 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "R": "세트가 적 챔피언을 붙잡고 <status>제압</status>한 후 앞으로 도약해 바닥에 내리꽂습니다. 주변에 있는 적은 <physicaldamage>{p1}+붙잡은 적 추가 체력의 {p2}%에 해당하는 물리 피해</physicaldamage>를 입고 {p3}초 동안 {p4}% <status>둔화</status>됩니다. 세트가 착지하는 지점에서 멀리 떨어질수록 더 적은 피해를 입습니다.", // 대미 장식
    },
    "Sona": { // 소나
        "P": "<passive>아첼레란도</passive>: 소나가 기본 스킬을 잘 사용하면 아첼레란도 중첩을 얻습니다. 중첩당 기본 스킬 가속이 영구적으로 + {p1}씩, 최대 {p2}까지 증가합니다. 기본 스킬 가속이 {p2}에 도달하면 중첩을 추가로 얻는 대신 현재 <keywordmajor>궁극기</keywordmajor>의 재사용 대기시간이 {p3}초 감소합니다.<br><br><passive>파워 코드</passive>: 기본 스킬을 {p4}번 사용하고 나면 소나의 다음 기본 공격이 <magicdamage>{p5}의 마법 피해</magicdamage>를 추가로 입히며 마지막으로 연주한 곡의 추가 효과를 적용할 수 있습니다.<br><li><spellname>용맹의 찬가:</spellname> 대신 <magicdamage>{p6}의 마법 피해</magicdamage>를 입힙니다.<li><spellname>인내의 아리아:</spellname> {p7}초 동안 대상이 주는 피해가 {p8}만큼 감소합니다.<li><spellname>기민함의 노래:</spellname> {p9}초 동안 대상이 {p10}만큼 <status>둔화</status>됩니다.", // 파워 코드 — stringtable
        "Q": "소나가 근처의 적 두 명(챔피언 우선)에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. 그리고 새로운 <keywordmajor>멜로디</keywordmajor>를 연주하기 시작합니다. 이 스킬로 챔피언에게 피해를 입히면 <keywordmajor>아첼레란도</keywordmajor> 중첩을 얻습니다.<br><br><keywordmajor>멜로디:</keywordmajor> {p2}초 동안 소나 주위에 오라가 생깁니다. 오라에 닿은 아군 챔피언들은 {p3}초 안에 다음 기본 공격 시 <magicdamage>{p4}의 마법 피해</magicdamage>를 추가로 입힙니다.<br><br><keywordmajor>파워 코드 - 스타카토:</keywordmajor> 파워 코드 추가 피해 (<magicdamage>총 {p5}의 마법 피해</magicdamage>)", // 용맹의 찬가
        "W": "<passive>사용 시:</passive> 소나가 자신 및 근처 아군 챔피언 한 명(가장 많이 피해를 입은 챔피언)의 <healing>체력을 {p1}</healing> 회복합니다. 그리고 새로운 <keywordmajor>멜로디</keywordmajor>를 연주하기 시작합니다.<br><br><keywordmajor>멜로디:</keywordmajor> {p2}초 동안 소나 주위에 오라가 생깁니다. 오라에 닿은 아군 챔피언들은 {p3}초 동안 <shield>{p4}의 피해를 흡수하는 보호막</shield>을 얻습니다.<br><br>부상당한 아군의 체력을 회복시키거나 이 보호막으로 다른 아군이 받을 피해를 {p5} 이상 흡수할 때마다 <keywordmajor>아첼레란도</keywordmajor> 중첩을 얻습니다.<br><br><keywordmajor>파워 코드 - 디미누엔도:</keywordmajor> 파워 코드는 대상이 가하는 물리 및 마법 피해 또한 {p6}초 동안 {p7} 감소시킵니다.", // 인내의 아리아
        "E": "<passive>사용 시:</passive> 소나가 새 <keywordmajor>멜로디</keywordmajor>를 연주하기 시작하여 {p1}초 동안 <speed>{p2}의 이동 속도</speed>를 얻습니다. 소나가 피해를 입지 않으면 최대 {p3}초까지 연장됩니다. <br><br><keywordmajor>멜로디:</keywordmajor> {p4}초 동안 소나 주위에 오라가 생깁니다. 오라에 닿은 아군 챔피언들은 {p5}초 동안 <speed>이동 속도가 {p6}</speed> 상승합니다.<br><br><keywordmajor>파워 코드 - 템포:</keywordmajor> 파워 코드는 대상을 {p7}초 동안 {p8} <status>둔화</status>시킵니다.", // 기민함의 노래
        "R": "소나가 저항할 수 없는 선율을 연주하여 적을 {p1}초 동안 <status>기절</status>시키고 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다.", // 크레센도
        "R_rules": "춤을 출 줄 아는 적들은 기절한 상태에서 춤을 춥니다.", // 구분선 아래 회색 글씨
    },
    "Soraka": { // 소라카
        "P": "소라카가 체력이 {p1}% 이하인 아군 챔피언 쪽으로 이동할 때 <speed>이동 속도가 {p2}%</speed> 상승합니다.", // 구원 — stringtable
        "Q": "소라카가 별을 떨어뜨려 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초 동안 {p3}% <status>둔화</status>시킵니다. <br><br>적 챔피언에게 적중하면 소라카가 <keywordmajor>별의 가호</keywordmajor>를 얻어 {p4}초에 걸쳐 <healing>체력을 {p5}</healing> 회복하고 <speed>이동 속도가 {p6}%</speed> 증가했다가 원래대로 돌아옵니다.", // 별부름
        "W": "소라카가 다른 아군 챔피언의 <healing>체력을 {p1}</healing>만큼 회복시킵니다.<br><br>소라카가 <keywordmajor>별의 가호</keywordmajor>를 받고 있으면 체력 소모량이 {p2}% 감소하며 대상도 {p3}초 동안 <keywordmajor>별의 가호</keywordmajor>를 받습니다.", // 은하의 마력
        "W_rules": "<rules>소라카의 체력이 {p4} 이하일 때는 사용할 수 없습니다.</rules>", // 구분선 아래 회색 글씨
        "E": "소라카가 별의 영역을 생성해 챔피언에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. 영역은 {p2}초 동안 유지되며 안에 있는 적을 <status>침묵</status>시킵니다. 영역이 사라지면 안에 있던 챔피언은 {p3}초 동안 <status>속박</status>되며 <magicdamage>{p1}의 마법 피해</magicdamage>를 입습니다.", // 별의 균형
        "R": "소라카가 신의 권능을 빌어 거리와 관계없이 모든 아군 챔피언의 <healing>체력을 {p1}</healing>만큼 회복시킵니다. 체력이 40% 아래인 대상에게는 회복 효과가 <healing>{p2}</healing>까지 증가합니다.", // 기원
    },
    "Shen": { // 쉔
        "P": "스킬을 시전하면 쉔이 {p1}초 동안 <shield>{p2}의 피해를 흡수하는 보호막</shield>을 얻습니다. 재사용 대기시간은 {p3}초이며 아군 또는 적 챔피언에게 스킬이 적중할 때마다 재사용 대기시간이 {p4}초 줄어듭니다.<br><br><keywordmajor>기의 검</keywordmajor>은 다른 스킬로 조종할 수 있습니다.", // 기 보호막 — stringtable
        "Q": "쉔이 <keywordmajor>기의 검</keywordmajor>을 불러냅니다. 기의 검에 부딪히는 적들은 {p1}초 동안 쉔으로부터 멀어지려 할 때 {p2}% <status>둔화</status>됩니다.<br><br>쉔의 다음 기본 공격 {p3}회는 <magicdamage>{p4}</magicdamage>+<magicdamage>최대 체력의 {p5}에 해당하는 마법 피해</magicdamage>를 추가로 입힙니다. <keywordmajor>기의 검</keywordmajor>이 적 챔피언에게 부딪힌 경우, <magicdamage>{p4}</magicdamage>+<magicdamage>최대 체력의 {p6}에 해당하는 마법 피해</magicdamage>를 입힙니다. 또한 <attackspeed>공격 속도가 {p7}%</attackspeed> 증가합니다.", // 황혼 강습
        "Q_rules": "<rules>정글 몬스터 상대로는 피해량이 {p8}% 증가합니다. (최대 피해량: <magicdamage>{p9}</magicdamage>)<br>구조물 상대로는 {p10}의 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "W": "쉔이 <keywordmajor>기의 검</keywordmajor> 위치에 {p1}초 동안 지속되는 보호 결계를 생성합니다. 결계 안의 아군 챔피언에 대한 기본 공격이 차단됩니다. <br><br>결계 안에 보호할 아군 챔피언이 없으면 {p2}초가 지나기 전까지 활성화되지 않습니다.", // 의지의 결계
        "E": "<passive>기본 지속 효과:</passive> <spellname>황혼 강습</spellname>이나 이 스킬로 피해를 입히면 <keywordmajor>{p1}의 기력</keywordmajor>을 회복합니다.<br><br><active>사용 시:</active> 쉔이 돌진해 적 챔피언과 정글 몬스터를 {p2}초 동안 <status>도발</status>하고 <physicaldamage>{p3}의 물리 피해</physicaldamage>를 입힙니다.", // 그림자 돌진
        "R": "아군 챔피언이 맵의 어느 위치에 있든 {p1}초간 대상이 잃은 체력에 비례해 <shield>{p2}</shield>~<shield>{p3}</shield>의 피해를 흡수하는 보호막을 씌워줍니다. (잃은 체력의 최대 60%) {p4}초 동안 정신을 집중한 후, 쉔과 <keywordmajor>기의 검</keywordmajor>이 해당 아군의 위치로 순간이동합니다.", // 단결된 의지
    },
    "Shyvana": { // 쉬바나
        "P": "챔피언, 대형 미니언 및 몬스터 처치 관여 시 쉬바나가 <spellname>미늘갑옷 </spellname> 중첩을 얻으며, 중첩 하나당 영구히 <scalearmor>방어력이 {p1}</scalearmor>, <scalemr>마법 저항력이 {p2}</scalemr> 증가합니다.<br><br><scalearmor>추가 방어력: {p3}</scalearmor><br><scalemr>추가 마법 저항력: {p4}</scalemr>", // 미늘갑옷 — stringtable
        "Q": "<passive>기본 지속 효과:</passive> 기본 공격 <onhit> 적중 시</onhit> <magicdamage>최대 체력의 {p1}만큼 마법 피해</magicdamage>를 입히고, 이 스킬의 재사용 대기시간이 {p2}초 감소합니다.<br><br><active>사용 시:</active> 쉬바나의 다음 기본 공격이 대상 및 주변 지역을 타격해 <physicaldamage>{p3}의 물리 피해</physicaldamage>를 입힙니다. 이 스킬은 공격 후 또는 잠시 후 {p4}초 안에 <recast>재사용</recast>할 수 있습니다.<br><br><keywordmajor>용 형상:</keywordmajor> 쉬바나가 추가로 1회 더 <recast>재사용</recast>할 수 있으며 다음 기본 공격 시 대상을 물어뜯어 <truedamage>{p5}의 고정 피해</truedamage>를 입힙니다.", // 잉걸불 일격
        "Q_rules": "<rules>몬스터에게는 {p6}의 추가 피해를 입힙니다.<br>최대 체력 비례 피해는 구조물에 적용되지 않으며, 챔피언이 아닌 대상에게는 {p7}~{p8}의 피해를 입힙니다.<br><keywordmajor>용 형상</keywordmajor>의 마지막 <recast>재사용</recast>에는 치명타가 적용되지 않습니다.</rules>", // 구분선 아래 회색 글씨
        "W": "쉬바나가 {p1}초 동안 화염으로 몸을 감싸 <shield>{p2}의 보호막</shield>을 얻습니다. 보호막 흡수량은 주변 적 챔피언 한 명당 <shield>{p3}</shield>만큼 증가합니다. 또한 <speed>이동 속도가 {p4}</speed> 증가하며, 적 챔피언에게 접근 시 <speed>{p5}</speed>까지 증가합니다.<br><br>효과가 종료되거나 <shield>보호막</shield>이 파괴되거나 스킬을 <recast>재사용</recast>할 경우 폭발하여 주변에 <magicdamage>{p6}의 마법 피해</magicdamage>를 입힙니다.<br><br><keywordmajor>용 형상:</keywordmajor> 폭발이 적 챔피언에게 적중하면 쉬바나가 <healing>{p7}+잃은 체력의 {p8}</healing>에 해당하는 체력을 회복합니다.", // 지옥불 방패
        "E": "쉬바나가 대상 지역에 화염구를 날려 <magicdamage>{p1}+최대 체력의 {p2}에 해당하는 마법 피해</magicdamage>를 입히고 <status>{p3}초 동안 {p4}만큼 둔화</status>시킵니다. 화염구가 적에게 적중하거나 한계에 도달하면 폭발합니다.<br><br><keywordmajor>용 형상:</keywordmajor> 쉬바나의 화염구가 더 커지고 적을 관통합니다. 챔피언 또는 대형 몬스터에게 적중하거나 한계에 도달하면 불의 파동을 일으켜 <magicdamage>{p5}+최대 체력의 {p6}에 해당하는 마법 피해</magicdamage>를 입히고 <status>{p3}초 동안 {p7}만큼 둔화</status>시킵니다. 화염구가 지나간 자리에 {p8}초 동안 흔적이 남아 <magicdamage>매초 {p9}의 마법 피해</magicdamage>를 입힙니다.", // 용암 분출
        "E_rules": "<rules>중첩된 <keywordmajor>용 형상</keywordmajor> 폭발은 {p10}의 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "R": "<passive>기본 지속 효과</passive>: 쉬바나가 기본 공격 또는 스킬로 적을 타격하면 <keywordmajor>용의 분노가 {p1}</keywordmajor> 생성됩니다. 용의 분노 생성량은 <keywordmajor>용 형상</keywordmajor>일 때 {p2} 증가하며, 챔피언이 아닌 대상에게 광역 피해를 입힐 때 {p3} 감소합니다.<br><br><active>사용 시</active>: 쉬바나가 <keywordmajor>용 형상</keywordmajor>으로 변신해 <attention>저지 불가</attention> 상태가 되고, 대상 위치로 날아가며 경로에 불을 내뿜습니다. 범위 내 적은 <magicdamage>{p4}의 마법 피해</magicdamage>를 입고 <status>{p5}초 동안 달아납니다</status>.<br><br>용 형상일 때 쉬바나의 기본 스킬이 강화됩니다. 또한 <scalehealth>{p6}의 추가 체력</scalehealth>을 얻고, 크기가 커지며, 공격 사거리가 증가합니다. 쉬바나는 지속적으로 <keywordmajor>용의 분노</keywordmajor>를 잃으며, 남은 <keywordmajor>용의 분노</keywordmajor>가 없을 경우 변신이 종료됩니다.", // 용의 강림
        "R_rules": "<rules>쉬바나는 궁극기 가속 1당 모든 요소로부터 얻는 분노가 {p7}% 증가합니다. 사망한 상태에서 얻은 궁극기 가속은 부활하기 전까지 이 효과를 발동하지 않습니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Smolder": { // 스몰더
        "P": "스킬로 챔피언을 맞히고 <spellname>초강력 화염 숨결</spellname> 스킬로 적을 처치하면 <spellname>용 훈련</spellname> 중첩을 1회 얻습니다. 중첩은 스몰더의 기본 스킬을 강화합니다.<br><li><spellname>초강력 화염 숨결</spellname>: <magicdamage>중첩의 {p1}에 해당하는 마법 피해</magicdamage>를 추가로 입히고 {p2}회, {p3}회, {p4}회 중첩 시 새로운 효과를 얻습니다.<li><spellname>에취!</spellname>: 폭발이 <magicdamage>중첩의 {p5}에 해당하는 마법 피해</magicdamage>를 추가로 입힙니다.<li><spellname>펄럭펄럭</spellname>: 적중할 때마다 <magicdamage>중첩의 {p6}에 해당하는 마법 피해</magicdamage>를 추가로 입히고 중첩이 {p7}회 쌓일 때마다 추가 번개를 얻습니다.", // 용 훈련 — stringtable. 끝의 "중첩을 {p8} 획득했습니다" 제거 (현재 상태값)
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "Q": [
            "스몰더가 불꽃을 내뿜어 <physicaldamage>{p1}의 물리 피해</physicaldamage>+<magicdamage><spellname>용 훈련</spellname> 중첩의 {p2}에 해당하는 마법 피해</magicdamage>를 입힙니다. 대상이 사망하면 스몰더가 스킬 사용 한 번당 <scalemana>{p3}의 마나</scalemana>를 돌려받습니다.<br><br>이 스킬은 <spellname>용 훈련</spellname> 중첩 수에 따라 진화하며 다음과 같은 효과를 얻습니다.",
            "<li><keywordmajor>{p4}회 중첩</keywordmajor>: 대상 주변의 모든 적에게 피해를 입힙니다.",
            "<li><keywordmajor>{p5}회 중첩</keywordmajor>: 이 스킬 피해량의 {p6}%만큼 피해를 입히는 폭발 <spellname>{p7}</spellname>개를 대상 너머로 날립니다.",
            "<li><keywordmajor>{p8}회 중첩</keywordmajor>: 대상을 불태우며 {p9}초에 걸쳐 <truedamage>대상 최대 체력의 {p10}%에 해당하는 고정 피해</truedamage>를 입힙니다. 불타는 동안 총 체력이 <truedamage>{p11}</truedamage> 밑으로 떨어지는 적 챔피언은 즉시 처치됩니다."
        ], // 초강력 화염 숨결
        "Q_rules": "<rules><spellname>초강력 화염 숨결</spellname> 스킬은 기본 공격으로 간주되며 적중 시 효과와 {p12}%의 생명력 흡수 효과를 적용합니다.<br>피해량은 치명타 확률 및 치명타 피해량에 따라 {p13}%만큼 증가합니다.<br>이 스킬은 사용할 때마다 각 대상에게 한 번씩만 피해를 입힐 수 있습니다.<br></rules>", // 구분선 아래 회색 글씨
        "W": "스몰더가 앙증맞은 불꽃 재채기를 내뿜어 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 {p2}초 동안 {p3}% <status>둔화</status>시킵니다.<br><br>챔피언에게 적중하면 폭발이 일어나며 <physicaldamage>{p4}의 물리 피해</physicaldamage>+<magicdamage><spellname>용 훈련</spellname> 중첩의 {p5}에 해당하는 마법 피해</magicdamage>를 입힙니다.", // 에취!
        "W_rules": "<rules>연속으로 일어나는 폭발이 각각 {p6}%의 피해를 입힙니다.<br>스몰더는 맞힌 챔피언당 <spellname>용 훈련</spellname> 중첩을 하나만 얻을 수 있습니다.</rules>", // 구분선 아래 회색 글씨
        "E": "스몰더가 하늘을 날며 {p1}초 동안 <speed>이동 속도가 {p2}%</speed> 증가하고 지형을 무시합니다.<br><br>스몰더는 비행하는 동안 체력이 가장 낮은 적을 <spellname>{p3}</spellname>(내림 적용)회 폭격해 공격 적중 시 <physicaldamage>{p4}의 물리 피해</physicaldamage>+<magicdamage><spellname>용 훈련</spellname> 중첩의 {p5}에 해당하는 마법 피해</magicdamage>를 입힙니다.", // 펄럭펄럭
        "E_rules": "<rules>이 스킬은 챔피언을 우선적으로 공격합니다.<br>스몰더는 비행하는 동안 시야가 확장됩니다.</rules>", // 구분선 아래 회색 글씨
        "R": "스몰더의 어미가 위에서 불을 내뿜어 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다. 중심에 있는 적은 그 대신 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입고 {p3}초 동안 {p4}% <status>둔화</status>됩니다.<br><br>스몰더의 어미가 스몰더를 맞히면 스몰더가 <healing>체력을 {p5}</healing> 회복합니다.", // 엄마아아아!
        "R_rules": "<rules>미니언과 몬스터에게는 {p6}%의 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Swain": { // 스웨인
        "P": "스웨인이 <spellname>제국의 눈</spellname>, <spellname>속박명령</spellname>, 적 챔피언 사망을 통해 <font color='#FF3F3F' size='18'>영혼 조각</font>을 획득합니다. <font color='#FF3F3F' size='18'>영혼 조각</font>을 모으면 <healing>최대 체력의 {p1}</healing>를 회복하고 영구적으로 스웨인의 <healing>최대 체력이 {p2}</healing> 증가합니다.", // 굶주린 새떼 — stringtable. 끝의 "수집한 영혼 조각 / 총 체력 획득량" 두 줄 제거 (현재 상태값)
        "Q": "스웨인이 섬뜩한 번개를 5개 방출해 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. 번개가 여러 번 적중하면 두 번째 번개부터 번개당 <magicdamage>{p2}의 마법 피해</magicdamage>를 추가로 입힙니다. (최대 <magicdamage>{p3}의 마법 피해</magicdamage>)", // 죽음의 손길
        "W": "스웨인이 악마의 눈을 소환해 1.5초 동안 일정 지역을 드러낸 후 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초 동안 {p3}% <status>둔화</status>시킵니다.<br><br>챔피언이 적중당하면 스웨인이 <font color='#FF3F3F' size='18'>영혼 조각</font>을 얻고 {p4}초 동안 적중당한 챔피언의 모습을 드러냅니다.", // 제국의 눈
        "W_rules": "<rules>미니언에게는 <magicdamage>{p5}의 피해</magicdamage>를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "E": [
            "스웨인이 악마의 파동을 발사합니다. 파동은 돌아오며 처음으로 적에게 부딪히는 순간 폭발해 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 대상 지역에 있는 적을 {p2}초 동안 <status>속박</status>합니다.",
            "챔피언을 <status>속박</status>하면 이 스킬을 다시 사용해 <spellname>속박명령</spellname>으로 <status>속박</status>된 모든 챔피언을 끌어당겨 챔피언 하나당 <font color='#FF3F3F' size='18'>영혼 조각</font> 하나를 획득할 수 있습니다."
        ], // 속박명령
        "E_rules": "<rules><spellname>속박명령</spellname>이 속박된 챔피언의 모습을 일시적으로 드러냅니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "R": [
            "스웨인이 악을 끌어내 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 매초 주변 적의 <healing>체력을 {p2}</healing> 흡수합니다. 악마의 기운은 시간이 지나면서 소진되지만 적 챔피언을 흡수해 무한히 충전할 수 있으며 챔피언 처치 관여 시 완전히 충전됩니다.",
            "{p3}초 후 그리고 {p4}초가 지날 때마다 스웨인이 변신 상태에서 <spellname>악의 불길</spellname>을 사용해 적에게 <magicdamage>{p5}의 마법 피해</magicdamage>를 입히고 {p6}% <status>둔화</status>시킬 수 있습니다. 둔화 효과는 {p7}초에 걸쳐 사라집니다."
        ], // 악의 승천
        "R_rules": "<rules>챔피언이 아닌 적을 상대로는 회복되는 체력이 <healing>{p8}%</healing>까지 감소합니다.<br>매초 악마의 기운이 {p9}씩 소진되며 {p10}초 후에는 {p11}씩 소진됩니다.<br>챔피언에게서 흡수하는 동안에는 악마의 기운을 매초 {p12}씩 회복합니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Skarner": { // 스카너
        "P": "스카너의 기본 공격, <spellname>부서진 대지</spellname>, <spellname>지반 돌출</spellname>, <spellname>꿰뚫기</spellname>가 {p1}초 동안 <keywordmajor>전율</keywordmajor>을 적용합니다. <keywordmajor>전율</keywordmajor>이 {p2}회 중첩된 적은 지속시간 동안 <magicdamage>최대 체력의 {p3}에 해당하는 마법 피해</magicdamage>를 입습니다.", // 진동의 가닥 — stringtable
        "Q": "스카너가 땅에서 바위를 뜯어내 다음 기본 공격 3회의 <attackspeed>공격 속도를 {p1}%</attackspeed> 강화하고 주변 적에게 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입힙니다. 마지막 기본 공격은 <physicaldamage>최대 체력의 {p3}%에 해당하는 물리 피해</physicaldamage>를 추가로 입히고 영향을 받은 적을 {p4}초 동안 {p5}% <status>둔화</status>시킵니다.<br><br><recast>재사용 시:</recast> 스카너가 이 스킬을 끝내고 바위를 던져 <physicaldamage>{p6}+최대 체력의 {p7}%에 해당하는 물리 피해</physicaldamage>를 입히고 추가로 처음 적중한 적과 그 주변에 있는 적을 {p8}초 동안 {p9}% <status>둔화</status>시킵니다.", // 부서진 대지/지반 돌출
        "Q_rules": "<rules>몬스터 대상 체력 비례 피해량은 최대 {p10}입니다.<br>이 스킬이 구조물에 {p11}%를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "W": "스카너가 {p1}초 동안 <shield>{p2}의 피해를 흡수하는 보호막</shield>을 얻으며 지진을 일으켜 주변 적에게 <magicdamage>{p3}의 마법 피해</magicdamage>를 입히고 {p4}초 동안 {p5}%의 <status>둔화</status> 효과를 적용합니다.", // 대지의 수호자
        "E": "스카너가 앞으로 돌진하며 지형을 무시하고 지정한 방향으로 움직입니다. 챔피언이나 대형 몬스터와 마주치면 돌진이 끝날 때까지 끌고 다닙니다.<br><br>끌고 온 적과 함께 벽에 부딪치면 해당 적은 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입고 {p2}초 동안 <status>기절</status>합니다.<br><br>스킬을 <recast>재사용</recast>하면 돌진을 일찍 끝낼 수 있습니다.", // 이쉬탈의 격돌
        "E_rules": "<rules>벽과 충돌하면 이 스킬의 재사용 대기시간이 {p3}%로 감소합니다.</rules>", // 구분선 아래 회색 글씨
        "R": "스카너가 꼬리를 앞으로 후려쳐 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 처음 적중한 챔피언 3명을 {p2}초 동안 <status>제압</status>합니다. 적중한 적은 스킬의 지속시간 동안 스카너를 따라 끌려다닙니다.<br><br>챔피언이 한 명이라도 적중하면 스카너의 <speed>이동 속도가 {p3}초 동안 {p4}%</speed> 증가합니다.<br><br><spellname>부서진 대지</spellname> 활성화 시 스카너가 <spellname>지반 돌출</spellname>부터 사용합니다.", // 꿰뚫기
    },
    "Sivir": { // 시비르
        "P": "시비르가 기본 공격이나 스킬로 적 챔피언을 공격해 피해를 입히면 <speed>{p1}의 이동 속도</speed>를 얻습니다. 이 효과는 {p2}초에 걸쳐 점차 감소합니다.<br>", // 재빠른 발놀림 — stringtable
        "Q": "시비르가 십자날 검을 부메랑처럼 던져서 관통하는 모든 적 챔피언에게 <physicaldamage>{p1}</physicaldamage>의 피해를 입힙니다. 챔피언이 아닌 대상에게는 순차적으로 감소된 피해를 입힙니다. 피해량은 최소 {p2}%까지 내려갈 수 있습니다.", // 부메랑 검
        "Q_rules": "<rules>십자날 검이 돌아올 때 피해량 감소는 초기화됩니다.<br>피해량은 치명타 확률 및 치명타 피해량에 따라 {p3}%만큼 증가합니다.<br>시전 시간은 공격 속도에 따라 감소합니다.</rules>", // 구분선 아래 회색 글씨
        "W": "{p1}초 동안 시비르가 <attackspeed>{p2}%의 공격 속도</attackspeed>를 획득하고 기본 공격이 강화되어 주위 적들에게 튕길 때마다 <physicaldamage>{p3}의 물리 피해</physicaldamage>를 입힙니다. 공격은 최대 {p4}회 튕깁니다.<br><br>공격이 치명타라면 튕긴 공격도 치명타를 가합니다.", // 튕기는 부메랑
        "W_rules": "<rules>새로운 대상을 우선 공격한 후 이미 공격한 대상에게 돌아갑니다. 각 대상에게 최대 두 번까지만 적중합니다.<br>미니언에게는 {p5}%의 피해를 입힙니다.</rules><br><rules>체력이 낮은 미니언을 즉시 처치합니다.</rules>", // 구분선 아래 회색 글씨
        "E": "시비르가 {p1}초간 주문 방어막을 만들어 적의 스킬을 막아냅니다. 적의 스킬을 방어하는 데 성공하면 시비르가 <healing>{p2}의 체력</healing>을 회복하고 재빠른 발놀림을 발동합니다.", // 주문 방어막
        "E_rules": "<rules>이 보호막은 챔피언과 아이템 스킬을 모두 방어합니다.</rules>", // 구분선 아래 회색 글씨
        "R": "시비르가 주위 아군을 이끌며 {p1}초 동안 <speed>이동 속도를 {p2}%</speed> 상승시킵니다.<br><br>사냥 개시 활성화 중 챔피언에게 기본 공격을 가하면 시비르의 기본 스킬 재사용 대기시간이 {p3}초 감소합니다.<br><br>최근 피해를 입힌 적 처치에 관여하면 사냥 개시의 지속시간이 초기화됩니다.", // 사냥 개시
    },
    "XinZhao": { // 신 짜오
        "P": "세 번째 기본 공격이나 <spellname>풍전참뢰</spellname>를 가할 때마다 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 추가로 입히고 <healing>체력을 {p2}</healing> 회복합니다.", // 결심 — stringtable
        "Q": "신 짜오의 다음 3번의 기본 공격은 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 추가로 입히고 다른 스킬의 재사용 대기시간을 1초 감소시킵니다. 또한 세 번째 기본 공격은 {p2}초 동안 <status>공중으로 띄워 올립니다</status>.<br>", // 삼조격
        "W": "신 짜오가 창을 가르며 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힌 뒤 그대로 찔러 <physicaldamage>{p2}</physicaldamage>의 피해를 입힙니다. 찌르기에 적중당한 적은 {p3}초 동안 {p4}% <status>둔화</status>됩니다. <br><br>찌르기에 적중당한 챔피언과 대형 몬스터는 적중 시 {p5}초 동안 <keywordmajor>도전</keywordmajor> 받은 상태가 되고 <keywordstealth>은신</keywordstealth> 상태가 아닌 한 모습이 드러납니다.", // 풍전참뢰
        "W_rules": "<rules>찌르기 피해는 신 짜오의 치명타 확률에 비례해 최대 {p6}%까지 증가합니다.<br>미니언에게는 {p7}%의 피해를 입힙니다.<br>각각의 공격에 생명력 흡수 효과는 33%씩 적용됩니다.</rules>", // 구분선 아래 회색 글씨
        "E": "신 짜오가 적에게 돌격해 근처의 적들에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고, {p2}초 동안 {p3}% <status>둔화</status>시킵니다.<br><br>{p4}초 동안 신 짜오의 <attackspeed>공격 속도가 {p5}</attackspeed> 증가합니다.<br><br><keywordmajor>도전</keywordmajor> 받은 적을 대상으로는 이 스킬의 사거리가 증가합니다.<br>", // 무쌍돌격
        "R": "<passive>기본 지속 효과:</passive> 신 짜오의 기본 공격 또는 <spellname>무쌍돌격</spellname>에 마지막으로 적중당한 적 챔피언은 {p1}초 동안 <keywordmajor>도전</keywordmajor> 받은 상태가 됩니다.<br><br><active>사용 시:</active> 신 짜오가 창을 휘둘러 적에게 <physicaldamage>{p2}+적 현재 체력의 {p3}%에 해당하는 물리 피해</physicaldamage>를 입히고 <keywordmajor>도전 받지 않은</keywordmajor> 적을 <status>뒤로 밀쳐냅니다</status>. <br> <br>이후 신 짜오가 {p4}초 동안 창이 닿는 거리 밖에 있는 적의 공격에 피해를 입지 않게 됩니다.", // 현월수호
        "R_rules": "<rules>정글 몬스터와 미니언 상대로는 최대 <physicaldamage>600의 피해</physicaldamage>를 입힙니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Syndra": { // 신드라
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "P": [
            "신드라가 <evolve>분노의 조각</evolve>을 최대 {p1}개까지 획득할 수 있습니다. 조각을 획득하면 신드라의 스킬이 강화되며 신드라가 적에게서 조각을 하나 획득할 때마다 <scalemana>마나를 {p2}</scalemana>씩 회복합니다.<br>신드라가 다음과 같은 방법으로 <evolve>분노의 조각</evolve>을 획득합니다.<li>{p3}초 안에 두 스킬로 적 챔피언에게 피해를 입히면 <evolve>조각 {p4}개</evolve> (재사용 대기시간 {p5}초)<li>스킬 포인트를 쓸 때마다 <evolve>조각 {p6}개</evolve><li>대형 미니언 처치 시 <evolve>조각 {p7}개</evolve>",
            "<evolve>분노의 조각</evolve>이 {p1}개 있으면 신드라의 <scaleap>주문력이 {p8}%</scaleap> 증가합니다."
        ], // 초월 — stringtable
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "Q": [
            "신드라가 <keywordmajor>어둠의 구체</keywordmajor>를 소환하여 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. <keywordmajor>어둠의 구체</keywordmajor>는 {p2}초간 유지되며 신드라의 다른 스킬로 움직일 수 있습니다.",
            "<evolve>분노의 조각 {p3}개</evolve>: 신드라가 <keywordmajor>어둠 구체</keywordmajor>를 {p4}개 저장할 수 있습니다."
        ], // 어둠 구체
        "Q_rules": "<rules>이 스킬은 이동하며 사용할 수 있습니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "W": [
            "신드라가 <keywordmajor>어둠 구체</keywordmajor>, 적 미니언, 혹은 에픽 몬스터를 제외한 몬스터를 잡아당기며 최대 5초 안에 <recast>재사용</recast>할 수 있습니다.<br><rules>지정 위치 주변 500 안에서 가장 가까운 대상을 잡습니다. 어둠 구체는 지속시간이 새로 고쳐지고, 미니언·몬스터는 정지 상태가 됩니다.</rules>",
            "<recast>재사용 시</recast>: 신드라가 물체를 던져 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초 동안 {p3}% <status>둔화</status>시킵니다.",
            "<evolve>분노의 조각 {p4}</evolve>개: 이 스킬이 <truedamage>{p5}의 고정 피해</truedamage>를 추가로 입힙니다."
        ], // 의지의 힘
        "W_rules": "<rules>대상을 지정하지 않은 경우에는 가장 가까이 있는 <keywordmajor>어둠 구체</keywordmajor>를 잡습니다.<br>이 스킬은 이동하며 사용할 수 있습니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "E": [
            "신드라가 힘의 파동을 발사하여 적들을 <status>밀어내고</status> <keywordmajor>어둠 구체</keywordmajor>에 충돌한 모든 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다.<br>밀려난 <keywordmajor>어둠 구체</keywordmajor>는 적들을 {p2}초 동안 <status>기절</status>시키고 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다.",
            "<evolve>분노의 조각 {p3}개</evolve>: 이 스킬의 폭이 증가하며 {p4}초 동안 적을 <status>{p5}%</status> <status>둔화</status>시킵니다."
        ], // 적군 와해
        "E_rules": "<rules>적들은 스킬 사용 한 번당 한 번만 피해를 입고 뒤로 밀려납니다.<br></rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "R": [
            "<passive>기본 지속 효과</passive>: <spellname>풀려난 힘</spellname>의 레벨 하나당 <spellname>어둠 구체</spellname>의 스킬 가속이 {p1}씩 추가로 증가합니다.<br>신드라가 엄청난 파멸의 힘을 끌어내어 신드라 주위를 도는 <keywordmajor>어둠 구체</keywordmajor> 3개와 주변 어둠 구체 4개를 적 챔피언에게 보냅니다. 각 <keywordmajor>어둠 구체</keywordmajor>는 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다. (최대 <magicdamage>{p3}의 마법 피해</magicdamage>)",
            "<evolve>분노의 조각 {p4}개</evolve>: 이 스킬이 체력이 {p5}% 미만인 적을 <danger>처형</danger>합니다."
        ], // 풀려난 힘
    },
    "Singed": { // 신지드
        "P": "신지드가 근처 아군 챔피언이나 적 챔피언을 회피하며 {p1}초 동안 <speed>이동 속도가 {p2}%</speed> 증가합니다. 이 효과에는 챔피언당 {p3}초의 재사용 대기시간이 적용됩니다.", // 독성 급류 — stringtable
        "Q": "<toggle>활성화/비활성화:</toggle> 신지드가 초당 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히는 맹독의 자취를 남깁니다.", // 맹독의 자취
        "Q_rules": "<rules>바람 지속시간: {p2}초.<br>맹독 지속시간: {p3}초.<br>예상 총 피해량: <magicdamage>{p4}의 마법 피해</magicdamage><br>맹독의 자취 영향을 받는 동안 미니언이 미니언 피해로 죽으면 신지드가 처치한 것으로 간주됩니다.</rules>", // 구분선 아래 회색 글씨
        "W": "신지드가 끈적한 액체가 든 통을 던져 해당 지역에 있는 적을 {p1}초 동안 {p2}% <status>둔화</status>시키고 <status>이동 스킬을 사용할 수 없게</status> 합니다.", // 초강력 접착제
        "E": "신지드가 어깨 너머로 적을 던져 <magicdamage>{p1}+최대 체력의 {p2}%에 해당하는 마법 피해</magicdamage>를 입힙니다.<br><br>신지드가 <spellname>초강력 접착제</spellname> 안으로 대상을 던져 넘기면 대상이 {p3}초 동안 <status>속박</status>됩니다.", // 던져넘기기
        "E_rules": "<rules>미니언과 정글 몬스터가 대상일 때 최대 체력 비례 피해는 최대 300까지 입힐 수 있습니다.</rules>", // 구분선 아래 회색 글씨
        "R": "신지드가 화학 약품을 마셔 {p1}초 동안 <scaleap>주문력</scaleap>, <scalearmor>방어력</scalearmor>, <scalemr>마법 저항력</scalemr>, <speed>이동 속도</speed>, <healing>체력 재생력</healing>, <scalemana>마나 재생력</scalemana>이 {p2} 증가합니다. 지속시간 동안 <spellname>맹독의 자취</spellname>가 {p3}초 동안 {p4}%의 고통스러운 상처를 남깁니다.", // 광기의 물약
    },
    "Thresh": { // 쓰레쉬
        "P": "쓰레쉬가 처치된 적 근처로 지나가면 적의 <keywordmajor>영혼</keywordmajor>을 흡수합니다. 흡수된 <keywordmajor>영혼</keywordmajor>은 영구적으로 쓰레쉬의 방어력을 <scalearmor>{p1}</scalearmor>, 주문력을 <scaleap>{p1}</scaleap>만큼 올려줍니다.", // 지옥살이 — stringtable
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "Q": [
            "쓰레쉬가 낫을 던져 첫 번째로 맞힌 대상을 <status>기절</status>시키고 {p1}초간 자신 쪽으로 <status>당겨</status> 옵니다. 대상에게 <magicdamage>{p2}의 마법 피해</magicdamage>를 입히고 지속시간 동안 <keywordstealth>절대 시야</keywordstealth>를 얻습니다.",
            "이 스킬을 <recast>재사용</recast>하면 쓰레쉬가 잡힌 적 쪽으로 끌려갑니다.<br><br>이 스킬로 적을 맞히면 재사용 대기시간이 {p3}초 감소합니다."
        ], // 사형 선고
        "W": "쓰레쉬가 지정한 위치에 랜턴을 던지고 아군이 랜턴을 클릭하면 쓰레쉬에게 돌진합니다.<br><br>랜턴을 가장 먼저 붙잡는 아군 하나와 쓰레쉬가 {p1}초간 <shield>{p2}의 피해를 흡수하는 보호막</shield>을 얻습니다.", // 어둠의 통로
        "W_rules": "<rules><shield>보호막의 흡수량</shield>은 쓰레쉬가 흡수한 <keywordmajor>영혼</keywordmajor>의 수에 비례합니다. 쓰레쉬는 랜턴을 사용해 <keywordmajor>영혼</keywordmajor>을 획득할 수 있습니다.</rules>", // 구분선 아래 회색 글씨
        "E": "<passive>기본 지속 효과:</passive> 기본 공격 시 마지막 공격 이후 공격을 하지 않고 있는 시간에 비례하여 추가 마법 피해를 입힙니다. <magicdamage>{p1}</magicdamage>~<magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다.<br><br><active>사용 시:</active> 사슬을 휘둘러 휘두른 방향으로 적을 <status>당기거나</status> <status>밀어냅니다</status>. 적중한 적은 {p3}초 동안 {p4}% <status>둔화</status>되고 <magicdamage>{p5}의 마법 피해</magicdamage>를 입습니다.", // 사슬 채찍
        "E_rules": "<rules>기본 지속 효과 피해량은 흡수한 <keywordmajor>영혼</keywordmajor>의 수에 비례합니다.</rules>", // 구분선 아래 회색 글씨
        "R": "쓰레쉬가 영혼 감옥을 생성합니다. 장벽을 통과하는 적 챔피언은 {p1}초 동안 {p2}% <status>둔화</status>되고 <magicdamage>{p3}의 마법 피해</magicdamage>를 입습니다. 충돌하면 벽은 허물어집니다. 벽 하나가 무너지면 나머지 벽은 피해를 입히지 않고 <status>둔화</status> 지속시간이 절반만 적용됩니다.", // 영혼 감옥
    },
    "Ahri": { // 아리
        "P": "미니언이나 몬스터를 처치하면 아리가 정기 조각을 얻습니다. 조각을 {p1}개 모으면 전부 소모해 <healing>체력을 {p2} 회복</healing>합니다.<br><br>아리가 적 챔피언에게 피해를 입힌 후 {p3}초 안에 해당 챔피언 처치에 관여하면 그 정기를 삼켜 <healing>체력을 {p4} 회복</healing>합니다.", // 정기 흡수 — stringtable
        "Q": "아리가 구슬을 던진 후 다시 받습니다. 던질 때는 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히며 돌아올 때는 <truedamage>{p1}의 고정 피해</truedamage>를 입힙니다.", // 현혹의 구슬
        "W": "아리가 근처 적에게 날아가는 여우불 세 개를 방출하여 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. 첫 번째 여우불이 적중한 후에는 <magicdamage>{p2}의 피해</magicdamage>로 감소합니다. 또한 <speed>이동 속도가 {p3}%</speed> 증가했다가 {p4}초에 걸쳐 원래대로 돌아옵니다.", // 여우불
        "W_rules": "<rules>여우불은 <spellname>매혹</spellname>에 적중한 챔피언, 아리가 공격한 적, 이외 챔피언 순으로 공격합니다. 체력이 {p5}% 이하인 미니언은 {p6}%의 피해를 입습니다.</rules><br>", // 구분선 아래 회색 글씨
        "E": "아리가 입맞춤을 날려 첫 번째로 맞는 적을 {p1}초 동안 <status>매혹</status>하고 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다.", // 매혹
        "E_rules": "<rules>적을 <status>쓰러뜨리는</status> 스킬입니다.</rules>", // 구분선 아래 회색 글씨
        "R": "아리가 민첩하게 질주하며 근처 적(챔피언 우선)에게 혼령의 정기 {p1}개를 쏘아내 정기 하나당 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다. <spellname>혼령 질주</spellname>는 {p3}초 안에 최대 2회까지 <recast>재사용</recast>할 수 있습니다.<br><br>이 기간에 <spellname>정기 흡수</spellname> 효과로 챔피언의 정기를 삼키면 <spellname>혼령 질주</spellname> 재사용 가능 횟수가 1회 증가하며 (최대 {p4}회) 지속시간이 최대 {p5}초 늘어납니다.", // 혼령 질주
    },
    "Amumu": { // 아무무
        "P": "아무무의 기본 공격을 받은 대상은 {p1}초 동안 <keywordmajor>저주</keywordmajor>에 걸려 마법 피해를 입을 때마다 <truedamage>{p2}%의 고정 피해</truedamage>를 추가로 받습니다.", // 저주의 손길 — stringtable
        "Q": "아무무가 붕대를 던져 처음 적중한 적에게 붕대를 당겨 다가간 뒤 {p1}초 동안 <status>기절</status>시키고 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다.<br><br>이 스킬은 2회까지 충전됩니다.", // 붕대 던지기
        "W": "<toggle>활성화/비활성화:</toggle> 아무무가 울기 시작하여 매초 근처 적에게 <magicdamage>{p1}+최대 체력의 {p2}%에 해당하는 마법 피해</magicdamage>를 입히고 <keywordmajor>저주</keywordmajor>를 초기화합니다.", // 절망
        "E": "<passive>기본 지속 효과:</passive> 아무무가 받는 물리 피해가 {p1} 감소합니다. 아무무가 기본 공격에 맞으면 이 스킬의 재사용 대기시간이 {p2}초 감소합니다.<br><br><active>사용 시:</active> 아무무가 짜증을 내며 주변 적에게 <magicdamage>{p3}의 마법 피해</magicdamage>를 입힙니다.", // 짜증내기
        "E_rules": "<rules>{p4}% 아래의 공격에는 피해량 감소 효과가 적용되지 않습니다.</rules>", // 구분선 아래 회색 글씨
        "R": "아무무가 붕대를 내던져 {p1}초 동안 <status>기절</status>시키고, <magicdamage>{p2}의 마법 피해</magicdamage>를 입히고, <keywordmajor>저주</keywordmajor>를 내립니다.", // 슬픈 미라의 저주
        "R_rules": "<rules>적을 <status>쓰러뜨리는</status> 스킬입니다.</rules>", // 구분선 아래 회색 글씨
    },
    "AurelionSol": { // 아우렐리온 솔
        "P": "아우렐리온 솔이 스킬로 피해를 입히면 스킬을 강화하는 <font color='#3458eb'>별가루</font>를 획득합니다.<li><spellname>빛의 숨결</spellname>: 폭발 시 <magicdamage>{p1}에 해당하는 마법 피해</magicdamage>를 추가로 입힙니다.</li><li><spellname>별의 비행</spellname>: 거리가 {p2} 증가합니다.</li><li><spellname>특이점</spellname>: 범위가 {p3} 증가하고 처형 기준값이 <scalehealth>{p4}</scalehealth> 증가됩니다.</li><li><spellname>유성 및 천상 강림</spellname>: 범위가 {p5} 증가합니다.</li>", // 우주의 창조자 — stringtable. 끝의 "획득한 별가루: {p6}" 제거 (현재 상태값)
        "Q": "아우렐리온 솔이 최대 {p1}초 동안 성운파를 뿜어내 처음 적중하는 적에게 초당 <magicdamage>{p2}의 마법 피해</magicdamage>를 입히고 주변에 있는 적에게 {p3}%의 피해를 입힙니다.<br><br>같은 적에게 1초 동안 성운파를 뿜을 때마다 <magicdamage>{p4}의 마법 피해</magicdamage>+<magicdamage>최대 체력의 {p5}에 해당하는 마법 피해</magicdamage>를 입히고 대상이 챔피언인 경우 <font color='#3458eb'>별가루 {p6}개</font>를 흡수합니다.", // 빛의 숨결
        "Q_rules": "<rules>이 스킬의 사거리는 {p7}입니다.<br>이 스킬을 사용하고 0.25초 안에 취소하면 1초 동안 스킬이 잠깁니다.<br>최소 마나 비용은 {p8}입니다.<br>비례 피해량은 정글 몬스터를 상대로 최대 <magicdamage>{p9}의 마법 피해</magicdamage>를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "W": [
            "아우렐리온 솔이 한 방향으로 날아갑니다. 비행 중에는 <spellname>빛의 숨결</spellname>의 재사용 대기시간과 최대 정신 집중 시간이 없으며 기본 피해량이 {p1}% 증가합니다.<br>챔피언에게 피해를 입힌 후 {p2}초 안에 처치에 관여하면 이 스킬의 재사용 대기시간을 {p3}%만큼 돌려받습니다.",
            "<recast>재사용 시:</recast> 비행을 일찍 종료합니다."
        ], // 별의 비행
        "W_rules": "<rules>비행 중 <spellname>빛의 숨결</spellname>을 사용하면 비행 속도가 50% 감소합니다.<br>비행 속도는 {p4}입니다.</rules>", // 구분선 아래 회색 글씨
        "E": "아우렐리온 솔이 적에게 초당 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히며 {p2}초 동안 적을 천천히 중심으로 <status>끌어당기는</status> 블랙홀을 소환합니다. 블랙홀의 중심에 있는 적 중 <scalehealth>최대 체력이 {p3}%</scalehealth> 미만인 적은 즉사합니다.<br><br>블랙홀 안에 있는 적이 죽거나 적 챔피언이 안에 있을 때 블랙홀이 매초 <font color='#3458eb'>별가루</font>를 흡수합니다.", // 특이점
        "E_rules": "<rules>이 스킬의 시전 사거리는 {p4}입니다.<br>안에 있는 공격로 미니언과 정글 몬스터는 <speed>이동 속도가 0</speed>이 됩니다.<br>에픽 몬스터는 처형할 수 없습니다.<br>챔피언에게서 매초 <font color='#3458eb'>별가루 {p5}개</font>를 흡수합니다.<br>블랙홀 안에서 사망하는 유닛에게서 <font color='#3458eb'>별가루</font>를 흡수합니다.<li>챔피언: <font color='#3458eb'>별가루 {p6}개</font></li><li>에픽 몬스터: <font color='#3458eb'>별가루 {p7}개</font></li><li>대형 몬스터: <font color='#3458eb'>별가루 {p8}개</font></li><li>공성 미니언: <font color='#3458eb'>별가루 {p9}개</font></li><li>미니언 및 작은 몬스터: <font color='#3458eb'>별가루 {p10}개</font></li></rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "R": [
            "아우렐리온 솔이 하늘에서 별을 뽑아 땅으로 떨어뜨려 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고, 적을 {p2}초 동안 <status>기절</status>시키고, 적중한 챔피언 하나당 <font color='#3458eb'>별가루 {p3}개</font>를 흡수합니다.<br><font color='#3458eb'>별가루 {p4}개</font>를 모으면 다음 <spellname>유성</spellname>을 <spellname>천상 강림</spellname>으로 바꿉니다.",
            "<spellname>천상 강림</spellname>: 아우렐리온 솔이 우주에서 별자리 하나만큼의 분노를 내려 넓은 범위에 있는 적에게 <magicdamage>{p5}의 마법 피해</magicdamage>를 입히고, 적중한 적을 {p2}초 동안 <status>공중으로 띄워 올립니다</status>. 또한, 거대한 충격파를 퍼뜨려 챔피언과 에픽 몬스터에게 <magicdamage>{p6}의 마법 피해</magicdamage>를 입히고 적중한 모든 적을 1초 동안 {p7}% <status>둔화</status>시킵니다."
        ], // 유성 / 천상 강림
        "R_rules": "<rules><spellname>천상 강림</spellname>에 필요한 <font color='#3458eb'>별가루</font>: <font color='#3458eb'>{p4}</font></rules>", // 구분선 아래 회색 글씨
    },
    "Ivern": { // 아이번
        "P": "아이번은 에픽 몬스터를 제외한 몬스터를 공격하지 않습니다. 대신 마우스 오른쪽 버튼으로 몬스터를 누르면 <healing>{p1}의 체력</healing>과 <scalemana>{p2}의 마나</scalemana>를 소모하여 자라나는 <font color='#55FF00'>수풀</font>을 만듭니다.<br><br><font color='#55FF00'>수풀</font>:<li> {p3}초에 걸쳐 성장합니다<li> 아이번은 완전히 성장한 수풀을 수확해 캠프를 해방하고 골드와 경험치를 얻을 수 있습니다<li> 또한, 아이번은 <spellname>강타</spellname>를 <font color='#55FF00'>수풀</font>에 사용해 즉시 성장시켜 캠프를 해방하고 골드와 경험치를 얻을 수 있습니다", // 숲의 친구 — stringtable
        "Q": "아이번이 덩굴뿌리를 던져 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 처음으로 적중한 적을 {p2}초 동안 <status>속박</status>합니다. <status>속박된</status> 적을 공격한 아군은 공격 사거리 안으로 돌진합니다. <br><br><recast>재사용 시:</recast> 아이번이 <status>속박</status>된 적에게 바로 돌진합니다.<br><br><rules>에픽 몬스터를 제외한 몬스터에게 적중하면 <spellname>덩굴뿌리</spellname> 재사용 대기시간이 50% 감소합니다.</rules>", // 덩굴뿌리
        "W": "<passive>기본 지속 효과:</passive> 아이번이 수풀 속에 있거나 수풀을 떠난 후 {p1}초 안에 기본 공격 시 <magicdamage>{p2}의 마법 피해</magicdamage>를 추가로 입힙니다. 주변의 아군이 {p3}초 동안 이 효과를 얻고 <magicdamage>{p4}의 마법 피해</magicdamage>을 입힙니다.<br><br><active>사용 시:</active> 아이번이 {p5}초 동안 유지되는 수풀을 심습니다. 수풀은 아이번의 팀이 수풀 내에서 시야를 잃을 때까지 또는 최대 {p6}초 동안 유지됩니다.", // 수풀 가꾸기
        "E": "아이번이 아군이나 데이지에게 <shield>{p1}의 피해를 흡수하는 보호막</shield>을 씌웁니다. 보호막은 {p2}초 후 폭발하며 적에게 <magicdamage>{p3}의 마법 피해</magicdamage>를 입히고 {p4}초 동안 {p5}% <status>둔화</status>시킵니다.<br><br>보호막이 유지되는 동안 <spellname>보호의 씨앗</spellname>이 폭발했지만 적중한 적이 없으면 해당 아군이 {p2}초 동안 <shield>{p1}</shield>의 피해를 흡수하는 보호막을 얻습니다.", // 보호의 씨앗
        "E_rules": "<rules>데이지에게도 사용할 수 있습니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "R": [
            "아이번이 파수꾼 친구 데이지를 소환해 {p1}초 동안 함께 전투합니다.<br><active>데이지, 후려쳐!:</active> 데이지가 같은 챔피언이나 에픽 몬스터를 연속으로 세 번 공격하면 충격파를 일으켜 적중한 모든 적에게 <magicdamage>{p2}의 마법 피해</magicdamage>를 입히고 {p3}초 동안 <status>공중으로 띄워 올립니다</status>. 이 효과는 {p4}초에 한 번씩만 발생할 수 있습니다.",
            "<recast>재사용 시:</recast> 데이지에게 공격 또는 이동을 지시합니다."
        ], // 데이지!
        "R_rules": "<rules>데이지 능력치:<br><healing>체력 {p5}</healing><br><scalearmor>방어력 {p6}</scalearmor><br><scalemr>마법 저항력 {p6}</scalemr><br><scalead>공격력 {p7}</scalead></rules>", // 구분선 아래 회색 글씨
    },
    "Azir": { // 아지르
        "P": "아지르는 무너진 포탑 위에 <keywordmajor>태양 원판</keywordmajor>을 소환할 수 있습니다. <keywordmajor>태양 원판</keywordmajor>은 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}의 <scalearmor>방어력</scalearmor>과 <scalemr>마법 저항력</scalemr>을 가지며 {p3}초에 걸쳐 붕괴합니다.", // 슈리마의 유산 — stringtable
        "Q": "아지르가 모든 <keywordmajor>모래 병사</keywordmajor>를 지정한 위치로 보냅니다. 모래 병사는 통과한 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히며 1초 동안 {p2}% <status>둔화</status>시킵니다.", // 사막의 맹습
        "Q_rules": "<rules>여러 명의 <keywordmajor>모래 병사</keywordmajor>가 적을 맞혀도 추가 피해는 입히지 못합니다.</rules>", // 구분선 아래 회색 글씨
        "W": "아지르가 {p1}초 동안 <keywordmajor>모래 병사</keywordmajor> 하나를 소환합니다. <keywordmajor>모래 병사</keywordmajor> 근처에 있는 적을 공격하면 해당 병사에게 공격 명령을 내려 적이 있는 방향에 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다.<br><br>이 스킬은 {p3}회까지 충전됩니다.", // 일어나라!
        "W_rules": "<rules><keywordmajor>모래 병사</keywordmajor>는 아지르의 주 대상에게 기본 공격당 한 번, {p4}% 피해량의 적중 시 효과를 적용합니다.<br>여러 <keywordmajor>모래 병사</keywordmajor>가 같은 대상을 공격할 경우, 두 번째로 공격하는 모래 병사부터는 {p5}%의 피해를 입힙니다.<br><keywordmajor>모래 병사</keywordmajor>는 아지르의 공격 대상이 아닌 적에게 {p6}%의 피해를 입힙니다.<br>적 포탑 근처에서는 <keywordmajor>모래 병사</keywordmajor>가 두 배 빠르게 소멸됩니다.<br></rules>", // 구분선 아래 회색 글씨
        "E": "아지르가 {p1}초 동안 <shield>{p2}의 피해를 흡수하는 보호막</shield>을 얻고 <keywordmajor>모래 병사</keywordmajor> 중 하나에게 돌진하여 통과하는 적들에게 <magicdamage>{p3}의 마법 피해</magicdamage>를 입힙니다.<br><br>아지르가 적 챔피언과 부딪치면 그 자리에서 멈추고 <keywordmajor>모래 병사</keywordmajor> 중첩을 얻습니다.", // 신기루
        "R": "아지르가 무장한 병사들을 일렬 횡대로 소환하여 돌진시키며, 적들을 <status>밀어내고</status> <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. 병사들은 {p2}초 동안 남아 적의 길을 가로막습니다.", // 황제의 진영
    },
    "Akali": { // 아칼리
        "P": "아칼리가 적 챔피언에게 스킬을 적중시키면 해당 챔피언 주변에 4초 동안 고리가 나타납니다. 아칼리는 고리를 향해 이동할 때 <speed>이동 속도가 {p1}</speed> 증가합니다. 고리를 넘어가면 다음 기본 공격 시 사거리가 두 배로 증가하며 <magicdamage>{p2}의 마법 피해</magicdamage>를 추가로 입힙니다.", // 암살자의 표식 — stringtable
        "Q": "아칼리가 단검을 부채꼴 모양으로 던져 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 사거리 끝에 있는 적들을 {p2}초 동안 {p3}%만큼 <status>둔화</status>시킵니다.", // 오연투척검
        "W": "아칼리가 연막탄을 떨어뜨려 {p1}초 동안 지속되는 연막을 생성하고 <speed>이동 속도가 {p2}%</speed> 증가했다가 {p3}초에 걸쳐 원래대로 돌아옵니다.<br><br>황혼의 장막이 활성화된 동안 아칼리의 최대 기력이 {p4} 증가합니다. <br><br>아칼리는 연막 안에서 <keywordstealth>투명</keywordstealth> 상태가 됩니다.", // 황혼의 장막
        "W_rules": "<rules><keywordstealth>투명</keywordstealth> 상태의 유닛은 포탑이나 절대 시야로만 모습이 드러납니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "E": [
            "아칼리가 뒤로 공중제비를 돌며 표창을 던져 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 표창에 맞은 첫 번째 적이나 연막에 표식을 남깁니다. ",
            "한 번 더 <recast>재사용</recast>하면 표식을 남긴 대상에게 돌진해 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다."
        ], // 표창곡예
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "R": [
            "아칼리가 적 챔피언을 뛰어넘어 경로 내에 있는 모든 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다.",
            "{p2}초 후 <recast>재사용</recast>하면 적들을 관통하며 돌진하여 대상이 잃은 체력에 비례해 <magicdamage>{p3}</magicdamage>~<magicdamage>{p4}의 마법 피해</magicdamage>를 입힙니다."
        ], // 무결처형
        "R_rules": "<rules>체력이 {p5}% 이하인 대상에게는 최대 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Akshan": { // 아크샨
        "P": "아크샨이 기본 공격 후 두 번째 공격을 발사해서 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다. 두 번째 공격을 도중에 취소하면 <speed>이동 속도가 {p2}</speed> 증가했다가 {p3}초에 걸쳐 원래대로 돌아옵니다.<br><br>기본 공격 또는 스킬이 세 번째로 적중할 때마다 <magicdamage>{p4}의 마법 피해</magicdamage>를 추가로 입힙니다. 대상이 챔피언인 경우, {p5}초간 <shield>{p6}의 피해</shield>를 흡수하는 보호막을 얻습니다. (재사용 대기시간 {p7}초)<br><br>", // 비열한 싸움 — stringtable
        "Q": "아크샨이 부메랑을 던져 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다. 적에게 적중할 때마다 부메랑의 사거리가 증가합니다.<br><br>부메랑이 챔피언에게 적중하면 아크샨의 <speed>이동 속도가 {p2}</speed> 증가했다가 {p3}초에 걸쳐 원래대로 돌아옵니다.", // 복수의 부메랑
        "Q_rules": "<rules>챔피언이 아닌 대상에게는 {p4}%의 피해를 입힙니다. 부메랑에 맞은 적의 모습이 잠시 드러납니다.</rules>", // 구분선 아래 회색 글씨
        "W": "<passive>기본 지속 효과</passive>: 적 챔피언이 아군을 처치하면 60초 동안 <keywordmajor>악당</keywordmajor>이 됩니다. <keywordmajor>악당</keywordmajor>이 아크샨에게 피해를 입은 후 3초 안에 죽으면 아크샨이 100골드를 얻고 처치된 아군들을 부활시키며 다른 적의 <keywordmajor>악당</keywordmajor> 효과를 전부 없앱니다.<br><br><active>사용 시</active>: 아크샨이 2초간 <keywordstealth>위장</keywordstealth> 상태가 됩니다. 벽 근처나 수풀 안에 있으면 영구적으로 유지됩니다. 이렇게 <keywordstealth>위장</keywordstealth>한 상태에서 <keywordmajor>악당</keywordmajor>에게 다가갈 때 <speed>이동 속도가 80 / 90 / 100 / 110 / 120</speed>, <scalemana>잃은 마나 재생이 12%</scalemana> 증가합니다.", // 악당 처단 — {{키_{pN}}} 중첩 참조라 자동으로 못 푼다. stringtable spell_akshanw_tooltip_1(협곡 판본)을 손으로 풀어 넣었다
        "W_rules": "<rules><keywordstealth>위장</keywordstealth> 상태일 때는 적 챔피언의 감지 범위 안에 들어가지 않는 한 시야에 보이지 않습니다.<br>위장 상태에서는 <keywordmajor>악당</keywordmajor>에게 향하는 흔적이 생성됩니다.<br>아크샨이 살아 있을 때만 악당 효과로 이득을 볼 수 있습니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "E": [
            "<active>첫 사용 시:</active> 아크샨이 적중한 첫 번째 지형에 고정되는 갈고리총을 발사합니다.<br><active>두 번째 사용 시:</active> 아크샨이 갈고리에 매달려 이동하며 가장 가까운 적에게 연속으로 탄환을 발사해 한 발당 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다.",
            "<active>세 번째 사용 시:</active> 아크샨이 밧줄을 놓고 뛰어내리며 마지막 탄환을 발사합니다.<br>적 챔피언이나 지형에 부딪히면 영웅의 비상이 일찍 끝납니다.<br>챔피언 처치 관여 시 이 스킬의 재사용 대기시간이 초기화됩니다."
        ], // 영웅의 비상
        "E_rules": "<rules>아크샨이 <spellname>비열한 싸움</spellname>으로 표식을 남긴 챔피언을 우선적으로 공격합니다.<br>갈고리에 매달린 채 이동 중에는 적중 시 효과 피해량이 {p2}%로 적용됩니다.<br>피해량이 <attackspeed>추가 공격 속도의 {p3}%</attackspeed>만큼 증가합니다.<br>기본 공격 시 치명타가 적용될 수 있으며, 적용 시 <physicaldamage>{p4}의 물리 피해</physicaldamage>를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "R": "아크샨이 챔피언을 조준하고 최대 {p1}초간 총을 과충전해 탄환을 {p2}개까지 저장합니다.<br><br><recast>재사용 시:</recast> 아크샨이 저장한 탄환을 발사합니다. 각 탄환은 처음으로 적중한 적이나 구조물에 최소 <physicaldamage>{p3}의 물리 피해</physicaldamage>를 입힙니다. 피해량은 대상이 잃은 체력에 비례해 최대 <physicaldamage>{p4}의 물리 피해</physicaldamage>를 입힙니다.", // 인과응보
        "R_rules": "<rules>탄환은 미니언을 즉시 처형하며, 생명력 흡수 효과가 적용됩니다.<br>탄환의 피해량은 치명타 확률과 치명타 피해량에 따라 {p5}%만큼 증가합니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Aatrox": { // 아트록스
        "P": "아트록스의 기본 공격이 <magicdamage>최대 체력에 비례해 {p1}의 마법 피해</magicdamage>를 추가로 입히고 <healing>가한 피해량의 {p2}%만큼 체력</healing>을 회복합니다. 미니언을 상대로는 회복 효과가 {p3}%로 감소합니다. 이 효과에는 {p4}초의 재사용 대기시간이 있습니다.<br><br>기본 공격과 스킬이 챔피언이나 대형 정글 몬스터에게 적중하면 이 효과의 재사용 대기시간이 2초 감소합니다. <spellname>다르킨의 검</spellname> 끝이 적중하면 4초 감소합니다.", // 사신 태세 — stringtable
        // ★ 배열 = 하위 스킬을 파트로 쪼갠 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "Q": [
            "아트록스가 대검을 내리쳐 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다. 칼날 끝에 적중한 적은 잠깐 <status>공중으로 띄워 올려지며</status> <physicaldamage>{p2}</physicaldamage>의 피해를 입습니다.<br><rules>전방 직사각형 (625 x 180)</rules>",
            "<recast>2타</recast>: 범위가 넓은 사다리꼴로 바뀌고 피해량이 <b>25%</b> 증가합니다.<br><rules>전방 사다리꼴 (475, 폭 300~500)</rules>",
            "<recast>3타</recast>: 범위가 원형으로 바뀌고 피해량이 1타보다 <b>50%</b> 증가합니다.<br><rules>원형 (반지름 300)</rules>"
        ], // 다르킨의 검
        "Q_rules": "<rules>미니언에게는 {p3}의 피해를 입힙니다.<br>몬스터를 <status>공중에</status> 띄울 경우 지속시간이 두 배로 증가하고 {p4}의 추가 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "W": "아트록스가 사슬을 발사하여 처음 적중한 적을 {p1}초 동안 {p2}%만큼 <status>둔화</status>시키고 <physicaldamage>{p3}의 물리 피해</physicaldamage>를 입힙니다. 챔피언과 대형 정글 몬스터는 {p1}초 안에 해당 지역을 벗어나지 않으면 중심으로 <status>끌려가</status> 다시 같은 양의 피해를 입습니다.", // 지옥사슬
        "W_rules": "<rules>미니언에게는 두 배의 피해를 줍니다.</rules>", // 구분선 아래 회색 글씨
        "E": "<passive>기본 지속 효과:</passive> 아트록스가 챔피언에게 가한 피해의 <lifesteal>{p1}</lifesteal>만큼 체력을 회복합니다.<br><br><active>사용 시:</active> 아트록스가 돌진합니다. 이 스킬은 다른 스킬이 진행되는 동안 사용할 수 있습니다.", // 파멸의 돌진
        "R": "아트록스가 진정한 악마의 모습을 드러내 근처 미니언이 {p1}초 동안 <status>공포</status>에 떨게 하고 <speed>이동 속도가 {p2}%</speed> 증가했다가 {p3}초에 걸쳐 원래대로 돌아옵니다. 지속시간 동안 <scalead>공격력이 {p4}%</scalead>, <healing>자신에 대한 체력 회복 효과가 {p5}%</healing> 증가합니다.<br><br>챔피언 처치 관여 시 이 효과의 지속시간이 {p6}초 늘어나고 <speed>이동 속도</speed> 효과가 초기화됩니다.", // 세계의 종결자
        "R_rules": "<rules>지속시간은 {p3}초를 초과해 증가할 수 없습니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Aphelios": { // 아펠리오스
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "P": [
            "아펠리오스는 쌍둥이 누이 알룬이 만든 다섯 가지의 루나리 무기를 사용합니다. 한 번에 <b>주 무기</b>와 <b>보조 무기</b> 등 총 두 가지 무기를 사용할 수 있습니다. 각 무기는 고유의 기본 공격 및 [Q] 스킬을 가지고 있습니다.<br><br>각 무기에는 달빛 탄약이 <b>50</b>발씩 있으며 기본 공격과 [Q] 스킬 사용 시 소모합니다. 탄약을 모두 소모하면 그 무기는 대기열 맨 뒤로 이동하고, 다음 무기가 주 무기가 됩니다.<br><br>2레벨 도달 시 [Q] 스킬을 사용할 수 있으며 6레벨 도달 시 궁극기를 사용할 수 있습니다. 아펠리오스는 스킬 포인트로 스킬 레벨을 올리는 대신 영구 능력치를 획득합니다.<br><br><passive>무기별 기본 공격:</passive>",
            "<li><b><i><font color='#00e6b8'>만월총</font></i></b>: 공격 사거리가 <b>100</b> 증가합니다. 스킬에 맞은 적에게 <b>4.5</b>초 동안 표식을 남기며, 표식이 남은 적은 <b>1800</b> 사거리에서 보조 무기로 공격할 수 있습니다. 표식을 소모할 때마다 <physicaldamage>15 (+ 추가 공격력의 15%)의 추가 물리 피해</physicaldamage>를 입힙니다.</li>",
            "<li><b><i><font color='#e6005c'>절단검</font></i></b>: 입힌 피해량의 <healing>2 ~ 7.1% (레벨에 따라)</healing>만큼 체력을 회복합니다. (스킬로 입힌 피해는 <healing>5 ~ 17.75%</healing>) 체력이 가득 차 있으면 초과분이 <shield>10 ~ 160 (레벨에 따라) (+ 최대 체력의 6%)의 보호막</shield>이 됩니다.</li>",
            "<li><b><i><font color='#a64dff'>중력포</font></i></b>: 적을 <b>2.5</b>초 동안 <status>30% 둔화</status>시킵니다. <b>0.7</b>초 후 <b>10%</b>로 감소합니다.</li>",
            "<li><b><i><font color='#1a75ff'>화염포</font></i></b>: 첫 대상에게 <physicaldamage>총 공격력의 110%</physicaldamage>, 그 뒤 부채꼴 범위의 적에게 <physicaldamage>75 ~ 100% (레벨에 따라)</physicaldamage>의 피해를 입힙니다. (미니언은 <b>23 ~ 30%</b>)</li>",
            "<li><b><i><font color='#ffffcc'>반월검</font></i></b>: 반월검을 던지고 돌아올 때까지 공격할 수 없습니다. 돌아오지 않은 반월검이 쌓일수록 공격력이 증가합니다. (최대 <b>20</b>개, <physicaldamage>총 공격력의 138.5%</physicaldamage>까지)</li>"
        ], // 암살자와 예언자 — 무기 5종 설명으로 재작성 (2026-08-09). stringtable 원문의 "루나리 무기 순서" 블록은 현재 상태값이라 뺐다
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "Q": [
            "사용 중인 <b>주 무기</b>에 따라 다른 스킬을 사용합니다. 모든 [Q] 스킬은 달빛 탄약 <b>10</b>발과 <scalemana>마나 60</scalemana>을 소모합니다.",
            "<li><b><i><font color='#00e6b8'>만월총</font></i></b> — <spellname>달빛탄</spellname>: 지정한 방향으로 에너지 화살을 발사해 처음 맞은 적에게 <physicaldamage>70 ~ 160 (레벨에 따라) (+ 추가 공격력의 42 ~ 60% + 주문력의 100%)의 물리 피해</physicaldamage>를 입히고 표식을 남깁니다. (재사용 대기시간 <b>10 ~ 8</b>초, 사거리 <b>1450</b>)</li>",
            "<li><b><i><font color='#e6005c'>절단검</font></i></b> — <spellname>맹공</spellname>: <b>1.75</b>초 동안 <speed>이동 속도가 25% (+ 주문력 100당 10%)</speed> 증가하며 가장 가까운 적을 주 무기와 보조 무기로 자동 공격합니다. 공격 한 번당 <physicaldamage>총 공격력의 20 ~ 41% (레벨에 따라)</physicaldamage>의 피해를 입힙니다. (<b>6</b>회 + <attackspeed>추가 공격 속도</attackspeed> 100%당 <b>2</b>회, 재사용 대기시간 <b>10 ~ 8</b>초)</li>",
            "<li><b><i><font color='#a64dff'>중력포</font></i></b> — <spellname>월식</spellname>: <b><i><font color='#a64dff'>중력포</font></i></b>에 <status>둔화</status>된 모든 적에게 <magicdamage>50 ~ 140 (레벨에 따라) (+ 추가 공격력의 32 ~ 50% + 주문력의 70%)의 마법 피해</magicdamage>를 입히고 <b>1</b>초 동안 <status>속박</status>시킵니다. 거리 제한이 없습니다. (재사용 대기시간 <b>12 ~ 10</b>초)</li>",
            "<li><b><i><font color='#1a75ff'>화염포</font></i></b> — <spellname>황혼파</spellname>: <b>40°</b> 부채꼴 범위에 에너지 파동을 날려 <physicaldamage>20 ~ 110 (레벨에 따라) (+ 추가 공격력의 15 ~ 21% + 주문력의 70%)의 물리 피해</physicaldamage>를 입힌 뒤, 맞은 적 전원을 보조 무기로 공격해 <physicaldamage>총 공격력의 100%</physicaldamage>의 피해를 입힙니다. (재사용 대기시간 <b>9 ~ 6</b>초, 사거리 <b>650</b>)</li>",
            "<li><b><i><font color='#ffffcc'>반월검</font></i></b> — <spellname>파수탑</spellname>: 달의 파수탑을 설치합니다. 파수탑은 보조 무기를 복제해 가장 가까운 적을 <b>4</b>초 동안 공격하며, 공격 한 번당 <physicaldamage>35 ~ 125 (레벨에 따라) (+ 추가 공격력의 34 ~ 52% + 주문력의 50%)</physicaldamage>의 피해를 입힙니다. <b>20</b>초 동안 유지됩니다. (설치 사거리 <b>475</b>, 재사용 대기시간 <b>9 ~ 6</b>초)</li>"
        ], // 무기 스킬 — 무기별 Q 5종으로 재작성 (2026-08-09)
        "W": "주 무기와 보조 무기를 교체하여 장착합니다.", // 위상 변화
        "E": null,
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "R": [
            "챔피언에게 적중 시 폭발하는 달빛 에너지를 발사하여 주변 적에게 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다.<br><br>폭발 <b>0.3</b>초 후 적중한 모든 챔피언에게 하늘에서 공격이 쏟아져 <physicaldamage>총 공격력의 100%</physicaldamage>의 피해를 입히며, <onhit>적중 시</onhit> 효과가 적용됩니다.<br><br><passive>주 무기에 따른 추가 효과:</passive>",
            "<li><b><i><font color='#00e6b8'>만월총</font></i></b>: 강화된 표식을 남깁니다. 표식을 소모할 때마다 <physicaldamage>50 / 80 / 110의 추가 물리 피해</physicaldamage>를 입힙니다.</li>",
            "<li><b><i><font color='#e6005c'>절단검</font></i></b>: 적 챔피언을 한 명 이상 맞히면 <healing>체력을 250 / 350 / 450</healing> 회복합니다.</li>",
            "<li><b><i><font color='#a64dff'>중력포</font></i></b>: <status>둔화</status> 효과가 <b>99%</b>까지 증가하고, 이 둔화에 걸린 적은 <spellname>월식</spellname>으로 <b>1.35</b>초 동안 <status>속박</status>됩니다.</li>",
            "<li><b><i><font color='#1a75ff'>화염포</font></i></b>: 최초 폭발이 <physicaldamage>50 / 100 / 150 (+ 추가 공격력의 25%)의 추가 물리 피해</physicaldamage>를 입힙니다. 이후 공격이 대상마다 <b>400</b> 범위로 퍼집니다.</li>",
            "<li><b><i><font color='#ffffcc'>반월검</font></i></b>: 처음 맞힌 적 챔피언에게서 반월검 <b>5</b>개가 추가로 돌아옵니다. (총 <b>6</b>개)</li>"
        ], // 월광포화 — 주 무기별 추가 효과 5종 추가 (2026-08-09, 롤위키)
        "R_rules": "<rules>적중 시 효과를 적용합니다. 치명타는 기존 피해량의 {p3}만큼 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Alistar": { // 알리스타
        "P": "알리스타가 적 챔피언을 <status>기절시키거나,</status> <status>공중으로 띄워 올리거나, 뒤로 밀어내거나,</status> 적이 죽을 때마다 중첩을 얻습니다. {p1}회 중첩되면 알리스타가 포효하며 자신의 <healing>체력을 {p2}</healing>만큼 회복하고 근처 아군 챔피언의 <healing>체력을 {p3}</healing>만큼 회복시킵니다.<br><br>적 챔피언이나 에픽 정글 몬스터가 죽으면 이 스킬이 최대로 중첩됩니다.", // 승리의 포효 — stringtable
        "Q": "알리스타가 땅을 내리쳐 {p1}초 동안 적을 <status>공중으로 띄워 올리고</status> <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다.", // 분쇄
        "W": "알리스타가 적에게 박치기를 하여 <status>뒤로</status> <status>밀어내고</status> <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다.", // 박치기
        "E": "알리스타가 땅을 짓밟기 시작하며 유체화 상태가 되고 {p1}초에 걸쳐 근처 적에게 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다. 이 스킬로 챔피언에게 피해를 입힐 때마다 중첩이 1회 쌓입니다.<br><br>{p3}회 중첩되면 알리스타가 다음으로 챔피언을 기본 공격할 때 대상을 {p4}초 동안 <status>기절</status>시키고 <magicdamage>{p5}의 마법 피해</magicdamage>를 추가로 입힙니다.", // 짓밟기
        "E_rules": "<rules>유체화 상태인 유닛은 다른 유닛과 충돌하지 않습니다.</rules>", // 구분선 아래 회색 글씨
        "R": "알리스타가 즉시 모든 <status>방해</status> 효과를 없애고 {p1}초 동안 받는 피해가 {p2}% 감소합니다.", // 꺾을 수 없는 의지
    },
    "Ambessa": { // 암베사
        "P": "암베사가 스킬을 사용할 때 기본 공격 또는 이동 명령을 하면 암베사가 스킬을 사용한 후 명령을 내린 방향으로 돌진합니다.<br><br>이 스킬이 개시될 때마다 암베사에게 {p1}초 동안 충전이 부여됩니다. (최대: {p2}) 충전을 보유하고 있으면 <attention> 공격 사거리가 {p3}</attention>, <attackspeed> 공격 속도가 {p4}</attackspeed> 증가합니다. 기본 공격 시 충전을 하나 소모해 <physicaldamage>{p5}의 물리 피해</physicaldamage>를 입히고 <keywordmajor>{p6}의 기력</keywordmajor>을 회복합니다.", // 용사냥개의 발걸음 — stringtable
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "Q": [
            "<active>교활한 휩쓸기</active>: 암베사가 칼날로 전방을 휩쓸어 공격 범위 가장자리에 있는 적에게 <physicaldamage>{p1}+최대 체력의 {p2}에 해당하는 물리 피해</physicaldamage>를 입힙니다. 다른 모든 적에게는 {p3}의 피해를 입힙니다. 적에게 공격이 적중하면 <active>파멸의 일격</active>을 준비합니다.",
            "<active>파멸의 일격</active>: 암베사가 칼날로 내려찍어 처음 적중하는 적에게 <physicaldamage>{p4}+최대 체력의 {p5}에 해당하는 물리 피해</physicaldamage>를 입힙니다. 다른 모든 적에게는 {p6}의 피해를 입힙니다."
        ], // 교활한 휩쓸기 / 파멸의 일격
        "Q_rules": "<rules>몬스터에게는 <physicaldamage>{p7}의 물리 피해</physicaldamage>를 추가로 입힙니다.<br>몬스터 대상 최대 체력 비례 피해량은 최대 <physicaldamage>{p8}</physicaldamage>입니다.</rules>", // 구분선 아래 회색 글씨
        "W": "암베사가 {p1}초 동안 <shield>{p2}의 보호막</shield>을 얻고 {p3}초 동안 준비합니다. 이후 지면을 내리쳐 주변 적들에게 <physicaldamage>{p4}의 물리 피해</physicaldamage>를 입힙니다. 준비하는 동안 적 챔피언이나 대형 몬스터, 구조물에 피해를 받았다면 입히는 <physicaldamage>물리 피해가 {p5}</physicaldamage>로 증가합니다.", // 배척
        "E": "암베사가 사슬을 휘둘러 적에게 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 <status>{p2}%</status> <status>둔화</status>시킵니다. 둔화 효과는 {p3}초에 걸쳐 사라집니다. 이 스킬로 <spellname>용사냥개의 발걸음</spellname>이 개시되면 한 번 더 일격을 가합니다.", // 찢어 가르기
        "R": "<passive>기본 지속 효과</passive>: 암베사가 <armorpen>{p1}%의 방어구 관통력 </armorpen>을 얻으며 스킬 사용 시 <healing>입힌 피해량의 {p2}만큼 체력을 회복</healing>합니다.<br><br><active>사용 시</active>: 암베사가 <attention>저지 불가</attention> 상태가 되어 일직선상에서 가장 멀리 있는 적 챔피언에게 순간 이동한 후 대상을 {p3}초 동안 <status>제압</status>합니다. 이후 해당 적 챔피언을 지면에 내리쳐 <physicaldamage>{p4}의 물리 피해</physicaldamage>를 입히고 {p5}초 동안 <status>기절</status>시킵니다.", // 공개 처형
        "R_rules": "<rules>미니언을 대상으로는 회복 효과가 {p6}%로, 몬스터를 대상으로는 {p7}%로 감소합니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Annie": { // 애니
        "P": "애니가 스킬을 4회 사용하면 다음 공격 스킬이 {p1}초 동안 적을 <status>기절</status>시킵니다.<br><br>애니가 게임을 시작하고 <spellname>방화광</spellname>을 사용할 수 있는 상태로 재생성됩니다.", // 방화광 — stringtable
        "Q": "애니가 화염구를 던져 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. 대상이 사망하면 소모한 마나를 돌려받고 재사용 대기시간이 50% 감소합니다.", // 붕괴
        "W": "애니가 화염파를 발사하여 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다.", // 소각
        "E": "애니가 아군 챔피언에게 {p1}초 동안 <shield>{p2}의 피해를 흡수하는 보호막</shield>을 부여합니다. 보호막으로 인해 <speed>이동 속도가 {p3}</speed> 증가했다 {p4}초에 걸쳐 원래대로 돌아옵니다. 보호막이 지속되는 동안 해당 아군을 기본 공격이나 스킬로 공격한 적은 보호막당 한 번 <magicdamage>{p5}의 마법 피해</magicdamage>를 받습니다.<br><br>소환된 티버는 항상 <spellname>용암 방패</spellname>의 효과를 받습니다.", // 용암 방패
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "R": [
            "<passive>기본 지속 효과:</passive> 애니가 {p1}%의 마법 관통력을 얻습니다.<br>애니가 티버를 소환해 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다. 티버는 {p3}초간 주변 적을 불태워 <magicdamage>초당 {p4}의 마법 피해</magicdamage>를 입힙니다.<br>애니가 적 챔피언을 기절시키거나 사망하면 소환된 티버가 분노합니다. 티버는 분노 시 <attackspeed>공격 속도가 275%</attackspeed>, <speed>이동 속도가 100%</speed> 증가합니다. 이 효과는 3초에 걸쳐 원래대로 돌아옵니다.",
            "<recast>재사용 시:</recast> 티버를 직접 조종할 수 있습니다."
        ], // 소환: 티버
        "R_rules": "<rules>티버 능력치:<br><healing>체력 {p5}</healing><br><scalearmor>방어력 {p6}</scalearmor><br><scalemr>마법 저항력 {p6}</scalemr><br><scalead>공격력 {p7}</scalead></rules>", // 구분선 아래 회색 글씨
    },
    "Anivia": { // 애니비아
        "P": "애니비아는 치명적인 피해를 입으면 알 형태로 돌아가 체력을 완전히 회복하며, <scalearmor>방어력</scalearmor>과 <scalemr>마법 저항력</scalemr>이 <level>{p1}</level>만큼 변동됩니다. 알로 변한 뒤 6초 동안 살아남으면 환생합니다.", // 환생 — stringtable
        "Q": "애니비아가 거대한 얼음 덩어리를 발사해 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 적들을 {p2}초 동안 <keywordmajor>냉각</keywordmajor>하여 {p3}% <status>둔화</status>시킵니다. 사거리 끝에 다다르면 얼음이 폭발하며 적들을 {p4}초 동안 <status>기절</status>시키고 <magicdamage>{p5}의 마법 피해</magicdamage>를 입힙니다.<br><br>애니비아가 스킬을 <recast>재사용</recast>하면 얼음 덩어리가 일찍 폭발합니다.", // 냉기 폭발
        "W": "애니비아가 {p1} 너비의 얼음 벽을 만듭니다. 벽은 {p2}초 뒤 녹습니다.", // 결정화
        "E": "애니비아가 적에게 냉기의 바람을 날려 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. 적이 <keywordmajor>냉각</keywordmajor> 상태일 경우 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다.", // 동상
        "R": "<toggle>활성화/비활성화:</toggle> 애니비아가 {p1}초에 걸쳐 크기가 커지는 얼음의 폭풍우를 소환하여 적에게 <magicdamage>초당 {p2}의 마법 피해</magicdamage>를 입히고 {p3}% <status>둔화</status>시킵니다.<br><br>얼음 폭풍이 최대 크기가 되면 적들을 <keywordmajor>냉각</keywordmajor>하고 {p4}% <status>둔화</status>시키며, <magicdamage>초당 {p5}의 마법 피해</magicdamage>를 입힙니다.", // 얼음 폭풍
        "R_rules": "<rules>애니비아가 너무 멀어지면 폭풍이 멈춥니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Ashe": { // 애쉬
        "P": "애쉬의 기본 공격과 스킬이 대상을 {p1}초간 {p2}만큼 <status>둔화</status>시킵니다. 기본 공격이 {p3}의 피해를 입힙니다.<br><br>애쉬의 치명타는 추가 피해를 가하지 않는 대신 <status>둔화</status> 효과를 {p4}까지 늘려 줍니다. 둔화 효과는 점차 원래대로 돌아옵니다.", // 서리 화살 — stringtable
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "Q": [
            "<passive>기본 지속 효과: </passive>애쉬가 기본 공격 시 {p1}초 동안 유지되는 중첩이 1회 쌓입니다. {p2}회 중첩 시 이 스킬을 사용할 수 있습니다.",
            "<passive>사용 시:</passive> {p3}초 동안 애쉬의 <attackspeed>공격 속도가 {p4}%</attackspeed> 오르며 기본 공격이 <physicaldamage>{p5}의 피해</physicaldamage>를 입힙니다."
        ], // 궁사의 집중
        "Q_rules": "<rules>강화된 기본 공격은 5개의 작은 공격을 한꺼번에 퍼붓습니다. 적중 시 효과는 기본 공격당 한 번만 적용됩니다.</rules>", // 구분선 아래 회색 글씨
        "W": "애쉬가 {p1}개의 화살을 일제히 쏴 각각 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입힙니다. 적들은 일제 사격의 여러 화살에 맞을 수 있지만, 그중 첫 번째 화살에만 피해를 입습니다.", // 일제 사격
        "W_rules": "<rules>챔피언에게 적중되면 <spellname>서리 화살</spellname> 효과가 적용되는 치명타로 판정됩니다.</rules>", // 구분선 아래 회색 글씨
        "E": "애쉬가 매를 맵 어느 위치든 날려 보내 5초 동안 시야를 확보합니다. 매는 날아가는 동안 주변 지역을 드러냅니다.<br><br>이 스킬은 2회까지 충전됩니다. (재충전 시간 {p1}초)", // 매 날리기
        "R": "애쉬가 얼음 수정 화살을 발사하여 처음으로 맞힌 챔피언에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 <status>기절</status>시킵니다. <status>기절</status> 지속시간은 화살이 날아가는 거리에 비례하여 {p2}초까지 증가합니다. <spellname>서리 화살</spellname>에 맞은 주변 적들은 <status>둔화</status>됩니다.", // 마법의 수정화살
        "R_rules": "<rules><status>기절</status> 효과는 최소 {p3}초 지속됩니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Yasuo": { // 야스오
        "P": "<passive>결의:</passive> 이동 시 <keywordmajor>기류</keywordmajor>가 발생하여 야스오의 자원이 채워지며, 빠르게 움직일수록 <keywordmajor>기류</keywordmajor>가 더 빠르게 오릅니다. <keywordmajor>기류</keywordmajor>가 가득 차면 챔피언이나 몬스터에게서 피해를 입을 경우 잠시 <shield>{p1}의 피해를 흡수하는 보호막</shield>이 생성됩니다.<br><br><passive>의지:</passive> 야스오의 치명타 확률이 {p2}% 증가하지만, 치명타 피해량이 {p3}까지 감소합니다. 100%를 초과하는 치명타 확률 1%당 <physicaldamage>{p4}의 추가 공격력</physicaldamage>을 얻습니다.", // 낭인의 길 — stringtable
        "Q": "야스오가 검을 내질러 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다. 적중 시 {p2}초간 1회 중첩됩니다. 2회 중첩 시 이 스킬을 다시 사용하면 회오리바람을 날려 동일한 피해를 입히고 {p3}초 동안 <status>띄워 올립니다</status>.<br><br>돌진 도중 이 스킬을 사용할 경우 원형으로 타격합니다.", // 강철 폭풍
        "Q_rules": "<rules>이 스킬은 기본 공격으로 간주되어 치명타로 <physicaldamage>{p4}의 물리 피해</physicaldamage>를 입힐 수 있고 처음 맞힌 적에게 <onhit>적중 시</onhit> 효과와 생명력 흡수를 적용합니다. 또한 군중 제어기에 방해를 받으며 <attackspeed>공격 속도</attackspeed>로 재사용 대기시간과 시전 소요 시간을 단축할 수 있습니다.</rules>", // 구분선 아래 회색 글씨
        "W": "4초간 모든 적의 투사체를 막아주는 바람의 벽을 생성합니다.", // 바람 장막
        "W_rules": "<rules>포탑 공격과 광선은 막을 수 없습니다.</rules>", // 구분선 아래 회색 글씨
        "E": "대상을 뚫고 돌진하여 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. 이후 사용할 때마다 {p2}초간 돌진의 추가 피해량이 <magicdamage>{p3}</magicdamage>씩 상승하며, 이 효과는 최대 {p4}회 중첩됩니다.<br><br>이 스킬은 공격 대상별로 {p5}초의 재사용 대기시간이 적용됩니다.", // 질풍검
        "R": "야스오가 적 챔피언에게 순간이동하여 <status>공중</status>에 띄워 붙들어 두며 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 주변 모든 적을 {p2}초 더 <status>공중</status>에 붙들어 둡니다. <keywordmajor>기류</keywordmajor>가 최대치로 차는 대신, <spellname>강철 폭풍</spellname> 중첩을 모두 잃습니다.<br><br>이후 야스오의 치명타 공격이 {p3}초 동안 대상 <scalearmor>추가 방어력의 {p4}%</scalearmor>를 무시합니다.", // 최후의 숨결
    },
    "Ekko": { // 에코
        "P": "같은 대상에 대한 세 번째 기본 공격 및 스킬 공격마다 <magicdamage>{p1}의 마법 피해</magicdamage>를 추가로 입힙니다. 대상이 챔피언인 경우, {p2}초 동안 에코의 <speed>이동 속도가 {p3}</speed> 증가합니다. 이 효과는 동일 적에게 {p4}초에 한 번만 발동됩니다.", // Z 드라이브 공진 — stringtable
        "Q": "에코가 장치를 던져 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. 장치는 챔피언에게 맞거나 사거리 끝에 도달하면 역장을 펼쳐 안에 있는 적을 {p2}% <status>둔화</status>시킵니다. 이후 에코가 장치를 불러들이며 <magicdamage>{p3}의 마법 피해</magicdamage>를 입힙니다.", // 시간의 톱니바퀴
        "W": "<passive>기본 지속 효과:</passive> 에코의 기본 공격은 체력이 {p1}% 미만인 적에게 <magicdamage>잃은 체력의 {p2}에 해당하는 마법 피해</magicdamage>를 입힙니다.<br><br><active>사용 시:</active> 에코가 잠시 후 {p3}초 동안 유지되는 시간의 구체를 발사하여 안에 있는 적을 {p4}% <status>둔화</status>시킵니다. 에코가 구체 안에 들어가면 구체를 폭발시켜 {p5}초 동안 <status>기절</status>시키고 <shield>{p6}의 피해를 흡수하는 보호막</shield>을 얻습니다.", // 평행 시간 교차
        "W_rules": "<rules>추가 공격력은 미니언과 몬스터에게 최소 <magicdamage>{p7}</magicdamage>, 최대 <magicdamage>{p8}의 피해</magicdamage>를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "E": "에코가 돌진합니다. 다음 기본 공격이 강화되어 사거리가 늘어나고 에코가 대상 쪽으로 순간이동하며 <magicdamage>{p1}의 마법 피해</magicdamage>를 추가로 입힙니다.", // 시간 도약
        "E_rules": "<rules>에코는 돌진 중 다른 스킬을 사용할 수 있습니다.</rules>", // 구분선 아래 회색 글씨
        "R": "에코가 시간을 되돌려 경직 상태에 빠지며 4초 전에 있던 지점으로 되돌아가 근처의 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 <healing>체력을 {p2}</healing> 회복합니다. 회복량은 이 4초 동안 에코가 잃은 체력에 따라 증가하며, 잃은 체력 1%당 회복량이 {p3}% 증가합니다.", // 시공간 붕괴
        "R_rules": "<rules>에코가 <spellname>평행 시간 교차</spellname>의 구체를 통과하면 폭발합니다.</rules><br><rules>경직 상태에 빠진 유닛은 움직이거나 행동할 수 없으며 대상으로 지정할 수 없는 무적 상태가 됩니다.</rules>", // 구분선 아래 회색 글씨 — 원문의 [{p4}] 는 W 단축키 아이콘 자리(spell.EkkoW:HotKey)라 지웠다. 스킬 이름이 이미 어느 스킬인지 말해 준다
    },
    "Elise": { // 엘리스
        "P": "엘리스는 궁극기를 가지고 게임을 시작하여 <keywordmajor>인간 형태</keywordmajor>와 <keywordmajor>거미 형태</keywordmajor>로 변신할 수 있습니다.<br><br><keywordmajor>인간 형태:</keywordmajor> 엘리스의 스킬이 적에게 적중하면 휴면 상태의 <keywordmajor>새끼 거미</keywordmajor>를 얻습니다. (최대 {p1})<br><br><keywordmajor>거미 형태:</keywordmajor> 기본 공격 시 추가로 <magicdamage>{p2}의 마법 피해</magicdamage>를 입히고, <healing>{p3}의 체력</healing>을 회복합니다.", // 거미 여왕 — stringtable
        "Q": "<keywordmajor>인간 형태</keywordmajor>: 엘리스가 신경독을 주입해 <magicdamage>{p1}+대상 현재 체력의 {p2}에 해당하는 마법 피해</magicdamage>를 입힙니다.", // 신경독 / 독이빨
        "Q_rules": "<rules><keywordmajor>인간 형태</keywordmajor>와 <keywordmajor>거미 형태</keywordmajor>의 체력 비례 피해량은 몬스터를 상대로 최대 {p3}입니다.</rules>", // 구분선 아래 회색 글씨
        "W": "<keywordmajor>인간 형태</keywordmajor>: 엘리스가 폭발하는 새끼 거미를 소환하면, 지정한 위치로 이동해 근처에 적이 있을 때, 혹은 3초 뒤에 폭발합니다. 거미는 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다.", // 위험한 새끼 거미 / 광란의 질주
        "E": "<keywordmajor>인간 형태</keywordmajor>: 엘리스가 고치를 던져 처음 적중한 적을 {p1}초 동안 <status>기절</status>시키며, 위치를 드러냅니다.", // 고치 / 줄타기
        "R": "<keywordmajor>인간 형태</keywordmajor>: 엘리스가 위협적인 거미로 변신하여 근접 챔피언이 되며 <keywordmajor>거미 형태</keywordmajor> 스킬을 사용할 수 있고 휴면 상태의 <keywordmajor>새끼 거미</keywordmajor>를 모두 소환합니다.", // 거미 형태
        "Q2": "<keywordmajor>거미 형태:</keywordmajor> 엘리스가 적에게 돌진하고 독니로 깨물어 <magicdamage>{p1}+대상이 잃은 체력의 {p2}에 해당하는 마법 피해</magicdamage>를 입힙니다.", // 독이빨 — 거미 형태
        "Q2_rules": "<rules>독이빨은 대상에게 적중 시 효과를 한 번 적용합니다.</rules>", // 구분선 아래 회색 글씨
        "W2": "<keywordmajor>거미 형태</keywordmajor> <passive>기본 지속 효과</passive>: <keywordmajor>새끼 거미</keywordmajor>의 <attackspeed>공격 속도가 {p1}%</attackspeed> 증가합니다.<br><br><keywordmajor>거미 형태</keywordmajor> <active>사용 시:</active> {p2}초 동안 엘리스와 <keywordmajor>새끼 거미</keywordmajor>의 <attackspeed>공격 속도가 {p3}%</attackspeed> 증가합니다.", // 광란의 질주 — 거미 형태
        "E2": "<keywordmajor>거미 형태</keywordmajor>: 엘리스와 <keywordmajor>새끼 거미</keywordmajor>들이 공중으로 올라가 최대 2초까지 대상으로 지정할 수 없게 되며 엘리스가 대상으로 지정한 적에게 하강합니다. 하강 시 {p1}초 동안 <spellname>거미 여왕</spellname>의 추가 피해량과 회복량을 {p2}% 증가시킵니다. <br>", // 줄타기 — 거미 형태
    },
    "MonkeyKing": { // 오공
        "P": "오공이 <scalearmor>{p1}의 방어력</scalearmor>을 얻고 <healing>5초마다 최대 체력의 {p2}%</healing>를 회복합니다. 이 효과는 오공이나 오공의 <keywordmajor>분신</keywordmajor>이 기본 공격 및 스킬로 적 챔피언이나 정글 몬스터를 공격할 때마다 {p3}초 동안 {p4}% 증가하며, 최대 {p5}회 중첩됩니다.", // 바위 피부 — stringtable
        "Q": "오공과 <keywordmajor>분신</keywordmajor>이 다음 공격 시 사거리가 {p1} 증가하고 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 추가로 입히며 {p3}초 동안 대상의 <scalearmor>방어력이 {p4}%</scalearmor> 감소합니다.<br><br>오공이나 오공의 <keywordmajor>분신</keywordmajor>이 기본 공격 및 스킬로 적을 공격할 때마다 이 스킬의 재사용 대기시간이 {p5}초 감소합니다.<br><br><rules>이 스킬은 피해를 입힐 때 효과가 발동합니다.</rules>", // 파쇄격
        "W": "오공이 돌격하며 {p1}초 동안 <keywordstealth>투명</keywordstealth> 상태가 되고 {p2}초 동안 움직이지 않는 <keywordmajor>분신</keywordmajor>을 생성합니다.<br><br><keywordmajor>분신</keywordmajor>은 오공의 궁극기를 모방하여 오공이 최근에 피해를 입힌 근처 적을 공격해 기존 피해량의 {p3}%만큼 피해를 입힙니다.", // 분신 전사
        "W_rules": "<rules><keywordstealth>투명</keywordstealth> 상태의 유닛은 포탑이나 절대 시야로만 모습이 드러납니다.</rules>", // 구분선 아래 회색 글씨
        "E": "오공이 적에게 돌격하며 자신의 <keywordmajor>분신</keywordmajor>을 만들어 근처의 적 최대 {p1}명에게 돌격시킵니다. 적중당한 적은 각각 <magicdamage>{p2}의 마법 피해</magicdamage>를 입습니다. 오공과 <keywordmajor>분신</keywordmajor>은 {p3}초 동안 <attackspeed>{p4}%의 공격 속도</attackspeed>를 얻습니다.<br><br>", // 근두운 급습
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "R": [
            "오공이 <speed>{p1}%의 이동 속도</speed>를 얻고 {p2}초 동안 여의봉을 휘두릅니다. 여의봉에 맞은 근처 적들은 {p3}초 동안 <status>공중에</status> 뜨며 <physicaldamage>{p4}+최대 체력의 {p5}에 해당하는 물리 피해</physicaldamage>를 입습니다.",
            "재사용 대기시간이 적용되기 전 {p6}초 안에 이 스킬을 한 번 더 사용할 수 있습니다."
        ], // 회전격
        "R_rules": "<rules>정글 몬스터를 상대로는 {p2}초 동안 최대 <physicaldamage>{p7}의 피해</physicaldamage>를 입힙니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Aurora": { // 오로라
        "P": "스킬 또는 기본 공격으로 적에게 3번 피해를 입히면 제령하여 <magicdamage>최대 체력의 {p1}에 해당하는 마법 피해</magicdamage>를 입힙니다. 대상이 챔피언인 경우 풀려난 영혼이 {p2}초 동안 오로라를 따라다니며 매초 <healing>{p3}</healing>의 체력을 회복시킵니다.", // 영혼 방호술 — stringtable
        "Q": "지정한 방향으로 저주받은 에너지를 발사해 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초 동안 저주를 내립니다.<br><br><recast>재사용 시:</recast> 저주를 끝내고 적의 영혼 일부를 오로라에게 끌어당겨 경로상의 적에게 적이 잃은 체력에 비례해 최대 <magicdamage>{p3}의 마법 피해</magicdamage>를 입힙니다. 처음 적중한 이후에는 피해량이 20%로 감소합니다.<br><br>지속시간이 지나면 오로라가 자동으로 스킬을 <recast>재사용</recast>합니다.", // 이중 저주
        "Q_rules": "<rules>재사용하면 미니언과 몬스터에게 {p4}%의 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "W": "오로라가 지정한 방향으로 뛰어오릅니다. 착지하며 영혼 세계에 진입해 {p1}초 동안 <keywordstealth>투명</keywordstealth> 상태가 되며 <keywordmajor>세계를 넘나드는 자</keywordmajor>가 되어 <speed>이동 속도가 {p2}%</speed> 증가합니다.<br><br>적 챔피언 처치에 관여하면 이 스킬의 재사용 대기시간이 초기화됩니다.", // 장막 너머로
        "E": "세계를 합치고 영혼 마법을 발사해 범위 내의 모든 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히며 {p2}% <status>둔화</status>시킵니다. 둔화 효과는 {p3}초에 걸쳐 사라집니다.<br><br>오로라가 스킬 사용 후 뒤로 짧은 거리를 도약합니다.<br>", // 마법의 문
        "R": "지정한 방향으로 뛰어오릅니다. 착지하며 세계를 합치고 영혼 에너지 파동을 방출해 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히며 적중당한 모든 적을 2초 동안 {p2}% <status>둔화</status>시킵니다.<br><br>융합 영역은 {p3}초 동안 유지되며 오로라에게 {p4}초 동안 <keywordmajor>세계를 넘나드는 자</keywordmajor>를 부여합니다. 오로라가 한 영역에서 건너편으로 점프할 수 있게 됩니다.<br><br>영역을 드나들려는 적은 {p5}초 동안 {p6}% <status>둔화</status>됩니다.<br><br>스킬을 <recast>재사용</recast>하면 효과를 빨리 종료할 수 있습니다.", // 세계의 경계
    },
    "Ornn": { // 오른
        "P": "오른은 어디에서든 골드를 써서 소모품을 제외한 아이템을 제작할 수 있습니다.<br><br>오른이 <b>13</b>레벨이 되면 자신의 전설급 아이템 하나를 걸작 아이템으로 업그레이드할 수 있습니다. <b>13</b>레벨 이후부터는 오른의 레벨이 오를 때마다 근처의 아군을 클릭해 해당 아군의 전설급 아이템을 업그레이드해줄 수 있습니다.<br><br>오른이 얻은 추가 <scalehealth>체력</scalehealth>과 <scalearmor>방어력</scalearmor>, <scalemr>마법 저항력</scalemr>이 <b>10%</b>만큼 증가합니다. 이 수치는 업그레이드한 전설급 아이템 하나당 <b>4%</b>씩 증가합니다.", // 간이 대장간 — 2026-08-09 직접 작성. 원래 "{{Spell_OrnnP_Tooltip_{p1}}}" 가 그대로 찍히고 있었다. ★ 수치 하드코딩(bin 실측: MasterworkLevel 13, BaseStatAmp 0.1, AdditionalMythicStatAmp 0.04)
        "Q": "오른이 지면을 내려쳐 적에게 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 {p2}초 동안 {p3}% <status>둔화</status>시키는 균열을 만듭니다. 잠시 후 균열이 끝나는 지점에 {p4}초 동안 용암 기둥이 생성됩니다.", // 용암 균열
        "Q_rules": "<rules>적 챔피언을 맞출 시 균열은 얼마 안 되어 멈춥니다. </rules><br>", // 구분선 아래 회색 글씨
        "W": "오른이 {p1}초 동안 저지 불가 상태로 전진하며 불꽃을 뿜어 <magicdamage>대상 최대 체력의 {p2}%에 해당하는 마법 피해</magicdamage>를 입힙니다. 마지막 불꽃에 맞은 적은 {p3}초 동안 <keywordmajor>불안정</keywordmajor> 상태가 됩니다.<br><br><keywordmajor>불안정</keywordmajor> 상태인 대상에게는 <status>이동 불가</status> 효과의 지속시간이 30% 증가하며 <magicdamage>최대 체력의 {p4}에 해당하는 마법 피해</magicdamage>를 추가로 입힙니다. 오른이 <keywordmajor>불안정</keywordmajor> 상태인 대상에게 기본 공격을 가하면 <status>뒤로</status> <status>밀어내며</status> 추가 피해를 입힙니다.", // 불꽃 풀무질
        "W_rules": "<rules>챔피언과 미니언에게는 최소 <magicdamage>{p5}의 마법 피해</magicdamage>를 입히고, 정글 몬스터에게는 최대 <magicdamage>{p6}의 마법 피해</magicdamage>를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "E": "오른이 돌진하며 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다. 돌진 중 지형지물에 충돌하면 충격파가 발생해 적을 {p2}초 동안 <status>공중으로 띄워 올리며</status> 돌진에 부딪히지 않은 적에게 화염 돌진의 피해를 적용합니다.<br><br>오른의 돌진은 용암 기둥이나 적이 만든 지형지물을 파괴합니다.", // 화염 돌진
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "R": [
            "오른이 자신에게 다가오는 거대한 불의 정령을 소환해 적들에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초 동안 <keywordmajor>불안정</keywordmajor> 상태로 만들며 {p3}% <status>둔화</status>시킵니다.",
            "오른이 스킬을 <recast>재사용</recast>하면 돌진하며 박치기합니다. 정령에게 박치기를 하면 정령의 진행 방향을 바꾸고 힘을 실어 줄 수 있습니다. 힘을 받은 정령은 처음 닿는 적 챔피언을 {p4}초 동안, 나머지 적 챔피언들은 {p5}초 동안 <status>공중으로 띄워 올립니다</status>. 또한 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 다시 한번 <keywordmajor>불안정</keywordmajor> 상태로 만듭니다."
        ], // 대장장이 신의 부름
    },
    "Orianna": { // 오리아나
        "P": "오리아나의 스킬 공격은 <keywordmajor>구체</keywordmajor>를 통해 이루어집니다. 거리가 너무 벌어지면 <keywordmajor>구체</keywordmajor>는 오리아나에게 되돌아갑니다.<br><br>오리아나의 기본 공격이 <magicdamage>{p1}의 마법 피해</magicdamage>를 추가로 입힙니다. {p2}초 안에 같은 대상에게 다시 기본 공격을 가하면 <magicdamage>{p3}의 마법 피해</magicdamage>를 추가로 입힙니다. (최대 피해량: <magicdamage>{p4}</magicdamage>)", // 시계태엽 감기 — stringtable
        "Q": "오리아나가 <keywordmajor>구체</keywordmajor>에게 이동하도록 명령하여 해당 지점 주변에 있는 적들과 이동 중에 마주치는 적들에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. 두 번째 적부터 피해량이 {p2}% 감소합니다.", // 명령: 공격
        "W": "오리아나가 <keywordmajor>구체</keywordmajor>에게 에너지를 방출하도록 명령하여 주변에 있는 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다.<br><br>이때 자기장이 {p2}초 동안 발생하여 적들을 {p3}% <status>둔화</status>시키고 아군에게는 <speed>{p4}%의 이동 속도</speed>를 부여합니다. 이 효과는 {p5}초에 걸쳐 점점 사라집니다.", // 명령: 불협화음
        "E": "<passive>기본 지속 효과: </passive><keywordmajor>구체</keywordmajor>가 보호하는 아군 챔피언은 <scalearmor>{p1}의 방어력</scalearmor>과 <scalemr>{p1}의 마법 저항력</scalemr>을 얻습니다.<br><br><active>사용 시: </active>오리아나가 <keywordmajor>구체</keywordmajor>에게 아군 챔피언을 따라다니도록 명령해 {p2}초 동안 <shield>{p3}의 피해를 흡수하는 보호막</shield>을 씌웁니다. 중간에 <keywordmajor>구체</keywordmajor>와 마주치는 적들은 <magicdamage>{p4}의 마법 피해</magicdamage>를 입습니다.", // 명령: 보호
        "R": "오리아나가 <keywordmajor>구체</keywordmajor>에게 충격파를 방출하도록 명령하여 근처에 있는 적들에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 <keywordmajor>구체</keywordmajor> 쪽으로 <status>끌어당깁니다</status>.", // 명령: 충격파
    },
    "Olaf": { // 올라프
        "P": "올라프가 잃은 체력에 비례해 최대 <attackspeed>{p1}의 공격 속도</attackspeed>와 {p2}의 생명력 흡수를 얻습니다.", // 광전사의 분노 — stringtable
        "Q": "올라프가 도끼를 던져 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 최대 {p2}초 동안 {p3}% <status>둔화</status>시킵니다. (지속시간은 도끼가 날아간 거리에 비례합니다.) 도끼에 맞은 적 챔피언은 {p4}초 동안 <scalearmor>방어력이 {p5}%</scalearmor> 감소합니다.<br><br>올라프가 도끼를 집으면 이 스킬의 재사용 대기시간이 {p6}초로 감소하거나, {p6}초가 지나면 스킬을 바로 재사용할 수 있습니다.", // 역류
        "Q_rules": "<rules>몬스터에게 {p7}의 추가 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "W": "{p1}초 동안 올라프의 <attackspeed>공격 속도가 {p2}%</attackspeed> 증가하고 {p3}초 동안 <shield>{p4}+잃은 체력의 {p5}%에 해당하는 보호막(체력이 {p6}% 밑으로 떨어지면 최대 {p7})</shield>을 얻습니다.", // 버티기
        "E": "올라프가 맹렬한 기세로 도끼를 휘둘러 <truedamage>{p1}의 고정 피해</truedamage>를 입힙니다. 적을 처치하면 소모값을 되돌려받습니다.<br><br>기본 공격 시 이 스킬의 재사용 대기시간이 1초 감소합니다. 몬스터 공격 시 2초 감소합니다.", // 무모한 강타
        "E_rules": "<rules>시전 시간은 추가 공격 속도에 비례합니다.</rules>", // 구분선 아래 회색 글씨
        "R": "<passive>기본 지속 효과:</passive> 올라프의 <scalearmor>방어력이 {p1}</scalearmor>, <scalemr>마법 저항력이 {p1}</scalemr> 증가합니다.<br><br><active>사용 시: </active>올라프가 자신에게 걸린 모든 <status>이동 불가</status> 및 <status>방해</status> 효과를 정화하고 {p2}초 동안 해당 효과에 면역 상태가 됩니다. 활성화 중 올라프가 <scalead>{p3}의 공격력</scalead>을 얻습니다. 기본 공격이나 <spellname>무모한 강타</spellname>로 챔피언을 적중하면 이 스킬의 지속시간을 {p4}초 연장합니다.<br><br>또한 {p5}초 동안 적 챔피언을 향해 이동할 때 <speed>이동 속도가 {p6}%</speed> 증가합니다.", // 라그나로크
    },
    "Yone": { // 요네
        "P": "<passive>강철과 영혼:</passive> 두 자루의 검을 다루는 요네는 두 번째 공격을 할 때마다 <magicdamage>{p1}%의 마법 피해</magicdamage>를 입힙니다.<br><br><passive>의지:</passive> 요네의 치명타 확률이 {p2}% 증가하지만, 치명타 피해량이 {p3}까지 감소합니다. 100%를 초과하는 치명타 확률 1%당 <physicaldamage>{p4}의 추가 공격력</physicaldamage>을 얻습니다.", // 사냥꾼의 길 — stringtable
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "Q": [
            "전방으로 검을 내질러 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다.",
            "적중 시, {p2}초간 1회 중첩됩니다. 2회 중첩되면 요네가 전방으로 돌진하며 돌풍을 날려 {p3}초 동안 적을 <status>공중으로 띄워 올리고</status> <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다."
        ], // 필멸의 검
        "Q_rules": "<rules>이 스킬은 기본 공격으로 간주되어 치명타로 <physicaldamage>{p4}의 물리 피해</physicaldamage>를 입힐 수 있고 처음 맞힌 적에게 <onhit>적중 시</onhit> 효과와 생명력 흡수를 적용합니다. 또한 군중 제어기에 방해를 받으며 <attackspeed>공격 속도</attackspeed>로 재사용 대기시간과 시전 소요 시간을 단축할 수 있습니다.</rules>", // 구분선 아래 회색 글씨
        "W": "요네가 전방을 가르며 <physicaldamage>{p1}+최대 체력의 {p2}%에 해당하는 물리 피해</physicaldamage> 및 <magicdamage>{p1}+최대 체력의 {p2}%에 해당하는 마법 피해</magicdamage>를 입힙니다.<br><br>요네의 공격이 적중하면 {p3}초 동안 <shield>{p4}의 보호막</shield>을 얻습니다. 적중한 챔피언 수만큼 <shield>보호막</shield> 흡수량이 증가합니다.", // 영혼 가르기
        "W_rules": "<rules>챔피언에게 처음으로 공격을 적중시키면 보호막 흡수량이 {p5}% 증가하고, 이후 공격을 적중시킨 챔피언 한 명당 {p6}% 증가합니다.<br>공격 속도로 이 스킬의 재사용 대기시간과 시전 소요 시간을 단축할 수 있습니다.<br>미니언의 경우 총 피해량은 최소 <scalelevel>{p7}</scalelevel>입니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "E": [
            "요네가 {p1}초 동안 영혼 상태가 되어 육신을 떠나고 <speed>이동 속도가 {p2}%</speed>에서 <speed>{p3}%</speed>까지 점차 증가합니다.<br>영혼 상태가 끝나면 다시 육신으로 돌아오며 영혼 상태에서 챔피언에게 입힌 모든 기본 공격 및 스킬 피해량의 {p4}%를 다시 입힙니다. 영혼 상태에서 스킬을 <recast>재사용</recast>할 수 있습니다.",
            "<recast>재사용 시: </recast>영혼 상태를 더 일찍 종료합니다."
        ], // 영혼해방
        "E_rules": "<rules>요네가 강력한 군중 제어 효과의 영향을 받는 동안에는 돌아올 수 없습니다.</rules>", // 구분선 아래 회색 글씨
        "R": "요네가 경로에 있는 모든 적을 공격해 <physicaldamage>{p1}의 물리 피해</physicaldamage>와 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 경로에 있는 마지막 챔피언 뒤로 순간이동해 적중한 모든 적을 자신 쪽으로 끌어당기며 <status>공중으로 띄워 올립니다</status>.", // 운명봉인
        "R_rules": "<rules>적 챔피언이 맞지 않았다면 최대 사거리만큼 순간적으로 이동합니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Yorick": { // 요릭
        "P": "요릭 근처에서 적 {p1}명이 죽을 때마다 무덤이 생성됩니다. 챔피언 및 대형 몬스터가 죽으면 항상 무덤이 생성됩니다.<br><br>이 무덤을 사용하여 범위 내에서 <healing>{p2}의 체력</healing>과 <physicaldamage>{p3}의 공격력</physicaldamage>을 지닌 <keywordmajor>안개 망령</keywordmajor>을 최대 {p4}명 <spellname>각성</spellname>시킬 수 있습니다.", // 영혼의 길잡이 — stringtable
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "Q": [
            "요릭이 다음 기본 공격으로 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 추가로 입히고 <healing>{p2}+요릭이 잃은 체력의 {p3}%</healing>를 회복합니다. 챔피언이 아닌 대상 상대 시 회복량이 {p4}% 감소합니다. 이 공격으로 챔피언 또는 대형 몬스터를 타격하거나 대상을 처치하면 무덤이 생성됩니다.",
            "근처에 무덤이 3개 이상 있을 때 이 스킬을 이미 사용한 상태라면 <recast>재사용</recast>하여 근처의 모든 무덤에서 <keywordmajor>안개 망령</keywordmajor>을 일으킬 수 있습니다."
        ], // 최후의 의식
        "Q_rules": "<rules>이 스킬은 피해를 입힐 때 효과가 발동합니다.</rules>", // 구분선 아래 회색 글씨
        "W": "요릭이 영혼의 벽을 소환하여 적의 길을 막되 아군의 길은 막지 않습니다. 영혼의 벽은 <healing>{p1}의 체력</healing>을 가지며 {p2}초 후 사라집니다.", // 망자의 진
        "E": "요릭이 안개의 구를 던져 <magicdamage>최대 체력의 {p1}만큼 마법 피해</magicdamage>를 입히고 {p2}초 동안 {p3} <status>둔화</status>시키며, {p4}초 동안 챔피언과 몬스터에게 표식을 남깁니다. 표식이 남은 적은 무덤 근처에서 지속적으로 안개 망령을 <spellname>각성</spellname>시킵니다. (최대 {p5}명까지 소환됩니다.) 또한 <scalearmor>방어력이 {p6}% 감소</scalearmor>합니다.<br><br>요릭과 요릭이 소환한 유닛은 표식이 있는 대상 쪽으로 이동할 때 <speed>이동 속도가 {p7}%</speed> 증가합니다. <keywordmajor>안개 망령</keywordmajor>은 멀어지는 적에게 한 번 뛰어들 수 있습니다.", // 애도의 안개
        "E_rules": "<rules>공격로 미니언에게 최소 <magicdamage>{p8}의 마법 피해</magicdamage>를 입힙니다.<br>정글 몬스터에게 최대 <magicdamage>{p9}의 마법 피해</magicdamage>를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "R": [
            "요릭이 <healing>{p1}의 체력</healing> 및 <magicdamage>{p2}의 마법 피해 공격력</magicdamage>을 지닌 <keywordmajor>안개 마녀</keywordmajor>와 <keywordmajor>안개 망령</keywordmajor> {p3}명을 소환합니다. <keywordmajor>안개 마녀</keywordmajor>는 근처에서 죽은 적으로부터 자동으로 <keywordmajor>안개 망령</keywordmajor>을 일으키고 기본 공격 시 적 챔피언에게 표식을 남깁니다. 요릭이 <keywordmajor>안개 마녀</keywordmajor>의 표적을 공격하면 <magicdamage>최대 체력의 {p4}%에 해당하는 마법 피해</magicdamage>를 입힙니다.",
            "10초 후 이 스킬을 <recast>재사용</recast>하면 <keywordmajor>안개 마녀</keywordmajor>를 해방해 가장 가까운 공격로로 보냅니다."
        ], // 군도의 장송곡
        "R_rules": "<rules><keywordmajor>안개 마녀</keywordmajor><br><scalearmor>방어력 {p5}</scalearmor><br><scalemr>마법 저항력 {p5}</scalemr><br>공격로 미니언에게 받는 피해 {p6}%로 감소</rules>", // 구분선 아래 회색 글씨
    },
    "Udyr": { // 우디르
        "P": "<passive>정령 각성:</passive> 네 가지 기본 스킬로 여러 '태세'를 오갈 수 있습니다. 재사용 대기 중인 스킬을 <recast>재사용</recast>하면 기본 효과에 더해 궁극기 효과를 얻습니다. (재사용 대기시간 {p1}초)<br><br><passive>수도승 훈련:</passive> 스킬 사용 후 {p2}초 동안 다음 두 차례 기본 공격의 <attackspeed>공격 속도가 {p3}</attackspeed> 상승하고 적중 시 <keywordmajor>각성</keywordmajor>의 재사용 대기시간을 {p4}% 돌려받습니다.<br>", // 가교 — stringtable
        "Q": "<active>발톱 태세:</active> {p1}초 동안 <attackspeed>공격 속도가 {p2}%</attackspeed> 상승하고 기본 공격으로 <onhit>적중 시</onhit> <physicaldamage>{p3}의 물리 피해</physicaldamage>를 입힙니다. 이 태세에서 가하는 다음 두 차례 기본 공격으로 <physicaldamage>최대 체력의 {p4}에 해당하는 물리 피해</physicaldamage>를 추가로 입히고 사거리가 {p5} 증가합니다.<br><br><keywordmajor>각성:</keywordmajor> 추가 <attackspeed>공격 속도</attackspeed>가 <attackspeed>{p6}</attackspeed>까지 상승하고 최대 체력 비례 피해량이 <physicaldamage>{p7}</physicaldamage>까지 상승합니다. 추가로 다음 두 차례 기본 공격으로 번개를 여섯 번 일으켜 <magicdamage>최대 체력의 {p8}에 해당하는 마법 피해</magicdamage>를 입힙니다. (고립된 적은 이 피해를 혼자 전부 받지만, 주변에 다른 적이 있으면 번개가 그쪽으로 튑니다.)<br>", // 야생 발톱
        "Q_rules": "<rules>몬스터의 경우 발톱 태세 최대 체력 비례 피해는 {p9}까지만 입힐 수 있습니다. 각 번개 공격은 <magicdamage>최대 체력의 {p10}에 해당하는 마법 피해</magicdamage>를 입힙니다. 미니언 대상 최소 피해량: {p11})</rules>", // 구분선 아래 회색 글씨
        "W": "<passive>갑옷 태세:</passive> {p1}초 동안 <shield>{p2}의 보호막</shield>을 얻습니다. 다음 두 차례 기본 공격에 생명력 흡수 {p3}% 효과가 부여되고 적중 시 <healing>{p4}의 체력</healing>을 회복합니다.<br><br><keywordmajor>각성:</keywordmajor> {p1}초 동안 <shield>{p5}의 보호막</shield>을 얻고 <healing>{p6}의 체력</healing>을 회복합니다. 다음 두 차례 기본 공격에 생명력 흡수 {p7}% 효과가 부여되고 적중 시 <healing>{p8}의 체력</healing>을 회복합니다.<br>", // 강철 갑옷
        "W_rules": "<rules>각성된 스킬 사용 시, 기본 스킬로 얻은 보호막이 남아있다면 새로운 보호막과 합쳐집니다. 미니언을 상대로는 적중 시 생명력 흡수 효과가 {p9}%만큼 감소합니다.</rules>", // 구분선 아래 회색 글씨
        "E": "<active>쇄도 태세:</active> <speed>이동 속도가 {p1}</speed> 증가했다 {p2}초에 걸쳐 원래대로 돌아갑니다. 기본 공격 시 대상에게 돌진해 {p3}초간 <status>기절</status>시킵니다. (대상별 재사용 대기시간 {p4}초)<br><br><keywordmajor>각성:</keywordmajor> {p5}초간 <status>이동 불가</status> 및 <status>방해</status> 효과에 면역이 되고 <speed>이동 속도가 {p6}</speed> 추가로 증가합니다.", // 불길 쇄도
        "E_rules": "<rules>이동 속도가 증가한 동안 우디르가 유닛과 충돌하지 않습니다. 이 <keywordmajor>태세</keywordmajor>에서 우디르가 가하는 기본 공격은 취소될 수 없습니다.</rules>", // 구분선 아래 회색 글씨
        "R": "<active>폭풍 태세:</active> {p1}초 동안 얼음 폭풍으로 자신을 감싸 주변 적들에게 매초 <magicdamage>{p2}의 마법 피해</magicdamage>를 입히고 {p3}% <status>둔화</status>시킵니다. 이 태세에서 가하는 다음 두 차례 기본 공격으로 폭풍 안에 있는 적에게 <magicdamage>{p4}의 마법 피해</magicdamage>를 입힙니다.<br><br><keywordmajor>각성:</keywordmajor> 우디르가 마지막으로 기본 공격한 적을 따라가며 지속시간에 걸쳐 <magicdamage>최대 체력의 {p5}에 해당하는 마법 피해</magicdamage>를 추가로 입히고, {p6}만큼 추가로 <status>둔화</status>시키는 폭풍을 풀어놓습니다.", // 날개 돋친 폭풍
        "R_rules": "<rules>폭풍은 미니언에게 {p7}의 피해를 입힙니다. 각성된 폭풍은 몬스터에게 최소 {p8}의 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Urgot": { // 우르곳
        "P": "우르곳은 6개의 다리에 대포가 하나씩 달려 있습니다. 기본 공격과 <spellname>심판의 원</spellname> 스킬로 대상을 향해 있는 다리 대포를 발사해 <physicaldamage>{p1}+최대 체력의 {p2}에 해당하는 물리 피해</physicaldamage>를 입힙니다. 이 효과에는 다리당 {p3}초의 재사용 대기시간이 있습니다.", // 화염의 메아리 — stringtable
        "Q": "우르곳이 부식성 폭약을 발사하여 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 {p2}초 동안 {p3}% <status>둔화</status>시킵니다.", // 부식성 폭약
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "W": [
            "<passive>기본 지속 효과:</passive> 우르곳의 다른 스킬이 마지막으로 적중한 챔피언에게 5초 동안 표식을 남깁니다.<br><br><active>사용 시:</active> 우르곳이 표식이 남은 적을 우선으로 가장 가까운 적에게 기관총을 발사합니다. 초당 {p1}회 공격하여 사격 1회당 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입힙니다. 우르곳은 사격 시 이동할 수 있으며 <status>둔화</status> 저항이 {p3}% 증가하지만 <speed>이동 속도가 {p4}</speed> 감소합니다.<br><br>스킬 레벨을 끝까지 올리면 스킬이 무한히 지속되며 활성화 상태를 전환할 수 있습니다.",
            "<active>심판의 원 취소:</active> 우르곱이 스킬을 중단합니다."
        ], // 심판의 원
        "W_rules": "<rules>사격의 적중 시 효과는 피해량의 {p5}%로 적용되며 치명타는 적용되지 않습니다.<br>미니언과 정글 몬스터에게는 최소 {p6}의 피해를 입힙니다.<br>우르곳은 사격 시 에픽 몬스터를 제외한 정글 몬스터 및 미니언을 통과할 수 있습니다.</rules>", // 구분선 아래 회색 글씨
        "E": "우르곳이 전방으로 돌진하며 {p1}초 동안 <shield>{p2}의 피해를 흡수하는 보호막</shield>을 얻습니다. 처음 적중한 챔피언은 {p3}초 동안 <status>기절</status>하며 우르곳이 뒤로 던집니다. 우르곳과 충돌하는 모든 적은 <physicaldamage>{p4}의 물리 피해</physicaldamage>를 입습니다.", // 경멸
        "E_rules": "<rules>지형은 가로지를 수 없습니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "R": [
            "우르곳이 마공학 송곳 섬광탄을 발사하여 섬광탄이 처음 적중한 챔피언에게 꽂힙니다. 섬광탄은 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히며, {p2}초 동안 잃은 체력 1%당 1%씩 최대 {p3}% <status>둔화</status>시킵니다.",
            "대상의 체력이 {p4}% 이하로 떨어지면 우르곳이 스킬을 <recast>재사용</recast>하여 대상을 <status>제압</status>하고 자신에게 끌어당깁니다. 우르곳 앞에 도착한 대상은 처치되며 주변 적은 {p5}초 동안 <status>공포</status>에 빠집니다."
        ], // 불사의 공포
        "R_rules": "<rules>이 스킬은 대상의 체력이 처형의 기준치 아래로 떨어지면 지속시간이 끝날 때 자동으로 <recast>재사용</recast>됩니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Warwick": { // 워윅
        "P": "워윅의 기본 공격이 적중 시 <magicdamage>{p1}의 마법 피해</magicdamage>를 추가로 입힙니다.<br><br>워윅의 체력이 {p2}% 아래로 내려가면 <healing><keywordmajor>끝없는 허기</keywordmajor>로 입힌 피해량의 {p3}%</healing>만큼 체력을 회복합니다. 워윅의 체력이 {p4}% 아래로 내려가면 체력 회복량은 <healing>입힌 피해량의 {p5}%</healing>로 증가합니다.", // 끝없는 허기 — stringtable
        "Q": "<tap>짧게 누를 때:</tap> 워윅이 앞으로 도약한 후 대상을 물어 <magicdamage>{p1}+최대 체력의 {p2}%에 해당하는 마법 피해</magicdamage>를 입히고 <healing>입힌 피해량의 {p3}%만큼 체력을 회복</healing>합니다.<br><br><hold>길게 누를 때:</hold> 워윅이 도약한 후 대상을 꽉 물며 뒤로 넘어 갑니다. 꽉 문 동안 워윅은 대상이 이동할 때 같이 이동합니다. 대상을 놓은 후에는 같은 양의 피해를 입히고 체력을 회복합니다.", // 야수의 송곳니
        "Q_rules": "<rules>이 스킬은 적중 및 공격 시 효과를 적용하며 치명타를 적용하지 않습니다. <br>꽉 문 동안 워윅은 이동 효과에 면역이 됩니다.</rules>", // 구분선 아래 회색 글씨
        "W": "<passive>기본 지속 효과:</passive> 체력이 50% 미만인 챔피언을 감지합니다. 해당 챔피언을 향해 이동할 경우 <speed>이동 속도가 {p1}%</speed> 증가합니다. 해당 챔피언에게 스킬 및 기본 공격을 가할 경우 <speed>공격 속도가 {p2}%</speed> 증가합니다. 적의 체력이 25% 이하일 경우 이 효과들은 200% 증가합니다. <br><br><active>사용 시:</active> 잠시 동안 모든 적의 위치를 감지하여 체력과 상관없이 가장 가까이에 있는 적 챔피언에게 8초 동안 이 스킬의 기본 지속 효과를 적용합니다. 발견된 챔피언이 없으면 이 스킬의 재사용 대기시간이 30% 감소합니다.", // 피의 사냥
        "W_rules": "<rules>평상시 워윅은 아군에게 피해를 입어 체력이 50% 아래로 떨어진 적만 감지할 수 있습니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "E": [
            "{p1}초 동안 워윅이 입는 피해가 {p2}% 감소합니다. 지속시간이 종료되면 워윅이 포효하며 근처의 모든 적을 {p3}초 동안 <status>공포</status>에 빠뜨립니다. ",
            "<recast>재사용</recast>하면 스킬이 일찍 종료됩니다."
        ], // 원시의 포효
        "R": "워윅이 <speed>이동 속도</speed>에 비례하는 먼 거리를 도약하여 첫 번째로 부딪힌 적 챔피언을 {p1}초 동안 <status>제압</status>하며 정신을 집중합니다. 지속시간 동안 해당 챔피언을 3회 공격해 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다. 워윅은 정신을 집중하면서 <healing>입힌 모든 피해량의 100%</healing>만큼 체력을 회복합니다.", // 무한의 구속
        "R_rules": "<rules>이 스킬은 적중 및 공격 시 효과를 지속시간 동안 3회 적용하며, 치명타를 적용하지 않습니다.<br>적을 <status>쓰러뜨리는</status> 스킬입니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Yunara": { // 유나라
        "P": "유나라의 치명타가 <magicdamage>{p1}의 마법 피해</magicdamage>를 추가로 입힙니다.", // 최초의 땅의 맹세 — stringtable
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "Q": [
            "<passive>기본 지속 효과:</passive> 유나라가 <onhit>적중 시</onhit> <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 기본 공격이 <evolve>방출을 {p2}</evolve>(챔피언일 경우 <evolve>방출 {p3}</evolve>) 생성합니다.",
            "<active>사용 시:</active> 유나라가 <evolve>방출을 {p4}</evolve> 소모하여 {p5}초 동안 <attackspeed>공격 속도를 {p6}</attackspeed> 얻고 <onhit>적중 시</onhit> <magicdamage>{p7}의 마법 피해</magicdamage>를 추가로 입힙니다. 지속시간 동안 유나라의 기본 공격이 주변 적에게 확산되어 <physicaldamage>{p8}의 물리 피해</physicaldamage>를 입힙니다.",
            "<keywordmajor>초월 상태</keywordmajor>: 이 스킬이 즉시 활성화되어 {p9}초 동안 지속됩니다."
        ], // 영혼 단련 — 파트 3개. 기본 지속 효과(흑백 yunara_q) / 사용 시(컬러 yunara_q2) / 초월 상태(궁 yunara_r)
        "Q_rules": "<rules>확산 공격에는 치명타가 적용될 수 있으며 <onhit>적중 시</onhit> 효과가 {p10}%만큼 적용됩니다. 확산 공격은 <scalehealth>체력이 {p11}</scalehealth> 미만인 미니언에게 {p12}의 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "W": [
            "유나라가 기도의 구슬을 던져 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 <status>{p2} 둔화시킵니다. 둔화 효과는 {p3}초에 걸쳐 감소합니다</status>. 기도의 구슬은 초당 <magicdamage>{p4}의 마법 피해</magicdamage>를 추가로 입힙니다.",
            "<keywordmajor>초월 상태 - 파멸의 궤적</keywordmajor>: 유나라가 빛줄기를 발사해 <magicdamage>{p5}의 마법 피해</magicdamage>를 입히고 <status>{p6} 둔화시킵니다. 둔화 효과는 {p7}초에 걸쳐 감소합니다</status>."
        ], // 심판의 궤적 | 파멸의 궤적 — 초월 파트는 yunara_rw 아이콘
        "W_rules": "<rules>시전 시간은 영구적인 <attackspeed>공격 속도</attackspeed>에 비례합니다. ({p9}%까지 적용) <spellname>심판의 궤적</spellname>은 미니언에게 {p10}의 피해를 입히고 스킬의 초당 피해량은 체력이 낮은 적을 처형합니다. <spellname>파멸의 궤적</spellname>은 궁극기 효과를 얻습니다.</rules>", // 구분선 아래 회색 글씨 — 원문은 "({p8}% / {p9}%)" 인데 앞쪽이 현재 내 챔피언의 공격 속도라 고정값이 없다. 나무위키도 이 괄호를 안 적는다
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "E": [
            "{p1}초 동안 유나라의 <speed>이동 속도가 {p2}</speed> 증가합니다. 적 챔피언에게 접근 시 <speed>이동 속도가 {p3}</speed>까지 증가합니다.",
            "<keywordmajor>초월 상태 - 닿지 않는 그림자</keywordmajor>: 유나라가 지정한 방향으로 돌진합니다."
        ], // 칸메이의 발자취 | 닿지 않는 그림자 — 초월 파트는 yunara_re 아이콘
        "E_rules": "<rules>칸메이의 발자취 사용 시 유나라가 <keyword>유체화</keyword> 상태가 됩니다. 닿지 않는 그림자는 궁극기 효과를 얻습니다.</rules>", // 구분선 아래 회색 글씨
        "R": "유나라가 {p1}초 동안 <keywordmajor>초월 상태</keywordmajor>에 돌입해 지속시간 동안 기본 스킬을 강화합니다.", // 자기 초월
    },
    "Yuumi": { // 유미
        "P": "유미의 기본 공격 및 스킬이 챔피언을 공격하면 <healing><health>체력을 {p1}</health></healing> 회복합니다. 유미가 {p2}초 안에 아군에게 <keywordmajor>밀착</keywordmajor>하면 아군도 체력을 <heal>회복</heal>합니다. 이 효과의 재사용 대기시간은 {p3}초입니다.<br><br><keywordmajor>밀착</keywordmajor> 상태에서 아군이 챔피언 또는 미니언을 처치하면 유미가 <keywordmajor>우정</keywordmajor>을 쌓습니다. 가장 많은 <keywordmajor>우정</keywordmajor>을 쌓은 아군이 유미의 <keywordmajor>단짝</keywordmajor>이 되고 유미가 단짝에게 <keywordmajor>밀착</keywordmajor>하면 추가 스킬 효과를 얻습니다. <br><br><rules>유미가 이미 아군에게 밀착된 상태라면 자동으로 체력을 회복합니다.</rules>", // 야옹이 친구 — stringtable
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "Q": [
            "유미가 상황에 따라 방향을 바꿀 수 있는 미사일을 소환하여 처음 적중한 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}% <status>둔화</status>시킵니다.",
            "<keywordmajor>밀착 상태</keywordmajor>에서 사용하면 유미가 마우스로 미사일을 조종할 수 있습니다. 일단 속도가 붙은 미사일은 조종할 수 없고 직선으로 날아가며 대상에게 <magicdamage>{p3}의 마법 피해</magicdamage>를 입히고 {p4}초 동안 {p5}% <status>둔화</status>시킵니다.<br><br><keywordmajor>단짝 추가 효과:</keywordmajor> <spellname>사르르탄</spellname>의 <status>둔화</status> 효과가 항상 강화되며 적 챔피언에게 둔화 적용 시 {p6}초 동안 단짝이 강화되어 <onhit>적중 시 </onhit> <magicdamage>{p7}의 마법 피해</magicdamage>를 추가로 입힙니다.<br><br><rules>적중 시 추가 피해량은 단짝의 치명타 확률에 따라 {p8}% 증가할 수 있습니다.</rules>"
        ], // 사르르탄
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "W": [
            "<passive>기본 지속 효과:</passive> <keywordmajor>단짝</keywordmajor>에게 붙어있을 때 유미의 <keywordmajor>체력 회복 및 보호막 효과가 {p1}%</keywordmajor> 추가로 증가하며, 단짝은 <healing>체력을 {p2}</healing> 회복합니다. <onhit>적중 시 </onhit>.",
            "<active>사용 시:</active> 유미가 아군 챔피언에게 돌진하여 <keywordmajor>밀착</keywordmajor>합니다. 유미는 <keywordmajor>밀착 상태</keywordmajor>에서 밀착 대상을 따라다니며 포탑을 제외한 유닛이 대상으로 지정할 수 없는 상태가 됩니다.<br>유미에게 <status>이동 불가</status> 효과가 적용되면 이 스킬에 {p3}초의 재사용 대기시간이 적용됩니다."
        ], // 너랑 유미랑!
        "W_rules": "<rules>이 스킬의 재사용 대기시간은 {p4}초지만 이미 <keywordmajor>밀착 상태</keywordmajor>일 경우 언제든 다시 사용해 다른 아군에게 밀착하거나 <keywordmajor>밀착 해제</keywordmajor>할 수 있습니다.<br><br>유미의 스킬은 유미 대신 유미가 <keywordmajor>밀착</keywordmajor>한 아군 위치를 기준으로 사용됩니다.<br><br>밀착 상태인 아군이 소환사 주문 순간이동을 사용하면 유미가 <keywordmajor>밀착 해제</keywordmajor>됩니다.</rules>", // 구분선 아래 회색 글씨
        "E": "유미가 <shield>{p1}의 피해</shield>를 흡수하는 보호막을 얻고 {p2}초 동안 <attackspeed>공격 속도가 {p3}%</attackspeed> 증가합니다. 보호막이 남아있는 동안 대상의 <speed>이동 속도가 {p4}%</speed> 증가합니다.<br><br>유미가 <keywordmajor>밀착</keywordmajor> 상태면 위 효과를 유미 대신 해당 아군에게 적용하고 <magicdamage>마나를 {p5}</magicdamage> 회복시킵니다. 마나 회복량은 대상이 잃은 마나에 따라 {p6}%까지 증가합니다.", // 슈우우웅
        "R": "유미가 {p1}초 동안 정신을 집중해 양 팀 모두에 영향을 주는 마법의 파동을 {p2}번 발사합니다. 처음 <keywordmajor>밀착</keywordmajor>한 상태에서 시전하면 유미는 마우스를 따라 파동을 조종할 수 있습니다.<br><br>적중당한 적에게 <magicdamage>{p3}의 마법 피해</magicdamage>를 입히고 {p4}초 동안 {p5}% <status>둔화</status>시킵니다. 둔화 효과는 파동에 적중될 때마다 {p6}% 증가합니다.<br><br>아군 챔피언은 파동마다 <healing>{p7}의 체력</healing>을 회복합니다. 체력 회복 초과분은 <shield>보호막</shield>으로 전환됩니다.<br><br><keywordmajor>단짝 보너스:</keywordmajor> 유미의 <keywordmajor>단짝</keywordmajor>은 회복량이 증가해 <healing>{p8}의 체력</healing>을 회복합니다.<br><br><rules><spellname>너랑 유미랑!</spellname>을 시전하면 파동을 현재 방향으로 고정합니다.<br>유미는 정신을 집중하는 동안 이동할 수 있으며 <spellname>슈우우웅</spellname> 스킬을 사용할 수 있습니다.</rules><br>", // 대단원
        "R_rules": "<rules>첫 번째 이후의 미사일이 <magicdamage>{p9}의 마법 피해</magicdamage>를 입힙니다. 단일 대상에게 입힐 수 있는 최대 피해량은 <magicdamage>{p10}의 마법 피해</magicdamage>입니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Irelia": { // 이렐리아
        "P": "이렐리아가 스킬로 적을 맞히면 {p1}초 동안 중첩을 1 얻습니다. (최대 {p2}중첩) 이렐리아가 중첩당 <attackspeed>{p3}%의 공격 속도</attackspeed>를 얻으며 최대 중첩 시 기본 공격으로 <magicdamage>{p4}의 추가 마법 피해</magicdamage>를 입힙니다.<br><br>챔피언이나 구조물, 대형 몬스터 공격 시 중첩 지속시간이 초기화됩니다. 챔피언을 맞히거나 챔피언이 아닌 적을 하나라도 맞힐 때마다 1중첩을 얻습니다.", // 아이오니아의 열정 — stringtable
        "Q": "이렐리아가 적에게 돌진해 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 <healing>{p2}의 체력</healing>을 회복합니다. 적이 죽거나 <keywordmajor>불안정</keywordmajor> 상태일 경우 재사용 대기시간이 초기화됩니다.<br><br>미니언에게는 {p3}의 피해를 입힙니다.", // 칼날 쇄도
        "Q_rules": "<rules>이 스킬은 적중 시 효과가 적용됩니다.</rules>", // 구분선 아래 회색 글씨
        "W": "<charge>충전 시작 시:</charge> 이렐리아가 최대 {p1}초 동안 방어 태세에 돌입하여 행동할 수 없게 되지만 받는 물리 피해가 {p2}%, 마법 피해가 {p3}% 감소합니다.<br><br><release>발사 시:</release> 이렐리아가 검을 날려 <physicaldamage>{p4}의 물리 피해</physicaldamage>를 입힙니다. 피해량은 충전 시간에 비례하여 최대 <physicaldamage>{p5}</physicaldamage>만큼 증가합니다.", // 저항의 춤
        "W_rules": "<rules><charge>충전</charge>이 끝나면 자동으로 <release>발사</release>되며 적이 중단시킬 수 없습니다. {p6}초 후에는 최대 피해량으로 증가합니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "E": [
            "이렐리아가 지면에 검을 던집니다. {p1}초 내에 스킬을 <recast>재사용</recast>할 수 있습니다.",
            "<recast>재사용 시:</recast> 이렐리아가 두 번째 검을 던진 후 두 검이 서로를 향해 날아들어 {p2}초 동안 적을 <status>기절</status>시키고 <magicdamage>{p3}의 마법 피해</magicdamage>를 입힙니다. 챔피언과 대형 정글 몬스터는 {p4}초 동안 <keywordmajor>불안정</keywordmajor> 상태가 됩니다."
        ], // 쌍검협무
        "E_rules": "<rules>이렐리아가 {p1}초 후 자신의 위치에서 자동으로 스킬을 <recast>재사용</recast>합니다.</rules>", // 구분선 아래 회색 글씨
        "R": "이렐리아가 칼날 다발을 날려 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 챔피언 및 대형 정글 몬스터를 {p2}초 동안 <keywordmajor>불안정</keywordmajor> 상태로 만듭니다. 칼날 다발은 결계 형태로 폭발하여 {p3}초 동안 첫 번째 적중한 챔피언을 둘러쌉니다. 결계는 <magicdamage>{p4}의 마법 피해</magicdamage>를 입히고 적을 {p5}초 동안 {p6}% <status>둔화</status>시킵니다.", // 선봉진격검
        "R_rules": "<rules>칼날 다발 폭발 시 주변 적들도 피해를 입습니다. </rules><br>", // 구분선 아래 회색 글씨
    },
    "Evelynn": { // 이블린
        "P": "{p1}초 동안 기본 공격 또는 스킬 사용을 하지 않으면 이블린이 <keywordmajor>악의 장막</keywordmajor>으로 자신을 감쌉니다. <healing>체력이 {p2}</healing> 이하일 때 <keywordmajor>악의 장막</keywordmajor>이 활성화되면 <healing>초당 {p3}의 체력</healing>을 회복합니다. 6레벨부터는 <keywordstealth>위장</keywordstealth> 효과를 얻습니다.<br><br>적 챔피언이나 포탑으로부터 피해를 입으면 {p4}초 동안 <keywordmajor>악의 장막</keywordmajor>이 비활성화됩니다.", // 악의 장막 — stringtable
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "Q": [
            "이블린이 가시를 발사해 처음 적중한 유닛에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. 그 후 동일 대상에게 가하는 이블린의 다음 세 번의 기본 공격 또는 스킬이 <magicdamage>{p2}의 마법 피해</magicdamage>를 추가로 입힙니다. 이블린이 증오의 가시를 최대 {p3}번까지 <recast>재사용</recast>할 수 있습니다.",
            "<recast>재사용 시:</recast> 이블린이 발사한 가시가 가장 가까운 적을 통과하고 적중한 모든 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다."
        ], // 증오의 가시
        "Q_rules": "<rules>가시는 이블린이 현재 공격하는 적을 먼저 공격합니다.</rules>", // 구분선 아래 회색 글씨
        "W": "챔피언 또는 몬스터에게 5초 동안 표식을 남깁니다. 표식을 남긴 대상에게 기본 공격을 가하거나 스킬을 사용하면 표식이 사라지며 소모했던 마나가 회복되고 {p1}초 동안 대상을 {p2}% <status>둔화</status>시킵니다.<br><br>표식이 2.5초 이상 지속된 후 공격하면 다음 효과가 추가로 적용됩니다.<li>적 챔피언: {p3}초 동안 대상을 <status>매혹</status>하고 {p4}초 동안 <scalemr>{p5}%의 마법 저항력</scalemr>을 감소시킵니다.<li>몬스터: {p6}초 동안 대상을 <status>매혹</status>하고 <magicdamage>{p7}의 마법 피해</magicdamage>를 입힙니다.", // 황홀한 저주
        "W_rules": "<rules>이 스킬을 사용해도 <keywordmajor>악의 장막</keywordmajor> 효과는 없어지지 않습니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "E": [
            "이블린이 채찍으로 적을 가격하여 <magicdamage>{p1}+대상 최대 체력의 {p2}에 해당하는 마법 피해</magicdamage>를 입힙니다. 이후 이블린이 {p3}초 동안 <speed>{p4}%의 이동 속도</speed>를 얻습니다.",
            "<keywordmajor>악의 장막</keywordmajor>이 활성화되면 이 스킬의 재사용 대기시간이 초기화되고 강화됩니다. 강화된 스킬을 사용하면 이블린이 대상에게 돌진하며, 대상 및 경로에 있는 모든 적에게 <magicdamage>{p5}+대상 최대 체력의 {p6}에 해당하는 마법 피해</magicdamage>를 입힙니다."
        ], // 채찍유린
        "E_rules": "<rules>대상에게는 적중 시 효과가 적용됩니다.</rules>", // 구분선 아래 회색 글씨
        "R": "이블린이 악마의 기운을 방출해 대상으로 지정할 수 없게 되며 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힌 다음 뒤로 이동합니다. <healing>체력이 30%</healing> 이하인 적들에게는 피해량이 <magicdamage>{p2}</magicdamage>까지 증가합니다. 사용 시 악의 장막에 1.25초 재사용 대기시간이 적용됩니다.", // 최후의 포옹
        "R_rules": "<rules>대상으로 지정할 수 없는 유닛은 이미 적중당한 상태가 아닌 한 적의 기본 공격이나 스킬에 영향을 받지 않습니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Ezreal": { // 이즈리얼
        "P": "이즈리얼이 스킬을 적중시키면 {p1}초 동안 <attackspeed>공격 속도가 {p2}%</attackspeed> 증가합니다. 이 효과는 최대 {p3}번 중첩됩니다.", // 끓어오르는 주문의 힘 — stringtable
        "Q": "이즈리얼이 에너지 화살을 발사하여 처음 적중한 적에게 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고, 이즈리얼의 스킬 재사용 대기시간을 {p2}초 감소시킵니다.", // 신비한 화살
        "Q_rules": "<rules>이 스킬은 <onhit>적중 시</onhit> 효과가 적용됩니다.</rules>", // 구분선 아래 회색 글씨
        "W": "이즈리얼이 마법의 구체를 발사해 처음으로 적중한 챔피언이나 구조물, 에픽 정글 몬스터에게 {p1}초 동안 남아 있게 합니다. 이즈리얼이 해당 대상에게 기본 공격이나 스킬을 적중시키면 구체가 폭발하며 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다. 스킬로 구체를 폭발시키면 해당 스킬로 소모한 마나+<scalemana>{p3}의 마나</scalemana>를 돌려받습니다.", // 정수의 흐름
        "E": "이즈리얼이 순간이동 후 가장 가까이에 있는 적에게 화살을 발사하여 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. 화살은 <spellname>정수의 흐름</spellname>에 영향을 받은 대상을 우선적으로 공격합니다.", // 비전 이동
        "R": "이즈리얼이 거대한 에너지파를 발사하여 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. 미니언과 에픽 몬스터를 제외한 정글 몬스터에게는 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다.", // 정조준 일격
    },
    "Illaoi": { // 일라오이
        "P": "일라오이가 신을 영접해, 주변에 다른 촉수가 없는 경우 근처 지형에 촉수를 소환합니다. (재사용 대기시간 <scalelevel>{p1}</scalelevel>초) 촉수는 스스로 공격하지는 않지만 일라오이가 스킬을 사용해 <keywordmajor>후려치기</keywordmajor>를 쓰게 할 수 있습니다.<br><br><keywordmajor>후려치기</keywordmajor>는 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입힙니다. 한 명 이상의 적 챔피언에게 적중시키면 일라오이가 <healing>잃은 체력의 {p3}%</healing>를 회복합니다.", // 고대신의 예언자 — stringtable
        "Q": "<passive>기본 지속 효과:</passive> <keywordmajor>후려치기</keywordmajor>의 피해량이 <physicaldamage>{p1}%</physicaldamage> 증가합니다. (현재 <physicaldamage>{p2}의 물리 피해</physicaldamage>)<br><br><active>사용 시:</active> 일라오이가 성상을 휘둘러 촉수가 전방에 <keywordmajor>후려치기</keywordmajor>를 사용하게 합니다.", // 촉수 강타
        "W": "일라오이가 다음 기본 공격 시 대상에게 돌진해 <physicaldamage>최대 체력의 {p1}에 해당하는 물리 피해</physicaldamage>를 추가로 입힙니다. 일라오이가 공격하면 근처의 촉수도 함께 대상에게 <keywordmajor>후려치기</keywordmajor>를 사용합니다.", // 혹독한 가르침
        "W_rules": "<rules>체력 비례 피해량은 최소 {p2}이며, 정글 몬스터 상대로는 최대 {p3}입니다.<br>이 스킬은 피해를 입힐 때 효과가 발동합니다.</rules>", // 구분선 아래 회색 글씨
        "E": "일라오이가 {p1}초 동안 적 챔피언에게서 영혼을 분리합니다. 영혼에게 피해를 입히면 피해량의 {p2}가 해당 적 챔피언에게 전이됩니다.<br><br>만약 영혼이 처치당하거나 대상이 일정 범위를 벗어나면, {p3}초 동안 대상에게 표식을 남기며 {p4}초 동안 {p5}% <status>둔화</status>시킵니다. 표식이 남은 적은 가능할 경우 촉수를 소환합니다.<br><br>촉수는 {p6}초마다 영혼과 표식이 남은 적에게 <keywordmajor>후려치기</keywordmajor>를 사용합니다.", // 영혼의 시험
        "E_rules": "<rules>표식이 남은 적은 잠깐 위치가 드러납니다.</rules>", // 구분선 아래 회색 글씨
        "R": "일라오이가 성상을 바닥에 내리쳐 근처 적들에게 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고, 피해를 입는 적 챔피언 한 명당 촉수를 하나씩 소환합니다.<br><br>이후 촉수는 {p2}초 동안 <keywordmajor>후려치기</keywordmajor>의 사용 속도가 50% 빨라지고 대상으로 지정할 수 없게 됩니다. <spellname>혹독한 가르침</spellname>의 재사용 대기시간이 {p3}초로 줄어듭니다.", // 믿음의 도약
        "R_rules": "<rules><spellname>영혼의 시험</spellname>으로 분리한 영혼을 적중 시에도 촉수를 생성합니다.</rules>", // 구분선 아래 회색 글씨
    },
    "JarvanIV": { // 자르반 4세
        "P": "자르반 4세의 기본 공격이 <physicaldamage>대상 현재 체력의 {p1}%에 해당하는 물리 피해</physicaldamage>를 추가로 입힙니다. 같은 대상에게는 {p2}초마다 한 번씩 효과가 발휘됩니다.", // 전장의 군가 — stringtable
        "Q": "자르반 4세가 창을 길게 늘려 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 {p2}초 동안 <scalearmor>방어력을 {p3}%</scalearmor> 감소시킵니다.<br><br>창이 <spellname>데마시아의 깃발</spellname>에 맞으면 자르반 4세가 깃발을 향해 돌진하며 경로에 있는 적들을 0.75초 동안 <status>공중에 띄웁니다</status>.", // 용의 일격
        "Q_rules": "<rules><status>이동 불가</status> 상태에서도 돌진할 수 있습니다.</rules>", // 구분선 아래 회색 글씨
        "W": "자르반 4세가 방패를 소환해 {p1}초 동안 근처 적들을 {p2}% <status>둔화</status>시키고 <shield>{p3}의 피해를 흡수하는 보호막</shield>을 얻으며 적중한 적 챔피언 하나당 <shield>{p4}의 추가 보호막 흡수량</shield>을 얻습니다.", // 황금빛 방패
        "E": "<passive>기본 지속 효과:</passive> 자르반 4세의 <attackspeed>공격 속도가 {p1}%</attackspeed> 상승합니다.<br><br><active>사용 시:</active> 자르반 4세가 지면에 깃발을 던져 <magicdamage>{p2}의 마법 피해</magicdamage>를 입히고 {p3}초 동안 깃발 근처 아군의 <attackspeed>공격 속도를 {p4}%</attackspeed> 상승시킵니다.", // 데마시아의 깃발
        "R": "자르반 4세가 적 챔피언을 향해 용감하게 뛰어들어 대상과 근처 적들에게 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 {p2}초 동안 지나갈 수 없는 벽으로 둘러쌉니다.<br><br>스킬을 <recast>재사용</recast>하면 벽을 무너뜨릴 수 있습니다.", // 대격변
    },
    "Xayah": { // 자야
        "P": "스킬 사용 후 다음 {p1}회 기본 공격이 경로에 있는 모든 적에게 {p2}%의 피해를 입히고 {p3}초 동안 유지되는 <keywordmajor>깃털</keywordmajor>을 남깁니다.<br><br><spellname>연인의 귀환:</spellname> 자야와 라칸은 동시에 귀환할 수 있습니다.", // 관통상 — stringtable
        "Q": "자야가 연타 공격을 가해 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 <keywordmajor>깃털</keywordmajor> 두 개를 남깁니다. 두 번째 대상부터는 단검 하나당 <physicaldamage>{p2}의 피해</physicaldamage>를 입힙니다.", // 깃털 연타
        "W": "자야가 {p1}초 동안 칼날 폭풍을 일으켜 <attackspeed>공격 속도가 {p2}%</attackspeed> 상승하고 기본 공격 시 두 번째 칼날을 날려 {p3}%의 피해를 입힙니다.<br><br>두 번째 칼날이 챔피언에게 적중하면 {p4}초 동안 자야의 <speed>이동 속도가 {p5}%</speed> 상승합니다.<br><br>라칸이 근처에 있으면 함께 이 스킬의 효과를 받습니다. 단, <i>자야</i>가 대상을 공격해야 라칸의 <speed>이동 속도</speed>가 상승합니다.", // 죽음의 깃
        "E": "자야가 모든 <keywordmajor>깃털</keywordmajor>을 불러들여 각 깃털로 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다. 적이 {p2}개 이상의 <keywordmajor>깃털</keywordmajor>에 맞으면 {p3}초 동안 <status>속박</status>됩니다.", // 깃부르미
        "E_rules": "<rules>피해량은 치명타 확률과 치명타 피해량에 따라 <physicaldamage>{p4}%</physicaldamage> 만큼 증가합니다.<br>미니언 상대로는 {p5}%의 피해를 입힙니다.<br>적은 깃털에 맞을 때마다 받는 피해가 5%씩 감소하여 최소 10%의 피해를 받습니다.</rules>", // 구분선 아래 회색 글씨
        "R": "자야가 공중으로 도약해 1.5초 동안 대상으로 지정할 수 없는 유체화 상태가 된 후 원뿔 모양으로 공격을 가해 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 일렬로 <keywordmajor>깃털</keywordmajor>을 남깁니다.", // 저항의 비상
        "R_rules": "<rules>대상으로 지정할 수 없는 유닛은 이미 영향을 받은 상태가 아닌 한 적의 기본 공격이나 스킬에 영향을 받지 않습니다.<br>유체화 상태인 유닛은 다른 유닛과 충돌하지 않습니다.<br>자야는 공중에 뜬 상태로 이동할 수 있습니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Zyra": { // 자이라
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "P": [
            "자이라가 주변에 30초간 유지되는 <keywordmajor>씨앗</keywordmajor>을 {p1}초마다 생성합니다. <keywordmajor>씨앗</keywordmajor>은 한 번에 8개까지 심을 수 있습니다. 적 챔피언이 밟은 <keywordmajor>씨앗</keywordmajor>은 죽습니다. 자이라가 수풀에 숨은 동안에는 <keywordmajor>씨앗</keywordmajor>이 생성되지 않습니다.",
            "<keywordmajor>씨앗</keywordmajor>은 자이라의 다른 스킬로 사용되어 <magicdamage>{p2}의 마법 피해</magicdamage>를 입히는 식물을 생성합니다."
        ], // 가시 정원 — stringtable
        "Q": "자이라가 굵은 가시덤불이 지면을 뚫고 나와 폭발하게 하여 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다.<br><br><keywordmajor>씨앗</keywordmajor> 근처에서 이 스킬을 사용하면 <keywordmajor>씨앗</keywordmajor>이 가시 발사 꽃으로 자라 <magicdamage>{p2}의 마법 피해</magicdamage>를 입히고 {p3}초 동안 유지됩니다. 가시 발사 꽃의 사거리는 575입니다.", // 치명적인 가시
        "W": "자이라가 {p1}초 동안 유지되는 <keywordmajor>씨앗</keywordmajor>을 심습니다. 적 챔피언이 이 <keywordmajor>씨앗</keywordmajor>을 밟으면 {p2}초간 해당 챔피언에 대한 <keywordstealth>절대 시야</keywordstealth>가 생기지만 씨앗은 파괴됩니다.<br><br>이 스킬은 2회까지 충전되며 {p3}초마다 재충전됩니다. 적 미니언이나 몬스터를 처치하면 재충전 시간이 {p4}% 감소합니다. 챔피언 처치 관여 시 재충전 시간이 {p5}% 감소합니다.", // 맹렬한 성장
        "E": "자이라가 전방으로 가시 덩굴을 발사하여 {p1}초 동안 <status>속박</status>하고 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다. <br><br>이 스킬이 <keywordmajor>씨앗</keywordmajor> 근처를 지나면 <keywordmajor>씨앗</keywordmajor>이 덩굴 채찍손으로 자라 <magicdamage>{p3}의 마법 피해</magicdamage>를 입히고 {p4}초 동안 유지됩니다. 덩굴 채찍손의 사거리는 400이며 기본 공격 시 {p5}초 동안 적을 {p6}% <status>둔화</status>시킵니다. 덩굴 채찍손으로 여러 번 맞은 대상은 <status>둔화</status>가 최대 {p7}회 중첩됩니다.", // 휘감는 뿌리
        "R": "자이라가 자연의 분노를 모아 뒤틀린 덩굴손을 소환하여 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. 2초 후, 덩굴이 수축하면서 {p2}초 동안 <status>공중으로 띄워 올립니다</status>.<br><br>덩굴손이 소환된 위치에 있는 자이라의 식물들은 격분하여 지속시간이 초기화되고 <healing>체력이 {p3}%</healing> 증가하며 {p4}%의 추가 피해를 입힙니다.", // 올가미 덩굴
    },
    "Zac": { // 자크
        "P": "자크는 스킬로 적을 맞힐 때마다 몸에서 <keywordmajor>조각</keywordmajor>이 떨어져 나갑니다. 이 조각들을 다시 흡수하면 <healing>최대 체력의 {p1}</healing>를 회복할 수 있습니다.<br><br>죽으면 자크가 4조각으로 갈라졌다가 다시 합쳐지려고 모입니다. 몸 조각 중 하나라도 <scalelevel>{p2}</scalelevel>초 동안 생존할 경우, 살아남은 조각의 체력에 따라 10~50%의 체력을 가지고 부활합니다. 재사용 대기시간은 {p3}초입니다.", // 세포 분열 — stringtable
        "Q": "자크가 팔을 뻗어 처음 맞힌 적을 붙잡고 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히며 잠깐 동안 <status>둔화</status>시킵니다. 자크의 다음 기본 공격은 사거리가 증가하며 동일한 피해를 입히고 <status>둔화</status>시킵니다. <br><br>자크가 <i>다른</i> 적에게 기본 공격을 가하면 둘을 <status>공중으로 띄워 올려</status> 서로에게 던집니다. 충돌 시 해당 적과 주변 적은 <magicdamage>{p1}의 마법 피해</magicdamage>를 입으며 잠깐 동안 <status>둔화</status>합니다.", // 탄성 주먹
        "Q_rules": "<rules>{p2}% <status>둔화</status>합니다. <br>최대 마법 피해: <magicdamage>{p3}</magicdamage></rules>", // 구분선 아래 회색 글씨
        "W": "자크의 몸이 터져서 주위에 있는 적 모두에게 <magicdamage>{p1}+최대 체력의 {p2}에 해당하는 마법 피해</magicdamage>를 입힙니다.<br><br><keywordmajor>조각</keywordmajor>을 흡수하면 이 스킬의 재사용 대기시간이 1초 감소합니다.", // 불안정 물질
        "W_rules": "<rules>미니언과 정글 몬스터의 경우 체력 비례 피해량은 최대 200까지만 입힐 수 있습니다.</rules>", // 구분선 아래 회색 글씨
        "E": "<charge>충전 시작:</charge> 자크가 {p1}초 동안 자신의 몸을 팽팽히 당겨 돌진할 준비를 합니다.<br><br><release>발사:</release> 자크가 자신의 몸을 날려 착지하는 곳에 있는 적을 충전 시간에 비례해 최대 {p2}초 동안 <status>공중으로 띄워 올리고</status> <magicdamage>{p3}의 마법 피해</magicdamage>를 입힙니다. 적 챔피언을 하나 맞힐 때마다 <keywordmajor>조각</keywordmajor>이 하나씩 생성됩니다.", // 새총 발사
        "E_rules": "<rules>이동 시 스킬이 취소됩니다.<br>취소되면 재사용 대기시간과 소모값이 절반만큼 회복됩니다.</rules>", // 구분선 아래 회색 글씨
        "R": "자크가 {p1}회 튀어 오릅니다. 자크에게 처음 맞은 적은 뒤로 <status>밀리며</status> <magicdamage>{p2}의 마법 피해</magicdamage>를 입습니다. 이후에는 맞을 때마다 <magicdamage>{p3}의 마법 피해</magicdamage>를 입고 {p4}초 동안 {p5}% <status>둔화</status>합니다.<br><br>자크는 <speed>이동 속도가 {p6}%</speed>까지 점점 증가하며 튀어 오르는 동안 <spellname>불안정 물질</spellname> 스킬을 사용할 수 있습니다.", // 바운스!
        "R_rules": "<rules>피해량: 총 <magicdamage>{p7}의 마법 피해</magicdamage><br>지속시간 동안 <speed>이동 속도</speed>가 <speed>{p8}%</speed>에서 <speed>{p6}%</speed>까지 증가합니다.<br>바운스! 지속시간 동안 자크는 유체화 상태가 됩니다. 유체화 상태인 유닛은 다른 유닛과 충돌하지 않습니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Zaahen": { // 자헨
        "P": "적 챔피언에게 기본 공격 또는 스킬 적중 시 자헨이 <keyword>결심</keyword> 중첩을 1 얻습니다. 최대 {p1}회 중첩되며, 중첩당 <physicaldamage>공격력이 {p2}</physicaldamage> 증가합니다.<br><br><keyword>결심</keyword>이 가득 차면 기본 지속 효과 추가 <physicaldamage>공격력</physicaldamage>이 두 배가 되며, 사망하게 될 경우 대신 {p3}초 동안 경직된 다음 <healing>최대 체력의 {p4}</healing>에 해당하는 체력과 함께 부활합니다.<br><br>자헨의 부활에는 {p5}초의 재사용 대기시간이 적용됩니다.<br>", // 전쟁 단련 — stringtable
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "Q": [
            "자헨이 다음 기본 공격 시 두 번 공격하며 <physicaldamage>{p1}의 추가 물리 피해</physicaldamage>를 입히고 <healing>최대 체력의 {p2}%</healing>만큼 체력을 회복합니다.",
            "<recast>재사용 시:</recast> 다음 기본 공격 시 대상에게 <physicaldamage>{p3}의 추가 물리 피해</physicaldamage>를 입히고 {p4}초 동안 <status>공중에 띄웁니다</status>."
        ], // 다르킨의 글레이브
        "Q_rules": "<rules>대상이 챔피언이 아닐 경우 체력 회복량이 {p5}%로 감소합니다.</rules><br><rules>몬스터에게는 {p6}%의 추가 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "W": "자헨이 지정한 방향으로 내질러 적중한 적에게 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 <status>끌어당겨</status> <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입힙니다.", // 공포의 귀환
        "E": "자헨이 돌진한 후 주변을 가르며 근처 적에게 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다.<br><br>가르기 범위 가장자리에 있는 적은 대신 <physicaldamage>{p2}의 물리 피해</physicaldamage>와 <magicdamage>대상 최대 체력의 {p3}%에 해당하는 마법 피해</magicdamage>를 입습니다.", // 찬란한 쇄도
        "E_rules": "<rules>몬스터에게는 <physicaldamage>{p4}의 추가 물리 피해</physicaldamage>를 입힙니다.</rules><br><rules>추가 최대 체력 비례 피해량은 몬스터를 상대로 최대 {p5}입니다.</rules><br>", // 구분선 아래 회색 글씨
        "R": "<passive>기본 지속 효과</passive>: 자헨의 <armorpen>방어구 관통력이 {p1}%</armorpen> 증가합니다.<br><br><active>사용 시</active>: 자헨이 날아오릅니다. 스킬을 사용하는 동안 받는 피해량이 {p2}% 감소합니다.<br><br>자헨이 아래로 내려찍으며 <physicaldamage>{p3}의 물리 피해</physicaldamage>를 입히고 <healing>적 챔피언에게 입힌 피해량의 {p4}%만큼 체력을 회복</healing>합니다.", // 단호한 판결
    },
    "Janna": { // 잔나
        "P": "아군 챔피언이 잔나를 향해 움직일 때 <speed>이동 속도가 {p1}%</speed> 증가합니다.<br><br>잔나가 <keywordmajor>서풍</keywordmajor>으로 <magicdamage>{p2}의 추가 마법 피해</magicdamage>(<onhit>적중 시</onhit> %i:OnHit%)를 입힙니다.", // 순풍 — stringtable
        "Q": "잔나가 {p1}초에 걸쳐 점점 세진 후 경로를 따라 이동하는 회오리바람을 소환합니다. 회오리바람은 <magicdamage>{p2}~{p3}의 마법 피해</magicdamage>를 입히고 {p4}~{p5}초 동안 <status>공중으로 띄워 올립니다</status>. 거리, 피해량, <status>띄워 올리기</status> 지속시간은 회오리바람이 커진 정도에 비례해 증가합니다. <recast>재사용</recast>하면 회오리바람이 더 일찍 날아갑니다.", // 울부짖는 돌풍
        "Q_rules": "<rules>회오리바람은 매초 커질수록 <magicdamage>{p6}의 마법 피해</magicdamage>를 추가로 입히고 <status>공중으로 띄워 올리는</status> 시간이 {p7}초 늘어나며 이동 거리가 {p8}% 증가합니다. 또한 반드시 {p9}초 안에 목표 지점에 도달합니다.</rules>", // 구분선 아래 회색 글씨
        "W": "<passive>기본 지속 효과:</passive> 잔나의 <speed>이동 속도가 {p1}</speed> 증가하며 유체화 상태가 됩니다.<br><br><active>사용 시:</active> 잔나의 원소가 적을 공격하여 {p2}초 동안 {p3} <status>둔화</status>시키고 <magicdamage>{p4}+{p5}의 마법 피해</magicdamage>를 입힙니다.", // 서풍
        "W_rules": "<rules>유체화 상태인 유닛은 다른 유닛과 충돌하지 않습니다.</rules><br>", // 구분선 아래 회색 글씨
        "E": "잔나가 {p1}초 동안 아군 챔피언이나 포탑에 <shield>{p2}의 피해를 흡수하는 보호막</shield>을 부여합니다. 대상은 보호막이 지속되는 동안 <scalead>{p3}의 공격력</scalead>을 얻습니다.<br><br>잔나가 스킬로 적 챔피언의 이동을 방해할 때마다 재사용 대기시간의 {p4}%를 돌려받습니다.", // 폭풍의 눈
        "R": "잔나가 마법의 계절풍을 소환하여 주변 적들을 <status>뒤로 밀어낸</status> 후 {p1}초에 걸쳐 주변 아군의 <healing>체력을 {p2}</healing>만큼 회복시킵니다. 이동하거나 스킬을 사용하면 계절풍이 일찍 사라집니다.", // 계절풍
        "R_rules": "<rules><status>뒤로 밀려난</status> 적은 벽 너머까지 밀려나지 않습니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Jax": { // 잭스
        "P": "잭스가 기본 공격 시 2.5초 동안 <attackspeed>공격 속도가 {p1}</attackspeed> 상승합니다. (최대 <attackspeed>공격 속도 {p2}</attackspeed>)", // 가차없는 맹공 — stringtable
        "Q": "잭스가 아군 또는 적 유닛, 와드를 향해 도약합니다. 적인 경우 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다.", // 도약 공격
        "W": "잭스가 무기에 힘을 모아 다음 기본 공격이나 <spellname>도약 공격</spellname> 시 <magicdamage>{p1}의 마법 피해</magicdamage>를 추가로 입힙니다.", // 무기 강화
        "W_rules": "<rules>이 스킬은 피해를 입힐 때 효과가 발동합니다.<br>구조물에 {p2}%의 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "E": "잭스가 {p1}초간 방어 태세에 들어가 기본 공격을 회피하고, 광역 스킬로부터 받는 피해가 {p2}% 감소합니다. {p1}초가 지나거나 스킬을 <recast>재사용</recast>하면 근처 적들에게 <magicdamage>{p3}+최대 체력의 {p4}%에 해당하는 마법 피해</magicdamage>를 입히고 {p5}초 동안 <status>기절</status>시킵니다. <br><br>회피한 기본 공격 1회당 피해량이 {p6}%씩 최대 <magicdamage>{p7}+최대 체력의 {p8}%</magicdamage>까지 증가합니다.", // 반격
        "R": "<passive>기본 지속 효과:</passive> {p1}초 안에 세 번째 공격을 할 때마다 <magicdamage>{p2}의 마법 피해</magicdamage>를 추가로 입힙니다.<br><br><active>사용 시:</active> 잭스가 가로등을 내리쳐 주변 적에게 <magicdamage>{p3}의 마법 피해</magicdamage>를 입힙니다. 챔피언을 맞히면 <scalearmor>방어력이 {p4}</scalearmor>, <scalemr>마법 저항력이 {p5}</scalemr> 증가하며 다음 {p6}초 안에 맞힌 챔피언 하나당 <scalearmor>방어력이 {p7}</scalearmor>, <scalemr>마법 저항력이 {p8}</scalemr>씩 추가로 증가합니다. 이때 세 번째가 아닌 두 번째 기본 공격마다 <magicdamage>마법 피해</magicdamage>를 추가로 입힙니다.", // 무기의 달인
        "R_rules": "<rules>구조물에 {p9}%의 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Zed": { // 제드
        "P": "제드가 체력 {p1}% 이하인 적을 기본 공격하면 <magicdamage>대상 최대 체력의 {p2}에 해당하는 마법 피해</magicdamage>를 추가로 입힙니다. 같은 적 챔피언에게는 이 효과가 {p3}초에 한 번씩만 적용됩니다.", // 약자 멸시 — stringtable
        "Q": "제드와 <keywordmajor>그림자</keywordmajor>가 표창을 던져, 각각 처음 맞는 적에게 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 이후 추가로 맞히는 적에게는 각각 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입힙니다.", // 예리한 표창
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "W": [
            "<passive>기본 지속 효과:</passive> 제드와 <keywordmajor>그림자</keywordmajor>가 같은 스킬로 동일한 대상을 공격할 때마다 제드가 <keywordmajor>{p1}의 기력</keywordmajor>을 얻습니다.",
            "<active>사용 시:</active> 제드의 <keywordmajor>그림자</keywordmajor>가 전방으로 질주하여, {p2}초간 그 자리에 유지됩니다. 이 스킬을 <recast>재사용</recast>하면 제드가 <keywordmajor>그림자</keywordmajor>와 위치를 바꿉니다."
        ], // 살아있는 그림자
        "W_rules": "<rules><keywordmajor>기력</keywordmajor> 회복은 스킬 사용 시마다 한 번씩만 가능합니다.</rules>", // 구분선 아래 회색 글씨
        "E": "제드와 <keywordmajor>그림자</keywordmajor>가 각각 주위 적을 베어 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다.<br><br>제드가 이 스킬로 적 챔피언을 하나 맞힐 때마다 <spellname>살아있는 그림자</spellname>의 재사용 대기시간이 {p2}초씩 감소합니다.<br><br><keywordmajor>그림자</keywordmajor>의 스킬에 맞은 적은 {p3}초 동안 {p4}% <status>둔화</status>됩니다. 그림자 베기로 동일한 대상을 여러 번 맞힐 경우, 추가 피해는 입히지 않지만 {p5}%의 <status>둔화</status> 효과가 적용됩니다.", // 그림자 베기
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "R": [
            "제드가 잠시 대상으로 지정할 수 없는 상태가 되어 적 챔피언에게 돌진하며 표식을 남깁니다. {p1}초가 지나면 표식이 발동되며 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입히고 표식이 적용된 동안 제드가 대상에게 가한 피해의 {p3}%에 해당하는 피해를 추가로 입힙니다.",
            "돌진 시 {p4}초 동안 유지되는 <keywordmajor>그림자</keywordmajor>가 남습니다. 이 스킬을 <recast>재사용</recast>하면 제드가 이 <keywordmajor>그림자</keywordmajor>와 위치를 바꿉니다."
        ], // 죽음의 표식
        "R_rules": "<rules>대상으로 지정할 수 없는 유닛은 이미 적중당한 상태가 아닌 한 적의 기본 공격이나 스킬에 영향을 받지 않습니다.</rules><br><rules><keywordmajor>그림자</keywordmajor>는 재사용 가능 시간이 끝나도 1.5초 동안 더 유지됩니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Xerath": { // 제라스
        "P": "제라스는 16초마다 챔피언에 대한 기본 공격으로 <scalemana>{p1}의 마나</scalemana>를 회복합니다. 미니언이나 정글 몬스터, 구조물을 대상으로는 <scalemana>{p2}의 마나</scalemana>를 회복합니다.<br><br>제라스가 유닛을 처치하면 이 스킬의 재사용 대기시간이 {p3}초 감소합니다.", // 마나 쇄도 — stringtable
        "Q": "<charge>충전 시작:</charge> 제라스가 비전 광선을 충전하기 시작해 50%까지 서서히 <status>둔화</status>됩니다. <br><br><release>발사:</release> 제라스가 광선을 발사해 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. 충전 시간에 따라 사거리가 늘어납니다.", // 비전 파동
        "Q_rules": "<rules>제라스가 광선을 발사하지 않으면 소모된 마나의 절반이 회복됩니다.</rules>", // 구분선 아래 회색 글씨
        "W": "제라스가 비전 에너지포를 소환하여 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고, {p2}초 동안 {p3}% <status>둔화</status>시킵니다. 중심에 있는 적들은 <magicdamage>{p4}의 마법 피해</magicdamage>를 입고 {p5}% <status>둔화</status>했다가 {p2}초에 걸쳐 원래대로 돌아옵니다.", // 파멸의 눈
        "W_rules": "<rules>강화된 <status>둔화</status> 효과는 {p3}%까지 감소합니다.</rules>", // 구분선 아래 회색 글씨
        "E": "제라스가 순수한 마법의 구체를 발사합니다. 처음으로 맞은 적은 구체가 이동한 거리에 비례해 최대 {p1}초 동안 <status>기절</status>하고 <magicdamage>{p2}의 마법 피해</magicdamage>를 입습니다.", // 충격 구체
        "E_rules": "<rules><status>기절</status> 지속시간은 최소 0.75초입니다.</rules>", // 구분선 아래 회색 글씨
        "R": "제라스가 순수한 모습으로 승화하면서 {p1}초 동안 정신을 집중합니다. 이 동안 스킬을 {p2}회까지 <recast>재사용</recast>할 수 있습니다.<br><br><recast>재사용 시:</recast> 제라스가 비전 폭격을 발사해 <magicdamage>{p3}의 마법 피해</magicdamage>를 입힙니다. 챔피언을 맞힐 때마다 <magicdamage>{p4}의 마법 피해</magicdamage>를 추가로 입힙니다.", // 비전 의식
        "R_rules": "<rules>제라스가 한 번도 스킬을 <recast>재사용</recast>하지 않으면 재사용 대기시간이 {p5}% 줄어듭니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Zeri": { // 제리
        "P": "제리의 기본 공격은 스킬로 간주되며, 이동하거나 <spellname>집중 사격</spellname>을 사용해 충전할 수 있습니다. 충전되지 않은 기본 공격은 충전된 에너지의 일부를 소모하며 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 <attention>체력 {p2}</attention> 아래의 적을 <danger>처형</danger> 합니다. 완전히 충전된 기본 공격은 <magicdamage>{p3}+최대 체력의 {p4}에 해당하는 마법 피해</magicdamage>를 입히고 충전된 에너지를 전부 소모합니다.", // 살아있는 배터리 — stringtable
        "Q": "제리가 단숨에 {p1}발을 발사해 처음 적중하는 적에게 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입힙니다. 이 스킬은 기본 공격으로 간주됩니다.", // 집중 사격
        "Q_rules": "<rules>이 스킬을 사용해 입히는 피해에는 치명타가 적용될 수 있고, 대상당 한 번 적중 시 효과를 적용합니다. 기본 공격할 수 있는 대상이라면 무엇이든 맞힐 수 있습니다. 재사용 대기시간과 시전 시간이 <attackspeed>공격 속도</attackspeed>(최대 <attackspeed>초당 공격 횟수 {p3}회</attackspeed>)에 따라 감소합니다. <attackspeed>공격 속도</attackspeed> 초과분의 {p4}%가 <physicaldamage>공격력</physicaldamage>으로 전환됩니다.</rules>", // 구분선 아래 회색 글씨
        "W": "제리가 전기 파동을 발사해 처음 적중하는 적에게 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 {p2}초 동안 {p3}% <status>둔화</status>시킵니다.<br><br>파동이 지형에 맞으면 광선으로 확산되어 범위 내 모든 적에게 같은 효과를 적용하고 챔피언과 몬스터에게 치명타가 적용되어 <physicaldamage>{p4}의 물리 피해</physicaldamage>를 입힙니다.", // 초강력 레이저
        "W_rules": "<rules>이 스킬의 시전 시간은 <attackspeed>공격 속도</attackspeed>에 따라 감소합니다.<br>강화된 피해량은 치명타 피해량에 따라 {p5}%만큼 증가합니다.</rules>", // 구분선 아래 회색 글씨
        "E": "제리가 짧은 거리를 돌진하며 맞닥트리는 지형을 모두 뛰어넘습니다. 지형을 뛰어넘으면 돌진 거리가 크게 늘어납니다. {p1}초 동안 <spellname>집중 사격</spellname>의 다음 사격이 적을 꿰뚫어, 두 번째 적부터는 {p2}%의 피해를 입히며 처음 적중한 대상에게 <magicdamage>{p3}의 마법 피해</magicdamage>를 추가로 입힙니다. <br><br>기본 공격으로 적을 맞히면 이 스킬의 재사용 대기시간이 {p4}초 감소합니다. 치명타 적중 시 재사용 대기시간이 {p5}초 감소합니다.", // 스파크 돌진
        "E_rules": "<rules>적중 시 피해량은 제리의 치명타 확률 및 치명타 피해량에 따라 {p6}%만큼 증가합니다.<br>첫 적을 꿰뚫은 후에도 치명타가 적용될 수 있지만, 적중 시 효과는 적용되지 않습니다.</rules>", // 구분선 아래 회색 글씨
        "R": "제리가 전류를 방출해 근처 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. 적 챔피언에게 적중하면 제리가 {p2}초 동안 <attackspeed>공격 속도 {p3}%</attackspeed>와 <speed>이동 속도{p4}%</speed>를 얻습니다. 기본 공격이나 스킬로 적 챔피언을 맞히면 스킬 지속시간이 증가하고 {p5}초 동안 과충전 중첩이 1 쌓입니다. 치명타 적중 시 추가 중첩이 2 쌓입니다. 중첩 하나당 <speed>이동 속도가 {p6}%</speed> 증가합니다.<br><br>이 동안 <spellname>집중 사격</spellname>이 더욱 빠른 3연발 사격으로 바뀌어 대상 주변 적에게 추가 <physicaldamage>{p7}의 물리 피해</physicaldamage>를 연쇄적으로 입힙니다.<br><br>", // 번개 방출
        "R_rules": "<rules><attackspeed>공격 속도</attackspeed> 증가 효과는 제리의 <attackspeed>최대 공격 속도</attackspeed>도 증가시킵니다. 연쇄 번개에는 치명타가 적용될 수 있지만 적중 시 효과는 적용하지 않습니다. 충전되지 않은 기본 공격은 이 스킬의 중첩을 쌓거나 지속시간을 초기화시키지 않습니다.<br>스킬 지속시간은 기존 지속시간인 {p2}초를 초과할 수 없습니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Jayce": { // 제이스
        "P": "제이스는 1레벨부터 <spellname>머큐리 캐논 / 머큐리 해머</spellname>를 사용해 근접 무기와 원거리 무기를 교체할 수 있습니다. 무기를 교체하면 스킬 또한 바뀌며 {p1}초 동안 <speed>이동 속도가 {p2}</speed> 상승합니다.", // 마법공학 축전기 — stringtable
        "Q": "<keywordmajor>머큐리 해머:</keywordmajor> 제이스가 적에게 도약해 주변 적들에게 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 {p2}초 동안 {p3}% <status>둔화</status>시킵니다.", // 하늘로! / 전격 폭발
        "Q_rules": "<rules>정글 몬스터에게는 {p4}의 추가 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "W": "<keywordmajor>머큐리 해머 - 기본 지속 효과:</keywordmajor> <keywordmajor>해머</keywordmajor>로 공격 시 제이스의 <scalemana>마나가 {p1}</scalemana> 회복됩니다.<br><br><keywordmajor>머큐리 해머 - 사용 시:</keywordmajor> 제이스가 전류 오라를 생성해 {p2}초 동안 <magicdamage>{p3}의 마법 피해</magicdamage>를 입힙니다.", // 전류 역장 / 초전하
        "E": "<keywordmajor>해머 형태</keywordmajor>: 제이스가 해머를 휘둘러 대상을 <status>뒤로 밀어내고</status> <magicdamage>{p1}+대상 최대 체력의 {p2}%에 해당하는 마법 피해</magicdamage>를 입힙니다.", // 천둥 강타 / 가속 관문
        "E_rules": "<rules><keywordmajor>해머</keywordmajor> 공격은 정글 몬스터를 상대로 최대 <magicdamage>{p3}의 마법 피해</magicdamage>를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "R": "<keywordmajor>머큐리 해머</keywordmajor>: 제이스가 무기를 원거리 공격용 <keywordmajor>머큐리 캐논</keywordmajor>으로 변환하고 새로운 스킬을 사용할 수 있게 됩니다. 제이스의 다음 기본 공격은 {p1}초 동안 대상의 <scalemr>마법 저항력</scalemr>과 <scalearmor>방어력을 {p2}</scalearmor> 감소시킵니다.", // 머큐리 캐논 / 머큐리 해머
        "Q2": "<keywordmajor>머큐리 캐논</keywordmajor>: 제이스가 전기 구체를 발사해 처음 적중한 적과 주변 모든 적에게 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다. 전기 구체가 <spellname>가속 관문</spellname>을 통과하면 사거리와 이동 속도가 상승하며 피해량이 <physicaldamage>{p2}</physicaldamage>까지 증가합니다.", // 전격 폭발 — 대포 형태
        "Q2_rules": "<rules>정글 몬스터에게는 {p3}의 추가 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "W2": "<keywordmajor>머큐리 캐논:</keywordmajor> 제이스가 캐논을 과충전해 최대 <attackspeed>공격 속도</attackspeed>로 {p1}회 공격합니다. 각 공격은 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입힙니다.", // 초전하 — 대포 형태
        "E2": "<keywordmajor>머큐리 캐논</keywordmajor>: 제이스가 {p1}초 동안 가속 관문을 열어 통과하는 아군 챔피언의 <speed>이동 속도를 {p2}%</speed> 상승시킵니다. 상승한 이동 속도는 {p3}초에 걸쳐 원래대로 되돌아옵니다.", // 가속 관문 — 대포 형태
        "R2": "<keywordmajor>머큐리 캐논:</keywordmajor> 제이스가 무기를 근접 공격용 <keywordmajor>머큐리 해머</keywordmajor>로 변환하고 새로운 스킬을 사용할 수 있게 됩니다. 또한 <scalearmor>{p1}의 방어력</scalearmor>과 <scalemr>마법 저항력</scalemr>을 얻고, 다음 기본 공격 시 <magicdamage>{p2}의 마법 피해</magicdamage>를 추가로 입힙니다.", // 머큐리 해머 — 대포 형태
    },
    "Zoe": { // 조이
        "P": "조이가 스킬을 사용한 후 첫 번째 기본 공격 시 <magicdamage>{p1}의 마법 피해</magicdamage>를 추가로 입힙니다.", // 반짝반짝! — stringtable
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "Q": [
            "조이가 이동거리가 길어질수록 더 큰 피해를 입히는 별을 발사합니다. 처음 적중한 적과 주변 적은 <magicdamage>{p1}~{p2}의 마법 피해</magicdamage>를 입습니다.",
            "조이는 스킬을 <recast>재사용</recast>해 별을 근처의 새로운 목표 지점으로 보낼 수 있습니다."
        ], // 통통별
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "W": [
            "<passive>기본 지속 효과:</passive> 적이 소환사 주문이나 사용 효과가 있는 아이템을 사용하면 주문 파편을 떨어뜨립니다. 일부 미니언도 조이 또는 주변 아군에게 처치당하면 주문 파편을 떨어뜨립니다. 주문 파편을 획득하면 해당 주문이나 아이템 효과를 한 번 사용할 수 있습니다.<br><passive>기본 지속 효과:</passive> 조이가 이 스킬 또는 소환사 주문을 사용하면 {p1}초 동안 <speed>{p2}%의 이동 속도</speed>를 얻고 가장 마지막에 기본 공격한 대상에게 3개의 미사일을 발사합니다. 각각의 미사일은 <magicdamage>{p3}의 마법 피해</magicdamage>를 입힙니다.",
            "<active>사용 시:</active> 조이가 획득한 주문 파편으로 해당 주문이나 아이템 효과를 사용합니다."
        ], // 주문도둑
        "W_rules": "<rules>주문 파편은 40초 동안 지면에 남습니다.<br>각각의 미사일은 <spellname>반짝반짝!</spellname> 효과를 발동시킬 수 있습니다.</rules>", // 구분선 아래 회색 글씨
        "E": "조이가 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히는 방울을 던집니다. 방울이 아무도 맞히지 못하면 덫이 되어 그 자리에 남습니다. 방울을 벽 너머로 던지면 사거리가 증가합니다.<br><br>방울 또는 덫이 적 챔피언에게 적중하면 조이의 스킬 재사용 대기시간이 {p2}%만큼 초기화됩니다.<br><br>방울에 맞은 적은 잠시 후 2초 동안 <status>수면</status> 상태가 되고 <scalemr>마법 저항력</scalemr>이 {p3}% 감소합니다. 기본 공격이나 스킬에 맞으면 두 배의 피해(최대 <truedamage>{p4}의 고정 피해</truedamage>)를 입고 잠에서 깨어납니다.<br><br>", // 헤롱헤롱쿨쿨방울
        "E_rules": "<rules><status>수면</status> 상태가 되기 전 적은 <status>졸음</status> 상태가 되어 점차 <status>둔화</status>됩니다. (최대 {p5}%)</rules>", // 구분선 아래 회색 글씨
        "R": "조이가 1초 동안 근처 위치로 순간이동한 뒤 다시 돌아옵니다. 순간이동한 동안에는 스킬 사용과 기본 공격은 할 수 있지만, 이동은 불가능합니다.", // 차원 넘기
        "R_rules": "<rules>또한 조이는 순간이동한 동안 벽 너머를 볼 수 있습니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Ziggs": { // 직스
        "P": "{p1}초마다 직스의 다음 기본 공격이 <magicdamage>{p2}의 마법 피해</magicdamage>를 추가로 입힙니다. 구조물에는 <magicdamage>{p3}의 피해</magicdamage>를 입힙니다. <br><br>직스가 스킬을 사용하면 짧은 도화선의 재사용 대기시간이 {p4}초 단축됩니다.", // 짧은 도화선 — stringtable
        "Q": "직스가 반동 폭탄을 던져 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다.", // 반동 폭탄
        "W": "직스가 폭약을 던지면 {p1}초 후, 혹은 스킬을 <recast>재사용</recast>할 때 폭발합니다. 폭발은 적에게 <magicdamage>{p2}의 마법 피해</magicdamage>를 입히며 <status>뒤로</status> <status>밀어냅니다</status>. 직스 역시 밀려나지만 피해는 입지 않습니다.<br><br>포탑의 체력이 {p3}% 밑으로 내려가면 휴대용 폭약이 자동으로 포탑을 파괴합니다.", // 휴대용 폭약
        "E": "직스가 밟으면 터지는 지뢰를 뿌려, 지뢰에 닿은 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초 동안 {p3}%만큼 <status>둔화</status>시킵니다. 지뢰는 {p4}초 동안 유지됩니다.", // 마법공학 지뢰밭
        "E_rules": "<rules>두 번째 지뢰부터는 <magicdamage>{p5}의 피해</magicdamage>를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "R": "직스가 궁극의 무기를 던져 폭발 범위 중앙에 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. 가장자리에는 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다.", // 지옥 화염 폭탄
    },
    "Jhin": { // 진
        "P": "진이 사용하는 총은 공격 속도가 고정되어 있으며 {p1}발을 발사한 후엔 재장전해야 합니다. {p1}번째 총탄은 언제나 치명타가 발동되며, <physicaldamage>대상이 잃은 체력의 {p2}만큼 추가 물리 피해</physicaldamage>를 입힙니다.<br><br>추가 효과:<li>진이 <physicaldamage>{p3}의 추가 공격력</physicaldamage>을 얻습니다.<li>진의 치명타 피해량이 {p4}% 감소하지만, {p5}초 동안 <speed>이동 속도가 {p6}</speed> 증가합니다.<br><br>", // 속삭임 — stringtable
        "Q": "진이 폭탄을 던져 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힌 후 아직 폭탄에 맞지 않은 근처의 적에게 튕깁니다.<br><br>폭탄은 최대 {p2}번까지 적을 맞힐 수 있으며, 폭탄으로 적을 처치할 때마다 그다음 타격의 피해량이 {p3}%씩 늘어납니다.", // 춤추는 유탄
        "W": "진이 원거리 공격을 가하여 처음 적중한 챔피언과 경로상에 있는 다른 모든 적에게 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다.<br><br>이 스킬로 아군 챔피언에게 공격당한 챔피언을 {p2}초 안에 공격했다면 대상을 {p3}초 동안 <status>속박</status>하고 <spellname>속삭임</spellname>의 이동 속도 증가 효과를 얻습니다.", // 살상연희
        "W_rules": "<rules>미니언에게는 {p4}%의 피해를 입힙니다.<br><spellname>강제 관람</spellname>으로 설치한 함정을 밟은 챔피언들도 속박됩니다.</rules>", // 구분선 아래 회색 글씨
        "E": "<passive>기본 지속 효과:</passive> 진이 적 챔피언을 처치하면 해당 위치에 연꽃 함정이 설치되어 폭발합니다.<br><br><active>사용 시:</active> 진이 {p1}분 동안 유지되는 보이지 않는 연꽃 함정을 설치합니다. 함정을 밟은 적은 {p2}% <status>둔화</status>됩니다. 함정은 {p3}초 후 폭발하여 <magicdamage>{p4}의 마법 피해</magicdamage>를 입힙니다.<br><br>이 스킬은 2회까지 충전됩니다. ({p5}초마다 충전)", // 강제 관람
        "E_rules": "<rules>연꽃 함정은 미니언과 최근에 다른 연꽃 함정에 적중한 적에게 {p6}%의 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "R": "진이 자세를 잡고 정신을 집중해 4발의 강력한 탄환을 발사하며, 각 탄환은 처음 적중한 챔피언에게 대상이 잃은 체력에 비례해 <physicaldamage>{p1}</physicaldamage>~<physicaldamage>{p2}의 물리 피해</physicaldamage>를 입히고 {p3}초 동안 {p4}% <status>둔화</status>시킵니다. 4번째 총탄은 치명타가 발동되며 {p5}%만큼 피해를 입힙니다.", // 커튼 콜
    },
    "Zilean": { // 질리언
        "P": "질리언은 시간을 경험치의 형태로 보존하여 아군에게 줄 수 있습니다. 아군의 레벨을 올려줄 수 있을 만큼 경험치가 모이면 해당 아군을 우클릭하여 건네줄 수 있습니다. 질리언 역시 아군에게 준 만큼의 경험치를 얻습니다.<br><br><rules>전투 중에는 경험치를 건네줄 수 없습니다.</rules>", // 시간의 유리병 — 2026-08-09 직접 작성. 원래 "{{Spell_HeightenedLearning_Tooltip_{p1}}}" 가 그대로 찍히고 있었다. 본문은 generatedtip_passive_heightenedlearning_description, 단서는 _tooltipextended 의 <rules> 에서 가져왔다. 수치가 없는 스킬이라 하드코딩 문제가 없다 ("건넨 경험치: 총 @TotalXP@" 는 현재 상태값이라 뺐다)
        "Q": "질리언이 주변 작은 반경 안에 들어오는 첫 번째 유닛에게 부착되는 시한 폭탄을 던집니다. {p1}초가 지나면 폭탄이 터지면서 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다.<br><br>이미 폭탄이 있는 유닛에 두 번째 폭탄을 설치하면 바로 첫 번째 폭탄이 터지면서 {p3}초 동안 폭발 반경 안의 적을 <status>기절</status>시킵니다.", // 시한 폭탄
        "Q_rules": "<rules>폭탄은 이미 폭탄이 있는 챔피언과 유닛에게 우선적으로 부착됩니다.</rules>", // 구분선 아래 회색 글씨
        "W": "질리언이 시간을 돌려 다른 기본 스킬의 재사용 대기시간을 {p1}초 감소시킵니다.", // 되감기
        "E": "질리언이 {p1}초 동안 적 챔피언을 {p2}% <status>둔화</status>시키거나 아군 챔피언의 <speed>이동 속도를 {p2}%</speed> 높입니다.", // 시간 왜곡
        "R": "질리언이 아군 챔피언에게 {p1}초 동안 보호용 시간 룬을 부여합니다. 대상이 죽을 위기에 처하면 룬이 시간을 되돌려 {p2}초 동안 대상을 경직 상태로 만든 후 부활시켜 <healing>{p3}의 체력</healing>을 회복시킵니다.", // 시간 역행
        "R_rules": "<rules>경직 상태에 빠진 유닛은 움직이거나 행동할 수 없으며 대상으로 지정할 수 없는 무적 상태가 됩니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Jinx": { // 징크스
        "P": "징크스가 챔피언이나 에픽 몬스터, 구조물에 피해를 입힌 뒤 {p1}초 안에 해당 챔피언, 에픽 몬스터가 처치되거나 구조물이 파괴되면 {p2}초간 징크스의 <attackspeed>공격 속도가 {p3}%</attackspeed> 증가하고 <speed>이동 속도가 {p4}% 증가했다가 점차 감소</speed>합니다.<br><br>챔피언 처치 관여 시 <attackspeed>공격 속도</attackspeed>가 최대 5회까지 중첩됩니다.", // 신난다! — stringtable
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "Q": [
            "징크스가 생선대가리 로켓 런처와 빵야빵야 미니건을 변환합니다.<br><br>로켓 런처로 기본 공격 시 마나를 소모하여 대상과 주변 적들에게 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다. 추가 공격 속도는 {p2}% 느려지지만 사거리는 {p3}만큼 증가합니다.",
            "미니건으로 기본 공격 시 {p4}초 동안 <attackspeed>공격 속도</attackspeed>가 상승합니다. 이 효과는 최대 {p5}번까지 중첩됩니다. (<attackspeed>최대 의 {p6}%</attackspeed>)"
        ], // 휘릭휘릭!
        "Q_rules": "<rules>중첩은 시간이 지날 때마다 하나씩 떨어지며, 로켓 런처로 변환한 다음 징크스의 첫 기본 공격에만 효과가 적용됩니다.</rules>", // 구분선 아래 회색 글씨
        "W": "징크스가 전기 충격파를 발사하여 처음 맞힌 적에게 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 {p2}초 동안 {p3}% <status>둔화</status>시키며 위치를 드러냅니다.", // 빠직!
        "W_rules": "<rules>징크스의 <attackspeed>공격 속도</attackspeed>가 증가할수록 빠직!의 시전 시간이 감소합니다.</rules>", // 구분선 아래 회색 글씨
        "E": "징크스가 {p1}초간 유지되는 와작와작 지뢰 3개를 던집니다. 적 챔피언이 닿으면 {p2}초 동안 <status>속박</status>시키고 폭발하여 주변 적들에게 <magicdamage>{p3}의 마법 피해</magicdamage>를 입힙니다.", // 와작와작 뻥!
        "E_rules": "<rules>적을 <status>쓰러뜨리는</status> 스킬입니다.</rules>", // 구분선 아래 회색 글씨
        "R": "징크스가 로켓을 발사합니다. 로켓은 발사 후 첫 1초 동안 피해량이 커지며, 적 챔피언을 맞히면 폭발하여 <physicaldamage>{p1}~{p2}+대상이 잃은 체력의 {p3}%에 해당하는 물리 피해</physicaldamage>를 입힙니다. 주변 적들은 {p4}%의 피해를 입습니다.<br><br><rules>몬스터를 상대로는 잃은 체력 비례 피해량이 {p5}까지만 적용됩니다.</rules>", // 초강력 초토화 로켓!
    },
    "Chogath": { // 초가스
        "P": "적 유닛을 처치할 때마다 체력을 <scalelevel>{p1}</scalelevel>, 마나를 <scalelevel>{p2}</scalelevel> 회복합니다.", // 육식 — stringtable
        "Q": "초가스가 땅을 파열시켜 {p1}초 동안 적들을 <status>공중으로 띄워 올리고</status> <magicdamage>{p2}의 마법 피해</magicdamage>를 입히며 {p3}초 동안 {p4}% <status>둔화</status>시킵니다.", // 파열
        "W": "초가스가 울부짖으며 {p1}초 동안 적들을 <status>침묵</status>시키고 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다.", // 흉포한 울부짖음
        "E": "초가스가 다음 세 번의 기본 공격 시 가시를 발사하여 <magicdamage>{p1}+대상 최대 체력의 {p2}에 해당하는 마법 피해</magicdamage>를 입힙니다. 피해를 입은 적은 {p3}% <status>둔화</status>했다가 {p4}초에 걸쳐 원래대로 돌아옵니다.", // 날카로운 가시
        "E_rules": "<rules>가시는 <spellname>포식</spellname> 중첩에 비례해 커지며 중첩당 최대 체력 비례 피해가 {p5}% 상승합니다.<br>몬스터의 경우 체력 비례 피해는 {p6}의 피해로 대체됩니다.</rules>", // 구분선 아래 회색 글씨
        "R": "초가스가 적을 게걸스럽게 먹어치워, 챔피언에게는 <truedamage>{p1}</truedamage>, 미니언과 정글 몬스터에게는 <truedamage>{p2}</truedamage>의 고정 피해를 입힙니다. 대상이 처치되면 초가스의 포식 중첩이 1 올라, 몸집이 커지며 <healing>최대 체력이 {p3}</healing> 오릅니다. 에픽 몬스터가 아닌 일반 정글 몬스터와 미니언 처치로는 최대 {p4}중첩까지만 얻을 수 있습니다.", // 포식
        "R_rules": "<rules>미니언 및 일반 정글 몬스터 중첩은 최대 {p4}까지 쌓입니다.<br>중첩에 따라 초가스의 공격 사거리와 <spellname>포식</spellname> 사거리가 증가합니다.<br>중첩당 공격 사거리 {p6} (최대 {p7})<br>중첩당 포식 사거리 {p8} (최대 {p9})</rules>", // 구분선 아래 회색 글씨
    },
    "Karma": { // 카르마
        "P": "카르마는 <spellname>만트라</spellname> 스킬을 가지고 게임을 시작합니다.<br><br>챔피언에게 스킬로 피해를 입히면 <spellname>만트라</spellname>의 재사용 대기시간이 {p1}초 줄어듭니다.", // 열정 응집 — stringtable
        "Q": "카르마가 에너지 구체를 발사하여 처음 적중한 대상과 그 주변 적들에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고, {p2}초 동안 {p3}% <status>둔화</status>시킵니다.", // 내면의 열정
        "W": "카르마가 챔피언이나 정글 몬스터와 자신을 연결하여 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초 동안 모습을 드러냅니다. 연결이 끊어지지 않으면 대상은 다시 <magicdamage>{p1}의 마법 피해</magicdamage>를 입고 {p3}초 동안 <status>속박</status>됩니다.", // 굳은 결의
        "E": "카르마가 아군 챔피언에게 {p1}초 동안 <shield>{p2}의 피해를 흡수하는 보호막</shield>을 씌우고 {p3}초 동안 <speed>이동 속도를 {p4}%</speed> 상승시킵니다.", // 고무
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "R": [
            "카르마가 8초 동안 다음 스킬을 강화합니다.",
            "<li><spellname>내면의 열정</spellname>: <magicdamage>{p1}의 마법 피해</magicdamage>를 추가로 입히고 원형의 불꽃을 남깁니다. 불꽃은 적들을 <status>둔화</status>시키고 <magicdamage>{p2}의 마법 피해</magicdamage>를 추가로 입힙니다.",
            "<li><spellname>굳은 결의</spellname>: 카르마가 지속시간 처음과 끝에 <healing>{p3}의 잃은 체력</healing>을 회복하고, {p4}초 더 <status>속박</status>합니다.",
            "<li><spellname>고무</spellname>: 카르마가 대상에게 <shield>피해를 {p5}만큼 더 흡수하는 보호막</shield>을 씌웁니다. 주변 아군에게도 <shield>{p6}의 피해를 흡수하는 보호막</shield>을 씌우고 <speed>이동 속도를{p7}%</speed> 상승시킵니다."
        ], // 만트라
    },
    "Camille": { // 카밀
        "P": "카밀이 챔피언을 기본 공격하면 피해 유형(<physicaldamage>물리</physicaldamage> 또는 <magicdamage>마법</magicdamage>)에 따라 {p1}초 동안 <shield>{p2}의 피해를 흡수하는 보호막</shield>이 생깁니다. 이 효과의 재사용 대기시간은 {p3}초입니다.", // 적응형 방어 체계 — stringtable
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "Q": [
            "카밀이 다음 기본 공격 시 <physicaldamage>{p1}의 추가 물리 피해</physicaldamage>를 입히고 {p2}초 동안 <speed>이동 속도가 {p3}%</speed> 증가합니다. ",
            "{p4}초 후에 스킬을 <recast>재사용</recast>할 수 있습니다.",
            "첫 번째 기본 공격 후 {p5}초가 지난 뒤 스킬을 <recast>재사용</recast>하여 공격 시 추가 피해량이 증가해 <physicaldamage>{p6}</physicaldamage>의 피해를 입히고, 이 중 {p7}는 <truedamage>고정 피해</truedamage>로 적용됩니다.<br><br><rules>이 스킬은 피해를 입힐 때 효과가 발동합니다.</rules>"
        ], // 정확성 프로토콜
        "W": "카밀이 다리를 감아올려 휩쓸며 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다.<br><br>바깥쪽 절반에서 맞은 적은 이동 속도가 {p2}% <status>느려졌다가</status> {p3}초에 걸쳐 원래대로 돌아오며, 추가로 <physicaldamage>최대 체력에 비례해 {p4}의 물리 피해</physicaldamage>를 입습니다. 이때 카밀은 <healing>챔피언에게 입힌 추가 피해량의 {p5}%만큼 체력</healing>을 회복합니다.", // 전술적 휩쓸기
        "W_rules": "<rules>대상이 에픽 정글 몬스터가 아닐 경우, 피해량이 {p6}% 감소합니다.<br>정글 몬스터의 경우 최대 체력 비례 피해는 {p7}까지만 입힐 수 있습니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "E": [
            "카밀이 지형에 걸리는 갈고리를 발사해 1초 동안 자신을 지형으로 끌어당깁니다. 이 스킬은 <recast>재사용</recast>할 수 있습니다.",
            "<recast>재사용 시:</recast> 카밀이 지형으로부터 도약해 처음 마주치는 적 챔피언과 충돌합니다. 충돌 시 {p1}초 동안 <attackspeed>공격 속도가 {p2}%</attackspeed> 증가하고 주변 적에게 <physicaldamage>{p3}의 물리 피해</physicaldamage>를 입히며 적 챔피언을 {p4}초 동안 <status>기절</status>시킵니다. 적 챔피언을 향해 도약할 경우 도약 거리가 두 배로 증가합니다."
        ], // 갈고리 발사
        "R": "카밀이 잠시 대상으로 지정할 수 없게 되며 적 챔피언에게 도약해 {p1}초 동안 어떤 방법으로도 탈출할 수 없도록 일정 지역 내에 가두고 정신 집중을 방해합니다. 근처의 다른 적은 <status>뒤로 밀려납니다</status>. 갇힌 적에 대한 카밀의 기본 공격은 <magicdamage>대상 현재 체력의 {p2}%에 해당하는 마법 피해</magicdamage>를 추가로 입힙니다.", // 마법공학 최후통첩
        "R_rules": "<rules>카밀이 해당 지역을 벗어나면 스킬 효과가 끝납니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Kassadin": { // 카사딘
        "P": "카사딘이 받는 마법 피해가 {p1}% 감소하며 유체화 상태가 됩니다.", // 공허석 — stringtable
        "Q": "카사딘이 공허 에너지 구체를 발사하여 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 정신 집중을 끊습니다. 또한 1.5초 동안 <shield>{p2}의 마법 피해를 흡수하는 보호막</shield>을 얻습니다.", // 무의 구체
        "W": "<passive>기본 지속 효과:</passive> 카사딘의 기본 공격이 <magicdamage>{p1}의 마법 피해</magicdamage>를 추가로 입힙니다.<br><br><active>사용 시:</active> 카사딘이 검을 충전하여 다음 기본 공격으로 <magicdamage>{p2}의 마법 피해</magicdamage>를 입히고 <scalemana>잃은 마나의 {p3}%</scalemana>를 회복합니다. (챔피언 공격 시 <scalemana>{p4}%</scalemana>로 증가)", // 황천의 검
        "E": "<passive>기본 지속 효과:</passive> 카사딘 근처에서 스킬을 사용하면 <spellname>힘의 파동의</spellname> 재사용 대기시간이 {p1}초 감소합니다.<br><br><active>사용 시:</active> 카사딘이 공허의 파동을 발사해 <magicdamage>{p2}의 마법 피해</magicdamage>를 입히고 {p3}초 동안 {p4}% <status>둔화</status>시킵니다.", // 힘의 파동
        "R": "카사딘이 근처로 순간이동하며 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다.<br><br>다음 {p2}초 안에 이 스킬을 연속으로 사용하면 두 배의 마나를 소모하며 <magicdamage>{p3}의 마법 피해</magicdamage>를 추가로 입힙니다. 마나 소모량 및 피해량 증가는 최대 {p4}회까지 중첩됩니다.", // 균열 이동
    },
    "Karthus": { // 카서스
        "P": "카서스는 죽은 뒤에 {p1}초 동안 마나를 소비하지 않고 스킬을 사용할 수 있습니다.", // 죽음 극복 — stringtable
        "Q": "카서스가 마법으로 폭발을 일으켜 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. 하나의 적만 맞힐 경우 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다.", // 황폐화
        "W": "카서스가 {p1}초 동안 유지되는 벽을 생성합니다. 벽을 지나는 적은 {p2}초간 <scalemr>마법 저항력이{p3}%</scalemr> 감소하고 {p4}% <status>둔화</status>됩니다. 둔화 효과는 시간이 지나면서 점차 사라집니다.", // 고통의 벽
        "E": "<passive>기본 지속 효과: </passive>카서스가 적 유닛을 처치할 때마다 <scalemana>{p1}의 마나</scalemana>를 회복합니다.<br><br><toggle>활성화/비활성화: </toggle>카서스가 죽음의 영역을 생성해 근처 적들에게 초당 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다.", // 부패
        "R": "카서스가 3초 동안 정신 집중을 하여 거리와 관계없이 모든 적 챔피언에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다.", // 진혼곡
    },
    "Cassiopeia": { // 카시오페아
        "P": "카시오페아의 모든 <speed>이동 속도</speed> 추가 효과가 {p1} 증가합니다.", // 독사의 품격 — stringtable
        "Q": "카시오페아가 독가스를 내뿜어 적들을 <keywordmajor>중독</keywordmajor>시키고 {p1}초 동안 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다. 챔피언에게 적중 시 카시오페아의 <speed>이동 속도가 {p3}%</speed> 상승했다가 {p4}초에 걸쳐 원래대로 돌아옵니다.", // 맹독 폭발
        "W": "카시오페아가 맹독을 내뿜어 {p1}초 동안 지속되는 독구름을 남깁니다. 독구름 속의 적은 초당 <magicdamage>{p2}의 마법 피해</magicdamage>를 입고 <keywordmajor>중독</keywordmajor>, <status>이동 스킬 사용 불가</status> 상태가 되며 {p3}% <status>둔화</status>됩니다.", // 독기의 늪
        "E": "카시오페아가 치명적인 가시를 발사해 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. <keywordmajor>중독</keywordmajor>된 적에게 사용 시 <magicdamage>{p2}의 마법 피해</magicdamage>를 추가로 입히고, 자신의 <healing>체력을 {p3}</healing> 회복합니다. 공격로 미니언과 작은 몬스터를 상대로는 회복하는 <healing>체력이 {p4}</healing>로 감소합니다.<br><br>해당 스킬로 대상을 처치하면 카시오페아가 <scalemana>마나를 {p5}</scalemana> 회복합니다.<br><br>", // 쌍독니
        "R": "카시오페아가 석화의 응시로 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 자신을 바라보는 적들을 {p2}초 동안 <status>기절</status>시킵니다. 카시오페아를 등진 적은 같은 시간 동안 {p3}% <status>둔화</status>됩니다.", // 석화의 응시
    },
    "Kaisa": { // 카이사
        "P": "기본 공격 시 {p1}초 동안 <keywordmajor>플라즈마</keywordmajor> 중첩을 쌓고 <magicdamage>중첩당 {p2}+{p3}의 마법 피해</magicdamage>를 추가로 입힙니다. {p4}회 중첩이 쌓인 적을 공격하면 <keywordmajor>플라즈마</keywordmajor>를 소모하며, <magicdamage>대상이 잃은 체력의 {p5}에 해당하는 마법 피해</magicdamage>를 입힙니다. 주변 아군이 적 챔피언을 <status>이동 불가</status> 상태로 만들면 중첩을 {p6}회 적용합니다.<br><br>카이사의 피부가 능력치에 따라 기본 스킬을 진화시킵니다.<br><br><passive>진화 조건:</passive><br><spellname>이케시아 폭우</spellname>: <physicaldamage>추가 공격력 {p8}</physicaldamage><br><spellname>공허추적자</spellname>: <scaleap>주문력 {p10}</scaleap><br><spellname>고속 충전</spellname>: <attackspeed>추가 공격 속도 {p12}%</attackspeed>", // 두 번째 피부 — stringtable. 각 항목의 "현재값/요구치" 에서 앞쪽 현재값({p7}·{p9}·{p11}) 제거
        "Q": [
            "카이사가 근처 적들을 추격하는 미사일을 {p1}개 발사하며, 적중한 적에게 각각 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입힙니다. (최대 <physicaldamage>{p3}</physicaldamage>) 이미 미사일에 맞은 적 챔피언 또는 몬스터에게 추가 적중할 경우 {p4}%의 피해를 입힙니다.",
            "<keywordmajor>진화 시</keywordmajor>: 미사일을 {p5}개 발사합니다.<br><rules>진화 조건: <physicaldamage>추가 공격력 {p7}</physicaldamage></rules>"
        ], // 이케시아 폭우 — "현재: {p6}/{p7}" 에서 현재값 제거
        "Q_rules": "<rules><scalehealth>체력이 {p8}%</scalehealth> 미만인 미니언은 {p9}%의 피해를 입습니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "W": [
            "카이사가 공허 에너지 광선을 발사해 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 <keywordmajor>플라즈마</keywordmajor> 중첩을 {p2}회 적용하며, {p3}초 동안 처음으로 적중한 적에 대한 <keywordstealth>절대 시야</keywordstealth>를 얻습니다.",
            "<keywordmajor>진화 시</keywordmajor>: <keywordmajor>플라즈마</keywordmajor> 중첩을 {p4}회 적용합니다. 챔피언 적중 시 재사용 대기시간이 {p5}% 감소합니다.<br><rules>진화 조건: <scaleap>주문력 {p7}</scaleap></rules>"
        ], // 공허추적자 — "현재: {p6}/{p7}" 에서 현재값 제거
        "W_rules": "<rules>이 스킬로 적용한 <keywordmajor>플라즈마</keywordmajor>는 <spellname>두 번째 피부</spellname>의 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "E": [
            "카이사가 공허 에너지를 고속 충전하여 <speed>이동 속도가 {p1}</speed> 증가하고 충전 중에는 유체화 상태가 되며, {p2}초 동안 <attackspeed>공격 속도가 {p3}%</attackspeed> 증가합니다.<br>기본 공격 시 스킬의 재사용 대기시간이 {p4}초 감소합니다.",
            "<keywordmajor>진화 시</keywordmajor>: {p5}초 동안 <keywordstealth>투명</keywordstealth> 상태가 됩니다.<br><rules>진화 조건: <attackspeed>추가 공격 속도 {p7}%</attackspeed></rules>"
        ], // 고속 충전 — "현재: {p6}/{p7}" 에서 현재값 제거
        "E_rules": "<rules>유체화 상태인 유닛은 다른 유닛을 통과할 수 있습니다.<br><keywordstealth>투명</keywordstealth> 상태의 유닛은 포탑이나 <font color='#ee91d7'>절대 시야</font>로만 모습이 드러납니다.<br>충전 시간은 <attackspeed>공격 속도</attackspeed>에 비례합니다. (현재: {p8})</rules>", // 구분선 아래 회색 글씨
        "R": "카이사가 <keywordmajor>플라즈마</keywordmajor> 표식이 남은 적 챔피언 근처로 빠르게 돌진하며, {p1}초 동안 <shield>{p2}의 보호막</shield>을 얻습니다.", // 사냥본능
    },
    "Khazix": { // 카직스
        "P": "카직스는 적의 시야에 노출되지 않을 때, 다음 기본 공격 시 챔피언에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 추가로 입히고 {p2}초 동안 {p3}% <status>둔화</status>시킵니다.<br><br>근처에 아군이 없는 적은 <keywordmajor>고립</keywordmajor>됩니다.", // 보이지 않는 위협 — stringtable
        "Q": "카직스가 근처 적을 공격해 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다. 아군으로부터 <keywordmajor>고립</keywordmajor>된 적에게는 <physicaldamage>{p2}의 피해</physicaldamage>를 입힙니다.", // 공포 감지
        "W": "카직스가 가시를 발사하여 처음 적중하는 적과 그 주변 좁은 반경에 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다. 카직스가 폭발 반경 내에 있으면 <healing>체력을 {p2}</healing> 회복합니다.", // 공허의 가시
        "E": "카직스가 도약 후 착지하며 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다.", // 도약
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "R": [
            "<active>사용 시:</active> 카직스가 {p1}초 동안 <keywordstealth>투명</keywordstealth> 상태가 되고 <speed>이동 속도가 {p2}%</speed> 상승합니다. {p3}초 안에 이 스킬을 <recast>재사용</recast>할 수 있습니다.<br><br><passive>기본 지속 효과:</passive> 이 스킬을 레벨 업하면 <evolve>진화</evolve>를 통해 스킬 하나에 추가 효과를 부여합니다.",
            "<li><spellname>공포 감지:</spellname> 스킬 및 기본 공격 사거리가 늘어나고 <keywordmajor>고립</keywordmajor>된 대상에게 사용 시 재사용 대기시간이 {p4}% 감소합니다.",
            "<li><spellname>공허의 가시:</spellname> 가시를 세 개 발사하고 적을 {p5}% <status>둔화</status>합니다. <keywordmajor>고립</keywordmajor>된 대상에게는 효과가 증가합니다.",
            "<li><spellname>도약:</spellname> 사거리가 늘어나고 챔피언 처치 관여 시 재사용 대기시간이 초기화됩니다.",
            "<li><spellname>공허의 습격:</spellname> {p6}초 동안 <keywordstealth>투명</keywordstealth> 상태가 되고 2회 <recast>재사용</recast>할 수 있습니다."
        ], // 공허의 습격
        "R_rules": "<rules><keywordstealth>투명</keywordstealth> 상태의 유닛은 포탑이나 <font color='#ee91d7'>절대 시야</font>로만 모습이 드러납니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Katarina": { // 카타리나
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "P": [
            "카타리나가 피해를 입힌 챔피언이 {p1}초 내에 죽을 때마다 카타리나의 스킬 재사용 대기시간이 {p2}초 감소합니다.",
            "카타리나가 <keywordmajor>단검</keywordmajor>을 다시 주우면 근처의 적을 모두 공격해 <magicdamage>{p3}의 마법 피해</magicdamage>를 입힙니다."
        ], // 탐욕 — stringtable
        "Q": "카타리나가 <keywordmajor>단검</keywordmajor>을 던져 대상과 주변 {p1}명의 적에게 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다. 그 후 <keywordmajor>단검</keywordmajor>은 최초 대상 뒤에 떨어집니다.", // 단검 투척
        "W": "카타리나가 공중에 <keywordmajor>단검</keywordmajor>을 던지고 <speed>이동 속도가 {p1}%</speed> 상승했다가 {p2}초에 걸쳐 원래대로 돌아옵니다.", // 준비
        "E": "카타리나가 대상 아군, 적, 또는 <keywordmajor>단검</keywordmajor>에게 순간적으로 이동합니다. 대상이 적일 경우 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고, 그 외의 경우에는 사거리 안에 있으면서 이동한 지점에서 가장 가까운 적을 공격합니다.<br><br><keywordmajor>단검</keywordmajor>을 다시 주우면 이 스킬의 재사용 대기시간이 <scalelevel>{p2}</scalelevel>초 (<scalelevel>{p3}</scalelevel>) 줄어듭니다. 카타리나는 대상 근처의 어느 지점으로든 순간적으로 이동할 수 있습니다.", // 순보
        "E_rules": "<rules>이 공격은 적중 시 효과가 적용됩니다.</rules>", // 구분선 아래 회색 글씨
        "R": "카타리나가 칼날의 돌풍을 일으켜 매우 빠른 속도로 근처 적 챔피언 세 명을 단검으로 공격합니다. 각 단검은 <magicdamage>{p1}의 마법 피해</magicdamage> 및 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입히고 {p3}초 동안 {p4}%의 고통스러운 상처를 남깁니다.<br><br>적 하나당 {p5}초 동안 받는 총 피해량: <magicdamage>{p6}의 마법 피해</magicdamage> 및 <physicaldamage>{p7}의 물리 피해</physicaldamage>", // 죽음의 연꽃
        "R_rules": "<rules>이 스킬은 피해량의 {p8}%에 해당하는 <onhit>적중 시 및 공격 시</onhit> 효과를 적용하며 치명타나 생명력 흡수를 적용하지 않습니다.<br><physicaldamage>물리 피해</physicaldamage>는 <attackspeed>공격 속도</attackspeed>에 비례해 추가로 증가합니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Kalista": { // 칼리스타
        "P": "칼리스타가 기본 공격이나 <spellname>꿰뚫는 창</spellname>의 준비 동작을 하는 동안 이동 명령을 하면, 칼리스타가 기본 공격과 함께 해당 위치로 도약합니다.<br><br><rules>도약 거리는 장화의 단계에 비례합니다.</rules><br><br>칼리스타의 기본 공격에는 다음과 같은 고유한 단점이 있습니다.<li>취소 불가</li><li>대상이 시야에서 사라지면 빗나감</li><li><physicaldamage>총 공격력의 90%</physicaldamage>만 적용됨</li>", // 전투 태세 — 2026-08-09 직접 작성. 원래 "{{Spell_KalistaP_Tooltip_{p1}}}" 가 그대로 찍히고 있었다. spell_kalistap_tooltip_* 키가 stringtable 에 아예 없어서 game_buff_tooltip_kalistapassivebuff 에서 가져왔다. 90% 는 원문에도 <font color='#FF8C00'> 로 박혀 있던 값
        "Q": "칼리스타가 창을 던져 처음 적중한 대상에게 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다. 대상을 처치하면 창이 계속 뻗어나가 다음으로 적중한 대상에게 <spellname>뽑아 찢기</spellname>의 중첩을 적용합니다.<br><br>칼리스타는 이 스킬을 사용한 후 <spellname>전투 태세</spellname> 효과로 도약할 수 있습니다.", // 꿰뚫는 창
        "W": "<passive>기본 지속 효과:</passive> 칼리스타와 <keywordmajor>계약자</keywordmajor>가 같은 대상을 기본 공격하면 칼리스타가 <magicdamage>최대 체력의 {p1}%에 해당하는 마법 피해</magicdamage>를 입힙니다. 대상 하나당 재사용 대기시간은 {p2}초이며 챔피언이 아닌 대상에게는 최대 {p3}의 피해를 입힙니다.<br><br><passive>사용 시: </passive>칼리스타가 혼을 하나 보내 지정 영역을 정찰하게 합니다. 혼은 세 번 왕복하고 사라지며, 발각된 챔피언은 4초 동안 모습이 드러납니다. 충전 횟수는 2회이며 {p4}초마다 1회 충전됩니다.", // 감시하는 혼
        "E": "<passive>기본 지속 효과: </passive>칼리스타의 창은 대상의 몸에 4초 동안 유지되며 무제한으로 중첩됩니다.<br><br><active>사용 시:</active> 칼리스타가 근처 적에게 박힌 창을 뜯어내며 <physicaldamage>{p1}</physicaldamage>+두 번째 창부터 창 하나당 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입힙니다. 적중당한 적은 {p3}초 동안 <attention>{p4}</attention> <status>둔화</status>됩니다.<br><br>이 스킬로 대상을 처치하면 재사용 대기시간이 초기화되고 <scalemana>마나를 {p5}</scalemana> 돌려받습니다.", // 뽑아 찢기
        "E_rules": "<rules>이 스킬은 에픽 정글 몬스터에게 {p6}%의 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "R": "칼리스타가 <keywordmajor>계약자</keywordmajor>를 옆으로 끌어와 최대 4초간 경직 상태로 만듭니다. <keywordmajor>계약자</keywordmajor>는 마우스를 클릭하여 지정한 위치로 날아갈 수 있습니다. 챔피언과 부딪치면 멈추며, 주변 적들을 <status>뒤로 밀어냅니다</status>. <keywordmajor>계약자</keywordmajor>는 챔피언과 부딪치면 최대 공격 사거리만큼 밀려납니다.", // 운명의 부름
    },
    "Kennen": { // 케넨
        "P": "케넨의 스킬이 적중하면 {p1}초 동안 중첩이 1회 쌓입니다. 중첩이 3회 쌓이면 해당 적은 {p2}초 동안 <status>기절</status>하며 케넨이 <keywordmajor>{p3}의 기력</keywordmajor>을 얻습니다.", // 폭풍의 표식 — stringtable
        "Q": "케넨이 표창을 던져 처음 적중한 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다.", // 천둥의 표창
        "W": "<passive>기본 지속 효과:</passive> 5번째 기본 공격마다 <onhit>적중 시</onhit> <magicdamage>{p1}의 마법 피해</magicdamage>를 추가로 입힙니다.<br><br><active>사용 시:</active> 케넨이 전기 폭발을 일으켜 <spellname>폭풍의 표식</spellname>이 있는 주변 적에게 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다.<br>", // 전류 방출
        "W_rules": "<rules>기본 지속 효과로 <spellname>폭풍의 표식</spellname>이 적용되고, 치명타가 발동되어 {p3}의 피해를 입힐 수 있습니다.<br>구조물 공격 시 기본 지속 효과가 중첩되지만 소모하지는 않습니다. 사용 시 효과는 <spellname>날카로운 소용돌이</spellname>에 적중한 모든 적에게 적용됩니다.</rules>", // 구분선 아래 회색 글씨
        "E": "케넨이 {p1}초 동안 번개 구체로 변신해 유체화 상태가 되어 <speed>{p2}%의 이동 속도</speed>를 얻고 충돌하는 적에게 <magicdamage>{p3}의 마법 피해</magicdamage>를 입힙니다. 한 명 이상의 적에게 피해를 입힐 경우 {p4}의 기력을 얻습니다. <br><br>이 스킬의 효과가 끝나면 {p5}초 동안 <attackspeed>{p6}%의 공격 속도</attackspeed>를 얻습니다. 치명타 발동 시 지속시간이 {p7}초 늘어납니다. <recast>재사용</recast>하면 스킬을 일찍 끝낼 수 있습니다.", // 번개 질주
        "E_rules": "<rules>유체화 상태인 유닛은 다른 유닛을 통과할 수 있습니다.<br>미니언과 정글 몬스터에게는 {p8}%의 피해를 입힙니다.<br>늘어나는 지속시간은 최초 수치를 초과하지 않습니다.</rules>", // 구분선 아래 회색 글씨
        "R": "케넨이 마법 폭풍을 방출해 {p1}초마다 주변 모든 적에게 <magicdamage>{p2}의 마법 피해</magicdamage>를 입히고 {p3}초 동안 <scalearmor>{p4}의 방어력</scalearmor> 및 <scalemr>{p4}의 마법 저항력</scalemr>을 얻습니다. 동일한 적에게 다시 스킬을 맞힐 때마다 피해량이 {p5}%씩 증가합니다.", // 날카로운 소용돌이
        "R_rules": "<rules>이 스킬로 <spellname>폭풍의 표식</spellname>이 3회까지 중첩됩니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Caitlyn": { // 케이틀린
        "P": "{p1}번째 기본 공격마다 케이틀린이 <keywordmajor>헤드샷</keywordmajor>을 발사합니다. 수풀 안에서 공격하면 <keywordmajor>헤드샷</keywordmajor>에 필요한 기본 공격을 {p2}회 한 것으로 간주합니다.<br><br><keywordmajor>헤드샷</keywordmajor>은 <physicaldamage>{p3}의 물리 피해</physicaldamage>를 추가로 입힙니다. <spellname>90구경 투망</spellname> 및 <spellname>요들잡이 덫</spellname>에 적중한 적을 대상으로 할 때는 사거리가 두 배로 늘어납니다. <spellname>요들잡이 덫</spellname>에 적중한 적을 대상으로 <keywordmajor>헤드샷</keywordmajor>은 <physicaldamage>{p4}의 물리 피해</physicaldamage>를 추가로 입힙니다.", // 헤드샷 — stringtable
        "Q": "케이틀린이 조준한 후 적을 관통하는 총알을 발사하여 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다. 첫 번째 대상에게 적중한 후에는 탄도체 유효 범위가 넓어지며 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입힙니다.<br><br><spellname>요들잡이 덫</spellname> 때문에 위치가 드러난 적은 항상 100%의 피해를 입습니다.", // 필트오버 피스메이커
        "W": "케이틀린이 덫을 설치하여 처음 밟는 적을 {p1}초 동안 <status>속박</status>하고 3초 동안 해당 적에 대한 <keywordstealth>절대 시야</keywordstealth>를 얻습니다. 덫은 {p2}초 동안 지속되며 한 번에 {p3}개까지 설치할 수 있습니다. 이 스킬은 {p4}회까지 충전됩니다. ({p5}초마다 충전)<br><br>이 스킬에 의해 속박된 대상은 <keywordmajor>헤드샷</keywordmajor>으로 <physicaldamage>{p6}의 물리 피해</physicaldamage>를 추가로 입습니다.", // 요들잡이 덫
        "E": "케이틀린이 투망을 발사하여 처음으로 적중한 적을 {p1}초 동안 {p2}% <status>둔화</status>시키고 <magicdamage>{p3}의 마법 피해</magicdamage>를 입힙니다. 케이틀린은 뒤로 밀려납니다.", // 90구경 투망
        "R": "케이틀린이 잠시 정신을 집중하고 공을 들인 완벽한 사격을 하여 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다. 다른 적 챔피언이 총알을 대신 맞을 수도 있습니다. 정신을 집중하는 동안 대상에 대한 <keywordstealth>절대 시야</keywordstealth>를 얻습니다.<br><br><rules>피해량은 케이틀린의 치명타 확률 및 치명타 피해량에 비례합니다.</rules>", // 비장의 한 발
    },
    "Kayn": { // 케인
        "P": "<keywordmajor>그림자 암살자</keywordmajor> 케인은 <keywordmajor>다르킨 학살자</keywordmajor> 라아스트를 제압하려고 합니다. 승자는 하나뿐이겠죠.<br><br>원거리 챔피언에게 피해를 입히면 <keywordmajor>그림자 암살자</keywordmajor>가 충전되고, 근접 챔피언에게 피해를 입히면 <keywordmajor>다르킨 학살자</keywordmajor>가 충전됩니다. 최대로 충전되면 케인이 제단에서 영구히 변신할 수 있습니다.<br><br><keywordmajor>그림자 암살자:</keywordmajor> 전투 시작 후 {p1}초 동안 케인의 기본 공격과 스킬이 <magicdamage>{p2}의 마법 피해</magicdamage>를 추가로 입힙니다. 이 효과는 케인이 전투에서 벗어난 지 {p3}초가 지나거나 <spellname>그림자의 지배</spellname>를 사용했을 때만 나타납니다.<br><br><keywordmajor>다르킨 학살자:</keywordmajor> 케인이 챔피언에게 입힌 물리 피해의 {p4}만큼 체력을 회복합니다.", // 다르킨의 낫 — stringtable
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "Q": [
            "케인이 돌진한 후 낫을 휘둘러 통과한 적에게 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힌 다음 주변 적에게 다시 같은 피해를 입힙니다.",
            "<keywordmajor>다르킨 학살자:</keywordmajor> <physicaldamage>{p2}+최대 체력의 {p3}에 해당하는 물리 피해</physicaldamage>를 입힙니다."
        ], // 살상돌격
        "Q_rules": "<rules>미니언과 정글 몬스터에게 <physicaldamage>{p4}의 물리 피해</physicaldamage>를 추가로 입힙니다. (최대 {p5})</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "W": [
            "케인이 낫을 위로 휘둘러 적에게 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 {p2}% <status>둔화</status>시킵니다. 둔화 효과는 {p3}초에 걸쳐 사라집니다.",
            "<keywordmajor>그림자 암살자:</keywordmajor> 케인이 이 스킬을 사용하면서 이동하여 사거리를 늘릴 수 있습니다.",
            "<keywordmajor>다르킨 학살자:</keywordmajor> 또한 적중한 적을 {p4}초 동안 <status>공중으로 띄워 올립니다</status>."
        ], // 몰아치는 낫
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "E": [
            "케인이 {p1}초 동안 유체화 상태가 되어 <speed>이동 속도가 {p2}%</speed> 증가하며 지형을 통과할 수 있습니다. 처음으로 지형을 통과하면 <healing>체력을 {p3}</healing>만큼 회복합니다.<br><br><status>이동 불가</status> 상태가 되거나 지형 밖에서 {p4}초 넘게 머무르면 이 스킬이 즉시 종료됩니다.",
            "<keywordmajor>그림자 암살자:</keywordmajor> <speed>이동 속도가 {p5}%</speed> 증가하고 <status>둔화</status>에 면역이 되며 재사용 대기시간이 {p6}초로 감소합니다."
        ], // 그림자의 길
        "E_rules": "<rules>유체화 상태인 유닛은 다른 유닛을 통과할 수 있습니다.<br>적 챔피언과 전투 중 최대 지속시간은 {p7}초입니다.<br></rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "R": [
            "<passive>기본 지속 효과:</passive> 케인이 피해를 입힌 챔피언에게 3.15초 동안 표식을 남깁니다.<br><br>케인이 표식이 남은 적에게 파고들어 대상으로 지정할 수 없게 됩니다. {p1}초가 지나거나 <recast>재사용</recast>하면 케인이 빠져나오면서 적에게 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입힙니다.",
            "<keywordmajor>그림자 암살자:</keywordmajor> 이 스킬의 사거리, 즉 케인이 빠져나오는 거리가 증가하며 빠져나올 때 <spellname>다르킨의 낫</spellname> 재사용 대기시간이 초기화됩니다.",
            "<keywordmajor>다르킨 학살자:</keywordmajor> <physicaldamage>최대 체력의 {p3}에 해당하는 물리 피해</physicaldamage>를 입히고 <healing>체력을 {p4}</healing> 회복합니다. (피해량의 {p5}%)"
        ], // 그림자의 지배
        "R_rules": "<rules>대상으로 지정할 수 없는 유닛은 이미 적중당한 상태가 아닌 한 적의 기본 공격이나 스킬에 영향을 받지 않습니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Kayle": { // 케일
        "P": "챔피언 레벨 및 스킬 레벨이 오를수록 케일의 공격이 강화됩니다.<br><br><ul><li><scalelevel>{p1}레벨 - 열광:</scalelevel> 케일이 기본 공격 시 {p2}초 동안 <attackspeed>공격 속도가 {p3}%</attackspeed> 상승합니다. (최대 5회 중첩) 최대 중첩 시 희열 상태가 되며 <speed>이동 속도가 {p4}%</speed> 상승합니다.<br></li><li><scalelevel>{p5}레벨 - 비상: </scalelevel>공격 사거리가 {p6}까지 증가합니다.<br></li><li><scalelevel>{p7}레벨 - 작열:</scalelevel> 희열 상태 공격 시 화염파를 발사해 <magicdamage>{p8}의 마법 피해</magicdamage>를 입힙니다.<br></li><li><scalelevel>{p9}레벨 - 승천:</scalelevel> 영구히 희열 상태를 유지하며 공격 사거리가 {p10}까지 늘어납니다.</li></ul>", // 거룩한 승천 — stringtable
        "Q": "케일이 처음으로 적을 맞히면 멈추는 천상의 검을 발사합니다. 검은 대상과 그 뒤에 있는 적들에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초 동안 {p3}% <status>둔화</status>시키며 {p4}초 동안 <scalearmor>{p5}%의 방어력과</scalearmor> <scalemr>마법 저항력</scalemr>을 감소시킵니다.", // 광휘의 일격
        "W": "케일이 자신과 아군 챔피언에게 빛을 불어넣어 <healing>체력을 {p1}</healing> 회복하고 {p2}초 동안 <speed>이동 속도를 {p3}</speed> 상승시킵니다.", // 천상의 축복
        "W_rules": "<rules>대상을 지정하지 않고 이 스킬을 사용하면 범위 내에서 자신의 총 체력 대비 가장 피해를 많이 입은 아군을 치유합니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "E": [
            "<passive>기본 지속 효과:</passive> 기본 공격이 <magicdamage>{p1}의 마법 피해</magicdamage>를 추가로 입힙니다.",
            "<active>사용 시:</active> 케일의 다음 공격 사거리가 증가하며 <magicdamage>대상이 잃은 체력의 {p2}만큼 마법 피해</magicdamage>를 추가로 입힙니다. 이 공격은 케일이 <scalelevel>{p3}레벨</scalelevel>에 도달하면 대상에게 적중 시 폭발하여 주변 적에게 피해를 입힙니다."
        ], // 화염주문검
        "E_rules": "<rules>이 스킬에는 적중 시 효과 및 마법 아이템 효과가 적용되며 정글 몬스터에게는 최대 {p4}의 추가 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "R": "케일이 아군 챔피언 한 명을 {p1}초 동안 무적 상태로 만든 뒤 대상 주위 지역을 정화해 주변 적들에게 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다.", // 신성한 심판
    },
    "KogMaw": { // 코그모
        "P": "코그모가 죽은 후 {p1}초 동안 유닛을 통과해 계속 움직일 수 있으며 <speed>이동 속도가 10%</speed> 증가하고 지속시간 동안 <speed>이동 속도가 {p2}%</speed>까지 증가합니다. 지속시간이 끝나면 폭발하여 근처 적에게 <truedamage>{p3}의 고정 피해</truedamage>를 입힙니다.", // 이케시아식 마무리 — stringtable
        "Q": "<passive>기본 지속 효과:</passive> 코그모의 <attackspeed>공격 속도가 {p1}%</attackspeed> 증가합니다.<br><br><active>사용 시:</active> 코그모가 부식성 침을 토하여 처음 맞은 적에게 <magicdamage>{p2}의 마법 피해</magicdamage>를 입히고 {p3}초 동안 <scalemr>마법 저항력</scalemr>과 <scalearmor>방어력을 {p4}%</scalearmor> 낮춥니다.", // 부식성 침
        "W": "코그모의 사거리가 {p1} 증가하고 {p2}초 동안 <onhit>적중 시</onhit> 추가로 <magicdamage>최대 체력의 {p3}에 해당하는 마법 피해</magicdamage>를 입힙니다.", // 생체마법 폭격
        "W_rules": "<rules>몬스터에게는 최대 <magicdamage>{p4}의 마법 피해</magicdamage>를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "E": "코그모가 분비물을 뱉어 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초 동안 유지되는 분비물 흔적을 남깁니다. 흔적을 지나는 적은 {p3}% <status>둔화</status>됩니다.", // 공허의 분비물
        "R": "코그모가 범위 내에 산성을 뿌려 <magicdamage>{p1}+잃은 체력의 1%당 {p2}%에 해당하는 마법 피해</magicdamage>를 입히고 2초 동안 적중당한 적의 위치를 드러냅니다. <healing>체력이 40%</healing> 이하인 적들은 대신 <magicdamage>{p3}의 마법 피해</magicdamage>를 입습니다.<br><br>{p4}초 안에 사용한 후속 공격은 추가로 <scalemana>{p5}의 마나</scalemana>를 소모합니다. (최대: <scalemana>{p6}의 마나</scalemana>)", // 살아있는 곡사포
    },
    "Corki": { // 코르키
        "P": "코르키의 기본 공격과 <keywordmajor>주문 검</keywordmajor>이 <truedamage>{p1}%의 추가 고정 피해</truedamage>를 입힙니다.<br>기본 공격: <truedamage>{p2}</truedamage><br>치명타: <truedamage>{p3}</truedamage>", // 마법공학 탄약 — stringtable
        "Q": "코르키가 폭탄을 던져 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. {p2}초 동안 폭탄에 맞은 지역과 챔피언이 드러납니다.", // 인광탄
        "W": "코르키가 비행하며 경로를 {p1}초 동안 불태웁니다. 경로에 있는 적들은 지속시간 동안 <magicdamage>{p2}의 마법 피해</magicdamage>를 입습니다.", // 발키리
        "E": "코르키가 전방에 개틀링 건을 발사하여 {p1}초 동안 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입히고 <scalemr>마법 저항력</scalemr>과 <scalearmor>방어력을 최대 {p3}</scalearmor>만큼 감소시킵니다.", // 개틀링 건
        "E_rules": "<rules>감소 효과는 적중 후 {p4}초 동안 유지됩니다.</rules>", // 구분선 아래 회색 글씨
        "R": "코르키가 처음으로 적을 맞히면 폭발하는 미사일을 발사하여 주변 적에게 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다. 세 번째 미사일은 매번 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입힙니다.<br><br>이 스킬은 최대 {p3}회 충전됩니다. 챔피언을 상대로 기본 공격 적중 시 충전 시간이 <attention>{p4}</attention>초 감소합니다.", // 미사일 폭격
    },
    "Quinn": { // 퀸
        "P": "{p1}초마다 발러가 근처 적에게 <keywordmajor>매사냥</keywordmajor> 표식을 남겨 {p2}초간 모습을 드러내게 합니다. 퀸의 다음 기본 공격 <onhit>적중 시</onhit> 해당 대상에게 <physicaldamage>{p3}의 추가 물리 피해</physicaldamage>를 입힙니다.", // 매사냥 — stringtable
        "Q": "발러가 날아가 처음 적중한 적에게 <keywordmajor>매사냥</keywordmajor> 표식을 남기고 {p1}초간 대상의 시야 반경을 줄입니다. 이후 주변의 모든 적에게 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입힙니다.<br><br>최초 대상이 챔피언이 아닌 경우 대상은 {p1}초 동안 <status>공격 불가</status> 상태가 됩니다.", // 실명 공격
        "Q_rules": "<rules>피해량이 몬스터를 대상으로 {p3}% 증가합니다.({p4})</rules>", // 구분선 아래 회색 글씨
        "W": "<passive>기본 지속 효과:</passive> <keywordmajor>매사냥</keywordmajor> 대상을 공격하면 {p1}초간 <attackspeed>공격 속도가 {p2}%</attackspeed>, <speed>이동 속도가 {p3}%</speed> 상승합니다.<br><br><active>사용 시:</active> 발러가 {p4}초 동안 주변의 넓은 지역을 드러냅니다.", // 예리한 감각
        "E": "퀸이 적에게 돌진해 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 대상에게 <keywordmajor>매사냥</keywordmajor> 표식을 남깁니다. 퀸이 뛰어오르며 뒤쪽으로 물러나며 대상을 잠시 <status>뒤로</status> <status>밀어내고</status> {p2}% <status>둔화</status>시킵니다. 둔화 효과는 {p3}초에 걸쳐 사라집니다.", // 공중제비
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "R": [
            "퀸이 발러를 불러 자신을 돕게 합니다. 2초간 정신 집중 후 둘은 하나가 되어 <speed>이동 속도가 {p1}%</speed> 증가하고 이 스킬을 <recast>재사용</recast>할 수 있게 됩니다. 공격하거나 <spellname>실명 공격</spellname> 또는 <spellname>공중제비</spellname> 스킬을 사용하면 이 스킬이 자동으로 <recast>재사용</recast>됩니다.",
            "<recast>재사용 시</recast>: 퀸과 발러가 공중에서 강습해 적 챔피언에게 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입히고 <keywordmajor>매사냥</keywordmajor> 표식을 남긴 후 스킬을 종료합니다."
        ], // 후방 지원
        "R_rules": "<rules>미니언 외의 대상에게 피해를 입으면 {p3}초 동안 이동 속도 증가 효과가 사라집니다.</rules>", // 구분선 아래 회색 글씨
    },
    "KSante": { // 크산테
        "P": "크산테의 스킬이 적중한 적에게 표식을 남깁니다. 표식이 남은 적을 공격하면 <physicaldamage>{p1}+적 최대 체력의 {p2}에 해당하는 물리 피해</physicaldamage>를 입히고 표식을 소모합니다.<br><br><keywordmajor>총공세</keywordmajor>: 크산테의 기본 공격, 스킬, 기본 지속 효과가 적 최대 체력의 {p3}에 해당하는 물리 피해를 추가로 입힙니다.", // 불굴의 본능 — stringtable
        "Q": "크산테가 무기를 내리쳐 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 {p2}초 동안 적에게 {p3}%의 <status>둔화</status> 효과를 적용합니다. 적중 시 {p4}초 동안 엔토포 타격 중첩을 1회 얻습니다. 2회 중첩되면 {p5}초 동안 적들을 <status>기절</status>시키고 <status>끌어당기는</status> 충격파를 발사합니다.<br><br><keywordmajor>총공세</keywordmajor>: 재사용 대기시간이 {p6}% 감소합니다.", // 엔토포 타격
        "Q_rules": "<rules>추가 <scalearmor>방어력</scalearmor> 및 <scalemr>마법 저항력</scalemr>에 비례해 재사용 대기시간 및 시전 시간이 감소합니다. (합계 {p8}까지 적용)</rules>", // 구분선 아래 회색 글씨 — 원문은 "{p7} / {p8}" 인데 앞쪽이 현재 내 챔피언의 값이라 고정값이 없다. 나무위키도 "n / 120" 이라고만 적는다
        "W": "크산테가 무기를 치켜들며 {p1}~{p2}초 동안 방어 태세에 돌입합니다. 이때 크산테는 저지 불가 상태가 되며 받는 피해가 {p3}% 감소합니다. 이후 전방으로 돌진하며 <physicaldamage>{p4}+최대 체력의 {p5}에 해당하는 물리 피해</physicaldamage>를 입힙니다. 적중당한 적은 <status>뒤로 밀려나며</status> {p6}~{p7}초(충전 시간에 비례) 동안 <status>기절</status>합니다.<br><br><keywordmajor>총공세:</keywordmajor> 재사용 대기시간이 초기화됩니다. 피해의 {p8}~{p9}%만큼 <truedamage>고정 피해</truedamage>(충전 시간에 비례)를 추가로 입힙니다. 피해량 감소 효과가 {p10}%까지 증가하며 돌진 속도가 증가하지만 더는 적을 <status>뒤로 밀어내거나</status> <status>기절</status>시키지 않습니다.", // 길을 여는 자
        "W_rules": "<rules>충전 시간이 {p11}%가 되면 최대 효과에 도달합니다.<br>몬스터를 상대로는 최대 {p12}의 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "E": "크산테가 돌진해 {p1}초 동안 <shield>{p2}의 피해를 흡수하는 보호막</shield>을 얻습니다. 아군에게 돌진하면 돌진 사거리가 크게 증가하며 아군도 같이 <shield>보호막</shield>을 얻습니다.<br><br><keywordmajor>총공세</keywordmajor>: 재사용 대기시간이 {p3}% 감소하고 돌진 속도가 증가합니다.", // 발놀림
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "R": [
            "크산테가 엔토포를 부숴 적 챔피언을 <status>뒤로 밀어내고</status> <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힌 후 적 챔피언 뒤로 돌진하며 {p2}초 동안 <keywordmajor>총공세</keywordmajor> 상태에 돌입합니다. 벽에 부딪힌 적은 벽을 뚫고 <status>뒤로 밀려나며</status> 크산테가 다시 공격해 <physicaldamage>{p3}의 물리 피해</physicaldamage>를 입힙니다.",
            "<keywordmajor>총공세</keywordmajor> 상태에서는 크산테의 스킬이 업그레이드되며 크산테의 <attackspeed>공격 속도가 {p4}%</attackspeed>, 추가 방어구 관통력이 {p5}%, <omnivamp>모든 피해 흡혈이 {p6}%</omnivamp> 증가하지만 <healing>최대 체력이 {p7}%</healing>, <scalearmor>추가 방어력이 {p8}%</scalearmor>, <scalemr>추가 마법 저항력이 {p8}%</scalemr> 감소합니다."
        ], // 총공세
        "R_rules": "<rules>크산테가 저지 불가 상태가 되어 스킬 시전 중에 대상을 <status>속박</status>합니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Kled": { // 클레드
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "P": [
            "<keywordmajor>탑승 시:</keywordmajor> 클레드 대신 스칼이 피해를 입습니다. 스칼의 체력이 소진되면 클레드가 스칼에게서 내립니다.",
            "<keywordmajor>미탑승 시:</keywordmajor> 클레드의 <spellname>덫날리기</spellname> 스킬이 변경되고 적 챔피언을 향해 이동할 때 <speed>이동 속도가 {p1}</speed> 증가합니다. 또한 {p2}의 추가 <scalearmor>방어력</scalearmor> 및 <scalemr>마법 저항력</scalemr>을 얻으며, 이 수치는 주변 적 챔피언 하나당 {p3}% 증가해 최대 {p4}까지 증가합니다. 미탑승 상태에서 클레드의 기본 공격은 챔피언에게 {p5} 감소한 피해를 입힙니다.<br>클레드가 챔피언을 공격하면 <keywordmajor>{p6}의 용기</keywordmajor>, 에픽 몬스터와 구조물을 공격하면 <keywordmajor>{p7}의 용기</keywordmajor>, 미니언을 처치하면 <keywordmajor>{p8}의 용기</keywordmajor>를 얻습니다. <keywordmajor>용기</keywordmajor>가 최대로 쌓이면 클레드가 {p9}초에 한 번씩 스칼 체력의 {p10}만큼을 가지고 스칼 위에 다시 탑승합니다."
        ], // 겁쟁이 도마뱀 스칼 — stringtable
        "Q": "<keywordmajor>탑승 시:</keywordmajor> 클레드가 밧줄에 묶인 덫을 던져 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 첫 번째로 맞힌 적 챔피언이나 대형 정글 몬스터를 붙잡습니다.<br><br>클레드가 {p2}초 동안 붙잡은 적과 근거리를 유지하면 적을 <status>끌어당기며</status> <physicaldamage>{p3}의 물리 피해</physicaldamage>를 입히고 {p4}초 동안 {p5}% <status>둔화</status>시킵니다.", // 덫날리기
        "Q_rules": "<rules>클레드가 붙잡은 동안 해당 적에 대한 <keywordstealth>절대 시야</keywordstealth>를 얻습니다.<br>미니언에게는 {p6}%의 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "W": "<passive>기본 지속 효과:</passive> 클레드가 다음 기본 공격 시 네 번의 기본 공격 또는 {p1}초 동안 <attackspeed>공격 속도가 {p2}%</attackspeed> 증가합니다.<br><br>네 번째로 적중한 공격은 <physicaldamage>{p3}+최대 체력의 {p4}에 해당하는 물리 피해</physicaldamage>를 추가로 입힙니다.", // 버럭버럭
        "W_rules": "<rules>몬스터의 경우 최대 체력 비례 피해량은 <physicaldamage>{p5}의 물리 피해</physicaldamage>까지만 입힐 수 있습니다.<br>재사용 대기 중일 때, 기본 공격 시 이 스킬의 재사용 대기시간이 {p6}초 감소합니다. 챔피언이 대상일 경우 재사용 대기시간이 {p7}초 감소합니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "E": [
            "클레드가 돌진하여 경로 상에 있는 적들에게 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고, 미니언과 작은 몬스터를 자신 앞으로 끌어당깁니다.<br><br>이 스킬이 적 챔피언이나 대형 정글 몬스터에게 적중하면 {p2}초 동안 클레드의 <speed>이동 속도가 {p3}%</speed> 증가합니다. ",
            "{p4}초 내에 스킬을 <recast>재사용</recast>하면 같은 대상에게 다시 돌진합니다."
        ], // 이랴!
        "E_rules": "<rules>클레드가 통과한 적에 대한 <keywordstealth>절대 시야</keywordstealth>를 얻습니다.<br></rules>", // 구분선 아래 회색 글씨
        "R": "클레드가 보호막을 쓴 채 목표 지점으로 돌진합니다. 돌진 경로 위에 있는 아군은 <speed>이동 속도</speed>가 빨라집니다. 클레드는 돌진하는 동안 최대 <shield>{p1}의 피해를 흡수하는 보호막</shield>을 얻습니다. 이 보호막은 돌진이 끝나고 2초 후까지 유지됩니다. 스칼은 경로상의 첫 번째 적 챔피언에게 돌격해 <magicdamage>{p2}</magicdamage>~<magicdamage>최대 체력의 {p3}에 해당하는 마법 피해</magicdamage>(이동 거리에 비례)를 입히고 잠시 <status>뒤로 밀어냅니다</status>.", // 돌겨어어억!!!
        "R_rules": "<rules>피해량, <speed>이동 속도</speed>, <shield>보호막 흡수량</shield>은 돌진 {p4}초 후 최대치까지 증가합니다.<br></rules>", // 구분선 아래 회색 글씨
        "Q2": "<keywordmajor>미탑승 시:</keywordmajor> 클레드가 산탄총을 발사하여 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히며 뒤로 밀려납니다. 두 번째로 적중한 탄환부터 피해량이 감소합니다.<br><br>적 챔피언이나 에픽 몬스터가 탄환에 맞을 때마다 스칼의 <keywordmajor>용기</keywordmajor>가 회복됩니다.", // 빵야! — 스카를 하차
        "Q2_rules": "<rules><keywordmajor>용기</keywordmajor>는 챔피언에게 적중 시 {p2}씩, 에픽 몬스터에게 적중 시 {p3}씩 회복됩니다.<br>두 번째 탄환부터 {p4}%의 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Qiyana": { // 키아나
        "P": "키아나가 기본 공격을 하거나 스킬을 사용하면 <physicaldamage>{p1}의 추가 물리 피해</physicaldamage>를 입힙니다. 공격 대상별로 25초의 재사용 대기시간이 적용됩니다.<br><br><spellname>대지창조</spellname> 스킬을 사용해 무기에 다른 <keywordmajor>원소의 힘</keywordmajor>을 부여하면 모든 대상에 대한 이 스킬의 재사용 대기시간이 초기화됩니다.", // 왕가의 특권 — stringtable
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "Q": [
            "무기에 <keywordmajor>원소의 힘</keywordmajor>이 없으면 무기를 휘두르며 좁은 영역에 있는 적들에게 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다. <keywordmajor>원소의 힘</keywordmajor>에 따라 사거리가 증가하고 추가 효과를 얻습니다.",
            "<li><keywordmajor>얼음의 힘</keywordmajor>: 적들을 잠시 동안 <status>속박</status>한 다음 {p2}초 동안 {p3}%만큼 <status>둔화</status>시킵니다.",
            "<li><keywordmajor>바위의 힘</keywordmajor>: 체력이 {p4}%보다 낮은 적에게 <physicaldamage>{p5}의 추가 물리 피해</physicaldamage>를 입힙니다.",
            "<li><keywordmajor>야생의 힘</keywordmajor>: <keywordstealth>투명</keywordstealth> 상태가 되고 <speed>이동 속도가 {p6}%</speed> 상승하는 영역을 생성합니다."
        ], // 원소의 분노 / 이쉬탈의 칼날
        "Q_rules": "<rules>처음으로 적중당한 대상 뒤의 적은 <physicaldamage>{p7}의 물리 피해</physicaldamage>를 입습니다.<br>이 스킬은 정글 몬스터에게 {p8}%의 피해를 입힙니다.<br><keywordstealth>투명</keywordstealth> 상태의 유닛은 포탑이나 <font color='#ee91d7'>절대 시야</font>로만 모습이 드러납니다.</rules>", // 구분선 아래 회색 글씨
        "W": "<passive>기본 지속 효과:</passive> 무기에 <keywordmajor>원소의 힘</keywordmajor>이 부여된 상태에서는 공격 속도가 <attackspeed>{p1}%</attackspeed> 증가하고 기본 공격이 <magicdamage>{p2}의 추가 마법 피해</magicdamage>를 입힙니다. 또한 전투에서 벗어나 힘을 흡수한 지형 근처에 있으면 이동 속도가 <speed>{p3}%</speed> 증가합니다.<br><br><active>사용 시:</active> 근처 수풀, 지형 또는 강을 향해 돌진하며 해당 지형으로부터 <keywordmajor>원소의 힘</keywordmajor>을 흡수해 무기에 부여하고, <spellname>원소의 분노 / 이쉬탈의 칼날</spellname> 재사용 대기시간을 초기화합니다", // 대지창조
        "E": "적을 통과해 돌진하며 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다.", // 대담무쌍
        "E_rules": "<rules>챔피언을 대상으로 이 스킬을 사용하는 도중에 <spellname>원소의 분노 / 이쉬탈의 칼날</spellname> 스킬을 사용하면 자동으로 해당 챔피언을 대상으로 삼습니다.</rules>", // 구분선 아래 회색 글씨
        "R": "키아나가 충격파를 발사합니다. 충격파는 적을 뒤로 <status>밀어내며</status> 벽에 적중 시 폭발합니다. 폭발 후 해당 지형의 외곽 전체도 폭발하여 적을 0.5~{p1}초 동안 <status>기절</status>시키고 <physicaldamage>{p2}</physicaldamage>+최대 체력의 <physicaldamage>{p3}에 해당하는 물리 피해</physicaldamage>를 입힙니다. <status>기절</status> 지속시간은 충격파가 이동한 거리에 비례합니다.<br><br>충격파가 통과하는 강이나 수풀도 잠시 후 폭발하며 적들에게 같은 피해를 입히고 <status>기절</status>시킵니다.", // 여왕의 진가
    },
    "Kindred": { // 킨드레드
        "P": "킨드레드는 소지품 창 위의 챔피언 초상화를 클릭하여 사냥할 챔피언을 선택할 수 있습니다. 미니맵에서 사냥할 정글 몬스터의 아이콘을 자동으로 지정할 수도 있습니다.<br><br>킨드레드가 사냥 대상을 처치하는 데 관여하면 <keywordmajor>표식</keywordmajor> 중첩이 쌓이고 공격이 강화됩니다. <keywordmajor>표식</keywordmajor>이 {p1}만큼 쌓이면 킨드레드의 공격 사거리가 {p2} 증가합니다. 네 번째로 표식을 얻은 이후 <keywordmajor>표식</keywordmajor>이 {p3}회 중첩될 때마다 공격 사거리가 {p4}만큼 증가합니다.<br><br><keywordmajor>표식</keywordmajor>이 중첩되면 킨드레드의 기본 스킬이 강화됩니다.<li><spellname>화살 세례</spellname> 사용 시 <attackspeed>{p5}의 공격 속도</attackspeed>를 얻습니다.<li><spellname>늑대의 광기</spellname> 사용 시 현재 체력의 <magicdamage>{p6}에 해당하는 추가 피해</magicdamage>를 입힙니다.<li><spellname>차오르는 공포</spellname> 사용 시 잃은 체력의 <physicaldamage>{p7}에 해당하는 추가 피해</physicaldamage>를 입힙니다.", // 킨드레드의 표식 — stringtable
        "Q": "킨드레드가 뛰어올라 최대 3명의 적에게 화살을 발사하여 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 {p2}초 동안 <attackspeed>공격 속도가 {p3}</attackspeed>만큼 증가합니다.<br><br><spellname>늑대의 광기</spellname> 범위 안에 있는 동안 이 스킬의 재사용 대기시간이 {p4}초로 감소합니다.", // 화살 세례
        "Q_rules": "<rules>공격 속도는 얻은 <keywordmajor>표식</keywordmajor> 수에 비례합니다.</rules>", // 구분선 아래 회색 글씨
        "W": "<passive>기본 지속 효과:</passive> 킨드레드가 이동하고 공격할 때마다 중첩이 쌓입니다. 100회 중첩 상태에서 다음 기본 공격 시 잃은 체력의 <healing>{p1}에 해당하는 체력</healing>을 회복합니다.<br><br><active>사용 시:</active> 킨드레드가 지대를 지정하고 늑대에게 명령을 내려 양이 마지막으로 공격한 적을 물게 합니다. 늑대의 공격은 <magicdamage>{p2}</magicdamage>+현재 체력의 <magicdamage>{p3}에 해당하는 마법 피해</magicdamage>를 입힙니다.", // 늑대의 광기
        "W_rules": "<rules>늑대의 공격 속도는 킨드레드의 <attackspeed>공격 속도</attackspeed>에 비례합니다. 정글 몬스터 공격 시 늑대가 입히는 피해량이 {p4}% 증가하고 정글 몬스터를 2초 동안 {p5}% <status>둔화</status>시킵니다.</rules>", // 구분선 아래 회색 글씨
        "E": "킨드레드가 적을 약화시켜 {p1}초 동안 {p2}% <status>둔화</status>시킵니다.<br><br>{p3}초 내에 대상을 세 번 공격하면 늑대가 적을 덮쳐 추가로 <physicaldamage>{p4}</physicaldamage>+<physicaldamage>적이 잃은 체력의 {p5}에 해당하는 물리 피해</physicaldamage>를 입힙니다.", // 차오르는 공포
        "E_rules": "<rules>피해량은 치명타 확률 및 치명타 피해량에 비례해 {p6}%만큼 증가합니다.<br>정글 몬스터를 상대로는 잃은 체력 비례 피해가 {p7}까지 적용됩니다.</rules>", // 구분선 아래 회색 글씨
        "R": "킨드레드가 {p1}초 동안 땅을 축복하여 해당 영역 안에 있는 아군, 적, 중립 몬스터를 포함한 모든 유닛이 사망하지 않습니다. 체력이 10%로 떨어지면 유닛들이 해당 영역 안에 있는 동안 피해를 받거나 치유되지 않습니다.<br><br>축복이 끝나면 영역 안에 있는 모든 유닛이 <healing>체력을 {p2}</healing> 회복합니다.", // 양의 안식처
    },
    "Taric": { // 타릭
        "P": "스킬을 사용하고 {p1}초 안에 사용하는 다음 2회 기본 공격의 <attackspeed>공격 속도가 100%</attackspeed> 증가하고 추가로 <magicdamage>{p2}의 마법 피해</magicdamage>를 입히며 기본 스킬의 재사용 대기시간이 {p3}초 감소합니다.", // 담대함 — stringtable
        "Q": "<passive>기본 지속 효과:</passive> {p1}초마다, <spellname>담대함</spellname> 기본 공격이 적중할 때마다 중첩을 1 얻습니다. (최대 {p2})<br><br><active>사용 시:</active> 모든 중첩을 소모해 중첩당 근처 아군 챔피언의 <healing>체력을 {p3}</healing>씩 회복시킵니다. ({p2}회 중첩 시 <healing>{p4}</healing>)", // 별빛 손길
        "W": "<passive>기본 지속 효과: </passive>타릭이 <scalearmor>{p1}의 방어력</scalearmor>을 얻고 자신과 이 스킬로 묶인 아군 사이에 끈을 형성합니다. 서로 가까이 있으면 아군이 <scalearmor>{p1}의 방어력</scalearmor>을 얻으며 타릭과 연결된 아군 둘 다 타릭의 모든 스킬을 사용합니다.<br><br><passive>사용 시: </passive>타릭이 아군 챔피언 하나와 묶이며 {p2}초 동안 <shield>최대 체력의 {p3}%에 해당하는 보호막</shield>을 부여합니다.", // 수호의 고리
        "W_rules": "<rules>모방한 스킬 효과는 중첩되지 않습니다.</rules><br><rules>아군은 한 번에 한 명만 묶을 수 있습니다. </rules><br><br>", // 구분선 아래 회색 글씨
        "E": "타릭이 별빛 광선을 발사합니다. 광선은 {p1}초 후 터지며 <magicdamage>{p2}의 마법 피해</magicdamage>를 입히고 적을 {p3}초 동안 <status>기절</status>시킵니다.", // 황홀한 강타
        "R": "타릭이 천상의 보호를 요청합니다. {p1}초 후 근처 아군 챔피언은 {p2}초 동안 무적 상태가 됩니다.", // 우주의 광휘
    },
    "Talon": { // 탈론
        "P": "탈론이 챔피언이나 대형 정글 몬스터에게 스킬을 사용해 피해를 입히면 {p1}초 동안 중첩을 적용합니다. (최대 3회 중첩)<br><br>3회 중첩된 대상에게 탈론이 기본 공격을 가하면 {p2}초에 걸쳐 <physicaldamage>{p3}의 물리 피해</physicaldamage>를 추가로 입힙니다.", // 검의 최후 — stringtable
        "Q": "탈론이 대상에게 도약해 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다. 근접 공격이 가능한 거리에서 사용하면 대신 치명타가 적용되어 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입힙니다.<br><br>이 스킬로 대상을 처치하면 <healing>체력을 {p3}</healing> 회복하고 재사용 대기시간의 {p4}%를 돌려받습니다.", // 녹서스식 외교
        "Q_rules": "<rules>근접 공격 피해량은 치명타 피해량 증가에 영향을 받습니다.</rules>", // 구분선 아래 회색 글씨
        "W": "탈론이 부메랑 단검을 여러 개 던져 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다. 이후 단검이 돌아오며 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입히고 {p3}초 동안 {p4}% <status>둔화</status>시킵니다.", // 갈퀴손
        "E": "탈론이 가장 가까운 지형이나 구조물 위로 도약해 뛰어넘습니다. 한 번 넘어간 지형은 {p1}초 동안 다시 넘을 수 없습니다.", // 암살자의 길
        "R": "탈론이 사방에 검을 던져 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고, <speed>이동 속도가 {p2}%</speed> 상승하며 {p3}초 동안 <keywordstealth>투명</keywordstealth> 상태가 됩니다. <keywordstealth>투명</keywordstealth> 상태가 끝나면 검이 탈론에게 돌아오며 다시 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다.<br><br>탈론이 기본 공격이나 <spellname>녹서스식 외교</spellname> 스킬로 <keywordstealth>투명</keywordstealth> 상태를 해제하면 검이 탈론 대신 탈론의 대상에게 날아갑니다.", // 그림자 공격
        "R_rules": "<rules><keywordstealth>투명</keywordstealth> 상태의 유닛은 포탑이나 <font color='#ee91d7'>절대 시야</font>로만 모습이 드러납니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Taliyah": { // 탈리야
        "P": "전투 중이 아닐 때 지난 {p1}초 안에 벽 근처에 있었으면 <speed>이동 속도가 {p2}</speed> 증가합니다.", // 바위타기 — stringtable
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "Q": [
            "탈리야가 5개의 바위 조각을 던져 처음으로 맞힌 적 주변 지역에 개당 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 땅을 다집니다. 동일한 적에게 연달아 바위 조각을 맞힐 경우 피해량이 {p2}% 감소합니다.",
            "다져진 땅에서 이 스킬을 사용하면 마나가 {p3} 소모되며 재사용 대기시간이 {p4}% 감소하고 다져진 땅을 소모해 바위를 던집니다. 바위는 적중한 적을 {p5}초 동안 {p6}% <status>둔화</status>시키고 첫 번째 대상에게 <magicdamage>{p7}의 마법 피해</magicdamage>를 입힙니다. 바위에 맞은 몬스터는 {p8}초 동안 <status>기절</status>합니다."
        ], // 파편 난사
        "Q_rules": "<rules>탈리야는 바위를 던지는 도중에 이동하고 다른 스킬을 사용할 수 있습니다.<br>다져진 땅에서 이 스킬을 사용하면 재사용 대기시간이 {p9}초 미만으로 낮아지지 않습니다.<br>단일 대상에 대한 총 피해량: <magicdamage>{p10}</magicdamage><br>각 바위는 몬스터에게 <magicdamage>{p11}</magicdamage>의 추가 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "W": "탈리야가 땅을 흔들어 일정 지역에 있는 적을 선택한 방향으로 <status>밀어냅니다</status>.", // 지각변동
        "E": "탈리야가 일정 지역에 돌을 흩뜨려 적중한 적을 {p1}% <status>둔화</status>시키고 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다. 적이 돌진하거나 <status>밀려나서</status> 돌 위로 지나가게 되면 돌이 폭발하여, 남은 이동 시간+{p3}초 동안 <status>기절</status>시키고 <magicdamage>{p4}의 마법 피해</magicdamage>를 입힙니다.", // 대지의 파동
        "E_rules": "<rules>기절 지속시간은 {p5}초를 초과할 수 없습니다. 각 적은 스킬 사용 한 번당 한 번만 기절합니다. 몬스터에게는 항상 최대 기절 지속시간이 적용됩니다.<br>첫 번째 이후로는 피해량이 {p6}% 감소합니다. <br>최대 폭발 피해량: <magicdamage>{p7}</magicdamage><br>이 스킬은 몬스터에게 {p8}%의 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "R": [
            "탈리야가 {p1}초 동안 거대한 흙벽을 세웁니다. ",
            "즉시 <recast>재사용</recast>하면 움직이는 벽에 올라타며, 이동하거나 이동 불가 효과에 걸리면 벽에서 내려옵니다.<br><br>탈리야가 지난 {p2}초 안에 챔피언 또는 구조물에 의한 피해를 입었으면 이 스킬을 사용할 수 없습니다."
        ], // 바위술사의 벽
        "R_rules": "<rules>벽이 완전히 생성되면 <recast>재사용</recast>하여 일찍 파괴할 수 있습니다.</rules>", // 구분선 아래 회색 글씨
    },
    "TahmKench": { // 탐 켄치
        "P": "공격 시 <magicdamage>{p1}의 추가 마법 피해</magicdamage>를 입힙니다. 적 챔피언 공격 시 {p2}초 동안 <spellname>절대 미각</spellname> 중첩이 쌓이며 최대 {p3}번 중첩됩니다.<br><br>중첩이 {p3}번 쌓이면 해당 챔피언에 대한 <spellname>혀 채찍</spellname>과 <font color='#0bf7de'>집어삼키기</font> 스킬이 강화됩니다.", // 절대 미각 — stringtable
        "Q": "처음 적중한 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초 동안 {p3}% <status>둔화</status>시킵니다. <br><br>챔피언에게 적중 시 탐 켄치가 <healing>{p4}+잃은 체력의 {p5}%</healing>를 회복하고 <spellname>절대 미각</spellname> 중첩을 적용하며 <magicdamage>{p6}의 추가 마법 피해</magicdamage>를 입힙니다. 해당 챔피언에게 <spellname>절대 미각</spellname> 중첩이 이미 3회 쌓였다면 중첩이 소모되며 챔피언이 {p7}초 동안 <status>기절</status>합니다.<br><br>혀가 공중에 떠 있는 동안 <font color='#0bf7de'>집어삼키기</font>를 시전하면 <spellname>절대 미각</spellname> 중첩이 3회 쌓인 적 챔피언에게 적중 시 멀리에서 해당 챔피언을 삼킵니다.", // 혀 채찍
        "Q_rules": "<rules>탐 켄치의 크기에 따라 혀 채찍의 사거리가 늘어납니다.</rules>", // 구분선 아래 회색 글씨
        "W": "아래로 잠수한 후 지정한 장소에서 다시 나타나며 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초 동안 일정 지역에 있는 모든 적을 <status>공중으로 띄웁니다</status>. 적 챔피언을 한 명 이상 적중시키면 재사용 대기시간과 소모한 <scalemana>마나</scalemana>를 {p3}% 돌려받습니다.<br><br><font color='#0bf7de'>집어삼킨</font> 아군을 태우고 함께 이동할 수 있습니다. (아군 유닛은 언제든 일찍 나올 수 있습니다.)", // 심연 잠수
        "W_rules": "적은 정신 집중 시작 후 {p4}초까지 탐 켄치의 도착 지점을 확인할 수 없습니다.<br><br><font color='#cccccc'><i>'세상은 한 줄기 강이고 내가 강의 왕이지. 내가 가보지 않은 곳은 없고, 돌아갈 수 없는 곳도 없다.'</i></font>", // 구분선 아래 회색 글씨
        "E": "<passive>기본 지속 효과:</passive> 탐 켄치가 입은 피해량의 {p1}%가 <spellname>두꺼운 피부</spellname>에 비축됩니다. 근처에 적 챔피언이 {p2}명 이상 있으면 피해량의 {p3}%를 비축합니다. {p4}초 동안 피해를 입지 않으면 <spellname>두꺼운 피부</spellname>를 빠르게 소모하여 비축량의 {p5}만큼 탐 켄치의 체력을 회복합니다.<br><br><active>사용 시:</active> 비축한 <spellname>두꺼운 피부</spellname>를 모두 {p6}초 동안 유지되는 <shield>보호막</shield>으로 전환합니다.", // 두꺼운 피부
        "E_rules": "<rules>회색 체력은 최대 {p7}까지 비축됩니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "R": [
            "탐 켄치가 몇 초 동안 챔피언을 집어삼킵니다. ",
            "스킬 <recast>재사용</recast> 시 내뱉습니다.<br><br><specialrules>적 챔피언:</specialrules> <spellname>절대 미각</spellname> 3회 중첩이 필요합니다. 최대 {p1}초까지 집어삼켜지며 <magicdamage>{p2}(+최대 체력의 {p3})의 마법 피해</magicdamage>를 입습니다. 탐 켄치는 이 효과가 적용되는 동안 {p4}% <status>둔화</status>되며 <keywordname>고정</keywordname>됩니다.<br><br><specialrules>아군 챔피언:</specialrules> 최대 {p5}초까지 집어삼켜지며 내뱉어진 후 <shield>{p6}의 피해를 흡수하는 보호막</shield>을 획득합니다. 보호막은 점차 사라집니다. 아군이 원하면 더 일찍 나올 수도 있습니다. 탐 켄치는 이 효과가 적용되는 동안 <status>고정</status>되지만 <keywordname>심연 잠수</keywordname> 스킬을 사용할 수 있고 {p5}초 동안 <speed>이동 속도가 {p7}%</speed> 증가합니다."
        ], // 집어삼키기
        "R_rules": "<rules>아군은 체력 바 옆에서 이 스킬의 사용 가능 상태를 확인할 수 있습니다. (적은 확인 불가)<br>보호막은 {p8}초에 걸쳐 점차 사라집니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Trundle": { // 트런들
        "P": "트런들은 근처의 적이 쓰러질 때마다 <healing>죽은 적 최대 체력의 {p1}</healing>만큼 체력이 회복됩니다.", // 헌납 — stringtable
        "Q": "트런들의 다음 기본 공격이 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 잠시 {p2}% <status>둔화</status>시킵니다. 이후 {p3}초 동안 트런들의 <physicaldamage>공격력이 {p4}</physicaldamage> 증가하며 적의 <physicaldamage>공격력은 {p5}</physicaldamage> 감소합니다.", // 깨물기
        "Q_rules": "<rules>이 스킬은 피해를 입힐 때 효과가 발동합니다.<br>트런들의 이번 공격 사거리가 {p6} 증가합니다.</rules>", // 구분선 아래 회색 글씨
        "W": "트런들이 {p1}초 동안 일정 지역을 얼립니다. 그 안에 있으면 트런들의 <speed>이동 속도가 {p2}%</speed>, <attackspeed>공격 속도가 {p3}%</attackspeed>, 회복량이 {p4}% 증가합니다.", // 얼음 왕국
        "E": "트런들이 {p1}초 동안 얼음 기둥을 생성하여 기둥 바로 위에 있는 적을 잠시 <status>뒤로 밀어내고</status> 주변 적을 {p2}% <status>둔화</status>시킵니다.", // 얼음 기둥
        "R": "트런들이 적 챔피언의 체력을 흡수하며 {p1}초에 걸쳐 <magicdamage>최대 체력의 {p2}에 해당하는 마법 피해</magicdamage>를 입히고 <scalemr>마법 저항력</scalemr>과 <scalearmor>방어력을 {p3}%</scalearmor> 훔칩니다.", // 진압
        "R_rules": "<rules>피해량의 절반과 방어력 및 마법 저항력 감소 효과가 즉시 발동하고 나머지 절반은 지속시간에 걸쳐 발동합니다.<br>감소 효과는 흡수가 끝나고 {p4}초 동안 유지됩니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Tristana": { // 트리스타나
        "P": "트리스타나의 공격 사거리와 <spellname>폭발 화약</spellname> 및 <spellname>대구경 탄환</spellname>의 사거리가 {p1}만큼 늘어납니다.", // 정조준 — stringtable
        "Q": "트리스타나가 자동 사격을 시작해 {p1}초 동안 <attackspeed>공격 속도가 {p2}%</attackspeed> 증가합니다.", // 속사
        "W": "트리스타나가 뛰어오른 후 착지하며 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초 동안 {p3}% <status>둔화</status>시킵니다.<br><br>챔피언 처치에 관여하거나 챔피언에게 쌓인 최대 중첩 <spellname>폭발 화약</spellname> 스킬이 터질 경우 이 스킬의 재사용 대기시간이 초기화됩니다.", // 로켓 점프
        "E": "<passive>기본 지속 효과: </passive>트리스타나가 기본 공격으로 적을 처치하면 주변 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다.<br><br><active>사용 시:</active> 트리스타나가 적이나 포탑에 폭탄을 부착해 {p2}초 후 주변 적에게 <physicaldamage>{p3}의 물리 피해</physicaldamage>를 입힙니다. 폭탄이 부착된 대상을 기본 공격이나 스킬로 공격할 때마다 피해량이 {p4}%씩 증가합니다. (이 효과는 최대 4번까지 중첩됩니다.)<br><br>{p5}번 중첩되면 폭탄이 즉시 폭발합니다. (최대 <physicaldamage>{p6}의 물리 피해</physicaldamage>)", // 폭발 화약
        "E_rules": "<rules>사용 시 피해량은 치명타 확률 및 치명타 피해량에 따라 {p7}%만큼 증가합니다.<br>포탑에 사용할 경우 폭발 반경이 두 배로 늘어납니다.</rules>", // 구분선 아래 회색 글씨
        "R": "트리스타나가 거대한 대포를 발사하여 대상에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히며 주변 적과 함께 <status>밀어내고</status> {p2}초 동안 <status>기절</status>시킵니다.", // 대구경 탄환
        "R_rules": "<rules>이 스킬로 <spellname>폭발 화약</spellname> 마지막 중첩이 적용되면 유닛이 <status>뒤로 밀려난</status> 후 폭발합니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Tryndamere": { // 트린다미어
        "P": "트린다미어가 기본 공격 시 <keywordmajor>분노가 5</keywordmajor>만큼, 치명타 명중 시 <keywordmajor>분노가 10</keywordmajor>만큼 그리고 마무리 일격 시 <keywordmajor>분노가 10</keywordmajor>만큼 상승합니다. 전투에서 벗어나 8초가 경과하면 트린다미어가 초당 <keywordmajor>5의 분노</keywordmajor>를 잃습니다.<br><br><keywordmajor>분노</keywordmajor>가 1 상승할 때마다 치명타 확률이 {p1}%씩 증가합니다.", // 격노 — stringtable
        "Q": "<passive>기본 지속 효과:</passive> 트린다미어가 피에 굶주려 잃은 체력에 비례해 최대 <scalead>{p1}의 공격력</scalead>을 얻습니다.<br><br><active>사용 시:</active> 트린다미어가 <keywordmajor>분노</keywordmajor>를 소모하여 <healing>체력을 {p2}+분노당 {p3}만큼 회복(최대: {p4})</healing>합니다.", // 피의 갈망
        "Q_rules": "<rules>남은 체력이 {p5}%일 때 공격력 증가량이 최대가 됩니다.</rules>", // 구분선 아래 회색 글씨
        "W": "트린다미어가 모욕을 퍼부어 {p1}초 동안 챔피언의 공격력을 {p2} 감소시킵니다. 트린다미어에게서 도망치는 적은 {p3}초 동안 {p4}% <status>둔화</status>됩니다.", // 조롱의 외침
        "E": "트린다미어가 검을 들고 회전하며 적을 베어넘겨 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 적중한 적 하나당 <keywordmajor>분노가 {p2}</keywordmajor> 생성되며, 대상이 챔피언일 경우 <keywordmajor>분노가 {p3}</keywordmajor> 생성됩니다.<br><br>트린다미어가 치명타를 입힐 때마다 이 스킬의 재사용 대기시간이 {p4}초 감소하며 챔피언에게 치명타를 입히면 {p5}초 감소합니다.", // 회전 베기
        "R": "트린다미어의 체력이 {p1}초 동안 {p2} 아래로 내려가지 않으며 즉시 <keywordmajor>{p3}의 분노</keywordmajor>를 얻습니다.", // 불사의 분노
        "R_rules": "<rules><status>방해</status>를 받는 동안에도 이 스킬을 사용할 수 있습니다.</rules>", // 구분선 아래 회색 글씨
    },
    "TwistedFate": { // 트위스티드 페이트
        "P": "트위스티드 페이트는 유닛을 하나 처치할 때마다 '행운'의 주사위를 굴려 1에서 6까지의 골드를 추가로 얻습니다.", // 사기 주사위 — stringtable
        "Q": "트위스티드 페이트가 카드 세 장을 던져 각각 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다.", // 와일드 카드
        "Q_rules": "<rules>적은 한 카드로만 피해를 입을 수 있습니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "W": [
            "트위스티드 페이트가 덱을 섞고 <recast>재사용</recast>하면 세 카드 중 하나를 정해 다음 기본 공격을 강화합니다.",
            "<li>푸른색 카드는 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 <scalemana>마나를 {p2}</scalemana> 회복시킵니다.",
            "<li>붉은색 카드는 주변 적에게 <magicdamage>{p3}</magicdamage>의 피해를 입히고 2.5초 동안 {p4}% <status>둔화</status>시킵니다.",
            "<li>황금색 카드는 <magicdamage>{p5}</magicdamage>의 피해를 입히고 {p6}초 동안 <status>기절</status>시킵니다."
        ], // 카드 뽑기
        "E": "<passive>기본 지속 효과:</passive> <attackspeed>공격 속도가 {p1}%</attackspeed> 증가하고 4번째 기본 공격마다 <magicdamage>{p2}의 마법 피해</magicdamage>를 추가로 입힙니다.", // 속임수 덱
        "E_rules": "<rules>대상이 구조물일 경우 {p3}%의 효과로 적용됩니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "R": [
            "트위스티드 페이트가 카드에 집중하여 {p1}초 동안 맵에 있는 모든 적 챔피언에 대한 <keywordstealth>절대 시야</keywordstealth>를 얻고 해당 스킬을 <recast>재사용</recast>할 수 있습니다.",
            "<recast>재사용 시</recast>: 트위스티드 페이트가 최대 {p2}의 거리만큼 순간이동합니다."
        ], // 운명
        "R_rules": "<rules><status>방해</status> 효과가 적용되면 순간이동이 취소됩니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Twitch": { // 트위치
        "P": "트위치의 기본 공격 <onhit>적중 시</onhit> 대상은 중독되어 {p1}초간 초당 <truedamage>{p2}의 고정 피해</truedamage>를 입습니다. 맹독은 {p3}회까지 중첩됩니다. <br><br>초당 최대 피해량: {p4}", // 맹독 — stringtable
        "Q": "트위치가 <keywordstealth>위장</keywordstealth> 상태에 돌입해 {p1}초 동안 <speed>이동 속도가 {p2}%</speed> 증가합니다. 트위치를 볼 수 없는 적 챔피언 근처에서는 이동 속도가 {p3}%까지 증가합니다. <keywordstealth>위장</keywordstealth>이 끝나면 {p4}초 동안 트위치의 <attackspeed>공격 속도가 {p5}%</attackspeed> 증가합니다.<br><br><keywordmajor>독</keywordmajor>에 중독된 적 챔피언이 죽으면 이 스킬의 재사용 대기시간이 초기화됩니다.", // 매복
        "Q_rules": "<rules><keywordstealth>위장</keywordstealth> 상태일 때는 적 챔피언의 감지 범위 안에 들어가지 않는 한 시야에 보이지 않습니다.</rules>", // 구분선 아래 회색 글씨
        "W": "트위치가 독약 병을 던져 맞힌 모든 적에게 <spellname>맹독</spellname>을 중첩시키고 {p1}초 동안 지속되는 독구름을 남깁니다.<br><br>독구름 안의 적은 이동 속도가 {p2}% <status>감소</status>하고 매초 <spellname>맹독</spellname> 중첩이 쌓입니다.", // 독약 병
        "E": "<spellname>맹독</spellname>에 감염된 주위 적 모두에게 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 추가적으로 중첩된 <spellname>맹독</spellname> 하나당 <physicaldamage>{p2}의 물리 피해</physicaldamage>와 <magicdamage>{p3}의 마법 피해</magicdamage>를 입힙니다.<br><br>최대 피해량: <physicaldamage>{p4}의 물리 피해</physicaldamage>와 <magicdamage>{p5}의 마법 피해</magicdamage>", // 오염
        "R": "트위치가 석궁을 꺼내 {p1}초 동안 공격 사거리가 {p2}, <scalead>공격력이 {p3}</scalead> 증가하며 기본 공격은 적을 관통합니다. 이 공격은 통과하는 모든 적에게 적중하지만 한 번 관통할 때마다 피해량이 {p4}%씩 감소됩니다. 피해량은 최소 {p5}%까지 내려갑니다.<br>", // 무차별 난사
        "R_rules": "<rules>이 스킬을 사용해도 <keywordstealth>위장</keywordstealth> 상태가 해제되지 않지만 기본 공격을 하면 해제됩니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Teemo": { // 티모
        "P": "티모가 {p1}초 동안 피해를 입지 않고 가만히 있으면 다시 이동할 때까지 <keywordstealth>투명</keywordstealth> 상태가 됩니다. 수풀 속에서는 이동 중에도 <keywordstealth>투명</keywordstealth> 상태를 유지할 수 있습니다.<br><br><keywordstealth>투명</keywordstealth> 상태에서 벗어나면 {p2}초 동안 티모의 <attackspeed>공격 속도가 {p3}</attackspeed> 상승합니다.", // 유격 전투 — stringtable
        "Q": "티모가 다트를 날려 대상을 {p1}초 동안 <status>실명</status>시키고 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다.", // 실명 다트
        "Q_rules": "<rules>미니언과 정글 몬스터는 {p3}% 더 오래 <status>실명</status>합니다.</rules>", // 구분선 아래 회색 글씨
        "W": "<passive>기본 지속 효과:</passive> 티모가 챔피언 또는 포탑에게 {p1}초 동안 공격을 당하지 않았다면 <speed>이동 속도가 {p2}%</speed> 증가합니다.<br><br><active>사용 시:</active> 티모가 전력으로 질주하여 {p3}초 동안 <speed>이동 속도가 {p4}%</speed> 증가합니다. 이 효과는 공격당해도 사라지지 않습니다.", // 신속한 이동
        "E": "<passive>기본 지속 효과:</passive> 티모의 기본 공격 <onhit>적중 시</onhit> 중독 효과가 적용되어 추가로 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초에 걸쳐 <magicdamage>{p3}의 마법 피해</magicdamage>를 입힙니다.", // 맹독 다트
        "E_rules": "<rules>이 독은 정글 몬스터에게 {p4}%의 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "R": "티모가 밟으면 폭발하는 버섯 함정을 던집니다. 함정은 {p1}초 동안 {p2}% <status>둔화</status>시키고 <magicdamage>{p3}의 마법 피해</magicdamage>를 입히며 적의 모습을 드러냅니다.<br><br>함정은 {p4}분 동안 은신 상태로 유지됩니다. 버섯 위에 또 버섯을 던지면 튕긴 후 자리에 떨어집니다. 이 스킬은 {p5}회까지 충전됩니다. ({p6}초마다 충전)<br>", // 유독성 함정
    },
    "Pyke": { // 파이크
        "P": "파이크는 적 챔피언에게 받는 피해량의 {p1}, 주변에 적이 둘 이상 있을 때는 최대 {p2}만큼을 체력으로 비축합니다. 최대 {p3}까지 비축되며 적에게 <unique>보이지 않는</unique> 상태가 되면 비축한 만큼 체력을 빠르게 회복합니다.<br><br>또한 파이크가 최대 체력을 모두 공격력으로 전환합니다. 전환 비율은 <healing>체력 14</healing>당 <physicaldamage>공격력 1</physicaldamage>입니다.", // 가라앉은 자들의 축복 — stringtable
        "Q": "<tap>짧게 누를 때:</tap> 파이크가 공격해 처음 적중한 적에게 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다. (챔피언 우선) 적중한 적은 {p2}초 동안 {p3}% <status>둔화</status>됩니다.<br><br><hold>길게 누를 때: </hold>파이크가 작살을 던져 처음 적중한 적에게 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입히고 자신 앞으로 <status>끌어당깁니다</status>. 적중한 적은 {p2}초 동안 {p3}% <status>둔화</status>됩니다.<br><br>정신 집중이 성공적으로 끝나지 않거나 스킬이 적 챔피언에게 적중하면 소모한 마나의 {p4}%를 돌려받습니다.", // 뼈 작살
        "W": "파이크가 <keywordstealth>위장</keywordstealth> 상태에 돌입하고 <speed>이동 속도가 {p1}%</speed> 증가합니다. 이동 속도는 {p2}초에 걸쳐 원래대로 돌아옵니다.", // 유령 잠수
        "W_rules": "<rules><speed>이동 속도</speed>는 물리 관통력에 비례합니다.<br><keywordstealth>위장</keywordstealth> 상태일 때는 적 챔피언의 감지 범위 안에 들어가지 않는 한 시야에 보이지 않습니다.</rules>", // 구분선 아래 회색 글씨
        "E": "파이크가 돌진하며, 돌진을 시작했던 지점에 유령이 생성됩니다. 유령은 {p1}초 동안 적 챔피언을 <status>기절</status>시키고 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입힙니다.", // 망자의 물살
        "E_rules": "<rules><status>기절</status> 지속시간은 물리 관통력에 비례합니다.</rules>", // 구분선 아래 회색 글씨
        "R": "파이크가 X 모양의 영역 내에 있는 모든 적 챔피언에게 피해를 주며, 체력이 <scalead>{p1}</scalead> 미만인 적에게 순간이동하여 <danger>처형</danger>합니다. 체력이 기준 이상인 챔피언과 챔피언이 아닌 대상의 경우, 해당 수치(<physicaldamage>{p2}</physicaldamage>)의 {p3}%에 해당하는 물리 피해를 입습니다. <br><br>적 챔피언이 X 구역 안에서 처치되면 {p4}초 안에 이 스킬을 <recast>재사용</recast>할 수 있습니다. 해당 챔피언을 파이크가 처치했다면 마지막으로 처치를 도운 아군에게도 챔피언 처치 골드가 주어집니다. 파이크가 아니라 아군이 처치했어도 파이크에게 챔피언 처치 골드가 주어집니다.<br>", // 깊은 바다의 처형
        "R_rules": "", // 구분선 아래 회색 글씨
    },
    "Pantheon": { // 판테온
        "P": "스킬 사용 또는 기본 공격을 {p1}회 하고 나면 다음 기본 스킬이 강화됩니다.", // 필멸자의 의지 — stringtable
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "Q": [
            "<font color='#FF8C00'>짧게 누를 때:</font> 판테온이 창을 찔러 적중한 적들에게 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다. 혜성의 창 재사용 대기시간이 {p2}% 감소합니다.<br><font color='#FF8C00'>길게 누를 때:</font> 판테온이 창을 던져 처음 적중한 적에게 <physicaldamage>{p3}의 물리 피해</physicaldamage>를 입히고 뒤에 있는 적들에게 {p4}% 감소된 피해를 입힙니다.<br>체력이 {p5}% 아래인 적들에게는 스킬이 강화되어 <physicaldamage>{p6}의 물리 피해</physicaldamage>를 입힙니다.",
            "<font color='#EDDA74'>필멸자의 의지 추가 효과:</font> <physicaldamage>{p7}의 물리 피해</physicaldamage>를 추가로 입힙니다."
        ], // 혜성의 창
        "Q_rules": "<rules>몬스터에게는 {p8}%의 피해를 입힙니다.</rules><br><rules>미니언에게는 {p9}%의 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "W": [
            "판테온이 대상에게 도약한 뒤 {p1}초 동안 대상을 <status>기절</status>시키고 <physicaldamage>최대 체력의 {p2}에 해당하는 물리 피해</physicaldamage>를 입힙니다.",
            "<keywordmajor>필멸자의 의지 추가 효과:</keywordmajor> 판테온의 다음 기본 공격이 {p3}회 타격하여 총 <physicaldamage>{p4}의 물리 피해</physicaldamage>를 입힙니다."
        ], // 방호의 도약
        "W_rules": "<rules>미니언과 몬스터에게는 {p5}~{p6}의 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "E": [
            "판테온이 방패를 들어 지정한 방향의 적들과 전투를 시작합니다. {p1}초 동안 포탑을 제외한 해당 방향의 피해로부터 면역이 되고 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입힙니다. 지속시간이 끝나면 판테온이 방패로 타격하며 <physicaldamage>{p3}의 물리 피해</physicaldamage>를 입힙니다.",
            "<font color='#EDDA74'>필멸자의 의지 추가 효과:</font> 방패로 타격할 때 {p4}초 동안 <scalearmor>방어력이 {p5}</scalearmor>, <scalemr>마법 저항력이 {p5}</scalemr> 상승하고 {p6}초 동안 <speed>이동 속도가 {p7}%</speed> 상승합니다."
        ], // 방패 돌격
        "E_rules": "<rules><recast>재사용</recast> 시 스킬이 더 빨리 종료됩니다. (빨리 종료해도 마지막에 방패로 타격합니다.) <br>미니언에게는 {p8}% 감소된 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "R": "<passive>기본 지속 효과:</passive> 판테온의 방어구 관통력이 {p1}% 증가합니다.<br><br><active>사용 시:</active> 판테온이 힘을 모아 높이 도약했다가 창을 던져 좁은 영역에 <physicaldamage>{p2}의 물리 피해</physicaldamage>를 입히고 {p3}초 동안 {p4}% <status>둔화</status>시킵니다. <br><br>그런 다음 지정한 위치에 유성이 되어 떨어집니다. 일직선상에 있는 적들에게 최대 <magicdamage>{p5}의 마법 피해</magicdamage>를 입힙니다. (피해량은 범위 가장자리로 갈수록 감소하여 가장 바깥쪽은 {p6}% 감소된 피해를 입힙니다.)<br><br>이 스킬을 사용하면 <font color='#EDDA74'>필멸자의 의지</font>가 즉시 활성화됩니다.", // 거대 유성
    },
    "Fiddlesticks": { // 피들스틱
        "P": "피들스틱의 장신구는 <keywordmajor>허수아비</keywordmajor>로 대체됩니다. <keywordmajor>허수아비</keywordmajor>는 적에게 발각되면 잠시 피들스틱을 흉내 냅니다. 피들스틱이 2초 동안 움직이지 않으면 <keywordmajor>허수아비</keywordmajor>를 흉내냅니다. 6레벨이 되면 <keywordmajor>허수아비</keywordmajor>가 6초 동안 근처의 와드를 드러냅니다.", // 무해한 허수아비 — stringtable
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "Q": [
            "<passive>기본 지속 효과:</passive> 전투에서 벗어나 적의 시야에 보이지 않을 때나 <keywordmajor>허수아비</keywordmajor>인 척할 때 적에게 스킬로 피해를 입히면 대상이 {p1}초 동안 <status>공포</status>에 질립니다.",
            "<active>사용 시:</active> {p1}초 동안 적을 <status>공포</status>에 빠트리고 <magicdamage>현재 체력의 {p2}에 해당하는 마법 피해</magicdamage>를 입힙니다. 최근에 피들스틱에 의해 <status>공포</status>에 빠진 대상은 <magicdamage>현재 체력의 {p3}에 해당하는 마법 피해</magicdamage>를 입습니다."
        ], // 공포
        "Q_rules": "<rules>최근에 피들스틱에 의해 <status>공포</status>에 빠진 대상은 <magicdamage>{p4}의 마법 피해</magicdamage> 혹은 <magicdamage>{p5}의 마법 피해</magicdamage>를 입습니다.</rules><br><rules>미니언과 정글 몬스터에게는 최대 <magicdamage>400의 마법 피해</magicdamage>를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "W": "피들스틱이 정신을 집중해 2초에 걸쳐 주변 적들의 영혼을 흡수합니다. 그동안 초당 <magicdamage>{p1}의 마법 피해</magicdamage> 를 입히고, 지속시간이 끝날 때 <magicdamage>대상이 잃은 체력의 {p2}%에 해당하는 마법 피해</magicdamage>를 입힙니다. 피들스틱은 <healing>피해량의 {p3}%에 해당하는 체력</healing>을 회복합니다.<br><br>피들스틱이 방해 없이 끝까지 스킬을 사용하면 남은 재사용 대기시간이 60% 감소합니다.<br>", // 풍작
        "W_rules": "<rules>체력은 감소되기 전 피해량을 기준으로 회복됩니다.<br>몬스터에게는 {p4}%의 피해를 입히고 피해량의 <healing>{p5}%만큼 체력을 회복</healing>합니다.<br>미니언에게는 {p6}%의 피해를 입히고 피해량의 <healing>{p7}%만큼 체력을 회복</healing>합니다.</rules>", // 구분선 아래 회색 글씨
        "E": "피들스틱이 어둠의 마력을 방출해 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초 동안 {p3}% <status>둔화</status>시킵니다. 또한 범위 중심에 있는 적을 지속시간 동안 <status>침묵</status>시킵니다.", // 수확
        "R": "피들스틱이 {p1}초 동안 정신을 집중해 대상 지역으로 순간 이동한 뒤 살인 까마귀 떼를 불러내어 {p2}초 동안 <magicdamage>{p3}의 마법 피해</magicdamage>를 입힙니다.", // 까마귀 폭풍
    },
    "Fiora": { // 피오라
        "P": "피오라가 적 챔피언의 <keywordmajor>급소</keywordmajor>를 찾아냅니다. 기본 공격이나 스킬로 이 <keywordmajor>급소</keywordmajor>를 가격하면 <truedamage>최대 체력에 비례해 {p1}의 고정 피해</truedamage>를 추가로 입히며 피오라의 <speed>이동 속도가 {p2}%</speed> 상승했다가 {p3}초에 걸쳐 원래대로 돌아오고 <healing>체력을 {p4}</healing> 회복합니다.<br><br>15초가 지나거나 피오라가 급소를 가격하면 새로운 <keywordmajor>급소</keywordmajor>가 드러납니다.", // 치명적인 검무 — stringtable
        "Q": "피오라가 한 방향으로 돌진하며 가장 가까운 적이나 와드, 구조물을 공격해 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다. 이 공격은 <keywordmajor>급소</keywordmajor>와 처치 범위 안의 적을 우선 가격합니다.<br><br>피오라가 적을 공격하면 이 스킬의 재사용 대기시간이 {p2}% 감소합니다.", // 찌르기
        "Q_rules": "<rules>이 공격은 적중 시 효과가 적용됩니다.</rules>", // 구분선 아래 회색 글씨
        "W": "피오라가 {p1}초 동안 받는 모든 공격과 이동 불가 효과, 해로운 효과를 막아낸 다음 검을 찌릅니다. 검은 처음 적중한 챔피언에게 <magicdamage>{p2}의 마법 피해</magicdamage>를 입히고, {p3}초 동안 <speed>이동 속도</speed>를 {p4}%, <attackspeed>공격 속도를 {p5}%</attackspeed> <status>둔화</status>시킵니다. 피오라가 <status>이동 불가</status> 효과를 막아낼 경우, 찔린 적은 <status>둔화</status>하는 대신 <status>기절</status>합니다.", // 응수
        "E": "피오라는 다음 두 번의 기본 공격에 대해 <attackspeed>공격 속도가 {p1}%</attackspeed> 상승합니다. 첫 번째 기본 공격은 {p2}초 동안 {p3}% <status>둔화</status>시킵니다. 두 번째 기본 공격은 100% 치명타가 되어 <physicaldamage>{p4}%의 피해</physicaldamage>를 입힙니다.", // 대가의 검술
        "R": "<passive>기본 지속 효과:</passive> <spellname>치명적인 검무</spellname> <speed>이동 속도</speed> 추가 효과가 {p1}%로 상승합니다.<br><br><active>사용 시:</active> 피오라가 챔피언의 <keywordmajor>급소</keywordmajor> 네 군데를 다 드러내 <truedamage>최대 체력의 {p2}에 해당하는 고정 피해</truedamage>를 최대로 입히고 대상 근처에서 <spellname>치명적인 검무</spellname>의 <speed>이동 속도</speed> 상승 효과를 얻습니다.<br><br>피오라가 {p3}초 내에 <keywordmajor>급소</keywordmajor> 네 군데를 모두 가격하거나 한 번이라도 급소를 공격한 뒤 대상이 사망할 경우, 주변 아군 챔피언은 {p4}초 동안 <healing>초당 체력을 {p5}</healing>씩 회복합니다.", // 대결투
    },
    "Fizz": { // 피즈
        "P": "피즈가 유체화 상태가 되고 모든 공격으로부터 받는 피해가 {p1} 감소합니다.", // 영리한 싸움꾼 — stringtable
        "Q": "피즈가 적을 관통하며 돌진해 <physicaldamage>{p1}의 물리 피해</physicaldamage>에 <magicdamage>{p2}의 마법 피해</magicdamage>를 추가로 입힙니다.", // 성게 찌르기
        "Q_rules": "<rules>이 스킬은 적중 시 효과가 적용됩니다.</rules>", // 구분선 아래 회색 글씨
        "W": "<passive>기본 지속 효과</passive>: 피즈가 적에게 기본 공격을 가하면 출혈을 일으켜 {p1}초 동안 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다. <br><br><active>사용 시</active>: 피즈의 다음 기본 공격이 <magicdamage>{p3}의 마법 피해</magicdamage>를 추가로 입힙니다. 이 공격으로 대상을 처치하면 피즈가 <scalemana>{p4}의 마나</scalemana>를 돌려받고 이 스킬의 재사용 대기시간이 {p5}초로 감소합니다. 대상을 처치하지 못하면 피즈의 기본 공격이 {p6}초 동안 <magicdamage>{p7}의 마법 피해</magicdamage>를 추가로 입힙니다.", // 심해석 삼지창
        "W_rules": "<rules>기본 공격이 정글 몬스터에게 {p8}의 추가 피해를 입힙니다.<br>기본 공격이 구조물에 {p9}%의 피해를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "E": [
            "피즈가 삼지창 위에 서고 0.75초 동안 대상으로 지정할 수 없는 상태가 됩니다. 이후 근처 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초 동안 {p3}% <status>둔화</status>시킵니다.",
            "피즈가 대상으로 지정할 수 없는 상태에서 이 스킬을 <recast>재사용</recast>하면 다시 돌진하면서 효과가 일찍 끝나며 보다 작은 지역에 피해를 입히고 <status>둔화</status> 효과를 적용하지 않습니다."
        ], // 장난치기 / 재간둥이
        "R": "피즈가 물고기를 풀어 처음으로 부딪힌 챔피언에게 붙게 합니다. 대상 챔피언은 <keywordstealth>절대 시야</keywordstealth>의 영향을 받으며 물고기가 대상에게 붙기 전 이동한 거리에 비례해 40%~80% <status>둔화</status>됩니다. <br><br>{p1}초 후 상어가 튀어나와 물고기가 붙은 대상을 1초 동안 <status>공중으로 띄워 올리고</status> 다른 대상을 모두 <status>밀어내며</status> 물고기가 대상에게 붙기 전 이동한 거리에 비례해 <magicdamage>{p2}~{p3}의 마법 피해</magicdamage>를 입힙니다.", // 미끼 뿌리기
    },
    "Heimerdinger": { // 하이머딩거
        "P": "하이머딩거가 아군 포탑이나 자신의 <keywordmajor>포탑</keywordmajor> 주변에서 <speed>이동 속도가 {p1}%</speed> 증가합니다.", // 마법공학 전문가 — stringtable
        "Q": "하이머딩거가 근처 적을 공격하는 <keywordmajor>포탑</keywordmajor>을 세웁니다. <keywordmajor>포탑</keywordmajor>은 한 번에 {p1}개까지 세울 수 있으며 천천히 충전됩니다. 최대로 충전되면 더 강력한 공격을 가합니다.<br><br>하이머딩거가 너무 멀리 떨어지면 <keywordmajor>포탑</keywordmajor>은 8초 후 작동을 멈춥니다.<br><br>이 스킬은 {p2}회까지 충전됩니다.", // H-28 G 진화형 포탑
        "Q_rules": "<rules>포탑이 최근 하이머딩거에 의해 피해를 입은 적과 하이머딩거를 공격하는 적을 우선적으로 공격합니다.<br><br>포탑 능력치:<br><healing>체력 {p3}</healing><br>기본 사격마다 <magicdamage>{p4}의 마법 피해</magicdamage><br>충전 사격마다 <magicdamage>{p5}의 마법 피해</magicdamage></rules>", // 구분선 아래 회색 글씨
        "W": "하이머딩거가 {p1}개의 로켓을 발사하여 처음 적중한 적에게 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다. 여러 발을 맞게 되면 받는 피해가 감소합니다.<br><br>(최대 피해량: <magicdamage>{p3}의 마법 피해</magicdamage>)<br><br>챔피언에게 적중하는 로켓 하나당 근처 <keywordmajor>포탑</keywordmajor>이 20% 충전됩니다.", // 마법공학 초소형 로켓
        "W_rules": "<rules>여러 발의 로켓에 적중당한 적은 첫 번째 로켓 이후 <magicdamage>{p4}의 마법 피해</magicdamage>를 입습니다. 미니언은 첫 번째 로켓 이후 <magicdamage>{p5}의 마법 피해</magicdamage>를 입습니다.</rules>", // 구분선 아래 회색 글씨
        "E": "하이머딩거가 수류탄을 던져 일정 지역에 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초 동안 {p3}% <status>둔화</status>시킵니다. 중앙에 있는 적들은 {p4}초 동안 <status>기절</status>합니다.<br><br>적 챔피언을 맞히면 근처의 <keywordmajor>포탑</keywordmajor>이 최대로 충전됩니다.", // CH-2 전자폭풍 수류탄
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "R": [
            "하이머딩거가 다음에 사용하는 궁극기 이외의 스킬을 강화합니다.",
            "<spellname>H-28Q 최첨단 포탑:</spellname> 하이머딩거의 최대 포탑 개수에 포함되지 않는 강화된 <keywordmajor>포탑</keywordmajor>을 8초 동안 배치해 기본 사격마다 <magicdamage>{p1}의 마법 피해</magicdamage>, 충전 사격마다 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다. 포탑 공격은 대상 지역에 피해를 입히며, 2초 동안 25% <status>둔화</status>시킵니다. 포탑은 군중 제어기에 면역이 됩니다.",
            "<spellname>마법공학 로켓 연사:</spellname> 로켓이 4회 연속 발사되며 각각 <magicdamage>{p3}의 마법 피해</magicdamage>를 입힙니다. 챔피언과 정글 몬스터가 추가 로켓으로 받는 피해량이 감소하고 미니언이 추가 로켓으로 받는 피해량은 증가합니다. 최대 피해량: <magicdamage>{p4}의 마법 피해</magicdamage> ",
            "<spellname>CH-3X 전격 수류탄:</spellname> 세 번 튕기며 전류를 방출하는 반동 수류탄을 던져 <magicdamage>{p5}의 마법 피해</magicdamage>를 입힙니다. <status>기절</status>과 <status>둔화</status> 적용 범위가 모두 커집니다.<br><br><recast>재사용 시:</recast> 이 스킬을 취소합니다."
        ], // 업그레이드!!!
        "R_rules": "<rules>강화된 스킬은 소모값이 없습니다.<br>강화된 로켓은 미니언에게 2,000%의 피해를 입힙니다.<br><br>최첨단 포탑 능력치:<br><healing>체력 {p6}</healing><br><scalearmor>방어력 {p7}</scalearmor><br><scalemr>마법 저항력 {p7}</scalemr><br>기본 사격마다 <magicdamage>{p1}의 마법 피해</magicdamage><br>충전 사격마다 <magicdamage>{p2}의 마법 피해</magicdamage></rules>", // 구분선 아래 회색 글씨
    },
    "Hecarim": { // 헤카림
        "P": "헤카림이 <scalead>{p1}의 공격력</scalead>을 얻습니다. 공격력은 레벨에 따라 증가합니다.", // 출정 — stringtable
        "Q": "헤카림이 주위 적들을 베어 <physicaldamage>{p1}의 물리 피해</physicaldamage>를 입힙니다. 이 스킬이 적중하면 효과가 중첩되어 {p2}초 동안 피해량이 {p3}% 늘어나고 이 스킬의 재사용 대기시간이 {p4}초 감소합니다. 최대 {p5}회 중첩됩니다.<br>", // 회오리 베기
        "Q_rules": "<rules>미니언에게는 기본 <physicaldamage>{p6}의 피해</physicaldamage>를 입힙니다.</rules>", // 구분선 아래 회색 글씨
        "W": "헤카림이 {p1}초에 걸쳐 주변 적에게 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다. <br><br>헤카림이 <passive>{p3}</passive>만큼 <scalearmor>방어력</scalearmor>과 <scalemr>마법 저항력</scalemr>을 얻고, 주변 적들이 헤카림에게 받은 <healing>피해량의 {p4}%</healing>와 헤카림의 아군에게 받은 <healing>피해량의 {p5}%</healing>만큼 체력을 회복합니다.", // 공포의 망령
        "W_rules": "<rules>미니언이나 정글 몬스터를 공격한 경우, 헤카림은 <healing>체력을 {p6}</healing> 넘게 회복할 수 없습니다.</rules>", // 구분선 아래 회색 글씨
        "E": "헤카림이 유체화 상태가 되어 <speed>이동 속도가 {p1}%</speed> 증가합니다. 이동 속도는 {p2}초에 걸쳐 <speed>{p3}%</speed>까지 증가합니다. 다음 기본 공격은 <status>뒤로 밀어내며</status> <physicaldamage>{p4}</physicaldamage>~<physicaldamage>{p5}의 물리 피해</physicaldamage>를 입힙니다. <status>뒤로 밀려나는</status> 거리와 피해량은 이 스킬을 사용하는 중 이동한 거리에 비례합니다.", // 파멸의 돌격
        "E_rules": "<rules>유체화 상태인 유닛은 다른 유닛과 충돌하지 않습니다.<br>이 스킬의 남은 지속시간은 그림자의 맹습 사용 시 멈춥니다.<br>이 스킬은 피해를 입힐 때 효과가 발동합니다.</rules>", // 구분선 아래 회색 글씨
        "R": "헤카림이 유령 기수들을 소환하며 전방으로 돌격하여 <magicdamage>{p1}의 마법 피해</magicdamage>를 입힙니다. 돌격이 끝나면 충격파를 발산하여 돌격한 거리에 비례해 최소 {p2}초에서 최대 {p3}초 동안 <status>공포</status>에 질리게 합니다.", // 그림자의 맹습
        "R_rules": "<rules>헤카림은 지정한 위치까지 이동하지만, 기수들은 항상 사거리 끝까지 이동합니다.</rules>", // 구분선 아래 회색 글씨
    },
    "Hwei": { // 흐웨이
        "P": "흐웨이가 적 챔피언에게 스킬로 피해를 입히면 {p1}초 동안 표식을 남깁니다.<br><br>표식이 남겨진 적에게 또 다른 스킬로 피해를 입히면 대상의 발밑에 폭발이 일어나 사거리 내 모든 적에게 <magicdamage>{p2}의 마법 피해</magicdamage>를 입힙니다.", // 몽상가의 서명 — stringtable
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "Q": [
            "흐웨이가 참사의 환상을 그려내 적에게 막대한 피해를 입힙니다.",
            "<spellname>파멸의 화염</spellname><br>흐웨이가 빠르게 날아가는 불덩이를 날립니다. 불덩이는 처음 적과 적중하면 폭발해 <magicdamage>{p1}+최대 체력의 {p2}%에 해당하는 마법 피해</magicdamage>를 입힙니다.",
            "<spellname>절단의 번개</spellname><br>흐웨이가 멀리 떨어진 대상 지점을 지정하고 잠시 후 벼락을 떨어뜨려 <magicdamage>{p3}의 마법 피해</magicdamage>를 입힙니다. 대상이 고립 또는 <status>이동 불가</status> 상태일 경우 대상이 잃은 체력에 비례해 최대 <magicdamage>{p4}의 마법 피해</magicdamage>를 입힙니다.",
            "<spellname>녹아내린 균열</spellname><br>흐웨이가 뻗어나가는 용암 폭발을 일으킵니다. 일정 지역 내 적에게 <magicdamage>{p5}의 마법 피해</magicdamage>를 입히고, 용암 웅덩이를 남겨 {p6}초 동안 적에게 <magicdamage>매초 {p7}의 마법 피해</magicdamage>를 입히고 {p8}% <status>둔화</status>시킵니다."
        ], // 주제: 참사
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "W": [
            "흐웨이가 평온의 환상을 그려내 자신과 아군 챔피언에게 이로운 효과를 부여합니다.",
            "<spellname>쏜살같은 물살</spellname><br>흐웨이가 일직선으로 빠르게 흐르는 물을 흘려보내 아군의 <speed>이동 속도를 {p1}</speed> 상승시킵니다.",
            "<spellname>반사의 웅덩이</spellname><br>흐웨이가 보호의 웅덩이를 형성해 영역 안의 아군 챔피언에게 일정 시간에 걸쳐 <shield>{p2}의 피해를 흡수하는 보호막</shield>을 씌웁니다. 단, 아군에게는 보호막 효과가 {p3}% 감소합니다.",
            "<spellname>요동치는 빛</spellname><br>흐웨이가 소용돌이치는 빛 3개를 만들어 냅니다. 빛은 다음 3회의 스킬 또는 기본 공격 시 <magicdamage>{p4}의 추가 마법 피해</magicdamage>를 입히며, 각각 <scalemana>{p5}의 마나</scalemana>를 회복합니다."
        ], // 주제: 평온
        // ★ 배열 = 하위 스킬을 파트로 쪼개 눈 것. app.js 가 아이콘 + 구분선으로 나눠 그린다.
        //   0번은 스킬 본체(기본 아이콘), 1번부터 values.icons[i-1] 과 짝이 된다.
        "E": [
            "흐웨이가 적을 통제하는 고통의 환상을 그려냅니다.",
            "<spellname>암울한 형상</spellname><br>흐웨이가 무시무시한 얼굴을 날려 처음 적중한 적에게 <magicdamage>{p1}의 마법 피해</magicdamage>를 입히고 {p2}초 동안 <status>도망</status>치게 합니다.",
            "<spellname>심연의 응시</spellname><br>흐웨이가 지정한 위치에 남아 시야를 확보하는 눈을 만들어 냅니다. 눈은 사거리 내로 처음 들어오는 적 챔피언에게 유도 발사체를 날려 처음 적중한 대상을 {p3}초 동안 <status>속박</status>하고 <magicdamage>{p4}의 마법 피해</magicdamage>를 입힙니다.",
            "<spellname>파괴의 아귀</spellname><br>흐웨이가 지정한 위치에 파괴의 아귀를 그려내 적을 중앙으로 <status>끌어당깁니다</status>. 파괴의 아귀는 적중한 적에게 <magicdamage>{p5}의 마법 피해</magicdamage>를 입히고 {p6}% <status>둔화</status>시킵니다. 둔화 효과는 1.25초에 걸쳐 사라집니다."
        ], // 주제: 고통
        "R": "흐웨이가 순수한 절망의 환상을 날립니다. 환상은 적중당한 적 챔피언에게 {p1}초 동안 남습니다. 환상은 점점 커지면서 0.25초마다 적에게 {p2}%의 <status>둔화</status> 중첩을 적용하고 <magicdamage>매초 {p3}의 마법 피해</magicdamage>를 입힙니다.<br><br>지속시간이 끝나면 환상이 깨지며 <magicdamage>{p4}의 마법 피해</magicdamage>를 입힙니다.", // 절망의 소용돌이
        "R_rules": "<rules>최대 <magicdamage>{p5}의 마법 피해</magicdamage>를 입힙니다.</rules>", // 구분선 아래 회색 글씨
    },
};
