import { Course, StudentProfile, Announcement, PaymentTransaction, PastGradeItem } from '../types';

export const CAMPUS_HERO_IMG = '/src/assets/images/hero_sepahan_campus_1790264787629.jpg';
export const LIBRARY_IMG = '/src/assets/images/sepahan_library_hall_1790264800317.jpg';
export const DEFAULT_AVATAR_IMG = '/src/assets/images/sepahan_student_avatar_1790264809856.jpg';

export const INITIAL_STUDENTS: StudentProfile[] = [
  {
    id: 'std_01',
    name: 'علی حسینی نجف‌آبادی',
    studentNumber: '40121034015',
    nationalCode: '1270984532',
    field: 'مهندسی کامپیوتر',
    degree: 'کارشناسی پیوسته',
    entryYear: '1401',
    currentTerm: 5,
    status: 'در حال تحصیل',
    maxUnits: 20,
    minUnits: 12,
    gpa: 17.85,
    passedUnits: 72,
    advisor: 'دکتر محمدرضا صادقی',
    avatarUrl: DEFAULT_AVATAR_IMG,
    phone: '09131234567',
    email: 'a.hosseini@sepahan.ac.ir'
  },
  {
    id: 'std_02',
    name: 'فاطمه موسوی اصفهانی',
    studentNumber: '40122045088',
    nationalCode: '1289945120',
    field: 'حسابداری',
    degree: 'کارشناسی پیوسته',
    entryYear: '1401',
    currentTerm: 5,
    status: 'در حال تحصیل',
    maxUnits: 24, // High GPA allows 24 units
    minUnits: 12,
    gpa: 18.90,
    passedUnits: 76,
    advisor: 'دکتر نرگس ابراهیمی',
    avatarUrl: DEFAULT_AVATAR_IMG,
    phone: '09139876543',
    email: 'f.mousavi@sepahan.ac.ir'
  },
  {
    id: 'std_03',
    name: 'امیرحسین کریمی',
    studentNumber: '40213012019',
    nationalCode: '1294432109',
    field: 'مهندسی معماری',
    degree: 'کارشناسی پیوسته',
    entryYear: '1402',
    currentTerm: 3,
    status: 'در حال تحصیل',
    maxUnits: 20,
    minUnits: 12,
    gpa: 16.40,
    passedUnits: 38,
    advisor: 'مهندس سعید سلطانی',
    avatarUrl: DEFAULT_AVATAR_IMG,
    phone: '09135551234',
    email: 'a.karimi@sepahan.ac.ir'
  }
];

export const ALL_COURSES: Course[] = [
  // Computer Engineering
  {
    id: 'ce_01',
    code: '2110201',
    group: '01',
    title: 'ساختمان داده‌ها و الگوریتم‌ها',
    units: 3,
    type: 'تخصصی',
    field: 'مهندسی کامپیوتر',
    professor: 'دکتر محمدرضا صادقی',
    schedule: [
      { day: 'شنبه', startTime: '08:00', endTime: '10:00', room: 'کلاس ۲۰۱ - دانشکده فنی' },
      { day: 'دوشنبه', startTime: '08:00', endTime: '10:00', room: 'کلاس ۲۰۱ - دانشکده فنی' }
    ],
    examDate: '1403/10/18',
    examDay: 'سه‌شنبه',
    examTime: '08:30 - 10:30',
    examLocation: 'سالن امتحانات شماره ۱ - خوارزمی',
    capacity: 40,
    enrolledCount: 36,
    prerequisites: ['برنامه‌نویسی پیشرفته'],
    corequisites: [],
    tuitionPerUnit: 350000
  },
  {
    id: 'ce_02',
    code: '2110205',
    group: '01',
    title: 'سیستم‌های عامل',
    units: 3,
    type: 'تخصصی',
    field: 'مهندسی کامپیوتر',
    professor: 'دکتر علیرضا قادری',
    schedule: [
      { day: 'یکشنبه', startTime: '10:00', endTime: '12:00', room: 'کلاس ۲۰۵ - دانشکده فنی' },
      { day: 'سه‌شنبه', startTime: '10:00', endTime: '12:00', room: 'کلاس ۲۰۵ - دانشکده فنی' }
    ],
    examDate: '1403/10/22',
    examDay: 'شنبه',
    examTime: '11:00 - 13:00',
    examLocation: 'سالن ورزشی - سالن آزمون A',
    capacity: 35,
    enrolledCount: 30,
    prerequisites: ['معماری کامپیوتر', 'ساختمان داده‌ها'],
    corequisites: [],
    tuitionPerUnit: 350000
  },
  {
    id: 'ce_03',
    code: '2110210',
    group: '01',
    title: 'طراحی پایگاه‌داده‌ها',
    units: 3,
    type: 'تخصصی',
    field: 'مهندسی کامپیوتر',
    professor: 'مهندس زهرا عسکری',
    schedule: [
      { day: 'شنبه', startTime: '13:30', endTime: '15:30', room: 'کلاس ۱۰۴ - دانشکده فنی' },
      { day: 'چهارشنبه', startTime: '10:00', endTime: '12:00', room: 'سایت تخصصی کامپیوتر ۲' }
    ],
    examDate: '1403/10/25',
    examDay: 'سه‌شنبه',
    examTime: '08:30 - 10:30',
    examLocation: 'سالن امتحانات شماره ۲ - شیخ بهایی',
    capacity: 40,
    enrolledCount: 38,
    prerequisites: ['ساختمان داده‌ها'],
    corequisites: [],
    tuitionPerUnit: 350000
  },
  {
    id: 'ce_04',
    code: '2110218',
    group: '01',
    title: 'شبکه‌های کامپیوتری',
    units: 3,
    type: 'تخصصی',
    field: 'مهندسی کامپیوتر',
    professor: 'دکتر مسعود دهقانی',
    schedule: [
      { day: 'دوشنبه', startTime: '10:00', endTime: '12:00', room: 'کلاس ۲۰۳ - دانشکده فنی' },
      { day: 'چهارشنبه', startTime: '13:30', endTime: '15:30', room: 'کلاس ۲۰۳ - دانشکده فنی' }
    ],
    examDate: '1403/10/29',
    examDay: 'شنبه',
    examTime: '13:30 - 15:30',
    examLocation: 'سالن امتحانات شماره ۱ - خوارزمی',
    capacity: 45,
    enrolledCount: 42,
    prerequisites: ['سیستم‌های عامل'],
    corequisites: [],
    tuitionPerUnit: 350000
  },
  {
    id: 'ce_05',
    code: '2110302',
    group: '01',
    title: 'آزمایشگاه سیستم‌های عامل',
    units: 1,
    type: 'عملی-آزمایشگاهی',
    field: 'مهندسی کامپیوتر',
    professor: 'مهندس نیما مختاری',
    schedule: [
      { day: 'سه‌شنبه', startTime: '13:30', endTime: '15:30', room: 'آزمایشگاه سیستم‌های لینوکس' }
    ],
    examDate: '1403/10/16',
    examDay: 'یکشنبه',
    examTime: '14:00 - 16:00',
    examLocation: 'سایت کامپیوتر ۱',
    capacity: 25,
    enrolledCount: 22,
    prerequisites: ['سیستم‌های عامل'],
    corequisites: [],
    tuitionPerUnit: 480000
  },
  {
    id: 'ce_06',
    code: '2110309',
    group: '01',
    title: 'هوش مصنوعی و سیستم‌های خبره',
    units: 3,
    type: 'تخصصی',
    field: 'مهندسی کامپیوتر',
    professor: 'دکتر مریم شفیعی',
    schedule: [
      { day: 'یکشنبه', startTime: '13:30', endTime: '15:30', room: 'آمفی تئاتر دانشکده مهندسی' },
      { day: 'سه‌شنبه', startTime: '08:00', endTime: '10:00', room: 'کلاس ۲۰۱ - دانشکده فنی' }
    ],
    examDate: '1403/11/02',
    examDay: 'سه‌شنبه',
    examTime: '08:30 - 10:30',
    examLocation: 'سالن امتحانات شماره ۱ - خوارزمی',
    capacity: 40,
    enrolledCount: 39,
    prerequisites: ['طراحی الگوریتم‌ها'],
    corequisites: [],
    tuitionPerUnit: 350000
  },

  // Accounting Courses
  {
    id: 'acc_01',
    code: '2210101',
    group: '01',
    title: 'حسابداری میانه ۱',
    units: 3,
    type: 'تخصصی',
    field: 'حسابداری',
    professor: 'دکتر نرگس ابراهیمی',
    schedule: [
      { day: 'شنبه', startTime: '10:00', endTime: '12:00', room: 'کلاس ۳۰۱ - دانشکده علوم انسانی' },
      { day: 'دوشنبه', startTime: '10:00', endTime: '12:00', room: 'کلاس ۳۰۱ - دانشکده علوم انسانی' }
    ],
    examDate: '1403/10/19',
    examDay: 'چهارشنبه',
    examTime: '08:30 - 10:30',
    examLocation: 'سالن امتحانات شماره ۲ - شیخ بهایی',
    capacity: 50,
    enrolledCount: 44,
    prerequisites: ['اصول حسابداری ۲'],
    corequisites: [],
    tuitionPerUnit: 320000
  },
  {
    id: 'acc_02',
    code: '2210108',
    group: '01',
    title: 'حسابداری صنعتی (بهای تمام شده)',
    units: 3,
    type: 'تخصصی',
    field: 'حسابداری',
    professor: 'دکتر بهمن تقوی',
    schedule: [
      { day: 'یکشنبه', startTime: '08:00', endTime: '10:00', room: 'کلاس ۳۰۵ - دانشکده علوم انسانی' },
      { day: 'سه‌شنبه', startTime: '08:00', endTime: '10:00', room: 'کلاس ۳۰۵ - دانشکده علوم انسانی' }
    ],
    examDate: '1403/10/23',
    examDay: 'یکشنبه',
    examTime: '11:00 - 13:00',
    examLocation: 'سالن ورزشی - سالن آزمون B',
    capacity: 45,
    enrolledCount: 40,
    prerequisites: ['اصول حسابداری ۲'],
    corequisites: [],
    tuitionPerUnit: 320000
  },

  // Architecture Courses
  {
    id: 'arch_01',
    code: '2310202',
    group: '01',
    title: 'طرح معماری ۲ (طراحی فضاهای فرهنگی)',
    units: 4,
    type: 'تخصصی',
    field: 'مهندسی معماری',
    professor: 'مهندس سعید سلطانی',
    schedule: [
      { day: 'شنبه', startTime: '08:00', endTime: '12:00', room: 'آتلیه معماری شماره ۱' },
      { day: 'چهارشنبه', startTime: '08:00', endTime: '12:00', room: 'آتلیه معماری شماره ۱' }
    ],
    examDate: '1403/10/21',
    examDay: 'جمعه',
    examTime: '09:00 - 15:00',
    examLocation: 'آتلیه معماری شماره ۱ (ژوژمان)',
    capacity: 25,
    enrolledCount: 24,
    prerequisites: ['طرح معماری ۱'],
    corequisites: ['مبانی نظری معماری'],
    tuitionPerUnit: 420000
  },

  // General & Foundation Courses
  {
    id: 'gen_01',
    code: '1100101',
    group: '02',
    title: 'فارسی عمومی و آیین نگارش',
    units: 2,
    type: 'عمومی',
    field: 'عمومی',
    professor: 'استاد پروانه کمالی',
    schedule: [
      { day: 'دوشنبه', startTime: '13:30', endTime: '15:30', room: 'کلاس ۱۰۲ - ساختمان مرکزی' }
    ],
    examDate: '1403/10/17',
    examDay: 'دوشنبه',
    examTime: '14:00 - 16:00',
    examLocation: 'سالن امتحانات شماره ۱ - خوارزمی',
    capacity: 60,
    enrolledCount: 52,
    prerequisites: [],
    corequisites: [],
    tuitionPerUnit: 240000
  },
  {
    id: 'gen_02',
    code: '1100105',
    group: '01',
    title: 'زبان انگلیسی عمومی',
    units: 2,
    type: 'عمومی',
    field: 'عمومی',
    professor: 'دکتر کامران شایسته',
    schedule: [
      { day: 'چهارشنبه', startTime: '08:00', endTime: '10:00', room: 'کلاس ۱۰۶ - ساختمان مرکزی' }
    ],
    examDate: '1403/10/24',
    examDay: 'دوشنبه',
    examTime: '11:00 - 13:00',
    examLocation: 'سالن امتحانات شماره ۲ - شیخ بهایی',
    capacity: 60,
    enrolledCount: 55,
    prerequisites: [],
    corequisites: [],
    tuitionPerUnit: 240000
  },
  {
    id: 'gen_03',
    code: '1100112',
    group: '03',
    title: 'اندیشه اسلامی ۱ (مبدا و معاد)',
    units: 2,
    type: 'عمومی',
    field: 'عمومی',
    professor: 'حجت‌الاسلام دکتر موسوی',
    schedule: [
      { day: 'یکشنبه', startTime: '08:00', endTime: '10:00', room: 'کلاس ۱۰۸ - ساختمان مرکزی' }
    ],
    examDate: '1403/10/28',
    examDay: 'جمعه',
    examTime: '08:30 - 10:30',
    examLocation: 'سالن امتحانات شماره ۱ - خوارزمی',
    capacity: 60,
    enrolledCount: 58,
    prerequisites: [],
    corequisites: [],
    tuitionPerUnit: 240000
  },
  {
    id: 'gen_04',
    code: '1100120',
    group: '01',
    title: 'تربیت بدنی و سلامت جسمانی',
    units: 1,
    type: 'عملی-آزمایشگاهی',
    field: 'عمومی',
    professor: 'استاد پیمان اکبری',
    schedule: [
      { day: 'سه‌شنبه', startTime: '15:30', endTime: '17:30', room: 'مجموعه ورزشی چندمنظوره سپاهان' }
    ],
    examDate: '1403/10/15',
    examDay: 'شنبه',
    examTime: '15:00 - 17:00',
    examLocation: 'سالن ورزشی دانشگاه',
    capacity: 35,
    enrolledCount: 31,
    prerequisites: [],
    corequisites: [],
    tuitionPerUnit: 280000
  },
  {
    id: 'math_01',
    code: '1200101',
    group: '01',
    title: 'ریاضیات مهندسی',
    units: 3,
    type: 'پایه',
    field: 'مهندسی کامپیوتر',
    professor: 'دکتر جواد امینی',
    schedule: [
      { day: 'شنبه', startTime: '10:00', endTime: '12:00', room: 'کلاس ۲۰۲ - دانشکده فنی' },
      { day: 'دوشنبه', startTime: '15:30', endTime: '17:30', room: 'کلاس ۲۰۲ - دانشکده فنی' }
    ],
    examDate: '1403/11/04',
    examDay: 'پنج‌شنبه',
    examTime: '08:30 - 10:30',
    examLocation: 'سالن امتحانات شماره ۱ - خوارزمی',
    capacity: 45,
    enrolledCount: 41,
    prerequisites: ['معادلات دیفرانسیل', 'ریاضی عمومی ۲'],
    corequisites: [],
    tuitionPerUnit: 310000
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann_01',
    title: 'زمان‌بندی تقویم انتخاب واحد و حذف و اضافه نیمسال تحصیلی',
    category: 'آموزشی',
    date: '۱۴۰۳/۰۶/۱۵',
    summary: 'کلیه دانشجویان محترم موظفند بر اساس جدول زمان‌بندی ورودی‌ها نسبت به تسویه شهریه و اخذ واحد اقدام نمایند.',
    content: 'به اطلاع دانشجویان گرامی موسسه آموزش عالی غیرانتفاعی سپاهان می‌رساند، بازه انتخاب واحد نیمسال اول سال تحصیلی ۱۴۰۳-۱۴۰۴ بر اساس سال ورود از تاریخ ۲۰ شهریورماه لغایت ۲۷ شهریورماه فعال خواهد بود. جهت جلوگیری از قفل شدن سامانه نسبت به پرداخت علی‌الحساب شهریه قبل از موعد مقرر اقدام فرمایید.',
    isImportant: true
  },
  {
    id: 'ann_02',
    title: 'دستورالعمل نحوه صدور کارت ورود به جلسه و ضوابط امتحانات پایان‌ترم',
    category: 'امتحانات',
    date: '۱۴۰۳/۰۹/۱۰',
    summary: 'همراه داشتن پرینت کارت ورود به جلسه آزمون (عکس‌دار) و کارت دانشجویی الزامی است.',
    content: 'دانشجویان عزیز توجه فرمایند، امکان دریافت و چاپ کارت ورود به جلسه امتحانات از ۵ روز قبل از اولین امتحان پس از ارزشیابی اساتید و تسویه بدهی مالی فعال خواهد شد. به همراه داشتن هرگونه تلفن همراه یا ساعت هوشمند در حوزه امتحانی تخلف انضباطی محسوب می‌گردد.',
    isImportant: true
  },
  {
    id: 'ann_03',
    title: 'امکان تقسیط شهریه و اعطای تسهیلات صندوق رفاه دانشجویان',
    category: 'مالی',
    date: '۱۴۰۳/۰۸/۰۵',
    summary: 'ثبت‌نام وام‌های شهریه وزارت علوم از طریق سامانه یکپارچه صندوق رفاه آغاز گردید.',
    content: 'دانشجویان متقاضی استفاده از وام‌های قرض‌الحسنه شهریه می‌توانند با مراجعه به پورتال صندوق رفاه وزارت علوم و ارائه مدارک ضامن، از تسهیلات شهریه بهره‌مند گردند.',
    isImportant: false
  },
  {
    id: 'ann_04',
    title: 'برگزاری کارگاه تخصصی هوش مصنوعی و معماری نرم‌افزار نوین',
    category: 'پژوهشی',
    date: '۱۴۰۳/۰۸/۱۸',
    summary: 'انجمن علمی مهندسی کامپیوتر با همکاری گروه فناوری اطلاعات برگزار می‌کند.',
    content: 'کارگاه دوروزه آشنایی با مدل‌های زبانی بزرگ (LLMs) و استقرار نرم‌افزارهای ابری در سالن همایش‌های شیخ بهایی با اعطای گواهی معتبر دانشگاهی برگزار می‌گردد.',
    isImportant: false
  }
];

export const INITIAL_TRANSACTIONS: PaymentTransaction[] = [
  {
    id: 'tx_01',
    trackingCode: 'SEP-8942104',
    refId: '9841203958',
    amount: 3200000,
    date: '۱۴۰۳/۰۶/۱۸ - ۱۱:۲۴',
    bankGateway: 'سامان (سداد)',
    status: 'موفق',
    description: 'پرداخت علی‌الحساب شهریه ثابت نیمسال اول ۱۴۰۳-۱۴۰۴',
    semester: 'نیمسال اول ۱۴۰۳-۱۴۰۴',
    cardNumberMasked: '۶۰۳۷-۹۹**-****-۴۴۵۱'
  },
  {
    id: 'tx_02',
    trackingCode: 'SEP-7731902',
    refId: '8712490123',
    amount: 1500000,
    date: '۱۴۰۳/۰۷/۱۰ - ۱۵:۴۰',
    bankGateway: 'ملت (به‌پرداخت)',
    status: 'موفق',
    description: 'پرداخت حق بیمه حوادث دانشجویی و خدمات کارگاهی',
    semester: 'نیمسال اول ۱۴۰۳-۱۴۰۴',
    cardNumberMasked: '۶۱۰۴-۳۳**-****-۸۸۲۰'
  }
];

export const PAST_GRADES: PastGradeItem[] = [
  { id: 'g_1', courseCode: '2110101', courseTitle: 'مبانی برنامه‌سازی کامپیوتر', units: 3, grade: 18.5, status: 'قبول', term: 'نیمسال اول ۱۴۰۱-۱۴۰۲' },
  { id: 'g_2', courseCode: '2110105', courseTitle: 'برنامه‌نویسی پیشرفته', units: 3, grade: 19.0, status: 'قبول', term: 'نیمسال دوم ۱۴۰۱-۱۴۰۲' },
  { id: 'g_3', courseCode: '2110110', courseTitle: 'ساختمان‌های گسسته', units: 3, grade: 17.0, status: 'قبول', term: 'نیمسال دوم ۱۴۰۱-۱۴۰۲' },
  { id: 'g_4', courseCode: '1200100', courseTitle: 'ریاضی عمومی ۱', units: 3, grade: 16.5, status: 'قبول', term: 'نیمسال اول ۱۴۰۱-۱۴۰۲' },
  { id: 'g_5', courseCode: '1200102', courseTitle: 'ریاضی عمومی ۲', units: 3, grade: 17.5, status: 'قبول', term: 'نیمسال دوم ۱۴۰۱-۱۴۰۲' },
  { id: 'g_6', courseCode: '2110118', courseTitle: 'مدارهای منطقی', units: 3, grade: 18.0, status: 'قبول', term: 'نیمسال اول ۱۴۰۲-۱۴۰۳' },
  { id: 'g_7', courseCode: '2110122', courseTitle: 'معماری کامپیوتر', units: 3, grade: 17.25, status: 'قبول', term: 'نیمسال دوم ۱۴۰۲-۱۴۰۳' }
];

// University Fee Constants
export const FIXED_TUITION_FEE = 3800000; // شهریه ثابت: ۳,۸۰۰,۰۰۰ تومان
export const INSURANCE_SERVICES_FEE = 450000; // هزینه خدمات رفاهی و بیمه
