import { Routes } from '@angular/router';
import { PokedetailsComponent } from './components/pokedetails/pokedetails.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';

export const routes: Routes = [
  {path: '', component: PokemonComponent, pathMatch: 'full'},
  {path: 'details/:id', component: PokedetailsComponent}
];
