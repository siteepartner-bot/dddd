import React from 'react';
import { useApp } from '../context/AppContext';
import { PaymentTransaction } from '../types';
import { X, Printer, CheckCircle2, ShieldCheck, QrCode, GraduationCap } from 'lucide-react';

export const ReceiptModal: React.FC = () => {
  const { lastReceipt, setLastReceipt, currentStudent } = useApp();

  if (!lastReceipt) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-right space-y-6 my-6 relative">
        
        {/* Top Header (no-print) */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 no-print">
          <div className="flex items-center gap-2 text-emerald-700">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-bold text-slate-900 text-sm">
              رسید دیجیتال پرداخت الکترونیکی
            </span>
          </div>
          <button
            onClick={() => setLastReceipt(null)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Official Printable Receipt Card */}
        <div className="printable-card border-2 border-slate-800 rounded-2xl p-6 bg-white text-slate-900 space-y-4">
          
          {/* Header */}
          <div className="text-center border-b border-slate-300 pb-3 space-y-1">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-teal-400 flex items-center justify-center mx-auto font-bold mb-1">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900">
              موسسه آموزش عالی غیرانتفاعی سپاهان
            </h2>
            <div className="text-xs text-slate-500 font-medium">
              قبض رسمی دریافت وجه و شهریه تحصیلی
            </div>
          </div>

          {/* Amount Badge */}
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-1">
            <span className="text-[11px] text-emerald-800 block">مبلغ واریز شده:</span>
            <div className="text-xl font-black font-mono text-emerald-700">
              {lastReceipt.amount.toLocaleString('fa-IR')} تومان
            </div>
            <span className="text-[10px] text-emerald-600">وضعیت: پرداخت موفق و ثبت در پرونده مالی</span>
          </div>

          {/* Details Table */}
          <div className="space-y-2 text-xs divide-y divide-slate-100">
            <div className="flex justify-between py-1.5 text-slate-600">
              <span>نام پرداخت‌کننده:</span>
              <strong className="text-slate-900">{currentStudent.name}</strong>
            </div>
            <div className="flex justify-between py-1.5 text-slate-600">
              <span>شماره دانشجویی:</span>
              <span className="font-mono font-bold text-slate-900">{currentStudent.studentNumber}</span>
            </div>
            <div className="flex justify-between py-1.5 text-slate-600">
              <span>رشته و مقطع:</span>
              <span className="text-slate-900">{currentStudent.field} ({currentStudent.degree})</span>
            </div>
            <div className="flex justify-between py-1.5 text-slate-600">
              <span>کد رهگیری دانشگاه:</span>
              <span className="font-mono font-bold text-teal-800">{lastReceipt.trackingCode}</span>
            </div>
            <div className="flex justify-between py-1.5 text-slate-600">
              <span>شماره مرجع بانکی (RefID):</span>
              <span className="font-mono text-slate-700">{lastReceipt.refId}</span>
            </div>
            <div className="flex justify-between py-1.5 text-slate-600">
              <span>تاریخ و ساعت تراکنش:</span>
              <span className="font-mono text-slate-700">{lastReceipt.date}</span>
            </div>
            <div className="flex justify-between py-1.5 text-slate-600">
              <span>درگاه بانکی عامل:</span>
              <span className="text-slate-900">{lastReceipt.bankGateway}</span>
            </div>
            <div className="flex justify-between py-1.5 text-slate-600">
              <span>شماره کارت پرداخت:</span>
              <span className="font-mono text-slate-700">{lastReceipt.cardNumberMasked}</span>
            </div>
          </div>

          {/* Seal / Signature */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1 text-teal-800">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>تایید شده توسط خزانه‌داری موسسه</span>
            </div>
            <div className="font-mono text-[10px] text-slate-400">
              SEP-VERIFIED-{lastReceipt.refId.slice(-6)}
            </div>
          </div>

        </div>

        {/* Modal Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2 no-print">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>چاپ رسید (Print)</span>
          </button>
          <button
            onClick={() => setLastReceipt(null)}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            بستن پنجره
          </button>
        </div>

      </div>
    </div>
  );
};
