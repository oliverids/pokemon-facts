import App from "./app.js";

export default function Randomize() {
    const randomlist = document.getElementById('randomlist');
    randomlist.innerHTML = '';

    function getRandomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

        fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`).then(r => r.json())
            .then(r => {
                let pokeItem = document.createElement('li');
                pokeItem.innerHTML = `<button><img src="${r.sprites.front_default}" alt="${r.name}"></button>`;
                randomlist.appendChild(pokeItem);
            })
    }

    for (let i = 1; i < 5; i++) {
        getRandomNumber(1, 900);
    }

    setTimeout(() => {
        if (randomlist.childElementCount !== 4) {
            randomlist.innerHTML = '';
            getRandomNumber(1, 900);
        } else {
            let randomPokemons = randomlist.querySelectorAll('li');

            randomPokemons.forEach(each => {
                each.addEventListener('click', e => {
                    App(each.querySelector('img').alt);
                })
            });
        }
    }, 1800);
}