function checkCollisionAABB(x0, y0, w0, h0, x1, y1, w1, h1){
    return (
        !(x0 + w0 < x1) &&
        !(x1 + w1 < x0) &&
        !(y0 + h0 < y1) &&
        !(y1 + h1 < y0)
    );
}

//checks for a collision assuming aabb0 has moved (velx,vely) relative to aabb1
function checkCollisionAABBMovement(x0, y0, w0, h0, x1, y1, w1, h1, velx, vely){
	var boundx = Math.min(x0, x0 - velx);
	var boundy = Math.min(y0, y0 - vely);
	var boundw = w0 + Math.abs(velx);
	var boundh = h0 + Math.abs(vely);
	if(checkCollisionAABB(boundx, boundy, boundw, boundh, x1, y1, w1, h1)){
		if(checkCollisionAABB(x0, y0, w0, h0, x1, y1, w1, h1)){
			return true;
		}
		var abvelx = Math.abs(velx);
		var abvely = Math.abs(vely);
		var steps = Math.ceil((abvelx>abvely) ? abvelx : abvely);
		var stepx = velx/steps;
		var stepy = vely/steps;
		for(i = 0; i < steps; ++i){
			if(checkCollisionAABB(x0-stepx*i, y0-stepy*i, w0, h0, x1, y1, w1, h1)){
				return true;
			}
		}
	}
	return false;
	
}


function drawCollisionCheck(x0, y0, w0, h0, velx, vely){
	var boundx = Math.min(x0, x0 - velx);
	var boundy = Math.min(y0, y0 - vely);
	var boundw = w0 + Math.abs(velx);
	var boundh = h0 + Math.abs(vely);
	ctx.fillStyle = "blue";
	ctx.globalAlpha = 1;
	ctx.fillRect(boundx, boundy, boundw, boundh);
	
	ctx.fillStyle = "#006600";
	var abvelx = Math.abs(velx);
	var abvely = Math.abs(vely);
	var steps = Math.ceil((abvelx>abvely) ? abvelx : abvely);
	var stepx = velx/steps;
	var stepy = vely/steps;
	for(i = 0; i < steps; ++i){
		ctx.fillRect(x0-stepx*i, y0-stepy*i, w0, h0);
	}
}
