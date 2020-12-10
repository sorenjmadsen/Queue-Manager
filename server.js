const express = require('express')
const fsSync = require('fs')
const fs = require('fs/promises')
const path = require('path')
const date = new Date()

const dataFile = "./data.json"
const dataTemplate = {
    questions : {},
    resources : {},
    statistics : {
        resourcesPosted: 0,
        questionsAsked: 0,
        questionsAnswered: 0,
        lastQuestionPosted : "N/A",
        lastResourcePosted : "N/A"
    }
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

// Function: getAPI
// Description: Welcomes the dev to the API!
const getAPI = (req, res) => {
    res.status(200).send("You've reached the Queue Manager API!")
}

// Function: getAllQuestions
// Description: Returns all the questions asked by all lab classes.
const getAllQuestions = (req, res) => {
    if(!res.app.locals.data.questions)
        res.status(404).send("No questions asked!")    
    else   
        res.status(200).send({questions : res.app.locals.data.questions})
}

// Function: getLabQuestions
// Description: Returns all questions asked in the specified lab.
const getLabQuestions = (req, res) => {
    const lab = req.params.lab
    if(Object.keys(res.app.locals.data.questions).includes(lab))
        res.status(200).send({questions : res.app.locals.data.questions[lab]})
    else
        res.status(404).send(`No questions for class: ${lab}`)
}

// Function: getAllResources
// Description: Returns all the resources posted in all lab classes.
const getAllResources = (req, res) => {
    if(!res.app.locals.data.resources)
        res.status(404).send("No resources posted!")    
    else   
        res.status(200).send({resources : res.app.locals.data.resources})
}

// Function: getLabResources
// Description: Returns all resources posted in the specified lab.
const getLabResources = (req, res) => {
    const lab = req.params.lab
    if(Object.keys(res.app.locals.data.resources).includes(lab))
        res.status(200).send({resources : res.app.locals.data.resources[lab]})
    else
        res.status(404).send(`No resources posted for class: ${lab}`)
}

// Function: getSiteStats
// Description: Gives some basic user statistics about the website
const getSiteStats = (req, res) => {
    res.status(200).send(res.app.locals.data.statistics)
}

// Function: setupServer
// Description: Handles network functions and restores saved data to memory.
const setupServer = (data) => {
    app.locals["data"] = data;
    app.listen(port, () => {
        console.log(`Queue Manager started on http://localhost:${port}`);
    });
}

// Function: saveData
// Description: Saves any session data to JSON for recovery/storage.
const saveData = (data) => {
    fs.writeFile(dataFile, JSON.stringify(data), 'utf-8');
}

// Function: askQuestion
// Description: Adds a question to the board of a specified lab. Returns the id of the question.
const askQuestion = (req, res) => {
    const lab = req.params.lab
    if(!Object.keys(res.app.locals.data.questions).includes(lab)){
        res.app.locals.data.questions[lab] = [{id: id, question : req.body}]
        const id = res.app.locals.data.questions[lab].length
        res.status(200).send({id : id})
    }
    else {
        res.app.locals.data.questions[lab].push({id : id, question : req.body})
        const id = res.app.locals.data.questions[lab].length
        res.status(200).send({id : id})
    }
    res.app.locals.data.statistics.lastQuestionPosted = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
    saveData(res.app.locals.data)
}

// Function: postResource
// Description: Posts a resource to the board of a specified lab. Returns the assigned id of the resource.
const postResource = (req, res) => {
    const lab = req.params.lab
    if(!Object.keys(res.app.locals.data.resources).includes(lab)){
        res.app.locals.data.resources[lab] = [{id : id, resource : req.body}]
        const id = res.app.locals.data.resources[lab].length
        res.status(200).send({id : id})
    }
    else {
        const id = res.app.locals.data.resources[lab].length
        res.app.locals.data.resources[lab].push({id: id, resource : req.body})
        res.status(200).send({id : id})
    }
    res.app.locals.data.statistics.lastResourcePosted = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
    saveData(res.app.locals.data)
}

// API Endpoints
app.get('/api', getAPI)
app.get('/stats', getSiteStats)
app.get('/questions/all', getAllQuestions)
app.get('/resources/all', getAllResources)
app.get('/questions/:lab', getLabQuestions)
app.get('/resources/:lab', getLabResources)

app.post('/questions/:lab', askQuestion)
app.post('/resources/:lab', postResource)

//app.delete('/questions/:lab/:id', deleteQuestion)


// Check for saved data, then finish server setup
fs.readFile(dataFile, "utf-8")
.then((fileContents) => JSON.parse(fileContents))
.then((data) => {
    setupServer(data)
})
.catch((err) => {
    setupServer(dataTemplate)
    saveData(app.locals.data)
})