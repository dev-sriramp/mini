const express = require('express');
const { GridFSBucket } = require('mongodb');
const { GridFsStorage } = require('multer-gridfs-storage');
const imagePath = process.env.IMAGE_PATH;
const recordRoutes = express.Router();

const dbo = require('../db/conn');
const upload = require("./imageUpload");

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

recordRoutes.route('/list').post(function (req, res) {
  const dbConnect = dbo.getDb();
  //console.log(req);
  //console.log(res);
  const matchDocument = {
    listing_id: req.body.data.id,
    last_modified: new Date(),
    session_id: req.body.data.session_id,
    direction: req.body.data.direction,

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
  res.status(200).send();
});
recordRoutes.route('/upload').post(async function(req,res){
  // try{
   //console.log(req);
      await upload(req,res)
  //    const filename = req.file.filename;
  //   if(req.file==undefined){
  //     res.send({message:"upload an file",})
  //   }
  //   else{
  //     let value = {...req,appended:"appended value to result"};
  //     //console.log(req.file.filename);
  //     res.status(200).send({message:"sucess"});
  //   }

  // }catch{
  //   console.log("Error");
  //   res.send({message:"Error"});
  // }
  //console.log(req)
  res.status(200).send();
});
recordRoutes.route('/download').get(async function(req,res){
  // res.send(200).send();
  const dbConnect = dbo.getDbI();
  const bucket = new GridFSBucket(dbConnect,{
    bucketName:`${imagePath}`,
  });
  console.log(req.query);
  let downloadStream = bucket.openDownloadStreamByName("10e6de5b083619cc553774501fbeb656");
  downloadStream.on("data",function(data){
    res.status(200).write(data);
  });
  downloadStream.on("error",function(err){
    res.status(400).send();
  });
  downloadStream.on("end",()=>{
    res.end();
  })
})

recordRoutes.route("/get").get(async function(req,res){
  console.log("get")
  const dbConnect = dbo.getDbI();
  const images = dbConnect.collection(`${imagePath}.files`);
  const cursor = images.find({});
  if(await cursor.count()==0){
    res.status(500).send();
  }
  let fileInfos = [];
  await cursor.forEach((doc)=>{
    fileInfos.push({
      name:doc.filename,
    });
  });
  res.status(200).send(fileInfos);
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
  console.log(req.body.direction)
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