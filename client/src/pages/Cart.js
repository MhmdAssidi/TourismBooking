import React from 'react';
import { useCart } from '../context/cartContext'; // import context

function Cart() {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="container mt-5 pt-5">
      <h2 className="mb-4 text-center">Your Picked Trips</h2>

      {cart.length === 0 ? (
        <p className="text-center text-muted">Your cart is empty.</p>
      ) : (
        <>
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

          <div className="text-center mt-4">
            <button className="btn btn-success px-5 py-2 rounded-pill">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
