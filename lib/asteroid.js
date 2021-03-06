(function (){
	if (typeof Asteroids === "undefined"){
		window.Asteroids = {};
	}

    var Asteroid = Asteroids.Asteroid = function(pos, game) {
		this.game = game
		this.pos = pos
		this.COLOR = "orange";
		this.RADIUS = 15;
		this.VELOCITY = Asteroids.Util.randomVec(3);
		Asteroids.MovingObject.call(this, pos, this.VELOCITY, this.RADIUS, this.COLOR, this.game);
    };
	
	Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);
	
})();