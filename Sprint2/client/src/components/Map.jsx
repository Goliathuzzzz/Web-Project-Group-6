import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import stations from '../../../server/mock-data/ev_stations_mock_data.json';

const position = [65.1937341, 25.7601923];

const Map = () => {
    return (
        <MapContainer center={position} zoom={5} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {stations.map((station) => (
                <Marker key={station.id} position={[station.coordinates.latitude, station.coordinates.longitude]}>
                    <Popup>
                        <b>{station.name}</b><br />
                        <span>{station.location}</span><br />
                        <span>Provider: {station.provider}</span><br />
                        <span>Availability: {station.availability}</span><br />
                        <span>Connectors: {station.connectors.join(', ')}</span><br />
                        <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${station.coordinates.latitude},${station.coordinates.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            Get Directions
                        </a>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
