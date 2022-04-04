const router = require('express').Router();
const {registerController, loginController} = require('../controllers');

router.get('/', (req, res) => {res.send('<h3>Express server is running...</h3>')});

router.post('/register', registerController.register);
router.post('/login', loginController.login);

module.exports = router;