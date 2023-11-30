import React, { useEffect, useState } from 'react';

function MarketStack() {
  const [stockData, setStockData] = useState(null);
  const apiKey = 'clk41ipr01ql1cbge0q0clk41ipr01ql1cbge0qg'; // Remplacez par votre clé API Finnhub

  useEffect(() => {
    const fetchData = async () => {
      // Remplacement de l'URL par celle de l'API Finnhub
      const url = `https://finnhub.io/api/v1/quote?symbol=AAPL&token=${apiKey}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setStockData(data);
        console.log(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchData();
  }, []);

  if (!stockData) return <div>Chargement des données...</div>;

  return (
    <div>
      <h1>Données Boursières</h1>
      {/* Affichage des données */}
      <p>{JSON.stringify(stockData, null, 2)}</p>
      
    </div>
  );
}

export default MarketStack;
