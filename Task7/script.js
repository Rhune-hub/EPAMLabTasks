class Entity {
    constructor(name) {
        this.name = name;
    }
}

class Staff extends Entity {
    constructor(name) {
        super(name);
    }
}

class Box extends Entity {
    constructor(name, owner, color) {
        super(name);
        this.owner = owner;
        this.staff = new Array();
        this.color = color;
    }
}

class User extends Entity {
    constructor(name, color) {
        super(name);
        this.color = color;
    }
}

function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

let users = [];
let boxes = [];
let staffs = [];

const error = {
    USER_ALREADY_EXIST: 'The user with such name is already exist',
    BOX_ALREADY_EXIST: 'The box with such name is already exist',
    STAFF_ALREADY_EXIST: 'The staff with such name is already exist',
    REMOVE_LAST_ELEMENT: 'Last element is not removable'

};

const userNameInput = document.getElementById('user-name');
const boxNameInput = document.getElementById('box-name');
const staffNameInput = document.getElementById('staff-name');

const selectedUser = document.getElementById('selected-user-name');
const selectedBox = document.getElementById('selected-box-name');

const usersContainer = document.getElementById('users-container');
const boxesContainer = document.getElementById('boxes-container');
const staffsContainer = document.getElementById('staff-container');

const addUserButton = document.getElementById('add-user-button');
const addBoxButton = document.getElementById('add-box-button');
const addStaffButton = document.getElementById('add-staff-button');

const removeUserButton = document.getElementById('remove-user-button');
const removeBoxButton = document.getElementById('remove-box-button');
const removeStaffButton = document.getElementById('remove-staff-button');

const userError = document.getElementById('user-error');
const boxError = document.getElementById('box-error');
const staffError = document.getElementById('staff-error');

const userForm = document.getElementById('user-form');
const boxForm = document.getElementById('box-form');
const staffForm = document.getElementById('staff-form');

function init() {

    userNameInput.value = 'ExampleUser';
    boxNameInput.value = 'ExampleBox';
    staffNameInput.value = 'ExampleStaff';

    addUser();
    addBox();
    addStaff();

    addUserButton.addEventListener('click', addUser);
    addBoxButton.addEventListener('click', addBox);
    addStaffButton.addEventListener('click', addStaff);

    removeUserButton.addEventListener('click', removeObject);
    removeBoxButton.addEventListener('click', removeObject);
    removeStaffButton.addEventListener('click', removeObject);
}
    
function createObject(classObject, ...params) {
    const newObject = new classObject(...params);

    return newObject;
}

function createObjectContainer(type, textContent, bgColor='white', color='black') {
    const container = document.createElement('div');
    container.classList.add('object-list-element');
    container.textContent = textContent;
    container.setAttribute('data-type', type);
    container.style.backgroundColor = bgColor;
    container.style.color = color;

    return container;
}

function getObjectList(type) {
    let list = [];
    switch(type) {
        case 'user': list = users; break;
        case 'box': list = boxes; break;
        case 'staff': list = staffs; break;
    }
    return list;
}

function getObjectsContainer(type) {
    let list = null;
    switch(type) {
        case 'user': list = usersContainer; break;
        case 'box': list = boxesContainer; break;
        case 'staff': list = staffsContainer; break;
    }
    return list;
}

function getObjectError(type) {
    let error = null;
    switch(type) {
        case 'user': error = userError; break;
        case 'box': error = boxError; break;
        case 'staff': error = staffError; break;
    }
    return error;
}

function getObjectRemoveFunction(type) {
    let func = () => {};
    switch(type) {
        case 'user': func = removeUserInheritance; break;
        case 'box': func = removeBoxInheritance; break;
        case 'staff': break;
    }
    return func;
}

function objectClickHandler() {
    const currentType = this.getAttribute('data-type');
    selectObjectContainer(currentType, this);
}   

function selectObjectContainer(type, object) {
    const prevSelected = document.querySelector(`.selected[data-type="${type}"]`);
    if (prevSelected !== object) {
        object.classList.add('selected');
        prevSelected?.classList.remove('selected');
    }
}

function removeObject() {
    const currentType = this.form.getAttribute('data-type');
    const selectedObjContainer = document.querySelector(`.selected[data-type="${currentType}"]`);
    const objects = getObjectList(currentType);
    const objectError =  getObjectError(currentType);
    
    if (objects.length > 1) {
        hideError(objectError);
        const objectsContainer = getObjectsContainer(currentType);
        const selectedObjName = selectedObjContainer.textContent;
        
        const removeFunction = getObjectRemoveFunction(currentType);
        removeFunction(selectedObjContainer);

        objects.splice(objects.findIndex(obj => obj.name === selectedObjName), 1);
        objectsContainer.removeChild(selectedObjContainer);

        objectsContainer.lastChild?.classList.add('selected');
    }
    else {
        generateError(objectError, error.REMOVE_LAST_ELEMENT)
    }
}

function removeUserInheritance(userContainer) {
    const userBoxes = boxes.filter(b => b.owner.name === userContainer.textContent);

    const userBoxContainers = [...getObjectsContainer('box').children]
            .filter(b => userBoxes.find(ub => ub.name === b.textContent));

    userBoxContainers.forEach(b => {
        removeBoxInheritance(b);
        b.parentNode.removeChild(b);
    });
    userBoxContainers.forEach(b => 
        boxes.splice(boxes.indexOf(box => box.name === b.textContent),1)
    );

    delete userBoxes;
}

function removeBoxInheritance(box) {
    const currentBox = boxes.find(b => b.name === box.textContent);
    const boxStaffContainers = [...getObjectsContainer('staff').children]
        .filter(s => currentBox.staff.find(bs => bs.name === s.textContent));
    
    boxStaffContainers.forEach(s => {
        s.parentNode.removeChild(s);
        staffs.splice(staffs.indexOf(st => st.name === s.textContent),1);
    });
    currentBox.staff = [];

}

function addUser() {
    const userName = userNameInput.value.trim();

    const isUserExist = users.some(u => u.name === userName);

    if (userName && isUserExist)
        generateError(userError, error.USER_ALREADY_EXIST);
    else {
        hideError(userError);

        const color = getRandomColor();
        const user = createObject(User, userName, color);

        users.push(user);

        const userContainer = createObjectContainer('user', user.name, user.color);
        userContainer.addEventListener('click', objectClickHandler);
        usersContainer.appendChild(userContainer);

        selectObjectContainer('user', userContainer);
        userNameInput.value = `User${users.length}`;
    }
}

function addBox() {
    const boxName = boxNameInput.value.trim();

    const isBoxExist = boxes.some(b => b.name === boxName);
    if (!boxName || isBoxExist)
        generateError(boxError, error.BOX_ALREADY_EXIST);
    else {
        hideError(boxError);

        const selectedUser = document.querySelector('.selected[data-type="user"]');
        const currentUser = users.find(u => u.name === selectedUser.textContent);
        const color = getRandomColor();
        const box = createObject(Box, boxName, currentUser, color);

        boxes.push(box);

        const boxContainer = createObjectContainer('box', box.name, box.owner.color, box.color);
        boxContainer.addEventListener('click', objectClickHandler);
        boxesContainer.appendChild(boxContainer);

        selectObjectContainer('box', boxContainer);
        boxNameInput.value = `Box${boxes.length}`;
    }
}

function addStaff() {
    const staffName = staffNameInput.value.trim();

    const isStaffExist = staffs.some(b => b.name === staffName);

    if (staffName && isStaffExist)
        generateError(staffError, error.STAFF_ALREADY_EXIST);
    else {
        hideError(staffError);

        const staff = createObject(Staff, staffName);

        staffs.push(staff);

        const selectedBox = document.querySelector('.selected[data-type="box"]');
        const currentBox = boxes.find(b => b.name === selectedBox.textContent);
        currentBox.staff.push(staff);
        const staffContainer = createObjectContainer('staff', staff.name, currentBox.owner.color, currentBox.color);
        staffsContainer.appendChild(staffContainer);
        staffContainer.addEventListener('click', objectClickHandler);

        selectObjectContainer('staff', staffContainer);
        staffNameInput.value = `Staff${staffs.length}`;
    }
}

function generateError(container, message) {
    container.innerHTML = message;
    container.classList.remove('hidden');
}

function hideError(container) {
    container.classList.add('hidden');
}

init();

