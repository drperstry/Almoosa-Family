'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Heart,
  DollarSign,
  Calendar,
  HandHeart,
  FileText,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

interface FieldOption {
  value: string;
  label: string;
  labelAr: string;
}

interface FieldConfig {
  _id: string;
  name: string;
  label: string;
  labelAr: string;
  type: string;
  required: boolean;
  placeholder?: string;
  placeholderAr?: string;
  options?: FieldOption[];
  order: number;
}

interface SubType {
  _id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  isActive: boolean;
  fields: FieldConfig[];
}

interface RequestType {
  _id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  icon: string;
  color: string;
  isActive: boolean;
  subTypes: SubType[];
}

const iconMap: { [key: string]: React.ElementType } = {
  Heart,
  DollarSign,
  Calendar,
  HandHeart,
  FileText,
};

export default function ServicesPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { language } = useLanguage();

  const [requestTypes, setRequestTypes] = useState<RequestType[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [selectedType, setSelectedType] = useState<RequestType | null>(null);
  const [selectedSubType, setSelectedSubType] = useState<SubType | null>(null);
  const [formData, setFormData] = useState<{ [key: string]: string | boolean }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [step, setStep] = useState<'type' | 'subtype' | 'form'>('type');

  useEffect(() => {
    fetchRequestTypes();
  }, []);

  const fetchRequestTypes = async () => {
    try {
      const res = await fetch('/api/request-types');
      const data = await res.json();
      setRequestTypes(Array.isArray(data) ? data.filter((t: RequestType) => t.isActive) : []);
    } catch (error) {
      console.error('Error fetching request types:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTypeSelect = (type: RequestType) => {
    setSelectedType(type);
    setSelectedSubType(null);
    setFormData({});
    setErrors({});
    setSubmitStatus('idle');
    setStep('subtype');
  };

  const handleSubTypeSelect = (subType: SubType) => {
    setSelectedSubType(subType);
    setFormData({});
    setErrors({});
    setSubmitStatus('idle');
    setStep('form');
  };

  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = (): boolean => {
    if (!selectedSubType) return false;

    const newErrors: { [key: string]: string } = {};

    selectedSubType.fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = language === 'ar' ? 'هذا الحقل مطلوب' : 'This field is required';
      }

      if (field.type === 'email' && formData[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.name] as string)) {
          newErrors[field.name] = language === 'ar' ? 'بريد إلكتروني غير صالح' : 'Invalid email address';
        }
      }

      if (field.type === 'phone' && formData[field.name]) {
        const phoneRegex = /^[\d\s+()-]{10,}$/;
        if (!phoneRegex.test(formData[field.name] as string)) {
          newErrors[field.name] = language === 'ar' ? 'رقم هاتف غير صالح' : 'Invalid phone number';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      router.push('/login');
      return;
    }

    if (!validateForm()) return;

    setSubmitting(true);

    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestType: selectedType?._id,
          subType: selectedSubType?._id,
          formData,
        }),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setSubmitStatus('success');
      setFormData({});
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  const goBack = () => {
    if (step === 'form') {
      setStep('subtype');
      setSelectedSubType(null);
    } else if (step === 'subtype') {
      setStep('type');
      setSelectedType(null);
    }
    setSubmitStatus('idle');
  };

  const renderField = (field: FieldConfig) => {
    const label = language === 'ar' ? field.labelAr : field.label;
    const placeholder = language === 'ar' ? field.placeholderAr : field.placeholder;
    const error = errors[field.name];

    const commonProps = {
      id: field.name,
      placeholder,
      className: error ? 'border-red-500' : '',
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
        return (
          <Input
            {...commonProps}
            type={field.type === 'phone' ? 'tel' : field.type}
            value={(formData[field.name] as string) || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
          />
        );

      case 'number':
        return (
          <Input
            {...commonProps}
            type="number"
            value={(formData[field.name] as string) || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
          />
        );

      case 'date':
        return (
          <Input
            {...commonProps}
            type="date"
            value={(formData[field.name] as string) || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
          />
        );

      case 'textarea':
        return (
          <Textarea
            {...commonProps}
            value={(formData[field.name] as string) || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            rows={4}
          />
        );

      case 'select':
        return (
          <Select
            value={(formData[field.name] as string) || ''}
            onValueChange={(value) => handleInputChange(field.name, value)}
          >
            <SelectTrigger className={error ? 'border-red-500' : ''}>
              <SelectValue placeholder={placeholder || (language === 'ar' ? 'اختر...' : 'Select...')} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {language === 'ar' ? option.labelAr : option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'checkbox':
        return (
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <input
              type="checkbox"
              id={field.name}
              checked={!!formData[field.name]}
              onChange={(e) => handleInputChange(field.name, e.target.checked)}
              className="w-4 h-4 rounded border-gray-300"
            />
            <Label htmlFor={field.name} className="text-sm font-normal">
              {label}
            </Label>
          </div>
        );

      case 'file':
        return (
          <Input
            {...commonProps}
            type="file"
            onChange={(e) => handleInputChange(field.name, e.target.files?.[0]?.name || '')}
          />
        );

      default:
        return (
          <Input
            {...commonProps}
            type="text"
            value={(formData[field.name] as string) || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-emerald-600 mx-auto" />
            <p className="mt-4 text-gray-600">
              {language === 'ar' ? 'جاري التحميل...' : 'Loading...'}
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {language === 'ar' ? 'الخدمات والطلبات' : 'Services & Requests'}
            </h1>
            <p className="text-lg text-emerald-600">
              {language === 'ar' ? 'قدم طلبك بسهولة' : 'Submit your request easily'}
            </p>
          </div>

          {/* Steps Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className={`flex items-center ${step === 'type' ? 'text-emerald-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'type' ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="ml-2 rtl:mr-2 rtl:ml-0 text-sm hidden sm:inline">
                {language === 'ar' ? 'نوع الطلب' : 'Request Type'}
              </span>
            </div>
            <div className="w-12 h-0.5 bg-gray-200 mx-2"></div>
            <div className={`flex items-center ${step === 'subtype' ? 'text-emerald-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'subtype' ? 'bg-emerald-600 text-white' : step === 'form' ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="ml-2 rtl:mr-2 rtl:ml-0 text-sm hidden sm:inline">
                {language === 'ar' ? 'النوع الفرعي' : 'Sub Type'}
              </span>
            </div>
            <div className="w-12 h-0.5 bg-gray-200 mx-2"></div>
            <div className={`flex items-center ${step === 'form' ? 'text-emerald-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'form' ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span className="ml-2 rtl:mr-2 rtl:ml-0 text-sm hidden sm:inline">
                {language === 'ar' ? 'تعبئة النموذج' : 'Fill Form'}
              </span>
            </div>
          </div>

          {/* Back Button */}
          {step !== 'type' && submitStatus !== 'success' && (
            <Button
              variant="ghost"
              onClick={goBack}
              className="mb-4"
            >
              {language === 'ar' ? (
                <>
                  <ArrowRight className="w-4 h-4 ml-2" />
                  رجوع
                </>
              ) : (
                <>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </>
              )}
            </Button>
          )}

          {/* Step 1: Select Request Type */}
          {step === 'type' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {requestTypes.map((type) => {
                const IconComponent = iconMap[type.icon] || FileText;
                return (
                  <Card
                    key={type._id}
                    className="cursor-pointer hover:shadow-lg transition-all hover:border-emerald-300"
                    onClick={() => handleTypeSelect(type)}
                  >
                    <CardHeader className="text-center">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{ backgroundColor: type.color }}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle>{language === 'ar' ? type.nameAr : type.name}</CardTitle>
                      <CardDescription>
                        {language === 'ar' ? type.descriptionAr : type.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm text-gray-500">
                        {type.subTypes.filter(st => st.isActive).length} {language === 'ar' ? 'نوع فرعي متاح' : 'subtypes available'}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
              {requestTypes.length === 0 && (
                <div className="col-span-2 text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {language === 'ar' ? 'لا توجد خدمات متاحة حالياً' : 'No services available at the moment'}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Select Sub Type */}
          {step === 'subtype' && selectedType && (
            <div>
              <Card className="mb-6 bg-emerald-50 border-emerald-200">
                <CardContent className="flex items-center py-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-4 rtl:ml-4 rtl:mr-0"
                    style={{ backgroundColor: selectedType.color }}
                  >
                    {(() => {
                      const IconComponent = iconMap[selectedType.icon] || FileText;
                      return <IconComponent className="w-6 h-6 text-white" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {language === 'ar' ? selectedType.nameAr : selectedType.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {language === 'ar' ? 'اختر النوع الفرعي' : 'Select a sub type'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedType.subTypes.filter(st => st.isActive).map((subType) => (
                  <Card
                    key={subType._id}
                    className="cursor-pointer hover:shadow-lg transition-all hover:border-emerald-300"
                    onClick={() => handleSubTypeSelect(subType)}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {language === 'ar' ? subType.nameAr : subType.name}
                      </CardTitle>
                      <CardDescription>
                        {language === 'ar' ? subType.descriptionAr : subType.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-gray-500">
                        {subType.fields.length} {language === 'ar' ? 'حقل للتعبئة' : 'fields to fill'}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Form */}
          {step === 'form' && selectedSubType && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'ar' ? selectedSubType.nameAr : selectedSubType.name}
                </CardTitle>
                <CardDescription>
                  {language === 'ar' ? selectedSubType.descriptionAr : selectedSubType.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitStatus === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {language === 'ar' ? 'تم تقديم طلبك بنجاح!' : 'Request Submitted Successfully!'}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {language === 'ar'
                        ? 'سيتم مراجعة طلبك والرد عليك في أقرب وقت.'
                        : 'Your request will be reviewed and you will be contacted soon.'}
                    </p>
                    <div className="flex justify-center gap-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setStep('type');
                          setSelectedType(null);
                          setSelectedSubType(null);
                          setSubmitStatus('idle');
                        }}
                      >
                        {language === 'ar' ? 'تقديم طلب آخر' : 'Submit Another Request'}
                      </Button>
                      <Button
                        onClick={() => router.push('/profile')}
                        className="bg-emerald-600 hover:bg-emerald-700"
                      >
                        {language === 'ar' ? 'عرض طلباتي' : 'View My Requests'}
                      </Button>
                    </div>
                  </div>
                ) : submitStatus === 'error' ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <AlertCircle className="w-10 h-10 text-red-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {language === 'ar' ? 'حدث خطأ!' : 'An Error Occurred!'}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {language === 'ar'
                        ? 'يرجى المحاولة مرة أخرى لاحقاً.'
                        : 'Please try again later.'}
                    </p>
                    <Button
                      onClick={() => setSubmitStatus('idle')}
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      {language === 'ar' ? 'حاول مرة أخرى' : 'Try Again'}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {!session && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                        <p className="text-yellow-800 text-sm">
                          {language === 'ar'
                            ? 'يجب تسجيل الدخول لتقديم الطلب.'
                            : 'You must be logged in to submit a request.'}
                          {' '}
                          <a href="/login" className="text-emerald-600 hover:underline font-medium">
                            {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
                          </a>
                        </p>
                      </div>
                    )}

                    {selectedSubType.fields
                      .sort((a, b) => a.order - b.order)
                      .map((field) => (
                        <div key={field._id} className="space-y-2">
                          {field.type !== 'checkbox' && (
                            <Label htmlFor={field.name}>
                              {language === 'ar' ? field.labelAr : field.label}
                              {field.required && <span className="text-red-500 ml-1">*</span>}
                            </Label>
                          )}
                          {renderField(field)}
                          {errors[field.name] && (
                            <p className="text-red-500 text-sm">{errors[field.name]}</p>
                          )}
                        </div>
                      ))}

                    <Button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                      disabled={submitting || !session}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 animate-spin" />
                          {language === 'ar' ? 'جاري التقديم...' : 'Submitting...'}
                        </>
                      ) : (
                        language === 'ar' ? 'تقديم الطلب' : 'Submit Request'
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
