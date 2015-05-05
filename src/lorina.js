var l = {
	globals: {
		dom: document.createElement('canvas'),
	    room: {},
	    zBuffer: [], // For z-sorting
	    camera: {
	        state: 'resting',
	        x: 0,
	        y: 0,
	        previous: {
	            x: 0,
	            y: 0
	        },
	        sandbox: { // The amount of distance the tracked entity can move before the camera reacts
	            width: 1,
	            height: 1
	        }
	    }
	}
};

l.lorina = function() {
    var self = this;

    this.setRoomSize = function(width, height) { // Set the size of the level (can be bigger or smaller than the canvas)
        l.globals.room.width = width;
        l.globals.room.height = height;

        return this;
    };

    this.setDomSize = function(width, height) { // Set the size of the canvas (this is the same as saying <canvas width="width" height="height"></canvas> in HTML)
        l.globals.dom.width = width;
        l.globals.dom.height = height;

        return this;
    };

    this.setDomSizeCSS = function(width, height) { // Set the width and height of the canvas in CSS (as if we were resizing a div with an external CSS file)
        l.globals.dom.style.width = width;
        l.globals.dom.style.height = height;

        return this;
    };

    this.setDomPosition = function(x, y) { // Set the position of the canvas DOM
        l.globals.dom.style.position = 'absolute';
        l.globals.dom.style.left = x + 'px';
        l.globals.dom.style.top = y + 'px';

        return this;
    };

    this.setTitle = function(title) { // Set the window title
        document.title = title;

        return this;
    };

    this.scale = function(scale) { // Change the scale of the canvas (good for pixel art games)
        l.globals.dom.style['image-rendering'] = 'pixelated'; // Disable image smoothing in Chromium browsers

        this.scale = scale;

        return this;
    };

    this.makeFullscreen = function() { // Make the canvas fullscreen and have it scale when we resize the window
        document.body.style.background = this.color; // Helps with some refresh problems caused by scaling the window

        window.onresize = function() { // Adapt when we resize the browser window
            self.setFullscreen();
        };

        this.setFullscreen();

        return this;
    };

    this.setFullscreen = function() // We broke this into another function so we could call it when the window resizes
    {
        self.setDomPosition(0, 0);
        self.setDomSize(window.innerWidth / (this.scale / 100), window.innerHeight / (this.scale / 100));
        self.setDomSizeCSS('100%', '100%');
        self.setRoomSize(l.globals.dom.width, l.globals.dom.height); // Make the room the size of the canvas
    };

    this.appendCanvas = function() { // Add the canvas we've created in code to the browser's DOM and gain access to the canvas context (ctx) for drawing
        document.body.appendChild(l.globals.dom);
        l.globals.ctx = l.globals.dom.getContext('2d');
    };

    this.hideCursor = function() { // Don't show the cursor when it's over the canvas
        l.globals.dom.style.cursor = 'none';

        return this;
    };

    this.setRoom = function(room) { // Tell Lorina which level to load
        l.globals.room.current = room;

        window.requestAnimationFrame(room);

        return this;
    };

    this.start = function(room) { // Start the game loop
        this.setRoom(room);

        return this;
    };

    this.setColor = function(color) // Set the clear color (the color the canvas is wiped to between draws) and the HTML background
    {
        this.color = color;

        return this;
    };

    this.blank = function(color) { // Blank the canvas to start a new draw
        if (color) {
            l.globals.ctx.fillStyle = color;
        } else {
            l.globals.ctx.fillStyle = this.color;
        }

        l.globals.ctx.fillRect(0, 0, l.globals.dom.width, l.globals.dom.height);

        l.globals.zBuffer.length = 0; // Wipe the z-buffer for the next pass

        return this;
    };

    this.draw = function() { // Draw everything we've thrown into the "buffer" (good for drawing groups of entities)
        l.globals.zBuffer.sort(function(a, b) {
            return a.y - b.y;
        });

        for (var i = 0; i < l.globals.zBuffer.length; i++) {
            l.globals.zBuffer[i].draw();
        }

        window.requestAnimationFrame(l.globals.room.current);

        return this;
    };
};
