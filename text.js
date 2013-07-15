function font(textColor, textSize, textFont) {
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillStyle = textColor;
    ctx.font = textSize + "px " + textFont;
}

function write(textX, textY, textString) {
    ctx.fillText(textString, textX, textY);
}