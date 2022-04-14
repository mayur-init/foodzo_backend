const registerController = require('./auth/registerController');
const loginController = require('./auth/loginController');
const userController = require('./auth/userController');
const refreshController = require('./auth/refreshController');
const productController = require('./product/productController');

module.exports = {
	registerController,
	loginController,
	userController,
	refreshController,
	productController
};