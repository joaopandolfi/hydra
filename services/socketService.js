const configs = require('../configurations/pass')
const SockerService = {}

var connecteds = {}

SockerService.Register = (http) =>{
    var io = require('socket.io')(http);
    
    io.on('connection', function(socket){
        console.log('A user connected :D');
        connecteds[socket.id] = socket

        socket.emit("welcome",{msg:"welcome"})

        socket.on('disconnect', function(){
            connecteds[socket.id] = null
            delete connecteds[socket.id]
            console.log(`user (${socket.id}) disconnected :(`);
        });
    });
}

module.exports = SockerService
