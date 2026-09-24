import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DayOfWeek, Course } from '../types';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User, 
  Printer, 
  Grid, 
  List, 
  Info,
  BookOpen
} from 'lucide-react';

const DAYS_OF_WEEK: DayOfWeek[] = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه'];

const TIME_SLOTS = [
  { id: 'slot1', label: '۰۸:۰۰ الی ۱۰:۰۰', start: '08:00', end: '10:00' },
  { id: 'slot2', label: '۱۰:۰۰ الی ۱۲:۰۰', start: '10:00', end: '12:00' },
  { id: 'slot3', label: '۱۳:۳۰ الی ۱۵:۳۰', start: '13:30', end: '15:30' },
  { id: 'slot4', label: '۱۵:۳۰ الی ۱۷:۳۰', start: '15:30', end: '17:30' }
];

export const WeeklySchedule: React.FC = () => {
  const { currentStudent, enrolledCourses, totalEnrolledUnits, setActiveTab } = useApp();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedDayFilter, setSelectedDayFilter] = useState<DayOfWeek | 'all'>('all');

  const handlePrint = () => {
    window.print();
  };

  // Helper to find courses for a day and time slot
  const getCoursesForSlot = (day: DayOfWeek, startTime: string) => {
    return enrolledCourses.filter(course => {
      return course.schedule.some(s => s.day === day && (s.startTime === startTime || (s.startTime <= startTime && s.endTime > startTime)));
    });
  };

  // Color mapper for distinctive visual cues without neon slop
  const getCourseColorStyle = (type: string) => {
    switch (type) {
      case 'تخصصی':
        return 'bg-teal-50/90 border-teal-200 text-teal-950';
      case 'عملی-آزمایشگاهی':
        return 'bg-amber-50/90 border-amber-200 text-amber-950';
      case 'پایه':
        return 'bg-indigo-50/90 border-indigo-200 text-indigo-950';
      default:
        return 'bg-slate-100/90 border-slate-200 text-slate-900';
    }
  };

  return (
    <div className="space-y-8 pb-12 text-right">
      
      {/* Header Banner */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 no-print">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                برنامه هفتگی کلاس‌های آموزشی
              </h1>
            </div>
            <p className="text-xs text-slate-500">
              نیمسال اول سال تحصیلی ۱۴۰۳-۱۴۰۴ · {currentStudent.name} ({currentStudent.field})
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* View Mode Switcher */}
            <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>نمای جدولی</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  viewMode === 'list' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>نمای لیستی</span>
              </button>
            </div>

            <button
              onClick={handlePrint}
              disabled={enrolledCourses.length === 0}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>چاپ برنامه هفتگی</span>
            </button>
          </div>
        </div>

        {/* Quick summary stats */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
          <div className="flex items-center gap-4 flex-wrap">
            <span>مجموع دروس فعال: <strong className="text-slate-900 font-mono">{enrolledCourses.length} درس</strong></span>
            <span>·</span>
            <span>مجموع واحدها: <strong className="text-teal-800 font-mono">{totalEnrolledUnits} واحد</strong></span>
            <span>·</span>
            <span>محل برگزاری: <strong className="text-slate-900">پردیس مرکزی موسسه سپاهان</strong></span>
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <span className="inline-flex items-center gap-1 text-teal-800 font-medium">
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              <span>تخصصی</span>
            </span>
            <span className="inline-flex items-center gap-1 text-indigo-800 font-medium mr-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span>پایه</span>
            </span>
            <span className="inline-flex items-center gap-1 text-amber-800 font-medium mr-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>عملی / کارگاهی</span>
            </span>
          </div>
        </div>
      </section>

      {/* When no courses are enrolled */}
      {enrolledCourses.length === 0 && (
        <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-4 no-print">
          <CalendarIcon className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">برنامه کلاسی شما خالی است</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            هنوز درسی برای این نیمسال انتخاب نکرده‌اید. با مراجعه به بخش انتخاب واحد دروس مورد نظر خود را اضافه کنید.
          </p>
          <button 
            onClick={() => setActiveTab('registration')}
            className="px-5 py-2.5 bg-teal-600 text-white rounded-xl text-xs font-bold hover:bg-teal-700"
          >
            ورود به انتخاب واحد
          </button>
        </div>
      )}

      {/* Grid Mode View (Desktop & Tablet Timetable Matrix) */}
      {enrolledCourses.length > 0 && viewMode === 'grid' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden no-print">
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse min-w-[760px]">
              
              {/* Header: Time Slots */}
              <thead>
                <tr className="bg-slate-900 text-white text-xs border-b border-slate-800">
                  <th className="p-4 w-28 text-center font-bold">روز هفته</th>
                  {TIME_SLOTS.map(slot => (
                    <th key={slot.id} className="p-4 text-center font-bold border-r border-slate-800">
                      <div className="font-semibold text-sm">{slot.label}</div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Body: Days with Course Slots */}
              <tbody className="divide-y divide-slate-200 text-xs">
                {DAYS_OF_WEEK.map(day => (
                  <tr key={day} className="hover:bg-slate-50/50 transition-colors">
                    {/* Day Column */}
                    <td className="p-4 font-bold text-slate-900 text-center bg-slate-50/80 border-l border-slate-200 w-28">
                      {day}
                    </td>

                    {/* Time Slot Columns */}
                    {TIME_SLOTS.map(slot => {
                      const coursesInSlot = getCoursesForSlot(day, slot.start);

                      return (
                        <td key={slot.id} className="p-2 border-r border-slate-100 align-top min-w-[170px] h-28">
                          {coursesInSlot.length > 0 ? (
                            <div className="space-y-1.5 h-full">
                              {coursesInSlot.map(c => {
                                const sched = c.schedule.find(s => s.day === day);
                                return (
                                  <div
                                    key={c.id}
                                    className={`p-2.5 rounded-xl border ${getCourseColorStyle(c.type)} shadow-xs flex flex-col justify-between h-full space-y-1.5`}
                                  >
                                    <div>
                                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                                        <span>{c.code}-{c.group}</span>
                                        <span>{c.units} واحد</span>
                                      </div>
                                      <div className="font-bold text-xs text-slate-900 leading-snug mt-0.5">
                                        {c.title}
                                      </div>
                                    </div>

                                    <div className="space-y-1 text-[11px] text-slate-600 pt-1 border-t border-slate-200/50">
                                      <div className="flex items-center gap-1 truncate" title={c.professor}>
                                        <User className="w-3 h-3 text-slate-400 shrink-0" />
                                        <span className="truncate">{c.professor}</span>
                                      </div>
                                      <div className="flex items-center gap-1 text-[10px] text-slate-500 truncate" title={sched?.room}>
                                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                                        <span className="truncate">{sched?.room}</span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="h-full rounded-xl border border-dashed border-slate-100 flex items-center justify-center text-[11px] text-slate-300">
                              -
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* List Mode View (Mobile friendly Day Cards) */}
      {enrolledCourses.length > 0 && viewMode === 'list' && (
        <div className="space-y-4 no-print">
          
          {/* Day Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 bg-white p-3 rounded-2xl border border-slate-200">
            <button
              onClick={() => setSelectedDayFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                selectedDayFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              همه روزها
            </button>
            {DAYS_OF_WEEK.map(d => (
              <button
                key={d}
                onClick={() => setSelectedDayFilter(d)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedDayFilter === d ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Day Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DAYS_OF_WEEK
              .filter(day => selectedDayFilter === 'all' || selectedDayFilter === day)
              .map(day => {
                const dayCourses: { course: Course; schedule: any }[] = [];
                enrolledCourses.forEach(c => {
                  c.schedule.forEach(s => {
                    if (s.day === day) {
                      dayCourses.push({ course: c, schedule: s });
                    }
                  });
                });

                // Sort by time
                dayCourses.sort((a, b) => a.schedule.startTime.localeCompare(b.schedule.startTime));

                return (
                  <div key={day} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                      <span className="font-bold text-slate-900 text-sm">{day}</span>
                      <span className="text-xs text-slate-400">
                        {dayCourses.length} جلسه کلاسی
                      </span>
                    </div>

                    {dayCourses.length === 0 ? (
                      <div className="text-xs text-slate-400 py-3 text-center">
                        کلاسی برای این روز در برنامه شما ثبت نشده است.
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        {dayCourses.map(({ course, schedule }, idx) => (
                          <div 
                            key={idx}
                            className={`p-3 rounded-xl border ${getCourseColorStyle(course.type)} space-y-1.5`}
                          >
                            <div className="flex items-start justify-between">
                              <span className="font-bold text-xs text-slate-900">
                                {course.title}
                              </span>
                              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-white/80 border border-slate-200">
                                {schedule.startTime} - {schedule.endTime}
                              </span>
                            </div>

                            <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                              <span>استاد: {course.professor}</span>
                              <span>{course.units} واحد ({course.type})</span>
                            </div>

                            <div className="flex items-center gap-1 text-[11px] text-slate-500 pt-0.5">
                              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>{schedule.room}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Printable Weekly Schedule (for printing physical PDF/Paper) */}
      <div className="hidden print:block text-right p-8 bg-white text-black space-y-6">
        <div className="text-center border-b-2 border-black pb-4 space-y-1">
          <h2 className="text-lg font-bold">موسسه آموزش عالی غیرانتفاعی سپاهان</h2>
          <h3 className="text-base font-bold">برنامه هفتگی تشکیل کلاس‌های آموزشی نیمسال اول ۱۴۰۳-۱۴۰۴</h3>
          <p className="text-xs">معاونت آموزشی و دانشجویی</p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-xs border border-black p-3">
          <div>نام دانشجو: <strong>{currentStudent.name}</strong></div>
          <div>شماره دانشجویی: <strong>{currentStudent.studentNumber}</strong></div>
          <div>رشته: <strong>{currentStudent.field}</strong></div>
          <div>تعداد واحدهای فعال: <strong>{totalEnrolledUnits} واحد</strong></div>
          <div>مقطع: <strong>{currentStudent.degree}</strong></div>
          <div>استاد راهنما: <strong>{currentStudent.advisor}</strong></div>
        </div>

        <table className="w-full border-collapse border border-black text-xs">
          <thead>
            <tr className="bg-slate-200">
              <th className="border border-black p-2 w-24">روز</th>
              {TIME_SLOTS.map(s => (
                <th key={s.id} className="border border-black p-2 text-center">{s.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DAYS_OF_WEEK.map(day => (
              <tr key={day}>
                <td className="border border-black p-2 font-bold text-center bg-slate-100">{day}</td>
                {TIME_SLOTS.map(slot => {
                  const courses = getCoursesForSlot(day, slot.start);
                  return (
                    <td key={slot.id} className="border border-black p-2 text-center align-top">
                      {courses.map(c => (
                        <div key={c.id} className="mb-1">
                          <div className="font-bold">{c.title}</div>
                          <div>{c.professor}</div>
                          <div className="text-[10px]">({c.schedule.find(s => s.day === day)?.room})</div>
                        </div>
                      ))}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-end pt-8 text-xs">
          <div>تاریخ چاپ: {new Date().toLocaleDateString('fa-IR')}</div>
          <div className="text-center">
            <div>مهر و تایید اداره آموزش موسسه غیرانتفاعی سپاهان</div>
            <div className="h-12"></div>
            <div>امضا</div>
          </div>
        </div>
      </div>

    </div>
  );
};
