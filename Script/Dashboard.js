var nav = false;
function menutoggle(){    
    nav ? closeNav() : openNav();
}

function openNav(){
    document.getElementById("side-nav").style.width = "250px";
    document.getElementById("display-area").style.marginLeft = "250px";
    nav = true;
}

function closeNav(){
    document.getElementById("side-nav").style.width = "85px";
    document.getElementById("display-area").style.marginLeft = "85px";
    nav = false;
}

var noteArray;

getAllNotes();

function getAllNotes(data=''){
    let token = localStorage.getItem('token');

    $.ajax({
        url:'https://localhost:44306/api/Notes/Read',
        type:'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        },
        success: function(result){
            console.log(result.data);
            noteArray = result.data;
            noteArray.reverse();
            if(data == displayArchiveNotes){
                data.click();
            }
            else if(data == displayTrashNotes){
                data.click();
            }
            else{
                displaynotes.click();
            }
            
        },
        error: function(error){
            console.log(error);
        }
    })
}

// document.getElementById('notes').addEventListener('click', (notes)=>{
//     console.log("Notes : ",notes.target);
//     getArray = noteArray.filter((filter)=>{
//         return filter.archive ==false && filter.trash==false;
//     })
//     console.log("Notes : ", getArray);
// })

function displayNotes(noteArray){
    console.log("Notes list : ", noteArray);   
}

                                // Create Note

function CreateNoteOpen(){
    document.getElementById("form").style.height="165px";
    document.getElementById("pin").style.visibility="visible";
    document.getElementById("title").placeholder = "Title";
}

function CreateNoteClose(){
    document.getElementById("form").style.height="55px";
    document.getElementById("pin").style.visibility="hidden";
    document.getElementById("title").placeholder = "Take a note...";
}

//API call for creating note
function createNote(){
    let token = localStorage.getItem('token');

    let title = document.getElementById("title");
    let description = document.getElementById("description");
    

    let noteData = {
        title:title.value,
        description:description.value
    }
    console.log(noteData);

    $.ajax({
        url:'https://localhost:44306/api/Notes/Create',
        type:'POST',
        data:JSON.stringify(noteData),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +token
        },
        success: function(result){
            console.log(result);
            getAllNotes();
            resetCreateNote();
        },
        error: function(error){
            console.log(error);
        }
    })
}

function resetCreateNote(){
    document.getElementById('title').value="";
    document.getElementById('description').value="";
}


//Display Notes

const displaynotes=document.querySelector('.notes');
const displayArchiveNotes = document.querySelector('.archive')
const displayTrashNotes = document.querySelector('.bin')

displaynotes.addEventListener('click',()=>{
    // getAllNotes();
    notes=noteArray.filter((x)=>{
        return x.trash==false && x.archive==false;
    });
    console.log(notes);
    displayAllNotes(notes);
})

displayArchiveNotes.addEventListener('click', () => {
    notes=noteArray.filter((x)=>{
        return x.trash===false && x.archive===true;
    });
    console.log(notes);
    displayArchivedNotes(notes);
})

displayTrashNotes.addEventListener('click', () => {
    notes=noteArray.filter((x)=>{
        return x.trash===true && x.archive===false;
    });
    console.log(notes);
    displayTrashedNotes(notes);
})



function displayAllNotes(Notesdata){
    console.log(Notesdata);
   document.getElementById('Notes').innerHTML=Notesdata.map((note)=>
   `<div class="display-div">
        <div class="display-content">
            <p class="ti">${note.title}</p>
            <P class="de">${note.description}</P>
            <p>color : ${note.color}</p>
        </div>
        <div class="card-footer">
            <button>    
                    <img src="../Assets/NotesCreation/remind.svg"/>
            </button>
            <button>
                    <img src="../Assets/NotesCreation/person.svg" />
            </button>
            <div class="dropdown-color">
                <img src="../Assets/NotesCreation/color.svg" />
                <div id="myDropdown" class="dropdown-content">
                    <span onclick="ChangeColor(${note.noteID}, 'red')">red</span>
                    <span onclick="ChangeColor(${note.noteID}, 'blue')">blue</span>
                    <span onclick="ChangeColor(${note.noteID}, 'green')">green</span>
                </div>
            </div>
        
            <button>
                    <img src="../Assets/NotesCreation/image.svg" />
            </button>
            <button id='card-footer-archive' onclick="ArchiveNote(${note.noteID})">
                    <img src="../Assets/NotesCreation/archive.svg" />
            </button>

            <button id='card-footer-more' onclick="TrashNote(${note.noteID})">
                    <img src="../Assets/Dashboard/trash.svg">
            </button>
               
        </div>
    </div>
   `
   ).join(' ');
};


function displayArchivedNotes(Notesdata){
    console.log(Notesdata);
   document.getElementById('Notes').innerHTML=Notesdata.map((note)=>
   `<div class="display-div" style="background-color:${note.color};">
        <div class="display-content">
            <p class="ti">${note.title}</p>
            <P class="de">${note.description}</P>
        </div>
        <div class="card-footer">
            <button>    
                    <img src="../Assets/NotesCreation/remind.svg"/>
            </button>
            <button>
                    <img src="../Assets/NotesCreation/person.svg" />
            </button>
            <div class="dropdown-color">
                <img src="../Assets/NotesCreation/color.svg" />
                <div id="myDropdown" class="dropdown-content">
                    <span>red</span>
                    <span>blue</span>
                    <span>green</span>
                </div>
            </div>
            <button>
                    <img src="../Assets/NotesCreation/image.svg" />
            </button>
            <button id='card-footer-archive' onclick="UnArchiveNote(${note.noteID})">
                    <img style="transform: rotate(180deg);" src="../Assets/NotesCreation/archive.svg" />
            </button>

            <button id='card-footer-more' onclick="TrashNote(${note.noteID})">
                    <img src="../Assets/Dashboard/trash.svg">
            </button>
               
        </div>
    </div>
   `
   ).join(' ');
};



// function myFunction() {
//     document.getElementById("color-list").classList.toggle("show");
//   }
  
  // Close the dropdown if the user clicks outside of it
//   window.onclick = function(event) {
//     if (!event.target.matches('.dropbtn')) {
//       var dropdowns = document.getElementsByClassName("dropdown-content");
//       var i;
//       for (i = 0; i < dropdowns.length; i++) {
//         var openDropdown = dropdowns[i];
//         if (openDropdown.classList.contains('show')) {
//           openDropdown.classList.remove('show');
//         }
//       }
//     }
//   }


function displayTrashedNotes(Notesdata){
    console.log(Notesdata);
   document.getElementById('Notes').innerHTML=Notesdata.map((note)=>
   `<div class="display-div">
        <div class="display-content">
            <p class="ti">${note.title}</p>
            <P class="de">${note.description}</P>
        </div>
        <div class="card-footer">

            <button id='card-footer-more' onclick="Delete(${note.noteID})">
                    <img src="../Assets/Dashboard/deleteforever.svg">
            </button>

            <button id='card-footer-more' onclick="UnTrashNote(${note.noteID})">
                    <img src="../Assets/Dashboard/Restore.svg">
            </button>
               
        </div>
    </div>
   `
   ).join(' ');
};



// document.getElementById('Notes').addEventListener('click',(e)=>{
//     console.log(e.target.id);
// })


// Refresh page


const Refresh = document.getElementById('refresh');

Refresh.addEventListener('click', ()=>{
    getAllNotes();
})


//Archive Note API
function ArchiveNote(noteid){
    let token = localStorage.getItem('token');

    
    // console.log(noteData);

    $.ajax({
        url:`https://localhost:44306/api/Notes/Archive/${noteid}`,
        type:'PUT',
        // data:JSON.stringify(noteData),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +token
        },
        success: function(result){
            console.log(result);
            getAllNotes();
            // displaynotes.click();
        },
        error: function(error){
            console.log(error);
        }
    })
}


// Unarchive notes

function UnArchiveNote(noteid){
    let token = localStorage.getItem('token');

    
    // console.log(noteData);

    $.ajax({
        url:`https://localhost:44306/api/Notes/Archive/${noteid}`,
        type:'PUT',
        // data:JSON.stringify(noteData),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +token
        },
        success: function(result){
            console.log(result);
            getAllNotes(displayArchiveNotes);
        },
        error: function(error){
            console.log(error);
        }
    })
}


//TrashNote API

function TrashNote(noteid){
    let token = localStorage.getItem('token');

    
    // console.log(noteData);

    $.ajax({
        url:`https://localhost:44306/api/Notes/Trash/${noteid}`,
        type:'PUT',
        // data:JSON.stringify(noteData),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +token
        },
        success: function(result){
            console.log(result);
            getAllNotes();
            // displaynotes.click();
            // resetCreateNote();
        },
        error: function(error){
            console.log(error);
        }
    })
}



function UnTrashNote(noteid){
    let token = localStorage.getItem('token');

    
    // console.log(noteData);

    $.ajax({
        url:`https://localhost:44306/api/Notes/Trash/${noteid}`,
        type:'PUT',
        // data:JSON.stringify(noteData),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +token
        },
        success: function(result){
            console.log(result);
            getAllNotes(displayTrashNotes);
            // displaynotes.click();
            // resetCreateNote();
        },
        error: function(error){
            console.log(error);
        }
    })
}


function Delete(noteid){
    let token = localStorage.getItem('token');

    
    // console.log(noteData);

    $.ajax({
        url:`https://localhost:44306/api/Notes/Delete/${noteid}`,
        type:'DELETE',
        // data:JSON.stringify(noteData),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +token
        },
        success: function(result){
            console.log(result);
            getAllNotes(displayTrashNotes);
            // displayTrashNotes.click();
            // displaynotes.click();
            // resetCreateNote();
        },
        error: function(error){
            console.log(error);
        }
    })
}


// Color change API

function ChangeColor(noteid, clr){
    let token = localStorage.getItem('token');

    // data = {
    //     color:clr
    // }
    // console.log(noteData);

    $.ajax({
        url:`https://localhost:44306/api/Notes/Color/${noteid}/${clr}`,
        type:'PUT',
        // data:JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +token
        },
        success: function(result){
            console.log(result);
            getAllNotes();
            // displayTrashNotes.click();
            // displaynotes.click();
            // resetCreateNote();
        },
        error: function(error){
            console.log(error);
        }
    })
}




  