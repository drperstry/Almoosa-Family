'use client';

import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/components/providers/LanguageProvider';
import {
  Heart,
  DollarSign,
  Calendar,
  HandHeart,
  Users,
  Award,
  BookOpen,
  Building,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
} from 'lucide-react';

export default function HomePage() {
  const { language, t } = useLanguage();
  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  const services = [
    {
      icon: Heart,
      title: language === 'ar' ? 'مساعدة الزواج' : 'Marriage Assistance',
      description: language === 'ar'
        ? 'دعم مالي لأفراد العائلة المقبلين على الزواج'
        : 'Financial support for family members getting married',
      color: 'bg-pink-500',
    },
    {
      icon: DollarSign,
      title: language === 'ar' ? 'المساعدة المالية' : 'Financial Aid',
      description: language === 'ar'
        ? 'برامج المساعدة المالية الطارئة والشهرية'
        : 'Emergency and monthly financial assistance programs',
      color: 'bg-green-500',
    },
    {
      icon: Calendar,
      title: language === 'ar' ? 'دعوات المناسبات' : 'Event Invitations',
      description: language === 'ar'
        ? 'دعوة أفراد العائلة لمناسباتك الخاصة'
        : 'Invite family members to your special events',
      color: 'bg-purple-500',
    },
    {
      icon: HandHeart,
      title: language === 'ar' ? 'التبرعات الخيرية' : 'Charitable Donations',
      description: language === 'ar'
        ? 'المساهمة في برامج العائلة الخيرية'
        : 'Contribute to family charity programs',
      color: 'bg-amber-500',
    },
  ];

  const achievements = [
    {
      icon: BookOpen,
      number: '14',
      label: language === 'ar' ? 'حافظ للقرآن' : 'Quran Memorizers'
    },
    {
      icon: Award,
      number: '27',
      label: language === 'ar' ? 'متفوق' : 'Honor Graduates'
    },
    {
      icon: Users,
      number: '800+',
      label: language === 'ar' ? 'فرد من العائلة' : 'Family Members'
    },
    {
      icon: Building,
      number: '1',
      label: language === 'ar' ? 'مقر العائلة' : 'Family Headquarters'
    },
  ];

  const features = language === 'ar' ? [
    'الحفاظ على صلة الرحم وتقويتها',
    'دعم الأفراد في التعليم والعمل',
    'الاحتفاء بالإنجازات والمناسبات',
    'تقديم المساعدة المالية عند الحاجة',
  ] : [
    'Preserve and strengthen family ties',
    'Support members in education and career',
    'Celebrate achievements and milestones',
    'Provide financial assistance when needed',
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="wave-bg text-white py-20 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {language === 'ar' ? 'بوابة عائلة الموسى' : 'Al-Moosa Family Portal'}
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-emerald-100">
              {language === 'ar' ? 'عنيزة، القصيم، المملكة العربية السعودية' : 'Unaizah, Qassim, Saudi Arabia'}
            </p>
            <p className="text-lg text-emerald-50 mb-8 max-w-2xl mx-auto">
              {language === 'ar'
                ? 'نهدف أن تكون العائلة نموذجاً يحتذى به، متماسكة ومتعاضدة، حافظة لصلة الرحم عبر الأجيال.'
                : 'Aiming for the family to be an exemplary model, cohesive and supportive, preserving family ties across generations.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services">
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50">
                  {t('home.submitRequest')}
                  <ArrowIcon className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  {t('home.learnMore')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.ourServices')}
            </h2>
            <p className="text-xl text-emerald-600 mb-2">
              {language === 'ar' ? 'Our Services' : 'خدماتنا'}
            </p>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('home.servicesDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="text-center">
                  <div
                    className={`${service.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/services">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                {t('common.viewAll')}
                <ArrowIcon className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('home.ourAchievements')}
            </h2>
            <p className="text-xl text-emerald-200">
              {language === 'ar' ? 'Our Achievements' : 'إنجازاتنا'}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-10 h-10" />
                </div>
                <div className="text-4xl font-bold mb-2">{item.number}</div>
                <div className="text-emerald-100">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('home.aboutFamily')}
              </h2>
              <p className="text-xl text-emerald-600 mb-6">
                {language === 'ar' ? 'About Al-Moosa Family' : 'عن عائلة الموسى'}
              </p>
              <p className="text-gray-600 mb-6">
                {language === 'ar'
                  ? 'عائلة الموسى، من عنيزة بمنطقة القصيم في المملكة العربية السعودية، ملتزمة بالحفاظ على الروابط الأسرية القوية ودعم أفرادها. تعمل جمعية العائلة على الحفاظ على تراثنا مع تبني القيم الحديثة للتعليم والإنجاز وخدمة المجتمع.'
                  : 'The Al-Moosa family, based in Unaizah, Qassim province, Saudi Arabia, is committed to maintaining strong family bonds and supporting its members. Our family association works to preserve our heritage while embracing modern values of education, achievement, and community service.'}
              </p>
              <ul className="space-y-3 mb-8">
                {features.map((item, index) => (
                  <li key={index} className="flex items-center space-x-3 rtl:space-x-reverse">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/about">
                <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                  {language === 'ar' ? 'اقرأ المزيد عنا' : 'Read More About Us'}
                </Button>
              </Link>
            </div>
            <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl p-8 text-center">
              <div className="w-32 h-32 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-6xl">أ</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">عائلة الموسى</h3>
              <p className="text-emerald-600">Al-Moosa Family</p>
              <p className="text-gray-600 mt-4">
                {language === 'ar' ? 'عنيزة، القصيم، المملكة العربية السعودية' : 'Unaizah, Qassim, Saudi Arabia'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('home.joinPortal')}
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            {t('home.joinDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                {t('home.registerNow')}
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                {t('home.alreadyMember')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
