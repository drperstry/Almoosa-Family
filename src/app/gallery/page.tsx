'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  _id: string;
  url: string;
  caption?: string;
  captionAr?: string;
}

interface Gallery {
  _id: string;
  title: string;
  titleAr: string;
  description?: string;
  descriptionAr?: string;
  category: string;
  images: GalleryImage[];
  isPublished: boolean;
  createdAt: string;
}

const defaultGalleries: Gallery[] = [
  {
    _id: '1',
    title: 'Family Gathering 2024',
    titleAr: 'تجمع العائلة 2024',
    description: 'Photos from our annual family gathering',
    descriptionAr: 'صور من تجمع العائلة السنوي',
    category: 'events',
    images: [
      { _id: '1', url: '/api/placeholder/800/600', caption: 'Opening ceremony', captionAr: 'حفل الافتتاح' },
      { _id: '2', url: '/api/placeholder/800/600', caption: 'Family photo', captionAr: 'صورة جماعية' },
      { _id: '3', url: '/api/placeholder/800/600', caption: 'Dinner', captionAr: 'حفل العشاء' },
    ],
    isPublished: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: '2',
    title: 'Graduation Ceremony',
    titleAr: 'حفل التخرج',
    description: 'Honoring our graduates',
    descriptionAr: 'تكريم خريجينا',
    category: 'achievements',
    images: [
      { _id: '1', url: '/api/placeholder/800/600', caption: 'Award ceremony', captionAr: 'حفل التكريم' },
      { _id: '2', url: '/api/placeholder/800/600', caption: 'Graduate photos', captionAr: 'صور الخريجين' },
    ],
    isPublished: true,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: '3',
    title: 'Eid Celebration',
    titleAr: 'احتفال العيد',
    description: 'Eid festivities with the family',
    descriptionAr: 'احتفالات العيد مع العائلة',
    category: 'celebrations',
    images: [
      { _id: '1', url: '/api/placeholder/800/600', caption: 'Eid gathering', captionAr: 'تجمع العيد' },
    ],
    isPublished: true,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const categories = {
  events: { en: 'Events', ar: 'فعاليات', color: 'bg-blue-500' },
  achievements: { en: 'Achievements', ar: 'إنجازات', color: 'bg-green-500' },
  celebrations: { en: 'Celebrations', ar: 'احتفالات', color: 'bg-purple-500' },
  meetings: { en: 'Meetings', ar: 'اجتماعات', color: 'bg-yellow-500' },
};

export default function GalleryPage() {
  const { language } = useLanguage();
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      setGalleries(Array.isArray(data) && data.length > 0 ? data.filter((g: Gallery) => g.isPublished) : defaultGalleries);
    } catch (error) {
      console.error('Error fetching galleries:', error);
      setGalleries(defaultGalleries);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryInfo = (category: string) => {
    return categories[category as keyof typeof categories] || { en: category, ar: category, color: 'bg-gray-500' };
  };

  const openLightbox = (gallery: Gallery, imageIndex: number) => {
    setSelectedGallery(gallery);
    setSelectedImageIndex(imageIndex);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    if (selectedGallery) {
      setSelectedImageIndex((prev) =>
        prev < selectedGallery.images.length - 1 ? prev + 1 : 0
      );
    }
  };

  const prevImage = () => {
    if (selectedGallery) {
      setSelectedImageIndex((prev) =>
        prev > 0 ? prev - 1 : selectedGallery.images.length - 1
      );
    }
  };

  const filteredGalleries = activeFilter
    ? galleries.filter((g) => g.category === activeFilter)
    : galleries;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="wave-bg text-white py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {language === 'ar' ? 'معرض الصور' : 'Photo Gallery'}
            </h1>
            <p className="text-xl text-emerald-100">
              {language === 'ar' ? 'لحظات مميزة من فعاليات العائلة' : 'Special moments from family events'}
            </p>
          </div>
        </div>
      </section>

      <main className="flex-1 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            <Button
              variant={activeFilter === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter(null)}
              className={activeFilter === null ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
            >
              {language === 'ar' ? 'الكل' : 'All'}
            </Button>
            {Object.entries(categories).map(([key, value]) => (
              <Button
                key={key}
                variant={activeFilter === key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter(key)}
                className={activeFilter === key ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
              >
                {language === 'ar' ? value.ar : value.en}
              </Button>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
          ) : filteredGalleries.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGalleries.map((gallery) => {
                const categoryInfo = getCategoryInfo(gallery.category);
                return (
                  <Card key={gallery._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div
                      className="relative h-48 bg-gray-200 cursor-pointer group"
                      onClick={() => openLightbox(gallery, 0)}
                    >
                      {gallery.images[0] ? (
                        <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                          <ImageIcon className="w-16 h-16 text-white/50" />
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                          <ImageIcon className="w-16 h-16 text-white/50" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white font-medium">
                          {gallery.images.length} {language === 'ar' ? 'صورة' : 'photos'}
                        </span>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={`${categoryInfo.color} text-white`}>
                          {language === 'ar' ? categoryInfo.ar : categoryInfo.en}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">
                        {language === 'ar' ? gallery.titleAr : gallery.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">
                        {language === 'ar' ? gallery.descriptionAr : gallery.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {language === 'ar' ? 'لا توجد صور حالياً' : 'No Photos Available'}
              </h3>
              <p className="text-gray-500">
                {language === 'ar' ? 'سيتم إضافة صور قريباً' : 'Photos will be added soon'}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black/95">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 rtl:left-4 rtl:right-auto z-50 text-white hover:text-gray-300"
          >
            <X className="w-8 h-8" />
          </button>

          {selectedGallery && (
            <div className="relative">
              <div className="aspect-video bg-gray-900 flex items-center justify-center">
                <ImageIcon className="w-24 h-24 text-gray-600" />
              </div>

              {selectedGallery.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 rounded-full p-2"
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 rounded-full p-2"
                  >
                    <ChevronRight className="w-8 h-8" />
                  </button>
                </>
              )}

              <div className="p-4 text-center text-white">
                <p className="text-lg">
                  {language === 'ar'
                    ? selectedGallery.images[selectedImageIndex]?.captionAr
                    : selectedGallery.images[selectedImageIndex]?.caption}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  {selectedImageIndex + 1} / {selectedGallery.images.length}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
