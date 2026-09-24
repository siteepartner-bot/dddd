import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StudentProfile, StudyField } from '../types';
import { 
  Database, 
  Upload, 
  FileSpreadsheet, 
  UserPlus, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  BookOpen, 
  HelpCircle,
  Copy,
  Server,
  Layers,
  KeyRound
} from 'lucide-react';

export const AdminImportView: React.FC = () => {
  const { allStudents, importStudentsBatch, addNewStudent, exportDatabaseBackup, showToast } = useApp();
  
  const [activeSubTab, setActiveSubTab] = useState<'guide' | 'excel' | 'single' | 'list'>('guide');
  const [jsonInput, setJsonInput] = useState('');
  const [csvInput, setCsvInput] = useState('');

  // Single student form state
  const [newStudent, setNewStudent] = useState({
    name: '',
    studentNumber: '',
    nationalCode: '',
    field: 'مهندسی کامپیوتر' as StudyField,
    degree: 'کارشناسی پیوسته' as const,
    entryYear: '1402',
    currentTerm: 3,
    status: 'در حال تحصیل' as const,
    maxUnits: 20,
    minUnits: 12,
    gpa: 16.5,
    passedUnits: 36,
    advisor: 'دکتر محمدرضا صادقی',
    phone: '',
    email: ''
  });

  const handleSingleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.studentNumber) {
      showToast('لطفاً نام و شماره دانشجویی را وارد کنید.', 'error');
      return;
    }
    const success = addNewStudent({
      ...newStudent,
      avatarUrl: ''
    });
    if (success) {
      setNewStudent({
        name: '',
        studentNumber: '',
        nationalCode: '',
        field: 'مهندسی کامپیوتر',
        degree: 'کارشناسی پیوسته',
        entryYear: '1402',
        currentTerm: 3,
        status: 'در حال تحصیل',
        maxUnits: 20,
        minUnits: 12,
        gpa: 16.5,
        passedUnits: 36,
        advisor: 'دکتر محمدرضا صادقی',
        phone: '',
        email: ''
      });
      setActiveSubTab('list');
    }
  };

  // CSV parser helper
  const handleImportCSV = () => {
    try {
      const lines = csvInput.trim().split('\n');
      if (lines.length === 0) return;

      const parsedStudents: Partial<StudentProfile>[] = [];

      lines.forEach((line, index) => {
        // Skip header if contains 'نام' or 'name'
        if (index === 0 && (line.includes('نام') || line.toLowerCase().includes('name'))) return;

        const parts = line.split(/[,;\t]/).map(p => p.trim());
        if (parts.length >= 2) {
          const [name, studentNumber, nationalCode, field, term, gpa] = parts;
          parsedStudents.push({
            name,
            studentNumber,
            nationalCode: nationalCode || '0000000000',
            field: (field as StudyField) || 'مهندسی کامپیوتر',
            currentTerm: Number(term) || 1,
            gpa: Number(gpa) || 16.0
          });
        }
      });

      if (parsedStudents.length === 0) {
        showToast('فرمت داده‌های CSV نامعتبر است.', 'error');
        return;
      }

      importStudentsBatch(parsedStudents);
      setCsvInput('');
      setActiveSubTab('list');
    } catch (err) {
      showToast('خطا در پردازش فایل یا متن CSV.', 'error');
    }
  };

  const handleImportJSON = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const list = Array.isArray(parsed) ? parsed : parsed.students;
      if (!Array.isArray(list)) {
        showToast('فرمت JSON باید شامل یک آرایه از دانشجویان باشد.', 'error');
        return;
      }
      importStudentsBatch(list);
      setJsonInput('');
      setActiveSubTab('list');
    } catch (err) {
      showToast('ساختار JSON نامعتبر است.', 'error');
    }
  };

  const sampleCsvExample = `نام دانشجو,شماره دانشجویی,کد ملی,رشته تحصیلی,ترم,معدل
سارا احمدی,40121034099,1275544332,مهندسی کامپیوتر,4,18.25
محمد رضایی,40122045110,1289988771,حسابداری,5,16.80
نیلوفر کمالی,40213012085,1291122334,مهندسی معماری,2,17.40`;

  return (
    <div className="space-y-8 pb-12 text-right">
      
      {/* Header Banner */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                <Database className="w-5 h-5" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                مرکز هماهنگی و ورود اطلاعات دانشجویان دانشگاه
              </h1>
            </div>
            <p className="text-xs text-slate-500">
              مدیریت و اتصال بانک اطلاعاتی دانشجویان موسسه آموزش عالی سپاهان
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportDatabaseBackup}
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>دانلود فایل پشتیبان (JSON)</span>
            </button>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveSubTab('guide')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'guide' ? 'bg-teal-700 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>راهنمای گام‌به‌گام هماهنگی با دانشگاه</span>
          </button>

          <button
            onClick={() => setActiveSubTab('excel')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'excel' ? 'bg-teal-700 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>ورود گروهی با فایل اکسل / CSV</span>
          </button>

          <button
            onClick={() => setActiveSubTab('single')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'single' ? 'bg-teal-700 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>افزودن دستی دانشجو</span>
          </button>

          <button
            onClick={() => setActiveSubTab('list')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'list' ? 'bg-teal-700 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>لیست دانشجویان ثبت‌شده ({allStudents.length})</span>
          </button>
        </div>
      </section>

      {/* Tab 1: Comprehensive University Coordination Roadmap */}
      {activeSubTab === 'guide' && (
        <div className="space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900">
                چگونه با دانشگاه هماهنگ کنید تا اطلاعات کل بچه‌ها وارد سایت شود؟
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                راهنمای جامع اداری و فنی برای اتصال سیستم به دیتابیس دانشگاه سپاهان
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Step 1 */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-teal-600 text-white font-bold text-xs flex items-center justify-center font-mono">
                    ۱
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    مراجعه به «اداره فناوری اطلاعات (IT)» و «اداره آموزش»
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  ابتدا با مدیر آموزش یا مسئول IT موسسه سپاهان جلسه بگذارید. دانشگاه‌ها از نرم‌افزارهای جامع دانشگاهی (نظیر <strong>سامانه سما، گلستان، ناد یا مروارید</strong>) استفاده می‌کنند که تمام پرونده‌های دانشجویی در آن ذخیره است.
                </p>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-[11px] text-slate-500">
                  <strong>درخواست شما از آموزش:</strong> «یک فایل خروجی اکسل (Excel Export) از لیست دانشجویان شامل نام، شماره دانشجویی، کد ملی، رشته و معدل».
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-teal-600 text-white font-bold text-xs flex items-center justify-center font-mono">
                    ۲
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    بارگذاری فایل اکسل در همین سامانه (بخش ورودی اکسل)
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  به محض اینکه فایل اکسل را از آموزش دریافت کردید، در همین صفحه به زبانه <strong>«ورود گروهی با فایل اکسل / CSV»</strong> بیایید و ستون‌ها را کپی و پیست کنید. در کمتر از ۱ ثانیه کل دانشجویان وارد بانک سامانه می‌شوند!
                </p>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-[11px] text-teal-800 font-medium">
                  نکته: سامانه به صورت نامحدود از صدها دانشجو پشتیبانی می‌کند و روی مرورگر و ورکر بدون کندی کار می‌کند.
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-teal-600 text-white font-bold text-xs flex items-center justify-center font-mono">
                    ۳
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    نحوه ورود بچه‌ها (Login)
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  برای اینکه دانشجویان بتوانند انتخاب واحد کنند یا شهریه بدهند:
                </p>
                <ul className="text-xs text-slate-600 space-y-1 list-disc pr-4">
                  <li><strong>نام کاربری دانشجو:</strong> شماره دانشجویی (مثلاً 40121034015)</li>
                  <li><strong>رمز عبور پیش‌فرض:</strong> کد ملی دانشجو (یا سال تولد)</li>
                </ul>
                <p className="text-[11px] text-slate-500 pt-1">
                  دانشجویان با زدن دکمه «ورود دانشجو» در بالای سایت، مستقیماً وارد پنل اختصاصی خود می‌شوند.
                </p>
              </div>

              {/* Step 4 */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-teal-600 text-white font-bold text-xs flex items-center justify-center font-mono">
                    ۴
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    هماهنگی با امور مالی برای درگاه مستقیم بانکی
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  برای واریز مبالغ شهریه به حساب رسمی دانشگاه، امور مالی دانشگاه یک ترمینال درگاه اینترنتی (IPG شاپرک از بانک ملت یا سامان) به شما معرفی می‌کند تا مبالغ مستقیم به شماره شبای دانشگاه سپاهان واریز شود.
                </p>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Excel / CSV Batch Importer */}
      {activeSubTab === 'excel' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">
              ورود دسته‌جمعی اطلاعات دانشجویان با فرمت CSV / متن اکسل
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              متن کپی شده از فایل اکسل دانشگاه را در کادر زیر قرار دهید و دکمه «ثبت و واردسازی» را بزنید.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <label className="font-bold text-slate-800">
                  متن داده‌های CSV یا جداول اکسل:
                </label>
                <button
                  type="button"
                  onClick={() => setCsvInput(sampleCsvExample)}
                  className="text-teal-700 hover:text-teal-900 font-semibold text-xs flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>قرار دادن نمونه آزمایشی</span>
                </button>
              </div>

              <textarea
                rows={7}
                dir="ltr"
                value={csvInput}
                onChange={(e) => setCsvInput(e.target.value)}
                placeholder="نام,شماره دانشجویی,کد ملی,رشته,ترم,معدل"
                className="w-full p-3 font-mono text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
              <span className="text-[11px] text-slate-400 block mt-1">
                ترتیب ستون‌ها: نام دانشجو، شماره دانشجویی، کد ملی، رشته تحصیلی، ترم، معدل (جداشده با کاما یا تب)
              </span>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleImportCSV}
                disabled={!csvInput.trim()}
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs disabled:opacity-50 cursor-pointer"
              >
                ثبت و واردسازی دانشجویان به دیتابیس
              </button>
            </div>
          </div>

          {/* JSON Option */}
          <div className="pt-6 border-t border-slate-100 space-y-3">
            <h3 className="text-sm font-bold text-slate-800">یا واردسازی مستقیم ساختار JSON:</h3>
            <textarea
              rows={4}
              dir="ltr"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="[ { 'name': '...', 'studentNumber': '...' } ]"
              className="w-full p-3 font-mono text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
            <button
              type="button"
              onClick={handleImportJSON}
              disabled={!jsonInput.trim()}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold disabled:opacity-50 cursor-pointer"
            >
              پردازش JSON
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Single Student Form */}
      {activeSubTab === 'single' && (
        <form onSubmit={handleSingleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">
              فرم ثبت‌نام و افزودن دستی دانشجو
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              مشخصات پرونده دانشجو را تکمیل کنید تا بلافاصله دسترسی به پورتال فعال شود.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            
            <div className="space-y-1.5">
              <label className="font-bold text-slate-800">نام و نام خانوادگی:</label>
              <input
                type="text"
                required
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                placeholder="مثال: رضا صادقی"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-800">شماره دانشجویی (نام کاربری):</label>
              <input
                type="text"
                required
                dir="ltr"
                value={newStudent.studentNumber}
                onChange={(e) => setNewStudent({ ...newStudent, studentNumber: e.target.value })}
                placeholder="مثال: 40221034055"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 font-mono text-center"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-800">کد ملی (رمز عبور ورود):</label>
              <input
                type="text"
                dir="ltr"
                value={newStudent.nationalCode}
                onChange={(e) => setNewStudent({ ...newStudent, nationalCode: e.target.value })}
                placeholder="۱۰ رقم کد ملی"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 font-mono text-center"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-800">رشته تحصیلی:</label>
              <select
                value={newStudent.field}
                onChange={(e) => setNewStudent({ ...newStudent, field: e.target.value as StudyField })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
              >
                <option value="مهندسی کامپیوتر">مهندسی کامپیوتر</option>
                <option value="حسابداری">حسابداری</option>
                <option value="مهندسی معماری">مهندسی معماری</option>
                <option value="مهندسی صنایع">مهندسی صنایع</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-800">ترم جاری:</label>
              <input
                type="number"
                min={1}
                max={12}
                value={newStudent.currentTerm}
                onChange={(e) => setNewStudent({ ...newStudent, currentTerm: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-800">معدل کل دانشجو:</label>
              <input
                type="number"
                step="0.01"
                min={0}
                max={20}
                value={newStudent.gpa}
                onChange={(e) => setNewStudent({ ...newStudent, gpa: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-800">شماره تماس دانشجو:</label>
              <input
                type="tel"
                dir="ltr"
                value={newStudent.phone}
                onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                placeholder="0913..."
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 font-mono text-center"
              />
            </div>

          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="submit"
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              افزودن و ثبت پرونده دانشجو
            </button>
          </div>
        </form>
      )}

      {/* Tab 4: Students List Database */}
      {activeSubTab === 'list' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">
              فهرست کل دانشجویان ثبت‌شده در سامانه ({allStudents.length} دانشجو)
            </h3>
            <span className="text-xs text-teal-800 font-semibold">
              ذخیره‌شده در حافظه پایدار دیتابیس
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="p-3.5 font-bold">ردیف</th>
                  <th className="p-3.5 font-bold">نام دانشجو</th>
                  <th className="p-3.5 font-bold">شماره دانشجویی</th>
                  <th className="p-3.5 font-bold">کد ملی</th>
                  <th className="p-3.5 font-bold">رشته</th>
                  <th className="p-3.5 font-bold">ترم</th>
                  <th className="p-3.5 font-bold text-center">معدل</th>
                  <th className="p-3.5 font-bold text-center">سقف واحد</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {allStudents.map((std, idx) => (
                  <tr key={std.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-slate-400">{idx + 1}</td>
                    <td className="p-3.5 font-bold text-slate-900">{std.name}</td>
                    <td className="p-3.5 font-mono text-teal-800 font-bold">{std.studentNumber}</td>
                    <td className="p-3.5 font-mono text-slate-500">{std.nationalCode}</td>
                    <td className="p-3.5">{std.field}</td>
                    <td className="p-3.5 font-mono">ترم {std.currentTerm}</td>
                    <td className="p-3.5 font-mono font-bold text-center">{std.gpa}</td>
                    <td className="p-3.5 font-mono text-center">{std.maxUnits} واحد</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
