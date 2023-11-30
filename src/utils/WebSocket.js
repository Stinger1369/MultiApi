const apiKey =import.meta.env.VITE_WEBSOCKET_API_KEY;
const socket = new WebSocket('wss://ws.finnhub.io?token=' + apiKey);

socket.addEventListener('open', () => {
  console.log('WebSocket Connected');

  socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}));
  socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AMZN'}));
});

socket.addEventListener('message', (event) => {
  const json = JSON.parse(event.data);

  if (json.type === 'trade' && json.data && json.data.length > 0) {
    const stockData = json.data[0];
    console.log('Nouvelles données de trade reçues :', stockData);
  }
});

socket.addEventListener('error', (error) => {
  console.error('WebSocket Error:', error);
});

socket.addEventListener('close', () => {
  console.log('WebSocket Disconnected');
});

export default socket;
