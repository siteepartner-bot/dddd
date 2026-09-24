import React from 'react';
import { useApp } from '../context/AppContext';
import { Course } from '../types';
import { X, Printer, ShieldCheck, QrCode, GraduationCap } from 'lucide-react';

interface ExamCardModalProps {
  onClose: () => void;
  courses: Course[];
}

export const ExamCardModal: React.FC<ExamCardModalProps> = ({ onClose, courses }) => {
  const { currentStudent } = useApp();

  const handlePrint = () => {
    window.print();
  };

  const getSeatNumber = (courseCode: string) => {
    const codeNum = parseInt(courseCode.slice(-3), 10) || 12;
    const stdNum = parseInt(currentStudent.studentNumber.slice(-2), 10) || 15;
    return `S-${(codeNum * 3 + stdNum) % 180 + 101}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      
      {/* Modal Container */}
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-right space-y-6 my-6 relative">
        
        {/* Top Modal Actions (Hidden in Print) */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 no-print">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-teal-700" />
            <span className="font-bold text-slate-900 text-base">
              کارت ورود به جلسه آزمون‌های پایان‌نیمسال
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>چاپ رسمی کارت (Print)</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Exam Card */}
        <div className="printable-card border-2 border-slate-800 rounded-2xl p-6 bg-white text-slate-900 space-y-5">
          
          {/* Card Official Header */}
          <div className="flex items-center justify-between border-b-2 border-slate-800 pb-4 text-center">
            
            {/* Right: Barcode simulation */}
            <div className="text-right space-y-1 w-32 hidden sm:block">
              <div className="font-mono text-[10px] text-slate-600">بارکد داوطلب:</div>
              <div className="font-mono font-bold tracking-widest text-xs bg-slate-100 p-1.5 rounded border border-slate-300 text-center">
                ||| | |||| | ||| |
              </div>
              <div className="font-mono text-[10px] text-slate-500">{currentStudent.studentNumber}</div>
            </div>

            {/* Center: University Crest & Title */}
            <div className="space-y-1">
              <div className="text-xs font-semibold text-slate-600">جمهوری اسلامی ایران - وزارت علوم، تحقیقات و فناوری</div>
              <h2 className="text-base sm:text-lg font-black text-slate-950">
                موسسه آموزش عالی غیرانتفاعی سپاهان
              </h2>
              <div className="text-xs sm:text-sm font-bold text-teal-800">
                کارت ورود به جلسه آزمون‌های پایان‌نیمسال اول ۱۴۰۳ - ۱۴۰۴
              </div>
            </div>

            {/* Left: Student Photo */}
            <div className="w-24 h-28 border-2 border-slate-400 rounded-lg p-0.5 overflow-hidden bg-slate-50 shrink-0">
              <img 
                src={currentStudent.avatarUrl} 
                alt={currentStudent.name}
                className="w-full h-full object-cover rounded"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Student Information Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-500 block text-[11px]">نام و نام خانوادگی:</span>
              <strong className="text-slate-900">{currentStudent.name}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">شماره دانشجویی:</span>
              <strong className="font-mono text-slate-900">{currentStudent.studentNumber}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">کد ملی:</span>
              <strong className="font-mono text-slate-900">{currentStudent.nationalCode}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">رشته تحصیلی:</span>
              <strong className="text-slate-900">{currentStudent.field}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">مقطع تحصیلی:</span>
              <strong className="text-slate-900">{currentStudent.degree}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">نیمسال ورود:</span>
              <strong className="text-slate-900">مهر {currentStudent.entryYear}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">ترم جاری:</span>
              <strong className="text-slate-900">ترم {currentStudent.currentTerm}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">تعداد دروس امتحان:</span>
              <strong className="font-mono text-teal-800">{courses.length} عنوان درسی</strong>
            </div>
          </div>

          {/* Exam Table */}
          <div className="border border-slate-300 rounded-xl overflow-hidden">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-200 text-slate-800 font-bold border-b border-slate-300">
                <tr>
                  <th className="p-2.5 text-center">ردیف</th>
                  <th className="p-2.5">کد درس</th>
                  <th className="p-2.5">عنوان درس</th>
                  <th className="p-2.5">استاد</th>
                  <th className="p-2.5">تاریخ امتحان</th>
                  <th className="p-2.5">ساعت</th>
                  <th className="p-2.5">محل حوزه</th>
                  <th className="p-2.5 text-center">شماره صندلی</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                {courses.map((course, idx) => {
                  const seat = getSeatNumber(course.code);
                  return (
                    <tr key={course.id} className="hover:bg-slate-50">
                      <td className="p-2.5 text-center font-bold text-slate-500">{idx + 1}</td>
                      <td className="p-2.5 font-mono">{course.code}-{course.group}</td>
                      <td className="p-2.5 font-bold">{course.title}</td>
                      <td className="p-2.5">{course.professor}</td>
                      <td className="p-2.5 font-mono font-bold">{course.examDate}</td>
                      <td className="p-2.5 font-mono">{course.examTime}</td>
                      <td className="p-2.5">{course.examLocation}</td>
                      <td className="p-2.5 text-center font-mono font-bold text-teal-900 bg-teal-50/50">
                        {seat}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer & Signature Stamps */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 border-t border-slate-200">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                <span>این کارت دارای تاییدیه الکترونیکی آموزش بوده و بدون مهر برجسته معتبر است.</span>
              </div>
              <div className="text-[11px] text-slate-500">
                تذکر: داوطلب موظف است این کارت را به همراه کارت دانشجویی در کلیه جلسات همراه داشته باشد.
              </div>
            </div>

            <div className="text-center min-w-[160px] border border-dashed border-slate-300 p-2 rounded-xl bg-slate-50/50">
              <div className="text-[10px] text-slate-400">مهر و امضای اداره آموزش</div>
              <div className="font-bold text-teal-900 text-xs mt-1">موسسه آموزش عالی سپاهان</div>
              <div className="text-[9px] font-mono text-slate-400">تاییدیه سیستمی #SEP-{currentStudent.studentNumber}</div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
