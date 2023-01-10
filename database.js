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

db.run(`CREATE TABLE IF NOT EXISTS open(
                                        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
                                        title TEXT,
                                        description TEXT,
                                        important BOOL
                                        );`, (err) => {
                                            if (err) {
                                                console.log("ERROR DATABASE:", err)
                                            }
                                        });

db.run(`CREATE TABLE IF NOT EXISTS done(
                                        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
                                        title TEXT,
                                        description TEXT,
                                        important BOOL
                                        );`, (err) => {
                                            if (err) {
                                                console.log("ERROR DATABASE:", err)
                                            }
                                        });

function getOpenTodos(callback) {
    db.all("SELECT * FROM open", (err, res) => {
        if(err) {
            console.log("ERROR SELECT:", err)
            callback({error: true})
        } else {
            callback(res);
        }
    });
}

function getDoneTodos(callback) {
    db.all("SELECT * FROM done", (err, res) => {
        if(err) {
            console.log("ERROR SELECT:", err)
            callback({error: true})
        } else {
            callback(res);
        }
    });
}

function getOpenTask(taskId, callback) {
    db.all("SELECT * FROM open WHERE id=($task)", {
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

function getDoneTask(taskId, callback) {
    db.all("SELECT * FROM done WHERE id=($task)", {
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
    db.run("INSERT INTO open VALUES (NULL, $title, $description, $important)", {
        $title: taskContent.title,
        $description: taskContent.description,
        $important: taskContent.important
    }, (err) => {
        if(err) {
            console.log("ERROR SELECT SINGLE:", err)
            callback({error: true})
        } else {
            callback({error: false});
        }
    });
}

function updateTask(taskId, taskContent, callback) {
    db.run("UPDATE open SET title=($title), description=($description), important=($important) WHERE id=($id)" , {
        $title: taskContent.title,
        $description: taskContent.description,
        $important: taskContent.important,
        $id: taskId
    }, (err) => {
        if(err) {
            console.log("ERROR SELECT SINGLE:", err)
            callback({error: true})
        } else {
            callback({error: false});
        }
    })
}

function deleteOpenTask(taskId, callback) {
    db.run("DELETE FROM open WHERE id=($task)", {
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

function deleteDoneTask(taskId, callback) {
    db.run("DELETE FROM done WHERE id=($task)", {
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

function completeTask(taskId, callback) {
    getOpenTask(taskId, (res) => {
        console.log("res", res);
        db.run("INSERT INTO done VALUES (NULL, $title, $description, $important)", {
            $title: res[0].title,
            $description: res[0].description,
            $important: res[0].important
        }, (err) => {
            if(err) {
                console.log("ERROR SELECT SINGLE:", err)
                callback({error: true})
            } else {
                deleteOpenTask(taskId, (res) => {
                    if (res.error) {
                        callback({error: true})
                    } else {
                        callback({error: false})
                    }
                })       
            }
        });
    }) 
}

function reopenTask(taskId, callback) {
    getDoneTask(taskId, (res) => {
        db.run("INSERT INTO open VALUES (NULL, $title, $description, $important)", {
            $title: res[0].title,
            $description: res[0].description,
            $important: res[0].important
        }, (err) => {
            if(err) {
                console.log("ERROR SELECT SINGLE:", err)
                callback({error: true})
            } else {
                deleteDoneTask(taskId, (res) => {
                    if (res.error) {
                        callback({error: true})
                    } else {
                        callback({error: false})
                    }
                })       
            } 
        });
    }) 
}


module.exports = {
    // Export all functions to use in the server.js
    getOpenTodos, 
    getDoneTodos, 
    getOpenTask, 
    getDoneTask,
    addTask, 
    updateTask,
    deleteOpenTask, 
    deleteDoneTask,
    completeTask,
    reopenTask
};