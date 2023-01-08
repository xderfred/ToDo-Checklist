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
    db.get("SELECT * FROM open WHERE id=($task)", {
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
    db.get("SELECT * FROM done WHERE id=($task)", {
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

function updateTask(taskContent, callback) {
    db.run("UPDATE open SET title=($content), description=($description), important=($important) WHERE id=($id)" , {
        $content: taskContent.content,
        $description: taskContent.description,
        $important: taskContent.important,
        $id: taskContent.id
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
        db.run("INSERT INTO done VALUES (NULL, $title, $description, $important)", {
            $title: res.title,
            $description: res.description,
            $important: res.important
        }, (err) => {
            db.run("DELETE FROM open WHERE task=$task", {
                $task: taskId
            }, (err) => {
                if(err) {
                    console.log("ERROR SELECT SINGLE:", err)
                    callback({error: true})
                } else {
                    callback({error: false});
                }
            })
    
            if(err) {
                console.log("ERROR SELECT SINGLE:", err)
                callback({error: true})
            } else {
                callback({error: false});
            }
        });
    }) 
}

function reopenTask(taskId, callback) {
    getDoneTask(taskId, (res) => {
        db.run("INSERT INTO open VALUES (NULL, $title, $description, $important)", {
            $title: res.title,
            $description: res.description,
            $important: res.important
        }, (err) => {
            db.run("DELETE FROM done WHERE task=$task", {
                $task: taskId
            }, (err) => {
                if(err) {
                    console.log("ERROR SELECT SINGLE:", err)
                    callback({error: true})
                } else {
                    callback({error: false});
                }
            })
    
            if(err) {
                console.log("ERROR SELECT SINGLE:", err)
                callback({error: true})
            } else {
                callback({error: false});
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