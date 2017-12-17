function Key(code){
    this.code = code;
    
    this.pressed = false;
    this.just_updated = false;
    
    this.update = function(val){
        this.just_updated = (val!=this.pressed);
        this.pressed = val;
    }
    
    this.clear = function(){this.pressed=false; this.just_updated=false;}
    
//    this.whilePressed = function(){};
//    this.onRelease = function(){};
//    this.onPress = function(){};
}

function handleKeyDown(event) {
	event.preventDefault();
	var key = event.keyCode;
	setInput(key,true);
	
};
function handleKeyUp(event) {
	event.preventDefault();
	var key = event.keyCode;
	setInput(key,false);
	
};
function setInput(code, pressed){
	for(key in input){
        if(input[key].code==code){
            input[key].update(pressed);
        }
    }
}

document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;