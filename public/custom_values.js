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
    // [ㄱ]
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
    },
    "Gangplank": { // 갱플랭크
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Gragas": { // 그라가스
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Graves": { // 그레이브즈
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Gwen": { // 그웬
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },

    // [ㄴ]
    "Gnar": { // 나르
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Nami": { // 나미
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Nasus": { // 나서스
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Naafiri": { // 나피리
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Nautilus": { // 노틸러스
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Nocturne": { // 녹턴
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Nunu": { // 누누와 윌럼프
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Nidalee": { // 니달리
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Neeko": { // 니코
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Nilah": { // 닐라
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },

    // [ㄷ]
    "Darius": { // 다리우스
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Diana": { // 다이애나
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Draven": { // 드레이븐
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },

    // [ㄹ]
    "Ryze": { // 라이즈
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Rakan": { // 라칸
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Rammus": { // 람머스
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Lux": { // 럭스
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Rumble": { // 럼블
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Renata": { // 레나타 글라스크
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Renekton": { // 레넥톤
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Leona": { // 레오나
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "RekSai": { // 렉사이
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Rell": { // 렐
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Rengar": { // 렝가
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Lucian": { // 루시안
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Lulu": { // 룰루
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Leblanc": { // 르블랑
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "LeeSin": { // 리 신
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Riven": { // 리븐
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Lissandra": { // 리산드라
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Lillia": { // 릴리아
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },

    // [ㅁ]
    "MasterYi": { // 마스터 이
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Maokai": { // 마오카이
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Malzahar": { // 말자하
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Malphite": { // 말파이트
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Mel": { // 멜
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Mordekaiser": { // 모데카이저
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Morgana": { // 모르가나
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "DrMundo": { // 문도 박사
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "MissFortune": { // 미스 포츈
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Milio": { // 밀리오
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },

    // [ㅂ]
    "Bard": { // 바드
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Varus": { // 바루스
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Vi": { // 바이
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Veigar": { // 베이가
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Vayne": { // 베인
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Vex": { // 벡스
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Belveth": { // 벨베스
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Velkoz": { // 벨코즈
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Volibear": { // 볼리베어
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Braum": { // 브라움
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Brand": { // 브랜드
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Briar": { // 브라이어
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Vladimir": { // 블라디미르
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Blitzcrank": { // 블리츠크랭크
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Viego": { // 비에고
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Viktor": { // 빅토르
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Poppy": { // 뽀삐
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },

    // [ㅅ]
    "Samira": { // 사미라
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Sion": { // 사이온
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Sylas": { // 사일러스
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Shaco": { // 샤코
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Senna": { // 세나
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Seraphine": { // 세라핀
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Sejuani": { // 세주아니
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Sett": { // 세트
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Sona": { // 소나
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Soraka": { // 소라카
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Shen": { // 쉔
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Shyvana": { // 쉬바나
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Smolder": { // 스몰더
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Swain": { // 스웨인
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Skarner": { // 스카너
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Sivir": { // 시비르
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "XinZhao": { // 신 짜오
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Syndra": { // 신드라
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Singed": { // 신지드
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Thresh": { // 쓰레쉬
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },

    // [ㅇ]
    "Ahri": { // 아리
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Amumu": { // 아무무
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "AurelionSol": { // 아우렐리온 솔
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Ivern": { // 아이번
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Azir": { // 아지르
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Akali": { // 아칼리
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Akshan": { // 아크샨
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Aatrox": { // 아트록스
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Aphelios": { // 아펠리오스
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Alistar": { // 알리스타
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Ambessa": { // 암베사
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Annie": { // 애니
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Anivia": { // 애니비아
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Ashe": { // 애쉬
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Yasuo": { // 야스오
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Ekko": { // 에코
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Elise": { // 엘리스
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "MonkeyKing": { // 오공
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Aurora": { // 오로라
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Ornn": { // 오른
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Orianna": { // 오리아나
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Olaf": { // 올라프
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Yone": { // 요네
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Yorick": { // 요릭
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Udyr": { // 우디르
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Urgot": { // 우르곳
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Warwick": { // 워윅
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Yunara": { // 유나라
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Yuumi": { // 유미
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Irelia": { // 이렐리아
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Evelynn": { // 이블린
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Ezreal": { // 이즈리얼
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Illaoi": { // 일라오이
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },

    // [ㅈ]
    "JarvanIV": { // 자르반 4세
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Xayah": { // 자야
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Zyra": { // 자이라
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Zac": { // 자크
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Zaahen": { // 자헨
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Janna": { // 잔나
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Jax": { // 잭스
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Zed": { // 제드
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Xerath": { // 제라스
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Zeri": { // 제리
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Jayce": { // 제이스
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Zoe": { // 조이
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Ziggs": { // 직스
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Jhin": { // 진
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Zilean": { // 질리언
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Jinx": { // 징크스
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },

    // [ㅊ, ㅋ]
    "Chogath": { // 초가스
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Karma": { // 카르마
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Camille": { // 카미유
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Kassadin": { // 카사딘
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Karthus": { // 카서스
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Cassiopeia": { // 카시오페아
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Kaisa": { // 카이사
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Khazix": { // 카직스
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Katarina": { // 카타리나
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Kalista": { // 칼리스타
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Kennen": { // 케넨
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Caitlyn": { // 케이틀린
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Kayn": { // 케인
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Kayle": { // 케일
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "KogMaw": { // 코그모
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Corki": { // 코르키
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Quinn": { // 퀸
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "KSante": { // 크산테
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Kled": { // 클레드
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Qiyana": { // 키아나
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Kindred": { // 킨드레드
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },

    // [ㅌ, ㅍ, ㅎ]
    "Taric": { // 타릭
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Talon": { // 탈론
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Taliyah": { // 탈리야
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "TahmKench": { // 탐 켄치
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Trundle": { // 트런들
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Tristana": { // 트리스타나
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Tryndamere": { // 트린다미어
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "TwistedFate": { // 트위스티드 페이트
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Twitch": { // 트위치
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Teemo": { // 티모
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Pyke": { // 파이크
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Pantheon": { // 판테온
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Fiddlesticks": { // 피들스틱
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Fiora": { // 피오라
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Fizz": { // 피즈
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Heimerdinger": { // 하이머딩거
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Hecarim": { // 헤카림
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    },
    "Hwei": { // 흐웨이
        "P": {
            "v1": "",
            "v2": "",
            "cooldown": "",
            "cost": "",
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
    }
};