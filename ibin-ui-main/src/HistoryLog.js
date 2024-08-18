import React, { useState } from 'react';
import './HistoryLog.css';

const historyData = [
  {
      date: '2024-08-10',
      location: 'Merville Residences',
      binsCollected: 7,
      timeTaken: '15 minutes',
      collectedBy: 'John Doe',
      binType: 'Recycling',
      notes: 'All bins were over 60% full. Collection was smooth, no issues encountered.',
  },
  {
      date: '2024-08-10',
      location: 'UCD Veterinary Hospital',
      binsCollected: 3,
      timeTaken: '8 minutes',
      collectedBy: 'Jane Smith',
      binType: 'General Waste',
      notes: 'Bins were around 60% full. One bin bag was slightly ripped but replaced promptly.',
  },
  {
      date: '2024-08-09',
      location: 'UCD Sports Centre',
      binsCollected: 11,
      timeTaken: '28 minutes',
      collectedBy: 'Chris Johnson',
      binType: 'Compost',
      notes: 'Bins were slightly above 50% full. Collection completed efficiently.',
  },
  {
      date: '2024-08-08',
      location: 'Engineering Building',
      binsCollected: 4,
      timeTaken: '10 minutes',
      collectedBy: 'Emily Davis',
      binType: 'Recycling',
      notes: 'Bins were nearly overflowing. Additional collections may be needed during peak times.',
  },
  {
      date: '2024-08-07',
      location: 'Science Building',
      binsCollected: 6,
      timeTaken: '14 minutes',
      collectedBy: 'Michael Brown',
      binType: 'General Waste',
      notes: 'Collected without any issues. Bins were at about 55% capacity.',
  },
  {
      date: '2024-08-06',
      location: 'Library',
      binsCollected: 5,
      timeTaken: '13 minutes',
      collectedBy: 'Jane Smith',
      binType: 'Compost',
      notes: 'Bins were about 60% full. Collection was smooth.',
  },
  {
      date: '2024-08-06',
      location: 'Computer Science Building',
      binsCollected: 17,
      timeTaken: '42 minutes',
      collectedBy: 'John Doe',
      binType: 'General',
      notes: 'Bins were all very full due to the event.',
  },
  {
      date: '2024-08-05',
      location: 'Business School',
      binsCollected: 4,
      timeTaken: '11 minutes',
      collectedBy: 'Emily Davis',
      binType: 'General Waste',
      notes: 'Collected without any issues. Bins were slightly over 50% full.',
  },
  {
      date: '2024-08-04',
      location: 'Law School',
      binsCollected: 2,
      timeTaken: '7 minutes',
      collectedBy: 'Michael Brown',
      binType: 'Compost',
      notes: 'Bins were just above 50% full. Collection was completed as scheduled.',
  },
  {
      date: '2024-08-03',
      location: 'Student Union',
      binsCollected: 6,
      timeTaken: '15 minutes',
      collectedBy: 'Chris Johnson',
      binType: 'Recycling',
      notes: 'Bins were around 65% full. Collection was smooth.',
  },
  {
      date: '2024-08-02',
      location: 'Merville Residences',
      binsCollected: 5,
      timeTaken: '12 minutes',
      collectedBy: 'John Doe',
      binType: 'General Waste',
      notes: 'Bins were at 50% capacity. No issues during collection.',
  },
  {
      date: '2024-08-01',
      location: 'UCD Veterinary Hospital',
      binsCollected: 7,
      timeTaken: '23 minutes',
      collectedBy: 'Jane Smith',
      binType: 'Recycling',
      notes: 'Bins were collected quickly. No issues.',
  },
  {
      date: '2024-07-31',
      location: 'UCD Sports Centre',
      binsCollected: 7,
      timeTaken: '16 minutes',
      collectedBy: 'Chris Johnson',
      binType: 'General Waste',
      notes: 'Bins were about 55% full. Collection completed efficiently.',
  },
  {
      date: '2024-07-30',
      location: 'Engineering Building',
      binsCollected: 8,
      timeTaken: '21 minutes',
      collectedBy: 'Emily Davis',
      binType: 'Compost',
      notes: 'All bins were collected without issues. Bins were about 60% full.',
  },
  {
      date: '2024-07-29',
      location: 'Science Building',
      binsCollected: 15,
      timeTaken: '23 minutes',
      collectedBy: 'Michael Brown',
      binType: 'Recycling',
      notes: 'Bins were collected without issues. All bins were near 80% capacity.',
  },
];


function HistoryLog() {
  const [filters, setFilters] = useState({
      date: '',
      person: '',
      binType: '',
      location: '', // Added location filter
  });

  const filteredData = historyData.filter((entry) => {
      const matchesDate = !filters.date || entry.date === filters.date;
      const matchesPerson = !filters.person || entry.collectedBy === filters.person;
      const matchesBinType = !filters.binType || entry.binType === filters.binType;
      const matchesLocation = !filters.location || entry.location === filters.location;
      return matchesDate && matchesPerson && matchesBinType && matchesLocation;
  });

  const handleFilterChange = (e) => {
      const { name, value } = e.target;
      setFilters({
          ...filters,
          [name]: value,
      });
  };

  return (
      <div className="history-log">
          <h2>History Log</h2>
          
          <div className="filters">
              <label>
                  Date:
                  <input
                      type="date"
                      name="date"
                      value={filters.date}
                      onChange={handleFilterChange}
                  />
              </label>
              <label>
                  Person:
                  <select
                      name="person"
                      value={filters.person}
                      onChange={handleFilterChange}
                  >
                      <option value="">All</option>
                      <option value="John Doe">John Doe</option>
                      <option value="Jane Smith">Jane Smith</option>
                      <option value="Chris Johnson">Chris Johnson</option>
                      <option value="Emily Davis">Emily Davis</option>
                      <option value="Michael Brown">Michael Brown</option>
                  </select>
              </label>
              <label>
                  Bin Type:
                  <select
                      name="binType"
                      value={filters.binType}
                      onChange={handleFilterChange}
                  >
                      <option value="">All</option>
                      <option value="Recycling">Recycling</option>
                      <option value="General Waste">General Waste</option>
                      <option value="Compost">Compost</option>
                  </select>
              </label>
              <label>
                  Location:
                  <select
                      name="location"
                      value={filters.location}
                      onChange={handleFilterChange}
                  >
                      <option value="">All</option>
                      <option value="Merville Residences">Merville Residences</option>
                      <option value="UCD Veterinary Hospital">UCD Veterinary Hospital</option>
                      <option value="UCD Sports Centre">UCD Sports Centre</option>
                      <option value="Engineering Building">Engineering Building</option>
                      <option value="Science Building">Science Building</option>
                      <option value="Library">Library</option>
                      <option value="Computer Science Building">Computer Science Building</option>
                      <option value="Business School">Business School</option>
                      <option value="Law School">Law School</option>
                      <option value="Student Union">Student Union</option>
                  </select>
              </label>
          </div>
          
          <table className="history-table">
              <thead>
                  <tr>
                      <th>Date</th>
                      <th>Location</th>
                      <th>Bins Collected</th>
                      <th>Time Taken</th>
                      <th>Collected By</th>
                      <th>Bin Type</th>
                      <th>Comments/Notes</th>
                  </tr>
              </thead>
              <tbody>
                  {filteredData.map((entry, index) => (
                      <tr key={index}>
                          <td>{entry.date}</td>
                          <td>{entry.location}</td>
                          <td>{entry.binsCollected}</td>
                          <td>{entry.timeTaken}</td>
                          <td>{entry.collectedBy}</td>
                          <td>{entry.binType}</td>
                          <td>{entry.notes}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
  );
}

export default HistoryLog;