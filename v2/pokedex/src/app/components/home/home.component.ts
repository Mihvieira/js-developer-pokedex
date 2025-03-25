import { Component } from '@angular/core';
import { PokemonComponent } from "../pokemon/pokemon.component";

@Component({
  selector: 'app-home',
  imports: [PokemonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
