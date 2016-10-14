module.exports = function(server) {
    var mongoose = require('mongoose');
    var Candidate = mongoose.model('Candidate');
    var io = require('socket.io').listen(server);

    var current_candidates = [];
    var debate = {};

    io.sockets.on('connection', function(socket) {
        var user;
        // Find/create candidate when user opens connection
        socket.on('user_login', function(data) {
            if (data.name == "MODERATOR") {
                socket.emit('update_candidates', {candidates:current_candidates});
                return;
            }
            // Candidate.findOne({name:data.name}, function(err, candidate) {
            //     if (candidate) {
            //         user = candidate;
            //     } else {
            //         user = new Candidate({
            //             name: data.name,
            //             voters: 0,
            //             debates: []
            //         });
            //         user.save(function(err) { console.log(err); })
            //     }
            //     current_candidates.push(data.name);
            //     socket.emit('confirm_login', {user:user});
            //     socket.broadcast.emit('update_candidates', {candidates:current_candidates});
            // });
            user = new Candidate({
                name: data.name,
                voters: 0,
                debates: []
            });
            current_candidates.push(data.name);
            socket.emit('confirm_login', {user:user});
            socket.broadcast.emit('update_candidates', {candidates:current_candidates});
        });
        // Moderator initiates debate
        socket.on('debate_start', function(data){
            console.log("Debate Start: ", data); // check data
            debate = {
                players: data.players,
                choices: [],
                ready: []
            }
            socket.broadcast.emit('players_selected', data);
        });


        socket.on('candidate_response', function(data){
            console.log("Candidate Response: ", data); // check data
            debate.choices[data.index] = data.choice;
            debate.ready[data.index] = true;

            if (debate.ready[0] && debate.ready[1]){
                // Check candidate responses (t/f == positive/negative)
                if (debate.choices[0] && debate.choices[1]) {
                    debate[scores] = [7, 7];
                } else if (debate.choices[0]) {
                    debate[scores] = [0, 12];
                } else if (debate.choices[1]) {
                    debate[scores] = [12, 0];
                } else {
                    debate[scores] = [4, 4];
                }
                Candidate.findOne({name:debate.players[0]}, function(err, candidate) {
                    var result = {
                        opponent: debate.players[1],
                        choice: debate.choices[0],
                        score: debate.scores[0]
                    }
                    candidate.voters += debate.scores[0];
                    candidate.debates.push(result);
                    candidate.save(function(err) { console.log(err); });
                });
                Candidate.findOne({name:debate.players[1]}, function(err, candidate) {
                    var result = {
                        opponent: debate.players[0],
                        choice: debate.choices[1],
                        score: debate.scores[1]
                    }
                    candidate.voters += debate.scores[1];
                    candidate.debates.push(result);
                    candidate.save(function(err) { console.log(err); });
                });
            }
        });
        socket.on('disconnect', function() {
            for (var i=0; i<current_candidates.length; i++) {
                if (current_candidates[i] == user.name) {
                    current_candidates.splice(i);
                    return;
                }
                socket.broadcast.emit('update_candidates', {candidates:current_candidates});
            }
        })
    });
}
