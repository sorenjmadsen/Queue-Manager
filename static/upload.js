let button = document.getElementById("button");
button.addEventListener("click", newElement);
button.addEventListener("click", sendToServer);
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
    var filesValue = document.getElementById("file").value;
    var questionValue = document.getElementById("myInput").value;
    var labValue = document.getElementById("lab_specifier").value;
    var authorValue = document.getElementById("author").value;
    li.classList.add("post");
    let title = document.createElement("h5")
    title.innerText = questionValue
    let div = document.createElement("div")
    div.classList.add("post-about")
    let section = document.createElement("p")
    section.innerText = "Section: " + labValue
    let author = document.createElement("p")
    author.innerText = "Asked by: " + authorValue
    let files = document.createElement("p")
    files.innerText = "Files uploaded: " + filesValue
    li.appendChild(title);
    div.append(files);
    div.appendChild(section);
    div.appendChild(author);
    li.appendChild(div);
    if (isNaN(labValue) || labValue > 6 || labValue < 0) {
        alert("You must enter a lab value within the parameters!");
    } else {
        document.getElementById("list").appendChild(li);
        document.getElementById("myInput").value = ""
        document.getElementById("author").value = ""
    }
}


function sendToServer(event) {
    const obj = {
        "files": document.getElementById("file").value,
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
    fetch(`/resources/${obj.lab}`, options)
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

function listResources() {
    fetch('/resources/all')
        .then(res => res.ok ? res.json() : "No resources!")
        .then(body => {
            console.log(body)
            for (const lab of Object.values(body.resources)) {
                for (const resource of lab) {
                    
                    var li = document.createElement("li")
                    li.classList.add("post");
                    var filesValue = resource.resource.files
                    var questionValue = resource.resource.text;
                    var labValue = resource.resource.lab;
                    var authorValue = resource.resource.author;
                    let title = document.createElement("h5")
                    title.innerText = questionValue
                    let div = document.createElement("div")
                    div.classList.add("post-about")
                    let section = document.createElement("p")
                    section.innerText = "Section: " + labValue
                    let author = document.createElement("p")
                    author.innerText = "Posted by: " + authorValue
                    let files = document.createElement("p")
                    files.innerText = "Files uploaded: " + filesValue
                    li.appendChild(title);
                    div.append(files);
                    div.appendChild(section);
                    div.appendChild(author);
                    li.appendChild(div);
                    document.getElementById("list").appendChild(li)
                }
            }
        })
}
listResources();
