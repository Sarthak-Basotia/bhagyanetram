import mongoose from 'mongoose';
import crypto from 'crypto';

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['superadmin', 'admin', 'subadmin'],
      default: 'subadmin',
    },
    permissions: {
      type: [String],
      default: ['astrologers', 'blogs', 'queries', 'users', 'reviews'],
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    lastLogin: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Helper method to set password
adminSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

// Helper method to validate password
adminSchema.methods.validatePassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.passwordHash === hash;
};

// Static helper to hash password directly
adminSchema.statics.hashPassword = function (password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return { salt, passwordHash };
};

export default mongoose.model('Admin', adminSchema);
