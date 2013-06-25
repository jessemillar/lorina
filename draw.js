// Draw controls

function clearCanvas() {
    canvas.fillStyle = setup.color;
    canvas.fillRect(setup.x, setup.y, setup.w, setup.h);
}

function draw(objectName) {
    // canvas.drawImage(objectName.sprite, (objectName.w / scale + 1) * objectName.currentFrame, 0, objectName.w / scale, objectName.h / scale, Math.floor(objectName.x), Math.floor(objectName.y), objectName.w, objectName.h);
    canvas.drawImage(objectName.sprite, Math.floor(objectName.x), Math.floor(objectName.y), objectName.w, objectName.h);
}

// Testing function

function drawBound(objectName) {
    canvas.fillStyle = "rgba(255, 0, 255, 0.7500)";
    canvas.fillRect(objectName.boundX, objectName.boundY, objectName.boundW, objectName.boundH);
}