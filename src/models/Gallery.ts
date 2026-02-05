import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IGalleryImage {
  _id?: mongoose.Types.ObjectId;
  url: string;
  caption?: string;
  captionAr?: string;
  order: number;
}

export interface IGallery extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  titleAr: string;
  description?: string;
  descriptionAr?: string;
  category: string;
  categoryAr: string;
  images: IGalleryImage[];
  coverImage?: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryImageSchema = new Schema<IGalleryImage>(
  {
    url: { type: String, required: true },
    caption: { type: String },
    captionAr: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const GallerySchema = new Schema<IGallery>(
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
    description: {
      type: String,
    },
    descriptionAr: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    categoryAr: {
      type: String,
      required: true,
    },
    images: [GalleryImageSchema],
    coverImage: {
      type: String,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

GallerySchema.index({ isPublished: 1, category: 1 });

const Gallery: Model<IGallery> =
  mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', GallerySchema);

export default Gallery;
