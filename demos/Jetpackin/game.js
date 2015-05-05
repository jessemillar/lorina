var gravity = 0.25;
var jetpackPower = 0.6;
var horizontalMovement = jetpackPower / 3;
var friction = 0.1;
var firePower = 10;

var lorina = new l.lorina();
lorina.setTitle('Jetpackin\'')
    .setColor('#111111')
    .scale(300) // This is in percent
    .makeFullscreen()
    .appendCanvas();

var keyboard = new l.keyboard();

var foxy = new l.entity();
foxy.setSprite('images/foxy.png', true, true, 2, 75)
    .setPosition(20, 20)
    .setAnchor(12, 12)
    .setFriction(friction)
    .setGravity(gravity);

var plungers = new l.group();

var main = function() {
    if (keyboard.w) {
        foxy.pushVertical(-jetpackPower);
    }

    if (keyboard.a) {
        foxy.flip('horizontal').pushHorizontal(-horizontalMovement);
    } else if (keyboard.d) {
        foxy.unflip().pushHorizontal(horizontalMovement);
    }

    if (keyboard.space) {
        var plunger = new l.entity();
        plunger.setSprite('images/plunger.png', true, true)
            .setPosition(foxy.x, foxy.y - 2)
            .setAnchor(4, 4)
            .setFriction(friction)
            .pushHorizontal(firePower)
            .setGravity(gravity);
        plungers.add(plunger);
    }

    foxy.bounce().applyPhysics();

    lorina.blank();
    foxy.buffer(); //.debug()
    plungers.steer().bounce().applyPhysics().buffer().banish();
    lorina.draw();
};

lorina.start(main);
