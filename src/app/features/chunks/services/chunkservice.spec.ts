import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { Chunkservice } from './chunkservice';

describe('Chunkservice', () => {
  let service: Chunkservice;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(Chunkservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
