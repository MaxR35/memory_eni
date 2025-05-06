// Dépendances :
import * as utilities from "./modules/utilities.js";

document.addEventListener('DOMContentLoaded', () => { // Script si DOM totalement chargé
    // Elements :
    const $LINKS = document.querySelectorAll('.nav-link');
    const $SIGNIN_FORM = document.getElementById('signInForm');
    const $SIGNIN_INPUTS = document.querySelectorAll('#signInOffcanvas input');
    const $LOGIN_FORM = document.getElementById('logInForm');
    const $LOGIN_MAIL = document.getElementById('emailLogIn');
    const $LOGIN_PWD = document.getElementById('pwdLogIn');
    const $INPUTS = document.querySelectorAll('input');
    

    // Redirection profil :
    window.addEventListener('load', () => {
        let userConnected = sessionStorage.getItem('user'); // Récupération item "user" en Session

        if(userConnected) { // Si user dans sessionStorage => redirection
            window.location.href = 'vue/profil.html';
        }
    });

    // Lien Nav et Offcanvas :
    $LINKS.forEach((link, i) => {
        link.addEventListener('click', () => {
            utilities.showContent($LINKS, i);
        });
    });

    // Formulaire invalide par défaut
    let formValidate = false;

    // Evenement Input pour chaque formulaire :
    $INPUTS.forEach((input) => {
        input.addEventListener('input', () => { // Event sur Changement value input
            let id = input.getAttribute('id');

            if(id == "pwdSignIn") {
                formValidate = utilities.pwdSignInValidate(input); // Gestion validité + force du mot de passe pour l'inscription
            } else {
                formValidate = utilities.inputValidate(input); // Gestion validité + affichage msg erreur via fonction
            }
            console.log(formValidate);
        });
    });

    // Validation inscription :
    $SIGNIN_FORM.addEventListener('submit', (event) => { // Event sur click/validation formulaire
        event.preventDefault(); // Annulation envois de données
        if(formValidate) { // Nouvel utilisateur si formulaire valide
            let user = {};
            $SIGNIN_INPUTS.forEach((input) => { // Construction user avec clé => input[name] = value
                let name = input.getAttribute('name');

                if(name != "pwdConfirm") { // Exclusion du passwordConfirm
                    user[name] = input.value;
                };
           });
            // New or Edit localStorage
            const USER_STORAGE = JSON.parse(localStorage.getItem("users")); // Récupération du localStorage

            // Si item "Users" existe déjà
            if (USER_STORAGE) {
                // Vérification si peusdo ou mail déjà present
                let userExist = USER_STORAGE.find(userExist => 
                    userExist.email === user.email || userExist.name === user.name // Mail OU Nom trouvé
                );

                if(!userExist) { // Si userExist false => insertion nouvel utilisateur
                    USER_STORAGE.push(user); 
                    localStorage.setItem("users", JSON.stringify(USER_STORAGE)); // Mise à jour

                    utilities.showContent($LINKS, 2);
                    utilities.logInMsg('success');

                } else { // Si userExist true => suggestion connexion
                    let confirm = window.confirm('Certaines informations sont déjà utilisées par un autre utilisateur. Voulez vous essayer de vous connecter ?');

                    if(confirm) { // Affichage form connexion
                        utilities.showContent($LINKS, 2);
                    }
                }
            } else { // Si item "Users" inexistant
                const USERS = [];

                USERS.push(user);
                localStorage.setItem("users", JSON.stringify(USERS)); // Création

                utilities.showContent($LINKS, 2);
                utilities.logInMsg('success');
            }
        } else { // Si formValidate false => alert
            alert('Formulaire invalide !')
        }
    });

    // Validation connexion :
    $LOGIN_FORM.addEventListener('submit', (event) => {
        event.preventDefault();

        if(!formValidate) {
            utilities.logInMsg('error');
        } else {
            const USER_STORAGE = JSON.parse(localStorage.getItem("users")); // Récupération du localStorage

            let userExist = USER_STORAGE.find(user => 
                user.email === $LOGIN_MAIL.value && user.password === $LOGIN_PWD.value
            );
            if(!userExist) {
                utilities.logInMsg('error');
            } else {
                sessionStorage.setItem('user', JSON.stringify(userExist));
                window.location.href = "vue/profil.html";
            }
        }
    })
});