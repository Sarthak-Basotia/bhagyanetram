// import Festival from '../models/Festival.js';
// import { openai } from '../app.js'; // Assumes openai is exported from your main file
import Festival from '../models/Festival.js';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Uses the key from your .env file
});

// ==========================================
// A. FETCH FROM OPENAI & SAVE TO MONGODB (Run once via Postman or Script)
// ==========================================
export const seedFestivals = async (req, res) => {
  try {
    const { year, month } = req.body; // e.g., year: 2026, month: 9

    const prompt = `You are an expert in the Hindu Panchang. Generate daily calendar data for month ${month} of year ${year}. 
    Include the Tithi and any Hindu festivals. Format exactly like a wall calendar.
    Return ONLY a JSON array of objects with this structure for EVERY day of the month:
    [
      {
        "date_str": "YYYY-MM-DD",
        "year": YYYY,
        "month": M,
        "day": D,
        "tithi_hi": "Hindi Tithi (e.g., द्वितीया)",
        "tithi_en": "English Tithi (e.g., Dwitiya)",
        "festival_hi": "Hindi Festival Name or empty string",
        "festival_en": "English Festival Name or empty string",
        "is_major": boolean (true only for major festivals like Diwali, Holi, Shivratri)
      }
    ]`;

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      response_format: { type: "json_object" },
      messages: [{ role: "system", content: prompt }]
    });

    const parsedData = JSON.parse(aiResponse.choices[0].message.content);
    const calendarArray = parsedData.calendar || parsedData.data || Object.values(parsedData)[0];

    // Save to MongoDB (upsert to avoid duplicates)
    for (const dayData of calendarArray) {
      await Festival.findOneAndUpdate(
        { date_str: dayData.date_str },
        dayData,
        { upsert: true, new: true }
      );
    }

    res.json({ success: true, message: `Data for ${year}-${month} saved to MongoDB.`, count: calendarArray.length });
  } catch (error) {
    console.error("Seed Error:", error);
    res.status(500).json({ error: "Failed to fetch and save OpenAI data" });
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

    const festivals = await Festival.find(query).sort({ day: 1 });
    res.json({ success: true, data: festivals });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};