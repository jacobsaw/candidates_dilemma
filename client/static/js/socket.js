$(document).ready(function() {
    var user = prompt("Please enter your name:");
    if (!user) {
        $('#middle').html('<h1>Please enter a valid name.</h1>')
    } else {
        var socket = io.connect();

        socket.emit('user_login', { name:user });
        socket.on('confirm_login', function(data) { user=data.user; });
        if (user == "MODERATOR") {
            // jquery to add form to page
        }
    }
})
