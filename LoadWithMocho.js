(function (){
	var root = Program.baseDir;
    var canvas = document.createElement("canvas");
    var style = document.createElement("style");
    var script = document.createElement("script");
    
    style.innerHTML=`canvas {
                        border:1px solid #d3d3d3;
                        background-color: #333333;
                    }`;
    document.head.appendChild(style);
    
    canvas.id="canvas";
    canvas.width="600";
    canvas.height="400";
    document.body.appendChild(canvas);
    
    (function(){
        let script = document.createElement("script");
        script.src=root+"Load.js";
        script.async=false;
        script.onload=function(){
            loadGame(root);
        };
        document.head.appendChild(script);
    })();
    
    window.onload=function(){
        start();
    };
    
    
})();
