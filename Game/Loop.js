//Loop
var Logic = (function(mod){
	Object.defineProperty(mod, "FPS", 
		{
			set: function(x){
				this.frameTime = 1000/x;
				this.frameSecs = 1/x;
				this.fps=x;
			},
			get: function(){
				return this.fps;
			}
		}
	);
	mod.FPS = 60;
	mod.timeSinceLastUpdate = 0;
	return mod;
	
}(Logic||{}));

function Clock(){
	this.lastReset = Date.now();
	this.restart = function(){
		var now = Date.now();
		var ret = now - this.lastReset;
		this.lastReset = now;
		return ret;
	}
}

var clock = new Clock();

function start(){
	clock.restart();
    var walls = World.walls;
	World.walls=
		[
			{"pos":{"x":0,"y":0},"w":100,"h":3000},
			{"pos":{"x":0,"y":0},"w":5100,"h":100},
			{"pos":{"x":0,"y":3000},"w":5100,"h":100}
		]
	;
    setInterval(tick,0);
}


function tick(){
	var dt = clock.restart();
	Logic.timeSinceLastUpdate += dt;
	
	while(Logic.timeSinceLastUpdate >= Logic.frameTime){
		Logic.timeSinceLastUpdate -= Logic.frameTime;
		update(Logic.frameTime);
		render(Logic.frameTime);
	}
};