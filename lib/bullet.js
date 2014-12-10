(function (){
	if (typeof Asteroids === "undefined"){
		window.Asteroids = {};
	}

    var Bullet = Asteroids.Bullet = function(pos, vel, game) {
		this.game = game
		this.pos = pos
		this.pos[0] += 1
		this.COLOR = "white";
		this.RADIUS = 2;
		this.VELOCITY = vel;
		Asteroids.MovingObject.call(this, this.pos, this.VELOCITY, this.RADIUS, this.COLOR, this.game);
		this.isWrappable = false
    };
	
	Asteroids.Util.inherits(Asteroids.Bullet, Asteroids.MovingObject);

		Bullet.prototype.isCollidedWith = function(object){
		  var i = Math.pow(object.pos[0]-this.pos[0], 2) + Math.pow(object.pos[1]-this.pos[1], 2);
		  var radii = object.radius + this.radius;
		  return (Math.sqrt(i) < radii && object instanceof Asteroids.Asteroid);
	}
	
})();