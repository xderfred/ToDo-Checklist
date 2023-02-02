const express = require('express');
const sqlite = require('./database.js')

const PORT = 3000;
const app = express();

app.use(express.json())
// app.use(express.static('public'));
app.use("/public", express.static(__dirname + "/public"));

// index.html as startpage
app.get("/", function(req, res) {
    res.sendFile('index.html', {root: './views'});
})

// Endpoints for API calls to Database
app.get("/api/getOpenTodos", (req, res) => {
    sqlite.getOpenTodos( (tasks) => {
        if (tasks.error === true) {
            res.status(500).send(tasks)
        }

        console.log("tasks", tasks)
        res.status(200).send(tasks)
    }) 
})

app.get("/api/getDoneTodos", (req, res) => {
    sqlite.getDoneTodos( (tasks) => {
        if (tasks.error === true) {
            res.status(500).send(task)
        }

        console.log("tasks", tasks)
        res.status(200).send(tasks)
    }) 
})

app.get("/api/getOpenTask/:id", (req, res) => {
    const id = req.params.id;

    sqlite.getOpenTask(id, (task) => {
        if (task.error === true) {
            res.status(500).json(task)
        }

        console.log("task", task)
        res.status(200).json(task) 
    }) 
})

app.get("/api/getDoneTask/:id", (req, res) => {
    const id = req.params.id

    sqlite.getDoneTask(id, (task) => {
        if (task.error === true) {
            res.status(500).json(task)
        }

        console.log("task", task)
        res.status(200).json(task) 
    }) 
})

app.post("/api/addTask", (req, res) => {
    const content = req.body;

    sqlite.addTask(content, (result) => {
        if (result.error === true) {
            res.status(500).send(content)
        }

        console.log("result", result)
        res.status(200).send(content)  
    });
})

app.delete("/api/deleteOpenTask/:id", (req, res) => {
    const id = req.params.id;

    sqlite.deleteOpenTask(id, (result) => {
        if (result.error === true) {
            res.status(500).send(id)
        }

        console.log("result", result)
        res.status(200).send(id) 
    });
})

app.delete("/api/deleteDoneTask/:id", (req, res) => {
    const id = req.params.id;

    sqlite.deleteDoneTask(id, (result) => {
        if (result.error === true) {
            res.status(500).send(id)
        }

        console.log("result", result)
        res.status(200).send(id)
    });
})

app.put("/api/updateTask/:id", (req, res) => {
    const id = req.params.id;
    const taskContent = req.body;

    sqlite.updateTask(id, taskContent, function(result) {
        if (result.error === true) {
            res.status(500).send(id)
        }

        console.log("result", result)
        res.status(200).send(id)
    })
})

app.put("/api/completeTask/:id", (req, res) => {
    const id = req.params.id;

    sqlite.completeTask(id, (result) => {
        if (result.error === true) {
            res.status(500).send(id)
        }

        console.log("result", result)
        res.status(200).send(id)
    });
})

app.put("/api/reopenTask/:id", (req, res) => {
    const id = req.params.id;

    sqlite.reopenTask(id, (result) => {
        if (result.error === true) {
            res.status(500).send(id)
        }

        console.log("result", result)
        res.status(200).send(id)
    });
})


app.listen(PORT);
console.log(`Server running on port ${PORT}`);