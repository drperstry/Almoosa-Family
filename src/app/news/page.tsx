'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Calendar, Newspaper } from 'lucide-react';
import { formatDate, formatDateEn } from '@/lib/utils';

interface News {
  _id: string;
  title: string;
  titleAr: string;
  content: string;
  contentAr: string;
  category: string;
  imageUrl?: string;
  isPublished: boolean;
  createdAt: string;
}

const defaultNews = [
  {
    _id: '1',
    title: 'Family Gathering 2024',
    titleAr: 'تجمع العائلة 2024',
    content: 'The annual family gathering was held with great success, bringing together over 200 family members.',
    contentAr: 'أقيم التجمع السنوي للعائلة بنجاح كبير، حيث جمع أكثر من 200 فرد من أفراد العائلة.',
    category: 'events',
    isPublished: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: '2',
    title: 'Honoring Graduates',
    titleAr: 'تكريم الخريجين',
    content: 'The family association honored 15 graduates who achieved academic excellence this year.',
    contentAr: 'كرمت جمعية العائلة 15 خريجاً حققوا التفوق الأكاديمي هذا العام.',
    category: 'achievements',
    isPublished: true,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: '3',
    title: 'Charity Campaign Success',
    titleAr: 'نجاح حملة التبرعات',
    content: 'The charity campaign raised significant funds to support family members in need.',
    contentAr: 'جمعت حملة التبرعات أموالاً كبيرة لدعم أفراد العائلة المحتاجين.',
    category: 'charity',
    isPublished: true,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const categories = {
  events: { en: 'Events', ar: 'فعاليات', color: 'bg-blue-500' },
  achievements: { en: 'Achievements', ar: 'إنجازات', color: 'bg-green-500' },
  charity: { en: 'Charity', ar: 'تبرعات', color: 'bg-purple-500' },
  announcements: { en: 'Announcements', ar: 'إعلانات', color: 'bg-yellow-500' },
};

export default function NewsPage() {
  const { language } = useLanguage();
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await fetch('/api/news');
      const data = await res.json();
      setNews(Array.isArray(data) && data.length > 0 ? data.filter((n: News) => n.isPublished) : defaultNews);
    } catch (error) {
      console.error('Error fetching news:', error);
      setNews(defaultNews);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryInfo = (category: string) => {
    return categories[category as keyof typeof categories] || { en: category, ar: category, color: 'bg-gray-500' };
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="wave-bg text-white py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {language === 'ar' ? 'الأخبار والفعاليات' : 'News & Events'}
            </h1>
            <p className="text-xl text-emerald-100">
              {language === 'ar' ? 'آخر أخبار وفعاليات العائلة' : 'Latest family news and events'}
            </p>
          </div>
        </div>
      </section>

      <main className="flex-1 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
          ) : news.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item) => {
                const categoryInfo = getCategoryInfo(item.category);
                return (
                  <Card key={item._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    {item.imageUrl && (
                      <div className="h-48 bg-gray-200">
                        <img
                          src={item.imageUrl}
                          alt={language === 'ar' ? item.titleAr : item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    {!item.imageUrl && (
                      <div className="h-48 bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                        <Newspaper className="w-16 h-16 text-white/50" />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={`${categoryInfo.color} text-white`}>
                          {language === 'ar' ? categoryInfo.ar : categoryInfo.en}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                          {language === 'ar' ? formatDate(item.createdAt) : formatDateEn(item.createdAt)}
                        </div>
                      </div>
                      <CardTitle className="text-xl">
                        {language === 'ar' ? item.titleAr : item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 line-clamp-3">
                        {language === 'ar' ? item.contentAr : item.content}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {language === 'ar' ? 'لا توجد أخبار حالياً' : 'No News Available'}
              </h3>
              <p className="text-gray-500">
                {language === 'ar' ? 'تابعونا لآخر الأخبار والتحديثات' : 'Stay tuned for the latest news and updates'}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
