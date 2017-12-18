function Vec2f(x,y){
    this.x = x;
    this.y = y;
    this.squareLength = 
        function (){
            return this.x*this.x + this.y*this.y;
        }
    ;
    this.length = 
        function(){
            return Math.sqrt(this.x*this.x + this.y*this.y);
        }
    ;
    this.mod = 
        function(){
            if(this.x==0 && this.y==0){
                return new Vec2f(0,0);
            }
            var len = 1/this.length();
            return new Vec2f(this.x*len, this.y*len);
        }
    ;
    this.scale=
        function(vec){
            this.x *= vec.x;
            this.y *= vec.y;
        }
    ;
    
}

Vec2f.dot=
    function(vec1,vec2){
        return vec1.x*vec2.x + vec1.y*vec2.y;
    }
;
Vec2f.cross=
    function(vec1,vec2){
        return vec1.x*vec2.y - vec1.y*vec2.x;
    }
;