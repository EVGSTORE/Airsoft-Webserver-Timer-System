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
        team2Modifier: document.getElementById('team2Modifier').value,

        team3Text: document.getElementById('team3Text').value,
        team3Number: document.getElementById('team3Number').value,
        team3Modifier: document.getElementById('team3Modifier').value,
        
        team4Text: document.getElementById('team4Text').value,
        team4Number: document.getElementById('team4Number').value,
        team4Modifier: document.getElementById('team4Modifier').value,
    };
    ws.send(JSON.stringify(data)); 
}

function resetOther(teamNumber) {
    if(teamNumber === 1) {
        document.getElementById('team2Modifier').value = '0';
    } else {
        document.getElementById('team1Modifier').value = '0';
    } 
}

function resetOther(teamNumber) {
    if(teamNumber === 1) {
        document.getElementById('team2Modifier').value = '0';
    } else if(teamNumber === 2) {
        document.getElementById('team1Modifier').value = '0';
    } else if(teamNumber === 3) {
        document.getElementById('team4Modifier').value = '0';
    } else if(teamNumber === 4) {
        document.getElementById('team3Modifier').value = '0';
    }// Send data after reset
}

function toggleAutoSend() {
    const autoSend = document.getElementById('autoSend').checked;
    const inputs = document.querySelectorAll('#team1Text, #team1Number, #team1Modifier, #team2Text, #team2Number, #team2Modifier, #team3Text, #team3Number, #team3Modifier, #team4Text, #team4Number, #team4Modifier');
    
    inputs.forEach(input => {
        if (autoSend) {
            input.addEventListener('input', sendData);
        } else {
            input.removeEventListener('input', sendData);
        }
    });
}