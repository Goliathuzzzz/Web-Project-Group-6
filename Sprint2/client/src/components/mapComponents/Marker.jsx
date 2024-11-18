import React from 'react';
import type2Marker from '../../assets/images/unselected_yellow.png';
import chademoMarker from '../../assets/images/unselected_blue.png';
import ccsMarker from '../../assets/images/unselected_red.png';

import activeType2Marker from '../../assets/images/selected_yellow.png';
import activeChademoMarker from '../../assets/images/selected_blue.png';
import activeCcsMarker from '../../assets/images/selected_red.png';

const connectorTypeMarkers = {
    "Type 2": type2Marker,
    "CHAdeMO": chademoMarker,
    "CCS": ccsMarker,
};
/*
const activeConnectorTypeMarkers = {
    "Type 2": activeType2Marker,
    "CHAdeMO": activeChademoMarker,
    "CCS": activeCcsMarker,
};
*/

const Marker = ({ connector, size }) => {

    const iconUrl = connectorTypeMarkers[connector] || type2Marker;

    return (
        <div
            className="marker"
            style={{
                backgroundImage: `url(${iconUrl})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                width: size,
                height: size,
                cursor: 'pointer',
            }}
            >
        </div>
    );
};

export default Marker;
