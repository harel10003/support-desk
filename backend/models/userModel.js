const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
	{
		name: { type: String, required: [true, 'Please add nmae'] },
		email: {
			type: String,
			required: [true, 'Please add email'],
			unique: true,
		},
		password: { type: String, required: [true, 'Please add password'] },
		isAdmin: {
			type: Boolean,
			require: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Users', userSchema);
