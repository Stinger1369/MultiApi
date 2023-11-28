import React, { useState, useEffect } from 'react';

function Weather({ city }) {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3c9db6247fc0db3f67e8a1f56ae53258&units=metric`);
        if (!response.ok) throw new Error('Ville non trouvée');
        const data = await response.json();
        setWeatherData(data);
        setError(null); 
      } catch (error) {
        setError(error.message);
        setWeatherData(null); 
      }
    };

    fetchData();
  }, [city]); 

  if (error) return <div>Erreur : {error}</div>;
  if (!weatherData) return <div>Chargement...</div>;

  return (
    <div className="weather">
      <h1>{weatherData.name}</h1>
      <p>Température: {weatherData.main.temp}°C</p>
      <p>Conditions: {weatherData.weather[0].description}</p>
    </div>
  );
}

export default Weather;
