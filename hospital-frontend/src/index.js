import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import

import './index.css';
import App from './App';

// Create a root using React 18's new method
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
