function grid(squareWidth, squareHeight) {
    gridPaper = {width: squareWidth, height: squareHeight};
}

function drawGrid(gridColor, gridLineWidth, gridOpacity) {
    // Vertical lines
    for (var i = 0; i < setup.width; i = i + gridPaper.width) {
        startPath();
        opacity(gridOpacity);
        if (i != 0) {
            line(i, 0, 0, setup.height);
        }
        drawPath(null, gridColor, gridLineWidth, gridOpacity);
    }
}