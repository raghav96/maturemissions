/**
 * File: index.js
 * Description: Renders the App component into the root element of the DOM.
 * Imports necessary libraries and stylesheets for Bootstrap and custom styles.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.min"; 
import './index.css'; 
import App from './App'; 

// Create a React root and render the App component into the root element of the DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
