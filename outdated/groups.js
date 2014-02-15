function makeGroup(groupName) {
    window[groupName] = new Array();
}

function addToGroup(objectName, groupName) {
    if (groupName.indexOf(objectName) == -1) {
        groupName.push(objectName);
    }
}

function removeFromGroup(groupName, objectName) {
    groupName.splice(groupName.indexOf(objectName), 1);
}