import React, { useState } from 'react';
import NavBar from './pages/Navbar/NavBar';
import Weather from './components/Weather/Weather';
import GoogleApp from './components/GoogleApp/GoogleApp';
import UnsplashImages from './components/Unsplash/Unsplash';
import  getCoordinatesForCity  from './components/GoogleApp/getCoordinatesForCity';
import './App.css'; 

function App() {
  const [city, setCity] = useState('Paris'); 
  const [searchTerm, setSearchTerm] = useState('Paris');
  const [center, setCenter] = useState({ lat: 48.8566, lng: 2.3522 }); // Coordonnées de Paris

  const handleSearch = async (term) => {
    setCity(term);
    setSearchTerm(term);
    const coordinates = await getCoordinatesForCity(term);
    setCenter(coordinates);
  };
  

  return (
    <div className="App">
      <NavBar onSearch={handleSearch} />
      <Weather city={city} />
      <GoogleApp center={center} />
      <UnsplashImages searchTerm={searchTerm} />
    </div>
  );
}

export default App;
