import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalidadPanelComponent } from './calidad-panel-component';

describe('CalidadPanelComponent', () => {
  let component: CalidadPanelComponent;
  let fixture: ComponentFixture<CalidadPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalidadPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalidadPanelComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
