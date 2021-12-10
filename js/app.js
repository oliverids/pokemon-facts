export default function App() {
    // let pokeapi;
    fetch('https://pokeapi.co/api/v2/pokemon/1').then(r => r.json())
        .then(r => {
            //images
            const front = document.getElementById('front'),
                back = document.getElementById('back'),
                //nome e tipo
                name = document.getElementById('name'),
                types = document.getElementById('types'),
                //stats
                healthNumber = document.getElementById('health-number'),
                healthBar = document.getElementById('health'),
                attackNumber = document.getElementById('attack-number'),
                attackBar = document.getElementById('attack'),
                spattackNumber = document.getElementById('spattack-number'),
                spattackBar = document.getElementById('spattack'),
                defenseNumber = document.getElementById('defense-number'),
                defenseBar = document.getElementById('defense'),
                spdefenseNumber = document.getElementById('spdefense-number'),
                spdefenseBar = document.getElementById('spdefense'),
                speedNumber = document.getElementById('speed-number'),
                speedBar = document.getElementById('speed');

            function capitalize(str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            }

            front.src = r.sprites.front_default;
            back.src = r.sprites.back_default;

            name.innerText = capitalize(r.name);

            for (let i = 0; i < r.types.length; i++) {
                let tipos = document.createElement('li');
                tipos.innerText = capitalize(r.types[i].type.name);
                types.appendChild(tipos);
            }

            function progressBar(valor, number, total) {
                number.innerText = valor;
                total.style.width = `${total.parentElement.offsetWidth * (valor / 100)}px`;
            }

            progressBar(r.stats[0].base_stat, healthNumber, healthBar);
            progressBar(r.stats[1].base_stat, attackNumber, attackBar);
            progressBar(r.stats[3].base_stat, spattackNumber, spattackBar);
            progressBar(r.stats[2].base_stat, defenseNumber, defenseBar);
            progressBar(r.stats[4].base_stat, spdefenseNumber, spdefenseBar);
            progressBar(r.stats[5].base_stat, speedNumber, speedBar);
        })
}