function make(objectName, objectX, objectY, objectW, objectH, objectSprite, objectColor) {
    if (objectSprite) {
        var spriteReference = new Image();
        spriteReference.src = objectSprite;
                
        window[objectName] = {name: objectName, x: objectX, y: objectY, w: objectW, h: objectH, boundX: objectX, boundY: objectY, boundW: objectW, boundH: objectH, color: objectColor, rotation: 0};
                
        spriteReference.onload = function () {
            window[objectName].sprite = spriteReference;
        }
    } else {
        window[objectName] = {name: objectName, x: objectX, y: objectY, w: objectW, h: objectH, boundX: objectX, boundY: objectY, boundW: objectW, boundH: objectH, sprite: null, color: objectColor, rotation: 0};
    }
    
    if (objectName.boundW < 3 || objectName.boundH < 3) {
        log("Objects should be at least 3px by 3px to have proper collision detection");
    }
}

function bound(objectName, xBound, yBound, wBound, hBound) {
    objectName.boundX = objectName.x + xBound;
    objectName.boundY = objectName.y + yBound;
    objectName.boundW = wBound;
    objectName.boundH = hBound;
    
    if (objectName.boundW < 3 || objectName.boundH < 3) {
        log("Objects should be at least 3px by 3px to have proper collision detection");
    }
}

function degree(rotateDegree) {
    return rotateDegree * Math.PI / 180;
}

function move(objectName, moveDirection, moveSpeed) {
    if (objectName.length > 1) {
        for (var i = 0; i < objectName.length; i++) {
            if (moveDirection == 'up') {
                objectName[i].y = objectName[i].y - moveSpeed;
                objectName[i].boundY = objectName[i].boundY - moveSpeed;
            } else if (moveDirection == 'down') {
                objectName[i].y = objectName[i].y + moveSpeed;
                objectName[i].boundY = objectName[i].boundY + moveSpeed;
            } else if (moveDirection == 'left') {
                objectName[i].x = objectName[i].x - moveSpeed;
                objectName[i].boundX = objectName[i].boundX - moveSpeed;
            } else if (moveDirection == 'right') {
                objectName[i].x = objectName[i].x + moveSpeed;
                objectName[i].boundX = objectName[i].boundX + moveSpeed;
            }
        }
    } else {
        if (moveDirection == 'up') {
            objectName.y = objectName.y - moveSpeed;
            objectName.boundY = objectName.boundY - moveSpeed;
        } else if (moveDirection == 'down') {
            objectName.y = objectName.y + moveSpeed;
            objectName.boundY = objectName.boundY + moveSpeed;
        } else if (moveDirection == 'left') {
            objectName.x = objectName.x - moveSpeed;
            objectName.boundX = objectName.boundX - moveSpeed;
        } else if (moveDirection == 'right') {
            objectName.x = objectName.x + moveSpeed;
            objectName.boundX = objectName.boundX + moveSpeed;
        }
    }
}

function snap(objectName, destinationX, destinationY) {
    if (objectName.length > 1) {
        for (var i = 0; i < objectName.length; i++) {
            objectName[i].x = destinationX;
            objectName[i].boundX = destinationX;
            objectName[i].y = destinationY;
            objectName[i].boundY = destinationY;
        }
    } else {
        objectName.x = destinationX;
        objectName.boundX = destinationX;
        objectName.y = destinationY;
        objectName.boundY = destinationY;
    }
}

function measure(objectA, objectB, desiredMeasure) {
    var distanceX = Math.floor(Math.abs((objectA.x + objectA.w / 2) - (objectB.x + objectB.w / 2)));
    var distanceY = Math.floor(Math.abs((objectA.y + objectA.h / 2) - (objectB.y + objectB.h / 2)));
    var distanceTotal = Math.floor(Math.sqrt(distanceX * distanceX + distanceY * distanceY));
    
    if (desiredMeasure == 'total' || desiredMeasure == 't') {
        if (isNaN(distanceTotal)) {
            return 0;
        } else {
            return distanceTotal;
        }
    } else if (desiredMeasure == 'x') {
        if (isNaN(distanceX)) {
            return 0;
        } else {
            return distanceX;
        }
    } else if (desiredMeasure == 'y') {
        if (isNaN(distanceY)) {
            return 0;
        } else {
            return distanceY;
        }
    }
}

function toward(objectA, objectB, moveSpeed) {
    if (objectA.length > 1) {
        for (var i = 0; i < objectA.length; i++) {
            var speedX = measure(objectA[i], objectB, 'x') / measure(objectA[i], objectB, 'total') * moveSpeed;
            var speedY = measure(objectA[i], objectB, 'y') / measure(objectA[i], objectB, 'total') * moveSpeed;
            
            if (measure(objectA[i], objectB, 'total') > 0) {
                if (objectA[i].x + objectA[i].w / 2 < objectB.x + objectB.w / 2) {
                    move(objectA[i], 'right', speedX);
                } else {
                    move(objectA[i], 'left', speedX);
                }
                
                if (objectA[i].y + objectA[i].h / 2 < objectB.y + objectB.h / 2) {
                    move(objectA[i], 'down', speedY);
                } else {
                    move(objectA[i], 'up', speedY);
                }
            }
        }
    } else {
        var speedX = measure(objectA, objectB, 'x') / measure(objectA, objectB, 'total') * moveSpeed;
        var speedY = measure(objectA, objectB, 'y') / measure(objectA, objectB, 'total') * moveSpeed;
        
        if (measure(objectA, objectB, 'total') > 0) {
            if (objectA.x + objectA.w / 2 < objectB.x + objectB.w / 2) {
                move(objectA, 'right', speedX);
            } else {
                move(objectA, 'left', speedX);
            }
            
            if (objectA.y + objectA.h / 2 < objectB.y + objectB.h / 2) {
                move(objectA, 'down', speedY);
            } else {
                move(objectA, 'up', speedY);
            }
        }
    }
}