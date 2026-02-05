import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import RequestType from '@/models/RequestType';

// POST add new subtype to request type (admin only)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const { name, nameAr, description, descriptionAr, fields } = body;

    if (!name || !nameAr) {
      return NextResponse.json(
        { error: 'Name and Arabic name are required' },
        { status: 400 }
      );
    }

    const requestType = await RequestType.findById(id);

    if (!requestType) {
      return NextResponse.json(
        { error: 'Request type not found' },
        { status: 404 }
      );
    }

    requestType.subTypes.push({
      name,
      nameAr,
      description,
      descriptionAr,
      fields: fields || [],
      isActive: true,
    });

    await requestType.save();

    return NextResponse.json({
      message: 'Subtype added successfully',
      requestType,
    }, { status: 201 });
  } catch (error) {
    console.error('Error adding subtype:', error);
    return NextResponse.json(
      { error: 'Failed to add subtype' },
      { status: 500 }
    );
  }
}
