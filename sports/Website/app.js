//Libs
const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const formidable = require('./middleware/formidable-express');

//Configs
const config = require('./config/database');
require('./auth/auth');

//Routes
const users = require('./routes/user_routes');
const players = require('./routes/player_routes');
const teams = require('./routes/team_routes');
const competitions = require('./routes/competition_routes');
const matches = require('./routes/match_routes');
const storage = require('./routes/storage_routes');

//Logging
const logger = require('./logging');

//Server
const app = express();
const port = 3000;

//Request
app.use(cors());

//Uploads
app.use(formidable());

//Statics
app.use(express.static(path.join(__dirname, 'dist')));

//Controllers
app.use('/api/players', passport.authenticate('jwt', { session : false }), players);
app.use('/api/teams', passport.authenticate('jwt', { session : false }), teams);
app.use('/api/competitions', passport.authenticate('jwt', { session : false }), competitions);
app.use('/api/matches', passport.authenticate('jwt', { session : false }), matches);
app.use('/api/storage', storage);
app.use('/api/users', users);

//Database
mongoose.connect(config.database);

mongoose.connection.on('connected', function() {
    console.log("im connected to " + config.database);
    //const crawler = require('./crawlers/zerozero/crawler')
    const gary_processor = require('./gary_processor/gary_processor')
    const notifications = require('./notifications/app');
});

mongoose.connection.on('error', function(err){
    console.log("Database error: " + err);
});

//Start
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, function(){
    console.log('Server started on port ' + port);
});