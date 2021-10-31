const gameFields = [...document.getElementsByClassName('game-field-element')];
const resultField = document.querySelector('.game-result');
const restartButton = document.querySelector('.restart-button');

const gameSymbol = {
    CROSS: 'X',
    NOUGHT: 'O',
    DRAW: '-',
};

let isX, gameMove;

function init() {
    restartButton.addEventListener('click', setStartGameParams);
    setStartGameParams();
}

function setStartGameParams() {
    isX = true;
    gameMove = 0;

    gameFields.forEach(field => {
        field.addEventListener('click', clickHandler);
        field.textContent = '';
    });
    resultField.classList.add('hidden');
    resultField.textContent = '';
}

function clickHandler() {
    this.textContent = isX ? gameSymbol.CROSS : gameSymbol.NOUGHT;
    const { i, j } = this.dataset;

    isX = !isX;
    gameMove++;
    if (gameMove >= 5) {
        const winner = checkWinner(this.textContent);
        if (winner) 
            setResult(winner);
    }

    this.removeEventListener('click', clickHandler);
}

function compare(a, b, c) {
    return a === b && a === c && a !== '';
}

function checkWinner(player) {
    const winMatrix = [
        [ [0, 0], [0, 1], [0, 2] ],
        [ [1, 0], [1, 1], [1, 2] ],
        [ [2, 0], [2, 1], [2, 2] ],

        [ [0, 0], [1, 0], [2, 0] ],
        [ [0, 1], [1, 1], [2, 1] ],
        [ [0, 2], [1, 2], [2, 2] ],
        
        [ [0, 0], [1, 1], [2, 2] ],
        [ [0, 2], [1, 1], [2, 0] ],
    ];
    
    const isWin = winMatrix.some(combinations => {
        const ceils = combinations.reduce((accum, indexes) => {
            const [i, j] = indexes;
            return [...accum, gameFields[i*3+j].textContent];
        }, []);
        return compare(...ceils);
    });

    let winner = null;
    
    if (isWin)
        winner = player;
    else if (gameMove === 9) 
        winner = gameSymbol.DRAW;

    return winner;
}

function setResult(winner) {
    const resultStrings = {
        [gameSymbol.CROSS]: 'The First player WIN!',
        [gameSymbol.NOUGHT]: 'The Second player WIN!',
        [gameSymbol.DRAW]: 'The DRAW!',
    }
    resultField.textContent = resultStrings[winner];
    resultField.classList.remove('hidden');
    gameFields
        .filter(field => field.textContent === '')
        .forEach(field => field.removeEventListener('click',clickHandler));
}

init();