Player.speed = 5000
Player.smokeSpeed = 1000
Player.gravity = 200

Player.prototype.accelerate =
	function(dir, dtsecs){
		this.vel.x += Player.speed * dir.x * dtsecs;
		this.vel.y += Player.speed * dir.y * dtsecs;
		
		var smokes = World.smokes;
	
		smokes.push
			( new Smoke
				( this.pos.x + this.w*(1+dir.x)*0.5
				, this.pos.y + this.h*(1+dir.y)*0.5
				, -dir.x*Player.smokeSpeed + this.vel.x
				, -dir.y*Player.smokeSpeed + this.vel.y
				)
			)
		;
	}
;
Player.prototype.update = 
	function(dtsecs){
		var dampFact = Math.approach(1, 0, this.damping * dtsecs);
		this.vel.y +=  Player.gravity * dtsecs;
		this.vel.x *= dampFact;
		this.vel.y *= dampFact;
		if(this.dir.x!=0||this.dir.y!=0){
			//velocity
			var dir1 = this.dir.rotate(Math.toRadians(30));
			var dir2 = this.dir.rotate(Math.toRadians(-30));
			
			this.accelerate(this.dir, dtsecs);
			this.accelerate(dir1, dtsecs);
			this.accelerate(dir2, dtsecs);
		}
		//move
		this.pos.x += this.vel.x * dtsecs;
		this.pos.y += this.vel.y * dtsecs;

	}
;
function Player(x,y,vx,vy){
	this.pos = new Vec2f(x,y);
	this.vel = new Vec2f(vx,vy);
	this.w = 15;
	this.h = 15;
	this.damping = 0.1;
	this.dir = new Vec2f(0,0);
		
}
