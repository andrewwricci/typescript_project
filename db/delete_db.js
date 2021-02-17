var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "andrew",
  password: "pass123"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("DROP DATABASE yuuri", function (err) {
      if (err) throw err;
      console.log("Database dropped");
    con.end()
    });
  });