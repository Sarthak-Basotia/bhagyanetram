import cron from 'node-cron';
import { Festival } from '../models/Festival.js';
import { generateMonthCalendar } from './festivalGenerator.js';

// Initializes all 12 months in the database if missing or outdated
export const initializeFestivalQueue = async () => {
  const currentYear = 2026;

  try {
    const count = await Festival.countDocuments({ year: currentYear });
    if (count < 12) {
      console.log(`Festival database incomplete (${count}/12). Seeding verified authentic 2026 festivals...`);
      for (let m = 1; m <= 12; m++) {
        const calendarData = await generateMonthCalendar(currentYear, m);
        await Festival.findOneAndUpdate(
          { year: currentYear, month: m },
          calendarData,
          { upsert: true, new: true }
        );
      }
      console.log('All 12 authentic months successfully seeded in MongoDB.');
    }
  } catch (err) {
    console.warn('initializeFestivalQueue error:', err.message);
  }
};

// CRON JOB: Runs at 00:01 AM on the 1st of every month
cron.schedule('1 0 1 * *', async () => {
  console.log("Running monthly Festival verification...");
  try {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    const verifiedMonth = await generateMonthCalendar(currentYear, currentMonth);
    await Festival.findOneAndUpdate(
      { year: currentYear, month: currentMonth },
      verifiedMonth,
      { upsert: true, new: true }
    );
  } catch (err) {
    console.error("Monthly festival update error:", err.message);
  }
});
