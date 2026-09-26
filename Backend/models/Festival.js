import mongoose from 'mongoose';

const festivalSchema = new mongoose.Schema({
  date_str: { type: String, required: true, unique: true }, // e.g., "2026-09-15"
  year: Number,
  month: Number,
  day: Number,
  tithi_hi: String, // e.g., "द्वितीया"
  tithi_en: String, // e.g., "Dwitiya"
  festival_hi: String, // e.g., "महाशिवरात्रि"
  festival_en: String, // e.g., "MAHA SHIVRATRI"
  is_major: { type: Boolean, default: false } // For red border highlight like in image_a5aa55.png
});

export default mongoose.model('Festival', festivalSchema);