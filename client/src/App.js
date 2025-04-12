
import React, { useEffect, useState } from 'react'; 
import './style.css';

//for animations:
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import components
import Carousel from './components/Carousel';
import Features from './components/Features';
import Explore from './components/Explore';
import VideoSection from './components/VideoSection';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import Booking from './components/Booking';
import Footer from './components/Footer';

function App() {
  const [scrolled, setScrolled] = useState(false);

  // Initialize AOS (Animate On Scroll)
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  //  Add scroll listener for navbar animation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className={`navbar navbar-expand-lg fixed-top px-5 ${scrolled ? 'navbar-scrolled custom-navbar' : 'custom-navbar'}`}>
        <div className="container">
          <a className="navbar-brand text-white" href="#">Beqaa Tours</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link text-white" href="#">Home</a></li>
              <li className="nav-item"><a className="nav-link text-white" href="#">Book a trip</a></li>
              <li className="nav-item"><a className="nav-link text-white" href="#about">About Us</a></li>
              <li className="nav-item"><a className="nav-link text-white" href="#"><i className="bi bi-cart"></i> Cart</a></li>
              <li className="nav-item"><a className="nav-link text-white" href="#"><i className="bi"></i> Register/SignIn</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Sections */}
      <Carousel />
      <Features />
      <Explore />
      <VideoSection />
      <FAQ />
      <Testimonials />
      <Booking />
      <Footer />

    </>
  );
}

export default App;
