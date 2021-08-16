function randn_bm() {
    let u = 0, 
        v = 0;
    while (u === 0) 
        u = Math.random();  
    while (v === 0) 
        v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v) * 2 | 0;
} 

const tableHeaders = [
    'NUMBER',
    'COUNT',    
];

const wrapper = document.querySelector('.wrapper');

init();

function init() {
    const slider = createSlider('numbers-count-slider', 3, 30, 10, 1, sliderHandler);
    wrapper.appendChild(slider);
    
    addGaussObjectTable(10);
}

function match(arr, value) {
    return arr.filter(x => x === value).length;
}

function getGaussObject(count=10) {
    const randNumbers = getRandomNumbersArray(count);
    const uniqNumbers = [...new Set(randNumbers)];
    const objectProps = uniqNumbers.map(num => [num, match(randNumbers, num)]);
    const gaussObject = Object.fromEntries(objectProps)

    return gaussObject;
}
function getRandomNumbersArray(count=10) {
    const arr = [];
    if (count > 0)
        while (count--) arr.push(randn_bm());
    return arr;
}

function createSlider(id, min, max, start, step, sliderHandler) {
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.addEventListener('input', sliderHandler);
    slider.id = id;
    slider.classList.add('slider')
    slider.min = min;
    slider.max = max;
    slider.step = step;
    slider.value = start;

    const sliderContainer = document.createElement('div');
    sliderContainer.classList.add('slider-container');

    const numberViewer = createNumberViewer(slider);
    const dataLabelsList = createSliderLabel(slider, 'numbers-count', min, max);

    sliderContainer.appendChild(numberViewer)
    sliderContainer.appendChild(slider);
    sliderContainer.appendChild(dataLabelsList);


    return sliderContainer;
}

function createNumberViewer(slider) {
    const numberViewer = document.createElement('span');
    numberViewer.classList.add('number-viewer');
    numberViewer.textContent = slider.value;
    
    const numberViewerContainer = document.createElement('div');
    numberViewerContainer.classList.add('number-viewer-container');
    
    const numberViewerText = document.createElement('span');
    numberViewerText.classList.add('number-viewer-text');
    numberViewerText.innerHTML = `Current count of elements: ${numberViewer.outerHTML}`;

    numberViewerContainer.appendChild(numberViewerText);

    slider.addEventListener('input', sliderViewerHandler);
    
    return numberViewerContainer;
}

function createSliderLabel(slider, id, min, max) {
    const datalist = document.createElement('datalist');
    datalist.id = id;
    datalist.classList.add('slider-labels');

    const minOption = new Option(min,min);
    const maxOption = new Option(max,max);
    datalist.appendChild(minOption);
    datalist.appendChild(maxOption);

    slider.setAttribute('list', id);

    return datalist;
}

function sliderHandler(event) {
    const currentNumber = Number(event.currentTarget.value);
    addGaussObjectTable(currentNumber);
}

function sliderViewerHandler(event) {
    console.log(event.currentTarget.value)
    document.querySelector('.number-viewer').textContent = event.currentTarget.value;
}

function addGaussObjectTable(numbersCount) {
    const gaussObject = getGaussObject(numbersCount);
    const tableContent = Object.entries(gaussObject);
    
    const table = createTable('Gauss Object Table','gauss-object-table', tableHeaders, tableContent);
    wrapper.appendChild(table);
}

function createTable(tableName, tableId,columnHeaders,content,containerClassName='table-container') {
    const table = document.createElement('table');
    table.id = tableId;
    
    const caption = document.createElement('caption');
    caption.textContent = tableName;
    table.appendChild(caption);

    const header = createTableHeader(columnHeaders);
    table.appendChild(header);
    
    const body = createTableBody(content);
    table.appendChild(body);
    
    const container = document.querySelector(`.${containerClassName}`) || document.createElement('section');
    container.innerHTML = '';
    container.classList.add(containerClassName);
    container.appendChild(table);

    return container;
}

function createTableRow(rowContent) {
    const tableRow = document.createElement('tr');
    rowContent.forEach(cellContent => {
        const cell = document.createElement('td');
        cell.textContent = cellContent;
        tableRow.appendChild(cell);
    });

    return tableRow;
}

function createTableBody(content) {
    const tableBody = document.createElement('tbody');

    content.forEach(rowContent => {
        const bodyRow = createTableRow(rowContent);
        tableBody.appendChild(bodyRow);
    });
    
    return tableBody;
}

function createTableHeader(headers) {
    const header = document.createElement('thead');
    const headerRow = document.createElement('tr');

    headers.forEach(columnName => {
        const columnHeader = document.createElement('th');
        columnHeader.textContent = columnName;
        headerRow.appendChild(columnHeader);
    });

    header.appendChild(headerRow);
    return header;
}

