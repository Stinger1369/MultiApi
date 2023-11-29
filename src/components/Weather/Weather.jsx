import React, { useState, useEffect } from 'react';
import './Weather.css';
function Weather({ city }) {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
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
      <div className="ville">      
      <h1>{weatherData.name}</h1>
      <p>{weatherData.sys.country}</p>
      <p>{new Date(weatherData.dt * 1000).toLocaleDateString()}</p>
      <p>{new Date(weatherData.dt * 1000).toLocaleTimeString()}</p>
      
      </div>
      <div className="temp">
      <p>Température: {weatherData.main.temp}°C</p>
      <p>Température ressentie: {weatherData.main.feels_like}°C</p>
      <p>Température minimale: {weatherData.main.temp_min}°C</p>
      <p>Température maximale: {weatherData.main.temp_max}°C</p>

      </div>
      <div className="info">      
      <p>Conditions: {weatherData.weather[0].description}</p>
      <p>Humidité: {weatherData.main.humidity}%</p>
      <p>Pression: {weatherData.main.pressure}hPa</p>
      <p>Vitesse du vent: {weatherData.wind.speed}km/h</p>

      </div>
    </div>
  );
}

export default Weather;
