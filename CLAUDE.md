# CLAUDE.md

คำแนะนำนี้เขียนไว้สำหรับ Claude (หรือ AI agent อื่นๆ) ที่จะเข้ามาช่วยงานต่อในโปรเจกต์นี้ในอนาคต — อธิบายว่าโปรเจกต์นี้คืออะไร โครงสร้างไฟล์เป็นอย่างไร และควรทำงานกับมันอย่างไรให้ถูกต้อง

## ภาพรวมโปรเจกต์

โปรเจกต์นี้คือชุดสื่อการสอน **"Build Your Own RAG Agent with Microsoft Copilot Studio"** — คอร์สอบรมภายในองค์กรระยะเวลา 1 วัน (09:00–16:30 น.) สอนพนักงานให้สร้าง RAG Agent (Retrieval-Augmented Generation) ด้วยตัวเองแบบ No-Code

เนื้อหาดัดแปลงมาจาก **Microsoft Copilot Agents Labs — Architecture Bootcamp** (ต้นฉบับ 3 วัน, 11 Labs, ภาษาอังกฤษ) โดยคัดเฉพาะส่วนที่เกี่ยวกับ RAG จริงๆ (Lab 1, 2 และแนวคิดจาก Lab 3/4/7 บางส่วน) แปลเป็นภาษาไทย และร้อยเรียงใหม่เป็น 6 Lab ที่กระชับและเรียงลำดับความยากง่ายจากง่ายไปยาก

อ้างอิงต้นฉบับ: https://microsoft.github.io/mcs-labs/events/bootcamp/

## โครงสร้างโปรเจกต์

```
Project_Thitiwut/
├── CLAUDE.md                                  ← ไฟล์นี้
├── course-materials/                          ← เอกสารประกอบการสอน (ใช้งานตรง ไม่ต้อง Build)
│   ├── RAG_Course_Outline_CopilotStudio.docx  ← Course Outline ฉบับเต็ม (13 sections)
│   ├── RAG_Teaching_Slides.pptx               ← สไลด์สอน 25 หน้า
│   ├── Instructor_Guide.docx                  ← คู่มือผู้สอน (Timeline, Talking Points, Troubleshooting)
│   └── Lab_Guide_TH.docx                      ← คู่มือ Lab แบบ Step-by-step (เอกสาร Word อย่างเดียว ไม่มีภาพ)
└── website/                                   ← เว็บคู่มือ Lab แบบ Interactive (มี Mockup ภาพประกอบ)
    ├── index.html                             ← หน้าแรก (Agenda + Lab Cards)
    ├── lab1.html ... lab6.html                ← เนื้อหาแต่ละ Lab
    ├── assets/style.css                       ← Stylesheet กลางของทั้งเว็บ
    └── src/                                   ← ซอร์สโค้ดที่ "สร้าง" ไฟล์ HTML ด้านบน (ดูหัวข้อถัดไป)
        ├── build.js                           ← Template engine หลัก (nav, hero, page shell)
        ├── mockups.js                         ← Library สร้างภาพ SVG จำลอง UI ของ Copilot Studio/M365/Teams
        ├── build_all.js                       ← สคริปต์ Build ทุกหน้าในคำสั่งเดียว
        ├── page_index.js                      ← เนื้อหาหน้า index.html
        ├── page_lab1.js ... page_lab6.js      ← เนื้อหาแต่ละ Lab (1 ไฟล์ต่อ 1 Lab)
        └── shot.js                            ← เครื่องมือ Screenshot หน้าเว็บด้วย Playwright (ใช้ตอน QA เท่านั้น)
```

**สิ่งสำคัญที่ต้องเข้าใจ:** ไฟล์ `.html` ใน `website/` **ไม่ได้เขียนด้วยมือ** แต่ถูก **Generate จากไฟล์ .js ใน `website/src/`** ทุกครั้ง — ถ้าจะแก้เนื้อหาหรือแก้บั๊ก **ต้องแก้ที่ไฟล์ .js แล้วรัน Build ใหม่เสมอ** ห้ามแก้ไฟล์ .html ตรงๆ เพราะจะถูกเขียนทับเมื่อ Build ครั้งถัดไป

---

## Website: วิธีใช้งานและแก้ไข

### ดูเว็บแบบไม่ต้องแก้อะไร
เปิด `website/index.html` ด้วย Browser (Chrome/Edge) ได้เลย — เป็น Static HTML ล้วน ไม่ต้องมี Server, ไม่ต้องต่อเน็ต ทำงาน Offline 100%

### แก้ไขเนื้อหา (เช่น แก้คำผิด, เปลี่ยนตัวอย่าง, เพิ่มขั้นตอน)
1. เปิดไฟล์ `website/src/page_labN.js` ของ Lab ที่ต้องการแก้ (N = 1-6) หรือ `page_index.js` สำหรับหน้าแรก
2. เนื้อหาทั้งหมดอยู่ในตัวแปร `bodyHtml` เป็น Template String (HTML ธรรมดาผสม Helper Function เช่น `step()`, `box()`, `mockup()`)
3. แก้ข้อความ/เพิ่มขั้นตอนตามต้องการ
4. รัน Build ใหม่ (ดูคำสั่งด้านล่าง)
5. เปิดไฟล์ .html ใน Browser เพื่อเช็คผลลัพธ์

### คำสั่ง Build

ต้องมี Node.js ติดตั้งในเครื่อง (Node 18+ แนะนำ) ไม่ต้องติดตั้ง Package เพิ่มเติมใดๆ สำหรับการ Build ปกติ (`mockups.js` และ `build.js` ไม่มี Dependency ภายนอก ใช้แค่ Node built-in `fs`/`path`)

```bash
cd website/src

# Build ทุกหน้าในคำสั่งเดียว (แนะนำ)
node build_all.js

# หรือ Build ทีละหน้า
node -e "require('./page_lab3.js').build()"
```

ไฟล์ .html ที่ Build ใหม่จะถูกเขียนทับที่ `website/` (โฟลเดอร์แม่ของ `src/`) โดยอัตโนมัติ — ดูค่านี้ได้ที่ตัวแปร `OUT` ใน `build.js`:
```js
const OUT = path.join(__dirname, '..'); // เขียนไฟล์ไปที่ website/ ไม่ใช่ website/src/
```

### เพิ่ม Lab ใหม่ (เช่น Lab 7)
1. Copy `page_lab6.js` เป็น `page_lab7.js` แล้วแก้เนื้อหาข้างในตามต้องการ
2. เพิ่ม Entry ใหม่ใน `NAV` และ `LABS_META` array ที่ `build.js` (ด้านบนของไฟล์)
3. แก้ `prevNext` ของ `page_lab6.js` ให้ `next` ชี้ไป `lab7.html`
4. เพิ่มบรรทัด `require('./page_lab7.js').build();` ใน `build_all.js`
5. รัน `node build_all.js`

---

## Design System

Theme สียึดตามสไลด์และเอกสาร Course Outline เดิม (Navy/Blue):

| ตัวแปร (mockups.js `COL`) | Hex | ใช้ที่ไหน |
|---|---|---|
| `navy` | `#1F3864` | Header, Nav, หัวข้อหลัก |
| `blue` | `#2E75B6` | ปุ่ม, Link, Active Tab |
| `blueLight` | `#D6E4F0` | พื้นหลัง Note Box, Badge |
| `cyan` | `#00B4D8` | Accent (Eyebrow text, จุดตกแต่ง) |
| `green` / `greenBg` | `#107C10` / `#E8F5E9` | สถานะ Ready/Pass, Success Box |
| `orange` / `orangeBg` | `#C55A11` / `#FFF3E0` | Warning Box, สถานะ Processing |
| `red` / `redBg` | `#C00000` / `#FFEBEE` | สถานะ Fail/Blocked |
| `purple` / `purpleBg` | `#7B2FBE` / `#F1E6FB` | Lab 4 (Custom Topics), Trigger node |

Font stack (CSS `body`): `"Leelawadee UI", "Noto Sans Thai", "Sarabun", "Tahoma", "Segoe UI", sans-serif` — เลือก Leelawadee UI ก่อนเพราะเป็นฟอนต์ที่มากับ Windows ทุกเครื่องและอ่านภาษาไทยได้ชัดเจน ไม่ต้องพึ่ง Internet/Google Fonts

CSS Component Classes หลักที่มีให้ใช้แล้ว (ดูนิยามใน `assets/style.css`): `.hero`, `.toc`, `.meta-table`, `.concept-table`, `.box.box-tip/.box-warn/.box-note/.box-success`, `.step`, `.mockup`, `.lab-card`, `.agenda-table`, `.footer-nav`

---

## Mockup Library (`mockups.js`)

โมดูลนี้เป็นหัวใจของเว็บ — สร้างภาพ SVG จำลองหน้าจอ Copilot Studio / M365 Copilot / Microsoft Teams "ปลอมๆ" (ไม่ใช่ Screenshot จริง) เพื่อใช้ประกอบขั้นตอนสอนโดยไม่ต้อง Login เข้าระบบจริงเพื่อถ่ายภาพ

ฟังก์ชันหลักที่มีให้ใช้:

| ฟังก์ชัน | ใช้ทำอะไร |
|---|---|
| `studioChrome({activeTab, agentName, body, bodyHeight})` | กรอบหน้าจอ Copilot Studio (Top nav ครบ 9 แท็บ + Publish/Test button) |
| `m365Chrome({sidebarActive, body, bodyHeight})` | กรอบหน้าจอ M365 Copilot Chat (Sidebar ซ้าย) |
| `teamsChrome({body, bodyHeight, channelName})` | กรอบหน้าจอ Microsoft Teams |
| `chatMessages(messages, opts)` | Chat bubble คู่สนทนา (คืนค่า `{svg, endY}` — endY ใช้คำนวณความสูง container) |
| `knowledgeList(items, opts)` | รายการ Knowledge Source พร้อม Badge สถานะ (Ready/Processing/Blocked) |
| `topicCanvasNodes(nodes)` | Flowchart Node แบบ Topics Canvas (trigger/message/question/condition/action) พร้อมเส้นลูกศรเชื่อม |
| `resultsTable(headers, rows, opts)` | ตารางผล Evaluation |
| `textInput` / `textArea` / `checkRow` / `iconGrid` / `barCompare` / `calloutBanner` / `topicList` | UI Element ย่อยอื่นๆ |

**วิธีสร้าง Mockup ใหม่:** ดูตัวอย่างใน `page_lab2.js` หรือ `page_lab4.js` เป็น Pattern — เรียกฟังก์ชันย่อยสร้าง `body` (เนื้อหาข้างใน) ก่อน แล้วห่อด้วย `studioChrome()`/`m365Chrome()`/`teamsChrome()` อีกที จากนั้นใช้ `mockup(svgString, captionText)` (จาก `build.js`) แปะลงใน HTML

### ⚠️ ข้อควรระวัง (บั๊กที่เคยเจอและแก้แล้ว)

1. **ความกว้าง SVG ไม่พอ**: `studioChrome`/`m365Chrome`/`teamsChrome` ต้องมี `width` เผื่อพอสำหรับทั้ง Sidebar + เนื้อหา ถ้าเนื้อหาข้างในกว้างเกินจะโดนตัด (Overflow) — ค่า Default ปัจจุบันตั้งไว้ที่ ~1000-1010px แล้ว ถ้าจะใส่เนื้อหากว้างกว่านี้ให้ส่ง `width` เพิ่มเข้าไปเอง
2. **สีที่ไม่ได้นิยามใน `COL`**: ถ้าอ้างอิง `M.COL.xxx` ที่ไม่มีอยู่จริง จะได้ `undefined` และ SVG จะเงียบๆ ไม่แสดงสี (ไม่ Error ให้เห็น) — เช็คให้ดีว่าอ้างอิงสีที่นิยามไว้แล้วในบรรทัดต้นไฟล์ `mockups.js`
3. **Emoji ใน SVG**: ใช้งานได้ปกติในเบราว์เซอร์จริง (Chrome/Edge) แต่ถ้าเอาไปเรนเดอร์ผ่าน Library อื่น เช่น `librsvg`/`sharp` อาจแสดงผลไม่ครบ (ใช้ได้เฉพาะตอน QA ด้วย Playwright เท่านั้นที่แม่นยำ)

### QA / ตรวจสอบภาพก่อนส่งมอบ
ใช้ `src/shot.js` (ต้อง `npm install playwright` ก่อนใช้ครั้งแรก — ไม่ได้ติดตั้งมาให้ในโปรเจกต์):
```bash
cd website/src
npm install playwright   # ครั้งแรกครั้งเดียว
node shot.js ../lab1.html /tmp/lab1_check 1
```
จะได้ไฟล์ `/tmp/lab1_check.png` เป็น Screenshot เต็มหน้าให้เปิดดูตรวจสอบ Layout ก่อนใช้สอนจริง

---

## เนื้อหาคอร์ส: Mapping กับ Microsoft Labs ต้นฉบับ

| Lab ในคอร์สนี้ | เวลา | อ้างอิงจาก Microsoft Lab | Use Case ที่หยิบมาใช้ |
|---|---|---|---|
| Lab 1: M365 Agent Builder | 35 นาที | `agent-builder-m365` | UC#1, UC#2 (ข้าม UC#3 Researcher, UC#4 Analyst) |
| Lab 2: Copilot Studio + Knowledge | 40 นาที | `core-concepts-agent-knowledge-tools` | UC#1 + UC#2 (ข้าม UC#3 Weather Tool, UC#4 Mailing List) |
| Lab 3: Prompt Engineering | 40 นาที | — (เสริมเอง ไม่มีใน Microsoft Lab โดยตรง) | ใช้แนวคิด Instructions จาก `core-concepts-agent-knowledge-tools` UC#2 |
| Lab 4: Custom Topics | 35 นาที | `core-concepts-agent-knowledge-tools` | UC#4 (Mailing List → ดัดแปลงเป็น Fallback/Escalation) |
| Lab 5: Evaluation | 30 นาที | `core-concepts-analytics-evaluations` | UC#2 + UC#3 (ข้าม UC#1 Analytics เพราะข้อมูลยังไม่มีในวันสอน) |
| Lab 6: Deploy to Teams | 15 นาที | `core-concepts-variables-agents-channels` | UC#3 เท่านั้น (ข้าม UC#1 Variables, UC#2 Child Agents) |

**หมายเหตุ:** เนื้อหา Lab 7 (Tools/MCP) และ Lab 10 (Multi-Agent) ของ Microsoft **ไม่ได้ใส่ไว้ในคอร์ส 1 วันนี้** เพราะเป็น RAG ขั้นสูงกว่า (Live Data RAG / Routing RAG) — วางแผนไว้เป็นคอร์ส Day 2/Day 3 ตาม Roadmap ที่ระบุในหน้า `index.html`

---

## แนวทางเมื่อจะขยายโปรเจกต์ต่อ

- **อยากสร้างคอร์ส Day 2 (Live Data RAG)**: Copy โครงสร้าง `website/` ทั้งชุด เปลี่ยน Config ใน `build.js` (NAV, LABS_META) ให้ชี้ไป Lab ใหม่ 4-6 Lab เนื้อหาอ้างอิงจาก Microsoft Lab 7 (Tools/MCP) เป็นหลัก
- **อยากได้ PDF แทน Website**: เปิดแต่ละ .html ด้วย Browser แล้ว Print to PDF ได้เลย มี `@media print` กำหนดไว้ใน `style.css` แล้ว (ซ่อน Nav/TOC/Footer nav ตอนพิมพ์)
- **อยากเปลี่ยน Mockup ให้เหมือนหน้าจอจริงยิ่งขึ้น**: ถ้ามีสิทธิ์เข้า Copilot Studio จริง แนะนำถ่าย Screenshot จริงแทน SVG Mockup ในจุดที่สำคัญที่สุด (เช่น หน้า Test Pane) แล้วฝังเป็น `<img>` แทนการเรียก `M.studioChrome()` เฉพาะจุดนั้น
- **การตั้งชื่อไฟล์**: ให้คงรูปแบบ `page_labN.js` → Build เป็น `labN.html` เสมอ เพื่อให้ Pattern ใน `build.js` (NAV, prevNext) ทำงานถูกต้องโดยไม่ต้องแก้โค้ดเพิ่ม

---

## เอกสารประกอบอื่นๆ (course-materials/)

ไฟล์ในโฟลเดอร์นี้เป็นเอกสาร Word/PowerPoint ปกติ **ไม่มีระบบ Build** แก้ไขตรงๆ ในโปรแกรม Word/PowerPoint ได้เลย:

- **RAG_Course_Outline_CopilotStudio.docx** — เอกสารสรุปทั้งคอร์ส 13 หัวข้อ (ภาพรวม, Target Audience, Prerequisites, Agenda, ผู้สอนต้องเตรียมอะไร ฯลฯ) ใช้ส่งให้ผู้บริหารอนุมัติหรือประชาสัมพันธ์คอร์ส
- **RAG_Teaching_Slides.pptx** — สไลด์สอน 25 หน้า พร้อม Speaker Notes ทุกหน้า ใช้ฉายระหว่างบรรยาย (คนละชุดกับ Website ซึ่งใช้ตอน Hands-on Lab)
- **Instructor_Guide.docx** — Timeline นาทีต่อนาที, Talking Points, ปัญหาที่พบบ่อย+วิธีแก้, เทคนิคการสอนให้ Engaging, Mapping ไป Microsoft Slides ต้นฉบับ
- **Lab_Guide_TH.docx** — คู่มือ Step-by-step แบบ Text ล้วน (เวอร์ชันก่อนที่จะพัฒนาเป็น Website ที่มี Mockup ภาพประกอบ) เก็บไว้เป็น Backup/Printout ได้ในกรณีไม่สะดวกใช้จอ

---

## Quick Reference — คำสั่งที่ใช้บ่อย

```bash
# Build เว็บใหม่ทั้งหมดหลังแก้เนื้อหา
cd website/src && node build_all.js

# เช็คว่าไฟล์ .html ทุกไฟล์ลิงก์ถึงกันครบ (ไม่มี Broken Link)
cd website && grep -oE 'href="[a-z0-9]+\.html' *.html | sort -u

# Screenshot ตรวจสอบหน้าเว็บ (ต้อง npm install playwright ก่อน)
cd website/src && node shot.js ../lab1.html /tmp/check 1
```
