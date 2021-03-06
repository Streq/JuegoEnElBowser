var view = new View(0, 0, 0, 0, canvas.width / 2, canvas.height / 2);
view.setScale(32, 32);
var twoPlayers = twoPlayers || false;
var World = (function (mod) {
	mod.player = new Player(0, 0, 0, 0);
	mod.player2 = new Player(0, 0, 0, 0);
	mod.walls = [];
	mod.smokes = [];
	mod.goals = [];
	mod.timer = 0;
	mod.record = -1;
	mod.currentRecorder = new Recorder();
	mod.recordedRecord = undefined;


	mod.replaying = false;
	mod.frameIndex = 0;
	mod.rec = {};

	return mod;
}(World || {}));


var rawInput = {
	left: new Key(37),
	up: new Key(38),
	right: new Key(39),
	down: new Key(40),
	replay: new Key(190),
	restart: new Key(189),
};

var rawInput2 = {
	left: new Key(65),
	up: new Key(87),
	right: new Key(68),
	down: new Key(83),
	replay: new Key(84),
	restart: new Key(82)

}

//var playerImg = document.getElementById("img_player");

var input = {
	left: false,
	up: false,
	right: false,
	down: false,
	replay: false,
	restart: false
}

var input2 = {
	left: false,
	up: false,
	right: false,
	down: false,
	replay: false,
	restart: false
}



function update(dt) {
	var player = World.player;
	var player2 = World.player2;
	var walls = World.walls;
	var smokes = World.smokes;
	var goals = World.goals;

	var dtsecs = dt / 1000;
	World.timer += dtsecs;



	let pj1 = {
		player: player,
		input: input,
		rawInput: rawInput
	}

	let pjs = twoPlayers ? [
			pj1,
		{
			player: player2,
			input: input2,
			rawInput: rawInput2
			}
		] : [pj1];

	pjs.forEach((pj, index) => {
		let input = pj.input;
		let rawInput = pj.rawInput;
		let player = pj.player;


		input.up = rawInput.up.pressed;
		input.down = rawInput.down.pressed;
		input.left = rawInput.left.pressed;
		input.right = rawInput.right.pressed;
		input.replay = rawInput.replay.pressed;
		input.restart = rawInput.restart.pressed;

		if (World.replaying) {
			input.up = World.rec.frames[World.frameIndex].up;
			input.down = World.rec.frames[World.frameIndex].down;
			input.left = World.rec.frames[World.frameIndex].left;
			input.right = World.rec.frames[World.frameIndex].right;
			World.frameIndex++;
		}

		World.currentRecorder.update(input);



		var dir = new Vec2f(
			((input.right | 0) - (input.left | 0)),
			((input.down | 0) - (input.up | 0))
		);
		if (dir.y != 0 && dir.x != 0) {
			dir.x *= Math.SQRT1_2;
			dir.y *= Math.SQRT1_2;
		}

		player.dir.x = dir.x;
		player.dir.y = dir.y;

		player.update(dtsecs);

		var hayGoal = false;
		goals.forEach(
			function (wall) {
				hayGoal = hayGoal ||
					checkCollisionAABBMovement(
						player.pos.x, player.pos.y, player.w, player.h,
						wall.pos.x, wall.pos.y, wall.w, wall.h,
						player.vel.x * dtsecs, player.vel.y * dtsecs
					);
			}
		);


		var hayColision = false;
		walls.forEach(
			function (wall) {
				hayColision = hayColision ||
					checkCollisionAABBMovement(
						player.pos.x, player.pos.y, player.w, player.h,
						wall.pos.x, wall.pos.y, wall.w, wall.h,
						player.vel.x * dtsecs, player.vel.y * dtsecs
					);
			}
		);




		if (hayGoal) {
			if (World.record < 0 || World.record > World.timer) {
				World.record = World.timer;
				World.recordedRecord = World.currentRecorder;
				World.currentRecorder = new Recorder();
			}
			restart(index);
		}

		if (hayColision) {
			restart(index);
		}

		if (input.restart) {
			restart(index);
		}

		if (input.replay) {
			if (World.recordedRecord)
				replay(World.recordedRecord);
		}

	});
	
	smokes.forEach(
		function (bul, num) {
			bul.update(dtsecs);
		}
	);

	for (var i = smokes.length - 1; i >= 0; --i) {
		if (smokes[i].destroy) {
			smokes.splice(i, 1);
		}
	}

}


function restart(index) {
	let s = World.spawnPoint;
	if(!index){
		World.player = new Player(s.x, s.y, 0, 0);
	}else{
		World.player2 = new Player(s.x, s.y, 0, 0);
	}
	World.timer = 0;
	World.currentRecorder.restart();
	World.replaying = false;
	World.frameIndex = 0;
	World.rec = {};


}

function replay(rec) {
	restart();
	World.rec = rec;
	World.replaying = true;

}