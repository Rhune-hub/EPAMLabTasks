function themeHandler() {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.add(theme);
    document.forms[0].elements.theme.value = theme;
    
    document.querySelector('.themes').addEventListener('change', (event) => {
        if (event.target.nodeName === 'INPUT') {
            document.documentElement.classList.remove('dark','light');
            document.documentElement.classList.add(event.target.value);
            
            localStorage.setItem('theme',event.target.value);
        }
    })
}

module.exports = themeHandler;