function makeGroup(groupName) {
    window[groupname] = new Array();
}

function addToGroup(groupName, objectName) {
    if (!window[groupName].indexOf(objectName)) {
        window[groupName].unshift(objectName);
    }
}

function removeFromGroup(groupName, objectName) {
    window[groupName].splice(window[groupName].indexOf(objectName), 1);
}