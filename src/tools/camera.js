l.camera = function() {
    this.reset = function() {
        l.globals.camera.x = 0;
        l.globals.camera.y = 0;

        return this;
    };

    this.setSandbox = function(width, height) {
        l.globals.camera.sandbox.width = width;
        l.globals.camera.sandbox.height = height;

        if (l.globals.camera.sandbox.width <= 0) {
            l.globals.camera.sandbox.width = 1;
        }

        if (l.globals.camera.sandbox.height <= 0) {
            l.globals.camera.sandbox.height = 1;
        }

        return this;
    };

    this.follow = function(a, b) {
    	var xFocus,
    		yFocus;

        if (!a.deleted) {
            if (b && !b.deleted) {
                if (a.x < b.x) {
                    xFocus = (b.x - a.x) / 2 + a.x;
                } else {
                    xFocus = (a.x - b.x) / 2 + b.x;
                }

                if (a.y < b.y) {
                    yFocus = (b.y - a.y) / 2 + a.y;
                } else {
                    yFocus = (a.y - b.y) / 2 + b.y;
                }
            } else {
                xFocus = a.x;
                yFocus = a.y;
            }

            if (l.globals.camera.state == 'resting') {
                if (l.globals.camera.sandbox.width) {
                    if (xFocus < l.globals.camera.x + l.globals.dom.width / 2 - l.globals.camera.sandbox.width / 2) {
                        l.globals.camera.x = xFocus - l.globals.dom.width / 2 + l.globals.camera.sandbox.width / 2;
                    } else if (xFocus > l.globals.camera.x + l.globals.dom.width / 2 + l.globals.camera.sandbox.width / 2) {
                        l.globals.camera.x = xFocus - l.globals.dom.width / 2 - l.globals.camera.sandbox.width / 2;
                    }
                }

                if (l.globals.camera.sandbox.height) {
                    if (yFocus < l.globals.camera.y + l.globals.dom.height / 2 - l.globals.camera.sandbox.height / 2) {
                        l.globals.camera.y = yFocus - l.globals.dom.height / 2 + l.globals.camera.sandbox.height / 2;
                    } else if (yFocus > l.globals.camera.y + l.globals.dom.height / 2 + l.globals.camera.sandbox.height / 2) {
                        l.globals.camera.y = yFocus - l.globals.dom.height / 2 - l.globals.camera.sandbox.height / 2;
                    }
                }

                if (l.globals.camera.x < 0) {
                    l.globals.camera.x = 0;
                } else if (l.globals.camera.x > l.globals.room.width - l.globals.dom.width) {
                    l.globals.camera.x = l.globals.room.width - l.globals.dom.width;
                }

                if (l.globals.camera.y < 0) {
                    l.globals.camera.y = 0;
                } else if (l.globals.camera.y > l.globals.room.height - l.globals.dom.height) {
                    l.globals.camera.y = l.globals.room.height - l.globals.dom.height;
                }
            }
        }

        return this;
    };

    this.focusOn = function(a, b) { // Kinda redundant since this is a copy/paste of code above, but I'm too lazy to fix it right now
    	var xFocus,
    		yFocus;

        if (b && !b.deleted) {
            if (a.x < b.x) {
                xFocus = (b.x - a.x) / 2 + a.x;
            } else {
                xFocus = (a.x - b.x) / 2 + b.x;
            }

            if (a.y < b.y) {
                yFocus = (b.y - a.y) / 2 + a.y;
            } else {
                yFocus = (a.y - b.y) / 2 + b.y;
            }
        } else {
            xFocus = a.x;
            yFocus = a.y;
        }

        l.globals.camera.x = xFocus - l.globals.dom.width / 2;
        l.globals.camera.y = yFocus - l.globals.dom.height / 2;

        if (l.mouse) {
            l.mouse.calculate();
        }

        return this;
    };

    this.shake = function(shakes, severity, duration) {
        if (l.globals.camera.state == 'resting') {
            l.globals.camera.previous.x = l.globals.camera.x;
            l.globals.camera.previous.y = l.globals.camera.y;
        }

        l.globals.camera.state = 'shaking';

        var self = this;

        var timing = duration / (shakes * 2);

        for (var i = 0; i < shakes * 2; i++) {
            self.milkshake(i, timing, severity);
        }

        return this;
    };

    this.milkshake = function(i, timing, severity) // Tehe.  I'm so clever.
    {
        setTimeout(function() {
            l.globals.camera.state = 'shaking';

            var min = 0 - severity / 2;
            var max = severity / 2;

            var xShake = Math.random() * (max - min) + min;
            var yShake = Math.random() * (max - min) + min;

            if (xShake > 0) {
                l.globals.camera.x += xShake;
            } else {
                l.globals.camera.x -= Math.abs(xShake);
            }

            if (yShake > 0) {
                l.globals.camera.y += yShake;
            } else {
                l.globals.camera.y -= Math.abs(yShake);
            }
        }, i * timing);

        setTimeout(function() {
            l.globals.camera.state = 'resting';

            l.globals.camera.x = l.globals.camera.previous.x;
            l.globals.camera.y = l.globals.camera.previous.y;
        }, i * timing + timing / 2);
    };
};