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
	
	
	World.walls=[
	/*	{"pos":{"x":14100,"y":7300},"w":15000,"h":100},
		{"pos":{"x":14100,"y":10000},"w":15000,"h":100},
		{"pos":{"x":14100,"y":7300},"w":100,"h":1000},
		{"pos":{"x":14100,"y":8200},"w":100,"h":1000},
		{"pos":{"x":14100,"y":9100},"w":100,"h":1000},
		{"pos":{"x":16100,"y":7400},"w":100,"h":1500},
		{"pos":{"x":18000,"y":8500},"w":100,"h":1500},
		{"pos":{"x":20000,"y":7500},"w":100,"h":1500},
		{"pos":{"x":22000,"y":8500},"w":100,"h":1500},
		{"pos":{"x":24200,"y":7400},"w":100,"h":1500},
		{"pos":{"x":26300,"y":8500},"w":100,"h":1500},
		{"pos":{"x":31900,"y":7200},"w":100,"h":15000},
		{"pos":{"x":28900,"y":7300},"w":3000,"h":100},
		{"pos":{"x":29100,"y":10000},"w":100,"h":10000},
		{"pos":{"x":29100,"y":19600},"w":100,"h":10000},
		{"pos":{"x":31900,"y":19900},"w":100,"h":10000}
	*/];
	
	World.goals=[
	//	{"pos":{"x":29100,"y":29900},"w":3000,"h":100}
	]
	
	
	//World.player = new Player(15100, 8100, 10, 10);
	
    level.forEach((e) => {
        e.x *= 10;
        e.y *= 10;
        e.w *= 10;
        e.h *= 10;
        
        switch (e.tile) {
            case "block":
                World.walls.push({
                    pos: {
                        x: e.x,
                        y: e.y,

                    },
                    w: e.w,
                    h: e.h
                });
                break;
            case "end portal":
                World.goals.push({
                    pos: {
                        x: e.x,
                        y: e.y,
                    },
                    w: e.w,
                    h: e.h
                });
                break;
            case "portal":
                World.spawnPoint = e;
                World.player = new Player(e.x,e.y,0,0);
				World.player2 = new Player(e.x,e.y,0,0);
				
                break;
        }
    });
    
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