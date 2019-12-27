const express = require('express');
const bodyParser = require('body-parser');

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');





//Create Express App
const app = express();
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        "message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."
    });
});

// Require Notes routes
require('./app/routes/notes.routes.js')(app);

app.listen(5000, () => {
    console.log('Server is listening to port 5000');
});


mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(function () {
    console.log('Successfully connected to database');
}).catch(function (err) {
    console.log('Couldn\'t connect to database..Exiting now', err);
    process.exit();
});