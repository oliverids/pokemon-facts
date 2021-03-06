export default function App(pokemon) {
    const loader = document.getElementById('loader');
    loader.classList.add('show');

    const erro = document.getElementById('erro'),
        info = document.getElementById('info'),
        emptyspace = document.getElementById('emptyspace');

    //skills and moves
    let skillList = document.getElementById('skill-list'),
        movesList = document.getElementById('moves-list'),
        //local list
        localList = document.getElementById('locallist');
        
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
                speedBar = document.getElementById('speed');

            //reset
            function resetChildren(e) { e.innerHTML = '' };
            [types, skillList, movesList, localList].forEach(resetChildren);

            function capitalize(str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            }

            //fotos, tipos e nome
            front.src = r.sprites.front_default;

            if (r.sprites.back_default) {
                back.style.display = 'flex';
                front.parentElement.style.justifyContent = 'space-around';
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
                //255 is the highest number points a pokemon can have as a stat (as far as i know)
                total.style.width = `${(100 * valor) / 255}%`;
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
                    let titulo = document.createElement('h2');
                    titulo.innerText = r.abilities[i].ability.name.replace('-', ' ').split(' ').map(capitalize).join(' ');

                    fetch(r.abilities[i].ability.url).then(r => r.json())
                        .then(r => {
                            let item = document.createElement('li'),
                                efeito = document.createElement('p'),
                                shortEfeito = document.createElement('p');

                            efeito.innerText = r.effect_entries[1].effect.replace(/(?:\r\n|\r|\n)/g, ' ').replace('$effect_chance%', 'effect chance');
                            shortEfeito.innerText = capitalize(r.effect_entries[1].short_effect)

                            function append(e) {
                                item.append(e)
                            }

                            [titulo, efeito, shortEfeito].forEach(append);
                            skillList.appendChild(item);
                        });
                } else { break }
            }

            //moves list
            for (let i = 0; i < 4; i++) {
                if (i !== r.moves.length) {
                    let titulo = document.createElement('h2');
                    titulo.innerText = r.moves[i].move.name.split(' ').map(capitalize).join(' ');

                    fetch(r.moves[i].move.url).then(r => r.json())
                        .then(r => {
                            let item = document.createElement('li'),
                                move = document.createElement('p'),
                                shortmove = document.createElement('p'),
                                accuracy = document.createElement('h3'),
                                damage = document.createElement('h3');

                            move.innerText = r.effect_entries[0].effect.replace(/(?:\r\n|\r|\n)/g, ' ').replace('$effect_chance%', 'effect chance');;
                            shortmove.innerText = capitalize(r.effect_entries[0].short_effect).replace('$effect_chance%', 'effect chance');;

                            accuracy.innerText = `Accuracy: ${r.accuracy}`;
                            damage.innerText = `Damage Class: ${capitalize(r.damage_class.name)}`;

                            function append(e) {
                                item.append(e)
                            }

                            [titulo, move, shortmove, accuracy, damage].forEach(append)
                            movesList.appendChild(item)
                        });
                } else { break }
            }

            fetch(`https://pokeapi.co/api/v2/pokemon/${r.id}/encounters`)
                .then(r => r.json())
                .then(r => {
                    for (let i = 0; i < r.length; i++) {
                        let item = document.createElement('li'),
                            local = r[i].location_area.name.replaceAll('-', ' ').split(' ').map(capitalize).join(' ');
                        item.innerHTML = `<h2>${local}</h2>`;

                        let list = document.createElement('ul'),
                            details = document.createElement('details');
                        details.innerHTML = `<summary><h3>Encounter Methods</h3></summary>`;

                        fetch(r[i].location_area.url).then(r => r.json())
                            .then(r => {
                                if (r.encounter_method_rates.length) {
                                    for (let i = 0; i < r.encounter_method_rates.length; i++) {
                                        let method = document.createElement('li');
                                        method.innerText = r.encounter_method_rates[i].encounter_method.name.replaceAll('-', ' ').split(' ').map(capitalize).join(' ');

                                        list.append(method);
                                        details.append(list)
                                        item.append(details)
                                    }
                                }
                            })
                        localList.appendChild(item)
                    }
                })

        })
        .then(() => {
            setTimeout(() => loader.classList.remove('show'), 1800);
            setTimeout(() => {
                info.classList.add('show');
                emptyspace.classList.add('hide');

                let topo = info.getBoundingClientRect().top - 100;
                if(topo > 500) window.scrollTo({top: topo, behavior: "smooth"});

                [movesList, skillList, localList].forEach(e => {
                    if (e.childElementCount == 0) e.parentElement.parentElement.style.display = 'none';
                })
            }, 1200);
        })
}