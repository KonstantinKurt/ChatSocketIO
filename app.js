const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



const config = require('./config.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


let server = app.listen(config.PORT, () => {
    console.log(`Express lunched at http://localhost:'  ${config.PORT}  '; press Ctrl+C to disconnect`);
});
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log(`User connected succsesfully! Socket id ${socket.id}`);
   
    socket.on('newMessage', (data) => {
        console.log('Data recieved!', data);
         io.sockets.emit('newMassege', data);
    });
    // socket.on('disconnect', ()=> {
    //     console.log('user disconnected');
    // });
    //io.emit('message', { content: 'You are connected!'});
});
mongoose.connect(config.DBconnectionString, { useNewUrlParser: true }, function(err) {
    if (err) {
        return console.log(err);
    } else {
        console.log('Database connected succesfully!');
    }
});