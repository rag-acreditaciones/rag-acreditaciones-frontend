import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchunkSearcherResultList } from './schunk-searcher-result-list';

describe('SchunkSearcherResultList', () => {
  let component: SchunkSearcherResultList;
  let fixture: ComponentFixture<SchunkSearcherResultList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchunkSearcherResultList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchunkSearcherResultList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
