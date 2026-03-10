import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesDocumentos } from './informes-documentos';

describe('InformesDocumentos', () => {
  let component: InformesDocumentos;
  let fixture: ComponentFixture<InformesDocumentos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformesDocumentos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformesDocumentos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
