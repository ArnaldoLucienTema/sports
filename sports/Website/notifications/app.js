var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
});

io.on('connection', (socket) => {

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('recommendation', (data) => {
        // we tell the client to execute 'new message'
        socket.broadcast.emit('recommendation', data);
    });
    
    socket.on('achievement', () => {
        socket.broadcast.emit('achievement', {
            message: "I'm achieved!"
        });
    });
});

http.listen(5000, function(){
    console.log('listening on *:5000');
});