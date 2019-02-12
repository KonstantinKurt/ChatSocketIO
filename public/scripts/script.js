;
"use strict";
let onloads = [];

//let socket = io.connect('http://localhost:3000/');
let socket = io();
socket.on('newMessage', (data) => {
    console.log('Data goes back from server!');
    let li = document.createElement('li');
    li.innerHTML = '<span style="color:red">' + data.userName + '</span><span>:    ' + data.message + '</span>';
    document.getElementById('messagesList').appendChild(li);

});
let writeMessage = function() {
    document.getElementById('writeMessage').onclick = () => {
        socket.emit('newMessage', {
            message: document.getElementById('message').value,
            userName: document.getElementById('userName').value,
        })
        console.log('socket  - server');
    };
};


onloads.push(writeMessage);
window.onload = () => {
    for (let i in onloads) {
        onloads[i]();
    }
};