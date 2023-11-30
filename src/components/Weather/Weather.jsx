import React, { useState, useEffect } from 'react';
import './Weather.scss';
import Rain from '../../assets/images/rain.jpg';
import Sun from '../../assets/images/sun.jpg';
import Snow from '../../assets/images/snow.jpg';
import Wind from '../../assets/images/wind.jpg';
import Nuages from '../../assets/images/wind.jpg';


function Weather({ city }) {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weeklyForecast, setWeeklyForecast] = useState(null);
  const [error, setError] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState('');
  const weatherToColor = {
    'Clear': '#000000', // Black text for clear/sun background
    'Rain': '#FFFFFF', // White text for rain background
    'Clouds': '#FFFFFF', // White text for cloudy background
    'Wind': '#000000', // Black text for windy background
    'Snow': '#000000', // Black text for snow background
  };
  
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY; // Assurez-vous que la clé API est définie dans vos variables d'environnement
        // D'abord, obtenez les coordonnées de la ville
        const coordUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const coordResponse = await fetch(coordUrl);
        if (!coordResponse.ok) throw new Error('Ville non trouvée');
        const coordData = await coordResponse.json();

        // Ensuite, utilisez les coordonnées pour obtenir les prévisions sur 7 jours
        const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordData.coord.lat}&lon=${coordData.coord.lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`;
        const forecastResponse = await fetch(forecastUrl);
        if (!forecastResponse.ok) throw new Error('Erreur lors de la récupération des prévisions');
        const forecastData = await forecastResponse.json();

        setCurrentWeather(coordData);
        setWeeklyForecast(forecastData.daily);
        setError(null);

        // Choisissez une image de fond basée sur les conditions météorologiques actuelles
        switch (coordData.weather[0].main) {
          case 'Clear':
            setBackgroundImage(Sun);
            break;
          case 'Rain':
            setBackgroundImage(Rain);
            break;
          case 'Clouds':
            setBackgroundImage(Nuages);
            break;
          case 'Wind':
            setBackgroundImage(Wind);
            break;
          case 'Snow':
            setBackgroundImage(Snow);
            break;
          default:
            setBackgroundImage('');
            break;
        }
      } catch (error) {
        setError(error.message);
        setCurrentWeather(null);
        setWeeklyForecast(null);
        setBackgroundImage('');
      }
    };

    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  if (error) return <div>Erreur : {error}</div>;
  if (!currentWeather || !weeklyForecast) return <div>Chargement...</div>;

  // Fonction pour obtenir le chemin de l'icône en fonction du code météo
  const getIconUrl = (iconCode) => `http://openweathermap.org/img/wn/${iconCode}.png`;
  const textColor = currentWeather ? weatherToColor[currentWeather.weather[0].main] : '#000000';
  console.log(textColor);

  return (
    <div className="weather" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="firstBlock">
      <div className="ville">      
        <h1>{currentWeather.name}</h1>
        <p>{currentWeather.sys.country}</p>
        <p>{new Date(currentWeather.dt * 1000).toLocaleDateString()}</p>
        <p>{new Date(currentWeather.dt * 1000).toLocaleTimeString()}</p>
        <img src={getIconUrl(currentWeather.weather[0].icon)} alt="Weather icon" />
      </div>
      <div className="temp">
        <p>Température: {currentWeather.main.temp}°C</p>
        <p>Température ressentie: {currentWeather.main.feels_like}°C</p>
        <p>Température minimale: {currentWeather.main.temp_min}°C</p>
        <p>Température maximale: {currentWeather.main.temp_max}°C</p>
        <img src={getIconUrl(currentWeather.weather[0].icon)} alt="Weather icon" />
      </div>
      <div className="info">
        <p>Conditions: {currentWeather.weather[0].description}</p>
        <p>Humidité: {currentWeather.main.humidity}%</p>
        <p>Pression: {currentWeather.main.pressure}hPa</p>
        <p>Vitesse du vent: {currentWeather.wind.speed}km/h</p>
        <img src={getIconUrl(currentWeather.weather[0].icon)} alt="Weather icon" />
      </div>
      </div>
      <div className="weekly-forecast" style={{ color: textColor }}>
      {weeklyForecast.map((day, index) => (
        <div key={index} className="daily-forecast">
          <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
          <img src={getIconUrl(day.weather[0].icon)} alt="Daily weather icon" />
          <p>Max: {day.temp.max}°C</p>
          <p>Min: {day.temp.min}°C</p>
        </div>
      ))}
    </div>
    </div>
  );
}

export default Weather;
