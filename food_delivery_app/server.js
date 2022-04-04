const express = require('express');
const path = require('path');
const config = require('./config');
const mainRouter = require('./routes');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler');
const app = express();

//data base connection
mongoose.connect(config.DB_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB connected...');
});


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use('/api',mainRouter);
app.use(errorHandler);





app.listen(config.PORT, () => {console.log(`Listening on port ${config.PORT}...`)});