var URL_BASE = "images/";

var sprites = new Image();
sprites.src = URL_BASE + "spritesheet.png";

// frame-swapping indexes - zero-based!
var totalFrames = 1, currentFrame = 0, animationInterval = 0, widthHeight = 100;

Player = function() {
	this.graphicOffsets = { "x":0, "y":200 };	// defaults to the 'standing' graphic
	this.x = 0;
	this.y = 0;
	this.jumpStartLocation = 0;
	this.jumpSpeed = 0;
	this.fallSpeed = 0;	
	this.isJumping = false;
	this.isFalling = false;
	this.isRunning = false;
};

Player.prototype.jump = function() {
	if(!this.isJumping && !this.isFalling) {
		this.isJumping = true;
		this.jumpSpeed = 15;
		this.fallSpeed = 0;
		this.graphicOffsets = { "x":0, "y":100 };
		this.jumpStartLocation = this.y;
	}
};

Player.prototype.updateJumpState = function() {
	this.y = this.y - this.jumpSpeed;
	this.jumpSpeed--;	// simulate gravity
	if(this.jumpSpeed === 0) {
		// begin descent
		this.isJumping = false;
		this.isFalling = true;
		this.fallSpeed = 1;
		this.graphicOffsets = { "x":100, "y":100 };
	}
};

Player.prototype.updateFallState = function() {
	if(this.y < this.jumpStartLocation) {
		this.y = this.y + this.fallSpeed;	
		this.fallSpeed++;	// acceleration
	} else {
		// the player hit the deck
		this.isFalling = false;	
		this.fallSpeed = 0;
		this.jumpStartLocation = 0;
		this.resetToStanding();
	}
};

Player.prototype.movePlayer = function(x,y) {
	this.isRunning = true;
	this.x += x;
	this.y += y;
	this.graphicOffsets = { "x":100, "y":0 };	// 'X' is adjusted for the first row of the spritesheet
};

Player.prototype.resetToStanding = function() {
	this.graphicOffsets = { "x":0, "y":200 };
};

Player.prototype.draw = function(context) {
	// draw a shadow of the player from his jump base position
	if(this.isJumping || this.isFalling) {
		// shadow position adjustments 
		var shadowX, shadowY;
		shadowX = this.x + 40;
		shadowY = this.jumpStartLocation + widthHeight;
		context.fillStyle = "#000000";
		context.fillRect(shadowX, shadowY, 20,7);
	}

	// animate - swap graphics every 7th frame
	if(this.isRunning) {
		if(animationInterval === 10) {
			currentFrame = (currentFrame === totalFrames) ? 0 : 1;
			animationInterval = 0;
		}
		animationInterval++;
		context.drawImage(sprites, currentFrame * this.graphicOffsets.x, this.graphicOffsets.y, widthHeight, widthHeight, this.x, this.y, widthHeight, widthHeight);
	} else {
		// any action besides court movement
		context.drawImage(sprites, this.graphicOffsets.x, this.graphicOffsets.y, widthHeight, widthHeight, this.x, this.y, widthHeight, widthHeight); 
	}
};