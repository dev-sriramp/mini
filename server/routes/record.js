const express = require('express');
const { GridFSBucket, ObjectId } = require('mongodb');
const { GridFsStorage } = require('multer-gridfs-storage');
const imagePath = process.env.IMAGE_PATH;
const userPath = process.env.USER_PATH;
const PORT = process.env.PORT;
const recordRoutes = express.Router();
const dbo = require('../db/conn');
const nodemailer = require('nodemailer');
const smtpTransport = require("nodemailer-smtp-transport");
const upload = require("./imageUpload");
const { checkemail } = require('./checkUser');
const crypto = require("crypto");


// import { download } from "./samplerecord";
const { download } = require("./samplerecord");
const sendEmail = require("./sendEmail");
const {resendEmail } = require("./resendEmail")
const { ObjectID } = require('mongodb');

recordRoutes.route('/listings').get(async function (req, res) {
  const dbConnect = dbo.getDb();
  const matchDocument = {
    email: req.body.email,
  };
  dbConnect.collection("users").find(matchDocument).toArray(function (err, result) {
    if (result.length == 0) {

      var smtpTransport = nodemailer.createTransport(({
        host: "smtp.office365.com",
        port: 587,
        auth: {
          user: "graphicalpa@outlook.com",
          pass: "1qaz2wsx#E"
        }
      }));
      var otp = Math.random();
      otp = otp * 1000000;
      otp = parseInt(otp);
      console.log(otp);
      otpGlobal = otp;
      var mailOptions = {
        from: "GRAPHICAL PASSWORD AUTHENTICATION <graphicalpa@outlook.com>",
        to: "dev.sriramp@gmail.com",
        subject: "Send Mail",
        text: `your one time password is ${otp}`

      }
      smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log("Message Not Send", error);
        } else {
          console.log("Message sent!");
        }
      });
      res.send();


    }
    else {
      res.status(404).send();
      //res.send(409);
    }
    //   console.log(result);

    // res.json(result)

  })

});
recordRoutes.get("/download", download);
recordRoutes.post('/checkuser', checkemail);
recordRoutes.get("/resendemail",resendEmail);

recordRoutes.route("/user/:id/verify/:token").get(async function (req, res) {
  try {
    const dbConnect = dbo.getDb();
    await dbConnect.collection("users").findOne({ _id: new ObjectId(req.params.id) }, async function (err, result) {

      if (result) {

        await dbConnect.collection("otp").findOne({ userid: result._id, token: req.params.token }, async function (error, verified) {
          if (verified) {

            await dbConnect.collection("users").updateOne({ email:result.email},{$set:{"verified":true}}, async function (updateerr, updateres) {
              if (!updateerr) {
                res.status(200).send({ message: "verified" });
                await dbConnect.collection("otp").deleteOne({
                  userid: result._id, token: req.params.token
                })

              }
              else {
                res.status(404).send();
              }
            });


          }
          else {
            res.status(404).send();
          }

        })
      }
      else {
        res.status(404).send();
      }

    })
  }
  catch (err) {

  }
})

recordRoutes.route('/upload').post(async function (req, res, file) {
  //console.log(req);
  await upload(req, res)
  const obj = JSON.parse(JSON.stringify(req.body));
  const dbConnect = dbo.getDb();
  const email = { email: obj.email };
  var data = [];
  var password = [];
  for (let i = 0; i < req.files.length; i++) {
    data.push(req.files[i].filename);
    //console.log(obj.password,"---",req.files[i].originalname)
    if (obj.password.indexOf(req.files[i].originalname) !== -1) {
      password.push(req.files[i].filename);
    }
    else {

    }
  }
  const images = {
    $set: {
      filename: data,
      password: password,
      verified: false
    }

  };
  const matchDocument = {
    email: obj.email,
  };

  dbConnect.collection("users").find(matchDocument).toArray(function (err, result) {
    if (result.length == 0) {

      dbConnect
        .collection('users')
        .insertOne(matchDocument, function async(err, result) {
          if (err) {
            res.status(400).send('Error inserting matches!');
          } else {
            dbConnect.collection("users").updateOne(email, images, function async(errupdate, resultupdate) {
              if (errupdate) {
                res.status(400).send(`some error`);
              } else {
                console.log(result.insertedId.toString());
                var today = new Date();
                today.setMinutes(today.getMinutes() + 1);

                var token = {
                  "DateTime": new Date(),
                  userid: result.insertedId,
                  token: crypto.randomBytes(32).toString("hex")
                }

                dbConnect.collection('otp').insertOne(token, function (otperr, otpres) {
                  if (otpres) {
                    const url = `localhost:${PORT}/user/${token.userid}/verify/${token.token}`;
                    console.log(url);
                    sendEmail(obj.email, "Verify Email", url);
                    res.status(200).send();
                  }
                  else {
                    res.status(500);
                  }

                })

              }
            })
            res.send()
          }


        })

    }
    else {
      res.status(409).send();
    }

  }
  );
});


recordRoutes.route('/downloads').get(async function (req, res) {
  // res.send(200).send();
  const dbConnect = dbo.getDbImage();
  // console.log(dbConnect);
  // console.log("logged value");
  // console.log(`${imagePath}`);
  const bucket = new GridFSBucket(dbConnect, {
    bucketName: `${imagePath}`,
  });
  // console.log("logged value");
  // console.log(req);
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
})
recordRoutes.route(`/verifypassword`).post(async function (req, res) {
  const dbConnect = dbo.getDb();
  const matchDocument = {
    email: req.body.email,
  }
  await dbConnect.collection(`${userPath}`).findOne(matchDocument).then((e) => {
    console.log(e.password)
    if (JSON.stringify(e.password) === JSON.stringify(req.body.password)) {
      console.log("Passwords are same ")
      console.log(req.body.password);
      res.status(200).send({ value: "true" })
    }
    else {
      res.status(400).send({ value: "false" })
    }
  })



})
recordRoutes.route("/checkemail").post(async function (req, res) {
  const dbConnect = dbo.getDb();

  //console.log(res);
  const matchDocument = {
    listing_id: req.body.email,
  };
  console.log(req.body.email);

  dbConnect.collection("users").insertOne(matchDocument, function (err, result) {
    if (err) {
      res.status(400).send('Error inserting matches!');
    } else {
      res.status(200).send();
    }
  });
  res.status(200).send();
});
recordRoutes.route("/getemail").get(async function (req, res) {
  function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }
  const dbConnect = dbo.getDb();
  const matchDocument = {
    email: req.query.email,
  }
  dbConnect.collection(`users`).findOne(matchDocument, function (err, result) {
    if (err) {
      res.status(404);
    }
    else {

      try {
        if(result.verified){
          res.json(shuffleArray(result.filename)).status(200);
        }
        res.status(401).send();
      }
      catch {
        res.status(400).send();
      }
      //console.log(result.filename);

    }
  })
  // console.log(req);
  // res.send();
})

recordRoutes.route("/get").get(async function (req, res) {
  console.log("get")
  const dbConnect = dbo.getDb();
  const images = dbConnect.collection(`${imagePath}.files`);
  const cursor = images.find({});
  if (await cursor.count() == 0) {
    res.status(500).send();
  }
  let fileInfos = [];
  await cursor.forEach((doc) => {
    fileInfos.push({
      name: doc.filename,
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

recordRoutes.route("/favicon.ico").get((req, res) => {
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

        res.json({ del: "deleted" }).status(200).send();
      }
    });
});

module.exports = recordRoutes
