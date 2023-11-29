import React, { useState } from 'react';
import NavBar from './pages/Navbar/NavBar';
import Weather from './components/Weather/Weather';
import GoogleApp from './components/GoogleApp/GoogleApp';
import UnsplashImages from './components/Unsplash/Unsplash';
import  getCoordinatesForCity  from './components/GoogleApp/getCoordinatesForCity';
import Population from './components/Population/Population';  
import './App.css'; 

function App() {
  const [city, setCity] = useState('paris'); // Commencez avec une ville vide
  const [center, setCenter] = useState(null); // Commencez sans coordonnées

  const handleSearch = async (term) => {
    setCity(term);
    const coordinates = await getCoordinatesForCity(term);
    setCenter(coordinates);
  };

  return (
    <div className="App">
      <NavBar onSearch={handleSearch} />
      <Weather city={city} />
      <div className="content">
        {city && (
          <>
            <Population title={`Population de ${city} (Gauche)`} city={city} />
            <GoogleApp center={center} />
            <Population title={`Population de ${city} (Droite)`} city={city} />
          </>
        )}
      </div>
      {city && (
        <>
          
          <UnsplashImages searchTerm={city} />
        </>
      )}
    </div>
  );
}

export default App;

