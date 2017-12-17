player = 
	{
		x:0,
		y:0,
		w:15,
		h:15,
		vx:0,
		vy:0,
        damping : 0.2
	}
input = 
	{
		left : new Key(37),
		up : new Key(38),
		right : new Key(39),
		down : new Key(40),
		shoot : new Key(90)
	};

var playerImg = document.getElementById("img_player");

function update(dt){
	//input
    var dtsecs=dt/1000;
	var h = ((input.right.pressed | 0) - (input.left.pressed | 0));
	var v = ((input.down.pressed | 0) - (input.up.pressed | 0));
	if(v!=0 && h!=0){
		h*=halfsqrt2;
		v*=halfsqrt2;
	}
    //velocity
    player.vx *= Math.approach(1, 0, player.damping * dtsecs);
	player.vy *= (1 - player.damping * dtsecs);
	player.vx += 1000 * h * dtsecs;
	player.vy += 1000 * v * dtsecs;
	player.vy += 200 * dtsecs;
	
    //move
	player.x+=player.vx * dtsecs;
	player.y+=player.vy * dtsecs;
}
function render(dt){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.fillRect(player.x,player.y,player.w,player.h);
	//ctx.drawImage(playerImg,player.x,player.y);
}
