import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Astrologer from '../models/Astrologer.js';
import Blog from '../models/Blog.js';
import User from '../models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getBase64Asset = (filename, mimeType = 'image/jpeg') => {
  try {
    const filePath = path.resolve(__dirname, '../../Frontend/src/assets', filename);
    if (fs.existsSync(filePath)) {
      return `data:${mimeType};base64,` + fs.readFileSync(filePath).toString('base64');
    }
  } catch {
    // Proceed silently
  }
  return '';
};

const defaultAstrologers = [
  {
    name: 'Pandit Pranav',
    title: 'Senior Vedic Astrologer & Vastu Guru',
    specialization: 'Vedic Astrology, Vastu',
    experience: '10 Years Experience',
    languages: 'Hindi, English',
    rating: 4.9,
    reviews: '10K+',
    image: getBase64Asset('Pandit-Pranav_2.jpeg', 'image/jpeg'),
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
    image: getBase64Asset('Gargi_Ji.jpeg', 'image/jpeg'),
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
    image: getBase64Asset('Nidhi-Ji.png', 'image/png'),
    available: true,
    price: '₹25/min',
    bio: 'Expert in career transition astrology, business wealth Vastu alignments, and Ashtakoota Kundli Milan.',
    order: 3,
  },
];

const defaultBlogs = [
  {
    title: 'Vastu for the Main Entrance: Attracting Positive Energy with Stones and Shells',
    slug: 'vastu-for-the-main-entrance',
    category: 'Vastu Shastra',
    excerpt: 'The main entrance of a home or office is more than just a doorway — in Vastu Shastra, it is considered the "mukhya dwar," the mouth through which all energy, opportunity, and prosperity enters a space.',
    content: `The main entrance of a home or office is more than just a doorway — in Vastu Shastra, it is considered the "mukhya dwar," the mouth through which all energy, opportunity, and prosperity enters a space. A weak or imbalanced entrance is believed to restrict the flow of positive energy, while a correctly energized one is said to invite abundance, protection, and harmony into everything that lies beyond it.

At Bhagya Netram, one of the remedies we perform most often for clients is the embedding of natural gemstones, crystals, and shells directly into the entrance threshold. Unlike temporary fixes such as a hanging toran or a bowl of crystals that can be moved or forgotten, this remedy becomes a permanent part of the entrance itself — quietly working every single time someone crosses the threshold.

### Why Smoky Quartz and Protective Beads
Smoky quartz is traditionally regarded in Vastu and crystal practice as a grounding and absorbing stone. It is believed to pull in and neutralize negative, heavy, or stagnant energy before it can travel further into the home — much like a filter placed at the very first point of entry. Because the main door is the single busiest energy junction of any property, placing an absorptive stone exactly at this point is considered far more effective than placing it deeper inside the home.

The red, black, and white beads used alongside the crystal are a traditional protective combination associated with warding off nazar (evil eye) and negative intent. Embedding it permanently into the threshold ensures the protection is constant.

### Why Gomti Chakra and Gemstone Chips
The Gomti Chakra is a naturally occurring spiral shell found in the Gomti River near Dwarka, and is one of the most revered objects in Vastu and Hindu tradition. Its spiral pattern is said to resemble the Sudarshan Chakra of Lord Vishnu, and it is closely associated with Goddess Lakshmi. Traditionally, Gomti Chakras placed at or near the main entrance are believed to attract wealth, ward off negativity, and harmonize planetary energies.`,
    author: 'Bhagya Netram',
    image: 'blog1.jpeg',
    date: 'September 27, 2026',
    published: true,
    views: 420,
    tags: ['Vastu Shastra', 'Main Entrance', 'Gomti Chakra', 'Home Remedies'],
  },
];

async function seed() {
  try {
    const mongoUri = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/spiritual_db';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB:', mongoUri);

    // 1. Seed Astrologers
    for (const a of defaultAstrologers) {
      await Astrologer.findOneAndUpdate(
        { name: a.name },
        a,
        { upsert: true, new: true }
      );
      console.log(`Seeded astrologer: ${a.name}`);
    }

    // 2. Seed Blogs
    for (const b of defaultBlogs) {
      await Blog.findOneAndUpdate(
        { slug: b.slug },
        b,
        { upsert: true, new: true }
      );
      console.log(`Seeded blog: ${b.title}`);
    }

    // 3. Ensure Admin User
    await User.findOneAndUpdate(
      { email: 'admin@bhagyanetram.com' },
      {
        name: 'BhagyaNetram Administrator',
        email: 'admin@bhagyanetram.com',
        phone: '+91 7905755326',
        role: 'admin',
        palmistryCredits: 999,
        status: 'active',
        termsAccepted: true,
      },
      { upsert: true, new: true }
    );
    console.log('Admin user ensured: admin@bhagyanetram.com');

    console.log('All default admin records seeded successfully!');
    await mongoose.disconnect();
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
