import Search from './model/Search';
import * as SearchView from './view/searchView.js';

const state = {};

const controlSearch = async () => {
    if (document.querySelector('#searchBox').value.trim() !== "") {
        state.search = new Search(document.querySelector('#searchBox').value.trim());
        try {
            const data = await state.search.getData();
            const evolutionChain = await state.search.getEvolutions();
            SearchView.renderSearch(data);
        } catch (error) {
            console.log(error);
        }
    } else {
        initialSearch();
    }
}


const initialSearch = async () => {
    state.search = new Search(document.querySelector('#searchBox').value.trim().toLowerCase());
    document.querySelector(".result").innerHTML = "";
    try {
        await state.search.initalData();
        getPokemon();
    } catch (error) {
        console.log(error);
    }   
    console.log(state.search.pokemonList);
}
const getPokemon = async () => {
    for await (const iterator of state.search.pokemonList) {
        const pokemonDetails = await state.search.getPokemon(iterator.url)
        state.search.pokemonListDetails.push(pokemonDetails);
        SearchView.renderTiles(pokemonDetails);
    }
}

const filterPokemon = (string) => {
    document.querySelector(".result").innerHTML = "";
    for (const iterator of state.search.pokemonListDetails) {
        if (iterator.name.startsWith(string)) {
            SearchView.renderTiles(iterator);
        } else {
            continue;
        }
    }

}

const showPokemon = (id) =>{
    let element;
    for (const e of state.search.pokemonListDetails) {
        if (e.id == id) {
            element = e;
            break;
        }
    }
    console.log(element);
    SearchView.renderSearch(element);

}

window.addEventListener('load', e => {
    //controlSearch();
    initialSearch();
    document.querySelector('.formSearch').addEventListener('submit', e => {
        e.preventDefault();
        if (document.querySelector('.formSearch input').value !== "") {
            filterPokemon(document.querySelector('.formSearch input').value.toLowerCase().trim());
        } else {
            initialSearch();
        }
    })

    document.querySelector('.formSearch input').addEventListener('keyup', e => {
        /*if (document.querySelector('.formSearch input').value === "" && e.which === 8) {
            initialSearch();
        } */
    })

    document.querySelector('.result').addEventListener('click', e => {
        if (e.target.matches('.pokemon-card, .pokemon-card div, .pokemon-card img')) {
            const id = e.target.closest('.pokemon-card');
            showPokemon(id.id);
        }
    })
    
})


