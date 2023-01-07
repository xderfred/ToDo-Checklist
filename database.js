// Importing SQLite3 to our project.
var sqlite3 = require("sqlite3").verbose();
// Setting up a database for storing data.

const db = new sqlite3.Database("db.sqlite", (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message);
      throw err;
    } else {
      console.log("Connected to the SQLite database.");
    }
  });


db.run(`CREATE TABLE IF NOT EXISTS todo(
                                        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
                                        content TEXT
                                        );`, (err) => {
                                            if (err) {
                                                console.log("ERROR DATABASE:", err)
                                            }
                                        });