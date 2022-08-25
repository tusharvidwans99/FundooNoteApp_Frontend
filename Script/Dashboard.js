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

function getAllNotes(){
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
            displayAllNotes(noteArray)
        },
        error: function(error){
            console.log(error);
        }
    })
}

document.getElementById('notes').addEventListener('click', (notes)=>{
    console.log("Notes : ",notes.target);
    getArray = noteArray.filter((filter)=>{
        return filter.archive ==false && filter.trash==false;
    })
    console.log("Notes : ", getArray);
})

function displayNotes(noteArray){
    console.log("Notes list : ", noteArray);   
}

                                // Create Note

function CreateNoteOpen(){
    document.getElementById("form").style.height="165px";
    document.getElementById("pin").style.visibility="visible";
}

function CreateNoteClose(){
    document.getElementById("form").style.height="55px";
    document.getElementById("pin").style.visibility="hidden";
}


function createNote(){
    let token = localStorage.getItem('token');

    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let Color = 'yellow';

    let noteData = {
        title:title.value,
        description:description.value,
        color:Color
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

const displaytnotes=document.querySelector('.notes');
const displayArchiveNotes = document.querySelector('.archive')
const displayTrashNotes = document.querySelector('.bin')

displaytnotes.addEventListener('click',()=>{
    notes=noteArray.filter((x)=>{
        return x.trash==false && x.archive==false;
    });
    console.log(notes);
    displayAllNotes(notes);
})

displayArchiveNotes.addEventListener('click', (notes) => {
    notes=noteArray.filter((x)=>{
        return x.trash===false && x.archive===true;
    });
    console.log(notes);
    displayAllNotes(notes);
})

displayTrashNotes.addEventListener('click', (notes) => {
    notes=noteArray.filter((x)=>{
        return x.trash===true && x.archive===false;
    });
    console.log(notes);
    displayAllNotes(notes);
})



function displayAllNotes(Notesdata){
    console.log(Notesdata);
   document.getElementById('Notes').innerHTML=Notesdata.map((note)=>
   `<div class="display-div">
        <div class="display-content">
            <p class="ti">${note.title}</p>
            <P class="de">${note.description}</P>
        </div>
        <div class="card-footer">
            <button>    
                    <img src="../Assets/NotesCreation/remind.svg" />
            </button>
            <button>
                    <img src="../Assets/NotesCreation/person.svg" />
            </button>
            <button>
                    <img src="../Assets/NotesCreation/color.svg" />
            </button>
            <button>
                    <img src="../Assets/NotesCreation/image.svg" />
            </button>
            <button>
                    <img src="../Assets/NotesCreation/archive.svg" />
            </button>
            <button>
                    <img src="../Assets/NotesCreation/more.svg" />
            </button>
        </div>
    </div>
   `
   ).join(' ');
};



// Refresh page


const Refresh = document.getElementById('refresh');

Refresh.addEventListener('click', ()=>{
    displayAllNotes(noteArray);
})