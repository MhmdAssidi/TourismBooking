import React from 'react';
import './SignIn.css';

//since we use the Link to go to signUp page
import { Link } from 'react-router-dom';

function Signin() {
  return (
    <div className="signin-container">
      <div className="signin-card">
        <div className="signin-left">
          <h2>Welcome Back!</h2>
          <p>Sign in to explore unforgettable trips across Beqaa, Lebanon.</p>
        </div>

        <div className="signin-right">
          <h3>Sign In</h3>
          <form>
            <div className="form-group">
              <label>Email or Phone</label>
              <input type="text" placeholder="Enter phone or email" required />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Enter password" required />
            </div>

            <button type="submit" className="signin-btn">Login</button>
          </form>

          <p className="signup-link" style={{ marginTop: '1rem'}}>
            Don't have an account? <Link to="/signup" style={{ color: '#004d40', fontWeight: 'bold' }}>
    Create one
  </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
