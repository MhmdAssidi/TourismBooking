
import React, { useEffect, useState } from 'react'; 
import './style.css';
import { Routes, Route, Link } from 'react-router-dom';

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

  //  Add scroll listener for navbar animation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
// Load user from localStorage
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
            <li className="nav-item">
             <Link to="/" className="nav-link text-white">
                   Home
               </Link>
          </li>

              <li className="nav-item"><a className="nav-link text-white" href="#">Book a trip</a></li>
              <li className="nav-item"><a className="nav-link text-white" href="#about">About Us</a></li>
              <li className="nav-item"><a className="nav-link text-white" href="#"><i className="bi bi-cart"></i> Cart</a></li>
              <li className="nav-item">
              
              {user ? (
  <>
    <span className="nav-link text-white">Welcome, {user.fullName}</span>
    <button
      onClick={handleLogout}
      className="btn btn-sm btn-outline-light ms-2"
    >
      Logout
    </button>
  </>
) : (
  <Link to="/signin" className="nav-link text-white">
    <i className="bi"></i> Register/SignIn
  </Link>
)}


</li>

              </ul>
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

      </Routes>
    </>
  );
}

export default App;
