function View(centerX, centerY, halfWidth, halfHeight, halfViewPortWidth, halfViewPortHeight){
    this.cx = centerX;
    this.cy = centerY;
    this.w = halfWidth;
    this.h = halfHeight;
    this.vpw = halfViewPortWidth;
    this.vph = halfViewPortHeight;
}
View.prototype.applyTransform = function (ctx){
    ctx.scale(this.vpw/this.w, this.vph/this.h);
    ctx.translate(-this.cx + this.w, -this.cy + this.h);
}

View.prototype.scale=function(x,y){
    this.w*=x;
    this.h*=y;
}

View.prototype.setScale=function(x,y){
    this.w=this.vpw*x;
    this.h=this.vph*y;
}