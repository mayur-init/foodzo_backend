const Joi = require('joi');
const bcrypt = require('bcrypt');
const {User} = require('../../models');
const JwtService = require('../../services/JwtService');
const ErrorHandler = require('../../services/ErrorHandler');

const loginController = {

	async login(req, res, next){

		// Validation
        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        });
        const { error } = loginSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        //checking if the user is not in db
         try{
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return next(ErrorHandler.wrongCredentials());
            }
            // compare the password using bcrypt
            const correctPassword = await bcrypt.compare(req.body.password, user.password);
            if (!correctPassword) {
                return next(ErrorHandler.wrongCredentials());
            }

            //generating tokens
            const access_token = JwtService.sign({ _id: user._id, role: user.role });

            res.json({access_token});
		}catch(err){
            return next(err);
		}
	}
};

module.exports = loginController;