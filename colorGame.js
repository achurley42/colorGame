var numberOfSquares = 6;
var colors= [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message")
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
	//mode button listeners
	setupModeButtons();
	//changes colors and adds click listeners
	setupSquares();
	reset();
}

function reset() {
	colors = generateRandomColors(numberOfSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for(var i=0; i<squares.length; i++) {
		if(colors[i]){
			squares[i].style.display="block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display="none";
		}
	}
	messageDisplay.textContent="";
	resetButton.textContent="New Colors";
	h1.style.backgroundColor="steelblue";
	messageDisplay.classList.remove("winning");
	messageDisplay.classList.remove("losing");
}

resetButton.addEventListener("click", function() {
	reset();
});

function changeColors(color) {
	for(i=0;i<squares.length;i++) {
		squares[i].style.backgroundColor=pickedColor;
	}
}

function pickColor() {
	var random = Math.floor(Math.random()*colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	//make array
	var arr=[];
	//add num random colors to array
	for(var i =0; i<num; i++) {
		arr.push(randomColor(num));
	}

	return arr;
}

function randomColor() {
	var r = Math.floor(Math.random()*256);
	var g = Math.floor(Math.random()*256);
	var b = Math.floor(Math.random()*256);
	return "rgb("+r+", "+g+", "+b+")";
}

function setupModeButtons() {
	for(var i=0; i<modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			for (var j=0; j<modeButtons.length; j++) {
				modeButtons[j].classList.remove("selected");
			}
			this.classList.add("selected");
			if (this.textContent=="Easy") {
				numberOfSquares=3;
			} else if(this.textContent=="Hard") {
				numberOfSquares = 6;
			} else if(this.textContent=="Very Hard") {
				numberOfSquares=9;
			} else if(this.textContent=="Extra Hard") {
				numberOfSquares=12;
			} else if(this.textContent=="Super Easy") {
				numberOfSquares=1;
			};
			reset();
		});
	};	
}

function setupSquares() {
	for(var i=0; i<squares.length; i++) {
		squares[i].style.backgroundColor = colors[i];

	    squares[i].addEventListener("click", function() {
			var clickedColor = this.style.backgroundColor;
			if (clickedColor===pickedColor) {
				changeColors(clickedColor);
				messageDisplay.textContent="Correct!";
				messageDisplay.classList.remove("remove");
				messageDisplay.classList.add("winning");
				h1.style.backgroundColor = clickedColor;
				resetButton.textContent="Play Again?"
			} else {
				this.style.backgroundColor="#232323";
				messageDisplay.textContent="Try Again";
				messageDisplay.classList.add("losing");
			}
		});
	}
}