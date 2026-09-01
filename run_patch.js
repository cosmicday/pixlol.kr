// ============================================================
//  run_patch.js  —  패치 파이프라인 한 방에 돌리기
//
//  사용법:
//      node run_patch.js --check       CD 가 따라왔는지만 확인하고 끝 (10초)
//      node run_patch.js --rehearsal   같은 패치로 전체를 돌려 **드리프트만** 본다
//                                      (결과가 지금 파일과 같아야 정상. 패치 전에 연습할 때)
//      node run_patch.js               실제 패치 반영
//      node run_patch.js --from 5      5번 단계부터 (중간에 끊겼을 때)
//
//  ★ 커밋·배포는 **안 한다.** 결과를 보고 사람이 한다.
//
//  ------------------------------------------------------------
//  ★★ 왜 자동화하나 — 이 파이프라인의 위험은 "죽는 것" 이 아니라 "조용히 옛 값이 남는 것" 이다.
//
//   ① **순서가 곧 정확성이다.** 앞이 뒤의 입력이라 한 줄만 빠져도 그 몫만 옛 패치로 남는다.
//      실제로 `build_wiki_stats` 가 순서표에서 빠져 있던 걸 2026-08-25 에 발견했다 —
//      빠뜨려도 스크립트는 멀쩡히 돌고 파일도 만들어진다.
//   ② **`.new.js` rename 이 두 번인데 문서엔 한 번만 적혀 있었다.**
//      `build_champion_data` 가 `custom_templates.new.js` + `custom_values.new.js` 를 만들고,
//      `fill_values` 가 다시 `custom_values.new.js` 를 만든다. 사람이 기억할 자리가 아니다.
//   ③ **넷은 실패해도 exit 0 이다** (`build_wiki_stats`·`build_level_curves`·
//      `add_level_graphs`·`build_stats_page`). 그래서 여기서는 **산출물 mtime 이 실제로
//      갱신됐는지**까지 본다 — exit code 만 믿으면 옛 파일을 입력으로 다음이 돌아간다.
//   ④ 검산(`check_flat_stats`)은 사람이 손으로 세던 것이라 매번 빠졌다.
//
//  ★ 반대로 **자동화하지 않는 것**: 커밋·배포와, 검산에 걸린 자리의 판단.
//    패치마다 라이엇이 데이터 모양을 조금씩 바꾸고 그때마다 새 구멍이 생긴다
//    (2026-08-12 마법 저항력 173명 사고). 그건 사람이 봐야 한다.
// ============================================================
const fs = require('fs');
const path = require('path');
const { execFileSync, execSync } = require('child_process');

const argv = process.argv.slice(2);
const has = (f) => argv.includes(f);
const argOf = (n) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : null; };

const CHECK_ONLY = has('--check');
const REHEARSAL = has('--rehearsal');
const FROM = Number(argOf('--from') || 0);

const ROOT = __dirname;
const P = (...p) => path.join(ROOT, ...p);
const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');

const c = { dim: s => `\x1b[2m${s}\x1b[0m`, b: s => `\x1b[1m${s}\x1b[0m` };
const log = (s = '') => console.log(s);
const head = (s) => { log(''); log('='.repeat(70)); log(c.b(s)); log('='.repeat(70)); };

// ── 단계 정의.  out = 이 단계가 반드시 새로 써야 하는 파일 (mtime 으로 검증)
const STEPS = [
    {
        n: 1, name: '롤위키 우상단 값', cmd: ['build_wiki_stats.js', '--refresh'],
        out: ['wiki_stats.json'], slow: '10분쯤',
        why: 'fill_values 가 이걸 읽어 bin 에 없는 자리를 채운다 — 반드시 먼저'
    },
    {
        n: 2, name: '스킬 문장·틀', cmd: ['build_champion_data.js', '--refresh'],
        out: ['public/custom_templates.new.js', 'public/custom_values.new.js'],
        why: 'CD bin 173개를 받는다 (--refresh 는 여기만 — 캐시를 새로 채운다)'
    },
    {
        n: 3, name: '문장·틀 반영 (rename ×2)', rename: [
            ['public/custom_templates.new.js', 'public/custom_templates.js'],
            ['public/custom_values.new.js', 'public/custom_values.js']
        ],
        why: 'build 가 만든 새 틀을 fill 의 입력으로 삼는다 (fill 은 custom_values.js 를 읽는다)'
    },
    {
        n: 4, name: '수치 채우기', cmd: ['fill_values.js', '--write'],
        out: ['public/custom_values.new.js'],
        why: 'bin·위키·손표(STAT_MANUAL 등)로 ? 자리를 채운다'
    },
    {
        n: 5, name: '수치 반영 (rename)', rename: [['public/custom_values.new.js', 'public/custom_values.js']],
        why: '이 파일이 스킬 탭의 정본이다'
    },
    {
        n: 6, name: '레벨 곡선', cmd: ['build_level_curves.js', '--write'],
        out: ['level_curves.json', 'champion_stats_by_level.json'],
        why: 'DD 스탯 + CD bin. 스탯 탭과 각주의 입력'
    },
    {
        n: 7, name: '레벨 각주', cmd: ['add_level_graphs.js', '--write'],
        out: ['public/custom_graphs.js'],
        why: 'custom_values.js 를 읽으므로 5번 뒤여야 한다'
    },
    {
        n: 8, name: '스탯 탭', cmd: ['build_stats_page.js', '--write'],
        out: ['public/champion_stats.js'],
        why: 'champion_stats_by_level.json 이 입력이므로 6번 뒤'
    },
    {
        n: 9, name: '도감', cmd: ['build_codex_data.js', '--write'],
        out: ['public/codex_data.js', 'public/item_names.js'],
        why: 'DD 아이템 + CD 등급·룬. 위와 독립'
    },
    {
        n: 10, name: '통계 탭 룬 아이콘', cmd: ['build_perk_data.js', '--write'],
        out: ['public/perk_data.js'], why: 'DD 주문 + CD 룬'
    },
    {
        n: 11, name: '도감 룬 각주', cmd: ['build_rune_graphs.js', '--write'],
        out: ['public/rune_graphs.js'],
        why: 'codex_data.js 를 읽으므로 9번 뒤여야 한다'
    },
    {
        // ★ 바뀐 챔피언 목록 (패치 영향 페이지). 이 스크립트가 만든 백업(pipeline.bak-*)과
        //   새 파일 세 벌(스킬 수치·문장·기본 스탯)을 비교하므로 맨 마지막이어야 한다.
        //   리허설이면 변경 0 으로 돌고 기존 항목은 안 지워진다 (스크립트가 합친다).
        n: 12, name: '바뀐 챔피언 목록', cmd: ['build_patch_changes.js', '--old', `pipeline.bak-${stamp}`, '--write'],
        out: ['public/patch_changes.js'],
        why: '백업 vs 새 파일 diff — 패치 영향 페이지가 이 목록으로 초상화를 그린다'
    }
];

const CHECKS = [
    { name: 'audit_skill_meta', cmd: ['audit_skill_meta.js'], expect: '합계 0자리', why: '우상단 값 전수 (기준선 0)' },
    { name: 'audit_full', cmd: ['audit_full.js'], expect: '합계 11자리', why: '문장·각주·투사체 (기준선 11)' },
    { name: 'check_flat_stats', cmd: ['check_flat_stats.js'], expect: 'exit 0', why: '평평해진 스탯 (2026-08-12 사고)' }
];

// ── CD 가 따라왔나
async function checkVersions() {
    const dd = (await (await fetch('https://ddragon.leagueoflegends.com/api/versions.json')).json())[0];
    let cd = null;
    try { cd = (await (await fetch('https://raw.communitydragon.org/latest/content-metadata.json')).json()).version; } catch (e) { }
    const two = v => String(v).split('.').slice(0, 2).join('.');
    const ok = cd && two(dd) === two(cd);
    log(`  DD 최신     ${dd}`);
    log(`  CD 패치     ${cd || '(못 받음)'}`);
    log('');
    if (ok) log(`  ✔ 패치 ${two(dd)} 로 일치 — 돌려도 된다`);
    else {
        log(`  ★★ 어긋난다 — DD ${two(dd)} / CD ${two(cd)}`);
        log('     라이엇이 DD 를 수 04시 KST 에, CD 를 그로부터 12시간쯤 뒤에 올린다.');
        log('     지금 돌리면 DD 몫만 새 패치인 짝짝이가 되고 화면은 안 깨져서 눈으로 안 걸린다.');
        log('     → CD 가 따라올 때까지 기다릴 것 (한국시간 오후 4시 이후)');
    }
    return { dd, cd, ok };
}

function mtime(f) { try { return fs.statSync(P(f)).mtimeMs; } catch (e) { return 0; } }

function runStep(s) {
    log('');
    log(c.b(`[${s.n}/${STEPS.length}] ${s.name}`) + (s.slow ? c.dim(`   (${s.slow})`) : ''));
    log(c.dim(`      ${s.why}`));

    if (s.rename) {
        s.rename.forEach(([from, to]) => {
            if (!fs.existsSync(P(from))) throw new Error(`${from} 이 없다 — 앞 단계가 제대로 안 돌았다`);
            fs.renameSync(P(from), P(to));
            log(`      ${from}  →  ${to}`);
        });
        return;
    }

    const before = (s.out || []).map(mtime);
    const t0 = Date.now();
    try {
        execFileSync('node', [s.cmd[0], ...s.cmd.slice(1)], { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 64 * 1024 * 1024 });
    } catch (e) {
        const out = (e.stdout || '').toString().split('\n').slice(-12).join('\n');
        const err = (e.stderr || '').toString().split('\n').slice(-12).join('\n');
        throw new Error(`\`node ${s.cmd.join(' ')}\` 가 실패했다 (exit ${e.status})\n${err || out}`);
    }
    const secs = ((Date.now() - t0) / 1000).toFixed(0);

    // ★ exit 0 이어도 산출물이 안 바뀌었으면 실패로 본다 — 넷은 실패해도 exit 0 이다
    const stale = (s.out || []).filter((f, i) => mtime(f) <= before[i]);
    if (stale.length) {
        throw new Error(`exit 0 이지만 산출물이 갱신되지 않았다: ${stale.join(', ')}\n` +
            `   이 스크립트는 실패해도 exit 0 을 내는 축이라 여기서 잡는다.`);
    }
    log(`      ✔ ${secs}초 · ${(s.out || []).join(' · ')}`);
}

function runCheck(ck) {
    log('');
    log(c.b(`  ${ck.name}`) + c.dim(`   ${ck.why}`));
    let out = '', code = 0;
    try {
        out = execFileSync('node', ck.cmd, { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 64 * 1024 * 1024 }).toString();
    } catch (e) { out = ((e.stdout || '') + (e.stderr || '')).toString(); code = e.status || 1; }

    const sum = out.split('\n').filter(l => /합계|★★|확인 필요|✔/.test(l)).slice(-6);
    sum.forEach(l => log('      ' + l.trim()));
    const ok = ck.name === 'check_flat_stats' ? code === 0 : out.includes(ck.expect);
    log(`      ${ok ? '✔ 기준선과 같다' : '★ 기준선과 다르다 — 기대: ' + ck.expect}`);
    return { ok, out };
}

(async () => {
    head('패치 파이프라인');
    log(REHEARSAL ? '  모드: 리허설 (같은 패치로 돌려 드리프트만 본다)' : CHECK_ONLY ? '  모드: 확인만' : '  모드: 실제 반영');
    log('');
    const v = await checkVersions();
    if (CHECK_ONLY) process.exit(v.ok ? 0 : 1);
    if (!v.ok && !REHEARSAL) {
        log('\n중단한다. 억지로 돌리려면 각 스크립트에 DD_VER 을 직접 주면 된다.');
        process.exit(1);
    }

    // ── 백업
    head('백업');
    // ★ 이름을 `.bak-` 으로 시작하게 둔다 — `.gitignore` 의 `*.bak-*` 에 걸려 git 에 안 올라간다
    const BAK = P(`pipeline.bak-${stamp}`);
    if (!fs.existsSync(BAK)) fs.mkdirSync(BAK);
    const targets = ['public/custom_values.js', 'public/custom_templates.js', 'public/custom_graphs.js',
        'public/champion_stats.js', 'public/codex_data.js', 'public/item_names.js', 'public/perk_data.js',
        'public/rune_graphs.js', 'wiki_stats.json', 'level_curves.json', 'champion_stats_by_level.json'];
    targets.forEach(f => {
        if (fs.existsSync(P(f))) fs.copyFileSync(P(f), path.join(BAK, path.basename(f)));
    });
    log(`  → ${path.basename(BAK)}/ 에 ${targets.length}개`);
    log(c.dim('  (루트라 gitignore 다. 되돌리려면 여기서 복사해 오면 된다)'));

    // ── 실행
    head('빌드');
    const t0 = Date.now();
    for (const s of STEPS) {
        if (s.n < FROM) { log(`\n[${s.n}] ${s.name} — 건너뜀 (--from ${FROM})`); continue; }
        try { runStep(s); }
        catch (e) {
            log('');
            log(`★★ ${s.n}번 "${s.name}" 에서 멈췄다`);
            log('');
            log(e.message.split('\n').map(l => '   ' + l).join('\n'));
            log('');
            log(`   고친 뒤 이어서 돌리려면:  node run_patch.js --from ${s.n}`);
            log(`   되돌리려면:              pipeline.bak-${stamp}/ 에서 복사`);
            process.exit(1);
        }
    }
    log('');
    log(`  빌드 ${((Date.now() - t0) / 60000).toFixed(1)}분`);

    // ── 검증
    head('검증');
    const results = CHECKS.map(runCheck);

    // ── 리허설이면 백업과 비교해 드리프트를 본다
    let drift = null;
    if (REHEARSAL) {
        head('드리프트 (리허설)');
        log(c.dim('  같은 패치로 다시 구운 것이라 결과가 백업과 같아야 정상이다.'));
        log(c.dim('  다르면 화면 데이터가 "클라 원본 + 손표" 에서 벗어났다는 뜻이다.'));
        log('');
        // ★ 생성 시각 줄은 빼고 비교한다 — 스크립트마다 머리글에 만든 날짜를 찍어서
        //   다시 구우면 **그 한 줄 때문에 전부 다르게 나온다.** 실제로 리허설 첫 판에서
        //   5개가 걸렸는데 전부 이 줄 하나뿐이었다 (크기도 +0 이었다).
        const stripStamp = (buf) => buf.toString('utf8')
            .split('\n')
            .filter(l => !/생성 시각\s*:|자동 생성 —.*\(\d{4}-\d{2}-\d{2}/.test(l))
            .join('\n');
        drift = targets.filter(f => {
            const a = path.join(BAK, path.basename(f));
            if (!fs.existsSync(a) || !fs.existsSync(P(f))) return false;
            return stripStamp(fs.readFileSync(a)) !== stripStamp(fs.readFileSync(P(f)));
        });
        if (!drift.length) log(`  ✔ ${targets.length}개 파일 전부 같다 — 드리프트 없음 (생성 시각 줄 제외)`);
        else drift.forEach(f => {
            const a = fs.statSync(path.join(BAK, path.basename(f))).size, b = fs.statSync(P(f)).size;
            log(`  ★ ${f}   ${a} → ${b} bytes (${b - a >= 0 ? '+' : ''}${b - a})`);
        });
    }

    // ── 요약
    head('요약');
    const bad = results.filter(r => !r.ok).length;
    log(`  빌드 ${STEPS.length}단계 ✔`);
    log(`  검증 ${CHECKS.length - bad}/${CHECKS.length} 통과`);
    if (drift) log(`  드리프트 ${drift.length}개 파일`);
    log('');
    if (bad || (drift && drift.length)) {
        log('  ★★ 사람이 봐야 할 것이 있다:');
        results.forEach((r, i) => { if (!r.ok) log(`     · ${CHECKS[i].name} 이 기준선과 다르다 — \`node ${CHECKS[i].cmd[0]}\` 를 직접 돌려 어느 자리인지 볼 것`); });
        if (drift && drift.length) log('     · 위 드리프트 파일');
        log('');
        log('  기준선이 달라지는 건 정상일 수도 있다 — 패치로 새 자리가 생기면 그렇다.');
        log('  "우리 코드가 못 읽는 것" 인지 "라이엇이 바꾼 것" 인지 가르는 게 이 단계다.');
    } else {
        log('  ✔ 전부 기준선과 같다.');
    }
    log('');
    log('  다음: git diff 로 훑어보고 커밋·배포 (이 스크립트는 커밋하지 않는다)');
    log('');
    process.exit(bad ? 1 : 0);
})().catch(e => { console.error('\n★ ' + e.message); process.exit(1); });
