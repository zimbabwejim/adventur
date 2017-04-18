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
    ptx.fillStyle = "blue";
    ptx.fillRect(0, 0, pw, ph);
    mtx.fillStyle = "chartreuse";
    mtx.fillRect(0, 0, mw, mh);
    var desc = $("#desc")[0];
    var prompt = $("#prompt")[0];
    var choice = [$("#choice1")[0],$("#choice2")[0],$("#choice3")[0],$("#choice4")[0],$("#choice5")[0],$("#choice6")[0]];
    var haveLegs = true;
    var haveKey = false;
    var customer = false;
    var haveBeef = false;
    var gold = 0;
    var strength = 0;
    var haveSword = false;
    var haveHammer = false;
    var haveFlask = false;
    var owlAlive = true;
    var haveDoorknob = false;
    var foundOwl = false;
    var owlExt = false; //probs won't be used
    // var optActions = [];
	var doThings = function(input){
		console.log("starting doThings with "+input);
		var optActions = [];
	    switch(input){
			case 99:
				desc.innerHTML = "Ye are in a tavern";
				prompt.innerHTML = "What do ye do?";
				var opts = ["Go to ye table","Go to ye man","Walk outside","Visit shop","Visit bathroom","Approach elevator"];
				optActions = [1,2,3,4,10,29];
				break;

			case 1:
				prompt.innerHTML = "What do ye do?";
				if(haveFlask){
					desc.innerHTML = "Ye table is clear";
					var opts = ["Go back"];
					optActions = [99];
				}else{
					desc.innerHTML = "Ye walk to the table";
					var opts = ["Take ye flask","Look at ye flask","Go back"];
					optActions = [5,6,99];
				}
				break;
			case 2:
				prompt.innerHTML = "Ye see a man";
				var opts = ["Talk to ye man","Walk past","Go back"];
				optActions = [7,8,99];
				break;
			case 3:
				desc.innerHTML = "Ye walk out";
				prompt.innerHTML = "Ye outside the tavern";
				var opts = ["Go to well","Go to shop","Lift rocks","Go to tavern"];
				optActions = [11,12,13,99];
				break;
			case 4:
				break;
			case 5:
				break;
			case 6:
				break;
			case 7:
				break;
			case 8:
				break;
			case 9:
				break;
			case 10:
				break;
			default:console.log("default");
	    }
	    for(var i=0; i<6; i++){

	    	if (opts[i]){
	    		console.log(optActions);
	    		choice[i].innerHTML = opts[i];
	    		console.log("choicing "+i);
	    		var action = optActions[i];
	    		choice[i].addEventListener("click", function(){doThings(action)});
	    	}else{
	    		choice[i].innerHTML = "";
	    	}
	    }
	}

	doThings(99);

})