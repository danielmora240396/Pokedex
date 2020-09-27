import Search from './model/Search';
import * as SearchView from './view/searchView.js';

const state = {};

const getPokemonList = async(offset = 0, limit = 493) => {
    try {
        state.pokemon = new Search();
        state.pokemon.quantity = limit;
        state.pokemon.currentPage = "#page1";
        document.querySelector('.footer').classList.add('fixedFooter');
        await state.pokemon.initialData(offset, limit);
        SearchView.renderLoader();
        await state.pokemon.getEvolutionChain();
        setTimeout(() => {
            SearchView.clearLoader();
            renderPokemonList();
            document.querySelector('.footer').classList.remove('fixedFooter');
        }, 1200 * (limit/50));
        
    } catch (error) {
        alert(error);
    }

    console.log(state.pokemon.pokemonEvolutionChainListDetails);
    
}

const renderPokemonList = (array = state.pokemon.pokemonListDetails, startPage = 0, endPage = 27) =>{
    document.querySelector(".result").innerHTML= "";
    for (let index = startPage; index < endPage; index++) {
        if (array[index] !== undefined) {
            SearchView.renderTiles(array[index]);
        }
        
    }
    SearchView.renderPagination(state.pokemon.quantity);
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
    if (pokemonEvolutions !== undefined) {
        if (pokemonEvolutions.length > 1) {
            pokemonEvolutions.forEach(e => {
                SearchView.renderEvolutions(12/pokemonEvolutions.length, getPokemon(e));
            });
        } else {
            const element = document.querySelector('.pokemon-evolution-headline');
            element.parentNode.removeChild(element);
        }
    } else {
        SearchView.renderEvolutions(12, pokemon);
    }
}

const getEvolutions = (name) => {
    const pokemonList = [];
    for (const iterator of state.pokemon.pokemonEvolutionChainListDetails) {
        if (iterator.chain.species.name && iterator.chain.evolves_to.length > 0) {
            if (name === iterator.chain.species.name) {
                pokemonList.push(iterator.chain.species.name);
                if (iterator.chain.evolves_to.length > 0) {
                    pokemonList.push(iterator.chain.evolves_to[0].species.name);
                }
                if(iterator.chain.evolves_to[0].evolves_to[0] !== undefined){
                    pokemonList.push(iterator.chain.evolves_to[0].evolves_to[0].species.name);
                }
                return pokemonList;
            }
            if (iterator.chain.evolves_to!== undefined && iterator.chain.evolves_to.length > 0) {
                if (name === iterator.chain.evolves_to[0].species.name) {
                    pokemonList.push(iterator.chain.species.name);
                    pokemonList.push(iterator.chain.evolves_to[0].species.name);

                    if(iterator.chain.evolves_to[0].evolves_to[0] !== undefined){
                        pokemonList.push(iterator.chain.evolves_to[0].evolves_to[0].species.name);
                    }

                    return pokemonList;
                }
                
            }
            if(iterator.chain.evolves_to[0].evolves_to !== undefined && iterator.chain.evolves_to[0].evolves_to.length > 0){
                if (name === iterator.chain.evolves_to[0].evolves_to[0].species.name) {
                    pokemonList.push(iterator.chain.species.name);
                    pokemonList.push(iterator.chain.evolves_to[0].species.name);
                    pokemonList.push(iterator.chain.evolves_to[0].evolves_to[0].species.name);

                    return pokemonList;
                }
                
            }
        }
    }
    
}


window.addEventListener('load', e => {
    document.querySelector('#searchBox').value = "";
    getPokemonList();
    window.location.hash = "";
    document.querySelector('#searchBox').addEventListener('input', e=> {
        filterPokemon(document.querySelector('#searchBox').value.trim());
    });

    document.querySelector('.result').addEventListener('click', e => {
        if (e.target.matches('.pokemon-card, .pokemon-card .name, .pokemon-card .image img, .pokemon-card .image, .pokemon-card .type, .pokemon-card span')) {
            const id = e.target.closest('.pokemon-card').id;
            renderPokemonProfile(id);
            state.pokemon.current = id;
            window.location.hash = "pokemon";
            document.querySelector('.footer').classList.add('fixedFooter');
        } else if (e.target.matches('.close-profile')) {
            document.querySelector('#searchBox').value = "";
            const page = parseInt((state.pokemon.currentPage).replace('#page', ""));
            renderPokemonList(undefined, (page*27)-27, page*27);
            window.location.hash = state.pokemon.current;
            document.querySelector('.footer').classList.remove('fixedFooter');
            
        } else if (e.target.matches('.pokemon-evolution, .pokemon-evolution div, .pokemon-evolution img, .pokemon-evolution span')){
            const id = e.target.closest('.pokemon-evolution').id;
            renderPokemonProfile(id);
            document.querySelector('.footer').classList.add('fixedFooter');
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            state.pokemon.current = id;
            window.location.hash = "pokemon";
            
        }
    });

    window.addEventListener('hashchange', e => {
        if (window.location.hash.includes("page")) {
            state.pokemon.currentPage = window.location.hash;
            const page = parseInt((window.location.hash).replace('#page', ""));
            renderPokemonList(undefined, (page*27)-27, page*27);
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    });
});

    



