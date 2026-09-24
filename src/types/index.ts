export type StudyField = 'مهندسی کامپیوتر' | 'حسابداری' | 'مهندسی معماری' | 'مهندسی صنایع';

export interface StudentProfile {
  id: string;
  name: string;
  studentNumber: string;
  nationalCode: string;
  field: StudyField;
  degree: 'کارشناسی پیوسته' | 'کارشناسی ناپیوسته' | 'کارشناسی ارشد';
  entryYear: string;
  currentTerm: number;
  status: 'در حال تحصیل' | 'مرخصی تحصیلی' | 'فارغ‌التحصیل';
  maxUnits: number;
  minUnits: number;
  gpa: number;
  passedUnits: number;
  advisor: string;
  avatarUrl: string;
  phone: string;
  email: string;
}

export type DayOfWeek = 'شنبه' | 'یکشنبه' | 'دوشنبه' | 'سه‌شنبه' | 'چهارشنبه' | 'پنج‌شنبه';

export interface ClassScheduleItem {
  day: DayOfWeek;
  startTime: string; // e.g. "08:00"
  endTime: string;   // e.g. "10:00"
  room: string;      // e.g. "کلاس ۳۰۲ - دانشکده فنی"
}

export interface Course {
  id: string;
  code: string;
  group: string;
  title: string;
  units: number;
  type: 'تخصصی' | 'پایه' | 'عمومی' | 'عملی-آزمایشگاهی';
  field: StudyField | 'عمومی';
  professor: string;
  schedule: ClassScheduleItem[];
  examDate: string; // Jalali: e.g. "1403/10/22"
  examDay: string;  // e.g. "شنبه"
  examTime: string; // e.g. "08:30 - 10:30"
  examLocation: string; // e.g. "سالن ورزشی امام علی (ع) - طبقه ۱"
  capacity: number;
  enrolledCount: number;
  prerequisites: string[];
  corequisites: string[];
  tuitionPerUnit: number; // in Tomans
}

export interface PaymentTransaction {
  id: string;
  trackingCode: string;
  refId: string;
  amount: number;
  date: string;
  bankGateway: 'سامان (سداد)' | 'ملت (به‌پرداخت)' | 'تجارت' | 'ملی';
  status: 'موفق' | 'ناموفق' | 'در حال پردازش';
  description: string;
  semester: string;
  cardNumberMasked?: string;
}

export interface Announcement {
  id: string;
  title: string;
  category: 'آموزشی' | 'مالی' | 'پژوهشی' | 'فرهنگی' | 'امتحانات';
  date: string;
  summary: string;
  content: string;
  isImportant?: boolean;
}

export interface PastGradeItem {
  id: string;
  courseCode: string;
  courseTitle: string;
  units: number;
  grade: number;
  status: 'قبول' | 'مردود';
  term: string;
}
