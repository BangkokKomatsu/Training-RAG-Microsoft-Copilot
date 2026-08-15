const { M, LABS_META, pageShell, writePage, box } = require('./build.js');

function build() {
  const labCards = LABS_META.map(l => `
    <a href="${l.href}" class="lab-card">
      <div class="lab-card-head" style="background:${l.color}">
        <span class="icon">${l.icon}</span>
        <div><div class="num">${l.short}</div><h3>${l.title}</h3></div>
      </div>
      <div class="lab-card-body">
        <p>${l.sub}</p>
        <div class="lab-card-foot"><span>⏱ ${l.time}</span><span>เปิดดู →</span></div>
      </div>
    </a>`).join('');

  const agendaRows = [
    ['09:00', 'Welcome + RAG คืออะไร', 'ภาพรวม RAG Agent และทำไมองค์กรควรมี'],
    ['09:20', 'Setup Environment', 'Login Copilot Studio และเตรียมไฟล์'],
    ['09:40', '<a href="lab1.html">Lab 1: M365 Agent Builder</a>', 'สร้าง Agent แรกใน 10 นาที (Quick Win)'],
    ['10:30', '☕ Break', '—'],
    ['10:45', '<a href="lab2.html">Lab 2: Copilot Studio + Knowledge</a>', 'RAG พื้นฐาน — ไฟล์ / เว็บ / SharePoint'],
    ['12:00', '🍱 Lunch Break', '—'],
    ['13:15', '<a href="lab3.html">Lab 3: Prompt Engineering</a>', 'CARE Framework — ปรับ Instructions'],
    ['14:15', '<a href="lab4.html">Lab 4: Custom Topics</a>', 'Fallback + Escalation'],
    ['15:10', '☕ Break', '—'],
    ['15:25', '<a href="lab5.html">Lab 5: Evaluation</a>', 'วัดคุณภาพ RAG + Improvement Loop'],
    ['15:55', '<a href="lab6.html">Lab 6: Deploy to Teams</a>', 'ปล่อยใช้งานจริงใน Microsoft Teams'],
    ['16:15', '🏗️ Free Build + 🎤 Showcase', 'สร้าง RAG Agent ของแผนกตัวเอง + นำเสนอ'],
  ];

  const agendaHtml = `<table class="agenda-table"><thead><tr><th>เวลา</th><th>หัวข้อ</th><th>รายละเอียด</th></tr></thead>
    <tbody>${agendaRows.map(r => `<tr><td class="time">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody>
  </table>`;

  const bodyHtml = `
    <p class="intro-lead">คอร์สนี้พาคุณสร้าง <strong>RAG Agent (Retrieval-Augmented Generation)</strong> ด้วยตัวเองแบบ No-Code ผ่าน Microsoft Copilot Studio — ตั้งแต่ Agent แรกที่ทำได้ใน 10 นาที ไปจนถึง Agent ที่พร้อมใช้งานจริงใน Microsoft Teams ภายในวันเดียว</p>

    ${box('note', 'ใช้เว็บนี้อย่างไร', '<p>คลิกที่ Lab การ์ดด้านล่างเพื่อเปิดคู่มือ Step-by-step แต่ละ Lab มี Mockup หน้าจอจำลอง Copilot Studio ประกอบทุกขั้นตอนสำคัญ ทำตามได้เลยแบบไม่ต้องสลับดูเอกสารหลายที่</p>')}

    <h2 id="labs">🔬 Lab ทั้งหมดในคอร์สนี้</h2>
    <div class="lab-grid">${labCards}</div>

    <h2 id="agenda">📅 Agenda เต็มวัน (09:00–16:30 น.)</h2>
    ${agendaHtml}

    <h2 id="roadmap">🗺️ Roadmap หลังจบคอร์สนี้</h2>
    <table class="concept-table">
      <thead><tr><th>ระดับ</th><th>ชื่อคอร์ส</th><th>สิ่งที่ได้เรียนรู้เพิ่ม</th></tr></thead>
      <tbody>
        <tr><td class="term">คอร์สนี้ (Day 1)</td><td><strong>Static RAG</strong> (No-Code)</td><td>Agent เชื่อมกับไฟล์ เว็บ และ SharePoint — เหมาะกับทุกคน</td></tr>
        <tr><td class="term">Day 2</td><td><strong>Live Data RAG</strong> (Low-Code)</td><td>Agent ดึงข้อมูล Real-time จาก Database ด้วย MCP Server</td></tr>
        <tr><td class="term">Day 3</td><td><strong>Multi-Agent & Autonomous</strong></td><td>Agent หลายตัวทำงานร่วมกัน และทำงานอัตโนมัติตามเวลา</td></tr>
      </tbody>
    </table>
  `;

  const html = pageShell({
    file: 'index.html',
    title: 'Build Your Own RAG Agent — คอร์สอบรม 1 วัน',
    eyebrow: 'AI WORKSHOP · 1 วัน · 09:00–16:30 น.',
    heroTitle: 'สร้าง RAG Agent ด้วยตัวเอง<br>ด้วย Microsoft Copilot Studio',
    heroLead: 'คู่มือสอนฉบับภาษาไทย พร้อม Mockup หน้าจอจำลองทุกขั้นตอน — ไม่ต้องมีพื้นฐาน Coding',
    pills: [['⏱', '1 วัน · 09:00–16:30 น.'], ['🎯', '6 Labs'], ['💻', 'No-Code 100%'], ['🚀', 'Deploy ได้จริงใน Teams']],
    isHome: true,
    bodyHtml,
  });
  writePage('index.html', html);
}

module.exports = { build };
