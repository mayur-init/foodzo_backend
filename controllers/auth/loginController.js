const Joi = require('joi');
const bcrypt = require('bcryptjs');
const {User, RefreshToken} = require('../../models');
const config = require('../../config');
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
            const refresh_token = JwtService.sign({ _id: user._id, role: user.role }, '1y', config.REFRESH_SECRET);

             //deleting old refresh_token
            await RefreshToken.deleteOne({token: user.refresh_token});

             // db whitelist refresh_tokens
            await RefreshToken.create({ token: refresh_token });

            //updating old refresh_token
            await User.updateOne({_id: user._id}, {$set: {refresh_token: refresh_token}});

            res.json({access_token, refresh_token});
		}catch(err){
            return next(err);
		}
	},

    async logout(req, res, next){

        //validating refresh_token
        const refreshSchema = Joi.object({
            refresh_token: Joi.string().required(),
        });
        const { error } = refreshSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        //logout 
        try{
            await RefreshToken.deleteOne({token: req.body.refresh_token});
        }catch(err){
            return next(new Error('Something went wrong in the database' + err.message));
        }

        res.json({status: 1});
    }
};

module.exports = loginController;