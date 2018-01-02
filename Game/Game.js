var view = new View(0, 0, 0, 0, canvas.width/2, canvas.height/2);
view.setScale(4,4);

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

var smokes = [];

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
		dir.x *= Math.SQRT1_2;
		dir.y *= Math.SQRT1_2;
	}
	
	player.dir.x=dir.x;
	player.dir.y=dir.y;
	
	player.update(dtsecs);
	
    var hayColision = false;
    walls.forEach(
        function(wall){
            hayColision = hayColision || 
                checkCollisionAABBMovement(
                    player.pos.x, player.pos.y, player.w, player.h,
                    wall.pos.x, wall.pos.y, wall.w, wall.h,
					player.vel.x * dtsecs, player.vel.y * dtsecs
                )
            ;
        }
    );
    if(hayColision){
        player.pos.x=canvas.width/2;
        player.pos.y=canvas.height/2;
        player.vel.x = 0;
        player.vel.y = 0;
        
    }
    
	
	smokes.forEach(
		function(bul,num){
			bul.update(dtsecs);
		}
	);
		
	smokes.forEach(
		function(bul,num){
			if(bul.destroy){
				smokes.splice(num,1);
			}
		}
	);
	
}
function render(dt){
	ctx.resetTransform();
	ctx.clearRect(0,0,canvas.width,canvas.height);
	view.centerX = player.pos.x;
    view.centerY = player.pos.y;
    view.applyTransform(ctx);
    //ctx.scale(scaleFact,scaleFact);
	
	//ctx.translate //set view to player
	//	(-player.pos.x + canvas.width*0.5/scaleFact
	//	,-player.pos.y + canvas.height*0.5/scaleFact
	//	)
	//;
	ctx.fillStyle = "#444444";
	ctx.globalAlpha = 1;
	ctx.fillRect(0,0,1000,1000);
	
	if(drawSmoke){
        ctx.fillStyle = "#ffa500";
        smokes.forEach
        (		
            function(bul){
                ctx.globalAlpha = bul.time/Smoke.time;
                ctx.beginPath();
                ctx.arc(bul.pos.x, bul.pos.y, bul.rad, 0, 2 * Math.PI);
                ctx.fill();
                ctx.closePath();
            }
        );
    }
	ctx.fillStyle = "#aaaaaa";
    ctx.globalAlpha = 1;
    walls.forEach(
        function(wall){
			ctx.fillRect(wall.pos.x, wall.pos.y, wall.w, wall.h);
		}
    );
    
	
	if(debugDraw){
		var vely = player.vel.y*frameSecs;
		var velx = player.vel.x*frameSecs;
		drawCollisionCheck(player.pos.x,player.pos.y,player.w,player.h,velx,vely);
	}
	
    ctx.fillStyle = "#00FF00";
	ctx.globalAlpha = 1;
	ctx.fillRect(player.pos.x,player.pos.y,player.w,player.h);
	
			
	//ctx.drawImage(playerImg,player.x,player.y);
}
