export type Language = 'en' | 'ar';

export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      news: 'News',
      gallery: 'Gallery',
      contact: 'Contact',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      admin: 'Admin Panel',
      profile: 'Profile',
      mySubmissions: 'My Submissions',
    },
    // Home Page
    home: {
      heroTitle: 'Al-Moosa Family Portal',
      heroSubtitle: 'Unaizah, Qassim, Saudi Arabia',
      heroDescription: 'Aiming for the family to be an exemplary model, cohesive and supportive, preserving family ties across generations.',
      submitRequest: 'Submit a Request',
      learnMore: 'Learn More',
      ourServices: 'Our Services',
      servicesDescription: 'We provide various services to support our family members in different aspects of life',
      ourAchievements: 'Our Achievements',
      aboutFamily: 'About Al-Moosa Family',
      joinPortal: 'Join Our Family Portal',
      joinDescription: 'Register today to access all services and stay connected with the family',
      registerNow: 'Register Now',
      alreadyMember: 'Already a Member? Login',
    },
    // Services
    services: {
      title: 'Services & Requests',
      subtitle: 'Submit your request easily',
      selectType: 'Select Request Type',
      selectSubType: 'Select Sub-Type',
      submitRequest: 'Submit Request',
      submitting: 'Submitting...',
      successMessage: 'Your request has been submitted successfully!',
      errorMessage: 'An error occurred. Please try again.',
      marriageAssistance: 'Marriage Assistance',
      financialAid: 'Financial Aid',
      eventInvitation: 'Event Invitation',
      charitableDonation: 'Charitable Donation',
    },
    // Forms
    form: {
      fullName: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      required: 'Required',
      optional: 'Optional',
    },
    // Auth
    auth: {
      loginTitle: 'Welcome Back',
      loginSubtitle: 'Sign in to your account',
      registerTitle: 'Create Account',
      registerSubtitle: 'Join the Al-Moosa Family Portal',
      forgotPassword: 'Forgot Password?',
      noAccount: "Don't have an account?",
      hasAccount: 'Already have an account?',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      signInHere: 'Sign in here',
      signUpHere: 'Sign up here',
    },
    // Admin
    admin: {
      dashboard: 'Dashboard',
      requestTypes: 'Request Types',
      submissions: 'Submissions',
      users: 'Users',
      news: 'News',
      gallery: 'Gallery',
      settings: 'Settings',
      addNew: 'Add New',
      totalUsers: 'Total Users',
      totalSubmissions: 'Total Submissions',
      pendingSubmissions: 'Pending Submissions',
      activeRequestTypes: 'Active Request Types',
    },
    // Status
    status: {
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      inReview: 'In Review',
      completed: 'Completed',
    },
    // Common
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      viewAll: 'View All',
      backToHome: 'Back to Home',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      actions: 'Actions',
      view: 'View',
      noData: 'No data available',
    },
    // Footer
    footer: {
      description: 'Official portal for the Al-Moosa family in Unaizah, Qassim. Serving our family members with various services and programs.',
      quickLinks: 'Quick Links',
      contactUs: 'Contact Us',
      followUs: 'Follow Us',
      rights: 'All Rights Reserved',
      address: 'Unaizah, Qassim, Saudi Arabia',
    },
  },
  ar: {
    // Navigation
    nav: {
      home: 'الرئيسية',
      about: 'عن العائلة',
      services: 'الخدمات',
      news: 'الأخبار',
      gallery: 'معرض الصور',
      contact: 'اتصل بنا',
      login: 'تسجيل الدخول',
      register: 'إنشاء حساب',
      logout: 'تسجيل الخروج',
      admin: 'لوحة التحكم',
      profile: 'الملف الشخصي',
      mySubmissions: 'طلباتي',
    },
    // Home Page
    home: {
      heroTitle: 'بوابة عائلة الموسى',
      heroSubtitle: 'عنيزة، القصيم، المملكة العربية السعودية',
      heroDescription: 'نهدف أن تكون العائلة نموذجاً يحتذى به، متماسكة ومتعاضدة، حافظة لصلة الرحم عبر الأجيال.',
      submitRequest: 'تقديم طلب',
      learnMore: 'اعرف المزيد',
      ourServices: 'خدماتنا',
      servicesDescription: 'نقدم خدمات متنوعة لدعم أفراد عائلتنا في مختلف جوانب الحياة',
      ourAchievements: 'إنجازاتنا',
      aboutFamily: 'عن عائلة الموسى',
      joinPortal: 'انضم إلى بوابة العائلة',
      joinDescription: 'سجل اليوم للوصول إلى جميع الخدمات والبقاء على تواصل مع العائلة',
      registerNow: 'سجل الآن',
      alreadyMember: 'لديك حساب؟ سجل دخولك',
    },
    // Services
    services: {
      title: 'الخدمات والطلبات',
      subtitle: 'قدم طلبك بسهولة',
      selectType: 'اختر نوع الطلب',
      selectSubType: 'اختر النوع الفرعي',
      submitRequest: 'تقديم الطلب',
      submitting: 'جاري التقديم...',
      successMessage: 'تم تقديم طلبك بنجاح!',
      errorMessage: 'حدث خطأ. يرجى المحاولة مرة أخرى.',
      marriageAssistance: 'مساعدة الزواج',
      financialAid: 'المساعدة المالية',
      eventInvitation: 'دعوة للمناسبات',
      charitableDonation: 'تبرع خيري',
    },
    // Forms
    form: {
      fullName: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      submit: 'إرسال',
      cancel: 'إلغاء',
      save: 'حفظ',
      edit: 'تعديل',
      delete: 'حذف',
      required: 'مطلوب',
      optional: 'اختياري',
    },
    // Auth
    auth: {
      loginTitle: 'مرحباً بعودتك',
      loginSubtitle: 'سجل دخولك إلى حسابك',
      registerTitle: 'إنشاء حساب',
      registerSubtitle: 'انضم إلى بوابة عائلة الموسى',
      forgotPassword: 'نسيت كلمة المرور؟',
      noAccount: 'ليس لديك حساب؟',
      hasAccount: 'لديك حساب بالفعل؟',
      signIn: 'تسجيل الدخول',
      signUp: 'إنشاء حساب',
      signInHere: 'سجل دخولك هنا',
      signUpHere: 'أنشئ حسابك هنا',
    },
    // Admin
    admin: {
      dashboard: 'لوحة التحكم',
      requestTypes: 'أنواع الطلبات',
      submissions: 'الطلبات المقدمة',
      users: 'المستخدمين',
      news: 'الأخبار',
      gallery: 'معرض الصور',
      settings: 'الإعدادات',
      addNew: 'إضافة جديد',
      totalUsers: 'إجمالي المستخدمين',
      totalSubmissions: 'إجمالي الطلبات',
      pendingSubmissions: 'طلبات قيد الانتظار',
      activeRequestTypes: 'أنواع الطلبات النشطة',
    },
    // Status
    status: {
      pending: 'قيد الانتظار',
      approved: 'موافق عليه',
      rejected: 'مرفوض',
      inReview: 'قيد المراجعة',
      completed: 'مكتمل',
    },
    // Common
    common: {
      loading: 'جاري التحميل...',
      error: 'خطأ',
      success: 'نجاح',
      viewAll: 'عرض الكل',
      backToHome: 'العودة للرئيسية',
      search: 'بحث',
      filter: 'تصفية',
      sort: 'ترتيب',
      actions: 'الإجراءات',
      view: 'عرض',
      noData: 'لا توجد بيانات',
    },
    // Footer
    footer: {
      description: 'البوابة الرسمية لعائلة الموسى في عنيزة، القصيم. نخدم أفراد عائلتنا بمختلف الخدمات والبرامج.',
      quickLinks: 'روابط سريعة',
      contactUs: 'اتصل بنا',
      followUs: 'تابعنا',
      rights: 'جميع الحقوق محفوظة',
      address: 'عنيزة، القصيم، المملكة العربية السعودية',
    },
  },
};

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any = translations[lang];

  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      return key;
    }
  }

  return typeof result === 'string' ? result : key;
}
