// database/migrations 1.0.js
"use strict";
const Promise = require("bluebird");
const sqlite3 = require("sqlite3");
const path = require('path');

module.exports = {
  up: function() {
    return new Promise(function(resolve, reject) {
      let db = new sqlite3.Database('./database/TicketingApp.db');
      db.run(`PRAGMA foreign_keys = ON`);

      db.serialize(function() {
        db.run(`CREATE TABLE tickets (
          id INTEGER PRIMARY KEY,
          first_name TEXT,
          last_name TEXT,
          email TEXT,
          telephone TEXT,
          feedback_type TEXT,
          feedback_details TEXT,
          created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`);
      });
      db.close();
    });
  },
  down: function() {
    return new Promise(function(resolve, reject) {
      /* This runs if we decide to rollback. In that case we must revert the `up` function and bring our database to it's initial state */
      let db = new sqlite3.Database("./database/TicketingApp.db");
      db.serialize(function() {
        db.run(`DROP TABLE tickets`);
      });
      db.close();
      });
 }
};
