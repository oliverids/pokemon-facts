export default function App() {
    // let pokeapi;
    fetch('https://pokeapi.co/api/v2/pokemon/25').then(r => r.json())
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

        front.src = r.sprites.front_default;
        back.src = r.sprites.back_default;

        name.innerText = r.name;

        let tipos = document.createElement('li');
        tipos.innerText = r.types[0].type.name;
        types.appendChild(tipos);

        //vida
        healthNumber.innerText = r.stats[0].base_stat;
        healthBar.style.width = `${healthBar.parentElement.offsetWidth * (r.stats[0].base_stat / 100)}px`;
        console.log(healthBar.parentElement.offsetWidth * (r.stats[0].base_stat / 100))
        //ataque
        attackNumber.innerText = r.stats[1].base_stat;
        attackBar.style.width = `${attackBar.parentElement.offsetWidth * (r.stats[0].base_stat / 100)}px`;
        //sp ataque
        spattackNumber.innerText = r.stats[3].base_stat;
        spattackBar.style.width = `${spattackBar.parentElement.offsetWidth * (r.stats[0].base_stat / 100)}px`;
        //defesa
        defenseNumber.innerText = r.stats[2].base_stat;
        defenseBar.style.width = `${defenseBar.parentElement.offsetWidth * (r.stats[0].base_stat / 100)}px`;
        //sp defesa
        spdefenseNumber.innerText = r.stats[4].base_stat;
        spdefenseBar.style.width = `${spdefenseBar.parentElement.offsetWidth * (r.stats[0].base_stat / 100)}px`;
        //velocidade
        speedNumber.innerText = r.stats[5].base_stat;
        speedBar.style.width = `${speedBar.parentElement.offsetWidth * (r.stats[0].base_stat / 100)}px`;
    })
}