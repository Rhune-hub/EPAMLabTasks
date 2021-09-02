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
        this.staff = [];
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

function addUser() {
    const userName = userNameInput.value.trim();

    const isUserExist = users.includes(u => u.name === userName);

    if (userName && isUserExist)
        generateError(userError, error.USER_ALREADY_EXIST);
    else {
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

function getObjectContainerList(type) {
    let list = [];
    switch(type) {
        case 'user': list = usersContainer; break;
        case 'box': list = boxesContainer; break;
        case 'staff': list = staffsContainer; break;
    }
    return list;
}

function removeUser() {
    const selectedUserName = userForm.users.value;
    users = users.filter(u => u.name !== selectedUserName);

    const selectedUserContainer = [...userForm.users].filter(u => u.vlaue == selectedUserName);
    console.log(selectedUserContainer)
    usersContainer.removeChild(selectedUserContainer.parentNode);
}

function addBox() {
    const boxName = boxNameInput.value.trim();

    const isBoxExist = boxes.includes(b => b.name === boxName);
    if (!boxName || isBoxExist)
        generateError(boxError, error.BOX_ALREADY_EXIST);
    else {
        const selectedUser = document.querySelector('.selected[data-type="user"]');
        const currentUser = users.filter(u => u.name === selectedUser.textContent)[0];
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
    let objects = getObjectList(currentType);
    if (objects.length > 1) {
        const objectsContainer = getObjectContainerList(currentType);
        const selectedObjName = selectedObjContainer.textContent;
            
        objects.splice(objects.findIndex(b => b.name !== selectedObjName), 1);
        
        objectsContainer.removeChild(selectedObjContainer);
    }
}

function addStaff() {
    const staffName = staffNameInput.value.trim();

    const isStaffExist = staffs.includes(b => b.name === staffName);

    if (staffName && isStaffExist)
        generateError(staffError, error.STAFF_ALREADY_EXIST);
    else {
        const staff = createObject(Staff, staffName);

        staffs.push(staff);

        const selectedBox = document.querySelector('.selected[data-type="box"]');
        const currentBox = boxes.filter(b => b.name === selectedBox.textContent)[0];
        const staffContainer = createObjectContainer('staff', staff.name, currentBox.owner.color, currentBox.color);
        staffsContainer.appendChild(staffContainer);
        staffContainer.addEventListener('click', objectClickHandler);

        selectObjectContainer('staff', staffContainer);
        staffNameInput.value = `Staff${staffs.length}`;
    }
}

function removeStaff() {
    const selectedStaffName = staffForm.staff.value;
    staff = staff.filter(b => b.name !== selectedStaffName);

    const selectedStaffContainer = staffContainers.filter(b => b.vlaue === selectedStaffName);
    staffContainer.removeChild(selectedStaffContainer);
}


init();