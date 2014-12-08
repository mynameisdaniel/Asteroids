(function (){
	if (typeof Asteroids === "undefined"){
		window.Asteroids = {};
	}
	
	var Util = Asteroids.Util = {};
	
	Util.inherits = function (child, parent) {
	  function Surrogate () {}
	  Surrogate.prototype = parent.prototype;
	  child.prototype = new Surrogate();
	};
	
	Util.randomVec = function(length) {
		var x = Math.random() * (length + length) - length;
		var y = Math.sqrt((length * length ) - (x * x));
		var z = Math.random(1);
		if (z < .5) { y = y * -1};
		return [x, y];
	};
	
	Util.randomColor = function() {
	    var HEX_DIGITS = "0123456789ABCDEF"
        var color = "#";
        for (var i = 0; i < 6; i++) {
	        color += HEX_DIGITS[Math.floor((Math.random() * 16))];
	      }
	    return color;
	};
	
	Util.randomSize = function() {
	    return (Math.random() * 25);
	};
	
	
})();