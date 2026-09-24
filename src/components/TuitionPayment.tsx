import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CreditCard, 
  DollarSign, 
  ShieldCheck, 
  Receipt, 
  ArrowUpRight, 
  Printer, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Building,
  ChevronLeft
} from 'lucide-react';
import { PaymentTransaction } from '../types';

export const TuitionPayment: React.FC = () => {
  const { 
    currentStudent, 
    financials, 
    transactions, 
    totalEnrolledUnits, 
    enrolledCourses,
    setGatewayModalOpen,
    setPendingPaymentAmount,
    setLastReceipt
  } = useApp();

  const [paymentAmountInput, setPaymentAmountInput] = useState<number>(() => {
    return financials.remainingBalance > 0 ? financials.remainingBalance : 1000000;
  });

  const [selectedBank, setSelectedBank] = useState<'سامان (سداد)' | 'ملت (به‌پرداخت)' | 'تجارت' | 'ملی'>('سامان (سداد)');

  const handleStartPayment = (amount: number) => {
    if (amount <= 0) return;
    setPendingPaymentAmount(amount);
    setGatewayModalOpen(true);
  };

  const handlePrintTransactions = () => {
    window.print();
  };

  const banks = [
    { id: 'سامان (سداد)', name: 'بانک سامان (درگاه سداد)', desc: 'تراکنش آنی و تسویه سریع' },
    { id: 'ملت (به‌پرداخت)', name: 'بانک ملت (به‌پرداخت)', desc: 'پشتیبانی از کلیه کارت‌های عضو شتاب' },
    { id: 'تجارت', name: 'بانک تجارت', desc: 'درگاه رسمی پرداخت شهریه' },
    { id: 'ملی', name: 'بانک ملی ایران (سداد)', desc: 'درگاه پرداخت دولتی' }
  ];

  return (
    <div className="space-y-8 pb-12 text-right">
      
      {/* Header Banner */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 no-print">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                <CreditCard className="w-5 h-5" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                سامانه امور مالی و پرداخت الکترونیکی شهریه
              </h1>
            </div>
            <p className="text-xs text-slate-500">
              نیمسال اول سال تحصیلی ۱۴۰۳-۱۴۰۴ · موسسه آموزش عالی غیرانتفاعی سپاهان
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintTransactions}
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>چاپ صورت‌حساب مالی</span>
            </button>
          </div>
        </div>

        {/* Financial Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
            <span className="text-xs text-slate-500">شهریه ثابت مصوب:</span>
            <div className="text-lg font-black text-slate-900 font-mono">
              {financials.fixedTuition.toLocaleString('fa-IR')} <span className="text-xs font-normal text-slate-500">تومان</span>
            </div>
            <span className="text-[10px] text-slate-400 block">پایه ثبت‌نام نیمسال</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
            <span className="text-xs text-slate-500">شهریه متغیر ({totalEnrolledUnits} واحد):</span>
            <div className="text-lg font-black text-slate-900 font-mono">
              {financials.variableTuition.toLocaleString('fa-IR')} <span className="text-xs font-normal text-slate-500">تومان</span>
            </div>
            <span className="text-[10px] text-slate-400 block">محاسبه بر اساس دروس اخذ شده</span>
          </div>

          <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 space-y-1">
            <span className="text-xs text-emerald-800">مجموع پرداختی‌های موفق:</span>
            <div className="text-lg font-black text-emerald-700 font-mono">
              {financials.totalPaid.toLocaleString('fa-IR')} <span className="text-xs font-normal text-emerald-800">تومان</span>
            </div>
            <span className="text-[10px] text-emerald-700 block">{transactions.filter(t => t.status === 'موفق').length} تراکنش ثبت شده</span>
          </div>

          <div className={`p-4 rounded-2xl border space-y-1 ${
            financials.remainingBalance > 0 
              ? 'bg-rose-50/80 border-rose-200 text-rose-900' 
              : 'bg-teal-50 border-teal-200 text-teal-900'
          }`}>
            <span className="text-xs font-medium">مانده بدهی قابل پرداخت:</span>
            <div className="text-lg font-black font-mono">
              {financials.remainingBalance > 0 
                ? `${financials.remainingBalance.toLocaleString('fa-IR')} تومان` 
                : '۰ تومان (تسویه کامل)'}
            </div>
            <span className="text-[10px] opacity-80 block">
              {financials.remainingBalance > 0 ? 'جهت مجاز شدن کارت آزمون تسویه نمایید' : 'وضعیت مالی کاملاً مجاز است'}
            </span>
          </div>

        </div>
      </section>

      {/* Payment Action & Breakdown Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Payment Portal Action Card (1 Col) */}
        <div className="space-y-4 no-print">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                پرداخت آنلاین از درگاه شتاب
              </h3>
            </div>

            {/* Amount Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                مبلغ پرداختی (تومان):
              </label>
              
              <div className="relative">
                <input 
                  type="number"
                  value={paymentAmountInput || ''}
                  onChange={(e) => setPaymentAmountInput(Number(e.target.value))}
                  placeholder="مبلغ مورد نظر به تومان"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
                <span className="absolute left-3 top-2.5 text-xs text-slate-400">تومان</span>
              </div>

              {/* Quick Amount Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {financials.remainingBalance > 0 && (
                  <button
                    type="button"
                    onClick={() => setPaymentAmountInput(financials.remainingBalance)}
                    className="px-2.5 py-1 text-[11px] rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors font-medium cursor-pointer"
                  >
                    کل بدهی ({financials.remainingBalance.toLocaleString('fa-IR')})
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setPaymentAmountInput(financials.fixedTuition)}
                  className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors font-medium cursor-pointer"
                >
                  شهریه ثابت
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentAmountInput(2000000)}
                  className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors font-medium cursor-pointer"
                >
                  ۲,۰۰۰,۰۰۰ تومان
                </button>
              </div>
            </div>

            {/* Gateway Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                انتخاب درگاه پرداخت بانکی:
              </label>
              <div className="space-y-2">
                {banks.map((b) => (
                  <label
                    key={b.id}
                    onClick={() => setSelectedBank(b.id as any)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                      selectedBank === b.id 
                        ? 'border-teal-600 bg-teal-50/60 font-semibold text-teal-900' 
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        selectedBank === b.id ? 'border-teal-600 bg-teal-600' : 'border-slate-300'
                      }`}>
                        {selectedBank === b.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <span>{b.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{b.desc}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Payment CTA */}
            <div className="pt-2">
              <button
                onClick={() => handleStartPayment(paymentAmountInput)}
                disabled={paymentAmountInput <= 0}
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                <span>انتقال به درگاه امن شاپرک</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div className="text-center pt-2 text-[11px] text-slate-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                <span>اتصال به بستر امن پرداخت الکترونیک شاپرک</span>
              </div>
            </div>

          </div>
        </div>

        {/* Detailed Financial Breakdown & Invoices (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Tuition Calculation Breakdown */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                تفکیک شهریه دروس انتخابی ترم جاری
              </h3>
              <span className="text-xs text-slate-500">
                مجموع: {totalEnrolledUnits} واحد
              </span>
            </div>

            {enrolledCourses.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-400">
                درسی برای محاسبه شهریه متغیر انتخاب نشده است.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="p-2.5 font-semibold">عنوان درس</th>
                      <th className="p-2.5 font-semibold">تعداد واحد</th>
                      <th className="p-2.5 font-semibold">نوع درس</th>
                      <th className="p-2.5 font-semibold">شهریه هر واحد</th>
                      <th className="p-2.5 font-semibold">جمع شهریه متغیر</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {enrolledCourses.map(course => (
                      <tr key={course.id}>
                        <td className="p-2.5 font-bold text-slate-900">{course.title}</td>
                        <td className="p-2.5 font-mono">{course.units}</td>
                        <td className="p-2.5 text-slate-500">{course.type}</td>
                        <td className="p-2.5 font-mono">{course.tuitionPerUnit.toLocaleString('fa-IR')} تومان</td>
                        <td className="p-2.5 font-mono font-bold text-slate-800">
                          {(course.units * course.tuitionPerUnit).toLocaleString('fa-IR')} تومان
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-slate-50 font-bold text-slate-900 border-t border-slate-200">
                      <td colSpan={4} className="p-2.5 text-left">مجموع شهریه متغیر دروس:</td>
                      <td className="p-2.5 font-mono text-teal-800">
                        {financials.variableTuition.toLocaleString('fa-IR')} تومان
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Payment Transactions History */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-teal-700" />
                <h3 className="font-bold text-slate-900 text-base">
                  سوابق و رسیدهای پرداخت الکترونیکی
                </h3>
              </div>
              <span className="text-xs text-slate-400">
                {transactions.length} تراکنش ثبت شده
              </span>
            </div>

            {transactions.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                هنوز تراکنشی در سامانه ثبت نشده است.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="p-3 font-semibold">تاریخ و زمان</th>
                      <th className="p-3 font-semibold">مبلغ پرداختی</th>
                      <th className="p-3 font-semibold">کد پیگیری دانشگاه</th>
                      <th className="p-3 font-semibold">شماره مرجع بانکی</th>
                      <th className="p-3 font-semibold">درگاه پرداخت</th>
                      <th className="p-3 font-semibold">وضعیت</th>
                      <th className="p-3 font-semibold no-print">رسید</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {transactions.map(tx => (
                      <tr key={tx.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-3 font-mono">{tx.date}</td>
                        <td className="p-3 font-bold font-mono text-slate-900">
                          {tx.amount.toLocaleString('fa-IR')} تومان
                        </td>
                        <td className="p-3 font-mono text-teal-800 font-bold">{tx.trackingCode}</td>
                        <td className="p-3 font-mono text-slate-500">{tx.refId}</td>
                        <td className="p-3">{tx.bankGateway}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-[11px] bg-emerald-50 text-emerald-700 font-medium">
                            {tx.status}
                          </span>
                        </td>
                        <td className="p-3 no-print">
                          <button
                            onClick={() => setLastReceipt(tx)}
                            className="text-teal-700 hover:text-teal-900 font-semibold text-xs underline cursor-pointer"
                          >
                            مشاهده رسید
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Printable Financial Statement for Physical Records */}
      <div className="hidden print:block text-right p-8 bg-white text-black space-y-6">
        <div className="text-center border-b-2 border-black pb-4 space-y-1">
          <h2 className="text-lg font-bold">موسسه آموزش عالی غیرانتفاعی سپاهان</h2>
          <h3 className="text-base font-bold">صورت‌حساب مالی رسمی و سوابق پرداخت دانشجو</h3>
          <p className="text-xs">امور مالی و حسابداری شهریه</p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-xs border border-black p-3">
          <div>نام دانشجو: <strong>{currentStudent.name}</strong></div>
          <div>شماره دانشجویی: <strong>{currentStudent.studentNumber}</strong></div>
          <div>رشته: <strong>{currentStudent.field}</strong></div>
          <div>شهریه ثابت: <strong>{financials.fixedTuition.toLocaleString('fa-IR')} تومان</strong></div>
          <div>شهریه متغیر: <strong>{financials.variableTuition.toLocaleString('fa-IR')} تومان</strong></div>
          <div>مانده بدهی: <strong>{financials.remainingBalance.toLocaleString('fa-IR')} تومان</strong></div>
        </div>

        <h4 className="text-xs font-bold pt-2">لیست تراکنش‌های پرداخت شده:</h4>
        <table className="w-full border-collapse border border-black text-xs">
          <thead>
            <tr className="bg-slate-200">
              <th className="border border-black p-2">ردیف</th>
              <th className="border border-black p-2">تاریخ</th>
              <th className="border border-black p-2">مبلغ (تومان)</th>
              <th className="border border-black p-2">کد پیگیری</th>
              <th className="border border-black p-2">شماره مرجع</th>
              <th className="border border-black p-2">درگاه</th>
              <th className="border border-black p-2">وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, i) => (
              <tr key={tx.id}>
                <td className="border border-black p-2 text-center">{i + 1}</td>
                <td className="border border-black p-2 text-center">{tx.date}</td>
                <td className="border border-black p-2 text-center font-bold">{tx.amount.toLocaleString('fa-IR')}</td>
                <td className="border border-black p-2 text-center font-mono">{tx.trackingCode}</td>
                <td className="border border-black p-2 text-center font-mono">{tx.refId}</td>
                <td className="border border-black p-2 text-center">{tx.bankGateway}</td>
                <td className="border border-black p-2 text-center">{tx.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-end pt-8 text-xs">
          <div>مجموع پرداختی‌های تایید شده: <strong>{financials.totalPaid.toLocaleString('fa-IR')} تومان</strong></div>
          <div className="text-center">
            <div>امور مالی و خزانه‌داری موسسه آموزش عالی سپاهان</div>
            <div className="h-12"></div>
            <div>مهر و امضا</div>
          </div>
        </div>
      </div>

    </div>
  );
};
