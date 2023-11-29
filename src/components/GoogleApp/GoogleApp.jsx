import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './GoogleApp.scss';

function MapApp({ center }) {
  const mapContainerRef = useRef(null);

  // Coordonnées par défaut pour Paris
  const defaultCoords = { lat: 48.8566, lng: 2.3522 };

  useEffect(() => {
    // Utiliser les coordonnées fournies ou les coordonnées par défaut si non fournies
    const coords = center || defaultCoords;

    // Créer une nouvelle carte Leaflet
    const map = L.map(mapContainerRef.current).setView([coords.lat, coords.lng], 10);

    // Ajouter un fond de carte OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Nettoyage lors de la désactivation du composant
    return () => {
      map.remove();
    };
  }, [center]); // Se déclenche lorsque les coordonnées 'center' changent

  return (
    <div className="map-container">
      <div ref={mapContainerRef} className="map" />
    </div>
  );
}

export default MapApp;
