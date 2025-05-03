import React, { useState, useEffect } from 'react'; 
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';

function Signup({ user, setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    fullName: '',
    contact: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { fullName, contact, password } = formData;
  
    // Check if contact is valid (either 8-digit phone or valid email)
    const isEmail = contact.includes('@') && contact.includes('.');
    const isPhone = /^\d{8}$/.test(contact);
  
    if (!isEmail && !isPhone) {
      alert('Contact must be a valid Gmail or an 8-digit phone number.');
      return;
    }
  // Validate password strength
  const strongPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!strongPassword.test(password)) {
    alert('Password must be at least 8 characters and include at least one letter and one number.');
    return;
  }
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, contact, password }),
      });
  
      if (response.ok) {
        const savedUser = { fullName, contact };
        localStorage.setItem('user', JSON.stringify(savedUser));
        setUser(savedUser);
        navigate('/');
      } else {
        const error = await response.json();
        alert(error.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    }
  };
  

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create an Account</h2>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="contact"
          placeholder="Phone Number or Gmail"
          value={formData.contact}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Sign Up</button>

        <p className="signup-link">
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
