var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var models_path = path.join(__dirname, './../models');

mongoose.connect('mongodb://localhost/GreatDebate');

mongoose.connection.on('connected', function() {
    console.log('Mongoose default connection open to /GreatDebate');
});
mongoose.connection.on('error', function(err) {
    console.error('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

fs.readdirSync(models_path).forEach(function(file) {
    if (/\.js$/i.test(file)) {
        require(path.join(models_path, file));
    }
});
