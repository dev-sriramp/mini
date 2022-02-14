const express = require('express');
const recordRoutes = express.Router();

const dbo = require('../db/conn');

recordRoutes.route('/listings').get(async function (_req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection('matches')
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.json(result).status(200).send();
      }
    });
});

recordRoutes.route('/listings/recordSwipe').post(function (req, res) {
  const dbConnect = dbo.getDb();
  const matchDocument = {
    listing_id: req.body.id,
    last_modified: new Date(),
    session_id: req.body.session_id,
    direction: req.body.direction,

  };
  dbConnect
    .collection('matches')
    .insertOne(matchDocument, function (err, result) {
      if (err) {
        res.status(400).send('Error inserting matches!');
      } else {
        console.log(`Added a new match with id ${result.insertedId}`);
        console.log(result);
      let value = {...result,appended:"appended value to result"};
        res.json(value).status(200).send();
      }
    });
});

recordRoutes.route('/listings/updateLike').post(function (req, res) {
  const dbConnect = dbo.getDb();
  const listingQuery = { _id: req.body.id };
  const updates = {
    $inc: {
      likes: 1,
    },
  };

  dbConnect
    .collection('listingsAndReviews')
    .updateOne(listingQuery, updates, function (err, _result) {
      if (err) {
        res
          .status(400)
          .send(`Error updating likes on listing with id ${listingQuery.id}!`);
      } else {
        console.log('1 document updated');
      }
    });
});

recordRoutes.route("/favicon.ico").get((req,res)=>{
  res.status(200).send();
})

recordRoutes.route('/listings/delete/').delete((req, res) => {
  const dbConnect = dbo.getDb();
  console.log(req)
  const listingQuery = { direction: req.body.direction };

  dbConnect
    .collection('matches')
    .deleteOne(listingQuery, function (err, _result) {
      if (err) {
        res
          .status(400)
          .send(`Error deleting listing with id ${listingQuery.listing_id}!`);
      } else {
        console.log('1 document deleted');

        res.json({del:"deleted"}).status(200).send();
      }
    });
});

module.exports = recordRoutes;