var friendData = require("../data/friends.js");

module.exports = function (app) {

	app.get("/api/potetialFriends", function(req, res) {
		res.json(friendData);
	})

	app.post("/api/potetialFriends", function(req, res) {

		var newMatch = req.body;

		for(var i = 0; i < newMatch.scores.length; i++) {
			if(newMatch.scores[i] == "1 (Strongly Disagree)") {
				newMatch.scores[i] = 1;
			} else if(newMatch.scores[i] == "5 (Strongly Agree)") {
				newMatch.scores[i] = 5;
			} else {
				newMatch.scores[i] = parseInt(newMatch.scores[i]);
			}
		}

		var comparisonArray = [];

		for(var i = 0; i < friendData.length; i++) {

			var compareFriend = friendData[i];

			var finalComparison = 0;

			for(var a = 0; a < compareFriend.scores.length; a++) {

				var compareScores = Math.abs(compareFriend.scores[a] - newMatch.scores[a]);

				finalComparison += compareScores; 
			}

			comparisonArray[i] = finalComparison;
		}

		var bestMatchNum = comparisonArray[0];

		var bestMatchIndex = 0;

		for (var i = 1; i < comparisonArray.length; i++) {
			if(comparisonArray[i] < bestMatchNum) {
				bestMatchNum = comparisonArray[i];
				bestMatchIndex = i;
			}
		}

		friendData.push(newMatch);

		res.json(friendData[bestMatchIndex]);
	})

}