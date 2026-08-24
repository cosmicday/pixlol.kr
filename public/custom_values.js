// ==========================================
// ★★ 각주 헬퍼(drawGraph / drawSteps)는 **app.js 로 옮겼다** (2026-08-21).
//   도감 룬 탭도 같은 각주를 쓰는데, 그것 때문에 이 파일(489KB)을 받게 할 수는 없어서다.
//   여기 있던 시절 기준으로 적힌 문서가 남아 있을 수 있으니 헷갈리면 app.js 를 볼 것.
//   ★ 이 파일은 fill_values.js 가 다시 찍는데, **값 선언 앞부분은 그대로 물려받는다**
//     (valuesPrelude). 그래서 이 주석과 아래 색표는 재생성해도 살아남는다.
// ==========================================

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
            "p1": "8", // DamageTimer
            "p2": "1.5 ~ 10.1% (레벨에 따라)", // RegenCalc
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "1.4 / 1.95 / 2.5 / 3.05 / 3.6", // MovementSpeedDuration
            "p2": "35", // MovementSpeedAmount*100
            "p3": "1.5", // SilenceDuration
            "p4": "30 / 60 / 90 / 120 / 150 (+ 총 공격력의 150%)", // TotalDamage
            "p5": "4.5", // AttackWindow
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "8",
            "cost": "-"
        },
        "W": {
            "p1": "0.2 (중첩당)", // ResistsForTooltip
            "p2": "0.2", // ResistGainOnKillTooltip
            "p3": "30", // ResistMax
            "p4": "4", // DRDuration
            "p5": "25 / 29 / 33 / 37 / 41", // DRPercent*100
            "p6": "0.75", // UpfrontDuration
            "p7": "65 / 85 / 105 / 125 / 145 (+ 추가 최대 체력의 18%)", // TotalShield
            "p8": "60", // UpfrontTenacity*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "22 / 19.5 / 17 / 14.5 / 12",
            "cost": "-"
        },
        "E": {
            "p1": "3", // Duration
            "p2": "4 / 7 / 10 / 13 / 16 (+ 총 공격력의 40 / 43 / 46 / 49 / 52%)", // TotalDamage
            "p3": "7", // f1
            "p4": "25", // NearestEnemyBonus*100
            "p5": "6", // StacksToShred
            "p6": "6", // ShredDuration
            "p7": "25", // ShredAmount*100
            "p8": "25", // ASPerTick*100
            "p9": "4 / 7 / 10 / 13 / 16 (+ 총 공격력의 40 / 43 / 46 / 49 / 52%)의 130%<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:11px; color:#fff; margin-bottom:5px; white-space:nowrap;'>무한의 대검 보유 시</div><div style='font-size:12px; color:#ff9900; font-weight:bold;'>139%</div><div style='font-size:10px; color:#9aa4af; margin-top:5px; white-space:nowrap;'>치명타 피해량 200% → 230%</div></span></span>", // CriticalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "9 / 8.25 / 7.5 / 6.75 / 6",
            "cost": "-",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/garen/hud/icons2d/garen_e2.png"],
            "stats": {
                "효과 범위": "325"
            }
        },
        "R": {
            "p1": "125 / 200 / 275", // BaseDamage
            "p2": "25 / 30 / 35", // ExecuteDamage*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "-",
            "stats": {
                "사거리": "400",
                "시전시간": "0.435",
                "투사체 속도": "900"
            }
        },
    },
    "Galio": { // 갈리오
        "P": {
            "p1": "15 ~ 115 (레벨에 따라) (+ 총 공격력의 100% + 주문력의 40% + 추가 마법 저항력의 60%)", // TotalDamage
            "p2": "3", // ChargeRatePerHit
            "cooldown": "5", // PassiveCooldownModified
            "cost": "-",
            "stats": {
                "효과 범위": "250"
            }
        },
        "Q": {
            "p1": "70 / 105 / 140 / 175 / 210 (+ 주문력의 70%)", // QMissileDamage
            "p2": "2", // SuperQDuration
            "p3": "8 (+ 주문력의 4%)", // PercentSuperQDamageTT
            "p4": "200", // SuperQMonsterMaxDamageTotal
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "825",
                "효과 범위": "150",
                "스킬 폭": "200",
                "시전시간": "0.25",
                "투사체 속도": "1300"
            }
        },
        "W": {
            "p1": "12 ~ 8 (레벨에 따라)", // PassiveShieldOOCTimer
            "p2": "최대 체력의 7.5 / 9 / 10.5 / 12 / 13.5%", // TotalPassiveShield
            "p3": "25 / 30 / 35 / 40 / 45% (+ 주문력의 4% + 추가 마법 저항력의 8% + 추가 최대 체력의 1%)", // MagicDamageReduction
            "p4": "12.5 / 15 / 17.5 / 20 / 22.5% (+ 주문력의 2% + 추가 마법 저항력의 4% + 추가 최대 체력의 0.5%)", // PhysicalDamageReduction
            "p5": "15", // SelfSlowPercent
            "p6": "0.5", // CCDurationMin
            "p7": "1.5", // CCDurationMax
            "p8": "20 / 30 / 40 / 50 / 60 (+ 주문력의 30%)", // MinTotalDamage
            "p9": "60 / 90 / 120 / 150 / 180 (+ 주문력의 90%)", // MaxTotalDamage
            "p10": "2", // DRLingerDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "18 / 17 / 16 / 15 / 14",
            "cost": "50",
            "stats": {
                "사거리": "275",
                "효과 범위": "175 ~ 350 (충전 시간에 따라)"
            }
        },
        "E": {
            "p1": "0.75", // KnockupDuration
            "p2": "100 / 135 / 170 / 205 / 240 (+ 주문력의 100%)", // TotalDamage
            "p3": "80 / 108 / 136 / 164 / 192 (+ 주문력의 80%)", // PVEDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "50",
            "stats": {
                "사거리": "650",
                "스킬 폭": "320",
                "시전시간": "0.4",
                "돌진 속도": "2300"
            }
        },
        "R": {
            "p1": "5", // TemporaryWShieldDuration
            "p2": "0.75", // StunDurationOuter
            "p3": "150 / 250 / 350 (+ 주문력의 70% + 추가 마법 저항력의 100%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "180 / 160 / 140",
            "cost": "100",
            "stats": {
                "사거리": "4000 / 4750 / 5500",
                "효과 범위": "650"
            }
        },
    },
    "Gangplank": { // 갱플랭크
        "P": {
            "p1": "2.5", // DoTDuration
            "p2": "50 ~ 250 (레벨에 따라) (+ 추가 공격력의 100%)", // TotalDamage
            "p3": "2", // MoveSpeedDuration
            "p4": "15 ~ 30% (레벨에 따라)", // MoveSpeed
            "cooldown": "15", // Cooldown
            "cost": "-"
        },
        "Q": {
            "p1": "1", // GameModeInteger
            "p2": "10 / 40 / 70 / 100 / 130 (+ 총 공격력의 100%)의 200%<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:11px; color:#fff; margin-bottom:5px; white-space:nowrap;'>무한의 대검 보유 시</div><div style='font-size:12px; color:#ff9900; font-weight:bold;'>230%</div><div style='font-size:10px; color:#9aa4af; margin-top:5px; white-space:nowrap;'>치명타 피해량 200% → 230%</div></span></span>", // ShotCrit
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "4.5",
            "cost": "50 / 45 / 40 / 35 / 30",
            "stats": {
                "사거리": "625",
                "시전시간": "0.25",
                "투사체 속도": "2600"
            }
        },
        "W": {
            "p1": "45 / 70 / 95 / 120 / 145 (+ 주문력의 90%)", // BaseHealth
            "p2": "13", // PercentHeal
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "22 / 20 / 18 / 16 / 14",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "시전시간": "0.25"
            }
        },
        "E": {
            "p1": "25", // BarrelDuration
            "p2": "2", // DebuffDuration
            "p3": "40 / 50 / 60 / 70 / 80", // FinalSlowAmount
            "p4": "40", // BarrelArmorPenetration
            "p5": "75 / 95 / 115 / 135 / 155", // BonusDamageToChampions
            "p6": "2 ~ 0.5 (레벨에 따라)", // BarrelDecayTime
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "재충전 대기시간 17 / 16 / 15 / 14 / 13초 (재사용 0.5초)<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:12px; color:#fff; white-space:nowrap;'>최대: 3 / 3 / 4 / 4 / 5개</div></span></span>",
            "cost": "-",
            "stats": {
                "사거리": "1000",
                "효과 범위": "345",
                "시전시간": "0.25"
            }
        },
        "R": {
            "p1": "8", // ZoneDuration
            "p2": "12", // TotalWavesTooltip
            "p3": "0.5", // SlowDuration
            "p4": "30", // SlowPercent
            "p5": "40 / 70 / 100 (+ 주문력의 10%)", // OneWaveDamage
            "p6": "480 / 840 / 1200 (+ 주문력의 120%)", // TotalDamageTooltip
            "p7": "120 / 210 / 300 (+ 주문력의 30%)", // DeathsDaughterDamage
            "p8": "1", // DeathsDaughterSlowDuration
            "p9": "75", // DeathsDaughterSlow
            "p10": "2", // RaiseMoraleHasteDuration
            "p11": "40", // RaiseMoraleHaste
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "160 / 140 / 120",
            "cost": "100",
            "stats": {
                "사거리": "전역",
                "효과 범위": "580",
                "시전시간": "0.25"
            }
        },
    },
    "Gragas": { // 그라가스
        "P": {
            "p1": "최대 체력의 5.5%", // HealAmount
            "cooldown": "12 ~ 6 (레벨에 따라)", // HealCooldown
            "cost": "-"
        },
        "Q": {
            "p1": "4", // BarrelMaxDuration
            "p2": "80 / 120 / 160 / 200 / 240 (+ 주문력의 80%)", // MinDamage
            "p3": "120 / 180 / 240 / 300 / 360 (+ 주문력의 120%)", // MaxDamage
            "p4": "2", // SlowDuration
            "p5": "40 / 45 / 50 / 55 / 60", // SlowPercent
            "p6": "60 / 67.5 / 75 / 82.5 / 90", // SlowPercent*1.5
            "p7": "70", // MinionDamageMod
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "80",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/gragas/hud/icons2d/gragasqcrit.png"],
            "stats": {
                "사거리": "850",
                "효과 범위": "250",
                "스킬 폭": "220",
                "시전시간": "0.25",
                "투사체 속도": "1000"
            }
        },
        "W": {
            "p1": "2.5", // DefenseDuration
            "p2": "10 / 14 / 18 / 22 / 26% (+ 주문력의 4%)", // DamageReduction
            "p3": "20 / 50 / 80 / 110 / 140 (+ 주문력의 70%)", // TotalDamage
            "p4": "7", // MaxHPPercentDamage
            "p5": "300", // MonsterDamageCap
            "p6": "50", // TurretDamageMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "5",
            "cost": "30",
            "stats": {
                "효과 범위": "250"
            }
        },
        "E": {
            "p1": "1", // StunDuration
            "p2": "80 / 125 / 170 / 215 / 260 (+ 주문력의 60%)", // TotalDamage
            "p3": "40", // CooldownRefund*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14 / 13.5 / 13 / 12.5 / 12",
            "cost": "50",
            "stats": {
                "사거리": "600",
                "효과 범위": "180",
                "스킬 폭": "100",
                "돌진 속도": "900"
            }
        },
        "R": {
            "p1": "200 / 300 / 400 (+ 주문력의 80%)", // DamageDone
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "100 / 85 / 70",
            "cost": "100",
            "stats": {
                "사거리": "1000",
                "효과 범위": "400",
                "스킬 폭": "240",
                "시전시간": "0.25",
                "투사체 속도": "200"
            }
        },
    },
    "Graves": { // 그레이브즈
        "P": {
            "p1": "총 공격력의 70 ~ 100.005 (레벨에 따라)%", // SingleBulletDamage
            "p2": "총 공격력의 70 ~ 100.005 (레벨에 따라)%", // MultiBulletDamage
            "p3": "50%<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:11px; color:#fff; margin-bottom:5px; white-space:nowrap;'>무한의 대검 보유 시</div><div style='font-size:12px; color:#ff9900; font-weight:bold;'>65%</div><div style='font-size:10px; color:#9aa4af; margin-top:5px; white-space:nowrap;'>치명타 피해량 200% → 230%</div></span></span>", // CritDamageMult
            "p4": "25", // StructureDamageReduction*100
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "스킬 폭": "40",
                "투사체 속도": "3000"
            }
        },
        "Q": {
            "p1": "50 / 75 / 100 / 125 / 150 (+ 추가 공격력의 65%)", // TotalDamage
            "p2": "80 / 125 / 170 / 215 / 260 (+ 추가 공격력의 55 / 70 / 85 / 100 / 115%)", // TotalDetonationDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "13 / 11.25 / 9.5 / 7.75 / 6",
            "cost": "80",
            "stats": {
                "사거리": "925",
                "스킬 폭": "80",
                "시전시간": "0.25",
                "투사체 속도": "902"
            }
        },
        "W": {
            "p1": "50", // SlowAmount
            "p2": "60 / 110 / 160 / 210 / 260 (+ 주문력의 60%)", // ImpactDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "26 / 24 / 22 / 20 / 18",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "950",
                "효과 범위": "200",
                "시전시간": "0.25",
                "투사체 속도": "1650"
            }
        },
        "E": {
            "p1": "4", // BuffDuration
            "p2": "8", // MaxStacks
            "p3": "7 / 10 / 13 / 16 / 19", // ArmorPerStack
            "p4": "3.5 / 5 / 6.5 / 8 / 9.5", // MRGrant
            "p5": "0.5", // CooldownPerHit
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "40",
            "stats": {
                "사거리": "425",
                "스킬 폭": "100",
                "돌진 속도": "750"
            }
        },
        "R": {
            "p1": "275 / 425 / 575 (+ 추가 공격력의 150%)", // Damage
            "p2": "200 / 320 / 440 (+ 추가 공격력의 120%)", // FalloffDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "100 / 80 / 60",
            "cost": "100",
            "stats": {
                "사거리": "1000",
                "효과 범위": "740",
                "스킬 폭": "200",
                "시전시간": "0.25",
                "투사체 속도": "1400"
            }
        },
    },
    "Gwen": { // 그웬
        "P": {
            "p1": "1% (+ 주문력의 0.6%)", // PercentHealth1000Cuts
            "p2": "67%", // HealingPercent
            "p3": "12 ~ 40 (레벨에 따라) (+ 주문력의 7%)", // healcap
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "6", // BuffDuration
            "p2": "10 / 14 / 18 / 22 / 26 (+ 주문력의 5%)", // MiniSwipeDamage
            "p3": "60 / 85 / 110 / 135 / 160 (+ 주문력의 35%)", // FinalSwipeDamage
            "p4": "50", // TrueDamageConversion*100
            "p5": "80", // MinionMod*100
            "p6": "20", // ExecuteThreshold*100
            "p7": "1000", // ExecuteBonus
            "p8": "60 / 85 / 110 / 135 / 160 + 주문력의 35% + 주문력의 25% + 50 / 70 / 90 / 110 / 130", // MaxDamage
            "p9": "6% (+ 주문력의 3.6%)", // spell.GwenP:PassiveMaxQTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "6.5 / 5.75 / 5 / 4.25 / 3.5",
            "cost": "40",
            "stats": {
                "사거리": "450",
                "스킬 폭": "120",
                "시전시간": "0.5"
            }
        },
        "W": {
            "p1": "4", // ZoneDuration
            "p2": "22 / 24 / 26 / 28 / 30 (+ 주문력의 7%)", // TotalResists
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "22 / 21 / 20 / 19 / 18",
            "cost": "60",
            "stats": {
                "효과 범위": "480"
            }
        },
        "E": {
            "p1": "4", // BuffDuration
            "p2": "30 / 42.5 / 55 / 67.5 / 80%", // BonusAttackSpeed
            "p3": "15 (+ 주문력의 20%)", // OnHitDamage
            "p4": "75", // BonusAttackRange
            "p5": "25 / 35 / 45 / 55 / 65", // CDRefund*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "13 / 12.5 / 12 / 11.5 / 11",
            "cost": "35",
            "stats": {
                "사거리": "400",
                "스킬 폭": "320",
                "투사체 속도": "700",
                "돌진 속도": "800"
            }
        },
        "R": {
            "p1": "30 / 50 / 70 (+ 주문력의 10%)", // TotalDamage
            "p2": "1.5", // DebuffDuration
            "p3": "40 / 50 / 60", // InitialSlow*-100
            "p4": "1", // LockoutTime
            "p5": "90 / 150 / 210 (+ 주문력의 30%)", // TotalDamage3
            "p6": "150 / 250 / 350 (+ 주문력의 50%)", // TotalDamage5
            "p7": "15 / 20 / 25", // SubsequentSlow*-100
            "p8": "270 / 450 / 630 (+ 주문력의 90%)", // MaxDamage
            "p9": "9% (+ 주문력의 5.4%)", // spell.GwenP:PassiveMaxRTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/gwen/hud/icons2d/gwen_r2.png", "https://raw.communitydragon.org/latest/game/assets/characters/gwen/hud/icons2d/gwen_r3.png"],
            "stats": {
                "사거리": "1200",
                "스킬 폭": "240 ~ 30 (거리에 따라)",
                "시전시간": "0.25",
                "투사체 속도": "1800"
            }
        },
    },
    "Gnar": { // 나르
        "P": {
            "p1": "0 ~ 20 (레벨에 따라)", // TotalMS
            "p2": "5.5 ~ 99% (레벨에 따라)", // TotalAS
            "p3": "0 ~ 100 (레벨에 따라)", // TotalAttackRange
            "p4": "100 ~ 831 (레벨에 따라)", // TotalMegaGnarHealth
            "p5": "3.5 ~ 54.5 (레벨에 따라)", // TotalMegaGnarArmor
            "p6": "3.5 ~ 63 (레벨에 따라)", // TotalMegaGnarMR
            "p7": "6 ~ 48.5 (레벨에 따라)", // TotalMegaGnarAD
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "5 / 45 / 85 / 125 / 165 (+ 총 공격력의 125%)", // spell.GnarQ:MiniTotalDamage
            "p2": "2", // spell.GnarQ:SlowDuration
            "p3": "15 / 20 / 25 / 30 / 35", // spell.GnarQ:SlowAmount*100
            "p4": "40", // spell.GnarQ:MiniCDRefund*100
            "p5": "50", // MiniSubsequentMult*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "16 / 14.5 / 13 / 11.5 / 10",
            "cost": "-",
            "form1": "미니 나르",
            "stats": {
                "사거리": "1100<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:12px; color:#fff; white-space:nowrap;'>돌아올 때 3000</div></span></span>",
                "스킬 폭": "110",
                "시전시간": "0.25",
                "투사체 속도": "2500"
            }
        },
        "W": {
            "p1": "0 / 10 / 20 / 30 / 40 (+ 주문력의 100%)", // spell.GnarW:MiniTotalDamage
            "p2": "6 / 8 / 10 / 12 / 14", // spell.GnarW:MiniPercentHPDamage*100
            "p3": "40 / 60 / 80", // spell.GnarR:RHyperMovementSpeedPercent
            "p4": "3", // spell.GnarW:MiniHasteDuration
            "p5": "300", // MiniMonsterCap
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "7",
            "cost": "-",
            "form1": "미니 나르",
            "stats": {
                "사거리": "550",
                "스킬 폭": "200",
                "시전시간": "0.6"
            }
        },
        "E": {
            "p1": "6", // spell.GnarE:MiniASDuration
            "p2": "40 / 45 / 50 / 55 / 60", // spell.GnarE:MinibAS*100
            "p3": "50 / 85 / 120 / 155 / 190 (+ 최대 체력의 6%)", // spell.GnarE:MiniTotalDamage
            "p4": "80", // spell.GnarE:MoveSpeedMod*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "22 / 19.5 / 17 / 14.5 / 12",
            "cost": "-",
            "form1": "미니 나르",
            "stats": {
                "사거리": "475",
                "효과 범위": "150"
            }
        },
        "R": {
            "p1": "200 / 300 / 400 (+ 주문력의 100% + 추가 공격력의 50%)", // Damage
            "p2": "1.25 / 1.5 / 1.75", // RCCDuration
            "p3": "45", // RSlowPercent
            "p4": "300 / 450 / 600 (+ 주문력의 150% + 추가 공격력의 75%)", // WallDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "90 / 60 / 30",
            "cost": "-",
            "stats": {
                "사거리": "590",
                "효과 범위": "475",
                "시전시간": "0.25",
                "투사체 속도": "1200"
            }
        },
        "Q2": {
            "p1": "45 / 90 / 135 / 180 / 225 (+ 총 공격력의 140%)", // spell.GnarQ:MegaTotalDamage
            "p2": "2", // spell.GnarQ:MegaSlowDuration
            "p3": "30 / 35 / 40 / 45 / 50", // spell.GnarQ:MegaSlowAmount*100
            "p4": "70", // spell.GnarQ:MegaCDRefund*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "17.5 / 16 / 14.5 / 13 / 11.5",
            "cost": "-",
            "name": "돌덩이 던지기",
            "form": "메가 나르",
            "icon": "https://raw.communitydragon.org/latest/game/assets/characters/gnar/hud/icons2d/gnarbig_q.png"
        },
        "W2": {
            "p1": "45 / 75 / 105 / 135 / 165 (+ 총 공격력의 100%)", // spell.GnarW:MegaTotalDamage
            "p2": "1.25", // spell.GnarW:MegaStunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "7",
            "cost": "-",
            "name": "쿵쾅",
            "form": "메가 나르",
            "icon": "https://raw.communitydragon.org/latest/game/assets/characters/gnar/hud/icons2d/gnarbig_w.png"
        },
        "E2": {
            "p1": "80 / 115 / 150 / 185 / 220 (+ 최대 체력의 6%)", // spell.GnarE:MegaTotalDamage
            "p2": "80", // spell.GnarE:MoveSpeedMod*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "24.5 / 22 / 19.5 / 17 / 14.5",
            "cost": "-",
            "name": "우지끈",
            "form": "메가 나르",
            "icon": "https://raw.communitydragon.org/latest/game/assets/characters/gnar/hud/icons2d/gnarbig_e.png"
        },
    },
    "Nami": { // 나미
        "P": {
            "p1": "100 (+ 주문력의 25%)", // TotalMSBonus
            "p2": "1.5", // BuffDuration
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "1.5", // StunDuration
            "p2": "90 / 145 / 200 / 255 / 310 (+ 주문력의 50%)", // TotalDamageTT
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "60",
            "stats": {
                "사거리": "875",
                "효과 범위": "200",
                "시전시간": "0.25",
                "투사체 속도": "1750"
            }
        },
        "W": {
            "p1": "3", // MaxTargets
            "p2": "55 / 80 / 105 / 130 / 155 (+ 주문력의 40%)", // TotalHeal
            "p3": "60 / 95 / 130 / 165 / 200 (+ 주문력의 50%)", // TotalDamage
            "p4": "-20% (+ 주문력의 15%)", // BounceScaling
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "725",
                "효과 범위": "800",
                "시전시간": "0.25",
                "투사체 속도": "2000"
            }
        },
        "E": {
            "p1": "6", // BuffDuration
            "p2": "3", // HitCount
            "p3": "1", // SlowDuration
            "p4": "15 / 20 / 25 / 30 / 35% (+ 주문력의 5%)", // TotalSlow
            "p5": "20 / 35 / 50 / 65 / 80 (+ 주문력의 20%)", // TotalDamage
            "p6": "33 ~ 66% (레벨에 따라)", // AoEMod
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "11",
            "cost": "55 / 60 / 65 / 70 / 75",
            "stats": {
                "사거리": "800",
                "시전시간": "0.25"
            }
        },
        "R": {
            "p1": "70", // SlowAmount
            "p2": "150 / 250 / 350 (+ 주문력의 60%)", // TotalDamage
            "p3": "4", // MaxSlowDuration
            "p4": "2", // MinSlowDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 110 / 100",
            "cost": "100",
            "stats": {
                "사거리": "2550",
                "효과 범위": "750",
                "스킬 폭": "650",
                "시전시간": "0.5",
                "투사체 속도": "850"
            }
        },
    },
    "Nasus": { // 나서스
        "P": {
            "p1": "12 ~ 24 (레벨에 따라)", // Spell.NasusPassive:LifestealTooltip
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "40 / 60 / 80 / 100 / 120 (+ 총 공격력의 100% + 1 (중첩당))", // TotalDamage
            "p2": "4", // BasicStacks
            "p3": "10", // BigStacks
            "p4": "치명타 피해량의 100% x (40 / 60 / 80 / 100 / 120 + 총 공격력의 100%) (+ 1 (중첩당))", // CritDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "7.5 / 6.5 / 5.5 / 4.5 / 3.5",
            "cost": "20"
        },
        "W": {
            "p1": "35", // SlowBase
            "p2": "5", // Duration
            "p3": "47 / 59 / 71 / 83 / 95", // MaxSlowTooltipOnly
            "p4": "75", // AttackSpeedSlowMult*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "80",
            "stats": {
                "사거리": "700",
                "시전시간": "0.25"
            }
        },
        "E": {
            "p1": "50 / 80 / 110 / 140 / 170 (+ 주문력의 60%)", // InitialDamage
            "p2": "30 / 35 / 40 / 45 / 50", // ArmorShredPercent*-100
            "p3": "5", // Duration
            "p4": "50 / 80 / 110 / 140 / 170 (+ 주문력의 60%)", // TotalDotDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "650",
                "효과 범위": "400",
                "시전시간": "0.25"
            }
        },
        "R": {
            "p1": "300 / 450 / 600", // BonusHealth
            "p2": "40 / 55 / 70", // InitialResistGain
            "p3": "3 / 4 / 5% (+ 주문력의 1%)", // DamageCalc
            "p4": "50", // QCDR*100
            "p5": "240", // MaxDamageCap
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": {
                "시전시간": "0.2"
            }
        },
    },
    "Naafiri": { // 나피리
        "P": {
            "p1": "10 ~ 20 (레벨에 따라) (+ 추가 공격력의 4%)", // PackmateTotalDamage
            "p2": "30 ~ 10 (레벨에 따라)", // PackmateSpawnCooldown
            "p3": "13 ~ 26 (레벨에 따라) (+ 추가 공격력의 5.2%)", // FrenzyDamageTooltipOnly
            "p4": "4", // CooldownReduceOnAbilityHit
            "p5": "1", // CooldownReduceOnKill
            "p6": "2 ~ 5 (레벨에 따라)", // PackmateCap
            "cooldown": "30 ~ 10 (레벨에 따라)", // PackmateSpawnCooldown
            "cost": "-"
        },
        "Q": {
            "p1": "35 / 40 / 45 / 50 / 55 (+ 추가 공격력의 20%)", // spell.NaafiriQ:TotalDamageFirstCast
            "p2": "5", // spell.NaafiriQ:BleedDuration
            "p3": "35 / 60 / 85 / 110 / 135 (+ 추가 공격력의 80%)", // spell.NaafiriQ:TotalBleedDamage
            "p4": "30 / 42.5 / 55 / 67.5 / 80 (+ 추가 공격력의 40%)", // spell.NaafiriQ:TotalMinDamageSecondCast
            "p5": "60 / 85 / 110 / 135 / 160 (+ 추가 공격력의 140%)", // spell.NaafiriQ:TotalMaxDamageSecondCast
            "p6": "45 / 60 / 75 / 90 / 105 (+ 추가 공격력의 40%)", // spell.NaafiriQ:TotalHealSecondCast
            "p7": "2", // spell.NaafiriP:PackmateTauntDuration
            "p8": "30 ~ 70 (레벨에 따라)", // MinionExecuteThreshold
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "9 / 8.5 / 8 / 7.5 / 7",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "900",
                "스킬 폭": "100",
                "시전시간": "0.25",
                "투사체 속도": "1700"
            }
        },
        "W": {
            "p1": "1", // UntargetableDuration
            "p2": "2", // PackmatesToAdd
            "p3": "5", // Duration
            "p4": "총 공격력의 20%", // BonusAD
            "p5": "20 / 22.5 / 25 / 27.5 / 30", // MoveSpeedAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "26 / 24 / 22 / 20 / 18",
            "cost": "60",
            "stats": {
                "시전시간": "0.75"
            }
        },
        "E": {
            "p1": "15 / 25 / 35 / 45 / 55 (+ 추가 공격력의 40%)", // TotalDamageFirstSlash
            "p2": "60 / 85 / 110 / 135 / 160 (+ 추가 공격력의 80%)", // TotalDamageSecondSlash
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "40",
            "stats": {
                "사거리": "450",
                "효과 범위": "230",
                "돌진 속도": "900"
            }
        },
        "R": {
            "p1": "125 / 200 / 275 (+ 추가 공격력의 100%)", // TotalDamage
            "p2": "12.5 / 20 / 27.5 (+ 추가 공격력의 10%)", // PackmateDamage
            "p3": "7", // TakedownWindow
            "p4": "3", // ShieldDuration
            "p5": "100 / 150 / 200 (+ 추가 공격력의 150%)", // ShieldTotal
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "110 / 95 / 80",
            "cost": "100",
            "stats": {
                "사거리": "900",
                "돌진 속도": "1800"
            }
        },
    },
    "Nautilus": { // 노틸러스
        "P": {
            "p1": "14 ~ 116 (레벨에 따라) (+ 총 공격력의 100%)", // TotalDamageTooltip
            "p2": "0.75 ~ 1.5 (레벨에 따라)", // RootDuration
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "85 / 130 / 175 / 220 / 265 (+ 주문력의 90%)", // QDamageCalc
            "p2": "50", // TerrainCDR*100
            "p3": "50", // TerrainMana*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "60",
            "stats": {
                "사거리": "1150",
                "스킬 폭": "160",
                "시전시간": "0.25",
                "투사체 속도": "2000"
            }
        },
        "W": {
            "p1": "6", // ShieldDuration
            "p2": "50 / 60 / 70 / 80 / 90 (+ 최대 체력의 8 / 9 / 10 / 11 / 12%)", // ShieldCalc
            "p3": "30 / 40 / 50 / 60 / 70 (+ 주문력의 40%)", // DotDamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12",
            "cost": "60",
            "stats": {
                "효과 범위": "250"
            }
        },
        "E": {
            "p1": "55 / 90 / 125 / 160 / 195 (+ 주문력의 50%)", // DamageCalc
            "p2": "1.25", // SlowDuration
            "p3": "30 / 35 / 40 / 45 / 50", // SlowPercent*100
            "p4": "50", // ExtraWavePenalty*100
            "p5": "125 / 165 / 205 / 245 / 285 (+ 주문력의 50%)", // MonsterBonusCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "7 / 6.5 / 6 / 5.5 / 5",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "600",
                "시전시간": "0.25"
            }
        },
        "R": {
            "p1": "150 / 275 / 400 (+ 주문력의 80%)", // PrimaryTargetDamage
            "p2": "1 / 1.5 / 2", // StunDuration
            "p3": "125 / 175 / 225 (+ 주문력의 40%)", // SecondaryTargetDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": {
                "사거리": "825",
                "효과 범위": "225",
                "시전시간": "0.46",
                "투사체 속도": "1400"
            }
        },
    },
    "Nocturne": { // 녹턴
        "P": {
            "p1": "12", // Cooldown
            "p2": "총 공격력의 120%", // TotalDamageNoCrit
            "p3": "13 ~ 32 (레벨에 따라) (+ 주문력의 30%)", // TotalHealing
            "p4": "1", // AACDR
            "p5": "3", // AAChampMonsterCDR
            "cooldown": "12", // Cooldown
            "cost": "-",
            "stats": {
                "효과 범위": "360"
            }
        },
        "Q": {
            "p1": "65 / 105 / 145 / 185 / 225 (+ 추가 공격력의 85%)", // TotalDamage
            "p2": "5", // TrailDuration
            "p3": "20 / 25 / 30 / 35 / 40", // MoveSpeed
            "p4": "15 / 25 / 35 / 45 / 55", // BonusTrailAD
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "8",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "1125",
                "효과 범위": "150",
                "스킬 폭": "120",
                "시전시간": "0.25",
                "투사체 속도": "1600"
            }
        },
        "W": {
            "p1": "30 / 35 / 40 / 45 / 50", // ActiveAS
            "p2": "5", // DoubleASDuration
            "p3": "60 / 70 / 80 / 90 / 100", // ActiveAS*2
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "50"
        },
        "E": {
            "p1": "90", // TooltipFearMS*100
            "p2": "2", // LeashDuration
            "p3": "80 / 125 / 170 / 215 / 260 (+ 주문력의 100%)", // TotalDamage
            "p4": "1.25 / 1.5 / 1.75 / 2 / 2.25", // CCDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "425",
                "효과 범위": "1000",
                "투사체 속도": "1400"
            }
        },
        "R": {
            "p1": "6", // ParanoiaDuration
            "p2": "150 / 275 / 400 (+ 추가 공격력의 120%)", // Damage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "140 / 115 / 90",
            "cost": "100",
            "stats": {
                "사거리": "2500 / 3250 / 4000",
                "효과 범위": "전역 (어둠)",
                "돌진 속도": "1800"
            }
        },
    },
    "Nunu": { // 누누와 윌럼프
        "P": {
            "p1": "20", // ASIncrease*100
            "p2": "10", // MSIncrease*100
            "p3": "총 공격력의 30%", // CleaveDamage
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "사거리": "1000"
            }
        },
        "Q": {
            "p1": "400 / 600 / 800 / 1000 / 1200", // MonsterMinionDamage
            "p2": "65 / 95 / 125 / 155 / 185 (+ 추가 최대 체력의 10% + 주문력의 90%)", // MonsterHealing
            "p3": "60 / 100 / 140 / 180 / 220 (+ 추가 최대 체력의 5% + 주문력의 65%)", // TotalChampionDamage
            "p4": "39 / 57 / 75 / 93 / 111 (+ 추가 최대 체력의 6% + 주문력의 54%)", // ChampionHealing
            "p5": "50", // LowHealthThreshhold*100
            "p6": "50", // LowHealthHealingScalar*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "60",
            "stats": {
                "사거리": "125",
                "시전시간": "0.3"
            }
        },
        "W": {
            "p1": "36 / 45 / 54 / 63 / 72 (+ 주문력의 30%)", // NoImpactSnowballDamage
            "p2": "180 / 225 / 270 / 315 / 360 (+ 주문력의 150%)", // MaximumSnowballDamage
            "p3": "0.5", // BaseKnockupDuration
            "p4": "0.5 (+ 0.75)", // MaximumStunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14",
            "cost": "50 / 55 / 60 / 65 / 70",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/nunu/hud/icons2d/nunuw2.png"],
            "stats": {
                "효과 범위": "130 ~ 390 (눈덩이 크기에 따라)",
                "스킬 폭": "200",
                "투사체 속도": "1500"
            }
        },
        "E": {
            "p1": "15 / 22.5 / 30 / 37.5 / 45 (+ 주문력의 12%)", // TotalSnowballDamage
            "p2": "1", // SlowDuration
            "p3": "30 / 35 / 40 / 45 / 50", // SlowAmount*-100
            "p4": "3", // TotalSpellDuration
            "p5": "0.5 ~ 1.5 (레벨에 따라)", // RootDuration
            "p6": "20 / 30 / 40 / 50 / 60 (+ 주문력의 80%)", // TotalRootDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "625",
                "스킬 폭": "160",
                "투사체 속도": "1850"
            }
        },
        "R": {
            "p1": "3", // ChannelDuration
            "p2": "50", // SlowStartAmount*-100
            "p3": "95", // MaxSlowAmount*-100
            "p4": "65 / 75 / 85 (+ 추가 최대 체력의 30 / 40 / 50% + 주문력의 150%)", // TotalShieldAmount
            "p5": "3", // ShieldDecayDuration
            "p6": "625 / 925 / 1275 (+ 주문력의 300%)", // MaximumDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "110 / 100 / 90",
            "cost": "100",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/nunu/hud/icons2d/nunur.png"],
            "stats": {
                "효과 범위": "650"
            }
        },
    },
    "Nidalee": { // 니달리
        "P": {
            "p1": "10", // spell.AspectOfTheCougar:PassivePercentMS
            "p2": "30", // spell.AspectOfTheCougar:PassivePercentMS*3
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "효과 범위": "3000"
            }
        },
        "Q": {
            "p1": "70 / 90 / 110 / 130 / 150 (+ 주문력의 50%)", // HumanMinimumDamage
            "p2": "227.5 / 292.5 / 357.5 / 422.5 / 487.5 (+ 주문력의 162.5%)", // HumanMaximumDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "6",
            "cost": "50 / 55 / 60 / 65 / 70",
            "form1": "인간 형태",
            "stats": {
                "사거리": "1500",
                "스킬 폭": "80",
                "시전시간": "0.25",
                "투사체 속도": "1300"
            }
        },
        "W": {
            "p1": "4", // DotDuration
            "p2": "10 / 20 / 30 / 40 / 50 (+ 주문력의 5%)", // DamagePerSecond
            "p3": "4 ~ 10 (레벨에 따라)", // MaxTraps
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "30 / 35 / 40 / 45 / 50",
            "form1": "인간 형태",
            "stats": {
                "사거리": "900",
                "시전시간": "0.25",
                "투사체 속도": "1450"
            }
        },
        "E": {
            "p1": "50 / 75 / 100 / 125 / 150 (+ 주문력의 35%)", // TotalHealing
            "p2": "100 / 150 / 200 / 250 / 300 (+ 주문력의 70%)", // MaxHealing
            "p3": "7", // ASDuration
            "p4": "30 / 40 / 50 / 60 / 70", // BonusAS*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12",
            "cost": "50 / 55 / 60 / 65 / 70",
            "form1": "인간 형태",
            "stats": {
                "사거리": "900",
                "시전시간": "0.25"
            }
        },
        "R": {
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "3",
            "cost": "-",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/nidalee/hud/icons2d/nidalee_r2.png"]
        },
        "Q2": {
            "p1": "5 / 30 / 55 / 80 (+ 총 공격력의 75% + 주문력의 40%)", // spell.AspectOfTheCougar:TotalTakedownDamage
            "p2": "1 / 1.25 / 1.5 / 1.75", // spell.AspectOfTheCougar:TakedownDamageAmp
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "6",
            "cost": "-",
            "name": "숨통 끊기",
            "form": "쿠거 형태",
            "icon": "https://raw.communitydragon.org/latest/game/assets/characters/nidalee/hud/icons2d/nidalee_q2.png"
        },
        "W2": {
            "p1": "55 / 100 / 145 / 190 (+ 추가 공격력의 50% + 주문력의 30%)", // spell.AspectOfTheCougar:TotalPounceDamage
            "p2": "3 / 2.5 / 2 / 1.5", // spell.AspectOfTheCougar:PounceCooldown
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "6",
            "cost": "-",
            "name": "급습",
            "form": "쿠거 형태",
            "icon": "https://raw.communitydragon.org/latest/game/assets/characters/nidalee/hud/icons2d/nidalee_w2.png"
        },
        "E2": {
            "p1": "70 / 130 / 190 / 250 (+ 추가 공격력의 70% + 주문력의 55%)", // spell.AspectOfTheCougar:TotalSwipeDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "6",
            "cost": "-",
            "name": "할퀴기",
            "form": "쿠거 형태",
            "icon": "https://raw.communitydragon.org/latest/game/assets/characters/nidalee/hud/icons2d/nidalee_e2.png"
        },
    },
    "Neeko": { // 니코
        "P": {
            "cooldown": "6<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:11px; color:#fff; margin-bottom:5px; white-space:nowrap;'>실제 재사용 대기시간</div><div style='font-size:12px; color:#ff9900; font-weight:bold;'>2초</div><div style='font-size:10px; color:#9aa4af; margin-top:5px; white-space:nowrap;'>6초는 인게임 툴팁 표시값입니다</div></span></span>", // PassiveCooldown
            "cost": "-"
        },
        "Q": {
            "p1": "60 / 110 / 160 / 210 / 260 (+ 주문력의 60%)", // ExplosionDamage
            "p2": "35 / 60 / 85 / 110 / 135 (+ 주문력의 25%)", // SecondDamage
            "p3": "35 / 50 / 65 / 80 / 95", // MonsterBonus
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "9 / 8.5 / 8 / 7.5 / 7",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "800",
                "효과 범위": "250",
                "시전시간": "0.25",
                "투사체 속도": "2000"
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
            "p8": "75", // MonsterBonus
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "-",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/neeko/hud/icons2d/neeko_w2.png"],
            "stats": {
                "사거리": "900"
            }
        },
        "E": {
            "p1": "70 / 105 / 140 / 175 / 210 (+ 주문력의 65%)", // BaseDamage
            "p2": "0.7 / 0.9 / 1.1 / 1.3 / 1.5", // MinRootDuration
            "p3": "1.8 / 2.1 / 2.4 / 2.7 / 3", // MaxRootDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "1000",
                "스킬 폭": "140",
                "시전시간": "0.25",
                "투사체 속도": "1300"
            }
        },
        "R": {
            "p1": "0.6", // DelayUntilExplosion
            "p2": "150 / 350 / 550 (+ 주문력의 120%)", // TotalDamage
            "p3": "0.75", // StunDuration
            "p4": "0.5", // DelayBeforePassiveRemoval
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 105 / 90",
            "cost": "100",
            "stats": {
                "사거리": "600",
                "효과 범위": "590",
                "시전시간": "0.6"
            }
        },
    },
    "Nilah": { // 닐라
        "P": {
            "p1": "50", // ExperiencePercentage*100
            "p2": "7.5", // HealingIncrease*100
            "p3": "15", // ShieldIncrease*100
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "효과 범위": "1000"
            }
        },
        "Q": {
            "p1": "치명타 확률의 30%", // CritArmorPen
            "p2": "치명타 확률의 20%", // CritLifesteal
            "p3": "4", // ShieldDuration
            "p4": "0 / 10 / 20 / 30 / 40 (+ 총 공격력의 100%)", // DamageCalc
            "p5": "10 ~ 60 (레벨에 따라)", // BonusAttackSpeedCalc
            "p6": "4", // BuffDuration
            "p7": "70", // ActiveCritScaling*100
            "p8": "33", // MinionMod*100
            "p9": "100", // MonsterMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "4",
            "cost": "30",
            "stats": {
                "사거리": "600",
                "스킬 폭": "160"
            }
        },
        "W": {
            "p1": "2.25", // BaseDuration
            "p2": "15 / 17.5 / 20 / 22.5 / 25", // MoveSpeedPercent*100
            "p3": "25", // MagicDamageReduction*100
            "p4": "1.5", // ShareBaseDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "26 / 25 / 24 / 23 / 22",
            "cost": "60 / 45 / 30 / 15 / 0"
        },
        "E": {
            "p1": "60 / 70 / 80 / 90 / 100 (+ 추가 공격력의 20%)", // DashDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "재충전 대기시간 26 / 22.5 / 19 / 15.5 / 12초 (재사용 0.5초)",
            "cost": "40",
            "stats": {
                "사거리": "550",
                "스킬 폭": "100",
                "돌진 속도": "2200"
            }
        },
        "R": {
            "p1": "60 / 100 / 140 (+ 추가 공격력의 40%)", // DamagePerTickCalcTooltip
            "p2": "125 / 225 / 325 (+ 추가 공격력의 100%)", // DamageCalc
            "p3": "20% (+ 치명타 확률의 10%)", // ChampHealingPercent
            "p4": "치명타 확률의 20%", // spell.NilahQ:CritLifesteal
            "p5": "6", // Duration
            "p6": "10", // OtherHealingPercent*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "110 / 95 / 80",
            "cost": "100",
            "stats": {
                "사거리": "400",
                "효과 범위": "450"
            }
        },
    },
    "Darius": { // 다리우스
        "P": {
            "p1": "5", // BleedDuration
            "p2": "13 ~ 30 (레벨에 따라) (+ 추가 공격력의 30%)", // BleedDamagePerStack
            "p3": "5", // MaxStacks
            "p4": "30 ~ 230 (레벨에 따라)", // NoxianMightBonusAD
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "50 / 80 / 110 / 140 / 170 (+ 총 공격력의 100 / 110 / 120 / 130 / 140%)", // BladeDamage
            "p2": "17.5 / 28 / 38.5 / 49 / 59.5 (+ 총 공격력의 100 / 110 / 120 / 130 / 140%)", // HandleDamage
            "p3": "17", // MissingHealthHeal
            "p4": "51", // MissingHealPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "25 / 30 / 35 / 40 / 45",
            "stats": {
                "효과 범위": "460",
                "시전시간": "0.234"
            }
        },
        "W": {
            "p1": "총 공격력의 140 / 145 / 150 / 155 / 160%", // EmpoweredAttackDamage
            "p2": "1", // SlowDuration
            "p3": "90", // SlowPercent
            "p4": "50", // PercentCDRefund
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "5",
            "cost": "40",
            "stats": {
                "시전시간": "0.367"
            }
        },
        "E": {
            "p1": "20 / 25 / 30 / 35 / 40", // PassivePercentArmorPen
            "p2": "1", // SlowDuration
            "p3": "40", // SlowPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "26 / 23.5 / 21 / 18.5 / 16",
            "cost": "70 / 60 / 50 / 40 / 30",
            "stats": {
                "효과 범위": "535",
                "시전시간": "0.25",
                "투사체 속도": "1500"
            }
        },
        "R": {
            "p1": "125 / 250 / 375 (+ 추가 공격력의 75%)", // Damage
            "p2": "20", // RDamagePercentPerHemoStack*100
            "p3": "250 / 500 / 750 (+ 추가 공격력의 150%)", // MaximumDamage
            "p4": "20", // RRecastDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100 / 100 / 0",
            "stats": {
                "사거리": "460",
                "시전시간": "0.367"
            }
        },
    },
    "Diana": { // 다이애나
        "P": {
            "p1": "15 ~ 35% (레벨에 따라)", // BonusAS
            "p2": "5", // BuffDuration
            "p3": "45 ~ 105% (레벨에 따라)", // EmpoweredAS
            "p4": "20 ~ 220 (레벨에 따라) (+ 주문력의 50%)", // CleaveDamage
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "효과 범위": "175"
            }
        },
        "Q": {
            "p1": "70 / 105 / 140 / 175 / 210 (+ 주문력의 70%)", // TotalDamage
            "p2": "3", // MoonlightDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "50",
            "stats": {
                "사거리": "900",
                "스킬 폭": "200",
                "시전시간": "0.25",
                "투사체 속도": "1300"
            }
        },
        "W": {
            "p1": "5", // ShieldDuration
            "p2": "20 / 32 / 44 / 56 / 68 (+ 주문력의 18%)", // TotalDamage
            "p3": "60 / 96 / 132 / 168 / 204 (+ 주문력의 54%)", // TotalMaxDamage
            "p4": "45 / 60 / 75 / 90 / 105 (+ 주문력의 30% + 추가 최대 체력의 11%)", // ShieldValue
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "15 / 13.5 / 12 / 10.5 / 9",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "800",
                "효과 범위": "200",
                "시전시간": "0.25"
            }
        },
        "E": {
            "p1": "50 / 70 / 90 / 110 / 130 (+ 주문력의 60%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "22 / 20 / 18 / 16 / 14",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "825",
                "시전시간": "0.25"
            }
        },
        "R": {
            "p1": "2", // SlowDuration
            "p2": "40 / 50 / 60", // SlowTooltip
            "p3": "200 / 300 / 400 (+ 주문력의 60%)", // RExplosionDamage
            "p4": "35 / 60 / 85 (+ 주문력의 15%)", // RMultihitAmplification
            "p5": "175 / 300 / 425 (+ 주문력의 75%)", // MaxDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "100 / 90 / 80",
            "cost": "100",
            "stats": {
                "효과 범위": "475",
                "시전시간": "0.25"
            }
        },
    },
    "Draven": { // 드레이븐
        "P": {
            "p1": "1", // StackGain
            "p2": "25", // PassiveGoldBase
            "p3": "2", // PassiveGoldPerStack
            "p4": "50", // PercentOfStacksLost
            "p5": "1 (중첩당)", // DravenPassiveGoldEarned
            "p6": "1 (중첩당)", // DravenPassiveHighestBounty
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "40 / 45 / 50 / 55 / 60 (+ 추가 공격력의 75 / 85 / 95 / 105 / 115%)", // TotalDamage
            "p2": "6", // DurationTOOLTIP
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "45"
        },
        "W": {
            "p1": "50 / 55 / 60 / 65 / 70", // Temp_MSMod
            "p2": "1.5", // Temp_MSDuration
            "p3": "3", // Temp_ASDuration
            "p4": "20 / 25 / 30 / 35 / 40", // Temp_AS
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12",
            "cost": "40 / 35 / 30 / 25 / 20",
            "stats": {
                "사거리": "1000",
                "시전시간": "0.242"
            }
        },
        "E": {
            "p1": "75 / 110 / 145 / 180 / 215 (+ 추가 공격력의 50%)", // TotalDamage
            "p2": "2", // SlowDuration
            "p3": "20 / 25 / 30 / 35 / 40", // SlowAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "70",
            "stats": {
                "사거리": "1050",
                "스킬 폭": "260",
                "시전시간": "0.25",
                "투사체 속도": "1600"
            }
        },
        "R": {
            "p1": "200 / 300 / 400 (+ 추가 공격력의 110 / 130 / 150%)", // RCalculatedDamage
            "p2": "5", // RDamageReductionPerHit*100
            "p3": "50", // RMinDamagePercent
            "p4": "1 (중첩당)", // RPassiveTrueDamage
            "p5": "100", // RPassiveStacksCoefficient*100
            "p6": "?", // f1
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "100 / 90 / 80",
            "cost": "100",
            "stats": {
                "사거리": "전역",
                "스킬 폭": "320",
                "시전시간": "0.5",
                "투사체 속도": "2000"
            }
        },
    },
    "Ryze": { // 라이즈
        "P": {
            "p1": "주문력의 10%", // PassiveManaCalcTooltip
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "4", // RuneDuration
            "p2": "2", // MaximumRunes
            "p3": "75 / 95 / 115 / 135 / 155 (+ 주문력의 55% + 추가 마나의 2%)", // QDamageCalc
            "p4": "50 / 75 / 100", // Spell.RyzeR:OverloadDamageBonus
            "p5": "2", // MovementSpeedDuration
            "p6": "28 / 32 / 36 / 40 / 44", // MovementSpeedAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "5",
            "cost": "40 / 38 / 36 / 34 / 32",
            "stats": {
                "사거리": "1000",
                "스킬 폭": "110",
                "시전시간": "0.25",
                "투사체 속도": "1700"
            }
        },
        "W": {
            "p1": "60 / 90 / 120 / 150 / 180 (+ 주문력의 60% + 추가 마나의 3%)", // WDamageCalc
            "p2": "1.5", // CCDuration
            "p3": "50", // SlowAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "11 / 10.5 / 10 / 9.5 / 9",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "615",
                "시전시간": "0.25"
            }
        },
        "E": {
            "p1": "60 / 90 / 120 / 150 / 180 (+ 주문력의 50% + 추가 마나의 2%)", // EDamageCalc
            "p2": "4", // DebuffDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "3.5 / 3.25 / 3 / 2.75 / 2.5",
            "cost": "35 / 45 / 55 / 65 / 75",
            "stats": {
                "사거리": "615",
                "효과 범위": "350",
                "시전시간": "0.25",
                "투사체 속도": "3500"
            }
        },
        "R": {
            "p1": "50 / 75 / 100", // OverloadDamageBonus
            "p2": "2", // ChargeTimeTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "180 / 160 / 140",
            "cost": "100",
            "stats": {
                "사거리": "1000 ~ 3000",
                "효과 범위": "465",
                "투사체 속도": "1700"
            }
        },
    },
    "Rakan": { // 라칸
        "P": {
            "p1": "40 ~ 14.5 (레벨에 따라)", // ShieldCooldown
            "p2": "30 ~ 225 (레벨에 따라) (+ 주문력의 95%)", // TotalShield
            "p3": "1", // HitCooldown
            "cooldown": "40 ~ 14.5 (레벨에 따라)", // ShieldCooldown
            "cost": "-"
        },
        "Q": {
            "p1": "70 / 115 / 160 / 205 / 250 (+ 주문력의 70%)", // TotalDamage
            "p2": "3", // HealDelay
            "p3": "40 ~ 210 (레벨에 따라) (+ 주문력의 55%)", // TotalHeal
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "45",
            "stats": {
                "사거리": "850",
                "효과 범위": "200",
                "스킬 폭": "130",
                "시전시간": "0.25",
                "투사체 속도": "1850"
            }
        },
        "W": {
            "p1": "1", // KnockupDuration
            "p2": "70 / 120 / 170 / 220 / 270 (+ 주문력의 80%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "600",
                "효과 범위": "275",
                "돌진 속도": "1700"
            }
        },
        "E": {
            "p1": "3", // Duration
            "p2": "50 / 75 / 100 / 125 / 150 (+ 주문력의 70%)", // TotalShield
            "p3": "5", // RecastWindow
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "40 / 45 / 50 / 55 / 60",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/rakan/hud/icons2d/rakan_e2.png"],
            "stats": {
                "사거리": "650",
                "스킬 폭": "100",
                "돌진 속도": "1250 (+ 이동 속도의 80%)"
            }
        },
        "R": {
            "p1": "4", // Duration
            "p2": "75", // InitialCastSpeed
            "p3": "100 / 200 / 300 (+ 주문력의 50%)", // TotalDamageTooltip
            "p4": "1 / 1.25 / 1.5", // CharmDuration
            "p5": "150", // TouchSpeed
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "130 / 110 / 90",
            "cost": "100",
            "stats": {
                "사거리": "150",
                "시전시간": "0.5"
            }
        },
    },
    "Rammus": { // 람머스
        "P": {
            "p1": "방어력의 15% (+ 마법 저항력의 15%)", // TotalDamage
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "25 ~ 39.1% (레벨에 따라)", // MinimumMoveSpeed
            "p2": "6", // RollDuration
            "p3": "150 ~ 234.6% (레벨에 따라)", // MaximumMoveSpeed
            "p4": "80 / 120 / 160 / 200 / 240 (+ 주문력의 100%)", // PowerBallDamage
            "p5": "1", // SlowDuration
            "p6": "40 / 50 / 60 / 70 / 80", // SlowPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12 / 10.5 / 9 / 7.5 / 6",
            "cost": "60",
            "stats": {
                "효과 범위": "250"
            }
        },
        "W": {
            "p1": "7", // BuffDuration
            "p2": "27 / 32 / 37 / 42 / 47 x (1 + 0.3 / 0.375 / 0.45 / 0.525 / 0.6) (+ 방어력의 30 / 37.5 / 45 / 52.5 / 60%)", // BonusArmorTooltip
            "p3": "20 / 25 / 30 / 35 / 40 x (1 + 0.3 / 0.375 / 0.45 / 0.525 / 0.6) (+ 마법 저항력의 30 / 37.5 / 45 / 52.5 / 60%)", // BonusMRTooltip
            "p4": "15 (+ 방어력의 10% + 마법 저항력의 10%)", // ReturnDamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "7",
            "cost": "40"
        },
        "E": {
            "p1": "1.2 / 1.4 / 1.6 / 1.8 / 2", // Duration
            "p2": "80 / 100 / 120 / 140 / 160 (+ 주문력의 70%)", // MonsterDamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12",
            "cost": "50",
            "stats": {
                "사거리": "325",
                "시전시간": "0.25"
            }
        },
        "R": {
            "p1": "150 / 250 / 350 (+ 주문력의 60%)", // InitialDamageCalc
            "p2": "1.5", // SlowDuration
            "p3": "30 / 40 / 50", // SlowAmount*100
            "p4": "80 / 120 / 160 / 200 / 240 (+ 주문력의 100%)", // spell.PowerBall:PowerBallDamage
            "p5": "0.75", // KnockupDuration
            "p6": "3.5", // BuffDuration
            "p7": "3", // NumberOfPulses
            "p8": "200", // TurretDamageModifier*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 105 / 90",
            "cost": "100",
            "stats": {
                "사거리": "800",
                "효과 범위": "400",
                "스킬 폭": "150",
                "돌진 속도": "900 ~ 2000"
            }
        },
    },
    "Lux": { // 럭스
        "P": {
            "p1": "6", // DebuffDuration
            "p2": "30 ~ 200 (레벨에 따라) (+ 주문력의 35%)", // TotalDamage
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "2", // RootDuration
            "p2": "80 / 120 / 160 / 200 / 240 (+ 주문력의 75%)", // TotalDamageTT
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10",
            "cost": "50",
            "stats": {
                "사거리": "1175",
                "스킬 폭": "160",
                "시전시간": "0.25",
                "투사체 속도": "1200"
            }
        },
        "W": {
            "p1": "2.5", // ShieldDuration
            "p2": "40 / 55 / 70 / 85 / 100 (+ 주문력의 40%)", // TotalShieldTT
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "1150",
                "효과 범위": "110",
                "스킬 폭": "300",
                "시전시간": "0.25",
                "투사체 속도": "2200"
            }
        },
        "E": {
            "p1": "25 / 30 / 35 / 40 / 45", // SlowPercent
            "p2": "5", // SlowZoneDuration
            "p3": "65 / 115 / 165 / 215 / 265 (+ 주문력의 80%)", // TotalDamageTT
            "p4": "1", // SlowLingerDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": {
                "사거리": "1100",
                "효과 범위": "310",
                "시전시간": "0.25",
                "투사체 속도": "1300"
            }
        },
        "R": {
            "p1": "300 / 400 / 500 (+ 주문력의 120%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "60 / 50 / 40",
            "cost": "100",
            "stats": {
                "사거리": "3340",
                "스킬 폭": "380",
                "시전시간": "1",
                "투사체 속도": "3000"
            }
        },
    },
    "Rumble": { // 럼블
        "P": {
            "p1": "50", // DangerZoneHeat
            "p2": "150", // OverheatingHeat
            "p3": "4", // OverheatDuration
            "p4": "50 ~ 130% (레벨에 따라)", // OverheatAS
            "p5": "5 ~ 40 (레벨에 따라) (+ 주문력의 25%)", // TotalBaseDamage
            "p6": "4", // OverheatPercBonusDamage*100
            "p7": "65 ~ 150 (레벨에 따라)", // MonsterCapScaling
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "3", // FlamespitterDuration
            "p2": "50 / 75 / 100 / 125 / 150 (+ 주문력의 105%)", // FlatDamage
            "p3": "6 / 6.5 / 7 / 7.5 / 8", // HealthDamage*100
            "p4": "70", // MinionMod*100
            "p5": "75 / 112.5 / 150 / 187.5 / 225 (+ 주문력의 157.5%)", // EmpoweredDamage
            "p6": "9 / 9.75 / 10.5 / 11.25 / 12%", // EmpoweredHealth
            "p7": "65 ~ 300 (레벨에 따라)", // MonsterCap
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "20 열기",
            "stats": {
                "사거리": "600",
                "스킬 폭": "1000",
                "투사체 속도": "5000"
            }
        },
        "W": {
            "p1": "1.5", // ShieldDuration.1
            "p2": "25 / 55 / 85 / 115 / 145 (+ 주문력의 30% + 최대 체력의 4%)", // TotalShield
            "p3": "1", // MoveSpeedDuration
            "p4": "10 / 15 / 20 / 25 / 30", // MoveSpeed*100
            "p5": "37.5 / 82.5 / 127.5 / 172.5 / 217.5 (+ 주문력의 45% + 최대 체력의 6%)", // EmpoweredShield
            "p6": "15 / 22.5 / 30 / 37.5 / 45%", // EmpoweredMS
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "6",
            "cost": "20 열기"
        },
        "E": {
            "p1": "55 / 80 / 105 / 130 / 155 (+ 주문력의 50%)", // TotalDamage
            "p2": "2", // SlowDuration
            "p3": "15 / 20 / 25 / 30 / 35", // BaseSlowAmount
            "p4": "4", // ShredDuration
            "p5": "10 / 12 / 14 / 16 / 18", // PercMagicPen*100
            "p6": "30 / 40 / 50 / 60 / 70", // EmpoweredSlowAmount
            "p7": "20 / 24 / 28 / 32 / 36", // EnhancedMagicPen*100
            "p8": "82.5 / 120 / 157.5 / 195 / 232.5 (+ 주문력의 75%)", // EmpDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "재충전 대기시간 6초 (최대: 2개)",
            "cost": "20 열기",
            "stats": {
                "사거리": "850",
                "스킬 폭": "180",
                "시전시간": "0.25",
                "투사체 속도": "2000"
            }
        },
        "R": {
            "p1": "4.5", // TrailDuration
            "p2": "35", // SlowAmount
            "p3": "120 / 200 / 280 (+ 주문력의 35%)", // DamagePerSecond
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "130 / 105 / 80",
            "cost": "-",
            "stats": {
                "사거리": "1750",
                "스킬 폭": "180",
                "시전시간": "0.58 (발사)",
                "투사체 속도": "1600"
            }
        },
    },
    "Renata": { // 레나타 글라스크
        "P": {
            "p1": "6", // PassiveDuration
            "p2": "1 ~ 2% (레벨에 따라) (+ 주문력의 2%)", // PercentAmpCalcSelf
            "p3": "1 ~ 2% (레벨에 따라) (+ 주문력의 2%)", // PercentAmpCalc
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "1", // RootDuration
            "p2": "80 / 125 / 170 / 215 / 260 (+ 주문력의 80%)", // TotalDamage
            "p3": "0.5", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "16",
            "cost": "80",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/renata/hud/icons2d/renata_q2.png"],
            "stats": {
                "사거리": "900",
                "스킬 폭": "140",
                "시전시간": "0.25",
                "투사체 속도": "1450"
            }
        },
        "W": {
            "p1": "10 / 15 / 20 / 25 / 30% (+ 주문력의 1%)", // ASCalc
            "p2": "10 / 12.5 / 15 / 17.5 / 20% (+ 주문력의 1%)", // MSCalc
            "p3": "5", // Duration
            "p4": "20 / 30 / 40 / 50 / 60% (+ 주문력의 2%)", // FinalASCalc
            "p5": "20 / 25 / 30 / 35 / 40% (+ 주문력의 2%)", // FinalMSCalc
            "p6": "20", // TriumphPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "28 / 27 / 26 / 25 / 24",
            "cost": "80",
            "stats": {
                "사거리": "800",
                "효과 범위": "1300",
                "시전시간": "0.25"
            }
        },
        "E": {
            "p1": "65 / 95 / 125 / 155 / 185 (+ 주문력의 55%)", // TotalDamage
            "p2": "2", // SlowDuration
            "p3": "3", // ShieldDuration
            "p4": "50 / 65 / 80 / 95 / 110 (+ 주문력의 50%)", // ShieldCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": {
                "사거리": "800",
                "효과 범위": "325",
                "스킬 폭": "220",
                "시전시간": "0.25",
                "투사체 속도": "1450"
            }
        },
        "R": {
            "p1": "1.25 / 1.75 / 2.25", // BerserkDuration
            "p2": "100", // BonusAttackSpeed*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "150 / 130 / 110",
            "cost": "100",
            "stats": {
                "사거리": "2000",
                "효과 범위": "1000",
                "스킬 폭": "650",
                "시전시간": "0.75",
                "투사체 속도": "650"
            }
        },
    },
    "Renekton": { // 레넥톤
        "P": {
            "p1": "5", // FuryPerAttack
            "p2": "50", // FuryCost
            "p3": "50", // LowHealthPercentThreshold*100
            "p4": "50", // FuryIncreasePercent*100
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "60 / 90 / 120 / 150 / 180 (+ 추가 공격력의 100%)", // BasicDamage
            "p2": "2 / 3 / 4 / 5 / 6 (+ 추가 공격력의 2%)", // NonChampHealing
            "p3": "12 / 20 / 28 / 36 / 44 (+ 추가 공격력의 17%)", // ChampHealing
            "p4": "2.5", // MinionFuryGain
            "p5": "10", // ChampionFuryGain
            "p6": "90 / 135 / 180 / 225 / 270 (+ 추가 공격력의 140%)", // EmpDamage
            "p7": "6 / 9 / 12 / 15 / 18 (+ 추가 공격력의 6%)", // EmpNonChampHealing
            "p8": "36 / 60 / 84 / 108 / 132 (+ 추가 공격력의 51%)", // EmpChampHealing
            "p9": "30", // FuryGainCap
            "p10": "50 / 75 / 100 / 125 / 150", // BasicHealCap
            "p11": "200 / 300 / 400 / 500 / 600", // EmpoweredHealCap
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "7",
            "cost": "-",
            "stats": {
                "사거리": "325",
                "효과 범위": "400"
            }
        },
        "W": {
            "p1": "0.75", // StunDuration
            "p2": "10 / 40 / 70 / 100 / 130 (+ 총 공격력의 150%)", // BasicTotalDamage
            "p3": "10", // BonusFuryVsChamps
            "p4": "15 / 60 / 105 / 150 / 195 (+ 총 공격력의 225%)", // EmpTotalDamage
            "p5": "1.5", // EnragedStunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "16 / 14 / 12 / 10 / 8",
            "cost": "-"
        },
        "E": {
            "p1": "40 / 70 / 100 / 130 / 160 (+ 추가 공격력의 90%)", // BasicDamage
            "p2": "2", // MinionRageGeneration
            "p3": "10", // ChampionRageGeneration
            "p4": "4", // DiceTimer
            "p5": "70 / 115 / 160 / 205 / 250 (+ 추가 공격력의 135%)", // EmpDamage
            "p6": "4", // ShredTimer
            "p7": "25 / 27.5 / 30 / 32.5 / 35", // EnragedArmorShred
            "p8": "30", // FuryMax
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "16 / 14.5 / 13 / 11.5 / 10",
            "cost": "-",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/renekton/hud/icons2d/renekton_e2.png"],
            "stats": {
                "사거리": "450",
                "스킬 폭": "100",
                "돌진 속도": "750"
            }
        },
        "R": {
            "p1": "15", // BuffDuration
            "p2": "300 / 500 / 700", // HealthGain
            "p3": "20", // FuryOnCast
            "p4": "60 / 150 / 240 (+ 주문력의 10% + 추가 공격력의 10%)", // TotalDamagePerSecond
            "p5": "5", // FuryPerSecond
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "-",
            "stats": {
                "효과 범위": "375",
                "시전시간": "0.25"
            }
        },
    },
    "Leona": { // 레오나
        "P": {
            "p1": "2.5", // MarkDuration
            "p2": "32 ~ 151 (레벨에 따라)", // TotalDamage
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "1", // StunDuration
            "p2": "10 / 35 / 60 / 85 / 110 (+ 주문력의 30%)", // TotalDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "5",
            "cost": "30 / 35 / 40 / 45 / 50",
            "stats": {
                "시전시간": "0.25"
            }
        },
        "W": {
            "p1": "8 / 12 / 16 / 20 / 24", // FlatDamageReduction
            "p2": "3", // ArmorMRDuration
            "p3": "20 / 27.5 / 35 / 42.5 / 50 (+ 추가 방어력의 20%)", // BonusArmorTooltip
            "p4": "20 / 27.5 / 35 / 42.5 / 50 (+ 추가 마법 저항력의 20%)", // BonusMRTooltip
            "p5": "55 / 85 / 115 / 145 / 175 (+ 주문력의 40%)", // TotalDamageTooltip
            "p6": "50", // FlatDamageReductionMax*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "60",
            "stats": {
                "효과 범위": "450"
            }
        },
        "E": {
            "p1": "50 / 90 / 130 / 170 / 210 (+ 주문력의 40%)", // TotalDamageTooltip
            "p2": "0.5", // RootDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12 / 10.5 / 9 / 7.5 / 6",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "875",
                "스킬 폭": "160",
                "시전시간": "0.25",
                "투사체 속도": "2000"
            }
        },
        "R": {
            "p1": "150 / 225 / 300 (+ 주문력의 80%)", // ExplosionCalculatedDamage
            "p2": "1.75", // CCDuration
            "p3": "80", // SlowPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "90 / 75 / 60",
            "cost": "100",
            "stats": {
                "사거리": "1200",
                "효과 범위": "325",
                "시전시간": "0.25"
            }
        },
    },
    "RekSai": { // 렉사이
        "P": {
            "p1": "25", // FuryFromAttacks
            "p2": "25", // FuryFromAbilities
            "p3": "3", // HealDuration
            "p4": "최대 체력의 9 ~ 20 (레벨에 따라)%", // HealAmount
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "3", // BuffDuration
            "p2": "35", // AttackSpeed*100
            "p3": "총 공격력의 30 / 35 / 40 / 45 / 50%", // TotalDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "4 / 3.5 / 3 / 2.5 / 2",
            "cost": "-",
            "form1": "돌출 상태",
            "stats": {
                "효과 범위": "325"
            }
        },
        "W": {
            "p1": "5 / 10 / 15 / 20 / 25", // BurrowedMoveSpeed
            "p2": "65", // VisionRadiusMod*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "4",
            "cost": "-",
            "form1": "돌출 상태",
            "stats": {
                "효과 범위": "1500"
            }
        },
        "E": {
            "p1": "70 / 95 / 120 / 145 / 170 (+ 추가 공격력의 60%)", // spell.RekSaiE:BaseDamageCalculation
            "p2": "84 / 114 / 144 / 174 / 204 (+ 추가 공격력의 72%)", // spell.RekSaiE:EmpoweredDamageCalculation
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "6",
            "cost": "-",
            "form1": "돌출 상태",
            "stats": {
                "사거리": "250",
                "스킬 폭": "120",
                "시전시간": "0.25",
                "투사체 속도": "4000",
                "돌진 속도": "500"
            }
        },
        "R": {
            "p1": "5", // PreyMarkDuration
            "p2": "150 / 250 / 350 (+ 추가 공격력의 100%)", // RBaseDamageCalc
            "p3": "15 / 20 / 25", // PercentHealthDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "-",
            "stats": {
                "사거리": "1500",
                "시전시간": "0.35",
                "돌진 속도": "1400"
            }
        },
        "Q2": {
            "p1": "50 / 80 / 110 / 140 / 170 (+ 추가 공격력의 25% + 주문력의 70%)", // spell.RekSaiQ:BurrowDamageTooltip
            "p2": "5", // spell.RekSaiQ:BurrowedDebuffDuration
            "p3": "25", // spell.RekSaiPassive:FuryFromAbilities
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "-",
            "cost": "-",
            "name": "",
            "form": "매복 상태",
            "icon": "https://raw.communitydragon.org/latest/game/assets/characters/reksai/hud/icons2d/reksai_q2.png"
        },
        "W2": {
            "p1": "30 / 55 / 80 / 105 / 130 (+ 주문력의 80%)", // spell.RekSaiW:UnburrowDamage
            "p2": "1", // spell.RekSaiW:KnockupDuration
            "p3": "10 / 9 / 8 / 7 / 6", // spell.RekSaiW:KnockupImmunity
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "4",
            "cost": "-",
            "name": "",
            "form": "매복 상태",
            "icon": "https://raw.communitydragon.org/latest/game/assets/characters/reksai/hud/icons2d/reksai_w2.png"
        },
        "E2": {
            "p1": "10", // spell.RekSaiE:TunnelDurationMinutes
            "p2": "6 / 5 / 4 / 3 / 2", // spell.RekSaiE:TunnelReuseCooldown
            "p3": "8", // spell.RekSaiE:MaximumTunnels
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "18 / 18 / 17 / 16 / 15",
            "cost": "-",
            "name": "",
            "form": "매복 상태",
            "icon": "https://raw.communitydragon.org/latest/game/assets/characters/reksai/hud/icons2d/reksai_e2.png"
        },
    },
    "Rell": { // 렐
        "P": {
            "p1": "5", // ShredDuration
            "p2": "3", // StealPercent*100
            "p3": "15", // MaxPercentTooltipOnly
            "p4": "방어력의 5% (+ 마법 저항력의 5%)", // OnHitDamage
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "0.65", // StunDuration
            "p2": "60 / 100 / 140 / 180 / 220 (+ 주문력의 60%)", // Damage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "11 / 10.5 / 10 / 9.5 / 9",
            "cost": "50",
            "stats": {
                "사거리": "600",
                "스킬 폭": "150",
                "시전시간": "0.4"
            }
        },
        "W": {
            "p1": "20 / 25 / 30 / 35 / 40", // spell.RellW_Dismount:MountedMoveSpeed
            "p2": "60 / 90 / 120 / 150 / 180 (+ 주문력의 60%)", // spell.RellW_Dismount:DismountDamage
            "p3": "20 / 40 / 60 / 80 / 100 (+ 최대 체력의 11%)", // spell.RellW_Dismount:Shield
            "p4": "15", // spell.RellW_Dismount:ResistanceIncrease*100
            "p5": "20", // spell.RellW_Dismount:DismountedASBoost*100
            "p6": "75", // spell.RellW_Dismount:DismountedRangeBoost
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10",
            "cost": "40",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/rell/hud/icons2d/rellmount.png"],
            "stats": {
                "사거리": "450"
            }
        },
        "E": {
            "p1": "3", // Duration
            "p2": "15", // MinMS*100
            "p3": "30", // MaxMS*100
            "p4": "5 / 5.5 / 6 / 6.5 / 7% (+ 주문력의 3%)", // MaxHealthDamageCalc
            "p5": "150 ~ 300 (레벨에 따라)", // PercentHealthDamageCap
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "40",
            "stats": {
                "사거리": "1200",
                "효과 범위": "300"
            }
        },
        "R": {
            "p1": "2", // Duration
            "p2": "150 / 250 / 350 (+ 주문력의 110%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": {
                "사거리": "200",
                "효과 범위": "450",
                "시전시간": "0.25"
            }
        },
    },
    "Rengar": { // 렝가
        "P": {
            "p1": "4", // MaxFerocity
            "p2": "1.5", // EmpoweredMSDuration
            "p3": "30 ~ 50% (레벨에 따라)", // EmpoweredMS
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "사거리": "50",
                "투사체 속도": "1450"
            }
        },
        "Q": {
            "p1": "40", // ASBonus
            "p2": "20 / 55 / 90 / 125 / 160 (+ 총 공격력의 100% + 총 공격력의 5%)", // QTotalDamage
            "p3": "35 ~ 240 (레벨에 따라) (+ 총 공격력의 100% + 총 공격력의 20%)", // EmpoweredQTotalDamage
            "p4": "5", // ASDuration
            "p5": "50 ~ 101% (레벨에 따라)", // EmpoweredQAS
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "6 / 5.5 / 5 / 4.5 / 4",
            "cost": "야성 1회 중첩",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/rengar/hud/icons2d/rengarqemp.png"]
        },
        "W": {
            "p1": "50 / 80 / 110 / 140 / 170 (+ 주문력의 80%)", // TotalDamage
            "p2": "1.5", // HealingWindow
            "p3": "50", // DamagePercentageHealed
            "p4": "50 ~ 220 (레벨에 따라) (+ 주문력의 80%)", // TotalDamageEmpowered
            "p5": "65 ~ 130 (레벨에 따라)", // BonusMonsterDamage
            "p6": "100", // MonsterHealingMod
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "16 / 14.5 / 13 / 11.5 / 10",
            "cost": "야성 1회 중첩",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/rengar/hud/icons2d/rengar_w_emp.png"],
            "stats": {
                "효과 범위": "450"
            }
        },
        "E": {
            "p1": "55 / 100 / 145 / 190 / 235 (+ 추가 공격력의 80%)", // TotalDamage
            "p2": "1.75", // CCDuration
            "p3": "30 / 45 / 60 / 75 / 90", // SlowAmount
            "p4": "50 ~ 305 (레벨에 따라) (+ 추가 공격력의 80%)", // TotalEmpoweredDamage
            "p5": "2", // RevealDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10",
            "cost": "야성 1회 중첩",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/rengar/hud/icons2d/rengar_e_emp.png"],
            "stats": {
                "사거리": "1000",
                "스킬 폭": "140",
                "시전시간": "0.25",
                "투사체 속도": "1500"
            }
        },
        "R": {
            "p1": "12 / 16 / 20", // StealthDuration
            "p2": "40 / 50 / 60", // StealthMS
            "p3": "2", // FadeTime
            "p4": "총 공격력의 100%", // BonusDamage
            "p5": "4", // ArmorShredDuration
            "p6": "15 / 20 / 25", // ArmorShred
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "100 / 90 / 80",
            "cost": "-",
            "stats": {
                "사거리": "2500 / 3000 / 3500"
            }
        },
    },
    "Locke": { // 로크
        "P": {
            "p1": "5 ~ 40 (레벨에 따라) (+ 주문력의 10%)", // MinOnHitDamage
            "p2": "10 ~ 80 (레벨에 따라) (+ 주문력의 20%)", // MaxOnHitDamage
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "40 / 48 / 56 / 64 / 72 (+ 주문력의 20%)", // MissileDamage
            "p2": "1", // SlowDuration1
            "p3": "1", // SlowDuration2
            "p4": "2", // SlowDuration3
            "p5": "25", // SlowAmount1*100
            "p6": "25", // SlowAmount2*100
            "p7": "60", // SlowAmount3*100
            "p8": "주문력의 25 / 27.5 / 30 / 32.5 / 35% (+ 18 / 26 / 34 / 42 / 50)", // NailDamage
            "p9": "20", // TwoMarkBonusPercent
            "p10": "40", // ThreeMarkBonusPercent
            "p11": "20 ~ 35% (레벨에 따라)", // AmmoCooldownReset
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "70",
            "stats": {
                "사거리": "950",
                "스킬 폭": "200",
                "시전시간": "0.25",
                "투사체 속도": "1650"
            }
        },
        "W": {
            "p1": "40 ~ 70% (레벨에 따라)", // AttackSpeed
            "p2": "40% (+ 주문력의 2%)", // MoveSpeed
            "p3": "1 (+ 1)", // DecayTimeHelper
            "p4": "6", // BaseDuration
            "p5": "2", // HealthCost*100
            "p6": "40 / 60 / 80 / 100 / 120 (+ 주문력의 100%)", // DamageRestoreAmount
            "p7": "40 ~ 200 (레벨에 따라) (+ 주문력의 20%)", // AdditionalHeal
            "p8": "150 ~ 450 (레벨에 따라) (+ 주문력의 60%)", // MaxHealingThreshold
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "18 / 17 / 16 / 15 / 14",
            "cost": "초당 마나 50 / 55 / 60 / 65 / 70, 현재 체력 2%",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/locke/hud/icons2d/locke_w2.png"]
        },
        "E": {
            "p1": "40 / 50 / 60 / 70 / 80 (+ 주문력의 40%)", // OnHitDamage
            "p2": "40 / 60 / 80 / 100 / 120 (+ 주문력의 40%)", // DashDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10",
            "cost": "30 / 40 / 50 / 60 / 70",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/locke/hud/icons2d/locke_e2.png"],
            "stats": {
                "사거리": "425",
                "스킬 폭": "200",
                "시전시간": "0.175"
            }
        },
        "R": {
            "p1": "150 / 225 / 300 (+ 주문력의 60%)", // Damage
            "p2": "99", // SlowAmount*100
            "p3": "2", // SlowDuration
            "p4": "5", // Duration
            "p5": "10 / 11 / 12% (+ 0.5 (중첩당))", // ExecuteTooltipCalc
            "p6": "0.5", // ExecuteThresholdPerStack*100
            "p7": "20", // CooldownReduction
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": {
                "사거리": "1000",
                "효과 범위": "400",
                "시전시간": "0.25"
            }
        },
    },
    "Lucian": { // 루시안
        "P": {
            "p1": "3.5", // PassiveDuration
            "p2": "총 공격력의 50 ~ 60 (레벨에 따라)%", // TotalDamage
            "p3": "총 공격력의 100%", // MinionDamage
            "p4": "2", // NumAuto
            "p5": "15 (+ 총 공격력의 20%)", // PassiveTotalDamage
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "80 / 115 / 150 / 185 / 220 (+ 추가 공격력의 100%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "48 / 56 / 64 / 72 / 80",
            "stats": {
                "사거리": "500",
                "스킬 폭": "130",
                "시전시간": "0.35"
            }
        },
        "W": {
            "p1": "75 / 110 / 145 / 180 / 215 (+ 주문력의 90%)", // TotalDamage
            "p2": "60 / 65 / 70 / 75 / 80", // MoveSpeedAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "60",
            "stats": {
                "사거리": "900",
                "스킬 폭": "160",
                "시전시간": "0.25",
                "투사체 속도": "1600"
            }
        },
        "E": {
            "p1": "1", // CDRefundBase
            "p2": "2", // CDRefundChampion
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "16 / 15.5 / 15 / 14.5 / 14",
            "cost": "32 / 24 / 16 / 8 / 0",
            "stats": {
                "사거리": "445",
                "스킬 폭": "100",
                "돌진 속도": "1350"
            }
        },
        "R": {
            "p1": "3", // Duration
            "p2": "22 + 치명타 확률의 100%<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:11px; color:#fff; margin-bottom:5px; white-space:nowrap;'>무한의 대검 보유 시</div><div style='font-size:12px; color:#ff9900; font-weight:bold;'>130%</div><div style='font-size:10px; color:#9aa4af; margin-top:5px; white-space:nowrap;'>치명타 피해량 200% → 230%</div></span></span>", // TotalNumShots
            "p3": "15 / 30 / 45 (+ 총 공격력의 25% + 주문력의 15%)", // DamagePerBullet
            "p4": "22 + 치명타 확률의 100% x (15 / 30 / 45 + 총 공격력의 25% + 주문력의 15%)<span class='custom-footnote'>[2]<span class='custom-footnote-content'><div style='font-size:11px; color:#fff; margin-bottom:5px; white-space:nowrap;'>무한의 대검 보유 시</div><div style='font-size:12px; color:#ff9900; font-weight:bold;'>22 + 치명타 확률의 130% x (15 / 30 / 45 + 총 공격력의 25% + 주문력의 15%)</div><div style='font-size:10px; color:#9aa4af; margin-top:5px; white-space:nowrap;'>치명타 피해량 200% → 230%</div></span></span>", // TotalDamage
            "p5": "100", // CritValueMod*100
            "p6": "200", // PercentDamageAmpToMinions
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "110 / 100 / 90",
            "cost": "100",
            "stats": {
                "사거리": "1400",
                "스킬 폭": "120",
                "투사체 속도": "2800"
            }
        },
    },
    "Lulu": { // 룰루
        "P": {
            "p1": "15 ~ 117 (레벨에 따라) (+ 주문력의 15%)", // CombinedDamage
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "스킬 폭": "60",
                "투사체 속도": "900 ~ 2600 (가속)"
            }
        },
        "Q": {
            "p1": "60 / 95 / 130 / 165 / 200 (+ 주문력의 50%)", // TotalDamage
            "p2": "80", // SlowAmount*-100
            "p3": "2", // SlowDuration
            "p4": "30 / 47.5 / 65 / 82.5 / 100 (+ 주문력의 25%)", // BonusMissileDamage
            "p5": "70", // MinionMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "7",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "925",
                "스킬 폭": "160",
                "시전시간": "0.25",
                "투사체 속도": "1400"
            }
        },
        "W": {
            "p1": "3 / 3.25 / 3.5 / 3.75 / 4", // MSDuration
            "p2": "25% (+ 주문력의 5%)", // TotalMS
            "p3": "20 / 22.5 / 25 / 27.5 / 30", // ASBonus*100
            "p4": "1.2 / 1.4 / 1.6 / 1.8 / 2", // CCDuration
            "p5": "60", // SlowAmount*-1
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "18",
            "cost": "65",
            "stats": {
                "사거리": "650",
                "시전시간": "0.2419",
                "투사체 속도": "2250"
            }
        },
        "E": {
            "p1": "6", // PixOnAllyDuration
            "p2": "2.5", // ShieldDuration
            "p3": "70 / 110 / 150 / 190 / 230 (+ 주문력의 50%)", // TotalShield
            "p4": "70 / 110 / 150 / 190 / 230 (+ 주문력의 50%)", // TotalDamage
            "p5": "4", // PixOnEnemyDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
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
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": {
                "사거리": "900",
                "효과 범위": "400",
                "시전시간": "0.25"
            }
        },
    },
    "Leblanc": { // 르블랑
        "P": {
            "cooldown": "60", // Cooldown
            "cost": "-"
        },
        "Q": {
            "p1": "65 / 90 / 115 / 140 / 165 (+ 주문력의 40%)", // Damage
            "p2": "3.5", // MarkDuration
            "p3": "65 / 90 / 115 / 140 / 165 (+ 주문력의 40%)", // MarkDamage
            "p4": "100", // ManaRefund*100
            "p5": "30", // CooldownRefund*100
            "p6": "10 ~ 146 (레벨에 따라)", // BonusMinionDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "6",
            "cost": "50",
            "stats": {
                "사거리": "700",
                "시전시간": "0.25",
                "투사체 속도": "2000"
            }
        },
        "W": {
            "p1": "75 / 115 / 155 / 195 / 235 (+ 주문력의 80%)", // TotalDamage
            "p2": "4", // SnapbackTimeAllowed
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "15 / 13.75 / 12.5 / 11.25 / 10",
            "cost": "60 / 70 / 80 / 90 / 100",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/leblanc/hud/icons2d/leblancwreturn.png"],
            "stats": {
                "사거리": "600",
                "효과 범위": "240",
                "돌진 속도": "1450"
            }
        },
        "E": {
            "p1": "50 / 70 / 90 / 110 / 130 (+ 주문력의 40%)", // InitialDamage
            "p2": "1.5", // TetherDuration
            "p3": "1.5", // RootDuration
            "p4": "80 / 120 / 160 / 200 / 240 (+ 주문력의 85%)", // DelayedDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14 / 13.25 / 12.5 / 11.75 / 11",
            "cost": "50",
            "stats": {
                "사거리": "925",
                "스킬 폭": "110",
                "시전시간": "0.25",
                "투사체 속도": "1750"
            }
        },
        "R": {
            "p1": "70 / 150 / 230 (+ 주문력의 40%)", // RQ1Damage
            "p2": "140 / 300 / 460 (+ 주문력의 80%)", // RQ2Damage
            "p3": "150 / 315 / 480 (+ 주문력의 80%)", // RWDamage
            "p4": "70 / 150 / 230 (+ 주문력의 40%)", // RE1Damage
            "p5": "140 / 300 / 460 (+ 주문력의 85%)", // RE2Damage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "45 / 35 / 25",
            "cost": "-",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/leblanc/hud/icons2d/leblancrq.png", "https://raw.communitydragon.org/latest/game/assets/characters/leblanc/hud/icons2d/leblancrw.png", "https://raw.communitydragon.org/latest/game/assets/characters/leblanc/hud/icons2d/leblancre.png"]
        },
    },
    "LeeSin": { // 리 신
        "P": {
            "p1": "40", // PassiveAS
            "p2": "20 ~ 40 (레벨에 따라)", // TTFirstHitEnergy
            "p3": "10 ~ 20 (레벨에 따라)", // EnergyReturn
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "60 / 90 / 120 / 150 / 180 (+ 추가 공격력의 90%)", // InitialDamage
            "p2": "3", // ReactivateTime
            "p3": "60 / 90 / 120 / 150 / 180 (+ 추가 공격력의 90%)", // RecastDamage
            "p4": "120 / 180 / 240 / 300 / 360 (+ 추가 공격력의 180%)", // EmpoweredDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "50",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/leesin/hud/icons2d/leesinq2.png"],
            "stats": {
                "사거리": "1100",
                "스킬 폭": "120",
                "투사체 속도": "1800",
                "돌진 속도": "1350"
            }
        },
        "W": {
            "p1": "2", // ShieldDuration
            "p2": "60 / 105 / 150 / 195 / 240 (+ 주문력의 80%)", // ShieldAmount
            "p3": "3", // W1ReactivateTime
            "p4": "4", // LifestealAndSpellVampTime
            "p5": "10 / 14 / 18 / 22 / 26", // LifestealAndSpellVamp
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "7",
            "cost": "50",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/leesin/hud/icons2d/leesinw2.png"],
            "stats": {
                "사거리": "700",
                "투사체 속도": "1500",
                "돌진 속도": "1350"
            }
        },
        "E": {
            "p1": "35 / 60 / 85 / 110 / 135 (+ 총 공격력의 90%)", // InitialDamage
            "p2": "4", // SlowDuration
            "p3": "3", // ReactivateTime
            "p4": "35 / 45 / 55 / 65 / 75", // SlowAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "8",
            "cost": "50",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/leesin/hud/icons2d/leesine2.png"],
            "stats": {
                "사거리": "450"
            }
        },
        "R": {
            "p1": "175 / 400 / 625 (+ 추가 공격력의 200%)", // Damage
            "p2": "12 / 15 / 18", // PercentHPCarryThrough
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "110 / 85 / 60",
            "cost": "-",
            "stats": {
                "사거리": "375",
                "시전시간": "0.25",
                "투사체 속도": "1500"
            }
        },
    },
    "Riven": { // 리븐
        "P": {
            "p1": "3", // Charges
            "p2": "총 공격력의 30 ~ 45 (레벨에 따라)%", // TotalDamage
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "45 / 75 / 105 / 135 / 165 (+ 추가 공격력의 60 / 65 / 70 / 75 / 80%)", // FirstSlashDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "13",
            "cost": "-",
            "stats": {
                "사거리": "275",
                "효과 범위": "150"
            }
        },
        "W": {
            "p1": "65 / 95 / 125 / 155 / 185 (+ 추가 공격력의 100%)", // TotalDamage
            "p2": "0.75", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "-",
            "stats": {
                "사거리": "260",
                "효과 범위": "300",
                "시전시간": "0.267",
                "투사체 속도": "1500"
            }
        },
        "E": {
            "p1": "70 / 95 / 120 / 145 / 170 (+ 추가 공격력의 110%)", // TotalShield
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "-",
            "stats": {
                "사거리": "250",
                "투사체 속도": "1450"
            }
        },
        "R": {
            "p1": "15", // Duration
            "p2": "총 공격력의 20%", // BonusAD
            "p3": "100 / 150 / 200 (+ 추가 공격력의 55%)", // MinDamage
            "p4": "300 / 450 / 600 (+ 추가 공격력의 165%)", // MaxDamage
            "p5": "75", // TooltipAttackRange
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 90 / 60",
            "cost": "-",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/riven/hud/icons2d/rivenwindscar.png"],
            "stats": {
                "사거리": "200"
            }
        },
    },
    "Lissandra": { // 리산드라
        "P": {
            "p1": "25", // MoveSpeedMod*-100
            "p2": "4", // ExplosionDelay
            "p3": "120 ~ 520 (레벨에 따라) (+ 주문력의 50%)", // TotalDamage
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "효과 범위": "1350"
            }
        },
        "Q": {
            "p1": "80 / 115 / 150 / 185 / 220 (+ 주문력의 75%)", // TotalDamage
            "p2": "1.5", // SlowDuration
            "p3": "20 / 24 / 28 / 32 / 36", // SlowPercentage*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "7 / 6 / 5 / 4 / 3",
            "cost": "55 / 60 / 65 / 70 / 75",
            "stats": {
                "사거리": "725",
                "스킬 폭": "150",
                "시전시간": "0.25",
                "투사체 속도": "2200"
            }
        },
        "W": {
            "p1": "1.25 / 1.35 / 1.45 / 1.55 / 1.65", // SnareDuration
            "p2": "70 / 105 / 140 / 175 / 210 (+ 주문력의 70%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "40",
            "stats": {
                "사거리": "450",
                "효과 범위": "275"
            }
        },
        "E": {
            "p1": "70 / 105 / 140 / 175 / 210 (+ 주문력의 60%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "24 / 21 / 18 / 15 / 12",
            "cost": "80 / 85 / 90 / 95 / 100",
            "stats": {
                "사거리": "1050",
                "스킬 폭": "220",
                "시전시간": "0.25",
                "투사체 속도": "850"
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
            "p8": "45 / 60 / 75", // SlowAmount*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": {
                "사거리": "550",
                "효과 범위": "550",
                "시전시간": "0.375",
                "투사체 속도": "2000"
            }
        },
    },
    "Lillia": { // 릴리아
        "P": {
            "p1": "3", // Duration
            "p2": "5% (+ 주문력의 1.25%)", // DotPercentTooltip
            "p3": "39 (+ 주문력의 15%)", // MonsterHealTT
            "p4": "6 ~ 90 (레벨에 따라) (+ 주문력의 30%)", // ChampionHealTT
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "6.5", // PranceDuration
            "p2": "3 / 4 / 5 / 6 / 7% (+ 주문력의 3%)", // PranceSpeed
            "p3": "4", // PranceMaxStacks
            "p4": "35 / 45 / 55 / 65 / 75 (+ 주문력의 35%)", // TotalDamage
            "p5": "35 / 45 / 55 / 65 / 75 (+ 주문력의 35%)", // BonusTrueDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "6 / 5.5 / 5 / 4.5 / 4",
            "cost": "65",
            "stats": {
                "사거리": "450",
                "효과 범위": "485",
                "시전시간": "0.25"
            }
        },
        "W": {
            "p1": "80 / 100 / 120 / 140 / 160 (+ 주문력의 35%)", // FlatDamage
            "p2": "240 / 300 / 360 / 420 / 480 (+ 주문력의 105%)", // FlatDamageSweetSpot
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "50",
            "stats": {
                "사거리": "500",
                "효과 범위": "250"
            }
        },
        "E": {
            "p1": "60 / 85 / 110 / 135 / 160 (+ 주문력의 50%)", // ImpactDamageTotal
            "p2": "3", // SlowDuration
            "p3": "40", // SlowAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12",
            "cost": "70",
            "stats": {
                "사거리": "700",
                "효과 범위": "150",
                "스킬 폭": "120",
                "시전시간": "0.35",
                "투사체 속도": "1750"
            }
        },
        "R": {
            "p1": "1.5", // DrowsyDuration
            "p2": "2", // SleepDuration
            "p3": "100 / 150 / 200 (+ 주문력의 40%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "150 / 130 / 110",
            "cost": "50",
            "stats": {
                "사거리": "전역",
                "스킬 폭": "200",
                "시전시간": "0.4"
            }
        },
    },
    "MasterYi": { // 마스터 이
        "P": {
            "p1": "4", // AttackCount
            "p2": "총 공격력의 50%", // TotalDamage
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "효과 범위": "300"
            }
        },
        "Q": {
            "p1": "4", // AlphaStrikeBounces
            "p2": "20 / 40 / 60 / 80 / 100 (+ 총 공격력의 70%)", // TotalDamage
            "p3": "25", // SubsequentHitMultiplier*100
            "p4": "5 / 10 / 15 / 20 / 25 + 총 공격력의 17.5%", // SubesquentDamage
            "p5": "35 / 70 / 105 / 140 / 175 (+ 총 공격력의 122.5%)", // SingleTotalDamage
            "p6": "75", // BaseOnHitMultiplier*100
            "p7": "20 / 40 / 60 / 80 / 100 (+ 총 공격력의 70%)<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:11px; color:#fff; margin-bottom:5px; white-space:nowrap;'>무한의 대검 보유 시</div><div style='font-size:12px; color:#ff9900; font-weight:bold;'>130%</div><div style='font-size:10px; color:#9aa4af; margin-top:5px; white-space:nowrap;'>치명타 피해량 200% → 230%</div></span></span>", // CritBonus
            "p8": "(20 / 40 / 60 / 80 / 100 + 총 공격력의 70%)의 175%", // SingleCritTotalDamage
            "p9": "60 / 85 / 110 / 135 / 160", // BonusMonsterDamage
            "p10": "20 / 19.5 / 19 / 18.5 / 18", // BasicAttackCDR
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "20 / 19.5 / 19 / 18.5 / 18",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "600",
                "효과 범위": "600",
                "투사체 속도": "4000"
            }
        },
        "W": {
            "p1": "4", // HealDuration
            "p2": "120 / 200 / 280 / 360 / 440 (+ 주문력의 100%)", // TotalHeal
            "p3": "100", // MaxMissingHealthPercent*100
            "p4": "0.5", // DRLinger
            "p5": "45 / 47.5 / 50 / 52.5 / 55 + 25 / 22.5 / 20 / 17.5 / 15%", // InitialDR
            "p6": "0.5", // InitialExtraDRDuration
            "p7": "45 / 47.5 / 50 / 52.5 / 55", // DamageReduction*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10",
            "cost": "마나 40 (+초당 최대 마나의 6%)"
        },
        "E": {
            "p1": "5", // Duration
            "p2": "20 / 25 / 30 / 35 / 40 (+ 추가 공격력의 35%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14",
            "cost": "-"
        },
        "R": {
            "p1": "70", // RCooldownRefund*100
            "p2": "7", // RDuration
            "p3": "35 / 45 / 55", // RMSBonus
            "p4": "25 / 45 / 65", // RASBonus
            "p5": "7", // RKillAssistExtension
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "85",
            "cost": "100"
        },
    },
    "Maokai": { // 마오카이
        "P": {
            "p1": "최대 체력의 4 ~ 12.8 (레벨에 따라)%", // PassiveHealingTotal
            "p2": "4", // PassiveCooldownReduction
            "p3": "1.5", // JungPassCooldownReduction
            "cooldown": "30 ~ 20 (레벨에 따라)", // PassiveCooldown
            "cost": "-"
        },
        "Q": {
            "p1": "75 / 120 / 165 / 210 / 255 (+ 주문력의 50%)", // TotalDamage
            "p2": "2 / 2.5 / 3 / 3.5 / 4", // BasePercentHealth*100
            "p3": "150 / 160 / 170 / 180 / 190", // BonusMonsterDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "7 / 6.5 / 6 / 5.5 / 5",
            "cost": "40",
            "stats": {
                "사거리": "600",
                "효과 범위": "325",
                "스킬 폭": "140",
                "시전시간": "0.3",
                "투사체 속도": "1600"
            }
        },
        "W": {
            "p1": "1 / 1.1 / 1.2 / 1.3 / 1.4", // RootDuration
            "p2": "60 / 85 / 110 / 135 / 160 (+ 주문력의 40%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "60",
            "stats": {
                "사거리": "525",
                "스킬 폭": "240",
                "투사체 속도": "1500",
                "돌진 속도": "1300"
            }
        },
        "E": {
            "p1": "30", // SaplingDuration
            "p2": "50 / 75 / 100 / 125 / 150 (+ 주문력의 25% + 추가 최대 체력의 5%)", // TotalDamage
            "p3": "2", // SlowDuration
            "p4": "45", // SlowAmount*100
            "p5": "30 (+ 추가 최대 체력의 1.5%)", // EmpoweredSaplingDuration
            "p6": "100 / 150 / 200 / 250 / 300 (+ 주문력의 50% + 추가 최대 체력의 10%)", // TotalEmpoweredDamage
            "p7": "2", // EmpoweredDoTDuration
            "p8": "45% (+ 주문력의 1% + 추가 최대 체력의 0.01%)", // EmpoweredSlowAmount
            "p9": "400 ~ 460 (레벨에 따라)", // SaplingMoveSpeed
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "18 / 17 / 16 / 15 / 14",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "1100",
                "효과 범위": "175",
                "스킬 폭": "240",
                "시전시간": "0.25",
                "투사체 속도": "1500"
            }
        },
        "R": {
            "p1": "0.75", // MinRootDuration
            "p2": "2.25", // MaxRootDuration
            "p3": "150 / 225 / 300 (+ 주문력의 75%)", // TotalDamage
            "p4": "40 / 50 / 60", // MoveHaste*100
            "p5": "2", // HasteDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "130 / 110 / 90",
            "cost": "100",
            "stats": {
                "사거리": "3000",
                "스킬 폭": "240",
                "시전시간": "0.5",
                "투사체 속도": "1500"
            }
        },
    },
    "Malzahar": { // 말자하
        "P": {
            "p1": "0.25", // LingerDuration
            "p2": "90", // DRPercent
            "p3": "30 ~ 12 (레벨에 따라)", // ShieldCooldown
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "70 / 105 / 140 / 175 / 210 (+ 주문력의 55%)", // TotalDamageTooltip
            "p2": "1 / 1.25 / 1.5 / 1.75 / 2", // SilenceDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "6",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "900",
                "효과 범위": "200",
                "시전시간": "0.25",
                "투사체 속도": "1600"
            }
        },
        "W": {
            "p1": "2", // StackCap
            "p2": "8 / 8 / 9 / 9 / 10", // VoidlingDuration
            "p3": "12 / 14 / 16 / 18 / 20 (+ 5 ~ 64.5 (레벨에 따라) + 추가 공격력의 40% + 주문력의 20%)", // VoidlingBonusDamageTooltip
            "p4": "300", // LaneMinionMod*100
            "p5": "50", // EpicMonsterMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
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
            "p4": "10 ~ 30 (레벨에 따라)", // MinionExecuteThreshold
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "650",
                "효과 범위": "500",
                "시전시간": "0.25",
                "투사체 속도": "1400"
            }
        },
        "R": {
            "p1": "2.5", // CCDuration
            "p2": "125 / 200 / 275 (+ 주문력의 80%)", // TotalDamageTooltip
            "p3": "5", // PoolDuration
            "p4": "10 / 15 / 20% (+ 주문력의 2.5%)", // ZoneDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "140 / 110 / 80",
            "cost": "100",
            "stats": {
                "사거리": "700",
                "시전시간": "0.005"
            }
        },
    },
    "Malphite": { // 말파이트
        "P": {
            "p1": "8 ~ 6 (레벨에 따라)", // PassiveCooldown
            "p2": "최대 체력의 10%", // TotalShield
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "70 / 120 / 170 / 220 / 270 (+ 주문력의 60%)", // QDamageCalc
            "p2": "3", // SlowDuration
            "p3": "20 / 25 / 30 / 35 / 40", // SpeedSteal
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "8",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "625",
                "시전시간": "0.25",
                "투사체 속도": "1200"
            }
        },
        "W": {
            "p1": "10 / 15 / 20 / 25 / 30", // BonusArmorPassive*100
            "p2": "10 / 15 / 20 / 25 / 30", // f1
            "p3": "30 / 45 / 60 / 75 / 90", // BonusArmorPassive*300
            "p4": "30 / 45 / 60 / 75 / 90", // f2
            "p5": "30 / 40 / 50 / 60 / 70 (+ 주문력의 20% + 방어력의 15%)", // TotalBonusDamage
            "p6": "15 / 25 / 35 / 45 / 55 (+ 주문력의 30% + 방어력의 15%)", // ThunderclapSplash
            "p7": "5", // ThunderclapBuffDuration
            "p8": "180", // MonsterDamageMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "30 / 35 / 40 / 45 / 50"
        },
        "E": {
            "p1": "60 / 95 / 130 / 165 / 200 (+ 방어력의 40% + 주문력의 60%)", // EDamageCalc
            "p2": "3", // Duration
            "p3": "30 / 35 / 40 / 45 / 50", // ASReduction
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "7",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "효과 범위": "400",
                "시전시간": "0.242"
            }
        },
        "R": {
            "p1": "1.5", // KnockupDuration
            "p2": "200 / 300 / 400 (+ 주문력의 90%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "130 / 115 / 100",
            "cost": "100",
            "stats": {
                "사거리": "1000",
                "효과 범위": "325",
                "스킬 폭": "320",
                "투사체 속도": "700"
            }
        },
    },
    "Mel": { // 멜
        "P": {
            "p1": "5", // OverwhelmDuration
            "p2": "60 / 70 / 80 (+ 주문력의 10%)", // spell.MelR:PassiveFlatDamage
            "p3": "3 / 4 / 5 (+ 주문력의 0.75%)", // spell.MelR:PassiveStackDamage
            "p4": "3", // PassiveBonusMissiles
            "p5": "8 ~ 30 (레벨에 따라) (+ 주문력의 4%)", // PassiveBonusMissileDamage
            "p6": "9", // MaxPassiveBonusMissiles
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "6 / 7 / 8 / 9 / 10", // ExplosionCount
            "p2": "60 / 85 / 110 / 135 / 160 (+ 주문력의 55%)", // InitialExplosionDamage
            "p3": "5 / 7 / 9 / 11 / 13 (+ 주문력의 5%)", // TotalExplosionDamage
            "p4": "60 / 85 / 110 / 135 / 160 (+ 주문력의 55%) (+ 5 / 7 / 9 / 11 / 13 (+ 주문력의 5%) x (6 / 7 / 8 / 9 / 10 - 1))", // AllDamageHit
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "950",
                "효과 범위": "200",
                "시전시간": "0.35",
                "투사체 속도": "3800"
            }
        },
        "W": {
            "p1": "0.75", // Duration
            "p2": "80 / 110 / 140 / 170 / 200 (+ 주문력의 70%)", // ShieldAmount
            "p3": "0.75", // MoveSpeedDuration
            "p4": "40", // MoveSpeed*100
            "p5": "40 / 45 / 50 / 55 / 60% (+ 주문력의 5%)", // DamagePercent
            "p6": "30", // PhysDamageMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "38 / 35 / 33 / 29 / 26",
            "cost": "80 / 60 / 40 / 20 / 0",
            "stats": {
                "효과 범위": "175"
            }
        },
        "E": {
            "p1": "1.5", // RootDuration
            "p2": "60 / 105 / 150 / 195 / 240 (+ 주문력의 70%)", // Damage
            "p3": "30", // AreaSlowAmount*100
            "p4": "16 / 28 / 40 / 52 / 64 (+ 주문력의 8%)", // AreaDamagePerSecond
            "p5": "50%", // MinionModTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "11 / 10.5 / 10 / 9.5 / 9",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "1000",
                "효과 범위": "70",
                "스킬 폭": "300",
                "시전시간": "0.25",
                "투사체 속도": "1100"
            }
        },
        "R": {
            "p1": "60 / 70 / 80 (+ 주문력의 10%)", // PassiveFlatDamage
            "p2": "3 / 4 / 5 (+ 주문력의 0.75%)", // PassiveStackDamage
            "p3": "125 / 200 / 275 (+ 주문력의 30%)", // UltFlatDamage
            "p4": "4 / 7 / 10 (+ 주문력의 4%)", // UltStackDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": {
                "사거리": "전역",
                "시전시간": "0.75"
            }
        },
    },
    "Mordekaiser": { // 모데카이저
        "P": {
            "p1": "주문력의 40%", // BonusAPAuto
            "p2": "5 (+ 주문력의 30%)", // AuraDamagePerStack
            "p3": "1 ~ 5 (레벨에 따라)", // PercentHealthForAura
            "p4": "3 ~ 9% (레벨에 따라)", // PassiveMovementSpeed
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "효과 범위": "375"
            }
        },
        "Q": {
            "p1": "80 / 115 / 150 / 185 / 220 (+ 0 ~ 45 (레벨에 따라) + 추가 공격력의 120% + 주문력의 70%)", // QDamage
            "p2": "80 / 115 / 150 / 185 / 220 (+ 0 ~ 45 (레벨에 따라) + 추가 공격력의 120% + 주문력의 70%)의 130 / 135 / 140 / 145 / 150%", // EmpoweredDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "8 / 7 / 6 / 5 / 4",
            "cost": "-",
            "stats": {
                "사거리": "675",
                "스킬 폭": "90 ~ 150",
                "시전시간": "0.5"
            }
        },
        "W": {
            "p1": "45", // DamageConversion*100
            "p2": "7.5", // DamageTakenConversion*100
            "p3": "35 / 37.5 / 40 / 42.5 / 45", // HealingPercent*100
            "p4": "최대 체력의 5%", // MinHealthTooltip
            "p5": "최대 체력의 30%", // MaxHealthTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "-",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/mordekaiser/hud/icons2d/mordekaiserw2.png"],
            "stats": {
                "시전시간": "0.25"
            }
        },
        "E": {
            "p1": "5 / 7.5 / 10 / 12.5 / 15", // MagicPen*100
            "p2": "60 / 80 / 100 / 120 / 140 (+ 주문력의 45%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "16 / 14 / 12 / 10 / 8",
            "cost": "-",
            "stats": {
                "사거리": "700",
                "효과 범위": "800",
                "스킬 폭": "200",
                "시전시간": "0.25",
                "투사체 속도": "3000"
            }
        },
        "R": {
            "p1": "7", // SpiritRealmDuration
            "p2": "10", // StatStealPercentScalar*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "140 / 120 / 100",
            "cost": "-",
            "stats": {
                "사거리": "650",
                "효과 범위": "1200",
                "시전시간": "0.5",
                "투사체 속도": "1500"
            }
        },
    },
    "Morgana": { // 모르가나
        "P": {
            "p1": "18", // HealPercent
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "2 / 2.25 / 2.5 / 2.75 / 3", // RootDuration
            "p2": "80 / 135 / 190 / 245 / 300 (+ 주문력의 90%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "1250",
                "스킬 폭": "140",
                "시전시간": "0.25",
                "투사체 속도": "1200"
            }
        },
        "W": {
            "p1": "5", // WDuration
            "p2": "18 / 31 / 44 / 57 / 70 (+ 주문력의 20%)", // TotalMinDamage
            "p3": "36 / 62 / 88 / 114 / 140 (+ 주문력의 40%)", // TotalMaxDamage
            "p4": "5", // CDRefundPercent*100
            "p5": "170", // MonsterMod
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": {
                "사거리": "900",
                "효과 범위": "280",
                "시전시간": "0.25"
            }
        },
        "E": {
            "p1": "5", // ShieldDuration
            "p2": "100 / 155 / 210 / 265 / 320 (+ 주문력의 70%)", // TotalShieldStrength
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
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
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 110 / 100",
            "cost": "100",
            "stats": {
                "효과 범위": "625",
                "시전시간": "0.35"
            }
        },
    },
    "DrMundo": { // 문도 박사
        "P": {
            "p1": "4", // CurrentHealthLoss*100
            "p2": "7", // CannisterGroundDuration
            "p3": "15", // PassiveCooldownRefund
            "p4": "4", // MaxHealthGain*100
            "p5": "0.4 ~ 2.3% (레벨에 따라)", // MaxHealthRegen
            "cooldown": "60 ~ 15 (레벨에 따라)", // PassiveCooldown
            "cost": "-"
        },
        "Q": {
            "p1": "20 / 22.5 / 25 / 27.5 / 30", // CurrentHealthDamage*100
            "p2": "2", // SlowDuration
            "p3": "40", // SlowAmount*100
            "p4": "50 / 60 / 70 / 80 / 90", // HealthRestoreOnHitChampionMonster
            "p5": "25 / 30 / 35 / 40 / 45", // HealthRestoreOnHitMinion
            "p6": "80 / 130 / 180 / 230 / 280", // MinimumDamage
            "p7": "250 / 325 / 400 / 475 / 550", // MaximumMonsterDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "4",
            "cost": "체력 50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "975",
                "스킬 폭": "120",
                "시전시간": "0.25",
                "투사체 속도": "1500"
            }
        },
        "W": {
            "p1": "3", // Duration
            "p2": "20 / 35 / 50 / 65 / 80", // DamagePerTick*4
            "p3": "0.75", // GrayHealthInitialDuration
            "p4": "80 ~ 95% (레벨에 따라)", // GrayHealthStorageInitial
            "p5": "25", // GrayHealthStorage*100
            "p6": "20 / 35 / 50 / 65 / 80 (+ 추가 최대 체력의 7%)", // TotalDamage
            "p7": "100", // GrayHealthBigMod*100
            "p8": "50", // GrayHealthSmallMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "17 / 16.5 / 16 / 15.5 / 15",
            "cost": "현재 체력의 8%",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/drmundo/hud/icons2d/drmundo_w2.png"],
            "stats": {
                "효과 범위": "325"
            }
        },
        "E": {
            "p1": "최대 체력의 2 / 2.3 / 2.6 / 2.9 / 3.2%", // PassiveBonusAD
            "p2": "5 / 15 / 25 / 35 / 45 (+ 추가 최대 체력의 5%)", // AdditionalDamage
            "p3": "140% (- 100%)", // MaxDamageAmpTooltip
            "p4": "70", // MaxMissingHealthThreshold*100
            "p5": "140", // MinionMod*100
            "p6": "140", // MonsterMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "9 / 8.25 / 7.5 / 6.75 / 6",
            "cost": "체력 10 / 25 / 40 / 55 / 70",
            "stats": {
                "사거리": "650",
                "효과 범위": "155",
                "시전시간": "1"
            }
        },
        "R": {
            "p1": "15 / 20 / 25", // MissingHealthHeal*100
            "p2": "15 / 25 / 35", // SpeedBoostAmount*100
            "p3": "10", // Duration
            "p4": "20 / 40 / 60", // MaxHealthHoT*100
            "p5": "5", // BonusPerNearbyChampion*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120",
            "cost": "-"
        },
    },
    "MissFortune": { // 미스 포츈
        "P": {
            "p1": "총 공격력의 50 ~ 100 (레벨에 따라)%", // TotalDamage
            "p2": "2", // Spell.MissFortuneViciousStrikes:LoveTapRefund
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "20 / 45 / 70 / 95 / 120 (+ 총 공격력의 100% + 주문력의 35%)", // TotalDamageTooltip
            "p2": "20 / 45 / 70 / 95 / 120 (+ 총 공격력의 100% + 주문력의 35%)의 150%<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:11px; color:#fff; margin-bottom:5px; white-space:nowrap;'>무한의 대검 보유 시</div><div style='font-size:12px; color:#ff9900; font-weight:bold;'>165%</div><div style='font-size:10px; color:#9aa4af; margin-top:5px; white-space:nowrap;'>치명타 피해량 200% → 230%</div></span></span>", // TotalDamageCrit
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "7 / 6 / 5 / 4 / 3",
            "cost": "40",
            "stats": {
                "사거리": "650",
                "효과 범위": "500",
                "시전시간": "0.25",
                "투사체 속도": "1400"
            }
        },
        "W": {
            "p1": "4", // PassiveBaseMSOOC
            "p2": "30 / 35 / 40 / 45 / 50", // PassiveBaseMS
            "p3": "3", // PassiveMaxMSExtraOOC
            "p4": "60 / 70 / 80 / 90 / 100", // PassiveMaxMS
            "p5": "4", // ActiveDuration
            "p6": "40 / 55 / 70 / 85 / 100", // ActiveAS*100
            "p7": "2", // LoveTapRefund
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12",
            "cost": "45",
            "stats": {
                "사거리": "600"
            }
        },
        "E": {
            "p1": "2", // BaseDuration
            "p2": "40% (+ 주문력의 6%)", // TotalSlowAmount
            "p3": "35 / 50 / 65 / 80 / 95 (+ 주문력의 60%)", // TotalDamagePerSecond
            "p4": "70 / 100 / 130 / 160 / 190 (+ 주문력의 120%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "18 / 17 / 16 / 15 / 14",
            "cost": "80",
            "stats": {
                "사거리": "1000",
                "효과 범위": "200",
                "시전시간": "0.25"
            }
        },
        "R": {
            "p1": "3", // BaseChannelDuration
            "p2": "14 / 16 / 18", // BaseWaves
            "p3": "20 / 30 / 40 (+ 총 공격력의 60% + 주문력의 25%)", // PhysicalDamagePerWave
            "p4": "280 / 480 / 720 (+ 총 공격력의 840 / 960 / 1080% + 주문력의 350 / 400 / 450%)", // TotalPhysicalDamage
            "p5": "20 / 30 / 40 (+ 총 공격력의 60% + 주문력의 25%)의 130%<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:11px; color:#fff; margin-bottom:5px; white-space:nowrap;'>무한의 대검 보유 시</div><div style='font-size:12px; color:#ff9900; font-weight:bold;'>139%</div><div style='font-size:10px; color:#9aa4af; margin-top:5px; white-space:nowrap;'>치명타 피해량 200% → 230%</div></span></span>", // CritDamagePerWave
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 110 / 100",
            "cost": "100",
            "stats": {
                "사거리": "1400",
                "효과 범위": "1450",
                "스킬 폭": "200",
                "시전시간": "0.001",
                "투사체 속도": "2000"
            }
        },
    },
    "Milio": { // 밀리오
        "P": {
            "p1": "7 ~ 15% (레벨에 따라)", // ADBurstRatio
            "p2": "1.5", // BurnDuration
            "p3": "10 ~ 50 (레벨에 따라) (+ 주문력의 20%)", // BurnDamage
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "80 / 140 / 200 / 260 / 320 (+ 주문력의 120%)", // Damage
            "p2": "1.5", // SlowDuration
            "p3": "40 / 45 / 50 / 55 / 60% (+ 주문력의 5%)", // SlowAmountPercent
            "p4": "50", // RefundRatio*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "1200",
                "효과 범위": "100",
                "스킬 폭": "90",
                "시전시간": "0.25",
                "투사체 속도": "1200"
            }
        },
        "W": {
            "p1": "6", // ZoneDuration
            "p2": "10 / 12.5 / 15 / 17.5 / 20%", // RangePercent
            "p3": "70 / 90 / 110 / 130 / 150 (+ 주문력의 15%)", // HealingOverTime
            "p4": "3", // HealFrequencySeconds
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "29 / 27 / 25 / 23 / 21",
            "cost": "90 / 100 / 110 / 120 / 130",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/milio/hud/icons2d/milio_w2.png"],
            "stats": {
                "사거리": "650 (재사용 3000)",
                "효과 범위": "415",
                "시전시간": "0.25"
            }
        },
        "E": {
            "p1": "45 / 75 / 105 / 135 / 165 (+ 주문력의 45%)", // ShieldCalc
            "p2": "2.5", // MoveSpeedDuration
            "p3": "12 / 14 / 16 / 18 / 20", // MoveSpeedAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "재장전 대기시간 17 / 16 / 15 / 14 / 13초 (재사용 0.5초)",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "650"
            }
        },
        "R": {
            "p1": "150 / 250 / 350 (+ 주문력의 50%)", // HealCalc
            "p2": "3", // TenacityDuration
            "p3": "65", // TenacityAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "160 / 145 / 130",
            "cost": "100",
            "stats": {
                "효과 범위": "700",
                "시전시간": "0.713"
            }
        },
    },
    "Bard": { // 바드
        "P": {
            "p1": "18", // f1
            "p2": "12", // TooltipManaRestore
            "p3": "20", // SpeedStackDuration
            "p4": "24", // TooltipMSPerStack
            "p5": "10", // MaxSpeedStacks
            "p6": "8 ~ 4 (고대의 종에 따라)", // f5
            "p7": "1 ~ 9 (고대의 종에 따라)", // f4
            "p8": "30 (+ 주문력의 40%)", // MeepDamageNoChime
            "p9": "5", // TooltipChimeDamageCheckpoint
            "p10": "6", // DamagePerCheckpoint
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "80 / 120 / 160 / 200 / 240 (+ 주문력의 80%)", // TotalDamage
            "p2": "1 / 1.2 / 1.4 / 1.6 / 1.8", // SlowDuration
            "p3": "60", // SlowAmountPercentage
            "p4": "1 / 1.2 / 1.4 / 1.6 / 1.8", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "60",
            "stats": {
                "사거리": "850",
                "스킬 폭": "120",
                "시전시간": "0.25",
                "투사체 속도": "1500"
            }
        },
        "W": {
            "p1": "1.5", // MoveSpeed_Duration
            "p2": "20 / 22.5 / 25 / 27.5 / 30% (+ 주문력의 6%)", // Calc_MoveSpeed
            "p3": "25 / 50 / 75 / 100 / 125 (+ 주문력의 40%)", // InitialHeal
            "p4": "5", // ChargeupTime
            "p5": "50 / 87.5 / 125 / 162.5 / 200 (+ 주문력의 70%)", // MaxHeal
            "p6": "3", // MaxPacks
            "p7": "2", // Ammo_Limit
            "p8": "?", // f1
            "p9": "?", // f2
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "18",
            "cost": "70",
            "stats": {
                "사거리": "800",
                "시전시간": "0.25"
            }
        },
        "E": {
            "p1": "10", // DoorDuration
            "p2": "33", // FriendlyMovementBonusPercentage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "22 / 20.5 / 19 / 17.5 / 16",
            "cost": "30",
            "stats": {
                "사거리": "900",
                "시전시간": "0.25",
                "투사체 속도": "900"
            }
        },
        "R": {
            "p1": "2.5", // RStasisDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "110 / 95 / 80",
            "cost": "100",
            "stats": {
                "사거리": "3400",
                "효과 범위": "350",
                "시전시간": "0.5"
            }
        },
    },
    "Varus": { // 바루스
        "P": {
            "p1": "5 ~ 11 (레벨에 따라)", // ASDuration
            "p2": "10 ~ 20% (레벨에 따라)", // MinionAS
            "p3": "추가 공격 속도의 1100%", // MinionAD
            "p4": "추가 공격 속도의 1100%", // MinionAP
            "p5": "30%", // ChampionAS
            "p6": "추가 공격 속도의 3300%", // ChampionAD
            "p7": "추가 공격 속도의 3300%", // ChampionAP
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "20", // MoveSpeedMod*-100
            "p2": "4", // MaxChannelDuration
            "p3": "50", // ManaRefund*100
            "p4": "53.36 / 100.05 / 146.74 / 193.43 / 240.12 (+ 추가 공격력의 80.04%)", // TotalDamageMinTooltip
            "p5": "15", // FalloffPercent*100
            "p6": "33", // MinDamagePercent*100
            "p7": "50", // MaxChargeAmp*100
            "p8": "80 / 150 / 220 / 290 / 360 (+ 추가 공격력의 120%)", // TotalDamageMax
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "925",
                "스킬 폭": "150",
                "투사체 속도": "1500"
            }
        },
        "W": {
            "p1": "4 / 13 / 22 / 31 / 40 (+ 주문력의 25% + 추가 공격력의 15%)", // OnHitDamage
            "p2": "6", // DebuffDuration
            "p3": "3", // MaxStacks
            "p4": "3 / 3.5 / 4 / 4.5 / 5% (+ 주문력의 0.013%)", // PercentHPPerStack
            "p5": "9 / 10.5 / 12 / 13.5 / 15% (+ 주문력의 0.013%)", // MaxPercentHPPerStack
            "p6": "13", // CDRPerBlightStack*100
            "p7": "6 / 8 / 10 / 12 / 14%", // QEmpowerPercentHP
            "p8": "9 / 12 / 15 / 18 / 21%", // MaxQEmpowerPercentHP
            "p9": "120", // MaxMonsterDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "40",
            "cost": "-"
        },
        "E": {
            "p1": "60 / 90 / 120 / 150 / 180 (+ 추가 공격력의 90%)", // TotalDamage
            "p2": "4", // GroundDuration
            "p3": "30 / 35 / 40 / 45 / 50", // SlowPercent*-100
            "p4": "40", // GrievousAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "18 / 16 / 14 / 12 / 10",
            "cost": "90",
            "stats": {
                "사거리": "925",
                "효과 범위": "300",
                "시전시간": "0.242",
                "투사체 속도": "1750"
            }
        },
        "R": {
            "p1": "2", // RootDuration
            "p2": "150 / 250 / 350 (+ 주문력의 100%)", // TotalDamage
            "p3": "3", // PassiveStacks
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "100 / 80 / 60",
            "cost": "100",
            "stats": {
                "사거리": "1300",
                "스킬 폭": "900",
                "시전시간": "0.242",
                "투사체 속도": "1500"
            }
        },
    },
    "Vi": { // 바이
        "P": {
            "p1": "3", // ShieldDuration
            "p2": "최대 체력의 12%", // TotalShield
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "15", // SelfSlow
            "p2": "40 / 60 / 80 / 100 / 120 (+ 추가 공격력의 60%)", // TotalDamage
            "p3": "100 / 150 / 200 / 250 / 300 (+ 추가 공격력의 150%)", // MaxDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12 / 10.5 / 9 / 7.5 / 6",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "250",
                "스킬 폭": "110",
                "투사체 속도": "1500"
            }
        },
        "W": {
            "p1": "4 / 5 / 6 / 7 / 8% (+ 추가 공격력의 3.5%)", // TotalDamageTooltip
            "p2": "4", // SharedBuffsDuration
            "p3": "20", // ShredAmount
            "p4": "30 / 35 / 40 / 45 / 50", // AttackSpeed
            "p5": "4", // spell.ViPassive:CDReductionOn3Hit
            "p6": "300", // MonsterDamageCap
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "없음",
            "cost": "-",
            "stats": {
                "사거리": "750"
            }
        },
        "E": {
            "p1": "10 / 30 / 50 / 70 / 90 (+ 총 공격력의 110% + 주문력의 100%)", // TotalDamageTooltip
            "p2": "12 / 11 / 10 / 9 / 8", // AmmoRechargeTime
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "1",
            "cost": "26 / 32 / 38 / 44 / 50",
            "stats": {
                "효과 범위": "600"
            }
        },
        "R": {
            "p1": "1.3", // RStunDuration
            "p2": "150 / 250 / 350 (+ 추가 공격력의 90%)", // Damage
            "p3": "0.75", // SecondaryTargetStunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "140 / 115 / 90",
            "cost": "100",
            "stats": {
                "사거리": "800",
                "시전시간": "0.25",
                "투사체 속도": "1400"
            }
        },
    },
    "Veigar": { // 베이가
        "P": {
            "p1": "1", // dAbilityStacks
            "p2": "5", // dTakedownStacks
            "p3": "1", // APPerStack
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "80 / 120 / 160 / 200 / 240 (+ 주문력의 50 / 55 / 60 / 65 / 70%)", // TotalDamage
            "p2": "1", // Spell.VeigarPassive:dQKillStacks
            "p3": "3", // Spell.VeigarPassive:dQKillStacksLarge
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "6 / 5.5 / 5 / 4.5 / 4",
            "cost": "30 / 35 / 40 / 45 / 50",
            "stats": {
                "사거리": "1000",
                "스킬 폭": "140",
                "시전시간": "0.25",
                "투사체 속도": "2200"
            }
        },
        "W": {
            "p1": "85 / 140 / 195 / 250 / 305 (+ 주문력의 70 / 80 / 90 / 100 / 110%)", // TotalDamage
            "p2": "50", // Spell.VeigarPassive:PStacksPerDarkMatterCDR
            "p3": "10", // Spell.VeigarPassive:DarkMatterCDRIncrement*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "8",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "950",
                "효과 범위": "240",
                "시전시간": "0.25"
            }
        },
        "E": {
            "p1": "1.5 / 1.75 / 2 / 2.25 / 2.5", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "20 / 18.5 / 17 / 15.5 / 14",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "725",
                "효과 범위": "411",
                "시전시간": "0.25"
            }
        },
        "R": {
            "p1": "175 / 250 / 325 (+ 주문력의 65 / 70 / 75%)", // MinDamage
            "p2": "350 / 500 / 650 (+ 주문력의 130 / 140 / 150%)", // MaxDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 90 / 60",
            "cost": "100",
            "stats": {
                "사거리": "650",
                "시전시간": "0.25"
            }
        },
    },
    "Vayne": { // 베인
        "P": {
            "p1": "30", // MovementSpeed
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "효과 범위": "2000"
            }
        },
        "Q": {
            "p1": "총 공격력의 75 / 85 / 95 / 105 / 115% (+ 주문력의 50%)", // ADRatioBonus
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "6 / 5 / 4 / 3 / 2",
            "cost": "30",
            "stats": {
                "사거리": "300",
                "스킬 폭": "100"
            }
        },
        "W": {
            "p1": "6 / 7 / 8 / 9 / 10%", // TotalDamage
            "p2": "50 / 65 / 80 / 95 / 110", // DamageFloor
            "p3": "140 / 155 / 170 / 185 / 200", // DamageVsMonsters
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "0",
            "cost": "-",
            "stats": {
                "사거리": "750"
            }
        },
        "E": {
            "p1": "50 / 85 / 120 / 155 / 190 (+ 추가 공격력의 50%)", // TotalDamage
            "p2": "75 / 127.5 / 180 / 232.5 / 285 (+ 추가 공격력의 75%)", // EmpoweredDamageTT
            "p3": "1.5", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "90",
            "stats": {
                "사거리": "550",
                "스킬 폭": "160",
                "시전시간": "0.25",
                "투사체 속도": "1200"
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
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "100 / 85 / 70",
            "cost": "80"
        },
    },
    "Vex": { // 벡스
        "P": {
            "p1": "25 ~ 16 (레벨에 따라)", // DoomCD
            "p2": "0.75 ~ 1.5 (레벨에 따라)", // FearDuration
            "p3": "6", // GloomDuration
            "p4": "40 ~ 150 (레벨에 따라) (+ 주문력의 25%)", // GloomProcCalc
            "p5": "25", // GloomCDChamp*100
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "효과 범위": "1600"
            }
        },
        "Q": {
            "p1": "70 / 115 / 160 / 205 / 250 (+ 주문력의 70%)", // QDamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "8 / 7 / 6 / 5 / 4",
            "cost": "45 / 50 / 55 / 60 / 65",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/vex/hud/icons2d/icons_vex_q02.png"],
            "stats": {
                "사거리": "1200",
                "스킬 폭": "360",
                "시전시간": "0.15",
                "투사체 속도": "700"
            }
        },
        "W": {
            "p1": "2.5", // ShieldDuration
            "p2": "50 / 75 / 100 / 125 / 150 (+ 주문력의 75%)", // ShieldCalc
            "p3": "80 / 120 / 160 / 200 / 240 (+ 주문력의 30%)", // WDamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "75",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/vex/hud/icons2d/icons_vex_w02.png"],
            "stats": {
                "효과 범위": "475",
                "시전시간": "0.25"
            }
        },
        "E": {
            "p1": "50 / 70 / 90 / 110 / 130 (+ 주문력의 40 / 45 / 50 / 55 / 60%)", // EDamageCalc
            "p2": "2", // SlowDuration
            "p3": "30 / 35 / 40 / 45 / 50", // SlowAmount*100
            "p4": "10", // GloomCDNonChampTooltip*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12",
            "cost": "70 / 80 / 90 / 100 / 110",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/vex/hud/icons2d/icons_vex_e02.png"],
            "stats": {
                "사거리": "800",
                "스킬 폭": "120",
                "시전시간": "0.25",
                "투사체 속도": "1250"
            }
        },
        "R": {
            "p1": "75 / 125 / 175 (+ 주문력의 20%)", // spell.VexR:RDamageCalc
            "p2": "150 / 250 / 350 (+ 주문력의 50%)", // spell.VexR:RecastDamageCalc
            "p3": "8", // spell.VexR:TakedownWindow
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "140 / 120 / 100",
            "cost": "100",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/vex/hud/icons2d/icons_vex_r02.png"],
            "stats": {
                "사거리": "2000 / 2500 / 3000",
                "효과 범위": "650",
                "스킬 폭": "200",
                "시전시간": "0.25",
                "투사체 속도": "1750"
            }
        },
    },
    "Belveth": { // 벨베스
        "P": {
            "p1": "3", // SheenDuration
            "p2": "20%", // SheenSpeedPerStack
            "p3": "1", // MonsterStacks
            "p4": "2", // ChampionStacks
            "p5": "0.1 ~ 2 (레벨에 따라)", // AttackSpeedPerStack
            "p6": "0.1 ~ 2 (레벨에 따라) (중첩당)", // TotalAttackSpeedFromStacks
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "12 / 14 / 16 / 18 / 20 (+ 총 공격력의 105%)", // BaseDamage
            "p2": "16 / 15 / 14 / 13 / 12", // f1
            "p3": "0.2", // PerSideCDAttackSpeedMultiplier
            "p4": "70", // MonsterMod
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "4 / 3.25 / 2.5 / 1.75 / 1",
            "cost": "-",
            "img": "https://raw.communitydragon.org/latest/game/assets/characters/belveth/hud/icons2d/bv_q_15.png",
            "stats": {
                "사거리": "450",
                "돌진 속도": "850"
            }
        },
        "W": {
            "p1": "80 / 140 / 200 / 260 / 320 (+ 주문력의 150%)", // Damage
            "p2": "0.6 / 0.7 / 0.8 / 0.9 / 1", // Duration
            "p3": "2", // SlowDuration
            "p4": "30", // SlowPercent*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "-",
            "stats": {
                "사거리": "715",
                "스킬 폭": "200",
                "시전시간": "0.5"
            }
        },
        "E": {
            "p1": "1.5", // TotalDuration
            "p2": "20 / 30 / 40 / 50 / 60", // DRPercent*100
            "p3": "20 / 25 / 30 / 35 / 40%", // TotalLifesteal
            "p4": "6", // f2.0
            "p5": "10 / 12 / 14 / 16 / 18 (+ 총 공격력의 12%)", // DamagePerStrike
            "p6": "20 / 24 / 28 / 32 / 36 (+ 총 공격력의 24%)", // MaxDamagePerStrikeTooltip
            "p7": "200", // MonsterMod*100
            "p8": "12", // OnHitRatio*100
            "p9": "24", // OnHitRatio*200
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "24 / 21 / 18 / 15 / 12",
            "cost": "-",
            "stats": {
                "효과 범위": "500"
            }
        },
        "R": {
            "p1": "2 / 4 / 6 (+ 추가 공격력의 3%)", // FinalOnHitDamage
            "p2": "1", // PassiveStacksOnDevour
            "p3": "150 / 200 / 250 (+ 주문력의 150%)", // TotalExplosionDamage
            "p4": "20", // MissingHealthDamage*100
            "p5": "100 / 250 / 400 (+ 추가 공격력의 150% + 주문력의 150%)", // MaxHealthOnDevour
            "p6": "25 / 75 / 125", // BonusAARange
            "p7": "6 / 13 / 20", // TotalASMod*100
            "p8": "45", // SteroidDuration
            "p9": "40", // StackThresholdForUpgrade
            "p10": "90", // SteroidDurationUpgrade
            "p11": "80", // StackThresholdForPermanent
            "p12": "20 / 45 / 70", // VoidlingHPScale*100
            "p13": "110", // VoidlingADScale*100
            "p14": "16 / 32 / 48 (+ 추가 공격력의 24%)", // MaxMonsterOnHitTooltip
            "p15": "100 / 250 / 400", // BaseMaxHealth
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "1",
            "cost": "-",
            "stats": {
                "사거리": "450",
                "효과 범위": "500",
                "시전시간": "1"
            }
        },
    },
    "Velkoz": { // 벨코즈
        "P": {
            "p1": "7", // Duration
            "p2": "주문력의 60% (+ 35 ~ 180 (레벨에 따라))", // TotalDamage
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "80 / 120 / 160 / 200 / 240 (+ 주문력의 90%)", // TotalDamage
            "p2": "70", // SlowAmount*100
            "p3": "1 / 1.4 / 1.8 / 2.2 / 2.6", // SlowDuration
            "p4": "20 / 22.5 / 25 / 27.5 / 30", // TooltipManaRefund
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "7",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "1050",
                "스킬 폭": "120",
                "시전시간": "0.251",
                "투사체 속도": "1200"
            }
        },
        "W": {
            "p1": "30 / 50 / 70 / 90 / 110 (+ 주문력의 20%)", // InitialDamage
            "p2": "45 / 75 / 105 / 135 / 165 (+ 주문력의 25%)", // SecondaryDamage
            "p3": "18 / 17 / 16 / 15 / 14", // AmmoRechargeTime
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "1.5",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "1050",
                "스킬 폭": "175",
                "투사체 속도": "1200"
            }
        },
        "E": {
            "p1": "0.75", // StunDuration
            "p2": "70 / 100 / 130 / 160 / 190 (+ 주문력의 30%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "810",
                "효과 범위": "225",
                "시전시간": "0.25"
            }
        },
        "R": {
            "p1": "450 / 700 / 925 (+ 주문력의 125%)", // TotalDamage
            "p2": "20", // Effect3Amount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "100 / 90 / 80",
            "cost": "100",
            "stats": {
                "사거리": "1575",
                "스킬 폭": "175",
                "시전시간": "0.25",
                "투사체 속도": "1500"
            }
        },
    },
    "Volibear": { // 볼리베어
        "P": {
            "p1": "6", // BuffDuration
            "p2": "5% (+ 주문력의 3%)", // AttackSpeedCalc
            "p3": "11 ~ 60 (레벨에 따라) (+ 주문력의 45%)", // ChainLightningDamage
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "효과 범위": "450"
            }
        },
        "Q": {
            "p1": "4", // Duration
            "p2": "12 / 15.5 / 19 / 22.5 / 26%", // MinSpeedCalc
            "p3": "24 / 31 / 38 / 45 / 52%", // MaxSpeedCalc
            "p4": "10 / 20 / 30 / 40 / 50 (+ 총 공격력의 100% + 추가 공격력의 160%)", // CalculatedDamage
            "p5": "1", // StunDuration
            "p6": "25", // BonusRange
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "50",
            "stats": {
                "효과 범위": "2000"
            }
        },
        "W": {
            "p1": "5 / 30 / 55 / 80 / 105 (+ 총 공격력의 110% + 추가 최대 체력의 6%)", // TotalDamage
            "p2": "8", // MarkDuration
            "p3": "5 / 30 / 55 / 80 / 105 (+ 총 공격력의 110% + 추가 최대 체력의 6%) x (1.5 + 추가 공격력의 0.25%)", // EmpoweredDamage
            "p4": "20 / 35 / 50 / 65 / 80", // BaseHeal
            "p5": "8 / 11 / 14 / 17 / 20%", // PercentMissingHealthHealingRatio
            "p6": "150", // W2DamageMultiplier*100
            "p7": "25", // W2BonusADDamageMultiplier*10000
            "p8": "50", // MinionAndMonsterMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "5",
            "cost": "20 / 25 / 30 / 35 / 40",
            "stats": {
                "사거리": "325",
                "시전시간": "0.25",
                "투사체 속도": "1450"
            }
        },
        "E": {
            "p1": "80 / 110 / 140 / 170 / 200 (+ 주문력의 70%)", // TotalDamageTooltip
            "p2": "11 / 12 / 13 / 14 / 15", // PercentDamage*100
            "p3": "2", // SlowDuration
            "p4": "40", // SlowAmount*100
            "p5": "3", // ShieldDuration
            "p6": "주문력의 75%", // ShieldAPRatioTooltip
            "p7": "14", // ShieldAmount*100
            "p8": "150 / 265 / 380 / 495 / 610 (+ 주문력의 70%)", // MonsterDamageCap
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "16",
            "cost": "50",
            "stats": {
                "사거리": "1200",
                "효과 범위": "325",
                "스킬 폭": "400",
                "시전시간": "0.25"
            }
        },
        "R": {
            "p1": "12", // TransformDuration
            "p2": "175 / 350 / 525", // HealthAmount
            "p3": "50", // BonusAttackRange
            "p4": "2 / 3 / 4", // TowerDisableDuration
            "p5": "300 / 500 / 700 (+ 주문력의 125% + 추가 공격력의 250%)", // TowerDamageTooltip
            "p6": "50", // SlowAmount*100
            "p7": "300 / 500 / 700 (+ 주문력의 125% + 추가 공격력의 250%)", // SweetSpotDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "160 / 135 / 110",
            "cost": "100",
            "stats": {
                "사거리": "700",
                "효과 범위": "300",
                "돌진 속도": "750"
            }
        },
    },
    "Braum": { // 브라움
        "P": {
            "p1": "4", // StackDuration
            "p2": "4", // StackCap
            "p3": "1.25 ~ 1.75 (레벨에 따라)", // StunDuration
            "p4": "26 ~ 196 (레벨에 따라)", // TotalDamage
            "p5": "8 ~ 4 (레벨에 따라)", // StunCD
            "p6": "10.4 ~ 78.4 (레벨에 따라)", // OnHitDamage
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "75 / 120 / 165 / 210 / 255 (+ 최대 체력의 2.5%)", // TotalDamage
            "p2": "70", // InitialSlow
            "p3": "2", // SlowDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "45 / 50 / 55 / 60 / 65",
            "stats": {
                "사거리": "1000",
                "스킬 폭": "140",
                "시전시간": "0.25",
                "투사체 속도": "1100"
            }
        },
        "W": {
            "p1": "3", // Duration
            "p2": "20 / 25 / 30 / 35 / 40 (+ 추가 방어력의 12%)", // GrantedAllyArmor
            "p3": "20 / 25 / 30 / 35 / 40 (+ 추가 마법 저항력의 12%)", // GrantedAllyMR
            "p4": "20 / 25 / 30 / 35 / 40 (+ 추가 방어력의 36%)", // GrantedBraumArmor
            "p5": "20 / 25 / 30 / 35 / 40 (+ 추가 마법 저항력의 36%)", // GrantedBraumMR
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "40",
            "stats": {
                "사거리": "650",
                "투사체 속도": "1500",
                "돌진 속도": "750"
            }
        },
        "E": {
            "p1": "3 / 3.25 / 3.5 / 3.75 / 4", // ShieldHoldDuration
            "p2": "35 / 40 / 45 / 50 / 55", // ShieldFacingDRAmount
            "p3": "10", // MoveSpeedPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "16 / 14 / 12 / 10 / 8",
            "cost": "30 / 35 / 40 / 45 / 50"
        },
        "R": {
            "p1": "150 / 250 / 350 (+ 주문력의 60%)", // TotalDamage
            "p2": "0.6", // MinKnockup
            "p3": "1 / 1.5 / 2", // MaxKnockup
            "p4": "4", // SlowZoneDuration
            "p5": "40 / 50 / 60", // MoveSpeedMod
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "130 / 115 / 100",
            "cost": "100",
            "stats": {
                "사거리": "1250",
                "효과 범위": "300",
                "스킬 폭": "160",
                "시전시간": "0.5",
                "투사체 속도": "1200"
            }
        },
    },
    "Briar": { // 브라이어
        "P": {
            "p1": "5", // BleedDuration
            "p2": "5", // MaxBleedStacks
            "p3": "10 ~ 50 (레벨에 따라) (+ 추가 공격력의 50%)", // BleedDamageOverDurationTooltip
            "p4": "20 ~ 100 (레벨에 따라) (+ 추가 공격력의 100%)", // BleedMaxDamageOverDurationTooltip
            "p5": "25", // HealPercent*100
            "p6": "40 (+ 추가 최대 체력의 2.5%)", // TotalHealPerMissingHPPercentTooltip
            "p7": "5", // CurrentHealthPercentCost*100
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "60 / 85 / 110 / 135 / 160 (+ 주문력의 60% + 추가 공격력의 80%)", // TotalDamage
            "p2": "0.85", // StunDuration
            "p3": "5", // ShredDuration
            "p4": "10 / 12.5 / 15 / 17.5 / 20", // ShredPercent*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "현재 체력의 5% 소모",
            "stats": {
                "사거리": "475",
                "시전시간": "0.25",
                "투사체 속도": "1500",
                "돌진 속도": "600 ~ 900 (거리에 따라)"
            }
        },
        "W": {
            "p1": "5", // BerserkDuration
            "p2": "55 / 65 / 75 / 85 / 95", // BerserkAS*100
            "p3": "24 / 33 / 42 / 51 / 60", // BerserkMS*100
            "p4": "총 공격력의 60 / 70 / 80 / 90 / 100%", // TotalAoEDamage
            "p5": "5 / 20 / 35 / 50 / 65 (+ 총 공격력의 105%)", // TotalAttackBonusDamage
            "p6": "9 (+ 추가 공격력의 2.5%)", // TotalAttackPercentMissingHealth
            "p7": "최대 체력의 5%", // AttackMaxHPHeal
            "p8": "24 / 28 / 32 / 36 / 40", // AttackHealPercent*100
            "p9": "10", // MonsterAndMinionPercentMod*100
            "p10": "400", // MaxMonsterDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "현재 체력의 5% 소모",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/briar/hud/icons2d/briarw2.png"],
            "stats": {
                "사거리": "350",
                "돌진 속도": "1200"
            }
        },
        "E": {
            "p1": "최대 체력의 10 / 11.5 / 13 / 14.5 / 16%", // PercentMaxHPHeal
            "p2": "35", // DRPercent
            "p3": "80 / 115 / 150 / 185 / 220 (+ 추가 공격력의 100% + 주문력의 100%)", // Damage
            "p4": "0.5", // SlowDuration
            "p5": "80", // SlowPercent*100
            "p6": "140 / 215 / 290 / 365 / 440 (+ 추가 공격력의 240% + 주문력의 240%)", // WallHitDamage
            "p7": "1.5", // WallStunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "16",
            "cost": "현재 체력의 5% 소모",
            "stats": {
                "사거리": "400 ~ 600 (충전 시간에 따라)",
                "스킬 폭": "380",
                "시전시간": "0.15 (발사)",
                "투사체 속도": "1900"
            }
        },
        "R": {
            "p1": "150 / 250 / 350 (+ 주문력의 130%)", // Damage
            "p2": "1.5", // FearDuration
            "p3": "총 공격력의 20%", // TotalResists
            "p4": "10 / 15 / 20", // LifeStealPercent*100
            "p5": "10 / 20 / 30", // ExtraMoveSpeedPercent*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "현재 체력의 5% 소모",
            "stats": {
                "사거리": "12000<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:12px; color:#fff; white-space:nowrap;'>2차 시전 돌진은 전역</div></span></span>",
                "스킬 폭": "320",
                "시전시간": "1",
                "투사체 속도": "2200",
                "돌진 속도": "2500 ~ 5000"
            }
        },
    },
    "Brand": { // 브랜드
        "P": {
            "p1": "2", // PercentHealthDamage
            "p2": "20 ~ 39.983 (레벨에 따라)", // ManaRestore
            "p3": "6 ~ 12% (레벨에 따라) (+ 주문력의 2%)", // ExplosionDamage
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "효과 범위": "475"
            }
        },
        "Q": {
            "p1": "70 / 100 / 130 / 160 / 190 (+ 주문력의 65%)", // TotalDamage
            "p2": "1.75", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "70",
            "stats": {
                "사거리": "1050",
                "스킬 폭": "160",
                "시전시간": "0.25",
                "투사체 속도": "1600"
            }
        },
        "W": {
            "p1": "75 / 120 / 165 / 210 / 255 (+ 주문력의 70%)", // TotalDamage
            "p2": "93.75 / 150 / 206.25 / 262.5 / 318.75 (+ 주문력의 87.5%)", // EmpoweredDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "900",
                "효과 범위": "260",
                "시전시간": "0.25"
            }
        },
        "E": {
            "p1": "55 / 80 / 105 / 130 / 155 (+ 주문력의 60%)", // EDamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "90",
            "stats": {
                "사거리": "625",
                "효과 범위": "300",
                "시전시간": "0.25",
                "투사체 속도": "1800"
            }
        },
        "R": {
            "p1": "100 / 175 / 250 (+ 주문력의 30%)", // TotalDamage
            "p2": "30 / 45 / 60", // SlowAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "100 / 90 / 80",
            "cost": "100",
            "stats": {
                "사거리": "750",
                "효과 범위": "600",
                "시전시간": "0.25",
                "투사체 속도": "1000"
            }
        },
    },
    "Vladimir": { // 블라디미르
        "P": {
            "p1": "30", // HPforAP
            "p2": "1.6", // APRatioBonusHP
            "p3": "(추가 최대 체력의 100% + 주문력의 -160%) x 0.037", // ApproximateAPBonusAvoidingRecursion
            "p4": "(주문력의 100% + 추가 최대 체력의 -3.3%)의 169.6%", // ApproximateHPBonusAvoidingRecursion
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "80 / 100 / 120 / 140 / 160 (+ 주문력의 60%)", // BaseDamageTooltip
            "p2": "20 / 25 / 30 / 35 / 40 (+ 주문력의 35%)", // BaseHealTooltip
            "p3": "10 ~ 40 (레벨에 따라)", // MovementSpeedOnQ2
            "p4": "2.5", // FrenzyDuration
            "p5": "148 / 185 / 222 / 259 / 296 (+ 주문력의 111%)", // EmpoweredDamageTooltip
            "p6": "30 ~ 200 (레벨에 따라)", // EmpoweredHealTooltip
            "p7": "5% (+ 주문력의 4%)", // EmpoweredHealPercentTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "9 / 7.9 / 6.8 / 5.7 / 4.6",
            "cost": "-",
            "stats": {
                "사거리": "600",
                "시전시간": "0.25",
                "투사체 속도": "1400"
            }
        },
        "W": {
            "p1": "37.5", // HasteBoost*100
            "p2": "1", // HasteDuration
            "p3": "40", // MoveSpeedMod*-100
            "p4": "80 / 135 / 190 / 245 / 300 (+ 추가 최대 체력의 15%)", // TotalDamage
            "p5": "24 / 40.5 / 57 / 73.5 / 90 (+ 추가 최대 체력의 4.5%)", // TotalHeal
            "p6": "60", // MinionHealingMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "28 / 25 / 22 / 19 / 16",
            "cost": "현재 체력의 15% 소모",
            "stats": {
                "효과 범위": "350"
            }
        },
        "E": {
            "p1": "최대 체력의 8%", // ChargeHealthTooltip
            "p2": "30 / 45 / 60 / 75 / 90 (+ 최대 체력의 1.5% + 주문력의 35%)", // MinDamageTooltip
            "p3": "60 / 90 / 120 / 150 / 180 (+ 최대 체력의 6% + 주문력의 80%)", // MaxDamageTooltip
            "p4": "40 / 45 / 50 / 55 / 60", // SlowPercent
            "p5": "1.5", // MaxChannelTime
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "13 / 11 / 9 / 7 / 5",
            "cost": "정신 집중으로 최대 체력의 8% 소모",
            "stats": {
                "효과 범위": "600",
                "스킬 폭": "120",
                "투사체 속도": "4000"
            }
        },
        "R": {
            "p1": "4", // Duration
            "p2": "10", // DamageAmp
            "p3": "150 / 250 / 350 (+ 주문력의 70%)", // Damage
            "p4": "60 / 100 / 140 (+ 주문력의 28%)", // SecondaryHealingTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120",
            "cost": "-",
            "stats": {
                "사거리": "625",
                "효과 범위": "375",
                "스킬 폭": "300",
                "투사체 속도": "1200"
            }
        },
    },
    "Blitzcrank": { // 블리츠크랭크
        "P": {
            "p1": "30", // HealthThreshold*100
            "p2": "10", // ShieldDuration
            "p3": "최대 마나의 35%", // ShieldAmount
            "cooldown": "90", // Cooldown
            "cost": "-"
        },
        "Q": {
            "p1": "110 / 160 / 210 / 260 / 310 (+ 주문력의 120%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "20 / 19 / 18 / 17 / 16",
            "cost": "100",
            "stats": {
                "사거리": "1079",
                "스킬 폭": "140",
                "시전시간": "0.25",
                "투사체 속도": "1800"
            }
        },
        "W": {
            "p1": "5", // Duration
            "p2": "60 / 65 / 70 / 75 / 80", // MoveSpeedMod*100
            "p3": "30 / 40 / 50 / 60 / 70", // AttackSpeedMod*100
            "p4": "1.5", // SlowDuration
            "p5": "30", // MoveSpeedModReduction*100
            "p6": "2.5", // MoveSpeedModMinTime
            "p7": "10", // MoveSpeedModMin*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "15",
            "cost": "75"
        },
        "E": {
            "p1": "1", // CCDuration
            "p2": "총 공격력의 200% (+ 주문력의 25%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "7 / 6.5 / 6 / 5.5 / 5",
            "cost": "25"
        },
        "R": {
            "p1": "50 / 100 / 150 (+ 주문력의 30 / 40 / 50% + 최대 마나의 2%)", // PassiveDamage
            "p2": "275 / 400 / 525 (+ 주문력의 100%)", // ActiveDamage
            "p3": "0.5", // SilenceDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "60 / 40 / 20",
            "cost": "100",
            "stats": {
                "효과 범위": "600",
                "시전시간": "0.25"
            }
        },
    },
    "Viego": { // 비에고
        "P": {
            "p1": "3", // TakedownWindow
            "p2": "2 (+ 추가 공격력의 2.5% + 주문력의 2% + 추가 공격 속도의 500%)", // PercentHealthHeal
            "p3": "10", // TransformDuration
            "p4": "10", // MoveSpeedPercent*100
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "2 / 3 / 4 / 5 / 6%", // TotalPercentHealthOnHit
            "p2": "총 공격력의 20% (+ 주문력의 15%)", // SecondAttackDamage
            "p3": "150", // HealModVsChamps*100
            "p4": "25 / 40 / 55 / 70 / 85 (+ 총 공격력의 70%)", // TotalDamage
            "p5": "125", // HealModVsMonsters*100
            "p6": "100", // HealModVsMinions*100
            "p7": "100% (+ 70%)<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:11px; color:#fff; margin-bottom:5px; white-space:nowrap;'>무한의 대검 보유 시</div><div style='font-size:12px; color:#ff9900; font-weight:bold;'>100% (+ 91%)</div><div style='font-size:10px; color:#9aa4af; margin-top:5px; white-space:nowrap;'>치명타 피해량 200% → 230%</div></span></span>", // HealthCritDamage
            "p8": "10 / 15 / 20 / 25 / 30", // MinDamageOnHit
            "p9": "80", // MonsterCapOnHit
            "p10": "60", // ActiveCritMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "5 / 4.5 / 4 / 3.5 / 3",
            "cost": "-",
            "stats": {
                "사거리": "600",
                "스킬 폭": "140",
                "시전시간": "0.25"
            }
        },
        "W": {
            "p1": "10", // SelfSlowPercent*100
            "p2": "80 / 135 / 190 / 245 / 300 (+ 주문력의 100%)", // TotalDamage
            "p3": "0.25", // Stunduration
            "p4": "1.25", // MaxStunTT
            "p5": "3", // CDWheninterrupted
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "8",
            "cost": "-",
            "stats": {
                "사거리": "400",
                "스킬 폭": "120",
                "돌진 속도": "1000"
            }
        },
        "E": {
            "p1": "8", // MistDuration
            "p2": "25 / 27.5 / 30 / 32.5 / 35% (+ 주문력의 4%)", // TotalMoveSpeed
            "p3": "30 / 35 / 40 / 45 / 50", // AttackSpeed*100
            "p4": "0.6", // RestealthTime
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14 / 12 / 10 / 8 / 6",
            "cost": "-",
            "stats": {
                "사거리": "750",
                "스킬 폭": "140",
                "투사체 속도": "1600"
            }
        },
        "R": {
            "p1": "99", // SlowPercent*100
            "p2": "총 공격력의 120%", // TotalDamage
            "p3": "12 / 16 / 20 (+ 추가 공격력의 5%)", // TotalPercentHealth
            "p4": "70", // CritMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "-",
            "stats": {
                "사거리": "500",
                "효과 범위": "300",
                "시전시간": "0.5"
            }
        },
    },
    "Viktor": { // 빅토르
        "P": {
            "p1": "100", // EvolutionStackBreakpoint
            "p2": "1", // MinionStacks
            "p3": "10", // CannonStacks
            "p4": "20", // ChampionStacks
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "60 / 75 / 90 / 105 / 120 (+ 주문력의 40%)", // TotalMissileDamage
            "p2": "2.5", // BuffDuration
            "p3": "40 ~ 140 (레벨에 따라) (+ 주문력의 25%)", // ShieldLevelScaling
            "p4": "20 / 45 / 70 / 95 / 120 (+ 주문력의 50% + 총 공격력의 100%)", // AttackTotalDMG
            "p5": "64 ~ 224 (레벨에 따라) (+ 주문력의 40%)", // TotalAugmentedShieldValue
            "p6": "30", // AugmentMoveSpeedBonus
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "45 / 50 / 55 / 60 / 65",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/viktor/hud/icons2d/viktor_q2.png"],
            "stats": {
                "사거리": "600",
                "시전시간": "0.25",
                "투사체 속도": "2000"
            }
        },
        "W": {
            "p1": "4", // FieldDuration
            "p2": "33 / 36 / 39 / 42 / 45", // SlowPotency*-1
            "p3": "1.5", // StunDuration
            "p4": "20", // AugmentSlow
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "17 / 16 / 15 / 14 / 13",
            "cost": "65",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/viktor/hud/icons2d/viktor_w2.png"],
            "stats": {
                "사거리": "800",
                "효과 범위": "340",
                "시전시간": "0.25"
            }
        },
        "E": {
            "p1": "70 / 110 / 150 / 190 / 230 (+ 주문력의 50%)", // LaserDamage
            "p2": "20 / 50 / 80 / 110 / 140 (+ 주문력의 80%)", // AftershockDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "60 / 70 / 80 / 90 / 100",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/viktor/hud/icons2d/viktor_e2.png"],
            "stats": {
                "사거리": "525",
                "효과 범위": "500",
                "스킬 폭": "180",
                "투사체 속도": "1050"
            }
        },
        "R": {
            "p1": "6.5", // StormDuration
            "p2": "100 / 175 / 250 (+ 주문력의 50%)", // InitialBurstDamage
            "p3": "65 / 105 / 145 (+ 주문력의 35%)", // SubsequentBurstDamage
            "p4": "25", // AugmentBoost*100
            "p5": "3", // Tooltip_DurationExtension
            "p6": "6", // MaxGrowths
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/viktor/hud/icons2d/viktor_r2.png"],
            "stats": {
                "사거리": "700",
                "효과 범위": "325",
                "시전시간": "0.25"
            }
        },
    },
    "Poppy": { // 뽀삐
        "P": {
            "p1": "16 ~ 8 (레벨에 따라)", // ActualCooldown
            "p2": "350", // BonusRange
            "p3": "20 ~ 180 (레벨에 따라)", // TotalDamage
            "p4": "최대 체력의 11 ~ 20 (레벨에 따라)%", // ShieldValue
            "cooldown": "16 ~ 8 (레벨에 따라)", // ActualCooldown
            "cost": "-",
            "stats": {
                "투사체 속도": "1600"
            }
        },
        "Q": {
            "p1": "30 / 55 / 80 / 105 / 130 (+ 추가 공격력의 75%)", // BaseDamage
            "p2": "7 / 7.5 / 8 / 8.5 / 9", // HealthDamagePercent
            "p3": "20 / 23 / 26 / 29 / 32% (+ 추가 최대 체력의 0.8%)", // MoveSpeedMod
            "p4": "1", // DelayBetweenTwoHits
            "p5": "85 / 120 / 155 / 190 / 225", // MaxHealthDamageToNonHeroes
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "8 / 7 / 6 / 5 / 4",
            "cost": "35 / 40 / 45 / 50 / 55",
            "stats": {
                "사거리": "430",
                "스킬 폭": "200",
                "시전시간": "0.3325"
            }
        },
        "W": {
            "p1": "방어력의 16%", // BonusArmor
            "p2": "마법 저항력의 16%", // BonusMR
            "p3": "40", // PassiveEmpoweredHealthPercent*100
            "p4": "40", // Haste
            "p5": "2", // Duration
            "p6": "2", // GroundingDuration
            "p7": "25", // SlowAmount*-100
            "p8": "70 / 110 / 150 / 190 / 230 (+ 주문력의 70%)", // InterruptDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "50",
            "stats": {
                "효과 범위": "400"
            }
        },
        "E": {
            "p1": "40 / 60 / 80 / 100 / 120 (+ 추가 공격력의 60%)", // TackleDamage
            "p2": "1.6 / 1.7 / 1.8 / 1.9 / 2", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "70",
            "stats": {
                "사거리": "475",
                "돌진 속도": "1800"
            }
        },
        "R": {
            "p1": "4", // ChannelMaxDuration
            "p2": "15", // SelfSlow
            "p3": "200 / 300 / 400 (+ 추가 공격력의 90%)", // Damage
            "p4": "100 / 150 / 200 (+ 추가 공격력의 45%)", // HalfDamage
            "p5": "1", // KnockupDurationSnap
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "140 / 120 / 100",
            "cost": "100",
            "stats": {
                "사거리": "500",
                "효과 범위": "180",
                "스킬 폭": "180",
                "시전시간": "0.25",
                "투사체 속도": "2500"
            }
        },
    },
    "Samira": { // 사미라
        "P": {
            "p1": "2.75 ~ 3.5% (레벨에 따라)", // MSBonusNew
            "p2": "2 ~ 19 (레벨에 따라) (+ 총 공격력의 3.5 ~ 10.5 (레벨에 따라)%)", // BonusMeleeDamage
            "p3": "4 ~ 38 (레벨에 따라) (+ 총 공격력의 3.5 ~ 10.5 (레벨에 따라)%)", // EmpoweredMeleeDamageTooltip
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "사거리": "650 ~ 950",
                "투사체 속도": "2800"
            }
        },
        "Q": {
            "p1": "0 / 5 / 10 / 15 / 20 (+ 총 공격력의 110%)", // DamageCalc
            "p2": "0 / 5 / 10 / 15 / 20 (+ 총 공격력의 110%)의 150%<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:11px; color:#fff; margin-bottom:5px; white-space:nowrap;'>무한의 대검 보유 시</div><div style='font-size:12px; color:#ff9900; font-weight:bold;'>165%</div><div style='font-size:10px; color:#9aa4af; margin-top:5px; white-space:nowrap;'>치명타 피해량 200% → 230%</div></span></span>", // CriticalDamageCalc
            "p3": "100", // LifestealMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "6 / 5 / 4 / 3 / 2",
            "cost": "30",
            "stats": {
                "사거리": "950",
                "스킬 폭": "160",
                "시전시간": "0.25",
                "투사체 속도": "2600"
            }
        },
        "W": {
            "p1": "0.75", // SlashDuration
            "p2": "20 / 35 / 50 / 65 / 80 (+ 추가 공격력의 50%)", // DamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "30 / 28 / 26 / 24 / 22",
            "cost": "60",
            "stats": {
                "효과 범위": "325",
                "시전시간": "0.1"
            }
        },
        "E": {
            "p1": "50 / 60 / 70 / 80 / 90 (+ 추가 공격력의 20%)", // DashDamage
            "p2": "5", // AttackSpeedDuration
            "p3": "20 / 25 / 30 / 35 / 40", // BonusAttackSpeed*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "40",
            "stats": {
                "사거리": "600",
                "스킬 폭": "100",
                "돌진 속도": "1600"
            }
        },
        "R": {
            "p1": "20 / 40 / 60 (+ 총 공격력의 30%)", // DamageCalc
            "p2": "100", // LifestealMod*100
            "p3": "25", // MinionDamageMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "5",
            "cost": "-",
            "stats": {
                "효과 범위": "600",
                "스킬 폭": "160"
            }
        },
    },
    "Sion": { // 사이온
        "P": {
            "p1": "100", // Lifesteal*100
            "p2": "10", // PercentMaxHP*100
            "cooldown": "-",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/sion/hud/icons2d/sion_passive2.png"],
            "cost": "-"
        },
        "Q": {
            "p1": "30 / 45 / 60 / 75 / 90 (+ 총 공격력의 40 / 50 / 60 / 70 / 80%)", // MinDamageTotal
            "p2": "90 / 155 / 220 / 285 / 350 (+ 총 공격력의 120 / 150 / 180 / 210 / 240%)", // MaxDamageTotal
            "p3": "1.25", // BaseStunTime
            "p4": "165", // MonsterRatio
            "p5": "60", // MinionRatio
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "45",
            "stats": {
                "사거리": "500 ~ 850 (충전 시간에 따라)",
                "투사체 속도": "1500"
            }
        },
        "W": {
            "p1": "4", // HPPerKill
            "p2": "15", // HPPerChampKill
            "p3": "60 / 75 / 90 / 105 / 120 (+ 주문력의 40% + 최대 체력의 8 / 10 / 12 / 14 / 16%)", // TotalShield
            "p4": "3", // DetonateRecastCooldown
            "p5": "40 / 65 / 90 / 115 / 140 (+ 주문력의 40%)", // TotalDamage
            "p6": "14", // MaxHPDamageRatio
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "75 / 80 / 85 / 90 / 95",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/sion/hud/icons2d/sion_w2.png"],
            "stats": {
                "사거리": "500",
                "효과 범위": "525"
            }
        },
        "E": {
            "p1": "65 / 100 / 135 / 170 / 205 (+ 주문력의 55%)", // TotalDamage
            "p2": "2.5", // SlowDuration
            "p3": "40 / 45 / 50 / 55 / 60", // SlowAmount
            "p4": "4", // ArmorShredDuration
            "p5": "25", // ArmorShred
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "35 / 40 / 45 / 50 / 55",
            "stats": {
                "사거리": "800<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:12px; color:#fff; white-space:nowrap;'>밀려난 유닛은 최대 1350까지</div></span></span>",
                "효과 범위": "130",
                "스킬 폭": "160",
                "시전시간": "0.25",
                "투사체 속도": "1800"
            }
        },
        "R": {
            "p1": "150 / 300 / 450 (+ 추가 공격력의 60%)", // MinDamageTotal
            "p2": "400 / 800 / 1200 (+ 추가 공격력의 120%)", // MaxDamageTotal
            "p3": "0.75", // MinStunDuration
            "p4": "1.75", // MaxStunDuration
            "p5": "40 / 45 / 50", // SlowAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "140 / 100 / 60",
            "cost": "100",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/sion/hud/icons2d/sion_r2.png"],
            "stats": {
                "사거리": "7500",
                "스킬 폭": "200",
                "투사체 속도": "1500"
            }
        },
    },
    "Sylas": { // 사일러스
        "P": {
            "p1": "3", // PassiveCharges
            "p2": "총 공격력의 130% (+ 주문력의 30%)", // PassiveDamage
            "p3": "총 공격력의 40% (+ 주문력의 20%)", // PassiveAoEDamage
            "p4": "125", // PassiveAttackSpeed*100
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "효과 범위": "300"
            }
        },
        "Q": {
            "p1": "40 / 60 / 80 / 100 / 120 (+ 주문력의 40%)", // Damage
            "p2": "1.5", // SlowDuration
            "p3": "15 / 20 / 25 / 30 / 35%", // SlowAmountCalc
            "p4": "60 / 115 / 170 / 225 / 280 (+ 주문력의 80%)", // ExplosionDamage
            "p5": "40", // MinionMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "55",
            "stats": {
                "사거리": "50 ~ 775",
                "효과 범위": "180",
                "스킬 폭": "140",
                "시전시간": "0.4",
                "투사체 속도": "1800"
            }
        },
        "W": {
            "p1": "75 / 110 / 145 / 180 / 215 (+ 주문력의 60%)", // MinDamage
            "p2": "20 / 40 / 60 / 80 / 100 (+ 주문력의 30% + 추가 최대 체력의 5%)", // MinHealing
            "p3": "40 / 80 / 120 / 160 / 200 (+ 주문력의 60% + 추가 최대 체력의 10%)", // MaxHealing
            "p4": "40", // MaxExecuteThreshold*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12 / 10.5 / 9 / 7.5 / 6",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "400",
                "시전시간": "0.15"
            }
        },
        "E": {
            "p1": "80 / 130 / 180 / 230 / 280 (+ 주문력의 80%)", // Damage
            "p2": "0.5", // KnockUpDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "65",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/sylas/hud/icons2d/sylase2.png"],
            "stats": {
                "사거리": "400",
                "스킬 폭": "120",
                "투사체 속도": "1800"
            }
        },
        "R": {
            "p1": "200", // PerTargetCooldown
            "p2": "40", // MinimumEnemyCooldown
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "80 / 55 / 30",
            "cost": "75",
            "stats": {
                "사거리": "950",
                "스킬 폭": "200",
                "시전시간": "0.25",
                "투사체 속도": "2200"
            }
        },
    },
    "Shaco": { // 샤코
        "P": {
            "p1": "20 ~ 35 (레벨에 따라) (+ 추가 공격력의 20%)", // BasicAttackDamage
            "p2": "15 ~ 50 (레벨에 따라) (+ 주문력의 10%)", // ShivDamage
            "p3": "22.5 ~ 75 (레벨에 따라) (+ 주문력의 15%)", // ShivDamageExecute
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "2.5 / 2.75 / 3 / 3.25 / 3.5", // StealthDuration
            "p2": "25 / 35 / 45 / 55 / 65 (+ 추가 공격력의 60%)", // TotalDamage
            "p3": "160%<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:11px; color:#fff; margin-bottom:5px; white-space:nowrap;'>무한의 대검 보유 시</div><div style='font-size:12px; color:#ff9900; font-weight:bold;'>178%</div><div style='font-size:10px; color:#9aa4af; margin-top:5px; white-space:nowrap;'>치명타 피해량 200% → 230%</div></span></span>", // QCritDamageMod
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
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
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "15",
            "cost": "70 / 65 / 60 / 55 / 50",
            "stats": {
                "사거리": "500",
                "시전시간": "0.25",
                "투사체 속도": "1450"
            }
        },
        "E": {
            "p1": "2", // SlowDurationPassive
            "p2": "20 / 22.5 / 25 / 27.5 / 30", // SlowAmount*-100
            "p3": "70 / 95 / 120 / 145 / 170 (+ 추가 공격력의 80% + 주문력의 60%)", // TotalDamage
            "p4": "3", // SlowDurationActive
            "p5": "30", // ExecuteHealthThreshold*100
            "p6": "105 / 142.5 / 180 / 217.5 / 255 (+ 추가 공격력의 120% + 주문력의 90%)", // TotalExecuteDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "8",
            "cost": "75",
            "stats": {
                "사거리": "625",
                "시전시간": "0.25",
                "투사체 속도": "1500"
            }
        },
        "R": {
            "p1": "18", // CloneLifetime
            "p2": "150 / 225 / 300 (+ 주문력의 70%)", // ExplosionTotalDamage
            "p3": "60", // CloneAADamagePercent*100
            "p4": "50", // CloneIncomingDamagePercent*100
            "p5": "10 / 20 / 30 (+ 주문력의 10%)", // AoEDamage
            "p6": "25 / 50 / 75 (+ 주문력의 15%)", // STDamage
            "p7": "1", // BoxFearDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "100 / 90 / 80",
            "cost": "100",
            "stats": {
                "사거리": "200",
                "효과 범위": "250",
                "시전시간": "0.25"
            }
        },
    },
    "Senna": { // 세나
        "P": {
            "p1": "1 ~ 10 (레벨에 따라)", // BonusCurentHealthDamage
            "p2": "0.75", // ADPerStack
            "p3": "20", // StacksForBonus
            "p4": "20", // BonusRange
            "p5": "10", // BonusCritChance
            "p6": "치명타 피해량의 100%", // CriticalDamage
            "p7": "35", // CritToLifestealConversionPercent*100
            "p8": "총 공격력의 20%", // BonusOnHitDamage
            "p9": "10 ~ 20% (레벨에 따라)", // MSSteal
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "효과 범위": "2000"
            }
        },
        "Q": {
            "p1": "30 / 55 / 80 / 105 / 130 (+ 추가 공격력의 60%)", // TotalDamage
            "p2": "1 / 1.25 / 1.5 / 1.75 / 2", // SlowDuration
            "p3": "15% (+ 주문력의 7% + 추가 공격력의 15%)", // TotalSlow
            "p4": "40 / 60 / 80 / 100 / 120 (+ 주문력의 35% + 추가 공격력의 40%)", // TotalHeal
            "p5": "1", // CDReductionOnHit
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "15",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": {
                "사거리": "600",
                "스킬 폭": "130"
            }
        },
        "W": {
            "p1": "70 / 110 / 150 / 190 / 230 (+ 추가 공격력의 90%)", // Damage
            "p2": "1", // DelayTime
            "p3": "1.25 / 1.5 / 1.75 / 2 / 2.25", // RootDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "11",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "1250",
                "효과 범위": "280",
                "스킬 폭": "120",
                "시전시간": "0.25",
                "투사체 속도": "1000"
            }
        },
        "E": {
            "p1": "6 / 6.5 / 7 / 7.5 / 8", // BuffDuration
            "p2": "20% (+ 주문력의 5%)", // TotalMS
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "26 / 24.5 / 23 / 21.5 / 20",
            "cost": "70",
            "stats": {
                "효과 범위": "400",
                "시전시간": "1"
            }
        },
        "R": {
            "p1": "250 / 400 / 550 (+ 주문력의 70% + 추가 공격력의 115%)", // TotalDamage
            "p2": "3", // ShieldDuration
            "p3": "120 / 160 / 200 (+ 주문력의 50% + 1.5 (중첩당))", // TotalShield
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "140 / 120 / 100",
            "cost": "100",
            "stats": {
                "사거리": "전역",
                "스킬 폭": "360",
                "시전시간": "1",
                "투사체 속도": "2000"
            }
        },
    },
    "Seraphine": { // 세라핀
        "P": {
            "p1": "25", // BonusAARange
            "p2": "4 ~ 25 (레벨에 따라) (+ 주문력의 4%)", // AutoDamage
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "효과 범위": "800",
                "투사체 속도": "3000"
            }
        },
        "Q": {
            "p1": "60 / 85 / 110 / 135 / 160 (+ 주문력의 40%)", // ExplosionDamage
            "p2": "25", // ExecuteThreshold*100
            "p3": "105 / 148.75 / 192.5 / 236.25 / 280 (+ 주문력의 70%)", // TotalEmpoweredDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "60 / 70 / 80 / 90 / 100",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/seraphine/hud/icons2d/seraphine_q2.png", "https://raw.communitydragon.org/latest/game/assets/characters/seraphine/hud/icons2d/seraphine_q3.png"],
            "stats": {
                "사거리": "900",
                "효과 범위": "350",
                "시전시간": "0.25",
                "투사체 속도": "1300"
            }
        },
        "W": {
            "p1": "2.5", // ShieldDuration
            "p2": "8% (+ 주문력의 0.8%)", // HasteValueAllies
            "p3": "20% (+ 주문력의 2%)", // WMSBonusTotal
            "p4": "60 / 80 / 100 / 120 / 140 (+ 주문력의 20%)", // ShieldValueSeraphine
            "p5": "2.5", // WHealSplitDelay
            "p6": "8 / 10 / 12 / 14 / 16", // WMissingHPHeal
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "22",
            "cost": "70 / 75 / 80 / 85 / 90",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/seraphine/hud/icons2d/seraphine_w2.png", "https://raw.communitydragon.org/latest/game/assets/characters/seraphine/hud/icons2d/seraphine_w3.png"],
            "stats": {
                "효과 범위": "800",
                "시전시간": "0.25"
            }
        },
        "E": {
            "p1": "70 / 100 / 130 / 160 / 190 (+ 주문력의 50%)", // FinalDamage
            "p2": "1.1 / 1.2 / 1.3 / 1.4 / 1.5", // SlowDuration
            "p3": "99", // SlowValue
            "p4": "70", // MinionDamageMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "11 / 10.5 / 10 / 9.5 / 9",
            "cost": "60",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/seraphine/hud/icons2d/seraphine_e2.png", "https://raw.communitydragon.org/latest/game/assets/characters/seraphine/hud/icons2d/seraphine_e3.png"],
            "stats": {
                "사거리": "1300",
                "스킬 폭": "160",
                "시전시간": "0.25",
                "투사체 속도": "1200"
            }
        },
        "R": {
            "p1": "1.25 / 1.5 / 1.75", // RChannelDuration
            "p2": "150 / 200 / 250 (+ 주문력의 40%)", // R1TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "160 / 140 / 120",
            "cost": "100",
            "stats": {
                "사거리": "1200",
                "스킬 폭": "320",
                "시전시간": "0.5",
                "투사체 속도": "1600"
            }
        },
    },
    "Sejuani": { // 세주아니
        "P": {
            "p1": "12 ~ 6 (레벨에 따라)", // FrostArmorOOC
            "p2": "10 (+ 추가 방어력의 75%)", // TotalArmorTooltip
            "p3": "10 (+ 추가 마법 저항력의 75%)", // TotalMRTooltip
            "p4": "10%", // PercentHPDamage
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "90 / 140 / 190 / 240 / 290 (+ 주문력의 75%)", // TotalDamageTooltip
            "p2": "0.5", // KnockupDurationTOOLTIPONLY
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "18 / 16.5 / 15 / 13.5 / 12",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "650",
                "스킬 폭": "150",
                "돌진 속도": "1000"
            }
        },
        "W": {
            "p1": "5 / 15 / 25 / 35 / 45 (+ 주문력의 30% + 최대 체력의 4%)", // FirstHitDamageTooltip
            "p2": "5 / 25 / 45 / 65 / 85 (+ 주문력의 60% + 최대 체력의 8%)", // SecondHitDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "60",
            "stats": {
                "사거리": "600",
                "스킬 폭": "260",
                "시전시간": "1"
            }
        },
        "E": {
            "p1": "55 / 105 / 155 / 205 / 255 (+ 주문력의 70%)", // TotalDamage
            "p2": "1", // CCDuration
            "p3": "8", // PerChampionCD
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "1.5",
            "cost": "20",
            "stats": {
                "사거리": "560",
                "효과 범위": "1100",
                "시전시간": "0.25"
            }
        },
        "R": {
            "p1": "1", // BaseStunDuration
            "p2": "125 / 150 / 175 (+ 주문력의 40%)", // MinorDamageTooltip
            "p3": "1.5", // EmpoweredStunDuration
            "p4": "2", // ZoneDuration
            "p5": "80", // ExplosionSlowAmount
            "p6": "200 / 300 / 400 (+ 주문력의 80%)", // TotalDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 105 / 90",
            "cost": "100",
            "stats": {
                "사거리": "1300",
                "효과 범위": "450",
                "스킬 폭": "240",
                "시전시간": "0.25",
                "투사체 속도": "1600"
            }
        },
    },
    "Sett": { // 세트
        "P": {
            "p1": "5 ~ 90 (레벨에 따라) (+ 추가 공격력의 55%)", // RightPunchBonus
            "p2": "5", // MissingHealthUnit*500
            "p3": "0.15 ~ 2 (레벨에 따라)", // TooltipRegenPerMissingHealthCalc
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "1.5", // MSDuration
            "p2": "30", // MSAmount*100
            "p3": "10 / 20 / 30 / 40 / 50", // BaseDamage
            "p4": "1% (+ 총 공격력의 1 / 1.5 / 2 / 2.5 / 3%)", // MaxHealthDamageCalc
            "p5": "400", // MonsterCap
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "-",
            "stats": {
                "시전시간": "0.33"
            }
        },
        "W": {
            "p1": "100", // DamageStored*100
            "p2": "최대 체력의 50%", // MaxGrit
            "p3": "4", // AdrenalineStorageWindow
            "p4": "100", // ShieldConversion*100
            "p5": "3", // ShieldMaxDuration
            "p6": "80 / 100 / 120 / 140 / 160", // DamageCalc
            "p7": "25% (+ 추가 공격력의 25%)", // DamageConversion
            "p8": "80 / 100 / 120 / 140 / 160 + 최대 체력의 12.5% (+ 추가 공격력의 0.125%)", // f1
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "18 / 16.5 / 15 / 13.5 / 12",
            "cost": "-",
            "stats": {
                "사거리": "720",
                "스킬 폭": "300",
                "시전시간": "0.75"
            }
        },
        "E": {
            "p1": "50 / 70 / 90 / 110 / 130 (+ 총 공격력의 60%)", // DamageCalc
            "p2": "0.5", // SlowDuration
            "p3": "70", // SlowAmount*100
            "p4": "1", // StunDuration
            "p5": "125 ~ 250 (레벨에 따라)", // MonsterBonus
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "16 / 14.5 / 13 / 11.5 / 10",
            "cost": "-",
            "stats": {
                "사거리": "490",
                "스킬 폭": "280",
                "시전시간": "0.25"
            }
        },
        "R": {
            "p1": "200 / 300 / 400 (+ 추가 공격력의 120%)", // DamageCalc
            "p2": "40 / 50 / 60", // MaxHealthDamage*100
            "p3": "1", // SlowDuration
            "p4": "99", // SlowAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "-",
            "stats": {
                "사거리": "400",
                "효과 범위": "600",
                "시전시간": "0.25"
            }
        },
    },
    "Sona": { // 소나
        "P": {
            "p1": "0.5", // AccelerandoAHPerStack
            "p2": "60", // AccelerandoCap
            "p3": "1.5", // Spell.SonaPassive:AccelerandoUltCDR
            "p4": "3", // PowerChordPassiveCountMax
            "p5": "20 ~ 240 (레벨에 따라) (+ 주문력의 20%)", // PowerChordDamage
            "p6": "30 ~ 360 (레벨에 따라) (+ 주문력의 30%)", // Spell.SonaQ:TotalStaccatoDamage
            "p7": "3", // Spell.SonaW:DiminuendoDuration
            "p8": "25% (+ 주문력의 4%)", // Spell.SonaW:TotalDiminuendoWeakenPercent
            "p9": "2", // Spell.SonaE:TempoDuration
            "p10": "50% (+ 주문력의 4%)", // Spell.SonaE:TotalTempoMoveSpeedSlow
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "50 / 85 / 120 / 155 / 190 (+ 주문력의 40%)", // TotalDamage
            "p2": "3", // AuraDuration
            "p3": "5", // OnHitDuration
            "p4": "10 / 15 / 20 / 25 / 30 (+ 주문력의 10%)", // TotalOnHitDamage
            "p5": "30 ~ 360 (레벨에 따라) (+ 주문력의 30%)", // TotalStaccatoDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "8",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "효과 범위": "825",
                "투사체 속도": "1500"
            }
        },
        "W": {
            "p1": "30 / 45 / 60 / 75 / 90 (+ 주문력의 30%)", // TotalHeal
            "p2": "3", // AuraDuration
            "p3": "1.5", // ShieldDuration
            "p4": "25 / 45 / 65 / 85 / 105 (+ 주문력의 25%)", // TotalShield
            "p5": "25 / 45 / 65 / 85 / 105", // AccelerandoShieldBreakpoint
            "p6": "3", // DiminuendoDuration
            "p7": "25% (+ 주문력의 4%)", // TotalDiminuendoWeakenPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10",
            "cost": "80 / 85 / 90 / 95 / 100",
            "stats": {
                "효과 범위": "1000",
                "투사체 속도": "1500"
            }
        },
        "E": {
            "p1": "3", // SelfMovementSpeedDurationMin
            "p2": "20% (+ 주문력의 2%)", // TotalSelfMovementSpeed
            "p3": "7", // SelfMovementSpeedDurationMax
            "p4": "3", // AuraDuration
            "p5": "3", // AllyMovementSpeedDuration
            "p6": "10 / 12 / 14 / 16 / 18% (+ 주문력의 2%)", // TotalAllyMovementSpeed
            "p7": "2", // TempoDuration
            "p8": "50% (+ 주문력의 4%)", // TotalTempoMoveSpeedSlow
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14",
            "cost": "65",
            "stats": {
                "사거리": "430",
                "효과 범위": "400"
            }
        },
        "R": {
            "p1": "1.5", // StunDuration
            "p2": "150 / 250 / 350 (+ 주문력의 50%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "140 / 120 / 100",
            "cost": "100",
            "stats": {
                "사거리": "900",
                "스킬 폭": "280",
                "시전시간": "0.25",
                "투사체 속도": "2400"
            }
        },
    },
    "Soraka": { // 소라카
        "P": {
            "p1": "40", // HealthThreshold*100
            "p2": "90", // MovementSpeed*100
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "효과 범위": "2500"
            }
        },
        "Q": {
            "p1": "85 / 120 / 155 / 190 / 225 (+ 주문력의 35%)", // TotalDamage
            "p2": "1.5", // SlowDuration
            "p3": "30", // MoveSpeedSlow*100
            "p4": "2.5", // HoTDuration
            "p5": "60 / 75 / 90 / 105 / 120 (+ 주문력의 30%)", // TotalHoT
            "p6": "20 / 22.5 / 25 / 27.5 / 30", // MoveSpeedHaste*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "8 / 7 / 6 / 5 / 4",
            "cost": "45 / 50 / 55 / 60 / 65",
            "stats": {
                "사거리": "810",
                "효과 범위": "265",
                "시전시간": "0.25",
                "투사체 속도": "1750"
            }
        },
        "W": {
            "p1": "90 / 110 / 130 / 150 / 170 (+ 주문력의 50%)", // TotalHeal
            "p2": "80 / 85 / 90 / 95 / 100", // PercentHealthCostRefund*100
            "p3": "2.5", // Spell.SorakaQ:HoTDuration
            "p4": "최대 체력의 5%", // MinimumHealth
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "6 / 5 / 4 / 3 / 2",
            "cost": "최대 체력의 10%, 마나 40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "550",
                "시전시간": "0.25"
            }
        },
        "E": {
            "p1": "70 / 95 / 120 / 145 / 170 (+ 주문력의 40%)", // TotalDamage
            "p2": "1.5", // RootDelay
            "p3": "1 / 1.25 / 1.5 / 1.75 / 2", // RootDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "20 / 19 / 18 / 17 / 16",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "925",
                "효과 범위": "260",
                "시전시간": "0.25"
            }
        },
        "R": {
            "p1": "150 / 250 / 350 (+ 주문력의 50%)", // HealingCalc
            "p2": "225 / 375 / 525 (+ 주문력의 75%)", // AmpedHealing
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "150 / 135 / 120",
            "cost": "100",
            "stats": {
                "효과 범위": "전역",
                "시전시간": "0.25"
            }
        },
    },
    "Shen": { // 쉔
        "P": {
            "p1": "2.5", // ShieldDuration
            "p2": "47 ~ 120 (레벨에 따라) (+ 추가 최대 체력의 13%)", // ShieldValue
            "p3": "11", // ShieldCooldown
            "p4": "4 ~ 7.995 (레벨에 따라)", // ShieldCooldownReduction
            "cooldown": "11", // ShieldCooldown
            "cost": "-"
        },
        "Q": {
            "p1": "2", // SlowDuration
            "p2": "25 / 30 / 35 / 40 / 45", // SlowPercent
            "p3": "3", // NumEnhancedAttacks
            "p4": "10 ~ 40 (레벨에 따라)", // BaseFlatDamage
            "p5": "2 / 2.5 / 3 / 3.5 / 4% (+ 주문력의 1.5%)", // BasePercentHealth
            "p6": "5 / 5.5 / 6 / 6.5 / 7% (+ 주문력의 2%)", // EmpPercentHealth
            "p7": "50", // SteroidAS
            "p8": "100", // MonsterAmp*100
            "p9": "100 / 125 / 150 / 175 / 200", // MinionDamageCap
            "p10": "10 ~ 40 (레벨에 따라)", // TowerDamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "8 / 7.25 / 6.5 / 5.75 / 5",
            "cost": "140 / 130 / 120 / 110 / 100",
            "stats": {
                "사거리": "400<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:12px; color:#fff; white-space:nowrap;'>영혼검 회수는 전역</div></span></span>",
                "스킬 폭": "160",
                "투사체 속도": "2000 ~ 5000"
            }
        },
        "W": {
            "p1": "1.75", // ZoneDuration
            "p2": "2", // ZoneDelay
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "16 / 14.5 / 13 / 11.5 / 10",
            "cost": "40",
            "stats": {
                "효과 범위": "350"
            }
        },
        "E": {
            "p1": "30 ~ 50 (레벨에 따라)", // EnergyRefund
            "p2": "1.5", // CCDuration
            "p3": "60 / 85 / 110 / 135 / 160 (+ 추가 최대 체력의 11%)", // TauntDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "18 / 16 / 14 / 12 / 10",
            "cost": "150",
            "stats": {
                "사거리": "600",
                "스킬 폭": "120",
                "돌진 속도": "800"
            }
        },
        "R": {
            "p1": "5", // ShieldDuration
            "p2": "120 / 220 / 320 (+ 추가 최대 체력의 15% + 주문력의 135%)", // Shield
            "p3": "192 / 352 / 512 (+ 추가 최대 체력의 24% + 주문력의 216%)", // MaxShield
            "p4": "3", // ChannelDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "200 / 180 / 160",
            "cost": "-",
            "stats": {
                "사거리": "전역"
            }
        },
    },
    "Shyvana": { // 쉬바나
        "P": {
            "p1": "0.3", // BonusArmor
            "p2": "0.3", // BonusMagicResist
            "p3": "0.3 (중첩당)", // Calc_Bonus_Armor
            "p4": "0.3 (중첩당)", // Calc_Bonus_MR
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "1% (+ 추가 공격력의 1.1%)", // Calc_Max_Health_Damage
            "p2": "0.5", // Cooldown_Reduction
            "p3": "10 / 15 / 20 / 25 / 30 (+ 총 공격력의 110% + 주문력의 30%)", // Calc_Damage
            "p4": "4", // RecastDuration
            "p5": "15 / 22.5 / 30 / 37.5 / 45 (+ 총 공격력의 165% + 주문력의 45%)", // Calc_Dragon_Form_Damage
            "p6": "10", // Calc_Monster_Bonus
            "p7": "10", // Calc_Max_Health_Monster_Minimum
            "p8": "200", // Calc_Max_Health_Monster_Maximum
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "-",
            "stats": {
                "효과 범위": "275"
            }
        },
        "W": {
            "p1": "2.5", // Duration
            "p2": "60 / 80 / 100 / 120 / 140 (+ 추가 최대 체력의 12%)", // Calc_Shield
            "p3": "18 / 24 / 30 / 36 / 42 (+ 추가 최대 체력의 3.6%)", // Calc_Shield_Per_Nearby_Champion
            "p4": "25%", // MoveSpeed
            "p5": "43.75%", // MoveSpeedTowardsEnemies
            "p6": "80 / 100 / 120 / 140 / 160 (+ 주문력의 65%)", // Damage
            "p7": "60 ~ 100 (레벨에 따라)", // Calc_Base_Heal
            "p8": "4 ~ 8% (레벨에 따라)", // Calc_Missing_Health_Heal
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "13 / 12.25 / 11.5 / 10.75 / 10",
            "cost": "-",
            "stats": {
                "효과 범위": "350"
            }
        },
        "E": {
            "p1": "50 / 65 / 80 / 95 / 110 (+ 주문력의 60 / 65 / 70 / 75 / 80%)", // Damage
            "p2": "5%", // Calc_Max_Health_Damage
            "p3": "2", // SlowDuration
            "p4": "30%", // Calc_Slow
            "p5": "62.5 / 81.25 / 100 / 118.75 / 137.5 (+ 주문력의 75 / 81.25 / 87.5 / 93.75 / 100%)", // Calc_Dragon_Damage
            "p6": "6.25%", // Calc_Max_Health_Dragon_Damage
            "p7": "30%", // Calc_Slow_Dragon
            "p8": "2", // GroundLingerDuration
            "p9": "15 ~ 25 (레벨에 따라) (+ 주문력의 5%)", // DamagePerSecond
            "p10": "40%", // Calc_Multihit_Efficacy
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "-",
            "stats": {
                "사거리": "800",
                "효과 범위": "150",
                "스킬 폭": "120",
                "시전시간": "0.25",
                "투사체 속도": "1500"
            }
        },
        "R": {
            "p1": "1.25", // Fury_Generation
            "p2": "300% (- 100%)", // TT_Fury_Mult
            "p3": "100% (- 25%)", // TT_Fury_AoE_Penalty
            "p4": "150 / 250 / 350 (+ 주문력의 100%)", // Damage
            "p5": "0.75", // FearDuration
            "p6": "150 / 250 / 350", // Calc_Bonus_Health
            "p7": "1", // FuryGainPerUltHaste*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "없음",
            "cost": "용의 분노 100 필요",
            "stats": {
                "사거리": "1050",
                "시전시간": "0.25"
            }
        },
    },
    "Smolder": { // 스몰더
        "P": {
            "p1": "25%", // Passive_QDamageIncrease
            "p2": "25", // spell.SmolderQ:StackTier1
            "p3": "125", // spell.SmolderQ:StackTier2
            "p4": "225", // spell.SmolderQ:StackTier3
            "p5": "55%", // Passive_WDamageIncrease
            "p6": "8%", // EBonusDamage
            "p7": "100", // EStacksPerAttackTooltip
            "p8": "?", // f1.0
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "60 / 70 / 80 / 90 / 100 (+ 추가 공격력의 130%)", // TotalDamage
            "p2": "25%", // spell.SmolderP:Passive_QDamageIncrease
            "p3": "15", // ManaRestore
            "p4": "25", // StackTier1
            "p5": "125", // StackTier2
            "p6": "50", // Tier2_BlowbackPercentageDamage
            "p7": "2 (+ 0.008 (중첩당))", // Tier2_NumberOfBlowback
            "p8": "225", // StackTier3
            "p9": "3", // Tier3_DotLength
            "p10": "(+0.025 추가 공격력)(+0.005 용 훈련 중첩)", // Tier3_Burn
            "p11": "6.5%", // Tier3_ExecuteThreshold
            "p12": "50", // LifestealMod*100
            "p13": "75", // CritRatio*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "5.5 / 5 / 4.5 / 4 / 3.5",
            "cost": "25",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/smolder/hud/icons2d/icons_smolder_q2.png", "https://raw.communitydragon.org/latest/game/assets/characters/smolder/hud/icons2d/icons_smolder_q3.png", "https://raw.communitydragon.org/latest/game/assets/characters/smolder/hud/icons2d/icons_smolder_q4.png"],
            "stats": {
                "사거리": "550",
                "효과 범위": "285",
                "시전시간": "0.25",
                "투사체 속도": "2200"
            }
        },
        "W": {
            "p1": "60 / 70 / 80 / 90 / 100 (+ 추가 공격력의 60%)", // InitialDamage
            "p2": "1.5", // SlowDuration
            "p3": "35", // SlowAmount*100
            "p4": "10 / 35 / 60 / 85 / 110 (+ 추가 공격력의 50% + 주문력의 80%)", // ExplosionDamage
            "p5": "55%", // spell.SmolderP:Passive_WDamageIncrease
            "p6": "75", // ExplosionDamageMultihitPenalty*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "1500",
                "효과 범위": "385",
                "스킬 폭": "150",
                "시전시간": "0.35",
                "투사체 속도": "2000"
            }
        },
        "E": {
            "p1": "1.25", // Duration
            "p2": "75", // MoveSpeed*100
            "p3": "5 (+ 0.01 (중첩당))", // TotalNumberOfAttacks
            "p4": "10 / 15 / 20 / 25 / 30 (+ 총 공격력의 30%)", // DamagePerHit
            "p5": "8%", // spell.SmolderP:EBonusDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "24 / 22 / 20 / 18 / 16",
            "cost": "65",
            "stats": {
                "사거리": "700",
                "투사체 속도": "1800"
            }
        },
        "R": {
            "p1": "150 / 250 / 350 (+ 추가 공격력의 100% + 주문력의 100%)", // TotalDamage
            "p2": "225 / 375 / 525 (+ 추가 공격력의 150% + 주문력의 150%)", // TooltipOnly_TotalSweetspotDamage
            "p3": "2", // SlowDuration
            "p4": "40", // SlowAmount*100
            "p5": "100 / 135 / 170 (+ 추가 공격력의 50% + 주문력의 75%)", // MomHealCalc
            "p6": "50", // MinionMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 110 / 100",
            "cost": "100",
            "stats": {
                "사거리": "4200",
                "스킬 폭": "125",
                "시전시간": "0.75",
                "투사체 속도": "1700"
            }
        },
    },
    "Swain": { // 스웨인
        "P": {
            "p1": "6%", // PassiveHealPercent
            "p2": "15", // HealthIncrement
            "p3": "?", // f1
            "p4": "15 (중첩당)", // MaxHealthGained
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "효과 범위": "1100",
                "투사체 속도": "1200"
            }
        },
        "Q": {
            "p1": "60 / 90 / 120 / 150 / 180 (+ 주문력의 45%)", // InitialDamage
            "p2": "15 / 22.5 / 30 / 37.5 / 45 (+ 주문력의 11.25%)", // ExtraBoltDamage
            "p3": "120 / 180 / 240 / 300 / 360 (+ 주문력의 90%)", // MaxDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "7 / 6 / 5 / 4 / 3",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "750",
                "효과 범위": "725",
                "시전시간": "0.25"
            }
        },
        "W": {
            "p1": "70 / 105 / 140 / 175 / 210 (+ 주문력의 60%)", // TotalDamage
            "p2": "1.5", // SlowDuration
            "p3": "50", // Slow*-100
            "p4": "6", // RevealDuration
            "p5": "35 / 52.5 / 70 / 87.5 / 105 (+ 주문력의 30%)", // MinionDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "22 / 21 / 20 / 19 / 18",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "5500 / 6000 / 6500 / 7000 / 7500",
                "효과 범위": "325",
                "스킬 폭": "170",
                "시전시간": "0.25"
            }
        },
        "E": {
            "p1": "90 / 130 / 170 / 210 / 250 (+ 주문력의 70%)", // SecondaryDamage
            "p2": "1.5", // RootDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/swain/hud/icons2d/swain_e2.png"],
            "stats": {
                "사거리": "850",
                "효과 범위": "100",
                "스킬 폭": "170",
                "시전시간": "0.25",
                "투사체 속도": "935"
            }
        },
        "R": {
            "p1": "15 / 25 / 35 (+ 주문력의 4%)", // DamageCalc
            "p2": "15 / 30 / 45 (+ 주문력의 5% + 추가 최대 체력의 1.5%)", // HealingCalc
            "p3": "2", // DemonflareCastDelay
            "p4": "8", // DemonflareCooldownTooltip
            "p5": "150 / 250 / 350 (+ 주문력의 40%)", // DemonflareDamageTotal
            "p6": "50", // DemonflareSlowAmount*100
            "p7": "1.5", // DemonflareSlowDuration
            "p8": "10", // MinionMonsterHealReduction*100
            "p9": "10", // DemonPowerDegen
            "p10": "5", // AmpTime
            "p11": "15", // DegenAmpAmount
            "p12": "20", // DemonPowerRegen
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120",
            "cost": "100",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/swain/hud/icons2d/swain_r2.png"],
            "stats": {
                "사거리": "650"
            }
        },
    },
    "Skarner": { // 스카너
        "P": {
            "p1": "4", // Duration
            "p2": "3", // StacksToTriggerPassive
            "p3": "5 ~ 9% (레벨에 따라)", // PercentHealthDamage
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "20 / 25 / 30 / 35 / 40", // AttackSpeed*100
            "p2": "10 / 20 / 30 / 40 / 50 (+ 추가 공격력의 90% + 추가 최대 체력의 3%)", // AbilityDamage
            "p3": "11", // MaxHPPercent*100
            "p4": "1", // SlowDuration
            "p5": "40", // SlowPercent*100
            "p6": "10 / 20 / 30 / 40 / 50 (+ 추가 공격력의 90% + 추가 최대 체력의 3%)", // spell.SkarnerQ:AbilityDamage
            "p7": "11", // spell.SkarnerQ:MaxHPPercent*100
            "p8": "1", // spell.SkarnerQ:SlowDuration
            "p9": "40", // spell.SkarnerQ:SlowPercent*100
            "p10": "150 / 200 / 250 / 300 / 350", // MonsterDamageCap
            "p11": "100", // TurretDamageMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
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
            "p5": "20", // SlowEffect*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "700",
                "효과 범위": "600",
                "시전시간": "0.3",
                "투사체 속도": "1650"
            }
        },
        "E": {
            "p1": "30 / 60 / 90 / 120 / 150 (+ 추가 공격력의 120% + 최대 체력의 6%)", // PinDamage
            "p2": "1.1", // StunDuration
            "p3": "65", // RefundPercent*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
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
            "p4": "40", // SpeedBoostAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 105 / 90",
            "cost": "100",
            "stats": {
                "사거리": "625",
                "스킬 폭": "350",
                "시전시간": "0.75"
            }
        },
    },
    "Sivir": { // 시비르
        "P": {
            "p1": "55 ~ 75 (레벨에 따라)", // FlatMS
            "p2": "1.5", // HasteDuration
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "60 / 85 / 110 / 135 / 160 (+ 추가 공격력의 70% + 주문력의 60%)", // TotalDamage
            "p2": "40", // FallOffMinimum*100
            "p3": "40", // CritRatio*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "55 / 60 / 65 / 70 / 75",
            "stats": {
                "사거리": "1200",
                "스킬 폭": "180",
                "시전시간": "0.25 ~ 0.1<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:12px; color:#fff; white-space:nowrap;'>추가 공격 속도 100%당 50% 감소, 최대 60%</div></span></span>",
                "투사체 속도": "1350"
            }
        },
        "W": {
            "p1": "4", // BuffDuration
            "p2": "20 / 25 / 30 / 35 / 40", // RicochetAttackSpeed*100
            "p3": "총 공격력의 40 / 42.5 / 45 / 47.5 / 50%", // BounceDamage
            "p4": "8", // MaxBounces
            "p5": "65", // MinionDamageMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12",
            "cost": "60",
            "stats": {
                "효과 범위": "500",
                "투사체 속도": "1000 (튕김)"
            }
        },
        "E": {
            "p1": "1.5", // SpellShieldDuration
            "p2": "총 공격력의 60 / 65 / 70 / 75 / 80% (+ 주문력의 50%)", // TotalHeal
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "24 / 22.5 / 21 / 19.5 / 18",
            "cost": "-"
        },
        "R": {
            "p1": "8 / 10 / 12", // UltDuration
            "p2": "20 / 25 / 30", // MaxMS*100
            "p3": "0.5", // AttackCooldownRefund
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": {
                "효과 범위": "1000",
                "시전시간": "0.25"
            }
        },
    },
    "XinZhao": { // 신 짜오
        "P": {
            "p1": "총 공격력의 15 ~ 60 (레벨에 따라)% (+ 주문력의 5 ~ 20 (레벨에 따라)%)", // TotalDamage
            "p2": "최대 체력의 2 ~ 5 (레벨에 따라)% (+ 주문력의 40 ~ 70 (레벨에 따라)%)", // TotalHealing
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "15 / 30 / 45 / 60 / 75 (+ 추가 공격력의 40%)", // BonusDamage
            "p2": "0.75", // KnockUpDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "7 / 6.5 / 6 / 5.5 / 5",
            "cost": "30"
        },
        "W": {
            "p1": "30 / 40 / 50 / 60 / 70 (+ 총 공격력의 30%)", // SlashDamage
            "p2": "50 / 85 / 120 / 155 / 190 (+ 총 공격력의 90% + 주문력의 65%)", // ThrustDamage
            "p3": "1.5 (+ 주문력의 0.5%)", // TotalSlowDuration
            "p4": "50", // Effect6Amount*-100
            "p5": "3", // MarkDuration
            "p6": "33.3", // CritChanceAmp*100
            "p7": "50 ~ 100.002 (레벨에 따라)", // MinionMod
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "60",
            "stats": {
                "사거리": "1000",
                "효과 범위": "275",
                "스킬 폭": "140",
                "시전시간": "0.6",
                "투사체 속도": "6250"
            }
        },
        "E": {
            "p1": "50 / 75 / 100 / 125 / 150 (+ 주문력의 120%)", // ChargeDamage
            "p2": "0.5", // SlowDuration
            "p3": "30", // SlowAmount
            "p4": "5", // ASDuration
            "p5": "38 / 46 / 54 / 62 / 70% (+ 주문력의 10%) (+ 영구적 공격 속도 5%당 1%)", // f1
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "11",
            "cost": "60",
            "stats": {
                "사거리": "650<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:12px; color:#fff; white-space:nowrap;'>도전 대상 1100</div></span></span>",
                "효과 범위": "250",
                "돌진 속도": "2500"
            }
        },
        "R": {
            "p1": "3", // MarkDuration
            "p2": "75 / 175 / 275 (+ 추가 공격력의 100% + 주문력의 110%)", // TotalDamage
            "p3": "15", // PercentCurrentHealthDamage*100
            "p4": "4", // MissileDefenseBaseDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 110 / 100",
            "cost": "100",
            "stats": {
                "효과 범위": "500",
                "시전시간": "0.35"
            }
        },
    },
    "Syndra": { // 신드라
        "P": {
            "p1": "120", // MaxStackAmount
            "p2": "20 ~ 215 (레벨에 따라)", // ManaPerProc
            "p3": "4", // MarkDuration
            "p4": "1 ~ 3 (레벨에 따라)", // StacksPerProc
            "p5": "8", // PassiveMarkCooldown
            "p6": "5", // PassiveStacksPerLevel
            "p7": "1", // StackPerSiege
            "p8": "15", // CapstoneAPPerc*100
            "cooldown": "-",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/syndra/hud/icons2d/syndra_p2.png"],
            "cost": "-"
        },
        "Q": {
            "p1": "90 / 125 / 160 / 195 / 230 (+ 주문력의 70%)", // TotalDamage
            "p2": "6", // SphereDuration
            "p3": "40", // spell.SyndraPassive:Q1UpgradeThreshold
            "p4": "2", // Upgrade1MaxAmmo
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "7",
            "cost": "40 / 45 / 50 / 55 / 60",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/syndra/hud/icons2d/syndra_q2.png"],
            "stats": {
                "사거리": "800",
                "효과 범위": "210",
                "투사체 속도": "1750"
            }
        },
        "W": {
            "p1": "70 / 100 / 130 / 160 / 190 (+ 주문력의 65%)", // ThrowDamage
            "p2": "1.5", // f2
            "p3": "25", // TotalSlowAmount
            "p4": "60", // spell.SyndraPassive:WUpgradeThreshold
            "p5": "12% (+ 주문력의 2%)", // TOOLTIPONLYPassiveBonusPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "60 / 70 / 80 / 90 / 100",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/syndra/hud/icons2d/syndra_wr2.png", "https://raw.communitydragon.org/latest/game/assets/characters/syndra/hud/icons2d/syndra_w2.png"],
            "stats": {
                "사거리": "925",
                "효과 범위": "225",
                "투사체 속도": "1450"
            }
        },
        "E": {
            "p1": "60 / 95 / 130 / 165 / 200 (+ 주문력의 60%)", // TotalDamage
            "p2": "1.25", // StunDuration
            "p3": "80", // spell.SyndraPassive:EUpgradeThreshold
            "p4": "1.25", // UpgradedSlowDuration
            "p5": "70", // UpgradedSlowAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "15",
            "cost": "50",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/syndra/hud/icons2d/syndra_e2.png"],
            "stats": {
                "사거리": "650",
                "스킬 폭": "120",
                "시전시간": "0.25",
                "투사체 속도": "2500"
            }
        },
        "R": {
            "p1": "10", // QHastePerRank
            "p2": "80 / 120 / 160 (+ 주문력의 20%)", // DamageCalc
            "p3": "560 / 840 / 1120 (+ 주문력의 140%)", // MaxDamageCalc
            "p4": "100", // spell.SyndraPassive:RUpgradeThreshold
            "p5": "15", // UpgradeExecuteThreshold*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/syndra/hud/icons2d/syndra_r2.png"],
            "stats": {
                "사거리": "675",
                "효과 범위": "3000",
                "시전시간": "0.25",
                "투사체 속도": "1100"
            }
        },
    },
    "Singed": { // 신지드
        "P": {
            "p1": "2", // MSDuration
            "p2": "25", // MSPercent*100
            "p3": "8", // PerTargetCD
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "효과 범위": "225"
            }
        },
        "Q": {
            "p1": "20 / 30 / 40 / 50 / 60 (+ 주문력의 42.5%)", // DamagePerSecond
            "p2": "3.25", // CloudDuration
            "p3": "2", // PoisonDuration
            "p4": "95 / 142.5 / 190 / 237.5 / 285 (+ 주문력의 201.875%)", // ApproximateTotalDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "0",
            "cost": "초당 마나 13",
            "stats": {
                "효과 범위": "180"
            }
        },
        "W": {
            "p1": "3", // WDuration
            "p2": "50 / 55 / 60 / 65 / 70", // SlowPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "17 / 16 / 15 / 14 / 13",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "1000",
                "효과 범위": "265",
                "시전시간": "0.25",
                "투사체 속도": "700"
            }
        },
        "E": {
            "p1": "50 / 60 / 70 / 80 / 90 (+ 주문력의 55%)", // BaseDamage
            "p2": "6 / 6.5 / 7 / 7.5 / 8", // MaxHPDamage
            "p3": "1 / 1.25 / 1.5 / 1.75 / 2", // RootDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "125",
                "시전시간": "0.25"
            }
        },
        "R": {
            "p1": "25", // Duration
            "p2": "25 / 55 / 85", // StatAmount
            "p3": "1", // GrievousDuration
            "p4": "40", // GrievousAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "100",
            "cost": "100"
        },
    },
    "Thresh": { // 쓰레쉬
        "P": {
            "p1": "1", // StatValuePerSoul
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "효과 범위": "1900"
            }
        },
        "Q": {
            "p1": "1.5", // TauntLength
            "p2": "100 / 150 / 200 / 250 / 300 (+ 주문력의 90%)", // TotalDamage
            "p3": "2", // HitBonusCooldown
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "19 / 16.5 / 14 / 11.5 / 9",
            "cost": "70",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/thresh/hud/icons2d/thresh_q3.png"],
            "stats": {
                "사거리": "1075<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:12px; color:#fff; white-space:nowrap;'>기절·끌어당김은 전역</div></span></span>",
                "스킬 폭": "120",
                "시전시간": "0.5",
                "투사체 속도": "1900"
            }
        },
        "W": {
            "p1": "4", // ShieldDuration
            "p2": "50 / 70 / 90 / 110 / 130 (+ 2 (중첩당))", // TotalShield
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "21 / 20 / 19 / 18 / 17",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "950",
                "효과 범위": "350",
                "투사체 속도": "150"
            }
        },
        "E": {
            "p1": "1.7 (중첩당)", // PAttackDamageMin
            "p2": "1.7 (중첩당) (+ 총 공격력의 90 / 120 / 150 / 180 / 210%)", // PAttackDamageMax
            "p3": "1", // SlowDuration
            "p4": "20 / 25 / 30 / 35 / 40", // ActiveSlowPercentage
            "p5": "75 / 120 / 165 / 210 / 255 (+ 주문력의 70%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "13 / 12.25 / 11.5 / 10.75 / 10",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "500",
                "효과 범위": "270",
                "스킬 폭": "220",
                "시전시간": "0.3889",
                "투사체 속도": "1100"
            }
        },
        "R": {
            "p1": "2", // SlowDuration
            "p2": "99", // SlowAmount
            "p3": "250 / 400 / 550 (+ 주문력의 100%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": {
                "사거리": "450",
                "시전시간": "0.45"
            }
        },
    },
    "Ahri": { // 아리
        "P": {
            "p1": "9", // MaxStacks
            "p2": "35 ~ 95 (레벨에 따라) (+ 주문력의 20%)", // MinionHeal
            "p3": "3", // TakedownWindow
            "p4": "75 ~ 165 (레벨에 따라) (+ 주문력의 30%)", // ChampionHeal
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "35 / 60 / 85 / 110 / 135 (+ 주문력의 50%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "7",
            "cost": "55 / 65 / 75 / 85 / 95",
            "stats": {
                "사거리": "970",
                "효과 범위": "100",
                "스킬 폭": "200",
                "시전시간": "0.25",
                "투사체 속도": "1100"
            }
        },
        "W": {
            "p1": "40 / 60 / 80 / 100 / 120 (+ 주문력의 40%)", // SingleFireDamage
            "p2": "16 / 24 / 32 / 40 / 48 (+ 주문력의 16%)", // MultiFireDamage
            "p3": "40", // MovementSpeed*100
            "p4": "2", // MovementSpeedDuration
            "p5": "20", // MinionBonusDamageThreshold*100
            "p6": "200", // MinionBonusDamageMultiplier*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "30",
            "stats": {
                "사거리": "700",
                "효과 범위": "150",
                "시전시간": "0.25"
            }
        },
        "E": {
            "p1": "1.2 / 1.35 / 1.5 / 1.65 / 1.8", // CharmDuration
            "p2": "80 / 120 / 160 / 200 / 240 (+ 주문력의 85%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12",
            "cost": "60",
            "stats": {
                "사거리": "975",
                "스킬 폭": "120",
                "시전시간": "0.25",
                "투사체 속도": "1200"
            }
        },
        "R": {
            "p1": "3", // RMaxTargetsPerCast
            "p2": "75 / 125 / 175 (+ 주문력의 35%)", // RCalculatedDamage
            "p3": "15", // RRecastWindow
            "p4": "3", // RMaxCasts
            "p5": "10", // PDurationExtension
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "140 / 120 / 100",
            "cost": "100",
            "stats": {
                "사거리": "450",
                "효과 범위": "600",
                "투사체 속도": "2200",
                "돌진 속도": "1200"
            }
        },
    },
    "Amumu": { // 아무무
        "P": {
            "p1": "3", // DebuffDuration
            "p2": "10", // DamageAmp*100
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "1", // StunDuration
            "p2": "70 / 95 / 120 / 145 / 170 (+ 주문력의 85%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "재충전 대기시간 16 / 15 / 14 / 13 / 12초 (재사용 3초)",
            "cost": "50",
            "stats": {
                "사거리": "1100",
                "스킬 폭": "160",
                "시전시간": "0.25",
                "투사체 속도": "2000",
                "돌진 속도": "1800"
            }
        },
        "W": {
            "p1": "10", // BaseDamage
            "p2": "1 / 1.25 / 1.5 / 1.75 / 2 (+ 주문력의 0.5%)", // TotalHealthDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "1",
            "cost": "초당 마나 8",
            "stats": {
                "사거리": "300",
                "효과 범위": "350"
            }
        },
        "E": {
            "p1": "5 / 7 / 9 / 11 / 13 (+ 추가 방어력의 3% + 추가 마법 저항력의 3%)", // DamageReduction
            "p2": "0.75", // CDROnHit
            "p3": "65 / 95 / 125 / 155 / 185 (+ 주문력의 50%)", // TantrumDamage
            "p4": "50", // FlatDamageReductionMax*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "35",
            "stats": {
                "효과 범위": "350",
                "시전시간": "0.25"
            }
        },
        "R": {
            "p1": "1.5", // RDuration
            "p2": "200 / 300 / 400 (+ 주문력의 80%)", // RCalculatedDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "150 / 125 / 100",
            "cost": "100 / 150 / 200",
            "stats": {
                "효과 범위": "550",
                "시전시간": "0.25"
            }
        },
    },
    "AurelionSol": { // 아우렐리온 솔
        "P": {
            "p1": "별가루 1개당 최대 체력의 0.031%", // QPassiveScaling
            "p2": "별가루 1개당 7.5", // f2.1
            "p3": "별가루 1개당 면적 0.379%", // f3.1
            "p4": "별가루 1개당 0.026%p", // EPassiveScalingExecute
            "p5": "별가루 1개당 면적 0.379%", // f4.1
            "p6": "?", // f1
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "3.25 / 3.25 / 3.25 / 3.25 / 9999", // MaxChannelDuration
            "p2": "45 / 60 / 75 / 90 / 105 (+ 주문력의 55%)", // DamagePerSecond
            "p3": "50", // AOEModifier*100
            "p4": "60 / 70 / 80 / 90 / 100 (+ 주문력의 30%)", // BurstDamage
            "p5": "0.031 (중첩당)%", // BurstBonusTrueDamageToChamps
            "p6": "2", // QMassStolen
            "p7": "750 ~ 920 (레벨에 따라)", // LevelBasedRangeScaling
            "p8": "35 / 40 / 45 / 50 / 55", // ManaCostPerSecond
            "p9": "300", // MonsterDamageCap
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "3",
            "cost": "초당 마나 35 / 40 / 45 / 50 / 55",
            "stats": {
                "사거리": "750",
                "투사체 속도": "1500"
            }
        },
        "W": {
            "p1": "8 / 9 / 10 / 11 / 12", // TrueDamageBonus*100
            "p2": "3", // ResetWindow
            "p3": "90", // TooltipTakedownCooldownMultiplier
            "p4": "340 (+ 이동 속도의 100%)", // DashSpeed
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "22 / 20.5 / 19 / 17.5 / 16",
            "cost": "50 / 55 / 60 / 65 / 70",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/aurelionsol/hud/icons2d/aurelionsolw2.png"],
            "stats": {
                "사거리": "1500",
                "시전시간": "0.4"
            }
        },
        "E": {
            "p1": "10 / 15 / 20 / 25 / 30 (+ 주문력의 12%)", // DamagePerSecond
            "p2": "5", // Duration
            "p3": "5 (+ 0.026 (중첩당))", // CurrentExecutionThreshold
            "p4": "750 ~ 920 (레벨에 따라)", // LevelBasedRangeScaling
            "p5": "1", // ChampionMassPerSecond
            "p6": "2", // ChampionCountBonus
            "p7": "2", // EpicMonsterCountBonus
            "p8": "2", // LargeMonsterCountBonus
            "p9": "2", // LargeMinionCountBonus
            "p10": "1", // MinionMassDeath
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12",
            "cost": "90",
            "stats": {
                "사거리": "750",
                "시전시간": "0.2",
                "투사체 속도": "1300"
            }
        },
        "R": {
            "p1": "150 / 250 / 350 (+ 주문력의 75%)", // MaxDamageTooltip
            "p2": "1", // StunDuration
            "p3": "5", // MassStolen
            "p4": "75", // CalamityStacks
            "p5": "187.5 / 312.5 / 437.5 (+ 주문력의 93.75%)", // R2Damage
            "p6": "135 / 225 / 315 (+ 주문력의 67.5%)", // ShockwaveDamage
            "p7": "50", // ShockwaveSlow*100
            "p8": "?", // f1
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 110 / 100",
            "cost": "100",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/aurelionsol/hud/icons2d/aurelionsolr2.png"],
            "stats": {
                "사거리": "1250"
            }
        },
    },
    "Ivern": { // 아이번
        "P": {
            "p1": "기본 최대 체력의 15 ~ 0.006% (레벨에 따라)", // HealthTooltip
            "p2": "기본 마나의 20 ~ 0.025% (레벨에 따라)", // ManaTooltip
            "p3": "40 ~ 1 (레벨에 따라)", // HarvestDuration
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "80 / 125 / 170 / 215 / 260 (+ 주문력의 70%)", // TotalDamage
            "p2": "1.6 / 1.7 / 1.8 / 1.9 / 2", // RootDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "60",
            "stats": {
                "사거리": "1125",
                "스킬 폭": "160",
                "시전시간": "0.25",
                "투사체 속도": "1300",
                "돌진 속도": "1500"
            }
        },
        "W": {
            "p1": "3", // BuffDuration
            "p2": "20 / 27.5 / 35 / 42.5 / 50 (+ 주문력의 20%)", // TotalDamage
            "p3": "1.5", // AllyBuffDuration
            "p4": "10 / 15 / 20 / 25 / 30 (+ 주문력의 10%)", // TotalAllyDamage
            "p5": "8", // RevealDuration
            "p6": "45", // MaxBrushDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "20",
            "cost": "30",
            "stats": {
                "사거리": "1150",
                "시전시간": "0.25",
                "투사체 속도": "1600"
            }
        },
        "E": {
            "p1": "75 / 115 / 155 / 195 / 235 (+ 주문력의 50%)", // TotalShield
            "p2": "2", // ShieldDuration
            "p3": "70 / 90 / 110 / 130 / 150 (+ 주문력의 80%)", // TotalDamage
            "p4": "2", // SlowDuration
            "p5": "40 / 45 / 50 / 55 / 60", // SlowAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "70",
            "stats": {
                "사거리": "750",
                "효과 범위": "500"
            }
        },
        "R": {
            "p1": "45", // DaisyDuration
            "p2": "90 / 140 / 190 (+ 주문력의 50%)", // TotalShockwaveDamage
            "p3": "1", // ShockwaveCCDuration
            "p4": "3", // ShockwaveCD
            "p5": "1000 ~ 4400 (레벨에 따라) (+ 주문력의 50%)", // TotalDaisyHP
            "p6": "30 ~ 90 (레벨에 따라)", // TotalBonusResists
            "p7": "70 / 100 / 130 (+ 주문력의 15%)", // TotalDaisyAD
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "140 / 130 / 120",
            "cost": "100",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/ivern/hud/icons2d/ivernr2.png"],
            "stats": {
                "사거리": "600",
                "시전시간": "0.5",
                "투사체 속도": "1400"
            }
        },
    },
    "Azir": { // 아지르
        "P": {
            "p1": "230 ~ 410 (레벨에 따라) (+ 주문력의 40%)", // TowerDamage
            "p2": "30 ~ 90 (레벨에 따라)", // BonusResists
            "p3": "45", // TowerDisintegrationTime
            "cooldown": "90", // Cooldown
            "cost": "-",
            "stats": {
                "사거리": "700"
            }
        },
        "Q": {
            "p1": "75 / 95 / 115 / 135 / 155 (+ 주문력의 35 / 40 / 45 / 50 / 55%)", // TotalDamage
            "p2": "25", // SlowAmount*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14 / 12 / 10 / 8 / 6",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": {
                "사거리": "740",
                "효과 범위": "150",
                "시전시간": "0.25",
                "돌진 속도": "1600"
            }
        },
        "W": {
            "p1": "10", // SoldierDuration
            "p2": "50 / 65 / 80 / 95 / 110 (+ 0 ~ 72 (레벨에 따라) + 주문력의 35 / 42.5 / 50 / 57.5 / 65%)", // TotalDamage
            "p3": "2", // MaxAmmo
            "p4": "50", // OnHitMultiplier*100
            "p5": "25", // SubsequentDamageMod
            "p6": "20 ~ 100% (레벨에 따라)", // SecondaryTargetDamageMod
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "재충전 대기시간 12 / 10.5 / 9 / 7.5 / 6초 (재사용 1.5초)",
            "cost": "40 / 35 / 30 / 25 / 20",
            "stats": {
                "사거리": "525",
                "시전시간": "0.25"
            }
        },
        "E": {
            "p1": "1.5", // ShieldDuration
            "p2": "70 / 110 / 150 / 190 / 230 (+ 주문력의 60%)", // TotalShield
            "p3": "70 / 110 / 150 / 190 / 230 (+ 주문력의 60%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "22 / 20.5 / 19 / 17.5 / 16",
            "cost": "60",
            "stats": {
                "사거리": "1100",
                "돌진 속도": "1700"
            }
        },
        "R": {
            "p1": "200 / 400 / 600 (+ 주문력의 75%)", // TotalDamage
            "p2": "5", // WallDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 105 / 90",
            "cost": "100",
            "stats": {
                "사거리": "250",
                "효과 범위": "125",
                "시전시간": "0.5",
                "투사체 속도": "1000"
            }
        },
    },
    "Akali": { // 아칼리
        "P": {
            "p1": "30 ~ 60% (레벨에 따라)", // PassiveSpeedBonus
            "p2": "35 ~ 182 (레벨에 따라) (+ 추가 공격력의 60% + 주문력의 55%)", // Damage
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "효과 범위": "500"
            }
        },
        "Q": {
            "p1": "45 / 70 / 95 / 120 / 145 (+ 총 공격력의 65% + 주문력의 60%)", // Damage
            "p2": "0.5", // SlowDuration
            "p3": "50", // SlowPercentage*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "1.5",
            "cost": "110 / 100 / 90 / 80 / 70",
            "stats": {
                "사거리": "550",
                "스킬 폭": "140",
                "시전시간": "0.25",
                "투사체 속도": "3200"
            }
        },
        "W": {
            "p1": "5 / 5.5 / 6 / 6.5 / 7", // BaseDuration
            "p2": "30 / 35 / 40 / 45 / 50", // MovementSpeed
            "p3": "2", // MovementSpeedDuration
            "p4": "100", // EnergyRestore
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "20 / 19 / 18 / 17 / 16",
            "cost": "100의 기력을 회복합니다.",
            "stats": {
                "사거리": "350",
                "효과 범위": "350",
                "스킬 폭": "140",
                "시전시간": "0.25",
                "투사체 속도": "1200"
            }
        },
        "E": {
            "p1": "21 / 42 / 63 / 84 / 105 (+ 총 공격력의 30% + 주문력의 33%)", // E1Damage
            "p2": "49 / 98 / 147 / 196 / 245 (+ 총 공격력의 70% + 주문력의 77%)", // E2DamageCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "16 / 14.5 / 13 / 11.5 / 10",
            "cost": "30",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/akali/hud/icons2d/akali_e2.png"],
            "stats": {
                "사거리": "825 (재사용은 전역)",
                "스킬 폭": "140",
                "시전시간": "0.25",
                "투사체 속도": "1900"
            }
        },
        "R": {
            "p1": "110 / 220 / 330 (+ 추가 공격력의 50% + 주문력의 30%)", // Cast1Damage
            "p2": "2.5", // CooldownBetweenCasts
            "p3": "70 / 140 / 210 (+ 주문력의 30%)", // Cast2DamageMin
            "p4": "210 / 420 / 630 (+ 주문력의 90%)", // Cast2DamageMax
            "p5": "30", // MaxExecuteThreshold*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 90 / 60",
            "cost": "-",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/akali/hud/icons2d/akali_r2.png"],
            "stats": {
                "사거리": "675",
                "시전시간": "0.25",
                "돌진 속도": "1500"
            }
        },
    },
    "Akshan": { // 아크샨
        "P": {
            "p1": "총 공격력의 50%", // SecondAutoDamage
            "p2": "20 ~ 75 (레벨에 따라) x (1 + 추가 공격 속도의 100%)", // ASModdedMS
            "p3": "1", // HasteDuration
            "p4": "15 ~ 150 (레벨에 따라) (+ 주문력의 60%)", // PassiveProcDamage
            "p5": "2", // ShieldDuration
            "p6": "40 ~ 280 (레벨에 따라) (+ 추가 공격력의 35%)", // TotalShieldAmount
            "p7": "16 ~ 4 (레벨에 따라)", // PassiveCooldown
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "투사체 속도": "5000"
            }
        },
        "Q": {
            "p1": "45 / 75 / 105 / 135 / 165 (+ 추가 공격력의 70%)", // FinalDamage
            "p2": "20% (+ 주문력의 5%)", // TotalHaste
            "p3": "1", // HasteDuration
            "p4": "40 / 50 / 60 / 70 / 80", // SecondaryTargetDamage*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "850",
                "스킬 폭": "120",
                "시전시간": "0.25",
                "투사체 속도": "1500"
            }
        },
        "W": {
            "p1": "1", // GameModeInteger
            "p2": "?", // f2
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "18 / 14 / 10 / 6 / 2",
            "cost": "40 / 30 / 20 / 10 / 0",
            "stats": {
                "사거리": "5500",
                "시전시간": "0.5"
            }
        },
        "E": {
            "p1": "8 / 16 / 24 / 32 / 40 (+ 총 공격력의 25%)", // DamageToDeal
            "p2": "25", // OnHitDamageReduction*100
            "p3": "30", // AttackSpeedCoefficient*100
            "p4": "8 / 16 / 24 / 32 / 40 (+ 총 공격력의 25%)의 150%<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:11px; color:#fff; margin-bottom:5px; white-space:nowrap;'>무한의 대검 보유 시</div><div style='font-size:12px; color:#ff9900; font-weight:bold;'>165%</div><div style='font-size:10px; color:#9aa4af; margin-top:5px; white-space:nowrap;'>치명타 피해량 200% → 230%</div></span></span>", // CriticalCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "18 / 16.5 / 15 / 13.5 / 12",
            "cost": "70",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/akshan/hud/icons2d/akshan_e2.png"],
            "stats": {
                "사거리": "800",
                "효과 범위": "500",
                "스킬 폭": "80",
                "시전시간": "0.1",
                "투사체 속도": "2500"
            }
        },
        "R": {
            "p1": "2.5", // ChannelDuration
            "p2": "5 / 6 / 7", // NumberOfBullets
            "p3": "25 / 35 / 45 (+ 총 공격력의 15%)", // DamagePerBulletWithCrit
            "p4": "75 / 105 / 135 (+ 총 공격력의 45%)", // MaxDamagePerBullet
            "p5": "30", // CritDamageMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "100 / 85 / 70",
            "cost": "100",
            "stats": {
                "사거리": "2500",
                "스킬 폭": "120",
                "투사체 속도": "3200"
            }
        },
    },
    "Aatrox": { // 아트록스
        "P": {
            "p1": "4 ~ 10% (레벨에 따라)", // PDamage
            "p2": "100", // PHealingRatio*100
            "p3": "25", // PHealingMinionMod*100
            "p4": "22 ~ 10 (레벨에 따라)", // PCooldown
            "cooldown": "22 ~ 10 (레벨에 따라)", // PCooldown
            "cost": "-"
        },
        "Q": {
            "p1": "10 / 25 / 40 / 55 / 70 (+ 총 공격력의 60 / 67.5 / 75 / 82.5 / 90%)", // QDamage
            "p2": "17.5 / 43.75 / 70 / 96.25 / 122.5 (+ 총 공격력의 105 / 118.125 / 131.25 / 144.375 / 157.5%)", // QEdgeDamage
            "p3": "55 ~ 70% (레벨에 따라)", // QMinionDamage
            "p4": "25", // QMonsterBonus
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14 / 12 / 10 / 8 / 6",
            "cost": "-",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/aatrox/hud/icons2d/aatrox_q2.png", "https://raw.communitydragon.org/latest/game/assets/characters/aatrox/hud/icons2d/aatrox_q3.png"],
            "stats": {
                "시전시간": "0.6"
            }
        },
        "W": {
            "p1": "1.5", // WSlowDuration
            "p2": "25 / 27.5 / 30 / 32.5 / 35", // WSlowPercentage*-100
            "p3": "30 / 40 / 50 / 60 / 70 (+ 총 공격력의 40%)", // WDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "-",
            "stats": {
                "사거리": "825",
                "스킬 폭": "160",
                "시전시간": "0.25",
                "투사체 속도": "1800"
            }
        },
        "E": {
            "p1": "16% (+ 추가 최대 체력의 1.1%)", // TotalEVamp
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "-",
            "stats": {
                "사거리": "300",
                "시전시간": "0.25",
                "돌진 속도": "800"
            }
        },
        "R": {
            "p1": "3", // RMinionFearDuration
            "p2": "60 / 80 / 100", // RMovementSpeedBonus*100
            "p3": "10", // RDuration
            "p4": "20 / 30 / 40", // RTotalADAmp*100
            "p5": "50 / 75 / 100", // RHealingAmp*100
            "p6": "5", // RExtension
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "-",
            "stats": {
                "효과 범위": "600",
                "시전시간": "0.25"
            }
        },
    },
    "Aphelios": { // 아펠리오스
        "P": {
            "p1": "?", // spell.ApheliosCalibrumQ:Hotkey
            "p2": "?", // f1
            "p3": "?", // f2
            "p4": "?", // f3
            "p5": "?", // f4
            "p6": "?", // f5
            "cooldown": "-",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/aphelios/hud/icons2d/calibrum_m.png", "https://raw.communitydragon.org/latest/game/assets/characters/aphelios/hud/icons2d/severum_m.png", "https://raw.communitydragon.org/latest/game/assets/characters/aphelios/hud/icons2d/gravitum_m.png", "https://raw.communitydragon.org/latest/game/assets/characters/aphelios/hud/icons2d/infernum_m.png", "https://raw.communitydragon.org/latest/game/assets/characters/aphelios/hud/icons2d/crescendum_m.png"],
            "cost": "-"
        },
        "Q": {
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "9",
            "cost": "60",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/aphelios/hud/icons2d/calibrum_m.png", "https://raw.communitydragon.org/latest/game/assets/characters/aphelios/hud/icons2d/severum_m.png", "https://raw.communitydragon.org/latest/game/assets/characters/aphelios/hud/icons2d/gravitum_m.png", "https://raw.communitydragon.org/latest/game/assets/characters/aphelios/hud/icons2d/infernum_m.png", "https://raw.communitydragon.org/latest/game/assets/characters/aphelios/hud/icons2d/crescendum_m.png"],
            "stats": {
                "사거리": "1450",
                "스킬 폭": "120",
                "시전시간": "0.35",
                "투사체 속도": "1850"
            }
        },
        "W": {
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "0.8",
            "cost": "-"
        },
        "E": {
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "0",
            "cost": "-",
            "stats": {
                "사거리": "1000",
                "시전시간": "0.5"
            }
        },
        "R": {
            "p1": "125 / 175 / 225 (+ 추가 공격력의 20% + 주문력의 100%)", // MaxDamage
            "p2": "?", // f1
            "p3": "100% (+ 치명타 확률의 3000%)<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:11px; color:#fff; margin-bottom:5px; white-space:nowrap;'>무한의 대검 보유 시</div><div style='font-size:12px; color:#ff9900; font-weight:bold;'>100% (+ 치명타 확률의 3900%)</div><div style='font-size:10px; color:#9aa4af; margin-top:5px; white-space:nowrap;'>치명타 피해량 200% → 230%</div></span></span>", // CritDamageModCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 110 / 100",
            "cost": "100",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/aphelios/hud/icons2d/calibrum_u.png", "https://raw.communitydragon.org/latest/game/assets/characters/aphelios/hud/icons2d/severum_u.png", "https://raw.communitydragon.org/latest/game/assets/characters/aphelios/hud/icons2d/gravitum_u.png", "https://raw.communitydragon.org/latest/game/assets/characters/aphelios/hud/icons2d/infernum_u.png", "https://raw.communitydragon.org/latest/game/assets/characters/aphelios/hud/icons2d/crescendum_u.png"],
            "stats": {
                "사거리": "1300",
                "효과 범위": "300",
                "스킬 폭": "220",
                "시전시간": "0.5",
                "투사체 속도": "1000"
            }
        },
    },
    "Alistar": { // 알리스타
        "P": {
            "p1": "7", // PassiveMaxStacks
            "p2": "최대 체력의 5%", // BaseHeal
            "p3": "최대 체력의 7%", // AllyHeal
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "효과 범위": "1000"
            }
        },
        "Q": {
            "p1": "1", // KnockupDuration
            "p2": "60 / 100 / 140 / 180 / 220 (+ 주문력의 80%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "365",
                "효과 범위": "375",
                "시전시간": "0.25"
            }
        },
        "W": {
            "p1": "55 / 110 / 165 / 220 / 275 (+ 주문력의 100%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "650",
                "돌진 속도": "1200"
            }
        },
        "E": {
            "p1": "5", // Duration
            "p2": "80 / 110 / 140 / 170 / 200 (+ 주문력의 70%)", // TotalDamage
            "p3": "5", // MaxStacks
            "p4": "1", // StunDuration
            "p5": "20 ~ 275 (레벨에 따라)", // AttackBonusDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "효과 범위": "350"
            }
        },
        "R": {
            "p1": "7", // RDuration
            "p2": "55 / 65 / 75", // RDamageReduction
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": {
                "시전시간": "0.25"
            }
        },
    },
    "Ambessa": { // 암베사
        "P": {
            "p1": "4", // Attack_Buff_Duration
            "p2": "3", // Attack_Buff_Max_Stacks
            "p3": "75", // Attack_Range_Amount
            "p4": "50%", // Calc_Attack_Speed
            "p5": "5 ~ 30 (레벨에 따라) (+ 추가 공격력의 25%)", // Calc_OnHit_Damage_Flat
            "p6": "40 ~ 70 (레벨에 따라)", // Calc_OnHit_Energy_Refund
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "사거리": "175 ~ 350"
            }
        },
        "Q": {
            "p1": "40 / 60 / 80 / 100 / 120 (+ 추가 공격력의 60%)", // Calc_Damage_1_Max
            "p2": "4 / 4.5 / 5 / 5.5 / 6% (+ 추가 공격력의 3%)", // Calc_Damage_1_Percent_Max
            "p3": "50%", // Calc_Damage_1_Min_Ratio
            "p4": "50 / 75 / 100 / 125 / 150 (+ 추가 공격력의 90%)", // Calc_Damage_2_Max
            "p5": "4 / 4.5 / 5 / 5.5 / 6% (+ 추가 공격력의 4%)", // Calc_Damage_2_Percent_Max
            "p6": "50%", // Calc_Damage_2_Min_Ratio
            "p7": "75", // Calc_Damage_Monster_Flat_Bonus
            "p8": "100 ~ 300 (레벨에 따라)", // Calc_Damage_Monster_Percent_Cap
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "70",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/ambessa/hud/icons2d/icon_ambessa_q2.png"],
            "stats": {
                "사거리": "650",
                "스킬 폭": "30",
                "투사체 속도": "8700"
            }
        },
        "W": {
            "p1": "1.5", // Shield_Duration
            "p2": "50 ~ 320 (레벨에 따라) (+ 추가 공격력의 150%)", // Calc_Shield
            "p3": "0.5", // Buff_Duration
            "p4": "50 / 75 / 100 / 125 / 150 (+ 추가 공격력의 50%)", // Calc_Damage_Low
            "p5": "75 / 112.5 / 150 / 187.5 / 225 (+ 추가 공격력의 75%)", // Calc_Damage_High
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "18 / 17 / 16 / 15 / 14",
            "cost": "70",
            "stats": {
                "효과 범위": "325"
            }
        },
        "E": {
            "p1": "40 / 60 / 80 / 100 / 120 (+ 추가 공격력의 50%)", // Calc_Damage_Flat
            "p2": "99", // Slow_Amount*100
            "p3": "1", // Slow_Duration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "70",
            "stats": {
                "효과 범위": "325",
                "스킬 폭": "30"
            }
        },
        "R": {
            "p1": "10 / 20 / 30", // Armor_Penetration*100
            "p2": "15 / 17.5 / 20% (+ 생명력 흡수의 50%)", // Calc_Omnivamp
            "p3": "0.75", // Suppress_Duration
            "p4": "150 / 250 / 350 (+ 추가 공격력의 80%)", // Calc_Damage
            "p5": "0.4", // Stun_Duration
            "p6": "25", // Omnivamp_MinionMod*100
            "p7": "25", // Omnivamp_MonsterMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "130 / 115 / 100",
            "cost": "-",
            "stats": {
                "사거리": "1250",
                "스킬 폭": "30",
                "시전시간": "0.7"
            }
        },
    },
    "Annie": { // 애니
        "P": {
            "p1": "1.25 ~ 1.75 (레벨에 따라)", // StunDuration
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "80 / 125 / 170 / 215 / 260 (+ 주문력의 80%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "4",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "625",
                "시전시간": "0.25",
                "투사체 속도": "1400"
            }
        },
        "W": {
            "p1": "70 / 110 / 150 / 190 / 230 (+ 주문력의 80%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "7",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "효과 범위": "600",
                "시전시간": "0.25"
            }
        },
        "E": {
            "p1": "3", // ShieldDuration
            "p2": "60 / 95 / 130 / 165 / 200 (+ 주문력의 40%)", // ShieldBlockTotal
            "p3": "20 ~ 50% (레벨에 따라)", // MoveSpeedCalc
            "p4": "1.5", // MovementSpeedDuration
            "p5": "25 / 35 / 45 / 55 / 65 (+ 주문력의 40%)", // DamageReturn
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "800"
            }
        },
        "R": {
            "p1": "10 / 15 / 20", // RPercentPenBuff*100
            "p2": "150 / 275 / 400 (+ 주문력의 75%)", // InitialBurstDamage
            "p3": "45", // TibbersLifetime
            "p4": "8 / 12 / 16 (+ 주문력의 4%)", // TibbersAuraDamage
            "p5": "1150 ~ 3500 (레벨에 따라) (+ 주문력의 50%)", // TibbersTotalHP
            "p6": "30 ~ 90 (레벨에 따라)", // TibbersTotalResists
            "p7": "30 / 45 / 60 (+ 주문력의 10%)", // TibbersAADamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "130 / 115 / 100",
            "cost": "100",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/annie/hud/icons2d/annie_r2.png"],
            "stats": {
                "사거리": "600",
                "효과 범위": "250",
                "시전시간": "0.25"
            }
        },
    },
    "Anivia": { // 애니비아
        "P": {
            "p1": "-40 ~ 20 (레벨에 따라)", // BonusResists
            "cooldown": "240", // Cooldown
            "cost": "-"
        },
        "Q": {
            "p1": "50 / 70 / 90 / 110 / 130 (+ 주문력의 25%)", // TotalPassthroughDamage
            "p2": "3", // SlowDuration
            "p3": "20 / 30 / 40", // Spell.GlacialStorm:SlowAmount
            "p4": "1.1 / 1.2 / 1.3 / 1.4 / 1.5", // StunDuration
            "p5": "60 / 95 / 130 / 165 / 200 (+ 주문력의 45%)", // TotalExplosionDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "80 / 85 / 90 / 95 / 100",
            "stats": {
                "사거리": "1075",
                "효과 범위": "225",
                "스킬 폭": "220",
                "시전시간": "0.25",
                "투사체 속도": "850"
            }
        },
        "W": {
            "p1": "400 / 500 / 600 / 700 / 800", // WallWidth
            "p2": "5", // WallDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "17",
            "cost": "70",
            "stats": {
                "사거리": "100 ~ 1000",
                "시전시간": "0.25",
                "투사체 속도": "1600"
            }
        },
        "E": {
            "p1": "55 / 80 / 105 / 130 / 155 (+ 주문력의 55%)", // TotalDamage
            "p2": "110 / 160 / 210 / 260 / 310 (+ 주문력의 110%)", // EmpoweredDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "4",
            "cost": "50",
            "stats": {
                "사거리": "650",
                "시전시간": "0.25",
                "투사체 속도": "1600"
            }
        },
        "R": {
            "p1": "1.5", // GrowthTime
            "p2": "30 / 45 / 60 (+ 주문력의 12.5%)", // TotalDamagePerSecond
            "p3": "20 / 30 / 40", // SlowAmount
            "p4": "30 / 45 / 60", // SlowPercentEmpoweredTT
            "p5": "90 / 135 / 180 (+ 주문력의 37.5%)", // EmpoweredDamagePerSecondTooltipOnly
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "4 / 3 / 2",
            "cost": "60+초당 마나 35 / 45 / 55",
            "stats": {
                "사거리": "750",
                "효과 범위": "200 ~ 400 (지속 시간에 따라)",
                "스킬 폭": "300"
            }
        },
    },
    "Ashe": { // 애쉬
        "P": {
            "p1": "2", // SlowDuration
            "p2": "20 ~ 30% (레벨에 따라)", // SlowAmount
            "p3": "100% (+ 치명타 확률의 100 + 추가 치명타 피해량의 100%)", // DamageBonus
            "p4": "40 ~ 60% (레벨에 따라)", // EmpoweredSlowAmount
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "4", // StackDuration
            "p2": "4", // MaxStacks
            "p3": "6", // BuffDuration
            "p4": "20 / 30 / 40 / 50 / 60", // BonusAS
            "p5": "총 공격력의 110 / 115 / 120 / 125 / 130%", // EmpoweredDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "0",
            "cost": "30",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/ashe/hud/icons2d/ashe_q_active.png"]
        },
        "W": {
            "p1": "7 / 8 / 9 / 10 / 11", // NumberOfArrowsTooltip
            "p2": "60 / 95 / 130 / 165 / 200 (+ 추가 공격력의 100%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "18 / 14.5 / 11 / 7.5 / 4",
            "cost": "75 / 70 / 65 / 60 / 55",
            "stats": {
                "효과 범위": "1200",
                "스킬 폭": "20",
                "시전시간": "0.25",
                "투사체 속도": "2000"
            }
        },
        "E": {
            "p1": "5", // ChargeCooldown
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "5",
            "cost": "-",
            "stats": {
                "사거리": "전역",
                "효과 범위": "1000",
                "시전시간": "0.25",
                "투사체 속도": "1400"
            }
        },
        "R": {
            "p1": "200 / 400 / 600 (+ 주문력의 120%)", // RMainDamage
            "p2": "3.5", // MaxStunDuration
            "p3": "1", // MinStunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "100 / 80 / 60",
            "cost": "100",
            "stats": {
                "사거리": "전역",
                "효과 범위": "400",
                "스킬 폭": "260",
                "시전시간": "0.25",
                "투사체 속도": "1600"
            }
        },
    },
    "Yasuo": { // 야스오
        "P": {
            "p1": "125 ~ 600 (레벨에 따라)", // ShieldValue
            "p2": "100", // CritChanceMultiplier*100
            "p3": "치명타 피해량의 100%", // CurrentCritDamage
            "p4": "0.5", // YasuoCritToAD*.01
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "20 / 45 / 70 / 95 / 120 (+ 총 공격력의 105%)", // TotalDamage
            "p2": "6", // GatheringStormDuration
            "p3": "1", // KnockUpDurationTOOLTIPONLY
            "p4": "20 / 45 / 70 / 95 / 120 (+ 총 공격력의 치명타 피해량의 105%)", // TotalDamageCrit
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "4 ~ 1.33<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:12px; color:#fff; white-space:nowrap;'>추가 공격 속도 1.67%당 1% 감소, 최대 67%</div></span></span>",
            "cost": "-",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/yasuo/hud/icons2d/yasuo_q2.png", "https://raw.communitydragon.org/latest/game/assets/characters/yasuo/hud/icons2d/yasuo_q3.png"],
            "stats": {
                "사거리": "475<span class='custom-footnote'>[2]<span class='custom-footnote-content'><div style='font-size:12px; color:#fff; white-space:nowrap;'>회오리 1150</div></span></span>",
                "효과 범위": "215",
                "스킬 폭": "110",
                "시전시간": "0.35 ~ 0.175<span class='custom-footnote'>[3]<span class='custom-footnote-content'><div style='font-size:12px; color:#fff; white-space:nowrap;'>추가 공격 속도 24%당 0.035초 감소, 최대 50%</div></span></span>",
                "투사체 속도": "1500"
            }
        },
        "W": {
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "25 / 23 / 21 / 19 / 17",
            "cost": "-",
            "stats": {
                "사거리": "400",
                "시전시간": "0.013"
            }
        },
        "E": {
            "p1": "70 / 85 / 100 / 115 / 130 (+ 추가 공격력의 20% + 주문력의 60%)", // TotalDamage
            "p2": "5", // StackDuration
            "p3": "17.5 / 21.25 / 25 / 28.75 / 32.5 (+ 추가 공격력의 5% + 주문력의 15%)", // BonusDamagePerStack
            "p4": "4", // MaxStacks
            "p5": "10 / 9 / 8 / 7 / 6", // PerTargetCooldown
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "0.5 / 0.4 / 0.3 / 0.2 / 0.1",
            "cost": "-",
            "stats": {
                "사거리": "475",
                "돌진 속도": "750"
            }
        },
        "R": {
            "p1": "200 / 350 / 500 (+ 추가 공격력의 150%)", // Damage
            "p2": "1", // RKnockupDuration
            "p3": "15", // RBuffDuration
            "p4": "60", // RPercentArmorPen
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "70 / 50 / 30",
            "cost": "-",
            "stats": {
                "사거리": "1400",
                "효과 범위": "400"
            }
        },
    },
    "Ekko": { // 에코
        "P": {
            "p1": "30 ~ 140 (레벨에 따라) (+ 주문력의 80%)", // ThreeHitDamage
            "p2": "2 ~ 3 (레벨에 따라)", // SpeedDuration
            "p3": "50 ~ 80% (레벨에 따라)", // BonusMS
            "p4": "4", // LockoutTime
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "80 / 95 / 110 / 125 / 140 (+ 주문력의 30%)", // InitialDamage
            "p2": "40 / 45 / 50 / 55 / 60", // SlowPercent*-100
            "p3": "40 / 65 / 90 / 115 / 140 (+ 주문력의 60%)", // RecallDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "9 / 8.5 / 8 / 7.5 / 7",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "1075",
                "효과 범위": "160 ~ 210",
                "스킬 폭": "120",
                "시전시간": "0.25",
                "투사체 속도": "1650"
            }
        },
        "W": {
            "p1": "30", // BelowHealthThreshold*100
            "p2": "3% (+ 주문력의 3%)", // MissingHealthPercent
            "p3": "1.5", // SlowZoneDuration
            "p4": "40", // SlowPercent
            "p5": "2.25", // StunDuration
            "p6": "100 / 120 / 140 / 160 / 180 (+ 주문력의 150%)", // TotalShield
            "p7": "15", // OnHitMinMinionDamage
            "p8": "150", // OnHitMaxMinionDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "22 / 20 / 18 / 16 / 14",
            "cost": "30 / 35 / 40 / 45 / 50",
            "stats": {
                "사거리": "1600",
                "효과 범위": "375",
                "시전시간": "0.25"
            }
        },
        "E": {
            "p1": "50 / 75 / 100 / 125 / 150 (+ 주문력의 40%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "9 / 8.5 / 8 / 7.5 / 7",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "325",
                "시전시간": "0.25"
            }
        },
        "R": {
            "p1": "200 / 350 / 500 (+ 주문력의 175%)", // TotalDamage
            "p2": "100 / 150 / 200 (+ 주문력의 60%)", // TotalBaseHeal
            "p3": "3", // PercentHealAmpPerPercentMissingHealth
            "p4": "?", // spell.EkkoW:HotKey
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "110 / 80 / 50",
            "cost": "100",
            "stats": {
                "사거리": "850",
                "효과 범위": "375",
                "시전시간": "0.5"
            }
        },
    },
    "Elise": { // 엘리스
        "P": {
            "p1": "2 / 3 / 4 / 5", // spell.EliseR:BaseSpiderlingsStored
            "p2": "12 / 22 / 32 / 42 (+ 주문력의 15%)", // spell.EliseR:PassiveTotalDamage
            "p3": "6 / 8 / 10 / 12 (+ 주문력의 8%)", // spell.EliseR:PassiveTotalHealing
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "40 / 70 / 100 / 130 / 160", // BaseDamage
            "p2": "4% (+ 주문력의 3%)", // HumanPercentHealth
            "p3": "65 / 85 / 105 / 125 / 145 (+ 주문력의 90%)", // MonsterDamageCapCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "6",
            "cost": "80 / 85 / 90 / 95 / 100",
            "form1": "인간 형태",
            "stats": {
                "사거리": "615",
                "시전시간": "0.25",
                "투사체 속도": "2200"
            }
        },
        "W": {
            "p1": "60 / 100 / 140 / 180 / 220 (+ 주문력의 75%)", // spell.EliseHumanW:TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12",
            "cost": "60 / 70 / 80 / 90 / 100",
            "form1": "인간 형태",
            "stats": {
                "사거리": "950",
                "효과 범위": "275",
                "스킬 폭": "200",
                "시전시간": "0.125",
                "투사체 속도": "10000"
            }
        },
        "E": {
            "p1": "1.6 / 1.8 / 2 / 2.2 / 2.4", // TotalStunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "50",
            "form1": "인간 형태",
            "stats": {
                "사거리": "1075",
                "스킬 폭": "110",
                "시전시간": "0.25",
                "투사체 속도": "1600"
            }
        },
        "R": {
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "3",
            "cost": "-"
        },
        "Q2": {
            "p1": "50 / 80 / 110 / 140 / 170", // Spell.EliseSpiderQCast:BaseDamage
            "p2": "8% (+ 주문력의 3%)", // Spell.EliseSpiderQCast:MissingHPDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "6",
            "cost": "-",
            "name": "독이빨",
            "form": "거미 형태",
            "icon": "https://raw.communitydragon.org/latest/game/assets/characters/elise/hud/icons2d/elisespiderq.png"
        },
        "W2": {
            "p1": "5 / 10 / 15 / 20 / 25", // spell.EliseSpiderW:PassiveAttackSpeed*100
            "p2": "3", // spell.EliseSpiderW:BuffDuration
            "p3": "60 / 75 / 90 / 105 / 120", // spell.EliseSpiderW:ActiveAttackSpeed*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "6",
            "cost": "-",
            "name": "광란의 질주",
            "form": "거미 형태",
            "icon": "https://raw.communitydragon.org/latest/game/assets/characters/elise/hud/icons2d/elisespiderw.png"
        },
        "E2": {
            "p1": "5", // spell.EliseSpiderE:BuffDuration
            "p2": "40 / 55 / 70 / 85 / 100", // spell.EliseSpiderE:PBonusIncrease*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "23 / 22 / 21 / 20 / 19",
            "cost": "-",
            "name": "줄타기",
            "form": "거미 형태",
            "icon": "https://raw.communitydragon.org/latest/game/assets/characters/elise/hud/icons2d/elisespidere.png"
        },
    },
    "MonkeyKing": { // 오공
        "P": {
            "p1": "6 ~ 10 (레벨에 따라)", // BonusArmor
            "p2": "0.35", // HealthPercentPer5*100
            "p3": "5", // StackDuration
            "p4": "100", // StackMultiplier*100
            "p5": "5", // MaxStacks
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "135 / 145 / 155 / 165 / 175", // AttackRangeBonus
            "p2": "20 / 45 / 70 / 95 / 120 (+ 추가 공격력의 50%)", // BonusDamageTT
            "p3": "3", // ShredDuration
            "p4": "10 / 15 / 20 / 25 / 30", // ArmorShredPercent*100
            "p5": "0.5", // CooldownDecrease
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "20",
            "stats": {
                "사거리": "250 / 275 / 300 / 325 / 350",
                "시전시간": "0.5"
            }
        },
        "W": {
            "p1": "1", // StealthDuration
            "p2": "4", // CloneDuration
            "p3": "40 / 45 / 50 / 55 / 60", // CloneDamageMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "22 / 21 / 20 / 19 / 18",
            "cost": "60 / 55 / 50 / 45 / 40",
            "stats": {
                "사거리": "275",
                "돌진 속도": "900"
            }
        },
        "E": {
            "p1": "2", // ExtraTargets
            "p2": "80 / 120 / 160 / 200 / 240 (+ 주문력의 100%)", // TotalDamage
            "p3": "5", // AttackSpeedDuration
            "p4": "40 / 45 / 50 / 55 / 60", // AttackSpeed*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10 / 9.25 / 8.5 / 7.75 / 7",
            "cost": "30 / 35 / 40 / 45 / 50",
            "stats": {
                "사거리": "650",
                "효과 범위": "187.5",
                "투사체 속도": "2200",
                "돌진 속도": "1050"
            }
        },
        "R": {
            "p1": "20", // MoveSpeed*100
            "p2": "2", // SpinDuration
            "p3": "0.6", // KnockupDuration
            "p4": "총 공격력의 275%", // TotalDamageTT
            "p5": "8 / 12 / 16%", // PercentHPDamageTT
            "p6": "8", // RecastWindow
            "p7": "400 ~ 1200 (레벨에 따라)", // MonsterCapTT
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "130 / 110 / 90",
            "cost": "100",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/monkeyking/hud/icons2d/monkeykingcyclone2.png"],
            "stats": {
                "효과 범위": "315"
            }
        },
    },
    "Aurora": { // 오로라
        "P": {
            "p1": "1% (+ 주문력의 2.7%)", // ProcDamage
            "p2": "4", // SpiritModeDuration
            "p3": "3 ~ 20 (레벨에 따라) (+ 주문력의 2%)", // HealCalc
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "45 / 70 / 95 / 120 / 145 (+ 주문력의 40%)", // damage
            "p2": "3.5", // MarkDuration
            "p3": "67.5 / 105 / 142.5 / 180 / 217.5 (+ 주문력의 60%)", // Q2DamageMax
            "p4": "40", // Q2MinionMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "9 / 8.5 / 8 / 7.5 / 7",
            "cost": "60",
            "stats": {
                "사거리": "900<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:12px; color:#fff; white-space:nowrap;'>표식 대상 재사용은 전역</div></span></span>",
                "스킬 폭": "180",
                "시전시간": "0.25",
                "투사체 속도": "1600"
            }
        },
        "W": {
            "p1": "1 / 1.15 / 1.3 / 1.45 / 1.6", // InvisDuration
            "p2": "20 / 25 / 30 / 35 / 40", // MoveSpeedBonus
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "22 / 21 / 20 / 19 / 18",
            "cost": "80",
            "stats": {
                "사거리": "300<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:12px; color:#fff; white-space:nowrap;'>지형 넘으면 450</div></span></span>",
                "시전시간": "0.25",
                "투사체 속도": "1800",
                "돌진 속도": "350"
            }
        },
        "E": {
            "p1": "70 / 110 / 150 / 190 / 230 (+ 주문력의 70%)", // DamageCalc
            "p2": "80", // SlowPercent*-100
            "p3": "1", // SlowDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "80",
            "stats": {
                "사거리": "825",
                "스킬 폭": "160",
                "시전시간": "0.35"
            }
        },
        "R": {
            "p1": "175 / 275 / 375 (+ 주문력의 70%)", // DamageCalc
            "p2": "30", // SlowPercent*-100
            "p3": "2.5 / 3.25 / 4", // AreaDuration
            "p4": "3.5 / 4.25 / 5", // RBuffDuration
            "p5": "1.5 / 1.75 / 2", // StunDuration
            "p6": "50", // ExitSlowPercent*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "140 / 120 / 100",
            "cost": "100",
            "stats": {
                "사거리": "250",
                "효과 범위": "700"
            }
        },
    },
    "Ornn": { // 오른
        "P": {
            "p1": "1", // GameModeInteger
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "20 / 45 / 70 / 95 / 120 (+ 총 공격력의 110%)", // TotalDamage
            "p2": "2", // SlowDuration
            "p3": "40", // SlowAmount
            "p4": "4", // PillarDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "9 / 8.5 / 8 / 7.5 / 7",
            "cost": "45",
            "stats": {
                "사거리": "800",
                "스킬 폭": "130",
                "시전시간": "0.3",
                "투사체 속도": "1800"
            }
        },
        "W": {
            "p1": "0.75", // BreathDuration
            "p2": "12 / 13 / 14 / 15 / 16", // MaxPercentHPPerTickTooltip
            "p3": "3", // BrittleDuration
            "p4": "9 ~ 17% (레벨에 따라)", // BrittlePercentMaxHPCalc
            "p5": "80 / 130 / 180 / 230 / 280", // TotalMinimumDamage
            "p6": "260 / 320 / 380 / 440 / 500", // TotalMonsterDamageCap
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "45 / 50 / 55 / 60 / 65",
            "stats": {
                "사거리": "500",
                "효과 범위": "175",
                "투사체 속도": "1600"
            }
        },
        "E": {
            "p1": "80 / 125 / 170 / 215 / 260 (+ 추가 방어력의 40% + 추가 마법 저항력의 40%)", // TotalDamage
            "p2": "1.25", // KnockupDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14 / 13.5 / 13 / 12.5 / 12",
            "cost": "35 / 40 / 45 / 50 / 55",
            "stats": {
                "사거리": "800",
                "효과 범위": "360",
                "시전시간": "0.35",
                "투사체 속도": "1600",
                "돌진 속도": "1600"
            }
        },
        "R": {
            "p1": "125 / 175 / 225 (+ 주문력의 20%)", // RDamageCalc
            "p2": "3", // BrittleDurationTOOLTIPONLY
            "p3": "40 / 50 / 60", // RSlowPercentBasePreMath
            "p4": "1", // RStunDuration
            "p5": "0.5", // MinStun
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "140 / 120 / 100",
            "cost": "100",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/ornn/hud/icons2d/ornnr2.png"],
            "stats": {
                "사거리": "2500",
                "효과 범위": "3000",
                "스킬 폭": "340",
                "시전시간": "0.5",
                "투사체 속도": "1600"
            }
        },
    },
    "Orianna": { // 오리아나
        "P": {
            "p1": "10 ~ 50 (레벨에 따라) (+ 주문력의 15%)", // TotalDamage
            "p2": "4", // StackDuration
            "p3": "1.5 ~ 7.5 (레벨에 따라) (+ 주문력의 2.25%)", // StackDamage
            "p4": "3 ~ 15 (레벨에 따라) (+ 주문력의 4.5%)", // StackDamageMax
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "효과 범위": "1290"
            }
        },
        "Q": {
            "p1": "60 / 90 / 120 / 150 / 180 (+ 주문력의 55%)", // TotalDamageTooltip
            "p2": "30", // ReducedDamagePercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "7 / 6 / 5 / 4 / 3",
            "cost": "35",
            "stats": {
                "사거리": "815",
                "효과 범위": "175",
                "스킬 폭": "160",
                "투사체 속도": "1200"
            }
        },
        "W": {
            "p1": "70 / 110 / 150 / 190 / 230 (+ 주문력의 80%)", // TotalDamage
            "p2": "3", // FieldDuration
            "p3": "20 / 25 / 30 / 35 / 40", // SlowAmount*100
            "p4": "20 / 25 / 30 / 35 / 40", // HasteAmount*100
            "p5": "2", // SlowAndHasteDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "7",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "효과 범위": "225"
            }
        },
        "E": {
            "p1": "6 / 12 / 18 / 24 / 30", // DefenseBonus
            "p2": "2.5", // ShieldDuration
            "p3": "55 / 90 / 125 / 160 / 195 (+ 주문력의 45%)", // TotalShieldTooltip
            "p4": "60 / 90 / 120 / 150 / 180 (+ 주문력의 30%)", // TotalDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "9",
            "cost": "60",
            "stats": {
                "사거리": "1095",
                "스킬 폭": "160",
                "투사체 속도": "1200"
            }
        },
        "R": {
            "p1": "225 / 350 / 475 (+ 주문력의 110%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "110 / 95 / 80",
            "cost": "100",
            "stats": {
                "사거리": "410",
                "효과 범위": "415",
                "시전시간": "0.5"
            }
        },
    },
    "Olaf": { // 올라프
        "P": {
            "p1": "50 ~ 100% (레벨에 따라)", // MaxAttackSpeed
            "p2": "8 ~ 25% (레벨에 따라)", // MaxLifeSteal
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "70 / 120 / 170 / 220 / 270 (+ 추가 공격력의 100%)", // TotalDamage
            "p2": "3", // MaxSlowDuration
            "p3": "30 / 35 / 40 / 45 / 50", // SlowAmount*100
            "p4": "4", // DebuffDuration
            "p5": "20", // ShredAmount*100
            "p6": "2.5", // TooltipCDRefund
            "p7": "20 / 45 / 70 / 95 / 120", // MonsterDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "9",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "425 ~ 1000",
                "효과 범위": "100",
                "스킬 폭": "180",
                "시전시간": "0.25",
                "투사체 속도": "1600"
            }
        },
        "W": {
            "p1": "5", // Duration
            "p2": "40 / 50 / 60 / 70 / 80", // Attackspeed*100
            "p3": "2.5", // ShieldDuration
            "p4": "10 / 40 / 70 / 100 / 130", // BaseShield
            "p5": "17.5", // ShieldPercMissingHP*100
            "p6": "30", // ThresholdForMax*100
            "p7": "10 / 40 / 70 / 100 / 130 (+ 최대 체력의 12.25%)", // MaxShieldCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "50",
            "stats": {
                "사거리": "700"
            }
        },
        "E": {
            "p1": "70 / 115 / 160 / 205 / 250 (+ 총 공격력의 50%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "체력 28 / 46 / 64 / 82 / 100 (+ 총 공격력의 20%) 소모",
            "stats": {
                "사거리": "325",
                "시전시간": "0.25 ~ 0.175"
            }
        },
        "R": {
            "p1": "10 / 15 / 20", // Resists
            "p2": "3", // Duration
            "p3": "10 / 20 / 30 (+ 총 공격력의 25%)", // AD
            "p4": "2.5", // DurationExtension
            "p5": "1", // HasteDuration
            "p6": "20 / 45 / 70", // Haste*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "100 / 90 / 80",
            "cost": "100"
        },
    },
    "Yone": { // 요네
        "P": {
            "p1": "50", // MagicDamageSplit*100
            "p2": "100", // CritChanceMultiplier*100
            "p3": "치명타 피해량의 100%", // CurrentCritDamage
            "p4": "0.5", // YoneCritToAD*.01
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "25 / 50 / 75 / 100 / 125 (+ 총 공격력의 110%)", // QDamage
            "p2": "6", // BuffDuration
            "p3": "0.75", // Q3KnockupDuration
            "p4": "25 / 50 / 75 / 100 / 125 (+ 총 공격력의 치명타 피해량의 110%)", // TotalDamageCrit
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "4 ~ 1.33<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:12px; color:#fff; white-space:nowrap;'>추가 공격 속도 1.67%당 1% 감소, 최대 67%</div></span></span>",
            "cost": "-",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/yone/hud/icons2d/yoneq3.png"],
            "stats": {
                "사거리": "450<span class='custom-footnote'>[2]<span class='custom-footnote-content'><div style='font-size:12px; color:#fff; white-space:nowrap;'>회오리 1050</div></span></span>",
                "스킬 폭": "30",
                "시전시간": "0.35 ~ 0.175<span class='custom-footnote'>[3]<span class='custom-footnote-content'><div style='font-size:12px; color:#fff; white-space:nowrap;'>추가 공격 속도 24%당 0.035초 감소, 최대 50%</div></span></span>",
                "투사체 속도": "1500",
                "돌진 속도": "1500"
            }
        },
        "W": {
            "p1": "5 / 10 / 15 / 20 / 25", // BaseDamage*0.5
            "p2": "4 / 4.5 / 5 / 5.5 / 6", // MaxHealthDamage*50
            "p3": "1.5", // ShieldDuration
            "p4": "40 ~ 90 (레벨에 따라) (+ 추가 공격력의 65%)", // WShield
            "p5": "100", // FirstChampShieldMultiplier*100
            "p6": "50", // SecondChampShieldMultiplier*100
            "p7": "30 ~ 330 (레벨에 따라)", // MinimumDamageMinions
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14 ~ 6<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:12px; color:#fff; white-space:nowrap;'>추가 공격 속도 1.51%당 1% 감소, 최대 62.5%</div></span></span>",
            "cost": "-",
            "stats": {
                "사거리": "700",
                "효과 범위": "600",
                "시전시간": "0.5 ~ 0.19<span class='custom-footnote'>[2]<span class='custom-footnote-content'><div style='font-size:12px; color:#fff; white-space:nowrap;'>추가 공격 속도 1.68%당 1% 감소, 최대 62.5%</div></span></span>"
            }
        },
        "E": {
            "p1": "5", // ReturnTimer
            "p2": "10", // StartingMS*100
            "p3": "30", // MovementSpeed*100
            "p4": "25 / 27.5 / 30 / 32.5 / 35", // DeathmarkPercent*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "22 / 19 / 16 / 13 / 10",
            "cost": "-",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/yone/hud/icons2d/yonee2.png"],
            "stats": {
                "사거리": "300<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:12px; color:#fff; white-space:nowrap;'>귀환 돌진은 전역</div></span></span>",
                "시전시간": "0.225 (재사용)",
                "돌진 속도": "1200"
            }
        },
        "R": {
            "p1": "100 / 200 / 300 (+ 추가 공격력의 40%)", // TooltipDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "-",
            "stats": {
                "사거리": "1000",
                "스킬 폭": "450",
                "시전시간": "0.75",
                "투사체 속도": "1500"
            }
        },
    },
    "Yorick": { // 요릭
        "P": {
            "p1": "8 ~ 2 (레벨에 따라)", // YorickPassiveSpawnThreshold
            "p2": "100 ~ 300 (레벨에 따라) (+ 추가 최대 체력의 15%)", // YorickPassiveGhoulHealth
            "p3": "15 ~ 100 (레벨에 따라) (+ 추가 공격력의 20%)", // YorickPassiveGhoulDamage
            "p4": "4", // YorickPassiveGhoulMax
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "효과 범위": "1000"
            }
        },
        "Q": {
            "p1": "30 / 50 / 70 / 90 / 110 (+ 총 공격력의 50%)", // BonusDamage
            "p2": "10 ~ 68 (레벨에 따라)", // QHeal
            "p3": "6 / 7 / 8 / 9 / 10", // MissingHealthRatio
            "p4": "50", // HealReduction
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "6 / 5.5 / 5 / 4.5 / 4",
            "cost": "20",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/yorick/hud/icons2d/yorick_q2.png"]
        },
        "W": {
            "p1": "2 / 2 / 3 / 3 / 4", // WallHealthTooltip
            "p2": "4", // CircleDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "70",
            "stats": {
                "사거리": "600",
                "효과 범위": "225"
            }
        },
        "E": {
            "p1": "6 / 6.5 / 7 / 7.5 / 8% (+ 주문력의 3%)", // Calc_HealthDamage
            "p2": "1.5", // SlowDuration
            "p3": "30%", // Calc_Slow
            "p4": "4", // MarkDuration
            "p5": "4", // Spell.YorickPassive:YorickPassiveGhoulMax
            "p6": "13 / 16 / 19 / 22 / 25", // ArmorShred*100
            "p7": "18 / 21 / 24 / 27 / 30", // HasteAmount*100
            "p8": "70 / 105 / 140 / 175 / 210 (+ 주문력의 100%)", // Calc_MinimumDamage
            "p9": "50 / 75 / 100 / 125 / 150 (+ 주문력의 100%)", // Calc_MonsterCapDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "700",
                "효과 범위": "1500",
                "시전시간": "0.25",
                "투사체 속도": "1800"
            }
        },
        "R": {
            "p1": "1050 ~ 3200 (레벨에 따라) (+ 추가 최대 체력의 60%)", // YorickBigGhoulHealth
            "p2": "50 / 75 / 100 (+ 추가 공격력의 30%)", // YorickBigGhoulDamage
            "p3": "2 / 3 / 4", // RGhoulNumbers
            "p4": "2 / 2.5 / 3", // RMarkDamagePercent
            "p5": "30 ~ 90 (레벨에 따라)", // YorickMaidenResists
            "p6": "30", // MinionDamageTakenModifier*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "160 / 130 / 100",
            "cost": "100",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/yorick/hud/icons2d/yorick_r2.png"],
            "stats": {
                "사거리": "600",
                "시전시간": "0.5"
            }
        },
    },
    "Udyr": { // 우디르
        "P": {
            "p1": "50 ~ 20 (레벨에 따라)", // UltCD
            "p2": "4", // AttackSpeedDuration
            "p3": "30%", // AttackSpeed
            "p4": "5", // UltCDReduction*100
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "4", // AttackSpeedDurationBase
            "p2": "20 / 32 / 44 / 56 / 68 / 80", // AttackSpeedBase*100
            "p3": "6 / 12 / 18 / 24 / 30 / 36 (+ 추가 공격력의 20% + 추가 최대 체력의 1 / 1.2 / 1.4 / 1.6 / 1.8 / 2%)", // OnHitDamage
            "p4": "3 / 4 / 5 / 6 / 7 / 8% (+ 추가 공격력의 3.5%)", // MaxHPOnHit1
            "p5": "50", // AttackRange
            "p6": "20 / 32 / 44 / 56 / 68 / 80% (+ 20 ~ 70% (레벨에 따라))", // EmpoweredTotalAS
            "p7": "3 / 4 / 5 / 6 / 7 / 8% (+ 2 ~ 4% (레벨에 따라) + 추가 공격력의 5% + 추가 최대 체력의 0.1%)", // Q2TotalOnHitHPDamage
            "p8": "9 ~ 18% (레벨에 따라) (+ 주문력의 3.6%)", // EmpoweredLightningBonusMax
            "p9": "15 (+ 주문력의 50% + 추가 공격력의 100%)", // MonsterCap
            "p10": "1.5 ~ 3% (레벨에 따라) (+ 주문력의 0.6%)", // EmpoweredLightningBonus
            "p11": "40 ~ 160 (레벨에 따라)", // LightningDamageToMinionsMin
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "6",
            "cost": "20",
            "stats": {
                "효과 범위": "450"
            }
        },
        "W": {
            "p1": "4", // ShieldDuration
            "p2": "45 / 65 / 85 / 105 / 125 / 145 (+ 최대 체력의 2 / 2.3 / 2.6 / 2.9 / 3.2 / 3.5% + 주문력의 40% + 추가 공격력의 50%)", // TotalShield
            "p3": "15 / 16 / 17 / 18 / 19 / 20", // LifeSteal*100
            "p4": "최대 체력의 1.2% (+ 주문력의 8%)", // LifeOnHit
            "p5": "20 ~ 150 (레벨에 따라) (+ 45 / 65 / 85 / 105 / 125 / 145 + 주문력의 65% + 최대 체력의 8% + 추가 공격력의 100%)", // RecastShield
            "p6": "10 ~ 75 (레벨에 따라) (+ 22.5 / 32.5 / 42.5 / 52.5 / 62.5 / 72.5 + 주문력의 32.5% + 최대 체력의 4% + 추가 공격력의 50%)", // RecastHeal
            "p7": "30 / 32 / 34 / 36 / 38 / 40", // LifeSteal*200
            "p8": "최대 체력의 2.4% (+ 주문력의 16%)", // LifeOnHitAwakened
            "p9": "40", // HealOnHitMinionPenalty*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "6",
            "cost": "40 ~ 23 (레벨에 따라)"
        },
        "E": {
            "p1": "25 / 31 / 37 / 43 / 49 / 55% (+ 추가 공격력의 5%)", // MoveSpeed
            "p2": "4", // MoveSpeedDuration
            "p3": "0.75", // StunDuration
            "p4": "6 / 5.6 / 5.2 / 4.8 / 4.4 / 4", // ICD
            "p5": "1.5", // UnstoppableDuration
            "p6": "30 ~ 40% (레벨에 따라) (+ 추가 공격력의 10%)", // MoveSpeedBonus
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "6",
            "cost": "40 ~ 23 (레벨에 따라)"
        },
        "R": {
            "p1": "4", // BuffDuration
            "p2": "20 / 36 / 52 / 68 / 84 / 100 (+ 주문력의 35%)", // StormDamage
            "p3": "15 / 18 / 21 / 24 / 27 / 30", // SlowPotency*100
            "p4": "10 ~ 40 (레벨에 따라) (+ 주문력의 35%)", // PulseDamage
            "p5": "8 ~ 14% (레벨에 따라) (+ 주문력의 3.5%)", // PercentHPBlast
            "p6": "5%", // EmpoweredSlow
            "p7": "50 ~ 80% (레벨에 따라)", // DamageToMinions_Scaling
            "p8": "40 ~ 280 (레벨에 따라)", // spell.UdyrQ:MonsterNukeMinRCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "6",
            "cost": "40 ~ 23 (레벨에 따라)",
            "stats": {
                "효과 범위": "370",
                "시전시간": "0.1"
            }
        },
    },
    "Urgot": { // 우르곳
        "P": {
            "p1": "총 공격력의 40 ~ 100 (레벨에 따라)%", // ADDamage
            "p2": "2 ~ 6% (레벨에 따라)", // PercentHPRatio
            "p3": "30 ~ 2.5 (레벨에 따라)", // PerLegCD
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "효과 범위": "700"
            }
        },
        "Q": {
            "p1": "25 / 70 / 115 / 160 / 205 (+ 총 공격력의 70%)", // TotalDamage
            "p2": "1.25", // SlowDuration
            "p3": "45 / 50 / 55 / 60 / 65", // SlowAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "70",
            "stats": {
                "사거리": "800",
                "효과 범위": "210",
                "시전시간": "0.25"
            }
        },
        "W": {
            "p1": "3", // WAttacksPerSecond
            "p2": "12 (+ 총 공격력의 20 / 23.5 / 27 / 30.5 / 34%)", // DamagePerShot
            "p3": "40", // SlowResistance
            "p4": "125", // MoveSpeedMod
            "p5": "50", // OnHitDamageReduction*100
            "p6": "50", // MinionMinimumDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12 / 9 / 6 / 3 / 0",
            "cost": "40 / 30 / 20 / 10 / 0",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/urgot/hud/icons2d/urgot_wcancel.png"],
            "stats": {
                "효과 범위": "490",
                "스킬 폭": "80",
                "투사체 속도": "1600"
            }
        },
        "E": {
            "p1": "4", // EShieldDuration
            "p2": "55 / 75 / 95 / 115 / 135 (+ 추가 공격력의 135% + 추가 최대 체력의 13.5%)", // ETotalShieldHealth
            "p3": "1.5", // StunDuration
            "p4": "90 / 120 / 150 / 180 / 210 (+ 추가 공격력의 100%)", // EDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "16 / 15.5 / 15 / 14.5 / 14",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "450 ~ 475",
                "스킬 폭": "200",
                "시전시간": "0.45",
                "투사체 속도": "1500",
                "돌진 속도": "1200"
            }
        },
        "R": {
            "p1": "100 / 225 / 350 (+ 추가 공격력의 50%)", // RCalculatedDamage
            "p2": "4", // RSlowDuration
            "p3": "75", // RMoveSpeedMod
            "p4": "25", // RHealthThreshold
            "p5": "1.5", // RFearDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "100 / 85 / 70",
            "cost": "100",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/urgot/hud/icons2d/urgot_rrecast.png"],
            "stats": {
                "사거리": "2500 (재사용은 전역)",
                "효과 범위": "600",
                "스킬 폭": "160",
                "시전시간": "0.5",
                "투사체 속도": "3200"
            }
        },
    },
    "Warwick": { // 워윅
        "P": {
            "p1": "6 ~ 55 (레벨에 따라) (+ 추가 공격력의 15% + 주문력의 10%)", // OnHitDamage
            "p2": "50", // HealingThreshold*100
            "p3": "100", // HealingRatio*100
            "p4": "25", // EmpoweredHealingThreshold*100
            "p5": "250", // EmpoweredHealingRatio*100
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "총 공격력의 120% (+ 주문력의 100%)", // BaseBiteDamage
            "p2": "6 / 7 / 8 / 9 / 10", // TargetPercentHPDamage
            "p3": "25 / 37.5 / 50 / 62.5 / 75", // LifestealPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "80 / 85 / 90 / 95 / 100",
            "stats": {
                "사거리": "365",
                "스킬 폭": "110",
                "투사체 속도": "1500"
            }
        },
        "W": {
            "p1": "35 / 42.5 / 50 / 57.5 / 65", // PassiveMSBonus
            "p2": "70 / 80 / 90 / 100 / 110", // PassiveASBonus
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "80 / 70 / 60 / 50 / 40",
            "cost": "55",
            "stats": {
                "효과 범위": "4000<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:12px; color:#fff; white-space:nowrap;'>패시브 감지는 전역</div></span></span>",
                "시전시간": "0.5"
            }
        },
        "E": {
            "p1": "2.75", // DRDuration
            "p2": "35 / 40 / 45 / 50 / 55", // DRAmount
            "p3": "1", // FearDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "40",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/warwick/hud/icons2d/warwicke2.png"],
            "stats": {
                "효과 범위": "375",
                "스킬 폭": "180",
                "투사체 속도": "1600"
            }
        },
        "R": {
            "p1": "1.5", // RDuration
            "p2": "175 / 350 / 525 (+ 추가 공격력의 167%)", // DamageCumulative
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "110 / 90 / 70",
            "cost": "100",
            "stats": {
                "시전시간": "0.1"
            }
        },
    },
    "Yunara": { // 유나라
        "P": {
            "p1": "10% (+ 주문력의 10%)", // Calc_Damage_Amp
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "5 / 10 / 15 / 20 / 25 (+ 주문력의 20%)", // Calc_Passive_Damage
            "p2": "1", // Resource_Nonchampion
            "p3": "2", // Resource_Champion
            "p4": "8", // Resource_Max
            "p5": "5", // Buff_Duration
            "p6": "20 / 30 / 40 / 50 / 60%", // Calc_Attack_Speed
            "p7": "5 / 10 / 15 / 20 / 25 (+ 주문력의 20%)", // Calc_Damage
            "p8": "총 공격력의 30%", // Calc_Damage_Spread
            "p9": "15", // Spell.YunaraR:Buff_Duration
            "p10": "30", // Spread_Onhit_Efficacy*100
            "p11": "30%", // Calc_Minion_Execute_Threshold
            "p12": "250%", // Calc_Minion_Execute_Amp
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "없음",
            "cost": "30",
            "img": "https://raw.communitydragon.org/latest/game/assets/characters/yunara/hud/icons2d/yunara_q2.png",
            "imgBody": "https://raw.communitydragon.org/latest/game/assets/characters/yunara/hud/icons2d/yunara_q.png",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/yunara/hud/icons2d/yunara_q2.png", "https://raw.communitydragon.org/latest/game/assets/characters/yunara/hud/icons2d/yunara_r.png"],
            "stats": {
                "효과 범위": "300"
            }
        },
        "W": {
            "p1": "55 / 95 / 135 / 175 / 215 (+ 추가 공격력의 85% + 주문력의 50%)", // Calc_Damage_Initial
            "p2": "99%", // Calc_Slow
            "p3": "1.5", // Slow_Duration
            "p4": "33 / 57 / 81 / 105 / 129 (+ 추가 공격력의 51% + 주문력의 30%)", // Calc_Damage_Per_Second
            "p5": "160 / 320 / 480 (+ 추가 공격력의 120% + 주문력의 75%)", // Spell.YunaraR:Calc_RW_Damage
            "p6": "99%", // Spell.YunaraR:Calc_RW_Slow_Amount
            "p7": "1", // Spell.YunaraR:RW_Slow_Duration
            "p8": "?", // f3.0
            "p9": "100", // Cast_Time_Attack_Speed_Cap_Empowered
            "p10": "50 ~ 100% (레벨에 따라)", // Calc_Minion_Damage_Mod
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10",
            "cost": "60",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/yunara/hud/icons2d/yunara_rw.png"],
            "stats": {
                "사거리": "1150",
                "스킬 폭": "120",
                "투사체 속도": "2150"
            }
        },
        "E": {
            "p1": "1.5", // Buff_Duration
            "p2": "30 / 35 / 40 / 45 / 50%", // Calc_Move_Speed
            "p3": "45 / 52.5 / 60 / 67.5 / 75%", // Calc_Move_Speed_Enhanced
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "9",
            "cost": "40",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/yunara/hud/icons2d/yunara_re.png"]
        },
        "R": {
            "p1": "15", // Buff_Duration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "100 / 90 / 80",
            "cost": "100",
            "stats": {
                "돌진 속도": "1350 / 1500 / 1650"
            }
        },
    },
    "Yuumi": { // 유미
        "P": {
            "p1": "20 ~ 110 (레벨에 따라) (+ 주문력의 30%)", // HealAmount
            "p2": "4", // HealDelayTime
            "p3": "20 ~ 8 (레벨에 따라)", // PassiveCooldown
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "60 / 95 / 130 / 165 / 200 / 235 (+ 주문력의 20%)", // TotalMissileDamage
            "p2": "20", // SlowAmount
            "p3": "80 / 135 / 190 / 245 / 300 / 355 (+ 주문력의 30%)", // TotalMissileDamageEmpowered
            "p4": "2", // EmpoweredSlowDuration
            "p5": "50 / 53 / 56 / 59 / 62 / 65", // EmpoweredSlowAmount
            "p6": "5", // BuffDuration
            "p7": "주문력의 5% (+ 10 / 12 / 14 / 16 / 18 / 20)", // OnHitDamageCalc
            "p8": "75", // AllyCritChanceMaxAmp*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "6.5",
            "cost": "50 / 55 / 60 / 65 / 70 / 75",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/yuumi/hud/icons2d/yuumiq2.png"],
            "stats": {
                "사거리": "850",
                "스킬 폭": "130",
                "투사체 속도": "100"
            }
        },
        "W": {
            "p1": "4 / 5 / 6 / 7 / 8", // HealAndShieldPower*100
            "p2": "3 / 4 / 5 / 6 / 7 (+ 주문력의 3%)", // HealthOnHit
            "p3": "5", // CCAttachLockout
            "p4": "10 ~ 0 (레벨에 따라)", // spell.YuumiW:AttachCooldown
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10 ~ 0 (레벨에 따라)",
            "cost": "-",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/yuumi/hud/icons2d/yuumiw2.png"],
            "stats": {
                "사거리": "700",
                "돌진 속도": "1300 / 1350 / 1400 / 1450 / 1500"
            }
        },
        "E": {
            "p1": "65 / 90 / 115 / 140 / 165 (+ 주문력의 40%)", // TotalShielding
            "p2": "3", // MSDuration
            "p3": "25 / 27.5 / 30 / 32.5 / 35 (+ 주문력의 8%)", // TotalAttackSpeed
            "p4": "20", // MSAmount
            "p5": "20 / 24 / 28 / 32 / 36", // ManaRestore
            "p6": "100", // MaxManaPercIncrease*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10",
            "cost": "80 / 90 / 100 / 110 / 120"
        },
        "R": {
            "p1": "3.5", // UltDuration
            "p2": "5", // NumberOfWaves
            "p3": "75 / 125 / 175 (+ 주문력의 25%)", // TotalMissileDamage
            "p4": "1.25", // CCDuration
            "p5": "10", // BaseSlow*-100
            "p6": "10", // BonusSlowPerWave*-100
            "p7": "30 / 50 / 70 (+ 주문력의 12%)", // TotalHealPerWave
            "p8": "30 / 50 / 70 (+ 주문력의 12%)의 130 ~ 160% (레벨에 따라)", // EnhancedHealPerWave
            "p9": "18.75 / 31.25 / 43.75 (+ 주문력의 6.25%)", // MultiMissileTotal
            "p10": "150 / 250 / 350 (+ 주문력의 50%)", // TotalSingleTargetDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 110 / 100",
            "cost": "100",
            "stats": {
                "사거리": "1100",
                "스킬 폭": "200",
                "투사체 속도": "3000"
            }
        },
    },
    "Irelia": { // 이렐리아
        "P": {
            "p1": "6", // BuffDuration
            "p2": "4", // MaxStacks
            "p3": "10 ~ 25 (레벨에 따라)", // SingleStackAS
            "p4": "10 ~ 61 (레벨에 따라) (+ 추가 공격력의 20%)", // OnHitBonus
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "5 / 25 / 45 / 65 / 85 (+ 총 공격력의 70%)", // ChampionDamage
            "p2": "총 공격력의 9 / 10 / 11 / 12 / 13%", // HealAmount
            "p3": "5 / 25 / 45 / 65 / 85 (+ 50 ~ 237 (레벨에 따라) + 총 공격력의 70%)", // MinionDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "15",
            "stats": {
                "사거리": "600",
                "돌진 속도": "1400"
            }
        },
        "W": {
            "p1": "1.5", // MaxDuration
            "p2": "40 ~ 70 (레벨에 따라) (+ 주문력의 7%)", // FinalPhysicalDR
            "p3": "20 ~ 35 (레벨에 따라) (+ 주문력의 3.5%)", // FinalMagicDR
            "p4": "10 / 20 / 30 / 40 / 50 (+ 총 공격력의 40% + 주문력의 50%)", // MinDamageCalc
            "p5": "30 / 60 / 90 / 120 / 150 (+ 총 공격력의 120% + 주문력의 150%)", // MaxDamageCalc
            "p6": "0.75", // ChargeTimeForMax
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "825",
                "효과 범위": "300",
                "스킬 폭": "200",
                "시전시간": "0.25 (재사용)"
            }
        },
        "E": {
            "p1": "3.5", // BuffDuration
            "p2": "0.75", // StunDuration
            "p3": "70 / 110 / 150 / 190 / 230 (+ 주문력의 100%)", // TotalDamage
            "p4": "5", // MarkDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "16 / 14.5 / 13 / 11.5 / 10",
            "cost": "50",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/irelia/hud/icons2d/irelia_e2.png"],
            "stats": {
                "사거리": "850<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:12px; color:#fff; white-space:nowrap;'>검이 모이는 거리는 전역</div></span></span>",
                "스킬 폭": "140",
                "투사체 속도": "2000"
            }
        },
        "R": {
            "p1": "125 / 200 / 275 (+ 주문력의 70%)", // MissileDamage
            "p2": "5", // MarkDuration
            "p3": "2.5", // ZoneDuration
            "p4": "125 / 200 / 275 (+ 주문력의 70%)", // ZoneDamage
            "p5": "1.5", // CCDuration
            "p6": "90", // SlowAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "125 / 105 / 85",
            "cost": "100",
            "stats": {
                "사거리": "950",
                "스킬 폭": "320",
                "시전시간": "0.4",
                "투사체 속도": "2000"
            }
        },
    },
    "Evelynn": { // 이블린
        "P": {
            "p1": "4", // DemonShadeTimer
            "p2": "250 ~ 590 (레벨에 따라) (+ 주문력의 250%)", // HealingThresholdTOOLTIP
            "p3": "15 ~ 150 (레벨에 따라)", // HealPerSecondTOOLTIP
            "p4": "1.5", // StealthDropTimer
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "25 / 30 / 35 / 40 / 45 (+ 주문력의 25%)", // MissileDamage
            "p2": "15 / 25 / 35 / 45 / 55 (+ 주문력의 25%)", // TotalBonusDamage
            "p3": "3", // QStackCount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "4",
            "cost": "40 / 45 / 50 / 55 / 60",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/evelynn/hud/icons2d/evelynn_q2.png"],
            "stats": {
                "사거리": "800",
                "효과 범위": "550",
                "스킬 폭": "120",
                "시전시간": "0.25",
                "투사체 속도": "2400"
            }
        },
        "W": {
            "p1": "0.75", // SlowDuration
            "p2": "45", // SlowAmount*100
            "p3": "1.25 / 1.5 / 1.75 / 2 / 2.25", // CharmDuration
            "p4": "4", // ShredDuration
            "p5": "35 / 37.5 / 40 / 42.5 / 45", // MRShred*100
            "p6": "3 / 3.25 / 3.5 / 3.75 / 4", // MonsterCharm
            "p7": "250 / 300 / 350 / 400 / 450 (+ 주문력의 60%)", // MonsterDamageTotalTOOLTIP
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "1200 / 1300 / 1400 / 1500 / 1600",
                "스킬 폭": "200",
                "시전시간": "0.15",
                "투사체 속도": "2400"
            }
        },
        "E": {
            "p1": "60 / 90 / 120 / 150 / 180", // BaseDamage
            "p2": "3% (+ 주문력의 1.5%)", // PercentHealthBaseTOOLTIP
            "p3": "2", // SpeedDuration
            "p4": "30 / 35 / 40 / 45 / 50", // SpeedAmount*100
            "p5": "80 / 120 / 160 / 200 / 240", // EmpoweredDamage
            "p6": "4% (+ 주문력의 2.5%)", // PercentHealthEmpoweredTOOLTIP
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "8",
            "cost": "40 / 45 / 50 / 55 / 60",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/evelynn/hud/icons2d/evelynn_e2.png"],
            "stats": {
                "사거리": "210",
                "스킬 폭": "400",
                "시전시간": "0.25",
                "투사체 속도": "902"
            }
        },
        "R": {
            "p1": "125 / 250 / 375 (+ 주문력의 75%)", // Damage
            "p2": "300 / 600 / 900 (+ 주문력의 180%)", // CritDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": {
                "효과 범위": "500",
                "시전시간": "0.35"
            }
        },
    },
    "Ezreal": { // 이즈리얼
        "P": {
            "p1": "6", // StackDuration
            "p2": "10", // AttackSpeedPerStack.0*100
            "p3": "5", // MaxStacks
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "20 / 45 / 70 / 95 / 120 (+ 총 공격력의 130% + 주문력의 40%)", // Damage
            "p2": "1.5", // CDRefund
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "5.5 / 5.25 / 5 / 4.75 / 4.5",
            "cost": "28 / 31 / 34 / 37 / 40",
            "stats": {
                "사거리": "1150",
                "스킬 폭": "120",
                "시전시간": "0.25",
                "투사체 속도": "2000"
            }
        },
        "W": {
            "p1": "4", // DetonationTimeout
            "p2": "80 / 135 / 190 / 245 / 300 (+ 추가 공격력의 100% + 주문력의 90%)", // Damage
            "p3": "60", // ManaReturn
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "8",
            "cost": "50",
            "stats": {
                "사거리": "1150",
                "스킬 폭": "120",
                "시전시간": "0.25",
                "투사체 속도": "1200"
            }
        },
        "E": {
            "p1": "80 / 130 / 180 / 230 / 280 (+ 추가 공격력의 60% + 주문력의 75%)", // Damage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "26 / 23 / 20 / 17 / 14",
            "cost": "70",
            "stats": {
                "사거리": "475",
                "효과 범위": "750",
                "시전시간": "0.25",
                "투사체 속도": "2000"
            }
        },
        "R": {
            "p1": "350 / 550 / 750 (+ 추가 공격력의 100% + 주문력의 110%)", // Damage
            "p2": "150 / 225 / 300 (+ 추가 공격력의 100% + 주문력의 110%)", // DamageMinionMonster
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 105 / 90",
            "cost": "100",
            "stats": {
                "사거리": "전역",
                "스킬 폭": "320",
                "시전시간": "1",
                "투사체 속도": "2000"
            }
        },
    },
    "Illaoi": { // 일라오이
        "P": {
            "p1": "18 ~ 7 (레벨에 따라)", // SpawnCD
            "p2": "9 ~ 180 (레벨에 따라) (+ 총 공격력의 110% + 주문력의 40%)", // spell.IllaoiQ:TentacleDamageTotal
            "p3": "5", // MissingHPPercentHeal*100
            "cooldown": "18 ~ 7 (레벨에 따라)", // SpawnCD
            "cost": "-",
            "stats": {
                "효과 범위": "1000"
            }
        },
        "Q": {
            "p1": "10 / 15 / 20 / 25 / 30", // spell.IllaoiQ:TentacleDamageAmp*100
            "p2": "9 ~ 180 (레벨에 따라) (+ 총 공격력의 110% + 주문력의 40%)", // spell.IllaoiQ:TentacleDamageTotal
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "850",
                "스킬 폭": "200",
                "시전시간": "0.75"
            }
        },
        "W": {
            "p1": "3 / 3.5 / 4 / 4.5 / 5% (+ 총 공격력의 3.5%)", // HealthPercentTotal
            "p2": "20 / 30 / 40 / 50 / 60", // WMinDamage
            "p3": "300", // MonsterDamageCap
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "4",
            "cost": "30",
            "stats": {
                "돌진 속도": "600"
            }
        },
        "E": {
            "p1": "7", // SpiritDuration
            "p2": "25 / 30 / 35 / 40 / 45% (+ 총 공격력의 8%)", // EchoPercent
            "p3": "4", // VesselDuration
            "p4": "1.5", // SlowDuration
            "p5": "80", // SlowAmount*100
            "p6": "4 ~ 3 (레벨에 따라)", // TimeBetweenVesselTentacleSlams
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "35 / 40 / 45 / 50 / 55",
            "stats": {
                "사거리": "900",
                "스킬 폭": "100",
                "시전시간": "0.25",
                "투사체 속도": "1900"
            }
        },
        "R": {
            "p1": "150 / 250 / 350 (+ 추가 공격력의 50%)", // DamageCalc
            "p2": "8", // Duration
            "p3": "2", // spell.IllaoiW:CooldownDuringR
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 95 / 70",
            "cost": "100",
            "stats": {
                "사거리": "450",
                "효과 범위": "500",
                "시전시간": "0.5"
            }
        },
    },
    "JarvanIV": { // 자르반 4세
        "P": {
            "p1": "8", // TooltipCurrentHealthDamage*100
            "p2": "6 ~ 3 (레벨에 따라)", // TooltipCooldown
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "90 / 130 / 170 / 210 / 250 (+ 추가 공격력의 145%)", // TotalDamage
            "p2": "3", // Effect3Amount
            "p3": "10 / 14 / 18 / 22 / 26", // BaseARShred*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "45 / 50 / 55 / 60 / 65",
            "stats": {
                "사거리": "770",
                "스킬 폭": "140",
                "시전시간": "0.4"
            }
        },
        "W": {
            "p1": "2", // Effect5Amount
            "p2": "15 / 20 / 25 / 30 / 35", // BaseSlowAmount*100
            "p3": "60 / 80 / 100 / 120 / 140 (+ 추가 공격력의 70%)", // TotalShield
            "p4": "최대 체력의 1.3%", // BonusShield
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "9",
            "cost": "30",
            "stats": {
                "사거리": "625",
                "효과 범위": "600"
            }
        },
        "E": {
            "p1": "20 / 22.5 / 25 / 27.5 / 30", // PermanentAttackSpeed*100
            "p2": "80 / 120 / 160 / 200 / 240 (+ 주문력의 80%)", // TotalDamage
            "p3": "8", // Effect4Amount
            "p4": "20 / 22.5 / 25 / 27.5 / 30", // BaseAuraAS*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "55",
            "stats": {
                "사거리": "860",
                "효과 범위": "200",
                "투사체 속도": "1450",
                "돌진 속도": "1400"
            }
        },
        "R": {
            "p1": "200 / 325 / 450 (+ 추가 공격력의 180%)", // DamageCalc
            "p2": "3.5", // WallDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 105 / 90",
            "cost": "100",
            "stats": {
                "사거리": "650",
                "효과 범위": "350"
            }
        },
    },
    "Xayah": { // 자야
        "P": {
            "p1": "3", // f14
            "p2": "35 ~ 55 (레벨에 따라)", // f16*100
            "p3": "6", // f12
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "효과 범위": "1000",
                "스킬 폭": "120",
                "투사체 속도": "4000"
            }
        },
        "Q": {
            "p1": "45 / 60 / 75 / 90 / 105 (+ 추가 공격력의 50%)", // TotalDamage
            "p2": "22.5 / 30 / 37.5 / 45 / 52.5 (+ 추가 공격력의 25%)", // MultiHitDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "35",
            "stats": {
                "사거리": "1100",
                "스킬 폭": "100",
                "시전시간": "0.25 ~ 0.1<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:12px; color:#fff; white-space:nowrap;'>추가 공격 속도 100%당 0.07초 감소, 최대 60%</div></span></span>",
                "투사체 속도": "700"
            }
        },
        "W": {
            "p1": "4", // WAttackSpeedDuration
            "p2": "35 / 40 / 45 / 50 / 55", // WAttackSpeedAmount
            "p3": "25", // BonusDamagePercent
            "p4": "1.5", // WMoveSpeedDuration
            "p5": "30", // WMoveSpeedAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "18 / 17 / 16 / 15 / 14",
            "cost": "60 / 55 / 50 / 45 / 40",
            "stats": {
                "시전시간": "0.25",
                "투사체 속도": "3000"
            }
        },
        "E": {
            "p1": "50 / 65 / 80 / 95 / 110 (+ 추가 공격력의 40%)", // FeatherDamage
            "p2": "3", // FeatherThreshold
            "p3": "1.25", // RootDuration
            "p4": "50", // CritRatio*100
            "p5": "50", // MinionMultiplier*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "20",
            "stats": {
                "사거리": "2000",
                "효과 범위": "전역 (깃털 회수)",
                "스킬 폭": "160",
                "투사체 속도": "4000"
            }
        },
        "R": {
            "p1": "200 / 300 / 400 (+ 추가 공격력의 100%)", // Damage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "140 / 120 / 100",
            "cost": "100",
            "stats": {
                "사거리": "450",
                "효과 범위": "1060",
                "투사체 속도": "2200"
            }
        },
    },
    "Zyra": { // 자이라
        "P": {
            "p1": "13.6 ~ 9.05 (레벨에 따라)", // SeedCooldown
            "p2": "15 ~ 75 (레벨에 따라) (+ 주문력의 20%)", // PlantDamage
            "cooldown": "13.6 ~ 9.05 (레벨에 따라)", // SeedCooldown
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/zyra/hud/icons2d/zyrapq.png"],
            "cost": "-",
            "stats": {
                "효과 범위": "900"
            }
        },
        "Q": {
            "p1": "60 / 100 / 140 / 180 / 220 (+ 주문력의 65%)", // InitialDamage
            "p2": "15 ~ 75 (레벨에 따라) (+ 주문력의 20%)", // spell.ZyraP:PlantDamage
            "p3": "8", // spell.ZyraP:PlantDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "7 / 6.5 / 6 / 5.5 / 5",
            "cost": "55",
            "stats": {
                "사거리": "800",
                "스킬 폭": "170",
                "시전시간": "0.25",
                "투사체 속도": "1400"
            }
        },
        "W": {
            "p1": "60", // SeedDuration
            "p2": "2", // VisionGranted
            "p3": "18 / 16 / 14 / 12 / 10", // AmmoRechargeTime
            "p4": "35", // KillAmmoRefundMinion*100
            "p5": "100", // KillAmmoRefundChamp*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "없음",
            "cost": "씨앗 1개",
            "stats": {
                "사거리": "850",
                "시전시간": "0.243",
                "투사체 속도": "2200"
            }
        },
        "E": {
            "p1": "1 / 1.25 / 1.5 / 1.75 / 2", // RootDuration
            "p2": "60 / 95 / 130 / 165 / 200 (+ 주문력의 60%)", // TotalDamage
            "p3": "15 ~ 75 (레벨에 따라) (+ 주문력의 20%)", // spell.ZyraP:PlantDamage
            "p4": "8", // spell.ZyraP:PlantDuration
            "p5": "2", // SlowDurationPlantAttack
            "p6": "30", // SlowAmountPlantAttack
            "p7": "2", // MaxSlowStacks
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "11",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "1100",
                "스킬 폭": "140",
                "시전시간": "0.25",
                "투사체 속도": "1150"
            }
        },
        "R": {
            "p1": "200 / 300 / 400 (+ 주문력의 70%)", // TotalDamage
            "p2": "1", // KnockupDuration
            "p3": "50", // EnragedBonusHealthPercent*100
            "p4": "50", // PlantDamageBonus
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "110 / 100 / 90",
            "cost": "100",
            "stats": {
                "사거리": "700",
                "효과 범위": "560",
                "시전시간": "0.25"
            }
        },
    },
    "Zac": { // 자크
        "P": {
            "p1": "4 ~ 8% (레벨에 따라)", // HealPercent
            "p2": "8 ~ 4 (레벨에 따라)", // ReviveBlobletDuration
            "p3": "300", // ReviveCooldown
            "cooldown": "300", // Cooldown
            "cost": "-",
            "stats": {
                "사거리": "700"
            }
        },
        "Q": {
            "p1": "60 / 90 / 120 / 150 / 180 (+ 주문력의 30% + 추가 최대 체력의 3%)", // TotalDamage
            "p2": "40", // SlowAmount*-100
            "p3": "(60 / 90 / 120 / 150 / 180 (+ 주문력의 30% + 추가 최대 체력의 3%))의 200%", // MaxDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14 / 12.5 / 11 / 9.5 / 8",
            "cost": "현재 체력의 8% 소모",
            "stats": {
                "사거리": "800",
                "스킬 폭": "240",
                "시전시간": "0.33",
                "투사체 속도": "2800"
            }
        },
        "W": {
            "p1": "40 / 50 / 60 / 70 / 80", // BaseDamage
            "p2": "4 / 5 / 6 / 7 / 8% (+ 주문력의 3%)", // DisplayPercentDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "5",
            "cost": "현재 체력의 4% 소모",
            "stats": {
                "사거리": "350"
            }
        },
        "E": {
            "p1": "0.9 / 1 / 1.1 / 1.2 / 1.3", // ChannelTime
            "p2": "1", // MaxStun
            "p3": "60 / 105 / 150 / 195 / 240 (+ 주문력의 80%)", // Damage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "21 / 18 / 15 / 12 / 9",
            "cost": "현재 체력의 4% 소모",
            "stats": {
                "사거리": "1200 ~ 1800 (충전 시간에 따라)",
                "효과 범위": "265",
                "투사체 속도": "1500"
            }
        },
        "R": {
            "p1": "4", // Bounces
            "p2": "120 / 190 / 260 (+ 주문력의 40%)", // DamagePerBounce
            "p3": "60 / 95 / 130 (+ 주문력의 20%)", // DamagePerSubsequentBounce
            "p4": "1", // SlowDuration
            "p5": "20", // SlowAmount*100
            "p6": "50", // EndingMS*100
            "p7": "주문력의 40% (+ 120 / 190 / 260 + (120 / 190 / 260 + 주문력의 40%)의 150%)", // MaxDamageTooltip
            "p8": "20", // BeginningMS*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 105 / 90",
            "cost": "-",
            "stats": {
                "효과 범위": "300",
                "시전시간": "0.3",
                "투사체 속도": "1800"
            }
        },
    },
    "Zaahen": { // 자헨
        "P": {
            "p1": "12", // MaxStacks
            "p2": "1.5 ~ 2.8% (레벨에 따라)", // PercentBonusADCalc
            "p3": "4", // ReviveDuration
            "p4": "30 ~ 75% (레벨에 따라)", // RevivePercentCalc
            "p5": "300 ~ 120 (레벨에 따라)", // ReviveCooldownCalc
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "15 / 30 / 45 / 60 / 75 (+ 추가 공격력의 20 / 25 / 30 / 35 / 40%)", // InitialDamage
            "p2": "5 / 6 / 7 / 8 / 9", // HealPercent*100
            "p3": "25 / 50 / 75 / 100 / 125 (+ 추가 공격력의 20 / 25 / 30 / 35 / 40%)", // SecondHitDamage
            "p4": "0.75", // KnockUpDuration
            "p5": "50", // MinionHealPercent*100
            "p6": "100", // MonsterDamagePercent*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "25",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/zaahen/hud/icons2d/zaahenq2.png"]
        },
        "W": {
            "p1": "40 / 60 / 80 / 100 / 120 (+ 추가 공격력의 50%)", // InitialDamage
            "p2": "30 / 50 / 70 / 90 / 110 (+ 추가 공격력의 30%)", // SecondaryDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14 / 13.5 / 13 / 12.5 / 12",
            "cost": "50",
            "stats": {
                "사거리": "850",
                "스킬 폭": "140",
                "시전시간": "0.5",
                "투사체 속도": "1600"
            }
        },
        "E": {
            "p1": "40 / 60 / 80 / 100 / 120 (+ 추가 공격력의 50%)", // BaseDamageCalc
            "p2": "60 / 90 / 120 / 150 / 180 (+ 추가 공격력의 75%)", // BonusDamageCalc
            "p3": "4 / 4.5 / 5 / 5.5 / 6", // PercentHPDamage*100
            "p4": "50", // MonsterDamageBonus
            "p5": "400", // MonsterDamageCap
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "40",
            "stats": {
                "사거리": "350",
                "효과 범위": "375",
                "스킬 폭": "30",
                "돌진 속도": "900"
            }
        },
        "R": {
            "p1": "10 / 20 / 30", // ArmorPen*100
            "p2": "50", // DamageReduction*100
            "p3": "250 / 400 / 550 (+ 추가 공격력의 200%)", // DamageEndCalc
            "p4": "33", // HealPercent*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "110 / 95 / 80",
            "cost": "100",
            "stats": {
                "사거리": "600",
                "효과 범위": "550",
                "시전시간": "0.5",
                "투사체 속도": "8700",
                "돌진 속도": "2800"
            }
        },
    },
    "Janna": { // 잔나
        "P": {
            "p1": "6", // MSPercentAlly*100
            "p2": "추가 이동 속도의 30%", // BonusDamage
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "효과 범위": "1200"
            }
        },
        "Q": {
            "p1": "3", // MaxDuration
            "p2": "55 / 90 / 125 / 160 / 195 (+ 주문력의 50%)", // MinimumDamage
            "p3": "55 / 90 / 125 / 160 / 195 (+ 주문력의 50% + 3 x (10 / 15 / 20 / 25 / 30 + 주문력의 10%))", // MaxDamage
            "p4": "0.5", // BaseKnockup
            "p5": "0.5 (+ 0.75)", // MaxKnockup
            "p6": "10 / 15 / 20 / 25 / 30 (+ 주문력의 10%)", // ExtraDamagePerSecondCharged
            "p7": "0.25", // ChargeKnockup
            "p8": "20", // ChargeDistancePercent
            "p9": "1.25", // MissileTravelTime
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14",
            "cost": "90 / 95 / 100 / 105 / 110",
            "stats": {
                "사거리": "1075",
                "스킬 폭": "240",
                "투사체 속도": "880 ~ 1408"
            }
        },
        "W": {
            "p1": "6 / 7 / 8 / 9 / 10% (+ 주문력의 2%)", // TotalMS
            "p2": "2", // SlowDuration
            "p3": "20 / 24 / 28 / 32 / 36% (+ 주문력의 6%)", // TotalSlow
            "p4": "55 / 85 / 115 / 145 / 175 (+ 주문력의 50%)", // TotalDamage
            "p5": "추가 이동 속도의 30%", // spell.TailwindSelf:BonusDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "550",
                "스킬 폭": "120",
                "시전시간": "0.245",
                "투사체 속도": "1600"
            }
        },
        "E": {
            "p1": "4", // ShieldDuration
            "p2": "80 / 120 / 160 / 200 / 240 (+ 주문력의 55%)", // TotalShield
            "p3": "10 / 15 / 20 / 25 / 30 (+ 주문력의 10%)", // TotalAD
            "p4": "20", // ECDRefundforCC*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "800"
            }
        },
        "R": {
            "p1": "3", // Duration
            "p2": "300 / 450 / 600 (+ 주문력의 150%)", // TotalHeal
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "130 / 115 / 100",
            "cost": "100",
            "stats": {
                "사거리": "725",
                "효과 범위": "700"
            }
        },
    },
    "Jax": { // 잭스
        "P": {
            "p1": "5 ~ 12.5% (레벨에 따라)", // AttackSpeedPerStack
            "p2": "40 ~ 100% (레벨에 따라)", // MaxBonusAttackSpeed
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "65 / 105 / 145 / 185 / 225 (+ 추가 공격력의 100%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "50",
            "stats": {
                "사거리": "700"
            }
        },
        "W": {
            "p1": "50 / 85 / 120 / 155 / 190 (+ 주문력의 60%)", // TotalDamage
            "p2": "50", // StructureMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "7 / 6 / 5 / 4 / 3",
            "cost": "30"
        },
        "E": {
            "p1": "2", // DodgeDuration
            "p2": "25", // AoEDamageReduction
            "p3": "40 / 70 / 100 / 130 / 160 (+ 주문력의 70%)", // TotalDamage
            "p4": "4", // PercentHealthDamage
            "p5": "1", // StunDuration
            "p6": "20", // PercentIncreasedPerDodge*100
            "p7": "80 / 140 / 200 / 260 / 320 (+ 주문력의 140%)", // MaxDamage
            "p8": "8", // MaxPercentHealthDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "17 / 15 / 13 / 11 / 9",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "효과 범위": "375"
            }
        },
        "R": {
            "p1": "2.5", // PassiveFallOffTime
            "p2": "75 / 130 / 185 (+ 주문력의 60%)", // OnHitDamage
            "p3": "100 / 175 / 250 (+ 주문력의 100%)", // SwingDamageTotal
            "p4": "45 / 60 / 75 (+ 추가 공격력의 40%)", // BaseArmor
            "p5": "27 / 36 / 45 (+ 추가 공격력의 24%)", // BaseMR
            "p6": "8", // Duration
            "p7": "20 / 25 / 30 (+ 추가 공격력의 10%)", // BonusArmor
            "p8": "12 / 15 / 18 (+ 추가 공격력의 6%)", // BonusMR
            "p9": "50", // StructureMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "110 / 100 / 90",
            "cost": "100",
            "stats": {
                "사거리": "260",
                "효과 범위": "375",
                "시전시간": "0.25"
            }
        },
    },
    "Zed": { // 제드
        "P": {
            "p1": "50", // CurrentHealthThreshold*100
            "p2": "5 ~ 10% (레벨에 따라)", // MaxHPDamage
            "p3": "10", // PerUnitCD
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "80 / 120 / 160 / 200 / 240 (+ 추가 공격력의 100%)", // TotalDamage
            "p2": "48 / 72 / 96 / 120 / 144 (+ 추가 공격력의 60%)", // PassThroughDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "6",
            "cost": "75 / 70 / 65 / 60 / 55",
            "stats": {
                "사거리": "900",
                "스킬 폭": "90",
                "시전시간": "0.25",
                "투사체 속도": "1700"
            }
        },
        "W": {
            "p1": "30 / 35 / 40 / 45 / 50", // EnergyRestoreDoubleHit
            "p2": "5", // ShadowDurationTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "20 / 19 / 18 / 17 / 16",
            "cost": "40 / 35 / 30 / 25 / 20",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/zed/hud/icons2d/zedw2.png"],
            "stats": {
                "사거리": "650",
                "효과 범위": "2000",
                "스킬 폭": "80",
                "투사체 속도": "1600"
            }
        },
        "E": {
            "p1": "70 / 92.5 / 115 / 137.5 / 160 (+ 추가 공격력의 70%)", // TotalDamage
            "p2": "3", // ShadowHitCDR
            "p3": "1.5", // SlowDuration
            "p4": "20 / 25 / 30 / 35 / 40", // MoveSpeedMod*-100
            "p5": "30 / 37.5 / 45 / 52.5 / 60", // MoveSpeedModBonus*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "5 / 4.5 / 4 / 3.5 / 3",
            "cost": "40",
            "stats": {
                "사거리": "290",
                "효과 범위": "315"
            }
        },
        "R": {
            "p1": "3", // RDeathMarkDuration
            "p2": "총 공격력의 100%", // RCalculatedDamage
            "p3": "25 / 40 / 55", // RDamageAmp*100
            "p4": "7.5", // RShadowDurationDisplayed
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 110 / 100",
            "cost": "-",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/zed/hud/icons2d/zedr2.png"],
            "stats": {
                "사거리": "625 (재사용은 전역)"
            }
        },
    },
    "Xerath": { // 제라스
        "P": {
            "p1": "60 ~ 390 (레벨에 따라)", // ChampionManaRestoreTT
            "p2": "30 ~ 195 (레벨에 따라)", // MinionManaRestoreTT
            "p3": "3.5", // CooldownKillRefund
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "75 / 115 / 155 / 195 / 235 (+ 주문력의 90%)", // TooltipTotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "80 / 90 / 100 / 110 / 120",
            "stats": {
                "사거리": "750",
                "스킬 폭": "200"
            }
        },
        "W": {
            "p1": "50 / 85 / 120 / 155 / 190 (+ 주문력의 65%)", // TotalDamage
            "p2": "2.5", // SlowDuration
            "p3": "25", // SlowAmount*100
            "p4": "83.35 / 141.695 / 200.04 / 258.385 / 316.73 (+ 주문력의 108.355%)", // SweetSpotTotalDamage
            "p5": "60 / 65 / 70 / 75 / 80", // SweetSpotSlowAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "80 / 90 / 100 / 110 / 120",
            "stats": {
                "사거리": "1000",
                "효과 범위": "275",
                "시전시간": "0.25"
            }
        },
        "E": {
            "p1": "2.25", // MaxStunDuration
            "p2": "70 / 100 / 130 / 160 / 190 (+ 주문력의 45%)", // TooltipTotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "13 / 12.5 / 12 / 11.5 / 11",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "1050",
                "스킬 폭": "140",
                "시전시간": "0.25",
                "투사체 속도": "1600"
            }
        },
        "R": {
            "p1": "10", // Duration
            "p2": "4 / 5 / 6", // NumberOfShots
            "p3": "170 / 220 / 270 (+ 주문력의 45%)", // TooltipTotalDamage
            "p4": "20 / 25 / 30 (+ 주문력의 5%)", // RampDamageCalc
            "p5": "50", // FailCastRefund*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "130 / 115 / 100",
            "cost": "100",
            "stats": {
                "사거리": "5000",
                "효과 범위": "200"
            }
        },
    },
    "Zeri": { // 제리
        "P": {
            "p1": "10 ~ 25 (레벨에 따라) (+ 주문력의 3%)", // Spell.ZeriQ:MinDamage
            "p2": "70 ~ 160 (레벨에 따라) (+ 주문력의 20%)", // Spell.ZeriQ:PassiveExecuteThreshold
            "p3": "75 ~ 160 (레벨에 따라) (+ 주문력의 110%)", // Spell.ZeriQ:PassiveMaxDamage
            "p4": "1 ~ 11% (레벨에 따라)", // Spell.ZeriQ:PassiveMaxChargePercentHealth
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "7", // NumberOfMissiles
            "p2": "22 / 26 / 30 / 34 / 38 (+ 총 공격력의 102 / 104 / 106 / 108 / 110%)", // ActiveDamageThatCanCrit
            "p3": "1.5", // AttackSpeedCap
            "p4": "60", // ExcessAttackSpeedToADMult*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "1.52<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:12px; color:#fff; white-space:nowrap;'>1레벨 기준, 공격 속도에 따라 감소</div></span></span>",
            "cost": "-",
            "stats": {
                "사거리": "700",
                "스킬 폭": "30",
                "투사체 속도": "2600"
            }
        },
        "W": {
            "p1": "30 / 70 / 110 / 150 / 190 (+ 총 공격력의 120% + 주문력의 50%)", // TotalDamage
            "p2": "2", // SlowDuration
            "p3": "30 / 35 / 40 / 45 / 50", // SlowPercent*100
            "p4": "30 / 70 / 110 / 150 / 190 (+ 총 공격력의 120% + 주문력의 50%)의 150%<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:11px; color:#fff; margin-bottom:5px; white-space:nowrap;'>무한의 대검 보유 시</div><div style='font-size:12px; color:#ff9900; font-weight:bold;'>165%</div><div style='font-size:10px; color:#9aa4af; margin-top:5px; white-space:nowrap;'>치명타 피해량 200% → 230%</div></span></span>", // WallDamage
            "p5": "50", // CriticalEffectiveness*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "1150",
                "스킬 폭": "80",
                "시전시간": "0.55",
                "투사체 속도": "3300"
            }
        },
        "E": {
            "p1": "5", // BuffDuration
            "p2": "80 / 85 / 90 / 95 / 100", // PenDamagePercent*100
            "p3": "22 / 24 / 26 / 28 / 30 (+ 주문력의 20%)", // BonusDamageTotal
            "p4": "0.5", // CDReductionPerHit
            "p5": "1.5", // CritCDReductionPerHit
            "p6": "100", // CritScalingMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "24 / 22.5 / 21 / 19.5 / 18",
            "cost": "90 / 85 / 80 / 75 / 70",
            "stats": {
                "사거리": "300",
                "스킬 폭": "100"
            }
        },
        "R": {
            "p1": "150 / 250 / 350 (+ 주문력의 110% + 추가 공격력의 60%)", // TotalActiveDamage
            "p2": "5", // RDuration
            "p3": "30", // BaseASPercent*100
            "p4": "15", // BaseBonusMS*100
            "p5": "2.5", // MaxHyperchargeDuration
            "p6": "1.5", // MSPercent*100
            "p7": "총 공격력의 40%", // ChainPhysicalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "80 / 75 / 70",
            "cost": "100",
            "stats": {
                "사거리": "800",
                "효과 범위": "825",
                "시전시간": "0.25"
            }
        },
    },
    "Jayce": { // 제이스
        "P": {
            "p1": "0.75", // MovementSpeedDuration
            "p2": "30", // FlatMovementSpeed
            "cooldown": "-",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/jayce/hud/icons2d/jaycep_ranged.png"],
            "cost": "-"
        },
        "Q": {
            "p1": "60 / 110 / 160 / 210 / 260 / 310 (+ 추가 공격력의 135%)", // spell.JayceToTheSkies:Damage
            "p2": "2", // spell.JayceToTheSkies:SlowDuration
            "p3": "35 / 40 / 45 / 50 / 55 / 60", // spell.JayceToTheSkies:Slow*-100
            "p4": "10", // MonsterBonusDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "16 / 14 / 12 / 10 / 8 / 6",
            "cost": "40",
            "form1": "망치 형태",
            "stats": {
                "사거리": "600",
                "효과 범위": "300"
            }
        },
        "W": {
            "p1": "15 / 17 / 19 / 21 / 23 / 25", // spell.JayceStaticField:ManaGain
            "p2": "4", // spell.JayceStaticField:Duration
            "p3": "140 / 200 / 260 / 320 / 380 / 440 (+ 주문력의 100%)", // spell.JayceStaticField:Damage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10",
            "cost": "40",
            "form1": "망치 형태",
            "stats": {
                "사거리": "285",
                "효과 범위": "350"
            }
        },
        "E": {
            "p1": "추가 공격력의 100%", // spell.JayceThunderingBlow:FlatDamage
            "p2": "8 / 10.8 / 13.6 / 16.4 / 19.2 / 22", // spell.JayceThunderingBlow:PercHPDamage*100
            "p3": "200 / 300 / 400 / 500 / 600 / 700", // MonsterCap
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "20 / 18 / 16 / 14 / 12 / 10",
            "cost": "55",
            "form1": "망치 형태",
            "stats": {
                "사거리": "240",
                "스킬 폭": "160",
                "시전시간": "0.25"
            }
        },
        "R": {
            "p1": "5", // spell.JayceStanceHtG:ShredDuration
            "p2": "20 ~ 35% (레벨에 따라)", // spell.JayceStanceHtG:RangedFormShred
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "6",
            "cost": "-",
            "form1": "망치 형태"
        },
        "Q2": {
            "p1": "80 / 121 / 162 / 203 / 244 / 285 (+ 추가 공격력의 130%)", // spell.JayceShockBlast:Damage
            "p2": "112 / 169.4 / 226.8 / 284.2 / 341.6 / 399 (+ 추가 공격력의 182%)", // spell.JayceShockBlast:EmpoweredDamage
            "p3": "10", // MonsterBonusDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "8",
            "cost": "55 / 60 / 65 / 70 / 75 / 80",
            "name": "전격 폭발",
            "form": "대포 형태",
            "icon": "https://raw.communitydragon.org/latest/game/assets/characters/jayce/hud/icons2d/jayceq_ranged.png"
        },
        "W2": {
            "p1": "3", // spell.JayceHyperCharge:NumAttacks
            "p2": "총 공격력의 70 / 78 / 86 / 94 / 102 / 110%", // spell.JayceHyperCharge:ActualDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14.6 / 13 / 11.4 / 9.8 / 8.2 / 6.6",
            "cost": "40",
            "name": "초전하",
            "form": "대포 형태",
            "icon": "https://raw.communitydragon.org/latest/game/assets/characters/jayce/hud/icons2d/jaycew_ranged.png"
        },
        "E2": {
            "p1": "4", // spell.JayceAccelerationGate:Duration
            "p2": "35 / 40 / 45 / 50 / 55 / 60", // spell.JayceAccelerationGate:MovementSpeed*100
            "p3": "3", // spell.JayceAccelerationGate:HasteDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "16",
            "cost": "50",
            "name": "가속 관문",
            "form": "대포 형태",
            "icon": "https://raw.communitydragon.org/latest/game/assets/characters/jayce/hud/icons2d/jaycee_ranged.png"
        },
        "R2": {
            "p1": "5 ~ 26 (레벨에 따라) (+ 추가 공격력의 7.5%)", // spell.JayceStanceHtG:Resists
            "p2": "25 ~ 130 (레벨에 따라) (+ 추가 공격력의 30%)", // spell.JayceStanceHtG:Damage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "6",
            "cost": "-",
            "name": "머큐리 해머",
            "form": "대포 형태",
            "icon": "https://raw.communitydragon.org/latest/game/assets/characters/jayce/hud/icons2d/jaycer_melee.png"
        },
    },
    "Zoe": { // 조이
        "P": {
            "p1": "16 ~ 130 (레벨에 따라) (+ 주문력의 20%)", // PassiveDamage
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "50 / 80 / 110 / 140 / 170 (+ 2 ~ 50 (레벨에 따라) + 주문력의 60%)", // TotalDamageTooltip
            "p2": "125 / 200 / 275 / 350 / 425 (+ 5 ~ 125 (레벨에 따라) + 주문력의 150%)", // MaxDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "8.5 / 8 / 7.5 / 7 / 6.5",
            "cost": "40 / 45 / 50 / 55 / 60",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/zoe/hud/icons2d/zoe_q2.png"],
            "stats": {
                "사거리": "800",
                "효과 범위": "180",
                "스킬 폭": "140",
                "시전시간": "0.25",
                "투사체 속도": "1200"
            }
        },
        "W": {
            "p1": "2 / 2.25 / 2.5 / 2.75 / 3", // MSDuration
            "p2": "30 / 40 / 50 / 60 / 70", // MovementSpeed*100
            "p3": "15 / 25 / 35 / 45 / 55 (+ 주문력의 10%)", // MissileDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "0.25",
            "cost": "-",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/zoe/hud/icons2d/zoe_w2.png"],
            "stats": {
                "효과 범위": "전역<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:12px; color:#fff; white-space:nowrap;'>파편 떨어뜨리기</div></span></span>",
                "스킬 폭": "240",
                "투사체 속도": "2000"
            }
        },
        "E": {
            "p1": "70 / 110 / 150 / 190 / 230 (+ 주문력의 45%)", // TotalDamageTooltip
            "p2": "16 / 19.5 / 23 / 26.5 / 30", // CooldownRefresh*100
            "p3": "30", // PercentPen*100
            "p4": "70 / 110 / 150 / 190 / 230 (+ 주문력의 45%)", // BreakDamageTooltip
            "p5": "10 / 15 / 20 / 25 / 30", // DrowsySlow*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "18 / 17 / 16 / 15 / 14",
            "cost": "80",
            "stats": {
                "사거리": "800",
                "효과 범위": "250",
                "스킬 폭": "80",
                "시전시간": "0.3",
                "투사체 속도": "1700"
            }
        },
        "R": {
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "11 / 8 / 5",
            "cost": "40",
            "stats": {
                "사거리": "575",
                "시전시간": "0.25"
            }
        },
    },
    "Ziggs": { // 직스
        "P": {
            "p1": "12", // Cooldown
            "p2": "20 ~ 160 (레벨에 따라) (+ 주문력의 50%)", // TotalDamage
            "p3": "35 ~ 280 (레벨에 따라) (+ 주문력의 87.5%)", // StructureDamage
            "p4": "4 ~ 6 (레벨에 따라)", // SpellCDR
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "투사체 속도": "1500"
            }
        },
        "Q": {
            "p1": "80 / 130 / 180 / 230 / 280 (+ 주문력의 60 / 65 / 70 / 75 / 80%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "6 / 5.5 / 5 / 4.5 / 4",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "850",
                "효과 범위": "240",
                "시전시간": "0.25",
                "투사체 속도": "1750"
            }
        },
        "W": {
            "p1": "4", // BombDuration
            "p2": "70 / 105 / 140 / 175 / 210 (+ 주문력의 50%)", // TotalDamage
            "p3": "25 / 27.5 / 30 / 32.5 / 35", // TurretDestroyPercent*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "80",
            "stats": {
                "사거리": "1000",
                "효과 범위": "325",
                "시전시간": "0.25",
                "투사체 속도": "1750"
            }
        },
        "E": {
            "p1": "30 / 70 / 110 / 150 / 190 (+ 주문력의 25 / 30 / 35 / 40 / 45%)", // TotalDamage
            "p2": "1.5", // SlowDuration
            "p3": "10 / 20 / 30 / 40 / 50", // Slow*-100
            "p4": "10", // MineDuration
            "p5": "12 / 28 / 44 / 60 / 76 (+ 주문력의 10 / 12 / 14 / 16 / 18%)", // ReducedDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "16",
            "cost": "70 / 80 / 90 / 100 / 110",
            "stats": {
                "사거리": "900",
                "효과 범위": "335",
                "시전시간": "0.25",
                "투사체 속도": "1750"
            }
        },
        "R": {
            "p1": "300 / 500 / 700 (+ 주문력의 100%)", // EmpoweredDamage
            "p2": "195 / 325 / 455 (+ 주문력의 65%)", // BlastDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 95 / 70",
            "cost": "100",
            "stats": {
                "사거리": "5000",
                "효과 범위": "525",
                "시전시간": "0.375",
                "투사체 속도": "1750"
            }
        },
    },
    "Jhin": { // 진
        "P": {
            "p1": "4", // MaxAmmo
            "p2": "15 ~ 25% (레벨에 따라)", // FourthShotExecutePercent
            "p3": "4 ~ 44% (레벨에 따라) (+ 치명타 확률의 35% + 추가 공격 속도의 30%)", // TotalADPercent
            "p4": "25", // CritReductionPercent*100
            "p5": "2", // HasteDuration
            "p6": "14% (+ 추가 공격 속도의 44%)", // CritMoveSpeedPercent
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "44 / 69 / 94 / 119 / 144 (+ 총 공격력의 44 / 51.5 / 59 / 66.5 / 74% + 주문력의 60%)", // TotalDamage
            "p2": "4", // TooltipMaxTargetsHit
            "p3": "35", // PercentAmpOnKill*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "7 / 6.5 / 6 / 5.5 / 5",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "550",
                "효과 범위": "450",
                "스킬 폭": "160",
                "시전시간": "0.25",
                "투사체 속도": "1800"
            }
        },
        "W": {
            "p1": "70 / 105 / 140 / 175 / 210 (+ 총 공격력의 50%)", // TotalDamage
            "p2": "4", // SpottingDuration
            "p3": "1.25 / 1.5 / 1.75 / 2 / 2.25", // RootDuration
            "p4": "75", // MinionMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "3000",
                "스킬 폭": "80",
                "시전시간": "0.75",
                "투사체 속도": "10000"
            }
        },
        "E": {
            "p1": "3", // TrapDuration
            "p2": "35", // TrapSlowAmount*100
            "p3": "2", // TrapDetonationTime
            "p4": "20 / 80 / 140 / 200 / 260 (+ 총 공격력의 120% + 주문력의 100%)", // TotalDamage
            "p5": "24 / 21.5 / 19 / 16.5 / 14", // AmmoRechargeRateTooltip
            "p6": "65", // ReducedDamagePercent*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "2",
            "cost": "30",
            "stats": {
                "사거리": "750",
                "효과 범위": "260",
                "스킬 폭": "240",
                "시전시간": "0.25",
                "투사체 속도": "1000"
            }
        },
        "R": {
            "p1": "64 / 128 / 192 (+ 총 공격력의 25%)", // DamageCalc
            "p2": "256 / 512 / 768 (+ 총 공격력의 100%)", // MaxIncreaseCalc
            "p3": "0.5", // SlowDuration
            "p4": "80", // SlowPercent*100
            "p5": "200", // FourthShotMultiplier*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 105 / 90",
            "cost": "100",
            "stats": {
                "사거리": "3500",
                "스킬 폭": "160",
                "시전시간": "1",
                "투사체 속도": "3000"
            }
        },
    },
    "Zilean": { // 질리언
        "P": {
            "p1": "1", // GameModeInteger
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "사거리": "875"
            }
        },
        "Q": {
            "p1": "3", // FuseDuration
            "p2": "75 / 115 / 165 / 230 / 300 (+ 주문력의 90%)", // TotalDamage
            "p3": "1.1 / 1.2 / 1.3 / 1.4 / 1.5", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "900",
                "효과 범위": "350",
                "시전시간": "0.25"
            }
        },
        "W": {
            "p1": "10", // CooldownReduction
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
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
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
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
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 90 / 60",
            "cost": "125 / 150 / 175",
            "stats": {
                "사거리": "900"
            }
        },
    },
    "Jinx": { // 징크스
        "P": {
            "p1": "3", // AssistMarkerDuration
            "p2": "6", // BuffDuration
            "p3": "25", // ASBuff
            "p4": "175", // MSBuff
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "총 공격력의 110%", // RocketDamage
            "p2": "10", // RocketASPDPenalty*100
            "p3": "100 / 125 / 150 / 175 / 200", // RocketBonusRange
            "p4": "2.5", // MinigunAttackSpeedDuration
            "p5": "3", // MinigunAttackSpeedStacks
            "p6": "30 / 55 / 80 / 105 / 130", // MinigunAttackSpeedMax
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "0.9",
            "cost": "로켓 1발당 마나 20",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/jinx/hud/icons2d/jinx_q2.png"],
            "stats": {
                "효과 범위": "250"
            }
        },
        "W": {
            "p1": "10 / 60 / 110 / 160 / 210 (+ 총 공격력의 140%)", // TotalDamage
            "p2": "2", // SlowDuration
            "p3": "40 / 50 / 60 / 70 / 80", // SlowPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "8 / 7 / 6 / 5 / 4",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "1450",
                "스킬 폭": "120",
                "시전시간": "0.25",
                "투사체 속도": "3300"
            }
        },
        "E": {
            "p1": "5", // GrenadeDuration
            "p2": "1.5", // RootDuration
            "p3": "90 / 140 / 190 / 240 / 290 (+ 주문력의 100%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "24 / 20.5 / 17 / 13.5 / 10",
            "cost": "90",
            "stats": {
                "사거리": "925",
                "효과 범위": "225",
                "시전시간": "0.25",
                "투사체 속도": "1750"
            }
        },
        "R": {
            "p1": "20 / 35 / 50 (+ 추가 공격력의 12%)", // DamageFloor
            "p2": "200 / 350 / 500 (+ 추가 공격력의 120%)", // DamageMax
            "p3": "25 / 30 / 35", // PercentDamage
            "p4": "80", // AoEDamageMult*100
            "p5": "1200", // MonsterExecuteMax
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "85 / 65 / 45",
            "cost": "100",
            "stats": {
                "사거리": "전역",
                "효과 범위": "400",
                "스킬 폭": "280",
                "시전시간": "0.6",
                "투사체 속도": "1700"
            }
        },
    },
    "Chogath": { // 초가스
        "P": {
            "p1": "18 ~ 52 (레벨에 따라)", // ChogathCarnivoreHeal
            "p2": "4.72 ~ 9.48 (레벨에 따라)", // ChogathCarnivoreMana
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "1", // Effect5Amount
            "p2": "80 / 135 / 190 / 245 / 300 (+ 주문력의 100%)", // TotalDamageTooltip
            "p3": "1.5", // Effect3Amount
            "p4": "60", // Effect2Amount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "6",
            "cost": "50",
            "stats": {
                "사거리": "950",
                "효과 범위": "125",
                "시전시간": "0.5"
            }
        },
        "W": {
            "p1": "1.6 / 1.7 / 1.8 / 1.9 / 2", // Effect2Amount
            "p2": "80 / 130 / 180 / 230 / 280 (+ 주문력의 70%)", // TotalDamageTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "11 / 10.5 / 10 / 9.5 / 9",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "650",
                "시전시간": "0.5"
            }
        },
        "E": {
            "p1": "20 / 40 / 60 / 80 / 100 (+ 주문력의 30%)", // FlatDamageCalc
            "p2": "2.5 / 2.85 / 3.2 / 3.55 / 3.9% (+ 0.5 (중첩당))", // MaxHealthPercentCalc
            "p3": "30 / 35 / 40 / 45 / 50", // SlowAmountPercentage
            "p4": "1.5", // SlowDuration
            "p5": "0.5", // FeastStackMultiplier
            "p6": "80 / 110 / 140 / 170 / 200", // ModifiedMonsterCap
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "8 / 7 / 6 / 5 / 4",
            "cost": "30",
            "stats": {
                "투사체 속도": "1475"
            }
        },
        "R": {
            "p1": "300 / 475 / 650 (+ 주문력의 50% + 추가 최대 체력의 10%)", // RDamage
            "p2": "1200 (+ 주문력의 50% + 추가 최대 체력의 10%)", // RMonsterDamage
            "p3": "80 / 120 / 160", // RHealthPerStack
            "p4": "6", // RMinionMaxStacks
            "p5": "?", // f3
            "p6": "4.7 / 6.2 / 7.7", // AttackRangePerStack
            "p7": "75", // MaxBonusAttackRange
            "p8": "2.5", // CastRangePerStack
            "p9": "25", // MaxBonusCastRange
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "80 / 70 / 60",
            "cost": "100",
            "stats": {
                "사거리": "175",
                "시전시간": "0.25"
            }
        },
    },
    "Karma": { // 카르마
        "P": {
            "p1": "4", // SpellMantraRefund
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "60 / 110 / 160 / 210 / 260 (+ 주문력의 70%)", // TotalDamage
            "p2": "1.5", // SlowDuration
            "p3": "40", // SlowAmount*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "40 / 50 / 60 / 70 / 80",
            "stats": {
                "사거리": "950",
                "스킬 폭": "180",
                "투사체 속도": "1700"
            }
        },
        "W": {
            "p1": "40 / 65 / 90 / 115 / 140 (+ 주문력의 45%)", // InitialDamage
            "p2": "2", // TetherDuration
            "p3": "1.6 / 1.7 / 1.8 / 1.9 / 2", // RootDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "675",
                "스킬 폭": "120",
                "시전시간": "0.25",
                "투사체 속도": "2200"
            }
        },
        "E": {
            "p1": "2.5", // ShieldDuration
            "p2": "80 / 130 / 180 / 230 / 280 (+ 주문력의 60%)", // TotalShield
            "p3": "2", // MoveSpeedDuration
            "p4": "40", // MoveSpeed*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "800"
            }
        },
        "R": {
            "p1": "40 / 100 / 160 / 220 (+ 주문력의 30%)", // RQImpactDamage
            "p2": "40 / 130 / 220 / 310 (+ 주문력의 50%)", // RQFieldDamage
            "p3": "17% (+ 주문력의 1%)", // RWHealAmount
            "p4": "0.5 / 0.75 / 1 / 1.25", // RWBonusRoot
            "p5": "45 / 85 / 125 / 165 (+ 주문력의 45%)", // REBonusShield
            "p6": "45 / 85 / 125 / 165 (+ 주문력의 45%)", // REBonusShieldArea
            "p7": "15", // REMoveSpeed*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "40 / 38 / 36 / 34",
            "cost": "-",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/karma/hud/icons2d/karma_q2.png", "https://raw.communitydragon.org/latest/game/assets/characters/karma/hud/icons2d/karma_w2.png", "https://raw.communitydragon.org/latest/game/assets/characters/karma/hud/icons2d/karma_e2.png"],
            "stats": {
                "사거리": "1100"
            }
        },
    },
    "Camille": { // 카밀
        "P": {
            "p1": "2", // ShieldDuration
            "p2": "최대 체력의 10 ~ 20 (레벨에 따라)%", // ShieldAmount
            "p3": "14 ~ 8 (레벨에 따라)", // PassiveCooldown
            "cooldown": "14 ~ 8 (레벨에 따라)", // PassiveCooldown
            "cost": "-"
        },
        "Q": {
            "p1": "총 공격력의 20 / 25 / 30 / 35 / 40%", // BonusDamage
            "p2": "1", // MSDuration
            "p3": "25 / 30 / 35 / 40 / 45", // MSBonus*100
            "p4": "3.5", // QTotalRecastTime
            "p5": "1.5", // QRampUpTime
            "p6": "총 공격력의 40 / 50 / 60 / 70 / 80%", // EmpoweredBonusDamage
            "p7": "40 ~ 100% (레벨에 따라)", // DamageConversionPercentage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "9 / 8 / 7 / 6 / 5",
            "cost": "25",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/camille/hud/icons2d/camille_q2.png", "https://raw.communitydragon.org/latest/game/assets/characters/camille/hud/icons2d/camille_q3.png"],
            "stats": {
                "시전시간": "0.25"
            }
        },
        "W": {
            "p1": "60 / 85 / 110 / 135 / 160 (+ 추가 공격력의 60%)", // BaseDamageTotal
            "p2": "80", // SlowPercentage
            "p3": "2", // SlowDuration
            "p4": "7 / 7.5 / 8 / 8.5 / 9% (+ 추가 공격력의 2.5%)", // OuterEdgeTooltip
            "p5": "100", // OuterConeHealingRatio
            "p6": "50", // MonsterDamageReduction
            "p7": "300", // MonsterHealthDamageCap
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "610",
                "효과 범위": "325",
                "스킬 폭": "200",
                "투사체 속도": "1750"
            }
        },
        "E": {
            "p1": "5", // ASDuration
            "p2": "40 / 45 / 50 / 55 / 60", // ASBuff*100
            "p3": "60 / 90 / 120 / 150 / 180 (+ 추가 공격력의 75%)", // TotalDamage
            "p4": "0.75", // KnockupDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "70",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/camille/hud/icons2d/camille_e2.png"],
            "stats": {
                "사거리": "800",
                "시전시간": "0.25",
                "돌진 속도": "1050"
            }
        },
        "R": {
            "p1": "2.5 / 3.25 / 4", // RDuration
            "p2": "4 / 6 / 8", // RPercentCurrentHPDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "140 / 115 / 90",
            "cost": "100",
            "stats": {
                "사거리": "475",
                "효과 범위": "425",
                "시전시간": "0.25",
                "투사체 속도": "1200"
            }
        },
    },
    "Kassadin": { // 카사딘
        "P": {
            "p1": "10", // DamageReductionPercent*100
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "65 / 95 / 125 / 155 / 185 (+ 주문력의 70%)", // TotalDamage
            "p2": "80 / 110 / 140 / 170 / 200 (+ 주문력의 30%)", // TotalShield
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "9 / 8.5 / 8 / 7.5 / 7",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "650",
                "시전시간": "0.25",
                "투사체 속도": "1400"
            }
        },
        "W": {
            "p1": "25 (+ 주문력의 10%)", // OnHitDamage
            "p2": "50 / 75 / 100 / 125 / 150 (+ 주문력의 80%)", // ActiveDamage
            "p3": "4 / 4.5 / 5 / 5.5 / 6", // MissingManaRatio
            "p4": "20 / 22.5 / 25 / 27.5 / 30", // ChampionMissingManaRatio
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "7",
            "cost": "1"
        },
        "E": {
            "p1": "0.75", // ReductionPerSpellCast
            "p2": "70 / 100 / 130 / 160 / 190 (+ 주문력의 70%)", // TotalDamage
            "p3": "1", // SlowDuration
            "p4": "50 / 55 / 60 / 65 / 70", // SlowAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "21 / 20 / 19 / 18 / 17",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "400",
                "효과 범위": "600",
                "시전시간": "0.25"
            }
        },
        "R": {
            "p1": "70 / 90 / 110 (+ 주문력의 50% + 최대 마나의 2%)", // BaseDamage
            "p2": "15", // RStackDuration
            "p3": "35 / 45 / 55 (+ 주문력의 7% + 최대 마나의 1%)", // BonusDamage
            "p4": "4", // MaxStacks
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "5 / 3.5 / 2",
            "cost": "40",
            "stats": {
                "사거리": "500",
                "효과 범위": "270",
                "시전시간": "0.25"
            }
        },
    },
    "Karthus": { // 카서스
        "P": {
            "p1": "7", // PassiveDuration
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "40 / 59 / 78 / 97 / 116 (+ 주문력의 35%)", // QDamage
            "p2": "80 / 118 / 156 / 194 / 232 (+ 주문력의 70%)", // QSingleTargetDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "1",
            "cost": "20 / 25 / 30 / 35 / 40",
            "stats": {
                "사거리": "875",
                "효과 범위": "160",
                "시전시간": "0.25"
            }
        },
        "W": {
            "p1": "5", // WallDuration
            "p2": "5", // DebuffDuration
            "p3": "25", // MagicResistShred
            "p4": "40 / 50 / 60 / 70 / 80", // SlowPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "15",
            "cost": "70",
            "stats": {
                "사거리": "1000",
                "시전시간": "0.25",
                "투사체 속도": "1600"
            }
        },
        "E": {
            "p1": "10 / 20 / 30 / 40 / 50", // ManaRestoreOnKill
            "p2": "30 / 50 / 70 / 90 / 110 (+ 주문력의 20%)", // TotalDPS
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "0.5",
            "cost": "초당 마나 30 / 42 / 54 / 66 / 78",
            "stats": {
                "효과 범위": "550",
                "시전시간": "0.25"
            }
        },
        "R": {
            "p1": "200 / 350 / 500 (+ 주문력의 70%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "200 / 180 / 160",
            "cost": "100",
            "stats": {
                "사거리": "10000",
                "효과 범위": "전역",
                "시전시간": "0.25"
            }
        },
    },
    "Cassiopeia": { // 카시오페아
        "P": {
            "p1": "6 ~ 40% (레벨에 따라)", // PercentHasteMod
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "3", // PoisonDuration
            "p2": "75 / 110 / 145 / 180 / 215 (+ 주문력의 65%)", // TooltipTotalDamage
            "p3": "30 / 35 / 40 / 45 / 50", // ChampHitMSBonus
            "p4": "3", // ChampHitMSDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "3.5",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "850",
                "효과 범위": "200",
                "시전시간": "0.25"
            }
        },
        "W": {
            "p1": "5", // CloudDuration
            "p2": "20 / 25 / 30 / 35 / 40 (+ 주문력의 10%)", // DamagePerSecond
            "p3": "40 / 50 / 60 / 70 / 80", // SlowPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "24 / 22 / 20 / 18 / 16",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "700",
                "효과 범위": "200",
                "시전시간": "0.25",
                "투사체 속도": "1500"
            }
        },
        "E": {
            "p1": "52 ~ 120 (레벨에 따라) (+ 주문력의 10%)", // BasicDamage
            "p2": "20 / 45 / 70 / 95 / 120 (+ 주문력의 55%)", // BonusPoisonedDamage
            "p3": "주문력의 10 / 11.5 / 13 / 14.5 / 16%", // HealCalc
            "p4": "주문력의 2.5 / 2.875 / 3.25 / 3.625 / 4%", // HealCalcMinion
            "p5": "40", // Cost
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "0.75",
            "cost": "40",
            "stats": {
                "사거리": "700",
                "시전시간": "0.125",
                "투사체 속도": "2500"
            }
        },
        "R": {
            "p1": "150 / 250 / 350 (+ 주문력의 50%)", // RDamage
            "p2": "2", // RCCDuration
            "p3": "40", // RSlowPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": {
                "사거리": "825",
                "효과 범위": "850",
                "시전시간": "0.5"
            }
        },
    },
    "Kaisa": { // 카이사
        "P": {
            "p1": "4", // PDuration
            "p2": "4 ~ 30 (레벨에 따라) (+ 주문력의 12%)", // PBaseDamage
            "p3": "1 ~ 8 (레벨에 따라) (+ 주문력의 3%)", // PCurrentPerStackDamage
            "p4": "4", // PMaxStacks
            "p5": "15% (+ 주문력의 6%)", // PExecutePercentage
            "p6": "1", // PAllyStacks
            "p7": "?", // f1.1
            "p8": "100", // spell.KaisaQ:Effect6Amount
            "p9": "?", // f2.1
            "p10": "100", // spell.KaisaW:Effect2Amount
            "p11": "?", // f3.1
            "p12": "100", // spell.KaisaE:Effect6Amount
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "효과 범위": "3000"
            }
        },
        "Q": {
            "p1": "6", // Effect2Amount
            "p2": "40 / 55 / 70 / 85 / 100 (+ 추가 공격력의 55% + 주문력의 20%)", // TotalIndividualMissileDamage
            "p3": "90 / 123.75 / 157.5 / 191.25 / 225 (+ 추가 공격력의 123.75% + 주문력의 45%)", // MaxDamageDisplay
            "p4": "25", // ExtraHitReduction*100
            "p5": "12", // Effect7Amount
            "p6": "?", // f11.1
            "p7": "100", // Effect6Amount
            "p8": "35", // Effect5Amount*100
            "p9": "200", // Effect4Amount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "55",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/kaisa/hud/icons2d/kaisa_q2.png"],
            "stats": {
                "사거리": "600",
                "스킬 폭": "240",
                "시전시간": "0.25",
                "투사체 속도": "2500"
            }
        },
        "W": {
            "p1": "30 / 55 / 80 / 105 / 130 (+ 총 공격력의 130% + 주문력의 45%)", // TotalDamage
            "p2": "2", // Effect4Amount
            "p3": "4", // spell.KaisaPassive:PDuration
            "p4": "3", // Effect5Amount
            "p5": "75", // Effect3Amount
            "p6": "100", // f2.1
            "p7": "100", // Effect2Amount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "20 / 18.5 / 17 / 15.5 / 14",
            "cost": "55 / 60 / 65 / 70 / 75",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/kaisa/hud/icons2d/kaisa_w2.png"],
            "stats": {
                "사거리": "3000",
                "스킬 폭": "200",
                "시전시간": "0.4",
                "투사체 속도": "1750"
            }
        },
        "E": {
            "p1": "55 / 60 / 65 / 70 / 75% ~ 110 / 120 / 130 / 140 / 150%", // TotalMoveSpeed
            "p2": "4", // Effect2Amount
            "p3": "40 / 50 / 60 / 70 / 80", // Effect5Amount*100
            "p4": "0.5", // Effect4Amount
            "p5": "0.5", // Effect7Amount
            "p6": "?", // f10.1
            "p7": "100", // Effect6Amount
            "p8": "1.2 ~ 0.6", // TotalCastTime
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "16 / 14.5 / 13 / 11.5 / 10",
            "cost": "30",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/kaisa/hud/icons2d/kaisa_e2.png"],
            "stats": {
                "시전시간": "1.5"
            }
        },
        "R": {
            "p1": "2", // RShieldDuration
            "p2": "100 / 150 / 200 (+ 총 공격력의 90 / 135 / 180% + 주문력의 120%)", // RCalculatedShieldValue
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "130 / 100 / 70",
            "cost": "100",
            "stats": {
                "사거리": "2000 / 2500 / 3000",
                "효과 범위": "525",
                "돌진 속도": "3800"
            }
        },
    },
    "Khazix": { // 카직스
        "P": {
            "p1": "17 ~ 136 (레벨에 따라) (+ 추가 공격력의 50%)", // TotalDamage
            "p2": "2", // SlowDuration
            "p3": "25", // SlowAmount*100
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "80 / 105 / 130 / 155 / 180 (+ 추가 공격력의 105%)", // spell.KhazixQ:BaseDamage
            "p2": "168 / 220.5 / 273 / 325.5 / 378 (+ 추가 공격력의 220.5%)", // spell.KhazixQ:IsoDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "4",
            "cost": "20",
            "stats": {
                "사거리": "325",
                "시전시간": "0.25"
            }
        },
        "W": {
            "p1": "75 / 105 / 135 / 165 / 195 (+ 추가 공격력의 100%)", // BaseDamage
            "p2": "55 / 75 / 95 / 115 / 135 (+ 주문력의 50%)", // HealAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "9",
            "cost": "55 / 60 / 65 / 70 / 75",
            "stats": {
                "사거리": "1000",
                "스킬 폭": "120",
                "시전시간": "0.25",
                "투사체 속도": "1700"
            }
        },
        "E": {
            "p1": "65 / 100 / 135 / 170 / 205 (+ 추가 공격력의 40%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "50",
            "stats": {
                "사거리": "700",
                "시전시간": "0.25"
            }
        },
        "R": {
            "p1": "1.25", // StealthDuration
            "p2": "40", // BonusMovementSpeedPercent*100
            "p3": "12", // RecastWindow
            "p4": "45", // spell.KhazixQ:Effect4Amount
            "p5": "40", // spell.KhazixW:Effect3Amount
            "p6": "2", // EvolvedStealthDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "100 / 85 / 70",
            "cost": "100",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/khazix/hud/icons2d/khazix_q_red.png", "https://raw.communitydragon.org/latest/game/assets/characters/khazix/hud/icons2d/khazix_w_red.png", "https://raw.communitydragon.org/latest/game/assets/characters/khazix/hud/icons2d/khazix_e_red.png", "https://raw.communitydragon.org/latest/game/assets/characters/khazix/hud/icons2d/khazix_r_red.png"]
        },
    },
    "Katarina": { // 카타리나
        "P": {
            "p1": "3", // ResetWindow
            "p2": "15", // ResetCDR
            "p3": "68 ~ 240 (레벨에 따라) (+ 추가 공격력의 60% + 주문력의 70 ~ 100 (레벨에 따라)%)", // TotalDamage
            "cooldown": "-",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/katarina/hud/icons2d/katarina_daggerspin.png"],
            "cost": "-",
            "stats": {
                "효과 범위": "340"
            }
        },
        "Q": {
            "p1": "2", // MaxBounces
            "p2": "80 / 115 / 150 / 185 / 220 (+ 주문력의 40%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "-",
            "stats": {
                "사거리": "625",
                "효과 범위": "450",
                "스킬 폭": "120",
                "시전시간": "0.25",
                "투사체 속도": "1600"
            }
        },
        "W": {
            "p1": "50 / 60 / 70 / 80 / 90", // MovespeedAmount
            "p2": "1.25", // MovespeedDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "-"
        },
        "E": {
            "p1": "20 / 30 / 40 / 50 / 60 (+ 주문력의 25% + 총 공격력의 40%)", // TotalDamage
            "p2": "12 / 11 / 10 / 9 / 8", // DaggerCooldownReduction
            "p3": "78 ~ 96% (레벨에 따라)", // TooltipDaggerReduction
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "-",
            "stats": {
                "사거리": "725",
                "시전시간": "0.15"
            }
        },
        "R": {
            "p1": "25 / 37.5 / 50 (+ 주문력의 19%)", // DamageCalc
            "p2": "추가 공격력의 16 x (1 + 추가 공격 속도의 312.5%)%", // ADDamageCalc
            "p3": "3", // GrievousDuration
            "p4": "40", // GrievousAmount*100
            "p5": "2.5", // Duration
            "p6": "375 / 562.5 / 750 (+ 주문력의 285%)", // TotalDamageCalc
            "p7": "추가 공격력의 16 x (1 + 추가 공격 속도의 312.5%)%", // TotalADDamageCalc
            "p8": "25 / 30 / 35", // OnHitRatio*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "75 / 60 / 45",
            "cost": "-",
            "stats": {
                "효과 범위": "550",
                "투사체 속도": "2400"
            }
        },
    },
    "Kalista": { // 칼리스타
        "P": {
            "p1": "1", // GameModeInteger
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "10 / 75 / 140 / 205 / 270 (+ 총 공격력의 105%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "9",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "1150",
                "스킬 폭": "80",
                "시전시간": "0.25",
                "투사체 속도": "2400"
            }
        },
        "W": {
            "p1": "10 / 12 / 14 / 16 / 18", // MaxHealthDamage*100
            "p2": "10", // PerTargetCooldown
            "p3": "100 / 125 / 150 / 175 / 200", // MaximumMonsterDamage
            "p4": "90 / 80 / 70 / 60 / 50", // AmmoRechargeTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "30",
            "cost": "-",
            "stats": {
                "사거리": "5000",
                "시전시간": "0.5"
            }
        },
        "E": {
            "p1": "5 / 15 / 25 / 35 / 45 (+ 총 공격력의 70% + 주문력의 65%)", // NormalDamage
            "p2": "7 / 14 / 21 / 28 / 35 (+ 총 공격력의 20 / 27.5 / 35 / 42.5 / 50% + 주문력의 50%)", // AdditionalDamage
            "p3": "2", // SlowDuration
            "p4": "10 / 18 / 26 / 34 / 42% (+ 주문력의 5%)", // TotalSlowAmount
            "p5": "10 / 15 / 20 / 25 / 30", // ManaRefund
            "p6": "50", // EpicMonsterDamageMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "30",
            "stats": {
                "사거리": "1000",
                "효과 범위": "1100",
                "시전시간": "0.25"
            }
        },
        "R": {
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "160 / 140 / 120",
            "cost": "100",
            "stats": {
                "사거리": "1000<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:12px; color:#fff; white-space:nowrap;'>던지는 거리 1200</div></span></span>"
            }
        },
    },
    "Kennen": { // 케넨
        "P": {
            "p1": "6", // MarkDuration
            "p2": "1.25", // StunDuration
            "p3": "25", // EnergyRestore
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "75 / 125 / 175 / 225 / 275 (+ 주문력의 75%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "7 / 6.25 / 5.5 / 4.75 / 4",
            "cost": "60 / 55 / 50 / 45 / 40",
            "stats": {
                "사거리": "950",
                "스킬 폭": "100",
                "시전시간": "0.175",
                "투사체 속도": "1700"
            }
        },
        "W": {
            "p1": "35 / 45 / 55 / 65 / 75 (+ 주문력의 35% + 추가 공격력의 80 / 90 / 100 / 110 / 120%)", // TotalDamagePassive
            "p2": "70 / 95 / 120 / 145 / 170 (+ 주문력의 80%)", // TotalDamageActive
            "p3": "35 / 45 / 55 / 65 / 75 (+ 주문력의 35% + 추가 공격력의 80 / 90 / 100 / 110 / 120%) x (1.4 + 추가 치명타 피해량의 40%)", // TotalDamagePassiveCrit
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "13 / 11.25 / 9.5 / 7.75 / 6",
            "cost": "40",
            "stats": {
                "사거리": "725",
                "효과 범위": "775",
                "시전시간": "0.25"
            }
        },
        "E": {
            "p1": "2", // DurationAsBall
            "p2": "100", // MovementSpeed*100
            "p3": "80 / 120 / 160 / 200 / 240 (+ 주문력의 80%)", // TotalDamage
            "p4": "40", // EnergyRefund
            "p5": "4", // DurationAfterBall
            "p6": "40 / 50 / 60 / 70 / 80", // TotalAS*100
            "p7": "1", // CritDurationBonus
            "p8": "65", // DamageToMinions*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "80",
            "stats": {
                "효과 범위": "200"
            }
        },
        "R": {
            "p1": "0.5", // KennenRTickRate
            "p2": "40 / 80 / 120 (+ 주문력의 25%)", // PerTickDamageCalculated
            "p3": "3", // KennenRDuration
            "p4": "25 / 50 / 75", // KennenRDefenses
            "p5": "10", // DamageAmp*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120",
            "cost": "-",
            "stats": {
                "효과 범위": "550",
                "시전시간": "0.25"
            }
        },
    },
    "Caitlyn": { // 케이틀린
        "P": {
            "p1": "5", // AttacksPerHeadshot
            "p2": "2", // BrushAttackTotal
            "p3": "총 공격력의 60 ~ 100 (레벨에 따라) + 치명타 확률의 100%<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:11px; color:#fff; margin-bottom:5px; white-space:nowrap;'>무한의 대검 보유 시</div><div style='font-size:12px; color:#ff9900; font-weight:bold;'>130%</div><div style='font-size:10px; color:#9aa4af; margin-top:5px; white-space:nowrap;'>치명타 피해량 200% → 230%</div></span></span>", // HeadShotBonusDamage
            "p4": "35 / 80 / 125 / 170 / 215 (+ 추가 공격력의 30%)", // spell.CaitlynW:HeadshotBonusDamage
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "투사체 속도": "3000"
            }
        },
        "Q": {
            "p1": "50 / 90 / 130 / 170 / 210 (+ 총 공격력의 125 / 145 / 165 / 185 / 205%)", // InitialDamage
            "p2": "30 / 54 / 78 / 102 / 126 (+ 총 공격력의 125 / 145 / 165 / 185 / 205%)", // SecondaryDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "55 / 60 / 65 / 70 / 75",
            "stats": {
                "사거리": "1250",
                "스킬 폭": "120",
                "시전시간": "0.625",
                "투사체 속도": "2200"
            }
        },
        "W": {
            "p1": "1.5", // RootDuration
            "p2": "30 / 35 / 40 / 45 / 50", // TrapDuration
            "p3": "3 / 3 / 4 / 4 / 5", // MaximumTraps
            "p4": "3 / 3 / 4 / 4 / 5", // MaximumCharges
            "p5": "26 / 22 / 18 / 14 / 10", // AmmoRechargeTime
            "p6": "35 / 80 / 125 / 170 / 215 (+ 추가 공격력의 30%)", // HeadshotBonusDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "0.5",
            "cost": "20",
            "stats": {
                "사거리": "800",
                "시전시간": "0.25",
                "투사체 속도": "1450"
            }
        },
        "E": {
            "p1": "1", // SlowDuration
            "p2": "50", // SlowAmount
            "p3": "80 / 130 / 180 / 230 / 280 (+ 주문력의 80%)", // NetDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "16 / 14 / 12 / 10 / 8",
            "cost": "75",
            "stats": {
                "사거리": "750",
                "효과 범위": "140",
                "스킬 폭": "140",
                "시전시간": "0.15",
                "투사체 속도": "1600"
            }
        },
        "R": {
            "p1": "300 / 475 / 650 (+ 추가 공격력의 100%)", // RTotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "90",
            "cost": "100",
            "stats": {
                "사거리": "3500",
                "스킬 폭": "80",
                "시전시간": "0.375",
                "투사체 속도": "1500"
            }
        },
    },
    "Kayn": { // 케인
        "P": {
            "p1": "3", // PAmpDurationAss
            "p2": "20 ~ 40% (레벨에 따라)", // KaynAssBonusDamage
            "p3": "8", // PAmpCooldownAss
            "p4": "25% (+ 추가 최대 체력의 0.5%)", // KaynSlayerHealing
            "cooldown": "-",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/kayn/hud/icons2d/kayn_passive_ass.png", "https://raw.communitydragon.org/latest/game/assets/characters/kayn/hud/icons2d/kayn_passive_slay.png"],
            "cost": "-"
        },
        "Q": {
            "p1": "75 / 105 / 135 / 165 / 195 (+ 추가 공격력의 85%)", // TotalDamage
            "p2": "총 공격력의 65%", // DarkinFlatDamage
            "p3": "6% (+ 추가 공격력의 3.5%)", // DarkinPercentDamage
            "p4": "40", // FlatBonusDmgToMonsters
            "p5": "200 / 250 / 300 / 350 / 400", // MaxDmgToMonsters
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "7 / 6.5 / 6 / 5.5 / 5",
            "cost": "40",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/kayn/hud/icons2d/kayn_q_slay.png"],
            "stats": {
                "사거리": "350",
                "스킬 폭": "200",
                "시전시간": "0.15"
            }
        },
        "W": {
            "p1": "85 / 130 / 175 / 220 / 265 (+ 추가 공격력의 110%)", // TotalDamage
            "p2": "90", // Effect3Amount*-100
            "p3": "1.5", // Effect5Amount
            "p4": "1", // Effect2Amount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "40 / 45 / 50 / 55 / 60",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/kayn/hud/icons2d/kayn_w_ass.png", "https://raw.communitydragon.org/latest/game/assets/characters/kayn/hud/icons2d/kayn_w_slay.png"],
            "stats": {
                "사거리": "700<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:12px; color:#fff; white-space:nowrap;'>그림자 암살자 900</div></span></span>",
                "스킬 폭": "350",
                "시전시간": "0.55"
            }
        },
        "E": {
            "p1": "7 / 7.5 / 8 / 8.5 / 9", // Effect2Amount
            "p2": "40", // Effect1Amount
            "p3": "90 / 100 / 110 / 120 / 130 (+ 추가 공격력의 45%)", // TotalHealing
            "p4": "1.5", // Effect3Amount
            "p5": "70", // Effect5Amount
            "p6": "10", // AssassinCDReduction
            "p7": "1.5", // MaxInCombatTime
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "21 / 19 / 17 / 15 / 13",
            "cost": "90",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/kayn/hud/icons2d/kayn_e_ass.png"]
        },
        "R": {
            "p1": "2.5", // InfestDuration
            "p2": "150 / 250 / 350 (+ 추가 공격력의 150%)", // Damage
            "p3": "15% (+ 추가 공격력의 10%)", // SlayerDamage
            "p4": "11.25% (+ 추가 공격력의 7.5%)", // HealValue
            "p5": "75", // SlayerHealPercent*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/kayn/hud/icons2d/kayn_r2_ass.png", "https://raw.communitydragon.org/latest/game/assets/characters/kayn/hud/icons2d/kayn_r2_slay.png"],
            "stats": {
                "사거리": "550<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:12px; color:#fff; white-space:nowrap;'>그림자 암살자 750</div></span></span>",
                "효과 범위": "300",
                "시전시간": "0.1"
            }
        },
    },
    "Kayle": { // 케일
        "P": {
            "p1": "1", // LevelForPassiveRank0
            "p2": "5", // EnrageDuration
            "p3": "6", // EnrageTotalASPerStack
            "p4": "10", // MSTowardsEnemy*100
            "p5": "6", // LevelForPassiveRank1
            "p6": "525", // UpgradedAttackRange
            "p7": "11", // LevelForPassiveRank2
            "p8": "20 ~ 41 (레벨에 따라) (+ 주문력의 25% + 추가 공격력의 10%)", // PassiveWaveDamage
            "p9": "16", // LevelForPassiveRank3
            "p10": "625", // FinalAttackRange
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "60 / 90 / 120 / 150 / 180 (+ 주문력의 50% + 추가 공격력의 60%)", // TotalDamage
            "p2": "2", // SlowDuration
            "p3": "25 / 30 / 35 / 40 / 45", // SlowPercent
            "p4": "4", // ShredDuration
            "p5": "15", // ShredPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "900",
                "스킬 폭": "120",
                "시전시간": "0.25",
                "투사체 속도": "1600"
            }
        },
        "W": {
            "p1": "55 / 80 / 105 / 130 / 155 (+ 주문력의 25%)", // TotalHeal
            "p2": "2", // HasteDuration
            "p3": "24 / 28 / 32 / 36 / 40% (+ 주문력의 8%)", // TotalHaste
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "15",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "900",
                "시전시간": "0.25",
                "투사체 속도": "902"
            }
        },
        "E": {
            "p1": "15 / 20 / 25 / 30 / 35 (+ 주문력의 20% + 추가 공격력의 10%)", // EPassiveTotalDamage
            "p2": "8 / 8.5 / 9 / 9.5 / 10% (+ 주문력의 1.5%)", // ActiveTotalExecuteDamage
            "p3": "11", // Spell.KaylePassive:LevelForPassiveRank2
            "p4": "400", // MaxExecuteVsMonsters
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "-",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/kayle/hud/icons2d/kayle_e2.png"],
            "stats": {
                "효과 범위": "350"
            }
        },
        "R": {
            "p1": "2.5", // InvulnDuration
            "p2": "200 / 300 / 400 (+ 주문력의 70% + 추가 공격력의 100%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "160 / 120 / 80",
            "cost": "100 / 50 / 0",
            "stats": {
                "사거리": "900",
                "효과 범위": "675 / 675 / 775",
                "시전시간": "0.5"
            }
        },
    },
    "KogMaw": { // 코그모
        "P": {
            "p1": "4", // TooltipPassiveDuration
            "p2": "50", // TooltipPassiveMS*100
            "p3": "140 ~ 650 (레벨에 따라)", // PassiveDamage
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "효과 범위": "400"
            }
        },
        "Q": {
            "p1": "5 / 10 / 15 / 20 / 25", // AttackSpeed*100
            "p2": "80 / 125 / 170 / 215 / 260 (+ 주문력의 90%)", // TotalDamage
            "p3": "4", // ShredDuration
            "p4": "16 / 20 / 24 / 28 / 32", // ShredAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "7",
            "cost": "40",
            "stats": {
                "사거리": "1175",
                "스킬 폭": "140",
                "투사체 속도": "1650"
            }
        },
        "W": {
            "p1": "130 / 150 / 170 / 190 / 210", // Range
            "p2": "8", // Duration
            "p3": "3 / 3.75 / 4.5 / 5.25 / 6% (+ 주문력의 1.5%)", // TotalHealthDamage
            "p4": "100", // MonsterDamageCap
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
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
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12",
            "cost": "40 / 55 / 70 / 85 / 100",
            "stats": {
                "사거리": "1200",
                "스킬 폭": "240",
                "시전시간": "0.25",
                "투사체 속도": "1400"
            }
        },
        "R": {
            "p1": "100 / 140 / 180 (+ 주문력의 35 / 40 / 45% + 추가 공격력의 75%)", // BaseDamageCalc
            "p2": "0.833", // TooltipMissingHealthDamageAmp
            "p3": "200 / 280 / 360 (+ 주문력의 70 / 80 / 90% + 추가 공격력의 150%)", // MaxDamageCalc
            "p4": "8", // ManaCostDuration
            "p5": "40", // BaseCost
            "p6": "400", // ManaCostCap
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "2 / 1.5 / 1",
            "cost": "40",
            "stats": {
                "사거리": "1300 / 1550 / 1800",
                "효과 범위": "240",
                "시전시간": "0.25"
            }
        },
    },
    "Corki": { // 코르키
        "P": {
            "p1": "20", // AttackConversion*100
            "p2": "총 공격력의 20%", // BasicAttackTOOLTIP
            "p3": "총 공격력의 40%<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:11px; color:#fff; margin-bottom:5px; white-space:nowrap;'>무한의 대검 보유 시</div><div style='font-size:12px; color:#ff9900; font-weight:bold;'>46%</div><div style='font-size:10px; color:#9aa4af; margin-top:5px; white-space:nowrap;'>치명타 피해량 200% → 230%</div></span></span>", // CriticalStrikeTOOLTIP
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "60 / 105 / 150 / 195 / 240 (+ 추가 공격력의 125% + 주문력의 100%)", // TotalDamage
            "p2": "6", // RevealDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "9 / 8.5 / 8 / 7.5 / 7",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "사거리": "825",
                "효과 범위": "275",
                "시전시간": "0.25",
                "투사체 속도": "1100"
            }
        },
        "W": {
            "p1": "2.5", // TrailDuration
            "p2": "150 / 225 / 300 / 375 / 450 (+ 주문력의 150% + 추가 공격력의 200%)", // MaximumDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "20 / 18 / 16 / 14 / 12",
            "cost": "80 / 85 / 90 / 95 / 100",
            "stats": {
                "사거리": "600",
                "효과 범위": "200",
                "스킬 폭": "320",
                "투사체 속도": "700",
                "돌진 속도": "650"
            }
        },
        "E": {
            "p1": "4", // SprayDuration
            "p2": "80 / 130 / 180 / 230 / 280 (+ 추가 공격력의 240%)", // TotalDamage
            "p3": "12 / 14 / 16 / 18 / 20", // ShredMax*-1
            "p4": "2", // ShredDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "600",
                "효과 범위": "690",
                "투사체 속도": "902"
            }
        },
        "R": {
            "p1": "90 / 170 / 250 (+ 추가 공격력의 85%)", // RSmallMissileDamage
            "p2": "180 / 340 / 500 (+ 추가 공격력의 170%)", // RBigMissileDamage
            "p3": "4", // MaxAmmoTOOLTIP
            "p4": "2 (+ 치명타 확률의 200%)", // AttackRefund
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "재장전 대기시간 20초 (재사용 2초)",
            "cost": "35",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/corki/hud/icons2d/corki_r_bigone.png"],
            "stats": {
                "사거리": "1225<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:12px; color:#fff; white-space:nowrap;'>세 번째 미사일 1500</div></span></span>",
                "효과 범위": "150",
                "스킬 폭": "80",
                "시전시간": "0.175",
                "투사체 속도": "2000"
            }
        },
    },
    "Quinn": { // 퀸
        "P": {
            "p1": "7 ~ 2.56 (치명타 확률에 따라)", // f1
            "p2": "4", // RevealDuration
            "p3": "15 ~ 120 (레벨에 따라) (+ 추가 공격력의 40%)", // BonusDamage
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "효과 범위": "525"
            }
        },
        "Q": {
            "p1": "1.75", // VisionReductionDuration
            "p2": "65 / 100 / 135 / 170 / 205 (+ 추가 공격력의 80 / 85 / 90 / 95 / 100% + 주문력의 50%)", // TotalDamage
            "p3": "100", // BonusMonsterDmgMult*100
            "p4": "130 / 200 / 270 / 340 / 410 (+ 추가 공격력의 160 / 170 / 180 / 190 / 200% + 주문력의 100%)", // TotalDamageMonster
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "11 / 10.5 / 10 / 9.5 / 9",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "1025",
                "효과 범위": "210",
                "스킬 폭": "120",
                "시전시간": "0.25",
                "투사체 속도": "1550"
            }
        },
        "W": {
            "p1": "2", // BuffDuration
            "p2": "28 / 41 / 54 / 67 / 80", // AttackSpeedBonus*100
            "p3": "20 / 25 / 30 / 35 / 40", // MovespeedAmount*100
            "p4": "2", // VisionDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "50 / 45 / 40 / 35 / 30",
            "cost": "-",
            "stats": {
                "효과 범위": "2100"
            }
        },
        "E": {
            "p1": "40 / 65 / 90 / 115 / 140 (+ 추가 공격력의 20%)", // TotalDamage
            "p2": "50", // SlowAmount*100
            "p3": "1.5", // SlowDecayTime
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "50",
            "stats": {
                "사거리": "675",
                "시전시간": "0.25",
                "돌진 속도": "2500"
            }
        },
        "R": {
            "p1": "70 / 100 / 130", // MovementSpeedMod*100
            "p2": "60 / 90 / 120 (+ 추가 공격력의 35%)", // Damage
            "p3": "3", // SlowDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "3",
            "cost": "50 / 25 / 0",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/quinn/hud/icons2d/quinn_r2.png"],
            "stats": {
                "사거리": "700",
                "시전시간": "0.25"
            }
        },
    },
    "KSante": { // 크산테
        "P": {
            "p1": "12", // FlatDamage
            "p2": "1 ~ 2% (레벨에 따라)", // PercentHealthDamage
            "p3": "1% (+ 추가 방어력의 1% + 추가 마법 저항력의 1%)", // MaxHealthDamagePercent
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "70 / 100 / 130 / 160 / 190 (+ 추가 방어력의 40% + 추가 마법 저항력의 40%)", // BaseDamage
            "p2": "0.5", // SlowDuration
            "p3": "80", // SlowPercent*100
            "p4": "6", // RecastWindow
            "p5": "1", // StunDuration
            "p6": "33", // RCooldownReduction.0*100
            "p7": "?", // f2
            "p8": "120", // DefenseCapforCooldown
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "3.5",
            "cost": "20",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/ksante/hud/icons2d/icons_ksante_q2.png", "https://raw.communitydragon.org/latest/game/assets/characters/ksante/hud/icons2d/icons_ksante_q3.png"],
            "stats": {
                "사거리": "450 (강화 930)",
                "스킬 폭": "200",
                "시전시간": "0.35"
            }
        },
        "W": {
            "p1": "0.4", // MinDurationTOOLTIP
            "p2": "1", // MaxDuration.1
            "p3": "30", // DamageReduction*100
            "p4": "45 / 75 / 105 / 135 / 165", // BaseDamage
            "p5": "8% (+ 추가 방어력의 2% + 추가 마법 저항력의 2%)", // TotalMaxHealthDamage
            "p6": "0.5", // MinKnockbackDuration
            "p7": "1.75", // MaxKnockbackDuration
            "p8": "10", // RDamageIncreaseMin*100
            "p9": "80", // RDamageIncreaseMax*100
            "p10": "75", // RDamageReduction*100
            "p11": "90", // TimeToFullCharge*100
            "p12": "180 / 260 / 340 / 420 / 500", // MaxMonsterDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "600",
                "스킬 폭": "110",
                "돌진 속도": "1500"
            }
        },
        "E": {
            "p1": "2", // ShieldDuration
            "p2": "70 / 112.5 / 155 / 197.5 / 240 (+ 추가 최대 체력의 13.5%)", // TotalShield
            "p3": "50", // CooldownModAO*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "45 / 50 / 55 / 60 / 65",
            "stats": {
                "사거리": "525",
                "스킬 폭": "320"
            }
        },
        "R": {
            "p1": "80 / 115 / 150", // BaseDamage
            "p2": "15", // AllOutDuration
            "p3": "80 / 115 / 150 (+ 추가 최대 체력의 5%)", // TotalDamageSlamDown
            "p4": "40 / 60 / 80", // AttackSpeed*100
            "p5": "50", // ArmorPenPercent*100
            "p6": "20", // Omnivamp*100
            "p7": "35", // HealthLost*100
            "p8": "85", // DefensesLost*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/ksante/hud/icons2d/icons_ksante_r2.png"],
            "stats": {
                "사거리": "250",
                "효과 범위": "350",
                "스킬 폭": "320",
                "시전시간": "0.4"
            }
        },
    },
    "Kled": { // 클레드
        "P": {
            "p1": "70 ~ 155 (레벨에 따라)", // DismountedMS
            "p2": "4 (+ 추가 최대 체력의 1%)", // DismountedResistBonus
            "p3": "30", // ResistBonusPerEnemy*100
            "p4": "10 (+ 추가 최대 체력의 2.5%)", // DismountedResistBonusMax
            "p5": "15 ~ 0% (레벨에 따라)", // DismountedAttackPenalty
            "p6": "15", // CourageVsChamps
            "p7": "5", // CourageVsOther
            "p8": "5", // CourageLastHit
            "p9": "30", // MountCooldown
            "p10": "40 ~ 70% (레벨에 따라)", // SkaarlRemountHealth
            "cooldown": "-",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/kled/hud/icons2d/kled_p2.png"],
            "cost": "-"
        },
        "Q": {
            "p1": "30 / 55 / 80 / 105 / 130 (+ 추가 공격력의 60%)", // TotalDamage
            "p2": "1.75", // TetherPopTime
            "p3": "60 / 110 / 160 / 210 / 260 (+ 추가 공격력의 120%)", // TotalYankDamage
            "p4": "2.5", // SlowDuration
            "p5": "30 / 35 / 40 / 45 / 50", // SlowAmount*-100
            "p6": "150", // MinionDamageMultiplier*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "-",
            "form1": "스카를 탑승",
            "stats": {
                "사거리": "800",
                "스킬 폭": "90",
                "시전시간": "0.25",
                "투사체 속도": "1600"
            }
        },
        "W": {
            "p1": "4", // ActiveDuration
            "p2": "150", // AttackSpeed*100
            "p3": "20 / 30 / 40 / 50 / 60", // BaseFlatDamage
            "p4": "4.5 / 5 / 5.5 / 6 / 6.5% (+ 추가 공격력의 2% + 추가 최대 체력의 0.4%)", // PercentDamage
            "p5": "200", // MonsterCap
            "p6": "0.5", // NonChampCooldownRefund
            "p7": "1.5", // ChampCooldownRefund
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "-"
        },
        "E": {
            "p1": "35 / 60 / 85 / 110 / 135 (+ 추가 공격력의 55%)", // TotalDamage
            "p2": "1", // MoveSpeedDuration
            "p3": "50", // MoveSpeed*100
            "p4": "3", // RecastWindow
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "-",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/kled/hud/icons2d/kled_e2.png"],
            "stats": {
                "사거리": "550 (재사용 765)",
                "돌진 속도": "600"
            }
        },
        "R": {
            "p1": "200 / 300 / 400 (+ 추가 공격력의 300%)", // MaximumShield
            "p2": "4 / 6 / 8% (+ 추가 공격력의 3%)", // MinimumDamageTooltip
            "p3": "12 / 18 / 24% (+ 추가 공격력의 9%)", // MaximumChargeDamage
            "p4": "3", // SecondsToMaxPower
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "140 / 125 / 110",
            "cost": "-",
            "stats": {
                "사거리": "3500 / 4000 / 4500",
                "투사체 속도": "1000"
            }
        },
        "Q2": {
            "p1": "35 / 50 / 65 / 80 / 95 (+ 추가 공격력의 65%)", // TotalDamage
            "p2": "5", // CouragePerPellet
            "p3": "2.5", // CouragePerPellet*0.5
            "p4": "20", // FalloffPerMissile*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "3",
            "cost": "-",
            "name": "빵야!",
            "form": "스카를 하차",
            "icon": "https://raw.communitydragon.org/latest/game/assets/characters/kled/hud/icons2d/kled_q2.png"
        },
    },
    "Qiyana": { // 키아나
        "P": {
            "p1": "15 ~ 83 (레벨에 따라) (+ 추가 공격력의 25% + 주문력의 30%)", // FinalDamage
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "70 / 100 / 130 / 160 / 190 (+ 추가 공격력의 85%)", // VanillaDamage
            "p2": "1", // SlowDuration
            "p3": "20", // SlowPotency*-100
            "p4": "50", // CritThreshold*100
            "p5": "52.5 / 75 / 97.5 / 120 / 142.5 (+ 추가 공격력의 63.75%)", // TremorDamage
            "p6": "20", // Haste*100
            "p7": "75%", // FalloffDamage
            "p8": "175", // JungleDamageAmp*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "7",
            "cost": "35",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/qiyana/hud/icons2d/qiyana_q2_blue.png", "https://raw.communitydragon.org/latest/game/assets/characters/qiyana/hud/icons2d/qiyana_q2_red.png", "https://raw.communitydragon.org/latest/game/assets/characters/qiyana/hud/icons2d/qiyana_q2_green.png"],
            "stats": {
                "사거리": "525",
                "스킬 폭": "140",
                "시전시간": "0.25"
            }
        },
        "W": {
            "p1": "15 / 20 / 25 / 30 / 35", // AttackSpeed*100
            "p2": "8 / 16 / 24 / 32 / 40 (+ 주문력의 45% + 추가 공격력의 20%)", // OnHitDamage
            "p3": "3 / 5 / 7 / 9 / 11", // PassiveMS*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "7",
            "cost": "25 / 30 / 35 / 40 / 45",
            "stats": {
                "사거리": "1100",
                "효과 범위": "366",
                "투사체 속도": "1000",
                "돌진 속도": "440 (+ 이동 속도의 100%)"
            }
        },
        "E": {
            "p1": "50 / 90 / 130 / 170 / 210 (+ 추가 공격력의 50%)", // Damage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "650",
                "스킬 폭": "150",
                "시전시간": "0.25",
                "돌진 속도": "600 (+ 이동 속도의 100%)"
            }
        },
        "R": {
            "p1": "1", // StunDuration
            "p2": "100 / 200 / 300 (+ 추가 공격력의 125%)", // Damage
            "p3": "10%", // MissingHealthDamageRock
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120",
            "cost": "100",
            "stats": {
                "사거리": "950",
                "효과 범위": "11000",
                "스킬 폭": "280",
                "시전시간": "0.25",
                "투사체 속도": "1000"
            }
        },
    },
    "Kindred": { // 킨드레드
        "P": {
            "p1": "4", // InitialMarkThreshold
            "p2": "75", // FirstTierRangeIncreaseTT
            "p3": "3", // AdditionalMarkThreshold
            "p4": "25", // RangeIncrease
            "p5": "5 (중첩당)%", // QMarkBonus
            "p6": "1 (중첩당)%", // WMarkBonus
            "p7": "0.5 (중첩당)%", // EMarkBonus
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "40 / 65 / 90 / 115 / 140 (+ 추가 공격력의 75%)", // TotalDamage
            "p2": "4", // BaseASDuration
            "p3": "35% (+ 5 (중첩당))", // TotalQAttackSpeed
            "p4": "4 / 3.5 / 3 / 2.5 / 2", // CDNewValue
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "9",
            "cost": "35",
            "stats": {
                "사거리": "340",
                "효과 범위": "500 (+ 추가 공격 사거리)",
                "돌진 속도": "500"
            }
        },
        "W": {
            "p1": "47 ~ 81 (레벨에 따라)", // AttackHeal
            "p2": "25 / 30 / 35 / 40 / 45 (+ 추가 공격력의 20% + 주문력의 20%)", // BaseWolfDamage
            "p3": "1.5% (+ 1 (중첩당))", // PercentWolfDamage
            "p4": "50", // MonsterBonusDmg*100
            "p5": "50", // MonsterSlowAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "18 / 17 / 16 / 15 / 14",
            "cost": "40",
            "stats": {
                "사거리": "560",
                "효과 범위": "800",
                "투사체 속도": "1400"
            }
        },
        "E": {
            "p1": "1", // SlowDuration
            "p2": "30 (+ 주문력의 5%)", // TotalSlow
            "p3": "4", // TotalDuration
            "p4": "80 / 110 / 140 / 170 / 200 (+ 추가 공격력의 100%)", // BaseBiteDamage
            "p5": "5% (+ 0.5 (중첩당))", // PercentBiteDamage
            "p6": "50", // CritMod*100
            "p7": "200", // MonsterCap
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14 / 12.5 / 11 / 9.5 / 8",
            "cost": "50",
            "stats": {
                "사거리": "500",
                "시전시간": "0.25",
                "투사체 속도": "2200"
            }
        },
        "R": {
            "p1": "4", // BuffDuration
            "p2": "225 / 300 / 375", // HealFlat
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "160 / 140 / 120",
            "cost": "100",
            "stats": {
                "사거리": "500",
                "효과 범위": "535",
                "시전시간": "0.25"
            }
        },
    },
    "Taric": { // 타릭
        "P": {
            "p1": "5", // Duration
            "p2": "25 ~ 93 (레벨에 따라) (+ 추가 방어력의 15%)", // TotalDamage
            "p3": "1 ~ 2 (스킬 가속에 따라)", // CDR
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "15", // StackCooldown
            "p2": "1 / 2 / 3 / 4 / 5", // MaxCharges
            "p3": "25 (+ 주문력의 15% + 최대 체력의 1%)", // HealingPerStack
            "p4": "25 (+ 주문력의 15% + 최대 체력의 1%)", // MaxStackHealing
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "3",
            "cost": "마나 60, 현재 충전량",
            "stats": {
                "효과 범위": "325",
                "시전시간": "0.25"
            }
        },
        "W": {
            "p1": "방어력의 6 / 7 / 8 / 9 / 10%", // BonusArmor
            "p2": "2.5", // ShieldDuration
            "p3": "7 / 8 / 9 / 10 / 11", // ShieldHPRatio
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "15",
            "cost": "60",
            "stats": {
                "사거리": "800",
                "스킬 폭": "120",
                "시전시간": "0.25",
                "투사체 속도": "1700"
            }
        },
        "E": {
            "p1": "1", // ChargeDuration
            "p2": "90 / 130 / 170 / 210 / 250 (+ 주문력의 50% + 추가 방어력의 50%)", // TotalDamage
            "p3": "1.5", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "16 / 15 / 14 / 13 / 12",
            "cost": "40",
            "stats": {
                "사거리": "610",
                "스킬 폭": "200",
                "투사체 속도": "1750"
            }
        },
        "R": {
            "p1": "2.5", // InitialDelay
            "p2": "2.5", // InvulnDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "180 / 150 / 120",
            "cost": "100",
            "stats": {
                "효과 범위": "400",
                "시전시간": "0.25"
            }
        },
    },
    "Talon": { // 탈론
        "P": {
            "p1": "6", // StackDuration
            "p2": "2", // BleedDuration
            "p3": "80 ~ 280 (레벨에 따라) (+ 추가 공격력의 210%)", // BleedDamage
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "65 / 85 / 105 / 125 / 145 (+ 추가 공격력의 100%)", // LeapDamage
            "p2": "65 / 85 / 105 / 125 / 145 (+ 추가 공격력의 100%) x (1.5 + 추가 치명타 피해량의 100%)", // CriticalDamage
            "p3": "9 ~ 55 (레벨에 따라)", // TotalHealing
            "p4": "50", // CooldownRefund*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "8 / 7.5 / 7 / 6.5 / 6",
            "cost": "40",
            "stats": {
                "사거리": "575",
                "투사체 속도": "2000"
            }
        },
        "W": {
            "p1": "50 / 60 / 70 / 80 / 90 (+ 추가 공격력의 40%)", // TotalInitialDamage
            "p2": "60 / 90 / 120 / 150 / 180 (+ 추가 공격력의 90%)", // TotalReturnDamage
            "p3": "1", // SlowDuration
            "p4": "40 / 45 / 50 / 55 / 60", // MovespeedSlow*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "9 / 8.5 / 8 / 7.5 / 7",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "900",
                "스킬 폭": "150",
                "시전시간": "0.25",
                "투사체 속도": "2571<span class='custom-footnote'>[1]<span class='custom-footnote-content'><div style='font-size:12px; color:#fff; white-space:nowrap;'>돌아올 때 3000</div></span></span>"
            }
        },
        "E": {
            "p1": "160 / 135 / 110 / 85 / 60", // WallCD
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "2",
            "cost": "-",
            "stats": {
                "사거리": "725"
            }
        },
        "R": {
            "p1": "90 / 135 / 180 (+ 추가 공격력의 100%)", // Damage
            "p2": "40 / 55 / 70", // MoveSpeed*100
            "p3": "2.5", // Duration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "100 / 80 / 60",
            "cost": "100",
            "stats": {
                "효과 범위": "550",
                "스킬 폭": "280",
                "투사체 속도": "2400"
            }
        },
    },
    "Taliyah": { // 탈리야
        "P": {
            "p1": "3", // FallOffTime
            "p2": "10 ~ 40% (레벨에 따라)", // TotalMS
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "55 / 72.5 / 90 / 107.5 / 125 (+ 주문력의 50%)", // RockDamage
            "p2": "60", // ExtraMissileReducedDamagePercent
            "p3": "10", // BigRockManaCost
            "p4": "50", // WorkedGroundCDR*100
            "p5": "1.5", // SlowDuration
            "p6": "20 / 25 / 30 / 35 / 40", // SlowPercent*100
            "p7": "99 / 130.5 / 162 / 193.5 / 225 (+ 주문력의 90%)", // BigRockDamage
            "p8": "3", // MonsterStunDuration
            "p9": "0.75", // MinimumWorkedGroundCD
            "p10": "143 / 188.5 / 234 / 279.5 / 325 (+ 주문력의 130%)", // MaxDamageTooltip
            "p11": "20 / 25 / 30 / 35 / 40", // TotalBonusFlatMonsterDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "7 / 6 / 5 / 4 / 3",
            "cost": "55 / 60 / 65 / 70 / 75",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/taliyah/hud/icons2d/taliyah_q2.png"],
            "stats": {
                "사거리": "1000",
                "효과 범위": "175",
                "스킬 폭": "160",
                "시전시간": "0.25",
                "투사체 속도": "3600"
            }
        },
        "W": {
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14 / 12.5 / 11 / 9.5 / 8",
            "cost": "40 / 30 / 20 / 10 / 0",
            "stats": {
                "사거리": "900",
                "효과 범위": "225",
                "스킬 폭": "100",
                "시전시간": "0.25"
            }
        },
        "E": {
            "p1": "20", // SlowPercent*100
            "p2": "60 / 105 / 150 / 195 / 240 (+ 주문력의 60%)", // ScatterDamage
            "p3": "0.75", // StunDuration
            "p4": "25 / 40 / 55 / 70 / 85 (+ 주문력의 30%)", // DetonationDamage
            "p5": "2", // MaxStunDuration
            "p6": "25", // MineDamageFalloff*100
            "p7": "62.5 / 100 / 137.5 / 175 / 212.5 (+ 주문력의 75%)", // MaxDetonationDamageTooltip
            "p8": "225", // MonsterModPercent*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14",
            "cost": "90",
            "stats": {
                "사거리": "950",
                "효과 범위": "800",
                "시전시간": "0.25"
            }
        },
        "R": {
            "p1": "4", // WallDuration
            "p2": "3", // DamageLockoutTime
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "180 / 150 / 120",
            "cost": "100",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/taliyah/hud/icons2d/taliyah_r2.png"],
            "stats": {
                "사거리": "2500 / 4500 / 6500",
                "스킬 폭": "240",
                "투사체 속도": "2000"
            }
        },
    },
    "TahmKench": { // 탐 켄치
        "P": {
            "p1": "5 ~ 60 (레벨에 따라) (+ 추가 최대 체력의 4% + 주문력의 추가 최대 체력의 1.25%)", // TotalDamage
            "p2": "5", // Duration
            "p3": "3", // MaxStacks
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "75 / 120 / 165 / 210 / 255 (+ 주문력의 100%)", // TotalDamage
            "p2": "2", // SlowDuration
            "p3": "50", // SlowAmount*100
            "p4": "10 / 15 / 20 / 25 / 30", // BaseHeal
            "p5": "5 / 5.5 / 6 / 6.5 / 7", // PercentHealthHealing*100
            "p6": "5 ~ 60 (레벨에 따라) (+ 추가 최대 체력의 4% + 주문력의 추가 최대 체력의 1.25%)", // Spell.TahmKenchPassive:TotalDamage
            "p7": "1.5", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "7 / 6.5 / 6 / 5.5 / 5",
            "cost": "50 / 46 / 42 / 38 / 34",
            "stats": {
                "사거리": "900",
                "스킬 폭": "140",
                "시전시간": "0.25",
                "투사체 속도": "2000"
            }
        },
        "W": {
            "p1": "100 / 135 / 170 / 205 / 240 (+ 주문력의 150%)", // TotalDamage
            "p2": "1", // KnockupDuration
            "p3": "40 / 42.5 / 45 / 47.5 / 50", // ChampRefund*100
            "p4": "0.75", // EnemyWarningDelayFromChannelStart
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "21 / 20 / 19 / 18 / 17",
            "cost": "60 / 75 / 90 / 105 / 120",
            "stats": {
                "사거리": "1000 / 1050 / 1100 / 1150 / 1200",
                "효과 범위": "275"
            }
        },
        "E": {
            "p1": "15 / 23 / 31 / 39 / 47", // GreyHealthRatio*100
            "p2": "2", // EnhancedThreshold
            "p3": "42 / 44 / 46 / 48 / 50", // GreyHealthRatioEnhanced*100
            "p4": "4", // OOCTimer
            "p5": "60 ~ 100% (레벨에 따라)", // GreyHealthHealingRatio
            "p6": "2.5", // ShieldDuration
            "p7": "최대 체력의 300%", // GreyHealthMaximum
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "3",
            "cost": "-",
            "stats": {
                "효과 범위": "2400",
                "시전시간": "0.25"
            }
        },
        "R": {
            "p1": "3", // EnemyDuration
            "p2": "100 / 250 / 400", // BaseDamage
            "p3": "15% (+ 주문력의 7%)", // PercentHPDamage
            "p4": "40", // SlowAmount*100
            "p5": "3", // AllyDuration
            "p6": "650 / 800 / 950 (+ 주문력의 100%)", // TotalShield
            "p7": "60", // AllySpeedAmount*100
            "p8": "2.5", // ShieldDecayPerSecond
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/tahmkench/hud/icons2d/tahmkenchr2.png"]
        },
    },
    "Trundle": { // 트런들
        "P": {
            "p1": "1.8 ~ 5.5% (레벨에 따라)", // RegenPercent
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "효과 범위": "1400"
            }
        },
        "Q": {
            "p1": "10 / 30 / 50 / 70 / 90 (+ 총 공격력의 115 / 125 / 135 / 145 / 155%)", // TotalDamage
            "p2": "75", // SlowAmount*100
            "p3": "5", // SapDebuffDuration
            "p4": "20 / 25 / 30 / 35 / 40", // BonusAD
            "p5": "10 / 12.5 / 15 / 17.5 / 20", // SappedAD*-1
            "p6": "25", // BonusRange
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "3.5",
            "cost": "20"
        },
        "W": {
            "p1": "8", // Duration
            "p2": "20 / 28 / 36 / 44 / 52", // MSBonus*100
            "p3": "30 / 45 / 60 / 75 / 90", // ASBonus*100
            "p4": "25", // HealingBonus*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "18 / 17 / 16 / 15 / 14",
            "cost": "40",
            "stats": {
                "사거리": "750",
                "효과 범위": "775"
            }
        },
        "E": {
            "p1": "6", // PillarDuration
            "p2": "34 / 38 / 42 / 46 / 50", // SlowAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "21 / 19.5 / 18 / 16.5 / 15",
            "cost": "75",
            "stats": {
                "사거리": "1000",
                "효과 범위": "360",
                "시전시간": "0.25",
                "투사체 속도": "1600"
            }
        },
        "R": {
            "p1": "5", // ActualDurationOfDrainBuff
            "p2": "20 / 25 / 30% (+ 주문력의 2%)", // TotalPercentHPDamage
            "p3": "40", // ArmorMRShred*100
            "p4": "4", // DurationOfDrainForTooltip
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": {
                "사거리": "650",
                "시전시간": "0.25",
                "투사체 속도": "1400"
            }
        },
    },
    "Tristana": { // 트리스타나
        "P": {
            "p1": "0 ~ 150 (레벨에 따라)", // BonusPassiveRange
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "7", // BuffDuration
            "p2": "60 / 75 / 90 / 105 / 120", // AttackSpeedMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "20 / 19 / 18 / 17 / 16",
            "cost": "15 / 20 / 25 / 30 / 35"
        },
        "W": {
            "p1": "70 / 105 / 140 / 175 / 210 (+ 추가 공격력의 100% + 주문력의 50%)", // LandingDamage
            "p2": "2", // SlowDuration
            "p3": "40", // SlowMod*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "22 / 20 / 18 / 16 / 14",
            "cost": "30 / 35 / 40 / 45 / 50",
            "stats": {
                "사거리": "900",
                "효과 범위": "350",
                "시전시간": "0.25",
                "돌진 속도": "1100"
            }
        },
        "E": {
            "p1": "45 / 60 / 75 / 90 / 105 (+ 주문력의 25%)", // PassiveDamage
            "p2": "4", // ActiveDuration
            "p3": "60 / 85 / 110 / 135 / 160 (+ 추가 공격력의 80% + 주문력의 50%)", // ActiveDamage
            "p4": "25", // ActivePerStackAmp*100
            "p5": "4", // ActiveMaxStacks
            "p6": "120 / 170 / 220 / 270 / 320 (+ 추가 공격력의 80% + 주문력의 100%)", // ActiveMaxDamage
            "p7": "40", // CritChanceModifier*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "16 / 15.5 / 15 / 14.5 / 14",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "사거리": "550",
                "효과 범위": "300",
                "투사체 속도": "2400"
            }
        },
        "R": {
            "p1": "225 / 275 / 325 (+ 추가 공격력의 70% + 주문력의 100%)", // DamageCalc
            "p2": "0.4 / 0.55 / 0.7", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "100",
            "cost": "100",
            "stats": {
                "사거리": "550",
                "효과 범위": "200",
                "시전시간": "0.25",
                "투사체 속도": "2000"
            }
        },
    },
    "Tryndamere": { // 트린다미어
        "P": {
            "p1": "0.5", // PassiveCritConversionTooltip
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "20 / 35 / 50 / 65 / 80", // MaximumBonusAD
            "p2": "30 / 40 / 50 / 60 / 70 (+ 주문력의 30%)", // BaseHeal
            "p3": "0.5 / 0.95 / 1.4 / 1.85 / 2.3 (+ 주문력의 1.2%)", // HealPerFury
            "p4": "30 / 40 / 50 / 60 / 70 (+ 주문력의 30% + 최대 마나의 100% x (0.5 / 0.95 / 1.4 / 1.85 / 2.3 + 주문력의 1.2%))", // MaximumHeal
            "p5": "10", // RemainingHealthThreshold*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12",
            "cost": "-"
        },
        "W": {
            "p1": "4", // ReductionDuration
            "p2": "20 / 35 / 50 / 65 / 80", // ADReduction*-1
            "p3": "3.25", // SlowDuration
            "p4": "30 / 35 / 40 / 45 / 50", // SlowPotency*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14",
            "cost": "-",
            "stats": {
                "효과 범위": "850",
                "시전시간": "0.3"
            }
        },
        "E": {
            "p1": "80 / 120 / 160 / 200 / 240 (+ 추가 공격력의 100% + 주문력의 80%)", // TotalDamage
            "p2": "2", // NonChampFuryGain
            "p3": "5", // ChampFuryGain
            "p4": "0.75", // NonChampCDRefund
            "p5": "1.5", // ChampCDRefund
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "-",
            "stats": {
                "사거리": "650",
                "효과 범위": "225",
                "스킬 폭": "320",
                "투사체 속도": "700"
            }
        },
        "R": {
            "p1": "5", // TryndRDuration
            "p2": "30 / 50 / 70", // TryndRMinHealth
            "p3": "50 / 75 / 100", // TryndRFuryGain
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
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
            "p1": "60 / 105 / 150 / 195 / 240 (+ 추가 공격력의 50% + 주문력의 85%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "6 / 5.75 / 5.5 / 5.25 / 5",
            "cost": "60 / 70 / 80 / 90 / 100",
            "stats": {
                "사거리": "1450",
                "스킬 폭": "80",
                "시전시간": "0.25",
                "투사체 속도": "1000"
            }
        },
        "W": {
            "p1": "40 / 60 / 80 / 100 / 120 (+ 총 공격력의 100% + 주문력의 100% + 치명타 확률의 57.5 x (40 / 60 / 80 / 100 / 120 + 총 공격력의 100% + 주문력의 100%)%)", // BlueDamage
            "p2": "70 / 90 / 110 / 130 / 150", // Effect6Amount
            "p3": "30 / 45 / 60 / 75 / 90 (+ 총 공격력의 100% + 주문력의 70% + 치명타 확률의 35 x (30 / 45 / 60 / 75 / 90 + 총 공격력의 100% + 주문력의 70%)%)", // RedDamage
            "p4": "30 / 35 / 40 / 45 / 50", // Effect2Amount
            "p5": "15 / 22.5 / 30 / 37.5 / 45 (+ 총 공격력의 100% + 주문력의 50% + 치명타 확률의 25 x (15 / 22.5 / 30 / 37.5 / 45 + 총 공격력의 100% + 주문력의 50%)%)", // GoldDamage
            "p6": "1 / 1.25 / 1.5 / 1.75 / 2", // Effect3Amount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "6",
            "cost": "50 / 55 / 60 / 65 / 70",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/twistedfate/hud/icons2d/cardmaster_blue.png", "https://raw.communitydragon.org/latest/game/assets/characters/twistedfate/hud/icons2d/cardmaster_red.png", "https://raw.communitydragon.org/latest/game/assets/spells/icons2d/cardmaster_gold.png"],
            "stats": {
                "효과 범위": "325"
            }
        },
        "E": {
            "p1": "15 / 25 / 35 / 45 / 55", // AttackSpeedBonus
            "p2": "65 / 90 / 115 / 140 / 165 (+ 추가 공격력의 20% + 주문력의 40%)", // BonusDamage
            "p3": "50", // TowerEffectiveness*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "0",
            "cost": "-"
        },
        "R": {
            "p1": "6 / 8 / 10", // Effect1Amount
            "p2": "5500", // Effect4Amount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "170 / 140 / 110",
            "cost": "100",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/spells/icons2d/cardmaster_premonition.png"],
            "stats": {
                "사거리": "5500",
                "효과 범위": "전역"
            }
        },
    },
    "Twitch": { // 트위치
        "P": {
            "p1": "6", // Duration
            "p2": "1 ~ 5 (레벨에 따라) (+ 주문력의 3%)", // DamagePerSecond
            "p3": "6", // MaxStacks
            "p4": "6 ~ 30 (레벨에 따라) (+ 주문력의 18%)", // DamagePerSecondMax
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "10 / 11 / 12 / 13 / 14", // StealthDuration
            "p2": "10", // MoveSpeedMod
            "p3": "30", // HiddenSpeed
            "p4": "6", // AttackSpeedDuration
            "p5": "40 / 45 / 50 / 55 / 60", // AttackSpeedMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "16",
            "cost": "40"
        },
        "W": {
            "p1": "3", // Duration
            "p2": "30 / 35 / 40 / 45 / 50 (+ 주문력의 6%)", // TotalSlowAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "70",
            "stats": {
                "사거리": "950",
                "효과 범위": "300",
                "시전시간": "0.25",
                "투사체 속도": "1750"
            }
        },
        "E": {
            "p1": "20 / 30 / 40 / 50 / 60", // BaseDamage
            "p2": "15 / 20 / 25 / 30 / 35 (+ 추가 공격력의 35%)", // PhysicalDamagePerStack
            "p3": "주문력의 35%", // MagicDamagePerStack
            "p4": "20 / 30 / 40 / 50 / 60 (+ 90 / 120 / 150 / 180 / 210 + 추가 공격력의 210%)", // MaxPhysicalDamage
            "p5": "주문력의 210%", // MaxMagicDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12 / 11 / 10 / 9 / 8",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "효과 범위": "1200",
                "시전시간": "0.25"
            }
        },
        "R": {
            "p1": "6", // Duration
            "p2": "300", // BonusRange
            "p3": "30 / 45 / 60", // BonusAD
            "p4": "10", // FallOffDamage*100
            "p5": "60", // MinimumFallOffDamage*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "90",
            "cost": "100",
            "stats": {
                "스킬 폭": "120",
                "투사체 속도": "5000"
            }
        },
    },
    "Teemo": { // 티모
        "P": {
            "p1": "1.5", // StealthCooldownDuration
            "p2": "5", // AttackSpeedDuration
            "p3": "20 ~ 80% (레벨에 따라)", // BonusAttackSpeed
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "2 / 2.25 / 2.5 / 2.75 / 3", // BlindDuration
            "p2": "80 / 125 / 170 / 215 / 260 (+ 주문력의 70%)", // CalculatedDamage
            "p3": "200", // MinionMonsterDurationMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "7",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "680",
                "시전시간": "0.25",
                "투사체 속도": "2500"
            }
        },
        "W": {
            "p1": "5", // PassiveCooldownOnDamageTaken
            "p2": "12 / 16 / 20 / 24 / 28", // PassiveMoveSpeedBonus*100
            "p3": "3", // ActiveMoveSpeedBuffDuration
            "p4": "24 / 32 / 40 / 48 / 56", // ActiveMoveSpeedBonus*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14",
            "cost": "40"
        },
        "E": {
            "p1": "9 / 23 / 37 / 51 / 65 (+ 주문력의 30% + 추가 공격력의 5%)", // ImpactCalculatedDamage
            "p2": "4", // PoisonDuration
            "p3": "24 / 48 / 72 / 96 / 120 (+ 주문력의 40% + 추가 공격력의 10%)", // TotalDotDamage
            "p4": "160", // MonsterMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "0",
            "cost": "-",
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
            "p6": "35 / 30 / 25", // AmmoRechargeTime
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "0.25",
            "cost": "75 / 55 / 35",
            "stats": {
                "사거리": "600 / 750 / 900",
                "효과 범위": "450",
                "스킬 폭": "240",
                "시전시간": "0.25",
                "투사체 속도": "1000"
            }
        },
    },
    "Pyke": { // 파이크
        "P": {
            "p1": "9% (+ 물리 관통력의 20%)", // OneEnemyCalc
            "p2": "40% (+ 물리 관통력의 40%)", // AdditionalBonusCalc
            "p3": "80 (+ 추가 공격력의 800%)", // DamageStorageMax
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "효과 범위": "1500"
            }
        },
        "Q": {
            "p1": "100 / 150 / 200 / 250 / 300 (+ 추가 공격력의 75%)", // TotalDamage
            "p2": "1", // SlowDuration
            "p3": "90", // SlowAmount*100
            "p4": "75", // ManaRefund*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "70 / 75 / 80 / 85 / 90",
            "stats": {
                "사거리": "400",
                "효과 범위": "550",
                "스킬 폭": "140",
                "시전시간": "0.25"
            }
        },
        "W": {
            "p1": "45 (+ 물리 관통력의 200%)", // MoveSpeed
            "p2": "5", // CamoDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14 / 13 / 12 / 11 / 10",
            "cost": "65",
            "stats": {
                "사거리": "600"
            }
        },
        "E": {
            "p1": "1.25 (+ 물리 관통력의 1%)", // StunDuration
            "p2": "100 / 150 / 200 / 250 / 300 (+ 추가 공격력의 100%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "15 / 14 / 13 / 12 / 11",
            "cost": "40",
            "stats": {
                "사거리": "550",
                "효과 범위": "110",
                "스킬 폭": "220",
                "시전시간": "0.275",
                "투사체 속도": "3000"
            }
        },
        "R": {
            "p1": "250 ~ 550 (레벨에 따라) (+ 추가 공격력의 80% + 물리 관통력의 150%)", // RDamage
            "p2": "125 ~ 275 (레벨에 따라) (+ 추가 공격력의 40% + 물리 관통력의 75%)", // ReducedDamageFinal
            "p3": "50", // ReducedDamage*100
            "p4": "20", // RRecastDuration
            "p5": "?", // f9
            "p6": "?", // f10
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "100 / 85 / 70",
            "cost": "100",
            "stats": {
                "사거리": "750",
                "효과 범위": "125",
                "시전시간": "0.5"
            }
        },
    },
    "Pantheon": { // 판테온
        "P": {
            "p1": "5", // ActionsToEmpower
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "70 / 100 / 130 / 160 / 190 (+ 추가 공격력의 115%)", // TapDamageCalc
            "p2": "60", // TapCooldownRefund*100
            "p3": "70 / 100 / 130 / 160 / 190 (+ 추가 공격력의 115% + 주문력의 50%)", // HoldDamageCalc
            "p4": "50", // DamageFalloff*100
            "p5": "20", // CritHealthThreshold*100
            "p6": "70 / 100 / 130 / 160 / 190 + 85 / 130 / 175 / 220 / 265 (+ 추가 공격력의 230%)", // ExecuteDamageCalcModified
            "p7": "20 ~ 240 (레벨에 따라) (+ 추가 공격력의 115%)", // EmpoweredDamageCalc
            "p8": "80", // MonsterDamageMod*100
            "p9": "70", // MinionDamageMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "11 / 10.25 / 9.5 / 8.75 / 8",
            "cost": "25",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/pantheon/hud/icons2d/pantheon_q2.png"],
            "stats": {
                "사거리": "575",
                "스킬 폭": "160",
                "시전시간": "0.2",
                "투사체 속도": "2700"
            }
        },
        "W": {
            "p1": "1", // StunDuration
            "p2": "6 / 6.5 / 7 / 7.5 / 8% (+ 추가 최대 체력의 0.4% + 주문력의 1.5%)", // MaxHealthDamageCalc
            "p3": "3", // EmpoweredNumHits
            "p4": "총 공격력의 40 ~ 55 (레벨에 따라)%", // EmpoweredDamageMultCalcModified
            "p5": "60", // MonsterDamageMin
            "p6": "150", // MonsterDamageCap
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "13 / 12 / 11 / 10 / 9",
            "cost": "55",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/pantheon/hud/icons2d/pantheon_w2.png"],
            "stats": {
                "사거리": "600"
            }
        },
        "E": {
            "p1": "1.5", // ShieldDuration
            "p2": "총 공격력의 100%", // DamageCalc
            "p3": "55 / 105 / 155 / 205 / 255 (+ 추가 공격력의 150%)", // ShieldDamageCalc
            "p4": "4", // ResistsDuration
            "p5": "5 ~ 30 (레벨에 따라) (+ 추가 최대 체력의 2.5%)", // ResistsCalc
            "p6": "1.5", // SpeedDuration
            "p7": "60", // SpeedAmount*100
            "p8": "50", // MinionDamageReduction*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "22 / 21 / 20 / 19 / 18",
            "cost": "80",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/pantheon/hud/icons2d/pantheon_e2.png"],
            "stats": {
                "사거리": "400",
                "효과 범위": "525",
                "시전시간": "0.25 (재사용)"
            }
        },
        "R": {
            "p1": "10 / 20 / 30", // ArmorPenetration*100
            "p2": "70 / 100 / 130 / 160 / 190 (+ 추가 공격력의 115% + 주문력의 50%)", // spell.PantheonQ:HoldDamageCalc
            "p3": "2", // SpearSlowDuration
            "p4": "50", // SpearSlow*100
            "p5": "300 / 500 / 700 (+ 주문력의 100%)", // DamageCalc
            "p6": "50", // EdgeDamageReduction*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "180 / 165 / 150",
            "cost": "100",
            "stats": {
                "사거리": "5500",
                "효과 범위": "450",
                "시전시간": "0.1"
            }
        },
    },
    "Fiddlesticks": { // 피들스틱
        "P": {
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "효과 범위": "900"
            }
        },
        "Q": {
            "p1": "1.2 / 1.4 / 1.6 / 1.8 / 2", // FearDuration
            "p2": "4 / 4.5 / 5 / 5.5 / 6% (+ 주문력의 3%)", // TotalPercentHealthDamage
            "p3": "8 / 9 / 10 / 11 / 12% (+ 주문력의 6%)", // TotalPercentHealthDamageFeared
            "p4": "40 / 60 / 80 / 100 / 120", // MinimumDamage
            "p5": "80 / 120 / 160 / 200 / 240", // MinimumDamage*2
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "15 / 14.5 / 14 / 13.5 / 13",
            "cost": "65",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/fiddlesticks/hud/icons2d/fiddlesticksq2.png"],
            "stats": {
                "사거리": "575",
                "시전시간": "0.35"
            }
        },
        "W": {
            "p1": "60 / 90 / 120 / 150 / 180 (+ 주문력의 45%)", // DrainDamageCalc
            "p2": "12 / 14.5 / 17 / 19.5 / 22", // PercentForTooltip
            "p3": "25 / 32.5 / 40 / 47.5 / 55", // VampPercentage
            "p4": "135", // MonsterDamageMod*100
            "p5": "45", // MonsterHealingMod*100
            "p6": "50", // MinionDamageMod*100
            "p7": "15", // MinionHealingMod
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10 / 9.5 / 9 / 8.5 / 8",
            "cost": "60 / 65 / 70 / 75 / 80",
            "stats": {
                "효과 범위": "650",
                "시전시간": "0.25"
            }
        },
        "E": {
            "p1": "70 / 105 / 140 / 175 / 210 (+ 주문력의 50%)", // Damage
            "p2": "1.25", // SilenceDuration
            "p3": "30 / 35 / 40 / 45 / 50", // SlowAmount*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "40 / 45 / 50 / 55 / 60",
            "stats": {
                "사거리": "850",
                "스킬 폭": "140",
                "시전시간": "0.4",
                "투사체 속도": "1800"
            }
        },
        "R": {
            "p1": "1.5", // ChannelTime
            "p2": "5", // Duration
            "p3": "750 / 1250 / 1750 (+ 주문력의 250%)", // TotalDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "140 / 110 / 80",
            "cost": "100",
            "stats": {
                "사거리": "800",
                "효과 범위": "600"
            }
        },
    },
    "Fiora": { // 피오라
        "P": {
            "p1": "3% (+ 추가 공격력의 4%)", // PassiveDamageTotal
            "p2": "30 / 40 / 50", // spell.FioraR:PercentMS*100
            "p3": "2", // MovementSpeedDuration
            "p4": "35 ~ 100 (레벨에 따라)", // PassiveHealAmount
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "효과 범위": "1200"
            }
        },
        "Q": {
            "p1": "70 / 80 / 90 / 100 / 110 (+ 추가 공격력의 90 / 95 / 100 / 105 / 110%)", // TotalDamage
            "p2": "50", // CDRefundPercent*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
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
            "p4": "50", // MSSlowPercent*-100
            "p5": "25", // AttackSlowPercent*-100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "24 / 22 / 20 / 18 / 16",
            "cost": "50",
            "stats": {
                "사거리": "750",
                "스킬 폭": "190",
                "투사체 속도": "3200"
            }
        },
        "E": {
            "p1": "50 / 60 / 70 / 80 / 90", // ASPercent*100
            "p2": "1", // SlowDuration
            "p3": "30", // SlowPercent*-100
            "p4": "160 / 170 / 180 / 190 / 200", // AttackTwopercentTAD*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "40"
        },
        "R": {
            "p1": "30 / 40 / 50", // PercentMS*100
            "p2": "12% (+ 추가 공격력의 16%)", // spell.FioraPassive:RDamageTotal
            "p3": "8", // MarkDuration
            "p4": "5", // HealDuration
            "p5": "75 / 100 / 125 (+ 추가 공격력의 60%)", // HealPerSecondCalc
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "110 / 90 / 70",
            "cost": "100",
            "stats": {
                "사거리": "500",
                "효과 범위": "550",
                "스킬 폭": "100"
            }
        },
    },
    "Fizz": { // 피즈
        "P": {
            "p1": "4 (+ 주문력의 1%)", // DamageReductionCalc
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "총 공격력의 100%", // TotalDamage
            "p2": "10 / 25 / 40 / 55 / 70 (+ 주문력의 55%)", // QDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
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
            "p8": "90", // BonusMonsterDamage
            "p9": "50", // TurretMod*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "7 / 6 / 5 / 4 / 3",
            "cost": "30 / 40 / 50 / 60 / 70"
        },
        "E": {
            "p1": "80 / 130 / 180 / 230 / 280 (+ 주문력의 95%)", // EDamage
            "p2": "2", // SlowDuration
            "p3": "40 / 45 / 50 / 55 / 60", // SlowAmount*100
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "16 / 14 / 12 / 10 / 8",
            "cost": "75 / 80 / 85 / 90 / 95",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/fizz/hud/icons2d/fizz_e2.png"],
            "stats": {
                "사거리": "400"
            }
        },
        "R": {
            "p1": "2", // DetonationTime
            "p2": "180 / 300 / 420 (+ 주문력의 60%)", // SmallSharkDamage
            "p3": "270 / 450 / 630 (+ 주문력의 90%)", // BigSharkDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": {
                "사거리": "1300",
                "스킬 폭": "300",
                "시전시간": "0.25",
                "투사체 속도": "1300"
            }
        },
    },
    "Heimerdinger": { // 하이머딩거
        "P": {
            "p1": "20", // MovementSpeed.0*100
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "효과 범위": "300"
            }
        },
        "Q": {
            "p1": "3", // MaxTurrets
            "p2": "3", // MaxKits
            "p3": "130 ~ 640 (레벨에 따라) (+ 주문력의 5 ~ 45 (레벨에 따라)%)", // TurretHealth
            "p4": "7 / 11 / 15 / 19 / 23 (+ 주문력의 35%)", // Damage
            "p5": "40 / 60 / 80 / 100 / 120 (+ 주문력의 55%)", // DamageBeam
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "부품 재충전 대기시간 20초 (재사용 1초)",
            "cost": "포탑 부품 1 + 마나 20",
            "stats": {
                "사거리": "350",
                "투사체 속도": "1450"
            }
        },
        "W": {
            "p1": "5", // Rockets
            "p2": "50 / 75 / 100 / 125 / 150 (+ 주문력의 55%)", // Damage
            "p3": "90 / 135 / 180 / 225 / 270 (+ 주문력의 103%)", // TotalDamage
            "p4": "10 / 15 / 20 / 25 / 30 (+ 주문력의 12%)", // ExtraHitDamage
            "p5": "30 / 45 / 60 / 75 / 90 (+ 주문력의 36%)", // ExtraHitDamageMinions
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "11 / 10 / 9 / 8 / 7",
            "cost": "50 / 60 / 70 / 80 / 90",
            "stats": {
                "사거리": "1325",
                "스킬 폭": "400",
                "시전시간": "0.25",
                "투사체 속도": "1200"
            }
        },
        "E": {
            "p1": "60 / 100 / 140 / 180 / 220 (+ 주문력의 60%)", // Damage
            "p2": "2", // SlowDuration
            "p3": "35", // SlowPercent.0*100
            "p4": "1.5", // StunDuration
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "11",
            "cost": "85",
            "stats": {
                "사거리": "970",
                "스킬 폭": "240",
                "시전시간": "0.25",
                "투사체 속도": "2500"
            }
        },
        "R": {
            "p1": "80 / 100 / 120 (+ 주문력의 35%)", // QUltDamage
            "p2": "100 / 140 / 180 (+ 주문력의 70%)", // QUltDamageBeam
            "p3": "135 / 180 / 225 (+ 주문력의 45%)", // WUltDamage
            "p4": "503 / 697.5 / 892 (+ 주문력의 183%)", // WUltTotalDamage
            "p5": "100 / 200 / 300 (+ 주문력의 60%)", // EUltDamage
            "p6": "725 ~ 1525 (레벨에 따라) (+ 주문력의 50%)", // QUltTurretHealth
            "p7": "30 ~ 90 (레벨에 따라)", // RQTurretResists
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "100 / 85 / 70",
            "cost": "100",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/heimerdinger/hud/icons2d/heimerdinger_q2.png", "https://raw.communitydragon.org/latest/game/assets/characters/heimerdinger/hud/icons2d/heimerdinger_w2.png", "https://raw.communitydragon.org/latest/game/assets/characters/heimerdinger/hud/icons2d/heimerdinger_e2.png"]
        },
    },
    "Hecarim": { // 헤카림
        "P": {
            "p1": "추가 이동 속도의 12 ~ 24 (레벨에 따라)%", // BonusAD
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "p1": "60 / 90 / 120 / 150 / 180 (+ 추가 공격력의 90%)", // Damage
            "p2": "8", // BuffDuration
            "p3": "3 (+ 추가 공격력의 3%)", // RampageBonusDamagePerc
            "p4": "0.75", // RampageCooldownReduction
            "p5": "3", // MaxStacks
            "p6": "36 / 54 / 72 / 90 / 108 (+ 추가 공격력의 54%)", // MinionDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "4",
            "cost": "28 / 26 / 24 / 22 / 20",
            "stats": {
                "사거리": "350",
                "효과 범위": "375"
            }
        },
        "W": {
            "p1": "4", // BuffDuration
            "p2": "80 / 120 / 160 / 200 / 240 (+ 주문력의 80%)", // TotalDamage
            "p3": "5 / 10 / 15 / 20 / 25", // ResistAmount
            "p4": "25", // LeechAmount
            "p5": "12.5", // AllyTooltipLeachValue
            "p6": "120 / 150 / 180 / 210 / 240", // MinionHealCap
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "14",
            "cost": "50 / 55 / 60 / 65 / 70",
            "stats": {
                "효과 범위": "525"
            }
        },
        "E": {
            "p1": "25", // MinMoveSpeed*100
            "p2": "4", // Duration
            "p3": "65", // MaxMoveSpeed*100
            "p4": "30 / 45 / 60 / 75 / 90 (+ 추가 공격력의 50%)", // MinDamage
            "p5": "60 / 90 / 120 / 150 / 180 (+ 추가 공격력의 100%)", // MaxDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "20 / 19 / 18 / 17 / 16",
            "cost": "60"
        },
        "R": {
            "p1": "150 / 250 / 350 (+ 주문력의 100%)", // DamageDone
            "p2": "0.75", // FearDurationMin
            "p3": "1.5", // FearDurationMax
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "140 / 120 / 100",
            "cost": "100",
            "stats": {
                "사거리": "1000",
                "효과 범위": "315",
                "스킬 폭": "400",
                "투사체 속도": "1100",
                "돌진 속도": "1100"
            }
        },
    },
    "Hwei": { // 흐웨이
        "P": {
            "p1": "4", // Duration
            "p2": "40 ~ 285 (레벨에 따라) (+ 주문력의 35%)", // TotalDamage
            "cooldown": "-",
            "cost": "-",
            "stats": {
                "효과 범위": "285"
            }
        },
        "Q": {
            "p1": "50 / 80 / 110 / 140 / 170 (+ 주문력의 80%)", // Tooltip_QQDamage
            "p2": "3 / 4 / 5 / 6 / 7", // Tooltip_QQBonusDamage
            "p3": "60 / 85 / 110 / 135 / 160 (+ 주문력의 30%)", // Tooltip_QWDamage
            "p4": "120 / 201.875 / 302.5 / 421.875 / 560 (+ 주문력의 60 / 71.25 / 82.5 / 93.75 / 105%)", // Tooltip_QWBonusDamage
            "p5": "20 / 35 / 50 / 65 / 80 (+ 주문력의 30%)", // Tooltip_QEDamage
            "p6": "2.5", // spell.HweiQE:Duration
            "p7": "20 / 35 / 50 / 65 / 80 (+ 주문력의 24%)", // Tooltip_QEDamagePerSecond
            "p8": "35", // spell.HweiQE:SlowPercent
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "10 / 9 / 8 / 7 / 6",
            "cost": "80 / 90 / 100 / 110 / 120",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/hwei/hud/icons2d/hweiqq.png", "https://raw.communitydragon.org/latest/game/assets/characters/hwei/hud/icons2d/hweiqw.png", "https://raw.communitydragon.org/latest/game/assets/characters/hwei/hud/icons2d/hweiqe.png"],
            "stats": {
                "시전시간": "0.25"
            }
        },
        "W": {
            "p1": "30 / 32.5 / 35 / 37.5 / 40% (+ 주문력의 3%)", // Tooltip_WQMoveSpeed
            "p2": "100 / 140 / 180 / 220 / 260 (+ 주문력의 60%)", // Tooltip_WWShieldAmount
            "p3": "15", // spell.HweiWW:ToolTipAllyMod*100
            "p4": "20 / 30 / 40 / 50 / 60 (+ 주문력의 15%)", // Tooltip_WEOnHitDamage
            "p5": "45 / 50 / 55 / 60 / 65", // Tooltip_WEOnHitManaRestore
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "18 / 17.5 / 17 / 16.5 / 16",
            "cost": "90 / 95 / 100 / 105 / 110",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/hwei/hud/icons2d/hweiwq.png", "https://raw.communitydragon.org/latest/game/assets/characters/hwei/hud/icons2d/hweiww.png", "https://raw.communitydragon.org/latest/game/assets/characters/hwei/hud/icons2d/hweiwe.png"],
            "stats": {
                "시전시간": "0.25"
            }
        },
        "E": {
            "p1": "70 / 110 / 150 / 190 / 230 (+ 주문력의 65%)", // Tooltip_EQDamage
            "p2": "1 / 1.125 / 1.25 / 1.375 / 1.5", // Tooltip_EQFleeDuration
            "p3": "1.2 / 1.4 / 1.6 / 1.8 / 2", // Tooltip_EWRootDuration
            "p4": "70 / 110 / 150 / 190 / 230 (+ 주문력의 65%)", // Tooltip_EWDamage
            "p5": "70 / 110 / 150 / 190 / 230 (+ 주문력의 65%)", // Tooltip_EEDamage
            "p6": "40 / 47.5 / 55 / 62.5 / 70", // Tooltip_EESlowAmount
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "12 / 11.5 / 11 / 10.5 / 10",
            "cost": "50 / 55 / 60 / 65 / 70",
            "icons": ["https://raw.communitydragon.org/latest/game/assets/characters/hwei/hud/icons2d/hweieq.png", "https://raw.communitydragon.org/latest/game/assets/characters/hwei/hud/icons2d/hweiew.png", "https://raw.communitydragon.org/latest/game/assets/characters/hwei/hud/icons2d/hweiee.png"],
            "stats": {
                "시전시간": "0.25"
            }
        },
        "R": {
            "p1": "3", // Duration
            "p2": "10", // SlowPercentPerStack
            "p3": "10 / 20 / 30 (+ 주문력의 5%)", // DamageOverTime
            "p4": "200 / 325 / 450 (+ 주문력의 80%)", // Damage
            "p5": "200 / 325 / 450 + 30 / 60 / 90 (+ 주문력의 95%)", // TotalMaxDamage
            "v1": "", // 구분선 아래 피해량 줄 (직접 작성),
            "v2": "",
            "cooldown": "120 / 100 / 80",
            "cost": "100",
            "stats": {
                "사거리": "1300",
                "효과 범위": "500",
                "스킬 폭": "180",
                "시전시간": "0.25",
                "투사체 속도": "1400"
            }
        },
    },
};
