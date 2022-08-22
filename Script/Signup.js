window.addEventListener('DOMContentLoaded',()=>{


    let regexName = RegExp('^[A-Z]{1}[a-z]{2,}$');
    let regexLName = RegExp('^[A-Z]{1}[a-z]{0,}$');
    let regexEmail = RegExp('^[a-z]{2,}[@][a-z]{2,5}[.][a-z]{3}$');
    let regexPass = RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@!#]*)[a-zA-Z0-9@!#*]{8,}$');

    let fName = document.getElementById('FirstName');
    let lName = document.getElementById('LastName');
    let userName = document.getElementById('username');
    let password = document.getElementById('password');
    let cnfpassword = document.getElementById('cnfpassword');
    let next = document.getElementById('btn');

    let fn=0, ln=0, un=0, psw=0, cnfpw=0;


    const showError = (input, message, oldclass, newclass, divId) =>{

        document.getElementById(divId).classList.remove(oldclass);
        document.getElementById(divId).classList.add(newclass);
        document.getElementById(input).innerHTML = message;
        document.getElementById(input).style.color="red";
        return false;
    };


    const showSuccess = (input,oldclass,newclass,divId) => {
        document.getElementById(input).textContent = "";
        document.getElementById(divId).classList.add(oldclass);
        document.getElementById(divId).classList.remove(newclass);
        return true;
    };

    fName.addEventListener('keyup',()=>{
        fn=check(fName,'nameshint','inputFName','formError','fid',regexName )
        console.log(fn)
    });

    lName.addEventListener('keyup',()=>{
        ln=check(lName,'nameshint','inputLName','formError','lid',regexLName )
        console.log(ln)
    });

    userName.addEventListener('keyup',()=>{
        un=check(userName,'usernameHint','inputusername','userError','uid',regexEmail )
        console.log(un)
    });

    password.addEventListener('keyup',()=>{
        psw=check(password,'passwordhint','inputPassword','formError','pid',regexPass )
        console.log(psw)
    });

    cnfpassword.addEventListener('keyup',()=>{
        cnfpw=check(cnfpassword,'passwordhint','inputcnfpassword','formError','cpid',regexPass )
        console.log(cnfpw)
    });


    function check(inputid,errid,oldclass,newclass,divId,reg){
        if (!reg.test(inputid.value)) {
            a = showError(errid, "Enter valid data", oldclass, newclass,divId);
            console.log(a);
            return 0;
        } else {
            a= showSuccess(errid, oldclass, newclass,divId);
            console.log(a);
            return 1;
        }
    };



    next.addEventListener('click',()=>{
        console.log("Hello", fName.value, lName.value);
          let data={
            firstName:fName.value,
            lastName:lName.value,
            email:userName.value,
            password:password.value,
          }
          console.log(data);
          $.ajax({
            url: 'https://localhost:44306/api/User/Register',
            type: 'POST',
            data:JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            },
            
            success: function (result) {
                console.log(result);
            },
            error: function (error) {
              console.log(error);
            }
        });
    });

})