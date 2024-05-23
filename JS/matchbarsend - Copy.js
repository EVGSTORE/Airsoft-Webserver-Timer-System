document.addEventListener('DOMContentLoaded', function() {
    var selectedTeamWs = new WebSocket('ws://localhost:8093');
    var selectedTeam1Info = {};
    var selectedTeam2Info = {};

    selectedTeamWs.onopen = function() {
        console.log('WebSocket connection for selected team details established on port 8093.');
    };

    window.sendDataToPort8093 = function() {
        if (Object.keys(selectedTeam1Info).length && Object.keys(selectedTeam2Info).length) {
            var data = {
                team1Text: selectedTeam1Info.teamText,
                team1Number: selectedTeam1Info.teamNumber,
                team1Modifier: selectedTeam1Info.teamModifier,
                team2Text: selectedTeam2Info.teamText,
                team2Number: selectedTeam2Info.teamNumber,
                team2Modifier: selectedTeam2Info.teamModifier,
            };
            selectedTeamWs.send(JSON.stringify(data));
            console.log('Data sent to port 8093:', JSON.stringify(data));
        } else {
            console.error('Incomplete data for one or both teams.');
        }
    };

    document.querySelectorAll('.teamButton').forEach(button => {
        button.addEventListener('click', function(event) {
            var teamNumber = event.target.id.match(/\d+/)[0]; // Extracts the number from the ID
            var prefix = event.target.id.charAt(0) === 'V' ? 'V' : ''; // Checks if the ID starts with 'V'
            var teamId = 'team' + teamNumber;

            if (prefix === 'V') {
                selectedTeam2Info = updateTeamInfo(teamId);
            } else {
                selectedTeam1Info = updateTeamInfo(teamId);
            }

            if (Object.keys(selectedTeam1Info).length && Object.keys(selectedTeam2Info).length) {
                window.sendDataToPort8093();
            }
        });
    });

    function updateTeamInfo(teamId) {
        var teamText = document.getElementById(teamId + 'Text');
        var teamNumber = document.getElementById(teamId + 'Number');
        var teamModifier = document.getElementById(teamId + 'Modifier');

        if (!teamText || !teamNumber || !teamModifier) {
            console.error('Failed to retrieve elements for:', teamId);
            return {};
        }
        return {
            teamText: teamText.value,
            teamNumber: teamNumber.value,
            teamModifier: teamModifier.value,
        };
    }
});

