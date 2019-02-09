const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	dateTime: Date,
	home: String,
	away: String

});

module.exports = mongoose.model("fixtures", schema);