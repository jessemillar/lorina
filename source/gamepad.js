var Gamepad = function()
{
    this.deadzone = 0

    this.update = function()
    {
        l.gamepads = navigator.webkitGetGamepads()

        var i = l.gamepads[0]
        if (i)
        {
            this.p1 = {buttons: {playstation: i.buttons[16], x: i.buttons[0], circle: i.buttons[1], square: i.buttons[2], triangle: i.buttons[3], l1: i.buttons[4], l2: i.buttons[6], r1: i.buttons[5], r2: i.buttons[7], select: i.buttons[8], start: i.buttons[9], up: i.buttons[12], down: i.buttons[13]}, left: i.buttons[14], right: i.buttons[15], joysticks: {left: {horizontal: i.axes[0], vertical: i.axes[1], button: i.buttons[10]}, right: {horizontal: i.axes[2], vertical: i.axes[3], button: i.buttons[11]}}}
        }

        var i = l.gamepads[1]
        if (i)
        {
            this.p2 = {buttons: {playstation: i.buttons[16], x: i.buttons[0], circle: i.buttons[1], square: i.buttons[2], triangle: i.buttons[3], l1: i.buttons[4], l2: i.buttons[6], r1: i.buttons[5], r2: i.buttons[7], select: i.buttons[8], start: i.buttons[9], up: i.buttons[12], down: i.buttons[13]}, left: i.buttons[14], right: i.buttons[15], joysticks: {left: {horizontal: i.axes[0], vertical: i.axes[1], button: i.buttons[10]}, right: {horizontal: i.axes[2], vertical: i.axes[3], button: i.buttons[11]}}}
        }

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

                if (this.p2)
                {
                    if (Math.abs(gamepads.p2.joysticks.left.horizontal) < this.deadzone)
                    {
                        gamepads.p2.joysticks.left.horizontal = 0
                    }

                    if (Math.abs(gamepads.p2.joysticks.left.vertical) < this.deadzone)
                    {
                        gamepads.p2.joysticks.left.vertical = 0
                    }

                    if (Math.abs(gamepads.p2.joysticks.right.horizontal) < this.deadzone)
                    {
                        gamepads.p2.joysticks.right.horizontal = 0
                    }

                    if (Math.abs(gamepads.p2.joysticks.right.vertical) < this.deadzone)
                    {
                        gamepads.p2.joysticks.right.vertical = 0
                    }
                }
            }
        }
}