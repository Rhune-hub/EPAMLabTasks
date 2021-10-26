function userHandler() {
    const user = localStorage.getItem('user');
    
    if (user)
        addWelcomeBox(user);
    else
        addLoginBox();
}

function addWelcomeBox(user) {
    const welcomeBox = document.createElement('div');
    welcomeBox.classList.add('user-box','welcome-box');

    const welcomeText = document.createElement('span');
    welcomeText.classList.add('welcome-box__text');
    welcomeText.textContent = 'Welcome, ';

    const welcomeUser = document.createElement('span');
    welcomeUser.classList.add('welcome-box__user');
    welcomeUser.textContent = user;
    
    welcomeText.appendChild(welcomeUser);

    const logoutButton = document.createElement('input');
    logoutButton.type = 'button';
    logoutButton.classList.add('user-button','welcome-box__button');
    logoutButton.value = 'Logout';
    logoutButton.addEventListener('click',() => {
        const welcomeBox = document.querySelector('.welcome-box');
        welcomeBox.parentNode.removeChild(welcomeBox);
        localStorage.removeItem('user');
        addLoginBox();
    });

    welcomeBox.appendChild(welcomeText);
    welcomeBox.appendChild(logoutButton);

    const header = document.body.querySelector('.header');
    header.appendChild(welcomeBox);

}

function addLoginBox() {
    const loginBox = document.createElement('div');
    loginBox.classList.add('user-box','login-box');

    const loginForm = document.createElement('form');
    loginForm.classList.add('login-box__form');

    const loginInput = document.createElement('input');
    loginInput.type = 'text';
    loginInput.classList.add('login-box__input');
    loginInput.placeholder = 'Enter username';

    const loginButton = document.createElement('input');
    loginButton.type = 'button';
    loginButton.classList.add('user-button','login-box__button');
    loginButton.value = 'Login';
    loginButton.addEventListener('click',() => {
        const userName = document.querySelector('.login-box__input').value;
        if (userName) {
            const loginBox = document.querySelector('.login-box');
            loginBox.parentNode.removeChild(loginBox);

            addWelcomeBox(userName);

            localStorage.setItem('user',userName);
        }
    });
    
    loginForm.appendChild(loginInput);
    loginForm.appendChild(loginButton);

    loginBox.appendChild(loginForm);
    
    const header = document.querySelector('.header');
    header.appendChild(loginBox);
}

module.exports = userHandler;