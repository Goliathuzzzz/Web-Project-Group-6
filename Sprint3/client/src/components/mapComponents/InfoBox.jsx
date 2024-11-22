import React from 'react';

function InfoBox({ station }) {
    return (
        <div className="absolute top-0 left-0 m-4 p-4 bg-blue-900 text-white rounded-lg shadow-lg max-w-xs">
            <h3 className="text-xl font-bold">{station.location.title}</h3>
            <p><strong>Location:</strong> {station.addressLine1}</p>
            <p><strong>Connectors:</strong> {station.connections.connectionType.join(', ')}</p>
            <p><strong>Availability:</strong> {station.statusType.isOperational}</p>
            <p><strong>Provider:</strong> {station.location.title}</p>
        </div>
    );
}

export default InfoBox;
