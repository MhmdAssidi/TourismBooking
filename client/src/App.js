import Cart from './pages/Cart';
import React, { useEffect, useState } from 'react'; 
import './style.css';
import { Routes, Route, Link } from 'react-router-dom';
import BookTrip from './pages/BookTrip';
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
// Pages
import Signin from './pages/Signin';
import Signup from './pages/Signup';
function App() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null); 
  // Initialize AOS (Animate On Scroll)
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

useEffect(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);
const handleLogout = () => {
  localStorage.removeItem('user');
  setUser(null);
};
  return (
    <>
      {/* Navbar */}
      <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'navbar-scrolled' : 'custom-navbar'}`}>
  <div className="container-fluid px-4">
    {/* Left side: Logo */}
    <Link className="navbar-brand" to="/">Beqaa Tours</Link>

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

    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
      {/* Center: Links */}
      <ul className="navbar-nav">
        <li className="nav-item mx-2">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item mx-2">
          <Link to="/book" className="nav-link">Book a Trip</Link>
        </li>
        <li className="nav-item mx-2">
          <a href="#about" className="nav-link">About Us</a>
        </li>
        <li className="nav-item">
  <Link to="/cart" className="nav-link text-white">
    <i className="bi bi-cart"></i> Picked Trips
  </Link>
</li>
      </ul>
    </div>

   
    <div className="d-flex align-items-center">
      {user ? (
        <>
          <span className="nav-link text-white me-4">Welcome, {user.fullName}</span>
          <button
            onClick={handleLogout}
            className="btn btn-outline-light rounded-pill"
          >
            Logout
          </button>
        </>
      ) : (
        <Link to="/signin" className="btn btn-outline-light rounded-pill">
          Register / SignIn
        </Link>
      )}
    </div>
  </div>
</nav>

      {/* Pages Routing */}
      <Routes>
        <Route
          path="/"  /// will route to teh home page:
          element={
            <>
              <Carousel />
              <Features />
              <Explore />
              <VideoSection />
              <FAQ />
              <Testimonials />
              <Booking />
              <Footer />
            </>
          }
        />
        {/* Signin and Signup are each just React components that act as pages. */}
        <Route path="/signin" element={<Signin user={user} setUser={setUser} />} />
        <Route path="/signup" element={<Signup user={user} setUser={setUser} />} />
        <Route path="/book" element={<BookTrip user={user} />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
