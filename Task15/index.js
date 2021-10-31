import "core-js/stable";
import "regenerator-runtime";
import userHandler from "./user.js";
import themeHandler from "./theme.js";

const categoriesSelect = document.getElementById('categories');
const titlesSelect = document.getElementById('titles');
const infoTable = document.getElementById('api-info')
const errorSpan = document.getElementById('error');

let entriesList = [];

themeHandler();
userHandler();

async function categoriesChangeHandler() {
  try {
    const category = this.value;
    const entries = await (await import('./apiEntries')).getEntries(category);
    entriesList = entries;
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
    const categories = await (await import('./apiCategories')).getCategories();
    setSelect(categoriesSelect, categories);
    categoriesChangeHandler.call(categoriesSelect);
  } catch(error) {
    showError(errorSpan, error.message);
  }
}

init();