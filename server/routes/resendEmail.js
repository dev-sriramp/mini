const { getDb } = require("../db/conn");
module.exports = {
  resendEmail: async function (req, res) {
    const dbConnect = getDb();
    const matchDocument = {
      email: req.body.email,
    };
    dbConnect.collection("users").find(matchDocument).toArray(function (err, result) {
      if (result.length == 0) {
        res.json(result).status(404);
      }
      else {
        db.collection()
      }
    })
  }
};
