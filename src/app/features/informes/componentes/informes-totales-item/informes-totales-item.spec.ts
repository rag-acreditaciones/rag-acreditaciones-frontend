import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesTotalesItem } from './informes-totales-item';

describe('InformesTotalesItem', () => {
  let component: InformesTotalesItem;
  let fixture: ComponentFixture<InformesTotalesItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformesTotalesItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformesTotalesItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
