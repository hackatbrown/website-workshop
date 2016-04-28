var MagicNumber = require("../shared/MagicNumber.js");

console.log("index!");
console.log("guessed " + MagicNumber.guess(20) ? "right!" : "wrong!");
console.log("the magic number was: " + MagicNumber.reveal());
