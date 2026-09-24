import React from 'react';
import { useApp, AppTab } from '../context/AppContext';
import { GraduationCap, BookOpen, CreditCard, Calendar, FileText } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const navItems: { id: AppTab; label: string; icon: any }[] = [
    { id: 'home', label: 'خانه', icon: GraduationCap },
    { id: 'registration', label: 'انتخاب واحد', icon: BookOpen },
    { id: 'tuition', label: 'شهریه', icon: CreditCard },
    { id: 'schedule', label: 'برنامه هفتگی', icon: Calendar },
    { id: 'exams', label: 'امتحانات', icon: FileText },
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 lg:hidden no-print shadow-lg pb-safe">
      <div className="grid grid-cols-5 h-16">
        {navItems.map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${
                isActive ? 'text-teal-700 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-teal-700 stroke-[2.5]' : 'text-slate-400'}`} />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
