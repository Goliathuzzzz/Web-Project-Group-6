import React from 'react';
import { useMap } from 'react-leaflet';
import zoomOut from "../../assets/images/map_out.png";
import zoomIn from "../../assets/images/map_in.png";
import geoLocate from "../../assets/images/map_center.png";
import { useGeolocation } from './mapHooks/useGeolocation';

function MapButtons({ setCurrentPosition }) {
    const map = useMap();
    const { currentPosition, fetchGeolocation } = useGeolocation();

    const handleZoomIn = () => {
        if (map) {
            map.zoomIn();
        }
    };

    const handleZoomOut = () => {
        if (map) {
            map.zoomOut();
        }
    };

    const handleGeolocate = () => {
        fetchGeolocation();
        if (currentPosition) {
            setCurrentPosition(currentPosition);
            if (map) {
                map.setView(currentPosition, 15);
            }
        } else {
            console.error("Geolocation failed.");
        }
    };

    return (
        <div className="absolute bottom-20 right-6 z-20 rounded flex flex-col gap-1">
            <button onClick={handleGeolocate}className="pb-2 transform transition-transform duration-200 hover:scale-110 hover:brightness-150">
                <img src={geoLocate} alt="Geolocate" className="w-10 h-10" />
            </button>
            <button onClick={handleZoomIn} className="pb-2 transform transition-transform duration-200 hover:scale-110 hover:brightness-150">
                <img src={zoomIn} alt="Zoom In" className="w-10 h-10" />
            </button>
            <button onClick={handleZoomOut} className="pb-2 transform transition-transform duration-200 hover:scale-110 hover:brightness-150">
                <img src={zoomOut} alt="Zoom Out" className="w-10 h-10" />
            </button>
        </div>
    );
}

export default MapButtons;