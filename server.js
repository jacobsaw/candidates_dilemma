var mongoose = require( 'mongoose' ),
    express  = require( 'express' ),
    bp       = require('body-parser'),
    path     = require( 'path' ),
    root     = __dirname,
    port     = process.env.PORT || 8000,
    app      = express(),
    routes = require('./server/config/routes.js')
app.use( express.static( path.join( root, 'client/views' )));
app.use( express.static( path.join( root, 'bower_components' )));
app.use(bp.json())
require('./server/config/mongoose.js');
routes(app);
app.listen( port, function() {
  console.log( `server running on port ${ port }` );
});
