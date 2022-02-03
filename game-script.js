let gameSequence = [];
let gameSequenceHuman = [];
let level = 0;

const buttonEasy = document.querySelector('.mode__button_easy');
const buttonStandart = document.querySelector('.mode__button_standart');
const buttonHard = document.querySelector('.mode__button_hard');
var gameMode = 'standart';

const buttonStart = document.querySelector('.script-start');
const info = document.querySelector('.script-info');
const title = document.querySelector('.header__title');
const tileContainer = document.querySelector('.container');
const scoreBoard = document.querySelector('.hiscore')

function resetGame(text) {
    alert(text);
    gameSequence = [];
    gameSequenceHuman = [];
    level = 0;
    document.querySelector('.toolbar').classList.remove('hidden');
    title.textContent = 'Simon game';
    info.classList.add('hidden');
}

function playerTurn(level) {
    info.textContent = `Ваш ход. Нажатий осталось: ${level} `
}


//the tile is activated for a time of 300 miliseconds, 
//then the effect is removed
function tileActive(color) {
    const tile = document.querySelector(`[data-tile='${color}']`);
    const sound = document.querySelector(`[data-sound='${color}']`);

    tile.classList.add('activated');
    sound.play();

    setTimeout(() => {
        tile.classList.remove('activated');
    }, 300);
}

//a new sequence is defined,
// by taking gameSequence and adding newStep
function playRound(newSequence) {
    newSequence.forEach((color, index) => {
        setTimeout(() => {
            tileActive(color);
        }, (index + 1) * activeDuration);
    });
}

function newStep() {
    const tiles = ['red', 'green', 'blue', 'yellow'];
    const random = tiles[Math.floor(Math.random() * tiles.length)];
    console.log(random);
    return random;
}

function newRound() {
    level += 1;

    tileContainer.classList.add('unclickable');
    info.textContent = 'Ожидайте...';
    title.textContent = `Уровень ${level} из 32`;

    const newSequence = [...gameSequence];
    newSequence.push(newStep());
    playRound(newSequence);

    gameSequence = [...newSequence];
    setTimeout(() => {
        playerTurn(level);
    }, level * activeDuration + 1000);
};

/*Here the code validates the player input*/
function manualClick(tile) {
    const number = gameSequenceHuman.push(tile) - 1;
    const sound = document.querySelector(`[data-sound='${tile}']`);
    sound.play();
    const remainingTaps = gameSequence.length - gameSequenceHuman.length;

    if (gameSequenceHuman[number] !== gameSequence[number]) {
        resetGame('Опаньки, неверная последовательность');
        return;
    }

    if (gameSequenceHuman.length === gameSequence.length) {
        if (gameSequenceHuman.length === 32) {
            resetGame('Отлично! Игра пройдена.')
            return
        }

        gameSequenceHuman = [];
        info.textContent = 'Неплохо. Продолжайте.';
        setTimeout(() => {
            newRound();
        }, 1000);
        return;
    }
    info.textContent = `Ваш ход. Нажатий осталось: ${remainingTaps}`;
};

function gameStart() {
    document.querySelector('.toolbar').classList.add('hidden');
    info.classList.remove('hidden');
    info.innerHTML = 'Ждите...';
    newRound();
    console.log(gameMode);
}


buttonStart.addEventListener('click', gameStart);

/*Here are the buttons and the conditions 
that let us adjust the difficulty*/
if (gameMode == 'hard') {
    activeDuration = 400;
} else if (gameMode == 'easy') {
    activeDuration = 1500;
} else if (gameMode == 'standart') {
    var activeDuration = 1000;
}
buttonEasy.addEventListener('click', function() {
    gameMode = 'easy';
    activeDuration = 1500;
    console.log(gameMode);
    console.log(activeDuration);
});
buttonHard.addEventListener('click', event => {
    gameMode = 'hard';
    activeDuration = 500;
    console.log(gameMode);
    console.log(activeDuration);
});
tileContainer.addEventListener('click', event => {
    const { tile } = event.target.dataset;
    if (tile) manualClick(tile);
});