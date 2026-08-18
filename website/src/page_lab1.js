const { M, step, mockup, box, promptBox, metaTable, conceptTable, pageShell, writePage } = require('./build.js');

function build() {
  // ---- Mockup 1: Empty M365 Copilot chat ----
  const m1body = `
    ${M.text(30, 40, 'Copilot Chat', { fontSize: 16, weight: 700, fill: M.COL.navy })}
    ${M.rrect(30, 340, 700, 60, 10, M.COL.white, { stroke: M.COL.gray300, strokeWidth: 1.3 })}
    ${M.text(50, 375, 'Message Copilot...', { fontSize: 13, fill: M.COL.gray500 })}
    ${M.text(400, 200, '✨', { fontSize: 40, anchor: 'middle' })}
    ${M.text(400, 240, 'พิมพ์คำถาม หรือเลือก "New agent" ทางซ้ายเพื่อเริ่มสร้าง Agent', { fontSize: 12.5, fill: M.COL.gray500, anchor: 'middle' })}
  `;
  const mock1 = M.m365Chrome({ bodyHeight: 420, sidebarActive: 'New chat', body: m1body });

  // ---- Mockup 2: New agent - empty describe box ----
  const m2body = `
    ${M.text(30, 36, 'สร้าง Agent ใหม่', { fontSize: 16, weight: 700, fill: M.COL.navy })}
    ${M.text(30, 58, 'Describe the agent you want to create', { fontSize: 12, fill: M.COL.gray500 })}
    ${M.textArea(30, 74, 700, 90, '', 'พิมพ์คำอธิบาย Agent ที่ต้องการที่นี่...', {})}
    ${M.button(650, 178, 80, 32, 'Send →', { fill: M.COL.blue })}
  `;
  const mock2 = M.m365Chrome({ bodyHeight: 260, sidebarActive: 'New agent', body: m2body });

  // ---- Mockup 3: Description filled (as user chat bubble) ----
  const descText = 'สร้าง Agent สไตล์ครูผู้สอน ที่ช่วยอธิบายความแตกต่างระหว่าง Microsoft 365 Copilot และ Copilot Chat ตอบคำถามด้วยน้ำเสียงเป็นกันเอง และอ้างอิงจากเอกสาร Microsoft เท่านั้น';
  const chat3 = M.chatMessages([{ from: 'user', text: descText }], { width: 760, startY: 20 });
  const m3body = `${chat3.svg}
    ${M.text(30, chat3.endY + 20, '🤖 Agent Builder กำลังสร้างชื่อ, Tone และ Starter Prompts ให้อัตโนมัติ...', { fontSize: 12, fill: M.COL.gray500 })}`;
  const mock3 = M.m365Chrome({ bodyHeight: Math.max(220, chat3.endY + 50), sidebarActive: 'New agent', body: m3body });

  // ---- Mockup 4: Knowledge source added ----
  const kl4 = M.knowledgeList([
    { icon: '🌐', name: 'learn.microsoft.com/microsoft-365-copilot', type: 'Public website', status: 'Ready' },
    { icon: '🌐', name: 'learn.microsoft.com/microsoft-copilot-studio', type: 'Public website', status: 'Ready' },
  ], { width: 700 });
  const m4body = `${M.text(30, 36, 'Configure → Knowledge', { fontSize: 14, weight: 700, fill: M.COL.navy })}
    <g transform="translate(6,50)">${kl4.svg}</g>`;
  const mock4 = M.m365Chrome({ bodyHeight: kl4.endY + 90, sidebarActive: 'New agent', body: m4body });

  // ---- Mockup 5: toggle only specified sources ON ----
  const m5body = `${M.text(30, 36, 'Configure → Knowledge', { fontSize: 14, weight: 700, fill: M.COL.navy })}
    ${M.rrect(30, 56, 700, 70, 8, M.COL.white, { stroke: M.COL.gray200, strokeWidth: 1 })}
    ${M.text(50, 84, 'Only use specified sources', { fontSize: 13, weight: 700, fill: M.COL.gray900 })}
    ${M.text(50, 102, 'ใช้เฉพาะ Knowledge ที่กำหนดไว้ ไม่ใช้ความรู้ทั่วไปของ AI', { fontSize: 11, fill: M.COL.gray500 })}
    ${M.toggle ? '' : ''}
    ${M.rrect(640, 72, 44, 22, 11, M.COL.blue)}<circle cx="672" cy="83" r="8" fill="${M.COL.white}"/>
    ${M.text(670, 88, 'On', { fontSize: 11, fill: M.COL.blue, weight: 700, anchor: 'middle' })}
  `;
  const mock5 = M.m365Chrome({ bodyHeight: 160, sidebarActive: 'New agent', body: m5body });

  // ---- Mockup 6: Test Q&A ----
  const chat6 = M.chatMessages([
    { from: 'user', text: 'อธิบายความแตกต่างระหว่าง Microsoft 365 Copilot กับ Copilot Chat หน่อย' },
    { from: 'agent', text: 'ยินดีครับ! M365 Copilot เชื่อมกับข้อมูลองค์กรของคุณ (อีเมล เอกสาร) ส่วน Copilot Chat ใช้ข้อมูลจากเว็บสาธารณะเป็นหลัก มีคำถามต่อไหมครับ 😊' },
  ], { width: 760 });
  const mock6 = M.m365Chrome({ bodyHeight: chat6.endY + 30, sidebarActive: 'HR Helper', body: chat6.svg });

  // ---- Mockup 7: IT department example ----
  const chat7 = M.chatMessages([
    { from: 'user', text: 'ลืมรหัสผ่าน Login เข้าระบบ ต้อง Reset ยังไง?' },
    { from: 'agent', text: 'ไปที่ portal.company.com/reset → กรอกอีเมลบริษัท → กด Reset Link ที่ส่งไปในอีเมล ใช้เวลาไม่เกิน 5 นาทีครับ หากยังเข้าไม่ได้ ติดต่อ IT Helpdesk ต่อ 2222' },
  ], { width: 760 });
  const mock7 = M.m365Chrome({ bodyHeight: chat7.endY + 30, sidebarActive: 'IT Helpdesk Bot', body: chat7.svg });

  const bodyHtml = `
    <p>ใน Lab นี้คุณจะสร้าง AI Agent ตัวแรกโดยใช้ <strong>Microsoft 365 Agent Builder</strong> — เครื่องมือสร้าง Agent ที่ง่ายที่สุด ไม่ต้องตั้งค่าอะไรซับซ้อน เหมาะสำหรับเริ่มต้นและทำ Prototype อย่างรวดเร็ว</p>

    ${metaTable([
      ['Level', '<span class="badge badge-green">100 · เริ่มต้น</span>'],
      ['Persona', 'ผู้เริ่มต้นทุกคน (ไม่ต้องมีพื้นฐาน IT)'],
      ['ระยะเวลา', '35 นาที'],
      ['เป้าหมาย', 'สร้าง Agent ที่ตอบคำถามจาก Knowledge Source ที่กำหนดได้จริง และทดสอบผ่าน M365 Copilot Chat'],
    ])}

    ${box('note', 'M365 Agent Builder vs Copilot Studio', `
      ${conceptTable(['เครื่องมือ', 'เหมาะกับ'], [
        ['M365 Agent Builder', 'สร้าง Agent เร็ว จาก Description ง่ายๆ เชื่อม Knowledge จากเว็บได้ — ใช้ใน Lab นี้'],
        ['Copilot Studio', 'ตั้งค่าละเอียดกว่า เชื่อม SharePoint/ไฟล์ได้ สร้าง Topics และ Evaluation ได้ — ใช้ใน Lab 2 เป็นต้นไป'],
      ])}
    `)}

    ${box('tip', 'Grounding คืออะไร?', `
      <p><strong>Grounding</strong> คือการ "ยึด" คำตอบของ Agent ไว้กับ Knowledge Source ที่กำหนด แทนที่จะปล่อยให้ Agent ตอบจากความรู้ทั่วไปของ AI เอง — เป็นหัวใจของ RAG ที่ทำให้คำตอบแม่นยำและลด Hallucination (การเดาคำตอบมั่ว) ทุก Lab ในคอร์สนี้จะเน้นเรื่อง Grounding เป็นหลัก</p>
    `)}

    <h2 id="step1">ขั้นตอนที่ 1–2: เปิด M365 Copilot และเริ่มสร้าง Agent</h2>
    ${step(1, 'เปิด Microsoft 365 Copilot Chat', `
      <p>เปิด Browser ไปที่ <code>https://m365.cloud.microsoft/chat</code> แล้ว Login ด้วย Account ที่ได้รับ รอหน้า Chat โหลดให้เสร็จ</p>
      ${box('warn', '', '<p>⚠️ URL ต้องเป็น <code>m365.cloud.microsoft/chat</code> เท่านั้น — URL ที่คล้ายกันอย่าง <code>copilot.cloud.microsoft</code> เป็นคนละหน้าและจะไม่มีเมนู "New agent" ให้ใช้</p>')}
      ${mockup(mock1, 'หน้าจอ Microsoft 365 Copilot Chat หลัง Login สำเร็จ')}
    `)}
    ${step(2, 'เปิด Agent Builder', `
      <p>มองหาเมนู <strong>"Agents"</strong> ทางด้านซ้าย หรือกด <strong>"+ New agent"</strong> เพื่อเปิดหน้าสร้าง Agent ใหม่</p>
      ${mockup(mock2, 'หน้าจอ New agent — ช่อง Describe the agent you want to create')}
    `)}

    <h2 id="step3">ขั้นตอนที่ 3–5: อธิบาย Agent และเพิ่ม Knowledge</h2>
    ${step(3, 'ใส่คำอธิบาย Agent (Description)', `
      <p>พิมพ์คำอธิบายลงในช่อง Describe เช่น ต้องการ Agent สไตล์ครู ที่ตอบคำถามเรื่อง Copilot โดยอ้างอิงจากเอกสาร Microsoft เท่านั้น</p>
      ${mockup(mock3, 'พิมพ์ Description แล้วส่ง — AI จะช่วยตั้งชื่อและ Tone ให้อัตโนมัติ')}
      ${box('tip', 'เขียน Description/Instructions ให้ครบ 5 มุม', `
        ${conceptTable(['ส่วน', 'ใส่อะไร'], [
          ['Role', 'Agent คือใคร ทำงานให้ใคร'],
          ['Task', 'สิ่งที่ต้องทำหลัก'],
          ['Scope', 'ขอบเขตข้อมูล/สิ่งที่ตอบได้-ไม่ได้'],
          ['Rule', 'กฎ ข้อจำกัด รูปแบบคำตอบ'],
          ['Tone', 'น้ำเสียง/บุคลิกในการตอบ'],
        ])}
        <p style="margin-top:8px;font-size:12.5px;color:${M.COL.gray500}">Checklist 5 ส่วนนี้ช่วยเช็คว่าเขียน Description/Instructions ครบทุกมุมหรือยัง — Lab 3 จะแนะนำ <strong>CARE Framework</strong> อย่างเป็นทางการต่อจากนี้</p>
      `)}
      ${promptBox('ตัวอย่าง Description — Copy ไปวางในช่อง Describe ได้เลย', 'Role: คุณคือ "Copilot Teacher" ครูผู้สอนที่เป็นกันเอง ช่วยพนักงานเข้าใจการใช้งาน Microsoft Copilot\nTask: อธิบายความแตกต่างระหว่าง Microsoft 365 Copilot กับ Copilot Chat และตอบคำถามการใช้งานที่เกี่ยวข้อง\nScope: ตอบจากเอกสาร Microsoft ที่กำหนดไว้เท่านั้น ห้ามตอบจากความรู้ทั่วไป — คำถามนอกเรื่อง Copilot ให้ปฏิเสธสุภาพแล้วชวนกลับมาคุยเรื่อง Copilot\nRule: ใช้ภาษาที่เข้าใจง่าย ไม่ใช้ศัพท์เทคนิคเกินจำเป็น\nTone: เป็นกันเอง ใจดี เหมือนครูที่อดทนสอนทีละขั้น')}
      ${box('tip', '', '<p>ยิ่งอธิบายละเอียดเท่าไหร่ Agent ยิ่งดีเท่านั้น — ก่อนกด Create ให้ตรวจ Starter prompts ที่ระบบสร้างให้ในแท็บ Configure ด้วย ปรับแก้ให้ตรงคำถามที่ผู้ใช้จะถามบ่อยได้เลย</p>')}
    `)}
    ${step(4, 'เพิ่ม Knowledge Source', `
      <p>ไปที่แท็บ <strong>Configure → Knowledge</strong> แล้วใส่ URL เว็บไซต์ที่ต้องการให้ Agent อ้างอิง เช่น เว็บ Documentation ขององค์กร</p>
      ${mockup(mock4, 'Knowledge Sources ถูกเพิ่มและ Index เสร็จแล้ว (Status: Ready)')}
    `)}
    ${step(5, 'เปิด "Only use specified sources"', `
      <p>เลื่อนหา Toggle นี้ในส่วน Knowledge แล้วเปิดเป็น <strong>On</strong> เพื่อบังคับให้ Agent ตอบจาก Knowledge ที่กำหนดเท่านั้น</p>
      ${mockup(mock5, 'เปิด Toggle "Only use specified sources" เป็น On')}
      ${box('warn', '', '<p>ถ้าไม่เปิด Toggle นี้ Agent จะตอบจากความรู้ทั่วไปของ AI ด้วย อาจได้คำตอบที่ไม่ตรงกับเอกสารขององค์กรคุณ</p>')}
    `)}

    <h2 id="step6">ขั้นตอนที่ 6: สร้างและทดสอบ Agent</h2>
    ${step(6, 'กด Create แล้วทดสอบถามคำถาม', `
      <p>ตรวจสอบการตั้งค่าในแท็บ Configure อีกครั้ง แล้วกด <strong>Create</strong> มุมขวาบน จากนั้นถามคำถามทดสอบในช่อง Chat</p>
      ${mockup(mock6, 'ทดสอบถามคำถาม — Agent ตอบพร้อมโทนที่กำหนดไว้')}
      ${mockup(mock7, 'ตัวอย่างแบบเดียวกัน แต่คนละแผนก: IT Helpdesk Bot ตอบคำถาม Reset Password ด้วยขั้นตอนเดียวกับ Lab นี้ทุกประการ')}
      ${promptBox('ตัวอย่าง Description สำหรับ IT — Copy ไปปรับใช้ได้', 'Role: คุณคือ "IT Helpdesk Bot" ผู้ช่วยแก้ปัญหา IT เบื้องต้นให้พนักงาน\nTask: ช่วยพนักงานแก้ปัญหาเบื้องต้นเกี่ยวกับระบบ IT เช่น Reset Password และขอสิทธิ์เข้าถึงระบบ\nScope: อ้างอิงคำตอบจากคู่มือ IT ภายในองค์กรที่กำหนดไว้เท่านั้น — ถ้าปัญหาซับซ้อนเกินขั้นตอนพื้นฐาน ให้แนะนำติดต่อ IT Helpdesk พร้อมเบอร์ติดต่อ\nRule: ตอบเป็นขั้นตอนที่ทำตามได้ทันที เป็นข้อๆ สั้นกระชับ\nTone: กระชับ ตรงไปตรงมา เหมือนทีม Support ที่ช่วยแก้ปัญหาได้จริง')}
    `)}

    ${box('success', '', '<p>คุณสร้าง RAG Agent ตัวแรกสำเร็จแล้ว! Agent นี้ตอบจาก Knowledge Source ที่คุณกำหนด ไม่ใช่ความรู้ทั่วไปของ AI</p>')}

    <h2 id="mistakes">⚠️ ข้อผิดพลาดที่พบบ่อย</h2>
    <ul>
      <li>ลืมเปิด <strong>"Only use specified sources"</strong> → Agent ตอบนอกเรื่องได้</li>
      <li>ใส่ URL หลายอันในข้อความเดียว → ระบบอาจรับแค่อันแรก ให้ใส่ทีละ URL</li>
      <li>คำอธิบาย Agent สั้นเกินไป → ได้ Agent ที่ Tone ไม่ตรงกับที่ต้องการ ลองอธิบายให้ละเอียดขึ้น</li>
    </ul>

    <h2 id="challenge">🎯 ลองประยุกต์ใช้กับงานคุณ</h2>
    ${box('note', 'ไอเดีย Agent ตามแผนกงาน — เลือกที่ตรงกับคุณเป็นจุดเริ่มต้น', `
      ${conceptTable(['แผนก', 'ตัวอย่าง Agent ที่สร้างได้'], [
        ['Sales Engineer', 'ตอบสเปกสินค้า ราคา โปรโมชั่น จากแคตตาล็อกและใบเสนอราคา'],
        ['Engineer', 'ตอบคู่มือซ่อมบำรุง สเปกเครื่องจักร ขั้นตอนขอใบอนุญาตทำงาน (Work Permit)'],
        ['HR', 'ตอบนโยบายบริษัท สวัสดิการ วันลา จากคู่มือพนักงาน'],
        ['Warehouse', 'ตอบขั้นตอนความปลอดภัย การจัดเก็บสินค้า อุปกรณ์ PPE ที่ต้องใช้ในแต่ละโซน'],
        ['IT', 'ตอบ FAQ การใช้งานระบบภายใน ขั้นตอนขอสิทธิ์เข้าถึง (Access Request)'],
        ['Programmer', 'ตอบ Coding Standard, API Documentation, ขั้นตอน Deploy ของทีม'],
        ['Logistic', 'ตอบตารางเวลาขนส่ง นโยบายการจัดส่ง วิธีติดตามสถานะสินค้า'],
      ])}
    `)}
    <ul>
      <li>แผนกของคุณอยากได้ Agent ตอบคำถามเรื่องอะไร?</li>
      <li>มีเว็บไซต์หรือ Documentation ภายในที่ใช้เป็น Knowledge Source ได้ไหม?</li>
      <li>ลองเปลี่ยน Tone ของ Agent ให้เหมาะกับผู้ใช้งานของแผนกคุณ</li>
    </ul>
  `;

  const html = pageShell({
    file: 'lab1.html',
    title: 'Lab 1: M365 Agent Builder — RAG Course',
    eyebrow: 'LAB 1 · ⏱ 35 นาที · Level 100',
    heroTitle: '🚀 M365 Agent Builder — Quick Win!',
    heroLead: 'สร้าง AI Agent ตัวแรกของคุณใน Microsoft 365 Copilot Chat ภายใน 10 นาที ไม่ต้องตั้งค่าอะไรซับซ้อน',
    pills: [['⏱', '35 นาที'], ['🎓', 'Level 100'], ['💻', 'No-Code']],
    tocItems: [
      { id: 'step1', label: '1–2. เปิด Copilot + สร้าง Agent' },
      { id: 'step3', label: '3–5. Description + Knowledge' },
      { id: 'step6', label: '6. สร้างและทดสอบ' },
      { id: 'mistakes', label: 'ข้อผิดพลาดที่พบบ่อย' },
      { id: 'challenge', label: 'ลองประยุกต์ใช้' },
    ],
    prevNext: { prev: { href: 'index.html', label: 'หน้าแรก' }, next: { href: 'lab2.html', label: 'Lab 2: Copilot Studio + Knowledge' } },
    bodyHtml,
  });
  writePage('lab1.html', html);
}

module.exports = { build };
