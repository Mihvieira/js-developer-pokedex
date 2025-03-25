import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { PokeapiService } from '../../service/pokeapi/pokeapi.service';

@Component({
  selector: 'app-pokemon',
  imports: [],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css',
  standalone: true,
})

export class PokemonComponent implements OnInit {

  pokemons: Pokemon[] = [];
  offset:number = 0;
  maxRecords:number = 151
  limit:number = 10

  constructor(private pokeApiService: PokeapiService) {}

  async ngOnInit(): Promise<void> {
    this.pokemons = await this.pokeApiService.getPokemons(this.offset, 5);
  }

  loadNewPage(pokemonNumber: number | undefined): void {
    if (pokemonNumber !== undefined) {
      window.location.href = `/details/${pokemonNumber}`;
    }
  }

  async loadMoreButton() {
    const qtdRecordsWithNexPage = this.offset + this.limit

    if (qtdRecordsWithNexPage >= this.maxRecords) {
        const newLimit = this.maxRecords - this.offset
        let more = await this.pokeApiService.getPokemons(this.offset, newLimit);
        this.pokemons.push(...more);
    } else {
        let more = await this.pokeApiService.getPokemons(this.offset, this.limit);
        this.pokemons.push(...more);
        this.offset += this.limit;
    }
  }

}
