import { TestBed } from '@angular/core/testing';

import { RespaldosService } from './respaldos.service';

describe('RespaldosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RespaldosService = TestBed.get(RespaldosService);
    expect(service).toBeTruthy();
  });
});
