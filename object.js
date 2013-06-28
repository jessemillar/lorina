// Object manipulation

function make(objectName, objectX, objectY, objectW, objectH, objectSprite, objectColor) {
    if (objectSprite) {
        var spriteReference = new Image(objectSprite);
        // spriteReference.src = objectSprite;
    }

    window[objectName] = {x: objectX, y: objectY, w: objectW * setup.scale, h: objectH * setup.scale, boundX: objectX, boundY: objectY, boundW: objectW * setup.scale, boundH: objectH * setup.scale, sprite: spriteReference, color: objectColor};
}

function bound(objectName, xBound, yBound, wBound, hBound) {
    window[objectName].boundX = window[objectName].x + xBound;
    window[objectName].boundY = window[objectName].y + yBound;
    window[objectName].boundW = wBound;
    window[objectName].boundH = hBound;
}

function move(objectName, moveDirection, moveSpeed) {
    if (moveDirection == "up") {
        objectName.y = objectName.y - moveSpeed;
        objectName.boundY = objectName.boundY - moveSpeed;
    } else if (moveDirection == "down") {
        objectName.y = objectName.y + moveSpeed;
        objectName.boundY = objectName.boundY + moveSpeed;
    } else if (moveDirection == "left") {
        objectName.x = objectName.x - moveSpeed;
        objectName.boundX = objectName.boundX - moveSpeed;
    } else if (moveDirection == "right") {
        objectName.x = objectName.x + moveSpeed;
        objectName.boundX = objectName.boundX + moveSpeed;
    }
}

function snap(objectName, destinationX, destinationY) {
    objectName.x = destinationX;
    objectName.boundX = destinationX;
    objectName.y = destinationY;
    objectName.boundY = destinationY;
}