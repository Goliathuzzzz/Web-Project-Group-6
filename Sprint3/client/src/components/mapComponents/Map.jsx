import React, { useState } from "react";
import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet/dist/leaflet.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import { useStations } from "./mapHooks/useStations";
import { useDebounce } from "./mapHooks/useDebounce";
import { useGeolocation } from "./mapHooks/useGeolocation"; // unneccecary import?
import MapEventHandler from "./mapHooks/MapEventHandler";
import FetchStations from "./components/FetchStations";
import CustomMarker from "./CustomMarker";
import InfoBox from "./components/InfoBoxV3";
import FilterButtons from "./FilterButtons";
import MapButtons from "./MapButtons";

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

const Map = ({ minimap = false }) => { // minimap is false by default
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
  const [currentPosition, setCurrentPosition] = useState(INITIAL_POSITION);

  const mapHeight = minimap ? "h-80" : "h-[calc(100vh-56px)]"; // if minimap is true, set height to 36px, else set height to 100vh-56px


  return (
    <div className={`relative w-full ${mapHeight}`}> 
      {!minimap && <FilterButtons />}
      <MapContainer
        center={INITIAL_POSITION}
        zoom={INITIAL_ZOOM}
        minZoom={INITIAL_ZOOM}
        maxBounds={INITIAL_BOUNDS}
        maxBoundsViscosity={1.0}
        zoomControl={false}
        className="absolute w-full h-full z-0"
      >
        <TileLayer
          attribution='Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          url={`https://api.mapbox.com/styles/v1/${VITE_REACT_MAPBOX_USERNAME}/${VITE_REACT_MAPBOX_STYLE_ID}/tiles/256/{z}/{x}/{y}@2x?access_token=${VITE_REACT_MAPBOX_TOKEN}`}
        />
        {!minimap && <MapButtons setCurrentPosition={setCurrentPosition} />}
        <FetchStations handleMapMove={handleMapMove} />
        <MarkerClusterGroup>
          {stations.map((station) => (
            <CustomMarker
              key={station.id}
              station={station}
              isSelected={selectedStation?.id === station.id}
              onClick={() => setSelectedStation(station)}
            />
          ))}
        </MarkerClusterGroup>
        <MapEventHandler onMapClick={() => setSelectedStation(null)} />
      </MapContainer>
      {!minimap && stationsError && (
        <div className="absolute top-0 left-0 right-0 bg-red-600 text-white p-2 text-center z-50">
          Error loading stations. Please try again later.
        </div>
      )}
      {!minimap && selectedStation && (
        <div className="absolute top-4 left-4 z-50">
          <InfoBox station={selectedStation} />
        </div>
      )}
    </div>
  );
};

export default Map;
