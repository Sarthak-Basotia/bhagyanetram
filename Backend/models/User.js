import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    otp: { type: String },
    otpExpires: { type: Date },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    palmistryCredits: { type: Number, default: 3 },
    termsAccepted: { type: Boolean, default: false },
    status: { type: String, enum: ['active', 'suspended'], default: 'active' },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
