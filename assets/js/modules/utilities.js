// Gestion Offcanvas
export const showContent = ($LINKS, i) => {
    $LINKS.forEach((link) => {link.classList.remove('active')}); // Réinitialisation des liens
    let $offcanvas = document.querySelectorAll('.offcanvas');
    let target = $LINKS[i].getAttribute('data-target');

    $offcanvas.forEach((element) => {
        element.classList.remove('show');
    })

    if (target === 'signIn') {
        $LINKS[1].classList.add('active');
        $offcanvas[0].classList.add('show');
    } else if (target === 'logIn') {
        $LINKS[2].classList.add('active');
        $offcanvas[1].classList.add('show');
    } 
}
// Gestion message connexion
export const logInMsg = (status) => {
    let $logInMsg = document.getElementById('logInMsg');
    if(status == 'success') {
        $logInMsg.classList.add('text-teal-200', 'border-teal-200');
        $logInMsg.innerText = 'Inscription réussie ! Vous pouvez vous connecter.';
    } else {
        $logInMsg.classList.add('text-red-200', 'border-red-200');
        $logInMsg.innerText = 'Une erreur est survenue. Vérifier vos identifiants.';
    }
    $logInMsg.classList.remove('hidden');
    $logInMsg.style.opacity = 1;

    fadeOut($logInMsg);
}

const fadeOut = (element) => {
    setTimeout(() => {
        let i = 100;
        let interval = setInterval(() => {
            i--;
            element.style.opacity = i / 100;
            if (i === 60) {
                clearInterval(interval);
            }
        }, 50);
    }, 500);
}
// Regex mail
export const checkMail = (input) => {
    let regex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/; // Regex Email valide
    return !!(input.value.match(regex)); // Retourne Bool si value match regex
}

// Regex password
export const checkPwd = (input) => { 
    let regex = /(?=.*[a-z]+)(?=.*[A-Z])(?=.*\d).{6,}/; // Regex Mdp valide
    return !!(input.value.match(regex)); // Retourne Bool si value match regex
}

// Validation input
export const inputValidate = (input) => {
    let name = input.getAttribute('name');
    let bool = false;

    switch(name) {
        case 'name' :
            bool = input.value.length >= 3;
            break;
        case 'email' :
            bool = checkMail(input);
            break;
        case 'pwdConfirm' :
            bool = input.value == document.getElementById('pwdSignIn').value;
            break;       
        default:
            bool = !!input.value.length > 0;
            break;
    }
    input.classList.toggle('border-orange-400', bool);
    input.classList.toggle('border-gray-300', !bool);
    
    if (input.nextElementSibling && input.nextElementSibling.nodeName === "P") {
        input.nextElementSibling.classList.toggle('hidden', bool);
    }
    return bool;
}

// Validation format mdp
export const pwdSignInValidate = (input) => {
    let bool = checkPwd(input);
    let strength = checkStrenghtPwd(input);

    input.nextElementSibling.classList.toggle('text-red-300', !bool);
    input.nextElementSibling.classList.toggle('text-zinc-400', bool);
    input.classList.toggle('border-orange-400', bool);
    input.classList.toggle('border-gray-300', !bool);

    updateProgressPwd(strength);
    return bool;
};

// Strength mdp inscription
const checkStrenghtPwd = (input) => {
    let chars = input.value.split(''); // Tab de chars value input
    let strength = 0;

    chars.forEach(char => { // Pour chaque element du tableau :
        switch (true) {
            case /[a-z]/.test(char): // Minuscule
                strength += 5;
                break;
            case /[A-Z]/.test(char): // Majuscule
                strength += 10;
                break;
            case /\d/.test(char): // Chiffre
                strength += 15;
                break;
            case /[^a-zA-Z0-9]/.test(char): // Symbole
                strength += 20;
                break;
        }
    });
    return strength;
};

// Mise à jour longueur et affichage en fonction de strength
const updateProgressPwd = (strength) => {
    let $weak = document.getElementById('weak');
    let $middle = document.getElementById('middle');
    let $strong = document.getElementById('strong');

    let $progressBar = document.getElementById('pwdStrength');
    let $progressContainer = $progressBar.parentElement.parentElement;

    $progressBar.style.width = `${strength}%`; // Mise à jour de la largeur de la progress
    
    if (strength > 0) {
        $progressContainer.classList.remove('hidden');
        // CSS en fonction de la valeur de strength
        if (strength > 66) { // Fort => vert
            setProgressColor("#00d5be");
        } else if (strength >= 33) { // Moyen => jaune
            setProgressColor("#fe9a00");
        } else if (strength > 0) { // Faible => rouge
            setProgressColor("#ff6467");
        }
    
        // Gestion des classes d'opacité en fonction de strength
        $weak.classList.toggle('opacity-0', strength > 33);
        $middle.classList.toggle('opacity-0', strength < 33 || strength >= 66);
        $strong.classList.toggle('opacity-0', strength < 66); 
    } else {
        $progressContainer.classList.add('hidden');
    }
};

// Couleur Progress bar
const setProgressColor = (color) => {
    document.getElementById('pwdStrength').style.backgroundColor = color;
}

