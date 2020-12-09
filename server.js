const express = require('express')
const fs = require('fs/promises')
const path = require('path')

const dataFile = "./data.json"
const dataTemplate = {
    questions : [],
    resources : [],
    statistics : {}
}

const app = express()
let port = 8080

// Command line support for defining port numbers
// Usage: node server.js --port=[NUM]
var args = process.argv.slice(2)
if (args.length === 0){
    console.log("Note: no port number defined. \nDefaulting to 8080...")
} else {
    portArg = args[0].split('=')
    port = portArg[1]
}

app.use(express.json())
app.use(express.static('static'))

// API Endpoints
app.get('/api')
app.get('/stats')
app.get('/questions')
app.get('/resources')
app.post('/questions')
app.post('/resources')


const setupServer = (data) => {
    app.locals.data = data;
    app.listen(port, () => {
        console.log(`Queue Manager started on http://localhost:${port}`);
    });
}

const saveData = (data) => {
    fs.writeFile(dataFile, JSON.stringify(data), 'utf-8');
}

try {
    if (fs.existsSync(dataFile)) {
        fs.readFile(dataFile, "utf-8")
        .then((fileContents) => JSON.parse(fileContents))
        .then((data) => {
            setupServer(data)
        });
    }
} catch(err) {
    setupServer(dataTemplate)
}