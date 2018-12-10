
/* Dependencies */
const db = require('../db/initDB.js');

/* Create a listing */
exports.create = function(req, res) {

  /* Instantiate a Listing */
  console.log(req.body);
  console.log("entered create");

  /* Then save the listing */
  // listing.save(function(err) {
  //   if(err) {
  //     console.log(err);
  //     res.status(400).send(err);
  //   } else {
  //     res.json(listing);
  //   }
  // });
};

/* Show the current listing */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
  res.json(req.listing);
};

/* Update a listing */
exports.update = function(req, res) {
  var body = req.body;
  console.log(body);
  console.log("Entered update");


  // /* Replace the article's properties with the new properties found in req.body */
  // /* Save the article */
  //   Listing.findOneAndUpdate({name: listing.name},
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

/* Delete a listing */
exports.delete = function(req, res) {

  var body = req.body;
  console.log("Entered delete");
  /* Remove the article */
  //   Listing.findByIdAndRemove(listing.id, (err, deleted) => {
  //   if (err) {
  //     res.status(404).send(err);      
  //   } 
  //   else {
  //     res.status(202).json(deleted);      
  //   }
  // });
};

/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, res) {

  // Listing.find({}).sort('code').exec((err, listings) => {
  //   if(err) {
  //     console.log(err);
  //     res.status(404).send(err);
  //   }
  //   res.status(200).json(listings);
  // });
  db.serialize(() => {
    db.all(`SELECT COMNAME as name, GENUS as genus, SPECIES as species
             FROM FLOWERS`, (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(404).send(err);
      }
      res.status(200).json(rows);
    });
  });

};

/* 
  Middleware: find a listing by its ID, then pass it to the next request handler. 

  Find the listing using a mongoose query, 
        bind it to the request object as the property 'listing', 
        then finally call next
 */
exports.listingByName = function(req, res, next, name) {
  // Listing.findById(id).exec(function(err, listing) {
  //   if(err) {
  //     res.status(400).send(err);
  //   } else {
  //     req.listing = listing;
  //     next();
  //   }
  // });
  
};