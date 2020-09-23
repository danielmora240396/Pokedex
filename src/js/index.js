import Search from './model/Search';
import * as SearchView from './view/searchView.js';

const state = {};

const getPokemonList = async() => {
    try {
        state.pokemon = new Search();
        await state.pokemon.initialData();
        SearchView.renderLoader();
        setTimeout(() => {
            SearchView.clearLoader();
            renderPokemonList();
        }, 3000);
    } catch (error) {
        
    }
    
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
        if (iterator.name.startsWith(string)) {
            data.push(iterator);
        }
    }
    setTimeout(() => {
        SearchView.clearLoader();
        renderPokemonList(data);
    }, 500);
}

const renderPokemonProfile = (id) => {
    for (const iterator of state.pokemon.pokemonListDetails) {
        if (iterator.id == id) {
            SearchView.renderSearch(iterator)
            break;
        }
    }
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
        }
    })
});

    



