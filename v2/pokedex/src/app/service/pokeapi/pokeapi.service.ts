import { Injectable } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, map, mergeMap, Observable } from 'rxjs';

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
  private baseUrl: string = '';

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  getPokemons(offset: number, limit: number): any {
    const url = this.baseUrl + '?offset=' + offset + '&limit=' + limit;
    return this.http.get<any>(url).pipe(
      mergeMap((response) => {
        const detailRequests = response.results.map((pokemon: any) =>
          this.getPokemonDetail(pokemon.url)
        );
        return forkJoin(detailRequests);
      }),
      catchError((error) => {
        console.error('Failed to fetch pokemons: ', error);
        throw error;
      })
    );
  }

  getPokemonDetail(url: string): Observable<Pokemon> {
    return this.http.get<any>(url).pipe(
      map((pokeDetail) => convertPokeApiDetailToPokemon(pokeDetail)),
      catchError((error) => {
        console.error('Failed to fetch pokemon detail:', error);
        throw error;
      })
    );
  }
}
