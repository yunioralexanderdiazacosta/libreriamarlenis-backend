import { TestBed } from '@angular/core/testing';

import { CopiasService } from './copias.service';

describe('CopiasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CopiasService = TestBed.get(CopiasService);
    expect(service).toBeTruthy();
  });
});
