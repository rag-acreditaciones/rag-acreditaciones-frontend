import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dpagination } from './dpagination';

describe('Dpagination', () => {
  let component: Dpagination;
  let fixture: ComponentFixture<Dpagination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dpagination]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dpagination);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
