const faq = document.getElementById('page-faq');
const faqButton = document.getElementById('faq-button');

const inputString = document.getElementById('input-string');
const tableContainer = document.querySelector('.table-container');

const defaultString = 'ABC';

init();

function init() {
    faqButton.addEventListener('mouseover', faqOverHandler);
    faqButton.addEventListener('mouseout', faqOutHandler);

    inputString.addEventListener('input', inputHandler);
    setDefaultState(defaultString);
}

function setDefaultState(defaultString) {
    inputString.value = defaultString;
    
    createAllPermutationsTable(defaultString);
}

function faqOverHandler() {
    faq.classList.remove('hidden');
}

function faqOutHandler() {
    faq.classList.add('hidden');
}

function inputHandler() {
    const currentValue = this.value;
    if (currentValue.length)
        createAllPermutationsTable(currentValue);
    else
        tableContainer.innerHTML = '';
}

function createAllPermutationsTable(string) {
    const permutations = getAllPermutations(string);
    permutations.sort();
    const columnsCount = string.length;
    const rowsCount = permutations.length / columnsCount;
    const tableHeaders = [...string].sort();
    const tableContent = Array(rowsCount);
    permutations.forEach( (value, index) => {
        const row = index % rowsCount;
        const column = index / rowsCount | 0;
        tableContent[row] = tableContent[row] || [];
        tableContent[row][column] = value;
    });

    createTable(
        tableContainer,
        'Permutations Table',
        'permutations-table', 
        tableHeaders, 
        tableContent
    );
}

function getAllPermutations(string) {
    const chars = [...string];
    const parts = [ chars[0] ];
    

    for (let i = 1; i < chars.length; i++) {
        for (let j = parts.length - 1; j >= 0; --j) {
            const [str] = parts.splice(j,1);
            for (let k = 0; k <= str.length; k++) {
                parts.push(str.slice(0, k) + chars[i] + str.slice(k));
            }
        }
    }

    return [...new Set(parts)];
}

function createTable(tableContainer, tableName,tableId,columnHeaders,content) {
    const table = document.createElement('table');
    table.id = tableId;
    
    const caption = document.createElement('caption');
    caption.textContent = tableName;
    table.appendChild(caption);

    const header = createTableHeader(columnHeaders);
    table.appendChild(header);
    
    const body = createTableBody(content);
    table.appendChild(body);
    
    tableContainer.innerHTML = '';
    tableContainer.appendChild(table);
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
