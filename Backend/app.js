// src/app.js
import express from "express";
import cors from "cors";
import Horoscope from "./models/Horoscope.js";
import { initializeFestivalQueue } from './services/festivalCron.js';
import { getFestivals, getPlanetTransit } from "./controllers/astrologyController.js";
import {
  generateHoroscope,
  updateAllSignsByTimeframe,
} from "./services/horoscopeService.js";

// AI Astrology controllers
import { 
  generateKundli, 
  getAdvancedKundli, 
  getGemstoneGuide, 
  getNumerology, 
  getPanchang, 
  matchKundli 
} from "./controllers/astrologyController.js";
import { sendOTP, verifyOTP, getUserDetails } from './controllers/authController.js';
import { analyzePalm } from './controllers/palmistryController.js';
import { requireAuth, requireAdmin } from './middleware/authMiddleware.js';

// Admin and Public Content Controllers
import {
  adminLogin,
  getAdminStats,
  createAstrologer,
  updateAstrologer,
  deleteAstrologer,
  getAllBlogsAdmin,
  createBlog,
  updateBlog,
  deleteBlog,
  getAllQueries,
  updateQueryStatus,
  deleteQuery,
  getAllUsers,
  updateUser,
  deleteUser,
} from './controllers/adminController.js';
import { getPublicAstrologers } from './controllers/astrologerController.js';
import { getPublicBlogs, getPublicBlogBySlug } from './controllers/blogController.js';
import { createPublicBooking } from './controllers/bookingController.js';

const app = express();
// Increased JSON limit for base64 images
app.use(express.json({ limit: '10mb' }));
initializeFestivalQueue();

app.use(cors({ origin: "*", credentials: true }));

const VALID_TIMEFRAMES = ["daily", "weekly", "monthly", "yearly"];

// ==========================================
// AUTHENTICATION ROUTES
// ==========================================
app.post("/api/auth/send-otp", sendOTP);
app.post("/api/auth/verify-otp", verifyOTP);
app.get("/api/auth/me", requireAuth, getUserDetails);

// ==========================================
// PALMISTRY ROUTES
// ==========================================
app.post("/api/palmistry/analyze", requireAuth, analyzePalm);

// ==========================================
// AI ASTROLOGY ROUTES
// ==========================================
app.post("/api/astrology/kundli", generateKundli);
app.post("/api/astrology/panchang", getPanchang);
app.post("/api/astrology/matching", matchKundli);
app.post("/api/astrology/advanced-kundli", getAdvancedKundli);
app.post("/api/astrology/numerology", getNumerology);
app.post("/api/astrology/gemstones", getGemstoneGuide);
app.get("/api/astrology/festivals", getFestivals);
app.post("/api/astrology/transit", getPlanetTransit);

// ==========================================
// PUBLIC: ASTROLOGERS, BLOGS & BOOKINGS
// ==========================================
app.get("/api/astrologers", getPublicAstrologers);
app.get("/api/blogs", getPublicBlogs);
app.get("/api/blogs/:slug", getPublicBlogBySlug);
app.post("/api/bookings", createPublicBooking);

// ==========================================
// ADMIN PORTAL ROUTES
// ==========================================
app.post("/api/admin/login", adminLogin);
app.get("/api/admin/stats", requireAdmin, getAdminStats);

// Admin Astrologers
app.post("/api/admin/astrologers", requireAdmin, createAstrologer);
app.put("/api/admin/astrologers/:id", requireAdmin, updateAstrologer);
app.delete("/api/admin/astrologers/:id", requireAdmin, deleteAstrologer);

// Admin Blogs
app.get("/api/admin/blogs", requireAdmin, getAllBlogsAdmin);
app.post("/api/admin/blogs", requireAdmin, createBlog);
app.put("/api/admin/blogs/:id", requireAdmin, updateBlog);
app.delete("/api/admin/blogs/:id", requireAdmin, deleteBlog);

// Admin Queries & Inquiries
app.get("/api/admin/queries", requireAdmin, getAllQueries);
app.patch("/api/admin/queries/:id", requireAdmin, updateQueryStatus);
app.delete("/api/admin/queries/:id", requireAdmin, deleteQuery);

// Admin User Accounts
app.get("/api/admin/users", requireAdmin, getAllUsers);
app.patch("/api/admin/users/:id", requireAdmin, updateUser);
app.delete("/api/admin/users/:id", requireAdmin, deleteUser);

// ==========================================
// HOROSCOPE ROUTES
// ==========================================
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

    let horoscope = await Horoscope.findOne({ sign: cleanSign, timeframe: cleanTimeframe });

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

// Admin endpoint to trigger horoscope seeding
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
