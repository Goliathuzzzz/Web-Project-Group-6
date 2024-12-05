import React from 'react';
import L from 'leaflet';
import { Marker } from 'react-leaflet';

import { connectorTypes, connectorMarkerImages } from './connectorUtils';

const getConnectorTypeName = (connectionTypeID) => {
    return connectorTypes[connectionTypeID] || "Type 2";
};

const createMarker = ({ connectorType, isSelected }) => {
    const markerType = isSelected ? 'selected' : 'unselected';
    const iconUrl = connectorMarkerImages[markerType][connectorType] || connectorMarkerImages.unselected["Type 2"];

    return L.icon({
        iconUrl,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [1, -34],
    });
}

const CustomMarker = ({ station, isSelected, onClick }) => {
    const connectorType = getConnectorTypeName(station?.connections?.[0]?.connectionTypeID);

    return (
        <Marker
            position={[station.location.latitude, station.location.longitude]}
            icon={createMarker({ connectorType, isSelected })}
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
