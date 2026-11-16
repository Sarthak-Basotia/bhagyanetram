import Booking from '../models/booking.js';
import { sendBookingEmail } from '../emailUtils.js';

export const createPublicBooking = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      services,
      otherService,
      date,
      time,
      message,
      astrologerName,
      source,
    } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone number are required.' });
    }

    const servicesList = Array.isArray(services) && services.length > 0 ? services : ['General Consultation'];

    const booking = await Booking.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      services: servicesList,
      otherService: otherService || null,
      date: date ? new Date(date) : null,
      time: time || null,
      message: message || null,
      astrologerName: astrologerName || 'Any Available Astrologer',
      source: source || 'website',
      status: 'pending',
    });

    // Send email notification asynchronously so response is fast
    sendBookingEmail({
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      services: booking.services,
      otherService: booking.otherService,
      date: booking.date,
      time: booking.time,
      message: booking.message,
    }).catch(err => console.warn('Booking email dispatch error:', err.message));

    return res.status(201).json({
      success: true,
      message: 'Your inquiry has been submitted successfully! Our expert will connect with you soon.',
      bookingId: booking._id,
    });
  } catch (error) {
    console.error('Create Booking Error:', error);
    return res.status(500).json({ error: 'Failed to process consultation booking.' });
  }
};
