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
    constructor(name, owner) {
        super(name);
        this.owner = owner;
        this.staff = [];
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

    removeUserButton.addEventListener('click', removeUser);
    removeBoxButton.addEventListener('click', removeBox);
    removeStaffButton.addEventListener('click', removeStaff);
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

        const userContainer = createObjectContainer('users', user, user);
        userContainer.addEventListener('change', function () { selectedUser.value = this.value; });
        usersContainer.appendChild(userContainer);

        userForm.users.value = userName;
        userNameInput.value = `User${users.length}`;
    }
}
    
function createObject(classObject, ...params) {
    const newObject = new classObject(...params);

    return newObject;
}

function createObjectContainer(name, object, user) {
    const container = document.createElement('input');
    container.type = 'radio';
    container.classList.add('object-list-element');
    container.name = name;
    container.id =  name + '-' + object.name.toLowerCase();

    const label = document.createElement('label');
    label.htmlFor = name + '-' + object.name.toLowerCase()
    label.textContent = object.name;
    label.classList.add('element-list-label');
    label.style.backgroundColor = user.color;

    container.value = object.name;

    label.appendChild(container);
    return label;
}

function removeUser() {
    const selectedUserName = userForm.users.value;
    users = users.filter(u => u.name !== selectedUserName);

    const selectedUserContainer = [...userForm.users].filter(u => u.vlaue === selectedUserName);
    console.log(selectedUserContainer)
    usersContainer.removeChild(selectedUserContainer.parentNode);
}

function addBox() {
    const boxName = boxNameInput.value.trim();

    const isBoxExist = boxes.includes(b => b.name === boxName);

    if (boxName && isBoxExist)
        generateError(boxError, error.BOX_ALREADY_EXIST);
    else {
        const currentUser = users.filter(u => u.name === userForm.users.value);
        const box = createObject(Box, boxName, currentUser);

        boxes.push(box);

        const boxContainer = createObjectContainer('boxes', box, box.owner);
        boxContainer.addEventListener('change', function() { selectedBox.value = this.value; });
        boxesContainer.appendChild(boxContainer);

        boxForm.boxes.value = boxName;
        boxNameInput.value = `Box${boxes.length}`;
    }
}

function removeBox() {
    const selectedBoxName = boxForm.boxes.value;
    boxes = boxes.filter(b => b.name !== selectedBoxName);

    const selectedBoxContainer = [...(boxForm.boxes)].filter(b => b.vlaue === selectedBoxName);
    boxesContainer.removeChild(selectedBoxContainer);
}

function addStaff() {
    const staffName = staffNameInput.value.trim();

    const isStaffExist = staffs.includes(b => b.name === staffName);

    if (staffName && isStaffExist)
        generateError(staffError, error.STAFF_ALREADY_EXIST);
    else {
        const staff = createObject(Staff, staffName);

        staffs.push(staff);

        const currentBox = boxes.filter(b => b.name === boxForm.boxes.value)[0];
        const staffContainer = createObjectContainer('staff', staff, currentBox.owner);
        staffsContainer.appendChild(staffContainer);

        staffForm.staff.value = staffName;
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