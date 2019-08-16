import express from "express";
var mysql = require("mysql");

/*** Start Server on port 3000 ***/
const app = express();
app.listen(3000, () => console.log("Example app listening on port 3000!"));

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

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
    let sql = `SELECT * FROM email.messages INNER JOIN email.users ON email.messages.sender_id = email.users.user_id WHERE recipient_id = ${req.params.userid} AND archived = false`
    con.query(sql, function(err, result) {
      if (err) throw err;
      res.send(result);
    });
  });

/*** RECEIVE EMAIL (GET): Archived ****/
app.get("/email/:userid/archived", (req, res) => {
  let sql = `SELECT * FROM email.messages INNER JOIN email.users ON email.messages.sender_id = email.users.user_id WHERE recipient_id = ${req.params.userid} AND archived = true`
    con.query(sql, function(err, result) {
      if (err) throw err;
      res.send(result);
    });
  });

/*** GET USER INFO ****/
app.get("/email/user/:userid/", (req, res) => {
  let sql = `SELECT * FROM email.users WHERE user_id = ${req.params.userid}`;
  con.query(sql, function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});

/*** DELETE MESSAGE ****/
app.post('/email/delete', function(req, res) {
  let sql = `DELETE FROM email.messages WHERE id = ${req.body.message_id}`;
  con.query(sql, function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});

/*** ARCHIVE MESSAGE ****/
app.post('/email/archive', function(req, res) {
  let sql = `UPDATE email.messages set archived = true WHERE id = ${req.body.message_id}`;
  con.query(sql, function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});
