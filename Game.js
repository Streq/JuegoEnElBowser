
player = new Player(0,0,0,0);

input = 
	{
		left : new Key(37),
		up : new Key(38),
		right : new Key(39),
		down : new Key(40),
		shoot : new Key(90),
		restart : new Key(82)
	};

//var playerImg = document.getElementById("img_player");

var walls = [];

var bullets = [];

function update(dt){
	//input
	if(input.restart.pressed){
		player.pos.x=canvas.width/2;
		player.pos.y=canvas.height/2;
	}
	
	var dtsecs=dt/1000;
	var dir = new Vec2f(
		((input.right.pressed | 0) - (input.left.pressed | 0)),
		((input.down.pressed | 0) - (input.up.pressed | 0))
	);
	if(dir.y!=0 && dir.x!=0){
		dir.x *= halfsqrt2;
		dir.y *= halfsqrt2;
	}
	
	player.dir.x=dir.x;
	player.dir.y=dir.y;
	
	player.update(dtsecs);
	
	bullets.forEach(
		function(bul,num){
			bul.update(dtsecs);
		}
	);
	
		
	bullets.forEach(
		function(bul,num){
			if(bul.destroy){
				bullets.splice(num,1);
			}
		}
	);
	
}
function render(dt){
	ctx.resetTransform();
	ctx.clearRect(0,0,canvas.width,canvas.height);
	var scaleFact = 0.25;
	ctx.scale(scaleFact,scaleFact);
	
	ctx.translate //set view to player
		(-player.pos.x + canvas.width*0.5/scaleFact
		,-player.pos.y + canvas.height*0.5/scaleFact
		)
	;
	ctx.fillStyle = "#444444";
	ctx.globalAlpha = 1;
	ctx.fillRect(0,0,1000,1000);
	
	
	ctx.fillStyle = "#00FF00";
	ctx.globalAlpha = 1;
	ctx.fillRect(player.pos.x,player.pos.y,player.w,player.h);
	
	
	ctx.fillStyle = "#ffa500";
	
	bullets.forEach
	(		
		function(bul){
			ctx.globalAlpha = bul.time/Bullet.time;
			ctx.beginPath();
			ctx.arc(bul.pos.x, bul.pos.y, bul.rad, 0, 2 * Math.PI);
			ctx.fill();
			ctx.closePath();
		}
	);
			
	//ctx.drawImage(playerImg,player.x,player.y);
}
