// Various, visual effects

function scanlines(lineOpacity) {
    for (var i = 0; i < window.innerHeight; i = i + 2) {
        canvas.strokeStyle = "rgba(0, 0, 0," + lineOpacity + ")";
        canvas.beginPath();
        canvas.moveTo(0, i);
        canvas.lineTo(window.innerWidth, i);
        canvas.lineWidth = 1;
        canvas.stroke();
        canvas.closePath();
    }
}