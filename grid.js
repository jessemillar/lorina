function grid(squareWidth, squareHeight) {
    gridPaper = {width: squareWidth, height: squareHeight};
}

function drawGrid(gridColor, gridLineWidth, gridOpacity) {
    // Vertical lines
    for (var i = 0; i < camera.width; i = i + gridPaper.width) {
        startPath();
        opacity(gridOpacity);
        if (i != 0) {
            line(i, 0, 0, camera.height);
        }
        drawPath(null, gridColor, gridLineWidth, gridOpacity);
    }
}