import { TestBed } from '@angular/core/testing';

import { TipoTranscripcionesService } from './tipo-transcripciones.service';

describe('TipoTranscripcionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoTranscripcionesService = TestBed.get(TipoTranscripcionesService);
    expect(service).toBeTruthy();
  });
});
