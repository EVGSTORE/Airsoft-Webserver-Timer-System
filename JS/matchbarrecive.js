(function() {
    var ws = new WebSocket('ws://192.168.50.205:8093');

    ws.onopen = function() {
        console.log('Connected to the WebSocket server for receiving data.');
    };

    ws.onmessage = function(event) {
        if (event.data instanceof Blob) {
            var reader = new FileReader();
            reader.onload = function(event) {
                try {
                    var data = JSON.parse(event.target.result);
                    updateDisplay(data);
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                }
            };
            reader.onerror = function(event) {
                console.error("File could not be read! Code " + event.target.error.code);
            };
            reader.readAsText(event.data);
        } else {
            try {
                var data = JSON.parse(event.data);
                updateDisplay(data);
            } catch (e) {
                console.error('Error parsing JSON:', e);
            }
        }
    };

    ws.onerror = function(error) {
        console.log('WebSocket Error:', error);
    };

    function updateDisplay(data) {
        var nameElement = document.getElementById('displayTeamName');
        var scoreElement = document.getElementById('displayTeamScore');
        var modifierElement = document.getElementById('displayTeamModifier');

        if (nameElement && scoreElement && modifierElement) {
            nameElement.textContent = data.teamText || "N/A";
            scoreElement.textContent = data.teamNumber || "N/A";
            modifierElement.textContent = data.teamModifier || "N/A";
        } else {
            console.error("One or more display elements are missing.");
        }
    }
})();
