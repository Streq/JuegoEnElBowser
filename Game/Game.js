var view = new View(0, 0, 0, 0, canvas.width/2, canvas.height/2);
view.setScale(4,4);

var World = (function(mod){
	mod.player = new Player(0,0,0,0);
	mod.walls = [];
	mod.smokes = [];

	
	return mod;
}(World||{}));


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


function update(dt){
	var player = World.player;
	var walls = World.walls;
	var smokes = World.smokes;
	
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
		
	for(var i = smokes.length-1;i>=0;--i){
		if(smokes[i].destroy){
			smokes.splice(i,1);
		}
	}
	
}

