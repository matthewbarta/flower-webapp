
/* Dependencies */
const db = require('../db/initDB.js');
const fs = require('fs');

/* Create a flower */
exports.create = function (req, res) {
  console.log(req.body);
  db.run(`INSERT INTO SIGHTINGS(name, person, location, sighted) VALUES(?,?,?,?)`, [req.body.name, req.body.person, req.body.location, req.body.sighted], function(err) {
    if (err) {
      return console.log(err.message);
    }
  });
};

/* Show the current flower */
exports.read = function (req, res) {
  /* send back the flower as json from the request */
  res.json(req.flower);
};

/* Update a flower */
exports.update = function (req, res) {
  db.run(`UPDATE FLOWERS 
          SET GENUS = ?, 
          SPECIES = ?,
          COMNAME = ?
          WHERE COMNAME = ?`,
   [req.body.genus, req.body.species, req.body.name, req.body.oldName],
    function(err) {
    if (err) {
      return console.log(err.message);
    }
  });
  db.run(`UPDATE SIGHTINGS
  SET NAME = ?
  WHERE NAME = ?`,
[req.body.name, req.body.oldName],
function(err) {
if (err) {
return console.log(err.message);
}
});

fs.rename('/Users/matthewbarta/Desktop/final/client/img/flowers/' + req.body.oldName + '.png', '/Users/matthewbarta/Desktop/final/client/img/flowers/' + req.body.name + '.png'  ,(err) => {
  if (err) throw err;
  console.log('Rename complete!');
});
};

exports.delete = function(req, res) {
 //does nothing
};

/* Retreive all the flowers, sorted alphabetically by flower name */
exports.list = function (req, res) {

var readRecordsFromTable = function(callback) {
  db.serialize(() => {
    db.all(`SELECT COMNAME as name, GENUS as genus, SPECIES as species
             FROM FLOWERS
             ORDER BY NAME`, (err, rows) => {
        if (err) {
          console.error(err.message);
          res.status(404).send(err);
        }
        else {
          rows.forEach(function(row) {
            var name = row.name;
            db.all(`SELECT PERSON as person, SIGHTED as sighted, LOCATION as location
            FROM FLOWERS, SIGHTINGS
            WHERE COMNAME = NAME And NAME = ?
            Order By SIGHTED DESC LIMIT 10`, [name], (err, sightings) => {
              row.sightings = sightings;
              callback(row);
            });
          });
        }
      });
  });
};
var endRows = new Array();
readRecordsFromTable(function(row) {
  endRows.push(row);
  if(endRows.length == 50) {
    res.status(200).json(endRows);
  }
});

};

/* 
  Middleware: find a flower by its name, then pass it to the next request handler. 
 */
exports.flowerByName = function (req, res, next, name) {
  db.serialize(() => {
    db.get(`SELECT COMNAME as name, GENUS as genus, SPECIES as species
             FROM FLOWERS
             WHERE COMNAME = ?`, [name], (err, row) => {
        if (err) {
          console.error(err.message);
          res.status(400).send(err);
        }
        else {
          req.flower = row;
          next();
        }
      });
  });
};