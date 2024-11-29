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
import InfoBox from "./InfoBox";
import CustomMarker from "./Marker";
import MapButtons from "./MapButtons";
import FilterButtons from "./FilterButtons";

const INITIAL_POSITION = { lng: 25.3824874, lat: 64.4191221 };
const INITIAL_ZOOM = 3;
const MAPTILER_API_KEY = "n0VzL3XOSQc7wKmZ93RG";

maptilersdk.config.apiKey = MAPTILER_API_KEY;

function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [activeStation, setActiveStation] = useState(null);
  const [markers, setMarkers] = useState([]);

  const handleMarkerClick = (e, station) => {
    e.stopPropagation();
    setActiveStation(station);
  };

  // Function to add markers to the map
  const addMarkers = (mapInstance) => {
    return stations.map((station) => {
      const markerElement = document.createElement("div");
      const root = createRoot(markerElement);

      root.render(
        <CustomMarker
          key={`${station.coordinates.latitude}-${station.coordinates.longitude}-${station.connectors[0]?.type}`}
          connector={station.connectors[0]}
          size="32px"
        />
      );

      const marker = new maptilersdk.Marker({ element: markerElement })
        .setLngLat([
          station.coordinates.longitude,
          station.coordinates.latitude,
        ])
        .addTo(mapInstance);

      marker
        .getElement()
        .addEventListener("click", (e) => handleMarkerClick(e, station));

      return marker;
    });
  };

  // Initialize the map
  const initializeMap = (mapContainerElement) => {
    return new maptilersdk.Map({
      container: mapContainerElement,
      style: `https://api.maptiler.com/maps/e44b03e8-e159-489f-9e95-78adfed9c239/style.json?key=${maptilersdk.config.apiKey}`,
      center: [INITIAL_POSITION.lng, INITIAL_POSITION.lat],
      zoom: INITIAL_ZOOM,
      minZoom: INITIAL_ZOOM,
      maxBounds: [
        [18.7, 59.4],
        [33.6, 71.1],
      ],
      pitch: 0,
      bearing: 0,
      geolocateControl: false, // Hide find my location option
      navigationControl: false, // Hide center option
      attributionControl: false, // Hide zoom options
    });
  };

  useEffect(() => {
    if (map.current) return; // Prevent reinitialization if the map is already initialized

    map.current = initializeMap(mapContainer.current);

    // Add markers to the map
    const newMarkers = addMarkers(map.current);
    setMarkers(newMarkers);

    // Close the info box when the map is clicked
    const handleMapClick = () => setActiveStation(null);
    map.current.on("click", handleMapClick);

    // Cleanup on unmount
    return () => {
      newMarkers.forEach((marker) => {
        marker.getElement().removeEventListener("click", handleMarkerClick);
        marker.remove();
      });
      map.current.off("click", handleMapClick);
      map.current.remove();
      map.current = null;
    };
  }, []);

  const zoomIn = () => {
    if (map.current) {
      map.current.zoomIn();
    }
  };

  const zoomOut = () => {
    if (map.current) {
      map.current.zoomOut();
    }
  };

  const resetView = () => {
    if (map.current) {
      map.current.setCenter([INITIAL_POSITION.lng, INITIAL_POSITION.lat]);
      map.current.setZoom(INITIAL_ZOOM);
    }
  };

  return (
    <div className="relative w-full h-screen">
      <div ref={mapContainer} className="absolute w-full h-full" />
      <MapButtons onZoomIn={zoomIn} onZoomOut={zoomOut} onReset={resetView} />
      <FilterButtons />
      {activeStation && <InfoBox station={activeStation} />}
    </div>
  );
}

export default Map;
