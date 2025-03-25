import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PokedetailsComponent } from './components/pokedetails/pokedetails.component';

export const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'details/:id', component: PokedetailsComponent}
];
