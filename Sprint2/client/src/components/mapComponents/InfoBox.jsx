import React from 'react';

function InfoBox({ station }) {
    return (
        <div className="absolute top-0 left-0 m-4 p-4 bg-blue-900 text-white rounded-lg shadow-lg max-w-xs">
            <h3 className="text-xl font-bold">{station.name}</h3>
            <p><strong>Location:</strong> {station.location}</p>
            <p><strong>Connectors:</strong> {station.connectors.join(', ')}</p>
            <p><strong>Availability:</strong> {station.availability}</p>
            <p><strong>Provider:</strong> {station.provider}</p>
        </div>
    );
}

export default InfoBox;
