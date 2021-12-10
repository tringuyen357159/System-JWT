import React, { useState } from 'react';
import ReactMapGL, { Popup } from 'react-map-gl';
import NavbarMenu from '../NavbarMenu/NavbarMenu';
import MarkerCustom from './Marker';

const GoogleMap = () => {
    const [viewport, setViewport] = useState({
        width: "90vw",
        height: "88vh",
        latitude: 13.78558241711469,
        longitude: 109.200227687442,
        zoom: 8
    })
    const [showPopup, setShowPopup] = useState(false)


    return (
        <>
            <NavbarMenu />
            <div style={{marginTop: '20px', display: 'flex', justifyContent: 'center'}}>
                <ReactMapGL 
                    {...viewport} 
                    onViewportChange={(viewport => setViewport(viewport))}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    mapboxApiAccessToken="pk.eyJ1IjoidHJpbmd1eWVuLTA0MDE5OSIsImEiOiJja3dwdnc5cDMwZ292MnZsYzdhMjVkdDB2In0.HrBMFMkcbiWCwP3Hr0y3kw"
                >
                    {showPopup && (
                        <Popup
                            latitude={13.78558241711469}
                            longitude={109.200227687442}
                            closeButton={false}
                            closeOnClick={false}
                            anchor="top-right"
                        >
                            Ít
                        </Popup>
                    )}
                    <MarkerCustom 
                        latitude={13.78558241711469}
                        longitude={109.200227687442}
                        setShowPopup={setShowPopup}
                    />

                    {/* <MarkerCustom 
                        latitude={16.064453166777188}
                        longitude={108.20496460411604}
                        setShowPopup={setShowPopup}
                    /> */}

                </ReactMapGL>
            </div>
        </>
    )
}

export default GoogleMap
