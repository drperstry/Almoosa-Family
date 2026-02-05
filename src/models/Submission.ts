import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ISubmission extends Document {
  _id: mongoose.Types.ObjectId;
  requestType: mongoose.Types.ObjectId;
  subType: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  data: Record<string, unknown>;
  status: 'pending' | 'approved' | 'rejected' | 'in_review';
  adminNotes?: string;
  reviewedBy?: mongoose.Types.ObjectId;
  reviewedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SubmissionSchema = new Schema<ISubmission>(
  {
    requestType: {
      type: Schema.Types.ObjectId,
      ref: 'RequestType',
      required: true,
    },
    subType: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    data: {
      type: Schema.Types.Mixed,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'in_review'],
      default: 'pending',
    },
    adminNotes: {
      type: String,
    },
    reviewedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    reviewedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
SubmissionSchema.index({ user: 1, status: 1 });
SubmissionSchema.index({ requestType: 1, status: 1 });

const Submission: Model<ISubmission> =
  mongoose.models.Submission || mongoose.model<ISubmission>('Submission', SubmissionSchema);

export default Submission;
