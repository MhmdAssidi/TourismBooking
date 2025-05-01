const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userFullName: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  trips: [
    {
      destination: String,
      date: String,
      time: String,
    }
  ],
  bookingDate: {
    type: Date,
    default: Date.now,
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
