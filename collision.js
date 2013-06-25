// Collision detection

function collision(objectOne, objectTwo) {
	if (objectOne.boundX < objectTwo.boundX + objectTwo.boundW && objectOne.boundX + objectOne.boundW > objectTwo.boundX &&
        objectOne.boundY < objectTwo.boundY + objectTwo.boundH && objectOne.boundY + objectOne.boundH > objectTwo.boundY) {
		return true;
	} else {
        return false;
    }
}