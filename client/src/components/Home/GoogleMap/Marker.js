import React from 'react';
import { Marker } from 'react-map-gl';
import markerIcon from '../../../assets/img/marker.png';

const MarkerCustom = (props) => {
    const { latitude, longitude, setShowPopup } = props;

    return (
        <Marker
            latitude={latitude}
            longitude={longitude}
            offsetLeft={-20}
            offsetTop={-50}
        >
            <img 
                src={markerIcon}
                style={{ height: '50', width: '50', cursor: 'pointer' }} 
                onMouseEnter={() => setShowPopup(true)}
                onMouseLeave={() => setShowPopup(false)}
            />
        </Marker>
    )
}

export default MarkerCustom
