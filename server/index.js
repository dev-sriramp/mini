require('dotenv').config({ path: './config.env' });
const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
// get MongoDB driver connection
const dbo = require('./db/conn');
const dbi = require('./db/imageConn');

const PORT = process.env.PORT || 5001;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(require('./routes/record'));

// app.use(function (err, _req, res) {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// })
dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }
  
  // start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});


