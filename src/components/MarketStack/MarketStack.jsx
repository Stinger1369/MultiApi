import React, { useEffect, useState } from 'react';
import './MarketStack.scss';
import socket from '../../utils/WebSocket';

function MarketStack() {
  const [stockData, setStockData] = useState(null);

  // Écoutez les événements du socket et mettez à jour stockData en conséquence
  useEffect(() => {
    const handleMessage = (event) => {
      const json = JSON.parse(event.data);
  
      // Traitez les messages reçus ici
      if (json.type === 'trade' && json.data && json.data.length > 0) {
        const newStockData = json.data[0];
        console.log('Nouvelles données de trade reçues :', newStockData);
  
        // Mettez à jour l'état avec les nouvelles données
        setStockData(newStockData);
      }
    };
  
    const handleClose = () => {
      console.log('WebSocket Disconnected');
    };
  
    socket.addEventListener('message', handleMessage);
    socket.addEventListener('close', handleClose);
  
    return () => {
      // Supprimez les écouteurs lorsque le composant est démonté
      socket.removeEventListener('message', handleMessage);
      socket.removeEventListener('close', handleClose);
    };
  }, []);
  
  if (!stockData) return <div>Chargement des données...</div>;

  return (
    <div className="market-stack">
    <h2>{stockData.s}</h2>
    <p>Prix actuel: {stockData.p || 'Non disponible'}</p>
    <p>Volume: {stockData.v || 'Non disponible'}</p>
    <p>Conditions de commerce: {stockData.c.join(', ') || 'Non disponible'}</p>
    
    <p>Timestamp: {new Date(stockData.t).toLocaleString() || 'Non disponible'}</p>

  </div>
  
  );
}

export default MarketStack;
