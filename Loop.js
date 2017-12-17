//Loop
function start(){
    lastUpdate = Date.now();
	setInterval(tick,0);
}


function tick(){
	var now = Date.now();
	var dt = now - lastUpdate;
	lastUpdate = now;
	
	update(dt);
	render(dt);
};