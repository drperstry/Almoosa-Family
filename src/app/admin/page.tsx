'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, ClipboardList, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

interface DashboardStats {
  totalUsers: number;
  totalSubmissions: number;
  pendingSubmissions: number;
  approvedSubmissions: number;
  rejectedSubmissions: number;
  activeRequestTypes: number;
}

export default function AdminDashboard() {
  const { language } = useLanguage();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalSubmissions: 0,
    pendingSubmissions: 0,
    approvedSubmissions: 0,
    rejectedSubmissions: 0,
    activeRequestTypes: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [usersRes, submissionsRes, typesRes] = await Promise.all([
        fetch('/api/users'),
        fetch('/api/submissions'),
        fetch('/api/request-types'),
      ]);

      const users = await usersRes.json();
      const submissions = await submissionsRes.json();
      const types = await typesRes.json();

      const usersData = Array.isArray(users) ? users : [];
      const submissionsData = Array.isArray(submissions) ? submissions : [];
      const typesData = Array.isArray(types) ? types : [];

      setStats({
        totalUsers: usersData.length,
        totalSubmissions: submissionsData.length,
        pendingSubmissions: submissionsData.filter((s: { status: string }) => s.status === 'pending').length,
        approvedSubmissions: submissionsData.filter((s: { status: string }) => s.status === 'approved').length,
        rejectedSubmissions: submissionsData.filter((s: { status: string }) => s.status === 'rejected').length,
        activeRequestTypes: typesData.filter((t: { isActive: boolean }) => t.isActive).length,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: language === 'ar' ? 'إجمالي المستخدمين' : 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: language === 'ar' ? 'إجمالي الطلبات' : 'Total Submissions',
      value: stats.totalSubmissions,
      icon: ClipboardList,
      color: 'bg-purple-500',
    },
    {
      title: language === 'ar' ? 'طلبات قيد الانتظار' : 'Pending',
      value: stats.pendingSubmissions,
      icon: Clock,
      color: 'bg-yellow-500',
    },
    {
      title: language === 'ar' ? 'طلبات موافق عليها' : 'Approved',
      value: stats.approvedSubmissions,
      icon: CheckCircle,
      color: 'bg-green-500',
    },
    {
      title: language === 'ar' ? 'طلبات مرفوضة' : 'Rejected',
      value: stats.rejectedSubmissions,
      icon: XCircle,
      color: 'bg-red-500',
    },
    {
      title: language === 'ar' ? 'أنواع الطلبات النشطة' : 'Active Request Types',
      value: stats.activeRequestTypes,
      icon: FileText,
      color: 'bg-emerald-500',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
        </h1>
        <p className="text-gray-600 mt-1">
          {language === 'ar' ? 'نظرة عامة على البوابة' : 'Overview of the portal'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {card.title}
              </CardTitle>
              <div className={`${card.color} p-2 rounded-lg`}>
                <card.icon className="w-5 h-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ar' ? 'الإجراءات السريعة' : 'Quick Actions'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <a
              href="/admin/request-types"
              className="block p-4 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
            >
              <h3 className="font-medium text-emerald-800">
                {language === 'ar' ? 'إدارة أنواع الطلبات' : 'Manage Request Types'}
              </h3>
              <p className="text-sm text-emerald-600">
                {language === 'ar' ? 'إضافة أو تعديل أنواع الطلبات والحقول' : 'Add or edit request types and fields'}
              </p>
            </a>
            <a
              href="/admin/submissions"
              className="block p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <h3 className="font-medium text-blue-800">
                {language === 'ar' ? 'مراجعة الطلبات' : 'Review Submissions'}
              </h3>
              <p className="text-sm text-blue-600">
                {language === 'ar' ? 'مراجعة والموافقة على الطلبات المقدمة' : 'Review and approve submitted requests'}
              </p>
            </a>
            <a
              href="/admin/users"
              className="block p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <h3 className="font-medium text-purple-800">
                {language === 'ar' ? 'إدارة المستخدمين' : 'Manage Users'}
              </h3>
              <p className="text-sm text-purple-600">
                {language === 'ar' ? 'عرض وإدارة حسابات المستخدمين' : 'View and manage user accounts'}
              </p>
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ar' ? 'معلومات النظام' : 'System Information'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">
                {language === 'ar' ? 'الإصدار' : 'Version'}
              </span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">
                {language === 'ar' ? 'قاعدة البيانات' : 'Database'}
              </span>
              <span className="font-medium text-green-600">
                {language === 'ar' ? 'متصل' : 'Connected'}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">
                {language === 'ar' ? 'آخر تحديث' : 'Last Updated'}
              </span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
