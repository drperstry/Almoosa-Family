import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import RequestType from '@/models/RequestType';

// GET single request type
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    const requestType = await RequestType.findById(id);

    if (!requestType) {
      return NextResponse.json(
        { error: 'Request type not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ requestType });
  } catch (error) {
    console.error('Error fetching request type:', error);
    return NextResponse.json(
      { error: 'Failed to fetch request type' },
      { status: 500 }
    );
  }
}

// PUT update request type (admin only)
export async function PUT(
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

    const requestType = await RequestType.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!requestType) {
      return NextResponse.json(
        { error: 'Request type not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Request type updated successfully',
      requestType,
    });
  } catch (error) {
    console.error('Error updating request type:', error);
    return NextResponse.json(
      { error: 'Failed to update request type' },
      { status: 500 }
    );
  }
}

// DELETE request type (admin only)
export async function DELETE(
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

    const requestType = await RequestType.findByIdAndDelete(id);

    if (!requestType) {
      return NextResponse.json(
        { error: 'Request type not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Request type deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting request type:', error);
    return NextResponse.json(
      { error: 'Failed to delete request type' },
      { status: 500 }
    );
  }
}
