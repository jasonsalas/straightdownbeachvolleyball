Ball = function() {
	this.x = 0;
	this.y = 0;
	this.vx = 1;	// horizontal velocity
	this.vy = 1; 	// vertical velocity
	this.radius = 25;
	this.speed = 2;
	this.gravity = 1;
	this.color = '#cccccc';
};

Ball.prototype.setPosition = function(x,y) {
	this.x = x;
	this.y = y;
};

Ball.prototype.setVelocity = function(yx, vy) {
	this.vx = vx;
	this.vy = vy;
};

Ball.prototype.draw = function(context) {
	context.fillStyle = this.color;
	context.beginPath();
		context.arc(this.x + this.vx, this.y, this.radius, 0, Math.PI*2, true);
	context.closePath();
	context.fill();
};

Ball.prototype.detectCollision = function() {
	/* applies to hits, serves, blocks, digs */
	
};	
/*
	TODO:
	------------
	1. should this be drawn pixels or an image?
	2. all colission detection handled in the web client, NOT in this library
*/