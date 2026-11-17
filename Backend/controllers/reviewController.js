import Review from '../models/Review.js';

export const defaultReviews = [
  {
    name: 'Sheeshpal Singh',
    initials: 'SS',
    location: 'Mumbai',
    text: 'The Vastu consultation changed my life completely. Within 3 months of implementing the suggestions, my business started flourishing and family relationships improved dramatically.',
    rating: 5,
    date: '2 days ago',
    active: true,
    order: 1,
  },
  {
    name: 'Shanti Agarwal',
    initials: 'SA',
    location: 'Ahmedabad',
    text: "Pranav Bhaiya's birth chart reading was incredibly accurate. The remedies he suggested for my career have shown results faster than I expected. Highly recommend!",
    rating: 5,
    date: '5 days ago',
    active: true,
    order: 2,
  },
  {
    name: 'Kavita Reddy',
    initials: 'KR',
    location: 'Gurugram',
    text: 'I was skeptical at first, but the predictions about my relationship were spot on. The guidance helped me make the right decision. Forever grateful!',
    rating: 5,
    date: '1 week ago',
    active: true,
    order: 3,
  },
];

// Helper to auto-generate initials if not specified
const deriveInitials = (name) => {
  if (!name) return '✦';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

export const ensureDefaultReviews = async () => {
  try {
    const count = await Review.countDocuments({});
    if (count === 0) {
      console.log('No client reviews found in MongoDB. Auto-seeding default reviews...');
      await Review.insertMany(defaultReviews);
    }
  } catch (err) {
    console.warn('ensureDefaultReviews error:', err.message);
  }
};

// Public endpoint for homepage
export const getPublicReviews = async (req, res) => {
  try {
    await ensureDefaultReviews();
    const reviews = await Review.find({ active: true }).sort({ order: 1, createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: reviews.length > 0 ? reviews : defaultReviews,
    });
  } catch (error) {
    console.error('Fetch Public Reviews Error:', error);
    return res.status(200).json({ success: true, data: defaultReviews });
  }
};

// Admin endpoints
export const getAllReviewsAdmin = async (req, res) => {
  try {
    await ensureDefaultReviews();
    const reviews = await Review.find({}).sort({ order: 1, createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.error('Fetch All Reviews Admin Error:', error);
    return res.status(500).json({ error: 'Failed to retrieve reviews.' });
  }
};

export const createReview = async (req, res) => {
  try {
    const { name, initials, location, text, rating, date, active, order } = req.body;

    if (!name || !text) {
      return res.status(400).json({ error: 'Client name and review text are required.' });
    }

    const review = new Review({
      name: name.trim(),
      initials: initials ? initials.trim().toUpperCase() : deriveInitials(name),
      location: location ? location.trim() : 'India',
      text: text.trim(),
      rating: rating ? Number(rating) : 5,
      date: date ? date.trim() : 'Recently',
      active: active !== undefined ? Boolean(active) : true,
      order: order !== undefined ? Number(order) : 0,
    });

    await review.save();

    return res.status(201).json({
      success: true,
      message: 'Review created successfully.',
      data: review,
    });
  } catch (error) {
    console.error('Create Review Error:', error);
    return res.status(500).json({ error: 'Failed to create review.' });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, initials, location, text, rating, date, active, order } = req.body;

    const updateFields = {};
    if (name !== undefined) updateFields.name = name.trim();
    if (initials !== undefined) {
      updateFields.initials = initials ? initials.trim().toUpperCase() : deriveInitials(name);
    } else if (name) {
      updateFields.initials = deriveInitials(name);
    }
    if (location !== undefined) updateFields.location = location.trim();
    if (text !== undefined) updateFields.text = text.trim();
    if (rating !== undefined) updateFields.rating = Number(rating);
    if (date !== undefined) updateFields.date = date.trim();
    if (active !== undefined) updateFields.active = Boolean(active);
    if (order !== undefined) updateFields.order = Number(order);

    const review = await Review.findByIdAndUpdate(id, updateFields, { new: true });

    if (!review) {
      return res.status(404).json({ error: 'Review not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Review updated successfully.',
      data: review,
    });
  } catch (error) {
    console.error('Update Review Error:', error);
    return res.status(500).json({ error: 'Failed to update review.' });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Review.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Review not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Review removed successfully.',
      id,
    });
  } catch (error) {
    console.error('Delete Review Error:', error);
    return res.status(500).json({ error: 'Failed to delete review.' });
  }
};
