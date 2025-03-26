import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { PokedetailsService } from '../../service/pokedetails/pokedetails.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokedetails',
  templateUrl: './pokedetails.component.html',
  styleUrl: './pokedetails.component.css',
})
export class PokedetailsComponent implements OnInit {
  pokemon: Pokemon | undefined;
  id: number | null = null;
  selectedTab: string = 'about';
  @ViewChildren('statNumber') statNumbers!: QueryList<ElementRef>;
  @ViewChild('poke') pokemonElement!: ElementRef;
  @ViewChildren('type') typeElements!: QueryList<ElementRef>;

  constructor(
    private detailService: PokedetailsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params) => {
      this.id = Number(params.get('id'));
      this.detailService.getPokeData(this.id).subscribe(
        (pokemon: Pokemon) => {
          this.pokemon = pokemon; // Atribui os dados ao array
        },
        (error: any) => {
          console.error('Erro ao buscar pokémons:', error);
        }
      );
    });
    this.barsNumber();
    this.colorType();
  }

  tabClicked(tabName: string) {
    this.selectedTab = tabName;
    return this.selectedTab;
  }

  updateBars(value: string) {
    const progressBar = document.createElement('div');
    progressBar.className = `progress-bar-${value}`;
    progressBar.style.width = `${value}%`;
    progressBar.style.height = '100%';
    progressBar.style.backgroundColor = '#007bff';
    progressBar.style.transition = 'width 0.5s ease';

    const parentElement = document.querySelector('.progress-container');
    if (parentElement) {
      parentElement.appendChild(progressBar);
    }
  }

  barsNumber() {
    this.statNumbers.forEach((num) => {
      const text = num.nativeElement.textContent.trim();
      this.updateBars(text);
    });
  }

  updateColors(type: string) {
    if (this.pokemonElement) {
      this.pokemonElement.nativeElement.classList.add(type);
    }
  }

  colorType() {
    this.typeElements.forEach((typeElement) => {
      const type = typeElement.nativeElement.textContent.trim();
      this.updateColors(type);
    });
  }
}
