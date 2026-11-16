import Blog from '../models/Blog.js';

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
  {
    title: 'Planetary Transits in 2026: Understanding Saturn and Jupiter Movements',
    slug: 'planetary-transits-2026-saturn-jupiter',
    category: 'Astrology',
    excerpt: 'Explore how the major celestial shifts of Shani Dev (Saturn) and Guru Brihaspati (Jupiter) shape collective karma, economic prosperity, and individual zodiac destinies in 2026.',
    content: `In Vedic astrology (Jyotish), the slow-moving heavy planets — specifically Saturn (Shani Dev) and Jupiter (Guru Brihaspati) — set the overarching karmic backdrop for years at a time. While the Moon and Sun trigger daily and monthly emotional cycles, Jupiter bestows divine grace and expansion, while Saturn enforces discipline, structure, and accountability.

### The Influence of Jupiter in 2026
Jupiter's transit activates houses of fortune, higher spiritual knowledge, and dharmic righteousness. Individuals running Jupiter Mahadasha or Antardasha will feel an awakening towards ethical enterprise and personal growth.

### The Steady Gaze of Shani Dev
Saturn's transit tests the integrity of your foundational systems. It strips away illusions and rewards sincere, steady labor. Remedial measures such as daily Hanuman Chalisa recitation and lighting mustard oil lamps on Saturdays offer immense spiritual balance during Sade Sati periods.`,
    author: 'Pandit Pranav',
    image: 'blog1.jpeg',
    date: 'October 14, 2026',
    published: true,
    views: 285,
    tags: ['Astrology', 'Planetary Transit', 'Saturn', 'Jupiter'],
  },
];

export const getPublicBlogs = async (req, res) => {
  try {
    let blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });

    if (!blogs || blogs.length === 0) {
      await Blog.insertMany(defaultBlogs);
      blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
    }

    return res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    console.error('Fetch Blogs Error:', error);
    return res.status(200).json({ success: true, data: defaultBlogs });
  }
};

export const getPublicBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOneAndUpdate(
      { slug, published: true },
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found.' });
    }

    return res.status(200).json({ success: true, data: blog });
  } catch (error) {
    console.error('Fetch Blog By Slug Error:', error);
    return res.status(500).json({ error: 'Failed to retrieve blog article.' });
  }
};
