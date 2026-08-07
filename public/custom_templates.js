// 이 파일은 build_champion_data.js 가 생성했습니다.
// 생성 시각: 2026-08-07T04:18:12.628Z
// 문장은 CommunityDragon 에서 가져왔고, {v1} {v2} 자리는 직접 채워야 합니다.
// Garen, Galio 는 기존 내용을 그대로 유지했습니다.

const customTemplates = {
    "Garen": { // 가렌

        "P": "가렌이 8초 동안 피해를 입지 않거나 적의 스킬에 맞지 않으면 5초마다 최대 체력의 일정 비율만큼 회복합니다.<br><br>미니언과 에픽 정글 몬스터를 제외한 몬스터는 체력 재생에 영향을 주지 않습니다.",

        "Q": "가렌에게 적용된 모든 둔화 효과가 제거되고 일정 시간 동안 이동 속도가 35% 상승합니다.<br>다음 기본 공격은 1.5초 동안 침묵시키고 물리 피해를 입힙니다.<br><br><span style='color: #777777;'>강화된 기본 공격은 4.5초 후 종료됩니다.<br>이 스킬은 피해를 입힐 때 효과가 발동합니다.</span>",

        "W": "기본 지속 효과: 유닛을 처치하면 영구적으로 0.2의 방어력 및 마법 저항력이 부여되어 최대 30까지 증가합니다.<br><br>사용 시: 가렌이 4초 동안 용기백배하여 받는 피해가 감소합니다. 또한 0.75초 동안 일정 피해를 흡수하는 보호막과 60%의 강인함을 얻습니다.",

        "E": "가렌이 3초 동안 검을 들고 빠르게 회전하여 물리 피해를 여러 차례 입힙니다.<br>가장 가까운 적을 대상으로는 25%의 추가 피해를 입힙니다.<br>공격에 6번 맞은 챔피언은 6초 동안 방어력이 25% 감소합니다.<br><br><span style='color: #777777;'>아이템 및 레벨 상승으로 얻은 공격 속도 25%당 공격 횟수가 1회 증가합니다.<br>치명타가 적용될 수 있고 치명타 적용 시 130%<sup class='custom-footnote'>[2]<span class='footnote-text'>무한의대검 구비 시 139%</span></sup>의 피해를 입힙니다.</span>",

        "R": "가렌이 적을 처단할 데마시아의 힘을 소환하여 고정 피해를 입힙니다."
    }, // 가렌 (직접 작성)
    "Jade_Garen": { // 가렌
        "P": "가렌이 잠시 적의 기본 공격 및 스킬 공격에 맞지 않으면 1초마다 총 체력의 일정 비율씩 회복됩니다.", // 인내심 — CD 요약본, 직접 다듬을 것
        "Q": "가렌이 자신에게 적용 중인 모든 둔화 효과를 해제하고 {v1}초 동안 <speed>{v2}%의 이동 속도</speed>를 얻습니다.<br><br>다음 기본 공격 시 대상에게 <physicaldamage>{v3}의 물리 피해</physicaldamage>를 입히고 {v4}초 동안 <status>침묵</status>시킵니다.", // 결정타
        "W": "<passive>기본 지속 효과:</passive> 가렌의 추가 <scalearmor>방어력</scalearmor>과 <scalemr>마법 저항력</scalemr>이 20% 증가합니다.<br><br><active>사용 시: </active>가렌이 {v1}초 동안 보호막을 얻어, 받는 피해가 {v2}% 감소하고 30%의 군중 제어 효과 감소를 얻습니다.", // 용기
        "E": "가렌이 {v1}초 동안 검을 들고 빠르게 회전하여 주변 적에게 매초 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입힙니다. 회전 중에는 유닛을 통과해 움직일 수 있지만, 유닛을 직접 통과할 때는 이동 속도가 20% 감소합니다.", // 심판
        "R": "가렌이 적 챔피언을 처단할 데마시아의 힘을 소환해 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고, 적이 잃은 체력 {v2}당 1의 피해를 추가로 입힙니다.", // 데마시아의 정의
    },
    "Galio": { // 갈리오

        "P": "갈리오가 기본 공격 시 공격 속도가 증가하고 주변 적들에게 마법 피해를 입힙니다.<br><br>갈리오의 스킬이 적 챔피언 또는 에픽 몬스터에게 적중하면 이 효과의 재사용 대기시간이 3초 감소합니다. 재사용 대기시간은 스킬 사용 한 번당 한 번만 감소합니다.",

        "Q": "갈리오가 두 개의 돌풍을 발사해 각각 마법 피해를 입힙니다.<br><br>두 돌풍이 합쳐지면 소용돌이가 일어나 2초 동안 적 최대 체력에 비례하는 마법 피해를 입힙니다.<br><br>정글 몬스터가 대상일 때 최대 200의 피해를 체력 비례 피해로 입힙니다.",

        "W": "",

        "E": "",

        "R": ""
    }, // 갈리오 (직접 작성)
    "Gangplank": { // 갱플랭크
        "P": "몇 초에 한 번씩 갱플랭크의 근접 공격이 적에게 불을 붙입니다.", // 불의 심판 — CD 요약본, 직접 다듬을 것
        "Q": "{{Spell_GangplankQWrapper_Tooltip_{v1}}}", // 혀어어어업상
        "W": "갱플랭크가 귤을 많이 먹어서 모든 <status>방해</status> 효과를 제거하고 체력을 <healing>{v1}+잃은 체력의 {v2}%</healing>만큼 회복합니다.", // 괴혈병 치료
        "E": "{v1}초 동안 갱플랭크와 적 챔피언이 공격할 수 있는 화약통을 설치합니다. 적이 파괴하는 통은 사라집니다. 갱플랭크가 파괴하는 통은 폭발하여 {v2}초 동안 적을 {v3}% <status>둔화</status>시키고 방어력의 {v4}%를 무시하며 <physicaldamage>기본 공격의 피해량</physicaldamage>만큼 피해를 입힙니다. 챔피언은 <physicaldamage>{v5}의 물리 피해</physicaldamage>를 추가로 입습니다.<br><br>통의 체력은 {v6}초마다 줄어듭니다. 통이 폭발하면 폭발 지대에 겹쳐 있는 통들이 연쇄 폭발하지만 같은 대상이 여러 번 피해를 입지는 않습니다. <spellname>혀어어어업상</spellname> 스킬로 통을 터뜨리면 대상 처치 시 추가 골드를 얻습니다.", // 화약통
        "R": "갱플랭크가 배에 신호를 보내 맵 어느 위치로든 {v1}초 동안 {v2}차례 포탄을 발사하도록 합니다. 대포 세례마다 {v3}초 동안 {v4}%의 <status>둔화</status>를 적용하며 <magicdamage>{v5}의 마법 피해</magicdamage>를 입힙니다. 최대 피해량: {v6}<br><br>이 스킬은 <spellname>혀어어어업상</spellname> 스킬을 통해 상점에서 업그레이드할 수 있습니다.<br><br><spellname>가차없는 포격</spellname>: 6차례 추가로 포탄을 발사합니다.<br><spellname>죽음의 여신</spellname>: 대형 포탄을 발사해 <truedamage>{v7}의 고정 피해</truedamage>를 입히고 {v8}초 동안 {v9}% <status>둔화</status>를 적용합니다.<br><spellname>사기진작</spellname>: 포탄 세례 범위 안에 있는 아군의 이동 속도가 {v10}초 동안 <speed>{v11}%</speed> 증가합니다.", // 포탄 세례
    },
    "Jade_Gangplank": { // 갱플랭크
        "P": "갱플랭크의 기본 공격은 적을 중독시켜 매초 마법 피해를 입힙니다. 피해량은 레벨에 따라 증가합니다.", // 럼주에 젖은 검 — CD 요약본, 직접 다듬을 것
        "Q": "갱플랭크가 대상 유닛에게 총을 발사하여 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다. <spellname>혀어어어업상</spellname>으로 최후의 일격을 가한 경우 갱플랭크가 추가로 {v2}골드를 획득하고 마나 소모량의 절반을 돌려받습니다.<br><br><spellname>혀어어어업상</spellname>은 근접 기본 공격처럼 치명타 및 적중 시 효과가 적용될 수 있습니다.<br><br><gold>약탈한 골드: 총 {v3}골드</gold>", // 혀어어어업상
        "W": "귤을 많이 먹어서 자신에게 걸린 군중 제어 효과를 정화하고 <healing>체력</healing>을 {v1}만큼 회복합니다.", // 괴혈병 치료
        "E": "<passive>기본 지속 효과: </passive>갱플랭크가 <physicaldamage>{v1}의 공격력</physicaldamage>과 <speed>{v2}%의 이동 속도</speed>를 얻습니다.<br><br><active>사용 시:</active> 갱플랭크가 공중에 권총을 발사하여, 기본 지속 효과를 해제하고 대신 {v3}초 동안 <physicaldamage>{v4}의 공격력</physicaldamage>과 <speed>{v5}%의 이동 속도</speed>를 얻습니다. 또한 주변 아군 챔피언에게 {v3}초간 <physicaldamage>{v6}의 공격력</physicaldamage>과 <speed>{v7}%의 이동 속도</speed>를 부여합니다. (자신 이로운 효과의 절반)", // 사기진작
        "R": "갱플랭크의 함선에 신호를 보내 {v1}초 동안 지정한 지역에 포격을 가합니다. 해당 지역 내 적은 지속시간 동안 이동 속도가 {v2}% <status>둔화</status>됩니다. 해당 지역에 포탄이 쏟아져 각각 <magicdamage>{v3}의 마법 피해</magicdamage>를 입힙니다.", // 포탄 세례
    },
    "Gragas": { // 그라가스
        "P": "그라가스가 스킬을 사용하면 주기적으로 체력을 회복합니다.", // 서비스 시간 — CD 요약본, 직접 다듬을 것
        "Q": "그라가스가 술통을 굴립니다. 술통은 {v1}초 후 폭발해 <magicdamage>{v2}</magicdamage>~<magicdamage>{v3}의 마법 피해</magicdamage>를 입히고 {v4}초 동안 {v5}~{v6}% <status>둔화</status>시킵니다. 피해량과 <status>둔화</status> 효과는 폭발 전 술통이 유지됐던 시간에 비례해 증가합니다. <br><br><recast>재사용</recast>하여 술통을 더 빨리 폭발시킬 수 있습니다.", // 술통 굴리기
        "W": "그라가스가 술을 맛보고 {v1}초 동안 받는 피해량이 {v2} 감소합니다. 또한 다음 기본 공격이 강화되어 대상과 주변 적에게 <magicdamage>{v3}</magicdamage>+<magicdamage>최대 체력의 {v4}%에 해당하는 마법 피해</magicdamage>를 추가로 입힙니다.", // 취중 분노
        "E": "그라가스가 앞으로 돌진하여 첫 번째 적에게 부딪히면 {v1}초 동안 주변 적을 <status>공중으로 띄워 올리고</status> <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.<br><br>그라가스가 적과 충돌하면 이 스킬의 재사용 대기시간이 {v3}% 단축됩니다.", // 몸통 박치기
        "R": "그라가스가 술통을 던져 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 적들을 폭발 지점으로부터 <status>밀어</status>냅니다.", // 술통 폭발
    },
    "Jade_Gragas": { // 그라가스
        "P": "그라가스가 스킬을 사용할 때마다 술을 마시고 체력을 일부 회복합니다.", // 서비스 시간 — CD 요약본, 직접 다듬을 것
        "Q": "그라가스가 {v1}초 후 폭발하는 술통을 굴려, <magicdamage>{v2}의 마법 피해</magicdamage>를 입히고 {v3}초 동안 {v4}%의 <status>공격 속도 둔화</status>를 적용합니다.<br><br><recast>재사용 시</recast>: 술통을 일찍 터뜨립니다.", // 술통 굴리기
        "W": "그라가스가 술통에 든 술을 마셔 <scalemana>{v1}의 마나</scalemana>를 회복합니다. 이후 {v2}초 동안 <physicaldamage>{v3}의 공격력</physicaldamage>을 얻고 받는 피해가 {v4}% 감소합니다.", // 취중 분노
        "E": "그라가스가 앞으로 돌진하여 가장 먼저 부딪치는 적과 주변의 모든 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 나눠 입히고, {v2}초 동안 {v3}% <status>둔화</status>시킵니다.", // 몸통 박치기
        "R": "그라가스가 술통을 던져, 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 폭발 지점으로부터 <status>밀어냅니다</status>.", // 술통 폭발
    },
    "Graves": { // 그레이브즈
        "P": "그레이브즈의 산탄총에는 몇 가지 특징이 있습니다. 총탄이 떨어지면 총을 새로 장전해야 합니다. 공격 시 4개의 탄환이 발사되며 유닛을 관통해서 공격할 수 없습니다. 챔피언이 아닌 유닛이 탄환을 여러 개 맞으면 뒤로 밀려납니다.", // 새로운 운명 — CD 요약본, 직접 다듬을 것
        "Q": "그레이브즈가 화약을 흩뿌리는 탄환을 발사하여 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다. 탄환은 1초 뒤 또는 지형에 충돌 시 폭발하여 탄환의 경로나 근처에 있는 적들에게 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입힙니다.", // 화약 역류
        "W": "그레이브즈가 4초간 지속되는 검은 연막을 만들어냅니다. 연막 안에 있는 적은 {v1}% <status>둔화</status>되며 시야가 차단됩니다. 연막탄은 처음 적중 시 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.", // 연막탄
        "E": "그레이브즈가 돌진하여 산탄총에 <keywordmajor>탄환</keywordmajor> 하나를 장전합니다. 또한 {v1}초 동안 중첩을 1 획득합니다. (최대 {v2}중첩) 적 챔피언을 향해 돌진하면 중첩을 2 획득합니다. 1중첩당 <scalearmor>방어력이 {v3}</scalearmor>, <scalemr>마법 저항력이 {v4}</scalemr> 증가합니다. 미니언이 아닌 대상을 공격하면 중첩이 초기화됩니다.<br><br>그레이브즈의 기본 공격으로 적중한 탄환 하나당 이 스킬의 재사용 대기시간이 {v5}초 감소합니다.", // 빨리 뽑기
        "R": "그레이브즈가 폭발성 탄환을 발사하여 뒤로 밀려납니다. 탄환은 첫 번째로 맞은 적에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다. 탄환은 적 챔피언을 맞히거나 사거리 끝까지 날아간 다음 폭발하여 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입힙니다.", // 무고한 희생자
    },
    "Gwen": { // 그웬
        "P": "그웬의 기본 공격이 대상의 체력에 비례해 추가 마법 피해를 입힙니다. 챔피언을 상대로 기본 공격 시 해당 피해의 일부만큼 체력을 회복합니다. ", // 가위 난도질 — CD 요약본, 직접 다듬을 것
        "Q": "<passive>기본 지속 효과</passive>: 그웬이 적에게 기본 공격을 적중시키면 가위질이 1회 중첩됩니다. (최대 4회, {v1}초 동안 지속)<br><br><active>사용 시</active>: 중첩된 가위질 횟수를 소모합니다. 그웬이 한 번 가위질하여 <magicdamage>{v2}의 마법 피해</magicdamage>를 입히고, 중첩된 가위질 횟수만큼 다시 가위질한 후 마지막 가위질로 <magicdamage>{v3}의 마법 피해</magicdamage>를 입힙니다. <br><br>가위질할 때마다 중앙에 있는 적에게는 입히는 피해의 {v4}%를 <truedamage>고정 피해</truedamage>로 전환하고 적중 시 <spellname>가위 난도질</spellname>을 적용합니다.<br><rules><br>미니언에게는 {v5}%의 피해를 입힙니다.<br>체력이 {v6}% 미만인 미니언은 감소한 피해 대신 {v7}%의 추가 피해를 입습니다.</rules>", // 싹둑싹둑!
        "W": "그웬이 신성한 안개를 소환하여 안개 밖에 있는 모든 적(포탑 제외)으로부터 대상으로 지정될 수 없는 상태가 됩니다. 이 효과는 {v1}초 동안 또는 그웬이 안개를 떠날 때까지 지속됩니다. 안개 속에서는 그웬의 <scalearmor>방어력</scalearmor>과 <scalemr>마법 저항력</scalemr>이 {v2} 증가합니다.<br><br>이 스킬을 한 번 <recast>재사용</recast>하면 안개를 불러올 수 있습니다. 그웬이 처음으로 안개를 떠나려고 하면 스킬이 자동으로 <recast>재사용</recast>됩니다.", // 신성한 안개
        "E": "그웬이 돌진하며 {v1}초 동안 기본 공격을 강화합니다.<br><br>강화된 기본 공격은 <attackspeed>공격 속도가 {v2}</attackspeed>, <onhit>적중 시</onhit> <magicdamage>마법 피해가 {v3}</magicdamage>, 사거리가 {v4} 증가합니다. 적에게 처음 적중 시 이 스킬의 재사용 대기시간을 {v5}%만큼 돌려받습니다.", // 돌격가위
        "R": "<active>첫 번째 사용:</active> 바늘을 던져 적중한 모든 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고, {v2}초 동안 {v3}% <status>둔화</status>시키며, <spellname>가위 난도질</spellname>을 적용합니다. 이 스킬은 6초 안에 최대 2회까지 추가로 <recast>재사용</recast>할 수 있습니다. (추가 재사용 대기시간 {v4}초)<br><br><recast>두 번째 사용:</recast> 바늘을 세 개 발사하여 <magicdamage>{v5}의 마법 피해</magicdamage>를 입힙니다.<br><recast>세 번째 사용:</recast> 바늘을 다섯 개 발사하여 <magicdamage>{v6}의 마법 피해</magicdamage>를 입힙니다.", // 바느질
    },
    "Gnar": { // 나르
        "P": "나르는 전투 중 분노가 생성됩니다. 분노가 최고치에 도달하면 다음번 스킬을 사용할 때 메가 나르로 변신하여 생존력이 커지고 스킬이 바뀝니다.", // 분노 유전자 — CD 요약본, 직접 다듬을 것
        "Q": "<keywordmajor>미니 나르:</keywordmajor> 나르가 부메랑을 던져 <physicaldamage>@spell.GnarQ:MiniTotalDamage@의 물리 피해</physicaldamage>를 입히고 @spell.GnarQ:SlowDuration@초 동안 @spell.GnarQ:SlowAmount*100@% <status>둔화</status>시킵니다. 부메랑은 적 하나를 맞힌 다음 돌아오며, 이후 맞히는 적들은 받는 피해량이 감소합니다. 적 하나당 부메랑에 한 번만 맞습니다. 부메랑을 받으면 재사용 대기시간이 @spell.GnarQ:MiniCDRefund*100@% 감소합니다.", // 부메랑 던지기 / 돌덩이 던지기
        "W": "<keywordmajor>미니 나르 기본 지속 효과:</keywordmajor> 같은 적에게 세 번째 기본 공격이나 스킬을 가할 때마다 <magicdamage>@spell.GnarW:MiniTotalDamage@+최대 체력의 @spell.GnarW:MiniPercentHPDamage*100@%에 해당하는 마법 피해</magicdamage>를 추가로 입히며 <speed>이동 속도가 @spell.GnarR:RHyperMovementSpeedPercent@%</speed> 증가한 뒤 @spell.GnarW:MiniHasteDuration@초에 걸쳐 원래대로 돌아옵니다.", // 슝슝 / 쿵쾅
        "E": "<keywordmajor>미니 나르:</keywordmajor> 나르가 폴짝 뛰어 @spell.GnarE:MiniASDuration@초 동안 <attackspeed>공격 속도가 @spell.GnarE:MinibAS*100@%</attackspeed> 상승합니다. 유닛 위에 착지하면 튕겨서 더 멀리 날아갑니다. 적에게 착지하여 튕기면 <physicaldamage>@spell.GnarE:MiniTotalDamage@의 물리 피해</physicaldamage>를 입히며 잠시 @spell.GnarE:MoveSpeedMod*-100@% <status>둔화</status>시킵니다.", // 폴짝 / 우지끈
        "R": "<keywordmajor>미니 나르 기본 지속 효과:</keywordmajor> <spellname>슝슝</spellname>의 <speed>이동 속도</speed>가 증가합니다.<br><br><keywordmajor>메가 나르:</keywordmajor> 근처 적을 던져 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 <status>뒤로 밀어내며</status> {v2}초 동안 {v3}% <status>둔화</status>시킵니다. 벽에 부딪히는 적은 <physicaldamage>{v4}의 물리 피해</physicaldamage>를 입고 <status>기절</status>합니다.", // 나르!
    },
    "Nami": { // 나미
        "P": "나미의 스킬에 맞은 아군 챔피언은 짧은 시간 동안 이동 속도가 상승합니다.", // 밀려오는 파도 — CD 요약본, 직접 다듬을 것
        "Q": "나미가 물방울을 던져 {v1}초 동안 <status>기절</status>시키고 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.", // 물의 감옥
        "W": "나미가 밀려드는 파도를 보내 아군 및 적 챔피언을 번갈아 맞힙니다. 파도는 각 챔피언을 한 번만 맞힐 수 있으며 최대 {v1}명의 대상에게 튕깁니다.<li>아군의 <healing>체력을 {v2}</healing>만큼 회복시키고 근처 적 챔피언에게 튕깁니다. <li>적에게 <magicdamage>{v3}의 마법 피해</magicdamage>를 입히고 근처 아군 챔피언에게 튕깁니다.<br>피해량과 회복량은 한 번 튕길 때마다 {v4}씩 조정됩니다.", // 밀물 썰물
        "E": "나미가 {v1}초 동안 아군 챔피언의 다음 기본 공격과 스킬 {v2}회를 강화합니다. 강화된 기본 공격과 스킬은 대상을 {v3}초 동안 {v4}만큼 <status>둔화</status>시키고 <magicdamage>{v5}의 마법 피해</magicdamage>를 추가로 입힙니다.", // 파도 소환사의 축복
        "R": "나미가 해일을 소환하여 0.5초 동안 <status>공중으로 띄워 올리고</status> {v1}% <status>둔화</status>시키며 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다. <status>둔화</status> 지속시간은 해일이 이동한 거리에 비례하며 최대 {v3}초입니다.<br><br>파도에 맞은 아군은 <spellname>밀려오는 파도</spellname>의 효과를 두 배로 받습니다.", // 해일
    },
    "Nasus": { // 나서스
        "P": "나서스는 적의 영혼을 흡수하여 추가 생명력 흡수 효과를 얻습니다.", // 영혼의 포식자 — CD 요약본, 직접 다듬을 것
        "Q": "나서스의 다음 기본 공격이 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다. 이 스킬로 적을 처치하면 영구적으로 피해량이 {v2}만큼 증가하고 챔피언, 대형 미니언, 대형 정글 몬스터를 대상으로는 {v3}만큼 증가합니다.", // 흡수의 일격
        "W": "나서스가 챔피언의 노화를 촉진시켜 {v1}% <status>둔화</status>시킵니다. 둔화 효과는 {v2}초 동안 최대 {v3}%까지 증가합니다. 대상의 공격 속도는 <status>둔화</status> 효과의 {v4}%만큼 감소합니다.", // 쇠약
        "E": "나서스가 영혼의 불길로 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 해당 지역 내 적은 <scalearmor>방어력이 {v2}%</scalearmor>만큼 감소하고 {v3}초 동안 <magicdamage>{v4}의 마법 피해</magicdamage>를 입습니다.", // 영혼의 불길
        "R": "나서스가 15초 동안 모래 폭풍 속에서 힘을 얻어 <healing>최대 체력이 {v1}</healing> 증가하고 <scalearmor>방어력</scalearmor>과 <scalemr>마법 저항력</scalemr>이 {v2} 상승합니다.<br><br>폭풍이 부는 동안 나서스는 매초 <magicdamage>주변 적이 보유한 최대 체력의 {v3}에 해당하는 마법 피해</magicdamage>를 입히며 <spellname>흡수의 일격</spellname> 재사용 대기시간이 {v4}% 감소합니다.", // 사막의 분노
    },
    "Jade_Nasus": { // 나서스
        "P": "나서스는 적의 영혼을 흡수하여 추가 생명력 흡수 효과를 얻습니다.", // 영혼의 포식자 — CD 요약본, 직접 다듬을 것
        "Q": "나서스의 다음 기본 공격이 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다. 이 스킬로 적을 처치하면 영구적으로 피해량이 {v2}만큼 증가하고 챔피언, 대형 미니언, 대형 몬스터를 대상으로는 {v3}만큼 증가합니다.", // 흡수의 일격
        "W": "<maintext>나서스가 {v1}초 동안 대상 챔피언의 노화를 촉진시킵니다. 이동 속도가 {v2}%, 공격 속도가 {v3}% <status>둔화</status>되고 지속시간 동안 둔화율이 각각 {v4}%, {v5}%까지 증가합니다.", // 쇠약
        "E": "<maintext>나서스가 대상 지역을 영혼의 불길로 태워 지역 내 적에게 즉시 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.<br><br>다음 {v2}초 동안, 지역 내 적의 <status>방어력이 {v3} 감소</status>하고 추가로 <magicdamage>{v4}의 마법 피해</magicdamage>를 매초 입힙니다.", // 영혼의 불길
        "R": "<maintext>나서스가 15초 동안 모래 폭풍 속에서 힘을 얻어 <scalehealth>최대 체력이 {v1}</scalehealth>, 공격 사거리가 {v2}, 스킬 사거리가 100 증가합니다.<br><br>폭풍이 부는 동안 나서스는 주변에 <magicdamage>적 최대 체력의 {v3}에 해당하는 마법 피해</magicdamage>를 입히고(초당 최대 {v4}의 피해), 입힌 피해의 5%를 <physicaldamage>추가 공격력</physicaldamage>으로 전환합니다.", // 사막의 분노
    },
    "Naafiri": { // 나피리
        "P": "나피리가 자신이 공격하거나 스킬을 사용하는 대상을 함께 공격하는 무리를 소환합니다.", // 늘어나는 무리 — CD 요약본, 직접 다듬을 것
        "Q": "나피리가 다르킨의 저주를 받은 칼날을 던져 <physicaldamage>@spell.NaafiriQ:TotalDamageFirstCast@의 물리 피해</physicaldamage>를 입히고 출혈을 일으켜 @spell.NaafiriQ:BleedDuration@초에 걸쳐 <physicaldamage>@spell.NaafiriQ:TotalBleedDamage@의 물리 피해</physicaldamage>를 입힙니다.<br><br>나피리는 이 스킬을 <recast>재사용</recast>할 수 있습니다. 적중한 적이 이미 이 스킬로 인한 출혈 상태라면 남은 출혈 피해+잃은 체력에 비례한 <physicaldamage>@spell.NaafiriQ:TotalMinDamageSecondCast@</physicaldamage>~<physicaldamage>@spell.NaafiriQ:TotalMaxDamageSecondCast@의 물리 피해</physicaldamage>를 입힙니다. 해당 대상이 챔피언 또는 대형 몬스터면 나피리가 <healing>@spell.NaafiriQ:TotalHealSecondCast@의 체력</healing>을 회복합니다.<br><br><keywordmajor>무리</keywordmajor>가 처음 적중한 챔피언 또는 몬스터에게 도약해 @spell.NaafiriP:PackmateTauntDuration@초 동안 공격합니다. <br><br>", // 다르킨 단검
        "W": "나피리가 {v1}초 동안 대상으로 지정할 수 없는 상태가 되고 사냥을 준비하며 <keywordmajor>추가 무리를 {v2}마리</keywordmajor> 소환하고 {v3}초 동안 <physicaldamage>공격력이 {v4}</physicaldamage>, <speed>이동 속도가 {v5}%</speed> 증가합니다.<br><br><keywordmajor>무리</keywordmajor>가 대상으로 지정할 수 없는 상태가 되며 나피리에게 돌아갑니다.<br><br>", // 무리의 부름
        "E": "나피리가 전방으로 돌진해 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힌 후 칼날 폭발을 일으켜 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입힙니다.<br><br><keywordmajor>무리</keywordmajor>가 대상으로 지정할 수 없는 상태가 되며 나피리에게 돌아가 <healing>100%의 체력을 회복</healing>합니다.<br>", // 적출
        "R": "나피리가 적 챔피언에게 돌진해 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 잠시 <status>둔화</status>시킵니다. <keywordmajor>무리</keywordmajor>가 대상으로 지정할 수 없는 상태가 되어 나피리와 함께 돌진하며 <keywordmajor>한 마리</keywordmajor>당 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입힙니다.<br><br>나피리가 {v3}초 안에 처치 관여를 달성하면 주위 적들을 드러내고 이 스킬을 한 번 재사용할 수 있습니다. 두 번째 사용 시 {v4}초 동안 <shield>{v5}의 피해를 흡수하는 보호막</shield>을 얻습니다.<br><br><br>", // 사냥개의 추적
    },
    "Nautilus": { // 노틸러스
        "P": "노틸러스가 대상에 대한 첫 기본 공격 시 추가 물리 피해를 입히고 잠시 속박합니다.", // 강력한 일격 — CD 요약본, 직접 다듬을 것
        "Q": "노틸러스가 전방으로 닻을 던집니다. 닻이 적을 맞히면 노틸러스와 대상이 가까이 당겨지며 대상에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 잠시 <status>기절</status>시킵니다. 닻이 지형을 맞히면 노틸러스가 지형 쪽으로 끌려갑니다.", // 닻줄 견인
        "W": "노틸러스가 {v1}초 동안 <shield>{v2}의 피해를 흡수하는 보호막</shield>을 얻습니다. <shield>보호막</shield>이 지속되는 동안 노틸러스의 기본 공격은 2초에 걸쳐 대상과 대상 주위의 모든 적에게 <magicdamage>{v3}의 마법 피해</magicdamage>를 추가로 입힙니다.", // 타이탄의 분노
        "E": "노틸러스가 주위에 세 번의 폭발을 일으킵니다. 폭발할 때마다 범위 내의 모든 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 {v3}% <status>둔화</status>시킵니다. 둔화 효과는 시간이 지나면 사라집니다.", // 역조
        "R": "노틸러스가 적 챔피언을 추격하는 충격파를 발사해 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히며, {v2}초 동안 <status>공중으로</status> <status>띄워 올리고</status> <status>기절</status>시킵니다. 충격파에 맞은 다른 적 또한 <status>공중에 뜨고</status> <status>기절</status>하며 <magicdamage>{v3}의 마법 피해</magicdamage>를 입습니다.", // 폭뢰
    },
    "Nocturne": { // 녹턴
        "P": "몇 초마다 녹턴의 기본 공격이 주변 적에게 추가 물리 피해를 입히고 녹턴의 체력을 회복시킵니다. <br><br>녹턴이 기본 공격 시 이 효과의 재사용 대기시간이 감소합니다.", // 그림자 칼날 — CD 요약본, 직접 다듬을 것
        "Q": "녹턴이 그림자 칼날을 던져 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 {v2}초 동안 황혼의 궤적을 남깁니다. 공격당한 적 챔피언 역시 황혼의 궤적을 남깁니다. <br><br>녹턴은 궤적 위로 이동 시 유체화 상태가 되고 <speed>이동 속도가 {v3}%</speed> 상승하며 <physicaldamage>공격력이 {v4}</physicaldamage> 증가합니다.", // 황혼의 인도자
        "W": "<passive>기본 지속 효과:</passive> 녹턴의 <attackspeed>공격 속도가 {v1}%</attackspeed> 상승합니다.<br><br><active>사용 시:</active> 녹턴이 1.5초 동안 그림자 장벽을 생성해 적의 다음 스킬을 방어합니다. 스킬을 막아내면 {v2}초 동안 이 스킬의 기본 지속 효과가 강화되어 <attackspeed>공격 속도가 {v3}%</attackspeed>까지 상승합니다.", // 어둠의 장막
        "E": "<passive>기본 지속 효과:</passive> 녹턴이 <status>공포</status>에 빠진 적에게 접근할 때 <speed>이동 속도가 {v1}%</speed> 증가합니다.<br><br><active>사용 시:</active> 녹턴이 대상과 연결되어 악몽을 꾸게 하고 {v2}초 동안 <magicdamage>{v3}의 마법 피해</magicdamage>를 입힙니다. 연결이 끊어지지 않으면 대상이 {v4}초 동안 <status>공포</status>에 빠집니다.", // 말할 수 없는 공포
        "R": "녹턴이 전장을 어둠으로 뒤덮어 {v1}초 동안 모든 적 챔피언의 시야 반경을 줄이고 시야 공유를 차단합니다. 지속시간 중에 스킬을 <recast>재사용</recast>하면 적 챔피언에게 돌격해 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입힙니다.", // 피해망상
    },
    "Nunu": { // 누누와 윌럼프
        "P": "누누가 윌럼프와 주변 아군 1명의 공격 속도와 이동 속도를 증가시키고, 윌럼프의 기본 공격이 대상 근처의 적에게 피해를 줍니다.", // 프렐요드의 부름 — CD 요약본, 직접 다듬을 것
        "Q": "윌럼프가 적을 물어뜯습니다. 미니언이나 정글 몬스터에게 사용 시 <truedamage>{v1}의 고정 피해</truedamage>를 입히고 <healing>{v2}의 체력</healing>을 회복합니다. 챔피언에게 사용 시 <magicdamage>{v3}의 마법 피해</magicdamage>를 입히고 <healing>{v4}의 체력</healing>을 회복합니다.<br><br>누누와 윌럼프의 체력이 {v5}% 미만일 경우 <healing>회복량</healing>이 {v6}% 증가합니다.", // 잡아먹기
        "W": "누누와 윌럼프가 굴릴수록 크기와 속도가 증가하는 눈덩이를 생성합니다. 눈덩이는 적에게 피해를 입히고 공중으로 띄워 올립니다. 눈덩이를 굴리는 동안 회전 속도가 느려지지만 계속 회전하면 회전 속도가 점점 증가합니다.<br><br>눈덩이가 챔피언이나 대형 몬스터, 벽에 충돌하면 <magicdamage>{v1}</magicdamage>~<magicdamage>{v2}의 마법 피해</magicdamage>를 입히고 {v3}~{v4}초 동안 대상을 <status>공중으로 띄워 올립니다</status>. 피해량은 눈덩이를 굴린 거리에 비례합니다.<br><br><recast>재사용</recast>하여 눈덩이를 일찍 굴려 보낼 수 있습니다.", // 데굴데굴 눈덩이!
        "E": "누누가 눈덩이 3개를 던져 눈덩이 하나당 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 눈덩이 3개를 모두 맞은 적은 {v2}초 동안 {v3}% <status>둔화</status>됩니다. 이 스킬은 최대 2회까지 <recast>재사용</recast>할 수 있습니다.<br><br>{v4}초 후 누누가 눈덩이에 맞아 <status>둔화</status>된 주변 적을 모두 {v5}초 동안 <status>속박</status>하고 <magicdamage>{v6}의 추가 마법 피해</magicdamage>를 입힙니다.", // 눈덩이 팡팡팡
        "R": "누누와 윌럼프가 최대 {v1}초 동안 강력한 눈보라를 생성합니다. 눈보라 안에 있는 적은 {v2}% <status>둔화</status>되며 지속시간 동안 둔화 정도는 최대 {v3}%까지 증가합니다. 누누와 윌럼프는 <shield>{v4}의 보호막</shield>을 얻으며, 이 보호막은 이후 {v5}초에 걸쳐 서서히 사라집니다.<br><br>눈보라가 끝나면 폭발하여 범위 내에 있는 적에게 정신 집중 시간에 비례해 최대 <magicdamage>{v6}의 마법 피해</magicdamage>를 입힙니다. <recast>재사용</recast>하여 눈보라를 일찍 끝낼 수 있습니다.", // 절대 영도
    },
    "Jade_Nunu": { // 누누와 윌럼프
        "P": "누누는 기본 공격을 5회 가하면 다음 스킬을 소모값 없이 사용할 수 있습니다.", // 선지자 — CD 요약본, 직접 다듬을 것
        "Q": "<maintext>미니언 또는 몬스터를 물어뜯도록 설인에게 명령을 내려, 대상에게 <truedamage>{v1}의 고정 피해</truedamage>를 입히고 자신의 체력을 {v2}만큼 <healing>회복</healing>합니다.<br><br>누누는 잡아먹은 대상의 종류에 따라 {v3}초 동안 추가 효과를 얻습니다.<br><br><attention>늑대</attention> 또는 <attention>파충류: </attention>기본 공격과 스킬이 <magicdamage>내 최대 체력의 1%에 해당하는 마법 피해</magicdamage>를 추가로 입힙니다.<br><attention>골렘:</attention> 크기와 <scalehealth>최대 체력</scalehealth>이 10% 증가합니다.<br><attention>망령:</attention> 유닛을 처치하면 3초간 <speed>15%의 이동 속도</speed>를 얻습니다.", // 잡아먹기
        "W": "<maintext>누누 자신과 대상 아군의 피가 끓어올라, 12초 동안 <speed>이동 속도가 {v1}%</speed>, <attackspeed>공격 속도가 {v2}%</attackspeed> 증가합니다. 누누는 자신을 대상으로 지정할 수 있습니다.", // 끓어오르는 피
        "E": "<maintext>누누가 적 유닛에게 얼음 덩어리를 던져 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고, 3초 동안 이동 속도를 {v2}% <status>둔화</status>시키며, 공격 속도를 25% 감소시킵니다.", // 얼음 덩어리
        "R": "<maintext>누누가 최대 3초간 정신을 집중하며 범위 내의 열기를 빨아들입니다. 주변의 적은 50% <status>둔화</status>되고 <attackspeed>공격 속도</attackspeed>가 25% 감소합니다.<br><br>정신 집중이 끝나면 근처에 있던 적은 정신 집중 시간에 따라 최대 <magicdamage>{v1}의 마법 피해</magicdamage>를 받습니다.", // 절대 영도
    },
    "Nidalee": { // 니달리
        "P": "수풀을 통과하면 니달리의 이동 속도가 2초간 10% 상승하며, 1400 범위 안의 눈에 보이는 적 챔피언 쪽으로 갈 때는 30%까지 올라갑니다.<br><br>챔피언이나 몬스터에게 창 투척 또는 매복 덫을 맞히면 <font color='#FFF673'>사냥</font>이 발동되어 4초간 대상에 대한 <font color='#ee91d7'>절대 시야</font>를 얻습니다. 이 동안 니달리는 이동 속도가 10% 상승하고 (<font color='#FFF673'>사냥</font> 당하는 대상을 향해 갈 때 30% 상승) 이들을 사냥할 때 숨통 끊기와 급습이 강화됩니다.", // 수풀 배회 — CD 요약본, 직접 다듬을 것
        "Q": "<keywordmajor>인간 형태:</keywordmajor> 니달리가 창을 던져 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 피해량은 창이 날아간 거리에 비례해 <magicdamage>{v2}의 마법 피해</magicdamage>까지 증가합니다.", // 창 투척 / 숨통 끊기
        "W": "<keywordmajor>인간 형태:</keywordmajor> 니달리가 2분 동안 유지되는 투명한 덫을 설치합니다. 적이 덫을 밟으면 {v1}초 동안 초당 <magicdamage>{v2}의 마법 피해</magicdamage>를 입습니다.<br><br>한 번에 {v3}개의 덫만 설치할 수 있습니다.", // 매복 덫 / 급습
        "E": "<keywordmajor>인간 형태:</keywordmajor> 니달리가 <healing>체력을 {v1}</healing> 회복합니다. 회복량은 잃은 체력에 비례해 <healing>{v2}</healing>까지 증가합니다. 또한 {v3}초 동안 <attackspeed>공격 속도를 {v4}%</attackspeed> 증가시킵니다.", // 태고의 생명력 / 할퀴기
        "R": "<passive>기본 지속 효과:</passive> <keywordmajor>인간 형태</keywordmajor>일 때 <keywordmajor>사냥</keywordmajor>을 적용하면 이 스킬의 재사용 대기시간이 초기화됩니다.<br><br><keywordmajor>인간 형태:</keywordmajor> 니달리가 <keywordmajor>쿠거 형태</keywordmajor>로 변하며 기본 공격이 근접으로 바뀌고 사용 스킬이 변경됩니다.<br><br><keywordmajor>쿠거 형태:</keywordmajor> 니달리가 <keywordmajor>인간 형태</keywordmajor>로 변하며 기본 공격이 원거리로 바뀌고 사용 스킬이 변경됩니다.", // 쿠거의 상
    },
    "Jade_Nidalee": { // 니달리
        "P": "수풀을 통과해 이동하면 니달리의 이동 속도가 2초간 15% 증가합니다.", // 수풀 배회 — CD 요약본, 직접 다듬을 것
        "Q": "<keywordmajor>인간 형태:</keywordmajor> 니달리가 창을 던져, 대상과의 거리에 따라 <magicdamage>{v1}</magicdamage>~<magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.<br><br><keywordmajor>쿠거 형태: </keywordmajor>니달리가 다음 기본 공격 시 <physicaldamage>@spell.Jade_NidaleeAspectOfTheCougar:TotalTakedownDamage@의 물리 피해</physicaldamage>를 입힙니다. 부상당한 대상에게는 입히는 피해가 증가합니다. (최대 300%의 피해)", // 창 투척 / 숨통 끊기
        "W": "<keywordmajor>인간 형태: </keywordmajor>니달리가 덫을 설치합니다. 덫은 대상에게 2초에 걸쳐 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고, 위치를 드러내며, 12초 동안 <scalearmor>방어력</scalearmor>과 <scalemr>마법 저항력</scalemr>을 {v2}% <status>감소</status>시킵니다.<br><br><keywordmajor>쿠거 형태: </keywordmajor>니달리가 전방으로 도약해, 주변 적에게 <magicdamage>@spell.Jade_NidaleeAspectOfTheCougar:TotalPounceDamage@의 마법 피해</magicdamage>를 입힙니다.", // 매복 덫 / 급습
        "E": "<keywordmajor>인간 형태: </keywordmajor>니달리가 아군 챔피언의 체력을 <healing>{v1}</healing>만큼 회복시키고 7초 동안 <attackspeed>{v2}%의 공격 속도</attackspeed>를 부여합니다.<br><br><keywordmajor>쿠거 형태: </keywordmajor>니달리가 전방의 적을 발톱으로 공격해 <magicdamage>@spell.Jade_NidaleeAspectOfTheCougar:TotalSwipeDamage@의 마법 피해</magicdamage>를 입힙니다.", // 태고의 생명력 / 할퀴기
        "R": "<keywordmajor>인간 형태: </keywordmajor>니달리가 사나운 쿠거로 변신해, <speed>20의 이동 속도</speed>를 얻고 기본 스킬이 <spellname>숨통 끊기</spellname>, <spellname>급습</spellname>, <spellname>할퀴기</spellname>로 바뀝니다.<br><br><keywordmajor>쿠거 형태: </keywordmajor>니달리가 인간 형태로 돌아옵니다.", // 쿠거의 상
    },
    "Neeko": { // 니코
        "P": "니코가 아군 챔피언 또는 맵에 있는 다른 유닛 중 하나로 변신합니다. 이동 불가 군중 제어기에 당하거나 피해를 입히는 스킬을 사용하거나 챔피언이 아닌 상태에서 적 포탑에 피해를 입히거나 변장한 유닛의 체력만큼 피해를 입으면 변신이 풀립니다.", // 태고의 마력 — CD 요약본, 직접 다듬을 것
        "Q": "니코가 폭발하는 씨앗을 던져 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 씨앗이 폭발하여 유닛을 처치하거나 챔피언 또는 대형 몬스터에게 피해를 입히면 다시 폭발하여 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다. 최대 두 번까지 추가로 폭발합니다.", // 꽃망울 폭발
        "W": "<passive>기본 지속 효과:</passive> 세 번째 기본 공격마다 <magicdamage>{v1}의 추가 마법 피해</magicdamage>를 입히고 {v2}초 동안 <speed>이동 속도가 {v3}%</speed> 증가합니다.<br><br><active>사용 시:</active> 니코가 {v4}초 동안 <keywordstealth>투명</keywordstealth> 상태가 되며 {v5}초 동안 유지되는 복제 형상을 만들어 지정한 방향으로 보냅니다. 니코와 복제 형상은 {v6}초 동안 <speed>{v7}%의 추가 이동 속도</speed>를 얻습니다. <br><br><rules>클릭하여 소환수 이동 단축키를 사용하거나 이 스킬을 <recast>재사용</recast>해 분신을 조종할 수 있습니다.<br>분신은 니코의 스킬, 감정표현, 귀환을 따라 합니다.</rules>", // 형상 분리
        "E": "니코가 올가미를 던져 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 <status>속박</status>합니다.<br><br>올가미는 적을 맞히면 강화되어 크기가 커지고 더 빠르게 날아가며, {v3}초 동안 <status>속박</status>합니다.", // 칭칭올가미
        "R": "잠시 후 니코가 공중으로 도약해 {v1}초 동안 주변의 모든 적을 <status>공중으로 띄워 올립니다</status>. 이후 떨어지며 주변의 모든 적에게 <magicdamage>{v2}의 마법 피해</magicdamage>를 입히고 {v3}초 동안 <status>기절시킵니다</status>.<br><br><rules>니코가 변신 상태인 경우 이 스킬의 준비 동작이 적에게 보이지 않습니다. 이 스킬을 사용하면 {v4}초 후 변신이 해제됩니다.</rules>", // 만개
    },
    "Nilah": { // 닐라
        "P": "미니언에게 최후의 일격을 가하면 경험치를 추가로 획득하며, 주변 아군이 부여하는 체력 회복 및 보호막 효과를 강화하고 공유합니다.", // 영원한 기쁨 — CD 요약본, 직접 다듬을 것
        "Q": "<passive>기본 지속 효과:</passive> 방어구 관통력이 {v1} 증가하고, 챔피언에게 기본 공격 시 <healing>입힌 피해의 {v2}만큼 체력</healing>을 회복합니다. 최대 체력을 초과한 회복량은 {v3}초 동안 유지되는 <shield>보호막</shield>으로 전환됩니다.<br><br><active>사용 시:</active> 칼날 채찍을 휘둘러 <physicaldamage>{v4}의 물리 피해</physicaldamage>를 입힙니다. 적 유닛이나 구조물에 공격이 적중하면 125의 공격 사거리와 <attackspeed>{v5}%의 공격 속도</attackspeed>를 얻으며, {v6}초 동안 원뿔 범위를 공격합니다.<br>", // 무형의 검
        "W": "{v1}초 동안 자신을 안개로 감싸 유체화 상태가 되어 <speed>이동 속도가 {v2}%</speed> 증가하고 기본 공격을 회피하며, 입는 <magicdamage>마법 피해</magicdamage>를 {v3}% 감소시킵니다.<br><br>스킬이 활성화된 동안 닐라와 닿은 아군 챔피언도 안개에 휩싸여 {v4}초 동안 같은 효과를 얻습니다.<br>", // 승리의 장막
        "E": "대상 유닛을 뚫고 돌진해 경로상의 모든 적에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다.", // 급류
        "R": "칼날 채찍을 휘둘러 1초 동안 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힌 다음 마지막 일격으로 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입히고 적을 자신 쪽으로 <status>끌어당깁니다</status>.<br><br>적 챔피언에게 <healing>입힌 피해의 {v3}(+@spell.NilahQ:CritLifesteal@ 무형의 검)</healing>만큼 자신과 주변 아군을 회복시키며, 최대 체력을 초과한 회복량은 {v4}초 동안 지속되는 <shield>보호막</shield>으로 전환됩니다.", // 환희
    },
    "Darius": { // 다리우스
        "P": "다리우스의 기본 공격과 스킬 공격은 적에게 출혈을 일으켜 5초 동안 물리 피해를 입힙니다. 최대 5회까지 중첩됩니다. 최대 중첩 시 다리우스가 분노하며 공격력이 크게 증가합니다.", // 과다출혈 — CD 요약본, 직접 다듬을 것
        "Q": "다리우스가 도끼를 들어 올린 후 주위로 휘둘러 도끼날로는 <physicaldamage>{v1}의 물리 피해</physicaldamage>, 도끼 자루로는 <physicaldamage>{v2}의 피해</physicaldamage>를 입힙니다. 도끼 자루에 맞은 적은 <keywordmajor>과다출혈</keywordmajor>이 중첩되지 않습니다.<br><br>다리우스는 도끼날로 맞힌 적 챔피언과 대형 정글 몬스터 하나당 <healing>잃은 체력의 {v3}%</healing>를 회복합니다. 최대 <healing>{v4}%</healing>까지 회복됩니다.", // 학살
        "W": "다리우스의 다음 기본 공격은 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고, {v2}초 동안 {v3}% <status>둔화</status>시킵니다.<br><br>이 스킬로 대상을 처치하면 소모한 마나를 되돌려받고, 재사용 대기시간이 {v4}% 감소합니다.<br><br><rules>이 스킬은 피해를 입힐 때 효과가 발동합니다.</rules>", // 마비의 일격
        "E": "<passive>기본 지속 효과:</passive> 다리우스의 방어구 관통력이 {v1}% 상승합니다.<br><br><active>사용 시:</active> 다리우스가 도끼를 걸어 <status>끌어당기고</status> <status>공중으로 띄워 올린</status> 후 {v2}초 동안 {v3}% <status>둔화</status>시킵니다.", // 포획
        "R": "다리우스가 적에게 뛰어올라 치명적 타격을 가하여 <truedamage>{v1}의 고정 피해</truedamage>를 입힙니다. 대상의 <keywordmajor>과다출혈</keywordmajor> 중첩 하나당 {v2}%의 피해를 추가로 입힙니다. 최대 <truedamage>{v3}의 피해</truedamage>가 적용됩니다.<br><br>이 스킬로 대상을 처치할 경우, 다리우스가 {v4}초 안에 이 스킬을 <recast>재사용</recast>할 수 있습니다. 스킬 레벨이 3이 되면 이 스킬을 사용할 때 마나가 소모되지 않으며 챔피언을 처치하면 재사용 대기시간이 완전히 초기화됩니다.", // 녹서스의 단두대
    },
    "Diana": { // 다이애나
        "P": "3번째 공격마다 근처 적들을 베어 추가 마법 피해를 입힙니다. 스킬 사용 후 5초 동안 공격 속도가 증가합니다.", // 서늘한 달빛 검 — CD 요약본, 직접 다듬을 것
        "Q": "다이애나가 달 에너지를 휘어지게 발사하여 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 <keywordmajor>달빛</keywordmajor>으로 표식을 남깁니다. <br><br><keywordmajor>달빛</keywordmajor>은 <keywordstealth>은신</keywordstealth> 상태가 아닌 적을 드러냅니다.", // 초승달 검기
        "W": "다이애나가 {v1}초 동안 주위를 돌면서 닿으면 폭발하여 각각 <magicdamage>{v2}의 마법 피해</magicdamage>를 입히는 구체를 세 개 생성합니다. 최대 <magicdamage>{v3}의 피해</magicdamage>를 입힙니다.<br><br>같은 시간 동안 다이애나가 <shield>{v4}의 피해를 흡수하는 보호막</shield>도 얻습니다. 마지막 구체가 폭발하면 <shield>{v4}의 피해를 흡수하는 보호막</shield>을 추가로 얻고 지속시간이 초기화됩니다.", // 은빛 가호
        "E": "다이애나가 복수심에 불타는 달이 되어 적에게 돌진하고 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 대상이 <keywordmajor>달빛</keywordmajor> 효과를 받고 있으면 이 스킬의 재사용 대기시간이 초기화됩니다.", // 월광 쇄도
        "R": "다이애나가 주위 적들을 드러내 <status>끌어당긴</status> 다음 {v1}초 동안 {v2}% <status>둔화</status>시킵니다.<br><br>최소 한 명의 적 챔피언에게 적중하면 다이애나가 달을 불러내어 <magicdamage>{v3}의 마법 피해</magicdamage>+추가로 끌어당기는 챔피언 하나당 <magicdamage>{v4}</magicdamage>에 해당하는 피해를 입힙니다. 최대 <magicdamage>{v5}의 피해</magicdamage>를 추가로 입힙니다.", // 달빛 낙하
    },
    "Draven": { // 드레이븐
        "P": "드레이븐이 회전 도끼를 받아내거나 미니언 또는 몬스터를 처치하고 포탑을 철거하면 팬들의 환호를 받습니다. 적 챔피언을 처치하면 지금까지 얻은 팬들의 환호에 비례해 추가 골드를 획득합니다.", // 드레이븐의 리그 — CD 요약본, 직접 다듬을 것
        "Q": "드레이븐이 <keywordmajor>회전 도끼</keywordmajor>를 준비해 다음 기본 공격이 추가로 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 도끼가 공중으로 튕깁니다. 드레이븐이 회전 도끼를 잡으면 다시 <keywordmajor>회전 도끼</keywordmajor>를 준비합니다.<br><br>드레이븐은 한 번에 2개의 <keywordmajor>회전 도끼</keywordmajor>를 들 수 있습니다.", // 회전 도끼
        "W": "드레이븐이 유체화 상태가 되며 <speed>이동 속도가 {v1}%</speed> 증가했다가 {v2}초에 걸쳐 원래대로 돌아옵니다. {v3}초 동안 <attackspeed>공격 속도가 {v4}%</attackspeed> 증가합니다.<br><br>드레이븐이 <keywordmajor>회전 도끼</keywordmajor>를 잡으면 이 스킬의 재사용 대기시간이 초기화됩니다.", // 광기의 피
        "E": "드레이븐이 수평으로 도끼를 던져 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 <status>뒤로 밀어내며</status> {v2}초 동안 {v3}% <status>둔화</status>시킵니다.", // 비켜서라
        "R": "드레이븐이 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히는 대형 도끼 2개를 투척합니다. 챔피언에게 적중하거나 <recast>재사용</recast>하면 도끼가 드레이븐에게 돌아옵니다. 적에게 명중할 때마다 피해량이 {v2}% (최소: {v3}%) 감소합니다.<br><br>적 챔피언이 <keywordmajor>죽음의 소용돌이</keywordmajor>에 피해를 입어 체력이 드레이븐의 현재 <keywordmajor>드레이븐의 리그</keywordmajor> 중첩({v4})의 {v5}% 이하가 되면 드레이븐이 해당 챔피언을 처치합니다.", // 죽음의 소용돌이
    },
    "Ryze": { // 라이즈
        "P": "<mainText>라이즈의 스킬이 추가 마나에 따라 추가 피해를 입히고, 최대 마나가 주문력에 비례해 증가합니다.</mainText>", // 비전 연마 — CD 요약본, 직접 다듬을 것
        "Q": "<passive>기본 지속 효과:</passive> <spellname>룬 감옥</spellname>과 <spellname>주문 전이</spellname> 사용 시 이 스킬의 재사용 대기시간이 초기화되고 {v1}초 동안 룬이 충전됩니다. 룬은 최대 {v2}개까지 충전됩니다.<br><br><active>사용 시:</active> 돌풍을 발사하여 처음으로 맞힌 적에게 <magicdamage>{v3}의 마법 피해</magicdamage>를 입힙니다. 대상에게 <keywordmajor>전이</keywordmajor> 표식이 있으면 과부하가 표식을 소모하여 @Spell.RyzeR:OverloadDamageBonus@% 증가한 피해를 입히고 <keywordmajor>전이</keywordmajor> 표식이 있는 주변 적에게 튕깁니다.<br><br>라이즈가 룬을 전부 방출합니다. 룬이 {v2}개 충전되면 {v4}초 동안 이동 속도가 <speed>{v5}%</speed>상승합니다.<br>", // 과부하
        "W": "<magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 {v3}% <status>둔화</status>시킵니다. <keywordmajor>전이</keywordmajor> 표식이 있는 대상에게는 표식을 소모하여 <status>둔화</status>시키는 대신 <status>속박</status>시킵니다.", // 룬 감옥
        "E": "라이즈가 구체를 던져 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 대상과 주변 적에게 {v2}초 동안 <keywordmajor>전이</keywordmajor>를 적용합니다. <keywordmajor>전이</keywordmajor> 표식이 남아 있는 적들은 주변에 <keywordmajor>전이</keywordmajor> 표식을 퍼뜨립니다.", // 주문 전이
        "R": "<passive>기본 지속 효과:</passive> <spellname>과부하</spellname> 사용 시 <keywordmajor>전이</keywordmajor> 표식이 있는 적에게 {v1}%의 추가 피해를 입힙니다.<br><br><active>사용 시:</active> 다른 위치로 이동하는 차원문을 엽니다. {v2}초 후, 차원문 근처의 모든 아군이 해당 위치로 순간이동합니다.", // 공간 왜곡
    },
    "Jade_Ryze": { // 라이즈
        "P": "라이즈가 스킬을 사용하면 다른 모든 스킬의 재사용 대기시간이 감소합니다.", // 비전 연마 — CD 요약본, 직접 다듬을 것
        "Q": "<passive>기본 지속 효과</passive>: 라이즈가 영구적으로 {v1}%의 재사용 대기시간 감소 효과를 얻습니다.<br><br><active>사용 시</active>: 라이즈가 대상에게 에너지 구체를 던져 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.", // 과부하
        "W": "라이즈가 마법으로 적을 가둬 {v1}초 동안 <status>속박</status>시키고 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.", // 룬 감옥
        "E": "라이즈가 적과 자신 사이를 최대 {v1}회 튕기는 혼돈의 마법 투사체를 발사해, 적에게 <magicdamage>{v2}의 마법 피해</magicdamage>를 입히고 <scalemr>마법 저항력</scalemr>을 {v3}만큼 감소시킵니다.", // 주문 전이
        "R": "라이즈가 일시적으로 전력을 끌어내, {v1}초 동안 모든 스킬로 <magicdamage>{v2}%의 광역 피해</magicdamage>를 입히고 <healing>{v3}%의 주문 흡혈</healing>과 <speed>{v4}의 이동 속도</speed>를 얻습니다.", // 필사적인 힘
    },
    "Rakan": { // 라칸
        "P": "라칸에게 주기적으로 보호막이 생성됩니다.", // 요술 망토 — CD 요약본, 직접 다듬을 것
        "Q": "마법이 깃든 깃털을 던져 처음 적중한 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.<br><br>챔피언 또는 에픽 정글 몬스터를 맞힐 경우 {v2}초 뒤 라칸과 주변 아군이 <healing>{v3}만큼 체력을 회복</healing>합니다. 라칸이 아군에게 닿으면 회복 효과가 즉시 발동됩니다.", // 빛나는 깃털
        "W": "라칸이 돌진했다가 공중으로 날아 오르며 적들을 {v1}초 동안 <status>공중으로 띄워 올리고</status> <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.", // 화려한 등장
        "E": "라칸이 아군 챔피언에게 도약해 {v1}초 동안 <shield>{v2}의 피해를 흡수하는 보호막</shield>을 씌웁니다.<br><br>라칸은 {v3}초 안에 이 스킬을 <recast>재사용</recast>할 수 있습니다.", // 전쟁무도
        "R": "라칸이 {v1}초 동안 <speed>{v2}%의 이동 속도</speed>를 얻습니다. 처음 라칸과 닿는 적은 <magicdamage>{v3}의 마법 피해</magicdamage>를 입고 {v4}초 동안 <status>매혹</status>됩니다. 처음 챔피언에게 닿으면 <speed>이동 속도가 {v5}% 빨라졌다가 점차 감소</speed>합니다.", // 매혹의 질주
    },
    "Rammus": { // 람머스
        "P": "람머스가 방어력 및 마법 저항력에 비례해 추가 공격력을 얻습니다.", // 가시박힌 껍질 — CD 요약본, 직접 다듬을 것
        "Q": "람머스가 공 모양으로 몸을 말아 <speed>이동 속도가 {v1}</speed> 증가하고, {v2}초 동안 <speed>이동 속도가 {v3}</speed>까지 증가합니다. 람머스가 적과 충돌하면 멈추며, <magicdamage>{v4}의 마법 피해</magicdamage>를 입히고, <status>뒤로 밀어내며</status>, {v5}초 동안 주변 적들을 {v6}% <status>둔화</status>시킵니다.<br><br><recast>재사용 시</recast>: 이 스킬을 일찍 종료합니다.", // 대회전
        "W": "람머스가 {v1}초 동안 방어 태세에 들어가 <scalearmor>방어력을 {v2}</scalearmor>, <scalemr>마법 저항력을 {v3}</scalemr> 얻고 람머스를 공격하는 적에게 <magicdamage>{v4}의 마법 피해</magicdamage>를 입힙니다.<br><br><recast>재사용 시</recast>: 이 스킬을 일찍 종료합니다.", // 몸 말아 웅크리기
        "E": "람머스가 적 챔피언이나 몬스터를 {v1}초 동안 <status>도발</status>합니다. 몬스터는 <magicdamage>{v2}의 마법 피해</magicdamage>를 입습니다.", // 광란의 도발
        "R": "람머스가 공중으로 뛰어오른 후 지점에 착지하여 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 {v3}% <status>둔화</status>시킵니다. <spellname>대회전</spellname> 중에 사용했다면 중앙에 있는 적들은 추가로 <magicdamage>@spell.PowerBall:PowerBallDamage@의 마법 피해</magicdamage>를 입고 {v4}초 동안 <status>공중에 뜹니다</status>.<br><br>이후 {v5}초 동안 해당 지점에 여진이 {v6}회 발생하며 <status>둔화</status> 효과를 중첩합니다.<br><br>이 스킬의 범위는 람머스의 <speed>이동 속도</speed>에 따라 증가합니다.", // 지진 폭격
    },
    "Jade_Rammus": { // 람머스
        "P": "람머스가 껍질이 튼튼해짐에 따라 추가 피해를 얻어, 방어력의 25%를 공격력으로 전환합니다.", // 가시박힌 껍질 — CD 요약본, 직접 다듬을 것
        "Q": "람머스가 공 모양으로 몸을 만 후 7초에 걸쳐 가속하며 적에게 돌진합니다. 충돌 시 주변 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 3초간 {v2}% <status>둔화</status>시킵니다.<br><br><recast>재사용</recast> 시 효과가 사라집니다.", // 대회전
        "W": "람머스가 6초 동안 방어 자세로 들어가 자신의 <scalearmor>방어력</scalearmor>과 <scalemr>마법 저항력</scalemr>을 {v1}만큼 증가시키고, 자신에게 기본 공격을 가하는 적에게 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.<br><br><recast>재사용</recast> 시 효과가 사라집니다.", // 몸 말아 웅크리기
        "E": "<maintext>람머스가 적 챔피언이나 몬스터를 <status>도발</status>하여 자신을 향해 무모하게 덤벼들도록 합니다. 도발당한 대상은 {v1}초간 방어력이 {v2} 감소하고, 람머스에게 강제로 기본 공격을 가하게 됩니다.", // 따끔한 도발
        "R": "람머스가 지진을 일으켜 8초 동안 근처의 유닛과 구조물에 매초 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.", // 지진
    },
    "Lux": { // 럭스
        "P": "럭스의 공격 스킬은 몇 초 동안 적을 빛의 에너지로 가득 채웁니다. 럭스의 기본 공격으로 이 에너지를 불태우면 적은 럭스의 레벨에 비례하는 추가 마법 피해를 받습니다.", // 광채 — CD 요약본, 직접 다듬을 것
        "Q": "럭스가 빛의 구체를 발사하여 처음 적중한 적 둘을 {v1}초 동안 <status>속박</status>하고 각각 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.", // 빛의 속박
        "W": "럭스가 마법봉을 던져 봉에 닿은 모든 아군에게 {v1}초 동안 <shield>{v2}의 피해를 흡수하는 보호막</shield>을 씌웁니다. 마법봉은 돌아올 때도 똑같이 <shield>보호막</shield>을 부여합니다.", // 프리즘 보호막
        "E": "럭스가 빛의 영역을 생성해 적들을 {v1}% <status>둔화</status>시키고 해당 지역을 드러냅니다. {v2}초가 지나거나 스킬을 <recast>재사용</recast>하면 폭발하며 <magicdamage>{v3}의 마법 피해</magicdamage>를 입히고 추가로 {v4}초 동안 <status>둔화</status>시킵니다.", // 광휘의 특이점
        "R": "럭스가 눈부신 광선을 발사하여 일직선상에 있는 모든 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.", // 최후의 섬광
    },
    "Jade_Lux": { // 럭스
        "P": "럭스의 공격 스킬은 6초 동안 대상을 빛의 에너지로 가득 채웁니다. 럭스가 다음 기본 공격 시 이 에너지를 불태워, 자신의 레벨에 비례하는 추가 마법 피해를 입힙니다.", // 광채 — CD 요약본, 직접 다듬을 것
        "Q": "럭스가 빛의 구체를 발사하여 처음 적중한 적을 2초 동안 <status>속박</status>하고 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 두 번째로 적중한 적은 <magicdamage>{v2}</magicdamage>의 피해를 받고 1초 동안 <status>속박</status>됩니다.", // 빛의 속박
        "W": "럭스가 마법봉을 지정한 위치로 던졌다가 다시 받습니다. 마법봉은 자신과 경로상에 있는 모든 아군 챔피언에게 3초 동안 <shield>{v1}의 피해를 흡수</shield>하는 <shield>보호막</shield>을 씌웁니다.", // 프리즘 보호막
        "E": "적을 {v1}% <status>둔화</status>시키는 구역을 생성합니다. 5초 후 해당 구역이 폭발하며 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.<br><br><recast>재사용</recast>하면 더 빨리 폭발시킬 수 있습니다.", // 광휘의 특이점
        "R": "정신을 집중하여 눈부신 광선을 발사해 일직선상에 있는 모든 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. <spellname>최후의 섬광</spellname>은 <spellname>광채</spellname>의 효과를 발동하고 재사용 대기시간을 초기화합니다.", // 최후의 섬광
    },
    "Rumble": { // 럼블
        "P": "럼블은 스킬을 사용할 때마다 열기를 얻습니다. 열기가 50%에 달하면 럼블은 위험 상태에 들어갑니다. 위험 상태가 되면 럼블의 모든 스킬은 추가 효과를 얻습니다. 열기가 100%에 달하면 과열 상태가 되어 공격 속도가 증가하고 기본 공격에 마법 피해가 추가되며 몇 초간 스킬을 사용할 수 없게 됩니다.", // 고철장 거인 — CD 요약본, 직접 다듬을 것
        "Q": "럼블이 화염방사기를 사용해 {v1}초 동안 <magicdamage>{v2} +최대 체력의 {v3}%에 해당하는 마법 피해</magicdamage>를 입힙니다. 미니언 공격 시 피해량이 <attention>{v4}%</attention>로 감소합니다.<br><br><keywordmajor>위험 상태:</keywordmajor> 마법 피해량이 <magicdamage>{v5} +최대 체력의 {v6}</magicdamage>만큼 증가합니다.<br><br><rules>체력 비례 피해량은 몬스터에게 최대 {v7}의 피해를 입힙니다. </rules>", // 화염방사기
        "W": "럼블이 방어막을 전개하여 {v1}초 동안 <shield>{v2}의 피해를 흡수하는 보호막</shield>을 얻고 {v3}초 동안 이동 속도가 <speed>{v4}%</speed> 증가합니다.<br><br><keywordmajor>위험 상태:</keywordmajor> <shield>{v5}의 피해를 흡수하는 보호막</shield>을 얻고 <speed>이동 속도가 {v6}</speed> 증가합니다.", // 고철 방패
        "E": "럼블이 전기 작살을 발사하여 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 {v3}% <status>둔화</status>시키며 {v4}초 동안 <scalemr>마법 저항력</scalemr>을 {v5}% 감소시킵니다.<br><br>이미 <status>둔화</status> 상태인 적을 이 스킬로 공격하면 <status>둔화</status> 효과가 {v6}%로 증가하며 적의 <scalemr>마법 저항력</scalemr>이 {v7}% 감소합니다.<br><br><keywordmajor>위험 상태:</keywordmajor> <magicdamage>{v8}의 마법 피해</magicdamage>를 입히고 <status>둔화</status> 효과와 <scalemr>마법 저항력</scalemr> 감소 효과가 50% 증가합니다.", // 전기 작살
        "R": "럼블이 일직선으로 로켓을 발사하여 {v1}초 동안 지속되는 불타는 궤적을 만듭니다. 궤적은 적을 {v2}% <status>둔화</status>시키고 초당 <magicdamage>{v3}의 마법 피해</magicdamage>를 입힙니다.<br><br>이 스킬을 사용하는 동안 클릭하고 드래그하여 궤적의 방향을 지정할 수 있습니다.", // 이퀄라이저 미사일
    },
    "Renata": { // 레나타 글라스크
        "P": "레나타의 기본 공격이 추가 피해를 입히고 표식을 남깁니다. 아군은 표식이 남은 적을 공격해 추가 피해를 입힐 수 있습니다.", // 영향력 — CD 요약본, 직접 다듬을 것
        "Q": "레나타 글라스크가 의수에서 미사일을 발사해 처음 적중하는 적을 {v1}초간 <status>속박</status>하고 <magicdamage>{v2}</magicdamage>의 <magicdamage>마법 피해</magicdamage>를 입힙니다.<br><br><recast>재사용 시:</recast> 레나타가 대상을 지정한 방향으로 <status>던져</status> 적중하는 적에게 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다. 챔피언을 던진 경우 적중하는 적을 {v3}초간 <status>기절</status>시킵니다.", // 악수
        "W": "레나타가 아군 챔피언을 강화합니다. 강화된 대상은 <attackspeed>{v1}의 공격 속도</attackspeed>를 얻고 적을 향해 이동할 때 <speed>{v2}의 이동 속도</speed>를 얻습니다. 이 효과는 {v3}초에 걸쳐 <attackspeed>공격 속도는 {v4}</attackspeed>, <speed>이동 속도는 {v5}</speed>까지 증가합니다. 처치 관여 시 효과 지속시간이 초기화됩니다.<br><br>대상이 죽으면 체력을 완전히 회복한 후 3초에 걸쳐 부식됩니다.<br><br>부식 중에 처치에 관여하면 체력이 <healing>최대 체력의 {v6}%</healing>가 되고 부식이 중단됩니다.<br><br><rules>부식 중인 챔피언의 죽음은 체력 회복 등의 효과로 늦출 수 있지만, 해당 챔피언이 처치에 관여하지 않는 한 죽음을 막을 수 없습니다. 챔피언의 죽음은 한 번만 늦출 수 있습니다.</rules>", // 긴급 구제
        "E": "레나타가 화학공학 미사일 두 발을 발사해 적중하는 적과 주변 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초간 30% <status>둔화</status>시킵니다. 적중하는 아군에게는 {v3}초간 <shield>{v4}의 피해를 흡수하는 보호막</shield>을 씌웁니다.", // 충성 고객 우대
        "R": "레나타가 화학 물질의 파도를 방출합니다. 적중당한 적은 {v1}초간 <status>광란</status> 상태에 빠져 근처 유닛을 기본 공격합니다. (자신의 아군 우선)<br><br><status>광란</status> 상태에 빠진 적은 <attackspeed>공격 속도가 {v2}%</attackspeed> 증가합니다.", // 적대적 인수
    },
    "Renekton": { // 레넥톤
        "P": "레넥톤이 기본 공격 시 분노를 생성합니다. 레넥톤의 체력이 낮으면 생성되는 분노가 증가합니다. 분노는 레넥톤의 스킬을 강화시키며 추가 효과를 줍니다.", // 분노의 지배 — CD 요약본, 직접 다듬을 것
        "Q": "레넥톤이 검을 휘둘러 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다. 챔피언이 아닌 대상을 맞히면 <healing>{v2}의 체력</healing>을, 챔피언을 맞힐 때는<healing>{v3}</healing>의 체력을 회복합니다. 챔피언이 아닌 대상을 맞힐 때는 <keywordmajor>분노 {v4}</keywordmajor>, 챔피언을 맞힐 때는 <keywordmajor>분노 {v5}</keywordmajor>이 생성됩니다.<br><br><keywordmajor>분노 추가 효과</keywordmajor>: 물리 피해로 입히는 피해량이 <physicaldamage>{v6}</physicaldamage>만큼 상승합니다. 챔피언이 아닌 대상에게서 <healing>{v7}의 체력</healing>을, 챔피언에게서 <healing>{v8}의 체력</healing>을 회복합니다. 더 이상 <keywordmajor>분노</keywordmajor>가 생성되지 않습니다.", // 양떼 도륙
        "W": "레넥톤의 다음 기본 공격은 두 번 베어 {v1}초 동안 적을 <status>기절</status>시키고 총 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입힙니다. 레넥톤이 챔피언을 맞히면 추가로 <keywordmajor>{v3}의 분노</keywordmajor>를 얻습니다.<br><br><keywordmajor>분노 추가 효과</keywordmajor>: 레넥톤이 세 번 공격하여 대상의 <shield>보호막</shield>을 파괴한 후 <physicaldamage>{v4}의 물리 피해</physicaldamage>를 입히고 {v5}초 동안 적을 <status>기절</status>시킵니다. <keywordmajor>분노</keywordmajor>가 생성되지 않습니다.", // 무자비한 포식자
        "E": "레넥톤이 돌격하며 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다. 챔피언이 아닌 대상을 맞힐 때는 <keywordmajor>{v2}의 분노</keywordmajor>가, 챔피언을 맞힐 때는 <keywordmajor>{v3}의 분노</keywordmajor>가 생성됩니다. 한 명 이상의 적에게 피해를 입힐 경우 {v4}초 내에 이 스킬을 한 번 <recast>재사용</recast>할 수 있습니다. <br><br><keywordmajor>분노 추가 효과</keywordmajor>: <recast>재사용</recast> 시 레넥톤이 돌격하며 <physicaldamage>{v5}의 물리 피해</physicaldamage>를 입히고 {v6}초 동안 방어력을 <scalearmor>{v7}%</scalearmor> 감소시킵니다. 더 이상 <keywordmajor>분노</keywordmajor>가 생성되지 않습니다.", // 자르고 토막내기
        "R": "레넥톤이 {v1}초 동안 어둠의 기운으로 자신을 감싸며 <healing>{v2}의 최대 체력</healing>과 <keywordmajor>{v3}의 분노</keywordmajor>를 얻습니다. 스킬이 활성화되어 있는 동안 레넥톤은 <magicdamage>{v4}의 마법 피해</magicdamage>를 입히고 초당 <keywordmajor>{v5}의 분노</keywordmajor>를 얻습니다.", // 강신
    },
    "Leona": { // 레오나
        "P": "공격 스킬은 대상에게 1.5초 동안 햇빛 효과를 부여합니다. 아군 챔피언이 햇빛에 걸린 적을 공격하면 햇빛 효과가 사라지며 추가 마법 피해를 줍니다.", // 햇빛 — CD 요약본, 직접 다듬을 것
        "Q": "레오나가 다음 기본 공격 시 {v1}초 동안 적을 <status>기절</status>시키고 <magicdamage>{v2}</magicdamage>의 마법 피해를 추가로 입힙니다.", // 여명의 방패
        "W": "레오나가 방패를 들어 받는 피해량을 {v1} 감소시키고, {v2}초 동안 <scalearmor>{v3}의 방어력</scalearmor>과 <scalemr>{v4}의 마법 저항력</scalemr>을 얻습니다. 잠시 후, 방패가 폭발하며 주변 적들에게 <magicdamage>{v5}의 마법 피해</magicdamage>를 입힙니다. 적이 한 명이라도 공격에 적중당한 경우, <scalearmor>방어력</scalearmor>과 <scalemr>마법 저항력</scalemr>의 증가 효과가 {v2}초 더 유지됩니다.<br>", // 일식
        "E": "레오나가 빛의 검을 날려 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 마지막으로 맞은 챔피언은 {v2}초 동안 <status>속박</status>되며 레오나가 그쪽으로 돌격합니다.", // 천공의 검
        "R": "태양 에너지를 소환하여 눈부신 광선으로 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 {v3}%만큼 <status>둔화</status>시킵니다. 폭발의 중앙에 있는 적들은 <status>둔화</status>되지 않고 <status>기절</status>합니다.", // 흑점 폭발
    },
    "Jade_Leona": { // 레오나
        "P": "공격 스킬에 맞은 적에게 3.5초 동안 햇빛을 적용합니다. 아군 챔피언이 대상에게 피해를 입히면 햇빛을 소모해 추가 마법 피해를 입힙니다.", // 햇빛 — CD 요약본, 직접 다듬을 것
        "Q": "다음 기본 공격 시 <magicdamage>{v1}의 마법 피해</magicdamage>를 추가로 입히고 적을 1.25초 동안 <status>기절</status>시킵니다.", // 여명의 방패
        "W": "3초 동안 {v1}의 추가 <scalearmor>방어력</scalearmor>과 <scalemr>마법 저항력</scalemr>을 얻습니다. 지속시간이 종료될 때 근처의 적에게 폭발을 맞히면 <magicdamage>{v2}의 마법 피해</magicdamage>를 입히고, 추가 <scalearmor>방어력</scalearmor>과 <scalemr>마법 저항력</scalemr>이 3초간 추가로 지속됩니다.", // 일식
        "E": "일직선상의 모든 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 마지막으로 맞은 적 챔피언은 잠시 <status>속박</status> 상태가 되고, 레오나가 그쪽으로 돌격합니다.", // 천공의 검
        "R": "태양 에너지를 소환하여, 눈부신 광선으로 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 {v3}%의 <status>둔화</status>를 적용합니다. 폭발의 중앙에 있는 적은 <status>기절</status>합니다.", // 흑점 폭발
    },
    "RekSai": { // 렉사이
        "P": "렉사이의 기본 공격과 기본 스킬이 적중할 때마다 분노가 생성됩니다. 생성된 분노는 매복 상태일 때 체력 회복에 사용됩니다.", // 제르사이의 분노 — CD 요약본, 직접 다듬을 것
        "Q": "<keywordmajor>돌출 상태:</keywordmajor> 렉사이가 {v1}초 안에 가하는 3회의 기본 공격이 <attackspeed>{v2}%의 공격 속도</attackspeed>를 얻고 주변 적들에게 <physicaldamage>{v3}의 물리 피해</physicaldamage>를 추가로 입힙니다. 기본 공격이 이 스킬의 지속시간을 초기화합니다.", // 여왕의 진노 / 먹잇감 추적
        "W": "<keywordmajor>돌출 상태:</keywordmajor> 렉사이가 땅속으로 매복해 새로운 스킬을 사용할 수 있게 되지만, 기본 공격은 할 수 없는 상태가 됩니다. 이 상태에서 렉사이는 <speed>{v1}의 이동 속도</speed>를 얻고 시야 범위가 {v2}% 축소됩니다. 그러나 보이지 않지만 이동하고 있는 근처 적들의 위치를 파악해 자신 및 아군에게 표시합니다.", // 매복 / 돌출
        "E": "<keywordmajor>돌출 상태:</keywordmajor> 렉사이가 대상을 물어뜯어 <physicaldamage>@spell.RekSaiE:BaseDamageCalculation@의 물리 피해</physicaldamage>를 입힙니다. <keywordmajor>분노</keywordmajor>가 최대치일 경우 대신 <truedamage>@spell.RekSaiE:EmpoweredDamageCalculation@의 고정 피해</truedamage>를 입힙니다.", // 성난 이빨 / 땅굴 파기
        "R": "렉사이가 {v1}초 내에 피해를 입힌 적을 표적으로 삼은 후, 땅속으로 들어가 대상으로 지정할 수 없는 상태가 됩니다. 잠시 후, 대상에게 도약해 <physicaldamage>{v2}+최대 체력의 {v3}%에 해당하는 물리 피해</physicaldamage>를 입히고 <keywordmajor>매복 / 돌출</keywordmajor>의 재사용 대기시간이 초기화됩니다. 도약 중인 렉사이는 멈출 수 없습니다.", // 공허의 돌진
    },
    "Rell": { // 렐
        "P": "렐의 기본 공격과 스킬이 적중 시 추가 마법 피해를 입히고 방어력과 마법 저항력을 훔칩니다.", // 갑옷 파쇄 — CD 요약본, 직접 다듬을 것
        "Q": "렐이 전방으로 창을 찔러 대상을 {v1}초 동안 <status>기절</status>시키고 모든 <shield>보호막</shield>을 파괴하며 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.", // 파열의 일격
        "W": "<passive>기본 지속 효과 - 탑승 민첩성:</passive> 렐이 탑승 상태에서 <speed>이동 속도가 @spell.RellW_Dismount:MountedMoveSpeed@</speed> 증가합니다.<br><br><active>사용 시 - 철마술: 붕괴:</active> 렐이 탈것에서 뛰어내리며 적들을 <status>공중으로 띄워 올리고</status> <magicdamage>@spell.RellW_Dismount:DismountDamage@의 마법 피해</magicdamage>를 입힙니다. 렐이 <shield>@spell.RellW_Dismount:Shield@의 피해를 흡수하는 보호막</shield>을 얻습니다. 보호막은 다시 탑승할 때까지 지속됩니다.<br><br>그런 다음 중갑 상태로 변하며 <scalearmor>@spell.RellW_Dismount:ResistanceIncrease*100@% 증가한 방어력</scalearmor>과 <scalemr>마법 저항력</scalemr>, <attackspeed>@spell.RellW_Dismount:DismountedASBoost*100@%의 공격 속도</attackspeed>, @spell.RellW_Dismount:DismountedRangeBoost@의 공격 사거리를 얻습니다. 중갑 상태에서는 <spellname>철마술: 탑승</spellname> 스킬을 사용할 수 있습니다.", // 철마술: 붕괴
        "E": "렐과 아군 하나가 돌진하며 {v1}초 동안 <speed>이동 속도가 {v2}%</speed> 증가합니다. 적 챔피언이나 서로를 향해 마주하고 있으면 <speed>{v3}%</speed>까지 증가합니다. 렐의 다음 공격 또는 <spellname>파열의 일격</spellname> 스킬이 일정 지역에서 폭발해 <magicdamage>최대 체력의 {v4}에 해당하는 마법 피해</magicdamage>를 입힙니다.", // 전속력
        "R": "렐이 자기 폭발을 일으켜 근처 적들을 렐 쪽으로 <status>끌어당깁니다</status>. 그런 다음 {v1}초 동안 근처 적들을 계속 <status>잡아당기며</status> <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.", // 자기 폭풍
    },
    "Rengar": { // 렝가
        "P": "수풀에서 기본 공격을 사용하면 대상에게 도약합니다.<br><br>스킬을 사용하면 야성 중첩을 얻습니다. 야성이 최대로 중첩되면 다음 스킬 공격이 강화됩니다.<br><br>적 챔피언을 처치하면 <font color='#BBFFFF'>뼈이빨 목걸이</font>에 걸 전리품이 늘어나며 추가 공격력을 얻습니다.", // 보이지 않는 포식자 — CD 요약본, 직접 다듬을 것
        "Q": "다음 2회 기본 공격 시 렝가의 <attackspeed>공격 속도가 {v1}%</attackspeed> 증가합니다. 첫 번째 공격은 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입힙니다.<br><br><keywordmajor>최대 야성:</keywordmajor> 첫 번째 공격이 <physicaldamage>{v3}의 물리 피해</physicaldamage>를 입히고 {v4}초 동안 렝가의 <attackspeed>공격 속도가 {v5}</attackspeed> 증가합니다.", // 포악함
        "W": "렝가가 포효하여 근처 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 지난 {v2}초 동안 입은 피해의 <healing>{v3}%</healing>를 회복합니다.<br><br><keywordmajor>최대 야성:</keywordmajor> <magicdamage>{v4}의 마법 피해</magicdamage>를 입히고 추가로 군중 제어 효과를 해제합니다.", // 전투의 포효
        "E": "렝가가 올가미를 던져 처음으로 맞힌 적의 위치를 드러낸 다음 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 {v2}초 동안 {v3}% <status>둔화</status>시킵니다.<br><br><keywordmajor>최대 야성:</keywordmajor> <physicaldamage>{v4}의 물리 피해</physicaldamage>를 입히고 {v2}초 동안 <status>속박</status>합니다.", // 올가미 투척
        "R": "<passive>기본 지속 효과:</passive> 렝가가 <keywordstealth>위장</keywordstealth> 상태일 때 도약 공격을 합니다.<br><br><active>사용 시:</active> {v1}초 동안 렝가의 <speed>이동 속도가 {v2}%</speed> 증가하며 가장 가까운 적 챔피언 주변에 <keywordstealth>절대 시야</keywordstealth>를 얻습니다.<br><br>{v3}초가 지나면 렝가는 <keywordstealth>위장</keywordstealth> 상태가 되어 수풀에 있지 않아도 도약할 수 있습니다. 가장 가까이 있는 적에게 도약 시 <physicaldamage>{v4}의 물리 피해</physicaldamage>를 추가로 입히며 {v5}초 동안 대상의 <scalearmor>방어력을 {v6}</scalearmor>만큼 감소시키고 이 스킬을 종료합니다.", // 사냥의 전율
    },
    "Locke": { // 로크
        "P": "기본 공격 적중 시 추가 마법 피해를 입힙니다. 피해량은 적이 잃은 체력에 비례해 증가합니다.", // 은빛 말뚝 — CD 요약본, 직접 다듬을 것
        "Q": "로크가 <keywordmajor>영혼의 대못</keywordmajor>을 여러 개 준비하고 던져 적중한 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 표식을 남깁니다. 대못에 맞은 적은 {v2}/{v3}/{v4}초 동안 {v5}/{v6}/{v7}% <status>둔화</status>됩니다. 이 효과는 적중한 대못 수에 따라 중첩됩니다.<br><br>해당 적을 기본 공격하면 <keywordmajor>영혼의 대못</keywordmajor>을 소모해 중첩당 <magicdamage>{v8}의 마법 피해</magicdamage>를 입힙니다. 피해량은 대못 2개일 때 {v9}%, 3개일 때 {v10}% 증가합니다.", // 의식용 대못
        "W": "로크가 자신의 영혼을 불태워 <attackspeed>공격 속도가 {v1}</attackspeed>, <speed>이동 속도가 {v2}</speed> 증가했다가 {v3}초에 걸쳐 원래대로 돌아옵니다.<br><br>{v4}초 동안 매초 <truedamage>현재 체력의 {v5}%에 해당하는 고정 피해</truedamage>를 입지만, 마지막으로 입은 피해량 <healing>{v6}</healing>만큼 <healing>체력을 회복</healing>하고, 잃은 체력 및 경과 시간에 비례해 <healing>{v7}의 체력</healing>을 추가로 회복합니다. 최대 <healing>남은 체력의 {v8}만큼 회복</healing>합니다.<br><br><recast>재사용</recast>하여 더 빨리 종료할 수 있습니다.", // 영혼 점화
        "E": "로크가 지정한 위치로 순간이동하며 주변 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. <br><br>다음 기본 공격 시 대상에게 돌진하며 경로에 있는 모든 적에게 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다. 적중할 때마다 <keywordmajor>영혼의 대못</keywordmajor>을 소모합니다.<br><br>로크가 처치에 관여하면, 이 스킬의 재사용 대기시간이 초기화됩니다.", // 잿빛 추격
        "R": "로크가 적을 구속하는 유물을 지정한 위치로 던져 범위 내 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}% <status>둔화</status>시킵니다. 둔화 효과는 {v3}초에 걸쳐 사라집니다. 유물에 적중한 적에게 {v4}초 동안 표식이 남습니다. 표식이 남은 적 챔피언의 체력이 {v5}% 아래로 떨어지면 봉인되고 영향을 받은 다른 챔피언에게 남은 표식의 지속시간이 초기화됩니다.<br><br>지속시간이 끝난 후 챔피언이 1명 이상 봉인되었다면 유물이 땅에 떨어집니다. 로크가 유물을 획득하면 봉인된 챔피언 수에 비례해 처형 체력 기준치가 영구적으로 {v6}% 증가하고 현재 재사용 대기시간의 {v7}%를 돌려받습니다.<br>", // 연옥
    },
    "Lucian": { // 루시안
        "P": "루시안이 스킬을 사용할 때마다 다음 공격이 2연속으로 발사됩니다. 아군이 루시안에게 회복 또는 보호막 효과를 부여하거나, 근처 적 챔피언이 이동 불가 상태가 되면 루시안의 다음 기본 공격 2회가 추가 마법 피해를 입힙니다.", // 빛의 사수 — CD 요약본, 직접 다듬을 것
        "Q": "루시안이 대상을 관통하는 빛 줄기를 발사해 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다.<br>", // 꿰뚫는 빛
        "W": "루시안이 사거리 끝에 도달하거나 적을 맞히면 폭발하는 탄환을 발사합니다. 폭발에 맞은 적은 <magicdamage>{v1}의 마법 피해</magicdamage>를 입고 잠시 위치가 드러나며, 6초 동안 표식이 남습니다.<br><br>루시안이나 아군이 표식이 남은 적을 공격하면 1초 동안 루시안의 <speed>이동 속도가 {v2}</speed> 상승합니다. 아군이 이 효과를 발동시키면 루시안이 <attention>경계</attention> 효과도 얻습니다.", // 타는 불길
        "E": "루시안이 돌진합니다.<br><br><spellname>빛의 사수</spellname>로 적을 맞힐 때마다 재사용 대기시간이 {v1}초씩 감소합니다. (챔피언인 경우 {v2}초 감소)", // 끈질긴 추격
        "R": "루시안이 {v1}초 동안 한 방향으로 총을 <keywordmajor>{v2}</keywordmajor>회 난사해 처음 적중한 적에게 각각 <physicaldamage>{v3}의 물리 피해</physicaldamage>를 입힙니다. 스킬을 <recast>재사용</recast>하면 난사를 중단합니다.<br><br>총을 난사하는 도중에 <spellname>끈질긴 추격</spellname>을 사용할 수 있습니다.<br><br>총 피해량: <physicaldamage>{v4}의 물리 피해</physicaldamage><br>", // 빛의 심판
    },
    "Lulu": { // 룰루
        "P": "픽스는 현재 따라다니는 챔피언이 적 유닛을 공격할 때마다 함께 마법 광선을 발사합니다. 이 마법 광선은 목표를 추적하지만, 다른 유닛이 막아서 대신 맞을 수 있습니다.", // 요정 친구 픽스 — CD 요약본, 직접 다듬을 것
        "Q": "룰루와 픽스가 각자 예리한 마법 화살을 발사하여 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 적중당한 적은 {v2}% <status>둔화</status>되었다가 {v3}초에 걸쳐 원래대로 돌아옵니다.<br><br>적이 추가 마법 화살로 <magicdamage>{v4}의 마법 피해</magicdamage>를 입습니다.", // 반짝반짝 창
        "W": "아군에게 사용하면 {v1}초 동안 <speed>이동 속도가 {v2}</speed>, <attackspeed>공격 속도가 {v3}%</attackspeed> 증가합니다.<br><br>적에게 사용하면 룰루가 {v4}초 동안 적을 <status>변이</status>시킵니다.", // 변덕쟁이
        "E": "아군에게 사용 시 픽스가 아군에게 날아가 {v1}초 동안 <spellname>요정 친구 픽스</spellname> 스킬을 부여합니다. 해당 아군이 챔피언이면 {v2}초 동안 <shield>{v3}의 피해를 흡수하는 보호막</shield>을 추가로 부여합니다.<br><br>적 챔피언에게 사용 시 픽스가 적을 방해하여 <magicdamage>{v4}의 마법 피해</magicdamage>를 입히며 {v5}초 동안 해당 적에 대한 <keywordstealth>절대 시야</keywordstealth>가 생깁니다.", // 도와줘, 픽스!
        "R": "룰루가 아군의 몸집을 키우며 주변 적을 {v1}초 동안 <status>공중으로 띄워 올립니다</status>. 몸집이 커진 아군은 {v2}초 동안 <healing>최대 체력이 {v3}</healing> 증가하며 주변 적을 {v4}% <status>둔화</status>시킵니다.", // 급성장
    },
    "Jade_Lulu": { // 룰루
        "P": "픽스는 현재 따라다니고 있는 챔피언이 적 유닛에게 기본 공격을 가할 때마다 함께 마법 광선을 발사합니다. 이 광선은 대상을 추적하지만 다른 유닛에 막힐 수 있습니다.", // 요정 친구 픽스 — CD 요약본, 직접 다듬을 것
        "Q": "룰루와 픽스가 각자 관통하는 광선을 발사하여 적중한 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초에 걸쳐 점차 감소하는 {v3}%의 <status>둔화</status>를 적용합니다.<br><br>각 광선은 한 명의 적에게만 피해를 입힙니다.", // 반짝반짝 창
        "W": "<maintext>아군에게 사용: 대상 아군이 {v1}초 동안 <speed>{v2}%의 이동 속도</speed>와 <magicdamage>{v3}의 주문력</magicdamage>을 얻습니다.<br><br>적에게 사용: {v4}초 동안 적 챔피언을 <status>변이</status>시켜, 기본 공격이나 스킬을 사용할 수 없게 하고 60만큼 <status>둔화</status>시킵니다.", // 변덕쟁이
        "E": "<maintext>아군에게 사용: 픽스가 아군에게 날아가, 6초 동안 룰루 대신 대상을 따라다니며 기본 공격을 보조합니다. 픽스는 도착 시 6초 동안 <shield>{v1}의 피해를 흡수하는 보호막</shield>을 부여합니다.<br><br>적에게 사용: 픽스가 지정한 적 유닛에게 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다. 이후 6초 동안 대상을 따라다니며 위치를 드러냅니다.", // 도와줘, 픽스!
        "R": "<maintext>룰루가 아군의 몸집을 키워, 대상 근처의 적들을 <status>공중에 띄웁니다</status>. 해당 아군은 {v1}초 동안 <scalehealth>{v2}의 추가 체력</scalehealth>을 얻고, 근처의 적들은 1초간 {v3}% <status>둔화</status>됩니다.", // 급성장
    },
    "Leblanc": { // 르블랑
        "P": "르블랑의 체력이 40% 아래로 내려가면 1초 동안 투명 상태가 되며 거울 환영을 생성합니다. 환영은 피해를 입힐 수 없고 최대 8초까지 지속됩니다.", // 거울 환영 — CD 요약본, 직접 다듬을 것
        "Q": "르블랑이 적에게 인장을 날려 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 표식을 남깁니다.<br><br>표식이 남은 적을 스킬로 공격하면 인장이 폭발하며 <magicdamage>{v3}의 마법 피해</magicdamage>를 입힙니다.<br><br>인장이 명중하거나 폭발해 대상을 처치하면 소모한 마나의 {v4}%를 돌려받고 이 스킬의 남은 재사용 대기시간이 {v5}% 감소합니다.<br><br><rules>인장은 미니언에게 명중 시 {v6}의 추가 피해를 입힙니다. </rules>", // 악의의 인장
        "W": "르블랑이 돌진한 후 주변 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 돌진 후 {v2}초 동안 <recast>재사용</recast>할 수 있습니다.<br><br><recast>재사용 시:</recast> 르블랑이 처음 위치로 돌아갑니다.", // 왜곡
        "E": "르블랑이 처음 적중한 적을 옭아매는 사슬을 던져 <magicdamage>{v1}의 마법 피해</magicdamage>를 주고 <keywordstealth>절대 시야</keywordstealth>를 얻습니다.<br><br>대상이 {v2}초간 사슬에 묶여 있으면 대상을 {v3}초 동안 <status>속박</status>하고 추가로 <magicdamage>{v4}의 마법 피해</magicdamage>를 줍니다.", // 환영 사슬
        "R": "르블랑이 가장 최근에 사용한 스킬을 모방하여 다시 사용합니다. 모방한 스킬의 피해량이 증가합니다.<br><br><spellname>모방한 악의의 인장</spellname>을 남기면 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고, 발동하면 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.<br><spellname>모방한 왜곡</spellname>은 <magicdamage>{v3}의 마법 피해</magicdamage>를 입힙니다.<br><spellname>모방한 환영 사슬</spellname>은 옭아맬 때 <magicdamage>{v4}의 마법 피해</magicdamage>를 입히고, <status>속박</status>할 때 <magicdamage>{v5}의 마법 피해</magicdamage>를 입힙니다.", // 모방
    },
    "LeeSin": { // 리 신
        "P": "리 신이 스킬을 사용하면 다음 두 번의 기본 공격 속도가 증가하며 기력을 회복합니다.", // 질풍격 — CD 요약본, 직접 다듬을 것
        "Q": "리 신이 불협화음으로 된 음파를 발사하여 처음 적중한 적에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 해당 적에 대한 <keywordstealth>절대 시야</keywordstealth>를 얻습니다. 다음 {v2}초 안에 스킬을 <recast>재사용</recast>할 수 있습니다.<br><br><recast>재사용 시:</recast> 리 신이 음파에 맞은 적에게 돌진하여 대상이 잃은 체력에 비례해 <physicaldamage>{v3}~{v4}의 물리 피해</physicaldamage>를 입힙니다.", // 음파 / 공명의 일격
        "W": "리 신이 아군이나 와드를 향해 돌진합니다. 대상이 챔피언일 경우 해당 아군과 자신에게 {v1}초 동안 <shield>{v2}의 피해를 흡수하는 보호막</shield>을 씌웁니다. {v3}초 안에 <recast>재사용</recast>할 수 있습니다.<br><br><recast>재사용 시:</recast> {v4}초 동안 모든 피해 흡혈이 {v5}% 증가합니다.", // 방호 / 강철의 의지
        "E": "리 신이 바닥을 내리쳐 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 은신한 적을 드러내는 충격파를 발생시킵니다. 스킬이 적에게 명중하면 다음 {v3}초 안에 스킬을 <recast>재사용</recast>할 수 있습니다.<br><br><recast>재사용 시:</recast> 충격파에 적중한 주변 적을 {v4}% <status>둔화</status>시킵니다. 둔화 효과는 {v2}초에 걸쳐 사라집니다.", // 폭풍/무력화
        "R": "리 신이 강력한 돌려차기로 적 챔피언을 <status>뒤로 날려버리고</status>, <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다.<br><br>날아간 대상과 부딪힌 적은 잠시 <status>공중에 떠오르고</status> <physicaldamage>{v1}+날아간 대상 추가 체력의 {v2}%에 해당하는 물리 피해</physicaldamage>를 입습니다.", // 용의 분노
    },
    "Jade_LeeSin": { // 리 신
        "P": "리 신은 스킬을 사용하면 다음 2회의 기본 공격 시 40%의 공격 속도를 얻고, 15의 기력을 돌려받습니다.", // 질풍격 — CD 요약본, 직접 다듬을 것
        "Q": "<spellname>음파: </spellname>리 신이 불협화음으로 된 음파를 발사하여 적의 위치를 드러내고, 처음 적중한 적에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다. <spellname>음파</spellname>를 맞혔다면 다음 3초 내로 <spellname>공명의 일격</spellname>을 사용할 수 있습니다.<br><br><spellname>공명의 일격: </spellname>리 신이 음파에 맞은 적에게 돌진하여, <physicaldamage>{v2}의 물리 피해</physicaldamage>+대상이 잃은 체력의 8%에 해당하는 추가 피해를 입힙니다.", // 음파 / 공명의 일격
        "W": "<spellname>방호: </spellname>리 신이 지정한 아군에게 돌진하여, 대상과 자신에게 다음 5초 동안 {v1}의 피해를 흡수하는 <shield>보호막</shield>을 부여합니다. <spellname>방호</spellname>를 사용하면 다음 3초 내로 <spellname>강철의 의지</spellname>를 사용할 수 있습니다.<br><br><spellname>강철의 의지: </spellname>리 신의 고된 수행이 전투에서 진가를 발휘합니다. 5초 동안 리 신이 {v2}%의 생명력 흡수와 주문 흡혈, <scalearmor>{v3}의 방어력</scalearmor>을 얻습니다.", // 방호 / 강철의 의지
        "E": "<spellname>폭풍: </spellname>리 신이 지면을 내리쳐, 적중한 적 유닛에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 4초 동안 위치를 드러내는 충격파를 발생시킵니다. 적에게 <spellname>폭풍</spellname>을 맞혔다면 다음 3초 내로 <spellname>무력화</spellname>를 사용할 수 있습니다.<br><br><spellname>무력화: </spellname>리 신이 <spellname>폭풍</spellname>으로 위치가 드러낸 주변 적을 무력화하여, 4초 동안 <speed>이동 속도</speed>와 <attackspeed>공격 속도</attackspeed>를 {v2}% <status>둔화</status>시킵니다. 감소한 <speed>이동 속도</speed>와 <attackspeed>공격 속도</attackspeed>는 시간이 지남에 따라 점차 원래대로 돌아옵니다.", // 폭풍 / 무력화
        "R": "리 신이 강력한 돌려차기로 대상을 <status>뒤로 날려 보내</status>, 대상 및 대상과 충돌하는 모든 적에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다. 대상과 충돌하는 적은 잠시 <status>공중에 뜹니다</status>.", // 용의 분노
    },
    "Riven": { // 리븐
        "P": "리븐이 스킬을 사용하면 검이 충전됩니다. 기본 공격을 가하면 충전 횟수를 소모해 추가 피해를 입힙니다.", // 룬 검 — CD 요약본, 직접 다듬을 것
        "Q": "리븐이 전방으로 짧게 돌진하여 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다. 이 스킬은 2회 <recast>재사용</recast>할 수 있습니다. 최초 <recast>재사용</recast> 시 기존과 똑같은 효과가 적용되지만, 두 번째에는 다른 효과가 적용됩니다.<br><br><recast>재사용 시</recast>: 리븐이 공중으로 뛰어 오른 후 땅을 내려찍으며 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 주고 주위 적들을 0.75초 동안 <status>공중으로 띄워 올립니다</status>.", // 부러진 날개
        "W": "리븐의 검에서 룬 에너지가 방출되어 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 {v2}초간 적을 <status>기절</status>시킵니다.", // 기 폭발
        "E": "리븐이 재빨리 돌진한 후 1.5초 동안 지속되는 <shield>{v1}의 보호막</shield>을 얻습니다.", // 용맹
        "R": "리븐의 검이 정신력으로 충만하여 {v1}초 동안 <physicaldamage>공격력이 {v2}</physicaldamage> 상승하고 공격 스킬과 기본 공격의 사거리가 증가합니다. 활성화된 동안 <recast>재사용</recast>할 수 있습니다.<br><br><recast>재사용 시:</recast> 바람 가르기를 사용해 대상이 잃은 체력에 비례하여 <physicaldamage>{v3}</physicaldamage>~<physicaldamage>{v4}의 물리 피해</physicaldamage>를 입힙니다.", // 추방자의 검
    },
    "Lissandra": { // 리산드라
        "P": "리산드라 주변의 적 챔피언이 쓰러지면 얼음 노예가 됩니다. 얼음 노예는 주변의 적을 모두 둔화시키고 잠시 후 극도로 차가운 냉기에 의해 폭발하며 마법 피해를 입힙니다.", // 냉기의 지배 — CD 요약본, 직접 다듬을 것
        "Q": "리산드라가 처음으로 적에게 적중하면 부서지는 얼음창을 던져 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 {v3}% <status>둔화</status>시킵니다. 대상 뒤의 적들에게도 피해를 입히고 둔화시킵니다.", // 얼음 파편
        "W": "리산드라가 얼음 지대를 생성해 {v1}초 동안 근처 적들을 <status>속박</status>하고 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.", // 서릿발
        "E": "리산드라가 전방으로 얼음갈퀴를 던져 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. <recast>재사용</recast>하면 얼음갈퀴의 현재 위치로 순간이동합니다.", // 얼음갈퀴 길
        "R": "리산드라가 자신 또는 적 챔피언을 얼음으로 감쌉니다. 적에게 사용하면 {v1}초 동안 <status>기절</status>시키고, 자신에게 사용하면 {v2}초 동안 경직되며 <healing>체력을 {v3}</healing> 회복합니다. 회복량은 잃은 체력 {v4}%당 {v5}%씩 증가합니다.<br><br>그 다음 검은 얼음이 대상에게서 번져나가 <magicdamage>{v6}의 마법 피해</magicdamage>를 입힙니다. 얼음은 {v7}초 동안 유지되며 적들을 {v8}% <status>둔화</status>시킵니다.", // 얼음 무덤
    },
    "Lillia": { // 릴리아
        "P": "챔피언 또는 몬스터에게 스킬이 적중하면 지속시간 동안 최대 체력에 비례한 피해를 추가로 입힙니다.", // 꿈나무 지팡이 — CD 요약본, 직접 다듬을 것
        "Q": "<passive>기본 지속 효과:</passive> 릴리아의 스킬이 적중하면 {v1}초 동안 <speed>이동 속도가 {v2}</speed> 증가합니다. 이 효과는 최대 {v3}회 중첩됩니다.<br><br><active>사용 시:</active> 릴리아가 지팡이를 휘둘러 <magicdamage>{v4}의 마법 피해</magicdamage>를 입힙니다. 가장자리에 있는 적에게 <truedamage>{v5}의 고정 피해</truedamage>를 추가로 입힙니다.", // 뾰로롱 강타
        "W": "릴리아가 힘을 모은 후 강력한 일격을 가해 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 중심에 있는 적은 <magicdamage>{v2}의 피해</magicdamage>를 입습니다.", // 이익! 쿵!
        "E": "릴리아가 데굴데굴 씨앗을 날려 적중한 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 적의 모습을 드러내며 {v2}초 동안 {v3}% <status>둔화</status>시킵니다. 씨앗은 적 또는 지형에 부딪힐 때까지 굴러갑니다.", // 데굴데굴 씨앗
        "R": "릴리아가 <keywordmajor>꿈가루</keywordmajor>가 묻은 적 챔피언을 {v1}초 동안 전부 <status>졸음</status> 상태에 빠뜨립니다. 이후 해당 적은 {v2}초 동안 <status>수면</status> 상태에 빠집니다.<br><br>피해를 입어 깨어나면 <magicdamage>{v3}의 마법 피해</magicdamage>를 추가로 입습니다.", // 감미로운 자장가
    },
    "MasterYi": { // 마스터 이
        "P": "마스터 이는 몇 차례 연속으로 기본 공격을 한 이후에 2번 연속 공격합니다.", // 2연속 공격 — CD 요약본, 직접 다듬을 것
        "Q": "마스터 이가 대상으로 지정할 수 없는 상태가 되어 순간이동한 후 대상 주변 적들을 순식간에 공격합니다. 공격이 {v1}회 적중한 후 적중하는 모든 공격은 적에게 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입힙니다. <br><br>이 스킬은 다른 대상이 없으면 같은 적을 연속으로 공격하며 추가 타격으로 {v3}%(<physicaldamage>{v4}</physicaldamage>)의 피해를 입힙니다. 단일 대상은 최대 <physicaldamage>{v5}의 물리 피해</physicaldamage>를 입습니다.", // 일격 필살
        "W": "마스터 이가 정신을 집중해 {v1}초 동안 <healing>{v2}의 체력</healing>을 회복합니다. 회복량은 마스터 이가 잃은 체력에 비례해 최대 {v3}%까지 증가합니다.<br><br>정신을 집중하고 이후 {v4}초까지 마스터 이가 입는 피해량이 {v5} 감소합니다. {v6}초가 지나면 {v7}%까지 감소합니다.", // 명상
        "E": "마스터 이의 기본 공격이 {v1}초 동안 <truedamage>{v2}의 고정 피해</truedamage>를 추가로 입힙니다.", // 우주류 검술
        "R": "<passive>기본 지속 효과:</passive> 챔피언 처치 관여 시 기본 스킬의 남은 재사용 대기시간이 {v1}% 감소합니다.<br><br><active>사용 시:</active> 마스터 이가 무아지경에 빠져 {v2}초 동안 <speed>이동 속도 {v3}%</speed>, <attackspeed>공격 속도 {v4}%</attackspeed>를 얻고 <status>둔화</status> 효과에 면역됩니다. 챔피언 처치 관여 시 스킬 지속시간이 {v5}초 늘어납니다.", // 최후의 전사
    },
    "Jade_MasterYi": { // 마스터 이
        "P": "마스터 이가 때때로 2번 연속 공격을 가합니다.", // 2연속 공격 — CD 요약본, 직접 다듬을 것
        "Q": "마스터 이가 전장을 가로지르며 최대 4명의 적을 공격해 각각 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 대상이 미니언과 몬스터인 경우 {v2}%의 확률로 <magicdamage>{v3}의 추가 마법 피해</magicdamage>를 입힙니다.", // 일격 필살
        "W": "마스터 이가 정신을 집중하며 5초에 걸쳐 <healing>{v1}의 체력</healing>을 회복합니다. 정신을 집중하는 동안 <scalearmor>{v2}의 방어력</scalearmor>과 <scalemr>마법 저항력</scalemr>을 얻습니다.", // 명상
        "E": "<passive>기본 지속 효과:</passive> 마스터 이가 <physicaldamage>{v1}의 공격력</physicaldamage>을 얻습니다.<br><br><active>사용 시:</active> 마스터 이가 {v2}초 동안 <physicaldamage>{v3}의 공격력</physicaldamage>을 얻지만, 이후 재사용 대기시간이 종료될 때까지 기본 지속 효과를 잃습니다.", // 우주류 검술
        "R": "마스터 이의 <speed>이동 속도</speed>가 {v1}%, <attackspeed>공격 속도</attackspeed>가 {v2}% 증가하고 {v3}초 동안 모든 둔화 효과에 면역이 됩니다.<br><br>활성화된 동안 챔피언을 처치하면 모든 스킬의 재사용 대기시간이 초기화됩니다. (어시스트 기록 시 기본 재사용 대기시간의 절반 감소)", // 최후의 전사
    },
    "Maokai": { // 마오카이
        "P": "마오카이는 기본 지속 효과로 기본 공격 시 체력을 회복하고 추가 피해를 입힙니다. 적 스킬에 맞거나 직접 스킬을 사용하면 기본 지속 효과의 재사용 대기시간이 감소합니다.", // 마법 흡수 — CD 요약본, 직접 다듬을 것
        "Q": "마오카이가 지면을 주먹으로 내리쳐 <magicdamage>{v1}+최대 체력의 {v2}%에 해당하는 마법 피해</magicdamage>를 입히고 적들을 잠시 <status>둔화</status>시킵니다. 주변 적들은 <status>뒤로 밀려납니다</status>.", // 덤불 주먹
        "W": "마오카이가 움직이는 뿌리 덩어리로 변신해 대상에게 돌진합니다. 이때 마오카이는 대상으로 지정할 수 없습니다. 적에게 부딪히면 {v1}초간 대상을 <status>속박</status>하고 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.", // 뒤틀린 전진
        "E": "마오카이가 {v1}초 동안 주변을 감시하는 묘목을 던집니다. 묘목은 근처 적을 추격해 접근 시 폭발하며 <magicdamage>{v2}의 마법 피해</magicdamage>를 입히고 주변 적들을 {v3}초간 {v4}% <status>둔화</status>시킵니다. 묘목이 적 챔피언이나 에픽 몬스터를 맞히면 <keywordmajor>마법 흡수</keywordmajor>의 재사용 대기시간이 추가로 4초 감소합니다.<br><br>수풀에 설치된 묘목은 {v5}초간 유지되며 더 큰 폭발을 일으켜 <magicdamage>{v6}의 마법 피해</magicdamage>를 {v7}초에 걸쳐 입히고 적들을 {v8} <status>둔화</status>시킵니다.", // 묘목 던지기
        "R": "마오카이가 나뭇가지와 가시로 된 거대한 벽을 소환합니다. 벽은 이동한 거리에 비례해 {v1}~{v2}초간 적들을 <status>속박</status>하고 <magicdamage>{v3}의 마법 피해</magicdamage>를 입힙니다. 벽이 적 챔피언에게 부딪히면 마오카이의 <speed>이동 속도가 {v4}%</speed> 증가했다 {v5}초에 걸쳐 원래대로 돌아옵니다.", // 대자연의 마수
    },
    "Malzahar": { // 말자하
        "P": "일정 시간 동안 군중 제어기에 적중당하거나 피해를 입지 않으면 받는 피해량이 큰 폭으로 감소하고 군중 제어기에 면역이 됩니다. 이 효과는 피해를 입거나 군중 제어기에 적중당하면 잠시 후 사라집니다.", // 공허 태세 — CD 요약본, 직접 다듬을 것
        "Q": "말자하가 공허로 이어지는 두 개의 문을 엽니다. 두 개의 문 사이로 공허의 파동이 발사되어 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 <status>침묵</status>시킵니다.", // 공허의 부름
        "W": "<passive>기본 지속 효과:</passive> 말자하가 다른 스킬을 사용하면 중첩을 1회 얻습니다. (최대 {v1})<br><br><active>사용 시:</active> 말자하가 공허충을 한 마리 소환하며, 중첩당 소환되는 공허충의 수가 늘어납니다. 공허충은 {v2}초 동안 유지되며 공격할 때마다 <magicdamage>{v3}의 마법 피해</magicdamage>를 추가로 입힙니다.", // 공허의 무리
        "E": "말자하가 끔찍한 환각을 통해 {v1}초 동안 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다. 이 동안 대상에게 <spellname>공허의 부름</spellname>이나 <spellname>황천의 손아귀</spellname>를 사용하면 환상의 지속시간이 초기화됩니다.<br><br>대상이 죽으면 말자하는 <scalemana>{v3}의 마나</scalemana>를 얻고 환상은 가장 가까이 있는 적에게 옮겨갑니다.<br><br><rules>재앙의 환상은 체력이 {v4} 밑으로 떨어진 미니언을 처형합니다.</rules>", // 재앙의 환상
        "R": "말자하가 적 챔피언을 <status>제압</status>해 {v1}초 동안 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다. 대상 주변에는 {v3}초 동안 유지되며 <magicdamage>최대 체력의 {v4}에 해당하는 마법 피해</magicdamage>를 입히는 황천의 지대가 생성됩니다.", // 황천의 손아귀
    },
    "Jade_Malzahar": { // 말자하
        "P": "말자하가 스킬을 몇 차례 사용할 때마다 조종할 수 없는 공허충을 소환해 적을 공격하게 합니다. 공허충은 시간이 지남에 따라 성장하여 방어력, 피해량, 공격 속도가 증가합니다.", // 공허충 소환 — CD 요약본, 직접 다듬을 것
        "Q": "말자하가 공허로 이어지는 두 개의 차원문을 엽니다. 잠시 후 문이 투사체를 발사하여 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 <status>침묵</status>시킵니다.", // 공허의 부름
        "W": "말자하가 {v1}초 동안 부정적인 에너지로 이뤄진 공간을 생성하여, 주변 적에게 매초 <magicdamage>{v2}의 최대 체력에 비례하는 마법 피해</magicdamage>를 입힙니다.", // 무의 지대
        "E": "말자하가 대상의 정신을 오염시켜, {v1}초에 걸쳐 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다. 그동안 대상이 사망하면 환각이 주변 적에게 옮겨가고 말자하가 <scalemana>{v3}의 마나</scalemana>를 얻습니다.<br><br>말자하의 공허충은 정신이 오염된 대상에게 이끌립니다.", // 재앙의 환상
        "R": "말자하가 정신을 집중하며 공허의 정수로 대상 챔피언을 <status>제압</status>하고, {v1}초에 걸쳐 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.", // 황천의 손아귀
    },
    "Malphite": { // 말파이트
        "P": "말파이트는 여러 겹의 돌로 감싸여 있어 자신의 최대 체력 10%만큼의 피해를 흡수할 수 있습니다. 말파이트가 몇 초 동안 공격 받지 않으면 보호막이 재생성됩니다.", // 화강암 방패 — CD 요약본, 직접 다듬을 것
        "Q": "말파이트가 대지의 조각을 날려 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히며 {v2}초 동안 {v3}% <status>둔화</status>시킵니다. 말파이트는 {v2}초 동안 대상의 <speed>이동 속도</speed>도 <status>둔화</status>된 만큼 훔칩니다.", // 지진의 파편
        "W": "<passive>기본 지속 효과: </passive>말파이트가 <scalearmor>{v1}%의 방어력({v2})</scalearmor>을 얻습니다. 이 효과는 <spellname>화강암 방패</spellname>가 활성화된 동안 <scalearmor>{v3}%({v4})</scalearmor>까지 증가합니다.<br><br><passive>사용 시: </passive>말파이트의 다음 기본 공격 <onhit>적중 시</onhit> 추가로 <physicaldamage>{v5}의 물리 피해</physicaldamage>를 입히고 여진을 생성해 해당 방향에 <physicaldamage>{v6}의 물리 피해</physicaldamage>를 입힙니다. 다음 {v7}초 동안 기본 공격 <onhit>적중 시</onhit> 여진이 생성됩니다.", // 천둥소리
        "E": "말파이트가 바닥을 내려쳐 주변 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 적들의 <attackspeed>공격 속도를 {v3}%</attackspeed> 감소시킵니다.", // 지면 강타
        "R": "말파이트가 산사태와 같은 힘으로 돌진하며 저지 불가 상태가 됩니다. 돌진이 끝나면 말파이트가 {v1}초 동안 대상을 <status>공중으로 띄워 올리고</status> <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.", // 멈출 수 없는 힘
    },
    "Jade_Malphite": { // 말파이트
        "P": "말파이트는 여러 겹의 바위로 감싸여 있어, 자기 최대 체력의 10%에 해당하는 피해를 흡수할 수 있습니다. 이 효과는 말파이트가 10초 동안 공격받지 않으면 다시 충전됩니다.", // 화강암 방패 — CD 요약본, 직접 다듬을 것
        "Q": "대상에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 <speed>{v3}%의 이동 속도</speed>를 훔칩니다.", // 지진의 파편
        "W": "<passive>기본 지속 효과: </passive>말파이트가 기본 공격 시 대상 근처의 유닛에게 <physicaldamage>공격력</physicaldamage>의 {v1}%에 해당하는 피해를 입힙니다.<br><br><active>사용 시: </active>말파이트의 <scalearmor>방어력</scalearmor>과 <physicaldamage>공격력</physicaldamage>이 6초 동안 {v2}% 증가합니다.", // 난폭한 일격
        "E": "말파이트가 지면을 내리쳐 주변 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고, 공격 속도를 {v2}초간 {v3}% 감소시킵니다.<br><br>이 스킬은 말파이트 방어력의 {v4}%에 해당하는 피해를 추가로 입힙니다.", // 지면 강타
        "R": "말파이트가 목표 위치로 돌진하여 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 <status>공중에 띄웁니다</status>.", // 멈출 수 없는 힘
    },
    "Mel": { // 멜
        "P": "멜이 스킬을 사용할 때마다 다음 기본 공격 시 투사체가 3개 (최대 9개) 추가됩니다.<br><br>멜이 스킬 또는 기본 공격으로 피해를 입히면 무한히 중첩할 수 있는 압도를 적용합니다. 압도 피해가 충분한 상태에서 멜의 공격이 적에게 적중하면 중첩을 소모하여 대상을 처형합니다.", // 이글거리는 광휘 — CD 요약본, 직접 다듬을 것
        "Q": "멜이 대상 지점 주위에 폭발하는 투사체 {v1}개를 퍼붓습니다.<br><br>첫 번째 폭발은 <magicdamage>{v2}의 마법 피해</magicdamage>를, 이후 각 폭발은 <magicdamage>{v3}의 마법 피해</magicdamage>를 입히며, 모두 합쳐 최대 <magicdamage>{v4}의 마법 피해</magicdamage>를 입힙니다.", // 빛의 세례
        "W": "멜이 자신을 방어막으로 감싸 적 챔피언이 날리는 투사체를 반사하고 {v1}초 동안 <shield>{v2}의 보호막</shield>을 얻으며 {v3}초 동안 <speed>이동 속도가 {v4}% 증가했다가 점차 감소</speed>합니다.<br><br>반사된 투사체는 <magicdamage>최초 피해량의 {v5}에 해당하는 마법 피해</magicdamage>를 입힙니다.", // 반박
        "E": "멜이 찬란한 구체를 발사하여 중심에 있는 적을 {v1}초 동안 <status>속박</status>하고 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.<br><br>구체는 그 주변에 적대적 영역을 형성하여 적을 {v3}% <status>둔화</status>시키고 <magicdamage>초당 {v4}의 마법 피해</magicdamage>를 입힙니다.", // 태양 올가미
        "R": "<passive>기본 지속 효과</passive>: <keywordmajor>압도</keywordmajor> 피해가 <magicdamage>{v1}의 마법 피해+중첩당 {v2}의 마법 피해</magicdamage>까지 증가합니다.<br><br><active>사용 시</active>: 멜이 <keywordmajor>압도</keywordmajor>의 영향을 받는 모든 적에게 힘을 방출하여 <magicdamage>{v3}의 마법 피해+<keywordmajor>압도</keywordmajor> 중첩당 {v4}의 마법 피해</magicdamage>를 입힙니다.<br><br><rules>적 챔피언이 <keywordmajor>압도</keywordmajor>의 영향을 받고 있을 때만 사용할 수 있습니다.</rules>", // 황금 일식
    },
    "Mordekaiser": { // 모데카이저
        "P": "모데카이저가 적 챔피언이나 몬스터에게 공격 또는 스킬을 3회 적중시키면 강력한 피해를 입히는 오라를 얻고 이동 속도가 증가합니다.", // 암흑 탄생 — CD 요약본, 직접 다듬을 것
        "Q": "모데카이저가 몰락의 밤으로 땅을 내리쳐 해당 지역에 있는 모든 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히며, 단일 대상 적중 시 피해량이 <magicdamage>{v2}</magicdamage>까지 증가합니다.", // 말살
        "W": "<passive>기본 지속 효과:</passive> 모데카이저가 입히는 피해의 {v1}%, 받는 피해의 {v2}%를 축적합니다.<br><br><active>사용 시:</active> 모데카이저가 축적한 피해를 <shield>보호막</shield>으로 전환합니다. 스킬을 <recast>재사용</recast>하면 <healing>남은 보호막의 {v3}%만큼 체력을 회복</healing>합니다.<br><br>최소 보호막 흡수량: <shield>{v4}</shield><br>최대 보호막 흡수량: <shield>{v5}</shield>", // 불멸
        "E": "<active>사용 시:</active> 적들을 자신 쪽으로 끌어당겨 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.", // 죽음의 손아귀
        "R": "모데카이저가 챔피언 하나를 {v1}초 동안 죽음의 세계로 추방해 지속시간 동안 대상이 지닌 주요 능력치들의 {v2}%를 훔칩니다.<br><br>모데카이저가 죽음의 세계에서 적을 처치하면 영혼을 흡수하여 대상이 부활할 때까지 훔친 능력치를 유지합니다.", // 죽음의 세계
    },
    "Morgana": { // 모르가나
        "P": "모르가나가 적의 영혼을 흡수하여 챔피언, 대형 미니언, 중형 및 대형 정글 몬스터에게 피해를 입힐 때 체력을 회복합니다.", // 영혼 흡수 — CD 요약본, 직접 다듬을 것
        "Q": "모르가나가 별의 화염이 깃든 에너지를 발사하여 첫 번째로 명중한 대상을 {v1}초 동안 <status>속박</status>하고 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.", // 어둠의 속박
        "W": "모르가나가 {v1}초 동안 대상 지역을 불태워 매초 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다. 피해는 대상이 잃은 체력에 비례해 최대 <magicdamage>{v3}</magicdamage>까지 증가합니다.<br><br>이 스킬의 재사용 대기시간은 모르가나가 <spellname>영혼 흡수</spellname>로 체력을 회복할 때마다 {v4}%씩 감소합니다.", // 고통의 그림자
        "E": "모르가나가 아군 챔피언에게 {v1}초 동안 <shield>{v2}의 마법 피해를 흡수하는 보호막</shield>을 씌웁니다. 보호막이 유지되는 동안 <status>방해</status> 및 <status>이동 불가</status> 효과에 면역됩니다.", // 칠흑의 방패
        "R": "모르가나가 자신과 주변 적 챔피언을 사슬로 묶어 대상에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}% <status>둔화</status>시킵니다. {v3}초가 지난 후 사슬을 벗어나지 못한 적은 추가로 <magicdamage>{v1}의 마법 피해</magicdamage>를 입고 {v4}초 동안 <status>기절</status>합니다.<br><br>이 스킬을 사용하는 동안 모르가나의 이동 속도가 <speed>{v5}%</speed> 증가합니다.", // 영혼의 족쇄
    },
    "Jade_Morgana": { // 모르가나
        "P": "모르가나는 주문 흡혈을 지녀, 스킬로 피해를 입힐 때마다 자신의 체력을 회복합니다.", // 영혼 흡수 — CD 요약본, 직접 다듬을 것
        "Q": "<maintext>어둠의 에너지를 발사하여 첫 번째로 적중한 적을 {v1}초 동안 <status>속박</status>하고 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.", // 어둠의 속박
        "W": "<maintext>지정한 지역을 {v1}초 동안 저주합니다. 저주받은 땅 위의 적은 매초 <magicdamage>{v2}의 마법 피해</magicdamage>를 받고 <scalemr>마법 저항력</scalemr>이 {v3} 감소합니다.", // 고통의 대지
        "E": "<maintext>아군 챔피언에게 {v1}초 동안 보호막을 부여합니다. 보호막은 파괴되기 전까지 <shield>{v2}</shield>의 <magicdamage>마법 피해</magicdamage>를 흡수하고 <status>방해</status> 효과를 무효화합니다.", // 칠흑의 방패
        "R": "<maintext>주변의 적 챔피언에게 검은 사슬을 걸어 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 3초간 20% <status>둔화</status>시킵니다. {v2}초가 지나면 대상은 <magicdamage>{v1}의 마법 피해</magicdamage>를 추가로 받고 {v3}초 동안 기절합니다.<br><br>적 챔피언이 모르가나로부터 멀리 떨어지면 사슬이 끊어집니다.", // 영혼의 족쇄
    },
    "DrMundo": { // 문도 박사
        "P": "문도 박사가 처음으로 적중하는 이동 불가 효과에 저항하며, 체력을 잃고 근처에 화학 물질이 든 통을 떨어뜨립니다. 통 위로 이동하면 통을 주워 체력을 회복하고 이 스킬의 재사용 대기시간을 줄입니다.<br><br>또한 문도 박사의 체력 재생이 크게 증가합니다.<br>", // 가고 싶은 데로 간다 — CD 요약본, 직접 다듬을 것
        "Q": "문도 박사가 뼈톱을 던져 처음 맞는 적에게 <magicdamage>적 현재 체력의 {v1}%에 해당하는 마법 피해</magicdamage>를 입히고 {v2}초 동안 {v3}% <status>둔화</status>시킵니다.<br><br>뼈톱이 챔피언이나 몬스터에게 적중하면 문도 박사가 <healing>{v4}의 체력</healing>을 회복합니다. 챔피언 또는 몬스터가 아닌 대상에게 적중하면 <healing>{v5}의 체력</healing>을 회복합니다.", // 오염된 뼈톱
        "W": "문도 박사가 제세동기를 충전하여 주변 적에게 최대 {v1}초까지 초당 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다. 추가로 첫 {v3}초 동안에는 입는 피해의 {v4}를, 남은 지속시간에는 입는 피해의 {v5}%를 회색 체력으로 저장하고 <recast>재사용</recast>할 수 있습니다.<br><br><recast>재사용 시:</recast> 제세동기가 폭발하여 주변 적에게 <magicdamage>{v6}의 마법 피해</magicdamage>를 입힙니다. 챔피언에게 적중하면 문도 박사가 <healing>회색 체력의 {v7}%</healing>를 회복하며 그렇지 않으면 <healing>회색 체력의 {v8}%</healing>를 회복합니다.", // 심장 전기 충격
        "E": "<passive>기본 지속 효과:</passive> 문도 박사가 <physicaldamage>{v1}의 공격력</physicaldamage>을 얻습니다.<br><br><active>사용 시:</active> 문도 박사가 왕진 가방을 맹렬하게 휘둘러 다음 공격 시 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 추가로 입힙니다. 이 수치는 문도 박사가 잃은 체력에 비례하여 최대 {v3}까지 증가합니다. 이때 처치된 적은 밀려나며 지나치는 적에게 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입힙니다.", // 둔기에 의한 외상
        "R": "문도 박사가 화학 물질을 투여하여 <healing>잃은 체력의 {v1}%를 최대 체력</healing>으로, <speed>{v2}%의 이동 속도</speed>를 얻고 {v3}초에 걸쳐 <healing>최대 체력의 {v4}%</healing>만큼 체력을 회복합니다.<br><br>스킬 레벨이 3이 되면 근처에 있는 적 챔피언 하나당 두 회복 효과 모두 {v5}%씩 추가로 증가합니다.", // 최대 투여량
    },
    "Jade_DrMundo": { // 문도 박사
        "P": "문도 박사는 매초 최대 체력의 0.3%가 회복됩니다.", // 아드레날린 분출 — CD 요약본, 직접 다듬을 것
        "Q": "<maintext>문도 박사가 식칼을 던져 대상 현재 체력의 {v1}%(최소 {v2})만큼 <magicdamage>마법 피해</magicdamage>를 입히고 2초 동안 적의 속도를 40% <status>늦춥니다</status>.<br><br>식칼이 대상에게 적중하면 소모한 체력의 절반을 회복합니다.", // 오염된 대형식칼
        "W": "<toggle>활성화/비활성화: </toggle>문도 박사가 주변 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 문도 박사에게 적용되는 방해 효과 지속시간이 {v2}% 감소합니다.", // 타오르는 고통
        "E": "문도 박사가 5초 동안 <physicaldamage>{v1}의 공격력</physicaldamage>을 얻습니다. 문도 박사가 잃은 체력 퍼센트당 <physicaldamage>+{v2}의 공격력</physicaldamage>을 추가로 얻습니다.", // 피학증
        "R": "<maintext>문도 박사가 12초 동안 <healing>{v1}의 체력</healing>을 회복합니다. 또한 <speed>이동 속도가 {v2}%</speed> 증가합니다.", // 가학증
    },
    "MissFortune": { // 미스 포츈
        "P": "미스 포츈은 새로운 대상에게 기본 공격을 가할 때마다 추가 물리 피해를 입힙니다.", // 사랑의 한 방 — CD 요약본, 직접 다듬을 것
        "Q": "미스 포츈이 튕기는 총알을 발사하여 적 하나와 그 뒤에 있는 다른 적에게 각각 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다. <br><br>두 번째 대상에게는 치명타를 입힐 수 있으며, 치명타 적용 시 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입힙니다. 첫 번째 대상을 처치했을 경우 두 번째 대상에게는 항상 치명타가 적용됩니다.", // 한 발에 두 놈
        "W": "<passive>기본 지속 효과:</passive> {v1}초간 피해를 받지 않으면 미스 포츈의 <speed>이동 속도가 {v2}</speed> 증가합니다. 다음 {v3}초간 피해를 입지 않으면 <speed>이동 속도가 {v4}</speed>까지 증가합니다.<br><br><active>사용 시:</active> <speed>이동 속도</speed> 증가 효과를 최대로 얻고 {v5}초 동안 <attackspeed>공격 속도가 {v6}%</attackspeed> 상승합니다.<br><br><spellname>사랑의 한 방</spellname> 발동 시 이 스킬의 재사용 대기시간이 {v7}초 줄어듭니다.", // 활보
        "E": "미스 포츈이 지정 지역에 총알을 퍼부어 {v1}초간 시야를 밝히고 적을 {v2}만큼 <status>둔화</status>시키며 매초 <magicdamage>{v3}의 마법 피해</magicdamage>를 입힙니다. (총 <magicdamage>{v4}의 마법 피해</magicdamage>)", // 총알은 비를 타고
        "R": "미스 포츈이 {v1}초 동안 정신 집중 상태로 총을 {v2}회 난사해 공격 한 차례에 <physicaldamage>{v3}의 물리 피해</physicaldamage>를 입힙니다. (총 <physicaldamage>{v4}의 물리 피해</physicaldamage>)<br><br>매회 발사 시 치명타가 적용될 수 있으며 치명타 적용 시 각각 <physicaldamage>{v5}의 물리 피해</physicaldamage>를 입힙니다.", // 쌍권총 난사
    },
    "Jade_MissFortune": { // 미스 포츈
        "P": "5초 동안 공격받지 않으면 미스 포츈이 추가로 <speed>25의 이동 속도</speed>를 얻습니다. 이 추가 능력치는 매초 9씩 최대 70까지 증가합니다.", // 활보 — CD 요약본, 직접 다듬을 것
        "Q": "미스 포츈이 적에게 총알을 발사해 대상에게는 <physicaldamage>{v1}의 물리 피해</physicaldamage>를, 그 뒤에 있는 적에게는 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입힙니다. 적중 시 효과가 적용됩니다.", // 한 발에 두 놈
        "W": "<font color='#FF9900'>기본 지속 효과:</font> 미스 포츈이 대상에게 기본 공격을 맞힐 때마다 <magicdamage>{v1}의 마법 피해</magicdamage>를 추가로 입힙니다. 이 피해는 동일한 대상에 대해 {v2}회까지 중첩됩니다.<br><magicdamage>최대 추가 피해량: {v3}</magicdamage><br><br><font color='#FF9900'>사용 시:</font> 미스 포츈의 <attackspeed>공격 속도</attackspeed>가 6초 동안 <attackspeed>{v4}%</attackspeed> 증가하고, 기본 공격 시 3초간 <keyword>50%의 고통스러운 상처</keyword>를 적용합니다.", // 불순물 탄환
        "E": "미스 포츈이 공중으로 무수한 총알을 발사해, 0.5초 뒤 지정한 위치에 쏟아지게 합니다. 총알에 맞은 적은 2초에 걸쳐 <magicdamage>{v1}의 마법 피해</magicdamage>를 받고 1초 동안 {v2}만큼 <status>둔화</status>됩니다.", // 총알은 비를 타고
        "R": "미스 포츈이 정신 집중 상태로 2초 동안 정면의 부채꼴 범위에 총알을 난사해, 한 발당 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다. (<physicaldamage>전체 피해량: {v2}</physicaldamage>)", // 쌍권총 난사
    },
    "Milio": { // 밀리오
        "P": "밀리오의 스킬에 닿은 아군은 다음 공격으로 큰 추가 피해를 입히고 대상을 불태웁니다.", // 타오르는 힘 — CD 요약본, 직접 다듬을 것
        "Q": "밀리오가 불꽃 공을 걷어차 처음으로 맞힌 적을 <status>밀어냅니다</status>. 적중한 공은 적들 사이를 튕기며 폭발해 주변 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 {v3} <status>둔화</status>시킵니다.<br><br><spellname>초특급 불꽃 킥</spellname> 스킬을 한 명 이상의 적 챔피언에게 적중시키면 소모한 마나의 {v4}%를 돌려받습니다.", // 초특급 불꽃 킥
        "W": "밀리오가 {v1}초 동안 아군 챔피언을 따라가는 온기를 생성합니다. 지속시간 동안 근처 아군 챔피언의 공격 사거리가 {v2} 증가하고 <healing>{v3}의 체력</healing>을 회복합니다. 또한, 온기는 {v4}초마다 <spellname>타오르는 힘</spellname> 효과를 적용합니다.<br><br><recast>재사용 시:</recast> 온기가 따라가는 아군을 변경합니다.", // 아늑한 모닥불
        "E": "밀리오가 아군 챔피언을 보호의 불길로 감싸 <shield>{v1}의 피해를 흡수하는 보호막</shield>을 부여하고 {v2}초 동안 <speed>이동 속도를 {v3}%</speed> 증가시킵니다.<br><br>이 스킬은 2회까지 충전되고 동일 대상에게 효과가 중첩됩니다.", // 따스한 포옹
        "R": "밀리오가 근처 아군 챔피언에게 치유의 불꽃을 보내 <status>방해</status> 및 <status>이동 불가</status> 효과를 정화하고 <healing>{v1}의 체력</healing>을 회복시키며 {v2}초 동안 {v3}% 강인함을 부여합니다.", // 생명의 온기
    },
    "Bard": { // 바드
        "P": "<font color='#FF9900'>정령:</font> 바드에게 이끌려 모여든 정령들이 바드의 기본 공격을 도와 추가 마법 피해를 입힙니다. 바드가 <font color='#cccc00'>고대의 종</font>을 충분히 모으면 정령이 일정 영역에 피해를 입히며 적중당한 적을 둔화시킵니다.<br><br><font color='#FF9900'>고대의 종:</font> 맵상의 무작위 장소에 바드가 모을 수 있는 <font color='#cccc00'>고대의 종</font>이 나타납니다. 고대의 종을 획득하면 경험치, 마나 회복 효과, 비전투 시 이동 속도를 얻습니다.", // 방랑자의 부름 — CD 요약본, 직접 다듬을 것
        "Q": "바드가 에너지 광선을 직선으로 발사해 처음 적중하는 적 둘에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 처음 적중한 대상은 {v2}초간 {v3}% <status>둔화</status>됩니다.<br><br>광선이 두 번째 대상이나 벽을 맞히면 적중당한 모든 적이 {v4}초간 <status>기절</status>합니다.<br>", // 우주의 결속
        "W": "바드가 체력 회복 성소를 생성해, 처음 들어온 아군에게 {v1}초에 걸쳐 사라지는 <speed>{v2}의 이동 속도</speed>를 부여하고 최소 <healing>{v3}의 체력</healing>을 회복시킵니다. 성소의 체력 회복 효과는 점차 증가해, {v4}초 이후에는 최대 <healing>{v5}의 체력</healing>을 회복시킬 수 있습니다.<br><br>바드는 한 번에 최대 {v6}개의 성소를 세울 수 있습니다. 성소는 적 챔피언이 들어오면 파괴됩니다.<br><br>이 스킬은 {v7}회까지 충전됩니다.<br><br>현재 활성화된 성소: {v8} / {v9}", // 수호자의 성소
        "E": "바드가 지형을 통과하는 일방통행 차원문을 {v1}초 동안 엽니다. 모든 챔피언은 입구 근처에서 차원문으로 이동하여 들어갈 수 있습니다.", // 신비한 차원문
        "R": "바드가 지정한 지역에 마법의 보호 에너지를 던집니다. 적중한 모든 유닛과 구조물은 {v1}초 동안 경직 상태가 됩니다.", // 운명의 소용돌이
    },
    "Varus": { // 바루스
        "P": "적을 처치하거나 어시스트를 올리면 잠시 바루스의 공격력과 주문력이 상승합니다. 대상이 챔피언인 경우 공격력과 주문력이 더 큰 폭으로 상승합니다.", // 죽지 않는 복수심 — CD 요약본, 직접 다듬을 것
        "Q": "<attention>충전 시작 시:</attention> 바루스가 다음 화살을 조준하며 {v1}% <status>둔화</status>됩니다. {v2}초가 경과한 후 쏘지 않으면 바루스가 스킬을 취소하고 소모한 마나의 {v3}%를 돌려받습니다.<br><br><attention>발사 시:</attention> 바루스가 화살을 발사하여 <physicaldamage>{v4}의 물리 피해</physicaldamage>를 입힙니다. 관통당한 적 하나당 {v5}%씩 피해량이 감소합니다. (최소 {v6}%) 피해량과 <keywordmajor>역병</keywordmajor> 폭발 효과는 충전 시간에 비례해 최대 {v7}%까지 증가합니다. (최대 <physicaldamage>{v8}</physicaldamage>)", // 꿰뚫는 화살
        "W": "<passive>기본 지속 효과: </passive>바루스의 기본 공격이 <magicdamage>{v1}의 마법 피해</magicdamage>를 추가로 입히고 {v2}초 동안 <keywordmajor>역병</keywordmajor> 중첩을 적용합니다. (최대 {v3}회 중첩)<br><br>바루스가 다른 스킬을 사용해 <keywordmajor>역병</keywordmajor> 중첩을 폭발시키면 중첩 횟수당 <magicdamage>최대 체력의 {v4}에 해당하는 마법 피해</magicdamage>를 입힙니다. (최대 피해량: <magicdamage>최대 체력의 {v5}</magicdamage>) 챔피언과 에픽 몬스터를 대상으로 <keywordmajor>역병</keywordmajor>을 폭발시키면 기본 스킬의 재사용 대기시간이 중첩 횟수당 최대 재사용 대기시간의 {v6}%만큼 감소합니다.<br><br><active>사용 시:</active> 다음 <spellname>꿰뚫는 화살</spellname> 스킬이 <magicdamage>잃은 체력의 {v7}에 해당하는 마법 피해</magicdamage>를 추가로 입힙니다. 피해량은 충전 시간에 비례하여 <magicdamage>잃은 체력의 {v8}</magicdamage>까지 증가합니다.", // 역병 화살
        "E": "바루스가 화살을 비처럼 쏟아부어 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 {v2}초 동안 지면을 오염시켜 적을 {v3}% <status>둔화</status>시키며 {v4}%의 고통스러운 상처를 남깁니다.", // 퍼붓는 화살
        "R": "바루스가 부패의 촉수를 발사해 처음 맞은 챔피언을 {v1}초 동안 <status>속박</status>하고 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다. <status>속박</status>된 적은 지속시간에 걸쳐 <keywordmajor>역병</keywordmajor> 중첩이 {v3}회 쌓입니다.<br><br>촉수는 대상으로부터 감염되지 않은 적 챔피언에게 뻗어 나가, 닿은 적에게 동일한 양의 피해를 입히고 <status>속박</status>합니다.", // 부패의 사슬
    },
    "Vi": { // 바이
        "P": "바이는 시간이 흐르면 보호막이 1회 충전됩니다. 이 보호막은 적을 스킬로 적중시키면 활성화됩니다.", // 폭발 보호막 — CD 요약본, 직접 다듬을 것
        "Q": "<charge>충전 시작:</charge> 바이가 강력한 한 방을 충전하며 {v1}% <status>둔화</status>됩니다.<br><br><release>돌진:</release> 바이가 전방으로 돌진하며 부딪친 모든 적에게 충전 시간에 비례해 <physicaldamage>{v2}~{v3}의 물리 피해</physicaldamage>를 입히고 <spellname>찌그러뜨리기</spellname> 효과를 적용합니다. 적 챔피언과 충돌하면 멈추면서 적을 <status>뒤로</status> <status>밀어냅니다</status>.", // 금고 부수기
        "W": "<passive>기본 지속 효과:</passive> 같은 대상에게 기본 공격을 3번 가할 때마다 대상 <physicaldamage>최대 체력의 {v1}에 해당하는 물리 피해</physicaldamage>를 추가로 입히고 {v2}초간 대상의 <scalearmor>방어력을 {v3}%</scalearmor> 낮추며 바이의 <attackspeed>공격 속도가 {v4}%</attackspeed> 상승합니다. 또한 <spellname>폭발 보호막</spellname>의 재사용 대기시간이 @spell.ViPassive:CDReductionOn3Hit@초 감소합니다.", // 찌그러뜨리기
        "E": "바이의 다음 기본 공격이 대상과 그 뒤의 적들에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다.<br><br>이 스킬은 2회까지 충전됩니다. ({v2}초마다 충전)", // 끈질긴 힘
        "R": "바이가 적 챔피언 한 명을 추격하면서 위치를 드러냅니다. 추격 중인 바이는 멈출 수 없으며, 닿는 순간 {v1}초 동안 <status>공중으로</status> <status>띄워 올리고</status> <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입힙니다.<br><br>중간에 바이와 부딪히는 적들은 옆으로 밀려나며 피해를 입고, {v3}초 동안 <status>기절</status>합니다.", // 정지 명령
    },
    "Veigar": { // 베이가
        "P": "룬테라에서 가장 강력한 악의 원천인 베이가는 점점 더 강해지고 있습니다. 적 챔피언에게 스킬을 적중시키거나 처치에 관여할 때마다 주문력이 영구적으로 증가합니다.", // 극악무도 — CD 요약본, 직접 다듬을 것
        "Q": "베이가가 암흑의 에너지 줄기를 쏟아내어 처음 맞는 두 명의 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.<br><br>베이가가 이 스킬로 적을 하나 처치할 때마다 <keywordmajor>극악</keywordmajor> 중첩이 @Spell.VeigarPassive:dQKillStacks@ 쌓입니다. 대형 미니언, 대형 몬스터의 경우 중첩이 @Spell.VeigarPassive:dQKillStacksLarge@만큼 추가로 쌓입니다.", // 사악한 일격
        "W": "베이가가 하늘에서 암흑 물질을 소환해 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.<br><br><keywordmajor>극악</keywordmajor>이 @Spell.VeigarPassive:PStacksPerDarkMatterCDR@번 중첩될 때마다 이 스킬의 재사용 대기시간이 @Spell.VeigarPassive:DarkMatterCDRIncrement*100@%씩 감소합니다.", // 암흑 물질
        "E": "베이가가 공간의 가장자리를 왜곡해 지나가는 적을 {v1}초 동안 <status>기절</status>시키는 감옥을 생성합니다. 감옥은 3초 동안 유지됩니다.", // 사건의 지평선
        "R": "베이가가 적 챔피언에게 태초의 마법을 날려 <magicdamage>{v1}~{v2}의 마법 피해</magicdamage>를 입힙니다. 피해량은 대상이 잃은 체력에 비례합니다. 체력이 33% 밑으로 떨어진 적에게 피해가 극대화됩니다.", // 태초의 폭발
    },
    "Jade_Veigar": { // 베이가
        "P": "베이가가 잃은 마나 1%마다 마나 재생이 1% 증가합니다.", // 균형 — CD 요약본, 직접 다듬을 것
        "Q": "<active>사용 시: </active>베이가가 지정한 적에게 어둠의 에너지를 발사하여 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 대상이 처치되면 베이가가 <magicdamage>{v2}의 주문력</magicdamage>을 얻습니다. 챔피언과 대형 미니언, 대형 몬스터에 대해서는 두 배의 효과가 적용됩니다.<br><br><passive>기본 지속 효과: </passive>베이가가 어떠한 유형의 피해로든 챔피언을 처치하면 <magicdamage>{v3}의 주문력</magicdamage>을 얻습니다.<br><br>추가 <magicdamage>주문력: +{v4}</magicdamage>", // 사악한 일격
        "W": "<maintext>1.2초 뒤, 지정한 위치에 하늘로부터 암흑 물질이 떨어져 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.", // 암흑 물질
        "E": "<maintext>베이가가 지정한 범위 주변의 공간을 3초 동안 왜곡시켜, 그 경계를 지나는 적을 {v1}초 동안 <status>기절</status>시킵니다.", // 사건의 지평선
        "R": "<maintext>적 챔피언에게 마법을 날려 <magicdamage>{v1}+대상 주문력의 80%에 해당하는 마법 피해</magicdamage>를 입힙니다.", // 태초의 폭발
    },
    "Vayne": { // 베인
        "P": "베인이 악당을 무자비하게 사냥합니다. 근처 적 챔피언에게 접근할 때 이동 속도가 증가합니다.", // 어둠 사냥꾼 — CD 요약본, 직접 다듬을 것
        "Q": "베인이 짧은 구르기를 합니다. 이후 기본 공격을 하면 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 추가로 입힙니다.<br><br><rules>이 스킬은 피해를 입힐 때 효과가 발동합니다.</rules>", // 구르기
        "W": "<passive>기본 지속 효과</passive>: 적에게 세 번 기본 공격 또는 스킬이 적중할 때마다 <truedamage>대상 최대 체력의 {v1}에 해당하는 고정 피해</truedamage>를 추가로 입힙니다.", // 은화살
        "E": "베인이 볼트를 발사하여 대상을 <status>뒤로 날려보내고</status> <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다. 지형에 부딪힌 대상은 <physicaldamage>{v2}의 추가 물리 피해</physicaldamage>를 입고 {v3}초 동안 <status>기절</status>합니다.", // 선고
        "R": "베인이 {v1}초 동안 <physicaldamage>{v2}의 공격력</physicaldamage>을 얻습니다. 적 챔피언이 베인에게 피해를 입고 {v3}초 안에 죽으면 지속시간이 {v4}초 늘어납니다. 또한 스킬이 지속되는 동안 <li><spellname>어둠 사냥꾼</spellname> 효과가 강화되어 <speed>이동 속도가 {v5}</speed> 증가합니다.<li><spellname>구르기</spellname>의 재사용 대기시간이 {v6}% 감소하며, 구르기를 사용하면 {v7}초 동안 <keywordstealth>투명</keywordstealth> 상태가 됩니다.", // 결전의 시간
    },
    "Jade_Vayne": { // 베인
        "P": "베인은 악당을 사냥할 때 자비가 없습니다. 베인이 주변의 적 챔피언을 향해 이동할 때 30의 이동 속도를 얻습니다.", // 어둠 사냥꾼 — CD 요약본, 직접 다듬을 것
        "Q": "짧은 거리를 구릅니다. {v1}초 내로 다음 기본 공격 시 <physicaldamage>{v2}의 추가 물리 피해</physicaldamage>를 입힙니다.", // 구르기
        "W": "동일한 대상에게 기본 공격이나 스킬을 3회 맞힐 때마다, {v1}+적 최대 체력의 {v2}%에 해당하는 <truedamage>고정 피해</truedamage>를 추가로 입힙니다. (몬스터에게는 최대 200의 피해를 입힙니다.)", // 은화살
        "E": "화살을 발사해 적에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 뒤로 밀어냅니다. 적이 지형과 충돌하면 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 추가로 받고 1.5초 동안 <status>기절</status>합니다.", // 선고
        "R": "{v1}초 동안 <physicaldamage>{v2}의 추가 공격력</physicaldamage>을 얻습니다. 활성화 중 구르기를 사용하면 1초 동안 <keywordstealth>투명</keywordstealth> 상태가 되고, <spellname>어둠 사냥꾼</spellname>이 부여하는 추가 <speed>이동 속도</speed>가 90으로 증가합니다.", // 결전의 시간
    },
    "Vex": { // 벡스
        "P": "벡스가 주기적으로 강화 상태가 되어 다음 기본 스킬로 적 챔피언을 공포에 빠뜨리고 돌진을 방해합니다. 주변 적이 돌진할 때마다 벡스가 적에게 표식을 남깁니다. 표식을 소모해 추가 피해를 입힐 수 있으며 강화 상태의 재사용 대기시간이 감소합니다.", // 파멸과 우울 — CD 요약본, 직접 다듬을 것
        "Q": "벡스가 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히는 안개 파동을 발사합니다. 잠시 후 파동의 크기가 작아지고 속도는 빨라집니다.<br><br>적에게 적중하면 <keywordmajor>우울</keywordmajor>을 소모합니다.", // 안개 화살
        "W": "벡스가 {v1}초 동안 <shield>{v2}의 피해를 흡수하는 보호막</shield>을 얻고 <magicdamage>{v3}의 마법 피해</magicdamage>를 입히는 충격파를 방출합니다.<br><br>적에게 적중하면 <keywordmajor>우울</keywordmajor>을 소모합니다.", // 거리 두기
        "E": "벡스가 지정한 위치로 그림자가 날아가도록 명령합니다. 그림자는 날아가는 동안 크기가 커집니다. 도착 시 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 {v3}% <status>둔화</status>시킵니다.<br><br>이 스킬로 적을 처치하면 <keywordmajor>파멸과 우울</keywordmajor>의 재사용 대기시간이 {v4}% 감소합니다.<br><br>적중한 적에게 <keywordmajor>우울</keywordmajor>을 적용합니다.", // 커지는 어둠
        "R": "그림자가 격렬하게 전방으로 돌진합니다. 그림자는 <magicdamage>@spell.VexR:RDamageCalc@의 마법 피해</magicdamage>를 입히고 첫 번째로 적중한 적 챔피언에게 4초 동안 표식을 남깁니다.<br><br><recast>재사용 시</recast>: 표식이 남은 챔피언에게 돌진하여 도착 시 <magicdamage>@spell.VexR:RecastDamageCalc@의 마법 피해</magicdamage>를 입힙니다.<br><br>표식이 남은 챔피언이 이 스킬로 피해를 입은 뒤 @spell.VexR:TakedownWindow@초 이내에 사망할 경우, 이 스킬의 재사용 대기시간이 일시적으로 초기화됩니다.", // 그림자 파동
    },
    "Belveth": { // 벨베스
        "P": "벨베스가 대형 미니언과 몬스터 및 챔피언 처치에 관여한 후 공격 속도 영구 중첩을 얻습니다. 또한 스킬을 사용한 후 일시적인 추가 공격 속도를 얻습니다.", // 연보랏빛 죽음  — CD 요약본, 직접 다듬을 것
        "Q": "벨베스가 돌진하여 경로상에 있는 적들에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다.<br><br>재사용 대기시간은 방향마다 {v2}초씩 따로 적용되며 <attackspeed>공격 속도</attackspeed>에 비례해 감소합니다.<br>", // 공허 쇄도
        "W": "벨베스가 꼬리를 내리쳐 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 적을 {v2}초 동안 <status>공중으로 띄워 올리며</status> {v3}초 동안 {v4}% <status>둔화</status>시킵니다. 챔피언을 맞히면 해당 방향의 <spellname>공허 쇄도</spellname> 재사용 대기시간이 초기화됩니다.", // 위와 아래
        "E": "벨베스가 정신을 집중해 주변에 칼바람을 일으켜 {v1}초 동안 받는 피해량 감소 {v2}%, 생명력 흡수 효과를 {v3}만큼 얻으며 {v4}회 공격합니다. 공격 횟수는 벨베스의 <attackspeed>공격 속도</attackspeed>에 비례해 증가합니다. 각 공격은 체력이 가장 낮은 적에게 대상이 잃은 체력에 비례해 <physicaldamage>{v5}</physicaldamage>~<physicaldamage>{v6}의 물리 피해</physicaldamage>를 입힙니다.<br><br>다른 스킬을 사용하거나 <recast>재사용</recast>하면 이 스킬을 일찍 종료합니다.<br>", // 여제의 소용돌이
        "R": "<passive>기본 지속 효과:</passive> 기본 공격 시 무한히 중첩되는 <truedamage>{v1}의 고정 피해</truedamage>를 추가로 입힙니다. 챔피언과 에픽 몬스터 처치에 관여하면 공허 산호 조각이 떨어집니다.<br><br><active>사용 시:</active> 벨베스가 공허 산호를 소모하여 <keywordmajor>{v2}개의 연보라</keywordmajor> 중첩을 얻고 본모습을 드러냅니다. 공허 에픽 몬스터가 남긴 공허 산호는 근처에서 죽는 미니언을 공허 빨판상어로 만듭니다. 이 스킬을 사용하는 동안 주변 적을 <status>둔화</status>시킨 후 폭발을 일으켜 <truedamage>{v3}+잃은 체력의 {v4}%에 해당하는 고정 피해</truedamage>를 입힙니다.<br><br>본모습으로 변신한 벨베스는 <healing>최대 체력이 {v5}</healing>, 공격 사거리가 {v6}, <attackspeed>총공격 속도가 {v7}%</attackspeed> 증가하며 <spellname>공허 쇄도</spellname>로 벽을 통과할 수 있습니다.<br><br><rules>본모습은 {v8}초 동안 유지되며 <keywordmajor>연보라 {v9}</keywordmajor>중첩 시 {v10}초로 증가합니다. <keywordmajor>연보라 {v11}</keywordmajor>중첩 시 본모습이 죽을 때까지 유지됩니다.</rules><br><br><br>", // 끝없는 연회
    },
    "Velkoz": { // 벨코즈
        "P": "벨코즈가 스킬을 적중시키면 대상에게 <keywordName>유기물 분해</keywordName> 중첩이 쌓입니다. 3회 중첩 시 대상은 큰 고정 피해를 입습니다.", // 유기물 분해 — CD 요약본, 직접 다듬을 것
        "Q": "벨코즈가 플라즈마 광선을 발사해 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}% <status>둔화</status>시킵니다. 둔화 효과는 {v3}초에 걸쳐 사라집니다. 사거리 끝에 도달하거나, 대상을 맞히거나, 광선을 <recast>재사용</recast>하면 새로운 두 개의 광선이 90도 각도로 갈라져 발사됩니다.<br><br>플라즈마 분열로 유닛 처치 시 <scalemana>마나를 {v4}</scalemana> 회복합니다.", // 플라즈마 분열
        "W": "벨코즈가 공허로 통하는 균열을 열어 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 이후 균열이 폭발하며 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.<br><br>이 스킬은 2회까지 충전됩니다. ({v3}초마다 충전)", // 공허 균열
        "E": "벨코즈가 가까운 지면을 붕괴시켜 폭발을 일으키며 {v1}초 동안 <status>공중으로 띄워 올리고</status> <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다. 벨코즈와 가까이 있는 적은 <status>공중으로 떠오르는</status> 대신 <status>뒤로 밀려납니다</status>.", // 지각 붕괴
        "R": "벨코즈가 정신을 집중하여 마우스 커서를 따라가는 에너지 광선을 발사합니다. 이때 2.5초에 걸쳐 총 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}% <status>둔화</status>시킵니다. 최근 <spellname>유기물 분해</spellname> 스킬로 피해를 입은 적에게는 <truedamage>고정 피해</truedamage>를 입힙니다.<br><br>광선에 맞은 적에게는 주기적으로 <keywordmajor>분해</keywordmajor> 중첩이 쌓입니다.", // 생물 분해 광선
    },
    "Volibear": { // 볼리베어
        "P": "볼리베어가 기본 공격을 하거나 스킬을 사용하면 공격 속도가 증가하며 최대 중첩 상태에서 공격 시 주변 적들에게 추가 마법 피해를 입힙니다.", // 무자비한 폭풍 — CD 요약본, 직접 다듬을 것
        "Q": "{v1}초 동안 볼리베어의 <speed>이동 속도가 {v2}</speed> 증가합니다. 적 챔피언을 향해 이동 시에는 이동 속도 증가량이 두 배로 늘어 <speed>{v3}</speed>까지 증가합니다. 스킬이 활성화된 동안 다음 기본 공격 시 <physicaldamage>{v4}의 물리 피해</physicaldamage>를 입히고 {v5}초 동안 <status>기절</status>시킵니다.<br><br>볼리베어가 대상을 <status>기절</status>시키기 전에 <status>이동 불가</status> 효과를 받으면 스킬이 끝나지만, 볼리베어가 분노하여 재사용 대기시간이 초기화됩니다.", // 번개 강타
        "W": "볼리베어가 적을 공격하여 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 {v2}초 동안 표식을 남깁니다.<br><br>표식이 남은 대상에게 이 스킬을 사용하면 피해가 <physicaldamage>{v3}</physicaldamage>까지 증가하며 볼리베어가 <healing>{v4}+잃은 체력의 {v5}만큼 체력</healing>을 회복합니다.", // 광란의 상처
        "E": "볼리베어가 뇌운을 소환해 번개를 내리쳐 <magicdamage>{v1}+대상 최대 체력의 {v2}%에 해당하는 마법 피해</magicdamage>를 입히고 {v3}초 동안 {v4}% <status>둔화</status>시킵니다.<br><br>볼리베어가 폭발 지역 안에 있으면 {v5}초 동안 <shield>{v6}+최대 체력의 {v7}%에 해당하는 보호막</shield>을 얻습니다.", // 천공 분열
        "R": "볼리베어가 변신 후 지정한 위치로 도약합니다. {v1}초 동안 <healing>체력이 {v2}</healing>, 공격 사거리가 {v3} 증가합니다.<br><br>볼리베어가 착지 시 땅에 균열이 생겨 근처 적 포탑이 {v4}초 동안 <status>비활성화</status>되며 <physicaldamage>{v5}의 물리 피해</physicaldamage>를 입습니다. 근처 적들은 {v6}% <status>둔화</status>했다가 1초에 걸쳐 원래대로 돌아옵니다. 볼리베어 바로 아래에 있는 적들은 <physicaldamage>{v7}의 물리 피해</physicaldamage>를 입습니다.", // 폭풍을 부르는 자
    },
    "Braum": { // 브라움
        "P": "브라움의 기본 공격은 뇌진탕 펀치를 적용시킵니다. 첫 번째 중첩이 적용된 후에는 <font color='#FFF673'>아군</font>의 기본 공격 역시 뇌진탕 펀치 중첩을 적용합니다. <br><br>중첩이 4번 쌓이면 대상은 기절하며 마법 피해를 입습니다. 다음 몇 초 동안은 중첩이 새로 쌓이지 않는 대신 브라움의 공격으로부터 추가 마법 피해를 입습니다.", // 뇌진탕 펀치 — CD 요약본, 직접 다듬을 것
        "Q": "브라움이 방패에서 빙결을 뿜어내어 <magicdamage>{v1}의 마법 피해</magicdamage>를 처음 맞는 적에게 입히고, 대상 적에게 {v2}%의 <status>둔화</status>를 겁니다. 둔화 효과는 {v3}초간 점차 감소합니다.<br><br>이 스킬로 <keywordmajor>뇌진탕 펀치</keywordmajor> 중첩이 1회 쌓입니다.", // 동상
        "W": "브라움이 아군 챔피언이나 미니언에게 도약합니다. 대상에게 다다르면 대상은 {v1}초 동안 <scalearmor>방어력이 {v2}</scalearmor>, <scalemr>마법 저항력이 {v3}</scalemr> 증가합니다. 브라움 역시 같은 시간 동안 <scalearmor>방어력이 {v4}</scalearmor>, <scalemr>마법 저항력이 {v5}</scalemr> 증가합니다.", // 내가 지킨다
        "E": "브라움이 {v1}초 동안 방패를 들어 올려 선택한 방향에서 날아오는 적의 투사체를 가로막아 자신이 대신 맞고서 소멸시킵니다. 브라움이 막는 첫 번째 투사체는 피해를 입히지 않으며 이후 막는 투사체는 피해량이 {v2}% 감소합니다.<br><br>방패를 들어 올리는 동안 브라움의 <speed>이동 속도가 {v3}%</speed> 증가합니다.", // 불굴
        "R": "브라움이 지면을 내리쳐 전방에 균열을 내며 균열에 있는 적과 브라움 근처에 있는 적을 <status>공중으로 띄워 올리고</status> <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 첫 번째로 맞은 대상은 브라움과의 거리에 비례하여 {v2}~{v3}초 동안 <status>공중으로 띄워 올리고</status> 다른 적들은 {v2}초 동안 <status>공중으로 띄워 올립니다</status>.<br><br>균열은 {v4}초 동안 {v5}%만큼 <status>둔화</status>시키는 구역을 생성합니다.<br>", // 빙하 균열
    },
    "Briar": { // 브라이어
        "P": "브라이어는 기본 공격과 스킬로 중첩 가능한 출혈 효과를 적용하며, 출혈 피해의 일정 비율만큼 체력을 회복합니다. 늘 허기진 브라이어는 잃은 체력에 비례해 체력 회복량이 증가하는 대신 기본 체력 재생이 없습니다.", // 진홍빛 저주 — CD 요약본, 직접 다듬을 것
        "Q": "브라이어가 대상에게 도약해 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 {v2}초간 <status>기절</status>시키며 {v3}초간 <scalearmor>방어력</scalearmor> 및 <scalemr>마법 저항력</scalemr>을 {v4}% 감소시킵니다.<br><br><rules><keywordmajor>핏빛 광분</keywordmajor> 상태에서 이 스킬을 미니언이나 몬스터에게 사용하면 더 이상 챔피언을 우선적으로 공격하지 않습니다.</rules>", // 짜릿한 돌격
        "W": "브라이어가 도약해 <keywordmajor>핏빛 광분</keywordmajor> 상태에 들어가고 {v1}초간 가장 가까운 적에게 도발됩니다. (챔피언 우선) <keywordmajor>핏빛 광분</keywordmajor> 상태에서 <attackspeed>공격 속도가 {v2}%</attackspeed>, <speed>이동 속도가 {v3}%</speed> 상승하며 기본 공격으로 대상 주변 적에게 <physicaldamage>{v4}의 물리 피해</physicaldamage>를 입힙니다.<br><br>이 스킬을 <recast>재사용</recast>해 다음 기본 공격을 강화할 수 있습니다. 강화된 기본 공격으로 <physicaldamage>{v5}+잃은 체력의 {v6}%에 해당하는 물리 피해</physicaldamage>를 입히며, <healing>피해량의 {v7}+{v8}%만큼 체력을 회복</healing>합니다.<br>", // 핏빛 광분 / 식욕 폭발
        "E": "<charge>충전 시작:</charge> 브라이어가 <keywordmajor>핏빛 광분</keywordmajor> 상태에서 벗어나 힘을 모읍니다. 1초 동안 <healing>체력을 {v1}</healing> 회복하고, 입는 피해가 {v2}% 감소합니다.<br><br><release>발사:</release> 브라이어가 비명을 내질러 충전 시간에 따라 최대 <magicdamage>{v3}의 마법 피해</magicdamage>를 입히고, {v4}초 동안 {v5}% <status>둔화</status>시킵니다. 완전히 충전된 비명은 적을 <status>뒤로 밀치며</status>, 벽에 부딪히는 적에게 <magicdamage>{v6}의 마법 피해</magicdamage>를 입히고 {v7}초 동안 <status>기절</status>시킵니다.", // 오싹한 비명
        "R": "브라이어가 족쇄의 혈석을 발로 찬 다음, 혈석이 첫 번째로 적중한 챔피언을 먹잇감으로 지정하고 대상을 향해 날아갑니다. 착지 시 모든 주변 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 먹잇감을 제외한 적을 {v2}초간 <status>공포</status>에 빠트립니다. 이후 강화된 <keywordmajor>핏빛 광분</keywordmajor> 상태에 들어가 죽을 때까지 먹잇감을 쫓습니다. 지속시간 동안 <scalearmor>방어력</scalearmor> 및 <scalemr>마법 저항력</scalemr> {v3}, 생명력 흡수 {v4}%, <speed>이동 속도 {v5}%</speed>를 얻습니다.", // 불가항력적 죽음
    },
    "Brand": { // 브랜드
        "P": "브랜드의 스킬이 적을 불길로 휘감아, 4초 동안 피해를 줍니다. 불길은 세 번까지 중첩되며, 적이 불타는 동안 브랜드가 적을 처치하면 마나를 회복합니다. 챔피언이나 대형 몬스터에 불길이 세 번 중첩되면 불안정해져 2초 후 폭발하고, 근처 적에게 스킬 효과를 적용하며 막대한 피해를 입힙니다.", // 불길 — CD 요약본, 직접 다듬을 것
        "Q": "브랜드가 불덩이를 발사하여 처음 적중한 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.<br><br>대상이 <keywordmajor>불타는</keywordmajor> 상태라면 {v2}초 동안 <status>기절</status>합니다.", // 불태우기
        "W": "브랜드가 순수한 화염 기둥을 생성하여 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.<br><br>대상이 <keywordmajor>불타는</keywordmajor> 상태라면 <magicdamage>{v2}의 피해</magicdamage>를 입습니다.", // 화염 기둥
        "E": "브랜드가 목표에 강력한 폭발을 일으켜 주변 유닛에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.<br><br>대상이 <keywordmajor>불타는</keywordmajor> 상태라면 전파 범위는 두 배가 됩니다.", // 발화
        "R": "브랜드가 파괴적인 화염을 발사합니다. 화염은 브랜드나 다른 적에게 최대 5번 튕기며, 튕길 때마다 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 화염은 <keywordmajor>불길</keywordmajor> 중첩이 적은 챔피언에게 우선적으로 튕깁니다.<br><br>대상이 <keywordmajor>불타는</keywordmajor> 상태라면 잠시 {v2}% <status>둔화</status>됩니다.", // 파멸의 불덩이
    },
    "Jade_Brand": { // 브랜드
        "P": "브랜드의 스킬이 대상을 불길로 휘감아, 4초에 걸쳐 최대 체력의 8%에 해당하는 마법 피해를 입힙니다.", // 불길 — CD 요약본, 직접 다듬을 것
        "Q": "<maintext>브랜드가 불덩이를 발사하여 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.<br><br><passive>불길:</passive> 대상이 <keywordmajor>불타는</keywordmajor> 상태라면 <spellname>불태우기</spellname>가 대상을 2초 동안 <status>기절</status>시킵니다.", // 불태우기
        "W": "잠시 후 목표 지점에 화염 기둥을 생성하여 범위 내의 적 유닛에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.<br><br><passive>불길:</passive> <keywordmajor>불타는</keywordmajor> 유닛에게는 <spellname>화염 기둥</spellname>이 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.", // 화염 기둥
        "E": "<maintext>브랜드가 대상에게 강력한 폭발을 일으켜 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.<br><br><passive>불길:</passive> 대상이 <keywordmajor>불타는</keywordmajor> 상태라면 주변 적에게도 <spellname>발화</spellname>가 옮겨갑니다.", // 발화
        "R": "<maintext>브랜드가 파괴적인 화염을 발사해, {v1}번까지 튕기는 동안 각각 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.<br><br><passive>불길:</passive> 대상이 <keywordmajor>불타는</keywordmajor> 상태라면 <spellname>파멸의 불덩이</spellname>가 챔피언에게 우선적으로 튕깁니다.", // 파멸의 불덩이
    },
    "Vladimir": { // 블라디미르
        "P": "블라디미르는 추가 체력 30당 1의 주문력을 얻으며, 주문력 1당 1.6의 체력을 얻습니다. (이 효과는 서로 중첩되지 않습니다.)", // 핏빛 계약 — CD 요약본, 직접 다듬을 것
        "Q": "블라디미르가 대상의 체력을 흡수하며 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 <healing>{v2}의 체력</healing>을 회복합니다. 스킬을 두 번 사용한 뒤에는 0.5초 동안 <speed>이동 속도가 {v3}%</speed> 증가하며 {v4}초 안에 이 스킬을 다시 사용하면 스킬이 강화됩니다.<br><br>강화된 스킬을 사용하면 <magicdamage>{v5}의 마법 피해</magicdamage>를 입히며 <healing>{v6}+잃은 체력의 {v7}</healing>만큼 추가로 회복합니다.", // 수혈
        "W": "블라디미르가 2초 동안 피의 웅덩이로 변하며 <keyword>대상으로 지정할 수 없는</keyword> <keyword>유체화</keyword> 상태가 되고 <speed>이동 속도가 {v1}%</speed> 증가했다가 {v2}초에 걸쳐 원래대로 돌아옵니다. 웅덩이에 있는 적은 {v3}% <status>둔화</status>됩니다.<br><br>웅덩이 위에 있는 적에게 지속시간 동안 <magicdamage>{v4}의 마법 피해</magicdamage>를 입히고 <healing>피해량의 {v5}만큼 체력</healing>을 회복합니다.", // 피의 웅덩이
        "E": "<charge>충전 시작: </charge>블라디미르가 <font color='#CC3300'>체력을 {v1}</font>까지 희생해 피의 웅덩이를 채웁니다. 웅덩이가 가득 차면 블라디미르의 이동 속도가 20% <status>둔화</status>됩니다.<br><br><release>발사: </release>주변의 적에게 투사체를 급류처럼 방출해 충전 시간에 비례하여 <magicdamage>{v2}</magicdamage>~<magicdamage>{v3}의 마법 피해</magicdamage>를 입힙니다. 스킬을 1초 이상 충전했을 경우 대상을 0.5초 동안 {v4}% <status>둔화</status>시킵니다.", // 선혈의 파도
        "R": "블라디미르가 혈사병을 일으켜 {v1}초 동안 감염된 적이 받는 모든 피해를 {v2}% 증가시킵니다. 감염된 적은 이 효과가 끝나면 <magicdamage>{v3}의 마법 피해</magicdamage>를 입습니다. 블라디미르는 적 챔피언을 맞히면 <healing>{v3}의 체력</healing>을 회복하고, 이후 추가로 적 챔피언을 맞힐 때마다 <healing>{v4}의 체력</healing>을 더 회복합니다.", // 혈사병
    },
    "Blitzcrank": { // 블리츠크랭크
        "P": "체력이 낮아지면 블리츠크랭크가 마나에 비례하여 보호막을 얻습니다.", // 마나 보호막 — CD 요약본, 직접 다듬을 것
        "Q": "블리츠크랭크가 오른손을 발사하여 적중당한 적을 <status>끌어당기고</status> <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.", // 로켓 손
        "W": "블리츠크랭크가 힘을 충전하여 {v1}초 동안 <speed>이동 속도가 {v2}% 증가했다가 점차 원래대로 돌아오고</speed>, <attackspeed>공격 속도가 {v3}%</attackspeed> 증가합니다.<br><br>폭주 효과가 끝나면 블리츠크랭크가 {v4}초 동안 {v5}% <status>둔화</status>됩니다.", // 폭주
        "E": "블리츠크랭크가 주먹에 힘을 모아 다음 공격 시 적을 {v1}초 동안 <status>공중으로 띄워 올리고</status> <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입힙니다.", // 강철 주먹
        "R": "<passive>기본 지속 효과: </passive>스킬이 재사용 대기 상태가 아닐 때 블리츠크랭크의 주먹에 번개가 충전되어 공격 대상에게 표식을 남깁니다. 1초가 지나면 해당 적이 감전되어 <magicdamage>{v1}의 마법 피해</magicdamage>를 입습니다.<br><br><active>사용 시: </active>블리츠크랭크가 과충전해 주변 적에게 <magicdamage>{v2}의 마법 피해</magicdamage>를 입히고 {v3}초 동안 <status>침묵</status>시킵니다. 또한 적의 보호막도 파괴합니다.", // 정전기장
    },
    "Jade_Blitzcrank": { // 블리츠크랭크
        "P": "블리츠크랭크의 체력이 20% 아래로 내려가면 마나 보호막이 활성화됩니다. 마나 보호막은 마나의 50%에 해당하는 보호막으로 10초 동안 유지됩니다. 마나 보호막은 90초에 한 번씩만 발동됩니다.", // 마나 보호막 — CD 요약본, 직접 다듬을 것
        "Q": "블리츠크랭크가 오른손을 발사하여 대상에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 <status>기절</status>시킨 후 <status>끌어당깁니다</status>.", // 로켓 손
        "W": "블리츠크랭크가 힘을 충전하여 {v1}초 동안 <speed>이동 속도</speed>가 {v2}%, <attackspeed>공격 속도</attackspeed>가 {v3}% 증가합니다.", // 폭주
        "E": "블리츠크랭크가 주먹에 힘을 모아 다음 공격 시 적에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 {v2}초 동안 <status>공중으로 띄워 올립니다</status>.", // 강철 주먹
        "R": "<passive>기본 지속 효과: </passive>번개가 블리츠크랭크 주변의 적을 무작위로 내리쳐 2.5초에 한 번씩 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.<br><br><active>사용 시: </active>주변 적에게 <magicdamage>{v2}의 마법 피해</magicdamage>를 입히고 주변 적들을 0.5초 동안 <status>침묵</status> 상태로 만듭니다.", // 정전기장
    },
    "Viego": { // 비에고
        "P": "비에고 앞에서 쓰러지는 적은 망령이 됩니다. 망령을 공격하면 비에고가 일시적으로 죽은 적의 몸을 지배하며 대상 최대 체력의 일부만큼 체력을 회복하고 대상의 기본 스킬과 아이템을 사용할 수 있습니다. 적의 궁극기는 제외되는 대신 자신의 궁극기를 비용 소모 없이 한 번 사용할 수 있습니다.", // 군주의 지배 — CD 요약본, 직접 다듬을 것
        "Q": "<passive>기본 지속 효과:</passive> 비에고의 기본 공격이 추가로 <physicaldamage>대상 현재 체력의 {v1}에 해당하는 물리 피해</physicaldamage>를 입힙니다. 최근 비에고의 스킬에 피해를 입은 적들을 처음 공격하면 추가 공격을 가하여 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입히고 <healing>입힌 피해량의 {v3}%</healing>만큼 회복합니다. 추가 효과는 <keywordmajor>지배</keywordmajor> 중에도 유지됩니다.<br><br><active>사용 시: </active>비에고가 전방을 찔러 <physicaldamage>{v4}의 물리 피해</physicaldamage>를 입힙니다.", // 몰락한 왕의 검
        "W": "<charge>충전 시작:</charge> 비에고가 안개를 불러모으며 {v1}% <status>둔화</status>됩니다.<br><br><release>안개 구체 발사 시:</release> 비에고가 전방으로 돌진하며 응축된 안개를 발사합니다. <magicdamage>{v2}의 마법 피해</magicdamage>를 입히고 처음으로 적중한 적을 충전 시간에 비례하여 {v3}~{v4}초 동안 <status>기절</status>시킵니다.<br>", // 망령의 나락
        "E": "비에고가 전방으로 망령을 보내 처음으로 적중한 지형을 {v1}초 동안 안개로 둘러쌉니다. 비에고가 안개 속에서 <keywordstealth>위장</keywordstealth> 효과를 얻고 <speed>이동 속도가 {v2}</speed>, <attackspeed>공격 속도가 {v3}%</attackspeed> 증가합니다.", // 안개의 길
        "R": "비에고가 현재 <keywordmajor>지배</keywordmajor> 중인 영혼을 버리고 순간이동합니다. 대상에 다다르면 남은 체력 비율이 가장 낮은 챔피언을 공격해 잠시 동안 {v1}% <status>둔화</status>시키고 <physicaldamage>{v2}+잃은 체력의 {v3}%에 해당하는 물리 피해</physicaldamage>를 입힙니다. 주변의 다른 적들은 <status>밀려나며</status> <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입습니다.", // 심장 파괴자
    },
    "Viktor": { // 빅토르
        "P": "빅토르가 적을 처치할 때마다 마공학 파편을 얻습니다. 마공학 파편을 100개 획득할 때마다 빅토르의 사용 스킬이 영구적으로 증강됩니다. 기본 스킬을 모두 업그레이드한 후에는 마공학 파편을 100개 모아 궁극기를 증강할 수 있습니다.", // 영광스러운 진화 — CD 요약본, 직접 다듬을 것
        "Q": "빅토르가 적에게 폭발을 일으켜 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히며 {v2}초 동안 <shield>{v3}의 피해를 흡수하는 보호막</shield>을 얻습니다.<br><br>4초 안에 기본 공격 시 <magicdamage>{v4}의 마법 피해</magicdamage>를 입힙니다.<br><br><keywordmajor>업그레이드 시:</keywordmajor> {v2}초 동안 <shield>{v5}의 피해를 흡수하는 보호막</shield>을 얻고 <speed>이동 속도가 {v6}%</speed> 증가합니다.", // 힘의 흡수
        "W": "빅토르가 중력장 감옥 장치를 배치해 {v1}초 동안 장치 내부의 적을 {v2}% <status>둔화</status>시킵니다. 범위 안에 1.25초 동안 있는 적은 {v3}초 동안 <status>기절</status>합니다.<br><br><keywordmajor>업그레이드한 기본 지속 효과:</keywordmajor> 빅토르의 스킬이 1초 동안 {v4}% <status>둔화</status>시킵니다.<br><br><br>", // 중력장
        "E": "빅토르가 선택한 방향으로 마법공학 광선을 발사하여 적중한 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.<br><br><keywordmajor>업그레이드 시:</keywordmajor> 마법공학 광선을 따라 여진이 일어나며 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.<br><br><br>", // 마법공학 광선
        "R": "빅토르가 일정 지역에 {v1}초 동안 아케인 폭풍을 일으켜 즉시 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힌 후 주변 적에게 초당 <magicdamage>{v3}의 마법 피해</magicdamage>를 입힙니다. 폭풍은 최근 피해를 입힌 챔피언을 자동으로 따라갑니다.<br><br><recast>재사용 시:</recast> 빅토르가 직접 폭풍을 움직일 수 있습니다.<br><br><keywordmajor>업그레이드:</keywordmajor> 폭풍이 {v4}% 빠르게 이동합니다. 폭풍이 피해를 입힌 챔피언이 죽으면 폭풍의 크기가 커지고 지속시간이 {v5}초 증가합니다. (최대 {v6}회)<br><br>", // 아케인 폭풍
    },
    "Poppy": { // 뽀삐
        "P": "뽀삐가 던진 방패가 대상을 맞히고 튕겨나갑니다. 뽀삐는 방패를 다시 주워 일시적인 보호막 효과를 얻을 수 있습니다.", // 강철의 외교관 — CD 요약본, 직접 다듬을 것
        "Q": "뽀삐가 땅을 힘껏 내려쳐 <physicaldamage>{v1}</physicaldamage>+<physicaldamage>최대 체력의 {v2}%에 해당하는 물리 피해</physicaldamage>를 입히고 지대를 불안정하게 만듭니다. <br><br>불안정한 지대는 적을 {v3}% <status>둔화</status>시키고 {v4}초 뒤 폭발하여 <physicaldamage>{v1}</physicaldamage>+<physicaldamage>최대 체력의 {v2}%에 해당하는 물리 피해</physicaldamage>를 입힙니다.", // 망치 강타
        "W": "<passive>기본 지속 효과:</passive> 뽀삐가 <scalearmor>{v1}의 방어력</scalearmor>과 <scalemr>{v2}의 마법 저항력</scalemr>을 추가로 얻습니다. 뽀삐의 체력이 {v3}% 미만일 때는 효과가 두 배로 늘어납니다.<br><br><active>사용 시:</active> 뽀삐의 <speed>이동 속도가 {v4}%</speed> 증가하고 역장을 둘러 {v5}초 동안 주변에서 돌진하는 적을 막습니다. 가로막힌 적은 {v6}초 동안 <status>이동 스킬을 사용할 수 없고</status> {v7}% <status>둔화</status>되며 <magicdamage>{v8}의 마법 피해</magicdamage>를 입습니다.", // 굳건한 태세
        "E": "뽀삐가 하나의 적에게 돌진해 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 앞으로 밀어냅니다. 적이 지형에 부딪히면 적이 {v2}초 동안 <status>기절</status>하고 <physicaldamage>{v1}의 추가 물리 피해</physicaldamage>를 입습니다.", // 용감한 돌진
        "R": "<charge>충전 시작 시:</charge> 뽀삐가 최대 {v1}초 동안 망치를 충전하고 {v2}% <status>둔화</status>됩니다.<br><br><release>사용 시:</release> 뽀삐가 지면에 강력한 일격을 날려 균열을 일으킵니다. 처음 적중한 적 챔피언과 주변 적은 <physicaldamage>{v3}의 물리 피해</physicaldamage>를 입고 모두 <status>넥서스 쪽으로</status> <status>밀려나고</status> 공중에 떠오른 적은 대상으로 지정할 수 없게 됩니다. 균열의 길이와 적을 <status>밀어내는</status> 거리는 정신을 충전 시간에 비례합니다.<br><br>충전하지 않고 바로 사용할 경우 <physicaldamage>{v4}의 물리 피해</physicaldamage>를 입히고 적을 {v5}초 동안 <status>공중으로 띄워 올립니다</status>.", // 수호자의 심판
    },
    "Samira": { // 사미라
        "P": "사미라가 마지막으로 맞힌 공격과 다른 기본 공격 또는 스킬을 적중시키면 콤보를 1회 쌓습니다. 근접 공격 사거리 내에 있는 적을 공격하면 추가 마법 피해를 입힙니다. <status>이동 불가</status> 효과에 영향을 받은 적에게 기본 공격을 가하면 최대 사거리까지 돌진합니다. 해당 적이 <status>공중으로 띄워진</status> 상태라면 사미라도 대상을 잠시 동안 <status>공중으로 띄워 올립니다</status>.", // 무모한 충동 — CD 요약본, 직접 다듬을 것
        "Q": "사미라가 총을 쏴 처음 맞은 적에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다.<br><br>근접 공격 사거리 내에 있는 적에게 이 스킬을 사용하면, 사미라가 검으로 베어 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다.", // 천부적 재능
        "W": "사미라가 {v1}초 동안 주변에 검을 휘두르며 적들을 두 번 공격해 각각 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입히고 범위 안으로 들어오는 적의 투사체를 모두 파괴합니다.<br><br>", // 원형 검무
        "E": "사미라가 적(구조물 포함)을 통과해 돌진합니다. 돌진 도중 통과하는 모든 적을 베어 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 <attackspeed>{v3}%의 공격 속도</attackspeed>를 얻습니다. <br><br>사미라가 피해를 입힌 적 챔피언이 3초 안에 처치되면 이 스킬의 재사용 대기시간이 초기화됩니다.", // 거침없는 질주
        "R": "사미라의 <keywordmajor>스타일</keywordmajor> 등급이 S등급일 때만 이 스킬을 사용할 수 있습니다. 이 스킬을 사용하면 <keywordmajor>스타일</keywordmajor> 등급이 초기화됩니다.<br><br>사미라가 무기를 난사해 2초 동안 10회에 걸쳐 주변의 모든 적에게 공격을 퍼붓습니다. 각 사격은 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히며 {v2}%의 생명력 흡수가 적용됩니다. 또한 치명타가 적용될 수 있습니다.", // 지옥불 난사
    },
    "Sion": { // 사이온
        "P": "사이온은 사망한 이후 잠시 되살아나지만 체력이 급속히 떨어집니다. 이 동안 사이온은 매우 빠르게 공격하며 체력을 회복합니다. 공격 적중 시 대상 최대 체력에 비례해 추가 피해를 입힙니다.", // 영광스러운 죽음 — CD 요약본, 직접 다듬을 것
        "Q": "<charge>충전 시작 시</charge>: 사이온이 최대 2초간 강력한 일격을 충전합니다.<br><br><release>발사 시</release>: 사이온이 도끼를 내리쳐 적들을 잠시 <status>둔화</status>시키고 충전 시간에 비례해 <physicaldamage>{v1}~{v2}의 물리 피해</physicaldamage>를 입힙니다. 최소 1초 이상 충전했다면 적들을 <status>공중으로 띄워 올리고</status> {v3}~2.25초 충전했다면 <status>기절</status>시킵니다.", // 대량 학살 강타
        "W": "<passive>기본 지속 효과</passive>: 사이온은 유닛을 하나 처치할 때마다 <scalehealth>최대 체력이 {v1}</scalehealth> 증가합니다. 챔피언 처치 관여, 대형 미니언 또는 대형 몬스터 처치 시 최대 체력이 <scalehealth>{v2}</scalehealth> 증가합니다.<br><br><active>사용 시</active>: 사이온이 6초간 <shield>{v3}의 피해를 흡수하는 보호막</shield>을 얻습니다. {v4}초 후에 보호막이 지속 중이라면 스킬을 <recast>재사용</recast>하여 보호막을 폭발시키고 <magicdamage>{v5}+대상 최대 체력의 {v6}%에 해당하는 마법 피해</magicdamage>를 입힙니다.", // 영혼의 용광로
        "E": "사이온이 충격파를 발사해 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초간 적들을 {v3}% <status>둔화</status>시키며, {v4}초간 <scalearmor>방어력을 {v5}%</scalearmor> 감소시킵니다. 챔피언이 아닌 대상이 공격에 적중당하면 <status>뒤로 밀려납니다</status>. <status>뒤로 밀려난</status> 유닛에게 부딪힌 적들에게는 동일한 피해와 효과가 적용됩니다.", // 학살자의 포효
        "R": "사이온이 8초 동안 저지 불가 상태가 되어 마우스 커서 방향으로 돌진합니다. 사이온이 적 챔피언이나 벽과 충돌하거나 스킬을 <recast>재사용</recast>하면 멈춥니다. <br><br>돌진이 끝나면 이동 거리에 비례해 <physicaldamage>{v1}~{v2}의 물리 피해</physicaldamage>를 입힙니다. 사이온 주변에 있는 적들은 이동 거리에 비례해 {v3}~{v4}초간 <status>기절</status>합니다. 더 넓은 범위에 있는 적들은 3초간 {v5}% <status>둔화</status>됩니다.", // 멈출 수 없는 맹공
    },
    "Jade_Sion": { // 사이온
        "P": "사이온은 기본 공격으로 받는 피해를 40%의 확률로 최대 30/40/50만큼 무시합니다.", // 무감각 — CD 요약본, 직접 다듬을 것
        "Q": "<maintext>지정한 적을 무시무시하게 노려봐, <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 1.5초 동안 <status>기절</status>시킵니다.", // 무시무시한 응시
        "W": "<maintext>사이온이 <shield>{v1}의 피해</shield>를 흡수하는 보호막으로 자신을 감쌉니다. 보호막은 10초가 지날 때까지 파괴되지 않으면 폭발하여 주변 적에게 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.<br><br>4초 후에 <recast>재사용</recast>하면 보호막을 직접 폭파할 수 있습니다.", // 죽음의 포옹
        "E": "<toggle>활성화/비활성화: </toggle>사이온의 <physicaldamage>공격력</physicaldamage>이 {v1}만큼 증가하고, 적을 처치할 때마다 영구적으로 <scalehealth>{v2}의 최대 체력</scalehealth>을 얻습니다. 챔피언과 대형 미니언, 대형 몬스터에 대해서는 두 배의 효과가 적용됩니다.<br><br><scalehealth>체력 획득량: 총 {v3}</scalehealth>", // 격분
        "R": "<maintext>사이온이 20초 동안 <lifesteal>{v1}%의 생명력 흡수</lifesteal>와 <attackspeed>{v2}%의 공격 속도</attackspeed>를 얻습니다. 또한 기본 공격으로 입힌 피해의 {v3}%만큼 주변 아군의 <healing>체력을 회복</healing>시킵니다.", // 피의 향연
    },
    "Sylas": { // 사일러스
        "P": "스킬 사용 후 사일러스가 페트리사이트 폭발을 1회 충전합니다. 다음 기본 공격 시 충전량을 하나 소모하여 사슬을 세차게 휘두르며 적중한 적들에게 추가 마법 피해를 입힙니다. 페트리사이트 폭발이 충전되어 있으면 사일러스의 공격 속도가 증가합니다. ", // 페트리사이트 폭발 — CD 요약본, 직접 다듬을 것
        "Q": "사일러스가 사슬을 후려쳐 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 {v3} <status>둔화</status>시킵니다. 사슬이 교차하는 지점은 폭발해 <magicdamage>{v4}의 마법 피해</magicdamage>를 추가로 입힙니다.", // 사슬 후려치기
        "W": "사일러스가 마법의 힘으로 적에게 돌진해 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 챔피언에게 사용하면 사일러스가 잃은 체력에 비례해 <healing>{v2}</healing>~<healing>{v3}의 체력</healing>을 회복합니다. (체력이 {v4}% 이하일 때 최대 회복량 적용)", // 국왕시해자
        "E": "사일러스가 재빨리 돌진한 후 3.5초 동안 <recast>재사용</recast>을 준비합니다.<br><br><recast>재사용 시:</recast> 사일러스가 사슬을 던져 적에게 적중하면 사슬을 끌어당겨 적 방향으로 이동하며 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 <status>공중으로 띄워 올립니다</status>.", // 도주 / 억압
        "R": "사일러스가 적 챔피언의 궁극기를 강탈해 적과 똑같이 사용합니다. 효과는 사일러스의 궁극기 레벨과 능력치에 비례합니다.<br><br>적의 궁극기를 강탈하면 해당 궁극기 재사용 대기시간의 {v1}%(사일러스의 스킬 가속 적용)만큼 재사용 대기시간이 적용되어 사일러스가 그동안 해당 적의 궁극기를 다시 강탈할 수 없습니다. (최소 {v2}초)", // 강탈
    },
    "Shaco": { // 샤코
        "P": "샤코의 기본 공격과 양날 독을 뒤에서 사용하면 추가 피해를 입힙니다.", // 암습 — CD 요약본, 직접 다듬을 것
        "Q": "샤코가 근처로 순간이동해 {v1}초 동안 <keywordstealth>투명</keywordstealth> 상태가 됩니다. <spellname>깜짝 상자</spellname>나 <spellname>환각</spellname> 스킬을 사용해도 <keywordstealth>투명</keywordstealth> 상태는 유지됩니다.<br><br><keywordstealth>투명</keywordstealth> 상태에서 다음 기본 공격 시 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 추가로 입힙니다. 뒤에서 기본 공격 시 치명타가 적용되어 {v3}의 피해를 입힙니다.", // 속임수
        "W": "샤코가 {v1}초 뒤 시야에서 사라지는 상자를 남깁니다. 상자는 {v2}초 동안 보이지 않습니다. 적이 가까이 다가오거나 발각되면 발동해 주변 적 챔피언을 {v3}초 동안, 미니언과 정글 몬스터를 {v4}초 동안 <status>공포</status>에 빠뜨립니다.<br><br>상자가 발동되면 주변 모든 적을 5초 동안 공격해 <magicdamage>{v5}의 마법 피해</magicdamage>를 입히거나 단일 대상 공격 시 <magicdamage>{v6}의 피해</magicdamage>를 입힙니다.<br><br>깜짝 상자는 몬스터에게 <magicdamage>{v7}</magicdamage>의 추가 피해를 입힙니다.", // 깜짝 상자
        "E": "<passive>기본 지속 효과:</passive> 이 스킬이 재사용 대기 상태가 아닐 때 샤코가 기본 공격 시 {v1}초 동안 대상을 {v2}% <status>둔화</status>시킵니다.<br><br><active>사용 시:</active> 샤코가 단검을 던져 <magicdamage>{v3}의 마법 피해</magicdamage>를 입히고 대상을{v4}초 동안 {v2}% <status>둔화</status>시킵니다. 대상의 체력이 {v5}% 미만이면 <magicdamage>{v6}의 피해</magicdamage>를 입힙니다.", // 양날 독
        "R": "샤코가 잠시 사라졌다가 {v1}초 동안 유지되는 분신과 함께 다시 나타납니다. 분신은 처치되면 폭발하여 <magicdamage>{v2}의 마법 피해</magicdamage>를 입히고 즉시 발동하는 작은 <spellname>깜짝 상자</spellname> 세 개를 남깁니다. 분신은 샤코의 {v3}%에 해당하는 피해를 입히지만, 받는 피해량이 {v4}% 증가합니다.<br><br>작은 <spellname>깜짝 상자</spellname>는 <magicdamage>{v5}의 마법 피해</magicdamage>를 입히거나 단일 적 공격 시 <magicdamage>{v6}의 마법 피해</magicdamage>를 입히고 {v7}초 동안 적을 <status>공포</status>에 빠뜨립니다.<br>", // 환각
    },
    "Jade_Shaco": { // 샤코
        "P": "샤코가 유닛을 뒤에서 공격할 때 20%의 추가 피해를 입힙니다.", // 암습 — CD 요약본, 직접 다듬을 것
        "Q": "샤코가 근처로 순간이동하며 3.5초간 <keywordstealth>투명</keywordstealth> 상태가 됩니다.<br><br>이후 {v1}초 이내에 다음 기본 공격 시 치명타가 발동하여 {v2}의 피해를 입힙니다.<br>", // 속임수
        "W": "샤코가 {v1}초 뒤 <keywordstealth>투명</keywordstealth>해져 {v2}초 동안 유지되는 상자를 생성합니다. 상자는 적이 다가오면 활성화되어 근처의 적을 {v3}초간 <status>공포</status>에 빠뜨립니다.<br><br>활성화된 상자는 {v4}초 동안 주변 적을 공격하여 <magicdamage>{v5}의 마법 피해</magicdamage>를 입힙니다.", // 깜짝 상자
        "E": "<passive>기본 지속 효과:</passive> 이 스킬이 재사용 대기 상태가 아닐 때 샤코가 기본 공격 시 대상을 {v1}초 동안 {v2}% <status>둔화</status>시킵니다. 대상이 미니언인 경우 {v1}초간 공격의 명중률이 {v3}% 감소합니다.<br><br><active>사용 시:</active> 샤코가 단검을 던져 대상에게 <magicdamage>{v4}의 마법 피해</magicdamage>를 입히고 {v5}초 동안 {v2}% <status>둔화</status>시킵니다.", // 양날 독
        "R": "샤코가 잠시 사라졌다가 {v1}초 동안 유지되는 분신과 함께 다시 나타납니다. 분신은 샤코의 {v2}%에 해당하는 피해를 입히지만, {v3}% 증가한 피해를 받습니다.<br><br>분신은 처치되면 폭발하여 주변 적에게 <magicdamage>{v4}의 마법 피해</magicdamage>를 입힙니다.", // 환각
    },
    "Senna": { // 세나
        "P": "세나 근처에서 유닛이 쓰러지면 그 영혼이 주기적으로 검은 안개에 갇히게 됩니다. 세나는 해당 영혼을 공격하여 영혼을 죽음 속에 가둔 안개를 흡수하고 영혼을 해방시킬 수 있습니다. 안개는 세나의 유물포를 강화시켜 추가 공격력, 공격 사거리, 치명타 확률을 부여합니다. <br><br>세나의 유물포 공격 속도가 느려지고 추가 피해를 입히며 잠시 공격 대상의 이동 속도를 일부 흡수합니다.", // 면죄 — CD 요약본, 직접 다듬을 것
        "Q": "세나가 아군 또는 적을 관통하는 그림자를 발사하여 적에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 {v2}초간 {v3}만큼 <status>둔화</status>시킵니다. 아군 챔피언에게는 <healing>{v4}의 체력</healing>을 회복시킵니다. <br><br>기본 공격 시 스킬의 재사용 대기시간이 {v5}초 감소합니다.", // 꿰뚫는 어둠
        "W": "세나가 검은 안개를 방출하여 첫 번째로 적중한 적에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다. 또한 {v2}초 후 해당 적과 주변의 모든 적들은 {v3}초 동안 <status>속박</status>됩니다.", // 마지막 포옹
        "E": "세나가 {v1}초 동안 검은 안개에 흡수되어 망령이 됩니다. 안개에 들어간 아군 챔피언들은 <keywordstealth>위장</keywordstealth> 상태가 되며 바깥으로 나오면 망령이 됩니다. 망령 상태에서는 <speed>{v2}의 이동 속도</speed>를 얻습니다. 또한 대상으로 지정할 수 없는 상태가 되며 적 챔피언이 가까이에 없는 한 정체를 숨길 수 있습니다.", // 검은 안개의 저주
        "R": "세나가 빛줄기를 발사합니다. 빛줄기에 맞은 적 챔피언은 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입습니다. 더 넓은 범위에 맞은 아군 챔피언은 {v2}초 동안 <shield>{v3}의 피해를 흡수하는 보호막</shield>을 얻습니다.", // 여명의 그림자
    },
    "Seraphine": { // 세라핀
        "P": "세라핀이 세 번째 기본 스킬을 사용할 때마다 두 번 사용됩니다. 추가로 아군 근처에서 스킬을 사용하면 다음 기본 공격이 추가 마법 피해를 입히고 사거리가 증가합니다.", // 무대 장악 — CD 요약본, 직접 다듬을 것
        "Q": "세라핀이 맑은 음을 노래해 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 챔피언과 몬스터의 경우 대상 잃은 체력에 비례해 피해량이 증가하며, 대상의 체력이 {v2}% 이하일 때까지 최대 <magicdamage>{v3}의 피해</magicdamage>를 입힙니다.", // 고음
        "W": "세라핀이 노래로 주변 아군을 감싸 {v1}초 동안 아군의 <speed>이동 속도가 {v2}</speed> 상승하고, 자신의 <speed>이동 속도가 {v3}</speed> 상승하며 <shield>{v4}의 피해를 흡수하는 보호막</shield>을 얻습니다. 이동 속도는 점차 원래대로 돌아옵니다.<br><br>세라핀에게 이미 <shield>보호막</shield>이 있으면 아군을 불러 모아 {v5}초 후 <healing>잃은 체력의 {v6}%</healing>만큼 체력을 회복시킵니다.", // 소리 장막
        "E": "세라핀이 묵직한 음파를 발사하여 일직선상에 있는 적들에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 {v3}% <status>둔화</status>시킵니다.<br><br>이미 <status>둔화</status>된 적들은 <status>속박</status>되며, <status>이동 불가</status> 상태인 적들은 <status>기절</status>합니다.", // 비트 발사
        "R": "무대를 장악한 세라핀이 사로잡는 힘을 날려 {v1}초 동안 적을 <status>매혹</status>하고 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.<br><br>챔피언(아군, 적 무관)에게 적중 시 이 스킬의 사거리가 늘어나고 아군 챔피언은 <keywordmajor>음표</keywordmajor> 중첩을 최대로 얻습니다.", // 앙코르
    },
    "Sejuani": { // 세주아니
        "P": "세주아니는 일정 시간 동안 피해를 입지 않으면 서리 갑옷이 생겨 추가 방어력과 마법 저항력을 얻고 둔화 효과에 면역됩니다. 서리 갑옷은 세주아니가 피해를 입은 후에도 잠깐 동안 유지됩니다. 기절한 적을 공격하면 막대한 마법 피해를 입힐 수 있습니다.", // 혹한의 분노 — CD 요약본, 직접 다듬을 것
        "Q": "세주아니가 돌진하며 적들에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 <status>공중으로</status> <status>띄워 올립니다</status>. 적 챔피언에게 충돌하면 돌진을 멈춥니다.", // 혹한의 맹습
        "W": "세주아니가 철퇴를 휘둘러 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 미니언과 정글 몬스터를 <status>뒤로 밀어냅니다</status>. 곧이어 한 번 더 철퇴를 휘둘러 <physicaldamage>{v2}의 물리 피해를 입히고</physicaldamage> 잠깐 <status>둔화</status>시킵니다.<br><br>두 번 모두 <spellname>만년 서리</spellname>의 중첩이 쌓입니다.", // 혹한의 서릿발
        "E": "<passive>기본 지속 효과:</passive> 근처 아군 근접 챔피언이 적 챔피언 또는 정글 몬스터를 기본 공격하면 중첩이 쌓입니다.<br><br><passive>사용 시:</passive> 세주아니가 중첩이 4회 쌓인 대상에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 <status>기절</status>시킵니다.", // 만년 서리
        "R": "세주아니가 얼음 정수 올가미를 던져 {v1}초 동안 처음 맞힌 챔피언의 모습을 드러내고 <status>기절</status>시키며, <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.<br><br>올가미가 사거리의 25% 이상 날아가 적중할 경우 {v3}초 동안 모습을 드러내고 <status>기절</status>시킵니다. 또한 {v4}초 동안 주변 적들을 {v5}% <status>둔화</status>시키는 얼음 폭풍을 일으킵니다. 스킬에 영향을 받은 모든 적은 <magicdamage>{v6}의 마법 피해</magicdamage>를 입습니다.", // 빙하 감옥
    },
    "Sett": { // 세트
        "P": "세트는 기본 공격 시 양 주먹을 번갈아 사용합니다. 오른쪽 주먹이 약간 더 강하고 빠릅니다. 또한 세트는 불굴의 의지로 잃은 체력에 비례해 추가로 체력을 회복합니다.", // 투기장의 투지 — CD 요약본, 직접 다듬을 것
        "Q": "세트가 싸움을 찾아 적 챔피언을 향해 이동할 때 {v1}초 동안 <speed>이동 속도가 {v2}%</speed> 증가합니다.<br><br>또한 세트의 다음 두 번의 기본 공격은 <physicaldamage>{v3}+최대 체력의 {v4}에 해당하는 물리 피해</physicaldamage>를 추가로 입힙니다.", // 주먹다짐
        "W": "<passive>기본 지속 효과:</passive> 세트가 받은 피해량의 {v1}%를 최대 <keywordmajor>{v2}</keywordmajor>까지 <keywordmajor>투지</keywordmajor>로 저장합니다. <keywordmajor>투지</keywordmajor>는 피해를 입고 {v3}초 후에 빠르게 감소합니다.<br><br><active>사용 시:</active> 세트가 모든 <keywordmajor>투지</keywordmajor>를 소모해 <shield>소모한 투지의 {v4}%에 해당하는 보호막</shield>을 얻습니다. 보호막은 {v5}초에 걸쳐 사라집니다. 이후 세트가 강력한 펀치를 날려 중심에 있는 적에게 <truedamage>{v6}+소모한 투지의 {v7}에 해당하는 고정 피해</truedamage>를 입힙니다. (최대 <truedamage>{v8}의 피해</truedamage>) 중심에 있지 않은 적은 <physicaldamage>물리 피해</physicaldamage>를 입습니다.", // 강펀치
        "E": "세트가 양옆에 있는 적들을 서로 부딪치게 하여 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 {v2}초 동안 {v3}% <status>둔화</status>시킵니다. 양옆에 최소 한 명씩의 적을 붙잡았다면 부딪힌 모든 적들이 {v4}초 동안 <status>기절</status>합니다.", // 안면 강타
        "R": "세트가 적 챔피언을 붙잡고 <status>제압</status>한 후 앞으로 도약해 바닥에 내리꽂습니다. 주변에 있는 적은 <physicaldamage>{v1}+붙잡은 적 추가 체력의 {v2}%에 해당하는 물리 피해</physicaldamage>를 입고 {v3}초 동안 {v4}% <status>둔화</status>됩니다. 세트가 착지하는 지점에서 멀리 떨어질수록 더 적은 피해를 입습니다.", // 대미 장식
    },
    "Sona": { // 소나
        "P": "<passive>아첼레란도</passive>: 소나가 기본 스킬을 잘 사용하면 최대치가 될 때까지 영구적으로 궁극기를 제외한 스킬 가속 효과를 얻습니다. 최대치에 도달한 후 스킬을 성공적으로 사용하면 중첩이 쌓이는 대신 남은 궁극기 재사용 대기시간이 감소합니다.<br><br><passive>파워 코드</passive>소나가 스킬을 특정 횟수 사용하고 나면 다음 기본 공격이 추가 마법 피해를 입히고, 소나가 마지막으로 사용한 기본 스킬에 따라 그 효과가 더 증폭될 수 있습니다.", // 파워 코드 — CD 요약본, 직접 다듬을 것
        "Q": "소나가 근처의 적 두 명(챔피언 우선)에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 그리고 새로운 <keywordmajor>멜로디</keywordmajor>를 연주하기 시작합니다. 이 스킬로 챔피언에게 피해를 입히면 <keywordmajor>아첼레란도</keywordmajor> 중첩을 얻습니다.<br><br><keywordmajor>멜로디:</keywordmajor> {v2}초 동안 소나 주위에 오라가 생깁니다. 오라에 닿은 아군 챔피언들은 {v3}초 안에 다음 기본 공격 시 <magicdamage>{v4}의 마법 피해</magicdamage>를 추가로 입힙니다.<br><br><keywordmajor>파워 코드 - 스타카토:</keywordmajor> 파워 코드 추가 피해 (<magicdamage>총 {v5}의 마법 피해</magicdamage>)", // 용맹의 찬가
        "W": "<passive>사용 시:</passive> 소나가 자신 및 근처 아군 챔피언 한 명(가장 많이 피해를 입은 챔피언)의 <healing>체력을 {v1}</healing> 회복합니다. 그리고 새로운 <keywordmajor>멜로디</keywordmajor>를 연주하기 시작합니다.<br><br><keywordmajor>멜로디:</keywordmajor> {v2}초 동안 소나 주위에 오라가 생깁니다. 오라에 닿은 아군 챔피언들은 {v3}초 동안 <shield>{v4}의 피해를 흡수하는 보호막</shield>을 얻습니다.<br><br>부상당한 아군의 체력을 회복시키거나 이 보호막으로 다른 아군이 받을 피해를 {v5} 이상 흡수할 때마다 <keywordmajor>아첼레란도</keywordmajor> 중첩을 얻습니다.<br><br><keywordmajor>파워 코드 - 디미누엔도:</keywordmajor> 파워 코드는 대상이 가하는 물리 및 마법 피해 또한 {v6}초 동안 {v7} 감소시킵니다.", // 인내의 아리아
        "E": "<passive>사용 시:</passive> 소나가 새 <keywordmajor>멜로디</keywordmajor>를 연주하기 시작하여 {v1}초 동안 <speed>{v2}의 이동 속도</speed>를 얻습니다. 소나가 피해를 입지 않으면 최대 {v3}초까지 연장됩니다. <br><br><keywordmajor>멜로디:</keywordmajor> {v4}초 동안 소나 주위에 오라가 생깁니다. 오라에 닿은 아군 챔피언들은 {v5}초 동안 <speed>이동 속도가 {v6}</speed> 상승합니다.<br><br><keywordmajor>파워 코드 - 템포:</keywordmajor> 파워 코드는 대상을 {v7}초 동안 {v8} <status>둔화</status>시킵니다.", // 기민함의 노래
        "R": "소나가 저항할 수 없는 선율을 연주하여 적을 {v1}초 동안 <status>기절</status>시키고 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.", // 크레센도
    },
    "Jade_Sona": { // 소나
        "P": "소나는 스킬을 3회 사용한 뒤 다음 기본 공격을 가하면 추가 마법 피해를 입히고, 대상이 입히는 피해를 몇 초 동안 감소시킵니다.", // 파워 코드 — CD 요약본, 직접 다듬을 것
        "Q": "<keywordmajor>지속 오라:</keywordmajor> 주변 아군 챔피언에게 {v1}의 <physicaldamage>공격력</physicaldamage>과 <magicdamage>주문력</magicdamage>을 부여합니다.<br><br><active>사용 시:</active> 가장 가까운 적 {v2}명(챔피언 우선)에게 <magicdamage>{v3}의 마법 피해</magicdamage>를 입힙니다.", // 용맹의 찬가
        "W": "<keywordmajor>지속 오라:</keywordmajor> 주변 아군 챔피언에게 {v1}의 <scalearmor>방어력</scalearmor>과 <scalemr>마법 저항력</scalemr>을 부여합니다.<br><br><active>사용 시:</active> 소나와 근처의 피해를 가장 많이 받은 아군 챔피언이 <healing>{v2}의 체력</healing>을 회복합니다.", // 인내의 아리아
        "E": "<keywordmajor>지속 오라:</keywordmajor> 주변 아군 챔피언에게 <speed>{v1}의 이동 속도</speed>를 부여합니다.<br><br><active>사용 시:</active> 주변 아군 챔피언에게 {v2}초 동안 <speed>{v3}%의 이동 속도</speed>를 부여합니다.", // 기민함의 노래
        "R": "저항할 수 없는 선율을 연주하여 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고, 적 챔피언을 1.5초 동안 강제로 <status>춤추게</status> 합니다.", // 크레센도
    },
    "Soraka": { // 소라카
        "P": "소라카는 체력이 낮은 아군 쪽으로 이동할 때 속도가 더 빨라집니다.", // 구원 — CD 요약본, 직접 다듬을 것
        "Q": "소라카가 별을 떨어뜨려 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 {v3}% <status>둔화</status>시킵니다. <br><br>적 챔피언에게 적중하면 소라카가 <keywordmajor>별의 가호</keywordmajor>를 얻어 {v4}초에 걸쳐 <healing>체력을 {v5}</healing> 회복하고 <speed>이동 속도가 {v6}%</speed> 증가했다가 원래대로 돌아옵니다.", // 별부름
        "W": "소라카가 다른 아군 챔피언의 <healing>체력을 {v1}</healing>만큼 회복시킵니다.<br><br>소라카가 <keywordmajor>별의 가호</keywordmajor>를 받고 있으면 체력 소모량이 {v2}% 감소하며 대상도 @Spell.SorakaQ:HoTDuration@초 동안 <keywordmajor>별의 가호</keywordmajor>를 받습니다.", // 은하의 마력
        "E": "소라카가 별의 영역을 생성해 챔피언에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 영역은 {v2}초 동안 유지되며 안에 있는 적을 <status>침묵</status>시킵니다. 영역이 사라지면 안에 있던 챔피언은 {v3}초 동안 <status>속박</status>되며 <magicdamage>{v1}의 마법 피해</magicdamage>를 입습니다.", // 별의 균형
        "R": "소라카가 신의 권능을 빌어 거리와 관계없이 모든 아군 챔피언의 <healing>체력을 {v1}</healing>만큼 회복시킵니다. 체력이 40% 아래인 대상에게는 회복 효과가 <healing>{v2}</healing>까지 증가합니다.", // 기원
    },
    "Jade_Soraka": { // 소라카
        "P": "주변 아군의 마법 저항력을 16 증가시킵니다.", // 신성화 — CD 요약본, 직접 다듬을 것
        "Q": "소라카가 별의 힘으로 주변의 모든 적을 타격해, <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 <scalemr>마법 저항력</scalemr>을 {v3}만큼 감소시킵니다. (최대 {v4}회 중첩)", // 별부름
        "W": "<maintext>아군의 <healing>체력을 {v1}</healing> 회복시키고, 3초 동안 <scalearmor>{v2}의 방어력</scalearmor>을 부여합니다.", // 은하의 축복
        "E": "아군 챔피언에게 사용 시 <scalemana>{v1}의 마나</scalemana>를 회복시킵니다. (자기 자신에게는 사용 불가)<br><br>적에게 사용 시 <magicdamage>{v2}의 마법 피해</magicdamage>를 입히고 {v3}초 동안 <status>침묵</status>시킵니다.", // 마력 주입
        "R": "<maintext>신의 권능을 빌어 모든 아군 챔피언의 체력을 즉시 <healing>{v1}</healing>만큼 회복시킵니다.", // 기원
    },
    "Shen": { // 쉔
        "P": "스킬을 사용하면 쉔이 보호막을 얻습니다. 다른 챔피언에게 스킬로 영향을 주면 이 효과의 재사용 대기시간이 감소합니다.", // 기 보호막 — CD 요약본, 직접 다듬을 것
        "Q": "쉔이 <keywordmajor>기의 검</keywordmajor>을 불러냅니다. 기의 검에 부딪히는 적들은 {v1}초 동안 쉔으로부터 멀어지려 할 때 {v2}% <status>둔화</status>됩니다.<br><br>쉔의 다음 기본 공격 {v3}회는 <magicdamage>{v4}</magicdamage>+<magicdamage>최대 체력의 {v5}에 해당하는 마법 피해</magicdamage>를 추가로 입힙니다. <keywordmajor>기의 검</keywordmajor>이 적 챔피언에게 부딪힌 경우, <magicdamage>{v4}</magicdamage>+<magicdamage>최대 체력의 {v6}에 해당하는 마법 피해</magicdamage>를 입힙니다. 또한 <attackspeed>공격 속도가 {v7}%</attackspeed> 증가합니다.", // 황혼 강습
        "W": "쉔이 <keywordmajor>기의 검</keywordmajor> 위치에 {v1}초 동안 지속되는 보호 결계를 생성합니다. 결계 안의 아군 챔피언에 대한 기본 공격이 차단됩니다. <br><br>결계 안에 보호할 아군 챔피언이 없으면 {v2}초가 지나기 전까지 활성화되지 않습니다.", // 의지의 결계
        "E": "<passive>기본 지속 효과:</passive> <spellname>황혼 강습</spellname>이나 이 스킬로 피해를 입히면 <keywordmajor>{v1}의 기력</keywordmajor>을 회복합니다.<br><br><active>사용 시:</active> 쉔이 돌진해 적 챔피언과 정글 몬스터를 {v2}초 동안 <status>도발</status>하고 <physicaldamage>{v3}의 물리 피해</physicaldamage>를 입힙니다.", // 그림자 돌진
        "R": "아군 챔피언이 맵의 어느 위치에 있든 {v1}초간 대상이 잃은 체력에 비례해 <shield>{v2}</shield>~<shield>{v3}</shield>의 피해를 흡수하는 보호막을 씌워줍니다. (잃은 체력의 최대 60%) {v4}초 동안 정신을 집중한 후, 쉔과 <keywordmajor>기의 검</keywordmajor>이 해당 아군의 위치로 순간이동합니다.", // 단결된 의지
    },
    "Shyvana": { // 쉬바나
        "P": "적 챔피언, 대형 미니언, 대형 몬스터 처치 관여 시 쉬바나가 미늘갑옷 중첩을 얻어 방어력 및 마법 저항력이 증가합니다.", // 미늘갑옷 — CD 요약본, 직접 다듬을 것
        "Q": "<passive>기본 지속 효과:</passive> 기본 공격 <onhit> 적중 시</onhit> <magicdamage>최대 체력의 {v1}만큼 마법 피해</magicdamage>를 입히고, 이 스킬의 재사용 대기시간이 {v2}초 감소합니다.<br><br><active>사용 시:</active> 쉬바나의 다음 기본 공격이 대상 및 주변 지역을 타격해 <physicaldamage>{v3}의 물리 피해</physicaldamage>를 입힙니다. 이 스킬은 공격 후 또는 잠시 후 {v4}초 안에 <recast>재사용</recast>할 수 있습니다.<br><br><keywordmajor>용 형상:</keywordmajor> 쉬바나가 추가로 1회 더 <recast>재사용</recast>할 수 있으며 다음 기본 공격 시 대상을 물어뜯어 <truedamage>{v5}의 고정 피해</truedamage>를 입힙니다.", // 잉걸불 일격
        "W": "쉬바나가 {v1}초 동안 화염으로 몸을 감싸 <shield>{v2}의 보호막</shield>을 얻습니다. 보호막 흡수량은 주변 적 챔피언 한 명당 <shield>{v3}</shield>만큼 증가합니다. 또한 <speed>이동 속도가 {v4}</speed> 증가하며, 적 챔피언에게 접근 시 <speed>{v5}</speed>까지 증가합니다.<br><br>효과가 종료되거나 <shield>보호막</shield>이 파괴되거나 스킬을 <recast>재사용</recast>할 경우 폭발하여 주변에 <magicdamage>{v6}의 마법 피해</magicdamage>를 입힙니다.<br><br><keywordmajor>용 형상:</keywordmajor> 폭발이 적 챔피언에게 적중하면 쉬바나가 <healing>{v7}+잃은 체력의 {v8}</healing>에 해당하는 체력을 회복합니다.", // 지옥불 방패
        "E": "쉬바나가 대상 지역에 화염구를 날려 <magicdamage>{v1}+최대 체력의 {v2}에 해당하는 마법 피해</magicdamage>를 입히고 <status>{v3}초 동안 {v4}만큼 둔화</status>시킵니다. 화염구가 적에게 적중하거나 한계에 도달하면 폭발합니다.<br><br><keywordmajor>용 형상:</keywordmajor> 쉬바나의 화염구가 더 커지고 적을 관통합니다. 챔피언 또는 대형 몬스터에게 적중하거나 한계에 도달하면 불의 파동을 일으켜 <magicdamage>{v5}+최대 체력의 {v6}에 해당하는 마법 피해</magicdamage>를 입히고 <status>{v3}초 동안 {v7}만큼 둔화</status>시킵니다. 화염구가 지나간 자리에 {v8}초 동안 흔적이 남아 <magicdamage>매초 {v9}의 마법 피해</magicdamage>를 입힙니다.", // 용암 분출
        "R": "<passive>기본 지속 효과</passive>: 쉬바나가 기본 공격 또는 스킬로 적을 타격하면 <keywordmajor>용의 분노가 {v1}</keywordmajor> 생성됩니다. 용의 분노 생성량은 <keywordmajor>용 형상</keywordmajor>일 때 {v2} 증가하며, 챔피언이 아닌 대상에게 광역 피해를 입힐 때 {v3} 감소합니다.<br><br><active>사용 시</active>: 쉬바나가 <keywordmajor>용 형상</keywordmajor>으로 변신해 <attention>저지 불가</attention> 상태가 되고, 대상 위치로 날아가며 경로에 불을 내뿜습니다. 범위 내 적은 <magicdamage>{v4}의 마법 피해</magicdamage>를 입고 <status>{v5}초 동안 달아납니다</status>.<br><br>용 형상일 때 쉬바나의 기본 스킬이 강화됩니다. 또한 <scalehealth>{v6}의 추가 체력</scalehealth>을 얻고, 크기가 커지며, 공격 사거리가 증가합니다. 쉬바나는 지속적으로 <keywordmajor>용의 분노</keywordmajor>를 잃으며, 남은 <keywordmajor>용의 분노</keywordmajor>가 없을 경우 변신이 종료됩니다.", // 용의 강림
    },
    "Smolder": { // 스몰더
        "P": "스킬로 챔피언을 맞히고 초강력 화염 숨결 스킬로 적을 처치하면 용 훈련 중첩을 1회 얻습니다. 중첩이 쌓이면 스몰더 기본 스킬의 피해량이 증가합니다.", // 용 훈련 — CD 요약본, 직접 다듬을 것
        "Q": "스몰더가 불꽃을 내뿜어 <physicaldamage>{v1}의 물리 피해</physicaldamage>+<magicdamage>@spell.SmolderP:Passive_QDamageIncrease@의 마법 피해</magicdamage>를 입힙니다. 대상이 사망하면 스몰더가 스킬 사용 한 번당 <scalemana>{v2}의 마나</scalemana>를 돌려받습니다.<br><br>이 스킬은 <spellname>용 훈련</spellname> 중첩 수에 따라 진화하며 다음과 같은 효과를 얻습니다.<li><keywordmajor>{v3}회 중첩</keywordmajor>: 대상 주변의 모든 적에게 피해를 입힙니다.<li><keywordmajor>{v4}회 중첩</keywordmajor>: 이 스킬 피해량의 {v5}%만큼 피해를 입히는 폭발 <spellname>{v6}</spellname>개를 대상 너머로 날립니다.<li><keywordmajor>{v7}회 중첩</keywordmajor>: 대상을 불태우며 {v8}초에 걸쳐 <truedamage>최대 체력의 {v9}에 해당하는 고정 피해</truedamage>를 입힙니다. 불타는 동안 총 체력이 <truedamage>{v10}</truedamage> 밑으로 떨어지는 적 챔피언은 즉시 처치됩니다.", // 초강력 화염 숨결
        "W": "스몰더가 앙증맞은 불꽃 재채기를 내뿜어 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 {v2}초 동안 {v3}% <status>둔화</status>시킵니다.<br><br>챔피언에게 적중하면 폭발이 일어나며 <physicaldamage>{v4}의 물리 피해</physicaldamage>+<magicdamage>@spell.SmolderP:Passive_WDamageIncrease@의 마법 피해</magicdamage>를 입힙니다.", // 에취!
        "E": "스몰더가 하늘을 날며 {v1}초 동안 <speed>이동 속도가 {v2}%</speed> 증가하고 지형을 무시합니다.<br><br>스몰더는 비행하는 동안 체력이 가장 낮은 적을 <spellname>{v3}</spellname>(내림 적용)회 폭격해 공격 적중 시 <physicaldamage>{v4}의 물리 피해</physicaldamage>+<magicdamage>@spell.SmolderP:EBonusDamage@의 마법 피해</magicdamage>를 입힙니다.", // 펄럭펄럭
        "R": "스몰더의 어미가 위에서 불을 내뿜어 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다. 중심에 있는 적은 그 대신 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입고 {v3}초 동안 {v4}% <status>둔화</status>됩니다.<br><br>스몰더의 어미가 스몰더를 맞히면 스몰더가 <healing>체력을 {v5}</healing> 회복합니다.", // 엄마아아아!
    },
    "Swain": { // 스웨인
        "P": "까마귀가 스웨인의 체력을 회복시키고 최대 체력을 영구적으로 증가시키는 '영혼 조각'을 모읍니다.", // 굶주린 새떼 — CD 요약본, 직접 다듬을 것
        "Q": "스웨인이 섬뜩한 번개를 5개 방출해 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 번개가 여러 번 적중하면 두 번째 번개부터 번개당 <magicdamage>{v2}의 마법 피해</magicdamage>를 추가로 입힙니다. (최대 <magicdamage>{v3}의 마법 피해</magicdamage>)", // 죽음의 손길
        "W": "스웨인이 악마의 눈을 소환해 1.5초 동안 일정 지역을 드러낸 후 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 {v3}% <status>둔화</status>시킵니다.<br><br>챔피언이 적중당하면 스웨인이 <font color='#FF3F3F' size='18'>영혼 조각</font>을 얻고 {v4}초 동안 적중당한 챔피언의 모습을 드러냅니다.", // 제국의 눈
        "E": "스웨인이 악마의 파동을 발사합니다. 파동은 돌아오며 처음으로 적에게 부딪히는 순간 폭발해 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 대상 지역에 있는 적을 {v2}초 동안 <status>속박</status>합니다.<br><br>챔피언을 <status>속박</status>하면 이 스킬을 다시 사용해 <spellname>속박명령</spellname>으로 <status>속박</status>된 모든 챔피언을 끌어당겨 챔피언 하나당 <font color='#FF3F3F' size='18'>영혼 조각</font> 하나를 획득할 수 있습니다.", // 속박명령
        "R": "스웨인이 악을 끌어내 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 매초 주변 적의 <healing>체력을 {v2}</healing> 흡수합니다. 악마의 기운은 시간이 지나면서 소진되지만 적 챔피언을 흡수해 무한히 충전할 수 있으며 챔피언 처치 관여 시 완전히 충전됩니다.<br><br>{v3}초 후 그리고 {v4}초가 지날 때마다 스웨인이 변신 상태에서 <spellname>악의 불길</spellname>을 사용해 적에게 <magicdamage>{v5}의 마법 피해</magicdamage>를 입히고 {v6}% <status>둔화</status>시킬 수 있습니다. 둔화 효과는 {v7}초에 걸쳐 사라집니다.", // 악의 승천
    },
    "Skarner": { // 스카너
        "P": "스카너의 기본 공격, 부서진 대지, 지반 돌출, 꿰뚫기가 전율을 적용합니다. 전율 최대 중첩 시 지속시간 동안 적들이 최대 체력 비례 마법 피해를 입습니다.", // 진동의 가닥 — CD 요약본, 직접 다듬을 것
        "Q": "스카너가 땅에서 바위를 뜯어내 다음 기본 공격 3회의 <attackspeed>공격 속도를 {v1}%</attackspeed> 강화하고 주변 적에게 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입힙니다. 마지막 기본 공격은 <physicaldamage>최대 체력의 {v3}%에 해당하는 물리 피해</physicaldamage>를 추가로 입히고 영향을 받은 적을 {v4}초 동안 {v5}% <status>둔화</status>시킵니다.<br><br><recast>재사용 시:</recast> 스카너가 이 스킬을 끝내고 바위를 던져 <physicaldamage>@spell.SkarnerQ:AbilityDamage@+최대 체력의 @spell.SkarnerQ:MaxHPPercent*100@%에 해당하는 물리 피해</physicaldamage>를 입히고 추가로 처음 적중한 적과 그 주변에 있는 적을 @spell.SkarnerQ:SlowDuration@초 동안 @spell.SkarnerQ:SlowPercent*100@% <status>둔화</status>시킵니다.", // 부서진 대지/지반 돌출
        "W": "스카너가 {v1}초 동안 <shield>{v2}의 피해를 흡수하는 보호막</shield>을 얻으며 지진을 일으켜 주변 적에게 <magicdamage>{v3}의 마법 피해</magicdamage>를 입히고 {v4}초 동안 {v5}%의 <status>둔화</status> 효과를 적용합니다.", // 대지의 수호자
        "E": "스카너가 앞으로 돌진하며 지형을 무시하고 지정한 방향으로 움직입니다. 챔피언이나 대형 몬스터와 마주치면 돌진이 끝날 때까지 끌고 다닙니다.<br><br>끌고 온 적과 함께 벽에 부딪치면 해당 적은 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입고 {v2}초 동안 <status>기절</status>합니다.<br><br>스킬을 <recast>재사용</recast>하면 돌진을 일찍 끝낼 수 있습니다.", // 이쉬탈의 격돌
        "R": "스카너가 꼬리를 앞으로 후려쳐 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 처음 적중한 챔피언 3명을 {v2}초 동안 <status>제압</status>합니다. 적중한 적은 스킬의 지속시간 동안 스카너를 따라 끌려다닙니다.<br><br>챔피언이 한 명이라도 적중하면 스카너의 <speed>이동 속도가 {v3}초 동안 {v4}%</speed> 증가합니다.<br><br><spellname>부서진 대지</spellname> 활성화 시 스카너가 <spellname>지반 돌출</spellname>부터 사용합니다.", // 꿰뚫기
    },
    "Jade_Skarner": { // 스카너
        "P": "기본 공격 시 모든 스킬의 재사용 대기시간이 0.5초 감소합니다. 챔피언에게 기본 공격을 가하면 효과가 두 배로 적용됩니다.", // 솟아오르는 힘 — CD 요약본, 직접 다듬을 것
        "Q": "스카너가 주변의 모든 적에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고, 유닛을 맞혔다면 5초 동안 <keywordmajor>수정 에너지</keywordmajor>를 충전합니다.<br><br>수정 에너지가 충전된 상태로 기본 공격이나 <spellname>수정 베기</spellname>를 사용하면 <magicdamage>{v2}의 추가 마법 피해</magicdamage>를 입히고 2초 동안 {v3}% <status>둔화</status>시킵니다.", // 수정 베기
        "W": "스카너가 6초 동안 {v1}의 피해를 흡수하는 <shield>보호막</shield>을 얻습니다. 보호막이 지속되는 동안 <attackspeed>공격 속도가 {v2}%</attackspeed>, <speed>이동 속도가 {v3}%</speed> 증가합니다.", // 수정 외골격
        "E": "스카너가 일직선상의 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 6초 동안 표식을 남깁니다.<br><br>표식이 있는 적을 공격하면 이를 소모하여 {v2}의 <healing>체력을 회복</healing>합니다. 체력 회복 효과는 대상이 아예 처치되어도 발동합니다. (발동할 때마다 체력 회복량이 50%씩 감소합니다.)", // 균열
        "R": "스카너가 적 챔피언을 1.75초 동안 <status>제압</status>하고 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 그동안 스카너는 제압된 대상을 끌고 다니며 자유롭게 이동할 수 있습니다. 효과가 종료되면 대상이 <magicdamage>{v1}의 마법 피해</magicdamage>를 추가로 받습니다.", // 꿰뚫기
    },
    "Sivir": { // 시비르
        "P": "시비르가 적 챔피언을 공격할 때 짧은 시간 동안 이동 속도가 대폭 상승합니다.", // 재빠른 발놀림 — CD 요약본, 직접 다듬을 것
        "Q": "시비르가 십자날 검을 부메랑처럼 던져서 관통하는 모든 적 챔피언에게 <physicaldamage>{v1}</physicaldamage>의 피해를 입힙니다. 챔피언이 아닌 대상에게는 순차적으로 감소된 피해를 입힙니다. 피해량은 최소 {v2}%까지 내려갈 수 있습니다.", // 부메랑 검
        "W": "{v1}초 동안 시비르가 <attackspeed>{v2}%의 공격 속도</attackspeed>를 획득하고 기본 공격이 강화되어 주위 적들에게 튕길 때마다 <physicaldamage>{v3}의 물리 피해</physicaldamage>를 입힙니다. 공격은 최대 {v4}회 튕깁니다.<br><br>공격이 치명타라면 튕긴 공격도 치명타를 가합니다.", // 튕기는 부메랑
        "E": "시비르가 {v1}초간 주문 방어막을 만들어 적의 스킬을 막아냅니다. 적의 스킬을 방어하는 데 성공하면 시비르가 <healing>{v2}의 체력</healing>을 회복하고 재빠른 발놀림을 발동합니다.", // 주문 방어막
        "R": "시비르가 주위 아군을 이끌며 {v1}초 동안 <speed>이동 속도를 {v2}%</speed> 상승시킵니다.<br><br>사냥 개시 활성화 중 챔피언에게 기본 공격을 가하면 시비르의 기본 스킬 재사용 대기시간이 {v3}초 감소합니다.<br><br>최근 피해를 입힌 적 처치에 관여하면 사냥 개시의 지속시간이 초기화됩니다.", // 사냥 개시
    },
    "Jade_Sivir": { // 시비르
        "P": "시비르가 적 챔피언을 공격할 때 짧은 시간 동안 이동 속도가 대폭 상승합니다.", // 재빠른 발놀림 — CD 요약본, 직접 다듬을 것
        "Q": "시비르가 십자날 검을 부메랑처럼 던져, 처음 적중한 유닛에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 대상을 추가로 맞힐 때마다 피해량이 {v2}%씩, 최소 {v3}%까지 감소합니다.", // 부메랑 검
        "W": "시비르의 기본 공격이 <attention>{v1}</attention>명의 대상에게 추가로 튕깁니다. 튕길 때마다 입히는 피해가 {v2}%씩 감소합니다.", // 튕기는 부메랑
        "E": "시비르가 {v1}초 동안 다음 적 스킬을 방어하는 마법 보호막을 얻습니다. 적의 스킬을 방어하는 데 성공하면 <scalemana>{v2}의 마나</scalemana>를 돌려받습니다.", // 주문 방어막
        "R": "시비르가 {v1}초 동안 전투 실력을 발휘하여 <attackspeed>공격 속도가 {v2}%</attackspeed>, <speed>이동 속도가 {v3}%</speed> 증가합니다. 주변의 아군 또한 시비르의 {v4}%에 해당하는 추가 능력치를 얻습니다.", // 사냥 개시
    },
    "XinZhao": { // 신 짜오
        "P": "세 번째 기본 공격 시마다 추가 피해를 입히고 자신의 체력을 회복합니다.", // 결심 — CD 요약본, 직접 다듬을 것
        "Q": "신 짜오의 다음 3번의 기본 공격은 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 추가로 입히고 다른 스킬의 재사용 대기시간을 1초 감소시킵니다. 또한 세 번째 기본 공격은 {v2}초 동안 <status>공중으로 띄워 올립니다</status>.<br>", // 삼조격
        "W": "신 짜오가 창을 가르며 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힌 뒤 그대로 찔러 <physicaldamage>{v2}</physicaldamage>의 피해를 입힙니다. 찌르기에 적중당한 적은 {v3}초 동안 {v4}% <status>둔화</status>됩니다. <br><br>찌르기에 적중당한 챔피언과 대형 몬스터는 적중 시 {v5}초 동안 <keywordmajor>도전</keywordmajor> 받은 상태가 되고 <keywordstealth>은신</keywordstealth> 상태가 아닌 한 모습이 드러납니다.", // 풍전참뢰
        "E": "신 짜오가 적에게 돌격해 근처의 적들에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고, {v2}초 동안 {v3}% <status>둔화</status>시킵니다.<br><br>{v4}초 동안 신 짜오의 <attackspeed>공격 속도가 {v5}% ()</attackspeed> 증가합니다.<br><br><keywordmajor>도전</keywordmajor> 받은 적을 대상으로는 이 스킬의 사거리가 증가합니다.<br>", // 무쌍돌격
        "R": "<passive>기본 지속 효과:</passive> 신 짜오의 기본 공격 또는 <spellname>무쌍돌격</spellname>에 마지막으로 적중당한 적 챔피언은 {v1}초 동안 <keywordmajor>도전</keywordmajor> 받은 상태가 됩니다.<br><br><active>사용 시:</active> 신 짜오가 창을 휘둘러 적에게 <physicaldamage>{v2}+적 현재 체력의 {v3}%에 해당하는 물리 피해</physicaldamage>를 입히고 <keywordmajor>도전 받지 않은</keywordmajor> 적을 <status>뒤로 밀쳐냅니다</status>. <br> <br>이후 신 짜오가 {v4}초 동안 창이 닿는 거리 밖에 있는 적의 공격에 피해를 입지 않게 됩니다.", // 현월수호
    },
    "Syndra": { // 신드라
        "P": "신드라가 레벨을 올리고 적에게 피해를 입혀서 분노의 조각을 획득합니다. 분노의 조각은 스킬을 강화합니다.<br><br><font color='#FF9900'>어둠 구체</font>: 신드라가 1번의 추가 충전량을 유지할 수 있습니다.<br><font color='#FF9900'>의지의 힘</font>: 추가 고정 피해를 입힙니다.<br><font color='#FF9900'>적군 와해</font>: 스킬 적용 범위 폭이 증가하고 모든 대상을 둔화시킵니다.<br><font color='#FF9900'>풀려난 힘</font>: 체력이 낮은 대상을 처형합니다.", // 초월 — CD 요약본, 직접 다듬을 것
        "Q": "신드라가 <keywordmajor>어둠의 구체</keywordmajor>를 소환하여 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. <keywordmajor>어둠의 구체</keywordmajor>는 {v2}초간 유지되며 신드라의 다른 스킬로 움직일 수 있습니다.<br><br><evolve>분노의 조각 @spell.SyndraPassive:Q1UpgradeThreshold@개</evolve>: 신드라가 <keywordmajor>어둠 구체</keywordmajor>를 {v3}개 저장할 수 있습니다.", // 어둠 구체
        "W": "신드라가 <keywordmajor>어둠 구체</keywordmajor>, 적 미니언, 혹은 에픽 몬스터를 제외한 몬스터를 잡아당기며 최대 5초 안에 <recast>재사용</recast>할 수 있습니다.<br><br><recast>재사용 시</recast>: 신드라가 물체를 던져 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 {v3}% <status>둔화</status>시킵니다.<br><br><evolve>분노의 조각 @spell.SyndraPassive:WUpgradeThreshold@</evolve>개: 이 스킬이 <truedamage>{v4}의 고정 피해</truedamage>를 추가로 입힙니다.<br>", // 의지의 힘
        "E": "신드라가 힘의 파동을 발사하여 적들을 <status>밀어내고</status> <keywordmajor>어둠 구체</keywordmajor>에 충돌한 모든 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.<br><br>밀려난 <keywordmajor>어둠 구체</keywordmajor>는 적들을 {v2}초 동안 <status>기절</status>시키고 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.<br><br><evolve>분노의 조각 @spell.SyndraPassive:EUpgradeThreshold@개</evolve>: 이 스킬의 폭이 증가하며 {v3}초 동안 적을 <status>{v4}%</status> <status>둔화</status>시킵니다.", // 적군 와해
        "R": "<passive>기본 지속 효과</passive>: <spellname>풀려난 힘</spellname>의 레벨 하나당 <spellname>어둠 구체</spellname>의 스킬 가속이 {v1}씩 추가로 증가합니다.<br><br>신드라가 엄청난 파멸의 힘을 끌어내어 신드라 주위를 도는 <keywordmajor>어둠 구체</keywordmajor> 3개와 주변 어둠 구체 4개를 적 챔피언에게 보냅니다. 각 <keywordmajor>어둠 구체</keywordmajor>는 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다. (최대 <magicdamage>{v3}의 마법 피해</magicdamage>)<br><br><evolve>분노의 조각 @spell.SyndraPassive:RUpgradeThreshold@개</evolve>: 이 스킬이 체력이 {v4}% 미만인 적을 <danger>처형</danger>합니다.", // 풀려난 힘
    },
    "Singed": { // 신지드
        "P": "신지드가 근처 챔피언을 회피하며 일시적으로 이동 속도가 증가합니다.", // 독성 급류 — CD 요약본, 직접 다듬을 것
        "Q": "<toggle>활성화/비활성화:</toggle> 신지드가 초당 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히는 맹독의 자취를 남깁니다.", // 맹독의 자취
        "W": "신지드가 끈적한 액체가 든 통을 던져 해당 지역에 있는 적을 {v1}초 동안 {v2}% <status>둔화</status>시키고 <status>이동 스킬을 사용할 수 없게</status> 합니다.", // 초강력 접착제
        "E": "신지드가 어깨 너머로 적을 던져 <magicdamage>{v1}+최대 체력의 {v2}%에 해당하는 마법 피해</magicdamage>를 입힙니다.<br><br>신지드가 <spellname>초강력 접착제</spellname> 안으로 대상을 던져 넘기면 대상이 {v3}초 동안 <status>속박</status>됩니다.", // 던져넘기기
        "R": "신지드가 화학 약품을 마셔 {v1}초 동안 <scaleap>주문력</scaleap>, <scalearmor>방어력</scalearmor>, <scalemr>마법 저항력</scalemr>, <speed>이동 속도</speed>, <healing>체력 재생력</healing>, <scalemana>마나 재생력</scalemana>이 {v2} 증가합니다. 지속시간 동안 <spellname>맹독의 자취</spellname>가 {v3}초 동안 {v4}%의 고통스러운 상처를 남깁니다.", // 광기의 물약
    },
    "Jade_Singed": { // 신지드
        "P": "신지드가 보유한 마나 100당 25의 <scaleHealth>체력</scaleHealth>을 얻습니다.", // 방벽 강화 — CD 요약본, 직접 다듬을 것
        "Q": "<toggle>활성화/비활성화: </toggle>신지드가 맹독의 자취를 남겨 초당 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.", // 맹독의 자취
        "W": "신지드가 땅에 강력한 접착제를 뿌립니다. 접착제는 5초 동안 유지됩니다. 접착제를 밟은 적들은 {v1}%만큼 <status>둔화</status>됩니다. (접착제를 벗어난 뒤에도 1초간 지속)", // 초강력 접착제
        "E": "신지드가 어깨 너머로 적을 던져 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.", // 던져넘기기
        "R": "신지드가 화학 약품을 마셔 {v1}초 동안 <magicdamage>{v2}의 주문력</magicdamage>, <scalearmor>방어력</scalearmor>, <scalemr>마법 저항력</scalemr>, <speed>이동 속도</speed>, <healing>체력 재생</healing>, <scalemana>마나 재생</scalemana>을 얻습니다.", // 광기의 물약
    },
    "Thresh": { // 쓰레쉬
        "P": "쓰레쉬는 근처에서 처치된 적의 영혼을 포획해 방어력과 주문력을 영구적으로 올릴 수 있습니다.", // 지옥살이 — CD 요약본, 직접 다듬을 것
        "Q": "쓰레쉬가 낫을 던져 첫 번째로 맞힌 대상을 <status>기절</status>시키고 {v1}초간 자신 쪽으로 <status>당겨</status> 옵니다. 대상에게 <magicdamage>{v2}의 마법 피해</magicdamage>를 입히고 지속시간 동안 <keywordstealth>절대 시야</keywordstealth>를 얻습니다.<br><br>이 스킬을 <recast>재사용</recast>하면 쓰레쉬가 잡힌 적 쪽으로 끌려갑니다.<br><br>이 스킬로 적을 맞히면 재사용 대기시간이 {v3}초 감소합니다.", // 사형 선고
        "W": "쓰레쉬가 지정한 위치에 랜턴을 던지고 아군이 랜턴을 클릭하면 쓰레쉬에게 돌진합니다.<br><br>랜턴을 가장 먼저 붙잡는 아군 하나와 쓰레쉬가 {v1}초간 <shield>{v2}의 피해를 흡수하는 보호막</shield>을 얻습니다.", // 어둠의 통로
        "E": "<passive>기본 지속 효과:</passive> 기본 공격 시 마지막 공격 이후 공격을 하지 않고 있는 시간에 비례하여 추가 마법 피해를 입힙니다. <magicdamage>{v1}</magicdamage>~<magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.<br><br><active>사용 시:</active> 사슬을 휘둘러 휘두른 방향으로 적을 <status>당기거나</status> <status>밀어냅니다</status>. 적중한 적은 {v3}초 동안 {v4}% <status>둔화</status>되고 <magicdamage>{v5}의 마법 피해</magicdamage>를 입습니다.", // 사슬 채찍
        "R": "쓰레쉬가 영혼 감옥을 생성합니다. 장벽을 통과하는 적 챔피언은 {v1}초 동안 {v2}% <status>둔화</status>되고 <magicdamage>{v3}의 마법 피해</magicdamage>를 입습니다. 충돌하면 벽은 허물어집니다. 벽 하나가 무너지면 나머지 벽은 피해를 입히지 않고 <status>둔화</status> 지속시간이 절반만 적용됩니다.", // 영혼 감옥
    },
    "Ahri": { // 아리
        "P": "아리가 미니언 또는 몬스터를 9마리 처치하면 체력을 회복합니다.<br>아리가 적 챔피언 처치에 관여하면 더 많은 체력을 회복합니다.", // 정기 흡수 — CD 요약본, 직접 다듬을 것
        "Q": "아리가 구슬을 던진 후 다시 받습니다. 던질 때는 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히며 돌아올 때는 <truedamage>{v1}의 고정 피해</truedamage>를 입힙니다.", // 현혹의 구슬
        "W": "아리가 근처 적에게 날아가는 여우불 세 개를 방출하여 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 첫 번째 여우불이 적중한 후에는 <magicdamage>{v2}의 피해</magicdamage>로 감소합니다. 또한 <speed>이동 속도가 {v3}%</speed> 증가했다가 {v4}초에 걸쳐 원래대로 돌아옵니다.", // 여우불
        "E": "아리가 입맞춤을 날려 첫 번째로 맞는 적을 {v1}초 동안 <status>매혹</status>하고 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.", // 매혹
        "R": "아리가 민첩하게 질주하며 근처 적(챔피언 우선)에게 혼령의 정기 {v1}개를 쏘아내 정기 하나당 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다. <spellname>혼령 질주</spellname>는 {v3}초 안에 최대 2회까지 <recast>재사용</recast>할 수 있습니다.<br><br>이 기간에 <spellname>정기 흡수</spellname> 효과로 챔피언의 정기를 삼키면 <spellname>혼령 질주</spellname> 재사용 가능 횟수가 1회 증가하며 (최대 {v4}회) 지속시간이 최대 {v5}초 늘어납니다.", // 혼령 질주
    },
    "Jade_Ahri": { // 아리
        "P": "적에게 스킬을 맞힐 때마다 정기 흡수 충전을 얻습니다. 최대 충전 시 다음 스킬이 아리의 체력을 회복시킵니다.", // 정기 흡수 — CD 요약본, 직접 다듬을 것
        "Q": "아리가 구슬을 던지고 다시 받습니다. 던질 때는 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 돌아올 때는 <truedamage>{v1}의 고정 피해</truedamage>를 입힙니다.", // 현혹의 구슬
        "W": "아리가 근처의 적을 추적하는 여우불 3개를 방출합니다. 여우불은 각각 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히며, 추가로 적중 시 감소한 <magicdamage>{v2}의 피해</magicdamage>를 입힙니다.", // 여우불
        "E": "아리가 입맞춤을 날려 처음 맞은 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 <status>매혹</status>합니다. 매혹당한 대상은 아리에게 받는 피해가 {v3}초간 {v4}% 증가합니다.", // 매혹
        "R": "아리가 민첩하게 질주하며 근처에 있는 적에게 혼령의 정기 3개를 발사합니다. (챔피언 우선) 정기는 각각 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. <spellname>혼령 질주</spellname>는 10초 내로 최대 2회 <recast>재사용</recast>할 수 있습니다.", // 혼령 질주
    },
    "Amumu": { // 아무무
        "P": "아무무의 기본 공격을 받은 대상은 <font color='#9b0f5f'>저주</font>에 걸려 마법 피해를 입을 때마다 추가 고정 피해를 받습니다.", // 저주의 손길 — CD 요약본, 직접 다듬을 것
        "Q": "아무무가 붕대를 던져 처음 적중한 적에게 붕대를 당겨 다가간 뒤 {v1}초 동안 <status>기절</status>시키고 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.<br><br>이 스킬은 2회까지 충전됩니다.", // 붕대 던지기
        "W": "<toggle>활성화/비활성화:</toggle> 아무무가 울기 시작하여 매초 근처 적에게 <magicdamage>{v1}+최대 체력의 {v2}%에 해당하는 마법 피해</magicdamage>를 입히고 <keywordmajor>저주</keywordmajor>를 초기화합니다.", // 절망
        "E": "<passive>기본 지속 효과:</passive> 아무무가 받는 물리 피해가 {v1} 감소합니다. 아무무가 기본 공격에 맞으면 이 스킬의 재사용 대기시간이 {v2}초 감소합니다.<br><br><active>사용 시:</active> 아무무가 짜증을 내며 주변 적에게 <magicdamage>{v3}의 마법 피해</magicdamage>를 입힙니다.", // 짜증내기
        "R": "아무무가 붕대를 내던져 {v1}초 동안 <status>기절</status>시키고, <magicdamage>{v2}의 마법 피해</magicdamage>를 입히고, <keywordmajor>저주</keywordmajor>를 내립니다.", // 슬픈 미라의 저주
    },
    "Jade_Amumu": { // 아무무
        "P": "아무무의 기본 공격을 받은 대상은 3초 동안 마법 저항력이 감소합니다.", // 저주의 손길 — CD 요약본, 직접 다듬을 것
        "Q": "아무무가 붕대를 던져 처음 적중한 적에게 붕대를 당겨 다가간 뒤 {v1}초 동안 <status>기절</status>시키고 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.", // 붕대 던지기
        "W": "<toggle>활성화/비활성화:</toggle> 아무무가 울기 시작하여 매초 근처 적에게 <magicdamage>{v1}+최대 체력의 {v2}%에 해당하는 마법 피해</magicdamage>를 입힙니다.", // 절망
        "E": "<passive>기본 지속 효과:</passive> 아무무가 받는 물리 피해가 {v1} 감소합니다.<br><br><active>사용 시:</active> 아무무가 주변 유닛에게 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다. 아무무가 공격당할 때마다 짜증내기의 재사용 대기시간이 {v3}초씩 감소합니다.", // 짜증내기
        "R": "아무무가 주변 유닛을 휘감아 {v1}초 동안 <status>기절</status>시키고 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.", // 슬픈 미라의 저주
    },
    "AurelionSol": { // 아우렐리온 솔
        "P": "아우렐리온 솔이 스킬로 피해를 입히면 각 스킬을 영구히 강화하는 <font color='#3458eb'>별가루</font>를 획득합니다. ", // 우주의 창조자 — CD 요약본, 직접 다듬을 것
        "Q": "아우렐리온 솔이 최대 {v1}초 동안 성운파를 뿜어내 처음 적중하는 적에게 초당 <magicdamage>{v2}의 마법 피해</magicdamage>를 입히고 주변에 있는 적에게 {v3}%의 피해를 입힙니다.<br><br>같은 적에게 1초 동안 성운파를 뿜을 때마다 <magicdamage>{v4}의 마법 피해</magicdamage>+<magicdamage>최대 체력의 {v5}에 해당하는 마법 피해</magicdamage>를 입히고 대상이 챔피언인 경우 <font color='#3458eb'>별가루 {v6}개</font>를 흡수합니다.", // 빛의 숨결
        "W": "아우렐리온 솔이 한 방향으로 날아갑니다. 비행 중에는 <spellname>빛의 숨결</spellname>의 재사용 대기시간과 최대 정신 집중 시간이 없으며 기본 피해량이 {v1}% 증가합니다.<br><br>챔피언에게 피해를 입힌 후 {v2}초 안에 처치에 관여하면 이 스킬의 재사용 대기시간을 {v3}%만큼 돌려받습니다.<br><br><recast>재사용 시:</recast> 비행을 일찍 종료합니다.", // 별의 비행
        "E": "아우렐리온 솔이 적에게 초당 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히며 {v2}초 동안 적을 천천히 중심으로 <status>끌어당기는</status> 블랙홀을 소환합니다. 블랙홀의 중심에 있는 적 중 <scalehealth>최대 체력이 {v3}%</scalehealth> 미만인 적은 즉사합니다.<br><br>블랙홀 안에 있는 적이 죽거나 적 챔피언이 안에 있을 때 블랙홀이 매초 <font color='#3458eb'>별가루</font>를 흡수합니다.", // 특이점
        "R": "아우렐리온 솔이 하늘에서 별을 뽑아 땅으로 떨어뜨려 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고, 적을 {v2}초 동안 <status>기절</status>시키고, 적중한 챔피언 하나당 <font color='#3458eb'>별가루 {v3}개</font>를 흡수합니다.<br><br><font color='#3458eb'>별가루 {v4}개</font>를 모으면 다음 <spellname>유성</spellname>을 <spellname>천상 강림</spellname>으로 바꿉니다.<br><br><spellname>천상 강림</spellname>: 아우렐리온 솔이 우주에서 별자리 하나만큼의 분노를 내려 넓은 범위에 있는 적에게 <magicdamage>{v5}의 마법 피해</magicdamage>를 입히고, 적중한 적을 {v2}초 동안 <status>공중으로 띄워 올립니다</status>. 또한, 거대한 충격파를 퍼뜨려 챔피언과 에픽 몬스터에게 <magicdamage>{v6}의 마법 피해</magicdamage>를 입히고 적중한 모든 적을 1초 동안 {v7}% <status>둔화</status>시킵니다.", // 유성 / 천상 강림
    },
    "Ivern": { // 아이번
        "P": "아이번은 에픽 몬스터를 제외한 몬스터와는 서로 공격할 수 없지만, 대신 정글 캠프에 마법의 덤불을 심을 수 있습니다. 덤불은 시간이 지나면서 점점 자라나고, 완전히 자라난 후 클릭하면 몬스터가 풀려나며 아이번은 골드와 경험치를 얻게 됩니다.", // 숲의 친구 — CD 요약본, 직접 다듬을 것
        "Q": "아이번이 덩굴뿌리를 던져 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 처음으로 적중한 적을 {v2}초 동안 <status>속박</status>합니다. <status>속박된</status> 적을 공격한 아군은 공격 사거리 안으로 돌진합니다. <br><br><recast>재사용 시:</recast> 아이번이 <status>속박</status>된 적에게 바로 돌진합니다.<br><br><rules>에픽 몬스터를 제외한 몬스터에게 적중하면 <spellname>덩굴뿌리</spellname> 재사용 대기시간이 50% 감소합니다.</rules>", // 덩굴뿌리
        "W": "<passive>기본 지속 효과:</passive> 아이번이 수풀 속에 있거나 수풀을 떠난 후 {v1}초 안에 기본 공격 시 <magicdamage>{v2}의 마법 피해</magicdamage>를 추가로 입힙니다. 주변의 아군이 {v3}초 동안 이 효과를 얻고 <magicdamage>{v4}의 마법 피해</magicdamage>을 입힙니다.<br><br><active>사용 시:</active> 아이번이 {v5}초 동안 유지되는 수풀을 심습니다. 수풀은 아이번의 팀이 수풀 내에서 시야를 잃을 때까지 또는 최대 {v6}초 동안 유지됩니다.", // 수풀 가꾸기
        "E": "아이번이 아군이나 데이지에게 <shield>{v1}의 피해를 흡수하는 보호막</shield>을 씌웁니다. 보호막은 {v2}초 후 폭발하며 적에게 <magicdamage>{v3}의 마법 피해</magicdamage>를 입히고 {v4}초 동안 {v5}% <status>둔화</status>시킵니다.<br><br>보호막이 유지되는 동안 <spellname>보호의 씨앗</spellname>이 폭발했지만 적중한 적이 없으면 해당 아군이 {v2}초 동안 <shield>{v1}</shield>의 피해를 흡수하는 보호막을 얻습니다.", // 보호의 씨앗
        "R": "아이번이 파수꾼 친구 데이지를 소환해 {v1}초 동안 함께 전투합니다.<br><br><active>데이지, 후려쳐!:</active> 데이지가 같은 챔피언이나 에픽 몬스터를 연속으로 세 번 공격하면 충격파를 일으켜 적중한 모든 적에게 <magicdamage>{v2}의 마법 피해</magicdamage>를 입히고 {v3}초 동안 <status>공중으로 띄워 올립니다</status>. 이 효과는 {v4}초에 한 번씩만 발생할 수 있습니다.<br><br><recast>재사용 시:</recast> 데이지에게 공격 또는 이동을 지시합니다.", // 데이지!
    },
    "Azir": { // 아지르
        "P": "아지르는 무너진 아군 포탑이나 적 포탑 위에 태양 포탑을 소환할 수 있습니다.", // 슈리마의 유산 — CD 요약본, 직접 다듬을 것
        "Q": "아지르가 모든 <keywordmajor>모래 병사</keywordmajor>를 지정한 위치로 보냅니다. 모래 병사는 통과한 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히며 1초 동안 {v2}% <status>둔화</status>시킵니다.", // 사막의 맹습
        "W": "아지르가 {v1}초 동안 <keywordmajor>모래 병사</keywordmajor> 하나를 소환합니다. <keywordmajor>모래 병사</keywordmajor> 근처에 있는 적을 공격하면 해당 병사에게 공격 명령을 내려 적이 있는 방향에 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.<br><br>이 스킬은 {v3}회까지 충전됩니다.", // 일어나라!
        "E": "아지르가 {v1}초 동안 <shield>{v2}의 피해를 흡수하는 보호막</shield>을 얻고 <keywordmajor>모래 병사</keywordmajor> 중 하나에게 돌진하여 통과하는 적들에게 <magicdamage>{v3}의 마법 피해</magicdamage>를 입힙니다.<br><br>아지르가 적 챔피언과 부딪치면 그 자리에서 멈추고 <keywordmajor>모래 병사</keywordmajor> 중첩을 얻습니다.", // 신기루
        "R": "아지르가 무장한 병사들을 일렬 횡대로 소환하여 돌진시키며, 적들을 <status>밀어내고</status> <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 병사들은 {v2}초 동안 남아 적의 길을 가로막습니다.", // 황제의 진영
    },
    "Akali": { // 아칼리
        "P": "스킬 공격으로 챔피언에게 피해를 입히면 해당 챔피언의 주변에 원이 생깁니다. 이 원의 경계를 넘어가면 다음 기본 공격의 사거리가 길어지고 추가 피해를 입힙니다.", // 암살자의 표식 — CD 요약본, 직접 다듬을 것
        "Q": "아칼리가 단검을 부채꼴 모양으로 던져 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 사거리 끝에 있는 적들을 {v2}초 동안 {v3}%만큼 <status>둔화</status>시킵니다.", // 오연투척검
        "W": "아칼리가 연막탄을 떨어뜨려 {v1}초 동안 지속되는 연막을 생성하고 <speed>이동 속도가 {v2}%</speed> 증가했다가 {v3}초에 걸쳐 원래대로 돌아옵니다.<br><br>황혼의 장막이 활성화된 동안 아칼리의 최대 기력이 {v4} 증가합니다. <br><br>아칼리는 연막 안에서 <keywordstealth>투명</keywordstealth> 상태가 됩니다.", // 황혼의 장막
        "E": "아칼리가 뒤로 공중제비를 돌며 표창을 던져 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 표창에 맞은 첫 번째 적이나 연막에 표식을 남깁니다. 한 번 더 <recast>재사용</recast>하면 표식을 남긴 대상에게 돌진해 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.", // 표창곡예
        "R": "아칼리가 적 챔피언을 뛰어넘어 경로 내에 있는 모든 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. <br><br>{v2}초 후 <recast>재사용</recast>하면 적들을 관통하며 돌진하여 대상이 잃은 체력에 비례해 <magicdamage>{v3}</magicdamage>~<magicdamage>{v4}의 마법 피해</magicdamage>를 입힙니다.", // 무결처형
    },
    "Akshan": { // 아크샨
        "P": "아크샨의 기본 공격 및 스킬이 세 번 적중할 때마다 추가 물리 피해를 입힙니다. 대상이 챔피언인 경우 아크샨이 보호막을 얻습니다.<br><br>아크샨이 기본 공격 후 피해량이 감소한 두 번째 공격을 발사합니다. 추가 공격을 도중에 취소하면 대신 이동 속도가 증가합니다.", // 비열한 싸움 — CD 요약본, 직접 다듬을 것
        "Q": "아크샨이 부메랑을 던져 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다. 적에게 적중할 때마다 부메랑의 사거리가 증가합니다.<br><br>부메랑이 챔피언에게 적중하면 아크샨의 <speed>이동 속도가 {v2}</speed> 증가했다가 {v3}초에 걸쳐 원래대로 돌아옵니다.", // 복수의 부메랑
        "W": "{{ Spell_AkshanW_Tooltip_{v1} }}", // 악당 처단
        "E": "<active>첫 사용 시:</active> 아크샨이 적중한 첫 번째 지형에 고정되는 갈고리총을 발사합니다.<br><br><active>두 번째 사용 시:</active> 아크샨이 갈고리에 매달려 이동하며 가장 가까운 적에게 연속으로 탄환을 발사해 한 발당 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다.<br><br><active>세 번째 사용 시:</active> 아크샨이 밧줄을 놓고 뛰어내리며 마지막 탄환을 발사합니다.<br><br>적 챔피언이나 지형에 부딪히면 영웅의 비상이 일찍 끝납니다.<br><br>챔피언 처치 관여 시 이 스킬의 재사용 대기시간이 초기화됩니다.", // 영웅의 비상
        "R": "아크샨이 챔피언을 조준하고 최대 {v1}초간 총을 과충전해 탄환을 {v2}개까지 저장합니다.<br><br><recast>재사용 시:</recast> 아크샨이 저장한 탄환을 발사합니다. 각 탄환은 처음으로 적중한 적이나 구조물에 최소 <physicaldamage>{v3}의 물리 피해</physicaldamage>를 입힙니다. 피해량은 대상이 잃은 체력에 비례해 최대 <physicaldamage>{v4}의 물리 피해</physicaldamage>를 입힙니다.", // 인과응보
    },
    "Aatrox": { // 아트록스
        "P": "주기적으로 아트록스의 기본 공격이 대상 최대 체력에 비례하여 추가 <magicDamage>마법 피해</magicDamage>를 입히고 자신의 체력을 회복합니다. ", // 사신 태세 — CD 요약본, 직접 다듬을 것
        "Q": "아트록스가 대검을 내리쳐 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다. 끝에 적중한 적을 잠깐 <status>공중으로 띄워 올리고</status> <physicaldamage>{v2}</physicaldamage>의 피해를 입힙니다. 이 스킬은 두 번 <recast>재사용</recast>할 수 있으며 다시 사용할 때마다 범위 모양이 변하고 이전보다 25% 더 많은 피해를 입힙니다.", // 다르킨의 검
        "W": "아트록스가 사슬을 발사하여 처음 적중한 적을 {v1}초 동안 {v2}%만큼 <status>둔화</status>시키고 <physicaldamage>{v3}의 물리 피해</physicaldamage>를 입힙니다. 챔피언과 대형 정글 몬스터는 {v1}초 안에 해당 지역을 벗어나지 않으면 중심으로 <status>끌려가</status> 다시 같은 양의 피해를 입습니다.", // 지옥사슬
        "E": "<passive>기본 지속 효과:</passive> 아트록스가 챔피언에게 가한 피해의 <lifesteal>{v1}</lifesteal>만큼 체력을 회복합니다.<br><br><active>사용 시:</active> 아트록스가 돌진합니다. 이 스킬은 다른 스킬이 진행되는 동안 사용할 수 있습니다.", // 파멸의 돌진
        "R": "아트록스가 진정한 악마의 모습을 드러내 근처 미니언이 {v1}초 동안 <status>공포</status>에 떨게 하고 <speed>이동 속도가 {v2}%</speed> 증가했다가 {v3}초에 걸쳐 원래대로 돌아옵니다. 지속시간 동안 <scalead>공격력이 {v4}%</scalead>, <healing>자신에 대한 체력 회복 효과가 {v5}%</healing> 증가합니다.<br><br>챔피언 처치 관여 시 이 효과의 지속시간이 {v6}초 늘어나고 <speed>이동 속도</speed> 효과가 초기화됩니다.", // 세계의 종결자
    },
    "Aphelios": { // 아펠리오스
        "P": "아펠리오스는 쌍둥이 누이 알룬이 만든 다섯 가지의 루나리 무기를 사용합니다. 한 번에 주 무기와 보조 무기 등 총 두 가지 무기를 사용할 수 있습니다. 각 무기는 고유의 기본 공격과 스킬을 가지고 있습니다. 기본 공격과 스킬 사용 시 탄약을 소모하며, 탄약을 모두 소모하면 사용 중인 주 무기를 5개의 무기 중 다음 무기로 교체합니다. ", // 암살자와 예언자 — CD 요약본, 직접 다듬을 것
        "Q": "", // 무기 스킬
        "W": "주 무기와 보조 무기를 교체하여 <b><i><font color='#a64dff'>중력포</font></i></b>을 장착합니다.", // 위상 변화
        "E": "", // 무기 교체 시스템
        "R": "챔피언에게 적중 시 폭발하는 달빛 에너지를 발사하여 주변 적에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다.<br><br>이후 적중한 모든 챔피언을 주 무기로 공격합니다. {{ Spell_ApheliosR_WeaponMod_{v2} }}", // 월광포화
    },
    "Alistar": { // 알리스타
        "P": "근처에서 적이 죽거나, 알리스타가 적 챔피언을 기절 혹은 이동시킬 때마다 포효를 중첩시킵니다. 최대치까지 중첩되면 근처의 모든 아군 챔피언과 자신의 체력을 회복시킵니다.", // 승리의 포효 — CD 요약본, 직접 다듬을 것
        "Q": "알리스타가 땅을 내리쳐 {v1}초 동안 적을 <status>공중으로 띄워 올리고</status> <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.", // 분쇄
        "W": "알리스타가 적에게 박치기를 하여 <status>뒤로</status> <status>밀어내고</status> <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.", // 박치기
        "E": "알리스타가 땅을 짓밟기 시작하며 유체화 상태가 되고 {v1}초에 걸쳐 근처 적에게 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다. 이 스킬로 챔피언에게 피해를 입힐 때마다 중첩이 1회 쌓입니다.<br><br>{v3}회 중첩되면 알리스타가 다음으로 챔피언을 기본 공격할 때 대상을 {v4}초 동안 <status>기절</status>시키고 <magicdamage>{v5}의 마법 피해</magicdamage>를 추가로 입힙니다.", // 짓밟기
        "R": "알리스타가 즉시 모든 <status>방해</status> 효과를 없애고 {v1}초 동안 받는 피해가 {v2}% 감소합니다.", // 꺾을 수 없는 의지
    },
    "Jade_Alistar": { // 알리스타
        "P": "알리스타가 스킬을 사용할 때마다 몇 초 동안 주변 유닛과 포탑을 짓밟아 경로에 있는 적에게 피해를 입힙니다.", // 짓밟기 — CD 요약본, 직접 다듬을 것
        "Q": "알리스타가 땅을 내리쳐 {v1}초 동안 적을 <status>공중으로 띄워 올리고</status> <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.", // 분쇄
        "W": "알리스타가 적에게 박치기를 하여 <status>뒤로</status> <status>밀어내고</status> <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.", // 박치기
        "E": "알리스타가 포효하여 자신은 <healing>{v1}의 체력</healing>을, 주변 아군은 <healing>{v2}의 체력</healing>을 회복시킵니다.<br><br>주변에서 적이 사망하면 이 스킬의 재사용 대기시간이 {v3}초 감소합니다.", // 승리의 포효
        "R": "알리스타가 즉시 모든 <status>방해</status> 효과를 없애고, <physicaldamage>{v1}의 공격력</physicaldamage>을 얻으며, {v2}초 동안 받는 피해가 {v3}% 감소합니다.", // 꺾을 수 없는 의지
    },
    "Ambessa": { // 암베사
        "P": "스킬을 사용하는 동안 기본 공격 또는 이동 명령을 하면 암베사가 스킬을 사용한 후 짧은 거리를 돌진하며 다음 기본 공격의 사거리, 피해량, 공격 속도가 증가하고 기력을 돌려받습니다.", // 용사냥개의 발걸음 — CD 요약본, 직접 다듬을 것
        "Q": "<active>교활한 휩쓸기</active>: 암베사가 칼날로 전방을 휩쓸어 공격 범위 가장자리에 있는 적에게 <physicaldamage>{v1}+최대 체력의 {v2}에 해당하는 물리 피해</physicaldamage>를 입힙니다. 다른 모든 적에게는 {v3}의 피해를 입힙니다. 적에게 공격이 적중하면 <active>파멸의 일격</active>을 준비합니다.<br><br><active>파멸의 일격</active>: 암베사가 칼날로 내려찍어 처음 적중하는 적에게 <physicaldamage>{v4}+최대 체력의 {v5}에 해당하는 물리 피해</physicaldamage>를 입힙니다. 다른 모든 적에게는 {v6}의 피해를 입힙니다.", // 교활한 휩쓸기 / 파멸의 일격
        "W": "암베사가 {v1}초 동안 <shield>{v2}의 보호막</shield>을 얻고 {v3}초 동안 준비합니다. 이후 지면을 내리쳐 주변 적들에게 <physicaldamage>{v4}의 물리 피해</physicaldamage>를 입힙니다. 준비하는 동안 적 챔피언이나 대형 몬스터, 구조물에 피해를 받았다면 입히는 <physicaldamage>물리 피해가 {v5}</physicaldamage>로 증가합니다.", // 배척
        "E": "암베사가 사슬을 휘둘러 적에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 <status>{v2}%</status> <status>둔화</status>시킵니다. 둔화 효과는 {v3}초에 걸쳐 사라집니다. 이 스킬로 <spellname>용사냥개의 발걸음</spellname>이 개시되면 한 번 더 일격을 가합니다.", // 찢어 가르기
        "R": "<passive>기본 지속 효과</passive>: 암베사가 <armorpen>{v1}%의 방어구 관통력 </armorpen>을 얻으며 스킬 사용 시 <healing>입힌 피해량의 {v2}만큼 체력을 회복</healing>합니다.<br><br><active>사용 시</active>: 암베사가 <attention>저지 불가</attention> 상태가 되어 일직선상에서 가장 멀리 있는 적 챔피언에게 순간 이동한 후 대상을 {v3}초 동안 <status>제압</status>합니다. 이후 해당 적 챔피언을 지면에 내리쳐 <physicaldamage>{v4}의 물리 피해</physicaldamage>를 입히고 {v5}초 동안 <status>기절</status>시킵니다.", // 공개 처형
    },
    "Annie": { // 애니
        "P": "애니가 스킬을 4번 사용한 후 다음 공격 스킬에 맞은 적은 기절합니다.<br><br>애니가 게임을 시작하고 방화광을 사용할 수 있는 상태로 재생성됩니다.", // 방화광 — CD 요약본, 직접 다듬을 것
        "Q": "애니가 화염구를 던져 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 대상이 사망하면 소모한 마나를 돌려받고 재사용 대기시간이 50% 감소합니다.", // 붕괴
        "W": "애니가 화염파를 발사하여 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.", // 소각
        "E": "애니가 아군 챔피언에게 {v1}초 동안 <shield>{v2}의 피해를 흡수하는 보호막</shield>을 부여합니다. 보호막으로 인해 <speed>이동 속도가 {v3}</speed> 증가했다 {v4}초에 걸쳐 원래대로 돌아옵니다. 보호막이 지속되는 동안 해당 아군을 기본 공격이나 스킬로 공격한 적은 보호막당 한 번 <magicdamage>{v5}의 마법 피해</magicdamage>를 받습니다.<br><br>소환된 티버는 항상 <spellname>용암 방패</spellname>의 효과를 받습니다.", // 용암 방패
        "R": "<passive>기본 지속 효과:</passive> 애니가 {v1}%의 마법 관통력을 얻습니다.<br><br>애니가 티버를 소환해 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다. 티버는 {v3}초간 주변 적을 불태워 <magicdamage>초당 {v4}의 마법 피해</magicdamage>를 입힙니다.<br><br>애니가 적 챔피언을 기절시키거나 사망하면 소환된 티버가 분노합니다. 티버는 분노 시 <attackspeed>공격 속도가 275%</attackspeed>, <speed>이동 속도가 100%</speed> 증가합니다. 이 효과는 3초에 걸쳐 원래대로 돌아옵니다.<br><br><recast>재사용 시:</recast> 티버를 직접 조종할 수 있습니다.", // 소환: 티버
    },
    "Jade_Annie": { // 애니
        "P": "애니가 스킬을 4번 사용한 후 다음 공격 스킬에 맞은 대상은 1.75초 동안 기절합니다.", // 방화광 — CD 요약본, 직접 다듬을 것
        "Q": "애니가 화염구를 던져 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. <spellname>붕괴</spellname>로 적을 처치하면 사용한 마나가 다시 회복됩니다.", // 붕괴
        "W": "애니가 원뿔 모양의 불을 발사하여 해당 지역에 있는 모든 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.", // 소각
        "E": "애니가 화염 방어막으로 자신을 감싸 {v1}초 동안 <scalearmor>방어력</scalearmor>과 <scalemr>마법 저항력</scalemr>이 {v2}만큼 증가합니다. 애니를 공격하는 적은 <magicdamage>{v3}의 마법 피해</magicdamage>를 입습니다.", // 용암 방패
        "R": "티버가 불길에 휩싸인 채 나타나 대상 지역에 있는 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.<br><br>다음 {v2}초 동안 티버가 적을 추격하며 주변 적에게 초당 <magicdamage>{v3}의 마법 피해</magicdamage> 를 입힙니다.", // 소환: 티버
    },
    "Anivia": { // 애니비아
        "P": "애니비아는 치명적인 피해를 입으면 알 형태로 돌아가 체력을 완전히 회복한 후 환생합니다.", // 환생 — CD 요약본, 직접 다듬을 것
        "Q": "애니비아가 거대한 얼음 덩어리를 발사해 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 적들을 {v2}초 동안 <keywordmajor>냉각</keywordmajor>하여 @Spell.GlacialStorm:SlowAmount@% <status>둔화</status>시킵니다. 사거리 끝에 다다르면 얼음이 폭발하며 적들을 {v3}초 동안 <status>기절</status>시키고 <magicdamage>{v4}의 마법 피해</magicdamage>를 입힙니다.<br><br>애니비아가 스킬을 <recast>재사용</recast>하면 얼음 덩어리가 일찍 폭발합니다.", // 냉기 폭발
        "W": "애니비아가 {v1} 너비의 얼음 벽을 만듭니다. 벽은 {v2}초 뒤 녹습니다.", // 결정화
        "E": "애니비아가 적에게 냉기의 바람을 날려 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 적이 <keywordmajor>냉각</keywordmajor> 상태일 경우 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.", // 동상
        "R": "<toggle>활성화/비활성화:</toggle> 애니비아가 {v1}초에 걸쳐 크기가 커지는 얼음의 폭풍우를 소환하여 적에게 <magicdamage>초당 {v2}의 마법 피해</magicdamage>를 입히고 {v3}% <status>둔화</status>시킵니다.<br><br>얼음 폭풍이 최대 크기가 되면 적들을 <keywordmajor>냉각</keywordmajor>하고 {v4}% <status>둔화</status>시키며, <magicdamage>초당 {v5}의 마법 피해</magicdamage>를 입힙니다.", // 얼음 폭풍
    },
    "Jade_Anivia": { // 애니비아
        "P": "애니비아는 죽을 때 알로 변합니다. 이 알이 6초 동안 깨지지 않으면 애니비아가 되살아납니다.", // 환생 — CD 요약본, 직접 다듬을 것
        "Q": "거대한 얼음 덩어리를 지정한 지역에 발사하여 대상에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 냉각시켜 이동 속도를 20% <status>둔화</status>시킵니다. <br><br>사거리 끝에 다다르거나 애니비아가 이 스킬을 <recast>재사용</recast>할 경우 구체가 폭발하며 작은 지역에 <magicdamage>{v2}의 마법 피해</magicdamage>를 입히고 {v3}초 동안 적을 <status>기절</status>시킵니다.", // 냉기 폭발
        "W": "애니비아가 {v1} 너비의 지나갈 수 없는 얼음 벽을 만들어 적의 움직임을 제한합니다. 벽은 {v2}초 뒤 녹습니다.", // 결정화
        "E": "애니비아가 목표 적에게 냉기의 바람을 날려 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 대상이 냉각 상태라면 <magicdamage>{v2}의 마법 피해</magicdamage>를 입습니다.", // 동상
        "R": "<toggle>활성화/비활성화: </toggle>애니비아가 얼음의 폭풍우를 소환하여 적에게 초당 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 냉각시켜 공격 속도 및 이동 속도를 {v2}% <status>둔화</status>시킵니다.", // 얼음 폭풍
    },
    "Ashe": { // 애쉬
        "P": "애쉬의 공격을 받은 대상이 느려지며, 이 대상에 대한 애쉬의 공격력이 상승합니다.<br><br>애쉬의 치명타는 추가 피해를 가하지 않는 대신, 대상에게 더 강력한 둔화를 적용합니다.", // 서리 화살 — CD 요약본, 직접 다듬을 것
        "Q": "<passive>기본 지속 효과: </passive>애쉬가 기본 공격 시 {v1}초 동안 유지되는 중첩이 1회 쌓입니다. {v2}회 중첩 시 이 스킬을 사용할 수 있습니다.<br><br><passive>사용 시:</passive> {v3}초 동안 애쉬의 <attackspeed>공격 속도가 {v4}%</attackspeed> 오르며 기본 공격이 <physicaldamage>{v5}의 피해</physicaldamage>를 입힙니다.", // 궁사의 집중
        "W": "애쉬가 {v1}개의 화살을 일제히 쏴 각각 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입힙니다. 적들은 일제 사격의 여러 화살에 맞을 수 있지만, 그중 첫 번째 화살에만 피해를 입습니다.", // 일제 사격
        "E": "애쉬가 매를 맵 어느 위치든 날려 보내 5초 동안 시야를 확보합니다. 매는 날아가는 동안 주변 지역을 드러냅니다.<br><br>이 스킬은 2회까지 충전됩니다. (재충전 시간 {v1}초)", // 매 날리기
        "R": "애쉬가 얼음 수정 화살을 발사하여 처음으로 맞힌 챔피언에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 <status>기절</status>시킵니다. <status>기절</status> 지속시간은 화살이 날아가는 거리에 비례하여 {v2}초까지 증가합니다. <spellname>서리 화살</spellname>에 맞은 주변 적들은 <status>둔화</status>됩니다.", // 마법의 수정화살
    },
    "Jade_Ashe": { // 애쉬
        "P": "애쉬는 비전투 상태인 동안 <spellName>집중</spellName> 중첩을 얻습니다. 애쉬의 <spellName>집중</spellName> 중첩이 100이 되면 다음 기본 공격이 치명타가 됩니다.", // 집중 — CD 요약본, 직접 다듬을 것
        "Q": "<maintext><toggle>활성화/비활성화:</toggle> 기본 공격 시 대상을 {v1}초 동안 {v2}% <status>둔화</status>시킵니다.", // 냉기 화살
        "W": "<maintext>원뿔 모양으로 화살을 발사하여 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다. <spellname>일제 사격</spellname>은 <spellname>냉기 화살</spellname>의 <status>둔화</status> 효과를 적용합니다.", // 일제 사격
        "E": "<maintext><passive>기본 지속 효과:</passive> 애쉬가 적을 처치할 때마다 <gold>추가로 {v1}골드</gold>를 획득합니다.<br><br><active>사용 시:</active> 애쉬가 매를 날려 보내 5초 동안 대상 지역의 시야를 확보합니다. 매는 날아가는 동안 주변 지역을 드러냅니다.", // 매 날리기
        "R": "<maintext>애쉬가 얼음 수정 화살을 일직선으로 발사해, 적 챔피언을 <status>기절</status>시키고 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. <status>기절</status>의 지속시간은 날아간 거리에 따라 {v2}초까지 증가합니다. 주변의 적 역시 3초 동안 50% <status>둔화</status>되고 <magicdamage>{v3}의 피해</magicdamage>를 받습니다.", // 마법의 수정화살
    },
    "Yasuo": { // 야스오
        "P": "야스오의 치명타 확률이 증가합니다. 또한, 야스오는 이동할 때마다 보호막이 충전되며, 챔피언이나 몬스터로부터 피해를 입으면 보호막이 발동됩니다.", // 낭인의 길 — CD 요약본, 직접 다듬을 것
        "Q": "야스오가 검을 내질러 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다. 적중 시 {v2}초간 1회 중첩됩니다. 2회 중첩 시 이 스킬을 다시 사용하면 회오리바람을 날려 동일한 피해를 입히고 {v3}초 동안 <status>띄워 올립니다</status>.<br><br>돌진 도중 이 스킬을 사용할 경우 원형으로 타격합니다.", // 강철 폭풍
        "W": "4초간 모든 적의 투사체를 막아주는 바람의 벽을 생성합니다.", // 바람 장막
        "E": "대상을 뚫고 돌진하여 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 이후 사용할 때마다 {v2}초간 돌진의 추가 피해량이 <magicdamage>{v3}</magicdamage>씩 상승하며, 이 효과는 최대 {v4}회 중첩됩니다.<br><br>이 스킬은 공격 대상별로 {v5}초의 재사용 대기시간이 적용됩니다.", // 질풍검
        "R": "야스오가 적 챔피언에게 순간이동하여 <status>공중</status>에 띄워 붙들어 두며 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 주변 모든 적을 {v2}초 더 <status>공중</status>에 붙들어 둡니다. <keywordmajor>기류</keywordmajor>가 최대치로 차는 대신, <spellname>강철 폭풍</spellname> 중첩을 모두 잃습니다.<br><br>이후 야스오의 치명타 공격이 {v3}초 동안 대상 <scalearmor>추가 방어력의 {v4}%</scalearmor>를 무시합니다.", // 최후의 숨결
    },
    "Ekko": { // 에코
        "P": "같은 대상에 대한 세 번째 기본 공격 및 스킬 공격마다 추가 마법 피해를 입힙니다. 대상이 챔피언일 경우, 에코의 이동 속도가 상승합니다.<br><br>", // Z 드라이브 공진 — CD 요약본, 직접 다듬을 것
        "Q": "에코가 장치를 던져 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 장치는 챔피언에게 맞거나 사거리 끝에 도달하면 역장을 펼쳐 안에 있는 적을 {v2}% <status>둔화</status>시킵니다. 이후 에코가 장치를 불러들이며 <magicdamage>{v3}의 마법 피해</magicdamage>를 입힙니다.", // 시간의 톱니바퀴
        "W": "<passive>기본 지속 효과:</passive> 에코의 기본 공격은 체력이 {v1}% 미만인 적에게 <magicdamage>잃은 체력의 {v2}에 해당하는 마법 피해</magicdamage>를 입힙니다.<br><br><active>사용 시:</active> 에코가 잠시 후 {v3}초 동안 유지되는 시간의 구체를 발사하여 안에 있는 적을 {v4}% <status>둔화</status>시킵니다. 에코가 구체 안에 들어가면 구체를 폭발시켜 {v5}초 동안 <status>기절</status>시키고 <shield>{v6}의 피해를 흡수하는 보호막</shield>을 얻습니다.", // 평행 시간 교차
        "E": "에코가 돌진합니다. 다음 기본 공격이 강화되어 사거리가 늘어나고 에코가 대상 쪽으로 순간이동하며 <magicdamage>{v1}의 마법 피해</magicdamage>를 추가로 입힙니다.", // 시간 도약
        "R": "에코가 시간을 되돌려 경직 상태에 빠지며 4초 전에 있던 지점으로 되돌아가 근처의 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 <healing>체력을 {v2}</healing> 회복합니다. 회복량은 이 4초 동안 에코가 잃은 체력에 따라 증가하며, 잃은 체력 1%당 회복량이 {v3}% 증가합니다.", // 시공간 붕괴
    },
    "Elise": { // 엘리스
        "P": "인간 형태: 엘리스의 스킬이 적에 적중하면 휴면 상태의 새끼 거미가 생깁니다.<br><br>거미 형태: 기본 공격 시 추가 마법 피해를 입히고, 엘리스의 체력이 회복됩니다.", // 거미 여왕 — CD 요약본, 직접 다듬을 것
        "Q": "<keywordmajor>인간 형태</keywordmajor>: 엘리스가 신경독을 주입해 <magicdamage>{v1}+대상 현재 체력의 {v2}에 해당하는 마법 피해</magicdamage>를 입힙니다.", // 신경독 / 독이빨
        "W": "<keywordmajor>인간 형태</keywordmajor>: 엘리스가 폭발하는 새끼 거미를 소환하면, 지정한 위치로 이동해 근처에 적이 있을 때, 혹은 3초 뒤에 폭발합니다. 거미는 <magicdamage>@spell.EliseHumanW:TotalDamage@의 마법 피해</magicdamage>를 입힙니다.", // 위험한 새끼 거미 / 광란의 질주
        "E": "<keywordmajor>인간 형태</keywordmajor>: 엘리스가 고치를 던져 처음 적중한 적을 {v1}초 동안 <status>기절</status>시키며, 위치를 드러냅니다.", // 고치 / 줄타기
        "R": "<keywordmajor>인간 형태</keywordmajor>: 엘리스가 위협적인 거미로 변신하여 근접 챔피언이 되며 <keywordmajor>거미 형태</keywordmajor> 스킬을 사용할 수 있고 휴면 상태의 <keywordmajor>새끼 거미</keywordmajor>를 모두 소환합니다.", // 거미 형태
    },
    "MonkeyKing": { // 오공
        "P": "오공이 챔피언 및 몬스터와 싸우는 동안 방어력이 점점 높아지며 최대 체력 재생 효과를 얻습니다.", // 바위 피부 — CD 요약본, 직접 다듬을 것
        "Q": "오공과 <keywordmajor>분신</keywordmajor>이 다음 공격 시 사거리가 {v1} 증가하고 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 추가로 입히며 {v3}초 동안 대상의 <scalearmor>방어력이 {v4}%</scalearmor> 감소합니다.<br><br>오공이나 오공의 <keywordmajor>분신</keywordmajor>이 기본 공격 및 스킬로 적을 공격할 때마다 이 스킬의 재사용 대기시간이 {v5}초 감소합니다.<br><br><rules>이 스킬은 피해를 입힐 때 효과가 발동합니다.</rules>", // 파쇄격
        "W": "오공이 돌격하며 {v1}초 동안 <keywordstealth>투명</keywordstealth> 상태가 되고 {v2}초 동안 움직이지 않는 <keywordmajor>분신</keywordmajor>을 생성합니다.<br><br><keywordmajor>분신</keywordmajor>은 오공의 궁극기를 모방하여 오공이 최근에 피해를 입힌 근처 적을 공격해 기존 피해량의 {v3}%만큼 피해를 입힙니다.", // 분신 전사
        "E": "오공이 적에게 돌격하며 자신의 <keywordmajor>분신</keywordmajor>을 만들어 근처의 적 최대 {v1}명에게 돌격시킵니다. 적중당한 적은 각각 <magicdamage>{v2}의 마법 피해</magicdamage>를 입습니다. 오공과 <keywordmajor>분신</keywordmajor>은 {v3}초 동안 <attackspeed>{v4}%의 공격 속도</attackspeed>를 얻습니다.<br><br>", // 근두운 급습
        "R": "오공이 <speed>{v1}%의 이동 속도</speed>를 얻고 {v2}초 동안 여의봉을 휘두릅니다. 여의봉에 맞은 근처 적들은 {v3}초 동안 <status>공중에</status> 뜨며 <physicaldamage>{v4}+최대 체력의 {v5}에 해당하는 물리 피해</physicaldamage>를 입습니다.<br><br>재사용 대기시간이 적용되기 전 {v6}초 안에 이 스킬을 한 번 더 사용할 수 있습니다.", // 회전격
    },
    "Jade_Wukong": { // 오공
        "P": "근처에 있는 적 챔피언의 수에 따라 오공의 방어력과 마법 저항력이 증가합니다.", // 바위 피부 — CD 요약본, 직접 다듬을 것
        "Q": "오공의 다음 기본 공격이 강화되어 {v1}의 사거리를 얻고, <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입히며, {v3}초 동안 적의 <scalearmor>방어력을 {v4}%</scalearmor> 감소시킵니다.", // 파쇄격
        "W": "<maintext>오공이 {v1}초 동안 <keywordstealth>투명</keywordstealth> 상태가 됩니다. 이후 그 자리에 조종할 수 없는 분신을 남겨, {v2}초 뒤 주변 적에게 <magicdamage>{v3}의 마법 피해</magicdamage>를 입히게 합니다.", // 분신술
        "E": "<maintext>오공이 지정한 적에게 돌진하는 동시에 대상 근처에 있는 최대 2명의 적에게 분신을 보내, 적중한 모든 적에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다. 대상을 맞히면 오공이 {v2}초 동안 <attackspeed>{v3}%의 공격 속도</attackspeed>를 얻습니다.", // 근두운 급습
        "R": "<maintext>오공이 봉을 늘린 뒤 이를 휘둘러, 초당 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 적중한 적을 <status>공중에 띄웁니다</status>. 이 스킬을 사용하는 동안 오공의 <speed>이동 속도</speed>가 점차 증가합니다. {v2}초 동안 지속됩니다. <recast>재사용 시:</recast> 궁극기를 일찍 종료합니다.", // 회전격
    },
    "Aurora": { // 오로라
        "P": "오로라가 스킬 또는 공격으로 피해를 입힌 적의 영혼을 제령합니다. 제령된 영혼은 오로라 주위를 따라다니며 체력을 회복시킵니다.", // 영혼 방호술 — CD 요약본, 직접 다듬을 것
        "Q": "지정한 방향으로 저주받은 에너지를 발사해 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 저주를 내립니다.<br><br><recast>재사용 시:</recast> 저주를 끝내고 적의 영혼 일부를 오로라에게 끌어당겨 경로상의 적에게 적이 잃은 체력에 비례해 최대 <magicdamage>{v3}의 마법 피해</magicdamage>를 입힙니다. 처음 적중한 이후에는 피해량이 20%로 감소합니다.<br><br>지속시간이 지나면 오로라가 자동으로 스킬을 <recast>재사용</recast>합니다.", // 이중 저주
        "W": "오로라가 지정한 방향으로 뛰어오릅니다. 착지하며 영혼 세계에 진입해 {v1}초 동안 <keywordstealth>투명</keywordstealth> 상태가 되며 <keywordmajor>세계를 넘나드는 자</keywordmajor>가 되어 <speed>이동 속도가 {v2}%</speed> 증가합니다.<br><br>적 챔피언 처치에 관여하면 이 스킬의 재사용 대기시간이 초기화됩니다.", // 장막 너머로
        "E": "세계를 합치고 영혼 마법을 발사해 범위 내의 모든 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히며 {v2}% <status>둔화</status>시킵니다. 둔화 효과는 {v3}초에 걸쳐 사라집니다.<br><br>오로라가 스킬 사용 후 뒤로 짧은 거리를 도약합니다.<br>", // 마법의 문
        "R": "지정한 방향으로 뛰어오릅니다. 착지하며 세계를 합치고 영혼 에너지 파동을 방출해 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히며 적중당한 모든 적을 2초 동안 {v2}% <status>둔화</status>시킵니다.<br><br>융합 영역은 {v3}초 동안 유지되며 오로라에게 {v4}초 동안 <keywordmajor>세계를 넘나드는 자</keywordmajor>를 부여합니다. 오로라가 한 영역에서 건너편으로 점프할 수 있게 됩니다.<br><br>영역을 드나들려는 적은 {v5}초 동안 {v6}% <status>둔화</status>됩니다.<br><br>스킬을 <recast>재사용</recast>하면 효과를 빨리 종료할 수 있습니다.", // 세계의 경계
    },
    "Ornn": { // 오른
        "P": "오른이 추가 방어력과 마법 저항력을 얻습니다.<br><br>오른은 어디에서든 골드를 써서 소모품을 제외한 아이템을 제작할 수 있습니다.<br><br>또한 걸작 아이템을 만들어 직접 사용하거나 아군의 아이템을 업그레이드할 수 있습니다.", // 간이 대장간 — CD 요약본, 직접 다듬을 것
        "Q": "오른이 지면을 내려쳐 적에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 {v2}초 동안 {v3}% <status>둔화</status>시키는 균열을 만듭니다. 잠시 후 균열이 끝나는 지점에 {v4}초 동안 용암 기둥이 생성됩니다.", // 용암 균열
        "W": "오른이 {v1}초 동안 저지 불가 상태로 전진하며 불꽃을 뿜어 <magicdamage>대상 최대 체력의 {v2}%에 해당하는 마법 피해</magicdamage>를 입힙니다. 마지막 불꽃에 맞은 적은 {v3}초 동안 <keywordmajor>불안정</keywordmajor> 상태가 됩니다.<br><br><keywordmajor>불안정</keywordmajor> 상태인 대상에게는 <status>이동 불가</status> 효과의 지속시간이 30% 증가하며 <magicdamage>최대 체력의 {v4}에 해당하는 마법 피해</magicdamage>를 추가로 입힙니다. 오른이 <keywordmajor>불안정</keywordmajor> 상태인 대상에게 기본 공격을 가하면 <status>뒤로</status> <status>밀어내며</status> 추가 피해를 입힙니다.", // 불꽃 풀무질
        "E": "오른이 돌진하며 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다. 돌진 중 지형지물에 충돌하면 충격파가 발생해 적을 {v2}초 동안 <status>공중으로 띄워 올리며</status> 돌진에 부딪히지 않은 적에게 화염 돌진의 피해를 적용합니다.<br><br>오른의 돌진은 용암 기둥이나 적이 만든 지형지물을 파괴합니다.", // 화염 돌진
        "R": "오른이 자신에게 다가오는 거대한 불의 정령을 소환해 적들에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 <keywordmajor>불안정</keywordmajor> 상태로 만들며 {v3}% <status>둔화</status>시킵니다.<br><br>오른이 스킬을 <recast>재사용</recast>하면 돌진하며 박치기합니다. 정령에게 박치기를 하면 정령의 진행 방향을 바꾸고 힘을 실어 줄 수 있습니다. 힘을 받은 정령은 처음 닿는 적 챔피언을 {v4}초 동안, 나머지 적 챔피언들은 {v5}초 동안 <status>공중으로 띄워 올립니다</status>. 또한 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 다시 한번 <keywordmajor>불안정</keywordmajor> 상태로 만듭니다.", // 대장장이 신의 부름
    },
    "Orianna": { // 오리아나
        "P": "오리아나의 기본 공격은 추가 마법 피해를 입힙니다. 같은 적을 연속으로 공격할수록 추가 마법 피해량도 커집니다.", // 시계태엽 감기 — CD 요약본, 직접 다듬을 것
        "Q": "오리아나가 <keywordmajor>구체</keywordmajor>에게 이동하도록 명령하여 해당 지점 주변에 있는 적들과 이동 중에 마주치는 적들에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 두 번째 적부터 피해량이 {v2}% 감소합니다.", // 명령: 공격
        "W": "오리아나가 <keywordmajor>구체</keywordmajor>에게 에너지를 방출하도록 명령하여 주변에 있는 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.<br><br>이때 자기장이 {v2}초 동안 발생하여 적들을 {v3}% <status>둔화</status>시키고 아군에게는 <speed>{v4}%의 이동 속도</speed>를 부여합니다. 이 효과는 {v5}초에 걸쳐 점점 사라집니다.", // 명령: 불협화음
        "E": "<passive>기본 지속 효과: </passive><keywordmajor>구체</keywordmajor>가 보호하는 아군 챔피언은 <scalearmor>{v1}의 방어력</scalearmor>과 <scalemr>{v1}의 마법 저항력</scalemr>을 얻습니다.<br><br><active>사용 시: </active>오리아나가 <keywordmajor>구체</keywordmajor>에게 아군 챔피언을 따라다니도록 명령해 {v2}초 동안 <shield>{v3}의 피해를 흡수하는 보호막</shield>을 씌웁니다. 중간에 <keywordmajor>구체</keywordmajor>와 마주치는 적들은 <magicdamage>{v4}의 마법 피해</magicdamage>를 입습니다.", // 명령: 보호
        "R": "오리아나가 <keywordmajor>구체</keywordmajor>에게 충격파를 방출하도록 명령하여 근처에 있는 적들에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 <keywordmajor>구체</keywordmajor> 쪽으로 <status>끌어당깁니다</status>.", // 명령: 충격파
    },
    "Olaf": { // 올라프
        "P": "올라프가 잃은 체력에 비례해 공격 속도와 생명력 흡수를 얻습니다.", // 광전사의 분노 — CD 요약본, 직접 다듬을 것
        "Q": "올라프가 도끼를 던져 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 최대 {v2}초 동안 {v3}% <status>둔화</status>시킵니다. (지속시간은 도끼가 날아간 거리에 비례합니다.) 도끼에 맞은 적 챔피언은 {v4}초 동안 <scalearmor>방어력이 {v5}%</scalearmor> 감소합니다.<br><br>올라프가 도끼를 집으면 이 스킬의 재사용 대기시간이 {v6}초로 감소하거나, {v6}초가 지나면 스킬을 바로 재사용할 수 있습니다.", // 역류
        "W": "{v1}초 동안 올라프의 <attackspeed>공격 속도가 {v2}%</attackspeed> 증가하고 {v3}초 동안 <shield>{v4}+잃은 체력의 {v5}%에 해당하는 보호막(체력이 {v6}% 밑으로 떨어지면 최대 {v7})</shield>을 얻습니다.", // 버티기
        "E": "올라프가 맹렬한 기세로 도끼를 휘둘러 <truedamage>{v1}의 고정 피해</truedamage>를 입힙니다. 적을 처치하면 소모값을 되돌려받습니다.<br><br>기본 공격 시 이 스킬의 재사용 대기시간이 1초 감소합니다. 몬스터 공격 시 2초 감소합니다.", // 무모한 강타
        "R": "<passive>기본 지속 효과:</passive> 올라프의 <scalearmor>방어력이 {v1}</scalearmor>, <scalemr>마법 저항력이 {v1}</scalemr> 증가합니다.<br><br><active>사용 시: </active>올라프가 자신에게 걸린 모든 <status>이동 불가</status> 및 <status>방해</status> 효과를 정화하고 {v2}초 동안 해당 효과에 면역 상태가 됩니다. 활성화 중 올라프가 <scalead>{v3}의 공격력</scalead>을 얻습니다. 기본 공격이나 <spellname>무모한 강타</spellname>로 챔피언을 적중하면 이 스킬의 지속시간을 {v4}초 연장합니다.<br><br>또한 {v5}초 동안 적 챔피언을 향해 이동할 때 <speed>이동 속도가 {v6}%</speed> 증가합니다.", // 라그나로크
    },
    "Jade_Olaf": { // 올라프
        "P": "올라프는 체력이 줄어들수록 공격 속도가 증가합니다.", // 광전사의 분노 — CD 요약본, 직접 다듬을 것
        "Q": "올라프가 지정한 위치로 도끼를 던져, 경로상의 유닛에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 {v2}초에 걸쳐 점차 감소하는 {v3}%의 <status>둔화</status>를 적용합니다.<br><br>올라프가 도끼를 집으면 이 스킬의 재사용 대기시간이 {v4}초 감소합니다.", // 역류
        "W": "올라프가 {v1}초 동안 <physicaldamage>{v2}의 공격력</physicaldamage>과 {v3}%의 생명력 흡수, 주문 흡혈을 얻습니다.", // 광포한 공격
        "E": "올라프가 맹렬한 기세로 도끼를 휘둘러, 대상에게 <truedamage>{v1}의 고정 피해</truedamage>를 입힙니다.", // 무모한 강타
        "R": "올라프가 자신에게 적용 중인 모든 <status>이동 불가</status> 및 <status>방해</status> 효과를 정화하고, 다음 {v1}초 동안 해당 효과에 면역이 됩니다. 그동안 올라프가 <scalearmor>{v2}의 방어력</scalearmor>, <scalemr>{v2}의 마법 저항력</scalemr>, {v3}의 물리 관통력을 얻습니다.<br><br>", // 라그나로크
    },
    "Yone": { // 요네
        "P": "요네가 두 번째 공격을 할 때마다 마법 피해를 입힙니다. 또한 요네의 치명타 확률이 증가합니다.", // 사냥꾼의 길 — CD 요약본, 직접 다듬을 것
        "Q": "전방으로 검을 내질러 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다.<br><br>적중 시, {v2}초간 1회 중첩됩니다. 2회 중첩되면 요네가 전방으로 돌진하며 돌풍을 날려 {v3}초 동안 적을 <status>공중으로 띄워 올리고</status> <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다.", // 필멸의 검
        "W": "요네가 전방을 가르며 <physicaldamage>{v1}+최대 체력의 {v2}%에 해당하는 물리 피해</physicaldamage> 및 <magicdamage>{v1}+최대 체력의 {v2}%에 해당하는 마법 피해</magicdamage>를 입힙니다.<br><br>요네의 공격이 적중하면 {v3}초 동안 <shield>{v4}의 보호막</shield>을 얻습니다. 적중한 챔피언 수만큼 <shield>보호막</shield> 흡수량이 증가합니다.", // 영혼 가르기
        "E": "요네가 {v1}초 동안 영혼 상태가 되어 육신을 떠나고 <speed>이동 속도가 {v2}%</speed>에서 <speed>{v3}%</speed>까지 점차 증가합니다. <br><br>영혼 상태가 끝나면 다시 육신으로 돌아오며 영혼 상태에서 챔피언에게 입힌 모든 기본 공격 및 스킬 피해량의 {v4}%를 다시 입힙니다. 영혼 상태에서 스킬을 <recast>재사용</recast>할 수 있습니다.<br><br><recast>재사용 시: </recast>영혼 상태를 더 일찍 종료합니다.", // 영혼해방
        "R": "요네가 경로에 있는 모든 적을 공격해 <physicaldamage>{v1}의 물리 피해</physicaldamage>와 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 경로에 있는 마지막 챔피언 뒤로 순간이동해 적중한 모든 적을 자신 쪽으로 끌어당기며 <status>공중으로 띄워 올립니다</status>.", // 운명봉인
    },
    "Yorick": { // 요릭
        "P": "<font color='#FF9900'>저주받은 무리:</font> 요릭이 안개 망령 무리를 소환해 주변 적을 공격합니다.", // 영혼의 길잡이 — CD 요약본, 직접 다듬을 것
        "Q": "요릭이 다음 기본 공격으로 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 추가로 입히고 <healing>{v2}+요릭이 잃은 체력의 {v3}%</healing>를 회복합니다. 챔피언이 아닌 대상 상대 시 회복량이 {v4}% 감소합니다. 이 공격으로 챔피언 또는 대형 몬스터를 타격하거나 대상을 처치하면 무덤이 생성됩니다.<br><br>근처에 무덤이 3개 이상 있을 때 이 스킬을 이미 사용한 상태라면 <recast>재사용</recast>하여 근처의 모든 무덤에서 <keywordmajor>안개 망령</keywordmajor>을 일으킬 수 있습니다.", // 최후의 의식
        "W": "요릭이 영혼의 벽을 소환하여 적의 길을 막되 아군의 길은 막지 않습니다. 영혼의 벽은 <healing>{v1}의 체력</healing>을 가지며 {v2}초 후 사라집니다.", // 망자의 진
        "E": "요릭이 안개의 구를 던져 <magicdamage>최대 체력의 {v1}만큼 마법 피해</magicdamage>를 입히고 {v2}초 동안 {v3} <status>둔화</status>시키며, {v4}초 동안 챔피언과 몬스터에게 표식을 남깁니다. 표식이 남은 적은 무덤 근처에서 지속적으로 안개 망령을 <spellname>각성</spellname>시킵니다. (최대 @Spell.YorickPassive:YorickPassiveGhoulMax@명까지 소환됩니다.) 또한 <scalearmor>방어력이 {v5}% 감소</scalearmor>합니다.<br><br>요릭과 요릭이 소환한 유닛은 표식이 있는 대상 쪽으로 이동할 때 <speed>이동 속도가 {v6}%</speed> 증가합니다. <keywordmajor>안개 망령</keywordmajor>은 멀어지는 적에게 한 번 뛰어들 수 있습니다.", // 애도의 안개
        "R": "요릭이 <healing>{v1}의 체력</healing> 및 <magicdamage>{v2}의 마법 피해 공격력</magicdamage>을 지닌 <keywordmajor>안개 마녀</keywordmajor>와 <keywordmajor>안개 망령</keywordmajor> {v3}명을 소환합니다. <keywordmajor>안개 마녀</keywordmajor>는 근처에서 죽은 적으로부터 자동으로 <keywordmajor>안개 망령</keywordmajor>을 일으키고 기본 공격 시 적 챔피언에게 표식을 남깁니다. 요릭이 <keywordmajor>안개 마녀</keywordmajor>의 표적을 공격하면 <magicdamage>최대 체력의 {v4}%에 해당하는 마법 피해</magicdamage>를 입힙니다.<br><br>10초 후 이 스킬을 <recast>재사용</recast>하면 <keywordmajor>안개 마녀</keywordmajor>를 해방해 가장 가까운 공격로로 보냅니다.", // 군도의 장송곡
    },
    "Udyr": { // 우디르
        "P": "네 가지 기본 스킬로 여러 태세를 오갈 수 있습니다. 재사용 대기 중인 스킬을 재사용하면 재사용 대기 시간을 초기화하고 궁극의 효과를 부여합니다. 또한, 스킬 사용 후 다음 기본 공격 2회의 공격 속도가 증가합니다.", // 가교 — CD 요약본, 직접 다듬을 것
        "Q": "<active>발톱 태세:</active> {v1}초 동안 <attackspeed>공격 속도가 {v2}%</attackspeed> 상승하고 기본 공격으로 <onhit>적중 시</onhit> <physicaldamage>{v3}의 물리 피해</physicaldamage>를 입힙니다. 이 태세에서 가하는 다음 두 차례 기본 공격으로 <physicaldamage>최대 체력의 {v4}에 해당하는 물리 피해</physicaldamage>를 추가로 입히고 사거리가 {v5} 증가합니다.<br><br><keywordmajor>각성:</keywordmajor> 추가 <attackspeed>공격 속도</attackspeed>가 <attackspeed>{v6}</attackspeed>까지 상승하고 최대 체력 비례 피해량이 <physicaldamage>{v7}</physicaldamage>까지 상승합니다. 추가로 다음 두 차례 기본 공격으로 번개를 여섯 번 일으켜 <magicdamage>최대 체력의 {v8}에 해당하는 마법 피해</magicdamage>를 입힙니다. (고립된 적은 이 피해를 혼자 전부 받지만, 주변에 다른 적이 있으면 번개가 그쪽으로 튑니다.)<br>", // 야생 발톱
        "W": "<passive>갑옷 태세:</passive> {v1}초 동안 <shield>{v2}의 보호막</shield>을 얻습니다. 다음 두 차례 기본 공격에 생명력 흡수 {v3}% 효과가 부여되고 적중 시 <healing>{v4}의 체력</healing>을 회복합니다.<br><br><keywordmajor>각성:</keywordmajor> {v1}초 동안 <shield>{v5}의 보호막</shield>을 얻고 <healing>{v6}의 체력</healing>을 회복합니다. 다음 두 차례 기본 공격에 생명력 흡수 {v7}% 효과가 부여되고 적중 시 <healing>{v8}의 체력</healing>을 회복합니다.<br>", // 강철 갑옷
        "E": "<active>쇄도 태세:</active> <speed>이동 속도가 {v1}</speed> 증가했다 {v2}초에 걸쳐 원래대로 돌아갑니다. 기본 공격 시 대상에게 돌진해 {v3}초간 <status>기절</status>시킵니다. (대상별 재사용 대기시간 {v4}초)<br><br><keywordmajor>각성:</keywordmajor> {v5}초간 <status>이동 불가</status> 및 <status>방해</status> 효과에 면역이 되고 <speed>이동 속도가 {v6}</speed> 추가로 증가합니다.", // 불길 쇄도
        "R": "<active>폭풍 태세:</active> {v1}초 동안 얼음 폭풍으로 자신을 감싸 주변 적들에게 매초 <magicdamage>{v2}의 마법 피해</magicdamage>를 입히고 {v3}% <status>둔화</status>시킵니다. 이 태세에서 가하는 다음 두 차례 기본 공격으로 폭풍 안에 있는 적에게 <magicdamage>{v4}의 마법 피해</magicdamage>를 입힙니다.<br><br><keywordmajor>각성:</keywordmajor> 우디르가 마지막으로 기본 공격한 적을 따라가며 지속시간에 걸쳐 <magicdamage>최대 체력의 {v5}에 해당하는 마법 피해</magicdamage>를 추가로 입히고, {v6}만큼 추가로 <status>둔화</status>시키는 폭풍을 풀어놓습니다.", // 날개 돋친 폭풍
    },
    "Urgot": { // 우르곳
        "P": "우르곳은 기본 공격과 심판의 원으로 다리에서 불꽃을 발사해 물리 피해를 입힙니다.", // 화염의 메아리 — CD 요약본, 직접 다듬을 것
        "Q": "우르곳이 부식성 폭약을 발사하여 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 {v2}초 동안 {v3}% <status>둔화</status>시킵니다.", // 부식성 폭약
        "W": "<passive>기본 지속 효과:</passive> 우르곳의 다른 스킬이 마지막으로 적중한 챔피언에게 5초 동안 표식을 남깁니다.<br><br><active>사용 시:</active> 우르곳이 표식이 남은 적을 우선으로 가장 가까운 적에게 기관총을 발사합니다. 초당 {v1}회 공격하여 사격 1회당 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입힙니다. 우르곳은 사격 시 이동할 수 있으며 <status>둔화</status> 저항이 {v3}% 증가하지만 <speed>이동 속도가 {v4}</speed> 감소합니다.<br><br>스킬 레벨을 끝까지 올리면 스킬이 무한히 지속되며 활성화 상태를 <toggle>전환</toggle>할 수 있습니다.", // 심판의 원
        "E": "우르곳이 전방으로 돌진하며 {v1}초 동안 <shield>{v2}의 피해를 흡수하는 보호막</shield>을 얻습니다. 처음 적중한 챔피언은 {v3}초 동안 <status>기절</status>하며 우르곳이 뒤로 던집니다. 우르곳과 충돌하는 모든 적은 <physicaldamage>{v4}의 물리 피해</physicaldamage>를 입습니다.", // 경멸
        "R": "우르곳이 마공학 송곳 섬광탄을 발사하여 섬광탄이 처음 적중한 챔피언에게 꽂힙니다. 섬광탄은 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히며, {v2}초 동안 잃은 체력 1%당 1%씩 최대 {v3}% <status>둔화</status>시킵니다.<br><br>대상의 체력이 {v4}% 이하로 떨어지면 우르곳이 스킬을 <recast>재사용</recast>하여 대상을 <status>제압</status>하고 자신에게 끌어당깁니다. 우르곳 앞에 도착한 대상은 처치되며 주변 적은 {v5}초 동안 <status>공포</status>에 빠집니다.", // 불사의 공포
    },
    "Warwick": { // 워윅
        "P": "워윅이 기본 공격 시 추가 마법 피해를 입힙니다. 워윅의 체력이 50% 아래로 내려가면 추가 피해량만큼 체력을 회복합니다. 체력이 25% 아래로 내려가면 체력 회복량이 세 배로 증가합니다.", // 끝없는 허기 — CD 요약본, 직접 다듬을 것
        "Q": "<tap>짧게 누를 때:</tap> 워윅이 앞으로 도약한 후 대상을 물어 <magicdamage>{v1}+최대 체력의 {v2}%에 해당하는 마법 피해</magicdamage>를 입히고 <healing>입힌 피해량의 {v3}%만큼 체력을 회복</healing>합니다.<br><br><hold>길게 누를 때:</hold> 워윅이 도약한 후 대상을 꽉 물며 뒤로 넘어 갑니다. 꽉 문 동안 워윅은 대상이 이동할 때 같이 이동합니다. 대상을 놓은 후에는 같은 양의 피해를 입히고 체력을 회복합니다.", // 야수의 송곳니
        "W": "<passive>기본 지속 효과:</passive> 체력이 50% 미만인 챔피언을 감지합니다. 해당 챔피언을 향해 이동할 경우 <speed>이동 속도가 {v1}%</speed> 증가합니다. 해당 챔피언에게 스킬 및 기본 공격을 가할 경우 <speed>공격 속도가 {v2}%</speed> 증가합니다. 적의 체력이 25% 이하일 경우 이 효과들은 200% 증가합니다. <br><br><active>사용 시:</active> 잠시 동안 모든 적의 위치를 감지하여 체력과 상관없이 가장 가까이에 있는 적 챔피언에게 8초 동안 이 스킬의 기본 지속 효과를 적용합니다. 발견된 챔피언이 없으면 이 스킬의 재사용 대기시간이 30% 감소합니다.", // 피의 사냥
        "E": "{v1}초 동안 워윅이 입는 피해가 {v2}% 감소합니다. 지속시간이 종료되면 워윅이 포효하며 근처의 모든 적을 {v3}초 동안 <status>공포</status>에 빠뜨립니다. <recast>재사용</recast>하면 스킬이 일찍 종료됩니다.", // 원시의 포효
        "R": "워윅이 <speed>이동 속도</speed>에 비례하는 먼 거리를 도약하여 첫 번째로 부딪힌 적 챔피언을 {v1}초 동안 <status>제압</status>하며 정신을 집중합니다. 지속시간 동안 해당 챔피언을 3회 공격해 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다. 워윅은 정신을 집중하면서 <healing>입힌 모든 피해량의 100%</healing>만큼 체력을 회복합니다.", // 무한의 구속
    },
    "Jade_Warwick": { // 워윅
        "P": "워윅은 기본 공격을 맞힐 때마다 체력을 회복합니다. 동일한 대상에게 연속해서 기본 공격을 맞히면 점점 더 많은 체력을 흡수합니다.", // 끝없는 갈증 — CD 요약본, 직접 다듬을 것
        "Q": "적에게 <magicdamage>{v1}</magicdamage> 또는 대상 최대 체력의 <magicdamage>{v2}%+{v3}</magicdamage> 중 더 높은 수치에 해당하는 <magicdamage>마법 피해</magicdamage>를 입히고(몬스터에게는 정해진 피해량만 적용), 입힌 피해의 {v4}%만큼 <healing>체력을 회복</healing>합니다.", // 갈망의 일격
        "W": "워윅이 울부짖으며 모든 아군 챔피언을 고무합니다. {v1}초 동안 워윅이 <attackspeed>{v2}%의 공격 속도</attackspeed>를, 모든 아군 챔피언이 <attackspeed>{v3}%의 공격 속도</attackspeed>를 얻습니다.", // 사냥 본능
        "E": "<passive>기본 지속 효과: </passive>워윅이 {v1} 거리 내에서 체력이 50% 미만인 적 챔피언을 감지합니다. 체력이 낮은 적을 감지하면 <speed>{v2}%의 이동 속도</speed>를 얻습니다.", // 피비린내
        "R": "워윅이 적 챔피언에게 달려들어 {v1}초 동안 <status>제압</status>합니다. 그동안 대상을 {v2}회 공격하여, 총 <magicdamage>{v3}의 마법 피해</magicdamage>를 입힙니다. (적중 시 효과 {v2}회 적용)<br><br>지속시간 동안 워윅이 {v4}%의 생명력 흡수를 얻습니다.", // 무한의 구속
    },
    "Yunara": { // 유나라
        "P": "유나라의 치명타가 추가 마법 피해를 입힙니다.", // 최초의 땅의 맹세 — CD 요약본, 직접 다듬을 것
        "Q": "<passive>기본 지속 효과:</passive> 유나라가 <onhit>적중 시</onhit> <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 기본 공격이 <evolve>방출을 {v2}</evolve>(챔피언일 경우 <evolve>방출 {v3}</evolve>) 생성합니다.<br><br><passive>사용 시:</passive> 유나라가 <evolve>방출을 {v4}</evolve> 소모하여 {v5}초 동안 <attackspeed>공격 속도를 {v6}</attackspeed> 얻고 <onhit>적중 시</onhit> <magicdamage>{v7}의 마법 피해</magicdamage>를 추가로 입힙니다. 지속시간 동안 유나라의 기본 공격이 주변 적에게 확산되어 <physicaldamage>{v8}의 물리 피해</physicaldamage>를 입힙니다.<br><br><keywordmajor>초월 상태</keywordmajor>: 이 스킬이 즉시 활성화되어 @Spell.YunaraR:Buff_Duration@초 동안 지속됩니다.", // 영혼 단련
        "W": "유나라가 기도의 구슬을 던져 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 <status>{v2} 둔화시킵니다. 둔화 효과는 {v3}초에 걸쳐 감소합니다</status>. 기도의 구슬은 초당 <magicdamage>{v4}의 마법 피해</magicdamage>를 추가로 입힙니다.<br><br><keywordmajor>초월 상태 - 파멸의 궤적</keywordmajor>: 유나라가 빛줄기를 발사해 <magicdamage>@Spell.YunaraR:Calc_RW_Damage@의 마법 피해</magicdamage>를 입히고 <status>@Spell.YunaraR:Calc_RW_Slow_Amount@ 둔화시킵니다. 둔화 효과는 @Spell.YunaraR:RW_Slow_Duration@초에 걸쳐 감소합니다</status>.", // 심판의 궤적 | 파멸의 궤적
        "E": "{v1}초 동안 유나라의 <speed>이동 속도가 {v2}</speed> 증가합니다. 적 챔피언에게 접근 시 <speed>이동 속도가 {v3}</speed>까지 증가합니다.<br><br><keywordmajor>초월 상태 - 닿지 않는 그림자</keywordmajor>: 유나라가 지정한 방향으로 돌진합니다.", // 칸메이의 발자취 | 닿지 않는 그림자
        "R": "유나라가 {v1}초 동안 <keywordmajor>초월 상태</keywordmajor>에 돌입해 지속시간 동안 기본 스킬을 강화합니다.", // 자기 초월
    },
    "Yuumi": { // 유미
        "P": "기본 공격이나 스킬로 챔피언을 맞히면 주기적으로 유미가 체력을 회복하고 다음으로 밀착하는 아군의 체력을 회복시킵니다.<br><br>유미는 밀착한 아군과 특별한 유대를 형성합니다. 가장 유대가 긴밀한 아군에게 밀착한 동안 유미의 스킬이 강화됩니다.", // 야옹이 친구 — CD 요약본, 직접 다듬을 것
        "Q": "유미가 상황에 따라 방향을 바꿀 수 있는 미사일을 소환하여 처음 적중한 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}% <status>둔화</status>시킵니다.<br><br><keywordmajor>밀착 상태</keywordmajor>에서 사용하면 유미가 마우스로 미사일을 조종할 수 있습니다. 일단 속도가 붙은 미사일은 조종할 수 없고 직선으로 날아가며 대상에게 <magicdamage>{v3}의 마법 피해</magicdamage>를 입히고 {v4}초 동안 {v5}% <status>둔화</status>시킵니다.<br><br><keywordmajor>단짝 추가 효과:</keywordmajor> <spellname>사르르탄</spellname>의 <status>둔화</status> 효과가 항상 강화되며 적 챔피언에게 둔화 적용 시 {v6}초 동안 단짝이 강화되어 <onhit>적중 시 </onhit> <magicdamage>{v7}의 마법 피해</magicdamage>를 추가로 입힙니다.<br><br><rules>적중 시 추가 피해량은 단짝의 치명타 확률에 따라 {v8}% 증가할 수 있습니다.</rules>", // 사르르탄
        "W": "<passive>기본 지속 효과:</passive> <keywordmajor>단짝</keywordmajor>에게 붙어있을 때 유미의 <keywordmajor>체력 회복 및 보호막 효과가 {v1}%</keywordmajor> 추가로 증가하며, 단짝은 <healing>체력을 {v2}</healing> 회복합니다. <onhit>적중 시 </onhit>.<br><br><active>사용 시:</active> 유미가 아군 챔피언에게 돌진하여 <keywordmajor>밀착</keywordmajor>합니다. 유미는 <keywordmajor>밀착 상태</keywordmajor>에서 밀착 대상을 따라다니며 포탑을 제외한 유닛이 대상으로 지정할 수 없는 상태가 됩니다.<br><br>유미에게 <status>이동 불가</status> 효과가 적용되면 이 스킬에 {v3}초의 재사용 대기시간이 적용됩니다.", // 너랑 유미랑!
        "E": "유미가 <shield>{v1}의 피해</shield>를 흡수하는 보호막을 얻고 {v2}초 동안 <attackspeed>공격 속도가 {v3}%</attackspeed> 증가합니다. 보호막이 남아있는 동안 대상의 <speed>이동 속도가 {v4}%</speed> 증가합니다.<br><br>유미가 <keywordmajor>밀착</keywordmajor> 상태면 위 효과를 유미 대신 해당 아군에게 적용하고 <magicdamage>마나를 {v5}</magicdamage> 회복시킵니다. 마나 회복량은 대상이 잃은 마나에 따라 {v6}%까지 증가합니다.", // 슈우우웅
        "R": "유미가 {v1}초 동안 정신을 집중해 양 팀 모두에 영향을 주는 마법의 파동을 {v2}번 발사합니다. 처음 <keywordmajor>밀착</keywordmajor>한 상태에서 시전하면 유미는 마우스를 따라 파동을 조종할 수 있습니다.<br><br>적중당한 적에게 <magicdamage>{v3}의 마법 피해</magicdamage>를 입히고 {v4}초 동안 {v5}% <status>둔화</status>시킵니다. 둔화 효과는 파동에 적중될 때마다 {v6}% 증가합니다.<br><br>아군 챔피언은 파동마다 <healing>{v7}의 체력</healing>을 회복합니다. 체력 회복 초과분은 <shield>보호막</shield>으로 전환됩니다.<br><br><keywordmajor>단짝 보너스:</keywordmajor> 유미의 <keywordmajor>단짝</keywordmajor>은 회복량이 증가해 <healing>{v8}의 체력</healing>을 회복합니다.<br><br><rules><spellname>너랑 유미랑!</spellname>을 시전하면 파동을 현재 방향으로 고정합니다.<br>유미는 정신을 집중하는 동안 이동할 수 있으며 <spellname>슈우우웅</spellname> 스킬을 사용할 수 있습니다.</rules><br>", // 대단원
    },
    "Irelia": { // 이렐리아
        "P": "이렐리아의 스킬이 적에게 적중하면 중첩이 쌓이며, 중첩에 따라 추가 공격 속도가 적용됩니다. 최대 중첩이 쌓이면 적중 시 피해도 증가합니다.", // 아이오니아의 열정 — CD 요약본, 직접 다듬을 것
        "Q": "이렐리아가 적에게 돌진해 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 <healing>{v2}의 체력</healing>을 회복합니다. 적이 죽거나 <keywordmajor>불안정</keywordmajor> 상태일 경우 재사용 대기시간이 초기화됩니다.<br><br>미니언에게는 {v3}의 피해를 입힙니다.", // 칼날 쇄도
        "W": "<charge>충전 시작 시:</charge> 이렐리아가 최대 {v1}초 동안 방어 태세에 돌입하여 행동할 수 없게 되지만 받는 물리 피해가 {v2}%, 마법 피해가 {v3}% 감소합니다.<br><br><release>발사 시:</release> 이렐리아가 검을 날려 <physicaldamage>{v4}의 물리 피해</physicaldamage>를 입힙니다. 피해량은 충전 시간에 비례하여 최대 <physicaldamage>{v5}</physicaldamage>만큼 증가합니다.", // 저항의 춤
        "E": "이렐리아가 지면에 검을 던집니다. {v1}초 내에 스킬을 <recast>재사용</recast>할 수 있습니다. <br><br><recast>재사용 시:</recast> 이렐리아가 두 번째 검을 던진 후 두 검이 서로를 향해 날아들어 {v2}초 동안 적을 <status>기절</status>시키고 <magicdamage>{v3}의 마법 피해</magicdamage>를 입힙니다. 챔피언과 대형 정글 몬스터는 {v4}초 동안 <keywordmajor>불안정</keywordmajor> 상태가 됩니다.", // 쌍검협무
        "R": "이렐리아가 칼날 다발을 날려 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 챔피언 및 대형 정글 몬스터를 {v2}초 동안 <keywordmajor>불안정</keywordmajor> 상태로 만듭니다. 칼날 다발은 결계 형태로 폭발하여 {v3}초 동안 첫 번째 적중한 챔피언을 둘러쌉니다. 결계는 <magicdamage>{v4}의 마법 피해</magicdamage>를 입히고 적을 {v5}초 동안 {v6}% <status>둔화</status>시킵니다.", // 선봉진격검
    },
    "Evelynn": { // 이블린
        "P": "이블린은 전투에서 벗어나 있을 때 악의 장막에 휩싸입니다. 악의 장막에 싸이면 낮은 체력에서 체력이 회복되며 6레벨부터는 위장 효과도 제공합니다.", // 악의 장막 — CD 요약본, 직접 다듬을 것
        "Q": "이블린이 가시를 발사해 처음 적중한 유닛에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 그 후 동일 대상에게 가하는 이블린의 다음 세 번의 기본 공격 또는 스킬이 <magicdamage>{v2}의 마법 피해</magicdamage>를 추가로 입힙니다. 이블린이 증오의 가시를 최대 {v3}번까지 <recast>재사용</recast>할 수 있습니다.<br><br><recast>재사용 시:</recast> 이블린이 발사한 가시가 가장 가까운 적을 통과하고 적중한 모든 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.", // 증오의 가시
        "W": "챔피언 또는 몬스터에게 5초 동안 표식을 남깁니다. 표식을 남긴 대상에게 기본 공격을 가하거나 스킬을 사용하면 표식이 사라지며 소모했던 마나가 회복되고 {v1}초 동안 대상을 {v2}% <status>둔화</status>시킵니다.<br><br>표식이 2.5초 이상 지속된 후 공격하면 다음 효과가 추가로 적용됩니다.<li>적 챔피언: {v3}초 동안 대상을 <status>매혹</status>하고 {v4}초 동안 <scalemr>{v5}%의 마법 저항력</scalemr>을 감소시킵니다.<li>몬스터: {v6}초 동안 대상을 <status>매혹</status>하고 <magicdamage>{v7}의 마법 피해</magicdamage>를 입힙니다.", // 황홀한 저주
        "E": "이블린이 채찍으로 적을 가격하여 <magicdamage>{v1}+대상 최대 체력의 {v2}에 해당하는 마법 피해</magicdamage>를 입힙니다. 이후 이블린이 {v3}초 동안 <speed>{v4}%의 이동 속도</speed>를 얻습니다.<br><br><keywordmajor>악의 장막</keywordmajor>이 활성화되면 이 스킬의 재사용 대기시간이 초기화되고 강화됩니다. 강화된 스킬을 사용하면 이블린이 대상에게 돌진하며, 대상 및 경로에 있는 모든 적에게 <magicdamage>{v5}+대상 최대 체력의 {v6}에 해당하는 마법 피해</magicdamage>를 입힙니다.", // 채찍유린
        "R": "이블린이 악마의 기운을 방출해 대상으로 지정할 수 없게 되며 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힌 다음 뒤로 이동합니다. <healing>체력이 30%</healing> 이하인 적들에게는 피해량이 <magicdamage>{v2}</magicdamage>까지 증가합니다. 사용 시 악의 장막에 1.25초 재사용 대기시간이 적용됩니다.", // 최후의 포옹
    },
    "Jade_Evelynn": { // 이블린
        "P": "비전투 중일 때 이블린은 위장 상태에 들어가 가까이 있는 적 챔피언이나 은신 감지 기능에 의해서만 드러납니다. 은신 상태에서는 마나가 빠르게 재생됩니다.", // 그림자 걷기 — CD 요약본, 직접 다듬을 것
        "Q": "이블린이 가장 가까운 적을 통과하는 가시를 발사하여 경로상에 있는 모든 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.<br><br><spellname>증오의 가시</spellname>는 이블린이 최근 공격한 대상을 우선시합니다.", // 증오의 가시
        "W": "<passive>기본 지속 효과:</passive> 이블린의 스킬이 적 챔피언에게 적중 시 {v1}초 동안 <speed>이동 속도가 {v2}</speed> 증가합니다. (최대 {v3}회 중첩)<br><br><active>사용 시:</active> 이블린에게 적용된 모든 둔화 효과를 제거하고 {v4}초 동안 <speed>이동 속도가 {v5}%</speed> 증가합니다.<br><br>챔피언 처치 관여 시 <spellname>어둠의 광기</spellname> 재사용 대기시간이 초기화됩니다.", // 어둠의 광기
        "E": "이블린이 대상을 {v1}번 베어 총 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다. 이후 {v3}초 동안 이블린의 <attackspeed>공격 속도가 {v4}%</attackspeed> 증가합니다.", // 유린
        "R": "이블린이 대상 범위 내의 모든 적을 꿰뚫어 대상 <magicdamage>현재 체력의 {v1}%에 해당하는 마법 피해</magicdamage>를 입히고, {v2}초 동안 {v3}% <status>둔화</status>시킵니다.<br><br>이블린은 적들의 고통을 흡수해, 공격을 적중시킨 챔피언당 <shield>{v4}의 보호막</shield>을 얻습니다. 보호막은 6초 동안 지속됩니다.", // 고통스런 포옹
    },
    "Ezreal": { // 이즈리얼
        "P": "이즈리얼이 스킬을 적중시킬 때마다 공격 속도가 증가합니다. (최대 5회 중첩)", // 끓어오르는 주문의 힘 — CD 요약본, 직접 다듬을 것
        "Q": "이즈리얼이 에너지 화살을 발사하여 처음 적중한 적에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고, 이즈리얼의 스킬 재사용 대기시간을 {v2}초 감소시킵니다.", // 신비한 화살
        "W": "이즈리얼이 마법의 구체를 발사해 처음으로 적중한 챔피언이나 구조물, 에픽 정글 몬스터에게 {v1}초 동안 남아 있게 합니다. 이즈리얼이 해당 대상에게 기본 공격이나 스킬을 적중시키면 구체가 폭발하며 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다. 스킬로 구체를 폭발시키면 해당 스킬로 소모한 마나+<scalemana>{v3}의 마나</scalemana>를 돌려받습니다.", // 정수의 흐름
        "E": "이즈리얼이 순간이동 후 가장 가까이에 있는 적에게 화살을 발사하여 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 화살은 <spellname>정수의 흐름</spellname>에 영향을 받은 대상을 우선적으로 공격합니다.", // 비전 이동
        "R": "이즈리얼이 거대한 에너지파를 발사하여 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 미니언과 에픽 몬스터를 제외한 정글 몬스터에게는 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.", // 정조준 일격
    },
    "Jade_Ezreal": { // 이즈리얼
        "P": "이즈리얼이 스킬을 적중시킬 때마다 공격 속도를 얻습니다. (최대 5회 중첩)", // 끓어오르는 주문의 힘 — CD 요약본, 직접 다듬을 것
        "Q": "이즈리얼이 에너지 화살을 발사해 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다. (적중 시 효과 적용) <br><br><spellname>신비한 화살</spellname> 적중 시 이즈리얼의 스킬 재사용 대기시간이 1초 감소합니다.<br>", // 신비한 화살
        "W": "이즈리얼이 에너지 파동을 발사해, 경로상의 모든 적 챔피언에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 5초 동안 <attackspeed>공격 속도</attackspeed>를 {v2}% 감소시킵니다.<br><br>파동에 맞은 아군 챔피언은 <healing>{v3}의 체력</healing>을 회복하고 5초 동안 {v2}%의 <attackspeed>공격 속도</attackspeed>를 얻습니다.", // 정수의 흐름
        "E": "이즈리얼이 대상 위치로 순간이동하여 가장 가까운 적을 향해 유도 화살을 발사하여 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.", // 비전 이동
        "R": "이즈리얼이 1초 동안 정신을 집중한 뒤 투사체를 발사해 경로상의 유닛에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 유닛 하나를 맞힐 때마다 피해량이 {v2}%씩 감소합니다. (최소 {v3}%)", // 정조준 일격
    },
    "Illaoi": { // 일라오이
        "P": "일라오이와 그녀의 <font color='#669900'>숙주</font>는 근처의 통과할 수 없는 지형에 촉수를 소환합니다. 촉수는 영혼과 <font color='#669900'>숙주</font>, 그리고 혹독한 가르침 스킬의 희생양을 공격합니다. 촉수에게 맞는 적들은 물리 피해를 입습니다.", // 고대신의 예언자 — CD 요약본, 직접 다듬을 것
        "Q": "<passive>기본 지속 효과:</passive> <keywordmajor>후려치기</keywordmajor>의 피해량이 <physicaldamage>@spell.IllaoiQ:TentacleDamageAmp*100@%</physicaldamage> 증가합니다. (현재 <physicaldamage>@spell.IllaoiQ:TentacleDamageTotal@의 물리 피해</physicaldamage>)<br><br><active>사용 시:</active> 일라오이가 성상을 휘둘러 촉수가 전방에 <keywordmajor>후려치기</keywordmajor>를 사용하게 합니다.", // 촉수 강타
        "W": "일라오이가 다음 기본 공격 시 대상에게 돌진해 <physicaldamage>최대 체력의 {v1}에 해당하는 물리 피해</physicaldamage>를 추가로 입힙니다. 일라오이가 공격하면 근처의 촉수도 함께 대상에게 <keywordmajor>후려치기</keywordmajor>를 사용합니다.", // 혹독한 가르침
        "E": "일라오이가 {v1}초 동안 적 챔피언에게서 영혼을 분리합니다. 영혼에게 피해를 입히면 피해량의 {v2}가 해당 적 챔피언에게 전이됩니다.<br><br>만약 영혼이 처치당하거나 대상이 일정 범위를 벗어나면, {v3}초 동안 대상에게 표식을 남기며 {v4}초 동안 {v5}% <status>둔화</status>시킵니다. 표식이 남은 적은 가능할 경우 촉수를 소환합니다.<br><br>촉수는 {v6}초마다 영혼과 표식이 남은 적에게 <keywordmajor>후려치기</keywordmajor>를 사용합니다.", // 영혼의 시험
        "R": "일라오이가 성상을 바닥에 내리쳐 근처 적들에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고, 피해를 입는 적 챔피언 한 명당 촉수를 하나씩 소환합니다.<br><br>이후 촉수는 {v2}초 동안 <keywordmajor>후려치기</keywordmajor>의 사용 속도가 50% 빨라지고 대상으로 지정할 수 없게 됩니다. <spellname>혹독한 가르침</spellname>의 재사용 대기시간이 @spell.IllaoiW:CooldownDuringR@초로 줄어듭니다.", // 믿음의 도약
    },
    "JarvanIV": { // 자르반 4세
        "P": "자르반의 첫 기본 공격이 적의 현재 체력에 비례하여 추가 물리 피해를 입힙니다. 이 효과에 이미 당한 적은 몇 초 동안 이 효과로 인한 피해를 다시 받지 않습니다.", // 전장의 군가 — CD 요약본, 직접 다듬을 것
        "Q": "자르반 4세가 창을 길게 늘려 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 {v2}초 동안 <scalearmor>방어력을 {v3}%</scalearmor> 감소시킵니다.<br><br>창이 <spellname>데마시아의 깃발</spellname>에 맞으면 자르반 4세가 깃발을 향해 돌진하며 경로에 있는 적들을 0.75초 동안 <status>공중에 띄웁니다</status>.", // 용의 일격
        "W": "자르반 4세가 방패를 소환해 {v1}초 동안 근처 적들을 {v2}% <status>둔화</status>시키고 <shield>{v3}의 피해를 흡수하는 보호막</shield>을 얻으며 적중한 적 챔피언 하나당 <shield>{v4}의 추가 보호막 흡수량</shield>을 얻습니다.", // 황금빛 방패
        "E": "<passive>기본 지속 효과:</passive> 자르반 4세의 <attackspeed>공격 속도가 {v1}%</attackspeed> 상승합니다.<br><br><active>사용 시:</active> 자르반 4세가 지면에 깃발을 던져 <magicdamage>{v2}의 마법 피해</magicdamage>를 입히고 {v3}초 동안 깃발 근처 아군의 <attackspeed>공격 속도를 {v4}%</attackspeed> 상승시킵니다.", // 데마시아의 깃발
        "R": "자르반 4세가 적 챔피언을 향해 용감하게 뛰어들어 대상과 근처 적들에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 {v2}초 동안 지나갈 수 없는 벽으로 둘러쌉니다.<br><br>스킬을 <recast>재사용</recast>하면 벽을 무너뜨릴 수 있습니다.", // 대격변
    },
    "Jade_JarvanIV": { // 자르반 4세
        "P": "자르반의 첫 기본 공격이 적의 현재 체력에 비례하여 추가 물리 피해를 입힙니다. 이 효과에 이미 당한 적은 몇 초 동안 이 효과로 인한 피해를 다시 받지 않습니다.", // 전장의 군가 — CD 요약본, 직접 다듬을 것
        "Q": "자르반 4세가 창을 길게 늘여, 창에 맞는 모든 적에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 3초 동안 방어력을 {v2}% 감소시킵니다.<br><br>창이 <spellname>데마시아의 깃발</spellname>에 맞으면 자르반 4세가 그 위치로 이동하며 경로상의 적을 <status>공중으로 띄웁니다</status>.", // 용의 일격
        "W": "5초 동안 최대 {v1}의 피해(근처의 적 챔피언 1명당 +{v2})를 흡수하는 <shield>보호막</shield>을 얻고, 주변 적을 2초간 {v3}% <status>둔화</status>시킵니다.", // 황금빛 방패
        "E": "<passive>기본 지속 효과:</passive> <attackspeed>{v1}%의 공격 속도</attackspeed>와 <scalearmor>{v2}의 방어력</scalearmor>을 얻습니다.<br><br><active>사용 시:</active> 근처의 지정한 위치에 <spellname>데마시아의 깃발</spellname>을 던져 적에게 <magicdamage>{v3}의 마법 피해</magicdamage>를 입힙니다. <spellname>깃발</spellname>은 {v4}초 동안 유지되며 주변의 아군 챔피언에게 <attackspeed>{v1}%의 공격 속도</attackspeed>를 부여합니다.", // 데마시아의 깃발
        "R": "적 챔피언을 향해 용감하게 뛰어들어 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 3.5초 동안 지나갈 수 없는 지형으로 이뤄진 결투장을 생성합니다.<br><br>스킬을 <recast>재사용</recast>하면 지형을 무너뜨릴 수 있습니다.", // 대격변
    },
    "Xayah": { // 자야
        "P": "스킬 사용 후 다음 기본 공격이 경로에 있는 적을 모두 관통하고 <font color='#C200E1'>깃털</font>을 남깁니다.", // 관통상 — CD 요약본, 직접 다듬을 것
        "Q": "자야가 연타 공격을 가해 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 <keywordmajor>깃털</keywordmajor> 두 개를 남깁니다. 두 번째 대상부터는 단검 하나당 <physicaldamage>{v2}의 피해</physicaldamage>를 입힙니다.", // 깃털 연타
        "W": "자야가 {v1}초 동안 칼날 폭풍을 일으켜 <attackspeed>공격 속도가 {v2}%</attackspeed> 상승하고 기본 공격 시 두 번째 칼날을 날려 {v3}%의 피해를 입힙니다.<br><br>두 번째 칼날이 챔피언에게 적중하면 {v4}초 동안 자야의 <speed>이동 속도가 {v5}%</speed> 상승합니다.<br><br>라칸이 근처에 있으면 함께 이 스킬의 효과를 받습니다. 단, <i>자야</i>가 대상을 공격해야 라칸의 <speed>이동 속도</speed>가 상승합니다.", // 죽음의 깃
        "E": "자야가 모든 <keywordmajor>깃털</keywordmajor>을 불러들여 각 깃털로 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다. 적이 {v2}개 이상의 <keywordmajor>깃털</keywordmajor>에 맞으면 {v3}초 동안 <status>속박</status>됩니다.", // 깃부르미
        "R": "자야가 공중으로 도약해 1.5초 동안 대상으로 지정할 수 없는 유체화 상태가 된 후 원뿔 모양으로 공격을 가해 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 일렬로 <keywordmajor>깃털</keywordmajor>을 남깁니다.", // 저항의 비상
    },
    "Zyra": { // 자이라
        "P": "자이라 주변에 주기적으로 씨앗이 생성되며 생성 속도는 레벨에 따라 더 빨라집니다. 씨앗 근처에서 치명적인 가시나 휘감는 뿌리를 사용하면 식물이 자라나 자이라와 함께 싸웁니다.", // 가시 정원 — CD 요약본, 직접 다듬을 것
        "Q": "자이라가 굵은 가시덤불이 지면을 뚫고 나와 폭발하게 하여 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.<br><br><keywordmajor>씨앗</keywordmajor> 근처에서 이 스킬을 사용하면 <keywordmajor>씨앗</keywordmajor>이 가시 발사 꽃으로 자라 <magicdamage>@spell.ZyraP:PlantDamage@의 마법 피해</magicdamage>를 입히고 @spell.ZyraP:PlantDuration@초 동안 유지됩니다. 가시 발사 꽃의 사거리는 575입니다.", // 치명적인 가시
        "W": "자이라가 {v1}초 동안 유지되는 <keywordmajor>씨앗</keywordmajor>을 심습니다. 적 챔피언이 이 <keywordmajor>씨앗</keywordmajor>을 밟으면 {v2}초간 해당 챔피언에 대한 <keywordstealth>절대 시야</keywordstealth>가 생기지만 씨앗은 파괴됩니다.<br><br>이 스킬은 2회까지 충전되며 {v3}초마다 재충전됩니다. 적 미니언이나 몬스터를 처치하면 재충전 시간이 {v4}% 감소합니다. 챔피언 처치 관여 시 재충전 시간이 {v5}% 감소합니다.", // 맹렬한 성장
        "E": "자이라가 전방으로 가시 덩굴을 발사하여 {v1}초 동안 <status>속박</status>하고 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다. <br><br>이 스킬이 <keywordmajor>씨앗</keywordmajor> 근처를 지나면 <keywordmajor>씨앗</keywordmajor>이 덩굴 채찍손으로 자라 <magicdamage>@spell.ZyraP:PlantDamage@의 마법 피해</magicdamage>를 입히고 @spell.ZyraP:PlantDuration@초 동안 유지됩니다. 덩굴 채찍손의 사거리는 400이며 기본 공격 시 {v3}초 동안 적을 {v4}% <status>둔화</status>시킵니다. 덩굴 채찍손으로 여러 번 맞은 대상은 <status>둔화</status>가 최대 {v5}회 중첩됩니다.", // 휘감는 뿌리
        "R": "자이라가 자연의 분노를 모아 뒤틀린 덩굴손을 소환하여 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 2초 후, 덩굴이 수축하면서 {v2}초 동안 <status>공중으로 띄워 올립니다</status>.<br><br>덩굴손이 소환된 위치에 있는 자이라의 식물들은 격분하여 지속시간이 초기화되고 <healing>체력이 {v3}%</healing> 증가하며 {v4}%의 추가 피해를 입힙니다.", // 올가미 덩굴
    },
    "Zac": { // 자크
        "P": "자크는 스킬로 적을 맞힐 때마다 몸에서 조각이 떨어져 나갑니다. 이 조각들을 다시 흡수하면 체력을 회복할 수 있습니다. 자크는 치명상을 입으면 4조각으로 갈라졌다가 다시 합쳐지려고 모입니다. 몸 조각 중 하나라도 생존할 경우, 살아남은 조각의 체력에 비례한 체력을 가지고 부활합니다. 각각의 조각은 자크의 최대 체력, 방어력과 마법 저항력의 일부를 보유합니다. 이 스킬의 재사용 대기시간은 5분입니다.", // 세포 분열 — CD 요약본, 직접 다듬을 것
        "Q": "자크가 팔을 뻗어 처음 맞힌 적을 붙잡고 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히며 잠깐 동안 <status>둔화</status>시킵니다. 자크의 다음 기본 공격은 사거리가 증가하며 동일한 피해를 입히고 <status>둔화</status>시킵니다. <br><br>자크가 <i>다른</i> 적에게 기본 공격을 가하면 둘을 <status>공중으로 띄워 올려</status> 서로에게 던집니다. 충돌 시 해당 적과 주변 적은 <magicdamage>{v1}의 마법 피해</magicdamage>를 입으며 잠깐 동안 <status>둔화</status>합니다.", // 탄성 주먹
        "W": "자크의 몸이 터져서 주위에 있는 적 모두에게 <magicdamage>{v1}+최대 체력의 {v2}에 해당하는 마법 피해</magicdamage>를 입힙니다.<br><br><keywordmajor>조각</keywordmajor>을 흡수하면 이 스킬의 재사용 대기시간이 1초 감소합니다.", // 불안정 물질
        "E": "<charge>충전 시작:</charge> 자크가 {v1}초 동안 자신의 몸을 팽팽히 당겨 돌진할 준비를 합니다.<br><br><release>발사:</release> 자크가 자신의 몸을 날려 착지하는 곳에 있는 적을 충전 시간에 비례해 최대 {v2}초 동안 <status>공중으로 띄워 올리고</status> <magicdamage>{v3}의 마법 피해</magicdamage>를 입힙니다. 적 챔피언을 하나 맞힐 때마다 <keywordmajor>조각</keywordmajor>이 하나씩 생성됩니다.", // 새총 발사
        "R": "자크가 {v1}회 튀어 오릅니다. 자크에게 처음 맞은 적은 뒤로 <status>밀리며</status> <magicdamage>{v2}의 마법 피해</magicdamage>를 입습니다. 이후에는 맞을 때마다 <magicdamage>{v3}의 마법 피해</magicdamage>를 입고 {v4}초 동안 {v5}% <status>둔화</status>합니다.<br><br>자크는 <speed>이동 속도가 {v6}%</speed>까지 점점 증가하며 튀어 오르는 동안 <spellname>불안정 물질</spellname> 스킬을 사용할 수 있습니다.", // 바운스!
    },
    "Zaahen": { // 자헨
        "P": "적 챔피언에게 기본 공격 및 스킬 적중 시 결심 중첩이 쌓이며, 자헨이 중첩당 추가 공격력을 얻습니다. 결심이 가득 차면 자헨이 얻는 추가 공격력이 증가하고 부활할 수 있습니다.", // 전쟁 단련 — CD 요약본, 직접 다듬을 것
        "Q": "자헨이 다음 기본 공격 시 두 번 공격하며 <physicaldamage>{v1}의 추가 물리 피해</physicaldamage>를 입히고 <healing>최대 체력의 {v2}%</healing>만큼 체력을 회복합니다.<br><br><recast>재사용 시:</recast> 다음 기본 공격 시 대상에게 <physicaldamage>{v3}의 추가 물리 피해</physicaldamage>를 입히고 {v4}초 동안 <status>공중에 띄웁니다</status>.", // 다르킨의 글레이브
        "W": "자헨이 지정한 방향으로 내질러 적중한 적에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 <status>끌어당겨</status> <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입힙니다.", // 공포의 귀환
        "E": "자헨이 돌진한 후 주변을 가르며 근처 적에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다.<br><br>가르기 범위 가장자리에 있는 적은 대신 <physicaldamage>{v2}의 물리 피해</physicaldamage>와 <magicdamage>대상 최대 체력의 {v3}%에 해당하는 마법 피해</magicdamage>를 입습니다.", // 찬란한 쇄도
        "R": "<passive>기본 지속 효과</passive>: 자헨의 <armorpen>방어구 관통력이 {v1}%</armorpen> 증가합니다.<br><br><active>사용 시</active>: 자헨이 날아오릅니다. 스킬을 사용하는 동안 받는 피해량이 {v2}% 감소합니다.<br><br>자헨이 아래로 내려찍으며 <physicaldamage>{v3}의 물리 피해</physicaldamage>를 입히고 <healing>적 챔피언에게 입힌 피해량의 {v4}%만큼 체력을 회복</healing>합니다.", // 단호한 판결
    },
    "Janna": { // 잔나
        "P": "아군이 잔나를 향해 움직일 때 이동 속도가 증가합니다.<br><br>잔나가 적중 시 및 서풍으로 추가 이동 속도의 일정 비율만큼 추가 마법 피해를 입힙니다.", // 순풍 — CD 요약본, 직접 다듬을 것
        "Q": "잔나가 {v1}초에 걸쳐 점점 세진 후 경로를 따라 이동하는 회오리바람을 소환합니다. 회오리바람은 <magicdamage>{v2}~{v3}의 마법 피해</magicdamage>를 입히고 {v4}~{v5}초 동안 <status>공중으로 띄워 올립니다</status>. 거리, 피해량, <status>띄워 올리기</status> 지속시간은 회오리바람이 커진 정도에 비례해 증가합니다. <recast>재사용</recast>하면 회오리바람이 더 일찍 날아갑니다.", // 울부짖는 돌풍
        "W": "<passive>기본 지속 효과:</passive> 잔나의 <speed>이동 속도가 {v1}</speed> 증가하며 유체화 상태가 됩니다.<br><br><active>사용 시:</active> 잔나의 원소가 적을 공격하여 {v2}초 동안 {v3} <status>둔화</status>시키고 <magicdamage>{v4}+@spell.TailwindSelf:BonusDamage@의 마법 피해</magicdamage>를 입힙니다.", // 서풍
        "E": "잔나가 {v1}초 동안 아군 챔피언이나 포탑에 <shield>{v2}의 피해를 흡수하는 보호막</shield>을 부여합니다. 대상은 보호막이 지속되는 동안 <scalead>{v3}의 공격력</scalead>을 얻습니다.<br><br>잔나가 스킬로 적 챔피언의 이동을 방해할 때마다 재사용 대기시간의 {v4}%를 돌려받습니다.", // 폭풍의 눈
        "R": "잔나가 마법의 계절풍을 소환하여 주변 적들을 <status>뒤로 밀어낸</status> 후 {v1}초에 걸쳐 주변 아군의 <healing>체력을 {v2}</healing>만큼 회복시킵니다. 이동하거나 스킬을 사용하면 계절풍이 일찍 사라집니다.", // 계절풍
    },
    "Jade_Janna": { // 잔나
        "P": "잔나와 아군 챔피언의 이동 속도가 3% 증가합니다.", // 순풍 — CD 요약본, 직접 다듬을 것
        "Q": "회오리바람을 소환하여 경로상의 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 <status>공중에 띄웁니다</status>. 회오리바람은 충전한 시간(최대 3초)에 따라 이동 거리가 증가하고, <magicdamage>{v2}의 추가 피해</magicdamage>를 입히며, 적을 더 높이 <status>띄웁니다</status>.<br><br><recast>재사용</recast>하면 회오리바람을 일찍 발사합니다.", // 울부짖는 돌풍
        "W": "<passive>기본 지속 효과: </passive><speed>이동 속도</speed>가 {v1}% 증가하고, 다른 유닛을 통과하여 움직일 수 있게 됩니다.<br><br><active>사용 시: </active>적에게 <magicdamage>{v2}의 마법 피해</magicdamage>를 입히고, {v3}초간 {v4}% <status>둔화</status>시킵니다. <spellname>서풍</spellname>이 재사용 대기 중일 때는 기본 지속 효과가 적용되지 않습니다.", // 서풍
        "E": "아군 챔피언 또는 포탑에 {v1}초 동안 보호막을 부여합니다. 보호막은 파괴되기 전까지 최대 <shield>{v2}의 피해</shield>를 흡수하고, <physicaldamage>{v3}의 공격력</physicaldamage>을 부여합니다.", // 폭풍의 눈
        "R": "강력한 바람을 소환해 근처의 적을 <recast>뒤로 밀어내고</recast>, 주변 아군의 체력을 4초에 걸쳐 <healing>{v1}</healing>만큼 회복시킵니다.", // 계절풍
    },
    "Jax": { // 잭스
        "P": "잭스가 연속해서 기본 공격을 가하면 공격 속도가 상승합니다.", // 가차없는 맹공 — CD 요약본, 직접 다듬을 것
        "Q": "잭스가 아군 또는 적 유닛, 와드를 향해 도약합니다. 적인 경우 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다.", // 도약 공격
        "W": "잭스가 무기에 힘을 모아 다음 기본 공격이나 <spellname>도약 공격</spellname> 시 <magicdamage>{v1}의 마법 피해</magicdamage>를 추가로 입힙니다.", // 무기 강화
        "E": "잭스가 {v1}초간 방어 태세에 들어가 기본 공격을 회피하고, 광역 스킬로부터 받는 피해가 {v2}% 감소합니다. {v1}초가 지나거나 스킬을 <recast>재사용</recast>하면 근처 적들에게 <magicdamage>{v3}+최대 체력의 {v4}%에 해당하는 마법 피해</magicdamage>를 입히고 {v5}초 동안 <status>기절</status>시킵니다. <br><br>회피한 기본 공격 1회당 피해량이 {v6}%씩 최대 <magicdamage>{v7}+최대 체력의 {v8}%</magicdamage>까지 증가합니다.", // 반격
        "R": "<passive>기본 지속 효과:</passive> {v1}초 안에 세 번째 공격을 할 때마다 <magicdamage>{v2}의 마법 피해</magicdamage>를 추가로 입힙니다.<br><br><active>사용 시:</active> 잭스가 가로등을 내리쳐 주변 적에게 <magicdamage>{v3}의 마법 피해</magicdamage>를 입힙니다. 챔피언을 맞히면 <scalearmor>방어력이 {v4}</scalearmor>, <scalemr>마법 저항력이 {v5}</scalemr> 증가하며 다음 {v6}초 안에 맞힌 챔피언 하나당 <scalearmor>방어력이 {v7}</scalearmor>, <scalemr>마법 저항력이 {v8}</scalemr>씩 추가로 증가합니다. 이때 세 번째가 아닌 두 번째 기본 공격마다 <magicdamage>마법 피해</magicdamage>를 추가로 입힙니다.", // 무기의 달인
    },
    "Jade_Jax": { // 잭스
        "P": "잭스가 아이템으로 얻는 추가 공격력과 주문력에 따라 추가 체력을 얻습니다.", // 장비 숙달 — CD 요약본, 직접 다듬을 것
        "Q": "잭스가 목표 유닛을 향해 도약하여, 대상이 적인 경우 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다.", // 도약 공격
        "W": "잭스가 무기에 힘을 모아, 다음 기본 공격이나 도약 공격 시 대상과 주변 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 추가로 입힙니다.", // 무기 강화
        "E": "잭스가 {v1}초간 방어 태세에 들어가 기본 공격을 회피하고, 광역 스킬로부터 받는 피해가 {v2}% 감소합니다. 이 스킬은 지속시간이 종료되면 자동으로 <recast>재사용</recast>됩니다.<br><br><recast>재사용 시</recast>: 잭스가 주변 적에게 <physicaldamage>{v3}의 물리 피해</physicaldamage>를 입히고 {v4}초 동안 <status>기절</status>시킵니다.<br><br>회피한 기본 공격 1회당 피해량이 {v5}%씩, 최대 <physicaldamage>{v6}</physicaldamage>까지 증가합니다.", // 반격
        "R": "<passive>기본 지속 효과</passive>: 잭스가 기본 공격을 가할 때마다 <attackspeed>{v1}%의 공격 속도</attackspeed>를 얻습니다. (최대 {v2}회 중첩) 또한 세 번째 기본 공격을 가할 때마다 <magicdamage>{v3}의 마법 피해</magicdamage>를 추가로 입힙니다.", // 달인의 저력
    },
    "Zed": { // 제드
        "P": "제드가 체력이 낮은 적을 기본 공격하면 마법 피해를 추가로 입힙니다. 같은 적 챔피언에게는 몇 초가 지나야 이 효과가 다시 적용됩니다.", // 약자 멸시 — CD 요약본, 직접 다듬을 것
        "Q": "제드와 <keywordmajor>그림자</keywordmajor>가 표창을 던져, 각각 처음 맞는 적에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 이후 추가로 맞히는 적에게는 각각 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입힙니다.", // 예리한 표창
        "W": "<passive>기본 지속 효과:</passive> 제드와 <keywordmajor>그림자</keywordmajor>가 같은 스킬로 동일한 대상을 공격할 때마다 제드가 <keywordmajor>{v1}의 기력</keywordmajor>을 얻습니다.<br><br><active>사용 시:</active> 제드의 <keywordmajor>그림자</keywordmajor>가 전방으로 질주하여, {v2}초간 그 자리에 유지됩니다. 이 스킬을 <recast>재사용</recast>하면 제드가 <keywordmajor>그림자</keywordmajor>와 위치를 바꿉니다.", // 살아있는 그림자
        "E": "제드와 <keywordmajor>그림자</keywordmajor>가 각각 주위 적을 베어 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다.<br><br>제드가 이 스킬로 적 챔피언을 하나 맞힐 때마다 <spellname>살아있는 그림자</spellname>의 재사용 대기시간이 {v2}초씩 감소합니다.<br><br><keywordmajor>그림자</keywordmajor>의 스킬에 맞은 적은 {v3}초 동안 {v4}% <status>둔화</status>됩니다. 그림자 베기로 동일한 대상을 여러 번 맞힐 경우, 추가 피해는 입히지 않지만 {v5}%의 <status>둔화</status> 효과가 적용됩니다.", // 그림자 베기
        "R": "제드가 잠시 대상으로 지정할 수 없는 상태가 되어 적 챔피언에게 돌진하며 표식을 남깁니다. {v1}초가 지나면 표식이 발동되며 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입히고 표식이 적용된 동안 제드가 대상에게 가한 피해의 {v3}%에 해당하는 피해를 추가로 입힙니다.<br><br>돌진 시 {v4}초 동안 유지되는 <keywordmajor>그림자</keywordmajor>가 남습니다. 이 스킬을 <recast>재사용</recast>하면 제드가 이 <keywordmajor>그림자</keywordmajor>와 위치를 바꿉니다.", // 죽음의 표식
    },
    "Xerath": { // 제라스
        "P": "제라스의 기본 공격이 주기적으로 마나를 회복해 줍니다. 제라스가 유닛을 처치하면 이 스킬의 재사용 대기시간이 감소합니다.", // 마나 쇄도 — CD 요약본, 직접 다듬을 것
        "Q": "<charge>충전 시작:</charge> 제라스가 비전 광선을 충전하기 시작해 50%까지 서서히 <status>둔화</status>됩니다. <br><br><release>발사:</release> 제라스가 광선을 발사해 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 충전 시간에 따라 사거리가 늘어납니다.", // 비전 파동
        "W": "제라스가 비전 에너지포를 소환하여 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고, {v2}초 동안 {v3}% <status>둔화</status>시킵니다. 중심에 있는 적들은 <magicdamage>{v4}의 마법 피해</magicdamage>를 입고 {v5}% <status>둔화</status>했다가 {v2}초에 걸쳐 원래대로 돌아옵니다.", // 파멸의 눈
        "E": "제라스가 순수한 마법의 구체를 발사합니다. 처음으로 맞은 적은 구체가 이동한 거리에 비례해 최대 {v1}초 동안 <status>기절</status>하고 <magicdamage>{v2}의 마법 피해</magicdamage>를 입습니다.", // 충격 구체
        "R": "제라스가 순수한 모습으로 승화하면서 {v1}초 동안 정신을 집중합니다. 이 동안 스킬을 {v2}회까지 <recast>재사용</recast>할 수 있습니다.<br><br><recast>재사용 시:</recast> 제라스가 비전 폭격을 발사해 <magicdamage>{v3}의 마법 피해</magicdamage>를 입힙니다. 챔피언을 맞힐 때마다 <magicdamage>{v4}의 마법 피해</magicdamage>를 추가로 입힙니다.", // 비전 의식
    },
    "Zeri": { // 제리
        "P": "제리의 기본 공격은 마법 피해를 입히며 스킬로 간주됩니다. 이동하거나 집중 사격을 사용하면 제리의 스파크 팩에 에너지가 쌓입니다. 완전히 충전되면 제리의 다음 기본 공격이 추가 피해를 입힙니다.", // 살아있는 배터리 — CD 요약본, 직접 다듬을 것
        "Q": "제리가 단숨에 {v1}발을 발사해 처음 적중하는 적에게 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입힙니다. 이 스킬은 기본 공격으로 간주됩니다.", // 집중 사격
        "W": "제리가 전기 파동을 발사해 처음 적중하는 적에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 {v2}초 동안 {v3}% <status>둔화</status>시킵니다.<br><br>파동이 지형에 맞으면 광선으로 확산되어 범위 내 모든 적에게 같은 효과를 적용하고 챔피언과 몬스터에게 치명타가 적용되어 <physicaldamage>{v4}의 물리 피해</physicaldamage>를 입힙니다.", // 초강력 레이저
        "E": "제리가 짧은 거리를 돌진하며 맞닥트리는 지형을 모두 뛰어넘습니다. 지형을 뛰어넘으면 돌진 거리가 크게 늘어납니다. {v1}초 동안 <spellname>집중 사격</spellname>의 다음 사격이 적을 꿰뚫어, 두 번째 적부터는 {v2}%의 피해를 입히며 처음 적중한 대상에게 <magicdamage>{v3}의 마법 피해</magicdamage>를 추가로 입힙니다. <br><br>기본 공격으로 적을 맞히면 이 스킬의 재사용 대기시간이 {v4}초 감소합니다. 치명타 적중 시 재사용 대기시간이 {v5}초 감소합니다.", // 스파크 돌진
        "R": "제리가 전류를 방출해 근처 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 적 챔피언에게 적중하면 제리가 {v2}초 동안 <attackspeed>공격 속도 {v3}%</attackspeed>와 <speed>이동 속도{v4}%</speed>를 얻습니다. 기본 공격이나 스킬로 적 챔피언을 맞히면 스킬 지속시간이 증가하고 {v5}초 동안 과충전 중첩이 1 쌓입니다. 치명타 적중 시 추가 중첩이 2 쌓입니다. 중첩 하나당 <speed>이동 속도가 {v6}%</speed> 증가합니다.<br><br>이 동안 <spellname>집중 사격</spellname>이 더욱 빠른 3연발 사격으로 바뀌어 대상 주변 적에게 추가 <physicaldamage>{v7}의 물리 피해</physicaldamage>를 연쇄적으로 입힙니다.<br><br>", // 번개 방출
    },
    "Jayce": { // 제이스
        "P": "제이스가 무기를 바꾸면 잠시 동안 이동 속도가 증가합니다.", // 마법공학 축전기 — CD 요약본, 직접 다듬을 것
        "Q": "<keywordmajor>머큐리 해머:</keywordmajor> 제이스가 적에게 도약해 주변 적들에게 <physicaldamage>@spell.JayceToTheSkies:Damage@의 물리 피해</physicaldamage>를 입히고 @spell.JayceToTheSkies:SlowDuration@초 동안 @spell.JayceToTheSkies:Slow*-100@% <status>둔화</status>시킵니다.", // 하늘로! / 전격 폭발
        "W": "<keywordmajor>머큐리 해머 - 기본 지속 효과:</keywordmajor> <keywordmajor>해머</keywordmajor>로 공격 시 제이스의 <scalemana>마나가 @spell.JayceStaticField:ManaGain@</scalemana> 회복됩니다.<br><br><keywordmajor>머큐리 해머 - 사용 시:</keywordmajor> 제이스가 전류 오라를 생성해 @spell.JayceStaticField:Duration@초 동안 <magicdamage>@spell.JayceStaticField:Damage@의 마법 피해</magicdamage>를 입힙니다.", // 전류 역장 / 초전하
        "E": "<keywordmajor>해머 형태</keywordmajor>: 제이스가 해머를 휘둘러 대상을 <status>뒤로 밀어내고</status> <magicdamage>@spell.JayceThunderingBlow:FlatDamage@+대상 최대 체력의 @spell.JayceThunderingBlow:PercHPDamage*100@%에 해당하는 마법 피해</magicdamage>를 입힙니다.", // 천둥 강타 / 가속 관문
        "R": "<keywordmajor>머큐리 해머</keywordmajor>: 제이스가 무기를 원거리 공격용 <keywordmajor>머큐리 캐논</keywordmajor>으로 변환하고 새로운 스킬을 사용할 수 있게 됩니다. 제이스의 다음 기본 공격은 @spell.JayceStanceHtG:ShredDuration@초 동안 대상의 <scalemr>마법 저항력</scalemr>과 <scalearmor>방어력을 @spell.JayceStanceHtG:RangedFormShred@</scalearmor> 감소시킵니다.", // 머큐리 캐논 / 머큐리 해머
    },
    "Zoe": { // 조이
        "P": "스킬 사용 후 기본 공격 시 추가 마법 피해를 입힙니다.", // 반짝반짝! — CD 요약본, 직접 다듬을 것
        "Q": "조이가 이동거리가 길어질수록 더 큰 피해를 입히는 별을 발사합니다. 처음 적중한 적과 주변 적은 <magicdamage>{v1}~{v2}의 마법 피해</magicdamage>를 입습니다.<br><br>조이는 스킬을 <recast>재사용</recast>해 별을 근처의 새로운 목표 지점으로 보낼 수 있습니다.", // 통통별
        "W": "<passive>기본 지속 효과:</passive> 적이 소환사 주문이나 사용 효과가 있는 아이템을 사용하면 주문 파편을 떨어뜨립니다. 일부 미니언도 조이 또는 주변 아군에게 처치당하면 주문 파편을 떨어뜨립니다. 주문 파편을 획득하면 해당 주문이나 아이템 효과를 한 번 사용할 수 있습니다.<br><br><passive>기본 지속 효과:</passive> 조이가 이 스킬 또는 소환사 주문을 사용하면 {v1}초 동안 <speed>{v2}%의 이동 속도</speed>를 얻고 가장 마지막에 기본 공격한 대상에게 3개의 미사일을 발사합니다. 각각의 미사일은 <magicdamage>{v3}의 마법 피해</magicdamage>를 입힙니다.<br><br><active>사용 시:</active> 조이가 획득한 주문 파편으로 해당 주문이나 아이템 효과를 사용합니다.", // 주문도둑
        "E": "조이가 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히는 방울을 던집니다. 방울이 아무도 맞히지 못하면 덫이 되어 그 자리에 남습니다. 방울을 벽 너머로 던지면 사거리가 증가합니다.<br><br>방울 또는 덫이 적 챔피언에게 적중하면 조이의 스킬 재사용 대기시간이 {v2}%만큼 초기화됩니다.<br><br>방울에 맞은 적은 잠시 후 2초 동안 <status>수면</status> 상태가 되고 <scalemr>마법 저항력</scalemr>이 {v3}% 감소합니다. 기본 공격이나 스킬에 맞으면 두 배의 피해(최대 <truedamage>{v4}의 고정 피해</truedamage>)를 입고 잠에서 깨어납니다.<br><br>", // 헤롱헤롱쿨쿨방울
        "R": "조이가 1초 동안 근처 위치로 순간이동한 뒤 다시 돌아옵니다. 순간이동한 동안에는 스킬 사용과 기본 공격은 할 수 있지만, 이동은 불가능합니다.", // 차원 넘기
    },
    "Ziggs": { // 직스
        "P": "주기적으로 직스의 다음 기본 공격이 추가 마법 피해를 입힙니다. 직스가 스킬을 사용할 때마다 재사용 대기시간이 감소합니다.", // 짧은 도화선 — CD 요약본, 직접 다듬을 것
        "Q": "직스가 반동 폭탄을 던져 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.", // 반동 폭탄
        "W": "직스가 폭약을 던지면 {v1}초 후, 혹은 스킬을 <recast>재사용</recast>할 때 폭발합니다. 폭발은 적에게 <magicdamage>{v2}의 마법 피해</magicdamage>를 입히며 <status>뒤로</status> <status>밀어냅니다</status>. 직스 역시 밀려나지만 피해는 입지 않습니다.<br><br>포탑의 체력이 {v3}% 밑으로 내려가면 휴대용 폭약이 자동으로 포탑을 파괴합니다.", // 휴대용 폭약
        "E": "직스가 밟으면 터지는 지뢰를 뿌려, 지뢰에 닿은 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 {v3}%만큼 <status>둔화</status>시킵니다. 지뢰는 {v4}초 동안 유지됩니다.", // 마법공학 지뢰밭
        "R": "직스가 궁극의 무기를 던져 폭발 범위 중앙에 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 가장자리에는 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.", // 지옥 화염 폭탄
    },
    "Jhin": { // 진
        "P": "'속삭임'이라고 불리는 진의 총은 우월한 살상력을 위해 설계된 정밀 기계입니다. 발사 속도는 고정되어 있으며 총탄은 네 발만 장전됩니다. 네 발째 총탄은 진의 어두운 마법에 물들어 항상 치명타를 입히며 잃은 체력에 비례한 피해를 추가로 입힙니다. 속삭임으로 치명타를 발동시키면, 진의 이동 속도가 잠깐 동안 크게 상승합니다.", // 속삭임 — CD 요약본, 직접 다듬을 것
        "Q": "진이 폭탄을 던져 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힌 후 아직 폭탄에 맞지 않은 근처의 적에게 튕깁니다.<br><br>폭탄은 최대 {v2}번까지 적을 맞힐 수 있으며, 폭탄으로 적을 처치할 때마다 그다음 타격의 피해량이 {v3}%씩 늘어납니다.", // 춤추는 유탄
        "W": "진이 원거리 공격을 가하여 처음 적중한 챔피언과 경로상에 있는 다른 모든 적에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다.<br><br>이 스킬로 아군 챔피언에게 공격당한 챔피언을 {v2}초 안에 공격했다면 대상을 {v3}초 동안 <status>속박</status>하고 <spellname>속삭임</spellname>의 이동 속도 증가 효과를 얻습니다.", // 살상연희
        "E": "<passive>기본 지속 효과:</passive> 진이 적 챔피언을 처치하면 해당 위치에 연꽃 함정이 설치되어 폭발합니다.<br><br><active>사용 시:</active> 진이 {v1}분 동안 유지되는 보이지 않는 연꽃 함정을 설치합니다. 함정을 밟은 적은 {v2}% <status>둔화</status>됩니다. 함정은 {v3}초 후 폭발하여 <magicdamage>{v4}의 마법 피해</magicdamage>를 입힙니다.<br><br>이 스킬은 2회까지 충전됩니다. ({v5}초마다 충전)", // 강제 관람
        "R": "진이 자세를 잡고 정신을 집중해 4발의 강력한 탄환을 발사하며, 각 탄환은 처음 적중한 챔피언에게 대상이 잃은 체력에 비례해 <physicaldamage>{v1}</physicaldamage>~<physicaldamage>{v2}의 물리 피해</physicaldamage>를 입히고 {v3}초 동안 {v4}% <status>둔화</status>시킵니다. 4번째 총탄은 치명타가 발동되며 {v5}%만큼 피해를 입힙니다.", // 커튼 콜
    },
    "Zilean": { // 질리언
        "P": "질리언은 시간을 경험치의 형태로 보존하여 아군에게 줄 수 있습니다. 아군의 레벨을 올려줄 수 있을 만큼 경험치가 모이면 해당 아군을 우클릭하여 건네줄 수 있습니다. 질리언 역시 아군에게 준 만큼의 경험치를 얻습니다.", // 시간의 유리병 — CD 요약본, 직접 다듬을 것
        "Q": "질리언이 주변 작은 반경 안에 들어오는 첫 번째 유닛에게 부착되는 시한 폭탄을 던집니다. {v1}초가 지나면 폭탄이 터지면서 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.<br><br>이미 폭탄이 있는 유닛에 두 번째 폭탄을 설치하면 바로 첫 번째 폭탄이 터지면서 {v3}초 동안 폭발 반경 안의 적을 <status>기절</status>시킵니다.", // 시한 폭탄
        "W": "질리언이 시간을 돌려 다른 기본 스킬의 재사용 대기시간을 {v1}초 감소시킵니다.", // 되감기
        "E": "질리언이 {v1}초 동안 적 챔피언을 {v2}% <status>둔화</status>시키거나 아군 챔피언의 <speed>이동 속도를 {v2}%</speed> 높입니다.", // 시간 왜곡
        "R": "질리언이 아군 챔피언에게 {v1}초 동안 보호용 시간 룬을 부여합니다. 대상이 죽을 위기에 처하면 룬이 시간을 되돌려 {v2}초 동안 대상을 경직 상태로 만든 후 부활시켜 <healing>{v3}의 체력</healing>을 회복시킵니다.", // 시간 역행
    },
    "Jade_Zilean": { // 질리언
        "P": "질리언과 아군이 추가 경험치를 얻습니다.", // 깊은 깨달음 — CD 요약본, 직접 다듬을 것
        "Q": "질리언이 대상에게 시한 폭탄을 부착합니다. 폭탄은 {v1}초 후 폭발하여 주변의 모든 적에게 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.<br><br>대상에게 두 번째 <spellname>시한 폭탄</spellname>을 부착하면 첫 번째 폭탄이 즉시 폭발합니다.", // 시한 폭탄
        "W": "질리언이 자신의 모든 스킬의 재사용 대기시간을 {v1}초 감소시킵니다.", // 되감기
        "E": "질리언이 {v1}초 동안 {v2}%만큼 아군 챔피언의 <speed>이동 속도</speed>를 증가시키거나 적 챔피언을 <status>둔화</status>시킵니다.", // 시간 왜곡
        "R": "질리언이 자신 또는 아군 챔피언에게 {v1}초 동안 보호용 시간 룬을 부여합니다. 대상이 치명적인 피해를 받으면 시간이 되감기고 <healing>{v2}의 체력</healing>을 회복합니다.", // 시간 역행
    },
    "Jinx": { // 징크스
        "P": "징크스는 적 챔피언이나 에픽 정글 몬스터 처치에 관여하거나 구조물 파괴를 도우면 이동 속도와 공격 속도가 대폭 상승합니다.", // 신난다! — CD 요약본, 직접 다듬을 것
        "Q": "징크스가 생선대가리 로켓 런처와 빵야빵야 미니건을 변환합니다.<br><br>로켓 런처로 기본 공격 시 마나를 소모하여 대상과 주변 적들에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다. 추가 공격 속도는 {v2}% 느려지지만 사거리는 {v3}만큼 증가합니다.<br><br>미니건으로 기본 공격 시 {v4}초 동안 <attackspeed>공격 속도</attackspeed>가 상승합니다. 이 효과는 최대 {v5}번까지 중첩됩니다. (<attackspeed>최대 의 {v6}%</attackspeed>)", // 휘릭휘릭!
        "W": "징크스가 전기 충격파를 발사하여 처음 맞힌 적에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 {v2}초 동안 {v3}% <status>둔화</status>시키며 위치를 드러냅니다.", // 빠직!
        "E": "징크스가 {v1}초간 유지되는 와작와작 지뢰 3개를 던집니다. 적 챔피언이 닿으면 {v2}초 동안 <status>속박</status>시키고 폭발하여 주변 적들에게 <magicdamage>{v3}의 마법 피해</magicdamage>를 입힙니다.", // 와작와작 뻥!
        "R": "징크스가 로켓을 발사합니다. 로켓은 발사 후 첫 1초 동안 피해량이 커지며, 적 챔피언을 맞히면 폭발하여 <physicaldamage>{v1}~{v2}+대상이 잃은 체력의 {v3}%에 해당하는 물리 피해</physicaldamage>를 입힙니다. 주변 적들은 {v4}%의 피해를 입습니다.<br><br><rules>몬스터를 상대로는 잃은 체력 비례 피해량이 {v5}까지만 적용됩니다.</rules>", // 초강력 초토화 로켓!
    },
    "Chogath": { // 초가스
        "P": "초가스는 유닛을 죽이면 체력과 마나를 회복합니다. 회복량은 초가스의 레벨이 높아질수록 증가합니다.", // 육식 — CD 요약본, 직접 다듬을 것
        "Q": "초가스가 땅을 파열시켜 {v1}초 동안 적들을 <status>공중으로 띄워 올리고</status> <magicdamage>{v2}의 마법 피해</magicdamage>를 입히며 {v3}초 동안 {v4}% <status>둔화</status>시킵니다.", // 파열
        "W": "초가스가 울부짖으며 {v1}초 동안 적들을 <status>침묵</status>시키고 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.", // 흉포한 울부짖음
        "E": "초가스가 다음 세 번의 기본 공격 시 가시를 발사하여 <magicdamage>{v1}+대상 최대 체력의 {v2}에 해당하는 마법 피해</magicdamage>를 입힙니다. 피해를 입은 적은 {v3}% <status>둔화</status>했다가 {v4}초에 걸쳐 원래대로 돌아옵니다.", // 날카로운 가시
        "R": "초가스가 적을 게걸스럽게 먹어치워, 챔피언에게는 <truedamage>{v1}</truedamage>, 미니언과 정글 몬스터에게는 <truedamage>{v2}</truedamage>의 고정 피해를 입힙니다. 대상이 처치되면 초가스의 포식 중첩이 1 올라, 몸집이 커지며 <healing>최대 체력이 {v3}</healing> 오릅니다. 에픽 몬스터가 아닌 일반 정글 몬스터와 미니언 처치로는 최대 {v4}중첩까지만 얻을 수 있습니다.", // 포식
    },
    "Jade_Chogath": { // 초가스
        "P": "초가스는 유닛을 죽이면 체력과 마나를 회복합니다. 회복량은 초가스의 레벨이 높아질수록 증가합니다.", // 육식 — CD 요약본, 직접 다듬을 것
        "Q": "초가스가 땅을 파열시켜 {v1}초 동안 적들을 <status>공중으로 띄워 올리고</status> <magicdamage>{v2}의 마법 피해</magicdamage>를 입히며 {v3}초 동안 {v4}% <status>둔화</status>시킵니다.", // 파열
        "W": "초가스가 울부짖으며 {v1}초 동안 적들을 <status>침묵</status>시키고 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.", // 흉포한 울부짖음
        "E": "<toggle>활성화/비활성화:</toggle> 초가스가 기본 공격 시 가시를 발사해 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.", // 날카로운 가시
        "R": "초가스가 적을 게걸스럽게 먹어 치워, 챔피언에게는 <truedamage>{v1}</truedamage>, 미니언과 정글 몬스터에게는 <truedamage>{v2}의 고정 피해</truedamage>를 입힙니다. 대상이 처치되면 초가스의 포식 중첩이 1 올라, 몸집이 커지며 <healing>최대 체력이 {v3}</healing> 오릅니다. 최대 6회 중첩되며, 사망 시 중첩의 절반을 잃습니다.", // 포식
    },
    "Karma": { // 카르마
        "P": "카르마가 스킬로 피해를 입히면 만트라의 재사용 대기시간이 감소합니다.", // 열정 응집 — CD 요약본, 직접 다듬을 것
        "Q": "카르마가 에너지 구체를 발사하여 처음 적중한 대상과 그 주변 적들에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고, {v2}초 동안 {v3}% <status>둔화</status>시킵니다.", // 내면의 열정
        "W": "카르마가 챔피언이나 정글 몬스터와 자신을 연결하여 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 모습을 드러냅니다. 연결이 끊어지지 않으면 대상은 다시 <magicdamage>{v1}의 마법 피해</magicdamage>를 입고 {v3}초 동안 <status>속박</status>됩니다.", // 굳은 결의
        "E": "카르마가 아군 챔피언에게 {v1}초 동안 <shield>{v2}의 피해를 흡수하는 보호막</shield>을 씌우고 {v3}초 동안 <speed>이동 속도를 {v4}%</speed> 상승시킵니다.", // 고무
        "R": "카르마가 8초 동안 다음 스킬을 강화합니다.<br><li><spellname>내면의 열정</spellname>: <magicdamage>{v1}의 마법 피해</magicdamage>를 추가로 입히고 원형의 불꽃을 남깁니다. 불꽃은 적들을 <status>둔화</status>시키고 <magicdamage>{v2}의 마법 피해</magicdamage>를 추가로 입힙니다.<li><spellname>굳은 결의</spellname>: 카르마가 지속시간 처음과 끝에 <healing>{v3}의 잃은 체력</healing>을 회복하고, {v4}초 더 <status>속박</status>합니다.<li><spellname>고무</spellname>: 카르마가 대상에게 <shield>피해를 {v5}만큼 더 흡수하는 보호막</shield>을 씌웁니다. 주변 아군에게도 <shield>{v6}의 피해를 흡수하는 보호막</shield>을 씌우고 <speed>이동 속도를{v7}%</speed> 상승시킵니다.", // 만트라
    },
    "Camille": { // 카밀
        "P": "챔피언에게 기본 공격 시 잠시 동안 카밀 최대 체력의 일부에 해당하는 피해를 흡수하는 보호막이 생깁니다. 적 챔피언이 어떤 피해를 주는지에 따라 물리 혹은 마법 보호막 중 하나만 생성됩니다.", // 적응형 방어 체계 — CD 요약본, 직접 다듬을 것
        "Q": "카밀이 다음 기본 공격 시 <physicaldamage>{v1}의 추가 물리 피해</physicaldamage>를 입히고 {v2}초 동안 <speed>이동 속도가 {v3}%</speed> 증가합니다. {v4}초 후에 스킬을 <recast>재사용</recast>할 수 있습니다.<br><br>첫 번째 기본 공격 후 {v5}초가 지난 뒤 스킬을 <recast>재사용</recast>하여 공격 시 추가 피해량이 증가해 <physicaldamage>{v6}</physicaldamage>의 피해를 입히고, 이 중 {v7}는 <truedamage>고정 피해</truedamage>로 적용됩니다.<br><br><rules>이 스킬은 피해를 입힐 때 효과가 발동합니다.</rules>", // 정확성 프로토콜
        "W": "카밀이 다리를 감아올려 휩쓸며 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다.<br><br>바깥쪽 절반에서 맞은 적은 이동 속도가 {v2}% <status>느려졌다가</status> {v3}초에 걸쳐 원래대로 돌아오며, 추가로 <physicaldamage>최대 체력에 비례해 {v4}의 물리 피해</physicaldamage>를 입습니다. 이때 카밀은 <healing>챔피언에게 입힌 추가 피해량의 {v5}%만큼 체력</healing>을 회복합니다.", // 전술적 휩쓸기
        "E": "카밀이 지형에 걸리는 갈고리를 발사해 1초 동안 자신을 지형으로 끌어당깁니다. 이 스킬은 <recast>재사용</recast>할 수 있습니다.<br><br><recast>재사용 시:</recast> 카밀이 지형으로부터 도약해 처음 마주치는 적 챔피언과 충돌합니다. 충돌 시 {v1}초 동안 <attackspeed>공격 속도가 {v2}%</attackspeed> 증가하고 주변 적에게 <physicaldamage>{v3}의 물리 피해</physicaldamage>를 입히며 적 챔피언을 {v4}초 동안 <status>기절</status>시킵니다. 적 챔피언을 향해 도약할 경우 도약 거리가 두 배로 증가합니다.", // 갈고리 발사
        "R": "카밀이 잠시 대상으로 지정할 수 없게 되며 적 챔피언에게 도약해 {v1}초 동안 어떤 방법으로도 탈출할 수 없도록 일정 지역 내에 가두고 정신 집중을 방해합니다. 근처의 다른 적은 <status>뒤로 밀려납니다</status>. 갇힌 적에 대한 카밀의 기본 공격은 <magicdamage>대상 현재 체력의 {v2}%에 해당하는 마법 피해</magicdamage>를 추가로 입힙니다.", // 마법공학 최후통첩
    },
    "Kassadin": { // 카사딘
        "P": "카사딘이 받는 마법 피해가 감소하며, 유닛과의 충돌을 무시합니다.", // 공허석 — CD 요약본, 직접 다듬을 것
        "Q": "카사딘이 공허 에너지 구체를 발사하여 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 정신 집중을 끊습니다. 또한 1.5초 동안 <shield>{v2}의 마법 피해를 흡수하는 보호막</shield>을 얻습니다.", // 무의 구체
        "W": "<passive>기본 지속 효과:</passive> 카사딘의 기본 공격이 <magicdamage>{v1}의 마법 피해</magicdamage>를 추가로 입힙니다.<br><br><active>사용 시:</active> 카사딘이 검을 충전하여 다음 기본 공격으로 <magicdamage>{v2}의 마법 피해</magicdamage>를 입히고 <scalemana>잃은 마나의 {v3}%</scalemana>를 회복합니다. (챔피언 공격 시 <scalemana>{v4}%</scalemana>로 증가)", // 황천의 검
        "E": "<passive>기본 지속 효과:</passive> 카사딘 근처에서 스킬을 사용하면 <spellname>힘의 파동의</spellname> 재사용 대기시간이 {v1}초 감소합니다.<br><br><active>사용 시:</active> 카사딘이 공허의 파동을 발사해 <magicdamage>{v2}의 마법 피해</magicdamage>를 입히고 {v3}초 동안 {v4}% <status>둔화</status>시킵니다.", // 힘의 파동
        "R": "카사딘이 근처로 순간이동하며 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.<br><br>다음 {v2}초 안에 이 스킬을 연속으로 사용하면 두 배의 마나를 소모하며 <magicdamage>{v3}의 마법 피해</magicdamage>를 추가로 입힙니다. 마나 소모량 및 피해량 증가는 최대 {v4}회까지 중첩됩니다.", // 균열 이동
    },
    "Jade_Kassadin": { // 카사딘
        "P": "카사딘이 받는 <magicDamage>마법 피해</magicDamage>가 15% 감소하며, 받은 피해량을 추가 <attackSpeed>공격 속도</attackSpeed>로 전환합니다.", // 공허석 — CD 요약본, 직접 다듬을 것
        "Q": "카사딘이 공허 투사체를 발사해, 대상에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초간 <status>침묵</status>시킵니다.", // 무의 구체
        "W": "<passive>기본 지속 효과: </passive>카사딘의 기본 공격이 공허에서 에너지를 추출하여 적중 시 <scalemana>{v1}의 마나</scalemana>를 회복합니다. 대상이 적 챔피언인 경우, <scalemana>마나</scalemana> 회복량이 세 배가 되어 {v2}의 마나를 회복합니다.<br><br><active>사용 시: </active>카사딘이 5초간 황천의 검을 충전하여, 기본 공격 시 <magicdamage>{v3}의 마법 피해</magicdamage>를 추가로 입힙니다.", // 황천의 검
        "E": "카사딘이 1,800 범위 내에서 사용된 스킬로부터 에너지를 뽑아내어, 근처에서 스킬이 사용될 때마다 충전 1회를 얻습니다. 6회 충전 시 <spellname>힘의 파동</spellname>을 사용할 수 있습니다. 힘의 파동은 정면의 원뿔 범위 내에 있는 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고, 3초간 {v2}% <status>둔화</status>시킵니다.", // 힘의 파동
        "R": "카사딘이 근처로 순간이동하며 주변 적 유닛에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 다음 8초 내로 <spellname>균열 이동</spellname>을 연속해서 사용하면 <scalemana>100의 마나</scalemana>를 추가로 소모하는 대신 <magicdamage>{v2}의 추가 피해</magicdamage>를 입힙니다. (최대 10회 중첩)", // 균열 이동
    },
    "Karthus": { // 카서스
        "P": "카서스가 죽으면 영혼이 되어 스킬을 사용할 수 있습니다.", // 죽음 극복 — CD 요약본, 직접 다듬을 것
        "Q": "카서스가 마법으로 폭발을 일으켜 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 하나의 적만 맞힐 경우 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.", // 황폐화
        "W": "카서스가 {v1}초 동안 유지되는 벽을 생성합니다. 벽을 지나는 적은 {v2}초간 <scalemr>마법 저항력이{v3}%</scalemr> 감소하고 {v4}% <status>둔화</status>됩니다. 둔화 효과는 시간이 지나면서 점차 사라집니다.", // 고통의 벽
        "E": "<passive>기본 지속 효과: </passive>카서스가 적 유닛을 처치할 때마다 <scalemana>{v1}의 마나</scalemana>를 회복합니다.<br><br><toggle>활성화/비활성화: </toggle>카서스가 죽음의 영역을 생성해 근처 적들에게 초당 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.", // 부패
        "R": "카서스가 3초 동안 정신 집중을 하여 거리와 관계없이 모든 적 챔피언에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.", // 진혼곡
    },
    "Jade_Karthus": { // 카서스
        "P": "카서스가 죽으면 영혼이 되어 스킬을 사용할 수 있습니다.", // 죽음 극복 — CD 요약본, 직접 다듬을 것
        "Q": "0.5초 후 폭발을 일으켜 근처의 적에게 각각 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 한 유닛만 맞히는 경우 피해량이 두 배로 증가합니다.", // 황폐화
        "W": "지정한 위치에 {v1}초간 유지되는 벽을 생성합니다. 벽을 통과하는 적은 {v1}초 동안 마법 저항력이 {v2}% 감소하고, {v3}% <status>둔화</status>됩니다. (이동 속도는 시간이 지나면 점차 회복됩니다.)", // 고통의 벽
        "E": "<toggle>비활성화 시: </toggle>카서스가 적 유닛을 처치할 때마다 <scalemana>{v1}의 마나</scalemana>를 회복합니다.<br><br><toggle>활성화 시: </toggle>주변 적에게 초당 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.", // 부패
        "R": "카서스가 3초 동안 정신을 집중한 뒤 모든 적 챔피언에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.", // 진혼곡
    },
    "Cassiopeia": { // 카시오페아
        "P": "카시오페아의 모든 이동 속도 추가 효과가 증가합니다.", // 독사의 품격 — CD 요약본, 직접 다듬을 것
        "Q": "카시오페아가 독가스를 내뿜어 적들을 <keywordmajor>중독</keywordmajor>시키고 {v1}초 동안 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다. 챔피언에게 적중 시 카시오페아의 <speed>이동 속도가 {v3}%</speed> 상승했다가 {v4}초에 걸쳐 원래대로 돌아옵니다.", // 맹독 폭발
        "W": "카시오페아가 맹독을 내뿜어 {v1}초 동안 지속되는 독구름을 남깁니다. 독구름 속의 적은 초당 <magicdamage>{v2}의 마법 피해</magicdamage>를 입고 <keywordmajor>중독</keywordmajor>, <status>이동 스킬 사용 불가</status> 상태가 되며 {v3}% <status>둔화</status>됩니다.", // 독기의 늪
        "E": "카시오페아가 치명적인 가시를 발사해 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. <keywordmajor>중독</keywordmajor>된 적에게 사용 시 <magicdamage>{v2}의 마법 피해</magicdamage>를 추가로 입히고, 자신의 <healing>체력을 {v3}</healing> 회복합니다. 공격로 미니언과 작은 몬스터를 상대로는 회복하는 <healing>체력이 {v4}</healing>로 감소합니다.<br><br>해당 스킬로 대상을 처치하면 카시오페아가 <scalemana>마나를 {v5}</scalemana> 회복합니다.<br><br>", // 쌍독니
        "R": "카시오페아가 석화의 응시로 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 자신을 바라보는 적들을 {v2}초 동안 <status>기절</status>시킵니다. 카시오페아를 등진 적은 같은 시간 동안 {v3}% <status>둔화</status>됩니다.", // 석화의 응시
    },
    "Kaisa": { // 카이사
        "P": "카이사는 기본 공격으로 플라즈마 중첩을 쌓아 그에 따른 추가 마법 피해를 입힙니다. 아군의 이동 불가 효과가 적에게 적용됐을 때에도 플라즈마 중첩이 쌓입니다. 살아있는 무기 효과는 카이사가 구입하는 아이템에 따라 스킬을 강화시킵니다.", // 두 번째 피부 — CD 요약본, 직접 다듬을 것
        "Q": "카이사가 근처 적들을 추격하는 미사일을 {v1}개 발사하며, 적중한 적에게 각각 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입힙니다. (최대 {v3}) 이미 미사일에 맞은 적 챔피언 또는 몬스터에게 추가 적중할 경우 {v4}%의 피해를 입힙니다.<br><br><keywordmajor>진화 시</keywordmajor>: 미사일을 {v5}개 발사합니다.<br>현재: <physicaldamage>추가 공격력 {v6}/{v7}</physicaldamage>", // 이케시아 폭우
        "W": "카이사가 공허 에너지 광선을 발사해 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 <keywordmajor>플라즈마</keywordmajor> 중첩을 {v2}회 적용하며, @spell.KaisaPassive:PDuration@초 동안 처음으로 적중한 적에 대한 <keywordstealth>절대 시야</keywordstealth>를 얻습니다.<br><br><keywordmajor>진화 시</keywordmajor>: <keywordmajor>플라즈마</keywordmajor> 중첩을 {v3}회 적용합니다. 챔피언 적중 시 재사용 대기시간이 {v4}% 감소합니다.<br>현재: <scaleap>주문력 {v5}/{v6}</scaleap>", // 공허추적자
        "E": "카이사가 공허 에너지를 고속 충전하여 <speed>이동 속도가 {v1}</speed> 증가하고 충전 중에는 유체화 상태가 되며, {v2}초 동안 <attackspeed>공격 속도가 {v3}%</attackspeed> 증가합니다.<br><br>기본 공격 시 스킬의 재사용 대기시간이 {v4}초 감소합니다.<br><br><keywordmajor>진화 시</keywordmajor>: {v5}초 동안 <keywordstealth>투명</keywordstealth> 상태가 됩니다.<br>현재: <attackspeed>추가 공격 속도 {v6}%/{v7}%</attackspeed>", // 고속 충전
        "R": "카이사가 <keywordmajor>플라즈마</keywordmajor> 표식이 남은 적 챔피언 근처로 빠르게 돌진하며, {v1}초 동안 <shield>{v2}의 보호막</shield>을 얻습니다.", // 사냥본능
    },
    "Khazix": { // 카직스
        "P": "동료로부터 <font color='#FFF673'>고립</font>된 근처 적에게 표식이 남습니다. <font color='#FFF673'>고립</font>된 대상에게는 카직스의 스킬이 추가 효과를 발휘합니다.<br><br>카직스는 적의 시야에 노출되지 않을 때 보이지 않는 위협 효과를 받아, 다음 기본 공격으로 적 챔피언에게 추가 마법 피해를 입히고 몇 초간 둔화를 적용합니다.", // 보이지 않는 위협 — CD 요약본, 직접 다듬을 것
        "Q": "카직스가 근처 적을 공격해 <physicaldamage>@spell.KhazixQ:BaseDamage@의 물리 피해</physicaldamage>를 입힙니다. 아군으로부터 <keywordmajor>고립</keywordmajor>된 적에게는 <physicaldamage>@spell.KhazixQ:IsoDamage@의 피해</physicaldamage>를 입힙니다.", // 공포 감지
        "W": "카직스가 가시를 발사하여 처음 적중하는 적과 그 주변 좁은 반경에 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다. 카직스가 폭발 반경 내에 있으면 <healing>체력을 {v2}</healing> 회복합니다.", // 공허의 가시
        "E": "카직스가 도약 후 착지하며 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다.", // 도약
        "R": "<active>사용 시:</active> 카직스가 {v1}초 동안 <keywordstealth>투명</keywordstealth> 상태가 되고 <speed>이동 속도가 {v2}%</speed> 상승합니다. {v3}초 안에 이 스킬을 <recast>재사용</recast>할 수 있습니다.<br><br><passive>기본 지속 효과:</passive> 이 스킬을 레벨 업하면 <evolve>진화</evolve>를 통해 스킬 하나에 추가 효과를 부여합니다.<li><spellname>공포 감지:</spellname> 스킬 및 기본 공격 사거리가 늘어나고 <keywordmajor>고립</keywordmajor>된 대상에게 사용 시 재사용 대기시간이 @spell.KhazixQ:Effect4Amount@% 감소합니다.<li><spellname>공허의 가시:</spellname> 가시를 세 개 발사하고 적을 @spell.KhazixW:Effect3Amount@% <status>둔화</status>합니다. <keywordmajor>고립</keywordmajor>된 대상에게는 효과가 증가합니다.<li><spellname>도약:</spellname> 사거리가 늘어나고 챔피언 처치 관여 시 재사용 대기시간이 초기화됩니다.<li><spellname>공허의 습격:</spellname> {v4}초 동안 <keywordstealth>투명</keywordstealth> 상태가 되고 2회 <recast>재사용</recast>할 수 있습니다.", // 공허의 습격
    },
    "Katarina": { // 카타리나
        "P": "카타리나가 최근에 피해를 입힌 챔피언이 죽을 때마다 카타리나에게 적용 중인 스킬 재사용 대기시간이 크게 감소합니다.<br><br>카타리나가 <font color='#FFF673'>단검</font>을 다시 주우면 근처의 적을 모두 공격해 마법 피해를 입힙니다.", // 탐욕 — CD 요약본, 직접 다듬을 것
        "Q": "카타리나가 <keywordmajor>단검</keywordmajor>을 던져 대상과 주변 {v1}명의 적에게 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다. 그 후 <keywordmajor>단검</keywordmajor>은 최초 대상 뒤에 떨어집니다.", // 단검 투척
        "W": "카타리나가 공중에 <keywordmajor>단검</keywordmajor>을 던지고 <speed>이동 속도가 {v1}%</speed> 상승했다가 {v2}초에 걸쳐 원래대로 돌아옵니다.", // 준비
        "E": "카타리나가 대상 아군, 적, 또는 <keywordmajor>단검</keywordmajor>에게 순간적으로 이동합니다. 대상이 적일 경우 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고, 그 외의 경우에는 사거리 안에 있으면서 이동한 지점에서 가장 가까운 적을 공격합니다.<br><br><keywordmajor>단검</keywordmajor>을 다시 주우면 이 스킬의 재사용 대기시간이 <scalelevel>{v2}</scalelevel>초 (<scalelevel>{v3}</scalelevel>) 줄어듭니다. 카타리나는 대상 근처의 어느 지점으로든 순간적으로 이동할 수 있습니다.", // 순보
        "R": "카타리나가 칼날의 돌풍을 일으켜 매우 빠른 속도로 근처 적 챔피언 세 명을 단검으로 공격합니다. 각 단검은 <magicdamage>{v1}의 마법 피해</magicdamage> 및 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입히고 {v3}초 동안 {v4}%의 고통스러운 상처를 남깁니다.<br><br>적 하나당 {v5}초 동안 받는 총 피해량: <magicdamage>{v6}의 마법 피해</magicdamage> 및 <physicaldamage>{v7}의 물리 피해</physicaldamage>", // 죽음의 연꽃
    },
    "Jade_Katarina": { // 카타리나
        "P": "챔피언 킬 또는 어시스트를 기록하면 카타리나의 재사용 대기시간이 15초 감소합니다.", // 탐욕 — CD 요약본, 직접 다듬을 것
        "Q": "단검을 던져 <magicdamage>{v1}</magicdamage>의 마법 피해를 입힙니다. 단검은 가장 가까운 적 {v2}명에게 튕기며, 튕길 때마다 10% 감소한 피해를 입힙니다.<br><br>적중한 적에게는 {v3}초 동안 표식이 남습니다. 카타리나는 기본 공격 또는 스킬로 표식을 소모하여 <magicdamage>{v4}</magicdamage>의 마법 피해를 추가로 입힐 수 있습니다.", // 단검 투척
        "W": "단검을 원형으로 휘둘러 {v1}의 마법 피해를 입힙니다. 적 챔피언을 맞히면 카타리나가 {v2}초간 {v3}%의 <speed>이동 속도</speed>를 얻습니다.", // 사악한 검무
        "E": "대상의 위치로 이동합니다. 대상이 적이라면 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.<br><br>순보 사용 후 카타리나가 {v2}초 동안 {v3}% 감소한 피해를 받습니다.", // 순보
        "R": "칼날의 돌풍을 일으켜, 가장 가까운 적 챔피언 3명에게 단검을 던지며 2.5초에 걸쳐 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.", // 죽음의 연꽃
    },
    "Kalista": { // 칼리스타
        "P": "칼리스타가 기본 공격이나 꿰뚫는 창의 준비 동작을 하는 동안 이동 명령을 하면, 칼리스타가 기본 공격과 함께 해당 위치로 도약합니다.", // 전투 태세 — CD 요약본, 직접 다듬을 것
        "Q": "칼리스타가 창을 던져 처음 적중한 대상에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다. 대상을 처치하면 창이 계속 뻗어나가 다음으로 적중한 대상에게 <spellname>뽑아 찢기</spellname>의 중첩을 적용합니다.<br><br>칼리스타는 이 스킬을 사용한 후 <spellname>전투 태세</spellname> 효과로 도약할 수 있습니다.", // 꿰뚫는 창
        "W": "<passive>기본 지속 효과:</passive> 칼리스타와 <keywordmajor>계약자</keywordmajor>가 같은 대상을 기본 공격하면 칼리스타가 <magicdamage>최대 체력의 {v1}%에 해당하는 마법 피해</magicdamage>를 입힙니다. 대상 하나당 재사용 대기시간은 {v2}초이며 챔피언이 아닌 대상에게는 최대 {v3}의 피해를 입힙니다.<br><br><passive>사용 시: </passive>칼리스타가 혼을 하나 보내 지정 영역을 정찰하게 합니다. 혼은 세 번 왕복하고 사라지며, 발각된 챔피언은 4초 동안 모습이 드러납니다. 충전 횟수는 2회이며 {v4}초마다 1회 충전됩니다.", // 감시하는 혼
        "E": "<passive>기본 지속 효과: </passive>칼리스타의 창은 대상의 몸에 4초 동안 유지되며 무제한으로 중첩됩니다.<br><br><active>사용 시:</active> 칼리스타가 근처 적에게 박힌 창을 뜯어내며 <physicaldamage>{v1}</physicaldamage>+두 번째 창부터 창 하나당 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입힙니다. 적중당한 적은 {v3}초 동안 <attention>{v4}</attention> <status>둔화</status>됩니다.<br><br>이 스킬로 대상을 처치하면 재사용 대기시간이 초기화되고 <scalemana>마나를 {v5}</scalemana> 돌려받습니다.", // 뽑아 찢기
        "R": "칼리스타가 <keywordmajor>계약자</keywordmajor>를 옆으로 끌어와 최대 4초간 경직 상태로 만듭니다. <keywordmajor>계약자</keywordmajor>는 마우스를 클릭하여 지정한 위치로 날아갈 수 있습니다. 챔피언과 부딪치면 멈추며, 주변 적들을 <status>뒤로 밀어냅니다</status>. <keywordmajor>계약자</keywordmajor>는 챔피언과 부딪치면 최대 공격 사거리만큼 밀려납니다.", // 운명의 부름
    },
    "Kennen": { // 케넨
        "P": "케넨의 스킬에 3번 적중당한 적은 기절합니다.", // 폭풍의 표식 — CD 요약본, 직접 다듬을 것
        "Q": "케넨이 표창을 던져 처음 적중한 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.", // 천둥의 표창
        "W": "<passive>기본 지속 효과:</passive> 5번째 기본 공격마다 <onhit>적중 시</onhit> <magicdamage>{v1}의 마법 피해</magicdamage>를 추가로 입힙니다.<br><br><active>사용 시:</active> 케넨이 전기 폭발을 일으켜 <spellname>폭풍의 표식</spellname>이 있는 주변 적에게 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.<br>", // 전류 방출
        "E": "케넨이 {v1}초 동안 번개 구체로 변신해 유체화 상태가 되어 <speed>{v2}%의 이동 속도</speed>를 얻고 충돌하는 적에게 <magicdamage>{v3}의 마법 피해</magicdamage>를 입힙니다. 한 명 이상의 적에게 피해를 입힐 경우 {v4}의 기력을 얻습니다. <br><br>이 스킬의 효과가 끝나면 {v5}초 동안 <attackspeed>{v6}%의 공격 속도</attackspeed>를 얻습니다. 치명타 발동 시 지속시간이 {v7}초 늘어납니다. <recast>재사용</recast>하면 스킬을 일찍 끝낼 수 있습니다.", // 번개 질주
        "R": "케넨이 마법 폭풍을 방출해 {v1}초마다 주변 모든 적에게 <magicdamage>{v2}의 마법 피해</magicdamage>를 입히고 {v3}초 동안 <scalearmor>{v4}의 방어력</scalearmor> 및 <scalemr>{v4}의 마법 저항력</scalemr>을 얻습니다. 동일한 적에게 다시 스킬을 맞힐 때마다 피해량이 {v5}%씩 증가합니다.", // 날카로운 소용돌이
    },
    "Caitlyn": { // 케이틀린
        "P": "케이틀린은 덫 또는 투망에 걸린 대상을 공격할 때나 일정 횟수 이상의 기본 공격을 했을 때 헤드샷을 발사하여 치명타 확률에 비례한 추가 피해를 입힙니다. 덫에 걸리거나 투망에 맞은 대상에게는 케이틀린의 헤드샷 공격 사거리가 두 배가 됩니다.", // 헤드샷 — CD 요약본, 직접 다듬을 것
        "Q": "케이틀린이 조준한 후 적을 관통하는 총알을 발사하여 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다. 첫 번째 대상에게 적중한 후에는 탄도체 유효 범위가 넓어지며 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입힙니다.<br><br><spellname>요들잡이 덫</spellname> 때문에 위치가 드러난 적은 항상 100%의 피해를 입습니다.", // 필트오버 피스메이커
        "W": "케이틀린이 덫을 설치하여 처음 밟는 적을 {v1}초 동안 <status>속박</status>하고 3초 동안 해당 적에 대한 <keywordstealth>절대 시야</keywordstealth>를 얻습니다. 덫은 {v2}초 동안 지속되며 한 번에 {v3}개까지 설치할 수 있습니다. 이 스킬은 {v4}회까지 충전됩니다. ({v5}초마다 충전)<br><br>이 스킬에 의해 속박된 대상은 <keywordmajor>헤드샷</keywordmajor>으로 <physicaldamage>{v6}의 물리 피해</physicaldamage>를 추가로 입습니다.", // 요들잡이 덫
        "E": "케이틀린이 투망을 발사하여 처음으로 적중한 적을 {v1}초 동안 {v2}% <status>둔화</status>시키고 <magicdamage>{v3}의 마법 피해</magicdamage>를 입힙니다. 케이틀린은 뒤로 밀려납니다.", // 90구경 투망
        "R": "케이틀린이 잠시 정신을 집중하고 공을 들인 완벽한 사격을 하여 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다. 다른 적 챔피언이 총알을 대신 맞을 수도 있습니다. 정신을 집중하는 동안 대상에 대한 <keywordstealth>절대 시야</keywordstealth>를 얻습니다.<br><br><rules>피해량은 케이틀린의 치명타 확률 및 치명타 피해량에 비례합니다.</rules>", // 비장의 한 발
    },
    "Kayn": { // 케인
        "P": "케인은 다르킨 무기 라아스트를 휘두르는 한편 제압하려고 하고, 라아스트는 케인을 잠식하려 합니다. <font color='#fe5c50'>다르킨</font>이 승리하거나, 아니면 케인이 라아스트를 제압해 <font color='#8484fb'>그림자 암살자</font>가 될 수도 있습니다.<br><br><font color='#fe5c50'>다르킨:</font> 챔피언에게 가한 스킬 피해에 비례해 체력을 회복합니다.<br><br><font color='#8484fb'>그림자 암살자:</font> 적 챔피언과 전투 시작 후 첫 몇 초 동안 추가 피해를 입힙니다.", // 다르킨의 낫 — CD 요약본, 직접 다듬을 것
        "Q": "케인이 돌진한 후 낫을 휘둘러 통과한 적에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힌 다음 주변 적에게 다시 같은 피해를 입힙니다.<br><br><keywordmajor>다르킨 학살자:</keywordmajor> <physicaldamage>{v2}+최대 체력의 {v3}에 해당하는 물리 피해</physicaldamage>를 입힙니다.", // 살상돌격
        "W": "케인이 낫을 위로 휘둘러 적에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 {v2}% <status>둔화</status>시킵니다. 둔화 효과는 {v3}초에 걸쳐 사라집니다.<br><br><keywordmajor>그림자 암살자:</keywordmajor> 케인이 이 스킬을 사용하면서 이동하여 사거리를 늘릴 수 있습니다.<br><br><keywordmajor>다르킨 학살자:</keywordmajor> 또한 적중한 적을 {v4}초 동안 <status>공중으로 띄워 올립니다</status>.", // 몰아치는 낫
        "E": "케인이 {v1}초 동안 유체화 상태가 되어 <speed>이동 속도가 {v2}%</speed> 증가하며 지형을 통과할 수 있습니다. 처음으로 지형을 통과하면 <healing>체력을 {v3}</healing>만큼 회복합니다.<br><br><status>이동 불가</status> 상태가 되거나 지형 밖에서 {v4}초 넘게 머무르면 이 스킬이 즉시 종료됩니다.<br><br><keywordmajor>그림자 암살자:</keywordmajor> <speed>이동 속도가 {v5}%</speed> 증가하고 <status>둔화</status>에 면역이 되며 재사용 대기시간이 {v6}초로 감소합니다.", // 그림자의 길
        "R": "<passive>기본 지속 효과:</passive> 케인이 피해를 입힌 챔피언에게 3.15초 동안 표식을 남깁니다.<br><br>케인이 표식이 남은 적에게 파고들어 대상으로 지정할 수 없게 됩니다. {v1}초가 지나거나 <recast>재사용</recast>하면 케인이 빠져나오면서 적에게 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입힙니다.<br><br><keywordmajor>그림자 암살자:</keywordmajor> 이 스킬의 사거리, 즉 케인이 빠져나오는 거리가 증가하며 빠져나올 때 <spellname>다르킨의 낫</spellname> 재사용 대기시간이 초기화됩니다.<br><br><keywordmajor>다르킨 학살자:</keywordmajor> <physicaldamage>최대 체력의 {v3}에 해당하는 물리 피해</physicaldamage>를 입히고 <healing>체력을 {v4}</healing> 회복합니다. (피해량의 {v5}%)", // 그림자의 지배
    },
    "Kayle": { // 케일
        "P": "챔피언 레벨 및 스킬 레벨이 오를수록 케일의 공격이 천상의 힘을 받아 강화됩니다. 케일의 날개가 불타오르면서 점차 공격 속도, 이동 속도, 공격 사거리, 기본 공격 시 화염파 발사 효과를 얻습니다.", // 거룩한 승천 — CD 요약본, 직접 다듬을 것
        "Q": "케일이 처음으로 적을 맞히면 멈추는 천상의 검을 발사합니다. 검은 대상과 그 뒤에 있는 적들에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 {v3}% <status>둔화</status>시키며 {v4}초 동안 <scalearmor>{v5}%의 방어력과</scalearmor> <scalemr>마법 저항력</scalemr>을 감소시킵니다.", // 광휘의 일격
        "W": "케일이 자신과 아군 챔피언에게 빛을 불어넣어 <healing>체력을 {v1}</healing> 회복하고 {v2}초 동안 <speed>이동 속도를 {v3}</speed> 상승시킵니다.", // 천상의 축복
        "E": "<passive>기본 지속 효과:</passive> 기본 공격이 <magicdamage>{v1}의 마법 피해</magicdamage>를 추가로 입힙니다.<br><br><active>사용 시:</active> 케일의 다음 공격 사거리가 증가하며 <magicdamage>대상이 잃은 체력의 {v2}만큼 마법 피해</magicdamage>를 추가로 입힙니다. 이 공격은 케일이 <scalelevel>@Spell.KaylePassive:LevelForPassiveRank2@레벨</scalelevel>에 도달하면 대상에게 적중 시 폭발하여 주변 적에게 피해를 입힙니다.", // 화염주문검
        "R": "케일이 아군 챔피언 한 명을 {v1}초 동안 무적 상태로 만든 뒤 대상 주위 지역을 정화해 주변 적들에게 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.", // 신성한 심판
    },
    "Jade_Kayle": { // 케일
        "P": "케일이 주문력의 일정 비율만큼 공격력을 얻고, 공격력의 일정 비율만큼 주문력을 얻습니다.", // 신성한 열정 — CD 요약본, 직접 다듬을 것
        "Q": "케일이 대상을 강타하여 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고, {v2}초 동안 {v3}% <status>둔화</status>시키며 자신에게 받는 피해를 {v4}% 증가시킵니다.", // 징벌
        "W": "케일이 아군 챔피언 1명을 축복하여 {v1}초간 {v2}%의 <speed>이동 속도</speed>를 부여하고 <healing>{v3}의 체력</healing>을 회복시킵니다.", // 신성한 축복
        "E": "케일의 공격 사거리가 {v1}초간 {v2} 증가하고, 기본 공격 적중 시 <magicdamage>{v3}의 추가 마법 피해</magicdamage>를 입힙니다. 또한 기본 공격을 가할 때 주변 적이 <magicdamage>{v4}의 마법 피해</magicdamage>를 받습니다.", // 정의로운 분노
        "R": "케일의 성스러운 빛이 아군 챔피언을 감싸며 {v1}초 동안 무적 상태로 만듭니다.", // 중재
    },
    "KogMaw": { // 코그모
        "P": "코그모가 죽으면 4초 후 폭발하여 주변 적에게 고정 피해를 입힙니다.", // 이케시아식 마무리 — CD 요약본, 직접 다듬을 것
        "Q": "<passive>기본 지속 효과:</passive> 코그모의 <attackspeed>공격 속도가 {v1}%</attackspeed> 증가합니다.<br><br><active>사용 시:</active> 코그모가 부식성 침을 토하여 처음 맞은 적에게 <magicdamage>{v2}의 마법 피해</magicdamage>를 입히고 {v3}초 동안 <scalemr>마법 저항력</scalemr>과 <scalearmor>방어력을 {v4}%</scalearmor> 낮춥니다.", // 부식성 침
        "W": "코그모의 사거리가 {v1} 증가하고 {v2}초 동안 <onhit>적중 시</onhit> 추가로 <magicdamage>최대 체력의 {v3}에 해당하는 마법 피해</magicdamage>를 입힙니다.", // 생체마법 폭격
        "E": "코그모가 분비물을 뱉어 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 유지되는 분비물 흔적을 남깁니다. 흔적을 지나는 적은 {v3}% <status>둔화</status>됩니다.", // 공허의 분비물
        "R": "코그모가 범위 내에 산성을 뿌려 <magicdamage>{v1}+잃은 체력의 1%당 {v2}%에 해당하는 마법 피해</magicdamage>를 입히고 2초 동안 적중당한 적의 위치를 드러냅니다. <healing>체력이 40%</healing> 이하인 적들은 대신 <magicdamage>{v3}의 마법 피해</magicdamage>를 입습니다.<br><br>{v4}초 안에 사용한 후속 공격은 추가로 <scalemana>{v5}의 마나</scalemana>를 소모합니다. (최대: <scalemana>{v6}의 마나</scalemana>)", // 살아있는 곡사포
    },
    "Jade_KogMaw": { // 코그모
        "P": "코그모는 사망할 때 몸에서 연쇄 반응을 일으켜 4초 뒤에 폭발합니다. 폭발 시 주변 적에게 마법 피해를 입힙니다.", // 이케시아식 마무리 — CD 요약본, 직접 다듬을 것
        "Q": "<passive>기본 지속 효과:</passive> 코그모가 <attackspeed>{v1}%의 공격 속도</attackspeed>를 얻습니다.<br><br><active>사용 시:</active> 코그모가 부식성 침을 발사하여 처음 적중한 적에게 <magicdamage>{v2}의 마법 피해</magicdamage>를 입히고, {v3}초 동안 <scalearmor>{v4}의 방어력</scalearmor>과 <scalemr>마법 저항력</scalemr>을 감소시킵니다.", // 부식성 침
        "W": "코그모가 {v1}초 동안 {v2}의 공격 사거리를 얻고, 기본 공격 <onhit>적중 시</onhit> <magicdamage>최대 체력에 비례하는 {v3}의 마법 피해</magicdamage>를 추가로 입힙니다.", // 생체마법 폭격
        "E": "코그모가 분비물을 뱉어 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 유지되는 분비물 흔적을 남깁니다. 흔적 안에 있는 적은 {v3}% <status>둔화</status>됩니다.", // 공허의 분비물
        "R": "코그모가 매우 먼 거리로 산성 포탄을 발사하여 잠시 후 착탄시킵니다. 산성 포탄은 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 위치를 드러냅니다. 챔피언에게는 <magicdamage>{v3}의 증가한 마법 피해</magicdamage>를 입힙니다.<br><br>{v4}초 이내에 스킬을 재사용하면 <scalemana>{v5}의 마나</scalemana>를 추가로 소모합니다. (최대 <scalemana>{v6}의 마나</scalemana> 소모)", // 살아있는 곡사포
    },
    "Corki": { // 코르키
        "P": "코르키의 기본 공격 피해량의 일부가 추가 <trueDamage>고정 피해</trueDamage>로 전환됩니다.", // 마법공학 탄약 — CD 요약본, 직접 다듬을 것
        "Q": "코르키가 폭탄을 던져 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. {v2}초 동안 폭탄에 맞은 지역과 챔피언이 드러납니다.", // 인광탄
        "W": "코르키가 비행하며 경로를 {v1}초 동안 불태웁니다. 경로에 있는 적들은 지속시간 동안 <magicdamage>{v2}의 마법 피해</magicdamage>를 입습니다.", // 발키리
        "E": "코르키가 전방에 개틀링 건을 발사하여 {v1}초 동안 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입히고 <scalemr>마법 저항력</scalemr>과 <scalearmor>방어력을 최대 {v3}</scalearmor>만큼 감소시킵니다.", // 개틀링 건
        "R": "코르키가 처음으로 적을 맞히면 폭발하는 미사일을 발사하여 주변 적에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다. 세 번째 미사일은 매번 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입힙니다.<br><br>이 스킬은 최대 {v3}회 충전됩니다. 챔피언을 상대로 기본 공격 적중 시 충전 시간이 <attention>{v4}</attention>초 감소합니다.", // 미사일 폭격
    },
    "Jade_Corki": { // 코르키
        "P": "코르키의 기본 공격이 미니언, 몬스터, 챔피언에게 추가 고정 피해를 입힙니다.", // 마법공학 유산탄 — CD 요약본, 직접 다듬을 것
        "Q": "<maintext>대상 지역에 있는 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 또한 6초 동안 폭탄에 맞은 지역과 챔피언이 <status>드러납니다</status>. (은신한 적은 드러나지 않습니다.)", // 인광탄
        "W": "<maintext>코르키가 대상 위치로 날아가며 폭격을 가해, 경로상에 있는 적에게 초당 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.", // 발키리
        "E": "<maintext>코르키가 정면에 4초 동안 원뿔 형태로 개틀링 건을 발사하여 매초 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 <status>방어력을 {v2}</status> 감소시킵니다. 방어력 감소 효과는 중첩되며 2초 동안 지속됩니다.", // 개틀링 건
        "R": "<maintext>코르키가 대상 위치로 미사일을 발사합니다. 미사일은 처음 적중하는 적과 충돌합니다. 각 미사일은 해당 지역에 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.<br><br>이 스킬은 7회까지 충전됩니다. ({v2}초마다 충전)<br><br>세 번째마다 거대한 미사일이 발사되며 대신 <magicdamage>{v3}의 마법 피해</magicdamage>를 입힙니다.", // 미사일 폭격
    },
    "Quinn": { // 퀸
        "P": "데마시아 독수리 발러가 주기적으로 적에게 <keywordMajor>매사냥</keywordMajor> 표식을 남깁니다. <keywordMajor>매사냥</keywordMajor> 대상에 대한 퀸의 첫 번째 기본 공격은 추가 물리 피해를 입힙니다.", // 매사냥 — CD 요약본, 직접 다듬을 것
        "Q": "발러가 날아가 처음 적중한 적에게 <keywordmajor>매사냥</keywordmajor> 표식을 남기고 {v1}초간 대상의 시야 반경을 줄입니다. 이후 주변의 모든 적에게 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입힙니다.<br><br>최초 대상이 챔피언이 아닌 경우 대상은 {v1}초 동안 <status>공격 불가</status> 상태가 됩니다.", // 실명 공격
        "W": "<passive>기본 지속 효과:</passive> <keywordmajor>매사냥</keywordmajor> 대상을 공격하면 {v1}초간 <attackspeed>공격 속도가 {v2}%</attackspeed>, <speed>이동 속도가 {v3}%</speed> 상승합니다.<br><br><active>사용 시:</active> 발러가 {v4}초 동안 주변의 넓은 지역을 드러냅니다.", // 예리한 감각
        "E": "퀸이 적에게 돌진해 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 대상에게 <keywordmajor>매사냥</keywordmajor> 표식을 남깁니다. 퀸이 뛰어오르며 뒤쪽으로 물러나며 대상을 잠시 <status>뒤로</status> <status>밀어내고</status> {v2}% <status>둔화</status>시킵니다. 둔화 효과는 {v3}초에 걸쳐 사라집니다.", // 공중제비
        "R": "퀸이 발러를 불러 자신을 돕게 합니다. 2초간 정신 집중 후 둘은 하나가 되어 <speed>이동 속도가 {v1}%</speed> 증가하고 이 스킬을 <recast>재사용</recast>할 수 있게 됩니다. 공격하거나 <spellname>실명 공격</spellname> 또는 <spellname>공중제비</spellname> 스킬을 사용하면 이 스킬이 자동으로 <recast>재사용</recast>됩니다.<br><br><recast>재사용 시</recast>: 퀸과 발러가 공중에서 강습해 적 챔피언에게 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입히고 <keywordmajor>매사냥</keywordmajor> 표식을 남긴 후 스킬을 종료합니다.", // 후방 지원
    },
    "KSante": { // 크산테
        "P": "크산테의 스킬이 대상에게 표식을 남겨 다음번 기본 공격 시 추가 피해를 입힙니다.<br><br>총공세 시 크산테가 모든 기본 공격과 스킬로 입히는 피해량이 증가합니다.", // 불굴의 본능 — CD 요약본, 직접 다듬을 것
        "Q": "크산테가 무기를 내리쳐 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 {v2}초 동안 적에게 {v3}%의 <status>둔화</status> 효과를 적용합니다. 적중 시 {v4}초 동안 엔토포 타격 중첩을 1회 얻습니다. 2회 중첩되면 {v5}초 동안 적들을 <status>기절</status>시키고 <status>끌어당기는</status> 충격파를 발사합니다.<br><br><keywordmajor>총공세</keywordmajor>: 재사용 대기시간이 {v6}% 감소합니다.", // 엔토포 타격
        "W": "크산테가 무기를 치켜들며 {v1}~{v2}초 동안 방어 태세에 돌입합니다. 이때 크산테는 저지 불가 상태가 되며 받는 피해가 {v3}% 감소합니다. 이후 전방으로 돌진하며 <physicaldamage>{v4}+최대 체력의 {v5}에 해당하는 물리 피해</physicaldamage>를 입힙니다. 적중당한 적은 <status>뒤로 밀려나며</status> {v6}~{v7}초(충전 시간에 비례) 동안 <status>기절</status>합니다.<br><br><keywordmajor>총공세:</keywordmajor> 재사용 대기시간이 초기화됩니다. 피해의 {v8}~{v9}%만큼 <truedamage>고정 피해</truedamage>(충전 시간에 비례)를 추가로 입힙니다. 피해량 감소 효과가 {v10}%까지 증가하며 돌진 속도가 증가하지만 더는 적을 <status>뒤로 밀어내거나</status> <status>기절</status>시키지 않습니다.", // 길을 여는 자
        "E": "크산테가 돌진해 {v1}초 동안 <shield>{v2}의 피해를 흡수하는 보호막</shield>을 얻습니다. 아군에게 돌진하면 돌진 사거리가 크게 증가하며 아군도 같이 <shield>보호막</shield>을 얻습니다.<br><br><keywordmajor>총공세</keywordmajor>: 재사용 대기시간이 {v3}% 감소하고 돌진 속도가 증가합니다.", // 발놀림
        "R": "크산테가 엔토포를 부숴 적 챔피언을 <status>뒤로 밀어내고</status> <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힌 후 적 챔피언 뒤로 돌진하며 {v2}초 동안 <keywordmajor>총공세</keywordmajor> 상태에 돌입합니다. 벽에 부딪힌 적은 벽을 뚫고 <status>뒤로 밀려나며</status> 크산테가 다시 공격해 <physicaldamage>{v3}의 물리 피해</physicaldamage>를 입힙니다.<br><br><keywordmajor>총공세</keywordmajor> 상태에서는 크산테의 스킬이 업그레이드되며 크산테의 <attackspeed>공격 속도가 {v4}%</attackspeed>, 추가 방어구 관통력이 {v5}%, <omnivamp>모든 피해 흡혈이 {v6}%</omnivamp> 증가하지만 <healing>최대 체력이 {v7}%</healing>, <scalearmor>추가 방어력이 {v8}%</scalearmor>, <scalemr>추가 마법 저항력이 {v8}%</scalemr> 감소합니다.", // 총공세
    },
    "Kled": { // 클레드
        "P": "클레드는 듬직한 친구 스칼을 타고 다닙니다. 스칼은 클레드 대신 피해를 입고, 스칼의 체력이 모두 소진되면 클레드가 스칼에게서 내립니다.<br><br>스칼에게서 내리면 클레드의 스킬이 바뀌고 챔피언에 대한 피해량이 줄어듭니다. 적과 싸우면 스칼의 용기를 회복시킬 수 있습니다. 용기가 최대치에 도달하면 스칼이 일부 체력을 회복한 채 나타나 클레드를 다시 태웁니다.", // 겁쟁이 도마뱀 스칼 — CD 요약본, 직접 다듬을 것
        "Q": "<keywordmajor>탑승 시:</keywordmajor> 클레드가 밧줄에 묶인 덫을 던져 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 첫 번째로 맞힌 적 챔피언이나 대형 정글 몬스터를 붙잡습니다.<br><br>클레드가 {v2}초 동안 붙잡은 적과 근거리를 유지하면 적을 <status>끌어당기며</status> <physicaldamage>{v3}의 물리 피해</physicaldamage>를 입히고 {v4}초 동안 {v5}% <status>둔화</status>시킵니다.", // 덫날리기
        "W": "<passive>기본 지속 효과:</passive> 클레드가 다음 기본 공격 시 네 번의 기본 공격 또는 {v1}초 동안 <attackspeed>공격 속도가 {v2}%</attackspeed> 증가합니다.<br><br>네 번째로 적중한 공격은 <physicaldamage>{v3}+최대 체력의 {v4}에 해당하는 물리 피해</physicaldamage>를 추가로 입힙니다.", // 버럭버럭
        "E": "클레드가 돌진하여 경로 상에 있는 적들에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고, 미니언과 작은 몬스터를 자신 앞으로 끌어당깁니다.<br><br>이 스킬이 적 챔피언이나 대형 정글 몬스터에게 적중하면 {v2}초 동안 클레드의 <speed>이동 속도가 {v3}%</speed> 증가합니다. {v4}초 내에 스킬을 <recast>재사용</recast>하면 같은 대상에게 다시 돌진합니다.", // 이랴!
        "R": "클레드가 보호막을 쓴 채 목표 지점으로 돌진합니다. 돌진 경로 위에 있는 아군은 <speed>이동 속도</speed>가 빨라집니다. 클레드는 돌진하는 동안 최대 <shield>{v1}의 피해를 흡수하는 보호막</shield>을 얻습니다. 이 보호막은 돌진이 끝나고 2초 후까지 유지됩니다. 스칼은 경로상의 첫 번째 적 챔피언에게 돌격해 <magicdamage>{v2}</magicdamage>~<magicdamage>최대 체력의 {v3}에 해당하는 마법 피해</magicdamage>(이동 거리에 비례)를 입히고 잠시 <status>뒤로 밀어냅니다</status>.", // 돌겨어어억!!!
    },
    "Qiyana": { // 키아나
        "P": "키아나의 첫 기본 공격이나 스킬은 적에게 적중하면 추가 피해를 입힙니다.", // 왕가의 특권 — CD 요약본, 직접 다듬을 것
        "Q": "무기에 <keywordmajor>원소의 힘</keywordmajor>이 없으면 무기를 휘두르며 좁은 영역에 있는 적들에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다. <keywordmajor>원소의 힘</keywordmajor>에 따라 사거리가 증가하고 추가 효과를 얻습니다.<li><keywordmajor>얼음의 힘</keywordmajor>: 적들을 잠시 동안 <status>속박</status>한 다음 {v2}초 동안 {v3}%만큼 <status>둔화</status>시킵니다.<li><keywordmajor>바위의 힘</keywordmajor>: 체력이 {v4}%보다 낮은 적에게 <physicaldamage>{v5}의 추가 물리 피해</physicaldamage>를 입힙니다.<li><keywordmajor>야생의 힘</keywordmajor>: <keywordstealth>투명</keywordstealth> 상태가 되고 <speed>이동 속도가 {v6}%</speed> 상승하는 영역을 생성합니다.<br>", // 원소의 분노 / 이쉬탈의 칼날
        "W": "<passive>기본 지속 효과:</passive> 무기에 <keywordmajor>원소의 힘</keywordmajor>이 부여된 상태에서는 공격 속도가 <attackspeed>{v1}%</attackspeed> 증가하고 기본 공격이 <magicdamage>{v2}의 추가 마법 피해</magicdamage>를 입힙니다. 또한 전투에서 벗어나 힘을 흡수한 지형 근처에 있으면 이동 속도가 <speed>{v3}%</speed> 증가합니다.<br><br><active>사용 시:</active> 근처 수풀, 지형 또는 강을 향해 돌진하며 해당 지형으로부터 <keywordmajor>원소의 힘</keywordmajor>을 흡수해 무기에 부여하고, <spellname>원소의 분노 / 이쉬탈의 칼날</spellname> 재사용 대기시간을 초기화합니다", // 대지창조
        "E": "적을 통과해 돌진하며 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다.", // 대담무쌍
        "R": "키아나가 충격파를 발사합니다. 충격파는 적을 뒤로 <status>밀어내며</status> 벽에 적중 시 폭발합니다. 폭발 후 해당 지형의 외곽 전체도 폭발하여 적을 0.5~{v1}초 동안 <status>기절</status>시키고 <physicaldamage>{v2}</physicaldamage>+최대 체력의 <physicaldamage>{v3}에 해당하는 물리 피해</physicaldamage>를 입힙니다. <status>기절</status> 지속시간은 충격파가 이동한 거리에 비례합니다.<br><br>충격파가 통과하는 강이나 수풀도 잠시 후 폭발하며 적들에게 같은 피해를 입히고 <status>기절</status>시킵니다.", // 여왕의 진가
    },
    "Kindred": { // 킨드레드
        "P": "킨드레드는 사냥감에게 표식을 남길 수 있습니다. 사냥에 성공하면 영구적으로 킨드레드의 기본 스킬이 강화됩니다. 사냥에 4회 성공하면 킨드레드의 기본 공격 사거리가 증가합니다.", // 킨드레드의 표식 — CD 요약본, 직접 다듬을 것
        "Q": "킨드레드가 뛰어올라 최대 3명의 적에게 화살을 발사하여 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 {v2}초 동안 <attackspeed>공격 속도가 {v3}</attackspeed>만큼 증가합니다.<br><br><spellname>늑대의 광기</spellname> 범위 안에 있는 동안 이 스킬의 재사용 대기시간이 {v4}초로 감소합니다.", // 화살 세례
        "W": "<passive>기본 지속 효과:</passive> 킨드레드가 이동하고 공격할 때마다 중첩이 쌓입니다. 100회 중첩 상태에서 다음 기본 공격 시 잃은 체력의 <healing>{v1}에 해당하는 체력</healing>을 회복합니다.<br><br><active>사용 시:</active> 킨드레드가 지대를 지정하고 늑대에게 명령을 내려 양이 마지막으로 공격한 적을 물게 합니다. 늑대의 공격은 <magicdamage>{v2}</magicdamage>+현재 체력의 <magicdamage>{v3}에 해당하는 마법 피해</magicdamage>를 입힙니다.", // 늑대의 광기
        "E": "킨드레드가 적을 약화시켜 {v1}초 동안 {v2}% <status>둔화</status>시킵니다.<br><br>{v3}초 내에 대상을 세 번 공격하면 늑대가 적을 덮쳐 추가로 <physicaldamage>{v4}</physicaldamage>+<physicaldamage>적이 잃은 체력의 {v5}에 해당하는 물리 피해</physicaldamage>를 입힙니다.", // 차오르는 공포
        "R": "킨드레드가 {v1}초 동안 땅을 축복하여 해당 영역 안에 있는 아군, 적, 중립 몬스터를 포함한 모든 유닛이 사망하지 않습니다. 체력이 10%로 떨어지면 유닛들이 해당 영역 안에 있는 동안 피해를 받거나 치유되지 않습니다.<br><br>축복이 끝나면 영역 안에 있는 모든 유닛이 <healing>체력을 {v2}</healing> 회복합니다.", // 양의 안식처
    },
    "Taric": { // 타릭
        "P": "타릭이 스킬을 사용하면 다음 2회의 기본 공격에 추가 마법 피해가 적용되고 공격 속도가 빨라지며 스킬의 재사용 대기시간이 단축됩니다.", // 담대함 — CD 요약본, 직접 다듬을 것
        "Q": "<passive>기본 지속 효과:</passive> {v1}초마다, <spellname>담대함</spellname> 기본 공격이 적중할 때마다 중첩을 1 얻습니다. (최대 {v2})<br><br><active>사용 시:</active> 모든 중첩을 소모해 중첩당 근처 아군 챔피언의 <healing>체력을 {v3}</healing>씩 회복시킵니다. ({v2}회 중첩 시 <healing>{v4}</healing>)", // 별빛 손길
        "W": "<passive>기본 지속 효과: </passive>타릭이 <scalearmor>{v1}의 방어력</scalearmor>을 얻고 자신과 이 스킬로 묶인 아군 사이에 끈을 형성합니다. 서로 가까이 있으면 아군이 <scalearmor>{v1}의 방어력</scalearmor>을 얻으며 타릭과 연결된 아군 둘 다 타릭의 모든 스킬을 사용합니다.<br><br><passive>사용 시: </passive>타릭이 아군 챔피언 하나와 묶이며 {v2}초 동안 <shield>최대 체력의 {v3}%에 해당하는 보호막</shield>을 부여합니다.", // 수호의 고리
        "E": "타릭이 별빛 광선을 발사합니다. 광선은 {v1}초 후 터지며 <magicdamage>{v2}의 마법 피해</magicdamage>를 입히고 적을 {v3}초 동안 <status>기절</status>시킵니다.", // 황홀한 강타
        "R": "타릭이 천상의 보호를 요청합니다. {v1}초 후 근처 아군 챔피언은 {v2}초 동안 무적 상태가 됩니다.", // 우주의 광휘
    },
    "Jade_Taric": { // 타릭
        "P": "타릭이 취향 때문에 무기에 박아 넣은 마법 보석 덕에 기본 공격 시 최대 마나에 비례하는 추가 마법 피해를 입힙니다.", // 보석학 — CD 요약본, 직접 다듬을 것
        "Q": "<maintext>타릭이 대지의 기운을 불러와 아군과 자신의 <healing>체력을 {v1}</healing>만큼 회복시킵니다. 자신을 대상으로 지정하면 체력 회복량이 40% 증가해, <healing>{v2}의 체력</healing>을 회복합니다.<br><br>타릭이 기본 공격을 가할 때마다 <spellname>원기 부여</spellname>의 재사용 대기시간이 1초 감소합니다. (적 챔피언 공격 시 3초)", // 원기 부여
        "W": "<passive>기본 지속 효과: </passive>보석이 타릭의 <scalearmor>방어력을 {v1}</scalearmor>만큼 증가시킵니다. 또한 주변의 아군 챔피언이 <scalearmor>{v2}의 방어력</scalearmor>(타릭 방어력의 {v3}%)을 얻습니다.<br><br><active>사용 시: </active>타릭이 자신의 방어구를 산산조각 내, 주변 적에게 <magicdamage>{v4}의 피해</magicdamage>를 입히고 4초 동안 <scalearmor>방어력을 {v5}</scalearmor>만큼 감소시킵니다. 타릭은 <spellname>산산조각</spellname>이 재사용 대기 중일 때 <scalearmor>{v1}의 방어력</scalearmor>을 잃습니다.", // 산산조각
        "E": "<maintext>타릭이 지정한 적에게 찬란한 빛의 구체를 발사해, <magicdamage>{v1}</magicdamage>~<magicdamage>{v2}의 마법 피해</magicdamage>를 입히고 {v3}~{v4}초 동안 <status>기절</status>시킵니다. 황홀한 강타는 타릭이 대상과 가까울수록 큰 피해를 입히고, 대상과 멀수록 오랫동안 기절시킵니다.", // 황홀한 강타
        "R": "<maintext>타릭이 망치로 지면을 강타하여 주변 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.<br><br>이후 10초간 타릭의 보석이 에너지를 발산하여, 타릭에게 <physicaldamage>{v2}의 공격력</physicaldamage>과 <magicdamage>주문력</magicdamage>을 부여합니다. 근처의 아군 또한 <physicaldamage>{v3}의 공격력</physicaldamage>과 <magicdamage>주문력</magicdamage>을 얻습니다.", // 영롱한 빛
    },
    "Talon": { // 탈론
        "P": "탈론이 챔피언이나 대형 몬스터에게 스킬을 사용하면 최대 3회까지 중첩되는 상처가 남습니다. 상처가 3회 중첩된 챔피언에게 기본 공격을 가하면 출혈을 일으켜 일정 시간 동안 큰 피해를 입힙니다.", // 검의 최후 — CD 요약본, 직접 다듬을 것
        "Q": "탈론이 대상에게 도약해 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다. 근접 공격이 가능한 거리에서 사용하면 대신 치명타가 적용되어 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입힙니다.<br><br>이 스킬로 대상을 처치하면 <healing>체력을 {v3}</healing> 회복하고 재사용 대기시간의 {v4}%를 돌려받습니다.", // 녹서스식 외교
        "W": "탈론이 부메랑 단검을 여러 개 던져 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다. 이후 단검이 돌아오며 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입히고 {v3}초 동안 {v4}% <status>둔화</status>시킵니다.", // 갈퀴손
        "E": "탈론이 가장 가까운 지형이나 구조물 위로 도약해 뛰어넘습니다. 한 번 넘어간 지형은 {v1}초 동안 다시 넘을 수 없습니다.", // 암살자의 길
        "R": "탈론이 사방에 검을 던져 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고, <speed>이동 속도가 {v2}%</speed> 상승하며 {v3}초 동안 <keywordstealth>투명</keywordstealth> 상태가 됩니다. <keywordstealth>투명</keywordstealth> 상태가 끝나면 검이 탈론에게 돌아오며 다시 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다.<br><br>탈론이 기본 공격이나 <spellname>녹서스식 외교</spellname> 스킬로 <keywordstealth>투명</keywordstealth> 상태를 해제하면 검이 탈론 대신 탈론의 대상에게 날아갑니다.", // 그림자 공격
    },
    "Taliyah": { // 탈리야
        "P": "벽 근처에서 이동 속도가 상승합니다.", // 바위타기 — CD 요약본, 직접 다듬을 것
        "Q": "탈리야가 5개의 바위 조각을 던져 처음으로 맞힌 적 주변 지역에 개당 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 땅을 다집니다. 동일한 적에게 연달아 바위 조각을 맞힐 경우 피해량이 {v2}% 감소합니다.<br><br>다져진 땅에서 이 스킬을 사용하면 마나가 {v3} 소모되며 재사용 대기시간이 {v4}% 감소하고 다져진 땅을 소모해 바위를 던집니다. 바위는 적중한 적을 {v5}초 동안 {v6}% <status>둔화</status>시키고 첫 번째 대상에게 <magicdamage>{v7}의 마법 피해</magicdamage>를 입힙니다. 바위에 맞은 몬스터는 {v8}초 동안 <status>기절</status>합니다.", // 파편 난사
        "W": "탈리야가 땅을 흔들어 일정 지역에 있는 적을 선택한 방향으로 <status>밀어냅니다</status>.", // 지각변동
        "E": "탈리야가 일정 지역에 돌을 흩뜨려 적중한 적을 {v1}% <status>둔화</status>시키고 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다. 적이 돌진하거나 <status>밀려나서</status> 돌 위로 지나가게 되면 돌이 폭발하여, 남은 이동 시간+{v3}초 동안 <status>기절</status>시키고 <magicdamage>{v4}의 마법 피해</magicdamage>를 입힙니다.", // 대지의 파동
        "R": "탈리야가 {v1}초 동안 거대한 흙벽을 세웁니다. 즉시 <recast>재사용</recast>하면 움직이는 벽에 올라타며, 이동하거나 이동 불가 효과에 걸리면 벽에서 내려옵니다.<br><br>탈리야가 지난 {v2}초 안에 챔피언 또는 구조물에 의한 피해를 입었으면 이 스킬을 사용할 수 없습니다.", // 바위술사의 벽
    },
    "TahmKench": { // 탐 켄치
        "P": "탐 켄치가 어마어마한 체구를 이용해 기본 공격 시 총 체력에 기반해 추가 피해를 입힙니다. 적 챔피언에게 피해를 입히면 이들에게 <spellName>절대 미각</spellName> 중첩이 쌓입니다. 중첩이 3번 쌓이면 <spellName>집어삼키기</spellName> 스킬을 사용하여 적 챔피언을 집어삼킬 수 있습니다.", // 절대 미각 — CD 요약본, 직접 다듬을 것
        "Q": "처음 적중한 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 {v3}% <status>둔화</status>시킵니다. <br><br>챔피언에게 적중 시 탐 켄치가 <healing>{v4}+잃은 체력의 {v5}%</healing>를 회복하고 <spellname>절대 미각</spellname> 중첩을 적용하며 <magicdamage>@Spell.TahmKenchPassive:TotalDamage@의 추가 마법 피해</magicdamage>를 입힙니다. 해당 챔피언에게 <spellname>절대 미각</spellname> 중첩이 이미 3회 쌓였다면 중첩이 소모되며 챔피언이 {v6}초 동안 <status>기절</status>합니다.<br><br>혀가 공중에 떠 있는 동안 <font color='#0bf7de'>집어삼키기</font>를 시전하면 <spellname>절대 미각</spellname> 중첩이 3회 쌓인 적 챔피언에게 적중 시 멀리에서 해당 챔피언을 삼킵니다.", // 혀 채찍
        "W": "아래로 잠수한 후 지정한 장소에서 다시 나타나며 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 일정 지역에 있는 모든 적을 <status>공중으로 띄웁니다</status>. 적 챔피언을 한 명 이상 적중시키면 재사용 대기시간과 소모한 <scalemana>마나</scalemana>를 {v3}% 돌려받습니다.<br><br><font color='#0bf7de'>집어삼킨</font> 아군을 태우고 함께 이동할 수 있습니다. (아군 유닛은 언제든 일찍 나올 수 있습니다.)", // 심연 잠수
        "E": "<passive>기본 지속 효과:</passive> 탐 켄치가 입은 피해량의 {v1}%가 <spellname>두꺼운 피부</spellname>에 비축됩니다. 근처에 적 챔피언이 {v2}명 이상 있으면 피해량의 {v3}%를 비축합니다. {v4}초 동안 피해를 입지 않으면 <spellname>두꺼운 피부</spellname>를 빠르게 소모하여 비축량의 {v5}만큼 탐 켄치의 체력을 회복합니다.<br><br><active>사용 시:</active> 비축한 <spellname>두꺼운 피부</spellname>를 모두 {v6}초 동안 유지되는 <shield>보호막</shield>으로 전환합니다.", // 두꺼운 피부
        "R": "탐 켄치가 몇 초 동안 챔피언을 집어삼킵니다. 스킬 <recast>재사용</recast> 시 내뱉습니다.<br><br><specialrules>적 챔피언:</specialrules> <spellname>절대 미각</spellname> 3회 중첩이 필요합니다. 최대 {v1}초까지 집어삼켜지며 <magicdamage>{v2}(+최대 체력의 {v3})의 마법 피해</magicdamage>를 입습니다. 탐 켄치는 이 효과가 적용되는 동안 {v4}% <status>둔화</status>되며 <keywordname>고정</keywordname>됩니다.<br><br><specialrules>아군 챔피언:</specialrules> 최대 {v5}초까지 집어삼켜지며 내뱉어진 후 <shield>{v6}의 피해를 흡수하는 보호막</shield>을 획득합니다. 보호막은 점차 사라집니다. 아군이 원하면 더 일찍 나올 수도 있습니다. 탐 켄치는 이 효과가 적용되는 동안 <status>고정</status>되지만 <keywordname>심연 잠수</keywordname> 스킬을 사용할 수 있고 {v5}초 동안 <speed>이동 속도가 {v7}%</speed> 증가합니다.", // 집어삼키기
    },
    "Trundle": { // 트런들
        "P": "트런들은 근처에서 적 유닛이 쓰러질 때마다 죽은 유닛의 최대 체력의 일정 비율만큼 체력이 회복됩니다.", // 헌납 — CD 요약본, 직접 다듬을 것
        "Q": "트런들의 다음 기본 공격이 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 잠시 {v2}% <status>둔화</status>시킵니다. 이후 {v3}초 동안 트런들의 <physicaldamage>공격력이 {v4}</physicaldamage> 증가하며 적의 <physicaldamage>공격력은 {v5}</physicaldamage> 감소합니다.", // 깨물기
        "W": "트런들이 {v1}초 동안 일정 지역을 얼립니다. 그 안에 있으면 트런들의 <speed>이동 속도가 {v2}%</speed>, <attackspeed>공격 속도가 {v3}%</attackspeed>, 회복량이 {v4}% 증가합니다.", // 얼음 왕국
        "E": "트런들이 {v1}초 동안 얼음 기둥을 생성하여 기둥 바로 위에 있는 적을 잠시 <status>뒤로 밀어내고</status> 주변 적을 {v2}% <status>둔화</status>시킵니다.", // 얼음 기둥
        "R": "트런들이 적 챔피언의 체력을 흡수하며 {v1}초에 걸쳐 <magicdamage>최대 체력의 {v2}에 해당하는 마법 피해</magicdamage>를 입히고 <scalemr>마법 저항력</scalemr>과 <scalearmor>방어력을 {v3}%</scalearmor> 훔칩니다.", // 진압
    },
    "Tristana": { // 트리스타나
        "P": "레벨이 올라갈수록 공격 사거리도 올라갑니다.", // 정조준 — CD 요약본, 직접 다듬을 것
        "Q": "트리스타나가 자동 사격을 시작해 {v1}초 동안 <attackspeed>공격 속도가 {v2}%</attackspeed> 증가합니다.", // 속사
        "W": "트리스타나가 뛰어오른 후 착지하며 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 {v3}% <status>둔화</status>시킵니다.<br><br>챔피언 처치에 관여하거나 챔피언에게 쌓인 최대 중첩 <spellname>폭발 화약</spellname> 스킬이 터질 경우 이 스킬의 재사용 대기시간이 초기화됩니다.", // 로켓 점프
        "E": "<passive>기본 지속 효과: </passive>트리스타나가 기본 공격으로 적을 처치하면 주변 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.<br><br><active>사용 시:</active> 트리스타나가 적이나 포탑에 폭탄을 부착해 {v2}초 후 주변 적에게 <physicaldamage>{v3}의 물리 피해</physicaldamage>를 입힙니다. 폭탄이 부착된 대상을 기본 공격이나 스킬로 공격할 때마다 피해량이 {v4}%씩 증가합니다. (이 효과는 최대 4번까지 중첩됩니다.)<br><br>{v5}번 중첩되면 폭탄이 즉시 폭발합니다. (최대 <physicaldamage>{v6}의 물리 피해</physicaldamage>)", // 폭발 화약
        "R": "트리스타나가 거대한 대포를 발사하여 대상에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히며 주변 적과 함께 <status>밀어내고</status> {v2}초 동안 <status>기절</status>시킵니다.", // 대구경 탄환
    },
    "Jade_Tristana": { // 트리스타나
        "P": "레벨이 올라갈수록 트리스타나의 공격 사거리도 올라갑니다.", // 정조준 — CD 요약본, 직접 다듬을 것
        "Q": "<maintext>7초 동안 트리스타나의 <attackspeed>공격 속도가 {v1}%</attackspeed> 증가합니다.", // 속사
        "W": "<maintext>트리스타나가 땅에 대포를 발사해 대상 위치로 도약합니다. 착지 시 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 2.5초 동안 60% <status>둔화</status>시킵니다.<br>챔피언 처치 또는 어시스트 시 재사용 대기시간이 초기화됩니다.", // 로켓 점프
        "E": "<passive>기본 지속 효과: </passive>트리스타나가 기본 공격으로 처치한 적이 폭발하면서 주변 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.<br><br><active>사용 시: </active>지정한 적을 분쇄해, 5초 동안 <keyword>50%의 고통스러운 상처</keyword>를 적용하고 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.", // 폭발 화약
        "R": "<maintext>트리스타나가 적에게 거대한 대포를 발사하여 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 피해를 입힌 적과 그 주변 유닛을 {v2}만큼 <status>뒤로 밀어냅니다</status>.", // 대구경 탄환
    },
    "Tryndamere": { // 트린다미어
        "P": "트린다미어가 일반 공격, 치명타 공격 그리고 마지막 일격을 날릴 때마다 분노를 획득합니다. 분노는 트린다미어의 치명타 확률을 높이며 피의 갈망을 사용하면 소모됩니다.", // 격노 — CD 요약본, 직접 다듬을 것
        "Q": "<passive>기본 지속 효과:</passive> 트린다미어가 피에 굶주려 잃은 체력에 비례해 최대 <scalead>{v1}의 공격력</scalead>을 얻습니다.<br><br><active>사용 시:</active> 트린다미어가 <keywordmajor>분노</keywordmajor>를 소모하여 <healing>체력을 {v2}+분노당 {v3}만큼 회복(최대: {v4})</healing>합니다.", // 피의 갈망
        "W": "트린다미어가 모욕을 퍼부어 {v1}초 동안 챔피언의 공격력을 {v2} 감소시킵니다. 트린다미어에게서 도망치는 적은 {v3}초 동안 {v4}% <status>둔화</status>됩니다.", // 조롱의 외침
        "E": "트린다미어가 검을 들고 회전하며 적을 베어넘겨 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 적중한 적 하나당 <keywordmajor>분노가 {v2}</keywordmajor> 생성되며, 대상이 챔피언일 경우 <keywordmajor>분노가 {v3}</keywordmajor> 생성됩니다.<br><br>트린다미어가 치명타를 입힐 때마다 이 스킬의 재사용 대기시간이 {v4}초 감소하며 챔피언에게 치명타를 입히면 {v5}초 감소합니다.", // 회전 베기
        "R": "트린다미어의 체력이 {v1}초 동안 {v2} 아래로 내려가지 않으며 즉시 <keywordmajor>{v3}의 분노</keywordmajor>를 얻습니다.", // 불사의 분노
    },
    "Jade_Tryndamere": { // 트린다미어
        "P": "트린다미어가 잃은 체력에 비례해 증가하는 추가 치명타 확률을 얻습니다.", // 격노 — CD 요약본, 직접 다듬을 것
        "Q": "<passive>기본 지속 효과</passive>: 트린다미어가 피에 굶주려, 적을 처치하거나 치명타를 발동할 때마다 <keywordmajor>분노</keywordmajor>를 얻습니다. <keywordmajor>분노</keywordmajor> 1당 트린다미어의 <physicaldamage>공격력이 {v1}</physicaldamage>, 치명타 피해량이 {v2}% 증가합니다.<br><br><active>사용 시</active>: 트린다미어가 <keywordmajor>분노</keywordmajor>를 소모하여 <healing>{v3}+소모한 <keywordmajor>분노</keywordmajor> 1당 {v4}의 체력</healing>을 회복합니다. (최대 체력 회복량: <healing>{v5}</healing>)", // 피의 갈망
        "W": "트린다미어가 주변 챔피언의 비겁함을 조롱하며, {v1}초 동안 <physicaldamage>공격력</physicaldamage>을 {v2}만큼 감소시킵니다. 등을 돌리고 있는 적에게는 추가로 {v3}%의 <status>둔화</status>를 적용합니다.", // 조롱의 외침
        "E": "트린다미어가 회전하며 적을 베어넘겨, 경로상의 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.<br><br>트린다미어가 치명타를 발동할 때마다 <spellname>회전 베기</spellname>의 재사용 대기시간이 2초씩 감소합니다.", // 회전 베기
        "R": "트린다미어의 전투를 향한 갈망이 너무나도 강력해져, {v1}초 동안 사망하지 않게 되고 {v2}의 <keywordmajor>분노</keywordmajor>를 얻습니다.", // 불사의 분노
    },
    "TwistedFate": { // 트위스티드 페이트
        "P": "트위스티드 페이트는 유닛을 하나 처치할 때마다 '행운'의 주사위를 굴려 1에서 6까지의 골드를 추가로 얻습니다.", // 사기 주사위 — CD 요약본, 직접 다듬을 것
        "Q": "트위스티드 페이트가 카드 세 장을 던져 각각 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.", // 와일드 카드
        "W": "트위스티드 페이트가 덱을 섞고 <recast>재사용</recast>하면 세 카드 중 하나를 정해 다음 기본 공격을 강화합니다.<br><li>푸른색 카드는 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 <scalemana>마나를 {v2}</scalemana> 회복시킵니다.<li>붉은색 카드는 주변 적에게 <magicdamage>{v3}</magicdamage>의 피해를 입히고 2.5초 동안 {v4}% <status>둔화</status>시킵니다.<li>황금색 카드는 <magicdamage>{v5}</magicdamage>의 피해를 입히고 {v6}초 동안 <status>기절</status>시킵니다.", // 카드 뽑기
        "E": "<passive>기본 지속 효과:</passive> <attackspeed>공격 속도가 {v1}%</attackspeed> 증가하고 4번째 기본 공격마다 <magicdamage>{v2}의 마법 피해</magicdamage>를 추가로 입힙니다.", // 속임수 덱
        "R": "트위스티드 페이트가 카드에 집중하여 {v1}초 동안 맵에 있는 모든 적 챔피언에 대한 <keywordstealth>절대 시야</keywordstealth>를 얻고 해당 스킬을 <recast>재사용</recast>할 수 있습니다.<br><br><recast>재사용 시</recast>: 트위스티드 페이트가 최대 {v2}의 거리만큼 순간이동합니다.", // 운명
    },
    "Jade_TwistedFate": { // 트위스티드 페이트
        "P": "트위스티드 페이트와 아군이 적을 처치할 때마다 2골드를 추가로 얻습니다.", // 사기 주사위 — CD 요약본, 직접 다듬을 것
        "Q": "<maintext>카드 3장을 던져 경로상의 적 유닛에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.", // 와일드 카드
        "W": "트위스티드 페이트가 덱을 섞기 시작합니다. <recast>재사용</recast>하면 세 카드 중 하나를 선택해 다음 기본 공격을 강화합니다.<br><br><font color='#0000FF'>푸른색 카드</font>는 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 <scalemana>{v2}의 마나</scalemana>를 회복시킵니다.<br><br><font color='#FF0000'>붉은색 카드</font>는 대상 주변의 유닛에게 <magicdamage>{v3}의 마법 피해</magicdamage>를 입히고 2.5초 동안 {v4}% <status>둔화</status>시킵니다.<br><br><font color='#FFD700'>황금색 카드</font>는 <magicdamage>{v5}의 마법 피해</magicdamage>를 입히고 {v6}초 동안 <status>기절</status>시킵니다.", // 카드 뽑기
        "E": "트위스티드 페이트가 {v1}초 동안 정신을 집중한 뒤 지정한 위치로 순간이동합니다.", // 관문
        "R": "트위스티드 페이트가 모든 적 챔피언의 <keywordstealth>위치를 드러내고</keywordstealth> {v1}초 동안 {v2}% <status>둔화</status>시킵니다. 지속시간 동안 <spellname>관문</spellname>의 정신 집중 시간이 {v3}초로 감소합니다.", // 운명
    },
    "Twitch": { // 트위치
        "P": "트위치의 기본 공격 %i:OnHit% <OnHit>적중 시</OnHit> 대상을 중독시켜 초당 고정 피해를 입힙니다.", // 맹독 — CD 요약본, 직접 다듬을 것
        "Q": "트위치가 <keywordstealth>위장</keywordstealth> 상태에 돌입해 {v1}초 동안 <speed>이동 속도가 {v2}%</speed> 증가합니다. 트위치를 볼 수 없는 적 챔피언 근처에서는 이동 속도가 {v3}%까지 증가합니다. <keywordstealth>위장</keywordstealth>이 끝나면 {v4}초 동안 트위치의 <attackspeed>공격 속도가 {v5}%</attackspeed> 증가합니다.<br><br><keywordmajor>독</keywordmajor>에 중독된 적 챔피언이 죽으면 이 스킬의 재사용 대기시간이 초기화됩니다.", // 매복
        "W": "트위치가 독약 병을 던져 맞힌 모든 적에게 <spellname>맹독</spellname>을 중첩시키고 {v1}초 동안 지속되는 독구름을 남깁니다.<br><br>독구름 안의 적은 이동 속도가 {v2}% <status>감소</status>하고 매초 <spellname>맹독</spellname> 중첩이 쌓입니다.", // 독약 병
        "E": "<spellname>맹독</spellname>에 감염된 주위 적 모두에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 추가적으로 중첩된 <spellname>맹독</spellname> 하나당 <physicaldamage>{v2}의 물리 피해</physicaldamage>와 <magicdamage>{v3}의 마법 피해</magicdamage>를 입힙니다.<br><br>최대 피해량: <physicaldamage>{v4}의 물리 피해</physicaldamage>와 <magicdamage>{v5}의 마법 피해</magicdamage>", // 오염
        "R": "트위치가 석궁을 꺼내 {v1}초 동안 공격 사거리가 {v2}, <scalead>공격력이 {v3}</scalead> 증가하며 기본 공격은 적을 관통합니다. 이 공격은 통과하는 모든 적에게 적중하지만 한 번 관통할 때마다 피해량이 {v4}%씩 감소됩니다. 피해량은 최소 {v5}%까지 내려갑니다.<br>", // 무차별 난사
    },
    "Jade_Twitch": { // 트위치
        "P": "트위치의 기본 공격은 대상을 중독시켜 매초 마법 피해를 입힙니다.", // 맹독 — CD 요약본, 직접 다듬을 것
        "Q": "트위치가 {v1}초 동안 피해를 받지 않거나, {v2}초가 경과하면 {v3}초간 <keywordstealth>투명</keywordstealth> 상태가 되고 <speed>이동 속도가 {v4}%</speed> 증가합니다.<br><br><keywordstealth>투명</keywordstealth> 상태에서 벗어나면 {v5}초간 <attackspeed>{v6}%의 공격 속도</attackspeed>를 얻습니다.", // 매복
        "W": "트위치가 폭발하는 독약 병을 던져, 적에게 {v1}회의 <keywordmajor>맹독</keywordmajor> 중첩을 적용하고 {v2}초 동안 {v3}% <status>둔화</status>시킵니다.", // 독약 병
        "E": "트위치가 주변의 중첩이 남은 모든 적에게 <physicaldamage>{v1}</physicaldamage>+<keywordmajor>맹독</keywordmajor> 중첩당 <physicaldamage>{v2}</physicaldamage>의 물리 피해를 입힙니다.", // 말살
        "R": "트위치가 {v1}초 동안 {v2}의 공격 사거리, <physicaldamage>{v3}의 공격력</physicaldamage>을 얻습니다. 그동안 기본 공격 시 관통 화살을 발사하여, 대상을 추가로 맞힐 때마다 {v4}%씩 감소한 피해를 입힙니다. (최소 {v5}%)", // 무차별 난사
    },
    "Teemo": { // 티모
        "P": "티모가 아무 행동도 하지 않고 잠시 서 있으면 무기한 투명 상태가 됩니다. 수풀 속에서는 이동 중에도 투명 상태에 돌입해 유지할 수 있습니다. 투명 상태에서 벗어나면 기습공격 효과를 얻어 몇 초간 공격 속도가 증가합니다.", // 유격 전투 — CD 요약본, 직접 다듬을 것
        "Q": "티모가 다트를 날려 대상을 {v1}초 동안 <status>실명</status>시키고 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.", // 실명 다트
        "W": "<passive>기본 지속 효과:</passive> 티모가 챔피언 또는 포탑에게 {v1}초 동안 공격을 당하지 않았다면 <speed>이동 속도가 {v2}%</speed> 증가합니다.<br><br><active>사용 시:</active> 티모가 전력으로 질주하여 {v3}초 동안 <speed>이동 속도가 {v4}%</speed> 증가합니다. 이 효과는 공격당해도 사라지지 않습니다.", // 신속한 이동
        "E": "<passive>기본 지속 효과:</passive> 티모의 기본 공격 <onhit>적중 시</onhit> 중독 효과가 적용되어 추가로 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초에 걸쳐 <magicdamage>{v3}의 마법 피해</magicdamage>를 입힙니다.", // 맹독 다트
        "R": "티모가 밟으면 폭발하는 버섯 함정을 던집니다. 함정은 {v1}초 동안 {v2}% <status>둔화</status>시키고 <magicdamage>{v3}의 마법 피해</magicdamage>를 입히며 적의 모습을 드러냅니다.<br><br>함정은 {v4}분 동안 은신 상태로 유지됩니다. 버섯 위에 또 버섯을 던지면 튕긴 후 자리에 떨어집니다. 이 스킬은 {v5}회까지 충전됩니다. ({v6}초마다 충전)<br>", // 유독성 함정
    },
    "Jade_Teemo": { // 티모
        "P": "티모가 아무 행동도 하지 않고 잠시 서 있으면 무기한 투명 상태가 됩니다. 투명 상태에서 벗어나면 기습공격 효과를 얻어 몇 초간 공격 속도가 증가합니다.", // 위장 — CD 요약본, 직접 다듬을 것
        "Q": "<maintext><magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 대상이 <status>실명</status> 상태가 됩니다.", // 실명 다트
        "W": "<maintext><passive>기본 지속 효과: </passive>티모가 적 챔피언 또는 포탑에게 5초 동안 공격당하지 않았다면 <speed>이동 속도</speed>가 {v1}% 증가합니다.<br><br><active>사용 시: </active>티모가 전력으로 질주하여 3초 동안 <speed>이동 속도가 {v2}%</speed> 증가합니다. 이 효과는 공격당해도 사라지지 않습니다.", // 신속한 이동
        "E": "<maintext>티모의 기본 공격 명중 시 적을 중독시켜 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 4초 동안 매초 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다.", // 맹독 다트
        "R": "가지고 있던 버섯으로 적이 밟으면 폭발하는 함정을 설치합니다. 함정이 터지면 독이 퍼져 주변 적이 4초 동안 {v1}% <status>둔화</status>되고 <magicdamage>{v2}의 마법 피해</magicdamage>를 입습니다.<br><br>이 스킬은 3회까지 충전됩니다. ({v3}초마다 충전)<br>", // 유독성 함정
    },
    "Pyke": { // 파이크
        "P": "파이크가 적에게 보이지 않는 상태가 되면 최근 적 챔피언에게 잃었던 체력의 일부를 빠르게 회복합니다. 또한, 어떤 방법으로든 파이크가 획득한 추가 최대 체력은 모두 추가 공격력으로 전환됩니다.", // 가라앉은 자들의 축복 — CD 요약본, 직접 다듬을 것
        "Q": "<tap>짧게 누를 때:</tap> 파이크가 공격해 처음 적중한 적에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다. (챔피언 우선) 적중한 적은 {v2}초 동안 {v3}% <status>둔화</status>됩니다.<br><br><hold>길게 누를 때: </hold>파이크가 작살을 던져 처음 적중한 적에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입히고 자신 앞으로 <status>끌어당깁니다</status>. 적중한 적은 {v2}초 동안 {v3}% <status>둔화</status>됩니다.<br><br>정신 집중이 성공적으로 끝나지 않거나 스킬이 적 챔피언에게 적중하면 소모한 마나의 {v4}%를 돌려받습니다.", // 뼈 작살
        "W": "파이크가 <keywordstealth>위장</keywordstealth> 상태에 돌입하고 <speed>이동 속도가 {v1}%</speed> 증가합니다. 이동 속도는 {v2}초에 걸쳐 원래대로 돌아옵니다.", // 유령 잠수
        "E": "파이크가 돌진하며, 돌진을 시작했던 지점에 유령이 생성됩니다. 유령은 {v1}초 동안 적 챔피언을 <status>기절</status>시키고 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입힙니다.", // 망자의 물살
        "R": "파이크가 X 모양의 영역 내에 있는 모든 적 챔피언에게 피해를 주며, 체력이 <scalead>{v1}</scalead> 미만인 적에게 순간이동하여 <danger>처형</danger>합니다. 체력이 기준 이상인 챔피언과 챔피언이 아닌 대상의 경우, 해당 수치(<physicaldamage>{v2}</physicaldamage>)의 {v3}%에 해당하는 물리 피해를 입습니다. <br><br>적 챔피언이 X 구역 안에서 처치되면 {v4}초 안에 이 스킬을 <recast>재사용</recast>할 수 있습니다. 해당 챔피언을 파이크가 처치했다면 마지막으로 처치를 도운 아군에게도 챔피언 처치 골드가 주어집니다. 파이크가 아니라 아군이 처치했어도 파이크에게 챔피언 처치 골드가 주어집니다.<br>", // 깊은 바다의 처형
    },
    "Pantheon": { // 판테온
        "P": "스킬 사용 또는 공격을 몇 차례 하고 나면 다음 스킬이 강화됩니다.", // 필멸자의 의지 — CD 요약본, 직접 다듬을 것
        "Q": "<font color='#FF8C00'>짧게 누를 때:</font> 판테온이 창을 찔러 적중한 적들에게 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다. 혜성의 창 재사용 대기시간이 {v2}% 감소합니다.<br><br><font color='#FF8C00'>길게 누를 때:</font> 판테온이 창을 던져 처음 적중한 적에게 <physicaldamage>{v3}의 물리 피해</physicaldamage>를 입히고 뒤에 있는 적들에게 {v4}% 감소된 피해를 입힙니다. <br><br>체력이 {v5}% 아래인 적들에게는 스킬이 강화되어 <physicaldamage>{v6}의 물리 피해</physicaldamage>를 입힙니다.<br><br><font color='#EDDA74'>필멸자의 의지 추가 효과:</font> <physicaldamage>{v7}의 물리 피해</physicaldamage>를 추가로 입힙니다.", // 혜성의 창
        "W": "판테온이 대상에게 도약한 뒤 {v1}초 동안 대상을 <status>기절</status>시키고 <physicaldamage>최대 체력의 {v2}에 해당하는 물리 피해</physicaldamage>를 입힙니다.<br><br><keywordmajor>필멸자의 의지 추가 효과:</keywordmajor> 판테온의 다음 기본 공격이 {v3}회 타격하여 총 <physicaldamage>{v4}의 물리 피해</physicaldamage>를 입힙니다.", // 방호의 도약
        "E": "판테온이 방패를 들어 지정한 방향의 적들과 전투를 시작합니다. {v1}초 동안 포탑을 제외한 해당 방향의 피해로부터 면역이 되고 <physicaldamage>{v2}의 물리 피해</physicaldamage>를 입힙니다. 지속시간이 끝나면 판테온이 방패로 타격하며 <physicaldamage>{v3}의 물리 피해</physicaldamage>를 입힙니다.<br><br><font color='#EDDA74'>필멸자의 의지 추가 효과:</font> 방패로 타격할 때 {v4}초 동안 <scalearmor>방어력이 {v5}</scalearmor>, <scalemr>마법 저항력이 {v5}</scalemr> 상승하고 {v6}초 동안 <speed>이동 속도가 {v7}%</speed> 상승합니다. <br>", // 방패 돌격
        "R": "<passive>기본 지속 효과:</passive> 판테온의 방어구 관통력이 {v1}% 증가합니다.<br><br><active>사용 시:</active> 판테온이 힘을 모아 높이 도약했다가 창을 던져 좁은 영역에 <physicaldamage>@spell.PantheonQ:HoldDamageCalc@의 물리 피해</physicaldamage>를 입히고 {v2}초 동안 {v3}% <status>둔화</status>시킵니다. <br><br>그런 다음 지정한 위치에 유성이 되어 떨어집니다. 일직선상에 있는 적들에게 최대 <magicdamage>{v4}의 마법 피해</magicdamage>를 입힙니다. (피해량은 범위 가장자리로 갈수록 감소하여 가장 바깥쪽은 {v5}% 감소된 피해를 입힙니다.)<br><br>이 스킬을 사용하면 <font color='#EDDA74'>필멸자의 의지</font>가 즉시 활성화됩니다.", // 거대 유성
    },
    "Jade_Pantheon": { // 판테온
        "P": "판테온은 기본 공격이나 스킬을 4회 사용하면 다음에 받는 기본 공격이나 포탑 공격을 방어합니다.", // 방패 방어술 — CD 요약본, 직접 다듬을 것
        "Q": "판테온이 적에게 창을 던져 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다.", // 투창
        "W": "판테온이 지정한 적에게 도약한 뒤 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 <status>기절</status>시킵니다. 또한 판테온이 즉시 <spellname>방패 방어술</spellname> 효과를 얻습니다.", // 제오니아의 방패
        "E": "<passive>기본 지속 효과:</passive> <spellname>투창</spellname>, <spellname>심장추적자</spellname>, 기본 공격이 체력이 {v1}% 미만인 대상을 상대로 치명타를 100% 발동합니다.<br><br><active>사용 시:</active> 판테온이 정신을 집중하여, 전방에 빠르게 {v2}회의 공격을 가해 각각 <physicaldamage>{v3}의 물리 피해</physicaldamage>를 입힙니다. (총 <physicaldamage>{v4}</physicaldamage>의 피해)", // 심장추적자
        "R": "판테온이 힘을 모은 뒤, 공중으로 도약했다가 몇 초 뒤 목표 지점을 덮칩니다. 범위 중앙에 가까운 유닛은 최대 <magicdamage>{v1}의 마법 피해</magicdamage>를, 가장자리의 유닛은 최소 <magicdamage>{v2}의 마법 피해</magicdamage>를 받고 {v3}초 동안 {v4}% <status>둔화</status>됩니다.", // 대강하
    },
    "FiddleSticks": { // 피들스틱
        "P": "피들스틱의 장신구는 허수아비로 대체됩니다.", // 무해한 허수아비 — CD 요약본, 직접 다듬을 것
        "Q": "<passive>기본 지속 효과:</passive> 전투에서 벗어나 적의 시야에 보이지 않을 때나 <keywordmajor>허수아비</keywordmajor>인 척할 때 적에게 스킬로 피해를 입히면 대상이 {v1}초 동안 <status>공포</status>에 질립니다.<br><br><active>사용 시:</active> {v1}초 동안 적을 <status>공포</status>에 빠트리고 <magicdamage>현재 체력의 {v2}에 해당하는 마법 피해</magicdamage>를 입힙니다. 최근에 피들스틱에 의해 <status>공포</status>에 빠진 대상은 <magicdamage>현재 체력의 {v3}에 해당하는 마법 피해</magicdamage>를 입습니다.<br>", // 공포
        "W": "피들스틱이 정신을 집중해 2초에 걸쳐 주변 적들의 영혼을 흡수합니다. 그동안 초당 <magicdamage>{v1}의 마법 피해</magicdamage> 를 입히고, 지속시간이 끝날 때 <magicdamage>대상이 잃은 체력의 {v2}%에 해당하는 마법 피해</magicdamage>를 입힙니다. 피들스틱은 <healing>피해량의 {v3}%에 해당하는 체력</healing>을 회복합니다.<br><br>피들스틱이 방해 없이 끝까지 스킬을 사용하면 남은 재사용 대기시간이 60% 감소합니다.<br>", // 풍작
        "E": "피들스틱이 어둠의 마력을 방출해 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 {v3}% <status>둔화</status>시킵니다. 또한 범위 중심에 있는 적을 지속시간 동안 <status>침묵</status>시킵니다.", // 수확
        "R": "피들스틱이 {v1}초 동안 정신을 집중해 대상 지역으로 순간 이동한 뒤 살인 까마귀 떼를 불러내어 {v2}초 동안 <magicdamage>{v3}의 마법 피해</magicdamage>를 입힙니다.", // 까마귀 폭풍
    },
    "Jade_Fiddlesticks": { // 피들스틱
        "P": "주변 적의 마법 저항력이 감소합니다.", // 두려움 — CD 요약본, 직접 다듬을 것
        "Q": "피들스틱이 대상 적에게 공포를 불어넣어 {v1}초 동안 <status>도망</status>치게 합니다.", // 공포
        "W": "피들스틱이 {v1}초 동안 정신을 집중해 적의 생명력을 흡수합니다. 대상에게 매초 <magicdamage>{v2}의 마법 피해</magicdamage>를 입히고 <healing>피해량의 {v3}%만큼 체력</healing>을 회복합니다.", // 흡수
        "E": "한 줄기의 바람이 지정한 적을 타격하고 주변의 적 유닛에게 최대 5회 튕깁니다. 각 타격은 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 <status>침묵</status>을 적용합니다.", // 어둠의 바람
        "R": "피들스틱이 {v1}초 동안 정신을 집중해 대상 지역으로 순간 이동한 뒤 살인 까마귀 떼를 불러내어 {v2}초 동안 <magicdamage>{v3}의 마법 피해</magicdamage>를 입힙니다.", // 까마귀 폭풍
    },
    "Fiora": { // 피오라
        "P": "피오라가 챔피언의 <keywordMajor>급소</keywordMajor> 하나를 드러냅니다. <keywordMajor>급소</keywordMajor>를 가격하면 <healing>체력을 회복</healing>하고 <speed>이동 속도</speed>가 상승합니다.", // 치명적인 검무 — CD 요약본, 직접 다듬을 것
        "Q": "피오라가 한 방향으로 돌진하며 가장 가까운 적이나 와드, 구조물을 공격해 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다. 이 공격은 <keywordmajor>급소</keywordmajor>와 처치 범위 안의 적을 우선 가격합니다.<br><br>피오라가 적을 공격하면 이 스킬의 재사용 대기시간이 {v2}% 감소합니다.", // 찌르기
        "W": "피오라가 {v1}초 동안 받는 모든 공격과 이동 불가 효과, 해로운 효과를 막아낸 다음 검을 찌릅니다. 검은 처음 적중한 챔피언에게 <magicdamage>{v2}의 마법 피해</magicdamage>를 입히고, {v3}초 동안 <speed>이동 속도</speed>를 {v4}%, <attackspeed>공격 속도를 {v5}%</attackspeed> <status>둔화</status>시킵니다. 피오라가 <status>이동 불가</status> 효과를 막아낼 경우, 찔린 적은 <status>둔화</status>하는 대신 <status>기절</status>합니다.", // 응수
        "E": "피오라는 다음 두 번의 기본 공격에 대해 <attackspeed>공격 속도가 {v1}%</attackspeed> 상승합니다. 첫 번째 기본 공격은 {v2}초 동안 {v3}% <status>둔화</status>시킵니다. 두 번째 기본 공격은 100% 치명타가 되어 <physicaldamage>{v4}%의 피해</physicaldamage>를 입힙니다.", // 대가의 검술
        "R": "<passive>기본 지속 효과:</passive> <spellname>치명적인 검무</spellname> <speed>이동 속도</speed> 추가 효과가 {v1}%로 상승합니다.<br><br><active>사용 시:</active> 피오라가 챔피언의 <keywordmajor>급소</keywordmajor> 네 군데를 다 드러내 <truedamage>최대 체력의 @spell.FioraPassive:RDamageTotal@에 해당하는 고정 피해</truedamage>를 최대로 입히고 대상 근처에서 <spellname>치명적인 검무</spellname>의 <speed>이동 속도</speed> 상승 효과를 얻습니다.<br><br>피오라가 {v2}초 내에 <keywordmajor>급소</keywordmajor> 네 군데를 모두 가격하거나 한 번이라도 급소를 공격한 뒤 대상이 사망할 경우, 주변 아군 챔피언은 {v3}초 동안 <healing>초당 체력을 {v4}</healing>씩 회복합니다.", // 대결투
    },
    "Fizz": { // 피즈
        "P": "피즈는 유닛을 통과할 수 있으며 모든 공격으로부터 받는 피해가 고정된 수치만큼 감소합니다.", // 영리한 싸움꾼 — CD 요약본, 직접 다듬을 것
        "Q": "피즈가 적을 관통하며 돌진해 <physicaldamage>{v1}의 물리 피해</physicaldamage>에 <magicdamage>{v2}의 마법 피해</magicdamage>를 추가로 입힙니다.", // 성게 찌르기
        "W": "<passive>기본 지속 효과</passive>: 피즈가 적에게 기본 공격을 가하면 출혈을 일으켜 {v1}초 동안 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다. <br><br><active>사용 시</active>: 피즈의 다음 기본 공격이 <magicdamage>{v3}의 마법 피해</magicdamage>를 추가로 입힙니다. 이 공격으로 대상을 처치하면 피즈가 <scalemana>{v4}의 마나</scalemana>를 돌려받고 이 스킬의 재사용 대기시간이 {v5}초로 감소합니다. 대상을 처치하지 못하면 피즈의 기본 공격이 {v6}초 동안 <magicdamage>{v7}의 마법 피해</magicdamage>를 추가로 입힙니다.", // 심해석 삼지창
        "E": "피즈가 삼지창 위에 서고 0.75초 동안 대상으로 지정할 수 없는 상태가 됩니다. 이후 근처 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 {v3}% <status>둔화</status>시킵니다. <br><br>피즈가 대상으로 지정할 수 없는 상태에서 이 스킬을 <recast>재사용</recast>하면 다시 돌진하면서 효과가 일찍 끝나며 보다 작은 지역에 피해를 입히고 <status>둔화</status> 효과를 적용하지 않습니다.", // 장난치기 / 재간둥이
        "R": "피즈가 물고기를 풀어 처음으로 부딪힌 챔피언에게 붙게 합니다. 대상 챔피언은 <keywordstealth>절대 시야</keywordstealth>의 영향을 받으며 물고기가 대상에게 붙기 전 이동한 거리에 비례해 40%~80% <status>둔화</status>됩니다. <br><br>{v1}초 후 상어가 튀어나와 물고기가 붙은 대상을 1초 동안 <status>공중으로 띄워 올리고</status> 다른 대상을 모두 <status>밀어내며</status> 물고기가 대상에게 붙기 전 이동한 거리에 비례해 <magicdamage>{v2}~{v3}의 마법 피해</magicdamage>를 입힙니다.", // 미끼 뿌리기
    },
    "Heimerdinger": { // 하이머딩거
        "P": "아군 포탑이나 하이머딩거가 설치한 포탑 주변에서 이동 속도가 증가합니다.", // 마법공학 전문가 — CD 요약본, 직접 다듬을 것
        "Q": "하이머딩거가 근처 적을 공격하는 <keywordmajor>포탑</keywordmajor>을 세웁니다. <keywordmajor>포탑</keywordmajor>은 한 번에 {v1}개까지 세울 수 있으며 천천히 충전됩니다. 최대로 충전되면 더 강력한 공격을 가합니다.<br><br>하이머딩거가 너무 멀리 떨어지면 <keywordmajor>포탑</keywordmajor>은 8초 후 작동을 멈춥니다.<br><br>이 스킬은 {v2}회까지 충전됩니다.", // H-28 G 진화형 포탑
        "W": "하이머딩거가 {v1}개의 로켓을 발사하여 처음 적중한 적에게 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다. 여러 발을 맞게 되면 받는 피해가 감소합니다.<br><br>(최대 피해량: <magicdamage>{v3}의 마법 피해</magicdamage>)<br><br>챔피언에게 적중하는 로켓 하나당 근처 <keywordmajor>포탑</keywordmajor>이 20% 충전됩니다.", // 마법공학 초소형 로켓
        "E": "하이머딩거가 수류탄을 던져 일정 지역에 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 {v3}% <status>둔화</status>시킵니다. 중앙에 있는 적들은 {v4}초 동안 <status>기절</status>합니다.<br><br>적 챔피언을 맞히면 근처의 <keywordmajor>포탑</keywordmajor>이 최대로 충전됩니다.", // CH-2 전자폭풍 수류탄
        "R": "하이머딩거가 다음에 사용하는 궁극기 이외의 스킬을 강화합니다.<br><br><spellname>H-28Q 최첨단 포탑:</spellname> 하이머딩거의 최대 포탑 개수에 포함되지 않는 강화된 <keywordmajor>포탑</keywordmajor>을 8초 동안 배치해 기본 사격마다 <magicdamage>{v1}의 마법 피해</magicdamage>, 충전 사격마다 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다. 포탑 공격은 대상 지역에 피해를 입히며, 2초 동안 25% <status>둔화</status>시킵니다. 포탑은 군중 제어기에 면역이 됩니다.<br><br><spellname>마법공학 로켓 연사:</spellname> 로켓이 4회 연속 발사되며 각각 <magicdamage>{v3}의 마법 피해</magicdamage>를 입힙니다. 챔피언과 정글 몬스터가 추가 로켓으로 받는 피해량이 감소하고 미니언이 추가 로켓으로 받는 피해량은 증가합니다. 최대 피해량: <magicdamage>{v4}의 마법 피해</magicdamage> <br><br><spellname>CH-3X 전격 수류탄:</spellname> 세 번 튕기며 전류를 방출하는 반동 수류탄을 던져 <magicdamage>{v5}의 마법 피해</magicdamage>를 입힙니다. <status>기절</status>과 <status>둔화</status> 적용 범위가 모두 커집니다.<br><br><recast>재사용 시:</recast> 이 스킬을 취소합니다.", // 업그레이드!!!
    },
    "Jade_Heimerdinger": { // 하이머딩거
        "P": "하이머딩거 주변의 아군 포탑과 챔피언들의 체력 재생 효과가 상승합니다.", // 마법기계공학 수리 로봇 — CD 요약본, 직접 다듬을 것
        "Q": "하이머딩거가 연사형 포탑을 세웁니다. 포탑은 공격당 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 이 스킬은 {v2}회 충전됩니다. ({v3}초마다 충전)<br><br>이 스킬의 레벨이 오를 때마다 추가로 강화됩니다.<br><attention>2레벨:</attention> 포탑 공격 시 대상의 방어력과 마법 저항력이 1 감소합니다. (최대 50)<br><attention>3레벨:</attention> 최대 포탑 개수가 2개로 증가합니다.<br><attention>4레벨:</attention> 포탑이 추가로 <scalehealth>125의 체력</scalehealth>을 얻습니다.<br><attention>5레벨:</attention> 포탑 공격이 광역 피해를 입힙니다.", // H-28G 진화형 포탑
        "W": "하이머딩거가 가장 가까운 대상을 추적하는 3발의 초소형 로켓을 발사합니다. (1명당 한 발) 로켓은 각각 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다.", // 마법공학 초소형 로켓
        "E": "하이머딩거가 수류탄을 던져 적 유닛에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 <status>실명</status>시킵니다. 직격당한 적은 1.5초 동안 <status>기절</status>합니다.", // CH-1 충격 수류탄
        "R": "<passive>기본 지속 효과: </passive>재사용 대기시간이 {v1}% 감소합니다.<br><br><active>사용 시: </active>지속시간 동안 모든 스킬과 포탑을 강화합니다.<br><br><spellname>진화형 포탑:</spellname> 모든 포탑의 체력이 100% <healing>회복</healing>되고, 공격당 <status>{v2}%의 둔화</status>를 적용합니다.<br><spellname>마법공학 초소형 로켓:</spellname> 3발이 아닌 5발의 로켓을 발사합니다.<br><spellname>CH-1 충격 수류탄:</spellname> 날아가는 속도가 33% 증가합니다.", // 업그레이드!!!
    },
    "Hecarim": { // 헤카림
        "P": "헤카림의 공격력이 추가 이동 속도의 일정 비율만큼 증가합니다.", // 출정 — CD 요약본, 직접 다듬을 것
        "Q": "헤카림이 주위 적들을 베어 <physicaldamage>{v1}의 물리 피해</physicaldamage>를 입힙니다. 이 스킬이 적중하면 효과가 중첩되어 {v2}초 동안 피해량이 {v3}% 늘어나고 이 스킬의 재사용 대기시간이 {v4}초 감소합니다. 최대 {v5}회 중첩됩니다.<br>", // 회오리 베기
        "W": "헤카림이 {v1}초에 걸쳐 주변 적에게 <magicdamage>{v2}의 마법 피해</magicdamage>를 입힙니다. <br><br>헤카림이 <passive>{v3}</passive>만큼 <scalearmor>방어력</scalearmor>과 <scalemr>마법 저항력</scalemr>을 얻고, 주변 적들이 헤카림에게 받은 <healing>피해량의 {v4}%</healing>와 헤카림의 아군에게 받은 <healing>피해량의 {v5}%</healing>만큼 체력을 회복합니다.", // 공포의 망령
        "E": "헤카림이 유체화 상태가 되어 <speed>이동 속도가 {v1}%</speed> 증가합니다. 이동 속도는 {v2}초에 걸쳐 <speed>{v3}%</speed>까지 증가합니다. 다음 기본 공격은 <status>뒤로 밀어내며</status> <physicaldamage>{v4}</physicaldamage>~<physicaldamage>{v5}의 물리 피해</physicaldamage>를 입힙니다. <status>뒤로 밀려나는</status> 거리와 피해량은 이 스킬을 사용하는 중 이동한 거리에 비례합니다.", // 파멸의 돌격
        "R": "헤카림이 유령 기수들을 소환하며 전방으로 돌격하여 <magicdamage>{v1}의 마법 피해</magicdamage>를 입힙니다. 돌격이 끝나면 충격파를 발산하여 돌격한 거리에 비례해 최소 {v2}초에서 최대 {v3}초 동안 <status>공포</status>에 질리게 합니다.", // 그림자의 맹습
    },
    "Hwei": { // 흐웨이
        "P": "흐웨이가 스킬로 적 챔피언에게 피해를 입히면 서명으로 마무리할 준비를 합니다.<br><br>다시 한번 적에게 스킬로 피해를 입히면 서명이 완성되어 발밑에 남습니다. 발밑에 남겨진 서명은 잠시 후에 폭발해 사거리 내 모든 적에게 마법 피해를 입힙니다.", // 몽상가의 서명 — CD 요약본, 직접 다듬을 것
        "Q": "흐웨이가 참사의 환상을 그려내 적에게 막대한 피해를 입힙니다.<br><br><spellname>파멸의 화염</spellname><br>흐웨이가 빠르게 날아가는 불덩이를 날립니다. 불덩이는 처음 적과 적중하면 폭발해 <magicdamage>{v1}+최대 체력의 {v2}%에 해당하는 마법 피해</magicdamage>를 입힙니다.<br><br><spellname>절단의 번개</spellname><br>흐웨이가 멀리 떨어진 대상 지점을 지정하고 잠시 후 벼락을 떨어뜨려 <magicdamage>{v3}의 마법 피해</magicdamage>를 입힙니다. 대상이 고립 또는 <status>이동 불가</status> 상태일 경우 대상이 잃은 체력에 비례해 최대 <magicdamage>{v4}의 마법 피해</magicdamage>를 입힙니다.<br><br><spellname>녹아내린 균열</spellname><br>흐웨이가 뻗어나가는 용암 폭발을 일으킵니다. 일정 지역 내 적에게 <magicdamage>{v5}의 마법 피해</magicdamage>를 입히고, 용암 웅덩이를 남겨 @spell.HweiQE:Duration@초 동안 적에게 <magicdamage>매초 {v6}의 마법 피해</magicdamage>를 입히고 @spell.HweiQE:SlowPercent@% <status>둔화</status>시킵니다.", // 주제: 참사
        "W": "흐웨이가 평온의 환상을 그려내 자신과 아군 챔피언에게 이로운 효과를 부여합니다.<br><br><spellname>쏜살같은 물살</spellname><br>흐웨이가 일직선으로 빠르게 흐르는 물을 흘려보내 아군의 <speed>이동 속도를 {v1}</speed> 상승시킵니다.<br><br><spellname>반사의 웅덩이</spellname><br>흐웨이가 보호의 웅덩이를 형성해 영역 안의 아군 챔피언에게 일정 시간에 걸쳐 <shield>{v2}의 피해를 흡수하는 보호막</shield>을 씌웁니다. 단, 아군에게는 보호막 효과가 @spell.HweiWW:ToolTipAllyMod*100@% 감소합니다.<br><br><spellname>요동치는 빛</spellname><br>흐웨이가 소용돌이치는 빛 3개를 만들어 냅니다. 빛은 다음 3회의 스킬 또는 기본 공격 시 <magicdamage>{v3}의 추가 마법 피해</magicdamage>를 입히며, 각각 <scalemana>{v4}의 마나</scalemana>를 회복합니다.", // 주제: 평온
        "E": "흐웨이가 적을 통제하는 고통의 환상을 그려냅니다.<br><br><spellname>암울한 형상</spellname><br>흐웨이가 무시무시한 얼굴을 날려 처음 적중한 적에게 <magicdamage>{v1}의 마법 피해</magicdamage>를 입히고 {v2}초 동안 <status>도망</status>치게 합니다.<br><br><spellname>심연의 응시</spellname><br>흐웨이가 지정한 위치에 남아 시야를 확보하는 눈을 만들어 냅니다. 눈은 사거리 내로 처음 들어오는 적 챔피언에게 유도 발사체를 날려 처음 적중한 대상을 {v3}초 동안 <status>속박</status>하고 <magicdamage>{v4}의 마법 피해</magicdamage>를 입힙니다.<br><br><spellname>파괴의 아귀</spellname><br>흐웨이가 지정한 위치에 파괴의 아귀를 그려내 적을 중앙으로 <status>끌어당깁니다</status>. 파괴의 아귀는 적중한 적에게 <magicdamage>{v5}의 마법 피해</magicdamage>를 입히고 {v6}% <status>둔화</status>시킵니다. 둔화 효과는 1.25초에 걸쳐 사라집니다.", // 주제: 고통
        "R": "흐웨이가 순수한 절망의 환상을 날립니다. 환상은 적중당한 적 챔피언에게 {v1}초 동안 남습니다. 환상은 점점 커지면서 0.25초마다 적에게 {v2}%의 <status>둔화</status> 중첩을 적용하고 <magicdamage>매초 {v3}의 마법 피해</magicdamage>를 입힙니다.<br><br>지속시간이 끝나면 환상이 깨지며 <magicdamage>{v4}의 마법 피해</magicdamage>를 입힙니다.", // 절망의 소용돌이
    },
};
