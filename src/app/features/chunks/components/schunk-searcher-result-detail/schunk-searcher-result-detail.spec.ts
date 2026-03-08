import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchunkSearcherResultDetail } from './schunk-searcher-result-detail';

describe('SchunkSearcherResultDetail', () => {
  let component: SchunkSearcherResultDetail;
  let fixture: ComponentFixture<SchunkSearcherResultDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchunkSearcherResultDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchunkSearcherResultDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
