document.addEventListener('DOMContentLoaded', () => {

    const $USER_NAME = document.getElementById('userName');
    const $USER_MAIL = document.getElementById('userMail');

    const USER_CONNECTED = JSON.parse(sessionStorage.getItem('user'));

    if(USER_CONNECTED) {
        $USER_NAME.innerHTML = USER_CONNECTED.name;
        $USER_MAIL.innerHTML = USER_CONNECTED.email;
    }
});