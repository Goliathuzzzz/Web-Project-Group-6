import { useState } from 'react';

export const useGeolocation = () => {
    const [currentPosition, setCurrentPosition] = useState(null);

    const fetchGeolocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition([latitude, longitude]);
                    console.log("Geolocation successful:", latitude, longitude);
                },
                (error) => {
                    console.error("Geolocation error:", error);
                },
                { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

    return { currentPosition, fetchGeolocation };
};
