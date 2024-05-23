document.addEventListener('DOMContentLoaded', function() {
    // Connect to websocket on port 8091 local ip
    var ws1 = new WebSocket('ws://192.168.50.205:8091');
    var lastCountdown = null;
    var checkTimeout = null;

    ws1.onopen = function() {
        console.log('Connected to the WebSocket server');
    };

    ws1.onmessage = function(event) {
        console.log("Received data:", event.data); // Log any data received from the WebSocket

        if (event.data instanceof Blob) {
            // The data is a Blob, read it as text
            var reader = new FileReader();
            reader.onload = function() {
                try {
                    var data = JSON.parse(reader.result); // Parse the read string as JSON
                    console.log("Parsed data from Blob:", data); // Debugging the parsed data
                    updateScores(data);
                } catch (e) {
                    console.error("Error parsing JSON from Blob:", e);
                }
            };
            reader.readAsText(event.data);
        } else {
            try {
                // The data is a JSON string
                var data = JSON.parse(event.data); // Directly parse the string as JSON
                console.log("Parsed JSON string data:", data); // Debugging the parsed data
                updateScores(data);
            } catch (e) {
                console.error("Error parsing JSON string:", e);
            }
        }
    };

    ws1.onerror = function(event) {
        console.error('WebSocket error:', event);
    };

    ws1.onclose = function(event) {
        console.log('WebSocket connection closed:', event.reason);
    };

    // Update stored info
    function updateScores(data) {
        if (data.countdown !== undefined) {
            document.getElementById('countdownDisplay').textContent = data.countdown;
            var element = document.getElementById("advert");
    
            if (!element) {
                console.error("Failed to find the 'advert' element.");
                return;
            }
    
            if (data.countdown === lastCountdown) {
                if (!checkTimeout) {
                    checkTimeout = setTimeout(function() {
                        console.log("NOCHANGE;4");
                        clearTimeout(checkTimeout);
                        checkTimeout = null; 
                    }, 4000);
                }
            } else {
                // If the countdown changes
                if (checkTimeout) {
                    clearTimeout(checkTimeout);
                    checkTimeout = null;
                }
                console.log("YESCHANGE;4");
                    hideAdverts();
                lastCountdown = data.countdown;

                checkTimeout = setTimeout(function() {
                    console.log("NOCHANGE;4");
                        showAdverts();
                    clearTimeout(checkTimeout);
                    checkTimeout = null; 
                }, 2000);
            }
        }
    }

    function showAdverts() {
        var content = document.getElementById('advert');
        content.classList.remove('hidden');
        content.classList.add('visible');
    }
    
    function hideAdverts() {
        var content = document.getElementById('advert');
        content.classList.remove('visible');
        content.classList.add('hidden');
    }
})

