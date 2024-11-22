import React, { useRef, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import axios from "axios";
import InfoBox from "./InfoBox";
import CustomMarker from "./Marker";
import MapButtons from "./MapButtons";
import FilterButtons from "./FilterButtons";

const INITIAL_POSITION = { lng: 25.3824874, lat: 64.4191221 };
const INITIAL_ZOOM = 3;

if (!import.meta.env.VITE_REACT_APP_MAPTILER_API_KEY) {
  throw new Error("MapTiler API key is missing. Please set REACT_APP_MAPTILER_API_KEY.");
}
maptilersdk.config.apiKey = import.meta.env.VITE_REACT_APP_MAPTILER_API_KEY;

function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [stations, setStations] = useState([]);
  const [activeStation, setActiveStation] = useState(null);
  const [markers, setMarkers] = useState([]);

  // Helpers

  // Initialize the map
  const initializeMap = (mapContainerElement) => {
    try {
      const mapInstance = new maptilersdk.Map({
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
        geolocateControl: false, // Added manually
        navigationControl: false, // Added manually
        attributionControl: false, // Added manually
      });

      /*
      mapInstance.addControl(new maptilersdk.MaptilerGeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }));
      */
      return mapInstance;
    } catch (error) {
      console.error("Failed to initialize the map:", error);
    }
  };

  const fetchStations = async (bounds) => {
    try {
      const { north, south, east, west } = bounds;
      const response = await axios.get("/api/chargers", {
        params: {
          maxResults: 100,
          north,
          south,
          east,
          west,
        },
      });
      console.log(response.data);
      setStations(response.data);
    } catch (error) {
      console.error("Failed to fetch stations:", error);
    }
  }

  // Function to add markers to the map
  const addMarkers = (mapInstance) => {
    return stations.map((station) => {
      const markerElement = document.createElement("div");
      const root = createRoot(markerElement);

      root.render(
        <CustomMarker
          //key={station.id} // Needs to be replaced with a station id
          connector={station.connections.connectionType}
          size="32px"
        />
      );

      const marker = new maptilersdk.Marker({ element: markerElement })
        .setLngLat([
          station.location.longitude,
          station.location.latitude,
        ])
        .addTo(mapInstance);

      marker
        .getElement()
        .addEventListener("click", (e) => handleMarkerClick(e, station));

      return marker;
    });
  };

  // Event handlers

  const handleMarkerClick = (e, station) => {
    e.stopPropagation();
    setActiveStation(station);
  };

  // Close the info box when the map is clicked
  const handleMapClick = () => setActiveStation(null);

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

  /*
  const geoLocate = () => {
    console.log("Locating...");
    if (!map.current) return; // Prevent execution if the map is not initialized
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        map.current.flyTo({
          center: [position.coords.longitude, position.coords.latitude],
          zoom: 16,
        });
        if (!map.current._controls.includes("maptiler-geolocate-control")) {
          console.error(map.current._controls);
        }
      }, (error) => {
        console.error("Failed to get the current position:", error);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  */

  // Effect hooks

  useEffect(() => {
    if (map.current) return; // Prevent reinitialization if the map is already initialized

    const mapInstance = initializeMap(mapContainer.current);
    if (!mapInstance) return; // Prevent further execution if the map failed to initialize

    map.current = mapInstance;

    fetchStations({
      north: map.current.getBounds().getNorth(),
      south: map.current.getBounds().getSouth(),
      east: map.current.getBounds().getEast(),
      west: map.current.getBounds().getWest(),
    });

    // Add markers to the map
    const newMarkers = addMarkers(map.current);
    setMarkers(newMarkers);

    map.current.on("click", handleMapClick);

    // Cleanup on unmount
    return () => {
      newMarkers.forEach((marker) => {
        marker.getElement().removeEventListener("click", handleMarkerClick);
        marker.remove();
      });
      setMarkers([]);
      map.current.off("click", handleMapClick);
      map.current.remove();
      map.current = null;
    };
  }, [stations]);

  return (
    <div className="relative w-full h-screen">
      <div ref={mapContainer} className="absolute w-full h-full" />
      <MapButtons onZoomIn={zoomIn} onZoomOut={zoomOut} />
      <FilterButtons />
      {activeStation && <InfoBox station={activeStation} />}
    </div>
  );
}

export default Map;
