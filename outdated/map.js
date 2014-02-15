function map(mapString, mapWidth, mapHeight, tileSize) {
    for (currentTile = 0; currentTile < mapWidth * mapHeight; currentTile++) {
        if (mapString.charAt(currentTile) == "t") {
            ctx.fillStyle = cGreen;
            ctx.fillRect((currentTile - (Math.floor(currentTile / mapWidth) * mapWidth)) * tileSize, Math.floor(currentTile / mapWidth) * tileSize, tileSize, tileSize);
        } else if (mapString.charAt(currentTile) == "w") {
            ctx.fillStyle = cBlue;
            ctx.fillRect((currentTile - (Math.floor(currentTile / mapWidth) * mapWidth)) * tileSize, Math.floor(currentTile / mapWidth) * tileSize, tileSize, tileSize);
        }
    }
}