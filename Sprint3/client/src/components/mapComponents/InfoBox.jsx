import React from 'react';

function InfoBox({ station }) {
    const connectors = station?.connections?.map(conn => conn.connectionType).join(', ') || 'N/A';
    const availability = station?.statusType?.isOperational ? 'Operational' : 'Not Operational';
    
    return (
        <div className="absolute top-0 left-0 m-4 p-4 bg-blue-900 text-white rounded-lg shadow-lg max-w-xs">
            <h3 className="text-xl font-bold">{station?.location?.title}</h3>
            <p><strong>Location:</strong> {station?.addressLine1 || 'Unknown'}</p>
            <p><strong>Connectors:</strong> {connectors}</p>
            <p><strong>Availability:</strong> {availability}</p>
            <p><strong>Provider:</strong> {station?.location?.title || 'Unknown'}</p>
        </div>
    );
}

export default InfoBox;
