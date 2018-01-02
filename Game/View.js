function View(centerX, centerY, halfWidth, halfHeight, halfViewPortWidth, halfViewPortHeight){
    this.centerX = centerX;
    this.centerY = centerY;
    this.halfWidth = halfWidth;
    this.halfHeight = halfHeight;
    this.halfViewPortWidth = halfViewPortWidth;
    this.halfViewPortHeight = halfViewPortHeight;
}
View.prototype.applyTransform = function (ctx){
    ctx.scale
        ( this.halfViewPortWidth / this.halfWidth 
        , this.halfViewPortHeight / this.halfHeight
        );
    ctx.translate
        ( -this.centerX + this.halfWidth
        , -this.centerY + this.halfHeight
        );
}

View.prototype.scale=function(x,y){
    this.halfWidth *= x;
    this.halfHeight *= y;
}

View.prototype.setScale=function(x,y){
    this.halfWidth = this.halfViewPortWidth*x;
    this.halfHeight = this.halfViewPortHeight*y;
}