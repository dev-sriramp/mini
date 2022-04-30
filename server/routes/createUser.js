const FEPORT = process.env.FEPORT;
const dbo = require('../db/conn');
const upload = require("./imageUpload");
const crypto = require("crypto");
const sendEmail = require("./sendEmail");


module.exports = {
    
    createUser:async function (req, res, file) {
  await upload(req, res)
  const obj = JSON.parse(JSON.stringify(req.body));
  const dbConnect = dbo.getDb();
  const email = {
    email: obj.email
  };
  var data = [];
  var password = [];
  for (let i = 0; i < req.files.length; i++) {
    data.push(req.files[i].filename);
    if (obj.password.indexOf(req.files[i].originalname) !== -1) {
      password.push(req.files[i].filename);
    } else {

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
        .insertOne(matchDocument, function async (err, result) {
          if (err) {
            res.status(400).send('Error inserting matches!');
          } else {
            dbConnect.collection("users").updateOne(email, images, function async (errupdate, resultupdate) {
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
                    const url = `localhost:${FEPORT}/user/${token.userid}/verify/${token.token}`;
                    console.log(url);
                    sendEmail(obj.email, "Verify Email", url);
                    res.status(200).send();
                  } else {
                    res.status(500);
                  }

                })

              }
            })
            res.send()
          }


        })

    } else {
      res.status(409).send();
    }

  });
}};
