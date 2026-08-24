import React from 'react';
import { createRoot } from 'react-dom/client';
import Portfolio from '../portfolio-artifact.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Portfolio />
  </React.StrictMode>
);
