import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesTotalesList } from './informes-totales-list';

describe('InformesTotalesList', () => {
  let component: InformesTotalesList;
  let fixture: ComponentFixture<InformesTotalesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformesTotalesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformesTotalesList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
