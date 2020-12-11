function listQuestions() {
    fetch('/questions/all')
        .then(res => res.ok ? res.json() : "No questions!")
        .then(body => {
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
                    let date = document.createElement("p")
                    date.innerText = "Date posted: " + question.question.date
                    li.appendChild(title);
                    div.appendChild(section);
                    div.appendChild(author);
                    div.append(date)
                    li.appendChild(div);
                    document.getElementById(`list${question.question.lab}`).appendChild(li)
                }
            }
        })
}
listQuestions();