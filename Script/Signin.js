window.addEventListener('DOMContentLoaded', function () {

  let regexEmail = RegExp('^[a-z]{2,}[0-9]{0,}[@][a-z]{2,5}[.][a-z]{3}$');
  let regexPass = RegExp('^.{6,}$');

  let uName = document.getElementById('userName');
  let psw = document.getElementById('password');
  let next = document.getElementById('btn');
  let a, em = 0, pswd = 0;

  const showError = (input, message, oldcls, newcls, divid) => {
    document.getElementById(divid).classList.remove(oldcls);
    document.getElementById(divid).classList.add(newcls)
    document.getElementById(input).innerHTML = message;
    document.getElementById(input).style.color = "red";
    return false;
  };

  const showSuccess = (input, oldcls, newcls, divid) => {
    document.getElementById(input).textContent = "";
    document.getElementById(divid).classList.add(oldcls);
    document.getElementById(divid).classList.remove(newcls);
    return true;
  };

  uName.addEventListener('keyup', () => {
    em = check(uName, 'usernameHint', 'inputUDiv', 'formError', 'uid', regexEmail)
    console.log(em);
  });
  psw.addEventListener('keyup', () => {
    pswd = check(psw, 'passwordHint', 'inputPDiv', 'formError', 'pid', regexPass)
    console.log(pswd);
  });

  function check(inputid, errid, oldcls, newcls, divid, reg) {
    if (!reg.test(inputid.value)) {
      a = showError(errid, "Enter valid data", oldcls, newcls, divid);
      console.log(a);
      return 0;
    } else {
      a = showSuccess(errid, oldcls, newcls, divid);
      console.log(a);
      return 1;
    }
  };


  next.addEventListener('click',()=>{
    // console.log("Hello", fName.value, lName.value);
      let data={
        email:userName.value,
        password:password.value,
      }
      console.log(data);
      $.ajax({
        url: 'https://localhost:44306/api/User/Login',
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