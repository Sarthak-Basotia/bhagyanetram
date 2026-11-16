import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Astrologer from '../models/Astrologer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  try {
    const mongoUri = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/spiritual_db';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB:', mongoUri);

    const assetsDir = path.resolve(__dirname, '../../Frontend/src/assets');

    // Read and encode images to Base64 data URLs
    const pranavPath = path.join(assetsDir, 'Pandit-Pranav_2.jpeg');
    const gargiPath = path.join(assetsDir, 'Gargi_Ji.jpeg');
    const nidhiPath = path.join(assetsDir, 'Nidhi-Ji.png');

    const pranavB64 = fs.existsSync(pranavPath)
      ? 'data:image/jpeg;base64,' + fs.readFileSync(pranavPath).toString('base64')
      : '';
    const gargiB64 = fs.existsSync(gargiPath)
      ? 'data:image/jpeg;base64,' + fs.readFileSync(gargiPath).toString('base64')
      : '';
    const nidhiB64 = fs.existsSync(nidhiPath)
      ? 'data:image/png;base64,' + fs.readFileSync(nidhiPath).toString('base64')
      : '';

    console.log('Encoded images into Base64:');
    console.log(' - Pandit Pranav:', pranavB64 ? `${pranavB64.length} chars` : 'missing');
    console.log(' - Gargi Ji:', gargiB64 ? `${gargiB64.length} chars` : 'missing');
    console.log(' - Nidhi Ji:', nidhiB64 ? `${nidhiB64.length} chars` : 'missing');

    const defaults = [
      {
        name: 'Pandit Pranav',
        title: 'Senior Vedic Astrologer & Vastu Guru',
        specialization: 'Vedic Astrology, Vastu',
        experience: '10 Years Experience',
        languages: 'Hindi, English',
        rating: 4.9,
        reviews: '10K+',
        image: pranavB64,
        available: true,
        price: '₹35/min',
        bio: 'Renowned expert in classical Parashari Astrology, Prashna Kundli, and residential & commercial Vastu Shastra corrections without structural demolition.',
        order: 1,
      },
      {
        name: 'Gargi Ji',
        title: 'Vedic Astrologer & Certified Palmistry Master',
        specialization: 'Palmistry, Astro, Vastu',
        experience: '7 Years Experience',
        languages: 'Hindi',
        rating: 4.9,
        reviews: '2011',
        image: gargiB64,
        available: true,
        price: '₹25/min',
        bio: 'Specialist in Hastarekha (Palmistry), planetary gemology remedies, marriage compatibility, and maternal health astrology.',
        order: 2,
      },
      {
        name: 'Nidhi Ji',
        title: 'Astro-Vastu Specialist & Tarot Counselor',
        specialization: 'Vedic Astrology, Vastu',
        experience: '7 Years Experience',
        languages: 'Hindi, English',
        rating: 4.9,
        reviews: '3156',
        image: nidhiB64,
        available: true,
        price: '₹25/min',
        bio: 'Expert in career transition astrology, business wealth Vastu alignments, and Ashtakoota Kundli Milan.',
        order: 3,
      },
    ];

    for (const astro of defaults) {
      const updated = await Astrologer.findOneAndUpdate(
        { name: astro.name },
        { ...astro },
        { upsert: true, new: true }
      );
      console.log(`Updated Astrologer [${astro.name}] with Base64 image in MongoDB. ID: ${updated._id}`);
    }

    const all = await Astrologer.find({});
    console.log(`Total Astrologers in MongoDB: ${all.length}`);
    for (const a of all) {
      console.log(` - ${a.name} | Image length: ${a.image?.length || 0} | Image starts with: ${a.image?.substring(0, 30)}...`);
    }

    await mongoose.disconnect();
    console.log('MongoDB disconnected successfully.');
  } catch (err) {
    console.error('Update error:', err);
    process.exit(1);
  }
}

run();
