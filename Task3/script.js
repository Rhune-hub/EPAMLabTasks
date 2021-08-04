const firstObjectExample = {
    x: 2,
    y: 3,
    z: 'a',
};
const secondObjectExample = {
    x: 3,
    z: 'v',
};


main();

function main() {
    let textareas = document.getElementsByName('objects-set');
    textareas.forEach(ta => ta.addEventListener('focusin',textareaHandler));
    document.getElementById('add-objects').addEventListener('click',interactObjects);
    console.log(textareas);
    textareas[0].value = JSON.stringify(firstObjectExample);
    textareas[1].value = JSON.stringify(secondObjectExample);
}

function getObject(JSONObj) {
    let result = {};
    try {
       result = JSON.parse(JSONObj);
    } catch (e) {}
    return result;
}

function isJSON(str) {
    try {
       result = JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function interactObjects() {
    const rowObjects = Array.from(document.getElementsByName('objects-set'));
    const objects = rowObjects.map(obj => getObject(obj.value))
        .filter(obj => Object.getOwnPropertyNames(obj).length > 0);
    
    const resultedObject = addObjects(...objects);
    document.getElementById('result-object').value = JSON.stringify(resultedObject);
}

function addObjects(...objects) {
    const resultedObject = {};
    objects.forEach(o => {
        addObjectsEntries(resultedObject, o);
    });

    return resultedObject;
}
function addObjectsEntries(obj1, obj2) {
    Object.entries(obj2).forEach(([prop, value]) => {
        if (prop in obj1)
            obj1[prop] += value;
        else
            obj1[prop] = value;
    });
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
    textarea.addEventListener('change',textareaHandler);

    container.appendChild(label);
    container.appendChild(textarea);

    const fieldset = document.getElementById('objects-fieldset');
    fieldset.appendChild(container);
                        
}

function textareaHandler() {
    const textareas = document.getElementsByName('objects-set');
    const lastTextarea = textareas[textareas.length - 1]; 
    const curNumber = +(lastTextarea.id.split('-')[1]);
    if (lastTextarea.value.trim() !== '' && isJSON(lastTextarea.value))
        addObjectBlock(curNumber+1);
    else if(lastTextarea.value.trim() === '' && !isJSON(lastTextarea.value))
        lastTextarea.parentElement.remove();
}
