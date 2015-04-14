l.gamepad = function() {
    this.deadzone = 0;

    this.update = function() {
        var gamepad;
        l.globals.gamepads = navigator.webkitGetGamepads();

        gamepad = l.globals.gamepads[0];
        if (gamepad) {
            this.p1 = {
                buttons: {
                    playstation: gamepad.buttons[16],
                    x: gamepad.buttons[0],
                    circle: gamepad.buttons[1],
                    square: gamepad.buttons[2],
                    triangle: gamepad.buttons[3],
                    l1: gamepad.buttons[4],
                    l2: gamepad.buttons[6],
                    r1: gamepad.buttons[5],
                    r2: gamepad.buttons[7],
                    select: gamepad.buttons[8],
                    start: gamepad.buttons[9],
                    up: gamepad.buttons[12],
                    down: gamepad.buttons[13]
                },
                left: gamepad.buttons[14],
                right: gamepad.buttons[15],
                joysticks: {
                    left: {
                        horizontal: gamepad.axes[0],
                        vertical: gamepad.axes[1],
                        button: gamepad.buttons[10]
                    },
                    right: {
                        horizontal: gamepad.axes[2],
                        vertical: gamepad.axes[3],
                        button: gamepad.buttons[11]
                    }
                }
            };
        }

        gamepad = l.globals.gamepads[1];
        if (gamepad) {
            this.p2 = {
                buttons: {
                    playstation: gamepad.buttons[16],
                    x: gamepad.buttons[0],
                    circle: gamepad.buttons[1],
                    square: gamepad.buttons[2],
                    triangle: gamepad.buttons[3],
                    l1: gamepad.buttons[4],
                    l2: gamepad.buttons[6],
                    r1: gamepad.buttons[5],
                    r2: gamepad.buttons[7],
                    select: gamepad.buttons[8],
                    start: gamepad.buttons[9],
                    up: gamepad.buttons[12],
                    down: gamepad.buttons[13]
                },
                left: gamepad.buttons[14],
                right: gamepad.buttons[15],
                joysticks: {
                    left: {
                        horizontal: gamepad.axes[0],
                        vertical: gamepad.axes[1],
                        button: gamepad.buttons[10]
                    },
                    right: {
                        horizontal: gamepad.axes[2],
                        vertical: gamepad.axes[3],
                        button: gamepad.buttons[11]
                    }
                }
            };
        }

        this.applyDeadzone();

        return this;
    };

    this.setDeadzone = function(deadzone) {
        this.deadzone = deadzone;

        return this;
    };

    this.applyDeadzone = function() {
        if (this.deadzone > 0) {
            if (this.p1) {
                if (Math.abs(gamepads.p1.joysticks.left.horizontal) < this.deadzone) {
                    gamepads.p1.joysticks.left.horizontal = 0;
                }

                if (Math.abs(gamepads.p1.joysticks.left.vertical) < this.deadzone) {
                    gamepads.p1.joysticks.left.vertical = 0;
                }

                if (Math.abs(gamepads.p1.joysticks.right.horizontal) < this.deadzone) {
                    gamepads.p1.joysticks.right.horizontal = 0;
                }

                if (Math.abs(gamepads.p1.joysticks.right.vertical) < this.deadzone) {
                    gamepads.p1.joysticks.right.vertical = 0;
                }
            }

            if (this.p2) {
                if (Math.abs(gamepads.p2.joysticks.left.horizontal) < this.deadzone) {
                    gamepads.p2.joysticks.left.horizontal = 0;
                }

                if (Math.abs(gamepads.p2.joysticks.left.vertical) < this.deadzone) {
                    gamepads.p2.joysticks.left.vertical = 0;
                }

                if (Math.abs(gamepads.p2.joysticks.right.horizontal) < this.deadzone) {
                    gamepads.p2.joysticks.right.horizontal = 0;
                }

                if (Math.abs(gamepads.p2.joysticks.right.vertical) < this.deadzone) {
                    gamepads.p2.joysticks.right.vertical = 0;
                }
            }
        }
    };
};