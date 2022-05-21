const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

// @desc Get user tickets
//@route GET /api/tickets
//@access Private
const getTickets = asyncHandler(async (req, res) => {
	//get user using the id in the JWT
	const user = await User.findById(req.user.id);
	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	const tickets = await Ticket.find({ user: req.user.id });

	res.status(200).json(tickets);
});

// @desc Get user ticket
//@route GET /api/tickets/:id
//@access Private
const getTicket = asyncHandler(async (req, res) => {
	//get user using the id in the JWT
	const user = await User.findById(req.user.id);
	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	const ticket = await Ticket.findById(req.params.id);
	if (!ticket) {
		res.status(404);
		throw new Error('Ticket not found');
	}

	if (ticket.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('Not Authorizad');
	}

	res.status(200).json(ticket);
});

// @desc create a new tickets
//@route POST /api/tickets
//@access Private
const createTicket = asyncHandler(async (req, res) => {
	const { product, description } = req.body;
	if (!product || !description) {
		res.status(400);
		throw new Error('Please add product or description');
	}
	//get user using the id in the JWT
	const user = await User.findById(req.user.id);
	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	const ticket = await Ticket.create({
		product,
		description,
		user: req.user.id,
		status: 'new',
	});

	res.status(201).json(ticket);
});

// @desc DELETE ticket
//@route DELETE /api/tickets/:id
//@access Private
const deleteTicket = asyncHandler(async (req, res) => {
	//get user using the id in the JWT
	const user = await User.findById(req.user.id);
	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	const ticket = await Ticket.findById(req.params.id);
	if (!ticket) {
		res.status(404);
		throw new Error('Ticket not found');
	}

	if (ticket.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('Not Authorizad');
	}
	// await ticket.deleteOne();
	await ticket.remove();

	res.status(200).json({ success: true });
});

// @desc UPDATE ticket
//@route PUT /api/tickets/:id
//@access Private
const updateTicket = asyncHandler(async (req, res) => {
	//get user using the id in the JWT
	const user = await User.findById(req.user.id);
	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	const ticket = await Ticket.findById(req.params.id);
	if (!ticket) {
		res.status(404);
		throw new Error('Ticket not found');
	}

	if (ticket.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('Not Authorizad');
	}
	const updateTicket = await Ticket.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true }
	);
	res.status(200).json(updateTicket);
});
module.exports = {
	getTickets,
	createTicket,
	getTicket,
	deleteTicket,
	updateTicket,
};
