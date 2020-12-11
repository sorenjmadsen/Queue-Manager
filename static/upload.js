let button = document.getElementById("button");
button.addEventListener("click", newElement);
button.addEventListener("click", sendToServer);
button1.addEventListener("click", newElement);
button1.addEventListener("click", sendToServer);
const date = new Date()

function updateList () {
    var input = document.getElementById('file');
    var fileList = document.getElementById('fileList');
    var children = "";
    for (var i = 0; i < input.files.length; ++i) {
        children += '<li>' + input.files.item(i).name + '</li>';
    }
    fileList.innerHTML = '<ul>'+children+'</ul>';
}

function newElement() {
    var li = document.createElement("li");
    var files = document.getElementById("file").value;
    var otherresources = document.getElementById("otherres").value;
    var labValue = document.getElementById("lab_specifier").value;
    var authorValue = document.getElementById("author").value;
    var t = document.createTextNode(`File: "${files}" \t\t Other Resources: "${otherresources}" \t\t lab: "${labValue}" \t\t author: "${authorValue}"`);
    li.appendChild(t);
    if (isNaN(labValue) || labValue > 6 || labValue < 0) {
        alert("You must enter a lab value within the parameters!");
    } else {
        document.getElementById("list").appendChild(li);
        sendToServer();
    }
}


function sendToServer(event) {
    const obj = {
        "files": document.getElementById("file").value,
        "text": document.getElementById("otherres").value, 
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
    fetch(`/resources/${lab_as_string}`, options)
        .then((res) => { res.ok ? console.log(res) : console.log(":{") })
        .catch(() => {
            let missedResources = localStorage.getItem("RESOURCES")
            console.log(missedResources)
            if (missedResources) {
                missedResources = JSON.stringify([
                    ...JSON.parse(missedResources), event
                ])

                localStorage.setItem("RESOURCES", missedResources)
            }
            else {
                missedResources = JSON.stringify([
                    data
                ])
                localStorage.setItem("RESOURCES", missedResources)
            }
        })
}

//function listResources() {
//    fetch('/resources/all')
//        .then(res => res.ok ? res.json() : "No resources!")
//        .then(body => {
//            console.log(body)
//            for (const lab of Object.values(body.resources)) {
//                for (const resource of lab) {
//                    const li = document.createElement("li")
//                    li.textContent = "File:" + JSON.stringify(resource.resource.files) + "\t\t text:" + JSON.stringify(resource.resource.text) + "\t\t lab:" + JSON.stringify(resource.resource.lab) +"\t\t author:" + JSON.stringify(resource.resource.author)
//                    document.getElementById("list").appendChild(li)
//                }
//            }
//        })
//}

//listResources();
