import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lock, User, KeyRound, X, CheckCircle2, AlertCircle, ArrowLeft, GraduationCap } from 'lucide-react';

export const LoginModal: React.FC = () => {
  const { loginModalOpen, setLoginModalOpen, loginByCredentials, allStudents } = useApp();
  const [studentNumber, setStudentNumber] = useState('');
  const [nationalCode, setNationalCode] = useState('');
  const [error, setError] = useState('');

  if (!loginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!studentNumber.trim()) {
      setError('شماره دانشجویی را وارد کنید.');
      return;
    }

    const success = loginByCredentials(studentNumber, nationalCode);
    if (success) {
      setLoginModalOpen(false);
      setStudentNumber('');
      setNationalCode('');
    } else {
      setError('شماره دانشجویی یا کد ملی وارد شده در سامانه وجود ندارد.');
    }
  };

  const handleQuickDemo = (stdNum: string, natCode: string) => {
    setStudentNumber(stdNum);
    setNationalCode(natCode);
    loginByCredentials(stdNum, natCode);
    setLoginModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-right space-y-5 my-6 relative">
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              ورود به سامانه دانشجویی سپاهان
            </h3>
          </div>
          <button
            onClick={() => setLoginModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800">
              شماره دانشجویی (نام کاربری):
            </label>
            <div className="relative">
              <input
                type="text"
                dir="ltr"
                required
                value={studentNumber}
                onChange={(e) => setStudentNumber(e.target.value)}
                placeholder="مثال: 40121034015"
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 font-mono text-sm"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800">
              کد ملی / رمز عبور:
            </label>
            <div className="relative">
              <input
                type="password"
                dir="ltr"
                value={nationalCode}
                onChange={(e) => setNationalCode(e.target.value)}
                placeholder="۱۰ رقم کد ملی"
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 font-mono text-sm"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>ورود به میز کار دانشجو</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Access */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <div className="text-[11px] font-semibold text-slate-400">
            ورود سریع با دانشجویان نمونه:
          </div>
          <div className="space-y-1.5">
            {allStudents.slice(0, 3).map(std => (
              <button
                key={std.id}
                type="button"
                onClick={() => handleQuickDemo(std.studentNumber, std.nationalCode)}
                className="w-full p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-right text-xs flex items-center justify-between transition-colors cursor-pointer"
              >
                <div>
                  <strong className="text-slate-900 block">{std.name}</strong>
                  <span className="text-[10px] text-slate-500 font-mono">{std.field} · {std.studentNumber}</span>
                </div>
                <span className="text-[10px] text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded">
                  ورود فوری
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
