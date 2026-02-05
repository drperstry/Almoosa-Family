import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Gallery from '@/models/Gallery';

// GET all galleries
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const publishedOnly = searchParams.get('published') === 'true';

    const query: Record<string, unknown> = {};

    if (publishedOnly) {
      query.isPublished = true;
    }

    if (category) {
      query.category = category;
    }

    const total = await Gallery.countDocuments(query);
    const galleries = await Gallery.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    // Get unique categories
    const categories = await Gallery.distinct('category');
    const categoriesAr = await Gallery.distinct('categoryAr');

    return NextResponse.json({
      galleries,
      categories: categories.map((cat, i) => ({
        name: cat,
        nameAr: categoriesAr[i] || cat,
      })),
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching galleries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch galleries' },
      { status: 500 }
    );
  }
}

// POST create gallery (admin only)
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
    const {
      title,
      titleAr,
      description,
      descriptionAr,
      category,
      categoryAr,
      images,
      coverImage,
      isPublished,
    } = body;

    if (!title || !titleAr || !category || !categoryAr) {
      return NextResponse.json(
        { error: 'Title and category in both languages are required' },
        { status: 400 }
      );
    }

    const gallery = await Gallery.create({
      title,
      titleAr,
      description,
      descriptionAr,
      category,
      categoryAr,
      images: images || [],
      coverImage,
      isPublished: isPublished || false,
    });

    return NextResponse.json(
      { message: 'Gallery created successfully', gallery },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating gallery:', error);
    return NextResponse.json(
      { error: 'Failed to create gallery' },
      { status: 500 }
    );
  }
}
