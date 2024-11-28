import React from 'react';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';

import type2Marker from '../../assets/images/unselected_yellow.png';
import chademoMarker from '../../assets/images/unselected_blue.png';
import ccsMarker from '../../assets/images/unselected_red.png';

import selecType2Marker from '../../assets/images/selected_yellow.png';
import selecChademoMarker from '../../assets/images/selected_blue.png';
import selecCcsMarker from '../../assets/images/selected_red.png';

const unselecConnectorTypeMarkers = {
    "Type 2": type2Marker,
    "CHAdeMO": chademoMarker,
    "CCS": ccsMarker,
};

const selecConnectorTypeMarkers = {
    "Type 2": selecType2Marker,
    "CHAdeMO": selecChademoMarker,
    "CCS": selecCcsMarker,
};

const createMarker = ({ connector, isSelected }) => {
    const iconUrl = isSelected ? selecConnectorTypeMarkers[connector] || selecType2Marker
    : unselecConnectorTypeMarkers[connector] || type2Marker;

    return L.icon({
        iconUrl,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [1, -34],
    });
}

const CustomMarker = ({ station, isSelected, onClick }) => {
    const connectorType = station?.connections?.[0]?.connectionType || "Type 2"; 

    return (
        <Marker
            position={[station.location.latitude, station.location.longitude]}
            icon={createMarker({ connector: connectorType, isSelected })}
            eventHandlers={{
                click: () => {
                    onClick(station);
                }
            }}
        >
        </Marker>
    );
};

export default CustomMarker;
