//Advent of Code - Day 6 - Puzzle 2
//Takes string of numbers separated by whitespace
//Runs redistribution pattern
//Returns number of iterations before finding a repeat
function redistributeDiff(input) {
	//Make thisRound an array of integers
	var thisRound = input.split(/\s/);
	var banks = thisRound.length;
	for (var i = 0; i < banks; i++) {
		thisRound[i] *=1;
	}
	var rounds = [];
	var thisRoundString = thisRound.join(" ");
	var times = 0;
	do {
		rounds.push(thisRoundString);
		var maxFacts = arrayMax(thisRound);
		var amountDist, amountLeft;
		//At least one is distributed everywhere else
		if (maxFacts[0] >= (banks-1)) {
			amountDist = Math.floor(maxFacts[0] / (banks-1));
			amountLeft = maxFacts[0] - (amountDist * (banks-1));
			for (var r = 0; r < banks; r++) {
				if (r == maxFacts[1]) {
					thisRound[r] = amountLeft;
				}
				else {
					thisRound[r] += amountDist;
				}
			}
		}
		//Less to distribute than banks
		else {
			amountDist = maxFacts[0];
			var index = maxFacts[1];
			thisRound[index] = 0;
			index++;
			for (index; amountDist > 0; amountDist--) {
				if (index == banks) { //Wrap around
					index = 0;
				}
				thisRound[index]++;
				index++;
			}
		}
		thisRoundString = thisRound.join(" ");
		times++;
	}
	while (!rounds.includes(thisRoundString));
	return (times - rounds.indexOf(thisRoundString));
}
