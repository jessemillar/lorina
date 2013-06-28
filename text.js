function font(textColor, textSize, textFont) {
    canvas.textAlign = "left";
    canvas.textBaseline = "top";
    canvas.fillStyle = textColor;
    canvas.font = textSize + "px " + textFont;
}

function write(textX, textY, textString) {
    canvas.fillText(textString, textX, textY);
}