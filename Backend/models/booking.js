// src/models/Booking.js
import mongoose from "mongoose";

const consultationBookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 150,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
    services: {
      type: [String],
      required: true,
    },
    otherService: {
      type: String,
      default: null,
      maxlength: 100,
    },
    date: {
      type: Date,
      default: null,
    },
    time: {
      type: String,
      default: null,
      maxlength: 50,
    },
    message: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export default mongoose.model("ConsultationBooking", consultationBookingSchema);