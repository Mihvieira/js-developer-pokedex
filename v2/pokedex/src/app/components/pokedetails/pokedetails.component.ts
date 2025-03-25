import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { PokedetailsService } from '../../service/pokedetails/pokedetails.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokedetails',
  imports: [],
  templateUrl: './pokedetails.component.html',
  styleUrl: './pokedetails.component.css',
})
export class PokedetailsComponent implements OnInit{
  pokemon: Pokemon | undefined;
  id: number | null = null;

  constructor(private detailService: PokedetailsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params) => {
      this.id = Number(params.get('id'));
      this.pokemon = await this.detailService.getPokeData(this.id);
    })
  }

}
