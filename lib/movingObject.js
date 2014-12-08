(function (){
	if (typeof Asteroids === "undefined"){
		window.Asteroids = {};
	}
	
	var MovingObject = Asteroids.MovingObject = function (pos, vel, radius, color, game){
		this.game = game
		this.pos = pos;
		this.vel = vel;
		this.radius = radius;
		this.color = color;
		this.isWrappable = true;
	};
	
	MovingObject.prototype.draw = function (ctx) {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(
		  this.pos[0],
		  this.pos[1],
		  this.radius,
		  0,
		  2 * Math.PI,
		  true
			    );
		  ctx.fill();  
	};
	
	MovingObject.prototype.move = function () {
		this.pos[0] += this.vel[0];
		this.pos[1] += this.vel[1];
		if (this.isWrappable === false && game.isOutOfBounds(this.pos)) {
			this.game.remove(this)
		} else {
		this.pos = this.game.wrap(this.pos);
	  }
	};
	
	MovingObject.prototype.isCollidedWith = function(object){
		  var i = Math.pow(object.pos[0]-this.pos[0], 2) + Math.pow(object.pos[1]-this.pos[1], 2);
		  var radii = object.radius + this.radius;
		  if (Math.sqrt(i) < radii && (object instanceof Asteroids.Ship)) {return game.SHIP[0].relocate() };
		  if (Math.sqrt(i) < radii && (object instanceof Asteroids.Asteroid)) { return true };
		  if (Math.sqrt(i) < radii && (object instanceof Asteroids.Bullet)) { return true };
		  return false;
	}
	
})();