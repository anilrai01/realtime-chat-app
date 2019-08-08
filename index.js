var express = require('express');
var socket = require('socket.io');

//App setup
var app = express();
var server = app.listen(4000, function(){
	console.log("Listening to request on port no 4000");
});

//static files
app.use(express.static('public'));


//Socket setup
var io = socket(server);

io.on('connection', function(socket){
	console.log("Made Socket Connection");

	//Grab all the active sockets and distribute the message that server receives
	//Broadcasting message
	socket.on('chat', function(data){
		io.sockets.emit('chat', data);
	});

	socket.on('typing', function(data){
		socket.broadcast.emit('typing',data);
	})
})