var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "andrew",
  password: "pass123",
  multipleStatements: true
});

var seed = `
    USE yuuri;
    CREATE TABLE IF NOT EXISTS reservation_status (
        status VARCHAR(50) UNIQUE
    );
    CREATE TABLE IF NOT EXISTS availability_status (
        status VARCHAR(50) UNIQUE
    );
    CREATE TABLE IF NOT EXISTS reservation (
        id int AUTO_INCREMENT,
        start_time TIMESTAMP,
        end_time TIMESTAMP,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        email VARCHAR(100),
        status VARCHAR(50),
        message VARCHAR(500),
        PRIMARY KEY (id),
        FOREIGN KEY (status) REFERENCES reservation_status(status)
    );
    CREATE TABLE IF NOT EXISTS availability (
        id int AUTO_INCREMENT,
        start_time TIMESTAMP,
        end_time TIMESTAMP,
        status VARCHAR(50),
        PRIMARY KEY (id),
        FOREIGN KEY (status) REFERENCES availability_status(status)
    );
    INSERT INTO reservation_status (status)
    VALUES ('pending'),
    ('accepted'),
    ('cancelled'),
    ('declined');
    INSERT INTO availability_status (status)
    VALUES ('available'),
    ('pending'),
    ('accepted');
`

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE IF NOT EXISTS yuuri", function (err) {
      if (err) throw err;
      console.log("Database created");
    });
    con.query(seed, function(err) {
        if (err) throw err;
        console.log("Database tables created")
    });
    con.end();
});