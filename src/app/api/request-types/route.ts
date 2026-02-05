import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import RequestType from '@/models/RequestType';

// GET all request types
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('active') === 'true';

    const query = activeOnly ? { isActive: true } : {};
    const requestTypes = await RequestType.find(query).sort({ order: 1, createdAt: -1 });

    return NextResponse.json(requestTypes);
  } catch (error) {
    console.error('Error fetching request types:', error);
    return NextResponse.json(
      { error: 'Failed to fetch request types' },
      { status: 500 }
    );
  }
}

// POST create new request type (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const body = await request.json();
    const { name, nameAr, description, descriptionAr, icon, color, subTypes, order } = body;

    if (!name || !nameAr) {
      return NextResponse.json(
        { error: 'Name and Arabic name are required' },
        { status: 400 }
      );
    }

    // Check if request type with same name exists
    const existing = await RequestType.findOne({ name });
    if (existing) {
      return NextResponse.json(
        { error: 'Request type with this name already exists' },
        { status: 400 }
      );
    }

    const requestType = await RequestType.create({
      name,
      nameAr,
      description,
      descriptionAr,
      icon,
      color,
      subTypes: subTypes || [],
      order: order || 0,
    });

    return NextResponse.json(
      { message: 'Request type created successfully', requestType },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating request type:', error);
    return NextResponse.json(
      { error: 'Failed to create request type' },
      { status: 500 }
    );
  }
}
