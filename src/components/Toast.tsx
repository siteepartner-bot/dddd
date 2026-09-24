import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-teal-600 shrink-0" />
  };

  const colors = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-950',
    error: 'bg-rose-50 border-rose-200 text-rose-950',
    info: 'bg-teal-50 border-teal-200 text-teal-950'
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full px-4 no-print animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className={`p-4 rounded-2xl border shadow-xl flex items-center gap-3 text-right ${colors[toast.type]}`}>
        {icons[toast.type]}
        <div className="text-xs font-semibold flex-1 leading-relaxed">
          {toast.message}
        </div>
      </div>
    </div>
  );
};
