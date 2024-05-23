function clearAllInputs() {
    document.getElementById('team1Text').value = '';
    document.getElementById('team1Number').value = '';
    document.getElementById('team1Modifier').value = '';

    document.getElementById('team2Text').value = '';
    document.getElementById('team2Number').value = '';
    document.getElementById('team2Modifier').value = '';

    document.getElementById('team3Text').value = '';
    document.getElementById('team3Number').value = '';
    document.getElementById('team3Modifier').value = '';

    document.getElementById('team4Text').value = '';
    document.getElementById('team4Number').value = '';
    document.getElementById('team4Modifier').value = '';
}

document.addEventListener('DOMContentLoaded', function() {
    // Function to update button text
    function updateButtonText(buttonId, newValue) {
        let button = document.getElementById(buttonId);
        if (button) {
            button.textContent = newValue || 'Default Team'; // Update with new value or default
        }
    }

    // Add event listeners to input fields
    const teamInputs = document.querySelectorAll('[id$="Text"]'); // Selects inputs for team names
    teamInputs.forEach(input => {
        input.addEventListener('input', function() {
            const teamNumber = this.id.match(/\d+/)[0]; // Extracts number from id like 'team1Text'
            updateButtonText(`team${teamNumber}Button`, this.value);
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Function to update button text
    function updateButtonText(buttonId, newValue) {
        let button = document.getElementById(buttonId);
        if (button) {
            button.textContent = newValue || 'Default Team'; // Update with new value or default
        }
    }

    // Add event listeners to input fields
    const teamInputs = document.querySelectorAll('[id$="Text"]'); // Selects inputs for team names
    teamInputs.forEach(input => {
        input.addEventListener('input', function() {
            const teamNumber = this.id.match(/\d+/)[0]; // Extracts number from id like 'team1Text'
            updateButtonText(`Vteam${teamNumber}Button`, this.value);
        });
    });
});

