const typesCoercionList = [
    "false+true",
    "'20' + 2 + 1",
    "20 + 2 + '1'",
    "'3'/2",
    "!!228",
    "NaN == 228",
    "null == 228",
    "NaN == NaN",
    "null == null",
    "undefined == undefined",
    "null == undefined",
    "null === undefined",
    "1 == true",
    "!!'false' == !!'true'",
    "null == ''",
    "['z'] == 'z'",
    "[1] > null",
    "[1,2,3] == [1,2,3]",
    "[]+null+1",
    "[]+{}+[1]",
    "!+[]+[]+![]",
    "!+[]+![]",
    "('a'+ +'a'+'a'+'s').toLowerCase()",
    "new Date(0) + 0",
    "new Date(0) - 0",
];

const tableHeaders = [
    'EXPRESSION',
    'RESULT',
];

init();

function init() {
    
    const tableContent = typesCoercionList.map(ex => {
        const result = new Function('return '+ex)();
        console.log(`${ex} => ${result}`); 
        return [ex, result]});
    
    const table = createTable('Type Coercion Table','type-coercion-table', tableHeaders, tableContent);
    document.body.appendChild(table);
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

