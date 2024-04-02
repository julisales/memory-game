const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const items = [
    'apple',
    'carrot',
    'cucumber',
    'grape',
    'mango',
    'pepper',
    'pineapple',
    'strawberry',
    'tomato'
];


const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
};

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 18) {
        clearInterval(this.loop);
        const victoryAlert = document.createElement('div');
        victoryAlert.className = 'victory-alert';
        victoryAlert.innerHTML = `
            <h2>Congratulations, ${spanPlayer.innerHTML}!</h2>
            <p>Your time was: ${timer.innerHTML}</p>
            <button class="restart-button">Play Again</button>
        `;
        document.body.appendChild(victoryAlert);

        const restartButton = document.querySelector('.restart-button');
        restartButton.addEventListener('click', () => {
            victoryAlert.remove();
            resetGame();
        });
    }
};

const resetGame = () => {
    clearInterval(this.loop);
    grid.innerHTML = '';
    startTimer();
    loadGame();
};

const checkCards = () => {
    const firstItem = firstCard.getAttribute('data-item');
    const secondItem = secondCard.getAttribute('data-item');

    if (firstItem === secondItem) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';

        }, 500);
    };
};

const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('reveal-card')) {
        return;
    };

    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    };
};

const createCard = (item) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    // Card image created by Angkana on Canva
    front.style.backgroundImage = `url('../assets/images/${item}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-item', item);

    return card;
};

const loadGame = () => {

    const duplicateItems = [...items, ...items];

    const shuffledArray = duplicateItems.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((item) => {
        const card = createCard(item);
        grid.appendChild(card);
    });
};

const startTimer = () => {
    let seconds = 0;
    this.loop = setInterval(() => {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const formattedSeconds = seconds % 60;
        timer.innerHTML = `${minutes.toString().padStart(2, '0')}:${formattedSeconds.toString().padStart(2, '0')}`;
    }, 1000);
};

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();

    loadGame();
};
