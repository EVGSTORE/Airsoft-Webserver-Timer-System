const WebSocket = require('ws');
const wss = new WebSocket.Server({ host: '0.0.0.0', port: 8090 });

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('message', function incoming(message) {
    console.log(`Received message: ${message}`);
    // Broadcast the message to all connected clients
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => console.log('Client disconnected'));
});


console.log('WebSocket server is running on ws://192.168.1.237:8090');
