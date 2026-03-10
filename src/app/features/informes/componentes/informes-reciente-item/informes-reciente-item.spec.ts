import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesRecienteItem } from './informes-reciente-item';

describe('InformesRecienteItem', () => {
  let component: InformesRecienteItem;
  let fixture: ComponentFixture<InformesRecienteItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformesRecienteItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformesRecienteItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
