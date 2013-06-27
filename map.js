function drawMap(mapString, mapWidth, mapHeight, tileSize) {
    for (currentTile = 0; currentTile < mapWidth * mapHeight; currentTile++) {
        if (mapString.charAt(currentTile) == 0) {
            canvas.fillStyle = colorGreen;
            canvas.fillRect((currentTile - (Math.floor(currentTile / mapWidth) * mapWidth)) * tileSize * setup.scale, Math.floor(currentTile / mapWidth) * tileSize * setup.scale, tileSize * setup.scale, tileSize * setup.scale);
        }
    }
}