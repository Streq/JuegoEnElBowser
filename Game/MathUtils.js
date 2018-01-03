Math.approach = function (val, target, amount){
	if(val==target) return;
	if(val<target) return Math.min(val+amount,target);
	return Math.max(val-amount,target);
};

Math.toRadians = function(degrees){ 
	return degrees * Math.PI / 180;
};

Math.toDegrees = function(radians){ 
	return radians * 180 / Math.PI;
};