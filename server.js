const express = require("express");
var path = require("path");
const app = express();
app.use(express.static(path.join(__dirname + "/static")));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
const server = app.listen(8000);
const io = require("socket.io")(server);
var allMsgs = [];

require("./server/routes")(app);

io.on('connection', function(socket){

    socket.on('mouse_activity', function(data){
        socket.broadcast.emit('all_mouse_activity', {session_id: socket.id, coords: data});
    })
    
    socket.on('send', function(data){
        allMsgs.push(data);
        io.emit('showMsg', allMsgs);
    });

    io.emit('start', allMsgs);

});