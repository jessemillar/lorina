function clear() {
    if (typeof zIndex === 'undefined') {
        zIndex = new Array();
    }
    zIndex.length = 0;
    rectangle(camera.x, camera.y, camera.width, camera.height, camera.color);
}

// Doesn't need start or end path declarations
function rectangle(drawX, drawY, drawW, drawH, drawColor) {
    ctx.fillStyle = drawColor;
    ctx.fillRect(drawX, drawY, drawW, drawH);
}

// End the path with the drawPath() command
function startPath() {
    ctx.beginPath();
}

function line(startX, startY, endX, endY) {
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX + endX, startY + endY);
}

function arc(drawX, drawY, drawDiameter, startAngle, engAngle) {
    ctx.arc(drawX, drawY, drawDiameter / 2, degree(startAngle) + 1.5 * Math.PI, degree(engAngle) + 1.5 * Math.PI);
}

function circle(drawX, drawY, drawDiameter) {
    ctx.arc(drawX + drawDiameter / 2, drawY + drawDiameter / 2, drawDiameter / 2, 0, 2 * Math.PI);
}

function curve(startX, startY, modifyX, modifyY, endX, endY) {
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(startX + modifyX, startY + modifyY, startX + endX, startY + endY);
}

function opacity(desiredOpacity) {
    ctx.globalAlpha = desiredOpacity;
}

function drawPath(fillColor, strokeColor, strokeWidth, objectOpacity) {
    if (!fillColor) {
        fillColor = 'rgba(0, 0, 0, 0)';
    }
    if (!strokeColor) {
        strokeColor = 'rgba(0, 0, 0, 0)';
    }
    ctx.closePath();
    opacity(objectOpacity);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
}

function animate(objectName, animationSpeed) {
    if(objectName.animating == null){
        objectName.animating = setInterval(function() { if (objectName.frame < objectName.frameCount) { objectName.frame++; } else { objectName.frame = 1; } }, animationSpeed);
    };
    drawToScreen(objectName);
}

function buffer(objectName, animationSpeed) {
    // If animationSpeed is a valid number, make an animation timer
    if (animationSpeed) {
        if(objectName.animating == null){
            objectName.animating = setInterval(function() { if (objectName.frame < objectName.frameCount) { objectName.frame++; } else { objectName.frame = 1; } }, animationSpeed);
        };
    }
    
    // If we're dealing with a group, loop through the group and add each item to the zIndex array
    if (objectName.length) {
        for (var i = 0; i < objectName.length; i++) {
            zIndex.push(objectName[i]);
        }
    } else {
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
    if (objectName.drawType == "box") {
        if (objectName.rotation == null || objectName.rotation == 0) {
            rectangle(objectName.x, objectName.y, objectName.w, objectName.h, objectName.color);
        } else {
            ctx.save();
            ctx.translate(objectName.x + objectName.w / 2, objectName.y + objectName.h / 2);
            ctx.rotate(objectName.rotation);
            rectangle(0 - objectName.w / 2, 0 - objectName.h / 2, objectName.w, objectName.h, objectName.color);
            ctx.restore();
        }
    } else if (objectName.drawType == "sprite") {
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
}