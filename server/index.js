

const Booking = require('./models/Booking');
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); 
const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' }); 

const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const getNextUserId = require('./utils/NextUserId');
const Trip = require('./models/Trip');
const app = express();
app.use(cors());
app.use(express.json());

console.log(process.env.GEMINI_API_KEY);

const insertDummyTrips = async () => {
  const existing = await Trip.find();
  if (existing.length === 0) {
    await Trip.insertMany([
      {
        destination: 'Baalbek',
        description: 'Explore ancient Roman ruins in Baalbek.',
        date: '2025-04-22',
        time: '09:00'
      },
      {
        destination: 'Zahle',
        description: 'Relax by the Litani River with delicious cuisine.',
        date: '2025-04-23',
        time: '14:00'
      },
      {
        destination: 'Qaraoun Lake',
        description: 'Enjoy a peaceful boat ride on the lake.',
        date: '2025-04-22',
        time: '10:30'
      },
      {
        destination: 'Anjar',
        description: 'Visit the famous Umayyad ruins in the scenic town of Anjar.',
        date: '2025-04-24',
        time: '11:00'
      },
      {
        destination: 'Chtaura',
        description: 'Savor fresh dairy products and shop local goods in Chtaura.',
        date: '2025-04-25',
        time: '13:00'
      },
      {
        destination: 'Deir el Ahmar',
        description: 'Discover vineyards and historic churches in Deir el Ahmar.',
        date: '2025-04-26',
        time: '08:30'
      }
    ]);
    
  }
};


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    insertDummyTrips(); // insert trips only if not already present
  })
  .catch(err => console.error('MongoDB connection error:', err));


  app.post('/api/signup', async (req, res) => {
    try {
      const { fullName, contact, password } = req.body;   //retreive inputs from req.body
  
     // Validate input
if (!fullName || !contact || !password) {
  return res.status(400).json({ message: 'All fields are required' });
}

// Strong password validation
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

if (!strongPasswordRegex.test(password)) {
  return res.status(400).json({ message: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.' });
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

    res.status(200).json({
      message: 'Login successful',
      user: {
        fullName: user.fullName,
        contact: user.contact 
      }
    });
    
  } catch (err) {
    console.error('Signin error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/trips', async (req, res) => {
  try {
    const trips = await Trip.find();
    res.status(200).json(trips);
  } catch (err) {
    console.error('Error fetching trips:', err);
    res.status(500).json({ message: 'Failed to retrieve trips' });
  }
});

  app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
  });
  
  app.post('/api/bookings', async (req, res) => {
    try {
      const { userFullName, contact, trips } = req.body;
  
      if (!userFullName || !contact || !trips || trips.length === 0) {
        return res.status(400).json({ message: 'Missing booking details' });
      }
  
      const newBooking = new Booking({
        userFullName,
        contact,
        trips,
      });
  
      await newBooking.save();
  
      res.status(201).json({ message: 'Booking confirmed successfully!' });
    } catch (error) {
      console.error('Booking error:', error);
      res.status(500).json({ message: 'Server error during booking' });
    }
  });

  app.post('/api/checkout', async (req, res) => {
    const { userFullName, contact, trips } = req.body;
  
  
    if (!userFullName || !contact || !trips || trips.length === 0) {
      return res.status(400).json({ message: 'Missing booking information' });
    }
  
    try {
      // Find existing bookings for this user
      const existingBookings = await Booking.find({ userFullName, contact });
  
      // Check if any existing booking has identical trips
      const isDuplicate = existingBookings.some(booking => {
        if (booking.trips.length !== trips.length) return false;
  
        return booking.trips.every(trip => 
          trips.some(newTrip =>
            newTrip.destination === trip.destination &&
            newTrip.date === trip.date &&
            newTrip.time === trip.time
          )
        );
      });
  
      if (isDuplicate) {
        return res.status(409).json({ message: 'Duplicate booking already exists.' });
      }
  
      // Save booking
      const newBooking = new Booking({ userFullName, contact, trips });
      const saved = await newBooking.save();
      console.log('Booking saved:', saved);
      return res.status(201).json({ message: 'Booking saved successfully' });
    } catch (err) {
      console.error('Booking save error:', err);
      return res.status(500).json({ message: 'Failed to save booking' });
    }
  });
  
  
  app.post('/api/suggestions', async (req, res) => {
    const { destination, date, time } = req.body;
    console.log('Received suggestion request for:', destination, date, time);
  
    try {
      const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' }); 
  
      const result = await model.generateContent([
        `I'm going on a trip to ${destination} on ${date} at ${time}. What are 5 essential things I should take with me? Just list them clearly.`
      ]);
  
      const text = result.response.text();
  
      const items = text
        .split('\n')
        .map(line => line.replace(/^\d+\.?\s*/, '').trim())
        .filter(Boolean);
  
      res.json({ items });
    } catch (error) {
      console.error('Gemini API error:', error.message);
      res.status(500).json({ message: 'Failed to fetch AI suggestions' });
    }
  });
  
  
  
  
  
  
  