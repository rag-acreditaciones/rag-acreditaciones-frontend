import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdocInfo } from './ddoc-info';

describe('DdocInfo', () => {
  let component: DdocInfo;
  let fixture: ComponentFixture<DdocInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DdocInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DdocInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
