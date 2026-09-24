import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course, StudentProfile, PaymentTransaction, Announcement, StudyField, DayOfWeek } from '../types';
import { INITIAL_STUDENTS, ALL_COURSES, INITIAL_ANNOUNCEMENTS, INITIAL_TRANSACTIONS, FIXED_TUITION_FEE, INSURANCE_SERVICES_FEE, DEFAULT_AVATAR_IMG } from '../data/mockData';

export type AppTab = 'home' | 'dashboard' | 'registration' | 'tuition' | 'schedule' | 'exams' | 'transcript' | 'admin';

interface ValidationResult {
  success: boolean;
  message: string;
}

interface FinancialSummary {
  fixedTuition: number;
  variableTuition: number;
  servicesFee: number;
  totalTuition: number;
  totalPaid: number;
  remainingBalance: number;
}

interface AppContextType {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  currentStudent: StudentProfile;
  setCurrentStudent: (student: StudentProfile) => void;
  allStudents: StudentProfile[];
  switchStudent: (studentId: string) => void;
  allCourses: Course[];
  enrolledCourseIds: string[];
  enrolledCourses: Course[];
  enrollCourse: (courseId: string) => ValidationResult;
  dropCourse: (courseId: string) => void;
  totalEnrolledUnits: number;
  financials: FinancialSummary;
  transactions: PaymentTransaction[];
  processPayment: (amount: number, bank: 'سامان (سداد)' | 'ملت (به‌پرداخت)' | 'تجارت' | 'ملی', cardNumber: string) => PaymentTransaction;
  announcements: Announcement[];
  gatewayModalOpen: boolean;
  setGatewayModalOpen: (open: boolean) => void;
  pendingPaymentAmount: number;
  setPendingPaymentAmount: (amount: number) => void;
  lastReceipt: PaymentTransaction | null;
  setLastReceipt: (tx: PaymentTransaction | null) => void;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  checkTimeConflict: (newCourse: Course) => Course | null;
  // Database Import & Management Methods
  importStudentsBatch: (students: Partial<StudentProfile>[]) => number;
  addNewStudent: (student: Omit<StudentProfile, 'id'>) => boolean;
  loginByCredentials: (studentNumber: string, nationalCode: string) => boolean;
  loginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;
  exportDatabaseBackup: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_STUDENTS = 'sepahan_students_db_v2';
const STORAGE_KEY_ENROLLED = 'sepahan_enrolled_courses_v2';
const STORAGE_KEY_TRANSACTIONS = 'sepahan_transactions_v2';
const STORAGE_KEY_ACTIVE_STUDENT = 'sepahan_active_student_v2';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // Dynamic Students List loaded from Storage or Initial Mock
  const [students, setStudents] = useState<StudentProfile[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STUDENTS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_STUDENTS;
  });

  const [currentStudent, setCurrentStudent] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ACTIVE_STUDENT);
      if (saved) {
        const found = students.find(s => s.id === saved || s.studentNumber === saved);
        if (found) return found;
      }
    } catch {}
    return students[0] || INITIAL_STUDENTS[0];
  });

  // Enrolled courses state
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ENROLLED);
      if (saved) return JSON.parse(saved);
    } catch {}
    return ['ce_01', 'ce_02', 'gen_01', 'gen_03']; // 11 initial units
  });

  const [transactions, setTransactions] = useState<PaymentTransaction[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TRANSACTIONS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_TRANSACTIONS;
  });

  const [gatewayModalOpen, setGatewayModalOpen] = useState(false);
  const [pendingPaymentAmount, setPendingPaymentAmount] = useState(0);
  const [lastReceipt, setLastReceipt] = useState<PaymentTransaction | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(students));
    } catch {}
  }, [students]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ENROLLED, JSON.stringify(enrolledCourseIds));
    } catch {}
  }, [enrolledCourseIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(transactions));
    } catch {}
  }, [transactions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ACTIVE_STUDENT, currentStudent.id);
    } catch {}
  }, [currentStudent]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const switchStudent = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (student) {
      setCurrentStudent(student);
      if (student.field === 'حسابداری') {
        setEnrolledCourseIds(['acc_01', 'acc_02', 'gen_01', 'gen_02']);
      } else if (student.field === 'مهندسی معماری') {
        setEnrolledCourseIds(['arch_01', 'gen_01', 'gen_03']);
      } else {
        setEnrolledCourseIds(['ce_01', 'ce_02', 'gen_01', 'gen_03']);
      }
      showToast(`پروفایل فعال به «${student.name} (${student.field})» تغییر یافت.`, 'info');
    }
  };

  // Student Login by Student Number & National Code
  const loginByCredentials = (studentNumber: string, nationalCode: string): boolean => {
    const cleanStd = studentNumber.trim();
    const cleanNat = nationalCode.trim();

    const student = students.find(s => 
      s.studentNumber === cleanStd && (cleanNat === '' || s.nationalCode === cleanNat)
    );

    if (student) {
      setCurrentStudent(student);
      setActiveTab('dashboard');
      showToast(`خوش آمدید، ${student.name}! وارد سامانه شدید.`, 'success');
      return true;
    }

    showToast('دانشجویی با این شماره دانشجویی یا کد ملی یافت نشد.', 'error');
    return false;
  };

  // Batch import students from Excel / CSV / JSON
  const importStudentsBatch = (importedList: Partial<StudentProfile>[]): number => {
    let count = 0;
    const newStudents: StudentProfile[] = [...students];

    importedList.forEach(item => {
      if (!item.name || !item.studentNumber) return;

      const existingIndex = newStudents.findIndex(s => s.studentNumber === item.studentNumber);
      const studentObj: StudentProfile = {
        id: item.id || `std_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        name: item.name,
        studentNumber: item.studentNumber,
        nationalCode: item.nationalCode || '0000000000',
        field: (item.field as StudyField) || 'مهندسی کامپیوتر',
        degree: item.degree || 'کارشناسی پیوسته',
        entryYear: item.entryYear || '1402',
        currentTerm: item.currentTerm || 1,
        status: item.status || 'در حال تحصیل',
        maxUnits: item.maxUnits || 20,
        minUnits: item.minUnits || 12,
        gpa: item.gpa || 16.5,
        passedUnits: item.passedUnits || 30,
        advisor: item.advisor || 'مدیر گروه آموزشی',
        avatarUrl: item.avatarUrl || DEFAULT_AVATAR_IMG,
        phone: item.phone || '',
        email: item.email || ''
      };

      if (existingIndex >= 0) {
        newStudents[existingIndex] = { ...newStudents[existingIndex], ...studentObj };
      } else {
        newStudents.push(studentObj);
        count++;
      }
    });

    setStudents(newStudents);
    showToast(`${count} دانشجوی جدید با موفقیت به بانک اطلاعات دانشگاه افزوده شدند.`, 'success');
    return count;
  };

  // Add a single custom student
  const addNewStudent = (newStd: Omit<StudentProfile, 'id'>): boolean => {
    if (students.some(s => s.studentNumber === newStd.studentNumber)) {
      showToast('دانشجویی با این شماره دانشجویی از قبل در سامانه وجود دارد.', 'error');
      return false;
    }

    const studentObj: StudentProfile = {
      ...newStd,
      id: `std_${Date.now()}`,
      avatarUrl: newStd.avatarUrl || DEFAULT_AVATAR_IMG
    };

    setStudents(prev => [studentObj, ...prev]);
    showToast(`دانشجو «${studentObj.name}» با موفقیت اضافه شد.`, 'success');
    return true;
  };

  // Export full JSON database backup
  const exportDatabaseBackup = () => {
    const data = {
      university: 'موسسه آموزش عالی غیرانتفاعی سپاهان',
      exportDate: new Date().toISOString(),
      studentsCount: students.length,
      students,
      courses: ALL_COURSES
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sepahan_university_students_backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('فایل پشتیبان بانک اطلاعاتی دانشجویان با موفقیت دانلود شد.', 'success');
  };

  const enrolledCourses = ALL_COURSES.filter(c => enrolledCourseIds.includes(c.id));
  const totalEnrolledUnits = enrolledCourses.reduce((sum, c) => sum + c.units, 0);

  // Time conflict detection algorithm
  const parseTime = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  };

  const checkTimeConflict = (newCourse: Course): Course | null => {
    for (const enrolled of enrolledCourses) {
      if (enrolled.id === newCourse.id) continue;
      for (const sched1 of newCourse.schedule) {
        for (const sched2 of enrolled.schedule) {
          if (sched1.day === sched2.day) {
            const start1 = parseTime(sched1.startTime);
            const end1 = parseTime(sched1.endTime);
            const start2 = parseTime(sched2.startTime);
            const end2 = parseTime(sched2.endTime);

            if (Math.max(start1, start2) < Math.min(end1, end2)) {
              return enrolled;
            }
          }
        }
      }
    }
    return null;
  };

  // Unit registration validation
  const enrollCourse = (courseId: string): ValidationResult => {
    const course = ALL_COURSES.find(c => c.id === courseId);
    if (!course) return { success: false, message: 'درس مورد نظر یافت نشد.' };

    if (enrolledCourseIds.includes(courseId)) {
      return { success: false, message: 'این درس قبلاً توسط شما انتخاب شده است.' };
    }

    if (totalEnrolledUnits + course.units > currentStudent.maxUnits) {
      return { 
        success: false, 
        message: `سقف مجاز انتخاب واحد برای شما حداکثر ${currentStudent.maxUnits} واحد می‌باشد. (معدل: ${currentStudent.gpa})` 
      };
    }

    if (course.enrolledCount >= course.capacity) {
      return { success: false, message: 'ظرفیت این گروه درسی تکمیل است.' };
    }

    const conflictCourse = checkTimeConflict(course);
    if (conflictCourse) {
      return {
        success: false,
        message: `تداخل زمانی با درس «${conflictCourse.title}» در روز ${course.schedule[0]?.day || 'کلاسی'}.`
      };
    }

    setEnrolledCourseIds(prev => [...prev, courseId]);
    showToast(`درس «${course.title}» با موفقیت به برنامه درسی شما افزوده شد.`, 'success');
    return { success: true, message: 'درس با موفقیت ثبت شد.' };
  };

  const dropCourse = (courseId: string) => {
    const course = ALL_COURSES.find(c => c.id === courseId);
    setEnrolledCourseIds(prev => prev.filter(id => id !== courseId));
    if (course) {
      showToast(`درس «${course.title}» حذف شد.`, 'info');
    }
  };

  // Financial calculations
  const fixedTuition = FIXED_TUITION_FEE;
  const variableTuition = enrolledCourses.reduce((sum, c) => sum + (c.units * c.tuitionPerUnit), 0);
  const servicesFee = INSURANCE_SERVICES_FEE;
  const totalTuition = fixedTuition + variableTuition + servicesFee;
  const totalPaid = transactions
    .filter(t => t.status === 'موفق')
    .reduce((sum, t) => sum + t.amount, 0);
  const remainingBalance = totalTuition - totalPaid;

  const financials: FinancialSummary = {
    fixedTuition,
    variableTuition,
    servicesFee,
    totalTuition,
    totalPaid,
    remainingBalance
  };

  // Process payment
  const processPayment = (amount: number, bank: 'سامان (سداد)' | 'ملت (به‌پرداخت)' | 'تجارت' | 'ملی', cardNumber: string): PaymentTransaction => {
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const trackingCode = `SEP-${randomSuffix}`;
    const refId = `${Date.now().toString().slice(-9)}`;
    const now = new Date();
    
    const dateStr = `۱۴۰۳/۰۹/۲۴ - ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const maskedCard = cardNumber ? `${cardNumber.slice(0, 4)}-****-****-${cardNumber.slice(-4)}` : '۶۰۳۷-۹۹**-****-۸۸۵۲';

    const newTx: PaymentTransaction = {
      id: `tx_${Date.now()}`,
      trackingCode,
      refId,
      amount,
      date: dateStr,
      bankGateway: bank,
      status: 'موفق',
      description: `پرداخت شهریه نیمسال اول ۱۴۰۳-۱۴۰۴ از طریق درگاه الکترونیکی ${bank}`,
      semester: 'نیمسال اول ۱۴۰۳-۱۴۰۴',
      cardNumberMasked: maskedCard
    };

    setTransactions(prev => [newTx, ...prev]);
    setLastReceipt(newTx);
    showToast(`پرداخت مبلغ ${amount.toLocaleString('fa-IR')} تومان با موفقیت ثبت شد.`, 'success');
    return newTx;
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        currentStudent,
        setCurrentStudent,
        allStudents: students,
        switchStudent,
        allCourses: ALL_COURSES,
        enrolledCourseIds,
        enrolledCourses,
        enrollCourse,
        dropCourse,
        totalEnrolledUnits,
        financials,
        transactions,
        processPayment,
        announcements: INITIAL_ANNOUNCEMENTS,
        gatewayModalOpen,
        setGatewayModalOpen,
        pendingPaymentAmount,
        setPendingPaymentAmount,
        lastReceipt,
        setLastReceipt,
        toast,
        showToast,
        checkTimeConflict,
        importStudentsBatch,
        addNewStudent,
        loginByCredentials,
        loginModalOpen,
        setLoginModalOpen,
        exportDatabaseBackup
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
