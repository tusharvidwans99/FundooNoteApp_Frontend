window.addEventListener('DOMContentLoaded', function(){


    let regexEmail = RegExp('^[a-z]{2,}[0-9]{0,}[@][a-z]{2,5}[.][a-z]{3}$');


    let uName = document.getElementById('email');

    let em =0, a=0;

    uName.addEventListener('keyup', () => {
        em = check(uName, 'usernameHint', 'email', 'error', 'eblock', regexEmail)
        console.log(em);
      });


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
})