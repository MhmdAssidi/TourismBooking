import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Why Is index.js Important?
// It starts your app

// It connects React to the HTML page

// Without it, React wouldn’t know where to show your website
