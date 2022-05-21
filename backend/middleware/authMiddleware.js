const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
	let token;
	//check if the token in header and start in Bearer
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			//get token from the header (after Bearer is space and we need only the token [1]in arr)
			token = req.headers.authorization.split(' ')[1];
			//Verify token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			//GET USER FROM TOKEN
			req.user = await User.findById(decoded.id).select('-password');

			next();
		} catch (error) {
			console.log(error);
			res.status(401);
			throw new Error('Not authorized');
		}
	}
	if (!token) {
		res.status(401);
		throw new Error('Not authorized1');
	}
});

module.exports = { protect };
