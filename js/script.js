import App from './app.js';
import Randomize from './randomize.js';
Randomize();

const theme = document.getElementById('theme');
theme.addEventListener('click', () => {
    document.body.classList.toggle('escuro');
    theme.classList.toggle('ativo');

    document.body.classList.contains('escuro') ? localStorage.setItem('tema', 'escuro') : localStorage.setItem('tema', 'claro');
});

window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('tema') == 'claro') {
        document.body.classList.remove('escuro');
        theme.classList.remove('ativo');
    } else {
        document.body.classList.add('escuro');
        theme.classList.add('ativo');
    }
})

const menu = document.getElementById('menu'),
    aside = document.getElementById('aside'),
    random = document.getElementById('random');

menu.addEventListener('click', () => {
    [menu, aside].forEach(e => e.classList.toggle('ativo'));
});

random.addEventListener('click', Randomize);

const input = document.getElementById('input'),
    search = document.getElementById('search');
search.addEventListener('click', () => {
    let keyword = input.value;
    if (keyword) App(keyword.toLowerCase());
});

window.addEventListener('keyup', e => {
    if (e.keyCode == 13) search.click();
});