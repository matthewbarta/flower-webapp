var express = require('./server/express.js');
var server = express.init();
server.listen((8080), function() {
    console.log('Server listening on port', 8080);
});
