import mongoose from 'mongoose';

const schema = new mongoose.Schema({
	role: {
		ref: 'Role',
		type: mongoose.Schema.Types.ObjectId,
	},
	resource: {
		ref: 'Resource',
		type: mongoose.Schema.Types.ObjectId,
	},
	permission: {
		ref: 'Permission',
		type: mongoose.Schema.Types.ObjectId,
	}
}, {
	timestamps: true
});

schema.index({ role: 1, resource: 1, permission: 1 }, { unique: true });

module.exports = mongoose.model('Auth', schema);