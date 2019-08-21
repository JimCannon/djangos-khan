import mongoose from 'mongoose';

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	}, 
	url: {
		type: String,
		required: true,
		unique: true,
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('Resource', schema);