var number = 20;

module.exports = {
	guess: function(guessed) {
		return guessed === number;
	},
	reveal: function() {
		return number;
	}
};
