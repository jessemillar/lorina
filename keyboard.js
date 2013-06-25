// Keyboard input

keyPressed = {up: null, down: null, left: null, right: null};

function enableKeyboardInput() {
    // Watch key presses
    window.onkeydown = function(event) {
		if (event.keyCode == 37) {
            event.preventDefault();
			keyPressed.left = true;
		}
        if (event.keyCode == 38) {
            event.preventDefault();
			keyPressed.up = true;
		}
        if (event.keyCode == 39) {
            event.preventDefault();
			keyPressed.right = true;
		}
        if (event.keyCode == 40) {
            event.preventDefault();
			keyPressed.down = true;
		}
	}
    
    // Watch key releases
	window.onkeyup = function(event) {
		if (event.keyCode == 37) {
			keyPressed.left = null;
		}
        if (event.keyCode == 38) {
			keyPressed.up = null;
		}
        if (event.keyCode == 39) {
			keyPressed.right = null;
		}
        if (event.keyCode == 40) {
			keyPressed.down = null;
		}
	}
}