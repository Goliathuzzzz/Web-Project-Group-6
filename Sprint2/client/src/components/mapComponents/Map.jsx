import React, { useRef, useState, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import stations from '../../../../server/mock-data/ev_stations_mock_data.json';
import InfoBox from './InfoBox';
import CustomMarker from './Marker';
import ReactDOM from 'react-dom';

function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [activeStation, setActiveStation] = useState(null);
    const [markers, setMarkers] = useState([]); // State for storing markers

    const position = { lng: 25.3824874, lat: 64.4191221 }; // Initial map position
    const zoom = 3;

    maptilersdk.config.apiKey = 'n0VzL3XOSQc7wKmZ93RG';

    useEffect(() => {
        if (map.current) return; // Prevent re-initializing the map

        // Initialize the map
        map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/e44b03e8-e159-489f-9e95-78adfed9c239/style.json?key=${maptilersdk.config.apiKey}`,
            center: [position.lng, position.lat],
            zoom: zoom,
            minZoom: zoom,
            maxBounds: [
                [18.7, 57.4],
                [33.6, 71.1],
            ],
        });

        const newMarkers = stations.map(station => {
            const markerElement = document.createElement('div');
            ReactDOM.render(
                <CustomMarker
                    connector={station.connectors[0]}
                    size="32px"
                    onClick={() => setActiveStation(station)}
                />,
                markerElement
            )

            const marker = new maptilersdk.Marker({ element: markerElement })
                .setLngLat([station.coordinates.longitude, station.coordinates.latitude])
                .addTo(map.current)
            return marker;
        }).filter(marker => marker !== null);
        
        setMarkers(newMarkers);

        map.current.on('click', () => {
            setActiveStation(null);
        });

        // Clean up on unmount
        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, [activeStation]);  // Empty dependency array ensures the effect runs only once

    return (
        <div className="relative w-full h-screen">
            <div ref={mapContainer} className="absolute w-full h-full" />
            {activeStation && <InfoBox station={activeStation} />}
        </div>
    );
}

export default Map;
