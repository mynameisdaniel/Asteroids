(function (){
	if (typeof Asteroids === "undefined"){
		window.Asteroids = {};
	}

    var Ship = Asteroids.Ship = function(pos, game) {
		this.game = game
		this.pos = pos
		this.COLOR = "#FFFF00";
		this.RADIUS = 12;
		this.VELOCITY = [0,0];
		Asteroids.MovingObject.call(this, this.pos, this.VELOCITY, this.RADIUS, this.COLOR, this.game);
    };
	
	Asteroids.Util.inherits(Asteroids.Ship, Asteroids.MovingObject);

		Ship.prototype.isCollidedWith = function(object){
		  var i = Math.pow(object.pos[0]-this.pos[0], 2) + Math.pow(object.pos[1]-this.pos[1], 2);
		  var radii = object.radius + this.radius;
		  if (Math.sqrt(i) < radii && (object instanceof Asteroids.Asteroid)) { this.relocate() };
	}
	
    Ship.prototype.fireBullet = function (){
      var new_pos = this.pos.slice(0);
      new_pos[0] += 1
      new_pos[1] += 1
      this.game.add(new Asteroids.Bullet(new_pos, [5, 5], this.game));
    };

    Ship.prototype.relocate = function () {
      this.pos = game.randomPosition();
    };

    Ship.prototype.powerLeft = function() {
      this.vel[0] -= 1
    };

    Ship.prototype.powerRight = function() {
      this.vel[0] += 1
    };

    Ship.prototype.powerUp = function() {
      this.vel[1] -= 1
    };

    Ship.prototype.powerDown = function() {
      this.vel[1] += 1
    };

})();