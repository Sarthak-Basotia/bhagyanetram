// src/models/Horoscope.js
import mongoose from "mongoose";

const horoscopeSchema = new mongoose.Schema(
  {
    sign: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },
    timeframe: {
      type: String,
      required: true,
      enum: ["daily", "weekly", "monthly", "yearly"],
      lowercase: true,
      index: true,
    },
    overview: {
      type: String,
      required: true,
    },
    love: {
      type: String,
      required: true,
    },
    career: {
      type: String,
      required: true,
    },
    health: {
      type: String,
      required: true,
    },
    lucky: {
      number: { type: Number, required: true },
      color: { type: String, required: true },
      time: { type: String, required: true },
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Unique index to ensure one document per sign + timeframe
horoscopeSchema.index({ sign: 1, timeframe: 1 }, { unique: true });

export default mongoose.model("Horoscope", horoscopeSchema);