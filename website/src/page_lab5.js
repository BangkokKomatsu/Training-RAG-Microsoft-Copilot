const { M, step, mockup, box, promptBox, metaTable, conceptTable, pageShell, writePage } = require('./build.js');

function build() {
  // ---- Mockup 1: Evaluation tab empty ----
  const m1body = `
    ${M.text(360, 110, '📊', { fontSize: 40, anchor: 'middle' })}
    ${M.text(360, 155, 'ยังไม่มี Test Set', { fontSize: 15, weight: 700, fill: M.COL.navy, anchor: 'middle' })}
    ${M.text(360, 176, 'สร้าง Test Set เพื่อวัดคุณภาพคำตอบของ Agent', { fontSize: 11.5, fill: M.COL.gray500, anchor: 'middle' })}
    ${M.button(290, 200, 140, 34, '+ New evaluation', { fill: M.COL.blue })}
  `;
  const mock1 = M.studioChrome({ activeTab: 'Evaluation', agentName: 'HR Policy Bot', body: m1body, bodyHeight: 270, showTest: false });

  // ---- Mockup 2: generate test set form ----
  const m2body = `
    ${M.rrect(150, 20, 420, 220, 10, M.COL.white, { stroke: M.COL.gray300, strokeWidth: 1.5 })}
    ${M.text(180, 52, 'สร้าง Test Set ใหม่', { fontSize: 14.5, weight: 700, fill: M.COL.navy })}
    ${M.textInput(180, 70, 360, 'ชื่อ Test Set', 'HR Bot Test v1', { h: 36 })}
    ${M.checkRow(180, 128, 'Generate 10 questions', true, { sub: 'สร้างคำถามอัตโนมัติจาก Knowledge' })}
    ${M.text(180, 178, 'Method: General Quality', { fontSize: 12, fill: M.COL.gray700 })}
    ${M.button(430, 205, 110, 32, 'Save', { fill: M.COL.blue })}
  `;
  const mock2 = M.studioChrome({ activeTab: 'Evaluation', agentName: 'HR Policy Bot', body: m2body, bodyHeight: 270, showTest: false });

  // ---- Mockup 3: results table ----
  const rows3 = [
    ['1', 'นโยบายการลาป่วย?', { text: '✅ Pass', color: M.COL.green, bold: true }],
    ['2', 'ค่าใช้จ่ายเดินทางเบิกยังไง?', { text: '✅ Pass', color: M.COL.green, bold: true }],
    ['3', 'สวัสดิการประกันสุขภาพ?', { text: '✅ Pass', color: M.COL.green, bold: true }],
    ['4', 'นโยบาย WFH ต่างประเทศ?', { text: '❌ Fail', color: M.COL.red, bold: true }],
    ['5', 'โบนัสประจำปีคำนวณยังไง?', { text: '❌ Fail', color: M.COL.red, bold: true }],
  ];
  const table3 = M.resultsTable(['#', 'คำถาม', 'ผลลัพธ์'], rows3, { x: 24, y: 60, width: 700 });
  const m3body = `${M.calloutBanner(24, 16, 700, '📈', 'Pass Rate: 7/10 (70%)', { bg: M.COL.blueBg, color: M.COL.navy })}${table3}`;
  const mock3 = M.studioChrome({ activeTab: 'Evaluation', agentName: 'HR Policy Bot', body: m3body, bodyHeight: 380, showTest: false });

  // ---- Mockup 4: fail detail ----
  const m4body = `
    ${M.text(24, 30, 'คำถามที่ 4: นโยบาย WFH ต่างประเทศ?', { fontSize: 13.5, weight: 700, fill: M.COL.navy })}
    ${M.rrect(24, 44, 700, 130, 8, M.COL.redBg)}
    ${M.text(40, 68, 'Expected:', { fontSize: 11.5, weight: 700, fill: M.COL.red })}
    ${M.text(40, 86, 'ควรอธิบายเงื่อนไข WFH ต่างประเทศจากเอกสาร', { fontSize: 12, fill: M.COL.gray900 })}
    ${M.text(40, 112, 'Actual:', { fontSize: 11.5, weight: 700, fill: M.COL.red })}
    ${M.text(40, 130, 'ขออภัย ไม่พบข้อมูลนี้ในเอกสาร Policy', { fontSize: 12, fill: M.COL.gray900 })}
    ${M.text(40, 156, '🔍 สาเหตุ: Knowledge ไม่มีเอกสารเรื่องนี้ → ต้องเพิ่มเอกสาร', { fontSize: 11.5, fill: M.COL.orange, weight: 700 })}
  `;
  const mock4 = M.studioChrome({ activeTab: 'Evaluation', agentName: 'HR Policy Bot', body: m4body, bodyHeight: 200, showTest: false });

  // ---- Mockup 5: before/after compare ----
  const bar5 = M.barCompare(24, 30, 700, { labelA: 'ก่อนปรับปรุง', valA: 70, labelB: 'หลังปรับปรุง', valB: 90, unit: '%' });
  const m5body = `${M.text(24, 12, 'เปรียบเทียบ Pass Rate', { fontSize: 13.5, weight: 700, fill: M.COL.navy })}${bar5}
    ${M.calloutBanner(24, 130, 700, '🎉', 'Pass Rate เพิ่มขึ้น 20% หลังเพิ่มเอกสาร WFH Policy', {})}`;
  const mock5 = M.studioChrome({ activeTab: 'Evaluation', agentName: 'HR Policy Bot', body: m5body, bodyHeight: 210, showTest: false });

  // ---- Mockup 6: Engineer department example (Work Permit Bot eval) ----
  const rows6 = [
    ['1', 'Hot Work Permit มีอายุกี่ชั่วโมง?', { text: '✅ Pass', color: M.COL.green, bold: true }],
    ['2', 'ใครเป็นผู้มีอำนาจอนุมัติใบอนุญาตทำงาน?', { text: '✅ Pass', color: M.COL.green, bold: true }],
    ['3', 'งาน Confined Space ต้องตรวจวัดอากาศบ่อยแค่ไหน?', { text: '✅ Pass', color: M.COL.green, bold: true }],
    ['4', 'Line Break Permit ต้องมีใครร่วมลงนามเพิ่มเติม?', { text: '❌ Fail', color: M.COL.red, bold: true }],
  ];
  const table6 = M.resultsTable(['#', 'คำถาม', 'ผลลัพธ์'], rows6, { x: 24, y: 60, width: 700 });
  const m6body = `${M.calloutBanner(24, 16, 700, '📈', 'Pass Rate: 3/4 (75%)', { bg: M.COL.blueBg, color: M.COL.navy })}${table6}`;
  const mock6 = M.studioChrome({ activeTab: 'Evaluation', agentName: 'Work Permit Bot', body: m6body, bodyHeight: 320, showTest: false });

  const bodyHtml = `
    <p>Agent ตอบได้และตอบดีแล้ว แต่จะรู้ได้อย่างไรว่า <strong>"ดีพอ"</strong>? Lab นี้สอนวัดคุณภาพ RAG Agent ด้วย Test Set และวนปรับปรุงอย่างเป็นระบบ</p>

    ${metaTable([
      ['Level', '<span class="badge badge-orange">200</span>'],
      ['Persona', 'Maker ที่ต้องการรับรองคุณภาพก่อน Deploy'],
      ['ระยะเวลา', '30 นาที'],
      ['เป้าหมาย', 'สร้าง Test Set วัด Pass Rate และปรับปรุง Agent จนคะแนนดีขึ้น'],
    ])}

    <h2 id="loop">🔄 RAG Improvement Loop</h2>
    <p>แนวคิดหลักของ Lab นี้คือวงจร 4 ขั้นตอนที่ทำซ้ำได้เรื่อยๆ:</p>
    ${conceptTable(['ขั้นตอน', 'ทำอะไร'], [
      ['1. Build', 'สร้าง Agent + Knowledge'],
      ['2. Test', 'ถามคำถามด้วยตนเอง'],
      ['3. Evaluate', 'รัน Test Set ดู Pass Rate'],
      ['4. Improve', 'ปรับ Knowledge หรือ Instructions แล้ววนกลับไป Test ใหม่'],
    ])}

    <h2 id="step1">ขั้นตอนที่ 1–2: สร้าง Test Set</h2>
    ${step(1, 'เปิด Evaluation Tab', `
      <p>ไปที่แท็บ <strong>Evaluation</strong> ในแถบนำทางด้านบนของ Agent</p>
      ${mockup(mock1, 'หน้า Evaluation ก่อนสร้าง Test Set')}
    `)}
    ${step(2, 'สร้าง Test Set แบบ Auto-Generate', `
      <p>+ New evaluation → <strong>Generate 10 questions</strong> → ตั้งชื่อ → Method: General Quality → Save</p>
      ${mockup(mock2, 'ฟอร์มสร้าง Test Set อัตโนมัติจาก Knowledge')}
      ${box('note', 'Test Set สร้างได้ 4 วิธี (Lab นี้ลองวิธีที่ 1)', `
        ${conceptTable(['วิธี', 'เหมาะกับ'], [
          ['1. Auto-Generate', 'ให้ AI สร้างคำถามจาก Knowledge อัตโนมัติ — เริ่มต้นได้เร็วที่สุด ใช้ใน Lab นี้'],
          ['2. Import จาก CSV', 'เตรียมคำถาม+คำตอบที่คาดหวังไว้ล่วงหน้า สูงสุด 100 ข้อ/ไฟล์ — เหมาะกับ Test Set ขนาดใหญ่ หรือชุดคำถามที่ "ต้องตอบผิด" เช่น คำถามอันตราย (Adversarial Test)'],
          ['3. Capture จาก Test Pane', 'พิมพ์คุยกับ Agent ใน Test Pane ตามปกติ แล้วกด Evaluate เพื่อบันทึกบทสนทนานั้นเป็น Test Case ทันที — ได้ Expected Response จากคำตอบจริงของ Agent'],
          ['4. พิมพ์เอง (Manual)', 'ใส่คำถามที่ทีมงานรู้ว่าสำคัญที่สุดทีละข้อ — ใช้เสริม Test Set ที่มีอยู่'],
        ])}
        <p style="margin-top:8px;font-size:12.5px;color:${M.COL.gray500}">Test Set รันได้ทีละชุด (สูงสุด 100 คำถาม/ชุด) ผลลัพธ์เก็บไว้ให้ดูย้อนหลังได้ 89 วัน</p>
      `)}
      ${promptBox('ตัวอย่างคำถามทดสอบ (Manual Entry) — Copy ไปวางทีละบรรทัดได้เลย', 'Hot Work Permit มีอายุกี่ชั่วโมง?\nถ้าใบอนุญาตหมดอายุแต่งานยังไม่เสร็จต้องทำอย่างไร?\nใครเป็นผู้มีอำนาจอนุมัติใบอนุญาตทำงาน?\nงาน Confined Space ต้องตรวจวัดอากาศบ่อยแค่ไหน?\nLine Break Permit ต้องมีใครร่วมลงนามเพิ่มเติม?')}
    `)}

    <h2 id="step3">ขั้นตอนที่ 3–4: Run และวิเคราะห์ผล</h2>
    ${step(3, 'กด Evaluate และดูผลลัพธ์', `
      <p>รอ 3–5 นาที ระบบจะถามคำถามทั้ง 10 ข้อกับ Agent แล้วให้คะแนน Pass/Fail อัตโนมัติ</p>
      ${mockup(mock3, 'ผลการ Evaluate — Pass Rate 70%')}
      ${box('note', '', '<p><strong>Test Method</strong> คือวิธีตัดสิน Pass/Fail — "General Quality" ที่ใช้ใน Lab นี้ให้ AI ประเมินความถูกต้องโดยรวม เหมาะกับคำถามปลายเปิด นอกจากนี้ยังมี Exact/Keyword match (ตรวจคำตรงตัว), Similarity/Compare meaning (ตรวจความหมายใกล้เคียง), Capability use (ตรวจว่าเรียกใช้ Tool/Topic ที่ถูกต้องหรือไม่) และ Custom — เลือกใช้ตามลักษณะคำถามแต่ละชุด</p>')}
      ${mockup(mock6, 'ตัวอย่างแบบเดียวกัน แต่คนละแผนก: ผล Evaluate ของ Work Permit Bot ทีม Engineer — Fail ข้อ 4 บอกว่า Knowledge ยังไม่มีรายละเอียดเรื่อง Line Break Permit ต้องเพิ่มเอกสาร')}
    `)}
    ${step(4, 'วิเคราะห์คำถามที่ Fail', `
      <p>กดเข้าไปดูรายละเอียดคำถามที่ Fail เปรียบเทียบ Expected กับ Actual Response เพื่อหาสาเหตุ</p>
      ${mockup(mock4, 'รายละเอียดคำถามที่ Fail พร้อมสาเหตุ')}
      ${box('tip', '', '<p>สาเหตุที่ Fail มักมาจาก 2 เรื่อง: (1) Knowledge ไม่มีข้อมูลนี้ → เพิ่มเอกสาร (2) Instructions ไม่ชัดเจน → ปรับ Instructions</p>')}
      ${box('tip', '', '<p>เปิด <strong>Activity map</strong> ในรายละเอียดคำถามที่ Fail เพื่อดูเส้นทางการทำงานทีละขั้นของ Agent — เห็นได้ว่า Agent ใช้ Knowledge Source ไหน เรียก Tool อะไร หรือเข้า Topic ไหนก่อนจะตอบ ช่วยระบุจุดที่ผิดพลาดได้เร็วกว่าอ่านแค่คำตอบสุดท้าย</p>')}
    `)}

    <h2 id="step5">ขั้นตอนที่ 5: ปรับปรุงและวัดผลซ้ำ</h2>
    ${step(5, 'แก้ไขและ Evaluate อีกครั้ง', `
      <p>เพิ่มเอกสารหรือปรับ Instructions ตามที่วิเคราะห์ได้ แล้วรัน Evaluate ด้วย Test Set เดิมอีกครั้งเพื่อเปรียบเทียบ</p>
      ${mockup(mock5, 'Pass Rate เพิ่มขึ้นหลังปรับปรุง Agent')}
      ${box('tip', '', '<p>ใช้ตัวเลือก <strong>"Compare with"</strong> เพื่อเทียบผลการรัน 2 ครั้ง — ลูกศรสีเขียวคือคำถามที่เพิ่งผ่านหลังแก้ไข ลูกศรสีแดงคือคำถามที่เคยผ่านแต่กลับมาล้มเหลว (Regression) ฟีเจอร์นี้ช่วยยืนยันว่าการแก้ไขไม่ได้ไปทำให้จุดอื่นแย่ลงโดยไม่ตั้งใจ</p>')}
    `)}

    ${box('success', '', '<p>คุณมีกระบวนการวัดและปรับปรุงคุณภาพ RAG Agent อย่างเป็นระบบแล้ว! เป้าหมายไม่ใช่ 100% แต่คือ Pass Rate ที่เพิ่มขึ้นทุกรอบ</p>')}

    <h2 id="mistakes">⚠️ ข้อผิดพลาดที่พบบ่อย</h2>
    <ul>
      <li>รัน Evaluation ก่อน Knowledge จะ Ready → ผลลัพธ์ไม่แม่นยำ</li>
      <li>คาดหวัง 100% Pass Rate ตั้งแต่รอบแรก → ในทางปฏิบัติต้องทำซ้ำหลายรอบ</li>
      <li>ไม่บันทึกว่าปรับอะไรไปในแต่ละรอบ → เปรียบเทียบผลไม่ได้ว่าอะไรช่วยจริง</li>
    </ul>

    <h2 id="challenge">🎯 ลองประยุกต์ใช้กับงานคุณ</h2>
    <ul>
      <li>ตั้งเป้า Pass Rate ของ Agent แผนกคุณไว้ที่เท่าไหร่?</li>
      <li>ลองเพิ่มคำถามที่ผู้ใช้จริงมักถามเข้าไปใน Test Set ด้วยตัวเอง</li>
    </ul>
  `;

  const html = pageShell({
    file: 'lab5.html',
    title: 'Lab 5: Evaluation — RAG Course',
    eyebrow: 'LAB 5 · ⏱ 30 นาที · Level 200',
    heroTitle: '📊 Evaluation — วัดคุณภาพ RAG',
    heroLead: 'สร้าง Test Set วัด Pass Rate และปรับปรุง Agent อย่างเป็นระบบด้วย RAG Improvement Loop',
    pills: [['⏱', '30 นาที'], ['🎓', 'Level 200'], ['📈', 'Test Set + Pass Rate']],
    tocItems: [
      { id: 'loop', label: 'RAG Improvement Loop' },
      { id: 'step1', label: '1–2. สร้าง Test Set' },
      { id: 'step3', label: '3–4. Run + วิเคราะห์' },
      { id: 'step5', label: '5. ปรับปรุงซ้ำ' },
      { id: 'mistakes', label: 'ข้อผิดพลาดที่พบบ่อย' },
      { id: 'challenge', label: 'ลองประยุกต์ใช้' },
    ],
    prevNext: { prev: { href: 'lab4.html', label: 'Lab 4: Custom Topics' }, next: { href: 'lab6.html', label: 'Lab 6: Deploy to Teams' } },
    bodyHtml,
  });
  writePage('lab5.html', html);
}

module.exports = { build };
