const Joi = require('joi');
const {RefreshToken, User} = require('../../models');
const ErrorHandler = require('../../services/ErrorHandler');
const JwtService = require('../../services/JwtService');
const config = require('../../config');

const refreshController = {
	async refresh(req, res, next){

		// Validation
        const refreshSchema = Joi.object({
            refresh_token: Joi.string().required(),
        });
        const { error } = refreshSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        //checking if refresh_token is in the db
        let refreshToken
        try{
        	refreshToken = await RefreshToken.findOne({token: req.body.refresh_token});
        	if(!refreshToken){
        		return next(ErrorHandler.unAuthorized('Invalid refresh token'));
        	}


        	let userId;
        	try{
        		const {_id} = await JwtService.verify(refreshToken.token, config.REFRESH_SECRET);
        		userId = _id;
        	}catch(err){
        		return next(ErrorHandler.unAuthorized('Invalid refresh token'));	
        	}

        	//checking if the user is in the db
        	const user = await User.findOne({_id: userId});
        	if(!user){
        		return next(ErrorHandler.unAuthorized('User not found'));
        	}

        	//generating new access and refresh tokens
        	const access_token = JwtService.sign({ _id: user._id, role: user.role });
            const refresh_token = JwtService.sign({ _id: user._id, role: user.role }, '1y', config.REFRESH_SECRET);

            //deleting old refresh_token
            await RefreshToken.deleteOne({token: req.body.refresh_token});
            
            // db whitelist refresh_tokens
            await RefreshToken.create({ token: refresh_token });

            res.json({access_token, refresh_token});

        }catch(err){
        	return next(new Error('Something went wrong ' + err.message));
        }
	}
};

module.exports = refreshController;