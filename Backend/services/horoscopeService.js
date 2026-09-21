// src/services/horoscopeService.js
import OpenAI from "openai";
import cron from "node-cron";
import Horoscope from "../models/Horoscope.js";

export const SIGNS = [
  "aries", "taurus", "gemini", "cancer",
  "leo", "virgo", "libra", "scorpio",
  "sagittarius", "capricorn", "aquarius", "pisces"
];

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const generateHoroscope = async (sign, timeframe) => {
  const capSign = sign.charAt(0).toUpperCase() + sign.slice(1).toLowerCase();
  const capPeriod = timeframe.charAt(0).toUpperCase() + timeframe.slice(1).toLowerCase();

  const systemPrompt = `
You are a professional Vedic and Western astrologer. Return only valid JSON.
Match this exact format, headings, and length:
{
  "overview": "1-2 sentences on general energy and cosmic alignments.",
  "love": "1-2 sentences on romantic prospects, communication, and relationships.",
  "career": "1-2 sentences on workplace focus, finances, and opportunities.",
  "health": "1-2 sentences on physical wellness, energy, and self-care.",
  "lucky": {
    "number": "Generate a single lucky integer",
    "color": "Generate a specific lucky color name",
    "time": "Generate a specific time window (e.g., 9-11 AM)"
  }
}`;

  const userPrompt = `Generate a ${capPeriod} horoscope for ${capSign}. Keep the language encouraging, authentic, and grounded.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.7,
    max_tokens: 300,
    response_format: { type: "json_object" },
  });

  const parsed = JSON.parse(response.choices[0].message.content.trim());

  // Upsert to MongoDB
  const updatedDoc = await Horoscope.findOneAndUpdate(
    { sign: sign.toLowerCase(), timeframe: timeframe.toLowerCase() },
    {
      sign: sign.toLowerCase(),
      timeframe: timeframe.toLowerCase(),
      overview: parsed.overview,
      love: parsed.love,
      career: parsed.career,
      health: parsed.health,
      lucky: {
        number: parsed.lucky?.number ?? 1,
        color: parsed.lucky?.color ?? "Gold",
        time: parsed.lucky?.time ?? "Morning hours",
      },
      lastUpdated: new Date(),
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return updatedDoc;
};

export const updateAllSignsByTimeframe = async (timeframe) => {
  console.log(`[Horoscope Cron] Starting batch update for: ${timeframe} at 3:00 AM IST`);

  for (const sign of SIGNS) {
    try {
      await generateHoroscope(sign, timeframe);
      console.log(`[Horoscope Cron] Saved ${timeframe} for ${sign}`);
      // 1-second pause to prevent rate limiting
      await sleep(1000);
    } catch (err) {
      console.error(`[Horoscope Cron] Error updating ${sign} (${timeframe}):`, err.message);
    }
  }

  console.log(`[Horoscope Cron] Completed batch update for: ${timeframe}`);
};

export const initScheduler = () => {
  const tzOptions = { timezone: "Asia/Kolkata" };

  // 1. Daily: Every morning at 3:00 AM IST
  cron.schedule("0 3 * * *", () => updateAllSignsByTimeframe("daily"), tzOptions);

  // 2. Weekly: Every Sunday at 3:00 AM IST
  cron.schedule("0 3 * * 0", () => updateAllSignsByTimeframe("weekly"), tzOptions);

  // 3. Monthly: 1st of every month at 3:00 AM IST
  cron.schedule("0 3 1 * *", () => updateAllSignsByTimeframe("monthly"), tzOptions);

  // 4. Yearly: January 1st at 3:00 AM IST
  cron.schedule("0 3 1 1 *", () => updateAllSignsByTimeframe("yearly"), tzOptions);

  console.log("Horoscope cron jobs scheduled for 3:00 AM IST (Daily, Weekly, Monthly, Yearly).");
};