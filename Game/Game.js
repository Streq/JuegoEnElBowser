var view = new View(0, 0, 0, 0, canvas.width/2, canvas.height/2);
view.setScale(8,8);

var World = (function(mod){
	mod.player = new Player(0,0,0,0);
	mod.walls = [];
	mod.smokes = [];
	mod.goals = [];
	mod.timer = 0;
	mod.record = -1;
	
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
	var goals = World.goals;
	//input
	if(input.restart.pressed){
		restart();
	}
	
	var dtsecs=dt/1000;
	World.timer+=dtsecs;
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
	
	var hayGoal = false;
	goals.forEach(
        function(wall){
            hayGoal = hayGoal || 
                checkCollisionAABBMovement(
                    player.pos.x, player.pos.y, player.w, player.h,
                    wall.pos.x, wall.pos.y, wall.w, wall.h,
					player.vel.x * dtsecs, player.vel.y * dtsecs
                )
            ;
        }
    );
    
	
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
	
	if(hayGoal){
		if(World.record < 0 || World.record > World.timer){
			World.record = World.timer;
		}
		restart();
    }
	
	if(hayColision){
		restart();
    }
    
}


function restart(){
	World.player = new Player(15100, 8100, 10, 10);
	World.timer = 0;
}
