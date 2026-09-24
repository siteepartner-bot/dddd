import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Shield, 
  CreditCard, 
  Lock, 
  Clock, 
  RefreshCw, 
  CheckCircle2, 
  X, 
  Building2,
  AlertCircle
} from 'lucide-react';

export const BankGatewayModal: React.FC = () => {
  const { 
    gatewayModalOpen, 
    setGatewayModalOpen, 
    pendingPaymentAmount, 
    currentStudent, 
    processPayment 
  } = useApp();

  const [cardNumber, setCardNumber] = useState('6037991823457890');
  const [cvv2, setCvv2] = useState('742');
  const [expMonth, setExpMonth] = useState('08');
  const [expYear, setExpYear] = useState('06');
  const [dynamicOtp, setDynamicOtp] = useState('');
  const [captchaCode, setCaptchaCode] = useState('4829');
  const [captchaInput, setCaptchaInput] = useState('4829');
  const [otpTimer, setOtpTimer] = useState(120);
  const [otpSent, setOtpSent] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedBank, setSelectedBank] = useState<'سامان (سداد)' | 'ملت (به‌پرداخت)' | 'تجارت' | 'ملی'>('سامان (سداد)');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    let interval: any;
    if (otpSent && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, otpTimer]);

  if (!gatewayModalOpen) return null;

  const handleSendOtp = () => {
    setOtpSent(true);
    setOtpTimer(120);
    const mockCode = String(Math.floor(100000 + Math.random() * 900000));
    setDynamicOtp(mockCode);
  };

  const handleRefreshCaptcha = () => {
    const newCap = String(Math.floor(1000 + Math.random() * 9000));
    setCaptchaCode(newCap);
    setCaptchaInput(newCap);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (cardNumber.replace(/\s/g, '').length < 16) {
      setErrorMsg('شماره کارت ۱۶ رقمی نامعتبر است.');
      return;
    }
    if (!cvv2 || cvv2.length < 3) {
      setErrorMsg('کد CVV2 نامعتبر است.');
      return;
    }
    if (!dynamicOtp) {
      setErrorMsg('لطفاً رمز دوم پویا را وارد کنید.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setGatewayModalOpen(false);
      processPayment(pendingPaymentAmount, selectedBank, cardNumber);
    }, 1200);
  };

  const formatCardNumber = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 16);
    return clean.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-slate-50 rounded-3xl max-w-xl w-full border border-slate-300 shadow-2xl overflow-hidden text-right my-6">
        
        {/* Shaparak Official Top Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-teal-400 font-medium">شبکه الکترونیکی پرداخت کارت (شاپرک)</div>
              <div className="text-sm font-bold text-white">درگاه پرداخت اینترنتی به پرداخت / سداد</div>
            </div>
          </div>

          <button
            onClick={() => setGatewayModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Merchant & Order Details Ribbon */}
        <div className="bg-white p-4 sm:p-5 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">پذیرنده:</span>
            <strong className="text-slate-900 font-bold">موسسه غیرانتفاعی سپاهان</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">شماره پذیرنده:</span>
            <span className="font-mono text-slate-700">SEP-948102</span>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <span className="text-slate-400 block text-[11px]">مبلغ قابل پرداخت:</span>
            <span className="font-mono font-black text-sm sm:text-base text-teal-800">
              {pendingPaymentAmount.toLocaleString('fa-IR')} تومان
            </span>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* 16-Digit Card Number */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800">
              شماره کارت بانکی (۱۶ رقم):
            </label>
            <div className="relative">
              <input
                type="text"
                dir="ltr"
                value={formatCardNumber(cardNumber)}
                onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, ''))}
                placeholder="XXXX-XXXX-XXXX-XXXX"
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-mono text-sm tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
              <CreditCard className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* CVV2 and Expiration */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">
                کد شناسایی دوم (CVV2):
              </label>
              <input
                type="password"
                dir="ltr"
                maxLength={4}
                value={cvv2}
                onChange={(e) => setCvv2(e.target.value)}
                placeholder="۳ یا ۴ رقم"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 font-mono text-xs text-center focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">
                تاریخ انقضای کارت:
              </label>
              <div className="flex items-center gap-1.5" dir="ltr">
                <input
                  type="text"
                  maxLength={2}
                  value={expMonth}
                  onChange={(e) => setExpMonth(e.target.value)}
                  placeholder="ماه"
                  className="w-1/2 px-2 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 font-mono text-xs text-center focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
                <span className="text-slate-400 font-bold">/</span>
                <input
                  type="text"
                  maxLength={2}
                  value={expYear}
                  onChange={(e) => setExpYear(e.target.value)}
                  placeholder="سال"
                  className="w-1/2 px-2 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 font-mono text-xs text-center focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>
            </div>
          </div>

          {/* Dynamic OTP (رمز پویا) with Simulator */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800">
                رمز دوم اینترنتی (رمز پویا):
              </label>
              {otpSent && (
                <span className="text-[11px] font-mono text-amber-700">
                  اعتبار: {Math.floor(otpTimer / 60)}:{String(otpTimer % 60).padStart(2, '0')}
                </span>
              )}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                dir="ltr"
                value={dynamicOtp}
                onChange={(e) => setDynamicOtp(e.target.value)}
                placeholder="رمز پیامک شده یا تولید شده"
                className="flex-1 px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 font-mono text-xs text-center focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
              <button
                type="button"
                onClick={handleSendOtp}
                className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition-colors shrink-0 cursor-pointer"
              >
                {otpSent ? 'دریافت مجدد' : 'درخواست رمز پویا'}
              </button>
            </div>

            {otpSent && (
              <div className="p-2 bg-teal-50 border border-teal-200 rounded-lg text-[11px] text-teal-900 flex items-center justify-between">
                <span>کد پویای آزمایشی پیامک شد:</span>
                <strong className="font-mono text-teal-800 text-xs tracking-wider">{dynamicOtp}</strong>
              </div>
            )}
          </div>

          {/* Captcha Security Code */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800">
              کد امنیتی تصویر:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                dir="ltr"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 font-mono text-xs text-center focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
              <div className="bg-slate-200 text-slate-800 font-mono font-black text-sm tracking-widest px-4 py-2 rounded-xl select-none border border-slate-300 line-through">
                {captchaCode}
              </div>
              <button
                type="button"
                onClick={handleRefreshCaptcha}
                className="p-2 rounded-xl hover:bg-slate-200 text-slate-600"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 grid grid-cols-2 gap-3">
            <button
              type="submit"
              disabled={isProcessing}
              className="py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>در حال ارتباط با بانک...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>پرداخت و تایید نهایی</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setGatewayModalOpen(false)}
              className="py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              انصراف و بازگشت
            </button>
          </div>

          <div className="text-center pt-2 text-[10px] text-slate-400">
            تراکنش تحت پروتکل SSL ۲۵۶ بیتی و نظارت مستقیم بانک مرکزی جمهوری اسلامی ایران پردازش می‌گردد.
          </div>

        </form>
      </div>
    </div>
  );
};
