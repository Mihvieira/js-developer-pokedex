import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { PokeapiService } from '../../service/pokeapi/pokeapi.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pokemon',
  imports: [RouterModule],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css',
  standalone: true,
})
export class PokemonComponent implements OnInit {
  pokemons: Pokemon[] = [];
  offset: number = 0;
  maxRecords: number = 151;
  limit: number = 10;
  qtdRecordsWithNexPage: number = this.offset + this.limit;

  constructor(private pokeApiService: PokeapiService) {}

  async ngOnInit(): Promise<void> {
    this.pokemons = await this.pokeApiService.getPokemons(this.offset, this.limit);
  }

  async loadMoreButton(): Promise<void> {
    this.offset += this.limit;
    console.log(this.offset);

    if (this.qtdRecordsWithNexPage >= this.maxRecords) {
      const newLimit = this.maxRecords - this.qtdRecordsWithNexPage;
      console.log(newLimit);
      let more = await this.pokeApiService.getPokemons(this.offset, newLimit);
      console.log(more)
      this.pokemons.push(...more);

      console.log(this.pokemons);
    } else {
      let more = await this.pokeApiService.getPokemons(this.offset, this.limit);
      console.log(more);
      this.pokemons.push(...more);
    }
  }
}
