import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesRecienteList } from './informes-reciente-list';

describe('InformesRecienteList', () => {
  let component: InformesRecienteList;
  let fixture: ComponentFixture<InformesRecienteList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformesRecienteList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformesRecienteList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
