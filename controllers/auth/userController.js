const {User} = require('../../models');
const ErrorHandler = require('../../services/ErrorHandler');

const userController = {

	async user(req, res, next){
		try{
			//console.log(req.user);
			const user = await User.findOne({_id: req.user._id}).select('-password -updatedAt -__v');
			if(!user){
				return next(ErrorHandler.notFound());
			}
			res.json(user);
		}catch(err){
			return next(err);
		}
	}
}

module.exports = userController;