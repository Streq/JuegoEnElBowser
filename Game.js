player = 
	{
		pos: new Vec2f(0,0),
        vel: new Vec2f(0,0),
        w:15,
		h:15,
		damping : 0.1
	}
input = 
	{
		left : new Key(37),
		up : new Key(38),
		right : new Key(39),
		down : new Key(40),
		shoot : new Key(90)
	};

//var playerImg = document.getElementById("img_player");

var bullets = [];

function Bullet(posx,posy,velx,vely){
    this.pos = new Vec2f(posx,posy);
    this.vel = new Vec2f(velx,vely);
    this.rad = 4;
    this.time = 1000;
}
function update(dt){
	//input
    var dtsecs=dt/1000;
	var dir = new Vec2f(
        ((input.right.pressed | 0) - (input.left.pressed | 0)),
        ((input.down.pressed | 0) - (input.up.pressed | 0))
    );
	if(dir.y!=0 && dir.x!=0){
		dir.x *= halfsqrt2;
		dir.y *= halfsqrt2;
	}
    var dampFact = Math.approach(1, 0, player.damping * dtsecs);
	player.vel.y += 200 * dtsecs;
    player.vel.x *= dampFact;
	player.vel.y *= dampFact;
	
	if(dir.x!=0||dir.y!=0){
        //velocity
        player.vel.x += 5000 * dir.x * dtsecs;
        player.vel.y += 5000 * dir.y * dtsecs;
        
		if(bullets.length > 10000){
			bullets.shift();
		}
        bullets.push
            ( new Bullet
				( player.pos.x+player.w/2
				, player.pos.y+player.h/2
				, -dir.x*100
				, -dir.y*100
				)
			)
		;
	}
	    
    
    

    
    //move
	player.pos.x+=player.vel.x * dtsecs;
	player.pos.y+=player.vel.y * dtsecs;
    
    bullets.forEach(
        function(bul,num){
			bul.time -= dt;
            if(bul.time<0){
				bullets.splice(num,1);
				return;
			}
			bul.pos.x += bul.vel.x * dtsecs;
            bul.pos.y += bul.vel.y * dtsecs;
			bul.rad += 100 * dtsecs;
        }
    );
}
function render(dt){
	ctx.fillStyle = "#00FF00";
	ctx.globalAlpha = 1;
    ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.fillRect(player.pos.x,player.pos.y,player.w,player.h);
    
	
	ctx.fillStyle = "#ffa500";
	bullets.forEach
    (	    
		function(bul){
			ctx.globalAlpha = bul.time/2000;
            ctx.beginPath();
            ctx.arc(bul.pos.x, bul.pos.y, bul.rad, 0, 2 * Math.PI);
            ctx.fill();
			ctx.closePath();
        }
    );
            
	//ctx.drawImage(playerImg,player.x,player.y);
}
