const express = require("express");
const { GridFSBucket } = require('mongodb');
const { GridFsStorage } = require('multer-gridfs-storage');
const imagePath = process.env.IMAGE_PATH;
const dbo = require('../db/conn');

module.exports = {
  download:  async function(req, res) {
    const dbConnect = dbo.getDbImage();
    const bucket = new GridFSBucket(dbConnect, {
      bucketName: `${imagePath}`,
    });

    let downloadStream = bucket.openDownloadStreamByName("8414fc0e1e02b56a3edd79ff501376e2");
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

