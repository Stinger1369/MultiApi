import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import Population from '../Population/Population'; 
import './GoogleApp.css';
const containerStyle = {
  width: '400px',
  height: '400px'
};

function GoogleApp({ center }) {
  return (
    <div className="google-map-container">
      <div className="right">
      <Population title="Population Gauche" /> {/* Composant Population à gauche */}
      </div>
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
     
      <div className="left">
      <Population title="Population Droite" /> {/* Composant Population à droite */}
      </div>
    </div>
  )
}

export default GoogleApp;
