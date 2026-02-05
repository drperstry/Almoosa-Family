import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import RequestType from '@/models/RequestType';

// PUT update subtype (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; subtypeId: string }> }
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
    const { id, subtypeId } = await params;
    const body = await request.json();

    const requestType = await RequestType.findById(id);

    if (!requestType) {
      return NextResponse.json(
        { error: 'Request type not found' },
        { status: 404 }
      );
    }

    const subtypeIndex = requestType.subTypes.findIndex(
      (st) => st._id?.toString() === subtypeId
    );

    if (subtypeIndex === -1) {
      return NextResponse.json(
        { error: 'Subtype not found' },
        { status: 404 }
      );
    }

    // Update subtype fields
    Object.assign(requestType.subTypes[subtypeIndex], body);
    await requestType.save();

    return NextResponse.json({
      message: 'Subtype updated successfully',
      requestType,
    });
  } catch (error) {
    console.error('Error updating subtype:', error);
    return NextResponse.json(
      { error: 'Failed to update subtype' },
      { status: 500 }
    );
  }
}

// DELETE subtype (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; subtypeId: string }> }
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
    const { id, subtypeId } = await params;

    const requestType = await RequestType.findById(id);

    if (!requestType) {
      return NextResponse.json(
        { error: 'Request type not found' },
        { status: 404 }
      );
    }

    requestType.subTypes = requestType.subTypes.filter(
      (st) => st._id?.toString() !== subtypeId
    );

    await requestType.save();

    return NextResponse.json({
      message: 'Subtype deleted successfully',
      requestType,
    });
  } catch (error) {
    console.error('Error deleting subtype:', error);
    return NextResponse.json(
      { error: 'Failed to delete subtype' },
      { status: 500 }
    );
  }
}
