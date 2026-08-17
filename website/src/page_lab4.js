const { M, step, mockup, box, promptBox, metaTable, conceptTable, pageShell, writePage } = require('./build.js');

function build() {
  // ---- Mockup 1: Topics list ----
  const tl1 = M.topicList([
    { emoji: '👋', name: 'Greeting', trigger: 'Trigger: Conversation Start', status: 'On', color: M.COL.blueLight },
    { emoji: '❓', name: 'Fallback', trigger: 'Trigger: All other conditions met', status: 'On', color: M.COL.orangeBg },
  ], { width: 700 });
  const m1body = `${M.text(24, 30, 'Topics', { fontSize: 14, weight: 700, fill: M.COL.navy })}
    ${M.button(650, 16, 74, 28, '+ Add', { fill: M.COL.blue })}
    <g transform="translate(0,44)">${tl1}</g>`;
  const mock1 = M.studioChrome({ activeTab: 'Topics', agentName: 'HR Policy Bot', body: m1body, bodyHeight: 200 });

  // ---- Mockup 2: trigger node only ----
  const n2 = M.topicCanvasNodes([{ label: 'When no other topic matches', type: 'trigger', x: 40, y: 20 }]);
  const mock2 = M.studioChrome({ activeTab: 'Topics', agentName: 'HR Policy Bot', body: n2, bodyHeight: 130 });

  // ---- Mockup 3: trigger + message ----
  const n3 = M.topicCanvasNodes([
    { label: 'When no other topic matches', type: 'trigger', x: 40, y: 20 },
    { label: 'ขออภัย ไม่พบข้อมูลนี้ในเอกสาร Policy', type: 'message', x: 40, y: 120 },
  ]);
  const mock3 = M.studioChrome({ activeTab: 'Topics', agentName: 'HR Policy Bot', body: n3, bodyHeight: 230 });

  // ---- Mockup 4: Escalation topic (3 questions) ----
  const n4 = M.topicCanvasNodes([
    { label: 'Escalation triggered', type: 'trigger', x: 40, y: 20 },
    { label: 'ชื่อของคุณคืออะไร?', type: 'question', x: 40, y: 120 },
    { label: 'อีเมลของคุณคืออะไร?', type: 'question', x: 40, y: 220 },
    { label: 'ขอบคุณครับ ทีมงานจะติดต่อกลับ', type: 'message', x: 40, y: 320 },
  ]);
  const mock4 = M.studioChrome({ activeTab: 'Topics', agentName: 'HR Policy Bot', body: n4, bodyHeight: 420 });

  // ---- Mockup 5: fallback -> redirect to escalation ----
  const n5 = M.topicCanvasNodes([
    { label: 'When no other topic matches', type: 'trigger', x: 40, y: 20 },
    { label: 'ขออภัย ไม่พบข้อมูลนี้ในเอกสาร', type: 'message', x: 40, y: 120 },
    { label: 'Redirect to: Escalation Topic', type: 'action', x: 40, y: 220 },
  ]);
  const mock5 = M.studioChrome({ activeTab: 'Topics', agentName: 'HR Policy Bot', body: n5, bodyHeight: 330 });

  // ---- Mockup 6: test conversation flow ----
  const chat6 = M.chatMessages([
    { from: 'user', text: 'บริษัทมีนโยบายเรื่อง Work From Home ต่างประเทศไหม?' },
    { from: 'agent', text: 'ขออภัยครับ ไม่พบข้อมูลนี้ในเอกสาร Policy ต้องการให้ทีม HR ติดต่อกลับไหมครับ?' },
    { from: 'user', text: 'ต้องการครับ' },
    { from: 'agent', text: 'รบกวนขอชื่อและอีเมลของคุณด้วยครับ' },
  ], { width: 660 });
  const mock6 = M.studioChrome({ activeTab: 'Overview', agentName: 'HR Policy Bot', body: chat6.svg, bodyHeight: chat6.endY + 30 });

  // ---- Mockup 7: Logistic department example ----
  const chat7 = M.chatMessages([
    { from: 'user', text: 'พัสดุเลขที่ TH88291 ตอนนี้ถึงไหนแล้ว?' },
    { from: 'agent', text: 'ขออภัยครับ ไม่พบข้อมูลเลขพัสดุนี้ในระบบที่เชื่อมต่อไว้ ต้องการให้ทีม Logistic ติดต่อกลับไหมครับ?' },
    { from: 'user', text: 'ต้องการครับ' },
    { from: 'agent', text: 'รบกวนขอเบอร์โทรและเลขที่ Order ด้วยครับ ทีมงานจะติดต่อกลับภายใน 1 ชั่วโมง' },
  ], { width: 660 });
  const mock7 = M.studioChrome({ activeTab: 'Overview', agentName: 'Logistic Tracking Bot', body: chat7.svg, bodyHeight: chat7.endY + 30 });

  const bodyHtml = `
    <p>RAG ที่ดี ไม่ใช่แค่ตอบได้ทุกคำถาม แต่ต้อง <strong>รู้ว่าเมื่อไหร่ควรปฏิเสธ</strong> และมีทางออกให้ผู้ใช้เสมอ Lab นี้สอนสร้าง Fallback และ Escalation Topic</p>

    ${metaTable([
      ['Level', '<span class="badge badge-blue">200</span>'],
      ['Persona', 'Maker ที่ต้องการ Agent ที่น่าเชื่อถือ'],
      ['ระยะเวลา', '35 นาที'],
      ['เป้าหมาย', 'สร้าง Fallback Topic (เมื่อไม่รู้คำตอบ) และ Escalation Topic (ส่งต่อให้คน)'],
    ])}

    ${box('note', 'Topics 3 แบบที่ควรมีทุก Agent', `
      ${conceptTable(['Topic', 'ใช้เมื่อไหร่'], [
        ['👋 Greeting', 'ต้อนรับผู้ใช้ใหม่ บอกว่า Agent ทำอะไรได้บ้าง'],
        ['❓ Fallback', 'เมื่อ Agent หาคำตอบไม่เจอ — ป้องกันการ Hallucinate'],
        ['🆘 Escalation', 'เมื่อปัญหาซับซ้อนเกินไป — เก็บข้อมูลส่งต่อให้คน'],
      ])}
    `)}

    ${box('note', 'Node ประเภทต่างๆ ใน Topic Canvas (กด "+" ระหว่าง Node เพื่อเพิ่ม)', `
      ${conceptTable(['Node', 'หน้าที่'], [
        ['Trigger', 'กำหนดวลี/เงื่อนไขที่ทำให้ Topic นี้เริ่มทำงาน'],
        ['Message', 'แสดงข้อความให้ผู้ใช้เห็น'],
        ['Question', 'เก็บข้อมูลจากผู้ใช้ (สร้างตัวแปรอัตโนมัติ)'],
        ['Condition', 'แยกเส้นทางการสนทนาตามเงื่อนไข'],
        ['Action', 'เรียกใช้ Flow, Tool หรือ Connector'],
        ['Set variable / End conversation', 'ตั้งค่าตัวแปร หรือจบบทสนทนา'],
      ])}
    `)}

    <h2 id="step1">ขั้นตอนที่ 1–3: สร้าง Fallback Topic</h2>
    ${step(1, 'ดู Topics ที่มีอยู่', `
      <p>ไปที่แท็บ <strong>Topics</strong> → กด <strong>+ Add a topic → From blank</strong> → ตั้งชื่อ "Fallback"</p>
      ${mockup(mock1, 'รายการ Topics ของ Agent')}
      ${box('tip', '', '<p>อีกวิธีที่เร็วกว่าคือ <strong>"Add from description with Copilot"</strong> — พิมพ์อธิบาย Topic ที่ต้องการเป็นประโยคเดียว แล้วให้ AI สร้าง Trigger และ Node ต่างๆ ให้อัตโนมัติ เหมาะกับ Topic ที่มีโครงสร้างซับซ้อน เช่น เก็บข้อมูลหลายฟิลด์ — Lab นี้เลือกสร้างจาก Blank เพื่อให้เห็นการทำงานของแต่ละ Node ชัดเจนขึ้น ถ้าอยากลองวิธีนี้ ใช้ตัวอย่างคำอธิบายด้านล่างวางในช่อง Describe ได้เลย</p>')}
      ${promptBox('ตัวอย่างคำอธิบาย Topic "Fallback" — สำหรับ Add from description with Copilot', 'สร้าง Topic ชื่อ Fallback ที่เริ่มทำงานเมื่อ Agent หาคำตอบจาก Knowledge ไม่เจอ (Trigger: All other conditions met) ให้ตอบข้อความขอโทษอย่างสุภาพว่าไม่พบข้อมูลในเอกสาร แล้วถามผู้ใช้ว่าต้องการให้ทีมงานติดต่อกลับหรือไม่ ถ้าต้องการ ให้ไปต่อที่ Topic ชื่อ Escalation')}
      ${promptBox('ตัวอย่างคำอธิบาย Topic "Escalation" — สำหรับ Add from description with Copilot', 'สร้าง Topic ชื่อ Escalation ที่เก็บชื่อ อีเมล และรายละเอียดปัญหาจากผู้ใช้ทีละคำถาม จากนั้นแสดงข้อความขอบคุณและแจ้งว่าทีมงานจะติดต่อกลับภายใน 1 วันทำการ')}
    `)}
    ${step(2, 'ตั้ง Trigger เป็น Fallback', `
      <p>เปลี่ยน Trigger จาก "The agent chooses" เป็น <strong>"All other conditions met"</strong> — Topic นี้จะทำงานเมื่อ Agent หาคำตอบจาก Knowledge ไม่เจอ</p>
      ${mockup(mock2, 'Trigger Node ของ Fallback Topic')}
    `)}
    ${step(3, 'เพิ่ม Message node', `
      <p>กด + → Send a message → พิมพ์ข้อความแจ้งผู้ใช้อย่างสุภาพว่าไม่พบข้อมูล</p>
      ${mockup(mock3, 'Fallback Topic ที่มี Trigger + Message node')}
    `)}

    <h2 id="step4">ขั้นตอนที่ 4–5: สร้างและเชื่อม Escalation Topic</h2>
    ${step(4, 'สร้าง Escalation Topic', `
      <p>Topics → + Add → ตั้งชื่อ "Escalation" → เพิ่ม Question nodes ถามชื่อ, อีเมล และเรื่องที่ต้องการความช่วยเหลือ</p>
      ${mockup(mock4, 'Escalation Topic เก็บชื่อและอีเมลก่อนส่งต่อให้ทีมงาน')}
    `)}
    ${step(5, 'เชื่อม Fallback → Escalation', `
      <p>กลับไปที่ Fallback Topic → เพิ่ม node หลัง Message → Topic Management → Go to another topic → เลือก Escalation Topic</p>
      ${mockup(mock5, 'Fallback Topic ที่เชื่อมต่อไปยัง Escalation Topic')}
      ${box('warn', '', '<p>ถ้า Fallback ไม่ทำงาน ให้ตรวจสอบ Settings → Generative AI → ปิด "Allow ungrounded responses"</p>')}
    `)}

    <h2 id="step6">ขั้นตอนที่ 6: ทดสอบ Flow ทั้งหมด</h2>
    ${step(6, 'ทดสอบคำถามนอกขอบเขต', `
      <p>ถามคำถามที่ไม่มีใน Knowledge → Agent ควร Fallback → เสนอ Escalation → เก็บชื่อและอีเมล</p>
      ${mockup(mock6, 'Flow เต็ม: Fallback → เสนอ Escalation → เก็บข้อมูลติดต่อ')}
      ${mockup(mock7, 'ตัวอย่างแบบเดียวกัน แต่คนละแผนก: Logistic Tracking Bot — Fallback เมื่อหาเลขพัสดุไม่เจอ แล้ว Escalate ไปทีม Logistic แทนทีม HR')}
      ${promptBox('ตัวอย่างคำอธิบาย Topic "Fallback" สำหรับ Logistic — Copy ไปปรับใช้ได้', 'สร้าง Topic ชื่อ Fallback ที่เริ่มทำงานเมื่อ Agent หาเลขพัสดุหรือข้อมูลการจัดส่งไม่เจอ (Trigger: All other conditions met) ให้ตอบข้อความขอโทษอย่างสุภาพว่าไม่พบข้อมูลในระบบที่เชื่อมต่อไว้ แล้วถามผู้ใช้ว่าต้องการให้ทีม Logistic ติดต่อกลับหรือไม่ ถ้าต้องการ ให้ไปต่อที่ Topic ชื่อ Escalation ที่เก็บเบอร์โทรและเลขที่ Order')}
    `)}

    ${box('success', '', '<p>Agent ของคุณตอนนี้ไม่ Hallucinate เมื่อไม่รู้คำตอบ และมี Escalation Path ที่ชัดเจนให้ผู้ใช้เสมอ!</p>')}

    <h2 id="mistakes">⚠️ ข้อผิดพลาดที่พบบ่อย</h2>
    <ul>
      <li>ลืมตั้ง Trigger เป็น "All other conditions met" → Fallback Topic ไม่ทำงาน</li>
      <li>Allow ungrounded responses ยังเปิดอยู่ → Agent เดาคำตอบแทนที่จะ Fallback</li>
      <li>ไม่ทดสอบ End-to-End Flow → พลาดจุดที่ Escalation Topic เชื่อมผิด</li>
    </ul>

    <h2 id="challenge">🎯 ลองประยุกต์ใช้กับงานคุณ</h2>
    <ul>
      <li>ลองสร้าง Greeting Topic ต้อนรับผู้ใช้เมื่อเริ่ม Conversation</li>
      <li>คิดว่า Escalation ของแผนกคุณควรส่งต่อไปที่ใคร (อีเมล/ทีม)?</li>
    </ul>
  `;

  const html = pageShell({
    file: 'lab4.html',
    title: 'Lab 4: Custom Topics — RAG Course',
    eyebrow: 'LAB 4 · ⏱ 35 นาที · Level 200',
    heroTitle: '🧩 Custom Topics — Fallback + Escalation',
    heroLead: 'จัดการเมื่อ Agent ตอบไม่ได้ ด้วย Fallback Topic และ Escalation Topic',
    pills: [['⏱', '35 นาที'], ['🎓', 'Level 200'], ['🛟', 'Fallback + Escalation']],
    tocItems: [
      { id: 'step1', label: '1–3. สร้าง Fallback' },
      { id: 'step4', label: '4–5. Escalation Topic' },
      { id: 'step6', label: '6. ทดสอบ Flow' },
      { id: 'mistakes', label: 'ข้อผิดพลาดที่พบบ่อย' },
      { id: 'challenge', label: 'ลองประยุกต์ใช้' },
    ],
    prevNext: { prev: { href: 'lab3.html', label: 'Lab 3: Prompt Engineering' }, next: { href: 'lab5.html', label: 'Lab 5: Evaluation' } },
    bodyHtml,
  });
  writePage('lab4.html', html);
}

module.exports = { build };
