// Draw controls

function clear() {
    canvas.fillStyle = setup.color;
    canvas.fillRect(setup.x, setup.y, setup.w, setup.h);
}

function startPath() {
    canvas.beginPath();
}

function endPath() {
    canvas.closePath();
}

function line(startX, startY, endX, endY) {
    canvas.moveTo(startX, startY);
    canvas.lineTo(startX + endX, startY + endY);
}

function arc(drawX, drawY, drawDiameter, startAngle, engAngle) {
    canvas.arc(drawX, drawY, drawDiameter / 2, degree(startAngle) + 1.5 * Math.PI, degree(engAngle) + 1.5 * Math.PI);
}

function rectangle(drawX, drawY, drawW, drawH) {
    canvas.fillRect(drawX, drawY, drawW, drawH);
}

function circle(drawX, drawY, drawDiameter) {
    canvas.arc(drawX + drawDiameter / 2, drawY + drawDiameter / 2, drawDiameter / 2, 0, 2 * Math.PI);
}

function curve(startX, startY, modifyX, modifyY, endX, endY) {
    canvas.moveTo(startX, startY);
    canvas.quadraticCurveTo(startX + modifyX, startY + modifyY, startX + endX, startY + endY);
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
    canvas.fillStyle = fillColor;
    canvas.fill();
    canvas.strokeStyle = strokeColor;
    canvas.lineWidth = strokeWidth;
    canvas.stroke();
}

function draw(objectName, drawType) {
    if (objectName.length > 1) {
        for (var i = 0; i < objectName.length; i++) {
            if (drawType == "box" || drawType == "b") {
                if (objectName[i].rotation == null || objectName[i].rotation == 0) {
                    canvas.fillStyle = objectName[i].color;
                    canvas.fillRect(objectName[i].x, objectName[i].y, objectName[i].w, objectName[i].h);
                } else {
                    canvas.save();
                    canvas.translate(objectName[i].x + objectName[i].w / 2, objectName[i].y + objectName[i].h / 2);
                    canvas.rotate(objectName[i].rotation);
                    canvas.fillStyle = objectName[i].color;
                    canvas.fillRect(0 - objectName[i].w / 2, 0 - objectName[i].h / 2, objectName[i].w, objectName[i].h);
                    canvas.restore();
                }
            } else if (drawType == "sprite" || drawType == "s") {
                if (objectName[i].rotation == null || objectName[i].rotation == 0) {
                    canvas.drawImage(objectName[i].sprite, objectName[i].x, objectName[i].y, objectName[i].w, objectName[i].h);
                } else {
                    canvas.save();
                    canvas.translate(objectName[i].x + objectName[i].w / 2, objectName[i].y + objectName[i].h / 2);
                    canvas.rotate(objectName[i].rotation);
                    canvas.drawImage(objectName[i].sprite, 0 - objectName[i].w / 2, 0 - objectName[i].h / 2, objectName[i].w, objectName[i].h);
                    canvas.restore();
                }
            }
        }
    } else if (drawType == "box" || drawType == "b") {
        if (objectName.rotation == null || objectName.rotation == 0) {
            canvas.fillStyle = objectName.color;
            canvas.fillRect(objectName.x, objectName.y, objectName.w, objectName.h);
        } else {
            canvas.save();
            canvas.translate(objectName.x + objectName.w / 2, objectName.y + objectName.h / 2);
            canvas.rotate(objectName.rotation);
            canvas.fillStyle = objectName.color;
            canvas.fillRect(0 - objectName.w / 2, 0 - objectName.h / 2, objectName.w, objectName.h);
            canvas.restore();
        }
    } else if (drawType == "sprite" || drawType == "s") {
        if (objectName.rotation == null || objectName.rotation == 0) {
            canvas.drawImage(objectName.sprite, objectName.x, objectName.y, objectName.w, objectName.h);
        } else {
            canvas.save();
            canvas.translate(objectName.x + objectName.w / 2, objectName.y + objectName.h / 2);
            canvas.rotate(objectName.rotation);
            canvas.drawImage(objectName.sprite, 0 - objectName.w / 2, 0 - objectName.h / 2, objectName.w, objectName.h);
            canvas.restore();
        }
    }
}