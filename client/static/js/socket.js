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
                select_html += options + '</select><select name="player2">' + options + '</select><button id="start">Start Game!</button></form></div>'
                $('#middle_div').html(select_html)
            });
            $('#start').click(function() {
                socket.emit('game_start', { players:[
                    $('select[name="player1"]').val(),
                    $('select[name="player2"]').val()
                ]});
            });
        }
    }
})
