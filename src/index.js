import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Optional: Your global styles
import App from './App';  // Import the main App component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')  // The root element in your HTML file
);