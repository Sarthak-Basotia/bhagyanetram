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
      default: ["General Consultation"],
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
    astrologerName: {
      type: String,
      default: "Any Available Astrologer",
      trim: true,
    },
    source: {
      type: String,
      default: "website", // 'booking_modal', 'contact_page', 'vastu_audit', 'voucher_inquiry'
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "contacted", "in_progress", "resolved", "cancelled"],
      default: "pending",
    },
    adminNotes: {
      type: String,
      default: "",
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
