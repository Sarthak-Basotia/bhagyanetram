import jwt from 'jsonwebtoken';
import Astrologer from '../models/Astrologer.js';
import Blog from '../models/Blog.js';
import Booking from '../models/booking.js';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'bhagyanetram_secret_key_123';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@bhagyanetram.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@2026';

// ==========================================
// 1. ADMIN AUTHENTICATION
// ==========================================
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check credentials against environment configuration or User model
    const isValidEnvAdmin =
      cleanEmail === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD;

    let userAdmin = null;
    if (!isValidEnvAdmin) {
      userAdmin = await User.findOne({ email: cleanEmail, role: 'admin' });
    }

    if (!isValidEnvAdmin && !userAdmin) {
      return res.status(401).json({ error: 'Invalid admin email or password.' });
    }

    // Generate Admin JWT
    const token = jwt.sign(
      {
        userId: userAdmin ? userAdmin._id : 'admin-master',
        email: cleanEmail,
        role: 'admin',
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Admin authentication successful.',
      token,
      admin: {
        email: cleanEmail,
        name: userAdmin ? userAdmin.name : 'BhagyaNetram Administrator',
        role: 'admin',
      },
    });
  } catch (error) {
    console.error('Admin Login Error:', error);
    return res.status(500).json({ error: 'Internal server error during admin login.' });
  }
};

// ==========================================
// 2. DASHBOARD OVERVIEW STATS
// ==========================================
export const getAdminStats = async (req, res) => {
  try {
    const [
      totalAstrologers,
      totalBlogs,
      totalQueries,
      pendingQueries,
      resolvedQueries,
      totalUsers,
      recentQueries,
    ] = await Promise.all([
      Astrologer.countDocuments({}),
      Blog.countDocuments({}),
      Booking.countDocuments({}),
      Booking.countDocuments({ status: 'pending' }),
      Booking.countDocuments({ status: 'resolved' }),
      User.countDocuments({}),
      Booking.find({}).sort({ createdAt: -1 }).limit(6),
    ]);

    return res.status(200).json({
      success: true,
      stats: {
        totalAstrologers,
        totalBlogs,
        totalQueries,
        pendingQueries,
        resolvedQueries,
        totalUsers,
      },
      recentQueries,
    });
  } catch (error) {
    console.error('Admin Stats Error:', error);
    return res.status(500).json({ error: 'Failed to retrieve admin dashboard stats.' });
  }
};

// ==========================================
// 3. ASTROLOGER MANAGEMENT (CRUD)
// ==========================================
export const getAllAstrologersAdmin = async (req, res) => {
  try {
    const astrologers = await Astrologer.find({}).sort({ order: 1, createdAt: 1 });
    return res.status(200).json({
      success: true,
      data: astrologers,
    });
  } catch (error) {
    console.error('Fetch All Astrologers Admin Error:', error);
    return res.status(500).json({ error: 'Failed to retrieve astrologers.' });
  }
};

export const createAstrologer = async (req, res) => {
  try {
    const {
      name,
      title,
      specialization,
      experience,
      languages,
      rating,
      reviews,
      image,
      available,
      price,
      bio,
      order,
    } = req.body;

    if (!name || !specialization || !experience) {
      return res.status(400).json({
        error: 'Name, specialization, and experience are mandatory fields.',
      });
    }

    const astrologer = await Astrologer.create({
      name,
      title: title || 'Vedic Astrologer & Vastu Consultant',
      specialization,
      experience,
      languages: languages || 'Hindi, English',
      rating: Number(rating) || 4.9,
      reviews: reviews || '100+',
      image: image || '',
      available: available !== undefined ? available : true,
      price: price || '₹25/min',
      bio: bio || '',
      order: Number(order) || 0,
    });

    return res.status(201).json({
      success: true,
      message: 'Astrologer created successfully.',
      data: astrologer,
    });
  } catch (error) {
    console.error('Create Astrologer Error:', error);
    return res.status(500).json({ error: 'Failed to create astrologer profile.' });
  }
};

export const updateAstrologer = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    const astrologer = await Astrologer.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!astrologer) {
      return res.status(404).json({ error: 'Astrologer profile not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Astrologer profile updated successfully.',
      data: astrologer,
    });
  } catch (error) {
    console.error('Update Astrologer Error:', error);
    return res.status(500).json({ error: 'Failed to update astrologer profile.' });
  }
};

export const deleteAstrologer = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Astrologer.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Astrologer not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Astrologer removed successfully from website.',
      id,
    });
  } catch (error) {
    console.error('Delete Astrologer Error:', error);
    return res.status(500).json({ error: 'Failed to delete astrologer.' });
  }
};

// ==========================================
// 4. BLOG MANAGEMENT (CRUD)
// ==========================================
export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    console.error('Get Admin Blogs Error:', error);
    return res.status(500).json({ error: 'Failed to retrieve blogs.' });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, slug, category, excerpt, content, author, image, published, tags } = req.body;

    if (!title || !content || !excerpt) {
      return res.status(400).json({ error: 'Title, excerpt, and content are required.' });
    }

    // Auto-generate slug if not provided
    const blogSlug = (slug || title)
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Check if slug exists
    const existing = await Blog.findOne({ slug: blogSlug });
    const finalSlug = existing ? `${blogSlug}-${Date.now().toString().slice(-4)}` : blogSlug;

    const blog = await Blog.create({
      title,
      slug: finalSlug,
      category: category || 'Astrology',
      excerpt,
      content,
      author: author || 'Bhagya Netram',
      image: image || 'blog1.jpeg',
      published: published !== undefined ? published : true,
      tags: tags || [],
    });

    return res.status(201).json({
      success: true,
      message: 'Blog article created successfully.',
      data: blog,
    });
  } catch (error) {
    console.error('Create Blog Error:', error);
    return res.status(500).json({ error: 'Failed to publish blog article.' });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    const blog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Blog updated successfully.',
      data: blog,
    });
  } catch (error) {
    console.error('Update Blog Error:', error);
    return res.status(500).json({ error: 'Failed to update blog article.' });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Blog.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Blog post not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Blog post deleted successfully.',
      id,
    });
  } catch (error) {
    console.error('Delete Blog Error:', error);
    return res.status(500).json({ error: 'Failed to delete blog article.' });
  }
};

// ==========================================
// 5. QUERIES & INQUIRIES MANAGEMENT
// ==========================================
export const getAllQueries = async (req, res) => {
  try {
    const { status, search } = req.query;
    const filter = {};

    if (status && status !== 'all') {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
      ];
    }

    const queries = await Booking.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: queries,
      count: queries.length,
    });
  } catch (error) {
    console.error('Get Queries Error:', error);
    return res.status(500).json({ error: 'Failed to retrieve inquiries.' });
  }
};

export const updateQueryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const updateFields = {};
    if (status) updateFields.status = status;
    if (adminNotes !== undefined) updateFields.adminNotes = adminNotes;

    const query = await Booking.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!query) {
      return res.status(404).json({ error: 'Query not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Query updated successfully.',
      data: query,
    });
  } catch (error) {
    console.error('Update Query Status Error:', error);
    return res.status(500).json({ error: 'Failed to update query.' });
  }
};

export const deleteQuery = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Booking.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Query not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Query deleted successfully.',
      id,
    });
  } catch (error) {
    console.error('Delete Query Error:', error);
    return res.status(500).json({ error: 'Failed to delete query.' });
  }
};

// ==========================================
// 6. USER ACCOUNTS MANAGEMENT
// ==========================================
export const getAllUsers = async (req, res) => {
  try {
    const { search } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    const users = await User.find(filter, {
      otp: 0,
      otpExpires: 0,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: users,
      count: users.length,
    });
  } catch (error) {
    console.error('Get Users Error:', error);
    return res.status(500).json({ error: 'Failed to retrieve user accounts.' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, palmistryCredits, role, status } = req.body;

    const updateFields = {};
    if (name) updateFields.name = name;
    if (phone) updateFields.phone = phone;
    if (palmistryCredits !== undefined) updateFields.palmistryCredits = Number(palmistryCredits);
    if (role) updateFields.role = role;
    if (status) updateFields.status = status;

    const user = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
      select: '-otp -otpExpires',
    });

    if (!user) {
      return res.status(404).json({ error: 'User account not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'User account updated successfully.',
      data: user,
    });
  } catch (error) {
    console.error('Update User Error:', error);
    return res.status(500).json({ error: 'Failed to update user account.' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: 'User account not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'User account removed successfully.',
      id,
    });
  } catch (error) {
    console.error('Delete User Error:', error);
    return res.status(500).json({ error: 'Failed to delete user account.' });
  }
};
