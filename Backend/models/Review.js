import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    initials: {
      type: String,
      trim: true,
      default: '',
    },
    location: {
      type: String,
      trim: true,
      default: 'India',
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    date: {
      type: String,
      trim: true,
      default: 'Recently',
    },
    active: {
      type: Boolean,
      default: true,
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

// Auto-derive initials if not provided
reviewSchema.pre('save', function () {
  if (!this.initials && this.name) {
    const parts = this.name.trim().split(/\s+/);
    if (parts.length >= 2) {
      this.initials = (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    } else {
      this.initials = this.name.slice(0, 2).toUpperCase();
    }
  }
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
