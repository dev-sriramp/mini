const { MongoClient } = require("mongodb");
const connectionString = process.env.ATLAS_URI;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;
let dbi;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db("users");
      console.log("Successfully connected to MongoDB.");

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
  connectToServerImage: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }
      
      dbi = db.db("images");
      console.log("Successfully connected to MongoDB.");

      return callback();
    });
  },
  getDbI: function () {
    return dbi;
  },
};
