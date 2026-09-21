// src/database.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/spiritual_db";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};