function listQuestions() {
    fetch('/questions/all')
        .then(res => res.ok ? res.json() : "No questions!")
        .then(body => {
            for (const lab of Object.values(body.questions)) {
                for (const question of lab) {
                    const li = document.createElement("li")
                    if(question.question.lab==1){
                        li.textContent = JSON.stringify(question.question.text) + " Date and Time Submitted: " + JSON.stringify(question.question.date)
                        document.getElementById("list1").appendChild(li)
                    }
                    if(question.question.lab==2){
                        li.textContent = JSON.stringify(question.question.text) + " Date and Time Submitted: " + JSON.stringify(question.question.date)
                        document.getElementById("list2").appendChild(li)
                    }
                    if(question.question.lab==3){
                        li.textContent = JSON.stringify(question.question.text) + " Date and Time Submitted: " + JSON.stringify(question.question.date)
                        document.getElementById("list3").appendChild(li)
                    }
                    if(question.question.lab==4){
                        li.textContent = JSON.stringify(question.question.text) + " Date and Time Submitted: " + JSON.stringify(question.question.date)
                        document.getElementById("list4").appendChild(li)
                    }
                    if(question.question.lab==5){
                        li.textContent = JSON.stringify(question.question.text) + " Date and Time Submitted: " + JSON.stringify(question.question.date)
                        document.getElementById("list5").appendChild(li)
                    }
                    if(question.question.lab==6){
                        li.textContent = JSON.stringify(question.question.text) + " Date and Time Submitted: " + JSON.stringify(question.question.date)
                        document.getElementById("list6").appendChild(li)
                    }
                }
            }
        })
}
listQuestions();