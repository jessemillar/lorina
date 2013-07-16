// Draw controls

function clear() {
    rectangle(setup.x, setup.y, setup.w, setup.h, setup.color);
}

// Doesn't need start or end path declarations
function rectangle(drawX, drawY, drawW, drawH, drawColor) {
    ctx.fillStyle = drawColor;
    ctx.fillRect(drawX, drawY, drawW, drawH);
}

function startPath() {
    ctx.beginPath();
}

function endPath() {
    ctx.closePath();
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

function drawPath(fillColor, strokeColor, strokeWidth) {
    if (!fillColor) {
        fillColor = "rgba(0, 0, 0, 0.0000)";
    }
    if (!strokeColor) {
        strokeColor = "rgba(0, 0, 0, 0.0000)";
    }
    if (!strokeWidth) {
        strokeWidth = "rgba(0, 0, 0, 0.0000)";
    }
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
}

function draw(objectName, drawType) {
    if (objectName.length) {
        for (var i = 0; i < objectName.length; i++) {
            if (drawType == "box" || drawType == "b") {
                if (objectName[i].rotation == null || objectName[i].rotation == 0) {
                    rectangle(objectName[i].x, objectName[i].y, objectName[i].w, objectName[i].h, objectName[i].color);
                } else {
                    ctx.save();
                    ctx.translate(objectName[i].x + objectName[i].w / 2, objectName[i].y + objectName[i].h / 2);
                    ctx.rotate(objectName[i].rotation);
                    rectangle(0 - objectName[i].w / 2, 0 - objectName[i].h / 2, objectName[i].w, objectName[i].h, objectName[i].color);
                    ctx.restore();
                }
            } else if (drawType == "sprite" || drawType == "s") {
                if (!objectName.sprite) {
                    log("No loaded sprite for " + objectName[i].name);
                }
                if (objectName[i].rotation == null || objectName[i].rotation == 0) {
                    ctx.drawImage(objectName[i].sprite, objectName[i].x, objectName[i].y, objectName[i].w, objectName[i].h);
                } else {
                    ctx.save();
                    ctx.translate(objectName[i].x + objectName[i].w / 2, objectName[i].y + objectName[i].h / 2);
                    ctx.rotate(objectName[i].rotation);
                    ctx.drawImage(objectName[i].sprite, 0 - objectName[i].w / 2, 0 - objectName[i].h / 2, objectName[i].w, objectName[i].h);
                    ctx.restore();
                }
            }

        }
    } else if (drawType == "box" || drawType == "b") {
        if (objectName.rotation == null || objectName.rotation == 0) {
            rectangle(objectName.x, objectName.y, objectName.w, objectName.h, objectName.color);
        } else {
            ctx.save();
            ctx.translate(objectName.x + objectName.w / 2, objectName.y + objectName.h / 2);
            ctx.rotate(objectName.rotation);
            rectangle(0 - objectName.w / 2, 0 - objectName.h / 2, objectName.w, objectName.h, objectName.color);
            ctx.restore();
        }
    } else if (drawType == "sprite" || drawType == "s") {
        if (!objectName.sprite) {
            log("No loaded sprite for " + objectName.name);
        }
        if (objectName.rotation == null || objectName.rotation == 0) {
            ctx.drawImage(objectName.sprite, objectName.x, objectName.y, objectName.w, objectName.h);
        } else {
            ctx.save();
            ctx.translate(objectName.x + objectName.w / 2, objectName.y + objectName.h / 2);
            ctx.rotate(objectName.rotation);
            ctx.drawImage(objectName.sprite, 0 - objectName.w / 2, 0 - objectName.h / 2, objectName.w, objectName.h);
            ctx.restore();
        }
    }
}