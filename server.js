const express = require('express');
const path = require('path');
const config = require('./config');
const mainRouter = require('./routes');
const mongoose = require('mongoose');
const {errorHandler} = require('./middlewares');
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




app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use('/api',mainRouter);
app.use(errorHandler);





app.listen(config.PORT, () => {console.log(`Listening on port ${config.PORT}...`)});