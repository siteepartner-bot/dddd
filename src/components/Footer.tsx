import React from 'react';
import { useApp } from '../context/AppContext';
import { GraduationCap, MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800 text-right">
          
          {/* Column 1: Institute About */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-white font-bold text-base">
                موسسه آموزش عالی سپاهان
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              موسسه آموزش عالی غیرانتفاعی و غیردولتی سپاهان با مجوز رسمی از وزارت علوم، تحقیقات و فناوری، ارائه‌دهنده دوره‌های کارشناسی و کارشناسی ارشد در رشته‌های فنی، مهندسی، هنر و علوم انسانی.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-400/90 pt-1">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>دارای تاییدیه رسمی از وزارت علوم و سازمان سنجش</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">
              دسترسی سریع به سامانه‌ها
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => setActiveTab('registration')} 
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-teal-400">›</span> سامانه انتخاب واحد و ثبت نام
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('tuition')} 
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-teal-400">›</span> درگاه پرداخت آنلاین شهریه
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('schedule')} 
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-teal-400">›</span> جدول برنامه هفتگی کلاس‌ها
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('exams')} 
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-teal-400">›</span> برنامه امتحانات و دریافت کارت آزمون
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('transcript')} 
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-teal-400">›</span> مشاهده کارنامه و معدل کل
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Working Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">
              ساعات پاسخگویی اداری
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-200 block font-medium">شنبه تا چهارشنبه:</span>
                  <span>۰۸:۰۰ الی ۱۶:۰۰ (پاسخگویی حضوری و تلفنی)</span>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-200 block font-medium">پنج‌شنبه‌ها:</span>
                  <span>۰۸:۰۰ الی ۱۲:۳۰ (امور آموزش و کلاس‌های ارشد)</span>
                </div>
              </div>
              <div className="text-[11px] text-slate-500 pt-1">
                * سامانه‌های الکترونیکی و پرداخت آنلاین به صورت ۲۴ ساعته فعال هستند.
              </div>
            </div>
          </div>

          {/* Column 4: Contact and Address */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">
              اطلاعات تماس و نشانی
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>اصفهان، بزرگراه دانشگاه، خیابان سپاهان، پردیس موسسه آموزش عالی غیرانتفاعی سپاهان</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span dir="ltr">031 - 3669 0000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span dir="ltr">info@sepahan.ac.ir</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 text-center sm:text-right">
          <p>
            © {new Date().getFullYear()} کلیه حقوق این سامانه متعلق به موسسه آموزش عالی غیرانتفاعی سپاهان می‌باشد.
          </p>
          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <span>سامانه مروارید آموزش</span>
            <span>·</span>
            <span>پشتیبانی فنی: ۳۶۶۹۰۰۱۰ - ۰۳۱</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
