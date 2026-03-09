import { TestBed } from '@angular/core/testing';

import { ServicioInformes } from './servicio-informes';

describe('ServicioInformes', () => {
  let service: ServicioInformes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioInformes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
