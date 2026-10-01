import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  otp: { type: String },
  otpExpires: { type: Date },
  palmistryCredits: { type: Number, default: 3 },
  termsAccepted: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
