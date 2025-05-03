const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // your Gmail
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

async function sendBookingEmail({ to, name, trips }) {
  const htmlContent = `
    <h2>Hi ${name},</h2>
    <p>Your trip booking was successful! 🎉</p>
    <p><strong>Your selected trips:</strong></p>
    <ul>
      ${trips.map(trip => `<li>${trip.destination} on ${trip.date} at ${trip.time}</li>`).join('')}
    </ul>
    <p>We look forward to seeing you onboard!</p>
    <p>— Beqaa Tours</p>
  `;

  await transporter.sendMail({
    from: `"Beqaa Tours" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Booking Confirmation - Beqaa Tours',
    html: htmlContent,
  });
}

module.exports = sendBookingEmail;
