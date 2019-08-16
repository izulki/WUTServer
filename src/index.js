import express from "express";
var mysql = require("mysql");

/*** Start Server on port 3000 ***/
const app = express();
app.listen(3000, () => console.log("Example app listening on port 3000!"));

/*** START of MySQL Connection Initialization ***/
var con = mysql.createConnection({
  host: "localhost",
  user: "devtest",
  password: "devtest"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("MySQL Connected!");
});
/*** END of MySQL Connection Initialization ***/

/***** Backend Functions *****/

/*** Authenticate ****/
app.get("/email/auth/:address", (req, res) => {
  let sql = `SELECT user_id FROM email.users WHERE address = '${req.params.address}'`;
  con.query(sql, function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});

/*** RECEIVE EMAIL (GET): Unarchived ****/
app.get("/email/:userid", (req, res) => {
    let sql = `SELECT * FROM email.messages WHERE recipient_id = ${req.params.userid} AND archived = false`;
    con.query(sql, function(err, result) {
      if (err) throw err;
      res.send(result);
    });
  });

/*** RECEIVE EMAIL (GET): Archived ****/
app.get("/email/:userid/archived", (req, res) => {
    let sql = `SELECT * FROM email.messages WHERE recipient_id = ${req.params.userid} AND archived = true`;
    con.query(sql, function(err, result) {
      if (err) throw err;
      res.send(result);
    });
  });


