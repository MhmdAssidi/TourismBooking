const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  fullName: String,
  contact: String,
  password: String,
});

module.exports = mongoose.model('User', userSchema);
