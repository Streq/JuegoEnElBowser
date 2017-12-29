Smoke.time = 1;
Smoke.gravity = -1000;
Smoke.speed = 1000;
Smoke.damping = 5;
Smoke.growthRate = 150;
function Smoke(posx,posy,velx,vely){
	this.pos = new Vec2f(posx,posy);
	this.vel = new Vec2f(velx,vely);
	this.rad = 4;
	this.time = Smoke.time;
	this.destroy = false;
	
	this.update = 
		function(dtsecs){
			this.time -= dtsecs;
			if(this.time < 0){
				this.destroy=true;
				return;
			}
			
			this.vel.y += Smoke.gravity * dtsecs;
			var dampFact = Math.approach(1, 0, Smoke.damping * dtsecs);
			this.vel.x *= dampFact;
			this.vel.y *= dampFact;
			
			this.pos.x += this.vel.x * dtsecs;
			this.pos.y += this.vel.y * dtsecs;
			this.rad += Smoke.growthRate * dtsecs;
		}
	;
}
