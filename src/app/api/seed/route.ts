import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import RequestType from '@/models/RequestType';

// Seed initial data - only for development
export async function POST() {
  try {
    await dbConnect();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@almoosa.ws' });
    if (existingAdmin) {
      return NextResponse.json(
        { message: 'Database already seeded' },
        { status: 200 }
      );
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    await User.create({
      name: 'Admin',
      email: 'admin@almoosa.ws',
      password: hashedPassword,
      role: 'admin',
    });

    // Create initial request types
    const requestTypes = [
      {
        name: 'Marriage Assistance',
        nameAr: 'مساعدة الزواج',
        description: 'Request financial assistance for marriage',
        descriptionAr: 'طلب مساعدة مالية للزواج',
        icon: 'Heart',
        color: '#EC4899',
        order: 1,
        subTypes: [
          {
            name: 'Groom Support',
            nameAr: 'دعم العريس',
            description: 'Financial support for groom expenses',
            descriptionAr: 'دعم مالي لمصاريف العريس',
            isActive: true,
            fields: [
              { name: 'fullName', label: 'Full Name', labelAr: 'الاسم الكامل', type: 'text', required: true, order: 1 },
              { name: 'phone', label: 'Phone Number', labelAr: 'رقم الهاتف', type: 'phone', required: true, order: 2 },
              { name: 'nationalId', label: 'National ID', labelAr: 'رقم الهوية', type: 'text', required: true, order: 3 },
              { name: 'weddingDate', label: 'Wedding Date', labelAr: 'تاريخ الزواج', type: 'date', required: true, order: 4 },
              { name: 'requestedAmount', label: 'Requested Amount', labelAr: 'المبلغ المطلوب', type: 'number', required: true, order: 5 },
              { name: 'reason', label: 'Reason for Request', labelAr: 'سبب الطلب', type: 'textarea', required: true, order: 6 },
            ],
          },
          {
            name: 'Bride Support',
            nameAr: 'دعم العروس',
            description: 'Financial support for bride expenses',
            descriptionAr: 'دعم مالي لمصاريف العروس',
            isActive: true,
            fields: [
              { name: 'fullName', label: 'Full Name', labelAr: 'الاسم الكامل', type: 'text', required: true, order: 1 },
              { name: 'phone', label: 'Phone Number', labelAr: 'رقم الهاتف', type: 'phone', required: true, order: 2 },
              { name: 'nationalId', label: 'National ID', labelAr: 'رقم الهوية', type: 'text', required: true, order: 3 },
              { name: 'weddingDate', label: 'Wedding Date', labelAr: 'تاريخ الزواج', type: 'date', required: true, order: 4 },
              { name: 'requestedAmount', label: 'Requested Amount', labelAr: 'المبلغ المطلوب', type: 'number', required: true, order: 5 },
              { name: 'reason', label: 'Reason for Request', labelAr: 'سبب الطلب', type: 'textarea', required: true, order: 6 },
            ],
          },
        ],
      },
      {
        name: 'Financial Aid',
        nameAr: 'المساعدة المالية',
        description: 'Request financial assistance',
        descriptionAr: 'طلب مساعدة مالية',
        icon: 'DollarSign',
        color: '#10B981',
        order: 2,
        subTypes: [
          {
            name: 'Emergency Aid',
            nameAr: 'مساعدة طارئة',
            description: 'Emergency financial support',
            descriptionAr: 'دعم مالي طارئ',
            isActive: true,
            fields: [
              { name: 'fullName', label: 'Full Name', labelAr: 'الاسم الكامل', type: 'text', required: true, order: 1 },
              { name: 'phone', label: 'Phone Number', labelAr: 'رقم الهاتف', type: 'phone', required: true, order: 2 },
              { name: 'nationalId', label: 'National ID', labelAr: 'رقم الهوية', type: 'text', required: true, order: 3 },
              { name: 'emergencyType', label: 'Emergency Type', labelAr: 'نوع الطوارئ', type: 'select', required: true, order: 4, options: [
                { value: 'medical', label: 'Medical', labelAr: 'طبي' },
                { value: 'housing', label: 'Housing', labelAr: 'سكن' },
                { value: 'education', label: 'Education', labelAr: 'تعليم' },
                { value: 'other', label: 'Other', labelAr: 'أخرى' },
              ]},
              { name: 'requestedAmount', label: 'Requested Amount', labelAr: 'المبلغ المطلوب', type: 'number', required: true, order: 5 },
              { name: 'description', label: 'Description', labelAr: 'الوصف', type: 'textarea', required: true, order: 6 },
            ],
          },
          {
            name: 'Monthly Support',
            nameAr: 'دعم شهري',
            description: 'Monthly financial support',
            descriptionAr: 'دعم مالي شهري',
            isActive: true,
            fields: [
              { name: 'fullName', label: 'Full Name', labelAr: 'الاسم الكامل', type: 'text', required: true, order: 1 },
              { name: 'phone', label: 'Phone Number', labelAr: 'رقم الهاتف', type: 'phone', required: true, order: 2 },
              { name: 'nationalId', label: 'National ID', labelAr: 'رقم الهوية', type: 'text', required: true, order: 3 },
              { name: 'familySize', label: 'Family Size', labelAr: 'حجم الأسرة', type: 'number', required: true, order: 4 },
              { name: 'monthlyIncome', label: 'Monthly Income', labelAr: 'الدخل الشهري', type: 'number', required: true, order: 5 },
              { name: 'requestedAmount', label: 'Requested Amount', labelAr: 'المبلغ المطلوب', type: 'number', required: true, order: 6 },
              { name: 'reason', label: 'Reason', labelAr: 'السبب', type: 'textarea', required: true, order: 7 },
            ],
          },
        ],
      },
      {
        name: 'Event Invitation',
        nameAr: 'دعوة للمناسبات',
        description: 'Send invitations to family events',
        descriptionAr: 'إرسال دعوات لمناسبات العائلة',
        icon: 'Calendar',
        color: '#8B5CF6',
        order: 3,
        subTypes: [
          {
            name: 'Wedding Invitation',
            nameAr: 'دعوة زفاف',
            description: 'Invite family members to wedding',
            descriptionAr: 'دعوة أفراد العائلة لحفل الزفاف',
            isActive: true,
            fields: [
              { name: 'hostName', label: 'Host Name', labelAr: 'اسم المضيف', type: 'text', required: true, order: 1 },
              { name: 'phone', label: 'Phone Number', labelAr: 'رقم الهاتف', type: 'phone', required: true, order: 2 },
              { name: 'groomName', label: 'Groom Name', labelAr: 'اسم العريس', type: 'text', required: true, order: 3 },
              { name: 'brideName', label: 'Bride Name', labelAr: 'اسم العروس', type: 'text', required: true, order: 4 },
              { name: 'eventDate', label: 'Event Date', labelAr: 'تاريخ المناسبة', type: 'date', required: true, order: 5 },
              { name: 'venue', label: 'Venue', labelAr: 'المكان', type: 'text', required: true, order: 6 },
              { name: 'additionalInfo', label: 'Additional Information', labelAr: 'معلومات إضافية', type: 'textarea', required: false, order: 7 },
            ],
          },
          {
            name: 'Graduation Celebration',
            nameAr: 'حفل تخرج',
            description: 'Invite family members to graduation',
            descriptionAr: 'دعوة أفراد العائلة لحفل التخرج',
            isActive: true,
            fields: [
              { name: 'graduateName', label: 'Graduate Name', labelAr: 'اسم الخريج', type: 'text', required: true, order: 1 },
              { name: 'phone', label: 'Phone Number', labelAr: 'رقم الهاتف', type: 'phone', required: true, order: 2 },
              { name: 'degree', label: 'Degree', labelAr: 'الدرجة العلمية', type: 'text', required: true, order: 3 },
              { name: 'university', label: 'University', labelAr: 'الجامعة', type: 'text', required: true, order: 4 },
              { name: 'eventDate', label: 'Event Date', labelAr: 'تاريخ المناسبة', type: 'date', required: true, order: 5 },
              { name: 'venue', label: 'Venue', labelAr: 'المكان', type: 'text', required: false, order: 6 },
            ],
          },
        ],
      },
      {
        name: 'Charitable Donation',
        nameAr: 'تبرع خيري',
        description: 'Make a charitable donation',
        descriptionAr: 'تقديم تبرع خيري',
        icon: 'HandHeart',
        color: '#F59E0B',
        order: 4,
        subTypes: [
          {
            name: 'General Donation',
            nameAr: 'تبرع عام',
            description: 'General charitable donation',
            descriptionAr: 'تبرع خيري عام',
            isActive: true,
            fields: [
              { name: 'donorName', label: 'Donor Name', labelAr: 'اسم المتبرع', type: 'text', required: true, order: 1 },
              { name: 'phone', label: 'Phone Number', labelAr: 'رقم الهاتف', type: 'phone', required: true, order: 2 },
              { name: 'email', label: 'Email', labelAr: 'البريد الإلكتروني', type: 'email', required: false, order: 3 },
              { name: 'amount', label: 'Amount', labelAr: 'المبلغ', type: 'number', required: true, order: 4 },
              { name: 'isAnonymous', label: 'Anonymous Donation', labelAr: 'تبرع مجهول', type: 'checkbox', required: false, order: 5 },
              { name: 'message', label: 'Message', labelAr: 'رسالة', type: 'textarea', required: false, order: 6 },
            ],
          },
          {
            name: 'Zakat',
            nameAr: 'زكاة',
            description: 'Zakat donation',
            descriptionAr: 'تبرع زكاة',
            isActive: true,
            fields: [
              { name: 'donorName', label: 'Donor Name', labelAr: 'اسم المتبرع', type: 'text', required: true, order: 1 },
              { name: 'phone', label: 'Phone Number', labelAr: 'رقم الهاتف', type: 'phone', required: true, order: 2 },
              { name: 'amount', label: 'Amount', labelAr: 'المبلغ', type: 'number', required: true, order: 3 },
              { name: 'zakatType', label: 'Zakat Type', labelAr: 'نوع الزكاة', type: 'select', required: true, order: 4, options: [
                { value: 'money', label: 'Money', labelAr: 'مال' },
                { value: 'gold', label: 'Gold', labelAr: 'ذهب' },
                { value: 'crops', label: 'Crops', labelAr: 'محاصيل' },
              ]},
            ],
          },
        ],
      },
    ];

    await RequestType.insertMany(requestTypes);

    return NextResponse.json(
      { message: 'Database seeded successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}
