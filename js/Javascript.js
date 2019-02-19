//Jayson van den Berg A2

var speelbord = document.getElementById("plattegrond");
var randomWord, keysWord = '';
var win = false;
var type = true;
var Rij = 1;
var plaats = 1;


function start(){
	randomLingo = words[Math.floor(Math.random() * words.length)];
	console.log(randomLingo);
	for( row=1; row<6; row++){
		var spaRij = document.createElement("div");
			spaRij.id = ("r_" + row);
			speelbord.appendChild(spaRij);
	for(colomn=1; colomn<6; colomn++){
		var divColomn = document.createElement("div");
			divColomn.id = ("c_" + row + "." + colomn);
			spaRij.appendChild(divColomn);


		var p = document.createElement("p");
		p.style.position = "absolute";
		p.style.margin = "0";
	    p.style.lineHeight = "50px";
		p.style.textAlign = "center";
		p.style.width = "50px";

	  if (colomn == 1){
		p.innerHTML = randomLingo.charAt(0).toUpperCase();
		p.style.opacity = "0.2";
		}
		divColomn.appendChild(p);
	}	
  }	
}
start();


document.onkeypress = function(event){
  var key_press = String.fromCharCode(event.keyCode);
   if (key_press.match(/[a-z]/i) && Rij <= 5 && type == true) {
      var click = document.getElementById("c_" + Rij + "." + plaats++).firstChild;
      click.innerHTML = key_press.toUpperCase();
      click.style.opacity = "1.0";
      keysWord += key_press.toLowerCase();

	    if(plaats > 5){
		   check(keysWord);
		   Rij++;

			//Little Delay after BR
			if(Rij > 5 && win == false){
				setTimeout(function(){
				alert("Fout! het word was: " + randomLingo);
				window.location.reload();
			}, 500);
		 }
		plaats = 1;
		keysWord = "";
		type = false;
		setTimeout(function(){
		  type = true;
	   }, 1000);
    }
  }
}


function check(guessWord){
  var goed = randomLingo.split("");
  var wordSplit = guessWord.split("");

	for (var i = 0; i < goed.length; i++){
	  if (wordSplit[i] == goed[i]){
		var column = document.getElementById("c_" + Rij + "." + (i+1));
		column.style.backgroundColor = "green";
		goed[i] = "";
		wordSplit[i] = "*";
	  } 
	}



	if(checkAllValues(wordSplit) == true){
		win = true;
		setTimeout(function(){
			alert("goed gedaan!");
		window.location.reload();
		}, 500);
	}


for (var i = 0; i < goed.length; i++){
  for (var j = 0; j < goed.length; j++){
	 if (wordSplit[i] == goed[j]){
		var column = document.getElementById("c_" + Rij + "." + (i+1));
		column.style.backgroundColor = "yellow";
		column.style.borderRadius = "20%";
		wordSplit[i] = "*";
		goed[j] = "";
     }
   }
  }
}


function checkAllValues(myArray){
  for (var i = 0; i < myArray.length; i++){
    if(myArray[i] != "*"){
    	return false;
    }
  }
 return true;
}
