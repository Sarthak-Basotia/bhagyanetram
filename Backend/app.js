// src/app.js
import express from "express";
import cors from "cors";
import ConsultationBooking from "./models/booking.js";
import Horoscope from "./models/Horoscope.js";
import { sendBookingEmail } from "./emailUtils.js";
import {
  generateHoroscope,
  updateAllSignsByTimeframe,
} from "./services/horoscopeService.js";

// Import the new AI Astrology controllers (Adjust the path if your controller is in a different folder)
import { generateKundli, getAdvancedKundli, getGemstoneGuide, getNumerology, getPanchang, matchKundli } from "./controllers/astrologyController.js";

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

const VALID_TIMEFRAMES = ["daily", "weekly", "monthly", "yearly"];

// ==========================================
// NEW: AI ASTROLOGY ROUTES
// ==========================================
app.post("/api/astrology/kundli", generateKundli);
app.post("/api/astrology/panchang", getPanchang);
app.post("/api/astrology/matching", matchKundli);
app.post("/api/astrology/advanced-kundli", getAdvancedKundli);
app.post("/api/astrology/numerology", getNumerology);
app.post("/api/astrology/gemstones", getGemstoneGuide);
app.post("/api/astrology/seed-festivals", seedFestivals);
app.get("/api/astrology/festivals", getFestivals);

// ==========================================
// EXISTING: BOOKING ROUTES (Assuming they are here)
// ==========================================
// ... Booking endpoints stay as they are ...


// ==========================================
// EXISTING: HOROSCOPE ROUTES
// ==========================================
// GET Horoscope endpoint - Fetches from MongoDB
app.get("/api/horoscope", async (req, res) => {
  try {
    const { sign, timeframe = "daily" } = req.query;

    if (!sign) {
      return res.status(400).json({ detail: "Query param 'sign' is required." });
    }

    const cleanSign = sign.toString().toLowerCase();
    const cleanTimeframe = timeframe.toString().toLowerCase();

    if (!VALID_TIMEFRAMES.includes(cleanTimeframe)) {
      return res.status(400).json({ detail: `Invalid timeframe. Choose from: ${VALID_TIMEFRAMES.join(", ")}` });
    }

    // 1. Read directly from MongoDB
    let horoscope = await Horoscope.findOne({ sign: cleanSign, timeframe: cleanTimeframe });

    // 2. Fallback: If DB is empty for this sign, generate once & save
    if (!horoscope) {
      console.log(`[DB Miss] Generating initial horoscope for ${cleanSign} (${cleanTimeframe})`);
      horoscope = await generateHoroscope(cleanSign, cleanTimeframe);
    }

    return res.status(200).json({
      overview: horoscope.overview,
      love: horoscope.love,
      career: horoscope.career,
      health: horoscope.health,
      lucky: horoscope.lucky,
      lastUpdated: horoscope.lastUpdated,
    });
  } catch (error) {
    console.error("Failed to retrieve horoscope:", error);
    return res.status(500).json({ detail: error.message });
  }
});

// Admin endpoint to manually trigger a batch generation without waiting for 3:00 AM
app.post("/api/admin/seed-horoscopes", async (req, res) => {
  const { timeframe = "daily" } = req.body;
  if (!VALID_TIMEFRAMES.includes(timeframe.toLowerCase())) {
    return res.status(400).json({ detail: "Invalid timeframe." });
  }

  setImmediate(() => {
    updateAllSignsByTimeframe(timeframe.toLowerCase());
  });

  return res.status(200).json({ message: `Seeding job started for ${timeframe}. Check server logs.` });
});

export default app;