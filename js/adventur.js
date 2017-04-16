$(document).ready(function(){
	var playerDisplay = $("#player")[0];
    var ptx = playerDisplay.getContext("2d");
    var pw = $("#player").width();
    var ph = $("#player").height();
    var mapDisplay = $("#minimap")[0];
    var mtx = mapDisplay.getContext("2d");
    var mw = $("#minimap").width();
    var mh = $("#minimap").height();
    //var startButton = document.getElementById("startButton");
    //startButton.addEventListener("click", function(){startGame()});
    ptx.fillStyle = "white";
    ptx.fillRect(0, 0, pw, ph);
    mtx.fillStyle = "chartreuse";
    mtx.fillRect(0, 0, mw, mh);

})