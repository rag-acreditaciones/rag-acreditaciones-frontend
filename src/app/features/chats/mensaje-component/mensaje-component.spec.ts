import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeComponent } from './mensaje-component';

describe('MensajeComponent', () => {
  let component: MensajeComponent;
  let fixture: ComponentFixture<MensajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensajeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
