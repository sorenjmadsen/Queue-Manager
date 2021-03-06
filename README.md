# Queue-Manager
Lab TAs of Santa Clara University, struggle no longer with managing students' questions, for the latest and greatest technology is here! With the fantastical Queue Manager, you can manage every question from every student anywhere and any time.

## Node.js Server Usage
$ node server.js --port=[NUM]<br>
    - NUM is user-defined.

## RESTful API Usage:
localhost:[PORT]<br>
### GET /  
#### General
- localhost:[PORT]**/api**                  : Welcome to the API! <br>
- localhost:[PORT]**/stats**                : Returns some simple user statistics <br>

#### Questions
- localhost:[PORT]**/questions/all**        : Returns all questions asked in all labs <br>
- localhost:[PORT]**/questions/[LAB_NAME]** : Returns all questions asked in specified lab <br>
ie. GET /questions/1

#### Resources
- localhost:[PORT]**/resources/all**        : Returns all resources posted in all labs <br>
- localhost:[PORT]**/resources/[LAB_NAME]** : Returns all resources posted in specified lab <br>
ie. GET /resources/1

### POST /  
- localhost:[PORT]**/questions/[LAB_NAME]** : Posts question to the board in specified lab. Returns an assigned ID. <br>
ie. POST -H "Content-Type: application/json" -d '{"question" : "What do I do?"}' localhost:3000/questions/lab1
- localhost:[PORT]**/resources/[LAB_NAME]** : Posts resource to the board in specified lab. Returns an assigned ID. <br>
ie. POST -H "Content-Type: application/json" -d '{"resources" : "Here's what to do."}' localhost:3000/resources/lab1



