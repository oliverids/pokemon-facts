export default function App(pokemon) {
    const loader = document.getElementById('loader');
    loader.classList.add('show');

    const erro = document.getElementById('erro'),
        info = document.getElementById('info'),
        emptyspace = document.getElementById('emptyspace');

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(r => {
            if (!r.ok) {
                erro.classList.add('ativo');
                loader.classList.remove('show');
                info.classList.remove('show');
                emptyspace.classList.add('hide');
            } else {
                erro.classList.remove('ativo');
                return r;
            }
        })
        .then(r => r.json())
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
                speedBar = document.getElementById('speed'),
                //skills and moves
                skillList = document.getElementById('skill-list'),
                movesList = document.getElementById('moves-list');

            //reset
            function resetChildren(e) { e.innerHTML = '' };
            [types, skillList, movesList].forEach(resetChildren);

            function capitalize(str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            }

            //fotos, tipos e nome
            front.src = r.sprites.front_default;
            if (r.sprites.back_default) {
                back.src = r.sprites.back_default;
            } else {
                back.style.display = 'none';
                front.parentElement.style.justifyContent = 'center';
            }

            name.innerText = capitalize(r.name);

            for (let i = 0; i < r.types.length; i++) {
                let tipos = document.createElement('li');
                tipos.innerText = capitalize(r.types[i].type.name);
                types.appendChild(tipos);
            }

            //base stats
            function progressBar(valor, number, total) {
                number.innerText = valor;
                total.style.width = `${(100 * valor) / total.parentElement.offsetWidth}%`;
            }

            progressBar(r.stats[0].base_stat, healthNumber, healthBar);
            progressBar(r.stats[1].base_stat, attackNumber, attackBar);
            progressBar(r.stats[3].base_stat, spattackNumber, spattackBar);
            progressBar(r.stats[2].base_stat, defenseNumber, defenseBar);
            progressBar(r.stats[4].base_stat, spdefenseNumber, spdefenseBar);
            progressBar(r.stats[5].base_stat, speedNumber, speedBar);

            //skills list
            for (let i = 0; i < 2; i++) {
                if (i !== r.abilities.length) {
                    let item = document.createElement('li'),
                        titulo = document.createElement('h2'),
                        efeito = document.createElement('p'),
                        shortEfeito = document.createElement('p');

                    titulo.innerText = r.abilities[i].ability.name.replace('-', ' ').split(' ').map(capitalize).join(' ');

                    fetch(r.abilities[i].ability.url).then(r => r.json())
                        .then(r => {
                            efeito.innerText = r.effect_entries[1].effect.replace(/(?:\r\n|\r|\n)/g, ' ');
                            shortEfeito.innerText = capitalize(r.effect_entries[1].short_effect)
                        });

                    function append(e) {
                        item.append(e)
                    }

                    [titulo, efeito, shortEfeito].forEach(append);
                    skillList.appendChild(item);
                } else { break }
            }

            //moves list
            for (let i = 0; i < 4; i++) {
                if (i !== r.moves.length) {
                    let item = document.createElement('li'),
                        titulo = document.createElement('h2'),
                        move = document.createElement('p'),
                        shortmove = document.createElement('p'),
                        accuracy = document.createElement('h3'),
                        damage = document.createElement('h3');

                    titulo.innerText = r.moves[i].move.name.split(' ').map(capitalize).join(' ');

                    fetch(r.moves[i].move.url).then(r => r.json())
                        .then(r => {
                            move.innerText = r.effect_entries[0].effect.replace(/(?:\r\n|\r|\n)/g, ' ');
                            shortmove.innerText = capitalize(r.effect_entries[0].short_effect);

                            accuracy.innerText = `Accuracy: ${r.accuracy}`;
                            damage.innerText = `Damage Class: ${capitalize(r.damage_class.name)}`;
                        });

                    function append(e) {
                        item.append(e)
                    }

                    [titulo, move, shortmove, accuracy, damage].forEach(append)
                    movesList.appendChild(item)

                } else { break }
            }
        })
        .then(() => {
            setTimeout(() => loader.classList.remove('show'), 1800);
            setTimeout(() => {
                info.classList.add('show');
                emptyspace.classList.add('hide');
            }, 1200);
        })
}