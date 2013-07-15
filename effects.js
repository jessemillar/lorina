// Various, visual effects

function scanlines(lineOpacity) {
    for (var i = 0; i < window.innerHeight; i = i + 2) {
        ctx.strokeStyle = "rgba(255, 255, 255," + lineOpacity + ")";
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(window.innerWidth, i);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
    }
}