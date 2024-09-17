import React from 'react';
import './LoadingSpinner.css'
const LoadingSpinner = () => (
  <div className="loading-spinner">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50" height="50">
  <circle cx="25" cy="25" r="20" stroke="gray" strokeWidth="5" fill="none">
    <animate attributeName="stroke-dasharray" from="0,150" to="150,0" dur="1.5s" repeatCount="indefinite" />
  </circle>
</svg>

  </div>
);

export default LoadingSpinner;
