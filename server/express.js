
var express = require('express'), 
morgan = require('morgan'),
bodyParser = require('body-parser'),
flowersRouter = require('./routes/flowers.server.routes');

module.exports.init = function() {

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware 
  app.use(bodyParser.json());

  //Serve static files
  app.use(express.static('client'));
  
  //Use the flowers router for requests to the api
  app.use('/api/flowers', flowersRouter);

  //Go to homepage for all routes not specified 
  app.all('/*', function(req, res) {
  res.redirect('/');
  });

  return app;
};