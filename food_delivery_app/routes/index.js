const router = require('express').Router();
const {registerController} = require('../controllers');

router.get('/', (req, res) => {res.send('<h3>Express server is running...</h3>')});

router.post('/register', registerController.register);

module.exports = router;