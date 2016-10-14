module.exports = function(server) {
    var mongoose = require('mongoose');
    var Candidate = mongoose.model('Candidate');
    var io = require('socket.io').listen(server);

    var current_candidates = [];
    var choices = [true, true];
    var responses = [];

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
        socket.on('game_start', function(data){
            socket.broadcast.emit('players_joined', data);
        });
        socket.on('user_choice', function(data){
            choices[data.player]=data.choice;
            responses[data.player]=true;
            if(responses[0]&&responses[1]){
                var score;
                var opponent;
                (data.player)?opponent=0:opponent=1;
                if(choices[data.player]&&choices[opponent]){
                    score=7;
                }
                else if(choices[data.player]&&!choices[opponent]){
                    score=0;
                }
                else if(!choices[data.player]&&choices[opponent]){
                    score=12;
                }
                else(!choices[data.player]&&!choices[opponent]){
                    score=4;
                }
                Candidate.findOne({name: user.name}, function(err, candidate){
                     candidate.voters = score;
                     candidate.save(function(err){
                        io.broadcast('choices_final');
                     })
                });
            }
        });
}
