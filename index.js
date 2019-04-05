const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');

var { test, testdb } = require("./routes/test");

const app = express();

// MySQL database connection
const mysql = require('mysql');

if (process.env.NODE_ENV === "production") {
  const con = mysql.createConnection({
    // server database for production
    host     : 'us-cdbr-iron-east-03.cleardb.net',
    user     : 'b1716937e432f2',
    password : '5bb18616',
    database : 'heroku_9705d094c064be3'
  });

  con.connect((err) => {
    if(err){
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
  });

  global.con = con;
} else {
  const con = mysql.createConnection({
    // local database for development
    host     : 'localhost',
    user     : 'admin',
    password : 'admin1',
    database : 'conceptual_ideas_node_db'
  });

  con.connect((err) => {
    if(err){
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
  });

  global.con = con;
}

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get("/api/test", test);
app.get("/api/testdb", testdb);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
