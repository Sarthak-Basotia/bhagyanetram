import Blog from '../models/Blog.js';

export const defaultBlogs = [
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

export const ensureDefaultBlogs = async () => {
  try {
    const count = await Blog.countDocuments({});
    if (count === 0) {
      console.log('No blogs found in MongoDB. Auto-seeding default website blog...');
      await Blog.insertMany(defaultBlogs);
    }
  } catch (err) {
    console.warn('ensureDefaultBlogs error:', err.message);
  }
};

export const getPublicBlogs = async (req, res) => {
  try {
    await ensureDefaultBlogs();
    const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
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
