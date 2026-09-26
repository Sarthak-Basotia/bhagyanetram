// MongoDB Mongoose Schema Model (models/Festival.js)
import mongoose from 'mongoose';

const festivalSchema = new mongoose.Schema({
  year: { type: Number, required: true }, // e.g., 2026
  month: { type: Number, required: true }, // 1-12
  westernMonthName: { type: String, required: true }, // "FEBRUARY 2026"
  hinduMonthNames: { type: String, required: true }, // "माघ / फाल्गुन" (From top header)
  days: [{
    date: { type: Number, required: true }, // 1-31
    dayOfWeek: { type: String, required: true }, // "SUN", "MON", etc.
    tithiHindi: { type: String }, // e.g., "माघ पूर्णिमा"
    tithiEnglish: { type: String }, // e.g., "Magh Punam"
    festivalHindi: { type: String }, // e.g., "महाशिवरात्रि"
    festivalEnglish: { type: String }, // e.g., "MAHA SHIVRATRI"
    isMajorFestival: { type: Boolean, default: false }, // To add the red border box
    isNewMoon: { type: Boolean, default: false },
    isFullMoon: { type: Boolean, default: false }
  }]
});

export const Festival = mongoose.model('Festival', festivalSchema);