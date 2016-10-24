var express = require('express'),
    bp = require('body-parser'),
    path = require('path'),
    app = express(),
    port = process.env.PORT || 8000;

app.use(bp.json());
app.use(express.static(path.join(__dirname, "./client")));
app.use(express.static(path.join(__dirname, './bower_components')));

// require('./server/config/mongoose.js');

require('./server/config/routes.js')(app);

var server = app.listen(port, function() { console.log(`server running on port ${ port }`); });
require('./server/controllers/sockets.js')(server);
