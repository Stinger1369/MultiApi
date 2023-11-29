import React from 'react';

async function getCoordinatesForCity(city) {
  const apikey = "sSbI019VmZZrIx5w0xXKyq0VDS94JHFD";
  const url = `https://api.apilayer.com/geo/city/name/${city}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: new Headers({
        "apikey": apikey
      })
    });
    const data = await response.json();

    // Utiliser les coordonnées de la première entrée de la liste
    const firstEntry = data[0];
    return {
      lat: firstEntry.latitude,
      lng: firstEntry.longitude
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des coordonnées:', error);
    return null; // Retourner null en cas d'erreur
  }
}
export default getCoordinatesForCity;