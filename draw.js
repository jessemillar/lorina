// Draw controls

function clear() {
    canvas.fillStyle = setup.color;
    canvas.fillRect(setup.x, setup.y, setup.w, setup.h);
}

function draw(objectName, drawType) {
    if (drawType == "box" || drawType == "b") {
        if (objectName.rotation == null || objectName.rotation == 0) {
            canvas.fillStyle = objectName.color;
            canvas.fillRect(objectName.x, objectName.y, objectName.w, objectName.h);
        } else {
            canvas.save();
            canvas.translate(objectName.x + objectName.w / 2, objectName.y + objectName.h / 2);
            canvas.rotate(objectName.rotation);
            canvas.fillStyle = objectName.color;
            canvas.fillRect(0 - objectName.w / 2, 0 - objectName.h / 2, objectName.w, objectName.h);
            canvas.restore();
        }
    } else if (drawType == "sprite" || drawType == "s") {
        if (objectName.rotation == null || objectName.rotation == 0) {
            canvas.drawImage(objectName.sprite, objectName.x, objectName.y, objectName.w, objectName.h);
        } else {
            canvas.save();
            canvas.translate(objectName.x + objectName.w / 2, objectName.y + objectName.h / 2);
            canvas.rotate(objectName.rotation);
            canvas.drawImage(objectName.sprite, 0 - objectName.w / 2, 0 - objectName.h / 2, objectName.w, objectName.h);
            canvas.restore();
        }
    }
}
