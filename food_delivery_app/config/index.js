const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	PORT,
	DEBUG_MODE,
	DB_URL,
	JWT_SECRET
} = process.env;