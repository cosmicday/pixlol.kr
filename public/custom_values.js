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
            "v1": "<span style='color:'>1.5 ~ 10.1% (레벨에 따라)</span>" +
                drawGraph("1", "#2ecc71", [
                    1.5, 1.7, 1.9, 2.1, 2.3, 2.5, // 1~6렙
                    3.3, 4.1, 4.9, 5.7, 6.5, 7.3, 8.1, // 7~13렙
                    8.5, 8.9, 9.3, 9.7, 10.1 // 14~18렙
                ]),
            "cooldown": "-",
            "cost": "-"
        },
        "Q": {
            "v1": "<span style='color:'>1.4/1.95/2.5/3.05/3.6</span>",
            "v2": "<span style='color:'>30/60/90/120/150 + 공격력 150%</span>",
            "cooldown": "8",
            "cost": "-"
        },
        "W": {
            "v1": "<span style='color:'>25/29/33/37/41%</span>",
            "v2": "<span style='color:'>65/85/105/125/145 + 추가 체력의 18%</span>",
            "cooldown": "22 / 19.5 / 17 / 14.5 / 12",
            "cost": "-"
        },
        "E": {
            "v1": "<span style='color:'>4/7/10/13/16 + 공격력 40/43/46/49/52%</span>",
            "v2": "<span style='color:'>130%</span>",
            "cooldown": "9 / 8.25 / 7.5 / 6.75 / 6",
            "cost": "-",
            "stats": {
                "범위": 325
            },
            "img2": "/icons/garen_e.png"
        },
        "R": {
            "v1": "<span style='color:'>150/250/350 + 잃은 체력의 25/30/35%</span>",
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
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Gangplank": { // 갱플랭크
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Gragas": { // 그라가스
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Graves": { // 그레이브즈
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Gwen": { // 그웬
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },

    // [ㄴ]
    "Gnar": { // 나르
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Nami": { // 나미
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Nasus": { // 나서스
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Naafiri": { // 나피리
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Nautilus": { // 노틸러스
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Nocturne": { // 녹턴
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Nunu": { // 누누와 윌럼프
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Nidalee": { // 니달리
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Neeko": { // 니코
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Nilah": { // 닐라
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },

    // [ㄷ]
    "Darius": { // 다리우스
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Diana": { // 다이애나
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Draven": { // 드레이븐
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },

    // [ㄹ]
    "Ryze": { // 라이즈
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Rakan": { // 라칸
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Rammus": { // 람머스
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Lux": { // 럭스
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Rumble": { // 럼블
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Renata": { // 레나타 글라스크
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Renekton": { // 레넥톤
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Leona": { // 레오나
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "RekSai": { // 렉사이
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Rell": { // 렐
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Rengar": { // 렝가
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Lucian": { // 루시안
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Lulu": { // 룰루
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Leblanc": { // 르블랑
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "LeeSin": { // 리 신
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Riven": { // 리븐
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Lissandra": { // 리산드라
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Lillia": { // 릴리아
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },

    // [ㅁ]
    "MasterYi": { // 마스터 이
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Maokai": { // 마오카이
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Malzahar": { // 말자하
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Malphite": { // 말파이트
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Mel": { // 멜
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Mordekaiser": { // 모데카이저
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Morgana": { // 모르가나
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "DrMundo": { // 문도 박사
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "MissFortune": { // 미스 포츈
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Milio": { // 밀리오
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },

    // [ㅂ]
    "Bard": { // 바드
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Varus": { // 바루스
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Vi": { // 바이
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Veigar": { // 베이가
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Vayne": { // 베인
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Vex": { // 벡스
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Belveth": { // 벨베스
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Velkoz": { // 벨코즈
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Volibear": { // 볼리베어
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Braum": { // 브라움
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Brand": { // 브랜드
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Briar": { // 브라이어
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Vladimir": { // 블라디미르
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Blitzcrank": { // 블리츠크랭크
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Viego": { // 비에고
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Viktor": { // 빅토르
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Poppy": { // 뽀삐
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },

    // [ㅅ]
    "Samira": { // 사미라
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Sion": { // 사이온
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Sylas": { // 사일러스
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Shaco": { // 샤코
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Senna": { // 세나
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Seraphine": { // 세라핀
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Sejuani": { // 세주아니
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Sett": { // 세트
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Sona": { // 소나
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Soraka": { // 소라카
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Shen": { // 쉔
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Shyvana": { // 쉬바나
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Smolder": { // 스몰더
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Swain": { // 스웨인
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Skarner": { // 스카너
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Sivir": { // 시비르
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "XinZhao": { // 신 짜오
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Syndra": { // 신드라
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Singed": { // 신지드
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Thresh": { // 쓰레쉬
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },

    // [ㅇ]
    "Ahri": { // 아리
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Amumu": { // 아무무
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "AurelionSol": { // 아우렐리온 솔
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Ivern": { // 아이번
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Azir": { // 아지르
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Akali": { // 아칼리
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Akshan": { // 아크샨
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Aatrox": { // 아트록스
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Aphelios": { // 아펠리오스
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Alistar": { // 알리스타
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Ambessa": { // 암베사
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Annie": { // 애니
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Anivia": { // 애니비아
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Ashe": { // 애쉬
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Yasuo": { // 야스오
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Ekko": { // 에코
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Elise": { // 엘리스
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "MonkeyKing": { // 오공
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Aurora": { // 오로라
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Ornn": { // 오른
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Orianna": { // 오리아나
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Olaf": { // 올라프
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Yone": { // 요네
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Yorick": { // 요릭
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Udyr": { // 우디르
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Urgot": { // 우르곳
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Warwick": { // 워윅
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Yunara": { // 유나라
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Yuumi": { // 유미
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Irelia": { // 이렐리아
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Evelynn": { // 이블린
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Ezreal": { // 이즈리얼
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Illaoi": { // 일라오이
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },

    // [ㅈ]
    "JarvanIV": { // 자르반 4세
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Xayah": { // 자야
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Zyra": { // 자이라
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Zac": { // 자크
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Jahen": { // 자헨
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Janna": { // 잔나
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Jax": { // 잭스
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Zed": { // 제드
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Xerath": { // 제라스
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Zeri": { // 제리
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Jayce": { // 제이스
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Zoe": { // 조이
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Ziggs": { // 직스
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Jhin": { // 진
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Zilean": { // 질리언
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Jinx": { // 징크스
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },

    // [ㅊ, ㅋ]
    "Chogath": { // 초가스
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Karma": { // 카르마
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Camille": { // 카미유
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Kassadin": { // 카사딘
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Karthus": { // 카서스
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Cassiopeia": { // 카시오페아
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Kaisa": { // 카이사
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Khazix": { // 카직스
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Katarina": { // 카타리나
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Kalista": { // 칼리스타
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Kennen": { // 케넨
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Caitlyn": { // 케이틀린
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Kayn": { // 케인
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Kayle": { // 케일
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "KogMaw": { // 코그모
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Corki": { // 코르키
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Quinn": { // 퀸
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "KSante": { // 크산테
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Kled": { // 클레드
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Qiyana": { // 키아나
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Kindred": { // 킨드레드
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },

    // [ㅌ, ㅍ, ㅎ]
    "Taric": { // 타릭
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Talon": { // 탈론
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Taliyah": { // 탈리야
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "TahmKench": { // 탐 켄치
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Trundle": { // 트런들
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Tristana": { // 트리스타나
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Tryndamere": { // 트린다미어
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "TwistedFate": { // 트위스티드 페이트
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Twitch": { // 트위치
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Teemo": { // 티모
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Pyke": { // 파이크
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Pantheon": { // 판테온
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Fiddlesticks": { // 피들스틱
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Fiora": { // 피오라
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Fizz": { // 피즈
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Heimerdinger": { // 하이머딩거
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Hecarim": { // 헤카림
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    },
    "Hwei": { // 흐웨이
        "P": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "Q": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "W": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "E": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        },
        "R": {
            "v1": "<span style='color:'></span>",
            "v2": "<span style='color:'></span>",
            "v3": "<span style='color:'></span>"
        }
    }
};