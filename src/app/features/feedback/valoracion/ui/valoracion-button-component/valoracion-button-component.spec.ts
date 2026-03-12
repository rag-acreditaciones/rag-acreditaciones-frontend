import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoracionButtonComponent } from './valoracion-button-component';

describe('ValoracionButtonComponent', () => {
  let component: ValoracionButtonComponent;
  let fixture: ComponentFixture<ValoracionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValoracionButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValoracionButtonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
