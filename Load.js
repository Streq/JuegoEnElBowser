function loadSrc(srcs){
	srcs.forEach(
		function(src){
			var script = document.createElement("script");
			script.src=src;
			script.async=false;
			document.head.appendChild(script);
		}
	);
	
}

function loadGame(prefix){
	var gameDependencies = [
		"Collision.js",
		"View.js",
		"Vec2f.js",
		"MathUtils.js",
		"Globals.js",
		"Input.js",
		"Wall.js",
		"Smoke.js",
		"Player.js",
		"Game.js",
		"Loop.js",
		"Render.js"
	].map(
		function(src){
			return prefix+"Game/"+src;
		}
	);
	
	var utilDependencies = [
		"jquery-3.2.1.min.js"
	].map(
		function(src){
			return prefix+"Utils/"+src;
		}
	);
	
	loadSrc(utilDependencies);
	loadSrc(gameDependencies);
	
}


function loadEditor(prefix){
	var utilDependencies = [
		"jquery-3.2.1.min.js"
	].map(
		function(src){
			return prefix+"Utils/"+src;
		}
	);
	
	loadSrc(utilDependencies);
	
}
