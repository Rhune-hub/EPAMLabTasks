const input = document.getElementById('rpn-string');
const output = document.getElementById('result');
const errorContainer = document.getElementById('error');

const defaultString = '2 4 + 3 * 6 8 - -';

const operators = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
};

const errorMessage = {
  INVALID_CHARS: 'Input string has invalid chars. Use only numbers,space and +, -, *, /.',
  INCORRECT_ARGS_COUNT: 'Input string has incorrect ration of numbers and operators.',
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
  
function getRandomInt(min=0, max=1000) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
  
function getRandomSleepMS() {
  return getRandomInt(100,3000);
}
  
async function asyncOperation(operation, x, y) {
  const time = getRandomSleepMS();
  await sleep(time);
  return operation(x, y);
}
  
async function evaluate(tokens) {
  let stack = [];
  
  for (const token of tokens) {
    if (token in operators) {
      let [y, x] = [stack.pop(), stack.pop()];
      const result = await asyncOperation(operators[token],x, y);
      stack.push(result);
    } else {
      stack.push(parseFloat(token));
    }
  }

  return stack.pop();
};

function getRpnTokens(str, errorContainer) {
  const tokens = str.trim().replace(/\s+/,' ').split(' ');
  const errors = validateRpnTokens(tokens);
  const errorMessages = Object.values(errors);

  if (errorContainer)
    errorHandler(errorContainer, errorMessages);
  
  const correctValue = errorMessages.length ? null : tokens;

  return correctValue;
}

function validateRpnTokens(tokens) {
  const isInvalidChars = (tokens) => 
                    tokens.every(token => {let a= Number.isNaN(token) && !(token in operators)
                      console.log(a)
                      return a;});
  const isIncorrectArgsCount = (tokens) => {
                    let a = tokens.reduce((acc, val) => 
                      acc + (isNaN(val) ? 1 : -1), 1);
  console.log(a); return(a);
                    }
  //очень не работают функции сравнния
  const errors = {};                  

  if (isInvalidChars(tokens))
    errors.invalidChars =  errorMessage.INVALID_CHARS;
  if (isIncorrectArgsCount(tokens))
    errors.incorrectArgsCount = errorMessage.INCORRECT_ARGS_COUNT;

  return errors;
}

function errorHandler(errorElement, errorMessages) {
  if (errorMessages.length) {
    const errorString = errorMessages.join('<br>');
    showError(errorElement, errorString);
  } else
    hideError(errorElement);
}

function showError(errorBox, errorMessage) {
  errorBox.innerHTML = errorMessage;
  errorBox.classList.remove('hidden');
}

function hideError(errorBox) {
  errorBox.classList.add('hidden');
}
async function decideRpnString(str) {
  const tokens = getRpnTokens(str, errorContainer);
  console.log(tokens);
  const result = tokens ? await evaluate(tokens) : null;

  return result;
}

async function inputHandler(event) {
  console.log(event.keyCode)
  const str = this.value;
  output.value = 'Waiting...';
  const result = await decideRpnString(str) || '-';
  output.value = result;
}

// function keyDownHandler(event) {
//   if (parseInt(event.key) || event.key in operators || event.key === 'backspace')
  
//   this.value += ' '; else
//   event.preventDefault();

// }

async function init() {
  input.addEventListener('input',inputHandler);
 // input.addEventListener('keydown', keyDownHandler);
  input.value = defaultString;
  output.value = await decideRpnString(defaultString);
}

init();