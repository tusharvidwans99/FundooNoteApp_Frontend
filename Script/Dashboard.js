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