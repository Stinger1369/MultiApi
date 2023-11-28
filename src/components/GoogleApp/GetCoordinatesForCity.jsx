import axios from 'axios';

const getCoordinatesForCity = async (city) => {
  try {
    const apiKey = import.meta.env.VITE_GEOCODING_API_KEY;
    const response = await axios.get(`https://geocode.search.hereapi.com/v1/geocode`, {
      params: {
        q: city,
        apiKey: apiKey
      }
    });
    const { lat, lng } = response.data.items[0].position;
    return { lat, lng };
  } catch (error) {
    console.error("Erreur lors de la récupération des coordonnées: ", error);
    return { lat: 0, lng: 0 };
  }
};

export default getCoordinatesForCity;
