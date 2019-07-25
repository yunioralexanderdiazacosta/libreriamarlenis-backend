import { TestBed } from '@angular/core/testing';

import { TranscripcionesService } from './transcripciones.service';

describe('TranscripcionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TranscripcionesService = TestBed.get(TranscripcionesService);
    expect(service).toBeTruthy();
  });
});
