import mongoose from 'mongoose';

const schema = new mongoose.Schema({
	age: Number,
	apps: Number,
	contactInfo: {
		email: String,
		phoneNumber: String,
	},
	firstName: String,
	goals: Number,
	lastName: String,
	length: Number,
	nickName: String,
	number: Number,
	position: String,
	preferredFoot: String,
	stats: {
		attacker: Number,
		beast: Number,
		defence: Number,
		defender: Number,
		dribbling: Number,
		pace: Number,
		passing: Number,
		physical: Number,
		shooting: Number,
		styleOfPlay: String,
	},
}, {
	timestamps: true
});

module.exports = mongoose.model('Player', schema);