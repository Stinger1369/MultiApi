import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './GoogleApp.scss';

function MapApp({ city }) {
  const mapContainerRef = useRef(null);
  const [coords, setCoords] = useState({ lat: 48.8566, lng: 2.3522 }); // Paris par défaut

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?city=${city}&format=json`);
        if (!response.ok) throw new Error('Erreur lors de la récupération des coordonnées');
        const data = await response.json();
        if (data.length === 0) throw new Error('Ville non trouvée');
        setCoords({ lat: data[0].lat, lng: data[0].lon });
      } catch (error) {
        console.error('Erreur :', error);
      }
    };

    if (city) {
      fetchCoords();
    }
  }, [city]);

  useEffect(() => {
    const map = L.map(mapContainerRef.current).setView([coords.lat, coords.lng], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    return () => map.remove();
  }, [coords]);

  return (
    <div className="c-item map-container">
      <div ref={mapContainerRef} className="map" />
    </div>
  );
}

export default MapApp;
