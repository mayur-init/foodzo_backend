const Joi = require('joi');
const {User} = require('../../models');
const ErrorHandler = require('../../errors/ErrorHandler');

const registerController = {

	async register(req, res, next){

		// Validation
        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            repeat_password: Joi.ref('password')
        });

        const { error } = registerSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        //check if the user is in the data base -- data base integration


        res.send('Hello form express...');
	}
}

module.exports = registerController;