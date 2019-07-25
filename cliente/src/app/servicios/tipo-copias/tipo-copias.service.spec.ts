import { TestBed } from '@angular/core/testing';

import { TipoCopiasService } from './tipo-copias.service';

describe('TipoCopiasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoCopiasService = TestBed.get(TipoCopiasService);
    expect(service).toBeTruthy();
  });
});
