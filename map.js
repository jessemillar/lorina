currentX = 0;

function drawMap(mapString, mapWidth, mapHeight, tileSize) {
    for (currentTile = 0; currentTile < mapWidth * mapHeight; currentTile++) {        
        
        if (currentX < mapWidth - 1) {
            currentX++;
        } else {
            currentX = 0;
        }
    
        if (mapString.charAt(currentTile) == 0) {
            canvas.fillStyle = colorGreen;
            canvas.fillRect(currentX * tileSize * setup.scale, Math.floor(currentTile / mapWidth) * tileSize * setup.scale, tileSize * setup.scale, tileSize * setup.scale);
        }
    }
}