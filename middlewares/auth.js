const ErrorHandler = require('../services/ErrorHandler');
const JwtService = require('../services/JwtService');
const auth = async (req, res, next) => {
	let authHeader = req.headers.authorization;

	if(!authHeader){
		return next(ErrorHandler.unAuthorized());
	}
	const token = authHeader.split(' ')[1];
	//console.log(token);

	try{
		const {_id, role} = await JwtService.verify(token);
		//attaching a empty object
		const user = {
			_id,
			role,
		}

		req.user = user;
		//console.log(req.user);
		next();

	}catch(err){
		//console.log(err);
		return next(ErrorHandler.unAuthorized());
	}
}

module.exports = auth; 