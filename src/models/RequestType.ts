import mongoose, { Document, Schema, Model } from 'mongoose';

// Field configuration for dynamic forms
export interface IFieldConfig {
  name: string;
  label: string;
  labelAr: string;
  type: 'text' | 'textarea' | 'number' | 'email' | 'phone' | 'date' | 'select' | 'file' | 'checkbox';
  required: boolean;
  placeholder?: string;
  placeholderAr?: string;
  options?: { value: string; label: string; labelAr: string }[];
  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    patternMessage?: string;
  };
  order: number;
}

// Sub-type configuration
export interface ISubType {
  _id?: mongoose.Types.ObjectId;
  name: string;
  nameAr: string;
  description?: string;
  descriptionAr?: string;
  fields: IFieldConfig[];
  isActive: boolean;
}

export interface IRequestType extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  nameAr: string;
  description?: string;
  descriptionAr?: string;
  icon?: string;
  color?: string;
  subTypes: ISubType[];
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const FieldConfigSchema = new Schema<IFieldConfig>(
  {
    name: { type: String, required: true },
    label: { type: String, required: true },
    labelAr: { type: String, required: true },
    type: {
      type: String,
      enum: ['text', 'textarea', 'number', 'email', 'phone', 'date', 'select', 'file', 'checkbox'],
      required: true,
    },
    required: { type: Boolean, default: false },
    placeholder: { type: String },
    placeholderAr: { type: String },
    options: [
      {
        value: { type: String },
        label: { type: String },
        labelAr: { type: String },
      },
    ],
    validation: {
      min: { type: Number },
      max: { type: Number },
      minLength: { type: Number },
      maxLength: { type: Number },
      pattern: { type: String },
      patternMessage: { type: String },
    },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const SubTypeSchema = new Schema<ISubType>(
  {
    name: { type: String, required: true },
    nameAr: { type: String, required: true },
    description: { type: String },
    descriptionAr: { type: String },
    fields: [FieldConfigSchema],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const RequestTypeSchema = new Schema<IRequestType>(
  {
    name: { type: String, required: true, unique: true },
    nameAr: { type: String, required: true },
    description: { type: String },
    descriptionAr: { type: String },
    icon: { type: String },
    color: { type: String, default: '#3B82F6' },
    subTypes: [SubTypeSchema],
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const RequestType: Model<IRequestType> =
  mongoose.models.RequestType || mongoose.model<IRequestType>('RequestType', RequestTypeSchema);

export default RequestType;
