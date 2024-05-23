// Import the WebSocket constructor from the 'ws' module
const WebSocket = require('ws');

// Create a WebSocket connection to the server
const ws = new WebSocket('ws://localhost:8091');

// Event listener for when the WebSocket connection is established
ws.on('open', function open() {
    console.log('Connection established');
    // Send a message to the server once the WebSocket connection is open
    ws.send('HELLO WORLD');
});

// Event listener for receiving messages from the WebSocket server
ws.on('message', function incoming(data) {
    console.log('Received message from server:', data);
});

// Event listener for handling errors
ws.on('error', function error(err) {
    console.error('WebSocket error:', err);
});

// Event listener for when the WebSocket connection is closed
ws.on('close', function close() {
    console.log('WebSocket connection closed');
});
