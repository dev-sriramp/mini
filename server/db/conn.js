const { MongoClient } = require("mongodb");
const connectionString = process.env.ATLAS_URI;
const imagePath = process.env.IMAGE_PATH;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;
let dbConnectionToImage;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db(`${imagePath}`);
      console.log("Successfully connected to MongoDB users");
      dbConnectionToImage = db.db(`${imagePath}`);
      console.log(`Successfully connected to MongoDB ${imagePath}`);
      return callback();
    });
  },
  getDb: function () {
    return dbConnection;
  },
  getDbImage: function(){
    return dbConnectionToImage;
  },
};