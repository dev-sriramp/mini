const express = require("express");
const { GridFSBucket } = require('mongodb');
const { GridFsStorage } = require('multer-gridfs-storage');
const imagePath = process.env.IMAGE_PATH;
const dbo = require('../db/conn');

module.exports = {
  getPassword:  async function(req, res) {
    const dbConnect = dbo.getDbImage();
    const bucket = new GridFSBucket(dbConnect, {
      bucketName: `${imagePath}`,
    });
    console.log(req.query.image)
    let downloadStream = bucket.openDownloadStreamByName(req.query.image);
    downloadStream.on("data", function (data) {
      res.status(200).write(data);
    });

    downloadStream.on("error", function (err) {
      res.status(400).send();
    });
    downloadStream.on("end", () => {
      res.end();
    })

   
  }
}

