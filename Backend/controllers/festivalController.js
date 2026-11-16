import { Festival } from '../models/Festival.js';
import { generateMonthCalendar } from '../services/festivalGenerator.js';

// ==========================================
// A. VERIFIED SEED FUNCTION (Drik Panchang Aligned)
// ==========================================
export const seedFestivals = async (req, res) => {
  try {
    const { year = 2026, month } = req.body;

    if (month) {
      const calendarData = await generateMonthCalendar(parseInt(year), parseInt(month));
      await Festival.findOneAndUpdate(
        { year: parseInt(year), month: parseInt(month) },
        calendarData,
        { upsert: true, new: true }
      );
      return res.json({ success: true, message: `Authentic Panchang data for ${year}-${month} saved.`, data: calendarData });
    }

    // Seed all 12 months
    for (let m = 1; m <= 12; m++) {
      const calendarData = await generateMonthCalendar(parseInt(year), m);
      await Festival.findOneAndUpdate(
        { year: parseInt(year), month: m },
        calendarData,
        { upsert: true, new: true }
      );
    }

    res.json({ success: true, message: `All 12 authentic months for ${year} saved to MongoDB.` });
  } catch (error) {
    console.error("Seed Error:", error);
    res.status(500).json({ error: "Failed to seed verified festival data" });
  }
};

// ==========================================
// B. GET FESTIVALS FOR FRONTEND
// ==========================================
export const getFestivals = async (req, res) => {
  try {
    const { year, month } = req.query;
    const query = {};
    if (year) query.year = parseInt(year);
    if (month) query.month = parseInt(month);

    const festivals = await Festival.find(query).sort({ year: 1, month: 1 });
    res.json({ success: true, data: festivals });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

export const getMonthFestivals = async (req, res) => {
  try {
    const { year, month } = req.query;
    const calendarData = await Festival.findOne({ 
      year: parseInt(year), 
      month: parseInt(month) 
    });

    if (!calendarData) {
      return res.status(404).json({ error: "Calendar data not found for this month" });
    }

    res.json({ success: true, data: calendarData });
  } catch (error) {
    console.error("Festival API Error:", error);
    res.status(500).json({ error: "Failed to fetch calendar data" });
  }
};
