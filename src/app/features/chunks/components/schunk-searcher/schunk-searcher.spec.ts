import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchunkSearcher } from './schunk-searcher';

describe('SchunkSearcher', () => {
  let component: SchunkSearcher;
  let fixture: ComponentFixture<SchunkSearcher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchunkSearcher]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchunkSearcher);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
