var express = require('express'),
    bp = require('body-parser'),
    path = require('path'),
    app = express(),
    port = process.env.PORT || 8000;

app.use(bp.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, "./client/static")));

app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');

require('./server/config/mongoose.js');

app.get('/', function(req, res) { res.render("index"); });

var server = app.listen(port, function() { console.log(`server running on port ${ port }`); });
var sockets = require('./server/controllers/sockets.js');
sockets(server);
