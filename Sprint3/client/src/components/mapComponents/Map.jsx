import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import { useStations } from "./mapHooks/useStations";
import { useDebounce } from "./mapHooks/useDebounce";
import MapEventHandler from "./mapHooks/MapEventHandler";
import FetchStations from "./components/FetchStations";
import CustomMarker from "./CustomMarker";
import InfoBox from "./InfoBox";
const { VITE_REACT_MAPBOX_STYLE_ID, VITE_REACT_MAPBOX_USERNAME, VITE_REACT_MAPBOX_TOKEN } = import.meta.env;

const INITIAL_BOUNDS = [
  [59.4, 18.7],
  [71.1, 33.6],
]
const INITIAL_POSITION = [64.4191221, 25.3824874];
const INITIAL_ZOOM = 5;

if (!VITE_REACT_MAPBOX_TOKEN || !VITE_REACT_MAPBOX_STYLE_ID || !VITE_REACT_MAPBOX_USERNAME) {
  throw new Error("Mapbox environment variables are missing. Please check your .env file.");
}

const Map = () => {
  const initialBounds = {
    north: 71.1,
    south: 59.4,
    east: 33.6,
    west: 18.7,
    maxResults: 100,
  };

  const { stations, fetchStations, error: stationsError } = useStations(initialBounds);
  const handleMapMove = useDebounce(fetchStations);
  const [selectedStation, setSelectedStation] = useState(null);
  const [tileError, setTileError] = useState(false);

  const handleClose = () => {
    setSelectedStation(null);
  };

  const handleTileError = () => {
    setTileError(true);
  };

  if (tileError) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-red-600">Map Failed to Load</h1>
          <p className="mt-2 text-gray-600">Please check your internet connection or try again later.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen">
      <MapContainer
        center={INITIAL_POSITION}
        zoom={INITIAL_ZOOM}
        minZoom={INITIAL_ZOOM}
        maxBounds={INITIAL_BOUNDS}
        maxBoundsViscosity={1.0}
        scrollWheelZoom={true}
        className="absolute w-full h-full z-0"
      >
        <TileLayer
          attribution='Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          url={`https://api.mapbox.com/styles/v1/${VITE_REACT_MAPBOX_USERNAME}/${VITE_REACT_MAPBOX_STYLE_ID}/tiles/256/{z}/{x}/{y}@2x?access_token=${VITE_REACT_MAPBOX_TOKEN}`}
          eventHandlers={{
            tileerror: handleTileError,
          }}
        />
        <FetchStations handleMapMove={handleMapMove} />
        {stations.map((station) => (
          <CustomMarker
            key={station.id}
            station={station}
            isSelected={selectedStation?.id === station.id}
            onClick={() => setSelectedStation(station)}
          />
        ))}
        <MapEventHandler onMapClick={handleClose} />
      </MapContainer>
      {stationsError && (
        <div className="absolute top-0 left-0 right-0 bg-red-600 text-white p-2 text-center z-50">
          Error loading stations. Please try again later.
        </div>
      )}
      {selectedStation && (
        <div className="absolute top-4 left-4 z-50">
          <InfoBox station={selectedStation} />
        </div>
      )}
    </div>
  );
};

export default Map;
