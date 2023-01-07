var sqlite3 = require("sqlite3").verbose();

// Setting up a database
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


function getTodoList(callback) {
    db.all("SELECT * FROM todo", (err, res) => {
        if(err) {
            console.log("ERROR SELECT:", err)
            callback({error: true})
        } else {
            callback(res);
        }
    });
}

function getTask(taskId, callback) {
    db.get("SELECT content FROM todo WHERE id=($task)", {
        $task: taskId
    }, (err, res) => {
        if(err) {
            console.log("ERROR SELECT SINGLE:", err)
            callback({error: true})
        } else {
            callback(res);
        }
    });
}

function addTask(taskContent, callback) {
    db.run("INSERT INTO todo VALUES (NULL, $task)", {
        $task: taskContent
    }, (err) => {
        if(err) {
            console.log("ERROR SELECT SINGLE:", err)
            callback({error: true})
        } else {
            callback({error: false});
        }
    });
}

function deleteTask(taskId, callback) {
    db.run("DELETE FROM todo WHERE id=($task)", {
        $task: taskId
    }, (err) => {
        if(err) {
            console.log("ERROR SELECT SINGLE:", err)
            callback({error: true})
        } else {
            callback({error: false});
        }
    });
}


module.exports = {
    // Export all functions to use in the server.js
    getTodoList, getTask, addTask, deleteTask
};