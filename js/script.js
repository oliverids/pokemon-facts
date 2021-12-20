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

const footer = document.querySelector('footer'),
    backtop = document.getElementById('backtop');

window.addEventListener('scroll', () => {
    let topo = document.getElementById('info').getBoundingClientRect().top;
    topo < -100 ? footer.classList.add('show') : footer.classList.remove('show');
})

backtop.addEventListener('click', () => {
    let topo = document.getElementById('info').getBoundingClientRect().top - 100;
    window.scrollTo({top: topo, behavior: "smooth"});
})

const random = document.getElementById('random');
random.addEventListener('click', Randomize);

const input = document.getElementById('input'),
    search = document.getElementById('search');
search.addEventListener('click', () => {
    let keyword = input.value;
    if (keyword) App(keyword.toLowerCase());

    setTimeout(() => {
        input.value = '';
        input.blur();
    }, 1200);
});

window.addEventListener('keyup', e => {
    if (e.keyCode == 13) search.click();
});

