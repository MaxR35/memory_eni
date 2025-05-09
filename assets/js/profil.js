document.addEventListener('DOMContentLoaded', () => {

    // Elements :
    const $USER_NAME = document.getElementById('userName');
    const $USER_MAIL = document.getElementById('userMail');
    const $LOGOUT_BTN = document.getElementById('logOutBtn');

    // SessionSotrage
    const USER_CONNECTED = JSON.parse(sessionStorage.getItem('user'));

    if(USER_CONNECTED) { // Si user existe dans sessionStorage => utilisatuer connecté

        // Affichage des infos utilisateur
        $USER_NAME.innerHTML = USER_CONNECTED.name;
        $USER_MAIL.innerHTML = USER_CONNECTED.email;
    } else { // Si aucun sessionStorage existe => redirection accueil
        window.location.href = '../index.html';
    };

    // Event déconnexion
    $LOGOUT_BTN.addEventListener('click', () => {
        // Suppression sessionStorage + redirection accueil
        sessionStorage.clear();
        window.location.href = '../index.html';
    });
});