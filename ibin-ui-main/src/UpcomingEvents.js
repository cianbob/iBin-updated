// src/UpcomingEvents.js
import React from 'react';
import './UpcomingEvents.css'; // Create this file for styling

const eventsData = [
    { date: '2024-08-20', location: 'UCD Sports Centre', event: 'High Visitor Traffic Expected', notes: 'Additional collection may be needed due to anticipated high usage.' },
    { date: '2024-08-22', location: 'Library', event: 'Semester Start', notes: 'Expect increased waste due to student arrivals. Early collections recommended.' },
    { date: '2024-09-01', location: 'Science Building', event: 'Research Conference', notes: 'Conference will likely increase waste. Prepare for possible overflow.' },
    { date: '2024-09-15', location: 'Business School', event: 'Orientation Week', notes: 'Higher waste volumes expected. Ensure additional staff are available.' },
    { date: '2024-09-20', location: 'Student Union', event: 'Club Fair', notes: 'Increased foot traffic. Monitor bin levels closely and adjust collection schedule as needed.' },
];

function UpcomingEvents() {
    return (
        <div className="upcoming-events">
            <h2>Upcoming Events and Predictions</h2>
            <table className="events-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Event</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {eventsData.map((event, index) => (
                        <tr key={index}>
                            <td>{event.date}</td>
                            <td>{event.location}</td>
                            <td>{event.event}</td>
                            <td>{event.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UpcomingEvents;
