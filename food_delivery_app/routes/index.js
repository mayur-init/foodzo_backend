const router = require('express').Router();


router.get('/', (req, res) => {res.send('<h3>Welcome to the express server...</h3>')});

module.exports = router;