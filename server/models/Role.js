import mongoose from 'mongoose';

const schema = new mongoose.Schema({
	name: {
		required: true,
		unique: true,
		trim: true,
		type: String,
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('Role', schema);