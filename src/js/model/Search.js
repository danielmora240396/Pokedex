import axios from 'axios';

export default class Search {
    constructor() {
        this.pokemonList = [],
        this.pokemonListDetails = [],
        this.pokemonEvolutionChainList = [],
        this.pokemonEvolutionChainListDetails = []
    }

    async initialData(offset, limit){
        try {
            const data = await axios(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);
            this.pokemonList = (data.data.results);
            this.getPokemon();
            console.log(data);
        } catch (error) {
            return error;
        }
    }
    async getPokemon() {
        for (const iterator of this.pokemonList) {
            try {
                const data = await axios(iterator.url);
                this.pokemonListDetails.push(data.data);
            } catch (error) {
                return error;
            }
        }
        
    }

    async getEvolutionChain() {
        try {
            const data = await axios('https://pokeapi.co/api/v2/evolution-chain?offset=0&limit=10');
            this.pokemonEvolutionChainList = data.data.results;
            this.getEachPokemonEvolutionChain();
        } catch (error) {
            
        }
    }

    async getEachPokemonEvolutionChain() {
        for (const iterator of this.pokemonEvolutionChainList) {
            try {
                const data = await axios(iterator.url)
                this.pokemonEvolutionChainListDetails.push(data.data);
            } catch (error) {
                
            }
            
        }
    }

}