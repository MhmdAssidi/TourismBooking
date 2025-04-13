const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const getNextUserId = require('./utils/NextUserId');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

  app.post('/api/signup', async (req, res) => {
    try {
      console.log('Request body:', req.body);
  
      const { fullName, contact, password } = req.body;
  
      if (!fullName || !contact || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Optional: console log to make sure password and contact are coming through
      console.log(' Saving user:', fullName, contact);
  
      const userId = await getNextUserId(); // this should return a number
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        userId,
        fullName,
        contact,
        password:hashedPassword
      });
  
      await newUser.save();
      console.log(' User saved to DB');
      res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
      console.error('❌ Backend error:', err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  });
  
  app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
  });
  