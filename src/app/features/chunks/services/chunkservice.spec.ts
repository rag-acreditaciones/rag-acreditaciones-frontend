import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { ChunkService } from './chunkservice';

describe('Chunkservice', () => {
  let service: ChunkService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(ChunkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
