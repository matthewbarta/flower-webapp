const express = require('express');
var path = require('path');
const app = express();
const port = 8080;

module.exports.init = function() {

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/', function (req, res) {
    res.send('Got a POST request')
});

app.put('/user', function (req, res) {
    res.send('Got a PUT request at /user')
});

app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user')
});

 //Serve static files
 app.use(express.static('client'));
  
 //Go to homepage for all routes not specified 
 app.all('/*', function(req, res) {
  res.redirect('/');
 });

app.listen(port, () => console.log(`App listening on port ${port}!`));

};