function map(mapString, mapWidth, mapHeight, tileSize) {
    for (currentTile = 0; currentTile < mapWidth * mapHeight; currentTile++) {
        if (mapString.charAt(currentTile) == "t") {
            canvas.fillStyle = colorGreen;
            canvas.fillRect((currentTile - (Math.floor(currentTile / mapWidth) * mapWidth)) * tileSize * setup.scale, Math.floor(currentTile / mapWidth) * tileSize * setup.scale, tileSize * setup.scale, tileSize * setup.scale);
        } else if (mapString.charAt(currentTile) == "w") {
            canvas.fillStyle = colorBlue;
            canvas.fillRect((currentTile - (Math.floor(currentTile / mapWidth) * mapWidth)) * tileSize * setup.scale, Math.floor(currentTile / mapWidth) * tileSize * setup.scale, tileSize * setup.scale, tileSize * setup.scale);
        }
    }
}