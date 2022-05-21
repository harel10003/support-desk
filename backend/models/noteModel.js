const mongoose = require('mongoose');

const noteSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User', //objectid from User schema
		},
		ticket: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Ticket', //objectid from User schema
		},
		text: {
			type: String,
			required: [true, 'Please add some text'],
		},
		isStaff: {
			type: Boolean,
			default: false,
		},
		staffId: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Note', noteSchema);
