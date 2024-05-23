document.addEventListener('DOMContentLoaded', function() {
    (function() {
        var teamScoresWs = new WebSocket('ws://192.168.50.205:8090');

        teamScoresWs.onopen = function() {
            console.log('WebSocket connection for team scores established on port 8090.');
        };

        window.sendDataToPort8090 = function() {
            var data = {
                team1Text: document.getElementById('team1Text')?.value,
                team1Number: document.getElementById('team1Number')?.value,
                team1Modifier: document.getElementById('team1Modifier')?.value,
                team2Text: document.getElementById('team2Text')?.value,
                team2Number: document.getElementById('team2Number')?.value,
                team2Modifier: document.getElementById('team2Modifier')?.value,
                team3Text: document.getElementById('team3Text')?.value,
                team3Number: document.getElementById('team3Number')?.value,
                team3Modifier: document.getElementById('team3Modifier')?.value,
                team4Text: document.getElementById('team4Text')?.value,
                team4Number: document.getElementById('team4Number')?.value,
                team4Modifier: document.getElementById('team4Modifier')?.value,
            };
            teamScoresWs.send(JSON.stringify(data));
            console.log('Data sent to port 8090:', JSON.stringify(data));
        };

        function clearAllInputs() {
            document.querySelectorAll('input[type="text"], input[type="number"]').forEach(input => {
                input.value = '';
            });
            console.log('All input fields cleared.');
        }

        function toggleAutoSend() {
            const autoSendCheckbox = document.getElementById('autoSend');
            if (autoSendCheckbox) {
                const autoSend = autoSendCheckbox.checked;
                const inputs = document.querySelectorAll('input[type="text"], input[type="number"]');
                
                inputs.forEach(input => {
                    if (autoSend) {
                        input.addEventListener('input', window.sendDataToPort8090);
                        input.addEventListener('input', window.sendDataToPort8093);
                    } else {
                        input.removeEventListener('input', window.sendDataToPort8090);
                        input.removeEventListener('input', window.sendDataToPort8093);
                    }
                });
                console.log('AutoSend is now ' + (autoSend ? 'enabled' : 'disabled') + '.');
            }
        }

        const clearButton = document.querySelector('button[onclick="clearAllInputs()"]');
        if (clearButton) {
            clearButton.addEventListener('click', clearAllInputs);
        } else {
            console.error("Clear button not found.");
        }

        const autoSendCheckbox = document.getElementById('autoSend');
        if (autoSendCheckbox) {
            autoSendCheckbox.addEventListener('change', toggleAutoSend);
        } else {
            console.error("AutoSend checkbox not found.");
        }
    })();
});
