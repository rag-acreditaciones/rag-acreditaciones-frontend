import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DchunkDetail } from './dchunk-detail';

describe('DchunkDetail', () => {
  let component: DchunkDetail;
  let fixture: ComponentFixture<DchunkDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DchunkDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DchunkDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
