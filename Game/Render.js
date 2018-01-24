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
	
	
	//private var
	mod.timeSinceLastUpdate = 0;
	
	mod.render=function(dt){
		this.timeSinceLastUpdate += dt;

		if(this.timeSinceLastUpdate < this.frameTime){
			return;
		}

		this.timeSinceLastUpdate = 0;

		var player = World.player;
		var walls = World.walls;
		var smokes = World.smokes;
		var goals = World.goals;

		ctx.resetTransform();
		ctx.clearRect(0,0,canvas.width,canvas.height);
		view.centerX = player.pos.x;
		view.centerY = player.pos.y;
		view.applyTransform(ctx);

		ctx.fillStyle = "#444444";
		ctx.globalAlpha = 1;
		ctx.fillRect(0,0,1000,1000);

		if(this.drawSmoke){
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
		
		ctx.fillStyle = "#0000ff";
		ctx.globalAlpha = 1;
		goals.forEach(
			function(wall){
				ctx.fillRect(wall.pos.x, wall.pos.y, wall.w, wall.h);
			}
		);

		if(this.debugDraw){
			var vely = player.vel.y*Logic.frameSecs;
			var velx = player.vel.x*Logic.frameSecs;
			drawCollisionCheck(player.pos.x,player.pos.y,player.w,player.h,velx,vely);
		}

		ctx.fillStyle = "#00FF00";
		ctx.globalAlpha = 1;
		ctx.fillRect(player.pos.x,player.pos.y,player.w,player.h);


		ctx.resetTransform();
		ctx.fillStyle = "#FFFFFF";
		ctx.globalAlpha = 1;
		ctx.font = "25px Arial";
		ctx.fillText(World.timer.toFixed(1),10,25);
		
		if(World.record>=0){
			ctx.resetTransform();
			ctx.fillStyle = "#0000FF";
			ctx.globalAlpha = 1;
			ctx.font = "25px Arial";
			ctx.fillText(World.record.toFixed(1),10,50);
		}
	};

	return mod;
}(Graphics||{}));

function render(dt){
	Graphics.render(dt);
}
