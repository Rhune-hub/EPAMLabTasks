const firstObjectExample = {
    x: 2,
    y: 3,
    z: 'a',
};
const secondObjectExample = {
    x: 3,
    z: 'v',
};

const resultTextarea = document.getElementById('result-object');
const objectsSet = document.getElementsByName('objects-set');

init();

function init() {
    addObjectBlock(1);
    addObjectBlock(2);
    objectsSet[0].value = JSON.stringify(firstObjectExample);
    objectsSet[1].value = JSON.stringify(secondObjectExample); 
    document.getElementById('add-objects')
            .addEventListener('click', addObjectsHandler);
    document.getElementById('intersect-objects')
            .addEventListener('click',intersectObjectsHandler);
}

function addObjectsHandler() {
    const objects = getObjectsSet();
    const resultedObject = addObjects(...objects);
    resultTextarea.value = JSON.stringify(resultedObject);
}

function intersectObjectsHandler() {
    const objects = getObjectsSet();
    const resultedObject = intersectObjects(...objects);
    resultTextarea.value = JSON.stringify(resultedObject);
}

function parseJSON(JSONObj) {
    let result = {};
    try {
        result = JSON.parse(JSONObj);
    } catch (e) {
        result = undefined;
    }
    return result;
}

function getObjectsSet() {
    const rowObjects = Array.from(objectsSet);
    const objects = rowObjects.map(obj => parseJSON(obj.value))
        .filter(obj => obj && Object.getOwnPropertyNames(obj).length > 0);
    return objects;
}

function addObjects(...objects) {
    let resultedObject = {};
    for(let o of objects) {
        resultedObject = addObjectsEntries(resultedObject, o);
    console.log(resultedObject);
    }

    return resultedObject;
}

function addObjectsEntries(obj1, obj2) {
    let upgradedObject = {...obj1};
    Object.entries(obj2).forEach(([prop, value]) => {
        if (prop in obj1)
            upgradedObject = {
                ...upgradedObject,
                [prop]: upgradedObject[prop] + value,
            };
        else
            upgradedObject = {
                ...upgradedObject,
                    [prop]: value,
            };
    });
        
    return upgradedObject;
}
    
function intersectObjects(obj1, ...objects) {
    let resultedObject = {};
    const obj1Props = Object.entries(obj1);
    for(let [prop, value] of obj1Props) {
        let isEverywhere = true;
        let propValueAccumulator = value;
        for(let o of objects) {
            if(!(prop in o)) {
                isEverywhere = false;
                break;
            }
            propValueAccumulator += o[prop];
        }
        if (!isEverywhere) continue;
        resultedObject = {
            ...resultedObject,
            [prop]: propValueAccumulator,
        };
    }

    return resultedObject;
}

function addObjectBlock(number) {
    const container = document.createElement('div');
    container.classList.add('form-row');

    const label = document.createElement('label');
    label.textContent = `Object ${number}`;
    label.htmlFor = `object-${number}`;

    const textarea = document.createElement('textarea');
    textarea.classList.add('object-field');
    textarea.name = 'objects-set';
    textarea.id = `object-${number}`;
    textarea.addEventListener('input',textareaHandler);

    container.appendChild(label);
    container.appendChild(textarea);

    const fieldset = document.getElementById('objects-fieldset');
    fieldset.appendChild(container);
                        
}

function textareaHandler(event) {
    const currentTextarea = event.currentTarget;
    const textareas = objectsSet;
    const lastTextarea = textareas[textareas.length - 1]; 
    const currentNumber = Number(currentTextarea.id.split('-')[1]);
    const lastNumber = Number(lastTextarea.id.split('-')[1]);
    const lastObject = parseJSON(lastTextarea.value);

    if (lastObject)
        addObjectBlock(currentNumber+1);
    else if(!lastObject && currentNumber == lastNumber-1)
        lastTextarea.parentElement.remove();
}
