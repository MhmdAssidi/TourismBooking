import React, { useState } from 'react';

import { useCart } from '../context/cartContext'; // import context

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  
  const handleCheckout = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return alert('You must be logged in');
  
    try {
      const response = await fetch('http://localhost:5000/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userFullName: user.fullName,
          contact: user.contact,
          trips: cart.map(trip => ({
            destination: trip.destination,
            date: trip.date,
            time: trip.time
          }))
        }),
      });
  
      const result = await response.json();
  
    
      if (!response.ok) {
        console.error('Server error:', result);
        return alert(result.message || 'Checkout failed');
      }
  
      clearCart();
      setShowConfirmation(true);
  // Get AI suggestions
try {
  const suggestionRes = await fetch('http://localhost:5000/api/suggestions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      destination: cart[0]?.destination,
      date: cart[0]?.date,
      time: cart[0]?.time
    })
  });

  const suggestionData = await suggestionRes.json();
  setSuggestions(suggestionData.items || []);
} catch (err) {
  console.error('Suggestion fetch error:', err);
}
    } catch (err) {
      console.error('Checkout error:', err);
      alert('An error occurred');
    }
  };
  
  
  return (
    <div className="container mt-5 pt-5">
     {showConfirmation ? (
  <div className="text-center mt-5">
    <h1 className="text-success fw-bold">See you on board!</h1>

    {suggestions.length > 0 && (
      <div className="mt-4">
        <h5 className="fw-bold">Things to take with you:</h5>
        <ul className="list-unstyled">
          {suggestions.map((item, i) => (
            <li key={i}>✔️ {item}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
) : (
  <>
    <h2 className="mb-4 text-center">Your Picked Trips</h2>

    {cart.length === 0 ? (
      <p className="text-center text-muted">Your cart is empty.</p>
    ) : (
      <div className="row">
        {cart.map((trip, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <img
                src="/images/ChatGPT Image Apr 28, 2025, 02_21_25 AM.png"
                alt={trip.destination}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{trip.destination}</h5>
                <p className="card-text">{trip.description}</p>
                <p><strong>Date:</strong> {trip.date}</p>
                <p><strong>Time:</strong> {trip.time}</p>
                <button
                  className="btn btn-danger w-100"
                  onClick={() => removeFromCart(trip._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}

    {cart.length > 0 && (
      <div className="text-center mt-4">
        <button className="btn btn-success px-5 py-2 rounded-pill" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    )}
  </>
)}
    </div>
  );
}

export default Cart;
