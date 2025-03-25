import { TestBed } from '@angular/core/testing';

import { PokedetailsService } from './pokedetails.service';

describe('PokedetailsService', () => {
  let service: PokedetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokedetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
