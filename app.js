console.log("I am from Javascript");
showNotes();

let addBtn = document.getElementById('addBtn');

addBtn.addEventListener("click", function () {
    let addTxt = document.getElementById("addTxt");
    let notesItem = localStorage.getItem("notes");

    if (notesItem == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notesItem);
    }

    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    console.log(notesObj);

    showNotes();
})

function showNotes() {
    let notesItem = localStorage.getItem("notes");

    if (notesItem == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notesItem);
    }

    let html = "";
    notesObj.forEach(function (element, index) {
        html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Note ${index + 1}</h5>
                    <p class="card-text">${element}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>`
    });

    let notesElem = document.getElementById("notes");

    if (notesObj.length != 0) {
        notesElem.innerHTML = html;
    }
    else {
        notesElem.innerHTML = `Nothing to show here!`;
    }
}

function deleteNote(index) {
    console.log("I am deleting", index);

    let notesItem = localStorage.getItem("notes");

    if (notesItem == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notesItem);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();
    console.log("Input event Fired", inputVal);

    let noteCards = document.getElementsByClassName('noteCard');

    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        //console.log(cardTxt);
    })
})