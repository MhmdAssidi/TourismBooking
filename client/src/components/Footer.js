import React from 'react';

function Footer() {
  return (
    <footer>
      <div className="container d-flex flex-lg-row flex-column">
        <div className="row pt-5">
          <div className="d-block col-lg-4 mb-sm-3">
            <h4><a href="#" style={{ textDecoration: 'none', color: '#000' }}>Beqaa Tours</a></h4>
            <p>
              A person susceptible to 'wanderlust' is not so much addicted to movement as committed to transformation.
            </p>
          </div>

          <div className="d-block col-lg-5 mb-sm-3 input-footer">
            <h4><a href="#" style={{ textDecoration: 'none', color: '#000' }}>
              Subscribe to our newsletter
            </a></h4>
            <input type="email" placeholder="Enter your email address" />
            <button className="btn1 btn-md rounded-0 px-1 text-white" style={{ marginTop: '8px' }}>
              Subscribe
            </button>
          </div>

          <div className="social-icons col-lg-3">
            <a href="#"><img src="/images/icon-facebook.svg" alt="Facebook" /></a>
            <a href="#"><img width="25" height="25" src="/images/logo-black.png" alt="X" /></a>
            <a href="#"><img src="/images/icon-instagram.svg" alt="Instagram" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
