import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesMain } from './informes-main';

describe('InformesMain', () => {
  let component: InformesMain;
  let fixture: ComponentFixture<InformesMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformesMain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformesMain);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
