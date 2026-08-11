// ============================================================
//  survey_belowline.js  (확인 전용 — 아무 파일도 안 고친다)
//
//  구분선 아래 작은 회색 글씨가 **실제로 화면에 뭐라고 나가는지** 보고서로 찍는다.
//
//      node survey_belowline.js            # 화면에 출력
//      node survey_belowline.js --write    # 회색글씨_적용보고.md 로 저장
//
//  ★ bin 을 다시 훑지 않는다. `public/custom_templates.js` 의 `"<슬롯>_rules"` 와
//    `custom_values.js` 의 값을 그대로 읽어 채운다.
//    bin 을 여기서 또 훑으면 `belowline.js` 와 로직이 갈려서 숫자가 안 맞는다
//    (예전 판이 그랬다 — 여기선 `spellNames`, 모듈은 `spells` 를 봐서 1자리 차이가 났다).
//    **"무엇이 나가는가" 는 나가는 파일에게 물어보는 게 맞다.**
//
//  회색 글씨 자체가 어디서 오는지는 `belowline.js` 주석 참고.
// ============================================================

const fs = require('fs');
const path = require('path');

const PUB = path.join(__dirname, 'public');
const OUT = path.join(__dirname, '회색글씨_적용보고.md');
const WRITE = process.argv.includes('--write');

function load(file, name) {
    const s = fs.readFileSync(path.join(PUB, file), 'utf8');
    const i = s.indexOf('const ' + name);
    if (i === -1) throw new Error(`${file} 에서 ${name} 을 못 찾음`);
    return eval('(' + s.slice(s.indexOf('{', i)).replace(/;\s*$/, '') + ')');
}

const T = load('custom_templates.js', 'customTemplates');
const V = load('custom_values.js', 'customValues');

// 한글 이름은 템플릿 파일의 `"Key": { // 한글이름` 주석에서 뽑는다.
//   ★ 줄을 /\r?\n/ 로 자를 것. 이 파일은 CRLF 이고 JS 정규식의 `.`/`$` 는 '\r' 을 안 먹는다.
const ko = {};
for (const l of fs.readFileSync(path.join(PUB, 'custom_templates.js'), 'utf8').split(/\r?\n/)) {
    const m = l.match(/^ {4}"([A-Za-z0-9'. ]+)": \{ \/\/ (.+)$/);
    if (m) ko[m[1]] = m[2].trim();
}

const rows = [];
for (const ch of Object.keys(T)) {
    for (const k of Object.keys(T[ch])) {
        if (!/_rules$/.test(k)) continue;
        const slot = k.replace('_rules', '');
        const v = (V[ch] || {})[slot] || {};
        const tpl = String(T[ch][k]);

        // app.js 의 가드와 같은 판정: 값이 비었거나 ? 면 회색 글씨만 숨긴다
        const hidden = (tpl.match(/\{p\d+\}/g) || []).some(p => {
            const key = p.slice(1, -1);
            return !(key in v) || v[key] === '' || String(v[key]).includes('?');
        });

        let filled = tpl;
        for (const key in v) filled = filled.split('{' + key + '}').join(v[key]);
        const plain = filled
            .replace(/<br\s*\/?>/gi, ' / ')
            .replace(/<[^>]+>/g, '')
            .replace(/\s+/g, ' ')
            .trim();

        rows.push({ ch, ko: ko[ch] || ch, slot, hidden, plain });
    }
}
rows.sort((a, b) =>
    a.ko.localeCompare(b.ko, 'ko') || 'PQWER'.indexOf(a.slot[0]) - 'PQWER'.indexOf(b.slot[0]));

const shown = rows.filter(r => !r.hidden);
const hidden = rows.filter(r => r.hidden);
const bySlot = rows.reduce((a, r) => (a[r.slot] = (a[r.slot] || 0) + 1, a), {});

const out = [];
out.push(`# 구분선 아래 작은 회색 글씨 — 적용 현황`);
out.push(``);
out.push(`\`node survey_belowline.js --write\` 로 다시 만든다. 원본은 게임 bin 이다 —`);
out.push(`\`mSpell.mClientData.mTooltipData.mLocKeys.keyTooltipExtendedBelowLine\` → stringtable.`);
out.push(`가져오는 코드는 \`belowline.js\`, 문장으로 찍는 건 \`build_champion_data.js\` 다.`);
out.push(``);
out.push(`- **총 ${rows.length}자리 / ${new Set(rows.map(r => r.ch)).size}챔피언**`);
out.push(`- **${shown.length}자리가 화면에 나간다**`);
out.push(`- ${hidden.length}자리는 수치를 못 구해서 **회색 글씨만 숨긴다** (스킬 본문은 정상)`);
out.push(``);
out.push(`슬롯별: ` + Object.entries(bySlot).sort().map(([s, n]) => `${s} ${n}`).join(' / '));
out.push(``);
out.push(`## 왜 나무위키가 아니라 게임 원본인가`);
out.push(``);
out.push(`가렌 Q 를 stringtable 에서 찾아봤더니 키 이름에 답이 있었다:`);
out.push(``);
out.push('```');
out.push(`spell_garenq_tooltip**extendedbelowline**`);
out.push(`  <rules>강화된 기본 공격은 @AttackWindow@초 후 끝납니다.<br>{{ buff_desc_SpellEffects }}</rules>`);
out.push('```');
out.push(``);
out.push(`라이엇이 본문과 회색 글씨를 따로 관리하는 거였고 우리가 안 읽고 있었을 뿐이다.`);
out.push(`bin 의 \`mLocKeys\` 에 **어느 키를 볼지까지** 적혀 있다. 그래서 게임 원본을 썼다:`);
out.push(``);
out.push(`1. 354자리를 손으로 옮겨 적으면 오타가 난다 — 지금은 스크립트가 매번 다시 만든다`);
out.push(`2. 나무위키는 요약·의역이지만 이건 인게임 문장 그 자체다`);
out.push(`3. \`@AttackWindow@\` 같은 수치가 살아 있어 **패치가 오면 값이 저절로 갱신된다**`);
out.push(`4. 색 태그(\`<attackspeed>\` 등)도 원문 그대로 붙어 있다`);
out.push(``);
out.push(`**주의 — stringtable 을 키 이름으로 뒤지면 안 된다.** 구버전·클래식(\`jade_\`)용이 섞여 있고`);
out.push(`\`spell_hweiqe_tooltipextendedbelowline\` 은 내용이 \`"unused, please delete"\` 다.`);
out.push(`bin 이 가리키는 키만 진짜다.`);
out.push(``);
out.push(`## 화면에 나가는 ${shown.length}자리`);
let cur = '';
for (const r of shown) {
    if (r.ko !== cur) { cur = r.ko; out.push(``, `**${r.ko}**`); }
    out.push(`- \`${r.slot}\` ${r.plain}`);
}
out.push(``, `## 숨긴 ${hidden.length}자리`, ``);
out.push(`수치가 "지금 내 챔피언의 누적값"(골드·중첩·별가루)이라 고정값이 없거나,`);
out.push(`값이 bin 밖에 있어서 \`?\` 로 남은 자리다. app.js 가 **회색 글씨 줄만** 버린다.`);
out.push(``);
for (const r of hidden) out.push(`- **${r.ko} ${r.slot}** — ${r.plain}`);

const text = out.join('\n') + '\n';
if (WRITE) {
    fs.writeFileSync(OUT, text, 'utf8');
    console.log(`${rows.length}자리 (표시 ${shown.length} / 숨김 ${hidden.length}) → ${OUT}`);
} else {
    console.log(text);
}
