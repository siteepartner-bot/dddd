import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CAMPUS_HERO_IMG, 
  LIBRARY_IMG 
} from '../data/mockData';
import { 
  CreditCard, 
  BookOpen, 
  Calendar, 
  FileText, 
  Bell, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  Building2, 
  Users, 
  BookMarked,
  Info,
  X
} from 'lucide-react';
import { Announcement } from '../types';

export const HomeView: React.FC = () => {
  const { setActiveTab, announcements, currentStudent, financials, totalEnrolledUnits } = useApp();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  const quickServices = [
    {
      title: 'انتخاب واحد و ثبت‌نام',
      description: 'اخذ دروس تخصصی و عمومی، کنترل پیش‌نیازها و تداخل زمانی',
      icon: BookOpen,
      tab: 'registration' as const,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:border-emerald-400',
      badge: `${totalEnrolledUnits} واحد اخذ شده`
    },
    {
      title: 'پرداخت آنلاین شهریه',
      description: 'مشاهده صورت‌حساب مالی، تسویه شهریه ثابت و متغیر با درگاه شتاب',
      icon: CreditCard,
      tab: 'tuition' as const,
      color: 'bg-teal-50 text-teal-700 border-teal-200 hover:border-teal-400',
      badge: financials.remainingBalance > 0 ? `${financials.remainingBalance.toLocaleString('fa-IR')} تومان بدهی` : 'تسویه شده'
    },
    {
      title: 'برنامه هفتگی کلاس‌ها',
      description: 'مشاهده زمان‌بندی روزانه، شماره کلاس، نام استاد و دریافت پرینت',
      icon: Calendar,
      tab: 'schedule' as const,
      color: 'bg-sky-50 text-sky-700 border-sky-200 hover:border-sky-400',
      badge: 'جدول ماتریسی هوشمند'
    },
    {
      title: 'برنامه امتحانات و کارت آزمون',
      description: 'جدول تاریخ امتحانات پایان‌ترم و صدور کارت ورود به جلسه آزمون',
      icon: FileText,
      tab: 'exams' as const,
      color: 'bg-amber-50 text-amber-700 border-amber-200 hover:border-amber-400',
      badge: 'کارت ورود عکس‌دار'
    }
  ];

  const academicDates = [
    { title: 'شروع انتخاب واحد نیمسال', date: '۲۰ شهریور ۱۴۰۳', status: 'پایان یافته' },
    { title: 'آغاز رسمی کلاس‌های آموزشی', date: '۱ مهر ۱۴۰۳', status: 'در حال برگزاری' },
    { title: 'بازه حذف و اضافه دروس', date: '۸ الی ۱۲ مهر ۱۴۰۳', status: 'پایان یافته' },
    { title: 'مهلت تسویه شهریه متغیر', date: '۱۵ آذر ۱۴۰۳', status: 'فعال' },
    { title: 'شروع امتحانات پایان‌نیمسال', date: '۱۵ دی ۱۴۰۳', status: 'پیش‌رو' },
  ];

  return (
    <div className="space-y-10 pb-12">
      
      {/* Hero Banner with Campus Architectural Imagery */}
      <section className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900 text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src={CAMPUS_HERO_IMG} 
            alt="پردیس دانشگاه غیرانتفاعی سپاهان" 
            className="w-full h-full object-cover object-center opacity-35 scale-105 transition-transform duration-1000 ease-out"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent" />
        </div>

        <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-3xl space-y-6 text-right">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>نیمسال تحصیلی اول ۱۴۰۳ - ۱۴۰۴</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight sm:leading-snug text-white">
            موسسه آموزش عالی غیرانتفاعی سپاهان
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
            سامانه جامع خدمات دانشجویی، انتخاب واحد آنلاین، امور مالی و پرداخت الکترونیکی شهریه، مدیریت برنامه هفتگی کلاس‌ها و صدور کارت ورود به جلسه امتحانات.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className="px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>ورود به میز کار دانشجو</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button 
              onClick={() => setActiveTab('registration')}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold backdrop-blur-sm border border-white/20 transition-all cursor-pointer"
            >
              سامانه انتخاب واحد
            </button>
          </div>

          <div className="pt-4 flex items-center gap-4 text-xs text-slate-300 border-t border-white/10">
            <span>دانشجوی فعال: <strong>{currentStudent.name}</strong></span>
            <span>·</span>
            <span>رشته: <strong>{currentStudent.field}</strong></span>
            <span>·</span>
            <span>ترم: <strong>{currentStudent.currentTerm}</strong></span>
          </div>
        </div>
      </section>

      {/* 4 Core Quick Action Services (Requested Features) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1 text-right">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              خدمات کلیدی سامانه دانشگاه
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              دسترسی سریع به بخش‌های اصلی پورتال آموزشی و دانشجویی
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickServices.map((service, idx) => (
            <div 
              key={idx}
              onClick={() => setActiveTab(service.tab)}
              className="group p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between text-right relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${service.color} transition-transform group-hover:scale-105`}>
                    <service.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                    {service.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-700 group-hover:text-teal-800">
                <span>ورود به این بخش</span>
                <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Announcements & Academic Calendar Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Important Announcements (2 cols) */}
        <div className="lg:col-span-2 space-y-4 text-right">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                اطلاعیه‌ها و اخبار مهم دانشگاه
              </h3>
            </div>
          </div>

          <div className="space-y-3">
            {announcements.map(item => (
              <div
                key={item.id}
                onClick={() => setSelectedAnnouncement(item)}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    {item.isImportant && (
                      <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 font-medium text-[11px]">
                        مهم و فوری
                      </span>
                    )}
                    <span className="font-medium text-slate-500">{item.category}</span>
                  </div>
                  <span className="text-slate-400 text-[11px]">{item.date}</span>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  {item.title}
                </h4>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>
                
                <div className="pt-1 flex items-center gap-1 text-xs text-teal-700 font-medium">
                  <span>مشاهده متن کامل اطلاعیه</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Calendar Timeline (1 col) */}
        <div className="space-y-4 text-right">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              تقویم و رویدادهای آموزشی
            </h3>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="relative pl-2 space-y-4 before:absolute before:right-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
              {academicDates.map((d, i) => (
                <div key={i} className="relative pr-7 space-y-1">
                  <div className={`absolute right-1 top-1.5 w-3 h-3 rounded-full border-2 bg-white ${
                    d.status === 'فعال' || d.status === 'در حال برگزاری' 
                      ? 'border-teal-600 bg-teal-600 ring-4 ring-teal-100' 
                      : d.status === 'پایان یافته' 
                      ? 'border-slate-400 bg-slate-400' 
                      : 'border-slate-300'
                  }`} />
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{d.title}</span>
                    <span className="text-[10px] text-slate-400">{d.status}</span>
                  </div>
                  <div className="text-xs text-teal-800 font-medium">
                    {d.date}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100">
              <button 
                onClick={() => setActiveTab('schedule')}
                className="w-full py-2 px-3 text-center text-xs font-semibold text-teal-700 bg-teal-50 rounded-xl hover:bg-teal-100 transition-colors"
              >
                مشاهده برنامه هفتگی و زمان‌بندی
              </button>
            </div>
          </div>
        </div>

      </section>

      {/* University Highlights & Facilities */}
      <section className="rounded-3xl p-6 sm:p-8 bg-slate-100/80 border border-slate-200 text-right space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600">
              <Building2 className="w-4 h-4 text-teal-600" />
              <span>پردیس و امکانات آموزشی سپاهان</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              محیطی مجهز، پویا و استاندارد برای رشد علمی دانشجویان
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              موسسه آموزش عالی غیرانتفاعی سپاهان مجهز به مدرن‌ترین آزمایشگاه‌های شبکه و سخت‌افزار، آتلیه‌های تخصصی طراحی و معماری، کتابخانه مرکزی با بیش از ۲۰ هزار جلد کتب مرجع، سایت‌های کامپیوتری و سالن‌های ورزشی چندمنظوره می‌باشد.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-center">
                <span className="block text-lg font-extrabold text-teal-800 font-mono">۴۵+</span>
                <span className="text-[11px] text-slate-500">عضو هیئت علمی</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-center">
                <span className="block text-lg font-extrabold text-teal-800 font-mono">۱۸</span>
                <span className="text-[11px] text-slate-500">رشته و گرایش فعال</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-center">
                <span className="block text-lg font-extrabold text-teal-800 font-mono">۹۸٪</span>
                <span className="text-[11px] text-slate-500">رضایت آموزشی</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200 aspect-4/3 relative">
            <img 
              src={LIBRARY_IMG} 
              alt="کتابخانه و سالن مطالعه موسسه سپاهان"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent text-white text-xs">
              <span>کتابخانه مرکزی و سالن مطالعه تخصصی شیخ بهایی</span>
            </div>
          </div>

        </div>
      </section>

      {/* Announcement Detail Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4 text-right">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800">
                  {selectedAnnouncement.category}
                </span>
                <span className="text-xs text-slate-400">{selectedAnnouncement.date}</span>
              </div>
              <button 
                onClick={() => setSelectedAnnouncement(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              {selectedAnnouncement.title}
            </h3>

            <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line py-2">
              {selectedAnnouncement.content}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800"
              >
                متوجه شدم و بستن
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
