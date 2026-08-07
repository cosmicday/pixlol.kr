// ==========================================
// ★ 꺾은선 그래프 툴팁 생성 헬퍼 함수
// 사용법: drawGraph("각주번호", "선색상", [1렙수치, 2렙수치, ..., 18렙수치])
// ==========================================
const drawGraph = (id, color, dataArr) => {
    let max = Math.max(...dataArr);
    let width = 210, height = 90, padX = 15, padY = 20;

    let points = "";
    let elements = "";

    dataArr.forEach((val, index) => {
        let x = padX + (index / (dataArr.length - 1)) * (width - padX * 2);
        let y = (height - padY) - (val / max) * (height - padY * 2);
        points += `${x},${y} `;

        // 텍스트가 그래프 위로 뚫고 나가지 않도록 위치 자동 조정
        let textY = y - 10;
        if (textY < 12) textY = y + 18;

        // 수정됨: 개별 점(circle)과 수치(text)를 하나의 그룹(g)으로 묶음
        elements += `
        <g class="graph-point">
            <circle cx="${x}" cy="${y}" r="3.5" fill="${color}" />
            <text class="point-label" x="${x}" y="${textY}" text-anchor="middle" fill="${color}">Lv.${index + 1}: ${val}</text>
        </g>`;
    });

    return `<span class="custom-footnote">[${id}]
        <span class="custom-footnote-content">
            <div style="font-size: 11px; margin-bottom: 8px; color: #aaa;">레벨별 성장 수치 (Lv.1 ~ 18)</div>
            <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="overflow: visible;">
                <polyline points="${points}" fill="none" stroke="${color}" stroke-width="2" />
                ${elements}
                <text x="${padX}" y="${height - 2}" fill="#888" font-size="10" text-anchor="middle">1</text>
                <text x="${width - padX}" y="${height - 2}" fill="#888" font-size="10" text-anchor="middle">18</text>
                <text x="5" y="10" fill="${color}" font-size="11" font-weight="bold">${max}</text>
            </svg>
        </span>
    </span>`;
};

// ==========================================
// 🎨 [롤 스탯/데미지 컬러 코드표]
// 복사해서 <span style='color:색상코드'> 형태로 사용하세요.
// 
// 마법 피해 (AP)    : #55bced (하늘색)
// 물리 피해 (AD)    : #ff9900 (주황색)
// 고정 피해         : #ffffff (흰색) 또는 #f3f3f3
// 체력 / 회복       : #2ecc71 (초록색)
// 방어력            : #f1c40f (노란색)
// 마법 저항력       : #e844cc (분홍/자주색)
// 마나 / 기력       : #3498db (파란색)
// 이동 속도         : #f39c12 (짙은 노란색)
// ==========================================

const customValues = {
    "Garen": { // 가렌
        "P": {
            "v1": "1.5 ~ 10.1% (레벨에 따라)" +
                drawGraph("1", "#2ecc71", [
                    1.5, 1.7, 1.9, 2.1, 2.3, 2.5, // 1~6렙
                    3.3, 4.1, 4.9, 5.7, 6.5, 7.3, 8.1, // 7~13렙
                    8.5, 8.9, 9.3, 9.7, 10.1 // 14~18렙
                ]),
            "cooldown": "5",
            "cost": "-"
        },
        "Q": {
            "v1": "1.4/1.95/2.5/3.05/3.6",
            "v2": "30/60/90/120/150 + 총 공격력의 150%",
            "cooldown": "8",
            "cost": "-"
        },
        "W": {
            "v1": "25/29/33/37/41%",
            "v2": "65/85/105/125/145 + 추가 체력의 18%",
            "cooldown": "22 / 19.5 / 17 / 14.5 / 12",
            "cost": "-"
        },
        "E": {
            "v1": "4/7/10/13/16 + 총 공격력의 40/43/46/49/52%",
            "v2": "130%",
            "cooldown": "9 / 8.25 / 7.5 / 6.75 / 6",
            "cost": "-",
            "stats": {
                "범위": 325
            },
            "img2": "/icons/garen_e.png"
        },
        "R": {
            "v1": "150/250/350 + 잃은 체력의 25/30/35%",
            "cooldown": "120 / 100 / 80",
            "cost": "-",
            "stats": {
                "범위": 325,
                "시전시간": 0.435
            }
        }
    }, // 가렌 (직접 작성)
    "Jade_Garen": { // 가렌
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // MovementSpeedDuration
            "v2": "?", // MovementSpeedAmount*100
            "v3": "?", // TotalDamage
            "v4": "?", // SilenceDuration
            "cooldown": "8",
            "cost": "-",
            "stats": "사거리 300"
        },
        "W": {
            "v1": "?", // BuffDuration
            "v2": "?", // DamageReduction*100
            "cooldown": "24 / 23 / 22 / 21 / 20",
            "cost": "-"
        },
        "E": {
            "v1": "?", // Duration
            "v2": "?", // TotalDamage
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "-",
            "stats": "사거리 325"
        },
        "R": {
            "v1": "?", // BaseDamage
            "v2": "?", // ExecuteDamage
            "cooldown": "160 / 120 / 80",
            "cost": "-",
            "stats": "사거리 400"
        },
    },
    "Galio": { // 갈리오
        "P": {
            "v1": "15 ~ 115 (레벨에 따라)" +
            drawGraph("1", "#2ecc71", [
                    15.00, 20.88, 26.76, 32.65, 38.53, 44.41,
                    50.29, 56.18, 62.06, 67.94, 73.82, 79.71,
                    85.59, 91.47, 97.35, 103.24, 109.12, 115.00
                ]),
            "v2": " + 총 공격력의 100% + 주문력의 40% + 추가 마법 저항력의 60%",
            "cooldown": "5",
            "cost": "-",
            "stats": {
                "사거리": ""
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "사거리": ""
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "사거리": ""
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "사거리": ""
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "사거리": ""
            }
        }
    }, // 갈리오 (직접 작성)
    "Gangplank": { // 갱플랭크
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // GameModeInteger
            "cooldown": "4.5",
            "cost": "50 / 45 / 40 / 35 / 30",
            "stats": "사거리 625"
        },
        "W": {
            "v1": "?", // BaseHealth
            "v2": "?", // PercentHeal
            "cooldown": "22 / 20 / 18 / 16 / 14",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": "사거리 400"
        },
        "E": {
            "v1": "?", // BarrelDuration
            "v2": "?", // DebuffDuration
            "v3": "?", // FinalSlowAmount
            "v4": "?", // BarrelArmorPenetration
            "v5": "?", // BonusDamageToChampions
            "v6": "?", // BarrelDecayTime
            "cooldown": "0",
            "cost": "-",
            "stats": "사거리 1000"
        },
        "R": {
            "v1": "?", // ZoneDuration
            "v2": "?", // TotalWavesTooltip
            "v3": "?", // SlowDuration
            "v4": "?", // SlowPercent
            "v5": "?", // OneWaveDamage
            "v6": "?", // TotalDamageTooltip
            "v7": "?", // DeathsDaughterDamage
            "v8": "?", // DeathsDaughterSlowDuration
            "v9": "?", // DeathsDaughterSlow
            "v10": "?", // RaiseMoraleHasteDuration
            "v11": "?", // RaiseMoraleHaste
            "cooldown": "160 / 140 / 120",
            "cost": "100",
            "stats": "사거리 30000"
        },
    },
    "Jade_Gangplank": { // 갱플랭크
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // ShotDamage
            "v2": "?", // GoldGain
            "v3": "?", // f2
            "cooldown": "5",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 625"
        },
        "W": {
            "v1": "?", // TotalHeal
            "cooldown": "22 / 21 / 20 / 19 / 18",
            "cost": "65",
            "stats": "사거리 20"
        },
        "E": {
            "v1": "?", // PassiveAD
            "v2": "?", // PassiveMS*100
            "v3": "?", // Duration
            "v4": "?", // ActiveAD
            "v5": "?", // ActiveMS*100
            "v6": "?", // AllyActiveAD
            "v7": "?", // AllyActiveMS*100
            "cooldown": "20",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 1200"
        },
        "R": {
            "v1": "?", // Duration
            "v2": "?", // Slow*100
            "v3": "?", // TotalDamage
            "cooldown": "120 / 115 / 110",
            "cost": "100",
            "stats": "사거리 20000"
        },
    },
    "Gragas": { // 그라가스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // BarrelMaxDuration
            "v2": "?", // MinDamage
            "v3": "?", // MaxDamage
            "v4": "?", // SlowDuration
            "v5": "?", // SlowPercent
            "v6": "?", // SlowPercent*1.5
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "80",
            "stats": "사거리 850"
        },
        "W": {
            "v1": "?", // DefenseDuration
            "v2": "?", // DamageReduction
            "v3": "?", // TotalDamage
            "v4": "?", // MaxHPPercentDamage
            "cooldown": "5",
            "cost": "30",
            "stats": "사거리 20"
        },
        "E": {
            "v1": "?", // StunDuration
            "v2": "?", // TotalDamage
            "v3": "?", // CooldownRefund*100
            "cooldown": "14 / 13.5 / 13 / 12.5 / 12",
            "cost": "50",
            "stats": "사거리 600"
        },
        "R": {
            "v1": "?", // DamageDone
            "cooldown": "100 / 85 / 70",
            "cost": "100",
            "stats": "사거리 1000"
        },
    },
    "Jade_Gragas": { // 그라가스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // BarrelDuration
            "v2": "?", // TotalDamage
            "v3": "?", // DebuffDuration
            "v4": "?", // ASDebuff*-100
            "cooldown": "11.5 / 10.5 / 9.5 / 8.5 / 7.5",
            "cost": "80 / 90 / 100 / 110 / 120",
            "stats": "사거리 1100"
        },
        "W": {
            "v1": "?", // ManaRestored
            "v2": "?", // Duration
            "v3": "?", // DamageIncrease
            "v4": "?", // DamageReduction*100
            "cooldown": "25",
            "cost": "",
            "stats": "사거리 20"
        },
        "E": {
            "v1": "?", // SplitDamageCalc
            "v2": "?", // SlowDuration
            "v3": "?", // Slow*-100
            "cooldown": "7",
            "cost": "75",
            "stats": "사거리 600"
        },
        "R": {
            "v1": "?", // TotalDamage
            "cooldown": "100 / 90 / 80",
            "cost": "100 / 125 / 150",
            "stats": "사거리 1000"
        },
    },
    "Graves": { // 그레이브즈
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // TotalDetonationDamage
            "cooldown": "13 / 11.25 / 9.5 / 7.75 / 6",
            "cost": "80",
            "stats": "사거리 925"
        },
        "W": {
            "v1": "?", // Effect2Amount
            "v2": "?", // ImpactDamage
            "cooldown": "26 / 24 / 22 / 20 / 18",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": "사거리 950"
        },
        "E": {
            "v1": "?", // BuffDuration
            "v2": "?", // MaxStacks
            "v3": "?", // ArmorPerStack
            "v4": "?", // MRGrant
            "v5": "?", // CooldownPerHit
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "40",
            "stats": "사거리 425"
        },
        "R": {
            "v1": "?", // Damage
            "v2": "?", // FalloffDamage
            "cooldown": "100 / 80 / 60",
            "cost": "100",
            "stats": "사거리 1000"
        },
    },
    "Gwen": { // 그웬
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // BuffDuration
            "v2": "?", // MiniSwipeDamage
            "v3": "?", // FinalSwipeDamage
            "v4": "?", // TrueDamageConversion*100
            "v5": "?", // MinionMod*100
            "v6": "?", // ExecuteThreshold*100
            "v7": "?", // ExecuteBonus
            "cooldown": "6.5 / 5.75 / 5 / 4.25 / 3.5",
            "cost": "40",
            "stats": "사거리 450"
        },
        "W": {
            "v1": "?", // ZoneDuration
            "v2": "?", // TotalResists
            "cooldown": "22 / 21 / 20 / 19 / 18",
            "cost": "60"
        },
        "E": {
            "v1": "?", // BuffDuration
            "v2": "?", // BonusAttackSpeed
            "v3": "?", // OnHitDamage
            "v4": "?", // BonusAttackRange
            "v5": "?", // CDRefund*100
            "cooldown": "13 / 12.5 / 12 / 11.5 / 11",
            "cost": "35",
            "stats": "사거리 400"
        },
        "R": {
            "v1": "?", // TotalDamage
            "v2": "?", // DebuffDuration
            "v3": "?", // InitialSlow*-100
            "v4": "?", // LockoutTime
            "v5": "?", // TotalDamage3
            "v6": "?", // TotalDamage5
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": "사거리 1200"
        },
    },
    "Gnar": { // 나르
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "cooldown": "16 / 14.5 / 13 / 11.5 / 10",
            "cost": "-",
            "stats": "사거리 1100"
        },
        "W": {
            "cooldown": "7",
            "cost": "-"
        },
        "E": {
            "cooldown": "22 / 19.5 / 17 / 14.5 / 12",
            "cost": "-",
            "stats": "사거리 475"
        },
        "R": {
            "v1": "?", // Damage
            "v2": "?", // RCCDuration
            "v3": "?", // RSlowPercent
            "v4": "?", // WallDamage
            "cooldown": "90 / 60 / 30",
            "cost": "-",
            "stats": "사거리 590"
        },
    },
    "Nami": { // 나미
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // StunDuration
            "v2": "?", // TotalDamageTT
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "60",
            "stats": "사거리 875"
        },
        "W": {
            "v1": "?", // MaxTargets
            "v2": "?", // TotalHeal
            "v3": "?", // TotalDamage
            "v4": "?", // BounceScaling
            "cooldown": "10",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": "사거리 725"
        },
        "E": {
            "v1": "?", // BuffDuration
            "v2": "?", // HitCount
            "v3": "?", // SlowDuration
            "v4": "?", // TotalSlow
            "v5": "?", // TotalDamage
            "cooldown": "11",
            "cost": "55 / 60 / 65 / 70 / 75",
            "stats": "사거리 800"
        },
        "R": {
            "v1": "?", // SlowAmount
            "v2": "?", // TotalDamage
            "v3": "?", // MaxSlowDuration
            "cooldown": "120 / 110 / 100",
            "cost": "100",
            "stats": "사거리 2550"
        },
    },
    "Nasus": { // 나서스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // BasicStacks
            "v3": "?", // BigStacks
            "cooldown": "7.5 / 6.5 / 5.5 / 4.5 / 3.5",
            "cost": "20",
            "stats": "사거리 255"
        },
        "W": {
            "v1": "?", // SlowBase
            "v2": "?", // Duration
            "v3": "?", // MaxSlowTooltipOnly
            "v4": "?", // AttackSpeedSlowMult*100
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "80",
            "stats": "사거리 700"
        },
        "E": {
            "v1": "?", // InitialDamage
            "v2": "?", // ArmorShredPercent*-100
            "v3": "?", // Duration
            "v4": "?", // TotalDotDamage
            "cooldown": "12",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": "사거리 650"
        },
        "R": {
            "v1": "?", // BonusHealth
            "v2": "?", // InitialResistGain
            "v3": "?", // DamageCalc
            "v4": "?", // QCDR*100
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": "사거리 400"
        },
    },
    "Jade_Nasus": { // 나서스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // BasicStacks
            "v3": "?", // BigStacks
            "cooldown": "8 / 7 / 6 / 5 / 4",
            "cost": "20",
            "stats": "사거리 255"
        },
        "W": {
            "v1": "?", // Duration
            "v2": "?", // SlowBase
            "v3": "?", // AttackSpeedBaseTotal
            "v4": "?", // MaxSlowTooltipOnly
            "v5": "?", // AttackSpeedMaxTotal
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "80",
            "stats": "사거리 700"
        },
        "E": {
            "v1": "?", // InitialDamage
            "v2": "?", // Duration
            "v3": "?", // TotalArmorShred
            "v4": "?", // TickDotDamage
            "cooldown": "12",
            "cost": "70 / 85 / 100 / 115 / 130",
            "stats": "사거리 650"
        },
        "R": {
            "v1": "?", // BonusHealth
            "v2": "?", // AttackRangeIncrease
            "v3": "?", // DamageCalc
            "v4": "?", // MaxDamageCap
            "cooldown": "120",
            "cost": "100",
            "stats": "사거리 400"
        },
    },
    "Naafiri": { // 나피리
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "cooldown": "9 / 8.5 / 8 / 7.5 / 7",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": "사거리 900"
        },
        "W": {
            "v1": "?", // UntargetableDuration
            "v2": "?", // PackmatesToAdd
            "v3": "?", // Duration
            "v4": "?", // BonusAD
            "v5": "?", // MoveSpeedAmount*100
            "cooldown": "26 / 24 / 22 / 20 / 18",
            "cost": "60",
            "stats": "사거리 400"
        },
        "E": {
            "v1": "?", // TotalDamageFirstSlash
            "v2": "?", // TotalDamageSecondSlash
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "40",
            "stats": "사거리 450"
        },
        "R": {
            "v1": "?", // TotalDamage
            "v2": "?", // PackmateDamage
            "v3": "?", // TakedownWindow
            "v4": "?", // ShieldDuration
            "v5": "?", // ShieldTotal
            "cooldown": "110 / 95 / 80",
            "cost": "100",
            "stats": "사거리 900"
        },
    },
    "Nautilus": { // 노틸러스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // QDamageCalc
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "60",
            "stats": "사거리 1150"
        },
        "W": {
            "v1": "?", // ShieldDuration
            "v2": "?", // ShieldCalc
            "v3": "?", // DotDamageCalc
            "cooldown": "12",
            "cost": "60",
            "stats": "사거리 350"
        },
        "E": {
            "v1": "?", // DamageCalc
            "v2": "?", // SlowDuration
            "v3": "?", // SlowPercent*100
            "cooldown": "7 / 6.5 / 6 / 5.5 / 5",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": "사거리 600"
        },
        "R": {
            "v1": "?", // PrimaryTargetDamage
            "v2": "?", // StunDuration
            "v3": "?", // SecondaryTargetDamage
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": "사거리 825"
        },
    },
    "Nocturne": { // 녹턴
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // TrailDuration
            "v3": "?", // MoveSpeed
            "v4": "?", // BonusTrailAD
            "cooldown": "8",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": "사거리 1125"
        },
        "W": {
            "v1": "?", // ActiveAS
            "v2": "?", // DoubleASDuration
            "v3": "?", // ActiveAS*2
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "50",
            "stats": "사거리 20"
        },
        "E": {
            "v1": "?", // TooltipFearMS*100
            "v2": "?", // LeashDuration
            "v3": "?", // TotalDamage
            "v4": "?", // CCDuration
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": "사거리 425"
        },
        "R": {
            "v1": "?", // ParanoiaDuration
            "v2": "?", // Damage
            "cooldown": "140 / 115 / 90",
            "cost": "100",
            "stats": "사거리 2500 / 3250 / 4000"
        },
    },
    "Nunu": { // 누누와 윌럼프
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // MonsterMinionDamage
            "v2": "?", // MonsterHealing
            "v3": "?", // TotalChampionDamage
            "v4": "?", // ChampionHealing
            "v5": "?", // LowHealthThreshhold*100
            "v6": "?", // LowHealthHealingScalar*100
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "60",
            "stats": "사거리 125"
        },
        "W": {
            "v1": "?", // NoImpactSnowballDamage
            "v2": "?", // MaximumSnowballDamage
            "v3": "?", // BaseKnockupDuration
            "v4": "?", // MaximumStunDuration
            "cooldown": "14",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 7500"
        },
        "E": {
            "v1": "?", // TotalSnowballDamage
            "v2": "?", // SlowDuration
            "v3": "?", // SlowAmount*-100
            "v4": "?", // TotalSpellDuration
            "v5": "?", // RootDuration
            "v6": "?", // TotalRootDamage
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 625"
        },
        "R": {
            "v1": "?", // ChannelDuration
            "v2": "?", // SlowStartAmount*-100
            "v3": "?", // MaxSlowAmount*-100
            "v4": "?", // TotalShieldAmount
            "v5": "?", // ShieldDecayDuration
            "v6": "?", // MaximumDamage
            "cooldown": "110 / 100 / 90",
            "cost": "100",
            "stats": "사거리 650"
        },
    },
    "Jade_Nunu": { // 누누와 윌럼프
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // BaseDamage
            "v2": "?", // TotalHealing
            "v3": "?", // ConsumeDuration
            "cooldown": "17 / 15 / 13 / 11 / 9",
            "cost": "60",
            "stats": "사거리 125"
        },
        "W": {
            "v1": "?", // MoveSpeed*100
            "v2": "?", // AttackSpeed*100
            "cooldown": "15",
            "cost": "50",
            "stats": "사거리 700"
        },
        "E": {
            "v1": "?", // TotalDamage
            "v2": "?", // SlowAmount*-100
            "cooldown": "6",
            "cost": "75 / 85 / 95 / 105 / 115",
            "stats": "사거리 550"
        },
        "R": {
            "v1": "?", // TotalDamage
            "cooldown": "110 / 100 / 90",
            "cost": "100",
            "stats": "사거리 650"
        },
    },
    "Nidalee": { // 니달리
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // HumanMinimumDamage
            "v2": "?", // HumanMaximumDamage
            "cooldown": "6",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 1500"
        },
        "W": {
            "v1": "?", // Effect3Amount
            "v2": "?", // DamagePerSecond
            "v3": "?", // MaxTraps
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "30 / 35 / 40 / 45 / 50",
            "stats": "사거리 900"
        },
        "E": {
            "v1": "?", // TotalHealing
            "v2": "?", // MaxHealing
            "v3": "?", // ASDuration
            "v4": "?", // BonusAS*100
            "cooldown": "12",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 900"
        },
        "R": {
            "cooldown": "3",
            "cost": "-",
            "stats": "사거리 20"
        },
    },
    "Jade_Nidalee": { // 니달리
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // StartingDamage
            "v2": "?", // MaxDamage
            "cooldown": "6",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": "사거리 1500"
        },
        "W": {
            "v1": "?", // DamagePerSecond
            "v2": "?", // ResistDecreases*100
            "cooldown": "18",
            "cost": "60 / 75 / 90 / 105 / 120",
            "stats": "사거리 900"
        },
        "E": {
            "v1": "?", // TotalHealing
            "v2": "?", // BonusAS*100
            "cooldown": "10",
            "cost": "60 / 80 / 100 / 120 / 140",
            "stats": "사거리 900"
        },
        "R": {
            "cooldown": "4",
            "cost": "",
            "stats": "사거리 20"
        },
    },
    "Neeko": { // 니코
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // ExplosionDamage
            "v2": "?", // SecondDamage
            "cooldown": "9 / 8.5 / 8 / 7.5 / 7",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": "사거리 800"
        },
        "W": {
            "v1": "?", // PassiveBonusDamageCalc
            "v2": "?", // PassiveHasteDuration
            "v3": "?", // PassiveHaste
            "v4": "?", // StealthDuration
            "v5": "?", // CloneDuration
            "v6": "?", // HasteDuration
            "v7": "?", // Haste
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "-",
            "stats": "사거리 900"
        },
        "E": {
            "v1": "?", // BaseDamage
            "v2": "?", // MinRootDuration
            "v3": "?", // MaxRootDuration
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": "사거리 1000"
        },
        "R": {
            "v1": "?", // DelayUntilExplosion
            "v2": "?", // TotalDamage
            "v3": "?", // StunDuration
            "v4": "?", // DelayBeforePassiveRemoval
            "cooldown": "120 / 105 / 90",
            "cost": "100",
            "stats": "사거리 600"
        },
    },
    "Nilah": { // 닐라
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // CritArmorPen
            "v2": "?", // CritLifesteal
            "v3": "?", // ShieldDuration
            "v4": "?", // DamageCalc
            "v5": "?", // BonusAttackSpeedCalc
            "v6": "?", // BuffDuration
            "cooldown": "4",
            "cost": "30",
            "stats": "사거리 600"
        },
        "W": {
            "v1": "?", // BaseDuration
            "v2": "?", // MoveSpeedPercent*100
            "v3": "?", // MagicDamageReduction*100
            "v4": "?", // ShareBaseDuration
            "cooldown": "26 / 25 / 24 / 23 / 22",
            "cost": "60 / 45 / 30 / 15 / 0",
            "stats": "사거리 150"
        },
        "E": {
            "v1": "?", // DashDamage
            "cooldown": "0.5",
            "cost": "40",
            "stats": "사거리 550"
        },
        "R": {
            "v1": "?", // DamagePerTickCalcTooltip
            "v2": "?", // DamageCalc
            "v3": "?", // ChampHealingPercent
            "v4": "?", // Duration
            "cooldown": "110 / 95 / 80",
            "cost": "100",
            "stats": "사거리 400"
        },
    },
    "Darius": { // 다리우스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // BladeDamage
            "v2": "?", // HandleDamage
            "v3": "?", // MissingHealthHeal
            "v4": "?", // MissingHealPercent
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "25 / 30 / 35 / 40 / 45",
            "stats": "사거리 1"
        },
        "W": {
            "v1": "?", // EmpoweredAttackDamage
            "v2": "?", // SlowDuration
            "v3": "?", // SlowPercent
            "v4": "?", // PercentCDRefund
            "cooldown": "5",
            "cost": "40",
            "stats": "사거리 300"
        },
        "E": {
            "v1": "?", // PassivePercentArmorPen
            "v2": "?", // SlowDuration
            "v3": "?", // SlowPercent
            "cooldown": "26 / 23.5 / 21 / 18.5 / 16",
            "cost": "70 / 60 / 50 / 40 / 30",
            "stats": "사거리 535"
        },
        "R": {
            "v1": "?", // Damage
            "v2": "?", // RDamagePercentPerHemoStack*100
            "v3": "?", // MaximumDamage
            "v4": "?", // RRecastDuration
            "cooldown": "120 / 100 / 80",
            "cost": "100 / 100 / 0",
            "stats": "사거리 460"
        },
    },
    "Diana": { // 다이애나
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // MoonlightDuration
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "50",
            "stats": "사거리 900"
        },
        "W": {
            "v1": "?", // ShieldDuration
            "v2": "?", // TotalDamage
            "v3": "?", // TotalMaxDamage
            "v4": "?", // ShieldValue
            "cooldown": "15 / 13.5 / 12 / 10.5 / 9",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": "사거리 800"
        },
        "E": {
            "v1": "?", // TotalDamage
            "cooldown": "22 / 20 / 18 / 16 / 14",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": "사거리 825"
        },
        "R": {
            "v1": "?", // SlowDuration
            "v2": "?", // SlowTooltip
            "v3": "?", // RExplosionDamage
            "v4": "?", // RMultihitAmplification
            "v5": "?", // MaxDamage
            "cooldown": "100 / 90 / 80",
            "cost": "100",
            "stats": "사거리 475"
        },
    },
    "Draven": { // 드레이븐
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "45",
            "stats": "사거리 300"
        },
        "W": {
            "v1": "?", // Temp_MSMod
            "v2": "?", // Temp_MSDuration
            "v3": "?", // Temp_ASDuration
            "v4": "?", // Temp_AS
            "cooldown": "12",
            "cost": "40 / 35 / 30 / 25 / 20",
            "stats": "사거리 1000"
        },
        "E": {
            "v1": "?", // TotalDamage
            "v2": "?", // SlowDuration
            "v3": "?", // SlowAmount
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "70",
            "stats": "사거리 1050"
        },
        "R": {
            "v1": "?", // RCalculatedDamage
            "v2": "?", // RDamageReductionPerHit*100
            "v3": "?", // RMinDamagePercent
            "v4": "?", // RPassiveTrueDamage
            "v5": "?", // RPassiveStacksCoefficient*100
            "cooldown": "100 / 90 / 80",
            "cost": "100",
            "stats": "사거리 20000"
        },
    },
    "Ryze": { // 라이즈
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // RuneDuration
            "v2": "?", // MaximumRunes
            "v3": "?", // QDamageCalc
            "v4": "?", // MovementSpeedDuration
            "v5": "?", // MovementSpeedAmount
            "cooldown": "5",
            "cost": "40 / 38 / 36 / 34 / 32",
            "stats": "사거리 1000"
        },
        "W": {
            "v1": "?", // WDamageCalc
            "v2": "?", // CCDuration
            "v3": "?", // SlowAmount*100
            "cooldown": "11 / 10.5 / 10 / 9.5 / 9",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": "사거리 615"
        },
        "E": {
            "v1": "?", // EDamageCalc
            "v2": "?", // DebuffDuration
            "cooldown": "3.5 / 3.25 / 3 / 2.75 / 2.5",
            "cost": "35 / 45 / 55 / 65 / 75",
            "stats": "사거리 615"
        },
        "R": {
            "v1": "?", // OverloadDamageBonus
            "v2": "?", // ChargeTimeTooltip
            "cooldown": "180 / 160 / 140",
            "cost": "100",
            "stats": "사거리 3000"
        },
    },
    "Jade_Ryze": { // 라이즈
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // PassiveCooldown*100
            "v2": "?", // DamageCalc
            "cooldown": "3.5",
            "cost": "60",
            "stats": "사거리 600"
        },
        "W": {
            "v1": "?", // CCDuration
            "v2": "?", // DamageCalc
            "cooldown": "14",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": "사거리 615"
        },
        "E": {
            "v1": "?", // MaximumHits
            "v2": "?", // DamageCalc
            "v3": "?", // ResistShred
            "cooldown": "14",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": "사거리 615"
        },
        "R": {
            "v1": "?", // Duration
            "v2": "?", // AreaDamageMod*100
            "v3": "?", // SpellVamp*100
            "v4": "?", // MovementSpeed
            "cooldown": "70 / 60 / 50",
            "cost": "-",
            "stats": "사거리 3000"
        },
    },
    "Rakan": { // 라칸
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // HealDelay
            "v3": "?", // TotalHeal
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "45",
            "stats": "사거리 850"
        },
        "W": {
            "v1": "?", // KnockupDuration
            "v2": "?", // TotalDamage
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": "사거리 600"
        },
        "E": {
            "v1": "?", // Duration
            "v2": "?", // TotalShield
            "v3": "?", // RecastWindow
            "cooldown": "0",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": "사거리 650"
        },
        "R": {
            "v1": "?", // Duration
            "v2": "?", // InitialCastSpeed
            "v3": "?", // TotalDamageTooltip
            "v4": "?", // CharmDuration
            "v5": "?", // TouchSpeed
            "cooldown": "130 / 110 / 90",
            "cost": "100",
            "stats": "사거리 150"
        },
    },
    "Rammus": { // 람머스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // MinimumMoveSpeed
            "v2": "?", // RollDuration
            "v3": "?", // MaximumMoveSpeed
            "v4": "?", // PowerBallDamage
            "v5": "?", // SlowDuration
            "v6": "?", // SlowPercent
            "cooldown": "12 / 10.5 / 9 / 7.5 / 6",
            "cost": "60",
            "stats": "사거리 300"
        },
        "W": {
            "v1": "?", // BuffDuration
            "v2": "?", // BonusArmorTooltip
            "v3": "?", // BonusMRTooltip
            "v4": "?", // ReturnDamageCalc
            "cooldown": "7",
            "cost": "40",
            "stats": "사거리 300"
        },
        "E": {
            "v1": "?", // Duration
            "v2": "?", // MonsterDamageCalc
            "cooldown": "12",
            "cost": "50",
            "stats": "사거리 325"
        },
        "R": {
            "v1": "?", // InitialDamageCalc
            "v2": "?", // SlowDuration
            "v3": "?", // SlowAmount*100
            "v4": "?", // KnockupDuration
            "v5": "?", // BuffDuration
            "v6": "?", // NumberOfPulses
            "cooldown": "120 / 105 / 90",
            "cost": "100",
            "stats": "사거리 25000"
        },
    },
    "Jade_Rammus": { // 람머스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // SlowPercent*-100
            "cooldown": "10",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": "사거리 300"
        },
        "W": {
            "v1": "?", // Armour
            "v2": "?", // TotalDamage
            "cooldown": "14",
            "cost": "40",
            "stats": "사거리 300"
        },
        "E": {
            "v1": "?", // Duration
            "v2": "?", // ArmourReduction*-1
            "cooldown": "12",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": "사거리 325"
        },
        "R": {
            "v1": "?", // TotalDamage
            "cooldown": "60",
            "cost": "120",
            "stats": "사거리 25000"
        },
    },
    "Lux": { // 럭스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // RootDuration
            "v2": "?", // TotalDamageTT
            "cooldown": "10",
            "cost": "50",
            "stats": "사거리 1175"
        },
        "W": {
            "v1": "?", // ShieldDuration
            "v2": "?", // TotalShieldTT
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": "사거리 1150"
        },
        "E": {
            "v1": "?", // SlowPercent
            "v2": "?", // SlowZoneDuration
            "v3": "?", // TotalDamageTT
            "v4": "?", // SlowLingerDuration
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": "사거리 1100"
        },
        "R": {
            "v1": "?", // TotalDamage
            "cooldown": "60 / 50 / 40",
            "cost": "100",
            "stats": "사거리 3340"
        },
    },
    "Jade_Lux": { // 럭스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamageTT
            "v2": "?", // HalfTotalDamageTT
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": "사거리 1175"
        },
        "W": {
            "v1": "?", // TotalShieldTT
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "60",
            "stats": "사거리 1150"
        },
        "E": {
            "v1": "?", // SlowPercent
            "v2": "?", // TotalDamageTT
            "cooldown": "10",
            "cost": "70 / 85 / 100 / 115 / 130",
            "stats": "사거리 1000"
        },
        "R": {
            "v1": "?", // TotalDamage
            "cooldown": "80 / 65 / 50",
            "cost": "100",
            "stats": "사거리 3340"
        },
    },
    "Rumble": { // 럼블
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // FlamespitterDuration
            "v2": "?", // FlatDamage
            "v3": "?", // HealthDamage*100
            "v4": "?", // MinionMod*100
            "v5": "?", // EmpoweredDamage
            "v6": "?", // EmpoweredHealth
            "v7": "?", // MonsterCap
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "",
            "stats": "사거리 600"
        },
        "W": {
            "v1": "?", // ShieldDuration.1
            "v2": "?", // TotalShield
            "v3": "?", // MoveSpeedDuration
            "v4": "?", // MoveSpeed*100
            "v5": "?", // EmpoweredShield
            "v6": "?", // EmpoweredMS
            "cooldown": "6",
            "cost": "",
            "stats": "사거리 20"
        },
        "E": {
            "v1": "?", // TotalDamage
            "v2": "?", // SlowDuration
            "v3": "?", // BaseSlowAmount
            "v4": "?", // ShredDuration
            "v5": "?", // PercMagicPen*100
            "v6": "?", // EmpoweredSlowAmount
            "v7": "?", // EnhancedMagicPen*100
            "v8": "?", // EmpDamage
            "cooldown": "0.5",
            "cost": "",
            "stats": "사거리 850"
        },
        "R": {
            "v1": "?", // TrailDuration
            "v2": "?", // SlowAmount
            "v3": "?", // DamagePerSecond
            "cooldown": "130 / 105 / 80",
            "cost": "-",
            "stats": "사거리 1750"
        },
    },
    "Renata": { // 레나타 글라스크
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // RootDuration
            "v2": "?", // TotalDamage
            "v3": "?", // StunDuration
            "cooldown": "16",
            "cost": "80",
            "stats": "사거리 900"
        },
        "W": {
            "v1": "?", // ASCalc
            "v2": "?", // MSCalc
            "v3": "?", // Duration
            "v4": "?", // FinalASCalc
            "v5": "?", // FinalMSCalc
            "v6": "?", // TriumphPercent
            "cooldown": "28 / 27 / 26 / 25 / 24",
            "cost": "80",
            "stats": "사거리 800"
        },
        "E": {
            "v1": "?", // TotalDamage
            "v2": "?", // SlowDuration
            "v3": "?", // ShieldDuration
            "v4": "?", // ShieldCalc
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": "사거리 800"
        },
        "R": {
            "v1": "?", // BerserkDuration
            "v2": "?", // BonusAttackSpeed*100
            "cooldown": "150 / 130 / 110",
            "cost": "100",
            "stats": "사거리 2000"
        },
    },
    "Renekton": { // 레넥톤
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // BasicDamage
            "v2": "?", // NonChampHealing
            "v3": "?", // ChampHealing
            "v4": "?", // MinionFuryGain
            "v5": "?", // ChampionFuryGain
            "v6": "?", // EmpDamage
            "v7": "?", // EmpNonChampHealing
            "v8": "?", // EmpChampHealing
            "cooldown": "7",
            "cost": "-",
            "stats": "사거리 325"
        },
        "W": {
            "v1": "?", // StunDuration
            "v2": "?", // BasicTotalDamage
            "v3": "?", // BonusFuryVsChamps
            "v4": "?", // EmpTotalDamage
            "v5": "?", // EnragedStunDuration
            "cooldown": "16 / 14 / 12 / 10 / 8",
            "cost": "-",
            "stats": "사거리 300"
        },
        "E": {
            "v1": "?", // BasicDamage
            "v2": "?", // MinionRageGeneration
            "v3": "?", // ChampionRageGeneration
            "v4": "?", // DiceTimer
            "v5": "?", // EmpDamage
            "v6": "?", // ShredTimer
            "v7": "?", // EnragedArmorShred
            "cooldown": "16 / 14.5 / 13 / 11.5 / 10",
            "cost": "-",
            "stats": "사거리 450"
        },
        "R": {
            "v1": "?", // BuffDuration
            "v2": "?", // HealthGain
            "v3": "?", // FuryOnCast
            "v4": "?", // TotalDamagePerSecond
            "v5": "?", // FuryPerSecond
            "cooldown": "120 / 100 / 80",
            "cost": "-",
            "stats": "사거리 20"
        },
    },
    "Leona": { // 레오나
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // StunDuration
            "v2": "?", // TotalDamageTooltip
            "cooldown": "5",
            "cost": "30 / 35 / 40 / 45 / 50",
            "stats": "사거리 100"
        },
        "W": {
            "v1": "?", // FlatDamageReduction
            "v2": "?", // ArmorMRDuration
            "v3": "?", // BonusArmorTooltip
            "v4": "?", // BonusMRTooltip
            "v5": "?", // TotalDamageTooltip
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "60",
            "stats": "사거리 450"
        },
        "E": {
            "v1": "?", // TotalDamageTooltip
            "v2": "?", // RootDuration
            "cooldown": "12 / 10.5 / 9 / 7.5 / 6",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": "사거리 875"
        },
        "R": {
            "v1": "?", // ExplosionCalculatedDamage
            "v2": "?", // CCDuration
            "v3": "?", // SlowPercent
            "cooldown": "90 / 75 / 60",
            "cost": "100",
            "stats": "사거리 1200"
        },
    },
    "Jade_Leona": { // 레오나
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamageTooltip
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "45 / 50 / 55 / 60 / 65",
            "stats": "사거리 100"
        },
        "W": {
            "v1": "?", // BonusARMR
            "v2": "?", // TotalDamageTooltip
            "cooldown": "14",
            "cost": "60",
            "stats": "사거리 450"
        },
        "E": {
            "v1": "?", // TotalDamageTooltip
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "60",
            "stats": "사거리 875"
        },
        "R": {
            "v1": "?", // ExplosionCalculatedDamage
            "v2": "?", // CCDuration
            "v3": "?", // SlowPercent
            "cooldown": "90 / 75 / 60",
            "cost": "100 / 150 / 200",
            "stats": "사거리 1200"
        },
    },
    "RekSai": { // 렉사이
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // BuffDuration
            "v2": "?", // AttackSpeed*100
            "v3": "?", // TotalDamageTooltip
            "cooldown": "4 / 3.5 / 3 / 2.5 / 2",
            "cost": "-",
            "stats": "사거리 325"
        },
        "W": {
            "v1": "?", // BurrowedMoveSpeed
            "v2": "?", // VisionRadiusMod*-100
            "cooldown": "4",
            "cost": "-",
            "stats": "사거리 1650"
        },
        "E": {
            "cooldown": "6",
            "cost": "-",
            "stats": "사거리 250"
        },
        "R": {
            "v1": "?", // PreyMarkDuration
            "v2": "?", // RBaseDamageCalc
            "v3": "?", // PercentHealthDamage
            "cooldown": "120 / 100 / 80",
            "cost": "-",
            "stats": "사거리 1500"
        },
    },
    "Rell": { // 렐
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // StunDuration
            "v2": "?", // Damage
            "cooldown": "11 / 10.5 / 10 / 9.5 / 9",
            "cost": "50",
            "stats": "사거리 600"
        },
        "W": {
            "cooldown": "10",
            "cost": "40",
            "stats": "사거리 450"
        },
        "E": {
            "v1": "?", // Duration
            "v2": "?", // MinMS*100
            "v3": "?", // MaxMS*100
            "v4": "?", // MaxHealthDamageCalc
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "40",
            "stats": "사거리 1200"
        },
        "R": {
            "v1": "?", // Duration
            "v2": "?", // TotalDamage
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": "사거리 200"
        },
    },
    "Rengar": { // 렝가
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // ASBonus
            "v2": "?", // QTotalDamage
            "v3": "?", // EmpoweredQTotalDamage
            "v4": "?", // ASDuration
            "v5": "?", // EmpoweredQAS
            "cooldown": "0.25",
            "cost": "",
            "stats": "사거리 450"
        },
        "W": {
            "v1": "?", // TotalDamage
            "v2": "?", // HealingWindow
            "v3": "?", // DamagePercentageHealed
            "v4": "?", // TotalDamageEmpowered
            "cooldown": "0.25",
            "cost": "",
            "stats": "사거리 450"
        },
        "E": {
            "v1": "?", // TotalDamage
            "v2": "?", // CCDuration
            "v3": "?", // SlowAmount
            "v4": "?", // TotalEmpoweredDamage
            "cooldown": "0.25",
            "cost": "",
            "stats": "사거리 1000"
        },
        "R": {
            "v1": "?", // StealthDuration
            "v2": "?", // StealthMS
            "v3": "?", // FadeTime
            "v4": "?", // BonusDamage
            "v5": "?", // ArmorShredDuration
            "v6": "?", // ArmorShred
            "cooldown": "100 / 90 / 80",
            "cost": "-",
            "stats": "사거리 2500 / 3000 / 3500"
        },
    },
    "Locke": { // 로크
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // MissileDamage
            "v2": "?", // SlowDuration1
            "v3": "?", // SlowDuration2
            "v4": "?", // SlowDuration3
            "v5": "?", // SlowAmount1*100
            "v6": "?", // SlowAmount2*100
            "v7": "?", // SlowAmount3*100
            "v8": "?", // NailDamage
            "v9": "?", // TwoMarkBonusPercent
            "v10": "?", // ThreeMarkBonusPercent
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "70",
            "stats": "사거리 950"
        },
        "W": {
            "v1": "?", // AttackSpeed
            "v2": "?", // MoveSpeed
            "v3": "?", // DecayTimeHelper
            "v4": "?", // BaseDuration
            "v5": "?", // HealthCost*100
            "v6": "?", // DamageRestoreAmount
            "v7": "?", // AdditionalHeal
            "v8": "?", // MaxHealingThreshold
            "cooldown": "18 / 17 / 16 / 15 / 14",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 250"
        },
        "E": {
            "v1": "?", // OnHitDamage
            "v2": "?", // DashDamage
            "cooldown": "10",
            "cost": "30 / 40 / 50 / 60 / 70",
            "stats": "사거리 425"
        },
        "R": {
            "v1": "?", // Damage
            "v2": "?", // SlowAmount*100
            "v3": "?", // SlowDuration
            "v4": "?", // Duration
            "v5": "?", // ExecutionThreshold*100
            "v6": "?", // ExecuteThresholdPerStack*100
            "v7": "?", // CooldownReduction
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": "사거리 1000"
        },
    },
    "Lucian": { // 루시안
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "48 / 56 / 64 / 72 / 80",
            "stats": "사거리 500"
        },
        "W": {
            "v1": "?", // TotalDamage
            "v2": "?", // MoveSpeedAmount
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "60",
            "stats": "사거리 900"
        },
        "E": {
            "v1": "?", // CDRefundBase
            "v2": "?", // CDRefundChampion
            "cooldown": "16 / 15.5 / 15 / 14.5 / 14",
            "cost": "32 / 24 / 16 / 8 / 0",
            "stats": "사거리 445"
        },
        "R": {
            "v1": "?", // Duration
            "v2": "?", // TotalNumShots
            "v3": "?", // DamagePerBullet
            "v4": "?", // TotalDamage
            "cooldown": "110 / 100 / 90",
            "cost": "100",
            "stats": "사거리 1400"
        },
    },
    "Lulu": { // 룰루
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // SlowAmount*-100
            "v3": "?", // SlowDuration
            "v4": "?", // BonusMissileDamage
            "cooldown": "7",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 925"
        },
        "W": {
            "v1": "?", // Effect5Amount
            "v2": "?", // TotalMS
            "v3": "?", // Effect7Amount*100
            "v4": "?", // Effect3Amount
            "cooldown": "18",
            "cost": "65",
            "stats": "사거리 650"
        },
        "E": {
            "v1": "?", // Effect1Amount
            "v2": "?", // Effect7Amount
            "v3": "?", // TotalShield
            "v4": "?", // TotalDamage
            "v5": "?", // Effect6Amount
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": "사거리 650"
        },
        "R": {
            "v1": "?", // KnockbackDuration
            "v2": "?", // BuffDuration
            "v3": "?", // TotalBonusHealth
            "v4": "?", // SlowPercent
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": "사거리 900"
        },
    },
    "Jade_Lulu": { // 룰루
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // SlowDuration
            "v3": "?", // SlowAmount*-100
            "cooldown": "7",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": "사거리 925"
        },
        "W": {
            "v1": "?", // BuffDuration
            "v2": "?", // MSBoost*100
            "v3": "?", // APBoost
            "v4": "?", // PolymorphDuration
            "cooldown": "18 / 16.5 / 15 / 13.5 / 12",
            "cost": "65 / 70 / 75 / 80 / 85",
            "stats": "사거리 650"
        },
        "E": {
            "v1": "?", // TotalShield
            "v2": "?", // TotalDamage
            "cooldown": "10",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": "사거리 650"
        },
        "R": {
            "v1": "?", // BuffDuration
            "v2": "?", // TotalBonusHealth
            "v3": "?", // SlowPercent
            "cooldown": "110 / 95 / 80",
            "cost": "150",
            "stats": "사거리 900"
        },
    },
    "Leblanc": { // 르블랑
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // Damage
            "v2": "?", // MarkDuration
            "v3": "?", // MarkDamage
            "v4": "?", // ManaRefund*100
            "v5": "?", // CooldownRefund*100
            "v6": "?", // BonusMinionDamage
            "cooldown": "6",
            "cost": "50",
            "stats": "사거리 700"
        },
        "W": {
            "v1": "?", // TotalDamage
            "v2": "?", // SnapbackTimeAllowed
            "cooldown": "15 / 13.75 / 12.5 / 11.25 / 10",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": "사거리 600"
        },
        "E": {
            "v1": "?", // InitialDamage
            "v2": "?", // TetherDuration
            "v3": "?", // RootDuration
            "v4": "?", // DelayedDamage
            "cooldown": "14 / 13.25 / 12.5 / 11.75 / 11",
            "cost": "50",
            "stats": "사거리 925"
        },
        "R": {
            "v1": "?", // RQ1Damage
            "v2": "?", // RQ2Damage
            "v3": "?", // RWDamage
            "v4": "?", // RE1Damage
            "v5": "?", // RE2Damage
            "cooldown": "45 / 35 / 25",
            "cost": "-",
            "stats": "사거리 25000"
        },
    },
    "LeeSin": { // 리 신
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // InitialDamage
            "v2": "?", // ReactivateTime
            "v3": "?", // RecastDamage
            "v4": "?", // EmpoweredDamage
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "50",
            "stats": "사거리 1100"
        },
        "W": {
            "v1": "?", // ShieldDuration
            "v2": "?", // ShieldAmount
            "v3": "?", // W1ReactivateTime
            "v4": "?", // LifestealAndSpellVampTime
            "v5": "?", // LifestealAndSpellVamp
            "cooldown": "7",
            "cost": "50",
            "stats": "사거리 700"
        },
        "E": {
            "v1": "?", // InitialDamage
            "v2": "?", // SlowDuration
            "v3": "?", // ReactivateTime
            "v4": "?", // SlowAmount
            "cooldown": "8",
            "cost": "50",
            "stats": "사거리 450"
        },
        "R": {
            "v1": "?", // Damage
            "v2": "?", // PercentHPCarryThrough
            "cooldown": "110 / 85 / 60",
            "cost": "-",
            "stats": "사거리 375"
        },
    },
    "Jade_LeeSin": { // 리 신
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // InitialDamage
            "v2": "?", // RecastDamage
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "50",
            "stats": "사거리 1100"
        },
        "W": {
            "v1": "?", // ShieldAmount
            "v2": "?", // LifestealAndSpellVamp
            "v3": "?", // ArmorBonus
            "cooldown": "9",
            "cost": "50",
            "stats": "사거리 700"
        },
        "E": {
            "v1": "?", // InitialDamage
            "v2": "?", // SlowAmount
            "cooldown": "10",
            "cost": "50",
            "stats": "사거리 425"
        },
        "R": {
            "v1": "?", // Damage
            "cooldown": "90 / 75 / 60",
            "cost": "",
            "stats": "사거리 375"
        },
    },
    "Riven": { // 리븐
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // FirstSlashDamage
            "cooldown": "13",
            "cost": "-",
            "stats": "사거리 275"
        },
        "W": {
            "v1": "?", // TotalDamage
            "v2": "?", // StunDuration
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "-",
            "stats": "사거리 260"
        },
        "E": {
            "v1": "?", // TotalShield
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "-",
            "stats": "사거리 250"
        },
        "R": {
            "v1": "?", // Duration
            "v2": "?", // BonusAD
            "v3": "?", // MinDamage
            "v4": "?", // MaxDamage
            "cooldown": "120 / 90 / 60",
            "cost": "-",
            "stats": "사거리 200"
        },
    },
    "Lissandra": { // 리산드라
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // SlowDuration
            "v3": "?", // SlowPercentage*-100
            "cooldown": "7 / 6 / 5 / 4 / 3",
            "cost": "55 / 60 / 65 / 70 / 75",
            "stats": "사거리 725"
        },
        "W": {
            "v1": "?", // SnareDuration
            "v2": "?", // TotalDamage
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "40",
            "stats": "사거리 450"
        },
        "E": {
            "v1": "?", // TotalDamage
            "cooldown": "24 / 21 / 18 / 15 / 12",
            "cost": "80 / 85 / 90 / 95 / 100",
            "stats": "사거리 1050"
        },
        "R": {
            "v1": "?", // EnemyCastDuration
            "v2": "?", // SelfCastDuration
            "v3": "?", // HealAmount
            "v4": "?", // SelfCastMissingHPPerAbove
            "v5": "?", // SelfCastMissingHPRatio
            "v6": "?", // CalculatedDamage
            "v7": "?", // SlowDuration
            "v8": "?", // SlowAmount*-100
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": "사거리 550"
        },
    },
    "Lillia": { // 릴리아
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // PranceDuration
            "v2": "?", // PranceSpeed
            "v3": "?", // PranceMaxStacks
            "v4": "?", // TotalDamage
            "v5": "?", // BonusTrueDamage
            "cooldown": "6 / 5.5 / 5 / 4.5 / 4",
            "cost": "65",
            "stats": "사거리 450"
        },
        "W": {
            "v1": "?", // FlatDamage
            "v2": "?", // FlatDamageSweetSpot
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "50",
            "stats": "사거리 500"
        },
        "E": {
            "v1": "?", // ImpactDamageTotal
            "v2": "?", // SlowDuration
            "v3": "?", // SlowAmount*100
            "cooldown": "12",
            "cost": "70",
            "stats": "사거리 700"
        },
        "R": {
            "v1": "?", // DrowsyDuration
            "v2": "?", // SleepDuration
            "v3": "?", // TotalDamage
            "cooldown": "150 / 130 / 110",
            "cost": "50",
            "stats": "사거리 1600"
        },
    },
    "MasterYi": { // 마스터 이
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // AlphaStrikeBounces
            "v2": "?", // TotalDamage
            "v3": "?", // SubsequentHitMultiplier*100
            "v4": "?", // SubesquentDamage
            "v5": "?", // SingleTotalDamage
            "cooldown": "20 / 19.5 / 19 / 18.5 / 18",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 600"
        },
        "W": {
            "v1": "?", // HealDuration
            "v2": "?", // TotalHeal
            "v3": "?", // MaxMissingHealthPercent*100
            "v4": "?", // DRLinger
            "v5": "?", // InitialDR
            "v6": "?", // InitialExtraDRDuration
            "v7": "?", // DamageReduction*100
            "cooldown": "10",
            "cost": "40",
            "stats": "사거리 20"
        },
        "E": {
            "v1": "?", // Duration
            "v2": "?", // TotalDamage
            "cooldown": "14",
            "cost": "-",
            "stats": "사거리 20"
        },
        "R": {
            "v1": "?", // RCooldownRefund*100
            "v2": "?", // RDuration
            "v3": "?", // RMSBonus
            "v4": "?", // RASBonus
            "v5": "?", // RKillAssistExtension
            "cooldown": "85",
            "cost": "100",
            "stats": "사거리 1"
        },
    },
    "Jade_MasterYi": { // 마스터 이
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // MonsterDamageProcChance*100
            "v3": "?", // TotalMonsterDamage
            "cooldown": "18 / 16 / 14 / 12 / 10",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": "사거리 600"
        },
        "W": {
            "v1": "?", // TotalHeal
            "v2": "?", // DefenseStat
            "cooldown": "35",
            "cost": "50 / 65 / 80 / 95 / 110",
            "stats": "사거리 20"
        },
        "E": {
            "v1": "?", // PassiveAD
            "v2": "?", // Duration
            "v3": "?", // PassiveAD*2
            "cooldown": "25 / 23 / 21 / 19 / 17",
            "cost": "40",
            "stats": "사거리 20"
        },
        "R": {
            "v1": "?", // RMSBonus*100
            "v2": "?", // RASBonus*100
            "v3": "?", // RDuration
            "cooldown": "75",
            "cost": "100",
            "stats": "사거리 1"
        },
    },
    "Maokai": { // 마오카이
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // BasePercentHealth*100
            "cooldown": "7 / 6.5 / 6 / 5.5 / 5",
            "cost": "40",
            "stats": "사거리 600"
        },
        "W": {
            "v1": "?", // RootDuration
            "v2": "?", // TotalDamage
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "60",
            "stats": "사거리 525"
        },
        "E": {
            "v1": "?", // SaplingDuration
            "v2": "?", // TotalDamage
            "v3": "?", // SlowDuration
            "v4": "?", // SlowAmount*100
            "v5": "?", // EmpoweredSaplingDuration
            "v6": "?", // TotalEmpoweredDamage
            "v7": "?", // EmpoweredDoTDuration
            "v8": "?", // EmpoweredSlowAmount
            "cooldown": "18 / 17 / 16 / 15 / 14",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": "사거리 1100"
        },
        "R": {
            "v1": "?", // MinRootDuration
            "v2": "?", // MaxRootDuration
            "v3": "?", // TotalDamage
            "v4": "?", // MoveHaste*100
            "v5": "?", // HasteDuration
            "cooldown": "130 / 110 / 90",
            "cost": "100",
            "stats": "사거리 3000"
        },
    },
    "Malzahar": { // 말자하
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamageTooltip
            "v2": "?", // SilenceDuration
            "cooldown": "6",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": "사거리 900"
        },
        "W": {
            "v1": "?", // StackCap
            "v2": "?", // VoidlingDuration
            "v3": "?", // VoidlingBonusDamageTooltip
            "cooldown": "8",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": "사거리 150"
        },
        "E": {
            "v1": "?", // Duration
            "v2": "?", // TotalDamage
            "v3": "?", // ManaRestore
            "v4": "?", // MinionExecuteThreshold
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": "사거리 650"
        },
        "R": {
            "v1": "?", // CCDuration
            "v2": "?", // TotalDamageTooltip
            "v3": "?", // PoolDuration
            "v4": "?", // ZoneDamageTooltip
            "cooldown": "140 / 110 / 80",
            "cost": "100",
            "stats": "사거리 700"
        },
    },
    "Jade_Malzahar": { // 말자하
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // SilenceDuration
            "cooldown": "9",
            "cost": "80 / 85 / 90 / 95 / 100",
            "stats": "사거리 900"
        },
        "W": {
            "v1": "?", // ZoneDuration
            "v2": "?", // TotalDamage
            "cooldown": "14",
            "cost": "90 / 95 / 100 / 105 / 110",
            "stats": "사거리 800"
        },
        "E": {
            "v1": "?", // Duration
            "v2": "?", // TotalDamage
            "v3": "?", // ManaRestore
            "cooldown": "15 / 13 / 11 / 9 / 7",
            "cost": "60 / 75 / 90 / 105 / 120",
            "stats": "사거리 650"
        },
        "R": {
            "v1": "?", // SuppressDuration
            "v2": "?", // TotalDamage
            "cooldown": "120 / 100 / 80",
            "cost": "150",
            "stats": "사거리 700"
        },
    },
    "Malphite": { // 말파이트
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // QDamageCalc
            "v2": "?", // SlowDuration
            "v3": "?", // SpeedSteal
            "cooldown": "8",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": "사거리 625"
        },
        "W": {
            "v1": "?", // BonusArmorPassive*100
            "v2": "?", // f1
            "v3": "?", // BonusArmorPassive*300
            "v4": "?", // f2
            "v5": "?", // TotalBonusDamage
            "v6": "?", // ThunderclapSplash
            "v7": "?", // ThunderclapBuffDuration
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "30 / 35 / 40 / 45 / 50",
            "stats": "사거리 400"
        },
        "E": {
            "v1": "?", // EDamageCalc
            "v2": "?", // Duration
            "v3": "?", // ASReduction
            "cooldown": "7",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 400"
        },
        "R": {
            "v1": "?", // KnockupDuration
            "v2": "?", // TotalDamage
            "cooldown": "130 / 115 / 100",
            "cost": "100",
            "stats": "사거리 1000"
        },
    },
    "Jade_Malphite": { // 말파이트
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // QDamageCalc
            "v2": "?", // SlowDuration
            "v3": "?", // SpeedSteal
            "cooldown": "8",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": "사거리 625"
        },
        "W": {
            "v1": "?", // Jade_MalphiteObduracyPercentDamage*100
            "v2": "?", // ArmorBonus*100
            "cooldown": "14",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 400"
        },
        "E": {
            "v1": "?", // EDamageCalc
            "v2": "?", // Duration
            "v3": "?", // ASReduction*-100
            "v4": "?", // ArmorScaling_Jade*100
            "cooldown": "7",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 400"
        },
        "R": {
            "v1": "?", // TotalDamage
            "v2": "?", // KnockupDuration
            "cooldown": "130 / 115 / 100",
            "cost": "100",
            "stats": "사거리 1000"
        },
    },
    "Mel": { // 멜
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // ExplosionCount
            "v2": "?", // InitialExplosionDamage
            "v3": "?", // TotalExplosionDamage
            "v4": "?", // AllDamageHit
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": "사거리 950"
        },
        "W": {
            "v1": "?", // Duration
            "v2": "?", // ShieldAmount
            "v3": "?", // MoveSpeedDuration
            "v4": "?", // MoveSpeed*100
            "v5": "?", // DamagePercent
            "cooldown": "38 / 35 / 33 / 29 / 26",
            "cost": "80 / 60 / 40 / 20 / 0",
            "stats": "사거리 250"
        },
        "E": {
            "v1": "?", // RootDuration
            "v2": "?", // Damage
            "v3": "?", // AreaSlowAmount*100
            "v4": "?", // AreaDamagePerSecond
            "cooldown": "11 / 10.5 / 10 / 9.5 / 9",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": "사거리 1000"
        },
        "R": {
            "v1": "?", // PassiveFlatDamage
            "v2": "?", // PassiveStackDamage
            "v3": "?", // UltFlatDamage
            "v4": "?", // UltStackDamage
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": "사거리 25000"
        },
    },
    "Mordekaiser": { // 모데카이저
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // QDamage
            "v2": "?", // EmpoweredDamageTooltip
            "cooldown": "8 / 7 / 6 / 5 / 4",
            "cost": "-",
            "stats": "사거리 675"
        },
        "W": {
            "v1": "?", // DamageConversion*100
            "v2": "?", // DamageTakenConversion*100
            "v3": "?", // HealingPercent*100
            "v4": "?", // MinHealthTooltip
            "v5": "?", // MaxHealthTooltip
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "-",
            "stats": "사거리 25000"
        },
        "E": {
            "v1": "?", // TotalDamage
            "cooldown": "16 / 14 / 12 / 10 / 8",
            "cost": "-",
            "stats": "사거리 700"
        },
        "R": {
            "v1": "?", // SpiritRealmDuration
            "v2": "?", // StatStealPercentScalar*100
            "cooldown": "140 / 120 / 100",
            "cost": "-",
            "stats": "사거리 650"
        },
    },
    "Morgana": { // 모르가나
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // RootDuration
            "v2": "?", // TotalDamage
            "cooldown": "10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 1250"
        },
        "W": {
            "v1": "?", // WDuration
            "v2": "?", // TotalMinDamage
            "v3": "?", // TotalMaxDamage
            "v4": "?", // CDRefundPercent*100
            "cooldown": "12",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": "사거리 900"
        },
        "E": {
            "v1": "?", // ShieldDuration
            "v2": "?", // TotalShieldStrength
            "cooldown": "26 / 23.5 / 21 / 18.5 / 16",
            "cost": "80",
            "stats": "사거리 800"
        },
        "R": {
            "v1": "?", // TotalDamage
            "v2": "?", // SlowPercent
            "v3": "?", // ChainDuration
            "v4": "?", // StunDuration
            "v5": "?", // HastePercent
            "cooldown": "120 / 110 / 100",
            "cost": "100",
            "stats": "사거리 625"
        },
    },
    "Jade_Morgana": { // 모르가나
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // RootDuration
            "v2": "?", // TotalDamage
            "cooldown": "11",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": "사거리 1175"
        },
        "W": {
            "v1": "?", // Duration
            "v2": "?", // TotalDamage
            "v3": "?", // MRShredTooltip
            "cooldown": "10",
            "cost": "70 / 85 / 100 / 115 / 130",
            "stats": "사거리 900"
        },
        "E": {
            "v1": "?", // ShieldDuration
            "v2": "?", // TotalShieldStrength
            "cooldown": "23 / 21 / 19 / 17 / 15",
            "cost": "50",
            "stats": "사거리 750"
        },
        "R": {
            "v1": "?", // TotalDamage
            "v2": "?", // ChainDuration
            "v3": "?", // StunDuration
            "cooldown": "120 / 110 / 100",
            "cost": "100",
            "stats": "사거리 625"
        },
    },
    "DrMundo": { // 문도 박사
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // CurrentHealthDamage*100
            "v2": "?", // SlowDuration
            "v3": "?", // SlowAmount*100
            "v4": "?", // HealthRestoreOnHitChampionMonster
            "v5": "?", // HealthRestoreOnHitMinion
            "cooldown": "4",
            "cost": "",
            "stats": "사거리 975"
        },
        "W": {
            "v1": "?", // Duration
            "v2": "?", // DamagePerTick*4
            "v3": "?", // GrayHealthInitialDuration
            "v4": "?", // GrayHealthStorageInitial
            "v5": "?", // GrayHealthStorage*100
            "v6": "?", // TotalDamage
            "v7": "?", // GrayHealthBigMod*100
            "v8": "?", // GrayHealthSmallMod*100
            "cooldown": "17 / 16.5 / 16 / 15.5 / 15",
            "cost": "",
            "stats": "사거리 325"
        },
        "E": {
            "v1": "?", // PassiveBonusAD
            "v2": "?", // AdditionalDamage
            "v3": "?", // MaxDamageAmpTooltip
            "cooldown": "9 / 8.25 / 7.5 / 6.75 / 6",
            "cost": ""
        },
        "R": {
            "v1": "?", // MissingHealthHeal*100
            "v2": "?", // SpeedBoostAmount*100
            "v3": "?", // Duration
            "v4": "?", // MaxHealthHoT*100
            "v5": "?", // BonusPerNearbyChampion*100
            "cooldown": "120",
            "cost": "-",
            "stats": "사거리 20"
        },
    },
    "Jade_DrMundo": { // 문도 박사
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // DamageMod*100
            "v2": "?", // MinDamage
            "cooldown": "4",
            "cost": "",
            "stats": "사거리 975"
        },
        "W": {
            "v1": "?", // TotalDamage
            "v2": "?", // DurationMod*100
            "cooldown": "1",
            "cost": "",
            "stats": "사거리 325"
        },
        "E": {
            "v1": "?", // BaseIncrease
            "v2": "?", // DamageMod
            "cooldown": "7",
            "cost": ""
        },
        "R": {
            "v1": "?", // MaximumHealthRegen
            "v2": "?", // SpeedMod*100
            "cooldown": "75",
            "cost": "",
            "stats": "사거리 20"
        },
    },
    "MissFortune": { // 미스 포츈
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamageTooltip
            "v2": "?", // TotalDamageCrit
            "cooldown": "7 / 6 / 5 / 4 / 3",
            "cost": "40",
            "stats": "사거리 650"
        },
        "W": {
            "v1": "?", // PassiveBaseMSOOC
            "v2": "?", // PassiveBaseMS
            "v3": "?", // PassiveMaxMSExtraOOC
            "v4": "?", // PassiveMaxMS
            "v5": "?", // ActiveDuration
            "v6": "?", // ActiveAS*100
            "v7": "?", // LoveTapRefund
            "cooldown": "12",
            "cost": "45",
            "stats": "사거리 600"
        },
        "E": {
            "v1": "?", // BaseDuration
            "v2": "?", // TotalSlowAmount
            "v3": "?", // TotalDamagePerSecond
            "v4": "?", // TotalDamage
            "cooldown": "18 / 17 / 16 / 15 / 14",
            "cost": "80",
            "stats": "사거리 1000"
        },
        "R": {
            "v1": "?", // BaseChannelDuration
            "v2": "?", // BaseWaves
            "v3": "?", // PhysicalDamagePerWave
            "v4": "?", // TotalPhysicalDamage
            "v5": "?", // CritDamagePerWave
            "cooldown": "120 / 110 / 100",
            "cost": "100",
            "stats": "사거리 25000"
        },
    },
    "Jade_MissFortune": { // 미스 포츈
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // TotalRicochetDamage
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": "사거리 650"
        },
        "W": {
            "v1": "?", // TotalDamageOnHIt
            "v2": "?", // MaxStacks
            "v3": "?", // MaximumTotalDamageOnHit
            "v4": "?", // ASMod
            "cooldown": "16",
            "cost": "50",
            "stats": "사거리 600"
        },
        "E": {
            "v1": "?", // TotalDamagePerSecond
            "v2": "?", // TotalSlowAmount
            "cooldown": "15",
            "cost": "80",
            "stats": "사거리 800"
        },
        "R": {
            "v1": "?", // PhysicalDamagePerWave
            "v2": "?", // TotalDamage
            "cooldown": "120 / 110 / 100",
            "cost": "100",
            "stats": "사거리 25000"
        },
    },
    "Milio": { // 밀리오
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // Damage
            "v2": "?", // SlowDuration
            "v3": "?", // SlowAmountPercent
            "v4": "?", // RefundRatio*100
            "cooldown": "10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 1200"
        },
        "W": {
            "v1": "?", // ZoneDuration
            "v2": "?", // RangePercent
            "v3": "?", // HealingOverTime
            "v4": "?", // HealFrequencySeconds
            "cooldown": "29 / 27 / 25 / 23 / 21",
            "cost": "90 / 100 / 110 / 120 / 130",
            "stats": "사거리 350"
        },
        "E": {
            "v1": "?", // ShieldCalc
            "v2": "?", // MoveSpeedDuration
            "v3": "?", // MoveSpeedAmount*100
            "cooldown": "0.5",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": "사거리 650"
        },
        "R": {
            "v1": "?", // HealCalc
            "v2": "?", // TenacityDuration
            "v3": "?", // TenacityAmount*100
            "cooldown": "160 / 145 / 130",
            "cost": "100",
            "stats": "사거리 700"
        },
    },
    "Bard": { // 바드
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // SlowDuration
            "v3": "?", // SlowAmountPercentage
            "v4": "?", // StunDuration
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "60",
            "stats": "사거리 25000"
        },
        "W": {
            "v1": "?", // MoveSpeed_Duration
            "v2": "?", // Calc_MoveSpeed
            "v3": "?", // InitialHeal
            "v4": "?", // ChargeupTime
            "v5": "?", // MaxHeal
            "v6": "?", // MaxPacks
            "v7": "?", // Ammo_Limit
            "v8": "?", // f1
            "v9": "?", // f2
            "cooldown": "0",
            "cost": "70",
            "stats": "사거리 800"
        },
        "E": {
            "v1": "?", // DoorDuration
            "cooldown": "22 / 20.5 / 19 / 17.5 / 16",
            "cost": "30",
            "stats": "사거리 900"
        },
        "R": {
            "v1": "?", // RStasisDuration
            "cooldown": "110 / 95 / 80",
            "cost": "100",
            "stats": "사거리 3400"
        },
    },
    "Varus": { // 바루스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // MoveSpeedMod*-100
            "v2": "?", // MaxChannelDuration
            "v3": "?", // ManaRefund*100
            "v4": "?", // TotalDamageMinTooltip
            "v5": "?", // FalloffPercent*100
            "v6": "?", // MinDamagePercent*100
            "v7": "?", // MaxChargeAmp*100
            "v8": "?", // TotalDamageMax
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 925"
        },
        "W": {
            "v1": "?", // OnHitDamage
            "v2": "?", // DebuffDuration
            "v3": "?", // MaxStacks
            "v4": "?", // PercentHPPerStack
            "v5": "?", // MaxPercentHPPerStack
            "v6": "?", // CDRPerBlightStack*100
            "v7": "?", // QEmpowerPercentHP
            "v8": "?", // MaxQEmpowerPercentHP
            "cooldown": "40",
            "cost": "-",
            "stats": "사거리 750"
        },
        "E": {
            "v1": "?", // TotalDamage
            "v2": "?", // GroundDuration
            "v3": "?", // SlowPercent*-100
            "v4": "?", // GrievousAmount*100
            "cooldown": "18 / 16 / 14 / 12 / 10",
            "cost": "90",
            "stats": "사거리 925"
        },
        "R": {
            "v1": "?", // RootDuration
            "v2": "?", // TotalDamage
            "v3": "?", // PassiveStacks
            "cooldown": "100 / 80 / 60",
            "cost": "100",
            "stats": "사거리 1300"
        },
    },
    "Vi": { // 바이
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // SelfSlow
            "v2": "?", // TotalDamage
            "v3": "?", // MaxDamageTooltip
            "cooldown": "12 / 10.5 / 9 / 7.5 / 6",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": "사거리 250"
        },
        "W": {
            "v1": "?", // TotalDamageTooltip
            "v2": "?", // SharedBuffsDuration
            "v3": "?", // ShredAmount
            "v4": "?", // AttackSpeed
            "cooldown": "0",
            "cost": "",
            "stats": "사거리 750"
        },
        "E": {
            "v1": "?", // TotalDamageTooltip
            "v2": "?", // AmmoRechargeTime
            "cooldown": "1",
            "cost": "26 / 32 / 38 / 44 / 50",
            "stats": "사거리 400"
        },
        "R": {
            "v1": "?", // RStunDuration
            "v2": "?", // Damage
            "v3": "?", // SecondaryTargetStunDuration
            "cooldown": "140 / 115 / 90",
            "cost": "100",
            "stats": "사거리 800"
        },
    },
    "Veigar": { // 베이가
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "cooldown": "6 / 5.5 / 5 / 4.5 / 4",
            "cost": "30 / 35 / 40 / 45 / 50",
            "stats": "사거리 1000"
        },
        "W": {
            "v1": "?", // TotalDamage
            "cooldown": "0",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": "사거리 950"
        },
        "E": {
            "v1": "?", // StunDuration
            "cooldown": "20 / 18.5 / 17 / 15.5 / 14",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": "사거리 725"
        },
        "R": {
            "v1": "?", // MinDamage
            "v2": "?", // MaxDamage
            "cooldown": "120 / 90 / 60",
            "cost": "100",
            "stats": "사거리 650"
        },
    },
    "Jade_Veigar": { // 베이가
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // APPerStack
            "v3": "?", // APPerKill
            "v4": "?", // f1
            "cooldown": "8 / 7 / 6 / 5 / 4",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": "사거리 650"
        },
        "W": {
            "v1": "?", // TotalDamage
            "cooldown": "10",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": "사거리 950"
        },
        "E": {
            "v1": "?", // StunDuration
            "cooldown": "20 / 19 / 18 / 17 / 16",
            "cost": "80 / 90 / 100 / 110 / 120",
            "stats": "사거리 725"
        },
        "R": {
            "v1": "?", // MinDamage
            "cooldown": "130 / 110 / 90",
            "cost": "125 / 175 / 225",
            "stats": "사거리 650"
        },
    },
    "Vayne": { // 베인
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // ADRatioBonus
            "cooldown": "6 / 5 / 4 / 3 / 2",
            "cost": "30",
            "stats": "사거리 300"
        },
        "W": {
            "v1": "?", // TotalDamage
            "cooldown": "0",
            "cost": "",
            "stats": "사거리 750"
        },
        "E": {
            "v1": "?", // TotalDamage
            "v2": "?", // EmpoweredDamageTT
            "v3": "?", // StunDuration
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "90",
            "stats": "사거리 550"
        },
        "R": {
            "v1": "?", // BaseDuration
            "v2": "?", // BonusAttackDamage
            "v3": "?", // DamagedMarkerDuration
            "v4": "?", // DurationToAdd
            "v5": "?", // MovementSpeed
            "v6": "?", // TumbleCDReduction
            "v7": "?", // TumbleStealthDuration
            "cooldown": "100 / 85 / 70",
            "cost": "80",
            "stats": "사거리 1"
        },
    },
    "Jade_Vayne": { // 베인
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // BuffDuration
            "v2": "?", // ScalingDamageTotal
            "cooldown": "6 / 5 / 4 / 3 / 2",
            "cost": "30",
            "stats": "사거리 300"
        },
        "W": {
            "v1": "?", // BaseDamage
            "v2": "?", // MaxHealthRatio*100
            "cooldown": "0",
            "cost": "",
            "stats": "사거리 750"
        },
        "E": {
            "v1": "?", // TotalDamage
            "v2": "?", // TotalDamagewithSpell
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "90",
            "stats": "사거리 550"
        },
        "R": {
            "v1": "?", // Duration
            "v2": "?", // ADMod
            "cooldown": "100 / 85 / 70",
            "cost": "80",
            "stats": "사거리 1"
        },
    },
    "Vex": { // 벡스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // QDamageCalc
            "cooldown": "8 / 7 / 6 / 5 / 4",
            "cost": "45 / 50 / 55 / 60 / 65",
            "stats": "사거리 1200"
        },
        "W": {
            "v1": "?", // ShieldDuration
            "v2": "?", // ShieldCalc
            "v3": "?", // WDamageCalc
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "75",
            "stats": "사거리 475"
        },
        "E": {
            "v1": "?", // EDamageCalc
            "v2": "?", // SlowDuration
            "v3": "?", // SlowAmount*100
            "v4": "?", // GloomCDNonChampTooltip*100
            "cooldown": "12",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": "사거리 800"
        },
        "R": {
            "cooldown": "140 / 120 / 100",
            "cost": "100",
            "stats": "사거리 2000 / 2500 / 3000"
        },
    },
    "Belveth": { // 벨베스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // BaseDamage
            "v2": "?", // f1
            "cooldown": "4 / 3.25 / 2.5 / 1.75 / 1",
            "cost": "-",
            "stats": "사거리 450"
        },
        "W": {
            "v1": "?", // Damage
            "v2": "?", // Duration
            "v3": "?", // SlowDuration
            "v4": "?", // SlowPercent*100
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "-",
            "stats": "사거리 715"
        },
        "E": {
            "v1": "?", // TotalDuration
            "v2": "?", // DRPercent*100
            "v3": "?", // TotalLifesteal
            "v4": "?", // f2.0
            "v5": "?", // DamagePerStrike
            "v6": "?", // MaxDamagePerStrikeTooltip
            "cooldown": "24 / 21 / 18 / 15 / 12",
            "cost": "-",
            "stats": "사거리 500"
        },
        "R": {
            "v1": "?", // FinalOnHitDamage
            "v2": "?", // PassiveStacksOnDevour
            "v3": "?", // TotalExplosionDamage
            "v4": "?", // MissingHealthDamage*100
            "v5": "?", // MaxHealthOnDevour
            "v6": "?", // BonusAARange
            "v7": "?", // TotalASMod*100
            "v8": "?", // SteroidDuration
            "v9": "?", // StackThresholdForUpgrade
            "v10": "?", // SteroidDurationUpgrade
            "v11": "?", // StackThresholdForPermanent
            "cooldown": "1",
            "cost": "-",
            "stats": "사거리 450"
        },
    },
    "Velkoz": { // 벨코즈
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // SlowAmount*100
            "v3": "?", // SlowDuration
            "v4": "?", // TooltipManaRefund
            "cooldown": "7",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": "사거리 1050"
        },
        "W": {
            "v1": "?", // InitialDamage
            "v2": "?", // SecondaryDamage
            "v3": "?", // AmmoRechargeTime
            "cooldown": "1.5",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 1050"
        },
        "E": {
            "v1": "?", // StunDuration
            "v2": "?", // TotalDamage
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 810"
        },
        "R": {
            "v1": "?", // TotalDamage
            "v2": "?", // Effect3Amount
            "cooldown": "100 / 90 / 80",
            "cost": "100",
            "stats": "사거리 1575"
        },
    },
    "Volibear": { // 볼리베어
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // Duration
            "v2": "?", // MinSpeedCalc
            "v3": "?", // MaxSpeedCalc
            "v4": "?", // CalculatedDamage
            "v5": "?", // StunDuration
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "50",
            "stats": "사거리 300"
        },
        "W": {
            "v1": "?", // TotalDamage
            "v2": "?", // MarkDuration
            "v3": "?", // EmpoweredDamage
            "v4": "?", // BaseHeal
            "v5": "?", // PercentMissingHealthHealingRatio
            "cooldown": "5",
            "cost": "20 / 25 / 30 / 35 / 40",
            "stats": "사거리 325"
        },
        "E": {
            "v1": "?", // TotalDamageTooltip
            "v2": "?", // PercentDamage*100
            "v3": "?", // SlowDuration
            "v4": "?", // SlowAmount*100
            "v5": "?", // ShieldDuration
            "v6": "?", // ShieldAPRatioTooltip
            "v7": "?", // ShieldAmount*100
            "cooldown": "16",
            "cost": "50",
            "stats": "사거리 1200"
        },
        "R": {
            "v1": "?", // TransformDuration
            "v2": "?", // HealthAmount
            "v3": "?", // BonusAttackRange
            "v4": "?", // TowerDisableDuration
            "v5": "?", // TowerDamageTooltip
            "v6": "?", // SlowAmount*100
            "v7": "?", // SweetSpotDamageTooltip
            "cooldown": "160 / 135 / 110",
            "cost": "100",
            "stats": "사거리 550"
        },
    },
    "Braum": { // 브라움
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // InitialSlow
            "v3": "?", // SlowDuration
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "45 / 50 / 55 / 60 / 65",
            "stats": "사거리 1000"
        },
        "W": {
            "v1": "?", // Duration
            "v2": "?", // GrantedAllyArmor
            "v3": "?", // GrantedAllyMR
            "v4": "?", // GrantedBraumArmor
            "v5": "?", // GrantedBraumMR
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "40",
            "stats": "사거리 650"
        },
        "E": {
            "v1": "?", // ShieldHoldDuration
            "v2": "?", // ShieldFacingDRAmount
            "v3": "?", // MoveSpeedPercent
            "cooldown": "16 / 14 / 12 / 10 / 8",
            "cost": "30 / 35 / 40 / 45 / 50",
            "stats": "사거리 25000"
        },
        "R": {
            "v1": "?", // TotalDamage
            "v2": "?", // MinKnockup
            "v3": "?", // MaxKnockup
            "v4": "?", // SlowZoneDuration
            "v5": "?", // MoveSpeedMod
            "cooldown": "130 / 115 / 100",
            "cost": "100",
            "stats": "사거리 1250"
        },
    },
    "Briar": { // 브라이어
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // StunDuration
            "v3": "?", // ShredDuration
            "v4": "?", // ShredPercent*100
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "",
            "stats": "사거리 475"
        },
        "W": {
            "v1": "?", // BerserkDuration
            "v2": "?", // BerserkAS*100
            "v3": "?", // BerserkMS*100
            "v4": "?", // TotalAoEDamage
            "v5": "?", // TotalAttackBonusDamage
            "v6": "?", // TotalAttackPercentMissingHealth
            "v7": "?", // AttackMaxHPHeal
            "v8": "?", // AttackHealPercent*100
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "",
            "stats": "사거리 350"
        },
        "E": {
            "v1": "?", // PercentMaxHPHeal
            "v2": "?", // DRPercent
            "v3": "?", // Damage
            "v4": "?", // SlowDuration
            "v5": "?", // SlowPercent*100
            "v6": "?", // WallHitDamage
            "v7": "?", // WallStunDuration
            "cooldown": "16",
            "cost": "",
            "stats": "사거리 400"
        },
        "R": {
            "v1": "?", // Damage
            "v2": "?", // FearDuration
            "v3": "?", // TotalResists
            "v4": "?", // LifeStealPercent*100
            "v5": "?", // ExtraMoveSpeedPercent*100
            "cooldown": "120 / 100 / 80",
            "cost": "",
            "stats": "사거리 12000"
        },
    },
    "Brand": { // 브랜드
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // StunDuration
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "70",
            "stats": "사거리 1050"
        },
        "W": {
            "v1": "?", // TotalDamage
            "v2": "?", // EmpoweredDamage
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": "사거리 900"
        },
        "E": {
            "v1": "?", // EDamageCalc
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "90",
            "stats": "사거리 625"
        },
        "R": {
            "v1": "?", // TotalDamage
            "v2": "?", // SlowAmount
            "cooldown": "100 / 90 / 80",
            "cost": "100",
            "stats": "사거리 750"
        },
    },
    "Jade_Brand": { // 브랜드
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "50",
            "stats": "사거리 1050"
        },
        "W": {
            "v1": "?", // TotalDamage
            "v2": "?", // EmpoweredDamage
            "cooldown": "10",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": "사거리 900"
        },
        "E": {
            "v1": "?", // TotalDamage
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": "사거리 625"
        },
        "R": {
            "v1": "?", // Bounces
            "v2": "?", // TotalDamage
            "cooldown": "105 / 90 / 75",
            "cost": "100",
            "stats": "사거리 750"
        },
    },
    "Vladimir": { // 블라디미르
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // BaseDamageTooltip
            "v2": "?", // BaseHealTooltip
            "v3": "?", // MovementSpeedOnQ2
            "v4": "?", // Effect8Amount
            "v5": "?", // EmpoweredDamageTooltip
            "v6": "?", // EmpoweredHealTooltip
            "v7": "?", // EmpoweredHealPercentTooltip
            "cooldown": "9 / 7.9 / 6.8 / 5.7 / 4.6",
            "cost": "-",
            "stats": "사거리 600"
        },
        "W": {
            "v1": "?", // HasteBoost*100
            "v2": "?", // HasteDuration
            "v3": "?", // MoveSpeedMod*-100
            "v4": "?", // TotalDamage
            "v5": "?", // TotalHeal
            "cooldown": "28 / 25 / 22 / 19 / 16",
            "cost": "",
            "stats": "사거리 350"
        },
        "E": {
            "v1": "?", // ChargeHealthTooltip
            "v2": "?", // MinDamageTooltip
            "v3": "?", // MaxDamageTooltip
            "v4": "?", // SlowPercent
            "cooldown": "13 / 11 / 9 / 7 / 5",
            "cost": "",
            "stats": "사거리 600"
        },
        "R": {
            "v1": "?", // Effect4Amount
            "v2": "?", // Effect2Amount
            "v3": "?", // Damage
            "v4": "?", // SecondaryHealingTooltip
            "cooldown": "120",
            "cost": "-",
            "stats": "사거리 625"
        },
    },
    "Blitzcrank": { // 블리츠크랭크
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "cooldown": "20 / 19 / 18 / 17 / 16",
            "cost": "100",
            "stats": "사거리 1079"
        },
        "W": {
            "v1": "?", // Duration
            "v2": "?", // MoveSpeedMod*100
            "v3": "?", // AttackSpeedMod*100
            "v4": "?", // SlowDuration
            "v5": "?", // MoveSpeedModReduction*100
            "cooldown": "15",
            "cost": "75",
            "stats": "사거리 1"
        },
        "E": {
            "v1": "?", // CCDuration
            "v2": "?", // TotalDamage
            "cooldown": "7 / 6.5 / 6 / 5.5 / 5",
            "cost": "25",
            "stats": "사거리 300"
        },
        "R": {
            "v1": "?", // PassiveDamage
            "v2": "?", // ActiveDamage
            "v3": "?", // SilenceDuration
            "cooldown": "60 / 40 / 20",
            "cost": "100",
            "stats": "사거리 600"
        },
    },
    "Jade_Blitzcrank": { // 블리츠크랭크
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "cooldown": "20 / 19 / 18 / 17 / 16",
            "cost": "120",
            "stats": "사거리 1079"
        },
        "W": {
            "v1": "?", // duration
            "v2": "?", // MoveSpeedMod*100
            "v3": "?", // AttackSpeedMod*100
            "cooldown": "15",
            "cost": "75",
            "stats": "사거리 1"
        },
        "E": {
            "v1": "?", // TotalDamage
            "v2": "?", // CCDuration
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "25",
            "stats": "사거리 300"
        },
        "R": {
            "v1": "?", // PassiveDamage
            "v2": "?", // ActiveDamage
            "cooldown": "30",
            "cost": "150",
            "stats": "사거리 600"
        },
    },
    "Viego": { // 비에고
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalPercentHealthOnHit
            "v2": "?", // SecondAttackDamage
            "v3": "?", // HealModVsChamps*100
            "v4": "?", // TotalDamage
            "cooldown": "5 / 4.5 / 4 / 3.5 / 3",
            "cost": "-",
            "stats": "사거리 600"
        },
        "W": {
            "v1": "?", // SelfSlowPercent*100
            "v2": "?", // TotalDamage
            "v3": "?", // Stunduration
            "v4": "?", // MaxStunTT
            "cooldown": "8",
            "cost": "-",
            "stats": "사거리 400"
        },
        "E": {
            "v1": "?", // MistDuration
            "v2": "?", // TotalMoveSpeed
            "v3": "?", // AttackSpeed*100
            "cooldown": "14 / 12 / 10 / 8 / 6",
            "cost": "-",
            "stats": "사거리 750"
        },
        "R": {
            "v1": "?", // SlowPercent*100
            "v2": "?", // TotalDamage
            "v3": "?", // TotalPercentHealth
            "cooldown": "120 / 100 / 80",
            "cost": "-",
            "stats": "사거리 500"
        },
    },
    "Viktor": { // 빅토르
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalMissileDamage
            "v2": "?", // BuffDuration
            "v3": "?", // ShieldLevelScaling
            "v4": "?", // AttackTotalDMG
            "v5": "?", // TotalAugmentedShieldValue
            "v6": "?", // AugmentMoveSpeedBonus
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "45 / 50 / 55 / 60 / 65",
            "stats": "사거리 600"
        },
        "W": {
            "v1": "?", // FieldDuration
            "v2": "?", // SlowPotency*-1
            "v3": "?", // StunDuration
            "v4": "?", // AugmentSlow
            "cooldown": "17 / 16 / 15 / 14 / 13",
            "cost": "65",
            "stats": "사거리 800"
        },
        "E": {
            "v1": "?", // LaserDamage
            "v2": "?", // AftershockDamage
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": "사거리 525"
        },
        "R": {
            "v1": "?", // StormDuration
            "v2": "?", // InitialBurstDamage
            "v3": "?", // SubsequentBurstDamage
            "v4": "?", // AugmentBoost*100
            "v5": "?", // Tooltip_DurationExtension
            "v6": "?", // MaxGrowths
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": "사거리 700"
        },
    },
    "Poppy": { // 뽀삐
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // BaseDamage
            "v2": "?", // HealthDamagePercent
            "v3": "?", // Slow_
            "v4": "?", // DelayBetweenTwoHits
            "cooldown": "8 / 7 / 6 / 5 / 4",
            "cost": "35 / 40 / 45 / 50 / 55",
            "stats": "사거리 430"
        },
        "W": {
            "v1": "?", // BonusArmor
            "v2": "?", // BonusMR
            "v3": "?", // PassiveEmpoweredHealthPercent*100
            "v4": "?", // Haste
            "v5": "?", // Duration
            "v6": "?", // GroundingDuration
            "v7": "?", // SlowAmount*-100
            "v8": "?", // InterruptDamage
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "50",
            "stats": "사거리 400"
        },
        "E": {
            "v1": "?", // TackleDamage
            "v2": "?", // StunDuration
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "70",
            "stats": "사거리 475"
        },
        "R": {
            "v1": "?", // ChannelMaxDuration
            "v2": "?", // SelfSlow
            "v3": "?", // Damage
            "v4": "?", // HalfDamage
            "v5": "?", // KnockupDurationSnap
            "cooldown": "140 / 120 / 100",
            "cost": "100",
            "stats": "사거리 500"
        },
    },
    "Samira": { // 사미라
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // DamageCalc
            "cooldown": "6 / 5 / 4 / 3 / 2",
            "cost": "30",
            "stats": "사거리 950"
        },
        "W": {
            "v1": "?", // SlashDuration
            "v2": "?", // DamageCalc
            "cooldown": "30 / 28 / 26 / 24 / 22",
            "cost": "60",
            "stats": "사거리 325"
        },
        "E": {
            "v1": "?", // DashDamage
            "v2": "?", // AttackSpeedDuration
            "v3": "?", // BonusAttackSpeed*100
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "40",
            "stats": "사거리 600"
        },
        "R": {
            "v1": "?", // DamageCalc
            "v2": "?", // LifestealMod*100
            "cooldown": "5",
            "cost": "",
            "stats": "사거리 600"
        },
    },
    "Sion": { // 사이온
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // MinDamageTotal
            "v2": "?", // MaxDamageTotal
            "v3": "?", // BaseStunTime
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "45",
            "stats": "사거리 10000"
        },
        "W": {
            "v1": "?", // HPPerKill
            "v2": "?", // HPPerChampKill
            "v3": "?", // TotalShield
            "v4": "?", // DetonateRecastCooldown
            "v5": "?", // TotalDamage
            "v6": "?", // MaxHPDamageRatio
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "75 / 80 / 85 / 90 / 95",
            "stats": "사거리 500"
        },
        "E": {
            "v1": "?", // TotalDamage
            "v2": "?", // SlowDuration
            "v3": "?", // SlowAmount
            "v4": "?", // ArmorShredDuration
            "v5": "?", // ArmorShred
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "35 / 40 / 45 / 50 / 55",
            "stats": "사거리 800"
        },
        "R": {
            "v1": "?", // MinDamageTotal
            "v2": "?", // MaxDamageTotal
            "v3": "?", // MinStunDuration
            "v4": "?", // MaxStunDuration
            "v5": "?", // SlowAmount
            "cooldown": "140 / 100 / 60",
            "cost": "100",
            "stats": "사거리 7500"
        },
    },
    "Jade_Sion": { // 사이온
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "100",
            "stats": "사거리 550"
        },
        "W": {
            "v1": "?", // TotalShield
            "v2": "?", // TotalDamage
            "cooldown": "8",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": "사거리 100"
        },
        "E": {
            "v1": "?", // BonusDamage
            "v2": "?", // HPGainReduced
            "v3": "?", // f1
            "cooldown": "0",
            "cost": ""
        },
        "R": {
            "v1": "?", // LifestealPercent*100
            "v2": "?", // AttackSpeedMod*100
            "v3": "?", // HealPercent*100
            "cooldown": "90",
            "cost": "100",
            "stats": "사거리 100"
        },
    },
    "Sylas": { // 사일러스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // Damage
            "v2": "?", // SlowDuration
            "v3": "?", // SlowAmountCalc
            "v4": "?", // ExplosionDamage
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "55",
            "stats": "사거리 775"
        },
        "W": {
            "v1": "?", // MinDamage
            "v2": "?", // MinHealing
            "v3": "?", // MaxHealing
            "v4": "?", // MaxExecuteThreshold*100
            "cooldown": "12 / 10.5 / 9 / 7.5 / 6",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": "사거리 400"
        },
        "E": {
            "v1": "?", // Damage
            "v2": "?", // KnockUpDuration
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "65",
            "stats": "사거리 400"
        },
        "R": {
            "v1": "?", // PerTargetCooldown
            "v2": "?", // MinimumEnemyCooldown
            "cooldown": "80 / 55 / 30",
            "cost": "75",
            "stats": "사거리 950"
        },
    },
    "Shaco": { // 샤코
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // StealthDuration
            "v2": "?", // TotalDamage
            "v3": "?", // QCritDamageMod
            "cooldown": "13 / 12.5 / 12 / 11.5 / 11",
            "cost": "40",
            "stats": "사거리 400"
        },
        "W": {
            "v1": "?", // ArmTime
            "v2": "?", // TrapDuration
            "v3": "?", // FearDuration
            "v4": "?", // MinionFearDuration
            "v5": "?", // AoEDamage
            "v6": "?", // STDamage
            "v7": "?", // MonsterBonusDamage
            "cooldown": "15",
            "cost": "70 / 65 / 60 / 55 / 50",
            "stats": "사거리 500"
        },
        "E": {
            "v1": "?", // SlowDurationPassive
            "v2": "?", // SlowAmount*-100
            "v3": "?", // TotalDamage
            "v4": "?", // SlowDurationActive
            "v5": "?", // ExecuteHealthThreshold*100
            "v6": "?", // TotalExecuteDamage
            "cooldown": "8",
            "cost": "75",
            "stats": "사거리 625"
        },
        "R": {
            "v1": "?", // CloneLifetime
            "v2": "?", // ExplosionTotalDamage
            "v3": "?", // CloneAADamagePercent*100
            "v4": "?", // CloneIncomingDamagePercent*100
            "v5": "?", // AoEDamage
            "v6": "?", // STDamage
            "v7": "?", // BoxFearDuration
            "cooldown": "100 / 90 / 80",
            "cost": "100",
            "stats": "사거리 200"
        },
    },
    "Jade_Shaco": { // 샤코
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // EnhancedAttackDuration
            "v2": "?", // ModifiedQCritDamageTooltip
            "cooldown": "11",
            "cost": "90 / 80 / 70 / 60 / 50",
            "stats": "사거리 400"
        },
        "W": {
            "v1": "?", // StealthTImer
            "v2": "?", // TrapDuration
            "v3": "?", // FearDuration
            "v4": "?", // TrapTriggeredLifetime
            "v5": "?", // BoxTotalDamage_Jade
            "cooldown": "16",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 425"
        },
        "E": {
            "v1": "?", // SlowDurationPassive
            "v2": "?", // SlowAmount*-100
            "v3": "?", // MissChance*100
            "v4": "?", // TotalDamage
            "v5": "?", // SlowDurationActive
            "cooldown": "8",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 625"
        },
        "R": {
            "v1": "?", // CloneLifetime
            "v2": "?", // CloneAADamagePercent*100
            "v3": "?", // Jade_ShacoDamageTakenTooltip*100
            "v4": "?", // ExplosionTotalDamage
            "cooldown": "100 / 90 / 80",
            "cost": "100",
            "stats": "사거리 200"
        },
    },
    "Senna": { // 세나
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // SlowDuration
            "v3": "?", // TotalSlow
            "v4": "?", // TotalHeal
            "v5": "?", // CDReductionOnHit
            "cooldown": "15",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": "사거리 600"
        },
        "W": {
            "v1": "?", // Damage
            "v2": "?", // DelayTime
            "v3": "?", // RootDuration
            "cooldown": "11",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 1250"
        },
        "E": {
            "v1": "?", // BuffDuration
            "v2": "?", // TotalMS
            "cooldown": "26 / 24.5 / 23 / 21.5 / 20",
            "cost": "70",
            "stats": "사거리 400"
        },
        "R": {
            "v1": "?", // TotalDamage
            "v2": "?", // ShieldDuration
            "v3": "?", // TotalShield
            "cooldown": "140 / 120 / 100",
            "cost": "100",
            "stats": "사거리 25000"
        },
    },
    "Seraphine": { // 세라핀
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // ExplosionDamage
            "v2": "?", // ExecuteThreshold*100
            "v3": "?", // TotalEmpoweredDamage
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": "사거리 900"
        },
        "W": {
            "v1": "?", // ShieldDuration
            "v2": "?", // HasteValueAllies
            "v3": "?", // WMSBonusTotal
            "v4": "?", // ShieldValueSeraphine
            "v5": "?", // WHealSplitDelay
            "v6": "?", // WMissingHPHeal
            "cooldown": "22",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": "사거리 800"
        },
        "E": {
            "v1": "?", // FinalDamage
            "v2": "?", // SlowDuration
            "v3": "?", // SlowValue
            "cooldown": "11 / 10.5 / 10 / 9.5 / 9",
            "cost": "60",
            "stats": "사거리 1300"
        },
        "R": {
            "v1": "?", // RChannelDuration
            "v2": "?", // R1TotalDamage
            "cooldown": "160 / 140 / 120",
            "cost": "100",
            "stats": "사거리 25000"
        },
    },
    "Sejuani": { // 세주아니
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamageTooltip
            "v2": "?", // KnockupDurationTOOLTIPONLY
            "cooldown": "18 / 16.5 / 15 / 13.5 / 12",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": "사거리 650"
        },
        "W": {
            "v1": "?", // FirstHitDamageTooltip
            "v2": "?", // SecondHitDamageTooltip
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "60",
            "stats": "사거리 600"
        },
        "E": {
            "v1": "?", // TotalDamage
            "v2": "?", // CCDuration
            "cooldown": "1.5",
            "cost": "20",
            "stats": "사거리 560"
        },
        "R": {
            "v1": "?", // BaseStunDuration
            "v2": "?", // MinorDamageTooltip
            "v3": "?", // EmpoweredStunDuration
            "v4": "?", // ZoneDuration
            "v5": "?", // ExplosionSlowAmount
            "v6": "?", // TotalDamageTooltip
            "cooldown": "120 / 105 / 90",
            "cost": "100",
            "stats": "사거리 1300"
        },
    },
    "Sett": { // 세트
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // MSDuration
            "v2": "?", // MSAmount*100
            "v3": "?", // BaseDamage
            "v4": "?", // MaxHealthDamageCalc
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "-"
        },
        "W": {
            "v1": "?", // DamageStored*100
            "v2": "?", // MaxGrit
            "v3": "?", // AdrenalineStorageWindow
            "v4": "?", // ShieldConversion*100
            "v5": "?", // ShieldMaxDuration
            "v6": "?", // DamageCalc
            "v7": "?", // DamageConversion
            "v8": "?", // f1
            "cooldown": "18 / 16.5 / 15 / 13.5 / 12",
            "cost": "-",
            "stats": "사거리 25000"
        },
        "E": {
            "v1": "?", // DamageCalc
            "v2": "?", // SlowDuration
            "v3": "?", // SlowAmount*100
            "v4": "?", // StunDuration
            "cooldown": "16 / 14.5 / 13 / 11.5 / 10",
            "cost": "-",
            "stats": "사거리 490"
        },
        "R": {
            "v1": "?", // DamageCalc
            "v2": "?", // MaxHealthDamage*100
            "v3": "?", // SlowDuration
            "v4": "?", // SlowAmount*100
            "cooldown": "120 / 100 / 80",
            "cost": "-",
            "stats": "사거리 400"
        },
    },
    "Sona": { // 소나
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // AuraDuration
            "v3": "?", // OnHitDuration
            "v4": "?", // TotalOnHitDamage
            "v5": "?", // TotalStaccatoDamage
            "cooldown": "8",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 825"
        },
        "W": {
            "v1": "?", // TotalHeal
            "v2": "?", // AuraDuration
            "v3": "?", // ShieldDuration
            "v4": "?", // TotalShield
            "v5": "?", // AccelerandoShieldBreakpoint
            "v6": "?", // DiminuendoDuration
            "v7": "?", // TotalDiminuendoWeakenPercent
            "cooldown": "10",
            "cost": "80 / 85 / 90 / 95 / 100",
            "stats": "사거리 1000"
        },
        "E": {
            "v1": "?", // SelfMovementSpeedDurationMin
            "v2": "?", // TotalSelfMovementSpeed
            "v3": "?", // SelfMovementSpeedDurationMax
            "v4": "?", // AuraDuration
            "v5": "?", // AllyMovementSpeedDuration
            "v6": "?", // TotalAllyMovementSpeed
            "v7": "?", // TempoDuration
            "v8": "?", // TotalTempoMoveSpeedSlow
            "cooldown": "14",
            "cost": "65",
            "stats": "사거리 430"
        },
        "R": {
            "v1": "?", // StunDuration
            "v2": "?", // TotalDamage
            "cooldown": "140 / 120 / 100",
            "cost": "100",
            "stats": "사거리 900"
        },
    },
    "Jade_Sona": { // 소나
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // APADBoost
            "v2": "?", // EnemiesToHit
            "v3": "?", // TotalDamage
            "cooldown": "7",
            "cost": "65 / 70 / 75 / 80 / 85",
            "stats": "사거리 825"
        },
        "W": {
            "v1": "?", // ARMRBoost
            "v2": "?", // Healing
            "cooldown": "7",
            "cost": "65 / 70 / 75 / 80 / 85",
            "stats": "사거리 1000"
        },
        "E": {
            "v1": "?", // MSBoost
            "v2": "?", // ActiveSpeedDuration
            "v3": "?", // MoveSpeedMod*100
            "cooldown": "7",
            "cost": "65 / 70 / 75 / 80 / 85",
            "stats": "사거리 1000"
        },
        "R": {
            "v1": "?", // TotalDamage
            "cooldown": "170 / 150 / 130",
            "cost": "100",
            "stats": "사거리 900"
        },
    },
    "Soraka": { // 소라카
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // SlowDuration
            "v3": "?", // MoveSpeedSlow*100
            "v4": "?", // HoTDuration
            "v5": "?", // TotalHoT
            "v6": "?", // MoveSpeedHaste*100
            "cooldown": "8 / 7 / 6 / 5 / 4",
            "cost": "45 / 50 / 55 / 60 / 65",
            "stats": "사거리 810"
        },
        "W": {
            "v1": "?", // TotalHeal
            "v2": "?", // PercentHealthCostRefund*100
            "cooldown": "6 / 5 / 4 / 3 / 2",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": "사거리 550"
        },
        "E": {
            "v1": "?", // TotalDamage
            "v2": "?", // RootDelay
            "v3": "?", // RootDuration
            "cooldown": "20 / 19 / 18 / 17 / 16",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": "사거리 925"
        },
        "R": {
            "v1": "?", // HealingCalc
            "v2": "?", // AmpedHealing
            "cooldown": "150 / 135 / 120",
            "cost": "100",
            "stats": "사거리 25000"
        },
    },
    "Jade_Soraka": { // 소라카
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // DebuffDuration
            "v3": "?", // Shred*-1
            "v4": "?", // MaxStacks
            "cooldown": "2.5",
            "cost": "20 / 35 / 50 / 65 / 80",
            "stats": "사거리 625"
        },
        "W": {
            "v1": "?", // TotalHeal
            "v2": "?", // Armour
            "cooldown": "20",
            "cost": "80 / 110 / 140 / 170 / 200",
            "stats": "사거리 750"
        },
        "E": {
            "v1": "?", // Mana
            "v2": "?", // TotalDamage
            "v3": "?", // Duration
            "cooldown": "10",
            "cost": "",
            "stats": "사거리 725"
        },
        "R": {
            "v1": "?", // HealingCalc
            "cooldown": "160 / 145 / 130",
            "cost": "100 / 175 / 250",
            "stats": "사거리 25000"
        },
    },
    "Shen": { // 쉔
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // SlowDuration
            "v2": "?", // SlowPercent
            "v3": "?", // NumEnhancedAttacks
            "v4": "?", // BaseFlatDamage
            "v5": "?", // BasePercentHealth
            "v6": "?", // EmpPercentHealth
            "v7": "?", // SteroidAS
            "cooldown": "8 / 7.25 / 6.5 / 5.75 / 5",
            "cost": "140 / 130 / 120 / 110 / 100",
            "stats": "사거리 400"
        },
        "W": {
            "v1": "?", // ZoneDuration
            "v2": "?", // ZoneDelay
            "cooldown": "16 / 14.5 / 13 / 11.5 / 10",
            "cost": "40",
            "stats": "사거리 400"
        },
        "E": {
            "v1": "?", // EnergyRefund
            "v2": "?", // CCDuration
            "v3": "?", // TauntDamage
            "cooldown": "18 / 16 / 14 / 12 / 10",
            "cost": "150",
            "stats": "사거리 600"
        },
        "R": {
            "v1": "?", // ShieldDuration
            "v2": "?", // Shield
            "v3": "?", // MaxShield
            "v4": "?", // ChannelDuration
            "cooldown": "200 / 180 / 160",
            "cost": "-",
            "stats": "사거리 35000"
        },
    },
    "Shyvana": { // 쉬바나
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // Calc_Max_Health_Damage
            "v2": "?", // Cooldown_Reduction
            "v3": "?", // Calc_Damage
            "v4": "?", // RecastDuration
            "v5": "?", // Calc_Dragon_Form_Damage
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "-",
            "stats": "사거리 25000"
        },
        "W": {
            "v1": "?", // Duration
            "v2": "?", // Calc_Shield
            "v3": "?", // Calc_Shield_Per_Nearby_Champion
            "v4": "?", // MoveSpeed
            "v5": "?", // MoveSpeedTowardsEnemies
            "v6": "?", // Damage
            "v7": "?", // Calc_Base_Heal
            "v8": "?", // Calc_Missing_Health_Heal
            "cooldown": "13 / 12.25 / 11.5 / 10.75 / 10",
            "cost": "-",
            "stats": "사거리 350"
        },
        "E": {
            "v1": "?", // Damage
            "v2": "?", // Calc_Max_Health_Damage
            "v3": "?", // SlowDuration
            "v4": "?", // Calc_Slow
            "v5": "?", // Calc_Dragon_Damage
            "v6": "?", // Calc_Max_Health_Dragon_Damage
            "v7": "?", // Calc_Slow_Dragon
            "v8": "?", // GroundLingerDuration
            "v9": "?", // DamagePerSecond
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "-",
            "stats": "사거리 800"
        },
        "R": {
            "v1": "?", // Fury_Generation
            "v2": "?", // TT_Fury_Mult
            "v3": "?", // TT_Fury_AoE_Penalty
            "v4": "?", // Damage
            "v5": "?", // FearDuration
            "v6": "?", // Calc_Bonus_Health
            "cooldown": "0",
            "cost": "",
            "stats": "사거리 1050"
        },
    },
    "Smolder": { // 스몰더
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // ManaRestore
            "v3": "?", // StackTier1
            "v4": "?", // StackTier2
            "v5": "?", // Tier2_BlowbackPercentageDamage
            "v6": "?", // Tier2_NumberOfBlowback
            "v7": "?", // StackTier3
            "v8": "?", // Tier3_DotLength
            "v9": "?", // Tier3_Burn
            "v10": "?", // Tier3_ExecuteThreshold
            "cooldown": "5.5 / 5 / 4.5 / 4 / 3.5",
            "cost": "25",
            "stats": "사거리 550"
        },
        "W": {
            "v1": "?", // InitialDamage
            "v2": "?", // SlowDuration
            "v3": "?", // SlowAmount*100
            "v4": "?", // ExplosionDamage
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 1500"
        },
        "E": {
            "v1": "?", // Duration
            "v2": "?", // MoveSpeed*100
            "v3": "?", // TotalNumberOfAttacks
            "v4": "?", // DamagePerHit
            "cooldown": "24 / 22 / 20 / 18 / 16",
            "cost": "65",
            "stats": "사거리 700"
        },
        "R": {
            "v1": "?", // TotalDamage
            "v2": "?", // TooltipOnly_TotalSweetspotDamage
            "v3": "?", // SlowDuration
            "v4": "?", // SlowAmount*100
            "v5": "?", // MomHealCalc
            "cooldown": "120 / 110 / 100",
            "cost": "100",
            "stats": "사거리 4200"
        },
    },
    "Swain": { // 스웨인
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // InitialDamage
            "v2": "?", // ExtraBoltDamage
            "v3": "?", // MaxDamage
            "cooldown": "7 / 6 / 5 / 4 / 3",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": "사거리 750"
        },
        "W": {
            "v1": "?", // TotalDamage
            "v2": "?", // SlowDuration
            "v3": "?", // Slow*-100
            "v4": "?", // RevealDuration
            "cooldown": "22 / 21 / 20 / 19 / 18",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": "사거리 5500 / 6000 / 6500 / 7000 / 7500"
        },
        "E": {
            "v1": "?", // SecondaryDamage
            "v2": "?", // RootDuration
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 850"
        },
        "R": {
            "v1": "?", // DamageCalc
            "v2": "?", // HealingCalc
            "v3": "?", // DemonflareCastDelay
            "v4": "?", // DemonflareCooldownTooltip
            "v5": "?", // DemonflareDamageTotal
            "v6": "?", // DemonflareSlowAmount*100
            "v7": "?", // DemonflareSlowDuration
            "cooldown": "120",
            "cost": "100",
            "stats": "사거리 650"
        },
    },
    "Skarner": { // 스카너
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // AttackSpeed*100
            "v2": "?", // AbilityDamage
            "v3": "?", // MaxHPPercent*100
            "v4": "?", // SlowDuration
            "v5": "?", // SlowPercent*100
            "cooldown": "8 / 6.75 / 5.5 / 4.25 / 3",
            "cost": "30",
            "stats": "사거리 400"
        },
        "W": {
            "v1": "?", // ShieldDuration
            "v2": "?", // InitialShield
            "v3": "?", // Damage
            "v4": "?", // SlowDuration
            "v5": "?", // SlowEffect*-100
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": "사거리 700"
        },
        "E": {
            "v1": "?", // PinDamage
            "v2": "?", // StunDuration
            "cooldown": "22 / 21 / 20 / 19 / 18",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 1700"
        },
        "R": {
            "v1": "?", // Damage
            "v2": "?", // Duration
            "v3": "?", // SpeedBoostDuration
            "v4": "?", // SpeedBoostAmount*100
            "cooldown": "120 / 105 / 90",
            "cost": "100",
            "stats": "사거리 625"
        },
    },
    "Jade_Skarner": { // 스카너
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalBaseDamage
            "v2": "?", // TotalProcDamage
            "v3": "?", // SlowPercent*-100
            "cooldown": "3.5",
            "cost": "20 / 22 / 24 / 26 / 28",
            "stats": "사거리 325"
        },
        "W": {
            "v1": "?", // BlockDamage
            "v2": "?", // ASBonus*100
            "v3": "?", // MSBonus*100
            "cooldown": "18",
            "cost": "60",
            "stats": "사거리 700"
        },
        "E": {
            "v1": "?", // TotalDamage
            "v2": "?", // TotalHealing
            "cooldown": "10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 800"
        },
        "R": {
            "v1": "?", // TotaDamage
            "cooldown": "130 / 120 / 110",
            "cost": "100 / 125 / 150",
            "stats": "사거리 350"
        },
    },
    "Sivir": { // 시비르
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // FallOffMinimum*100
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "55 / 60 / 65 / 70 / 75",
            "stats": "사거리 1200"
        },
        "W": {
            "v1": "?", // BuffDuration
            "v2": "?", // RicochetAttackSpeed*100
            "v3": "?", // BounceDamage
            "v4": "?", // MaxBounces
            "cooldown": "12",
            "cost": "60",
            "stats": "사거리 20"
        },
        "E": {
            "v1": "?", // SpellShieldDuration
            "v2": "?", // TotalHeal
            "cooldown": "24 / 22.5 / 21 / 19.5 / 18",
            "cost": "",
            "stats": "사거리 20"
        },
        "R": {
            "v1": "?", // UltDuration
            "v2": "?", // MaxMS*100
            "v3": "?", // AttackCooldownRefund
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": "사거리 1000"
        },
    },
    "Jade_Sivir": { // 시비르
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // FallOffRatio*100
            "v3": "?", // FallOffMinimum*100
            "cooldown": "9",
            "cost": "80 / 90 / 100 / 110 / 120",
            "stats": "사거리 1200"
        },
        "W": {
            "v1": "?", // MaxBounces
            "v2": "?", // FallOffRatio*100
            "cooldown": "0.5",
            "cost": "",
            "stats": "사거리 20"
        },
        "E": {
            "v1": "?", // Duration
            "v2": "?", // ManaReturn
            "cooldown": "22 / 19 / 16 / 13 / 10",
            "cost": "75",
            "stats": "사거리 20"
        },
        "R": {
            "v1": "?", // UltDuration
            "v2": "?", // HuntAttackSpeed*100
            "v3": "?", // MS*100
            "v4": "?", // AlliedEffectiveness*100
            "cooldown": "100 / 90 / 80",
            "cost": "100",
            "stats": "사거리 1000"
        },
    },
    "XinZhao": { // 신 짜오
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // BonusDamage
            "v2": "?", // KnockUpDuration
            "cooldown": "7 / 6.5 / 6 / 5.5 / 5",
            "cost": "30",
            "stats": "사거리 375"
        },
        "W": {
            "v1": "?", // SlashDamage
            "v2": "?", // ThrustDamage
            "v3": "?", // TotalSlowDuration
            "v4": "?", // Effect6Amount*-100
            "v5": "?", // MarkDuration
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "60",
            "stats": "사거리 1000"
        },
        "E": {
            "v1": "?", // ChargeDamage
            "v2": "?", // SlowDuration
            "v3": "?", // SlowAmount
            "v4": "?", // ASDuration
            "v5": "?", // f1
            "cooldown": "11",
            "cost": "60",
            "stats": "사거리 650"
        },
        "R": {
            "v1": "?", // MarkDuration
            "v2": "?", // TotalDamage
            "v3": "?", // PercentCurrentHealthDamage*100
            "v4": "?", // MissileDefenseBaseDuration
            "cooldown": "120 / 110 / 100",
            "cost": "100",
            "stats": "사거리 500"
        },
    },
    "Syndra": { // 신드라
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // SphereDuration
            "v3": "?", // Upgrade1MaxAmmo
            "cooldown": "7",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": "사거리 800"
        },
        "W": {
            "v1": "?", // ThrowDamage
            "v2": "?", // f2
            "v3": "?", // TotalSlowAmount
            "v4": "?", // TOOLTIPONLYPassiveBonusPercent
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": "사거리 925"
        },
        "E": {
            "v1": "?", // TotalDamage
            "v2": "?", // StunDuration
            "v3": "?", // UpgradedSlowDuration
            "v4": "?", // UpgradedSlowAmount*100
            "cooldown": "15",
            "cost": "50",
            "stats": "사거리 650"
        },
        "R": {
            "v1": "?", // QHastePerRank
            "v2": "?", // DamageCalc
            "v3": "?", // MaxDamageCalc
            "v4": "?", // UpgradeExecuteThreshold*100
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": "사거리 675"
        },
    },
    "Singed": { // 신지드
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // DamagePerSecond
            "cooldown": "0",
            "cost": "13",
            "stats": "사거리 20"
        },
        "W": {
            "v1": "?", // WDuration
            "v2": "?", // SlowPercent
            "cooldown": "17 / 16 / 15 / 14 / 13",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": "사거리 1000"
        },
        "E": {
            "v1": "?", // BaseDamage
            "v2": "?", // MaxHPDamage
            "v3": "?", // RootDuration
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": "사거리 125"
        },
        "R": {
            "v1": "?", // Duration
            "v2": "?", // StatAmount
            "v3": "?", // GrievousDuration
            "v4": "?", // GrievousAmount*100
            "cooldown": "100",
            "cost": "100",
            "stats": "사거리 20"
        },
    },
    "Jade_Singed": { // 신지드
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // DamagePerSecond
            "cooldown": "0",
            "cost": "13",
            "stats": "사거리 20"
        },
        "W": {
            "v1": "?", // SlowPercent
            "cooldown": "14",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": "사거리 1000"
        },
        "E": {
            "v1": "?", // Damage
            "cooldown": "10",
            "cost": "100 / 110 / 120 / 130 / 140",
            "stats": "사거리 125"
        },
        "R": {
            "v1": "?", // Duration
            "v2": "?", // StatAmount
            "cooldown": "100",
            "cost": "150",
            "stats": "사거리 20"
        },
    },
    "Thresh": { // 쓰레쉬
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TauntLength
            "v2": "?", // TotalDamage
            "v3": "?", // HitBonusCooldown
            "cooldown": "19 / 16.5 / 14 / 11.5 / 9",
            "cost": "70",
            "stats": "사거리 1075"
        },
        "W": {
            "v1": "?", // ShieldDuration
            "v2": "?", // TotalShield
            "cooldown": "21 / 20 / 19 / 18 / 17",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 950"
        },
        "E": {
            "v1": "?", // PAttackDamageMin
            "v2": "?", // PAttackDamageMax
            "v3": "?", // SlowDuration
            "v4": "?", // ActiveSlowPercentage
            "v5": "?", // TotalDamage
            "cooldown": "13 / 12.25 / 11.5 / 10.75 / 10",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": "사거리 500"
        },
        "R": {
            "v1": "?", // SlowDuration
            "v2": "?", // SlowAmount
            "v3": "?", // TotalDamage
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": "사거리 450"
        },
    },
    "Ahri": { // 아리
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "cooldown": "7",
            "cost": "55 / 65 / 75 / 85 / 95",
            "stats": "사거리 970"
        },
        "W": {
            "v1": "?", // SingleFireDamage
            "v2": "?", // MultiFireDamage
            "v3": "?", // MovementSpeed*100
            "v4": "?", // MovementSpeedDuration
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "30",
            "stats": "사거리 700"
        },
        "E": {
            "v1": "?", // CharmDuration
            "v2": "?", // TotalDamage
            "cooldown": "12",
            "cost": "60",
            "stats": "사거리 975"
        },
        "R": {
            "v1": "?", // RMaxTargetsPerCast
            "v2": "?", // RCalculatedDamage
            "v3": "?", // RRecastWindow
            "v4": "?", // RMaxCasts
            "v5": "?", // PDurationExtension
            "cooldown": "140 / 120 / 100",
            "cost": "100",
            "stats": "사거리 450"
        },
    },
    "Jade_Ahri": { // 아리
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "cooldown": "7",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": "사거리 970"
        },
        "W": {
            "v1": "?", // TotalDamage
            "v2": "?", // HalfDamage
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "50",
            "stats": "사거리 700"
        },
        "E": {
            "v1": "?", // TotalDamage
            "v2": "?", // CharmDuration
            "v3": "?", // DamageAmpDuration
            "v4": "?", // DamageAmp
            "cooldown": "12",
            "cost": "50 / 65 / 80 / 95 / 110",
            "stats": "사거리 975"
        },
        "R": {
            "v1": "?", // TotalDamage
            "cooldown": "110 / 95 / 80",
            "cost": "100",
            "stats": "사거리 450"
        },
    },
    "Amumu": { // 아무무
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // StunDuration
            "v2": "?", // TotalDamage
            "cooldown": "3",
            "cost": "50",
            "stats": "사거리 1100"
        },
        "W": {
            "v1": "?", // BaseDamage
            "v2": "?", // TotalHealthDamage
            "cooldown": "1",
            "cost": "8",
            "stats": "사거리 300"
        },
        "E": {
            "v1": "?", // DamageReduction
            "v2": "?", // CDROnHit
            "v3": "?", // TantrumDamage
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "35",
            "stats": "사거리 350"
        },
        "R": {
            "v1": "?", // RDuration
            "v2": "?", // RCalculatedDamage
            "cooldown": "150 / 125 / 100",
            "cost": "100 / 150 / 200",
            "stats": "사거리 550"
        },
    },
    "Jade_Amumu": { // 아무무
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // StunDuration
            "v2": "?", // TotalDamage
            "cooldown": "16 / 14 / 12 / 10 / 8",
            "cost": "80 / 90 / 100 / 110 / 120",
            "stats": "사거리 1100"
        },
        "W": {
            "v1": "?", // BaseDamage
            "v2": "?", // TotalHealthDamage
            "cooldown": "1",
            "cost": "8",
            "stats": "사거리 300"
        },
        "E": {
            "v1": "?", // PassiveDamageReduction
            "v2": "?", // TantrumDamage
            "v3": "?", // CooldownReduction
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "35",
            "stats": "사거리 350"
        },
        "R": {
            "v1": "?", // DebuffDuration
            "v2": "?", // RCalculatedDamage
            "cooldown": "150 / 130 / 110",
            "cost": "100 / 150 / 200",
            "stats": "사거리 550"
        },
    },
    "AurelionSol": { // 아우렐리온 솔
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // MaxChannelDuration
            "v2": "?", // DamagePerSecond
            "v3": "?", // AOEModifier*100
            "v4": "?", // BurstDamage
            "v5": "?", // BurstBonusTrueDamageToChamps
            "v6": "?", // QMassStolen
            "cooldown": "3",
            "cost": "35 / 40 / 45 / 50 / 55",
            "stats": "사거리 750"
        },
        "W": {
            "v1": "?", // TrueDamageBonus*100
            "v2": "?", // ResetWindow
            "v3": "?", // TooltipTakedownCooldownMultiplier
            "cooldown": "22 / 20.5 / 19 / 17.5 / 16",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 1500"
        },
        "E": {
            "v1": "?", // DamagePerSecond
            "v2": "?", // Duration
            "v3": "?", // CurrentExecutionThreshold
            "cooldown": "12",
            "cost": "90",
            "stats": "사거리 750"
        },
        "R": {
            "v1": "?", // MaxDamageTooltip
            "v2": "?", // StunDuration
            "v3": "?", // MassStolen
            "v4": "?", // CalamityStacks
            "v5": "?", // R2Damage
            "v6": "?", // ShockwaveDamage
            "v7": "?", // ShockwaveSlow*100
            "cooldown": "120 / 110 / 100",
            "cost": "100",
            "stats": "사거리 1250"
        },
    },
    "Ivern": { // 아이번
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // RootDuration
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "60",
            "stats": "사거리 1125"
        },
        "W": {
            "v1": "?", // BuffDuration
            "v2": "?", // TotalDamage
            "v3": "?", // AllyBuffDuration
            "v4": "?", // TotalAllyDamage
            "v5": "?", // RevealDuration
            "v6": "?", // MaxBrushDuration
            "cooldown": "0.5",
            "cost": "30",
            "stats": "사거리 1150"
        },
        "E": {
            "v1": "?", // TotalShield
            "v2": "?", // ShieldDuration
            "v3": "?", // TotalDamage
            "v4": "?", // SlowDuration
            "v5": "?", // SlowAmount*100
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "70",
            "stats": "사거리 750"
        },
        "R": {
            "v1": "?", // DaisyDuration
            "v2": "?", // TotalShockwaveDamage
            "v3": "?", // ShockwaveCCDuration
            "v4": "?", // ShockwaveCD
            "cooldown": "140 / 130 / 120",
            "cost": "100",
            "stats": "사거리 600"
        },
    },
    "Azir": { // 아지르
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // SlowAmount*-100
            "cooldown": "14 / 12 / 10 / 8 / 6",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": "사거리 740"
        },
        "W": {
            "v1": "?", // Effect1Amount
            "v2": "?", // TotalDamage
            "v3": "?", // MaxAmmo
            "cooldown": "1.5",
            "cost": "40 / 35 / 30 / 25 / 20",
            "stats": "사거리 525"
        },
        "E": {
            "v1": "?", // Effect6Amount
            "v2": "?", // TotalShield
            "v3": "?", // TotalDamage
            "cooldown": "22 / 20.5 / 19 / 17.5 / 16",
            "cost": "60",
            "stats": "사거리 1100"
        },
        "R": {
            "v1": "?", // TotalDamage
            "v2": "?", // Effect4Amount
            "cooldown": "120 / 105 / 90",
            "cost": "100",
            "stats": "사거리 250"
        },
    },
    "Akali": { // 아칼리
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // Damage
            "v2": "?", // SlowDuration
            "v3": "?", // SlowPercentage*100
            "cooldown": "1.5",
            "cost": "110 / 100 / 90 / 80 / 70",
            "stats": "사거리 550"
        },
        "W": {
            "v1": "?", // BaseDuration
            "v2": "?", // MovementSpeed
            "v3": "?", // MovementSpeedDuration
            "v4": "?", // EnergyRestore
            "cooldown": "20 / 19 / 18 / 17 / 16",
            "cost": "",
            "stats": "사거리 350"
        },
        "E": {
            "v1": "?", // E1Damage
            "v2": "?", // E2DamageCalc
            "cooldown": "16 / 14.5 / 13 / 11.5 / 10",
            "cost": "30",
            "stats": "사거리 825"
        },
        "R": {
            "v1": "?", // Cast1Damage
            "v2": "?", // CooldownBetweenCasts
            "v3": "?", // Cast2DamageMin
            "v4": "?", // Cast2DamageMax
            "cooldown": "120 / 90 / 60",
            "cost": "-",
            "stats": "사거리 675"
        },
    },
    "Akshan": { // 아크샨
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // FinalDamage
            "v2": "?", // TotalHaste
            "v3": "?", // HasteDuration
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": "사거리 850"
        },
        "W": {
            "v1": "?", // GameModeInteger
            "cooldown": "18 / 14 / 10 / 6 / 2",
            "cost": "40 / 30 / 20 / 10 / 0",
            "stats": "사거리 5500"
        },
        "E": {
            "v1": "?", // DamageToDeal
            "cooldown": "18 / 16.5 / 15 / 13.5 / 12",
            "cost": "70",
            "stats": "사거리 800"
        },
        "R": {
            "v1": "?", // ChannelDuration
            "v2": "?", // NumberOfBullets
            "v3": "?", // DamagePerBulletWithCrit
            "v4": "?", // MaxDamagePerBullet
            "cooldown": "100 / 85 / 70",
            "cost": "100",
            "stats": "사거리 2500"
        },
    },
    "Aatrox": { // 아트록스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // QDamage
            "v2": "?", // QEdgeDamage
            "cooldown": "14 / 12 / 10 / 8 / 6",
            "cost": "-",
            "stats": "사거리 25000"
        },
        "W": {
            "v1": "?", // WSlowDuration
            "v2": "?", // WSlowPercentage*-100
            "v3": "?", // WDamage
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "-",
            "stats": "사거리 825"
        },
        "E": {
            "v1": "?", // TotalEVamp
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "-",
            "stats": "사거리 25000"
        },
        "R": {
            "v1": "?", // RMinionFearDuration
            "v2": "?", // RMovementSpeedBonus*100
            "v3": "?", // RDuration
            "v4": "?", // RTotalADAmp*100
            "v5": "?", // RHealingAmp*100
            "v6": "?", // RExtension
            "cooldown": "120 / 100 / 80",
            "cost": "-",
            "stats": "사거리 25000"
        },
    },
    "Aphelios": { // 아펠리오스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "cooldown": "9",
            "cost": "60",
            "stats": "사거리 1450"
        },
        "W": {
            "cooldown": "0.8",
            "cost": "-",
            "stats": "사거리 250"
        },
        "E": {
            "cooldown": "0",
            "cost": "",
            "stats": "사거리 1000"
        },
        "R": {
            "v1": "?", // MaxDamage
            "v2": "?", // f1
            "cooldown": "120 / 110 / 100",
            "cost": "100",
            "stats": "사거리 1300"
        },
    },
    "Alistar": { // 알리스타
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // KnockupDuration
            "v2": "?", // TotalDamage
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 365"
        },
        "W": {
            "v1": "?", // TotalDamage
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 650"
        },
        "E": {
            "v1": "?", // Duration
            "v2": "?", // TotalDamage
            "v3": "?", // MaxStacks
            "v4": "?", // StunDuration
            "v5": "?", // AttackBonusDamage
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 350"
        },
        "R": {
            "v1": "?", // RDuration
            "v2": "?", // RDamageReduction
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": "사거리 1"
        },
    },
    "Jade_Alistar": { // 알리스타
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // KnockupDuration
            "v2": "?", // TotalDamage
            "cooldown": "17 / 16 / 15 / 14 / 13",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": "사거리 365"
        },
        "W": {
            "v1": "?", // TotalDamage
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": "사거리 650"
        },
        "E": {
            "v1": "?", // TotalHeal
            "v2": "?", // AllyHeal
            "v3": "?", // NearbyDeathCDR
            "cooldown": "12",
            "cost": "40 / 50 / 60 / 70 / 80",
            "stats": "사거리 575"
        },
        "R": {
            "v1": "?", // BonusDamage
            "v2": "?", // RDuration
            "v3": "?", // RDamageReduction
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": "사거리 1"
        },
    },
    "Ambessa": { // 암베사
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // Calc_Damage_1_Max
            "v2": "?", // Calc_Damage_1_Percent_Max
            "v3": "?", // Calc_Damage_1_Min_Ratio
            "v4": "?", // Calc_Damage_2_Max
            "v5": "?", // Calc_Damage_2_Percent_Max
            "v6": "?", // Calc_Damage_2_Min_Ratio
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "70",
            "stats": "사거리 650"
        },
        "W": {
            "v1": "?", // Shield_Duration
            "v2": "?", // Calc_Shield
            "v3": "?", // Buff_Duration
            "v4": "?", // Calc_Damage_Low
            "v5": "?", // Calc_Damage_High
            "cooldown": "18 / 17 / 16 / 15 / 14",
            "cost": "70",
            "stats": "사거리 325"
        },
        "E": {
            "v1": "?", // Calc_Damage_Flat
            "v2": "?", // Slow_Amount*100
            "v3": "?", // Slow_Duration
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "70",
            "stats": "사거리 325"
        },
        "R": {
            "v1": "?", // Armor_Penetration*100
            "v2": "?", // Calc_Omnivamp
            "v3": "?", // Suppress_Duration
            "v4": "?", // Calc_Damage
            "v5": "?", // Stun_Duration
            "cooldown": "130 / 115 / 100",
            "cost": "-",
            "stats": "사거리 1250"
        },
    },
    "Annie": { // 애니
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "cooldown": "4",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": "사거리 625"
        },
        "W": {
            "v1": "?", // TotalDamage
            "cooldown": "7",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": "사거리 600"
        },
        "E": {
            "v1": "?", // ShieldDuration
            "v2": "?", // ShieldBlockTotal
            "v3": "?", // MoveSpeedCalc
            "v4": "?", // MovementSpeedDuration
            "v5": "?", // DamageReturn
            "cooldown": "10",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": "사거리 800"
        },
        "R": {
            "v1": "?", // RPercentPenBuff*100
            "v2": "?", // InitialBurstDamage
            "v3": "?", // TibbersLifetime
            "v4": "?", // TibbersAuraDamage
            "cooldown": "130 / 115 / 100",
            "cost": "100",
            "stats": "사거리 600"
        },
    },
    "Jade_Annie": { // 애니
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "cooldown": "4",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": "사거리 625"
        },
        "W": {
            "v1": "?", // TotalDamage
            "cooldown": "8",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": "사거리 600"
        },
        "E": {
            "v1": "?", // ShieldDuration
            "v2": "?", // Resistances
            "v3": "?", // DamageReturn
            "cooldown": "10",
            "cost": "20",
            "stats": "사거리 800"
        },
        "R": {
            "v1": "?", // InitialBurstDamage
            "v2": "?", // TibbersLifetime
            "v3": "?", // TibbersAuraDamage
            "cooldown": "120",
            "cost": "100",
            "stats": "사거리 600"
        },
    },
    "Anivia": { // 애니비아
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalPassthroughDamage
            "v2": "?", // SlowDuration
            "v3": "?", // StunDuration
            "v4": "?", // TotalExplosionDamage
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "80 / 85 / 90 / 95 / 100",
            "stats": "사거리 1075"
        },
        "W": {
            "v1": "?", // WallWidth
            "v2": "?", // WallDuration
            "cooldown": "17",
            "cost": "70",
            "stats": "사거리 1000"
        },
        "E": {
            "v1": "?", // TotalDamage
            "v2": "?", // EmpoweredDamage
            "cooldown": "4",
            "cost": "50",
            "stats": "사거리 650"
        },
        "R": {
            "v1": "?", // GrowthTime
            "v2": "?", // TotalDamagePerSecond
            "v3": "?", // SlowAmount
            "v4": "?", // SlowPercentEmpoweredTT
            "v5": "?", // EmpoweredDamagePerSecondTooltipOnly
            "cooldown": "4 / 3 / 2",
            "cost": "60",
            "stats": "사거리 750"
        },
    },
    "Jade_Anivia": { // 애니비아
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalPassthroughDamage
            "v2": "?", // TotalExplosionDamage
            "v3": "?", // StunDuration
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "80 / 100 / 120 / 140 / 160",
            "stats": "사거리 1075"
        },
        "W": {
            "v1": "?", // WallWidth
            "v2": "?", // WallDuration
            "cooldown": "25",
            "cost": "70 / 90 / 110 / 130 / 150",
            "stats": "사거리 1000"
        },
        "E": {
            "v1": "?", // TotalDamage
            "v2": "?", // EmpoweredDamage
            "cooldown": "5",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": "사거리 650"
        },
        "R": {
            "v1": "?", // TotalDamagePerSecond
            "v2": "?", // SlowAmount
            "cooldown": "6",
            "cost": "75",
            "stats": "사거리 625"
        },
    },
    "Ashe": { // 애쉬
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // StackDuration
            "v2": "?", // MaxStacks
            "v3": "?", // BuffDuration
            "v4": "?", // BonusAS
            "v5": "?", // EmpoweredDamage
            "cooldown": "0",
            "cost": "30",
            "stats": "사거리 400"
        },
        "W": {
            "v1": "?", // NumberOfArrowsTooltip
            "v2": "?", // TotalDamage
            "cooldown": "18 / 14.5 / 11 / 7.5 / 4",
            "cost": "75 / 70 / 65 / 60 / 55",
            "stats": "사거리 1200"
        },
        "E": {
            "v1": "?", // ChargeCooldown
            "cooldown": "5",
            "cost": "-",
            "stats": "사거리 25000"
        },
        "R": {
            "v1": "?", // RMainDamage
            "v2": "?", // MaxStunDuration
            "cooldown": "100 / 80 / 60",
            "cost": "100",
            "stats": "사거리 25000"
        },
    },
    "Jade_Ashe": { // 애쉬
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // SlowDuration
            "v2": "?", // SlowPercent*-100
            "cooldown": "1",
            "cost": "",
            "stats": "사거리 400"
        },
        "W": {
            "v1": "?", // TotalDamage
            "cooldown": "16 / 13 / 10 / 7 / 4",
            "cost": "60",
            "stats": "사거리 1200"
        },
        "E": {
            "v1": "?", // AdditionalGold
            "cooldown": "60",
            "cost": "",
            "stats": "사거리 2500 / 3250 / 4000 / 4750 / 5500"
        },
        "R": {
            "v1": "?", // RMainDamage
            "v2": "?", // MaxStunDuration
            "v3": "?", // RMainDamageSplashTooltip
            "cooldown": "100 / 90 / 80",
            "cost": "150",
            "stats": "사거리 25000"
        },
    },
    "Yasuo": { // 야스오
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // GatheringStormDuration
            "v3": "?", // KnockUpDurationTOOLTIPONLY
            "cooldown": "4",
            "cost": "-",
            "stats": "사거리 475"
        },
        "W": {
            "cooldown": "25 / 23 / 21 / 19 / 17",
            "cost": "-",
            "stats": "사거리 400"
        },
        "E": {
            "v1": "?", // TotalDamage
            "v2": "?", // StackDuration
            "v3": "?", // BonusDamagePerStack
            "v4": "?", // MaxStacks
            "v5": "?", // Effect2Amount
            "cooldown": "0.5 / 0.4 / 0.3 / 0.2 / 0.1",
            "cost": "-",
            "stats": "사거리 475"
        },
        "R": {
            "v1": "?", // Damage
            "v2": "?", // RKnockupDuration
            "v3": "?", // RBuffDuration
            "v4": "?", // RPercentArmorPen
            "cooldown": "70 / 50 / 30",
            "cost": "-",
            "stats": "사거리 1400"
        },
    },
    "Ekko": { // 에코
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // InitialDamage
            "v2": "?", // SlowPercent*-100
            "v3": "?", // RecallDamage
            "cooldown": "9 / 8.5 / 8 / 7.5 / 7",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": "사거리 1075"
        },
        "W": {
            "v1": "?", // BelowHealthThreshold*100
            "v2": "?", // MissingHealthPercent
            "v3": "?", // SlowZoneDuration
            "v4": "?", // SlowPercent
            "v5": "?", // StunDuration
            "v6": "?", // TotalShield
            "cooldown": "22 / 20 / 18 / 16 / 14",
            "cost": "30 / 35 / 40 / 45 / 50",
            "stats": "사거리 1600"
        },
        "E": {
            "v1": "?", // TotalDamage
            "cooldown": "9 / 8.5 / 8 / 7.5 / 7",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": "사거리 325"
        },
        "R": {
            "v1": "?", // TotalDamage
            "v2": "?", // TotalBaseHeal
            "v3": "?", // PercentHealAmpPerPercentMissingHealth
            "cooldown": "110 / 80 / 50",
            "cost": "100",
            "stats": "사거리 850"
        },
    },
    "Elise": { // 엘리스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // BaseDamage
            "v2": "?", // HumanPercentHealth
            "cooldown": "6",
            "cost": "80 / 85 / 90 / 95 / 100",
            "stats": "사거리 615"
        },
        "W": {
            "cooldown": "12",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": "사거리 950"
        },
        "E": {
            "v1": "?", // TotalStunDuration
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "50",
            "stats": "사거리 1075"
        },
        "R": {
            "cooldown": "3",
            "cost": "-",
            "stats": "사거리 20"
        },
    },
    "MonkeyKing": { // 오공
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // AttackRangeBonus
            "v2": "?", // BonusDamageTT
            "v3": "?", // ShredDuration
            "v4": "?", // ArmorShredPercent*100
            "v5": "?", // CooldownDecrease
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "20",
            "stats": "사거리 250 / 275 / 300 / 325 / 350"
        },
        "W": {
            "v1": "?", // StealthDuration
            "v2": "?", // CloneDuration
            "v3": "?", // CloneDamageMod*100
            "cooldown": "22 / 21 / 20 / 19 / 18",
            "cost": "60 / 55 / 50 / 45 / 40",
            "stats": "사거리 275"
        },
        "E": {
            "v1": "?", // ExtraTargets
            "v2": "?", // TotalDamage
            "v3": "?", // AttackSpeedDuration
            "v4": "?", // AttackSpeed*100
            "cooldown": "10 / 9.25 / 8.5 / 7.75 / 7",
            "cost": "30 / 35 / 40 / 45 / 50",
            "stats": "사거리 650"
        },
        "R": {
            "v1": "?", // MoveSpeed*100
            "v2": "?", // SpinDuration
            "v3": "?", // KnockupDuration
            "v4": "?", // TotalDamageTT
            "v5": "?", // PercentHPDamageTT
            "v6": "?", // RecastWindow
            "cooldown": "130 / 110 / 90",
            "cost": "100",
            "stats": "사거리 315"
        },
    },
    "Jade_Wukong": { // 오공
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // BonusAttackRange
            "v2": "?", // TotalDamage
            "v3": "?", // ShredDuration
            "v4": "?", // ArmorShredPercent*-100
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "40",
            "stats": "사거리 250 / 275 / 300 / 325 / 350"
        },
        "W": {
            "v1": "?", // StealthDuration
            "v2": "?", // CloneDuration
            "v3": "?", // TotalDamage
            "cooldown": "18 / 16 / 14 / 12 / 10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 275"
        },
        "E": {
            "v1": "?", // TotalDamage
            "v2": "?", // AttackSpeedDuration
            "v3": "?", // AttackSpeed*100
            "cooldown": "8",
            "cost": "45 / 50 / 55 / 60 / 65",
            "stats": "사거리 650"
        },
        "R": {
            "v1": "?", // DamagePerSecondTotal
            "v2": "?", // SpinDuration
            "cooldown": "120 / 105 / 90",
            "cost": "100",
            "stats": "사거리 315"
        },
    },
    "Aurora": { // 오로라
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // damage
            "v2": "?", // MarkDuration
            "v3": "?", // Q2DamageMax
            "cooldown": "9 / 8.5 / 8 / 7.5 / 7",
            "cost": "60",
            "stats": "사거리 900"
        },
        "W": {
            "v1": "?", // InvisDuration
            "v2": "?", // MoveSpeedBonus
            "cooldown": "22 / 21 / 20 / 19 / 18",
            "cost": "80",
            "stats": "사거리 700"
        },
        "E": {
            "v1": "?", // DamageCalc
            "v2": "?", // SlowPercent*-100
            "v3": "?", // SlowDuration
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "80",
            "stats": "사거리 825"
        },
        "R": {
            "v1": "?", // DamageCalc
            "v2": "?", // SlowPercent*-100
            "v3": "?", // AreaDuration
            "v4": "?", // RBuffDuration
            "v5": "?", // StunDuration
            "v6": "?", // ExitSlowPercent*-100
            "cooldown": "140 / 120 / 100",
            "cost": "100",
            "stats": "사거리 250"
        },
    },
    "Ornn": { // 오른
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // SlowDuration
            "v3": "?", // SlowAmount
            "v4": "?", // PillarDuration
            "cooldown": "9 / 8.5 / 8 / 7.5 / 7",
            "cost": "45",
            "stats": "사거리 800"
        },
        "W": {
            "v1": "?", // BreathDuration
            "v2": "?", // MaxPercentHPPerTickTooltip
            "v3": "?", // BrittleDuration
            "v4": "?", // BrittlePercentMaxHPCalc
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "45 / 50 / 55 / 60 / 65",
            "stats": "사거리 25000"
        },
        "E": {
            "v1": "?", // TotalDamage
            "v2": "?", // KnockupDuration
            "cooldown": "14 / 13.5 / 13 / 12.5 / 12",
            "cost": "35 / 40 / 45 / 50 / 55",
            "stats": "사거리 450"
        },
        "R": {
            "v1": "?", // RDamageCalc
            "v2": "?", // BrittleDurationTOOLTIPONLY
            "v3": "?", // RSlowPercentBasePreMath
            "v4": "?", // RStunDuration
            "v5": "?", // MinStun
            "cooldown": "140 / 120 / 100",
            "cost": "100",
            "stats": "사거리 2500"
        },
    },
    "Orianna": { // 오리아나
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamageTooltip
            "v2": "?", // ReducedDamagePercent
            "cooldown": "7 / 6 / 5 / 4 / 3",
            "cost": "35",
            "stats": "사거리 815"
        },
        "W": {
            "v1": "?", // TotalDamage
            "v2": "?", // FieldDuration
            "v3": "?", // SlowAmount*100
            "v4": "?", // HasteAmount*100
            "v5": "?", // SlowAndHasteDuration
            "cooldown": "7",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": "사거리 225"
        },
        "E": {
            "v1": "?", // DefenseBonus
            "v2": "?", // ShieldDuration
            "v3": "?", // TotalShieldTooltip
            "v4": "?", // TotalDamageTooltip
            "cooldown": "9",
            "cost": "60",
            "stats": "사거리 1095"
        },
        "R": {
            "v1": "?", // TotalDamage
            "cooldown": "110 / 95 / 80",
            "cost": "100",
            "stats": "사거리 410"
        },
    },
    "Olaf": { // 올라프
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // MaxSlowDuration
            "v3": "?", // SlowAmount*100
            "v4": "?", // DebuffDuration
            "v5": "?", // ShredAmount*100
            "v6": "?", // TooltipCDRefund
            "cooldown": "9",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 1000"
        },
        "W": {
            "v1": "?", // Duration
            "v2": "?", // Attackspeed*100
            "v3": "?", // ShieldDuration
            "v4": "?", // BaseShield
            "v5": "?", // ShieldPercMissingHP*100
            "v6": "?", // ThresholdForMax*100
            "v7": "?", // MaxShieldCalc
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "50",
            "stats": "사거리 700"
        },
        "E": {
            "v1": "?", // TotalDamage
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "",
            "stats": "사거리 325"
        },
        "R": {
            "v1": "?", // Resists
            "v2": "?", // Duration
            "v3": "?", // AD
            "v4": "?", // DurationExtension
            "v5": "?", // HasteDuration
            "v6": "?", // Haste*100
            "cooldown": "100 / 90 / 80",
            "cost": "100",
            "stats": "사거리 400"
        },
    },
    "Jade_Olaf": { // 올라프
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // DebuffDuration
            "v3": "?", // SlowAmount*100
            "v4": "?", // CooldownRefund
            "cooldown": "8",
            "cost": "55 / 60 / 65 / 70 / 75",
            "stats": "사거리 1000"
        },
        "W": {
            "v1": "?", // Duration
            "v2": "?", // TotalADGain
            "v3": "?", // LifeStealAmount*100
            "cooldown": "16",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": "사거리 700"
        },
        "E": {
            "v1": "?", // TotalDamage
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "",
            "stats": "사거리 325"
        },
        "R": {
            "v1": "?", // Duration
            "v2": "?", // Resists
            "v3": "?", // ArmorPen
            "cooldown": "100",
            "cost": "100 / 75 / 50",
            "stats": "사거리 400"
        },
    },
    "Yone": { // 요네
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // QDamage
            "v2": "?", // BuffDuration
            "v3": "?", // Q3KnockupDuration
            "cooldown": "4",
            "cost": "-",
            "stats": "사거리 450"
        },
        "W": {
            "v1": "?", // BaseDamage*0.5
            "v2": "?", // MaxHealthDamage*50
            "v3": "?", // ShieldDuration
            "v4": "?", // WShield
            "cooldown": "14",
            "cost": "-",
            "stats": "사거리 700"
        },
        "E": {
            "v1": "?", // ReturnTimer
            "v2": "?", // StartingMS*100
            "v3": "?", // MovementSpeed*100
            "v4": "?", // DeathmarkPercent*100
            "cooldown": "22 / 19 / 16 / 13 / 10",
            "cost": "-",
            "stats": "사거리 25000"
        },
        "R": {
            "v1": "?", // TooltipDamage
            "cooldown": "120 / 100 / 80",
            "cost": "-",
            "stats": "사거리 1000"
        },
    },
    "Yorick": { // 요릭
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // BonusDamage
            "v2": "?", // QHeal
            "v3": "?", // MissingHealthRatio
            "v4": "?", // HealReduction
            "cooldown": "6 / 5.5 / 5 / 4.5 / 4",
            "cost": "20"
        },
        "W": {
            "v1": "?", // WallHealthTooltip
            "v2": "?", // CircleDuration
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "70",
            "stats": "사거리 600"
        },
        "E": {
            "v1": "?", // Calc_HealthDamage
            "v2": "?", // SlowDuration
            "v3": "?", // Calc_Slow
            "v4": "?", // MarkDuration
            "v5": "?", // ArmorShred*100
            "v6": "?", // HasteAmount*100
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 700"
        },
        "R": {
            "v1": "?", // YorickBigGhoulHealth
            "v2": "?", // YorickBigGhoulDamage
            "v3": "?", // RGhoulNumbers
            "v4": "?", // RMarkDamagePercent
            "cooldown": "160 / 130 / 100",
            "cost": "100",
            "stats": "사거리 600"
        },
    },
    "Udyr": { // 우디르
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // AttackSpeedDurationBase
            "v2": "?", // AttackSpeedBase*100
            "v3": "?", // OnHitDamage
            "v4": "?", // MaxHPOnHit1
            "v5": "?", // AttackRange
            "v6": "?", // EmpoweredTotalAS
            "v7": "?", // Q2TotalOnHitHPDamage
            "v8": "?", // EmpoweredLightningBonusMax
            "cooldown": "6",
            "cost": "20",
            "stats": "사거리 600"
        },
        "W": {
            "v1": "?", // ShieldDuration
            "v2": "?", // TotalShield
            "v3": "?", // LifeSteal*100
            "v4": "?", // LifeOnHit
            "v5": "?", // RecastShield
            "v6": "?", // RecastHeal
            "v7": "?", // LifeSteal*200
            "v8": "?", // LifeOnHitAwakened
            "cooldown": "6",
            "cost": "40"
        },
        "E": {
            "v1": "?", // MoveSpeed
            "v2": "?", // MoveSpeedDuration
            "v3": "?", // StunDuration
            "v4": "?", // ICD
            "v5": "?", // UnstoppableDuration
            "v6": "?", // MoveSpeedBonus
            "cooldown": "6",
            "cost": "40",
            "stats": "사거리 600"
        },
        "R": {
            "v1": "?", // BuffDuration
            "v2": "?", // StormDamage
            "v3": "?", // SlowPotency*100
            "v4": "?", // PulseDamage
            "v5": "?", // PercentHPBlast
            "v6": "?", // EmpoweredSlow
            "cooldown": "6",
            "cost": "40",
            "stats": "사거리 370"
        },
    },
    "Urgot": { // 우르곳
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // SlowDuration
            "v3": "?", // SlowAmount*100
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "70",
            "stats": "사거리 800"
        },
        "W": {
            "v1": "?", // WAttacksPerSecond
            "v2": "?", // DamagePerShot
            "v3": "?", // SlowResistance
            "v4": "?", // MoveSpeedMod
            "cooldown": "12 / 9 / 6 / 3 / 0",
            "cost": "40 / 30 / 20 / 10 / 0",
            "stats": "사거리 490"
        },
        "E": {
            "v1": "?", // EShieldDuration
            "v2": "?", // ETotalShieldHealth
            "v3": "?", // StunDuration
            "v4": "?", // EDamage
            "cooldown": "16 / 15.5 / 15 / 14.5 / 14",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": "사거리 475"
        },
        "R": {
            "v1": "?", // RCalculatedDamage
            "v2": "?", // RSlowDuration
            "v3": "?", // RMoveSpeedMod
            "v4": "?", // RHealthThreshold
            "v5": "?", // RFearDuration
            "cooldown": "100 / 85 / 70",
            "cost": "100",
            "stats": "사거리 2500"
        },
    },
    "Warwick": { // 워윅
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // BaseBiteDamage
            "v2": "?", // TargetPercentHPDamage
            "v3": "?", // LifestealPercent
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "80 / 85 / 90 / 95 / 100",
            "stats": "사거리 365"
        },
        "W": {
            "v1": "?", // PassiveMSBonus
            "v2": "?", // PassiveASBonus
            "cooldown": "80 / 70 / 60 / 50 / 40",
            "cost": "55",
            "stats": "사거리 4000"
        },
        "E": {
            "v1": "?", // DRDuration
            "v2": "?", // DRAmount
            "v3": "?", // FearDuration
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "40",
            "stats": "사거리 375"
        },
        "R": {
            "v1": "?", // RDuration
            "v2": "?", // DamageCumulative
            "cooldown": "110 / 90 / 70",
            "cost": "100",
            "stats": "사거리 25000"
        },
    },
    "Jade_Warwick": { // 워윅
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalFlatDamage
            "v2": "?", // MaxHealthDamage*100
            "v3": "?", // APDamage
            "v4": "?", // HealingRatio*100
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": "사거리 400"
        },
        "W": {
            "v1": "?", // AttackSpeedDuration
            "v2": "?", // AttackSpeedMod*100
            "v3": "?", // AllyAttackSpeedMod*100
            "cooldown": "24 / 22 / 20 / 18 / 16",
            "cost": "35",
            "stats": "사거리 1250"
        },
        "E": {
            "v1": "?", // Range
            "v2": "?", // MSBonus*100
            "cooldown": "0",
            "cost": "",
            "stats": "사거리 1500 / 2300 / 3100 / 3900 / 4700"
        },
        "R": {
            "v1": "?", // RDuration
            "v2": "?", // NumberOfHits
            "v3": "?", // TotalDamage
            "v4": "?", // BonusLifesteal*100
            "cooldown": "90 / 80 / 70",
            "cost": "100 / 125 / 150",
            "stats": "사거리 650"
        },
    },
    "Yunara": { // 유나라
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // Calc_Passive_Damage
            "v2": "?", // Resource_Nonchampion
            "v3": "?", // Resource_Champion
            "v4": "?", // Resource_Max
            "v5": "?", // Buff_Duration
            "v6": "?", // Calc_Attack_Speed
            "v7": "?", // Calc_Damage
            "v8": "?", // Calc_Damage_Spread
            "cooldown": "0",
            "cost": "30"
        },
        "W": {
            "v1": "?", // Calc_Damage_Initial
            "v2": "?", // Calc_Slow
            "v3": "?", // Slow_Duration
            "v4": "?", // Calc_Damage_Per_Second
            "cooldown": "10",
            "cost": "60",
            "stats": "사거리 1150"
        },
        "E": {
            "v1": "?", // Buff_Duration
            "v2": "?", // Calc_Move_Speed
            "v3": "?", // Calc_Move_Speed_Enhanced
            "cooldown": "9",
            "cost": "40"
        },
        "R": {
            "v1": "?", // Buff_Duration
            "cooldown": "100 / 90 / 80",
            "cost": "100"
        },
    },
    "Yuumi": { // 유미
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalMissileDamage
            "v2": "?", // SlowAmount
            "v3": "?", // TotalMissileDamageEmpowered
            "v4": "?", // EmpoweredSlowDuration
            "v5": "?", // EmpoweredSlowAmount
            "v6": "?", // BuffDuration
            "v7": "?", // OnHitDamageCalc
            "v8": "?", // AllyCritChanceMaxAmp*100
            "cooldown": "6.5",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 25000"
        },
        "W": {
            "v1": "?", // HealAndShieldPower*100
            "v2": "?", // HealthOnHit
            "v3": "?", // CCAttachLockout
            "cooldown": "0",
            "cost": "-",
            "stats": "사거리 25000"
        },
        "E": {
            "v1": "?", // TotalShielding
            "v2": "?", // MSDuration
            "v3": "?", // TotalAttackSpeed
            "v4": "?", // MSAmount
            "v5": "?", // ManaRestore
            "v6": "?", // MaxManaPercIncrease*100
            "cooldown": "10",
            "cost": "80 / 90 / 100 / 110 / 120",
            "stats": "사거리 25000"
        },
        "R": {
            "v1": "?", // UltDuration
            "v2": "?", // NumberOfWaves
            "v3": "?", // TotalMissileDamage
            "v4": "?", // CCDuration
            "v5": "?", // BaseSlow*-100
            "v6": "?", // BonusSlowPerWave*-100
            "v7": "?", // TotalHealPerWave
            "v8": "?", // EnhancedHealPerWave
            "cooldown": "120 / 110 / 100",
            "cost": "100",
            "stats": "사거리 1100"
        },
    },
    "Irelia": { // 이렐리아
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // ChampionDamage
            "v2": "?", // HealAmount
            "v3": "?", // MinionDamage
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "15",
            "stats": "사거리 600"
        },
        "W": {
            "v1": "?", // MaxDuration
            "v2": "?", // FinalPhysicalDR
            "v3": "?", // FinalMagicDR
            "v4": "?", // MinDamageCalc
            "v5": "?", // MaxDamageCalc
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": "사거리 825"
        },
        "E": {
            "v1": "?", // BuffDuration
            "v2": "?", // StunDuration
            "v3": "?", // TotalDamage
            "v4": "?", // MarkDuration
            "cooldown": "16 / 14.5 / 13 / 11.5 / 10",
            "cost": "50",
            "stats": "사거리 850"
        },
        "R": {
            "v1": "?", // MissileDamage
            "v2": "?", // MarkDuration
            "v3": "?", // ZoneDuration
            "v4": "?", // ZoneDamage
            "v5": "?", // CCDuration
            "v6": "?", // SlowAmount
            "cooldown": "125 / 105 / 85",
            "cost": "100",
            "stats": "사거리 950"
        },
    },
    "Evelynn": { // 이블린
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // MissileDamage
            "v2": "?", // TotalBonusDamage
            "v3": "?", // QStackCount
            "cooldown": "4",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": "사거리 800"
        },
        "W": {
            "v1": "?", // SlowDuration
            "v2": "?", // SlowAmount*100
            "v3": "?", // CharmDuration
            "v4": "?", // ShredDuration
            "v5": "?", // MRShred*100
            "v6": "?", // MonsterCharm
            "v7": "?", // MonsterDamageTotalTOOLTIP
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": "사거리 1200 / 1300 / 1400 / 1500 / 1600"
        },
        "E": {
            "v1": "?", // BaseDamage
            "v2": "?", // PercentHealthBaseTOOLTIP
            "v3": "?", // SpeedDuration
            "v4": "?", // SpeedAmount*100
            "v5": "?", // EmpoweredDamage
            "v6": "?", // PercentHealthEmpoweredTOOLTIP
            "cooldown": "8",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": "사거리 210"
        },
        "R": {
            "v1": "?", // Damage
            "v2": "?", // CritDamage
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": "사거리 25000"
        },
    },
    "Jade_Evelynn": { // 이블린
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "cooldown": "1.5",
            "cost": "16 / 22 / 28 / 34 / 40",
            "stats": "사거리 525"
        },
        "W": {
            "v1": "?", // PassiveDuration
            "v2": "?", // PassiveMS
            "v3": "?", // MaxPassiveStacks
            "v4": "?", // ActiveDuration
            "v5": "?", // ActiveMS*100
            "cooldown": "15",
            "cost": "-"
        },
        "E": {
            "v1": "?", // NumberOfStrikes
            "v2": "?", // TotalDamageTooltip
            "v3": "?", // AttackSpeedDuration
            "v4": "?", // AttackSpeed*100
            "cooldown": "9",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 225"
        },
        "R": {
            "v1": "?", // TotalDamage
            "v2": "?", // SlowDuration
            "v3": "?", // Slow*100
            "v4": "?", // ShieldAmount
            "cooldown": "150 / 120 / 90",
            "cost": "100",
            "stats": "사거리 650"
        },
    },
    "Ezreal": { // 이즈리얼
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // Damage
            "v2": "?", // CDRefund
            "cooldown": "5.5 / 5.25 / 5 / 4.75 / 4.5",
            "cost": "28 / 31 / 34 / 37 / 40",
            "stats": "사거리 1150"
        },
        "W": {
            "v1": "?", // DetonationTimeout
            "v2": "?", // Damage
            "v3": "?", // ManaReturn
            "cooldown": "8",
            "cost": "50",
            "stats": "사거리 1150"
        },
        "E": {
            "v1": "?", // Damage
            "cooldown": "26 / 23 / 20 / 17 / 14",
            "cost": "70",
            "stats": "사거리 475"
        },
        "R": {
            "v1": "?", // Damage
            "v2": "?", // DamageMinionMonster
            "cooldown": "120 / 105 / 90",
            "cost": "100",
            "stats": "사거리 25000"
        },
    },
    "Jade_Ezreal": { // 이즈리얼
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // Damage
            "cooldown": "6 / 5.5 / 5 / 4.5 / 4",
            "cost": "30 / 35 / 40 / 45 / 50",
            "stats": "사거리 1150"
        },
        "W": {
            "v1": "?", // Damage
            "v2": "?", // AttackSpeed
            "v3": "?", // TotalHeal
            "cooldown": "10",
            "cost": "80 / 90 / 100 / 110 / 120",
            "stats": "사거리 1050"
        },
        "E": {
            "v1": "?", // Damage
            "cooldown": "17 / 15 / 13 / 11 / 9",
            "cost": "90",
            "stats": "사거리 475"
        },
        "R": {
            "v1": "?", // Damage
            "v2": "?", // DamageReductionPerHit*100
            "v3": "?", // MinimumDamagePercent*100
            "cooldown": "100",
            "cost": "150",
            "stats": "사거리 25000"
        },
    },
    "Illaoi": { // 일라오이
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": "사거리 850"
        },
        "W": {
            "v1": "?", // HealthPercentTotal
            "cooldown": "4",
            "cost": "30",
            "stats": "사거리 400"
        },
        "E": {
            "v1": "?", // SpiritDuration
            "v2": "?", // EchoPercent
            "v3": "?", // VesselDuration
            "v4": "?", // SlowDuration
            "v5": "?", // SlowAmount*100
            "v6": "?", // TimeBetweenVesselTentacleSlams
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "35 / 40 / 45 / 50 / 55",
            "stats": "사거리 900"
        },
        "R": {
            "v1": "?", // DamageCalc
            "v2": "?", // Duration
            "cooldown": "120 / 95 / 70",
            "cost": "100",
            "stats": "사거리 450"
        },
    },
    "JarvanIV": { // 자르반 4세
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // Effect3Amount
            "v3": "?", // BaseARShred*100
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "45 / 50 / 55 / 60 / 65",
            "stats": "사거리 770"
        },
        "W": {
            "v1": "?", // Effect5Amount
            "v2": "?", // BaseSlowAmount*100
            "v3": "?", // TotalShield
            "v4": "?", // BonusShield
            "cooldown": "9",
            "cost": "30",
            "stats": "사거리 625"
        },
        "E": {
            "v1": "?", // PermanentAttackSpeed*100
            "v2": "?", // TotalDamage
            "v3": "?", // Effect4Amount
            "v4": "?", // BaseAuraAS*100
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "55",
            "stats": "사거리 860"
        },
        "R": {
            "v1": "?", // DamageCalc
            "v2": "?", // WallDuration
            "cooldown": "120 / 105 / 90",
            "cost": "100",
            "stats": "사거리 650"
        },
    },
    "Jade_JarvanIV": { // 자르반 4세
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // ArmorShredPercent
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "45 / 50 / 55 / 60 / 65",
            "stats": "사거리 770"
        },
        "W": {
            "v1": "?", // ShieldAmount
            "v2": "?", // ShieldBonus
            "v3": "?", // SlowAmount
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "45 / 50 / 55 / 60 / 65",
            "stats": "사거리 500"
        },
        "E": {
            "v1": "?", // PassiveAttackSpeed*100
            "v2": "?", // PassiveArmor
            "v3": "?", // TotalDamage
            "v4": "?", // Effect4Amount
            "cooldown": "13",
            "cost": "55",
            "stats": "사거리 860"
        },
        "R": {
            "v1": "?", // DamageCalc
            "cooldown": "120 / 105 / 90",
            "cost": "100 / 125 / 150",
            "stats": "사거리 650"
        },
    },
    "Xayah": { // 자야
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // MultiHitDamage
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "35",
            "stats": "사거리 400"
        },
        "W": {
            "v1": "?", // WAttackSpeedDuration
            "v2": "?", // WAttackSpeedAmount
            "v3": "?", // BonusDamagePercent
            "v4": "?", // WMoveSpeedDuration
            "v5": "?", // WMoveSpeedAmount
            "cooldown": "18 / 17 / 16 / 15 / 14",
            "cost": "60 / 55 / 50 / 45 / 40",
            "stats": "사거리 1000"
        },
        "E": {
            "v1": "?", // FeatherDamage
            "v2": "?", // FeatherThreshold
            "v3": "?", // RootDuration
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "20",
            "stats": "사거리 2000"
        },
        "R": {
            "v1": "?", // Damage
            "cooldown": "140 / 120 / 100",
            "cost": "100",
            "stats": "사거리 450"
        },
    },
    "Zyra": { // 자이라
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // InitialDamage
            "cooldown": "7 / 6.5 / 6 / 5.5 / 5",
            "cost": "55",
            "stats": "사거리 800"
        },
        "W": {
            "v1": "?", // SeedDuration
            "v2": "?", // VisionGranted
            "v3": "?", // AmmoRechargeTime
            "v4": "?", // KillAmmoRefundMinion*100
            "v5": "?", // KillAmmoRefundChamp*100
            "cooldown": "0",
            "cost": "",
            "stats": "사거리 850"
        },
        "E": {
            "v1": "?", // RootDuration
            "v2": "?", // TotalDamage
            "v3": "?", // SlowDurationPlantAttack
            "v4": "?", // SlowAmountPlantAttack
            "v5": "?", // MaxSlowStacks
            "cooldown": "11",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": "사거리 1100"
        },
        "R": {
            "v1": "?", // TotalDamage
            "v2": "?", // KnockupDuration
            "v3": "?", // EnragedBonusHealthPercent*100
            "v4": "?", // PlantDamageBonus
            "cooldown": "110 / 100 / 90",
            "cost": "100",
            "stats": "사거리 700"
        },
    },
    "Zac": { // 자크
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "cooldown": "14 / 12.5 / 11 / 9.5 / 8",
            "cost": "",
            "stats": "사거리 800"
        },
        "W": {
            "v1": "?", // BaseDamage
            "v2": "?", // DisplayPercentDamage
            "cooldown": "5",
            "cost": "",
            "stats": "사거리 350"
        },
        "E": {
            "v1": "?", // ChannelTime
            "v2": "?", // MaxStun
            "v3": "?", // Damage
            "cooldown": "21 / 18 / 15 / 12 / 9",
            "cost": "",
            "stats": "사거리 300"
        },
        "R": {
            "v1": "?", // Bounces
            "v2": "?", // DamagePerBounce
            "v3": "?", // DamagePerSubsequentBounce
            "v4": "?", // SlowDuration
            "v5": "?", // SlowAmount*100
            "v6": "?", // EndingMS*100
            "cooldown": "120 / 105 / 90",
            "cost": "-",
            "stats": "사거리 300"
        },
    },
    "Zaahen": { // 자헨
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // InitialDamage
            "v2": "?", // HealPercent*100
            "v3": "?", // SecondHitDamage
            "v4": "?", // KnockUpDuration
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "25",
            "stats": "사거리 25000"
        },
        "W": {
            "v1": "?", // InitialDamage
            "v2": "?", // SecondaryDamage
            "cooldown": "14 / 13.5 / 13 / 12.5 / 12",
            "cost": "50",
            "stats": "사거리 850"
        },
        "E": {
            "v1": "?", // BaseDamageCalc
            "v2": "?", // BonusDamageCalc
            "v3": "?", // PercentHPDamage*100
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "40",
            "stats": "사거리 25000"
        },
        "R": {
            "v1": "?", // ArmorPen*100
            "v2": "?", // DamageReduction*100
            "v3": "?", // DamageEndCalc
            "v4": "?", // HealPercent*100
            "cooldown": "110 / 95 / 80",
            "cost": "100",
            "stats": "사거리 600"
        },
    },
    "Janna": { // 잔나
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // MaxDuration
            "v2": "?", // MinimumDamage
            "v3": "?", // MaxDamage
            "v4": "?", // BaseKnockup
            "v5": "?", // MaxKnockup
            "cooldown": "14",
            "cost": "90 / 95 / 100 / 105 / 110",
            "stats": "사거리 1075"
        },
        "W": {
            "v1": "?", // TotalMS
            "v2": "?", // SlowDuration
            "v3": "?", // TotalSlow
            "v4": "?", // TotalDamage
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 -1"
        },
        "E": {
            "v1": "?", // ShieldDuration
            "v2": "?", // TotalShield
            "v3": "?", // TotalAD
            "v4": "?", // ECDRefundforCC*100
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": "사거리 800"
        },
        "R": {
            "v1": "?", // Effect3Amount
            "v2": "?", // TotalHeal
            "cooldown": "130 / 115 / 100",
            "cost": "100",
            "stats": "사거리 725"
        },
    },
    "Jade_Janna": { // 잔나
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // MinimumDamage
            "v2": "?", // ChargeDamage
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "90 / 105 / 120 / 135 / 150",
            "stats": "사거리 1075"
        },
        "W": {
            "v1": "?", // MSPercent*100
            "v2": "?", // TotalDamage
            "v3": "?", // SlowDuration
            "v4": "?", // MovementSpeedForTooltip
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "40 / 50 / 60 / 70 / 80",
            "stats": "사거리 -1"
        },
        "E": {
            "v1": "?", // ShieldDuration
            "v2": "?", // TotalShield
            "v3": "?", // BonusAD
            "cooldown": "10",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": "사거리 800"
        },
        "R": {
            "v1": "?", // TotalHeal
            "cooldown": "150 / 135 / 120",
            "cost": "100 / 150 / 200",
            "stats": "사거리 725"
        },
    },
    "Jax": { // 잭스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "50",
            "stats": "사거리 700"
        },
        "W": {
            "v1": "?", // TotalDamage
            "cooldown": "7 / 6 / 5 / 4 / 3",
            "cost": "30",
            "stats": "사거리 300"
        },
        "E": {
            "v1": "?", // DodgeDuration
            "v2": "?", // AoEDamageReduction
            "v3": "?", // TotalDamage
            "v4": "?", // PercentHealthDamage
            "v5": "?", // StunDuration
            "v6": "?", // PercentIncreasedPerDodge*100
            "v7": "?", // MaxDamage
            "v8": "?", // MaxPercentHealthDamage
            "cooldown": "17 / 15 / 13 / 11 / 9",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": "사거리 300"
        },
        "R": {
            "v1": "?", // PassiveFallOffTime
            "v2": "?", // OnHitDamage
            "v3": "?", // SwingDamageTotal
            "v4": "?", // BaseArmor
            "v5": "?", // BaseMR
            "v6": "?", // Duration
            "v7": "?", // BonusArmor
            "v8": "?", // BonusMR
            "cooldown": "110 / 100 / 90",
            "cost": "100",
            "stats": "사거리 260"
        },
    },
    "Jade_Jax": { // 잭스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "cooldown": "17 / 14 / 11 / 8 / 5",
            "cost": "65",
            "stats": "사거리 700"
        },
        "W": {
            "v1": "?", // TotalDamage
            "cooldown": "7 / 6 / 5 / 4 / 3",
            "cost": "35",
            "stats": "사거리 300"
        },
        "E": {
            "v1": "?", // DodgeDuration
            "v2": "?", // AoEDamageReduction
            "v3": "?", // TotalDamage
            "v4": "?", // StunDuration
            "v5": "?", // PercentIncreasedPerDodge*100
            "v6": "?", // MaxDamage
            "cooldown": "18 / 16 / 14 / 12 / 10",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": "사거리 300"
        },
        "R": {
            "v1": "?", // AttackSpeedPerStack*100
            "v2": "?", // MaxStacks
            "v3": "?", // OnHitDamage
            "cooldown": "0",
            "cost": "",
            "stats": "사거리 400"
        },
    },
    "Zed": { // 제드
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // PassThroughDamage
            "cooldown": "6",
            "cost": "75 / 70 / 65 / 60 / 55",
            "stats": "사거리 900"
        },
        "W": {
            "v1": "?", // Effect3Amount
            "v2": "?", // Effect5Amount
            "cooldown": "20 / 19 / 18 / 17 / 16",
            "cost": "40 / 35 / 30 / 25 / 20",
            "stats": "사거리 650"
        },
        "E": {
            "v1": "?", // TotalDamage
            "v2": "?", // ShadowHitCDR
            "v3": "?", // SlowDuration
            "v4": "?", // MoveSpeedMod*-100
            "v5": "?", // MoveSpeedModBonus*-100
            "cooldown": "5 / 4.5 / 4 / 3.5 / 3",
            "cost": "40",
            "stats": "사거리 290"
        },
        "R": {
            "v1": "?", // RDeathMarkDuration
            "v2": "?", // RCalculatedDamage
            "v3": "?", // RDamageAmp*100
            "v4": "?", // RShadowDurationDisplayed
            "cooldown": "120 / 110 / 100",
            "cost": "-",
            "stats": "사거리 625"
        },
    },
    "Xerath": { // 제라스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TooltipTotalDamage
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "80 / 90 / 100 / 110 / 120",
            "stats": "사거리 750"
        },
        "W": {
            "v1": "?", // TotalDamage
            "v2": "?", // SlowDuration
            "v3": "?", // SlowAmount*100
            "v4": "?", // SweetSpotTotalDamage
            "v5": "?", // SweetSpotSlowAmount*100
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "80 / 90 / 100 / 110 / 120",
            "stats": "사거리 1000"
        },
        "E": {
            "v1": "?", // MaxStunDuration
            "v2": "?", // TooltipTotalDamage
            "cooldown": "13 / 12.5 / 12 / 11.5 / 11",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": "사거리 1050"
        },
        "R": {
            "v1": "?", // Duration
            "v2": "?", // NumberOfShots
            "v3": "?", // TooltipTotalDamage
            "v4": "?", // RampDamageCalc
            "cooldown": "130 / 115 / 100",
            "cost": "100",
            "stats": "사거리 5000"
        },
    },
    "Zeri": { // 제리
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // NumberOfMissiles
            "v2": "?", // ActiveDamageThatCanCrit
            "cooldown": "0",
            "cost": "-",
            "stats": "사거리 700"
        },
        "W": {
            "v1": "?", // TotalDamage
            "v2": "?", // SlowDuration
            "v3": "?", // SlowPercent*100
            "v4": "?", // WallDamage
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": "사거리 1150"
        },
        "E": {
            "v1": "?", // BuffDuration
            "v2": "?", // PenDamagePercent*100
            "v3": "?", // BonusDamageTotal
            "v4": "?", // CDReductionPerHit
            "v5": "?", // CritCDReductionPerHit
            "cooldown": "24 / 22.5 / 21 / 19.5 / 18",
            "cost": "90 / 85 / 80 / 75 / 70",
            "stats": "사거리 25000"
        },
        "R": {
            "v1": "?", // TotalActiveDamage
            "v2": "?", // RDuration
            "v3": "?", // BaseASPercent*100
            "v4": "?", // BaseBonusMS*100
            "v5": "?", // MaxHyperchargeDuration
            "v6": "?", // MSPercent*100
            "v7": "?", // ChainPhysicalDamage
            "cooldown": "80 / 75 / 70",
            "cost": "100",
            "stats": "사거리 800"
        },
    },
    "Jayce": { // 제이스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "cooldown": "16 / 14 / 12 / 10 / 8",
            "cost": "40",
            "stats": "사거리 600"
        },
        "W": {
            "cooldown": "10",
            "cost": "40",
            "stats": "사거리 285"
        },
        "E": {
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "55",
            "stats": "사거리 240"
        },
        "R": {
            "cooldown": "6",
            "cost": "-",
            "stats": "사거리 600"
        },
    },
    "Zoe": { // 조이
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamageTooltip
            "v2": "?", // MaxDamageTooltip
            "cooldown": "8.5 / 8 / 7.5 / 7 / 6.5",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": "사거리 800"
        },
        "W": {
            "v1": "?", // MSDuration
            "v2": "?", // MovementSpeed*100
            "v3": "?", // MissileDamageTooltip
            "cooldown": "0.25",
            "cost": "-",
            "stats": "사거리 3000 / 4500 / 6000 / 3000 / 3000"
        },
        "E": {
            "v1": "?", // TotalDamageTooltip
            "v2": "?", // CooldownRefresh*100
            "v3": "?", // PercentPen*100
            "v4": "?", // BreakDamageTooltip
            "cooldown": "18 / 17 / 16 / 15 / 14",
            "cost": "80",
            "stats": "사거리 800"
        },
        "R": {
            "cooldown": "11 / 8 / 5",
            "cost": "40",
            "stats": "사거리 575"
        },
    },
    "Ziggs": { // 직스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "cooldown": "6 / 5.5 / 5 / 4.5 / 4",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 850"
        },
        "W": {
            "v1": "?", // BombDuration
            "v2": "?", // TotalDamage
            "v3": "?", // TurretDestroyPercent*100
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "80",
            "stats": "사거리 1000"
        },
        "E": {
            "v1": "?", // TotalDamage
            "v2": "?", // SlowDuration
            "v3": "?", // Slow*-100
            "v4": "?", // MineDuration
            "cooldown": "16",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": "사거리 900"
        },
        "R": {
            "v1": "?", // EmpoweredDamage
            "v2": "?", // BlastDamage
            "cooldown": "120 / 95 / 70",
            "cost": "100",
            "stats": "사거리 5000"
        },
    },
    "Jhin": { // 진
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // TooltipMaxTargetsHit
            "v3": "?", // PercentAmpOnKill*100
            "cooldown": "7 / 6.5 / 6 / 5.5 / 5",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": "사거리 550"
        },
        "W": {
            "v1": "?", // TotalDamage
            "v2": "?", // SpottingDuration
            "v3": "?", // RootDuration
            "cooldown": "12",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 3000"
        },
        "E": {
            "v1": "?", // TrapDuration
            "v2": "?", // TrapSlowAmount*100
            "v3": "?", // TrapDetonationTime
            "v4": "?", // TotalDamage
            "v5": "?", // AmmoRechargeRateTooltip
            "cooldown": "2",
            "cost": "30",
            "stats": "사거리 750"
        },
        "R": {
            "v1": "?", // DamageCalc
            "v2": "?", // MaxIncreaseCalc
            "v3": "?", // SlowDuration
            "v4": "?", // SlowPercent*100
            "v5": "?", // FourthShotMultiplier*100
            "cooldown": "120 / 105 / 90",
            "cost": "100",
            "stats": "사거리 25000"
        },
    },
    "Zilean": { // 질리언
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // FuseDuration
            "v2": "?", // TotalDamage
            "v3": "?", // StunDuration
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": "사거리 900"
        },
        "W": {
            "v1": "?", // CooldownReduction
            "cooldown": "14 / 12 / 10 / 8 / 6",
            "cost": "35",
            "stats": "사거리 600"
        },
        "E": {
            "v1": "?", // Duration
            "v2": "?", // SpeedAmount
            "cooldown": "15",
            "cost": "50",
            "stats": "사거리 550"
        },
        "R": {
            "v1": "?", // RDuration
            "v2": "?", // ReviveStateDuration
            "v3": "?", // RTotalHeal
            "cooldown": "120 / 90 / 60",
            "cost": "125 / 150 / 175",
            "stats": "사거리 900"
        },
    },
    "Jade_Zilean": { // 질리언
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // CountdownTimer
            "v2": "?", // TotalDamage
            "cooldown": "10",
            "cost": "70 / 85 / 100 / 115 / 130",
            "stats": "사거리 650"
        },
        "W": {
            "v1": "?", // CooldownRefund
            "cooldown": "18 / 15 / 12 / 9 / 6",
            "cost": "50",
            "stats": "사거리 600"
        },
        "E": {
            "v1": "?", // Duration
            "v2": "?", // MoveSpeedMod*100
            "cooldown": "20",
            "cost": "80",
            "stats": "사거리 550"
        },
        "R": {
            "v1": "?", // RDuration
            "v2": "?", // RTotalHeal
            "cooldown": "180",
            "cost": "125 / 150 / 175",
            "stats": "사거리 900"
        },
    },
    "Jinx": { // 징크스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // RocketDamage
            "v2": "?", // RocketASPDPenalty*100
            "v3": "?", // RocketBonusRange
            "v4": "?", // MinigunAttackSpeedDuration
            "v5": "?", // MinigunAttackSpeedStacks
            "v6": "?", // MinigunAttackSpeedMax
            "cooldown": "0.9",
            "cost": "20",
            "stats": "사거리 600"
        },
        "W": {
            "v1": "?", // TotalDamage
            "v2": "?", // SlowDuration
            "v3": "?", // SlowPercent
            "cooldown": "8 / 7 / 6 / 5 / 4",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": "사거리 1450"
        },
        "E": {
            "v1": "?", // GrenadeDuration
            "v2": "?", // RootDuration
            "v3": "?", // TotalDamage
            "cooldown": "24 / 20.5 / 17 / 13.5 / 10",
            "cost": "90",
            "stats": "사거리 925"
        },
        "R": {
            "v1": "?", // DamageFloor
            "v2": "?", // DamageMax
            "v3": "?", // PercentDamage
            "v4": "?", // AoEDamageMult*100
            "v5": "?", // MonsterExecuteMax
            "cooldown": "85 / 65 / 45",
            "cost": "100",
            "stats": "사거리 25000"
        },
    },
    "Chogath": { // 초가스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // Effect5Amount
            "v2": "?", // TotalDamageTooltip
            "v3": "?", // Effect3Amount
            "v4": "?", // Effect2Amount
            "cooldown": "6",
            "cost": "50",
            "stats": "사거리 950"
        },
        "W": {
            "v1": "?", // Effect2Amount
            "v2": "?", // TotalDamageTooltip
            "cooldown": "11 / 10.5 / 10 / 9.5 / 9",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": "사거리 300"
        },
        "E": {
            "v1": "?", // FlatDamageCalc
            "v2": "?", // MaxHealthPercentCalc
            "v3": "?", // SlowAmountPercentage
            "v4": "?", // SlowDuration
            "cooldown": "8 / 7 / 6 / 5 / 4",
            "cost": "30",
            "stats": "사거리 40"
        },
        "R": {
            "v1": "?", // RDamage
            "v2": "?", // RMonsterDamage
            "v3": "?", // RHealthPerStack
            "v4": "?", // RMinionMaxStacks
            "cooldown": "80 / 70 / 60",
            "cost": "100",
            "stats": "사거리 175"
        },
    },
    "Jade_Chogath": { // 초가스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // KnockUpDuration
            "v2": "?", // TotalDamage
            "v3": "?", // SlowDuration
            "v4": "?", // SlowAmountPercentage
            "cooldown": "9",
            "cost": "90",
            "stats": "사거리 950"
        },
        "W": {
            "v1": "?", // SilenceDuration
            "v2": "?", // TotalDamage
            "cooldown": "13",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": "사거리 300"
        },
        "E": {
            "v1": "?", // TotalDamage
            "cooldown": "0.5",
            "cost": "-",
            "stats": "사거리 40"
        },
        "R": {
            "v1": "?", // RDamage
            "v2": "?", // RMonsterDamage
            "v3": "?", // RHealthPerStack
            "cooldown": "60",
            "cost": "100",
            "stats": "사거리 175"
        },
    },
    "Karma": { // 카르마
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // SlowDuration
            "v3": "?", // SlowAmount*-100
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "40 / 50 / 60 / 70 / 80",
            "stats": "사거리 950"
        },
        "W": {
            "v1": "?", // InitialDamage
            "v2": "?", // TetherDuration
            "v3": "?", // RootDuration
            "cooldown": "12",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 675"
        },
        "E": {
            "v1": "?", // ShieldDuration
            "v2": "?", // TotalShield
            "v3": "?", // MoveSpeedDuration
            "v4": "?", // MoveSpeed*100
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": "사거리 800"
        },
        "R": {
            "v1": "?", // RQImpactDamage
            "v2": "?", // RQFieldDamage
            "v3": "?", // RWHealAmount
            "v4": "?", // RWBonusRoot
            "v5": "?", // REBonusShield
            "v6": "?", // REBonusShieldArea
            "v7": "?", // REMoveSpeed*100
            "cooldown": "40 / 38 / 36",
            "cost": "-",
            "stats": "사거리 1100"
        },
    },
    "Camille": { // 카밀
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // BonusDamage
            "v2": "?", // MSDuration
            "v3": "?", // MSBonus*100
            "v4": "?", // QTotalRecastTime
            "v5": "?", // QRampUpTime
            "v6": "?", // EmpoweredBonusDamage
            "v7": "?", // DamageConversionPercentage
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "25",
            "stats": "사거리 325"
        },
        "W": {
            "v1": "?", // BaseDamageTotal
            "v2": "?", // SlowPercentage
            "v3": "?", // SlowDuration
            "v4": "?", // OuterEdgeTooltip
            "v5": "?", // OuterConeHealingRatio
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 610"
        },
        "E": {
            "v1": "?", // ASDuration
            "v2": "?", // ASBuff*100
            "v3": "?", // TotalDamage
            "v4": "?", // KnockupDuration
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "70",
            "stats": "사거리 800"
        },
        "R": {
            "v1": "?", // RDuration
            "v2": "?", // RPercentCurrentHPDamage
            "cooldown": "140 / 115 / 90",
            "cost": "100",
            "stats": "사거리 475"
        },
    },
    "Kassadin": { // 카사딘
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // TotalShield
            "cooldown": "9 / 8.5 / 8 / 7.5 / 7",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": "사거리 650"
        },
        "W": {
            "v1": "?", // OnHitDamage
            "v2": "?", // ActiveDamage
            "v3": "?", // MissingManaRatio
            "v4": "?", // ChampionMissingManaRatio
            "cooldown": "7",
            "cost": "1",
            "stats": "사거리 1"
        },
        "E": {
            "v1": "?", // ReductionPerSpellCast
            "v2": "?", // TotalDamage
            "v3": "?", // SlowDuration
            "v4": "?", // SlowAmount
            "cooldown": "21 / 20 / 19 / 18 / 17",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": "사거리 400"
        },
        "R": {
            "v1": "?", // BaseDamage
            "v2": "?", // RStackDuration
            "v3": "?", // BonusDamage
            "v4": "?", // MaxStacks
            "cooldown": "5 / 3.5 / 2",
            "cost": "40",
            "stats": "사거리 500"
        },
    },
    "Jade_Kassadin": { // 카사딘
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // SilenceDuration
            "cooldown": "9",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": "사거리 650"
        },
        "W": {
            "v1": "?", // ManaGainAmount
            "v2": "?", // ManaGainAmount*3
            "v3": "?", // TotalDamage
            "cooldown": "12",
            "cost": "25",
            "stats": "사거리 1"
        },
        "E": {
            "v1": "?", // TotalDamage
            "v2": "?", // MoveSpeedMod*-100
            "cooldown": "6",
            "cost": "80",
            "stats": "사거리 400"
        },
        "R": {
            "v1": "?", // TotalDamage
            "v2": "?", // Damage
            "cooldown": "7 / 6 / 5",
            "cost": "100",
            "stats": "사거리 700"
        },
    },
    "Karthus": { // 카서스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // QDamage
            "v2": "?", // QSingleTargetDamage
            "cooldown": "0",
            "cost": "20 / 25 / 30 / 35 / 40",
            "stats": "사거리 875"
        },
        "W": {
            "v1": "?", // WallDuration
            "v2": "?", // DebuffDuration
            "v3": "?", // MagicResistShred
            "v4": "?", // SlowPercent
            "cooldown": "15",
            "cost": "70",
            "stats": "사거리 1000"
        },
        "E": {
            "v1": "?", // ManaRestoreOnKill
            "v2": "?", // TotalDPS
            "cooldown": "0.5",
            "cost": "30 / 42 / 54 / 66 / 78",
            "stats": "사거리 550"
        },
        "R": {
            "v1": "?", // TotalDamage
            "cooldown": "200 / 180 / 160",
            "cost": "100",
            "stats": "사거리 10000"
        },
    },
    "Jade_Karthus": { // 카서스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // QDamage
            "cooldown": "1",
            "cost": "20 / 26 / 32 / 38 / 44",
            "stats": "사거리 875"
        },
        "W": {
            "v1": "?", // Duration
            "v2": "?", // MagicReduction*-100
            "v3": "?", // Slow*-100
            "cooldown": "18",
            "cost": "100",
            "stats": "사거리 1000"
        },
        "E": {
            "v1": "?", // ManaRestoreOnKill
            "v2": "?", // TotalDPS
            "cooldown": "0.5",
            "cost": "30 / 42 / 54 / 66 / 78",
            "stats": "사거리 550"
        },
        "R": {
            "v1": "?", // TotalDamage
            "cooldown": "200 / 180 / 160",
            "cost": "150 / 175 / 200",
            "stats": "사거리 10000"
        },
    },
    "Cassiopeia": { // 카시오페아
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // PoisonDuration
            "v2": "?", // TooltipTotalDamage
            "v3": "?", // ChampHitMSBonus
            "v4": "?", // ChampHitMSDuration
            "cooldown": "3.5",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 850"
        },
        "W": {
            "v1": "?", // CloudDuration
            "v2": "?", // DamagePerSecond
            "v3": "?", // SlowPercent
            "cooldown": "24 / 22 / 20 / 18 / 16",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": "사거리 700"
        },
        "E": {
            "v1": "?", // BasicDamage
            "v2": "?", // BonusPoisonedDamage
            "v3": "?", // HealCalc
            "v4": "?", // HealCalcMinion
            "v5": "?", // Cost
            "cooldown": "0.75",
            "cost": "40",
            "stats": "사거리 700"
        },
        "R": {
            "v1": "?", // RDamage
            "v2": "?", // RCCDuration
            "v3": "?", // RSlowPercent
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": "사거리 825"
        },
    },
    "Kaisa": { // 카이사
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // Effect2Amount
            "v2": "?", // TotalIndividualMissileDamage
            "v3": "?", // MaxDamageDisplay
            "v4": "?", // ExtraHitReduction*100
            "v5": "?", // Effect7Amount
            "v6": "?", // f11.1
            "v7": "?", // Effect6Amount
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "55",
            "stats": "사거리 600"
        },
        "W": {
            "v1": "?", // TotalDamage
            "v2": "?", // Effect4Amount
            "v3": "?", // Effect5Amount
            "v4": "?", // Effect3Amount
            "v5": "?", // f2.1
            "v6": "?", // Effect2Amount
            "cooldown": "20 / 18.5 / 17 / 15.5 / 14",
            "cost": "55 / 60 / 65 / 70 / 75",
            "stats": "사거리 3000"
        },
        "E": {
            "v1": "?", // TotalMoveSpeed
            "v2": "?", // Effect2Amount
            "v3": "?", // Effect5Amount*100
            "v4": "?", // Effect4Amount
            "v5": "?", // Effect7Amount
            "v6": "?", // f10.1
            "v7": "?", // Effect6Amount
            "cooldown": "16 / 14.5 / 13 / 11.5 / 10",
            "cost": "30",
            "stats": "사거리 1"
        },
        "R": {
            "v1": "?", // RShieldDuration
            "v2": "?", // RCalculatedShieldValue
            "cooldown": "130 / 100 / 70",
            "cost": "100",
            "stats": "사거리 2000 / 2500 / 3000"
        },
    },
    "Khazix": { // 카직스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "cooldown": "4",
            "cost": "20",
            "stats": "사거리 325"
        },
        "W": {
            "v1": "?", // BaseDamage
            "v2": "?", // HealAmount
            "cooldown": "9",
            "cost": "55 / 60 / 65 / 70 / 75",
            "stats": "사거리 1000"
        },
        "E": {
            "v1": "?", // TotalDamage
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "50",
            "stats": "사거리 700"
        },
        "R": {
            "v1": "?", // StealthDuration
            "v2": "?", // BonusMovementSpeedPercent*100
            "v3": "?", // RecastWindow
            "v4": "?", // EvolvedStealthDuration
            "cooldown": "100 / 85 / 70",
            "cost": "100",
            "stats": "사거리 25000"
        },
    },
    "Katarina": { // 카타리나
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // MaxBounces
            "v2": "?", // TotalDamage
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "-",
            "stats": "사거리 625"
        },
        "W": {
            "v1": "?", // Effect4Amount
            "v2": "?", // Effect2Amount
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "-",
            "stats": "사거리 25000"
        },
        "E": {
            "v1": "?", // TotalDamage
            "v2": "?", // DaggerCooldownReduction
            "v3": "?", // TooltipDaggerReduction
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "-",
            "stats": "사거리 725"
        },
        "R": {
            "v1": "?", // DamageCalc
            "v2": "?", // ADDamageCalc
            "v3": "?", // GrievousDuration
            "v4": "?", // GrievousAmount*100
            "v5": "?", // Duration
            "v6": "?", // TotalDamageCalc
            "v7": "?", // TotalADDamageCalc
            "cooldown": "75 / 60 / 45",
            "cost": "-",
            "stats": "사거리 550"
        },
    },
    "Jade_Katarina": { // 카타리나
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // MaxBounces
            "v3": "?", // MarkDuration
            "v4": "?", // TotalDamageMark
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "-",
            "stats": "사거리 675"
        },
        "W": {
            "v1": "?", // TotalDamage
            "v2": "?", // BuffDuration
            "v3": "?", // Haste*100
            "cooldown": "4",
            "cost": "-",
            "stats": "사거리 400"
        },
        "E": {
            "v1": "?", // TotalDamage
            "v2": "?", // DamageReductionDuration
            "v3": "?", // DamageReduction
            "cooldown": "12 / 10.5 / 9 / 7.5 / 6",
            "cost": "-",
            "stats": "사거리 725"
        },
        "R": {
            "v1": "?", // DamageCalcTooltipOnly
            "cooldown": "60 / 52.5 / 45",
            "cost": "-",
            "stats": "사거리 550"
        },
    },
    "Kalista": { // 칼리스타
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "cooldown": "9",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": "사거리 1150"
        },
        "W": {
            "v1": "?", // MaxHealthDamage*100
            "v2": "?", // PerTargetCooldown
            "v3": "?", // MaximumMonsterDamage
            "v4": "?", // AmmoRechargeTooltip
            "cooldown": "30",
            "cost": "-",
            "stats": "사거리 5000"
        },
        "E": {
            "v1": "?", // NormalDamage
            "v2": "?", // AdditionalDamage
            "v3": "?", // SlowDuration
            "v4": "?", // TotalSlowAmount
            "v5": "?", // ManaRefund
            "cooldown": "0",
            "cost": "30",
            "stats": "사거리 1000"
        },
        "R": {
            "cooldown": "160 / 140 / 120",
            "cost": "100",
            "stats": "사거리 1000"
        },
    },
    "Kennen": { // 케넨
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "cooldown": "7 / 6.25 / 5.5 / 4.75 / 4",
            "cost": "60 / 55 / 50 / 45 / 40",
            "stats": "사거리 950"
        },
        "W": {
            "v1": "?", // TotalDamagePassive
            "v2": "?", // TotalDamageActive
            "cooldown": "13 / 11.25 / 9.5 / 7.75 / 6",
            "cost": "40",
            "stats": "사거리 725"
        },
        "E": {
            "v1": "?", // DurationAsBall
            "v2": "?", // MovementSpeed*100
            "v3": "?", // TotalDamage
            "v4": "?", // EnergyRefund
            "v5": "?", // DurationAfterBall
            "v6": "?", // TotalAS*100
            "v7": "?", // CritDurationBonus
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "80",
            "stats": "사거리 170"
        },
        "R": {
            "v1": "?", // KennenRTickRate
            "v2": "?", // PerTickDamageCalculated
            "v3": "?", // KennenRDuration
            "v4": "?", // KennenRDefenses
            "v5": "?", // DamageAmp*100
            "cooldown": "120",
            "cost": "-",
            "stats": "사거리 550"
        },
    },
    "Caitlyn": { // 케이틀린
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // InitialDamage
            "v2": "?", // SecondaryDamage
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "55 / 60 / 65 / 70 / 75",
            "stats": "사거리 1250"
        },
        "W": {
            "v1": "?", // RootDuration
            "v2": "?", // TrapDuration
            "v3": "?", // MaximumTraps
            "v4": "?", // MaximumCharges
            "v5": "?", // AmmoRechargeTime
            "v6": "?", // HeadshotBonusDamage
            "cooldown": "0.5",
            "cost": "20",
            "stats": "사거리 800"
        },
        "E": {
            "v1": "?", // SlowDuration
            "v2": "?", // SlowAmount
            "v3": "?", // NetDamage
            "cooldown": "16 / 14 / 12 / 10 / 8",
            "cost": "75",
            "stats": "사거리 750"
        },
        "R": {
            "v1": "?", // RTotalDamage
            "cooldown": "90",
            "cost": "100",
            "stats": "사거리 3500"
        },
    },
    "Kayn": { // 케인
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // DarkinFlatDamage
            "v3": "?", // DarkinPercentDamage
            "cooldown": "7 / 6.5 / 6 / 5.5 / 5",
            "cost": "40",
            "stats": "사거리 350"
        },
        "W": {
            "v1": "?", // TotalDamage
            "v2": "?", // Effect3Amount*-100
            "v3": "?", // Effect5Amount
            "v4": "?", // Effect2Amount
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": "사거리 700"
        },
        "E": {
            "v1": "?", // Effect2Amount
            "v2": "?", // Effect1Amount
            "v3": "?", // TotalHealing
            "v4": "?", // Effect3Amount
            "v5": "?", // Effect5Amount
            "v6": "?", // AssassinCDReduction
            "cooldown": "21 / 19 / 17 / 15 / 13",
            "cost": "90",
            "stats": "사거리 400"
        },
        "R": {
            "v1": "?", // InfestDuration
            "v2": "?", // Damage
            "v3": "?", // SlayerDamage
            "v4": "?", // HealValue
            "v5": "?", // SlayerHealPercent*100
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": "사거리 550"
        },
    },
    "Kayle": { // 케일
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // SlowDuration
            "v3": "?", // SlowPercent
            "v4": "?", // ShredDuration
            "v5": "?", // ShredPercent
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": "사거리 900"
        },
        "W": {
            "v1": "?", // TotalHeal
            "v2": "?", // HasteDuration
            "v3": "?", // TotalHaste
            "cooldown": "15",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": "사거리 900"
        },
        "E": {
            "v1": "?", // EPassiveTotalDamage
            "v2": "?", // ActiveTotalExecuteDamage
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "-",
            "stats": "사거리 550"
        },
        "R": {
            "v1": "?", // InvulnDuration
            "v2": "?", // TotalDamage
            "cooldown": "160 / 120 / 80",
            "cost": "100 / 50 / 0",
            "stats": "사거리 900"
        },
    },
    "Jade_Kayle": { // 케일
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // Duration
            "v3": "?", // SlowPercent
            "v4": "?", // DamageAmp*100
            "cooldown": "8",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": "사거리 625"
        },
        "W": {
            "v1": "?", // Duration
            "v2": "?", // MoveSpeed*100
            "v3": "?", // TotalHeal
            "cooldown": "10",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": "사거리 700"
        },
        "E": {
            "v1": "?", // Duration
            "v2": "?", // BonusRange
            "v3": "?", // TargetDamage
            "v4": "?", // SplashDamage
            "cooldown": "22 / 21 / 20 / 19 / 18",
            "cost": "65",
            "stats": "사거리 400"
        },
        "R": {
            "v1": "?", // Duration
            "cooldown": "90 / 75 / 60",
            "cost": "100 / 75 / 50",
            "stats": "사거리 1200"
        },
    },
    "KogMaw": { // 코그모
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // AttackSpeed*100
            "v2": "?", // TotalDamage
            "v3": "?", // ShredDuration
            "v4": "?", // ShredAmount
            "cooldown": "7",
            "cost": "40",
            "stats": "사거리 1175"
        },
        "W": {
            "v1": "?", // Range
            "v2": "?", // Duration
            "v3": "?", // TotalHealthDamage
            "cooldown": "17",
            "cost": "40",
            "stats": "사거리 530"
        },
        "E": {
            "v1": "?", // TotalDamage
            "v2": "?", // TrailDuration
            "v3": "?", // SlowAmount
            "cooldown": "12",
            "cost": "40 / 55 / 70 / 85 / 100",
            "stats": "사거리 1200"
        },
        "R": {
            "v1": "?", // BaseDamageCalc
            "v2": "?", // TooltipMissingHealthDamageAmp
            "v3": "?", // MaxDamageCalc
            "v4": "?", // ManaCostDuration
            "v5": "?", // BaseCost
            "v6": "?", // ManaCostCap
            "cooldown": "2 / 1.5 / 1",
            "cost": "40",
            "stats": "사거리 1300 / 1550 / 1800"
        },
    },
    "Jade_KogMaw": { // 코그모
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // PassiveAttackSpeed*100
            "v2": "?", // TotalDamage
            "v3": "?", // DebuffDuration
            "v4": "?", // ArmorShred
            "cooldown": "8",
            "cost": "60",
            "stats": "사거리 625"
        },
        "W": {
            "v1": "?", // Duration
            "v2": "?", // Range
            "v3": "?", // TotalHealthDamage
            "cooldown": "17",
            "cost": "50",
            "stats": "사거리 530"
        },
        "E": {
            "v1": "?", // TotalDamage
            "v2": "?", // TrailDuration
            "v3": "?", // SlowAmount*100
            "cooldown": "12",
            "cost": "80 / 90 / 100 / 110 / 120",
            "stats": "사거리 1200"
        },
        "R": {
            "v1": "?", // TotalDamage
            "v2": "?", // VisionDebuffDuration
            "v3": "?", // ChampionTotalDamage
            "v4": "?", // ManaCostDuration
            "v5": "?", // BaseCost
            "v6": "?", // ManaCostCap
            "cooldown": "2 / 1.5 / 1",
            "cost": "40",
            "stats": "사거리 1400 / 1700 / 2000"
        },
    },
    "Corki": { // 코르키
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // RevealDuration
            "cooldown": "9 / 8.5 / 8 / 7.5 / 7",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": "사거리 825"
        },
        "W": {
            "v1": "?", // TrailDuration
            "v2": "?", // MaximumDamage
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "80 / 85 / 90 / 95 / 100",
            "stats": "사거리 600"
        },
        "E": {
            "v1": "?", // SprayDuration
            "v2": "?", // TotalDamage
            "v3": "?", // ShredMax*-1
            "cooldown": "12",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 600"
        },
        "R": {
            "v1": "?", // RSmallMissileDamage
            "v2": "?", // RBigMissileDamage
            "v3": "?", // MaxAmmoTOOLTIP
            "v4": "?", // AttackRefund
            "cooldown": "2",
            "cost": "35",
            "stats": "사거리 1225"
        },
    },
    "Jade_Corki": { // 코르키
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "cooldown": "8",
            "cost": "80 / 90 / 100 / 110 / 120",
            "stats": "사거리 600"
        },
        "W": {
            "v1": "?", // TotalDamage
            "cooldown": "26 / 23 / 20 / 17 / 14",
            "cost": "50",
            "stats": "사거리 600"
        },
        "E": {
            "v1": "?", // TotalDamageTooltipOnly
            "v2": "?", // ArmorMod*-1
            "cooldown": "16",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": "사거리 600"
        },
        "R": {
            "v1": "?", // TotalDamage
            "v2": "?", // AmmoRechargeTime
            "v3": "?", // TotalDamageBig
            "cooldown": "1.2",
            "cost": "20",
            "stats": "사거리 1225"
        },
    },
    "Quinn": { // 퀸
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // VisionReductionDuration
            "v2": "?", // TotalDamage
            "cooldown": "11 / 10.5 / 10 / 9.5 / 9",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 1025"
        },
        "W": {
            "v1": "?", // BuffDuration
            "v2": "?", // AttackSpeedBonus*100
            "v3": "?", // MovespeedAmount*100
            "v4": "?", // VisionDuration
            "cooldown": "50 / 45 / 40 / 35 / 30",
            "cost": "-",
            "stats": "사거리 2100"
        },
        "E": {
            "v1": "?", // TotalDamage
            "v2": "?", // SlowAmount*100
            "v3": "?", // SlowDecayTime
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "50",
            "stats": "사거리 675"
        },
        "R": {
            "v1": "?", // MovementSpeedMod*100
            "v2": "?", // Damage
            "cooldown": "3",
            "cost": "50 / 25 / 0",
            "stats": "사거리 700"
        },
    },
    "KSante": { // 크산테
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // BaseDamage
            "v2": "?", // SlowDuration
            "v3": "?", // SlowPercent*100
            "v4": "?", // RecastWindow
            "v5": "?", // StunDuration
            "v6": "?", // RCooldownReduction.0*100
            "cooldown": "3.5",
            "cost": "20",
            "stats": "사거리 450"
        },
        "W": {
            "v1": "?", // MinDurationTOOLTIP
            "v2": "?", // MaxDuration.1
            "v3": "?", // DamageReduction*100
            "v4": "?", // BaseDamage
            "v5": "?", // TotalMaxHealthDamage
            "v6": "?", // MinKnockbackDuration
            "v7": "?", // MaxKnockbackDuration
            "v8": "?", // RDamageIncreaseMin*100
            "v9": "?", // RDamageIncreaseMax*100
            "v10": "?", // RDamageReduction*100
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": "사거리 600"
        },
        "E": {
            "v1": "?", // ShieldDuration
            "v2": "?", // TotalShield
            "v3": "?", // CooldownModAO*100
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "45 / 50 / 55 / 60 / 65",
            "stats": "사거리 525"
        },
        "R": {
            "v1": "?", // BaseDamage
            "v2": "?", // AllOutDuration
            "v3": "?", // TotalDamageSlamDown
            "v4": "?", // AttackSpeed*100
            "v5": "?", // ArmorPenPercent*100
            "v6": "?", // Omnivamp*100
            "v7": "?", // HealthLost*100
            "v8": "?", // DefensesLost*100
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": "사거리 250"
        },
    },
    "Kled": { // 클레드
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // TetherPopTime
            "v3": "?", // TotalYankDamage
            "v4": "?", // SlowDuration
            "v5": "?", // SlowAmount*-100
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "-",
            "stats": "사거리 800"
        },
        "W": {
            "v1": "?", // ActiveDuration
            "v2": "?", // AttackSpeed*100
            "v3": "?", // BaseFlatDamage
            "v4": "?", // PercentDamage
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "-"
        },
        "E": {
            "v1": "?", // TotalDamage
            "v2": "?", // MoveSpeedDuration
            "v3": "?", // MoveSpeed*100
            "v4": "?", // RecastWindow
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "-",
            "stats": "사거리 550"
        },
        "R": {
            "v1": "?", // MaximumShield
            "v2": "?", // MinimumDamageTooltip
            "v3": "?", // MaximumChargeDamage
            "cooldown": "140 / 125 / 110",
            "cost": "-",
            "stats": "사거리 3500 / 4000 / 4500"
        },
    },
    "Qiyana": { // 키아나
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // VanillaDamage
            "v2": "?", // SlowDuration
            "v3": "?", // SlowPotency*-100
            "v4": "?", // CritThreshold*100
            "v5": "?", // TremorDamage
            "v6": "?", // Haste*100
            "cooldown": "7",
            "cost": "35",
            "stats": "사거리 525"
        },
        "W": {
            "v1": "?", // AttackSpeed*100
            "v2": "?", // OnHitDamage
            "v3": "?", // PassiveMS*100
            "cooldown": "7",
            "cost": "25 / 30 / 35 / 40 / 45",
            "stats": "사거리 1100"
        },
        "E": {
            "v1": "?", // Damage
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": "사거리 650"
        },
        "R": {
            "v1": "?", // StunDuration
            "v2": "?", // Damage
            "v3": "?", // MissingHealthDamageRock
            "cooldown": "120",
            "cost": "100",
            "stats": "사거리 950"
        },
    },
    "Kindred": { // 킨드레드
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // BaseASDuration
            "v3": "?", // TotalQAttackSpeed
            "v4": "?", // CDNewValue
            "cooldown": "9",
            "cost": "35",
            "stats": "사거리 340"
        },
        "W": {
            "v1": "?", // AttackHeal
            "v2": "?", // BaseWolfDamage
            "v3": "?", // PercentWolfDamage
            "cooldown": "18 / 17 / 16 / 15 / 14",
            "cost": "40",
            "stats": "사거리 560"
        },
        "E": {
            "v1": "?", // SlowDuration
            "v2": "?", // TotalSlow
            "v3": "?", // TotalDuration
            "v4": "?", // BaseBiteDamage
            "v5": "?", // PercentBiteDamage
            "cooldown": "14 / 12.5 / 11 / 9.5 / 8",
            "cost": "",
            "stats": "사거리 500"
        },
        "R": {
            "v1": "?", // BuffDuration
            "v2": "?", // HealFlat
            "cooldown": "160 / 140 / 120",
            "cost": "100",
            "stats": "사거리 500"
        },
    },
    "Taric": { // 타릭
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // StackCooldown
            "v2": "?", // Effect6Amount
            "v3": "?", // HealingPerStack
            "v4": "?", // MaxStackHealing
            "cooldown": "3",
            "cost": "60",
            "stats": "사거리 325"
        },
        "W": {
            "v1": "?", // BonusArmor
            "v2": "?", // Effect3Amount
            "v3": "?", // Effect2Amount
            "cooldown": "15",
            "cost": "60",
            "stats": "사거리 800"
        },
        "E": {
            "v1": "?", // Effect3Amount
            "v2": "?", // TotalDamage
            "v3": "?", // Effect2Amount
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "40",
            "stats": "사거리 610"
        },
        "R": {
            "v1": "?", // InitialDelay
            "v2": "?", // InvulnDuration
            "cooldown": "180 / 150 / 120",
            "cost": "100",
            "stats": "사거리 400"
        },
    },
    "Jade_Taric": { // 타릭
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // HealAmount
            "v2": "?", // HealAmountSelfTT
            "cooldown": "20 / 19 / 18 / 17 / 16",
            "cost": "80 / 95 / 110 / 125 / 140",
            "stats": "사거리 750"
        },
        "W": {
            "v1": "?", // ArmorBonus
            "v2": "?", // BonustoAllies
            "v3": "?", // ArmorBonusCoefficient*100
            "v4": "?", // TotalDamage
            "v5": "?", // ArmorShred*-1
            "cooldown": "10",
            "cost": "50",
            "stats": "사거리 400"
        },
        "E": {
            "v1": "?", // TotalDamage
            "v2": "?", // TotalMaxDamageTT
            "v3": "?", // MinStunLength
            "v4": "?", // MaxStunLength
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "75",
            "stats": "사거리 650"
        },
        "R": {
            "v1": "?", // TotalDamage
            "v2": "?", // DamageIncrease
            "v3": "?", // AllyBonus
            "cooldown": "60",
            "cost": "100",
            "stats": "사거리 400"
        },
    },
    "Talon": { // 탈론
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // LeapDamage
            "v2": "?", // CriticalDamage
            "v3": "?", // TotalHealing
            "v4": "?", // CooldownRefund*100
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "40",
            "stats": "사거리 575"
        },
        "W": {
            "v1": "?", // TotalInitialDamage
            "v2": "?", // TotalReturnDamage
            "v3": "?", // SlowDuration
            "v4": "?", // MovespeedSlow*100
            "cooldown": "9 / 8.5 / 8 / 7.5 / 7",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 650"
        },
        "E": {
            "v1": "?", // WallCD
            "cooldown": "0",
            "cost": "-",
            "stats": "사거리 725"
        },
        "R": {
            "v1": "?", // Damage
            "v2": "?", // MoveSpeed*100
            "v3": "?", // Duration
            "cooldown": "100 / 80 / 60",
            "cost": "100",
            "stats": "사거리 550"
        },
    },
    "Taliyah": { // 탈리야
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // RockDamage
            "v2": "?", // ExtraMissileReducedDamagePercent
            "v3": "?", // BigRockManaCost
            "v4": "?", // WorkedGroundCDR*100
            "v5": "?", // SlowDuration
            "v6": "?", // SlowPercent*100
            "v7": "?", // BigRockDamage
            "v8": "?", // MonsterStunDuration
            "cooldown": "7 / 6 / 5 / 4 / 3",
            "cost": "55 / 60 / 65 / 70 / 75",
            "stats": "사거리 1000"
        },
        "W": {
            "cooldown": "14 / 12.5 / 11 / 9.5 / 8",
            "cost": "40 / 30 / 20 / 10 / 0",
            "stats": "사거리 900"
        },
        "E": {
            "v1": "?", // SlowPercent*100
            "v2": "?", // ScatterDamage
            "v3": "?", // StunDuration
            "v4": "?", // DetonationDamage
            "cooldown": "14",
            "cost": "90",
            "stats": "사거리 950"
        },
        "R": {
            "v1": "?", // WallDuration
            "v2": "?", // DamageLockoutTime
            "cooldown": "180 / 150 / 120",
            "cost": "100",
            "stats": "사거리 2500 / 4500 / 6500"
        },
    },
    "TahmKench": { // 탐 켄치
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // SlowDuration
            "v3": "?", // SlowAmount*100
            "v4": "?", // BaseHeal
            "v5": "?", // PercentHealthHealing*100
            "v6": "?", // StunDuration
            "cooldown": "7 / 6.5 / 6 / 5.5 / 5",
            "cost": "50 / 46 / 42 / 38 / 34",
            "stats": "사거리 900"
        },
        "W": {
            "v1": "?", // TotalDamage
            "v2": "?", // KnockupDuration
            "v3": "?", // ChampRefund*100
            "cooldown": "21 / 20 / 19 / 18 / 17",
            "cost": "60 / 75 / 90 / 105 / 120",
            "stats": "사거리 1000 / 1050 / 1100 / 1150 / 1200"
        },
        "E": {
            "v1": "?", // GreyHealthRatio*100
            "v2": "?", // EnhancedThreshold
            "v3": "?", // GreyHealthRatioEnhanced*100
            "v4": "?", // OOCTimer
            "v5": "?", // GreyHealthHealingRatio
            "v6": "?", // ShieldDuration
            "cooldown": "3",
            "cost": "",
            "stats": "사거리 2400"
        },
        "R": {
            "v1": "?", // EnemyDuration
            "v2": "?", // BaseDamage
            "v3": "?", // PercentHPDamage
            "v4": "?", // SlowAmount*100
            "v5": "?", // AllyDuration
            "v6": "?", // TotalShield
            "v7": "?", // AllySpeedAmount*100
            "cooldown": "0",
            "cost": "100",
            "stats": "사거리 25000"
        },
    },
    "Trundle": { // 트런들
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // SlowAmount*100
            "v3": "?", // SapDebuffDuration
            "v4": "?", // BonusAD
            "v5": "?", // SappedAD*-1
            "cooldown": "3.5",
            "cost": "20",
            "stats": "사거리 300"
        },
        "W": {
            "v1": "?", // Duration
            "v2": "?", // MSBonus*100
            "v3": "?", // ASBonus*100
            "v4": "?", // HealingBonus*100
            "cooldown": "18 / 17 / 16 / 15 / 14",
            "cost": "40",
            "stats": "사거리 750"
        },
        "E": {
            "v1": "?", // PillarDuration
            "v2": "?", // SlowAmount
            "cooldown": "21 / 19.5 / 18 / 16.5 / 15",
            "cost": "75",
            "stats": "사거리 1000"
        },
        "R": {
            "v1": "?", // ActualDurationOfDrainBuff
            "v2": "?", // TotalPercentHPDamage
            "v3": "?", // ArmorMRShred*100
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": "사거리 650"
        },
    },
    "Tristana": { // 트리스타나
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // BuffDuration
            "v2": "?", // AttackSpeedMod*100
            "cooldown": "20 / 19 / 18 / 17 / 16",
            "cost": "15 / 20 / 25 / 30 / 35",
            "stats": "사거리 20"
        },
        "W": {
            "v1": "?", // LandingDamage
            "v2": "?", // SlowDuration
            "v3": "?", // SlowMod*-100
            "cooldown": "22 / 20 / 18 / 16 / 14",
            "cost": "30 / 35 / 40 / 45 / 50",
            "stats": "사거리 900"
        },
        "E": {
            "v1": "?", // PassiveDamage
            "v2": "?", // ActiveDuration
            "v3": "?", // ActiveDamage
            "v4": "?", // ActivePerStackAmp*100
            "v5": "?", // ActiveMaxStacks
            "v6": "?", // ActiveMaxDamage
            "cooldown": "16 / 15.5 / 15 / 14.5 / 14",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 550"
        },
        "R": {
            "v1": "?", // DamageCalc
            "v2": "?", // StunDuration
            "cooldown": "100",
            "cost": "100",
            "stats": "사거리 550"
        },
    },
    "Jade_Tristana": { // 트리스타나
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // AttackSpeedMod*100
            "cooldown": "20",
            "cost": "50",
            "stats": "사거리 20"
        },
        "W": {
            "v1": "?", // LandingDamage
            "cooldown": "22 / 20 / 18 / 16 / 14",
            "cost": "80",
            "stats": "사거리 900"
        },
        "E": {
            "v1": "?", // PassiveDamage
            "v2": "?", // ActiveDamageTTOnly
            "cooldown": "16",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": "사거리 550"
        },
        "R": {
            "v1": "?", // DamageCalc
            "v2": "?", // KnockbackDistance
            "cooldown": "60",
            "cost": "100",
            "stats": "사거리 550"
        },
    },
    "Tryndamere": { // 트린다미어
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // MaximumBonusAD
            "v2": "?", // BaseHeal
            "v3": "?", // HealPerFury
            "v4": "?", // MaximumHeal
            "cooldown": "12",
            "cost": "-",
            "stats": "사거리 400"
        },
        "W": {
            "v1": "?", // ReductionDuration
            "v2": "?", // ADReduction*-1
            "v3": "?", // SlowDuration
            "v4": "?", // SlowPotency*-100
            "cooldown": "14",
            "cost": "-",
            "stats": "사거리 850"
        },
        "E": {
            "v1": "?", // TotalDamage
            "v2": "?", // NonChampFuryGain
            "v3": "?", // ChampFuryGain
            "v4": "?", // NonChampCDRefund
            "v5": "?", // ChampCDRefund
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "-",
            "stats": "사거리 650"
        },
        "R": {
            "v1": "?", // TryndRDuration
            "v2": "?", // TryndRMinHealth
            "v3": "?", // TryndRFuryGain
            "cooldown": "120 / 100 / 80",
            "cost": "-",
            "stats": "사거리 400"
        },
    },
    "Jade_Tryndamere": { // 트린다미어
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // ADPerStack
            "v2": "?", // CritDamagePerStack*100
            "v3": "?", // InitialHeal
            "v4": "?", // HealPerFury
            "v5": "?", // MaxHealTooltip
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "",
            "stats": "사거리 400"
        },
        "W": {
            "v1": "?", // DebuffDuration
            "v2": "?", // ADReduction*-1
            "v3": "?", // SlowPotency*-100
            "cooldown": "14",
            "cost": "",
            "stats": "사거리 800"
        },
        "E": {
            "v1": "?", // TotalDamage
            "cooldown": "8",
            "cost": "",
            "stats": "사거리 650"
        },
        "R": {
            "v1": "?", // Duration
            "v2": "?", // FuryGained
            "cooldown": "110 / 100 / 90",
            "cost": "",
            "stats": "사거리 400"
        },
    },
    "TwistedFate": { // 트위스티드 페이트
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "cooldown": "6 / 5.75 / 5.5 / 5.25 / 5",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": "사거리 10000"
        },
        "W": {
            "v1": "?", // BlueDamage
            "v2": "?", // Effect6Amount
            "v3": "?", // RedDamage
            "v4": "?", // Effect2Amount
            "v5": "?", // GoldDamage
            "v6": "?", // Effect3Amount
            "cooldown": "6",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 200"
        },
        "E": {
            "v1": "?", // AttackSpeedBonus
            "v2": "?", // BonusDamage
            "cooldown": "0",
            "cost": ""
        },
        "R": {
            "v1": "?", // Effect1Amount
            "v2": "?", // Effect4Amount
            "cooldown": "170 / 140 / 110",
            "cost": "100",
            "stats": "사거리 5500"
        },
    },
    "Jade_TwistedFate": { // 트위스티드 페이트
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "cooldown": "6",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": "사거리 10000"
        },
        "W": {
            "v1": "?", // BlueDamage
            "v2": "?", // ManaRestore
            "v3": "?", // RedDamage
            "v4": "?", // Slow
            "v5": "?", // GoldDamage
            "v6": "?", // Stun
            "cooldown": "6",
            "cost": "40 / 55 / 70 / 85 / 100",
            "stats": "사거리 200"
        },
        "E": {
            "v1": "?", // ChannelDuration
            "cooldown": "120 / 105 / 90 / 75 / 60",
            "cost": "80",
            "stats": "사거리 20000"
        },
        "R": {
            "v1": "?", // DebuffDuration
            "v2": "?", // SlowAmount*100
            "v3": "?", // ReducedChannelTime
            "cooldown": "130 / 110 / 90",
            "cost": "150",
            "stats": "사거리 20000"
        },
    },
    "Twitch": { // 트위치
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // StealthDuration
            "v2": "?", // MoveSpeedMod
            "v3": "?", // HiddenSpeed
            "v4": "?", // AttackSpeedDuration
            "v5": "?", // AttackSpeedMod*100
            "cooldown": "16",
            "cost": "40",
            "stats": "사거리 20"
        },
        "W": {
            "v1": "?", // Duration
            "v2": "?", // TotalSlowAmount
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "70",
            "stats": "사거리 950"
        },
        "E": {
            "v1": "?", // BaseDamage
            "v2": "?", // PhysicalDamagePerStack
            "v3": "?", // MagicDamagePerStack
            "v4": "?", // MaxPhysicalDamage
            "v5": "?", // MaxMagicDamage
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": "사거리 1200"
        },
        "R": {
            "v1": "?", // Duration
            "v2": "?", // BonusRange
            "v3": "?", // BonusAD
            "v4": "?", // FallOffDamage*100
            "v5": "?", // MinimumFallOffDamage*100
            "cooldown": "90",
            "cost": "100",
            "stats": "사거리 1200"
        },
    },
    "Jade_Twitch": { // 트위치
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // MaxFadeTime
            "v2": "?", // MaxDelayTime
            "v3": "?", // StealthDuration
            "v4": "?", // MoveSpeedMod*100
            "v5": "?", // AttackSpeedDuration
            "v6": "?", // AttackSpeedMod*100
            "cooldown": "16",
            "cost": "60",
            "stats": "사거리 20"
        },
        "W": {
            "v1": "?", // StacksAdded
            "v2": "?", // Duration
            "v3": "?", // BaseSlowAmount
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "50",
            "stats": "사거리 950"
        },
        "E": {
            "v1": "?", // BaseDamage
            "v2": "?", // TotalStackDamage
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": "사거리 1200"
        },
        "R": {
            "v1": "?", // Duration
            "v2": "?", // BonusRange
            "v3": "?", // BonusAD
            "v4": "?", // FallOffDamage*100
            "v5": "?", // MinimumFallOffDamage*100
            "cooldown": "120 / 110 / 100",
            "cost": "100 / 125 / 150",
            "stats": "사거리 1200"
        },
    },
    "Teemo": { // 티모
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // BlindDuration
            "v2": "?", // CalculatedDamage
            "cooldown": "7",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": "사거리 680"
        },
        "W": {
            "v1": "?", // PassiveCooldownOnDamageTaken
            "v2": "?", // PassiveMoveSpeedBonus*100
            "v3": "?", // ActiveMoveSpeedBuffDuration
            "v4": "?", // ActiveMoveSpeedBonus*100
            "cooldown": "14",
            "cost": "40",
            "stats": "사거리 20"
        },
        "E": {
            "v1": "?", // ImpactCalculatedDamage
            "v2": "?", // PoisonDuration
            "v3": "?", // TotalDotDamage
            "cooldown": "0",
            "cost": "",
            "stats": "사거리 680"
        },
        "R": {
            "v1": "?", // DebuffDuration
            "v2": "?", // SlowAmount
            "v3": "?", // TotalDamage
            "v4": "?", // MushroomDuration
            "v5": "?", // MaxAmmo
            "v6": "?", // AmmoRechargeTime
            "cooldown": "0.25",
            "cost": "75 / 55 / 35",
            "stats": "사거리 600 / 750 / 900"
        },
    },
    "Jade_Teemo": { // 티모
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // CalculatedDamage
            "v2": "?", // BlindDuration
            "cooldown": "8",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": "사거리 680"
        },
        "W": {
            "v1": "?", // PassiveMoveSpeedBonus*100
            "v2": "?", // ActiveMoveSpeedBonus*100
            "cooldown": "17",
            "cost": "40"
        },
        "E": {
            "v1": "?", // ImpactCalculatedDamage
            "v2": "?", // TickCalculatedDamage
            "cooldown": "0",
            "cost": "",
            "stats": "사거리 680"
        },
        "R": {
            "v1": "?", // SlowAmount
            "v2": "?", // TotalDamage
            "v3": "?", // AmmoRechargeTime
            "cooldown": "1",
            "cost": "75 / 100 / 125",
            "stats": "사거리 230"
        },
    },
    "Pyke": { // 파이크
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // SlowDuration
            "v3": "?", // SlowAmount*100
            "v4": "?", // ManaRefund*100
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": "사거리 400"
        },
        "W": {
            "v1": "?", // MoveSpeed
            "v2": "?", // CamoDuration
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "65",
            "stats": "사거리 600"
        },
        "E": {
            "v1": "?", // StunDuration
            "v2": "?", // TotalDamage
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "40",
            "stats": "사거리 550"
        },
        "R": {
            "v1": "?", // RDamage
            "v2": "?", // ReducedDamageFinal
            "v3": "?", // ReducedDamage*100
            "v4": "?", // RRecastDuration
            "cooldown": "100 / 85 / 70",
            "cost": "100",
            "stats": "사거리 750"
        },
    },
    "Pantheon": { // 판테온
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TapDamageCalc
            "v2": "?", // TapCooldownRefund*100
            "v3": "?", // HoldDamageCalc
            "v4": "?", // DamageFalloff*100
            "v5": "?", // CritHealthThreshold*100
            "v6": "?", // ExecuteDamageCalcModified
            "v7": "?", // EmpoweredDamageCalc
            "cooldown": "11 / 10.25 / 9.5 / 8.75 / 8",
            "cost": "25",
            "stats": "사거리 575"
        },
        "W": {
            "v1": "?", // StunDuration
            "v2": "?", // MaxHealthDamageCalc
            "v3": "?", // EmpoweredNumHits
            "v4": "?", // EmpoweredDamageMultCalcModified
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "55",
            "stats": "사거리 600"
        },
        "E": {
            "v1": "?", // ShieldDuration
            "v2": "?", // DamageCalc
            "v3": "?", // ShieldDamageCalc
            "v4": "?", // ResistsDuration
            "v5": "?", // ResistsCalc
            "v6": "?", // SpeedDuration
            "v7": "?", // SpeedAmount*100
            "cooldown": "22 / 21 / 20 / 19 / 18",
            "cost": "80",
            "stats": "사거리 400"
        },
        "R": {
            "v1": "?", // ArmorPenetration*100
            "v2": "?", // SpearSlowDuration
            "v3": "?", // SpearSlow*100
            "v4": "?", // DamageCalc
            "v5": "?", // EdgeDamageReduction*100
            "cooldown": "180 / 165 / 150",
            "cost": "100",
            "stats": "사거리 5500"
        },
    },
    "Jade_Pantheon": { // 판테온
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "cooldown": "4",
            "cost": "45",
            "stats": "사거리 600"
        },
        "W": {
            "v1": "?", // TotalDamage
            "v2": "?", // StunDuration
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "55",
            "stats": "사거리 600"
        },
        "E": {
            "v1": "?", // PassiveCritThreshold*100
            "v2": "?", // NumberOfStrikes
            "v3": "?", // TotalDamage
            "v4": "?", // MaximumDamageTooltip
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "45 / 50 / 55 / 60 / 65",
            "stats": "사거리 400"
        },
        "R": {
            "v1": "?", // MaxDamage
            "v2": "?", // MinDamage
            "v3": "?", // SlowDuration
            "v4": "?", // SlowAmount*100
            "cooldown": "150 / 135 / 120",
            "cost": "100",
            "stats": "사거리 5500"
        },
    },
    "FiddleSticks": { // 피들스틱
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // FearDuration
            "v2": "?", // TotalPercentHealthDamage
            "v3": "?", // TotalPercentHealthDamageFeared
            "cooldown": "15 / 14.5 / 14 / 13.5 / 13",
            "cost": "65",
            "stats": "사거리 575"
        },
        "W": {
            "v1": "?", // DrainDamageCalc
            "v2": "?", // PercentForTooltip
            "v3": "?", // VampPercentage
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": "사거리 650"
        },
        "E": {
            "v1": "?", // Damage
            "v2": "?", // SilenceDuration
            "v3": "?", // SlowAmount*-100
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": "사거리 850"
        },
        "R": {
            "v1": "?", // ChannelTime
            "v2": "?", // Duration
            "v3": "?", // TotalDamage
            "cooldown": "140 / 110 / 80",
            "cost": "100",
            "stats": "사거리 800"
        },
    },
    "Jade_Fiddlesticks": { // 피들스틱
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // FearDuration
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "65 / 75 / 85 / 95 / 105",
            "stats": "사거리 575"
        },
        "W": {
            "v1": "?", // DrainDuration
            "v2": "?", // TotalDamagePerSecond
            "v3": "?", // VampPercentage*100
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "80 / 90 / 100 / 110 / 120",
            "stats": "사거리 650"
        },
        "E": {
            "v1": "?", // TotalDamage
            "v2": "?", // SilenceDuration
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "50 / 70 / 90 / 110 / 130",
            "stats": "사거리 750"
        },
        "R": {
            "v1": "?", // ChannelTime
            "v2": "?", // Duration
            "v3": "?", // TotalDamage
            "cooldown": "150 / 140 / 130",
            "cost": "150 / 200 / 250",
            "stats": "사거리 800"
        },
    },
    "Fiora": { // 피오라
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // CDRefundPercent*100
            "cooldown": "13 / 11.25 / 9.5 / 7.75 / 6",
            "cost": "20",
            "stats": "사거리 400"
        },
        "W": {
            "v1": "?", // ParryDuration
            "v2": "?", // StabDamage
            "v3": "?", // CCDuration
            "v4": "?", // MSSlowPercent*-100
            "v5": "?", // AttackSlowPercent*-100
            "cooldown": "24 / 22 / 20 / 18 / 16",
            "cost": "50",
            "stats": "사거리 750"
        },
        "E": {
            "v1": "?", // ASPercent*100
            "v2": "?", // SlowDuration
            "v3": "?", // SlowPercent*-100
            "v4": "?", // AttackTwopercentTAD*100
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "40",
            "stats": "사거리 425"
        },
        "R": {
            "v1": "?", // PercentMS*100
            "v2": "?", // MarkDuration
            "v3": "?", // HealDuration
            "v4": "?", // HealPerSecondCalc
            "cooldown": "110 / 90 / 70",
            "cost": "100",
            "stats": "사거리 500"
        },
    },
    "Fizz": { // 피즈
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // TotalDamage
            "v2": "?", // QDamage
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "50",
            "stats": "사거리 550"
        },
        "W": {
            "v1": "?", // BleedDuration
            "v2": "?", // DoTDamage
            "v3": "?", // ActiveDamage
            "v4": "?", // OnKillManaRefund
            "v5": "?", // OnKillNewCooldown
            "v6": "?", // OnHitBuffDuration
            "v7": "?", // OnHitBuffDamage
            "cooldown": "7 / 6 / 5 / 4 / 3",
            "cost": "30 / 40 / 50 / 60 / 70",
            "stats": "사거리 600"
        },
        "E": {
            "v1": "?", // EDamage
            "v2": "?", // SlowDuration
            "v3": "?", // SlowAmount*100
            "cooldown": "16 / 14 / 12 / 10 / 8",
            "cost": "75 / 80 / 85 / 90 / 95",
            "stats": "사거리 400"
        },
        "R": {
            "v1": "?", // DetonationTime
            "v2": "?", // SmallSharkDamage
            "v3": "?", // BigSharkDamage
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": "사거리 1300"
        },
    },
    "Heimerdinger": { // 하이머딩거
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // MaxTurrets
            "v2": "?", // MaxKits
            "cooldown": "1",
            "cost": "20",
            "stats": "사거리 350"
        },
        "W": {
            "v1": "?", // Rockets
            "v2": "?", // Damage
            "v3": "?", // TotalDamage
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": "사거리 1325"
        },
        "E": {
            "v1": "?", // Damage
            "v2": "?", // SlowDuration
            "v3": "?", // SlowPercent.0*100
            "v4": "?", // StunDuration
            "cooldown": "11",
            "cost": "85",
            "stats": "사거리 970"
        },
        "R": {
            "v1": "?", // QUltDamage
            "v2": "?", // QUltDamageBeam
            "v3": "?", // WUltDamage
            "v4": "?", // WUltTotalDamage
            "v5": "?", // EUltDamage
            "cooldown": "100 / 85 / 70",
            "cost": "100",
            "stats": "사거리 1"
        },
    },
    "Jade_Heimerdinger": { // 하이머딩거
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // BonusDamage
            "v2": "?", // MaxAmmo
            "v3": "?", // AmmoRechargeTime
            "cooldown": "1",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": "사거리 350"
        },
        "W": {
            "v1": "?", // TotalDamage
            "cooldown": "10",
            "cost": "65 / 85 / 105 / 125 / 145",
            "stats": "사거리 1100"
        },
        "E": {
            "v1": "?", // TotalDamage
            "v2": "?", // BlindDuration
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "80 / 90 / 100 / 110 / 120",
            "stats": "사거리 920"
        },
        "R": {
            "v1": "?", // CooldownBonus*-100
            "v2": "?", // MovementSpeedMod*-100
            "cooldown": "120 / 105 / 90",
            "cost": "90",
            "stats": "사거리 1"
        },
    },
    "Hecarim": { // 헤카림
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // Damage
            "v2": "?", // BuffDuration
            "v3": "?", // RampageBonusDamagePerc
            "v4": "?", // RampageCooldownReduction
            "v5": "?", // MaxStacks
            "cooldown": "4",
            "cost": "28 / 26 / 24 / 22 / 20",
            "stats": "사거리 350"
        },
        "W": {
            "v1": "?", // BuffDuration
            "v2": "?", // TotalDamage
            "v3": "?", // ResistAmount
            "v4": "?", // LeechAmount
            "v5": "?", // AllyTooltipLeachValue
            "cooldown": "14",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": "사거리 525"
        },
        "E": {
            "v1": "?", // MinMoveSpeed*100
            "v2": "?", // Duration
            "v3": "?", // MaxMoveSpeed*100
            "v4": "?", // MinDamage
            "v5": "?", // MaxDamage
            "cooldown": "20 / 19 / 18 / 17 / 16",
            "cost": "60",
            "stats": "사거리 300"
        },
        "R": {
            "v1": "?", // DamageDone
            "v2": "?", // FearDurationMin
            "v3": "?", // FearDurationMax
            "cooldown": "140 / 120 / 100",
            "cost": "100",
            "stats": "사거리 50000"
        },
    },
    "Hwei": { // 흐웨이
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "?", // Tooltip_QQDamage
            "v2": "?", // Tooltip_QQBonusDamage
            "v3": "?", // Tooltip_QWDamage
            "v4": "?", // Tooltip_QWBonusDamage
            "v5": "?", // Tooltip_QEDamage
            "v6": "?", // Tooltip_QEDamagePerSecond
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "80 / 90 / 100 / 110 / 120"
        },
        "W": {
            "v1": "?", // Tooltip_WQMoveSpeed
            "v2": "?", // Tooltip_WWShieldAmount
            "v3": "?", // Tooltip_WEOnHitDamage
            "v4": "?", // Tooltip_WEOnHitManaRestore
            "cooldown": "18 / 17.5 / 17 / 16.5 / 16",
            "cost": "90 / 95 / 100 / 105 / 110"
        },
        "E": {
            "v1": "?", // Tooltip_EQDamage
            "v2": "?", // Tooltip_EQFleeDuration
            "v3": "?", // Tooltip_EWRootDuration
            "v4": "?", // Tooltip_EWDamage
            "v5": "?", // Tooltip_EEDamage
            "v6": "?", // Tooltip_EESlowAmount
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "50 / 55 / 60 / 65 / 70"
        },
        "R": {
            "v1": "?", // Duration
            "v2": "?", // SlowPercentPerStack
            "v3": "?", // DamageOverTime
            "v4": "?", // Damage
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": "사거리 1300"
        },
    },
};
