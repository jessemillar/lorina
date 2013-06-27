function distanceFrom(objectA, objectB) {
    var distance = new Object();
    distance.x = Math.abs((objectA.x + objectA.w / 2) - (objectB.x + objectB.w / 2));
    distance.y = Math.abs((objectA.y + objectA.h / 2) - (objectB.y + objectB.h / 2));
    
    return Math.floor(Math.sqrt(distance.x * distance.x + distance.y * distance.y));
}