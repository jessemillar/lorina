// Object manipulation

function makeObject(objectName, objectX, objectY, objectW, objectH, objectSprite, objectFrameCount) {
    var spriteReference = new Image();
    spriteReference.src = objectSprite;
    
    window[objectName] = {x: objectX, y: objectY, w: objectW, h: objectH, boundX: objectX, boundY: objectY, boundW: objectW, boundH: objectH, sprite: spriteReference};
}

function setBound(objectName, xBound, yBound, wBound, hBound) {
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

function snapObject(objectName, destinationX, destinationY) {
    objectName.x = destinationX;
    objectName.boundX = destinationX;
    objectName.y = destinationY;
    objectName.boundY = destinationY;
}