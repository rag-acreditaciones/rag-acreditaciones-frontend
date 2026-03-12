import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesUsuarios } from './informes-usuarios';

describe('InformesUsuarios', () => {
  let component: InformesUsuarios;
  let fixture: ComponentFixture<InformesUsuarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformesUsuarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformesUsuarios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
