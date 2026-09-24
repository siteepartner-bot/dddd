import React from 'react';
import { useApp } from '../context/AppContext';
import { PAST_GRADES } from '../data/mockData';
import { Award, BookOpen, CheckCircle2, TrendingUp, Printer } from 'lucide-react';

export const TranscriptView: React.FC = () => {
  const { currentStudent } = useApp();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-12 text-right">
      
      {/* Header */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 no-print">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                کارنامه کل و سوابق تحصیلی دانشجو
              </h1>
            </div>
            <p className="text-xs text-slate-500">
              {currentStudent.name} · شماره دانشجویی: {currentStudent.studentNumber} · رشته: {currentStudent.field}
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>چاپ کارنامه تحصیلی</span>
          </button>
        </div>

        {/* Academic GPA Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
            <span className="text-xs text-slate-500">معدل کل دروس:</span>
            <div className="text-2xl font-black text-slate-900 font-mono">
              {currentStudent.gpa}
            </div>
            <span className="text-[10px] text-teal-700 font-semibold">
              {currentStudent.gpa >= 17 ? 'رتبه ممتاز / استعداد درخشان' : 'وضعیت تحصیلی عادی'}
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
            <span className="text-xs text-slate-500">واحدهای گذرانده شده:</span>
            <div className="text-2xl font-black text-slate-900 font-mono">
              {currentStudent.passedUnits} <span className="text-xs font-normal text-slate-500">از ۱۴۰ واحد</span>
            </div>
            <span className="text-[10px] text-slate-400">پیشرفت کل دوره کارشناسی: ۵۲٪</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
            <span className="text-xs text-slate-500">واحدهای مشروطی:</span>
            <div className="text-2xl font-black text-emerald-700 font-mono">
              ۰ <span className="text-xs font-normal text-slate-500">واحد</span>
            </div>
            <span className="text-[10px] text-emerald-700">فاقد هرگونه سابقه مشروطی</span>
          </div>
        </div>
      </section>

      {/* Grades Table */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden no-print">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">
            ریز نمرات دروس گذرانده شده در نیمسال‌های گذشته
          </h3>
          <span className="text-xs text-slate-500">
            تایید شده توسط اداره امتحانات و فارغ‌التحصیلان
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
              <tr>
                <th className="p-3.5 font-bold">ردیف</th>
                <th className="p-3.5 font-bold">کد درس</th>
                <th className="p-3.5 font-bold">عنوان درس</th>
                <th className="p-3.5 font-bold">تعداد واحد</th>
                <th className="p-3.5 font-bold">نیمسال تحصیلی</th>
                <th className="p-3.5 font-bold text-center">نمره نهایی</th>
                <th className="p-3.5 font-bold text-center">نتیجه</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {PAST_GRADES.map((grade, idx) => (
                <tr key={grade.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 font-bold text-slate-400">{idx + 1}</td>
                  <td className="p-3.5 font-mono text-slate-500">{grade.courseCode}</td>
                  <td className="p-3.5 font-bold text-slate-900">{grade.courseTitle}</td>
                  <td className="p-3.5 font-mono">{grade.units}</td>
                  <td className="p-3.5 text-slate-500">{grade.term}</td>
                  <td className="p-3.5 font-mono font-bold text-base text-center text-teal-800">
                    {grade.grade.toFixed(2)}
                  </td>
                  <td className="p-3.5 text-center">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold">
                      {grade.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Printable Official Transcript */}
      <div className="hidden print:block text-right p-8 bg-white text-black space-y-6">
        <div className="text-center border-b-2 border-black pb-4 space-y-1">
          <h2 className="text-lg font-bold">موسسه آموزش عالی غیرانتفاعی سپاهان</h2>
          <h3 className="text-base font-bold">کارنامه رسمی ریزنمرات تحصیلی دانشجو</h3>
          <p className="text-xs">اداره آموزش و سنجش دانشگاه</p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-xs border border-black p-3">
          <div>نام دانشجو: <strong>{currentStudent.name}</strong></div>
          <div>شماره دانشجویی: <strong>{currentStudent.studentNumber}</strong></div>
          <div>رشته: <strong>{currentStudent.field}</strong></div>
          <div>مقطع: <strong>{currentStudent.degree}</strong></div>
          <div>معدل کل: <strong>{currentStudent.gpa}</strong></div>
          <div>واحدهای گذرانده: <strong>{currentStudent.passedUnits} واحد</strong></div>
        </div>

        <table className="w-full border-collapse border border-black text-xs">
          <thead>
            <tr className="bg-slate-200">
              <th className="border border-black p-2">ردیف</th>
              <th className="border border-black p-2">کد درس</th>
              <th className="border border-black p-2">عنوان درس</th>
              <th className="border border-black p-2">واحد</th>
              <th className="border border-black p-2">نیمسال</th>
              <th className="border border-black p-2">نمره</th>
              <th className="border border-black p-2">وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {PAST_GRADES.map((g, i) => (
              <tr key={g.id}>
                <td className="border border-black p-2 text-center">{i + 1}</td>
                <td className="border border-black p-2 text-center">{g.courseCode}</td>
                <td className="border border-black p-2 font-bold">{g.courseTitle}</td>
                <td className="border border-black p-2 text-center">{g.units}</td>
                <td className="border border-black p-2 text-center">{g.term}</td>
                <td className="border border-black p-2 text-center font-bold">{g.grade}</td>
                <td className="border border-black p-2 text-center">{g.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-end pt-8 text-xs">
          <div>تاریخ صدور: {new Date().toLocaleDateString('fa-IR')}</div>
          <div className="text-center">
            <div>مهر و امضای معاونت آموزشی موسسه آموزش عالی سپاهان</div>
            <div className="h-12"></div>
            <div>امضا</div>
          </div>
        </div>
      </div>

    </div>
  );
};
