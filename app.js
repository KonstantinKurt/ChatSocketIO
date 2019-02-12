const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const config = require('./config.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


const server = app.listen(config.PORT, () => {
    console.log(`Express lunched at http://localhost:'  ${config.PORT}  '; press Ctrl+C to disconnect`);
});
mongoose.connect(config.DBconnectionString, { useNewUrlParser: true }, function(err) {
    if (err) {
        return console.log(err);
    } else {
        console.log('Database connected succesfully!');
    }
});
const io = require('socket.io')(server);

io.on('connection', function(socket) {
    console.log(' User connected');

    socket.on('newMessage', function(data) {
        io.sockets.emit('newMessage', data);
    })
});