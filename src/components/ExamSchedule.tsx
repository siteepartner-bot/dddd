import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  Calendar, 
  Clock, 
  MapPin, 
  Printer, 
  AlertCircle, 
  CheckCircle2, 
  Award,
  Sparkles,
  Info,
  ShieldAlert,
  QrCode
} from 'lucide-react';
import { ExamCardModal } from './ExamCardModal';

export const ExamSchedule: React.FC = () => {
  const { currentStudent, enrolledCourses, financials, setActiveTab } = useApp();
  const [examCardModalOpen, setExamCardModalOpen] = useState(false);

  // Generate deterministic seat number from student number and course code
  const getSeatNumber = (courseCode: string) => {
    const codeNum = parseInt(courseCode.slice(-3), 10) || 12;
    const stdNum = parseInt(currentStudent.studentNumber.slice(-2), 10) || 15;
    return `S-${(codeNum * 3 + stdNum) % 180 + 101}`;
  };

  const handlePrint = () => {
    setExamCardModalOpen(true);
  };

  const isFinancialClear = financials.remainingBalance <= 0;

  // Sort exams chronologically by Jalali date
  const sortedCoursesWithExams = [...enrolledCourses].sort((a, b) => {
    return a.examDate.localeCompare(b.examDate);
  });

  return (
    <div className="space-y-8 pb-12 text-right">
      
      {/* Header Banner */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 no-print">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                برنامه امتحانات پایان‌نیمسال و صدور کارت آزمون
              </h1>
            </div>
            <p className="text-xs text-slate-500">
              نیمسال اول سال تحصیلی ۱۴۰۳-۱۴۰۴ · موسسه آموزش عالی غیرانتفاعی سپاهان
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              disabled={enrolledCourses.length === 0}
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs hover:shadow transition-all disabled:opacity-50 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>مشاهده و چاپ کارت ورود به جلسه</span>
            </button>
          </div>
        </div>

        {/* Financial Eligibility Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs shrink-0">
              {enrolledCourses.length}
            </div>
            <div className="text-xs">
              <span className="text-slate-500 block">تعداد آزمون‌های پایان‌ترم:</span>
              <span className="font-bold text-slate-900">{enrolledCourses.length} عنوان درسی اخذ شده</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-xs shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <span className="text-slate-500 block">بازه برگزاری امتحانات:</span>
              <span className="font-bold text-slate-900">۱۵ دی لغایت ۴ بهمن ۱۴۰۳</span>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border flex items-center gap-3 ${
            isFinancialClear 
              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900' 
              : 'bg-amber-50/80 border-amber-200 text-amber-900'
          }`}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
              isFinancialClear ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {isFinancialClear ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            </div>
            <div className="text-xs">
              <span className="block opacity-80">وضعیت دسترسی به کارت آزمون:</span>
              <span className="font-bold">
                {isFinancialClear 
                  ? 'مجاز به شرکت در آزمون‌ها (تسویه کامل)' 
                  : 'دارای مانده بدهی شهریه (تسویه قبل از آزمون الزامی است)'}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Main Examination Timetable */}
      {enrolledCourses.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-4 no-print">
          <FileText className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">هیچ آزمونی برای شما ثبت نشده است</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            پس از انتخاب واحد، برنامه امتحانات پایان‌ترم شما به همراه تاریخ دقیق و شماره صندلی در این قسمت نمایش داده خواهد شد.
          </p>
          <button 
            onClick={() => setActiveTab('registration')}
            className="px-5 py-2.5 bg-teal-600 text-white rounded-xl text-xs font-bold hover:bg-teal-700"
          >
            ورود به انتخاب واحد
          </button>
        </div>
      ) : (
        <div className="space-y-4 no-print">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-900 text-white border-b border-slate-800">
                  <tr>
                    <th className="p-4 font-bold">ردیف</th>
                    <th className="p-4 font-bold">کد و گروه</th>
                    <th className="p-4 font-bold">عنوان درس</th>
                    <th className="p-4 font-bold">استاد درس</th>
                    <th className="p-4 font-bold">تاریخ برگزاری آزمون</th>
                    <th className="p-4 font-bold">روز و ساعت آزمون</th>
                    <th className="p-4 font-bold">حوزه و سالن امتحانی</th>
                    <th className="p-4 font-bold text-center">شماره صندلی</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {sortedCoursesWithExams.map((course, idx) => {
                    const seatNumber = getSeatNumber(course.code);
                    return (
                      <tr key={course.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4 font-bold text-slate-500 text-center">{idx + 1}</td>
                        <td className="p-4 font-mono font-bold text-slate-600">{course.code}-{course.group}</td>
                        <td className="p-4">
                          <div className="font-bold text-slate-900 text-sm">{course.title}</div>
                          <span className="text-[11px] text-slate-400">{course.units} واحد ({course.type})</span>
                        </td>
                        <td className="p-4 font-medium text-slate-800">{course.professor}</td>
                        <td className="p-4">
                          <span className="font-mono font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg">
                            {course.examDate}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="font-medium text-slate-800">{course.examDay}</div>
                          <div className="font-mono text-slate-500 text-[11px]">{course.examTime}</div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1.5 text-slate-700">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{course.examLocation}</span>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100">
                            {seatNumber}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Exam Rules and Guidelines Box */}
          <div className="bg-amber-50/80 rounded-2xl p-5 border border-amber-200 text-amber-950 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
              <ShieldAlert className="w-4 h-4 text-amber-700" />
              <span>مقررات و ضوابط ضروری حضور در جلسات امتحانی</span>
            </div>
            <ul className="space-y-1.5 text-[11px] text-amber-900/90 list-disc pr-4 leading-relaxed">
              <li>حضور در حوزه امتحانی حداقل ۳۰ دقیقه قبل از شروع آزمون و استقرار بر روی صندلی الزامی است.</li>
              <li>همراه داشتن کارت ورود به جلسه (عکس‌دار) به همراه کارت دانشجویی معتبر الزامی می‌باشد.</li>
              <li>به همراه داشتن هرگونه تلفن همراه، ساعت هوشمند، هندزفری یا جزوه (به غیر از امتحانات کتاب‌باز) تخلف انضباطی محسوب می‌گردد.</li>
              <li>در صورت هرگونه مغایرت در مشخصات دروس یا شماره صندلی، سریعاً به اداره آموزش موسسه مراجعه فرمایید.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Official Exam Card Modal */}
      {examCardModalOpen && (
        <ExamCardModal 
          onClose={() => setExamCardModalOpen(false)}
          courses={sortedCoursesWithExams}
        />
      )}

    </div>
  );
};
