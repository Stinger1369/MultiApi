import React, { useState, useEffect } from 'react';

function MarketStak() {
  const [marketData, setMarketData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = import.meta.env.VITE_BOURSES_API_KEY;
        const url = `https://api.marketstack.com/v1/tickers?access_key=${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Erreur lors de la récupération des données');
        const data = await response.json();
        setMarketData(data);
        console.log(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) return <div>Erreur : {error}</div>;
  if (!marketData) return <div>Chargement...</div>;

  return (
    <div>
      <h1>Données du Marché</h1>
        <p>Voici les données du marché:</p>
        <p>Nombre de données: {marketData.pagination.count}</p>
        <p>Nombre de pages: {marketData.pagination.limit}</p>
        <p>Page courante: {marketData.pagination.offset}</p>
        <p>Nombre total de pages: {marketData.pagination.total}</p>
        <h2>Données des actions</h2>
        <p>Voici les données des actions:</p>


      <ul>
        {marketData.data.map((item, index) => (
          <li key={index}>{item.name} - {item.symbol}</li>

        ))}
      </ul>
    </div>
  );
}

export default MarketStak;
