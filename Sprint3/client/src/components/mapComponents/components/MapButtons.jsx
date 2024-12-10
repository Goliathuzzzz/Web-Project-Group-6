import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { useGeolocated } from 'react-geolocated';
import ReactDOM from 'react-dom';
import zoomOut from "../../../assets/images/map_out.png";
import zoomIn from "../../../assets/images/map_in.png";
import geoLocate from "../../../assets/images/map_geolocate.png";
import geoLocateOn from "../../../assets/images/map_geolocate_on.png";

const MapButtons = ({ setCurrentPosition, setAccuracy, isGeolocated, setIsGeolocated }) => {
    const map = useMap();
    const { coords, getPosition } = useGeolocated({
        positionOptions: { enableHighAccuracy: true },
        userDecisionTimeout: 5000,
        isOptimisticGeolocationEnabled: true,
    });

    const [geoLocateIcon, setGeoLocateIcon] = useState(geoLocate);

    useEffect(() => {
        if (isGeolocated && coords) {
            const newPosition = [coords.latitude, coords.longitude];
            setCurrentPosition(newPosition);
            setAccuracy(coords.accuracy);
            map.setView(newPosition, 15);
        }
    }, [isGeolocated, coords, map, setCurrentPosition, setAccuracy]);

    const handleGeolocate = () => {
        if (!navigator.geolocation) {
            setErrorMessage("Geolocation is not supported by your browser.");
            console.log("Geolocation is not supported.");
            return;
        }

        if (isGeolocated) {
            setIsGeolocated(false);
            setGeoLocateIcon(geoLocate);
            setCurrentPosition(null);
            setAccuracy(null);
            console.log("Geolocation tracking disabled");
        } else {
            try {
                getPosition();
            } catch (error) {
                setErrorMessage("Failed to retrieve location.");
                console.log("Geolocation error: ", error);
                return;
            }
            setIsGeolocated(true);
            setGeoLocateIcon(geoLocateOn);
            console.log("Geolocation tracking enabled");
        }
    };

    const buttons = (
        <div className="absolute bottom-20 right-6 z-20 rounded flex flex-col gap-1">
            <button onClick={handleGeolocate} className="pb-2 transform transition-transform duration-200 hover:scale-110 hover:brightness-150">
                <img src={geoLocateIcon} alt="Geolocate" className="w-10 h-10" />
            </button>
            <button onClick={() => map.zoomIn()} className="pb-2 transform transition-transform duration-200 hover:scale-110 hover:brightness-150">
                <img src={zoomIn} alt="Zoom In" className="w-10 h-10" />
            </button>
            <button onClick={() => map.zoomOut()} className="pb-2 transform transition-transform duration-200 hover:scale-110 hover:brightness-150">
                <img src={zoomOut} alt="Zoom Out" className="w-10 h-10" />
            </button>
        </div>
    );

    return ReactDOM.createPortal(buttons, document.body);
}

export default MapButtons;
