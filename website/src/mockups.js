// ============================================================
// SVG Mockup Library — generates static "screenshot-like" SVG
// markup simulating Microsoft 365 Copilot / Copilot Studio / Teams UI
// Used at build time only (Node) — output is plain inline <svg>.
// ============================================================

const COL = {
  navy: '#1F3864',
  navyLight: '#2A4A7F',
  blue: '#2E75B6',
  blueLight: '#D6E4F0',
  blueBg: '#EEF4FB',
  cyan: '#00B4D8',
  green: '#107C10',
  greenBg: '#E8F5E9',
  orange: '#C55A11',
  orangeBg: '#FFF3E0',
  red: '#C00000',
  redBg: '#FFEBEE',
  gray900: '#1A1A1A',
  gray700: '#444444',
  gray500: '#767676',
  gray300: '#D6D9E0',
  gray200: '#E8EBF0',
  gray100: '#F4F6F9',
  white: '#FFFFFF',
  purple: '#7B2FBE',
  purpleBg: '#F1E6FB',
};

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Wrap text into multiple <tspan> lines given a rough char-per-line budget
function wrapText(text, x, y, maxChars, lineHeight, opts = {}) {
  const words = String(text).split(' ');
  const lines = [];
  let cur = '';
  words.forEach(w => {
    if ((cur + ' ' + w).trim().length > maxChars) { lines.push(cur.trim()); cur = w; }
    else cur = (cur + ' ' + w).trim();
  });
  if (cur) lines.push(cur.trim());
  const { fontSize = 13, fill = COL.gray700, weight = 400, family = 'Segoe UI, Tahoma, sans-serif' } = opts;
  return `<text x="${x}" y="${y}" font-family="${family}" font-size="${fontSize}" font-weight="${weight}" fill="${fill}">` +
    lines.map((l, i) => `<tspan x="${x}" dy="${i === 0 ? 0 : lineHeight}">${esc(l)}</tspan>`).join('') +
    `</text>`;
}

function rrect(x, y, w, h, r, fill, opts = {}) {
  const { stroke = 'none', strokeWidth = 1 } = opts;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" ry="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"/>`;
}

function text(x, y, str, opts = {}) {
  const { fontSize = 13, fill = COL.gray900, weight = 400, anchor = 'start', family = 'Segoe UI, Tahoma, sans-serif', style = '' } = opts;
  return `<text x="${x}" y="${y}" font-family="${family}" font-size="${fontSize}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" style="${style}">${esc(str)}</text>`;
}

function badge(x, y, str, color, bg) {
  const w = str.length * 6.6 + 20;
  return `<g>${rrect(x, y, w, 22, 11, bg)}${text(x + w / 2, y + 15, str, { fontSize: 11.5, fill: color, weight: 700, anchor: 'middle' })}</g>`;
}

function button(x, y, w, h, label, opts = {}) {
  const { fill = COL.blue, textColor = COL.white, fontSize = 12.5, outline = false } = opts;
  const stroke = outline ? COL.gray300 : 'none';
  const bg = outline ? COL.white : fill;
  const fg = outline ? COL.gray700 : textColor;
  return `<g>${rrect(x, y, w, h, 6, bg, { stroke, strokeWidth: 1.3 })}${text(x + w / 2, y + h / 2 + 4.5, label, { fontSize, fill: fg, weight: 600, anchor: 'middle' })}</g>`;
}

// ---------- Browser chrome wrapper (address bar) ----------
function browserFrame({ url = 'copilotstudio.microsoft.com', width = 900, height = 560, inner }) {
  const barH = 42;
  return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, Tahoma, sans-serif">
    <rect width="${width}" height="${height}" fill="${COL.white}"/>
    <rect width="${width}" height="${barH}" fill="#E9EBEF"/>
    <circle cx="20" cy="${barH/2}" r="6" fill="#FF5F57"/>
    <circle cx="40" cy="${barH/2}" r="6" fill="#FEBC2E"/>
    <circle cx="60" cy="${barH/2}" r="6" fill="#28C840"/>
    ${rrect(90, 9, width - 180, 24, 12, COL.white, { stroke: '#D3D6DC', strokeWidth: 1 })}
    <text x="106" y="${barH/2+5}" font-size="12.5" fill="${COL.gray500}">🔒 ${esc(url)}</text>
    <g transform="translate(0, ${barH})">${inner}</g>
    <rect x="0" y="0" width="${width}" height="${height}" fill="none" stroke="#D9DEE6" stroke-width="2"/>
  </svg>`;
}

// ---------- Copilot Studio app chrome (top tab nav) ----------
const CS_TABS = ['Overview', 'Knowledge', 'Tools', 'Agents', 'Topics', 'Activity', 'Evaluation', 'Analytics', 'Channels'];

function studioChrome({ activeTab = 'Overview', agentName = 'My Agent', width = 1000, bodyHeight = 470, body = '', showTest = true }) {
  const navH = 54;
  let tx = 178;
  const tabsSvg = CS_TABS.map(t => {
    const isActive = t === activeTab;
    const w = t.length * 6.1 + 13;
    const el = `<g>${isActive ? rrect(tx, navH/2 - 14, w, 28, 6, COL.blueBg) : ''}
      ${text(tx + w/2, navH/2 + 4, t, { fontSize: 11, fill: isActive ? COL.navy : COL.gray700, weight: isActive ? 700 : 400, anchor: 'middle' })}
      ${isActive ? `<rect x="${tx}" y="${navH-3}" width="${w}" height="3" fill="${COL.blue}"/>` : ''}
    </g>`;
    tx += w + 3;
    return el;
  }).join('');

  return `<svg viewBox="0 0 ${width} ${navH + bodyHeight}" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, Tahoma, sans-serif">
    <rect width="${width}" height="${navH + bodyHeight}" fill="${COL.gray100}"/>
    <rect width="${width}" height="${navH}" fill="${COL.white}"/>
    <rect width="${width}" height="${navH}" fill="none" stroke="${COL.gray200}" stroke-width="1"/>
    <circle cx="24" cy="${navH/2}" r="11" fill="${COL.blue}"/>
    <text x="24" y="${navH/2+4}" font-size="11" fill="${COL.white}" text-anchor="middle" font-weight="700">CS</text>
    ${text(44, navH/2 - 3, agentName, { fontSize: 12.5, fill: COL.gray900, weight: 700 })}
    ${text(44, navH/2 + 12, 'Copilot Studio', { fontSize: 9.5, fill: COL.gray500 })}
    ${tabsSvg}
    ${button(width - 182, navH/2 - 13, 76, 26, 'Publish', { fill: COL.blue, fontSize: 12 })}
    ${showTest ? button(width - 96, navH/2 - 13, 76, 26, '▶ Test', { fill: COL.navy, fontSize: 12 }) : ''}
    <g transform="translate(0, ${navH})">${body}</g>
  </svg>`;
}

// ---------- M365 Copilot Chat chrome ----------
function m365Chrome({ width = 1010, bodyHeight = 470, body = '', sidebarActive = 'New agent' }) {
  const sideW = 210;
  const items = ['New chat', 'Agents', 'New agent', 'HR Helper', 'Researcher', 'Analyst', 'Cowork (Frontier)'];
  const sideItems = items.map((it, i) => {
    const isActive = it === sidebarActive;
    const y = 70 + i * 38;
    return `${isActive ? rrect(10, y - 20, sideW - 20, 32, 6, COL.blueBg) : ''}
      ${text(24, y + 2, it, { fontSize: 12.5, fill: isActive ? COL.navy : COL.gray700, weight: isActive ? 700 : 400 })}`;
  }).join('');

  return `<svg viewBox="0 0 ${width} ${bodyHeight}" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, Tahoma, sans-serif">
    <rect width="${width}" height="${bodyHeight}" fill="${COL.white}"/>
    <rect width="${sideW}" height="${bodyHeight}" fill="${COL.gray100}"/>
    <rect x="${sideW}" width="1" height="${bodyHeight}" fill="${COL.gray200}"/>
    <circle cx="30" cy="30" r="11" fill="${COL.navy}"/>
    <text x="30" y="34" font-size="11" fill="${COL.white}" text-anchor="middle" font-weight="700">M</text>
    ${text(50, 34, 'Microsoft 365 Copilot', { fontSize: 12.5, fill: COL.navy, weight: 700 })}
    ${sideItems}
    <g transform="translate(${sideW}, 0)">${body}</g>
  </svg>`;
}

// ---------- Teams chrome ----------
function teamsChrome({ width = 1010, bodyHeight = 470, body = '', channelName = 'Copilot Studio Assistant' }) {
  const sideW = 64;
  return `<svg viewBox="0 0 ${width} ${bodyHeight}" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, Tahoma, sans-serif">
    <rect width="${width}" height="${bodyHeight}" fill="${COL.white}"/>
    <rect width="${sideW}" height="${bodyHeight}" fill="#4B3F8F"/>
    ${['💬','📅','📞','☁️','🧩'].map((ic,i)=>`<text x="${sideW/2}" y="${50+i*56}" font-size="22" text-anchor="middle">${ic}</text>`).join('')}
    <rect x="${sideW}" width="230" height="${bodyHeight}" fill="${COL.gray100}"/>
    <rect x="${sideW+230}" width="1" height="${bodyHeight}" fill="${COL.gray200}"/>
    ${text(sideW+20, 34, 'Chat', { fontSize: 14, fill: COL.gray900, weight: 700 })}
    ${rrect(sideW+14, 50, 202, 40, 8, COL.white, {stroke: COL.blue, strokeWidth: 1.5})}
    <circle cx="${sideW+34}" cy="70" r="12" fill="${COL.navy}"/>
    <text x="${sideW+34}" y="74" font-size="11" fill="${COL.white}" text-anchor="middle" font-weight="700">🤖</text>
    ${text(sideW+56, 66, channelName, { fontSize: 11.5, fill: COL.navy, weight: 700 })}
    ${text(sideW+56, 80, 'ทดสอบ Agent ใน Teams', { fontSize: 10, fill: COL.gray500 })}
    <g transform="translate(${sideW+230}, 0)">${body}</g>
  </svg>`;
}

// ---------- Chat message bubbles ----------
function chatMessages(messages, opts = {}) {
  const { width = 660, startY = 20, padX = 24 } = opts;
  let y = startY;
  const parts = [];
  messages.forEach(m => {
    const isUser = m.from === 'user';
    const maxChars = 62;
    const lines = [];
    let cur = '';
    String(m.text).split(' ').forEach(w => {
      if ((cur + ' ' + w).trim().length > maxChars) { lines.push(cur.trim()); cur = w; }
      else cur = (cur + ' ' + w).trim();
    });
    if (cur) lines.push(cur.trim());
    const bh = lines.length * 18 + 22;
    const bw = Math.min(width - 2*padX, Math.max(...lines.map(l => l.length)) * 7.6 + 30);
    const bx = isUser ? width - padX - bw : padX;
    const fill = isUser ? COL.blue : COL.gray100;
    const fg = isUser ? COL.white : COL.gray900;
    parts.push(`${rrect(bx, y, bw, bh, 10, fill)}`);
    lines.forEach((l, i) => {
      parts.push(text(bx + 14, y + 22 + i*18, l, { fontSize: 12.5, fill: fg }));
    });
    y += bh + 16;
  });
  return { svg: parts.join(''), endY: y };
}

// ---------- Knowledge source list ----------
function knowledgeList(items, opts = {}) {
  const { x = 24, y = 20, width = 640 } = opts;
  const rowH = 52;
  const rows = items.map((it, i) => {
    const ry = y + i * (rowH + 10);
    const statusColor = it.status === 'Ready' ? { c: COL.green, bg: COL.greenBg }
      : it.status === 'Processing' ? { c: COL.orange, bg: COL.orangeBg }
      : { c: COL.red, bg: COL.redBg };
    return `${rrect(x, ry, width, rowH, 8, COL.white, { stroke: COL.gray200, strokeWidth: 1 })}
      <text x="${x+16}" y="${ry+22}" font-size="17">${it.icon || '📄'}</text>
      ${text(x+44, ry+21, it.name, { fontSize: 13, weight: 700, fill: COL.gray900 })}
      ${text(x+44, ry+38, it.type, { fontSize: 11, fill: COL.gray500 })}
      ${badge(x + width - 110, ry + 14, it.status, statusColor.c, statusColor.bg)}`;
  }).join('');
  return { svg: rows, endY: y + items.length * (rowH + 10) };
}

// ---------- Topic canvas (simple flow nodes) ----------
function topicCanvasNodes(nodes, opts = {}) {
  // nodes: [{label, type: 'trigger'|'message'|'question'|'condition', x, y}]
  const typeColor = {
    trigger: COL.purple, message: COL.blue, question: COL.cyan, condition: COL.orange, action: COL.green,
  };
  const w = 210, h = 64;
  const parts = [];
  nodes.forEach((n, i) => {
    const c = typeColor[n.type] || COL.blue;
    parts.push(rrect(n.x, n.y, w, h, 8, COL.white, { stroke: c, strokeWidth: 2 }));
    parts.push(rrect(n.x, n.y, 6, h, 3, c));
    parts.push(text(n.x + 18, n.y + 20, (n.type||'').toUpperCase(), { fontSize: 9.5, fill: c, weight: 700 }));
    parts.push(wrapText(n.label, n.x + 18, n.y + 38, 27, 15, { fontSize: 12, fill: COL.gray900, weight: 600 }));
    if (i < nodes.length - 1) {
      const x1 = n.x + w/2, y1 = n.y + h;
      const x2 = nodes[i+1].x + w/2, y2 = nodes[i+1].y;
      parts.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2-8}" stroke="${COL.gray300}" stroke-width="2"/>`);
      parts.push(`<polygon points="${x2-5},${y2-8} ${x2+5},${y2-8} ${x2},${y2}" fill="${COL.gray300}"/>`);
    }
  });
  return parts.join('');
}

// ---------- Generic results table ----------
function resultsTable(headers, rows, opts = {}) {
  const { x = 24, y = 20, width = 640, rowH = 34 } = opts;
  const colW = width / headers.length;
  let parts = [rrect(x, y, width, rowH, 6, COL.navy)];
  headers.forEach((h, i) => parts.push(text(x + i*colW + 12, y + rowH/2 + 4, h, { fontSize: 12, fill: COL.white, weight: 700 })));
  rows.forEach((row, ri) => {
    const ry = y + rowH + ri * rowH;
    parts.push(rrect(x, ry, width, rowH, 0, ri % 2 === 0 ? COL.white : COL.gray100));
    row.forEach((cell, ci) => {
      let fill = COL.gray900;
      if (typeof cell === 'object') {
        parts.push(text(x + ci*colW + 12, ry + rowH/2 + 4, cell.text, { fontSize: 12, fill: cell.color || COL.gray900, weight: cell.bold ? 700 : 400 }));
      } else {
        parts.push(text(x + ci*colW + 12, ry + rowH/2 + 4, cell, { fontSize: 12, fill }));
      }
    });
  });
  parts.push(`<rect x="${x}" y="${y}" width="${width}" height="${rowH*(rows.length+1)}" fill="none" stroke="${COL.gray200}" stroke-width="1"/>`);
  return parts.join('');
}

// ---------- Toggle switch mockup ----------
function toggle(x, y, on, label) {
  const trackFill = on ? COL.blue : COL.gray300;
  const knobX = on ? x + 24 : x + 4;
  return `${rrect(x, y, 44, 22, 11, trackFill)}<circle cx="${knobX+8}" cy="${y+11}" r="8" fill="${COL.white}"/>
    ${text(x + 54, y + 16, label, { fontSize: 12.5, fill: COL.gray900 })}
    ${text(x + width_of(label) + 64, y+16, on ? 'On' : 'Off', {fontSize: 11, fill: on ? COL.blue : COL.gray500, weight: 700})}`;
}
function width_of(s) { return String(s).length * 6.6; }

// ---------- Text input field mockup ----------
function textInput(x, y, w, label, value, opts = {}) {
  const { h = 40, focused = false } = opts;
  const parts = [];
  if (label) parts.push(text(x, y - 6, label, { fontSize: 11, fill: COL.gray500, weight: 600 }));
  parts.push(rrect(x, y, w, h, 6, COL.white, { stroke: focused ? COL.blue : COL.gray300, strokeWidth: focused ? 2 : 1 }));
  parts.push(text(x + 12, y + h/2 + 4, value, { fontSize: 12.5, fill: value ? COL.gray900 : COL.gray500 }));
  return parts.join('');
}

// ---------- Multi-line textarea mockup ----------
function textArea(x, y, w, h, label, value, opts = {}) {
  const { mono = false } = opts;
  const parts = [];
  if (label) parts.push(text(x, y - 6, label, { fontSize: 11, fill: COL.gray500, weight: 600 }));
  parts.push(rrect(x, y, w, h, 6, COL.white, { stroke: COL.gray300, strokeWidth: 1 }));
  const maxChars = Math.floor((w - 24) / 6.6);
  parts.push(wrapText(value, x + 12, y + 20, maxChars, 17, { fontSize: 12, fill: COL.gray900, family: mono ? 'Consolas, monospace' : undefined }));
  return parts.join('');
}

// ---------- Checkbox / toggle row ----------
function checkRow(x, y, label, checked, opts = {}) {
  const { sub = '' } = opts;
  const boxColor = checked ? COL.blue : COL.white;
  const parts = [];
  parts.push(rrect(x, y, 20, 20, 4, boxColor, { stroke: checked ? COL.blue : COL.gray300, strokeWidth: 1.5 }));
  if (checked) parts.push(`<path d="M ${x+4} ${y+10} L ${x+8.5} ${y+15} L ${x+16} ${y+5}" stroke="${COL.white}" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`);
  parts.push(text(x + 30, y + 15, label, { fontSize: 13, fill: COL.gray900, weight: 600 }));
  if (sub) parts.push(text(x + 30, y + 32, sub, { fontSize: 11, fill: COL.gray500 }));
  return parts.join('');
}

// ---------- Icon tile grid (channels etc.) ----------
function iconGrid(items, opts = {}) {
  const { x = 24, y = 20, cols = 4, tileW = 150, tileH = 90, gap = 14 } = opts;
  const parts = [];
  items.forEach((it, i) => {
    const col = i % cols, row = Math.floor(i / cols);
    const tx = x + col * (tileW + gap);
    const ty = y + row * (tileH + gap);
    const active = it.active;
    parts.push(rrect(tx, ty, tileW, tileH, 8, COL.white, { stroke: active ? COL.blue : COL.gray200, strokeWidth: active ? 2 : 1 }));
    parts.push(`<circle cx="${tx+tileW/2}" cy="${ty+30}" r="18" fill="${it.color || COL.blueLight}"/>`);
    parts.push(text(tx+tileW/2, ty+36, it.emoji || '●', { fontSize: 16, anchor: 'middle' }));
    parts.push(text(tx+tileW/2, ty+64, it.label, { fontSize: 11.5, fill: COL.gray900, weight: 700, anchor: 'middle' }));
    if (it.tag) parts.push(badge(tx + tileW/2 - 24, ty + 70, it.tag, active ? COL.green : COL.gray500, active ? COL.greenBg : COL.gray100));
  });
  return parts.join('');
}

// ---------- Simple two-bar comparison chart ----------
function barCompare(x, y, w, opts) {
  const { labelA, valA, labelB, valB, maxVal = 100, unit = '%' } = opts;
  const barH = 34, gap = 18;
  const scale = (w - 90) / maxVal;
  const parts = [];
  [[labelA, valA, COL.gray500], [labelB, valB, COL.green]].forEach(([lbl, val, color], i) => {
    const by = y + i * (barH + gap);
    parts.push(text(x, by + barH/2 + 4, lbl, { fontSize: 12, fill: COL.gray700, weight: 600 }));
    parts.push(rrect(x + 85, by, w - 90, barH, 6, COL.gray100));
    parts.push(rrect(x + 85, by, Math.max(val * scale, 4), barH, 6, color));
    parts.push(text(x + 85 + Math.max(val * scale, 4) + 10, by + barH/2 + 4, val + unit, { fontSize: 13, fill: color, weight: 700 }));
  });
  return parts.join('');
}

// ---------- Banner strip (success/info) ----------
function calloutBanner(x, y, w, icon, msg, opts = {}) {
  const { bg = COL.greenBg, color = COL.green, h = 44 } = opts;
  return `${rrect(x, y, w, h, 8, bg)}
    <text x="${x+16}" y="${y+h/2+6}" font-size="16">${icon}</text>
    ${text(x + 44, y + h/2 + 5, msg, { fontSize: 12.5, fill: color, weight: 700 })}`;
}

// ---------- Topic list rows (Topics tab overview) ----------
function topicList(items, opts = {}) {
  const { x = 24, y = 20, width = 640 } = opts;
  const rowH = 46;
  const rows = items.map((it, i) => {
    const ry = y + i * (rowH + 8);
    return `${rrect(x, ry, width, rowH, 8, COL.white, { stroke: COL.gray200, strokeWidth: 1 })}
      <circle cx="${x+26}" cy="${ry+rowH/2}" r="12" fill="${it.color || COL.blueLight}"/>
      <text x="${x+26}" y="${ry+rowH/2+4}" font-size="12" text-anchor="middle">${it.emoji||'💬'}</text>
      ${text(x+50, ry+19, it.name, { fontSize: 12.5, weight: 700, fill: COL.gray900 })}
      ${text(x+50, ry+35, it.trigger, { fontSize: 10.5, fill: COL.gray500 })}
      ${it.status ? badge(x+width-90, ry+12, it.status, COL.green, COL.greenBg) : ''}`;
  }).join('');
  return rows;
}

module.exports = {
  COL, esc, wrapText, rrect, text, badge, button,
  browserFrame, studioChrome, m365Chrome, teamsChrome,
  chatMessages, knowledgeList, topicCanvasNodes, resultsTable, toggle,
  textInput, textArea, checkRow, iconGrid, barCompare, calloutBanner, topicList,
};
