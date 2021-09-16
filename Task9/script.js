const gameFields = [...document.getElementsByClassName('game-field-element')];
const resultField = document.querySelector('.game-result');
const restartButton = document.querySelector('.restart-button');

const gameSymbol = {
    CROSS: 'X',
    NOUGHT: 'O',
    DRAW: '-',
};

let isX, gameMove, gameMatrix;

function init() {
    restartButton.addEventListener('click', setStartGameParams);
    setStartGameParams();
}

function setStartGameParams() {
    isX = true;
    gameMove = 0;
    gameMatrix = [
        ['','',''],
        ['','',''],
        ['','',''],
    ];
    gameFields.forEach(field => {
        field.addEventListener('click', clickHandler);
        field.textContent = '';
    });
    resultField.classList.add('hidden');
    resultField.textContent = '';
}

function clickHandler() {
    if (this.textContent === '') {
        this.textContent = isX ? gameSymbol.CROSS : gameSymbol.NOUGHT;
        const [fieldIndexJ, fieldIndexI]= this.className.split(' ').slice(1);
        setGameMatrix(fieldIndexI, fieldIndexJ, this.textContent);
        isX = !isX;
        gameMove++;
        if (gameMove >= 5) {
            const winner = checkWinner();
            if (winner) 
                setResult(winner);
        }
    }
}

function setGameMatrix(iString, jStirng, value) {
    const matrixIndex = {
        'left': 0,
        'top': 0,
        'right': 2,
        'bottom': 2,
        'middle': 1
    };
    const [i, j] = [matrixIndex[iString], matrixIndex[jStirng]]
    gameMatrix[i][j] = value;
}

function compare(a, b, c) {
    return a === b && a === c && a !== '';
}

function checkWinner() {
    let winner = null;

    for (let i = 0; i < 3; i++) {
        if (compare(gameMatrix[i][0], gameMatrix[i][1], gameMatrix[i][2])) {
            winner = gameMatrix[i][0];
            break;
        }
        if (compare(gameMatrix[0][i], gameMatrix[1][i], gameMatrix[2][i])) {
            winner = gameMatrix[0][i];
            break;
        }
    }

    if (compare(gameMatrix[0][0], gameMatrix[1][1], gameMatrix[2][2]))
        winner = gameMatrix[0][0];
    
    if (compare(gameMatrix[0][2], gameMatrix[1][1], gameMatrix[2][0]))
        winner = gameMatrix[0][2];

    if (gameMove === 9)
        winner = gameSymbol.DRAW;
    
    return winner;
}

function setResult(winner) {
    const resultStrings = {
        'X': 'The First player WIN!',
        'O': 'The Second player WIN!',
        '-': 'The DRAW!',
    }
    resultField.textContent = resultStrings[winner];
    resultField.classList.remove('hidden');
    gameFields.forEach(field => field.removeEventListener('click',clickHandler));
}

init();