// Draw controls

function clearCanvas() {
    canvas.fillStyle = setup.color;
    canvas.fillRect(setup.x, setup.y, setup.w, setup.h);
}

function draw(objectName, drawType) {
    if (drawType == "bound") {
        canvas.fillStyle = "rgba(255, 0, 255, 0.7500)";
        canvas.fillRect(objectName.boundX, objectName.boundY, objectName.boundW, objectName.boundH);
    } else if (drawType == "box") {
        canvas.fillStyle = objectName.color;
        canvas.fillRect(objectName.x, objectName.y, objectName.w, objectName.h);
    } else if (drawType == "sprite") {
        canvas.drawImage(objectName.sprite, Math.floor(objectName.x), Math.floor(objectName.y), objectName.w, objectName.h);
    }
}