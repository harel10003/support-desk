const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		// const conn = await mongoose.connect(
		// 	'mongodb+srv://harel-mern:harel162@mern-tickets.e2zjk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
		// );
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(
			`MongoDB Connected": ${conn.connection.host}`.cyan.underline
		);
	} catch (error) {
		console.log(`Error: ${error.massege}`.red.underline.bold);
		process.exit(1);
	}
};
module.exports = connectDB;
