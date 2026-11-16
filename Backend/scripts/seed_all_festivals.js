import 'dotenv/config';
import mongoose from 'mongoose';
import { Festival } from '../models/Festival.js';
import { generateMonthCalendar } from '../services/festivalGenerator.js';

async function seed() {
  try {
    const mongoUri = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/spiritual_db';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB:', mongoUri);

    console.log('Cleaning existing festival documents to remove hallucinated dates...');
    await Festival.deleteMany({});

    for (let month = 1; month <= 12; month++) {
      const calendarData = await generateMonthCalendar(2026, month);
      await Festival.create(calendarData);
      console.log(`Successfully seeded authentic month ${month}: ${calendarData.westernMonthName}`);
    }

    console.log('Successfully re-seeded all 12 verified months for 2026 into database!');
    await mongoose.disconnect();
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
