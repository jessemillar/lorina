var gravity = 0.25;
var jetpackPower = 0.6;
var horizontalMovement = jetpackPower / 3;
var friction = 0.1;

var lorina = new l.lorina();
lorina.setTitle('Jetpackin\'')
    .setColor('#111111')
    .scale(300) // This is in percent
    .makeFullscreen()
    .appendCanvas();

var keyboard = new l.keyboard();

var foxy = new l.entity();
foxy.setSprite('images/foxy.png', true, true, 2, 50)
    .setPosition(20, 20)
    .setAnchor(12, 12)
    .setFriction(friction);

var main = function() {
    if (keyboard.w) {
        foxy.pushVertical(-jetpackPower);
    }

    if (keyboard.a) {
        foxy.unflip().pushHorizontal(-horizontalMovement);
    } else if (keyboard.d) {
        foxy.flip('horizontal').pushHorizontal(horizontalMovement);
    }

    if (foxy.anchor.y < l.globals.room.height - 12) { // Ghetto gravity
        foxy.pushVertical(gravity);
    }

    foxy.bounce().applyPhysics();

    lorina.blank();
    foxy.buffer();//.debug()
    lorina.draw();
};

lorina.start(main);
