const WebSocket = require('ws');

// WebSocket server for scores
const scoreServer = new WebSocket.Server({ port: 8090, host: '192.168.50.205' });
scoreServer.on('connection', function connection(ws) {
  console.log('Score client connected');
  ws.on('message', function incoming(message) {
    console.log(`Received score message: ${message}`);
    // Broadcast the received message to all connected score clients
    scoreServer.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
  ws.on('close', () => {
    console.log('Score client disconnected');
  });
});
console.log('Score WebSocket server is running on ws://192.168.50.205:8090');

// WebSocket server for scores
const matchServer = new WebSocket.Server({ port: 8093, host: '192.168.50.205' });
matchServer.on('connection', function connection(ws) {
  console.log('MatchBar client connected');
  ws.on('message', function incoming(message) {
    console.log(`Received MatchBar message: ${message}`);
    // Broadcast the received message to all connected score clients
    matchServer.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
  ws.on('close', () => {
    console.log('MatchBar client disconnected');
  });
});
console.log('MatchBar WebSocket server is running on ws://192.168.50.205:8093');

// WebSocket server for clock
const clockServer = new WebSocket.Server({ port: 8091, host: '192.168.50.205' });
clockServer.on('connection', function connection(ws) {
  console.log('Clock client connected');
  ws.on('message', function incoming(message) {
    console.log(`Received clock message: ${message}`);
    // Broadcast the received message to all connected clock clients
    clockServer.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
  ws.on('close', () => {
    console.log('Clock client disconnected');
  });
});
console.log('Clock WebSocket server is running on ws://192.168.50.205:8091');


// WebSocket server for interviews
const interviewServer = new WebSocket.Server({ port: 8092, host: '192.168.50.205' });
interviewServer.on('connection', function connection(ws) {
  console.log('Interview client connected');
  ws.on('message', function incoming(message) {
    console.log('Received interview message: %s', message);
    // Broadcast incoming message to all clients
    interviewServer.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
  ws.on('close', () => {
    console.log('Interview client disconnected');
  });
});
console.log('Interview WebSocket server is running on ws://192.168.50.205:8092');

