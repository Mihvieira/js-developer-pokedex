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

  ngOnInit(): void {
    this.pokeApiService.getPokemons(0, 20).subscribe(
      (pokemons: Pokemon[]) => {
        this.pokemons = pokemons; // Atribui os dados ao array
      },
      (error: any) => {
        console.error('Erro ao buscar pokémons:', error);
      }
    );
  }

  async loadMoreButton(): Promise<void> {
    this.offset += this.limit;

    if (this.qtdRecordsWithNexPage >= this.maxRecords) {
      const newLimit = this.maxRecords - this.qtdRecordsWithNexPage;
      this.pokeApiService.getPokemons(this.offset, newLimit).subscribe(
        (pokemons: Pokemon[]) => {
          this.pokemons.push(...pokemons);
        },
        (error: any) => {
          console.error('Erro ao buscar pokémons:', error);
        }
      );
    } else {
      this.pokeApiService.getPokemons(this.offset, this.limit).subscribe(
        (pokemons: Pokemon[]) => {
          this.pokemons.push(...pokemons);
        },
        (error: any) => {
          console.error('Erro ao buscar pokémons:', error);
        }
      );
    }
  }
}
