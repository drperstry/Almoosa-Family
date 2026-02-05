'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Plus,
  Edit,
  Trash2,
  Settings,
  ChevronDown,
  ChevronUp,
  GripVertical,
} from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

interface FieldOption {
  value: string;
  label: string;
  labelAr: string;
}

interface FieldConfig {
  _id?: string;
  name: string;
  label: string;
  labelAr: string;
  type: 'text' | 'number' | 'email' | 'phone' | 'date' | 'textarea' | 'select' | 'checkbox' | 'file';
  required: boolean;
  placeholder?: string;
  placeholderAr?: string;
  options?: FieldOption[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
    messageAr?: string;
  };
  order: number;
}

interface SubType {
  _id?: string;
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
  order: number;
  subTypes: SubType[];
}

const iconOptions = [
  'Heart', 'DollarSign', 'Calendar', 'HandHeart', 'Users', 'Award',
  'BookOpen', 'Building', 'Gift', 'GraduationCap', 'Home', 'Briefcase',
];

const fieldTypes = [
  { value: 'text', label: 'Text', labelAr: 'نص' },
  { value: 'number', label: 'Number', labelAr: 'رقم' },
  { value: 'email', label: 'Email', labelAr: 'بريد إلكتروني' },
  { value: 'phone', label: 'Phone', labelAr: 'هاتف' },
  { value: 'date', label: 'Date', labelAr: 'تاريخ' },
  { value: 'textarea', label: 'Text Area', labelAr: 'منطقة نص' },
  { value: 'select', label: 'Dropdown', labelAr: 'قائمة منسدلة' },
  { value: 'checkbox', label: 'Checkbox', labelAr: 'مربع اختيار' },
  { value: 'file', label: 'File Upload', labelAr: 'رفع ملف' },
];

export default function RequestTypesPage() {
  const { language } = useLanguage();
  const [requestTypes, setRequestTypes] = useState<RequestType[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedType, setExpandedType] = useState<string | null>(null);
  const [expandedSubType, setExpandedSubType] = useState<string | null>(null);

  // Dialogs
  const [typeDialogOpen, setTypeDialogOpen] = useState(false);
  const [subTypeDialogOpen, setSubTypeDialogOpen] = useState(false);
  const [fieldDialogOpen, setFieldDialogOpen] = useState(false);

  // Current editing
  const [currentType, setCurrentType] = useState<Partial<RequestType> | null>(null);
  const [currentSubType, setCurrentSubType] = useState<Partial<SubType> | null>(null);
  const [currentField, setCurrentField] = useState<Partial<FieldConfig> | null>(null);
  const [parentTypeId, setParentTypeId] = useState<string | null>(null);
  const [parentSubTypeId, setParentSubTypeId] = useState<string | null>(null);

  useEffect(() => {
    fetchRequestTypes();
  }, []);

  const fetchRequestTypes = async () => {
    try {
      const res = await fetch('/api/request-types');
      const data = await res.json();
      setRequestTypes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching request types:', error);
    } finally {
      setLoading(false);
    }
  };

  // Request Type CRUD
  const openTypeDialog = (type?: RequestType) => {
    setCurrentType(type || {
      name: '',
      nameAr: '',
      description: '',
      descriptionAr: '',
      icon: 'FileText',
      color: '#059669',
      isActive: true,
      order: requestTypes.length + 1,
    });
    setTypeDialogOpen(true);
  };

  const saveType = async () => {
    if (!currentType) return;

    try {
      const method = currentType._id ? 'PUT' : 'POST';
      const url = currentType._id
        ? `/api/request-types/${currentType._id}`
        : '/api/request-types';

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentType),
      });

      fetchRequestTypes();
      setTypeDialogOpen(false);
    } catch (error) {
      console.error('Error saving request type:', error);
    }
  };

  const deleteType = async (id: string) => {
    if (!confirm(language === 'ar' ? 'هل أنت متأكد من الحذف؟' : 'Are you sure you want to delete?')) return;

    try {
      await fetch(`/api/request-types/${id}`, { method: 'DELETE' });
      fetchRequestTypes();
    } catch (error) {
      console.error('Error deleting request type:', error);
    }
  };

  // SubType CRUD
  const openSubTypeDialog = (typeId: string, subType?: SubType) => {
    setParentTypeId(typeId);
    setCurrentSubType(subType || {
      name: '',
      nameAr: '',
      description: '',
      descriptionAr: '',
      isActive: true,
      fields: [],
    });
    setSubTypeDialogOpen(true);
  };

  const saveSubType = async () => {
    if (!currentSubType || !parentTypeId) return;

    try {
      const method = currentSubType._id ? 'PUT' : 'POST';
      const url = currentSubType._id
        ? `/api/request-types/${parentTypeId}/subtypes/${currentSubType._id}`
        : `/api/request-types/${parentTypeId}/subtypes`;

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentSubType),
      });

      fetchRequestTypes();
      setSubTypeDialogOpen(false);
    } catch (error) {
      console.error('Error saving subtype:', error);
    }
  };

  const deleteSubType = async (typeId: string, subTypeId: string) => {
    if (!confirm(language === 'ar' ? 'هل أنت متأكد من الحذف؟' : 'Are you sure you want to delete?')) return;

    try {
      await fetch(`/api/request-types/${typeId}/subtypes/${subTypeId}`, { method: 'DELETE' });
      fetchRequestTypes();
    } catch (error) {
      console.error('Error deleting subtype:', error);
    }
  };

  // Field CRUD
  const openFieldDialog = (typeId: string, subTypeId: string, field?: FieldConfig) => {
    setParentTypeId(typeId);
    setParentSubTypeId(subTypeId);

    const type = requestTypes.find(t => t._id === typeId);
    const subType = type?.subTypes.find(st => st._id === subTypeId);

    setCurrentField(field || {
      name: '',
      label: '',
      labelAr: '',
      type: 'text',
      required: false,
      order: (subType?.fields.length || 0) + 1,
    });
    setFieldDialogOpen(true);
  };

  const saveField = async () => {
    if (!currentField || !parentTypeId || !parentSubTypeId) return;

    try {
      const type = requestTypes.find(t => t._id === parentTypeId);
      const subType = type?.subTypes.find(st => st._id === parentSubTypeId);

      if (!subType) return;

      let updatedFields: FieldConfig[];
      if (currentField._id) {
        updatedFields = subType.fields.map(f =>
          f._id === currentField._id ? currentField as FieldConfig : f
        );
      } else {
        updatedFields = [...subType.fields, currentField as FieldConfig];
      }

      await fetch(`/api/request-types/${parentTypeId}/subtypes/${parentSubTypeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...subType, fields: updatedFields }),
      });

      fetchRequestTypes();
      setFieldDialogOpen(false);
    } catch (error) {
      console.error('Error saving field:', error);
    }
  };

  const deleteField = async (typeId: string, subTypeId: string, fieldId: string) => {
    if (!confirm(language === 'ar' ? 'هل أنت متأكد من الحذف؟' : 'Are you sure you want to delete?')) return;

    try {
      const type = requestTypes.find(t => t._id === typeId);
      const subType = type?.subTypes.find(st => st._id === subTypeId);

      if (!subType) return;

      const updatedFields = subType.fields.filter(f => f._id !== fieldId);

      await fetch(`/api/request-types/${typeId}/subtypes/${subTypeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...subType, fields: updatedFields }),
      });

      fetchRequestTypes();
    } catch (error) {
      console.error('Error deleting field:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {language === 'ar' ? 'أنواع الطلبات' : 'Request Types'}
          </h1>
          <p className="text-gray-600 mt-1">
            {language === 'ar' ? 'إدارة أنواع الطلبات والحقول' : 'Manage request types and fields'}
          </p>
        </div>
        <Button onClick={() => openTypeDialog()} className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
          {language === 'ar' ? 'إضافة نوع جديد' : 'Add New Type'}
        </Button>
      </div>

      <div className="space-y-4">
        {requestTypes.map((type) => (
          <Card key={type._id} className="overflow-hidden">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => setExpandedType(expandedType === type._id ? null : type._id)}
            >
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: type.color }}
                >
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {language === 'ar' ? type.nameAr : type.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {type.subTypes.length} {language === 'ar' ? 'نوع فرعي' : 'subtypes'}
                  </p>
                </div>
                <Badge variant={type.isActive ? 'default' : 'secondary'}>
                  {type.isActive
                    ? (language === 'ar' ? 'نشط' : 'Active')
                    : (language === 'ar' ? 'غير نشط' : 'Inactive')}
                </Badge>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => { e.stopPropagation(); openTypeDialog(type); }}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => { e.stopPropagation(); deleteType(type._id); }}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                {expandedType === type._id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </div>

            {expandedType === type._id && (
              <div className="border-t bg-gray-50 p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-gray-700">
                    {language === 'ar' ? 'الأنواع الفرعية' : 'Sub Types'}
                  </h4>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openSubTypeDialog(type._id)}
                  >
                    <Plus className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                    {language === 'ar' ? 'إضافة نوع فرعي' : 'Add Sub Type'}
                  </Button>
                </div>

                <div className="space-y-3">
                  {type.subTypes.map((subType) => (
                    <Card key={subType._id} className="bg-white">
                      <div
                        className="flex items-center justify-between p-3 cursor-pointer"
                        onClick={() => setExpandedSubType(expandedSubType === subType._id ? null : subType._id || null)}
                      >
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <GripVertical className="w-4 h-4 text-gray-400" />
                          <div>
                            <h5 className="font-medium text-gray-800">
                              {language === 'ar' ? subType.nameAr : subType.name}
                            </h5>
                            <p className="text-xs text-gray-500">
                              {subType.fields.length} {language === 'ar' ? 'حقل' : 'fields'}
                            </p>
                          </div>
                          <Badge variant={subType.isActive ? 'default' : 'secondary'} className="text-xs">
                            {subType.isActive
                              ? (language === 'ar' ? 'نشط' : 'Active')
                              : (language === 'ar' ? 'غير نشط' : 'Inactive')}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => { e.stopPropagation(); openSubTypeDialog(type._id, subType); }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => { e.stopPropagation(); deleteSubType(type._id, subType._id!); }}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          {expandedSubType === subType._id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>

                      {expandedSubType === subType._id && (
                        <div className="border-t p-3 bg-gray-50">
                          <div className="flex justify-between items-center mb-3">
                            <h6 className="text-sm font-medium text-gray-600">
                              {language === 'ar' ? 'حقول النموذج' : 'Form Fields'}
                            </h6>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openFieldDialog(type._id, subType._id!)}
                            >
                              <Plus className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
                              {language === 'ar' ? 'إضافة حقل' : 'Add Field'}
                            </Button>
                          </div>

                          <div className="space-y-2">
                            {subType.fields.sort((a, b) => a.order - b.order).map((field) => (
                              <div
                                key={field._id}
                                className="flex items-center justify-between p-2 bg-white rounded border"
                              >
                                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                                  <GripVertical className="w-3 h-3 text-gray-400" />
                                  <div>
                                    <p className="text-sm font-medium">
                                      {language === 'ar' ? field.labelAr : field.label}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {field.type} {field.required && `(${language === 'ar' ? 'مطلوب' : 'required'})`}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => openFieldDialog(type._id, subType._id!, field)}
                                  >
                                    <Edit className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => deleteField(type._id, subType._id!, field._id!)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                            {subType.fields.length === 0 && (
                              <p className="text-sm text-gray-500 text-center py-4">
                                {language === 'ar' ? 'لا توجد حقول. أضف حقلاً جديداً.' : 'No fields. Add a new field.'}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </Card>
                  ))}
                  {type.subTypes.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">
                      {language === 'ar' ? 'لا توجد أنواع فرعية. أضف نوعاً فرعياً جديداً.' : 'No subtypes. Add a new subtype.'}
                    </p>
                  )}
                </div>
              </div>
            )}
          </Card>
        ))}

        {requestTypes.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-gray-500 mb-4">
              {language === 'ar' ? 'لا توجد أنواع طلبات. أضف نوعاً جديداً للبدء.' : 'No request types. Add a new type to get started.'}
            </p>
            <Button onClick={() => openTypeDialog()} className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
              {language === 'ar' ? 'إضافة نوع جديد' : 'Add New Type'}
            </Button>
          </Card>
        )}
      </div>

      {/* Request Type Dialog */}
      <Dialog open={typeDialogOpen} onOpenChange={setTypeDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {currentType?._id
                ? (language === 'ar' ? 'تعديل نوع الطلب' : 'Edit Request Type')
                : (language === 'ar' ? 'إضافة نوع طلب جديد' : 'Add New Request Type')}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{language === 'ar' ? 'الاسم (إنجليزي)' : 'Name (English)'}</Label>
                <Input
                  value={currentType?.name || ''}
                  onChange={(e) => setCurrentType({ ...currentType, name: e.target.value })}
                />
              </div>
              <div>
                <Label>{language === 'ar' ? 'الاسم (عربي)' : 'Name (Arabic)'}</Label>
                <Input
                  value={currentType?.nameAr || ''}
                  onChange={(e) => setCurrentType({ ...currentType, nameAr: e.target.value })}
                  dir="rtl"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{language === 'ar' ? 'الوصف (إنجليزي)' : 'Description (English)'}</Label>
                <Textarea
                  value={currentType?.description || ''}
                  onChange={(e) => setCurrentType({ ...currentType, description: e.target.value })}
                />
              </div>
              <div>
                <Label>{language === 'ar' ? 'الوصف (عربي)' : 'Description (Arabic)'}</Label>
                <Textarea
                  value={currentType?.descriptionAr || ''}
                  onChange={(e) => setCurrentType({ ...currentType, descriptionAr: e.target.value })}
                  dir="rtl"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{language === 'ar' ? 'الأيقونة' : 'Icon'}</Label>
                <Select
                  value={currentType?.icon || 'FileText'}
                  onValueChange={(value) => setCurrentType({ ...currentType, icon: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((icon) => (
                      <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>{language === 'ar' ? 'اللون' : 'Color'}</Label>
                <Input
                  type="color"
                  value={currentType?.color || '#059669'}
                  onChange={(e) => setCurrentType({ ...currentType, color: e.target.value })}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <input
                type="checkbox"
                id="typeActive"
                checked={currentType?.isActive ?? true}
                onChange={(e) => setCurrentType({ ...currentType, isActive: e.target.checked })}
              />
              <Label htmlFor="typeActive">{language === 'ar' ? 'نشط' : 'Active'}</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTypeDialogOpen(false)}>
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button onClick={saveType} className="bg-emerald-600 hover:bg-emerald-700">
              {language === 'ar' ? 'حفظ' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* SubType Dialog */}
      <Dialog open={subTypeDialogOpen} onOpenChange={setSubTypeDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {currentSubType?._id
                ? (language === 'ar' ? 'تعديل النوع الفرعي' : 'Edit Sub Type')
                : (language === 'ar' ? 'إضافة نوع فرعي جديد' : 'Add New Sub Type')}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{language === 'ar' ? 'الاسم (إنجليزي)' : 'Name (English)'}</Label>
                <Input
                  value={currentSubType?.name || ''}
                  onChange={(e) => setCurrentSubType({ ...currentSubType, name: e.target.value })}
                />
              </div>
              <div>
                <Label>{language === 'ar' ? 'الاسم (عربي)' : 'Name (Arabic)'}</Label>
                <Input
                  value={currentSubType?.nameAr || ''}
                  onChange={(e) => setCurrentSubType({ ...currentSubType, nameAr: e.target.value })}
                  dir="rtl"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{language === 'ar' ? 'الوصف (إنجليزي)' : 'Description (English)'}</Label>
                <Textarea
                  value={currentSubType?.description || ''}
                  onChange={(e) => setCurrentSubType({ ...currentSubType, description: e.target.value })}
                />
              </div>
              <div>
                <Label>{language === 'ar' ? 'الوصف (عربي)' : 'Description (Arabic)'}</Label>
                <Textarea
                  value={currentSubType?.descriptionAr || ''}
                  onChange={(e) => setCurrentSubType({ ...currentSubType, descriptionAr: e.target.value })}
                  dir="rtl"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <input
                type="checkbox"
                id="subTypeActive"
                checked={currentSubType?.isActive ?? true}
                onChange={(e) => setCurrentSubType({ ...currentSubType, isActive: e.target.checked })}
              />
              <Label htmlFor="subTypeActive">{language === 'ar' ? 'نشط' : 'Active'}</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSubTypeDialogOpen(false)}>
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button onClick={saveSubType} className="bg-emerald-600 hover:bg-emerald-700">
              {language === 'ar' ? 'حفظ' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Field Dialog */}
      <Dialog open={fieldDialogOpen} onOpenChange={setFieldDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {currentField?._id
                ? (language === 'ar' ? 'تعديل الحقل' : 'Edit Field')
                : (language === 'ar' ? 'إضافة حقل جديد' : 'Add New Field')}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>{language === 'ar' ? 'اسم الحقل (للنظام)' : 'Field Name (System)'}</Label>
              <Input
                value={currentField?.name || ''}
                onChange={(e) => setCurrentField({ ...currentField, name: e.target.value.replace(/\s/g, '') })}
                placeholder="fieldName"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{language === 'ar' ? 'التسمية (إنجليزي)' : 'Label (English)'}</Label>
                <Input
                  value={currentField?.label || ''}
                  onChange={(e) => setCurrentField({ ...currentField, label: e.target.value })}
                />
              </div>
              <div>
                <Label>{language === 'ar' ? 'التسمية (عربي)' : 'Label (Arabic)'}</Label>
                <Input
                  value={currentField?.labelAr || ''}
                  onChange={(e) => setCurrentField({ ...currentField, labelAr: e.target.value })}
                  dir="rtl"
                />
              </div>
            </div>
            <div>
              <Label>{language === 'ar' ? 'نوع الحقل' : 'Field Type'}</Label>
              <Select
                value={currentField?.type || 'text'}
                onValueChange={(value: FieldConfig['type']) => setCurrentField({ ...currentField, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fieldTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {language === 'ar' ? type.labelAr : type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {currentField?.type === 'select' && (
              <div>
                <Label>{language === 'ar' ? 'الخيارات (JSON)' : 'Options (JSON)'}</Label>
                <Textarea
                  value={JSON.stringify(currentField?.options || [], null, 2)}
                  onChange={(e) => {
                    try {
                      const options = JSON.parse(e.target.value);
                      setCurrentField({ ...currentField, options });
                    } catch {}
                  }}
                  placeholder='[{"value": "opt1", "label": "Option 1", "labelAr": "خيار 1"}]'
                  rows={4}
                />
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{language === 'ar' ? 'نص توضيحي (إنجليزي)' : 'Placeholder (English)'}</Label>
                <Input
                  value={currentField?.placeholder || ''}
                  onChange={(e) => setCurrentField({ ...currentField, placeholder: e.target.value })}
                />
              </div>
              <div>
                <Label>{language === 'ar' ? 'نص توضيحي (عربي)' : 'Placeholder (Arabic)'}</Label>
                <Input
                  value={currentField?.placeholderAr || ''}
                  onChange={(e) => setCurrentField({ ...currentField, placeholderAr: e.target.value })}
                  dir="rtl"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <input
                type="checkbox"
                id="fieldRequired"
                checked={currentField?.required ?? false}
                onChange={(e) => setCurrentField({ ...currentField, required: e.target.checked })}
              />
              <Label htmlFor="fieldRequired">{language === 'ar' ? 'حقل مطلوب' : 'Required Field'}</Label>
            </div>
            <div>
              <Label>{language === 'ar' ? 'الترتيب' : 'Order'}</Label>
              <Input
                type="number"
                value={currentField?.order || 1}
                onChange={(e) => setCurrentField({ ...currentField, order: parseInt(e.target.value) || 1 })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFieldDialogOpen(false)}>
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button onClick={saveField} className="bg-emerald-600 hover:bg-emerald-700">
              {language === 'ar' ? 'حفظ' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
