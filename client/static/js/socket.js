$(document).ready(function() {
    var user = prompt("Please enter your name:");
    if (!user) {
        $('#middle_div').html('<h1>Please enter a valid name.</h1>')
    } else {
        var socket = io.connect();

        socket.emit('user_login', { name:user });
        socket.on('confirm_login', function(data) { user=data.user; });
        if (user == "MODERATOR") {
            // jquery to add form to page
        }
    }
    var player_index;
    socket.on('players_joined', function(data){
        if(data.players[0]==user.name){
            player_index=0;
        }
        else if{
            player_index=1;
        }
        // change the html if you are selected
    }
    $('body').on('click', '.positive', function(event){
        choice={
            player:player_index,
            choice:true
        }
        socket.emit('user_choice', choice);
    });
    $('body').on('click', '.negative', function(event){
        choice={
            player:player_index,
            choice:false
        }
        socket.emit('user_choice', choice);
    });
    socket.on('game_end', function(data){
        console.log('ended');
        // google api chart will go here
    }
})
