var countdown;
var countdownamount = 30; // Default countdown time
var countdownNumber;
var isPaused = false;

var ws = new WebSocket('ws://192.168.50.205:8091');
ws.onopen = function() {
    console.log('WebSocket connection established for countdownclock.js');
};

ws.onmessage = function(event) {
    if (event.data instanceof Blob) {
        // The message is a Blob, not a JSON string
        var reader = new FileReader();
        reader.onload = function() {
            // Once we have the text, let's parse it as JSON
            try {
                var data = JSON.parse(reader.result);
                processMessage(data);
            } catch (error) {
                console.error("Error parsing Blob message:", error);
            }
        };
        reader.onerror = function(err) {
            console.error("Error reading the Blob data:", err);
        };
        reader.readAsText(event.data); // Read the Blob as text
    } else {
        // Assume the message is a JSON string
        try {
            var data = JSON.parse(event.data);
            processMessage(data);
        } catch (error) {
            console.error("Error parsing message:", error);
        }
    }
};

ws.onerror = function(event) {
    console.error("WebSocket error observed:", event);
};

// Function to process the message data sent in from the websocket
function processMessage(data) {
    console.log("Processed data:", data);
    if (data.command === "pause") {
        console.log("Pause command received, toggling countdown.");
        toggleCountdown();
    }
    // Add additional message handling here as needed
    if (data.command === "playSoundEndgame") {
        playSoundEndgame();
    }
}


function getCustomTime() {
    var minutes = parseInt(document.getElementById('customMinutes').value, 10) || 0;
    var seconds = parseInt(document.getElementById('customSeconds').value, 10) || 0;
    return (minutes * 60) + seconds;
}

function updateCustomTime() {
    countdownNumber = getCustomTime(); // Get custom time in seconds
    updateDisplay(countdownNumber); // Update the display with the new time
}

function toggleCountdown() {
    console.log(`toggleCountdown called. isPaused: ${isPaused}, countdown (interval ID):`, countdown);

    if (countdown && !isPaused) {
        console.log("Attempting to pause countdown.");
        clearInterval(countdown);
        countdown = null;
        isPaused = true;
        console.log("Countdown should now be paused. isPaused:", isPaused, "countdown (interval ID):", countdown);
    } else if (isPaused) {
        console.log("Attempting to resume countdown.");
        startCountdown();
    }
}

function resetCountdown() {
    clearInterval(countdown);
    countdown = null;
    countdownNumber = getCustomTime(); // Reset to custom or default time
    isPaused = false;
    updateDisplay(countdownNumber);
    ws.send(JSON.stringify({ countdown: formatTime(countdownNumber) }));
}

function endCountdown() {
    countdownNumber = 0;
    updateDisplay(countdownNumber);
}

function startCountdown() {
    if (isPaused) {
        isPaused = false;
        if (!countdown) {
            countdown = setInterval(function() {
                countdownNumber--;
                updateDisplay(countdownNumber);
                ws.send(JSON.stringify({ countdown: formatTime(countdownNumber) }));

                if (countdownNumber <= 0) {
                    clearInterval(countdown);
                    countdown = null;
                    isPaused = false;
                    ws.send(JSON.stringify({ countdown: "0:00" }));
                    playSoundEndgame(); // Send the end game command
                }
            }, 1000);
        }
    } else {
        countdownNumber = getCustomTime(); // Get custom time if set
        updateDisplay(countdownNumber);

        if (!countdown) {
            countdown = setInterval(function() {
                countdownNumber--;
                updateDisplay(countdownNumber);
                ws.send(JSON.stringify({ countdown: formatTime(countdownNumber) }));

                if (countdownNumber <= 0) {
                    clearInterval(countdown);
                    countdown = null;
                    isPaused = false;
                    ws.send(JSON.stringify({ countdown: "0:00" }));
                    playSoundEndgame(); // Send the end game command
                }
            }, 1000);
        }
    }
}

function updateDisplay(seconds) {
    document.getElementById('countdownDisplay').textContent = formatTime(seconds);
}

function formatTime(seconds) {
    if (isNaN(seconds)) {
        return "0:00"; // Guard clause to handle NaN
    }

    var minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function setCustomTime() {
    var customTimeValue = document.getElementById('customTime').value;
    countdownNumber = customTimeValue ? parseInt(customTimeValue, 10) : countdownamount;
    updateDisplay(countdownNumber); // Optional: update the display immediately
}

// CSL Audio Functions
function startSoundCountdown() {
    ws.send(JSON.stringify({ command: "start20SecCountdown" }));
    setTimeout(startCountdown, 11000);  // Execute startCountdown after 11000 milliseconds
}

function playSoundEndgame() {
    ws.send(JSON.stringify({ command: "endgameHorn" }));
    countdownNumber = 0;
    updateDisplay(countdownNumber);
}

// Python Command Process

function processMessage(data) {
    console.log("Processed data:", data);
    if (data.command === "pythonStopTimer") {
        console.log("Pause command received, toggling countdown.");
        ws.send(JSON.stringify({ command: "endgameHorn" }));
        countdownNumber = 0;
        updateDisplay(countdownNumber);
    }

    if (data.command === "playSoundEndgame") {
        playSoundEndgame();
    }
}
