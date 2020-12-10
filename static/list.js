function listQuestions() {
    fetch('/questions/all')
        .then(res => res.ok ? res.json() : "No questions!")
        .then(body => {
            console.log(body)
            for (const lab of Object.values(body.questions)) {
                for (const question of lab) {
                    const li = document.createElement("li")
                    li.textContent = JSON.stringify(question.question.text)
                    document.getElementById("list").appendChild(li)
                    console.log(question)
                }
            }
        })
}
listQuestions();