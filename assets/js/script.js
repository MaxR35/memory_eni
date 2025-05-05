// Dépendances :
import { checkMail, checkPwd, inputValidate, pwdStrength } from "./modules/validate.js";

document.addEventListener('DOMContentLoaded', () => {

    // LINKS & OFFCANVAS
    const $LINKS = document.querySelectorAll('nav a');
    const $SIGNIN_OFFCANVAS = document.getElementById('signInOffcanvas');
    const $LOGIN_OFFCANVAS = document.getElementById('logInOffcanvas');
    const $SIGNIN_INPUTS = document.querySelectorAll('#signInOffcanvas input');
    const $SIGNIN_BTN = document.getElementById('signInBtn');
    const $PROGRESS_BAR = document.getElementById('pwdStrength');

    
    $LINKS.forEach((link, i) => {
        link.addEventListener('click', () => {
            $LINKS.forEach((link) => {link.classList.remove('active')});
            switch (i) {
                case 1:
                    $SIGNIN_OFFCANVAS.classList.add('show');
                    $LOGIN_OFFCANVAS.classList.remove('show');
                    link.classList.add('active');
                    break;
                case 2:
                    $LOGIN_OFFCANVAS.classList.add('show');
                    $SIGNIN_OFFCANVAS.classList.remove('show');   
                    link.classList.add('active');
                    break;
                default:
                    $SIGNIN_OFFCANVAS.classList.remove('show');   
                    $LOGIN_OFFCANVAS.classList.remove('show');
                    link.classList.add('active'); 
                    break;
            };
    });
    });
    let formValidate = true;

    // SIGN IN
    $SIGNIN_INPUTS.forEach((input) => {
        input.addEventListener('input', function() {
            let id = input.getAttribute("id");
            let value = input.value;

            switch(id) {
                case "nameSignIn" :
                    formValidate = value.length >= 3;                    
                    input.nextElementSibling.classList.toggle('hidden', formValidate);
                    inputValidate(input, formValidate, value.length >= 3);
                    break;
                case "emailSignIn" :
                    formValidate = checkMail(input);  
                    input.nextElementSibling.classList.toggle('hidden', formValidate);
                    inputValidate(input, formValidate);
                    break
                case "pwdSignIn" :
                    formValidate = checkPwd(input);
                    input.nextElementSibling.classList.toggle('text-red-400', !formValidate);
                    input.nextElementSibling.classList.toggle('text-zinc-400', formValidate);
                    inputValidate(input, formValidate);
                    pwdStrength(input, $PROGRESS_BAR);
                    
                    break;
                case "pwdConfirmSignIn" :
                    formValidate = value == document.getElementById('pwdSignIn').value;
                    input.nextElementSibling.classList.toggle('hidden', formValidate);
                    inputValidate(input, formValidate);
                    break;
            };
            console.log(formValidate);
        });
    });

    $SIGNIN_BTN.addEventListener('click', (event) => {
        event.preventDefault();
        if(formValidate) {
            // New user
            let user = {};
            $SIGNIN_INPUTS.forEach((input) => {
                let name = input.getAttribute('name');

                if(name != "pwdConfirm") {
                    user[name] = input.value;
                };
           });
            // New or Edit localStorage
            const USER_STORAGE = JSON.parse(localStorage.getItem("users"));

            if (USER_STORAGE) {
                USER_STORAGE.push(user);
                localStorage.setItem("users", JSON.stringify(USER_STORAGE));
            } else {
                const USERS = [];

                USERS.push(user);
                localStorage.setItem("users", JSON.stringify(USERS));
            }
        }
    });
});