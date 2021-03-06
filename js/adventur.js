$(document).ready(function(){
	var playerDisplay = $("#player")[0];
	var ptx = playerDisplay.getContext("2d");
	var pi = Math.PI;
	var mapDisplay = $("#minimap")[0];
	var mtx = mapDisplay.getContext("2d");
	var mw = $("#minimap").width();
	var mh = $("#minimap").height();
	mtx.fillStyle = "chartreuse";
	mtx.fillRect(0, 0, mw, mh);
	var desc = $("#desc")[0];
	var prompt = $("#prompt")[0];
	var choice = [$("#choice1")[0],$("#choice2")[0],$("#choice3")[0],$("#choice4")[0],$("#choice5")[0]];
	var log = document.getElementById("gameLog");
	$("#clearButton")[0].addEventListener("click", function(){log.innerHTML = ""});
	var haveLegs;
	var haveKey;
	var customer;
	var haveBeef;
	var robotArm;
	var gold;
	var strength;
	var haveSword;
	var haveHammer;
	var haveFlask;
	var owlAlive;
	var haveDoorknob;
	var owlFound;
	var restartGame;
	var startGame = function(){
		haveLegs = true;
		haveKey = false;
		customer = false;
		haveBeef = false;
		robotArm = false;
		gold = 0;
		strength = 0;
		haveSword = false;
		haveHammer = false;
		haveFlask = false;
		owlAlive = true;
		haveDoorknob = false;
		owlFound = false;
		restartGame = false;
		doThings({target: {goto: 99, innerHTML: ""}});
	}



	var doThings = function(input){
		console.log("starting doThings with "+input.target.goto);
		console.log(input.target.innerHTML);
		drawPlayer();
		log.innerHTML = log.innerHTML + input.target.innerHTML + "<br>";
		input = input.target.goto;
		var optActions = [];
		var opts = [];
		if (restartGame){
			startGame();
			return;
		}
		switch(input){
			case 99:
				desc.innerHTML = "Ye are in a tavern";
				prompt.innerHTML = "What do ye do?";
				opts = ["Go to ye table","Go to ye man","Walk outside","Visit bar","Approach elevator"];
				optActions = [1,2,3,4,29];
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
			case 26:
				desc.innerHTML = "Ye approach the statue.";
				if (haveBeef){
					prompt.innerHTML = "Ye Beowulf statue likes ye shiny";
					optActions = [24];
				}else if (haveSword){
					prompt.innerHTML = "Ye Beowulf statue takes ye sword and gives ye beefiness";
					haveSword = false;
					haveBeef = true;
					optActions = [24];
				}else{
					prompt.innerHTML = "Ye have nothing to offer and ye statue rips ye arm off.<br>Ye wake up in ye tavern with a robotic arm.";
					robotArm = true;
					optActions = [99];
				}
				opts = ["Continue"];
				break;
			case 27:
				desc.innerHTML = "Ye inspect the chest.  It appears to be named Chesty.";
				if (haveKey){
					prompt.innerHTML = "Chesty eats ye key.<br>Chesty still be hungry and bites ye legs off.<br>Ye wake up in ye tavern in a wheelchair.";
					haveKey = false;
					haveLegs = false;
					optActions = [99];
				}else{
					prompt.innerHTML = "Chesty be hungry.";
					optActions = [20];
				}
				opts = ["Continue"];
				break;
			case 28:
				desc.innerHTML = "Ye inspect the tree.";
				if (haveDoorknob){
					prompt.innerHTML = "Ye tree be empty.";
				}else if (owlAlive){
					prompt.innerHTML = "An owl hoots at ye demeaningly."
					owlFound = true;
				}else{
					prompt.innerHTML = "Ye look in a hole in the tree and find a doorknob.";
					haveDoorknob = true;
				}
				opts = ["Continue"];
				optActions = [20];
				break;
			case 29:
				desc.innerHTML = "Ye approach the elevator.";
				prompt.innerHTML = "A man stands guard.";
				opts = ["Inspect man","Use elevator","Go back"];
				optActions = [30,31,99];
				break;
			case 30:
				desc.innerHTML = "Ye inspect the man.";
				prompt.innerHTML = "Ye man appears to be Dennis' twin brother Daryl.";
				opts = ["Continue"];
				optActions = [29];
				break;
			case 31:
				desc.innerHTML = "Ye use the elevator.";
				if (haveLegs){
					prompt.innerHTML = "Daryl does not let ye pass.<br>Ye elevator be handicap only.";
					optActions = [29];
				}else{
					prompt.innerHTML = "Ye ride the elevator upstairs";
					optActions = [32];
				}
				opts = ["Continue"];
				break;
			case 32:
				desc.innerHTML = "Ye walk out of the elevator.";
				prompt.innerHTML = "Ye be upstairs.";
				opts = ["Roll out window","Talk to men","Use door","Go back"];
				optActions = [33,35,36,99];
				break;
			case 33:
				desc.innerHTML = "Ye roll out the window.";
				prompt.innerHTML = "Ye land outside.";
				opts = ["Continue"];
				optActions = [3];
				break;
			case 34://supposed to be walk up to men/talk to men
			case 35:
				desc.innerHTML = "Ye talk to the men.";
				if (!owlAlive){
					prompt.innerHTML = "What men?";
				}else if (owlAlive && owlFound){
					prompt.innerHTML = "Ye tell the men of the owl.<br>Ye men rush off.";
					owlAlive = false;
				}else{
					prompt.innerHTML = "Men: We're <i>owl</i> exterminators.<br>The men ignore ye.";
				}
				opts = ["Continue"];
				optActions = [32];
				break;
			case 36:
				desc.innerHTML = "Ye use the door.";
				if (haveDoorknob){
					prompt.innerHTML = "Ye put the knob on the door and fall through a trap door.";
					optActions = [37];
				}else{
					prompt.innerHTML = "Ye door has no knob.";
					optActions = [32];
				}
				opts = ["Continue"];
				break;
			case 37:
				desc.innerHTML = "Ye fall through the trap door.";
				prompt.innerHTML = "Ye in a room.";
				opts = ["Talk to man","Use computer","Hit computer"];
				optActions = [38,39,40];
				break;
			case 38:
				desc.innerHTML = "Ye talk to the man.";
				prompt.innerHTML = "Man: Ahaha ye fell for me trap.<br>Ye must finish my game to escape.";
				opts = ["Continue"];
				optActions = [37];
				break;
			case 39:
				desc.innerHTML = "Ye use the computer.";
				prompt.innerHTML = "Beep boop:";
				opts = ["Start game","Log off"];
				optActions = [41,37];
				break;
			case 40:
				desc.innerHTML = "Ye hit the computer.";
				prompt.innerHTML = "A frowny face appears on the screen.";
				opts = ["Continue"];
				optActions = [37];
				break;
			case 41:
				desc.innerHTML = "Running program: AdventuR...";
				prompt.innerHTML = "";
				restartGame = true;
				opts = ["Continue"];
				optActions = [41];
				break;
			default:console.log("default");return;
		}
		for(var i=0; i<choice.length; i++){
			if (opts[i]){
				// console.log("choicing "+i);
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

	var drawPlayer = function(){
		var pw = playerDisplay.width;
		var ph = playerDisplay.height;
		let armOffset = 0;
		ptx.fillStyle = "grey";
		ptx.fillRect(0, 0, pw, ph);
		ptx.fillStyle = "black";
		ptx.lineWidth = 7;
		//head
		ptx.beginPath();
		ptx.arc(pw/2,ph/3,20,0,2*pi);
		ptx.fill();
		//legs
		if(haveLegs){
			ptx.translate(pw/2,8/15*ph);
			ptx.beginPath();
			ptx.moveTo(0,0);
			ptx.lineTo(25,60);
			ptx.moveTo(0,0);
			ptx.lineTo(-25,60);
			ptx.stroke();
			ptx.translate(-pw/2,-8/15*ph);
		}
		//arms
		ptx.translate(pw/2,6/15*ph);
		if(haveBeef){
			armOffset = 20;
		}
		ptx.beginPath();
		ptx.arc(20+armOffset,20,5*strength,pi/4,-3*pi/4,true);
		ptx.fill();
		ptx.beginPath();
		ptx.moveTo(armOffset,0);
		ptx.lineTo(40+armOffset,40);
		ptx.stroke();
		if(robotArm){
			ptx.strokeStyle = "darkgrey";
			ptx.fillStyle = "darkgrey";
		}
		ptx.beginPath();
		ptx.arc(-20-armOffset,20,5*strength,-pi/4,3*pi/4,true);
		ptx.fill();
		ptx.beginPath();
		ptx.moveTo(-armOffset,0);
		ptx.lineTo(-40-armOffset,40);
		ptx.stroke();
		ptx.strokeStyle = "black";
		ptx.fillStyle = "black";
		//beef
		ptx.beginPath();
		ptx.moveTo(-armOffset-2,-2);
		ptx.lineTo(0,ph/8);
		ptx.lineTo(armOffset+2,-2);
		ptx.lineTo(-armOffset-2,-2);
		ptx.fill();
		ptx.translate(-pw/2,-6/15*ph);

		//body

		ptx.fillRect(pw/2-3,ph/3,6,ph/5);
		// console.log(playerDisplay.width,playerDisplay.height,playerDisplay.clientWidth,playerDisplay.clientHeight);
	}

	startGame();
})