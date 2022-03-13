const express = require('express');
const path = require('path');
const config = require('./config');
const mainRouter = require('./routes')
const errorHandler = require('./middlewares/errorHandler');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(errorHandler);
app.use(mainRouter);
app.use(express.json());





app.listen(config.PORT, () => {console.log(`Listening on port ${config.PORT}...`)});