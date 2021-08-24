const faq = document.getElementById('page-faq');
const faqButton = document.getElementById('faq-button');

const max = document.getElementById('max-value');
const min = document.getElementById('min-value');
const result = document.getElementById('result-value');
const errors = [...document.getElementsByClassName('error-block')];
const [minError, maxError, resultError] = errors;

const INCORRECT_RESULT = '-';
const errorMessage = {
    NAN: 'The value is not a number.',
    LESS_THAN_MIN_SAFE: 'The value is less than min safe integer.',
    GREATER_THAN_MAX_SAFE: 'The value is less than max safe integer.',
    UNSAFE_INT: 'The value is unsafe integer.',
    MIN_GREATER_THAN_MAX: 'The min value is greater than the max value.',
    MAX_LESS_THAN_MIN: 'The max value is less than the min value.',
    MIN_VALUE_ERROR: 'The min value is incorrect.',
    MAX_VALUE_ERROR: 'The max value is incorrect.',
    EMPTY: 'The value is empty.',

};

const range = (min, max) => (min + max) / 2 * (max - min + 1);
const rangeMemoize = memoize(range);

init();

function init() {
    faqButton.addEventListener('mouseover', faqOverHandler);
    faqButton.addEventListener('mouseout', faqOutHandler);

    min.addEventListener('keydown', keyHadler);
    max.addEventListener('keydown', keyHadler);
    min.addEventListener('input', resultHandler);
    max.addEventListener('input', resultHandler);

    const defaultMin = 1;
    const defaultMax = 10;

    setDefaultState(defaultMin, defaultMax);
}

function memoize(func) {
    const memory = {};
    return ((f) =>
        (...key) => {
            if (key in memory) {
                const value = memory[key];
                console.log(`Get from memory: [${key}] : ${value}`);
                return value;
            }

            const result = f(...key);
            memory[key] = result;
            return result;
        }
    )(func);
}

function keyHadler(event) {
    const ignoredList = ['.', ',', 'e', 'E', 'Enter'];
    const isMinusAndNonEmpty = event.key === '-' && this.value.length;
    if (ignoredList.includes(event.key) || isMinusAndNonEmpty)
        event.preventDefault();
}
function faqOverHandler() {
    faq.classList.remove('hidden');
}

function faqOutHandler() {
    faq.classList.add('hidden');
}

function setDefaultState(defaultMin, defaultMax) {
    max.max = Number.MAX_SAFE_INTEGER;
    max.min = defaultMin + 1;
    max.value = defaultMax;

    min.min = Number.MIN_SAFE_INTEGER;
    min.max = defaultMax - 1;
    min.value = defaultMin;

    result.value = rangeMemoize(defaultMin, defaultMax);
}

function validateInt(value) {
    const errors = {};

    if (isNaN(value))
        errors.NaN = errorMessage.NAN;
    else {
        console.log(value);
        if (value === '')
            errors.empty = errorMessage.EMPTY;

        if (value < Number.MIN_SAFE_INTEGER)
            errors.lessThanMinSafe = errorMessage.LESS_THAN_MIN_SAFE;

        if (value > Number.MAX_SAFE_INTEGER)
            errors.greaterThanMaxSafe = errorMessage.GREATER_THAN_MAX_SAFE;
    }

    return errors;
}

function getCorrectResult(func, validator, errorElement=null, ...inputValues) {
    const errors = validator(...inputValues);
    const errorMessages = Object.values(errors);

    if (errorElement)
        errorHandler(errorElement, errorMessages);
    
    let correctValue = null;

    if (!errorMessages.length)
        correctValue = func(...inputValues);

    return correctValue;    
}

function errorHandler(errorElement, errorMessages) {
    if (errorMessages.length) {
        const errorString = errorMessages.join('<br>');
        showError(errorElement, errorString);
    } else
        hideError(errorElement);
}

function validateMinMax(min, max) {
    const errors = {};

    const isMinInt = Number.isInteger(min);
    const isMaxInt = Number.isInteger(max);
    const isMinMaxInt = isMaxInt && isMinInt;

    if (!isMinInt)
        errors.minValue = errorMessage.MIN_VALUE_ERROR;

    if (!isMaxInt)
        errors.maxValue = errorMessage.MAX_VALUE_ERROR;

    if (isMinMaxInt && min > max)
        errors.maxLessThanMin = errorMessage.MAX_LESS_THAN_MIN;

    if (isMinMaxInt && !Number.isSafeInteger(range(min,max)))
        errors.unsafeInt = errorMessage.UNSAFE_INT;

    return errors;
}

function resultHandler() {
    const correctMin = getCorrectResult(
        parseInt,
        validateInt,
        minError,
        min.value
    );

    const correctMax = getCorrectResult(
        parseInt,
        validateInt,
        maxError,
        max.value
    );
    
    min.max = correctMax - 1;
    max.min = correctMin + 1;

    const correctResult = getCorrectResult(
        rangeMemoize,
        validateMinMax,
        resultError,
        correctMin, correctMax
    );
    
    if (correctResult === null)
        result.value = INCORRECT_RESULT;
    else
        result.value = correctResult;
}

function showError(errorBox, errorMessage) {
    errorBox.innerHTML = errorMessage;
    errorBox.classList.remove('hidden');
}

function hideError(errorBox) {
    errorBox.classList.add('hidden');
}