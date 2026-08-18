# มาตรฐานการเขียนโค้ดและขั้นตอนการ Deploy (Coding Standard & Deployment Guide)
**บริษัท XYZ อินดัสตรี จำกัด**
เอกสารเลขที่: STD-DEV-001 | ฉบับที่: 5 | วันที่มีผลบังคับใช้: 1 มกราคม 2569 | ผู้จัดทำ: ฝ่ายพัฒนาระบบ (Programmer/Dev Team) | ทบทวนทุก 6 เดือน

---

## 1. วัตถุประสงค์

เพื่อกำหนดมาตรฐานการเขียนโค้ด การตั้งชื่อ และขั้นตอนการ Deploy ให้ทีมพัฒนาซอฟต์แวร์ภายในองค์กรทำงานเป็นมาตรฐานเดียวกัน ลดข้อผิดพลาดระหว่างทำงานร่วมกันหลายคน และทำให้ Code Review ทำได้รวดเร็วขึ้น

## 2. หลักการตั้งชื่อตัวแปรและฟังก์ชัน

| องค์ประกอบ | รูปแบบ | ตัวอย่าง |
|---|---|---|
| ตัวแปร (Variable) | camelCase | `customerName`, `totalAmount` |
| ฟังก์ชัน (Function) | camelCase ขึ้นต้นด้วยกริยา | `getCustomerData()`, `calculateTotal()` |
| คลาส (Class) | PascalCase | `OrderService`, `InvoiceGenerator` |
| ค่าคงที่ (Constant) | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT`, `API_BASE_URL` |
| ชื่อไฟล์ | kebab-case | `order-service.js`, `invoice-generator.py` |

ห้ามใช้ชื่อตัวแปรที่สื่อความหมายไม่ชัดเจน เช่น `data1`, `temp`, `x` ยกเว้นตัวแปร Loop counter ทั่วไป (เช่น `i`, `j`) ที่ยอมรับได้ในขอบเขตสั้นๆ

## 3. โครงสร้างโค้ดและ Comment

- ฟังก์ชันหนึ่งควรทำหน้าที่เดียว (Single Responsibility) และไม่ควรยาวเกิน 50 บรรทัด หากยาวกว่านั้นให้พิจารณาแยกฟังก์ชันย่อย
- เขียน Comment เฉพาะจุดที่อธิบาย "ทำไม" ไม่ใช่ "ทำอะไร" เพราะโค้ดที่ตั้งชื่อดีอยู่แล้วไม่จำเป็นต้องอธิบายซ้ำ
- ห้าม Comment โค้ดเก่าทิ้งไว้ในระบบ (Dead Code) ให้ลบออกและใช้ Git History ย้อนดูแทน
- ทุกฟังก์ชันสาธารณะ (Public Function/API) ต้องมี Docstring อธิบาย Input/Output อย่างน้อย 1 บรรทัด

## 4. การจัดการ Error และ Logging

| สถานการณ์ | แนวปฏิบัติ |
|---|---|
| Error ที่คาดการณ์ได้ (เช่น Input ผิด) | ต้อง Catch และคืนข้อความ Error ที่ผู้ใช้เข้าใจได้ ห้ามปล่อยให้ระบบ Crash |
| Error ที่ไม่คาดคิด (Unexpected) | Log รายละเอียดพร้อม Stack Trace ไปยังระบบ Logging กลาง (ELK) ทันที |
| ข้อมูลอ่อนไหว (Password, Token) | ห้าม Log ค่าจริงลงไฟล์ Log โดยเด็ดขาด ให้ Mask เป็น `****` เสมอ |
| ระดับ Log | ใช้ระดับ DEBUG/INFO/WARN/ERROR ให้ตรงตามความรุนแรงของเหตุการณ์ |

## 5. Git Workflow

1. สร้าง Branch ใหม่จาก `main` ทุกครั้งที่เริ่มงาน Feature/Bug ใหม่ ตั้งชื่อ Branch ตามรูปแบบ `feature/ชื่องาน` หรือ `fix/ชื่อบั๊ก`
2. Commit message ต้องสื่อความหมายชัดเจน ขึ้นต้นด้วยคำกริยา เช่น `Add`, `Fix`, `Update`, `Remove` และอธิบายเหตุผลสั้นๆ
3. ก่อนขอ Merge ต้องเปิด Pull Request พร้อมคำอธิบายสิ่งที่เปลี่ยนแปลงและวิธีทดสอบ
4. ต้องมีผู้ Review อย่างน้อย 1 คน (ไม่ใช่ผู้เขียนโค้ดเอง) อนุมัติก่อน Merge เข้า `main` ได้ทุกครั้ง
5. ห้าม Push โค้ดตรงเข้า `main` โดยไม่ผ่าน Pull Request ไม่ว่ากรณีใดก็ตาม

## 6. มาตรฐาน API Documentation

ทุก Endpoint ที่เปิดให้ระบบอื่นเรียกใช้ ต้องมีเอกสารประกอบครบทั้ง 4 หัวข้อต่อไปนี้ในระบบ API Documentation กลาง (Swagger/OpenAPI):

- **Method และ Path** เช่น `POST /api/v1/orders`
- **Request Parameters** พร้อมชนิดข้อมูลและว่าจำเป็นหรือไม่ (Required/Optional)
- **Response Schema** ตัวอย่าง JSON ทั้งกรณีสำเร็จ (200) และกรณี Error (400/401/500)
- **Authentication** ระบุว่าต้องใช้ API Key, Token หรือ OAuth ประเภทใด

## 7. ขั้นตอนการ Deploy

| ขั้นตอน | รายละเอียด | Environment |
|---|---|---|
| 1. Dev | พัฒนาและทดสอบเบื้องต้นบนเครื่องตนเอง | Local |
| 2. Staging | Deploy อัตโนมัติผ่าน CI/CD หลัง Merge เข้า `main` เพื่อทดสอบร่วมกับระบบอื่น | Staging Server |
| 3. UAT | ทีม QA และ Business ทดสอบยืนยันความถูกต้องของ Feature ก่อนขึ้นจริง | UAT Server |
| 4. Production | Deploy เฉพาะช่วงเวลาที่กำหนด (Maintenance Window) พร้อมแผน Rollback เสมอ | Production |

- การ Deploy ขึ้น Production ต้องได้รับอนุมัติจาก Team Lead และแจ้งผู้เกี่ยวข้องล่วงหน้าอย่างน้อย 1 วันทำการ ยกเว้นกรณี Hotfix เร่งด่วนที่กระทบระบบใช้งานจริง
- ทุกครั้งที่ Deploy ต้องมี Rollback Plan ที่ทดสอบแล้วว่าใช้งานได้จริง ก่อนเริ่ม Deploy
- ห้าม Deploy ขึ้น Production ในวันศุกร์หลัง 15:00 น. หรือก่อนวันหยุดยาว ยกเว้นกรณี Hotfix ที่กระทบการใช้งานจริงอย่างรุนแรง

## 8. Code Review Checklist

- โค้ดทำงานตรงตามความต้องการ (Requirement) และผ่าน Unit Test ที่เขียนไว้ครบถ้วน
- ไม่มีการ Hardcode ค่าที่ควรอยู่ใน Config หรือ Environment Variable เช่น URL, Password
- ตั้งชื่อตัวแปร/ฟังก์ชันตามมาตรฐานในข้อ 2 และมี Comment ตามข้อ 3
- ไม่มีช่องโหว่ด้านความปลอดภัยที่เห็นได้ชัด เช่น SQL Injection, ไม่ตรวจสอบสิทธิ์ผู้ใช้ก่อนเข้าถึงข้อมูล
- Performance เหมาะสม ไม่มี Loop ซ้อน Loop โดยไม่จำเป็นกับข้อมูลขนาดใหญ่

## 9. คำถามที่พบบ่อย (FAQ)

**Q: ตั้งชื่อฟังก์ชันควรใช้รูปแบบไหน?**
A: camelCase ขึ้นต้นด้วยคำกริยา เช่น `getCustomerData()`

**Q: Deploy ขึ้น Production ได้เมื่อไหร่?**
A: ต้องอยู่ใน Maintenance Window ที่กำหนด ได้รับอนุมัติจาก Team Lead และห้าม Deploy วันศุกร์หลัง 15:00 น. ยกเว้น Hotfix เร่งด่วน

**Q: Pull Request ต้องมีคนรีวิวกี่คน?**
A: อย่างน้อย 1 คนที่ไม่ใช่ผู้เขียนโค้ดเอง ก่อน Merge เข้า `main` ได้

**Q: Log ข้อมูล Password ได้หรือไม่?**
A: ห้ามโดยเด็ดขาด ต้อง Mask เป็น `****` เสมอ

**Q: ทุก API ต้องมีเอกสารประกอบอะไรบ้าง?**
A: Method/Path, Request Parameters, Response Schema และ Authentication ในระบบ Swagger/OpenAPI กลาง

**Q: Push โค้ดตรงเข้า main ได้หรือไม่?**
A: ห้ามเด็ดขาด ต้องผ่าน Pull Request และได้รับการอนุมัติก่อนทุกครั้ง
