"use strict";

// Class and Object Declaration------------------------------------------------------------

// Method to create the coutUp game itself
var countUpGame = {
	currentPoints: 1000,
	countScore: null,
	
	losePoints: function(pointValue){
		this.currentPoints -= pointValue;		
		return this.currentPoints
	},
	
	addPoints: function(pointValue) {
		this.currentPoints += pointValue;
		return this.currentPoints
	}
}

function countUpCard(cardSuit, cardRank){
	this.cardSuit = cardSuit;
	this.cardRank = cardRank;
	this.cardValue = null;
}

// Method to put an image on the cards 
countUpCard.prototype.cardImage = function() {
	var suitAbbr = this.cardSuit.substring(0,1).toLowerCase();
	return suitAbbr + this.cardValue + ".png"
};


// Method to create a deck of cards
function countUpDeck () {
	this.cards = new Array(52);
	
	var suits = ["Diamonds", "Clubs", "Spades", "Hearts"]
	var ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10",
					"J", "Q", "K", "A"];
					
	var cardCount = 0;
	for (var i = 0; i < 4; i++){
		for(var j = 0; j < 13; j++){
			this.cards[cardCount] = new countUpCard(suits[i], ranks[j]);
			this.cards[cardCount].cardValue = j+2;
			cardCount++;
		}
	}
	
	this.shuffle = function() {
		this.cards.sort(function() {
			return 0.5 - Math.random();
		});
	};
	
	this.dealTo = function(hand) {
		for (var i = 0; i < hand.cards.length; i++) {
			hand.cards[i] = this.cards.shift()
		}
	}
}

// Method to create a hand of cards.
function countUpHand(handLength) {
	this.cards = new Array(handLength);
}


			

// Game Operation Code---------------------------------------------------------------------
	
window.addEventListener("load", playCountUp);

function playCountUp() {
	var dealButton = document.getElementById("deal");
	var resetButton = document.getElementById("reset");
	var standButton = document.getElementById("stand");
	var handValue = document.getElementById("handValue");
	var pointsBox = document.getElementById("pointValue");
	var cardImages = document.querySelectorAll("img.cardImg");
	var scoreBox = document.getElementById("scoreValue");
	
	
	// Storing the value of the points
	pointsBox.value = countUpGame.currentPoints;
	
	// Create a deck of cards
	var gameDeck = new countUpDeck();
	gameDeck.shuffle();
	console.log(gameDeck);
	
	
	//Create a count up hand
	var gameHand = new countUpHand(5);
	
	// Click the deal button
	dealButton.addEventListener("click", function() {
		countUpGame.countScore = null;
		scoreBox.value = "";
		if (countUpGame.currentPoints > 25) {
			disableButton(dealButton);
			enableButton(resetButton);
			enableButton(standButton);
		
			if (gameDeck.cards.length < 5) {
				gameDeck = new countUpDeck;
				gameDeck.shuffle();
			}
			
			gameDeck.dealTo(gameHand);
			
		
			for (var i = 0; i < cardImages.length; i++){
				if (i < 2) {
					cardImages[i].src = gameHand.cards[i].cardImage();
					cardImages[i].discard = false;
						
				}
				else if (i => 2){
					cardImages[i].src = "ag_cardback.png";
					cardImages[i].index = i;
					cardImages[i].discard = true;
					cardImages[i].onclick = function(e) {
						e.target.src = gameHand.cards[e.target.index].cardImage();
						e.target.discard = false;
					}
				}			
			}
		}
		else {
		alert("You do not have enough points! You must reset the game.");
		}
		console.log(gameHand);
	});
	
	// Click the stand button
	standButton.addEventListener("click", function() {
		disableButton(standButton);
		enableButton(dealButton);
		disableButton(resetButton);
		
		for (var i = 0; i < cardImages.length; i++){
			console.log(cardImages[i].discard);
			if (cardImages[i].discard == false){
				console.log(gameHand.cards[i]);
				if (gameHand.cards[i].cardValue <= 10){
					countUpGame.countScore += gameHand.cards[i].cardValue;
				}
				else if (gameHand.cards[i].cardValue == 14){
					countUpGame.countScore += 11
				}
			    else if (gameHand.cards[i].cardValue > 10 && gameHand.cards[i].cardValue < 14 )
				{countUpGame.countScore += 10;}
			}
			cardImages[i].onclick = null;
		}
		
		if (countUpGame.countScore <= 21) {
			pointsBox.value = countUpGame.losePoints(25);
		}
		else if (countUpGame.countScore >= 22 && countUpGame.countScore <= 23) {
			pointsBox.value = countUpGame.addPoints(25);
		}
		else if (countUpGame.countScore >=24 && countUpGame.countScore <= 25) {
			pointsBox.value = countUpGame.addPoints(50);
		}
		else if (countUpGame.countScore >= 26 && countUpGame.countScore <= 27) {
			pointsBox.value = countUpGame.addPoints(100);
		}
		else if (countUpGame.countScore >= 28 && countUpGame.countScore <= 29) {
			pointsBox.value = countUpGame.addPoints(150);
		}
		else if (countUpGame.countScore == 30) {
			pointsBox.value = countUpGame.addPoints(200);
		}
		else if (countUpGame.countScore > 30) {
			pointsBox.value = countUpGame.losePoints(50);
			alert("Too Many Points! You Lose 50 points");
		}
		scoreBox.value = countUpGame.countScore;
		
		console.log(countUpGame.countScore);
	});
	
	// Click the reset button
	resetButton.addEventListener("click", function() {
		countUpGame.currentPoints = 1000;
		pointsBox.value = countUpGame.currentPoints;
		countUpGame.countScore = null;
		enableButton(dealButton);
		disableButton(standButton);
		disableButton(resetButton);
		
		for (var i = 0; i < cardImages.length; i++) {
			cardImages[i].src = "ag_trans.gif";
		}
			
	});
	
	// method to disable the buttons on click
	function disableButton(btn) {
		btn.disabled = true;
		btn.style.opacity = 0.25;
	};
	
	// Method to enable the buttons on click
	function enableButton(btn) {
		btn.disabled = false;
		btn.style.opacity = 1;
	};	
}

