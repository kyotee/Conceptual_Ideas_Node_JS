const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const generatePassword = require('password-generator');

var { environment,stories } = require("./controllers");

const app = express();

// MySQL database connection
const mysql = require('mysql');

if (process.env.NODE_ENV === "production") {
  const con = mysql.createPool({
    // server database for production
    host     : 'us-cdbr-iron-east-03.cleardb.net',
    user     : 'b1716937e432f2',
    password : '5bb18616',
    database : 'heroku_9705d094c064be3'
  });

  con.getConnection(function(err, connection) {
    connection.release();
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

// serve static files from the React app
app.use(express.static(path.join(__dirname, 'views/build')));
// use body-parser as middlewear
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/environment", environment.environment);
app.get("/api/stories", stories.show_stories);
app.post("/api/create_story", stories.create_stories);
app.delete("/api/delete_story", stories.destroy_stories);
app.put("/api/edit_story", stories.update_stories);
app.get("/api/next_stories_index", stories.next_stories_index);

// the "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/views/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
