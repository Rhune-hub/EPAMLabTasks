import "core-js/stable";
import "regenerator-runtime/runtime";
import "isomorphic-fetch"

const categoriesSelect = document.getElementById('categories');
const titlesSelect = document.getElementById('titles');
const infoTable = document.getElementById('api-info')
const errorSpan = document.getElementById('error');

let entriesList = [];

async function getAPIData(url) {
  try {
    const data = await fetch(url);
    return await data.json();
  } catch(error) {
    throw new Error('Could not get data from the server.');
  }
}

async function getCategories() {
  const categories = await getAPIData('https://api.publicapis.org/categories');
  
  return categories;
}

async function getEntries(category) {
  const categoryFirstWord = category.split(' ')[0];
  const apiData = await getAPIData(`https://api.publicapis.org/entries?category=${categoryFirstWord}&https=true`);
  if (apiData) {
    const entries = apiData.entries;
    entriesList = entries;
    return entries;
  }
  else return null;
}

async function categoriesChangeHandler() {
  try {
    const category = this.value;
    const entries = await getEntries(category);
    const titles = entries.map(entry => entry.API);
    setSelect(titlesSelect, titles);
    setEntryInfo(entries[0]);  
    hideError(errorSpan);
  } catch(error) {
    showError(errorSpan, error.message);
  }
}

async function titlesChangeHandler() {
  try {
    const title = this.value;
    const entry = entriesList.find(entry => entry.API === title);
    setEntryInfo(entry);
    hideError(errorSpan);
  } catch(error) {
    showError(errorSpan, error.message);
  }
}

function setSelect(select, list) {
  select.options.length = 0;
  const options = list.map(element => new Option(element));
  options.forEach(option => select.appendChild(option));
}

function setEntryInfo(entry) {
  const tableBody = infoTable.querySelector('tbody');
  tableBody.innerHTML = '';
  const tableElements = Object.entries(entry)
    .map(([key,value]) => { return {key, value} })
    .filter(e => e.value);
  
  if (tableElements.length > 0)
    infoTable.classList.remove('hidden');
  else
    infoTable.classList.add('hidden');

  tableElements.forEach(e => {
    const propTd = document.createElement('td');
    propTd.textContent = e.key;
    
    const valueTd = document.createElement('td');
    valueTd.textContent = e.value;
    
    const tr = document.createElement('tr');
    tr.append(propTd,valueTd);

    tableBody.appendChild(tr);
  });
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

async function init() {
  categoriesSelect.addEventListener('change', categoriesChangeHandler);
  titlesSelect.addEventListener('change', titlesChangeHandler);

  try {
    const categories = await getCategories();
    setSelect(categoriesSelect, categories);
    categoriesChangeHandler.call(categoriesSelect);
  } catch(error) {
    showError(errorSpan, error.message);
  }
}

init();