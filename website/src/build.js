const fs = require('fs');
const path = require('path');
const M = require('./mockups.js');

const OUT = path.join(__dirname, '..');

// ============================================================
// NAVIGATION
// ============================================================
const NAV = [
  { href: 'index.html', label: '🏠 หน้าแรก' },
  { href: 'lab1.html', label: 'Lab 1' },
  { href: 'lab2.html', label: 'Lab 2' },
  { href: 'lab3.html', label: 'Lab 3' },
  { href: 'lab4.html', label: 'Lab 4' },
  { href: 'lab5.html', label: 'Lab 5' },
  { href: 'lab6.html', label: 'Lab 6' },
];

const LABS_META = [
  { href: 'lab1.html', short: 'Lab 1', title: 'M365 Agent Builder', sub: 'Quick Win — สร้าง Agent แรกใน 10 นาที', icon: '🚀', color: M.COL.green, time: '35 นาที' },
  { href: 'lab2.html', short: 'Lab 2', title: 'Copilot Studio + Knowledge', sub: 'RAG พื้นฐาน — เชื่อมไฟล์ เว็บ และ SharePoint', icon: '📚', color: M.COL.blue, time: '40 นาที' },
  { href: 'lab3.html', short: 'Lab 3', title: 'Prompt Engineering', sub: 'CARE Framework — ปรับ Instructions ให้ RAG ฉลาดขึ้น', icon: '✍️', color: M.COL.navy, time: '40 นาที' },
  { href: 'lab4.html', short: 'Lab 4', title: 'Custom Topics', sub: 'Fallback + Escalation — จัดการเมื่อ Agent ตอบไม่ได้', icon: '🧩', color: M.COL.purple, time: '35 นาที' },
  { href: 'lab5.html', short: 'Lab 5', title: 'Evaluation', sub: 'วัดคุณภาพ RAG ด้วย Test Set + Improvement Loop', icon: '📊', color: M.COL.orange, time: '30 นาที' },
  { href: 'lab6.html', short: 'Lab 6', title: 'Deploy to Teams', sub: 'ปล่อย Agent ให้ทีมใช้งานจริงใน Microsoft Teams', icon: '🚀', color: M.COL.green, time: '15 นาที' },
];

// ============================================================
// LOW-LEVEL HTML HELPERS
// ============================================================
function step(n, title, bodyHtml) {
  return `<div class="step">
    <div class="step-num">${n}</div>
    <div class="step-body"><h4>${title}</h4>${bodyHtml}</div>
  </div>`;
}

function mockup(svg, caption) {
  return `<div class="mockup">${svg}</div>${caption ? `<div class="mockup-caption">${caption}</div>` : ''}`;
}

const BOX_ICON = { tip: '💡', warn: '⚠️', note: '📌', success: '🎉' };
const BOX_LABEL = { tip: 'Tip', warn: 'ระวัง', note: 'หมายเหตุ', success: 'สำเร็จแล้ว!' };
function box(type, title, bodyHtml) {
  return `<div class="box box-${type}">
    <div class="box-title">${BOX_ICON[type]} ${title || BOX_LABEL[type]}</div>
    ${bodyHtml}
  </div>`;
}

function metaTable(rows) {
  return `<table class="meta-table"><tbody>
    ${rows.map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join('')}
  </tbody></table>`;
}

function conceptTable(headers, rows) {
  return `<table class="concept-table">
    <thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
    <tbody>${rows.map(r => `<tr><td class="term">${r[0]}</td><td>${r[1]}</td></tr>`).join('')}</tbody>
  </table>`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function promptBox(label, text) {
  return `<div class="prompt-box">
    <div class="prompt-box-header">
      <span class="prompt-box-label">📋 ${label}</span>
      <button class="prompt-copy-btn" onclick="copyPromptBox(this)">คัดลอก</button>
    </div>
    <pre class="prompt-box-text">${escapeHtml(text)}</pre>
  </div>`;
}

function toc(items) {
  return `<nav class="toc"><div class="toc-title">ในหน้านี้</div>
    ${items.map(it => `<a href="#${it.id}"${it.sub ? ' class="sub"' : ''}>${it.label}</a>`).join('')}
  </nav>`;
}

function heroPill(icon, label) {
  return `<span class="hero-pill">${icon} ${label}</span>`;
}

// ============================================================
// PAGE SHELL
// ============================================================
function pageShell({ file, title, eyebrow, heroTitle, heroLead, pills, tocItems, bodyHtml, prevNext, isHome }) {
  const navHtml = NAV.map(n => `<a href="${n.href}"${n.href === file ? ' class="active"' : ''}>${n.label}</a>`).join('');

  const heroHtml = `<header class="hero"><div class="hero-inner">
    ${eyebrow ? `<span class="hero-eyebrow">${eyebrow}</span>` : ''}
    <h1>${heroTitle}</h1>
    <p class="lead">${heroLead}</p>
    ${pills && pills.length ? `<div class="hero-meta">${pills.map(p => heroPill(p[0], p[1])).join('')}</div>` : ''}
  </div></header>`;

  const footerNavHtml = prevNext ? `<div class="footer-nav">
    ${prevNext.prev ? `<a href="${prevNext.prev.href}"><div class="dir">← ก่อนหน้า</div><div class="lbl">${prevNext.prev.label}</div></a>` : '<div></div>'}
    ${prevNext.next ? `<a href="${prevNext.next.href}" class="next"><div class="dir">ถัดไป →</div><div class="lbl">${prevNext.next.label}</div></a>` : '<div></div>'}
  </div>` : '';

  const mainHtml = isHome
    ? `<div class="page-wrap" style="grid-template-columns: 1fr;"><div class="content">${bodyHtml}</div></div>`
    : `<div class="page-wrap">${toc(tocItems)}<div class="content">${bodyHtml}${footerNavHtml}</div></div>`;

  return `<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<link rel="stylesheet" href="assets/style.css">
</head>
<body>
<nav class="topnav"><div class="topnav-inner">
  <div class="topnav-brand"><span>🤖</span> Build Your Own RAG Agent<span class="dot"> · Copilot Studio</span></div>
  <div class="topnav-links">${navHtml}</div>
</div></nav>
${heroHtml}
${mainHtml}
<footer class="site-footer">
  Build Your Own RAG Agent with Microsoft Copilot Studio &nbsp;|&nbsp; คู่มือสอนภายในองค์กร ฉบับภาษาไทย &nbsp;|&nbsp; อ้างอิงจาก <a href="https://microsoft.github.io/mcs-labs/" target="_blank">Microsoft Copilot Agents Labs</a>
</footer>
<script>
function copyPromptBox(btn) {
  var pre = btn.closest('.prompt-box').querySelector('.prompt-box-text');
  var text = pre.innerText;
  function done() {
    var original = btn.textContent;
    btn.textContent = '✓ คัดลอกแล้ว';
    btn.classList.add('copied');
    setTimeout(function () {
      btn.textContent = original;
      btn.classList.remove('copied');
    }, 1500);
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(function () { fallbackCopyPrompt(text, done); });
  } else {
    fallbackCopyPrompt(text, done);
  }
}
function fallbackCopyPrompt(text, cb) {
  var ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); } catch (e) {}
  document.body.removeChild(ta);
  if (cb) cb();
}
</script>
</body>
</html>`;
}

function writePage(filename, html) {
  fs.writeFileSync(path.join(OUT, filename), html, 'utf-8');
  console.log('✓ wrote', filename);
}

module.exports = {
  M, NAV, LABS_META, step, mockup, box, promptBox, metaTable, conceptTable, toc, pageShell, writePage,
};
