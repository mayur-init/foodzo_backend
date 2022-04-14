const router = require('express').Router();
const {auth} = require('../middlewares');
const {registerController, loginController, userController, refreshController, productController} = require('../controllers');


router.get('/', (req, res) => {res.send('<h3>Express server is running...</h3>')});

// user related routes
router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.get('/user', auth, userController.user);
router.post('/refresh', refreshController.refresh);
router.post('/logout', auth, loginController.logout);

//product related routes
router.get('/products', productController.getProducts);
router.post('/products', /*auth,*/ productController.addProduct);
router.get('/products/:productId', productController.viewProduct);
router.put('/products/:productId', /*auth,*/ productController.updateProduct);
router.delete('/products/:productId', /*auth,*/ productController.removeProduct);


module.exports = router;