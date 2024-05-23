const ws = new WebSocket('ws://192.168.50.205:8093');

ws.onmessage = function(event) {
    // Check if the received data is a Blob
    if (event.data instanceof Blob) {
        // The data is a Blob, handle it appropriately
        var reader = new FileReader();
        reader.onload = function() {
            try {
                const data = JSON.parse(reader.result);
                updateDisplay(data);
            } catch (error) {
                console.error('Failed to parse incoming Blob message as JSON:', error);
            }
        };
        reader.onerror = function(error) {
            console.error('Failed to read the blob:', error);
        };
        reader.readAsText(event.data); // Read the blob as text
    } else {
        // Assume the data is a text-based JSON
        try {
            const data = JSON.parse(event.data);
            updateDisplay(data);
        } catch (error) {
            console.error('Failed to parse incoming message as JSON:', error);
        }
    }
};

function updateDisplay(data) {
    if (data.team1) {
        document.getElementById('team1Text').textContent = data.team1.teamText || '';
        document.getElementById('team1Number').textContent = data.team1.teamNumber || '';
        document.getElementById('team1Modifier').textContent = data.team1.teamModifier || '';
    }
    if (data.team2) {
        document.getElementById('team2Text').textContent = data.team2.teamText || '';
        document.getElementById('team2Number').textContent = data.team2.teamNumber || '';
        document.getElementById('team2Modifier').textContent = data.team2.teamModifier || '';
    }
}

ws.onerror = function(error) {
    console.error('WebSocket error:', error);
};

ws.onopen = function() {
    console.log('WebSocket connection established.');
};

ws.onclose = function() {
    console.log('WebSocket connection closed.');
};