import Astrologer from '../models/Astrologer.js';

// Seed default astrologers if collection is empty
const defaultAstrologers = [
  {
    name: 'Pandit Pranav',
    title: 'Senior Vedic Astrologer & Vastu Guru',
    specialization: 'Vedic Astrology, Vastu',
    experience: '10 Years Experience',
    languages: 'Hindi, English',
    rating: 4.9,
    reviews: '10K+',
    image: '/src/assets/Pandit-Pranav_2.jpeg',
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
    image: '/src/assets/Gargi_Ji.jpeg',
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
    image: '/src/assets/Nidhi-Ji.png',
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
      await Astrologer.insertMany(defaultAstrologers);
      astrologers = await Astrologer.find({ available: true }).sort({ order: 1, createdAt: 1 });
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
      data: defaultAstrologers,
    });
  }
};
