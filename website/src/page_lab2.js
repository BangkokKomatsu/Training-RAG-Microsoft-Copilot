const { M, step, mockup, box, metaTable, conceptTable, pageShell, writePage } = require('./build.js');

function build() {
  // ---- Mockup 1: Copilot Studio create-agent empty state ----
  const m1body = `
    ${M.text(360, 130, '✨', { fontSize: 44, anchor: 'middle' })}
    ${M.text(360, 175, 'สร้าง Agent ใหม่ใน Copilot Studio', { fontSize: 15, weight: 700, fill: M.COL.navy, anchor: 'middle' })}
    ${M.text(360, 198, 'อธิบาย Agent ที่ต้องการ หรือเริ่มจาก Blank ก็ได้', { fontSize: 11.5, fill: M.COL.gray500, anchor: 'middle' })}
    ${M.button(270, 224, 90, 34, 'Describe', { fill: M.COL.blue })}
    ${M.button(370, 224, 110, 34, 'Create blank', { fill: M.COL.white, outline: true })}
  `;
  const mock1 = M.studioChrome({ activeTab: 'Overview', agentName: 'New agent', body: m1body, bodyHeight: 300, showTest: false });

  // ---- Mockup 2: agent created, overview screen ----
  const m2body = `
    ${M.text(24, 34, 'Details', { fontSize: 14, weight: 700, fill: M.COL.navy })}
    ${M.rrect(24, 46, 720, 76, 8, M.COL.white, { stroke: M.COL.gray200, strokeWidth: 1 })}
    <circle cx="56" cy="84" r="16" fill="${M.COL.blueLight}"/><text x="56" y="89" font-size="14" text-anchor="middle">🤖</text>
    ${M.text(80, 78, 'HR Policy Bot', { fontSize: 13.5, weight: 700, fill: M.COL.gray900 })}
    ${M.text(80, 96, 'Copilot Studio Agent · Draft', { fontSize: 11, fill: M.COL.gray500 })}
    ${M.text(24, 150, 'Instructions', { fontSize: 14, weight: 700, fill: M.COL.navy })}
    ${M.textArea(24, 162, 720, 60, '', 'You are an HR assistant. Answer only from provided documents.', {})}
  `;
  const mock2 = M.studioChrome({ activeTab: 'Overview', agentName: 'HR Policy Bot', body: m2body, bodyHeight: 260 });

  // ---- Mockup 3: knowledge file uploading (Processing) ----
  const kl3 = M.knowledgeList([
    { icon: '📄', name: 'HR_Policy_2026.pdf', type: 'File · PDF · 2.4 MB', status: 'Processing' },
  ], { width: 700 });
  const m3body = `${M.text(24, 30, 'Knowledge', { fontSize: 14, weight: 700, fill: M.COL.navy })}
    <g transform="translate(0,42)">${kl3.svg}</g>
    ${M.text(24, kl3.endY + 60, '⏳ กำลัง Index เอกสาร... (2-5 นาที)', { fontSize: 12, fill: M.COL.orange, weight: 700 })}`;
  const mock3 = M.studioChrome({ activeTab: 'Knowledge', agentName: 'HR Policy Bot', body: m3body, bodyHeight: kl3.endY + 100 });

  // ---- Mockup 4: knowledge Ready ----
  const kl4 = M.knowledgeList([
    { icon: '📄', name: 'HR_Policy_2026.pdf', type: 'File · PDF · 2.4 MB', status: 'Ready' },
  ], { width: 700 });
  const m4body = `${M.text(24, 30, 'Knowledge', { fontSize: 14, weight: 700, fill: M.COL.navy })}
    <g transform="translate(0,42)">${kl4.svg}</g>
    ${M.calloutBanner(24, kl4.endY + 55, 700, '✅', 'Ready — พร้อมใช้งานแล้ว! Agent สามารถค้นข้อมูลจากไฟล์นี้ได้', {})}`;
  const mock4 = M.studioChrome({ activeTab: 'Knowledge', agentName: 'HR Policy Bot', body: m4body, bodyHeight: kl4.endY + 115 });

  // ---- Mockup 5: add website knowledge ----
  const kl5 = M.knowledgeList([
    { icon: '📄', name: 'HR_Policy_2026.pdf', type: 'File · PDF · 2.4 MB', status: 'Ready' },
    { icon: '🌐', name: 'intranet.company.com/hr-faq', type: 'Public website', status: 'Ready' },
  ], { width: 700 });
  const m5body = `${M.text(24, 30, 'Knowledge', { fontSize: 14, weight: 700, fill: M.COL.navy })}
    <g transform="translate(0,42)">${kl5.svg}</g>`;
  const mock5 = M.studioChrome({ activeTab: 'Knowledge', agentName: 'HR Policy Bot', body: m5body, bodyHeight: kl5.endY + 70 });

  // ---- Mockup 6: web search off + test with citation ----
  const chat6 = M.chatMessages([
    { from: 'user', text: 'นโยบายการลาพักร้อนเป็นอย่างไร?' },
    { from: 'agent', text: 'พนักงานมีสิทธิ์ลาพักร้อนปีละ 10 วัน สะสมข้ามปีได้ไม่เกิน 5 วัน [อ้างอิง: HR_Policy_2026.pdf]' },
  ], { width: 660 });
  const m6body = `${chat6.svg}`;
  const mock6 = M.studioChrome({ activeTab: 'Overview', agentName: 'HR Policy Bot', body: m6body, bodyHeight: chat6.endY + 30 });

  const bodyHtml = `
    <p>Lab นี้พาคุณสร้าง RAG Agent ตัวจริงใน <strong>Copilot Studio</strong> — เครื่องมือหลักที่ใช้ตลอดคอร์สนี้ พร้อมเชื่อมต่อ Knowledge จากไฟล์และเว็บไซต์</p>

    ${metaTable([
      ['Level', '<span class="badge badge-blue">100–200</span>'],
      ['Persona', 'Maker / เจ้าของกระบวนการในแผนก'],
      ['ระยะเวลา', '40 นาที'],
      ['เป้าหมาย', 'สร้าง Agent ที่เชื่อม Knowledge ได้หลายแหล่ง และตอบพร้อมอ้างอิงแหล่งที่มา'],
    ])}

    ${box('note', 'Knowledge Source มี 3 แบบหลัก', `
      ${conceptTable(['ประเภท', 'เหมาะกับ'], [
        ['📁 ไฟล์ (PDF/Word)', 'เอกสารที่ Update ไม่บ่อย เช่น Policy, คู่มือ — ใช้ใน Lab นี้'],
        ['🌐 Public Website', 'ข้อมูลบนเว็บสาธารณะ Update อัตโนมัติ — ใช้ใน Lab นี้'],
        ['📂 SharePoint', 'ข้อมูล Internal ขององค์กร (แนะนำให้ลองต่อเองหลังจบคอร์ส)'],
      ])}
    `)}

    <h2 id="step1">ขั้นตอนที่ 1–2: สร้าง Agent ใน Copilot Studio</h2>
    ${step(1, 'เปิด Copilot Studio', `
      <p>เปิด Browser ไปที่ <code>https://copilotstudio.microsoft.com</code> → Login → ตรวจสอบว่า Environment ถูกต้อง (มุมขวาบน)</p>
      ${mockup(mock1, 'หน้าจอเริ่มต้นสร้าง Agent ใหม่')}
    `)}
    ${step(2, 'สร้าง Agent ใหม่', `
      <p>กด <strong>"Create blank agent"</strong> → ใส่ชื่อ Agent เช่น "HR Policy Bot" → กด Create → รอ Agent ถูก Provision</p>
      ${mockup(mock2, 'หน้า Overview ของ Agent ที่สร้างใหม่ พร้อม Instructions เริ่มต้น')}
    `)}

    <h2 id="step3">ขั้นตอนที่ 3–4: เพิ่ม Knowledge จากไฟล์</h2>
    ${step(3, 'อัปโหลดไฟล์ PDF/Word', `
      <p>ไปที่แท็บ <strong>Knowledge → + Add knowledge → Upload files</strong> → เลือกไฟล์ที่เตรียมมา → กด Add</p>
      ${mockup(mock3, 'ไฟล์กำลังถูก Index — สถานะ Processing')}
      ${box('warn', '', '<p>⏰ อย่า Navigate ออกจากหน้านี้ขณะรอ! ระบบกำลัง Index ไฟล์ ใช้เวลา 2–5 นาที</p>')}
    `)}
    ${step(4, 'รอ Status เป็น "Ready"', `
      <p>เมื่อ Index เสร็จ Status จะเปลี่ยนเป็น <strong>Ready</strong> — ตอนนี้ Agent พร้อมค้นข้อมูลจากไฟล์นี้แล้ว</p>
      ${mockup(mock4, 'Knowledge Source สถานะ Ready พร้อมใช้งาน')}
    `)}

    <h2 id="step5">ขั้นตอนที่ 5–6: เพิ่ม Website และทดสอบ</h2>
    ${step(5, 'เพิ่ม Knowledge จากเว็บไซต์', `
      <p>Knowledge → + Add knowledge → <strong>Public websites</strong> → ใส่ URL เช่น เว็บ Intranet หรือ FAQ ขององค์กร → Add to agent</p>
      ${mockup(mock5, 'Knowledge หลายแหล่งพร้อมใช้งานพร้อมกัน (ไฟล์ + เว็บ)')}
    `)}
    ${step(6, 'ปิด Web Search แล้วทดสอบ', `
      <p>Overview → Web Search → Disabled → Save จากนั้นทดสอบถามคำถามใน Test Pane และสังเกต References ใต้คำตอบ</p>
      ${mockup(mock6, 'Agent ตอบพร้อมอ้างอิงชื่อไฟล์ต้นทาง')}
      ${box('tip', '', '<p>ดูที่ "Referenced sources" ใต้คำตอบ — ถ้ามีชื่อเอกสาร/URL แสดงว่า Agent ดึงข้อมูลจาก Knowledge จริง ไม่ได้เดาเอง</p>')}
    `)}

    ${box('success', '', '<p>คุณมี RAG Agent ที่เชื่อมต่อ Knowledge ได้หลายแหล่งแล้ว! ขั้นตอนต่อไปคือทำให้ Agent ตอบได้ฉลาดและตรงประเด็นยิ่งขึ้นด้วย Prompt Engineering</p>')}

    <h2 id="mistakes">⚠️ ข้อผิดพลาดที่พบบ่อย</h2>
    <ul>
      <li>Navigate ออกระหว่าง Knowledge กำลัง Index → ต้องอัปโหลดใหม่</li>
      <li>ลืมปิด Web Search → Agent อาจตอบจากอินเทอร์เน็ตแทนที่จะตอบจาก Knowledge ที่ตั้งใจ</li>
      <li>อัปโหลดไฟล์ที่มีแต่รูปภาพ (Scan) → ระบบอ่านข้อความไม่ได้ ต้องเป็นไฟล์ที่มีข้อความจริง</li>
    </ul>

    <h2 id="challenge">🎯 ลองประยุกต์ใช้กับงานคุณ</h2>
    <ul>
      <li>ลองอัปโหลดเอกสารของแผนกตัวเอง 1 ไฟล์ แล้วถามคำถามที่มักถูกถามบ่อย</li>
      <li>ถ้ามี SharePoint Site ลองกลับมาเพิ่มเป็น Knowledge Source หลังจบคอร์ส</li>
    </ul>
  `;

  const html = pageShell({
    file: 'lab2.html',
    title: 'Lab 2: Copilot Studio + Knowledge Sources — RAG Course',
    eyebrow: 'LAB 2 · ⏱ 40 นาที · Level 100–200',
    heroTitle: '📚 Copilot Studio — RAG พื้นฐาน',
    heroLead: 'สร้าง Agent ใน Copilot Studio และเชื่อมต่อ Knowledge จากไฟล์และเว็บไซต์ — หัวใจของ RAG',
    pills: [['⏱', '40 นาที'], ['🎓', 'Level 100–200'], ['📁', 'ไฟล์ + เว็บ']],
    tocItems: [
      { id: 'step1', label: '1–2. สร้าง Agent' },
      { id: 'step3', label: '3–4. Knowledge จากไฟล์' },
      { id: 'step5', label: '5–6. Website + ทดสอบ' },
      { id: 'mistakes', label: 'ข้อผิดพลาดที่พบบ่อย' },
      { id: 'challenge', label: 'ลองประยุกต์ใช้' },
    ],
    prevNext: { prev: { href: 'lab1.html', label: 'Lab 1: M365 Agent Builder' }, next: { href: 'lab3.html', label: 'Lab 3: Prompt Engineering' } },
    bodyHtml,
  });
  writePage('lab2.html', html);
}

module.exports = { build };
