const input = document.querySelector('.login-input');
const btn = document.querySelector('.btn-login');
const form = document.querySelector('.login-form');

const validateInput = ({ target }) => {
    if (target.value.length > 1) {
        btn.removeAttribute('disabled');
    } else {
        btn.setAttribute('disabled', '');
    }
}

const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem('player', input.value);
    window.location = '../pages/game.html';
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);
