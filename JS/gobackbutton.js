let holdButton = document.getElementById('holdButton');
let holdTimeout;

holdButton.addEventListener('mousedown', startHold);
holdButton.addEventListener('touchstart', startHold); // For mobile devices
holdButton.addEventListener('mouseup', cancelHold);
holdButton.addEventListener('mouseleave', cancelHold); // In case the mouse leaves the button
holdButton.addEventListener('touchend', cancelHold); // For mobile devices

function startHold() {
    holdTimeout = setTimeout(function() {
        window.location.href = '../webserver';
    }, 1000); // 1000 milliseconds = 1 second
}

function cancelHold() {
    clearTimeout(holdTimeout);
}