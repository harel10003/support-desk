const asyncHandler = require('express-async-handler');

const Note = require('../models/noteModel');
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

// @desc Get user notes
//@route GET /api/tickets/:ticketId/note
//@access Private
const getNotes = asyncHandler(async (req, res) => {
	//get user using the id in the JWT
	const user = await User.findById(req.user.id);
	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}
	console.log(req.user.id);
	console.log(req.params.ticketId);
	const ticket = await Ticket.findById(req.params.ticketId);
	if (ticket.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorizad');
	}

	const notes = await Note.find({ ticket: req.params.ticketId });

	res.status(200).json(notes);
});

// @desc Create ticket note
//@route POST /api/tickets/:ticketId/note
//@access Private
const addNote = asyncHandler(async (req, res) => {
	//get user using the id in the JWT
	const user = await User.findById(req.user.id);
	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}
	console.log(req.user.id);
	console.log(req.params.ticketId);
	const ticket = await Ticket.findById(req.params.ticketId);
	if (ticket.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorizad');
	}

	const note = await Note.create({
		text: req.body.text,
		isStuff: false,
		ticket: req.params.ticketId,
		user: req.user.id,
	});

	res.status(200).json(note);
});

module.exports = { getNotes, addNote };
