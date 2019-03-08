const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

//Create collection User with 
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
	//must have arrow functions
	bcrypt.hash(this.password, 10).then(hashedPassword => {
		this.password = hashedPassword;
		next();
	}).catch(function(err) {
		next(err);
	});
});

schema.statics.login = function({ email, password }, callback) {
	this.findOne({ email }).then(function(user) {
		if (!user) {
			const err = new Error('Couldn\'t find email');
			err.status = 401;
			throw err;
		};

		bcrypt.compare(password, user.password).then(function(valid) {
			console.log(valid)
			if (!valid) {
				const err = new Error('Correct email, but wrong password!');
				err.status = 401;
				throw err;
			}

			callback();
		}).catch(function(err) {
			callback(err);
		});
	}).catch(function(err) {
		callback(err);
	});
};


module.exports = mongoose.model("users", schema);