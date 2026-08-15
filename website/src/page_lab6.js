const { M, step, mockup, box, metaTable, conceptTable, pageShell, writePage } = require('./build.js');

function build() {
  // ---- Mockup 1: Publish confirmation ----
  const m1body = `
    ${M.calloutBanner(24, 20, 700, '✅', 'The agent was published — Agent เวอร์ชันล่าสุดพร้อมใช้งานแล้ว', {})}
    ${M.text(24, 90, 'Published agent status', { fontSize: 13.5, weight: 700, fill: M.COL.navy })}
    ${M.rrect(24, 100, 700, 50, 8, M.COL.white, { stroke: M.COL.gray200, strokeWidth: 1 })}
    ${M.text(44, 130, '✓ Published by User · เมื่อสักครู่', { fontSize: 12, fill: M.COL.green, weight: 700 })}
  `;
  const mock1 = M.studioChrome({ activeTab: 'Overview', agentName: 'HR Policy Bot', body: m1body, bodyHeight: 180 });

  // ---- Mockup 2: Channels grid ----
  const grid2 = M.iconGrid([
    { emoji: '👥', label: 'Microsoft 365 & Teams', color: M.COL.blueLight, active: true, tag: 'แนะนำ' },
    { emoji: '📂', label: 'SharePoint', color: M.COL.blueLight, active: false },
    { emoji: '🌐', label: 'Web app', color: M.COL.blueLight, active: false },
    { emoji: '📱', label: 'Native app', color: M.COL.blueLight, active: false },
  ], { x: 24, y: 20, cols: 4, tileW: 160, tileH: 90, gap: 14 });
  const m2body = `${M.text(24, 12, 'Channels', { fontSize: 14, weight: 700, fill: M.COL.navy })}${grid2}`;
  const mock2 = M.studioChrome({ activeTab: 'Channels', agentName: 'HR Policy Bot', body: m2body, bodyHeight: 150 });

  // ---- Mockup 3: checkbox panel ----
  const m3body = `
    ${M.text(24, 30, 'Microsoft 365 and Microsoft Teams', { fontSize: 14, weight: 700, fill: M.COL.navy })}
    ${M.rrect(24, 44, 700, 90, 8, M.COL.white, { stroke: M.COL.gray200, strokeWidth: 1 })}
    ${M.text(40, 66, 'Turn on Microsoft 365', { fontSize: 12.5, weight: 700, fill: M.COL.gray900 })}
    ${M.checkRow(40, 78, 'Make agent available in Microsoft 365 Copilot', true)}
    ${M.button(560, 150, 160, 34, 'See agent in Teams', { fill: M.COL.navy, fontSize: 12 })}
  `;
  const mock3 = M.studioChrome({ activeTab: 'Channels', agentName: 'HR Policy Bot', body: m3body, bodyHeight: 210 });

  // ---- Mockup 4: Teams add dialog ----
  const m4body = `
    ${M.text(340, 130, '🤖', { fontSize: 40, anchor: 'middle' })}
    ${M.text(340, 172, 'เพิ่ม HR Policy Bot ใน Teams', { fontSize: 14.5, weight: 700, fill: M.COL.navy, anchor: 'middle' })}
    ${M.text(340, 194, 'Agent นี้จะพร้อมใช้งานในแชทของคุณ', { fontSize: 11.5, fill: M.COL.gray500, anchor: 'middle' })}
    ${M.button(280, 214, 120, 34, 'Add', { fill: M.COL.blue })}
  `;
  const mock4 = M.teamsChrome({ body: m4body, bodyHeight: 280 });

  // ---- Mockup 5: Teams chat test ----
  const chat5 = M.chatMessages([
    { from: 'user', text: 'สวัสดีครับ ขอถามเรื่องนโยบายลาพักร้อน' },
    { from: 'agent', text: 'สวัสดีครับ! พนักงานมีสิทธิ์ลาพักร้อนปีละ 10 วัน สอบถามเพิ่มเติมได้เลยครับ 😊' },
  ], { width: 640 });
  const mock5 = M.teamsChrome({ body: chat5.svg, bodyHeight: chat5.endY + 40 });

  const bodyHtml = `
    <p>Lab สุดท้าย! นำ Agent ที่สร้างมาทั้งวันไป Deploy ให้ทีมงานใช้งานได้จริงผ่าน <strong>Microsoft Teams</strong></p>

    ${metaTable([
      ['Level', '<span class="badge badge-green">100</span>'],
      ['Persona', 'Maker ที่พร้อมนำ Agent ไปใช้งานจริง'],
      ['ระยะเวลา', '15 นาที'],
      ['เป้าหมาย', 'Publish และ Deploy Agent ไปยัง Microsoft Teams ให้ทีมใช้งานได้ทันที'],
    ])}

    <h2 id="step1">ขั้นตอนที่ 1–2: Publish และเปิด Channel</h2>
    ${step(1, 'กด Publish', `
      <p>กด <strong>Publish</strong> มุมขวาบน → ยืนยัน → รอ Status เป็น Published</p>
      ${mockup(mock1, 'Agent ถูก Publish สำเร็จ')}
    `)}
    ${step(2, 'ไปที่ Channels', `
      <p>กด <strong>Channels</strong> ในแถบนำทาง → เลือก "Microsoft 365 and Microsoft Teams"</p>
      ${mockup(mock2, 'ตัวเลือก Channels ที่ Deploy ได้')}
    `)}

    <h2 id="step3">ขั้นตอนที่ 3–4: เปิดใช้งานใน Teams</h2>
    ${step(3, 'ติ๊ก Make available in M365 Copilot', `
      <p>ในหน้า Channel Panel → ติ๊ก Checkbox นี้ → กด Save จากนั้นกด "See agent in Teams"</p>
      ${mockup(mock3, 'เปิดใช้งาน Agent ใน Microsoft 365 Copilot')}
    `)}
    ${step(4, 'เพิ่ม Agent ใน Teams', `
      <p>Browser จะเปิด Teams Web ให้อัตโนมัติ → กด <strong>Add</strong> เพื่อเพิ่ม Agent เข้าบัญชี Teams ของคุณ</p>
      ${mockup(mock4, 'หน้าต่างยืนยันเพิ่ม Agent ใน Teams')}
      ${box('tip', '', '<p>ถ้า Teams ถามว่าจะเปิด Desktop App หรือไม่ ให้เลือก "Use the web app instead" เพื่อความรวดเร็ว</p>')}
    `)}

    <h2 id="step5">ขั้นตอนที่ 5: ทดสอบใน Teams จริง</h2>
    ${step(5, 'พิมพ์คำถามทดสอบใน Teams', `
      <p>ลองพิมพ์คำถามใน Teams Chat กับ Agent เปรียบเทียบ User Experience กับ Test Panel ใน Copilot Studio</p>
      ${mockup(mock5, 'Agent ตอบคำถามใน Microsoft Teams จริง')}
    `)}

    ${box('success', '', '<p>🎉 ยินดีด้วย! Agent ของคุณพร้อมให้ทีมใช้งานจริงผ่าน Microsoft Teams แล้ว — คุณสร้าง RAG Agent ตั้งแต่ต้นจนถึง Production ได้ภายในวันเดียว!</p>')}

    <h2 id="mistakes">⚠️ ข้อผิดพลาดที่พบบ่อย</h2>
    <ul>
      <li>ลืมกด Publish ก่อน → Channel จะยังใช้ Agent เวอร์ชันเก่าอยู่</li>
      <li>App Policy ขององค์กรปิดอยู่ → ต้องติดต่อ IT Admin ให้เปิด Teams App Policy</li>
      <li>ทดสอบใน Test Pane ผ่านแล้วไม่ทดสอบซ้ำใน Teams → บาง Feature อาจแสดงผลต่างกัน</li>
    </ul>

    <h2 id="next">🗺️ ก้าวต่อไปหลังจบคอร์ส</h2>
    <ul>
      <li><strong>Live Data RAG:</strong> เชื่อม Agent กับ Database แบบ Real-time ด้วย MCP Server (Dataverse, ServiceNow)</li>
      <li><strong>Multi-Agent:</strong> สร้าง Agent หลายตัวที่ทำงานร่วมกัน แบ่งความเชี่ยวชาญตามแผนก</li>
      <li><strong>Autonomous Agent:</strong> Agent ที่ทำงานอัตโนมัติตามเวลา ไม่ต้องรอคนถาม</li>
    </ul>
  `;

  const html = pageShell({
    file: 'lab6.html',
    title: 'Lab 6: Deploy to Teams — RAG Course',
    eyebrow: 'LAB 6 · ⏱ 15 นาที · Level 100',
    heroTitle: '🚀 Deploy to Microsoft Teams',
    heroLead: 'ปล่อย RAG Agent ที่สร้างมาทั้งวันให้ทีมใช้งานจริงผ่าน Microsoft Teams',
    pills: [['⏱', '15 นาที'], ['🎓', 'Level 100'], ['✅', 'Production Ready']],
    tocItems: [
      { id: 'step1', label: '1–2. Publish + Channel' },
      { id: 'step3', label: '3–4. เปิดใช้งานใน Teams' },
      { id: 'step5', label: '5. ทดสอบจริง' },
      { id: 'mistakes', label: 'ข้อผิดพลาดที่พบบ่อย' },
      { id: 'next', label: 'ก้าวต่อไป' },
    ],
    prevNext: { prev: { href: 'lab5.html', label: 'Lab 5: Evaluation' }, next: { href: 'index.html', label: 'กลับหน้าแรก 🎉' } },
    bodyHtml,
  });
  writePage('lab6.html', html);
}

module.exports = { build };
