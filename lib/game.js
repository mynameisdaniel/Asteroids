(function (){
	if (typeof Asteroids === "undefined"){
		window.Asteroids = {};
	}
	
	var Game = Asteroids.Game = function(){
    this.DIM_X = 800;
	  this.DIM_Y = 600;
	  this.NUM_ASTEROID = 2;
	  this.asteroids = [];
	  this.bullets = [];
	  this.ship = [new Asteroids.Ship(this.randomPosition(), this)];
    this.addAsteroids(this.NUM_ASTEROID);
    this.score = 0;
    this.lives = 3
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

	Game.prototype.addAsteroids = function (number) {
  	  for (var i = 1; i <= number; i++) {
	  	this.add(new Asteroids.Asteroid(this.randomPosition(), this))
      };
	};
	
	Game.prototype.randomPosition = function () {
		var posX = Math.random() * (this.DIM_X - this.DIM_X/2) + this.DIM_X/2;
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
	  });
		ctx.font = '40px Impact';
		ctx.fillStyle = 'yellow';
		ctx.fillText(this.score, 20,40)
		if (this.lives >= 0) {
		  ctx.fillText("LIVES: " + this.lives, 650, 40)
	  } else {
      ctx.fillStyle = "red"
      ctx.fillText("Game Over", 600, 40)
	  }
	};

	Game.prototype.moveObjects = function (){
		for (var i = 0; i < this.allObjects().length; i++) {
		  if (this.allObjects()[i] == undefined) {continue}
		  	else {this.allObjects()[i].move()};
		};
	}

	Game.prototype.cleanArray = function(array){
    var newArray = new Array();
    for(var i = 0; i<array.length; i++){
      if (array[i]){
        newArray.push(array[i]);
    }
  }
    return newArray;
  }

	Game.prototype.checkCollisions = function () {
		if (this.lives >= 0){
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
		this.asteroids = this.cleanArray(this.asteroids);
		if (this.bullets.length > 0) {
		this.bullets = this.cleanArray(this.bullets);
	  }
		this.respawn();
		this.harder();
	 } else {
	 	this.ship = [];
	 	this.lives = -1;
	 }
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
		this.soundInit();
	  } else if (object instanceof Asteroids.Bullet){
	    var i = this.bullets.indexOf(object);
		  delete this.bullets[i];
		  this.score +=1;
	  }
    }.bind(this))  
	}
  };

  Game.prototype.soundInit = function(){
  	var audio = new Audio('audio/Grenade-SoundBible.com-1777900486.mp3');
  	audio.play();
  }

  Game.prototype.soundInit2 = function(){
  	var audio = new Audio('Jack Bauer Damnit.mp3');
  	audio.play();
  }
 
  Game.prototype.respawn = function(){
  	if (this.asteroids.length < this.NUM_ASTEROID) {
      this.add(new Asteroids.Asteroid(this.randomPosition(), this))
	  }
  };

  Game.prototype.harder = function(){
  	if (this.NUM_ASTEROID < 12 && this.score != 0 && this.score > this.NUM_ASTEROID * 3) {
  		this.NUM_ASTEROID += 1;
  	}
  }

	Game.prototype.step = function (){
    this.moveObjects();
    this.checkCollisions();
	};

})();