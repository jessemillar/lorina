// Object manipulation

function make(objectName, objectX, objectY, objectW, objectH, objectSprite, objectColor) {
    if (objectSprite) {
        var spriteReference = new Image();
        spriteReference.src = objectSprite;
    }

    window[objectName] = {x: objectX, y: objectY, w: objectW * setup.scale, h: objectH * setup.scale, boundX: objectX, boundY: objectY, boundW: objectW * setup.scale, boundH: objectH * setup.scale, sprite: spriteReference, color: objectColor, rotation: 0};
}

function bound(objectName, xBound, yBound, wBound, hBound) {
    window[objectName].boundX = window[objectName].x + xBound;
    window[objectName].boundY = window[objectName].y + yBound;
    window[objectName].boundW = wBound;
    window[objectName].boundH = hBound;
}

function rotate(objectName, rotateDegree, rotateMode) {
    var radian = rotateDegree * Math.PI / 180;
    
    if (rotateMode == "relative" || rotateMode == "r") {
        objectName.rotation = objectName.rotation + radian;
    } else if (rotateMode == "absolute" || rotateMode == "a") {
        objectName.rotation = radian;
    }
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

function measure(objectA, objectB, desiredMeasure) {
    var distance = new Object();
    distance.x = Math.floor(Math.abs((objectA.x + objectA.w / 2) - (objectB.x + objectB.w / 2)));
    distance.y = Math.floor(Math.abs((objectA.y + objectA.h / 2) - (objectB.y + objectB.h / 2)));
    distance.total = Math.floor(Math.sqrt(distance.x * distance.x + distance.y * distance.y));
    
    if (desiredMeasure == "total" || desiredMeasure == "t") {
        if (isNaN(distance.total)) {
            return 0;
        } else {
            return distance.total;
        }
    } else if (desiredMeasure == "x") {
        if (isNaN(distance.x)) {
            return 0;
        } else {
            return distance.x;
        }
    } else if (desiredMeasure == "y") {
        if (isNaN(distance.y)) {
            return 0;
        } else {
            return distance.y;
        }
    }
}

function toward(objectA, objectB, moveSpeed) {
    var speed = new Object();
    speed.x = measure(objectA, objectB, 'x') / measure(objectA, objectB, 'total') * moveSpeed;
    speed.y = measure(objectA, objectB, 'y') / measure(objectA, objectB, 'total') * moveSpeed;
    
    if (measure(objectA, objectB, 'total') > 0) {
        if (objectA.x + objectA.w / 2 < objectB.x + objectB.w / 2) {
            move(objectA, 'right', speed.x);
        } else {
            move(objectA, 'left', speed.x);
        }
        
        if (objectA.y + objectA.h / 2 < objectB.y + objectB.h / 2) {
            move(objectA, 'down', speed.y);
        } else {
            move(objectA, 'up', speed.y);
        }
    }
}