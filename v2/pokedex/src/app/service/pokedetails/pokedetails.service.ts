import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Pokemon } from '../../models/pokemon.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs';

function transformData(pokeDetail: any): Pokemon {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.height = pokeDetail.height;
  pokemon.weight = pokeDetail.weight;
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  let types = pokeDetail.types.map(
    (typeSlot: { type: { name: any } }) => typeSlot.type.name
  );
  let [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  const abilities = pokeDetail.abilities.map(
    (abltSlot: { ability: { name: any } }) => abltSlot.ability.name
  );
  const [ability] = abilities;
  pokemon.abilities = abilities;
  pokemon.ability = ability;

  const stats = pokeDetail.stats.map(
    (statsSlot: { stat: { name: any } }) => statsSlot.stat.name
  );
  let [stat] = stats;
  const statsNumber = pokeDetail.stats.map(
    (baseSlot: { base_stat: any }) => baseSlot.base_stat
  );
  let [statNumber] = statsNumber;
  pokemon.stats = stats;
  pokemon.stat = stat;

  pokemon.statsNumber = statsNumber;
  pokemon.statNumber = statNumber;
  pokemon.types = types;
  pokemon.type = type;
  const moves = pokeDetail.moves.map(
    (moveSlot: { move: { name: any } }) => moveSlot.move.name
  );
  const [move] = moves;

  pokemon.moves = moves;
  pokemon.move = move;

  pokemon.name = pokeDetail.species.name;

  return pokemon;
}

@Injectable({
  providedIn: 'root',
})
export class PokedetailsService {
  constructor(private http: HttpClient) {}

  getPokeData(number: number) {
    const url = `${environment.apiUrl}/${number}`;
    return this.http.get<any>(url).pipe(
      map((pokeDetail) => transformData(pokeDetail)),
      catchError((error) => {
        console.error('Failed to fetch pokemon detail:', error);
        throw error;
      })
    );
  }
}
