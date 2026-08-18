const { M, step, mockup, box, promptBox, metaTable, conceptTable, pageShell, writePage } = require('./build.js');

function build() {
  // ---- Mockup 1: BAD instructions ----
  const m1body = `${M.text(24, 30, 'Instructions', { fontSize: 14, weight: 700, fill: M.COL.navy })}
    ${M.textArea(24, 42, 700, 60, '', 'Answer questions from the document.', { })}
    ${M.badge(24, 116, '❌ BAD — สั้นเกินไป ไม่มี Context/Tone/Fallback', M.COL.red, M.COL.redBg)}`;
  const mock1 = M.studioChrome({ activeTab: 'Overview', agentName: 'HR Policy Bot', body: m1body, bodyHeight: 175 });

  // ---- Mockup 2: bad generic answer ----
  const chat2 = M.chatMessages([
    { from: 'user', text: 'ลาป่วยได้กี่วัน?' },
    { from: 'agent', text: 'Based on general knowledge, sick leave policies vary by company and jurisdiction. Please consult your HR department or employee handbook for specific details regarding your entitlements and any documentation requirements that may apply in your particular case.' },
  ], { width: 660 });
  const mock2 = M.studioChrome({ activeTab: 'Overview', agentName: 'HR Policy Bot', body: chat2.svg, bodyHeight: chat2.endY + 30, showTest: true });

  // ---- Mockup 3: GOOD instructions (CARE) ----
  const careText = 'Role: You are an HR assistant for Contoso.\nTask: Answer employee questions about HR policy.\nScope: Answer ONLY from the provided HR policy documents.\nRule: If not found, say "ขออภัย ข้อมูลนี้ไม่อยู่ใน Policy กรุณาติดต่อ HR โดยตรง". Answer in Thai with max 3 bullet points.\nTone: Professional, concise, helpful — like a reliable HR colleague.';
  const m3body = `${M.text(24, 30, 'Instructions', { fontSize: 14, weight: 700, fill: M.COL.navy })}
    ${M.textArea(24, 42, 700, 140, '', careText, {})}
    ${M.badge(24, 198, '✅ GOOD — ครบ Role/Task/Scope/Rule/Tone', M.COL.green, M.COL.greenBg)}`;
  const mock3 = M.studioChrome({ activeTab: 'Overview', agentName: 'HR Policy Bot', body: m3body, bodyHeight: 250 });

  // ---- Mockup 4: good answer ----
  const chat4 = M.chatMessages([
    { from: 'user', text: 'ลาป่วยได้กี่วัน?' },
    { from: 'agent', text: '• พนักงานมีสิทธิ์ลาป่วยได้ 30 วันทำการต่อปี\n• ลาเกิน 3 วัน ต้องมีใบรับรองแพทย์\n• สอบถามเพิ่มเติมติดต่อ HR ext. 1234 [อ้างอิง: HR_Policy_2026.pdf]' },
  ], { width: 660 });
  const mock4 = M.studioChrome({ activeTab: 'Overview', agentName: 'HR Policy Bot', body: chat4.svg, bodyHeight: chat4.endY + 30 });

  // ---- Mockup 5: out of scope refusal ----
  const chat5 = M.chatMessages([
    { from: 'user', text: 'ช่วยวิเคราะห์ผลบอลคืนนี้หน่อย' },
    { from: 'agent', text: 'ขออภัยครับ ฉันตอบได้เฉพาะคำถามเกี่ยวกับนโยบาย HR เท่านั้น มีคำถามเรื่อง Policy ที่อยากถามไหมครับ?' },
  ], { width: 660 });
  const mock5 = M.studioChrome({ activeTab: 'Overview', agentName: 'HR Policy Bot', body: chat5.svg, bodyHeight: chat5.endY + 30 });

  // ---- Mockup 6: Programmer department example (CARE for Code Review Bot) ----
  const careText6 = 'Role: You are a senior developer assistant for the internal team.\nTask: Review the code snippet the user pastes against our Coding Standard doc, and list violations with line references.\nScope: Only use the Coding Standard doc provided. If it doesn\'t cover something, say so instead of guessing.\nRule: Never rewrite the whole file — only point out issues. Keep each point to 1 line.\nTone: Direct, technical, peer-reviewer style — no fluff.\nExample: "Line 12: ตัวแปรตั้งชื่อไม่สื่อความหมาย ควรใช้ camelCase"';
  const m6body = `${M.text(24, 30, 'Instructions', { fontSize: 14, weight: 700, fill: M.COL.navy })}
    ${M.textArea(24, 42, 700, 130, '', careText6, {})}
    ${M.badge(24, 186, '✅ Code Review Bot — ครบ Role/Task/Scope/Rule/Tone', M.COL.green, M.COL.greenBg)}`;
  const mock6 = M.studioChrome({ activeTab: 'Overview', agentName: 'Code Review Bot', body: m6body, bodyHeight: 240 });
  const careText6Clean = careText6;

  const bodyHtml = `
    <p>Agent จาก Lab 2 ตอบได้แล้ว แต่ยัง "ฉลาด" ไม่พอ — Lab นี้สอนวิธีเขียน <strong>Instructions</strong> ให้ Agent ตอบตรงประเด็น มี Tone ที่เหมาะสม และรู้ขอบเขตของตัวเอง</p>

    ${metaTable([
      ['Level', '<span class="badge badge-blue">200</span>'],
      ['Persona', 'Maker ที่ต้องการควบคุมคุณภาพคำตอบ'],
      ['ระยะเวลา', '40 นาที'],
      ['เป้าหมาย', 'เขียน Instructions ด้วย CARE Framework แล้วเห็นคุณภาพคำตอบดีขึ้นทันที'],
    ])}

    ${box('note', 'CARE Framework', `
      ${conceptTable(['องค์ประกอบ', 'ใส่อะไร'], [
        ['C — Context', 'Agent คือใคร ทำงานให้ใคร อยู่ในสถานการณ์แบบไหน'],
        ['A — Ask', 'สิ่งที่ต้องการให้ Agent ทำอย่างชัดเจน เช่น "ตอบคำถามจาก Knowledge เท่านั้น"'],
        ['R — Rules', 'กฎ/ข้อจำกัดที่ต้องทำตาม เช่น ภาษาที่ใช้ รูปแบบคำตอบ Fallback message เมื่อไม่รู้คำตอบ'],
        ['E — Examples', 'ตัวอย่างคำถาม-คำตอบที่ดี เพื่อเป็น Reference ให้ AI'],
      ])}
      <p style="margin-top:10px;font-size:12.5px;color:${M.COL.gray500}">อ้างอิงจาก <strong>CAREful Prompts</strong> โดย Nielsen Norman Group (nngroup.com/articles/careful-prompts) — Framework เดียวกับที่ใช้ใน Microsoft Copilot Studio Labs ต้นฉบับ</p>
    `)}

    ${box('tip', 'เทียบกับ Checklist "Role/Task/Scope/Rule/Tone" จาก Lab 1–2', `
      <p>Role + Task + Scope ≈ Context + Ask ของ CARE, Rule ≈ Rules ของ CARE — ส่วน <strong>Tone</strong> และ <strong>Example</strong> คือรายละเอียดเสริมที่ CARE ไม่ได้แยกเป็นหัวข้อของตัวเอง ใช้ Checklist 5 ส่วนเป็นตัวช่วยเขียนเร็วๆ ระหว่างลงมือ ส่วน CARE คือ Framework ทางการที่อ้างอิงได้เวลาต้องอธิบายให้คนอื่นเข้าใจ</p>
    `)}

    <h2 id="step1">ขั้นตอนที่ 1–2: ดูปัญหาของ Instructions แบบ BAD</h2>
    ${step(1, 'เปิด Instructions ปัจจุบัน', `
      <p>ไปที่ Overview → Instructions → Edit ดู Instructions เดิมที่มักสั้นและกำกวมเกินไป</p>
      ${mockup(mock1, 'Instructions แบบ BAD — สั้นเกินไป ไม่ระบุ Tone หรือขอบเขต')}
    `)}
    ${step(2, 'ทดสอบและสังเกตปัญหา', `
      <p>ถามคำถามเดิมด้วย Instructions แบบ BAD สังเกตว่าคำตอบยาว วกวน ไม่ตรงประเด็น และไม่ได้อ้างอิง Knowledge</p>
      ${mockup(mock2, 'คำตอบจาก Instructions แบบ BAD — ยาว ไม่ตรงประเด็น ไม่ใช่ภาษาไทย')}
    `)}

    <h2 id="step3">ขั้นตอนที่ 3–4: แก้ไขด้วย CARE Framework</h2>
    ${step(3, 'เขียน Instructions ใหม่ด้วย CARE', `
      <p>ลบ Instructions เดิม แล้วเขียนใหม่ให้ครบทั้ง 4 องค์ประกอบ: Context, Ask, Rules, Examples</p>
      ${mockup(mock3, 'Instructions แบบ GOOD — ครบ Role/Task/Scope/Rule/Tone (CARE ครบทุกองค์ประกอบ)')}
      ${promptBox('ตัวอย่าง Instructions (CARE) — Copy ไปวางแทน Instructions เดิมได้เลย', careText)}
      ${box('tip', '', '<p>เขียน Fallback message ให้ชัดเจนเสมอ เช่น "ถ้าไม่พบข้อมูล ให้บอกว่า..." เพื่อป้องกัน Agent เดาคำตอบ (Hallucinate)</p>')}
      ${mockup(mock6, 'ตัวอย่างแบบเดียวกัน แต่คนละแผนก: Code Review Bot สำหรับทีม Programmer — เขียน Instructions ด้วย CARE เหมือนกันแค่เปลี่ยนเนื้อหา')}
      ${promptBox('ตัวอย่าง Instructions สำหรับ Programmer — Copy ไปปรับใช้ได้', careText6Clean)}
    `)}
    ${step(4, 'Save และทดสอบคำถามเดิม', `
      <p>Save แล้วถามคำถามเดิมอีกครั้ง เปรียบเทียบกับคำตอบก่อนหน้า</p>
      ${mockup(mock4, 'คำตอบหลังปรับ Instructions — สั้น ตรงประเด็น เป็นภาษาไทย มีอ้างอิง')}
    `)}

    <h2 id="step5">ขั้นตอนที่ 5: ทดสอบขอบเขต (Out-of-Scope)</h2>
    ${step(5, 'ถามคำถามนอกเรื่อง', `
      <p>ทดสอบว่า Agent รู้จักปฏิเสธคำถามที่ไม่เกี่ยวข้องอย่างสุภาพหรือไม่ — นี่คือสัญญาณว่า Instructions ทำงานได้ผล</p>
      ${mockup(mock5, 'Agent ปฏิเสธคำถามนอกขอบเขตอย่างสุภาพ แทนที่จะพยายามตอบ')}
    `)}

    ${box('success', '', '<p>Agent ของคุณตอบตรงประเด็น มี Tone ที่เหมาะสม และรู้ขอบเขตของตัวเองแล้ว! นี่คือขั้นตอนที่ทำให้ RAG Agent จาก "ใช้ได้" กลายเป็น "ใช้ดี"</p>')}

    <h2 id="mistakes">⚠️ ข้อผิดพลาดที่พบบ่อย</h2>
    <ul>
      <li>เขียน Instructions ยาวเกินไปจนอ่านยาก → เน้นสั้น กระชับ แต่ครบ 4 องค์ประกอบ CARE</li>
      <li>ลืมกำหนดภาษาที่ต้องการ → Agent อาจตอบเป็นภาษาอังกฤษปนไทย</li>
      <li>ไม่มี Fallback message → Agent อาจเดาคำตอบเมื่อไม่รู้จริง (Hallucinate)</li>
    </ul>

    <h2 id="challenge">🎯 ลองประยุกต์ใช้กับงานคุณ</h2>
    <ul>
      <li>ลองเขียน Instructions ด้วย CARE Framework สำหรับ Use Case ของแผนกตัวเอง</li>
      <li>ทดสอบว่า Agent ปฏิเสธคำถามเรื่องการเมืองหรือเรื่องส่วนตัวได้ไหม</li>
    </ul>
  `;

  const html = pageShell({
    file: 'lab3.html',
    title: 'Lab 3: Prompt Engineering for RAG — RAG Course',
    eyebrow: 'LAB 3 · ⏱ 40 นาที · Level 200',
    heroTitle: '✍️ Prompt Engineering — CARE Framework',
    heroLead: 'ปรับ Instructions ให้ RAG Agent ตอบตรงประเด็น มี Tone ที่เหมาะสม และรู้ขอบเขตของตัวเอง',
    pills: [['⏱', '40 นาที'], ['🎓', 'Level 200'], ['🧠', 'CARE Framework']],
    tocItems: [
      { id: 'step1', label: '1–2. Instructions แบบ BAD' },
      { id: 'step3', label: '3–4. แก้ด้วย CARE' },
      { id: 'step5', label: '5. ทดสอบขอบเขต' },
      { id: 'mistakes', label: 'ข้อผิดพลาดที่พบบ่อย' },
      { id: 'challenge', label: 'ลองประยุกต์ใช้' },
    ],
    prevNext: { prev: { href: 'lab2.html', label: 'Lab 2: Copilot Studio + Knowledge' }, next: { href: 'lab4.html', label: 'Lab 4: Custom Topics' } },
    bodyHtml,
  });
  writePage('lab3.html', html);
}

module.exports = { build };
