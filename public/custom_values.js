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
            "p1": "1", // GameModeInteger
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "4.5",
            "cost": "50 / 45 / 40 / 35 / 30",
            "stats": {
                "사거리": "625"
            }
        },
        "W": {
            "p1": "45 / 70 / 95 / 120 / 145 (+ 주문력의 90%)", // BaseHealth
            "p2": "13", // PercentHeal
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "22 / 20 / 18 / 16 / 14",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "400"
            }
        },
        "E": {
            "p1": "25", // BarrelDuration
            "p2": "2", // DebuffDuration
            "p3": "40 / 50 / 60 / 70 / 80", // FinalSlowAmount
            "p4": "40", // BarrelArmorPenetration
            "p5": "75 / 95 / 115 / 135 / 155", // BonusDamageToChampions
            "p6": "2 ~ 0.5 (레벨에 따라)", // BarrelDecayTime
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0",
            "cost": "-",
            "stats": {
                "사거리": "1000"
            }
        },
        "R": {
            "p1": "8", // ZoneDuration
            "p2": "12", // TotalWavesTooltip
            "p3": "0.5", // SlowDuration
            "p4": "30", // SlowPercent
            "p5": "40 / 70 / 100 (+ 주문력의 10%)", // OneWaveDamage
            "p6": "40 / 70 / 100 (+ 주문력의 10%) x 12", // TotalDamageTooltip
            "p7": "120 / 210 / 300 (+ 주문력의 30%)", // DeathsDaughterDamage
            "p8": "1", // DeathsDaughterSlowDuration
            "p9": "75", // DeathsDaughterSlow
            "p10": "2", // RaiseMoraleHasteDuration
            "p11": "40", // RaiseMoraleHaste
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
            "p1": "4", // BarrelMaxDuration
            "p2": "80 / 120 / 160 / 200 / 240 (+ 주문력의 80%)", // MinDamage
            "p3": "80 / 120 / 160 / 200 / 240 (+ 주문력의 80%) x 1.5", // MaxDamage
            "p4": "2", // SlowDuration
            "p5": "40 / 45 / 50 / 55 / 60", // SlowPercent
            "p6": "60 / 67.5 / 75 / 82.5 / 90", // SlowPercent*1.5
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "80",
            "stats": {
                "사거리": "850"
            }
        },
        "W": {
            "p1": "2.5", // DefenseDuration
            "p2": "10 / 14 / 18 / 22 / 26% (+ 주문력의 4%)", // DamageReduction
            "p3": "20 / 50 / 80 / 110 / 140 (+ 주문력의 70%)", // TotalDamage
            "p4": "7", // MaxHPPercentDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "5",
            "cost": "30",
            "stats": {
                "사거리": "20"
            }
        },
        "E": {
            "p1": "1", // StunDuration
            "p2": "80 / 125 / 170 / 215 / 260 (+ 주문력의 60%)", // TotalDamage
            "p3": "40%", // CooldownRefund*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13.5 / 13 / 12.5 / 12",
            "cost": "50",
            "stats": {
                "사거리": "600"
            }
        },
        "R": {
            "p1": "200 / 300 / 400 (+ 주문력의 80%)", // DamageDone
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
            "p1": "50 / 75 / 100 / 125 / 150 (+ 총 공격력의 65%)", // TotalDamage
            "p2": "80 / 125 / 170 / 215 / 260 (+ 총 공격력의 55 / 70 / 85 / 100 / 115%)", // TotalDetonationDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 11.25 / 9.5 / 7.75 / 6",
            "cost": "80",
            "stats": {
                "사거리": "925"
            }
        },
        "W": {
            "p1": "50", // Effect2Amount
            "p2": "60 / 110 / 160 / 210 / 260 (+ 주문력의 60%)", // ImpactDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "26 / 24 / 22 / 20 / 18",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "950"
            }
        },
        "E": {
            "p1": "4", // BuffDuration
            "p2": "8", // MaxStacks
            "p3": "7 / 10 / 13 / 16 / 19", // ArmorPerStack
            "p4": "3.5 / 5 / 6.5 / 8 / 9.5", // MRGrant
            "p5": "0.5", // CooldownPerHit
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "40",
            "stats": {
                "사거리": "425"
            }
        },
        "R": {
            "p1": "275 / 425 / 575 (+ 총 공격력의 150%)", // Damage
            "p2": "200 / 320 / 440 (+ 총 공격력의 120%)", // FalloffDamage
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
            "p1": "6", // BuffDuration
            "p2": "10 / 14 / 18 / 22 / 26 (+ 주문력의 5%)", // MiniSwipeDamage
            "p3": "60 / 85 / 110 / 135 / 160 (+ 주문력의 35%)", // FinalSwipeDamage
            "p4": "50%", // TrueDamageConversion*100
            "p5": "80%", // MinionMod*100
            "p6": "20%", // ExecuteThreshold*100
            "p7": "1000", // ExecuteBonus
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6.5 / 5.75 / 5 / 4.25 / 3.5",
            "cost": "40",
            "stats": {
                "사거리": "450"
            }
        },
        "W": {
            "p1": "4", // ZoneDuration
            "p2": "22 / 24 / 26 / 28 / 30 (+ 주문력의 7%)", // TotalResists
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "22 / 21 / 20 / 19 / 18",
            "cost": "60"
        },
        "E": {
            "p1": "4", // BuffDuration
            "p2": "30 / 42.5 / 55 / 67.5 / 80%", // BonusAttackSpeed
            "p3": "15 (+ 주문력의 20%)", // OnHitDamage
            "p4": "75", // BonusAttackRange
            "p5": "25 / 35 / 45 / 55 / 65%", // CDRefund*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 12.5 / 12 / 11.5 / 11",
            "cost": "35",
            "stats": {
                "사거리": "400"
            }
        },
        "R": {
            "p1": "30 / 50 / 70 (+ 주문력의 10%)", // TotalDamage
            "p2": "1.5", // DebuffDuration
            "p3": "40 / 50 / 60%", // InitialSlow*-100
            "p4": "1", // LockoutTime
            "p5": "30 / 50 / 70 (+ 주문력의 10%) x 3", // TotalDamage3
            "p6": "30 / 50 / 70 (+ 주문력의 10%) x 5", // TotalDamage5
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
            "p1": "200 / 300 / 400 (+ 주문력의 100% + 총 공격력의 50%)", // Damage
            "p2": "1.25 / 1.5 / 1.75", // RCCDuration
            "p3": "45", // RSlowPercent
            "p4": "200 / 300 / 400 (+ 주문력의 100% + 총 공격력의 50%) x 150 x 0.01", // WallDamage
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
            "p1": "1.5", // StunDuration
            "p2": "90 / 145 / 200 / 255 / 310 (+ 주문력의 50%)", // TotalDamageTT
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "60",
            "stats": {
                "사거리": "875"
            }
        },
        "W": {
            "p1": "3", // MaxTargets
            "p2": "55 / 80 / 105 / 130 / 155 (+ 주문력의 40%)", // TotalHeal
            "p3": "60 / 95 / 130 / 165 / 200 (+ 주문력의 50%)", // TotalDamage
            "p4": "-20% (+ 주문력의 15%)", // BounceScaling
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "725"
            }
        },
        "E": {
            "p1": "6", // BuffDuration
            "p2": "3", // HitCount
            "p3": "1", // SlowDuration
            "p4": "15 / 20 / 25 / 30 / 35% (+ 주문력의 5%)", // TotalSlow
            "p5": "20 / 35 / 50 / 65 / 80 (+ 주문력의 20%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11",
            "cost": "55 / 60 / 65 / 70 / 75",
            "stats": {
                "사거리": "800"
            }
        },
        "R": {
            "p1": "70", // SlowAmount
            "p2": "150 / 250 / 350 (+ 주문력의 60%)", // TotalDamage
            "p3": "4", // MaxSlowDuration
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
            "p1": "40 / 60 / 80 / 100 / 120 (+ 총 공격력의 100% + 1 (중첩당))", // TotalDamage
            "p2": "3", // BasicStacks
            "p3": "12", // BigStacks
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7.5 / 6.5 / 5.5 / 4.5 / 3.5",
            "cost": "20",
            "stats": {
                "사거리": "255"
            }
        },
        "W": {
            "p1": "35", // SlowBase
            "p2": "5", // Duration
            "p3": "47 / 59 / 71 / 83 / 95", // MaxSlowTooltipOnly
            "p4": "75%", // AttackSpeedSlowMult*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "80",
            "stats": {
                "사거리": "700"
            }
        },
        "E": {
            "p1": "50 / 80 / 110 / 140 / 170 (+ 주문력의 60%)", // InitialDamage
            "p2": "30 / 35 / 40 / 45 / 50%", // ArmorShredPercent*-100
            "p3": "5", // Duration
            "p4": "50 / 80 / 110 / 140 / 170 (+ 주문력의 12%)", // TotalDotDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "650"
            }
        },
        "R": {
            "p1": "300 / 450 / 600", // BonusHealth
            "p2": "40 / 55 / 70", // InitialResistGain
            "p3": "?% (+ 주문력의 0.01%)", // DamageCalc
            "p4": "50%", // QCDR*100
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
            "p1": "1", // UntargetableDuration
            "p2": "2", // PackmatesToAdd
            "p3": "5", // Duration
            "p4": "총 공격력의 20%", // BonusAD
            "p5": "20 / 22.5 / 25 / 27.5 / 30%", // MoveSpeedAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "26 / 24 / 22 / 20 / 18",
            "cost": "60",
            "stats": {
                "사거리": "400"
            }
        },
        "E": {
            "p1": "15 / 25 / 35 / 45 / 55 (+ 총 공격력의 40%)", // TotalDamageFirstSlash
            "p2": "60 / 85 / 110 / 135 / 160 (+ 총 공격력의 80%)", // TotalDamageSecondSlash
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "40",
            "stats": {
                "사거리": "450"
            }
        },
        "R": {
            "p1": "125 / 200 / 275 (+ 총 공격력의 100%)", // TotalDamage
            "p2": "125 / 200 / 275 (+ 총 공격력의 100%) x 0.1", // PackmateDamage
            "p3": "7", // TakedownWindow
            "p4": "3", // ShieldDuration
            "p5": "100 / 150 / 200 (+ 총 공격력의 150%)", // ShieldTotal
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
            "p1": "85 / 130 / 175 / 220 / 265 (+ 주문력의 90%)", // QDamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "60",
            "stats": {
                "사거리": "1150"
            }
        },
        "W": {
            "p1": "6", // ShieldDuration
            "p2": "50 / 60 / 70 / 80 / 90 (+ 최대 체력의 8 / 9 / 10 / 11 / 12%)", // ShieldCalc
            "p3": "30 / 40 / 50 / 60 / 70 (+ 주문력의 40%)", // DotDamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12",
            "cost": "60",
            "stats": {
                "사거리": "350"
            }
        },
        "E": {
            "p1": "55 / 90 / 125 / 160 / 195 (+ 주문력의 50%)", // DamageCalc
            "p2": "1.25", // SlowDuration
            "p3": "30 / 35 / 40 / 45 / 50%", // SlowPercent*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7 / 6.5 / 6 / 5.5 / 5",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "600"
            }
        },
        "R": {
            "p1": "150 / 275 / 400 (+ 주문력의 80%)", // PrimaryTargetDamage
            "p2": "1 / 1.5 / 2", // StunDuration
            "p3": "125 / 175 / 225 (+ 주문력의 40%)", // SecondaryTargetDamage
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
            "p1": "65 / 105 / 145 / 185 / 225 (+ 총 공격력의 85%)", // TotalDamage
            "p2": "5", // TrailDuration
            "p3": "20 / 25 / 30 / 35 / 40", // MoveSpeed
            "p4": "15 / 25 / 35 / 45 / 55", // BonusTrailAD
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "1125"
            }
        },
        "W": {
            "p1": "30 / 35 / 40 / 45 / 50", // ActiveAS
            "p2": "5", // DoubleASDuration
            "p3": "60 / 70 / 80 / 90 / 100", // ActiveAS*2
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "50",
            "stats": {
                "사거리": "20"
            }
        },
        "E": {
            "p1": "90%", // TooltipFearMS*100
            "p2": "2", // LeashDuration
            "p3": "80 / 125 / 170 / 215 / 260 (+ 주문력의 100%)", // TotalDamage
            "p4": "1.25 / 1.5 / 1.75 / 2 / 2.25", // CCDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "425"
            }
        },
        "R": {
            "p1": "6", // ParanoiaDuration
            "p2": "150 / 275 / 400 (+ 총 공격력의 120%)", // Damage
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
            "p1": "400 / 600 / 800 / 1000 / 1200", // MonsterMinionDamage
            "p2": "65 / 95 / 125 / 155 / 185 (+ 최대 체력의 10% + 주문력의 90%)", // MonsterHealing
            "p3": "60 / 100 / 140 / 180 / 220 (+ 최대 체력의 5% + 주문력의 65%)", // TotalChampionDamage
            "p4": "65 / 95 / 125 / 155 / 185 (+ 최대 체력의 10% + 주문력의 90%) x 0.6", // ChampionHealing
            "p5": "50%", // LowHealthThreshhold*100
            "p6": "50%", // LowHealthHealingScalar*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "60",
            "stats": {
                "사거리": "125"
            }
        },
        "W": {
            "p1": "180 / 225 / 270 / 315 / 360 (+ 주문력의 150%) x 0.333", // NoImpactSnowballDamage
            "p2": "180 / 225 / 270 / 315 / 360 (+ 주문력의 150%)", // MaximumSnowballDamage
            "p3": "0.5", // BaseKnockupDuration
            "p4": "0.5 (+ 0.75)", // MaximumStunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "7500"
            }
        },
        "E": {
            "p1": "15 / 22.5 / 30 / 37.5 / 45 (+ 주문력의 12%)", // TotalSnowballDamage
            "p2": "1", // SlowDuration
            "p3": "30 / 35 / 40 / 45 / 50%", // SlowAmount*-100
            "p4": "3", // TotalSpellDuration
            "p5": "0.5 ~ 1.5 (레벨에 따라)", // RootDuration
            "p6": "20 / 30 / 40 / 50 / 60 (+ 주문력의 80%)", // TotalRootDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "625"
            }
        },
        "R": {
            "p1": "3", // ChannelDuration
            "p2": "50%", // SlowStartAmount*-100
            "p3": "95%", // MaxSlowAmount*-100
            "p4": "65 / 75 / 85 (+ 최대 체력의 30 / 40 / 50% + 주문력의 150%)", // TotalShieldAmount
            "p5": "3", // ShieldDecayDuration
            "p6": "625 / 925 / 1275 (+ 주문력의 300%)", // MaximumDamage
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
            "p1": "70 / 90 / 110 / 130 / 150 (+ 주문력의 50%)", // HumanMinimumDamage
            "p2": "70 / 90 / 110 / 130 / 150 (+ 주문력의 50%) x 3.25", // HumanMaximumDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "1500"
            }
        },
        "W": {
            "p1": "4", // Effect3Amount
            "p2": "10 / 20 / 30 / 40 / 50 (+ 주문력의 5%)", // DamagePerSecond
            "p3": "4 ~ 10 (레벨에 따라) (+ (?))", // MaxTraps
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "30 / 35 / 40 / 45 / 50",
            "stats": {
                "사거리": "900"
            }
        },
        "E": {
            "p1": "50 / 75 / 100 / 125 / 150 (+ 주문력의 35%)", // TotalHealing
            "p2": "50 / 75 / 100 / 125 / 150 (+ 주문력의 35%) x 2", // MaxHealing
            "p3": "7", // ASDuration
            "p4": "30 / 40 / 50 / 60 / 70%", // BonusAS*100
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
            "p1": "60 / 110 / 160 / 210 / 260 (+ 주문력의 60%)", // ExplosionDamage
            "p2": "35 / 60 / 85 / 110 / 135 (+ 주문력의 25%)", // SecondDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8.5 / 8 / 7.5 / 7",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "800"
            }
        },
        "W": {
            "p1": "30 / 65 / 100 / 135 / 170 (+ 주문력의 60%)", // PassiveBonusDamageCalc
            "p2": "1", // PassiveHasteDuration
            "p3": "10 / 17.5 / 25 / 32.5 / 40", // PassiveHaste
            "p4": "0.5", // StealthDuration
            "p5": "3", // CloneDuration
            "p6": "3", // HasteDuration
            "p7": "20 / 25 / 30 / 35 / 40", // Haste
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "-",
            "stats": {
                "사거리": "900"
            }
        },
        "E": {
            "p1": "70 / 105 / 140 / 175 / 210 (+ 주문력의 65%)", // BaseDamage
            "p2": "0.7 / 0.9 / 1.1 / 1.3 / 1.5", // MinRootDuration
            "p3": "1.8 / 2.1 / 2.4 / 2.7 / 3", // MaxRootDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "1000"
            }
        },
        "R": {
            "p1": "0.6", // DelayUntilExplosion
            "p2": "150 / 350 / 550 (+ 주문력의 120%)", // TotalDamage
            "p3": "0.75", // StunDuration
            "p4": "0.5", // DelayBeforePassiveRemoval
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
            "p1": "마법 저항력의 30%%", // CritArmorPen
            "p2": "마법 저항력의 20%%", // CritLifesteal
            "p3": "4", // ShieldDuration
            "p4": "0 / 10 / 20 / 30 / 40 (+ 총 공격력의 100%)", // DamageCalc
            "p5": "10 ~ 60 (레벨에 따라)", // BonusAttackSpeedCalc
            "p6": "4", // BuffDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "4",
            "cost": "30",
            "stats": {
                "사거리": "600"
            }
        },
        "W": {
            "p1": "2.25", // BaseDuration
            "p2": "15 / 17.5 / 20 / 22.5 / 25%", // MoveSpeedPercent*100
            "p3": "25%", // MagicDamageReduction*100
            "p4": "1.5", // ShareBaseDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "26 / 25 / 24 / 23 / 22",
            "cost": "60 / 45 / 30 / 15 / 0",
            "stats": {
                "사거리": "150"
            }
        },
        "E": {
            "p1": "60 / 70 / 80 / 90 / 100 (+ 총 공격력의 20%)", // DashDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0.5",
            "cost": "40",
            "stats": {
                "사거리": "550"
            }
        },
        "R": {
            "p1": "15 / 25 / 35 (+ 총 공격력의 10%) x 4", // DamagePerTickCalcTooltip
            "p2": "125 / 225 / 325 (+ 총 공격력의 100%)", // DamageCalc
            "p3": "20% (+ 마법 저항력의 10%)", // ChampHealingPercent
            "p4": "6", // Duration
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
            "p1": "50 / 80 / 110 / 140 / 170 (+ 총 공격력의 100 / 110 / 120 / 130 / 140 x 0.01%)", // BladeDamage
            "p2": "50 / 80 / 110 / 140 / 170 (+ 총 공격력의 100 / 110 / 120 / 130 / 140 x 0.01%) x 0.35", // HandleDamage
            "p3": "17", // MissingHealthHeal
            "p4": "51", // MissingHealPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "25 / 30 / 35 / 40 / 45",
            "stats": {
                "사거리": "1"
            }
        },
        "W": {
            "p1": "총 공격력의 140 / 145 / 150 / 155 / 160%", // EmpoweredAttackDamage
            "p2": "1", // SlowDuration
            "p3": "90", // SlowPercent
            "p4": "50", // PercentCDRefund
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "5",
            "cost": "40",
            "stats": {
                "사거리": "300"
            }
        },
        "E": {
            "p1": "20 / 25 / 30 / 35 / 40", // PassivePercentArmorPen
            "p2": "1", // SlowDuration
            "p3": "40", // SlowPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "26 / 23.5 / 21 / 18.5 / 16",
            "cost": "70 / 60 / 50 / 40 / 30",
            "stats": {
                "사거리": "535"
            }
        },
        "R": {
            "p1": "125 / 250 / 375 (+ 총 공격력의 75%)", // Damage
            "p2": "20%", // RDamagePercentPerHemoStack*100
            "p3": "125 / 250 / 375 (+ 총 공격력의 75%) x 2", // MaximumDamage
            "p4": "20", // RRecastDuration
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
            "p1": "70 / 105 / 140 / 175 / 210 (+ 주문력의 70%)", // TotalDamage
            "p2": "3", // MoonlightDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "50",
            "stats": {
                "사거리": "900"
            }
        },
        "W": {
            "p1": "5", // ShieldDuration
            "p2": "20 / 32 / 44 / 56 / 68 (+ 주문력의 18%)", // TotalDamage
            "p3": "20 / 32 / 44 / 56 / 68 (+ 주문력의 18%) x 3", // TotalMaxDamage
            "p4": "45 / 60 / 75 / 90 / 105 (+ 주문력의 30% + 최대 체력의 11%)", // ShieldValue
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15 / 13.5 / 12 / 10.5 / 9",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "800"
            }
        },
        "E": {
            "p1": "50 / 70 / 90 / 110 / 130 (+ 주문력의 60%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "22 / 20 / 18 / 16 / 14",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "825"
            }
        },
        "R": {
            "p1": "2", // SlowDuration
            "p2": "40 / 50 / 60", // SlowTooltip
            "p3": "200 / 300 / 400 (+ 주문력의 60%)", // RExplosionDamage
            "p4": "?", // RMultihitAmplification
            "p5": "? (+ 주문력의 15%) x 5", // MaxDamage
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
            "p1": "40 / 45 / 50 / 55 / 60 (+ 총 공격력의 75 / 85 / 95 / 105 / 115%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "45",
            "stats": {
                "사거리": "300"
            }
        },
        "W": {
            "p1": "50 / 55 / 60 / 65 / 70", // Temp_MSMod
            "p2": "1.5", // Temp_MSDuration
            "p3": "3", // Temp_ASDuration
            "p4": "20 / 25 / 30 / 35 / 40", // Temp_AS
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12",
            "cost": "40 / 35 / 30 / 25 / 20",
            "stats": {
                "사거리": "1000"
            }
        },
        "E": {
            "p1": "75 / 110 / 145 / 180 / 215 (+ 총 공격력의 50%)", // TotalDamage
            "p2": "2", // SlowDuration
            "p3": "20 / 25 / 30 / 35 / 40", // SlowAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "70",
            "stats": {
                "사거리": "1050"
            }
        },
        "R": {
            "p1": "200 / 300 / 400 (+ 총 공격력의 110 / 130 / 150%)", // RCalculatedDamage
            "p2": "5%", // RDamageReductionPerHit*100
            "p3": "50", // RMinDamagePercent
            "p4": "1 (중첩당)", // RPassiveTrueDamage
            "p5": "100%", // RPassiveStacksCoefficient*100
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
            "p1": "4", // RuneDuration
            "p2": "2", // MaximumRunes
            "p3": "75 / 95 / 115 / 135 / 155 (+ 주문력의 55% + 최대 마나의 2%)", // QDamageCalc
            "p4": "2", // MovementSpeedDuration
            "p5": "28 / 32 / 36 / 40 / 44", // MovementSpeedAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "5",
            "cost": "40 / 38 / 36 / 34 / 32",
            "stats": {
                "사거리": "1000"
            }
        },
        "W": {
            "p1": "60 / 90 / 120 / 150 / 180 (+ 주문력의 60% + 최대 마나의 3%)", // WDamageCalc
            "p2": "1.5", // CCDuration
            "p3": "50%", // SlowAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10.5 / 10 / 9.5 / 9",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "615"
            }
        },
        "E": {
            "p1": "60 / 90 / 120 / 150 / 180 (+ 주문력의 50% + 최대 마나의 2%)", // EDamageCalc
            "p2": "4", // DebuffDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "3.5 / 3.25 / 3 / 2.75 / 2.5",
            "cost": "35 / 45 / 55 / 65 / 75",
            "stats": {
                "사거리": "615"
            }
        },
        "R": {
            "p1": "50 / 75 / 100", // OverloadDamageBonus
            "p2": "2", // ChargeTimeTooltip
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
            "p1": "70 / 115 / 160 / 205 / 250 (+ 주문력의 70%)", // TotalDamage
            "p2": "3", // HealDelay
            "p3": "40 ~ 210 (레벨에 따라) (+ 주문력의 55%)", // TotalHeal
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "45",
            "stats": {
                "사거리": "850"
            }
        },
        "W": {
            "p1": "1", // KnockupDuration
            "p2": "70 / 120 / 170 / 220 / 270 (+ 주문력의 80%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "600"
            }
        },
        "E": {
            "p1": "3", // Duration
            "p2": "50 / 75 / 100 / 125 / 150 (+ 주문력의 70%)", // TotalShield
            "p3": "5", // RecastWindow
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "650"
            }
        },
        "R": {
            "p1": "4", // Duration
            "p2": "75", // InitialCastSpeed
            "p3": "100 / 200 / 300 (+ 주문력의 50%)", // TotalDamageTooltip
            "p4": "1 / 1.25 / 1.5", // CharmDuration
            "p5": "150", // TouchSpeed
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
            "p1": "25 ~ 39.1% (레벨에 따라)", // MinimumMoveSpeed
            "p2": "6", // RollDuration
            "p3": "25 ~ 39.1% (레벨에 따라) x 6", // MaximumMoveSpeed
            "p4": "80 / 120 / 160 / 200 / 240 (+ 주문력의 100%)", // PowerBallDamage
            "p5": "1", // SlowDuration
            "p6": "40 / 50 / 60 / 70 / 80", // SlowPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 10.5 / 9 / 7.5 / 6",
            "cost": "60",
            "stats": {
                "사거리": "300"
            }
        },
        "W": {
            "p1": "7", // BuffDuration
            "p2": "27 / 32 / 37 / 42 / 47 x 1 + 0.3 / 0.375 / 0.45 / 0.525 / 0.6 (+ 방어력의 30 / 37.5 / 45 / 52.5 / 60%)", // BonusArmorTooltip
            "p3": "20 / 25 / 30 / 35 / 40 x 1 + 0.3 / 0.375 / 0.45 / 0.525 / 0.6 (+ 치명타 확률의 30 / 37.5 / 45 / 52.5 / 60%)", // BonusMRTooltip
            "p4": "15 (+ 방어력의 10% + 치명타 확률의 10%)", // ReturnDamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7",
            "cost": "40",
            "stats": {
                "사거리": "300"
            }
        },
        "E": {
            "p1": "1.2 / 1.4 / 1.6 / 1.8 / 2", // Duration
            "p2": "80 / 100 / 120 / 140 / 160 (+ 주문력의 70%)", // MonsterDamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12",
            "cost": "50",
            "stats": {
                "사거리": "325"
            }
        },
        "R": {
            "p1": "150 / 250 / 350 (+ 주문력의 60%)", // InitialDamageCalc
            "p2": "1.5", // SlowDuration
            "p3": "30 / 40 / 50%", // SlowAmount*100
            "p4": "0.75", // KnockupDuration
            "p5": "3.5", // BuffDuration
            "p6": "3", // NumberOfPulses
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
            "p1": "2", // RootDuration
            "p2": "80 / 120 / 160 / 200 / 240 (+ 주문력의 75%)", // TotalDamageTT
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10",
            "cost": "50",
            "stats": {
                "사거리": "1175"
            }
        },
        "W": {
            "p1": "2.5", // ShieldDuration
            "p2": "40 / 55 / 70 / 85 / 100 (+ 주문력의 40%)", // TotalShieldTT
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "1150"
            }
        },
        "E": {
            "p1": "25 / 30 / 35 / 40 / 45", // SlowPercent
            "p2": "5", // SlowZoneDuration
            "p3": "65 / 115 / 165 / 215 / 265 (+ 주문력의 80%)", // TotalDamageTT
            "p4": "1", // SlowLingerDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": {
                "사거리": "1100"
            }
        },
        "R": {
            "p1": "300 / 400 / 500 (+ 주문력의 120%)", // TotalDamage
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
            "p1": "3", // FlamespitterDuration
            "p2": "50 / 75 / 100 / 125 / 150 (+ 주문력의 105%)", // FlatDamage
            "p3": "6 / 6.5 / 7 / 7.5 / 8%", // HealthDamage*100
            "p4": "70%", // MinionMod*100
            "p5": "50 / 75 / 100 / 125 / 150 (+ 주문력의 105%) x 1.5", // EmpoweredDamage
            "p6": "9 / 9.75 / 10.5 / 11.25 / 12%", // EmpoweredHealth
            "p7": "65 ~ 300 (레벨에 따라)", // MonsterCap
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
            "p2": "25 / 55 / 85 / 115 / 145 (+ 주문력의 30% + 최대 체력의 4%)", // TotalShield
            "p3": "1", // MoveSpeedDuration
            "p4": "10 / 15 / 20 / 25 / 30%", // MoveSpeed*100
            "p5": "25 / 55 / 85 / 115 / 145 (+ 주문력의 30% + 최대 체력의 4%) x 1.5", // EmpoweredShield
            "p6": "15 / 22.5 / 30 / 37.5 / 45%", // EmpoweredMS
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6",
            "cost": "",
            "stats": {
                "사거리": "20"
            }
        },
        "E": {
            "p1": "55 / 80 / 105 / 130 / 155 (+ 주문력의 50%)", // TotalDamage
            "p2": "2", // SlowDuration
            "p3": "15 / 20 / 25 / 30 / 35", // BaseSlowAmount
            "p4": "4", // ShredDuration
            "p5": "10 / 12 / 14 / 16 / 18%", // PercMagicPen*100
            "p6": "30 / 40 / 50 / 60 / 70", // EmpoweredSlowAmount
            "p7": "20 / 24 / 28 / 32 / 36%", // EnhancedMagicPen*100
            "p8": "55 / 80 / 105 / 130 / 155 (+ 주문력의 50%) x 1.5", // EmpDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0.5",
            "cost": "",
            "stats": {
                "사거리": "850"
            }
        },
        "R": {
            "p1": "4.5", // TrailDuration
            "p2": "35", // SlowAmount
            "p3": "120 / 200 / 280 (+ 주문력의 35%)", // DamagePerSecond
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
            "p1": "1", // RootDuration
            "p2": "80 / 125 / 170 / 215 / 260 (+ 주문력의 80%)", // TotalDamage
            "p3": "0.5", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16",
            "cost": "80",
            "stats": {
                "사거리": "900"
            }
        },
        "W": {
            "p1": "10 / 15 / 20 / 25 / 30% (+ 주문력의 1%)", // ASCalc
            "p2": "10 / 12.5 / 15 / 17.5 / 20% (+ 주문력의 1%)", // MSCalc
            "p3": "5", // Duration
            "p4": "20 / 30 / 40 / 50 / 60% (+ 주문력의 1%)", // FinalASCalc
            "p5": "20 / 25 / 30 / 35 / 40% (+ 주문력의 1%)", // FinalMSCalc
            "p6": "20", // TriumphPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "28 / 27 / 26 / 25 / 24",
            "cost": "80",
            "stats": {
                "사거리": "800"
            }
        },
        "E": {
            "p1": "65 / 95 / 125 / 155 / 185 (+ 주문력의 55%)", // TotalDamage
            "p2": "2", // SlowDuration
            "p3": "3", // ShieldDuration
            "p4": "50 / 65 / 80 / 95 / 110 (+ 주문력의 50%)", // ShieldCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": {
                "사거리": "800"
            }
        },
        "R": {
            "p1": "1.25 / 1.75 / 2.25", // BerserkDuration
            "p2": "100%", // BonusAttackSpeed*100
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
            "p1": "60 / 90 / 120 / 150 / 180 (+ 총 공격력의 100%)", // BasicDamage
            "p2": "2 / 3 / 4 / 5 / 6 (+ 총 공격력의 2%)", // NonChampHealing
            "p3": "12 / 20 / 28 / 36 / 44 (+ 총 공격력의 17%)", // ChampHealing
            "p4": "2.5", // MinionFuryGain
            "p5": "10", // ChampionFuryGain
            "p6": "90 / 135 / 180 / 225 / 270 (+ 총 공격력의 140%)", // EmpDamage
            "p7": "2 / 3 / 4 / 5 / 6 (+ 총 공격력의 2%) x 3", // EmpNonChampHealing
            "p8": "12 / 20 / 28 / 36 / 44 (+ 총 공격력의 17%) x 3", // EmpChampHealing
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7",
            "cost": "-",
            "stats": {
                "사거리": "325"
            }
        },
        "W": {
            "p1": "0.75", // StunDuration
            "p2": "5 / 20 / 35 / 50 / 65 (+ 총 공격력의 75%) x 2", // BasicTotalDamage
            "p3": "10", // BonusFuryVsChamps
            "p4": "5 / 20 / 35 / 50 / 65 (+ 총 공격력의 75%) x 3", // EmpTotalDamage
            "p5": "1.5", // EnragedStunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 14 / 12 / 10 / 8",
            "cost": "-",
            "stats": {
                "사거리": "300"
            }
        },
        "E": {
            "p1": "40 / 70 / 100 / 130 / 160 (+ 총 공격력의 90%)", // BasicDamage
            "p2": "2", // MinionRageGeneration
            "p3": "10", // ChampionRageGeneration
            "p4": "4", // DiceTimer
            "p5": "70 / 115 / 160 / 205 / 250 (+ 총 공격력의 135%)", // EmpDamage
            "p6": "4", // ShredTimer
            "p7": "25 / 27.5 / 30 / 32.5 / 35", // EnragedArmorShred
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 14.5 / 13 / 11.5 / 10",
            "cost": "-",
            "stats": {
                "사거리": "450"
            }
        },
        "R": {
            "p1": "15", // BuffDuration
            "p2": "300 / 500 / 700", // HealthGain
            "p3": "20", // FuryOnCast
            "p4": "60 / 150 / 240 (+ 주문력의 10% + 총 공격력의 10%)", // TotalDamagePerSecond
            "p5": "5", // FuryPerSecond
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
            "p1": "1", // StunDuration
            "p2": "10 / 35 / 60 / 85 / 110 (+ 주문력의 30%)", // TotalDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "5",
            "cost": "30 / 35 / 40 / 45 / 50",
            "stats": {
                "사거리": "100"
            }
        },
        "W": {
            "p1": "8 / 12 / 16 / 20 / 24", // FlatDamageReduction
            "p2": "3", // ArmorMRDuration
            "p3": "20 / 27.5 / 35 / 42.5 / 50 (+ 방어력의 20%)", // BonusArmorTooltip
            "p4": "20 / 27.5 / 35 / 42.5 / 50 (+ 치명타 확률의 20%)", // BonusMRTooltip
            "p5": "55 / 85 / 115 / 145 / 175 (+ 주문력의 40%)", // TotalDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "60",
            "stats": {
                "사거리": "450"
            }
        },
        "E": {
            "p1": "50 / 90 / 130 / 170 / 210 (+ 주문력의 40%)", // TotalDamageTooltip
            "p2": "0.5", // RootDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 10.5 / 9 / 7.5 / 6",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "875"
            }
        },
        "R": {
            "p1": "150 / 225 / 300 (+ 주문력의 80%)", // ExplosionCalculatedDamage
            "p2": "1.75", // CCDuration
            "p3": "80", // SlowPercent
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
            "p1": "3", // BuffDuration
            "p2": "35%", // AttackSpeed*100
            "p3": "총 공격력의 30 / 35 / 40 / 45 / 50%", // TotalDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "4 / 3.5 / 3 / 2.5 / 2",
            "cost": "-",
            "stats": {
                "사거리": "325"
            }
        },
        "W": {
            "p1": "5 / 10 / 15 / 20 / 25", // BurrowedMoveSpeed
            "p2": "65%", // VisionRadiusMod*-100
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
            "p1": "5", // PreyMarkDuration
            "p2": "150 / 250 / 350 (+ 총 공격력의 100%)", // RBaseDamageCalc
            "p3": "15 / 20 / 25", // PercentHealthDamage
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
            "p1": "0.65", // StunDuration
            "p2": "60 / 100 / 140 / 180 / 220 (+ 주문력의 60%)", // Damage
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
            "p1": "3", // Duration
            "p2": "15%", // MinMS*100
            "p3": "30%", // MaxMS*100
            "p4": "5 / 5.5 / 6 / 6.5 / 7% (+ 주문력의 0.03%)", // MaxHealthDamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "40",
            "stats": {
                "사거리": "1200"
            }
        },
        "R": {
            "p1": "2", // Duration
            "p2": "75 / 125 / 175 (+ 주문력의 55%) x 2", // TotalDamage
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
            "p1": "40", // ASBonus
            "p2": "20 / 55 / 90 / 125 / 160 (+ 총 공격력의 100% + 총 공격력의 5%)", // QTotalDamage
            "p3": "35 ~ 35 (레벨에 따라) (+ 총 공격력의 100% + 총 공격력의 20%)", // EmpoweredQTotalDamage
            "p4": "5", // ASDuration
            "p5": "50 ~ 50% (레벨에 따라)", // EmpoweredQAS
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0.25",
            "cost": "",
            "stats": {
                "사거리": "450"
            }
        },
        "W": {
            "p1": "50 / 80 / 110 / 140 / 170 (+ 주문력의 80%)", // TotalDamage
            "p2": "1.5", // HealingWindow
            "p3": "50", // DamagePercentageHealed
            "p4": "0 ~ 0 (레벨에 따라) (+ 주문력의 80%)", // TotalDamageEmpowered
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0.25",
            "cost": "",
            "stats": {
                "사거리": "450"
            }
        },
        "E": {
            "p1": "55 / 100 / 145 / 190 / 235 (+ 총 공격력의 80%)", // TotalDamage
            "p2": "1.75", // CCDuration
            "p3": "30 / 45 / 60 / 75 / 90", // SlowAmount
            "p4": "50 ~ 50 (레벨에 따라) (+ 총 공격력의 80%)", // TotalEmpoweredDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0.25",
            "cost": "",
            "stats": {
                "사거리": "1000"
            }
        },
        "R": {
            "p1": "12 / 16 / 20", // StealthDuration
            "p2": "40 / 50 / 60", // StealthMS
            "p3": "2", // FadeTime
            "p4": "총 공격력의 100%", // BonusDamage
            "p5": "4", // ArmorShredDuration
            "p6": "15 / 20 / 25", // ArmorShred
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
            "p1": "40 / 48 / 56 / 64 / 72 (+ 주문력의 20%)", // MissileDamage
            "p2": "1", // SlowDuration1
            "p3": "1", // SlowDuration2
            "p4": "2", // SlowDuration3
            "p5": "25%", // SlowAmount1*100
            "p6": "25%", // SlowAmount2*100
            "p7": "60%", // SlowAmount3*100
            "p8": "주문력의 25 / 27.5 / 30 / 32.5 / 35% (+ 18 / 26 / 34 / 42 / 50)", // NailDamage
            "p9": "20", // TwoMarkBonusPercent
            "p10": "40", // ThreeMarkBonusPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "70",
            "stats": {
                "사거리": "950"
            }
        },
        "W": {
            "p1": "40 ~ 70% (레벨에 따라)", // AttackSpeed
            "p2": "40% (+ 주문력의 0.02%)", // MoveSpeed
            "p3": "1 (+ 1)", // DecayTimeHelper
            "p4": "6", // BaseDuration
            "p5": "2%", // HealthCost*100
            "p6": "40 / 60 / 80 / 100 / 120 (+ 주문력의 100%)", // DamageRestoreAmount
            "p7": "40 ~ 200 (레벨에 따라) (+ 주문력의 20%)", // AdditionalHeal
            "p8": "? (+ 주문력의 60%)", // MaxHealingThreshold
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "18 / 17 / 16 / 15 / 14",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "250"
            }
        },
        "E": {
            "p1": "40 / 50 / 60 / 70 / 80 (+ 주문력의 40%)", // OnHitDamage
            "p2": "40 / 60 / 80 / 100 / 120 (+ 주문력의 40%)", // DashDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10",
            "cost": "30 / 40 / 50 / 60 / 70",
            "stats": {
                "사거리": "425"
            }
        },
        "R": {
            "p1": "150 / 225 / 300 (+ 주문력의 60%)", // Damage
            "p2": "99%", // SlowAmount*100
            "p3": "2", // SlowDuration
            "p4": "5", // Duration
            "p5": "10 / 11 / 12%", // ExecutionThreshold*100
            "p6": "0.5%", // ExecuteThresholdPerStack*100
            "p7": "20", // CooldownReduction
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
            "p1": "80 / 115 / 150 / 185 / 220 (+ 총 공격력의 100%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "48 / 56 / 64 / 72 / 80",
            "stats": {
                "사거리": "500"
            }
        },
        "W": {
            "p1": "75 / 110 / 145 / 180 / 215 (+ 주문력의 90%)", // TotalDamage
            "p2": "60 / 65 / 70 / 75 / 80", // MoveSpeedAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "60",
            "stats": {
                "사거리": "900"
            }
        },
        "E": {
            "p1": "1", // CDRefundBase
            "p2": "2", // CDRefundChampion
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 15.5 / 15 / 14.5 / 14",
            "cost": "32 / 24 / 16 / 8 / 0",
            "stats": {
                "사거리": "445"
            }
        },
        "R": {
            "p1": "3", // Duration
            "p2": "22 + 마법 저항력의 100% x 이동 속도의 100% + -1", // TotalNumShots
            "p3": "15 / 30 / 45 (+ 총 공격력의 25% + 주문력의 15%)", // DamagePerBullet
            "p4": "22 x 15 / 30 / 45 + 총 공격력의 25% + 주문력의 15%", // TotalDamage
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
            "p1": "60 / 95 / 130 / 165 / 200 (+ 주문력의 50%)", // TotalDamage
            "p2": "80%", // SlowAmount*-100
            "p3": "2", // SlowDuration
            "p4": "30 / 47.5 / 65 / 82.5 / 100 (+ 주문력의 50%)", // BonusMissileDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "925"
            }
        },
        "W": {
            "p1": "3 / 3.25 / 3.5 / 3.75 / 4", // Effect5Amount
            "p2": "25% (+ 주문력의 0.05%)", // TotalMS
            "p3": "20 / 22.5 / 25 / 27.5 / 30%", // Effect7Amount*100
            "p4": "1.2 / 1.4 / 1.6 / 1.8 / 2", // Effect3Amount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "18",
            "cost": "65",
            "stats": {
                "사거리": "650"
            }
        },
        "E": {
            "p1": "6", // Effect1Amount
            "p2": "2.5", // Effect7Amount
            "p3": "70 / 110 / 150 / 190 / 230 (+ 주문력의 50%)", // TotalShield
            "p4": "70 / 110 / 150 / 190 / 230 (+ 주문력의 50%)", // TotalDamage
            "p5": "4", // Effect6Amount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "650"
            }
        },
        "R": {
            "p1": "1", // KnockbackDuration
            "p2": "7", // BuffDuration
            "p3": "275 / 425 / 575 (+ 주문력의 55%)", // TotalBonusHealth
            "p4": "30 / 45 / 60", // SlowPercent
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
            "p1": "65 / 90 / 115 / 140 / 165 (+ 주문력의 40%)", // Damage
            "p2": "3.5", // MarkDuration
            "p3": "65 / 90 / 115 / 140 / 165 (+ 주문력의 40%)", // MarkDamage
            "p4": "100%", // ManaRefund*100
            "p5": "30%", // CooldownRefund*100
            "p6": "10 ~ 10 (레벨에 따라)", // BonusMinionDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6",
            "cost": "50",
            "stats": {
                "사거리": "700"
            }
        },
        "W": {
            "p1": "75 / 115 / 155 / 195 / 235 (+ 주문력의 80%)", // TotalDamage
            "p2": "4", // SnapbackTimeAllowed
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15 / 13.75 / 12.5 / 11.25 / 10",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "600"
            }
        },
        "E": {
            "p1": "50 / 70 / 90 / 110 / 130 (+ 주문력의 40%)", // InitialDamage
            "p2": "1.5", // TetherDuration
            "p3": "1.5", // RootDuration
            "p4": "80 / 120 / 160 / 200 / 240 (+ 주문력의 85%)", // DelayedDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13.25 / 12.5 / 11.75 / 11",
            "cost": "50",
            "stats": {
                "사거리": "925"
            }
        },
        "R": {
            "p1": "70 / 150 / 230 (+ 주문력의 40%)", // RQ1Damage
            "p2": "140 / 300 / 460 (+ 주문력의 80%)", // RQ2Damage
            "p3": "150 / 315 / 480 (+ 주문력의 80%)", // RWDamage
            "p4": "70 / 150 / 230 (+ 주문력의 40%)", // RE1Damage
            "p5": "140 / 300 / 460 (+ 주문력의 85%)", // RE2Damage
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
            "p1": "60 / 90 / 120 / 150 / 180 (+ 총 공격력의 90%)", // InitialDamage
            "p2": "3", // ReactivateTime
            "p3": "60 / 90 / 120 / 150 / 180 (+ 총 공격력의 90%)", // RecastDamage
            "p4": "60 / 90 / 120 / 150 / 180 (+ 총 공격력의 90%) x 2", // EmpoweredDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "50",
            "stats": {
                "사거리": "1100"
            }
        },
        "W": {
            "p1": "2", // ShieldDuration
            "p2": "60 / 105 / 150 / 195 / 240 (+ 주문력의 80%)", // ShieldAmount
            "p3": "3", // W1ReactivateTime
            "p4": "4", // LifestealAndSpellVampTime
            "p5": "10 / 14 / 18 / 22 / 26", // LifestealAndSpellVamp
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7",
            "cost": "50",
            "stats": {
                "사거리": "700"
            }
        },
        "E": {
            "p1": "35 / 60 / 85 / 110 / 135 (+ 총 공격력의 90%)", // InitialDamage
            "p2": "4", // SlowDuration
            "p3": "3", // ReactivateTime
            "p4": "35 / 45 / 55 / 65 / 75", // SlowAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8",
            "cost": "50",
            "stats": {
                "사거리": "450"
            }
        },
        "R": {
            "p1": "175 / 400 / 625 (+ 총 공격력의 200%)", // Damage
            "p2": "12 / 15 / 18", // PercentHPCarryThrough
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
            "p1": "45 / 75 / 105 / 135 / 165 (+ 총 공격력의 60 / 65 / 70 / 75 / 80%)", // FirstSlashDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13",
            "cost": "-",
            "stats": {
                "사거리": "275"
            }
        },
        "W": {
            "p1": "65 / 95 / 125 / 155 / 185 (+ 총 공격력의 100%)", // TotalDamage
            "p2": "0.75", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "-",
            "stats": {
                "사거리": "260"
            }
        },
        "E": {
            "p1": "70 / 95 / 120 / 145 / 170 (+ 총 공격력의 110%)", // TotalShield
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "-",
            "stats": {
                "사거리": "250"
            }
        },
        "R": {
            "p1": "15", // Duration
            "p2": "총 공격력의 20%", // BonusAD
            "p3": "100 / 150 / 200 (+ 총 공격력의 55%)", // MinDamage
            "p4": "300 / 450 / 600 (+ 총 공격력의 165%)", // MaxDamage
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
            "p1": "? (+ 주문력의 75%)", // TotalDamage
            "p2": "1.5", // SlowDuration
            "p3": "20 / 24 / 28 / 32 / 36%", // SlowPercentage*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7 / 6 / 5 / 4 / 3",
            "cost": "55 / 60 / 65 / 70 / 75",
            "stats": {
                "사거리": "725"
            }
        },
        "W": {
            "p1": "1.25 / 1.35 / 1.45 / 1.55 / 1.65", // SnareDuration
            "p2": "70 / 105 / 140 / 175 / 210 (+ 주문력의 70%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "40",
            "stats": {
                "사거리": "450"
            }
        },
        "E": {
            "p1": "70 / 105 / 140 / 175 / 210 (+ 주문력의 60%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "24 / 21 / 18 / 15 / 12",
            "cost": "80 / 85 / 90 / 95 / 100",
            "stats": {
                "사거리": "1050"
            }
        },
        "R": {
            "p1": "1.5", // EnemyCastDuration
            "p2": "2.5", // SelfCastDuration
            "p3": "100 / 150 / 200 (+ 주문력의 55%)", // HealAmount
            "p4": "1", // SelfCastMissingHPPerAbove
            "p5": "1", // SelfCastMissingHPRatio
            "p6": "150 / 250 / 350 (+ 주문력의 75%)", // CalculatedDamage
            "p7": "3", // SlowDuration
            "p8": "45 / 60 / 75%", // SlowAmount*-100
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
            "p1": "6.5", // PranceDuration
            "p2": "3 / 4 / 5 / 6 / 7% (+ 주문력의 0.03%)", // PranceSpeed
            "p3": "4", // PranceMaxStacks
            "p4": "35 / 45 / 55 / 65 / 75 (+ 주문력의 35%)", // TotalDamage
            "p5": "35 / 45 / 55 / 65 / 75 (+ 주문력의 35%)", // BonusTrueDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6 / 5.5 / 5 / 4.5 / 4",
            "cost": "65",
            "stats": {
                "사거리": "450"
            }
        },
        "W": {
            "p1": "80 / 100 / 120 / 140 / 160 (+ 주문력의 35%)", // FlatDamage
            "p2": "240 / 300 / 360 / 420 / 480 (+ 주문력의 35%)", // FlatDamageSweetSpot
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "50",
            "stats": {
                "사거리": "500"
            }
        },
        "E": {
            "p1": "60 / 85 / 110 / 135 / 160 (+ 주문력의 50%)", // ImpactDamageTotal
            "p2": "3", // SlowDuration
            "p3": "40%", // SlowAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12",
            "cost": "70",
            "stats": {
                "사거리": "700"
            }
        },
        "R": {
            "p1": "1.5", // DrowsyDuration
            "p2": "2", // SleepDuration
            "p3": "100 / 150 / 200 (+ 주문력의 40%)", // TotalDamage
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
            "p1": "4", // AlphaStrikeBounces
            "p2": "20 / 40 / 60 / 80 / 100 (+ 총 공격력의 70%)", // TotalDamage
            "p3": "25%", // SubsequentHitMultiplier*100
            "p4": "5 / 10 / 15 / 20 / 25 + 총 공격력의 70%", // SubesquentDamage
            "p5": "20 / 40 / 60 / 80 / 100 (+ 총 공격력의 70%) x 1 + 0.25 x 3", // SingleTotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 19.5 / 19 / 18.5 / 18",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "600"
            }
        },
        "W": {
            "p1": "4", // HealDuration
            "p2": "120 / 200 / 280 / 360 / 440 (+ 주문력의 100%)", // TotalHeal
            "p3": "100%", // MaxMissingHealthPercent*100
            "p4": "0.5", // DRLinger
            "p5": "45 / 47.5 / 50 / 52.5 / 55 + 25 / 22.5 / 20 / 17.5 / 15%", // InitialDR
            "p6": "0.5", // InitialExtraDRDuration
            "p7": "45 / 47.5 / 50 / 52.5 / 55%", // DamageReduction*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10",
            "cost": "40",
            "stats": {
                "사거리": "20"
            }
        },
        "E": {
            "p1": "5", // Duration
            "p2": "20 / 25 / 30 / 35 / 40 (+ 총 공격력의 35%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14",
            "cost": "-",
            "stats": {
                "사거리": "20"
            }
        },
        "R": {
            "p1": "70%", // RCooldownRefund*100
            "p2": "7", // RDuration
            "p3": "35 / 45 / 55", // RMSBonus
            "p4": "25 / 45 / 65", // RASBonus
            "p5": "7", // RKillAssistExtension
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
            "p1": "75 / 120 / 165 / 210 / 255 (+ 주문력의 50%)", // TotalDamage
            "p2": "2 / 2.5 / 3 / 3.5 / 4%", // BasePercentHealth*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7 / 6.5 / 6 / 5.5 / 5",
            "cost": "40",
            "stats": {
                "사거리": "600"
            }
        },
        "W": {
            "p1": "1 / 1.1 / 1.2 / 1.3 / 1.4", // RootDuration
            "p2": "60 / 85 / 110 / 135 / 160 (+ 주문력의 40%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "60",
            "stats": {
                "사거리": "525"
            }
        },
        "E": {
            "p1": "30", // SaplingDuration
            "p2": "50 / 75 / 100 / 125 / 150 (+ (?) + 최대 체력의 5%)", // TotalDamage
            "p3": "2", // SlowDuration
            "p4": "45%", // SlowAmount*100
            "p5": "30 (+ 최대 체력의 1.5%)", // EmpoweredSaplingDuration
            "p6": "100 / 150 / 200 / 250 / 300 (+ 주문력의 50% + 최대 체력의 10%)", // TotalEmpoweredDamage
            "p7": "2", // EmpoweredDoTDuration
            "p8": "45% (+ 주문력의 0.01% + 최대 체력의 0.01 x 0.01%)", // EmpoweredSlowAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "18 / 17 / 16 / 15 / 14",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "1100"
            }
        },
        "R": {
            "p1": "0.75", // MinRootDuration
            "p2": "2.25", // MaxRootDuration
            "p3": "150 / 225 / 300 (+ 주문력의 75%)", // TotalDamage
            "p4": "40 / 50 / 60%", // MoveHaste*100
            "p5": "2", // HasteDuration
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
            "p1": "70 / 105 / 140 / 175 / 210 (+ 주문력의 55%)", // TotalDamageTooltip
            "p2": "1 / 1.25 / 1.5 / 1.75 / 2", // SilenceDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "900"
            }
        },
        "W": {
            "p1": "2", // StackCap
            "p2": "8 / 8 / 9 / 9 / 10", // VoidlingDuration
            "p3": "12 / 14 / 16 / 18 / 20 (+ 5 ~ 64.5 (레벨에 따라) + 총 공격력의 40% + 주문력의 20%)", // VoidlingBonusDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "150"
            }
        },
        "E": {
            "p1": "4", // Duration
            "p2": "80 / 115 / 150 / 185 / 220 (+ 주문력의 80%)", // TotalDamage
            "p3": "최대 마나의 2%", // ManaRestore
            "p4": "10 ~ 10 (레벨에 따라)", // MinionExecuteThreshold
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "650"
            }
        },
        "R": {
            "p1": "2.5", // CCDuration
            "p2": "125 / 200 / 275 (+ 주문력의 80%)", // TotalDamageTooltip
            "p3": "5", // PoolDuration
            "p4": "10 / 15 / 20% (+ 주문력의 0.5%)", // ZoneDamageTooltip
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
            "p1": "70 / 120 / 170 / 220 / 270 (+ 주문력의 60%)", // QDamageCalc
            "p2": "3", // SlowDuration
            "p3": "20 / 25 / 30 / 35 / 40", // SpeedSteal
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "625"
            }
        },
        "W": {
            "p1": "10 / 15 / 20 / 25 / 30%", // BonusArmorPassive*100
            "p2": "?", // f1
            "p3": "30 / 45 / 60 / 75 / 90", // BonusArmorPassive*300
            "p4": "?", // f2
            "p5": "30 / 40 / 50 / 60 / 70 (+ 주문력의 20% + 방어력의 15%)", // TotalBonusDamage
            "p6": "15 / 25 / 35 / 45 / 55 (+ 주문력의 30% + 방어력의 15%)", // ThunderclapSplash
            "p7": "5", // ThunderclapBuffDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "30 / 35 / 40 / 45 / 50",
            "stats": {
                "사거리": "400"
            }
        },
        "E": {
            "p1": "60 / 95 / 130 / 165 / 200 (+ 방어력의 40% + 주문력의 60%)", // EDamageCalc
            "p2": "3", // Duration
            "p3": "30 / 35 / 40 / 45 / 50", // ASReduction
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "400"
            }
        },
        "R": {
            "p1": "1.5", // KnockupDuration
            "p2": "200 / 300 / 400 (+ 주문력의 90%)", // TotalDamage
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
            "p1": "6 / 7 / 8 / 9 / 10", // ExplosionCount
            "p2": "60 / 85 / 110 / 135 / 160 (+ 주문력의 55%)", // InitialExplosionDamage
            "p3": "5 / 7 / 9 / 11 / 13 (+ 주문력의 5%)", // TotalExplosionDamage
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
            "p1": "0.75", // Duration
            "p2": "80 / 110 / 140 / 170 / 200 (+ 주문력의 70%)", // ShieldAmount
            "p3": "0.75", // MoveSpeedDuration
            "p4": "40%", // MoveSpeed*100
            "p5": "40 / 45 / 50 / 55 / 60% (+ 주문력의 0.05%)", // DamagePercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "38 / 35 / 33 / 29 / 26",
            "cost": "80 / 60 / 40 / 20 / 0",
            "stats": {
                "사거리": "250"
            }
        },
        "E": {
            "p1": "1.5", // RootDuration
            "p2": "60 / 105 / 150 / 195 / 240 (+ 주문력의 70%)", // Damage
            "p3": "30%", // AreaSlowAmount*100
            "p4": "16 / 28 / 40 / 52 / 64 (+ 주문력의 8%)", // AreaDamagePerSecond
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10.5 / 10 / 9.5 / 9",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "1000"
            }
        },
        "R": {
            "p1": "60 / 70 / 80 (+ 주문력의 10%)", // PassiveFlatDamage
            "p2": "3 / 4 / 5 (+ 주문력의 0.75%)", // PassiveStackDamage
            "p3": "125 / 200 / 275 (+ 주문력의 30%)", // UltFlatDamage
            "p4": "4 / 7 / 10 (+ 주문력의 4%)", // UltStackDamage
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
            "p1": "80 / 115 / 150 / 185 / 220 (+ 0 ~ 0 (레벨에 따라) + 총 공격력의 120% + 주문력의 70%)", // QDamage
            "p2": "80 / 115 / 150 / 185 / 220 (+ 0 ~ 0 (레벨에 따라) + 총 공격력의 120% + 주문력의 70%) x 1.3 / 1.35 / 1.4 / 1.45 / 1.5", // EmpoweredDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 7 / 6 / 5 / 4",
            "cost": "-",
            "stats": {
                "사거리": "675"
            }
        },
        "W": {
            "p1": "45%", // DamageConversion*100
            "p2": "7.5%", // DamageTakenConversion*100
            "p3": "35 / 37.5 / 40 / 42.5 / 45%", // HealingPercent*100
            "p4": "최대 체력의 5%", // MinHealthTooltip
            "p5": "최대 체력의 30%", // MaxHealthTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "-",
            "stats": {
                "사거리": "25000"
            }
        },
        "E": {
            "p1": "60 / 80 / 100 / 120 / 140 (+ 주문력의 45%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 14 / 12 / 10 / 8",
            "cost": "-",
            "stats": {
                "사거리": "700"
            }
        },
        "R": {
            "p1": "7", // SpiritRealmDuration
            "p2": "10%", // StatStealPercentScalar*100
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
            "p1": "2 / 2.25 / 2.5 / 2.75 / 3", // RootDuration
            "p2": "80 / 135 / 190 / 245 / 300 (+ 주문력의 90%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "1250"
            }
        },
        "W": {
            "p1": "5", // WDuration
            "p2": "18 / 31 / 44 / 57 / 70 (+ (?))", // TotalMinDamage
            "p3": "18 / 31 / 44 / 57 / 70 (+ (?)) x 2", // TotalMaxDamage
            "p4": "5%", // CDRefundPercent*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": {
                "사거리": "900"
            }
        },
        "E": {
            "p1": "5", // ShieldDuration
            "p2": "100 / 155 / 210 / 265 / 320 (+ 주문력의 70%)", // TotalShieldStrength
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "26 / 23.5 / 21 / 18.5 / 16",
            "cost": "80",
            "stats": {
                "사거리": "800"
            }
        },
        "R": {
            "p1": "200 / 275 / 350 (+ 주문력의 80%)", // TotalDamage
            "p2": "20", // SlowPercent
            "p3": "3", // ChainDuration
            "p4": "1.5 / 1.75 / 2", // StunDuration
            "p5": "20 / 40 / 60", // HastePercent
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
            "p1": "20 / 22.5 / 25 / 27.5 / 30%", // CurrentHealthDamage*100
            "p2": "2", // SlowDuration
            "p3": "40%", // SlowAmount*100
            "p4": "1 x 50 / 60 / 70 / 80 / 90", // HealthRestoreOnHitChampionMonster
            "p5": "0.5 x 50 / 60 / 70 / 80 / 90", // HealthRestoreOnHitMinion
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "4",
            "cost": "",
            "stats": {
                "사거리": "975"
            }
        },
        "W": {
            "p1": "3", // Duration
            "p2": "20 / 35 / 50 / 65 / 80", // DamagePerTick*4
            "p3": "0.75", // GrayHealthInitialDuration
            "p4": "80 ~ 95% (레벨에 따라)", // GrayHealthStorageInitial
            "p5": "25%", // GrayHealthStorage*100
            "p6": "20 / 35 / 50 / 65 / 80 (+ 최대 체력의 7%)", // TotalDamage
            "p7": "100%", // GrayHealthBigMod*100
            "p8": "50%", // GrayHealthSmallMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "17 / 16.5 / 16 / 15.5 / 15",
            "cost": "",
            "stats": {
                "사거리": "325"
            }
        },
        "E": {
            "p1": "최대 체력의 200 / 230 / 260 / 290 / 320%", // PassiveBonusAD
            "p2": "5 / 15 / 25 / 35 / 45 (+ 최대 체력의 5%)", // AdditionalDamage
            "p3": "140% (+ -100)", // MaxDamageAmpTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8.25 / 7.5 / 6.75 / 6",
            "cost": ""
        },
        "R": {
            "p1": "15 / 20 / 25%", // MissingHealthHeal*100
            "p2": "15 / 25 / 35%", // SpeedBoostAmount*100
            "p3": "10", // Duration
            "p4": "20 / 40 / 60%", // MaxHealthHoT*100
            "p5": "5%", // BonusPerNearbyChampion*100
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
            "p1": "20 / 45 / 70 / 95 / 120 (+ 총 공격력의 100% + 주문력의 35%)", // TotalDamageTooltip
            "p2": "20 / 45 / 70 / 95 / 120 (+ 총 공격력의 100% + 주문력의 35%) x 1 + 0.5 x 이동 속도의 100% + -1", // TotalDamageCrit
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7 / 6 / 5 / 4 / 3",
            "cost": "40",
            "stats": {
                "사거리": "650"
            }
        },
        "W": {
            "p1": "4", // PassiveBaseMSOOC
            "p2": "30 / 35 / 40 / 45 / 50", // PassiveBaseMS
            "p3": "3", // PassiveMaxMSExtraOOC
            "p4": "60 / 70 / 80 / 90 / 100", // PassiveMaxMS
            "p5": "4", // ActiveDuration
            "p6": "40 / 55 / 70 / 85 / 100%", // ActiveAS*100
            "p7": "2", // LoveTapRefund
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12",
            "cost": "45",
            "stats": {
                "사거리": "600"
            }
        },
        "E": {
            "p1": "2", // BaseDuration
            "p2": "40% (+ 주문력의 0.06%)", // TotalSlowAmount
            "p3": "35 / 50 / 65 / 80 / 95 (+ 주문력의 60%)", // TotalDamagePerSecond
            "p4": "35 / 50 / 65 / 80 / 95 (+ 주문력의 60%) x 2", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "18 / 17 / 16 / 15 / 14",
            "cost": "80",
            "stats": {
                "사거리": "1000"
            }
        },
        "R": {
            "p1": "3", // BaseChannelDuration
            "p2": "14 / 16 / 18", // BaseWaves
            "p3": "20 / 30 / 40 (+ 총 공격력의 60% + 주문력의 25%)", // PhysicalDamagePerWave
            "p4": "20 / 30 / 40 (+ 총 공격력의 60% + 주문력의 25%) x 14 / 16 / 18", // TotalPhysicalDamage
            "p5": "20 / 30 / 40 (+ 총 공격력의 60% + 주문력의 25%) x 1 + 0.3 x 이동 속도의 100% + -1", // CritDamagePerWave
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
            "p1": "80 / 140 / 200 / 260 / 320 (+ 주문력의 120%)", // Damage
            "p2": "1.5", // SlowDuration
            "p3": "40 / 45 / 50 / 55 / 60% (+ 주문력의 0.05%)", // SlowAmountPercent
            "p4": "50%", // RefundRatio*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "1200"
            }
        },
        "W": {
            "p1": "6", // ZoneDuration
            "p2": "10 / 12.5 / 15 / 17.5 / 20%", // RangePercent
            "p3": "70 / 90 / 110 / 130 / 150 (+ 주문력의 15%)", // HealingOverTime
            "p4": "3", // HealFrequencySeconds
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "29 / 27 / 25 / 23 / 21",
            "cost": "90 / 100 / 110 / 120 / 130",
            "stats": {
                "사거리": "350"
            }
        },
        "E": {
            "p1": "45 / 75 / 105 / 135 / 165 (+ 주문력의 45%)", // ShieldCalc
            "p2": "2.5", // MoveSpeedDuration
            "p3": "12 / 14 / 16 / 18 / 20%", // MoveSpeedAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0.5",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "650"
            }
        },
        "R": {
            "p1": "150 / 250 / 350 (+ 주문력의 50%)", // HealCalc
            "p2": "3", // TenacityDuration
            "p3": "65%", // TenacityAmount*100
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
            "p1": "80 / 120 / 160 / 200 / 240 (+ 주문력의 80%)", // TotalDamage
            "p2": "1 / 1.2 / 1.4 / 1.6 / 1.8", // SlowDuration
            "p3": "60", // SlowAmountPercentage
            "p4": "1 / 1.2 / 1.4 / 1.6 / 1.8", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "60",
            "stats": {
                "사거리": "25000"
            }
        },
        "W": {
            "p1": "1.5", // MoveSpeed_Duration
            "p2": "20 / 22.5 / 25 / 27.5 / 30% (+ 주문력의 0.06%)", // Calc_MoveSpeed
            "p3": "25 / 50 / 75 / 100 / 125 (+ 주문력의 40%)", // InitialHeal
            "p4": "5", // ChargeupTime
            "p5": "50 / 87.5 / 125 / 162.5 / 200 (+ 주문력의 70%)", // MaxHeal
            "p6": "3", // MaxPacks
            "p7": "2", // Ammo_Limit
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
            "p1": "10", // DoorDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "22 / 20.5 / 19 / 17.5 / 16",
            "cost": "30",
            "stats": {
                "사거리": "900"
            }
        },
        "R": {
            "p1": "2.5", // RStasisDuration
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
            "p1": "20%", // MoveSpeedMod*-100
            "p2": "4", // MaxChannelDuration
            "p3": "50%", // ManaRefund*100
            "p4": "80 / 150 / 220 / 290 / 360 (+ 총 공격력의 120%) x 0.667", // TotalDamageMinTooltip
            "p5": "15%", // FalloffPercent*100
            "p6": "33%", // MinDamagePercent*100
            "p7": "50%", // MaxChargeAmp*100
            "p8": "80 / 150 / 220 / 290 / 360 (+ 총 공격력의 120%)", // TotalDamageMax
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "925"
            }
        },
        "W": {
            "p1": "4 / 13 / 22 / 31 / 40 (+ 주문력의 25% + 총 공격력의 15%)", // OnHitDamage
            "p2": "6", // DebuffDuration
            "p3": "3", // MaxStacks
            "p4": "3 / 3.5 / 4 / 4.5 / 5% (+ 주문력의 0.01 x 0.013%)", // PercentHPPerStack
            "p5": "3 / 3.5 / 4 / 4.5 / 5% (+ 주문력의 0.01 x 0.013%) x 3", // MaxPercentHPPerStack
            "p6": "13%", // CDRPerBlightStack*100
            "p7": "6 / 8 / 10 / 12 / 14%", // QEmpowerPercentHP
            "p8": "6 / 8 / 10 / 12 / 14% x 1.5", // MaxQEmpowerPercentHP
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "40",
            "cost": "-",
            "stats": {
                "사거리": "750"
            }
        },
        "E": {
            "p1": "60 / 90 / 120 / 150 / 180 (+ 총 공격력의 90%)", // TotalDamage
            "p2": "4", // GroundDuration
            "p3": "30 / 35 / 40 / 45 / 50%", // SlowPercent*-100
            "p4": "40%", // GrievousAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "18 / 16 / 14 / 12 / 10",
            "cost": "90",
            "stats": {
                "사거리": "925"
            }
        },
        "R": {
            "p1": "2", // RootDuration
            "p2": "150 / 250 / 350 (+ 주문력의 100%)", // TotalDamage
            "p3": "3", // PassiveStacks
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
            "p1": "15", // SelfSlow
            "p2": "40 / 60 / 80 / 100 / 120 (+ 총 공격력의 60%)", // TotalDamage
            "p3": "40 / 60 / 80 / 100 / 120 (+ 총 공격력의 60%) x 2.5", // MaxDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 10.5 / 9 / 7.5 / 6",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "250"
            }
        },
        "W": {
            "p1": "4 / 5 / 6 / 7 / 8% (+ 총 공격력의 3.5%)", // TotalDamageTooltip
            "p2": "4", // SharedBuffsDuration
            "p3": "20", // ShredAmount
            "p4": "30 / 35 / 40 / 45 / 50", // AttackSpeed
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0",
            "cost": "",
            "stats": {
                "사거리": "750"
            }
        },
        "E": {
            "p1": "10 / 30 / 50 / 70 / 90 (+ 총 공격력의 110% + 주문력의 100%)", // TotalDamageTooltip
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
            "p1": "1.3", // RStunDuration
            "p2": "150 / 250 / 350 (+ 총 공격력의 90%)", // Damage
            "p3": "0.75", // SecondaryTargetStunDuration
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
            "p1": "80 / 120 / 160 / 200 / 240 (+ 주문력의 50 / 55 / 60 / 65 / 70%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6 / 5.5 / 5 / 4.5 / 4",
            "cost": "30 / 35 / 40 / 45 / 50",
            "stats": {
                "사거리": "1000"
            }
        },
        "W": {
            "p1": "85 / 140 / 195 / 250 / 305 (+ 주문력의 70 / 80 / 90 / 100 / 110%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "950"
            }
        },
        "E": {
            "p1": "1.5 / 1.75 / 2 / 2.25 / 2.5", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 18.5 / 17 / 15.5 / 14",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "725"
            }
        },
        "R": {
            "p1": "175 / 250 / 325 (+ 주문력의 65 / 70 / 75%)", // MinDamage
            "p2": "175 / 250 / 325 (+ 주문력의 65 / 70 / 75%) x 2", // MaxDamage
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
            "p1": "총 공격력의 75 / 85 / 95 / 105 / 115% (+ 주문력의 50%)", // ADRatioBonus
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6 / 5 / 4 / 3 / 2",
            "cost": "30",
            "stats": {
                "사거리": "300"
            }
        },
        "W": {
            "p1": "6 / 7 / 8 / 9 / 10%", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0",
            "cost": "",
            "stats": {
                "사거리": "750"
            }
        },
        "E": {
            "p1": "50 / 85 / 120 / 155 / 190 (+ 총 공격력의 50%)", // TotalDamage
            "p2": "50 / 85 / 120 / 155 / 190 (+ 총 공격력의 50%) x 1.5", // EmpoweredDamageTT
            "p3": "1.5", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "90",
            "stats": {
                "사거리": "550"
            }
        },
        "R": {
            "p1": "8 / 10 / 12", // BaseDuration
            "p2": "35 / 50 / 65", // BonusAttackDamage
            "p3": "3", // DamagedMarkerDuration
            "p4": "4", // DurationToAdd
            "p5": "90", // MovementSpeed
            "p6": "30 / 40 / 50", // TumbleCDReduction
            "p7": "1", // TumbleStealthDuration
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
            "p1": "70 / 115 / 160 / 205 / 250 (+ 주문력의 70%)", // QDamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 7 / 6 / 5 / 4",
            "cost": "45 / 50 / 55 / 60 / 65",
            "stats": {
                "사거리": "1200"
            }
        },
        "W": {
            "p1": "2.5", // ShieldDuration
            "p2": "50 / 75 / 100 / 125 / 150 (+ 주문력의 75%)", // ShieldCalc
            "p3": "80 / 120 / 160 / 200 / 240 (+ 주문력의 30%)", // WDamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "75",
            "stats": {
                "사거리": "475"
            }
        },
        "E": {
            "p1": "50 / 70 / 90 / 110 / 130 (+ 주문력의 40 / 45 / 50 / 55 / 60%)", // EDamageCalc
            "p2": "2", // SlowDuration
            "p3": "30 / 35 / 40 / 45 / 50%", // SlowAmount*100
            "p4": "10%", // GloomCDNonChampTooltip*100
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
            "p1": "12 / 14 / 16 / 18 / 20 (+ 총 공격력의 105%)", // BaseDamage
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
            "p1": "80 / 140 / 200 / 260 / 320 (+ 주문력의 150%)", // Damage
            "p2": "0.6 / 0.7 / 0.8 / 0.9 / 1", // Duration
            "p3": "2", // SlowDuration
            "p4": "30%", // SlowPercent*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "-",
            "stats": {
                "사거리": "715"
            }
        },
        "E": {
            "p1": "1.5", // TotalDuration
            "p2": "20 / 30 / 40 / 50 / 60%", // DRPercent*100
            "p3": "?", // TotalLifesteal
            "p4": "?", // f2.0
            "p5": "10 / 12 / 14 / 16 / 18 (+ 총 공격력의 12%)", // DamagePerStrike
            "p6": "10 / 12 / 14 / 16 / 18 (+ 총 공격력의 12%) x 2", // MaxDamagePerStrikeTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "24 / 21 / 18 / 15 / 12",
            "cost": "-",
            "stats": {
                "사거리": "500"
            }
        },
        "R": {
            "p1": "2 / 4 / 6 (+ 총 공격력의 3%)", // FinalOnHitDamage
            "p2": "1", // PassiveStacksOnDevour
            "p3": "150 / 200 / 250 (+ 주문력의 150%)", // TotalExplosionDamage
            "p4": "20%", // MissingHealthDamage*100
            "p5": "100 / 250 / 400 (+ 총 공격력의 150% + 주문력의 150%)", // MaxHealthOnDevour
            "p6": "25 / 75 / 125", // BonusAARange
            "p7": "5 / 15 / 25%", // TotalASMod*100
            "p8": "45", // SteroidDuration
            "p9": "40", // StackThresholdForUpgrade
            "p10": "90", // SteroidDurationUpgrade
            "p11": "80", // StackThresholdForPermanent
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
            "p1": "80 / 120 / 160 / 200 / 240 (+ 주문력의 90%)", // TotalDamage
            "p2": "70%", // SlowAmount*100
            "p3": "1 / 1.4 / 1.8 / 2.2 / 2.6", // SlowDuration
            "p4": "20 / 22.5 / 25 / 27.5 / 30", // TooltipManaRefund
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "1050"
            }
        },
        "W": {
            "p1": "30 / 50 / 70 / 90 / 110 (+ 주문력의 20%)", // InitialDamage
            "p2": "45 / 75 / 105 / 135 / 165 (+ 주문력의 25%)", // SecondaryDamage
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
            "p1": "0.75", // StunDuration
            "p2": "70 / 100 / 130 / 160 / 190 (+ 주문력의 30%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "810"
            }
        },
        "R": {
            "p1": "450 / 700 / 925 (+ 주문력의 125%)", // TotalDamage
            "p2": "20", // Effect3Amount
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
            "p1": "4", // Duration
            "p2": "12 / 15.5 / 19 / 22.5 / 26%", // MinSpeedCalc
            "p3": "24 / 31 / 38 / 45 / 52%", // MaxSpeedCalc
            "p4": "10 / 20 / 30 / 40 / 50 (+ 총 공격력의 100% + 총 공격력의 160%)", // CalculatedDamage
            "p5": "1", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "50",
            "stats": {
                "사거리": "300"
            }
        },
        "W": {
            "p1": "5 / 30 / 55 / 80 / 105 (+ 총 공격력의 110% + 최대 체력의 6%)", // TotalDamage
            "p2": "8", // MarkDuration
            "p3": "5 / 30 / 55 / 80 / 105 (+ 총 공격력의 110% + 최대 체력의 6%) x 1.5 + 총 공격력의 0.25%", // EmpoweredDamage
            "p4": "20 / 35 / 50 / 65 / 80", // BaseHeal
            "p5": "8 / 11 / 14 / 17 / 20%", // PercentMissingHealthHealingRatio
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "5",
            "cost": "20 / 25 / 30 / 35 / 40",
            "stats": {
                "사거리": "325"
            }
        },
        "E": {
            "p1": "80 / 110 / 140 / 170 / 200 (+ 주문력의 70%)", // TotalDamageTooltip
            "p2": "11 / 12 / 13 / 14 / 15%", // PercentDamage*100
            "p3": "2", // SlowDuration
            "p4": "40%", // SlowAmount*100
            "p5": "3", // ShieldDuration
            "p6": "주문력의 75%", // ShieldAPRatioTooltip
            "p7": "14%", // ShieldAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16",
            "cost": "50",
            "stats": {
                "사거리": "1200"
            }
        },
        "R": {
            "p1": "12", // TransformDuration
            "p2": "175 / 350 / 525", // HealthAmount
            "p3": "50", // BonusAttackRange
            "p4": "2 / 3 / 4", // TowerDisableDuration
            "p5": "300 / 500 / 700 (+ 주문력의 125% + 총 공격력의 250%)", // TowerDamageTooltip
            "p6": "50%", // SlowAmount*100
            "p7": "300 / 500 / 700 (+ 주문력의 125% + 총 공격력의 250%)", // SweetSpotDamageTooltip
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
            "p1": "75 / 120 / 165 / 210 / 255 (+ 최대 체력의 2.5%)", // TotalDamage
            "p2": "70", // InitialSlow
            "p3": "2", // SlowDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "45 / 50 / 55 / 60 / 65",
            "stats": {
                "사거리": "1000"
            }
        },
        "W": {
            "p1": "3", // Duration
            "p2": "20 / 25 / 30 / 35 / 40 (+ 방어력의 12%)", // GrantedAllyArmor
            "p3": "20 / 25 / 30 / 35 / 40 (+ 치명타 확률의 12%)", // GrantedAllyMR
            "p4": "20 / 25 / 30 / 35 / 40 (+ 방어력의 36%)", // GrantedBraumArmor
            "p5": "20 / 25 / 30 / 35 / 40 (+ 치명타 확률의 36%)", // GrantedBraumMR
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "40",
            "stats": {
                "사거리": "650"
            }
        },
        "E": {
            "p1": "3 / 3.25 / 3.5 / 3.75 / 4", // ShieldHoldDuration
            "p2": "35 / 40 / 45 / 50 / 55", // ShieldFacingDRAmount
            "p3": "10", // MoveSpeedPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 14 / 12 / 10 / 8",
            "cost": "30 / 35 / 40 / 45 / 50",
            "stats": {
                "사거리": "25000"
            }
        },
        "R": {
            "p1": "150 / 250 / 350 (+ 주문력의 60%)", // TotalDamage
            "p2": "0.6", // MinKnockup
            "p3": "1 / 1.5 / 2", // MaxKnockup
            "p4": "4", // SlowZoneDuration
            "p5": "40 / 50 / 60", // MoveSpeedMod
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
            "p1": "60 / 85 / 110 / 135 / 160 (+ 주문력의 60% + 총 공격력의 80%)", // TotalDamage
            "p2": "0.85", // StunDuration
            "p3": "5", // ShredDuration
            "p4": "10 / 12.5 / 15 / 17.5 / 20%", // ShredPercent*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "",
            "stats": {
                "사거리": "475"
            }
        },
        "W": {
            "p1": "5", // BerserkDuration
            "p2": "55 / 65 / 75 / 85 / 95%", // BerserkAS*100
            "p3": "24 / 33 / 42 / 51 / 60%", // BerserkMS*100
            "p4": "총 공격력의 60 / 70 / 80 / 90 / 100%", // TotalAoEDamage
            "p5": "5 / 20 / 35 / 50 / 65 (+ 총 공격력의 105%)", // TotalAttackBonusDamage
            "p6": "9 (+ 총 공격력의 2.5%)", // TotalAttackPercentMissingHealth
            "p7": "최대 체력의 5%", // AttackMaxHPHeal
            "p8": "24 / 28 / 32 / 36 / 40%", // AttackHealPercent*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "",
            "stats": {
                "사거리": "350"
            }
        },
        "E": {
            "p1": "최대 체력의 10 / 11.5 / 13 / 14.5 / 16%", // PercentMaxHPHeal
            "p2": "35", // DRPercent
            "p3": "80 / 115 / 150 / 185 / 220 (+ 총 공격력의 100% + 주문력의 100%)", // Damage
            "p4": "0.5", // SlowDuration
            "p5": "80%", // SlowPercent*100
            "p6": "140 / 215 / 290 / 365 / 440 (+ 총 공격력의 240% + 주문력의 240%)", // WallHitDamage
            "p7": "1.5", // WallStunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16",
            "cost": "",
            "stats": {
                "사거리": "400"
            }
        },
        "R": {
            "p1": "150 / 250 / 350 (+ 주문력의 130%)", // Damage
            "p2": "1.5", // FearDuration
            "p3": "총 공격력의 20%", // TotalResists
            "p4": "?", // LifeStealPercent*100
            "p5": "10 / 20 / 30%", // ExtraMoveSpeedPercent*100
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
            "p1": "70 / 100 / 130 / 160 / 190 (+ 주문력의 65%)", // TotalDamage
            "p2": "1.75", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "70",
            "stats": {
                "사거리": "1050"
            }
        },
        "W": {
            "p1": "75 / 120 / 165 / 210 / 255 (+ 주문력의 70%)", // TotalDamage
            "p2": "75 / 120 / 165 / 210 / 255 (+ 주문력의 70%) x 1.25", // EmpoweredDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "900"
            }
        },
        "E": {
            "p1": "55 / 80 / 105 / 130 / 155 (+ 주문력의 60%)", // EDamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "90",
            "stats": {
                "사거리": "625"
            }
        },
        "R": {
            "p1": "100 / 175 / 250 (+ 주문력의 30%)", // TotalDamage
            "p2": "30 / 45 / 60", // SlowAmount
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
            "p1": "80 / 100 / 120 / 140 / 160 (+ 주문력의 60%)", // BaseDamageTooltip
            "p2": "20 / 25 / 30 / 35 / 40 (+ 주문력의 35%)", // BaseHealTooltip
            "p3": "10 ~ 60 (레벨에 따라)", // MovementSpeedOnQ2
            "p4": "2.5", // Effect8Amount
            "p5": "80 / 100 / 120 / 140 / 160 (+ 주문력의 60%) x 1.85", // EmpoweredDamageTooltip
            "p6": "30 ~ 200 (레벨에 따라) x 1", // EmpoweredHealTooltip
            "p7": "5% (+ 주문력의 4%) x 1", // EmpoweredHealPercentTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 7.9 / 6.8 / 5.7 / 4.6",
            "cost": "-",
            "stats": {
                "사거리": "600"
            }
        },
        "W": {
            "p1": "37.5%", // HasteBoost*100
            "p2": "1", // HasteDuration
            "p3": "40%", // MoveSpeedMod*-100
            "p4": "80 / 135 / 190 / 245 / 300 (+ 최대 체력의 15%)", // TotalDamage
            "p5": "80 / 135 / 190 / 245 / 300 (+ 최대 체력의 15%) x 0.3", // TotalHeal
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "28 / 25 / 22 / 19 / 16",
            "cost": "",
            "stats": {
                "사거리": "350"
            }
        },
        "E": {
            "p1": "최대 체력의 8%", // ChargeHealthTooltip
            "p2": "30 / 45 / 60 / 75 / 90 (+ 최대 체력의 1.5% + 주문력의 35%)", // MinDamageTooltip
            "p3": "60 / 90 / 120 / 150 / 180 (+ 최대 체력의 6% + 주문력의 80%)", // MaxDamageTooltip
            "p4": "40 / 45 / 50 / 55 / 60", // SlowPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 11 / 9 / 7 / 5",
            "cost": "",
            "stats": {
                "사거리": "600"
            }
        },
        "R": {
            "p1": "4", // Effect4Amount
            "p2": "10", // Effect2Amount
            "p3": "150 / 250 / 350 (+ 주문력의 70%)", // Damage
            "p4": "150 / 250 / 350 (+ 주문력의 70%) x 0.4", // SecondaryHealingTooltip
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
            "p1": "110 / 160 / 210 / 260 / 310 (+ 주문력의 120%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 19 / 18 / 17 / 16",
            "cost": "100",
            "stats": {
                "사거리": "1079"
            }
        },
        "W": {
            "p1": "5", // Duration
            "p2": "60 / 65 / 70 / 75 / 80%", // MoveSpeedMod*100
            "p3": "30 / 40 / 50 / 60 / 70%", // AttackSpeedMod*100
            "p4": "1.5", // SlowDuration
            "p5": "30%", // MoveSpeedModReduction*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15",
            "cost": "75",
            "stats": {
                "사거리": "1"
            }
        },
        "E": {
            "p1": "1", // CCDuration
            "p2": "총 공격력의 200% (+ 주문력의 25%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7 / 6.5 / 6 / 5.5 / 5",
            "cost": "25",
            "stats": {
                "사거리": "300"
            }
        },
        "R": {
            "p1": "50 / 100 / 150 (+ 주문력의 30 / 40 / 50% + 최대 마나의 2%)", // PassiveDamage
            "p2": "275 / 400 / 525 (+ 주문력의 100%)", // ActiveDamage
            "p3": "0.5", // SilenceDuration
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
            "p1": "2 / 3 / 4 / 5 / 6%", // TotalPercentHealthOnHit
            "p2": "총 공격력의 20% (+ 주문력의 15%)", // SecondAttackDamage
            "p3": "150%", // HealModVsChamps*100
            "p4": "25 / 40 / 55 / 70 / 85 (+ 총 공격력의 70%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "5 / 4.5 / 4 / 3.5 / 3",
            "cost": "-",
            "stats": {
                "사거리": "600"
            }
        },
        "W": {
            "p1": "10%", // SelfSlowPercent*100
            "p2": "80 / 135 / 190 / 245 / 300 (+ 주문력의 100%)", // TotalDamage
            "p3": "?", // Stunduration
            "p4": "1.25", // MaxStunTT
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8",
            "cost": "-",
            "stats": {
                "사거리": "400"
            }
        },
        "E": {
            "p1": "8", // MistDuration
            "p2": "?", // TotalMoveSpeed
            "p3": "30 / 35 / 40 / 45 / 50%", // AttackSpeed*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 12 / 10 / 8 / 6",
            "cost": "-",
            "stats": {
                "사거리": "750"
            }
        },
        "R": {
            "p1": "99%", // SlowPercent*100
            "p2": "총 공격력의 120%", // TotalDamage
            "p3": "12 / 16 / 20 (+ 총 공격력의 5%)", // TotalPercentHealth
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
            "p1": "60 / 75 / 90 / 105 / 120 (+ 주문력의 40%)", // TotalMissileDamage
            "p2": "2.5", // BuffDuration
            "p3": "40 ~ 140 (레벨에 따라) (+ 주문력의 25%)", // ShieldLevelScaling
            "p4": "20 / 45 / 70 / 95 / 120 (+ 주문력의 50% + 총 공격력의 100%)", // AttackTotalDMG
            "p5": "40 ~ 140 (레벨에 따라) (+ 주문력의 25%) x 1.6", // TotalAugmentedShieldValue
            "p6": "30", // AugmentMoveSpeedBonus
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "45 / 50 / 55 / 60 / 65",
            "stats": {
                "사거리": "600"
            }
        },
        "W": {
            "p1": "4", // FieldDuration
            "p2": "33 / 36 / 39 / 42 / 45", // SlowPotency*-1
            "p3": "1.5", // StunDuration
            "p4": "20", // AugmentSlow
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "17 / 16 / 15 / 14 / 13",
            "cost": "65",
            "stats": {
                "사거리": "800"
            }
        },
        "E": {
            "p1": "70 / 110 / 150 / 190 / 230 (+ 주문력의 50%)", // LaserDamage
            "p2": "20 / 50 / 80 / 110 / 140 (+ 주문력의 80%)", // AftershockDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "525"
            }
        },
        "R": {
            "p1": "6.5", // StormDuration
            "p2": "100 / 175 / 250 (+ 주문력의 50%)", // InitialBurstDamage
            "p3": "65 / 105 / 145 (+ 주문력의 35%)", // SubsequentBurstDamage
            "p4": "25%", // AugmentBoost*100
            "p5": "3", // Tooltip_DurationExtension
            "p6": "6", // MaxGrowths
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
            "p1": "30 / 55 / 80 / 105 / 130 (+ 총 공격력의 100%)", // BaseDamage
            "p2": "9", // HealthDamagePercent
            "p3": "20 / 25 / 30 / 35 / 40", // Slow_
            "p4": "1", // DelayBetweenTwoHits
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 7 / 6 / 5 / 4",
            "cost": "35 / 40 / 45 / 50 / 55",
            "stats": {
                "사거리": "430"
            }
        },
        "W": {
            "p1": "방어력의 12%", // BonusArmor
            "p2": "치명타 확률의 12%", // BonusMR
            "p3": "40%", // PassiveEmpoweredHealthPercent*100
            "p4": "40", // Haste
            "p5": "2", // Duration
            "p6": "2", // GroundingDuration
            "p7": "25%", // SlowAmount*-100
            "p8": "70 / 110 / 150 / 190 / 230 (+ 주문력의 70%)", // InterruptDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "50",
            "stats": {
                "사거리": "400"
            }
        },
        "E": {
            "p1": "40 / 60 / 80 / 100 / 120 (+ 총 공격력의 60%)", // TackleDamage
            "p2": "1.6 / 1.7 / 1.8 / 1.9 / 2", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "70",
            "stats": {
                "사거리": "475"
            }
        },
        "R": {
            "p1": "4", // ChannelMaxDuration
            "p2": "15", // SelfSlow
            "p3": "200 / 300 / 400 (+ 총 공격력의 90%)", // Damage
            "p4": "200 / 300 / 400 (+ 총 공격력의 90%) x 0.5", // HalfDamage
            "p5": "1", // KnockupDurationSnap
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
            "p1": "0 / 5 / 10 / 15 / 20 (+ 총 공격력의 110%)", // DamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6 / 5 / 4 / 3 / 2",
            "cost": "30",
            "stats": {
                "사거리": "950"
            }
        },
        "W": {
            "p1": "0.75", // SlashDuration
            "p2": "20 / 35 / 50 / 65 / 80 (+ 총 공격력의 50%)", // DamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "30 / 28 / 26 / 24 / 22",
            "cost": "60",
            "stats": {
                "사거리": "325"
            }
        },
        "E": {
            "p1": "50 / 60 / 70 / 80 / 90 (+ 총 공격력의 20%)", // DashDamage
            "p2": "5", // AttackSpeedDuration
            "p3": "20 / 25 / 30 / 35 / 40%", // BonusAttackSpeed*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "40",
            "stats": {
                "사거리": "600"
            }
        },
        "R": {
            "p1": "20 / 40 / 60 (+ 총 공격력의 30%)", // DamageCalc
            "p2": "100%", // LifestealMod*100
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
            "p1": "30 / 45 / 60 / 75 / 90 (+ 총 공격력의 40 / 50 / 60 / 70 / 80%)", // MinDamageTotal
            "p2": "90 / 155 / 220 / 285 / 350 (+ 총 공격력의 120 / 150 / 180 / 210 / 240%)", // MaxDamageTotal
            "p3": "1.25", // BaseStunTime
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "45",
            "stats": {
                "사거리": "10000"
            }
        },
        "W": {
            "p1": "4", // HPPerKill
            "p2": "15", // HPPerChampKill
            "p3": "60 / 75 / 90 / 105 / 120 (+ 주문력의 40% + 최대 체력의 8 / 10 / 12 / 14 / 16%)", // TotalShield
            "p4": "3", // DetonateRecastCooldown
            "p5": "40 / 65 / 90 / 115 / 140 (+ 주문력의 40%)", // TotalDamage
            "p6": "14", // MaxHPDamageRatio
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "75 / 80 / 85 / 90 / 95",
            "stats": {
                "사거리": "500"
            }
        },
        "E": {
            "p1": "65 / 100 / 135 / 170 / 205 (+ 주문력의 55%)", // TotalDamage
            "p2": "2.5", // SlowDuration
            "p3": "40 / 45 / 50 / 55 / 60", // SlowAmount
            "p4": "4", // ArmorShredDuration
            "p5": "25", // ArmorShred
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "35 / 40 / 45 / 50 / 55",
            "stats": {
                "사거리": "800"
            }
        },
        "R": {
            "p1": "150 / 300 / 450 (+ 총 공격력의 60%)", // MinDamageTotal
            "p2": "400 / 800 / 1200 (+ 총 공격력의 120%)", // MaxDamageTotal
            "p3": "0.75", // MinStunDuration
            "p4": "1.75", // MaxStunDuration
            "p5": "40 / 45 / 50", // SlowAmount
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
            "p1": "40 / 60 / 80 / 100 / 120 (+ 주문력의 40%)", // Damage
            "p2": "1.5", // SlowDuration
            "p3": "15 / 20 / 25 / 30 / 35%", // SlowAmountCalc
            "p4": "60 / 115 / 170 / 225 / 280 (+ 주문력의 80%)", // ExplosionDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "55",
            "stats": {
                "사거리": "775"
            }
        },
        "W": {
            "p1": "75 / 110 / 145 / 180 / 215 (+ 주문력의 60%)", // MinDamage
            "p2": "20 / 40 / 60 / 80 / 100 (+ 주문력의 30% + 최대 체력의 5%)", // MinHealing
            "p3": "20 / 40 / 60 / 80 / 100 (+ 주문력의 30% + 최대 체력의 5%) x 2", // MaxHealing
            "p4": "40%", // MaxExecuteThreshold*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 10.5 / 9 / 7.5 / 6",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "400"
            }
        },
        "E": {
            "p1": "80 / 130 / 180 / 230 / 280 (+ 주문력의 80%)", // Damage
            "p2": "0.5", // KnockUpDuration
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
            "p2": "40", // MinimumEnemyCooldown
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
            "p1": "2.5 / 2.75 / 3 / 3.25 / 3.5", // StealthDuration
            "p2": "25 / 35 / 45 / 55 / 65 (+ 총 공격력의 60%)", // TotalDamage
            "p3": "100 + 0.6 x 이동 속도의 100% + -1%", // QCritDamageMod
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 12.5 / 12 / 11.5 / 11",
            "cost": "40",
            "stats": {
                "사거리": "400"
            }
        },
        "W": {
            "p1": "2", // ArmTime
            "p2": "40 (+ 주문력의 10%)", // TrapDuration
            "p3": "0.5 / 0.75 / 1 / 1.25 / 1.5", // FearDuration
            "p4": "2", // MinionFearDuration
            "p5": "10 / 15 / 20 / 25 / 30 (+ 주문력의 12%)", // AoEDamage
            "p6": "25 / 40 / 55 / 70 / 85 (+ 주문력의 18%)", // STDamage
            "p7": "20 / 35 / 50 / 65 / 80", // MonsterBonusDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15",
            "cost": "70 / 65 / 60 / 55 / 50",
            "stats": {
                "사거리": "500"
            }
        },
        "E": {
            "p1": "2", // SlowDurationPassive
            "p2": "20 / 22.5 / 25 / 27.5 / 30%", // SlowAmount*-100
            "p3": "70 / 95 / 120 / 145 / 170 (+ 총 공격력의 80% + 주문력의 60%)", // TotalDamage
            "p4": "3", // SlowDurationActive
            "p5": "30%", // ExecuteHealthThreshold*100
            "p6": "70 / 95 / 120 / 145 / 170 (+ 총 공격력의 80% + 주문력의 60%) x 1.5", // TotalExecuteDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8",
            "cost": "75",
            "stats": {
                "사거리": "625"
            }
        },
        "R": {
            "p1": "18", // CloneLifetime
            "p2": "150 / 225 / 300 (+ 주문력의 70%)", // ExplosionTotalDamage
            "p3": "60%", // CloneAADamagePercent*100
            "p4": "50%", // CloneIncomingDamagePercent*100
            "p5": "10 / 20 / 30 (+ 주문력의 10%)", // AoEDamage
            "p6": "25 / 50 / 75 (+ 주문력의 15%)", // STDamage
            "p7": "1", // BoxFearDuration
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
            "p1": "30 / 55 / 80 / 105 / 130 (+ 총 공격력의 60%)", // TotalDamage
            "p2": "1 / 1.25 / 1.5 / 1.75 / 2", // SlowDuration
            "p3": "15% (+ 주문력의 0.07% + 총 공격력의 0.15%)", // TotalSlow
            "p4": "40 / 60 / 80 / 100 / 120 (+ 주문력의 35% + 총 공격력의 40%)", // TotalHeal
            "p5": "1", // CDReductionOnHit
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": {
                "사거리": "600"
            }
        },
        "W": {
            "p1": "70 / 110 / 150 / 190 / 230 (+ 총 공격력의 90%)", // Damage
            "p2": "1", // DelayTime
            "p3": "1.25 / 1.5 / 1.75 / 2 / 2.25", // RootDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "1250"
            }
        },
        "E": {
            "p1": "6 / 6.5 / 7 / 7.5 / 8", // BuffDuration
            "p2": "20% (+ 주문력의 0.05%)", // TotalMS
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "26 / 24.5 / 23 / 21.5 / 20",
            "cost": "70",
            "stats": {
                "사거리": "400"
            }
        },
        "R": {
            "p1": "250 / 400 / 550 (+ 주문력의 70% + 총 공격력의 115%)", // TotalDamage
            "p2": "3", // ShieldDuration
            "p3": "120 / 160 / 200 (+ 주문력의 50% + 1.5 (중첩당))", // TotalShield
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
            "p1": "60 / 85 / 110 / 135 / 160 (+ 주문력의 40%)", // ExplosionDamage
            "p2": "25%", // ExecuteThreshold*100
            "p3": "60 / 85 / 110 / 135 / 160 (+ 주문력의 40%) x 1.75", // TotalEmpoweredDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "900"
            }
        },
        "W": {
            "p1": "2.5", // ShieldDuration
            "p2": "20% (+ 주문력의 0.02%) x 0.4", // HasteValueAllies
            "p3": "20% (+ 주문력의 0.02%)", // WMSBonusTotal
            "p4": "60 / 80 / 100 / 120 / 140 (+ 주문력의 20%) x 1", // ShieldValueSeraphine
            "p5": "2.5", // WHealSplitDelay
            "p6": "8 / 10 / 12 / 14 / 16", // WMissingHPHeal
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "22",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "800"
            }
        },
        "E": {
            "p1": "70 / 100 / 130 / 160 / 190 (+ 주문력의 50%)", // FinalDamage
            "p2": "1.1 / 1.2 / 1.3 / 1.4 / 1.5", // SlowDuration
            "p3": "99", // SlowValue
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10.5 / 10 / 9.5 / 9",
            "cost": "60",
            "stats": {
                "사거리": "1300"
            }
        },
        "R": {
            "p1": "1.25 / 1.5 / 1.75", // RChannelDuration
            "p2": "150 / 200 / 250 (+ 주문력의 40%)", // R1TotalDamage
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
            "p1": "90 / 140 / 190 / 240 / 290 (+ 주문력의 75%)", // TotalDamageTooltip
            "p2": "0.5", // KnockupDurationTOOLTIPONLY
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "18 / 16.5 / 15 / 13.5 / 12",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "650"
            }
        },
        "W": {
            "p1": "5 / 15 / 25 / 35 / 45 (+ 주문력의 30% + 최대 체력의 4%)", // FirstHitDamageTooltip
            "p2": "5 / 25 / 45 / 65 / 85 (+ 주문력의 60% + 최대 체력의 8%)", // SecondHitDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "60",
            "stats": {
                "사거리": "600"
            }
        },
        "E": {
            "p1": "55 / 105 / 155 / 205 / 255 (+ 주문력의 70%)", // TotalDamage
            "p2": "1", // CCDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "1.5",
            "cost": "20",
            "stats": {
                "사거리": "560"
            }
        },
        "R": {
            "p1": "1", // BaseStunDuration
            "p2": "125 / 150 / 175 (+ 주문력의 40%)", // MinorDamageTooltip
            "p3": "1.5", // EmpoweredStunDuration
            "p4": "2", // ZoneDuration
            "p5": "80", // ExplosionSlowAmount
            "p6": "200 / 300 / 400 (+ 주문력의 80%)", // TotalDamageTooltip
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
            "p1": "1.5", // MSDuration
            "p2": "30%", // MSAmount*100
            "p3": "10 / 20 / 30 / 40 / 50", // BaseDamage
            "p4": "1% (+ 총 공격력의 0.01 / 0.015 / 0.02 / 0.025 / 0.03%)", // MaxHealthDamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "-"
        },
        "W": {
            "p1": "100%", // DamageStored*100
            "p2": "최대 체력의 50%", // MaxGrit
            "p3": "4", // AdrenalineStorageWindow
            "p4": "100%", // ShieldConversion*100
            "p5": "3", // ShieldMaxDuration
            "p6": "80 / 100 / 120 / 140 / 160", // DamageCalc
            "p7": "25% (+ 총 공격력의 0.25%)", // DamageConversion
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
            "p1": "50 / 70 / 90 / 110 / 130 (+ 총 공격력의 60%)", // DamageCalc
            "p2": "0.5", // SlowDuration
            "p3": "70%", // SlowAmount*100
            "p4": "1", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 14.5 / 13 / 11.5 / 10",
            "cost": "-",
            "stats": {
                "사거리": "490"
            }
        },
        "R": {
            "p1": "200 / 300 / 400 (+ 총 공격력의 120%)", // DamageCalc
            "p2": "40 / 50 / 60%", // MaxHealthDamage*100
            "p3": "1", // SlowDuration
            "p4": "99%", // SlowAmount*100
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
            "p1": "50 / 85 / 120 / 155 / 190 (+ 주문력의 40%)", // TotalDamage
            "p2": "3", // AuraDuration
            "p3": "5", // OnHitDuration
            "p4": "10 / 15 / 20 / 25 / 30 (+ 주문력의 10%)", // TotalOnHitDamage
            "p5": "30 ~ 30 (레벨에 따라) (+ 주문력의 30%)", // TotalStaccatoDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "825"
            }
        },
        "W": {
            "p1": "30 / 45 / 60 / 75 / 90 (+ 주문력의 30%)", // TotalHeal
            "p2": "3", // AuraDuration
            "p3": "1.5", // ShieldDuration
            "p4": "25 / 45 / 65 / 85 / 105 (+ 주문력의 25%)", // TotalShield
            "p5": "25 / 45 / 65 / 85 / 105", // AccelerandoShieldBreakpoint
            "p6": "3", // DiminuendoDuration
            "p7": "25% (+ 주문력의 0.04%)", // TotalDiminuendoWeakenPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10",
            "cost": "80 / 85 / 90 / 95 / 100",
            "stats": {
                "사거리": "1000"
            }
        },
        "E": {
            "p1": "3", // SelfMovementSpeedDurationMin
            "p2": "20% (+ 주문력의 0.02%)", // TotalSelfMovementSpeed
            "p3": "7", // SelfMovementSpeedDurationMax
            "p4": "3", // AuraDuration
            "p5": "3", // AllyMovementSpeedDuration
            "p6": "10 / 12 / 14 / 16 / 18% (+ 주문력의 0.02%)", // TotalAllyMovementSpeed
            "p7": "2", // TempoDuration
            "p8": "50% (+ 주문력의 0.04%)", // TotalTempoMoveSpeedSlow
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14",
            "cost": "65",
            "stats": {
                "사거리": "430"
            }
        },
        "R": {
            "p1": "1.5", // StunDuration
            "p2": "150 / 250 / 350 (+ 주문력의 50%)", // TotalDamage
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
            "p1": "85 / 120 / 155 / 190 / 225 (+ 주문력의 35%)", // TotalDamage
            "p2": "1.5", // SlowDuration
            "p3": "30%", // MoveSpeedSlow*100
            "p4": "?", // HoTDuration
            "p5": "?", // TotalHoT
            "p6": "20 / 22.5 / 25 / 27.5 / 30%", // MoveSpeedHaste*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 7 / 6 / 5 / 4",
            "cost": "45 / 50 / 55 / 60 / 65",
            "stats": {
                "사거리": "810"
            }
        },
        "W": {
            "p1": "90 / 110 / 130 / 150 / 170 (+ 주문력의 50%)", // TotalHeal
            "p2": "80 / 85 / 90 / 95 / 100%", // PercentHealthCostRefund*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6 / 5 / 4 / 3 / 2",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "550"
            }
        },
        "E": {
            "p1": "70 / 95 / 120 / 145 / 170 (+ 주문력의 40%)", // TotalDamage
            "p2": "1.5", // RootDelay
            "p3": "1 / 1.25 / 1.5 / 1.75 / 2", // RootDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 19 / 18 / 17 / 16",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "925"
            }
        },
        "R": {
            "p1": "150 / 250 / 350 (+ 주문력의 50%)", // HealingCalc
            "p2": "150 / 250 / 350 (+ 주문력의 50%) x 1.5", // AmpedHealing
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
            "p1": "2", // SlowDuration
            "p2": "25 / 30 / 35 / 40 / 45", // SlowPercent
            "p3": "3", // NumEnhancedAttacks
            "p4": "10 ~ 40 (레벨에 따라)", // BaseFlatDamage
            "p5": "2 / 2.5 / 3 / 3.5 / 4% (+ 주문력의 1.5%)", // BasePercentHealth
            "p6": "5 / 5.5 / 6 / 6.5 / 7% (+ 주문력의 2%)", // EmpPercentHealth
            "p7": "50", // SteroidAS
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 7.25 / 6.5 / 5.75 / 5",
            "cost": "140 / 130 / 120 / 110 / 100",
            "stats": {
                "사거리": "400"
            }
        },
        "W": {
            "p1": "1.75", // ZoneDuration
            "p2": "2", // ZoneDelay
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
            "p2": "1.5", // CCDuration
            "p3": "60 / 85 / 110 / 135 / 160 (+ 최대 체력의 11%)", // TauntDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "18 / 16 / 14 / 12 / 10",
            "cost": "150",
            "stats": {
                "사거리": "600"
            }
        },
        "R": {
            "p1": "5", // ShieldDuration
            "p2": "120 / 220 / 320 (+ 최대 체력의 15% + 주문력의 135%)", // Shield
            "p3": "120 / 220 / 320 (+ 최대 체력의 15% + 주문력의 135%) x 1.6", // MaxShield
            "p4": "3", // ChannelDuration
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
            "p1": "1% (+ 총 공격력의 0.011%)", // Calc_Max_Health_Damage
            "p2": "0.5", // Cooldown_Reduction
            "p3": "? (+ 총 공격력의 110% + 주문력의 30%)", // Calc_Damage
            "p4": "4", // RecastDuration
            "p5": "? (+ 총 공격력의 110% + 주문력의 30%) x 1.5", // Calc_Dragon_Form_Damage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "-",
            "stats": {
                "사거리": "25000"
            }
        },
        "W": {
            "p1": "2.5", // Duration
            "p2": "60 / 80 / 100 / 120 / 140 (+ 최대 체력의 12%)", // Calc_Shield
            "p3": "60 / 80 / 100 / 120 / 140 (+ 최대 체력의 12%) x 0.3", // Calc_Shield_Per_Nearby_Champion
            "p4": "25%", // MoveSpeed
            "p5": "25% x 1.75", // MoveSpeedTowardsEnemies
            "p6": "80 / 100 / 120 / 140 / 160 (+ 주문력의 65%)", // Damage
            "p7": "60 ~ 100 (레벨에 따라)", // Calc_Base_Heal
            "p8": "4 ~ 8% (레벨에 따라)", // Calc_Missing_Health_Heal
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 12.25 / 11.5 / 10.75 / 10",
            "cost": "-",
            "stats": {
                "사거리": "350"
            }
        },
        "E": {
            "p1": "50 / 65 / 80 / 95 / 110 (+ 주문력의 60 / 65 / 70 / 75 / 80%)", // Damage
            "p2": "5%", // Calc_Max_Health_Damage
            "p3": "2", // SlowDuration
            "p4": "30%", // Calc_Slow
            "p5": "50 / 65 / 80 / 95 / 110 (+ 주문력의 60 / 65 / 70 / 75 / 80%) x 1.25", // Calc_Dragon_Damage
            "p6": "5% x 1.25", // Calc_Max_Health_Dragon_Damage
            "p7": "30% x 1", // Calc_Slow_Dragon
            "p8": "2", // GroundLingerDuration
            "p9": "15 ~ 25 (레벨에 따라) (+ 주문력의 5%)", // DamagePerSecond
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "-",
            "stats": {
                "사거리": "800"
            }
        },
        "R": {
            "p1": "1.25", // Fury_Generation
            "p2": "300% (+ -100)", // TT_Fury_Mult
            "p3": "100% (+ -1 x 0.25)", // TT_Fury_AoE_Penalty
            "p4": "150 / 250 / 350 (+ 주문력의 100%)", // Damage
            "p5": "0.75", // FearDuration
            "p6": "150 / 250 / 350", // Calc_Bonus_Health
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
            "p1": "60 / 70 / 80 / 90 / 100 (+ 총 공격력의 130%)", // TotalDamage
            "p2": "15", // ManaRestore
            "p3": "25", // StackTier1
            "p4": "125", // StackTier2
            "p5": "50", // Tier2_BlowbackPercentageDamage
            "p6": "2 (+ 0.008 (중첩당))", // Tier2_NumberOfBlowback
            "p7": "225", // StackTier3
            "p8": "3", // Tier3_DotLength
            "p9": "총 공격력의 0.025%% (+ 0.005 (중첩당))", // Tier3_Burn
            "p10": "6.5%", // Tier3_ExecuteThreshold
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "5.5 / 5 / 4.5 / 4 / 3.5",
            "cost": "25",
            "stats": {
                "사거리": "550"
            }
        },
        "W": {
            "p1": "60 / 70 / 80 / 90 / 100 (+ 총 공격력의 60%)", // InitialDamage
            "p2": "1.5", // SlowDuration
            "p3": "35%", // SlowAmount*100
            "p4": "10 / 35 / 60 / 85 / 110 (+ 총 공격력의 50% + 주문력의 80%)", // ExplosionDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "1500"
            }
        },
        "E": {
            "p1": "1.25", // Duration
            "p2": "75%", // MoveSpeed*100
            "p3": "5 (+ 0.01 (중첩당))", // TotalNumberOfAttacks
            "p4": "10 / 15 / 20 / 25 / 30 (+ 총 공격력의 30%)", // DamagePerHit
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "24 / 22 / 20 / 18 / 16",
            "cost": "65",
            "stats": {
                "사거리": "700"
            }
        },
        "R": {
            "p1": "150 / 250 / 350 (+ 총 공격력의 100% + 주문력의 100%)", // TotalDamage
            "p2": "150 / 250 / 350 (+ 총 공격력의 100% + 주문력의 100%) x 1.5", // TooltipOnly_TotalSweetspotDamage
            "p3": "2", // SlowDuration
            "p4": "40%", // SlowAmount*100
            "p5": "100 / 135 / 170 (+ 총 공격력의 50% + 주문력의 75%)", // MomHealCalc
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
            "p1": "60 / 90 / 120 / 150 / 180 (+ 주문력의 45%)", // InitialDamage
            "p2": "60 / 90 / 120 / 150 / 180 (+ 주문력의 45%) x 0.25", // ExtraBoltDamage
            "p3": "60 / 90 / 120 / 150 / 180 (+ 주문력의 45%) x 2", // MaxDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7 / 6 / 5 / 4 / 3",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "750"
            }
        },
        "W": {
            "p1": "70 / 105 / 140 / 175 / 210 (+ 주문력의 60%)", // TotalDamage
            "p2": "1.5", // SlowDuration
            "p3": "50%", // Slow*-100
            "p4": "6", // RevealDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "22 / 21 / 20 / 19 / 18",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "5500 / 6000 / 6500 / 7000 / 7500"
            }
        },
        "E": {
            "p1": "90 / 130 / 170 / 210 / 250 (+ 주문력의 70%)", // SecondaryDamage
            "p2": "1.5", // RootDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "850"
            }
        },
        "R": {
            "p1": "15 / 25 / 35 (+ 주문력의 4%)", // DamageCalc
            "p2": "15 / 30 / 45 (+ 주문력의 5% + 최대 체력의 1.5%)", // HealingCalc
            "p3": "2", // DemonflareCastDelay
            "p4": "8", // DemonflareCooldownTooltip
            "p5": "150 / 250 / 350 (+ 주문력의 40%)", // DemonflareDamageTotal
            "p6": "50%", // DemonflareSlowAmount*100
            "p7": "1.5", // DemonflareSlowDuration
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
            "p1": "20 / 25 / 30 / 35 / 40%", // AttackSpeed*100
            "p2": "10 / 20 / 30 / 40 / 50 (+ 총 공격력의 90% + 최대 체력의 3%)", // AbilityDamage
            "p3": "11%", // MaxHPPercent*100
            "p4": "1", // SlowDuration
            "p5": "40%", // SlowPercent*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 6.75 / 5.5 / 4.25 / 3",
            "cost": "30",
            "stats": {
                "사거리": "400"
            }
        },
        "W": {
            "p1": "2.5", // ShieldDuration
            "p2": "최대 체력의 8%", // InitialShield
            "p3": "50 / 70 / 90 / 110 / 130 (+ 주문력의 80%)", // Damage
            "p4": "1", // SlowDuration
            "p5": "20%", // SlowEffect*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "700"
            }
        },
        "E": {
            "p1": "30 / 60 / 90 / 120 / 150 (+ 총 공격력의 120% + 최대 체력의 6%)", // PinDamage
            "p2": "1.1", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "22 / 21 / 20 / 19 / 18",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "1700"
            }
        },
        "R": {
            "p1": "150 / 250 / 350 (+ 주문력의 100%)", // Damage
            "p2": "1.5", // Duration
            "p3": "1.5", // SpeedBoostDuration
            "p4": "40%", // SpeedBoostAmount*100
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
            "p1": "60 / 85 / 110 / 135 / 160 (+ 총 공격력의 70% + 주문력의 60%)", // TotalDamage
            "p2": "40%", // FallOffMinimum*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "55 / 60 / 65 / 70 / 75",
            "stats": {
                "사거리": "1200"
            }
        },
        "W": {
            "p1": "4", // BuffDuration
            "p2": "20 / 25 / 30 / 35 / 40%", // RicochetAttackSpeed*100
            "p3": "총 공격력의 40 / 42.5 / 45 / 47.5 / 50%", // BounceDamage
            "p4": "8", // MaxBounces
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12",
            "cost": "60",
            "stats": {
                "사거리": "20"
            }
        },
        "E": {
            "p1": "1.5", // SpellShieldDuration
            "p2": "총 공격력의 60 / 65 / 70 / 75 / 80% (+ 주문력의 50%)", // TotalHeal
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "24 / 22.5 / 21 / 19.5 / 18",
            "cost": "",
            "stats": {
                "사거리": "20"
            }
        },
        "R": {
            "p1": "8 / 10 / 12", // UltDuration
            "p2": "20 / 25 / 30%", // MaxMS*100
            "p3": "0.5", // AttackCooldownRefund
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
            "p1": "15 / 30 / 45 / 60 / 75 (+ 총 공격력의 40%)", // BonusDamage
            "p2": "0.75", // KnockUpDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7 / 6.5 / 6 / 5.5 / 5",
            "cost": "30",
            "stats": {
                "사거리": "375"
            }
        },
        "W": {
            "p1": "30 / 40 / 50 / 60 / 70 (+ 총 공격력의 30%)", // SlashDamage
            "p2": "50 / 85 / 120 / 155 / 190 (+ 총 공격력의 90% + 주문력의 65%)", // ThrustDamage
            "p3": "1.5 (+ 주문력의 0.5%)", // TotalSlowDuration
            "p4": "50%", // Effect6Amount*-100
            "p5": "3", // MarkDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "60",
            "stats": {
                "사거리": "1000"
            }
        },
        "E": {
            "p1": "50 / 75 / 100 / 125 / 150 (+ 주문력의 120%)", // ChargeDamage
            "p2": "0.5", // SlowDuration
            "p3": "30", // SlowAmount
            "p4": "5", // ASDuration
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
            "p1": "3", // MarkDuration
            "p2": "75 / 175 / 275 (+ 총 공격력의 100% + 주문력의 110%)", // TotalDamage
            "p3": "15%", // PercentCurrentHealthDamage*100
            "p4": "4", // MissileDefenseBaseDuration
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
            "p1": "90 / 125 / 160 / 195 / 230 (+ 주문력의 70%)", // TotalDamage
            "p2": "6", // SphereDuration
            "p3": "2", // Upgrade1MaxAmmo
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "800"
            }
        },
        "W": {
            "p1": "70 / 100 / 130 / 160 / 190 (+ 주문력의 65%)", // ThrowDamage
            "p2": "?", // f2
            "p3": "25", // TotalSlowAmount
            "p4": "12% (+ 주문력의 2%)", // TOOLTIPONLYPassiveBonusPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "925"
            }
        },
        "E": {
            "p1": "60 / 95 / 130 / 165 / 200 (+ 주문력의 60%)", // TotalDamage
            "p2": "1.25", // StunDuration
            "p3": "1.25", // UpgradedSlowDuration
            "p4": "70%", // UpgradedSlowAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15",
            "cost": "50",
            "stats": {
                "사거리": "650"
            }
        },
        "R": {
            "p1": "10", // QHastePerRank
            "p2": "80 / 120 / 160 (+ 주문력의 20%)", // DamageCalc
            "p3": "80 / 120 / 160 (+ 주문력의 20%) x 7", // MaxDamageCalc
            "p4": "15%", // UpgradeExecuteThreshold*100
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
            "p1": "20 / 30 / 40 / 50 / 60 (+ 주문력의 42.5%)", // DamagePerSecond
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0",
            "cost": "13",
            "stats": {
                "사거리": "20"
            }
        },
        "W": {
            "p1": "3", // WDuration
            "p2": "50 / 55 / 60 / 65 / 70", // SlowPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "17 / 16 / 15 / 14 / 13",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "1000"
            }
        },
        "E": {
            "p1": "50 / 60 / 70 / 80 / 90 (+ 주문력의 55%)", // BaseDamage
            "p2": "6 / 6.5 / 7 / 7.5 / 8", // MaxHPDamage
            "p3": "1 / 1.25 / 1.5 / 1.75 / 2", // RootDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "125"
            }
        },
        "R": {
            "p1": "25", // Duration
            "p2": "25 / 55 / 85", // StatAmount
            "p3": "1", // GrievousDuration
            "p4": "40%", // GrievousAmount*100
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
            "p1": "1.5", // TauntLength
            "p2": "100 / 150 / 200 / 250 / 300 (+ 주문력의 90%)", // TotalDamage
            "p3": "2", // HitBonusCooldown
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "19 / 16.5 / 14 / 11.5 / 9",
            "cost": "70",
            "stats": {
                "사거리": "1075"
            }
        },
        "W": {
            "p1": "4", // ShieldDuration
            "p2": "50 / 70 / 90 / 110 / 130 (+ 2 (중첩당))", // TotalShield
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "21 / 20 / 19 / 18 / 17",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "950"
            }
        },
        "E": {
            "p1": "1.7 (중첩당)", // PAttackDamageMin
            "p2": "1.7 (중첩당) (+ 총 공격력의 90 / 120 / 150 / 180 / 210%)", // PAttackDamageMax
            "p3": "1", // SlowDuration
            "p4": "20 / 25 / 30 / 35 / 40", // ActiveSlowPercentage
            "p5": "75 / 120 / 165 / 210 / 255 (+ 주문력의 70%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 12.25 / 11.5 / 10.75 / 10",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "500"
            }
        },
        "R": {
            "p1": "2", // SlowDuration
            "p2": "99", // SlowAmount
            "p3": "250 / 400 / 550 (+ 주문력의 100%)", // TotalDamage
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
            "p1": "35 / 60 / 85 / 110 / 135 (+ 주문력의 50%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7",
            "cost": "55 / 65 / 75 / 85 / 95",
            "stats": {
                "사거리": "970"
            }
        },
        "W": {
            "p1": "40 / 60 / 80 / 100 / 120 (+ 주문력의 40%)", // SingleFireDamage
            "p2": "40 / 60 / 80 / 100 / 120 (+ 주문력의 40%) x 0.4", // MultiFireDamage
            "p3": "40%", // MovementSpeed*100
            "p4": "2", // MovementSpeedDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "30",
            "stats": {
                "사거리": "700"
            }
        },
        "E": {
            "p1": "1.2 / 1.35 / 1.5 / 1.65 / 1.8", // CharmDuration
            "p2": "80 / 120 / 160 / 200 / 240 (+ 주문력의 85%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12",
            "cost": "60",
            "stats": {
                "사거리": "975"
            }
        },
        "R": {
            "p1": "3", // RMaxTargetsPerCast
            "p2": "75 / 125 / 175 (+ (?))", // RCalculatedDamage
            "p3": "15", // RRecastWindow
            "p4": "3", // RMaxCasts
            "p5": "10", // PDurationExtension
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
            "p1": "1", // StunDuration
            "p2": "70 / 95 / 120 / 145 / 170 (+ 주문력의 85%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "3",
            "cost": "50",
            "stats": {
                "사거리": "1100"
            }
        },
        "W": {
            "p1": "10", // BaseDamage
            "p2": "1 / 1.25 / 1.5 / 1.75 / 2 (+ 주문력의 0.5%)", // TotalHealthDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "1",
            "cost": "8",
            "stats": {
                "사거리": "300"
            }
        },
        "E": {
            "p1": "5 / 7 / 9 / 11 / 13 (+ 방어력의 3% + 치명타 확률의 3%)", // DamageReduction
            "p2": "0.75", // CDROnHit
            "p3": "65 / 95 / 125 / 155 / 185 (+ 주문력의 50%)", // TantrumDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "35",
            "stats": {
                "사거리": "350"
            }
        },
        "R": {
            "p1": "1.5", // RDuration
            "p2": "200 / 300 / 400 (+ 주문력의 80%)", // RCalculatedDamage
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
            "p1": "3.25 / 3.25 / 3.25 / 3.25 / 9999", // MaxChannelDuration
            "p2": "45 / 60 / 75 / 90 / 105 (+ 주문력의 55%)", // DamagePerSecond
            "p3": "50%", // AOEModifier*100
            "p4": "60 / 70 / 80 / 90 / 100 (+ 주문력의 30%)", // BurstDamage
            "p5": "0.031% (중첩당)", // BurstBonusTrueDamageToChamps
            "p6": "2", // QMassStolen
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "3",
            "cost": "35 / 40 / 45 / 50 / 55",
            "stats": {
                "사거리": "750"
            }
        },
        "W": {
            "p1": "8 / 9 / 10 / 11 / 12%", // TrueDamageBonus*100
            "p2": "3", // ResetWindow
            "p3": "90", // TooltipTakedownCooldownMultiplier
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "22 / 20.5 / 19 / 17.5 / 16",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "1500"
            }
        },
        "E": {
            "p1": "10 / 15 / 20 / 25 / 30 (+ 주문력의 12%)", // DamagePerSecond
            "p2": "5", // Duration
            "p3": "5 (+ 0.026 (중첩당))", // CurrentExecutionThreshold
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12",
            "cost": "90",
            "stats": {
                "사거리": "750"
            }
        },
        "R": {
            "p1": "150 / 250 / 350 (+ 주문력의 75%)", // MaxDamageTooltip
            "p2": "1", // StunDuration
            "p3": "5", // MassStolen
            "p4": "75", // CalamityStacks
            "p5": "150 / 250 / 350 (+ 주문력의 75%) x 1.25", // R2Damage
            "p6": "150 / 250 / 350 (+ 주문력의 75%) x 0.9", // ShockwaveDamage
            "p7": "50%", // ShockwaveSlow*100
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
            "p1": "80 / 125 / 170 / 215 / 260 (+ 주문력의 70%)", // TotalDamage
            "p2": "1.6 / 1.7 / 1.8 / 1.9 / 2", // RootDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "60",
            "stats": {
                "사거리": "1125"
            }
        },
        "W": {
            "p1": "3", // BuffDuration
            "p2": "20 / 27.5 / 35 / 42.5 / 50 (+ 주문력의 20%)", // TotalDamage
            "p3": "1.5", // AllyBuffDuration
            "p4": "10 / 15 / 20 / 25 / 30 (+ 주문력의 10%)", // TotalAllyDamage
            "p5": "8", // RevealDuration
            "p6": "45", // MaxBrushDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0.5",
            "cost": "30",
            "stats": {
                "사거리": "1150"
            }
        },
        "E": {
            "p1": "75 / 115 / 155 / 195 / 235 (+ 주문력의 50%)", // TotalShield
            "p2": "2", // ShieldDuration
            "p3": "70 / 90 / 110 / 130 / 150 (+ 주문력의 80%)", // TotalDamage
            "p4": "2", // SlowDuration
            "p5": "40 / 45 / 50 / 55 / 60%", // SlowAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "70",
            "stats": {
                "사거리": "750"
            }
        },
        "R": {
            "p1": "45", // DaisyDuration
            "p2": "90 / 140 / 190 (+ 주문력의 50%)", // TotalShockwaveDamage
            "p3": "1", // ShockwaveCCDuration
            "p4": "3", // ShockwaveCD
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
            "p1": "60 / 80 / 100 / 120 / 140 (+ 주문력의 35 / 40 / 45 / 50 / 55%)", // TotalDamage
            "p2": "25%", // SlowAmount*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 12 / 10 / 8 / 6",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": {
                "사거리": "740"
            }
        },
        "W": {
            "p1": "10", // Effect1Amount
            "p2": "50 / 65 / 80 / 95 / 110 (+ 0 ~ 0 (레벨에 따라) + 주문력의 35 / 42.5 / 50 / 57.5 / 65%)", // TotalDamage
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
            "p1": "1.5", // Effect6Amount
            "p2": "70 / 110 / 150 / 190 / 230 (+ 주문력의 60%)", // TotalShield
            "p3": "70 / 110 / 150 / 190 / 230 (+ 주문력의 60%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "22 / 20.5 / 19 / 17.5 / 16",
            "cost": "60",
            "stats": {
                "사거리": "1100"
            }
        },
        "R": {
            "p1": "200 / 400 / 600 (+ 주문력의 75%)", // TotalDamage
            "p2": "5", // Effect4Amount
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
            "p1": "45 / 70 / 95 / 120 / 145 (+ 총 공격력의 65% + 주문력의 60%)", // Damage
            "p2": "0.5", // SlowDuration
            "p3": "50%", // SlowPercentage*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "1.5",
            "cost": "110 / 100 / 90 / 80 / 70",
            "stats": {
                "사거리": "550"
            }
        },
        "W": {
            "p1": "5 / 5.5 / 6 / 6.5 / 7", // BaseDuration
            "p2": "30 / 35 / 40 / 45 / 50", // MovementSpeed
            "p3": "2", // MovementSpeedDuration
            "p4": "100", // EnergyRestore
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 19 / 18 / 17 / 16",
            "cost": "",
            "stats": {
                "사거리": "350"
            }
        },
        "E": {
            "p1": "21 / 42 / 63 / 84 / 105 (+ 총 공격력의 100% + 주문력의 110%)", // E1Damage
            "p2": "49 / 98 / 147 / 196 / 245 (+ 총 공격력의 100% + 주문력의 110%)", // E2DamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 14.5 / 13 / 11.5 / 10",
            "cost": "30",
            "stats": {
                "사거리": "825"
            }
        },
        "R": {
            "p1": "110 / 220 / 330 (+ 총 공격력의 50% + 주문력의 30%)", // Cast1Damage
            "p2": "2.5", // CooldownBetweenCasts
            "p3": "70 / 140 / 210 (+ 주문력의 30%)", // Cast2DamageMin
            "p4": "70 / 140 / 210 (+ 주문력의 30%) x 3", // Cast2DamageMax
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
            "p1": "45 / 75 / 105 / 135 / 165 (+ 총 공격력의 70%)", // FinalDamage
            "p2": "20% (+ 주문력의 0.05%)", // TotalHaste
            "p3": "1", // HasteDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "850"
            }
        },
        "W": {
            "p1": "1", // GameModeInteger
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "18 / 14 / 10 / 6 / 2",
            "cost": "40 / 30 / 20 / 10 / 0",
            "stats": {
                "사거리": "5500"
            }
        },
        "E": {
            "p1": "8 / 16 / 24 / 32 / 40 (+ 총 공격력의 25%)", // DamageToDeal
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "18 / 16.5 / 15 / 13.5 / 12",
            "cost": "70",
            "stats": {
                "사거리": "800"
            }
        },
        "R": {
            "p1": "2.5", // ChannelDuration
            "p2": "5 / 6 / 7", // NumberOfBullets
            "p3": "25 / 35 / 45 (+ 총 공격력의 15%)", // DamagePerBulletWithCrit
            "p4": "25 / 35 / 45 (+ 총 공격력의 15%) x 3", // MaxDamagePerBullet
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
            "p1": "10 / 25 / 40 / 55 / 70 (+ 총 공격력의 60 / 67.5 / 75 / 82.5 / 90%)", // QDamage
            "p2": "10 / 25 / 40 / 55 / 70 (+ 총 공격력의 60 / 67.5 / 75 / 82.5 / 90%) x 1.75", // QEdgeDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 12 / 10 / 8 / 6",
            "cost": "-",
            "stats": {
                "사거리": "25000"
            }
        },
        "W": {
            "p1": "1.5", // WSlowDuration
            "p2": "25 / 27.5 / 30 / 32.5 / 35%", // WSlowPercentage*-100
            "p3": "30 / 40 / 50 / 60 / 70 (+ 총 공격력의 40%)", // WDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "-",
            "stats": {
                "사거리": "825"
            }
        },
        "E": {
            "p1": "16% (+ 최대 체력의 1.1%)", // TotalEVamp
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "-",
            "stats": {
                "사거리": "25000"
            }
        },
        "R": {
            "p1": "3", // RMinionFearDuration
            "p2": "60 / 80 / 100%", // RMovementSpeedBonus*100
            "p3": "10", // RDuration
            "p4": "20 / 30 / 40%", // RTotalADAmp*100
            "p5": "50 / 75 / 100%", // RHealingAmp*100
            "p6": "5", // RExtension
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
            "p1": "125 / 175 / 225 (+ 총 공격력의 20% + 주문력의 100%)", // MaxDamage
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
            "p1": "1", // KnockupDuration
            "p2": "60 / 100 / 140 / 180 / 220 (+ 주문력의 80%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "365"
            }
        },
        "W": {
            "p1": "55 / 110 / 165 / 220 / 275 (+ 주문력의 100%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "650"
            }
        },
        "E": {
            "p1": "5", // Duration
            "p2": "80 / 110 / 140 / 170 / 200 (+ 주문력의 70%)", // TotalDamage
            "p3": "5", // MaxStacks
            "p4": "1", // StunDuration
            "p5": "20 ~ 20 (레벨에 따라)", // AttackBonusDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "350"
            }
        },
        "R": {
            "p1": "7", // RDuration
            "p2": "55 / 65 / 75", // RDamageReduction
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
            "p1": "40 / 60 / 80 / 100 / 120 (+ 총 공격력의 60%)", // Calc_Damage_1_Max
            "p2": "4 / 4.5 / 5 / 5.5 / 6% (+ 총 공격력의 0.03%)", // Calc_Damage_1_Percent_Max
            "p3": "50%", // Calc_Damage_1_Min_Ratio
            "p4": "50 / 75 / 100 / 125 / 150 (+ 총 공격력의 90%)", // Calc_Damage_2_Max
            "p5": "4 / 4.5 / 5 / 5.5 / 6% (+ 총 공격력의 0.04%)", // Calc_Damage_2_Percent_Max
            "p6": "50%", // Calc_Damage_2_Min_Ratio
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "70",
            "stats": {
                "사거리": "650"
            }
        },
        "W": {
            "p1": "1.5", // Shield_Duration
            "p2": "50 ~ 320 (레벨에 따라) (+ 총 공격력의 150%)", // Calc_Shield
            "p3": "0.5", // Buff_Duration
            "p4": "50 / 75 / 100 / 125 / 150 (+ 총 공격력의 50%)", // Calc_Damage_Low
            "p5": "50 / 75 / 100 / 125 / 150 (+ 총 공격력의 50%) x 1.5", // Calc_Damage_High
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "18 / 17 / 16 / 15 / 14",
            "cost": "70",
            "stats": {
                "사거리": "325"
            }
        },
        "E": {
            "p1": "40 / 60 / 80 / 100 / 120 (+ 총 공격력의 50%)", // Calc_Damage_Flat
            "p2": "99%", // Slow_Amount*100
            "p3": "1", // Slow_Duration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "70",
            "stats": {
                "사거리": "325"
            }
        },
        "R": {
            "p1": "10 / 20 / 30%", // Armor_Penetration*100
            "p2": "15 / 17.5 / 20% (+ (?))", // Calc_Omnivamp
            "p3": "0.75", // Suppress_Duration
            "p4": "150 / 250 / 350 (+ 총 공격력의 80%)", // Calc_Damage
            "p5": "0.4", // Stun_Duration
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
            "p1": "80 / 125 / 170 / 215 / 260 (+ 주문력의 80%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "4",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "625"
            }
        },
        "W": {
            "p1": "70 / 110 / 150 / 190 / 230 (+ 주문력의 80%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "600"
            }
        },
        "E": {
            "p1": "3", // ShieldDuration
            "p2": "60 / 95 / 130 / 165 / 200 (+ 주문력의 40%)", // ShieldBlockTotal
            "p3": "20 ~ 50% (레벨에 따라)", // MoveSpeedCalc
            "p4": "1.5", // MovementSpeedDuration
            "p5": "25 / 35 / 45 / 55 / 65 (+ 주문력의 40%)", // DamageReturn
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "800"
            }
        },
        "R": {
            "p1": "10 / 15 / 20%", // RPercentPenBuff*100
            "p2": "150 / 275 / 400 (+ 주문력의 75%)", // InitialBurstDamage
            "p3": "45", // TibbersLifetime
            "p4": "8 / 12 / 16 (+ 주문력의 4%)", // TibbersAuraDamage
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
            "p1": "50 / 70 / 90 / 110 / 130 (+ 주문력의 25%)", // TotalPassthroughDamage
            "p2": "3", // SlowDuration
            "p3": "1.1 / 1.2 / 1.3 / 1.4 / 1.5", // StunDuration
            "p4": "60 / 95 / 130 / 165 / 200 (+ 주문력의 45%)", // TotalExplosionDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "80 / 85 / 90 / 95 / 100",
            "stats": {
                "사거리": "1075"
            }
        },
        "W": {
            "p1": "400 / 500 / 600 / 700 / 800", // WallWidth
            "p2": "5", // WallDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "17",
            "cost": "70",
            "stats": {
                "사거리": "1000"
            }
        },
        "E": {
            "p1": "55 / 80 / 105 / 130 / 155 (+ 주문력의 55%)", // TotalDamage
            "p2": "55 / 80 / 105 / 130 / 155 (+ 주문력의 55%) x 2", // EmpoweredDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "4",
            "cost": "50",
            "stats": {
                "사거리": "650"
            }
        },
        "R": {
            "p1": "1.5", // GrowthTime
            "p2": "30 / 45 / 60 (+ 주문력의 12.5%)", // TotalDamagePerSecond
            "p3": "20 / 30 / 40", // SlowAmount
            "p4": "30 / 45 / 60", // SlowPercentEmpoweredTT
            "p5": "30 / 45 / 60 (+ 주문력의 12.5%) x 3", // EmpoweredDamagePerSecondTooltipOnly
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
            "p1": "4", // StackDuration
            "p2": "4", // MaxStacks
            "p3": "6", // BuffDuration
            "p4": "20 / 30 / 40 / 50 / 60", // BonusAS
            "p5": "총 공격력의 110 / 115 / 120 / 125 / 130%", // EmpoweredDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0",
            "cost": "30",
            "stats": {
                "사거리": "400"
            }
        },
        "W": {
            "p1": "7 / 8 / 9 / 10 / 11", // NumberOfArrowsTooltip
            "p2": "60 / 95 / 130 / 165 / 200 (+ 총 공격력의 100%)", // TotalDamage
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
            "p1": "200 / 400 / 600 (+ 주문력의 120%)", // RMainDamage
            "p2": "3.5", // MaxStunDuration
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
            "p1": "20 / 45 / 70 / 95 / 120 (+ 총 공격력의 105%)", // TotalDamage
            "p2": "6", // GatheringStormDuration
            "p3": "1", // KnockUpDurationTOOLTIPONLY
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
            "p1": "70 / 85 / 100 / 115 / 130 (+ 총 공격력의 20% + 주문력의 60%)", // TotalDamage
            "p2": "5", // StackDuration
            "p3": "70 / 85 / 100 / 115 / 130 (+ 총 공격력의 20% + 주문력의 60%) x 0.25", // BonusDamagePerStack
            "p4": "4", // MaxStacks
            "p5": "10 / 9 / 8 / 7 / 6", // Effect2Amount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0.5 / 0.4 / 0.3 / 0.2 / 0.1",
            "cost": "-",
            "stats": {
                "사거리": "475"
            }
        },
        "R": {
            "p1": "200 / 350 / 500 (+ 총 공격력의 150%)", // Damage
            "p2": "1", // RKnockupDuration
            "p3": "15", // RBuffDuration
            "p4": "60", // RPercentArmorPen
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
            "p1": "80 / 95 / 110 / 125 / 140 (+ 주문력의 30%)", // InitialDamage
            "p2": "40 / 45 / 50 / 55 / 60%", // SlowPercent*-100
            "p3": "40 / 65 / 90 / 115 / 140 (+ 주문력의 60%)", // RecallDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8.5 / 8 / 7.5 / 7",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "1075"
            }
        },
        "W": {
            "p1": "30%", // BelowHealthThreshold*100
            "p2": "3% (+ 주문력의 3%)", // MissingHealthPercent
            "p3": "1.5", // SlowZoneDuration
            "p4": "40", // SlowPercent
            "p5": "2.25", // StunDuration
            "p6": "100 / 120 / 140 / 160 / 180 (+ 주문력의 150%)", // TotalShield
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "22 / 20 / 18 / 16 / 14",
            "cost": "30 / 35 / 40 / 45 / 50",
            "stats": {
                "사거리": "1600"
            }
        },
        "E": {
            "p1": "50 / 75 / 100 / 125 / 150 (+ 주문력의 40%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8.5 / 8 / 7.5 / 7",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "325"
            }
        },
        "R": {
            "p1": "200 / 350 / 500 (+ 주문력의 175%)", // TotalDamage
            "p2": "100 / 150 / 200 (+ 주문력의 60%)", // TotalBaseHeal
            "p3": "3", // PercentHealAmpPerPercentMissingHealth
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
            "p1": "40 / 70 / 100 / 130 / 160", // BaseDamage
            "p2": "4% (+ 주문력의 3%)", // HumanPercentHealth
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
            "p1": "1.6 / 1.8 / 2 / 2.2 / 2.4", // TotalStunDuration
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
            "p1": "135 / 145 / 155 / 165 / 175", // AttackRangeBonus
            "p2": "20 / 45 / 70 / 95 / 120 (+ 총 공격력의 50%)", // BonusDamageTT
            "p3": "3", // ShredDuration
            "p4": "10 / 15 / 20 / 25 / 30%", // ArmorShredPercent*100
            "p5": "0.5", // CooldownDecrease
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "20",
            "stats": {
                "사거리": "250 / 275 / 300 / 325 / 350"
            }
        },
        "W": {
            "p1": "1", // StealthDuration
            "p2": "4", // CloneDuration
            "p3": "40 / 45 / 50 / 55 / 60%", // CloneDamageMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "22 / 21 / 20 / 19 / 18",
            "cost": "60 / 55 / 50 / 45 / 40",
            "stats": {
                "사거리": "275"
            }
        },
        "E": {
            "p1": "2", // ExtraTargets
            "p2": "80 / 120 / 160 / 200 / 240 (+ 주문력의 100%)", // TotalDamage
            "p3": "5", // AttackSpeedDuration
            "p4": "40 / 45 / 50 / 55 / 60%", // AttackSpeed*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9.25 / 8.5 / 7.75 / 7",
            "cost": "30 / 35 / 40 / 45 / 50",
            "stats": {
                "사거리": "650"
            }
        },
        "R": {
            "p1": "20%", // MoveSpeed*100
            "p2": "2", // SpinDuration
            "p3": "0.6", // KnockupDuration
            "p4": "총 공격력의 137.5% x 2", // TotalDamageTT
            "p5": "4 / 6 / 8% x 2", // PercentHPDamageTT
            "p6": "8", // RecastWindow
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
            "p2": "3.5", // MarkDuration
            "p3": "67.5 / 105 / 142.5 / 180 / 217.5 (+ 주문력의 40%)", // Q2DamageMax
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8.5 / 8 / 7.5 / 7",
            "cost": "60",
            "stats": {
                "사거리": "900"
            }
        },
        "W": {
            "p1": "1 / 1.15 / 1.3 / 1.45 / 1.6", // InvisDuration
            "p2": "20 / 25 / 30 / 35 / 40", // MoveSpeedBonus
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "22 / 21 / 20 / 19 / 18",
            "cost": "80",
            "stats": {
                "사거리": "700"
            }
        },
        "E": {
            "p1": "70 / 110 / 150 / 190 / 230 (+ 주문력의 70%)", // DamageCalc
            "p2": "80%", // SlowPercent*-100
            "p3": "1", // SlowDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "80",
            "stats": {
                "사거리": "825"
            }
        },
        "R": {
            "p1": "175 / 275 / 375 (+ 주문력의 70%)", // DamageCalc
            "p2": "30%", // SlowPercent*-100
            "p3": "2.5 / 3.25 / 4", // AreaDuration
            "p4": "3.5 / 4.25 / 5", // RBuffDuration
            "p5": "1.5 / 1.75 / 2", // StunDuration
            "p6": "50%", // ExitSlowPercent*-100
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
            "p1": "20 / 45 / 70 / 95 / 120 (+ 총 공격력의 110%)", // TotalDamage
            "p2": "2", // SlowDuration
            "p3": "40", // SlowAmount
            "p4": "4", // PillarDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8.5 / 8 / 7.5 / 7",
            "cost": "45",
            "stats": {
                "사거리": "800"
            }
        },
        "W": {
            "p1": "0.75", // BreathDuration
            "p2": "12 / 13 / 14 / 15 / 16", // MaxPercentHPPerTickTooltip
            "p3": "3", // BrittleDuration
            "p4": "9 ~ 17% (레벨에 따라)", // BrittlePercentMaxHPCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "45 / 50 / 55 / 60 / 65",
            "stats": {
                "사거리": "25000"
            }
        },
        "E": {
            "p1": "80 / 125 / 170 / 215 / 260 (+ 방어력의 40% + 치명타 확률의 40%)", // TotalDamage
            "p2": "1.25", // KnockupDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13.5 / 13 / 12.5 / 12",
            "cost": "35 / 40 / 45 / 50 / 55",
            "stats": {
                "사거리": "450"
            }
        },
        "R": {
            "p1": "125 / 175 / 225 (+ 주문력의 20%)", // RDamageCalc
            "p2": "3", // BrittleDurationTOOLTIPONLY
            "p3": "40 / 50 / 60", // RSlowPercentBasePreMath
            "p4": "1", // RStunDuration
            "p5": "1 x 0.5", // MinStun
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
            "p1": "60 / 90 / 120 / 150 / 180 (+ 주문력의 55%)", // TotalDamageTooltip
            "p2": "30", // ReducedDamagePercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7 / 6 / 5 / 4 / 3",
            "cost": "35",
            "stats": {
                "사거리": "815"
            }
        },
        "W": {
            "p1": "70 / 110 / 150 / 190 / 230 (+ 주문력의 80%)", // TotalDamage
            "p2": "3", // FieldDuration
            "p3": "20 / 25 / 30 / 35 / 40%", // SlowAmount*100
            "p4": "20 / 25 / 30 / 35 / 40%", // HasteAmount*100
            "p5": "2", // SlowAndHasteDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "225"
            }
        },
        "E": {
            "p1": "6 / 12 / 18 / 24 / 30", // DefenseBonus
            "p2": "2.5", // ShieldDuration
            "p3": "55 / 90 / 125 / 160 / 195 (+ 주문력의 45%)", // TotalShieldTooltip
            "p4": "60 / 90 / 120 / 150 / 180 (+ 주문력의 30%)", // TotalDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9",
            "cost": "60",
            "stats": {
                "사거리": "1095"
            }
        },
        "R": {
            "p1": "225 / 350 / 475 (+ 주문력의 110%)", // TotalDamage
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
            "p1": "70 / 120 / 170 / 220 / 270 (+ 총 공격력의 100%)", // TotalDamage
            "p2": "3", // MaxSlowDuration
            "p3": "30 / 35 / 40 / 45 / 50%", // SlowAmount*100
            "p4": "4", // DebuffDuration
            "p5": "20%", // ShredAmount*100
            "p6": "2.5", // TooltipCDRefund
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "1000"
            }
        },
        "W": {
            "p1": "5", // Duration
            "p2": "40 / 50 / 60 / 70 / 80%", // Attackspeed*100
            "p3": "2.5", // ShieldDuration
            "p4": "10 / 40 / 70 / 100 / 130", // BaseShield
            "p5": "17.5%", // ShieldPercMissingHP*100
            "p6": "30%", // ThresholdForMax*100
            "p7": "10 / 40 / 70 / 100 / 130 (+ 최대 체력의 0.175 x 1%)", // MaxShieldCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "50",
            "stats": {
                "사거리": "700"
            }
        },
        "E": {
            "p1": "70 / 115 / 160 / 205 / 250 (+ 총 공격력의 50%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "",
            "stats": {
                "사거리": "325"
            }
        },
        "R": {
            "p1": "10 / 15 / 20", // Resists
            "p2": "3", // Duration
            "p3": "10 / 20 / 30 (+ 총 공격력의 25%)", // AD
            "p4": "2.5", // DurationExtension
            "p5": "1", // HasteDuration
            "p6": "20 / 45 / 70%", // Haste*100
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
            "p1": "25 / 50 / 75 / 100 / 125 (+ 총 공격력의 110%)", // QDamage
            "p2": "6", // BuffDuration
            "p3": "0.75", // Q3KnockupDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "4",
            "cost": "-",
            "stats": {
                "사거리": "450"
            }
        },
        "W": {
            "p1": "5 / 10 / 15 / 20 / 25", // BaseDamage*0.5
            "p2": "4 / 4.5 / 5 / 5.5 / 6", // MaxHealthDamage*50
            "p3": "1.5", // ShieldDuration
            "p4": "40 ~ 90 (레벨에 따라) (+ (?))", // WShield
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14",
            "cost": "-",
            "stats": {
                "사거리": "700"
            }
        },
        "E": {
            "p1": "5", // ReturnTimer
            "p2": "10%", // StartingMS*100
            "p3": "30%", // MovementSpeed*100
            "p4": "25 / 27.5 / 30 / 32.5 / 35%", // DeathmarkPercent*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "22 / 19 / 16 / 13 / 10",
            "cost": "-",
            "stats": {
                "사거리": "25000"
            }
        },
        "R": {
            "p1": "200 / 400 / 600 (+ 총 공격력의 80%) x 0.5", // TooltipDamage
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
            "p1": "30 / 50 / 70 / 90 / 110 (+ 총 공격력의 50%)", // BonusDamage
            "p2": "10 ~ 10 (레벨에 따라)", // QHeal
            "p3": "6 / 7 / 8 / 9 / 10", // MissingHealthRatio
            "p4": "50", // HealReduction
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6 / 5.5 / 5 / 4.5 / 4",
            "cost": "20"
        },
        "W": {
            "p1": "2 / 2 / 3 / 3 / 4", // WallHealthTooltip
            "p2": "4", // CircleDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "70",
            "stats": {
                "사거리": "600"
            }
        },
        "E": {
            "p1": "6 / 6.5 / 7 / 7.5 / 8% (+ 주문력의 3%)", // Calc_HealthDamage
            "p2": "1.5", // SlowDuration
            "p3": "30%", // Calc_Slow
            "p4": "4", // MarkDuration
            "p5": "13 / 16 / 19 / 22 / 25%", // ArmorShred*100
            "p6": "18 / 21 / 24 / 27 / 30%", // HasteAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "700"
            }
        },
        "R": {
            "p1": "1050 ~ 1050 (레벨에 따라) (+ 최대 체력의 60%)", // YorickBigGhoulHealth
            "p2": "50 / 75 / 100 (+ 총 공격력의 30%)", // YorickBigGhoulDamage
            "p3": "2 / 3 / 4", // RGhoulNumbers
            "p4": "2 / 2.5 / 3", // RMarkDamagePercent
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
            "p1": "4", // AttackSpeedDurationBase
            "p2": "20 / 32 / 44 / 56 / 68%", // AttackSpeedBase*100
            "p3": "6 / 12 / 18 / 24 / 30 (+ 총 공격력의 20% + 최대 체력의 1 / 1.2 / 1.4 / 1.6 / 1.8%)", // OnHitDamage
            "p4": "3 / 4 / 5 / 6 / 7% (+ 총 공격력의 0.035%)", // MaxHPOnHit1
            "p5": "50", // AttackRange
            "p6": "20 / 32 / 44 / 56 / 68% (+ (?))", // EmpoweredTotalAS
            "p7": "3 / 4 / 5 / 6 / 7% (+ 2 ~ 4 (레벨에 따라) + 총 공격력의 0.05% + 최대 체력의 0.001%)", // Q2TotalOnHitHPDamage
            "p8": "주문력의 0.006% x 1%", // EmpoweredLightningBonusMax
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6",
            "cost": "20",
            "stats": {
                "사거리": "600"
            }
        },
        "W": {
            "p1": "4", // ShieldDuration
            "p2": "45 / 65 / 85 / 105 / 125 (+ 최대 체력의 2 / 2.3 / 2.6 / 2.9 / 3.2% + 주문력의 40% + 총 공격력의 50%)", // TotalShield
            "p3": "15 / 16 / 17 / 18 / 19%", // LifeSteal*100
            "p4": "최대 체력의 1.2% (+ 주문력의 8%)", // LifeOnHit
            "p5": "20 ~ 150 (레벨에 따라) (+ 45 / 65 / 85 / 105 / 125 + 주문력의 65% + 최대 체력의 8% + 총 공격력의 100%)", // RecastShield
            "p6": "20 ~ 150 (레벨에 따라) (+ 45 / 65 / 85 / 105 / 125 + 주문력의 65% + 최대 체력의 8% + 총 공격력의 100%) x 0.5", // RecastHeal
            "p7": "30 / 32 / 34 / 36 / 38", // LifeSteal*200
            "p8": "최대 체력의 1.2% (+ 주문력의 8%) x 2", // LifeOnHitAwakened
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6",
            "cost": "40"
        },
        "E": {
            "p1": "25 / 31 / 37 / 43 / 49% (+ 총 공격력의 0.05%)", // MoveSpeed
            "p2": "4", // MoveSpeedDuration
            "p3": "0.75", // StunDuration
            "p4": "6 / 5.6 / 5.2 / 4.8 / 4.4", // ICD
            "p5": "1.5", // UnstoppableDuration
            "p6": "30 ~ 40% (레벨에 따라) (+ 총 공격력의 0.1%)", // MoveSpeedBonus
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6",
            "cost": "40",
            "stats": {
                "사거리": "600"
            }
        },
        "R": {
            "p1": "4", // BuffDuration
            "p2": "20 / 36 / 52 (+ 주문력의 35%)", // StormDamage
            "p3": "15 / 18 / 21%", // SlowPotency*100
            "p4": "10 ~ 40 (레벨에 따라) (+ 주문력의 35%)", // PulseDamage
            "p5": "8 ~ 14% (레벨에 따라) (+ 주문력의 0.035%)", // PercentHPBlast
            "p6": "5%", // EmpoweredSlow
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
            "p1": "25 / 70 / 115 / 160 / 205 (+ 총 공격력의 70%)", // TotalDamage
            "p2": "1.25", // SlowDuration
            "p3": "45 / 50 / 55 / 60 / 65%", // SlowAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "70",
            "stats": {
                "사거리": "800"
            }
        },
        "W": {
            "p1": "3", // WAttacksPerSecond
            "p2": "12 (+ 총 공격력의 20 / 23.5 / 27 / 30.5 / 34%)", // DamagePerShot
            "p3": "40", // SlowResistance
            "p4": "125", // MoveSpeedMod
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 9 / 6 / 3 / 0",
            "cost": "40 / 30 / 20 / 10 / 0",
            "stats": {
                "사거리": "490"
            }
        },
        "E": {
            "p1": "4", // EShieldDuration
            "p2": "55 / 75 / 95 / 115 / 135 (+ 총 공격력의 135% + 최대 체력의 13.5%)", // ETotalShieldHealth
            "p3": "1.5", // StunDuration
            "p4": "90 / 120 / 150 / 180 / 210 (+ 총 공격력의 100%)", // EDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 15.5 / 15 / 14.5 / 14",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "475"
            }
        },
        "R": {
            "p1": "100 / 225 / 350 (+ 총 공격력의 50%)", // RCalculatedDamage
            "p2": "4", // RSlowDuration
            "p3": "75", // RMoveSpeedMod
            "p4": "25", // RHealthThreshold
            "p5": "1.5", // RFearDuration
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
            "p1": "총 공격력의 120% (+ 주문력의 100%)", // BaseBiteDamage
            "p2": "6 / 7 / 8 / 9 / 10", // TargetPercentHPDamage
            "p3": "25 / 37.5 / 50 / 62.5 / 75", // LifestealPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "80 / 85 / 90 / 95 / 100",
            "stats": {
                "사거리": "365"
            }
        },
        "W": {
            "p1": "35 / 42.5 / 50 / 57.5 / 65", // PassiveMSBonus
            "p2": "70 / 80 / 90 / 100 / 110", // PassiveASBonus
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "80 / 70 / 60 / 50 / 40",
            "cost": "55",
            "stats": {
                "사거리": "4000"
            }
        },
        "E": {
            "p1": "2.75", // DRDuration
            "p2": "35 / 40 / 45 / 50 / 55", // DRAmount
            "p3": "1", // FearDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "40",
            "stats": {
                "사거리": "375"
            }
        },
        "R": {
            "p1": "1.5", // RDuration
            "p2": "175 / 350 / 525 (+ 총 공격력의 167%)", // DamageCumulative
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
            "p1": "5 / 10 / 15 / 20 / 25 (+ 주문력의 20%)", // Calc_Passive_Damage
            "p2": "1", // Resource_Nonchampion
            "p3": "2", // Resource_Champion
            "p4": "8", // Resource_Max
            "p5": "5", // Buff_Duration
            "p6": "20 / 30 / 40 / 50 / 60%", // Calc_Attack_Speed
            "p7": "5 / 10 / 15 / 20 / 25 (+ 주문력의 20%)", // Calc_Damage
            "p8": "총 공격력의 30%", // Calc_Damage_Spread
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0",
            "cost": "30"
        },
        "W": {
            "p1": "55 / 95 / 135 / 175 / 215 (+ 총 공격력의 85% + 주문력의 50%)", // Calc_Damage_Initial
            "p2": "99%", // Calc_Slow
            "p3": "1.5", // Slow_Duration
            "p4": "55 / 95 / 135 / 175 / 215 (+ 총 공격력의 85% + 주문력의 50%) x 0.6", // Calc_Damage_Per_Second
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10",
            "cost": "60",
            "stats": {
                "사거리": "1150"
            }
        },
        "E": {
            "p1": "1.5", // Buff_Duration
            "p2": "30 / 35 / 40 / 45 / 50%", // Calc_Move_Speed
            "p3": "30 / 35 / 40 / 45 / 50% x 1.5", // Calc_Move_Speed_Enhanced
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9",
            "cost": "40"
        },
        "R": {
            "p1": "15", // Buff_Duration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "100 / 90 / 80",
            "cost": "100"
        },
    },
    "Yuumi": { // 유미
        "P": { "cooldown": "-", "cost": "-" },
        "Q": {
            "p1": "60 / 95 / 130 / 165 / 200 (+ 주문력의 20%)", // TotalMissileDamage
            "p2": "20", // SlowAmount
            "p3": "80 / 135 / 190 / 245 / 300 (+ 주문력의 30%)", // TotalMissileDamageEmpowered
            "p4": "2", // EmpoweredSlowDuration
            "p5": "50 / 53 / 56 / 59 / 62", // EmpoweredSlowAmount
            "p6": "5", // BuffDuration
            "p7": "주문력의 5% (+ 10 / 12 / 14 / 16 / 18)", // OnHitDamageCalc
            "p8": "75%", // AllyCritChanceMaxAmp*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6.5",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "25000"
            }
        },
        "W": {
            "p1": "4 / 5 / 6 / 7 / 8%", // HealAndShieldPower*100
            "p2": "3 / 4 / 5 / 6 / 7 (+ 주문력의 3%)", // HealthOnHit
            "p3": "5", // CCAttachLockout
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0",
            "cost": "-",
            "stats": {
                "사거리": "25000"
            }
        },
        "E": {
            "p1": "65 / 90 / 115 / 140 / 165 (+ 주문력의 40%)", // TotalShielding
            "p2": "3", // MSDuration
            "p3": "25 / 27.5 / 30 / 32.5 / 35 (+ 주문력의 8%)", // TotalAttackSpeed
            "p4": "20", // MSAmount
            "p5": "20 / 24 / 28 / 32 / 36", // ManaRestore
            "p6": "100%", // MaxManaPercIncrease*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10",
            "cost": "80 / 90 / 100 / 110 / 120",
            "stats": {
                "사거리": "25000"
            }
        },
        "R": {
            "p1": "3.5", // UltDuration
            "p2": "5", // NumberOfWaves
            "p3": "75 / 125 / 175 (+ 주문력의 25%)", // TotalMissileDamage
            "p4": "1.25", // CCDuration
            "p5": "10%", // BaseSlow*-100
            "p6": "10%", // BonusSlowPerWave*-100
            "p7": "30 / 50 / 70 (+ 주문력의 12%)", // TotalHealPerWave
            "p8": "30 / 50 / 70 (+ 주문력의 12%)", // EnhancedHealPerWave
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
            "p1": "5 / 25 / 45 / 65 / 85 (+ 총 공격력의 70%)", // ChampionDamage
            "p2": "총 공격력의 9 / 10 / 11 / 12 / 13%", // HealAmount
            "p3": "5 / 25 / 45 / 65 / 85 (+ 50 ~ 50 (레벨에 따라) + 총 공격력의 70%)", // MinionDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "15",
            "stats": {
                "사거리": "600"
            }
        },
        "W": {
            "p1": "1.5", // MaxDuration
            "p2": "40 ~ 70 (레벨에 따라) (+ 주문력의 7%)", // FinalPhysicalDR
            "p3": "40 ~ 70 (레벨에 따라) (+ 주문력의 7%) x 0.5", // FinalMagicDR
            "p4": "10 / 20 / 30 / 40 / 50 (+ 총 공격력의 40% + 주문력의 50%)", // MinDamageCalc
            "p5": "30 / 60 / 90 / 120 / 150 (+ 총 공격력의 120% + 주문력의 150%)", // MaxDamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "825"
            }
        },
        "E": {
            "p1": "3.5", // BuffDuration
            "p2": "0.75", // StunDuration
            "p3": "70 / 110 / 150 / 190 / 230 (+ 주문력의 100%)", // TotalDamage
            "p4": "5", // MarkDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 14.5 / 13 / 11.5 / 10",
            "cost": "50",
            "stats": {
                "사거리": "850"
            }
        },
        "R": {
            "p1": "125 / 200 / 275 (+ 주문력의 70%)", // MissileDamage
            "p2": "5", // MarkDuration
            "p3": "2.5", // ZoneDuration
            "p4": "125 / 200 / 275 (+ 주문력의 70%)", // ZoneDamage
            "p5": "1.5", // CCDuration
            "p6": "90", // SlowAmount
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
            "p1": "25 / 30 / 35 / 40 / 45 (+ 주문력의 25%)", // MissileDamage
            "p2": "15 / 25 / 35 / 45 / 55 (+ 주문력의 25%)", // TotalBonusDamage
            "p3": "3", // QStackCount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "4",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "800"
            }
        },
        "W": {
            "p1": "0.75", // SlowDuration
            "p2": "45%", // SlowAmount*100
            "p3": "1.25 / 1.5 / 1.75 / 2 / 2.25", // CharmDuration
            "p4": "4", // ShredDuration
            "p5": "35 / 37.5 / 40 / 42.5 / 45%", // MRShred*100
            "p6": "3 / 3.25 / 3.5 / 3.75 / 4", // MonsterCharm
            "p7": "250 / 300 / 350 / 400 / 450 (+ 주문력의 60%)", // MonsterDamageTotalTOOLTIP
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "1200 / 1300 / 1400 / 1500 / 1600"
            }
        },
        "E": {
            "p1": "60 / 90 / 120 / 150 / 180", // BaseDamage
            "p2": "3% (+ 주문력의 1.5%)", // PercentHealthBaseTOOLTIP
            "p3": "2", // SpeedDuration
            "p4": "30 / 35 / 40 / 45 / 50%", // SpeedAmount*100
            "p5": "80 / 120 / 160 / 200 / 240", // EmpoweredDamage
            "p6": "4% (+ 주문력의 2.5%)", // PercentHealthEmpoweredTOOLTIP
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "210"
            }
        },
        "R": {
            "p1": "125 / 250 / 375 (+ 주문력의 75%)", // Damage
            "p2": "125 / 250 / 375 (+ 주문력의 75%) x 2.4", // CritDamage
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
            "p1": "20 / 45 / 70 / 95 / 120 (+ 총 공격력의 130% + 주문력의 40%)", // Damage
            "p2": "1.5", // CDRefund
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "5.5 / 5.25 / 5 / 4.75 / 4.5",
            "cost": "28 / 31 / 34 / 37 / 40",
            "stats": {
                "사거리": "1150"
            }
        },
        "W": {
            "p1": "4", // DetonationTimeout
            "p2": "80 / 135 / 190 / 245 / 300 (+ 총 공격력의 100% + 주문력의 90%)", // Damage
            "p3": "60", // ManaReturn
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8",
            "cost": "50",
            "stats": {
                "사거리": "1150"
            }
        },
        "E": {
            "p1": "80 / 130 / 180 / 230 / 280 (+ 총 공격력의 60% + 주문력의 75%)", // Damage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "26 / 23 / 20 / 17 / 14",
            "cost": "70",
            "stats": {
                "사거리": "475"
            }
        },
        "R": {
            "p1": "350 / 550 / 750 (+ 총 공격력의 100% + 주문력의 110%)", // Damage
            "p2": "150 / 225 / 300 (+ 총 공격력의 100% + 주문력의 110%)", // DamageMinionMonster
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
            "p1": "3 / 3.5 / 4 / 4.5 / 5% (+ 총 공격력의 3.5%)", // HealthPercentTotal
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "4",
            "cost": "30",
            "stats": {
                "사거리": "400"
            }
        },
        "E": {
            "p1": "7", // SpiritDuration
            "p2": "25 / 30 / 35 / 40 / 45% (+ 총 공격력의 0.08%)", // EchoPercent
            "p3": "4", // VesselDuration
            "p4": "1.5", // SlowDuration
            "p5": "80%", // SlowAmount*100
            "p6": "4 ~ 3 (레벨에 따라)", // TimeBetweenVesselTentacleSlams
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "35 / 40 / 45 / 50 / 55",
            "stats": {
                "사거리": "900"
            }
        },
        "R": {
            "p1": "150 / 250 / 350 (+ 총 공격력의 50%)", // DamageCalc
            "p2": "8", // Duration
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
            "p1": "90 / 130 / 170 / 210 / 250 (+ 총 공격력의 145%)", // TotalDamage
            "p2": "3", // Effect3Amount
            "p3": "10 / 14 / 18 / 22 / 26%", // BaseARShred*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "45 / 50 / 55 / 60 / 65",
            "stats": {
                "사거리": "770"
            }
        },
        "W": {
            "p1": "2", // Effect5Amount
            "p2": "15 / 20 / 25 / 30 / 35%", // BaseSlowAmount*100
            "p3": "60 / 80 / 100 / 120 / 140 (+ 총 공격력의 70%)", // TotalShield
            "p4": "최대 체력의 1.3%", // BonusShield
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9",
            "cost": "30",
            "stats": {
                "사거리": "625"
            }
        },
        "E": {
            "p1": "20 / 22.5 / 25 / 27.5 / 30%", // PermanentAttackSpeed*100
            "p2": "80 / 120 / 160 / 200 / 240 (+ 주문력의 80%)", // TotalDamage
            "p3": "8", // Effect4Amount
            "p4": "20 / 22.5 / 25 / 27.5 / 30%", // BaseAuraAS*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "55",
            "stats": {
                "사거리": "860"
            }
        },
        "R": {
            "p1": "200 / 325 / 450 (+ 총 공격력의 180%)", // DamageCalc
            "p2": "3.5", // WallDuration
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
            "p1": "45 / 60 / 75 / 90 / 105 (+ 총 공격력의 50%)", // TotalDamage
            "p2": "45 / 60 / 75 / 90 / 105 (+ 총 공격력의 50%) x 0.5", // MultiHitDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "35",
            "stats": {
                "사거리": "400"
            }
        },
        "W": {
            "p1": "4", // WAttackSpeedDuration
            "p2": "35 / 40 / 45 / 50 / 55", // WAttackSpeedAmount
            "p3": "25", // BonusDamagePercent
            "p4": "1.5", // WMoveSpeedDuration
            "p5": "30", // WMoveSpeedAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "18 / 17 / 16 / 15 / 14",
            "cost": "60 / 55 / 50 / 45 / 40",
            "stats": {
                "사거리": "1000"
            }
        },
        "E": {
            "p1": "50 / 65 / 80 / 95 / 110 (+ (?))", // FeatherDamage
            "p2": "3", // FeatherThreshold
            "p3": "1.25", // RootDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "20",
            "stats": {
                "사거리": "2000"
            }
        },
        "R": {
            "p1": "200 / 300 / 400 (+ 총 공격력의 100%)", // Damage
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
            "p1": "60 / 100 / 140 / 180 / 220 (+ 주문력의 65%)", // InitialDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7 / 6.5 / 6 / 5.5 / 5",
            "cost": "55",
            "stats": {
                "사거리": "800"
            }
        },
        "W": {
            "p1": "60", // SeedDuration
            "p2": "2", // VisionGranted
            "p3": "?", // AmmoRechargeTime
            "p4": "35%", // KillAmmoRefundMinion*100
            "p5": "100%", // KillAmmoRefundChamp*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0",
            "cost": "",
            "stats": {
                "사거리": "850"
            }
        },
        "E": {
            "p1": "1 / 1.25 / 1.5 / 1.75 / 2", // RootDuration
            "p2": "60 / 95 / 130 / 165 / 200 (+ 주문력의 60%)", // TotalDamage
            "p3": "2", // SlowDurationPlantAttack
            "p4": "30", // SlowAmountPlantAttack
            "p5": "2", // MaxSlowStacks
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "1100"
            }
        },
        "R": {
            "p1": "200 / 300 / 400 (+ 주문력의 70%)", // TotalDamage
            "p2": "1", // KnockupDuration
            "p3": "50%", // EnragedBonusHealthPercent*100
            "p4": "50", // PlantDamageBonus
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
            "p1": "60 / 90 / 120 / 150 / 180 (+ 주문력의 30% + 최대 체력의 3%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 12.5 / 11 / 9.5 / 8",
            "cost": "",
            "stats": {
                "사거리": "800"
            }
        },
        "W": {
            "p1": "40 / 50 / 60 / 70 / 80", // BaseDamage
            "p2": "4 / 5 / 6 / 7 / 8% (+ 주문력의 3%)", // DisplayPercentDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "5",
            "cost": "",
            "stats": {
                "사거리": "350"
            }
        },
        "E": {
            "p1": "0.9 / 1 / 1.1 / 1.2 / 1.3", // ChannelTime
            "p2": "0.5 x 2", // MaxStun
            "p3": "60 / 105 / 150 / 195 / 240 (+ 주문력의 80%)", // Damage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "21 / 18 / 15 / 12 / 9",
            "cost": "",
            "stats": {
                "사거리": "300"
            }
        },
        "R": {
            "p1": "4", // Bounces
            "p2": "120 / 190 / 260 (+ 주문력의 40%)", // DamagePerBounce
            "p3": "120 / 190 / 260 (+ 주문력의 40%) x 0.5", // DamagePerSubsequentBounce
            "p4": "1", // SlowDuration
            "p5": "20%", // SlowAmount*100
            "p6": "50%", // EndingMS*100
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
            "p1": "15 / 30 / 45 / 60 / 75 (+ 총 공격력의 20 / 25 / 30 / 35 / 40%)", // InitialDamage
            "p2": "5 / 6 / 7 / 8 / 9%", // HealPercent*100
            "p3": "25 / 50 / 75 / 100 / 125 (+ 총 공격력의 20 / 25 / 30 / 35 / 40%)", // SecondHitDamage
            "p4": "0.75", // KnockUpDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "25",
            "stats": {
                "사거리": "25000"
            }
        },
        "W": {
            "p1": "40 / 60 / 80 / 100 / 120 (+ 총 공격력의 50%)", // InitialDamage
            "p2": "30 / 50 / 70 / 90 / 110 (+ 총 공격력의 30%)", // SecondaryDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13.5 / 13 / 12.5 / 12",
            "cost": "50",
            "stats": {
                "사거리": "850"
            }
        },
        "E": {
            "p1": "40 / 60 / 80 / 100 / 120 (+ 총 공격력의 50%)", // BaseDamageCalc
            "p2": "40 / 60 / 80 / 100 / 120 (+ 총 공격력의 50%) x 1.5", // BonusDamageCalc
            "p3": "4 / 4.5 / 5 / 5.5 / 6%", // PercentHPDamage*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "40",
            "stats": {
                "사거리": "25000"
            }
        },
        "R": {
            "p1": "10 / 20 / 30%", // ArmorPen*100
            "p2": "50%", // DamageReduction*100
            "p3": "250 / 400 / 550 (+ 총 공격력의 200%)", // DamageEndCalc
            "p4": "33%", // HealPercent*100
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
            "p1": "3", // MaxDuration
            "p2": "55 / 90 / 125 / 160 / 195 (+ 주문력의 50%)", // MinimumDamage
            "p3": "55 / 90 / 125 / 160 / 195 (+ 주문력의 50% + 3 x 10 / 15 / 20 / 25 / 30 + 주문력의 10%)", // MaxDamage
            "p4": "0.5", // BaseKnockup
            "p5": "0.5 (+ 3 x 0.25)", // MaxKnockup
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14",
            "cost": "90 / 95 / 100 / 105 / 110",
            "stats": {
                "사거리": "1075"
            }
        },
        "W": {
            "p1": "6 / 7 / 8 / 9 / 10% (+ 주문력의 0.02%)", // TotalMS
            "p2": "2", // SlowDuration
            "p3": "20 / 24 / 28 / 32 / 36% (+ 주문력의 6%)", // TotalSlow
            "p4": "55 / 85 / 115 / 145 / 175 (+ 주문력의 50%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "-1"
            }
        },
        "E": {
            "p1": "4", // ShieldDuration
            "p2": "80 / 120 / 160 / 200 / 240 (+ 주문력의 55%)", // TotalShield
            "p3": "10 / 15 / 20 / 25 / 30 (+ 주문력의 10%)", // TotalAD
            "p4": "20%", // ECDRefundforCC*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "800"
            }
        },
        "R": {
            "p1": "3", // Effect3Amount
            "p2": "100 / 150 / 200 (+ 주문력의 50%) x 3", // TotalHeal
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
            "p1": "65 / 105 / 145 / 185 / 225 (+ 총 공격력의 100%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "50",
            "stats": {
                "사거리": "700"
            }
        },
        "W": {
            "p1": "50 / 85 / 120 / 155 / 190 (+ 주문력의 60%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7 / 6 / 5 / 4 / 3",
            "cost": "30",
            "stats": {
                "사거리": "300"
            }
        },
        "E": {
            "p1": "2", // DodgeDuration
            "p2": "25", // AoEDamageReduction
            "p3": "40 / 70 / 100 / 130 / 160 (+ 주문력의 70%)", // TotalDamage
            "p4": "4", // PercentHealthDamage
            "p5": "1", // StunDuration
            "p6": "20%", // PercentIncreasedPerDodge*100
            "p7": "40 / 70 / 100 / 130 / 160 (+ 주문력의 70%) x 2", // MaxDamage
            "p8": "8", // MaxPercentHealthDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "17 / 15 / 13 / 11 / 9",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "300"
            }
        },
        "R": {
            "p1": "2.5", // PassiveFallOffTime
            "p2": "75 / 130 / 185 (+ 주문력의 60%)", // OnHitDamage
            "p3": "100 / 175 / 250 (+ 주문력의 100%)", // SwingDamageTotal
            "p4": "45 / 60 / 75 (+ 총 공격력의 40%)", // BaseArmor
            "p5": "45 / 60 / 75 (+ 총 공격력의 40%) x 0.6", // BaseMR
            "p6": "8", // Duration
            "p7": "20 / 25 / 30 (+ 총 공격력의 10%)", // BonusArmor
            "p8": "20 / 25 / 30 (+ 총 공격력의 10%) x 0.6", // BonusMR
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
            "p1": "80 / 120 / 160 / 200 / 240 (+ 총 공격력의 100%)", // TotalDamage
            "p2": "80 / 120 / 160 / 200 / 240 (+ 총 공격력의 100%) x 0.6", // PassThroughDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6",
            "cost": "75 / 70 / 65 / 60 / 55",
            "stats": {
                "사거리": "900"
            }
        },
        "W": {
            "p1": "30 / 35 / 40 / 45 / 50", // Effect3Amount
            "p2": "5", // Effect5Amount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 19 / 18 / 17 / 16",
            "cost": "40 / 35 / 30 / 25 / 20",
            "stats": {
                "사거리": "650"
            }
        },
        "E": {
            "p1": "70 / 92.5 / 115 / 137.5 / 160 (+ 총 공격력의 70%)", // TotalDamage
            "p2": "3", // ShadowHitCDR
            "p3": "1.5", // SlowDuration
            "p4": "20 / 25 / 30 / 35 / 40%", // MoveSpeedMod*-100
            "p5": "30 / 37.5 / 45 / 52.5 / 60%", // MoveSpeedModBonus*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "5 / 4.5 / 4 / 3.5 / 3",
            "cost": "40",
            "stats": {
                "사거리": "290"
            }
        },
        "R": {
            "p1": "3", // RDeathMarkDuration
            "p2": "총 공격력의 100%", // RCalculatedDamage
            "p3": "25 / 40 / 55%", // RDamageAmp*100
            "p4": "7.5", // RShadowDurationDisplayed
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
            "p1": "75 / 115 / 155 / 195 / 235 (+ 주문력의 90%)", // TooltipTotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "80 / 90 / 100 / 110 / 120",
            "stats": {
                "사거리": "750"
            }
        },
        "W": {
            "p1": "50 / 85 / 120 / 155 / 190 (+ 주문력의 65%)", // TotalDamage
            "p2": "2.5", // SlowDuration
            "p3": "25%", // SlowAmount*100
            "p4": "50 / 85 / 120 / 155 / 190 (+ 주문력의 65%) x 1.667", // SweetSpotTotalDamage
            "p5": "60 / 65 / 70 / 75 / 80%", // SweetSpotSlowAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "80 / 90 / 100 / 110 / 120",
            "stats": {
                "사거리": "1000"
            }
        },
        "E": {
            "p1": "2.25", // MaxStunDuration
            "p2": "70 / 100 / 130 / 160 / 190 (+ 주문력의 45%)", // TooltipTotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 12.5 / 12 / 11.5 / 11",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "1050"
            }
        },
        "R": {
            "p1": "10", // Duration
            "p2": "4 / 5 / 6", // NumberOfShots
            "p3": "170 / 220 / 270 (+ 주문력의 45%)", // TooltipTotalDamage
            "p4": "20 / 25 / 30 (+ 주문력의 5%)", // RampDamageCalc
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
            "p1": "7", // NumberOfMissiles
            "p2": "22 / 26 / 30 / 34 / 38 (+ 총 공격력의 102 / 104 / 106 / 108 / 110%)", // ActiveDamageThatCanCrit
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0",
            "cost": "-",
            "stats": {
                "사거리": "700"
            }
        },
        "W": {
            "p1": "30 / 70 / 110 / 150 / 190 (+ 총 공격력의 120% + 주문력의 50%)", // TotalDamage
            "p2": "2", // SlowDuration
            "p3": "30 / 35 / 40 / 45 / 50%", // SlowPercent*100
            "p4": "30 / 70 / 110 / 150 / 190 (+ 총 공격력의 120% + 주문력의 50%) x 1 + 0.5 x 이동 속도의 100% + -1", // WallDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "1150"
            }
        },
        "E": {
            "p1": "5", // BuffDuration
            "p2": "80 / 85 / 90 / 95 / 100%", // PenDamagePercent*100
            "p3": "22 / 24 / 26 / 28 / 30 (+ 주문력의 20%)", // BonusDamageTotal
            "p4": "0.5", // CDReductionPerHit
            "p5": "1.5", // CritCDReductionPerHit
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "24 / 22.5 / 21 / 19.5 / 18",
            "cost": "90 / 85 / 80 / 75 / 70",
            "stats": {
                "사거리": "25000"
            }
        },
        "R": {
            "p1": "150 / 250 / 350 (+ 주문력의 110% + 총 공격력의 60%)", // TotalActiveDamage
            "p2": "5", // RDuration
            "p3": "30%", // BaseASPercent*100
            "p4": "15%", // BaseBonusMS*100
            "p5": "2.5", // MaxHyperchargeDuration
            "p6": "1.5%", // MSPercent*100
            "p7": "총 공격력의 40%", // ChainPhysicalDamage
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
            "p1": "50 / 80 / 110 / 140 / 170 (+ 2 ~ 2 (레벨에 따라) + 주문력의 60%)", // TotalDamageTooltip
            "p2": "50 / 80 / 110 / 140 / 170 (+ 2 ~ 2 (레벨에 따라) + 주문력의 60%) x 2.5", // MaxDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8.5 / 8 / 7.5 / 7 / 6.5",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "800"
            }
        },
        "W": {
            "p1": "2 / 2.25 / 2.5 / 2.75 / 3", // MSDuration
            "p2": "30 / 40 / 50 / 60 / 70%", // MovementSpeed*100
            "p3": "15 / 25 / 35 / 45 / 55 (+ 주문력의 10%)", // MissileDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0.25",
            "cost": "-",
            "stats": {
                "사거리": "3000 / 4500 / 6000 / 3000 / 3000"
            }
        },
        "E": {
            "p1": "70 / 110 / 150 / 190 / 230 (+ 주문력의 45%)", // TotalDamageTooltip
            "p2": "16 / 19.5 / 23 / 26.5 / 30%", // CooldownRefresh*100
            "p3": "30%", // PercentPen*100
            "p4": "70 / 110 / 150 / 190 / 230 (+ 주문력의 45%)", // BreakDamageTooltip
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
            "p1": "80 / 130 / 180 / 230 / 280 (+ 주문력의 60 / 65 / 70 / 75 / 80%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6 / 5.5 / 5 / 4.5 / 4",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "850"
            }
        },
        "W": {
            "p1": "4", // BombDuration
            "p2": "70 / 105 / 140 / 175 / 210 (+ 주문력의 50%)", // TotalDamage
            "p3": "25 / 27.5 / 30 / 32.5 / 35%", // TurretDestroyPercent*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "80",
            "stats": {
                "사거리": "1000"
            }
        },
        "E": {
            "p1": "30 / 70 / 110 / 150 / 190 (+ 주문력의 25 / 30 / 35 / 40 / 45%)", // TotalDamage
            "p2": "1.5", // SlowDuration
            "p3": "10 / 20 / 30 / 40 / 50%", // Slow*-100
            "p4": "10", // MineDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": {
                "사거리": "900"
            }
        },
        "R": {
            "p1": "300 / 500 / 700 (+ 주문력의 100%)", // EmpoweredDamage
            "p2": "300 / 500 / 700 (+ 주문력의 100%) x 0.65", // BlastDamage
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
            "p1": "44 / 69 / 94 / 119 / 144 (+ 총 공격력의 44 / 51.5 / 59 / 66.5 / 74% + 주문력의 60%)", // TotalDamage
            "p2": "4", // TooltipMaxTargetsHit
            "p3": "35%", // PercentAmpOnKill*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7 / 6.5 / 6 / 5.5 / 5",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "550"
            }
        },
        "W": {
            "p1": "70 / 105 / 140 / 175 / 210 (+ 총 공격력의 50%)", // TotalDamage
            "p2": "4", // SpottingDuration
            "p3": "1.25 / 1.5 / 1.75 / 2 / 2.25", // RootDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "3000"
            }
        },
        "E": {
            "p1": "3", // TrapDuration
            "p2": "35%", // TrapSlowAmount*100
            "p3": "2", // TrapDetonationTime
            "p4": "20 / 80 / 140 / 200 / 260 (+ 총 공격력의 120% + 주문력의 100%)", // TotalDamage
            "p5": "24 / 21.5 / 19 / 16.5 / 14", // AmmoRechargeRateTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "2",
            "cost": "30",
            "stats": {
                "사거리": "750"
            }
        },
        "R": {
            "p1": "64 / 128 / 192 (+ 총 공격력의 25%)", // DamageCalc
            "p2": "64 / 128 / 192 (+ 총 공격력의 25%) x 4", // MaxIncreaseCalc
            "p3": "0.5", // SlowDuration
            "p4": "80%", // SlowPercent*100
            "p5": "200%", // FourthShotMultiplier*100
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
            "p1": "3", // FuseDuration
            "p2": "75 / 115 / 165 / 230 / 300 (+ 주문력의 90%)", // TotalDamage
            "p3": "1.1 / 1.2 / 1.3 / 1.4 / 1.5", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "900"
            }
        },
        "W": {
            "p1": "10", // CooldownReduction
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 12 / 10 / 8 / 6",
            "cost": "35",
            "stats": {
                "사거리": "600"
            }
        },
        "E": {
            "p1": "2.5", // Duration
            "p2": "40 / 55 / 70 / 85 / 99", // SpeedAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15",
            "cost": "50",
            "stats": {
                "사거리": "550"
            }
        },
        "R": {
            "p1": "5", // RDuration
            "p2": "3", // ReviveStateDuration
            "p3": "600 / 850 / 1100 (+ 주문력의 200%)", // RTotalHeal
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
            "p1": "총 공격력의 110%", // RocketDamage
            "p2": "10%", // RocketASPDPenalty*100
            "p3": "100 / 125 / 150 / 175 / 200", // RocketBonusRange
            "p4": "2.5", // MinigunAttackSpeedDuration
            "p5": "3", // MinigunAttackSpeedStacks
            "p6": "30 / 55 / 80 / 105 / 130", // MinigunAttackSpeedMax
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0.9",
            "cost": "20",
            "stats": {
                "사거리": "600"
            }
        },
        "W": {
            "p1": "10 / 60 / 110 / 160 / 210 (+ 총 공격력의 140%)", // TotalDamage
            "p2": "2", // SlowDuration
            "p3": "40 / 50 / 60 / 70 / 80", // SlowPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 7 / 6 / 5 / 4",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "1450"
            }
        },
        "E": {
            "p1": "5", // GrenadeDuration
            "p2": "1.5", // RootDuration
            "p3": "90 / 140 / 190 / 240 / 290 (+ 주문력의 100%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "24 / 20.5 / 17 / 13.5 / 10",
            "cost": "90",
            "stats": {
                "사거리": "925"
            }
        },
        "R": {
            "p1": "20 / 35 / 50 (+ 총 공격력의 12%)", // DamageFloor
            "p2": "200 / 350 / 500 (+ 총 공격력의 120%)", // DamageMax
            "p3": "25 / 30 / 35", // PercentDamage
            "p4": "80%", // AoEDamageMult*100
            "p5": "1200", // MonsterExecuteMax
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
            "p1": "1", // Effect5Amount
            "p2": "80 / 135 / 190 / 245 / 300 (+ 주문력의 100%)", // TotalDamageTooltip
            "p3": "1.5", // Effect3Amount
            "p4": "60", // Effect2Amount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6",
            "cost": "50",
            "stats": {
                "사거리": "950"
            }
        },
        "W": {
            "p1": "1.6 / 1.7 / 1.8 / 1.9 / 2", // Effect2Amount
            "p2": "80 / 130 / 180 / 230 / 280 (+ 주문력의 70%)", // TotalDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10.5 / 10 / 9.5 / 9",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "300"
            }
        },
        "E": {
            "p1": "20 / 40 / 60 / 80 / 100 (+ 주문력의 30%)", // FlatDamageCalc
            "p2": "2.5 / 2.85 / 3.2 / 3.55 / 3.9% (+ 0.5 (중첩당))", // MaxHealthPercentCalc
            "p3": "30 / 35 / 40 / 45 / 50", // SlowAmountPercentage
            "p4": "1.5", // SlowDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 7 / 6 / 5 / 4",
            "cost": "30",
            "stats": {
                "사거리": "40"
            }
        },
        "R": {
            "p1": "300 / 475 / 650 (+ 주문력의 50% + 최대 체력의 10%)", // RDamage
            "p2": "1200 (+ 주문력의 50% + 최대 체력의 10%)", // RMonsterDamage
            "p3": "80 / 120 / 160", // RHealthPerStack
            "p4": "6", // RMinionMaxStacks
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
            "p1": "60 / 110 / 160 / 210 / 260 (+ 주문력의 70%)", // TotalDamage
            "p2": "1.5", // SlowDuration
            "p3": "40%", // SlowAmount*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "40 / 50 / 60 / 70 / 80",
            "stats": {
                "사거리": "950"
            }
        },
        "W": {
            "p1": "40 / 65 / 90 / 115 / 140 (+ 주문력의 45%)", // InitialDamage
            "p2": "2", // TetherDuration
            "p3": "1.6 / 1.7 / 1.8 / 1.9 / 2", // RootDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "675"
            }
        },
        "E": {
            "p1": "2.5", // ShieldDuration
            "p2": "80 / 130 / 180 / 230 / 280 (+ 주문력의 60%)", // TotalShield
            "p3": "2", // MoveSpeedDuration
            "p4": "40%", // MoveSpeed*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "800"
            }
        },
        "R": {
            "p1": "40 / 100 / 160 (+ 주문력의 30%)", // RQImpactDamage
            "p2": "40 / 130 / 220 (+ 주문력의 50%)", // RQFieldDamage
            "p3": "17% (+ 주문력의 1%)", // RWHealAmount
            "p4": "0.5 / 0.75 / 1", // RWBonusRoot
            "p5": "45 / 85 / 125 (+ 주문력의 45%)", // REBonusShield
            "p6": "45 / 85 / 125 (+ 주문력의 45%) x 1", // REBonusShieldArea
            "p7": "15%", // REMoveSpeed*100
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
            "p2": "1", // MSDuration
            "p3": "25 / 30 / 35 / 40 / 45%", // MSBonus*100
            "p4": "3.5", // QTotalRecastTime
            "p5": "1.5", // QRampUpTime
            "p6": "?", // EmpoweredBonusDamage
            "p7": "40 ~ 40% (레벨에 따라)", // DamageConversionPercentage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "25",
            "stats": {
                "사거리": "325"
            }
        },
        "W": {
            "p1": "60 / 85 / 110 / 135 / 160 (+ 총 공격력의 60%)", // BaseDamageTotal
            "p2": "80", // SlowPercentage
            "p3": "2", // SlowDuration
            "p4": "6 / 6.5 / 7 / 7.5 / 8% (+ 총 공격력의 0.025%)", // OuterEdgeTooltip
            "p5": "100", // OuterConeHealingRatio
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "610"
            }
        },
        "E": {
            "p1": "5", // ASDuration
            "p2": "40 / 45 / 50 / 55 / 60%", // ASBuff*100
            "p3": "60 / 90 / 120 / 150 / 180 (+ 총 공격력의 75%)", // TotalDamage
            "p4": "0.75", // KnockupDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "70",
            "stats": {
                "사거리": "800"
            }
        },
        "R": {
            "p1": "2.5 / 3.25 / 4", // RDuration
            "p2": "4 / 6 / 8", // RPercentCurrentHPDamage
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
            "p1": "65 / 95 / 125 / 155 / 185 (+ 주문력의 70%)", // TotalDamage
            "p2": "80 / 110 / 140 / 170 / 200 (+ 주문력의 30%)", // TotalShield
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8.5 / 8 / 7.5 / 7",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "650"
            }
        },
        "W": {
            "p1": "25 (+ 주문력의 10%)", // OnHitDamage
            "p2": "50 / 75 / 100 / 125 / 150 (+ 주문력의 80%)", // ActiveDamage
            "p3": "4 / 4.5 / 5 / 5.5 / 6", // MissingManaRatio
            "p4": "20 / 22.5 / 25 / 27.5 / 30", // ChampionMissingManaRatio
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7",
            "cost": "1",
            "stats": {
                "사거리": "1"
            }
        },
        "E": {
            "p1": "0.75", // ReductionPerSpellCast
            "p2": "70 / 100 / 130 / 160 / 190 (+ 주문력의 70%)", // TotalDamage
            "p3": "1", // SlowDuration
            "p4": "50 / 55 / 60 / 65 / 70", // SlowAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "21 / 20 / 19 / 18 / 17",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "400"
            }
        },
        "R": {
            "p1": "70 / 90 / 110 (+ 주문력의 50% + 최대 마나의 2%)", // BaseDamage
            "p2": "15", // RStackDuration
            "p3": "35 / 45 / 55 (+ 주문력의 7% + 최대 마나의 1%)", // BonusDamage
            "p4": "4", // MaxStacks
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
            "p1": "40 / 59 / 78 / 97 / 116 (+ 주문력의 35%)", // QDamage
            "p2": "40 / 59 / 78 / 97 / 116 (+ 주문력의 35%) x 2", // QSingleTargetDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0",
            "cost": "20 / 25 / 30 / 35 / 40",
            "stats": {
                "사거리": "875"
            }
        },
        "W": {
            "p1": "5", // WallDuration
            "p2": "5", // DebuffDuration
            "p3": "25", // MagicResistShred
            "p4": "40 / 50 / 60 / 70 / 80", // SlowPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15",
            "cost": "70",
            "stats": {
                "사거리": "1000"
            }
        },
        "E": {
            "p1": "10 / 20 / 30 / 40 / 50", // ManaRestoreOnKill
            "p2": "30 / 50 / 70 / 90 / 110 (+ 주문력의 20%)", // TotalDPS
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0.5",
            "cost": "30 / 42 / 54 / 66 / 78",
            "stats": {
                "사거리": "550"
            }
        },
        "R": {
            "p1": "200 / 350 / 500 (+ 주문력의 70%)", // TotalDamage
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
            "p1": "3", // PoisonDuration
            "p2": "75 / 110 / 145 / 180 / 215 (+ 주문력의 65%)", // TooltipTotalDamage
            "p3": "30 / 35 / 40 / 45 / 50", // ChampHitMSBonus
            "p4": "3", // ChampHitMSDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "3.5",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "850"
            }
        },
        "W": {
            "p1": "5", // CloudDuration
            "p2": "20 / 25 / 30 / 35 / 40 (+ 주문력의 10%)", // DamagePerSecond
            "p3": "40 / 50 / 60 / 70 / 80", // SlowPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "24 / 22 / 20 / 18 / 16",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "700"
            }
        },
        "E": {
            "p1": "52 ~ 52 (레벨에 따라) (+ 주문력의 10%)", // BasicDamage
            "p2": "20 / 45 / 70 / 95 / 120 (+ 주문력의 55%)", // BonusPoisonedDamage
            "p3": "주문력의 10 / 11.5 / 13 / 14.5 / 16%", // HealCalc
            "p4": "주문력의 10 / 11.5 / 13 / 14.5 / 16% x 0.25", // HealCalcMinion
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
            "p1": "150 / 250 / 350 (+ 주문력의 50%)", // RDamage
            "p2": "2", // RCCDuration
            "p3": "40", // RSlowPercent
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
            "p1": "6", // Effect2Amount
            "p2": "40 / 55 / 70 / 85 / 100 (+ 총 공격력의 55% + 주문력의 20%)", // TotalIndividualMissileDamage
            "p3": "?", // MaxDamageDisplay
            "p4": "25%", // ExtraHitReduction*100
            "p5": "12", // Effect7Amount
            "p6": "?", // f11.1
            "p7": "100", // Effect6Amount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "55",
            "stats": {
                "사거리": "600"
            }
        },
        "W": {
            "p1": "30 / 55 / 80 / 105 / 130 (+ 총 공격력의 130% + 주문력의 45%)", // TotalDamage
            "p2": "2", // Effect4Amount
            "p3": "3", // Effect5Amount
            "p4": "75", // Effect3Amount
            "p5": "?", // f2.1
            "p6": "100", // Effect2Amount
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
            "p2": "4", // Effect2Amount
            "p3": "40 / 50 / 60 / 70 / 80%", // Effect5Amount*100
            "p4": "0.5", // Effect4Amount
            "p5": "0.5", // Effect7Amount
            "p6": "?", // f10.1
            "p7": "100", // Effect6Amount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 14.5 / 13 / 11.5 / 10",
            "cost": "30",
            "stats": {
                "사거리": "1"
            }
        },
        "R": {
            "p1": "2", // RShieldDuration
            "p2": "100 / 150 / 200 (+ 총 공격력의 90 / 135 / 180% + 주문력의 120%)", // RCalculatedShieldValue
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
            "p1": "75 / 105 / 135 / 165 / 195 (+ 총 공격력의 100%)", // BaseDamage
            "p2": "55 / 75 / 95 / 115 / 135 (+ 주문력의 50%)", // HealAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9",
            "cost": "55 / 60 / 65 / 70 / 75",
            "stats": {
                "사거리": "1000"
            }
        },
        "E": {
            "p1": "65 / 100 / 135 / 170 / 205 (+ 총 공격력의 40%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "50",
            "stats": {
                "사거리": "700"
            }
        },
        "R": {
            "p1": "1.25", // StealthDuration
            "p2": "40%", // BonusMovementSpeedPercent*100
            "p3": "12", // RecastWindow
            "p4": "2", // EvolvedStealthDuration
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
            "p1": "2", // MaxBounces
            "p2": "80 / 115 / 150 / 185 / 220 (+ 주문력의 40%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "-",
            "stats": {
                "사거리": "625"
            }
        },
        "W": {
            "p1": "50 / 60 / 70 / 80 / 90", // Effect4Amount
            "p2": "1.25", // Effect2Amount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "-",
            "stats": {
                "사거리": "25000"
            }
        },
        "E": {
            "p1": "20 / 30 / 40 / 50 / 60 (+ 주문력의 25% + 총 공격력의 40%)", // TotalDamage
            "p2": "0.78 ~ 1 (레벨에 따라)", // DaggerCooldownReduction
            "p3": "78 ~ 100% (레벨에 따라)", // TooltipDaggerReduction
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "-",
            "stats": {
                "사거리": "725"
            }
        },
        "R": {
            "p1": "25 / 37.5 / 50 (+ 주문력의 19%)", // DamageCalc
            "p2": "?", // ADDamageCalc
            "p3": "3", // GrievousDuration
            "p4": "40%", // GrievousAmount*100
            "p5": "2.5", // Duration
            "p6": "25 / 37.5 / 50 (+ 주문력의 19%) x 6 x 2.5", // TotalDamageCalc
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
            "p1": "10 / 75 / 140 / 205 / 270 (+ 총 공격력의 105%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "1150"
            }
        },
        "W": {
            "p1": "10 / 12 / 14 / 16 / 18%", // MaxHealthDamage*100
            "p2": "10", // PerTargetCooldown
            "p3": "100 / 125 / 150 / 175 / 200", // MaximumMonsterDamage
            "p4": "90 / 80 / 70 / 60 / 50", // AmmoRechargeTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "30",
            "cost": "-",
            "stats": {
                "사거리": "5000"
            }
        },
        "E": {
            "p1": "5 / 15 / 25 / 35 / 45 (+ 총 공격력의 70% + 주문력의 65%)", // NormalDamage
            "p2": "7 / 14 / 21 / 28 / 35 (+ 총 공격력의 20 / 27.5 / 35 / 42.5 / 50% + 주문력의 50%)", // AdditionalDamage
            "p3": "2", // SlowDuration
            "p4": "10 / 18 / 26 / 34 / 42% (+ 주문력의 0.05%)", // TotalSlowAmount
            "p5": "10 / 15 / 20 / 25 / 30", // ManaRefund
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
            "p1": "75 / 125 / 175 / 225 / 275 (+ 주문력의 75%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7 / 6.25 / 5.5 / 4.75 / 4",
            "cost": "60 / 55 / 50 / 45 / 40",
            "stats": {
                "사거리": "950"
            }
        },
        "W": {
            "p1": "35 / 45 / 55 / 65 / 75 (+ 주문력의 35% + (?))", // TotalDamagePassive
            "p2": "70 / 95 / 120 / 145 / 170 (+ 주문력의 80%)", // TotalDamageActive
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 11.25 / 9.5 / 7.75 / 6",
            "cost": "40",
            "stats": {
                "사거리": "725"
            }
        },
        "E": {
            "p1": "2", // DurationAsBall
            "p2": "100%", // MovementSpeed*100
            "p3": "80 / 120 / 160 / 200 / 240 (+ 주문력의 80%)", // TotalDamage
            "p4": "40", // EnergyRefund
            "p5": "4", // DurationAfterBall
            "p6": "40 / 50 / 60 / 70 / 80%", // TotalAS*100
            "p7": "1", // CritDurationBonus
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "80",
            "stats": {
                "사거리": "170"
            }
        },
        "R": {
            "p1": "0.5", // KennenRTickRate
            "p2": "40 / 75 / 110 (+ 주문력의 22.5%)", // PerTickDamageCalculated
            "p3": "3", // KennenRDuration
            "p4": "20 / 40 / 60", // KennenRDefenses
            "p5": "10%", // DamageAmp*100
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
            "p1": "50 / 90 / 130 / 170 / 210 (+ 총 공격력의 125 / 145 / 165 / 185 / 205%)", // InitialDamage
            "p2": "50 / 90 / 130 / 170 / 210 (+ 총 공격력의 125 / 145 / 165 / 185 / 205%) x 0.6", // SecondaryDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "55 / 60 / 65 / 70 / 75",
            "stats": {
                "사거리": "1250"
            }
        },
        "W": {
            "p1": "1.5", // RootDuration
            "p2": "30 / 35 / 40 / 45 / 50", // TrapDuration
            "p3": "3 / 3 / 4 / 4 / 5", // MaximumTraps
            "p4": "3 / 3 / 4 / 4 / 5", // MaximumCharges
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
            "p1": "1", // SlowDuration
            "p2": "50", // SlowAmount
            "p3": "80 / 130 / 180 / 230 / 280 (+ 주문력의 80%)", // NetDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 14 / 12 / 10 / 8",
            "cost": "75",
            "stats": {
                "사거리": "750"
            }
        },
        "R": {
            "p1": "300 / 475 / 650 (+ 총 공격력의 100%)", // RTotalDamage
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
            "p1": "75 / 105 / 135 / 165 / 195 (+ 총 공격력의 85%)", // TotalDamage
            "p2": "총 공격력의 65%", // DarkinFlatDamage
            "p3": "6% (+ 총 공격력의 3.5%)", // DarkinPercentDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7 / 6.5 / 6 / 5.5 / 5",
            "cost": "40",
            "stats": {
                "사거리": "350"
            }
        },
        "W": {
            "p1": "85 / 130 / 175 / 220 / 265 (+ 총 공격력의 110%)", // TotalDamage
            "p2": "90%", // Effect3Amount*-100
            "p3": "1.5", // Effect5Amount
            "p4": "1", // Effect2Amount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "700"
            }
        },
        "E": {
            "p1": "7 / 7.5 / 8 / 8.5 / 9", // Effect2Amount
            "p2": "40", // Effect1Amount
            "p3": "90 / 100 / 110 / 120 / 130 (+ 총 공격력의 45%)", // TotalHealing
            "p4": "1.5", // Effect3Amount
            "p5": "70", // Effect5Amount
            "p6": "10", // AssassinCDReduction
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "21 / 19 / 17 / 15 / 13",
            "cost": "90",
            "stats": {
                "사거리": "400"
            }
        },
        "R": {
            "p1": "2.5", // InfestDuration
            "p2": "150 / 250 / 350 (+ 총 공격력의 150%)", // Damage
            "p3": "15% (+ 총 공격력의 0.1%)", // SlayerDamage
            "p4": "15% (+ 총 공격력의 0.1%) x 0.75", // HealValue
            "p5": "75%", // SlayerHealPercent*100
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
            "p1": "60 / 90 / 120 / 150 / 180 (+ 주문력의 50% + 총 공격력의 60%)", // TotalDamage
            "p2": "2", // SlowDuration
            "p3": "25 / 30 / 35 / 40 / 45", // SlowPercent
            "p4": "4", // ShredDuration
            "p5": "15", // ShredPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "900"
            }
        },
        "W": {
            "p1": "55 / 80 / 105 / 130 / 155 (+ 주문력의 25%)", // TotalHeal
            "p2": "2", // HasteDuration
            "p3": "24 / 28 / 32 / 36 / 40% (+ 주문력의 0.08%)", // TotalHaste
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "900"
            }
        },
        "E": {
            "p1": "15 / 20 / 25 / 30 / 35 (+ 주문력의 20% + 총 공격력의 10%)", // EPassiveTotalDamage
            "p2": "8 / 8.5 / 9 / 9.5 / 10% (+ 주문력의 1.5%)", // ActiveTotalExecuteDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "-",
            "stats": {
                "사거리": "550"
            }
        },
        "R": {
            "p1": "2.5", // InvulnDuration
            "p2": "200 / 300 / 400 (+ 주문력의 70% + 총 공격력의 100%)", // TotalDamage
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
            "p1": "5 / 10 / 15 / 20 / 25%", // AttackSpeed*100
            "p2": "80 / 125 / 170 / 215 / 260 (+ 주문력의 90%)", // TotalDamage
            "p3": "4", // ShredDuration
            "p4": "16 / 20 / 24 / 28 / 32", // ShredAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7",
            "cost": "40",
            "stats": {
                "사거리": "1175"
            }
        },
        "W": {
            "p1": "130 / 150 / 170 / 190 / 210", // Range
            "p2": "8", // Duration
            "p3": "3 / 3.75 / 4.5 / 5.25 / 6% (+ 주문력의 1.5%)", // TotalHealthDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "17",
            "cost": "40",
            "stats": {
                "사거리": "530"
            }
        },
        "E": {
            "p1": "70 / 110 / 150 / 190 / 230 (+ 주문력의 65%)", // TotalDamage
            "p2": "3", // TrailDuration
            "p3": "40 / 45 / 50 / 55 / 60", // SlowAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12",
            "cost": "40 / 55 / 70 / 85 / 100",
            "stats": {
                "사거리": "1200"
            }
        },
        "R": {
            "p1": "100 / 140 / 180 (+ 주문력의 35 / 40 / 45% + 총 공격력의 75%)", // BaseDamageCalc
            "p2": "0.833", // TooltipMissingHealthDamageAmp
            "p3": "100 / 140 / 180 (+ 주문력의 35 / 40 / 45% + 총 공격력의 75%) x 2", // MaxDamageCalc
            "p4": "8", // ManaCostDuration
            "p5": "40", // BaseCost
            "p6": "400", // ManaCostCap
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
            "p1": "60 / 105 / 150 / 195 / 240 (+ 총 공격력의 125% + 주문력의 100%)", // TotalDamage
            "p2": "6", // RevealDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8.5 / 8 / 7.5 / 7",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "825"
            }
        },
        "W": {
            "p1": "2.5", // TrailDuration
            "p2": "150 / 225 / 300 / 375 / 450 (+ 주문력의 150% + 총 공격력의 200%)", // MaximumDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "80 / 85 / 90 / 95 / 100",
            "stats": {
                "사거리": "600"
            }
        },
        "E": {
            "p1": "4", // SprayDuration
            "p2": "80 / 130 / 180 / 230 / 280 (+ 총 공격력의 240%)", // TotalDamage
            "p3": "12 / 14 / 16 / 18 / 20", // ShredMax*-1
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "600"
            }
        },
        "R": {
            "p1": "90 / 170 / 250 (+ 총 공격력의 85%)", // RSmallMissileDamage
            "p2": "90 / 170 / 250 (+ 총 공격력의 85%) x 2", // RBigMissileDamage
            "p3": "4", // MaxAmmoTOOLTIP
            "p4": "2 (+ 마법 저항력의 200%)", // AttackRefund
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
            "p1": "1.75", // VisionReductionDuration
            "p2": "65 / 100 / 135 / 170 / 205 (+ 총 공격력의 80 / 85 / 90 / 95 / 100% + 주문력의 50%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10.5 / 10 / 9.5 / 9",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "1025"
            }
        },
        "W": {
            "p1": "2", // BuffDuration
            "p2": "28 / 41 / 54 / 67 / 80%", // AttackSpeedBonus*100
            "p3": "20 / 25 / 30 / 35 / 40%", // MovespeedAmount*100
            "p4": "2", // VisionDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "50 / 45 / 40 / 35 / 30",
            "cost": "-",
            "stats": {
                "사거리": "2100"
            }
        },
        "E": {
            "p1": "40 / 65 / 90 / 115 / 140 (+ 총 공격력의 20%)", // TotalDamage
            "p2": "50%", // SlowAmount*100
            "p3": "1.5", // SlowDecayTime
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "50",
            "stats": {
                "사거리": "675"
            }
        },
        "R": {
            "p1": "70 / 100 / 130%", // MovementSpeedMod*100
            "p2": "60 / 90 / 120 (+ 총 공격력의 35%)", // Damage
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
            "p1": "70 / 100 / 130 / 160 / 190 (+ 방어력의 40% + 치명타 확률의 40%)", // BaseDamage
            "p2": "0.5", // SlowDuration
            "p3": "80%", // SlowPercent*100
            "p4": "6", // RecastWindow
            "p5": "1", // StunDuration
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
            "p1": "0.4", // MinDurationTOOLTIP
            "p2": "?", // MaxDuration.1
            "p3": "30%", // DamageReduction*100
            "p4": "45 / 75 / 105 / 135 / 165", // BaseDamage
            "p5": "8% (+ 방어력의 0.02% + 치명타 확률의 0.02%)", // TotalMaxHealthDamage
            "p6": "0.5", // MinKnockbackDuration
            "p7": "1.75", // MaxKnockbackDuration
            "p8": "10%", // RDamageIncreaseMin*100
            "p9": "80%", // RDamageIncreaseMax*100
            "p10": "75%", // RDamageReduction*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "600"
            }
        },
        "E": {
            "p1": "2", // ShieldDuration
            "p2": "70 / 112.5 / 155 / 197.5 / 240 (+ 최대 체력의 13.5%)", // TotalShield
            "p3": "50%", // CooldownModAO*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "45 / 50 / 55 / 60 / 65",
            "stats": {
                "사거리": "525"
            }
        },
        "R": {
            "p1": "80 / 115 / 150", // BaseDamage
            "p2": "15", // AllOutDuration
            "p3": "80 / 115 / 150 (+ 최대 체력의 5%)", // TotalDamageSlamDown
            "p4": "40 / 60 / 80%", // AttackSpeed*100
            "p5": "50%", // ArmorPenPercent*100
            "p6": "20%", // Omnivamp*100
            "p7": "35%", // HealthLost*100
            "p8": "85%", // DefensesLost*100
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
            "p1": "30 / 55 / 80 / 105 / 130 (+ 총 공격력의 60%)", // TotalDamage
            "p2": "1.75", // TetherPopTime
            "p3": "30 / 55 / 80 / 105 / 130 (+ 총 공격력의 60%) x 2", // TotalYankDamage
            "p4": "2.5", // SlowDuration
            "p5": "30 / 35 / 40 / 45 / 50%", // SlowAmount*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "-",
            "stats": {
                "사거리": "800"
            }
        },
        "W": {
            "p1": "4", // ActiveDuration
            "p2": "150%", // AttackSpeed*100
            "p3": "20 / 30 / 40 / 50 / 60", // BaseFlatDamage
            "p4": "4.5 / 5 / 5.5 / 6 / 6.5% (+ 총 공격력의 2% + 최대 체력의 0.4%)", // PercentDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "-"
        },
        "E": {
            "p1": "35 / 60 / 85 / 110 / 135 (+ 총 공격력의 55%)", // TotalDamage
            "p2": "1", // MoveSpeedDuration
            "p3": "50%", // MoveSpeed*100
            "p4": "3", // RecastWindow
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "-",
            "stats": {
                "사거리": "550"
            }
        },
        "R": {
            "p1": "200 / 300 / 400 (+ 총 공격력의 300%)", // MaximumShield
            "p2": "4 / 6 / 8% (+ 총 공격력의 3%)", // MinimumDamageTooltip
            "p3": "12 / 18 / 24% (+ 총 공격력의 3%)", // MaximumChargeDamage
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
            "p1": "70 / 100 / 130 / 160 / 190 (+ 총 공격력의 85%)", // VanillaDamage
            "p2": "1", // SlowDuration
            "p3": "20%", // SlowPotency*-100
            "p4": "50%", // CritThreshold*100
            "p5": "70 / 100 / 130 / 160 / 190 (+ 총 공격력의 85%) x 0.6 ~ 0.6 (레벨에 따라)", // TremorDamage
            "p6": "20%", // Haste*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7",
            "cost": "35",
            "stats": {
                "사거리": "525"
            }
        },
        "W": {
            "p1": "15 / 20 / 25 / 30 / 35%", // AttackSpeed*100
            "p2": "8 / 16 / 24 / 32 / 40 (+ 주문력의 45% + 총 공격력의 20%)", // OnHitDamage
            "p3": "3 / 5 / 7 / 9 / 11%", // PassiveMS*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7",
            "cost": "25 / 30 / 35 / 40 / 45",
            "stats": {
                "사거리": "1100"
            }
        },
        "E": {
            "p1": "50 / 90 / 130 / 170 / 210 (+ 총 공격력의 50%)", // Damage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "650"
            }
        },
        "R": {
            "p1": "1", // StunDuration
            "p2": "100 / 200 / 300 (+ 총 공격력의 125%)", // Damage
            "p3": "10%", // MissingHealthDamageRock
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
            "p1": "40 / 65 / 90 / 115 / 140 (+ 총 공격력의 75%)", // TotalDamage
            "p2": "4", // BaseASDuration
            "p3": "35% (+ 5 (중첩당))", // TotalQAttackSpeed
            "p4": "4 / 3.5 / 3 / 2.5 / 2", // CDNewValue
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9",
            "cost": "35",
            "stats": {
                "사거리": "340"
            }
        },
        "W": {
            "p1": "47 ~ 47 (레벨에 따라)", // AttackHeal
            "p2": "25 / 30 / 35 / 40 / 45 (+ 총 공격력의 20% + 주문력의 20%)", // BaseWolfDamage
            "p3": "1.5% (+ 1 (중첩당))", // PercentWolfDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "18 / 17 / 16 / 15 / 14",
            "cost": "40",
            "stats": {
                "사거리": "560"
            }
        },
        "E": {
            "p1": "1", // SlowDuration
            "p2": "30 (+ 주문력의 5%)", // TotalSlow
            "p3": "4", // TotalDuration
            "p4": "80 / 110 / 140 / 170 / 200 (+ 총 공격력의 100%)", // BaseBiteDamage
            "p5": "5% (+ 0.5 (중첩당))", // PercentBiteDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 12.5 / 11 / 9.5 / 8",
            "cost": "",
            "stats": {
                "사거리": "500"
            }
        },
        "R": {
            "p1": "4", // BuffDuration
            "p2": "225 / 300 / 375", // HealFlat
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
            "p1": "15", // StackCooldown
            "p2": "1 / 2 / 3 / 4 / 5", // Effect6Amount
            "p3": "25 (+ 주문력의 15% + 최대 체력의 1%)", // HealingPerStack
            "p4": "25 (+ 주문력의 15% + 최대 체력의 1%)", // MaxStackHealing
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "3",
            "cost": "60",
            "stats": {
                "사거리": "325"
            }
        },
        "W": {
            "p1": "방어력의 6 / 7 / 8 / 9 / 10%", // BonusArmor
            "p2": "2.5", // Effect3Amount
            "p3": "7 / 8 / 9 / 10 / 11", // Effect2Amount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15",
            "cost": "60",
            "stats": {
                "사거리": "800"
            }
        },
        "E": {
            "p1": "1", // Effect3Amount
            "p2": "90 / 130 / 170 / 210 / 250 (+ 주문력의 50% + 방어력의 50%)", // TotalDamage
            "p3": "1.5", // Effect2Amount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "40",
            "stats": {
                "사거리": "610"
            }
        },
        "R": {
            "p1": "2.5", // InitialDelay
            "p2": "2.5", // InvulnDuration
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
            "p1": "65 / 85 / 105 / 125 / 145 (+ 총 공격력의 100%)", // LeapDamage
            "p2": "65 / 85 / 105 / 125 / 145 (+ 총 공격력의 100%) x 1.5 + 이동 속도의 100%", // CriticalDamage
            "p3": "9 ~ 55 (레벨에 따라)", // TotalHealing
            "p4": "50%", // CooldownRefund*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "40",
            "stats": {
                "사거리": "575"
            }
        },
        "W": {
            "p1": "50 / 60 / 70 / 80 / 90 (+ 총 공격력의 40%)", // TotalInitialDamage
            "p2": "60 / 90 / 120 / 150 / 180 (+ 총 공격력의 90%)", // TotalReturnDamage
            "p3": "1", // SlowDuration
            "p4": "40 / 45 / 50 / 55 / 60%", // MovespeedSlow*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "9 / 8.5 / 8 / 7.5 / 7",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "650"
            }
        },
        "E": {
            "p1": "160 / 135 / 110 / 85 / 60", // WallCD
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0",
            "cost": "-",
            "stats": {
                "사거리": "725"
            }
        },
        "R": {
            "p1": "90 / 135 / 180 (+ 총 공격력의 100%)", // Damage
            "p2": "40 / 55 / 70%", // MoveSpeed*100
            "p3": "2.5", // Duration
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
            "p1": "55 / 72.5 / 90 / 107.5 / 125 (+ 주문력의 50%)", // RockDamage
            "p2": "60", // ExtraMissileReducedDamagePercent
            "p3": "10", // BigRockManaCost
            "p4": "50%", // WorkedGroundCDR*100
            "p5": "1.5", // SlowDuration
            "p6": "20 / 25 / 30 / 35 / 40%", // SlowPercent*100
            "p7": "55 / 72.5 / 90 / 107.5 / 125 (+ 주문력의 50%) x 1.8", // BigRockDamage
            "p8": "3", // MonsterStunDuration
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
            "p1": "20%", // SlowPercent*100
            "p2": "60 / 105 / 150 / 195 / 240 (+ 주문력의 60%)", // ScatterDamage
            "p3": "0.75", // StunDuration
            "p4": "25 / 40 / 55 / 70 / 85 (+ 주문력의 30%)", // DetonationDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14",
            "cost": "90",
            "stats": {
                "사거리": "950"
            }
        },
        "R": {
            "p1": "4", // WallDuration
            "p2": "3", // DamageLockoutTime
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
            "p1": "75 / 120 / 165 / 210 / 255 (+ 주문력의 100%)", // TotalDamage
            "p2": "2", // SlowDuration
            "p3": "50%", // SlowAmount*100
            "p4": "10 / 15 / 20 / 25 / 30", // BaseHeal
            "p5": "5 / 5.5 / 6 / 6.5 / 7%", // PercentHealthHealing*100
            "p6": "1.5", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7 / 6.5 / 6 / 5.5 / 5",
            "cost": "50 / 46 / 42 / 38 / 34",
            "stats": {
                "사거리": "900"
            }
        },
        "W": {
            "p1": "100 / 135 / 170 / 205 / 240 (+ 주문력의 150%)", // TotalDamage
            "p2": "?", // KnockupDuration
            "p3": "40 / 42.5 / 45 / 47.5 / 50%", // ChampRefund*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "21 / 20 / 19 / 18 / 17",
            "cost": "60 / 75 / 90 / 105 / 120",
            "stats": {
                "사거리": "1000 / 1050 / 1100 / 1150 / 1200"
            }
        },
        "E": {
            "p1": "15 / 23 / 31 / 39 / 47%", // GreyHealthRatio*100
            "p2": "2", // EnhancedThreshold
            "p3": "42 / 44 / 46 / 48 / 50%", // GreyHealthRatioEnhanced*100
            "p4": "4", // OOCTimer
            "p5": "60 ~ 100% (레벨에 따라)", // GreyHealthHealingRatio
            "p6": "2.5", // ShieldDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "3",
            "cost": "",
            "stats": {
                "사거리": "2400"
            }
        },
        "R": {
            "p1": "3", // EnemyDuration
            "p2": "100 / 250 / 400", // BaseDamage
            "p3": "15% (+ 주문력의 0.07%)", // PercentHPDamage
            "p4": "40%", // SlowAmount*100
            "p5": "3", // AllyDuration
            "p6": "650 / 800 / 950 (+ 주문력의 100%)", // TotalShield
            "p7": "60%", // AllySpeedAmount*100
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
            "p1": "10 / 30 / 50 / 70 / 90 (+ 총 공격력의 115 / 125 / 135 / 145 / 155%)", // TotalDamage
            "p2": "75%", // SlowAmount*100
            "p3": "5", // SapDebuffDuration
            "p4": "20 / 25 / 30 / 35 / 40", // BonusAD
            "p5": "10 / 12.5 / 15 / 17.5 / 20", // SappedAD*-1
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "3.5",
            "cost": "20",
            "stats": {
                "사거리": "300"
            }
        },
        "W": {
            "p1": "8", // Duration
            "p2": "20 / 28 / 36 / 44 / 52%", // MSBonus*100
            "p3": "30 / 45 / 60 / 75 / 90%", // ASBonus*100
            "p4": "25%", // HealingBonus*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "18 / 17 / 16 / 15 / 14",
            "cost": "40",
            "stats": {
                "사거리": "750"
            }
        },
        "E": {
            "p1": "6", // PillarDuration
            "p2": "34 / 38 / 42 / 46 / 50", // SlowAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "21 / 19.5 / 18 / 16.5 / 15",
            "cost": "75",
            "stats": {
                "사거리": "1000"
            }
        },
        "R": {
            "p1": "5", // ActualDurationOfDrainBuff
            "p2": "20 / 25 / 30% (+ 주문력의 0.02%)", // TotalPercentHPDamage
            "p3": "40%", // ArmorMRShred*100
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
            "p1": "7", // BuffDuration
            "p2": "60 / 75 / 90 / 105 / 120%", // AttackSpeedMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 19 / 18 / 17 / 16",
            "cost": "15 / 20 / 25 / 30 / 35",
            "stats": {
                "사거리": "20"
            }
        },
        "W": {
            "p1": "70 / 105 / 140 / 175 / 210 (+ 총 공격력의 100% + 주문력의 50%)", // LandingDamage
            "p2": "2", // SlowDuration
            "p3": "40%", // SlowMod*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "22 / 20 / 18 / 16 / 14",
            "cost": "30 / 35 / 40 / 45 / 50",
            "stats": {
                "사거리": "900"
            }
        },
        "E": {
            "p1": "45 / 60 / 75 / 90 / 105 (+ 주문력의 25%)", // PassiveDamage
            "p2": "4", // ActiveDuration
            "p3": "60 / 85 / 110 / 135 / 160 (+ 총 공격력의 80% + 주문력의 50%)", // ActiveDamage
            "p4": "25%", // ActivePerStackAmp*100
            "p5": "4", // ActiveMaxStacks
            "p6": "60 / 85 / 110 / 135 / 160 (+ 총 공격력의 80% + 주문력의 50%) x 1 + 0.25 x 4", // ActiveMaxDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 15.5 / 15 / 14.5 / 14",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "550"
            }
        },
        "R": {
            "p1": "225 / 275 / 325 (+ 총 공격력의 70% + 주문력의 100%)", // DamageCalc
            "p2": "0.4 / 0.55 / 0.7", // StunDuration
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
            "p1": "20 / 35 / 50 / 65 / 80", // MaximumBonusAD
            "p2": "30 / 40 / 50 / 60 / 70 (+ 주문력의 30%)", // BaseHeal
            "p3": "0.5 / 0.95 / 1.4 / 1.85 / 2.3 (+ 주문력의 1.2%)", // HealPerFury
            "p4": "30 / 40 / 50 / 60 / 70 (+ 주문력의 30% + 최대 마나의 100% x 0.5 / 0.95 / 1.4 / 1.85 / 2.3 + 주문력의 1.2%)", // MaximumHeal
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12",
            "cost": "-",
            "stats": {
                "사거리": "400"
            }
        },
        "W": {
            "p1": "4", // ReductionDuration
            "p2": "20 / 35 / 50 / 65 / 80", // ADReduction*-1
            "p3": "3.25", // SlowDuration
            "p4": "30 / 35 / 40 / 45 / 50%", // SlowPotency*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14",
            "cost": "-",
            "stats": {
                "사거리": "850"
            }
        },
        "E": {
            "p1": "80 / 120 / 160 / 200 / 240 (+ 총 공격력의 100% + 주문력의 80%)", // TotalDamage
            "p2": "2", // NonChampFuryGain
            "p3": "5", // ChampFuryGain
            "p4": "0.75", // NonChampCDRefund
            "p5": "1.5", // ChampCDRefund
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "-",
            "stats": {
                "사거리": "650"
            }
        },
        "R": {
            "p1": "5", // TryndRDuration
            "p2": "30 / 50 / 70", // TryndRMinHealth
            "p3": "50 / 75 / 100", // TryndRFuryGain
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
            "p1": "60 / 105 / 150 / 195 / 240 (+ 총 공격력의 50% + 주문력의 85%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6 / 5.75 / 5.5 / 5.25 / 5",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "10000"
            }
        },
        "W": {
            "p1": "40 / 60 / 80 / 100 / 120 (+ 총 공격력의 100% + 주문력의 100% + 마법 저항력의 0.575 x 40 / 60 / 80 / 100 / 120 + 총 공격력의 100% + 주문력의 100%%)", // BlueDamage
            "p2": "70 / 90 / 110 / 130 / 150", // Effect6Amount
            "p3": "30 / 45 / 60 / 75 / 90 (+ 총 공격력의 100% + 주문력의 70% + 마법 저항력의 0.35 x 30 / 45 / 60 / 75 / 90 + 총 공격력의 100% + 주문력의 70%%)", // RedDamage
            "p4": "30 / 35 / 40 / 45 / 50", // Effect2Amount
            "p5": "15 / 22.5 / 30 / 37.5 / 45 (+ 총 공격력의 100% + 주문력의 50% + 마법 저항력의 0.25 x 15 / 22.5 / 30 / 37.5 / 45 + 총 공격력의 100% + 주문력의 50%%)", // GoldDamage
            "p6": "1 / 1.25 / 1.5 / 1.75 / 2", // Effect3Amount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "6",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "200"
            }
        },
        "E": {
            "p1": "15 / 25 / 35 / 45 / 55", // AttackSpeedBonus
            "p2": "65 / 90 / 115 / 140 / 165 (+ 총 공격력의 20% + 주문력의 40%)", // BonusDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0",
            "cost": ""
        },
        "R": {
            "p1": "6 / 8 / 10", // Effect1Amount
            "p2": "5500", // Effect4Amount
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
            "p1": "10 / 11 / 12 / 13 / 14", // StealthDuration
            "p2": "10", // MoveSpeedMod
            "p3": "30", // HiddenSpeed
            "p4": "6", // AttackSpeedDuration
            "p5": "40 / 45 / 50 / 55 / 60%", // AttackSpeedMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16",
            "cost": "40",
            "stats": {
                "사거리": "20"
            }
        },
        "W": {
            "p1": "3", // Duration
            "p2": "30 / 35 / 40 / 45 / 50 (+ 주문력의 6%)", // TotalSlowAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "70",
            "stats": {
                "사거리": "950"
            }
        },
        "E": {
            "p1": "20 / 30 / 40 / 50 / 60", // BaseDamage
            "p2": "15 / 20 / 25 / 30 / 35 (+ 총 공격력의 35%)", // PhysicalDamagePerStack
            "p3": "주문력의 35%", // MagicDamagePerStack
            "p4": "20 / 30 / 40 / 50 / 60 (+ 6 x 15 / 20 / 25 / 30 / 35 + 총 공격력의 0.35 x 6%)", // MaxPhysicalDamage
            "p5": "주문력의 35% x 6", // MaxMagicDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "1200"
            }
        },
        "R": {
            "p1": "6", // Duration
            "p2": "300", // BonusRange
            "p3": "30 / 45 / 60", // BonusAD
            "p4": "10%", // FallOffDamage*100
            "p5": "60%", // MinimumFallOffDamage*100
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
            "p1": "2 / 2.25 / 2.5 / 2.75 / 3", // BlindDuration
            "p2": "80 / 125 / 170 / 215 / 260 (+ 주문력의 70%)", // CalculatedDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "680"
            }
        },
        "W": {
            "p1": "5", // PassiveCooldownOnDamageTaken
            "p2": "12 / 16 / 20 / 24 / 28%", // PassiveMoveSpeedBonus*100
            "p3": "3", // ActiveMoveSpeedBuffDuration
            "p4": "24 / 32 / 40 / 48 / 56%", // ActiveMoveSpeedBonus*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14",
            "cost": "40",
            "stats": {
                "사거리": "20"
            }
        },
        "E": {
            "p1": "9 / 23 / 37 / 51 / 65 (+ 주문력의 30% + 총 공격력의 5%)", // ImpactCalculatedDamage
            "p2": "4", // PoisonDuration
            "p3": "6 / 12 / 18 / 24 / 30 (+ 주문력의 10% + 총 공격력의 2.5%) x 4", // TotalDotDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "0",
            "cost": "",
            "stats": {
                "사거리": "680"
            }
        },
        "R": {
            "p1": "4", // DebuffDuration
            "p2": "30 / 40 / 50", // SlowAmount
            "p3": "200 / 325 / 450 (+ 주문력의 50%)", // TotalDamage
            "p4": "5", // MushroomDuration
            "p5": "3 / 4 / 5", // MaxAmmo
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
            "p1": "100 / 150 / 200 / 250 / 300 (+ 총 공격력의 75%)", // TotalDamage
            "p2": "1", // SlowDuration
            "p3": "90%", // SlowAmount*100
            "p4": "75%", // ManaRefund*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "400"
            }
        },
        "W": {
            "p1": "45 (+ (?))", // MoveSpeed
            "p2": "5", // CamoDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "65",
            "stats": {
                "사거리": "600"
            }
        },
        "E": {
            "p1": "1.25 (+ (?))", // StunDuration
            "p2": "100 / 150 / 200 / 250 / 300 (+ 총 공격력의 100%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "40",
            "stats": {
                "사거리": "550"
            }
        },
        "R": {
            "p1": "250 ~ 250 (레벨에 따라) (+ 총 공격력의 80% + (?))", // RDamage
            "p2": "250 ~ 250 (레벨에 따라) (+ 총 공격력의 80% + (?)) x 0.5", // ReducedDamageFinal
            "p3": "50%", // ReducedDamage*100
            "p4": "20", // RRecastDuration
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
            "p1": "70 / 100 / 130 / 160 / 190 (+ 총 공격력의 115%)", // TapDamageCalc
            "p2": "60%", // TapCooldownRefund*100
            "p3": "70 / 100 / 130 / 160 / 190 (+ 총 공격력의 115% + 주문력의 50%)", // HoldDamageCalc
            "p4": "50%", // DamageFalloff*100
            "p5": "20%", // CritHealthThreshold*100
            "p6": "70 / 100 / 130 / 160 / 190 + 85 / 130 / 175 / 220 / 265 (+ 총 공격력의 230%)", // ExecuteDamageCalcModified
            "p7": "20 ~ 240 (레벨에 따라) (+ 총 공격력의 115%)", // EmpoweredDamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10.25 / 9.5 / 8.75 / 8",
            "cost": "25",
            "stats": {
                "사거리": "575"
            }
        },
        "W": {
            "p1": "1", // StunDuration
            "p2": "6 / 6.5 / 7 / 7.5 / 8% (+ 최대 체력의 0.004% + 주문력의 0.015%)", // MaxHealthDamageCalc
            "p3": "3", // EmpoweredNumHits
            "p4": "총 공격력의 40 ~ 55 (레벨에 따라)% x 3", // EmpoweredDamageMultCalcModified
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "55",
            "stats": {
                "사거리": "600"
            }
        },
        "E": {
            "p1": "1.5", // ShieldDuration
            "p2": "총 공격력의 100%", // DamageCalc
            "p3": "55 / 105 / 155 / 205 / 255 (+ 총 공격력의 150%)", // ShieldDamageCalc
            "p4": "4", // ResistsDuration
            "p5": "5 ~ 30 (레벨에 따라) (+ 최대 체력의 2.5%)", // ResistsCalc
            "p6": "1.5", // SpeedDuration
            "p7": "60%", // SpeedAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "22 / 21 / 20 / 19 / 18",
            "cost": "80",
            "stats": {
                "사거리": "400"
            }
        },
        "R": {
            "p1": "10 / 20 / 30%", // ArmorPenetration*100
            "p2": "2", // SpearSlowDuration
            "p3": "50%", // SpearSlow*100
            "p4": "300 / 500 / 700 (+ 주문력의 100%)", // DamageCalc
            "p5": "50%", // EdgeDamageReduction*100
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
            "p1": "1.2 / 1.4 / 1.6 / 1.8 / 2", // FearDuration
            "p2": "4 / 4.5 / 5 / 5.5 / 6% (+ 주문력의 0.03%)", // TotalPercentHealthDamage
            "p3": "4 / 4.5 / 5 / 5.5 / 6% (+ 주문력의 0.03%) x 2", // TotalPercentHealthDamageFeared
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "15 / 14.5 / 14 / 13.5 / 13",
            "cost": "65",
            "stats": {
                "사거리": "575"
            }
        },
        "W": {
            "p1": "60 / 90 / 120 / 150 / 180 (+ 주문력의 45%)", // DrainDamageCalc
            "p2": "12 / 14.5 / 17 / 19.5 / 22", // PercentForTooltip
            "p3": "25 / 32.5 / 40 / 47.5 / 55", // VampPercentage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "650"
            }
        },
        "E": {
            "p1": "70 / 105 / 140 / 175 / 210 (+ 주문력의 50%)", // Damage
            "p2": "1.25", // SilenceDuration
            "p3": "30 / 35 / 40 / 45 / 50%", // SlowAmount*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "850"
            }
        },
        "R": {
            "p1": "1.5", // ChannelTime
            "p2": "5", // Duration
            "p3": "150 / 250 / 350 (+ 주문력의 50%) x 5", // TotalDamage
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
            "p1": "70 / 80 / 90 / 100 / 110 (+ (?))", // TotalDamage
            "p2": "50%", // CDRefundPercent*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "13 / 11.25 / 9.5 / 7.75 / 6",
            "cost": "20",
            "stats": {
                "사거리": "400"
            }
        },
        "W": {
            "p1": "0.75", // ParryDuration
            "p2": "110 / 150 / 190 / 230 / 270 (+ 주문력의 100%)", // StabDamage
            "p3": "2", // CCDuration
            "p4": "50%", // MSSlowPercent*-100
            "p5": "25%", // AttackSlowPercent*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "24 / 22 / 20 / 18 / 16",
            "cost": "50",
            "stats": {
                "사거리": "750"
            }
        },
        "E": {
            "p1": "50 / 60 / 70 / 80 / 90%", // ASPercent*100
            "p2": "1", // SlowDuration
            "p3": "30%", // SlowPercent*-100
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
            "p1": "30 / 40 / 50%", // PercentMS*100
            "p2": "8", // MarkDuration
            "p3": "5", // HealDuration
            "p4": "75 / 100 / 125 (+ 총 공격력의 60%)", // HealPerSecondCalc
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
            "p1": "총 공격력의 100%", // TotalDamage
            "p2": "10 / 25 / 40 / 55 / 70 (+ 주문력의 55%)", // QDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "50",
            "stats": {
                "사거리": "550"
            }
        },
        "W": {
            "p1": "3", // BleedDuration
            "p2": "30 / 45 / 60 / 75 / 90 (+ 주문력의 25%)", // DoTDamage
            "p3": "50 / 75 / 100 / 125 / 150 (+ 주문력의 45%)", // ActiveDamage
            "p4": "30 / 40 / 50 / 60 / 70", // OnKillManaRefund
            "p5": "1", // OnKillNewCooldown
            "p6": "5", // OnHitBuffDuration
            "p7": "20 / 25 / 30 / 35 / 40 (+ 주문력의 30%)", // OnHitBuffDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "7 / 6 / 5 / 4 / 3",
            "cost": "30 / 40 / 50 / 60 / 70",
            "stats": {
                "사거리": "600"
            }
        },
        "E": {
            "p1": "80 / 130 / 180 / 230 / 280 (+ 주문력의 95%)", // EDamage
            "p2": "2", // SlowDuration
            "p3": "40 / 45 / 50 / 55 / 60%", // SlowAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "16 / 14 / 12 / 10 / 8",
            "cost": "75 / 80 / 85 / 90 / 95",
            "stats": {
                "사거리": "400"
            }
        },
        "R": {
            "p1": "2", // DetonationTime
            "p2": "180 / 300 / 420 (+ 주문력의 60%)", // SmallSharkDamage
            "p3": "180 / 300 / 420 (+ 주문력의 60%) x 1.5", // BigSharkDamage
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
            "p1": "3", // MaxTurrets
            "p2": "3", // MaxKits
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "1",
            "cost": "20",
            "stats": {
                "사거리": "350"
            }
        },
        "W": {
            "p1": "5", // Rockets
            "p2": "50 / 75 / 100 / 125 / 150 (+ 주문력의 55%)", // Damage
            "p3": "90 / 135 / 180 / 225 / 270 (+ 주문력의 103%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "1325"
            }
        },
        "E": {
            "p1": "60 / 100 / 140 / 180 / 220 (+ 주문력의 60%)", // Damage
            "p2": "2", // SlowDuration
            "p3": "?", // SlowPercent.0*100
            "p4": "1.5", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "11",
            "cost": "85",
            "stats": {
                "사거리": "970"
            }
        },
        "R": {
            "p1": "80 / 100 / 120 (+ 주문력의 35%)", // QUltDamage
            "p2": "100 / 140 / 180 (+ 주문력의 70%)", // QUltDamageBeam
            "p3": "135 / 180 / 225 (+ 주문력의 45%)", // WUltDamage
            "p4": "503 / 697.5 / 892 (+ 주문력의 183%)", // WUltTotalDamage
            "p5": "100 / 200 / 300 (+ 주문력의 60%)", // EUltDamage
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
            "p1": "60 / 90 / 120 / 150 / 180 (+ 총 공격력의 90%)", // Damage
            "p2": "8", // BuffDuration
            "p3": "3 (+ 총 공격력의 3%)", // RampageBonusDamagePerc
            "p4": "0.75", // RampageCooldownReduction
            "p5": "3", // MaxStacks
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "4",
            "cost": "28 / 26 / 24 / 22 / 20",
            "stats": {
                "사거리": "350"
            }
        },
        "W": {
            "p1": "4", // BuffDuration
            "p2": "80 / 120 / 160 / 200 / 240 (+ 주문력의 80%)", // TotalDamage
            "p3": "5 / 10 / 15 / 20 / 25", // ResistAmount
            "p4": "25", // LeechAmount
            "p5": "25 x 0.5", // AllyTooltipLeachValue
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "14",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "525"
            }
        },
        "E": {
            "p1": "25%", // MinMoveSpeed*100
            "p2": "4", // Duration
            "p3": "65%", // MaxMoveSpeed*100
            "p4": "30 / 45 / 60 / 75 / 90 (+ 총 공격력의 50%)", // MinDamage
            "p5": "30 / 45 / 60 / 75 / 90 (+ 총 공격력의 50%) x 2", // MaxDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "20 / 19 / 18 / 17 / 16",
            "cost": "60",
            "stats": {
                "사거리": "300"
            }
        },
        "R": {
            "p1": "150 / 250 / 350 (+ 주문력의 100%)", // DamageDone
            "p2": "0.75", // FearDurationMin
            "p3": "1.5", // FearDurationMax
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
            "p1": "50 / 80 / 110 / 140 / 170 (+ 주문력의 80%)", // Tooltip_QQDamage
            "p2": "3 / 4 / 5 / 6 / 7", // Tooltip_QQBonusDamage
            "p3": "60 / 85 / 110 / 135 / 160 (+ 주문력의 30%)", // Tooltip_QWDamage
            "p4": "60 / 85 / 110 / 135 / 160 (+ 주문력의 30%) x 2 / 2.375 / 2.75 / 3.125 / 3.5", // Tooltip_QWBonusDamage
            "p5": "20 / 35 / 50 / 65 / 80 (+ 주문력의 30%)", // Tooltip_QEDamage
            "p6": "20 / 35 / 50 / 65 / 80 (+ 주문력의 24%)", // Tooltip_QEDamagePerSecond
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "80 / 90 / 100 / 110 / 120"
        },
        "W": {
            "p1": "30 / 32.5 / 35 / 37.5 / 40% (+ 주문력의 3%)", // Tooltip_WQMoveSpeed
            "p2": "100 / 140 / 180 / 220 / 260 (+ 주문력의 60%)", // Tooltip_WWShieldAmount
            "p3": "20 / 30 / 40 / 50 / 60 (+ 주문력의 15%)", // Tooltip_WEOnHitDamage
            "p4": "45 / 50 / 55 / 60 / 65", // Tooltip_WEOnHitManaRestore
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "18 / 17.5 / 17 / 16.5 / 16",
            "cost": "90 / 95 / 100 / 105 / 110"
        },
        "E": {
            "p1": "70 / 110 / 150 / 190 / 230 (+ 주문력의 65%)", // Tooltip_EQDamage
            "p2": "1 / 1.125 / 1.25 / 1.375 / 1.5", // Tooltip_EQFleeDuration
            "p3": "1.2 / 1.4 / 1.6 / 1.8 / 2", // Tooltip_EWRootDuration
            "p4": "70 / 110 / 150 / 190 / 230 (+ 주문력의 65%)", // Tooltip_EWDamage
            "p5": "70 / 110 / 150 / 190 / 230 (+ 주문력의 65%)", // Tooltip_EEDamage
            "p6": "40 / 47.5 / 55 / 62.5 / 70", // Tooltip_EESlowAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성)
            "v2": "",
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "50 / 55 / 60 / 65 / 70"
        },
        "R": {
            "p1": "3", // Duration
            "p2": "10", // SlowPercentPerStack
            "p3": "10 / 20 / 30 (+ 주문력의 5%)", // DamageOverTime
            "p4": "200 / 325 / 450 (+ 주문력의 80%)", // Damage
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
