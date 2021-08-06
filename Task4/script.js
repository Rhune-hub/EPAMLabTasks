'use strict';

Object.defineProperty(Array.prototype, 'count', {
    value: function(value) {
        return this.filter(x => x==value).length;
    }
})

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

main();

function main() {
    const gaussObject = getGaussObject();
    const tableContent = Object.entries(gaussObject);
    
    const table = createTable('Gauss Object Table','gauss-object-table', tableHeaders, tableContent);
    document.body.appendChild(table);
}

function getGaussObject(count=10) {
    const randNumbers = getRandomNumbersArray();
    const uniqNumbers = [...new Set(randNumbers)];
    const objectProps = uniqNumbers.map(num => [num, randNumbers.count(num)]);
    const gaussObject = Object.fromEntries(objectProps);

    return gaussObject;
}
function getRandomNumbersArray(count=10) {
    const arr = [];
    if (count > 0)
        while (count--) arr.push(randn_bm());
    return arr;
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
    
    const container = document.createElement('section');
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

