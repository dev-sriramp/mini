const { getDb } = require("../db/conn");
const sendEmail = require("./sendEmail");
const crypto = require("crypto");
const PORT = process.env.PORT;
module.exports = {
  resendEmail: async function (req, res) {
    const dbConnect = getDb();
    console.log(req.query.email);
    const matchDocument = {
      email: req.query.email,
    };


await dbConnect.collection(`users`).findOne(matchDocument, async function (err, result) {
  console.log(result);
   if(result)
  await dbConnect.collection(`otp`).findOne({userid:result._id},async function(errotp,resultotp){
    if(resultotp){
      console.log("Document finded");
      var url = `localhost:${PORT}/user/${resultotp.userid}/verify/${resultotp.token}`;
      console.log(url);
      sendEmail(matchDocument.email, "Verify Email", url);
      res.status(200).send();

    }
    else{
      var token = {
        "DateTime": new Date(),
        userid: result._id,
        token: crypto.randomBytes(32).toString("hex")
      }
      dbConnect.collection(`otp`).insertOne(token, function (otperr, otpres) {
        if (otpres) {
          var url = `localhost:${PORT}/user/${token.userid}/verify/${token.token}`;
          console.log(url);
          sendEmail(matchDocument.email, "Verify Email", url);
          res.status(200).send();
        }
        else {
          res.status(500);
        }

      })
      res.status(200).send();
    }
  })
  else{
    res.status(400).send();
  }

})


    // dbConnect.collection("users").find(matchDocument).toArray(function (err, result) {
    //
    //   if (result.length == 0) {
    //     res.status(404).send();
    //     console.log(result);
    //   }
    //   else {
    //     // dbConnect.collection(`otp`).findOne({userid})
    //     console.log(result);
    //     res.status(200).send();
    //   }
    // })
  }
};
