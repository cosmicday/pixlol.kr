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
            "p1": "?", // GameModeInteger
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "4.5",
            "cost": "50 / 45 / 40 / 35 / 30",
            "stats": {
                "사거리": "625"
            }
        },
        "W": {
            "p1": "?", // BaseHealth
            "p2": "?", // PercentHeal
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "22 / 20 / 18 / 16 / 14",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "400"
            }
        },
        "E": {
            "p1": "?", // BarrelDuration
            "p2": "?", // DebuffDuration
            "p3": "?", // FinalSlowAmount
            "p4": "?", // BarrelArmorPenetration
            "p5": "?", // BonusDamageToChampions
            "p6": "?", // BarrelDecayTime
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0",
            "cost": "-",
            "stats": {
                "사거리": "1000"
            }
        },
        "R": {
            "p1": "?", // ZoneDuration
            "p2": "?", // TotalWavesTooltip
            "p3": "?", // SlowDuration
            "p4": "?", // SlowPercent
            "p5": "?", // OneWaveDamage
            "p6": "?", // TotalDamageTooltip
            "p7": "?", // DeathsDaughterDamage
            "p8": "?", // DeathsDaughterSlowDuration
            "p9": "?", // DeathsDaughterSlow
            "p10": "?", // RaiseMoraleHasteDuration
            "p11": "?", // RaiseMoraleHaste
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "160 / 140 / 120",
            "cost": "100",
            "stats": {
                "사거리": "30000"
            }
        },
    },
    "Gragas": { // 그라가스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // BarrelMaxDuration
            "p2": "?", // MinDamage
            "p3": "?", // MaxDamage
            "p4": "?", // SlowDuration
            "p5": "?", // SlowPercent
            "p6": "?", // SlowPercent*1.5
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "80",
            "stats": {
                "사거리": "850"
            }
        },
        "W": {
            "p1": "?", // DefenseDuration
            "p2": "?", // DamageReduction
            "p3": "?", // TotalDamage
            "p4": "?", // MaxHPPercentDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "5",
            "cost": "30",
            "stats": {
                "사거리": "20"
            }
        },
        "E": {
            "p1": "?", // StunDuration
            "p2": "?", // TotalDamage
            "p3": "?", // CooldownRefund*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13.5 / 13 / 12.5 / 12",
            "cost": "50",
            "stats": {
                "사거리": "600"
            }
        },
        "R": {
            "p1": "?", // DamageDone
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "100 / 85 / 70",
            "cost": "100",
            "stats": {
                "사거리": "1000"
            }
        },
    },
    "Graves": { // 그레이브즈
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // TotalDetonationDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 11.25 / 9.5 / 7.75 / 6",
            "cost": "80",
            "stats": {
                "사거리": "925"
            }
        },
        "W": {
            "p1": "?", // Effect2Amount
            "p2": "?", // ImpactDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "26 / 24 / 22 / 20 / 18",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "950"
            }
        },
        "E": {
            "p1": "?", // BuffDuration
            "p2": "?", // MaxStacks
            "p3": "?", // ArmorPerStack
            "p4": "?", // MRGrant
            "p5": "?", // CooldownPerHit
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "40",
            "stats": {
                "사거리": "425"
            }
        },
        "R": {
            "p1": "?", // Damage
            "p2": "?", // FalloffDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "100 / 80 / 60",
            "cost": "100",
            "stats": {
                "사거리": "1000"
            }
        },
    },
    "Gwen": { // 그웬
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // BuffDuration
            "p2": "?", // MiniSwipeDamage
            "p3": "?", // FinalSwipeDamage
            "p4": "?", // TrueDamageConversion*100
            "p5": "?", // MinionMod*100
            "p6": "?", // ExecuteThreshold*100
            "p7": "?", // ExecuteBonus
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6.5 / 5.75 / 5 / 4.25 / 3.5",
            "cost": "40",
            "stats": {
                "사거리": "450"
            }
        },
        "W": {
            "p1": "?", // ZoneDuration
            "p2": "?", // TotalResists
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "22 / 21 / 20 / 19 / 18",
            "cost": "60"
        },
        "E": {
            "p1": "?", // BuffDuration
            "p2": "?", // BonusAttackSpeed
            "p3": "?", // OnHitDamage
            "p4": "?", // BonusAttackRange
            "p5": "?", // CDRefund*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 12.5 / 12 / 11.5 / 11",
            "cost": "35",
            "stats": {
                "사거리": "400"
            }
        },
        "R": {
            "p1": "?", // TotalDamage
            "p2": "?", // DebuffDuration
            "p3": "?", // InitialSlow*-100
            "p4": "?", // LockoutTime
            "p5": "?", // TotalDamage3
            "p6": "?", // TotalDamage5
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": {
                "사거리": "1200"
            }
        },
    },
    "Gnar": { // 나르
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 14.5 / 13 / 11.5 / 10",
            "cost": "-",
            "stats": {
                "사거리": "1100"
            }
        },
        "W": {
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7",
            "cost": "-"
        },
        "E": {
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "22 / 19.5 / 17 / 14.5 / 12",
            "cost": "-",
            "stats": {
                "사거리": "475"
            }
        },
        "R": {
            "p1": "?", // Damage
            "p2": "?", // RCCDuration
            "p3": "?", // RSlowPercent
            "p4": "?", // WallDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "90 / 60 / 30",
            "cost": "-",
            "stats": {
                "사거리": "590"
            }
        },
    },
    "Nami": { // 나미
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // StunDuration
            "p2": "?", // TotalDamageTT
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "60",
            "stats": {
                "사거리": "875"
            }
        },
        "W": {
            "p1": "?", // MaxTargets
            "p2": "?", // TotalHeal
            "p3": "?", // TotalDamage
            "p4": "?", // BounceScaling
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "725"
            }
        },
        "E": {
            "p1": "?", // BuffDuration
            "p2": "?", // HitCount
            "p3": "?", // SlowDuration
            "p4": "?", // TotalSlow
            "p5": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11",
            "cost": "55 / 60 / 65 / 70 / 75",
            "stats": {
                "사거리": "800"
            }
        },
        "R": {
            "p1": "?", // SlowAmount
            "p2": "?", // TotalDamage
            "p3": "?", // MaxSlowDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 110 / 100",
            "cost": "100",
            "stats": {
                "사거리": "2550"
            }
        },
    },
    "Nasus": { // 나서스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // BasicStacks
            "p3": "?", // BigStacks
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7.5 / 6.5 / 5.5 / 4.5 / 3.5",
            "cost": "20",
            "stats": {
                "사거리": "255"
            }
        },
        "W": {
            "p1": "?", // SlowBase
            "p2": "?", // Duration
            "p3": "?", // MaxSlowTooltipOnly
            "p4": "?", // AttackSpeedSlowMult*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "80",
            "stats": {
                "사거리": "700"
            }
        },
        "E": {
            "p1": "?", // InitialDamage
            "p2": "?", // ArmorShredPercent*-100
            "p3": "?", // Duration
            "p4": "?", // TotalDotDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "650"
            }
        },
        "R": {
            "p1": "?", // BonusHealth
            "p2": "?", // InitialResistGain
            "p3": "?", // DamageCalc
            "p4": "?", // QCDR*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": {
                "사거리": "400"
            }
        },
    },
    "Naafiri": { // 나피리
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8.5 / 8 / 7.5 / 7",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "900"
            }
        },
        "W": {
            "p1": "?", // UntargetableDuration
            "p2": "?", // PackmatesToAdd
            "p3": "?", // Duration
            "p4": "?", // BonusAD
            "p5": "?", // MoveSpeedAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "26 / 24 / 22 / 20 / 18",
            "cost": "60",
            "stats": {
                "사거리": "400"
            }
        },
        "E": {
            "p1": "?", // TotalDamageFirstSlash
            "p2": "?", // TotalDamageSecondSlash
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "40",
            "stats": {
                "사거리": "450"
            }
        },
        "R": {
            "p1": "?", // TotalDamage
            "p2": "?", // PackmateDamage
            "p3": "?", // TakedownWindow
            "p4": "?", // ShieldDuration
            "p5": "?", // ShieldTotal
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "110 / 95 / 80",
            "cost": "100",
            "stats": {
                "사거리": "900"
            }
        },
    },
    "Nautilus": { // 노틸러스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // QDamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "60",
            "stats": {
                "사거리": "1150"
            }
        },
        "W": {
            "p1": "?", // ShieldDuration
            "p2": "?", // ShieldCalc
            "p3": "?", // DotDamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12",
            "cost": "60",
            "stats": {
                "사거리": "350"
            }
        },
        "E": {
            "p1": "?", // DamageCalc
            "p2": "?", // SlowDuration
            "p3": "?", // SlowPercent*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7 / 6.5 / 6 / 5.5 / 5",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "600"
            }
        },
        "R": {
            "p1": "?", // PrimaryTargetDamage
            "p2": "?", // StunDuration
            "p3": "?", // SecondaryTargetDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": {
                "사거리": "825"
            }
        },
    },
    "Nocturne": { // 녹턴
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // TrailDuration
            "p3": "?", // MoveSpeed
            "p4": "?", // BonusTrailAD
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "1125"
            }
        },
        "W": {
            "p1": "?", // ActiveAS
            "p2": "?", // DoubleASDuration
            "p3": "?", // ActiveAS*2
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "50",
            "stats": {
                "사거리": "20"
            }
        },
        "E": {
            "p1": "?", // TooltipFearMS*100
            "p2": "?", // LeashDuration
            "p3": "?", // TotalDamage
            "p4": "?", // CCDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "425"
            }
        },
        "R": {
            "p1": "?", // ParanoiaDuration
            "p2": "?", // Damage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "140 / 115 / 90",
            "cost": "100",
            "stats": {
                "사거리": "2500 / 3250 / 4000"
            }
        },
    },
    "Nunu": { // 누누와 윌럼프
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // MonsterMinionDamage
            "p2": "?", // MonsterHealing
            "p3": "?", // TotalChampionDamage
            "p4": "?", // ChampionHealing
            "p5": "?", // LowHealthThreshhold*100
            "p6": "?", // LowHealthHealingScalar*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "60",
            "stats": {
                "사거리": "125"
            }
        },
        "W": {
            "p1": "?", // NoImpactSnowballDamage
            "p2": "?", // MaximumSnowballDamage
            "p3": "?", // BaseKnockupDuration
            "p4": "?", // MaximumStunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "7500"
            }
        },
        "E": {
            "p1": "?", // TotalSnowballDamage
            "p2": "?", // SlowDuration
            "p3": "?", // SlowAmount*-100
            "p4": "?", // TotalSpellDuration
            "p5": "?", // RootDuration
            "p6": "?", // TotalRootDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "625"
            }
        },
        "R": {
            "p1": "?", // ChannelDuration
            "p2": "?", // SlowStartAmount*-100
            "p3": "?", // MaxSlowAmount*-100
            "p4": "?", // TotalShieldAmount
            "p5": "?", // ShieldDecayDuration
            "p6": "?", // MaximumDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "110 / 100 / 90",
            "cost": "100",
            "stats": {
                "사거리": "650"
            }
        },
    },
    "Nidalee": { // 니달리
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // HumanMinimumDamage
            "p2": "?", // HumanMaximumDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "1500"
            }
        },
        "W": {
            "p1": "?", // Effect3Amount
            "p2": "?", // DamagePerSecond
            "p3": "?", // MaxTraps
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "30 / 35 / 40 / 45 / 50",
            "stats": {
                "사거리": "900"
            }
        },
        "E": {
            "p1": "?", // TotalHealing
            "p2": "?", // MaxHealing
            "p3": "?", // ASDuration
            "p4": "?", // BonusAS*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "900"
            }
        },
        "R": {
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "3",
            "cost": "-",
            "stats": {
                "사거리": "20"
            }
        },
    },
    "Neeko": { // 니코
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // ExplosionDamage
            "p2": "?", // SecondDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8.5 / 8 / 7.5 / 7",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "800"
            }
        },
        "W": {
            "p1": "?", // PassiveBonusDamageCalc
            "p2": "?", // PassiveHasteDuration
            "p3": "?", // PassiveHaste
            "p4": "?", // StealthDuration
            "p5": "?", // CloneDuration
            "p6": "?", // HasteDuration
            "p7": "?", // Haste
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "-",
            "stats": {
                "사거리": "900"
            }
        },
        "E": {
            "p1": "?", // BaseDamage
            "p2": "?", // MinRootDuration
            "p3": "?", // MaxRootDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "1000"
            }
        },
        "R": {
            "p1": "?", // DelayUntilExplosion
            "p2": "?", // TotalDamage
            "p3": "?", // StunDuration
            "p4": "?", // DelayBeforePassiveRemoval
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 105 / 90",
            "cost": "100",
            "stats": {
                "사거리": "600"
            }
        },
    },
    "Nilah": { // 닐라
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // CritArmorPen
            "p2": "?", // CritLifesteal
            "p3": "?", // ShieldDuration
            "p4": "?", // DamageCalc
            "p5": "?", // BonusAttackSpeedCalc
            "p6": "?", // BuffDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "4",
            "cost": "30",
            "stats": {
                "사거리": "600"
            }
        },
        "W": {
            "p1": "?", // BaseDuration
            "p2": "?", // MoveSpeedPercent*100
            "p3": "?", // MagicDamageReduction*100
            "p4": "?", // ShareBaseDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "26 / 25 / 24 / 23 / 22",
            "cost": "60 / 45 / 30 / 15 / 0",
            "stats": {
                "사거리": "150"
            }
        },
        "E": {
            "p1": "?", // DashDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0.5",
            "cost": "40",
            "stats": {
                "사거리": "550"
            }
        },
        "R": {
            "p1": "?", // DamagePerTickCalcTooltip
            "p2": "?", // DamageCalc
            "p3": "?", // ChampHealingPercent
            "p4": "?", // Duration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "110 / 95 / 80",
            "cost": "100",
            "stats": {
                "사거리": "400"
            }
        },
    },
    "Darius": { // 다리우스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // BladeDamage
            "p2": "?", // HandleDamage
            "p3": "?", // MissingHealthHeal
            "p4": "?", // MissingHealPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "25 / 30 / 35 / 40 / 45",
            "stats": {
                "사거리": "1"
            }
        },
        "W": {
            "p1": "?", // EmpoweredAttackDamage
            "p2": "?", // SlowDuration
            "p3": "?", // SlowPercent
            "p4": "?", // PercentCDRefund
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "5",
            "cost": "40",
            "stats": {
                "사거리": "300"
            }
        },
        "E": {
            "p1": "?", // PassivePercentArmorPen
            "p2": "?", // SlowDuration
            "p3": "?", // SlowPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "26 / 23.5 / 21 / 18.5 / 16",
            "cost": "70 / 60 / 50 / 40 / 30",
            "stats": {
                "사거리": "535"
            }
        },
        "R": {
            "p1": "?", // Damage
            "p2": "?", // RDamagePercentPerHemoStack*100
            "p3": "?", // MaximumDamage
            "p4": "?", // RRecastDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100 / 100 / 0",
            "stats": {
                "사거리": "460"
            }
        },
    },
    "Diana": { // 다이애나
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // MoonlightDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "50",
            "stats": {
                "사거리": "900"
            }
        },
        "W": {
            "p1": "?", // ShieldDuration
            "p2": "?", // TotalDamage
            "p3": "?", // TotalMaxDamage
            "p4": "?", // ShieldValue
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15 / 13.5 / 12 / 10.5 / 9",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "800"
            }
        },
        "E": {
            "p1": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "22 / 20 / 18 / 16 / 14",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "825"
            }
        },
        "R": {
            "p1": "?", // SlowDuration
            "p2": "?", // SlowTooltip
            "p3": "?", // RExplosionDamage
            "p4": "?", // RMultihitAmplification
            "p5": "?", // MaxDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "100 / 90 / 80",
            "cost": "100",
            "stats": {
                "사거리": "475"
            }
        },
    },
    "Draven": { // 드레이븐
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "45",
            "stats": {
                "사거리": "300"
            }
        },
        "W": {
            "p1": "?", // Temp_MSMod
            "p2": "?", // Temp_MSDuration
            "p3": "?", // Temp_ASDuration
            "p4": "?", // Temp_AS
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12",
            "cost": "40 / 35 / 30 / 25 / 20",
            "stats": {
                "사거리": "1000"
            }
        },
        "E": {
            "p1": "?", // TotalDamage
            "p2": "?", // SlowDuration
            "p3": "?", // SlowAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "70",
            "stats": {
                "사거리": "1050"
            }
        },
        "R": {
            "p1": "?", // RCalculatedDamage
            "p2": "?", // RDamageReductionPerHit*100
            "p3": "?", // RMinDamagePercent
            "p4": "?", // RPassiveTrueDamage
            "p5": "?", // RPassiveStacksCoefficient*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "100 / 90 / 80",
            "cost": "100",
            "stats": {
                "사거리": "20000"
            }
        },
    },
    "Ryze": { // 라이즈
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // RuneDuration
            "p2": "?", // MaximumRunes
            "p3": "?", // QDamageCalc
            "p4": "?", // MovementSpeedDuration
            "p5": "?", // MovementSpeedAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "5",
            "cost": "40 / 38 / 36 / 34 / 32",
            "stats": {
                "사거리": "1000"
            }
        },
        "W": {
            "p1": "?", // WDamageCalc
            "p2": "?", // CCDuration
            "p3": "?", // SlowAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10.5 / 10 / 9.5 / 9",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "615"
            }
        },
        "E": {
            "p1": "?", // EDamageCalc
            "p2": "?", // DebuffDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "3.5 / 3.25 / 3 / 2.75 / 2.5",
            "cost": "35 / 45 / 55 / 65 / 75",
            "stats": {
                "사거리": "615"
            }
        },
        "R": {
            "p1": "?", // OverloadDamageBonus
            "p2": "?", // ChargeTimeTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "180 / 160 / 140",
            "cost": "100",
            "stats": {
                "사거리": "3000"
            }
        },
    },
    "Rakan": { // 라칸
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // HealDelay
            "p3": "?", // TotalHeal
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "45",
            "stats": {
                "사거리": "850"
            }
        },
        "W": {
            "p1": "?", // KnockupDuration
            "p2": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "600"
            }
        },
        "E": {
            "p1": "?", // Duration
            "p2": "?", // TotalShield
            "p3": "?", // RecastWindow
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "650"
            }
        },
        "R": {
            "p1": "?", // Duration
            "p2": "?", // InitialCastSpeed
            "p3": "?", // TotalDamageTooltip
            "p4": "?", // CharmDuration
            "p5": "?", // TouchSpeed
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "130 / 110 / 90",
            "cost": "100",
            "stats": {
                "사거리": "150"
            }
        },
    },
    "Rammus": { // 람머스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // MinimumMoveSpeed
            "p2": "?", // RollDuration
            "p3": "?", // MaximumMoveSpeed
            "p4": "?", // PowerBallDamage
            "p5": "?", // SlowDuration
            "p6": "?", // SlowPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 10.5 / 9 / 7.5 / 6",
            "cost": "60",
            "stats": {
                "사거리": "300"
            }
        },
        "W": {
            "p1": "?", // BuffDuration
            "p2": "?", // BonusArmorTooltip
            "p3": "?", // BonusMRTooltip
            "p4": "?", // ReturnDamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7",
            "cost": "40",
            "stats": {
                "사거리": "300"
            }
        },
        "E": {
            "p1": "?", // Duration
            "p2": "?", // MonsterDamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12",
            "cost": "50",
            "stats": {
                "사거리": "325"
            }
        },
        "R": {
            "p1": "?", // InitialDamageCalc
            "p2": "?", // SlowDuration
            "p3": "?", // SlowAmount*100
            "p4": "?", // KnockupDuration
            "p5": "?", // BuffDuration
            "p6": "?", // NumberOfPulses
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 105 / 90",
            "cost": "100",
            "stats": {
                "사거리": "25000"
            }
        },
    },
    "Lux": { // 럭스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // RootDuration
            "p2": "?", // TotalDamageTT
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10",
            "cost": "50",
            "stats": {
                "사거리": "1175"
            }
        },
        "W": {
            "p1": "?", // ShieldDuration
            "p2": "?", // TotalShieldTT
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "1150"
            }
        },
        "E": {
            "p1": "?", // SlowPercent
            "p2": "?", // SlowZoneDuration
            "p3": "?", // TotalDamageTT
            "p4": "?", // SlowLingerDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": {
                "사거리": "1100"
            }
        },
        "R": {
            "p1": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "60 / 50 / 40",
            "cost": "100",
            "stats": {
                "사거리": "3340"
            }
        },
    },
    "Rumble": { // 럼블
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // FlamespitterDuration
            "p2": "?", // FlatDamage
            "p3": "?", // HealthDamage*100
            "p4": "?", // MinionMod*100
            "p5": "?", // EmpoweredDamage
            "p6": "?", // EmpoweredHealth
            "p7": "?", // MonsterCap
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "",
            "stats": {
                "사거리": "600"
            }
        },
        "W": {
            "p1": "?", // ShieldDuration.1
            "p2": "?", // TotalShield
            "p3": "?", // MoveSpeedDuration
            "p4": "?", // MoveSpeed*100
            "p5": "?", // EmpoweredShield
            "p6": "?", // EmpoweredMS
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6",
            "cost": "",
            "stats": {
                "사거리": "20"
            }
        },
        "E": {
            "p1": "?", // TotalDamage
            "p2": "?", // SlowDuration
            "p3": "?", // BaseSlowAmount
            "p4": "?", // ShredDuration
            "p5": "?", // PercMagicPen*100
            "p6": "?", // EmpoweredSlowAmount
            "p7": "?", // EnhancedMagicPen*100
            "p8": "?", // EmpDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0.5",
            "cost": "",
            "stats": {
                "사거리": "850"
            }
        },
        "R": {
            "p1": "?", // TrailDuration
            "p2": "?", // SlowAmount
            "p3": "?", // DamagePerSecond
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "130 / 105 / 80",
            "cost": "-",
            "stats": {
                "사거리": "1750"
            }
        },
    },
    "Renata": { // 레나타 글라스크
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // RootDuration
            "p2": "?", // TotalDamage
            "p3": "?", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16",
            "cost": "80",
            "stats": {
                "사거리": "900"
            }
        },
        "W": {
            "p1": "?", // ASCalc
            "p2": "?", // MSCalc
            "p3": "?", // Duration
            "p4": "?", // FinalASCalc
            "p5": "?", // FinalMSCalc
            "p6": "?", // TriumphPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "28 / 27 / 26 / 25 / 24",
            "cost": "80",
            "stats": {
                "사거리": "800"
            }
        },
        "E": {
            "p1": "?", // TotalDamage
            "p2": "?", // SlowDuration
            "p3": "?", // ShieldDuration
            "p4": "?", // ShieldCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": {
                "사거리": "800"
            }
        },
        "R": {
            "p1": "?", // BerserkDuration
            "p2": "?", // BonusAttackSpeed*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "150 / 130 / 110",
            "cost": "100",
            "stats": {
                "사거리": "2000"
            }
        },
    },
    "Renekton": { // 레넥톤
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // BasicDamage
            "p2": "?", // NonChampHealing
            "p3": "?", // ChampHealing
            "p4": "?", // MinionFuryGain
            "p5": "?", // ChampionFuryGain
            "p6": "?", // EmpDamage
            "p7": "?", // EmpNonChampHealing
            "p8": "?", // EmpChampHealing
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7",
            "cost": "-",
            "stats": {
                "사거리": "325"
            }
        },
        "W": {
            "p1": "?", // StunDuration
            "p2": "?", // BasicTotalDamage
            "p3": "?", // BonusFuryVsChamps
            "p4": "?", // EmpTotalDamage
            "p5": "?", // EnragedStunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 14 / 12 / 10 / 8",
            "cost": "-",
            "stats": {
                "사거리": "300"
            }
        },
        "E": {
            "p1": "?", // BasicDamage
            "p2": "?", // MinionRageGeneration
            "p3": "?", // ChampionRageGeneration
            "p4": "?", // DiceTimer
            "p5": "?", // EmpDamage
            "p6": "?", // ShredTimer
            "p7": "?", // EnragedArmorShred
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 14.5 / 13 / 11.5 / 10",
            "cost": "-",
            "stats": {
                "사거리": "450"
            }
        },
        "R": {
            "p1": "?", // BuffDuration
            "p2": "?", // HealthGain
            "p3": "?", // FuryOnCast
            "p4": "?", // TotalDamagePerSecond
            "p5": "?", // FuryPerSecond
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "-",
            "stats": {
                "사거리": "20"
            }
        },
    },
    "Leona": { // 레오나
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // StunDuration
            "p2": "?", // TotalDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "5",
            "cost": "30 / 35 / 40 / 45 / 50",
            "stats": {
                "사거리": "100"
            }
        },
        "W": {
            "p1": "?", // FlatDamageReduction
            "p2": "?", // ArmorMRDuration
            "p3": "?", // BonusArmorTooltip
            "p4": "?", // BonusMRTooltip
            "p5": "?", // TotalDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "60",
            "stats": {
                "사거리": "450"
            }
        },
        "E": {
            "p1": "?", // TotalDamageTooltip
            "p2": "?", // RootDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 10.5 / 9 / 7.5 / 6",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "875"
            }
        },
        "R": {
            "p1": "?", // ExplosionCalculatedDamage
            "p2": "?", // CCDuration
            "p3": "?", // SlowPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "90 / 75 / 60",
            "cost": "100",
            "stats": {
                "사거리": "1200"
            }
        },
    },
    "RekSai": { // 렉사이
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // BuffDuration
            "p2": "?", // AttackSpeed*100
            "p3": "?", // TotalDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "4 / 3.5 / 3 / 2.5 / 2",
            "cost": "-",
            "stats": {
                "사거리": "325"
            }
        },
        "W": {
            "p1": "?", // BurrowedMoveSpeed
            "p2": "?", // VisionRadiusMod*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "4",
            "cost": "-",
            "stats": {
                "사거리": "1650"
            }
        },
        "E": {
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6",
            "cost": "-",
            "stats": {
                "사거리": "250"
            }
        },
        "R": {
            "p1": "?", // PreyMarkDuration
            "p2": "?", // RBaseDamageCalc
            "p3": "?", // PercentHealthDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "-",
            "stats": {
                "사거리": "1500"
            }
        },
    },
    "Rell": { // 렐
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // StunDuration
            "p2": "?", // Damage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10.5 / 10 / 9.5 / 9",
            "cost": "50",
            "stats": {
                "사거리": "600"
            }
        },
        "W": {
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10",
            "cost": "40",
            "stats": {
                "사거리": "450"
            }
        },
        "E": {
            "p1": "?", // Duration
            "p2": "?", // MinMS*100
            "p3": "?", // MaxMS*100
            "p4": "?", // MaxHealthDamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "40",
            "stats": {
                "사거리": "1200"
            }
        },
        "R": {
            "p1": "?", // Duration
            "p2": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": {
                "사거리": "200"
            }
        },
    },
    "Rengar": { // 렝가
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // ASBonus
            "p2": "?", // QTotalDamage
            "p3": "?", // EmpoweredQTotalDamage
            "p4": "?", // ASDuration
            "p5": "?", // EmpoweredQAS
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0.25",
            "cost": "",
            "stats": {
                "사거리": "450"
            }
        },
        "W": {
            "p1": "?", // TotalDamage
            "p2": "?", // HealingWindow
            "p3": "?", // DamagePercentageHealed
            "p4": "?", // TotalDamageEmpowered
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0.25",
            "cost": "",
            "stats": {
                "사거리": "450"
            }
        },
        "E": {
            "p1": "?", // TotalDamage
            "p2": "?", // CCDuration
            "p3": "?", // SlowAmount
            "p4": "?", // TotalEmpoweredDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0.25",
            "cost": "",
            "stats": {
                "사거리": "1000"
            }
        },
        "R": {
            "p1": "?", // StealthDuration
            "p2": "?", // StealthMS
            "p3": "?", // FadeTime
            "p4": "?", // BonusDamage
            "p5": "?", // ArmorShredDuration
            "p6": "?", // ArmorShred
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "100 / 90 / 80",
            "cost": "-",
            "stats": {
                "사거리": "2500 / 3000 / 3500"
            }
        },
    },
    "Locke": { // 로크
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // MissileDamage
            "p2": "?", // SlowDuration1
            "p3": "?", // SlowDuration2
            "p4": "?", // SlowDuration3
            "p5": "?", // SlowAmount1*100
            "p6": "?", // SlowAmount2*100
            "p7": "?", // SlowAmount3*100
            "p8": "?", // NailDamage
            "p9": "?", // TwoMarkBonusPercent
            "p10": "?", // ThreeMarkBonusPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "70",
            "stats": {
                "사거리": "950"
            }
        },
        "W": {
            "p1": "?", // AttackSpeed
            "p2": "?", // MoveSpeed
            "p3": "?", // DecayTimeHelper
            "p4": "?", // BaseDuration
            "p5": "?", // HealthCost*100
            "p6": "?", // DamageRestoreAmount
            "p7": "?", // AdditionalHeal
            "p8": "?", // MaxHealingThreshold
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "18 / 17 / 16 / 15 / 14",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "250"
            }
        },
        "E": {
            "p1": "?", // OnHitDamage
            "p2": "?", // DashDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10",
            "cost": "30 / 40 / 50 / 60 / 70",
            "stats": {
                "사거리": "425"
            }
        },
        "R": {
            "p1": "?", // Damage
            "p2": "?", // SlowAmount*100
            "p3": "?", // SlowDuration
            "p4": "?", // Duration
            "p5": "?", // ExecutionThreshold*100
            "p6": "?", // ExecuteThresholdPerStack*100
            "p7": "?", // CooldownReduction
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": {
                "사거리": "1000"
            }
        },
    },
    "Lucian": { // 루시안
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "48 / 56 / 64 / 72 / 80",
            "stats": {
                "사거리": "500"
            }
        },
        "W": {
            "p1": "?", // TotalDamage
            "p2": "?", // MoveSpeedAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "60",
            "stats": {
                "사거리": "900"
            }
        },
        "E": {
            "p1": "?", // CDRefundBase
            "p2": "?", // CDRefundChampion
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 15.5 / 15 / 14.5 / 14",
            "cost": "32 / 24 / 16 / 8 / 0",
            "stats": {
                "사거리": "445"
            }
        },
        "R": {
            "p1": "?", // Duration
            "p2": "?", // TotalNumShots
            "p3": "?", // DamagePerBullet
            "p4": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "110 / 100 / 90",
            "cost": "100",
            "stats": {
                "사거리": "1400"
            }
        },
    },
    "Lulu": { // 룰루
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // SlowAmount*-100
            "p3": "?", // SlowDuration
            "p4": "?", // BonusMissileDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "925"
            }
        },
        "W": {
            "p1": "?", // Effect5Amount
            "p2": "?", // TotalMS
            "p3": "?", // Effect7Amount*100
            "p4": "?", // Effect3Amount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "18",
            "cost": "65",
            "stats": {
                "사거리": "650"
            }
        },
        "E": {
            "p1": "?", // Effect1Amount
            "p2": "?", // Effect7Amount
            "p3": "?", // TotalShield
            "p4": "?", // TotalDamage
            "p5": "?", // Effect6Amount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "650"
            }
        },
        "R": {
            "p1": "?", // KnockbackDuration
            "p2": "?", // BuffDuration
            "p3": "?", // TotalBonusHealth
            "p4": "?", // SlowPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": {
                "사거리": "900"
            }
        },
    },
    "Leblanc": { // 르블랑
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // Damage
            "p2": "?", // MarkDuration
            "p3": "?", // MarkDamage
            "p4": "?", // ManaRefund*100
            "p5": "?", // CooldownRefund*100
            "p6": "?", // BonusMinionDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6",
            "cost": "50",
            "stats": {
                "사거리": "700"
            }
        },
        "W": {
            "p1": "?", // TotalDamage
            "p2": "?", // SnapbackTimeAllowed
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15 / 13.75 / 12.5 / 11.25 / 10",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "600"
            }
        },
        "E": {
            "p1": "?", // InitialDamage
            "p2": "?", // TetherDuration
            "p3": "?", // RootDuration
            "p4": "?", // DelayedDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13.25 / 12.5 / 11.75 / 11",
            "cost": "50",
            "stats": {
                "사거리": "925"
            }
        },
        "R": {
            "p1": "?", // RQ1Damage
            "p2": "?", // RQ2Damage
            "p3": "?", // RWDamage
            "p4": "?", // RE1Damage
            "p5": "?", // RE2Damage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "45 / 35 / 25",
            "cost": "-",
            "stats": {
                "사거리": "25000"
            }
        },
    },
    "LeeSin": { // 리 신
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // InitialDamage
            "p2": "?", // ReactivateTime
            "p3": "?", // RecastDamage
            "p4": "?", // EmpoweredDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "50",
            "stats": {
                "사거리": "1100"
            }
        },
        "W": {
            "p1": "?", // ShieldDuration
            "p2": "?", // ShieldAmount
            "p3": "?", // W1ReactivateTime
            "p4": "?", // LifestealAndSpellVampTime
            "p5": "?", // LifestealAndSpellVamp
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7",
            "cost": "50",
            "stats": {
                "사거리": "700"
            }
        },
        "E": {
            "p1": "?", // InitialDamage
            "p2": "?", // SlowDuration
            "p3": "?", // ReactivateTime
            "p4": "?", // SlowAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8",
            "cost": "50",
            "stats": {
                "사거리": "450"
            }
        },
        "R": {
            "p1": "?", // Damage
            "p2": "?", // PercentHPCarryThrough
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "110 / 85 / 60",
            "cost": "-",
            "stats": {
                "사거리": "375"
            }
        },
    },
    "Riven": { // 리븐
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // FirstSlashDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13",
            "cost": "-",
            "stats": {
                "사거리": "275"
            }
        },
        "W": {
            "p1": "?", // TotalDamage
            "p2": "?", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "-",
            "stats": {
                "사거리": "260"
            }
        },
        "E": {
            "p1": "?", // TotalShield
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "-",
            "stats": {
                "사거리": "250"
            }
        },
        "R": {
            "p1": "?", // Duration
            "p2": "?", // BonusAD
            "p3": "?", // MinDamage
            "p4": "?", // MaxDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 90 / 60",
            "cost": "-",
            "stats": {
                "사거리": "200"
            }
        },
    },
    "Lissandra": { // 리산드라
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // SlowDuration
            "p3": "?", // SlowPercentage*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7 / 6 / 5 / 4 / 3",
            "cost": "55 / 60 / 65 / 70 / 75",
            "stats": {
                "사거리": "725"
            }
        },
        "W": {
            "p1": "?", // SnareDuration
            "p2": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "40",
            "stats": {
                "사거리": "450"
            }
        },
        "E": {
            "p1": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "24 / 21 / 18 / 15 / 12",
            "cost": "80 / 85 / 90 / 95 / 100",
            "stats": {
                "사거리": "1050"
            }
        },
        "R": {
            "p1": "?", // EnemyCastDuration
            "p2": "?", // SelfCastDuration
            "p3": "?", // HealAmount
            "p4": "?", // SelfCastMissingHPPerAbove
            "p5": "?", // SelfCastMissingHPRatio
            "p6": "?", // CalculatedDamage
            "p7": "?", // SlowDuration
            "p8": "?", // SlowAmount*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": {
                "사거리": "550"
            }
        },
    },
    "Lillia": { // 릴리아
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // PranceDuration
            "p2": "?", // PranceSpeed
            "p3": "?", // PranceMaxStacks
            "p4": "?", // TotalDamage
            "p5": "?", // BonusTrueDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6 / 5.5 / 5 / 4.5 / 4",
            "cost": "65",
            "stats": {
                "사거리": "450"
            }
        },
        "W": {
            "p1": "?", // FlatDamage
            "p2": "?", // FlatDamageSweetSpot
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "50",
            "stats": {
                "사거리": "500"
            }
        },
        "E": {
            "p1": "?", // ImpactDamageTotal
            "p2": "?", // SlowDuration
            "p3": "?", // SlowAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12",
            "cost": "70",
            "stats": {
                "사거리": "700"
            }
        },
        "R": {
            "p1": "?", // DrowsyDuration
            "p2": "?", // SleepDuration
            "p3": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "150 / 130 / 110",
            "cost": "50",
            "stats": {
                "사거리": "1600"
            }
        },
    },
    "MasterYi": { // 마스터 이
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // AlphaStrikeBounces
            "p2": "?", // TotalDamage
            "p3": "?", // SubsequentHitMultiplier*100
            "p4": "?", // SubesquentDamage
            "p5": "?", // SingleTotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 19.5 / 19 / 18.5 / 18",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "600"
            }
        },
        "W": {
            "p1": "?", // HealDuration
            "p2": "?", // TotalHeal
            "p3": "?", // MaxMissingHealthPercent*100
            "p4": "?", // DRLinger
            "p5": "?", // InitialDR
            "p6": "?", // InitialExtraDRDuration
            "p7": "?", // DamageReduction*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10",
            "cost": "40",
            "stats": {
                "사거리": "20"
            }
        },
        "E": {
            "p1": "?", // Duration
            "p2": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14",
            "cost": "-",
            "stats": {
                "사거리": "20"
            }
        },
        "R": {
            "p1": "?", // RCooldownRefund*100
            "p2": "?", // RDuration
            "p3": "?", // RMSBonus
            "p4": "?", // RASBonus
            "p5": "?", // RKillAssistExtension
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "85",
            "cost": "100",
            "stats": {
                "사거리": "1"
            }
        },
    },
    "Maokai": { // 마오카이
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // BasePercentHealth*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7 / 6.5 / 6 / 5.5 / 5",
            "cost": "40",
            "stats": {
                "사거리": "600"
            }
        },
        "W": {
            "p1": "?", // RootDuration
            "p2": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "60",
            "stats": {
                "사거리": "525"
            }
        },
        "E": {
            "p1": "?", // SaplingDuration
            "p2": "?", // TotalDamage
            "p3": "?", // SlowDuration
            "p4": "?", // SlowAmount*100
            "p5": "?", // EmpoweredSaplingDuration
            "p6": "?", // TotalEmpoweredDamage
            "p7": "?", // EmpoweredDoTDuration
            "p8": "?", // EmpoweredSlowAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "18 / 17 / 16 / 15 / 14",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "1100"
            }
        },
        "R": {
            "p1": "?", // MinRootDuration
            "p2": "?", // MaxRootDuration
            "p3": "?", // TotalDamage
            "p4": "?", // MoveHaste*100
            "p5": "?", // HasteDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "130 / 110 / 90",
            "cost": "100",
            "stats": {
                "사거리": "3000"
            }
        },
    },
    "Malzahar": { // 말자하
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamageTooltip
            "p2": "?", // SilenceDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "900"
            }
        },
        "W": {
            "p1": "?", // StackCap
            "p2": "?", // VoidlingDuration
            "p3": "?", // VoidlingBonusDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "150"
            }
        },
        "E": {
            "p1": "?", // Duration
            "p2": "?", // TotalDamage
            "p3": "?", // ManaRestore
            "p4": "?", // MinionExecuteThreshold
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "650"
            }
        },
        "R": {
            "p1": "?", // CCDuration
            "p2": "?", // TotalDamageTooltip
            "p3": "?", // PoolDuration
            "p4": "?", // ZoneDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "140 / 110 / 80",
            "cost": "100",
            "stats": {
                "사거리": "700"
            }
        },
    },
    "Malphite": { // 말파이트
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // QDamageCalc
            "p2": "?", // SlowDuration
            "p3": "?", // SpeedSteal
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "625"
            }
        },
        "W": {
            "p1": "?", // BonusArmorPassive*100
            "p2": "?", // f1
            "p3": "?", // BonusArmorPassive*300
            "p4": "?", // f2
            "p5": "?", // TotalBonusDamage
            "p6": "?", // ThunderclapSplash
            "p7": "?", // ThunderclapBuffDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "30 / 35 / 40 / 45 / 50",
            "stats": {
                "사거리": "400"
            }
        },
        "E": {
            "p1": "?", // EDamageCalc
            "p2": "?", // Duration
            "p3": "?", // ASReduction
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "400"
            }
        },
        "R": {
            "p1": "?", // KnockupDuration
            "p2": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "130 / 115 / 100",
            "cost": "100",
            "stats": {
                "사거리": "1000"
            }
        },
    },
    "Mel": { // 멜
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // ExplosionCount
            "p2": "?", // InitialExplosionDamage
            "p3": "?", // TotalExplosionDamage
            "p4": "?", // AllDamageHit
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "950"
            }
        },
        "W": {
            "p1": "?", // Duration
            "p2": "?", // ShieldAmount
            "p3": "?", // MoveSpeedDuration
            "p4": "?", // MoveSpeed*100
            "p5": "?", // DamagePercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "38 / 35 / 33 / 29 / 26",
            "cost": "80 / 60 / 40 / 20 / 0",
            "stats": {
                "사거리": "250"
            }
        },
        "E": {
            "p1": "?", // RootDuration
            "p2": "?", // Damage
            "p3": "?", // AreaSlowAmount*100
            "p4": "?", // AreaDamagePerSecond
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10.5 / 10 / 9.5 / 9",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "1000"
            }
        },
        "R": {
            "p1": "?", // PassiveFlatDamage
            "p2": "?", // PassiveStackDamage
            "p3": "?", // UltFlatDamage
            "p4": "?", // UltStackDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": {
                "사거리": "25000"
            }
        },
    },
    "Mordekaiser": { // 모데카이저
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // QDamage
            "p2": "?", // EmpoweredDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 7 / 6 / 5 / 4",
            "cost": "-",
            "stats": {
                "사거리": "675"
            }
        },
        "W": {
            "p1": "?", // DamageConversion*100
            "p2": "?", // DamageTakenConversion*100
            "p3": "?", // HealingPercent*100
            "p4": "?", // MinHealthTooltip
            "p5": "?", // MaxHealthTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "-",
            "stats": {
                "사거리": "25000"
            }
        },
        "E": {
            "p1": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 14 / 12 / 10 / 8",
            "cost": "-",
            "stats": {
                "사거리": "700"
            }
        },
        "R": {
            "p1": "?", // SpiritRealmDuration
            "p2": "?", // StatStealPercentScalar*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "140 / 120 / 100",
            "cost": "-",
            "stats": {
                "사거리": "650"
            }
        },
    },
    "Morgana": { // 모르가나
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // RootDuration
            "p2": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "1250"
            }
        },
        "W": {
            "p1": "?", // WDuration
            "p2": "?", // TotalMinDamage
            "p3": "?", // TotalMaxDamage
            "p4": "?", // CDRefundPercent*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": {
                "사거리": "900"
            }
        },
        "E": {
            "p1": "?", // ShieldDuration
            "p2": "?", // TotalShieldStrength
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "26 / 23.5 / 21 / 18.5 / 16",
            "cost": "80",
            "stats": {
                "사거리": "800"
            }
        },
        "R": {
            "p1": "?", // TotalDamage
            "p2": "?", // SlowPercent
            "p3": "?", // ChainDuration
            "p4": "?", // StunDuration
            "p5": "?", // HastePercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 110 / 100",
            "cost": "100",
            "stats": {
                "사거리": "625"
            }
        },
    },
    "DrMundo": { // 문도 박사
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // CurrentHealthDamage*100
            "p2": "?", // SlowDuration
            "p3": "?", // SlowAmount*100
            "p4": "?", // HealthRestoreOnHitChampionMonster
            "p5": "?", // HealthRestoreOnHitMinion
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "4",
            "cost": "",
            "stats": {
                "사거리": "975"
            }
        },
        "W": {
            "p1": "?", // Duration
            "p2": "?", // DamagePerTick*4
            "p3": "?", // GrayHealthInitialDuration
            "p4": "?", // GrayHealthStorageInitial
            "p5": "?", // GrayHealthStorage*100
            "p6": "?", // TotalDamage
            "p7": "?", // GrayHealthBigMod*100
            "p8": "?", // GrayHealthSmallMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "17 / 16.5 / 16 / 15.5 / 15",
            "cost": "",
            "stats": {
                "사거리": "325"
            }
        },
        "E": {
            "p1": "?", // PassiveBonusAD
            "p2": "?", // AdditionalDamage
            "p3": "?", // MaxDamageAmpTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8.25 / 7.5 / 6.75 / 6",
            "cost": ""
        },
        "R": {
            "p1": "?", // MissingHealthHeal*100
            "p2": "?", // SpeedBoostAmount*100
            "p3": "?", // Duration
            "p4": "?", // MaxHealthHoT*100
            "p5": "?", // BonusPerNearbyChampion*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120",
            "cost": "-",
            "stats": {
                "사거리": "20"
            }
        },
    },
    "MissFortune": { // 미스 포츈
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamageTooltip
            "p2": "?", // TotalDamageCrit
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7 / 6 / 5 / 4 / 3",
            "cost": "40",
            "stats": {
                "사거리": "650"
            }
        },
        "W": {
            "p1": "?", // PassiveBaseMSOOC
            "p2": "?", // PassiveBaseMS
            "p3": "?", // PassiveMaxMSExtraOOC
            "p4": "?", // PassiveMaxMS
            "p5": "?", // ActiveDuration
            "p6": "?", // ActiveAS*100
            "p7": "?", // LoveTapRefund
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12",
            "cost": "45",
            "stats": {
                "사거리": "600"
            }
        },
        "E": {
            "p1": "?", // BaseDuration
            "p2": "?", // TotalSlowAmount
            "p3": "?", // TotalDamagePerSecond
            "p4": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "18 / 17 / 16 / 15 / 14",
            "cost": "80",
            "stats": {
                "사거리": "1000"
            }
        },
        "R": {
            "p1": "?", // BaseChannelDuration
            "p2": "?", // BaseWaves
            "p3": "?", // PhysicalDamagePerWave
            "p4": "?", // TotalPhysicalDamage
            "p5": "?", // CritDamagePerWave
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 110 / 100",
            "cost": "100",
            "stats": {
                "사거리": "25000"
            }
        },
    },
    "Milio": { // 밀리오
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // Damage
            "p2": "?", // SlowDuration
            "p3": "?", // SlowAmountPercent
            "p4": "?", // RefundRatio*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "1200"
            }
        },
        "W": {
            "p1": "?", // ZoneDuration
            "p2": "?", // RangePercent
            "p3": "?", // HealingOverTime
            "p4": "?", // HealFrequencySeconds
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "29 / 27 / 25 / 23 / 21",
            "cost": "90 / 100 / 110 / 120 / 130",
            "stats": {
                "사거리": "350"
            }
        },
        "E": {
            "p1": "?", // ShieldCalc
            "p2": "?", // MoveSpeedDuration
            "p3": "?", // MoveSpeedAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0.5",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "650"
            }
        },
        "R": {
            "p1": "?", // HealCalc
            "p2": "?", // TenacityDuration
            "p3": "?", // TenacityAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "160 / 145 / 130",
            "cost": "100",
            "stats": {
                "사거리": "700"
            }
        },
    },
    "Bard": { // 바드
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // SlowDuration
            "p3": "?", // SlowAmountPercentage
            "p4": "?", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "60",
            "stats": {
                "사거리": "25000"
            }
        },
        "W": {
            "p1": "?", // MoveSpeed_Duration
            "p2": "?", // Calc_MoveSpeed
            "p3": "?", // InitialHeal
            "p4": "?", // ChargeupTime
            "p5": "?", // MaxHeal
            "p6": "?", // MaxPacks
            "p7": "?", // Ammo_Limit
            "p8": "?", // f1
            "p9": "?", // f2
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0",
            "cost": "70",
            "stats": {
                "사거리": "800"
            }
        },
        "E": {
            "p1": "?", // DoorDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "22 / 20.5 / 19 / 17.5 / 16",
            "cost": "30",
            "stats": {
                "사거리": "900"
            }
        },
        "R": {
            "p1": "?", // RStasisDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "110 / 95 / 80",
            "cost": "100",
            "stats": {
                "사거리": "3400"
            }
        },
    },
    "Varus": { // 바루스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // MoveSpeedMod*-100
            "p2": "?", // MaxChannelDuration
            "p3": "?", // ManaRefund*100
            "p4": "?", // TotalDamageMinTooltip
            "p5": "?", // FalloffPercent*100
            "p6": "?", // MinDamagePercent*100
            "p7": "?", // MaxChargeAmp*100
            "p8": "?", // TotalDamageMax
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "925"
            }
        },
        "W": {
            "p1": "?", // OnHitDamage
            "p2": "?", // DebuffDuration
            "p3": "?", // MaxStacks
            "p4": "?", // PercentHPPerStack
            "p5": "?", // MaxPercentHPPerStack
            "p6": "?", // CDRPerBlightStack*100
            "p7": "?", // QEmpowerPercentHP
            "p8": "?", // MaxQEmpowerPercentHP
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "40",
            "cost": "-",
            "stats": {
                "사거리": "750"
            }
        },
        "E": {
            "p1": "?", // TotalDamage
            "p2": "?", // GroundDuration
            "p3": "?", // SlowPercent*-100
            "p4": "?", // GrievousAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "18 / 16 / 14 / 12 / 10",
            "cost": "90",
            "stats": {
                "사거리": "925"
            }
        },
        "R": {
            "p1": "?", // RootDuration
            "p2": "?", // TotalDamage
            "p3": "?", // PassiveStacks
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "100 / 80 / 60",
            "cost": "100",
            "stats": {
                "사거리": "1300"
            }
        },
    },
    "Vi": { // 바이
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // SelfSlow
            "p2": "?", // TotalDamage
            "p3": "?", // MaxDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 10.5 / 9 / 7.5 / 6",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "250"
            }
        },
        "W": {
            "p1": "?", // TotalDamageTooltip
            "p2": "?", // SharedBuffsDuration
            "p3": "?", // ShredAmount
            "p4": "?", // AttackSpeed
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0",
            "cost": "",
            "stats": {
                "사거리": "750"
            }
        },
        "E": {
            "p1": "?", // TotalDamageTooltip
            "p2": "?", // AmmoRechargeTime
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "1",
            "cost": "26 / 32 / 38 / 44 / 50",
            "stats": {
                "사거리": "400"
            }
        },
        "R": {
            "p1": "?", // RStunDuration
            "p2": "?", // Damage
            "p3": "?", // SecondaryTargetStunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "140 / 115 / 90",
            "cost": "100",
            "stats": {
                "사거리": "800"
            }
        },
    },
    "Veigar": { // 베이가
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6 / 5.5 / 5 / 4.5 / 4",
            "cost": "30 / 35 / 40 / 45 / 50",
            "stats": {
                "사거리": "1000"
            }
        },
        "W": {
            "p1": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "950"
            }
        },
        "E": {
            "p1": "?", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 18.5 / 17 / 15.5 / 14",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "725"
            }
        },
        "R": {
            "p1": "?", // MinDamage
            "p2": "?", // MaxDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 90 / 60",
            "cost": "100",
            "stats": {
                "사거리": "650"
            }
        },
    },
    "Vayne": { // 베인
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // ADRatioBonus
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6 / 5 / 4 / 3 / 2",
            "cost": "30",
            "stats": {
                "사거리": "300"
            }
        },
        "W": {
            "p1": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0",
            "cost": "",
            "stats": {
                "사거리": "750"
            }
        },
        "E": {
            "p1": "?", // TotalDamage
            "p2": "?", // EmpoweredDamageTT
            "p3": "?", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "90",
            "stats": {
                "사거리": "550"
            }
        },
        "R": {
            "p1": "?", // BaseDuration
            "p2": "?", // BonusAttackDamage
            "p3": "?", // DamagedMarkerDuration
            "p4": "?", // DurationToAdd
            "p5": "?", // MovementSpeed
            "p6": "?", // TumbleCDReduction
            "p7": "?", // TumbleStealthDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "100 / 85 / 70",
            "cost": "80",
            "stats": {
                "사거리": "1"
            }
        },
    },
    "Vex": { // 벡스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // QDamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 7 / 6 / 5 / 4",
            "cost": "45 / 50 / 55 / 60 / 65",
            "stats": {
                "사거리": "1200"
            }
        },
        "W": {
            "p1": "?", // ShieldDuration
            "p2": "?", // ShieldCalc
            "p3": "?", // WDamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "75",
            "stats": {
                "사거리": "475"
            }
        },
        "E": {
            "p1": "?", // EDamageCalc
            "p2": "?", // SlowDuration
            "p3": "?", // SlowAmount*100
            "p4": "?", // GloomCDNonChampTooltip*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": {
                "사거리": "800"
            }
        },
        "R": {
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "140 / 120 / 100",
            "cost": "100",
            "stats": {
                "사거리": "2000 / 2500 / 3000"
            }
        },
    },
    "Belveth": { // 벨베스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // BaseDamage
            "p2": "?", // f1
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "4 / 3.25 / 2.5 / 1.75 / 1",
            "cost": "-",
            "stats": {
                "사거리": "450"
            }
        },
        "W": {
            "p1": "?", // Damage
            "p2": "?", // Duration
            "p3": "?", // SlowDuration
            "p4": "?", // SlowPercent*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "-",
            "stats": {
                "사거리": "715"
            }
        },
        "E": {
            "p1": "?", // TotalDuration
            "p2": "?", // DRPercent*100
            "p3": "?", // TotalLifesteal
            "p4": "?", // f2.0
            "p5": "?", // DamagePerStrike
            "p6": "?", // MaxDamagePerStrikeTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "24 / 21 / 18 / 15 / 12",
            "cost": "-",
            "stats": {
                "사거리": "500"
            }
        },
        "R": {
            "p1": "?", // FinalOnHitDamage
            "p2": "?", // PassiveStacksOnDevour
            "p3": "?", // TotalExplosionDamage
            "p4": "?", // MissingHealthDamage*100
            "p5": "?", // MaxHealthOnDevour
            "p6": "?", // BonusAARange
            "p7": "?", // TotalASMod*100
            "p8": "?", // SteroidDuration
            "p9": "?", // StackThresholdForUpgrade
            "p10": "?", // SteroidDurationUpgrade
            "p11": "?", // StackThresholdForPermanent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "1",
            "cost": "-",
            "stats": {
                "사거리": "450"
            }
        },
    },
    "Velkoz": { // 벨코즈
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // SlowAmount*100
            "p3": "?", // SlowDuration
            "p4": "?", // TooltipManaRefund
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "1050"
            }
        },
        "W": {
            "p1": "?", // InitialDamage
            "p2": "?", // SecondaryDamage
            "p3": "?", // AmmoRechargeTime
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "1.5",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "1050"
            }
        },
        "E": {
            "p1": "?", // StunDuration
            "p2": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "810"
            }
        },
        "R": {
            "p1": "?", // TotalDamage
            "p2": "?", // Effect3Amount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "100 / 90 / 80",
            "cost": "100",
            "stats": {
                "사거리": "1575"
            }
        },
    },
    "Volibear": { // 볼리베어
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // Duration
            "p2": "?", // MinSpeedCalc
            "p3": "?", // MaxSpeedCalc
            "p4": "?", // CalculatedDamage
            "p5": "?", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "50",
            "stats": {
                "사거리": "300"
            }
        },
        "W": {
            "p1": "?", // TotalDamage
            "p2": "?", // MarkDuration
            "p3": "?", // EmpoweredDamage
            "p4": "?", // BaseHeal
            "p5": "?", // PercentMissingHealthHealingRatio
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "5",
            "cost": "20 / 25 / 30 / 35 / 40",
            "stats": {
                "사거리": "325"
            }
        },
        "E": {
            "p1": "?", // TotalDamageTooltip
            "p2": "?", // PercentDamage*100
            "p3": "?", // SlowDuration
            "p4": "?", // SlowAmount*100
            "p5": "?", // ShieldDuration
            "p6": "?", // ShieldAPRatioTooltip
            "p7": "?", // ShieldAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16",
            "cost": "50",
            "stats": {
                "사거리": "1200"
            }
        },
        "R": {
            "p1": "?", // TransformDuration
            "p2": "?", // HealthAmount
            "p3": "?", // BonusAttackRange
            "p4": "?", // TowerDisableDuration
            "p5": "?", // TowerDamageTooltip
            "p6": "?", // SlowAmount*100
            "p7": "?", // SweetSpotDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "160 / 135 / 110",
            "cost": "100",
            "stats": {
                "사거리": "550"
            }
        },
    },
    "Braum": { // 브라움
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // InitialSlow
            "p3": "?", // SlowDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "45 / 50 / 55 / 60 / 65",
            "stats": {
                "사거리": "1000"
            }
        },
        "W": {
            "p1": "?", // Duration
            "p2": "?", // GrantedAllyArmor
            "p3": "?", // GrantedAllyMR
            "p4": "?", // GrantedBraumArmor
            "p5": "?", // GrantedBraumMR
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "40",
            "stats": {
                "사거리": "650"
            }
        },
        "E": {
            "p1": "?", // ShieldHoldDuration
            "p2": "?", // ShieldFacingDRAmount
            "p3": "?", // MoveSpeedPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 14 / 12 / 10 / 8",
            "cost": "30 / 35 / 40 / 45 / 50",
            "stats": {
                "사거리": "25000"
            }
        },
        "R": {
            "p1": "?", // TotalDamage
            "p2": "?", // MinKnockup
            "p3": "?", // MaxKnockup
            "p4": "?", // SlowZoneDuration
            "p5": "?", // MoveSpeedMod
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "130 / 115 / 100",
            "cost": "100",
            "stats": {
                "사거리": "1250"
            }
        },
    },
    "Briar": { // 브라이어
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // StunDuration
            "p3": "?", // ShredDuration
            "p4": "?", // ShredPercent*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "",
            "stats": {
                "사거리": "475"
            }
        },
        "W": {
            "p1": "?", // BerserkDuration
            "p2": "?", // BerserkAS*100
            "p3": "?", // BerserkMS*100
            "p4": "?", // TotalAoEDamage
            "p5": "?", // TotalAttackBonusDamage
            "p6": "?", // TotalAttackPercentMissingHealth
            "p7": "?", // AttackMaxHPHeal
            "p8": "?", // AttackHealPercent*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "",
            "stats": {
                "사거리": "350"
            }
        },
        "E": {
            "p1": "?", // PercentMaxHPHeal
            "p2": "?", // DRPercent
            "p3": "?", // Damage
            "p4": "?", // SlowDuration
            "p5": "?", // SlowPercent*100
            "p6": "?", // WallHitDamage
            "p7": "?", // WallStunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16",
            "cost": "",
            "stats": {
                "사거리": "400"
            }
        },
        "R": {
            "p1": "?", // Damage
            "p2": "?", // FearDuration
            "p3": "?", // TotalResists
            "p4": "?", // LifeStealPercent*100
            "p5": "?", // ExtraMoveSpeedPercent*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "",
            "stats": {
                "사거리": "12000"
            }
        },
    },
    "Brand": { // 브랜드
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "70",
            "stats": {
                "사거리": "1050"
            }
        },
        "W": {
            "p1": "?", // TotalDamage
            "p2": "?", // EmpoweredDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "900"
            }
        },
        "E": {
            "p1": "?", // EDamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "90",
            "stats": {
                "사거리": "625"
            }
        },
        "R": {
            "p1": "?", // TotalDamage
            "p2": "?", // SlowAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "100 / 90 / 80",
            "cost": "100",
            "stats": {
                "사거리": "750"
            }
        },
    },
    "Vladimir": { // 블라디미르
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // BaseDamageTooltip
            "p2": "?", // BaseHealTooltip
            "p3": "?", // MovementSpeedOnQ2
            "p4": "?", // Effect8Amount
            "p5": "?", // EmpoweredDamageTooltip
            "p6": "?", // EmpoweredHealTooltip
            "p7": "?", // EmpoweredHealPercentTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 7.9 / 6.8 / 5.7 / 4.6",
            "cost": "-",
            "stats": {
                "사거리": "600"
            }
        },
        "W": {
            "p1": "?", // HasteBoost*100
            "p2": "?", // HasteDuration
            "p3": "?", // MoveSpeedMod*-100
            "p4": "?", // TotalDamage
            "p5": "?", // TotalHeal
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "28 / 25 / 22 / 19 / 16",
            "cost": "",
            "stats": {
                "사거리": "350"
            }
        },
        "E": {
            "p1": "?", // ChargeHealthTooltip
            "p2": "?", // MinDamageTooltip
            "p3": "?", // MaxDamageTooltip
            "p4": "?", // SlowPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 11 / 9 / 7 / 5",
            "cost": "",
            "stats": {
                "사거리": "600"
            }
        },
        "R": {
            "p1": "?", // Effect4Amount
            "p2": "?", // Effect2Amount
            "p3": "?", // Damage
            "p4": "?", // SecondaryHealingTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120",
            "cost": "-",
            "stats": {
                "사거리": "625"
            }
        },
    },
    "Blitzcrank": { // 블리츠크랭크
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 19 / 18 / 17 / 16",
            "cost": "100",
            "stats": {
                "사거리": "1079"
            }
        },
        "W": {
            "p1": "?", // Duration
            "p2": "?", // MoveSpeedMod*100
            "p3": "?", // AttackSpeedMod*100
            "p4": "?", // SlowDuration
            "p5": "?", // MoveSpeedModReduction*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15",
            "cost": "75",
            "stats": {
                "사거리": "1"
            }
        },
        "E": {
            "p1": "?", // CCDuration
            "p2": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7 / 6.5 / 6 / 5.5 / 5",
            "cost": "25",
            "stats": {
                "사거리": "300"
            }
        },
        "R": {
            "p1": "?", // PassiveDamage
            "p2": "?", // ActiveDamage
            "p3": "?", // SilenceDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "60 / 40 / 20",
            "cost": "100",
            "stats": {
                "사거리": "600"
            }
        },
    },
    "Viego": { // 비에고
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalPercentHealthOnHit
            "p2": "?", // SecondAttackDamage
            "p3": "?", // HealModVsChamps*100
            "p4": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "5 / 4.5 / 4 / 3.5 / 3",
            "cost": "-",
            "stats": {
                "사거리": "600"
            }
        },
        "W": {
            "p1": "?", // SelfSlowPercent*100
            "p2": "?", // TotalDamage
            "p3": "?", // Stunduration
            "p4": "?", // MaxStunTT
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8",
            "cost": "-",
            "stats": {
                "사거리": "400"
            }
        },
        "E": {
            "p1": "?", // MistDuration
            "p2": "?", // TotalMoveSpeed
            "p3": "?", // AttackSpeed*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 12 / 10 / 8 / 6",
            "cost": "-",
            "stats": {
                "사거리": "750"
            }
        },
        "R": {
            "p1": "?", // SlowPercent*100
            "p2": "?", // TotalDamage
            "p3": "?", // TotalPercentHealth
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "-",
            "stats": {
                "사거리": "500"
            }
        },
    },
    "Viktor": { // 빅토르
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalMissileDamage
            "p2": "?", // BuffDuration
            "p3": "?", // ShieldLevelScaling
            "p4": "?", // AttackTotalDMG
            "p5": "?", // TotalAugmentedShieldValue
            "p6": "?", // AugmentMoveSpeedBonus
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "45 / 50 / 55 / 60 / 65",
            "stats": {
                "사거리": "600"
            }
        },
        "W": {
            "p1": "?", // FieldDuration
            "p2": "?", // SlowPotency*-1
            "p3": "?", // StunDuration
            "p4": "?", // AugmentSlow
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "17 / 16 / 15 / 14 / 13",
            "cost": "65",
            "stats": {
                "사거리": "800"
            }
        },
        "E": {
            "p1": "?", // LaserDamage
            "p2": "?", // AftershockDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "525"
            }
        },
        "R": {
            "p1": "?", // StormDuration
            "p2": "?", // InitialBurstDamage
            "p3": "?", // SubsequentBurstDamage
            "p4": "?", // AugmentBoost*100
            "p5": "?", // Tooltip_DurationExtension
            "p6": "?", // MaxGrowths
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": {
                "사거리": "700"
            }
        },
    },
    "Poppy": { // 뽀삐
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // BaseDamage
            "p2": "?", // HealthDamagePercent
            "p3": "?", // Slow_
            "p4": "?", // DelayBetweenTwoHits
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 7 / 6 / 5 / 4",
            "cost": "35 / 40 / 45 / 50 / 55",
            "stats": {
                "사거리": "430"
            }
        },
        "W": {
            "p1": "?", // BonusArmor
            "p2": "?", // BonusMR
            "p3": "?", // PassiveEmpoweredHealthPercent*100
            "p4": "?", // Haste
            "p5": "?", // Duration
            "p6": "?", // GroundingDuration
            "p7": "?", // SlowAmount*-100
            "p8": "?", // InterruptDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "50",
            "stats": {
                "사거리": "400"
            }
        },
        "E": {
            "p1": "?", // TackleDamage
            "p2": "?", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "70",
            "stats": {
                "사거리": "475"
            }
        },
        "R": {
            "p1": "?", // ChannelMaxDuration
            "p2": "?", // SelfSlow
            "p3": "?", // Damage
            "p4": "?", // HalfDamage
            "p5": "?", // KnockupDurationSnap
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "140 / 120 / 100",
            "cost": "100",
            "stats": {
                "사거리": "500"
            }
        },
    },
    "Samira": { // 사미라
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // DamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6 / 5 / 4 / 3 / 2",
            "cost": "30",
            "stats": {
                "사거리": "950"
            }
        },
        "W": {
            "p1": "?", // SlashDuration
            "p2": "?", // DamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "30 / 28 / 26 / 24 / 22",
            "cost": "60",
            "stats": {
                "사거리": "325"
            }
        },
        "E": {
            "p1": "?", // DashDamage
            "p2": "?", // AttackSpeedDuration
            "p3": "?", // BonusAttackSpeed*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "40",
            "stats": {
                "사거리": "600"
            }
        },
        "R": {
            "p1": "?", // DamageCalc
            "p2": "?", // LifestealMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "5",
            "cost": "",
            "stats": {
                "사거리": "600"
            }
        },
    },
    "Sion": { // 사이온
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // MinDamageTotal
            "p2": "?", // MaxDamageTotal
            "p3": "?", // BaseStunTime
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "45",
            "stats": {
                "사거리": "10000"
            }
        },
        "W": {
            "p1": "?", // HPPerKill
            "p2": "?", // HPPerChampKill
            "p3": "?", // TotalShield
            "p4": "?", // DetonateRecastCooldown
            "p5": "?", // TotalDamage
            "p6": "?", // MaxHPDamageRatio
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "75 / 80 / 85 / 90 / 95",
            "stats": {
                "사거리": "500"
            }
        },
        "E": {
            "p1": "?", // TotalDamage
            "p2": "?", // SlowDuration
            "p3": "?", // SlowAmount
            "p4": "?", // ArmorShredDuration
            "p5": "?", // ArmorShred
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "35 / 40 / 45 / 50 / 55",
            "stats": {
                "사거리": "800"
            }
        },
        "R": {
            "p1": "?", // MinDamageTotal
            "p2": "?", // MaxDamageTotal
            "p3": "?", // MinStunDuration
            "p4": "?", // MaxStunDuration
            "p5": "?", // SlowAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "140 / 100 / 60",
            "cost": "100",
            "stats": {
                "사거리": "7500"
            }
        },
    },
    "Sylas": { // 사일러스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // Damage
            "p2": "?", // SlowDuration
            "p3": "?", // SlowAmountCalc
            "p4": "?", // ExplosionDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "55",
            "stats": {
                "사거리": "775"
            }
        },
        "W": {
            "p1": "?", // MinDamage
            "p2": "?", // MinHealing
            "p3": "?", // MaxHealing
            "p4": "?", // MaxExecuteThreshold*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 10.5 / 9 / 7.5 / 6",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "400"
            }
        },
        "E": {
            "p1": "?", // Damage
            "p2": "?", // KnockUpDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "65",
            "stats": {
                "사거리": "400"
            }
        },
        "R": {
            "p1": "?", // PerTargetCooldown
            "p2": "?", // MinimumEnemyCooldown
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "80 / 55 / 30",
            "cost": "75",
            "stats": {
                "사거리": "950"
            }
        },
    },
    "Shaco": { // 샤코
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // StealthDuration
            "p2": "?", // TotalDamage
            "p3": "?", // QCritDamageMod
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 12.5 / 12 / 11.5 / 11",
            "cost": "40",
            "stats": {
                "사거리": "400"
            }
        },
        "W": {
            "p1": "?", // ArmTime
            "p2": "?", // TrapDuration
            "p3": "?", // FearDuration
            "p4": "?", // MinionFearDuration
            "p5": "?", // AoEDamage
            "p6": "?", // STDamage
            "p7": "?", // MonsterBonusDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15",
            "cost": "70 / 65 / 60 / 55 / 50",
            "stats": {
                "사거리": "500"
            }
        },
        "E": {
            "p1": "?", // SlowDurationPassive
            "p2": "?", // SlowAmount*-100
            "p3": "?", // TotalDamage
            "p4": "?", // SlowDurationActive
            "p5": "?", // ExecuteHealthThreshold*100
            "p6": "?", // TotalExecuteDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8",
            "cost": "75",
            "stats": {
                "사거리": "625"
            }
        },
        "R": {
            "p1": "?", // CloneLifetime
            "p2": "?", // ExplosionTotalDamage
            "p3": "?", // CloneAADamagePercent*100
            "p4": "?", // CloneIncomingDamagePercent*100
            "p5": "?", // AoEDamage
            "p6": "?", // STDamage
            "p7": "?", // BoxFearDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "100 / 90 / 80",
            "cost": "100",
            "stats": {
                "사거리": "200"
            }
        },
    },
    "Senna": { // 세나
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // SlowDuration
            "p3": "?", // TotalSlow
            "p4": "?", // TotalHeal
            "p5": "?", // CDReductionOnHit
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": {
                "사거리": "600"
            }
        },
        "W": {
            "p1": "?", // Damage
            "p2": "?", // DelayTime
            "p3": "?", // RootDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "1250"
            }
        },
        "E": {
            "p1": "?", // BuffDuration
            "p2": "?", // TotalMS
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "26 / 24.5 / 23 / 21.5 / 20",
            "cost": "70",
            "stats": {
                "사거리": "400"
            }
        },
        "R": {
            "p1": "?", // TotalDamage
            "p2": "?", // ShieldDuration
            "p3": "?", // TotalShield
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "140 / 120 / 100",
            "cost": "100",
            "stats": {
                "사거리": "25000"
            }
        },
    },
    "Seraphine": { // 세라핀
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // ExplosionDamage
            "p2": "?", // ExecuteThreshold*100
            "p3": "?", // TotalEmpoweredDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "900"
            }
        },
        "W": {
            "p1": "?", // ShieldDuration
            "p2": "?", // HasteValueAllies
            "p3": "?", // WMSBonusTotal
            "p4": "?", // ShieldValueSeraphine
            "p5": "?", // WHealSplitDelay
            "p6": "?", // WMissingHPHeal
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "22",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "800"
            }
        },
        "E": {
            "p1": "?", // FinalDamage
            "p2": "?", // SlowDuration
            "p3": "?", // SlowValue
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10.5 / 10 / 9.5 / 9",
            "cost": "60",
            "stats": {
                "사거리": "1300"
            }
        },
        "R": {
            "p1": "?", // RChannelDuration
            "p2": "?", // R1TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "160 / 140 / 120",
            "cost": "100",
            "stats": {
                "사거리": "25000"
            }
        },
    },
    "Sejuani": { // 세주아니
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamageTooltip
            "p2": "?", // KnockupDurationTOOLTIPONLY
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "18 / 16.5 / 15 / 13.5 / 12",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "650"
            }
        },
        "W": {
            "p1": "?", // FirstHitDamageTooltip
            "p2": "?", // SecondHitDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "60",
            "stats": {
                "사거리": "600"
            }
        },
        "E": {
            "p1": "?", // TotalDamage
            "p2": "?", // CCDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "1.5",
            "cost": "20",
            "stats": {
                "사거리": "560"
            }
        },
        "R": {
            "p1": "?", // BaseStunDuration
            "p2": "?", // MinorDamageTooltip
            "p3": "?", // EmpoweredStunDuration
            "p4": "?", // ZoneDuration
            "p5": "?", // ExplosionSlowAmount
            "p6": "?", // TotalDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 105 / 90",
            "cost": "100",
            "stats": {
                "사거리": "1300"
            }
        },
    },
    "Sett": { // 세트
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // MSDuration
            "p2": "?", // MSAmount*100
            "p3": "?", // BaseDamage
            "p4": "?", // MaxHealthDamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "-"
        },
        "W": {
            "p1": "?", // DamageStored*100
            "p2": "?", // MaxGrit
            "p3": "?", // AdrenalineStorageWindow
            "p4": "?", // ShieldConversion*100
            "p5": "?", // ShieldMaxDuration
            "p6": "?", // DamageCalc
            "p7": "?", // DamageConversion
            "p8": "?", // f1
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "18 / 16.5 / 15 / 13.5 / 12",
            "cost": "-",
            "stats": {
                "사거리": "25000"
            }
        },
        "E": {
            "p1": "?", // DamageCalc
            "p2": "?", // SlowDuration
            "p3": "?", // SlowAmount*100
            "p4": "?", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 14.5 / 13 / 11.5 / 10",
            "cost": "-",
            "stats": {
                "사거리": "490"
            }
        },
        "R": {
            "p1": "?", // DamageCalc
            "p2": "?", // MaxHealthDamage*100
            "p3": "?", // SlowDuration
            "p4": "?", // SlowAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "-",
            "stats": {
                "사거리": "400"
            }
        },
    },
    "Sona": { // 소나
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // AuraDuration
            "p3": "?", // OnHitDuration
            "p4": "?", // TotalOnHitDamage
            "p5": "?", // TotalStaccatoDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "825"
            }
        },
        "W": {
            "p1": "?", // TotalHeal
            "p2": "?", // AuraDuration
            "p3": "?", // ShieldDuration
            "p4": "?", // TotalShield
            "p5": "?", // AccelerandoShieldBreakpoint
            "p6": "?", // DiminuendoDuration
            "p7": "?", // TotalDiminuendoWeakenPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10",
            "cost": "80 / 85 / 90 / 95 / 100",
            "stats": {
                "사거리": "1000"
            }
        },
        "E": {
            "p1": "?", // SelfMovementSpeedDurationMin
            "p2": "?", // TotalSelfMovementSpeed
            "p3": "?", // SelfMovementSpeedDurationMax
            "p4": "?", // AuraDuration
            "p5": "?", // AllyMovementSpeedDuration
            "p6": "?", // TotalAllyMovementSpeed
            "p7": "?", // TempoDuration
            "p8": "?", // TotalTempoMoveSpeedSlow
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14",
            "cost": "65",
            "stats": {
                "사거리": "430"
            }
        },
        "R": {
            "p1": "?", // StunDuration
            "p2": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "140 / 120 / 100",
            "cost": "100",
            "stats": {
                "사거리": "900"
            }
        },
    },
    "Soraka": { // 소라카
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // SlowDuration
            "p3": "?", // MoveSpeedSlow*100
            "p4": "?", // HoTDuration
            "p5": "?", // TotalHoT
            "p6": "?", // MoveSpeedHaste*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 7 / 6 / 5 / 4",
            "cost": "45 / 50 / 55 / 60 / 65",
            "stats": {
                "사거리": "810"
            }
        },
        "W": {
            "p1": "?", // TotalHeal
            "p2": "?", // PercentHealthCostRefund*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6 / 5 / 4 / 3 / 2",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "550"
            }
        },
        "E": {
            "p1": "?", // TotalDamage
            "p2": "?", // RootDelay
            "p3": "?", // RootDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 19 / 18 / 17 / 16",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "925"
            }
        },
        "R": {
            "p1": "?", // HealingCalc
            "p2": "?", // AmpedHealing
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "150 / 135 / 120",
            "cost": "100",
            "stats": {
                "사거리": "25000"
            }
        },
    },
    "Shen": { // 쉔
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // SlowDuration
            "p2": "?", // SlowPercent
            "p3": "?", // NumEnhancedAttacks
            "p4": "?", // BaseFlatDamage
            "p5": "?", // BasePercentHealth
            "p6": "?", // EmpPercentHealth
            "p7": "?", // SteroidAS
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 7.25 / 6.5 / 5.75 / 5",
            "cost": "140 / 130 / 120 / 110 / 100",
            "stats": {
                "사거리": "400"
            }
        },
        "W": {
            "p1": "?", // ZoneDuration
            "p2": "?", // ZoneDelay
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 14.5 / 13 / 11.5 / 10",
            "cost": "40",
            "stats": {
                "사거리": "400"
            }
        },
        "E": {
            "p1": "?", // EnergyRefund
            "p2": "?", // CCDuration
            "p3": "?", // TauntDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "18 / 16 / 14 / 12 / 10",
            "cost": "150",
            "stats": {
                "사거리": "600"
            }
        },
        "R": {
            "p1": "?", // ShieldDuration
            "p2": "?", // Shield
            "p3": "?", // MaxShield
            "p4": "?", // ChannelDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "200 / 180 / 160",
            "cost": "-",
            "stats": {
                "사거리": "35000"
            }
        },
    },
    "Shyvana": { // 쉬바나
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // Calc_Max_Health_Damage
            "p2": "?", // Cooldown_Reduction
            "p3": "?", // Calc_Damage
            "p4": "?", // RecastDuration
            "p5": "?", // Calc_Dragon_Form_Damage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "-",
            "stats": {
                "사거리": "25000"
            }
        },
        "W": {
            "p1": "?", // Duration
            "p2": "?", // Calc_Shield
            "p3": "?", // Calc_Shield_Per_Nearby_Champion
            "p4": "?", // MoveSpeed
            "p5": "?", // MoveSpeedTowardsEnemies
            "p6": "?", // Damage
            "p7": "?", // Calc_Base_Heal
            "p8": "?", // Calc_Missing_Health_Heal
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 12.25 / 11.5 / 10.75 / 10",
            "cost": "-",
            "stats": {
                "사거리": "350"
            }
        },
        "E": {
            "p1": "?", // Damage
            "p2": "?", // Calc_Max_Health_Damage
            "p3": "?", // SlowDuration
            "p4": "?", // Calc_Slow
            "p5": "?", // Calc_Dragon_Damage
            "p6": "?", // Calc_Max_Health_Dragon_Damage
            "p7": "?", // Calc_Slow_Dragon
            "p8": "?", // GroundLingerDuration
            "p9": "?", // DamagePerSecond
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "-",
            "stats": {
                "사거리": "800"
            }
        },
        "R": {
            "p1": "?", // Fury_Generation
            "p2": "?", // TT_Fury_Mult
            "p3": "?", // TT_Fury_AoE_Penalty
            "p4": "?", // Damage
            "p5": "?", // FearDuration
            "p6": "?", // Calc_Bonus_Health
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0",
            "cost": "",
            "stats": {
                "사거리": "1050"
            }
        },
    },
    "Smolder": { // 스몰더
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // ManaRestore
            "p3": "?", // StackTier1
            "p4": "?", // StackTier2
            "p5": "?", // Tier2_BlowbackPercentageDamage
            "p6": "?", // Tier2_NumberOfBlowback
            "p7": "?", // StackTier3
            "p8": "?", // Tier3_DotLength
            "p9": "?", // Tier3_Burn
            "p10": "?", // Tier3_ExecuteThreshold
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "5.5 / 5 / 4.5 / 4 / 3.5",
            "cost": "25",
            "stats": {
                "사거리": "550"
            }
        },
        "W": {
            "p1": "?", // InitialDamage
            "p2": "?", // SlowDuration
            "p3": "?", // SlowAmount*100
            "p4": "?", // ExplosionDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "1500"
            }
        },
        "E": {
            "p1": "?", // Duration
            "p2": "?", // MoveSpeed*100
            "p3": "?", // TotalNumberOfAttacks
            "p4": "?", // DamagePerHit
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "24 / 22 / 20 / 18 / 16",
            "cost": "65",
            "stats": {
                "사거리": "700"
            }
        },
        "R": {
            "p1": "?", // TotalDamage
            "p2": "?", // TooltipOnly_TotalSweetspotDamage
            "p3": "?", // SlowDuration
            "p4": "?", // SlowAmount*100
            "p5": "?", // MomHealCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 110 / 100",
            "cost": "100",
            "stats": {
                "사거리": "4200"
            }
        },
    },
    "Swain": { // 스웨인
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // InitialDamage
            "p2": "?", // ExtraBoltDamage
            "p3": "?", // MaxDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7 / 6 / 5 / 4 / 3",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "750"
            }
        },
        "W": {
            "p1": "?", // TotalDamage
            "p2": "?", // SlowDuration
            "p3": "?", // Slow*-100
            "p4": "?", // RevealDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "22 / 21 / 20 / 19 / 18",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "5500 / 6000 / 6500 / 7000 / 7500"
            }
        },
        "E": {
            "p1": "?", // SecondaryDamage
            "p2": "?", // RootDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "850"
            }
        },
        "R": {
            "p1": "?", // DamageCalc
            "p2": "?", // HealingCalc
            "p3": "?", // DemonflareCastDelay
            "p4": "?", // DemonflareCooldownTooltip
            "p5": "?", // DemonflareDamageTotal
            "p6": "?", // DemonflareSlowAmount*100
            "p7": "?", // DemonflareSlowDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120",
            "cost": "100",
            "stats": {
                "사거리": "650"
            }
        },
    },
    "Skarner": { // 스카너
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // AttackSpeed*100
            "p2": "?", // AbilityDamage
            "p3": "?", // MaxHPPercent*100
            "p4": "?", // SlowDuration
            "p5": "?", // SlowPercent*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 6.75 / 5.5 / 4.25 / 3",
            "cost": "30",
            "stats": {
                "사거리": "400"
            }
        },
        "W": {
            "p1": "?", // ShieldDuration
            "p2": "?", // InitialShield
            "p3": "?", // Damage
            "p4": "?", // SlowDuration
            "p5": "?", // SlowEffect*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "700"
            }
        },
        "E": {
            "p1": "?", // PinDamage
            "p2": "?", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "22 / 21 / 20 / 19 / 18",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "1700"
            }
        },
        "R": {
            "p1": "?", // Damage
            "p2": "?", // Duration
            "p3": "?", // SpeedBoostDuration
            "p4": "?", // SpeedBoostAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 105 / 90",
            "cost": "100",
            "stats": {
                "사거리": "625"
            }
        },
    },
    "Sivir": { // 시비르
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // FallOffMinimum*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "55 / 60 / 65 / 70 / 75",
            "stats": {
                "사거리": "1200"
            }
        },
        "W": {
            "p1": "?", // BuffDuration
            "p2": "?", // RicochetAttackSpeed*100
            "p3": "?", // BounceDamage
            "p4": "?", // MaxBounces
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12",
            "cost": "60",
            "stats": {
                "사거리": "20"
            }
        },
        "E": {
            "p1": "?", // SpellShieldDuration
            "p2": "?", // TotalHeal
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "24 / 22.5 / 21 / 19.5 / 18",
            "cost": "",
            "stats": {
                "사거리": "20"
            }
        },
        "R": {
            "p1": "?", // UltDuration
            "p2": "?", // MaxMS*100
            "p3": "?", // AttackCooldownRefund
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": {
                "사거리": "1000"
            }
        },
    },
    "XinZhao": { // 신 짜오
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // BonusDamage
            "p2": "?", // KnockUpDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7 / 6.5 / 6 / 5.5 / 5",
            "cost": "30",
            "stats": {
                "사거리": "375"
            }
        },
        "W": {
            "p1": "?", // SlashDamage
            "p2": "?", // ThrustDamage
            "p3": "?", // TotalSlowDuration
            "p4": "?", // Effect6Amount*-100
            "p5": "?", // MarkDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "60",
            "stats": {
                "사거리": "1000"
            }
        },
        "E": {
            "p1": "?", // ChargeDamage
            "p2": "?", // SlowDuration
            "p3": "?", // SlowAmount
            "p4": "?", // ASDuration
            "p5": "?", // f1
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11",
            "cost": "60",
            "stats": {
                "사거리": "650"
            }
        },
        "R": {
            "p1": "?", // MarkDuration
            "p2": "?", // TotalDamage
            "p3": "?", // PercentCurrentHealthDamage*100
            "p4": "?", // MissileDefenseBaseDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 110 / 100",
            "cost": "100",
            "stats": {
                "사거리": "500"
            }
        },
    },
    "Syndra": { // 신드라
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // SphereDuration
            "p3": "?", // Upgrade1MaxAmmo
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "800"
            }
        },
        "W": {
            "p1": "?", // ThrowDamage
            "p2": "?", // f2
            "p3": "?", // TotalSlowAmount
            "p4": "?", // TOOLTIPONLYPassiveBonusPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "925"
            }
        },
        "E": {
            "p1": "?", // TotalDamage
            "p2": "?", // StunDuration
            "p3": "?", // UpgradedSlowDuration
            "p4": "?", // UpgradedSlowAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15",
            "cost": "50",
            "stats": {
                "사거리": "650"
            }
        },
        "R": {
            "p1": "?", // QHastePerRank
            "p2": "?", // DamageCalc
            "p3": "?", // MaxDamageCalc
            "p4": "?", // UpgradeExecuteThreshold*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": {
                "사거리": "675"
            }
        },
    },
    "Singed": { // 신지드
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // DamagePerSecond
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0",
            "cost": "13",
            "stats": {
                "사거리": "20"
            }
        },
        "W": {
            "p1": "?", // WDuration
            "p2": "?", // SlowPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "17 / 16 / 15 / 14 / 13",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "1000"
            }
        },
        "E": {
            "p1": "?", // BaseDamage
            "p2": "?", // MaxHPDamage
            "p3": "?", // RootDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "125"
            }
        },
        "R": {
            "p1": "?", // Duration
            "p2": "?", // StatAmount
            "p3": "?", // GrievousDuration
            "p4": "?", // GrievousAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "100",
            "cost": "100",
            "stats": {
                "사거리": "20"
            }
        },
    },
    "Thresh": { // 쓰레쉬
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TauntLength
            "p2": "?", // TotalDamage
            "p3": "?", // HitBonusCooldown
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "19 / 16.5 / 14 / 11.5 / 9",
            "cost": "70",
            "stats": {
                "사거리": "1075"
            }
        },
        "W": {
            "p1": "?", // ShieldDuration
            "p2": "?", // TotalShield
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "21 / 20 / 19 / 18 / 17",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "950"
            }
        },
        "E": {
            "p1": "?", // PAttackDamageMin
            "p2": "?", // PAttackDamageMax
            "p3": "?", // SlowDuration
            "p4": "?", // ActiveSlowPercentage
            "p5": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 12.25 / 11.5 / 10.75 / 10",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "500"
            }
        },
        "R": {
            "p1": "?", // SlowDuration
            "p2": "?", // SlowAmount
            "p3": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": {
                "사거리": "450"
            }
        },
    },
    "Ahri": { // 아리
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7",
            "cost": "55 / 65 / 75 / 85 / 95",
            "stats": {
                "사거리": "970"
            }
        },
        "W": {
            "p1": "?", // SingleFireDamage
            "p2": "?", // MultiFireDamage
            "p3": "?", // MovementSpeed*100
            "p4": "?", // MovementSpeedDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "30",
            "stats": {
                "사거리": "700"
            }
        },
        "E": {
            "p1": "?", // CharmDuration
            "p2": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12",
            "cost": "60",
            "stats": {
                "사거리": "975"
            }
        },
        "R": {
            "p1": "?", // RMaxTargetsPerCast
            "p2": "?", // RCalculatedDamage
            "p3": "?", // RRecastWindow
            "p4": "?", // RMaxCasts
            "p5": "?", // PDurationExtension
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "140 / 120 / 100",
            "cost": "100",
            "stats": {
                "사거리": "450"
            }
        },
    },
    "Amumu": { // 아무무
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // StunDuration
            "p2": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "3",
            "cost": "50",
            "stats": {
                "사거리": "1100"
            }
        },
        "W": {
            "p1": "?", // BaseDamage
            "p2": "?", // TotalHealthDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "1",
            "cost": "8",
            "stats": {
                "사거리": "300"
            }
        },
        "E": {
            "p1": "?", // DamageReduction
            "p2": "?", // CDROnHit
            "p3": "?", // TantrumDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "35",
            "stats": {
                "사거리": "350"
            }
        },
        "R": {
            "p1": "?", // RDuration
            "p2": "?", // RCalculatedDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "150 / 125 / 100",
            "cost": "100 / 150 / 200",
            "stats": {
                "사거리": "550"
            }
        },
    },
    "AurelionSol": { // 아우렐리온 솔
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // MaxChannelDuration
            "p2": "?", // DamagePerSecond
            "p3": "?", // AOEModifier*100
            "p4": "?", // BurstDamage
            "p5": "?", // BurstBonusTrueDamageToChamps
            "p6": "?", // QMassStolen
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "3",
            "cost": "35 / 40 / 45 / 50 / 55",
            "stats": {
                "사거리": "750"
            }
        },
        "W": {
            "p1": "?", // TrueDamageBonus*100
            "p2": "?", // ResetWindow
            "p3": "?", // TooltipTakedownCooldownMultiplier
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "22 / 20.5 / 19 / 17.5 / 16",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "1500"
            }
        },
        "E": {
            "p1": "?", // DamagePerSecond
            "p2": "?", // Duration
            "p3": "?", // CurrentExecutionThreshold
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12",
            "cost": "90",
            "stats": {
                "사거리": "750"
            }
        },
        "R": {
            "p1": "?", // MaxDamageTooltip
            "p2": "?", // StunDuration
            "p3": "?", // MassStolen
            "p4": "?", // CalamityStacks
            "p5": "?", // R2Damage
            "p6": "?", // ShockwaveDamage
            "p7": "?", // ShockwaveSlow*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 110 / 100",
            "cost": "100",
            "stats": {
                "사거리": "1250"
            }
        },
    },
    "Ivern": { // 아이번
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // RootDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "60",
            "stats": {
                "사거리": "1125"
            }
        },
        "W": {
            "p1": "?", // BuffDuration
            "p2": "?", // TotalDamage
            "p3": "?", // AllyBuffDuration
            "p4": "?", // TotalAllyDamage
            "p5": "?", // RevealDuration
            "p6": "?", // MaxBrushDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0.5",
            "cost": "30",
            "stats": {
                "사거리": "1150"
            }
        },
        "E": {
            "p1": "?", // TotalShield
            "p2": "?", // ShieldDuration
            "p3": "?", // TotalDamage
            "p4": "?", // SlowDuration
            "p5": "?", // SlowAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "70",
            "stats": {
                "사거리": "750"
            }
        },
        "R": {
            "p1": "?", // DaisyDuration
            "p2": "?", // TotalShockwaveDamage
            "p3": "?", // ShockwaveCCDuration
            "p4": "?", // ShockwaveCD
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "140 / 130 / 120",
            "cost": "100",
            "stats": {
                "사거리": "600"
            }
        },
    },
    "Azir": { // 아지르
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // SlowAmount*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 12 / 10 / 8 / 6",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": {
                "사거리": "740"
            }
        },
        "W": {
            "p1": "?", // Effect1Amount
            "p2": "?", // TotalDamage
            "p3": "?", // MaxAmmo
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "1.5",
            "cost": "40 / 35 / 30 / 25 / 20",
            "stats": {
                "사거리": "525"
            }
        },
        "E": {
            "p1": "?", // Effect6Amount
            "p2": "?", // TotalShield
            "p3": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "22 / 20.5 / 19 / 17.5 / 16",
            "cost": "60",
            "stats": {
                "사거리": "1100"
            }
        },
        "R": {
            "p1": "?", // TotalDamage
            "p2": "?", // Effect4Amount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 105 / 90",
            "cost": "100",
            "stats": {
                "사거리": "250"
            }
        },
    },
    "Akali": { // 아칼리
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // Damage
            "p2": "?", // SlowDuration
            "p3": "?", // SlowPercentage*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "1.5",
            "cost": "110 / 100 / 90 / 80 / 70",
            "stats": {
                "사거리": "550"
            }
        },
        "W": {
            "p1": "?", // BaseDuration
            "p2": "?", // MovementSpeed
            "p3": "?", // MovementSpeedDuration
            "p4": "?", // EnergyRestore
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 19 / 18 / 17 / 16",
            "cost": "",
            "stats": {
                "사거리": "350"
            }
        },
        "E": {
            "p1": "?", // E1Damage
            "p2": "?", // E2DamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 14.5 / 13 / 11.5 / 10",
            "cost": "30",
            "stats": {
                "사거리": "825"
            }
        },
        "R": {
            "p1": "?", // Cast1Damage
            "p2": "?", // CooldownBetweenCasts
            "p3": "?", // Cast2DamageMin
            "p4": "?", // Cast2DamageMax
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 90 / 60",
            "cost": "-",
            "stats": {
                "사거리": "675"
            }
        },
    },
    "Akshan": { // 아크샨
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // FinalDamage
            "p2": "?", // TotalHaste
            "p3": "?", // HasteDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "850"
            }
        },
        "W": {
            "p1": "?", // GameModeInteger
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "18 / 14 / 10 / 6 / 2",
            "cost": "40 / 30 / 20 / 10 / 0",
            "stats": {
                "사거리": "5500"
            }
        },
        "E": {
            "p1": "?", // DamageToDeal
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "18 / 16.5 / 15 / 13.5 / 12",
            "cost": "70",
            "stats": {
                "사거리": "800"
            }
        },
        "R": {
            "p1": "?", // ChannelDuration
            "p2": "?", // NumberOfBullets
            "p3": "?", // DamagePerBulletWithCrit
            "p4": "?", // MaxDamagePerBullet
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "100 / 85 / 70",
            "cost": "100",
            "stats": {
                "사거리": "2500"
            }
        },
    },
    "Aatrox": { // 아트록스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // QDamage
            "p2": "?", // QEdgeDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 12 / 10 / 8 / 6",
            "cost": "-",
            "stats": {
                "사거리": "25000"
            }
        },
        "W": {
            "p1": "?", // WSlowDuration
            "p2": "?", // WSlowPercentage*-100
            "p3": "?", // WDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "-",
            "stats": {
                "사거리": "825"
            }
        },
        "E": {
            "p1": "?", // TotalEVamp
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "-",
            "stats": {
                "사거리": "25000"
            }
        },
        "R": {
            "p1": "?", // RMinionFearDuration
            "p2": "?", // RMovementSpeedBonus*100
            "p3": "?", // RDuration
            "p4": "?", // RTotalADAmp*100
            "p5": "?", // RHealingAmp*100
            "p6": "?", // RExtension
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "-",
            "stats": {
                "사거리": "25000"
            }
        },
    },
    "Aphelios": { // 아펠리오스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9",
            "cost": "60",
            "stats": {
                "사거리": "1450"
            }
        },
        "W": {
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0.8",
            "cost": "-",
            "stats": {
                "사거리": "250"
            }
        },
        "E": {
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0",
            "cost": "",
            "stats": {
                "사거리": "1000"
            }
        },
        "R": {
            "p1": "?", // MaxDamage
            "p2": "?", // f1
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 110 / 100",
            "cost": "100",
            "stats": {
                "사거리": "1300"
            }
        },
    },
    "Alistar": { // 알리스타
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // KnockupDuration
            "p2": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "365"
            }
        },
        "W": {
            "p1": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "650"
            }
        },
        "E": {
            "p1": "?", // Duration
            "p2": "?", // TotalDamage
            "p3": "?", // MaxStacks
            "p4": "?", // StunDuration
            "p5": "?", // AttackBonusDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "350"
            }
        },
        "R": {
            "p1": "?", // RDuration
            "p2": "?", // RDamageReduction
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": {
                "사거리": "1"
            }
        },
    },
    "Ambessa": { // 암베사
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // Calc_Damage_1_Max
            "p2": "?", // Calc_Damage_1_Percent_Max
            "p3": "?", // Calc_Damage_1_Min_Ratio
            "p4": "?", // Calc_Damage_2_Max
            "p5": "?", // Calc_Damage_2_Percent_Max
            "p6": "?", // Calc_Damage_2_Min_Ratio
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "70",
            "stats": {
                "사거리": "650"
            }
        },
        "W": {
            "p1": "?", // Shield_Duration
            "p2": "?", // Calc_Shield
            "p3": "?", // Buff_Duration
            "p4": "?", // Calc_Damage_Low
            "p5": "?", // Calc_Damage_High
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "18 / 17 / 16 / 15 / 14",
            "cost": "70",
            "stats": {
                "사거리": "325"
            }
        },
        "E": {
            "p1": "?", // Calc_Damage_Flat
            "p2": "?", // Slow_Amount*100
            "p3": "?", // Slow_Duration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "70",
            "stats": {
                "사거리": "325"
            }
        },
        "R": {
            "p1": "?", // Armor_Penetration*100
            "p2": "?", // Calc_Omnivamp
            "p3": "?", // Suppress_Duration
            "p4": "?", // Calc_Damage
            "p5": "?", // Stun_Duration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "130 / 115 / 100",
            "cost": "-",
            "stats": {
                "사거리": "1250"
            }
        },
    },
    "Annie": { // 애니
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "4",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "625"
            }
        },
        "W": {
            "p1": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "600"
            }
        },
        "E": {
            "p1": "?", // ShieldDuration
            "p2": "?", // ShieldBlockTotal
            "p3": "?", // MoveSpeedCalc
            "p4": "?", // MovementSpeedDuration
            "p5": "?", // DamageReturn
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "800"
            }
        },
        "R": {
            "p1": "?", // RPercentPenBuff*100
            "p2": "?", // InitialBurstDamage
            "p3": "?", // TibbersLifetime
            "p4": "?", // TibbersAuraDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "130 / 115 / 100",
            "cost": "100",
            "stats": {
                "사거리": "600"
            }
        },
    },
    "Anivia": { // 애니비아
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalPassthroughDamage
            "p2": "?", // SlowDuration
            "p3": "?", // StunDuration
            "p4": "?", // TotalExplosionDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "80 / 85 / 90 / 95 / 100",
            "stats": {
                "사거리": "1075"
            }
        },
        "W": {
            "p1": "?", // WallWidth
            "p2": "?", // WallDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "17",
            "cost": "70",
            "stats": {
                "사거리": "1000"
            }
        },
        "E": {
            "p1": "?", // TotalDamage
            "p2": "?", // EmpoweredDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "4",
            "cost": "50",
            "stats": {
                "사거리": "650"
            }
        },
        "R": {
            "p1": "?", // GrowthTime
            "p2": "?", // TotalDamagePerSecond
            "p3": "?", // SlowAmount
            "p4": "?", // SlowPercentEmpoweredTT
            "p5": "?", // EmpoweredDamagePerSecondTooltipOnly
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "4 / 3 / 2",
            "cost": "60",
            "stats": {
                "사거리": "750"
            }
        },
    },
    "Ashe": { // 애쉬
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // StackDuration
            "p2": "?", // MaxStacks
            "p3": "?", // BuffDuration
            "p4": "?", // BonusAS
            "p5": "?", // EmpoweredDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0",
            "cost": "30",
            "stats": {
                "사거리": "400"
            }
        },
        "W": {
            "p1": "?", // NumberOfArrowsTooltip
            "p2": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "18 / 14.5 / 11 / 7.5 / 4",
            "cost": "75 / 70 / 65 / 60 / 55",
            "stats": {
                "사거리": "1200"
            }
        },
        "E": {
            "p1": "?", // ChargeCooldown
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "5",
            "cost": "-",
            "stats": {
                "사거리": "25000"
            }
        },
        "R": {
            "p1": "?", // RMainDamage
            "p2": "?", // MaxStunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "100 / 80 / 60",
            "cost": "100",
            "stats": {
                "사거리": "25000"
            }
        },
    },
    "Yasuo": { // 야스오
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // GatheringStormDuration
            "p3": "?", // KnockUpDurationTOOLTIPONLY
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "4",
            "cost": "-",
            "stats": {
                "사거리": "475"
            }
        },
        "W": {
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "25 / 23 / 21 / 19 / 17",
            "cost": "-",
            "stats": {
                "사거리": "400"
            }
        },
        "E": {
            "p1": "?", // TotalDamage
            "p2": "?", // StackDuration
            "p3": "?", // BonusDamagePerStack
            "p4": "?", // MaxStacks
            "p5": "?", // Effect2Amount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0.5 / 0.4 / 0.3 / 0.2 / 0.1",
            "cost": "-",
            "stats": {
                "사거리": "475"
            }
        },
        "R": {
            "p1": "?", // Damage
            "p2": "?", // RKnockupDuration
            "p3": "?", // RBuffDuration
            "p4": "?", // RPercentArmorPen
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "70 / 50 / 30",
            "cost": "-",
            "stats": {
                "사거리": "1400"
            }
        },
    },
    "Ekko": { // 에코
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // InitialDamage
            "p2": "?", // SlowPercent*-100
            "p3": "?", // RecallDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8.5 / 8 / 7.5 / 7",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "1075"
            }
        },
        "W": {
            "p1": "?", // BelowHealthThreshold*100
            "p2": "?", // MissingHealthPercent
            "p3": "?", // SlowZoneDuration
            "p4": "?", // SlowPercent
            "p5": "?", // StunDuration
            "p6": "?", // TotalShield
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "22 / 20 / 18 / 16 / 14",
            "cost": "30 / 35 / 40 / 45 / 50",
            "stats": {
                "사거리": "1600"
            }
        },
        "E": {
            "p1": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8.5 / 8 / 7.5 / 7",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "325"
            }
        },
        "R": {
            "p1": "?", // TotalDamage
            "p2": "?", // TotalBaseHeal
            "p3": "?", // PercentHealAmpPerPercentMissingHealth
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "110 / 80 / 50",
            "cost": "100",
            "stats": {
                "사거리": "850"
            }
        },
    },
    "Elise": { // 엘리스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // BaseDamage
            "p2": "?", // HumanPercentHealth
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6",
            "cost": "80 / 85 / 90 / 95 / 100",
            "stats": {
                "사거리": "615"
            }
        },
        "W": {
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "950"
            }
        },
        "E": {
            "p1": "?", // TotalStunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "50",
            "stats": {
                "사거리": "1075"
            }
        },
        "R": {
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "3",
            "cost": "-",
            "stats": {
                "사거리": "20"
            }
        },
    },
    "MonkeyKing": { // 오공
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // AttackRangeBonus
            "p2": "?", // BonusDamageTT
            "p3": "?", // ShredDuration
            "p4": "?", // ArmorShredPercent*100
            "p5": "?", // CooldownDecrease
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "20",
            "stats": {
                "사거리": "250 / 275 / 300 / 325 / 350"
            }
        },
        "W": {
            "p1": "?", // StealthDuration
            "p2": "?", // CloneDuration
            "p3": "?", // CloneDamageMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "22 / 21 / 20 / 19 / 18",
            "cost": "60 / 55 / 50 / 45 / 40",
            "stats": {
                "사거리": "275"
            }
        },
        "E": {
            "p1": "?", // ExtraTargets
            "p2": "?", // TotalDamage
            "p3": "?", // AttackSpeedDuration
            "p4": "?", // AttackSpeed*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9.25 / 8.5 / 7.75 / 7",
            "cost": "30 / 35 / 40 / 45 / 50",
            "stats": {
                "사거리": "650"
            }
        },
        "R": {
            "p1": "?", // MoveSpeed*100
            "p2": "?", // SpinDuration
            "p3": "?", // KnockupDuration
            "p4": "?", // TotalDamageTT
            "p5": "?", // PercentHPDamageTT
            "p6": "?", // RecastWindow
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "130 / 110 / 90",
            "cost": "100",
            "stats": {
                "사거리": "315"
            }
        },
    },
    "Aurora": { // 오로라
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // damage
            "p2": "?", // MarkDuration
            "p3": "?", // Q2DamageMax
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8.5 / 8 / 7.5 / 7",
            "cost": "60",
            "stats": {
                "사거리": "900"
            }
        },
        "W": {
            "p1": "?", // InvisDuration
            "p2": "?", // MoveSpeedBonus
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "22 / 21 / 20 / 19 / 18",
            "cost": "80",
            "stats": {
                "사거리": "700"
            }
        },
        "E": {
            "p1": "?", // DamageCalc
            "p2": "?", // SlowPercent*-100
            "p3": "?", // SlowDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "80",
            "stats": {
                "사거리": "825"
            }
        },
        "R": {
            "p1": "?", // DamageCalc
            "p2": "?", // SlowPercent*-100
            "p3": "?", // AreaDuration
            "p4": "?", // RBuffDuration
            "p5": "?", // StunDuration
            "p6": "?", // ExitSlowPercent*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "140 / 120 / 100",
            "cost": "100",
            "stats": {
                "사거리": "250"
            }
        },
    },
    "Ornn": { // 오른
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // SlowDuration
            "p3": "?", // SlowAmount
            "p4": "?", // PillarDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8.5 / 8 / 7.5 / 7",
            "cost": "45",
            "stats": {
                "사거리": "800"
            }
        },
        "W": {
            "p1": "?", // BreathDuration
            "p2": "?", // MaxPercentHPPerTickTooltip
            "p3": "?", // BrittleDuration
            "p4": "?", // BrittlePercentMaxHPCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "45 / 50 / 55 / 60 / 65",
            "stats": {
                "사거리": "25000"
            }
        },
        "E": {
            "p1": "?", // TotalDamage
            "p2": "?", // KnockupDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13.5 / 13 / 12.5 / 12",
            "cost": "35 / 40 / 45 / 50 / 55",
            "stats": {
                "사거리": "450"
            }
        },
        "R": {
            "p1": "?", // RDamageCalc
            "p2": "?", // BrittleDurationTOOLTIPONLY
            "p3": "?", // RSlowPercentBasePreMath
            "p4": "?", // RStunDuration
            "p5": "?", // MinStun
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "140 / 120 / 100",
            "cost": "100",
            "stats": {
                "사거리": "2500"
            }
        },
    },
    "Orianna": { // 오리아나
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamageTooltip
            "p2": "?", // ReducedDamagePercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7 / 6 / 5 / 4 / 3",
            "cost": "35",
            "stats": {
                "사거리": "815"
            }
        },
        "W": {
            "p1": "?", // TotalDamage
            "p2": "?", // FieldDuration
            "p3": "?", // SlowAmount*100
            "p4": "?", // HasteAmount*100
            "p5": "?", // SlowAndHasteDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "225"
            }
        },
        "E": {
            "p1": "?", // DefenseBonus
            "p2": "?", // ShieldDuration
            "p3": "?", // TotalShieldTooltip
            "p4": "?", // TotalDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9",
            "cost": "60",
            "stats": {
                "사거리": "1095"
            }
        },
        "R": {
            "p1": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "110 / 95 / 80",
            "cost": "100",
            "stats": {
                "사거리": "410"
            }
        },
    },
    "Olaf": { // 올라프
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // MaxSlowDuration
            "p3": "?", // SlowAmount*100
            "p4": "?", // DebuffDuration
            "p5": "?", // ShredAmount*100
            "p6": "?", // TooltipCDRefund
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "1000"
            }
        },
        "W": {
            "p1": "?", // Duration
            "p2": "?", // Attackspeed*100
            "p3": "?", // ShieldDuration
            "p4": "?", // BaseShield
            "p5": "?", // ShieldPercMissingHP*100
            "p6": "?", // ThresholdForMax*100
            "p7": "?", // MaxShieldCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "50",
            "stats": {
                "사거리": "700"
            }
        },
        "E": {
            "p1": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "",
            "stats": {
                "사거리": "325"
            }
        },
        "R": {
            "p1": "?", // Resists
            "p2": "?", // Duration
            "p3": "?", // AD
            "p4": "?", // DurationExtension
            "p5": "?", // HasteDuration
            "p6": "?", // Haste*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "100 / 90 / 80",
            "cost": "100",
            "stats": {
                "사거리": "400"
            }
        },
    },
    "Yone": { // 요네
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // QDamage
            "p2": "?", // BuffDuration
            "p3": "?", // Q3KnockupDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "4",
            "cost": "-",
            "stats": {
                "사거리": "450"
            }
        },
        "W": {
            "p1": "?", // BaseDamage*0.5
            "p2": "?", // MaxHealthDamage*50
            "p3": "?", // ShieldDuration
            "p4": "?", // WShield
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14",
            "cost": "-",
            "stats": {
                "사거리": "700"
            }
        },
        "E": {
            "p1": "?", // ReturnTimer
            "p2": "?", // StartingMS*100
            "p3": "?", // MovementSpeed*100
            "p4": "?", // DeathmarkPercent*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "22 / 19 / 16 / 13 / 10",
            "cost": "-",
            "stats": {
                "사거리": "25000"
            }
        },
        "R": {
            "p1": "?", // TooltipDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "-",
            "stats": {
                "사거리": "1000"
            }
        },
    },
    "Yorick": { // 요릭
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // BonusDamage
            "p2": "?", // QHeal
            "p3": "?", // MissingHealthRatio
            "p4": "?", // HealReduction
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6 / 5.5 / 5 / 4.5 / 4",
            "cost": "20"
        },
        "W": {
            "p1": "?", // WallHealthTooltip
            "p2": "?", // CircleDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "70",
            "stats": {
                "사거리": "600"
            }
        },
        "E": {
            "p1": "?", // Calc_HealthDamage
            "p2": "?", // SlowDuration
            "p3": "?", // Calc_Slow
            "p4": "?", // MarkDuration
            "p5": "?", // ArmorShred*100
            "p6": "?", // HasteAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "700"
            }
        },
        "R": {
            "p1": "?", // YorickBigGhoulHealth
            "p2": "?", // YorickBigGhoulDamage
            "p3": "?", // RGhoulNumbers
            "p4": "?", // RMarkDamagePercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "160 / 130 / 100",
            "cost": "100",
            "stats": {
                "사거리": "600"
            }
        },
    },
    "Udyr": { // 우디르
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // AttackSpeedDurationBase
            "p2": "?", // AttackSpeedBase*100
            "p3": "?", // OnHitDamage
            "p4": "?", // MaxHPOnHit1
            "p5": "?", // AttackRange
            "p6": "?", // EmpoweredTotalAS
            "p7": "?", // Q2TotalOnHitHPDamage
            "p8": "?", // EmpoweredLightningBonusMax
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6",
            "cost": "20",
            "stats": {
                "사거리": "600"
            }
        },
        "W": {
            "p1": "?", // ShieldDuration
            "p2": "?", // TotalShield
            "p3": "?", // LifeSteal*100
            "p4": "?", // LifeOnHit
            "p5": "?", // RecastShield
            "p6": "?", // RecastHeal
            "p7": "?", // LifeSteal*200
            "p8": "?", // LifeOnHitAwakened
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6",
            "cost": "40"
        },
        "E": {
            "p1": "?", // MoveSpeed
            "p2": "?", // MoveSpeedDuration
            "p3": "?", // StunDuration
            "p4": "?", // ICD
            "p5": "?", // UnstoppableDuration
            "p6": "?", // MoveSpeedBonus
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6",
            "cost": "40",
            "stats": {
                "사거리": "600"
            }
        },
        "R": {
            "p1": "?", // BuffDuration
            "p2": "?", // StormDamage
            "p3": "?", // SlowPotency*100
            "p4": "?", // PulseDamage
            "p5": "?", // PercentHPBlast
            "p6": "?", // EmpoweredSlow
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6",
            "cost": "40",
            "stats": {
                "사거리": "370"
            }
        },
    },
    "Urgot": { // 우르곳
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // SlowDuration
            "p3": "?", // SlowAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "70",
            "stats": {
                "사거리": "800"
            }
        },
        "W": {
            "p1": "?", // WAttacksPerSecond
            "p2": "?", // DamagePerShot
            "p3": "?", // SlowResistance
            "p4": "?", // MoveSpeedMod
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 9 / 6 / 3 / 0",
            "cost": "40 / 30 / 20 / 10 / 0",
            "stats": {
                "사거리": "490"
            }
        },
        "E": {
            "p1": "?", // EShieldDuration
            "p2": "?", // ETotalShieldHealth
            "p3": "?", // StunDuration
            "p4": "?", // EDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 15.5 / 15 / 14.5 / 14",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "475"
            }
        },
        "R": {
            "p1": "?", // RCalculatedDamage
            "p2": "?", // RSlowDuration
            "p3": "?", // RMoveSpeedMod
            "p4": "?", // RHealthThreshold
            "p5": "?", // RFearDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "100 / 85 / 70",
            "cost": "100",
            "stats": {
                "사거리": "2500"
            }
        },
    },
    "Warwick": { // 워윅
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // BaseBiteDamage
            "p2": "?", // TargetPercentHPDamage
            "p3": "?", // LifestealPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "80 / 85 / 90 / 95 / 100",
            "stats": {
                "사거리": "365"
            }
        },
        "W": {
            "p1": "?", // PassiveMSBonus
            "p2": "?", // PassiveASBonus
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "80 / 70 / 60 / 50 / 40",
            "cost": "55",
            "stats": {
                "사거리": "4000"
            }
        },
        "E": {
            "p1": "?", // DRDuration
            "p2": "?", // DRAmount
            "p3": "?", // FearDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "40",
            "stats": {
                "사거리": "375"
            }
        },
        "R": {
            "p1": "?", // RDuration
            "p2": "?", // DamageCumulative
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "110 / 90 / 70",
            "cost": "100",
            "stats": {
                "사거리": "25000"
            }
        },
    },
    "Yunara": { // 유나라
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // Calc_Passive_Damage
            "p2": "?", // Resource_Nonchampion
            "p3": "?", // Resource_Champion
            "p4": "?", // Resource_Max
            "p5": "?", // Buff_Duration
            "p6": "?", // Calc_Attack_Speed
            "p7": "?", // Calc_Damage
            "p8": "?", // Calc_Damage_Spread
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0",
            "cost": "30"
        },
        "W": {
            "p1": "?", // Calc_Damage_Initial
            "p2": "?", // Calc_Slow
            "p3": "?", // Slow_Duration
            "p4": "?", // Calc_Damage_Per_Second
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10",
            "cost": "60",
            "stats": {
                "사거리": "1150"
            }
        },
        "E": {
            "p1": "?", // Buff_Duration
            "p2": "?", // Calc_Move_Speed
            "p3": "?", // Calc_Move_Speed_Enhanced
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9",
            "cost": "40"
        },
        "R": {
            "p1": "?", // Buff_Duration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "100 / 90 / 80",
            "cost": "100"
        },
    },
    "Yuumi": { // 유미
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalMissileDamage
            "p2": "?", // SlowAmount
            "p3": "?", // TotalMissileDamageEmpowered
            "p4": "?", // EmpoweredSlowDuration
            "p5": "?", // EmpoweredSlowAmount
            "p6": "?", // BuffDuration
            "p7": "?", // OnHitDamageCalc
            "p8": "?", // AllyCritChanceMaxAmp*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6.5",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "25000"
            }
        },
        "W": {
            "p1": "?", // HealAndShieldPower*100
            "p2": "?", // HealthOnHit
            "p3": "?", // CCAttachLockout
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0",
            "cost": "-",
            "stats": {
                "사거리": "25000"
            }
        },
        "E": {
            "p1": "?", // TotalShielding
            "p2": "?", // MSDuration
            "p3": "?", // TotalAttackSpeed
            "p4": "?", // MSAmount
            "p5": "?", // ManaRestore
            "p6": "?", // MaxManaPercIncrease*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10",
            "cost": "80 / 90 / 100 / 110 / 120",
            "stats": {
                "사거리": "25000"
            }
        },
        "R": {
            "p1": "?", // UltDuration
            "p2": "?", // NumberOfWaves
            "p3": "?", // TotalMissileDamage
            "p4": "?", // CCDuration
            "p5": "?", // BaseSlow*-100
            "p6": "?", // BonusSlowPerWave*-100
            "p7": "?", // TotalHealPerWave
            "p8": "?", // EnhancedHealPerWave
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 110 / 100",
            "cost": "100",
            "stats": {
                "사거리": "1100"
            }
        },
    },
    "Irelia": { // 이렐리아
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // ChampionDamage
            "p2": "?", // HealAmount
            "p3": "?", // MinionDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "15",
            "stats": {
                "사거리": "600"
            }
        },
        "W": {
            "p1": "?", // MaxDuration
            "p2": "?", // FinalPhysicalDR
            "p3": "?", // FinalMagicDR
            "p4": "?", // MinDamageCalc
            "p5": "?", // MaxDamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "825"
            }
        },
        "E": {
            "p1": "?", // BuffDuration
            "p2": "?", // StunDuration
            "p3": "?", // TotalDamage
            "p4": "?", // MarkDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 14.5 / 13 / 11.5 / 10",
            "cost": "50",
            "stats": {
                "사거리": "850"
            }
        },
        "R": {
            "p1": "?", // MissileDamage
            "p2": "?", // MarkDuration
            "p3": "?", // ZoneDuration
            "p4": "?", // ZoneDamage
            "p5": "?", // CCDuration
            "p6": "?", // SlowAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "125 / 105 / 85",
            "cost": "100",
            "stats": {
                "사거리": "950"
            }
        },
    },
    "Evelynn": { // 이블린
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // MissileDamage
            "p2": "?", // TotalBonusDamage
            "p3": "?", // QStackCount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "4",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "800"
            }
        },
        "W": {
            "p1": "?", // SlowDuration
            "p2": "?", // SlowAmount*100
            "p3": "?", // CharmDuration
            "p4": "?", // ShredDuration
            "p5": "?", // MRShred*100
            "p6": "?", // MonsterCharm
            "p7": "?", // MonsterDamageTotalTOOLTIP
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "1200 / 1300 / 1400 / 1500 / 1600"
            }
        },
        "E": {
            "p1": "?", // BaseDamage
            "p2": "?", // PercentHealthBaseTOOLTIP
            "p3": "?", // SpeedDuration
            "p4": "?", // SpeedAmount*100
            "p5": "?", // EmpoweredDamage
            "p6": "?", // PercentHealthEmpoweredTOOLTIP
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "210"
            }
        },
        "R": {
            "p1": "?", // Damage
            "p2": "?", // CritDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": {
                "사거리": "25000"
            }
        },
    },
    "Ezreal": { // 이즈리얼
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // Damage
            "p2": "?", // CDRefund
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "5.5 / 5.25 / 5 / 4.75 / 4.5",
            "cost": "28 / 31 / 34 / 37 / 40",
            "stats": {
                "사거리": "1150"
            }
        },
        "W": {
            "p1": "?", // DetonationTimeout
            "p2": "?", // Damage
            "p3": "?", // ManaReturn
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8",
            "cost": "50",
            "stats": {
                "사거리": "1150"
            }
        },
        "E": {
            "p1": "?", // Damage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "26 / 23 / 20 / 17 / 14",
            "cost": "70",
            "stats": {
                "사거리": "475"
            }
        },
        "R": {
            "p1": "?", // Damage
            "p2": "?", // DamageMinionMonster
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 105 / 90",
            "cost": "100",
            "stats": {
                "사거리": "25000"
            }
        },
    },
    "Illaoi": { // 일라오이
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "850"
            }
        },
        "W": {
            "p1": "?", // HealthPercentTotal
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "4",
            "cost": "30",
            "stats": {
                "사거리": "400"
            }
        },
        "E": {
            "p1": "?", // SpiritDuration
            "p2": "?", // EchoPercent
            "p3": "?", // VesselDuration
            "p4": "?", // SlowDuration
            "p5": "?", // SlowAmount*100
            "p6": "?", // TimeBetweenVesselTentacleSlams
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "35 / 40 / 45 / 50 / 55",
            "stats": {
                "사거리": "900"
            }
        },
        "R": {
            "p1": "?", // DamageCalc
            "p2": "?", // Duration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 95 / 70",
            "cost": "100",
            "stats": {
                "사거리": "450"
            }
        },
    },
    "JarvanIV": { // 자르반 4세
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // Effect3Amount
            "p3": "?", // BaseARShred*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "45 / 50 / 55 / 60 / 65",
            "stats": {
                "사거리": "770"
            }
        },
        "W": {
            "p1": "?", // Effect5Amount
            "p2": "?", // BaseSlowAmount*100
            "p3": "?", // TotalShield
            "p4": "?", // BonusShield
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9",
            "cost": "30",
            "stats": {
                "사거리": "625"
            }
        },
        "E": {
            "p1": "?", // PermanentAttackSpeed*100
            "p2": "?", // TotalDamage
            "p3": "?", // Effect4Amount
            "p4": "?", // BaseAuraAS*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "55",
            "stats": {
                "사거리": "860"
            }
        },
        "R": {
            "p1": "?", // DamageCalc
            "p2": "?", // WallDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 105 / 90",
            "cost": "100",
            "stats": {
                "사거리": "650"
            }
        },
    },
    "Xayah": { // 자야
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // MultiHitDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "35",
            "stats": {
                "사거리": "400"
            }
        },
        "W": {
            "p1": "?", // WAttackSpeedDuration
            "p2": "?", // WAttackSpeedAmount
            "p3": "?", // BonusDamagePercent
            "p4": "?", // WMoveSpeedDuration
            "p5": "?", // WMoveSpeedAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "18 / 17 / 16 / 15 / 14",
            "cost": "60 / 55 / 50 / 45 / 40",
            "stats": {
                "사거리": "1000"
            }
        },
        "E": {
            "p1": "?", // FeatherDamage
            "p2": "?", // FeatherThreshold
            "p3": "?", // RootDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "20",
            "stats": {
                "사거리": "2000"
            }
        },
        "R": {
            "p1": "?", // Damage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "140 / 120 / 100",
            "cost": "100",
            "stats": {
                "사거리": "450"
            }
        },
    },
    "Zyra": { // 자이라
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // InitialDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7 / 6.5 / 6 / 5.5 / 5",
            "cost": "55",
            "stats": {
                "사거리": "800"
            }
        },
        "W": {
            "p1": "?", // SeedDuration
            "p2": "?", // VisionGranted
            "p3": "?", // AmmoRechargeTime
            "p4": "?", // KillAmmoRefundMinion*100
            "p5": "?", // KillAmmoRefundChamp*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0",
            "cost": "",
            "stats": {
                "사거리": "850"
            }
        },
        "E": {
            "p1": "?", // RootDuration
            "p2": "?", // TotalDamage
            "p3": "?", // SlowDurationPlantAttack
            "p4": "?", // SlowAmountPlantAttack
            "p5": "?", // MaxSlowStacks
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "1100"
            }
        },
        "R": {
            "p1": "?", // TotalDamage
            "p2": "?", // KnockupDuration
            "p3": "?", // EnragedBonusHealthPercent*100
            "p4": "?", // PlantDamageBonus
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "110 / 100 / 90",
            "cost": "100",
            "stats": {
                "사거리": "700"
            }
        },
    },
    "Zac": { // 자크
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 12.5 / 11 / 9.5 / 8",
            "cost": "",
            "stats": {
                "사거리": "800"
            }
        },
        "W": {
            "p1": "?", // BaseDamage
            "p2": "?", // DisplayPercentDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "5",
            "cost": "",
            "stats": {
                "사거리": "350"
            }
        },
        "E": {
            "p1": "?", // ChannelTime
            "p2": "?", // MaxStun
            "p3": "?", // Damage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "21 / 18 / 15 / 12 / 9",
            "cost": "",
            "stats": {
                "사거리": "300"
            }
        },
        "R": {
            "p1": "?", // Bounces
            "p2": "?", // DamagePerBounce
            "p3": "?", // DamagePerSubsequentBounce
            "p4": "?", // SlowDuration
            "p5": "?", // SlowAmount*100
            "p6": "?", // EndingMS*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 105 / 90",
            "cost": "-",
            "stats": {
                "사거리": "300"
            }
        },
    },
    "Zaahen": { // 자헨
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // InitialDamage
            "p2": "?", // HealPercent*100
            "p3": "?", // SecondHitDamage
            "p4": "?", // KnockUpDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "25",
            "stats": {
                "사거리": "25000"
            }
        },
        "W": {
            "p1": "?", // InitialDamage
            "p2": "?", // SecondaryDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13.5 / 13 / 12.5 / 12",
            "cost": "50",
            "stats": {
                "사거리": "850"
            }
        },
        "E": {
            "p1": "?", // BaseDamageCalc
            "p2": "?", // BonusDamageCalc
            "p3": "?", // PercentHPDamage*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "40",
            "stats": {
                "사거리": "25000"
            }
        },
        "R": {
            "p1": "?", // ArmorPen*100
            "p2": "?", // DamageReduction*100
            "p3": "?", // DamageEndCalc
            "p4": "?", // HealPercent*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "110 / 95 / 80",
            "cost": "100",
            "stats": {
                "사거리": "600"
            }
        },
    },
    "Janna": { // 잔나
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // MaxDuration
            "p2": "?", // MinimumDamage
            "p3": "?", // MaxDamage
            "p4": "?", // BaseKnockup
            "p5": "?", // MaxKnockup
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14",
            "cost": "90 / 95 / 100 / 105 / 110",
            "stats": {
                "사거리": "1075"
            }
        },
        "W": {
            "p1": "?", // TotalMS
            "p2": "?", // SlowDuration
            "p3": "?", // TotalSlow
            "p4": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "-1"
            }
        },
        "E": {
            "p1": "?", // ShieldDuration
            "p2": "?", // TotalShield
            "p3": "?", // TotalAD
            "p4": "?", // ECDRefundforCC*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "800"
            }
        },
        "R": {
            "p1": "?", // Effect3Amount
            "p2": "?", // TotalHeal
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "130 / 115 / 100",
            "cost": "100",
            "stats": {
                "사거리": "725"
            }
        },
    },
    "Jax": { // 잭스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "50",
            "stats": {
                "사거리": "700"
            }
        },
        "W": {
            "p1": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7 / 6 / 5 / 4 / 3",
            "cost": "30",
            "stats": {
                "사거리": "300"
            }
        },
        "E": {
            "p1": "?", // DodgeDuration
            "p2": "?", // AoEDamageReduction
            "p3": "?", // TotalDamage
            "p4": "?", // PercentHealthDamage
            "p5": "?", // StunDuration
            "p6": "?", // PercentIncreasedPerDodge*100
            "p7": "?", // MaxDamage
            "p8": "?", // MaxPercentHealthDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "17 / 15 / 13 / 11 / 9",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "300"
            }
        },
        "R": {
            "p1": "?", // PassiveFallOffTime
            "p2": "?", // OnHitDamage
            "p3": "?", // SwingDamageTotal
            "p4": "?", // BaseArmor
            "p5": "?", // BaseMR
            "p6": "?", // Duration
            "p7": "?", // BonusArmor
            "p8": "?", // BonusMR
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "110 / 100 / 90",
            "cost": "100",
            "stats": {
                "사거리": "260"
            }
        },
    },
    "Zed": { // 제드
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // PassThroughDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6",
            "cost": "75 / 70 / 65 / 60 / 55",
            "stats": {
                "사거리": "900"
            }
        },
        "W": {
            "p1": "?", // Effect3Amount
            "p2": "?", // Effect5Amount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 19 / 18 / 17 / 16",
            "cost": "40 / 35 / 30 / 25 / 20",
            "stats": {
                "사거리": "650"
            }
        },
        "E": {
            "p1": "?", // TotalDamage
            "p2": "?", // ShadowHitCDR
            "p3": "?", // SlowDuration
            "p4": "?", // MoveSpeedMod*-100
            "p5": "?", // MoveSpeedModBonus*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "5 / 4.5 / 4 / 3.5 / 3",
            "cost": "40",
            "stats": {
                "사거리": "290"
            }
        },
        "R": {
            "p1": "?", // RDeathMarkDuration
            "p2": "?", // RCalculatedDamage
            "p3": "?", // RDamageAmp*100
            "p4": "?", // RShadowDurationDisplayed
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 110 / 100",
            "cost": "-",
            "stats": {
                "사거리": "625"
            }
        },
    },
    "Xerath": { // 제라스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TooltipTotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "80 / 90 / 100 / 110 / 120",
            "stats": {
                "사거리": "750"
            }
        },
        "W": {
            "p1": "?", // TotalDamage
            "p2": "?", // SlowDuration
            "p3": "?", // SlowAmount*100
            "p4": "?", // SweetSpotTotalDamage
            "p5": "?", // SweetSpotSlowAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "80 / 90 / 100 / 110 / 120",
            "stats": {
                "사거리": "1000"
            }
        },
        "E": {
            "p1": "?", // MaxStunDuration
            "p2": "?", // TooltipTotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 12.5 / 12 / 11.5 / 11",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "1050"
            }
        },
        "R": {
            "p1": "?", // Duration
            "p2": "?", // NumberOfShots
            "p3": "?", // TooltipTotalDamage
            "p4": "?", // RampDamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "130 / 115 / 100",
            "cost": "100",
            "stats": {
                "사거리": "5000"
            }
        },
    },
    "Zeri": { // 제리
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // NumberOfMissiles
            "p2": "?", // ActiveDamageThatCanCrit
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0",
            "cost": "-",
            "stats": {
                "사거리": "700"
            }
        },
        "W": {
            "p1": "?", // TotalDamage
            "p2": "?", // SlowDuration
            "p3": "?", // SlowPercent*100
            "p4": "?", // WallDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "1150"
            }
        },
        "E": {
            "p1": "?", // BuffDuration
            "p2": "?", // PenDamagePercent*100
            "p3": "?", // BonusDamageTotal
            "p4": "?", // CDReductionPerHit
            "p5": "?", // CritCDReductionPerHit
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "24 / 22.5 / 21 / 19.5 / 18",
            "cost": "90 / 85 / 80 / 75 / 70",
            "stats": {
                "사거리": "25000"
            }
        },
        "R": {
            "p1": "?", // TotalActiveDamage
            "p2": "?", // RDuration
            "p3": "?", // BaseASPercent*100
            "p4": "?", // BaseBonusMS*100
            "p5": "?", // MaxHyperchargeDuration
            "p6": "?", // MSPercent*100
            "p7": "?", // ChainPhysicalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "80 / 75 / 70",
            "cost": "100",
            "stats": {
                "사거리": "800"
            }
        },
    },
    "Jayce": { // 제이스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 14 / 12 / 10 / 8",
            "cost": "40",
            "stats": {
                "사거리": "600"
            }
        },
        "W": {
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10",
            "cost": "40",
            "stats": {
                "사거리": "285"
            }
        },
        "E": {
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "55",
            "stats": {
                "사거리": "240"
            }
        },
        "R": {
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6",
            "cost": "-",
            "stats": {
                "사거리": "600"
            }
        },
    },
    "Zoe": { // 조이
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamageTooltip
            "p2": "?", // MaxDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8.5 / 8 / 7.5 / 7 / 6.5",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "800"
            }
        },
        "W": {
            "p1": "?", // MSDuration
            "p2": "?", // MovementSpeed*100
            "p3": "?", // MissileDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0.25",
            "cost": "-",
            "stats": {
                "사거리": "3000 / 4500 / 6000 / 3000 / 3000"
            }
        },
        "E": {
            "p1": "?", // TotalDamageTooltip
            "p2": "?", // CooldownRefresh*100
            "p3": "?", // PercentPen*100
            "p4": "?", // BreakDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "18 / 17 / 16 / 15 / 14",
            "cost": "80",
            "stats": {
                "사거리": "800"
            }
        },
        "R": {
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 8 / 5",
            "cost": "40",
            "stats": {
                "사거리": "575"
            }
        },
    },
    "Ziggs": { // 직스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6 / 5.5 / 5 / 4.5 / 4",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "850"
            }
        },
        "W": {
            "p1": "?", // BombDuration
            "p2": "?", // TotalDamage
            "p3": "?", // TurretDestroyPercent*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "80",
            "stats": {
                "사거리": "1000"
            }
        },
        "E": {
            "p1": "?", // TotalDamage
            "p2": "?", // SlowDuration
            "p3": "?", // Slow*-100
            "p4": "?", // MineDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": {
                "사거리": "900"
            }
        },
        "R": {
            "p1": "?", // EmpoweredDamage
            "p2": "?", // BlastDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 95 / 70",
            "cost": "100",
            "stats": {
                "사거리": "5000"
            }
        },
    },
    "Jhin": { // 진
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // TooltipMaxTargetsHit
            "p3": "?", // PercentAmpOnKill*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7 / 6.5 / 6 / 5.5 / 5",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "550"
            }
        },
        "W": {
            "p1": "?", // TotalDamage
            "p2": "?", // SpottingDuration
            "p3": "?", // RootDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "3000"
            }
        },
        "E": {
            "p1": "?", // TrapDuration
            "p2": "?", // TrapSlowAmount*100
            "p3": "?", // TrapDetonationTime
            "p4": "?", // TotalDamage
            "p5": "?", // AmmoRechargeRateTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "2",
            "cost": "30",
            "stats": {
                "사거리": "750"
            }
        },
        "R": {
            "p1": "?", // DamageCalc
            "p2": "?", // MaxIncreaseCalc
            "p3": "?", // SlowDuration
            "p4": "?", // SlowPercent*100
            "p5": "?", // FourthShotMultiplier*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 105 / 90",
            "cost": "100",
            "stats": {
                "사거리": "25000"
            }
        },
    },
    "Zilean": { // 질리언
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // FuseDuration
            "p2": "?", // TotalDamage
            "p3": "?", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "900"
            }
        },
        "W": {
            "p1": "?", // CooldownReduction
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 12 / 10 / 8 / 6",
            "cost": "35",
            "stats": {
                "사거리": "600"
            }
        },
        "E": {
            "p1": "?", // Duration
            "p2": "?", // SpeedAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15",
            "cost": "50",
            "stats": {
                "사거리": "550"
            }
        },
        "R": {
            "p1": "?", // RDuration
            "p2": "?", // ReviveStateDuration
            "p3": "?", // RTotalHeal
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 90 / 60",
            "cost": "125 / 150 / 175",
            "stats": {
                "사거리": "900"
            }
        },
    },
    "Jinx": { // 징크스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // RocketDamage
            "p2": "?", // RocketASPDPenalty*100
            "p3": "?", // RocketBonusRange
            "p4": "?", // MinigunAttackSpeedDuration
            "p5": "?", // MinigunAttackSpeedStacks
            "p6": "?", // MinigunAttackSpeedMax
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0.9",
            "cost": "20",
            "stats": {
                "사거리": "600"
            }
        },
        "W": {
            "p1": "?", // TotalDamage
            "p2": "?", // SlowDuration
            "p3": "?", // SlowPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 7 / 6 / 5 / 4",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "1450"
            }
        },
        "E": {
            "p1": "?", // GrenadeDuration
            "p2": "?", // RootDuration
            "p3": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "24 / 20.5 / 17 / 13.5 / 10",
            "cost": "90",
            "stats": {
                "사거리": "925"
            }
        },
        "R": {
            "p1": "?", // DamageFloor
            "p2": "?", // DamageMax
            "p3": "?", // PercentDamage
            "p4": "?", // AoEDamageMult*100
            "p5": "?", // MonsterExecuteMax
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "85 / 65 / 45",
            "cost": "100",
            "stats": {
                "사거리": "25000"
            }
        },
    },
    "Chogath": { // 초가스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // Effect5Amount
            "p2": "?", // TotalDamageTooltip
            "p3": "?", // Effect3Amount
            "p4": "?", // Effect2Amount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6",
            "cost": "50",
            "stats": {
                "사거리": "950"
            }
        },
        "W": {
            "p1": "?", // Effect2Amount
            "p2": "?", // TotalDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10.5 / 10 / 9.5 / 9",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "300"
            }
        },
        "E": {
            "p1": "?", // FlatDamageCalc
            "p2": "?", // MaxHealthPercentCalc
            "p3": "?", // SlowAmountPercentage
            "p4": "?", // SlowDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 7 / 6 / 5 / 4",
            "cost": "30",
            "stats": {
                "사거리": "40"
            }
        },
        "R": {
            "p1": "?", // RDamage
            "p2": "?", // RMonsterDamage
            "p3": "?", // RHealthPerStack
            "p4": "?", // RMinionMaxStacks
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "80 / 70 / 60",
            "cost": "100",
            "stats": {
                "사거리": "175"
            }
        },
    },
    "Karma": { // 카르마
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // SlowDuration
            "p3": "?", // SlowAmount*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "40 / 50 / 60 / 70 / 80",
            "stats": {
                "사거리": "950"
            }
        },
        "W": {
            "p1": "?", // InitialDamage
            "p2": "?", // TetherDuration
            "p3": "?", // RootDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "675"
            }
        },
        "E": {
            "p1": "?", // ShieldDuration
            "p2": "?", // TotalShield
            "p3": "?", // MoveSpeedDuration
            "p4": "?", // MoveSpeed*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "800"
            }
        },
        "R": {
            "p1": "?", // RQImpactDamage
            "p2": "?", // RQFieldDamage
            "p3": "?", // RWHealAmount
            "p4": "?", // RWBonusRoot
            "p5": "?", // REBonusShield
            "p6": "?", // REBonusShieldArea
            "p7": "?", // REMoveSpeed*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "40 / 38 / 36",
            "cost": "-",
            "stats": {
                "사거리": "1100"
            }
        },
    },
    "Camille": { // 카밀
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // BonusDamage
            "p2": "?", // MSDuration
            "p3": "?", // MSBonus*100
            "p4": "?", // QTotalRecastTime
            "p5": "?", // QRampUpTime
            "p6": "?", // EmpoweredBonusDamage
            "p7": "?", // DamageConversionPercentage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "25",
            "stats": {
                "사거리": "325"
            }
        },
        "W": {
            "p1": "?", // BaseDamageTotal
            "p2": "?", // SlowPercentage
            "p3": "?", // SlowDuration
            "p4": "?", // OuterEdgeTooltip
            "p5": "?", // OuterConeHealingRatio
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "610"
            }
        },
        "E": {
            "p1": "?", // ASDuration
            "p2": "?", // ASBuff*100
            "p3": "?", // TotalDamage
            "p4": "?", // KnockupDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "70",
            "stats": {
                "사거리": "800"
            }
        },
        "R": {
            "p1": "?", // RDuration
            "p2": "?", // RPercentCurrentHPDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "140 / 115 / 90",
            "cost": "100",
            "stats": {
                "사거리": "475"
            }
        },
    },
    "Kassadin": { // 카사딘
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // TotalShield
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8.5 / 8 / 7.5 / 7",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "650"
            }
        },
        "W": {
            "p1": "?", // OnHitDamage
            "p2": "?", // ActiveDamage
            "p3": "?", // MissingManaRatio
            "p4": "?", // ChampionMissingManaRatio
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7",
            "cost": "1",
            "stats": {
                "사거리": "1"
            }
        },
        "E": {
            "p1": "?", // ReductionPerSpellCast
            "p2": "?", // TotalDamage
            "p3": "?", // SlowDuration
            "p4": "?", // SlowAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "21 / 20 / 19 / 18 / 17",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "400"
            }
        },
        "R": {
            "p1": "?", // BaseDamage
            "p2": "?", // RStackDuration
            "p3": "?", // BonusDamage
            "p4": "?", // MaxStacks
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "5 / 3.5 / 2",
            "cost": "40",
            "stats": {
                "사거리": "500"
            }
        },
    },
    "Karthus": { // 카서스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // QDamage
            "p2": "?", // QSingleTargetDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0",
            "cost": "20 / 25 / 30 / 35 / 40",
            "stats": {
                "사거리": "875"
            }
        },
        "W": {
            "p1": "?", // WallDuration
            "p2": "?", // DebuffDuration
            "p3": "?", // MagicResistShred
            "p4": "?", // SlowPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15",
            "cost": "70",
            "stats": {
                "사거리": "1000"
            }
        },
        "E": {
            "p1": "?", // ManaRestoreOnKill
            "p2": "?", // TotalDPS
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0.5",
            "cost": "30 / 42 / 54 / 66 / 78",
            "stats": {
                "사거리": "550"
            }
        },
        "R": {
            "p1": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "200 / 180 / 160",
            "cost": "100",
            "stats": {
                "사거리": "10000"
            }
        },
    },
    "Cassiopeia": { // 카시오페아
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // PoisonDuration
            "p2": "?", // TooltipTotalDamage
            "p3": "?", // ChampHitMSBonus
            "p4": "?", // ChampHitMSDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "3.5",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "850"
            }
        },
        "W": {
            "p1": "?", // CloudDuration
            "p2": "?", // DamagePerSecond
            "p3": "?", // SlowPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "24 / 22 / 20 / 18 / 16",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "700"
            }
        },
        "E": {
            "p1": "?", // BasicDamage
            "p2": "?", // BonusPoisonedDamage
            "p3": "?", // HealCalc
            "p4": "?", // HealCalcMinion
            "p5": "?", // Cost
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0.75",
            "cost": "40",
            "stats": {
                "사거리": "700"
            }
        },
        "R": {
            "p1": "?", // RDamage
            "p2": "?", // RCCDuration
            "p3": "?", // RSlowPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": {
                "사거리": "825"
            }
        },
    },
    "Kaisa": { // 카이사
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // Effect2Amount
            "p2": "?", // TotalIndividualMissileDamage
            "p3": "?", // MaxDamageDisplay
            "p4": "?", // ExtraHitReduction*100
            "p5": "?", // Effect7Amount
            "p6": "?", // f11.1
            "p7": "?", // Effect6Amount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "55",
            "stats": {
                "사거리": "600"
            }
        },
        "W": {
            "p1": "?", // TotalDamage
            "p2": "?", // Effect4Amount
            "p3": "?", // Effect5Amount
            "p4": "?", // Effect3Amount
            "p5": "?", // f2.1
            "p6": "?", // Effect2Amount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 18.5 / 17 / 15.5 / 14",
            "cost": "55 / 60 / 65 / 70 / 75",
            "stats": {
                "사거리": "3000"
            }
        },
        "E": {
            "p1": "?", // TotalMoveSpeed
            "p2": "?", // Effect2Amount
            "p3": "?", // Effect5Amount*100
            "p4": "?", // Effect4Amount
            "p5": "?", // Effect7Amount
            "p6": "?", // f10.1
            "p7": "?", // Effect6Amount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 14.5 / 13 / 11.5 / 10",
            "cost": "30",
            "stats": {
                "사거리": "1"
            }
        },
        "R": {
            "p1": "?", // RShieldDuration
            "p2": "?", // RCalculatedShieldValue
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "130 / 100 / 70",
            "cost": "100",
            "stats": {
                "사거리": "2000 / 2500 / 3000"
            }
        },
    },
    "Khazix": { // 카직스
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "4",
            "cost": "20",
            "stats": {
                "사거리": "325"
            }
        },
        "W": {
            "p1": "?", // BaseDamage
            "p2": "?", // HealAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9",
            "cost": "55 / 60 / 65 / 70 / 75",
            "stats": {
                "사거리": "1000"
            }
        },
        "E": {
            "p1": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "50",
            "stats": {
                "사거리": "700"
            }
        },
        "R": {
            "p1": "?", // StealthDuration
            "p2": "?", // BonusMovementSpeedPercent*100
            "p3": "?", // RecastWindow
            "p4": "?", // EvolvedStealthDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "100 / 85 / 70",
            "cost": "100",
            "stats": {
                "사거리": "25000"
            }
        },
    },
    "Katarina": { // 카타리나
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // MaxBounces
            "p2": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "-",
            "stats": {
                "사거리": "625"
            }
        },
        "W": {
            "p1": "?", // Effect4Amount
            "p2": "?", // Effect2Amount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "-",
            "stats": {
                "사거리": "25000"
            }
        },
        "E": {
            "p1": "?", // TotalDamage
            "p2": "?", // DaggerCooldownReduction
            "p3": "?", // TooltipDaggerReduction
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "-",
            "stats": {
                "사거리": "725"
            }
        },
        "R": {
            "p1": "?", // DamageCalc
            "p2": "?", // ADDamageCalc
            "p3": "?", // GrievousDuration
            "p4": "?", // GrievousAmount*100
            "p5": "?", // Duration
            "p6": "?", // TotalDamageCalc
            "p7": "?", // TotalADDamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "75 / 60 / 45",
            "cost": "-",
            "stats": {
                "사거리": "550"
            }
        },
    },
    "Kalista": { // 칼리스타
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "1150"
            }
        },
        "W": {
            "p1": "?", // MaxHealthDamage*100
            "p2": "?", // PerTargetCooldown
            "p3": "?", // MaximumMonsterDamage
            "p4": "?", // AmmoRechargeTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "30",
            "cost": "-",
            "stats": {
                "사거리": "5000"
            }
        },
        "E": {
            "p1": "?", // NormalDamage
            "p2": "?", // AdditionalDamage
            "p3": "?", // SlowDuration
            "p4": "?", // TotalSlowAmount
            "p5": "?", // ManaRefund
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0",
            "cost": "30",
            "stats": {
                "사거리": "1000"
            }
        },
        "R": {
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "160 / 140 / 120",
            "cost": "100",
            "stats": {
                "사거리": "1000"
            }
        },
    },
    "Kennen": { // 케넨
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7 / 6.25 / 5.5 / 4.75 / 4",
            "cost": "60 / 55 / 50 / 45 / 40",
            "stats": {
                "사거리": "950"
            }
        },
        "W": {
            "p1": "?", // TotalDamagePassive
            "p2": "?", // TotalDamageActive
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 11.25 / 9.5 / 7.75 / 6",
            "cost": "40",
            "stats": {
                "사거리": "725"
            }
        },
        "E": {
            "p1": "?", // DurationAsBall
            "p2": "?", // MovementSpeed*100
            "p3": "?", // TotalDamage
            "p4": "?", // EnergyRefund
            "p5": "?", // DurationAfterBall
            "p6": "?", // TotalAS*100
            "p7": "?", // CritDurationBonus
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "80",
            "stats": {
                "사거리": "170"
            }
        },
        "R": {
            "p1": "?", // KennenRTickRate
            "p2": "?", // PerTickDamageCalculated
            "p3": "?", // KennenRDuration
            "p4": "?", // KennenRDefenses
            "p5": "?", // DamageAmp*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120",
            "cost": "-",
            "stats": {
                "사거리": "550"
            }
        },
    },
    "Caitlyn": { // 케이틀린
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // InitialDamage
            "p2": "?", // SecondaryDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "55 / 60 / 65 / 70 / 75",
            "stats": {
                "사거리": "1250"
            }
        },
        "W": {
            "p1": "?", // RootDuration
            "p2": "?", // TrapDuration
            "p3": "?", // MaximumTraps
            "p4": "?", // MaximumCharges
            "p5": "?", // AmmoRechargeTime
            "p6": "?", // HeadshotBonusDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0.5",
            "cost": "20",
            "stats": {
                "사거리": "800"
            }
        },
        "E": {
            "p1": "?", // SlowDuration
            "p2": "?", // SlowAmount
            "p3": "?", // NetDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 14 / 12 / 10 / 8",
            "cost": "75",
            "stats": {
                "사거리": "750"
            }
        },
        "R": {
            "p1": "?", // RTotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "90",
            "cost": "100",
            "stats": {
                "사거리": "3500"
            }
        },
    },
    "Kayn": { // 케인
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // DarkinFlatDamage
            "p3": "?", // DarkinPercentDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7 / 6.5 / 6 / 5.5 / 5",
            "cost": "40",
            "stats": {
                "사거리": "350"
            }
        },
        "W": {
            "p1": "?", // TotalDamage
            "p2": "?", // Effect3Amount*-100
            "p3": "?", // Effect5Amount
            "p4": "?", // Effect2Amount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "700"
            }
        },
        "E": {
            "p1": "?", // Effect2Amount
            "p2": "?", // Effect1Amount
            "p3": "?", // TotalHealing
            "p4": "?", // Effect3Amount
            "p5": "?", // Effect5Amount
            "p6": "?", // AssassinCDReduction
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "21 / 19 / 17 / 15 / 13",
            "cost": "90",
            "stats": {
                "사거리": "400"
            }
        },
        "R": {
            "p1": "?", // InfestDuration
            "p2": "?", // Damage
            "p3": "?", // SlayerDamage
            "p4": "?", // HealValue
            "p5": "?", // SlayerHealPercent*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": {
                "사거리": "550"
            }
        },
    },
    "Kayle": { // 케일
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // SlowDuration
            "p3": "?", // SlowPercent
            "p4": "?", // ShredDuration
            "p5": "?", // ShredPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "900"
            }
        },
        "W": {
            "p1": "?", // TotalHeal
            "p2": "?", // HasteDuration
            "p3": "?", // TotalHaste
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "900"
            }
        },
        "E": {
            "p1": "?", // EPassiveTotalDamage
            "p2": "?", // ActiveTotalExecuteDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "-",
            "stats": {
                "사거리": "550"
            }
        },
        "R": {
            "p1": "?", // InvulnDuration
            "p2": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "160 / 120 / 80",
            "cost": "100 / 50 / 0",
            "stats": {
                "사거리": "900"
            }
        },
    },
    "KogMaw": { // 코그모
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // AttackSpeed*100
            "p2": "?", // TotalDamage
            "p3": "?", // ShredDuration
            "p4": "?", // ShredAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7",
            "cost": "40",
            "stats": {
                "사거리": "1175"
            }
        },
        "W": {
            "p1": "?", // Range
            "p2": "?", // Duration
            "p3": "?", // TotalHealthDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "17",
            "cost": "40",
            "stats": {
                "사거리": "530"
            }
        },
        "E": {
            "p1": "?", // TotalDamage
            "p2": "?", // TrailDuration
            "p3": "?", // SlowAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12",
            "cost": "40 / 55 / 70 / 85 / 100",
            "stats": {
                "사거리": "1200"
            }
        },
        "R": {
            "p1": "?", // BaseDamageCalc
            "p2": "?", // TooltipMissingHealthDamageAmp
            "p3": "?", // MaxDamageCalc
            "p4": "?", // ManaCostDuration
            "p5": "?", // BaseCost
            "p6": "?", // ManaCostCap
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "2 / 1.5 / 1",
            "cost": "40",
            "stats": {
                "사거리": "1300 / 1550 / 1800"
            }
        },
    },
    "Corki": { // 코르키
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // RevealDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8.5 / 8 / 7.5 / 7",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "825"
            }
        },
        "W": {
            "p1": "?", // TrailDuration
            "p2": "?", // MaximumDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "80 / 85 / 90 / 95 / 100",
            "stats": {
                "사거리": "600"
            }
        },
        "E": {
            "p1": "?", // SprayDuration
            "p2": "?", // TotalDamage
            "p3": "?", // ShredMax*-1
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "600"
            }
        },
        "R": {
            "p1": "?", // RSmallMissileDamage
            "p2": "?", // RBigMissileDamage
            "p3": "?", // MaxAmmoTOOLTIP
            "p4": "?", // AttackRefund
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "2",
            "cost": "35",
            "stats": {
                "사거리": "1225"
            }
        },
    },
    "Quinn": { // 퀸
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // VisionReductionDuration
            "p2": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10.5 / 10 / 9.5 / 9",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "1025"
            }
        },
        "W": {
            "p1": "?", // BuffDuration
            "p2": "?", // AttackSpeedBonus*100
            "p3": "?", // MovespeedAmount*100
            "p4": "?", // VisionDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "50 / 45 / 40 / 35 / 30",
            "cost": "-",
            "stats": {
                "사거리": "2100"
            }
        },
        "E": {
            "p1": "?", // TotalDamage
            "p2": "?", // SlowAmount*100
            "p3": "?", // SlowDecayTime
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "50",
            "stats": {
                "사거리": "675"
            }
        },
        "R": {
            "p1": "?", // MovementSpeedMod*100
            "p2": "?", // Damage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "3",
            "cost": "50 / 25 / 0",
            "stats": {
                "사거리": "700"
            }
        },
    },
    "KSante": { // 크산테
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // BaseDamage
            "p2": "?", // SlowDuration
            "p3": "?", // SlowPercent*100
            "p4": "?", // RecastWindow
            "p5": "?", // StunDuration
            "p6": "?", // RCooldownReduction.0*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "3.5",
            "cost": "20",
            "stats": {
                "사거리": "450"
            }
        },
        "W": {
            "p1": "?", // MinDurationTOOLTIP
            "p2": "?", // MaxDuration.1
            "p3": "?", // DamageReduction*100
            "p4": "?", // BaseDamage
            "p5": "?", // TotalMaxHealthDamage
            "p6": "?", // MinKnockbackDuration
            "p7": "?", // MaxKnockbackDuration
            "p8": "?", // RDamageIncreaseMin*100
            "p9": "?", // RDamageIncreaseMax*100
            "p10": "?", // RDamageReduction*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "600"
            }
        },
        "E": {
            "p1": "?", // ShieldDuration
            "p2": "?", // TotalShield
            "p3": "?", // CooldownModAO*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "45 / 50 / 55 / 60 / 65",
            "stats": {
                "사거리": "525"
            }
        },
        "R": {
            "p1": "?", // BaseDamage
            "p2": "?", // AllOutDuration
            "p3": "?", // TotalDamageSlamDown
            "p4": "?", // AttackSpeed*100
            "p5": "?", // ArmorPenPercent*100
            "p6": "?", // Omnivamp*100
            "p7": "?", // HealthLost*100
            "p8": "?", // DefensesLost*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": {
                "사거리": "250"
            }
        },
    },
    "Kled": { // 클레드
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // TetherPopTime
            "p3": "?", // TotalYankDamage
            "p4": "?", // SlowDuration
            "p5": "?", // SlowAmount*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "-",
            "stats": {
                "사거리": "800"
            }
        },
        "W": {
            "p1": "?", // ActiveDuration
            "p2": "?", // AttackSpeed*100
            "p3": "?", // BaseFlatDamage
            "p4": "?", // PercentDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "-"
        },
        "E": {
            "p1": "?", // TotalDamage
            "p2": "?", // MoveSpeedDuration
            "p3": "?", // MoveSpeed*100
            "p4": "?", // RecastWindow
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "-",
            "stats": {
                "사거리": "550"
            }
        },
        "R": {
            "p1": "?", // MaximumShield
            "p2": "?", // MinimumDamageTooltip
            "p3": "?", // MaximumChargeDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "140 / 125 / 110",
            "cost": "-",
            "stats": {
                "사거리": "3500 / 4000 / 4500"
            }
        },
    },
    "Qiyana": { // 키아나
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // VanillaDamage
            "p2": "?", // SlowDuration
            "p3": "?", // SlowPotency*-100
            "p4": "?", // CritThreshold*100
            "p5": "?", // TremorDamage
            "p6": "?", // Haste*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7",
            "cost": "35",
            "stats": {
                "사거리": "525"
            }
        },
        "W": {
            "p1": "?", // AttackSpeed*100
            "p2": "?", // OnHitDamage
            "p3": "?", // PassiveMS*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7",
            "cost": "25 / 30 / 35 / 40 / 45",
            "stats": {
                "사거리": "1100"
            }
        },
        "E": {
            "p1": "?", // Damage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "650"
            }
        },
        "R": {
            "p1": "?", // StunDuration
            "p2": "?", // Damage
            "p3": "?", // MissingHealthDamageRock
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120",
            "cost": "100",
            "stats": {
                "사거리": "950"
            }
        },
    },
    "Kindred": { // 킨드레드
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // BaseASDuration
            "p3": "?", // TotalQAttackSpeed
            "p4": "?", // CDNewValue
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9",
            "cost": "35",
            "stats": {
                "사거리": "340"
            }
        },
        "W": {
            "p1": "?", // AttackHeal
            "p2": "?", // BaseWolfDamage
            "p3": "?", // PercentWolfDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "18 / 17 / 16 / 15 / 14",
            "cost": "40",
            "stats": {
                "사거리": "560"
            }
        },
        "E": {
            "p1": "?", // SlowDuration
            "p2": "?", // TotalSlow
            "p3": "?", // TotalDuration
            "p4": "?", // BaseBiteDamage
            "p5": "?", // PercentBiteDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 12.5 / 11 / 9.5 / 8",
            "cost": "",
            "stats": {
                "사거리": "500"
            }
        },
        "R": {
            "p1": "?", // BuffDuration
            "p2": "?", // HealFlat
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "160 / 140 / 120",
            "cost": "100",
            "stats": {
                "사거리": "500"
            }
        },
    },
    "Taric": { // 타릭
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // StackCooldown
            "p2": "?", // Effect6Amount
            "p3": "?", // HealingPerStack
            "p4": "?", // MaxStackHealing
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "3",
            "cost": "60",
            "stats": {
                "사거리": "325"
            }
        },
        "W": {
            "p1": "?", // BonusArmor
            "p2": "?", // Effect3Amount
            "p3": "?", // Effect2Amount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15",
            "cost": "60",
            "stats": {
                "사거리": "800"
            }
        },
        "E": {
            "p1": "?", // Effect3Amount
            "p2": "?", // TotalDamage
            "p3": "?", // Effect2Amount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "40",
            "stats": {
                "사거리": "610"
            }
        },
        "R": {
            "p1": "?", // InitialDelay
            "p2": "?", // InvulnDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "180 / 150 / 120",
            "cost": "100",
            "stats": {
                "사거리": "400"
            }
        },
    },
    "Talon": { // 탈론
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // LeapDamage
            "p2": "?", // CriticalDamage
            "p3": "?", // TotalHealing
            "p4": "?", // CooldownRefund*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "40",
            "stats": {
                "사거리": "575"
            }
        },
        "W": {
            "p1": "?", // TotalInitialDamage
            "p2": "?", // TotalReturnDamage
            "p3": "?", // SlowDuration
            "p4": "?", // MovespeedSlow*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8.5 / 8 / 7.5 / 7",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "650"
            }
        },
        "E": {
            "p1": "?", // WallCD
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0",
            "cost": "-",
            "stats": {
                "사거리": "725"
            }
        },
        "R": {
            "p1": "?", // Damage
            "p2": "?", // MoveSpeed*100
            "p3": "?", // Duration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "100 / 80 / 60",
            "cost": "100",
            "stats": {
                "사거리": "550"
            }
        },
    },
    "Taliyah": { // 탈리야
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // RockDamage
            "p2": "?", // ExtraMissileReducedDamagePercent
            "p3": "?", // BigRockManaCost
            "p4": "?", // WorkedGroundCDR*100
            "p5": "?", // SlowDuration
            "p6": "?", // SlowPercent*100
            "p7": "?", // BigRockDamage
            "p8": "?", // MonsterStunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7 / 6 / 5 / 4 / 3",
            "cost": "55 / 60 / 65 / 70 / 75",
            "stats": {
                "사거리": "1000"
            }
        },
        "W": {
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 12.5 / 11 / 9.5 / 8",
            "cost": "40 / 30 / 20 / 10 / 0",
            "stats": {
                "사거리": "900"
            }
        },
        "E": {
            "p1": "?", // SlowPercent*100
            "p2": "?", // ScatterDamage
            "p3": "?", // StunDuration
            "p4": "?", // DetonationDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14",
            "cost": "90",
            "stats": {
                "사거리": "950"
            }
        },
        "R": {
            "p1": "?", // WallDuration
            "p2": "?", // DamageLockoutTime
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "180 / 150 / 120",
            "cost": "100",
            "stats": {
                "사거리": "2500 / 4500 / 6500"
            }
        },
    },
    "TahmKench": { // 탐 켄치
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // SlowDuration
            "p3": "?", // SlowAmount*100
            "p4": "?", // BaseHeal
            "p5": "?", // PercentHealthHealing*100
            "p6": "?", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7 / 6.5 / 6 / 5.5 / 5",
            "cost": "50 / 46 / 42 / 38 / 34",
            "stats": {
                "사거리": "900"
            }
        },
        "W": {
            "p1": "?", // TotalDamage
            "p2": "?", // KnockupDuration
            "p3": "?", // ChampRefund*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "21 / 20 / 19 / 18 / 17",
            "cost": "60 / 75 / 90 / 105 / 120",
            "stats": {
                "사거리": "1000 / 1050 / 1100 / 1150 / 1200"
            }
        },
        "E": {
            "p1": "?", // GreyHealthRatio*100
            "p2": "?", // EnhancedThreshold
            "p3": "?", // GreyHealthRatioEnhanced*100
            "p4": "?", // OOCTimer
            "p5": "?", // GreyHealthHealingRatio
            "p6": "?", // ShieldDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "3",
            "cost": "",
            "stats": {
                "사거리": "2400"
            }
        },
        "R": {
            "p1": "?", // EnemyDuration
            "p2": "?", // BaseDamage
            "p3": "?", // PercentHPDamage
            "p4": "?", // SlowAmount*100
            "p5": "?", // AllyDuration
            "p6": "?", // TotalShield
            "p7": "?", // AllySpeedAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0",
            "cost": "100",
            "stats": {
                "사거리": "25000"
            }
        },
    },
    "Trundle": { // 트런들
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // SlowAmount*100
            "p3": "?", // SapDebuffDuration
            "p4": "?", // BonusAD
            "p5": "?", // SappedAD*-1
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "3.5",
            "cost": "20",
            "stats": {
                "사거리": "300"
            }
        },
        "W": {
            "p1": "?", // Duration
            "p2": "?", // MSBonus*100
            "p3": "?", // ASBonus*100
            "p4": "?", // HealingBonus*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "18 / 17 / 16 / 15 / 14",
            "cost": "40",
            "stats": {
                "사거리": "750"
            }
        },
        "E": {
            "p1": "?", // PillarDuration
            "p2": "?", // SlowAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "21 / 19.5 / 18 / 16.5 / 15",
            "cost": "75",
            "stats": {
                "사거리": "1000"
            }
        },
        "R": {
            "p1": "?", // ActualDurationOfDrainBuff
            "p2": "?", // TotalPercentHPDamage
            "p3": "?", // ArmorMRShred*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": {
                "사거리": "650"
            }
        },
    },
    "Tristana": { // 트리스타나
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // BuffDuration
            "p2": "?", // AttackSpeedMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 19 / 18 / 17 / 16",
            "cost": "15 / 20 / 25 / 30 / 35",
            "stats": {
                "사거리": "20"
            }
        },
        "W": {
            "p1": "?", // LandingDamage
            "p2": "?", // SlowDuration
            "p3": "?", // SlowMod*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "22 / 20 / 18 / 16 / 14",
            "cost": "30 / 35 / 40 / 45 / 50",
            "stats": {
                "사거리": "900"
            }
        },
        "E": {
            "p1": "?", // PassiveDamage
            "p2": "?", // ActiveDuration
            "p3": "?", // ActiveDamage
            "p4": "?", // ActivePerStackAmp*100
            "p5": "?", // ActiveMaxStacks
            "p6": "?", // ActiveMaxDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 15.5 / 15 / 14.5 / 14",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "550"
            }
        },
        "R": {
            "p1": "?", // DamageCalc
            "p2": "?", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "100",
            "cost": "100",
            "stats": {
                "사거리": "550"
            }
        },
    },
    "Tryndamere": { // 트린다미어
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // MaximumBonusAD
            "p2": "?", // BaseHeal
            "p3": "?", // HealPerFury
            "p4": "?", // MaximumHeal
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12",
            "cost": "-",
            "stats": {
                "사거리": "400"
            }
        },
        "W": {
            "p1": "?", // ReductionDuration
            "p2": "?", // ADReduction*-1
            "p3": "?", // SlowDuration
            "p4": "?", // SlowPotency*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14",
            "cost": "-",
            "stats": {
                "사거리": "850"
            }
        },
        "E": {
            "p1": "?", // TotalDamage
            "p2": "?", // NonChampFuryGain
            "p3": "?", // ChampFuryGain
            "p4": "?", // NonChampCDRefund
            "p5": "?", // ChampCDRefund
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "-",
            "stats": {
                "사거리": "650"
            }
        },
        "R": {
            "p1": "?", // TryndRDuration
            "p2": "?", // TryndRMinHealth
            "p3": "?", // TryndRFuryGain
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "-",
            "stats": {
                "사거리": "400"
            }
        },
    },
    "TwistedFate": { // 트위스티드 페이트
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6 / 5.75 / 5.5 / 5.25 / 5",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "10000"
            }
        },
        "W": {
            "p1": "?", // BlueDamage
            "p2": "?", // Effect6Amount
            "p3": "?", // RedDamage
            "p4": "?", // Effect2Amount
            "p5": "?", // GoldDamage
            "p6": "?", // Effect3Amount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "200"
            }
        },
        "E": {
            "p1": "?", // AttackSpeedBonus
            "p2": "?", // BonusDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0",
            "cost": ""
        },
        "R": {
            "p1": "?", // Effect1Amount
            "p2": "?", // Effect4Amount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "170 / 140 / 110",
            "cost": "100",
            "stats": {
                "사거리": "5500"
            }
        },
    },
    "Twitch": { // 트위치
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // StealthDuration
            "p2": "?", // MoveSpeedMod
            "p3": "?", // HiddenSpeed
            "p4": "?", // AttackSpeedDuration
            "p5": "?", // AttackSpeedMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16",
            "cost": "40",
            "stats": {
                "사거리": "20"
            }
        },
        "W": {
            "p1": "?", // Duration
            "p2": "?", // TotalSlowAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "70",
            "stats": {
                "사거리": "950"
            }
        },
        "E": {
            "p1": "?", // BaseDamage
            "p2": "?", // PhysicalDamagePerStack
            "p3": "?", // MagicDamagePerStack
            "p4": "?", // MaxPhysicalDamage
            "p5": "?", // MaxMagicDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "1200"
            }
        },
        "R": {
            "p1": "?", // Duration
            "p2": "?", // BonusRange
            "p3": "?", // BonusAD
            "p4": "?", // FallOffDamage*100
            "p5": "?", // MinimumFallOffDamage*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "90",
            "cost": "100",
            "stats": {
                "사거리": "1200"
            }
        },
    },
    "Teemo": { // 티모
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // BlindDuration
            "p2": "?", // CalculatedDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "680"
            }
        },
        "W": {
            "p1": "?", // PassiveCooldownOnDamageTaken
            "p2": "?", // PassiveMoveSpeedBonus*100
            "p3": "?", // ActiveMoveSpeedBuffDuration
            "p4": "?", // ActiveMoveSpeedBonus*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14",
            "cost": "40",
            "stats": {
                "사거리": "20"
            }
        },
        "E": {
            "p1": "?", // ImpactCalculatedDamage
            "p2": "?", // PoisonDuration
            "p3": "?", // TotalDotDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0",
            "cost": "",
            "stats": {
                "사거리": "680"
            }
        },
        "R": {
            "p1": "?", // DebuffDuration
            "p2": "?", // SlowAmount
            "p3": "?", // TotalDamage
            "p4": "?", // MushroomDuration
            "p5": "?", // MaxAmmo
            "p6": "?", // AmmoRechargeTime
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0.25",
            "cost": "75 / 55 / 35",
            "stats": {
                "사거리": "600 / 750 / 900"
            }
        },
    },
    "Pyke": { // 파이크
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // SlowDuration
            "p3": "?", // SlowAmount*100
            "p4": "?", // ManaRefund*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "400"
            }
        },
        "W": {
            "p1": "?", // MoveSpeed
            "p2": "?", // CamoDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "65",
            "stats": {
                "사거리": "600"
            }
        },
        "E": {
            "p1": "?", // StunDuration
            "p2": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "40",
            "stats": {
                "사거리": "550"
            }
        },
        "R": {
            "p1": "?", // RDamage
            "p2": "?", // ReducedDamageFinal
            "p3": "?", // ReducedDamage*100
            "p4": "?", // RRecastDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "100 / 85 / 70",
            "cost": "100",
            "stats": {
                "사거리": "750"
            }
        },
    },
    "Pantheon": { // 판테온
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TapDamageCalc
            "p2": "?", // TapCooldownRefund*100
            "p3": "?", // HoldDamageCalc
            "p4": "?", // DamageFalloff*100
            "p5": "?", // CritHealthThreshold*100
            "p6": "?", // ExecuteDamageCalcModified
            "p7": "?", // EmpoweredDamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10.25 / 9.5 / 8.75 / 8",
            "cost": "25",
            "stats": {
                "사거리": "575"
            }
        },
        "W": {
            "p1": "?", // StunDuration
            "p2": "?", // MaxHealthDamageCalc
            "p3": "?", // EmpoweredNumHits
            "p4": "?", // EmpoweredDamageMultCalcModified
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "55",
            "stats": {
                "사거리": "600"
            }
        },
        "E": {
            "p1": "?", // ShieldDuration
            "p2": "?", // DamageCalc
            "p3": "?", // ShieldDamageCalc
            "p4": "?", // ResistsDuration
            "p5": "?", // ResistsCalc
            "p6": "?", // SpeedDuration
            "p7": "?", // SpeedAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "22 / 21 / 20 / 19 / 18",
            "cost": "80",
            "stats": {
                "사거리": "400"
            }
        },
        "R": {
            "p1": "?", // ArmorPenetration*100
            "p2": "?", // SpearSlowDuration
            "p3": "?", // SpearSlow*100
            "p4": "?", // DamageCalc
            "p5": "?", // EdgeDamageReduction*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "180 / 165 / 150",
            "cost": "100",
            "stats": {
                "사거리": "5500"
            }
        },
    },
    "FiddleSticks": { // 피들스틱
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // FearDuration
            "p2": "?", // TotalPercentHealthDamage
            "p3": "?", // TotalPercentHealthDamageFeared
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15 / 14.5 / 14 / 13.5 / 13",
            "cost": "65",
            "stats": {
                "사거리": "575"
            }
        },
        "W": {
            "p1": "?", // DrainDamageCalc
            "p2": "?", // PercentForTooltip
            "p3": "?", // VampPercentage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "650"
            }
        },
        "E": {
            "p1": "?", // Damage
            "p2": "?", // SilenceDuration
            "p3": "?", // SlowAmount*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "850"
            }
        },
        "R": {
            "p1": "?", // ChannelTime
            "p2": "?", // Duration
            "p3": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "140 / 110 / 80",
            "cost": "100",
            "stats": {
                "사거리": "800"
            }
        },
    },
    "Fiora": { // 피오라
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // CDRefundPercent*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 11.25 / 9.5 / 7.75 / 6",
            "cost": "20",
            "stats": {
                "사거리": "400"
            }
        },
        "W": {
            "p1": "?", // ParryDuration
            "p2": "?", // StabDamage
            "p3": "?", // CCDuration
            "p4": "?", // MSSlowPercent*-100
            "p5": "?", // AttackSlowPercent*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "24 / 22 / 20 / 18 / 16",
            "cost": "50",
            "stats": {
                "사거리": "750"
            }
        },
        "E": {
            "p1": "?", // ASPercent*100
            "p2": "?", // SlowDuration
            "p3": "?", // SlowPercent*-100
            "p4": "?", // AttackTwopercentTAD*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "40",
            "stats": {
                "사거리": "425"
            }
        },
        "R": {
            "p1": "?", // PercentMS*100
            "p2": "?", // MarkDuration
            "p3": "?", // HealDuration
            "p4": "?", // HealPerSecondCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "110 / 90 / 70",
            "cost": "100",
            "stats": {
                "사거리": "500"
            }
        },
    },
    "Fizz": { // 피즈
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // TotalDamage
            "p2": "?", // QDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "50",
            "stats": {
                "사거리": "550"
            }
        },
        "W": {
            "p1": "?", // BleedDuration
            "p2": "?", // DoTDamage
            "p3": "?", // ActiveDamage
            "p4": "?", // OnKillManaRefund
            "p5": "?", // OnKillNewCooldown
            "p6": "?", // OnHitBuffDuration
            "p7": "?", // OnHitBuffDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7 / 6 / 5 / 4 / 3",
            "cost": "30 / 40 / 50 / 60 / 70",
            "stats": {
                "사거리": "600"
            }
        },
        "E": {
            "p1": "?", // EDamage
            "p2": "?", // SlowDuration
            "p3": "?", // SlowAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 14 / 12 / 10 / 8",
            "cost": "75 / 80 / 85 / 90 / 95",
            "stats": {
                "사거리": "400"
            }
        },
        "R": {
            "p1": "?", // DetonationTime
            "p2": "?", // SmallSharkDamage
            "p3": "?", // BigSharkDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": {
                "사거리": "1300"
            }
        },
    },
    "Heimerdinger": { // 하이머딩거
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // MaxTurrets
            "p2": "?", // MaxKits
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "1",
            "cost": "20",
            "stats": {
                "사거리": "350"
            }
        },
        "W": {
            "p1": "?", // Rockets
            "p2": "?", // Damage
            "p3": "?", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "1325"
            }
        },
        "E": {
            "p1": "?", // Damage
            "p2": "?", // SlowDuration
            "p3": "?", // SlowPercent.0*100
            "p4": "?", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11",
            "cost": "85",
            "stats": {
                "사거리": "970"
            }
        },
        "R": {
            "p1": "?", // QUltDamage
            "p2": "?", // QUltDamageBeam
            "p3": "?", // WUltDamage
            "p4": "?", // WUltTotalDamage
            "p5": "?", // EUltDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "100 / 85 / 70",
            "cost": "100",
            "stats": {
                "사거리": "1"
            }
        },
    },
    "Hecarim": { // 헤카림
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // Damage
            "p2": "?", // BuffDuration
            "p3": "?", // RampageBonusDamagePerc
            "p4": "?", // RampageCooldownReduction
            "p5": "?", // MaxStacks
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "4",
            "cost": "28 / 26 / 24 / 22 / 20",
            "stats": {
                "사거리": "350"
            }
        },
        "W": {
            "p1": "?", // BuffDuration
            "p2": "?", // TotalDamage
            "p3": "?", // ResistAmount
            "p4": "?", // LeechAmount
            "p5": "?", // AllyTooltipLeachValue
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "525"
            }
        },
        "E": {
            "p1": "?", // MinMoveSpeed*100
            "p2": "?", // Duration
            "p3": "?", // MaxMoveSpeed*100
            "p4": "?", // MinDamage
            "p5": "?", // MaxDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 19 / 18 / 17 / 16",
            "cost": "60",
            "stats": {
                "사거리": "300"
            }
        },
        "R": {
            "p1": "?", // DamageDone
            "p2": "?", // FearDurationMin
            "p3": "?", // FearDurationMax
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "140 / 120 / 100",
            "cost": "100",
            "stats": {
                "사거리": "50000"
            }
        },
    },
    "Hwei": { // 흐웨이
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "?", // Tooltip_QQDamage
            "p2": "?", // Tooltip_QQBonusDamage
            "p3": "?", // Tooltip_QWDamage
            "p4": "?", // Tooltip_QWBonusDamage
            "p5": "?", // Tooltip_QEDamage
            "p6": "?", // Tooltip_QEDamagePerSecond
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "80 / 90 / 100 / 110 / 120"
        },
        "W": {
            "p1": "?", // Tooltip_WQMoveSpeed
            "p2": "?", // Tooltip_WWShieldAmount
            "p3": "?", // Tooltip_WEOnHitDamage
            "p4": "?", // Tooltip_WEOnHitManaRestore
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "18 / 17.5 / 17 / 16.5 / 16",
            "cost": "90 / 95 / 100 / 105 / 110"
        },
        "E": {
            "p1": "?", // Tooltip_EQDamage
            "p2": "?", // Tooltip_EQFleeDuration
            "p3": "?", // Tooltip_EWRootDuration
            "p4": "?", // Tooltip_EWDamage
            "p5": "?", // Tooltip_EEDamage
            "p6": "?", // Tooltip_EESlowAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "50 / 55 / 60 / 65 / 70"
        },
        "R": {
            "p1": "?", // Duration
            "p2": "?", // SlowPercentPerStack
            "p3": "?", // DamageOverTime
            "p4": "?", // Damage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": {
                "사거리": "1300"
            }
        },
    },
};
