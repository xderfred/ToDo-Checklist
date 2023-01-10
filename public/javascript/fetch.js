async function getOpenTodos(callback) {
  fetch('/api/getOpenTodos')
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      callback(responseJson);
    })
    .catch((error) => {
      console.log("FETCH ERROR", error);
    });
}

async function getDoneTodos(callback) {
  fetch('/api/getDoneTodos')
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      callback(responseJson);
    })
    .catch((error) => {
      console.log("FETCH ERROR", error);
    });
}

async function getOpenTask(callback, id) {
  fetch(`/api/getOpenTask/${id}`)
    .then(function(response) {
      return response.json();
    })
    .then((responseJson) => {
      callback(responseJson);
    })
    .catch((error) => {
      console.log("FETCH ERROR", error);
    });
}

async function getDoneTask(callback, id) {
  fetch(`/api/getDoneTask/${id}`)
    .then((response) => {
        return response.json();
    })
    .then((responseJson) => {
        callback(responseJson);
    })
    .catch(function(error) {
      console.log("FETCH ERROR", error);
    });
}

async function addTask(callback, body) {
  fetch("/api/addTask", {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then((response) => { 
      callback(response);
    })
    .catch((err) => {
      console.log("ERR:", err);
    });
}

async function updateTask(callback, body, id) {
  fetch(`/api/updateTask/${id.value}`, {
    method: "put",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then((response) => {
      callback(response);
    }).catch((err) => {
      console.log("ERR:", err);
    });
}

async function deleteOpenTask(callback, id) {
  fetch(`/api/deleteOpenTask/${id.value}`, {
    method: "delete",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then((response) => { 
      callback(response);
    })
    .catch((err) => {
      console.log("ERR:", err);
    })
}

async function deleteDoneTask( callback, id) {
  fetch(`/api/deleteDoneTask/${id.value}`, {
    method: "delete",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then((response) => { 
      callback(response);
    })
    .catch((err) => {
      console.log("ERR:", err);
    })
}

async function completeTask(callback, id) {
  fetch(`/api/completeTask/${id.value}`, {
    method: "put",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then((response) => { 
      callback(response);
    })
    .catch((err) => {
      console.log("ERR:", err);
    })
}

async function reopenTask(callback, id) {
  fetch(`/api/reopenTask/${id.value}`, {
    method: "put",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then((response) => { 
      callback(response);
    })
    .catch((err) => {
      console.log("ERR:", err);
    })
}