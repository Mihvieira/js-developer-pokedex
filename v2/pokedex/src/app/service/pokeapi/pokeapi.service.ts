import { Injectable } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { environment } from '../../../environments/environment';

function convertPokeApiDetailToPokemon(pokeDetail: any): Pokemon {
  const pokemon: Pokemon = new Pokemon();

  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  let types = pokeDetail.types.map(
    (typeSlot: { type: { name: any } }) => typeSlot.type.name
  );
  let [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;
}

@Injectable({
  providedIn: 'root',
})
export class PokeapiService {

  constructor() {}

  getPokemons = async (offset: number, limit: number): Promise<Pokemon[]> => {
    console.log(offset, limit)
    try {
      const url = `${environment.apiUrl}?offset=${offset}&limit=${limit}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jsonBody = await response.json();
      const pokemons = jsonBody.results;
      const detailRequests = pokemons.map(this.getPokemonDetail);
      const pokemonsDetails = await Promise.all(detailRequests);
      return pokemonsDetails;
    } catch (error) {
      console.error('Failed to fetch pokemons:', error);
      throw error;
    }
  };

  getPokemonDetail = (pokemon: any) => {
    return fetch(pokemon.url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(convertPokeApiDetailToPokemon)
      .catch((error) => {
        console.error('Failed to fetch pokemon detail:', error);
        throw error;
      });
  };
}
