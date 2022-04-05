const router = require('express').Router();
const {auth} = require('../middlewares');
const {registerController, loginController, userController, refreshController} = require('../controllers');

router.get('/', (req, res) => {res.send('<h3>Express server is running...</h3>')});

router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.get('/user', auth, userController.user);
router.post('/refresh', refreshController.refresh);

module.exports = router;