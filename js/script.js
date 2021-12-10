import App from './app.js';
App();

const theme = document.getElementById('theme');
theme.addEventListener('click', () => {
    document.body.classList.toggle('escuro');
    theme.classList.toggle('ativo');
})

const menu = document.getElementById('menu');
menu.addEventListener('click', () => {
    menu.classList.toggle('ativo')
})