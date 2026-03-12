import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdocumentChunkScreen } from './ddocument-chunk-screen';

describe('DdocumentChunkScreen', () => {
  let component: DdocumentChunkScreen;
  let fixture: ComponentFixture<DdocumentChunkScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DdocumentChunkScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DdocumentChunkScreen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
