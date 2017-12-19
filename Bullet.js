Bullet.time = 1.25;
Bullet.gravity = -1000;
Bullet.speed = 1000;
Bullet.damping = 5;
Bullet.growthRate = 100;
function Bullet(posx,posy,velx,vely){
	this.pos = new Vec2f(posx,posy);
	this.vel = new Vec2f(velx,vely);
	this.rad = 4;
	this.time = Bullet.time;
	this.destroy = false;
	
	this.update = 
		function(dtsecs){
			this.time -= dtsecs;
			if(this.time < 0){
				this.destroy=true;
				return;
			}
			
			this.vel.y += Bullet.gravity * dtsecs;
			var dampFact = Math.approach(1, 0, Bullet.damping * dtsecs);
			this.vel.x *= dampFact;
			this.vel.y *= dampFact;
			
			this.pos.x += this.vel.x * dtsecs;
			this.pos.y += this.vel.y * dtsecs;
			this.rad += Bullet.growthRate * dtsecs;
		}
	;
}
