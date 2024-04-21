var ws = new WebSocket('ws://192.168.1.237:8090');
ws.onopen = function() {
    console.log('WebSocket connection established for teamscores.js');
};

function sendData() { 
    var data = {
        team1Text: document.getElementById('team1Text').value,
        team1Number: document.getElementById('team1Number').value,
        team1Modifier: document.getElementById('team1Modifier').value,
        team2Text: document.getElementById('team2Text').value,
        team2Number: document.getElementById('team2Number').value,
        team2Modifier: document.getElementById('team2Modifier').value
    };
    ws.send(JSON.stringify(data)); 
}

function resetOther(teamNumber) {
    if(teamNumber === 1) {
        document.getElementById('team2Modifier').value = '0';
    } else {
        document.getElementById('team1Modifier').value = '0';
    }
    sendData(); // Optionally send data immediately after reset
}