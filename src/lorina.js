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
	        sandbox: {
	            width: 1,
	            height: 1
	        }
	    }
	}
};

l.lorina = function() {
    var self = this;

    this.setRoomSize = function(width, height) {
        l.globals.room.width = width;
        l.globals.room.height = height;

        return this;
    };

    this.setDomSize = function(width, height) {
        l.globals.dom.width = width;
        l.globals.dom.height = height;

        return this;
    };

    this.setDomPosition = function(x, y) {
        l.globals.dom.style.position = 'absolute';
        l.globals.dom.style.left = x + 'px';
        l.globals.dom.style.top = y + 'px';

        return this;
    };

    this.setTitle = function(title) {
        document.title = title;

        return this;
    };

    this.scale = function(scale) {
        l.globals.ctx.imageSmoothingEnabled = false;
        l.globals.ctx.scale(scale / 100, scale / 100);

        return this;
    };

    this.makeFullscreen = function() {
        document.body.style.background = this.color; // Helps with some refresh problems caused by scaling the window

        window.onresize = function() {
            self.setFullscreen();
        };

        this.setFullscreen();

        return this;
    };

    this.setFullscreen = function() // Engine only
    {
        self.setDomPosition(0, 0);
        self.setDomSize(window.innerWidth, window.innerHeight);
        self.setRoomSize(l.globals.dom.width, l.globals.dom.height);
    };

    this.appendCanvas = function() {
        document.body.appendChild(l.globals.dom);
        l.globals.ctx = l.globals.dom.getContext('2d');
    };

    this.hideCursor = function() {
        l.globals.dom.style.cursor = 'none';

        return this;
    };

    this.setRoom = function(room) {
        l.globals.room.current = room;

        window.requestAnimationFrame(room);

        return this;
    };

    this.start = function(room) {
        this.setRoom(room);

        return this;
    };

    this.setColor = function(color) // I find that I don't use this very often
    {
        this.color = color;

        return this;
    };

    this.blank = function(color) {
        if (color) {
            l.globals.ctx.fillStyle = color;
        } else {
            l.globals.ctx.fillStyle = this.color;
        }

        l.globals.ctx.fillRect(0, 0, l.globals.dom.width, l.globals.dom.height);

        l.globals.zBuffer.length = 0; // Wipe the z-buffer for the next pass

        return this;
    };

    this.draw = function() {
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