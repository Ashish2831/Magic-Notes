function displayNotes() {
    let notes = localStorage.getItem("notes");
    let row = document.getElementById("notes");
    row.innerText = "Your Notes Will Be Added Here!";

    if (notes != null) {
        notes = JSON.parse(notes);
        if (notes.length == 0) {
            row.innerText = "Your Notes Will Be Added Here!";
        }
        else {
            row.innerText = "";
        }
        
        notes.forEach((element, index) => {
            let divOuter = document.createElement("div");
            divOuter.classList.add("Card");
            divOuter.classList.add("card");
            divOuter.style.width = "18rem";

            row.appendChild(divOuter);

            let divInner = document.createElement("div");
            divInner.className = "card-body";

            divOuter.appendChild(divInner);

            let h5 = document.createElement("h5");
            h5.className = "card-title";
            h5.innerText = element["Title"];

            divInner.appendChild(h5);

            let p = document.createElement("p");
            p.className = "card-text";
            p.innerText = element["Text"];

            divInner.appendChild(p);

            let span = document.createElement('span');
            span.innerText = element["Date"];

            divInner.appendChild(span);

            let button = document.createElement("button");
            button.id = `${index}`;
            button.className = "btn btn-primary deletebtn";
            button.innerText = "Delete Note";
            button.onclick = function () {
                let element = document.getElementById(button.id);
                let notes = localStorage.getItem("notes");

                if (notes != null) {
                    notes = JSON.parse(notes);
                    notes.splice(button.id, 1);
                }
                localStorage.setItem("notes", JSON.stringify(notes));
                displayNotes();
            };

            divInner.appendChild(button);
        });
    } 
}

function addNotes() {
    let title = document.getElementById("title");
    let text = document.getElementById("addtext");
    let notes = localStorage.getItem("notes");


    if (notes == null) {
        notes = [];
    } else {
        notes = JSON.parse(notes);
    }

    notesObj = {
        "Title" : title.value,
        "Text" : text.value,
        "Date" : new Date().toString().substring(0, 25)
    } 

    notes.push(notesObj);
    localStorage.setItem("notes", JSON.stringify(notes));
    title.value = "";
    text.value = "";
    displayNotes();
}

displayNotes();
let btn = document.getElementById("addbtn").addEventListener("click", addNotes)

let search = document.getElementById("search");
search.addEventListener("input", () => {
    let allNotes = document.getElementsByClassName("Card");
    Array.from(allNotes).forEach((element) => {
        let text = element.getElementsByClassName("card-text")[0];
        text = text.innerText;
        if (text.includes(search.value)) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    })
});