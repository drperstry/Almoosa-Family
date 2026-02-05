'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
} from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { formatDate, formatDateEn } from '@/lib/utils';

interface Submission {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  requestType: {
    _id: string;
    name: string;
    nameAr: string;
  };
  subType: {
    _id: string;
    name: string;
    nameAr: string;
  };
  formData: { [key: string]: string | boolean };
  status: 'pending' | 'in_review' | 'approved' | 'rejected';
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

const statusConfig = {
  pending: { en: 'Pending', ar: 'قيد الانتظار', color: 'bg-yellow-500', icon: Clock },
  in_review: { en: 'In Review', ar: 'قيد المراجعة', color: 'bg-blue-500', icon: Eye },
  approved: { en: 'Approved', ar: 'موافق عليه', color: 'bg-green-500', icon: CheckCircle },
  rejected: { en: 'Rejected', ar: 'مرفوض', color: 'bg-red-500', icon: XCircle },
};

export default function SubmissionsPage() {
  const { language } = useLanguage();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [newStatus, setNewStatus] = useState<string>('');

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await fetch('/api/submissions');
      const data = await res.json();
      setSubmissions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const openSubmissionDialog = (submission: Submission) => {
    setSelectedSubmission(submission);
    setAdminNotes(submission.adminNotes || '');
    setNewStatus(submission.status);
    setDialogOpen(true);
  };

  const updateSubmission = async () => {
    if (!selectedSubmission) return;

    try {
      await fetch(`/api/submissions/${selectedSubmission._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          adminNotes,
        }),
      });

      fetchSubmissions();
      setDialogOpen(false);
    } catch (error) {
      console.error('Error updating submission:', error);
    }
  };

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      submission.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.user?.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
          {language === 'ar' ? 'الطلبات المقدمة' : 'Submissions'}
        </h1>
        <p className="text-gray-600 mt-1">
          {language === 'ar' ? 'إدارة ومراجعة الطلبات' : 'Manage and review submissions'}
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder={language === 'ar' ? 'البحث بالاسم أو البريد...' : 'Search by name or email...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rtl:pr-10 rtl:pl-4"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {language === 'ar' ? 'جميع الحالات' : 'All Status'}
                  </SelectItem>
                  {Object.entries(statusConfig).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {language === 'ar' ? value.ar : value.en}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {Object.entries(statusConfig).map(([status, config]) => {
          const count = submissions.filter((s) => s.status === status).length;
          const StatusIcon = config.icon;
          return (
            <Card
              key={status}
              className={`cursor-pointer transition-shadow hover:shadow-md ${statusFilter === status ? 'ring-2 ring-emerald-500' : ''}`}
              onClick={() => setStatusFilter(statusFilter === status ? 'all' : status)}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    {language === 'ar' ? config.ar : config.en}
                  </p>
                  <p className="text-2xl font-bold">{count}</p>
                </div>
                <div className={`${config.color} p-2 rounded-lg`}>
                  <StatusIcon className="w-5 h-5 text-white" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Submissions List */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'ar' ? 'قائمة الطلبات' : 'Submissions List'}
            <span className="text-sm font-normal text-gray-500 ml-2 rtl:mr-2 rtl:ml-0">
              ({filteredSubmissions.length})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredSubmissions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left rtl:text-right px-4 py-3 text-sm font-medium text-gray-600">
                      {language === 'ar' ? 'المستخدم' : 'User'}
                    </th>
                    <th className="text-left rtl:text-right px-4 py-3 text-sm font-medium text-gray-600">
                      {language === 'ar' ? 'نوع الطلب' : 'Request Type'}
                    </th>
                    <th className="text-left rtl:text-right px-4 py-3 text-sm font-medium text-gray-600">
                      {language === 'ar' ? 'الحالة' : 'Status'}
                    </th>
                    <th className="text-left rtl:text-right px-4 py-3 text-sm font-medium text-gray-600">
                      {language === 'ar' ? 'التاريخ' : 'Date'}
                    </th>
                    <th className="text-left rtl:text-right px-4 py-3 text-sm font-medium text-gray-600">
                      {language === 'ar' ? 'الإجراءات' : 'Actions'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredSubmissions.map((submission) => {
                    const statusInfo = statusConfig[submission.status];
                    return (
                      <tr key={submission._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium text-gray-900">{submission.user?.name || 'N/A'}</p>
                            <p className="text-sm text-gray-500">{submission.user?.email || 'N/A'}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium text-gray-900">
                              {language === 'ar' ? submission.requestType?.nameAr : submission.requestType?.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {language === 'ar' ? submission.subType?.nameAr : submission.subType?.name}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge className={`${statusInfo.color} text-white`}>
                            {language === 'ar' ? statusInfo.ar : statusInfo.en}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {language === 'ar' ? formatDate(submission.createdAt) : formatDateEn(submission.createdAt)}
                        </td>
                        <td className="px-4 py-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openSubmissionDialog(submission)}
                          >
                            <Eye className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                            {language === 'ar' ? 'عرض' : 'View'}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {language === 'ar' ? 'لا توجد طلبات' : 'No submissions found'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Submission Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {language === 'ar' ? 'تفاصيل الطلب' : 'Submission Details'}
            </DialogTitle>
          </DialogHeader>

          {selectedSubmission && (
            <div className="space-y-6">
              {/* User Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">
                  {language === 'ar' ? 'معلومات المستخدم' : 'User Information'}
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">{language === 'ar' ? 'الاسم:' : 'Name:'}</span>
                    <span className="ml-2 rtl:mr-2 rtl:ml-0">{selectedSubmission.user?.name || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">{language === 'ar' ? 'البريد:' : 'Email:'}</span>
                    <span className="ml-2 rtl:mr-2 rtl:ml-0">{selectedSubmission.user?.email || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Request Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">
                  {language === 'ar' ? 'نوع الطلب' : 'Request Type'}
                </h4>
                <div className="text-sm">
                  <p>
                    <span className="text-gray-500">{language === 'ar' ? 'النوع:' : 'Type:'}</span>
                    <span className="ml-2 rtl:mr-2 rtl:ml-0">
                      {language === 'ar' ? selectedSubmission.requestType?.nameAr : selectedSubmission.requestType?.name}
                    </span>
                  </p>
                  <p>
                    <span className="text-gray-500">{language === 'ar' ? 'النوع الفرعي:' : 'Sub Type:'}</span>
                    <span className="ml-2 rtl:mr-2 rtl:ml-0">
                      {language === 'ar' ? selectedSubmission.subType?.nameAr : selectedSubmission.subType?.name}
                    </span>
                  </p>
                </div>
              </div>

              {/* Form Data */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">
                  {language === 'ar' ? 'بيانات النموذج' : 'Form Data'}
                </h4>
                <div className="space-y-2 text-sm">
                  {Object.entries(selectedSubmission.formData).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b pb-2">
                      <span className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                      <span className="font-medium">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Update */}
              <div className="space-y-4">
                <div>
                  <Label>{language === 'ar' ? 'الحالة' : 'Status'}</Label>
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(statusConfig).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {language === 'ar' ? value.ar : value.en}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>{language === 'ar' ? 'ملاحظات الإدارة' : 'Admin Notes'}</Label>
                  <Textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder={language === 'ar' ? 'أضف ملاحظاتك هنا...' : 'Add your notes here...'}
                    rows={4}
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button onClick={updateSubmission} className="bg-emerald-600 hover:bg-emerald-700">
              {language === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
