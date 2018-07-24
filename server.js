// server.js

const express = require('express')
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const multipart = require("connect-multiparty");

const bcrypt = require('bcrypt')
const saltRounds = 10;

// set port
const PORT = process.env.PORT || 3128;

// create express application
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
})

const multipartMiddleware = multipart();

function isEmpty(str) {
  return !str || 0 === str.length;
}

// routes
app.post("/ticket", multipartMiddleware, function(req, res) {
  // validate data
  if (isEmpty(req.body.first_name) || isEmpty(req.body.last_name)) {
    return res.json({
      status: false,
      message: "Ticket needs a First and Last name"
    });
  }
  // create invoice
  let db = new sqlite3.Database("./database/TicketingApp.db");
  let sql = `INSERT INTO tickets(first_name,last_name,email,telephone,feedback_type,feedback_details) VALUES(
    '${req.body.first_name}',
    '${req.body.last_name}',
    '${req.body.email}',
    '${req.body.telephone}',
    '${req.body.feedback_type}',
    '${req.body.feedback_details}'
  )`;

  db.serialize(function() {
    db.run(sql, function(err) {
      if (err) {
        throw err;
      }
      let invoice_id = this.lastID;
      return res.json({
        status: true,
        message: "Ticket created"
      });
    });
  });
})

app.get("/tickets", multipartMiddleware, function(req, res) {
  let db = new sqlite3.Database("./database/TicketingApp.db");
  let sql = `SELECT * FROM tickets ORDER BY created DESC`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    return res.json({
      status: true,
      tickets: rows
    });
  });
});

app.get("/tickets/:id", multipartMiddleware, function(req, res) {
  let db = new sqlite3.Database("./database/TicketingApp.db");
  let sql = `SELECT * FROM tickets WHERE id='${req.params.id}'`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    return res.json({
      status: true,
      ticket: rows
    });
  });
});

app.get('/', function(req,res){
  res.send("Welcome to a simple ticketing system.");
});

app.listen(PORT, function(){
  console.log(`App running on localhost:${PORT}`);
});
