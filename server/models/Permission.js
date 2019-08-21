import mongoose from 'mongoose';

const schema = new mongoose.Schema({
	method: {
		type: String,
		required: true,
		unique: true,
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('Permission', schema);