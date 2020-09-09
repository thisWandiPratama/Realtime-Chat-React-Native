const express = require("express");
var app = express();
var server   = require('http').createServer(app);
var io = require('socket.io').listen(server)
var port = 3000;

io.on("connection", socket => {
    console.log("a user connected : D");
    socket.on("chat message", msg => {
        console.log(msg);
        io.emit("chat message", msg)
    })
});

server.listen(port, () => console.log("Server Running On Port :" + port));