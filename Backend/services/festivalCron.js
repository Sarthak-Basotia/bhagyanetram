import cron from 'node-cron';
import { Festival } from '../models/Festival.js';
import { generateMonthCalendar } from './festivalGenerator.js';

// Initializes the current month in the database if it is missing
export const initializeFestivalQueue = async () => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // e.g., 9 for September
  const currentYear = now.getFullYear();   // e.g., 2026

  console.log(`Checking Festival Database for Current Month: ${currentMonth}/${currentYear}...`);

  // Check if current month already exists in Mongo
  const exists = await Festival.findOne({ year: currentYear, month: currentMonth });
  
  if (!exists) {
    console.log(`Generating data for ${currentMonth}/${currentYear} via OpenAI...`);
    try {
      const calendarData = await generateMonthCalendar(currentYear, currentMonth);
      await Festival.create(calendarData);
      console.log(`Successfully saved ${currentMonth}/${currentYear}`);
    } catch (err) {
      console.error(`Failed to generate/save ${currentMonth}/${currentYear}:`, err.message);
    }
  } else {
    console.log(`Data for ${currentMonth}/${currentYear} already exists.`);
  }
};

// CRON JOB: Runs at 00:01 AM on the 1st of every month
cron.schedule('1 0 1 * *', async () => {
  console.log("Running monthly Festival update...");
  
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  // 1. Delete past months to keep the database clean
  await Festival.deleteMany({
    $or: [
      { year: { $lt: currentYear } },
      { year: currentYear, month: { $lt: currentMonth } }
    ]
  });

  // 2. Fetch and store the new current month
  const exists = await Festival.findOne({ year: currentYear, month: currentMonth });
  if (!exists) {
    console.log(`Fetching new month data for ${currentMonth}/${currentYear}...`);
    try {
      const newMonthData = await generateMonthCalendar(currentYear, currentMonth);
      await Festival.create(newMonthData);
      console.log(`Successfully saved ${currentMonth}/${currentYear}`);
    } catch (err) {
      console.error(`Failed to generate/save ${currentMonth}/${currentYear}:`, err.message);
    }
  }
});