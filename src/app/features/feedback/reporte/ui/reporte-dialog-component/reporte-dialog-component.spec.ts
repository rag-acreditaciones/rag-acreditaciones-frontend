import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteDialogComponent } from './reporte-dialog-component';

describe('ReporteDialogComponent', () => {
  let component: ReporteDialogComponent;
  let fixture: ComponentFixture<ReporteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
