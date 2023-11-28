import React, { useState } from 'react';
import NavBar from './pages/NavBar/NavBar';
import Weather from './components/Weather/Weather';
import './App.css'; 


function App() {
  const [city, setCity] = useState('Paris'); // Ville par défaut

  const handleSearch = (searchTerm) => {
    setCity(searchTerm);
  };

  return (
    <div className="App">
      <NavBar onSearch={handleSearch} />
      <Weather city={city} />
    </div>
  );
}
export default App;

