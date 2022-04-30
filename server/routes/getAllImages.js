const dbo = require('../db/conn');

module.exports = {
    getAllImages : async function (req, res) {
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
          } else {
      
            try {
              if (result.verified) {
                res.json(shuffleArray(result.filename)).status(200);
              }
              res.status(401).send();
            } catch {
              res.status(400).send();
            }
      
          }
        })
      
      }
      
}