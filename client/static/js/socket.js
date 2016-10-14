$(document).ready(function() {
    var user = prompt("Please enter your name:");
    if (!user) {
        $('#middle_div').html('<h1>Please enter a valid name.</h1>')
    } else {
        var socket = io.connect();

        socket.emit('user_login', { name:user });
        socket.on('confirm_login', function(data) { user=data.user; });

        if (user == "MODERATOR") {
            var candidates = [];
            socket.on('update_candidates', function(data) {
                candidates=data.candidates;
                var options = '';
                for (var i=0; i<candidates.length; i++) {
                    options += '<option value="' + candidates[i] + '">' + candidates[i] + '</option>';
                }
                var select_html = '<div class="select_candidates"><h3>Choose Players:</h3><form><select name="player1">';
                select_html += options + '</select><select name="player2">' + options + '</select><button id="start">Start Debate!</button></form></div>'
                $('#middle_div').html(select_html)
            });
            // Moderator initiates debate between selected candidates
            $('#start').click(function() {
                socket.emit('debate_start', { players:[
                    $('select[name="player1"]').val(),
                    $('select[name="player2"]').val()
                ]});
                return false;
            });
        }
        var candidate_info = {};
        socket.on('players_selected', function(data){
            if (data.players[0] == user.name){
                candidate_info[index] = 0;
                showPrompt();
            } else if (data.players[1] == user.name){
                candidate_info[index] = 1;
                showPrompt();
            }
            function showPrompt() {
                $('#bottom_div').html('<div class="debating"><h3>What is your answer?</h3><div><button id="positive">+</button><button id="negative">-</button></div></div>');
            }
        });

        $('#bottom_div').on('click', '.positive', function(event){
            candidate_info[choice] = true;
            socket.emit('candidate_response', candidate_info);
        });
        $('#bottom_div').on('click', '.negative', function(event){
            candidate_info[choice] = false;
            socket.emit('candidate_response', candidate_info);
        });
    }
});
