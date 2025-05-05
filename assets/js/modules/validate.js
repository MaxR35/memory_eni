// Regex mail
const checkMail = (mail) => {
    let regex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
    return !!(mail.value.match(regex));
}

// Regex password
const checkPwd = (pwd) => {
    let regex = /(?=.*[a-z]+)(?=.*[A-Z])(?=.*\d).{6,}/;
    return !!(pwd.value.match(regex));
}
// Password Strength progress
const pwdStrength = (pwd, $progressBar) => {
    $progressBar.parentElement.parentElement.classList.remove('hidden')
    let chars = pwd.value.split('');
    let strength = 0;

    chars.forEach(char => {
        
        if(char.match(/[a-z]/)) { // Lowercases
            strength = strength + 5;
        } else if(char.match(/[A-Z]/)) { // Uppercases
            strength = strength + 10;
        } else if(char.match(/\d/)) { // Numbers
            strength = strength + 15;
        } else if(char.match(/[^a-zA-Z0-9]/)) { // Numbers
            strength = strength + 20;
        } 
    });
    $progressBar.style.width = `${strength}%`; // Update width

    if (strength > 66) { // Strong
        $progressBar.style.backgroundColor = "#00d5be"; 
        document.getElementById('middle').classList.remove('hidden');
        document.getElementById('strong').classList.remove('hidden');
    } else if (strength >= 33) { // Middle
        $progressBar.style.backgroundColor = "#fe9a00";
        document.getElementById('strong').classList.add('hidden');
        document.getElementById('middle').classList.remove('hidden');
    } else if(strength > 0) { // Weak
        $progressBar.style.backgroundColor = "#ff6467";
        document.getElementById('middle').classList.add('hidden');
        document.getElementById('weak').classList.remove('hidden');
    } else {
        $progressBar.parentElement.parentElement.classList.remove('hidden')
    }
}

// Update Css Valid Input
const inputValidate = (input, bool) => {
    input.classList.toggle('border-orange-400', bool);
    input.classList.toggle('border-gray-300', !bool);
}

// Export
export { checkMail, inputValidate, checkPwd, pwdStrength };