const Joi = require('joi');
const bcrypt = require('bcrypt');
const {User} = require('../../models');
const config = require('../../config');
const ErrorHandler = require('../../services/ErrorHandler');
const JwtService = require('../../services/JwtService');
const {RefreshToken} = require('../../models');

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

    // check if user is in the database already
    try {
        const exist = await User.exists({ email: req.body.email });
        if (exist) {
            return next(ErrorHandler.alreadyExist('This email is already taken.'));
        }
    } catch(err) {
        return next(err);
    }
    const { name, email, password } = req.body;

    //hashing password.body
    const hashedPassword = await bcrypt.hash(password, 10);

    let access_token;
    let refresh_token;

    // prepare the model
        const user = new User({
            name,
            email,
            password: hashedPassword,
            refresh_token: null
        });

      const result = await user.save();
        //console.log(result);

    try {

        // Token
        access_token = JwtService.sign({ _id: result._id, role: result.role });
        refresh_token = JwtService.sign({ _id: result._id, role: result.role }, '1y', config.REFRESH_SECRET);

        // db whitelist refresh_tokens
        await RefreshToken.create({ token: refresh_token });

        //updating old refresh_token
            await User.updateOne({_id: user._id}, {$set: {refresh_token: refresh_token}});
    } catch(err) {
        
        //console.log(err)
        return next(err);
    }

        res.json({access_token, refresh_token});
	}
}

module.exports = registerController;