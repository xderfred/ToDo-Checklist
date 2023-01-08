const express = require('express');
const sqlite = require('./database.js')

const PORT = 3000;
const app = express();

app.use(express.json())
app.use(express.static('public'));


// index.html as startpage
app.get("/", function(req, res) {
    res.sendFile('index.html', {root: './views'});
})

// Endpoints for API calls to Database
app.get("/api/getOpenTodos", (req, res) => {
    sqlite.getOpenTodos( (tasks) => {
        if (tasks.error === true) {
            res.status(500)
        }

        console.log("tasks", tasks)
        res.status(200).send(tasks)
    }) 
})

app.get("/api/getDoneTodos", (req, res) => {
    sqlite.getDoneTodos( (tasks) => {
        if (tasks.error === true) {
            res.status(500)
        }

        console.log("tasks", tasks)
        res.status(200).send(tasks)
    }) 
})

app.get("/api/getOpenTask/:id", (req, res) => {
    const id = req.params.id

    sqlite.getOpenTask(id, (task) => {
        console.log("task", task)
        
        if (task.error === true) {
            res.status(500)
        }

        console.log("task", task)
        res.status(200).json(task) 
    }) 
})

app.get("/api/getDoneTask/:id", (req, res) => {
    const id = req.params.id

    sqlite.getDoneTask(id, (task) => {
        console.log("task", task)
        
        if (task.error === true) {
            res.status(500)
        }

        console.log("task", task)
        res.status(200).json(task) 
    }) 
})

app.post("/api/addTask", (req, res) => {
    const content = req.body.content;

    console.log("content", content);
    // Add the new task from the post route.
    sqlite.addTask(content, (result) => {
        if (result.error === true) {
            res.status(500)
        }

        console.log("result", result)
        res.status(200)   
    });
})

app.delete("/api/deleteOpenTask/:id", (req, res) => {
    const id = req.params.id;

    console.log("id", id)
    sqlite.deleteOpenTask(id, (result) => {
        console.log("Result:", result);
        if (result.error === true) {
            res.status(500)
        }

        console.log("result", result)
        res.status(200)  
    });
})

app.delete("/api/deleteDoneTask/:id", (req, res) => {
    const id = req.params.id;

    console.log("id", id)
    sqlite.deleteDoneTask(id, (result) => {
        console.log("Result:", result);
        if (result.error === true) {
            res.status(500)
        }

        console.log("result", result)
        res.status(200)  
    });
})

app.put("/api/updateTask/:id", (req, res) => {
    const id = req.params.id;
    const content = req.body.content;
    console.log("ID: ", id)
    console.log("content: ", content)

    sqlite.updateTask(id, content, function(result) {
        console.log("Result:", result);
        if (result.error === true) {
            res.status(500)
        }

        console.log("result", result)
        res.status(200)  
    })
})

app.post("/api/completeTask/:id", (req, res) => {
    const id = req.params.id;

    console.log("id", id);
    
    sqlite.completeTask(id, (result) => {
        if (result.error === true) {
            res.status(500)
        }

        console.log("result", result)
        res.status(200)   
    });
})

app.post("/api/reopenTask/:id", (req, res) => {
    const id = req.params.id;

    console.log("id", id);
    
    sqlite.reopenTask(id, (result) => {
        if (result.error === true) {
            res.status(500)
        }

        console.log("result", result)
        res.status(200)   
    });
})


app.listen(PORT);
console.log(`Server running on port ${PORT}`);