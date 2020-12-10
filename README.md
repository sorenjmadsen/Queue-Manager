# Queue-Manager
Lab TAs of Santa Clara University, struggle no longer with managing students' questions, for the latest and greatest technology is here! With the Fantastical Queue Manager, you can manage every question from every student anywhere and any time.

## Node.js Server Usage
$ node server.js --port=[NUM]
    - NUM is user-defined.

## RESTful API Usage:
GET / ;
localhost:[PORT]
    General
                /api                  : Welcome to the API!
                /statistics           : Returns some simple user statistics
    Questions
                /questions/all        : Returns all questions asked in all labs
                /questions/[LAB_NAME] : Returns all questions asked in specified lab
    Resources
                /resources/all        : Returns all resources posted in all labs
                /resources/[LAB_NAME] : Returns all resources posted in specified lab

