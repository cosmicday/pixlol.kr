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
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Gangplank": { // 갱플랭크
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Gragas": { // 그라가스
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Graves": { // 그레이브즈
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Gwen": { // 그웬
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },

    // [ㄴ]
    "Gnar": { // 나르
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Nami": { // 나미
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Nasus": { // 나서스
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Naafiri": { // 나피리
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Nautilus": { // 노틸러스
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Nocturne": { // 녹턴
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Nunu": { // 누누와 윌럼프
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Nidalee": { // 니달리
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Neeko": { // 니코
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Nilah": { // 닐라
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },

    // [ㄷ]
    "Darius": { // 다리우스
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Diana": { // 다이애나
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Draven": { // 드레이븐
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },

    // [ㄹ]
    "Ryze": { // 라이즈
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Rakan": { // 라칸
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Rammus": { // 람머스
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Lux": { // 럭스
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Rumble": { // 럼블
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Renata": { // 레나타 글라스크
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Renekton": { // 레넥톤
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Leona": { // 레오나
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "RekSai": { // 렉사이
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Rell": { // 렐
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Rengar": { // 렝가
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Lucian": { // 루시안
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Lulu": { // 룰루
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Leblanc": { // 르블랑
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "LeeSin": { // 리 신
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Riven": { // 리븐
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Lissandra": { // 리산드라
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Lillia": { // 릴리아
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },

    // [ㅁ]
    "MasterYi": { // 마스터 이
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Maokai": { // 마오카이
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Malzahar": { // 말자하
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Malphite": { // 말파이트
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Mel": { // 멜
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Mordekaiser": { // 모데카이저
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Morgana": { // 모르가나
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "DrMundo": { // 문도 박사
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "MissFortune": { // 미스 포츈
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Milio": { // 밀리오
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },

    // [ㅂ]
    "Bard": { // 바드
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Varus": { // 바루스
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Vi": { // 바이
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Veigar": { // 베이가
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Vayne": { // 베인
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Vex": { // 벡스
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Belveth": { // 벨베스
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Velkoz": { // 벨코즈
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Volibear": { // 볼리베어
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Braum": { // 브라움
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Brand": { // 브랜드
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Briar": { // 브라이어
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Vladimir": { // 블라디미르
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Blitzcrank": { // 블리츠크랭크
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Viego": { // 비에고
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Viktor": { // 빅토르
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Poppy": { // 뽀삐
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },

    // [ㅅ]
    "Samira": { // 사미라
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Sion": { // 사이온
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Sylas": { // 사일러스
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Shaco": { // 샤코
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Senna": { // 세나
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Seraphine": { // 세라핀
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Sejuani": { // 세주아니
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Sett": { // 세트
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Sona": { // 소나
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Soraka": { // 소라카
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Shen": { // 쉔
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Shyvana": { // 쉬바나
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Smolder": { // 스몰더
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Swain": { // 스웨인
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Skarner": { // 스카너
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Sivir": { // 시비르
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "XinZhao": { // 신 짜오
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Syndra": { // 신드라
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Singed": { // 신지드
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Thresh": { // 쓰레쉬
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },

    // [ㅇ]
    "Ahri": { // 아리
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Amumu": { // 아무무
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "AurelionSol": { // 아우렐리온 솔
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Ivern": { // 아이번
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Azir": { // 아지르
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Akali": { // 아칼리
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Akshan": { // 아크샨
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Aatrox": { // 아트록스
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Aphelios": { // 아펠리오스
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Alistar": { // 알리스타
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Ambessa": { // 암베사
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Annie": { // 애니
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Anivia": { // 애니비아
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Ashe": { // 애쉬
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Yasuo": { // 야스오
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Ekko": { // 에코
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Elise": { // 엘리스
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "MonkeyKing": { // 오공
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Aurora": { // 오로라
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Ornn": { // 오른
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Orianna": { // 오리아나
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Olaf": { // 올라프
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Yone": { // 요네
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Yorick": { // 요릭
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Udyr": { // 우디르
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Urgot": { // 우르곳
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Warwick": { // 워윅
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Yunara": { // 유나라
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Yuumi": { // 유미
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Irelia": { // 이렐리아
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Evelynn": { // 이블린
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Ezreal": { // 이즈리얼
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Illaoi": { // 일라오이
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },

    // [ㅈ]
    "JarvanIV": { // 자르반 4세
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Xayah": { // 자야
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Zyra": { // 자이라
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Zac": { // 자크
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Zaahen": { // 자헨
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Janna": { // 잔나
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Jax": { // 잭스
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Zed": { // 제드
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Xerath": { // 제라스
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Zeri": { // 제리
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Jayce": { // 제이스
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Zoe": { // 조이
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Ziggs": { // 직스
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Jhin": { // 진
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Zilean": { // 질리언
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Jinx": { // 징크스
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },

    // [ㅊ, ㅋ]
    "Chogath": { // 초가스
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Karma": { // 카르마
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Camille": { // 카미유
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Kassadin": { // 카사딘
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Karthus": { // 카서스
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Cassiopeia": { // 카시오페아
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Kaisa": { // 카이사
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Khazix": { // 카직스
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Katarina": { // 카타리나
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Kalista": { // 칼리스타
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Kennen": { // 케넨
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Caitlyn": { // 케이틀린
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Kayn": { // 케인
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Kayle": { // 케일
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "KogMaw": { // 코그모
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Corki": { // 코르키
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Quinn": { // 퀸
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "KSante": { // 크산테
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Kled": { // 클레드
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Qiyana": { // 키아나
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Kindred": { // 킨드레드
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },

    // [ㅌ, ㅍ, ㅎ]
    "Taric": { // 타릭
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Talon": { // 탈론
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Taliyah": { // 탈리야
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "TahmKench": { // 탐 켄치
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Trundle": { // 트런들
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Tristana": { // 트리스타나
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Tryndamere": { // 트린다미어
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "TwistedFate": { // 트위스티드 페이트
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Twitch": { // 트위치
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Teemo": { // 티모
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Pyke": { // 파이크
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Pantheon": { // 판테온
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Fiddlesticks": { // 피들스틱
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Fiora": { // 피오라
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Fizz": { // 피즈
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Heimerdinger": { // 하이머딩거
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Hecarim": { // 헤카림
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    },
    "Hwei": { // 흐웨이
        "P": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "Q": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "W": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "E": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        },
        "R": {
            "v1": "",
            "v2": "",
            "v3": "",
            "cooldown": "",
            "cost": "",
            "stats": {
                "범위": null,
                "시전시간": null
            }
        }
    }
};