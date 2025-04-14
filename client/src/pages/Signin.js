import React, { useState, useEffect } from 'react'; 
import './SignIn.css';
import { Link, useNavigate } from 'react-router-dom'; //useNavigate: to redirect to another page

function Signin({ user,setUser }) {

  //Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  //This formData state stores:
// What the user types into the email/phone field
// What they type into the password field
  const [formData, setFormData] = useState({
    contact: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //handleSubmit Function:
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      //Send a POST request to your backend:
      const response = await fetch('http://localhost:5000/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();


      if (response.ok) {
  localStorage.setItem('user', JSON.stringify({ fullName: data.user.fullName }));
  setUser({ fullName: data.user.fullName }); //  This updates App.js immediately
  navigate('/'); // Redirect to home
}


    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <div className="signin-left">
          <h2>Welcome Back!</h2>
          <p>Sign in to explore unforgettable trips across Beqaa, Lebanon.</p>
        </div>

        <div className="signin-right">
          <h3>Sign In</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email or Phone</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Enter phone or email"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </div>

            <button type="submit" className="signin-btn">Login</button>
          </form>

          <p className="signup-link" style={{ marginTop: '1rem' }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: '#004d40', fontWeight: 'bold' }}>
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
