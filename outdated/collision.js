// Collision detection

function collision(objectOne, objectTwo) {
    if (objectTwo.length > 1) {
        for (var i = 0; i < objectTwo.length; i++) {
            if (objectOne.boundX < objectTwo[i].boundX + objectTwo[i].boundW && objectOne.boundX + objectOne.boundW > objectTwo[i].boundX &&
                objectOne.boundY < objectTwo[i].boundY + objectTwo[i].boundH && objectOne.boundY + objectOne.boundH > objectTwo[i].boundY) {
                return true;
            }
        }
    } else {
        if (objectOne.boundX < objectTwo.boundX + objectTwo.boundW && objectOne.boundX + objectOne.boundW > objectTwo.boundX &&
            objectOne.boundY < objectTwo.boundY + objectTwo.boundH && objectOne.boundY + objectOne.boundH > objectTwo.boundY) {
            return true;
        }
    }
}