const express = require('express');
var path = require('path');
const app = express();
const port = 8080;

module.exports.init = function() {

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join('/Users/matthewbarta/Desktop/final/client/index.html'));
});

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