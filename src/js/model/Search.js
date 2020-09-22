import axios from 'axios';
import * as SearchView from '../view/searchView';

export default class Search {
    constructor(query) {
        this.query = query;
        this.pokemonList = [],
        this.pokemonListDetails = []
    }

    async initalData(){
        try {
            const data = await axios(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=50`);
            this.pokemonList = (data.data.results);
        } catch (error) {
            return error;
        }
    }

    async getData(query) {
        try {
            const data = await axios(`https://pokeapi.co/api/v2/pokemon/${query}/`);
            return data.data;
        } catch (error) {
            return error;
        }
    }

    async getPokemon(url) {
        try {
            const data = await axios(url);
            return data.data;
        } catch (error) {
            return error;
        }
    }

    async getEvolutions() {
        try {
            const data = await axios(`https://pokeapi.co/api/v2/evolution-chain/?offset=0&limit=18`);
            return data.data;
        } catch (error) {
            return error;
        }
    }

    async getEvolutionChain(url) {
        try {
            const data = await axios(url);
            return data;
        } catch (error) {
            return error;
        }
    }
}