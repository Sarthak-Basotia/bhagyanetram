import cron from 'node-cron';
import { Festival } from '../models/Festival.js';
import { generateMonthCalendar } from './festivalGenerator.js';

// Helper to calculate future months safely (handling Dec -> Jan rollover)
const getTargetMonthYear = (startMonth, startYear, addMonths) => {
  const date = new Date(startYear, startMonth - 1 + addMonths, 1);
  return { month: date.getMonth() + 1, year: date.getFullYear() };
};

// Initializes the 12-month queue if empty
export const initializeFestivalQueue = async () => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  console.log("Checking Festival Database Queue...");

  for (let i = 0; i < 12; i++) {
    const target = getTargetMonthYear(currentMonth, currentYear, i);
    
    // Check if month already exists in Mongo
    const exists = await Festival.findOne({ year: target.year, month: target.month });
    
    if (!exists) {
      console.log(`Generating data for ${target.month}/${target.year} via OpenAI...`);
      try {
        const calendarData = await generateMonthCalendar(target.year, target.month);
        await Festival.create(calendarData);
        console.log(`Successfully saved ${target.month}/${target.year}`);
      } catch (err) {
        console.error(`Failed to generate/save ${target.month}/${target.year}`);
      }
    }
  }
  console.log("Festival Queue is up to date.");
};

// CRON JOB: Runs at 00:01 AM on the 1st of every month
cron.schedule('1 0 1 * *', async () => {
  console.log("Running monthly Festival Queue update...");
  
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  // 1. Delete past months (Anything older than the current month/year)
  await Festival.deleteMany({
    $or: [
      { year: { $lt: currentYear } },
      { year: currentYear, month: { $lt: currentMonth } }
    ]
  });

  // 2. Add the new 12th month at the end of the queue (Current month + 11)
  const target = getTargetMonthYear(currentMonth, currentYear, 11);
  
  const exists = await Festival.findOne({ year: target.year, month: target.month });
  if (!exists) {
    console.log(`Fetching new 12th month data for ${target.month}/${target.year}`);
    const newMonthData = await generateMonthCalendar(target.year, target.month);
    await Festival.create(newMonthData);
  }
});