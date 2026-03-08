import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DheaderDocs } from './dheader-docs';

describe('DheaderDocs', () => {
  let component: DheaderDocs;
  let fixture: ComponentFixture<DheaderDocs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DheaderDocs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DheaderDocs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
