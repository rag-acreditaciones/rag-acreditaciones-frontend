import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchunkSearcherScreen } from './schunk-searcher-screen';

describe('SchunkSearcherScreen', () => {
  let component: SchunkSearcherScreen;
  let fixture: ComponentFixture<SchunkSearcherScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchunkSearcherScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchunkSearcherScreen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
