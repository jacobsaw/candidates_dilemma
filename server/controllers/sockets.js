module.exports = function(server) {
    var mongoose = require('mongoose');
    var Candidate = mongoose.model('Candidate');
    var io = require('socket.io').listen(server);

    var current_candidates = [];

    io.sockets.on('connection', function(socket) {
        var user;
        socket.on('user_login', function(data) {
            if (data.name == "MODERATOR") {
                // socket.broadcast.emit('moderator_login');
                return;
            }
            Candidate.findOne({name:data.name}, function(err, candidate) {
                if (candidate) {
                    user = candidate;
                } else {
                    user = new Candidate({
                        name: data.name,
                        voters: 0,
                        debates: []
                    });
                    user.save(function(err) { console.log(err); })
                }
                current_candidates.push(data.name);
                socket.emit('confirm_login', {user:user});
            });
        });
    });
}
