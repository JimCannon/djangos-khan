const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	firstName: String
});

module.exports = mongoose.model("users", schema);