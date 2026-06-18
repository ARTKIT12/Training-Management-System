
import React, { useState } from 'react';
import { Target, AlertTriangle, Scale, Paperclip, Send, CheckCircle } from 'lucide-react';

const TNAPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="h-[60vh] flex items-center justify-center text-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl border max-w-md w-full animate-in fade-in zoom-in duration-300">
          <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">TNA บันทึกสำเร็จ</h2>
          <p className="text-gray-500 mb-6">ข้อมูลความต้องการฝึกอบรมของคุณถูกส่งไปยังฝ่าย HR เพื่อพิจารณารวบรวมเข้าแผนประจำปีแล้ว</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition"
          >
            สร้างแบบฟอร์มใหม่
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-2">
        <div className="p-3 bg-blue-600 rounded-xl text-white shadow-lg">
          <Target size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Training Needs Analysis</h2>
          <p className="text-sm text-gray-500 font-medium">ระบุความต้องการฝึกอบรมที่เชื่อมโยงกับเป้าหมายองค์กร</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 space-y-8">
          {/* Section 1 */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-blue-600 font-bold border-b pb-2">
              <Target size={18} />
              <span>1. เป้าหมายองค์กร / แผนกลยุทธ์ (Corporate Goals)</span>
            </div>
            <textarea 
              rows={3}
              placeholder="เป้าหมายของแผนกหรือองค์กรในปีนี้ที่ต้องการการพัฒนาคน..."
              className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 transition"
            ></textarea>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-orange-600 font-bold border-b pb-2">
              <AlertTriangle size={18} />
              <span>2. ปัญหาหน้างาน / ช่องว่างทักษะ (Skill Gaps & Operational Issues)</span>
            </div>
            <textarea 
              rows={3}
              placeholder="ระบุปัญหาที่เกิดขึ้นจริงในงาน และทักษะที่ขาดหายไป..."
              className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 transition"
            ></textarea>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-purple-600 font-bold border-b pb-2">
              <Scale size={18} />
              <span>3. ข้อกำหนดทางกฎหมาย / ISO (Legal & Standard Compliance)</span>
            </div>
            <textarea 
              rows={2}
              placeholder="หลักสูตรที่ต้องจัดตามกฎหมาย หรือมาตรฐานสากล เช่น ISO, Safety, etc."
              className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50 transition"
            ></textarea>
          </section>

          {/* File Attachment */}
          <div className="bg-gray-50 p-6 rounded-xl border border-dashed border-gray-300 text-center hover:bg-gray-100 transition cursor-pointer">
            <input type="file" className="hidden" id="file-upload" />
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2 text-gray-500">
              <Paperclip size={32} className="text-blue-500" />
              <span className="font-bold">แนบไฟล์ประกอบ (Optional)</span>
              <span className="text-xs">PDF, Excel, หรือรูปภาพผลการประเมิน (ไม่เกิน 10MB)</span>
            </label>
          </div>

          <button 
            onClick={() => setSubmitted(true)}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-xl shadow-blue-200 flex items-center justify-center gap-2"
          >
            <Send size={20} />
            บันทึกข้อมูลและส่งวิเคราะห์
          </button>
        </div>
      </div>
    </div>
  );
};

export default TNAPage;
