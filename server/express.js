const express = require('express');
const bodyParser = require('body-parser');
const sqlite = require('sqlite3');
var path = require('path');
const app = express();
const port = 8080;

const db = new sqlite.Database('/Users/matthewbarta/Desktop/final/server/db/flowers.db', (err) => console.log());

module.exports.init = function() {

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join('/Users/matthewbarta/Desktop/final/client/index.html'));
    db.serialize(() => {
        db.each(`SELECT COMNAME as name
                 FROM FLOWERS`, (err, row) => {
          if (err) {
            console.error(err.message);
          }
          console.log(row.name);
        });
      });
});

app.post('/', function (req, res) {
    res.send('Got a POST request')
});

app.put('/', function (req, res) {
    res.send('Got a PUT request at /user')
});

app.delete('/', function (req, res) {
    res.send('Got a DELETE request at /')
});

 //Serve static files
 app.use(express.static('client'));
  
 //Go to homepage for all routes not specified 
 app.all('/*', function(req, res) {
  res.redirect('/');
 });

app.listen(port, () => console.log(`App listening on port ${port}!`));

};