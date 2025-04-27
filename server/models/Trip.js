const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  destination: String,
  description: String,
  date: String,
  time: String
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
