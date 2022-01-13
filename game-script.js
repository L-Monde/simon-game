let gameSequence = [];
let gameSequenceHuman = [];

const buttonStart = document.querySelector('.script-start')

function gameStart() {
    buttonStart.classList.add('hidden');
}

buttonStart.addEventListener('click', gameStart);