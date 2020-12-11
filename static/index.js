let button = document.getElementById("button");
button.addEventListener("click", newElement);
const date = new Date()


function newElement() {
    var li = document.createElement("li");
    var questionValue = document.getElementById("myInput").value;
    var labValue = document.getElementById("lab_specifier").value;
    var t = document.createTextNode(`question: "${questionValue}" \t\t lab: "${labValue}"`);
    li.appendChild(t);
    if ((questionValue || labValue) === '') {
        alert("You must write something!");
    }else if (isNaN(labValue) || labValue > 6 || labValue < 0) {
        alert("You must enter a lab value within the parameters!");
    } else {
        document.getElementById("list").appendChild(li);
        sendToServer();
    }
}

function sendToServer(event) {
    const obj = {
        "text": document.getElementById("myInput").value, 
        "date": date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + (date.getMinutes() > 10 ? date.getMinutes() : "0" + date.getMinutes()),
        "lab": document.getElementById("lab_specifier").value
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
    const lab_as_string = JSON.stringify(obj.lab)
    fetch(`/questions/${lab_as_string}`, options)
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
                    li.textContent = "question:" + JSON.stringify(question.question.text) + "\t\t lab:" + JSON.stringify(question.question.lab)
                    document.getElementById("list").appendChild(li)
                }
            }
        })
}

listQuestions();
