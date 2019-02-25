const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'cannot be blank'],
		match: [/\S+@\S+\.\S+/, 'is invalid'],
		trim: true,
		lowercase: true,
		index: true,
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'cannot be blank'],
		trim: true,
	}
}, {
	timestamps: true
});

schema.plugin(uniqueValidator, {
	message: 'is already taken'
});

schema.pre('save', function(next) {
	bcrypt.hash(this.password, 10).then(function(hashedPassword) {
		this.password = hashedPassword;
		next();
	}).catch(function(err) {
		next(err);
	});
});




module.exports = mongoose.model("users", schema);