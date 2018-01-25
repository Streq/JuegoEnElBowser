
Recorder.prototype.frameIndex = 0;
Recorder.prototype.frames = [];
Recorder.prototype.restart = function(){
	this.frameIndex = 0;
	this.frames = [];
}
Recorder.prototype.update=function(input){
	this.frames[this.frameIndex] =
		new Recorder.Frame
			(input.up 
			,input.down 
			,input.left 
			,input.right
			);
	
	this.frameIndex++;
}

function Recorder(){
}



Recorder.Frame = function(u,d,l,r){
	this.up = u;
	this.down= d;
	this.left= l;
	this.right= r;
}


