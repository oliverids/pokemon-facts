import App from './app.js';
import Randomize from './randomize.js';
Randomize();
App('bulbasaur');

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

random.addEventListener('click', Randomize)
