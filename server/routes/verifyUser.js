const express = require('express');
const { ObjectId } = require('mongodb');
const dbo = require('../db/conn');



module.exports = {
  verifyUser: async function (req, res) {
    console.log("req received")
    try {
      const dbConnect = dbo.getDb();
      await dbConnect.collection("users").findOne({
        _id: new ObjectId(req.params.id)
      }, async function (err, result) {

        if (result) {

          await dbConnect.collection("otp").findOne({
            userid: result._id,
            token: req.params.token
          }, async function (error, verified) {
            if (verified) {

              await dbConnect.collection("users").updateOne({
                email: result.email
              }, {
                $set: {
                  "verified": true
                }
              }, async function (updateerr, updateres) {
                if (!updateerr) {
                  res.status(200).send({
                    message: "verified"
                  });
                  await dbConnect.collection("otp").deleteOne({
                    userid: result._id,
                    token: req.params.token
                  })

                } else {
                  res.status(404).send();
                }
              });


            } else {
              res.status(404).send();
            }

          })
        } else {
          res.status(404).send();
        }

      })
    } catch (err) {

    }
  }
}