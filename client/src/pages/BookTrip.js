import { useCart } from '../context/cartContext';
import React, { useEffect, useState } from 'react';
import './BookTrip.css'; 
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';  

function BookTrip({ user }) {   // <--- receive user here
  const { addToCart } = useCart();
  const navigate = useNavigate();  // <--- for redirection

  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
  }, [user, navigate]);

  const [trips, setTrips] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterTime, setFilterTime] = useState('');

  const coverImage = '/images/ChatGPT Image Apr 28, 2025, 02_21_25 AM.png'; 

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/trips');
        const data = await response.json();
        setTrips(data);
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    fetchTrips();
  }, []);

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch = trip.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = filterDate ? trip.date === filterDate : true;
    const matchesTime = filterTime ? trip.time === filterTime : true;
    return matchesSearch && matchesDate && matchesTime;
  });

  return (
    <div className="container mt-5 pt-5">
      <h2 className="mb-4 text-center">Book a Trip</h2>

      {/* Search and Filters */}
      <div className="filter-bar p-4 rounded-4 shadow-sm mb-5 d-flex flex-wrap justify-content-center gap-3">
  <input
    type="text"
    placeholder="Search by destination or keyword"
    className="form-control rounded-pill"
    style={{ maxWidth: '250px' }}
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />

  <input
    type="date"
    className="form-control rounded-pill"
    style={{ maxWidth: '180px' }}
    value={filterDate}
    onChange={(e) => setFilterDate(e.target.value)}
  />

  <input
    type="time"
    className="form-control rounded-pill"
    style={{ maxWidth: '180px' }}
    value={filterTime}
    onChange={(e) => setFilterTime(e.target.value)}
  />
</div>


      {/* Trip Cards */}
      <div className="row">
        {filteredTrips.length > 0 ? (
          filteredTrips.map(trip => (
            <div key={trip._id} className="col-md-4 mb-4 d-flex align-items-stretch">
              <div className="trip-card shadow-sm rounded-4 w-100">
                {/* Trip Image */}
                <img 
                  src={coverImage} 
                  alt={trip.destination}
                  className="trip-card-img trip-image rounded-top-4"
                />

                {/* Trip Details */}
                <div className="trip-details p-4 d-flex flex-column">
                  <h5 className="fw-bold mb-2">{trip.destination}</h5>
                  <p className="text-muted mb-3">{trip.description}</p>

                  <div className="mb-2 d-flex align-items-center">
                    <i className="bi bi-calendar-event me-2"></i>
                    <span>Date: {trip.date}</span>
                  </div>
                  <div className="mb-4 d-flex align-items-center">
                    <i className="bi bi-clock me-2"></i>
                    <span>Time: {trip.time}</span>
                  </div>

                  <button 
  className="btn btn-primary w-100 mt-auto rounded-pill"
  onClick={() => addToCart(trip)}
>
  Add to Cart
</button>

                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No trips match your filters.</p>
        )}
      </div>
<Footer />

    </div>


  );
}

export default BookTrip;
