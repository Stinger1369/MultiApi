import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './pages/Navbar/NavBar';
import Weather from './components/Weather/Weather';
import GoogleApp from './components/GoogleApp/GoogleApp';
import UnsplashImages from './components/Unsplash/Unsplash';
import getCoordinatesForCity from './components/GoogleApp/getCoordinatesForCity';
import Population from './components/Population/Population';
import About from './pages/About/About'; 
import Contact from './pages/Contact/Contact'; 
import './App.scss';

function App() {
  const [city, setCity] = useState('paris'); 
  const [center, setCenter] = useState(null); 

  const handleSearch = async (term) => {
    setCity(term);
    const coordinates = await getCoordinatesForCity(term);
    setCenter(coordinates);
  };

  return (
    <Router>
      <div className="App">
        <NavBar onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={
            <>
              <Weather city={city} />
              <div className="content">
                {city && (
                  <>
                    <div className="c-col">
                      <Population title={`Population`} city={city} />
                      <Population title={`Population`} city={city} />
                    </div>
                    <div className="c-col map">
                      <GoogleApp center={center} />
                    </div>
                    <div className="c-col">
                      <Population title={`Population`} city={city} />
                      <Population title={`Population`} city={city} />
                    </div>  
                  </>
                )}
              </div>
            </>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
        </Routes>
        <UnsplashImages searchTerm={city} />
      </div>
    </Router>
  );
}

export default App;
