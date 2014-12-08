(function (){
	if (typeof Asteroids === "undefined"){
		window.Asteroids = {};
	}
	
	var Game = Asteroids.Game = function(){
    this.DIM_X = 800;
	  this.DIM_Y = 600;
	  this.NUM_ASTEROID = 100;
	  this.asteroids = [];
	  this.bullets = [];
	  this.ship = [new Asteroids.Ship(this.randomPosition(), this)];
    this.addAsteroids();

	}

	Game.prototype.add = function (object) {
    if (object instanceof Asteroids.Asteroid) {
    	this.asteroids.push(object);
    } else if (object instanceof Asteroids.Bullet) {
    	this.bullets.push(object);
    } else if (object instanceof Asteroids.Ship) {
    	this.ship.push(object);
    }
	};

	Game.prototype.addAsteroids = function () {
  	  for (var i = 1; i <= this.NUM_ASTEROID; i++) {
	  	this.add(new Asteroids.Asteroid(this.randomPosition(), this))
      };
	};
	
	Game.prototype.randomPosition = function () {
		var posX = Math.random() * this.DIM_X;
	  var posY = Math.random() * this.DIM_Y;
		return [posX, posY];
	}
	
	Game.prototype.wrap = function (pos) {
		if (pos[0] < 0) { pos[0] = 800 + pos[0]};
		if (pos[0] > 800 ) {pos[0] = pos[0] - 800};
		if (pos[1] < 0) { pos[1] = 600 + pos[1]};
		if (pos[1] > 600 ) {pos[1] = pos[1] - 600 };
        return pos
    };
	
	Game.prototype.draw = function (ctx) {
		ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);		
		this.allObjects().forEach(function (asteroid) {
			asteroid.draw(ctx);
		}
	);
	};

	Game.prototype.moveObjects = function (){
		for (var i = 0; i < this.allObjects().length; i++) {
		  if (this.allObjects()[i] == undefined) {continue}
		  	else {this.allObjects()[i].move()};
		};
	}

	Game.prototype.checkCollisions = function () {
		for (var i = 0; i < this.allObjects().length; i++) {
			if (this.allObjects()[i] == undefined) {continue};
		  var asteroid = this.allObjects()[i];
		  var remaining = this.allObjects().slice(i+1);
		    for (var j = 0; j< remaining.length; j++) {
		    	if (remaining[j] == undefined) {continue};
		    	if (asteroid.isCollidedWith(remaining[j])) {
                this.remove([asteroid, remaining[j]]);
		    	};
		    }	  	
		};
	}

  Game.prototype.isOutOfBounds = function (pos){
  	return (pos[0] < 0 || pos[0] > 800 || pos[1] < 0 || pos[1] > 600)
  };

	Game.prototype.allObjects = function (){
   return this.asteroids.concat(this.ship).concat(this.bullets);
	};

  Game.prototype.remove = function (objects) {
  	if (objects instanceof Asteroids.Bullet){
	    var i = this.bullets.indexOf(objects);
		delete this.bullets[i];
	  } else {
	  objects.forEach( function (object){
	  if (object instanceof Asteroids.Asteroid){
	    var i = this.asteroids.indexOf(object);
		delete this.asteroids[i];
	  } else if (object instanceof Asteroids.Bullet){
	    var i = this.bullets.indexOf(object);
		delete this.bullets[i];
	  }
    }.bind(this))  
	}
  };

	Game.prototype.step = function (){
    this.moveObjects();
    this.checkCollisions();
	};

})();