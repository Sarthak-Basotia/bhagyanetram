import mongoose from 'mongoose';

const adminLogSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
      index: true,
    },
    adminName: {
      type: String,
      required: true,
      trim: true,
    },
    adminEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    adminRole: {
      type: String,
      enum: ['superadmin', 'admin', 'subadmin'],
      default: 'subadmin',
    },
    action: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: [
        'astrologers',
        'blogs',
        'queries',
        'reviews',
        'users',
        'subadmins',
        'security',
        'system',
      ],
      default: 'system',
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    targetId: {
      type: String,
      default: '',
    },
    targetTitle: {
      type: String,
      default: '',
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    ip: {
      type: String,
      default: '',
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: false }
);

export default mongoose.models.AdminLog || mongoose.model('AdminLog', adminLogSchema);
