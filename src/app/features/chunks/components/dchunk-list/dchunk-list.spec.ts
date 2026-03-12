import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DchunkList } from './dchunk-list';

describe('DchunkList', () => {
  let component: DchunkList;
  let fixture: ComponentFixture<DchunkList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DchunkList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DchunkList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
