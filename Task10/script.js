function Product(name, price, weight) {
    this.name = name || 'Unknown';
    this.price = price || 0;
    this.weight = weight || 0;
    this.total = (this.price * this.weight).toFixed(2);
}

const CLASSES = {
    SORTED: 'sorted', 
    INCREASE_SORT: 'increase-sort', 
    DECREASE_SORT: 'decrease-sort'
};

let defaultArray = [
    new Product('Apple', 3, 2.3),
    new Product('Potato', 2, 6),
    new Product('Mango', 5, 1.5),
    new Product('Pineapple', 4, 4.2),
    new Product('Peach', 6, 3),
    new Product('Pepper', 5.2, 2.1),
    new Product('Banana', 2, 3.2),
    new Product('Coconut', 6.8, 1.8),
    new Product('Tomato', 3.1, 2.5),
];
let sortedArray = null;

const tableId = 'product-cart-table';

let sortByColumn = null;
let sortDirection = 1;

function init() {
    const headers = ['Name', 'Price', 'Weight', 'Total'];
    const table = createTable('Product Cart',tableId, headers, defaultArray);
    document.body.appendChild(table);
}


function createTable(tableName,tableId,columnHeaders,content,containerClassName='table-container') {
    const table = document.createElement('table');
    table.id = tableId;
    table.className = 'table';
    
    const caption = document.createElement('caption');
    caption.textContent = tableName;
    caption.className = 'table__caption';
    table.appendChild(caption);

    const header = createTableHeader(columnHeaders);
    table.appendChild(header);
    
    const body = createTableBody(content);
    table.appendChild(body);

    table.addEventListener('click', tableCellClickHandler);
    
    const container = document.querySelector(`.${containerClassName}`) || document.createElement('section');
    container.innerHTML = '';
    container.classList.add(containerClassName);
    container.appendChild(table);

    return container;
}

function createTableRow(rowContent) {
    const tableRow = document.createElement('tr');
    tableRow.classList.add('table-body__row');
    Object.values(rowContent).forEach(cellContent => {
        const cell = document.createElement('td');
        cell.classList.add('table-body__cell');
        cell.textContent = cellContent;
        tableRow.appendChild(cell);
    });

    return tableRow;
}

function createTableBody(content) {
    const tableBody = document.createElement('tbody');
    tableBody.classList.add('table__body');

    content.forEach(rowContent => {
        const bodyRow = createTableRow(rowContent);
        tableBody.appendChild(bodyRow);
    });
    
    return tableBody;
}

function createTableHeader(headers) {
    const header = document.createElement('thead');
    const headerRow = document.createElement('tr');
    header.classList.add('table__header');
    headerRow.classList.add('table-header__row');

    headers.forEach(columnName => {
        const columnHeader = document.createElement('th');
        columnHeader.textContent = columnName;
        columnHeader.classList.add('table-header__cell');
        headerRow.appendChild(columnHeader);
    });

    header.appendChild(headerRow);
    return header;
}

function tableCellClickHandler(event) {
    const selectedCell = event.target;
    switch (selectedCell.tagName) {
        case 'TH': 
            const selectedPropName = selectedCell.textContent.toLowerCase();
            const isCurrentColumn = sortByColumn === selectedPropName;
            if (isCurrentColumn)
                sortDirection = -1 * sortDirection;
            sortedArray = sortByProperty(sortedArray || defaultArray, selectedPropName);
            updateTable(tableId, sortedArray, selectedCell, sortDirection);
            sortByColumn = selectedPropName;
            break;
        case 'TD':
            transformCell(selectedCell);
            break;
        default: break;
    }
}

function sortByProperty(array, propName) {
    const compareFunc = preSortFunction(propName);
    return [...array].sort(compareFunc);
}

function updateTable(tableId, array, header, sortDirection) {
    document.querySelectorAll('.table-header__cell')
                .forEach(header => header.classList
                                    .remove(...Object.values(CLASSES)));
    const sortType = sortDirection === 1 ? CLASSES.INCREASE_SORT : CLASSES.DECREASE_SORT;
    header.classList.add(CLASSES.SORTED, sortType);

    const newTableBody = createTableBody(array);
    const table = document.getElementById(tableId);
    const oldTableBody = table.getElementsByTagName('tbody')[0];
    table.replaceChild(newTableBody, oldTableBody);
}

function preSortFunction(propName) {
    return function (first,second) {
        const [firstValue , secondValue] = [first[propName], second[propName]];
        let compare = null;
        if (!isNaN(firstValue))
            compare = () =>  firstValue - secondValue;
        else 
            compare = () => firstValue < secondValue ? -1 : firstValue > secondValue ? 1 : 0;
        return sortDirection * compare();
    }
}

function transformCell(cell) {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'cell__input'
    input.value = cell.textContent;
    input.addEventListener('blur', editEndingHandler);

    cell.innerHTML = '';
    cell.append(input);

    input.focus();
}

function editEndingHandler() {
    const cell = this.parentNode;

    const cellRowIndex = cell.closest('tr').rowIndex - 1;
    const cellColIndex = cell.cellIndex;

    const selectedObject = defaultArray[cellRowIndex];
    const propName = Object.keys(selectedObject)[cellColIndex];
    const currentValue = this.value;
    selectedObject[propName] = isNaN(currentValue) ? currentValue : parseFloat(currentValue);

    cell.innerHTML = currentValue;
}

init();



