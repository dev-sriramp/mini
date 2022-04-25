const { getDb } = require("../db/conn");
module.exports = {
  checkemail: async function (req, res) {
    const dbConnect = getDb();
    const matchDocument = {
      email: req.body.email,
    };
    dbConnect.collection("users").find(matchDocument).toArray(function (err, result) {
      if (result.length == 0) {
        res.json(result).status(200);
      }
      else {
        res.status(409).send();
      }
    })
  }
};