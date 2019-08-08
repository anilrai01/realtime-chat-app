//Make Connection
var socket = io.connect('http://localhost:4000');

// Query DOM
var message = document.querySelector('.message'),
      handle = document.querySelector('.handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');


 //Emmiting an event and sedning object to server
 btn.addEventListener('click', function(){
 	socket.emit('chat', {
 		handle: handle.value,
 		message: message.value
 	});
 })

 //Firing Keypress event
 message.addEventListener('keypress', function(){
 	socket.emit('typing', handle.value);
 })

 //Listening to new messages
 socket.on('chat', function(data){
 	feedback.innerHTML = "";
 	message.value = "";
 	output.innerHTML += `<p><strong>${data.handle}: </strong>${data.message}</p>`;
 })

 //Listening to broadcasting
 socket.on('typing', function(data){
 	feedback.innerHTML = `<p><em>${data} is typing ... </em></p>`;
 })

