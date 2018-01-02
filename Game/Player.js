Player.speed = 5000
Player.smokeSpeed = 500
Player.gravity = 200
function Player(x,y,vx,vy){
	this.pos = new Vec2f(x,y);
	this.vel = new Vec2f(vx,vy);
	this.w = 15;
	this.h = 15;
	this.damping = 0.1;
	this.dir = new Vec2f(0,0);
	this.update = 
		function(dtsecs){
			var dampFact = Math.approach(1, 0, this.damping * dtsecs);
			this.vel.y +=  Player.gravity * dtsecs;
			this.vel.x *= dampFact;
			this.vel.y *= dampFact;
			if(this.dir.x!=0||this.dir.y!=0){
				//velocity
				this.vel.x += Player.speed * this.dir.x * dtsecs;
				this.vel.y += Player.speed * this.dir.y * dtsecs;
				
				smokes.push
					( new Smoke
						( this.pos.x + this.w/2
						, this.pos.y + this.h/2
						, -this.dir.x*Player.smokeSpeed + this.vel.x
						, -this.dir.y*Player.smokeSpeed + this.vel.y
						)
					)
				;
			}
			//move
			this.pos.x += this.vel.x * dtsecs;
			this.pos.y += this.vel.y * dtsecs;

		}
	;
}
