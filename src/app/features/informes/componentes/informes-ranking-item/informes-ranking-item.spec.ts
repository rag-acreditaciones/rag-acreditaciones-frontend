import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesRankingItem } from './informes-ranking-item';

describe('InformesRankingItem', () => {
  let component: InformesRankingItem;
  let fixture: ComponentFixture<InformesRankingItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformesRankingItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformesRankingItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
