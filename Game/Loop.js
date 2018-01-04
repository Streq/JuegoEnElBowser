//Loop
var fps = 60
var frameTime = 1000/fps;
var frameSecs = 1/fps;
var timeSinceLastUpdate = 0;

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
	walls.push(new Wall(0,100,500,50));
    walls.push(new Wall(500,100,50,500));
    walls.push(new Wall(1000,100,500,50));
    
	setInterval(tick,0);
}


function tick(){
	var dt = clock.restart();
	timeSinceLastUpdate += dt;
	
	while(timeSinceLastUpdate >= frameTime){
		timeSinceLastUpdate -= frameTime;
		update(frameTime);
		render(frameTime);
	}
};