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
	var dependencies = [
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
			return prefix+src;
		}
	);
	
	loadSrc(dependencies);
}
