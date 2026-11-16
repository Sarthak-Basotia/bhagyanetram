import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Astrologer from '../models/Astrologer.js';

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

// Seed default astrologers with Base64 images directly stored in MongoDB
const getDefaultAstrologers = () => [
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

export const getPublicAstrologers = async (req, res) => {
  try {
    let astrologers = await Astrologer.find({ available: true }).sort({ order: 1, createdAt: 1 });

    // Auto-seed if empty
    if (!astrologers || astrologers.length === 0) {
      const defaults = getDefaultAstrologers();
      await Astrologer.insertMany(defaults);
      astrologers = await Astrologer.find({ available: true }).sort({ order: 1, createdAt: 1 });
    }

    // Auto-migrate legacy relative paths to Base64 in MongoDB
    for (const a of astrologers) {
      if (a.image && a.image.startsWith('/src/assets/')) {
        const filename = a.image.split('/').pop();
        const mime = filename.endsWith('.png') ? 'image/png' : 'image/jpeg';
        const b64 = getBase64Asset(filename, mime);
        if (b64) {
          a.image = b64;
          await Astrologer.findByIdAndUpdate(a._id, { image: b64 });
        }
      }
    }

    return res.status(200).json({
      success: true,
      data: astrologers,
    });
  } catch (error) {
    console.error('Fetch Astrologers Error:', error);
    // If DB fails, fallback cleanly to default
    return res.status(200).json({
      success: true,
      data: getDefaultAstrologers(),
    });
  }
};
