let button = document.getElementById("button");
button.addEventListener("click", newElement);
const date = new Date()


function newElement() {
    var li = document.createElement("li")
    li.classList.add("post");
    var questionValue = document.getElementById("myInput").value;
    var labValue = document.getElementById("lab_specifier").value;
    var authorValue = document.getElementById("author").value;
    let title = document.createElement("h5")
    title.innerText = questionValue

    let div = document.createElement("div")
    div.classList.add("post-about")
    let section = document.createElement("p")
    section.innerText = "Section: " + labValue
    let author = document.createElement("p")
    author.innerText = "Asked by: " + authorValue
    li.appendChild(title);
    div.appendChild(section);
    div.appendChild(author);
    li.appendChild(div);

    if (questionValue === ''|| labValue === ''|| authorValue === '') {
        alert("Please fill in all fields!");
    }else if (isNaN(labValue) || labValue > 6 || labValue < 0) {
        alert("You must enter a lab value within the parameters!");
    } else {
        document.getElementById("list").appendChild(li);
        sendToServer();
    }
}

function sendToServer(data) {
    const obj = {
        "text": document.getElementById("myInput").value, 
        "date": date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + (date.getMinutes() > 10 ? date.getMinutes() : "0" + date.getMinutes()),
        "lab": document.getElementById("lab_specifier").value,
        "author": document.getElementById("author").value
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
    let lab_as_string = JSON.stringify(obj.lab)
    lab_as_string = lab_as_string.replace(/^"(.+(?="$))"$/, '$1'); //removes pesky quotes around lab number in URL
    fetch(`/questions/${lab_as_string}`, options)
        .then((res) => { res.ok ? console.log(res) : console.log(":{") })
        .catch(() => {
            let missedQuestions = localStorage.getItem("QUESTIONS")
            console.log(missedQuestions)
            if (missedQuestions) {
                missedQuestions = JSON.stringify([
                    ...JSON.parse(missedQuestions), data
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
                    var li = document.createElement("li")
                    li.classList.add("post");
                    var questionValue = question.question.text;
                    var labValue = question.question.lab;
                    var authorValue = question.question.author;
                    let title = document.createElement("h5")
                    title.innerText = questionValue

                    let div = document.createElement("div")
                    div.classList.add("post-about")
                    let section = document.createElement("p")
                    section.innerText = "Section: " + labValue
                    let author = document.createElement("p")
                    author.innerText = "Asked by: " + authorValue
                    li.appendChild(title);
                    div.appendChild(section);
                    div.appendChild(author);
                    li.appendChild(div);
                    document.getElementById("list").appendChild(li)
                }
            }
        })
}

listQuestions();
