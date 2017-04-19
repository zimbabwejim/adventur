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
		console.log("starting doThings with "+input.target.goto);
		input = input.target.goto;
		var optActions = [];
		var opts = [];
	    switch(input){
			case 99:
				desc.innerHTML = "Ye are in a tavern";
				prompt.innerHTML = "What do ye do?";
				opts = ["Go to ye table","Go to ye man","Walk outside","Visit bar","Visit bathroom","Approach elevator"];
				optActions = [1,2,3,4,10,29];
				break;

			case 1:
				prompt.innerHTML = "What do ye do?";
				if(haveFlask){
					desc.innerHTML = "Ye table is clear";
					opts = ["Go back"];
					optActions = [99];
				}else{
					desc.innerHTML = "Ye walk to the table";
					opts = ["Take ye flask","Look at ye flask","Go back"];
					optActions = [5,6,99];
				}
				break;
			case 2:
				prompt.innerHTML = "Ye see a man.";
				opts = ["Talk to ye man","Walk past","Go back"];
				optActions = [7,8,99];
				break;
			case 3:
				desc.innerHTML = "Ye walk out.";
				prompt.innerHTML = "Ye outside the tavern";
				opts = ["Go to well","Go to shop","Lift rocks","Go to tavern"];
				optActions = [11,12,13,99];
				break;
			case 4:
				desc.innerHTML = "Ye walk to the bar.";
				prompt.innerHTML = "Ye see a bartender";
				opts = ["Buy a drink","Use bathroom","Go back"];
				optActions = [9,10,99];
				break;
			case 5:
				if (!haveHammer){
					desc.innerHTML = "Ye try to take ye flask but it be nailed down.";
				}else{
					desc.innerHTML = "Ye pull ye nails out with ye hammer and drink it, and it tastes terrible.";
					haveFlask = true;
				}
				prompt.innerHTML = "";
				opts = ["Continue"];
				optActions = [1];
				break;
			case 6:
				desc.innerHTML = "Ye flask be green.";
				prompt.innerHTML = "";
				opts = ["Continue"];
				optActions = [1];
				break;
			case 7:
				desc.innerHTML = "Ye talk to the man.";
				prompt.innerHTML = "Ye cannot talk to Dennis, who do ye think ye be?";
				opts = ["Continue"];
				optActions = [2];
				break;
			case 8:
				desc.innerHTML = "Ye walk past.";
				if(strength > 2){
					prompt.innerHTML = "Ye push past Dennis.";
					optActions = [18];
				}else{
					prompt.innerHTML = "Dennis does not le ye pass.";
					optActions = [2];
				}
				opts = ["Continue"];
				break;
			case 9:
				if(gold >= 10){
					customer = true;
					desc.innerHTML = "Mmm, tasty drink!";
					gold -= 10;
				}else{
					desc.innerHTML = "Bartender: Get 10 gold punk.";
				}
				prompt.innerHTML = "";
				opts = ["Continue"]
				optActions = [4];
				break;
			case 10:
				if(haveKey){
					desc.innerHTML = "Ye bathroom be occupied";
					optActions = [4];
				}else if(customer && haveFlask){
					desc.innerHTML = "Ye find a key in ye toilet!";
					optActions = [4];
					haveKey = true;
				}else if(customer){
					desc.innerHTML = "Ye go in to ye bathroom, take one look, and pass out.";
					optActions = [99];
				}else{
					desc.innerHTML = "Ye bathroom is for customers only";
					optActions = [4];
				}
				prompt.innerHTML = "";
				opts = ["Continue"];
				break;
			case 11:
				desc.innerHTML = "Ye walk to the well";
				prompt.innerHTML = "Ye be at well";
				opts = ["Look in","Drink some water","Go back"];
				optActions = [14,15,3];
				break;
			case 12:
				desc.innerHTML = "Ye walk into the shop";
				prompt.innerHTML = "Ye see a clerk";
				opts = ["Talk to clerk","Work in ye shop","Buy 10 gold sword","Go outside"];
				optActions = [16,17,19,3];
				break;
			case 13:
				desc.innerHTML = "Ye lift some rocks.";
				if (strength === 3){
					prompt.innerHTML = "Ye get a hernia, pass out, and wake up in ye tavern.";
					optActions = [99];
				}else{
					prompt.innerHTML = "Ye feel stronger.";
					optActions = [3];
					strength++;
				}
				opts = ["Continue"];
				break;
			case 14:
				desc.innerHTML = "Ye look into the well";
				prompt.innerHTML = "Someone pushes you in, and you wake up in ye tavern";
				opts = ["Continue"];
				optActions = [99];
				break;
			case 15:
				desc.innerHTML = "Ye drink some water from the well";
				prompt.innerHTML = "Ye have contracted cholera";
				opts = ["Continue"];
				optActions = [11];
				break;
			case 16:
				desc.innerHTML = "Ye talk to the shopkeep.";
				if (!haveLegs){
					prompt.innerHTML = "Shopkeep: Why so cripple?";//pretty messed up highschool me
				}else if (haveBeef){
					prompt.innerHTML = "Shopkeep: Holy shit! Ye be beefy.";
				}else if (strength === 3){
					prompt.innerHTML = "Shopkeep: Lay off ye steroids.";
				}else if (strength > 0){
					prompt.innerHTML = "Shopkeep: Ye look average.";
				}else{
					prompt.innerHTML = "Shopkeep: Hello ye scrawny man.";
				}
				optActions = [12];
				opts = ["Continue"];
				break;
			case 17:
				desc.innerHTML = "Ye work for the shopkeep";
				prompt.innerHTML = "Ye shovel poo and get 5 gold";
				gold += 5;
				optActions = [12];
				opts = ["Continue"];
				break;
			case 18:
				desc.innerHTML = "Ye push past Dennis.";
				prompt.innerHTML = "Ye be on a road.";
				opts = ["Follow it","Go in cave","Visit temple","Go back in"];
				optActions = [20,21,24,99];
				break;
			case 19:
				desc.innerHTML = "Ye buy a sword.";
				if (haveSword){
					prompt.innerHTML = "Shopkeep: We be out of stock";
				}else if (gold >= 10){
					prompt.innerHTML = "Ye buy a sword.";
					gold -= 10;
					haveSword = true;
				}else{
					prompt.innerHTML = "Shopkeep: Get out or get money ye punk.";
				}
				opts = ["Continue"];
				optActions = [12];
				break;
			case 20:
				desc.innerHTML = "Ye follow the road.";
				prompt.innerHTML = "Ye in a swamp.";
				opts = ["Inspect chest","Inspect tree","Go back"];
				optActions = [27,28,18];
				break;
			case 21:
				desc.innerHTML = "Ye go into the cave.";
				if (haveHammer){
					prompt.innerHTML = "Ye cave be empty.";
					opts = ["Continue"];
					optActions = [18];
				}else{
					prompt.innerHTML = "Ye see a dragon";
					opts = ["Fight","Sneak out"];
					optActions = [22,23];
					strength++;
				}
				opts = ["Continue"];
				break;
			case 22:
				desc.innerHTML = "Ye fight the dragon.";
				if (haveBeef){
					prompt.innerHTML = "Ye dragon sees ye beefiness and hand ye a hammer.";
					haveHammer = true;
					opts = ["Continue"];
					optActions = [18];
				}else if (haveSword){
					prompt.innerHTML = "Ye charge at ye dragon and stab it, but it turns and bites ye head off.<br>Ye wake up in ye tavern with a headache.";
					opts = ["Continue"];
					optActions = [99];
				}else{
					prompt.innerHTML = "Ye punch ye dragon and it burns ye to a crisp.<br>Ye wake up in ye tavern with a bad rash";
					opts = ["Continue"];
					optActions = [99];
				}
				break;
			case 23:
				desc.innerHTML = "Ye try to sneak out.";
				prompt.innerHTML = "Ye sneak out ye coward.";
				opts = ["Continue"];
				optActions = [18];
				break;
			case 24:
				desc.innerHTML = "Ye visit the temple.";
				prompt.innerHTML = "Ye be at a shrine.";
				opts = ["Talk to monk","Walk to statue","Go back"];
				optActions = [25,26,18];
				break;
			case 25:
				desc.innerHTML = "Ye talk to the monk.";
				if (haveSword){
					prompt.innerHTML = "Ye monk eyes ye sword.<br>Monk: Yesss, like shiny...";
				}else{
					prompt.innerHTML = "Monk: Hisss, ye have no shiny...<br>Ye monk starts gnawing on ye leg.";					
				}
				optActions = [24];
				opts = ["Continue"];
				break;
			default:console.log("default");return;
	    }
	    for(var i=0; i<6; i++){
	    	if (opts[i]){
	    		console.log("choicing "+i);
	    		choice[i].innerHTML = opts[i];
	    		let action = optActions[i];//damn var referencing location and not value
	    		choice[i].goto = action;
	    	}else{
	    		choice[i].innerHTML = "";
	    	}
	    }
	}
	for(let i = 0; i < choice.length; i++){
    	choice[i].addEventListener("click",doThings);
    }
	doThings({target: {goto: 99}});

})