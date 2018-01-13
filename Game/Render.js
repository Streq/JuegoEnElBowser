var Graphics = (function(mod){
	mod.debugDraw = false;
	mod.drawSmoke = true;
	
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
	
	//private var
	mod.timeSinceLastUpdate = 0;
	return mod;
}(Graphics||{}));

function render(dt){
	Graphics.timeSinceLastUpdate += dt;
	
	if(Graphics.timeSinceLastUpdate < Graphics.frameTime){
		return;
	}
	
	Graphics.timeSinceLastUpdate = 0;
	
	var player = World.player;
	var walls = World.walls;
	var smokes = World.smokes;
	
	
	ctx.resetTransform();
	ctx.clearRect(0,0,canvas.width,canvas.height);
	view.centerX = player.pos.x;
    view.centerY = player.pos.y;
    view.applyTransform(ctx);
    
	ctx.fillStyle = "#444444";
	ctx.globalAlpha = 1;
	ctx.fillRect(0,0,1000,1000);
	
	if(Graphics.drawSmoke){
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
    
	
	if(Graphics.debugDraw){
		var vely = player.vel.y*Logic.frameSecs;
		var velx = player.vel.x*Logic.frameSecs;
		drawCollisionCheck(player.pos.x,player.pos.y,player.w,player.h,velx,vely);
	}
	
    ctx.fillStyle = "#00FF00";
	ctx.globalAlpha = 1;
	ctx.fillRect(player.pos.x,player.pos.y,player.w,player.h);
	
}