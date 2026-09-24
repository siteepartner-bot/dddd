import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Course, StudyField } from '../types';
import { 
  BookOpen, 
  Search, 
  Plus, 
  Trash2, 
  Clock, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  Printer, 
  User, 
  Sparkles, 
  Layers,
  Filter
} from 'lucide-react';

export const CourseRegistration: React.FC = () => {
  const { 
    currentStudent, 
    allCourses, 
    enrolledCourseIds, 
    enrolledCourses, 
    enrollCourse, 
    dropCourse, 
    totalEnrolledUnits,
    showToast
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');
  const [showOnlyMyField, setShowOnlyMyField] = useState(true);

  const filterTypes = [
    { id: 'all', label: 'همه دروس' },
    { id: 'تخصصی', label: 'دروس تخصصی' },
    { id: 'پایه', label: 'دروس پایه' },
    { id: 'عمومی', label: 'دروس عمومی' },
    { id: 'عملی-آزمایشگاهی', label: 'عملی و کارگاهی' }
  ];

  // Filter available courses
  const filteredCourses = allCourses.filter(course => {
    // Search match
    const matchSearch = 
      course.title.includes(searchTerm) || 
      course.professor.includes(searchTerm) || 
      course.code.includes(searchTerm);
    if (!matchSearch) return false;

    // Type filter
    if (selectedTypeFilter !== 'all' && course.type !== selectedTypeFilter) {
      return false;
    }

    // Field filter
    if (showOnlyMyField) {
      return course.field === currentStudent.field || course.field === 'عمومی';
    }

    return true;
  });

  const handlePrint = () => {
    window.print();
  };

  const isUnitCountValid = totalEnrolledUnits >= currentStudent.minUnits && totalEnrolledUnits <= currentStudent.maxUnits;

  return (
    <div className="space-y-8 pb-12 text-right">
      
      {/* Top Banner / Registration Summary Header */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs no-print space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                سامانه انتخاب واحد و ترمیم دروس
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
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>چاپ تاییدیه انتخاب واحد</span>
            </button>
          </div>
        </div>

        {/* Units Counter & Limits Gauge */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80">
          
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">وضعیت تعداد واحدهای اخذ شده:</span>
              <span className="font-bold text-slate-900 font-mono">
                {totalEnrolledUnits} از {currentStudent.maxUnits} واحد مجاز
              </span>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${
                  totalEnrolledUnits < currentStudent.minUnits 
                    ? 'bg-amber-500' 
                    : totalEnrolledUnits > currentStudent.maxUnits 
                    ? 'bg-rose-500' 
                    : 'bg-teal-600'
                }`}
                style={{ width: `${Math.min(100, (totalEnrolledUnits / currentStudent.maxUnits) * 100)}%` }}
              />
            </div>

            <div className="flex justify-between text-[11px] text-slate-400">
              <span>حداقل مجاز: {currentStudent.minUnits} واحد</span>
              <span>حداکثر مجاز: {currentStudent.maxUnits} واحد</span>
            </div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200/60 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center font-mono font-bold text-xs shrink-0">
              {currentStudent.gpa}
            </div>
            <div className="text-xs">
              <span className="text-slate-500 block">معدل ترم قبل و شرایط سقف:</span>
              <span className="font-bold text-slate-800">
                {currentStudent.gpa >= 17 ? 'دانشجوی ممتاز (مجاز تا ۲۴ واحد)' : 'وضعیت عادی (مجاز تا ۲۰ واحد)'}
              </span>
            </div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200/60 flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
              isUnitCountValid ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
            }`}>
              {isUnitCountValid ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            </div>
            <div className="text-xs">
              <span className="text-slate-500 block">وضعیت اعتبار ثبت نام:</span>
              <span className={`font-bold ${isUnitCountValid ? 'text-emerald-700' : 'text-amber-700'}`}>
                {totalEnrolledUnits < currentStudent.minUnits 
                  ? `کمتر از حد نصاب (${currentStudent.minUnits - totalEnrolledUnits} واحد دیگر لازم است)` 
                  : 'تعداد واحدها در محدوده قانونی است'}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Main Selection Area: Left/Top is Filter & Course List, Right/Bottom is Enrolled Box */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Available Courses Pool (2 Cols) */}
        <div className="lg:col-span-2 space-y-4 no-print">
          
          {/* Search & Filter Toolbar */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                <input
                  type="text"
                  placeholder="جستجوی عنوان درس، استاد یا کد درس..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-3 pr-10 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-colors"
                />
              </div>

              <button
                onClick={() => setShowOnlyMyField(!showOnlyMyField)}
                className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                  showOnlyMyField 
                    ? 'bg-teal-50 border-teal-300 text-teal-800' 
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                <span>فقط رشته {currentStudent.field}</span>
              </button>
            </div>

            {/* Category Segmented Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {filterTypes.map(f => (
                <button
                  key={f.id}
                  onClick={() => setSelectedTypeFilter(f.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    selectedTypeFilter === f.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Courses List */}
          <div className="space-y-3">
            <div className="text-xs text-slate-500 font-medium px-1">
              دروس ارائه شده برای اخذ ({filteredCourses.length} درس):
            </div>

            {filteredCourses.length === 0 ? (
              <div className="p-10 bg-white rounded-2xl border border-slate-200 text-center text-slate-500 text-xs">
                درسی مطابق با جستجو و فیلترهای شما یافت نشد.
              </div>
            ) : (
              filteredCourses.map(course => {
                const isEnrolled = enrolledCourseIds.includes(course.id);
                const isFull = course.enrolledCount >= course.capacity;

                return (
                  <div
                    key={course.id}
                    className={`p-4 sm:p-5 rounded-2xl bg-white border transition-all ${
                      isEnrolled 
                        ? 'border-teal-500 bg-teal-50/30 ring-1 ring-teal-500/30' 
                        : 'border-slate-200 hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            کد: {course.code}-{course.group}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                            {course.type}
                          </span>
                          <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                            {course.units} واحد
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-slate-900">
                          {course.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                          <span>استاد: <strong>{course.professor}</strong></span>
                          <span>·</span>
                          <span>رشته: <strong>{course.field}</strong></span>
                          {course.prerequisites.length > 0 && (
                            <>
                              <span>·</span>
                              <span className="text-amber-800">پیش‌نیاز: {course.prerequisites.join('، ')}</span>
                            </>
                          )}
                        </div>

                        {/* Class schedule time and room */}
                        <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-slate-600">
                          {course.schedule.map((sc, i) => (
                            <span key={i} className="inline-flex items-center gap-1 bg-slate-100/90 px-2.5 py-1 rounded-md">
                              <Clock className="w-3 h-3 text-slate-500" />
                              <span>{sc.day}‌ها {sc.startTime} تا {sc.endTime}</span>
                              <span className="text-slate-400">({sc.room})</span>
                            </span>
                          ))}
                          
                          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 px-2.5 py-1 rounded-md">
                            <Calendar className="w-3 h-3 text-amber-600" />
                            <span>امتحان: {course.examDate} ({course.examTime})</span>
                          </span>
                        </div>
                      </div>

                      {/* Right Action & Capacity */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        <div className="text-right sm:text-left text-xs">
                          <span className="text-slate-400 block text-[10px]">ظرفیت کلاس:</span>
                          <span className={`font-mono font-bold ${isFull ? 'text-rose-600' : 'text-slate-700'}`}>
                            {course.enrolledCount} / {course.capacity}
                          </span>
                        </div>

                        {isEnrolled ? (
                          <button
                            onClick={() => dropCourse(course.id)}
                            className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors flex items-center gap-1.5 border border-rose-200 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>حذف این درس</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => enrollCourse(course.id)}
                            disabled={isFull}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                              isFull
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                : 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs'
                            }`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>{isFull ? 'ظرفیت تکمیل' : 'اخذ درس'}</span>
                          </button>
                        )}
                      </div>

                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Selected Courses Drawer / Sidebar (1 Col) */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4 sticky top-24">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center font-bold text-xs">
                  {enrolledCourses.length}
                </div>
                <h3 className="font-bold text-slate-900 text-sm">
                  دروس انتخابی شما در این ترم
                </h3>
              </div>
              <span className="text-xs font-bold text-teal-800 font-mono">
                {totalEnrolledUnits} واحد
              </span>
            </div>

            {enrolledCourses.length === 0 ? (
              <div className="text-center py-8 space-y-2 text-slate-400 text-xs">
                <BookOpen className="w-8 h-8 mx-auto text-slate-300" />
                <p>درسی انتخاب نشده است.</p>
                <p className="text-[11px] text-slate-400">برای اخذ درس روی دکمه «اخذ درس» در فهرست مقابل کلیک کنید.</p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
                {enrolledCourses.map((c, idx) => (
                  <div 
                    key={c.id} 
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-xs text-slate-900 leading-snug">
                        {idx + 1}. {c.title}
                      </span>
                      <button
                        onClick={() => dropCourse(c.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors"
                        title="حذف"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>{c.professor}</span>
                      <span className="font-semibold text-teal-800 font-mono">{c.units} واحد</span>
                    </div>

                    <div className="text-[10px] text-slate-400 truncate">
                      {c.schedule.map(s => `${s.day} ${s.startTime}`).join(' · ')}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {enrolledCourses.length > 0 && (
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>مجموع واحدهای ثبت شده:</span>
                  <span className="font-mono text-teal-800">{totalEnrolledUnits} واحد</span>
                </div>
                
                <button
                  onClick={handlePrint}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>چاپ برگه انتخاب واحد</span>
                </button>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* Printable Sheet for Course Registration (Seen only on Print) */}
      <div className="hidden print:block text-right p-8 bg-white text-black space-y-6">
        <div className="text-center border-b-2 border-black pb-4 space-y-1">
          <h2 className="text-lg font-bold">موسسه آموزش عالی غیرانتفاعی سپاهان</h2>
          <h3 className="text-base font-bold">تاییدیه رسمی انتخاب واحد نیمسال اول سال تحصیلی ۱۴۰۳-۱۴۰۴</h3>
          <p className="text-xs">معاونت آموزشی و تحصیلات تکمیلی</p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-xs border border-black p-3">
          <div>نام و نام خانوادگی: <strong>{currentStudent.name}</strong></div>
          <div>شماره دانشجویی: <strong>{currentStudent.studentNumber}</strong></div>
          <div>کد ملی: <strong>{currentStudent.nationalCode}</strong></div>
          <div>رشته تحصیلی: <strong>{currentStudent.field}</strong></div>
          <div>مقطع: <strong>{currentStudent.degree}</strong></div>
          <div>معدل کل: <strong>{currentStudent.gpa}</strong></div>
        </div>

        <table className="w-full border-collapse border border-black text-xs">
          <thead>
            <tr className="bg-slate-200">
              <th className="border border-black p-2">ردیف</th>
              <th className="border border-black p-2">کد درس</th>
              <th className="border border-black p-2">عنوان درس</th>
              <th className="border border-black p-2">واحد</th>
              <th className="border border-black p-2">نوع درس</th>
              <th className="border border-black p-2">استاد درس</th>
              <th className="border border-black p-2">زمان برگزاری کلاس</th>
              <th className="border border-black p-2">تاریخ و ساعت آزمون</th>
            </tr>
          </thead>
          <tbody>
            {enrolledCourses.map((c, i) => (
              <tr key={c.id}>
                <td className="border border-black p-2 text-center">{i + 1}</td>
                <td className="border border-black p-2 text-center">{c.code}-{c.group}</td>
                <td className="border border-black p-2 font-bold">{c.title}</td>
                <td className="border border-black p-2 text-center">{c.units}</td>
                <td className="border border-black p-2 text-center">{c.type}</td>
                <td className="border border-black p-2">{c.professor}</td>
                <td className="border border-black p-2">{c.schedule.map(s => `${s.day} ${s.startTime}-${s.endTime}`).join(' / ')}</td>
                <td className="border border-black p-2 text-center">{c.examDate} ({c.examTime})</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-end pt-8 text-xs">
          <div>مجموع واحدهای تایید شده: <strong>{totalEnrolledUnits} واحد</strong></div>
          <div className="text-center">
            <div>امضا و تایید آموزش دانشگاه:</div>
            <div className="h-12"></div>
            <div>مهر و امضا</div>
          </div>
        </div>
      </div>

    </div>
  );
};
