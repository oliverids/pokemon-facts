import App from './app.js';
import Randomize from './randomize.js';
Randomize();

const theme = document.getElementById('theme');
theme.addEventListener('click', () => {
    document.body.classList.toggle('escuro');
    theme.classList.toggle('ativo');
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