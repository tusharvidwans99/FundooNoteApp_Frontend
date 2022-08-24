var nav = false;
function menutoggle(){    
    nav ? closeNav() : openNav();
}

function openNav(){
    document.getElementById("side-nav").style.width = "250px";
    document.getElementById("display").style.marginLeft = "250px";
    nav = true;
}

function closeNav(){
    document.getElementById("side-nav").style.width = "85px";
    document.getElementById("display").style.marginLeft = "85px";
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
        },
        error: function(error){
            console.log(error);
        }
    })
}

document.getElementById('notes').addEventListener('click', (notes)=>{
    console.log("Notes : ", notes.target);
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
    document.getElementById("form").style.height="165px";
    document.getElementById("pin").style.visibility="hidden";
}


function createNote(){
    document.getElementById('form').addEventListener('submit', function(c){
        c.preventDefault();
    })
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
