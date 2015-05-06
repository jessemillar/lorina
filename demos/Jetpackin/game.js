var jetpackPower = 0.5,
    horizontalMovement = jetpackPower / 3,
    firePower = 12,
    gravity = jetpackPower / 2,
    friction = jetpackPower / 6;

var facingDirection = 'right',
    canShoot = true,
    reloadTime = 250;

var lorina = new l.lorina();
lorina.setTitle('Jetpackin\'')
    .setColor('#111111')
    .scale(500) // This is in percent
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
        facingDirection = 'right';
        foxy.flip('horizontal').pushHorizontal(-horizontalMovement);
    } else if (keyboard.d) {
        facingDirection = 'left';
        foxy.unflip().pushHorizontal(horizontalMovement);
    }

    if (keyboard.space) {
        if (canShoot) {
            canShoot = false;

            setTimeout(function() {
                canShoot = true;
            }, reloadTime);

            var plunger = new l.entity();
            plunger.setSprite('images/plunger.png', true, true)
                .setPosition(foxy.x, foxy.y - 2)
                .setAnchor(4, 4)
                .setFriction(friction)
                .setGravity(gravity);

            if (facingDirection == 'right') {
                plunger.pushHorizontal(-firePower);
            } else {
                plunger.pushHorizontal(firePower);
            }

            plungers.add(plunger);
        }
    }

    foxy.contain().applyPhysics();

    lorina.blank();
    foxy.buffer();//.debug();
    plungers.steer().contain().applyPhysics().buffer().banish();
    lorina.draw();
};

lorina.start(main);
