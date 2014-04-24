var Gamepad = function()
{
    this.deadzone = 0

    this.update = function()
    {
        l.gamepads = navigator.webkitGetGamepads()

        this.p1 = {buttons: {playstation: l.gamepads[0].buttons[16], x: l.gamepads[0].buttons[0], circle: l.gamepads[0].buttons[1], square: l.gamepads[0].buttons[2], triangle: l.gamepads[0].buttons[3], l1: l.gamepads[0].buttons[4], l2: l.gamepads[0].buttons[6], r1: l.gamepads[0].buttons[5], r2: l.gamepads[0].buttons[7], select: l.gamepads[0].buttons[8], start: l.gamepads[0].buttons[9], up: l.gamepads[0].buttons[12], down: l.gamepads[0].buttons[13]}, left: l.gamepads[0].buttons[14], right: l.gamepads[0].buttons[15], joysticks: {left: {horizontal: l.gamepads[0].axes[0], vertical: l.gamepads[0].axes[1], button: l.gamepads[0].buttons[10]}, right: {horizontal: l.gamepads[0].axes[2], vertical: l.gamepads[0].axes[3], button: l.gamepads[0].buttons[11]}}}

        this.applyDeadzone()

        return this
    }

    this.setDeadzone = function(deadzone)
    {
        this.deadzone = deadzone

        return this
    }

        this.applyDeadzone = function()
        {
            if (this.deadzone > 0)
            {
                if (this.p1)
                {
                    if (Math.abs(gamepads.p1.joysticks.left.horizontal) < this.deadzone)
                    {
                        gamepads.p1.joysticks.left.horizontal = 0
                    }

                    if (Math.abs(gamepads.p1.joysticks.left.vertical) < this.deadzone)
                    {
                        gamepads.p1.joysticks.left.vertical = 0
                    }

                    if (Math.abs(gamepads.p1.joysticks.right.horizontal) < this.deadzone)
                    {
                        gamepads.p1.joysticks.right.horizontal = 0
                    }

                    if (Math.abs(gamepads.p1.joysticks.right.vertical) < this.deadzone)
                    {
                        gamepads.p1.joysticks.right.vertical = 0
                    }
                }
            }
        }
}