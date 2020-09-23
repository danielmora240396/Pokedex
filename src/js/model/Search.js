import axios from 'axios';

export default class Search {
    constructor() {
        this.pokemonList = [],
        this.pokemonListDetails = []
    }

    async initialData(offset = 0){
        try {
            const data = await axios(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100`);
            this.pokemonList = (data.data.results);
            this.getPokemon();
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

}