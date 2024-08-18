

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './DataVisualization.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const binCollectionData = [
  { date: '2024-08-10', location: 'Merville Residences', binsCollected: 7, timeTaken: '15 minutes', collectedBy: 'John Doe', binType: 'Recycling', notes: 'All bins were over 60% full. Collection was smooth, no issues encountered.' },
  { date: '2024-08-10', location: 'UCD Veterinary Hospital', binsCollected: 3, timeTaken: '8 minutes', collectedBy: 'Jane Smith', binType: 'General Waste', notes: 'Bins were around 60% full. One bin bag was slightly ripped but replaced promptly.' },
  { date: '2024-08-09', location: 'UCD Sports Centre', binsCollected: 11, timeTaken: '28 minutes', collectedBy: 'Chris Johnson', binType: 'Compost', notes: 'Bins were slightly above 50% full. Collection completed efficiently.' },
  { date: '2024-08-08', location: 'Engineering Building', binsCollected: 4, timeTaken: '10 minutes', collectedBy: 'Emily Davis', binType: 'Recycling', notes: 'Bins were nearly overflowing. Additional collections may be needed during peak times.' },
  { date: '2024-08-07', location: 'Science Building', binsCollected: 6, timeTaken: '14 minutes', collectedBy: 'Michael Brown', binType: 'General Waste', notes: 'Collected without any issues. Bins were at about 55% capacity.' },
  { date: '2024-08-06', location: 'Library', binsCollected: 5, timeTaken: '13 minutes', collectedBy: 'Jane Smith', binType: 'Compost', notes: 'Bins were about 60% full. Collection was smooth.' },
  { date: '2024-08-06', location: 'Computer Science Building', binsCollected: 17, timeTaken: '42 minutes', collectedBy: 'John Doe', binType: 'General', notes: 'Bins were all very full due to the event.' },
  { date: '2024-08-05', location: 'Business School', binsCollected: 4, timeTaken: '11 minutes', collectedBy: 'Emily Davis', binType: 'General Waste', notes: 'Collected without any issues. Bins were slightly over 50% full.' },
  { date: '2024-08-04', location: 'Law School', binsCollected: 2, timeTaken: '7 minutes', collectedBy: 'Michael Brown', binType: 'Compost', notes: 'Bins were just above 50% full. Collection was completed as scheduled.' },
  { date: '2024-08-03', location: 'Student Union', binsCollected: 6, timeTaken: '15 minutes', collectedBy: 'Chris Johnson', binType: 'Recycling', notes: 'Bins were around 65% full. Collection was smooth.' },
  { date: '2024-08-02', location: 'Merville Residences', binsCollected: 5, timeTaken: '12 minutes', collectedBy: 'John Doe', binType: 'General Waste', notes: 'Bins were at 50% capacity. No issues during collection.' },
  { date: '2024-08-01', location: 'UCD Veterinary Hospital', binsCollected: 7, timeTaken: '23 minutes', collectedBy: 'Jane Smith', binType: 'Recycling', notes: 'Bins were collected quickly. No issues.' },
  { date: '2024-07-31', location: 'UCD Sports Centre', binsCollected: 7, timeTaken: '16 minutes', collectedBy: 'Chris Johnson', binType: 'General Waste', notes: 'Bins were about 55% full. Collection completed efficiently.' },
  { date: '2024-07-30', location: 'Engineering Building', binsCollected: 8, timeTaken: '21 minutes', collectedBy: 'Emily Davis', binType: 'Compost', notes: 'All bins were collected without issues. Bins were about 60% full.' },
  { date: '2024-07-29', location: 'Science Building', binsCollected: 15, timeTaken: '23 minutes', collectedBy: 'Michael Brown', binType: 'Recycling', notes: 'Bins were collected without issues. All bins were near 80% capacity.' },
];

const groupByWeekAndLocation = (data) => {
  const groupedData = {};

  data.forEach((entry) => {
    const weekNumber = getWeekNumber(new Date(entry.date));
    const key = `Week ${weekNumber} - ${entry.location}`;
    if (!groupedData[key]) {
      groupedData[key] = 0;
    }
    groupedData[key] += entry.binsCollected;
  });

  return groupedData;
};

const getWeekNumber = (date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

const weeklyLocationData = groupByWeekAndLocation(binCollectionData);

const data = {
  labels: Object.keys(weeklyLocationData),
  datasets: [
    {
      label: 'Bins Collected',
      data: Object.values(weeklyLocationData),
      backgroundColor: '#4a90e2',  // Update to your website's color
      borderColor: '#0056b3',      // Update to your website's color
      borderWidth: 1,
    },
  ],
};

function DataVisualization() {
  return (
    <div className="data-visualization">
      <h2>Weekly Bin Collection Data by Location</h2>
      <div className="chart-container">
        <Bar 
          data={data} 
          options={{ 
            responsive: true,
            maintainAspectRatio: false,  // Allows the chart to resize
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    return `Bins Collected: ${tooltipItem.raw}`;
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Weeks and Locations',
                },
                ticks: {
                  autoSkip: true, // Automatically skip labels to avoid crowding
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Number of Bins Collected',
                },
                beginAtZero: true,
              },
            },
          }} 
        />
      </div>
    </div>
  );
}

export default DataVisualization;
