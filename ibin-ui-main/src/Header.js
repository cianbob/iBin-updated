import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ location }) {
  return (
    <div className="header-bar">
      <h1>iBin</h1>
      <div className="location-info">
        <p>Current Location: {location}</p>
      </div>
      <nav className="header-nav">
        <ul>
          <li><Link to="/">Map</Link></li>
          <li><Link to="/history">History Log</Link></li>
          <li><Link to="/visualization">Data Visualization</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
