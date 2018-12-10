
var express = require('express'), 
morgan = require('morgan'),
bodyParser = require('body-parser'),
listingsRouter = require('./routes/listings.server.routes');


// module.exports.init = function() {

//     const app = express();
//     const port = 8080;

// // viewed at http://localhost:8080
// app.get('/', function(req, res) {
//     res.sendFile(path.join('/Users/matthewbarta/Desktop/final/client/index.html'));
//     db.serialize(() => {
//         db.all(`SELECT COMNAME as name
//                  FROM FLOWERS`, (err, rows) => {
//           if (err) {
//             console.error(err.message);
//           }
//           console.log(rows);
//         });
//       });
// });

// app.post('/', function (req, res) {
//     res.send('Got a POST request')
// });

// app.put('/', function (req, res) {
//     res.send('Got a PUT request at /user')
// });

// app.delete('/', function (req, res) {
//     res.send('Got a DELETE request at /')
// });
 
// app.use(bodyParser.json());    

// app.use(express.static('client'));

// app.listen(port, () => console.log(`App listening on port ${port}!`));

// };

//////// 


module.exports.init = function() {

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware 
  app.use(bodyParser.json());

  //Serve static files
  app.use(express.static('client'));
  
  //Use the listings router for requests to the api
  app.use('/api/listings', listingsRouter);

  //Go to homepage for all routes not specified 
  app.all('/*', function(req, res) {
  res.redirect('/');
  });

  return app;
}; 