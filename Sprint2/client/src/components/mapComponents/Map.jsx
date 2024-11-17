import React, { useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import stations from '../../../../server/mock-data/ev_stations_mock_data.json';
import './map.css';

export default function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);

    const position = { lng: 25.3824874, lat: 64.4191221 }; // initial map position
    const zoom = 5;

    maptilersdk.config.apiKey = 'n0VzL3XOSQc7wKmZ93RG';

    useEffect(() => {
        if (map.current) return; // Prevent re-initializing the map
        
        /*
        const bounds = [
            [59.4, 20.7], // Southwest corner (Finland)
            [70.1, 31.6], // Northeast corner (Finland)
        ];
        */

        // Initialize the map
        map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: "https://api.maptiler.com/maps/e44b03e8-e159-489f-9e95-78adfed9c239/style.json?key=n0VzL3XOSQc7wKmZ93RG",
            center: [position.lng, position.lat],
            zoom: zoom,
            minZoom: 4,
            //maxBounds: bounds,
        });

        // Check if stations data exists and add markers
        if (stations && stations.length > 0) {
            stations.forEach((station) => {
                const { latitude, longitude } = station.coordinates;

                // Check if the coordinates are valid before adding markers
                if (latitude && longitude) {
                    const marker = new maptilersdk.Marker()
                        .setLngLat([longitude, latitude])
                        .addTo(map.current);

                    // Popup content with station information
                    const popupContent = `
                        <strong>${station.name}</strong><br />
                        Location: ${station.location}<br />
                        Connectors: ${station.connectors.join(', ')}<br />
                        Availability: ${station.availability}<br />
                        Provider: ${station.provider}
                    `;

                    // Set popup on the marker
                    marker.setPopup(new maptilersdk.Popup().setHTML(popupContent));
                } else {
                    console.error("Invalid coordinates for station: ", station);
                }
            });
        } else {
            console.error("No station data available");
        }

        // Clean up on unmount
        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, []);  // Empty dependency array ensures the effect runs only once

    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map" />
        </div>
    );
}
