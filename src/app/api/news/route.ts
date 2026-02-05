import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import News from '@/models/News';

// GET all news
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const publishedOnly = searchParams.get('published') === 'true';

    const query = publishedOnly ? { isPublished: true } : {};

    const total = await News.countDocuments(query);
    const news = await News.find(query)
      .populate('author', 'name')
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({
      news,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}

// POST create news (admin only)
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
    const { title, titleAr, content, contentAr, excerpt, excerptAr, image, tags, isPublished } = body;

    if (!title || !titleAr || !content || !contentAr) {
      return NextResponse.json(
        { error: 'Title and content in both languages are required' },
        { status: 400 }
      );
    }

    const news = await News.create({
      title,
      titleAr,
      content,
      contentAr,
      excerpt,
      excerptAr,
      image,
      tags,
      author: session.user.id,
      isPublished: isPublished || false,
      publishedAt: isPublished ? new Date() : undefined,
    });

    return NextResponse.json(
      { message: 'News created successfully', news },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating news:', error);
    return NextResponse.json(
      { error: 'Failed to create news' },
      { status: 500 }
    );
  }
}
