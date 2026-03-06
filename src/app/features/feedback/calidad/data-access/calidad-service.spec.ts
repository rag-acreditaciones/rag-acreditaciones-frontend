import { TestBed } from '@angular/core/testing';

import { CalidadService } from './calidad-service';

describe('CalidadService', () => {
  let service: CalidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
