Framework development rules:

Use full quotations ("...") for object names and single quotes ('...') for all other values.

!!! Why are quotations needed sporadically?
// Because they're needed when creating a variable but not when referencing one.

***

In a number of cases throughout this documentation, general syntax will be outlined and then an example will be given.  Further explanation will be given where necessary.

***

Start out by including Lorina in your Ejecta Xcode project:

	ejecta.include('engine/lorina.js');

Then set up your game canvas:

	setup(gameColor, pixelSmoothing);

	EG: setup(0, 0, 800, 600, "#ffffff", 60, 2);

Start by adding an object to the database:

	make(objectName, objectX, objectY, objectW, objectH, objectSprite, objectColor);

	EG: make("testObject", 20, 50, 30, 30, null, "#000000");

If you have an object that needs a custom bounding box--say, utilize the bound() command:

	bound(objectName, xBound, yBound, wBound, hBound);

Now that we have an object to work with, we can start a game loop.  Basic game flow controls are as follows:

	run();
	pause();

When it comes to changing the position of objects, Lorina presents two options: snap() and move().  Snap() is meant to, well, snap objects from one position to another. Think teleportation.

	snap(objectName, destinationX, destinationY);
	
	EG: snap("testObject", 30, 50);

On the other hand, move() involves a smooth animation.  This would work well for making a character "walk" across a screen.

	move(objectName, moveDirection, moveSpeed);

	EG: move("testObject", 'right', 5);

//

measure(objectA, objectB, desiredMeasure)

toward(objectA, objectB, moveSpeed)

degree(rotateDegree)

map(mapString, mapWidth, mapHeight, tileSize);

// Objects should be at least 3px by 3px to have proper collision detection.
collision(...)