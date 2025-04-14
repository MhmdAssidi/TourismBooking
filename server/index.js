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
      const { fullName, contact, password } = req.body;   //retreive inputs from req.body
  
      // Validate input
      if (!fullName || !contact || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Check if user already exists
      const existingUser = await User.findOne({ fullName, contact });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists with this name and contact' });
      }
  
      // Generate user ID and hash password
      const userId = await getNextUserId();
      const hashedPassword = await bcrypt.hash(password, 10);
  
      //create the new user
      const newUser = new User({
        userId,
        fullName,
        contact,
        password: hashedPassword
      });
  
      await newUser.save();  //save it in the backend
      res.status(201).json({ message: 'User registered successfully' });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  //  Signin route
app.post('/api/signin', async (req, res) => {
  const { contact, password } = req.body;

  try {
    const user = await User.findOne({ contact });  //email or phone

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful', user: { fullName: user.fullName } });
  } catch (err) {
    console.error('Signin error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

  app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
  });
  