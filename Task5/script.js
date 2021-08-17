
const faq = document.getElementById('page-faq');
const faqButton = document.getElementById('faq-button');

const max = document.getElementById('max-value');
const min = document.getElementById('min-value');
const result = document.getElementById('result-value');
const attentions = [...document.getElementsByClassName('attention-block')];

const INCORRECT_RESULT = '-';

const range = (min, max) => (min + max) / 2 * (max - min + 1);
const rangeMemoize = memoize(range);

init();

function init() {
    faqButton.addEventListener('mouseover', faqOverHandler);
    faqButton.addEventListener('mouseout', faqOutHandler);

    max.addEventListener('input', maxInputHandler);
    min.addEventListener('input', minInputHandler);
    min.addEventListener('input',resultHandler);
    max.addEventListener('input',resultHandler);

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
            
            const result = func(...key);
            memory[key] = result;
            return result;
        }
    )(func);
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

function isCorrectInput() {
    const minValue = min.value;
    const maxValue = max.value;

    const isAnyNaN = minValue === '' || maxValue === '';

    console.log(isAnyNaN)
    return !isAnyNaN && Number(minValue) < Number(maxValue);
}

function resultHandler() {
    const isCorrect = isCorrectInput();

    if (isCorrect) {
        const minValue = Number(min.value);
        const maxValue = Number(max.value);
        const resultValue = rangeMemoize(minValue,maxValue);
        if (resultValue < Number.MAX_SAFE_INTEGER) {
            hideAttention(result);
            result.value = resultValue;
            return;
        } else 
            showAttention(result);
    }

    result.value = INCORRECT_RESULT;
}

function minInputHandler() {
    hideAttention(this);
    hideAttention(max);

    if (this.value === '') {
        max.min = Number.MIN_SAFE_INTEGER;
        return;
    } else 
        max.min = Number(min.value) + 1;
    
    const currentMax = Number(this.max) || Number(this.value);
    if (Number(this.value) > currentMax)
        showAttention(this);
}

function maxInputHandler() {
    hideAttention(this);
    hideAttention(min);

    if (this.value === '') {
        min.max = Number.MAX_SAFE_INTEGER;
        return;
    } else
        min.max = Number(max.value) - 1;
     
    const currentMin = Number(this.min) || Number(this.value);
    if (Number(this.value) < currentMin)
        showAttention(this);
}

function showAttention(element) {
    element.nextElementSibling.classList.remove('hidden');
}

function hideAttention(element) {
    element.nextElementSibling.classList.add('hidden');
}