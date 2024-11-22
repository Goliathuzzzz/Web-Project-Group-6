import React from 'react';
import zoomOut from "../../assets/images/map_out.png";
import zoomIn from "../../assets/images/map_in.png";
import center from "../../assets/images/map_center.png";

function MapButtons({ onZoomIn, onZoomOut }) {
    return (
        <div className="absolute bottom-20 right-6 z-10 rounded flex flex-col gap-1">
            <button className="pb-2 transform transition-transform duration-200 hover:scale-110 hover:brightness-150">
                <img src={center} alt="Geolocate" className="w-10 h-10" />
            </button>
            <button onClick={onZoomIn} className="pb-2 transform transition-transform duration-200 hover:scale-110 hover:brightness-150">
                <img src={zoomIn} alt="Zoom In" className="w-10 h-10" />
            </button>
            <button onClick={onZoomOut} className="pb-2 transform transition-transform duration-200 hover:scale-110 hover:brightness-150">
                <img src={zoomOut} alt="Zoom Out" className="w-10 h-10" />
            </button>
        </div>
    );
}

export default MapButtons;