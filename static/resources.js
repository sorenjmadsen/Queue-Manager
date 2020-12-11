function listResources() {
    fetch('/resources/all')
        .then(res => res.ok ? res.json() : "No resources!")
        .then(body => {
            for (const lab of Object.values(body.resources)) {
                for (const resource of lab) {
                    const li = document.createElement("li")
                    if(resource.resource.lab==1){
                        li.textContent = JSON.stringify(resource.resource.files) + JSON.stringify(resource.resource.text) + " Date and Time Submitted: " + JSON.stringify(resource.resource.date)
                        document.getElementById("list1").appendChild(li)
                    }
                    if(resource.resource.lab==2){
                        li.textContent = JSON.stringify(resource.resource.files) + JSON.stringify(resource.resource.text) + " Date and Time Submitted: " + JSON.stringify(resource.resource.date)
                        document.getElementById("list2").appendChild(li)
                    }
                    if(resource.resource.lab==3){
                        li.textContent = JSON.stringify(resource.resource.files)+ JSON.stringify(resource.resource.text) + " Date and Time Submitted: " + JSON.stringify(resource.resource.date)
                        document.getElementById("list3").appendChild(li)
                    }
                    if(resource.resource.lab==4){
                        li.textContent = JSON.stringify(resource.resource.files)+ JSON.stringify(resource.resource.text) + " Date and Time Submitted: " + JSON.stringify(resource.resource.date)
                        document.getElementById("list4").appendChild(li)
                    }
                    if(resource.resource.lab==5){
                        li.textContent = JSON.stringify(resource.resource.files)+ JSON.stringify(resource.resource.text) + " Date and Time Submitted: " + JSON.stringify(resource.resource.date)
                        document.getElementById("list5").appendChild(li)
                    }
                    if(resource.resource.lab==6){
                        li.textContent = JSON.stringify(resource.resource.files)+ JSON.stringify(resource.resource.text) + " Date and Time Submitted: " + JSON.stringify(resource.resource.date)
                        document.getElementById("list6").appendChild(li)
                    }
                }
            }
        })
}
listResources();