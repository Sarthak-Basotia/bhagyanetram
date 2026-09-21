// src/emailUtils.js
import nodemailer from "nodemailer";

const SMTP_SERVER = process.env.SMTP_SERVER || "smtpout.secureserver.net";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "465", 10);
const SENDER_EMAIL = process.env.SENDER_EMAIL || "contact@bhagyanetram.com";
const SENDER_PASSWORD = process.env.SENDER_PASSWORD || "Admin@2026";
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || "contact@bhagyanetram.com";

const transporter = nodemailer.createTransport({
  host: SMTP_SERVER,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: {
    user: SENDER_EMAIL,
    pass: SENDER_PASSWORD,
  },
});

export const sendBookingEmail = async (bookingData) => {
  try {
    const subject = `New Spiritual Consultation Booking - ${bookingData.name || ""}`;
    const servicesStr = (bookingData.services || []).join(", ");
    const otherSvc = bookingData.otherService || "N/A";
    const dateStr = bookingData.date
      ? new Date(bookingData.date).toISOString().split("T")[0]
      : "Not specified";
    const timeStr = bookingData.time || "Not specified";
    const messageStr = bookingData.message || "None";

    const htmlContent = `
      <h2>New Booking Notification</h2>
      <p><strong>Name:</strong> ${bookingData.name}</p>
      <p><strong>Email:</strong> ${bookingData.email}</p>
      <p><strong>Phone:</strong> ${bookingData.phone}</p>
      <p><strong>Services Required:</strong> ${servicesStr}</p>
      <p><strong>Other Service Specified:</strong> ${otherSvc}</p>
      <p><strong>Date:</strong> ${dateStr}</p>
      <p><strong>Time:</strong> ${timeStr}</p>
      <p><strong>Message:</strong> ${messageStr}</p>
    `;

    await transporter.sendMail({
      from: SENDER_EMAIL,
      to: RECIPIENT_EMAIL,
      subject,
      html: htmlContent,
    });

    console.log(`Notification email successfully sent to ${RECIPIENT_EMAIL}`);
  } catch (error) {
    console.error(`Failed to send email: ${error.message}`);
  }
};