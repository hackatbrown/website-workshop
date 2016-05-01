var number = 42;

module.exports = {
	guess: function(guessed) {
		return guessed === number;
	},
	reveal: function() {
		return number;
	}
};
