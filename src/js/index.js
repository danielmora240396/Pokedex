import Search from './model/Search';
import * as SearchView from './view/searchView.js';

const state = {};

const getPokemonList = async(offset = 0, limit = 649) => {
    try {
        state.pokemon = new Search();
        await state.pokemon.initialData(offset, limit);
        SearchView.renderLoader();
        await state.pokemon.getEvolutionChain();
        setTimeout(() => {
            SearchView.clearLoader();
            renderPokemonList();
        }, 1100 * (limit/50));
    } catch (error) {
        alert(error);
    }

    console.log(state.pokemon.pokemonEvolutionChainListDetails);
    
}

const renderPokemonList = (array = state.pokemon.pokemonListDetails) =>{
    document.querySelector(".result").innerHTML= "";
    for (const iterator of array) {
        SearchView.renderTiles(iterator);
    }
}

const filterPokemon = (string) => {
    document.querySelector(".result").innerHTML= "";
    SearchView.renderLoader();
    const data = [];
    for (const iterator of state.pokemon.pokemonListDetails) {
        if (iterator.name.startsWith(string.toLowerCase()) || 
            iterator.id.toString() === (string.toLowerCase())) {
            data.push(iterator);
        }
    }
    setTimeout(() => {
        SearchView.clearLoader();
        renderPokemonList(data);
    }, 500);
}

const getPokemon = (id) => {
    for (const iterator of state.pokemon.pokemonListDetails) {
        if (iterator.id == id || iterator.name === id) {
            return iterator;
        }
    }
}

const renderPokemonProfile = (id) => {
    const pokemon = getPokemon(id);
    const pokemonEvolutions = getEvolutions(pokemon.name);
    SearchView.renderSearch(pokemon);
    pokemonEvolutions.forEach(e => {
        SearchView.renderEvolutions(12/pokemonEvolutions.length,getPokemon(e));
    });
}

const getEvolutions = (name) => {
    const pokemonList = [];
    for (const iterator of state.pokemon.pokemonEvolutionChainListDetails) {
        if (iterator.chain.species.name) {
            if (name === iterator.chain.species.name) {
                pokemonList.push(iterator.chain.species.name);
                if (iterator.chain.evolves_to) {
                    pokemonList.push(iterator.chain.evolves_to[0].species.name);
                }
                if(iterator.chain.evolves_to[0].evolves_to){
                    pokemonList.push(iterator.chain.evolves_to[0].evolves_to[0].species.name);
                }
            }
            if (iterator.chain.evolves_to) {
                if (name === iterator.chain.evolves_to[0].species.name) {
                    pokemonList.push(iterator.chain.species.name);
                    pokemonList.push(iterator.chain.evolves_to[0].species.name);

                    if(iterator.chain.evolves_to[0].evolves_to){
                        pokemonList.push(iterator.chain.evolves_to[0].evolves_to[0].species.name);
                    }
                }
            }
            if(iterator.chain.evolves_to[0].evolves_to[0] !== undefined){
                if (name === iterator.chain.evolves_to[0].evolves_to[0].species.name) {
                    pokemonList.push(iterator.chain.species.name);
                    pokemonList.push(iterator.chain.evolves_to[0].species.name);
                    pokemonList.push(iterator.chain.evolves_to[0].evolves_to[0].species.name);
                }
            }
        }
    }

    return pokemonList;
}


window.addEventListener('load', e => {
    document.querySelector('#searchBox').value = "";
    getPokemonList();

    document.querySelector('#searchBox').addEventListener('input', e=> {
        filterPokemon(document.querySelector('#searchBox').value.trim());
    });

    document.querySelector('.result').addEventListener('click', e => {
        if (e.target.matches('.pokemon-card, .pokemon-card .name, .pokemon-card .image img, .pokemon-card .image')) {
            const id = e.target.closest('.pokemon-card').id;
            renderPokemonProfile(id);
        } else if (e.target.matches('.close-profile')) {
            document.querySelector('#searchBox').value = "";
            renderPokemonList();
        } else if (e.target.matches('.pokemon-evolution, .pokemon-evolution div, .pokemon-evolution img')){
            const id = e.target.closest('.pokemon-evolution').id;
            renderPokemonProfile(id);
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    })
});

    



