const config = require('../config');
const jwt = require('jsonwebtoken');

class JwtService{

	static sign(payload, expiry = '300s', secret = config.JWT_SECRET){

		return jwt.sign(payload, secret, {expiresIn: expiry});
	}
}

module.exports = JwtService;