import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import bcrypt from 'bcrypt';

const schema = new mongoose.Schema({
	email: {
		index: true,
		lowercase: true,
		match: [/\S+@\S+\.\S+/, 'is invalid'],
		required: [true, 'cannot be blank'],
		trim: true,
		type: String,
		unique: true,
	},
	password: {
		required: [true, 'cannot be blank'],
		trim: true,
		type: String,
	},
	role: {
		ref: 'Role',
		type: mongoose.Schema.Types.ObjectId,
	}
}, {
	timestamps: true
});

schema.plugin(uniqueValidator, {
	message: 'is already taken'
});

schema.pre('save', async function(next) {
	try {
		const hash = await bcrypt.hash(this.password, 10);
		this.password = hash;
	} catch(err) {
		return next(err);
	}

	next();
});

schema.statics.login = async function({ email, password}) {
	let user;

	try {
		user = await this.findOne({ email });
	} catch (err) {
		throw err;
	}

	if (!user) {
		const err = new Error('Email or password did not match, try again.');
		err.status = 401;
		throw err;
	}

	try {
		const result = await bcrypt.compare(password, user.password);
		if(result === true){
			return user;
		} else {
			const err = new Error('Email or password did not match, try again.');
			err.status = 401;
			throw err;
		}
	} catch (err) {
		throw err;
	}
};

module.exports = mongoose.model('User', schema);