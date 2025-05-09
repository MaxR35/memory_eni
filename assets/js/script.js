// Dépendances :
import * as utilities from "./modules/utilities.js";

document.addEventListener('DOMContentLoaded', () => { // Script si DOM totalement chargé
    // Elements :
    const $LINKS = document.querySelectorAll('.nav-link');
    const $SIGNIN_FORM = document.getElementById('signInForm');
    const $SIGNIN_INPUTS = document.querySelectorAll('#signInOffcanvas input');
    const $LOGIN_INPUTS = document.querySelectorAll('#logInOffcanvas input');
    const $LOGIN_FORM = document.getElementById('logInForm');
    const $LOGIN_MAIL = document.getElementById('emailLogIn');
    const $LOGIN_PWD = document.getElementById('pwdLogIn');
    const $INPUTS = document.querySelectorAll('input');

    // Redirection profil :
    window.addEventListener('load', () => {
        let userConnected = sessionStorage.getItem('user'); // Récupération item "user" en Session

        if (userConnected) { // Si user dans sessionStorage => redirection
            window.location.href = 'vue/profil.html';
        }
    });

    // Lien Nav et Offcanvas :
    $LINKS.forEach((link, i) => { 
        link.addEventListener('click', () => { 
            utilities.showContent($LINKS, i);
        });
    });

    // Evenement Input pour chaque formulaire :
    $INPUTS.forEach((input) => {
        input.addEventListener('input', () => { // Event sur Changement value input
            let id = input.getAttribute('id');

            if (id == "pwdSignIn") {
                utilities.pwdSignInValidate(input); // Gestion validité + force du mot de passe pour l'inscription
            } else {
                utilities.inputValidate(input); // Gestion validité + affichage msg erreur via fonction
            }
        });
    });

    // Validation inscription :
    $SIGNIN_FORM.addEventListener('submit', (event) => { // Event sur click/validation formulaire
        // Annulation de l'envois des données du form
        event.preventDefault();

        // Bool validité formulaire
        let isFormValid = false;

        // Vérification validité formulaire connexion
        $SIGNIN_INPUTS.forEach((input) => {
            let id = input.getAttribute('id');

            if (id == "pwdSignIn") {
                isFormValid = utilities.pwdSignInValidate(input);
            } else {
                isFormValid = utilities.inputValidate(input);
            }
        });

        if (!isFormValid) {  // Si formulaire Invilade
            alert("Formulaire invalide !"); // Alert + annulation de la suite de l'event via return
            return;
        }
        // Si formulaire valide
        let user = {};
        $SIGNIN_INPUTS.forEach((input) => { // Construction user avec clé => input[name] = value
            let name = input.getAttribute('name');

            if (name != "pwdConfirm") { // Exclusion du passwordConfirm
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

            if (!userExist) { // Si userExist false => insertion nouvel utilisateur
                USER_STORAGE.push(user);
                localStorage.setItem("users", JSON.stringify(USER_STORAGE)); // Mise à jour

                utilities.showContent($LINKS, 2); // Affichage panel de connexion
                utilities.logInMsg('success'); // Message de confirmation d'inscription

            } else { // Si userExist true => suggestion connexion
                let confirm = window.confirm('Certaines informations sont déjà utilisées par un autre utilisateur. Voulez vous essayer de vous connecter ?');

                if (confirm) { // Affichage panel de connexion
                    utilities.showContent($LINKS, 2);
                }
            }
        } else { // Si item "Users" inexistant
            const USERS = [];

            // Création de USERS pour ajouter le nouvel utilisateur
            USERS.push(user);
            localStorage.setItem("users", JSON.stringify(USERS)); // Enregistrement en localStorage

            utilities.showContent($LINKS, 2); // Affichage panel de connexion
            utilities.logInMsg('success'); // Message de confirmation d'inscription
        }
    });

    // Validation connexion :
    $LOGIN_FORM.addEventListener('submit', (event) => {
        // Annulation de l'envois des données du form
        event.preventDefault();

        // Bool validité formulaire
        let isFormValid = false;

        $LOGIN_INPUTS.forEach((input) => { // Vérification validité formulaire connexion
            isFormValid = utilities.inputValidate(input);
        });

        if (!isFormValid) { // Si formulaire Invilade
            alert("Formulaire invalide !"); // Alert + annulation de la suite de l'event via return
            return;
        }
        // Si formulaire valide
        const USER_STORAGE = JSON.parse(localStorage.getItem("users")); // Récupération du localStorage

        // Recherche dans le tableau "USERS" si mail et mdp correspondent à un user enregistré
        let userExist = USER_STORAGE.find(user =>
            user.email === $LOGIN_MAIL.value && user.password === $LOGIN_PWD.value
        );
        if (!userExist) { // Si utilisateur introuvable
            utilities.logInMsg('error');
        } else { // Si utilisateur existe => connexion + session
            sessionStorage.setItem('user', JSON.stringify(userExist));
            window.location.href = "vue/profil.html";
        }
    })
});