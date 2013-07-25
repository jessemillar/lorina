function clear() {
    // Create the zIndex database if it doesn't already exist
    if (typeof zIndex === 'undefined') {
        zIndex = new Array();
    }
    // Clear the database
    zIndex.length = 0;
    // Draw a rectangle over the current screen
    ctx.fillStyle = camera.color;
    ctx.fillRect(camera.x, camera.y, camera.width, camera.height);
}

function opacity(desiredOpacity) {
    ctx.globalAlpha = desiredOpacity;
}

function buffer(objectName, animationSpeed) {
    // If we're dealing with a group, loop through the group and add each item to the zIndex array
    if (objectName.length) {
        for (var i = 0; i < objectName.length; i++) {
            for (var i = 0; i < objectName.length; i++) {
                if (animationSpeed) {
                    if (objectName[i].animating == null) {
                        setAnimatingWithInterval(i);
                    }
                }
                zIndex.push(objectName[i]);
            }
            
            function setAnimatingWithInterval(n) {
                objectName[n].animating = setInterval(function() {
                                                            if (objectName[n].frame < objectName[n].frameCount) {
                                                                objectName[n].frame++; 
                                                            } else {
                                                                objectName[n].frame = 1; 
                                                            }
                                                        }, animationSpeed);
            }
        }
    } else {
        if (animationSpeed) {
            if (objectName.animating == null) {
                objectName.animating = setInterval(function() { if (objectName.frame < objectName.frameCount) { objectName.frame++; } else { objectName.frame = 1; } }, animationSpeed);
            };
        }
        zIndex.push(objectName);
    }
}

function draw() {
    zIndex.sort(function(a, b){
        return a.z - b.z;
    });
    
    for(var i = 0; i < zIndex.length; i++) {
        drawToScreen(zIndex[i]);
    }
}

function drawToScreen(objectName) {
    if (!objectName.sprite) {
        log("No loaded sprite for " + objectName.name);
    }
    if (objectName.rotation == null || objectName.rotation == 0) {
        ctx.drawImage(objectName.sprite, (objectName.frame - 1) * objectName.w, 0, objectName.w, objectName.h, objectName.x, objectName.y, objectName.w, objectName.h);
    } else {
        ctx.save();
        ctx.translate(objectName.x + objectName.w / 2, objectName.y + objectName.h / 2);
        ctx.rotate(objectName.rotation);
        ctx.drawImage(objectName.sprite, (objectName.frame - 1) * objectName.w, 0, objectName.w, objectName.h, 0 - objectName.w / 2, 0 - objectName.h / 2, objectName.w, objectName.h);
        ctx.restore();
    }
}