const navDiv = document.querySelector(".nav");
const searchForm = document.querySelector(".form");
const notesDiv = document.querySelector(".notes");

const addNotesBox = document.querySelector(".add__form");
const closeNotesForm = document.querySelector(".fa-clipboard")
const notesTitle = document.getElementById("title");
const notesBody = document.getElementById("body");
const addNotesForm = document.getElementById("form");

const addNotesBtn = document.querySelector(".add__notes-btn");


addNotesBtn.addEventListener("click", () => {

    navDiv.classList.add('active');
    searchForm.classList.add('active');
    notesDiv.classList.add('active');
    addNotesBox.classList.add('active');
})

closeNotesForm.addEventListener("click", () => {

    navDiv.classList.remove('active');
    searchForm.classList.remove('active');
    notesDiv.classList.remove('active');
    addNotesBox.classList.remove('active');
})

addNotesForm.addEventListener("submit" , (e) => {
    e.preventDefault();

    let titleText = notesTitle.value;
    let bodyText = notesBody.value;

    let notesObj;
    let notesString = localStorage.getItem('notes');

    if (notesString == null) {
        notesObj = [];
    }else{
        notesObj = JSON.parse(notesString);
    }

    // Add Time
    let now = new Date();

      let amPM = now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

    let dateTime = `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()} || ${amPM}`;

  




    // pushing into local storage
    let tempObj = {title:titleText, body:bodyText, time:dateTime}

    notesObj.push(tempObj);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    
    notesTitle.value = "";
    notesBody.value = "";

    addNotesBox.classList.remove('active');
    navDiv.classList.remove('active');
    searchForm.classList.remove('active');
    notesDiv.classList.remove('active');

    displayNotes();
})

function displayNotes(){

    let notesObj;
    let notesString = localStorage.getItem('notes');

    if (notesString == null) {
        notesObj = [];
    }else{
        notesObj = JSON.parse(notesString);
    }

    let reverseObj = notesObj.reverse();

    let output = "";

    reverseObj.forEach((element,index) => {
        output += `
        <div class="notes__box">
            <div class="title__container">
                <span class="heading">Title : </span>&nbsp;
                <p class="title">${element.title}</p>
            </div>
            <div class="body__container">
                <span class="heading">Body : </span>
                <span class="body">${element.body}</span>
            </div>
            <div class="delete__btn">
                <button id="${index}" onclick=deleteNote(this.id)><i class="far fa-trash-alt"></i></button>
            </div>
            <div class="time__container">
                <div class="time"><span>${element.time}</span></div>
            </div>
        </div>
        `;
    });

    if (reverseObj != 0) {
        
        notesDiv.innerHTML = output;
    }else{
        notesDiv.innerHTML = `<div class="recordInfo">Nothing to display</div>`;
    }


}

displayNotes();


function deleteNote(index) {

    let notesObj;
	let notesString = localStorage.getItem('notes');
	
	if(notesString == null){
		notesObj = [];
	}
	else{
		notesObj = JSON.parse(notesString);
	}
	
	notesObj.splice(index,1);
	localStorage.setItem('notes',JSON.stringify(notesObj));
	
	displayNotes();
}




let search = document.getElementById("filter");  // serach

search.addEventListener("keyup", filterTitle); // Keyup event

function filterTitle() {

    let inputText = search.value.toUpperCase(); // convert to UPPER CASE

    let notes = document.getElementById("notes"); // notes
    let notesBox = notes.querySelectorAll('div .notes__box') // child notes Box


    for (let i = 0; i < notesBox.length; i++) {  // number of notes box
       
        let title = notesBox[i].getElementsByTagName('p')[0];  // fetch the notes title


        if (title.innerHTML.toUpperCase().indexOf(inputText) != -1) {  
            notesBox[i].style.display = "";
        }else{
            notesBox[i].style.display = "none";
        }

    }
}
