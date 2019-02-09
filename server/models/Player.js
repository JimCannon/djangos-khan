const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	nickName: String,
	contactInfo: {
		email: String,
		phoneNumber: String,
	},
	position: String,
	apps: Number,
	goals: Number,
	age: Number,
	number: Number,
	preferredFoot: String,
	length: Number,
	stats: {
		pace: Number,
		shooting: Number,
		passing: Number,
		dribbling: Number,
		defence: Number,
		physical: Number,
		attacker: Number,
		defender: Number,
		styleOfPlay: String,
		beast: Number
	}
});

module.exports = mongoose.model("players", schema);