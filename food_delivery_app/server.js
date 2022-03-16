const express = require('express');
const path = require('path');
const config = require('./config');
const mainRouter = require('./routes')
const errorHandler = require('./middlewares/errorHandler');
const app = express();

//data base connection

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use('/api',mainRouter);
app.use(errorHandler);





app.listen(config.PORT, () => {console.log(`Listening on port ${config.PORT}...`)});