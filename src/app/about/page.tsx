'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/components/providers/LanguageProvider';
import {
  Target,
  Eye,
  Heart,
  Users,
  Award,
  BookOpen,
  Building,
  Star,
} from 'lucide-react';

const teamMembers = [
  { name: 'Chairman', nameAr: 'رئيس مجلس الإدارة', role: 'Board Chairman', roleAr: 'رئيس المجلس' },
  { name: 'Vice Chairman', nameAr: 'نائب الرئيس', role: 'Deputy', roleAr: 'نائب' },
  { name: 'Secretary', nameAr: 'الأمين', role: 'Secretary General', roleAr: 'أمين عام' },
  { name: 'Treasurer', nameAr: 'أمين الصندوق', role: 'Financial Officer', roleAr: 'مسؤول مالي' },
];

const values = [
  {
    icon: Heart,
    title: 'Family Unity',
    titleAr: 'وحدة العائلة',
    description: 'Strengthening bonds between family members across generations',
    descriptionAr: 'تقوية الروابط بين أفراد العائلة عبر الأجيال',
  },
  {
    icon: BookOpen,
    title: 'Education',
    titleAr: 'التعليم',
    description: 'Supporting educational achievements and lifelong learning',
    descriptionAr: 'دعم الإنجازات التعليمية والتعلم مدى الحياة',
  },
  {
    icon: Star,
    title: 'Excellence',
    titleAr: 'التميز',
    description: 'Encouraging excellence in all aspects of life',
    descriptionAr: 'تشجيع التميز في جميع جوانب الحياة',
  },
  {
    icon: Users,
    title: 'Community',
    titleAr: 'المجتمع',
    description: 'Building a supportive community within the family',
    descriptionAr: 'بناء مجتمع داعم داخل العائلة',
  },
];

export default function AboutPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="wave-bg text-white py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {language === 'ar' ? 'عن عائلة الموسى' : 'About Al-Moosa Family'}
            </h1>
            <p className="text-xl text-emerald-100">
              {language === 'ar' ? 'عنيزة، القصيم، المملكة العربية السعودية' : 'Unaizah, Qassim, Saudi Arabia'}
            </p>
          </div>
        </div>
      </section>

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {language === 'ar' ? 'من نحن' : 'Who We Are'}
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {language === 'ar'
                    ? 'عائلة الموسى هي إحدى العائلات العريقة في مدينة عنيزة بمنطقة القصيم في المملكة العربية السعودية. تأسست جمعية عائلة الموسى بهدف تقوية الروابط الأسرية ودعم أفراد العائلة في مختلف مناحي الحياة.'
                    : 'The Al-Moosa family is one of the distinguished families in Unaizah, Qassim province, Saudi Arabia. The Al-Moosa Family Association was established to strengthen family bonds and support family members in various aspects of life.'}
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {language === 'ar'
                    ? 'نسعى من خلال هذه البوابة الإلكترونية إلى تقديم خدمات متنوعة لأفراد العائلة، والتواصل معهم، والاحتفاء بإنجازاتهم، ودعمهم في مناسباتهم المختلفة.'
                    : 'Through this electronic portal, we aim to provide various services to family members, communicate with them, celebrate their achievements, and support them in their various occasions.'}
                </p>
              </div>
              <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl p-8 text-center">
                <div className="w-32 h-32 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-6xl">أ</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">عائلة الموسى</h3>
                <p className="text-emerald-600">Al-Moosa Family</p>
              </div>
            </div>
          </section>

          {/* Vision & Mission */}
          <section className="mb-16 grid md:grid-cols-2 gap-8">
            <Card className="bg-emerald-50 border-emerald-200">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mr-4 rtl:ml-4 rtl:mr-0">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {language === 'ar' ? 'رؤيتنا' : 'Our Vision'}
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {language === 'ar'
                    ? 'أن تكون عائلة الموسى نموذجاً يُحتذى به في التماسك الأسري والتكافل الاجتماعي، محافظةً على صلة الرحم وداعمةً لأفرادها في تحقيق التميز.'
                    : 'For the Al-Moosa family to be an exemplary model of family cohesion and social solidarity, preserving family ties and supporting its members in achieving excellence.'}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-teal-50 border-teal-200">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mr-4 rtl:ml-4 rtl:mr-0">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {language === 'ar' ? 'رسالتنا' : 'Our Mission'}
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {language === 'ar'
                    ? 'توفير بيئة داعمة لأفراد العائلة من خلال برامج وخدمات متنوعة تشمل الدعم المالي، والاحتفاء بالإنجازات، وتعزيز التواصل الأسري.'
                    : 'Providing a supportive environment for family members through various programs and services including financial support, celebrating achievements, and enhancing family communication.'}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Values */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
              {language === 'ar' ? 'قيمنا' : 'Our Values'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {language === 'ar' ? value.titleAr : value.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {language === 'ar' ? value.descriptionAr : value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Achievements */}
          <section className="mb-16 bg-gray-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
              {language === 'ar' ? 'إنجازاتنا' : 'Our Achievements'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">14</div>
                <p className="text-gray-600">
                  {language === 'ar' ? 'حافظ للقرآن الكريم' : 'Quran Memorizers'}
                </p>
              </div>
              <div>
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">27</div>
                <p className="text-gray-600">
                  {language === 'ar' ? 'متفوق ومتميز' : 'Honor Graduates'}
                </p>
              </div>
              <div>
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">800+</div>
                <p className="text-gray-600">
                  {language === 'ar' ? 'فرد مسجل' : 'Registered Members'}
                </p>
              </div>
              <div>
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">1</div>
                <p className="text-gray-600">
                  {language === 'ar' ? 'مقر للعائلة' : 'Family Headquarters'}
                </p>
              </div>
            </div>
          </section>

          {/* Board Members */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
              {language === 'ar' ? 'مجلس الإدارة' : 'Board of Directors'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {language === 'ar' ? member.nameAr : member.name}
                    </h3>
                    <p className="text-sm text-emerald-600">
                      {language === 'ar' ? member.roleAr : member.role}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
