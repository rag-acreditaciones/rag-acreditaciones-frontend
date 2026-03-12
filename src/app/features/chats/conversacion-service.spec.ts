import { TestBed } from '@angular/core/testing';

import { ConversacionService } from './conversacion-service';

describe('ConversacionService', () => {
  let service: ConversacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConversacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
