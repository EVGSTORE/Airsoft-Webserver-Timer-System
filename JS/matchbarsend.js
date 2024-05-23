document.addEventListener('DOMContentLoaded', function() {
    var selectedTeamWs = new WebSocket('ws://192.168.50.205:8093');
    var selectedTeam1Info = { teamId: null };
    var selectedTeam2Info = { teamId: null };

    selectedTeamWs.onopen = function() {
        console.log('WebSocket connection for selected team details established on port 8093.');
    };

    function updateTeamInfo(teamId) {
        var teamText = document.getElementById(teamId + 'Text');
        var teamNumber = document.getElementById(teamId + 'Number');
        var teamModifier = document.getElementById(teamId + 'Modifier');

        if (!teamText || !teamNumber || !teamModifier) {
            console.error('Failed to retrieve elements for:', teamId);
            return {};
        }
        return {
            teamId: teamId,
            teamText: teamText.value,
            teamNumber: teamNumber.value,
            teamModifier: teamModifier.value
        };
    }

    function bindTeamInputs(teamId) {
        ['Text', 'Number', 'Modifier'].forEach(field => {
            var inputId = teamId + field;
            var inputElement = document.getElementById(inputId);
            if (inputElement) {
                inputElement.addEventListener('input', function() {
                    if (teamId === selectedTeam1Info.teamId) {
                        selectedTeam1Info = updateTeamInfo(teamId);
                    } else if (teamId === selectedTeam2Info.teamId) {
                        selectedTeam2Info = updateTeamInfo(teamId);
                    }
                    updateMatchupDisplay();
                });
            }
        });
    }

    ['team1', 'team2', 'team3', 'team4'].forEach(teamId => {
        bindTeamInputs(teamId);
    });

    window.sendDataToPort8093 = function() {
        if (selectedTeam1Info.teamId && selectedTeam2Info.teamId) {
            var data = {
                team1: selectedTeam1Info,
                team2: selectedTeam2Info
            };
            selectedTeamWs.send(JSON.stringify(data));
            console.log('Data sent to port 8093:', JSON.stringify(data));
        } else {
            console.error('Incomplete data for one or both teams.');
        }
    };

    function updateMatchupDisplay() {
        var matchupElement = document.getElementById('currentMatchup');
        if (selectedTeam1Info.teamId && selectedTeam2Info.teamId) {
            matchupElement.textContent = `${selectedTeam1Info.teamText} (${selectedTeam1Info.teamNumber}, ${selectedTeam1Info.teamModifier}) vs ${selectedTeam2Info.teamText} (${selectedTeam2Info.teamNumber}, ${selectedTeam2Info.teamModifier})`;
        }
    }

    document.querySelectorAll('.teamButton').forEach(button => {
        button.addEventListener('click', function(event) {
            var teamNumber = event.target.id.match(/\d+/)[0]; // Extracts the number from the ID
            var prefix = event.target.id.charAt(0); // Checks if the ID has a 'V' prefix
            var teamId = 'team' + teamNumber;

            if (prefix === 'V') {
                selectedTeam2Info = updateTeamInfo(teamId);
                selectedTeam2Info.teamId = teamId;
            } else {
                selectedTeam1Info = updateTeamInfo(teamId);
                selectedTeam1Info.teamId = teamId;
            }
            updateMatchupDisplay();
        });
    });
});
