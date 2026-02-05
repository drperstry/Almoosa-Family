import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Submission from '@/models/Submission';
import RequestType from '@/models/RequestType';

// GET submissions
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const requestTypeId = searchParams.get('requestType');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Build query
    const query: Record<string, unknown> = {};

    // Non-admin users can only see their own submissions
    if (session.user.role !== 'admin') {
      query.user = session.user.id;
    }

    if (status) {
      query.status = status;
    }

    if (requestTypeId) {
      query.requestType = requestTypeId;
    }

    const total = await Submission.countDocuments(query);
    const submissions = await Submission.find(query)
      .populate('requestType', 'name nameAr')
      .populate('user', 'name email')
      .populate('reviewedBy', 'name email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({
      submissions,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}

// POST create new submission
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const body = await request.json();
    const { requestTypeId, subTypeId, data } = body;

    if (!requestTypeId || !subTypeId || !data) {
      return NextResponse.json(
        { error: 'Request type, subtype, and data are required' },
        { status: 400 }
      );
    }

    // Verify request type and subtype exist
    const requestType = await RequestType.findById(requestTypeId);
    if (!requestType) {
      return NextResponse.json(
        { error: 'Request type not found' },
        { status: 404 }
      );
    }

    const subType = requestType.subTypes.find(
      (st) => st._id?.toString() === subTypeId
    );
    if (!subType) {
      return NextResponse.json(
        { error: 'Subtype not found' },
        { status: 404 }
      );
    }

    // Validate required fields
    const missingFields: string[] = [];
    for (const field of subType.fields) {
      if (field.required && !data[field.name]) {
        missingFields.push(field.label);
      }
    }

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    const submission = await Submission.create({
      requestType: requestTypeId,
      subType: subTypeId,
      user: session.user.id,
      data,
      status: 'pending',
    });

    return NextResponse.json(
      { message: 'Submission created successfully', submission },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating submission:', error);
    return NextResponse.json(
      { error: 'Failed to create submission' },
      { status: 500 }
    );
  }
}
