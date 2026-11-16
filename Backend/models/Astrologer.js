import mongoose from 'mongoose';

const astrologerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      default: 'Vedic Astrologer & Vastu Consultant',
      trim: true,
    },
    specialization: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: String,
      required: true,
      trim: true,
    },
    languages: {
      type: String,
      default: 'Hindi, English',
      trim: true,
    },
    rating: {
      type: Number,
      default: 4.9,
      min: 1,
      max: 5,
    },
    reviews: {
      type: String,
      default: '1K+',
      trim: true,
    },
    image: {
      type: String,
      default: '',
    },
    available: {
      type: Boolean,
      default: true,
    },
    price: {
      type: String,
      default: '₹25/min',
      trim: true,
    },
    bio: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Astrologer', astrologerSchema);
