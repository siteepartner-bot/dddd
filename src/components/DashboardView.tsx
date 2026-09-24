import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  CreditCard, 
  BookOpen, 
  Calendar, 
  FileText, 
  Award, 
  User, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  ArrowLeft,
  ChevronLeft,
  DollarSign
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { currentStudent, enrolledCourses, totalEnrolledUnits, financials, setActiveTab } = useApp();

  return (
    <div className="space-y-8 pb-12 text-right">
      
      {/* Student Profile Identity Card */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <img 
              src={currentStudent.avatarUrl} 
              alt={currentStudent.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-teal-600/30 shadow-sm"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {currentStudent.name}
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 font-medium border border-teal-100">
                  {currentStudent.status}
                </span>
              </div>
              <div className="text-xs sm:text-sm text-slate-500 flex flex-wrap gap-y-1 gap-x-3">
                <span>شماره دانشجویی: <strong className="font-mono text-slate-800">{currentStudent.studentNumber}</strong></span>
                <span>·</span>
                <span>کد ملی: <strong className="font-mono text-slate-800">{currentStudent.nationalCode}</strong></span>
              </div>
              <div className="text-xs text-slate-600">
                <span>رشته: <strong>{currentStudent.field}</strong> ({currentStudent.degree})</span>
                <span className="mx-2">·</span>
                <span>ترم تحصیلی: <strong>{currentStudent.currentTerm}</strong></span>
                <span className="mx-2">·</span>
                <span>استاد راهنما: <strong>{currentStudent.advisor}</strong></span>
              </div>
            </div>
          </div>

          {/* Key Metrics Quick Box */}
          <div className="grid grid-cols-3 gap-3 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center min-w-[90px]">
              <span className="text-[11px] text-slate-500 block">معدل کل</span>
              <span className="text-lg font-black text-slate-900 font-mono">{currentStudent.gpa}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center min-w-[90px]">
              <span className="text-[11px] text-slate-500 block">واحدهای انتخابی</span>
              <span className="text-lg font-black text-teal-700 font-mono">{totalEnrolledUnits} <span className="text-xs font-normal">واحد</span></span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center min-w-[90px]">
              <span className="text-[11px] text-slate-500 block">واحدهای گذرانده</span>
              <span className="text-lg font-black text-slate-900 font-mono">{currentStudent.passedUnits}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Shortcuts Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Unit Registration */}
        <div 
          onClick={() => setActiveTab('registration')}
          className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-teal-500 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-emerald-800">
              {totalEnrolledUnits} از {currentStudent.maxUnits} واحد
            </span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
              انتخاب واحد و ثبت نام
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              مدیریت، اخذ و حذف دروس ترم جاری با کنترل پیش‌نیاز
            </p>
          </div>
          <div className="pt-2 text-xs font-semibold text-teal-700 flex items-center gap-1">
            <span>ورود به انتخاب واحد</span>
            <ChevronLeft className="w-4 h-4" />
          </div>
        </div>

        {/* Tuition Payment */}
        <div 
          onClick={() => setActiveTab('tuition')}
          className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-teal-500 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <CreditCard className="w-5 h-5" />
            </div>
            <span className={`text-xs font-medium ${financials.remainingBalance > 0 ? 'text-amber-800' : 'text-emerald-800'}`}>
              {financials.remainingBalance > 0 ? 'دارای مانده بدهی' : 'تسویه کامل'}
            </span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
              امور مالی و پرداخت شهریه
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              صورت‌حساب تفکیکی، درگاه بانکی و صدور رسید دیجیتال
            </p>
          </div>
          <div className="pt-2 text-xs font-semibold text-teal-700 flex items-center gap-1">
            <span>مشاهده و پرداخت</span>
            <ChevronLeft className="w-4 h-4" />
          </div>
        </div>

        {/* Weekly Schedule */}
        <div 
          onClick={() => setActiveTab('schedule')}
          className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-teal-500 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-sky-800">
              {enrolledCourses.length} درس در هفته
            </span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
              برنامه هفتگی کلاس‌ها
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              جدول زمانی ساعات برگزاری کلاس‌ها و شماره اتاق‌ها
            </p>
          </div>
          <div className="pt-2 text-xs font-semibold text-teal-700 flex items-center gap-1">
            <span>مشاهده جدول هفتگی</span>
            <ChevronLeft className="w-4 h-4" />
          </div>
        </div>

        {/* Exam Schedule */}
        <div 
          onClick={() => setActiveTab('exams')}
          className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-teal-500 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-indigo-800">
              {enrolledCourses.length} آزمون نهایی
            </span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
              برنامه امتحانات و کارت آزمون
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              تاریخ و ساعت امتحانات پایان‌ترم و پرینت کارت ورود
            </p>
          </div>
          <div className="pt-2 text-xs font-semibold text-teal-700 flex items-center gap-1">
            <span>دریافت کارت و زمان‌بندی</span>
            <ChevronLeft className="w-4 h-4" />
          </div>
        </div>

      </section>

      {/* Two Column Section: Currently Enrolled Courses vs Financial Status */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Enrolled Courses Quick List (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                دروس ثبت‌نام شده در نیمسال اول ۱۴۰۳-۱۴۰۴
              </h3>
            </div>
            <button 
              onClick={() => setActiveTab('registration')}
              className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1"
            >
              <span>ویرایش دروس</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          {enrolledCourses.length === 0 ? (
            <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
              <div className="font-bold text-slate-800">هنوز درسی انتخاب نکرده‌اید!</div>
              <p className="text-xs text-slate-500">
                جهت شروع ترم تحصیلی به بخش انتخاب واحد مراجعه فرمایید.
              </p>
              <button 
                onClick={() => setActiveTab('registration')}
                className="px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold hover:bg-teal-700"
              >
                شروع انتخاب واحد
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="p-3 font-semibold">کد درس</th>
                      <th className="p-3 font-semibold">عنوان درس</th>
                      <th className="p-3 font-semibold">واحد</th>
                      <th className="p-3 font-semibold">نوع</th>
                      <th className="p-3 font-semibold">استاد</th>
                      <th className="p-3 font-semibold">تاریخ امتحان</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {enrolledCourses.map(course => (
                      <tr key={course.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3 font-mono text-slate-500">{course.code}-{course.group}</td>
                        <td className="p-3 font-bold text-slate-900">{course.title}</td>
                        <td className="p-3 font-mono">{course.units}</td>
                        <td className="p-3">
                          <span className="text-[11px] text-slate-600">{course.type}</span>
                        </td>
                        <td className="p-3">{course.professor}</td>
                        <td className="p-3 font-mono text-teal-800">{course.examDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Financial Status Box (1 col) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              خلاصه وضعیت شهریه
            </h3>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4 text-xs">
            <div className="space-y-2.5 pb-3 border-b border-slate-100">
              <div className="flex justify-between text-slate-600">
                <span>شهریه ثابت:</span>
                <span className="font-mono font-medium text-slate-900">{financials.fixedTuition.toLocaleString('fa-IR')} تومان</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>شهریه متغیر ({totalEnrolledUnits} واحد):</span>
                <span className="font-mono font-medium text-slate-900">{financials.variableTuition.toLocaleString('fa-IR')} تومان</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>بیمه و خدمات رفاهی:</span>
                <span className="font-mono font-medium text-slate-900">{financials.servicesFee.toLocaleString('fa-IR')} تومان</span>
              </div>
            </div>

            <div className="space-y-2.5 pb-3 border-b border-slate-100">
              <div className="flex justify-between text-slate-700 font-bold">
                <span>کل مبلغ شهریه ترم:</span>
                <span className="font-mono text-slate-900">{financials.totalTuition.toLocaleString('fa-IR')} تومان</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>مجموع پرداختی‌ها:</span>
                <span className="font-mono font-bold">{financials.totalPaid.toLocaleString('fa-IR')} تومان</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-500 block">مانده بدهی قابل پرداخت:</span>
                <span className={`text-base font-black font-mono ${financials.remainingBalance > 0 ? 'text-rose-600' : 'text-emerald-700'}`}>
                  {financials.remainingBalance > 0 ? `${financials.remainingBalance.toLocaleString('fa-IR')} تومان` : 'تسویه کامل (۰ تومان)'}
                </span>
              </div>
              
              {financials.remainingBalance > 0 && (
                <button 
                  onClick={() => setActiveTab('tuition')}
                  className="px-3 py-2 bg-teal-600 text-white rounded-lg text-xs font-bold hover:bg-teal-700"
                >
                  پرداخت بدهی
                </button>
              )}
            </div>
          </div>
        </div>

      </section>

    </div>
  );
};
