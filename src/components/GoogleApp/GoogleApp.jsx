import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import './GoogleApp.scss';
const containerStyle = {
  width: '100%',
  height: '100%'
};

function GoogleApp({ center }) {
  return (
    <div className="c-item google-map-container">
      <div className="map">
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
        </GoogleMap>
      </LoadScript>
      </div>
    </div>
  )
}

export default GoogleApp;
