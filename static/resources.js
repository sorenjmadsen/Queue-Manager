function listResources() {
    fetch('/resources/all')
        .then(res => res.ok ? res.json() : "No resources!")
        .then(body => {
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
                    document.getElementById(`list${resource.resource.lab}`).appendChild(li)
                }
            }
        })
}
listResources();