
/* Dependencies */
const db = require('../db/initDB.js');

/* Create a flower */
exports.create = function (req, res) {

  /* Instantiate a Flower */
  console.log(req.body);
  console.log("entered create");

  /* Then save the flower */
  // flower.save(function(err) {
  //   if(err) {
  //     console.log(err);
  //     res.status(400).send(err);
  //   } else {
  //     res.json(flower);
  //   }
  // });
};

/* Show the current flower */
exports.read = function (req, res) {
  /* send back the flower as json from the request */
  res.json(req.flower);
};

/* Update a flower */
exports.update = function (req, res) {
  var body = req.body;
  console.log(body);
  console.log("Entered update");


  // /* Replace the article's properties with the new properties found in req.body */
  // /* Save the article */
  //   Flower.findOneAndUpdate({name: flower.name},
  //    {name: req.body.name,
  //     code: req.body.code,
  //      coordinates: req.body.coordinates,
  //        address: req.body.address,
  //         classRoomArray: req.body.classRoomArray}, {new: true}, (err, doc) => {
  //           if (err) {
  //              res.status(404).send(err);
  //           }
  //           else {
  //              res.status(200).json(doc);
  //           }
  //         }
  //   );
};

/* Delete a flower */
exports.delete = function (req, res) {

  var body = req.body;
  console.log("Entered delete");
  /* Remove the article */
  //   Flower.findByIdAndRemove(flower.id, (err, deleted) => {
  //   if (err) {
  //     res.status(404).send(err);      
  //   } 
  //   else {
  //     res.status(202).json(deleted);      
  //   }
  // });
};

/* Retreive all the directory flowers, sorted alphabetically by flower code */
exports.list = function (req, res) {

  db.serialize(() => {
    db.all(`SELECT COMNAME as name, GENUS as genus, SPECIES as species
             FROM FLOWERS
             ORDER BY NAME`, (err, rows) => {
        if (err) {
          console.error(err.message);
          res.status(404).send(err);
        }
        else {
          rows.forEach((row) => {
            var name = row.name;
            db.all(`SELECT PERSON as person, SIGHTED as sighted, LOCATION as location
            FROM FLOWERS, SIGHTINGS
            WHERE COMNAME = NAME And NAME = ?
            Order By SIGHTED DESC LIMIT 10`, [name], (err, sightings) => {
                if (err) {
                  console.error(err.message);
                  res.status(404);
                }
                  row.sightings = sightings;
              });
          });
          console.log(rows);
          res.status(200).json(rows);
        }
      });
  });

};

/* 
  Middleware: find a flower by its ID, then pass it to the next request handler. 
 */
exports.flowerByName = function (req, res, next, name) {
  // Flower.findById(id).exec(function(err, flower) {
  //   if(err) {
  //     res.status(400).send(err);
  //   } else {
  //     req.flower = flower;
  //     next();
  //   }
  // });

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