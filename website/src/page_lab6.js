const { M, step, mockup, box, promptBox, metaTable, conceptTable, pageShell, writePage } = require('./build.js');

function build() {
  // ---- Mockup 1: Outlook draft email test ----
  const chat1 = M.chatMessages([
    { from: 'user', text: 'ช่วยร่างอีเมลต้อนรับพนักงานใหม่ชื่อสมชาย ใจดี ให้หน่อย' },
    { from: 'agent', text: '✅ ร่างอีเมลเรียบร้อยแล้วครับ (บันทึกเป็น Draft ในกล่องขาออกของคุณ)\n\nถึง: somchai.j@xyz-industry.co.th\nหัวข้อ: ยินดีต้อนรับสู่ทีม XYZ Industry\n\n"สวัสดีครับคุณสมชาย ยินดีต้อนรับเข้าร่วมทีม XYZ Industry..."' },
  ], { width: 660 });
  const mock1 = M.studioChrome({ activeTab: 'Overview', agentName: 'HR Onboarding Agent', body: chat1.svg, bodyHeight: chat1.endY + 30, showTest: true });

  // ---- Mockup 2: Teams create meeting test ----
  const chat2 = M.chatMessages([
    { from: 'user', text: 'นัดประชุม Orientation ให้สมชายวันจันทร์หน้า 10 โมงเช้าหน่อย' },
    { from: 'agent', text: '✅ สร้างนัดหมาย Teams Meeting เรียบร้อยแล้วครับ\n\nหัวข้อ: Orientation — สมชาย ใจดี\nวันที่: จันทร์ที่ 25 ส.ค. 2569 เวลา 10:00–11:00 น.\nผู้เข้าร่วม: สมชาย ใจดี, หัวหน้างาน, HR' },
  ], { width: 660 });
  const mock2 = M.studioChrome({ activeTab: 'Overview', agentName: 'HR Onboarding Agent', body: chat2.svg, bodyHeight: chat2.endY + 30 });

  // ---- Mockup 3: SharePoint create folder test ----
  const chat3 = M.chatMessages([
    { from: 'user', text: 'สร้างโฟลเดอร์เอกสารสำหรับพนักงานใหม่ชื่อสมชายให้หน่อย' },
    { from: 'agent', text: '✅ สร้างโฟลเดอร์เรียบร้อยแล้วครับ\n\n📁 /Onboarding/2569/สมชาย_ใจดี\n(Copy เอกสาร Onboarding Template ไว้ในโฟลเดอร์นี้ให้แล้ว)' },
  ], { width: 660 });
  const mock3 = M.studioChrome({ activeTab: 'Overview', agentName: 'HR Onboarding Agent', body: chat3.svg, bodyHeight: chat3.endY + 30 });

  // ---- Mockup 4: Capstone Topic canvas — 3 questions + 3 chained actions ----
  const n4 = M.topicCanvasNodes([
    { label: 'Add from description: "พนักงานใหม่เริ่มงาน..."', type: 'trigger', x: 40, y: 20 },
    { label: 'ชื่อพนักงานใหม่คืออะไร?', type: 'question', x: 40, y: 120 },
    { label: 'วันที่เริ่มงานคือวันไหน?', type: 'question', x: 40, y: 220 },
    { label: 'แผนกไหน?', type: 'question', x: 40, y: 320 },
    { label: 'SharePoint: Create new folder', type: 'action', x: 40, y: 420 },
    { label: 'Outlook: Draft an email message', type: 'action', x: 40, y: 520 },
    { label: 'Teams: Create a Teams meeting', type: 'action', x: 40, y: 620 },
  ]);
  const mock4 = M.studioChrome({ activeTab: 'Topics', agentName: 'HR Onboarding Agent', body: n4, bodyHeight: 720 });

  // ---- Mockup 5: End-to-end test ----
  const chat5 = M.chatMessages([
    { from: 'user', text: 'พนักงานใหม่ชื่อสมชาย ใจดี เริ่มงานวันที่ 1 กันยายน 2569 แผนก Warehouse' },
    { from: 'agent', text: 'รับทราบครับ กำลังเตรียมการต้อนรับให้คุณสมชาย...\n\n📁 สร้างโฟลเดอร์เอกสารแล้ว: /Onboarding/2569/สมชาย_ใจดี\n📧 ร่างอีเมลต้อนรับแล้ว (รอคุณกดส่ง)\n📅 นัดประชุม Orientation วันที่ 1 ก.ย. 2569 เวลา 09:00 น. แล้ว\n\nเสร็จสิ้นครบทั้ง 3 ขั้นตอนครับ!' },
  ], { width: 660 });
  const mock5 = M.studioChrome({ activeTab: 'Overview', agentName: 'HR Onboarding Agent', body: chat5.svg, bodyHeight: chat5.endY + 30 });

  const bodyHtml = `
    <p>Agent ที่เรียนมาทั้งวันตอบคำถามจาก Knowledge ได้ดีแล้ว แต่ Agent ที่เก่งจริงต้อง <strong>"ลงมือทำงานแทนคน"</strong> ได้ด้วย — Lab นี้สอนเพิ่ม Actions/Tools ให้ Agent เชื่อมกับ Outlook, Teams และ SharePoint แล้วรวมเป็น Agent เดียวที่ทำงาน Onboarding พนักงานใหม่ให้อัตโนมัติ</p>

    ${metaTable([
      ['Level', '<span class="badge badge-blue">200</span>'],
      ['Persona', 'Maker ที่อยากให้ Agent ลงมือทำงานแทน ไม่ใช่แค่ตอบคำถาม'],
      ['ระยะเวลา', '35 นาที'],
      ['เป้าหมาย', 'เพิ่ม Actions จาก Outlook/Teams/SharePoint แล้วรวมเป็น Capstone Scenario "HR Onboarding Agent"'],
    ])}

    ${box('note', 'Knowledge vs. Actions/Tools ต่างกันอย่างไร', `
      ${conceptTable(['ความสามารถ', 'ทำอะไร'], [
        ['📚 Knowledge (เรียนมาทั้งวัน)', 'Agent "อ่าน/ค้นข้อมูล" จากไฟล์ เว็บ หรือ SharePoint มาตอบคำถาม (Retrieval) — ไม่เปลี่ยนแปลงอะไรในระบบอื่น'],
        ['🔌 Actions/Tools (Lab นี้)', 'Agent "ลงมือทำงานจริง" แทนคน ผ่าน Pre-built Connector สำเร็จรูปหลายร้อยตัวของ Microsoft (Outlook, Teams, SharePoint, Dynamics, ...) แบบ No-Code'],
      ])}
      <p style="margin-top:10px;font-size:12.5px;color:${M.COL.gray500}">ต่างจาก Live Data RAG ใน Roadmap Day 2 ตรงที่ Actions ใช้ Connector สำเร็จรูปที่ Microsoft เตรียมไว้ให้แล้ว ไม่ต้องเขียน Custom Connector หรือ MCP Server เอง</p>
    `)}

    <h2 id="step1">ขั้นตอนที่ 1: ลองเพิ่ม Action แรก — Outlook</h2>
    ${step(1, 'เปิดหน้า Add tool และค้นหา Action ของ Outlook', `
      <p>ไปที่แท็บ <strong>Tools</strong> → กด <strong>+ Add a tool</strong> → เลือก <strong>Office 365 Outlook</strong> → ค้นหาและเลือก <strong>"Draft an email message"</strong> → กด Add</p>
      ${mockup('<img src="assets/copilot_tool3.png" style="width:100%;display:block" alt="หน้าต่าง Add tool ค้นหา Action ของ Office 365 Outlook">', 'หน้าต่าง Add tool — ค้นหา Action ที่ต้องการจาก Office 365 Outlook')}
      ${box('tip', '', '<p>ครั้งแรกที่ใช้งาน Action ของ Connector แต่ละตัว ระบบจะขอให้ <strong>Connect</strong> บัญชี Microsoft 365 ก่อน (Authentication แบบ OAuth) — ทำครั้งเดียวต่อ Connector เท่านั้น ครั้งต่อไปใช้ได้เลยไม่ต้อง Connect ซ้ำ</p>')}
    `)}
    ${step(2, 'ทดสอบสั่งให้ Agent ร่างอีเมล', `
      <p>ไปที่ Test Pane → พิมพ์สั่งให้ Agent ร่างอีเมลต้อนรับพนักงานใหม่</p>
      ${mockup(mock1, 'Agent เรียกใช้ Action "Draft an email message" สำเร็จ')}
      ${box('warn', '', '<p>สังเกตว่า Agent แค่ <strong>"ร่าง (Draft)"</strong> อีเมลไว้ ไม่ได้กดส่งจริงทันที — ตรวจสอบ Advanced settings ของแต่ละ Action ได้ว่ามีตัวเลือก "Require user confirmation before performing this action" หรือไม่ ควรเปิดไว้เสมอสำหรับ Action ที่ส่งผลกระทบจริง เช่น การส่งอีเมลหรือสร้างนัดหมาย</p>')}
    `)}

    <h2 id="step3">ขั้นตอนที่ 2: เพิ่ม Action จาก Teams</h2>
    ${step(3, 'เพิ่ม Action "Create a Teams meeting"', `
      <p>+ Add a tool → เลือก <strong>Microsoft Teams</strong> → ค้นหาและเลือก <strong>"Create a Teams meeting"</strong> → กด Add แล้วทดสอบสั่งนัดประชุมใน Test Pane</p>
      ${mockup('<img src="assets/copilot_tool2.png" style="width:100%;display:block" alt="หน้าต่าง Add tool ค้นหา Action ของ Microsoft Teams">', 'หน้าต่าง Add tool — ค้นหา Action ที่ต้องการจาก Microsoft Teams')}
      ${mockup(mock2, 'Agent เรียกใช้ Action "Create a Teams meeting" สำเร็จ')}
    `)}

    <h2 id="step4">ขั้นตอนที่ 3: เพิ่ม Action จาก SharePoint</h2>
    ${step(4, 'เพิ่ม Action "Create new folder"', `
      <p>+ Add a tool → เลือก <strong>SharePoint</strong> → ค้นหาและเลือก <strong>"Create new folder"</strong> → กด Add แล้วทดสอบสั่งสร้างโฟลเดอร์ใน Test Pane</p>
      ${mockup('<img src="assets/copilot_tool1.png" style="width:100%;display:block" alt="หน้าต่าง Add tool ค้นหา Action ของ SharePoint">', 'หน้าต่าง Add tool — ค้นหา Action ที่ต้องการจาก SharePoint')}
      ${mockup(mock3, 'Agent เรียกใช้ Action "Create new folder" สำเร็จ')}
    `)}

    <h2 id="step5">ขั้นตอนที่ 4–5: รวมเป็น Capstone — "HR Onboarding Agent"</h2>
    ${step(5, 'สร้าง Topic "Onboarding" ที่เรียก 3 Actions ต่อกัน', `
      <p>Topics → + Add a topic → <strong>Add from description with Copilot</strong> → อธิบาย Flow ที่ต้องการ ให้ AI สร้าง Question node เก็บข้อมูลพนักงานใหม่ แล้วต่อด้วย Action node ทั้ง 3 ตัวที่เพิ่มไว้ก่อนหน้านี้ตามลำดับ</p>
      ${mockup(mock4, 'Topic "Onboarding" — เก็บข้อมูลพนักงานใหม่ 3 คำถาม แล้วเรียก 3 Actions ต่อกัน: SharePoint → Outlook → Teams')}
      ${promptBox('ตัวอย่างคำอธิบาย Topic "Onboarding" — สำหรับ Add from description with Copilot', 'สร้าง Topic ชื่อ Onboarding ที่เก็บข้อมูลพนักงานใหม่ทีละคำถาม: ชื่อพนักงาน, วันที่เริ่มงาน, แผนก จากนั้นเรียกใช้ Action ตามลำดับนี้: (1) SharePoint สร้างโฟลเดอร์เอกสารชื่อพนักงานในไลบรารี Onboarding (2) Outlook ร่างอีเมลต้อนรับส่งถึงพนักงานใหม่ (3) Teams สร้างนัดประชุม Orientation วันแรกที่เริ่มงาน เวลา 09:00 น. เชิญพนักงานใหม่และหัวหน้างาน สุดท้ายสรุปผลทั้ง 3 ขั้นตอนให้ผู้ใช้ทราบ')}
      ${box('tip', '', '<p>ลำดับ Action สำคัญ — วางโฟลเดอร์ SharePoint ไว้ก่อน เผื่อ Action ถัดไปต้องใช้ Path ของโฟลเดอร์นั้นอ้างอิงต่อ (เช่น แนบลิงก์โฟลเดอร์ในอีเมลต้อนรับ)</p>')}
    `)}
    ${step(6, 'ทดสอบ End-to-End ด้วยข้อมูลพนักงานใหม่จริง', `
      <p>พิมพ์ข้อมูลพนักงานใหม่ครบในข้อความเดียว → Agent ควรเรียกทั้ง 3 Actions ต่อกันแล้วสรุปผลให้ครบ</p>
      ${mockup(mock5, 'ทดสอบ Flow เต็ม: กรอกข้อมูลพนักงานใหม่ครั้งเดียว Agent จัดการให้ครบทั้ง 3 ระบบ')}
      ${promptBox('ตัวอย่างข้อความทดสอบ — Copy ไปวางถามได้เลย', 'พนักงานใหม่ชื่อสมชาย ใจดี เริ่มงานวันที่ 1 กันยายน 2569 แผนก Warehouse')}
    `)}

    ${box('success', '', '<p>🎉 Agent ของคุณตอนนี้ไม่ใช่แค่ตอบคำถามจาก Knowledge แล้ว แต่ลงมือทำงานแทนคนได้จริงผ่าน Outlook, Teams และ SharePoint ในคำสั่งเดียว!</p>')}

    <h2 id="mistakes">⚠️ ข้อผิดพลาดที่พบบ่อย</h2>
    <ul>
      <li>ลืม Connect บัญชี Microsoft 365 ก่อนทดสอบ Action ครั้งแรกของแต่ละ Connector</li>
      <li>ปล่อยให้ Agent ส่งอีเมล/สร้างนัดหมายจริงทันทีโดยไม่เปิด "Require user confirmation" → เสี่ยงส่งข้อมูลผิดโดยไม่ตั้งใจ</li>
      <li>ลำดับ Action ในการ Onboarding ผิด (เช่น ส่งอีเมลก่อนสร้างโฟลเดอร์) → ลิงก์เอกสารในอีเมลใช้งานไม่ได้</li>
      <li>สิทธิ์ (Permission) ของบัญชีที่ Connect ไม่ครอบคลุมสิทธิ์ที่ Action ต้องใช้ → Action ทำงานไม่สำเร็จ ต้องขอ IT Admin เพิ่มสิทธิ์</li>
    </ul>

    <h2 id="challenge">🎯 ลองประยุกต์ใช้กับงานคุณ</h2>
    <ul>
      <li>แผนกคุณมีงานที่ทำซ้ำๆ ทุกวัน/ทุกสัปดาห์อะไรบ้าง ที่ Connector ของ Outlook/Teams/SharePoint ช่วยทำแทนได้?</li>
      <li>ลองค้นหา Action อื่นในหน้า Add tool ที่ยังไม่ได้ลอง เช่น "Get messages in a channel" (Teams) หรือ "Get file content" (SharePoint)</li>
    </ul>
  `;

  const html = pageShell({
    file: 'lab6.html',
    title: 'Lab 6: Actions & Tools — RAG Course',
    eyebrow: 'LAB 6 · ⏱ 35 นาที · Level 200',
    heroTitle: '🔌 Actions & Tools — เชื่อม Outlook, Teams, SharePoint',
    heroLead: 'สอน Agent ให้ลงมือทำงานแทนคนได้จริง ผ่าน Pre-built Connector แบบ No-Code แล้วรวมเป็น Capstone "HR Onboarding Agent"',
    pills: [['⏱', '35 นาที'], ['🎓', 'Level 200'], ['🔌', '3 Connectors']],
    tocItems: [
      { id: 'step1', label: '1. Action แรก — Outlook' },
      { id: 'step3', label: '2. Action — Teams' },
      { id: 'step4', label: '3. Action — SharePoint' },
      { id: 'step5', label: '4–5. Capstone Onboarding' },
      { id: 'mistakes', label: 'ข้อผิดพลาดที่พบบ่อย' },
      { id: 'challenge', label: 'ลองประยุกต์ใช้' },
    ],
    prevNext: { prev: { href: 'lab5.html', label: 'Lab 5: Evaluation' }, next: { href: 'lab7.html', label: 'Lab 7: Deploy to Teams' } },
    bodyHtml,
  });
  writePage('lab6.html', html);
}

module.exports = { build };
