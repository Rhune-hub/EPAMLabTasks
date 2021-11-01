const input = document.getElementById('rpn-string');
const output = document.getElementById('result');
const errorContainer = document.getElementById('error');

const defaultString = '1 2 + 3 * 4 +';

const operators = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
};

let memoizeSolveRpnString;

const errorMessage = {
  INVALID_CHARS: 'Input string has invalid chars. Use only numbers,space and +, -, *, /.',
  INCORRECT_ARGS_COUNT: 'Input string has incorrect ration of numbers and operators.',
}

function memoize(func) {
  const memory = {};
  return ((f) =>
      async (...key) => {
          if (key in memory) {
              const value = memory[key];
              console.log(`Get from memory: [${key}] : ${value}`);
              return value;
          }

          const result = await f(...key);
          if (result)
            memory[key] = result;
          return result;
      }
  )(func);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
  
function getRandomInt(min=0, max=1000) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
  
function getRandomSleepMS() {
  return getRandomInt(1000,5000);
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
  const tokens = str.replace(/\s+/,' ').split(' ');
  const errors = validateRpnTokens(tokens);
  const errorMessages = Object.values(errors);

  if (errorContainer)
    errorHandler(errorContainer, errorMessages);
  
  const correctValue = errorMessages.length ? null : tokens;

  return correctValue;
}

function validateRpnTokens(tokens) {
  const isInvalidChars = (tokens) => 
      tokens.every(token => Number.isNaN(token) && !(token in operators));

  const isIncorrectArgsCount = (tokens) =>
      tokens.reduce((acc, val) => acc + (isNaN(val) ? 1 : -1), 1);
    
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
async function solveRpnString(str) {
  const tokens = getRpnTokens(str, errorContainer);
  const result = tokens ? await evaluate(tokens) : null;

  return result;
}

async function inputHandler(event) {
  const str = this.value.trim();
  output.value = 'Waiting...';
  const result = await memoizeSolveRpnString(str) || '-';
  if (str === this.value.trim()) 
    output.value = result;
}

function init() {
  input.addEventListener('input',inputHandler);
  memoizeSolveRpnString = memoize(solveRpnString);
  input.value = defaultString;
  inputHandler.call(input);
}

init();