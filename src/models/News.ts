import mongoose, { Document, Schema, Model } from 'mongoose';

export interface INews extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  titleAr: string;
  content: string;
  contentAr: string;
  excerpt?: string;
  excerptAr?: string;
  image?: string;
  author: mongoose.Types.ObjectId;
  isPublished: boolean;
  publishedAt?: Date;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const NewsSchema = new Schema<INews>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    titleAr: {
      type: String,
      required: [true, 'Arabic title is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    contentAr: {
      type: String,
      required: [true, 'Arabic content is required'],
    },
    excerpt: {
      type: String,
      maxlength: 300,
    },
    excerptAr: {
      type: String,
      maxlength: 300,
    },
    image: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

NewsSchema.index({ isPublished: 1, publishedAt: -1 });

const News: Model<INews> = mongoose.models.News || mongoose.model<INews>('News', NewsSchema);

export default News;
