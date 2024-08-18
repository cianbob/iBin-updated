import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MapPlaceholder from './MapPlaceholder';
import HistoryLog from './HistoryLog';
import DataVisualization from './DataVisualization';
import UpcomingEvents from './UpcomingEvents'; // Import the new component

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <img src="/enactus-logo.png" alt="Enactus Logo" className="header-logo left-logo" />
          <div className="header-title-container">
            <h1 className="app-title">iBin</h1>
            <p className="app-slogan">- Minimising Waste, Maximising Efficiency</p>
          </div>
          <img src="/bentley-logo.png" alt="Bentley Logo" className="header-logo right-logo" />
        </header>
        <div className="content-separator"></div>
        <nav className="app-nav">
          <div className="nav-box">
            <Link to="/">Home</Link>
          </div>
          <div className="nav-box">
            <Link to="/history">History Log</Link>
          </div>
          <div className="nav-box">
            <Link to="/visualization">Data Visualization</Link>
          </div>
          <div className="nav-box">
            <Link to="/events">Upcoming Events</Link>
          </div>
        </nav>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<div className="page-box"><MapPlaceholder /></div>} />
            <Route path="/history" element={<div className="page-box"><HistoryLog /></div>} />
            <Route path="/visualization" element={<div className="page-box"><DataVisualization /></div>} />
            <Route path="/events" element={<div className="page-box"><UpcomingEvents /></div>} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
