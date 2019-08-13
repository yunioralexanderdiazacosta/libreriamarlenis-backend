import { TestBed } from '@angular/core/testing';

import { IvaService } from './iva.service';

describe('IvaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IvaService = TestBed.get(IvaService);
    expect(service).toBeTruthy();
  });
});
