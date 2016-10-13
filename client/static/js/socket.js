$(document).ready(function() {
    var name = prompt("Please enter your name:");
    if (!name) {
        $('#middle_div').html('<h1>Please enter a valid name.</h1>')
    } else {
        var socket = io.connect();
        socket.emit('user_login', { name:name });
    }
})
