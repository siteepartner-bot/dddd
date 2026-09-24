import React, { useState } from 'react';
import { useApp, AppTab } from '../context/AppContext';
import { 
  GraduationCap, 
  Menu, 
  X, 
  CreditCard, 
  BookOpen, 
  Calendar, 
  FileText, 
  Award, 
  UserCheck, 
  Layers,
  ChevronDown,
  Database,
  LogIn
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    currentStudent, 
    allStudents, 
    switchStudent,
    setLoginModalOpen 
  } = useApp();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [studentDropdownOpen, setStudentDropdownOpen] = useState(false);

  const navItems: { id: AppTab; label: string; icon: any }[] = [
    { id: 'home', label: 'صفحه اصلی', icon: GraduationCap },
    { id: 'dashboard', label: 'میز کار دانشجو', icon: Layers },
    { id: 'registration', label: 'انتخاب واحد', icon: BookOpen },
    { id: 'tuition', label: 'پرداخت شهریه', icon: CreditCard },
    { id: 'schedule', label: 'برنامه هفتگی', icon: Calendar },
    { id: 'exams', label: 'امتحانات', icon: FileText },
    { id: 'transcript', label: 'کارنامه', icon: Award },
    { id: 'admin', label: 'ورود اطلاعات دانشگاه', icon: Database },
  ];

  const handleNavClick = (tab: AppTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 text-right group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-lg p-1 cursor-pointer"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-900 text-teal-400 flex items-center justify-center font-bold shadow-sm group-hover:bg-teal-900 transition-colors shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-teal-800 transition-colors whitespace-nowrap">
                  موسسه آموزش عالی غیرانتفاعی سپاهان
                </span>
                <span className="text-[11px] text-slate-700 hidden sm:inline">
                  سامانه خدمات آموزشی و دانشجویی
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-600">
            {navItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                    isActive 
                      ? 'text-teal-700 bg-teal-50 font-semibold shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions (Login & Student Switcher) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Login Button */}
            <button
              onClick={() => setLoginModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>ورود دانشجو</span>
            </button>

            {/* Student Dropdown */}
            <div className="relative">
              <button
                onClick={() => setStudentDropdownOpen(!studentDropdownOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl transition-colors text-right border border-slate-200/80 cursor-pointer"
                title="تغییر مشخصات و رشته دانشجو"
              >
                <img 
                  src={currentStudent.avatarUrl} 
                  alt={currentStudent.name} 
                  className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-300"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="hidden md:flex flex-col text-right leading-tight max-w-[140px]">
                  <span className="text-xs font-semibold text-slate-900 truncate">
                    {currentStudent.name}
                  </span>
                  <span className="text-[10px] text-slate-700 truncate">
                    {currentStudent.field}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-700 hidden sm:block" />
              </button>

              {studentDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-30"
                    onClick={() => setStudentDropdownOpen(false)}
                  />
                  <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 z-40 py-2 text-right">
                    <div className="px-4 py-2 border-b border-slate-100 bg-slate-50/70">
                      <div className="text-xs font-bold text-slate-800">حساب کاربری فعال</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">شماره دانشجویی: {currentStudent.studentNumber}</div>
                      <div className="text-[11px] text-teal-700 font-medium mt-0.5">معدل کل: {currentStudent.gpa} (سقف: {currentStudent.maxUnits} واحد)</div>
                    </div>

                    <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400">
                      تغییر پروفایل (شبیه‌ساز رشته‌ها):
                    </div>

                    {allStudents.map(student => (
                      <button
                        key={student.id}
                        onClick={() => {
                          switchStudent(student.id);
                          setStudentDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-right flex items-center justify-between hover:bg-slate-50 text-xs transition-colors cursor-pointer ${
                          currentStudent.id === student.id ? 'bg-teal-50/60 font-semibold text-teal-800' : 'text-slate-700'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span>{student.name}</span>
                          <span className="text-[10px] text-slate-400">{student.field} · ترم {student.currentTerm}</span>
                        </div>
                        {currentStudent.id === student.id && (
                          <UserCheck className="w-4 h-4 text-teal-600 shrink-0" />
                        )}
                      </button>
                    ))}

                    <div className="pt-2 mt-1 border-t border-slate-100 px-3 space-y-1">
                      <button
                        onClick={() => {
                          setActiveTab('admin');
                          setStudentDropdownOpen(false);
                        }}
                        className="w-full py-1.5 text-center text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                      >
                        + ورود اطلاعات اکسل / دانشجوی جدید
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Mobile menu hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none cursor-pointer"
              aria-label="منوی ناوبری"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="px-3 py-2 mb-2 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
            <div className="text-xs">
              <span className="font-bold text-slate-900 block">{currentStudent.name}</span>
              <span className="text-slate-500 text-[11px]">{currentStudent.field} - ترم {currentStudent.currentTerm}</span>
            </div>
            <button
              onClick={() => setLoginModalOpen(true)}
              className="text-xs text-teal-700 font-semibold px-2 py-1 bg-teal-50 rounded-lg hover:bg-teal-100"
            >
              ورود با شماره دانشجویی
            </button>
          </div>

          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-teal-50 text-teal-800 font-semibold' 
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
