// Draw controls

function clear() {
    canvas.fillStyle = setup.color;
    canvas.fillRect(setup.x, setup.y, setup.w, setup.h);
}

function draw(objectName, drawType, rotateDegree) {
    var radian = rotateDegree * Math.PI / 180;

    if (drawType == "box" || drawType == "b") {
        if (rotateDegree == null) {
            canvas.fillStyle = objectName.color;
            canvas.fillRect(objectName.x, objectName.y, objectName.w, objectName.h);
        } else {
            canvas.save();
            canvas.translate(objectName.x + objectName.w / 2, objectName.y + objectName.h / 2);
            canvas.rotate(radian);
            canvas.fillStyle = objectName.color;
            canvas.fillRect(0, 0, objectName.w, objectName.h);
            canvas.restore();
        }
    } else if (drawType == "sprite" || drawType == "s") {
        if (rotateDegree == null) {
            canvas.drawImage(objectName.sprite, objectName.x, objectName.y, objectName.w, objectName.h);
        } else {
            canvas.save();
            canvas.translate(objectName.x + objectName.w / 2, objectName.y + objectName.h / 2);
            canvas.rotate(radian);
            canvas.drawImage(objectName.sprite, 0, 0, objectName.w, objectName.h);
            canvas.restore();
        }
    }
}
