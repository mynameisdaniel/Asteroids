(function (){
	if (typeof Asteroids === "undefined"){
		window.Asteroids = {};
	}

    var Asteroid = Asteroids.Asteroid = function(pos, game) {
		this.game = game
		this.pos = pos
		this.COLOR = "grey";
		// this.RADIUS = 25;
		this.RADIUS = Asteroids.Util.randomSize();
		this.VELOCITY = Asteroids.Util.randomVec(3);
		Asteroids.MovingObject.call(this, pos, this.VELOCITY, this.RADIUS, this.COLOR, this.game);
    };
	
	Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);
	
})();