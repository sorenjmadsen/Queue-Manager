// Create a new list item when clicking on the "Add" button
let button = document.getElementById("button");
button.addEventListener("click", newElement);
button.addEventListener("click", sendToServer);

function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("list").appendChild(li);
    }
    //document.getElementById("myInput").value = "";
}

// when you use this function as an event handler, the parameter is 
// an event object. not data
function sendToServer(event) {
    const obj = {
        "text": document.getElementById("myInput").value // how do you get the text that was sent with the event
    }
    console.log(obj)
    const headers = new Headers({
        'Content-Type': 'application/json'
    });
    const options = {
        headers: headers,
        method: 'POST',
        body: JSON.stringify(obj)
    };
    fetch('/questions/:lab', options)
        .then((res) => { res.ok ? console.log(res) : console.log(":{") })
        .catch(() => {
            let missedQuestions = localStorage.getItem("QUESTIONS")
            console.log(missedQuestions)
            if (missedQuestions) {
                missedQuestions = JSON.stringify([
                    ...JSON.parse(missedQuestions), event
                ])

                localStorage.setItem("QUESTIONS", missedQuestions)
            }
            else {
                missedQuestions = JSON.stringify([
                    data
                ])
                localStorage.setItem("QUESTIONS", missedQuestions)
            }
        })
}

function listQuestions() {
    fetch('/questions/all')
        .then(res => res.ok ? res.json() : "No questions!")
        .then(body => {
            console.log(body)
            for (const lab of Object.values(body.questions)) {
                for (const question of lab) {
                    const li = document.createElement("li")
                    li.textContent = question
                    document.getElementById("list").appendChild(li)
                }
            }
        })
}

listQuestions();

/**
 *
 * Body.questions is an Object where each key is a lab number
 *  -> In order to list all of the questions for each lab,
 *        you have to do nested for loops.
 *  -> To loop through keys/values of an object, use the
 *      Object.keys(questions) or Object.values(questions) functions
 *
 * When you want to access a single lab, you can use the
 *  body.questions[":lab"] or body.questions[lab] (if you have a lab variable)
 */